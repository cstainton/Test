package dev.verrai.api.wire;

import java.util.Stack;

public class JsonWriterImpl implements JsonWriter {
    private final StringBuilder sb;
    private enum Scope { OBJECT, ARRAY }
    private final Stack<Scope> scopes = new Stack<>();
    private final Stack<Boolean> firsts = new Stack<>();

    public JsonWriterImpl(StringBuilder sb) {
        this.sb = sb;
    }

    private void beforeValueInArray() {
        if (!scopes.isEmpty() && scopes.peek() == Scope.ARRAY) {
            if (!firsts.peek()) {
                sb.append(",");
            }
            firsts.pop();
            firsts.push(false);
        }
    }

    @Override
    public void beginObject() {
        beforeValueInArray();
        sb.append("{");
        scopes.push(Scope.OBJECT);
        firsts.push(true);
    }

    @Override
    public void endObject() {
        sb.append("}");
        scopes.pop();
        firsts.pop();
    }

    @Override
    public void name(String name) {
        if (scopes.isEmpty() || scopes.peek() != Scope.OBJECT) {
             throw new IllegalStateException("name() called outside of object");
        }
        if (!firsts.peek()) {
            sb.append(",");
        }
        firsts.pop();
        firsts.push(false);
        sb.append("\"").append(escape(name)).append("\":");
    }

    @Override
    public void value(String value) {
        beforeValueInArray();
        sb.append(value == null ? "null" : "\"" + escape(value) + "\"");
    }

    @Override
    public void value(int value) {
        beforeValueInArray();
        sb.append(value);
    }

    @Override
    public void value(double value) {
        beforeValueInArray();
        sb.append(value);
    }

    @Override
    public void value(boolean value) {
        beforeValueInArray();
        sb.append(value);
    }

    @Override
    public void beginArray() {
        beforeValueInArray();
        sb.append("[");
        scopes.push(Scope.ARRAY);
        firsts.push(true);
    }

    @Override
    public void endArray() {
        sb.append("]");
        scopes.pop();
        firsts.pop();
    }

    private String escape(String s) {
        if(s == null) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '"': sb.append("\\\""); break;
                case '\\': sb.append("\\\\"); break;
                case '\b': sb.append("\\b"); break;
                case '\f': sb.append("\\f"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                case '\t': sb.append("\\t"); break;
                default:
                    if (c < ' ') {
                        String t = "000" + Integer.toHexString(c);
                        sb.append("\\u" + t.substring(t.length() - 4));
                    } else {
                        sb.append(c);
                    }
            }
        }
        return sb.toString();
    }
}
