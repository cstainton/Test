"use strict";
(function(root, module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(root, exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(global, exports);
    } else {
        module(root, root);
    }
}(typeof self !== 'undefined' ? self : this, function($rt_globals, $rt_exports) {
    var $rt_seed = 2463534242;
    function $rt_nextId() {
        var x = $rt_seed;
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        $rt_seed = x;
        return x;
    }
    function $rt_compare(a, b) {
        return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
    }
    function $rt_isInstance(obj, cls) {
        return obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
    }
    function $rt_isAssignable(from, to) {
        if (from === to) {
            return true;
        }
        if (to.$meta.item !== null) {
            return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        }
        var supertypes = from.$meta.supertypes;
        for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
            if ($rt_isAssignable(supertypes[i], to)) {
                return true;
            }
        }
        return false;
    }
    function $rt_castToInterface(obj, cls) {
        if (obj !== null && !$rt_isInstance(obj, cls)) {
            $rt_throwCCE();
        }
        return obj;
    }
    function $rt_castToClass(obj, cls) {
        if (obj !== null && !(obj instanceof cls)) {
            $rt_throwCCE();
        }
        return obj;
    }
    $rt_globals.Array.prototype.fill = $rt_globals.Array.prototype.fill || function(value, start, end) {
        var len = this.length;
        if (!len) return this;
        start = start | 0;
        var i = start < 0 ? $rt_globals.Math.max(len + start, 0) : $rt_globals.Math.min(start, len);
        end = end === $rt_globals.undefined ? len : end | 0;
        end = end < 0 ? $rt_globals.Math.max(len + end, 0) : $rt_globals.Math.min(end, len);
        for (;i < end;i++) {
            this[i] = value;
        }
        return this;
    };
    function $rt_createArray(cls, sz) {
        var data = new $rt_globals.Array(sz);
        data.fill(null);
        return new $rt_array(cls, data);
    }
    function $rt_createArrayFromData(cls, init) {
        return $rt_wrapArray(cls, init);
    }
    function $rt_wrapArray(cls, data) {
        return new $rt_array(cls, data);
    }
    function $rt_createUnfilledArray(cls, sz) {
        return new $rt_array(cls, new $rt_globals.Array(sz));
    }
    function $rt_createNumericArray(cls, nativeArray) {
        return new $rt_array(cls, nativeArray);
    }
    var $rt_createLongArray;
    var $rt_createLongArrayFromData;
    if (typeof $rt_globals.BigInt64Array !== 'function') {
        $rt_createLongArray = function(sz) {
            var data = new $rt_globals.Array(sz);
            var arr = new $rt_array($rt_longcls(), data);
            data.fill(Long_ZERO);
            return arr;
        };
        $rt_createLongArrayFromData = function(init) {
            return new $rt_array($rt_longcls(), init);
        };
    } else {
        $rt_createLongArray = function(sz) {
            return $rt_createNumericArray($rt_longcls(), new $rt_globals.BigInt64Array(sz));
        };
        $rt_createLongArrayFromData = function(data) {
            var buffer = new $rt_globals.BigInt64Array(data.length);
            buffer.set(data);
            return $rt_createNumericArray($rt_longcls(), buffer);
        };
    }
    function $rt_createCharArray(sz) {
        return $rt_createNumericArray($rt_charcls(), new $rt_globals.Uint16Array(sz));
    }
    function $rt_createCharArrayFromData(data) {
        var buffer = new $rt_globals.Uint16Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_charcls(), buffer);
    }
    function $rt_createByteArray(sz) {
        return $rt_createNumericArray($rt_bytecls(), new $rt_globals.Int8Array(sz));
    }
    function $rt_createByteArrayFromData(data) {
        var buffer = new $rt_globals.Int8Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_bytecls(), buffer);
    }
    function $rt_createShortArray(sz) {
        return $rt_createNumericArray($rt_shortcls(), new $rt_globals.Int16Array(sz));
    }
    function $rt_createShortArrayFromData(data) {
        var buffer = new $rt_globals.Int16Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_shortcls(), buffer);
    }
    function $rt_createIntArray(sz) {
        return $rt_createNumericArray($rt_intcls(), new $rt_globals.Int32Array(sz));
    }
    function $rt_createIntArrayFromData(data) {
        var buffer = new $rt_globals.Int32Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_intcls(), buffer);
    }
    function $rt_createBooleanArray(sz) {
        return $rt_createNumericArray($rt_booleancls(), new $rt_globals.Int8Array(sz));
    }
    function $rt_createBooleanArrayFromData(data) {
        var buffer = new $rt_globals.Int8Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_booleancls(), buffer);
    }
    function $rt_createFloatArray(sz) {
        return $rt_createNumericArray($rt_floatcls(), new $rt_globals.Float32Array(sz));
    }
    function $rt_createFloatArrayFromData(data) {
        var buffer = new $rt_globals.Float32Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_floatcls(), buffer);
    }
    function $rt_createDoubleArray(sz) {
        return $rt_createNumericArray($rt_doublecls(), new $rt_globals.Float64Array(sz));
    }
    function $rt_createDoubleArrayFromData(data) {
        var buffer = new $rt_globals.Float64Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_doublecls(), buffer);
    }
    function $rt_arraycls(cls) {
        var result = cls.$array;
        if (result === null) {
            var arraycls = {  };
            var name = "[" + cls.$meta.binaryName;
            arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
            arraycls.classObject = null;
            arraycls.$array = null;
            result = arraycls;
            cls.$array = arraycls;
        }
        return result;
    }
    function $rt_createcls() {
        return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
    }
    function $rt_createPrimitiveCls(name, binaryName) {
        var cls = $rt_createcls();
        cls.$meta.primitive = true;
        cls.$meta.name = name;
        cls.$meta.binaryName = binaryName;
        cls.$meta.enum = false;
        cls.$meta.item = null;
        cls.$meta.simpleName = null;
        cls.$meta.declaringClass = null;
        cls.$meta.enclosingClass = null;
        return cls;
    }
    var $rt_booleanclsCache = null;
    function $rt_booleancls() {
        if ($rt_booleanclsCache === null) {
            $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
        }
        return $rt_booleanclsCache;
    }
    var $rt_charclsCache = null;
    function $rt_charcls() {
        if ($rt_charclsCache === null) {
            $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
        }
        return $rt_charclsCache;
    }
    var $rt_byteclsCache = null;
    function $rt_bytecls() {
        if ($rt_byteclsCache === null) {
            $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
        }
        return $rt_byteclsCache;
    }
    var $rt_shortclsCache = null;
    function $rt_shortcls() {
        if ($rt_shortclsCache === null) {
            $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
        }
        return $rt_shortclsCache;
    }
    var $rt_intclsCache = null;
    function $rt_intcls() {
        if ($rt_intclsCache === null) {
            $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
        }
        return $rt_intclsCache;
    }
    var $rt_longclsCache = null;
    function $rt_longcls() {
        if ($rt_longclsCache === null) {
            $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
        }
        return $rt_longclsCache;
    }
    var $rt_floatclsCache = null;
    function $rt_floatcls() {
        if ($rt_floatclsCache === null) {
            $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
        }
        return $rt_floatclsCache;
    }
    var $rt_doubleclsCache = null;
    function $rt_doublecls() {
        if ($rt_doubleclsCache === null) {
            $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
        }
        return $rt_doubleclsCache;
    }
    var $rt_voidclsCache = null;
    function $rt_voidcls() {
        if ($rt_voidclsCache === null) {
            $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
        }
        return $rt_voidclsCache;
    }
    function $rt_throw(ex) {
        throw $rt_exception(ex);
    }
    var $rt_javaExceptionProp = $rt_globals.Symbol("javaException");
    function $rt_exception(ex) {
        var err = ex.$jsException;
        if (!err) {
            var javaCause = $rt_throwableCause(ex);
            var jsCause = javaCause !== null ? javaCause.$jsException : $rt_globals.undefined;
            var cause = typeof jsCause === "object" ? { cause : jsCause } : $rt_globals.undefined;
            err = new JavaError("Java exception thrown", cause);
            if (typeof $rt_globals.Error.captureStackTrace === "function") {
                $rt_globals.Error.captureStackTrace(err);
            }
            err[$rt_javaExceptionProp] = ex;
            ex.$jsException = err;
            $rt_fillStack(err, ex);
        }
        return err;
    }
    function $rt_fillStack(err, ex) {
        if (typeof $rt_decodeStack === "function" && err.stack) {
            var stack = $rt_decodeStack(err.stack);
            var javaStack = $rt_createArray($rt_stecls(), stack.length);
            var elem;
            var noStack = false;
            for (var i = 0;i < stack.length;++i) {
                var element = stack[i];
                elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
                if (elem == null) {
                    noStack = true;
                    break;
                }
                javaStack.data[i] = elem;
            }
            if (!noStack) {
                $rt_setStack(ex, javaStack);
            }
        }
    }
    function $rt_createMultiArray(cls, dimensions) {
        var first = 0;
        for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
            if (dimensions[i] === 0) {
                first = i;
                break;
            }
        }
        if (first > 0) {
            for (i = 0;i < first;i = i + 1 | 0) {
                cls = $rt_arraycls(cls);
            }
            if (first === dimensions.length - 1) {
                return $rt_createArray(cls, dimensions[first]);
            }
        }
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, first));
        var firstDim = dimensions[first] | 0;
        for (i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createArray(cls, firstDim);
        }
        return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
    }
    function $rt_createByteMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_bytecls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createByteArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
    }
    function $rt_createCharMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_charcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createCharArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
    }
    function $rt_createBooleanMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_booleancls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createBooleanArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
    }
    function $rt_createShortMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_shortcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createShortArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
    }
    function $rt_createIntMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_intcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createIntArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
    }
    function $rt_createLongMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_longcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createLongArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
    }
    function $rt_createFloatMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_floatcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createFloatArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
    }
    function $rt_createDoubleMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_doublecls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createDoubleArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
    }
    function $rt_primitiveArrayCount(dimensions, start) {
        var val = dimensions[start + 1] | 0;
        for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
            val = val * (dimensions[i] | 0) | 0;
            if (val === 0) {
                break;
            }
        }
        return val;
    }
    function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
        var limit = arrays.length;
        for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
            var dim = dimensions[i];
            var index = 0;
            var packedIndex = 0;
            while (index < limit) {
                var arr = $rt_createUnfilledArray(cls, dim);
                for (var j = 0;j < dim;j = j + 1 | 0) {
                    arr.data[j] = arrays[index];
                    index = index + 1 | 0;
                }
                arrays[packedIndex] = arr;
                packedIndex = packedIndex + 1 | 0;
            }
            limit = packedIndex;
        }
        return arrays[0];
    }
    function $rt_assertNotNaN(value) {
        if (typeof value === 'number' && $rt_globals.isNaN(value)) {
            throw "NaN";
        }
        return value;
    }
    function $rt_createOutputFunction(printFunction) {
        var buffer = "";
        var utf8Buffer = 0;
        var utf8Remaining = 0;
        function putCodePoint(ch) {
            if (ch === 0xA) {
                printFunction(buffer);
                buffer = "";
            } else if (ch < 0x10000) {
                buffer += $rt_globals.String.fromCharCode(ch);
            } else {
                ch = ch - 0x10000 | 0;
                var hi = (ch >> 10) + 0xD800;
                var lo = (ch & 0x3FF) + 0xDC00;
                buffer += $rt_globals.String.fromCharCode(hi, lo);
            }
        }
        return function(ch) {
            if ((ch & 0x80) === 0) {
                putCodePoint(ch);
            } else if ((ch & 0xC0) === 0x80) {
                if (utf8Buffer > 0) {
                    utf8Remaining <<= 6;
                    utf8Remaining |= ch & 0x3F;
                    if ( --utf8Buffer === 0) {
                        putCodePoint(utf8Remaining);
                    }
                }
            } else if ((ch & 0xE0) === 0xC0) {
                utf8Remaining = ch & 0x1F;
                utf8Buffer = 1;
            } else if ((ch & 0xF0) === 0xE0) {
                utf8Remaining = ch & 0x0F;
                utf8Buffer = 2;
            } else if ((ch & 0xF8) === 0xF0) {
                utf8Remaining = ch & 0x07;
                utf8Buffer = 3;
            }
        };
    }
    var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
        $rt_globals.console.info(msg);
    }) : function() {
    };
    var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
        $rt_globals.console.error(msg);
    }) : function() {
    };
    var $rt_packageData = null;
    function $rt_packages(data) {
        var i = 0;
        var packages = new $rt_globals.Array(data.length);
        for (var j = 0;j < data.length;++j) {
            var prefixIndex = data[i++];
            var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
            packages[j] = prefix + data[i++] + ".";
        }
        $rt_packageData = packages;
    }
    function $rt_metadata(data) {
        var packages = $rt_packageData;
        var i = 0;
        while (i < data.length) {
            var cls = data[i++];
            cls.$meta = {  };
            var m = cls.$meta;
            var className = data[i++];
            m.name = className !== 0 ? className : null;
            if (m.name !== null) {
                var packageIndex = data[i++];
                if (packageIndex >= 0) {
                    m.name = packages[packageIndex] + m.name;
                }
            }
            m.binaryName = "L" + m.name + ";";
            var superclass = data[i++];
            m.superclass = superclass !== 0 ? superclass : null;
            m.supertypes = data[i++];
            if (m.superclass) {
                m.supertypes.push(m.superclass);
                cls.prototype = $rt_globals.Object.create(m.superclass.prototype);
            } else {
                cls.prototype = {  };
            }
            var flags = data[i++];
            m.enum = (flags & 8) !== 0;
            m.flags = flags;
            m.primitive = false;
            m.item = null;
            cls.prototype.constructor = cls;
            cls.classObject = null;
            m.accessLevel = data[i++];
            var innerClassInfo = data[i++];
            if (innerClassInfo === 0) {
                m.simpleName = null;
                m.declaringClass = null;
                m.enclosingClass = null;
            } else {
                var enclosingClass = innerClassInfo[0];
                m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
                var declaringClass = innerClassInfo[1];
                m.declaringClass = declaringClass !== 0 ? declaringClass : null;
                var simpleName = innerClassInfo[2];
                m.simpleName = simpleName !== 0 ? simpleName : null;
            }
            var clinit = data[i++];
            cls.$clinit = clinit !== 0 ? clinit : function() {
            };
            var virtualMethods = data[i++];
            if (virtualMethods !== 0) {
                for (var j = 0;j < virtualMethods.length;j += 2) {
                    var name = virtualMethods[j];
                    var func = virtualMethods[j + 1];
                    if (typeof name === 'string') {
                        name = [name];
                    }
                    for (var k = 0;k < name.length;++k) {
                        cls.prototype[name[k]] = func;
                    }
                }
            }
            cls.$array = null;
        }
    }
    function $rt_wrapFunction0(f) {
        return function() {
            return f(this);
        };
    }
    function $rt_wrapFunction1(f) {
        return function(p1) {
            return f(this, p1);
        };
    }
    function $rt_wrapFunction2(f) {
        return function(p1, p2) {
            return f(this, p1, p2);
        };
    }
    function $rt_wrapFunction3(f) {
        return function(p1, p2, p3) {
            return f(this, p1, p2, p3, p3);
        };
    }
    function $rt_wrapFunction4(f) {
        return function(p1, p2, p3, p4) {
            return f(this, p1, p2, p3, p4);
        };
    }
    function $rt_threadStarter(f) {
        return function() {
            var args = $rt_globals.Array.prototype.slice.apply(arguments);
            $rt_startThread(function() {
                f.apply(this, args);
            });
        };
    }
    function $rt_mainStarter(f) {
        return function(args, callback) {
            if (!args) {
                args = [];
            }
            var javaArgs = $rt_createArray($rt_objcls(), args.length);
            for (var i = 0;i < args.length;++i) {
                javaArgs.data[i] = $rt_str(args[i]);
            }
            $rt_startThread(function() {
                f.call(null, javaArgs);
            }, callback);
        };
    }
    var $rt_stringPool_instance;
    function $rt_stringPool(strings) {
        $rt_stringPool_instance = new $rt_globals.Array(strings.length);
        for (var i = 0;i < strings.length;++i) {
            $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
        }
    }
    function $rt_s(index) {
        return $rt_stringPool_instance[index];
    }
    function $rt_eraseClinit(target) {
        return target.$clinit = function() {
        };
    }
    var $rt_numberConversionBuffer = new $rt_globals.ArrayBuffer(16);
    var $rt_numberConversionView = new $rt_globals.DataView($rt_numberConversionBuffer);
    var $rt_numberConversionFloatArray = new $rt_globals.Float32Array($rt_numberConversionBuffer);
    var $rt_numberConversionDoubleArray = new $rt_globals.Float64Array($rt_numberConversionBuffer);
    var $rt_numberConversionIntArray = new $rt_globals.Int32Array($rt_numberConversionBuffer);
    var $rt_doubleToRawLongBits;
    var $rt_longBitsToDouble;
    if (typeof $rt_globals.BigInt !== 'function') {
        $rt_doubleToRawLongBits = function(n) {
            $rt_numberConversionView.setFloat64(0, n, true);
            return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
        };
        $rt_longBitsToDouble = function(n) {
            $rt_numberConversionView.setInt32(0, n.lo, true);
            $rt_numberConversionView.setInt32(4, n.hi, true);
            return $rt_numberConversionView.getFloat64(0, true);
        };
    } else if (typeof $rt_globals.BigInt64Array !== 'function') {
        $rt_doubleToRawLongBits = function(n) {
            $rt_numberConversionView.setFloat64(0, n, true);
            var lo = $rt_numberConversionView.getInt32(0, true);
            var hi = $rt_numberConversionView.getInt32(4, true);
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
        };
        $rt_longBitsToDouble = function(n) {
            $rt_numberConversionView.setFloat64(0, n, true);
            var lo = $rt_numberConversionView.getInt32(0, true);
            var hi = $rt_numberConversionView.getInt32(4, true);
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
        };
    } else {
        var $rt_numberConversionLongArray = new $rt_globals.BigInt64Array($rt_numberConversionBuffer);
        $rt_doubleToRawLongBits = function(n) {
            $rt_numberConversionDoubleArray[0] = n;
            return $rt_numberConversionLongArray[0];
        };
        $rt_longBitsToDouble = function(n) {
            $rt_numberConversionLongArray[0] = n;
            return $rt_numberConversionDoubleArray[0];
        };
    }
    function $rt_floatToRawIntBits(n) {
        $rt_numberConversionFloatArray[0] = n;
        return $rt_numberConversionIntArray[0];
    }
    function $rt_intBitsToFloat(n) {
        $rt_numberConversionIntArray[0] = n;
        return $rt_numberConversionFloatArray[0];
    }
    function $rt_equalDoubles(a, b) {
        if (a !== a) {
            return b !== b;
        }
        $rt_numberConversionDoubleArray[0] = a;
        $rt_numberConversionDoubleArray[1] = b;
        return $rt_numberConversionIntArray[0] === $rt_numberConversionIntArray[2] && $rt_numberConversionIntArray[1] === $rt_numberConversionIntArray[3];
    }
    var JavaError;
    if (typeof $rt_globals.Reflect === 'object') {
        var defaultMessage = $rt_globals.Symbol("defaultMessage");
        JavaError = function JavaError(message, cause) {
            var self = $rt_globals.Reflect.construct($rt_globals.Error, [$rt_globals.undefined, cause], JavaError);
            $rt_globals.Object.setPrototypeOf(self, JavaError.prototype);
            self[defaultMessage] = message;
            return self;
        };
        JavaError.prototype = $rt_globals.Object.create($rt_globals.Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get : function() {
            try {
                var javaException = this[$rt_javaExceptionProp];
                if (typeof javaException === 'object') {
                    var javaMessage = $rt_throwableMessage(javaException);
                    if (typeof javaMessage === "object") {
                        return javaMessage !== null ? javaMessage.toString() : null;
                    }
                }
                return this[defaultMessage];
            } catch (e){
                return "Exception occurred trying to extract Java exception message: " + e;
            }
        } } });
    } else {
        JavaError = $rt_globals.Error;
    }
    function $rt_javaException(e) {
        return e instanceof $rt_globals.Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null;
    }
    function $rt_jsException(e) {
        return typeof e.$jsException === 'object' ? e.$jsException : null;
    }
    function $rt_wrapException(err) {
        var ex = err[$rt_javaExceptionProp];
        if (!ex) {
            ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
            err[$rt_javaExceptionProp] = ex;
            ex.$jsException = err;
            $rt_fillStack(err, ex);
        }
        return ex;
    }
    function $dbg_class(obj) {
        var cls = obj.constructor;
        var arrayDegree = 0;
        while (cls.$meta && cls.$meta.item) {
            ++arrayDegree;
            cls = cls.$meta.item;
        }
        var clsName = "";
        if (cls === $rt_booleancls()) {
            clsName = "boolean";
        } else if (cls === $rt_bytecls()) {
            clsName = "byte";
        } else if (cls === $rt_shortcls()) {
            clsName = "short";
        } else if (cls === $rt_charcls()) {
            clsName = "char";
        } else if (cls === $rt_intcls()) {
            clsName = "int";
        } else if (cls === $rt_longcls()) {
            clsName = "long";
        } else if (cls === $rt_floatcls()) {
            clsName = "float";
        } else if (cls === $rt_doublecls()) {
            clsName = "double";
        } else {
            clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
        }
        while (arrayDegree-- > 0) {
            clsName += "[]";
        }
        return clsName;
    }
    function Long(lo, hi) {
        this.lo = lo | 0;
        this.hi = hi | 0;
    }
    Long.prototype.__teavm_class__ = function() {
        return "long";
    };
    function Long_isPositive(a) {
        return (a.hi & 0x80000000) === 0;
    }
    function Long_isNegative(a) {
        return (a.hi & 0x80000000) !== 0;
    }
    var Long_MAX_NORMAL = 1 << 18;
    var Long_ZERO;
    var Long_create;
    var Long_fromInt;
    var Long_fromNumber;
    var Long_toNumber;
    var Long_hi;
    var Long_lo;
    if (typeof $rt_globals.BigInt !== "function") {
        Long.prototype.toString = function() {
            var result = [];
            var n = this;
            var positive = Long_isPositive(n);
            if (!positive) {
                n = Long_neg(n);
            }
            var radix = new Long(10, 0);
            do  {
                var divRem = Long_divRem(n, radix);
                result.push($rt_globals.String.fromCharCode(48 + divRem[1].lo));
                n = divRem[0];
            }while (n.lo !== 0 || n.hi !== 0);
            result = (result.reverse()).join('');
            return positive ? result : "-" + result;
        };
        Long.prototype.valueOf = function() {
            return Long_toNumber(this);
        };
        Long_ZERO = new Long(0, 0);
        Long_fromInt = function(val) {
            return new Long(val,  -(val < 0) | 0);
        };
        Long_fromNumber = function(val) {
            if (val >= 0) {
                return new Long(val | 0, val / 0x100000000 | 0);
            } else {
                return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
            }
        };
        Long_create = function(lo, hi) {
            return new Long(lo, hi);
        };
        Long_toNumber = function(val) {
            return 0x100000000 * val.hi + (val.lo >>> 0);
        };
        Long_hi = function(val) {
            return val.hi;
        };
        Long_lo = function(val) {
            return val.lo;
        };
    } else {
        Long_ZERO = $rt_globals.BigInt(0);
        Long_create = function(lo, hi) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, $rt_globals.BigInt(lo)) | $rt_globals.BigInt.asUintN(64, $rt_globals.BigInt(hi) << $rt_globals.BigInt(32)));
        };
        Long_fromInt = function(val) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt(val | 0));
        };
        Long_fromNumber = function(val) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt(val >= 0 ? $rt_globals.Math.floor(val) : $rt_globals.Math.ceil(val)));
        };
        Long_toNumber = function(val) {
            return $rt_globals.Number(val);
        };
        Long_hi = function(val) {
            return $rt_globals.Number($rt_globals.BigInt.asIntN(64, val >> $rt_globals.BigInt(32))) | 0;
        };
        Long_lo = function(val) {
            return $rt_globals.Number($rt_globals.BigInt.asIntN(32, val)) | 0;
        };
    }
    var $rt_imul = $rt_globals.Math.imul || function(a, b) {
        var ah = a >>> 16 & 0xFFFF;
        var al = a & 0xFFFF;
        var bh = b >>> 16 & 0xFFFF;
        var bl = b & 0xFFFF;
        return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    };
    var $rt_udiv = function(a, b) {
        return (a >>> 0) / (b >>> 0) >>> 0;
    };
    var $rt_umod = function(a, b) {
        return (a >>> 0) % (b >>> 0) >>> 0;
    };
    var $rt_ucmp = function(a, b) {
        a >>>= 0;
        b >>>= 0;
        return a < b ?  -1 : a > b ? 1 : 0;
    };
    function $rt_checkBounds(index, array) {
        if (index < 0 || index >= array.length) {
            $rt_throwAIOOBE();
        }
        return index;
    }
    function $rt_checkUpperBound(index, array) {
        if (index >= array.length) {
            $rt_throwAIOOBE();
        }
        return index;
    }
    function $rt_checkLowerBound(index) {
        if (index < 0) {
            $rt_throwAIOOBE();
        }
        return index;
    }
    function $rt_classWithoutFields(superclass) {
        if (superclass === 0) {
            return function() {
            };
        }
        if (superclass === void 0) {
            superclass = $rt_objcls();
        }
        return function() {
            superclass.call(this);
        };
    }
    function $rt_setCloneMethod(target, f) {
        target.$clone = f;
    }
    function $rt_cls(cls) {
        return jl_Class_getClass(cls);
    }
    function $rt_str(str) {
        if (str === null) {
            return null;
        }
        var characters = $rt_createCharArray(str.length);
        var charsBuffer = characters.data;
        for (var i = 0; i < str.length; i = (i + 1) | 0) {
            charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
        }
        return jl_String__init_(characters);
    }
    function $rt_ustr(str) {
        if (str === null) {
            return null;
        }
        var data = str.$characters.data;
        var result = "";
        for (var i = 0; i < data.length; i = (i + 1) | 0) {
            result += String.fromCharCode(data[i]);
        }
        return result;
    }
    function $rt_objcls() { return jl_Object; }
    function $rt_stecls() {
        return jl_StackTraceElement;
    }
    function $rt_throwableMessage(t) {
        return jl_Throwable_getMessage(t);
    }
    function $rt_throwableCause(t) {
        return jl_Throwable_getCause(t);
    }
    function $rt_nullCheck(val) {
        if (val === null) {
            $rt_throw(jl_NullPointerException__init_());
        }
        return val;
    }
    function $rt_intern(str) {
        return str;
    }
    function $rt_getThread() {
        return null;
    }
    function $rt_setThread(t) {
    }
    function $rt_createException(message) {
        return jl_RuntimeException__init_(message);
    }
    function $rt_createStackElement(className, methodName, fileName, lineNumber) {
        return jl_StackTraceElement__init_(className, methodName, fileName, lineNumber);
    }
    function $rt_setStack(e, stack) {
        jl_Throwable_setStackTrace(e, stack);
    }
    function $rt_throwAIOOBE() {
        $rt_throw(jl_ArrayIndexOutOfBoundsException__init_());
    }
    function $rt_throwCCE() {
        $rt_throw(jl_ClassCastException__init_());
    }
    var $java = Object.create(null);
    function jl_Object() {
        this.$id$ = 0;
    }
    function jl_Object__init_() {
        var var_0 = new jl_Object();
        jl_Object__init_0(var_0);
        return var_0;
    }
    function jl_Object__init_0($this) {}
    function jl_Object_getClass($this) {
        return jl_Class_getClass($this.constructor);
    }
    function jl_Object_toString($this) {
        var var$1, var$2, var$3;
        var$1 = $rt_nullCheck(jl_Object_getClass($this)).$getName();
        var$2 = jl_Integer_toHexString(jl_Object_identity($this));
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$3, var$1)), 64)), var$2);
        return jl_StringBuilder_toString(var$3);
    }
    function jl_Object_identity($this) {
        var $platformThis, var$2;
        $platformThis = $this;
        if (!$platformThis.$id$) {
            var$2 = $rt_nextId();
            $platformThis.$id$ = var$2;
        }
        return $this.$id$;
    }
    function jl_Object_clone($this) {
        var var$1, $result, var$3;
        if (!$rt_isInstance($this, jl_Cloneable)) {
            var$1 = $this;
            if (var$1.constructor.$meta.item === null)
                $rt_throw(jl_CloneNotSupportedException__init_());
        }
        $result = otp_Platform_clone($this);
        var$1 = $result;
        var$3 = $rt_nextId();
        var$1.$id$ = var$3;
        return $result;
    }
    function jl_Throwable() {
        var a = this; jl_Object.call(a);
        a.$message = null;
        a.$cause = null;
        a.$suppressionEnabled = 0;
        a.$writableStackTrace = 0;
        a.$stackTrace = null;
    }
    function jl_Throwable__init_() {
        var var_0 = new jl_Throwable();
        jl_Throwable__init_0(var_0);
        return var_0;
    }
    function jl_Throwable__init_1(var_0) {
        var var_1 = new jl_Throwable();
        jl_Throwable__init_2(var_1, var_0);
        return var_1;
    }
    function jl_Throwable__init_3(var_0) {
        var var_1 = new jl_Throwable();
        jl_Throwable__init_4(var_1, var_0);
        return var_1;
    }
    function jl_Throwable__init_0($this) {
        $this.$suppressionEnabled = 1;
        $this.$writableStackTrace = 1;
        $this.$fillInStackTrace();
    }
    function jl_Throwable__init_2($this, $message) {
        $this.$suppressionEnabled = 1;
        $this.$writableStackTrace = 1;
        $this.$fillInStackTrace();
        $this.$message = $message;
    }
    function jl_Throwable__init_4($this, $cause) {
        $this.$suppressionEnabled = 1;
        $this.$writableStackTrace = 1;
        $this.$fillInStackTrace();
        $this.$cause = $cause;
    }
    function jl_Throwable_fillInStackTrace($this) {
        return $this;
    }
    function jl_Throwable_getMessage($this) {
        return $this.$message;
    }
    function jl_Throwable_getLocalizedMessage($this) {
        return $this.$getMessage();
    }
    function jl_Throwable_getCause($this) {
        return $this.$cause === $this ? null : $this.$cause;
    }
    function jl_Throwable_getStackTrace($this) {
        return $this.$stackTrace === null ? $rt_createArray(jl_StackTraceElement, 0) : $rt_castToInterface($rt_nullCheck($this.$stackTrace).$clone(), $rt_arraycls(jl_StackTraceElement));
    }
    function jl_Throwable_setStackTrace($this, $stackTrace) {
        $stackTrace = $rt_nullCheck($stackTrace);
        $this.$stackTrace = $rt_castToInterface($stackTrace.$clone(), $rt_arraycls(jl_StackTraceElement));
    }
    var jl_Exception = $rt_classWithoutFields(jl_Throwable);
    function jl_Exception__init_() {
        var var_0 = new jl_Exception();
        jl_Exception__init_0(var_0);
        return var_0;
    }
    function jl_Exception__init_1(var_0) {
        var var_1 = new jl_Exception();
        jl_Exception__init_2(var_1, var_0);
        return var_1;
    }
    function jl_Exception__init_0($this) {
        jl_Throwable__init_0($this);
    }
    function jl_Exception__init_2($this, $message) {
        jl_Throwable__init_2($this, $message);
    }
    var jl_RuntimeException = $rt_classWithoutFields(jl_Exception);
    function jl_RuntimeException__init_0() {
        var var_0 = new jl_RuntimeException();
        jl_RuntimeException__init_1(var_0);
        return var_0;
    }
    function jl_RuntimeException__init_(var_0) {
        var var_1 = new jl_RuntimeException();
        jl_RuntimeException__init_2(var_1, var_0);
        return var_1;
    }
    function jl_RuntimeException__init_1($this) {
        jl_Exception__init_0($this);
    }
    function jl_RuntimeException__init_2($this, $message) {
        jl_Exception__init_2($this, $message);
    }
    var jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_IndexOutOfBoundsException__init_() {
        var var_0 = new jl_IndexOutOfBoundsException();
        jl_IndexOutOfBoundsException__init_0(var_0);
        return var_0;
    }
    function jl_IndexOutOfBoundsException__init_1(var_0) {
        var var_1 = new jl_IndexOutOfBoundsException();
        jl_IndexOutOfBoundsException__init_2(var_1, var_0);
        return var_1;
    }
    function jl_IndexOutOfBoundsException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    function jl_IndexOutOfBoundsException__init_2($this, $message) {
        jl_RuntimeException__init_2($this, $message);
    }
    var ju_Arrays = $rt_classWithoutFields();
    function ju_Arrays_copyOf($array, $length) {
        var $result, var$4, $sz, $i, var$7, var$8;
        $result = $rt_createCharArray($length);
        $array = $rt_nullCheck($array);
        var$4 = $array.data;
        $sz = jl_Math_min($length, var$4.length);
        $i = 0;
        while ($i < $sz) {
            var$7 = $result.data;
            $i = $rt_checkBounds($i, var$4);
            var$8 = var$4[$i];
            $i = $rt_checkUpperBound($i, var$7);
            var$7[$i] = var$8;
            $i = $i + 1 | 0;
        }
        return $result;
    }
    function ju_Arrays_copyOf0($original, $newLength) {
        var var$3, $result, $sz, $i, var$7, var$8;
        $original = $rt_nullCheck($original);
        var$3 = $original.data;
        $result = $rt_castToInterface(jlr_Array_newInstance($rt_nullCheck(jl_Object_getClass($original)).$getComponentType(), $newLength), $rt_arraycls(jl_Object));
        $sz = jl_Math_min($newLength, var$3.length);
        $i = 0;
        while ($i < $sz) {
            $i = $rt_checkBounds($i, var$3);
            var$7 = var$3[$i];
            $result = $rt_nullCheck($result);
            var$8 = $result.data;
            $i = $rt_checkUpperBound($i, var$8);
            var$8[$i] = var$7;
            $i = $i + 1 | 0;
        }
        return $result;
    }
    var jl_System = $rt_classWithoutFields();
    var jl_System_outCache = null;
    function jl_System_out() {
        var var$1;
        if (jl_System_outCache === null) {
            var$1 = new ji_PrintStream;
            otcic_StdoutOutputStream_$callClinit();
            ji_PrintStream__init_(var$1, $rt_castToClass(otcic_StdoutOutputStream_INSTANCE, ji_OutputStream), 0);
            jl_System_outCache = var$1;
        }
        return jl_System_outCache;
    }
    function jl_System_arraycopy($src, $srcPos, $dest, $destPos, $length) {
        var var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
        if ($src !== null && $dest !== null) {
            if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
                var$6 = $destPos + $length | 0;
                if (var$6 <= jlr_Array_getLength($dest)) {
                    a: {
                        if ($src !== $dest) {
                            $src = $rt_nullCheck($src);
                            $srcType = $rt_nullCheck(jl_Object_getClass($src)).$getComponentType();
                            $dest = $rt_nullCheck($dest);
                            $targetType = $rt_nullCheck(jl_Object_getClass($dest)).$getComponentType();
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break a;
                                $srcType = $rt_nullCheck($srcType);
                                if (!$srcType.$isPrimitive()) {
                                    $targetType = $rt_nullCheck($targetType);
                                    if (!$targetType.$isPrimitive()) {
                                        $srcArray = $rt_castToInterface($src, $rt_arraycls(jl_Object));
                                        $i = 0;
                                        var$6 = $srcPos;
                                        while ($i < $length) {
                                            var$11 = var$6 + 1 | 0;
                                            $srcArray = $rt_nullCheck($srcArray);
                                            var$12 = $srcArray.data;
                                            $elem = var$12[$rt_checkBounds(var$6, var$12)];
                                            if (!$targetType.$isInstance($elem)) {
                                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                                $rt_throw(jl_ArrayStoreException__init_());
                                            }
                                            $i = $i + 1 | 0;
                                            var$6 = var$11;
                                        }
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                        return;
                                    }
                                }
                                if ($srcType.$isPrimitive()) {
                                    $targetType = $rt_nullCheck($targetType);
                                    if ($targetType.$isPrimitive())
                                        break a;
                                }
                                $rt_throw(jl_ArrayStoreException__init_());
                            }
                            $rt_throw(jl_ArrayStoreException__init_());
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
            }
            $rt_throw(jl_IndexOutOfBoundsException__init_());
        }
        $rt_throw(jl_NullPointerException__init_0($rt_s(0)));
    }
    function jl_System_fastArraycopy($src, $srcPos, $dest, $destPos, $length) {
        var var$6;
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
            var$6 = $destPos + $length | 0;
            if (var$6 <= jlr_Array_getLength($dest)) {
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
        }
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
        if (var$5 === 0) {
            return;
        } else if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (var i = 0; i < var$5; i = (i + 1) | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = (var$2 + var$5) | 0;
            var$4 = (var$4 + var$5) | 0;
            for (var i = 0; i < var$5; i = (i + 1) | 0) {
                var$3.data[--var$4] = var$1.data[--var$2];
            }
        }
    }
    function jl_System_currentTimeMillis() {
        return Long_fromNumber(new Date().getTime());
    }
    function jnci_BufferedEncoder$Controller() {
        var a = this; jl_Object.call(a);
        a.$in = null;
        a.$out = null;
        a.$inPosition = 0;
        a.$outPosition = 0;
    }
    function jnci_BufferedEncoder$Controller__init_(var_0, var_1) {
        var var_2 = new jnci_BufferedEncoder$Controller();
        jnci_BufferedEncoder$Controller__init_0(var_2, var_0, var_1);
        return var_2;
    }
    function jnci_BufferedEncoder$Controller__init_0($this, $in, $out) {
        jl_Object__init_0($this);
        $this.$in = $in;
        $this.$out = $out;
    }
    function jnci_BufferedEncoder$Controller_hasMoreInput($this) {
        return jn_Buffer_hasRemaining($rt_nullCheck($this.$in));
    }
    function jnci_BufferedEncoder$Controller_hasMoreOutput($this, $sz) {
        return jn_Buffer_remaining($rt_nullCheck($this.$out)) < $sz ? 0 : 1;
    }
    function jnci_BufferedEncoder$Controller_setInPosition($this, $inPosition) {
        $this.$inPosition = $inPosition;
    }
    function jnci_BufferedEncoder$Controller_setOutPosition($this, $outPosition) {
        $this.$outPosition = $outPosition;
    }
    var ji_Serializable = $rt_classWithoutFields(0);
    var jl_Number = $rt_classWithoutFields();
    var jl_Comparable = $rt_classWithoutFields(0);
    var jl_Integer = $rt_classWithoutFields(jl_Number);
    var jl_Integer_TYPE = null;
    function jl_Integer_$callClinit() {
        jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
        jl_Integer__clinit_();
    }
    function jl_Integer_toHexString($i) {
        jl_Integer_$callClinit();
        return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
    }
    function jl_Integer_numberOfLeadingZeros($i) {
        var $n, var$3, var$4;
        jl_Integer_$callClinit();
        if (!$i)
            return 32;
        $n = 0;
        var$3 = $i >>> 16 | 0;
        if (var$3)
            $n = 16;
        else
            var$3 = $i;
        var$4 = var$3 >>> 8 | 0;
        if (!var$4)
            var$4 = var$3;
        else
            $n = $n | 8;
        var$3 = var$4 >>> 4 | 0;
        if (!var$3)
            var$3 = var$4;
        else
            $n = $n | 4;
        var$4 = var$3 >>> 2 | 0;
        if (!var$4)
            var$4 = var$3;
        else
            $n = $n | 2;
        if (var$4 >>> 1 | 0)
            $n = $n | 1;
        return (32 - $n | 0) - 1 | 0;
    }
    function jl_Integer__clinit_() {
        jl_Integer_TYPE = $rt_cls($rt_intcls());
    }
    var jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception);
    function jl_CloneNotSupportedException__init_() {
        var var_0 = new jl_CloneNotSupportedException();
        jl_CloneNotSupportedException__init_0(var_0);
        return var_0;
    }
    function jl_CloneNotSupportedException__init_0($this) {
        jl_Exception__init_0($this);
    }
    var jl_Character = $rt_classWithoutFields();
    var jl_Character_TYPE = null;
    var jl_Character_characterCache = null;
    function jl_Character_$callClinit() {
        jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
        jl_Character__clinit_();
    }
    function jl_Character_isHighSurrogate($ch) {
        jl_Character_$callClinit();
        return ($ch & 64512) != 55296 ? 0 : 1;
    }
    function jl_Character_isLowSurrogate($ch) {
        jl_Character_$callClinit();
        return ($ch & 64512) != 56320 ? 0 : 1;
    }
    function jl_Character_isSurrogate($ch) {
        jl_Character_$callClinit();
        return !jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1;
    }
    function jl_Character_toCodePoint($high, $low) {
        jl_Character_$callClinit();
        return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
    }
    function jl_Character_highSurrogate($codePoint) {
        var var$2;
        jl_Character_$callClinit();
        var$2 = $codePoint - 65536 | 0;
        return (55296 | var$2 >> 10 & 1023) & 65535;
    }
    function jl_Character_lowSurrogate($codePoint) {
        jl_Character_$callClinit();
        return (56320 | $codePoint & 1023) & 65535;
    }
    function jl_Character_forDigit($digit, $radix) {
        jl_Character_$callClinit();
        if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
            return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
        return 0;
    }
    function jl_Character__clinit_() {
        jl_Character_TYPE = $rt_cls($rt_charcls());
        jl_Character_characterCache = $rt_createArray(jl_Character, 128);
    }
    var jl_Long = $rt_classWithoutFields(jl_Number);
    var jl_Long_TYPE = null;
    function jl_Long_$callClinit() {
        jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
        jl_Long__clinit_();
    }
    function jl_Long_divideUnsigned(var$1, var$2) {
        return Long_udiv(var$1, var$2);
    }
    function jl_Long_remainderUnsigned(var$1, var$2) {
        return Long_urem(var$1, var$2);
    }
    function jl_Long_compareUnsigned(var$1, var$2) {
        return Long_ucompare(var$1, var$2);
    }
    function jl_Long__clinit_() {
        jl_Long_TYPE = $rt_cls($rt_longcls());
    }
    var otj_TestEntryPoint$Launcher = $rt_classWithoutFields(0);
    var otj_TestEntryPoint$LauncherImpl0 = $rt_classWithoutFields();
    function otj_TestEntryPoint$LauncherImpl0__init_() {
        var var_0 = new otj_TestEntryPoint$LauncherImpl0();
        otj_TestEntryPoint$LauncherImpl0__init_0(var_0);
        return var_0;
    }
    function otj_TestEntryPoint$LauncherImpl0__init_0(var$0) {
        jl_Object__init_0(var$0);
    }
    function otj_TestEntryPoint$LauncherImpl0_launch(var$0, var$1) {
        ucits_BootstrapButtonBenchmarkTest_benchmarkAddStyle($rt_nullCheck($rt_castToClass(var$1, ucits_BootstrapButtonBenchmarkTest)));
    }
    var otj_JSObject = $rt_classWithoutFields(0);
    var otjde_EventTarget = $rt_classWithoutFields(0);
    var otjde_GamepadEventTarget = $rt_classWithoutFields(0);
    var jl_CharSequence = $rt_classWithoutFields(0);
    var jl_Error = $rt_classWithoutFields(jl_Throwable);
    function jl_Error__init_(var_0) {
        var var_1 = new jl_Error();
        jl_Error__init_0(var_1, var_0);
        return var_1;
    }
    function jl_Error__init_1(var_0) {
        var var_1 = new jl_Error();
        jl_Error__init_2(var_1, var_0);
        return var_1;
    }
    function jl_Error__init_0($this, $message) {
        jl_Throwable__init_2($this, $message);
    }
    function jl_Error__init_2($this, $cause) {
        jl_Throwable__init_4($this, $cause);
    }
    var jl_LinkageError = $rt_classWithoutFields(jl_Error);
    function jl_LinkageError__init_(var_0) {
        var var_1 = new jl_LinkageError();
        jl_LinkageError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_LinkageError__init_0($this, $message) {
        jl_Error__init_0($this, $message);
    }
    function jn_Buffer() {
        var a = this; jl_Object.call(a);
        a.$capacity = 0;
        a.$position = 0;
        a.$limit = 0;
        a.$mark = 0;
    }
    function jn_Buffer__init_($this, $capacity) {
        jl_Object__init_0($this);
        $this.$mark = (-1);
        $this.$capacity = $capacity;
        $this.$limit = $capacity;
    }
    function jn_Buffer_position($this) {
        return $this.$position;
    }
    function jn_Buffer_position0($this, $newPosition) {
        var var$2, var$3, var$4;
        if ($newPosition >= 0 && $newPosition <= $this.$limit) {
            $this.$position = $newPosition;
            if ($newPosition < $this.$mark)
                $this.$mark = 0;
            return $this;
        }
        var$2 = new jl_IllegalArgumentException;
        var$3 = $this.$limit;
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$4, $rt_s(1))), $newPosition)), $rt_s(2))), var$3)), 93);
        jl_IllegalArgumentException__init_(var$2, jl_StringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    function jn_Buffer_clear($this) {
        $this.$position = 0;
        $this.$limit = $this.$capacity;
        $this.$mark = (-1);
        return $this;
    }
    function jn_Buffer_remaining($this) {
        return $this.$limit - $this.$position | 0;
    }
    function jn_Buffer_hasRemaining($this) {
        return $this.$position >= $this.$limit ? 0 : 1;
    }
    var jl_Appendable = $rt_classWithoutFields(0);
    var jl_Readable = $rt_classWithoutFields(0);
    var jn_CharBuffer = $rt_classWithoutFields(jn_Buffer);
    function jn_CharBuffer__init_($this, $capacity, $position, $limit) {
        jn_Buffer__init_($this, $capacity);
        $this.$position = $position;
        $this.$limit = $limit;
    }
    function jn_CharBuffer_wrap($array, $offset, $length) {
        var var$4;
        var$4 = new jn_CharBufferOverArray;
        $array = $rt_nullCheck($array);
        jn_CharBufferOverArray__init_(var$4, 0, $array.data.length, $array, $offset, $offset + $length | 0, 0);
        return var$4;
    }
    function jn_CharBuffer_get($this, $dst, $offset, $length) {
        var var$4, var$5, var$6, var$7, var$8, $pos, $i, var$11;
        if ($offset >= 0) {
            $dst = $rt_nullCheck($dst);
            var$4 = $dst.data;
            var$5 = var$4.length;
            if ($offset <= var$5) {
                var$6 = $offset + $length | 0;
                if (var$6 > var$5) {
                    var$7 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(3))), var$6)), $rt_s(4))), var$5);
                    jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$7);
                }
                if (jn_Buffer_remaining($this) < $length)
                    $rt_throw(jn_BufferUnderflowException__init_());
                if ($length < 0) {
                    var$7 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(5))), $length)), $rt_s(6));
                    jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$7);
                }
                $pos = $this.$position;
                $i = 0;
                while ($i < $length) {
                    var$6 = $offset + 1 | 0;
                    var$5 = $pos + 1 | 0;
                    var$4[$rt_checkBounds($offset, var$4)] = $this.$getChar($pos);
                    $i = $i + 1 | 0;
                    $offset = var$6;
                    $pos = var$5;
                }
                $this.$position = $this.$position + $length | 0;
                return $this;
            }
        }
        var$7 = new jl_IndexOutOfBoundsException;
        $dst = $rt_nullCheck($dst);
        var$5 = $dst.data.length;
        var$11 = jl_StringBuilder__init_();
        jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$11, $rt_s(7))), $offset)), $rt_s(2))), var$5)), 41);
        jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$11));
        $rt_throw(var$7);
    }
    function jn_CharBuffer_position($this, $newPosition) {
        jn_Buffer_position0($this, $newPosition);
        return $this;
    }
    var jn_CharBufferImpl = $rt_classWithoutFields(jn_CharBuffer);
    function jn_CharBufferImpl__init_($this, $capacity, $position, $limit) {
        jn_CharBuffer__init_($this, $capacity, $position, $limit);
    }
    function jn_CharBufferOverArray() {
        var a = this; jn_CharBufferImpl.call(a);
        a.$readOnly = 0;
        a.$start = 0;
        a.$array = null;
    }
    function jn_CharBufferOverArray__init_0(var_0, var_1, var_2, var_3, var_4, var_5) {
        var var_6 = new jn_CharBufferOverArray();
        jn_CharBufferOverArray__init_(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
        return var_6;
    }
    function jn_CharBufferOverArray__init_($this, $start, $capacity, $array, $position, $limit, $readOnly) {
        jn_CharBufferImpl__init_($this, $capacity, $position, $limit);
        $this.$start = $start;
        $this.$readOnly = $readOnly;
        $this.$array = $array;
    }
    function jn_CharBufferOverArray_getChar($this, $index) {
        var var$2, var$3;
        var$2 = $this.$array;
        var$3 = $index + $this.$start | 0;
        var$2 = $rt_nullCheck(var$2).data;
        return var$2[$rt_checkBounds(var$3, var$2)];
    }
    var otjde_LoadEventTarget = $rt_classWithoutFields(0);
    var otcic_Console = $rt_classWithoutFields();
    function otcic_Console_writeStdout($data, $off, $len) {
        var $i, var$5, var$6, $b;
        $i = 0;
        while ($i < $len) {
            var$5 = $i + $off | 0;
            $data = $rt_nullCheck($data);
            var$6 = $data.data;
            $b = var$6[$rt_checkBounds(var$5, var$6)];
            $rt_putStdout($b & 255);
            $i = $i + 1 | 0;
        }
    }
    var ju_Comparator = $rt_classWithoutFields(0);
    var jl_String$_clinit_$lambda$_93_0 = $rt_classWithoutFields();
    function jl_String$_clinit_$lambda$_93_0__init_() {
        var var_0 = new jl_String$_clinit_$lambda$_93_0();
        jl_String$_clinit_$lambda$_93_0__init_0(var_0);
        return var_0;
    }
    function jl_String$_clinit_$lambda$_93_0__init_0(var$0) {
        jl_Object__init_0(var$0);
    }
    var jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
    function jl_StringIndexOutOfBoundsException__init_() {
        var var_0 = new jl_StringIndexOutOfBoundsException();
        jl_StringIndexOutOfBoundsException__init_0(var_0);
        return var_0;
    }
    function jl_StringIndexOutOfBoundsException__init_0($this) {
        jl_IndexOutOfBoundsException__init_0($this);
    }
    var jl_AutoCloseable = $rt_classWithoutFields(0);
    var ji_Closeable = $rt_classWithoutFields(0);
    var ji_Flushable = $rt_classWithoutFields(0);
    var ji_OutputStream = $rt_classWithoutFields();
    function ji_OutputStream__init_($this) {
        jl_Object__init_0($this);
    }
    function ji_FilterOutputStream() {
        ji_OutputStream.call(this);
        this.$out0 = null;
    }
    function ji_FilterOutputStream__init_(var_0) {
        var var_1 = new ji_FilterOutputStream();
        ji_FilterOutputStream__init_0(var_1, var_0);
        return var_1;
    }
    function ji_FilterOutputStream__init_0($this, $out) {
        ji_OutputStream__init_($this);
        $this.$out0 = $out;
    }
    function jn_ByteOrder() {
        jl_Object.call(this);
        this.$name = null;
    }
    var jn_ByteOrder_BIG_ENDIAN = null;
    var jn_ByteOrder_LITTLE_ENDIAN = null;
    function jn_ByteOrder_$callClinit() {
        jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
        jn_ByteOrder__clinit_();
    }
    function jn_ByteOrder__init_(var_0) {
        var var_1 = new jn_ByteOrder();
        jn_ByteOrder__init_0(var_1, var_0);
        return var_1;
    }
    function jn_ByteOrder__init_0($this, $name) {
        jn_ByteOrder_$callClinit();
        jl_Object__init_0($this);
        $this.$name = $name;
    }
    function jn_ByteOrder__clinit_() {
        jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(8));
        jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(9));
    }
    function otcic_ConsoleOutputStream() {
        ji_OutputStream.call(this);
        this.$buffer = null;
    }
    function otcic_ConsoleOutputStream__init_($this) {
        ji_OutputStream__init_($this);
        $this.$buffer = $rt_createByteArray(1);
    }
    var otcic_StdoutOutputStream = $rt_classWithoutFields(otcic_ConsoleOutputStream);
    var otcic_StdoutOutputStream_INSTANCE = null;
    function otcic_StdoutOutputStream_$callClinit() {
        otcic_StdoutOutputStream_$callClinit = $rt_eraseClinit(otcic_StdoutOutputStream);
        otcic_StdoutOutputStream__clinit_();
    }
    function otcic_StdoutOutputStream__init_() {
        var var_0 = new otcic_StdoutOutputStream();
        otcic_StdoutOutputStream__init_0(var_0);
        return var_0;
    }
    function otcic_StdoutOutputStream__init_0($this) {
        otcic_StdoutOutputStream_$callClinit();
        otcic_ConsoleOutputStream__init_($this);
    }
    function otcic_StdoutOutputStream_write($this, $b, $off, $len) {
        otcic_Console_writeStdout($b, $off, $len);
    }
    function otcic_StdoutOutputStream__clinit_() {
        otcic_StdoutOutputStream_INSTANCE = otcic_StdoutOutputStream__init_();
    }
    function jl_AbstractStringBuilder() {
        var a = this; jl_Object.call(a);
        a.$buffer0 = null;
        a.$length = 0;
    }
    function jl_AbstractStringBuilder__init_() {
        var var_0 = new jl_AbstractStringBuilder();
        jl_AbstractStringBuilder__init_0(var_0);
        return var_0;
    }
    function jl_AbstractStringBuilder__init_1(var_0) {
        var var_1 = new jl_AbstractStringBuilder();
        jl_AbstractStringBuilder__init_2(var_1, var_0);
        return var_1;
    }
    function jl_AbstractStringBuilder__init_0($this) {
        jl_AbstractStringBuilder__init_2($this, 16);
    }
    function jl_AbstractStringBuilder__init_2($this, $capacity) {
        jl_Object__init_0($this);
        $this.$buffer0 = $rt_createCharArray($capacity);
    }
    function jl_AbstractStringBuilder_append($this, $obj) {
        return $this.$insert($this.$length, $obj);
    }
    function jl_AbstractStringBuilder_append0($this, $string) {
        return $this.$insert0($this.$length, $string);
    }
    function jl_AbstractStringBuilder_insert($this, $index, $string) {
        var $i, var$4, var$5, var$6, var$7;
        if ($index >= 0 && $index <= $this.$length) {
            if ($string === null)
                $string = $rt_s(10);
            else if ($string.$isEmpty())
                return $this;
            $this.$ensureCapacity($this.$length + $string.$length0() | 0);
            $i = $this.$length - 1 | 0;
            while ($i >= $index) {
                var$4 = $this.$buffer0;
                var$5 = $i + $string.$length0() | 0;
                var$6 = $rt_nullCheck($this.$buffer0).data;
                $i = $rt_checkBounds($i, var$6);
                var$7 = var$6[$i];
                var$4 = $rt_nullCheck(var$4).data;
                var$4[$rt_checkBounds(var$5, var$4)] = var$7;
                $i = $i + (-1) | 0;
            }
            $this.$length = $this.$length + $string.$length0() | 0;
            $i = 0;
            while ($i < $string.$length0()) {
                var$4 = $this.$buffer0;
                var$5 = $index + 1 | 0;
                var$7 = $string.$charAt($i);
                var$4 = $rt_nullCheck(var$4).data;
                var$4[$rt_checkBounds($index, var$4)] = var$7;
                $i = $i + 1 | 0;
                $index = var$5;
            }
            return $this;
        }
        $rt_throw(jl_StringIndexOutOfBoundsException__init_());
    }
    function jl_AbstractStringBuilder_append1($this, $value) {
        return $this.$append2($value, 10);
    }
    function jl_AbstractStringBuilder_append2($this, $value, $radix) {
        return $this.$insert1($this.$length, $value, $radix);
    }
    function jl_AbstractStringBuilder_insert0($this, $target, $value, $radix) {
        var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11, var$12, var$13;
        $positive = 1;
        if ($value < 0) {
            $positive = 0;
            $value =  -$value | 0;
        }
        a: {
            if ($rt_ucmp($value, $radix) < 0) {
                if ($positive)
                    jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
                else {
                    jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                    var$5 = $this.$buffer0;
                    var$6 = $target + 1 | 0;
                    var$5 = $rt_nullCheck(var$5).data;
                    $target = $rt_checkBounds($target, var$5);
                    var$5[$target] = 45;
                    $target = var$6;
                }
                var$5 = $this.$buffer0;
                var$6 = jl_Character_forDigit($value, $radix);
                var$5 = $rt_nullCheck(var$5).data;
                var$5[$rt_checkBounds($target, var$5)] = var$6;
            } else {
                $pos = 1;
                $sz = 1;
                $posLimit = $rt_udiv((-1), $radix);
                b: {
                    while (true) {
                        var$10 = $rt_imul($pos, $radix);
                        if ($rt_ucmp(var$10, $value) > 0) {
                            var$10 = $pos;
                            break b;
                        }
                        $sz = $sz + 1 | 0;
                        if ($rt_ucmp(var$10, $posLimit) > 0)
                            break;
                        $pos = var$10;
                    }
                }
                if (!$positive)
                    $sz = $sz + 1 | 0;
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
                if ($positive)
                    var$11 = $target;
                else {
                    var$5 = $this.$buffer0;
                    var$11 = $target + 1 | 0;
                    var$5 = $rt_nullCheck(var$5).data;
                    $target = $rt_checkBounds($target, var$5);
                    var$5[$target] = 45;
                }
                while (true) {
                    if (!var$10)
                        break a;
                    var$5 = $this.$buffer0;
                    var$12 = var$11 + 1 | 0;
                    var$13 = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                    var$5 = $rt_nullCheck(var$5).data;
                    var$5[$rt_checkBounds(var$11, var$5)] = var$13;
                    $value = $rt_umod($value, var$10);
                    var$10 = $rt_udiv(var$10, $radix);
                    var$11 = var$12;
                }
            }
        }
        return $this;
    }
    function jl_AbstractStringBuilder_append3($this, $value) {
        return $this.$insert2($this.$length, $value);
    }
    function jl_AbstractStringBuilder_insert1($this, $target, $value) {
        return $this.$insert3($target, $value, 10);
    }
    function jl_AbstractStringBuilder_insert2($this, $target, $value, $radix) {
        var $positive, var$5, var$6, var$7, $sz, $pos, $posLimit, var$11, var$12, var$13;
        $positive = 1;
        if (Long_lt($value, Long_ZERO)) {
            $positive = 0;
            $value = Long_neg($value);
        }
        a: {
            var$5 = Long_fromInt($radix);
            if (jl_Long_compareUnsigned($value, var$5) < 0) {
                if ($positive)
                    jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
                else {
                    jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                    var$6 = $this.$buffer0;
                    var$7 = $target + 1 | 0;
                    var$6 = $rt_nullCheck(var$6).data;
                    $target = $rt_checkBounds($target, var$6);
                    var$6[$target] = 45;
                    $target = var$7;
                }
                var$6 = $this.$buffer0;
                var$7 = jl_Character_forDigit(Long_lo($value), $radix);
                var$6 = $rt_nullCheck(var$6).data;
                var$6[$rt_checkBounds($target, var$6)] = var$7;
            } else {
                $sz = 1;
                $pos = Long_fromInt(1);
                $posLimit = jl_Long_divideUnsigned(Long_fromInt(-1), var$5);
                b: {
                    while (true) {
                        var$11 = Long_mul($pos, var$5);
                        if (jl_Long_compareUnsigned(var$11, $value) > 0) {
                            var$11 = $pos;
                            break b;
                        }
                        $sz = $sz + 1 | 0;
                        if (jl_Long_compareUnsigned(var$11, $posLimit) > 0)
                            break;
                        $pos = var$11;
                    }
                }
                if (!$positive)
                    $sz = $sz + 1 | 0;
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
                if ($positive)
                    var$12 = $target;
                else {
                    var$6 = $this.$buffer0;
                    var$12 = $target + 1 | 0;
                    var$6 = $rt_nullCheck(var$6).data;
                    $target = $rt_checkBounds($target, var$6);
                    var$6[$target] = 45;
                }
                while (true) {
                    if (Long_eq(var$11, Long_ZERO))
                        break a;
                    var$6 = $this.$buffer0;
                    var$13 = var$12 + 1 | 0;
                    var$7 = jl_Character_forDigit(Long_lo((jl_Long_divideUnsigned($value, var$11))), $radix);
                    var$6 = $rt_nullCheck(var$6).data;
                    var$6[$rt_checkBounds(var$12, var$6)] = var$7;
                    $value = jl_Long_remainderUnsigned($value, var$11);
                    var$11 = jl_Long_divideUnsigned(var$11, var$5);
                    var$12 = var$13;
                }
            }
        }
        return $this;
    }
    function jl_AbstractStringBuilder_append4($this, $c) {
        return $this.$insert4($this.$length, $c);
    }
    function jl_AbstractStringBuilder_insert3($this, $index, $c) {
        var var$3;
        jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
        var$3 = $rt_nullCheck($this.$buffer0).data;
        $index = $rt_checkBounds($index, var$3);
        var$3[$index] = $c;
        return $this;
    }
    function jl_AbstractStringBuilder_insert4($this, $index, $obj) {
        return $this.$insert0($index, $obj === null ? $rt_s(10) : $obj.$toString());
    }
    function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
        var $newLength;
        if ($rt_nullCheck($this.$buffer0).data.length >= $capacity)
            return;
        $newLength = $rt_nullCheck($this.$buffer0).data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($rt_nullCheck($this.$buffer0).data.length * 2 | 0, 5));
        $this.$buffer0 = ju_Arrays_copyOf($this.$buffer0, $newLength);
    }
    function jl_AbstractStringBuilder_toString($this) {
        return jl_String__init_0($this.$buffer0, 0, $this.$length);
    }
    function jl_AbstractStringBuilder_length($this) {
        return $this.$length;
    }
    function jl_AbstractStringBuilder_getChars($this, $srcBegin, $srcEnd, $dst, $dstBegin) {
        var var$5, var$6, var$7, var$8;
        if ($srcBegin > $srcEnd)
            $rt_throw(jl_IndexOutOfBoundsException__init_1($rt_s(11)));
        while ($srcBegin < $srcEnd) {
            var$5 = $dstBegin + 1 | 0;
            var$6 = $this.$buffer0;
            var$7 = $srcBegin + 1 | 0;
            var$6 = $rt_nullCheck(var$6).data;
            var$8 = var$6[$rt_checkBounds($srcBegin, var$6)];
            $dst = $rt_nullCheck($dst);
            var$6 = $dst.data;
            var$6[$rt_checkBounds($dstBegin, var$6)] = var$8;
            $dstBegin = var$5;
            $srcBegin = var$7;
        }
    }
    function jl_AbstractStringBuilder_setLength($this, $newLength) {
        $this.$length = $newLength;
    }
    function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
        var $sz, $i, var$5, var$6, var$7, var$8;
        $sz = $this.$length - $start | 0;
        $this.$ensureCapacity(($this.$length + $end | 0) - $start | 0);
        $i = $sz - 1 | 0;
        while ($i >= 0) {
            var$5 = $this.$buffer0;
            var$6 = $end + $i | 0;
            var$7 = $this.$buffer0;
            var$8 = $start + $i | 0;
            var$7 = $rt_nullCheck(var$7).data;
            var$8 = var$7[$rt_checkBounds(var$8, var$7)];
            var$5 = $rt_nullCheck(var$5).data;
            var$5[$rt_checkBounds(var$6, var$5)] = var$8;
            $i = $i + (-1) | 0;
        }
        $this.$length = $this.$length + ($end - $start | 0) | 0;
    }
    var jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder);
    function jl_StringBuilder__init_() {
        var var_0 = new jl_StringBuilder();
        jl_StringBuilder__init_0(var_0);
        return var_0;
    }
    function jl_StringBuilder__init_0($this) {
        jl_AbstractStringBuilder__init_0($this);
    }
    function jl_StringBuilder_append($this, $obj) {
        jl_AbstractStringBuilder_append($this, $obj);
        return $this;
    }
    function jl_StringBuilder_append2($this, $string) {
        jl_AbstractStringBuilder_append0($this, $string);
        return $this;
    }
    function jl_StringBuilder_append1($this, $value) {
        jl_AbstractStringBuilder_append1($this, $value);
        return $this;
    }
    function jl_StringBuilder_append3($this, $value) {
        jl_AbstractStringBuilder_append3($this, $value);
        return $this;
    }
    function jl_StringBuilder_append0($this, $c) {
        jl_AbstractStringBuilder_append4($this, $c);
        return $this;
    }
    function jl_StringBuilder_insert($this, $target, $value) {
        jl_AbstractStringBuilder_insert1($this, $target, $value);
        return $this;
    }
    function jl_StringBuilder_insert0($this, $index, $obj) {
        jl_AbstractStringBuilder_insert4($this, $index, $obj);
        return $this;
    }
    function jl_StringBuilder_insert1($this, $index, $c) {
        jl_AbstractStringBuilder_insert3($this, $index, $c);
        return $this;
    }
    function jl_StringBuilder_insert2($this, $index, $string) {
        jl_AbstractStringBuilder_insert($this, $index, $string);
        return $this;
    }
    function jl_StringBuilder_setLength($this, var$1) {
        jl_AbstractStringBuilder_setLength($this, var$1);
    }
    function jl_StringBuilder_getChars($this, var$1, var$2, var$3, var$4) {
        jl_AbstractStringBuilder_getChars($this, var$1, var$2, var$3, var$4);
    }
    function jl_StringBuilder_length($this) {
        return jl_AbstractStringBuilder_length($this);
    }
    function jl_StringBuilder_toString($this) {
        return jl_AbstractStringBuilder_toString($this);
    }
    function jl_StringBuilder_ensureCapacity($this, var$1) {
        jl_AbstractStringBuilder_ensureCapacity($this, var$1);
    }
    function jl_StringBuilder_insert3($this, var$1, var$2) {
        return $this.$insert5(var$1, var$2);
    }
    function jl_StringBuilder_insert4($this, var$1, var$2) {
        return $this.$insert6(var$1, var$2);
    }
    function jl_StringBuilder_insert5($this, var$1, var$2) {
        return $this.$insert7(var$1, var$2);
    }
    function jl_StringBuilder_insert6($this, var$1, var$2) {
        return $this.$insert8(var$1, var$2);
    }
    var ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
    function ju_ConcurrentModificationException__init_() {
        var var_0 = new ju_ConcurrentModificationException();
        ju_ConcurrentModificationException__init_0(var_0);
        return var_0;
    }
    function ju_ConcurrentModificationException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    var jlr_AnnotatedElement = $rt_classWithoutFields(0);
    function ucits_BootstrapButton() {
        jl_Object.call(this);
        this.$element = null;
    }
    function ucits_BootstrapButton__init_() {
        var var_0 = new ucits_BootstrapButton();
        ucits_BootstrapButton__init_0(var_0);
        return var_0;
    }
    function ucits_BootstrapButton__init_0($this) {
        var var$1, var$2;
        jl_Object__init_0($this);
        $this.$element = $rt_globals.window.document.createElement("button");
        var$1 = $this.$element;
        var$2 = "btn";
        var$1.className = var$2;
    }
    function ucits_BootstrapButton_addStyle($this, $style) {
        $this.$element.classList.add($rt_ustr($style));
    }
    var otjde_FocusEventTarget = $rt_classWithoutFields(0);
    var otjde_MouseEventTarget = $rt_classWithoutFields(0);
    var otjde_KeyboardEventTarget = $rt_classWithoutFields(0);
    var otjb_WindowEventTarget = $rt_classWithoutFields(0);
    var jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_ClassCastException__init_() {
        var var_0 = new jl_ClassCastException();
        jl_ClassCastException__init_0(var_0);
        return var_0;
    }
    function jl_ClassCastException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    var jl_Iterable = $rt_classWithoutFields(0);
    var ju_Collection = $rt_classWithoutFields(0);
    var ju_AbstractCollection = $rt_classWithoutFields();
    function ju_AbstractCollection__init_($this) {
        jl_Object__init_0($this);
    }
    var ju_SequencedCollection = $rt_classWithoutFields(0);
    var ju_List = $rt_classWithoutFields(0);
    function ju_AbstractList() {
        ju_AbstractCollection.call(this);
        this.$modCount = 0;
    }
    function ju_AbstractList__init_($this) {
        ju_AbstractCollection__init_($this);
    }
    function ju_AbstractList_iterator($this) {
        return ju_AbstractList$1__init_($this);
    }
    var jl_Cloneable = $rt_classWithoutFields(0);
    var ju_RandomAccess = $rt_classWithoutFields(0);
    function ju_ArrayList() {
        var a = this; ju_AbstractList.call(a);
        a.$array0 = null;
        a.$size = 0;
    }
    function ju_ArrayList__init_() {
        var var_0 = new ju_ArrayList();
        ju_ArrayList__init_0(var_0);
        return var_0;
    }
    function ju_ArrayList__init_1(var_0) {
        var var_1 = new ju_ArrayList();
        ju_ArrayList__init_2(var_1, var_0);
        return var_1;
    }
    function ju_ArrayList__init_0($this) {
        ju_ArrayList__init_2($this, 10);
    }
    function ju_ArrayList__init_2($this, $initialCapacity) {
        ju_AbstractList__init_($this);
        if ($initialCapacity >= 0) {
            $this.$array0 = $rt_createArray(jl_Object, $initialCapacity);
            return;
        }
        $rt_throw(jl_IllegalArgumentException__init_0());
    }
    function ju_ArrayList_ensureCapacity($this, $minCapacity) {
        var $newLength;
        if ($rt_nullCheck($this.$array0).data.length < $minCapacity) {
            $newLength = $rt_nullCheck($this.$array0).data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($rt_nullCheck($this.$array0).data.length * 2 | 0, 5));
            $this.$array0 = ju_Arrays_copyOf0($this.$array0, $newLength);
        }
    }
    function ju_ArrayList_get($this, $index) {
        var var$2;
        ju_ArrayList_checkIndex($this, $index);
        var$2 = $rt_nullCheck($this.$array0).data;
        $index = $rt_checkBounds($index, var$2);
        return var$2[$index];
    }
    function ju_ArrayList_size($this) {
        return $this.$size;
    }
    function ju_ArrayList_add($this, $element) {
        var var$2, var$3;
        $this.$ensureCapacity($this.$size + 1 | 0);
        var$2 = $this.$array0;
        var$3 = $this.$size;
        $this.$size = var$3 + 1 | 0;
        var$2 = $rt_nullCheck(var$2).data;
        var$2[$rt_checkBounds(var$3, var$2)] = $element;
        $this.$modCount = $this.$modCount + 1 | 0;
        return 1;
    }
    function ju_ArrayList_checkIndex($this, $index) {
        if ($index >= 0 && $index < $this.$size)
            return;
        $rt_throw(jl_IndexOutOfBoundsException__init_());
    }
    var jnc_CoderMalfunctionError = $rt_classWithoutFields(jl_Error);
    function jnc_CoderMalfunctionError__init_(var_0) {
        var var_1 = new jnc_CoderMalfunctionError();
        jnc_CoderMalfunctionError__init_0(var_1, var_0);
        return var_1;
    }
    function jnc_CoderMalfunctionError__init_0($this, $cause) {
        jl_Error__init_2($this, $cause);
    }
    var otjb_StorageProvider = $rt_classWithoutFields(0);
    var otjc_JSArrayReader = $rt_classWithoutFields(0);
    var otjb_Window = $rt_classWithoutFields();
    function otjb_Window_get$exported$0(var$0, var$1) {
        return otji_JSWrapper_javaToJs(var$0.$get(var$1));
    }
    function otjb_Window_addEventListener$exported$1(var$0, var$1, var$2) {
        var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
    }
    function otjb_Window_removeEventListener$exported$2(var$0, var$1, var$2) {
        var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
    }
    function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
        var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
    }
    function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
        return !!var$0.$dispatchEvent(var$1);
    }
    function otjb_Window_getLength$exported$5(var$0) {
        return var$0.$getLength0();
    }
    function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
        var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
    }
    function jl_StackTraceElement() {
        var a = this; jl_Object.call(a);
        a.$declaringClass = null;
        a.$methodName = null;
        a.$fileName = null;
        a.$lineNumber = 0;
    }
    function jl_StackTraceElement__init_(var_0, var_1, var_2, var_3) {
        var var_4 = new jl_StackTraceElement();
        jl_StackTraceElement__init_0(var_4, var_0, var_1, var_2, var_3);
        return var_4;
    }
    function jl_StackTraceElement__init_0($this, $declaringClass, $methodName, $fileName, $lineNumber) {
        jl_Object__init_0($this);
        if ($declaringClass !== null && $methodName !== null) {
            $this.$declaringClass = $declaringClass;
            $this.$methodName = $methodName;
            $this.$fileName = $fileName;
            $this.$lineNumber = $lineNumber;
            return;
        }
        $rt_throw(jl_NullPointerException__init_());
    }
    function jl_StackTraceElement_toString($this) {
        var $sb, $index;
        $sb = jl_StringBuilder__init_();
        $index = $rt_nullCheck($this.$declaringClass).$lastIndexOf(46);
        $rt_nullCheck($rt_nullCheck($rt_nullCheck($sb.$append8($rt_nullCheck($this.$declaringClass).$substring($index + 1 | 0))).$append0(46)).$append8($this.$methodName)).$append0(40);
        if ($this.$fileName === null)
            $sb.$append8($rt_s(12));
        else
            $rt_nullCheck($rt_nullCheck($sb.$append8($this.$fileName)).$append0(58)).$append1($this.$lineNumber);
        $sb.$append8($rt_s(13));
        return $sb.$toString();
    }
    function jl_String() {
        var a = this; jl_Object.call(a);
        a.$characters = null;
        a.$hashCode = 0;
    }
    var jl_String_EMPTY_CHARS = null;
    var jl_String_EMPTY = null;
    var jl_String_CASE_INSENSITIVE_ORDER = null;
    function jl_String_$callClinit() {
        jl_String_$callClinit = $rt_eraseClinit(jl_String);
        jl_String__clinit_();
    }
    function jl_String__init_1() {
        var var_0 = new jl_String();
        jl_String__init_2(var_0);
        return var_0;
    }
    function jl_String__init_(var_0) {
        var var_1 = new jl_String();
        jl_String__init_3(var_1, var_0);
        return var_1;
    }
    function jl_String__init_0(var_0, var_1, var_2) {
        var var_3 = new jl_String();
        jl_String__init_4(var_3, var_0, var_1, var_2);
        return var_3;
    }
    function jl_String__init_2($this) {
        jl_String_$callClinit();
        jl_Object__init_0($this);
        $this.$characters = jl_String_EMPTY_CHARS;
    }
    function jl_String__init_3($this, $characters) {
        jl_String_$callClinit();
        $characters = $rt_nullCheck($characters);
        jl_String__init_4($this, $characters, 0, $characters.data.length);
    }
    function jl_String__init_4($this, $value, $offset, $count) {
        jl_String_$callClinit();
        jl_Object__init_0($this);
        $this.$characters = $rt_createCharArray($count);
        jl_System_fastArraycopy($value, $offset, $this.$characters, 0, $count);
    }
    function jl_String_charAt($this, $index) {
        var var$2;
        if ($index >= 0 && $index < $rt_nullCheck($this.$characters).data.length) {
            var$2 = $rt_nullCheck($this.$characters).data;
            $index = $rt_checkBounds($index, var$2);
            return var$2[$index];
        }
        $rt_throw(jl_StringIndexOutOfBoundsException__init_());
    }
    function jl_String_length($this) {
        return $rt_nullCheck($this.$characters).data.length;
    }
    function jl_String_isEmpty($this) {
        return $rt_nullCheck($this.$characters).data.length ? 0 : 1;
    }
    function jl_String_lastIndexOf($this, $ch, $fromIndex) {
        var $i, $bmpChar, var$5, $hi, $lo, var$8, var$9;
        $i = jl_Math_min($fromIndex, $this.$length0() - 1 | 0);
        if ($ch < 65536) {
            $bmpChar = $ch & 65535;
            while (true) {
                if ($i < 0)
                    return (-1);
                var$5 = $rt_nullCheck($this.$characters).data;
                $i = $rt_checkBounds($i, var$5);
                if (var$5[$i] == $bmpChar)
                    break;
                $i = $i + (-1) | 0;
            }
            return $i;
        }
        $hi = jl_Character_highSurrogate($ch);
        $lo = jl_Character_lowSurrogate($ch);
        while (true) {
            if ($i < 1)
                return (-1);
            var$5 = $rt_nullCheck($this.$characters).data;
            $i = $rt_checkUpperBound($i, var$5);
            if (var$5[$i] == $lo) {
                var$5 = $this.$characters;
                var$8 = $i - 1 | 0;
                var$5 = $rt_nullCheck(var$5).data;
                var$9 = $rt_checkBounds(var$8, var$5);
                if (var$5[var$9] == $hi)
                    break;
            }
            $i = $i + (-1) | 0;
        }
        return var$9;
    }
    function jl_String_lastIndexOf0($this, $ch) {
        return $this.$lastIndexOf0($ch, $this.$length0() - 1 | 0);
    }
    function jl_String_substring($this, $beginIndex, $endIndex) {
        var var$3;
        var$3 = $rt_compare($beginIndex, $endIndex);
        if (var$3 > 0)
            $rt_throw(jl_IndexOutOfBoundsException__init_());
        if (!var$3) {
            jl_String_$callClinit();
            return jl_String_EMPTY;
        }
        if (!$beginIndex && $endIndex == $this.$length0())
            return $this;
        return jl_String__init_0($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
    }
    function jl_String_substring0($this, $beginIndex) {
        return $this.$substring0($beginIndex, $this.$length0());
    }
    function jl_String_toString($this) {
        return $rt_castToClass($this, jl_String);
    }
    function jl_String_equals($this, $other) {
        var $str, $i;
        if ($this === $other)
            return 1;
        if (!($other instanceof jl_String))
            return 0;
        $str = $rt_castToClass($other, jl_String);
        $str = $rt_nullCheck($str);
        if ($str.$length0() != $this.$length0())
            return 0;
        $i = 0;
        while ($i < $str.$length0()) {
            if ($this.$charAt($i) != $str.$charAt($i))
                return 0;
            $i = $i + 1 | 0;
        }
        return 1;
    }
    function jl_String_hashCode($this) {
        var var$1, var$2, var$3, var$4, $c;
        a: {
            if (!$this.$hashCode) {
                var$1 = $rt_nullCheck($this.$characters).data;
                var$2 = var$1.length;
                var$3 = 0;
                while (true) {
                    if (var$3 >= var$2)
                        break a;
                    var$4 = $rt_checkLowerBound(var$3);
                    $c = var$1[var$4];
                    $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                    var$3 = var$4 + 1 | 0;
                }
            }
        }
        return $this.$hashCode;
    }
    function jl_String__clinit_() {
        jl_String_EMPTY_CHARS = $rt_createCharArray(0);
        jl_String_EMPTY = jl_String__init_1();
        jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_93_0__init_();
    }
    var jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_NegativeArraySizeException__init_() {
        var var_0 = new jl_NegativeArraySizeException();
        jl_NegativeArraySizeException__init_0(var_0);
        return var_0;
    }
    function jl_NegativeArraySizeException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    var otjc_JSFinalizationRegistryConsumer = $rt_classWithoutFields(0);
    var otji_JSWrapper$_clinit_$lambda$_30_0 = $rt_classWithoutFields();
    function otji_JSWrapper$_clinit_$lambda$_30_0__init_() {
        var var_0 = new otji_JSWrapper$_clinit_$lambda$_30_0();
        otji_JSWrapper$_clinit_$lambda$_30_0__init_0(var_0);
        return var_0;
    }
    function otji_JSWrapper$_clinit_$lambda$_30_0__init_0(var$0) {
        jl_Object__init_0(var$0);
    }
    function otji_JSWrapper$_clinit_$lambda$_30_0_accept(var$0, var$1) {
        otji_JSWrapper_lambda$static$0(var$1);
    }
    function otji_JSWrapper$_clinit_$lambda$_30_0_accept$exported$0(var$0, var$1) {
        var$0.$accept(otji_JSWrapper_jsToJava(var$1));
    }
    function jnc_CharsetEncoder() {
        var a = this; jl_Object.call(a);
        a.$charset = null;
        a.$replacement = null;
        a.$averageBytesPerChar = 0.0;
        a.$maxBytesPerChar = 0.0;
        a.$malformedAction = null;
        a.$unmappableAction = null;
        a.$status = 0;
    }
    function jnc_CharsetEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar, $replacement) {
        jl_Object__init_0($this);
        jnc_CodingErrorAction_$callClinit();
        $this.$malformedAction = jnc_CodingErrorAction_REPORT;
        $this.$unmappableAction = jnc_CodingErrorAction_REPORT;
        jnc_CharsetEncoder_checkReplacement($this, $replacement);
        $this.$charset = $cs;
        $replacement = $rt_nullCheck($replacement);
        $this.$replacement = $rt_castToInterface($replacement.$clone(), $rt_arraycls($rt_bytecls()));
        $this.$averageBytesPerChar = $averageBytesPerChar;
        $this.$maxBytesPerChar = $maxBytesPerChar;
    }
    function jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar) {
        var var$4, var$5;
        var$4 = $rt_createByteArray(1);
        var$5 = var$4.data;
        var$5[$rt_checkUpperBound(0, var$5)] = 63;
        jnc_CharsetEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar, var$4);
    }
    function jnc_CharsetEncoder_checkReplacement($this, $replacement) {
        var var$2;
        if ($replacement !== null) {
            var$2 = $replacement.data.length;
            if (var$2 && var$2 >= $this.$maxBytesPerChar)
                return;
        }
        $rt_throw(jl_IllegalArgumentException__init_1($rt_s(14)));
    }
    function jnc_CharsetEncoder_onMalformedInput($this, $newAction) {
        if ($newAction !== null) {
            $this.$malformedAction = $newAction;
            $this.$implOnMalformedInput($newAction);
            return $this;
        }
        $rt_throw(jl_IllegalArgumentException__init_1($rt_s(15)));
    }
    function jnc_CharsetEncoder_implOnMalformedInput($this, $newAction) {}
    function jnc_CharsetEncoder_onUnmappableCharacter($this, $newAction) {
        if ($newAction !== null) {
            $this.$unmappableAction = $newAction;
            $this.$implOnUnmappableCharacter($newAction);
            return $this;
        }
        $rt_throw(jl_IllegalArgumentException__init_1($rt_s(15)));
    }
    function jnc_CharsetEncoder_implOnUnmappableCharacter($this, $newAction) {}
    function jnc_CharsetEncoder_encode($this, $in, $out, $endOfInput) {
        var $result, $e, $remaining, var$7, $action, $$je;
        a: {
            if ($this.$status != 3) {
                if ($endOfInput)
                    break a;
                if ($this.$status != 2)
                    break a;
            }
            $rt_throw(jl_IllegalStateException__init_());
        }
        $this.$status = !$endOfInput ? 1 : 2;
        while (true) {
            try {
                $result = $this.$encodeLoop($in, $out);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_RuntimeException) {
                    $e = $$je;
                    $rt_throw(jnc_CoderMalfunctionError__init_($e));
                } else {
                    throw $$e;
                }
            }
            $result = $rt_nullCheck($result);
            if ($result.$isUnderflow()) {
                if (!$endOfInput)
                    return $result;
                $in = $rt_nullCheck($in);
                $remaining = jn_Buffer_remaining($in);
                if ($remaining <= 0)
                    return $result;
                $result = jnc_CoderResult_malformedForLength($remaining);
            } else if ($result.$isOverflow())
                return $result;
            var$7 = $rt_nullCheck($result);
            $action = !var$7.$isUnmappable() ? $this.$malformedAction : $this.$unmappableAction;
            jnc_CodingErrorAction_$callClinit();
            if ($action === jnc_CodingErrorAction_REPLACE) {
                $out = $rt_nullCheck($out);
                if (jn_Buffer_remaining($out) < $rt_nullCheck($this.$replacement).data.length)
                    return jnc_CoderResult_OVERFLOW;
                jn_ByteBuffer_put($out, $this.$replacement);
            } else if ($action !== jnc_CodingErrorAction_IGNORE)
                break;
            $in = $rt_nullCheck($in);
            $in.$position1(jn_Buffer_position($in) + var$7.$length0() | 0);
        }
        return var$7;
    }
    function jnc_CharsetEncoder_flush($this, $out) {
        var $result;
        if ($this.$status != 2 && $this.$status != 4)
            $rt_throw(jl_IllegalStateException__init_());
        $result = $this.$implFlush($out);
        jnc_CoderResult_$callClinit();
        if ($result === jnc_CoderResult_UNDERFLOW)
            $this.$status = 3;
        return $result;
    }
    function jnc_CharsetEncoder_implFlush($this, $out) {
        jnc_CoderResult_$callClinit();
        return jnc_CoderResult_UNDERFLOW;
    }
    function jnci_BufferedEncoder() {
        var a = this; jnc_CharsetEncoder.call(a);
        a.$inArray = null;
        a.$outArray = null;
    }
    function jnci_BufferedEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar) {
        jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar);
        $this.$inArray = $rt_createCharArray(512);
        $this.$outArray = $rt_createByteArray(512);
    }
    function jnci_BufferedEncoder_encodeLoop($this, $in, $out) {
        var $inArray, $inPos, $inSize, $outArray, $i, var$8, var$9, var$10, $result, $outPos, $outSize, $controller;
        $inArray = $this.$inArray;
        $inPos = 0;
        $inSize = 0;
        $outArray = $this.$outArray;
        a: {
            while (true) {
                if (($inPos + 32 | 0) > $inSize) {
                    $in = $rt_nullCheck($in);
                    if (jn_Buffer_hasRemaining($in)) {
                        $i = $inPos;
                        while ($i < $inSize) {
                            var$8 = $i - $inPos | 0;
                            $inArray = $rt_nullCheck($inArray);
                            var$9 = $inArray.data;
                            $i = $rt_checkBounds($i, var$9);
                            var$9[$rt_checkBounds(var$8, var$9)] = var$9[$i];
                            $i = $i + 1 | 0;
                        }
                        var$8 = $inSize - $inPos | 0;
                        var$10 = jn_Buffer_remaining($in) + var$8 | 0;
                        $inArray = $rt_nullCheck($inArray);
                        $inSize = jl_Math_min(var$10, $inArray.data.length);
                        $in.$get0($inArray, var$8, $inSize - var$8 | 0);
                        $inPos = 0;
                    }
                }
                $out = $rt_nullCheck($out);
                if (!jn_Buffer_hasRemaining($out)) {
                    $in = $rt_nullCheck($in);
                    if (!jn_Buffer_hasRemaining($in) && $inPos >= $inSize) {
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_UNDERFLOW;
                    } else {
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_OVERFLOW;
                    }
                    break a;
                }
                $outPos = 0;
                var$8 = jn_Buffer_remaining($out);
                $outArray = $rt_nullCheck($outArray);
                $outSize = jl_Math_min(var$8, $outArray.data.length);
                $controller = jnci_BufferedEncoder$Controller__init_($in, $out);
                $result = $this.$arrayEncode($inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller);
                $inPos = $controller.$inPosition;
                var$8 = $controller.$outPosition;
                if ($result === null) {
                    $in = $rt_nullCheck($in);
                    if (!jn_Buffer_hasRemaining($in) && $inPos >= $inSize) {
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_UNDERFLOW;
                    } else if (!jn_Buffer_hasRemaining($out) && $inPos >= $inSize) {
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_OVERFLOW;
                    }
                }
                $out.$put0($outArray, 0, var$8);
                if ($result !== null)
                    break;
            }
        }
        $in = $rt_nullCheck($in);
        $in.$position1(jn_Buffer_position($in) - ($inSize - $inPos | 0) | 0);
        return $result;
    }
    var jnci_UTF8Encoder = $rt_classWithoutFields(jnci_BufferedEncoder);
    function jnci_UTF8Encoder__init_(var_0) {
        var var_1 = new jnci_UTF8Encoder();
        jnci_UTF8Encoder__init_0(var_1, var_0);
        return var_1;
    }
    function jnci_UTF8Encoder__init_0($this, $cs) {
        jnci_BufferedEncoder__init_($this, $cs, 2.0, 4.0);
    }
    function jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) {
        var $result, var$9, var$10, $ch, var$12, var$13, var$14, $low, $codePoint, var$17, var$18;
        $result = null;
        a: {
            while ($inPos < $inSize) {
                if ($outPos >= $outSize) {
                    var$9 = $inPos;
                    break a;
                }
                var$9 = $inPos + 1 | 0;
                $inArray = $rt_nullCheck($inArray);
                var$10 = $inArray.data;
                $ch = var$10[$rt_checkBounds($inPos, var$10)];
                if ($ch < 128) {
                    var$12 = $outPos + 1 | 0;
                    var$13 = $ch << 24 >> 24;
                    $outArray = $rt_nullCheck($outArray);
                    var$10 = $outArray.data;
                    var$10[$rt_checkBounds($outPos, var$10)] = var$13;
                } else if ($ch < 2048) {
                    if (($outPos + 2 | 0) > $outSize) {
                        var$9 = var$9 + (-1) | 0;
                        $controller = $rt_nullCheck($controller);
                        if ($controller.$hasMoreOutput(2))
                            break a;
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$14 = $outPos + 1 | 0;
                    var$12 = (192 | $ch >> 6) << 24 >> 24;
                    $outArray = $rt_nullCheck($outArray);
                    var$10 = $outArray.data;
                    var$10[$rt_checkBounds($outPos, var$10)] = var$12;
                    var$12 = var$14 + 1 | 0;
                    var$10[$rt_checkBounds(var$14, var$10)] = (128 | $ch & 63) << 24 >> 24;
                } else if (!jl_Character_isSurrogate($ch)) {
                    if (($outPos + 3 | 0) > $outSize) {
                        var$9 = var$9 + (-1) | 0;
                        $controller = $rt_nullCheck($controller);
                        if ($controller.$hasMoreOutput(3))
                            break a;
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$12 = $outPos + 1 | 0;
                    var$14 = (224 | $ch >> 12) << 24 >> 24;
                    $outArray = $rt_nullCheck($outArray);
                    var$10 = $outArray.data;
                    var$10[$rt_checkBounds($outPos, var$10)] = var$14;
                    var$14 = var$12 + 1 | 0;
                    var$10[$rt_checkBounds(var$12, var$10)] = (128 | $ch >> 6 & 63) << 24 >> 24;
                    var$12 = var$14 + 1 | 0;
                    var$10[$rt_checkBounds(var$14, var$10)] = (128 | $ch & 63) << 24 >> 24;
                } else {
                    if (!jl_Character_isHighSurrogate($ch)) {
                        $result = jnc_CoderResult_malformedForLength(1);
                        break a;
                    }
                    if (var$9 >= $inSize) {
                        $controller = $rt_nullCheck($controller);
                        if ($controller.$hasMoreInput())
                            break a;
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_UNDERFLOW;
                        break a;
                    }
                    var$13 = var$9 + 1 | 0;
                    $low = var$10[$rt_checkBounds(var$9, var$10)];
                    if (!jl_Character_isLowSurrogate($low)) {
                        var$9 = var$13 + (-2) | 0;
                        $result = jnc_CoderResult_malformedForLength(1);
                        break a;
                    }
                    if (($outPos + 4 | 0) > $outSize) {
                        var$9 = var$13 + (-2) | 0;
                        $controller = $rt_nullCheck($controller);
                        if ($controller.$hasMoreOutput(4))
                            break a;
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    $codePoint = jl_Character_toCodePoint($ch, $low);
                    var$12 = $outPos + 1 | 0;
                    var$14 = (240 | $codePoint >> 18) << 24 >> 24;
                    $outArray = $rt_nullCheck($outArray);
                    var$10 = $outArray.data;
                    var$10[$rt_checkBounds($outPos, var$10)] = var$14;
                    var$17 = var$12 + 1 | 0;
                    var$10[$rt_checkBounds(var$12, var$10)] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                    var$18 = var$17 + 1 | 0;
                    var$10[$rt_checkBounds(var$17, var$10)] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                    var$12 = var$18 + 1 | 0;
                    var$10[$rt_checkBounds(var$18, var$10)] = (128 | $codePoint & 63) << 24 >> 24;
                    var$9 = var$13;
                }
                $inPos = var$9;
                $outPos = var$12;
            }
            var$9 = $inPos;
        }
        $controller = $rt_nullCheck($controller);
        $controller.$setInPosition(var$9);
        $controller.$setOutPosition($outPos);
        return $result;
    }
    var otji_JSWrapper$_clinit_$lambda$_30_1 = $rt_classWithoutFields();
    function otji_JSWrapper$_clinit_$lambda$_30_1__init_() {
        var var_0 = new otji_JSWrapper$_clinit_$lambda$_30_1();
        otji_JSWrapper$_clinit_$lambda$_30_1__init_0(var_0);
        return var_0;
    }
    function otji_JSWrapper$_clinit_$lambda$_30_1__init_0(var$0) {
        jl_Object__init_0(var$0);
    }
    function otji_JSWrapper$_clinit_$lambda$_30_1_accept(var$0, var$1) {
        otji_JSWrapper_lambda$static$1(var$1);
    }
    function otji_JSWrapper$_clinit_$lambda$_30_1_accept$exported$0(var$0, var$1) {
        var$0.$accept(otji_JSWrapper_jsToJava(var$1));
    }
    var jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_UnsupportedOperationException__init_() {
        var var_0 = new jl_UnsupportedOperationException();
        jl_UnsupportedOperationException__init_0(var_0);
        return var_0;
    }
    function jl_UnsupportedOperationException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    var jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
    function jl_IncompatibleClassChangeError__init_(var_0) {
        var var_1 = new jl_IncompatibleClassChangeError();
        jl_IncompatibleClassChangeError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_IncompatibleClassChangeError__init_0($this, $message) {
        jl_LinkageError__init_0($this, $message);
    }
    var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
    function jl_NoSuchMethodError__init_(var_0) {
        var var_1 = new jl_NoSuchMethodError();
        jl_NoSuchMethodError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_NoSuchMethodError__init_0($this, $message) {
        jl_IncompatibleClassChangeError__init_0($this, $message);
    }
    var ji_IOException = $rt_classWithoutFields(jl_Exception);
    var jl_ArrayIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
    function jl_ArrayIndexOutOfBoundsException__init_() {
        var var_0 = new jl_ArrayIndexOutOfBoundsException();
        jl_ArrayIndexOutOfBoundsException__init_0(var_0);
        return var_0;
    }
    function jl_ArrayIndexOutOfBoundsException__init_0($this) {
        jl_IndexOutOfBoundsException__init_0($this);
    }
    var ucits_BootstrapButtonBenchmarkTest = $rt_classWithoutFields();
    function ucits_BootstrapButtonBenchmarkTest__init_() {
        var var_0 = new ucits_BootstrapButtonBenchmarkTest();
        ucits_BootstrapButtonBenchmarkTest__init_0(var_0);
        return var_0;
    }
    function ucits_BootstrapButtonBenchmarkTest__init_0($this) {
        jl_Object__init_0($this);
    }
    function ucits_BootstrapButtonBenchmarkTest_benchmarkAddStyle($this) {
        var $btn, $i, var$3, $start, $end, $duration, var$7;
        $btn = ucits_BootstrapButton__init_();
        $i = 0;
        while ($i < 1000) {
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(16))), $i);
            $btn.$addStyle(jl_StringBuilder_toString(var$3));
            $i = $i + 1 | 0;
        }
        $start = jl_System_currentTimeMillis();
        $i = 0;
        while ($i < 100000) {
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(17))), $i);
            $btn.$addStyle(jl_StringBuilder_toString(var$3));
            $i = $i + 1 | 0;
        }
        $end = jl_System_currentTimeMillis();
        $duration = Long_sub($end, $start);
        var$3 = jl_System_out();
        var$7 = jl_StringBuilder__init_();
        jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append3($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(18))), $duration)), $rt_s(19));
        var$7 = jl_StringBuilder_toString(var$7);
        $rt_nullCheck(var$3).$println(var$7);
    }
    function jnc_Charset() {
        var a = this; jl_Object.call(a);
        a.$canonicalName = null;
        a.$aliases = null;
    }
    function jnc_Charset__init_($this, $canonicalName, $aliases) {
        var var$3, var$4, var$5, var$6, $alias;
        jl_Object__init_0($this);
        jnc_Charset_checkCanonicalName($canonicalName);
        $aliases = $rt_nullCheck($aliases);
        var$3 = $aliases.data;
        var$4 = var$3.length;
        var$5 = 0;
        while (var$5 < var$4) {
            var$6 = $rt_checkLowerBound(var$5);
            $alias = var$3[var$6];
            jnc_Charset_checkCanonicalName($alias);
            var$5 = var$6 + 1 | 0;
        }
        $this.$canonicalName = $canonicalName;
        $this.$aliases = $rt_castToInterface($aliases.$clone(), $rt_arraycls(jl_String));
    }
    function jnc_Charset_checkCanonicalName($name) {
        var $i, $c;
        $name = $rt_nullCheck($name);
        if ($name.$isEmpty())
            $rt_throw(jnc_IllegalCharsetNameException__init_($name));
        if (!jnc_Charset_isValidCharsetStart($name.$charAt(0)))
            $rt_throw(jnc_IllegalCharsetNameException__init_($name));
        $i = 1;
        while ($i < $name.$length0()) {
            a: {
                $c = $name.$charAt($i);
                switch ($c) {
                    case 43:
                    case 45:
                    case 46:
                    case 58:
                    case 95:
                        break;
                    default:
                        if (jnc_Charset_isValidCharsetStart($c))
                            break a;
                        else
                            $rt_throw(jnc_IllegalCharsetNameException__init_($name));
                }
            }
            $i = $i + 1 | 0;
        }
    }
    function jnc_Charset_isValidCharsetStart($c) {
        var var$2;
        a: {
            b: {
                if (!($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122)) {
                    if ($c < 65)
                        break b;
                    if ($c > 90)
                        break b;
                }
                var$2 = 1;
                break a;
            }
            var$2 = 0;
        }
        return var$2;
    }
    var jnci_UTF8Charset = $rt_classWithoutFields(jnc_Charset);
    var jnci_UTF8Charset_INSTANCE = null;
    function jnci_UTF8Charset_$callClinit() {
        jnci_UTF8Charset_$callClinit = $rt_eraseClinit(jnci_UTF8Charset);
        jnci_UTF8Charset__clinit_();
    }
    function jnci_UTF8Charset__init_() {
        var var_0 = new jnci_UTF8Charset();
        jnci_UTF8Charset__init_0(var_0);
        return var_0;
    }
    function jnci_UTF8Charset__init_0($this) {
        jnci_UTF8Charset_$callClinit();
        jnc_Charset__init_($this, $rt_s(20), $rt_createArray(jl_String, 0));
    }
    function jnci_UTF8Charset_newEncoder($this) {
        return jnci_UTF8Encoder__init_($this);
    }
    function jnci_UTF8Charset__clinit_() {
        jnci_UTF8Charset_INSTANCE = jnci_UTF8Charset__init_();
    }
    var ju_Iterator = $rt_classWithoutFields(0);
    function ju_AbstractList$1() {
        var a = this; jl_Object.call(a);
        a.$index = 0;
        a.$modCount0 = 0;
        a.$size0 = 0;
        a.$removeIndex = 0;
        a.$this$0 = null;
    }
    function ju_AbstractList$1__init_(var_0) {
        var var_1 = new ju_AbstractList$1();
        ju_AbstractList$1__init_0(var_1, var_0);
        return var_1;
    }
    function ju_AbstractList$1__init_0($this, $this$0) {
        $this.$this$0 = $this$0;
        jl_Object__init_0($this);
        $this.$modCount0 = $rt_nullCheck($this.$this$0).$modCount;
        $this.$size0 = $rt_nullCheck($this.$this$0).$size1();
        $this.$removeIndex = (-1);
    }
    function ju_AbstractList$1_hasNext($this) {
        return $this.$index >= $this.$size0 ? 0 : 1;
    }
    function ju_AbstractList$1_next($this) {
        var var$1, var$2;
        ju_AbstractList$1_checkConcurrentModification($this);
        $this.$removeIndex = $this.$index;
        var$1 = $this.$this$0;
        var$2 = $this.$index;
        $this.$index = var$2 + 1 | 0;
        return $rt_nullCheck(var$1).$get(var$2);
    }
    function ju_AbstractList$1_checkConcurrentModification($this) {
        if ($this.$modCount0 >= $rt_nullCheck($this.$this$0).$modCount)
            return;
        $rt_throw(ju_ConcurrentModificationException__init_());
    }
    var jn_ReadOnlyBufferException = $rt_classWithoutFields(jl_UnsupportedOperationException);
    function jn_ReadOnlyBufferException__init_() {
        var var_0 = new jn_ReadOnlyBufferException();
        jn_ReadOnlyBufferException__init_0(var_0);
        return var_0;
    }
    function jn_ReadOnlyBufferException__init_0($this) {
        jl_UnsupportedOperationException__init_0($this);
    }
    var jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_IllegalStateException__init_() {
        var var_0 = new jl_IllegalStateException();
        jl_IllegalStateException__init_0(var_0);
        return var_0;
    }
    function jl_IllegalStateException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    var jlr_Array = $rt_classWithoutFields();
    function jlr_Array_getLength(var$1) {
        if (var$1 === null || var$1.constructor.$meta.item === undefined) {
            $rt_throw(jl_IllegalArgumentException__init_0());
        }
        return var$1.data.length;
    }
    function jlr_Array_newInstance($componentType, $length) {
        if ($componentType === null)
            $rt_throw(jl_NullPointerException__init_());
        if ($componentType === $rt_cls($rt_voidcls()))
            $rt_throw(jl_IllegalArgumentException__init_0());
        if ($length < 0)
            $rt_throw(jl_NegativeArraySizeException__init_());
        return jlr_Array_newInstanceImpl($rt_nullCheck($rt_castToClass($componentType, jl_Class)).$getPlatformClass(), $length);
    }
    function jlr_Array_newInstanceImpl(var$1, var$2) {
        if (var$1.$meta.primitive) {
            if (var$1 == $rt_bytecls()) {
                return $rt_createByteArray(var$2);
            }
            if (var$1 == $rt_shortcls()) {
                return $rt_createShortArray(var$2);
            }
            if (var$1 == $rt_charcls()) {
                return $rt_createCharArray(var$2);
            }
            if (var$1 == $rt_intcls()) {
                return $rt_createIntArray(var$2);
            }
            if (var$1 == $rt_longcls()) {
                return $rt_createLongArray(var$2);
            }
            if (var$1 == $rt_floatcls()) {
                return $rt_createFloatArray(var$2);
            }
            if (var$1 == $rt_doublecls()) {
                return $rt_createDoubleArray(var$2);
            }
            if (var$1 == $rt_booleancls()) {
                return $rt_createBooleanArray(var$2);
            }
        } else {
            return $rt_createArray(var$1, var$2)
        }
    }
    var jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_NullPointerException__init_0(var_0) {
        var var_1 = new jl_NullPointerException();
        jl_NullPointerException__init_1(var_1, var_0);
        return var_1;
    }
    function jl_NullPointerException__init_() {
        var var_0 = new jl_NullPointerException();
        jl_NullPointerException__init_2(var_0);
        return var_0;
    }
    function jl_NullPointerException__init_1($this, $message) {
        jl_RuntimeException__init_2($this, $message);
    }
    function jl_NullPointerException__init_2($this) {
        jl_RuntimeException__init_1($this);
    }
    function jn_ByteBuffer() {
        var a = this; jn_Buffer.call(a);
        a.$start0 = 0;
        a.$array1 = null;
        a.$order = null;
    }
    function jn_ByteBuffer__init_($this, $start, $capacity, $array, $position, $limit) {
        jn_Buffer__init_($this, $capacity);
        jn_ByteOrder_$callClinit();
        $this.$order = jn_ByteOrder_BIG_ENDIAN;
        $this.$start0 = $start;
        $this.$array1 = $array;
        $this.$position = $position;
        $this.$limit = $limit;
    }
    function jn_ByteBuffer_wrap($array, $offset, $length) {
        var var$4;
        var$4 = new jn_ByteBufferImpl;
        $array = $rt_nullCheck($array);
        jn_ByteBufferImpl__init_(var$4, 0, $array.data.length, $array, $offset, $offset + $length | 0, 0, 0);
        return var$4;
    }
    function jn_ByteBuffer_wrap0($array) {
        $array = $rt_nullCheck($array);
        return jn_ByteBuffer_wrap($array, 0, $array.data.length);
    }
    function jn_ByteBuffer_put0($this, $src, $offset, $length) {
        var var$4, var$5, var$6, var$7, var$8, var$9, $pos, $i, var$12, var$13;
        if (!$length)
            return $this;
        if ($this.$isReadOnly())
            $rt_throw(jn_ReadOnlyBufferException__init_());
        if (jn_Buffer_remaining($this) < $length)
            $rt_throw(jn_BufferOverflowException__init_());
        if ($offset >= 0) {
            $src = $rt_nullCheck($src);
            var$4 = $src.data;
            var$5 = var$4.length;
            if ($offset <= var$5) {
                var$6 = $offset + $length | 0;
                if (var$6 > var$5) {
                    var$7 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(21))), var$6)), $rt_s(4))), var$5);
                    jl_IndexOutOfBoundsException__init_2(var$7, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$7);
                }
                if ($length < 0) {
                    var$9 = new jl_IndexOutOfBoundsException;
                    var$7 = jl_StringBuilder__init_();
                    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(5))), $length)), $rt_s(6));
                    jl_IndexOutOfBoundsException__init_2(var$9, jl_StringBuilder_toString(var$7));
                    $rt_throw(var$9);
                }
                $pos = $this.$position + $this.$start0 | 0;
                $i = 0;
                while ($i < $length) {
                    var$12 = $this.$array1;
                    var$6 = $pos + 1 | 0;
                    var$5 = $offset + 1 | 0;
                    var$13 = var$4[$rt_checkBounds($offset, var$4)];
                    var$12 = $rt_nullCheck(var$12).data;
                    var$12[$rt_checkBounds($pos, var$12)] = var$13;
                    $i = $i + 1 | 0;
                    $pos = var$6;
                    $offset = var$5;
                }
                $this.$position = $this.$position + $length | 0;
                return $this;
            }
        }
        var$9 = new jl_IndexOutOfBoundsException;
        $src = $rt_nullCheck($src);
        var$5 = $src.data.length;
        var$7 = jl_StringBuilder__init_();
        jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(7))), $offset)), $rt_s(2))), var$5)), 41);
        jl_IndexOutOfBoundsException__init_2(var$9, jl_StringBuilder_toString(var$7));
        $rt_throw(var$9);
    }
    function jn_ByteBuffer_put($this, $src) {
        $src = $rt_nullCheck($src);
        return $this.$put0($src, 0, $src.data.length);
    }
    function jn_ByteBuffer_clear($this) {
        jn_Buffer_clear($this);
        return $this;
    }
    var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
    function jl_NoSuchFieldError__init_(var_0) {
        var var_1 = new jl_NoSuchFieldError();
        jl_NoSuchFieldError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_NoSuchFieldError__init_0($this, $message) {
        jl_IncompatibleClassChangeError__init_0($this, $message);
    }
    var otci_IntegerUtil = $rt_classWithoutFields();
    function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
        var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0, var$11;
        if (!$value)
            return $rt_s(22);
        $radix = 1 << $radixLog2;
        $mask = $radix - 1 | 0;
        $sz = (((32 - jl_Integer_numberOfLeadingZeros($value) | 0) + $radixLog2 | 0) - 1 | 0) / $radixLog2 | 0;
        $chars = $rt_createCharArray($sz);
        $pos = $rt_imul($sz - 1 | 0, $radixLog2);
        $target = 0;
        while ($pos >= 0) {
            var$9 = $chars.data;
            $target_0 = $target + 1 | 0;
            var$11 = jl_Character_forDigit(($value >>> $pos | 0) & $mask, $radix);
            $target = $rt_checkBounds($target, var$9);
            var$9[$target] = var$11;
            $pos = $pos - $radixLog2 | 0;
            $target = $target_0;
        }
        return jl_String__init_($chars);
    }
    var jl_Math = $rt_classWithoutFields();
    function jl_Math_min($a, $b) {
        if ($a < $b)
            $b = $a;
        return $b;
    }
    function jl_Math_max($a, $b) {
        if ($a > $b)
            $b = $a;
        return $b;
    }
    var otjc_JSWeakMap = $rt_classWithoutFields();
    var otjc_JSObjects = $rt_classWithoutFields();
    var otji_JS = $rt_classWithoutFields();
    function otji_JS_function(var$1, var$2) {
        var name = 'jso$functor$' + var$2;
        if (!var$1[name]) {
            var fn = function() {
                return var$1[var$2].apply(var$1, arguments);
            };
            var$1[name] = function() {
                return fn;
            };
        }
        return var$1[name]();
    }
    function otji_JS_functionAsObject(var$1, var$2) {
        if (typeof var$1 !== "function") return var$1;
        var result = {};
        result[var$2] = var$1;
        return result;
    }
    var otj_TestEntryPoint = $rt_classWithoutFields();
    var otj_TestEntryPoint_testCase = null;
    function otj_TestEntryPoint_run($name) {
        var $launchers, var$3, $launcher, var$5, $e, $$je;
        $launchers = ju_ArrayList__init_();
        otj_TestEntryPoint_testCase = otj_TestEntryPoint_createTestCase();
        otj_TestEntryPoint_launchers($name, $launchers);
        var$3 = $launchers.$iterator();
        while (true) {
            var$3 = $rt_nullCheck(var$3);
            if (!var$3.$hasNext())
                break;
            $launcher = $rt_castToInterface(var$3.$next(), otj_TestEntryPoint$Launcher);
            otj_TestEntryPoint_before();
            try {
                var$5 = otj_TestEntryPoint_testCase;
                $launcher = $rt_nullCheck($launcher);
                $launcher.$launch(var$5);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                var$3 = $$je;
                a: {
                    try {
                        otj_TestEntryPoint_after();
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Throwable) {
                            $e = $$je;
                        } else {
                            throw $$e;
                        }
                    }
                    $e.$printStackTrace();
                }
                $rt_throw(var$3);

            }
            b: {
                try {
                    otj_TestEntryPoint_after();
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        $e = $$je;
                    } else {
                        throw $$e;
                    }
                }
                $e.$printStackTrace();
            }
        }
    }
    function otj_TestEntryPoint_createTestCase() {
        return ucits_BootstrapButtonBenchmarkTest__init_();
    }
    function otj_TestEntryPoint_before() {}
    function otj_TestEntryPoint_launchers(var$1, var$2) {
        if (!jl_String_equals($rt_nullCheck(var$1), $rt_s(23)))
            $rt_throw(jl_IllegalArgumentException__init_1($rt_s(24)));
        var$1 = otj_TestEntryPoint$LauncherImpl0__init_();
        $rt_nullCheck(var$2).$add(var$1);
    }
    function otj_TestEntryPoint_after() {}
    var jlr_Type = $rt_classWithoutFields(0);
    var jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_ArrayStoreException__init_() {
        var var_0 = new jl_ArrayStoreException();
        jl_ArrayStoreException__init_0(var_0);
        return var_0;
    }
    function jl_ArrayStoreException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    function jn_ByteBufferImpl() {
        var a = this; jn_ByteBuffer.call(a);
        a.$direct = 0;
        a.$readOnly0 = 0;
    }
    function jn_ByteBufferImpl__init_0(var_0, var_1, var_2, var_3, var_4, var_5, var_6) {
        var var_7 = new jn_ByteBufferImpl();
        jn_ByteBufferImpl__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
        return var_7;
    }
    function jn_ByteBufferImpl__init_($this, $start, $capacity, $array, $position, $limit, $direct, $readOnly) {
        jn_ByteBuffer__init_($this, $start, $capacity, $array, $position, $limit);
        $this.$direct = $direct;
        $this.$readOnly0 = $readOnly;
    }
    function jn_ByteBufferImpl_isReadOnly($this) {
        return $this.$readOnly0;
    }
    var jn_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException);
    function jn_BufferOverflowException__init_() {
        var var_0 = new jn_BufferOverflowException();
        jn_BufferOverflowException__init_0(var_0);
        return var_0;
    }
    function jn_BufferOverflowException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    function otji_JSWrapper() {
        jl_Object.call(this);
        this.$js = null;
    }
    var otji_JSWrapper_hashCodes = null;
    var otji_JSWrapper_wrappers = null;
    var otji_JSWrapper_stringWrappers = null;
    var otji_JSWrapper_numberWrappers = null;
    var otji_JSWrapper_undefinedWrapper = null;
    var otji_JSWrapper_stringFinalizationRegistry = null;
    var otji_JSWrapper_numberFinalizationRegistry = null;
    function otji_JSWrapper_$callClinit() {
        otji_JSWrapper_$callClinit = $rt_eraseClinit(otji_JSWrapper);
        otji_JSWrapper__clinit_();
    }
    function otji_JSWrapper__init_(var_0) {
        var var_1 = new otji_JSWrapper();
        otji_JSWrapper__init_0(var_1, var_0);
        return var_1;
    }
    function otji_JSWrapper__init_0($this, $js) {
        otji_JSWrapper_$callClinit();
        jl_Object__init_0($this);
        $this.$js = $js;
    }
    function otji_JSWrapper_wrap($o) {
        var $js, $type, $isObject, $existingRef, $existing, $wrapper, $jsString, $wrapperAsJs, $jsNumber;
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        $js = $o;
        $type = $rt_str(typeof $js);
        $type = $rt_nullCheck($type);
        $isObject = !$type.$equals($rt_s(25)) && !$type.$equals($rt_s(26)) ? 0 : 1;
        if ($isObject && $o[$rt_jso_marker] === true)
            return $o;
        if (otji_JSWrapper_wrappers !== null) {
            if ($isObject) {
                $existingRef = otji_JSWrapper_wrappers.get($js);
                $existing = (typeof $existingRef === 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($js);
                otji_JSWrapper_wrappers.set($js, new $rt_globals.WeakRef($wrapper));
                return $wrapper;
            }
            if ($type.$equals($rt_s(27))) {
                $jsString = $js;
                $existingRef = otji_JSWrapper_stringWrappers.get($jsString);
                $existing = (typeof $existingRef === 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($js);
                $wrapperAsJs = $wrapper;
                otji_JSWrapper_stringWrappers.set($jsString, new $rt_globals.WeakRef($wrapperAsJs));
                otji_JSWrapper_register$js_body$_4(otji_JSWrapper_stringFinalizationRegistry, $wrapperAsJs, $jsString);
                return $wrapper;
            }
            if ($type.$equals($rt_s(28))) {
                $jsNumber = $js;
                $existingRef = otji_JSWrapper_numberWrappers.get($jsNumber);
                $existing = (typeof $existingRef === 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($js);
                $wrapperAsJs = $wrapper;
                otji_JSWrapper_numberWrappers.set($jsNumber, new $rt_globals.WeakRef($wrapperAsJs));
                otji_JSWrapper_register$js_body$_4(otji_JSWrapper_numberFinalizationRegistry, $wrapperAsJs, $jsNumber);
                return $wrapper;
            }
            if ($type.$equals($rt_s(29))) {
                $existingRef = otji_JSWrapper_undefinedWrapper;
                $existing = $existingRef === null ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($js);
                $wrapperAsJs = $wrapper;
                otji_JSWrapper_undefinedWrapper = new $rt_globals.WeakRef($wrapperAsJs);
                return $wrapper;
            }
        }
        return otji_JSWrapper__init_($js);
    }
    function otji_JSWrapper_unwrap($o) {
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        return $o[$rt_jso_marker] === true ? $o : $rt_nullCheck($rt_castToClass($o, otji_JSWrapper)).$js;
    }
    function otji_JSWrapper_javaToJs($o) {
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        return $o instanceof $rt_objcls() && $o instanceof otji_JSWrapper ? otji_JSWrapper_unwrap($o) : $o;
    }
    function otji_JSWrapper_jsToJava($o) {
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        return $o instanceof $rt_objcls() ? $o : otji_JSWrapper_wrap($o);
    }
    function otji_JSWrapper_lambda$static$1($token) {
        var var$2, var$3;
        otji_JSWrapper_$callClinit();
        var$2 = otji_JSWrapper_numberWrappers;
        var$3 = otji_JSWrapper_unwrap($token);
        var$2.delete(var$3);
    }
    function otji_JSWrapper_lambda$static$0($token) {
        var var$2, var$3;
        otji_JSWrapper_$callClinit();
        var$2 = otji_JSWrapper_stringWrappers;
        var$3 = otji_JSWrapper_unwrap($token);
        var$2.delete(var$3);
    }
    function otji_JSWrapper__clinit_() {
        var var$1;
        otji_JSWrapper_hashCodes = new $rt_globals.WeakMap();
        var$1 = !(typeof $rt_globals.WeakRef !== 'undefined' ? 1 : 0) ? null : new $rt_globals.WeakMap();
        otji_JSWrapper_wrappers = var$1;
        var$1 = !(typeof $rt_globals.WeakRef !== 'undefined' ? 1 : 0) ? null : new $rt_globals.Map();
        otji_JSWrapper_stringWrappers = var$1;
        var$1 = !(typeof $rt_globals.WeakRef !== 'undefined' ? 1 : 0) ? null : new $rt_globals.Map();
        otji_JSWrapper_numberWrappers = var$1;
        var$1 = otji_JSWrapper_stringWrappers === null ? null : new $rt_globals.FinalizationRegistry(otji_JS_function(otji_JSWrapper$_clinit_$lambda$_30_0__init_(), "accept"));
        otji_JSWrapper_stringFinalizationRegistry = var$1;
        var$1 = otji_JSWrapper_numberWrappers === null ? null : new $rt_globals.FinalizationRegistry(otji_JS_function(otji_JSWrapper$_clinit_$lambda$_30_1__init_(), "accept"));
        otji_JSWrapper_numberFinalizationRegistry = var$1;
    }
    function otji_JSWrapper_register$js_body$_4(var$1, var$2, var$3) {
        return var$1.register(var$2, var$3);
    }
    var otjc_JSMap = $rt_classWithoutFields();
    function jnc_CoderResult() {
        var a = this; jl_Object.call(a);
        a.$kind = 0;
        a.$length1 = 0;
    }
    var jnc_CoderResult_UNDERFLOW = null;
    var jnc_CoderResult_OVERFLOW = null;
    function jnc_CoderResult_$callClinit() {
        jnc_CoderResult_$callClinit = $rt_eraseClinit(jnc_CoderResult);
        jnc_CoderResult__clinit_();
    }
    function jnc_CoderResult__init_(var_0, var_1) {
        var var_2 = new jnc_CoderResult();
        jnc_CoderResult__init_0(var_2, var_0, var_1);
        return var_2;
    }
    function jnc_CoderResult__init_0($this, $kind, $length) {
        jnc_CoderResult_$callClinit();
        jl_Object__init_0($this);
        $this.$kind = $kind;
        $this.$length1 = $length;
    }
    function jnc_CoderResult_isUnderflow($this) {
        return $this.$kind ? 0 : 1;
    }
    function jnc_CoderResult_isOverflow($this) {
        return $this.$kind != 1 ? 0 : 1;
    }
    function jnc_CoderResult_isError($this) {
        return !$this.$isMalformed() && !$this.$isUnmappable() ? 0 : 1;
    }
    function jnc_CoderResult_isMalformed($this) {
        return $this.$kind != 2 ? 0 : 1;
    }
    function jnc_CoderResult_isUnmappable($this) {
        return $this.$kind != 3 ? 0 : 1;
    }
    function jnc_CoderResult_length($this) {
        if ($this.$isError())
            return $this.$length1;
        $rt_throw(jl_UnsupportedOperationException__init_());
    }
    function jnc_CoderResult_malformedForLength($length) {
        jnc_CoderResult_$callClinit();
        return jnc_CoderResult__init_(2, $length);
    }
    function jnc_CoderResult__clinit_() {
        jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
        jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
    }
    var otp_Platform = $rt_classWithoutFields();
    function otp_Platform_clone(var$1) {
        var copy = new var$1.constructor();
        for (var field in var$1) {
            if (!var$1.hasOwnProperty(field)) {
                continue;
            }
            copy[field] = var$1[field];
        }
        return copy;
    }
    function otp_Platform_isInstance($obj, $cls) {
        return $obj !== null && !(typeof $obj.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($obj.constructor, $cls) ? 1 : 0;
    }
    function otp_Platform_isAssignable($from, $to) {
        var $supertypes, $i;
        if ($from === $to)
            return 1;
        $supertypes = $from.$meta.supertypes;
        $i = 0;
        while ($i < $supertypes.length) {
            if (otp_Platform_isAssignable($supertypes[$i], $to))
                return 1;
            $i = $i + 1 | 0;
        }
        return 0;
    }
    function otp_Platform_isPrimitive($cls) {
        return $cls.$meta.primitive ? 1 : 0;
    }
    function otp_Platform_getArrayItem($cls) {
        return $cls.$meta.item;
    }
    function otp_Platform_getName($cls) {
        return $rt_str($cls.$meta.name);
    }
    function jnc_CodingErrorAction() {
        jl_Object.call(this);
        this.$name0 = null;
    }
    var jnc_CodingErrorAction_IGNORE = null;
    var jnc_CodingErrorAction_REPLACE = null;
    var jnc_CodingErrorAction_REPORT = null;
    function jnc_CodingErrorAction_$callClinit() {
        jnc_CodingErrorAction_$callClinit = $rt_eraseClinit(jnc_CodingErrorAction);
        jnc_CodingErrorAction__clinit_();
    }
    function jnc_CodingErrorAction__init_(var_0) {
        var var_1 = new jnc_CodingErrorAction();
        jnc_CodingErrorAction__init_0(var_1, var_0);
        return var_1;
    }
    function jnc_CodingErrorAction__init_0($this, $name) {
        jnc_CodingErrorAction_$callClinit();
        jl_Object__init_0($this);
        $this.$name0 = $name;
    }
    function jnc_CodingErrorAction__clinit_() {
        jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(30));
        jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(31));
        jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(32));
    }
    var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_IllegalArgumentException__init_0() {
        var var_0 = new jl_IllegalArgumentException();
        jl_IllegalArgumentException__init_2(var_0);
        return var_0;
    }
    function jl_IllegalArgumentException__init_1(var_0) {
        var var_1 = new jl_IllegalArgumentException();
        jl_IllegalArgumentException__init_(var_1, var_0);
        return var_1;
    }
    function jl_IllegalArgumentException__init_2($this) {
        jl_RuntimeException__init_1($this);
    }
    function jl_IllegalArgumentException__init_($this, $message) {
        jl_RuntimeException__init_2($this, $message);
    }
    function jnc_IllegalCharsetNameException() {
        jl_IllegalArgumentException.call(this);
        this.$charsetName = null;
    }
    function jnc_IllegalCharsetNameException__init_(var_0) {
        var var_1 = new jnc_IllegalCharsetNameException();
        jnc_IllegalCharsetNameException__init_0(var_1, var_0);
        return var_1;
    }
    function jnc_IllegalCharsetNameException__init_0($this, $charsetName) {
        jl_IllegalArgumentException__init_2($this);
        $this.$charsetName = $charsetName;
    }
    var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
    function ji_PrintStream() {
        var a = this; ji_FilterOutputStream.call(a);
        a.$autoFlush = 0;
        a.$errorState = 0;
        a.$sb = null;
        a.$buffer1 = null;
        a.$charset0 = null;
    }
    function ji_PrintStream__init_0(var_0, var_1) {
        var var_2 = new ji_PrintStream();
        ji_PrintStream__init_(var_2, var_0, var_1);
        return var_2;
    }
    function ji_PrintStream__init_($this, $out, $autoFlush) {
        ji_FilterOutputStream__init_0($this, $out);
        $this.$sb = jl_StringBuilder__init_();
        $this.$buffer1 = $rt_createCharArray(32);
        $this.$autoFlush = $autoFlush;
        jnci_UTF8Charset_$callClinit();
        $this.$charset0 = jnci_UTF8Charset_INSTANCE;
    }
    function ji_PrintStream_write($this, $b, $off, $len) {
        var $$je;
        if (!ji_PrintStream_check($this))
            return;
        a: {
            try {
                $rt_nullCheck($this.$out0).$write($b, $off, $len);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                } else {
                    throw $$e;
                }
            }
            $this.$errorState = 1;
        }
    }
    function ji_PrintStream_check($this) {
        if ($this.$out0 === null)
            $this.$errorState = 1;
        return $this.$errorState ? 0 : 1;
    }
    function ji_PrintStream_print($this, $s, $begin, $end) {
        var var$4, $src, $destBytes, $dest, var$8, var$9, $encoder, $overflow;
        var$4 = $end - $begin | 0;
        $src = jn_CharBuffer_wrap($s, $begin, var$4);
        $destBytes = $rt_createByteArray(jl_Math_max(16, jl_Math_min(var$4, 1024)));
        $dest = jn_ByteBuffer_wrap0($destBytes);
        var$8 = $rt_nullCheck($this.$charset0).$newEncoder();
        jnc_CodingErrorAction_$callClinit();
        var$9 = jnc_CodingErrorAction_REPLACE;
        var$8 = jnc_CharsetEncoder_onMalformedInput($rt_nullCheck(var$8), var$9);
        var$9 = jnc_CodingErrorAction_REPLACE;
        $encoder = jnc_CharsetEncoder_onUnmappableCharacter($rt_nullCheck(var$8), var$9);
        while (true) {
            $encoder = $rt_nullCheck($encoder);
            $overflow = $rt_nullCheck(jnc_CharsetEncoder_encode($encoder, $src, $dest, 1)).$isOverflow();
            $dest = $rt_nullCheck($dest);
            $this.$write($destBytes, 0, jn_Buffer_position($dest));
            jn_ByteBuffer_clear($dest);
            if (!$overflow)
                break;
        }
        while (true) {
            $overflow = $rt_nullCheck(jnc_CharsetEncoder_flush($encoder, $dest)).$isOverflow();
            $this.$write($destBytes, 0, jn_Buffer_position($dest));
            jn_ByteBuffer_clear($dest);
            if (!$overflow)
                break;
        }
    }
    function ji_PrintStream_println($this, $s) {
        $rt_nullCheck($rt_nullCheck($this.$sb).$append8($s)).$append0(10);
        ji_PrintStream_printSB($this);
    }
    function ji_PrintStream_printSB($this) {
        var $buffer, var$2, var$3;
        $buffer = $rt_nullCheck($this.$sb).$length0() <= $rt_nullCheck($this.$buffer1).data.length ? $this.$buffer1 : $rt_createCharArray($rt_nullCheck($this.$sb).$length0());
        var$2 = $this.$sb;
        var$3 = $rt_nullCheck($this.$sb).$length0();
        $rt_nullCheck(var$2).$getChars(0, var$3, $buffer, 0);
        ji_PrintStream_print($this, $buffer, 0, $rt_nullCheck($this.$sb).$length0());
        $rt_nullCheck($this.$sb).$setLength(0);
    }
    var otjc_JSWeakRef = $rt_classWithoutFields();
    var otjc_JSFinalizationRegistry = $rt_classWithoutFields();
    var jn_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException);
    function jn_BufferUnderflowException__init_() {
        var var_0 = new jn_BufferUnderflowException();
        jn_BufferUnderflowException__init_0(var_0);
        return var_0;
    }
    function jn_BufferUnderflowException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
    var otj_TestJsEntryPoint = $rt_classWithoutFields();
    function otj_TestJsEntryPoint_main($args) {
        var var$2, $e, $sb, $$je;
        a: {
            try {
                $args = $rt_nullCheck($args);
                var$2 = $args.data;
                otj_TestEntryPoint_run(var$2.length <= 0 ? null : var$2[$rt_checkUpperBound(0, var$2)]);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    $e = $$je;
                    break a;
                } else {
                    throw $$e;
                }
            }
            return;
        }
        $sb = jl_StringBuilder__init_();
        otj_TestJsEntryPoint_printStackTrace($e, $sb);
        $rt_globals.teavmException = $rt_ustr($sb.$toString());
        $rt_throw($e);
    }
    function otj_TestJsEntryPoint_printStackTrace($e, $stream) {
        var var$3, $message, $stackTrace, var$6, var$7, var$8, $element;
        $e = $rt_nullCheck($e);
        var$3 = $rt_nullCheck(jl_Object_getClass($e)).$getName();
        $stream = $rt_nullCheck($stream);
        $stream.$append8(var$3);
        $message = $e.$getLocalizedMessage();
        if ($message !== null) {
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(33))), $message);
            $stream.$append8(jl_StringBuilder_toString(var$3));
        }
        a: {
            $stream.$append8($rt_s(34));
            $stackTrace = $e.$getStackTrace();
            if ($stackTrace !== null) {
                var$6 = $stackTrace.data;
                var$7 = var$6.length;
                var$8 = 0;
                while (true) {
                    if (var$8 >= var$7)
                        break a;
                    var$8 = $rt_checkLowerBound(var$8);
                    $element = var$6[var$8];
                    $stream.$append8($rt_s(35));
                    $rt_nullCheck($stream.$append($element)).$append8($rt_s(34));
                    var$8 = var$8 + 1 | 0;
                }
            }
        }
        if ($e.$getCause() !== null && $e.$getCause() !== $e) {
            $stream.$append8($rt_s(36));
            otj_TestJsEntryPoint_printStackTrace($e.$getCause(), $stream);
        }
    }
    function jl_Class() {
        var a = this; jl_Object.call(a);
        a.$name1 = null;
        a.$platformClass = null;
    }
    function jl_Class__init_(var_0) {
        var var_1 = new jl_Class();
        jl_Class__init_0(var_1, var_0);
        return var_1;
    }
    function jl_Class__init_0($this, $platformClass) {
        var var$2;
        jl_Object__init_0($this);
        $this.$platformClass = $platformClass;
        var$2 = $this;
        $platformClass.classObject = var$2;
    }
    function jl_Class_getClass($cls) {
        var $result;
        if ($cls === null)
            return null;
        $result = $rt_castToClass($cls.classObject, jl_Class);
        if ($result === null)
            $result = jl_Class__init_($cls);
        return $result;
    }
    function jl_Class_getPlatformClass($this) {
        return $this.$platformClass;
    }
    function jl_Class_isInstance($this, $obj) {
        return otp_Platform_isInstance($obj, $this.$platformClass);
    }
    function jl_Class_getName($this) {
        if ($this.$name1 === null)
            $this.$name1 = otp_Platform_getName($this.$platformClass);
        return $this.$name1;
    }
    function jl_Class_isPrimitive($this) {
        return otp_Platform_isPrimitive($this.$platformClass);
    }
    function jl_Class_getComponentType($this) {
        return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
    }
    $rt_packages([-1, "java", 0, "util", 0, "nio", 2, "charset", 0, "lang"
    ]);
    $rt_metadata([jl_Object, "Object", 4, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone", $rt_wrapFunction0(jl_Object_clone)],
    jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$getStackTrace", $rt_wrapFunction0(jl_Throwable_getStackTrace), "$setStackTrace", $rt_wrapFunction1(jl_Throwable_setStackTrace)],
    jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_0), "$_init_0", $rt_wrapFunction1(jl_Exception__init_2)],
    jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_1), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_2)],
    jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0), "$_init_0", $rt_wrapFunction1(jl_IndexOutOfBoundsException__init_2)],
    ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_10", $rt_wrapFunction2(jnci_BufferedEncoder$Controller__init_0), "$hasMoreInput", $rt_wrapFunction0(jnci_BufferedEncoder$Controller_hasMoreInput), "$hasMoreOutput", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_hasMoreOutput), "$setInPosition", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_setInPosition), "$setOutPosition", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_setOutPosition)],
    ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
    jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, 0,
    jl_CloneNotSupportedException, "CloneNotSupportedException", 4, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_CloneNotSupportedException__init_0)],
    jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
    jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Long_$callClinit, 0,
    otj_TestEntryPoint$Launcher, 0, jl_Object, [], 3, 0, 0, 0, 0,
    otj_TestEntryPoint$LauncherImpl0, 0, jl_Object, [otj_TestEntryPoint$Launcher], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(otj_TestEntryPoint$LauncherImpl0__init_0), "$launch", $rt_wrapFunction1(otj_TestEntryPoint$LauncherImpl0_launch)],
    otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otjde_GamepadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_Error__init_0), "$_init_2", $rt_wrapFunction1(jl_Error__init_2)],
    jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_LinkageError__init_0)],
    jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(jn_Buffer__init_), "$position2", $rt_wrapFunction0(jn_Buffer_position), "$position0", $rt_wrapFunction1(jn_Buffer_position0), "$clear", $rt_wrapFunction0(jn_Buffer_clear), "$remaining", $rt_wrapFunction0(jn_Buffer_remaining), "$hasRemaining", $rt_wrapFunction0(jn_Buffer_hasRemaining)],
    jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Readable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0, ["$_init_5", $rt_wrapFunction3(jn_CharBuffer__init_), "$get0", $rt_wrapFunction3(jn_CharBuffer_get), "$position1", $rt_wrapFunction1(jn_CharBuffer_position)],
    jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0, ["$_init_5", $rt_wrapFunction3(jn_CharBufferImpl__init_)],
    jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0, ["$_init_4", function(var_1, var_2, var_3, var_4, var_5, var_6) { jn_CharBufferOverArray__init_(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$getChar", $rt_wrapFunction1(jn_CharBufferOverArray_getChar)],
    otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    otcic_Console, 0, jl_Object, [], 4, 3, 0, 0, 0,
    ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_String$_clinit_$lambda$_93_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_93_0__init_0)],
    jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 4, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
    jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
    ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_OutputStream__init_)],
    ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_18", $rt_wrapFunction1(ji_FilterOutputStream__init_0)],
    jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, jn_ByteOrder_$callClinit, 0,
    otcic_ConsoleOutputStream, 0, ji_OutputStream, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_ConsoleOutputStream__init_)],
    otcic_StdoutOutputStream, 0, otcic_ConsoleOutputStream, [], 0, 3, 0, otcic_StdoutOutputStream_$callClinit, ["$write", $rt_wrapFunction3(otcic_StdoutOutputStream_write)],
    jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_3", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$append3", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$append2", $rt_wrapFunction2(jl_AbstractStringBuilder_append2),
    "$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert0), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$insert3", $rt_wrapFunction3(jl_AbstractStringBuilder_insert2), "$append7", $rt_wrapFunction1(jl_AbstractStringBuilder_append4), "$insert4", $rt_wrapFunction2(jl_AbstractStringBuilder_insert3), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert4), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity),
    "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString), "$length0", $rt_wrapFunction0(jl_AbstractStringBuilder_length), "$getChars", $rt_wrapFunction4(jl_AbstractStringBuilder_getChars), "$setLength", $rt_wrapFunction1(jl_AbstractStringBuilder_setLength)],
    jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append8", $rt_wrapFunction1(jl_StringBuilder_append2), "$append1", $rt_wrapFunction1(jl_StringBuilder_append1), "$append9", $rt_wrapFunction1(jl_StringBuilder_append3), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0), "$insert7", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert0),
    "$insert6", $rt_wrapFunction2(jl_StringBuilder_insert1), "$insert8", $rt_wrapFunction2(jl_StringBuilder_insert2), "$setLength", $rt_wrapFunction1(jl_StringBuilder_setLength), "$getChars", $rt_wrapFunction4(jl_StringBuilder_getChars), "$length0", $rt_wrapFunction0(jl_StringBuilder_length), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert4),
    "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert5), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert6)],
    ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ConcurrentModificationException__init_0)],
    jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ucits_BootstrapButton, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucits_BootstrapButton__init_0), "$addStyle", $rt_wrapFunction1(ucits_BootstrapButton_addStyle)],
    otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0]);
    $rt_metadata([otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget, otjde_GamepadEventTarget], 3, 3, 0, 0, 0,
    jl_ClassCastException, "ClassCastException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ClassCastException__init_0)],
    jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
    ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractCollection__init_)],
    ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
    ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
    ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractList__init_), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator)],
    jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayList__init_0), "$_init_3", $rt_wrapFunction1(ju_ArrayList__init_2), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get", $rt_wrapFunction1(ju_ArrayList_get), "$size1", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add)],
    jnc_CoderMalfunctionError, "CoderMalfunctionError", 3, jl_Error, [], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jnc_CoderMalfunctionError__init_0)],
    otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, 0, ["$get$exported$0", $rt_wrapFunction1(otjb_Window_get$exported$0), "$addEventListener$exported$1", $rt_wrapFunction2(otjb_Window_addEventListener$exported$1), "$removeEventListener$exported$2", $rt_wrapFunction2(otjb_Window_removeEventListener$exported$2), "$removeEventListener$exported$3", $rt_wrapFunction3(otjb_Window_removeEventListener$exported$3), "$dispatchEvent$exported$4", $rt_wrapFunction1(otjb_Window_dispatchEvent$exported$4),
    "$getLength$exported$5", $rt_wrapFunction0(otjb_Window_getLength$exported$5), "$addEventListener$exported$6", $rt_wrapFunction3(otjb_Window_addEventListener$exported$6)],
    jl_StackTraceElement, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0, ["$_init_20", $rt_wrapFunction4(jl_StackTraceElement__init_0), "$toString", $rt_wrapFunction0(jl_StackTraceElement_toString)],
    jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_", $rt_wrapFunction0(jl_String__init_2), "$_init_14", $rt_wrapFunction1(jl_String__init_3), "$_init_6", $rt_wrapFunction3(jl_String__init_4), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length0", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$lastIndexOf0", $rt_wrapFunction2(jl_String_lastIndexOf), "$lastIndexOf", $rt_wrapFunction1(jl_String_lastIndexOf0),
    "$substring0", $rt_wrapFunction2(jl_String_substring), "$substring", $rt_wrapFunction1(jl_String_substring0), "$toString", $rt_wrapFunction0(jl_String_toString), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode)],
    jl_NegativeArraySizeException, "NegativeArraySizeException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NegativeArraySizeException__init_0)],
    otjc_JSFinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otji_JSWrapper$_clinit_$lambda$_30_0, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$_clinit_$lambda$_30_0__init_0), "$accept", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_0_accept), "$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_0_accept$exported$0)],
    jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_8", $rt_wrapFunction4(jnc_CharsetEncoder__init_), "$_init_9", $rt_wrapFunction3(jnc_CharsetEncoder__init_0), "$onMalformedInput", $rt_wrapFunction1(jnc_CharsetEncoder_onMalformedInput), "$implOnMalformedInput", $rt_wrapFunction1(jnc_CharsetEncoder_implOnMalformedInput), "$onUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetEncoder_onUnmappableCharacter), "$implOnUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetEncoder_implOnUnmappableCharacter),
    "$encode", $rt_wrapFunction3(jnc_CharsetEncoder_encode), "$flush", $rt_wrapFunction1(jnc_CharsetEncoder_flush), "$implFlush", $rt_wrapFunction1(jnc_CharsetEncoder_implFlush)],
    jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0, ["$_init_9", $rt_wrapFunction3(jnci_BufferedEncoder__init_), "$encodeLoop", $rt_wrapFunction2(jnci_BufferedEncoder_encodeLoop)],
    jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, ["$_init_12", $rt_wrapFunction1(jnci_UTF8Encoder__init_0), "$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF8Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
    otji_JSWrapper$_clinit_$lambda$_30_1, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$_clinit_$lambda$_30_1__init_0), "$accept", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_1_accept), "$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_1_accept$exported$0)],
    jl_UnsupportedOperationException, "UnsupportedOperationException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_UnsupportedOperationException__init_0)],
    jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_IncompatibleClassChangeError__init_0)],
    jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchMethodError__init_0)],
    ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
    jl_ArrayIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayIndexOutOfBoundsException__init_0)],
    ucits_BootstrapButtonBenchmarkTest, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucits_BootstrapButtonBenchmarkTest__init_0), "$benchmarkAddStyle", $rt_wrapFunction0(ucits_BootstrapButtonBenchmarkTest_benchmarkAddStyle)],
    jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, ["$_init_11", $rt_wrapFunction2(jnc_Charset__init_)],
    jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, jnci_UTF8Charset_$callClinit, ["$newEncoder", $rt_wrapFunction0(jnci_UTF8Charset_newEncoder)],
    ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_7", $rt_wrapFunction1(ju_AbstractList$1__init_0), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next)],
    jn_ReadOnlyBufferException, "ReadOnlyBufferException", 2, jl_UnsupportedOperationException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jn_ReadOnlyBufferException__init_0)],
    jl_IllegalStateException, "IllegalStateException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalStateException__init_0)],
    jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_NullPointerException, "NullPointerException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NullPointerException__init_1), "$_init_", $rt_wrapFunction0(jl_NullPointerException__init_2)],
    jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, ["$_init_15", function(var_1, var_2, var_3, var_4, var_5) { jn_ByteBuffer__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$put0", $rt_wrapFunction3(jn_ByteBuffer_put0), "$put", $rt_wrapFunction1(jn_ByteBuffer_put), "$clear0", $rt_wrapFunction0(jn_ByteBuffer_clear)],
    jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchFieldError__init_0)],
    otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otjc_JSWeakMap, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjc_JSObjects, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
    otj_TestEntryPoint, 0, jl_Object, [], 4, 0, 0, 0, 0,
    jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_ArrayStoreException, "ArrayStoreException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
    jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0, ["$_init_13", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jn_ByteBufferImpl__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$isReadOnly", $rt_wrapFunction0(jn_ByteBufferImpl_isReadOnly)],
    jn_BufferOverflowException, "BufferOverflowException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jn_BufferOverflowException__init_0)]]);
    $rt_metadata([otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, otji_JSWrapper_$callClinit, 0,
    otjc_JSMap, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, jnc_CoderResult_$callClinit, ["$_init_17", $rt_wrapFunction2(jnc_CoderResult__init_0), "$isUnderflow", $rt_wrapFunction0(jnc_CoderResult_isUnderflow), "$isOverflow", $rt_wrapFunction0(jnc_CoderResult_isOverflow), "$isError", $rt_wrapFunction0(jnc_CoderResult_isError), "$isMalformed", $rt_wrapFunction0(jnc_CoderResult_isMalformed), "$isUnmappable", $rt_wrapFunction0(jnc_CoderResult_isUnmappable), "$length0", $rt_wrapFunction0(jnc_CoderResult_length)],
    otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, jnc_CodingErrorAction_$callClinit, ["$_init_0", $rt_wrapFunction1(jnc_CodingErrorAction__init_0)],
    jl_IllegalArgumentException, "IllegalArgumentException", 4, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_2), "$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_)],
    jnc_IllegalCharsetNameException, "IllegalCharsetNameException", 3, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jnc_IllegalCharsetNameException__init_0)],
    jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
    ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0, ["$_init_1", $rt_wrapFunction2(ji_PrintStream__init_), "$write", $rt_wrapFunction3(ji_PrintStream_write), "$println", $rt_wrapFunction1(ji_PrintStream_println)],
    otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjc_JSFinalizationRegistry, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    jn_BufferUnderflowException, "BufferUnderflowException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jn_BufferUnderflowException__init_0)],
    otj_TestJsEntryPoint, 0, jl_Object, [], 4, 0, 0, 0, 0,
    jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, ["$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$isInstance", $rt_wrapFunction1(jl_Class_isInstance), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType)]]);
    function $rt_array(cls, data) {
        this.$monitor = null;
        this.$id$ = 0;
        this.type = cls;
        this.data = data;
        this.constructor = $rt_arraycls(cls);
    }
    $rt_array.prototype = $rt_globals.Object.create(($rt_objcls()).prototype);
    $rt_array.prototype.toString = function() {
        var str = "[";
        for (var i = 0;i < this.data.length;++i) {
            if (i > 0) {
                str += ", ";
            }
            str += this.data[i].toString();
        }
        str += "]";
        return str;
    };
    $rt_setCloneMethod($rt_array.prototype, function() {
        var dataCopy;
        if ('slice' in this.data) {
            dataCopy = this.data.slice();
        } else {
            dataCopy = new this.data.constructor(this.data.length);
            for (var i = 0;i < dataCopy.length;++i) {
                dataCopy[i] = this.data[i];
            }
        }
        return new $rt_array(this.type, dataCopy);
    });
    $rt_stringPool(["Either src or dest is null", "New position ", " is outside of range [0;", "The last char in dst ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", "BIG_ENDIAN", "LITTLE_ENDIAN", "null", "Index out of bounds", "Unknown Source", ")", "Replacement preconditions do not hold", "Action must be non-null", "warmup-", "test-class-", "BENCHMARK_RESULT: Time taken: ", "ms", "UTF-8", "The last byte in src ", "0", "uk.co.instanto.tearay.sample.BootstrapButtonBenchmarkTest.benchmarkAddStyle()V",
    "Invalid test name", "object", "function", "string", "number", "undefined", "IGNORE", "REPLACE", "REPORT", ": ", "\n", "\tat ", "Caused by: "]);
    jl_String.prototype.toString = function() {
        return $rt_ustr(this);
    };
    jl_String.prototype.valueOf = jl_String.prototype.toString;
    jl_Object.prototype.toString = function() {
        return $rt_ustr(jl_Object_toString(this));
    };
    jl_Object.prototype.__teavm_class__ = function() {
        return $dbg_class(this);
    };
    var Long_eq;
    var Long_ne;
    var Long_gt;
    var Long_ge;
    var Long_lt;
    var Long_le;
    var Long_compare;
    var Long_ucompare;
    var Long_add;
    var Long_sub;
    var Long_inc;
    var Long_dec;
    var Long_mul;
    var Long_div;
    var Long_rem;
    var Long_udiv;
    var Long_urem;
    var Long_neg;
    var Long_and;
    var Long_or;
    var Long_xor;
    var Long_shl;
    var Long_shr;
    var Long_shru;
    var Long_not;
    if (typeof $rt_globals.BigInt !== 'function') {
        Long_eq = function(a, b) {
            return a.hi === b.hi && a.lo === b.lo;
        };
        Long_ne = function(a, b) {
            return a.hi !== b.hi || a.lo !== b.lo;
        };
        Long_gt = function(a, b) {
            if (a.hi < b.hi) {
                return false;
            }
            if (a.hi > b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x > y;
            }
            return (a.lo & 1) > (b.lo & 1);
        };
        Long_ge = function(a, b) {
            if (a.hi < b.hi) {
                return false;
            }
            if (a.hi > b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x >= y;
            }
            return (a.lo & 1) >= (b.lo & 1);
        };
        Long_lt = function(a, b) {
            if (a.hi > b.hi) {
                return false;
            }
            if (a.hi < b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x < y;
            }
            return (a.lo & 1) < (b.lo & 1);
        };
        Long_le = function(a, b) {
            if (a.hi > b.hi) {
                return false;
            }
            if (a.hi < b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x <= y;
            }
            return (a.lo & 1) <= (b.lo & 1);
        };
        Long_add = function(a, b) {
            if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
                return Long_fromNumber(a.lo + b.lo);
            } else if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
            }
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            var lolo = a_lolo + b_lolo | 0;
            var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
            var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
            var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
            return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
        };
        Long_inc = function(a) {
            var lo = a.lo + 1 | 0;
            var hi = a.hi;
            if (lo === 0) {
                hi = hi + 1 | 0;
            }
            return new Long(lo, hi);
        };
        Long_dec = function(a) {
            var lo = a.lo - 1 | 0;
            var hi = a.hi;
            if (lo ===  -1) {
                hi = hi - 1 | 0;
            }
            return new Long(lo, hi);
        };
        Long_neg = function(a) {
            return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
        };
        Long_sub = function(a, b) {
            if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
                return Long_fromNumber(a.lo - b.lo);
            }
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            var lolo = a_lolo - b_lolo | 0;
            var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
            var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
            var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
            return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
        };
        Long_compare = function(a, b) {
            var r = a.hi - b.hi;
            if (r !== 0) {
                return r;
            }
            r = (a.lo >>> 1) - (b.lo >>> 1);
            if (r !== 0) {
                return r;
            }
            return (a.lo & 1) - (b.lo & 1);
        };
        Long_ucompare = function(a, b) {
            var r = $rt_ucmp(a.hi, b.hi);
            if (r !== 0) {
                return r;
            }
            r = (a.lo >>> 1) - (b.lo >>> 1);
            if (r !== 0) {
                return r;
            }
            return (a.lo & 1) - (b.lo & 1);
        };
        Long_mul = function(a, b) {
            var positive = Long_isNegative(a) === Long_isNegative(b);
            if (Long_isNegative(a)) {
                a = Long_neg(a);
            }
            if (Long_isNegative(b)) {
                b = Long_neg(b);
            }
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            var lolo = 0;
            var lohi = 0;
            var hilo = 0;
            var hihi = 0;
            lolo = a_lolo * b_lolo | 0;
            lohi = lolo >>> 16;
            lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
            hilo = hilo + (lohi >>> 16) | 0;
            lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
            hilo = hilo + (lohi >>> 16) | 0;
            hihi = hilo >>> 16;
            hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
            hihi = hihi + (hilo >>> 16) | 0;
            hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
            hihi = hihi + (hilo >>> 16) | 0;
            hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
            hihi = hihi + (hilo >>> 16) | 0;
            hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
            var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
            return positive ? result : Long_neg(result);
        };
        Long_div = function(a, b) {
            if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
            }
            return (Long_divRem(a, b))[0];
        };
        Long_udiv = function(a, b) {
            if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
            }
            return (Long_udivRem(a, b))[0];
        };
        Long_rem = function(a, b) {
            if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
            }
            return (Long_divRem(a, b))[1];
        };
        Long_urem = function(a, b) {
            if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
            }
            return (Long_udivRem(a, b))[1];
        };
        function Long_divRem(a, b) {
            if (b.lo === 0 && b.hi === 0) {
                throw new $rt_globals.Error("Division by zero");
            }
            var positive = Long_isNegative(a) === Long_isNegative(b);
            if (Long_isNegative(a)) {
                a = Long_neg(a);
            }
            if (Long_isNegative(b)) {
                b = Long_neg(b);
            }
            a = new LongInt(a.lo, a.hi, 0);
            b = new LongInt(b.lo, b.hi, 0);
            var q = LongInt_div(a, b);
            a = new Long(a.lo, a.hi);
            q = new Long(q.lo, q.hi);
            return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
        }
        function Long_udivRem(a, b) {
            if (b.lo === 0 && b.hi === 0) {
                throw new $rt_globals.Error("Division by zero");
            }
            a = new LongInt(a.lo, a.hi, 0);
            b = new LongInt(b.lo, b.hi, 0);
            var q = LongInt_div(a, b);
            a = new Long(a.lo, a.hi);
            q = new Long(q.lo, q.hi);
            return [q, a];
        }
        function Long_shiftLeft16(a) {
            return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
        }
        function Long_shiftRight16(a) {
            return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
        }
        Long_and = function(a, b) {
            return new Long(a.lo & b.lo, a.hi & b.hi);
        };
        Long_or = function(a, b) {
            return new Long(a.lo | b.lo, a.hi | b.hi);
        };
        Long_xor = function(a, b) {
            return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
        };
        Long_shl = function(a, b) {
            b &= 63;
            if (b === 0) {
                return a;
            } else if (b < 32) {
                return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
            } else if (b === 32) {
                return new Long(0, a.lo);
            } else {
                return new Long(0, a.lo << b - 32);
            }
        };
        Long_shr = function(a, b) {
            b &= 63;
            if (b === 0) {
                return a;
            } else if (b < 32) {
                return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
            } else if (b === 32) {
                return new Long(a.hi, a.hi >> 31);
            } else {
                return new Long(a.hi >> b - 32, a.hi >> 31);
            }
        };
        Long_shru = function(a, b) {
            b &= 63;
            if (b === 0) {
                return a;
            } else if (b < 32) {
                return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
            } else if (b === 32) {
                return new Long(a.hi, 0);
            } else {
                return new Long(a.hi >>> b - 32, 0);
            }
        };
        Long_not = function(a) {
            return new Long(~a.hi, ~a.lo);
        };
        function LongInt(lo, hi, sup) {
            this.lo = lo;
            this.hi = hi;
            this.sup = sup;
        }
        function LongInt_mul(a, b) {
            var a_lolo = (a.lo & 0xFFFF) * b | 0;
            var a_lohi = (a.lo >>> 16) * b | 0;
            var a_hilo = (a.hi & 0xFFFF) * b | 0;
            var a_hihi = (a.hi >>> 16) * b | 0;
            var sup = a.sup * b | 0;
            a_lohi = a_lohi + (a_lolo >>> 16) | 0;
            a_hilo = a_hilo + (a_lohi >>> 16) | 0;
            a_hihi = a_hihi + (a_hilo >>> 16) | 0;
            sup = sup + (a_hihi >>> 16) | 0;
            a.lo = a_lolo & 0xFFFF | a_lohi << 16;
            a.hi = a_hilo & 0xFFFF | a_hihi << 16;
            a.sup = sup & 0xFFFF;
        }
        function LongInt_sub(a, b) {
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            a_lolo = a_lolo - b_lolo | 0;
            a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
            a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
            a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
            var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
            a.lo = a_lolo & 0xFFFF | a_lohi << 16;
            a.hi = a_hilo & 0xFFFF | a_hihi << 16;
            a.sup = sup;
        }
        function LongInt_add(a, b) {
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            a_lolo = a_lolo + b_lolo | 0;
            a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
            a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
            a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
            var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
            a.lo = a_lolo & 0xFFFF | a_lohi << 16;
            a.hi = a_hilo & 0xFFFF | a_hihi << 16;
            a.sup = sup;
        }
        function LongInt_inc(a) {
            a.lo = a.lo + 1 | 0;
            if (a.lo === 0) {
                a.hi = a.hi + 1 | 0;
                if (a.hi === 0) {
                    a.sup = a.sup + 1 & 0xFFFF;
                }
            }
        }
        function LongInt_dec(a) {
            a.lo = a.lo - 1 | 0;
            if (a.lo ===  -1) {
                a.hi = a.hi - 1 | 0;
                if (a.hi ===  -1) {
                    a.sup = a.sup - 1 & 0xFFFF;
                }
            }
        }
        function LongInt_ucompare(a, b) {
            var r = a.sup - b.sup;
            if (r !== 0) {
                return r;
            }
            r = (a.hi >>> 1) - (b.hi >>> 1);
            if (r !== 0) {
                return r;
            }
            r = (a.hi & 1) - (b.hi & 1);
            if (r !== 0) {
                return r;
            }
            r = (a.lo >>> 1) - (b.lo >>> 1);
            if (r !== 0) {
                return r;
            }
            return (a.lo & 1) - (b.lo & 1);
        }
        function LongInt_numOfLeadingZeroBits(a) {
            var n = 0;
            var d = 16;
            while (d > 0) {
                if (a >>> d !== 0) {
                    a >>>= d;
                    n = n + d | 0;
                }
                d = d / 2 | 0;
            }
            return 31 - n;
        }
        function LongInt_shl(a, b) {
            if (b === 0) {
                return;
            }
            if (b < 32) {
                a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
                a.hi = a.lo >>> 32 - b | a.hi << b;
                a.lo <<= b;
            } else if (b === 32) {
                a.sup = a.hi & 0xFFFF;
                a.hi = a.lo;
                a.lo = 0;
            } else if (b < 64) {
                a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
                a.hi = a.lo << b;
                a.lo = 0;
            } else if (b === 64) {
                a.sup = a.lo & 0xFFFF;
                a.hi = 0;
                a.lo = 0;
            } else {
                a.sup = a.lo << b - 64 & 0xFFFF;
                a.hi = 0;
                a.lo = 0;
            }
        }
        function LongInt_shr(a, b) {
            if (b === 0) {
                return;
            }
            if (b === 32) {
                a.lo = a.hi;
                a.hi = a.sup;
                a.sup = 0;
            } else if (b < 32) {
                a.lo = a.lo >>> b | a.hi << 32 - b;
                a.hi = a.hi >>> b | a.sup << 32 - b;
                a.sup >>>= b;
            } else if (b === 64) {
                a.lo = a.sup;
                a.hi = 0;
                a.sup = 0;
            } else if (b < 64) {
                a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
                a.hi = a.sup >>> b - 32;
                a.sup = 0;
            } else {
                a.lo = a.sup >>> b - 64;
                a.hi = 0;
                a.sup = 0;
            }
        }
        function LongInt_copy(a) {
            return new LongInt(a.lo, a.hi, a.sup);
        }
        function LongInt_div(a, b) {
            var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
            var sz = 1 + (bits / 16 | 0);
            var dividentBits = bits % 16;
            LongInt_shl(b, bits);
            LongInt_shl(a, dividentBits);
            var q = new LongInt(0, 0, 0);
            while (sz-- > 0) {
                LongInt_shl(q, 16);
                var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
                var digitB = b.hi >>> 16;
                var digit = digitA / digitB | 0;
                var t = LongInt_copy(b);
                LongInt_mul(t, digit);
                if (LongInt_ucompare(t, a) >= 0) {
                    while (LongInt_ucompare(t, a) > 0) {
                        LongInt_sub(t, b);
                         --digit;
                    }
                } else {
                    while (true) {
                        var nextT = LongInt_copy(t);
                        LongInt_add(nextT, b);
                        if (LongInt_ucompare(nextT, a) > 0) {
                            break;
                        }
                        t = nextT;
                        ++digit;
                    }
                }
                LongInt_sub(a, t);
                q.lo |= digit;
                LongInt_shl(a, 16);
            }
            LongInt_shr(a, bits + 16);
            return q;
        }
    } else {
        Long_eq = function(a, b) {
            return a === b;
        };
        Long_ne = function(a, b) {
            return a !== b;
        };
        Long_gt = function(a, b) {
            return a > b;
        };
        Long_ge = function(a, b) {
            return a >= b;
        };
        Long_lt = function(a, b) {
            return a < b;
        };
        Long_le = function(a, b) {
            return a <= b;
        };
        Long_add = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a + b);
        };
        Long_inc = function(a) {
            return $rt_globals.BigInt.asIntN(64, a + 1);
        };
        Long_dec = function(a) {
            return $rt_globals.BigInt.asIntN(64, a - 1);
        };
        Long_neg = function(a) {
            return $rt_globals.BigInt.asIntN(64,  -a);
        };
        Long_sub = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a - b);
        };
        Long_compare = function(a, b) {
            return a < b ?  -1 : a > b ? 1 : 0;
        };
        Long_ucompare = function(a, b) {
            a = $rt_globals.BigInt.asUintN(64, a);
            b = $rt_globals.BigInt.asUintN(64, b);
            return a < b ?  -1 : a > b ? 1 : 0;
        };
        Long_mul = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a * b);
        };
        Long_div = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a / b);
        };
        Long_udiv = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) / $rt_globals.BigInt.asUintN(64, b));
        };
        Long_rem = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a % b);
        };
        Long_urem = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) % $rt_globals.BigInt.asUintN(64, b));
        };
        Long_and = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a & b);
        };
        Long_or = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a | b);
        };
        Long_xor = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a ^ b);
        };
        Long_shl = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a << $rt_globals.BigInt(b & 63));
        };
        Long_shr = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a >> $rt_globals.BigInt(b & 63));
        };
        Long_shru = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) >> $rt_globals.BigInt(b & 63));
        };
        Long_not = function(a) {
            return $rt_globals.BigInt.asIntN(64, ~a);
        };
    }
    var Long_add = Long_add;

    var Long_sub = Long_sub;

    var Long_mul = Long_mul;

    var Long_div = Long_div;

    var Long_rem = Long_rem;

    var Long_or = Long_or;

    var Long_and = Long_and;

    var Long_xor = Long_xor;

    var Long_shl = Long_shl;

    var Long_shr = Long_shr;

    var Long_shru = Long_shru;

    var Long_compare = Long_compare;

    var Long_eq = Long_eq;

    var Long_ne = Long_ne;

    var Long_lt = Long_lt;

    var Long_le = Long_le;

    var Long_gt = Long_gt;

    var Long_ge = Long_ge;

    var Long_not = Long_not;

    var Long_neg = Long_neg;

    function $rt_startThread(runner, callback) {
        var result;
        try {
            result = runner();
        } catch (e){
            result = e;
        }
        if (typeof callback !== 'undefined') {
            callback(result);
        } else if (result instanceof $rt_globals.Error) {
            throw result;
        }
    }
    function $rt_suspending() {
        return false;
    }
    function $rt_resuming() {
        return false;
    }
    function $rt_nativeThread() {
        return null;
    }
    function $rt_invalidPointer() {
    }
    $rt_exports.main = $rt_mainStarter(otj_TestJsEntryPoint_main);
    $rt_exports.main.javaException = $rt_javaException;
    let $rt_jso_marker = $rt_globals.Symbol('jsoClass');
    (function() {
        var c;
        c = otjb_Window.prototype;
        c.removeEventListener = c.$removeEventListener$exported$3;
        c.dispatchEvent = c.$dispatchEvent$exported$4;
        c.get = c.$get$exported$0;
        c.addEventListener = c.$addEventListener$exported$6;
        Object.defineProperty(c, "length", {
            get: c.$getLength$exported$5
        });
        c = otji_JSWrapper$_clinit_$lambda$_30_0.prototype;
        c[$rt_jso_marker] = true;
        c.accept = c.$accept$exported$0;
        c = otji_JSWrapper$_clinit_$lambda$_30_1.prototype;
        c[$rt_jso_marker] = true;
        c.accept = c.$accept$exported$0;
    })();
    jl_Throwable.prototype.getMessage = function() {
        return $rt_ustr(this.$getMessage());
    };
}));

//# sourceMappingURL=classTest.js.map