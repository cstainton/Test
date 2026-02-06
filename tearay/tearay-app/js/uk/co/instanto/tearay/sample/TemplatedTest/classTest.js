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
    function jl_IndexOutOfBoundsException__init_0($this) {
        jl_RuntimeException__init_1($this);
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
    var ucita_SecurityProvider = $rt_classWithoutFields(0);
    function ucits_AppSecurityProvider() {
        jl_Object.call(this);
        this.$roles = null;
    }
    function ucits_AppSecurityProvider__init_() {
        var var_0 = new ucits_AppSecurityProvider();
        ucits_AppSecurityProvider__init_0(var_0);
        return var_0;
    }
    function ucits_AppSecurityProvider__init_0($this) {
        jl_Object__init_0($this);
        $this.$roles = ju_HashSet__init_();
    }
    var ucits_TemplatedTest = $rt_classWithoutFields();
    function ucits_TemplatedTest__init_() {
        var var_0 = new ucits_TemplatedTest();
        ucits_TemplatedTest__init_0(var_0);
        return var_0;
    }
    function ucits_TemplatedTest__init_0($this) {
        jl_Object__init_0($this);
    }
    function ucits_TemplatedTest_testTemplatingBinding($this) {
        var $page, $root, var$3;
        $page = ucits_DashboardPage_Factory_getInstance();
        $page = $rt_nullCheck($page);
        oj_Assert_assertNull(otji_JSWrapper_wrap($page.$element));
        $root = ucits_DashboardPage_Binder_bind($page);
        oj_Assert_assertNotNull($rt_s(1), otji_JSWrapper_wrap($root));
        var$3 = $page.$element;
        oj_Assert_assertEquals($rt_s(2), otji_JSWrapper_wrap($root), otji_JSWrapper_wrap(var$3));
        oj_Assert_assertTrue($rt_nullCheck($rt_str($root.innerHTML)).$contains($rt_s(3)));
        oj_Assert_assertNotNull0($page.$container);
        oj_Assert_assertNotNull0(otji_JSWrapper_wrap($rt_nullCheck($page.$container).$element0));
        oj_Assert_assertNotNull0(otji_JSWrapper_wrap($rt_nullCheck($page.$container).$element0.parentNode));
        oj_Assert_assertEquals0($rt_s(4), $rt_str($rt_nullCheck($page.$container).$element0.className));
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
    var ucita_Navigation = $rt_classWithoutFields(0);
    function oj_ComparisonFailure$ComparisonCompactor() {
        var a = this; jl_Object.call(a);
        a.$contextLength = 0;
        a.$expected = null;
        a.$actual = null;
    }
    function oj_ComparisonFailure$ComparisonCompactor__init_(var_0, var_1, var_2) {
        var var_3 = new oj_ComparisonFailure$ComparisonCompactor();
        oj_ComparisonFailure$ComparisonCompactor__init_0(var_3, var_0, var_1, var_2);
        return var_3;
    }
    function oj_ComparisonFailure$ComparisonCompactor__init_0($this, $contextLength, $expected, $actual) {
        jl_Object__init_0($this);
        $this.$contextLength = $contextLength;
        $this.$expected = $expected;
        $this.$actual = $actual;
    }
    function oj_ComparisonFailure$ComparisonCompactor_compact($this, $message) {
        var $extractor, $compactedPrefix, $compactedSuffix;
        if ($this.$expected !== null && $this.$actual !== null && !$rt_nullCheck($this.$expected).$equals($this.$actual)) {
            $extractor = oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_($this, null);
            $compactedPrefix = $extractor.$compactPrefix();
            $compactedSuffix = $extractor.$compactSuffix();
            return oj_Assert_format($message, $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($compactedPrefix)).$append1($extractor.$expectedDiff())).$append1($compactedSuffix)).$toString(), $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($compactedPrefix)).$append1($extractor.$actualDiff())).$append1($compactedSuffix)).$toString());
        }
        return oj_Assert_format($message, $this.$expected, $this.$actual);
    }
    function oj_ComparisonFailure$ComparisonCompactor_sharedPrefix($this) {
        var $end, $i;
        $end = jl_Math_min($rt_nullCheck($this.$expected).$length(), $rt_nullCheck($this.$actual).$length());
        $i = 0;
        while ($i < $end) {
            if ($rt_nullCheck($this.$expected).$charAt($i) != $rt_nullCheck($this.$actual).$charAt($i))
                return $rt_nullCheck($this.$expected).$substring(0, $i);
            $i = $i + 1 | 0;
        }
        return $rt_nullCheck($this.$expected).$substring(0, $end);
    }
    function oj_ComparisonFailure$ComparisonCompactor_sharedSuffix($this, $prefix) {
        var $suffixLength, var$3, $maxSuffixLength;
        $suffixLength = 0;
        var$3 = $rt_nullCheck($this.$expected).$length();
        $prefix = $rt_nullCheck($prefix);
        $maxSuffixLength = jl_Math_min(var$3 - $prefix.$length() | 0, $rt_nullCheck($this.$actual).$length() - $prefix.$length() | 0) - 1 | 0;
        a: {
            while (true) {
                if ($suffixLength > $maxSuffixLength)
                    break a;
                if ($rt_nullCheck($this.$expected).$charAt(($rt_nullCheck($this.$expected).$length() - 1 | 0) - $suffixLength | 0) != $rt_nullCheck($this.$actual).$charAt(($rt_nullCheck($this.$actual).$length() - 1 | 0) - $suffixLength | 0))
                    break;
                $suffixLength = $suffixLength + 1 | 0;
            }
        }
        return $rt_nullCheck($this.$expected).$substring0($rt_nullCheck($this.$expected).$length() - $suffixLength | 0);
    }
    function oj_ComparisonFailure$ComparisonCompactor_access$100($x0) {
        $x0 = $rt_nullCheck($x0);
        return oj_ComparisonFailure$ComparisonCompactor_sharedPrefix($x0);
    }
    function oj_ComparisonFailure$ComparisonCompactor_access$200($x0, $x1) {
        $x0 = $rt_nullCheck($x0);
        return oj_ComparisonFailure$ComparisonCompactor_sharedSuffix($x0, $x1);
    }
    function oj_ComparisonFailure$ComparisonCompactor_access$300($x0) {
        $x0 = $rt_nullCheck($x0);
        return $x0.$expected;
    }
    function oj_ComparisonFailure$ComparisonCompactor_access$400($x0) {
        $x0 = $rt_nullCheck($x0);
        return $x0.$actual;
    }
    function oj_ComparisonFailure$ComparisonCompactor_access$500($x0) {
        $x0 = $rt_nullCheck($x0);
        return $x0.$contextLength;
    }
    function ucitw_Widget() {
        jl_Object.call(this);
        this.$element0 = null;
    }
    function ucitw_Widget__init_($this) {
        jl_Object__init_0($this);
    }
    var ju_Map = $rt_classWithoutFields(0);
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
        ucits_TemplatedTest_testTemplatingBinding($rt_nullCheck($rt_castToClass(var$1, ucits_TemplatedTest)));
    }
    var otj_JSObject = $rt_classWithoutFields(0);
    var otjde_EventTarget = $rt_classWithoutFields(0);
    var otjde_GamepadEventTarget = $rt_classWithoutFields(0);
    var jl_CharSequence = $rt_classWithoutFields(0);
    var jl_Error = $rt_classWithoutFields(jl_Throwable);
    function jl_Error__init_() {
        var var_0 = new jl_Error();
        jl_Error__init_0(var_0);
        return var_0;
    }
    function jl_Error__init_1(var_0) {
        var var_1 = new jl_Error();
        jl_Error__init_2(var_1, var_0);
        return var_1;
    }
    function jl_Error__init_0($this) {
        jl_Throwable__init_0($this);
    }
    function jl_Error__init_2($this, $message) {
        jl_Throwable__init_2($this, $message);
    }
    var jl_LinkageError = $rt_classWithoutFields(jl_Error);
    function jl_LinkageError__init_(var_0) {
        var var_1 = new jl_LinkageError();
        jl_LinkageError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_LinkageError__init_0($this, $message) {
        jl_Error__init_2($this, $message);
    }
    var otjde_LoadEventTarget = $rt_classWithoutFields(0);
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
    var jl_Iterable = $rt_classWithoutFields(0);
    var ju_Collection = $rt_classWithoutFields(0);
    var ju_Set = $rt_classWithoutFields(0);
    var ucits_HelloService_Factory = $rt_classWithoutFields();
    var ucits_HelloService_Factory_instance = null;
    function ucits_HelloService_Factory_getInstance() {
        if (ucits_HelloService_Factory_instance === null)
            ucits_HelloService_Factory_instance = ucits_HelloService_Factory_createInstance();
        return ucits_HelloService_Factory_instance;
    }
    function ucits_HelloService_Factory_createInstance() {
        var $bean;
        $bean = ucits_HelloService__init_();
        return $bean;
    }
    function jl_AbstractStringBuilder() {
        var a = this; jl_Object.call(a);
        a.$buffer = null;
        a.$length0 = 0;
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
        $this.$buffer = $rt_createCharArray($capacity);
    }
    function jl_AbstractStringBuilder_append($this, $obj) {
        return $this.$insert($this.$length0, $obj);
    }
    function jl_AbstractStringBuilder_append0($this, $string) {
        return $this.$insert0($this.$length0, $string);
    }
    function jl_AbstractStringBuilder_insert($this, $index, $string) {
        var $i, var$4, var$5, var$6, var$7;
        if ($index >= 0 && $index <= $this.$length0) {
            if ($string === null)
                $string = $rt_s(5);
            else if ($string.$isEmpty())
                return $this;
            $this.$ensureCapacity($this.$length0 + $string.$length() | 0);
            $i = $this.$length0 - 1 | 0;
            while ($i >= $index) {
                var$4 = $this.$buffer;
                var$5 = $i + $string.$length() | 0;
                var$6 = $rt_nullCheck($this.$buffer).data;
                $i = $rt_checkBounds($i, var$6);
                var$7 = var$6[$i];
                var$4 = $rt_nullCheck(var$4).data;
                var$4[$rt_checkBounds(var$5, var$4)] = var$7;
                $i = $i + (-1) | 0;
            }
            $this.$length0 = $this.$length0 + $string.$length() | 0;
            $i = 0;
            while ($i < $string.$length()) {
                var$4 = $this.$buffer;
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
        return $this.$insert1($this.$length0, $value, $radix);
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
                    var$5 = $this.$buffer;
                    var$6 = $target + 1 | 0;
                    var$5 = $rt_nullCheck(var$5).data;
                    $target = $rt_checkBounds($target, var$5);
                    var$5[$target] = 45;
                    $target = var$6;
                }
                var$5 = $this.$buffer;
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
                    var$5 = $this.$buffer;
                    var$11 = $target + 1 | 0;
                    var$5 = $rt_nullCheck(var$5).data;
                    $target = $rt_checkBounds($target, var$5);
                    var$5[$target] = 45;
                }
                while (true) {
                    if (!var$10)
                        break a;
                    var$5 = $this.$buffer;
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
    function jl_AbstractStringBuilder_append3($this, $c) {
        return $this.$insert2($this.$length0, $c);
    }
    function jl_AbstractStringBuilder_insert1($this, $index, $c) {
        var var$3;
        jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
        var$3 = $rt_nullCheck($this.$buffer).data;
        $index = $rt_checkBounds($index, var$3);
        var$3[$index] = $c;
        return $this;
    }
    function jl_AbstractStringBuilder_insert2($this, $index, $obj) {
        return $this.$insert0($index, $obj === null ? $rt_s(5) : $obj.$toString());
    }
    function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
        var $newLength;
        if ($rt_nullCheck($this.$buffer).data.length >= $capacity)
            return;
        $newLength = $rt_nullCheck($this.$buffer).data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($rt_nullCheck($this.$buffer).data.length * 2 | 0, 5));
        $this.$buffer = ju_Arrays_copyOf($this.$buffer, $newLength);
    }
    function jl_AbstractStringBuilder_toString($this) {
        return jl_String__init_0($this.$buffer, 0, $this.$length0);
    }
    function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
        var $sz, $i, var$5, var$6, var$7, var$8;
        $sz = $this.$length0 - $start | 0;
        $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
        $i = $sz - 1 | 0;
        while ($i >= 0) {
            var$5 = $this.$buffer;
            var$6 = $end + $i | 0;
            var$7 = $this.$buffer;
            var$8 = $start + $i | 0;
            var$7 = $rt_nullCheck(var$7).data;
            var$8 = var$7[$rt_checkBounds(var$8, var$7)];
            var$5 = $rt_nullCheck(var$5).data;
            var$5[$rt_checkBounds(var$6, var$5)] = var$8;
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
    }
    var jl_Appendable = $rt_classWithoutFields(0);
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
    function jl_StringBuilder_append1($this, $string) {
        jl_AbstractStringBuilder_append0($this, $string);
        return $this;
    }
    function jl_StringBuilder_append2($this, $value) {
        jl_AbstractStringBuilder_append1($this, $value);
        return $this;
    }
    function jl_StringBuilder_append0($this, $c) {
        jl_AbstractStringBuilder_append3($this, $c);
        return $this;
    }
    function jl_StringBuilder_insert($this, $index, $obj) {
        jl_AbstractStringBuilder_insert2($this, $index, $obj);
        return $this;
    }
    function jl_StringBuilder_insert0($this, $index, $c) {
        jl_AbstractStringBuilder_insert1($this, $index, $c);
        return $this;
    }
    function jl_StringBuilder_insert1($this, $index, $string) {
        jl_AbstractStringBuilder_insert($this, $index, $string);
        return $this;
    }
    function jl_StringBuilder_toString($this) {
        return jl_AbstractStringBuilder_toString($this);
    }
    function jl_StringBuilder_ensureCapacity($this, var$1) {
        jl_AbstractStringBuilder_ensureCapacity($this, var$1);
    }
    function jl_StringBuilder_insert2($this, var$1, var$2) {
        return $this.$insert3(var$1, var$2);
    }
    function jl_StringBuilder_insert3($this, var$1, var$2) {
        return $this.$insert4(var$1, var$2);
    }
    function jl_StringBuilder_insert4($this, var$1, var$2) {
        return $this.$insert5(var$1, var$2);
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
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor() {
        var a = this; jl_Object.call(a);
        a.$sharedPrefix0 = null;
        a.$sharedSuffix0 = null;
        a.$this$0 = null;
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_0(var_0) {
        var var_1 = new oj_ComparisonFailure$ComparisonCompactor$DiffExtractor();
        oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_1(var_1, var_0);
        return var_1;
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_(var_0, var_1) {
        var var_2 = new oj_ComparisonFailure$ComparisonCompactor$DiffExtractor();
        oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_2(var_2, var_0, var_1);
        return var_2;
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_1($this, var$1) {
        $this.$this$0 = var$1;
        jl_Object__init_0($this);
        $this.$sharedPrefix0 = oj_ComparisonFailure$ComparisonCompactor_access$100(var$1);
        $this.$sharedSuffix0 = oj_ComparisonFailure$ComparisonCompactor_access$200(var$1, $this.$sharedPrefix0);
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_expectedDiff($this) {
        return oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_extractDiff($this, oj_ComparisonFailure$ComparisonCompactor_access$300($this.$this$0));
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_actualDiff($this) {
        return oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_extractDiff($this, oj_ComparisonFailure$ComparisonCompactor_access$400($this.$this$0));
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactPrefix($this) {
        if ($rt_nullCheck($this.$sharedPrefix0).$length() <= oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0))
            return $this.$sharedPrefix0;
        return $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($rt_s(6))).$append1($rt_nullCheck($this.$sharedPrefix0).$substring0($rt_nullCheck($this.$sharedPrefix0).$length() - oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0) | 0))).$toString();
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactSuffix($this) {
        if ($rt_nullCheck($this.$sharedSuffix0).$length() <= oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0))
            return $this.$sharedSuffix0;
        return $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($rt_nullCheck($this.$sharedSuffix0).$substring(0, oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0)))).$append1($rt_s(6))).$toString();
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_extractDiff($this, $source) {
        var var$2, var$3;
        var$2 = (jl_StringBuilder__init_()).$append1($rt_s(7));
        var$3 = $rt_nullCheck($this.$sharedPrefix0).$length();
        $source = $rt_nullCheck($source);
        return $rt_nullCheck($rt_nullCheck($rt_nullCheck(var$2).$append1($source.$substring(var$3, $source.$length() - $rt_nullCheck($this.$sharedSuffix0).$length() | 0))).$append1($rt_s(8))).$toString();
    }
    function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_2($this, $x0, $x1) {
        oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_1($this, $x0);
    }
    var jlr_AnnotatedElement = $rt_classWithoutFields(0);
    var ucits_AppSecurityProvider_Factory = $rt_classWithoutFields();
    var ucits_AppSecurityProvider_Factory_instance = null;
    function ucits_AppSecurityProvider_Factory_getInstance() {
        if (ucits_AppSecurityProvider_Factory_instance === null)
            ucits_AppSecurityProvider_Factory_instance = ucits_AppSecurityProvider_Factory_createInstance();
        return ucits_AppSecurityProvider_Factory_instance;
    }
    function ucits_AppSecurityProvider_Factory_createInstance() {
        var $bean;
        $bean = ucits_AppSecurityProvider__init_();
        return $bean;
    }
    var otjde_FocusEventTarget = $rt_classWithoutFields(0);
    var otjde_MouseEventTarget = $rt_classWithoutFields(0);
    var otjde_KeyboardEventTarget = $rt_classWithoutFields(0);
    var otjb_WindowEventTarget = $rt_classWithoutFields(0);
    var jl_AssertionError = $rt_classWithoutFields(jl_Error);
    function jl_AssertionError__init_() {
        var var_0 = new jl_AssertionError();
        jl_AssertionError__init_0(var_0);
        return var_0;
    }
    function jl_AssertionError__init_1(var_0) {
        var var_1 = new jl_AssertionError();
        jl_AssertionError__init_2(var_1, var_0);
        return var_1;
    }
    function jl_AssertionError__init_0($this) {
        jl_Error__init_0($this);
    }
    function jl_AssertionError__init_2($this, $message) {
        jl_Error__init_2($this, jl_String_valueOf($message));
    }
    var jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_ClassCastException__init_() {
        var var_0 = new jl_ClassCastException();
        jl_ClassCastException__init_0(var_0);
        return var_0;
    }
    function jl_ClassCastException__init_0($this) {
        jl_RuntimeException__init_1($this);
    }
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
        a.$array = null;
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
            $this.$array = $rt_createArray(jl_Object, $initialCapacity);
            return;
        }
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    function ju_ArrayList_ensureCapacity($this, $minCapacity) {
        var $newLength;
        if ($rt_nullCheck($this.$array).data.length < $minCapacity) {
            $newLength = $rt_nullCheck($this.$array).data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($rt_nullCheck($this.$array).data.length * 2 | 0, 5));
            $this.$array = ju_Arrays_copyOf0($this.$array, $newLength);
        }
    }
    function ju_ArrayList_get($this, $index) {
        var var$2;
        ju_ArrayList_checkIndex($this, $index);
        var$2 = $rt_nullCheck($this.$array).data;
        $index = $rt_checkBounds($index, var$2);
        return var$2[$index];
    }
    function ju_ArrayList_size($this) {
        return $this.$size;
    }
    function ju_ArrayList_add($this, $element) {
        var var$2, var$3;
        $this.$ensureCapacity($this.$size + 1 | 0);
        var$2 = $this.$array;
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
    var ucitw_Container = $rt_classWithoutFields(ucitw_Widget);
    function ucitw_Container__init_() {
        var var_0 = new ucitw_Container();
        ucitw_Container__init_0(var_0);
        return var_0;
    }
    function ucitw_Container__init_0($this) {
        var var$1, var$2;
        ucitw_Widget__init_($this);
        $this.$element0 = $rt_globals.window.document.createElement("div");
        var$1 = $this.$element0;
        var$2 = "container";
        var$1.className = var$2;
    }
    function uciti_NavigationImpl() {
        jl_Object.call(this);
        this.$securityProvider = null;
    }
    function uciti_NavigationImpl__init_() {
        var var_0 = new uciti_NavigationImpl();
        uciti_NavigationImpl__init_0(var_0);
        return var_0;
    }
    function uciti_NavigationImpl__init_0($this) {
        jl_Object__init_0($this);
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
        $rt_nullCheck($rt_nullCheck($rt_nullCheck($sb.$append1($rt_nullCheck($this.$declaringClass).$substring0($index + 1 | 0))).$append0(46)).$append1($this.$methodName)).$append0(40);
        if ($this.$fileName === null)
            $sb.$append1($rt_s(9));
        else
            $rt_nullCheck($rt_nullCheck($sb.$append1($this.$fileName)).$append0(58)).$append7($this.$lineNumber);
        $sb.$append1($rt_s(10));
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
        $i = jl_Math_min($fromIndex, $this.$length() - 1 | 0);
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
        return $this.$lastIndexOf0($ch, $this.$length() - 1 | 0);
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
        if (!$beginIndex && $endIndex == $this.$length())
            return $this;
        return jl_String__init_0($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
    }
    function jl_String_substring0($this, $beginIndex) {
        return $this.$substring($beginIndex, $this.$length());
    }
    function jl_String_contains($this, $s) {
        var var$2, $sz, $i, $j;
        var$2 = $this.$length();
        $s = $rt_nullCheck($s);
        $sz = var$2 - $s.$length() | 0;
        $i = 0;
        while ($i <= $sz) {
            $j = 0;
            while (true) {
                if ($j >= $s.$length())
                    return 1;
                if ($this.$charAt($i + $j | 0) != $s.$charAt($j))
                    break;
                $j = $j + 1 | 0;
            }
            $i = $i + 1 | 0;
        }
        return 0;
    }
    function jl_String_toString($this) {
        return $rt_castToClass($this, jl_String);
    }
    function jl_String_valueOf($obj) {
        jl_String_$callClinit();
        return $obj === null ? $rt_s(5) : $obj.$toString();
    }
    function jl_String_equals($this, $other) {
        var $str, $i;
        if ($this === $other)
            return 1;
        if (!($other instanceof jl_String))
            return 0;
        $str = $rt_castToClass($other, jl_String);
        $str = $rt_nullCheck($str);
        if ($str.$length() != $this.$length())
            return 0;
        $i = 0;
        while ($i < $str.$length()) {
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
    var ju_Map$Entry = $rt_classWithoutFields(0);
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
    var jl_ArrayIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
    function jl_ArrayIndexOutOfBoundsException__init_() {
        var var_0 = new jl_ArrayIndexOutOfBoundsException();
        jl_ArrayIndexOutOfBoundsException__init_0(var_0);
        return var_0;
    }
    function jl_ArrayIndexOutOfBoundsException__init_0($this) {
        jl_IndexOutOfBoundsException__init_0($this);
    }
    var ju_Iterator = $rt_classWithoutFields(0);
    function ju_AbstractList$1() {
        var a = this; jl_Object.call(a);
        a.$index = 0;
        a.$modCount0 = 0;
        a.$size0 = 0;
        a.$removeIndex = 0;
        a.$this$00 = null;
    }
    function ju_AbstractList$1__init_(var_0) {
        var var_1 = new ju_AbstractList$1();
        ju_AbstractList$1__init_0(var_1, var_0);
        return var_1;
    }
    function ju_AbstractList$1__init_0($this, $this$0) {
        $this.$this$00 = $this$0;
        jl_Object__init_0($this);
        $this.$modCount0 = $rt_nullCheck($this.$this$00).$modCount;
        $this.$size0 = $rt_nullCheck($this.$this$00).$size1();
        $this.$removeIndex = (-1);
    }
    function ju_AbstractList$1_hasNext($this) {
        return $this.$index >= $this.$size0 ? 0 : 1;
    }
    function ju_AbstractList$1_next($this) {
        var var$1, var$2;
        ju_AbstractList$1_checkConcurrentModification($this);
        $this.$removeIndex = $this.$index;
        var$1 = $this.$this$00;
        var$2 = $this.$index;
        $this.$index = var$2 + 1 | 0;
        return $rt_nullCheck(var$1).$get(var$2);
    }
    function ju_AbstractList$1_checkConcurrentModification($this) {
        if ($this.$modCount0 >= $rt_nullCheck($this.$this$00).$modCount)
            return;
        $rt_throw(ju_ConcurrentModificationException__init_());
    }
    var oj_Assert = $rt_classWithoutFields();
    function oj_Assert_assertTrue0($message, $condition) {
        if (!$condition)
            oj_Assert_fail($message);
    }
    function oj_Assert_assertTrue($condition) {
        oj_Assert_assertTrue0(null, $condition);
    }
    function oj_Assert_fail($message) {
        if ($message !== null)
            $rt_throw(jl_AssertionError__init_1($message));
        $rt_throw(jl_AssertionError__init_());
    }
    function oj_Assert_assertEquals($cleanMessage, $expected, $actual) {
        if (oj_Assert_equalsRegardingNull($expected, $actual))
            return;
        if ($expected instanceof jl_String && $actual instanceof jl_String) {
            if ($cleanMessage === null)
                $cleanMessage = $rt_s(11);
            $rt_throw(oj_ComparisonFailure__init_($cleanMessage, $rt_castToClass($expected, jl_String), $rt_castToClass($actual, jl_String)));
        }
        oj_Assert_failNotEquals($cleanMessage, $expected, $actual);
    }
    function oj_Assert_equalsRegardingNull($expected, $actual) {
        if ($expected !== null)
            return oj_Assert_isEquals($expected, $actual);
        return $actual !== null ? 0 : 1;
    }
    function oj_Assert_isEquals($expected, $actual) {
        $expected = $rt_nullCheck($expected);
        return $expected.$equals($actual);
    }
    function oj_Assert_assertEquals0($expected, $actual) {
        oj_Assert_assertEquals(null, $expected, $actual);
    }
    function oj_Assert_assertNotNull($message, $object) {
        oj_Assert_assertTrue0($message, $object === null ? 0 : 1);
    }
    function oj_Assert_assertNotNull0($object) {
        oj_Assert_assertNotNull(null, $object);
    }
    function oj_Assert_assertNull0($message, $object) {
        if ($object === null)
            return;
        oj_Assert_failNotNull($message, $object);
    }
    function oj_Assert_assertNull($object) {
        oj_Assert_assertNull0(null, $object);
    }
    function oj_Assert_failNotNull($message, $actual) {
        var $formatted;
        $formatted = $rt_s(11);
        if ($message !== null)
            $formatted = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($message)).$append1($rt_s(12))).$toString();
        oj_Assert_fail($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($formatted)).$append1($rt_s(13))).$append($actual)).$append1($rt_s(14))).$toString());
    }
    function oj_Assert_failNotEquals($message, $expected, $actual) {
        oj_Assert_fail(oj_Assert_format($message, $expected, $actual));
    }
    function oj_Assert_format($message, $expected, $actual) {
        var $formatted, $expectedString, $actualString;
        $formatted = $rt_s(11);
        if ($message !== null && !$rt_s(11).$equals($message))
            $formatted = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($message)).$append1($rt_s(12))).$toString();
        $expectedString = jl_String_valueOf($expected);
        $actualString = jl_String_valueOf($actual);
        if (oj_Assert_equalsRegardingNull($expectedString, $actualString))
            return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($formatted)).$append1($rt_s(15))).$append1(oj_Assert_formatClassAndValue($expected, $expectedString))).$append1($rt_s(16))).$append1(oj_Assert_formatClassAndValue($actual, $actualString))).$toString();
        return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($formatted)).$append1($rt_s(17))).$append1($expectedString)).$append1($rt_s(18))).$append1($actualString)).$append1($rt_s(14))).$toString();
    }
    function oj_Assert_formatClassAndValue($value, $valueString) {
        var $className;
        $className = $value === null ? $rt_s(5) : $rt_nullCheck(jl_Object_getClass($value)).$getName();
        return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append1($className)).$append1($rt_s(19))).$append1($valueString)).$append1($rt_s(14))).$toString();
    }
    function oj_ComparisonFailure() {
        var a = this; jl_AssertionError.call(a);
        a.$fExpected = null;
        a.$fActual = null;
    }
    function oj_ComparisonFailure__init_(var_0, var_1, var_2) {
        var var_3 = new oj_ComparisonFailure();
        oj_ComparisonFailure__init_0(var_3, var_0, var_1, var_2);
        return var_3;
    }
    function oj_ComparisonFailure__init_0($this, $message, $expected, $actual) {
        jl_AssertionError__init_2($this, $message);
        $this.$fExpected = $expected;
        $this.$fActual = $actual;
    }
    function oj_ComparisonFailure_getMessage($this) {
        return (oj_ComparisonFailure$ComparisonCompactor__init_(20, $this.$fExpected, $this.$fActual)).$compact(jl_Throwable_getMessage($this));
    }
    var jlr_Array = $rt_classWithoutFields();
    function jlr_Array_getLength(var$1) {
        if (var$1 === null || var$1.constructor.$meta.item === undefined) {
            $rt_throw(jl_IllegalArgumentException__init_());
        }
        return var$1.data.length;
    }
    function jlr_Array_newInstance($componentType, $length) {
        if ($componentType === null)
            $rt_throw(jl_NullPointerException__init_());
        if ($componentType === $rt_cls($rt_voidcls()))
            $rt_throw(jl_IllegalArgumentException__init_());
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
    var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
    function jl_NoSuchFieldError__init_(var_0) {
        var var_1 = new jl_NoSuchFieldError();
        jl_NoSuchFieldError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_NoSuchFieldError__init_0($this, $message) {
        jl_IncompatibleClassChangeError__init_0($this, $message);
    }
    var ucits_DashboardPage_Binder = $rt_classWithoutFields();
    function ucits_DashboardPage_Binder_bind($target) {
        var $doc, $root, var$4, $el_container, $widgetElement, $currentClasses, $placeholderClasses, var$9, $placeholderId, $placeholderStyle, $currentStyle, var$13;
        $doc = $rt_globals.window.document;
        $root = $doc.createElement("div");
        var$4 = "<div>     <h1>Dashboard</h1>     <div data-field=\"content\"></div>     <div data-field=\"userBtn\"></div>     <div data-field=\"backBtn\"></div> </div> ";
        $root.innerHTML = var$4;
        $target = $rt_nullCheck($target);
        $target.$element = $root;
        $el_container = $root.querySelector("[data-field=\'container\']");
        if ($el_container !== null && $target.$container !== null) {
            $widgetElement = $rt_nullCheck($target.$container).$element0;
            if ($widgetElement !== null) {
                $currentClasses = $rt_str($widgetElement.className);
                $placeholderClasses = $rt_str($el_container.className);
                if ($placeholderClasses !== null && !$placeholderClasses.$isEmpty()) {
                    if ($currentClasses === null)
                        var$4 = $rt_s(11);
                    else {
                        var$4 = jl_StringBuilder__init_();
                        jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$4, $currentClasses)), 32);
                        var$4 = jl_StringBuilder_toString(var$4);
                    }
                    var$9 = jl_StringBuilder__init_();
                    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$9, var$4)), $placeholderClasses);
                    var$4 = $rt_ustr(jl_StringBuilder_toString(var$9));
                    $widgetElement.className = var$4;
                }
                $placeholderId = $rt_str($el_container.getAttribute("id"));
                if ($placeholderId !== null && !$placeholderId.$isEmpty())
                    $widgetElement.setAttribute("id", $rt_ustr($placeholderId));
                $placeholderStyle = $rt_str($el_container.getAttribute("style"));
                if ($placeholderStyle !== null && !$placeholderStyle.$isEmpty()) {
                    $currentStyle = $rt_str($widgetElement.getAttribute("style"));
                    if ($currentStyle === null)
                        var$9 = $rt_s(11);
                    else {
                        var$9 = jl_StringBuilder__init_();
                        jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$9, $currentStyle)), 59);
                        var$9 = jl_StringBuilder_toString(var$9);
                    }
                    var$13 = jl_StringBuilder__init_();
                    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$13, var$9)), $placeholderStyle);
                    var$13 = jl_StringBuilder_toString(var$13);
                    $widgetElement.setAttribute("style", $rt_ustr(var$13));
                }
                $el_container.parentNode.replaceChild($widgetElement, $el_container);
            }
        }
        return $root;
    }
    function ucits_DashboardPage() {
        var a = this; jl_Object.call(a);
        a.$navigation = null;
        a.$service = null;
        a.$element = null;
        a.$container = null;
    }
    function ucits_DashboardPage__init_() {
        var var_0 = new ucits_DashboardPage();
        ucits_DashboardPage__init_0(var_0);
        return var_0;
    }
    function ucits_DashboardPage__init_0($this) {
        jl_Object__init_0($this);
    }
    var otci_IntegerUtil = $rt_classWithoutFields();
    function otci_IntegerUtil_toUnsignedLogRadixString($value, $radixLog2) {
        var $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0, var$11;
        if (!$value)
            return $rt_s(20);
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
    var ucits_DashboardPage_Factory = $rt_classWithoutFields();
    var ucits_DashboardPage_Factory_instance = null;
    function ucits_DashboardPage_Factory_getInstance() {
        if (ucits_DashboardPage_Factory_instance === null)
            ucits_DashboardPage_Factory_instance = ucits_DashboardPage_Factory_createInstance();
        return ucits_DashboardPage_Factory_instance;
    }
    function ucits_DashboardPage_Factory_createInstance() {
        var $bean;
        $bean = ucits_DashboardPage__init_();
        $bean.$navigation = uciti_NavigationImpl_Factory_getInstance();
        $bean.$service = ucits_HelloService_Factory_getInstance();
        $bean.$container = ucitw_Container__init_();
        ucits_DashboardPage_Binder_bind($bean);
        return $bean;
    }
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
        return ucits_TemplatedTest__init_();
    }
    function otj_TestEntryPoint_before() {}
    function otj_TestEntryPoint_launchers(var$1, var$2) {
        if (!jl_String_equals($rt_nullCheck(var$1), $rt_s(21)))
            $rt_throw(jl_IllegalArgumentException__init_0($rt_s(22)));
        var$1 = otj_TestEntryPoint$LauncherImpl0__init_();
        $rt_nullCheck(var$2).$add(var$1);
    }
    function otj_TestEntryPoint_after() {}
    var uciti_NavigationImpl_Factory = $rt_classWithoutFields();
    var uciti_NavigationImpl_Factory_instance = null;
    function uciti_NavigationImpl_Factory_getInstance() {
        if (uciti_NavigationImpl_Factory_instance === null) {
            uciti_NavigationImpl_Factory_instance = uciti_NavigationImpl__init_();
            $rt_nullCheck(uciti_NavigationImpl_Factory_instance).$securityProvider = ucits_AppSecurityProvider_Factory_getInstance();
        }
        return uciti_NavigationImpl_Factory_instance;
    }
    var ju_MapEntry = $rt_classWithoutFields();
    var ju_HashMap$HashEntry = $rt_classWithoutFields(ju_MapEntry);
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
    var ucits_HelloService = $rt_classWithoutFields();
    function ucits_HelloService__init_() {
        var var_0 = new ucits_HelloService();
        ucits_HelloService__init_0(var_0);
        return var_0;
    }
    function ucits_HelloService__init_0($this) {
        jl_Object__init_0($this);
    }
    var ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection);
    function ju_AbstractSet__init_($this) {
        ju_AbstractCollection__init_($this);
    }
    var ju_AbstractMap = $rt_classWithoutFields();
    function ju_AbstractMap__init_($this) {
        jl_Object__init_0($this);
    }
    function ju_HashMap() {
        var a = this; ju_AbstractMap.call(a);
        a.$elementCount = 0;
        a.$elementData = null;
        a.$loadFactor = 0.0;
        a.$threshold = 0;
    }
    function ju_HashMap__init_() {
        var var_0 = new ju_HashMap();
        ju_HashMap__init_0(var_0);
        return var_0;
    }
    function ju_HashMap__init_1(var_0) {
        var var_1 = new ju_HashMap();
        ju_HashMap__init_2(var_1, var_0);
        return var_1;
    }
    function ju_HashMap__init_3(var_0, var_1) {
        var var_2 = new ju_HashMap();
        ju_HashMap__init_4(var_2, var_0, var_1);
        return var_2;
    }
    function ju_HashMap_newElementArray($this, $s) {
        return $rt_createArray(ju_HashMap$HashEntry, $s);
    }
    function ju_HashMap__init_0($this) {
        ju_HashMap__init_2($this, 16);
    }
    function ju_HashMap__init_2($this, $capacity) {
        ju_HashMap__init_4($this, $capacity, 0.75);
    }
    function ju_HashMap_calculateCapacity($x) {
        var var$2, var$3;
        if ($x >= 1073741824)
            return 1073741824;
        if (!$x)
            return 16;
        var$2 = $x - 1 | 0;
        var$3 = var$2 | var$2 >> 1;
        var$3 = var$3 | var$3 >> 2;
        var$3 = var$3 | var$3 >> 4;
        var$3 = var$3 | var$3 >> 8;
        var$3 = var$3 | var$3 >> 16;
        return var$3 + 1 | 0;
    }
    function ju_HashMap__init_4($this, $capacity, $loadFactor) {
        var var$3;
        ju_AbstractMap__init_($this);
        if ($capacity >= 0 && $loadFactor > 0.0) {
            var$3 = ju_HashMap_calculateCapacity($capacity);
            $this.$elementCount = 0;
            $this.$elementData = $this.$newElementArray(var$3);
            $this.$loadFactor = $loadFactor;
            ju_HashMap_computeThreshold($this);
            return;
        }
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    function ju_HashMap_computeThreshold($this) {
        $this.$threshold = $rt_nullCheck($this.$elementData).data.length * $this.$loadFactor | 0;
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
        $isObject = !$type.$equals($rt_s(23)) && !$type.$equals($rt_s(24)) ? 0 : 1;
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
            if ($type.$equals($rt_s(25))) {
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
            if ($type.$equals($rt_s(26))) {
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
            if ($type.$equals($rt_s(27))) {
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
    function otji_JSWrapper_equals($this, $obj) {
        if ($obj === $this)
            return 1;
        if ($obj === null)
            return 0;
        if (!($obj instanceof otji_JSWrapper))
            return 0;
        return $this.$js !== $rt_nullCheck($rt_castToClass($obj, otji_JSWrapper)).$js ? 0 : 1;
    }
    function otji_JSWrapper_toString($this) {
        return (typeof $this.$js === 'undefined' ? 1 : 0) ? $rt_s(27) : $rt_str($this.$js.toString());
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
    function ju_HashSet() {
        ju_AbstractSet.call(this);
        this.$backingMap = null;
    }
    function ju_HashSet__init_() {
        var var_0 = new ju_HashSet();
        ju_HashSet__init_0(var_0);
        return var_0;
    }
    function ju_HashSet__init_1(var_0) {
        var var_1 = new ju_HashSet();
        ju_HashSet__init_2(var_1, var_0);
        return var_1;
    }
    function ju_HashSet__init_0($this) {
        ju_HashSet__init_2($this, ju_HashMap__init_());
    }
    function ju_HashSet__init_2($this, $backingMap) {
        ju_AbstractSet__init_($this);
        $this.$backingMap = $backingMap;
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
    var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
    var otjc_JSWeakRef = $rt_classWithoutFields();
    var otjc_JSFinalizationRegistry = $rt_classWithoutFields();
    var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
    function jl_IllegalArgumentException__init_() {
        var var_0 = new jl_IllegalArgumentException();
        jl_IllegalArgumentException__init_1(var_0);
        return var_0;
    }
    function jl_IllegalArgumentException__init_0(var_0) {
        var var_1 = new jl_IllegalArgumentException();
        jl_IllegalArgumentException__init_2(var_1, var_0);
        return var_1;
    }
    function jl_IllegalArgumentException__init_1($this) {
        jl_RuntimeException__init_1($this);
    }
    function jl_IllegalArgumentException__init_2($this, $message) {
        jl_RuntimeException__init_2($this, $message);
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
        $stream.$append1(var$3);
        $message = $e.$getLocalizedMessage();
        if ($message !== null) {
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(28))), $message);
            $stream.$append1(jl_StringBuilder_toString(var$3));
        }
        a: {
            $stream.$append1($rt_s(29));
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
                    $stream.$append1($rt_s(30));
                    $rt_nullCheck($stream.$append($element)).$append1($rt_s(29));
                    var$8 = var$8 + 1 | 0;
                }
            }
        }
        if ($e.$getCause() !== null && $e.$getCause() !== $e) {
            $stream.$append1($rt_s(31));
            otj_TestJsEntryPoint_printStackTrace($e.$getCause(), $stream);
        }
    }
    function jl_Class() {
        var a = this; jl_Object.call(a);
        a.$name = null;
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
        if ($this.$name === null)
            $this.$name = otp_Platform_getName($this.$platformClass);
        return $this.$name;
    }
    function jl_Class_isPrimitive($this) {
        return otp_Platform_isPrimitive($this.$platformClass);
    }
    function jl_Class_getComponentType($this) {
        return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
    }
    $rt_packages([-1, "java", 0, "util", 0, "lang", -1, "org", 3, "junit", 3, "teavm", 5, "jso", 6, "impl"
    ]);
    $rt_metadata([jl_Object, "Object", 2, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone", $rt_wrapFunction0(jl_Object_clone)],
    jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$getStackTrace", $rt_wrapFunction0(jl_Throwable_getStackTrace), "$setStackTrace", $rt_wrapFunction1(jl_Throwable_setStackTrace)],
    jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_0), "$_init_0", $rt_wrapFunction1(jl_Exception__init_2)],
    jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_1), "$_init_0", $rt_wrapFunction1(jl_RuntimeException__init_2)],
    jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_0)],
    ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
    ucita_SecurityProvider, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ucits_AppSecurityProvider, 0, jl_Object, [ucita_SecurityProvider], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucits_AppSecurityProvider__init_0)],
    ucits_TemplatedTest, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucits_TemplatedTest__init_0), "$testTemplatingBinding", $rt_wrapFunction0(ucits_TemplatedTest_testTemplatingBinding)],
    ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
    jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, 0,
    jl_CloneNotSupportedException, "CloneNotSupportedException", 2, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_CloneNotSupportedException__init_0)],
    jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
    ucita_Navigation, 0, jl_Object, [], 3, 3, 0, 0, 0,
    oj_ComparisonFailure$ComparisonCompactor, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_8", $rt_wrapFunction3(oj_ComparisonFailure$ComparisonCompactor__init_0), "$compact", $rt_wrapFunction1(oj_ComparisonFailure$ComparisonCompactor_compact)],
    ucitw_Widget, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucitw_Widget__init_)],
    ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otj_TestEntryPoint$Launcher, 0, jl_Object, [], 3, 0, 0, 0, 0,
    otj_TestEntryPoint$LauncherImpl0, 0, jl_Object, [otj_TestEntryPoint$Launcher], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(otj_TestEntryPoint$LauncherImpl0__init_0), "$launch", $rt_wrapFunction1(otj_TestEntryPoint$LauncherImpl0_launch)],
    otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otjde_GamepadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Error__init_0), "$_init_0", $rt_wrapFunction1(jl_Error__init_2)],
    jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_LinkageError__init_0)],
    otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_String$_clinit_$lambda$_93_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_93_0__init_0)],
    jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 2, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
    jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
    ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
    ucits_HelloService_Factory, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_2", $rt_wrapFunction1(jl_AbstractStringBuilder__init_2), "$append3", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$append4", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert), "$append5", $rt_wrapFunction1(jl_AbstractStringBuilder_append1), "$append2", $rt_wrapFunction2(jl_AbstractStringBuilder_append2),
    "$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert0), "$append6", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert2), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
    jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringBuilder__init_0), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append1", $rt_wrapFunction1(jl_StringBuilder_append1), "$append7", $rt_wrapFunction1(jl_StringBuilder_append2), "$append0", $rt_wrapFunction1(jl_StringBuilder_append0), "$insert3", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert0), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert1),
    "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert2), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert3), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert4)],
    ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ConcurrentModificationException__init_0)],
    oj_ComparisonFailure$ComparisonCompactor$DiffExtractor, 0, jl_Object, [], 0, 0, 0, 0, ["$expectedDiff", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_expectedDiff), "$actualDiff", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_actualDiff), "$compactPrefix", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactPrefix), "$compactSuffix", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactSuffix), "$_init_1",
    $rt_wrapFunction2(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_2)],
    jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ucits_AppSecurityProvider_Factory, 0, jl_Object, [], 0, 3, 0, 0, 0,
    otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0, 0,
    otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget, otjde_GamepadEventTarget], 3, 3, 0, 0, 0,
    jl_AssertionError, "AssertionError", 2, jl_Error, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AssertionError__init_0), "$_init_6", $rt_wrapFunction1(jl_AssertionError__init_2)],
    jl_ClassCastException, "ClassCastException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ClassCastException__init_0)],
    ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractCollection__init_)]]);
    $rt_metadata([ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
    ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
    ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractList__init_), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator)],
    jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayList__init_0), "$_init_2", $rt_wrapFunction1(ju_ArrayList__init_2), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get", $rt_wrapFunction1(ju_ArrayList_get), "$size1", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add)],
    ucitw_Container, 0, ucitw_Widget, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucitw_Container__init_0)],
    uciti_NavigationImpl, 0, jl_Object, [ucita_Navigation], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciti_NavigationImpl__init_0)],
    otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, 0, ["$get$exported$0", $rt_wrapFunction1(otjb_Window_get$exported$0), "$addEventListener$exported$1", $rt_wrapFunction2(otjb_Window_addEventListener$exported$1), "$removeEventListener$exported$2", $rt_wrapFunction2(otjb_Window_removeEventListener$exported$2), "$removeEventListener$exported$3", $rt_wrapFunction3(otjb_Window_removeEventListener$exported$3), "$dispatchEvent$exported$4", $rt_wrapFunction1(otjb_Window_dispatchEvent$exported$4),
    "$getLength$exported$5", $rt_wrapFunction0(otjb_Window_getLength$exported$5), "$addEventListener$exported$6", $rt_wrapFunction3(otjb_Window_addEventListener$exported$6)],
    jl_StackTraceElement, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0, ["$_init_14", $rt_wrapFunction4(jl_StackTraceElement__init_0), "$toString", $rt_wrapFunction0(jl_StackTraceElement_toString)],
    jl_String, "String", 2, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_", $rt_wrapFunction0(jl_String__init_2), "$_init_9", $rt_wrapFunction1(jl_String__init_3), "$_init_3", $rt_wrapFunction3(jl_String__init_4), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length), "$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$lastIndexOf0", $rt_wrapFunction2(jl_String_lastIndexOf), "$lastIndexOf", $rt_wrapFunction1(jl_String_lastIndexOf0),
    "$substring", $rt_wrapFunction2(jl_String_substring), "$substring0", $rt_wrapFunction1(jl_String_substring0), "$contains", $rt_wrapFunction1(jl_String_contains), "$toString", $rt_wrapFunction0(jl_String_toString), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode)],
    jl_NegativeArraySizeException, "NegativeArraySizeException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NegativeArraySizeException__init_0)],
    otjc_JSFinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otji_JSWrapper$_clinit_$lambda$_30_0, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$_clinit_$lambda$_30_0__init_0), "$accept", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_0_accept), "$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_0_accept$exported$0)],
    otji_JSWrapper$_clinit_$lambda$_30_1, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$_clinit_$lambda$_30_1__init_0), "$accept", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_1_accept), "$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_1_accept$exported$0)],
    ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_IncompatibleClassChangeError__init_0)],
    jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchMethodError__init_0)],
    jl_ArrayIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayIndexOutOfBoundsException__init_0)],
    ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_5", $rt_wrapFunction1(ju_AbstractList$1__init_0), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next)],
    oj_Assert, 0, jl_Object, [], 0, 3, 0, 0, 0,
    oj_ComparisonFailure, "ComparisonFailure", 4, jl_AssertionError, [], 0, 3, 0, 0, ["$_init_7", $rt_wrapFunction3(oj_ComparisonFailure__init_0), "$getMessage", $rt_wrapFunction0(oj_ComparisonFailure_getMessage)],
    jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_NullPointerException, "NullPointerException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NullPointerException__init_1), "$_init_", $rt_wrapFunction0(jl_NullPointerException__init_2)],
    jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_NoSuchFieldError__init_0)],
    ucits_DashboardPage_Binder, 0, jl_Object, [], 0, 3, 0, 0, 0,
    ucits_DashboardPage, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucits_DashboardPage__init_0)],
    otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otjc_JSWeakMap, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    ucits_DashboardPage_Factory, 0, jl_Object, [], 0, 3, 0, 0, 0,
    otjc_JSObjects, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
    otj_TestEntryPoint, 0, jl_Object, [], 4, 0, 0, 0, 0,
    uciti_NavigationImpl_Factory, 0, jl_Object, [], 0, 3, 0, 0, 0,
    ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, 0,
    ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, 0,
    jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_ArrayStoreException, "ArrayStoreException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
    ucits_HelloService, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucits_HelloService__init_0)],
    ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractSet__init_)],
    ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractMap__init_)],
    ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_", $rt_wrapFunction0(ju_HashMap__init_0), "$_init_2", $rt_wrapFunction1(ju_HashMap__init_2), "$_init_10", $rt_wrapFunction2(ju_HashMap__init_4)],
    otji_JSWrapper, "JSWrapper", 7, jl_Object, [], 4, 3, 0, otji_JSWrapper_$callClinit, ["$equals", $rt_wrapFunction1(otji_JSWrapper_equals), "$toString", $rt_wrapFunction0(otji_JSWrapper_toString)],
    otjc_JSMap, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_HashSet__init_0), "$_init_12", $rt_wrapFunction1(ju_HashSet__init_2)],
    otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0]);
    $rt_metadata([jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
    otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjc_JSFinalizationRegistry, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    jl_IllegalArgumentException, "IllegalArgumentException", 2, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_1), "$_init_0", $rt_wrapFunction1(jl_IllegalArgumentException__init_2)],
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
    $rt_stringPool(["Either src or dest is null", "Root element should be created", "Root element should be assigned to page", "Dashboard", "container", "null", "...", "[", "]", "Unknown Source", ")", "", " ", "expected null, but was:<", ">", "expected: ", " but was: ", "expected:<", "> but was:<", "<", "0", "uk.co.instanto.tearay.sample.TemplatedTest.testTemplatingBinding()V", "Invalid test name", "object", "function", "string", "number", "undefined", ": ", "\n", "\tat ", "Caused by: "]);
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