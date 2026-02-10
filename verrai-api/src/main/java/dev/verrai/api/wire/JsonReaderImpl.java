package dev.verrai.api.wire;

import java.util.Stack;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.core.JSArray;
import org.teavm.jso.core.JSString;
import org.teavm.jso.json.JSON;
import org.teavm.jso.core.JSNumber;
import org.teavm.jso.core.JSBoolean;

public class JsonReaderImpl implements JsonReader {
    private final Stack<Context> stack = new Stack<>();
    private JSObject current;

    public JsonReaderImpl(String json) {
        this.current = JSON.parse(json);
    }

    private abstract static class Context {
        abstract boolean hasNext();
        abstract String nextName();
        abstract JSObject nextValue();
    }

    private static class ObjectContext extends Context {
        private final JSObject obj;
        private final String[] keys;
        private int index = 0;

        ObjectContext(JSObject obj) {
            this.obj = obj;
            this.keys = keys(obj);
        }

        @JSBody(params = "obj", script = "return Object.keys(obj);")
        private static native String[] keys(JSObject obj);

        @JSBody(params = {"obj", "key"}, script = "return obj[key];")
        private static native JSObject get(JSObject obj, String key);

        @Override boolean hasNext() { return index < keys.length; }

        @Override String nextName() {
            String key = keys[index++];
            return key;
        }

        JSObject getValue(String key) {
            return get(obj, key);
        }

        @Override JSObject nextValue() { throw new IllegalStateException("Not an array"); }
    }

    private static class ArrayContext extends Context {
        private final JSArray<JSObject> arr;
        private int index = 0;

        ArrayContext(JSObject obj) {
            this.arr = obj.cast();
        }

        @Override boolean hasNext() { return index < arr.getLength(); }
        @Override String nextName() { throw new IllegalStateException("Not an object"); }
        @Override JSObject nextValue() { return arr.get(index++); }
    }

    @Override
    public void beginObject() {
        stack.push(new ObjectContext(current));
        current = null;
    }

    @Override
    public void endObject() {
        stack.pop();
    }

    @Override
    public boolean hasNext() {
        if (stack.isEmpty()) return false;
        return stack.peek().hasNext();
    }

    @Override
    public String nextName() {
        Context ctx = stack.peek();
        if (!(ctx instanceof ObjectContext)) throw new IllegalStateException("Not inside object");
        String name = ctx.nextName();
        current = ((ObjectContext)ctx).getValue(name);
        return name;
    }

    private JSObject nextValue() {
        if (!stack.isEmpty() && stack.peek() instanceof ArrayContext) {
            return stack.peek().nextValue();
        }
        return current;
    }

    @Override
    public String nextString() {
        JSObject val = nextValue();
        return val == null ? null : ((JSString)val.cast()).stringValue();
    }

    @Override
    public int nextInt() {
        JSObject val = nextValue();
        return val == null ? 0 : (int)((JSNumber)val.cast()).doubleValue();
    }

    @Override
    public double nextDouble() {
        JSObject val = nextValue();
        return val == null ? 0 : ((JSNumber)val.cast()).doubleValue();
    }

    @Override
    public boolean nextBoolean() {
        JSObject val = nextValue();
        return val != null && ((JSBoolean)val.cast()).booleanValue();
    }

    @Override
    public void skipValue() {
        nextValue();
    }

    @Override
    public void beginArray() {
        JSObject val = nextValue();
        stack.push(new ArrayContext(val));
        current = null;
    }

    @Override
    public void endArray() {
        stack.pop();
    }

    @Override
    public String peekString(String name) {
        if (!stack.isEmpty() && stack.peek() instanceof ObjectContext) {
            ObjectContext ctx = (ObjectContext) stack.peek();
            JSObject val = ctx.getValue(name);
            return val == null ? null : ((JSString)val.cast()).stringValue();
        }
        return null;
    }
}
