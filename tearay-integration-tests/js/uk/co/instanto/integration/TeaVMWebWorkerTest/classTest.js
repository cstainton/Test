"use strict";
(function(module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(exports);
    } else {
        module(typeof self !== 'undefined' ? self : this);
}
}(function($rt_exports) {
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    let clsName = "";
    if (cls.$meta.primitive) {
        clsName = cls.$meta.name;
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
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
},
$rt_cls = cls => jl_Class_getClass(cls),
$rt_objcls = () => jl_Object,
$rt_createcls = () => {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
},
$rt_createPrimitiveCls = (name, binaryName) => {
    let cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z"),
$rt_charcls = $rt_createPrimitiveCls("char", "C"),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B"),
$rt_shortcls = $rt_createPrimitiveCls("short", "S"),
$rt_intcls = $rt_createPrimitiveCls("int", "I"),
$rt_longcls = $rt_createPrimitiveCls("long", "J"),
$rt_floatcls = $rt_createPrimitiveCls("float", "F"),
$rt_doublecls = $rt_createPrimitiveCls("double", "D"),
$rt_voidcls = $rt_createPrimitiveCls("void", "V"),
$rt_numberConversionBuffer = new ArrayBuffer(16),
$rt_numberConversionView = new DataView($rt_numberConversionBuffer),
$rt_numberConversionFloatArray = new Float32Array($rt_numberConversionBuffer),
$rt_numberConversionDoubleArray = new Float64Array($rt_numberConversionBuffer),
$rt_numberConversionIntArray = new Int32Array($rt_numberConversionBuffer),
$rt_doubleToRawLongBits;
if (typeof BigInt !== 'function') {
    $rt_doubleToRawLongBits = n => {
        $rt_numberConversionView.setFloat64(0, n, true);
        return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
    };
} else if (typeof BigInt64Array !== 'function') {
    $rt_doubleToRawLongBits = n => {
        $rt_numberConversionView.setFloat64(0, n, true);
        let lo = $rt_numberConversionView.getInt32(0, true);
        let hi = $rt_numberConversionView.getInt32(4, true);
        return BigInt.asIntN(64, BigInt.asUintN(32, BigInt(lo)) | BigInt(hi) << BigInt(32));
    };
} else {
    let $rt_numberConversionLongArray = new BigInt64Array($rt_numberConversionBuffer);
    $rt_doubleToRawLongBits = n => {
        $rt_numberConversionDoubleArray[0] = n;
        return $rt_numberConversionLongArray[0];
    };
}
let $rt_floatToRawIntBits = n => {
    $rt_numberConversionFloatArray[0] = n;
    return $rt_numberConversionIntArray[0];
},
$rt_equalDoubles = (a, b) => {
    if (a !== a) {
        return b !== b;
    }
    $rt_numberConversionDoubleArray[0] = a;
    $rt_numberConversionDoubleArray[1] = b;
    return $rt_numberConversionIntArray[0] === $rt_numberConversionIntArray[2] && $rt_numberConversionIntArray[1] === $rt_numberConversionIntArray[3];
},
$rt_compare = (a, b) => a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
};
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = () => {
    return "long";
};
let Long_isPositive = a => (a.hi & 0x80000000) === 0,
Long_isNegative = a => (a.hi & 0x80000000) !== 0,
Long_MAX_NORMAL = 1 << 18,
Long_ZERO,
Long_create,
Long_fromInt,
Long_fromNumber,
Long_toNumber,
Long_lo,
Long_divRem;
if (typeof BigInt !== "function") {
    Long.prototype.toString = function() {
        let result = [];
        let n = this;
        let positive = Long_isPositive(n);
        if (!positive) {
            n = Long_neg(n);
        }
        let radix = new Long(10, 0);
        do  {
            let divRem = Long_divRem(n, radix);
            result.push(String.fromCharCode(48 + divRem[1].lo));
            n = divRem[0];
        }while (n.lo !== 0 || n.hi !== 0);
        result = (result.reverse()).join('');
        return positive ? result : "-" + result;
    };
    Long.prototype.valueOf = function() {
        return Long_toNumber(this);
    };
    Long_ZERO = new Long(0, 0);
    Long_fromInt = val => new Long(val,  -(val < 0) | 0);
    Long_fromNumber = val => val >= 0 ? new Long(val | 0, val / 0x100000000 | 0) : Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
    Long_create = (lo, hi) => new Long(lo, hi);
    Long_toNumber = val => 0x100000000 * val.hi + (val.lo >>> 0);
    Long_lo = val => val.lo;
} else {
    Long_ZERO = BigInt(0);
    Long_create = (lo, hi) => BigInt.asIntN(64, BigInt.asUintN(64, BigInt(lo)) | BigInt.asUintN(64, BigInt(hi) << BigInt(32)));
    Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0));
    Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val)));
    Long_toNumber = val => Number(val);
    Long_lo = val => Number(BigInt.asIntN(32, val)) | 0;
}
let Long_eq,
Long_ne,
Long_gt,
Long_ge,
Long_lt,
Long_le,
Long_compare,
Long_ucompare,
Long_add,
Long_sub,
Long_inc,
Long_mul,
Long_div,
Long_rem,
Long_udiv,
Long_urem,
Long_neg,
Long_and,
Long_or,
Long_xor,
Long_shl,
Long_shr,
Long_shru;
if (typeof BigInt !== 'function') {
    Long_eq = (a, b) => a.hi === b.hi && a.lo === b.lo;
    Long_ne = (a, b) => a.hi !== b.hi || a.lo !== b.lo;
    Long_gt = (a, b) => {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        let x = a.lo >>> 1;
        let y = b.lo >>> 1;
        if (x !== y) {
            return x > y;
        }
        return (a.lo & 1) > (b.lo & 1);
    };
    Long_ge = (a, b) => {
        if (a.hi < b.hi) {
            return false;
        }
        if (a.hi > b.hi) {
            return true;
        }
        let x = a.lo >>> 1;
        let y = b.lo >>> 1;
        if (x !== y) {
            return x >= y;
        }
        return (a.lo & 1) >= (b.lo & 1);
    };
    Long_lt = (a, b) => {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        let x = a.lo >>> 1;
        let y = b.lo >>> 1;
        if (x !== y) {
            return x < y;
        }
        return (a.lo & 1) < (b.lo & 1);
    };
    Long_le = (a, b) => {
        if (a.hi > b.hi) {
            return false;
        }
        if (a.hi < b.hi) {
            return true;
        }
        let x = a.lo >>> 1;
        let y = b.lo >>> 1;
        if (x !== y) {
            return x <= y;
        }
        return (a.lo & 1) <= (b.lo & 1);
    };
    Long_add = (a, b) => {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo + b.lo);
        } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
        }
        let a_lolo = a.lo & 0xFFFF;
        let a_lohi = a.lo >>> 16;
        let a_hilo = a.hi & 0xFFFF;
        let a_hihi = a.hi >>> 16;
        let b_lolo = b.lo & 0xFFFF;
        let b_lohi = b.lo >>> 16;
        let b_hilo = b.hi & 0xFFFF;
        let b_hihi = b.hi >>> 16;
        let lolo = a_lolo + b_lolo | 0;
        let lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
        let hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
        let hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_inc = a => {
        let lo = a.lo + 1 | 0;
        let hi = a.hi;
        if (lo === 0) {
            hi = hi + 1 | 0;
        }
        return new Long(lo, hi);
    };
    Long_neg = a => Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
    Long_sub = (a, b) => {
        if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
            return Long_fromNumber(a.lo - b.lo);
        }
        let a_lolo = a.lo & 0xFFFF;
        let a_lohi = a.lo >>> 16;
        let a_hilo = a.hi & 0xFFFF;
        let a_hihi = a.hi >>> 16;
        let b_lolo = b.lo & 0xFFFF;
        let b_lohi = b.lo >>> 16;
        let b_hilo = b.hi & 0xFFFF;
        let b_hihi = b.hi >>> 16;
        let lolo = a_lolo - b_lolo | 0;
        let lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
        let hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
        let hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
        return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
    };
    Long_compare = (a, b) => {
        let r = a.hi - b.hi;
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    };
    Long_ucompare = (a, b) => {
        let r = $rt_ucmp(a.hi, b.hi);
        if (r !== 0) {
            return r;
        }
        r = (a.lo >>> 1) - (b.lo >>> 1);
        if (r !== 0) {
            return r;
        }
        return (a.lo & 1) - (b.lo & 1);
    };
    Long_mul = (a, b) => {
        let positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        let a_lolo = a.lo & 0xFFFF;
        let a_lohi = a.lo >>> 16;
        let a_hilo = a.hi & 0xFFFF;
        let a_hihi = a.hi >>> 16;
        let b_lolo = b.lo & 0xFFFF;
        let b_lohi = b.lo >>> 16;
        let b_hilo = b.hi & 0xFFFF;
        let b_hihi = b.hi >>> 16;
        let lolo = 0;
        let lohi = 0;
        let hilo = 0;
        let hihi = 0;
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
        let result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
        return positive ? result : Long_neg(result);
    };
    Long_div = (a, b) => {
        if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_divRem(a, b))[0];
    };
    Long_udiv = (a, b) => {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[0];
    };
    Long_rem = (a, b) => {
        if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
        }
        return (Long_divRem(a, b))[1];
    };
    Long_urem = (a, b) => {
        if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
            return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
        }
        return (Long_udivRem(a, b))[1];
    };
    Long_divRem = (a, b) => {
        if (b.lo === 0 && b.hi === 0) {
            throw new Error("Division by zero");
        }
        let positive = Long_isNegative(a) === Long_isNegative(b);
        if (Long_isNegative(a)) {
            a = Long_neg(a);
        }
        if (Long_isNegative(b)) {
            b = Long_neg(b);
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        let q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
    };
    let Long_udivRem = (a, b) => {
        if (b.lo === 0 && b.hi === 0) {
            throw new Error("Division by zero");
        }
        a = new LongInt(a.lo, a.hi, 0);
        b = new LongInt(b.lo, b.hi, 0);
        let q = LongInt_div(a, b);
        a = new Long(a.lo, a.hi);
        q = new Long(q.lo, q.hi);
        return [q, a];
    };
    Long_and = (a, b) => new Long(a.lo & b.lo, a.hi & b.hi);
    Long_or = (a, b) => new Long(a.lo | b.lo, a.hi | b.hi);
    Long_xor = (a, b) => new Long(a.lo ^ b.lo, a.hi ^ b.hi);
    Long_shl = (a, b) => {
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
    Long_shr = (a, b) => {
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
    Long_shru = (a, b) => {
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
    function LongInt(lo, hi, sup) {
        this.lo = lo;
        this.hi = hi;
        this.sup = sup;
    }
    let LongInt_mul = (a, b) => {
        let a_lolo = (a.lo & 0xFFFF) * b | 0;
        let a_lohi = (a.lo >>> 16) * b | 0;
        let a_hilo = (a.hi & 0xFFFF) * b | 0;
        let a_hihi = (a.hi >>> 16) * b | 0;
        let sup = a.sup * b | 0;
        a_lohi = a_lohi + (a_lolo >>> 16) | 0;
        a_hilo = a_hilo + (a_lohi >>> 16) | 0;
        a_hihi = a_hihi + (a_hilo >>> 16) | 0;
        sup = sup + (a_hihi >>> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup & 0xFFFF;
    };
    let LongInt_sub = (a, b) => {
        let a_lolo = a.lo & 0xFFFF;
        let a_lohi = a.lo >>> 16;
        let a_hilo = a.hi & 0xFFFF;
        let a_hihi = a.hi >>> 16;
        let b_lolo = b.lo & 0xFFFF;
        let b_lohi = b.lo >>> 16;
        let b_hilo = b.hi & 0xFFFF;
        let b_hihi = b.hi >>> 16;
        a_lolo = a_lolo - b_lolo | 0;
        a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
        let sup = a.sup - b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    };
    let LongInt_add = (a, b) => {
        let a_lolo = a.lo & 0xFFFF;
        let a_lohi = a.lo >>> 16;
        let a_hilo = a.hi & 0xFFFF;
        let a_hihi = a.hi >>> 16;
        let b_lolo = b.lo & 0xFFFF;
        let b_lohi = b.lo >>> 16;
        let b_hilo = b.hi & 0xFFFF;
        let b_hihi = b.hi >>> 16;
        a_lolo = a_lolo + b_lolo | 0;
        a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
        a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
        a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
        let sup = a.sup + b.sup + (a_hihi >> 16) | 0;
        a.lo = a_lolo & 0xFFFF | a_lohi << 16;
        a.hi = a_hilo & 0xFFFF | a_hihi << 16;
        a.sup = sup;
    };
    let LongInt_ucompare = (a, b) => {
        let r = a.sup - b.sup;
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
    };
    let LongInt_numOfLeadingZeroBits = a => {
        let n = 0;
        let d = 16;
        while (d > 0) {
            if (a >>> d !== 0) {
                a >>>= d;
                n = n + d | 0;
            }
            d = d / 2 | 0;
        }
        return 31 - n;
    };
    let LongInt_shl = (a, b) => {
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
    };
    let LongInt_shr = (a, b) => {
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
    };
    let LongInt_copy = a => new LongInt(a.lo, a.hi, a.sup);
    let LongInt_div = (a, b) => {
        let bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
        let sz = 1 + (bits / 16 | 0);
        let dividentBits = bits % 16;
        LongInt_shl(b, bits);
        LongInt_shl(a, dividentBits);
        let q = new LongInt(0, 0, 0);
        while (sz-- > 0) {
            LongInt_shl(q, 16);
            let digitA = (a.hi >>> 16) + 0x10000 * a.sup;
            let digitB = b.hi >>> 16;
            let digit = digitA / digitB | 0;
            let t = LongInt_copy(b);
            LongInt_mul(t, digit);
            if (LongInt_ucompare(t, a) >= 0) {
                while (LongInt_ucompare(t, a) > 0) {
                    LongInt_sub(t, b);
                     --digit;
                }
            } else {
                while (true) {
                    let nextT = LongInt_copy(t);
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
    };
} else {
    Long_eq = (a, b) => a === b;
    Long_ne = (a, b) => a !== b;
    Long_gt = (a, b) => a > b;
    Long_ge = (a, b) => a >= b;
    Long_lt = (a, b) => a < b;
    Long_le = (a, b) => a <= b;
    Long_add = (a, b) => BigInt.asIntN(64, a + b);
    Long_inc = a => BigInt.asIntN(64, a + 1);
    Long_neg = a => BigInt.asIntN(64,  -a);
    Long_sub = (a, b) => BigInt.asIntN(64, a - b);
    Long_compare = (a, b) => a < b ?  -1 : a > b ? 1 : 0;
    Long_ucompare = (a, b) => {
        a = BigInt.asUintN(64, a);
        b = BigInt.asUintN(64, b);
        return a < b ?  -1 : a > b ? 1 : 0;
    };
    Long_mul = (a, b) => BigInt.asIntN(64, a * b);
    Long_div = (a, b) => BigInt.asIntN(64, a / b);
    Long_udiv = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) / BigInt.asUintN(64, b));
    Long_rem = (a, b) => BigInt.asIntN(64, a % b);
    Long_urem = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) % BigInt.asUintN(64, b));
    Long_and = (a, b) => BigInt.asIntN(64, a & b);
    Long_or = (a, b) => BigInt.asIntN(64, a | b);
    Long_xor = (a, b) => BigInt.asIntN(64, a ^ b);
    Long_shl = (a, b) => BigInt.asIntN(64, a << BigInt(b & 63));
    Long_shr = (a, b) => BigInt.asIntN(64, a >> BigInt(b & 63));
    Long_shru = (a, b) => BigInt.asIntN(64, BigInt.asUintN(64, a) >> BigInt(b & 63));
}
let $rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_wrapArray = (cls, data) => new ($rt_arraycls(cls))(data),
$rt_createLongArray,
$rt_createLongArrayFromData;
if (typeof BigInt64Array !== 'function') {
    $rt_createLongArray = sz => {
        let data = new Array(sz);
        let arr = new $rt_longArrayCls(data);
        data.fill(Long_ZERO);
        return arr;
    };
    $rt_createLongArrayFromData = init => new $rt_longArrayCls(init);
} else {
    $rt_createLongArray = sz => new $rt_longArrayCls(new BigInt64Array(sz));
    $rt_createLongArrayFromData = data => {
        let buffer = new BigInt64Array(data.length);
        buffer.set(data);
        return new $rt_longArrayCls(buffer);
    };
}
let $rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createCharArrayFromData = data => {
    let buffer = new Uint16Array(data.length);
    buffer.set(data);
    return new $rt_charArrayCls(buffer);
},
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createShortArrayFromData = data => {
    let buffer = new Int16Array(data.length);
    buffer.set(data);
    return new $rt_shortArrayCls(buffer);
},
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createFloatArray = sz => new $rt_floatArrayCls(new Float32Array(sz)),
$rt_createDoubleArray = sz => new $rt_doubleArrayCls(new Float64Array(sz)),
$rt_arraycls = cls => {
    let result = cls.$array;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone0 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls.$meta.binaryName;
        JavaArray.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        JavaArray.classObject = null;
        JavaArray.$array = null;
        result = JavaArray;
        cls.$array = JavaArray;
    }
    return result;
},
$rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_fullArrayToString = array => $rt_charArrayToString(array, 0, array.length),
$rt_fastStringToCharArray = string => {
    let array = new Uint16Array(string.length);
    for (let i = 0;i < array.length;++i) {
        array[i] = string.charCodeAt(i);
    }
    return new $rt_charArrayCls(array);
},
$rt_str = str => str === null ? null : jl_String__init_0(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => jl_String_$callClinit(),
$rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from.$meta.assignableCache;
    if (typeof map === 'undefined') {
        map = new Map();
        from.$meta.assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to.$meta.item !== null) {
        let result = from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        map.set(to, result);
        return result;
    }
    let supertypes = from.$meta.supertypes;
    for (let i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_castToInterface = (obj, cls) => {
    if (obj !== null && !$rt_isInstance(obj, cls)) {
        $rt_throwCCE();
    }
    return obj;
},
$rt_castToClass = (obj, cls) => {
    if (obj !== null && !(obj instanceof cls)) {
        $rt_throwCCE();
    }
    return obj;
},
$rt_instanceOfOrNull = (obj, cls) => obj === null || obj instanceof cls,
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    let err = ex.$jsException;
    if (!err) {
        let javaCause = $rt_throwableCause(ex);
        let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
        let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
        err = new JavaError("Java exception thrown", cause);
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
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
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
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
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_1(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => jl_StackTraceElement,
$rt_throwAIOOBE = () => $rt_throw(jl_ArrayIndexOutOfBoundsException__init_1()),
$rt_throwCCE = () => $rt_throw(jl_ClassCastException__init_()),
$rt_throwCCEIfFalse = (value, o) => {
    if (!value) {
        $rt_throwCCE();
    }
    return o;
},
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return jl_StackTraceElement__init_0(className, methodName, fileName, lineNumber);
    }
},
$rt_setStack = (e, stack) => {
    {
        jl_Throwable_setStackTrace(e, stack);
    }
},
$rt_checkBounds = (index, array) => {
    if (index < 0 || index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
},
$rt_checkUpperBound = (index, array) => {
    if (index >= array.length) {
        $rt_throwAIOOBE();
    }
    return index;
},
$rt_checkLowerBound = index => {
    if (index < 0) {
        $rt_throwAIOOBE();
    }
    return index;
},
$rt_nullCheck = val => {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_0());
    }
    return val;
},
$rt_createOutputFunction = outputFunction => {
    let buffer = "";
    return msg => {
        let index = 0;
        while (true) {
            let next = msg.indexOf('\n', index);
            if (next < 0) {
                break;
            }
            outputFunction(buffer + msg.substring(index, next));
            buffer = "";
            index = next + 1;
        }
        buffer += msg.substring(index);
    };
},
$rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.info(msg)) : () => {
},
$rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof console === "object" ? $rt_createOutputFunction(msg => console.error(msg)) : () => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        cls.$meta = {  };
        let m = cls.$meta;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        let flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        let innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
},
$rt_startThread = (runner, callback) => {
    let result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
};
function jl_Object() {
    this.$id$ = 0;
}
let jl_Object__init_ = $this => {
    return;
},
jl_Object__init_0 = () => {
    let var_0 = new jl_Object();
    jl_Object__init_(var_0);
    return var_0;
},
jl_Object_getClass = $this => {
    return jl_Class_getClass($this.constructor);
},
jl_Object_hashCode = $this => {
    return jl_Object_identity($this);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = $rt_nullCheck(jl_Object_getClass($this)).$getName();
    var$2 = jl_Integer_toHexString(jl_Object_identity($this));
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append(var$3, var$1)), 64)), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let var$1, $result, var$3;
    if (!$rt_isInstance($this, jl_Cloneable)) {
        var$1 = $this;
        if (var$1.constructor.$meta.item === null)
            $rt_throw(jl_CloneNotSupportedException__init_0());
    }
    $result = otp_Platform_clone($this);
    var$1 = $result;
    var$3 = $rt_nextId();
    var$1.$id$ = var$3;
    return $result;
},
ucitrcc_Codec = $rt_classWithoutFields(0),
uciisd_OrganizationCodec = $rt_classWithoutFields(),
uciisd_OrganizationCodec__init_ = $this => {
    jl_Object__init_($this);
},
uciisd_OrganizationCodec__init_0 = () => {
    let var_0 = new uciisd_OrganizationCodec();
    uciisd_OrganizationCodec__init_(var_0);
    return var_0;
},
uciisd_OrganizationCodec_toWire = ($this, $pojo) => {
    let var$2, var$3;
    if ($pojo === null)
        return null;
    var$2 = uciisdp_Organization$Builder__init_0();
    var$2 = uciisdp_Organization$Builder_name(var$2, $pojo.$getName());
    var$3 = uciisd_DepartmentCodec__init_0();
    var$3 = var$3.$toWire($pojo.$getPrimaryDepartment());
    var$2 = uciisdp_Organization$Builder_primaryDepartment($rt_nullCheck(var$2), var$3);
    var$2 = uciisdp_Organization$Builder_build($rt_nullCheck(var$2));
    return var$2;
},
uciisd_OrganizationCodec_getWireAdapter = $this => {
    uciisdp_Organization_$callClinit();
    return uciisdp_Organization_ADAPTER;
},
uciisd_OrganizationCodec_toWire0 = ($this, var$1) => {
    return $this.$toWire0($rt_castToClass(var$1, uciisd_Organization));
},
kjim_KMappedMarker = $rt_classWithoutFields(0),
kjim_KMutableIterable = $rt_classWithoutFields(0),
kjim_KMutableCollection = $rt_classWithoutFields(0),
kjim_KMutableList = $rt_classWithoutFields(0);
function jnci_BufferedEncoder$Controller() {
    let a = this; jl_Object.call(a);
    a.$in0 = null;
    a.$out0 = null;
    a.$inPosition = 0;
    a.$outPosition0 = 0;
}
let jnci_BufferedEncoder$Controller__init_ = ($this, $in, $out) => {
    jl_Object__init_($this);
    $this.$in0 = $in;
    $this.$out0 = $out;
},
jnci_BufferedEncoder$Controller__init_0 = (var_0, var_1) => {
    let var_2 = new jnci_BufferedEncoder$Controller();
    jnci_BufferedEncoder$Controller__init_(var_2, var_0, var_1);
    return var_2;
},
jnci_BufferedEncoder$Controller_hasMoreInput = $this => {
    return jn_Buffer_hasRemaining($rt_nullCheck($this.$in0));
},
jnci_BufferedEncoder$Controller_hasMoreInput0 = ($this, $sz) => {
    return jn_Buffer_remaining($rt_nullCheck($this.$in0)) < $sz ? 0 : 1;
},
jnci_BufferedEncoder$Controller_hasMoreOutput0 = $this => {
    return jn_Buffer_hasRemaining($rt_nullCheck($this.$out0));
},
jnci_BufferedEncoder$Controller_hasMoreOutput = ($this, $sz) => {
    return jn_Buffer_remaining($rt_nullCheck($this.$out0)) < $sz ? 0 : 1;
},
jnci_BufferedEncoder$Controller_setInPosition = ($this, $inPosition) => {
    $this.$inPosition = $inPosition;
},
jnci_BufferedEncoder$Controller_setOutPosition = ($this, $outPosition) => {
    $this.$outPosition0 = $outPosition;
},
ji_Serializable = $rt_classWithoutFields(0),
jl_Number = $rt_classWithoutFields(),
jl_Number__init_ = $this => {
    jl_Object__init_($this);
},
jl_Comparable = $rt_classWithoutFields(0);
function jl_Integer() {
    jl_Number.call(this);
    this.$value2 = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer_$callClinit = () => {
    jl_Integer_$callClinit = $rt_eraseClinit(jl_Integer);
    jl_Integer__clinit_();
},
jl_Integer__init_ = ($this, $value) => {
    jl_Integer_$callClinit();
    jl_Number__init_($this);
    $this.$value2 = $value;
},
jl_Integer__init_0 = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_(var_1, var_0);
    return var_1;
},
jl_Integer_toString = ($i, $radix) => {
    jl_Integer_$callClinit();
    if (!($radix >= 2 && $radix <= 36))
        $radix = 10;
    return $rt_nullCheck((jl_AbstractStringBuilder__init_1(20)).$append1($i, $radix)).$toString();
},
jl_Integer_toHexString = $i => {
    jl_Integer_$callClinit();
    return otci_IntegerUtil_toUnsignedLogRadixString($i, 4);
},
jl_Integer_toString0 = $i => {
    jl_Integer_$callClinit();
    return jl_Integer_toString($i, 10);
},
jl_Integer_valueOf = $i => {
    let var$2, var$3;
    jl_Integer_$callClinit();
    if ($i >= (-128) && $i <= 127) {
        jl_Integer_ensureIntegerCache();
        var$2 = jl_Integer_integerCache;
        var$3 = $i + 128 | 0;
        var$2 = $rt_nullCheck(var$2).data;
        return var$2[$rt_checkBounds(var$3, var$2)];
    }
    return jl_Integer__init_0($i);
},
jl_Integer_ensureIntegerCache = () => {
    let $j, var$2, var$3;
    jl_Integer_$callClinit();
    a: {
        if (jl_Integer_integerCache === null) {
            jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
            $j = 0;
            while (true) {
                if ($j >= $rt_nullCheck(jl_Integer_integerCache).data.length)
                    break a;
                var$2 = jl_Integer_integerCache;
                var$3 = jl_Integer__init_0($j - 128 | 0);
                var$2 = $rt_nullCheck(var$2).data;
                $j = $rt_checkBounds($j, var$2);
                var$2[$j] = var$3;
                $j = $j + 1 | 0;
            }
        }
    }
},
jl_Integer_intValue = $this => {
    return $this.$value2;
},
jl_Integer_longValue = $this => {
    return Long_fromInt($this.$value2);
},
jl_Integer_floatValue = $this => {
    return $this.$value2;
},
jl_Integer_doubleValue = $this => {
    return $this.$value2;
},
jl_Integer_toString1 = $this => {
    return jl_Integer_toString0($this.$value2);
},
jl_Integer_equals = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $rt_nullCheck($rt_castToClass($other, jl_Integer)).$value2 == $this.$value2 ? 1 : 0;
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3, var$4;
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
},
jl_Integer_highestOneBit = $i => {
    jl_Integer_$callClinit();
    return $i & ((-2147483648) >>> jl_Integer_numberOfLeadingZeros($i) | 0);
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function uciisd_MyData() {
    let a = this; jl_Object.call(a);
    a.$id2 = null;
    a.$content2 = null;
    a.$value13 = 0;
}
let uciisd_MyData__init_0 = $this => {
    jl_Object__init_($this);
},
uciisd_MyData__init_ = () => {
    let var_0 = new uciisd_MyData();
    uciisd_MyData__init_0(var_0);
    return var_0;
},
uciisd_MyData_getId = $this => {
    return $this.$id2;
},
uciisd_MyData_setId = ($this, $id) => {
    $this.$id2 = $id;
},
uciisd_MyData_getContent = $this => {
    return $this.$content2;
},
uciisd_MyData_setContent = ($this, $content) => {
    $this.$content2 = $content;
},
uciisd_MyData_getValue = $this => {
    return $this.$value13;
},
uciisd_MyData_setValue = ($this, $value) => {
    $this.$value13 = $value;
},
kr_KAnnotatedElement = $rt_classWithoutFields(0),
jl_AbstractStringBuilder$Constants = $rt_classWithoutFields(),
jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null,
jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null,
jl_AbstractStringBuilder$Constants_floatAnalysisResult = null,
jl_AbstractStringBuilder$Constants_$callClinit = () => {
    jl_AbstractStringBuilder$Constants_$callClinit = $rt_eraseClinit(jl_AbstractStringBuilder$Constants);
    jl_AbstractStringBuilder$Constants__clinit_();
},
jl_AbstractStringBuilder$Constants__clinit_ = () => {
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = $rt_createLongArrayFromData([Long_fromInt(1), Long_fromInt(10), Long_fromInt(100), Long_fromInt(10000), Long_fromInt(100000000), Long_create(1874919424, 2328306)]);
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = otcit_DoubleAnalyzer$Result__init_();
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = otcit_FloatAnalyzer$Result__init_0();
};
function jnc_CharsetEncoder() {
    let a = this; jl_Object.call(a);
    a.$charset = null;
    a.$replacement0 = null;
    a.$averageBytesPerChar = 0.0;
    a.$maxBytesPerChar = 0.0;
    a.$malformedAction0 = null;
    a.$unmappableAction0 = null;
    a.$status = 0;
}
let jnc_CharsetEncoder__init_0 = ($this, $cs, $averageBytesPerChar, $maxBytesPerChar, $replacement) => {
    jl_Object__init_($this);
    jnc_CodingErrorAction_$callClinit();
    $this.$malformedAction0 = jnc_CodingErrorAction_REPORT;
    $this.$unmappableAction0 = jnc_CodingErrorAction_REPORT;
    jnc_CharsetEncoder_checkReplacement($this, $replacement);
    $this.$charset = $cs;
    $replacement = $rt_nullCheck($replacement);
    $this.$replacement0 = $rt_castToInterface($replacement.$clone0(), $rt_arraycls($rt_bytecls));
    $this.$averageBytesPerChar = $averageBytesPerChar;
    $this.$maxBytesPerChar = $maxBytesPerChar;
},
jnc_CharsetEncoder__init_ = ($this, $cs, $averageBytesPerChar, $maxBytesPerChar) => {
    let var$4;
    var$4 = $rt_createByteArray(1);
    var$4.data[0] = 63;
    jnc_CharsetEncoder__init_0($this, $cs, $averageBytesPerChar, $maxBytesPerChar, var$4);
},
jnc_CharsetEncoder_checkReplacement = ($this, $replacement) => {
    let var$2;
    if ($replacement !== null) {
        var$2 = $replacement.data.length;
        if (var$2 && var$2 >= $this.$maxBytesPerChar)
            return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(0)));
},
jnc_CharsetEncoder_onMalformedInput = ($this, $newAction) => {
    if ($newAction !== null) {
        $this.$malformedAction0 = $newAction;
        $this.$implOnMalformedInput($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(1)));
},
jnc_CharsetEncoder_implOnMalformedInput = ($this, $newAction) => {
    return;
},
jnc_CharsetEncoder_onUnmappableCharacter = ($this, $newAction) => {
    if ($newAction !== null) {
        $this.$unmappableAction0 = $newAction;
        $this.$implOnUnmappableCharacter($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(1)));
},
jnc_CharsetEncoder_implOnUnmappableCharacter = ($this, $newAction) => {
    return;
},
jnc_CharsetEncoder_encode = ($this, $in, $out, $endOfInput) => {
    let $result, $e, $remaining, var$7, $action, $$je;
    a: {
        if ($this.$status != 3) {
            if ($endOfInput)
                break a;
            if ($this.$status != 2)
                break a;
        }
        $rt_throw(jl_IllegalStateException__init_0());
    }
    $this.$status = !$endOfInput ? 1 : 2;
    while (true) {
        try {
            $result = $this.$encodeLoop($in, $out);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_RuntimeException) {
                $e = $$je;
                $rt_throw(jnc_CoderMalfunctionError__init_0($e));
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
        $action = !var$7.$isUnmappable() ? $this.$malformedAction0 : $this.$unmappableAction0;
        jnc_CodingErrorAction_$callClinit();
        if ($action === jnc_CodingErrorAction_REPLACE) {
            $out = $rt_nullCheck($out);
            if (jn_Buffer_remaining($out) < $rt_nullCheck($this.$replacement0).data.length)
                return jnc_CoderResult_OVERFLOW;
            jn_ByteBuffer_put($out, $this.$replacement0);
        } else if ($action !== jnc_CodingErrorAction_IGNORE)
            break;
        $in = $rt_nullCheck($in);
        $in.$position(jn_Buffer_position($in) + var$7.$length() | 0);
    }
    return var$7;
},
jnc_CharsetEncoder_encode0 = ($this, $in) => {
    let $output, $result, var$4;
    $in = $rt_nullCheck($in);
    if (!jn_Buffer_remaining($in))
        return jn_ByteBuffer_allocate(0);
    jnc_CharsetEncoder_reset($this);
    $output = jn_ByteBuffer_allocate(jn_Buffer_remaining($in) * $this.$averageBytesPerChar | 0);
    while (true) {
        $result = jnc_CharsetEncoder_encode($this, $in, $output, 0);
        jnc_CoderResult_$callClinit();
        if ($result === jnc_CoderResult_UNDERFLOW)
            break;
        if ($result === jnc_CoderResult_OVERFLOW) {
            $output = jnc_CharsetEncoder_allocateMore($this, $output);
            continue;
        }
        $result = $rt_nullCheck($result);
        if (!$result.$isError())
            continue;
        $result.$throwException();
    }
    var$4 = jnc_CharsetEncoder_encode($this, $in, $output, 1);
    var$4 = $rt_nullCheck(var$4);
    if (var$4.$isError())
        var$4.$throwException();
    while (true) {
        var$4 = jnc_CharsetEncoder_flush($this, $output);
        var$4 = $rt_nullCheck(var$4);
        if (var$4.$isUnderflow())
            break;
        if (!var$4.$isOverflow())
            continue;
        $output = jnc_CharsetEncoder_allocateMore($this, $output);
    }
    var$4 = $rt_nullCheck($output);
    jn_ByteBuffer_flip(var$4);
    return var$4;
},
jnc_CharsetEncoder_allocateMore = ($this, $buffer) => {
    let $array, var$3, $result, var$5;
    $buffer = $rt_nullCheck($buffer);
    $array = jn_ByteBuffer_array($buffer);
    $array = $rt_nullCheck($array);
    var$3 = ju_Arrays_copyOf($array, $array.data.length * 2 | 0);
    $result = jn_ByteBuffer_wrap0(var$3);
    var$5 = jn_Buffer_position($buffer);
    $result = $rt_nullCheck($result);
    $result.$position1(var$5);
    return $result;
},
jnc_CharsetEncoder_flush = ($this, $out) => {
    let $result;
    if ($this.$status != 2 && $this.$status != 4)
        $rt_throw(jl_IllegalStateException__init_0());
    $result = $this.$implFlush($out);
    jnc_CoderResult_$callClinit();
    if ($result === jnc_CoderResult_UNDERFLOW)
        $this.$status = 3;
    return $result;
},
jnc_CharsetEncoder_implFlush = ($this, $out) => {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult_UNDERFLOW;
},
jnc_CharsetEncoder_reset = $this => {
    $this.$status = 0;
    $this.$implReset();
    return $this;
},
jnc_CharsetEncoder_implReset = $this => {
    return;
};
function jnci_BufferedEncoder() {
    let a = this; jnc_CharsetEncoder.call(a);
    a.$inArray0 = null;
    a.$outArray0 = null;
}
let jnci_BufferedEncoder__init_ = ($this, $cs, $averageBytesPerChar, $maxBytesPerChar) => {
    jnc_CharsetEncoder__init_($this, $cs, $averageBytesPerChar, $maxBytesPerChar);
    $this.$inArray0 = $rt_createCharArray(512);
    $this.$outArray0 = $rt_createByteArray(512);
},
jnci_BufferedEncoder_encodeLoop = ($this, $in, $out) => {
    let $inArray, $inPos, $inSize, $outArray, $i, var$8, var$9, var$10, $result, $outPos, $outSize, $controller;
    $inArray = $this.$inArray0;
    $inPos = 0;
    $inSize = 0;
    $outArray = $this.$outArray0;
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
                    $in.$get($inArray, var$8, $inSize - var$8 | 0);
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
            $controller = jnci_BufferedEncoder$Controller__init_0($in, $out);
            $result = $this.$arrayEncode($inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller);
            $inPos = $controller.$inPosition;
            var$8 = $controller.$outPosition0;
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
    $in.$position(jn_Buffer_position($in) - ($inSize - $inPos | 0) | 0);
    return $result;
};
function jnci_UTF16Encoder() {
    let a = this; jnci_BufferedEncoder.call(a);
    a.$bom0 = 0;
    a.$littleEndian1 = 0;
}
let jnci_UTF16Encoder__init_ = ($this, $cs, $bom, $littleEndian) => {
    jnci_BufferedEncoder__init_($this, $cs, 2.0, 4.0);
    $this.$bom0 = $bom;
    $this.$littleEndian1 = $littleEndian;
},
jnci_UTF16Encoder__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jnci_UTF16Encoder();
    jnci_UTF16Encoder__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jnci_UTF16Encoder_arrayEncode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let var$8, var$9, var$10;
    if ($this.$bom0) {
        if (($outPos + 2 | 0) > $outSize) {
            $controller = $rt_nullCheck($controller);
            if ($controller.$hasMoreOutput())
                var$8 = null;
            else {
                jnc_CoderResult_$callClinit();
                var$8 = jnc_CoderResult_OVERFLOW;
            }
            return var$8;
        }
        $this.$bom0 = 0;
        if (!$this.$littleEndian1) {
            var$9 = $outPos + 1 | 0;
            $outArray = $rt_nullCheck($outArray);
            var$10 = $outArray.data;
            $outPos = $rt_checkBounds($outPos, var$10);
            var$10[$outPos] = (-2);
            $outPos = var$9 + 1 | 0;
            var$10[$rt_checkBounds(var$9, var$10)] = (-1);
        } else {
            var$9 = $outPos + 1 | 0;
            $outArray = $rt_nullCheck($outArray);
            var$10 = $outArray.data;
            $outPos = $rt_checkBounds($outPos, var$10);
            var$10[$outPos] = (-1);
            $outPos = var$9 + 1 | 0;
            var$10[$rt_checkBounds(var$9, var$10)] = (-2);
        }
    }
    return !$this.$littleEndian1 ? jnci_UTF16Encoder_arrayEncodeBE($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) : jnci_UTF16Encoder_arrayEncodeLE($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller);
},
jnci_UTF16Encoder_arrayEncodeLE = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $c, var$12, var$13, $next, var$15;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize)
                break a;
            var$9 = $inPos + 1 | 0;
            $inArray = $rt_nullCheck($inArray);
            var$10 = $inArray.data;
            $c = var$10[$rt_checkBounds($inPos, var$10)];
            if (!jl_Character_isHighSurrogate($c)) {
                if (jl_Character_isLowSurrogate($c)) {
                    $inPos = var$9 + (-1) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 2 | 0) > $outSize) {
                    $inPos = var$9 + (-1) | 0;
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreOutput0(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$12 = $outPos + 1 | 0;
                var$13 = ($c & 255) << 24 >> 24;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = var$13;
                $outPos = var$12 + 1 | 0;
                var$10[$rt_checkBounds(var$12, var$10)] = $c >> 8 << 24 >> 24;
                $inPos = var$9;
            } else {
                if (var$9 == $inSize) {
                    $inPos = var$9 + (-1) | 0;
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreInput(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                $inPos = var$9 + 1 | 0;
                $next = var$10[$rt_checkBounds(var$9, var$10)];
                if (!jl_Character_isLowSurrogate($next)) {
                    $inPos = $inPos + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 4 | 0) > $outSize) {
                    $inPos = $inPos + (-2) | 0;
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreOutput0(4))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$13 = $outPos + 1 | 0;
                var$15 = ($c & 255) << 24 >> 24;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = var$15;
                var$15 = var$13 + 1 | 0;
                var$10[$rt_checkBounds(var$13, var$10)] = $c >> 8 << 24 >> 24;
                var$9 = var$15 + 1 | 0;
                var$10[$rt_checkBounds(var$15, var$10)] = ($next & 255) << 24 >> 24;
                $outPos = var$9 + 1 | 0;
                var$10[$rt_checkBounds(var$9, var$10)] = $next >> 8 << 24 >> 24;
            }
        }
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
},
jnci_UTF16Encoder_arrayEncodeBE = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $c, var$12, var$13, $next, var$15;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize)
                break a;
            var$9 = $inPos + 1 | 0;
            $inArray = $rt_nullCheck($inArray);
            var$10 = $inArray.data;
            $c = var$10[$rt_checkBounds($inPos, var$10)];
            if (!jl_Character_isHighSurrogate($c)) {
                if (jl_Character_isLowSurrogate($c)) {
                    $inPos = var$9 + (-1) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 2 | 0) > $outSize) {
                    $inPos = var$9 + (-1) | 0;
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreOutput0(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$12 = $outPos + 1 | 0;
                var$13 = $c >> 8 << 24 >> 24;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = var$13;
                $outPos = var$12 + 1 | 0;
                var$10[$rt_checkBounds(var$12, var$10)] = ($c & 255) << 24 >> 24;
                $inPos = var$9;
            } else {
                if (var$9 == $inSize) {
                    $inPos = var$9 + (-1) | 0;
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreInput(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                $inPos = var$9 + 1 | 0;
                $next = var$10[$rt_checkBounds(var$9, var$10)];
                if (!jl_Character_isLowSurrogate($next)) {
                    $inPos = $inPos + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                if (($outPos + 4 | 0) > $outSize) {
                    $inPos = $inPos + (-2) | 0;
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreOutput0(4))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$13 = $outPos + 1 | 0;
                var$15 = $c >> 8 << 24 >> 24;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = var$15;
                var$15 = var$13 + 1 | 0;
                var$10[$rt_checkBounds(var$13, var$10)] = ($c & 255) << 24 >> 24;
                var$9 = var$15 + 1 | 0;
                var$10[$rt_checkBounds(var$15, var$10)] = $next >> 8 << 24 >> 24;
                $outPos = var$9 + 1 | 0;
                var$10[$rt_checkBounds(var$9, var$10)] = ($next & 255) << 24 >> 24;
            }
        }
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
},
juf_Supplier = $rt_classWithoutFields(0),
jus_Collectors$toList$lambda$_2_0 = $rt_classWithoutFields(),
jus_Collectors$toList$lambda$_2_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jus_Collectors$toList$lambda$_2_0__init_0 = () => {
    let var_0 = new jus_Collectors$toList$lambda$_2_0();
    jus_Collectors$toList$lambda$_2_0__init_(var_0);
    return var_0;
},
jl_Runnable = $rt_classWithoutFields(0);
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$id3 = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name12 = null;
    a.$alive = 0;
    a.$target = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_$callClinit = () => {
    jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
    jl_Thread__clinit_();
},
jl_Thread__init_0 = ($this, $name) => {
    jl_Thread_$callClinit();
    jl_Thread__init_($this, null, $name);
},
jl_Thread__init_1 = var_0 => {
    let var_1 = new jl_Thread();
    jl_Thread__init_0(var_1, var_0);
    return var_1;
},
jl_Thread__init_ = ($this, $target, $name) => {
    let var$3;
    jl_Thread_$callClinit();
    jl_Object__init_($this);
    $this.$finishedLock = jl_Object__init_0();
    $this.$alive = 1;
    $this.$name12 = $name;
    $this.$target = $target;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    $this.$id3 = Long_fromInt(var$3);
},
jl_Thread__init_2 = (var_0, var_1) => {
    let var_2 = new jl_Thread();
    jl_Thread__init_(var_2, var_0, var_1);
    return var_2;
},
jl_Thread_setCurrentThread = $thread_0 => {
    let var$2, var$3;
    jl_Thread_$callClinit();
    if (jl_Thread_currentThread !== $thread_0)
        jl_Thread_currentThread = $thread_0;
    var$2 = jl_Thread_currentThread;
    var$3 = jl_System_currentTimeMillis();
    $rt_nullCheck(var$2).$timeSliceStart = var$3;
},
jl_Thread_currentThread0 = () => {
    jl_Thread_$callClinit();
    return jl_Thread_currentThread;
},
jl_Thread_getId = $this => {
    return $this.$id3;
},
jl_Thread_getStackTrace = $this => {
    return $rt_createArray(jl_StackTraceElement, 0);
},
jl_Thread__clinit_ = () => {
    jl_Thread_mainThread = jl_Thread__init_1($rt_s(2));
    jl_Thread_currentThread = jl_Thread_mainThread;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = jl_DefaultUncaughtExceptionHandler__init_0();
},
kr_KCallable = $rt_classWithoutFields(0),
k_Function = $rt_classWithoutFields(0),
kr_KFunction = $rt_classWithoutFields(0),
otj_TestEntryPoint$Launcher = $rt_classWithoutFields(0),
otj_TestEntryPoint$LauncherImpl1 = $rt_classWithoutFields(),
otj_TestEntryPoint$LauncherImpl1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otj_TestEntryPoint$LauncherImpl1__init_0 = () => {
    let var_0 = new otj_TestEntryPoint$LauncherImpl1();
    otj_TestEntryPoint$LauncherImpl1__init_(var_0);
    return var_0;
},
otj_TestEntryPoint$LauncherImpl1_launch = (var$0, var$1) => {
    ucii_TeaVMWebWorkerTest_testCodecEncodingDecoding($rt_nullCheck($rt_castToClass(var$1, ucii_TeaVMWebWorkerTest)));
},
otj_TestEntryPoint$LauncherImpl0 = $rt_classWithoutFields(),
otj_TestEntryPoint$LauncherImpl0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otj_TestEntryPoint$LauncherImpl0__init_0 = () => {
    let var_0 = new otj_TestEntryPoint$LauncherImpl0();
    otj_TestEntryPoint$LauncherImpl0__init_(var_0);
    return var_0;
},
otj_TestEntryPoint$LauncherImpl0_launch = (var$0, var$1) => {
    ucii_TeaVMWebWorkerTest_testWorkerRpcSerialization($rt_nullCheck($rt_castToClass(var$1, ucii_TeaVMWebWorkerTest)));
},
kt_CharsKt__CharJVMKt = $rt_classWithoutFields();
function csw_Message$Builder() {
    let a = this; jl_Object.call(a);
    a.$unknownFieldsByteString = null;
    a.$unknownFieldsBuffer = null;
    a.$unknownFieldsWriter = null;
}
let csw_Message$Builder__init_ = $this => {
    jl_Object__init_($this);
    o_ByteString_$callClinit();
    $this.$unknownFieldsByteString = o_ByteString_EMPTY;
},
csw_Message$Builder_addUnknownFields = ($this, $unknownFields) => {
    let $$this$addUnknownFields_u24lambda_u240, var$3;
    kji_Intrinsics_checkNotNullParameter($unknownFields, $rt_s(3));
    $$this$addUnknownFields_u24lambda_u240 = $rt_castToClass($this, csw_Message$Builder);
    $unknownFields = $rt_nullCheck($unknownFields);
    if (o_ByteString_size($unknownFields) > 0) {
        $$this$addUnknownFields_u24lambda_u240 = $rt_nullCheck($$this$addUnknownFields_u24lambda_u240);
        csw_Message$Builder_prepareForNewUnknownFields($$this$addUnknownFields_u24lambda_u240);
        var$3 = $$this$addUnknownFields_u24lambda_u240.$unknownFieldsWriter;
        kji_Intrinsics_checkNotNull(var$3);
        csw_ProtoWriter_writeBytes($rt_nullCheck(var$3), $unknownFields);
    }
    return $$this$addUnknownFields_u24lambda_u240;
},
csw_Message$Builder_addUnknownField = ($this, $tag, $fieldEncoding, $value) => {
    let $$this$addUnknownField_u24lambda_u241, $protoAdapter, var$6;
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    $$this$addUnknownField_u24lambda_u241 = $rt_castToClass($this, csw_Message$Builder);
    $$this$addUnknownField_u24lambda_u241 = $rt_nullCheck($$this$addUnknownField_u24lambda_u241);
    csw_Message$Builder_prepareForNewUnknownFields($$this$addUnknownField_u24lambda_u241);
    $fieldEncoding = $rt_nullCheck($fieldEncoding);
    $protoAdapter = csw_FieldEncoding_rawProtoAdapter($fieldEncoding);
    kji_Intrinsics_checkNotNull0($protoAdapter, $rt_s(5));
    var$6 = $$this$addUnknownField_u24lambda_u241.$unknownFieldsWriter;
    kji_Intrinsics_checkNotNull(var$6);
    $protoAdapter = $rt_nullCheck($protoAdapter);
    $protoAdapter.$encodeWithTag(var$6, $tag, $value);
    return $$this$addUnknownField_u24lambda_u241;
},
csw_Message$Builder_buildUnknownFields = $this => {
    let var$1;
    if ($this.$unknownFieldsBuffer !== null) {
        var$1 = $this.$unknownFieldsBuffer;
        kji_Intrinsics_checkNotNull(var$1);
        $this.$unknownFieldsByteString = o_Buffer_readByteString($rt_nullCheck(var$1));
        $this.$unknownFieldsBuffer = null;
        $this.$unknownFieldsWriter = null;
    }
    return $this.$unknownFieldsByteString;
},
csw_Message$Builder_prepareForNewUnknownFields = $this => {
    let var$1, var$2;
    if ($this.$unknownFieldsBuffer === null) {
        $this.$unknownFieldsBuffer = o_Buffer__init_();
        var$1 = new csw_ProtoWriter;
        var$2 = $this.$unknownFieldsBuffer;
        kji_Intrinsics_checkNotNull(var$2);
        csw_ProtoWriter__init_(var$1, $rt_castToInterface(var$2, o_BufferedSink));
        $this.$unknownFieldsWriter = var$1;
        var$1 = $this.$unknownFieldsWriter;
        kji_Intrinsics_checkNotNull(var$1);
        csw_ProtoWriter_writeBytes($rt_nullCheck(var$1), $this.$unknownFieldsByteString);
        o_ByteString_$callClinit();
        $this.$unknownFieldsByteString = o_ByteString_EMPTY;
    }
};
function uciisdp_Department$Builder() {
    let a = this; csw_Message$Builder.call(a);
    a.$name5 = null;
    a.$manager1 = null;
    a.$employees1 = null;
}
let uciisdp_Department$Builder__init_ = $this => {
    csw_Message$Builder__init_($this);
    $this.$name5 = $rt_s(6);
    $this.$employees1 = cswi_Internal_newMutableList();
},
uciisdp_Department$Builder__init_0 = () => {
    let var_0 = new uciisdp_Department$Builder();
    uciisdp_Department$Builder__init_(var_0);
    return var_0;
},
uciisdp_Department$Builder_name = ($this, $name) => {
    $this.$name5 = $name;
    return $this;
},
uciisdp_Department$Builder_manager = ($this, $manager) => {
    $this.$manager1 = $manager;
    return $this;
},
uciisdp_Department$Builder_employees = ($this, $employees) => {
    cswi_Internal_checkElementsNotNull($employees);
    $this.$employees1 = $employees;
    return $this;
},
uciisdp_Department$Builder_build = $this => {
    return uciisdp_Department__init_0($this.$name5, $this.$manager1, $this.$employees1, csw_Message$Builder_buildUnknownFields($this));
},
jus_Collector = $rt_classWithoutFields(0),
jus_Collector_of = ($supplier, $accumulator, $combiner, $characteristics) => {
    return jus_Collector_of0($supplier, $accumulator, $combiner, jus_Collector$of$lambda$_5_0__init_0(), $characteristics);
},
jus_Collector_of0 = ($supplier, $accumulator, $combiner, $finisher, $characteristics) => {
    let $characteristicsSet, var$7;
    $characteristicsSet = ju_EnumSet_noneOf($rt_cls(jus_Collector$Characteristics));
    var$7 = ju_Arrays_asList($characteristics);
    $characteristicsSet = $rt_nullCheck($characteristicsSet);
    $characteristicsSet.$addAll(var$7);
    return jus_CollectorImpl__init_0($supplier, $accumulator, $combiner, $finisher, $characteristicsSet);
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
    a.$stackTrace = null;
}
let jl_Throwable__init_ = $this => {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
},
jl_Throwable__init_5 = () => {
    let var_0 = new jl_Throwable();
    jl_Throwable__init_(var_0);
    return var_0;
},
jl_Throwable__init_1 = ($this, $message) => {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
},
jl_Throwable__init_3 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_1(var_1, var_0);
    return var_1;
},
jl_Throwable__init_2 = ($this, $message, $cause) => {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$message = $message;
    $this.$cause = $cause;
},
jl_Throwable__init_4 = (var_0, var_1) => {
    let var_2 = new jl_Throwable();
    jl_Throwable__init_2(var_2, var_0, var_1);
    return var_2;
},
jl_Throwable__init_0 = ($this, $cause) => {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$fillInStackTrace();
    $this.$cause = $cause;
},
jl_Throwable__init_6 = var_0 => {
    let var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
},
jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$getMessage();
},
jl_Throwable_getCause = $this => {
    return $this.$cause === $this ? null : $this.$cause;
},
jl_Throwable_printStackTrace = $this => {
    $this.$printStackTrace(jl_System_err());
},
jl_Throwable_printStackTrace0 = ($this, $stream) => {
    let var$2, $message, var$4, var$5, var$6, var$7, $element;
    var$2 = $rt_nullCheck(jl_Object_getClass($this)).$getName();
    $stream = $rt_nullCheck($stream);
    $stream.$print(var$2);
    $message = $this.$getLocalizedMessage();
    if ($message !== null) {
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$2, $rt_s(7))), $message);
        $stream.$print(jl_StringBuilder_toString(var$2));
    }
    a: {
        $stream.$println();
        if ($this.$stackTrace !== null) {
            var$4 = $rt_nullCheck($this.$stackTrace).data;
            var$5 = var$4.length;
            var$6 = 0;
            while (true) {
                if (var$6 >= var$5)
                    break a;
                var$7 = $rt_checkLowerBound(var$6);
                $element = var$4[var$7];
                $stream.$print($rt_s(8));
                $stream.$println0($element);
                var$6 = var$7 + 1 | 0;
            }
        }
    }
    if ($this.$cause !== null && $this.$cause !== $this) {
        $stream.$print($rt_s(9));
        $rt_nullCheck($this.$cause).$printStackTrace($stream);
    }
},
jl_Throwable_getStackTrace = $this => {
    return $this.$stackTrace === null ? $rt_createArray(jl_StackTraceElement, 0) : $rt_castToInterface($rt_nullCheck($this.$stackTrace).$clone0(), $rt_arraycls(jl_StackTraceElement));
},
jl_Throwable_setStackTrace = ($this, $stackTrace) => {
    $stackTrace = $rt_nullCheck($stackTrace);
    $this.$stackTrace = $rt_castToInterface($stackTrace.$clone0(), $rt_arraycls(jl_StackTraceElement));
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable__init_($this);
},
jl_Exception__init_2 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_Exception__init_0 = ($this, $message) => {
    jl_Throwable__init_1($this, $message);
},
jl_Exception__init_4 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_0(var_1, var_0);
    return var_1;
},
jl_Exception__init_1 = ($this, $cause) => {
    jl_Throwable__init_0($this, $cause);
},
jl_Exception__init_3 = var_0 => {
    let var_1 = new jl_Exception();
    jl_Exception__init_1(var_1, var_0);
    return var_1;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_RuntimeException__init_4 = () => {
    let var_0 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_0);
    return var_0;
},
jl_RuntimeException__init_0 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_RuntimeException__init_2 = ($this, $cause) => {
    jl_Exception__init_1($this, $cause);
},
jl_RuntimeException__init_3 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_2(var_1, var_0);
    return var_1;
},
jnc_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException),
jnc_BufferOverflowException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jnc_BufferOverflowException__init_0 = () => {
    let var_0 = new jnc_BufferOverflowException();
    jnc_BufferOverflowException__init_(var_0);
    return var_0;
},
jl_AutoCloseable = $rt_classWithoutFields(0),
ji_Closeable = $rt_classWithoutFields(0),
jnc_Channel = $rt_classWithoutFields(0);
function csw_ProtoAdapter() {
    let a = this; jl_Object.call(a);
    a.$fieldEncoding = null;
    a.$type2 = null;
    a.$typeUrl = null;
    a.$syntax = null;
    a.$identity0 = null;
    a.$sourceFile = null;
    a.$packedAdapter = null;
    a.$repeatedAdapter = null;
}
let csw_ProtoAdapter_Companion = null,
csw_ProtoAdapter_BOOL = null,
csw_ProtoAdapter_INT32 = null,
csw_ProtoAdapter_INT32_ARRAY = null,
csw_ProtoAdapter_UINT32 = null,
csw_ProtoAdapter_UINT32_ARRAY = null,
csw_ProtoAdapter_SINT32 = null,
csw_ProtoAdapter_SINT32_ARRAY = null,
csw_ProtoAdapter_FIXED32 = null,
csw_ProtoAdapter_FIXED32_ARRAY = null,
csw_ProtoAdapter_SFIXED32 = null,
csw_ProtoAdapter_SFIXED32_ARRAY = null,
csw_ProtoAdapter_INT64 = null,
csw_ProtoAdapter_INT64_ARRAY = null,
csw_ProtoAdapter_UINT64 = null,
csw_ProtoAdapter_UINT64_ARRAY = null,
csw_ProtoAdapter_SINT64 = null,
csw_ProtoAdapter_SINT64_ARRAY = null,
csw_ProtoAdapter_FIXED64 = null,
csw_ProtoAdapter_FIXED64_ARRAY = null,
csw_ProtoAdapter_SFIXED64 = null,
csw_ProtoAdapter_SFIXED64_ARRAY = null,
csw_ProtoAdapter_FLOAT = null,
csw_ProtoAdapter_FLOAT_ARRAY = null,
csw_ProtoAdapter_DOUBLE = null,
csw_ProtoAdapter_DOUBLE_ARRAY = null,
csw_ProtoAdapter_BYTES = null,
csw_ProtoAdapter_STRING = null,
csw_ProtoAdapter_EMPTY = null,
csw_ProtoAdapter_STRUCT_MAP = null,
csw_ProtoAdapter_STRUCT_LIST = null,
csw_ProtoAdapter_STRUCT_NULL = null,
csw_ProtoAdapter_STRUCT_VALUE = null,
csw_ProtoAdapter_DOUBLE_VALUE = null,
csw_ProtoAdapter_FLOAT_VALUE = null,
csw_ProtoAdapter_INT64_VALUE = null,
csw_ProtoAdapter_UINT64_VALUE = null,
csw_ProtoAdapter_INT32_VALUE = null,
csw_ProtoAdapter_UINT32_VALUE = null,
csw_ProtoAdapter_BOOL_VALUE = null,
csw_ProtoAdapter_STRING_VALUE = null,
csw_ProtoAdapter_BYTES_VALUE = null,
csw_ProtoAdapter_DURATION = null,
csw_ProtoAdapter_INSTANT = null,
csw_ProtoAdapter_$callClinit = () => {
    csw_ProtoAdapter_$callClinit = $rt_eraseClinit(csw_ProtoAdapter);
    csw_ProtoAdapter__clinit_();
},
csw_ProtoAdapter__init_2 = ($this, $fieldEncoding, $type, $typeUrl, $syntax, $identity, $sourceFile) => {
    let var$7, var$8, var$9;
    csw_ProtoAdapter_$callClinit();
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    kji_Intrinsics_checkNotNullParameter($syntax, $rt_s(10));
    jl_Object__init_($this);
    $this.$fieldEncoding = $fieldEncoding;
    $this.$type2 = $type;
    $this.$typeUrl = $typeUrl;
    $this.$syntax = $syntax;
    $this.$identity0 = $identity;
    $this.$sourceFile = $sourceFile;
    var$7 = $this instanceof csw_PackedProtoAdapter;
    if (!var$7 && !($this instanceof csw_RepeatedProtoAdapter)) {
        var$8 = $this.$fieldEncoding;
        csw_FieldEncoding_$callClinit();
        if (var$8 === csw_FieldEncoding_LENGTH_DELIMITED)
            var$9 = null;
        else {
            if (!(csw_ProtoAdapter_getFieldEncoding$wire_runtime($this) === csw_FieldEncoding_LENGTH_DELIMITED ? 0 : 1))
                $rt_throw(jl_IllegalArgumentException__init_($rt_s(11).$toString()));
            var$9 = $rt_castToClass(csw_PackedProtoAdapter__init_0($this), csw_ProtoAdapter);
        }
    } else
        var$9 = null;
    $this.$packedAdapter = var$9;
    var$9 = !($this instanceof csw_RepeatedProtoAdapter) && !var$7 ? $rt_castToClass(csw_RepeatedProtoAdapter__init_0($this), csw_ProtoAdapter) : null;
    $this.$repeatedAdapter = var$9;
},
csw_ProtoAdapter_getFieldEncoding$wire_runtime = $this => {
    return $this.$fieldEncoding;
},
csw_ProtoAdapter_getType = $this => {
    return $this.$type2;
},
csw_ProtoAdapter_getSyntax = $this => {
    return $this.$syntax;
},
csw_ProtoAdapter_getIdentity = $this => {
    return $this.$identity0;
};
let csw_ProtoAdapter__init_3 = ($this, $fieldEncoding, $type) => {
    let var$3;
    csw_ProtoAdapter_$callClinit();
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    var$3 = null;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_0($this, $fieldEncoding, $type, var$3, csw_Syntax_PROTO_2);
},
csw_ProtoAdapter__init_0 = ($this, $fieldEncoding, $type, $typeUrl, $syntax) => {
    csw_ProtoAdapter_$callClinit();
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    kji_Intrinsics_checkNotNullParameter($syntax, $rt_s(10));
    csw_ProtoAdapter__init_($this, $fieldEncoding, $type, $typeUrl, $syntax, null);
},
csw_ProtoAdapter__init_ = ($this, $fieldEncoding, $type, $typeUrl, $syntax, $identity) => {
    csw_ProtoAdapter_$callClinit();
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    kji_Intrinsics_checkNotNullParameter($syntax, $rt_s(10));
    csw_ProtoAdapter__init_2($this, $fieldEncoding, $type, $typeUrl, $syntax, $identity, null);
},
csw_ProtoAdapter__init_1 = ($this, $fieldEncoding, $type, $typeUrl, $syntax, $identity, $sourceFile) => {
    csw_ProtoAdapter_$callClinit();
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    kji_Intrinsics_checkNotNullParameter($type, $rt_s(12));
    kji_Intrinsics_checkNotNullParameter($syntax, $rt_s(10));
    csw_ProtoAdapter__init_2($this, $fieldEncoding, kj_JvmClassMappingKt_getKotlinClass($type), $typeUrl, $syntax, $identity, $sourceFile);
},
csw_ProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    let var$4;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null) {
        var$4 = csw_ProtoAdapter_getFieldEncoding$wire_runtime($this);
        $writer = $rt_nullCheck($writer);
        csw_ProtoWriter_writeTag($writer, $tag, var$4);
        var$4 = csw_ProtoAdapter_getFieldEncoding$wire_runtime($this);
        csw_FieldEncoding_$callClinit();
        if (var$4 === csw_FieldEncoding_LENGTH_DELIMITED)
            csw_ProtoWriter_writeVarint32($writer, $this.$encodedSize($value));
        $this.$encode0($writer, $value);
    }
},
csw_ProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    let var$4, $byteCountBefore$iv;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null) {
        var$4 = csw_ProtoAdapter_getFieldEncoding$wire_runtime($this);
        csw_FieldEncoding_$callClinit();
        if (var$4 !== csw_FieldEncoding_LENGTH_DELIMITED)
            $this.$encode1($writer, $value);
        else {
            $writer = $rt_nullCheck($writer);
            $byteCountBefore$iv = csw_ReverseProtoWriter_getByteCount($writer);
            $this.$encode1($writer, $value);
            csw_ReverseProtoWriter_writeVarint32($writer, csw_ReverseProtoWriter_getByteCount($writer) - $byteCountBefore$iv | 0);
        }
        var$4 = csw_ProtoAdapter_getFieldEncoding$wire_runtime($this);
        $writer = $rt_nullCheck($writer);
        csw_ReverseProtoWriter_writeTag($writer, $tag, var$4);
    }
},
csw_ProtoAdapter_encode0 = ($this, $sink, $value) => {
    let $writer$iv;
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    $writer$iv = csw_ReverseProtoWriter__init_0();
    $this.$encode1($writer$iv, $value);
    csw_ReverseProtoWriter_writeTo($writer$iv, $sink);
},
csw_ProtoAdapter_encode = ($this, $value) => {
    let $buffer$iv, var$3;
    $buffer$iv = o_Buffer__init_();
    csw_ProtoAdapter_encode0($this, $rt_castToInterface($buffer$iv, o_BufferedSink), $value);
    var$3 = o_Buffer_readByteArray0($buffer$iv);
    return var$3;
},
csw_ProtoAdapter_decode = ($this, $bytes) => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($bytes, $rt_s(15));
    var$2 = csw_ProtoAdapter_decode0($this, $rt_castToInterface(o_Buffer_write0(o_Buffer__init_(), $bytes), o_BufferedSource));
    return var$2;
},
csw_ProtoAdapter_decode0 = ($this, $source) => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($source, $rt_s(16));
    var$2 = $this.$decode0(csw_ProtoReader__init_0($source));
    return var$2;
},
csw_ProtoAdapter_asRepeated = $this => {
    let var$1;
    var$1 = $this.$repeatedAdapter;
    if (var$1 !== null)
        return var$1;
    $rt_throw(jl_UnsupportedOperationException__init_1($rt_s(17)));
},
csw_ProtoAdapter__clinit_ = () => {
    let var$1, $$je;
    csw_ProtoAdapter_Companion = csw_ProtoAdapter$Companion__init_1(null);
    csw_ProtoAdapter_BOOL = csw_ProtoAdapterKt_commonBool();
    csw_ProtoAdapter_INT32 = csw_ProtoAdapterKt_commonInt32();
    csw_ProtoAdapter_INT32_ARRAY = $rt_castToClass(csw_IntArrayProtoAdapter__init_(csw_ProtoAdapter_INT32), csw_ProtoAdapter);
    csw_ProtoAdapter_UINT32 = csw_ProtoAdapterKt_commonUint32();
    csw_ProtoAdapter_UINT32_ARRAY = $rt_castToClass(csw_IntArrayProtoAdapter__init_(csw_ProtoAdapter_UINT32), csw_ProtoAdapter);
    csw_ProtoAdapter_SINT32 = csw_ProtoAdapterKt_commonSint32();
    csw_ProtoAdapter_SINT32_ARRAY = $rt_castToClass(csw_IntArrayProtoAdapter__init_(csw_ProtoAdapter_SINT32), csw_ProtoAdapter);
    csw_ProtoAdapter_FIXED32 = csw_ProtoAdapterKt_commonFixed32();
    csw_ProtoAdapter_FIXED32_ARRAY = $rt_castToClass(csw_IntArrayProtoAdapter__init_(csw_ProtoAdapter_FIXED32), csw_ProtoAdapter);
    csw_ProtoAdapter_SFIXED32 = csw_ProtoAdapterKt_commonSfixed32();
    csw_ProtoAdapter_SFIXED32_ARRAY = $rt_castToClass(csw_IntArrayProtoAdapter__init_(csw_ProtoAdapter_SFIXED32), csw_ProtoAdapter);
    csw_ProtoAdapter_INT64 = csw_ProtoAdapterKt_commonInt64();
    csw_ProtoAdapter_INT64_ARRAY = $rt_castToClass(csw_LongArrayProtoAdapter__init_(csw_ProtoAdapter_INT64), csw_ProtoAdapter);
    csw_ProtoAdapter_UINT64 = csw_ProtoAdapterKt_commonUint64();
    csw_ProtoAdapter_UINT64_ARRAY = $rt_castToClass(csw_LongArrayProtoAdapter__init_(csw_ProtoAdapter_UINT64), csw_ProtoAdapter);
    csw_ProtoAdapter_SINT64 = csw_ProtoAdapterKt_commonSint64();
    csw_ProtoAdapter_SINT64_ARRAY = $rt_castToClass(csw_LongArrayProtoAdapter__init_(csw_ProtoAdapter_SINT64), csw_ProtoAdapter);
    csw_ProtoAdapter_FIXED64 = csw_ProtoAdapterKt_commonFixed64();
    csw_ProtoAdapter_FIXED64_ARRAY = $rt_castToClass(csw_LongArrayProtoAdapter__init_(csw_ProtoAdapter_FIXED64), csw_ProtoAdapter);
    csw_ProtoAdapter_SFIXED64 = csw_ProtoAdapterKt_commonSfixed64();
    csw_ProtoAdapter_SFIXED64_ARRAY = $rt_castToClass(csw_LongArrayProtoAdapter__init_(csw_ProtoAdapter_SFIXED64), csw_ProtoAdapter);
    csw_ProtoAdapter_FLOAT = $rt_castToClass(csw_ProtoAdapterKt_commonFloat(), csw_ProtoAdapter);
    csw_ProtoAdapter_FLOAT_ARRAY = $rt_castToClass(csw_FloatArrayProtoAdapter__init_0(csw_ProtoAdapter_FLOAT), csw_ProtoAdapter);
    csw_ProtoAdapter_DOUBLE = $rt_castToClass(csw_ProtoAdapterKt_commonDouble(), csw_ProtoAdapter);
    csw_ProtoAdapter_DOUBLE_ARRAY = $rt_castToClass(csw_DoubleArrayProtoAdapter__init_0(csw_ProtoAdapter_DOUBLE), csw_ProtoAdapter);
    csw_ProtoAdapter_BYTES = csw_ProtoAdapterKt_commonBytes();
    csw_ProtoAdapter_STRING = csw_ProtoAdapterKt_commonString();
    csw_ProtoAdapter_EMPTY = csw_ProtoAdapterKt_commonEmpty();
    csw_ProtoAdapter_STRUCT_MAP = csw_ProtoAdapterKt_commonStructMap();
    csw_ProtoAdapter_STRUCT_LIST = csw_ProtoAdapterKt_commonStructList();
    csw_ProtoAdapter_STRUCT_NULL = csw_ProtoAdapterKt_commonStructNull();
    csw_ProtoAdapter_STRUCT_VALUE = csw_ProtoAdapterKt_commonStructValue();
    csw_ProtoAdapter_DOUBLE_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_DOUBLE, $rt_s(18));
    csw_ProtoAdapter_FLOAT_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_FLOAT, $rt_s(19));
    csw_ProtoAdapter_INT64_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_INT64, $rt_s(20));
    csw_ProtoAdapter_UINT64_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_UINT64, $rt_s(21));
    csw_ProtoAdapter_INT32_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_INT32, $rt_s(22));
    csw_ProtoAdapter_UINT32_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_UINT32, $rt_s(23));
    csw_ProtoAdapter_BOOL_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_BOOL, $rt_s(24));
    csw_ProtoAdapter_STRING_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_STRING, $rt_s(25));
    csw_ProtoAdapter_BYTES_VALUE = csw_ProtoAdapterKt_commonWrapper(csw_ProtoAdapter_BYTES, $rt_s(26));
    a: {
        try {
            var$1 = csw_ProtoAdapterKt_commonDuration();
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_NoClassDefFoundError) {
            } else {
                throw $$e;
            }
        }
        var$1 = $rt_castToClass(csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter__init_(), csw_ProtoAdapter);
    }
    csw_ProtoAdapter_DURATION = var$1;
    b: {
        try {
            var$1 = csw_ProtoAdapterKt_commonInstant();
            break b;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_NoClassDefFoundError) {
            } else {
                throw $$e;
            }
        }
        var$1 = $rt_castToClass(csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter__init_(), csw_ProtoAdapter);
    }
    csw_ProtoAdapter_INSTANT = var$1;
},
uciisdp_Department$ProtoAdapter_Department = $rt_classWithoutFields(csw_ProtoAdapter),
uciisdp_Department$ProtoAdapter_Department__init_ = $this => {
    let var$1;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_1($this, var$1, $rt_cls(uciisdp_Department), $rt_s(27), csw_Syntax_PROTO_3, null, $rt_s(28));
},
uciisdp_Department$ProtoAdapter_Department__init_0 = () => {
    let var_0 = new uciisdp_Department$ProtoAdapter_Department();
    uciisdp_Department$ProtoAdapter_Department__init_(var_0);
    return var_0;
},
uciisdp_Department$ProtoAdapter_Department_encode = ($this, $writer, $value) => {
    let var$3;
    $value = $rt_nullCheck($value);
    var$3 = csw_Message_unknownFields($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, var$3);
    uciisdp_Employee_$callClinit();
    $rt_nullCheck(csw_ProtoAdapter_asRepeated($rt_nullCheck(uciisdp_Employee_ADAPTER))).$encodeWithTag0($writer, 3, $value.$employees0);
    if (!ju_Objects_equals($value.$manager0, null))
        $rt_nullCheck(uciisdp_Employee_ADAPTER).$encodeWithTag0($writer, 2, $value.$manager0);
    if (!ju_Objects_equals($value.$name4, $rt_s(6)))
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 1, $value.$name4);
},
uciisdp_Department$ProtoAdapter_Department_encode0 = ($this, var$1, var$2) => {
    uciisdp_Department$ProtoAdapter_Department_encode($this, var$1, $rt_castToClass(var$2, uciisdp_Department));
},
jl_CharSequence = $rt_classWithoutFields(0),
jl_Error = $rt_classWithoutFields(jl_Throwable),
jl_Error__init_ = $this => {
    jl_Throwable__init_($this);
},
jl_Error__init_6 = () => {
    let var_0 = new jl_Error();
    jl_Error__init_(var_0);
    return var_0;
},
jl_Error__init_1 = ($this, $message, $cause) => {
    jl_Throwable__init_2($this, $message, $cause);
},
jl_Error__init_5 = (var_0, var_1) => {
    let var_2 = new jl_Error();
    jl_Error__init_1(var_2, var_0, var_1);
    return var_2;
},
jl_Error__init_2 = ($this, $message) => {
    jl_Throwable__init_1($this, $message);
},
jl_Error__init_3 = var_0 => {
    let var_1 = new jl_Error();
    jl_Error__init_2(var_1, var_0);
    return var_1;
},
jl_Error__init_0 = ($this, $cause) => {
    jl_Throwable__init_0($this, $cause);
},
jl_Error__init_4 = var_0 => {
    let var_1 = new jl_Error();
    jl_Error__init_0(var_1, var_0);
    return var_1;
},
jl_LinkageError = $rt_classWithoutFields(jl_Error),
ju_Map = $rt_classWithoutFields(0),
ju_SequencedMap = $rt_classWithoutFields(0),
oi__Buffer = $rt_classWithoutFields(),
oi__Buffer_HEX_DIGIT_BYTES = null,
oi__Buffer_$callClinit = () => {
    oi__Buffer_$callClinit = $rt_eraseClinit(oi__Buffer);
    oi__Buffer__clinit_();
},
oi__Buffer_commonReadAndWriteUnsafe = ($$this$commonReadAndWriteUnsafe, $unsafeCursor) => {
    oi__Buffer_$callClinit();
    kji_Intrinsics_checkNotNullParameter($$this$commonReadAndWriteUnsafe, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($unsafeCursor, $rt_s(30));
    $unsafeCursor = o__SegmentedByteString_resolveDefaultParameter0($unsafeCursor);
    $unsafeCursor = $rt_nullCheck($unsafeCursor);
    if ($unsafeCursor.$buffer0 !== null ? 0 : 1) {
        $unsafeCursor.$buffer0 = $$this$commonReadAndWriteUnsafe;
        $unsafeCursor.$readWrite = 1;
        return $unsafeCursor;
    }
    $rt_throw(jl_IllegalStateException__init_($rt_s(31).$toString()));
},
oi__Buffer__clinit_ = () => {
    oi__Buffer_HEX_DIGIT_BYTES = o__JvmPlatformKt_asUtf8ToByteArray($rt_s(32));
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException),
jl_IndexOutOfBoundsException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IndexOutOfBoundsException__init_0 = () => {
    let var_0 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_1(var_0);
    return var_0;
},
jl_IndexOutOfBoundsException__init_ = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IndexOutOfBoundsException__init_2 = var_0 => {
    let var_1 = new jl_IndexOutOfBoundsException();
    jl_IndexOutOfBoundsException__init_(var_1, var_0);
    return var_1;
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_StringIndexOutOfBoundsException__init_0 = $this => {
    jl_IndexOutOfBoundsException__init_1($this);
},
jl_StringIndexOutOfBoundsException__init_ = () => {
    let var_0 = new jl_StringIndexOutOfBoundsException();
    jl_StringIndexOutOfBoundsException__init_0(var_0);
    return var_0;
},
csw_ProtoAdapterKt$commonDuration$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonDuration$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(33), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonDuration$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonDuration$1();
    csw_ProtoAdapterKt$commonDuration$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonDuration$1_encode = ($this, $writer, $value) => {
    let $nanos, $seconds;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $nanos = csw_ProtoAdapterKt$commonDuration$1_getSameSignNanos($this, $value);
    if ($nanos) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_INT32).$encodeWithTag0($writer, 2, jl_Integer_valueOf($nanos));
    }
    $seconds = csw_ProtoAdapterKt$commonDuration$1_getSameSignSeconds($this, $value);
    if (Long_ne($seconds, Long_ZERO)) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_INT64).$encodeWithTag0($writer, 1, jl_Long_valueOf($seconds));
    }
},
csw_ProtoAdapterKt$commonDuration$1_getSameSignSeconds = ($this, $$this$sameSignSeconds) => {
    let var$2;
    $$this$sameSignSeconds = $rt_nullCheck($$this$sameSignSeconds);
    var$2 = Long_lt(jt_Duration_getSeconds($$this$sameSignSeconds), Long_ZERO) && jt_Duration_getNano($$this$sameSignSeconds) ? Long_add(jt_Duration_getSeconds($$this$sameSignSeconds), Long_fromInt(1)) : jt_Duration_getSeconds($$this$sameSignSeconds);
    return var$2;
},
csw_ProtoAdapterKt$commonDuration$1_getSameSignNanos = ($this, $$this$sameSignNanos) => {
    let var$2;
    $$this$sameSignNanos = $rt_nullCheck($$this$sameSignNanos);
    var$2 = Long_lt(jt_Duration_getSeconds($$this$sameSignNanos), Long_ZERO) && jt_Duration_getNano($$this$sameSignNanos) ? jt_Duration_getNano($$this$sameSignNanos) - 1000000000 | 0 : jt_Duration_getNano($$this$sameSignNanos);
    return var$2;
},
csw_ProtoAdapterKt$commonDuration$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonDuration$1_encode($this, $writer, $rt_castToClass($value, jt_Duration));
};
function jnc_CharsetDecoder() {
    let a = this; jl_Object.call(a);
    a.$charset1 = null;
    a.$averageCharsPerByte = 0.0;
    a.$maxCharsPerByte = 0.0;
    a.$replacement = null;
    a.$malformedAction = null;
    a.$unmappableAction = null;
    a.$state0 = 0;
}
let jnc_CharsetDecoder__init_ = ($this, $cs, $averageCharsPerByte, $maxCharsPerByte) => {
    let var$4, var$5;
    jl_Object__init_($this);
    $this.$replacement = $rt_s(35);
    jnc_CodingErrorAction_$callClinit();
    $this.$malformedAction = jnc_CodingErrorAction_REPORT;
    $this.$unmappableAction = jnc_CodingErrorAction_REPORT;
    if ($averageCharsPerByte <= 0.0) {
        var$4 = new jl_IllegalArgumentException;
        var$5 = jl_StringBuilder__init_();
        jl_StringBuilder_append2($rt_nullCheck(jl_StringBuilder_append(var$5, $rt_s(36))), $averageCharsPerByte);
        jl_IllegalArgumentException__init_1(var$4, jl_StringBuilder_toString(var$5));
        $rt_throw(var$4);
    }
    if ($maxCharsPerByte > 0.0) {
        $this.$charset1 = $cs;
        $this.$averageCharsPerByte = $averageCharsPerByte;
        $this.$maxCharsPerByte = $maxCharsPerByte;
        return;
    }
    var$4 = new jl_IllegalArgumentException;
    var$5 = jl_StringBuilder__init_();
    jl_StringBuilder_append2($rt_nullCheck(jl_StringBuilder_append(var$5, $rt_s(37))), $maxCharsPerByte);
    jl_IllegalArgumentException__init_1(var$4, jl_StringBuilder_toString(var$5));
    $rt_throw(var$4);
},
jnc_CharsetDecoder_onMalformedInput = ($this, $newAction) => {
    if ($newAction !== null) {
        $this.$malformedAction = $newAction;
        $this.$implOnMalformedInput($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(38)));
},
jnc_CharsetDecoder_implOnMalformedInput = ($this, $newAction) => {
    return;
},
jnc_CharsetDecoder_onUnmappableCharacter = ($this, $newAction) => {
    if ($newAction !== null) {
        $this.$unmappableAction = $newAction;
        $this.$implOnUnmappableCharacter($newAction);
        return $this;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(38)));
},
jnc_CharsetDecoder_implOnUnmappableCharacter = ($this, $newAction) => {
    return;
},
jnc_CharsetDecoder_decode = ($this, $in, $out, $endOfInput) => {
    let $result, $e, var$6, $$je;
    if (!($this.$state0 == 2 && !$endOfInput) && $this.$state0 != 3) {
        $this.$state0 = $endOfInput ? 2 : 1;
        while (true) {
            try {
                $result = $this.$decodeLoop($in, $out);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_RuntimeException) {
                    $e = $$je;
                    $rt_throw(jnc_CoderMalfunctionError__init_0($e));
                } else {
                    throw $$e;
                }
            }
            $result = $rt_nullCheck($result);
            if ($result.$isOverflow())
                break;
            if ($result.$isUnderflow()) {
                if ($endOfInput) {
                    $in = $rt_nullCheck($in);
                    if (jn_Buffer_hasRemaining($in)) {
                        var$6 = $this.$malformedAction;
                        jnc_CodingErrorAction_$callClinit();
                        if (var$6 === jnc_CodingErrorAction_REPORT)
                            return jnc_CoderResult_malformedForLength(jn_Buffer_remaining($in));
                        $out = $rt_nullCheck($out);
                        if (jn_Buffer_remaining($out) <= $rt_nullCheck($this.$replacement).$length())
                            return jnc_CoderResult_OVERFLOW;
                        $in.$position1(jn_Buffer_position($in) + jn_Buffer_remaining($in) | 0);
                        if ($this.$malformedAction === jnc_CodingErrorAction_REPLACE)
                            jn_CharBuffer_put($out, $this.$replacement);
                    }
                }
                return $result;
            }
            if ($result.$isMalformed()) {
                var$6 = $this.$malformedAction;
                jnc_CodingErrorAction_$callClinit();
                if (var$6 === jnc_CodingErrorAction_REPORT)
                    return $result;
                if ($this.$malformedAction === jnc_CodingErrorAction_REPLACE) {
                    $out = $rt_nullCheck($out);
                    if (jn_Buffer_remaining($out) < $rt_nullCheck($this.$replacement).$length())
                        return jnc_CoderResult_OVERFLOW;
                    jn_CharBuffer_put($out, $this.$replacement);
                }
                $in = $rt_nullCheck($in);
                $in.$position1(jn_Buffer_position($in) + $result.$length() | 0);
            } else if ($result.$isUnmappable()) {
                var$6 = $this.$unmappableAction;
                jnc_CodingErrorAction_$callClinit();
                if (var$6 === jnc_CodingErrorAction_REPORT)
                    return $result;
                if ($this.$unmappableAction === jnc_CodingErrorAction_REPLACE) {
                    $out = $rt_nullCheck($out);
                    if (jn_Buffer_remaining($out) < $rt_nullCheck($this.$replacement).$length())
                        return jnc_CoderResult_OVERFLOW;
                    jn_CharBuffer_put($out, $this.$replacement);
                }
                $in = $rt_nullCheck($in);
                $in.$position1(jn_Buffer_position($in) + $result.$length() | 0);
            }
        }
        return $result;
    }
    $rt_throw(jl_IllegalStateException__init_0());
},
jnc_CharsetDecoder_flush = ($this, $out) => {
    if ($this.$state0 != 3 && $this.$state0 != 2)
        $rt_throw(jl_IllegalStateException__init_0());
    $this.$state0 = 3;
    return $this.$implFlush0($out);
},
jnc_CharsetDecoder_reset = $this => {
    $this.$state0 = 0;
    $this.$implReset();
    return $this;
},
jnc_CharsetDecoder_decode0 = ($this, $in) => {
    let $out, $result, var$4;
    if ($this.$state0 && $this.$state0 != 3)
        $rt_throw(jl_IllegalStateException__init_0());
    $in = $rt_nullCheck($in);
    if (!jn_Buffer_remaining($in))
        return jn_CharBuffer_allocate(0);
    if ($this.$state0)
        jnc_CharsetDecoder_reset($this);
    $out = jn_CharBuffer_allocate(jl_Math_max(8, jn_Buffer_remaining($in) * $this.$averageCharsPerByte | 0));
    while (true) {
        $result = jnc_CharsetDecoder_decode($this, $in, $out, 0);
        $result = $rt_nullCheck($result);
        if ($result.$isUnderflow())
            break;
        if ($result.$isOverflow())
            $out = jnc_CharsetDecoder_expand($this, $out);
        if (!$result.$isError())
            continue;
        $result.$throwException();
    }
    var$4 = jnc_CharsetDecoder_decode($this, $in, $out, 1);
    var$4 = $rt_nullCheck(var$4);
    if (var$4.$isError())
        var$4.$throwException();
    while (true) {
        var$4 = jnc_CharsetDecoder_flush($this, $out);
        if ($rt_nullCheck(var$4).$isUnderflow())
            break;
        $out = jnc_CharsetDecoder_expand($this, $out);
    }
    var$4 = $rt_nullCheck($out);
    jn_CharBuffer_flip(var$4);
    return var$4;
},
jnc_CharsetDecoder_expand = ($this, $buffer) => {
    let $array, var$3, $result, var$5;
    $buffer = $rt_nullCheck($buffer);
    $array = jn_CharBuffer_array($buffer);
    $array = $rt_nullCheck($array);
    var$3 = ju_Arrays_copyOf0($array, jl_Math_max(8, $array.data.length * 2 | 0));
    $result = jn_CharBuffer_wrap(var$3);
    var$5 = jn_Buffer_position($buffer);
    $result = $rt_nullCheck($result);
    $result.$position(var$5);
    return $result;
},
jnc_CharsetDecoder_implFlush = ($this, $out) => {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult_UNDERFLOW;
},
jnc_CharsetDecoder_implReset = $this => {
    return;
};
function o_ByteString() {
    let a = this; jl_Object.call(a);
    a.$data1 = null;
    a.$utf80 = null;
}
let o_ByteString_Companion = null,
o_ByteString_EMPTY = null,
o_ByteString_$callClinit = () => {
    o_ByteString_$callClinit = $rt_eraseClinit(o_ByteString);
    o_ByteString__clinit_();
},
o_ByteString__init_ = ($this, $data) => {
    o_ByteString_$callClinit();
    kji_Intrinsics_checkNotNullParameter($data, $rt_s(39));
    jl_Object__init_($this);
    $this.$data1 = $data;
},
o_ByteString__init_0 = var_0 => {
    let var_1 = new o_ByteString();
    o_ByteString__init_(var_1, var_0);
    return var_1;
},
o_ByteString_getData$okio = $this => {
    return $this.$data1;
},
o_ByteString_getUtf8$okio = $this => {
    return $this.$utf80;
},
o_ByteString_setUtf8$okio = ($this, $_set___) => {
    $this.$utf80 = $_set___;
},
o_ByteString_utf8 = $this => {
    let $result$iv;
    $result$iv = o_ByteString_getUtf8$okio($this);
    if ($result$iv === null) {
        $result$iv = o__JvmPlatformKt_toUtf8String($this.$internalArray$okio());
        o_ByteString_setUtf8$okio($this, $result$iv);
    }
    return $result$iv;
},
o_ByteString_hex = $this => {
    let $result$iv, $c$iv, var$3, var$4, var$5, var$6, var$7, $b$iv, var$9, var$10, $other$iv$iv, var$12, var$13;
    $result$iv = $rt_createCharArray($rt_nullCheck(o_ByteString_getData$okio($this)).data.length * 2 | 0);
    $c$iv = 0;
    var$3 = o_ByteString_getData$okio($this);
    var$4 = 0;
    var$3 = $rt_nullCheck(var$3).data;
    var$5 = var$3.length;
    while (var$4 < var$5) {
        var$6 = $result$iv.data;
        var$7 = $rt_checkLowerBound(var$4);
        $b$iv = var$3[var$7];
        var$9 = $c$iv + 1 | 0;
        var$10 = oi__ByteString_getHEX_DIGIT_CHARS();
        $other$iv$iv = 4;
        var$4 = $b$iv >> $other$iv$iv;
        var$4 = var$4 & 15;
        var$10 = $rt_nullCheck(var$10).data;
        var$12 = var$10[$rt_checkBounds(var$4, var$10)];
        var$6[$rt_checkBounds($c$iv, var$6)] = var$12;
        $c$iv = var$9 + 1 | 0;
        var$10 = oi__ByteString_getHEX_DIGIT_CHARS();
        $other$iv$iv = 15;
        var$4 = $b$iv & $other$iv$iv;
        var$10 = $rt_nullCheck(var$10).data;
        var$4 = var$10[$rt_checkBounds(var$4, var$10)];
        var$6[$rt_checkBounds(var$9, var$6)] = var$4;
        var$4 = var$7 + 1 | 0;
    }
    var$13 = kt_StringsKt__StringsJVMKt_concatToString($result$iv);
    return var$13;
},
o_ByteString_size = $this => {
    return $this.$getSize$okio();
},
o_ByteString_getSize$okio = $this => {
    let var$1;
    var$1 = $rt_nullCheck(o_ByteString_getData$okio($this)).data.length;
    return var$1;
},
o_ByteString_toByteArray = $this => {
    let var$1, var$2;
    var$1 = $rt_nullCheck(o_ByteString_getData$okio($this));
    var$2 = ju_Arrays_copyOf(var$1, var$1.data.length);
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(40));
    return var$2;
},
o_ByteString_internalArray$okio = $this => {
    let var$1;
    var$1 = o_ByteString_getData$okio($this);
    return var$1;
},
o_ByteString_write$okio = ($this, $buffer, $offset, $byteCount) => {
    kji_Intrinsics_checkNotNullParameter($buffer, $rt_s(41));
    oi__ByteString_commonWrite($this, $buffer, $offset, $byteCount);
},
o_ByteString_rangeEquals = ($this, $offset, $other, $otherOffset, $byteCount) => {
    let var$5;
    a: {
        kji_Intrinsics_checkNotNullParameter($other, $rt_s(42));
        if ($offset >= 0 && $offset <= ($rt_nullCheck(o_ByteString_getData$okio($this)).data.length - $byteCount | 0) && $otherOffset >= 0) {
            $other = $rt_nullCheck($other);
            if ($otherOffset <= ($other.data.length - $byteCount | 0) && o__SegmentedByteString_arrayRangeEquals(o_ByteString_getData$okio($this), $offset, $other, $otherOffset, $byteCount)) {
                var$5 = 1;
                break a;
            }
        }
        var$5 = 0;
    }
    return var$5;
},
o_ByteString_copyInto = ($this, $offset, $target, $targetOffset, $byteCount) => {
    kji_Intrinsics_checkNotNullParameter($target, $rt_s(43));
    kc_ArraysKt___ArraysJvmKt_copyInto(o_ByteString_getData$okio($this), $target, $targetOffset, $offset, $offset + $byteCount | 0);
},
o_ByteString_equals = ($this, $other) => {
    let var$2, var$3;
    if ($other === $this)
        var$2 = 1;
    else if (!($other instanceof o_ByteString))
        var$2 = 0;
    else {
        var$3 = $rt_nullCheck($rt_castToClass($other, o_ByteString));
        var$2 = o_ByteString_size(var$3) == $rt_nullCheck(o_ByteString_getData$okio($this)).data.length && var$3.$rangeEquals(0, o_ByteString_getData$okio($this), 0, $rt_nullCheck(o_ByteString_getData$okio($this)).data.length) ? 1 : 0;
    }
    return var$2;
},
o_ByteString_toString = $this => {
    let var$1, $i$iv, $text$iv, var$4, $safeText$iv, $beginIndex$iv$iv, $endIndex$iv$iv, $subLen$iv$iv;
    if ($rt_nullCheck(o_ByteString_getData$okio($this)).data.length ? 0 : 1)
        var$1 = $rt_s(44);
    else {
        $i$iv = oi__ByteString_access$codePointIndexToCharIndex(o_ByteString_getData$okio($this), 64);
        if ($i$iv != (-1)) {
            $text$iv = $this.$utf8();
            $text$iv = $rt_nullCheck($text$iv);
            var$4 = $text$iv.$substring(0, $i$iv);
            kji_Intrinsics_checkNotNullExpressionValue(var$4, $rt_s(45));
            var$1 = kt_StringsKt__StringsJVMKt_replace$default(var$4, $rt_s(46), $rt_s(47), 0, 4, null);
            var$1 = kt_StringsKt__StringsJVMKt_replace$default(var$1, $rt_s(48), $rt_s(49), 0, 4, null);
            $safeText$iv = kt_StringsKt__StringsJVMKt_replace$default(var$1, $rt_s(50), $rt_s(51), 0, 4, null);
            var$1 = $i$iv >= $text$iv.$length() ? $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(52))).$append3($safeText$iv)).$append0(93)).$toString() : $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(53))).$append4($rt_nullCheck(o_ByteString_getData$okio($this)).data.length)).$append3($rt_s(54))).$append3($safeText$iv)).$append3($rt_s(55))).$toString();
        } else if ($rt_nullCheck(o_ByteString_getData$okio($this)).data.length <= 64)
            var$1 = $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(56))).$append3($this.$hex())).$append0(93)).$toString();
        else {
            var$1 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(53))).$append4($rt_nullCheck(o_ByteString_getData$okio($this)).data.length)).$append3($rt_s(57));
            $beginIndex$iv$iv = 0;
            $endIndex$iv$iv = 64;
            $endIndex$iv$iv = o__SegmentedByteString_resolveDefaultParameter($this, $endIndex$iv$iv);
            if (!($endIndex$iv$iv > $rt_nullCheck(o_ByteString_getData$okio($this)).data.length ? 0 : 1)) {
                var$1 = $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(58))).$append4($rt_nullCheck(o_ByteString_getData$okio($this)).data.length)).$append0(41)).$toString();
                $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$1).$toString()));
            }
            $subLen$iv$iv = $endIndex$iv$iv - $beginIndex$iv$iv | 0;
            if (!($subLen$iv$iv < 0 ? 0 : 1))
                $rt_throw(jl_IllegalArgumentException__init_($rt_s(59).$toString()));
            var$4 = $endIndex$iv$iv == $rt_nullCheck(o_ByteString_getData$okio($this)).data.length ? $this : o_ByteString__init_0(kc_ArraysKt___ArraysJvmKt_copyOfRange(o_ByteString_getData$okio($this), $beginIndex$iv$iv, $endIndex$iv$iv));
            var$1 = $rt_nullCheck($rt_nullCheck($rt_nullCheck(var$1).$append3(var$4.$hex())).$append3($rt_s(55))).$toString();
        }
    }
    return var$1;
},
o_ByteString_of = $data => {
    o_ByteString_$callClinit();
    return o_ByteString$Companion_of($rt_nullCheck(o_ByteString_Companion), $data);
},
o_ByteString__clinit_ = () => {
    o_ByteString_Companion = o_ByteString$Companion__init_1(null);
    o_ByteString_EMPTY = o_ByteString__init_0($rt_createByteArray(0));
};
function o_SegmentedByteString() {
    let a = this; o_ByteString.call(a);
    a.$segments = null;
    a.$directory = null;
}
let o_SegmentedByteString__init_ = ($this, $segments, $directory) => {
    kji_Intrinsics_checkNotNullParameter($segments, $rt_s(60));
    kji_Intrinsics_checkNotNullParameter($directory, $rt_s(61));
    o_ByteString_$callClinit();
    o_ByteString__init_($this, o_ByteString_getData$okio($rt_nullCheck(o_ByteString_EMPTY)));
    $this.$segments = $segments;
    $this.$directory = $directory;
},
o_SegmentedByteString__init_0 = (var_0, var_1) => {
    let var_2 = new o_SegmentedByteString();
    o_SegmentedByteString__init_(var_2, var_0, var_1);
    return var_2;
},
o_SegmentedByteString_getSegments$okio = $this => {
    return $this.$segments;
},
o_SegmentedByteString_getDirectory$okio = $this => {
    return $this.$directory;
},
o_SegmentedByteString_hex = $this => {
    return $rt_nullCheck(o_SegmentedByteString_toByteString($this)).$hex();
},
o_SegmentedByteString_getSize$okio = $this => {
    let var$1, var$2;
    var$1 = o_SegmentedByteString_getDirectory$okio($this);
    var$2 = $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($this), $rt_arraycls(jl_Object))).data.length - 1 | 0;
    var$1 = $rt_nullCheck(var$1).data;
    var$2 = var$1[$rt_checkBounds(var$2, var$1)];
    return var$2;
},
o_SegmentedByteString_toByteArray = $this => {
    let $result$iv, $resultPos$iv, $segmentCount$iv$iv, $s$iv$iv, $pos$iv$iv, var$6, var$7, $segmentPos$iv$iv, $pos$iv$iv_0, $data$iv, $byteCount$iv, var$12;
    $result$iv = $rt_createByteArray(o_ByteString_size($this));
    $resultPos$iv = 0;
    $segmentCount$iv$iv = $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($this), $rt_arraycls(jl_Object))).data.length;
    $s$iv$iv = 0;
    $pos$iv$iv = 0;
    while ($s$iv$iv < $segmentCount$iv$iv) {
        var$6 = o_SegmentedByteString_getDirectory$okio($this);
        var$7 = $segmentCount$iv$iv + $s$iv$iv | 0;
        var$6 = $rt_nullCheck(var$6).data;
        $segmentPos$iv$iv = var$6[$rt_checkBounds(var$7, var$6)];
        var$6 = $rt_nullCheck(o_SegmentedByteString_getDirectory$okio($this)).data;
        var$7 = $rt_checkBounds($s$iv$iv, var$6);
        $pos$iv$iv_0 = var$6[var$7];
        var$6 = $rt_nullCheck(o_SegmentedByteString_getSegments$okio($this)).data;
        var$7 = $rt_checkUpperBound(var$7, var$6);
        $data$iv = var$6[var$7];
        $byteCount$iv = $pos$iv$iv_0 - $pos$iv$iv | 0;
        var$12 = $segmentPos$iv$iv + $byteCount$iv | 0;
        kc_ArraysKt___ArraysJvmKt_copyInto($data$iv, $result$iv, $resultPos$iv, $segmentPos$iv$iv, var$12);
        $resultPos$iv = $resultPos$iv + $byteCount$iv | 0;
        $s$iv$iv = var$7 + 1 | 0;
        $pos$iv$iv = $pos$iv$iv_0;
    }
    return $result$iv;
},
o_SegmentedByteString_write$okio = ($this, $buffer, $pos$iv$iv, $byteCount) => {
    let $endIndex$iv$iv, $s$iv$iv, $segmentOffset$iv$iv, var$7, var$8, var$9, $segmentSize$iv$iv, $segmentPos$iv$iv, $byteCount$iv$iv, $offset$iv$iv, $data$iv, $segment$iv, var$16;
    kji_Intrinsics_checkNotNullParameter($buffer, $rt_s(41));
    $endIndex$iv$iv = $pos$iv$iv + $byteCount | 0;
    $s$iv$iv = oi__SegmentedByteString_segment($this, $pos$iv$iv);
    while ($pos$iv$iv < $endIndex$iv$iv) {
        if (!$s$iv$iv)
            $segmentOffset$iv$iv = 0;
        else {
            var$7 = o_SegmentedByteString_getDirectory$okio($this);
            var$8 = $s$iv$iv - 1 | 0;
            var$7 = $rt_nullCheck(var$7).data;
            $segmentOffset$iv$iv = var$7[$rt_checkBounds(var$8, var$7)];
        }
        var$7 = $rt_nullCheck(o_SegmentedByteString_getDirectory$okio($this)).data;
        var$9 = $rt_checkBounds($s$iv$iv, var$7);
        $segmentSize$iv$iv = var$7[var$9] - $segmentOffset$iv$iv | 0;
        var$7 = o_SegmentedByteString_getDirectory$okio($this);
        var$8 = $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($this), $rt_arraycls(jl_Object))).data.length + var$9 | 0;
        var$7 = $rt_nullCheck(var$7).data;
        $segmentPos$iv$iv = var$7[$rt_checkBounds(var$8, var$7)];
        $byteCount$iv$iv = jl_Math_min($endIndex$iv$iv, $segmentOffset$iv$iv + $segmentSize$iv$iv | 0) - $pos$iv$iv | 0;
        $offset$iv$iv = $segmentPos$iv$iv + ($pos$iv$iv - $segmentOffset$iv$iv | 0) | 0;
        var$7 = $rt_nullCheck(o_SegmentedByteString_getSegments$okio($this)).data;
        var$8 = $rt_checkUpperBound(var$9, var$7);
        $data$iv = var$7[var$8];
        $segment$iv = o_Segment__init_($data$iv, $offset$iv$iv, $offset$iv$iv + $byteCount$iv$iv | 0, 1, 0);
        $buffer = $rt_nullCheck($buffer);
        if ($buffer.$head === null) {
            $segment$iv.$prev = $segment$iv;
            $segment$iv.$next2 = $segment$iv.$prev;
            $buffer.$head = $segment$iv.$next2;
        } else {
            var$16 = $buffer.$head;
            kji_Intrinsics_checkNotNull(var$16);
            var$16 = $rt_nullCheck(var$16).$prev;
            kji_Intrinsics_checkNotNull(var$16);
            o_Segment_push($rt_nullCheck(var$16), $segment$iv);
        }
        $pos$iv$iv = $pos$iv$iv + $byteCount$iv$iv | 0;
        $s$iv$iv = var$8 + 1 | 0;
    }
    $buffer = $rt_nullCheck($buffer);
    o_Buffer_setSize$okio($buffer, Long_add(o_Buffer_size($buffer), Long_fromInt($byteCount)));
},
o_SegmentedByteString_rangeEquals = ($this, $pos$iv$iv, $other, $otherOffset, $byteCount) => {
    let $endIndex$iv$iv, $s$iv$iv, $segmentOffset$iv$iv, var$8, var$9, var$10, $segmentSize$iv$iv, $segmentPos$iv$iv, $byteCount$iv$iv, $offset$iv$iv, $data$iv;
    a: {
        kji_Intrinsics_checkNotNullParameter($other, $rt_s(42));
        if ($pos$iv$iv >= 0 && $pos$iv$iv <= (o_ByteString_size($this) - $byteCount | 0)) {
            $endIndex$iv$iv = $pos$iv$iv + $byteCount | 0;
            $s$iv$iv = oi__SegmentedByteString_segment($this, $pos$iv$iv);
            while ($pos$iv$iv < $endIndex$iv$iv) {
                if (!$s$iv$iv)
                    $segmentOffset$iv$iv = 0;
                else {
                    var$8 = o_SegmentedByteString_getDirectory$okio($this);
                    var$9 = $s$iv$iv - 1 | 0;
                    var$8 = $rt_nullCheck(var$8).data;
                    $segmentOffset$iv$iv = var$8[$rt_checkBounds(var$9, var$8)];
                }
                var$8 = $rt_nullCheck(o_SegmentedByteString_getDirectory$okio($this)).data;
                var$10 = $rt_checkBounds($s$iv$iv, var$8);
                $segmentSize$iv$iv = var$8[var$10] - $segmentOffset$iv$iv | 0;
                var$8 = o_SegmentedByteString_getDirectory$okio($this);
                var$9 = $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($this), $rt_arraycls(jl_Object))).data.length + var$10 | 0;
                var$8 = $rt_nullCheck(var$8).data;
                $segmentPos$iv$iv = var$8[$rt_checkBounds(var$9, var$8)];
                $byteCount$iv$iv = jl_Math_min($endIndex$iv$iv, $segmentOffset$iv$iv + $segmentSize$iv$iv | 0) - $pos$iv$iv | 0;
                $offset$iv$iv = $segmentPos$iv$iv + ($pos$iv$iv - $segmentOffset$iv$iv | 0) | 0;
                var$8 = $rt_nullCheck(o_SegmentedByteString_getSegments$okio($this)).data;
                var$10 = $rt_checkUpperBound(var$10, var$8);
                $data$iv = var$8[var$10];
                $other = $rt_nullCheck($other);
                if (!$other.$rangeEquals($otherOffset, $data$iv, $offset$iv$iv, $byteCount$iv$iv)) {
                    var$9 = 0;
                    break a;
                }
                $otherOffset = $otherOffset + $byteCount$iv$iv | 0;
                $pos$iv$iv = $pos$iv$iv + $byteCount$iv$iv | 0;
                $s$iv$iv = var$10 + 1 | 0;
            }
            var$9 = 1;
        } else
            var$9 = 0;
    }
    return var$9;
},
o_SegmentedByteString_rangeEquals0 = ($this, $pos$iv$iv, $other, $otherOffset, $byteCount) => {
    let $endIndex$iv$iv, $s$iv$iv, $segmentOffset$iv$iv, var$8, var$9, var$10, $segmentSize$iv$iv, $segmentPos$iv$iv, $byteCount$iv$iv, $offset$iv$iv, $data$iv;
    a: {
        kji_Intrinsics_checkNotNullParameter($other, $rt_s(42));
        if ($pos$iv$iv >= 0 && $pos$iv$iv <= (o_ByteString_size($this) - $byteCount | 0) && $otherOffset >= 0) {
            $other = $rt_nullCheck($other);
            if ($otherOffset <= ($other.data.length - $byteCount | 0)) {
                $endIndex$iv$iv = $pos$iv$iv + $byteCount | 0;
                $s$iv$iv = oi__SegmentedByteString_segment($this, $pos$iv$iv);
                while ($pos$iv$iv < $endIndex$iv$iv) {
                    if (!$s$iv$iv)
                        $segmentOffset$iv$iv = 0;
                    else {
                        var$8 = o_SegmentedByteString_getDirectory$okio($this);
                        var$9 = $s$iv$iv - 1 | 0;
                        var$8 = $rt_nullCheck(var$8).data;
                        $segmentOffset$iv$iv = var$8[$rt_checkBounds(var$9, var$8)];
                    }
                    var$8 = $rt_nullCheck(o_SegmentedByteString_getDirectory$okio($this)).data;
                    var$10 = $rt_checkBounds($s$iv$iv, var$8);
                    $segmentSize$iv$iv = var$8[var$10] - $segmentOffset$iv$iv | 0;
                    var$8 = o_SegmentedByteString_getDirectory$okio($this);
                    var$9 = $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($this), $rt_arraycls(jl_Object))).data.length + var$10 | 0;
                    var$8 = $rt_nullCheck(var$8).data;
                    $segmentPos$iv$iv = var$8[$rt_checkBounds(var$9, var$8)];
                    $byteCount$iv$iv = jl_Math_min($endIndex$iv$iv, $segmentOffset$iv$iv + $segmentSize$iv$iv | 0) - $pos$iv$iv | 0;
                    $offset$iv$iv = $segmentPos$iv$iv + ($pos$iv$iv - $segmentOffset$iv$iv | 0) | 0;
                    var$8 = $rt_nullCheck(o_SegmentedByteString_getSegments$okio($this)).data;
                    var$10 = $rt_checkUpperBound(var$10, var$8);
                    $data$iv = var$8[var$10];
                    if (!o__SegmentedByteString_arrayRangeEquals($data$iv, $offset$iv$iv, $other, $otherOffset, $byteCount$iv$iv)) {
                        var$9 = 0;
                        break a;
                    }
                    $otherOffset = $otherOffset + $byteCount$iv$iv | 0;
                    $pos$iv$iv = $pos$iv$iv + $byteCount$iv$iv | 0;
                    $s$iv$iv = var$10 + 1 | 0;
                }
                var$9 = 1;
                break a;
            }
        }
        var$9 = 0;
    }
    return var$9;
},
o_SegmentedByteString_copyInto = ($this, $pos$iv$iv, $target, $targetOffset, $byteCount) => {
    let var$5, var$6, var$7, $endIndex$iv$iv, $s$iv$iv, $segmentOffset$iv$iv, var$11, var$12, var$13, $segmentSize$iv$iv, var$15, $segmentPos$iv$iv, $byteCount$iv$iv, $offset$iv$iv, $data$iv;
    kji_Intrinsics_checkNotNullParameter($target, $rt_s(43));
    var$5 = Long_fromInt(o_ByteString_size($this));
    var$6 = Long_fromInt($pos$iv$iv);
    var$7 = Long_fromInt($byteCount);
    o__SegmentedByteString_checkOffsetAndCount(var$5, var$6, var$7);
    $target = $rt_nullCheck($target);
    o__SegmentedByteString_checkOffsetAndCount(Long_fromInt($target.data.length), Long_fromInt($targetOffset), var$7);
    $endIndex$iv$iv = $pos$iv$iv + $byteCount | 0;
    $s$iv$iv = oi__SegmentedByteString_segment($this, $pos$iv$iv);
    while ($pos$iv$iv < $endIndex$iv$iv) {
        if (!$s$iv$iv)
            $segmentOffset$iv$iv = 0;
        else {
            var$11 = o_SegmentedByteString_getDirectory$okio($this);
            var$12 = $s$iv$iv - 1 | 0;
            var$11 = $rt_nullCheck(var$11).data;
            $segmentOffset$iv$iv = var$11[$rt_checkBounds(var$12, var$11)];
        }
        var$11 = $rt_nullCheck(o_SegmentedByteString_getDirectory$okio($this)).data;
        var$13 = $rt_checkBounds($s$iv$iv, var$11);
        $segmentSize$iv$iv = var$11[var$13] - $segmentOffset$iv$iv | 0;
        var$15 = o_SegmentedByteString_getDirectory$okio($this);
        var$12 = $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($this), $rt_arraycls(jl_Object))).data.length + var$13 | 0;
        var$11 = $rt_nullCheck(var$15).data;
        $segmentPos$iv$iv = var$11[$rt_checkBounds(var$12, var$11)];
        $byteCount$iv$iv = jl_Math_min($endIndex$iv$iv, $segmentOffset$iv$iv + $segmentSize$iv$iv | 0) - $pos$iv$iv | 0;
        $offset$iv$iv = $segmentPos$iv$iv + ($pos$iv$iv - $segmentOffset$iv$iv | 0) | 0;
        var$11 = $rt_nullCheck(o_SegmentedByteString_getSegments$okio($this)).data;
        var$13 = $rt_checkUpperBound(var$13, var$11);
        $data$iv = var$11[var$13];
        kc_ArraysKt___ArraysJvmKt_copyInto($data$iv, $target, $targetOffset, $offset$iv$iv, $offset$iv$iv + $byteCount$iv$iv | 0);
        $targetOffset = $targetOffset + $byteCount$iv$iv | 0;
        $pos$iv$iv = $pos$iv$iv + $byteCount$iv$iv | 0;
        $s$iv$iv = var$13 + 1 | 0;
    }
},
o_SegmentedByteString_toByteString = $this => {
    return o_ByteString__init_0(o_SegmentedByteString_toByteArray($this));
},
o_SegmentedByteString_internalArray$okio = $this => {
    return o_SegmentedByteString_toByteArray($this);
},
o_SegmentedByteString_equals = ($this, $other) => {
    let var$2, var$3;
    if ($other === $this)
        var$2 = 1;
    else if (!($other instanceof o_ByteString))
        var$2 = 0;
    else {
        var$3 = $rt_nullCheck($rt_castToClass($other, o_ByteString));
        var$2 = o_ByteString_size(var$3) == o_ByteString_size($this) && o_SegmentedByteString_rangeEquals($this, 0, var$3, 0, o_ByteString_size($this)) ? 1 : 0;
    }
    return var$2;
},
o_SegmentedByteString_toString = $this => {
    return $rt_nullCheck(o_SegmentedByteString_toByteString($this)).$toString();
},
o_Source = $rt_classWithoutFields(0),
jnc_ReadableByteChannel = $rt_classWithoutFields(0),
o_BufferedSource = $rt_classWithoutFields(0);
function jn_ByteOrder() {
    jl_Object.call(this);
    this.$name11 = null;
}
let jn_ByteOrder_BIG_ENDIAN = null,
jn_ByteOrder_LITTLE_ENDIAN = null,
jn_ByteOrder_$callClinit = () => {
    jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
    jn_ByteOrder__clinit_();
},
jn_ByteOrder__init_0 = ($this, $name) => {
    jn_ByteOrder_$callClinit();
    jl_Object__init_($this);
    $this.$name11 = $name;
},
jn_ByteOrder__init_ = var_0 => {
    let var_1 = new jn_ByteOrder();
    jn_ByteOrder__init_0(var_1, var_0);
    return var_1;
},
jn_ByteOrder__clinit_ = () => {
    jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(62));
    jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(63));
},
k_Unit = $rt_classWithoutFields(),
csw_ProtoAdapterKt$commonSint64$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonSint64$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Long_valueOf(Long_ZERO);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonSint64$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonSint64$1();
    csw_ProtoAdapterKt$commonSint64$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonSint64$1_encode = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    csw_ProtoWriter_$callClinit();
    var$3 = csw_ProtoWriter$Companion_encodeZigZag64$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint64($writer, var$3);
},
csw_ProtoAdapterKt$commonSint64$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonSint64$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
};
function csw_ReverseProtoWriter() {
    let a = this; jl_Object.call(a);
    a.$tail0 = null;
    a.$head1 = null;
    a.$cursor = null;
    a.$array1 = null;
    a.$arrayLimit = 0;
    a.$forwardBuffer$delegate = null;
    a.$forwardWriter$delegate = null;
}
let csw_ReverseProtoWriter_Companion = null,
csw_ReverseProtoWriter_EMPTY_ARRAY = null,
csw_ReverseProtoWriter_$callClinit = () => {
    csw_ReverseProtoWriter_$callClinit = $rt_eraseClinit(csw_ReverseProtoWriter);
    csw_ReverseProtoWriter__clinit_();
},
csw_ReverseProtoWriter__init_ = $this => {
    let var$1;
    csw_ReverseProtoWriter_$callClinit();
    jl_Object__init_($this);
    $this.$tail0 = o_Buffer__init_();
    $this.$head1 = o_Buffer__init_();
    $this.$cursor = o_Buffer$UnsafeCursor__init_();
    $this.$array1 = csw_ReverseProtoWriter_EMPTY_ARRAY;
    k_LazyThreadSafetyMode_$callClinit();
    var$1 = k_LazyThreadSafetyMode_NONE;
    csw_ReverseProtoWriter$forwardBuffer$2_$callClinit();
    $this.$forwardBuffer$delegate = k_LazyKt__LazyJVMKt_lazy(var$1, $rt_castToInterface(csw_ReverseProtoWriter$forwardBuffer$2_INSTANCE, kjf_Function0));
    $this.$forwardWriter$delegate = k_LazyKt__LazyJVMKt_lazy(k_LazyThreadSafetyMode_NONE, $rt_castToInterface(csw_ReverseProtoWriter$forwardWriter$2__init_0($this), kjf_Function0));
},
csw_ReverseProtoWriter__init_0 = () => {
    let var_0 = new csw_ReverseProtoWriter();
    csw_ReverseProtoWriter__init_(var_0);
    return var_0;
},
csw_ReverseProtoWriter_getByteCount = $this => {
    return Long_lo((o_Buffer_size($rt_nullCheck($this.$tail0)))) + ($rt_nullCheck($this.$array1).data.length - $this.$arrayLimit | 0) | 0;
},
csw_ReverseProtoWriter_writeTo = ($this, $sink) => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    csw_ReverseProtoWriter_emitCurrentSegment($this);
    var$2 = $rt_castToInterface($this.$tail0, o_Source);
    $sink = $rt_nullCheck($sink);
    $sink.$writeAll(var$2);
},
csw_ReverseProtoWriter_require = ($this, $minByteCount) => {
    let var$2, var$3;
    if ($this.$arrayLimit >= $minByteCount)
        return;
    a: {
        csw_ReverseProtoWriter_emitCurrentSegment($this);
        o_Buffer_readAndWriteUnsafe($rt_nullCheck($this.$head1), $this.$cursor);
        o_Buffer$UnsafeCursor_expandBuffer($rt_nullCheck($this.$cursor), $minByteCount);
        if (Long_eq($rt_nullCheck($this.$cursor).$offset, Long_ZERO)) {
            var$2 = $rt_nullCheck($this.$cursor).$end;
            var$3 = $rt_nullCheck($this.$cursor).$data0;
            kji_Intrinsics_checkNotNull(var$3);
            if (var$2 == $rt_nullCheck(var$3).data.length) {
                var$2 = 1;
                break a;
            }
        }
        var$2 = 0;
    }
    if (!var$2)
        $rt_throw(jl_IllegalStateException__init_($rt_s(64).$toString()));
    var$3 = $rt_nullCheck($this.$cursor).$data0;
    kji_Intrinsics_checkNotNull(var$3);
    $this.$array1 = var$3;
    $this.$arrayLimit = $rt_nullCheck($this.$cursor).$end;
},
csw_ReverseProtoWriter_emitCurrentSegment = $this => {
    let var$1, var$2, var$3, var$4, $swap;
    var$1 = $this.$array1;
    csw_ReverseProtoWriter_$callClinit();
    if (var$1 === csw_ReverseProtoWriter_EMPTY_ARRAY)
        return;
    o_Buffer$UnsafeCursor_close($rt_nullCheck($this.$cursor));
    var$2 = $this.$head1;
    var$3 = Long_fromInt($this.$arrayLimit);
    o_Buffer_skip($rt_nullCheck(var$2), var$3);
    var$2 = $this.$head1;
    var$4 = $rt_castToInterface($this.$tail0, o_Source);
    o_Buffer_writeAll($rt_nullCheck(var$2), var$4);
    $swap = $this.$tail0;
    $this.$tail0 = $this.$head1;
    $this.$head1 = $swap;
    $this.$array1 = csw_ReverseProtoWriter_EMPTY_ARRAY;
    $this.$arrayLimit = 0;
},
csw_ReverseProtoWriter_writeBytes = ($this, $value) => {
    let $valueLimit, $copyByteCount;
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    $valueLimit = o_ByteString_size($value);
    while ($valueLimit) {
        csw_ReverseProtoWriter_require($this, 1);
        $copyByteCount = jl_Math_min($this.$arrayLimit, $valueLimit);
        $this.$arrayLimit = $this.$arrayLimit - $copyByteCount | 0;
        $valueLimit = $valueLimit - $copyByteCount | 0;
        $value.$copyInto0($valueLimit, $this.$array1, $this.$arrayLimit, $copyByteCount);
    }
},
csw_ReverseProtoWriter_writeString = ($this, $value) => {
    let $i, $i_0, $c, $localArrayLimit, $localArray, var$7, var$8, var$9, var$10, $runLimit, $d, $high, $codePoint;
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    $i = $value.$length() - 1 | 0;
    while ($i >= 0) {
        $i_0 = $i + (-1) | 0;
        $c = $value.$charAt($i);
        if ($c < 128) {
            csw_ReverseProtoWriter_require($this, 1);
            $localArrayLimit = $this.$arrayLimit;
            $localArray = $this.$array1;
            var$7 = $localArrayLimit + (-1) | 0;
            var$8 = $c << 24 >> 24;
            $localArray = $rt_nullCheck($localArray);
            var$9 = $localArray.data;
            var$10 = $rt_checkBounds(var$7, var$9);
            var$9[var$10] = var$8;
            $runLimit = jl_Math_max((-1), $i_0 - var$10 | 0);
            while ($i_0 > $runLimit) {
                $d = $value.$charAt($i_0);
                if ($d >= 128)
                    break;
                $i_0 = $i_0 + (-1) | 0;
                var$7 = var$10 + (-1) | 0;
                var$8 = $d << 24 >> 24;
                var$10 = $rt_checkBounds(var$7, var$9);
                var$9[var$10] = var$8;
            }
            $this.$arrayLimit = var$10;
            $i = $i_0;
            continue;
        }
        if ($c < 2048) {
            csw_ReverseProtoWriter_require($this, 2);
            var$9 = $this.$array1;
            $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
            var$7 = $this.$arrayLimit;
            var$8 = ($c & 63 | 128) << 24 >> 24;
            var$9 = $rt_nullCheck(var$9).data;
            var$9[$rt_checkBounds(var$7, var$9)] = var$8;
            var$9 = $this.$array1;
            $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
            var$7 = $this.$arrayLimit;
            var$8 = ($c >> 6 | 192) << 24 >> 24;
            var$9 = $rt_nullCheck(var$9).data;
            var$9[$rt_checkBounds(var$7, var$9)] = var$8;
            $i = $i_0;
            continue;
        }
        if ($c >= 55296 && $c <= 57343) {
            $high = $i_0 < 0 ? 2147483647 : $value.$charAt($i_0);
            if ($high <= 56319 && (56320 > $c ? 0 : $c >= 57344 ? 0 : 1)) {
                $i = $i_0 + (-1) | 0;
                $codePoint = 65536 + (($high & 1023) << 10 | $c & 1023) | 0;
                csw_ReverseProtoWriter_require($this, 4);
                var$9 = $this.$array1;
                $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
                var$7 = $this.$arrayLimit;
                var$8 = ($codePoint & 63 | 128) << 24 >> 24;
                var$9 = $rt_nullCheck(var$9).data;
                var$9[$rt_checkBounds(var$7, var$9)] = var$8;
                var$9 = $this.$array1;
                $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
                var$7 = $this.$arrayLimit;
                var$8 = ($codePoint >> 6 & 63 | 128) << 24 >> 24;
                var$9 = $rt_nullCheck(var$9).data;
                var$9[$rt_checkBounds(var$7, var$9)] = var$8;
                var$9 = $this.$array1;
                $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
                var$7 = $this.$arrayLimit;
                var$8 = ($codePoint >> 12 & 63 | 128) << 24 >> 24;
                var$9 = $rt_nullCheck(var$9).data;
                var$9[$rt_checkBounds(var$7, var$9)] = var$8;
                var$9 = $this.$array1;
                $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
                var$7 = $this.$arrayLimit;
                var$8 = ($codePoint >> 18 | 240) << 24 >> 24;
                var$9 = $rt_nullCheck(var$9).data;
                var$9[$rt_checkBounds(var$7, var$9)] = var$8;
                continue;
            }
            csw_ReverseProtoWriter_require($this, 1);
            var$9 = $this.$array1;
            $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
            var$7 = $this.$arrayLimit;
            var$9 = $rt_nullCheck(var$9).data;
            var$9[$rt_checkBounds(var$7, var$9)] = 63;
            $i = $i_0;
            continue;
        }
        csw_ReverseProtoWriter_require($this, 3);
        var$9 = $this.$array1;
        $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
        var$7 = $this.$arrayLimit;
        var$8 = ($c & 63 | 128) << 24 >> 24;
        var$9 = $rt_nullCheck(var$9).data;
        var$9[$rt_checkBounds(var$7, var$9)] = var$8;
        var$9 = $this.$array1;
        $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
        var$7 = $this.$arrayLimit;
        var$8 = ($c >> 6 & 63 | 128) << 24 >> 24;
        var$9 = $rt_nullCheck(var$9).data;
        var$9[$rt_checkBounds(var$7, var$9)] = var$8;
        var$9 = $this.$array1;
        $this.$arrayLimit = $this.$arrayLimit + (-1) | 0;
        var$7 = $this.$arrayLimit;
        var$8 = ($c >> 12 | 224) << 24 >> 24;
        var$9 = $rt_nullCheck(var$9).data;
        var$9[$rt_checkBounds(var$7, var$9)] = var$8;
        $i = $i_0;
    }
},
csw_ReverseProtoWriter_writeTag = ($this, $fieldNumber, $fieldEncoding) => {
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    csw_ProtoWriter_$callClinit();
    csw_ReverseProtoWriter_writeVarint32($this, csw_ProtoWriter$Companion_makeTag$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $fieldNumber, $fieldEncoding));
},
csw_ReverseProtoWriter_writeSignedVarint32$wire_runtime = ($this, $value) => {
    if ($value >= 0)
        csw_ReverseProtoWriter_writeVarint32($this, $value);
    else
        csw_ReverseProtoWriter_writeVarint64($this, Long_fromInt($value));
},
csw_ReverseProtoWriter_writeVarint32 = ($this, $value) => {
    let $varint32Size, $offset, var$4, var$5, var$6;
    csw_ProtoWriter_$callClinit();
    $varint32Size = csw_ProtoWriter$Companion_varint32Size$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $value);
    csw_ReverseProtoWriter_require($this, $varint32Size);
    $this.$arrayLimit = $this.$arrayLimit - $varint32Size | 0;
    $offset = $this.$arrayLimit;
    while ($value & (-128)) {
        var$4 = $this.$array1;
        var$5 = $offset + 1 | 0;
        var$6 = ($value & 127 | 128) << 24 >> 24;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds($offset, var$4)] = var$6;
        $value = $value >>> 7 | 0;
        $offset = var$5;
    }
    var$4 = $this.$array1;
    var$6 = $value << 24 >> 24;
    var$4 = $rt_nullCheck(var$4).data;
    var$4[$rt_checkBounds($offset, var$4)] = var$6;
},
csw_ReverseProtoWriter_writeVarint64 = ($this, $value) => {
    let $varint64Size, $offset, var$4, var$5, var$6;
    csw_ProtoWriter_$callClinit();
    $varint64Size = csw_ProtoWriter$Companion_varint64Size$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $value);
    csw_ReverseProtoWriter_require($this, $varint64Size);
    $this.$arrayLimit = $this.$arrayLimit - $varint64Size | 0;
    $offset = $this.$arrayLimit;
    while (Long_ne(Long_and($value, Long_fromInt(-128)), Long_ZERO)) {
        var$4 = $this.$array1;
        var$5 = $offset + 1 | 0;
        var$6 = Long_lo(Long_or(Long_and($value, Long_fromInt(127)), Long_fromInt(128))) << 24 >> 24;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds($offset, var$4)] = var$6;
        $value = Long_shru($value, 7);
        $offset = var$5;
    }
    var$4 = $this.$array1;
    var$5 = Long_lo($value) << 24 >> 24;
    var$4 = $rt_nullCheck(var$4).data;
    var$4[$rt_checkBounds($offset, var$4)] = var$5;
},
csw_ReverseProtoWriter_writeFixed32 = ($this, $value) => {
    let $offset, var$3, var$4, var$5, var$6;
    csw_ReverseProtoWriter_require($this, 4);
    $this.$arrayLimit = $this.$arrayLimit - 4 | 0;
    $offset = $this.$arrayLimit;
    var$3 = $this.$array1;
    var$4 = $offset + 1 | 0;
    var$5 = ($value & 255) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    $offset = $rt_checkBounds($offset, var$3);
    var$3[$offset] = var$5;
    var$3 = $this.$array1;
    var$5 = var$4 + 1 | 0;
    var$6 = (($value >>> 8 | 0) & 255) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$6;
    var$3 = $this.$array1;
    var$4 = var$5 + 1 | 0;
    var$6 = (($value >>> 16 | 0) & 255) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$5, var$3)] = var$6;
    var$3 = $this.$array1;
    var$5 = (($value >>> 24 | 0) & 255) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$5;
},
csw_ReverseProtoWriter_writeFixed64 = ($this, $value) => {
    let $offset, var$3, var$4, var$5, var$6;
    csw_ReverseProtoWriter_require($this, 8);
    $this.$arrayLimit = $this.$arrayLimit - 8 | 0;
    $offset = $this.$arrayLimit;
    var$3 = $this.$array1;
    var$4 = $offset + 1 | 0;
    var$5 = Long_lo(Long_and($value, Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    $offset = $rt_checkBounds($offset, var$3);
    var$3[$offset] = var$5;
    var$3 = $this.$array1;
    var$5 = var$4 + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($value, 8), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$6;
    var$3 = $this.$array1;
    var$4 = var$5 + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($value, 16), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$5, var$3)] = var$6;
    var$3 = $this.$array1;
    var$5 = var$4 + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($value, 24), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$6;
    var$3 = $this.$array1;
    var$4 = var$5 + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($value, 32), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$5, var$3)] = var$6;
    var$3 = $this.$array1;
    var$5 = var$4 + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($value, 40), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$6;
    var$3 = $this.$array1;
    var$4 = var$5 + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($value, 48), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$5, var$3)] = var$6;
    var$3 = $this.$array1;
    var$5 = Long_lo(Long_and(Long_shru($value, 56), Long_fromInt(255))) << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$5;
},
csw_ReverseProtoWriter__clinit_ = () => {
    csw_ReverseProtoWriter_Companion = csw_ReverseProtoWriter$Companion__init_1(null);
    csw_ReverseProtoWriter_EMPTY_ARRAY = $rt_createByteArray(0);
};
function oj_ComparisonFailure$ComparisonCompactor$DiffExtractor() {
    let a = this; jl_Object.call(a);
    a.$sharedPrefix0 = null;
    a.$sharedSuffix0 = null;
    a.$this$0 = null;
}
let oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_0 = ($this, var$1) => {
    $this.$this$0 = var$1;
    jl_Object__init_($this);
    $this.$sharedPrefix0 = oj_ComparisonFailure$ComparisonCompactor_access$100(var$1);
    $this.$sharedSuffix0 = oj_ComparisonFailure$ComparisonCompactor_access$200(var$1, $this.$sharedPrefix0);
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_2 = var_0 => {
    let var_1 = new oj_ComparisonFailure$ComparisonCompactor$DiffExtractor();
    oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_0(var_1, var_0);
    return var_1;
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_expectedDiff = $this => {
    return oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_extractDiff($this, oj_ComparisonFailure$ComparisonCompactor_access$300($this.$this$0));
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_actualDiff = $this => {
    return oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_extractDiff($this, oj_ComparisonFailure$ComparisonCompactor_access$400($this.$this$0));
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactPrefix = $this => {
    if ($rt_nullCheck($this.$sharedPrefix0).$length() <= oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0))
        return $this.$sharedPrefix0;
    return $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(65))).$append3($rt_nullCheck($this.$sharedPrefix0).$substring0($rt_nullCheck($this.$sharedPrefix0).$length() - oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0) | 0))).$toString();
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactSuffix = $this => {
    if ($rt_nullCheck($this.$sharedSuffix0).$length() <= oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0))
        return $this.$sharedSuffix0;
    return $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_nullCheck($this.$sharedSuffix0).$substring(0, oj_ComparisonFailure$ComparisonCompactor_access$500($this.$this$0)))).$append3($rt_s(65))).$toString();
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_extractDiff = ($this, $source) => {
    let var$2, var$3;
    var$2 = (jl_StringBuilder__init_()).$append3($rt_s(66));
    var$3 = $rt_nullCheck($this.$sharedPrefix0).$length();
    $source = $rt_nullCheck($source);
    return $rt_nullCheck($rt_nullCheck($rt_nullCheck(var$2).$append3($source.$substring(var$3, $source.$length() - $rt_nullCheck($this.$sharedSuffix0).$length() | 0))).$append3($rt_s(67))).$toString();
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_ = ($this, $x0, $x1) => {
    oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_0($this, $x0);
},
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_1 = (var_0, var_1) => {
    let var_2 = new oj_ComparisonFailure$ComparisonCompactor$DiffExtractor();
    oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_(var_2, var_0, var_1);
    return var_2;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name10 = null;
    a.$ordinal0 = 0;
}
let jl_Enum__init_ = ($this, $name, $ordinal) => {
    jl_Object__init_($this);
    $this.$name10 = $name;
    $this.$ordinal0 = $ordinal;
},
jl_Enum_ordinal = $this => {
    return $this.$ordinal0;
},
jl_Enum_toString = $this => {
    return $rt_nullCheck($this.$name10).$toString();
},
jl_Enum_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
k_LazyThreadSafetyMode = $rt_classWithoutFields(jl_Enum),
k_LazyThreadSafetyMode_SYNCHRONIZED = null,
k_LazyThreadSafetyMode_PUBLICATION = null,
k_LazyThreadSafetyMode_NONE = null,
k_LazyThreadSafetyMode_$VALUES = null,
k_LazyThreadSafetyMode_$ENTRIES = null,
k_LazyThreadSafetyMode_$callClinit = () => {
    k_LazyThreadSafetyMode_$callClinit = $rt_eraseClinit(k_LazyThreadSafetyMode);
    k_LazyThreadSafetyMode__clinit_();
},
k_LazyThreadSafetyMode__init_0 = ($this, $$enum$name, $$enum$ordinal) => {
    k_LazyThreadSafetyMode_$callClinit();
    jl_Enum__init_($this, $$enum$name, $$enum$ordinal);
},
k_LazyThreadSafetyMode__init_ = (var_0, var_1) => {
    let var_2 = new k_LazyThreadSafetyMode();
    k_LazyThreadSafetyMode__init_0(var_2, var_0, var_1);
    return var_2;
},
k_LazyThreadSafetyMode_values = () => {
    k_LazyThreadSafetyMode_$callClinit();
    return $rt_castToInterface($rt_nullCheck(k_LazyThreadSafetyMode_$VALUES).$clone0(), $rt_arraycls(k_LazyThreadSafetyMode));
},
k_LazyThreadSafetyMode_$values = () => {
    let var$1, var$2;
    k_LazyThreadSafetyMode_$callClinit();
    var$1 = $rt_createArray(k_LazyThreadSafetyMode, 3);
    var$2 = var$1.data;
    var$2[0] = k_LazyThreadSafetyMode_SYNCHRONIZED;
    var$2[1] = k_LazyThreadSafetyMode_PUBLICATION;
    var$2[2] = k_LazyThreadSafetyMode_NONE;
    return var$1;
},
k_LazyThreadSafetyMode__clinit_ = () => {
    k_LazyThreadSafetyMode_SYNCHRONIZED = k_LazyThreadSafetyMode__init_($rt_s(68), 0);
    k_LazyThreadSafetyMode_PUBLICATION = k_LazyThreadSafetyMode__init_($rt_s(69), 1);
    k_LazyThreadSafetyMode_NONE = k_LazyThreadSafetyMode__init_($rt_s(70), 2);
    k_LazyThreadSafetyMode_$VALUES = k_LazyThreadSafetyMode_$values();
    k_LazyThreadSafetyMode_$ENTRIES = ke_EnumEntriesKt_enumEntries($rt_castToInterface(k_LazyThreadSafetyMode_$VALUES, $rt_arraycls(jl_Enum)));
},
ji_Flushable = $rt_classWithoutFields(0),
ji_OutputStream = $rt_classWithoutFields(),
ji_OutputStream__init_ = $this => {
    jl_Object__init_($this);
};
function ji_ByteArrayOutputStream() {
    ji_OutputStream.call(this);
    this.$buf = null;
}
let ji_ByteArrayOutputStream__init_0 = $this => {
    ji_ByteArrayOutputStream__init_($this, 32);
},
ji_ByteArrayOutputStream__init_1 = () => {
    let var_0 = new ji_ByteArrayOutputStream();
    ji_ByteArrayOutputStream__init_0(var_0);
    return var_0;
},
ji_ByteArrayOutputStream__init_ = ($this, $size) => {
    ji_OutputStream__init_($this);
    $this.$buf = $rt_createByteArray($size);
},
ji_ByteArrayOutputStream__init_2 = var_0 => {
    let var_1 = new ji_ByteArrayOutputStream();
    ji_ByteArrayOutputStream__init_(var_1, var_0);
    return var_1;
},
csw_Message$Companion = $rt_classWithoutFields(),
csw_Message$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
csw_Message$Companion__init_2 = () => {
    let var_0 = new csw_Message$Companion();
    csw_Message$Companion__init_0(var_0);
    return var_0;
},
csw_Message$Companion__init_ = ($this, $$constructor_marker) => {
    csw_Message$Companion__init_0($this);
},
csw_Message$Companion__init_1 = var_0 => {
    let var_1 = new csw_Message$Companion();
    csw_Message$Companion__init_(var_1, var_0);
    return var_1;
},
csw_ProtoAdapterKt$commonFixed64$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonFixed64$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Long_valueOf(Long_ZERO);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonFixed64$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonFixed64$1();
    csw_ProtoAdapterKt$commonFixed64$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonFixed64$1_encodedSize = ($this, $value) => {
    return 8;
},
csw_ProtoAdapterKt$commonFixed64$1_encode0 = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ProtoWriter_writeFixed64($writer, $value);
},
csw_ProtoAdapterKt$commonFixed64$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeFixed64($writer, $value);
},
csw_ProtoAdapterKt$commonFixed64$1_decode = ($this, $reader) => {
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    return jl_Long_valueOf(csw_ProtoReader_readFixed64($reader));
},
csw_ProtoAdapterKt$commonFixed64$1_encodedSize0 = ($this, $value) => {
    return csw_ProtoAdapterKt$commonFixed64$1_encodedSize($this, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
},
csw_ProtoAdapterKt$commonFixed64$1_encode1 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonFixed64$1_encode0($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
},
csw_ProtoAdapterKt$commonFixed64$1_encode2 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonFixed64$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
},
csw_ProtoAdapterKt$commonFixed64$1_decode0 = ($this, $reader) => {
    return csw_ProtoAdapterKt$commonFixed64$1_decode($this, $reader);
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
kc_AbstractCollection = $rt_classWithoutFields(),
kc_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
kc_AbstractCollection_contains = ($this, $element) => {
    let $$this$any$iv, var$3, var$4, $element$iv;
    a: {
        $$this$any$iv = $rt_castToInterface($this, jl_Iterable);
        if ($rt_isInstance($$this$any$iv, ju_Collection) && $rt_nullCheck($rt_castToInterface($$this$any$iv, ju_Collection)).$isEmpty())
            var$3 = 0;
        else {
            $$this$any$iv = $rt_nullCheck($$this$any$iv);
            var$4 = $$this$any$iv.$iterator();
            while (true) {
                var$4 = $rt_nullCheck(var$4);
                if (!var$4.$hasNext())
                    break;
                $element$iv = var$4.$next();
                if (kji_Intrinsics_areEqual($element$iv, $element)) {
                    var$3 = 1;
                    break a;
                }
            }
            var$3 = 0;
        }
    }
    return var$3;
},
kc_AbstractCollection_isEmpty = $this => {
    return kc_AbstractCollection_size($this) ? 0 : 1;
},
kc_AbstractCollection_toString = $this => {
    let var$1;
    var$1 = kc_CollectionsKt___CollectionsKt_joinToString$default($rt_castToInterface($this, jl_Iterable), $rt_castToInterface($rt_s(72), jl_CharSequence), $rt_castToInterface($rt_s(66), jl_CharSequence), $rt_castToInterface($rt_s(67), jl_CharSequence), 0, null, $rt_castToInterface(kc_AbstractCollection$toString$1__init_0($this), kjf_Function1), 24, null);
    return var$1;
},
kc_AbstractCollection_size = $this => {
    return $this.$getSize();
},
jnci_AsciiEncoder = $rt_classWithoutFields(jnci_BufferedEncoder),
jnci_AsciiEncoder__init_ = ($this, $cs) => {
    jnci_BufferedEncoder__init_($this, $cs, 1.0, 1.0);
},
jnci_AsciiEncoder__init_0 = var_0 => {
    let var_1 = new jnci_AsciiEncoder();
    jnci_AsciiEncoder__init_(var_1, var_0);
    return var_1;
},
jnci_AsciiEncoder_arrayEncode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $c, $next, var$13, var$14;
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
            $c = var$10[$rt_checkBounds($inPos, var$10)];
            if (jl_Character_isHighSurrogate($c)) {
                if (var$9 >= $inSize) {
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreInput(2)) {
                        var$9 = var$9 + (-1) | 0;
                        break a;
                    }
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                var$9 = $rt_checkBounds(var$9, var$10);
                $next = var$10[var$9];
                if (!jl_Character_isLowSurrogate($next)) {
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                var$9 = var$9 + (-1) | 0;
                $result = jnc_CoderResult_unmappableForLength(2);
                break a;
            }
            if (jl_Character_isLowSurrogate($c))
                $result = jnc_CoderResult_malformedForLength(1);
            if ($c >= 128) {
                $result = jnc_CoderResult_unmappableForLength(1);
                var$9 = var$9 + (-1) | 0;
                break a;
            }
            var$13 = $outPos + 1 | 0;
            var$14 = $c << 24 >> 24;
            $outArray = $rt_nullCheck($outArray);
            var$10 = $outArray.data;
            var$10[$rt_checkBounds($outPos, var$10)] = var$14;
            $inPos = var$9;
            $outPos = var$13;
        }
        var$9 = $inPos;
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition(var$9);
    $controller.$setOutPosition($outPos);
    return $result;
},
kji_FunctionBase = $rt_classWithoutFields(0);
function kji_Lambda() {
    jl_Object.call(this);
    this.$arity = 0;
}
let kji_Lambda__init_ = ($this, $arity) => {
    jl_Object__init_($this);
    $this.$arity = $arity;
},
kjf_Function0 = $rt_classWithoutFields(0);
function csw_ReverseProtoWriter$forwardWriter$2() {
    kji_Lambda.call(this);
    this.$this$05 = null;
}
let csw_ReverseProtoWriter$forwardWriter$2__init_ = ($this, $$receiver) => {
    $this.$this$05 = $$receiver;
    kji_Lambda__init_($this, 0);
},
csw_ReverseProtoWriter$forwardWriter$2__init_0 = var_0 => {
    let var_1 = new csw_ReverseProtoWriter$forwardWriter$2();
    csw_ReverseProtoWriter$forwardWriter$2__init_(var_1, var_0);
    return var_1;
},
jl_ReflectiveOperationException = $rt_classWithoutFields(jl_Exception),
jl_ReflectiveOperationException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_ReflectiveOperationException__init_0 = () => {
    let var_0 = new jl_ReflectiveOperationException();
    jl_ReflectiveOperationException__init_(var_0);
    return var_0;
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
jl_ClassCastException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_ClassCastException__init_ = () => {
    let var_0 = new jl_ClassCastException();
    jl_ClassCastException__init_0(var_0);
    return var_0;
},
jtt_TemporalAccessor = $rt_classWithoutFields(0),
jnc_CoderMalfunctionError = $rt_classWithoutFields(jl_Error),
jnc_CoderMalfunctionError__init_ = ($this, $cause) => {
    jl_Error__init_0($this, $cause);
},
jnc_CoderMalfunctionError__init_0 = var_0 => {
    let var_1 = new jnc_CoderMalfunctionError();
    jnc_CoderMalfunctionError__init_(var_1, var_0);
    return var_1;
};
function ju_AbstractMap() {
    jl_Object.call(this);
    this.$cachedValues = null;
}
let ju_AbstractMap__init_ = $this => {
    jl_Object__init_($this);
},
jl_Cloneable = $rt_classWithoutFields(0);
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount = 0;
    a.$loadFactor0 = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_1 = $this => {
    ju_HashMap__init_($this, 16);
},
ju_HashMap__init_0 = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
},
ju_HashMap__init_ = ($this, $capacity) => {
    ju_HashMap__init_2($this, $capacity, 0.75);
},
ju_HashMap__init_3 = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2, var$3;
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
},
ju_HashMap__init_2 = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray(var$3);
        $this.$loadFactor0 = $loadFactor;
        ju_HashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
ju_HashMap__init_4 = (var_0, var_1) => {
    let var_2 = new ju_HashMap();
    ju_HashMap__init_2(var_2, var_0, var_1);
    return var_2;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $rt_nullCheck($this.$elementData).data.length * $this.$loadFactor0 | 0;
},
ju_HashMap_entrySet = $this => {
    return ju_HashMap$HashMapEntrySet__init_0($this);
},
ju_HashMap_get = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    if ($m === null)
        return null;
    return $m.$value1;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash, $index;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode();
        $index = $hash & ($rt_nullCheck($this.$elementData).data.length - 1 | 0);
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let var$4, $m;
    var$4 = $rt_nullCheck($this.$elementData).data;
    $index = $rt_checkBounds($index, var$4);
    $m = var$4[$index];
    a: {
        while ($m !== null) {
            if ($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key))
                break a;
            $m = $m.$next3;
        }
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let var$1, $m;
    var$1 = $rt_nullCheck($this.$elementData).data;
    $m = var$1[$rt_checkUpperBound(0, var$1)];
    a: {
        while ($m !== null) {
            if ($m.$key === null)
                break a;
            $m = $m.$next3;
        }
    }
    return $m;
},
ju_HashMap_isEmpty = $this => {
    return $this.$elementCount ? 0 : 1;
},
ju_HashMap_put = ($this, $key, $value) => {
    return ju_HashMap_putImpl($this, $key, $value);
},
ju_HashMap_putImpl = ($this, $key, $value) => {
    let $entry, var$4, $hash, $index, var$7, var$8, $result;
    if ($key === null) {
        $entry = ju_HashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount = $this.$modCount + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                $this.$rehash();
        }
    } else {
        $hash = $key.$hashCode();
        $index = $hash & ($rt_nullCheck($this.$elementData).data.length - 1 | 0);
        $entry = ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount = $this.$modCount + 1 | 0;
            $entry = ju_HashMap_createHashedEntry($this, $key, $index, $hash);
            var$7 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$7;
            if (var$7 > $this.$threshold)
                $this.$rehash();
        }
    }
    var$8 = $rt_nullCheck($entry);
    $result = var$8.$value1;
    var$8.$value1 = $value;
    return $result;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry, var$5;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    var$5 = $rt_nullCheck($this.$elementData).data;
    $index = $rt_checkBounds($index, var$5);
    $entry.$next3 = var$5[$index];
    var$5 = $rt_nullCheck($this.$elementData).data;
    $index = $rt_checkUpperBound($index, var$5);
    var$5[$index] = $entry;
    return $entry;
},
ju_HashMap_putAll = ($this, $map) => {
    $map = $rt_nullCheck($map);
    if (!$map.$isEmpty())
        $this.$putAllImpl($map);
},
ju_HashMap_putAllImpl = ($this, $map) => {
    let var$2, $capacity, $it, $entry;
    var$2 = $this.$elementCount;
    $map = $rt_nullCheck($map);
    $capacity = var$2 + $map.$size() | 0;
    if ($capacity > $this.$threshold)
        $this.$rehash0($capacity);
    $it = $rt_nullCheck($map.$entrySet()).$iterator();
    while (true) {
        $it = $rt_nullCheck($it);
        if (!$it.$hasNext())
            break;
        $entry = $rt_castToInterface($it.$next(), ju_Map$Entry);
        $entry = $rt_nullCheck($entry);
        ju_HashMap_putImpl($this, $entry.$getKey(), $entry.$getValue());
    }
},
ju_HashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, var$5, $entry, var$7, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    while ($i < $rt_nullCheck($this.$elementData).data.length) {
        var$5 = $rt_nullCheck($this.$elementData).data;
        $i = $rt_checkBounds($i, var$5);
        $entry = var$5[$i];
        var$5 = $this.$elementData;
        var$7 = null;
        var$5 = $rt_nullCheck(var$5).data;
        $i = $rt_checkUpperBound($i, var$5);
        var$5[$i] = var$7;
        while ($entry !== null) {
            $index = $entry.$origKeyHash & ($length - 1 | 0);
            $next = $entry.$next3;
            $newData = $rt_nullCheck($newData);
            var$5 = $newData.data;
            $index = $rt_checkBounds($index, var$5);
            $entry.$next3 = var$5[$index];
            var$5[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash = $this => {
    $this.$rehash0($rt_nullCheck($this.$elementData).data.length);
},
ju_HashMap_removeEntry = ($this, $entry) => {
    let $index, var$3, $m, var$5, var$6;
    $entry = $rt_nullCheck($entry);
    $index = $entry.$origKeyHash & ($rt_nullCheck($this.$elementData).data.length - 1 | 0);
    var$3 = $rt_nullCheck($this.$elementData).data;
    $index = $rt_checkBounds($index, var$3);
    $m = var$3[$index];
    if ($m === $entry) {
        var$3 = $this.$elementData;
        var$5 = $entry.$next3;
        var$3 = $rt_nullCheck(var$3).data;
        $index = $rt_checkUpperBound($index, var$3);
        var$3[$index] = var$5;
    } else {
        while (true) {
            var$6 = $rt_nullCheck($m);
            if (var$6.$next3 === $entry)
                break;
            $m = var$6.$next3;
        }
        var$6.$next3 = $entry.$next3;
    }
    $this.$modCount = $this.$modCount + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
},
ju_HashMap_size = $this => {
    return $this.$elementCount;
},
ju_HashMap_values = $this => {
    if ($this.$cachedValues === null)
        $this.$cachedValues = ju_HashMap$2__init_0($this);
    return $this.$cachedValues;
},
ju_HashMap_areEqualKeys = ($key1, $key2) => {
    let var$3;
    a: {
        if ($key1 !== $key2) {
            $key1 = $rt_nullCheck($key1);
            if (!$key1.$equals0($key2)) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
};
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head0 = null;
    a.$tail = null;
}
let ju_LinkedHashMap__init_0 = $this => {
    ju_HashMap__init_1($this);
    $this.$accessOrder = 0;
    $this.$head0 = null;
},
ju_LinkedHashMap__init_2 = () => {
    let var_0 = new ju_LinkedHashMap();
    ju_LinkedHashMap__init_0(var_0);
    return var_0;
},
ju_LinkedHashMap__init_ = ($this, $s) => {
    ju_HashMap__init_($this, $s);
    $this.$accessOrder = 0;
    $this.$head0 = null;
},
ju_LinkedHashMap__init_1 = var_0 => {
    let var_1 = new ju_LinkedHashMap();
    ju_LinkedHashMap__init_(var_1, var_0);
    return var_1;
},
ju_LinkedHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
},
ju_LinkedHashMap_createHashedEntry = ($this, $key, $index, $hash, $first) => {
    let $entry, var$6;
    $entry = ju_LinkedHashMap$LinkedHashMapEntry__init_0($key, $hash);
    var$6 = $rt_nullCheck($this.$elementData).data;
    $index = $rt_checkBounds($index, var$6);
    $entry.$next3 = var$6[$index];
    var$6 = $rt_nullCheck($this.$elementData).data;
    $index = $rt_checkUpperBound($index, var$6);
    var$6[$index] = $entry;
    if (!$first) {
        if ($this.$tail === null)
            $this.$head0 = $entry;
        else
            $rt_nullCheck($this.$tail).$chainForward = $entry;
        $entry.$chainBackward = $this.$tail;
        $this.$tail = $entry;
    } else {
        if ($this.$head0 === null)
            $this.$tail = $entry;
        else
            $rt_nullCheck($this.$head0).$chainBackward = $entry;
        $entry.$chainForward = $this.$head0;
        $this.$head0 = $entry;
    }
    return $entry;
},
ju_LinkedHashMap_put = ($this, $key, $value) => {
    let $oldSize, $existing;
    $oldSize = $this.$size();
    $existing = $this.$putImpl0($key, $value, 0, $this.$accessOrder);
    if ($this.$size() != $oldSize && $this.$removeEldestEntry($this.$head0))
        $this.$removeLinkedEntry($this.$head0);
    return $existing;
},
ju_LinkedHashMap_putImpl = ($this, $key, $value, $first, $forceMotion) => {
    let $hash, var$6, $index, $entry, var$9, var$10, $existing;
    if (!$this.$elementCount) {
        $this.$head0 = null;
        $this.$tail = null;
    }
    $hash = ju_Objects_hashCode($key);
    var$6 = $hash & 2147483647;
    $index = var$6 % $rt_nullCheck($this.$elementData).data.length | 0;
    $entry = $rt_castToClass($key === null ? ju_HashMap_findNullKeyEntry($this) : ju_HashMap_findNonNullKeyEntry($this, $key, $index, $hash), ju_LinkedHashMap$LinkedHashMapEntry);
    if ($entry === null) {
        $this.$modCount = $this.$modCount + 1 | 0;
        var$9 = $this.$elementCount + 1 | 0;
        $this.$elementCount = var$9;
        if (var$9 > $this.$threshold) {
            $this.$rehash();
            $index = var$6 % $rt_nullCheck($this.$elementData).data.length | 0;
        }
        $entry = $rt_castToClass(ju_LinkedHashMap_createHashedEntry($this, $key, $index, $hash, $first), ju_LinkedHashMap$LinkedHashMapEntry);
    } else if ($forceMotion)
        ju_LinkedHashMap_linkEntry($this, $entry, $first);
    var$10 = $rt_nullCheck($entry);
    $existing = var$10.$value1;
    var$10.$value1 = $value;
    return $existing;
},
ju_LinkedHashMap_linkEntry = ($this, $entry, $first) => {
    let $n, $p;
    if (!$first) {
        $entry = $rt_nullCheck($entry);
        $n = $entry.$chainForward;
        if ($n === null)
            return;
        $p = $entry.$chainBackward;
        if ($p === null)
            $this.$head0 = $n;
        else
            $p.$chainForward = $n;
        $n.$chainBackward = $p;
        if ($this.$tail !== null)
            $rt_nullCheck($this.$tail).$chainForward = $entry;
        $entry.$chainBackward = $this.$tail;
        $entry.$chainForward = null;
        $this.$tail = $entry;
    } else {
        $entry = $rt_nullCheck($entry);
        $p = $entry.$chainBackward;
        if ($p === null)
            return;
        $n = $entry.$chainForward;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
        $p.$chainForward = $n;
        if ($this.$head0 !== null)
            $rt_nullCheck($this.$head0).$chainBackward = $entry;
        $entry.$chainForward = $this.$head0;
        $entry.$chainBackward = null;
        $this.$head0 = $entry;
    }
},
ju_LinkedHashMap_entrySet = $this => {
    return ju_LinkedHashMapEntrySet__init_0($this, 0);
},
ju_LinkedHashMap_removeLinkedEntry = ($this, $entry) => {
    ju_HashMap_removeEntry($this, $entry);
    ju_LinkedHashMap_unlinkEntry($this, $entry);
},
ju_LinkedHashMap_unlinkEntry = ($this, $entry) => {
    let $p, $n;
    $entry = $rt_nullCheck($entry);
    $p = $entry.$chainBackward;
    $n = $entry.$chainForward;
    if ($p !== null) {
        $p.$chainForward = $n;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
    } else {
        $this.$head0 = $n;
        if ($n === null)
            $this.$tail = null;
        else
            $n.$chainBackward = null;
    }
},
ju_LinkedHashMap_removeEldestEntry = ($this, $eldest) => {
    return 0;
},
kc_CollectionsKt__CollectionsJVMKt = $rt_classWithoutFields(),
kc_CollectionsKt__CollectionsKt = $rt_classWithoutFields(kc_CollectionsKt__CollectionsJVMKt),
kc_CollectionsKt__CollectionsKt_emptyList = () => {
    kc_EmptyList_$callClinit();
    return $rt_castToInterface(kc_EmptyList_INSTANCE, ju_List);
},
kc_CollectionsKt__CollectionsKt_listOf = $elements => {
    kji_Intrinsics_checkNotNullParameter($elements, $rt_s(73));
    $elements = $rt_nullCheck($elements);
    return $elements.data.length <= 0 ? kc_CollectionsKt__CollectionsKt_emptyList() : kc_ArraysKt___ArraysJvmKt_asList($elements);
},
kc_CollectionsKt__CollectionsKt_throwIndexOverflow = () => {
    $rt_throw(jl_ArithmeticException__init_1($rt_s(74)));
},
kc_CollectionsKt__IterablesKt = $rt_classWithoutFields(kc_CollectionsKt__CollectionsKt),
kc_CollectionsKt__IterablesKt_collectionSizeOrDefault = ($$this$collectionSizeOrDefault, $default) => {
    kji_Intrinsics_checkNotNullParameter($$this$collectionSizeOrDefault, $rt_s(29));
    if ($rt_isInstance($$this$collectionSizeOrDefault, ju_Collection))
        $default = $rt_nullCheck($rt_castToInterface($$this$collectionSizeOrDefault, ju_Collection)).$size();
    return $default;
},
kc_CollectionsKt__IteratorsJVMKt = $rt_classWithoutFields(kc_CollectionsKt__IterablesKt),
kc_CollectionsKt__IteratorsKt = $rt_classWithoutFields(kc_CollectionsKt__IteratorsJVMKt),
kc_CollectionsKt__MutableCollectionsJVMKt = $rt_classWithoutFields(kc_CollectionsKt__IteratorsKt),
kt_StringsKt__AppendableKt = $rt_classWithoutFields(),
kt_StringsKt__AppendableKt_appendElement = ($$this$appendElement, $element, $transform) => {
    let var$4, var$5;
    kji_Intrinsics_checkNotNullParameter($$this$appendElement, $rt_s(29));
    if ($transform !== null) {
        var$4 = $rt_castToInterface($transform.$invoke($element), jl_CharSequence);
        $$this$appendElement = $rt_nullCheck($$this$appendElement);
        $$this$appendElement.$append5(var$4);
    } else if ($element !== null ? $rt_isInstance($element, jl_CharSequence) : 1) {
        var$4 = $rt_castToInterface($element, jl_CharSequence);
        $$this$appendElement = $rt_nullCheck($$this$appendElement);
        $$this$appendElement.$append5(var$4);
    } else if (!($element instanceof jl_Character)) {
        var$4 = $rt_castToInterface(jl_String_valueOf($element), jl_CharSequence);
        $$this$appendElement = $rt_nullCheck($$this$appendElement);
        $$this$appendElement.$append5(var$4);
    } else {
        var$5 = $rt_nullCheck($rt_castToClass($element, jl_Character)).$charValue();
        $$this$appendElement = $rt_nullCheck($$this$appendElement);
        $$this$appendElement.$append6(var$5);
    }
},
kt_StringsKt__IndentKt = $rt_classWithoutFields(kt_StringsKt__AppendableKt),
kt_StringsKt__RegexExtensionsJVMKt = $rt_classWithoutFields(kt_StringsKt__IndentKt),
kt_StringsKt__RegexExtensionsKt = $rt_classWithoutFields(kt_StringsKt__RegexExtensionsJVMKt),
kt_StringsKt__StringBuilderJVMKt = $rt_classWithoutFields(kt_StringsKt__RegexExtensionsKt),
kt_StringsKt__StringBuilderKt = $rt_classWithoutFields(kt_StringsKt__StringBuilderJVMKt),
kt_StringsKt__StringNumberConversionsJVMKt = $rt_classWithoutFields(kt_StringsKt__StringBuilderKt);
function uciisdp_Organization$Builder() {
    let a = this; csw_Message$Builder.call(a);
    a.$name6 = null;
    a.$primaryDepartment1 = null;
}
let uciisdp_Organization$Builder__init_ = $this => {
    csw_Message$Builder__init_($this);
    $this.$name6 = $rt_s(6);
},
uciisdp_Organization$Builder__init_0 = () => {
    let var_0 = new uciisdp_Organization$Builder();
    uciisdp_Organization$Builder__init_(var_0);
    return var_0;
},
uciisdp_Organization$Builder_name = ($this, $name) => {
    $this.$name6 = $name;
    return $this;
},
uciisdp_Organization$Builder_primaryDepartment = ($this, $primaryDepartment) => {
    $this.$primaryDepartment1 = $primaryDepartment;
    return $this;
},
uciisdp_Organization$Builder_build = $this => {
    return uciisdp_Organization__init_0($this.$name6, $this.$primaryDepartment1, csw_Message$Builder_buildUnknownFields($this));
},
csw_DoubleProtoAdapter = $rt_classWithoutFields(csw_ProtoAdapter),
csw_DoubleProtoAdapter__init_ = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_FIXED64;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_doublecls));
    var$3 = null;
    csw_Syntax_$callClinit();
    var$4 = csw_Syntax_PROTO_2;
    var$5 = jl_Double_valueOf(0.0);
    csw_ProtoAdapter__init_($this, var$1, var$2, var$3, var$4, var$5);
},
csw_DoubleProtoAdapter__init_0 = () => {
    let var_0 = new csw_DoubleProtoAdapter();
    csw_DoubleProtoAdapter__init_(var_0);
    return var_0;
},
csw_DoubleProtoAdapter_encode = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    var$3 = jl_Double_doubleToLongBits($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeFixed64($writer, var$3);
},
csw_DoubleProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_DoubleProtoAdapter_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$doubleValue());
};
function jn_Buffer() {
    let a = this; jl_Object.call(a);
    a.$capacity0 = 0;
    a.$position3 = 0;
    a.$limit2 = 0;
    a.$mark = 0;
}
let jn_Buffer__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$mark = (-1);
    $this.$capacity0 = $capacity;
    $this.$limit2 = $capacity;
},
jn_Buffer_capacity = $this => {
    return $this.$capacity0;
},
jn_Buffer_position = $this => {
    return $this.$position3;
},
jn_Buffer_position0 = ($this, $newPosition) => {
    let var$2, var$3, var$4;
    if ($newPosition >= 0 && $newPosition <= $this.$limit2) {
        $this.$position3 = $newPosition;
        if ($newPosition < $this.$mark)
            $this.$mark = 0;
        return $this;
    }
    var$2 = new jl_IllegalArgumentException;
    var$3 = $this.$limit2;
    var$4 = jl_StringBuilder__init_();
    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$4, $rt_s(75))), $newPosition)), $rt_s(76))), var$3)), 93);
    jl_IllegalArgumentException__init_1(var$2, jl_StringBuilder_toString(var$4));
    $rt_throw(var$2);
},
jn_Buffer_limit = $this => {
    return $this.$limit2;
},
jn_Buffer_flip = $this => {
    $this.$limit2 = $this.$position3;
    $this.$position3 = 0;
    $this.$mark = (-1);
    return $this;
},
jn_Buffer_remaining = $this => {
    return $this.$limit2 - $this.$position3 | 0;
},
jn_Buffer_hasRemaining = $this => {
    return $this.$position3 >= $this.$limit2 ? 0 : 1;
};
function jnci_BufferedDecoder() {
    let a = this; jnc_CharsetDecoder.call(a);
    a.$inArray = null;
    a.$outArray = null;
}
let jnci_BufferedDecoder__init_ = ($this, $cs, $averageCharsPerByte, $maxCharsPerByte) => {
    jnc_CharsetDecoder__init_($this, $cs, $averageCharsPerByte, $maxCharsPerByte);
    $this.$inArray = $rt_createByteArray(512);
    $this.$outArray = $rt_createCharArray(512);
},
jnci_BufferedDecoder_decodeLoop = ($this, $in, $out) => {
    let $inArray, $inPos, $inSize, $outArray, $i, var$8, var$9, var$10, $result, $outPos, $outSize, $controller;
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
            $controller = jnci_BufferedDecoder$Controller__init_0($in, $out);
            $result = $this.$arrayDecode($inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller);
            $inPos = $controller.$inPosition0;
            if ($result === null && $outPos == $controller.$outPosition) {
                jnc_CoderResult_$callClinit();
                $result = jnc_CoderResult_UNDERFLOW;
            }
            var$8 = $controller.$outPosition;
            $out.$put2($outArray, 0, var$8);
            if ($result !== null)
                break;
        }
    }
    $in = $rt_nullCheck($in);
    $in.$position1(jn_Buffer_position($in) - ($inSize - $inPos | 0) | 0);
    return $result;
},
jnci_AsciiDecoder = $rt_classWithoutFields(jnci_BufferedDecoder),
jnci_AsciiDecoder__init_ = ($this, $cs) => {
    jnci_BufferedDecoder__init_($this, $cs, 1.0, 1.0);
},
jnci_AsciiDecoder__init_0 = var_0 => {
    let var_1 = new jnci_AsciiDecoder();
    jnci_AsciiDecoder__init_(var_1, var_0);
    return var_1;
},
jnci_AsciiDecoder_arrayDecode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $b, var$12, var$13;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize)
                break a;
            var$9 = $inPos + 1 | 0;
            $inArray = $rt_nullCheck($inArray);
            var$10 = $inArray.data;
            $b = var$10[$rt_checkBounds($inPos, var$10)] & 255;
            if ($b & 128) {
                $result = jnc_CoderResult_malformedForLength(1);
                $inPos = var$9 + (-1) | 0;
                break a;
            }
            var$12 = $outPos + 1 | 0;
            var$13 = $b & 65535;
            $outArray = $rt_nullCheck($outArray);
            var$10 = $outArray.data;
            var$10[$rt_checkBounds($outPos, var$10)] = var$13;
            $inPos = var$9;
            $outPos = var$12;
        }
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
},
k_LazyKt__LazyJVMKt$WhenMappings = $rt_classWithoutFields(),
k_LazyKt__LazyJVMKt$WhenMappings_$EnumSwitchMapping$0 = null,
k_LazyKt__LazyJVMKt$WhenMappings_$callClinit = () => {
    k_LazyKt__LazyJVMKt$WhenMappings_$callClinit = $rt_eraseClinit(k_LazyKt__LazyJVMKt$WhenMappings);
    k_LazyKt__LazyJVMKt$WhenMappings__clinit_();
},
k_LazyKt__LazyJVMKt$WhenMappings__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray($rt_nullCheck(k_LazyThreadSafetyMode_values()).data.length);
    var$2 = var$1.data;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(k_LazyThreadSafetyMode_SYNCHRONIZED)), var$2)] = 1;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(k_LazyThreadSafetyMode_PUBLICATION)), var$2)] = 2;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(k_LazyThreadSafetyMode_NONE)), var$2)] = 3;
    k_LazyKt__LazyJVMKt$WhenMappings_$EnumSwitchMapping$0 = var$1;
},
jus_Collector$Characteristics = $rt_classWithoutFields(jl_Enum),
jus_Collector$Characteristics_CONCURRENT = null,
jus_Collector$Characteristics_UNORDERED = null,
jus_Collector$Characteristics_IDENTITY_FINISH = null,
jus_Collector$Characteristics_$VALUES = null,
jus_Collector$Characteristics_$callClinit = () => {
    jus_Collector$Characteristics_$callClinit = $rt_eraseClinit(jus_Collector$Characteristics);
    jus_Collector$Characteristics__clinit_();
},
jus_Collector$Characteristics_values = () => {
    jus_Collector$Characteristics_$callClinit();
    return $rt_castToInterface($rt_nullCheck(jus_Collector$Characteristics_$VALUES).$clone0(), $rt_arraycls(jus_Collector$Characteristics));
},
jus_Collector$Characteristics__init_0 = ($this, var$1, var$2) => {
    jus_Collector$Characteristics_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
},
jus_Collector$Characteristics__init_ = (var_0, var_1) => {
    let var_2 = new jus_Collector$Characteristics();
    jus_Collector$Characteristics__init_0(var_2, var_0, var_1);
    return var_2;
},
jus_Collector$Characteristics_$values = () => {
    let var$1, var$2;
    jus_Collector$Characteristics_$callClinit();
    var$1 = $rt_createArray(jus_Collector$Characteristics, 3);
    var$2 = var$1.data;
    var$2[0] = jus_Collector$Characteristics_CONCURRENT;
    var$2[1] = jus_Collector$Characteristics_UNORDERED;
    var$2[2] = jus_Collector$Characteristics_IDENTITY_FINISH;
    return var$1;
},
jus_Collector$Characteristics__clinit_ = () => {
    jus_Collector$Characteristics_CONCURRENT = jus_Collector$Characteristics__init_($rt_s(77), 0);
    jus_Collector$Characteristics_UNORDERED = jus_Collector$Characteristics__init_($rt_s(78), 1);
    jus_Collector$Characteristics_IDENTITY_FINISH = jus_Collector$Characteristics__init_($rt_s(79), 2);
    jus_Collector$Characteristics_$VALUES = jus_Collector$Characteristics_$values();
},
kc_ArraysKt__ArraysJVMKt = $rt_classWithoutFields(),
kc_ArraysKt__ArraysJVMKt_copyOfRangeToIndexCheck = ($toIndex, $size) => {
    if ($toIndex <= $size)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_2($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(80))).$append4($toIndex)).$append3($rt_s(81))).$append4($size)).$append3($rt_s(82))).$toString()));
},
kc_ArraysKt__ArraysKt = $rt_classWithoutFields(kc_ArraysKt__ArraysJVMKt),
otj_JSObject = $rt_classWithoutFields(0),
otj_JSObject_cast$static = $this => {
    return $this;
},
ucitrt_WebWorkerTransport$MessageHandlerCallback = $rt_classWithoutFields(0),
jl_AssertionError = $rt_classWithoutFields(jl_Error),
jl_AssertionError__init_3 = $this => {
    jl_Error__init_($this);
},
jl_AssertionError__init_4 = () => {
    let var_0 = new jl_AssertionError();
    jl_AssertionError__init_3(var_0);
    return var_0;
},
jl_AssertionError__init_1 = ($this, $message, $cause) => {
    jl_Error__init_1($this, $message, $cause);
},
jl_AssertionError__init_2 = (var_0, var_1) => {
    let var_2 = new jl_AssertionError();
    jl_AssertionError__init_1(var_2, var_0, var_1);
    return var_2;
},
jl_AssertionError__init_ = ($this, $message) => {
    jl_Error__init_2($this, jl_String_valueOf($message));
},
jl_AssertionError__init_0 = var_0 => {
    let var_1 = new jl_AssertionError();
    jl_AssertionError__init_(var_1, var_0);
    return var_1;
};
function oj_ComparisonFailure() {
    let a = this; jl_AssertionError.call(a);
    a.$fExpected = null;
    a.$fActual = null;
}
let oj_ComparisonFailure__init_ = ($this, $message, $expected, $actual) => {
    jl_AssertionError__init_($this, $message);
    $this.$fExpected = $expected;
    $this.$fActual = $actual;
},
oj_ComparisonFailure__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new oj_ComparisonFailure();
    oj_ComparisonFailure__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
oj_ComparisonFailure_getMessage = $this => {
    return (oj_ComparisonFailure$ComparisonCompactor__init_0(20, $this.$fExpected, $this.$fActual)).$compact(jl_Throwable_getMessage($this));
},
jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException),
jl_UnsupportedOperationException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_UnsupportedOperationException__init_2 = () => {
    let var_0 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_(var_0);
    return var_0;
},
jl_UnsupportedOperationException__init_0 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_UnsupportedOperationException__init_1 = var_0 => {
    let var_1 = new jl_UnsupportedOperationException();
    jl_UnsupportedOperationException__init_0(var_1, var_0);
    return var_1;
},
jn_ReadOnlyBufferException = $rt_classWithoutFields(jl_UnsupportedOperationException),
jn_ReadOnlyBufferException__init_0 = $this => {
    jl_UnsupportedOperationException__init_($this);
},
jn_ReadOnlyBufferException__init_ = () => {
    let var_0 = new jn_ReadOnlyBufferException();
    jn_ReadOnlyBufferException__init_0(var_0);
    return var_0;
};
function csw_PackedProtoAdapter() {
    csw_ProtoAdapter.call(this);
    this.$originalAdapter0 = null;
}
let csw_PackedProtoAdapter__init_ = ($this, $originalAdapter) => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($originalAdapter, $rt_s(83));
    csw_FieldEncoding_$callClinit();
    var$2 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$3 = kji_Reflection_getOrCreateKotlinClass($rt_cls(ju_List));
    var$4 = null;
    $originalAdapter = $rt_nullCheck($originalAdapter);
    var$5 = csw_ProtoAdapter_getSyntax($originalAdapter);
    var$6 = kc_CollectionsKt__CollectionsKt_emptyList();
    csw_ProtoAdapter__init_($this, var$2, var$3, var$4, var$5, var$6);
    $this.$originalAdapter0 = $originalAdapter;
},
csw_PackedProtoAdapter__init_0 = var_0 => {
    let var_1 = new csw_PackedProtoAdapter();
    csw_PackedProtoAdapter__init_(var_1, var_0);
    return var_1;
},
csw_PackedProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null && ($rt_nullCheck($rt_castToInterface($value, ju_Collection)).$isEmpty() ? 0 : 1))
        csw_ProtoAdapter_encodeWithTag($this, $writer, $tag, $value);
},
csw_PackedProtoAdapter_encode = ($this, $writer, $value) => {
    let $i, var$4, var$5;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    $i = $value.$size() - 1 | 0;
    while ((-1) < $i) {
        var$4 = $this.$originalAdapter0;
        var$5 = $value.$get1($i);
        $rt_nullCheck(var$4).$encode1($writer, var$5);
        $i = $i + (-1) | 0;
    }
},
csw_PackedProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_PackedProtoAdapter_encodeWithTag($this, $writer, $tag, $rt_castToInterface($value, ju_List));
},
csw_PackedProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_PackedProtoAdapter_encode($this, $writer, $rt_castToInterface($value, ju_List));
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = var$1 => {
    if (var$1 === null || var$1.constructor.$meta.item === 'undefined') {
        $rt_throw(jl_IllegalArgumentException__init_0());
    }
    return var$1.data.length;
},
jlr_Array_newInstance = (var$1, $length) => {
    if (var$1 === null)
        $rt_throw(jl_NullPointerException__init_0());
    if (var$1 === $rt_cls($rt_voidcls))
        $rt_throw(jl_IllegalArgumentException__init_0());
    if ($length < 0)
        $rt_throw(jl_NegativeArraySizeException__init_0());
    return jlr_Array_newInstanceImpl($rt_nullCheck($rt_castToClass(var$1, jl_Class)).$getPlatformClass(), $length);
},
jlr_Array_newInstanceImpl = (var$1, var$2) => {
    if (var$1.$meta.primitive) {
        switch (var$1) {
        }
        ;
    }
    return $rt_createArray(var$1, var$2);
};
function otcit_DoubleAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign = 0;
}
let otcit_DoubleAnalyzer$Result__init_0 = $this => {
    jl_Object__init_($this);
},
otcit_DoubleAnalyzer$Result__init_ = () => {
    let var_0 = new otcit_DoubleAnalyzer$Result();
    otcit_DoubleAnalyzer$Result__init_0(var_0);
    return var_0;
},
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0),
kc_AbstractList = $rt_classWithoutFields(kc_AbstractCollection),
kc_AbstractList_Companion = null,
kc_AbstractList_$callClinit = () => {
    kc_AbstractList_$callClinit = $rt_eraseClinit(kc_AbstractList);
    kc_AbstractList__clinit_();
},
kc_AbstractList__init_ = $this => {
    kc_AbstractList_$callClinit();
    kc_AbstractCollection__init_($this);
},
kc_AbstractList_iterator = $this => {
    return $rt_castToInterface(kc_AbstractList$IteratorImpl__init_0($this), ju_Iterator);
},
kc_AbstractList_equals = ($this, $other) => {
    if ($other === $this)
        return 1;
    if (!$rt_isInstance($other, ju_List))
        return 0;
    kc_AbstractList_$callClinit();
    return kc_AbstractList$Companion_orderedEquals$kotlin_stdlib($rt_nullCheck(kc_AbstractList_Companion), $rt_castToInterface($this, ju_Collection), $rt_castToInterface($other, ju_Collection));
},
kc_AbstractList__clinit_ = () => {
    kc_AbstractList_Companion = kc_AbstractList$Companion__init_1(null);
},
ke_EnumEntries = $rt_classWithoutFields(0);
function ke_EnumEntriesList() {
    kc_AbstractList.call(this);
    this.$entries = null;
}
let ke_EnumEntriesList__init_ = ($this, $entries) => {
    kji_Intrinsics_checkNotNullParameter($entries, $rt_s(84));
    kc_AbstractList__init_($this);
    $this.$entries = $entries;
},
ke_EnumEntriesList__init_0 = var_0 => {
    let var_1 = new ke_EnumEntriesList();
    ke_EnumEntriesList__init_(var_1, var_0);
    return var_1;
},
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection__init_ = $this => {
    jl_Object__init_($this);
},
ju_AbstractCollection_isEmpty = $this => {
    return $this.$size() ? 0 : 1;
},
ju_AbstractCollection_addAll = ($this, $c) => {
    let $changed, $iter;
    $changed = 0;
    $c = $rt_nullCheck($c);
    $iter = $c.$iterator();
    while (true) {
        $iter = $rt_nullCheck($iter);
        if (!$iter.$hasNext())
            break;
        if (!$this.$add($iter.$next()))
            continue;
        $changed = 1;
    }
    return $changed;
},
ju_AbstractCollection_toString = $this => {
    let $sb, $iter, $e, var$4;
    $sb = jl_StringBuilder__init_();
    $sb.$append0(91);
    $iter = $this.$iterator();
    $iter = $rt_nullCheck($iter);
    if ($iter.$hasNext()) {
        $e = $iter.$next();
        if ($e === $this)
            $e = $rt_s(85);
        $sb.$append($e);
    }
    while ($iter.$hasNext()) {
        $e = $iter.$next();
        var$4 = $sb.$append3($rt_s(72));
        if ($e === $this)
            $e = $rt_s(85);
        $rt_nullCheck(var$4).$append($e);
    }
    $sb.$append0(93);
    return $sb.$toString();
},
csw_ProtoAdapterKt$commonStructMap$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonStructMap$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(86), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonStructMap$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonStructMap$1();
    csw_ProtoAdapterKt$commonStructMap$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonStructMap$1_encode = ($this, $writer, $value) => {
    let $$this$toTypedArray$iv, var$4, $$this$encode_u24lambda_u240, var$6, var$7, var$8, var$9, $k, $v, $byteCountBefore;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value === null)
        return;
    $$this$toTypedArray$iv = $rt_castToInterface($value.$entrySet(), ju_Collection);
    var$4 = $rt_createArray(ju_Map$Entry, 0);
    $$this$toTypedArray$iv = $rt_nullCheck($$this$toTypedArray$iv);
    var$4 = $$this$toTypedArray$iv.$toArray(var$4);
    $$this$encode_u24lambda_u240 = $rt_castToInterface(var$4, $rt_arraycls(ju_Map$Entry));
    kc_ArraysKt___ArraysKt_reverse($$this$encode_u24lambda_u240);
    var$6 = 0;
    $$this$encode_u24lambda_u240 = $rt_nullCheck($$this$encode_u24lambda_u240);
    var$4 = $$this$encode_u24lambda_u240.data;
    var$7 = var$4.length;
    while (var$6 < var$7) {
        var$8 = $rt_checkLowerBound(var$6);
        var$9 = $rt_nullCheck(var$4[var$8]);
        $k = $rt_castToClass(var$9.$getKey(), jl_String);
        $v = var$9.$getValue();
        $writer = $rt_nullCheck($writer);
        $byteCountBefore = csw_ReverseProtoWriter_getByteCount($writer);
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRUCT_VALUE).$encodeWithTag0($writer, 2, $v);
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 1, $k);
        csw_ReverseProtoWriter_writeVarint32($writer, csw_ReverseProtoWriter_getByteCount($writer) - $byteCountBefore | 0);
        csw_FieldEncoding_$callClinit();
        csw_ReverseProtoWriter_writeTag($writer, 1, csw_FieldEncoding_LENGTH_DELIMITED);
        var$6 = var$8 + 1 | 0;
    }
},
csw_ProtoAdapterKt$commonStructMap$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonStructMap$1_encode($this, $writer, $rt_castToInterface($value, ju_Map));
},
otci_IntegerUtil = $rt_classWithoutFields(),
otci_IntegerUtil_toUnsignedLogRadixString = ($value, $radixLog2) => {
    let $radix, $mask, $sz, $chars, $pos, $target, var$9, $target_0, var$11;
    if (!$value)
        return $rt_s(87);
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
    return jl_String__init_2($chars);
},
jl_Readable = $rt_classWithoutFields(0);
function csw_RepeatedProtoAdapter() {
    csw_ProtoAdapter.call(this);
    this.$originalAdapter1 = null;
}
let csw_RepeatedProtoAdapter__init_ = ($this, $originalAdapter) => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($originalAdapter, $rt_s(83));
    $originalAdapter = $rt_nullCheck($originalAdapter);
    var$2 = csw_ProtoAdapter_getFieldEncoding$wire_runtime($originalAdapter);
    var$3 = kji_Reflection_getOrCreateKotlinClass($rt_cls(ju_List));
    var$4 = null;
    var$5 = csw_ProtoAdapter_getSyntax($originalAdapter);
    var$6 = kc_CollectionsKt__CollectionsKt_emptyList();
    csw_ProtoAdapter__init_($this, var$2, var$3, var$4, var$5, var$6);
    $this.$originalAdapter1 = $originalAdapter;
},
csw_RepeatedProtoAdapter__init_0 = var_0 => {
    let var_1 = new csw_RepeatedProtoAdapter();
    csw_RepeatedProtoAdapter__init_(var_1, var_0);
    return var_1;
},
csw_RepeatedProtoAdapter_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $rt_throw(jl_UnsupportedOperationException__init_1($rt_s(88)));
},
csw_RepeatedProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    let $i, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value === null)
        return;
    $i = $value.$size() - 1 | 0;
    while ((-1) < $i) {
        var$5 = $this.$originalAdapter1;
        var$6 = $value.$get1($i);
        $rt_nullCheck(var$5).$encodeWithTag0($writer, $tag, var$6);
        $i = $i + (-1) | 0;
    }
},
csw_RepeatedProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_RepeatedProtoAdapter_encode($this, $writer, $rt_castToInterface($value, ju_List));
},
csw_RepeatedProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_RepeatedProtoAdapter_encodeWithTag($this, $writer, $tag, $rt_castToInterface($value, ju_List));
},
otjc_JSObjects = $rt_classWithoutFields(),
otji_JS = $rt_classWithoutFields(),
otji_JS_function = (var$1, var$2) => {
    let name = 'jso$functor$' + var$2;
    let result = var$1[name];
    if (typeof result !== 'function') {
        let fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        result = () => fn;
        var$1[name] = result;
    }
    return result();
},
otjc_JSFinalizationRegistryConsumer = $rt_classWithoutFields(0),
otji_JSWrapper$_clinit_$lambda$_33_0 = $rt_classWithoutFields(),
otji_JSWrapper$_clinit_$lambda$_33_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otji_JSWrapper$_clinit_$lambda$_33_0__init_0 = () => {
    let var_0 = new otji_JSWrapper$_clinit_$lambda$_33_0();
    otji_JSWrapper$_clinit_$lambda$_33_0__init_(var_0);
    return var_0;
},
otji_JSWrapper$_clinit_$lambda$_33_0_accept = (var$0, var$1) => {
    otji_JSWrapper_lambda$static$0(var$1);
},
otji_JSWrapper$_clinit_$lambda$_33_0_accept$exported$0 = (var$0, var$1) => {
    var$0.$accept(otji_JSWrapper_jsToJava(var$1));
},
juca_AtomicReferenceFieldUpdater = $rt_classWithoutFields(),
juca_AtomicReferenceFieldUpdater__init_ = $this => {
    jl_Object__init_($this);
};
function jnc_Charset() {
    let a = this; jl_Object.call(a);
    a.$canonicalName = null;
    a.$aliases = null;
}
let jnc_Charset__init_ = ($this, $canonicalName, $aliases) => {
    let var$3, var$4, var$5, var$6, $alias;
    jl_Object__init_($this);
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
    $this.$aliases = $rt_castToInterface($aliases.$clone0(), $rt_arraycls(jl_String));
},
jnc_Charset_checkCanonicalName = $name => {
    let $i, $c;
    $name = $rt_nullCheck($name);
    if ($name.$isEmpty())
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    if (!jnc_Charset_isValidCharsetStart($name.$charAt(0)))
        $rt_throw(jnc_IllegalCharsetNameException__init_($name));
    $i = 1;
    while ($i < $name.$length()) {
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
},
jnc_Charset_isValidCharsetStart = $c => {
    let var$2;
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
},
jnc_Charset_forName = $charsetName => {
    let $charset;
    if ($charsetName === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(89)));
    jnc_Charset_checkCanonicalName($charsetName);
    jnc_Charset$Charsets_$callClinit();
    $charset = $rt_castToClass($rt_nullCheck(jnc_Charset$Charsets_value).$get2($charsetName.$toUpperCase()), jnc_Charset);
    if ($charset !== null)
        return $charset;
    $rt_throw(jnc_UnsupportedCharsetException__init_0($charsetName));
},
jnc_Charset_name = $this => {
    return $this.$canonicalName;
},
jnc_Charset_decode = ($this, $bb) => {
    let var$2, var$3, $e, $$je;
    a: {
        try {
            var$2 = $this.$newDecoder();
            jnc_CodingErrorAction_$callClinit();
            var$3 = jnc_CodingErrorAction_REPLACE;
            var$3 = jnc_CharsetDecoder_onMalformedInput($rt_nullCheck(var$2), var$3);
            var$2 = jnc_CodingErrorAction_REPLACE;
            var$3 = jnc_CharsetDecoder_onUnmappableCharacter($rt_nullCheck(var$3), var$2);
            var$3 = jnc_CharsetDecoder_decode0($rt_nullCheck(var$3), $bb);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jnc_CharacterCodingException) {
                $e = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return var$3;
    }
    $rt_throw(jl_AssertionError__init_2($rt_s(90), $e));
},
jnc_Charset_encode = ($this, $cb) => {
    let var$2, var$3, $e, $$je;
    a: {
        try {
            var$2 = $this.$newEncoder();
            jnc_CodingErrorAction_$callClinit();
            var$3 = jnc_CodingErrorAction_REPLACE;
            var$3 = jnc_CharsetEncoder_onMalformedInput($rt_nullCheck(var$2), var$3);
            var$2 = jnc_CodingErrorAction_REPLACE;
            var$3 = jnc_CharsetEncoder_onUnmappableCharacter($rt_nullCheck(var$3), var$2);
            var$3 = jnc_CharsetEncoder_encode0($rt_nullCheck(var$3), $cb);
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jnc_CharacterCodingException) {
                $e = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return var$3;
    }
    $rt_throw(jl_AssertionError__init_2($rt_s(90), $e));
};
function jnci_UTF16Charset() {
    let a = this; jnc_Charset.call(a);
    a.$bom = 0;
    a.$littleEndian0 = 0;
}
let jnci_UTF16Charset__init_0 = ($this, $canonicalName, $bom, $littleEndian) => {
    jnc_Charset__init_($this, $canonicalName, $rt_createArray(jl_String, 0));
    $this.$bom = $bom;
    $this.$littleEndian0 = $littleEndian;
},
jnci_UTF16Charset__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jnci_UTF16Charset();
    jnci_UTF16Charset__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jnci_UTF16Charset_newDecoder = $this => {
    return jnci_UTF16Decoder__init_0($this, $this.$bom, $this.$littleEndian0);
},
jnci_UTF16Charset_newEncoder = $this => {
    return jnci_UTF16Encoder__init_0($this, $this.$bom, $this.$littleEndian0);
},
kt_CharsKt__CharKt = $rt_classWithoutFields(kt_CharsKt__CharJVMKt),
kt_CharsKt__CharKt_equals = ($$this$equals, $other, $ignoreCase) => {
    let $thisUpper, $otherUpper;
    if ($$this$equals == $other)
        return 1;
    if (!$ignoreCase)
        return 0;
    $thisUpper = jl_Character_toUpperCase($$this$equals);
    $otherUpper = jl_Character_toUpperCase($other);
    return $thisUpper != $otherUpper && jl_Character_toLowerCase($thisUpper) != jl_Character_toLowerCase($otherUpper) ? 0 : 1;
},
kr_KDeclarationContainer = $rt_classWithoutFields(0),
csw_ProtoAdapterKt = $rt_classWithoutFields(),
csw_ProtoAdapterKt_commonBool = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_booleancls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonBool$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonInt32 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_intcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonInt32$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonUint32 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_intcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonUint32$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonSint32 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_intcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonSint32$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonFixed32 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_FIXED32;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_intcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonFixed32$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonSfixed32 = () => {
    return csw_ProtoAdapterKt_commonFixed32();
},
csw_ProtoAdapterKt_commonInt64 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_longcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonInt64$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonUint64 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_longcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonUint64$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonSint64 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_longcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonSint64$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonFixed64 = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_FIXED64;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_longcls));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonFixed64$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonSfixed64 = () => {
    return csw_ProtoAdapterKt_commonFixed64();
},
csw_ProtoAdapterKt_commonFloat = () => {
    return csw_FloatProtoAdapter__init_0();
},
csw_ProtoAdapterKt_commonDouble = () => {
    return csw_DoubleProtoAdapter__init_0();
},
csw_ProtoAdapterKt_commonString = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(jl_String));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonString$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonBytes = () => {
    let var$1, var$2, var$3, var$4;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(o_ByteString));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_2;
    o_ByteString_$callClinit();
    var$4 = o_ByteString_EMPTY;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonBytes$1__init_0(var$1, var$2, var$3, var$4), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonDuration = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(jt_Duration));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonDuration$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonInstant = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(jt_Instant));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonInstant$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonEmpty = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(k_Unit));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonEmpty$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonStructMap = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(ju_Map));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonStructMap$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonStructList = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(ju_Map));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonStructList$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonStructNull = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_VARINT;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(jl_Void));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonStructNull$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonStructValue = () => {
    let var$1, var$2, var$3;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(jl_Object));
    csw_Syntax_$callClinit();
    var$3 = csw_Syntax_PROTO_3;
    var$1 = $rt_castToClass(csw_ProtoAdapterKt$commonStructValue$1__init_0(var$1, var$2, var$3), csw_ProtoAdapter);
    return var$1;
},
csw_ProtoAdapterKt_commonWrapper = ($delegate, $typeUrl) => {
    let var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($delegate, $rt_s(91));
    kji_Intrinsics_checkNotNullParameter($typeUrl, $rt_s(92));
    csw_FieldEncoding_$callClinit();
    var$3 = csw_FieldEncoding_LENGTH_DELIMITED;
    $delegate = $rt_nullCheck($delegate);
    var$4 = csw_ProtoAdapter_getType($delegate);
    csw_Syntax_$callClinit();
    var$5 = csw_Syntax_PROTO_3;
    var$6 = csw_ProtoAdapter_getIdentity($delegate);
    return $rt_castToClass(csw_ProtoAdapterKt$commonWrapper$1__init_0($typeUrl, $delegate, var$3, var$4, var$5, var$6), csw_ProtoAdapter);
},
otciu_UnicodeHelper = $rt_classWithoutFields(),
otciu_UnicodeHelper_decodeCaseMapping = $text => {
    let $flow, $sz, $data, $last, $i, var$7, var$8, var$9;
    $flow = new otci_CharFlow;
    $text = $rt_nullCheck($text);
    otci_CharFlow__init_($flow, $text.$toCharArray());
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        var$7 = $data.data;
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $rt_checkBounds($i * 2 | 0, var$7);
        var$7[var$8] = $last;
        var$9 = var$8 + 1 | 0;
        var$8 = otci_Base46_decode($flow);
        var$7[$rt_checkBounds(var$9, var$7)] = var$8;
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_createCharMapping = $data => {
    let $result, $last, $lastValue, $i, var$6, var$7, $key, $value, var$10;
    $result = $rt_createIntArray(65536);
    $last = 0;
    $lastValue = 0;
    $i = 0;
    a: {
        while (true) {
            $data = $rt_nullCheck($data);
            var$6 = $data.data;
            if ($i >= var$6.length)
                break;
            var$7 = $result.data;
            $i = $rt_checkLowerBound($i);
            $key = var$6[$i];
            $value = var$6[$rt_checkBounds($i + 1 | 0, var$6)];
            var$10 = var$7.length;
            if ($key < var$10)
                var$10 = $key;
            else if ($key == $last)
                break a;
            ju_Arrays_fill0($result, $last, var$10, $lastValue);
            $i = $i + 2 | 0;
            $last = var$10;
            $lastValue = $value;
        }
    }
    return otciu_CharMapping__init_0($data, $result);
},
jus_Collectors = $rt_classWithoutFields(),
jus_Collectors_toCollection = $collectionFactory => {
    return jus_Collector_of($collectionFactory, jus_Collectors$toCollection$lambda$_1_0__init_0(), jus_Collectors$toCollection$lambda$_1_1__init_0(), $rt_createArray(jus_Collector$Characteristics, 0));
},
jus_Collectors_toList = () => {
    return jus_Collectors_toCollection(jus_Collectors$toList$lambda$_2_0__init_0());
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a === $b)
        return 1;
    return $a !== null ? $a.$equals0($b) : $b !== null ? 0 : 1;
},
ju_Objects_hashCode = $o => {
    return $o !== null ? $o.$hashCode() : 0;
},
ju_Objects_toString = $o => {
    return ju_Objects_toString0($o, $rt_s(93));
},
ju_Objects_toString0 = ($o, $nullDefault) => {
    if ($o !== null)
        $nullDefault = $o.$toString();
    return $nullDefault;
},
ju_Objects_requireNonNull = $obj => {
    return ju_Objects_requireNonNull0($obj, $rt_s(6));
},
ju_Objects_requireNonNull0 = ($obj, $message) => {
    if ($obj !== null)
        return $obj;
    $rt_throw(jl_NullPointerException__init_($message));
},
ju_Objects_checkFromIndexSize = ($fromIndex, $size, $length) => {
    if ($fromIndex >= 0 && $size >= 0 && $size <= ($length - $fromIndex | 0))
        return $fromIndex;
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
};
function csw_ProtoAdapterKt$commonWrapper$1() {
    csw_ProtoAdapter.call(this);
    this.$$delegate = null;
}
let csw_ProtoAdapterKt$commonWrapper$1__init_ = ($this, $$typeUrl, $$delegate, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3, $$super_call_param$4) => {
    $this.$$delegate = $$delegate;
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, $$typeUrl, $$super_call_param$3, $$super_call_param$4);
},
csw_ProtoAdapterKt$commonWrapper$1__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new csw_ProtoAdapterKt$commonWrapper$1();
    csw_ProtoAdapterKt$commonWrapper$1__init_(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
csw_ProtoAdapterKt$commonWrapper$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null && !kji_Intrinsics_areEqual($value, csw_ProtoAdapter_getIdentity($rt_nullCheck($this.$$delegate))))
        $rt_nullCheck($this.$$delegate).$encodeWithTag0($writer, 1, $value);
},
otjc_JSUndefined = $rt_classWithoutFields(),
k_Lazy = $rt_classWithoutFields(0);
function k_SynchronizedLazyImpl() {
    let a = this; jl_Object.call(a);
    a.$initializer0 = null;
    a.$_value1 = null;
    a.$lock = null;
}
let k_SynchronizedLazyImpl__init_ = ($this, $initializer, $lock) => {
    kji_Intrinsics_checkNotNullParameter($initializer, $rt_s(94));
    jl_Object__init_($this);
    $this.$initializer0 = $initializer;
    k_UNINITIALIZED_VALUE_$callClinit();
    $this.$_value1 = k_UNINITIALIZED_VALUE_INSTANCE;
    if ($lock === null)
        $lock = $this;
    $this.$lock = $lock;
},
k_SynchronizedLazyImpl__init_2 = (var_0, var_1) => {
    let var_2 = new k_SynchronizedLazyImpl();
    k_SynchronizedLazyImpl__init_(var_2, var_0, var_1);
    return var_2;
},
k_SynchronizedLazyImpl__init_0 = (var$0, var$1, var$2, var$3, var$4) => {
    if (var$3 & 2)
        var$2 = null;
    k_SynchronizedLazyImpl__init_(var$0, var$1, var$2);
},
k_SynchronizedLazyImpl__init_1 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new k_SynchronizedLazyImpl();
    k_SynchronizedLazyImpl__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jnci_AsciiCharset = $rt_classWithoutFields(jnc_Charset),
jnci_AsciiCharset__init_ = $this => {
    jnc_Charset__init_($this, $rt_s(95), $rt_createArray(jl_String, 0));
},
jnci_AsciiCharset__init_0 = () => {
    let var_0 = new jnci_AsciiCharset();
    jnci_AsciiCharset__init_(var_0);
    return var_0;
},
jnci_AsciiCharset_newDecoder = $this => {
    return jnci_AsciiDecoder__init_0($this);
},
jnci_AsciiCharset_newEncoder = $this => {
    return jnci_AsciiEncoder__init_0($this);
},
ucics_AsyncResult = $rt_classWithoutFields(0);
function ucics_RpcClient$AsyncResultImpl() {
    let a = this; jl_Object.call(a);
    a.$result = null;
    a.$error = null;
    a.$completed = 0;
    a.$successCallbacks = null;
    a.$errorCallbacks = null;
}
let ucics_RpcClient$AsyncResultImpl__init_ = $this => {
    jl_Object__init_($this);
    $this.$successCallbacks = ju_ArrayList__init_0();
    $this.$errorCallbacks = ju_ArrayList__init_0();
},
ucics_RpcClient$AsyncResultImpl__init_0 = () => {
    let var_0 = new ucics_RpcClient$AsyncResultImpl();
    ucics_RpcClient$AsyncResultImpl__init_(var_0);
    return var_0;
},
ucics_RpcClient$AsyncResultImpl_complete = ($this, $value) => {
    let var$2, $cb;
    if ($this.$completed)
        return;
    $this.$result = $value;
    $this.$completed = 1;
    var$2 = $rt_nullCheck($this.$successCallbacks).$iterator();
    while (true) {
        var$2 = $rt_nullCheck(var$2);
        if (!var$2.$hasNext())
            break;
        $cb = $rt_castToInterface(var$2.$next(), juf_Consumer);
        $cb = $rt_nullCheck($cb);
        $cb.$accept($value);
    }
    $rt_nullCheck($this.$successCallbacks).$clear();
    $rt_nullCheck($this.$errorCallbacks).$clear();
},
ucics_RpcClient$AsyncResultImpl_completeExceptionally = ($this, $ex) => {
    let var$2, $cb;
    if ($this.$completed)
        return;
    $this.$error = $ex;
    $this.$completed = 1;
    var$2 = $rt_nullCheck($this.$errorCallbacks).$iterator();
    while (true) {
        var$2 = $rt_nullCheck(var$2);
        if (!var$2.$hasNext())
            break;
        $cb = $rt_castToInterface(var$2.$next(), juf_Consumer);
        $cb = $rt_nullCheck($cb);
        $cb.$accept($ex);
    }
    $rt_nullCheck($this.$successCallbacks).$clear();
    $rt_nullCheck($this.$errorCallbacks).$clear();
},
ucics_RpcClient$AsyncResultImpl_thenApply = ($this, $fn) => {
    let $next, var$3, $t, $$je;
    a: {
        $next = ucics_RpcClient$AsyncResultImpl__init_0();
        if (!$this.$completed) {
            $rt_nullCheck($this.$successCallbacks).$add(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0__init_0($next, $fn));
            var$3 = $this.$errorCallbacks;
            ju_Objects_requireNonNull($next);
            $rt_nullCheck(var$3).$add(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1__init_0($next));
        } else if ($this.$error !== null)
            $next.$completeExceptionally($this.$error);
        else {
            try {
                var$3 = $this.$result;
                $fn = $rt_nullCheck($fn);
                $next.$complete($fn.$apply(var$3));
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    $t = $$je;
                } else {
                    throw $$e;
                }
            }
            $next.$completeExceptionally($t);
        }
    }
    return $next;
},
ucics_RpcClient$AsyncResultImpl_lambda$thenApply$0 = ($next, $fn, $val) => {
    let var$4, $t, $$je;
    a: {
        try {
            $fn = $rt_nullCheck($fn);
            var$4 = $fn.$apply($val);
            $next = $rt_nullCheck($next);
            $next.$complete(var$4);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Throwable) {
                $t = $$je;
            } else {
                throw $$e;
            }
        }
        $next.$completeExceptionally($t);
    }
},
ucics_RpcClient$RpcResponseFuture = $rt_classWithoutFields(ucics_RpcClient$AsyncResultImpl),
ucics_RpcClient$RpcResponseFuture__init_ = $this => {
    ucics_RpcClient$AsyncResultImpl__init_($this);
},
ucics_RpcClient$RpcResponseFuture__init_0 = () => {
    let var_0 = new ucics_RpcClient$RpcResponseFuture();
    ucics_RpcClient$RpcResponseFuture__init_(var_0);
    return var_0;
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArrayStoreException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_ArrayStoreException__init_ = () => {
    let var_0 = new jl_ArrayStoreException();
    jl_ArrayStoreException__init_0(var_0);
    return var_0;
},
csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter__init_0 = $this => {
    let var$1, var$2;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls(jl_Void));
    csw_ProtoAdapter__init_3($this, var$1, var$2);
},
csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter__init_ = () => {
    let var_0 = new csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter();
    csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter__init_0(var_0);
    return var_0;
},
csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $rt_throw(jl_IllegalStateException__init_($rt_s(96)));
},
csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter_encode($this, $writer, $rt_castToClass($value, jl_Void));
},
kr_KClassifier = $rt_classWithoutFields(0),
kr_KClass = $rt_classWithoutFields(0);
function ji_FilterOutputStream() {
    ji_OutputStream.call(this);
    this.$out2 = null;
}
let ji_FilterOutputStream__init_ = ($this, $out) => {
    ji_OutputStream__init_($this);
    $this.$out2 = $out;
},
ji_FilterOutputStream__init_0 = var_0 => {
    let var_1 = new ji_FilterOutputStream();
    ji_FilterOutputStream__init_(var_1, var_0);
    return var_1;
},
jl_Appendable = $rt_classWithoutFields(0);
function ji_PrintStream() {
    let a = this; ji_FilterOutputStream.call(a);
    a.$autoFlush = 0;
    a.$sb = null;
    a.$buffer1 = null;
    a.$charset0 = null;
}
let ji_PrintStream__init_0 = ($this, $out, $autoFlush) => {
    ji_FilterOutputStream__init_($this, $out);
    $this.$sb = jl_StringBuilder__init_();
    $this.$buffer1 = $rt_createCharArray(32);
    $this.$autoFlush = $autoFlush;
    jnci_UTF8Charset_$callClinit();
    $this.$charset0 = jnci_UTF8Charset_INSTANCE;
},
ji_PrintStream__init_1 = (var_0, var_1) => {
    let var_2 = new ji_PrintStream();
    ji_PrintStream__init_0(var_2, var_0, var_1);
    return var_2;
},
ji_PrintStream__init_ = ($this, $out) => {
    ji_PrintStream__init_0($this, $out, 0);
},
ji_PrintStream__init_2 = var_0 => {
    let var_1 = new ji_PrintStream();
    ji_PrintStream__init_(var_1, var_0);
    return var_1;
},
otcic_JsConsolePrintStream = $rt_classWithoutFields(ji_PrintStream),
otcic_JsConsolePrintStream__init_ = $this => {
    ji_PrintStream__init_($this, ji_ByteArrayOutputStream__init_1());
},
otcic_JsConsolePrintStream_println1 = ($this, $s) => {
    $this.$print($s);
    $this.$print($rt_s(48));
},
otcic_JsConsolePrintStream_println0 = $this => {
    $this.$print($rt_s(48));
},
otcic_JsConsolePrintStream_println = ($this, $s) => {
    $this.$println1(ju_Objects_toString($s));
},
otcic_JSStdoutPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStdoutPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStdoutPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStdoutPrintStream();
    otcic_JSStdoutPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStdoutPrintStream_print = ($this, $s) => {
    $rt_putStdout($rt_ustr($s));
},
csw_FieldEncoding$Companion = $rt_classWithoutFields(),
csw_FieldEncoding$Companion__init_ = $this => {
    jl_Object__init_($this);
},
csw_FieldEncoding$Companion__init_2 = () => {
    let var_0 = new csw_FieldEncoding$Companion();
    csw_FieldEncoding$Companion__init_(var_0);
    return var_0;
},
csw_FieldEncoding$Companion__init_0 = ($this, $$constructor_marker) => {
    csw_FieldEncoding$Companion__init_($this);
},
csw_FieldEncoding$Companion__init_1 = var_0 => {
    let var_1 = new csw_FieldEncoding$Companion();
    csw_FieldEncoding$Companion__init_0(var_1, var_0);
    return var_1;
},
csw_FloatProtoAdapter = $rt_classWithoutFields(csw_ProtoAdapter),
csw_FloatProtoAdapter__init_ = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_FIXED32;
    var$2 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_floatcls));
    var$3 = null;
    csw_Syntax_$callClinit();
    var$4 = csw_Syntax_PROTO_2;
    var$5 = jl_Float_valueOf(0.0);
    csw_ProtoAdapter__init_($this, var$1, var$2, var$3, var$4, var$5);
},
csw_FloatProtoAdapter__init_0 = () => {
    let var_0 = new csw_FloatProtoAdapter();
    csw_FloatProtoAdapter__init_(var_0);
    return var_0;
},
csw_FloatProtoAdapter_encode = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    var$3 = jl_Float_floatToIntBits($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeFixed32($writer, var$3);
},
csw_FloatProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_FloatProtoAdapter_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$floatValue());
},
juf_Function = $rt_classWithoutFields(0);
function csw_LongArrayProtoAdapter() {
    csw_ProtoAdapter.call(this);
    this.$originalAdapter = null;
}
let csw_LongArrayProtoAdapter__init_0 = ($this, $originalAdapter) => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($originalAdapter, $rt_s(83));
    csw_FieldEncoding_$callClinit();
    var$2 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$3 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_arraycls($rt_longcls)));
    var$4 = null;
    $originalAdapter = $rt_nullCheck($originalAdapter);
    var$5 = csw_ProtoAdapter_getSyntax($originalAdapter);
    var$6 = $rt_createLongArray(0);
    csw_ProtoAdapter__init_($this, var$2, var$3, var$4, var$5, var$6);
    $this.$originalAdapter = $originalAdapter;
},
csw_LongArrayProtoAdapter__init_ = var_0 => {
    let var_1 = new csw_LongArrayProtoAdapter();
    csw_LongArrayProtoAdapter__init_0(var_1, var_0);
    return var_1;
},
csw_LongArrayProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null && (($value.data.length ? 0 : 1) ? 0 : 1))
        csw_ProtoAdapter_encodeWithTag($this, $writer, $tag, $value);
},
csw_LongArrayProtoAdapter_encode = ($this, $writer, $value) => {
    let var$3, $i, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    var$3 = $value.data;
    $i = var$3.length - 1 | 0;
    while ((-1) < $i) {
        var$5 = $this.$originalAdapter;
        $i = $rt_checkUpperBound($i, var$3);
        var$6 = jl_Long_valueOf(var$3[$i]);
        $rt_nullCheck(var$5).$encode1($writer, var$6);
        $i = $i + (-1) | 0;
    }
},
csw_LongArrayProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_LongArrayProtoAdapter_encodeWithTag($this, $writer, $tag, $rt_castToInterface($value, $rt_arraycls($rt_longcls)));
},
csw_LongArrayProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_LongArrayProtoAdapter_encode($this, $writer, $rt_castToInterface($value, $rt_arraycls($rt_longcls)));
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otp_Platform_isInstance = (var$1, $cls) => {
    return var$1 !== null && !(typeof var$1.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable(var$1.constructor, $cls) ? 1 : 0;
},
otp_Platform_isAssignable = ($from, $to) => {
    let $supertypes, $i;
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
},
otp_Platform_getEnumConstants = var$1 => {
    let c = '$$enumConstants$$';
    k_LazyThreadSafetyMode[c] = k_LazyThreadSafetyMode_values;
    jus_Collector$Characteristics[c] = jus_Collector$Characteristics_values;
    csw_FieldEncoding[c] = csw_FieldEncoding_values;
    csw_Syntax[c] = csw_Syntax_values;
    ucicsp_RpcPacket$Type[c] = ucicsp_RpcPacket$Type_values;
    otp_Platform_getEnumConstants = cls => {
        if (!cls.hasOwnProperty(c)) {
            return null;
        }
        if (typeof cls[c] === "function") {
            cls[c] = cls[c]();
        }
        return cls[c];
    };
    return otp_Platform_getEnumConstants(var$1);
},
otp_Platform_isPrimitive = var$1 => {
    return var$1.$meta.primitive ? 1 : 0;
},
otp_Platform_getArrayItem = $cls => {
    return $cls.$meta.item;
},
otp_Platform_getName = $cls => {
    return $rt_str($cls.$meta.name);
},
k_TuplesKt = $rt_classWithoutFields(),
k_TuplesKt_to = ($$this$to, $that) => {
    return k_Pair__init_0($$this$to, $that);
};
function jnc_CodingErrorAction() {
    jl_Object.call(this);
    this.$name13 = null;
}
let jnc_CodingErrorAction_IGNORE = null,
jnc_CodingErrorAction_REPLACE = null,
jnc_CodingErrorAction_REPORT = null,
jnc_CodingErrorAction_$callClinit = () => {
    jnc_CodingErrorAction_$callClinit = $rt_eraseClinit(jnc_CodingErrorAction);
    jnc_CodingErrorAction__clinit_();
},
jnc_CodingErrorAction__init_0 = ($this, $name) => {
    jnc_CodingErrorAction_$callClinit();
    jl_Object__init_($this);
    $this.$name13 = $name;
},
jnc_CodingErrorAction__init_ = var_0 => {
    let var_1 = new jnc_CodingErrorAction();
    jnc_CodingErrorAction__init_0(var_1, var_0);
    return var_1;
},
jnc_CodingErrorAction__clinit_ = () => {
    jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(97));
    jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(98));
    jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(99));
},
csw_ProtoWriter$Companion = $rt_classWithoutFields(),
csw_ProtoWriter$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
csw_ProtoWriter$Companion__init_2 = () => {
    let var_0 = new csw_ProtoWriter$Companion();
    csw_ProtoWriter$Companion__init_0(var_0);
    return var_0;
},
csw_ProtoWriter$Companion_makeTag$wire_runtime = ($this, $fieldNumber, $fieldEncoding) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    var$3 = $fieldNumber << 3;
    $fieldEncoding = $rt_nullCheck($fieldEncoding);
    return var$3 | csw_FieldEncoding_getValue$wire_runtime($fieldEncoding);
},
csw_ProtoWriter$Companion_varint32Size$wire_runtime = ($this, $value) => {
    if (!($value & (-128)))
        return 1;
    if (!($value & (-16384)))
        return 2;
    if (!($value & (-2097152)))
        return 3;
    return $value & (-268435456) ? 5 : 4;
},
csw_ProtoWriter$Companion_varint64Size$wire_runtime = ($this, $value) => {
    if (Long_eq(Long_and($value, Long_fromInt(-128)), Long_ZERO))
        return 1;
    if (Long_eq(Long_and($value, Long_fromInt(-16384)), Long_ZERO))
        return 2;
    if (Long_eq(Long_and($value, Long_fromInt(-2097152)), Long_ZERO))
        return 3;
    if (Long_eq(Long_and($value, Long_fromInt(-268435456)), Long_ZERO))
        return 4;
    if (Long_eq(Long_and($value, Long_create(0, 4294967288)), Long_ZERO))
        return 5;
    if (Long_eq(Long_and($value, Long_create(0, 4294966272)), Long_ZERO))
        return 6;
    if (Long_eq(Long_and($value, Long_create(0, 4294836224)), Long_ZERO))
        return 7;
    if (Long_eq(Long_and($value, Long_create(0, 4278190080)), Long_ZERO))
        return 8;
    return Long_ne(Long_and($value, Long_create(0, 2147483648)), Long_ZERO) ? 10 : 9;
},
csw_ProtoWriter$Companion_encodeZigZag32$wire_runtime = ($this, $n) => {
    return $n << 1 ^ $n >> 31;
},
csw_ProtoWriter$Companion_encodeZigZag64$wire_runtime = ($this, $n) => {
    return Long_xor(Long_shl($n, 1), Long_shr($n, 63));
},
csw_ProtoWriter$Companion__init_ = ($this, $$constructor_marker) => {
    csw_ProtoWriter$Companion__init_0($this);
},
csw_ProtoWriter$Companion__init_1 = var_0 => {
    let var_1 = new csw_ProtoWriter$Companion();
    csw_ProtoWriter$Companion__init_(var_1, var_0);
    return var_1;
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_0 = $this => {
    jl_AbstractStringBuilder__init_($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_ = ($this, $capacity) => {
    jl_Object__init_($this);
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append5 = ($this, $obj) => {
    return $this.$insert($this.$length0, $obj);
},
jl_AbstractStringBuilder_append = ($this, $string) => {
    return $this.$insert0($this.$length0, $string);
},
jl_AbstractStringBuilder_insert2 = ($this, $index, $string) => {
    let $i, var$4, var$5, var$6, var$7;
    if ($index >= 0 && $index <= $this.$length0) {
        if ($string === null)
            $string = $rt_s(93);
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
},
jl_AbstractStringBuilder_append0 = ($this, $value) => {
    return $this.$append1($value, 10);
},
jl_AbstractStringBuilder_append8 = ($this, $value, $radix) => {
    return $this.$insert1($this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert7 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10, var$11, var$12, var$13;
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
},
jl_AbstractStringBuilder_append4 = ($this, $value) => {
    return $this.$insert2($this.$length0, $value);
},
jl_AbstractStringBuilder_insert5 = ($this, $target, $value) => {
    return $this.$insert3($target, $value, 10);
},
jl_AbstractStringBuilder_insert6 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, var$7, $sz, $pos, $posLimit, var$11, var$12, var$13;
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
                var$6 = $this.$buffer;
                var$7 = $target + 1 | 0;
                var$6 = $rt_nullCheck(var$6).data;
                $target = $rt_checkBounds($target, var$6);
                var$6[$target] = 45;
                $target = var$7;
            }
            var$6 = $this.$buffer;
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
                var$6 = $this.$buffer;
                var$12 = $target + 1 | 0;
                var$6 = $rt_nullCheck(var$6).data;
                $target = $rt_checkBounds($target, var$6);
                var$6[$target] = 45;
            }
            while (true) {
                if (Long_eq(var$11, Long_ZERO))
                    break a;
                var$6 = $this.$buffer;
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
},
jl_AbstractStringBuilder_append2 = ($this, $value) => {
    return $this.$insert4($this.$length0, $value);
},
jl_AbstractStringBuilder_insert0 = ($this, $target, $value) => {
    let var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, $pos, var$17, var$18, $i, $intDigit;
    var$3 = $rt_compare($value, 0.0);
    if (!var$3) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer;
            var$3 = $target + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            $target = $rt_checkBounds($target, var$4);
            var$4[$target] = 48;
            var$4 = $this.$buffer;
            var$5 = var$3 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$3, var$4)] = 46;
            var$4 = $rt_nullCheck($this.$buffer).data;
            var$4[$rt_checkBounds(var$5, var$4)] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer;
        var$3 = $target + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $target = $rt_checkBounds($target, var$4);
        var$4[$target] = 45;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 48;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 46;
        var$4 = $rt_nullCheck($this.$buffer).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer;
        var$3 = $target + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $target = $rt_checkBounds($target, var$4);
        var$4[$target] = 78;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 97;
        var$4 = $rt_nullCheck($this.$buffer).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 78;
        return $this;
    }
    if (!isFinite($value) ? 1 : 0) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer;
            var$3 = $target + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            $target = $rt_checkBounds($target, var$4);
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 73;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 110;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 102;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 105;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 110;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 105;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 116;
        var$4 = $rt_nullCheck($this.$buffer).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_floatAnalysisResult;
    otcit_FloatAnalyzer_analyze($value, $number);
    $number = $rt_nullCheck($number);
    $mantissa = $number.$mantissa0;
    $exp = $number.$exponent0;
    $negative = $number.$sign0;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 9;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros0($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + ($digits + $leadingZeros | 0) | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$5 = $target;
    else {
        var$4 = $this.$buffer;
        var$5 = $target + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $target = $rt_checkBounds($target, var$4);
        var$4[$target] = 45;
    }
    $pos = 100000000;
    if ($leadingZero) {
        var$4 = $this.$buffer;
        var$17 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 48;
        var$4 = $this.$buffer;
        var$5 = var$17 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$17, var$4)] = 46;
        while (true) {
            var$17 = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            var$4 = $this.$buffer;
            var$18 = var$5 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$5, var$4)] = 48;
            $leadingZeros = var$17;
            var$5 = var$18;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if ($pos <= 0)
            $intDigit = 0;
        else {
            $intDigit = $mantissa / $pos | 0;
            $mantissa = $mantissa % $pos | 0;
        }
        var$4 = $this.$buffer;
        var$17 = var$5 + 1 | 0;
        var$18 = (48 + $intDigit | 0) & 65535;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = var$18;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$5 = var$17;
        else {
            var$4 = $this.$buffer;
            var$5 = var$17 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$17, var$4)] = 46;
        }
        $pos = $pos / 10 | 0;
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer;
        var$17 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 69;
        if ($exp >= 0)
            var$18 = var$17;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer;
            var$18 = var$17 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$17, var$4)] = 45;
        }
        if ($exp < 10)
            var$5 = var$18;
        else {
            var$4 = $this.$buffer;
            var$5 = var$18 + 1 | 0;
            var$17 = (48 + ($exp / 10 | 0) | 0) & 65535;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$18, var$4)] = var$17;
        }
        var$4 = $this.$buffer;
        var$3 = (48 + ($exp % 10 | 0) | 0) & 65535;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = var$3;
    }
    return $this;
},
jl_AbstractStringBuilder_append3 = ($this, $value) => {
    return $this.$insert5($this.$length0, $value);
},
jl_AbstractStringBuilder_insert1 = ($this, $target, $value) => {
    let var$3, var$4, var$5, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $zeros, $leadingZeros, $leadingZero, $pos, var$17, var$18, $i, $intDigit;
    var$3 = $rt_compare($value, 0.0);
    if (!var$3) {
        if (1.0 / $value === Infinity) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
            var$4 = $this.$buffer;
            var$3 = $target + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            $target = $rt_checkBounds($target, var$4);
            var$4[$target] = 48;
            var$4 = $this.$buffer;
            var$5 = var$3 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$3, var$4)] = 46;
            var$4 = $rt_nullCheck($this.$buffer).data;
            var$4[$rt_checkBounds(var$5, var$4)] = 48;
            return $this;
        }
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer;
        var$3 = $target + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $target = $rt_checkBounds($target, var$4);
        var$4[$target] = 45;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 48;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 46;
        var$4 = $rt_nullCheck($this.$buffer).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer;
        var$3 = $target + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $target = $rt_checkBounds($target, var$4);
        var$4[$target] = 78;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 97;
        var$4 = $rt_nullCheck($this.$buffer).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 78;
        return $this;
    }
    if (!isFinite($value) ? 1 : 0) {
        if (var$3 > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            var$3 = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer;
            var$3 = $target + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            $target = $rt_checkBounds($target, var$4);
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 73;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 110;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 102;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 105;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 110;
        var$4 = $this.$buffer;
        var$3 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 105;
        var$4 = $this.$buffer;
        var$5 = var$3 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$3, var$4)] = 116;
        var$4 = $rt_nullCheck($this.$buffer).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 121;
        return $this;
    }
    jl_AbstractStringBuilder$Constants_$callClinit();
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $number = $rt_nullCheck($number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    $leadingZeros = 0;
    $leadingZero = 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else {
            $intPart = 0;
            $leadingZeros = ( -$exp | 0) - 1 | 0;
            $leadingZero = 1;
            $sz = $sz + 1 | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    var$3 = $sz + ($digits + $leadingZeros | 0) | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + var$3 | 0);
    if (!$negative)
        var$5 = $target;
    else {
        var$4 = $this.$buffer;
        var$5 = $target + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $target = $rt_checkBounds($target, var$4);
        var$4[$target] = 45;
    }
    $pos = Long_create(1569325056, 23283064);
    if ($leadingZero) {
        var$4 = $this.$buffer;
        var$17 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 48;
        var$4 = $this.$buffer;
        var$5 = var$17 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$17, var$4)] = 46;
        while (true) {
            var$17 = $leadingZeros + (-1) | 0;
            if ($leadingZeros <= 0)
                break;
            var$4 = $this.$buffer;
            var$18 = var$5 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$5, var$4)] = 48;
            $leadingZeros = var$17;
            var$5 = var$18;
        }
    }
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_lo(Long_div($mantissa, $pos));
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$4 = $this.$buffer;
        var$17 = var$5 + 1 | 0;
        var$18 = (48 + $intDigit | 0) & 65535;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = var$18;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            var$5 = var$17;
        else {
            var$4 = $this.$buffer;
            var$5 = var$17 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$17, var$4)] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer;
        var$17 = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$5, var$4)] = 69;
        if ($exp >= 0)
            var$5 = var$17;
        else {
            $exp =  -$exp | 0;
            var$4 = $this.$buffer;
            var$5 = var$17 + 1 | 0;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$17, var$4)] = 45;
        }
        if ($exp >= 100) {
            var$4 = $this.$buffer;
            var$18 = var$5 + 1 | 0;
            var$17 = (48 + ($exp / 100 | 0) | 0) & 65535;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$5, var$4)] = var$17;
            $exp = $exp % 100 | 0;
            var$4 = $this.$buffer;
            var$17 = var$18 + 1 | 0;
            var$5 = (48 + ($exp / 10 | 0) | 0) & 65535;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$18, var$4)] = var$5;
        } else if ($exp < 10)
            var$17 = var$5;
        else {
            var$4 = $this.$buffer;
            var$17 = var$5 + 1 | 0;
            var$18 = (48 + ($exp / 10 | 0) | 0) & 65535;
            var$4 = $rt_nullCheck(var$4).data;
            var$4[$rt_checkBounds(var$5, var$4)] = var$18;
        }
        var$4 = $this.$buffer;
        var$3 = (48 + ($exp % 10 | 0) | 0) & 65535;
        var$4 = $rt_nullCheck(var$4).data;
        var$4[$rt_checkBounds(var$17, var$4)] = var$3;
    }
    return $this;
},
jl_AbstractStringBuilder_trailingDecimalZeros0 = $n => {
    let $result, $zeros, var$4, var$5;
    if (!($n % 1000000000 | 0))
        return 9;
    $result = 0;
    $zeros = 1;
    if (!($n % 100000000 | 0)) {
        $result = 8;
        $zeros = 100000000;
    }
    var$4 = $zeros * 10000 | 0;
    if ($n % var$4 | 0)
        var$4 = $zeros;
    else
        $result = $result | 4;
    var$5 = var$4 * 100 | 0;
    if ($n % var$5 | 0)
        var$5 = var$4;
    else
        $result = $result | 2;
    if (!($n % (var$5 * 10 | 0) | 0))
        $result = $result | 1;
    return $result;
},
jl_AbstractStringBuilder_trailingDecimalZeros = $n => {
    let $zeros, $result, $bit, $i, var$6;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    jl_AbstractStringBuilder$Constants_$callClinit();
    $i = $rt_nullCheck(jl_AbstractStringBuilder$Constants_longLogPowersOfTen).data.length - 1 | 0;
    while ($i >= 0) {
        var$6 = $rt_nullCheck(jl_AbstractStringBuilder$Constants_longLogPowersOfTen).data;
        $i = $rt_checkBounds($i, var$6);
        if (Long_eq(Long_rem($n, Long_mul($zeros, var$6[$i])), Long_ZERO)) {
            $result = $result | $bit;
            var$6 = $rt_nullCheck(jl_AbstractStringBuilder$Constants_longLogPowersOfTen).data;
            $i = $rt_checkUpperBound($i, var$6);
            $zeros = Long_mul($zeros, var$6[$i]);
        }
        $bit = $bit >>> 1 | 0;
        $i = $i + (-1) | 0;
    }
    return $result;
},
jl_AbstractStringBuilder_append6 = ($this, $c) => {
    return $this.$insert6($this.$length0, $c);
},
jl_AbstractStringBuilder_insert4 = ($this, $index, $c) => {
    let var$3;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    var$3 = $rt_nullCheck($this.$buffer).data;
    $index = $rt_checkBounds($index, var$3);
    var$3[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_insert3 = ($this, $index, $obj) => {
    return $this.$insert0($index, $obj === null ? $rt_s(93) : $obj.$toString());
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let $newLength;
    if ($rt_nullCheck($this.$buffer).data.length >= $capacity)
        return;
    $newLength = $rt_nullCheck($this.$buffer).data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($rt_nullCheck($this.$buffer).data.length * 2 | 0, 5));
    $this.$buffer = ju_Arrays_copyOf0($this.$buffer, $newLength);
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_8($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_append1 = ($this, $s, $start, $end) => {
    return $this.$insert7($this.$length0, $s, $start, $end);
},
jl_AbstractStringBuilder_insert = ($this, $index, $s, $i, $end) => {
    let var$5, var$6, var$7;
    if ($i <= $end) {
        $s = $rt_nullCheck($s);
        if ($end <= $s.$length() && $i >= 0) {
            jl_AbstractStringBuilder_insertSpace($this, $index, ($index + $end | 0) - $i | 0);
            while ($i < $end) {
                var$5 = $this.$buffer;
                var$6 = $index + 1 | 0;
                var$7 = $s.$charAt($i);
                var$5 = $rt_nullCheck(var$5).data;
                var$5[$rt_checkBounds($index, var$5)] = var$7;
                $i = $i + 1 | 0;
                $index = var$6;
            }
            return $this;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
jl_AbstractStringBuilder_append7 = ($this, $s) => {
    $s = $rt_nullCheck($s);
    return $this.$append7($s, 0, $s.$length());
},
jl_AbstractStringBuilder_delete = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6, var$7, var$8, var$9;
    if ($start >= 0) {
        var$3 = $rt_compare($start, $end);
        if (var$3 <= 0 && $start <= $this.$length0) {
            if (!var$3)
                return $this;
            if ($end > $this.$length0)
                $end = $this.$length0;
            $sz = $this.$length0 - $end | 0;
            $this.$length0 = $this.$length0 - ($end - $start | 0) | 0;
            $i = 0;
            while ($i < $sz) {
                var$6 = $this.$buffer;
                var$3 = $start + 1 | 0;
                var$7 = $this.$buffer;
                var$8 = $end + 1 | 0;
                var$7 = $rt_nullCheck(var$7).data;
                var$9 = var$7[$rt_checkBounds($end, var$7)];
                var$6 = $rt_nullCheck(var$6).data;
                var$6[$rt_checkBounds($start, var$6)] = var$9;
                $i = $i + 1 | 0;
                $start = var$3;
                $end = var$8;
            }
            return $this;
        }
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_replace = ($this, $start, $end, $str) => {
    let $oldSize, $i, var$6, var$7, var$8;
    if ($start >= 0 && $start <= $end && $start <= $this.$length0) {
        if ($end > $this.$length0)
            $end = $this.$length0;
        $oldSize = $end - $start | 0;
        $str = $rt_nullCheck($str);
        if ($str.$length() > $oldSize)
            jl_AbstractStringBuilder_insertSpace($this, $end, $start + $str.$length() | 0);
        else if ($str.$length() < $oldSize)
            $this.$delete($start + $str.$length() | 0, $end);
        $i = 0;
        while ($i < $str.$length()) {
            var$6 = $this.$buffer;
            var$7 = $start + 1 | 0;
            var$8 = $str.$charAt($i);
            var$6 = $rt_nullCheck(var$6).data;
            var$6[$rt_checkBounds($start, var$6)] = var$8;
            $i = $i + 1 | 0;
            $start = var$7;
        }
        return $this;
    }
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let $sz, $i, var$5, var$6, var$7, var$8;
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
};
function jl_Boolean() {
    jl_Object.call(this);
    this.$value15 = 0;
}
let jl_Boolean_TRUE = null,
jl_Boolean_FALSE = null,
jl_Boolean_TYPE = null,
jl_Boolean_$callClinit = () => {
    jl_Boolean_$callClinit = $rt_eraseClinit(jl_Boolean);
    jl_Boolean__clinit_();
},
jl_Boolean__init_0 = ($this, $value) => {
    jl_Boolean_$callClinit();
    jl_Object__init_($this);
    $this.$value15 = $value;
},
jl_Boolean__init_ = var_0 => {
    let var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
},
jl_Boolean_valueOf = $value => {
    jl_Boolean_$callClinit();
    return !$value ? jl_Boolean_FALSE : jl_Boolean_TRUE;
},
jl_Boolean__clinit_ = () => {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls);
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalArgumentException__init_2 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalArgumentException__init_0 = () => {
    let var_0 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_2(var_0);
    return var_0;
},
jl_IllegalArgumentException__init_1 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalArgumentException__init_ = var_0 => {
    let var_1 = new jl_IllegalArgumentException();
    jl_IllegalArgumentException__init_1(var_1, var_0);
    return var_1;
};
function jnc_IllegalCharsetNameException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName = null;
}
let jnc_IllegalCharsetNameException__init_0 = ($this, $charsetName) => {
    jl_IllegalArgumentException__init_2($this);
    $this.$charsetName = $charsetName;
},
jnc_IllegalCharsetNameException__init_ = var_0 => {
    let var_1 = new jnc_IllegalCharsetNameException();
    jnc_IllegalCharsetNameException__init_0(var_1, var_0);
    return var_1;
},
kji_ClassBasedDeclarationContainer = $rt_classWithoutFields(0);
function kji_ClassReference() {
    jl_Object.call(this);
    this.$jClass = null;
}
let kji_ClassReference_Companion = null,
kji_ClassReference_FUNCTION_CLASSES = null,
kji_ClassReference_primitiveFqNames = null,
kji_ClassReference_primitiveWrapperFqNames = null,
kji_ClassReference_classFqNames = null,
kji_ClassReference_simpleNames = null,
kji_ClassReference_$callClinit = () => {
    kji_ClassReference_$callClinit = $rt_eraseClinit(kji_ClassReference);
    kji_ClassReference__clinit_();
},
kji_ClassReference__init_ = ($this, $jClass) => {
    kji_ClassReference_$callClinit();
    kji_Intrinsics_checkNotNullParameter($jClass, $rt_s(100));
    jl_Object__init_($this);
    $this.$jClass = $jClass;
},
kji_ClassReference__init_0 = var_0 => {
    let var_1 = new kji_ClassReference();
    kji_ClassReference__init_(var_1, var_0);
    return var_1;
},
kji_ClassReference_getJClass = $this => {
    return $this.$jClass;
},
kji_ClassReference__clinit_ = () => {
    let var$1, $$this$mapIndexed$iv, $destination$iv$iv, $index$iv$iv, var$5, $item$iv$iv, var$7, $clazz, var$9, $$this$associateTo$iv, var$11, $element$iv, var$13, $kotlinName, var$15, $klass, $arity, $$this$mapValues$iv, $$this$associateByTo$iv$iv$iv, $element$iv$iv$iv, $it$iv$iv, $fqName;
    kji_ClassReference_Companion = kji_ClassReference$Companion__init_1(null);
    var$1 = $rt_wrapArray(jl_Class, [$rt_cls(kjf_Function0), $rt_cls(kjf_Function1), $rt_cls(kjf_Function2), $rt_cls(kjf_Function3), $rt_cls(kjf_Function4), $rt_cls(kjf_Function5), $rt_cls(kjf_Function6), $rt_cls(kjf_Function7), $rt_cls(kjf_Function8), $rt_cls(kjf_Function9), $rt_cls(kjf_Function10), $rt_cls(kjf_Function11), $rt_cls(kjf_Function12), $rt_cls(kjf_Function13), $rt_cls(kjf_Function14), $rt_cls(kjf_Function15), $rt_cls(kjf_Function16), $rt_cls(kjf_Function17), $rt_cls(kjf_Function18), $rt_cls(kjf_Function19),
    $rt_cls(kjf_Function20), $rt_cls(kjf_Function21), $rt_cls(kjf_Function22)]);
    $$this$mapIndexed$iv = $rt_castToInterface(kc_CollectionsKt__CollectionsKt_listOf(var$1), jl_Iterable);
    $destination$iv$iv = $rt_castToInterface(ju_ArrayList__init_3(kc_CollectionsKt__IterablesKt_collectionSizeOrDefault($$this$mapIndexed$iv, 10)), ju_Collection);
    $index$iv$iv = 0;
    $$this$mapIndexed$iv = $rt_nullCheck($$this$mapIndexed$iv);
    var$5 = $$this$mapIndexed$iv.$iterator();
    while (true) {
        var$5 = $rt_nullCheck(var$5);
        if (!var$5.$hasNext())
            break;
        $item$iv$iv = var$5.$next();
        var$7 = $index$iv$iv + 1 | 0;
        if ($index$iv$iv < 0)
            kc_CollectionsKt__CollectionsKt_throwIndexOverflow();
        $clazz = $rt_castToClass($item$iv$iv, jl_Class);
        var$9 = k_TuplesKt_to($clazz, jl_Integer_valueOf($index$iv$iv));
        $destination$iv$iv = $rt_nullCheck($destination$iv$iv);
        $destination$iv$iv.$add(var$9);
        $index$iv$iv = var$7;
    }
    var$5 = $rt_castToInterface($destination$iv$iv, ju_List);
    var$5 = $rt_castToInterface(var$5, jl_Iterable);
    kji_ClassReference_FUNCTION_CLASSES = kc_MapsKt__MapsKt_toMap0(var$5);
    var$5 = ju_HashMap__init_0();
    var$5.$put3($rt_s(101), $rt_s(102));
    var$5.$put3($rt_s(103), $rt_s(104));
    var$5.$put3($rt_s(105), $rt_s(106));
    var$5.$put3($rt_s(107), $rt_s(108));
    var$5.$put3($rt_s(109), $rt_s(110));
    var$5.$put3($rt_s(111), $rt_s(112));
    var$5.$put3($rt_s(113), $rt_s(114));
    var$5.$put3($rt_s(115), $rt_s(116));
    kji_ClassReference_primitiveFqNames = var$5;
    var$5 = ju_HashMap__init_0();
    var$5.$put3($rt_s(117), $rt_s(102));
    var$5.$put3($rt_s(118), $rt_s(104));
    var$5.$put3($rt_s(119), $rt_s(106));
    var$5.$put3($rt_s(120), $rt_s(108));
    var$5.$put3($rt_s(121), $rt_s(110));
    var$5.$put3($rt_s(122), $rt_s(112));
    var$5.$put3($rt_s(123), $rt_s(114));
    var$5.$put3($rt_s(124), $rt_s(116));
    kji_ClassReference_primitiveWrapperFqNames = var$5;
    var$9 = ju_HashMap__init_0();
    var$9.$put3($rt_s(125), $rt_s(126));
    var$9.$put3($rt_s(127), $rt_s(128));
    var$9.$put3($rt_s(129), $rt_s(130));
    var$9.$put3($rt_s(131), $rt_s(132));
    var$9.$put3($rt_s(133), $rt_s(134));
    var$9.$put3($rt_s(135), $rt_s(136));
    var$9.$put3($rt_s(137), $rt_s(138));
    var$9.$put3($rt_s(139), $rt_s(140));
    var$9.$put3($rt_s(141), $rt_s(142));
    var$9.$put3($rt_s(143), $rt_s(144));
    var$9.$put3($rt_s(145), $rt_s(146));
    var$9.$put3($rt_s(147), $rt_s(148));
    var$9.$put3($rt_s(149), $rt_s(150));
    var$9.$put3($rt_s(151), $rt_s(152));
    var$9.$put3($rt_s(153), $rt_s(154));
    var$9.$put3($rt_s(155), $rt_s(156));
    var$9.$put3($rt_s(157), $rt_s(158));
    var$9.$put3($rt_s(159), $rt_s(160));
    var$9.$put3($rt_s(161), $rt_s(162));
    var$9.$putAll($rt_castToInterface(kji_ClassReference_primitiveFqNames, ju_Map));
    var$9.$putAll($rt_castToInterface(kji_ClassReference_primitiveWrapperFqNames, ju_Map));
    var$5 = $rt_nullCheck(kji_ClassReference_primitiveFqNames).$values0();
    kji_Intrinsics_checkNotNullExpressionValue(var$5, $rt_s(163));
    $$this$associateTo$iv = $rt_castToInterface(var$5, jl_Iterable);
    $$this$associateTo$iv = $rt_nullCheck($$this$associateTo$iv);
    var$11 = $$this$associateTo$iv.$iterator();
    while (true) {
        var$11 = $rt_nullCheck(var$11);
        if (!var$11.$hasNext())
            break;
        $element$iv = var$11.$next();
        var$13 = $rt_castToInterface(var$9, ju_Map);
        $kotlinName = $rt_castToClass($element$iv, jl_String);
        var$15 = (jl_StringBuilder__init_()).$append3($rt_s(164));
        kji_Intrinsics_checkNotNull($kotlinName);
        var$5 = k_TuplesKt_to($rt_nullCheck($rt_nullCheck($rt_nullCheck(var$15).$append3(kt_StringsKt__StringsKt_substringAfterLast$default($kotlinName, 46, null, 2, null))).$append3($rt_s(165))).$toString(), $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($kotlinName)).$append3($rt_s(166))).$toString());
        var$15 = $rt_nullCheck(var$5);
        var$5 = k_Pair_getFirst(var$15);
        var$15 = k_Pair_getSecond(var$15);
        $rt_nullCheck(var$13).$put3(var$5, var$15);
    }
    var$5 = $rt_nullCheck($rt_nullCheck(kji_ClassReference_FUNCTION_CLASSES).$entrySet()).$iterator();
    while (true) {
        var$5 = $rt_nullCheck(var$5);
        if (!var$5.$hasNext())
            break;
        var$13 = $rt_nullCheck($rt_castToInterface(var$5.$next(), ju_Map$Entry));
        $klass = $rt_castToClass(var$13.$getKey(), jl_Class);
        $arity = $rt_nullCheck($rt_castToClass(var$13.$getValue(), jl_Number)).$intValue();
        $klass = $rt_nullCheck($klass);
        var$9.$put3($klass.$getName(), $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(167))).$append4($arity)).$toString());
    }
    kji_ClassReference_classFqNames = var$9;
    $$this$mapValues$iv = $rt_castToInterface(kji_ClassReference_classFqNames, ju_Map);
    var$5 = new ju_LinkedHashMap;
    $$this$mapValues$iv = $rt_nullCheck($$this$mapValues$iv);
    ju_LinkedHashMap__init_(var$5, kc_MapsKt__MapsJVMKt_mapCapacity($$this$mapValues$iv.$size()));
    $destination$iv$iv = $rt_castToInterface(var$5, ju_Map);
    $$this$associateByTo$iv$iv$iv = $rt_castToInterface($$this$mapValues$iv.$entrySet(), jl_Iterable);
    $$this$associateByTo$iv$iv$iv = $rt_nullCheck($$this$associateByTo$iv$iv$iv);
    var$9 = $$this$associateByTo$iv$iv$iv.$iterator();
    while (true) {
        var$9 = $rt_nullCheck(var$9);
        if (!var$9.$hasNext())
            break;
        $element$iv$iv$iv = var$9.$next();
        $it$iv$iv = $rt_castToInterface($element$iv$iv$iv, ju_Map$Entry);
        $it$iv$iv = $rt_nullCheck($it$iv$iv);
        var$11 = $it$iv$iv.$getKey();
        $fqName = $rt_castToClass($it$iv$iv.$getValue(), jl_String);
        var$5 = kt_StringsKt__StringsKt_substringAfterLast$default($fqName, 46, null, 2, null);
        $destination$iv$iv = $rt_nullCheck($destination$iv$iv);
        $destination$iv$iv.$put3(var$11, var$5);
    }
    kji_ClassReference_simpleNames = $destination$iv$iv;
},
otji_JSWrapper$_clinit_$lambda$_33_1 = $rt_classWithoutFields(),
otji_JSWrapper$_clinit_$lambda$_33_1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
otji_JSWrapper$_clinit_$lambda$_33_1__init_0 = () => {
    let var_0 = new otji_JSWrapper$_clinit_$lambda$_33_1();
    otji_JSWrapper$_clinit_$lambda$_33_1__init_(var_0);
    return var_0;
},
otji_JSWrapper$_clinit_$lambda$_33_1_accept = (var$0, var$1) => {
    otji_JSWrapper_lambda$static$1(var$1);
},
otji_JSWrapper$_clinit_$lambda$_33_1_accept$exported$0 = (var$0, var$1) => {
    var$0.$accept(otji_JSWrapper_jsToJava(var$1));
},
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException),
ju_NoSuchElementException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
ju_NoSuchElementException__init_ = () => {
    let var_0 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_0(var_0);
    return var_0;
},
ju_NoSuchElementException__init_1 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
ju_NoSuchElementException__init_2 = var_0 => {
    let var_1 = new ju_NoSuchElementException();
    ju_NoSuchElementException__init_1(var_1, var_0);
    return var_1;
},
otcit_FloatAnalyzer = $rt_classWithoutFields(),
otcit_FloatAnalyzer_MAX_MANTISSA = 0,
otcit_FloatAnalyzer_mantissa10Table = null,
otcit_FloatAnalyzer_exp10Table = null,
otcit_FloatAnalyzer_$callClinit = () => {
    otcit_FloatAnalyzer_$callClinit = $rt_eraseClinit(otcit_FloatAnalyzer);
    otcit_FloatAnalyzer__clinit_();
},
otcit_FloatAnalyzer_analyze = ($d, $result) => {
    let $bits, var$4, $mantissa, $exponent, var$7, $decExponent, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_FloatAnalyzer_$callClinit();
    $bits = jl_Float_floatToIntBits($d);
    var$4 = !($bits & (-2147483648)) ? 0 : 1;
    $result = $rt_nullCheck($result);
    $result.$sign0 = var$4;
    $mantissa = $bits & 8388607;
    $exponent = $bits >> 23 & 255;
    if (!$mantissa && !$exponent) {
        $result.$mantissa0 = 0;
        $result.$exponent0 = 0;
        return;
    }
    if ($exponent)
        var$7 = $mantissa | 8388608;
    else {
        var$7 = $mantissa << 1;
        while (Long_eq(Long_and(Long_fromInt(var$7), Long_fromInt(8388608)), Long_ZERO)) {
            var$7 = var$7 << 1;
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch(otcit_FloatAnalyzer_exp10Table, $exponent);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$9 = otcit_FloatAnalyzer_exp10Table;
    var$4 = $decExponent + 1 | 0;
    var$9 = $rt_nullCheck(var$9).data;
    var$4 = $rt_checkBounds(var$4, var$9);
    $binExponentCorrection = $exponent - var$9[var$4] | 0;
    $mantissaShift = 9 + $binExponentCorrection | 0;
    var$9 = $rt_nullCheck(otcit_FloatAnalyzer_mantissa10Table).data;
    $decMantissa = otcit_FloatAnalyzer_mulAndShiftRight(var$7, var$9[$rt_checkUpperBound(var$4, var$9)], $mantissaShift);
    if ($decMantissa < otcit_FloatAnalyzer_MAX_MANTISSA) {
        while ($rt_ucmp($decMantissa, otcit_FloatAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = ($decMantissa * 10 | 0) + 9 | 0;
        }
        var$9 = otcit_FloatAnalyzer_exp10Table;
        var$4 = $decExponent + 1 | 0;
        var$9 = $rt_nullCheck(var$9).data;
        var$13 = $rt_checkBounds(var$4, var$9);
        var$4 = $exponent - var$9[var$13] | 0;
        $mantissaShift = 9 + var$4 | 0;
        var$9 = $rt_nullCheck(otcit_FloatAnalyzer_mantissa10Table).data;
        $decMantissa = otcit_FloatAnalyzer_mulAndShiftRight(var$7, var$9[$rt_checkUpperBound(var$13, var$9)], $mantissaShift);
    }
    var$7 = var$7 << 1;
    var$14 = var$7 + 1 | 0;
    var$9 = otcit_FloatAnalyzer_mantissa10Table;
    var$4 = $decExponent + 1 | 0;
    var$9 = $rt_nullCheck(var$9).data;
    var$4 = $rt_checkBounds(var$4, var$9);
    var$15 = var$9[var$4];
    var$13 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_FloatAnalyzer_mulAndShiftRight(var$14, var$15, var$13);
    var$7 = var$7 - 1 | 0;
    var$9 = $rt_nullCheck(otcit_FloatAnalyzer_mantissa10Table).data;
    $decMantissaLow = otcit_FloatAnalyzer_mulAndShiftRight(var$7, var$9[$rt_checkUpperBound(var$4, var$9)], var$13);
    $lowerPos = otcit_FloatAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_FloatAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = $rt_ucmp($lowerPos, $upperPos);
    var$7 = $posCmp > 0 ? $rt_imul($rt_udiv($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? $rt_imul($rt_udiv($decMantissa, $upperPos), $upperPos) + $upperPos | 0 : $rt_imul($rt_udiv(($decMantissa + ($upperPos / 2 | 0) | 0), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(Long_fromInt(var$7), Long_fromInt(1000000000)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$7 = $rt_udiv(var$7, 10);
            if ($rt_ucmp(var$7, 1000000000) < 0)
                break;
        }
    else if ($rt_ucmp(var$7, 100000000) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$7 = var$7 * 10 | 0;
    }
    $result.$mantissa0 = var$7;
    $result.$exponent0 = $decExponent - 50 | 0;
},
otcit_FloatAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 1;
    while (true) {
        $pos_0 = $pos * 10 | 0;
        var$5 = $rt_udiv($mantissa, $pos_0);
        var$6 = $rt_udiv($lower, $pos_0);
        if ($rt_ucmp(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_FloatAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_FloatAnalyzer_$callClinit();
    $pos = 1;
    while (true) {
        $pos_0 = $pos * 10 | 0;
        var$5 = $rt_udiv($mantissa, $pos_0);
        var$6 = $rt_udiv($upper, $pos_0);
        if ($rt_ucmp(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_FloatAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $result;
    otcit_FloatAnalyzer_$callClinit();
    $result = Long_mul(Long_and(Long_fromInt($a), Long_create(4294967295, 0)), Long_and(Long_fromInt($b), Long_create(4294967295, 0)));
    return Long_lo(Long_shru($result, 32 - $shift | 0));
},
otcit_FloatAnalyzer__clinit_ = () => {
    otcit_FloatAnalyzer_MAX_MANTISSA = $rt_udiv((-1), 10);
    otcit_FloatAnalyzer_mantissa10Table = $rt_createIntArrayFromData([(-18543760), (-873828468), (-1558056233), (-2105438446), (-791721136), (-1492370368), (-2052889754), (-707643228), (-1425108042), (-1999079893), (-621547450), (-1356231419), (-1943978595), (-533385374), (-1285701758), (-1887554866), (-443107408), (-1213479385), (-1829776968), (-350662770), (-1139523676), (-1770612400), (-255999462), (-1063793029), (-1710027882), (-159064234), (-986244846), (-1647989336), (-59802560), (-906835507), (-1584461865),
    (-2126562952), (-825520345), (-1519409735), (-2074521247), (-742253618), (-1452796353), (-2021230542), (-656988489), (-1384584251), (-1966660860), (-569676998), (-1314735058), (-1910781505), (-480270031), (-1243209484), (-1853561046), (-388717296), (-1169967296), (-1794967296), (-294967296), (-1094967296), (-1734967296), (-198967296), (-1018167296), (-1673527296), (-100663296), (-939524096), (-1610612736), (-2147483648), (-858993460), (-1546188227), (-2095944041), (-776530088), (-1480217529), (-2043167483),
    (-692087595), (-1412663535), (-1989124287), (-605618482), (-1343488245), (-1933784055), (-517074110), (-1272652747), (-1877115657), (-426404674), (-1200117198), (-1819087218), (-333559171), (-1125840796), (-1759666096), (-238485376), (-1049781760), (-1698818867), (-141129810), (-971897307), (-1636511305), (-41437710), (-892143627), (-1572708361), (-2117160148), (-810475859), (-1507374147), (-2064892777), (-726848065), (-1440471911), (-2011370988), (-641213203), (-1371964022), (-1956564688)]);
    otcit_FloatAnalyzer_exp10Table = $rt_createIntArrayFromData([(-37), (-34), (-31), (-28), (-24), (-21), (-18), (-14), (-11), (-8), (-4), (-1), 2, 6, 9, 12, 16, 19, 22, 26, 29, 32, 36, 39, 42, 46, 49, 52, 56, 59, 62, 65, 69, 72, 75, 79, 82, 85, 89, 92, 95, 99, 102, 105, 109, 112, 115, 119, 122, 125, 129, 132, 135, 139, 142, 145, 149, 152, 155, 158, 162, 165, 168, 172, 175, 178, 182, 185, 188, 192, 195, 198, 202, 205, 208, 212, 215, 218, 222, 225, 228, 232, 235, 238, 242, 245, 248, 252, 255, 258, 261, 265,
    268, 271, 275, 278, 281, 285, 288, 291]);
};
function ucicsp_RpcPacket$Builder() {
    let a = this; csw_Message$Builder.call(a);
    a.$type1 = null;
    a.$serviceId0 = null;
    a.$methodName1 = null;
    a.$requestId1 = null;
    a.$replyTo0 = null;
    a.$payload1 = null;
}
let ucicsp_RpcPacket$Builder__init_0 = $this => {
    csw_Message$Builder__init_($this);
    ucicsp_RpcPacket$Type_$callClinit();
    $this.$type1 = ucicsp_RpcPacket$Type_REQUEST;
    $this.$serviceId0 = $rt_s(6);
    $this.$methodName1 = $rt_s(6);
    $this.$requestId1 = $rt_s(6);
    $this.$replyTo0 = $rt_s(6);
    o_ByteString_$callClinit();
    $this.$payload1 = o_ByteString_EMPTY;
},
ucicsp_RpcPacket$Builder__init_ = () => {
    let var_0 = new ucicsp_RpcPacket$Builder();
    ucicsp_RpcPacket$Builder__init_0(var_0);
    return var_0;
},
ucicsp_RpcPacket$Builder_type = ($this, $type) => {
    $this.$type1 = $type;
    return $this;
},
ucicsp_RpcPacket$Builder_serviceId = ($this, $serviceId) => {
    $this.$serviceId0 = $serviceId;
    return $this;
},
ucicsp_RpcPacket$Builder_methodName = ($this, $methodName) => {
    $this.$methodName1 = $methodName;
    return $this;
},
ucicsp_RpcPacket$Builder_requestId = ($this, $requestId) => {
    $this.$requestId1 = $requestId;
    return $this;
},
ucicsp_RpcPacket$Builder_replyTo = ($this, $replyTo) => {
    $this.$replyTo0 = $replyTo;
    return $this;
},
ucicsp_RpcPacket$Builder_payload = ($this, $payload) => {
    $this.$payload1 = $payload;
    return $this;
},
ucicsp_RpcPacket$Builder_build = $this => {
    return ucicsp_RpcPacket__init_0($this.$type1, $this.$serviceId0, $this.$methodName1, $this.$requestId1, $this.$replyTo0, $this.$payload1, csw_Message$Builder_buildUnknownFields($this));
},
juf_Consumer = $rt_classWithoutFields(0),
otj_TestJsEntryPoint = $rt_classWithoutFields(),
otj_TestJsEntryPoint_$callClinit = () => {
    otj_TestJsEntryPoint_$callClinit = $rt_eraseClinit(otj_TestJsEntryPoint);
    otj_TestJsEntryPoint__clinit_();
},
otj_TestJsEntryPoint_main = $args => {
    let var$2, $e, $sb, $$je;
    otj_TestJsEntryPoint_$callClinit();
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
    window.teavmException = $rt_ustr($sb.$toString());
    $rt_throw($e);
},
otj_TestJsEntryPoint_printStackTrace = ($e, $stream) => {
    let var$3, $message, $stackTrace, var$6, var$7, var$8, $element;
    otj_TestJsEntryPoint_$callClinit();
    $e = $rt_nullCheck($e);
    var$3 = $rt_nullCheck(jl_Object_getClass($e)).$getName();
    $stream = $rt_nullCheck($stream);
    $stream.$append3(var$3);
    $message = $e.$getLocalizedMessage();
    if ($message !== null) {
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(7))), $message);
        $stream.$append3(jl_StringBuilder_toString(var$3));
    }
    a: {
        $stream.$append3($rt_s(48));
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
                $stream.$append3($rt_s(8));
                $rt_nullCheck($stream.$append($element)).$append3($rt_s(48));
                var$8 = var$8 + 1 | 0;
            }
        }
    }
    if ($e.$getCause() !== null && $e.$getCause() !== $e) {
        $stream.$append3($rt_s(9));
        otj_TestJsEntryPoint_printStackTrace($e.$getCause(), $stream);
    }
},
otj_TestJsEntryPoint__clinit_ = () => {
    return;
},
ucics_AsyncStreamResult = $rt_classWithoutFields(0);
function ju_HashMap$AbstractMapIterator() {
    let a = this; jl_Object.call(a);
    a.$position4 = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry = null;
    a.$associatedMap = null;
}
let ju_HashMap$AbstractMapIterator__init_ = ($this, $hm) => {
    jl_Object__init_($this);
    $this.$associatedMap = $hm;
    $hm = $rt_nullCheck($hm);
    $this.$expectedModCount = $hm.$modCount;
    $this.$futureEntry = null;
},
ju_HashMap$AbstractMapIterator__init_0 = var_0 => {
    let var_1 = new ju_HashMap$AbstractMapIterator();
    ju_HashMap$AbstractMapIterator__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$AbstractMapIterator_hasNext = $this => {
    let var$1, var$2;
    if ($this.$futureEntry !== null)
        return 1;
    while ($this.$position4 < $rt_nullCheck($rt_nullCheck($this.$associatedMap).$elementData).data.length) {
        var$1 = $rt_nullCheck($this.$associatedMap).$elementData;
        var$2 = $this.$position4;
        var$1 = $rt_nullCheck(var$1).data;
        if (var$1[$rt_checkBounds(var$2, var$1)] !== null)
            return 1;
        $this.$position4 = $this.$position4 + 1 | 0;
    }
    return 0;
},
ju_HashMap$AbstractMapIterator_checkConcurrentMod = $this => {
    if ($this.$expectedModCount == $rt_nullCheck($this.$associatedMap).$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
},
ju_HashMap$AbstractMapIterator_makeNext = $this => {
    let var$1, var$2;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    if ($this.$futureEntry === null) {
        var$1 = $rt_nullCheck($this.$associatedMap).$elementData;
        var$2 = $this.$position4;
        $this.$position4 = var$2 + 1 | 0;
        var$1 = $rt_nullCheck(var$1).data;
        $this.$currentEntry = var$1[$rt_checkBounds(var$2, var$1)];
        $this.$futureEntry = $rt_nullCheck($this.$currentEntry).$next3;
        $this.$prevEntry = null;
    } else {
        if ($this.$currentEntry !== null)
            $this.$prevEntry = $this.$currentEntry;
        $this.$currentEntry = $this.$futureEntry;
        $this.$futureEntry = $rt_nullCheck($this.$futureEntry).$next3;
    }
},
ju_Iterator = $rt_classWithoutFields(0),
ju_HashMap$ValueIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator),
ju_HashMap$ValueIterator__init_ = ($this, $map) => {
    ju_HashMap$AbstractMapIterator__init_($this, $map);
},
ju_HashMap$ValueIterator__init_0 = var_0 => {
    let var_1 = new ju_HashMap$ValueIterator();
    ju_HashMap$ValueIterator__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$ValueIterator_next = $this => {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $rt_nullCheck($this.$currentEntry).$value1;
};
function uciisdp_Employee$Builder() {
    let a = this; csw_Message$Builder.call(a);
    a.$name7 = null;
    a.$address1 = null;
    a.$tags1 = null;
}
let uciisdp_Employee$Builder__init_ = $this => {
    csw_Message$Builder__init_($this);
    $this.$name7 = $rt_s(6);
    $this.$tags1 = cswi_Internal_newMutableList();
},
uciisdp_Employee$Builder__init_0 = () => {
    let var_0 = new uciisdp_Employee$Builder();
    uciisdp_Employee$Builder__init_(var_0);
    return var_0;
},
uciisdp_Employee$Builder_name = ($this, $name) => {
    $this.$name7 = $name;
    return $this;
},
uciisdp_Employee$Builder_address = ($this, $address) => {
    $this.$address1 = $address;
    return $this;
},
uciisdp_Employee$Builder_tags = ($this, $tags) => {
    cswi_Internal_checkElementsNotNull($tags);
    $this.$tags1 = $tags;
    return $this;
},
uciisdp_Employee$Builder_build = $this => {
    return uciisdp_Employee__init_0($this.$name7, $this.$address1, $this.$tags1, csw_Message$Builder_buildUnknownFields($this));
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$name8 = null;
    a.$platformClass = null;
}
let jl_Class__init_0 = ($this, $platformClass) => {
    let var$2;
    jl_Object__init_($this);
    $this.$platformClass = $platformClass;
    var$2 = $this;
    $platformClass.classObject = var$2;
},
jl_Class__init_ = var_0 => {
    let var_1 = new jl_Class();
    jl_Class__init_0(var_1, var_0);
    return var_1;
},
jl_Class_getClass = $cls => {
    let $result;
    if ($cls === null)
        return null;
    $result = $rt_castToClass($cls.classObject, jl_Class);
    if ($result === null)
        $result = jl_Class__init_($cls);
    return $result;
},
jl_Class_toString = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$isInterface() ? $rt_s(168) : !$this.$isPrimitive() ? $rt_s(169) : $rt_s(6);
    var$2 = $this.$getName();
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$3, var$1)), var$2);
    return jl_StringBuilder_toString(var$3);
},
jl_Class_getPlatformClass = $this => {
    return $this.$platformClass;
},
jl_Class_isInstance = ($this, $obj) => {
    return otp_Platform_isInstance($obj, $this.$platformClass);
},
jl_Class_getName = $this => {
    if ($this.$name8 === null)
        $this.$name8 = otp_Platform_getName($this.$platformClass);
    return $this.$name8;
},
jl_Class_isPrimitive = $this => {
    return otp_Platform_isPrimitive($this.$platformClass);
},
jl_Class_isInterface = $this => {
    return !($this.$platformClass.$meta.flags & 2) ? 0 : 1;
},
jl_Class_getComponentType = $this => {
    return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
},
jl_Class_getSuperclass = $this => {
    return jl_Class_getClass($this.$platformClass.$meta.superclass);
},
kc_CollectionsKt__MutableCollectionsKt = $rt_classWithoutFields(kc_CollectionsKt__MutableCollectionsJVMKt),
kc_CollectionsKt__ReversedViewsKt = $rt_classWithoutFields(kc_CollectionsKt__MutableCollectionsKt),
kc_CollectionsKt___CollectionsJvmKt = $rt_classWithoutFields(kc_CollectionsKt__ReversedViewsKt),
kc_CollectionsKt___CollectionsKt = $rt_classWithoutFields(kc_CollectionsKt___CollectionsJvmKt),
kc_CollectionsKt___CollectionsKt_joinTo = ($$this$joinTo, $buffer, $separator, $prefix, $postfix, $limit, $truncated, $transform) => {
    let $count, var$10, $element;
    kji_Intrinsics_checkNotNullParameter($$this$joinTo, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($buffer, $rt_s(41));
    kji_Intrinsics_checkNotNullParameter($separator, $rt_s(170));
    kji_Intrinsics_checkNotNullParameter($prefix, $rt_s(171));
    kji_Intrinsics_checkNotNullParameter($postfix, $rt_s(172));
    kji_Intrinsics_checkNotNullParameter($truncated, $rt_s(173));
    $buffer = $rt_nullCheck($buffer);
    $buffer.$append5($prefix);
    $count = 0;
    $$this$joinTo = $rt_nullCheck($$this$joinTo);
    var$10 = $$this$joinTo.$iterator();
    a: {
        while (true) {
            var$10 = $rt_nullCheck(var$10);
            if (!var$10.$hasNext())
                break;
            $element = var$10.$next();
            $count = $count + 1 | 0;
            if ($count > 1)
                $buffer.$append5($separator);
            if ($limit >= 0 && $count > $limit)
                break a;
            kt_StringsKt__AppendableKt_appendElement($buffer, $element, $transform);
        }
    }
    if ($limit >= 0 && $count > $limit)
        $buffer.$append5($truncated);
    $buffer.$append5($postfix);
    return $buffer;
},
kc_CollectionsKt___CollectionsKt_joinToString = ($$this$joinToString, $separator, $prefix, $postfix, $limit, $truncated, $transform) => {
    let var$8;
    kji_Intrinsics_checkNotNullParameter($$this$joinToString, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($separator, $rt_s(170));
    kji_Intrinsics_checkNotNullParameter($prefix, $rt_s(171));
    kji_Intrinsics_checkNotNullParameter($postfix, $rt_s(172));
    kji_Intrinsics_checkNotNullParameter($truncated, $rt_s(173));
    var$8 = $rt_nullCheck($rt_castToClass(kc_CollectionsKt___CollectionsKt_joinTo($$this$joinToString, $rt_castToInterface(jl_StringBuilder__init_(), jl_Appendable), $separator, $prefix, $postfix, $limit, $truncated, $transform), jl_StringBuilder)).$toString();
    kji_Intrinsics_checkNotNullExpressionValue(var$8, $rt_s(174));
    return var$8;
},
kc_CollectionsKt___CollectionsKt_joinToString$default = (var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9) => {
    if (var$8 & 1)
        var$2 = $rt_castToInterface($rt_s(72), jl_CharSequence);
    if (var$8 & 2)
        var$3 = $rt_castToInterface($rt_s(6), jl_CharSequence);
    if (var$8 & 4)
        var$4 = $rt_castToInterface($rt_s(6), jl_CharSequence);
    if (var$8 & 8)
        var$5 = (-1);
    if (var$8 & 16)
        var$6 = $rt_castToInterface($rt_s(65), jl_CharSequence);
    if (var$8 & 32)
        var$7 = null;
    return kc_CollectionsKt___CollectionsKt_joinToString(var$1, var$2, var$3, var$4, var$5, var$6, var$7);
},
uciisd_Address = $rt_classWithoutFields();
function jl_Float() {
    jl_Number.call(this);
    this.$value14 = 0.0;
}
let jl_Float_TYPE = null,
jl_Float_$callClinit = () => {
    jl_Float_$callClinit = $rt_eraseClinit(jl_Float);
    jl_Float__clinit_();
},
jl_Float__init_ = ($this, $value) => {
    jl_Float_$callClinit();
    jl_Number__init_($this);
    $this.$value14 = $value;
},
jl_Float__init_0 = var_0 => {
    let var_1 = new jl_Float();
    jl_Float__init_(var_1, var_0);
    return var_1;
},
jl_Float_valueOf = $d => {
    jl_Float_$callClinit();
    return jl_Float__init_0($d);
},
jl_Float_floatToIntBits = $value => {
    jl_Float_$callClinit();
    if (isNaN($value) ? 1 : 0)
        return 2143289344;
    return $rt_floatToRawIntBits($value);
},
jl_Float__clinit_ = () => {
    jl_Float_TYPE = $rt_cls($rt_floatcls);
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf0 = ($array, $length) => {
    let $result, var$4, $sz, $i, var$7, var$8;
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
},
ju_Arrays_copyOf = ($array, $length) => {
    let $result, var$4, $sz, $i, var$7, var$8;
    $result = $rt_createByteArray($length);
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
},
ju_Arrays_copyOf1 = ($original, $newLength) => {
    let var$3, $result, $sz, $i, var$7, var$8;
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
},
ju_Arrays_copyOfRange = ($array, $from, $to) => {
    let $result, $i, var$6, var$7, var$8, var$9;
    $result = $rt_createByteArray($to - $from | 0);
    $i = $from;
    while ($i < $to) {
        var$6 = $result.data;
        var$7 = $i - $from | 0;
        $array = $rt_nullCheck($array);
        var$8 = $array.data;
        $i = $rt_checkBounds($i, var$8);
        var$9 = var$8[$i];
        var$6[$rt_checkBounds(var$7, var$6)] = var$9;
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOfRange0 = ($original, $from, $to) => {
    let $result, $i, var$6, var$7, var$8;
    $original = $rt_nullCheck($original);
    $result = $rt_castToInterface(jlr_Array_newInstance($rt_nullCheck(jl_Object_getClass($original)).$getComponentType(), $to - $from | 0), $rt_arraycls(jl_Object));
    $i = $from;
    while ($i < $to) {
        var$6 = $original.data;
        var$7 = $i - $from | 0;
        $i = $rt_checkBounds($i, var$6);
        var$8 = var$6[$i];
        $result = $rt_nullCheck($result);
        var$6 = $result.data;
        var$6[$rt_checkBounds(var$7, var$6)] = var$8;
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill0 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    while ($fromIndex < $toIndex) {
        var$5 = $fromIndex + 1 | 0;
        $a = $rt_nullCheck($a);
        var$6 = $a.data;
        var$6[$rt_checkBounds($fromIndex, var$6)] = $val;
        $fromIndex = var$5;
    }
},
ju_Arrays_fill = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    while ($fromIndex < $toIndex) {
        var$5 = $fromIndex + 1 | 0;
        $a = $rt_nullCheck($a);
        var$6 = $a.data;
        var$6[$rt_checkBounds($fromIndex, var$6)] = $val;
        $fromIndex = var$5;
    }
},
ju_Arrays_binarySearch = ($a, $key) => {
    $a = $rt_nullCheck($a);
    return ju_Arrays_binarySearch1($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch1 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, $i, var$7, $e;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $a = $rt_nullCheck($a);
        var$7 = $a.data;
        $i = $rt_checkBounds($i, var$7);
        $e = var$7[$i];
        if ($e == $key)
            break;
        if ($key >= $e)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
},
ju_Arrays_binarySearch0 = ($a, $key) => {
    $a = $rt_nullCheck($a);
    return ju_Arrays_binarySearch2($a, 0, $a.data.length, $key);
},
ju_Arrays_binarySearch2 = ($a, $fromIndex, $toIndex, $key) => {
    let $u, $i, var$7, $e, var$9;
    if ($fromIndex > $toIndex)
        $rt_throw(jl_IllegalArgumentException__init_0());
    $u = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $u)
            return ( -$fromIndex | 0) - 1 | 0;
        $i = ($fromIndex + $u | 0) / 2 | 0;
        $a = $rt_nullCheck($a);
        var$7 = $a.data;
        $i = $rt_checkBounds($i, var$7);
        $e = var$7[$i];
        var$9 = $rt_compare($e, $key);
        if (!var$9)
            break;
        if (var$9 <= 0)
            $fromIndex = $i + 1 | 0;
        else
            $u = $i - 1 | 0;
    }
    return $i;
},
ju_Arrays_asList = $a => {
    ju_Objects_requireNonNull($a);
    return ju_Arrays$ArrayAsList__init_0($a);
},
ju_Map$Entry = $rt_classWithoutFields(0);
function juc_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key0 = null;
    a.$value4 = null;
}
let juc_MapEntry__init_ = ($this, $theKey, $theValue) => {
    jl_Object__init_($this);
    $this.$key0 = $theKey;
    $this.$value4 = $theValue;
},
juc_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new juc_MapEntry();
    juc_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
},
uciisdp_Address$ProtoAdapter_Address = $rt_classWithoutFields(csw_ProtoAdapter),
uciisdp_Address$ProtoAdapter_Address__init_ = $this => {
    let var$1;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_1($this, var$1, $rt_cls(uciisdp_Address), $rt_s(175), csw_Syntax_PROTO_3, null, $rt_s(176));
},
uciisdp_Address$ProtoAdapter_Address__init_0 = () => {
    let var_0 = new uciisdp_Address$ProtoAdapter_Address();
    uciisdp_Address$ProtoAdapter_Address__init_(var_0);
    return var_0;
},
uciisdp_Address$ProtoAdapter_Address_encode = ($this, $writer, $value) => {
    let var$3;
    $value = $rt_nullCheck($value);
    var$3 = csw_Message_unknownFields($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, var$3);
    if (!ju_Objects_equals($value.$city0, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 2, $value.$city0);
    }
    if (!ju_Objects_equals($value.$street0, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 1, $value.$street0);
    }
},
uciisdp_Address$ProtoAdapter_Address_encode0 = ($this, var$1, var$2) => {
    uciisdp_Address$ProtoAdapter_Address_encode($this, var$1, $rt_castToClass(var$2, uciisdp_Address));
},
csw_ReverseProtoWriter$forwardBuffer$2 = $rt_classWithoutFields(kji_Lambda),
csw_ReverseProtoWriter$forwardBuffer$2_INSTANCE = null,
csw_ReverseProtoWriter$forwardBuffer$2_$callClinit = () => {
    csw_ReverseProtoWriter$forwardBuffer$2_$callClinit = $rt_eraseClinit(csw_ReverseProtoWriter$forwardBuffer$2);
    csw_ReverseProtoWriter$forwardBuffer$2__clinit_();
},
csw_ReverseProtoWriter$forwardBuffer$2__init_ = $this => {
    csw_ReverseProtoWriter$forwardBuffer$2_$callClinit();
    kji_Lambda__init_($this, 0);
},
csw_ReverseProtoWriter$forwardBuffer$2__init_0 = () => {
    let var_0 = new csw_ReverseProtoWriter$forwardBuffer$2();
    csw_ReverseProtoWriter$forwardBuffer$2__init_(var_0);
    return var_0;
},
csw_ReverseProtoWriter$forwardBuffer$2__clinit_ = () => {
    csw_ReverseProtoWriter$forwardBuffer$2_INSTANCE = csw_ReverseProtoWriter$forwardBuffer$2__init_0();
},
ju_ListIterator = $rt_classWithoutFields(0),
ju_Collections$5 = $rt_classWithoutFields(),
ju_Collections$5__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$5__init_0 = () => {
    let var_0 = new ju_Collections$5();
    ju_Collections$5__init_(var_0);
    return var_0;
};
function o_Buffer$UnsafeCursor() {
    let a = this; jl_Object.call(a);
    a.$buffer0 = null;
    a.$readWrite = 0;
    a.$segment0 = null;
    a.$offset = Long_ZERO;
    a.$data0 = null;
    a.$start = 0;
    a.$end = 0;
}
let o_Buffer$UnsafeCursor__init_0 = $this => {
    jl_Object__init_($this);
    $this.$offset = Long_fromInt(-1);
    $this.$start = (-1);
    $this.$end = (-1);
},
o_Buffer$UnsafeCursor__init_ = () => {
    let var_0 = new o_Buffer$UnsafeCursor();
    o_Buffer$UnsafeCursor__init_0(var_0);
    return var_0;
},
o_Buffer$UnsafeCursor_setSegment$okio = ($this, $_set___) => {
    $this.$segment0 = $_set___;
},
o_Buffer$UnsafeCursor_expandBuffer = ($this, $minByteCount) => {
    let var$2, $buffer$iv, $oldSize$iv, $tail$iv, $result$iv, var$7;
    if (!($minByteCount <= 0 ? 0 : 1)) {
        var$2 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(177))).$append4($minByteCount)).$toString();
        $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$2).$toString()));
    }
    if (!($minByteCount > 8192 ? 0 : 1)) {
        var$2 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(178))).$append4($minByteCount)).$toString();
        $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$2).$toString()));
    }
    $buffer$iv = $this.$buffer0;
    if ($buffer$iv === null)
        $rt_throw(jl_IllegalStateException__init_($rt_s(179).$toString()));
    if (!$this.$readWrite)
        $rt_throw(jl_IllegalStateException__init_($rt_s(180).$toString()));
    $oldSize$iv = o_Buffer_size($buffer$iv);
    $tail$iv = o_Buffer_writableSegment$okio($buffer$iv, $minByteCount);
    $tail$iv = $rt_nullCheck($tail$iv);
    $result$iv = 8192 - $tail$iv.$limit0 | 0;
    $tail$iv.$limit0 = 8192;
    var$7 = Long_fromInt($result$iv);
    o_Buffer_setSize$okio($buffer$iv, Long_add($oldSize$iv, var$7));
    o_Buffer$UnsafeCursor_setSegment$okio($this, $tail$iv);
    $this.$offset = $oldSize$iv;
    $this.$data0 = $tail$iv.$data;
    $this.$start = 8192 - $result$iv | 0;
    $this.$end = 8192;
    return var$7;
},
o_Buffer$UnsafeCursor_close = $this => {
    if (!($this.$buffer0 === null ? 0 : 1))
        $rt_throw(jl_IllegalStateException__init_($rt_s(179).$toString()));
    $this.$buffer0 = null;
    o_Buffer$UnsafeCursor_setSegment$okio($this, null);
    $this.$offset = Long_fromInt(-1);
    $this.$data0 = null;
    $this.$start = (-1);
    $this.$end = (-1);
};
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount0 = 0;
}
let ju_AbstractList__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_AbstractList_iterator = $this => {
    return ju_AbstractList$1__init_0($this);
},
ju_AbstractList_equals = ($this, $other) => {
    let $list, var$3, $i;
    if (!$rt_isInstance($other, ju_List))
        return 0;
    $list = $rt_castToInterface($other, ju_List);
    var$3 = $this.$size();
    $list = $rt_nullCheck($list);
    if (var$3 != $list.$size())
        return 0;
    $i = 0;
    while ($i < $list.$size()) {
        if (!ju_Objects_equals($this.$get1($i), $list.$get1($i)))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
ju_RandomAccess = $rt_classWithoutFields(0),
ju_TemplateCollections$AbstractImmutableList = $rt_classWithoutFields(ju_AbstractList),
ju_TemplateCollections$AbstractImmutableList__init_ = $this => {
    ju_AbstractList__init_($this);
},
ju_Collections$3 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableList),
ju_Collections$3__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableList__init_($this);
},
ju_Collections$3__init_0 = () => {
    let var_0 = new ju_Collections$3();
    ju_Collections$3__init_(var_0);
    return var_0;
};
function csw_FieldEncoding() {
    jl_Enum.call(this);
    this.$value8 = 0;
}
let csw_FieldEncoding_Companion = null,
csw_FieldEncoding_VARINT = null,
csw_FieldEncoding_FIXED64 = null,
csw_FieldEncoding_LENGTH_DELIMITED = null,
csw_FieldEncoding_FIXED32 = null,
csw_FieldEncoding_$VALUES = null,
csw_FieldEncoding_$ENTRIES = null,
csw_FieldEncoding_$callClinit = () => {
    csw_FieldEncoding_$callClinit = $rt_eraseClinit(csw_FieldEncoding);
    csw_FieldEncoding__clinit_();
},
csw_FieldEncoding__init_0 = ($this, $$enum$name, $$enum$ordinal, $value) => {
    csw_FieldEncoding_$callClinit();
    jl_Enum__init_($this, $$enum$name, $$enum$ordinal);
    $this.$value8 = $value;
},
csw_FieldEncoding__init_ = (var_0, var_1, var_2) => {
    let var_3 = new csw_FieldEncoding();
    csw_FieldEncoding__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_FieldEncoding_getValue$wire_runtime = $this => {
    return $this.$value8;
},
csw_FieldEncoding_rawProtoAdapter = $this => {
    let var$1, var$2, var$3;
    a: {
        csw_FieldEncoding$WhenMappings_$callClinit();
        var$1 = csw_FieldEncoding$WhenMappings_$EnumSwitchMapping$0;
        var$2 = jl_Enum_ordinal($this);
        var$1 = $rt_nullCheck(var$1).data;
        switch (var$1[$rt_checkBounds(var$2, var$1)]) {
            case 1:
                csw_ProtoAdapter_$callClinit();
                var$3 = csw_ProtoAdapter_UINT64;
                break a;
            case 2:
                csw_ProtoAdapter_$callClinit();
                var$3 = csw_ProtoAdapter_FIXED32;
                break a;
            case 3:
                csw_ProtoAdapter_$callClinit();
                var$3 = csw_ProtoAdapter_FIXED64;
                break a;
            case 4:
                csw_ProtoAdapter_$callClinit();
                var$3 = csw_ProtoAdapter_BYTES;
                break a;
            default:
        }
        $rt_throw(k_NoWhenBranchMatchedException__init_0());
    }
    return var$3;
},
csw_FieldEncoding_values = () => {
    csw_FieldEncoding_$callClinit();
    return $rt_castToInterface($rt_nullCheck(csw_FieldEncoding_$VALUES).$clone0(), $rt_arraycls(csw_FieldEncoding));
},
csw_FieldEncoding_$values = () => {
    let var$1, var$2;
    csw_FieldEncoding_$callClinit();
    var$1 = $rt_createArray(csw_FieldEncoding, 4);
    var$2 = var$1.data;
    var$2[0] = csw_FieldEncoding_VARINT;
    var$2[1] = csw_FieldEncoding_FIXED64;
    var$2[2] = csw_FieldEncoding_LENGTH_DELIMITED;
    var$2[3] = csw_FieldEncoding_FIXED32;
    return var$1;
},
csw_FieldEncoding__clinit_ = () => {
    csw_FieldEncoding_VARINT = csw_FieldEncoding__init_($rt_s(181), 0, 0);
    csw_FieldEncoding_FIXED64 = csw_FieldEncoding__init_($rt_s(182), 1, 1);
    csw_FieldEncoding_LENGTH_DELIMITED = csw_FieldEncoding__init_($rt_s(183), 2, 2);
    csw_FieldEncoding_FIXED32 = csw_FieldEncoding__init_($rt_s(184), 3, 5);
    csw_FieldEncoding_$VALUES = csw_FieldEncoding_$values();
    csw_FieldEncoding_$ENTRIES = ke_EnumEntriesKt_enumEntries($rt_castToInterface(csw_FieldEncoding_$VALUES, $rt_arraycls(jl_Enum)));
    csw_FieldEncoding_Companion = csw_FieldEncoding$Companion__init_1(null);
},
ju_Collections$4 = $rt_classWithoutFields(),
ju_Collections$4__init_ = $this => {
    jl_Object__init_($this);
},
ju_Collections$4__init_0 = () => {
    let var_0 = new ju_Collections$4();
    ju_Collections$4__init_(var_0);
    return var_0;
},
jl_Character = $rt_classWithoutFields(),
jl_Character_TYPE = null,
jl_Character_upperCaseMapping = null,
jl_Character_lowerCaseMapping = null,
jl_Character_characterCache = null,
jl_Character_$$metadata$$0 = null,
jl_Character_$$metadata$$1 = null,
jl_Character_$callClinit = () => {
    jl_Character_$callClinit = $rt_eraseClinit(jl_Character);
    jl_Character__clinit_();
},
jl_Character_isHighSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 55296 ? 0 : 1;
},
jl_Character_isLowSurrogate = $ch => {
    jl_Character_$callClinit();
    return ($ch & 64512) != 56320 ? 0 : 1;
},
jl_Character_isSurrogate = $ch => {
    jl_Character_$callClinit();
    return !jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1;
},
jl_Character_toCodePoint = ($high, $low) => {
    jl_Character_$callClinit();
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
},
jl_Character_highSurrogate = $codePoint => {
    let var$2;
    jl_Character_$callClinit();
    var$2 = $codePoint - 65536 | 0;
    return (55296 | var$2 >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    jl_Character_$callClinit();
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_toLowerCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toLowerCase0($ch) & 65535;
},
jl_Character_toLowerCase0 = $ch => {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getLowerCaseMapping(), $ch);
},
jl_Character_getLowerCaseMapping = () => {
    let var$1;
    jl_Character_$callClinit();
    if (jl_Character_lowerCaseMapping === null) {
        var$1 = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireLowerCaseMapping()).value !== null ? $rt_str((jl_Character_acquireLowerCaseMapping()).value) : null));
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_createCharMapping(var$1);
    }
    return jl_Character_lowerCaseMapping;
},
jl_Character_acquireLowerCaseMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$0 === null)
        jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
    return jl_Character_$$metadata$$0;
},
jl_Character_toUpperCase = $ch => {
    jl_Character_$callClinit();
    return jl_Character_toUpperCase0($ch) & 65535;
},
jl_Character_toUpperCase0 = $codePoint => {
    jl_Character_$callClinit();
    return jl_Character_mapChar(jl_Character_getUpperCaseMapping(), $codePoint);
},
jl_Character_getUpperCaseMapping = () => {
    let var$1;
    jl_Character_$callClinit();
    if (jl_Character_upperCaseMapping === null) {
        var$1 = otciu_UnicodeHelper_decodeCaseMapping(((jl_Character_acquireUpperCaseMapping()).value !== null ? $rt_str((jl_Character_acquireUpperCaseMapping()).value) : null));
        jl_Character_upperCaseMapping = otciu_UnicodeHelper_createCharMapping(var$1);
    }
    return jl_Character_upperCaseMapping;
},
jl_Character_acquireUpperCaseMapping = () => {
    jl_Character_$callClinit();
    if (jl_Character_$$metadata$$1 === null)
        jl_Character_$$metadata$$1 = jl_Character_acquireUpperCaseMapping$$create();
    return jl_Character_$$metadata$$1;
},
jl_Character_mapChar = ($table, $codePoint) => {
    let var$3, $binSearchTable, $index, var$6;
    jl_Character_$callClinit();
    $table = $rt_nullCheck($table);
    if ($codePoint < $rt_nullCheck($table.$fastTable).data.length) {
        var$3 = $rt_nullCheck($table.$fastTable).data;
        $codePoint = $rt_checkBounds($codePoint, var$3);
        return $codePoint + var$3[$codePoint] | 0;
    }
    $binSearchTable = $table.$binarySearchTable0;
    $index = jl_Character_binarySearchTable($binSearchTable, $codePoint);
    if ($index >= 0) {
        var$6 = $index * 2 | 0;
        $binSearchTable = $rt_nullCheck($binSearchTable);
        var$3 = $binSearchTable.data;
        if (var$6 < var$3.length)
            return $codePoint + var$3[$rt_checkBounds(var$6 + 1 | 0, var$3)] | 0;
    }
    return 0;
},
jl_Character_binarySearchTable = ($data, $key) => {
    let $l, var$4, $u, $i, $e, var$8;
    jl_Character_$callClinit();
    $l = 0;
    $data = $rt_nullCheck($data);
    var$4 = $data.data;
    $u = (var$4.length / 2 | 0) - 1 | 0;
    while (true) {
        $i = ($l + $u | 0) / 2 | 0;
        $e = var$4[$rt_checkBounds($i * 2 | 0, var$4)];
        var$8 = $rt_compare($e, $key);
        if (!var$8)
            break;
        if (var$8 <= 0) {
            $l = $i + 1 | 0;
            if ($l > $u)
                return $i;
        } else {
            $u = $i - 1 | 0;
            if ($u < $l)
                return $u;
        }
    }
    return $i;
},
jl_Character_forDigit = ($digit, $radix) => {
    jl_Character_$callClinit();
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_Character_acquireLowerCaseMapping$$create = () => {
    return {"value" : ">W  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%r iB#oq-&# _?gejg#A1 o$#mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%# #%"
    + "# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# -%# +%# #%# Y%# ,T5F#U TUg#r {%g#r >\'c#p Lnk%F# *J#F#b o@5F#b Jo=N#f "};
},
jl_Character_acquireUpperCaseMapping$$create = () => {
    return {"value" : "<Y  ,%H#U :#>b# vH#O #H#/:+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #,5# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'#(;#N1# %\'# #\'# %\'# \'\'# +\'# %6)# \'\'#*/# \'_+# %\'# #\'# #\'# %\'# )\'# %\'# \'\'# #\'# %\'# \'\'# #J%# +\'#+# #\'#+# #\'#+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#L\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'#+# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# %665% #\'# )\'# #\'# #\'# #\'# #\'#o25#c25#k25#03#}1# #y1% #m1# #q1#{}p# \'y1#k}p# #$3# #:{p#N}p# #,3#43#N}p#*05#B}p# %43# #B05#<3# %@3# /F.5# %P3# #J}p#P3# \'B{p#P3#$\'#L3%,\'# +T3# 5Jyp#>yp# Z\'_\'# x\'# #\'# \'\'\' #_+\' !#a##]#\' #H#CD##H#3m%#i%% #e%#P%# \'(%#D%#C# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#i\'#P\'#=#(+# #4)# %\'# %\'# .#H#bP\'A #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 3\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# "
    + "#\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'#`# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'% &#,%n mB#ko%x %ko%\' RAC1 >$#yu+#uu+#Pu+#Hu+%Lu+#0u+#io+#>@d1 (+2Fd# \'oX\'# AJJd# N%\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #"
    + "\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# +X%# +\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#A1 1A1 1A1 1A1 1A1 3A# #A# #A# #A% /A1 16\'%g\')B)%V+%s)%N+)A1 1A1 1A1 1A% #E# 5<m-# )E# 9A% =A% \'=# ;E# R/8## ddA )\'# @E0#U Nr,%&# #\'# \'D45#845# #\'# #\'# #\'# -"
    + "\'# %\'# 5\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# #\'# )\'- /qq-&# i]=\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# G\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# y%\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# 5\'# #\'# %\'# #\'# #\'# #\'# #\'# )\'# )\'# #\'#*%# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 7\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# )\'# #\'- #\'% )\'# #\'S )\'# cEDr# Yiejg# e*5H#U eUi#r {%i#r <\'e#<% Vlm%:# RH#H#b o@5H#b No=P#f "};
},
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet__init_ = $this => {
    ju_AbstractCollection__init_($this);
},
ju_TemplateCollections$AbstractImmutableSet = $rt_classWithoutFields(ju_AbstractSet);
let ju_TemplateCollections$AbstractImmutableSet__init_ = $this => {
    ju_AbstractSet__init_($this);
},
ju_Collections$1 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableSet),
ju_Collections$1__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableSet__init_($this);
},
ju_Collections$1__init_0 = () => {
    let var_0 = new ju_Collections$1();
    ju_Collections$1__init_(var_0);
    return var_0;
},
ju_TemplateCollections$AbstractImmutableMap = $rt_classWithoutFields(ju_AbstractMap),
ju_TemplateCollections$AbstractImmutableMap__init_ = $this => {
    ju_AbstractMap__init_($this);
},
ju_Collections$2 = $rt_classWithoutFields(ju_TemplateCollections$AbstractImmutableMap),
ju_Collections$2__init_ = $this => {
    ju_TemplateCollections$AbstractImmutableMap__init_($this);
},
ju_Collections$2__init_0 = () => {
    let var_0 = new ju_Collections$2();
    ju_Collections$2__init_(var_0);
    return var_0;
};
function ju_Collections$7() {
    ju_AbstractMap.call(this);
    this.$val$entries = null;
}
let ju_Collections$7__init_ = ($this, var$1) => {
    $this.$val$entries = var$1;
    ju_AbstractMap__init_($this);
},
ju_Collections$7__init_0 = var_0 => {
    let var_1 = new ju_Collections$7();
    ju_Collections$7__init_(var_1, var_0);
    return var_1;
},
ju_Collections$7_entrySet = $this => {
    return $this.$val$entries;
},
ju_SequencedSet = $rt_classWithoutFields(0),
kt_StringsKt__StringNumberConversionsKt = $rt_classWithoutFields(kt_StringsKt__StringNumberConversionsJVMKt),
kt_StringsKt__StringsJVMKt = $rt_classWithoutFields(kt_StringsKt__StringNumberConversionsKt),
kt_StringsKt__StringsJVMKt_replace = ($$this$replace, $oldValue, $newValue, $ignoreCase) => {
    let var$5, $occurrenceIndex, $oldValueLength, $searchStep, var$9, $newLengthHint, $stringBuilder, $i;
    kji_Intrinsics_checkNotNullParameter($$this$replace, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($oldValue, $rt_s(185));
    kji_Intrinsics_checkNotNullParameter($newValue, $rt_s(186));
    var$5 = $rt_castToInterface($$this$replace, jl_CharSequence);
    $occurrenceIndex = kt_StringsKt__StringsKt_indexOf(var$5, $oldValue, 0, $ignoreCase);
    if ($occurrenceIndex < 0)
        return $$this$replace;
    $oldValue = $rt_nullCheck($oldValue);
    $oldValueLength = $oldValue.$length();
    $searchStep = kr_RangesKt___RangesKt_coerceAtLeast($oldValueLength, 1);
    $$this$replace = $rt_nullCheck($$this$replace);
    var$9 = $$this$replace.$length() - $oldValueLength | 0;
    $newValue = $rt_nullCheck($newValue);
    $newLengthHint = var$9 + $newValue.$length() | 0;
    if ($newLengthHint < 0)
        $rt_throw(jl_OutOfMemoryError__init_0());
    $stringBuilder = jl_StringBuilder__init_0($newLengthHint);
    $i = 0;
    while (true) {
        $rt_nullCheck($stringBuilder.$append8(var$5, $i, $occurrenceIndex)).$append3($newValue);
        $i = $occurrenceIndex + $oldValueLength | 0;
        if ($occurrenceIndex >= $$this$replace.$length())
            break;
        $occurrenceIndex = kt_StringsKt__StringsKt_indexOf(var$5, $oldValue, $occurrenceIndex + $searchStep | 0, $ignoreCase);
        if ($occurrenceIndex <= 0)
            break;
    }
    var$5 = $rt_nullCheck($stringBuilder.$append8(var$5, $i, $$this$replace.$length())).$toString();
    kji_Intrinsics_checkNotNullExpressionValue(var$5, $rt_s(174));
    return var$5;
},
kt_StringsKt__StringsJVMKt_replace$default = (var$1, var$2, var$3, var$4, var$5, var$6) => {
    if (var$5 & 4)
        var$4 = 0;
    return kt_StringsKt__StringsJVMKt_replace(var$1, var$2, var$3, var$4);
},
kt_StringsKt__StringsJVMKt_concatToString = $$this$concatToString => {
    kji_Intrinsics_checkNotNullParameter($$this$concatToString, $rt_s(29));
    return jl_String__init_2($$this$concatToString);
},
kt_StringsKt__StringsJVMKt_regionMatches = ($$this$regionMatches, $thisOffset, $other, $otherOffset, $length, $ignoreCase) => {
    let var$7;
    kji_Intrinsics_checkNotNullParameter($$this$regionMatches, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($other, $rt_s(42));
    if ($ignoreCase) {
        $$this$regionMatches = $rt_nullCheck($$this$regionMatches);
        var$7 = $$this$regionMatches.$regionMatches($ignoreCase, $thisOffset, $other, $otherOffset, $length);
    } else {
        $$this$regionMatches = $rt_nullCheck($$this$regionMatches);
        var$7 = $$this$regionMatches.$regionMatches0($thisOffset, $other, $otherOffset, $length);
    }
    return var$7;
},
kt_StringsKt__StringsKt = $rt_classWithoutFields(kt_StringsKt__StringsJVMKt),
kt_StringsKt__StringsKt_getLastIndex = $$this$lastIndex => {
    kji_Intrinsics_checkNotNullParameter($$this$lastIndex, $rt_s(29));
    $$this$lastIndex = $rt_nullCheck($$this$lastIndex);
    return $$this$lastIndex.$length() - 1 | 0;
},
kt_StringsKt__StringsKt_substringAfterLast = ($$this$substringAfterLast, $delimiter, $missingDelimiterValue) => {
    let $index, var$5;
    kji_Intrinsics_checkNotNullParameter($$this$substringAfterLast, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($missingDelimiterValue, $rt_s(187));
    $index = kt_StringsKt__StringsKt_lastIndexOf$default($rt_castToInterface($$this$substringAfterLast, jl_CharSequence), $delimiter, 0, 0, 6, null);
    if ($index != (-1)) {
        var$5 = $index + 1 | 0;
        $$this$substringAfterLast = $rt_nullCheck($$this$substringAfterLast);
        $missingDelimiterValue = $$this$substringAfterLast.$substring(var$5, $$this$substringAfterLast.$length());
        kji_Intrinsics_checkNotNullExpressionValue($missingDelimiterValue, $rt_s(45));
    }
    return $missingDelimiterValue;
},
kt_StringsKt__StringsKt_substringAfterLast$default = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$4 & 2)
        var$3 = var$1;
    return kt_StringsKt__StringsKt_substringAfterLast(var$1, var$2, var$3);
},
kt_StringsKt__StringsKt_regionMatchesImpl = ($$this$regionMatchesImpl, $thisOffset, $other, $otherOffset, $length, $ignoreCase) => {
    let $index;
    kji_Intrinsics_checkNotNullParameter($$this$regionMatchesImpl, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($other, $rt_s(42));
    if ($otherOffset >= 0 && $thisOffset >= 0) {
        $$this$regionMatchesImpl = $rt_nullCheck($$this$regionMatchesImpl);
        if ($thisOffset <= ($$this$regionMatchesImpl.$length() - $length | 0)) {
            $other = $rt_nullCheck($other);
            if ($otherOffset <= ($other.$length() - $length | 0)) {
                $index = 0;
                while ($index < $length) {
                    if (!kt_CharsKt__CharKt_equals($$this$regionMatchesImpl.$charAt($thisOffset + $index | 0), $other.$charAt($otherOffset + $index | 0), $ignoreCase))
                        return 0;
                    $index = $index + 1 | 0;
                }
                return 1;
            }
        }
    }
    return 0;
},
kt_StringsKt__StringsKt_indexOfAny = ($$this$indexOfAny, $chars, $startIndex, $ignoreCase) => {
    let $char, var$6, $index, $charAtIndex, var$9, var$10, var$11, var$12, $element$iv;
    kji_Intrinsics_checkNotNullParameter($$this$indexOfAny, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($chars, $rt_s(188));
    if (!$ignoreCase) {
        $chars = $rt_nullCheck($chars);
        if ($chars.data.length == 1 && $$this$indexOfAny instanceof jl_String) {
            $char = kc_ArraysKt___ArraysKt_single($chars);
            return $rt_nullCheck($rt_castToClass($$this$indexOfAny, jl_String)).$indexOf0($char, $startIndex);
        }
    }
    var$6 = (kr_IntRange__init_0(kr_RangesKt___RangesKt_coerceAtLeast($startIndex, 0), kt_StringsKt__StringsKt_getLastIndex($$this$indexOfAny))).$iterator0();
    while (true) {
        var$6 = $rt_nullCheck(var$6);
        if (!var$6.$hasNext())
            return (-1);
        $index = var$6.$nextInt();
        $$this$indexOfAny = $rt_nullCheck($$this$indexOfAny);
        $charAtIndex = $$this$indexOfAny.$charAt($index);
        var$9 = 0;
        $chars = $rt_nullCheck($chars);
        var$10 = $chars.data;
        var$11 = var$10.length;
        a: {
            while (var$9 < var$11) {
                var$12 = $rt_checkBounds(var$9, var$10);
                $element$iv = var$10[var$12];
                if (kt_CharsKt__CharKt_equals($element$iv, $charAtIndex, $ignoreCase)) {
                    var$9 = 1;
                    break a;
                }
                var$9 = var$12 + 1 | 0;
            }
            var$9 = 0;
        }
        if (var$9)
            break;
    }
    return $index;
},
kt_StringsKt__StringsKt_lastIndexOfAny = ($$this$lastIndexOfAny, $chars, $startIndex, $ignoreCase) => {
    let $char, $index, $charAtIndex, var$8, var$9, var$10, var$11, $element$iv;
    kji_Intrinsics_checkNotNullParameter($$this$lastIndexOfAny, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($chars, $rt_s(188));
    if (!$ignoreCase) {
        $chars = $rt_nullCheck($chars);
        if ($chars.data.length == 1 && $$this$lastIndexOfAny instanceof jl_String) {
            $char = kc_ArraysKt___ArraysKt_single($chars);
            return $rt_nullCheck($rt_castToClass($$this$lastIndexOfAny, jl_String)).$lastIndexOf($char, $startIndex);
        }
    }
    $index = kr_RangesKt___RangesKt_coerceAtMost($startIndex, kt_StringsKt__StringsKt_getLastIndex($$this$lastIndexOfAny));
    while (true) {
        if ((-1) >= $index)
            return (-1);
        $$this$lastIndexOfAny = $rt_nullCheck($$this$lastIndexOfAny);
        $charAtIndex = $$this$lastIndexOfAny.$charAt($index);
        var$8 = 0;
        $chars = $rt_nullCheck($chars);
        var$9 = $chars.data;
        var$10 = var$9.length;
        a: {
            while (var$8 < var$10) {
                var$11 = $rt_checkBounds(var$8, var$9);
                $element$iv = var$9[var$11];
                if (kt_CharsKt__CharKt_equals($element$iv, $charAtIndex, $ignoreCase)) {
                    var$8 = 1;
                    break a;
                }
                var$8 = var$11 + 1 | 0;
            }
            var$8 = 0;
        }
        if (var$8)
            break;
        $index = $index + (-1) | 0;
    }
    return $index;
},
kt_StringsKt__StringsKt_indexOf$StringsKt__StringsKt = ($$this$indexOf, $other, $startIndex, $endIndex, $ignoreCase, $last) => {
    let $indices, var$8, var$9, $index, var$11, var$12;
    if ($last)
        $indices = kr_RangesKt___RangesKt_downTo(kr_RangesKt___RangesKt_coerceAtMost($startIndex, kt_StringsKt__StringsKt_getLastIndex($$this$indexOf)), kr_RangesKt___RangesKt_coerceAtLeast($endIndex, 0));
    else {
        var$8 = new kr_IntRange;
        var$9 = kr_RangesKt___RangesKt_coerceAtLeast($startIndex, 0);
        $$this$indexOf = $rt_nullCheck($$this$indexOf);
        kr_IntRange__init_(var$8, var$9, kr_RangesKt___RangesKt_coerceAtMost($endIndex, $$this$indexOf.$length()));
        $indices = $rt_castToClass(var$8, kr_IntProgression);
    }
    a: {
        if ($$this$indexOf instanceof jl_String && $other instanceof jl_String) {
            $indices = $rt_nullCheck($indices);
            $index = kr_IntProgression_getFirst($indices);
            var$9 = kr_IntProgression_getLast($indices);
            var$11 = kr_IntProgression_getStep($indices);
            if (!(var$11 > 0 && $index <= var$9)) {
                if (var$11 >= 0)
                    break a;
                if (var$9 > $index)
                    break a;
            }
            while (true) {
                var$8 = $rt_castToClass($other, jl_String);
                var$12 = $rt_castToClass($$this$indexOf, jl_String);
                $other = $rt_nullCheck($other);
                if (kt_StringsKt__StringsJVMKt_regionMatches(var$8, 0, var$12, $index, $other.$length(), $ignoreCase))
                    break;
                if ($index == var$9)
                    break a;
                $index = $index + var$11 | 0;
            }
            return $index;
        }
        $indices = $rt_nullCheck($indices);
        $index = kr_IntProgression_getFirst($indices);
        var$9 = kr_IntProgression_getLast($indices);
        var$11 = kr_IntProgression_getStep($indices);
        if (!(var$11 > 0 && $index <= var$9)) {
            if (var$11 >= 0)
                break a;
            if (var$9 > $index)
                break a;
        }
        while (true) {
            $other = $rt_nullCheck($other);
            if (kt_StringsKt__StringsKt_regionMatchesImpl($other, 0, $$this$indexOf, $index, $other.$length(), $ignoreCase))
                break;
            if ($index == var$9)
                break a;
            $index = $index + var$11 | 0;
        }
        return $index;
    }
    return (-1);
},
kt_StringsKt__StringsKt_indexOf$StringsKt__StringsKt$default = (var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8) => {
    if (var$7 & 16)
        var$6 = 0;
    return kt_StringsKt__StringsKt_indexOf$StringsKt__StringsKt(var$1, var$2, var$3, var$4, var$5, var$6);
},
kt_StringsKt__StringsKt_indexOf0 = ($$this$indexOf, $char, $startIndex, $ignoreCase) => {
    let var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($$this$indexOf, $rt_s(29));
    if (!$ignoreCase && $$this$indexOf instanceof jl_String)
        var$5 = $rt_nullCheck($rt_castToClass($$this$indexOf, jl_String)).$indexOf0($char, $startIndex);
    else {
        var$6 = $rt_createCharArray(1);
        var$6.data[0] = $char;
        var$5 = kt_StringsKt__StringsKt_indexOfAny($$this$indexOf, var$6, $startIndex, $ignoreCase);
    }
    return var$5;
},
kt_StringsKt__StringsKt_indexOf$default = (var$1, var$2, var$3, var$4, var$5, var$6) => {
    if (var$5 & 2)
        var$3 = 0;
    if (var$5 & 4)
        var$4 = 0;
    return kt_StringsKt__StringsKt_indexOf0(var$1, var$2, var$3, var$4);
},
kt_StringsKt__StringsKt_indexOf = ($$this$indexOf, $string, $startIndex, $ignoreCase) => {
    let var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($$this$indexOf, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($string, $rt_s(189));
    if (!$ignoreCase && $$this$indexOf instanceof jl_String)
        var$5 = $rt_nullCheck($rt_castToClass($$this$indexOf, jl_String)).$indexOf2($string, $startIndex);
    else {
        var$6 = $rt_castToInterface($string, jl_CharSequence);
        $$this$indexOf = $rt_nullCheck($$this$indexOf);
        var$5 = kt_StringsKt__StringsKt_indexOf$StringsKt__StringsKt$default($$this$indexOf, var$6, $startIndex, $$this$indexOf.$length(), $ignoreCase, 0, 16, null);
    }
    return var$5;
},
kt_StringsKt__StringsKt_lastIndexOf = ($$this$lastIndexOf, $char, $startIndex, $ignoreCase) => {
    let var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($$this$lastIndexOf, $rt_s(29));
    if (!$ignoreCase && $$this$lastIndexOf instanceof jl_String)
        var$5 = $rt_nullCheck($rt_castToClass($$this$lastIndexOf, jl_String)).$lastIndexOf($char, $startIndex);
    else {
        var$6 = $rt_createCharArray(1);
        var$6.data[0] = $char;
        var$5 = kt_StringsKt__StringsKt_lastIndexOfAny($$this$lastIndexOf, var$6, $startIndex, $ignoreCase);
    }
    return var$5;
},
kt_StringsKt__StringsKt_lastIndexOf$default = (var$1, var$2, var$3, var$4, var$5, var$6) => {
    if (var$5 & 2)
        var$3 = kt_StringsKt__StringsKt_getLastIndex(var$1);
    if (var$5 & 4)
        var$4 = 0;
    return kt_StringsKt__StringsKt_lastIndexOf(var$1, var$2, var$3, var$4);
},
kt_StringsKt__StringsKt_contains = ($$this$contains, $char, $ignoreCase) => {
    kji_Intrinsics_checkNotNullParameter($$this$contains, $rt_s(29));
    return kt_StringsKt__StringsKt_indexOf$default($$this$contains, $char, 0, $ignoreCase, 2, null) < 0 ? 0 : 1;
},
kt_StringsKt__StringsKt_contains$default = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$4 & 2)
        var$3 = 0;
    return kt_StringsKt__StringsKt_contains(var$1, var$2, var$3);
},
jn_CharBuffer = $rt_classWithoutFields(jn_Buffer),
jn_CharBuffer__init_ = ($this, $capacity, $position, $limit) => {
    jn_Buffer__init_($this, $capacity);
    $this.$position3 = $position;
    $this.$limit2 = $limit;
},
jn_CharBuffer_allocate = $capacity => {
    let var$2, var$3;
    if ($capacity >= 0)
        return jn_CharBufferOverArray__init_1($capacity);
    var$2 = new jl_IllegalArgumentException;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(190))), $capacity);
    jl_IllegalArgumentException__init_1(var$2, jl_StringBuilder_toString(var$3));
    $rt_throw(var$2);
},
jn_CharBuffer_wrap0 = ($array, $offset, $length) => {
    let var$4;
    var$4 = new jn_CharBufferOverArray;
    $array = $rt_nullCheck($array);
    jn_CharBufferOverArray__init_(var$4, 0, $array.data.length, $array, $offset, $offset + $length | 0, 0);
    return var$4;
},
jn_CharBuffer_wrap = $array => {
    $array = $rt_nullCheck($array);
    return jn_CharBuffer_wrap0($array, 0, $array.data.length);
},
jn_CharBuffer_get = ($this, $dst, $offset, $length) => {
    let var$4, var$5, var$6, var$7, var$8, $pos, $i, var$11;
    if ($offset >= 0) {
        $dst = $rt_nullCheck($dst);
        var$4 = $dst.data;
        var$5 = var$4.length;
        if ($offset <= var$5) {
            var$6 = $offset + $length | 0;
            if (var$6 > var$5) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(191))), var$6)), $rt_s(192))), var$5);
                jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            if (jn_Buffer_remaining($this) < $length)
                $rt_throw(jn_BufferUnderflowException__init_0());
            if ($length < 0) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(193))), $length)), $rt_s(194));
                jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            $pos = $this.$position3;
            $i = 0;
            while ($i < $length) {
                var$6 = $offset + 1 | 0;
                var$5 = $pos + 1 | 0;
                var$4[$rt_checkBounds($offset, var$4)] = $this.$getChar($pos);
                $i = $i + 1 | 0;
                $offset = var$6;
                $pos = var$5;
            }
            $this.$position3 = $this.$position3 + $length | 0;
            return $this;
        }
    }
    var$7 = new jl_IndexOutOfBoundsException;
    $dst = $rt_nullCheck($dst);
    var$5 = $dst.data.length;
    var$11 = jl_StringBuilder__init_();
    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$11, $rt_s(195))), $offset)), $rt_s(76))), var$5)), 41);
    jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$11));
    $rt_throw(var$7);
},
jn_CharBuffer_get0 = ($this, $dst) => {
    $dst = $rt_nullCheck($dst);
    return $this.$get($dst, 0, $dst.data.length);
},
jn_CharBuffer_put1 = ($this, $src, $offset, $length) => {
    let var$4, var$5, var$6, var$7, var$8, $pos, $i, var$11;
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
                jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(196))), var$6)), $rt_s(192))), var$5);
                jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            if ($length < 0) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(193))), $length)), $rt_s(194));
                jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            $pos = $this.$position3;
            $i = 0;
            while ($i < $length) {
                var$6 = $pos + 1 | 0;
                var$5 = $offset + 1 | 0;
                $this.$putChar($pos, var$4[$rt_checkBounds($offset, var$4)]);
                $i = $i + 1 | 0;
                $pos = var$6;
                $offset = var$5;
            }
            $this.$position3 = $this.$position3 + $length | 0;
            return $this;
        }
    }
    var$7 = new jl_IndexOutOfBoundsException;
    $src = $rt_nullCheck($src);
    var$5 = $src.data.length;
    var$11 = jl_StringBuilder__init_();
    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$11, $rt_s(195))), $offset)), $rt_s(76))), var$5)), 41);
    jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$11));
    $rt_throw(var$7);
},
jn_CharBuffer_put0 = ($this, $src, $start, $end) => {
    let $sz, var$5, var$6, var$7, $pos, $pos_0;
    if ($this.$isReadOnly())
        $rt_throw(jn_ReadOnlyBufferException__init_());
    $sz = $end - $start | 0;
    if (jn_Buffer_remaining($this) < $sz)
        $rt_throw(jn_BufferOverflowException__init_());
    if ($start >= 0) {
        $src = $rt_nullCheck($src);
        if ($start <= $src.$length()) {
            if ($end > $src.$length()) {
                var$5 = new jl_IndexOutOfBoundsException;
                var$6 = $src.$length();
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(196))), $end)), $rt_s(197))), var$6);
                jl_IndexOutOfBoundsException__init_(var$5, jl_StringBuilder_toString(var$7));
                $rt_throw(var$5);
            }
            if ($start > $end) {
                var$5 = new jl_IndexOutOfBoundsException;
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(198))), $start)), $rt_s(199))), $end);
                jl_IndexOutOfBoundsException__init_(var$5, jl_StringBuilder_toString(var$7));
                $rt_throw(var$5);
            }
            $pos = $this.$position3;
            while ($start < $end) {
                $pos_0 = $pos + 1 | 0;
                var$6 = $start + 1 | 0;
                $this.$putChar($pos, $src.$charAt($start));
                $pos = $pos_0;
                $start = var$6;
            }
            $this.$position3 = $this.$position3 + $sz | 0;
            return $this;
        }
    }
    var$5 = new jl_IndexOutOfBoundsException;
    $src = $rt_nullCheck($src);
    var$6 = $src.$length();
    var$7 = jl_StringBuilder__init_();
    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(198))), $start)), $rt_s(76))), var$6)), 41);
    jl_IndexOutOfBoundsException__init_(var$5, jl_StringBuilder_toString(var$7));
    $rt_throw(var$5);
},
jn_CharBuffer_put = ($this, $src) => {
    $src = $rt_nullCheck($src);
    return $this.$put4($src, 0, $src.$length());
},
jn_CharBuffer_hasArray = $this => {
    return $this.$isArrayPresent();
},
jn_CharBuffer_array = $this => {
    return $this.$getArray();
},
jn_CharBuffer_flip = $this => {
    jn_Buffer_flip($this);
    return $this;
},
jn_CharBuffer_position = ($this, $newPosition) => {
    jn_Buffer_position0($this, $newPosition);
    return $this;
},
jn_CharBufferImpl = $rt_classWithoutFields(jn_CharBuffer),
jn_CharBufferImpl__init_ = ($this, $capacity, $position, $limit) => {
    jn_CharBuffer__init_($this, $capacity, $position, $limit);
},
jn_CharBufferImpl_isReadOnly = $this => {
    return $this.$readOnly();
};
function jn_CharBufferOverArray() {
    let a = this; jn_CharBufferImpl.call(a);
    a.$readOnly1 = 0;
    a.$start0 = 0;
    a.$array4 = null;
}
let jn_CharBufferOverArray__init_0 = ($this, $capacity) => {
    jn_CharBufferOverArray__init_($this, 0, $capacity, $rt_createCharArray($capacity), 0, $capacity, 0);
},
jn_CharBufferOverArray__init_1 = var_0 => {
    let var_1 = new jn_CharBufferOverArray();
    jn_CharBufferOverArray__init_0(var_1, var_0);
    return var_1;
},
jn_CharBufferOverArray__init_ = ($this, $start, $capacity, $array, $position, $limit, $readOnly) => {
    jn_CharBufferImpl__init_($this, $capacity, $position, $limit);
    $this.$start0 = $start;
    $this.$readOnly1 = $readOnly;
    $this.$array4 = $array;
},
jn_CharBufferOverArray__init_2 = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new jn_CharBufferOverArray();
    jn_CharBufferOverArray__init_(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
jn_CharBufferOverArray_getChar = ($this, $index) => {
    let var$2, var$3;
    var$2 = $this.$array4;
    var$3 = $index + $this.$start0 | 0;
    var$2 = $rt_nullCheck(var$2).data;
    return var$2[$rt_checkBounds(var$3, var$2)];
},
jn_CharBufferOverArray_putChar = ($this, $index, $value) => {
    let var$3, var$4;
    var$3 = $this.$array4;
    var$4 = $index + $this.$start0 | 0;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = $value;
},
jn_CharBufferOverArray_isArrayPresent = $this => {
    return 1;
},
jn_CharBufferOverArray_getArray = $this => {
    return $this.$array4;
},
jn_CharBufferOverArray_readOnly = $this => {
    return $this.$readOnly1;
},
jl_Runtime = $rt_classWithoutFields(),
jl_Runtime_instance = null,
jl_Runtime_$callClinit = () => {
    jl_Runtime_$callClinit = $rt_eraseClinit(jl_Runtime);
    jl_Runtime__clinit_();
},
jl_Runtime__init_ = $this => {
    jl_Runtime_$callClinit();
    jl_Object__init_($this);
},
jl_Runtime__init_0 = () => {
    let var_0 = new jl_Runtime();
    jl_Runtime__init_(var_0);
    return var_0;
},
jl_Runtime_getRuntime = () => {
    jl_Runtime_$callClinit();
    return jl_Runtime_instance;
},
jl_Runtime_availableProcessors = $this => {
    return navigator.hardwareConcurrency;
},
jl_Runtime__clinit_ = () => {
    jl_Runtime_instance = jl_Runtime__init_0();
},
kjf_Function3 = $rt_classWithoutFields(0),
kjf_Function4 = $rt_classWithoutFields(0),
jnci_Iso8859Encoder = $rt_classWithoutFields(jnci_BufferedEncoder),
jnci_Iso8859Encoder__init_ = ($this, $cs) => {
    jnci_BufferedEncoder__init_($this, $cs, 1.0, 1.0);
},
jnci_Iso8859Encoder__init_0 = var_0 => {
    let var_1 = new jnci_Iso8859Encoder();
    jnci_Iso8859Encoder__init_(var_1, var_0);
    return var_1;
},
jnci_Iso8859Encoder_arrayEncode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $c, $next, var$13, var$14;
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
            $c = var$10[$rt_checkBounds($inPos, var$10)];
            if (jl_Character_isHighSurrogate($c)) {
                if (var$9 == $inSize) {
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreInput(2)) {
                        var$9 = var$9 + (-1) | 0;
                        break a;
                    }
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_UNDERFLOW;
                    break a;
                }
                var$9 = $rt_checkBounds(var$9, var$10);
                $next = var$10[var$9];
                if (!jl_Character_isLowSurrogate($next)) {
                    $result = jnc_CoderResult_malformedForLength(1);
                    break a;
                }
                var$9 = var$9 + (-1) | 0;
                $result = jnc_CoderResult_unmappableForLength(2);
                break a;
            }
            if (jl_Character_isLowSurrogate($c))
                $result = jnc_CoderResult_malformedForLength(1);
            if ($c >= 256) {
                var$9 = var$9 + (-1) | 0;
                $result = jnc_CoderResult_unmappableForLength(1);
                break a;
            }
            var$13 = $outPos + 1 | 0;
            var$14 = $c << 24 >> 24;
            $outArray = $rt_nullCheck($outArray);
            var$10 = $outArray.data;
            var$10[$rt_checkBounds($outPos, var$10)] = var$14;
            $inPos = var$9;
            $outPos = var$13;
        }
        var$9 = $inPos;
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition(var$9);
    $controller.$setOutPosition($outPos);
    return $result;
},
kjf_Function1 = $rt_classWithoutFields(0),
kjf_Function2 = $rt_classWithoutFields(0);
function csw_ProtoWriter() {
    jl_Object.call(this);
    this.$sink = null;
}
let csw_ProtoWriter_Companion = null,
csw_ProtoWriter_$callClinit = () => {
    csw_ProtoWriter_$callClinit = $rt_eraseClinit(csw_ProtoWriter);
    csw_ProtoWriter__clinit_();
},
csw_ProtoWriter__init_ = ($this, $sink) => {
    csw_ProtoWriter_$callClinit();
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    jl_Object__init_($this);
    $this.$sink = $sink;
},
csw_ProtoWriter__init_0 = var_0 => {
    let var_1 = new csw_ProtoWriter();
    csw_ProtoWriter__init_(var_1, var_0);
    return var_1;
},
csw_ProtoWriter_writeBytes = ($this, $value) => {
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $rt_nullCheck($this.$sink).$write0($value);
},
csw_ProtoWriter_writeTag = ($this, $fieldNumber, $fieldEncoding) => {
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    csw_ProtoWriter_$callClinit();
    csw_ProtoWriter_writeVarint32($this, csw_ProtoWriter$Companion_makeTag$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $fieldNumber, $fieldEncoding));
},
csw_ProtoWriter_writeVarint32 = ($this, $value) => {
    let var$2, var$3;
    while ($value & (-128)) {
        var$2 = $this.$sink;
        var$3 = $value & 127 | 128;
        $rt_nullCheck(var$2).$writeByte(var$3);
        $value = $value >>> 7 | 0;
    }
    $rt_nullCheck($this.$sink).$writeByte($value);
},
csw_ProtoWriter_writeVarint64 = ($this, $value) => {
    let var$2, var$3;
    while (Long_ne(Long_and($value, Long_fromInt(-128)), Long_ZERO)) {
        var$2 = $this.$sink;
        var$3 = Long_lo($value) & 127 | 128;
        $rt_nullCheck(var$2).$writeByte(var$3);
        $value = Long_shru($value, 7);
    }
    var$2 = $this.$sink;
    var$3 = Long_lo($value);
    $rt_nullCheck(var$2).$writeByte(var$3);
},
csw_ProtoWriter_writeFixed32 = ($this, $value) => {
    $rt_nullCheck($this.$sink).$writeIntLe($value);
},
csw_ProtoWriter_writeFixed64 = ($this, $value) => {
    $rt_nullCheck($this.$sink).$writeLongLe($value);
},
csw_ProtoWriter__clinit_ = () => {
    csw_ProtoWriter_Companion = csw_ProtoWriter$Companion__init_1(null);
},
jnc_StandardCharsets = $rt_classWithoutFields(),
jnc_StandardCharsets_UTF_8 = null,
jnc_StandardCharsets_US_ASCII = null,
jnc_StandardCharsets_ISO_8859_1 = null,
jnc_StandardCharsets_UTF_16 = null,
jnc_StandardCharsets_UTF_16BE = null,
jnc_StandardCharsets_UTF_16LE = null,
jnc_StandardCharsets_$callClinit = () => {
    jnc_StandardCharsets_$callClinit = $rt_eraseClinit(jnc_StandardCharsets);
    jnc_StandardCharsets__clinit_();
},
jnc_StandardCharsets__clinit_ = () => {
    jnci_UTF8Charset_$callClinit();
    jnc_StandardCharsets_UTF_8 = jnci_UTF8Charset_INSTANCE;
    jnc_StandardCharsets_US_ASCII = jnci_AsciiCharset__init_0();
    jnc_StandardCharsets_ISO_8859_1 = jnci_Iso8859Charset__init_0();
    jnc_StandardCharsets_UTF_16 = jnci_UTF16Charset__init_($rt_s(200), 1, 0);
    jnc_StandardCharsets_UTF_16BE = jnci_UTF16Charset__init_($rt_s(201), 0, 0);
    jnc_StandardCharsets_UTF_16LE = jnci_UTF16Charset__init_($rt_s(202), 0, 1);
},
ju_Comparator = $rt_classWithoutFields(0),
ju_Collections$_clinit_$lambda$_59_0 = $rt_classWithoutFields(),
ju_Collections$_clinit_$lambda$_59_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
ju_Collections$_clinit_$lambda$_59_0__init_0 = () => {
    let var_0 = new ju_Collections$_clinit_$lambda$_59_0();
    ju_Collections$_clinit_$lambda$_59_0__init_(var_0);
    return var_0;
},
kjf_Function9 = $rt_classWithoutFields(0),
kjf_Function7 = $rt_classWithoutFields(0),
kjf_Function8 = $rt_classWithoutFields(0),
kjf_Function5 = $rt_classWithoutFields(0),
kjf_Function6 = $rt_classWithoutFields(0);
function ju_LinkedHashMapIterator() {
    let a = this; jl_Object.call(a);
    a.$base = null;
    a.$reversed0 = 0;
    a.$expectedModCount0 = 0;
    a.$futureEntry0 = null;
    a.$currentEntry0 = null;
}
let ju_LinkedHashMapIterator__init_ = ($this, $base, $reversed) => {
    jl_Object__init_($this);
    $this.$base = $base;
    $this.$reversed0 = $reversed;
    $base = $rt_nullCheck($base);
    $this.$expectedModCount0 = $base.$modCount;
    $this.$futureEntry0 = !$reversed ? $base.$head0 : $base.$tail;
},
ju_LinkedHashMapIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator();
    ju_LinkedHashMapIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator_hasNext = $this => {
    return $this.$futureEntry0 === null ? 0 : 1;
},
ju_LinkedHashMapIterator_checkConcurrentMod = $this => {
    if ($this.$expectedModCount0 == $rt_nullCheck($this.$base).$modCount)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
},
ju_LinkedHashMapIterator_makeNext = $this => {
    ju_LinkedHashMapIterator_checkConcurrentMod($this);
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    $this.$currentEntry0 = $this.$futureEntry0;
    $this.$futureEntry0 = !$this.$reversed0 ? $rt_nullCheck($this.$futureEntry0).$chainForward : $rt_nullCheck($this.$futureEntry0).$chainBackward;
};
function jnc_UnsupportedCharsetException() {
    jl_IllegalArgumentException.call(this);
    this.$charsetName0 = null;
}
let jnc_UnsupportedCharsetException__init_ = ($this, $charsetName) => {
    jl_IllegalArgumentException__init_2($this);
    $this.$charsetName0 = $charsetName;
},
jnc_UnsupportedCharsetException__init_0 = var_0 => {
    let var_1 = new jnc_UnsupportedCharsetException();
    jnc_UnsupportedCharsetException__init_(var_1, var_0);
    return var_1;
},
csw_ProtoAdapterKt$commonInt32$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonInt32$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Integer_valueOf(0);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonInt32$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonInt32$1();
    csw_ProtoAdapterKt$commonInt32$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonInt32$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeSignedVarint32$wire_runtime($writer, $value);
},
csw_ProtoAdapterKt$commonInt32$1_decode = ($this, $reader) => {
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    return jl_Integer_valueOf(csw_ProtoReader_readVarint32($reader));
},
csw_ProtoAdapterKt$commonInt32$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonInt32$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$intValue());
},
csw_ProtoAdapterKt$commonInt32$1_decode0 = ($this, $reader) => {
    return csw_ProtoAdapterKt$commonInt32$1_decode($this, $reader);
},
jnci_Iso8859Charset = $rt_classWithoutFields(jnc_Charset),
jnci_Iso8859Charset__init_ = $this => {
    jnc_Charset__init_($this, $rt_s(203), $rt_createArray(jl_String, 0));
},
jnci_Iso8859Charset__init_0 = () => {
    let var_0 = new jnci_Iso8859Charset();
    jnci_Iso8859Charset__init_(var_0);
    return var_0;
},
jnci_Iso8859Charset_newDecoder = $this => {
    return jnci_Iso8859Decoder__init_0($this);
},
jnci_Iso8859Charset_newEncoder = $this => {
    return jnci_Iso8859Encoder__init_0($this);
};
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array2 = null;
    a.$size1 = 0;
}
let ju_ArrayList__init_2 = $this => {
    ju_ArrayList__init_($this, 10);
},
ju_ArrayList__init_0 = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_2(var_0);
    return var_0;
},
ju_ArrayList__init_ = ($this, $initialCapacity) => {
    ju_AbstractList__init_($this);
    if ($initialCapacity >= 0) {
        $this.$array2 = $rt_createArray(jl_Object, $initialCapacity);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
ju_ArrayList__init_3 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_(var_1, var_0);
    return var_1;
},
ju_ArrayList__init_1 = ($this, $c) => {
    let $iter, $i, var$4, var$5;
    $c = $rt_nullCheck($c);
    ju_ArrayList__init_($this, $c.$size());
    $iter = $c.$iterator();
    $i = 0;
    while ($i < $rt_nullCheck($this.$array2).data.length) {
        var$4 = $this.$array2;
        $iter = $rt_nullCheck($iter);
        var$5 = $iter.$next();
        var$4 = $rt_nullCheck(var$4).data;
        $i = $rt_checkBounds($i, var$4);
        var$4[$i] = var$5;
        $i = $i + 1 | 0;
    }
    $this.$size1 = $rt_nullCheck($this.$array2).data.length;
},
ju_ArrayList__init_4 = var_0 => {
    let var_1 = new ju_ArrayList();
    ju_ArrayList__init_1(var_1, var_0);
    return var_1;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let $newLength;
    if ($rt_nullCheck($this.$array2).data.length < $minCapacity) {
        $newLength = $rt_nullCheck($this.$array2).data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($rt_nullCheck($this.$array2).data.length * 2 | 0, 5));
        $this.$array2 = ju_Arrays_copyOf1($this.$array2, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    let var$2;
    ju_ArrayList_checkIndex($this, $index);
    var$2 = $rt_nullCheck($this.$array2).data;
    $index = $rt_checkBounds($index, var$2);
    return var$2[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size1;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    $this.$ensureCapacity($this.$size1 + 1 | 0);
    var$2 = $this.$array2;
    var$3 = $this.$size1;
    $this.$size1 = var$3 + 1 | 0;
    var$2 = $rt_nullCheck(var$2).data;
    var$2[$rt_checkBounds(var$3, var$2)] = $element;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    return 1;
},
ju_ArrayList_clear = $this => {
    ju_Arrays_fill($this.$array2, 0, $this.$size1, null);
    $this.$size1 = 0;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    if ($index >= 0 && $index < $this.$size1)
        return;
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
ju_LinkedHashMapIterator$EntryIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$EntryIterator__init_ = ($this, $map, $reversed) => {
    ju_LinkedHashMapIterator__init_($this, $map, $reversed);
},
ju_LinkedHashMapIterator$EntryIterator__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapIterator$EntryIterator();
    ju_LinkedHashMapIterator$EntryIterator__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapIterator$EntryIterator_next = $this => {
    ju_LinkedHashMapIterator_makeNext($this);
    return $this.$currentEntry0;
},
ju_LinkedHashMapIterator$EntryIterator_next0 = $this => {
    return $this.$next0();
};
function jl_String() {
    jl_Object.call(this);
    this.$hashCode1 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String_$callClinit = () => {
    jl_String_$callClinit = $rt_eraseClinit(jl_String);
    jl_String__clinit_();
},
jl_String__init_3 = $this => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $this.$nativeString = "";
},
jl_String__init_9 = () => {
    let var_0 = new jl_String();
    jl_String__init_3(var_0);
    return var_0;
},
jl_String__init_4 = ($this, $characters) => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $characters = $rt_nullCheck($characters);
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, $characters.data.length);
},
jl_String__init_2 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_4(var_1, var_0);
    return var_1;
},
jl_String__init_5 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_0 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_5(var_1, var_0);
    return var_1;
},
jl_String__init_6 = (var$0, var$1, $offset, $count) => {
    jl_String_$callClinit();
    jl_Object__init_(var$0);
    var$1 = $rt_nullCheck(var$1);
    ju_Objects_checkFromIndexSize($offset, $count, var$1.data.length);
    var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
},
jl_String__init_8 = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_6(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String__init_1 = ($this, $bytes, $offset, $length, $charset) => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    jl_String_initWithBytes($this, $bytes, $offset, $length, $charset);
},
jl_String__init_10 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jl_String();
    jl_String__init_1(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jl_String__init_ = ($this, $bytes, $charset) => {
    jl_String_$callClinit();
    jl_Object__init_($this);
    $bytes = $rt_nullCheck($bytes);
    jl_String_initWithBytes($this, $bytes, 0, $bytes.data.length, $charset);
},
jl_String__init_7 = (var_0, var_1) => {
    let var_2 = new jl_String();
    jl_String__init_(var_2, var_0, var_1);
    return var_2;
},
jl_String_initWithBytes = ($this, $bytes, $offset, $length, $charset) => {
    let var$5, $buffer, $characters;
    var$5 = jn_ByteBuffer_wrap($bytes, $offset, $length);
    $charset = $rt_nullCheck($charset);
    $buffer = jnc_Charset_decode($charset, var$5);
    $buffer = $rt_nullCheck($buffer);
    if (jn_CharBuffer_hasArray($buffer) && !jn_Buffer_position($buffer) && jn_Buffer_limit($buffer) == jn_Buffer_capacity($buffer))
        $characters = jn_CharBuffer_array($buffer);
    else {
        $characters = $rt_createCharArray(jn_Buffer_remaining($buffer));
        $buffer.$get3($characters);
    }
    $this.$nativeString = $rt_fullArrayToString($characters.data);
},
jl_String_charAt = ($this, $index) => {
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_isEmpty = $this => {
    return $this.$nativeString.length ? 0 : 1;
},
jl_String_regionMatches0 = ($this, $ignoreCase, $toffset, $other, $ooffset, $len) => {
    let var$6, $i, $a, var$9, $b;
    if ($toffset >= 0 && $ooffset >= 0 && ($toffset + $len | 0) <= $this.$length()) {
        var$6 = $ooffset + $len | 0;
        $other = $rt_nullCheck($other);
        if (var$6 <= $other.$length()) {
            $i = 0;
            while ($i < $len) {
                var$6 = $toffset + 1 | 0;
                $a = $this.$charAt($toffset);
                var$9 = $ooffset + 1 | 0;
                $b = $other.$charAt($ooffset);
                if ($ignoreCase) {
                    $a = jl_Character_toLowerCase($a);
                    $b = jl_Character_toLowerCase($b);
                }
                if ($a != $b)
                    return 0;
                $i = $i + 1 | 0;
                $toffset = var$6;
                $ooffset = var$9;
            }
            return 1;
        }
    }
    return 0;
},
jl_String_regionMatches = ($this, $toffset, $other, $ooffset, $len) => {
    let var$5, $i, var$7, var$8;
    if ($toffset >= 0 && $ooffset >= 0 && ($toffset + $len | 0) <= $this.$length()) {
        var$5 = $ooffset + $len | 0;
        $other = $rt_nullCheck($other);
        if (var$5 <= $other.$length()) {
            $i = 0;
            while ($i < $len) {
                var$5 = $toffset + 1 | 0;
                var$7 = $this.$charAt($toffset);
                var$8 = $ooffset + 1 | 0;
                if (var$7 != $other.$charAt($ooffset))
                    return 0;
                $i = $i + 1 | 0;
                $toffset = var$5;
                $ooffset = var$8;
            }
            return 1;
        }
    }
    return 0;
},
jl_String_indexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$nativeString.length)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$nativeString.length - 1 | 0))
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo, var$7;
    $i = jl_Math_min($fromIndex, $this.$length() - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
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
        if ($this.$nativeString.charCodeAt($i) == $lo) {
            var$7 = $i - 1 | 0;
            if ($this.$nativeString.charCodeAt(var$7) == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return var$7;
},
jl_String_lastIndexOf0 = ($this, $ch) => {
    return $this.$lastIndexOf($ch, $this.$length() - 1 | 0);
},
jl_String_indexOf0 = ($this, $str, $fromIndex) => {
    let $i, var$4, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    var$4 = $this.$length();
    $str = $rt_nullCheck($str);
    $toIndex = var$4 - $str.$length() | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$length())
                break a;
            if ($this.$charAt($i + $j | 0) != $str.$charAt($j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (!var$4)
        return jl_String_EMPTY;
    if (!$beginIndex && $endIndex == $length)
        return $this;
    if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
        return jl_String__init_0($this.$nativeString.substring($beginIndex, $endIndex));
    $rt_throw(jl_StringIndexOutOfBoundsException__init_());
},
jl_String_substring0 = ($this, $beginIndex) => {
    return $this.$substring($beginIndex, $this.$length());
},
jl_String_toString = $this => {
    return $rt_castToClass($this, jl_String);
},
jl_String_toCharArray = $this => {
    let $array, $i, var$3, var$4;
    $array = $rt_createCharArray($this.$nativeString.length);
    $i = 0;
    while (true) {
        var$3 = $array.data;
        if ($i >= var$3.length)
            break;
        var$4 = $this.$charAt($i);
        $i = $rt_checkLowerBound($i);
        var$3[$i] = var$4;
        $i = $i + 1 | 0;
    }
    return $array;
},
jl_String_valueOf = $obj => {
    jl_String_$callClinit();
    return $obj === null ? $rt_s(93) : $obj.$toString();
},
jl_String_equals = ($this, $other) => {
    let $str, var$3;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $rt_castToClass($other, jl_String);
    var$3 = $this.$nativeString;
    $str = $rt_nullCheck($str);
    return var$3 !== $str.$nativeString ? 0 : 1;
},
jl_String_getBytes = ($this, $charset) => {
    let var$2, $buffer, $result;
    var$2 = jn_CharBuffer_wrap($rt_fastStringToCharArray($this.$nativeString));
    $charset = $rt_nullCheck($charset);
    $buffer = jnc_Charset_encode($charset, var$2);
    $buffer = $rt_nullCheck($buffer);
    if ($buffer.$hasArray() && !jn_Buffer_position($buffer) && jn_Buffer_limit($buffer) == jn_Buffer_capacity($buffer))
        return jn_ByteBuffer_array($buffer);
    $result = $rt_createByteArray(jn_Buffer_remaining($buffer));
    $buffer.$get4($result);
    return $result;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode1) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode1 = (31 * $this.$hashCode1 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode1;
},
jl_String_toUpperCase = $this => {
    let $upperCase;
    $upperCase = $this.$nativeString.toUpperCase();
    if ($upperCase !== $this.$nativeString)
        $this = jl_String__init_0($upperCase);
    return $this;
},
jl_String__clinit_ = () => {
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    jl_String_EMPTY = jl_String__init_9();
    jl_String_CASE_INSENSITIVE_ORDER = jl_String$_clinit_$lambda$_115_0__init_0();
},
k_UNINITIALIZED_VALUE = $rt_classWithoutFields(),
k_UNINITIALIZED_VALUE_INSTANCE = null,
k_UNINITIALIZED_VALUE_$callClinit = () => {
    k_UNINITIALIZED_VALUE_$callClinit = $rt_eraseClinit(k_UNINITIALIZED_VALUE);
    k_UNINITIALIZED_VALUE__clinit_();
},
k_UNINITIALIZED_VALUE__init_ = $this => {
    k_UNINITIALIZED_VALUE_$callClinit();
    jl_Object__init_($this);
},
k_UNINITIALIZED_VALUE__init_0 = () => {
    let var_0 = new k_UNINITIALIZED_VALUE();
    k_UNINITIALIZED_VALUE__init_(var_0);
    return var_0;
},
k_UNINITIALIZED_VALUE__clinit_ = () => {
    k_UNINITIALIZED_VALUE_INSTANCE = k_UNINITIALIZED_VALUE__init_0();
},
csw_ProtoAdapterKt$commonSint32$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonSint32$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Integer_valueOf(0);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonSint32$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonSint32$1();
    csw_ProtoAdapterKt$commonSint32$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonSint32$1_encode = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    csw_ProtoWriter_$callClinit();
    var$3 = csw_ProtoWriter$Companion_encodeZigZag32$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint32($writer, var$3);
},
csw_ProtoAdapterKt$commonSint32$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonSint32$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$intValue());
},
jnc_Charset$Charsets = $rt_classWithoutFields(),
jnc_Charset$Charsets_value = null,
jnc_Charset$Charsets_$callClinit = () => {
    jnc_Charset$Charsets_$callClinit = $rt_eraseClinit(jnc_Charset$Charsets);
    jnc_Charset$Charsets__clinit_();
};
let jnc_Charset$Charsets__clinit_ = () => {
    let $charsets, var$2, var$3, var$4, var$5, $charset, var$7, var$8;
    jnc_Charset$Charsets_value = ju_HashMap__init_0();
    $charsets = $rt_createArray(jnc_Charset, 6);
    var$2 = $charsets.data;
    jnc_StandardCharsets_$callClinit();
    var$2[0] = jnc_StandardCharsets_UTF_8;
    var$2[1] = jnc_StandardCharsets_US_ASCII;
    var$2[2] = jnc_StandardCharsets_ISO_8859_1;
    var$2[3] = jnc_StandardCharsets_UTF_16;
    var$2[4] = jnc_StandardCharsets_UTF_16BE;
    var$2[5] = jnc_StandardCharsets_UTF_16LE;
    var$3 = var$2.length;
    var$4 = 0;
    while (var$4 < var$3) {
        var$5 = $rt_checkLowerBound(var$4);
        $charset = var$2[var$5];
        var$7 = jnc_Charset$Charsets_value;
        $charset = $rt_nullCheck($charset);
        var$8 = jnc_Charset_name($charset);
        $rt_nullCheck(var$7).$put3(var$8, $charset);
        var$4 = var$5 + 1 | 0;
    }
};
function kji_CallableReference() {
    let a = this; jl_Object.call(a);
    a.$receiver = null;
    a.$owner0 = null;
    a.$name14 = null;
    a.$signature = null;
    a.$isTopLevel = 0;
}
let kji_CallableReference_NO_RECEIVER = null,
kji_CallableReference_$callClinit = () => {
    kji_CallableReference_$callClinit = $rt_eraseClinit(kji_CallableReference);
    kji_CallableReference__clinit_();
},
kji_CallableReference__init_ = ($this, $receiver, $owner, $name, $signature, $isTopLevel) => {
    kji_CallableReference_$callClinit();
    jl_Object__init_($this);
    $this.$receiver = $receiver;
    $this.$owner0 = $owner;
    $this.$name14 = $name;
    $this.$signature = $signature;
    $this.$isTopLevel = $isTopLevel;
},
kji_CallableReference__clinit_ = () => {
    kji_CallableReference_NO_RECEIVER = kji_CallableReference$NoReceiver_access$000();
};
function kji_FunctionReference() {
    let a = this; kji_CallableReference.call(a);
    a.$arity0 = 0;
    a.$flags = 0;
}
let kji_FunctionReference__init_0 = ($this, $arity) => {
    kji_CallableReference_$callClinit();
    kji_FunctionReference__init_($this, $arity, kji_CallableReference_NO_RECEIVER, null, null, null, 0);
},
kji_FunctionReference__init_2 = var_0 => {
    let var_1 = new kji_FunctionReference();
    kji_FunctionReference__init_0(var_1, var_0);
    return var_1;
},
kji_FunctionReference__init_ = ($this, $arity, $receiver, $owner, $name, $signature, $flags) => {
    kji_CallableReference__init_($this, $receiver, $owner, $name, $signature, ($flags & 1) != 1 ? 0 : 1);
    $this.$arity0 = $arity;
    $this.$flags = $flags >> 1;
},
kji_FunctionReference__init_1 = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new kji_FunctionReference();
    kji_FunctionReference__init_(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
jnci_UTF8Encoder = $rt_classWithoutFields(jnci_BufferedEncoder),
jnci_UTF8Encoder__init_ = ($this, $cs) => {
    jnci_BufferedEncoder__init_($this, $cs, 2.0, 4.0);
},
jnci_UTF8Encoder__init_0 = var_0 => {
    let var_1 = new jnci_UTF8Encoder();
    jnci_UTF8Encoder__init_(var_1, var_0);
    return var_1;
},
jnci_UTF8Encoder_arrayEncode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $ch, var$12, var$13, var$14, $low, $codePoint, var$17, var$18;
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
                    if ($controller.$hasMoreOutput0(2))
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
                    if ($controller.$hasMoreOutput0(3))
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
                    if ($controller.$hasMoreInput0())
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
                    if ($controller.$hasMoreOutput0(4))
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
},
juf_BiFunction = $rt_classWithoutFields(0),
juf_BinaryOperator = $rt_classWithoutFields(0),
jus_Collectors$toCollection$lambda$_1_1 = $rt_classWithoutFields(),
jus_Collectors$toCollection$lambda$_1_1__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jus_Collectors$toCollection$lambda$_1_1__init_0 = () => {
    let var_0 = new jus_Collectors$toCollection$lambda$_1_1();
    jus_Collectors$toCollection$lambda$_1_1__init_(var_0);
    return var_0;
},
juf_BiConsumer = $rt_classWithoutFields(0),
jus_Collectors$toCollection$lambda$_1_0 = $rt_classWithoutFields(),
jus_Collectors$toCollection$lambda$_1_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jus_Collectors$toCollection$lambda$_1_0__init_0 = () => {
    let var_0 = new jus_Collectors$toCollection$lambda$_1_0();
    jus_Collectors$toCollection$lambda$_1_0__init_(var_0);
    return var_0;
},
ucics_RpcClient$AsyncStreamResultImpl = $rt_classWithoutFields(),
uciisdp_Employee$ProtoAdapter_Employee = $rt_classWithoutFields(csw_ProtoAdapter),
uciisdp_Employee$ProtoAdapter_Employee__init_ = $this => {
    let var$1;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_1($this, var$1, $rt_cls(uciisdp_Employee), $rt_s(204), csw_Syntax_PROTO_3, null, $rt_s(205));
},
uciisdp_Employee$ProtoAdapter_Employee__init_0 = () => {
    let var_0 = new uciisdp_Employee$ProtoAdapter_Employee();
    uciisdp_Employee$ProtoAdapter_Employee__init_(var_0);
    return var_0;
},
uciisdp_Employee$ProtoAdapter_Employee_encode = ($this, $writer, $value) => {
    let var$3;
    $value = $rt_nullCheck($value);
    var$3 = csw_Message_unknownFields($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, var$3);
    csw_ProtoAdapter_$callClinit();
    $rt_nullCheck(csw_ProtoAdapter_asRepeated($rt_nullCheck(csw_ProtoAdapter_STRING))).$encodeWithTag0($writer, 3, $value.$tags0);
    if (!ju_Objects_equals($value.$address0, null)) {
        uciisdp_Address_$callClinit();
        $rt_nullCheck(uciisdp_Address_ADAPTER).$encodeWithTag0($writer, 2, $value.$address0);
    }
    if (!ju_Objects_equals($value.$name3, $rt_s(6)))
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 1, $value.$name3);
},
uciisdp_Employee$ProtoAdapter_Employee_encode0 = ($this, var$1, var$2) => {
    uciisdp_Employee$ProtoAdapter_Employee_encode($this, var$1, $rt_castToClass(var$2, uciisdp_Employee));
},
jnci_UTF8Charset = $rt_classWithoutFields(jnc_Charset),
jnci_UTF8Charset_INSTANCE = null,
jnci_UTF8Charset_$callClinit = () => {
    jnci_UTF8Charset_$callClinit = $rt_eraseClinit(jnci_UTF8Charset);
    jnci_UTF8Charset__clinit_();
},
jnci_UTF8Charset__init_0 = $this => {
    jnci_UTF8Charset_$callClinit();
    jnc_Charset__init_($this, $rt_s(206), $rt_createArray(jl_String, 0));
},
jnci_UTF8Charset__init_ = () => {
    let var_0 = new jnci_UTF8Charset();
    jnci_UTF8Charset__init_0(var_0);
    return var_0;
},
jnci_UTF8Charset_newDecoder = $this => {
    return jnci_UTF8Decoder__init_0($this);
},
jnci_UTF8Charset_newEncoder = $this => {
    return jnci_UTF8Encoder__init_0($this);
},
jnci_UTF8Charset__clinit_ = () => {
    jnci_UTF8Charset_INSTANCE = jnci_UTF8Charset__init_();
},
csw_ReverseProtoWriter$Companion = $rt_classWithoutFields(),
csw_ReverseProtoWriter$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
csw_ReverseProtoWriter$Companion__init_2 = () => {
    let var_0 = new csw_ReverseProtoWriter$Companion();
    csw_ReverseProtoWriter$Companion__init_0(var_0);
    return var_0;
},
csw_ReverseProtoWriter$Companion__init_ = ($this, $$constructor_marker) => {
    csw_ReverseProtoWriter$Companion__init_0($this);
},
csw_ReverseProtoWriter$Companion__init_1 = var_0 => {
    let var_1 = new csw_ReverseProtoWriter$Companion();
    csw_ReverseProtoWriter$Companion__init_(var_1, var_0);
    return var_1;
},
kc_ArraysKt___ArraysJvmKt = $rt_classWithoutFields(kc_ArraysKt__ArraysKt),
kc_ArraysKt___ArraysJvmKt_asList = $$this$asList => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($$this$asList, $rt_s(29));
    var$2 = kc_ArraysUtilJVM_asList($$this$asList);
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(207));
    return var$2;
},
kc_ArraysKt___ArraysJvmKt_copyInto = ($$this$copyInto, $destination, $destinationOffset, $startIndex, $endIndex) => {
    kji_Intrinsics_checkNotNullParameter($$this$copyInto, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($destination, $rt_s(208));
    jl_System_fastArraycopy($$this$copyInto, $startIndex, $destination, $destinationOffset, $endIndex - $startIndex | 0);
    return $destination;
},
kc_ArraysKt___ArraysJvmKt_copyInto$default = (var$1, var$2, var$3, var$4, var$5, var$6, var$7) => {
    if (var$6 & 2)
        var$3 = 0;
    if (var$6 & 4)
        var$4 = 0;
    if (var$6 & 8) {
        var$1 = $rt_nullCheck(var$1);
        var$5 = var$1.data.length;
    }
    return kc_ArraysKt___ArraysJvmKt_copyInto(var$1, var$2, var$3, var$4, var$5);
},
kc_ArraysKt___ArraysJvmKt_copyOfRange = ($$this$copyOfRangeImpl, $fromIndex, $toIndex) => {
    let var$4;
    kji_Intrinsics_checkNotNullParameter($$this$copyOfRangeImpl, $rt_s(29));
    $$this$copyOfRangeImpl = $rt_nullCheck($$this$copyOfRangeImpl);
    kc_ArraysKt__ArraysJVMKt_copyOfRangeToIndexCheck($toIndex, $$this$copyOfRangeImpl.data.length);
    var$4 = ju_Arrays_copyOfRange($$this$copyOfRangeImpl, $fromIndex, $toIndex);
    kji_Intrinsics_checkNotNullExpressionValue(var$4, $rt_s(209));
    return var$4;
},
kc_EmptyIterator = $rt_classWithoutFields(),
kc_EmptyIterator_INSTANCE = null,
kc_EmptyIterator_$callClinit = () => {
    kc_EmptyIterator_$callClinit = $rt_eraseClinit(kc_EmptyIterator);
    kc_EmptyIterator__clinit_();
},
kc_EmptyIterator__init_ = $this => {
    kc_EmptyIterator_$callClinit();
    jl_Object__init_($this);
},
kc_EmptyIterator__init_0 = () => {
    let var_0 = new kc_EmptyIterator();
    kc_EmptyIterator__init_(var_0);
    return var_0;
},
kc_EmptyIterator_hasNext = $this => {
    return 0;
},
kc_EmptyIterator_next = $this => {
    $rt_throw(ju_NoSuchElementException__init_());
},
kc_EmptyIterator_next0 = $this => {
    return kc_EmptyIterator_next($this);
},
kc_EmptyIterator__clinit_ = () => {
    kc_EmptyIterator_INSTANCE = kc_EmptyIterator__init_0();
};
let oi__SegmentedByteString = $rt_classWithoutFields(),
oi__SegmentedByteString_binarySearch = ($$this$binarySearch, $value, $fromIndex, $toIndex) => {
    let $right, $mid, var$7, $midVal, var$9;
    kji_Intrinsics_checkNotNullParameter($$this$binarySearch, $rt_s(29));
    $right = $toIndex - 1 | 0;
    while (true) {
        if ($fromIndex > $right)
            return ( -$fromIndex | 0) - 1 | 0;
        $mid = ($fromIndex + $right | 0) >>> 1 | 0;
        $$this$binarySearch = $rt_nullCheck($$this$binarySearch);
        var$7 = $$this$binarySearch.data;
        $mid = $rt_checkBounds($mid, var$7);
        $midVal = var$7[$mid];
        var$9 = $rt_compare($midVal, $value);
        if (var$9 < 0) {
            $fromIndex = $mid + 1 | 0;
            continue;
        }
        if (var$9 <= 0)
            break;
        $right = $mid - 1 | 0;
    }
    return $mid;
},
oi__SegmentedByteString_segment = ($$this$segment, $pos) => {
    let $i;
    kji_Intrinsics_checkNotNullParameter($$this$segment, $rt_s(29));
    $$this$segment = $rt_nullCheck($$this$segment);
    $i = oi__SegmentedByteString_binarySearch(o_SegmentedByteString_getDirectory$okio($$this$segment), $pos + 1 | 0, 0, $rt_nullCheck($rt_castToInterface(o_SegmentedByteString_getSegments$okio($$this$segment), $rt_arraycls(jl_Object))).data.length);
    if ($i < 0)
        $i = $i ^ (-1);
    return $i;
},
jl_ClassNotFoundException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_ClassNotFoundException__init_ = $this => {
    jl_ReflectiveOperationException__init_($this);
},
jl_ClassNotFoundException__init_0 = () => {
    let var_0 = new jl_ClassNotFoundException();
    jl_ClassNotFoundException__init_(var_0);
    return var_0;
},
oj_Assert = $rt_classWithoutFields(),
oj_Assert_assertTrue = ($message, $condition) => {
    if (!$condition)
        oj_Assert_fail($message);
},
oj_Assert_fail = $message => {
    if ($message !== null)
        $rt_throw(jl_AssertionError__init_0($message));
    $rt_throw(jl_AssertionError__init_4());
},
oj_Assert_assertEquals2 = ($cleanMessage, $expected, $actual) => {
    if (oj_Assert_equalsRegardingNull($expected, $actual))
        return;
    if ($expected instanceof jl_String && $actual instanceof jl_String) {
        if ($cleanMessage === null)
            $cleanMessage = $rt_s(6);
        $rt_throw(oj_ComparisonFailure__init_0($cleanMessage, $rt_castToClass($expected, jl_String), $rt_castToClass($actual, jl_String)));
    }
    oj_Assert_failNotEquals($cleanMessage, $expected, $actual);
},
oj_Assert_equalsRegardingNull = ($expected, $actual) => {
    if ($expected !== null)
        return oj_Assert_isEquals($expected, $actual);
    return $actual !== null ? 0 : 1;
},
oj_Assert_isEquals = ($expected, $actual) => {
    $expected = $rt_nullCheck($expected);
    return $expected.$equals0($actual);
},
oj_Assert_assertEquals = ($expected, $actual) => {
    oj_Assert_assertEquals2(null, $expected, $actual);
},
oj_Assert_assertEquals1 = ($expected, $actual) => {
    oj_Assert_assertEquals0(null, $expected, $actual);
},
oj_Assert_assertEquals0 = ($message, $expected, $actual) => {
    if (Long_ne($expected, $actual))
        oj_Assert_failNotEquals($message, jl_Long_valueOf($expected), jl_Long_valueOf($actual));
},
oj_Assert_assertNotNull0 = ($message, $object) => {
    oj_Assert_assertTrue($message, $object === null ? 0 : 1);
},
oj_Assert_assertNotNull = $object => {
    oj_Assert_assertNotNull0(null, $object);
},
oj_Assert_failNotEquals = ($message, $expected, $actual) => {
    oj_Assert_fail(oj_Assert_format($message, $expected, $actual));
},
oj_Assert_format = ($message, $expected, $actual) => {
    let $formatted, $expectedString, $actualString;
    $formatted = $rt_s(6);
    if ($message !== null && !$rt_s(6).$equals0($message))
        $formatted = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($message)).$append3($rt_s(210))).$toString();
    $expectedString = jl_String_valueOf($expected);
    $actualString = jl_String_valueOf($actual);
    if (oj_Assert_equalsRegardingNull($expectedString, $actualString))
        return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($formatted)).$append3($rt_s(211))).$append3(oj_Assert_formatClassAndValue($expected, $expectedString))).$append3($rt_s(212))).$append3(oj_Assert_formatClassAndValue($actual, $actualString))).$toString();
    return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($formatted)).$append3($rt_s(213))).$append3($expectedString)).$append3($rt_s(214))).$append3($actualString)).$append3($rt_s(215))).$toString();
},
oj_Assert_formatClassAndValue = ($value, $valueString) => {
    let $className;
    $className = $value === null ? $rt_s(93) : $rt_nullCheck(jl_Object_getClass($value)).$getName();
    return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($className)).$append3($rt_s(216))).$append3($valueString)).$append3($rt_s(215))).$toString();
};
function k_UnsafeLazyImpl() {
    let a = this; jl_Object.call(a);
    a.$initializer = null;
    a.$_value0 = null;
}
let k_UnsafeLazyImpl__init_ = ($this, $initializer) => {
    kji_Intrinsics_checkNotNullParameter($initializer, $rt_s(94));
    jl_Object__init_($this);
    $this.$initializer = $initializer;
    k_UNINITIALIZED_VALUE_$callClinit();
    $this.$_value0 = k_UNINITIALIZED_VALUE_INSTANCE;
},
k_UnsafeLazyImpl__init_0 = var_0 => {
    let var_1 = new k_UnsafeLazyImpl();
    k_UnsafeLazyImpl__init_(var_1, var_0);
    return var_1;
};
function cswi_ImmutableList() {
    kc_AbstractList.call(this);
    this.$list = null;
}
let cswi_ImmutableList__init_ = ($this, $list) => {
    kji_Intrinsics_checkNotNullParameter($list, $rt_s(217));
    kc_AbstractList__init_($this);
    $this.$list = ju_ArrayList__init_4($rt_castToInterface($list, ju_Collection));
},
cswi_ImmutableList__init_0 = var_0 => {
    let var_1 = new cswi_ImmutableList();
    cswi_ImmutableList__init_(var_1, var_0);
    return var_1;
},
cswi_ImmutableList_getSize = $this => {
    return $rt_nullCheck($this.$list).$size();
},
cswi_ImmutableList_get = ($this, $index) => {
    return $rt_nullCheck($this.$list).$get1($index);
};
function csw_IntArrayProtoAdapter() {
    csw_ProtoAdapter.call(this);
    this.$originalAdapter2 = null;
}
let csw_IntArrayProtoAdapter__init_0 = ($this, $originalAdapter) => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($originalAdapter, $rt_s(83));
    csw_FieldEncoding_$callClinit();
    var$2 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$3 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_arraycls($rt_intcls)));
    var$4 = null;
    $originalAdapter = $rt_nullCheck($originalAdapter);
    var$5 = csw_ProtoAdapter_getSyntax($originalAdapter);
    var$6 = $rt_createIntArray(0);
    csw_ProtoAdapter__init_($this, var$2, var$3, var$4, var$5, var$6);
    $this.$originalAdapter2 = $originalAdapter;
},
csw_IntArrayProtoAdapter__init_ = var_0 => {
    let var_1 = new csw_IntArrayProtoAdapter();
    csw_IntArrayProtoAdapter__init_0(var_1, var_0);
    return var_1;
},
csw_IntArrayProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null && (($value.data.length ? 0 : 1) ? 0 : 1))
        csw_ProtoAdapter_encodeWithTag($this, $writer, $tag, $value);
},
csw_IntArrayProtoAdapter_encode = ($this, $writer, $value) => {
    let var$3, $i, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    var$3 = $value.data;
    $i = var$3.length - 1 | 0;
    while ((-1) < $i) {
        var$5 = $this.$originalAdapter2;
        $i = $rt_checkUpperBound($i, var$3);
        var$6 = jl_Integer_valueOf(var$3[$i]);
        $rt_nullCheck(var$5).$encode1($writer, var$6);
        $i = $i + (-1) | 0;
    }
},
csw_IntArrayProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_IntArrayProtoAdapter_encodeWithTag($this, $writer, $tag, $rt_castToInterface($value, $rt_arraycls($rt_intcls)));
},
csw_IntArrayProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_IntArrayProtoAdapter_encode($this, $writer, $rt_castToInterface($value, $rt_arraycls($rt_intcls)));
};
function k_Pair() {
    let a = this; jl_Object.call(a);
    a.$first = null;
    a.$second = null;
}
let k_Pair__init_ = ($this, $first, $second) => {
    jl_Object__init_($this);
    $this.$first = $first;
    $this.$second = $second;
},
k_Pair__init_0 = (var_0, var_1) => {
    let var_2 = new k_Pair();
    k_Pair__init_(var_2, var_0, var_1);
    return var_2;
},
k_Pair_getFirst = $this => {
    return $this.$first;
},
k_Pair_getSecond = $this => {
    return $this.$second;
},
k_Pair_toString = $this => {
    return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append0(40)).$append($this.$first)).$append3($rt_s(72))).$append($this.$second)).$append0(41)).$toString();
},
k_Pair_component1 = $this => {
    return $this.$first;
},
k_Pair_component2 = $this => {
    return $this.$second;
},
k_Pair_equals = ($this, $other) => {
    let var$2, var$3, var$4;
    if ($this === $other)
        return 1;
    if (!($other instanceof k_Pair))
        return 0;
    var$2 = $rt_castToClass($other, k_Pair);
    var$3 = $this.$first;
    var$4 = $rt_nullCheck(var$2);
    if (!kji_Intrinsics_areEqual(var$3, var$4.$first))
        return 0;
    if (kji_Intrinsics_areEqual($this.$second, var$4.$second))
        return 1;
    return 0;
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException),
jl_NullPointerException__init_2 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_NullPointerException__init_ = var_0 => {
    let var_1 = new jl_NullPointerException();
    jl_NullPointerException__init_2(var_1, var_0);
    return var_1;
},
jl_NullPointerException__init_1 = $this => {
    jl_RuntimeException__init_($this);
},
jl_NullPointerException__init_0 = () => {
    let var_0 = new jl_NullPointerException();
    jl_NullPointerException__init_1(var_0);
    return var_0;
},
csw_ProtoAdapterKt$commonString$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonString$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4;
    var$4 = null;
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, $rt_s(6));
},
csw_ProtoAdapterKt$commonString$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonString$1();
    csw_ProtoAdapterKt$commonString$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonString$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeString($writer, $value);
},
csw_ProtoAdapterKt$commonString$1_decode = ($this, $reader) => {
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    return csw_ProtoReader_readString($reader);
},
csw_ProtoAdapterKt$commonString$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonString$1_encode($this, $writer, $rt_castToClass($value, jl_String));
},
csw_ProtoAdapterKt$commonString$1_decode0 = ($this, $reader) => {
    return csw_ProtoAdapterKt$commonString$1_decode($this, $reader);
},
kji_CallableReference$NoReceiver = $rt_classWithoutFields(),
kji_CallableReference$NoReceiver_INSTANCE = null,
kji_CallableReference$NoReceiver_$callClinit = () => {
    kji_CallableReference$NoReceiver_$callClinit = $rt_eraseClinit(kji_CallableReference$NoReceiver);
    kji_CallableReference$NoReceiver__clinit_();
},
kji_CallableReference$NoReceiver__init_0 = $this => {
    kji_CallableReference$NoReceiver_$callClinit();
    jl_Object__init_($this);
},
kji_CallableReference$NoReceiver__init_ = () => {
    let var_0 = new kji_CallableReference$NoReceiver();
    kji_CallableReference$NoReceiver__init_0(var_0);
    return var_0;
},
kji_CallableReference$NoReceiver_access$000 = () => {
    kji_CallableReference$NoReceiver_$callClinit();
    return kji_CallableReference$NoReceiver_INSTANCE;
},
kji_CallableReference$NoReceiver__clinit_ = () => {
    kji_CallableReference$NoReceiver_INSTANCE = kji_CallableReference$NoReceiver__init_();
},
jus_Collector$of$lambda$_5_0 = $rt_classWithoutFields(),
jus_Collector$of$lambda$_5_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jus_Collector$of$lambda$_5_0__init_0 = () => {
    let var_0 = new jus_Collector$of$lambda$_5_0();
    jus_Collector$of$lambda$_5_0__init_(var_0);
    return var_0;
},
csw_ProtoAdapterKt$commonStructList$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonStructList$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(218), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonStructList$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonStructList$1();
    csw_ProtoAdapterKt$commonStructList$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonStructList$1_encode = ($this, $writer, $value) => {
    let $v, var$4, var$5;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value === null)
        return;
    $v = $value.$size() - 1 | 0;
    while ((-1) < $v) {
        csw_ProtoAdapter_$callClinit();
        var$4 = csw_ProtoAdapter_STRUCT_VALUE;
        var$5 = $value.$get1($v);
        $rt_nullCheck(var$4).$encodeWithTag0($writer, 1, var$5);
        $v = $v + (-1) | 0;
    }
},
csw_ProtoAdapterKt$commonStructList$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonStructList$1_encode($this, $writer, $rt_castToInterface($value, ju_List));
};
function ju_LinkedHashMapEntrySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$base0 = null;
    a.$reversed = 0;
}
let ju_LinkedHashMapEntrySet__init_ = ($this, $base, $reversed) => {
    ju_AbstractSet__init_($this);
    $this.$base0 = $base;
    $this.$reversed = $reversed;
},
ju_LinkedHashMapEntrySet__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMapEntrySet();
    ju_LinkedHashMapEntrySet__init_(var_2, var_0, var_1);
    return var_2;
},
ju_LinkedHashMapEntrySet_iterator = $this => {
    return ju_LinkedHashMapIterator$EntryIterator__init_0($this.$base0, $this.$reversed);
},
jl_Math = $rt_classWithoutFields(),
jl_Math_floor = var$1 => {
    return Math.floor(var$1);
},
jl_Math_floorDiv = (var$1, $b) => {
    return jl_Math_floorDiv0(var$1, Long_fromInt($b));
},
jl_Math_floorDiv0 = ($a, $b) => {
    let $div;
    $div = Long_div($a, $b);
    if (Long_lt(Long_xor($a, $b), Long_ZERO) && Long_ne(Long_mul($div, $b), $a))
        $div = Long_sub($div, Long_fromInt(1));
    return $div;
},
jl_Math_floorMod = ($a, $b) => {
    return Long_lo(Long_sub($a, Long_mul(jl_Math_floorDiv($a, $b), Long_fromInt($b))));
},
jl_Math_addExact = ($a, $b) => {
    let $sum;
    $sum = Long_add($a, $b);
    if (Long_lt(Long_xor($a, $sum), Long_ZERO) && Long_ge(Long_xor($a, $b), Long_ZERO))
        $rt_throw(jl_ArithmeticException__init_2());
    return $sum;
},
jl_Math_random = () => {
    return jl_Math_randomImpl();
},
jl_Math_randomImpl = () => {
    return Math.random();
},
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_Math_min0 = ($a, $b) => {
    if (Long_lt($a, $b))
        $b = $a;
    return $b;
};
function o_Segment() {
    let a = this; jl_Object.call(a);
    a.$data = null;
    a.$pos = 0;
    a.$limit0 = 0;
    a.$shared = 0;
    a.$owner = 0;
    a.$next2 = null;
    a.$prev = null;
}
let o_Segment_Companion = null,
o_Segment_$callClinit = () => {
    o_Segment_$callClinit = $rt_eraseClinit(o_Segment);
    o_Segment__clinit_();
},
o_Segment__init_0 = $this => {
    o_Segment_$callClinit();
    jl_Object__init_($this);
    $this.$data = $rt_createByteArray(8192);
    $this.$owner = 1;
    $this.$shared = 0;
},
o_Segment__init_2 = () => {
    let var_0 = new o_Segment();
    o_Segment__init_0(var_0);
    return var_0;
},
o_Segment__init_1 = ($this, $data, $pos, $limit, $shared, $owner) => {
    o_Segment_$callClinit();
    kji_Intrinsics_checkNotNullParameter($data, $rt_s(39));
    jl_Object__init_($this);
    $this.$data = $data;
    $this.$pos = $pos;
    $this.$limit0 = $limit;
    $this.$shared = $shared;
    $this.$owner = $owner;
},
o_Segment__init_ = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new o_Segment();
    o_Segment__init_1(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
o_Segment_sharedCopy = $this => {
    $this.$shared = 1;
    return o_Segment__init_($this.$data, $this.$pos, $this.$limit0, 1, 0);
},
o_Segment_pop = $this => {
    let $result, var$2, var$3;
    $result = $this.$next2 === $this ? null : $this.$next2;
    var$2 = $this.$prev;
    kji_Intrinsics_checkNotNull(var$2);
    var$3 = $this.$next2;
    $rt_nullCheck(var$2).$next2 = var$3;
    var$2 = $this.$next2;
    kji_Intrinsics_checkNotNull(var$2);
    var$3 = $this.$prev;
    $rt_nullCheck(var$2).$prev = var$3;
    $this.$next2 = null;
    $this.$prev = null;
    return $result;
},
o_Segment_push = ($this, $segment) => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($segment, $rt_s(219));
    $segment = $rt_nullCheck($segment);
    $segment.$prev = $this;
    $segment.$next2 = $this.$next2;
    var$2 = $this.$next2;
    kji_Intrinsics_checkNotNull(var$2);
    $rt_nullCheck(var$2).$prev = $segment;
    $this.$next2 = $segment;
    return $segment;
},
o_Segment_split = ($this, $byteCount) => {
    let var$2, var$3, var$4;
    if (!($byteCount > 0 && $byteCount <= ($this.$limit0 - $this.$pos | 0) ? 1 : 0))
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(220).$toString()));
    if ($byteCount >= 1024)
        var$2 = o_Segment_sharedCopy($this);
    else {
        var$3 = o_SegmentPool_take();
        var$4 = $this.$data;
        var$2 = $rt_nullCheck(var$3);
        kc_ArraysKt___ArraysJvmKt_copyInto$default(var$4, var$2.$data, 0, $this.$pos, $this.$pos + $byteCount | 0, 2, null);
    }
    var$2 = $rt_nullCheck(var$2);
    var$2.$limit0 = var$2.$pos + $byteCount | 0;
    $this.$pos = $this.$pos + $byteCount | 0;
    var$3 = $this.$prev;
    kji_Intrinsics_checkNotNull(var$3);
    o_Segment_push($rt_nullCheck(var$3), var$2);
    return var$2;
},
o_Segment_compact = $this => {
    let var$1, $byteCount, var$3, var$4, $availableByteCount;
    if (!($this.$prev === $this ? 0 : 1))
        $rt_throw(jl_IllegalStateException__init_($rt_s(221).$toString()));
    var$1 = $this.$prev;
    kji_Intrinsics_checkNotNull(var$1);
    if (!$rt_nullCheck(var$1).$owner)
        return;
    $byteCount = $this.$limit0 - $this.$pos | 0;
    var$1 = $this.$prev;
    kji_Intrinsics_checkNotNull(var$1);
    var$3 = 8192 - $rt_nullCheck(var$1).$limit0 | 0;
    var$1 = $this.$prev;
    kji_Intrinsics_checkNotNull(var$1);
    if ($rt_nullCheck(var$1).$shared)
        var$4 = 0;
    else {
        var$1 = $this.$prev;
        kji_Intrinsics_checkNotNull(var$1);
        var$4 = $rt_nullCheck(var$1).$pos;
    }
    $availableByteCount = var$3 + var$4 | 0;
    if ($byteCount > $availableByteCount)
        return;
    var$1 = $this.$prev;
    kji_Intrinsics_checkNotNull(var$1);
    o_Segment_writeTo($this, var$1, $byteCount);
    o_Segment_pop($this);
    o_SegmentPool_recycle($this);
},
o_Segment_writeTo = ($this, $sink, $byteCount) => {
    let var$3, var$4, var$5, var$6, var$7;
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    $sink = $rt_nullCheck($sink);
    if (!$sink.$owner)
        $rt_throw(jl_IllegalStateException__init_($rt_s(222).$toString()));
    if (($sink.$limit0 + $byteCount | 0) > 8192) {
        if ($sink.$shared)
            $rt_throw(jl_IllegalArgumentException__init_0());
        if ((($sink.$limit0 + $byteCount | 0) - $sink.$pos | 0) > 8192)
            $rt_throw(jl_IllegalArgumentException__init_0());
        kc_ArraysKt___ArraysJvmKt_copyInto$default($sink.$data, $sink.$data, 0, $sink.$pos, $sink.$limit0, 2, null);
        $sink.$limit0 = $sink.$limit0 - $sink.$pos | 0;
        $sink.$pos = 0;
    }
    var$3 = $this.$data;
    var$4 = $sink.$data;
    var$5 = $sink.$limit0;
    var$6 = $this.$pos;
    var$7 = $this.$pos + $byteCount | 0;
    kc_ArraysKt___ArraysJvmKt_copyInto(var$3, var$4, var$5, var$6, var$7);
    $sink.$limit0 = $sink.$limit0 + $byteCount | 0;
    $this.$pos = $this.$pos + $byteCount | 0;
},
o_Segment__clinit_ = () => {
    o_Segment_Companion = o_Segment$Companion__init_1(null);
},
jt_DateTimeException = $rt_classWithoutFields(jl_RuntimeException),
jt_DateTimeException__init_ = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jt_DateTimeException__init_0 = var_0 => {
    let var_1 = new jt_DateTimeException();
    jt_DateTimeException__init_(var_1, var_0);
    return var_1;
},
o_SegmentPool = $rt_classWithoutFields(),
o_SegmentPool_INSTANCE = null,
o_SegmentPool_MAX_SIZE = 0,
o_SegmentPool_LOCK = null,
o_SegmentPool_HASH_BUCKET_COUNT = 0,
o_SegmentPool_hashBuckets = null,
o_SegmentPool_$callClinit = () => {
    o_SegmentPool_$callClinit = $rt_eraseClinit(o_SegmentPool);
    o_SegmentPool__clinit_();
},
o_SegmentPool__init_0 = $this => {
    o_SegmentPool_$callClinit();
    jl_Object__init_($this);
},
o_SegmentPool__init_ = () => {
    let var_0 = new o_SegmentPool();
    o_SegmentPool__init_0(var_0);
    return var_0;
},
o_SegmentPool_take = () => {
    let $firstRef, var$2, $first;
    o_SegmentPool_$callClinit();
    $firstRef = o_SegmentPool_firstRef($rt_nullCheck(o_SegmentPool_INSTANCE));
    var$2 = o_SegmentPool_LOCK;
    $firstRef = $rt_nullCheck($firstRef);
    $first = $rt_castToClass(juca_AtomicReference_getAndSet($firstRef, var$2), o_Segment);
    if ($first === o_SegmentPool_LOCK)
        return o_Segment__init_2();
    if ($first === null) {
        juca_AtomicReference_set($firstRef, null);
        return o_Segment__init_2();
    }
    juca_AtomicReference_set($firstRef, $first.$next2);
    $first.$next2 = null;
    $first.$limit0 = 0;
    return $first;
},
o_SegmentPool_recycle = $segment => {
    let $firstRef, var$3, $first, $firstLimit;
    o_SegmentPool_$callClinit();
    kji_Intrinsics_checkNotNullParameter($segment, $rt_s(219));
    $segment = $rt_nullCheck($segment);
    if (!($segment.$next2 === null && $segment.$prev === null ? 1 : 0))
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(223).$toString()));
    if ($segment.$shared)
        return;
    $firstRef = o_SegmentPool_firstRef($rt_nullCheck(o_SegmentPool_INSTANCE));
    var$3 = o_SegmentPool_LOCK;
    $firstRef = $rt_nullCheck($firstRef);
    $first = $rt_castToClass(juca_AtomicReference_getAndSet($firstRef, var$3), o_Segment);
    if ($first === o_SegmentPool_LOCK)
        return;
    $firstLimit = $first === null ? 0 : $first.$limit0;
    if ($firstLimit >= o_SegmentPool_MAX_SIZE) {
        juca_AtomicReference_set($firstRef, $first);
        return;
    }
    $segment.$next2 = $first;
    $segment.$pos = 0;
    $segment.$limit0 = $firstLimit + 8192 | 0;
    juca_AtomicReference_set($firstRef, $segment);
},
o_SegmentPool_firstRef = $this => {
    let var$1, $hashBucket, var$3;
    var$1 = $rt_nullCheck(jl_Thread_currentThread0()).$getId();
    o_SegmentPool_$callClinit();
    $hashBucket = Long_lo(Long_and(var$1, Long_sub(Long_fromInt(o_SegmentPool_HASH_BUCKET_COUNT), Long_fromInt(1))));
    var$3 = $rt_nullCheck(o_SegmentPool_hashBuckets).data;
    $hashBucket = $rt_checkBounds($hashBucket, var$3);
    return var$3[$hashBucket];
},
o_SegmentPool__clinit_ = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    o_SegmentPool_INSTANCE = o_SegmentPool__init_();
    o_SegmentPool_MAX_SIZE = 65536;
    o_SegmentPool_LOCK = o_Segment__init_($rt_createByteArray(0), 0, 0, 0, 0);
    o_SegmentPool_HASH_BUCKET_COUNT = jl_Integer_highestOneBit(($rt_nullCheck(jl_Runtime_getRuntime()).$availableProcessors() * 2 | 0) - 1 | 0);
    var$1 = 0;
    var$2 = o_SegmentPool_HASH_BUCKET_COUNT;
    var$3 = $rt_createArray(juca_AtomicReference, var$2);
    while (var$1 < var$2) {
        var$4 = var$3.data;
        var$5 = juca_AtomicReference__init_0();
        var$6 = $rt_checkBounds(var$1, var$4);
        var$4[var$6] = var$5;
        var$1 = var$6 + 1 | 0;
    }
    o_SegmentPool_hashBuckets = var$3;
},
ucitrcs_Serializer = $rt_classWithoutFields(0),
otj_TestEntryPoint = $rt_classWithoutFields(),
otj_TestEntryPoint_testCase = null,
otj_TestEntryPoint_run = $name => {
    let $launchers, var$3, $launcher, var$5, $e, $$je;
    $launchers = ju_ArrayList__init_0();
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
                $e.$printStackTrace1();
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
            $e.$printStackTrace1();
        }
    }
},
otj_TestEntryPoint_createTestCase = () => {
    return ucii_TeaVMWebWorkerTest__init_0();
},
otj_TestEntryPoint_before = () => {
    return;
},
otj_TestEntryPoint_launchers = (var$1, var$2) => {
    let var$3;
    var$3 = $rt_nullCheck(var$1);
    if (jl_String_equals(var$3, $rt_s(224))) {
        $rt_nullCheck(var$2).$add(otj_TestEntryPoint$LauncherImpl0__init_0());
        return;
    }
    if (!jl_String_equals(var$3, $rt_s(225)))
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(226)));
    var$1 = otj_TestEntryPoint$LauncherImpl1__init_0();
    $rt_nullCheck(var$2).$add(var$1);
},
otj_TestEntryPoint_after = () => {
    return;
},
kr_RangesKt__RangesKt = $rt_classWithoutFields();
function ucitrt_WebWorkerTransport$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_01 = null;
}
let ucitrt_WebWorkerTransport$_init_$lambda$_0_0__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_01 = var$1;
},
ucitrt_WebWorkerTransport$_init_$lambda$_0_0__init_0 = var_0 => {
    let var_1 = new ucitrt_WebWorkerTransport$_init_$lambda$_0_0();
    ucitrt_WebWorkerTransport$_init_$lambda$_0_0__init_(var_1, var_0);
    return var_1;
},
ucitrt_WebWorkerTransport$_init_$lambda$_0_0_handle = (var$0, var$1) => {
    ucitrt_WebWorkerTransport_handleMessage($rt_nullCheck(var$0.$_01), var$1);
},
ucitrt_WebWorkerTransport$_init_$lambda$_0_0_handle$exported$0 = (var$0, var$1) => {
    var$0.$handle(var$1);
},
jn_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException),
jn_BufferOverflowException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jn_BufferOverflowException__init_ = () => {
    let var_0 = new jn_BufferOverflowException();
    jn_BufferOverflowException__init_0(var_0);
    return var_0;
};
function csw_ProtoReader() {
    let a = this; jl_Object.call(a);
    a.$source = null;
    a.$pos0 = Long_ZERO;
    a.$limit1 = Long_ZERO;
    a.$recursionDepth = 0;
    a.$state = 0;
    a.$tag = 0;
    a.$pushedLimit = Long_ZERO;
    a.$nextFieldEncoding = null;
    a.$bufferStack = null;
}
let csw_ProtoReader_Companion = null,
csw_ProtoReader_$callClinit = () => {
    csw_ProtoReader_$callClinit = $rt_eraseClinit(csw_ProtoReader);
    csw_ProtoReader__clinit_();
},
csw_ProtoReader__init_ = ($this, $source) => {
    csw_ProtoReader_$callClinit();
    kji_Intrinsics_checkNotNullParameter($source, $rt_s(16));
    jl_Object__init_($this);
    $this.$source = $source;
    $this.$limit1 = Long_create(4294967295, 2147483647);
    $this.$state = 2;
    $this.$tag = (-1);
    $this.$pushedLimit = Long_fromInt(-1);
    $this.$bufferStack = $rt_castToInterface(ju_ArrayList__init_0(), ju_List);
},
csw_ProtoReader__init_0 = var_0 => {
    let var_1 = new csw_ProtoReader();
    csw_ProtoReader__init_(var_1, var_0);
    return var_1;
},
csw_ProtoReader_beginMessage = $this => {
    let $token;
    if (!($this.$state != 2 ? 0 : 1))
        $rt_throw(jl_IllegalStateException__init_($rt_s(227).$toString()));
    $this.$recursionDepth = $this.$recursionDepth + 1 | 0;
    if ($this.$recursionDepth > 65)
        $rt_throw(ji_IOException__init_0($rt_s(228)));
    if ($this.$recursionDepth > $rt_nullCheck($this.$bufferStack).$size())
        $rt_nullCheck($rt_castToInterface($this.$bufferStack, ju_Collection)).$add(o_Buffer__init_());
    $token = $this.$pushedLimit;
    $this.$pushedLimit = Long_fromInt(-1);
    $this.$state = 6;
    return $token;
},
csw_ProtoReader_endMessageAndGetUnknownFields = ($this, $token) => {
    let $unknownFieldsBuffer, var$3;
    if (!($this.$state != 6 ? 0 : 1))
        $rt_throw(jl_IllegalStateException__init_($rt_s(229).$toString()));
    $this.$recursionDepth = $this.$recursionDepth + (-1) | 0;
    if (!($this.$recursionDepth >= 0 && Long_eq($this.$pushedLimit, Long_fromInt(-1)) ? 1 : 0))
        $rt_throw(jl_IllegalStateException__init_($rt_s(230).$toString()));
    if (Long_ne($this.$pos0, $this.$limit1) && $this.$recursionDepth)
        $rt_throw(ji_IOException__init_0($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(231))).$append9($this.$limit1)).$append3($rt_s(232))).$append9($this.$pos0)).$toString()));
    $this.$limit1 = $token;
    $unknownFieldsBuffer = $rt_castToClass($rt_nullCheck($this.$bufferStack).$get1($this.$recursionDepth), o_Buffer);
    $unknownFieldsBuffer = $rt_nullCheck($unknownFieldsBuffer);
    if (Long_gt(o_Buffer_size($unknownFieldsBuffer), Long_ZERO))
        var$3 = o_Buffer_readByteString($unknownFieldsBuffer);
    else {
        o_ByteString_$callClinit();
        var$3 = o_ByteString_EMPTY;
    }
    return var$3;
},
csw_ProtoReader_nextTag = $this => {
    let $tagAndFieldEncoding, $groupOrFieldEncoding, $length;
    if ($this.$state == 7) {
        $this.$state = 2;
        return $this.$tag;
    }
    if ($this.$state != 6)
        $rt_throw(jl_IllegalStateException__init_($rt_s(233)));
    while (Long_lt($this.$pos0, $this.$limit1) && !$rt_nullCheck($this.$source).$exhausted()) {
        $tagAndFieldEncoding = csw_ProtoReader_internalReadVarint32($this);
        if (!$tagAndFieldEncoding)
            $rt_throw(jn_ProtocolException__init_($rt_s(234)));
        $this.$tag = $tagAndFieldEncoding >> 3;
        $groupOrFieldEncoding = $tagAndFieldEncoding & 7;
        switch ($groupOrFieldEncoding) {
            case 0:
                csw_FieldEncoding_$callClinit();
                $this.$nextFieldEncoding = csw_FieldEncoding_VARINT;
                $this.$state = 0;
                return $this.$tag;
            case 1:
                csw_FieldEncoding_$callClinit();
                $this.$nextFieldEncoding = csw_FieldEncoding_FIXED64;
                $this.$state = 1;
                return $this.$tag;
            case 2:
                csw_FieldEncoding_$callClinit();
                $this.$nextFieldEncoding = csw_FieldEncoding_LENGTH_DELIMITED;
                $this.$state = 2;
                $length = csw_ProtoReader_internalReadVarint32($this);
                if ($length < 0)
                    $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(235))).$append4($length)).$toString()));
                if (Long_ne($this.$pushedLimit, Long_fromInt(-1)))
                    $rt_throw(jl_IllegalStateException__init_0());
                $this.$pushedLimit = $this.$limit1;
                $this.$limit1 = Long_add($this.$pos0, Long_fromInt($length));
                if (Long_le($this.$limit1, $this.$pushedLimit))
                    return $this.$tag;
                $rt_throw(ji_EOFException__init_());
            case 3:
                break;
            case 4:
                $rt_throw(jn_ProtocolException__init_($rt_s(236)));
            case 5:
                csw_FieldEncoding_$callClinit();
                $this.$nextFieldEncoding = csw_FieldEncoding_FIXED32;
                $this.$state = 5;
                return $this.$tag;
            default:
                $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(237))).$append4($groupOrFieldEncoding)).$toString()));
        }
        csw_ProtoReader_skipGroup($this, $this.$tag);
    }
    return (-1);
},
csw_ProtoReader_peekFieldEncoding = $this => {
    return $this.$nextFieldEncoding;
},
csw_ProtoReader_skipGroup = ($this, $expectedEndTag) => {
    let $tagAndFieldEncoding, $tag, $groupOrFieldEncoding, $length, var$6, var$7;
    a: while (Long_lt($this.$pos0, $this.$limit1) && !$rt_nullCheck($this.$source).$exhausted()) {
        $tagAndFieldEncoding = csw_ProtoReader_internalReadVarint32($this);
        if (!$tagAndFieldEncoding)
            $rt_throw(jn_ProtocolException__init_($rt_s(234)));
        $tag = $tagAndFieldEncoding >> 3;
        $groupOrFieldEncoding = $tagAndFieldEncoding & 7;
        switch ($groupOrFieldEncoding) {
            case 0:
                $this.$state = 0;
                csw_ProtoReader_readVarint64($this);
                continue a;
            case 1:
                $this.$state = 1;
                csw_ProtoReader_readFixed64($this);
                continue a;
            case 2:
                $length = csw_ProtoReader_internalReadVarint32($this);
                var$6 = $this.$pos0;
                var$7 = Long_fromInt($length);
                $this.$pos0 = Long_add(var$6, var$7);
                $rt_nullCheck($this.$source).$skip(var$7);
                continue a;
            case 3:
                break;
            case 4:
                if ($tag == $expectedEndTag)
                    return;
                $rt_throw(jn_ProtocolException__init_($rt_s(236)));
            case 5:
                $this.$state = 5;
                csw_ProtoReader_readFixed32($this);
                continue a;
            default:
                $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(237))).$append4($groupOrFieldEncoding)).$toString()));
        }
        csw_ProtoReader_skipGroup($this, $tag);
    }
    $rt_throw(ji_EOFException__init_());
},
csw_ProtoReader_readBytes = $this => {
    let $byteCount;
    $byteCount = csw_ProtoReader_beforeLengthDelimitedScalar($this);
    $rt_nullCheck($this.$source).$require0($byteCount);
    return $rt_nullCheck($this.$source).$readByteString0($byteCount);
},
csw_ProtoReader_readString = $this => {
    let $byteCount;
    $byteCount = csw_ProtoReader_beforeLengthDelimitedScalar($this);
    $rt_nullCheck($this.$source).$require0($byteCount);
    return $rt_nullCheck($this.$source).$readUtf8($byteCount);
},
csw_ProtoReader_readVarint32 = $this => {
    let $result;
    if ($this.$state && $this.$state != 2)
        $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(238))).$append4($this.$state)).$toString()));
    $result = csw_ProtoReader_internalReadVarint32($this);
    csw_ProtoReader_afterPackableScalar($this, 0);
    return $result;
},
csw_ProtoReader_internalReadVarint32 = $this => {
    let $tmp_0, $other$iv, $result, var$4, var$5, var$6, $i;
    $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
    $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
    $tmp_0 = $rt_nullCheck($this.$source).$readByte();
    if ($tmp_0 >= 0)
        return $tmp_0;
    $other$iv = 127;
    $result = $tmp_0 & $other$iv;
    $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
    $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
    var$4 = $rt_nullCheck($this.$source).$readByte();
    if (var$4 >= 0) {
        $other$iv = 7;
        var$4 = var$4 << $other$iv;
        var$4 = $result | var$4;
    } else {
        $other$iv = 127;
        var$4 = var$4 & $other$iv;
        var$4 = $result | var$4 << 7;
        $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
        $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
        var$5 = $rt_nullCheck($this.$source).$readByte();
        if (var$5 >= 0) {
            $other$iv = 14;
            var$5 = var$5 << $other$iv;
            var$4 = var$4 | var$5;
        } else {
            $other$iv = 127;
            var$5 = var$5 & $other$iv;
            var$4 = var$4 | var$5 << 14;
            $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
            $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
            var$5 = $rt_nullCheck($this.$source).$readByte();
            if (var$5 >= 0) {
                $other$iv = 21;
                var$5 = var$5 << $other$iv;
                var$4 = var$4 | var$5;
            } else {
                $other$iv = 127;
                var$5 = var$5 & $other$iv;
                var$4 = var$4 | var$5 << 21;
                $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
                $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
                var$5 = $rt_nullCheck($this.$source).$readByte();
                $other$iv = 28;
                var$6 = var$5 << $other$iv;
                var$4 = var$4 | var$6;
                if (var$5 < 0) {
                    $i = 0;
                    while (true) {
                        if ($i >= 5)
                            $rt_throw(jn_ProtocolException__init_($rt_s(239)));
                        $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
                        $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
                        if ($rt_nullCheck($this.$source).$readByte() >= 0)
                            break;
                        $i = $i + 1 | 0;
                    }
                    return var$4;
                }
            }
        }
    }
    return var$4;
},
csw_ProtoReader_readVarint64 = $this => {
    let $shift, $result, $b, $other$iv, var$5;
    if ($this.$state && $this.$state != 2)
        $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(238))).$append4($this.$state)).$toString()));
    $shift = 0;
    $result = Long_ZERO;
    while (true) {
        if ($shift >= 64)
            $rt_throw(jn_ProtocolException__init_($rt_s(240)));
        $rt_nullCheck($this.$source).$require0(Long_fromInt(1));
        $this.$pos0 = Long_add($this.$pos0, Long_fromInt(1));
        $b = $rt_nullCheck($this.$source).$readByte();
        $other$iv = 127;
        var$5 = $b & $other$iv;
        $result = Long_or($result, Long_shl(Long_fromInt(var$5), $shift));
        $other$iv = 128;
        if (!($b & $other$iv))
            break;
        $shift = $shift + 7 | 0;
    }
    csw_ProtoReader_afterPackableScalar($this, 0);
    return $result;
},
csw_ProtoReader_readFixed32 = $this => {
    let $result;
    if ($this.$state != 5 && $this.$state != 2)
        $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(241))).$append4($this.$state)).$toString()));
    $rt_nullCheck($this.$source).$require0(Long_fromInt(4));
    $this.$pos0 = Long_add($this.$pos0, Long_fromInt(4));
    $result = $rt_nullCheck($this.$source).$readIntLe();
    csw_ProtoReader_afterPackableScalar($this, 5);
    return $result;
},
csw_ProtoReader_readFixed64 = $this => {
    let $result;
    if ($this.$state != 1 && $this.$state != 2)
        $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(242))).$append4($this.$state)).$toString()));
    $rt_nullCheck($this.$source).$require0(Long_fromInt(8));
    $this.$pos0 = Long_add($this.$pos0, Long_fromInt(8));
    $result = $rt_nullCheck($this.$source).$readLongLe();
    csw_ProtoReader_afterPackableScalar($this, 1);
    return $result;
},
csw_ProtoReader_afterPackableScalar = ($this, $fieldEncoding) => {
    if ($this.$state == $fieldEncoding)
        $this.$state = 6;
    else {
        if (Long_gt($this.$pos0, $this.$limit1))
            $rt_throw(ji_IOException__init_0($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(231))).$append9($this.$limit1)).$append3($rt_s(232))).$append9($this.$pos0)).$toString()));
        if (Long_ne($this.$pos0, $this.$limit1))
            $this.$state = 7;
        else {
            $this.$limit1 = $this.$pushedLimit;
            $this.$pushedLimit = Long_fromInt(-1);
            $this.$state = 6;
        }
    }
},
csw_ProtoReader_beforeLengthDelimitedScalar = $this => {
    let $byteCount;
    if ($this.$state != 2)
        $rt_throw(jn_ProtocolException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(243))).$append4($this.$state)).$toString()));
    $byteCount = Long_sub($this.$limit1, $this.$pos0);
    $rt_nullCheck($this.$source).$require0($byteCount);
    $this.$state = 6;
    $this.$pos0 = $this.$limit1;
    $this.$limit1 = $this.$pushedLimit;
    $this.$pushedLimit = Long_fromInt(-1);
    return $byteCount;
},
csw_ProtoReader_readUnknownField = ($this, $tag) => {
    let $fieldEncoding, $protoAdapter, $value;
    $fieldEncoding = csw_ProtoReader_peekFieldEncoding($this);
    kji_Intrinsics_checkNotNull($fieldEncoding);
    $fieldEncoding = $rt_nullCheck($fieldEncoding);
    $protoAdapter = csw_FieldEncoding_rawProtoAdapter($fieldEncoding);
    $protoAdapter = $rt_nullCheck($protoAdapter);
    $value = $protoAdapter.$decode0($this);
    csw_ProtoReader_addUnknownField($this, $tag, $fieldEncoding, $value);
},
csw_ProtoReader_addUnknownField = ($this, $tag, $fieldEncoding, $value) => {
    let $unknownFieldsWriter, $protoAdapter;
    kji_Intrinsics_checkNotNullParameter($fieldEncoding, $rt_s(4));
    $unknownFieldsWriter = csw_ProtoWriter__init_0($rt_castToInterface($rt_nullCheck($this.$bufferStack).$get1($this.$recursionDepth - 1 | 0), o_BufferedSink));
    $fieldEncoding = $rt_nullCheck($fieldEncoding);
    $protoAdapter = csw_FieldEncoding_rawProtoAdapter($fieldEncoding);
    kji_Intrinsics_checkNotNull0($protoAdapter, $rt_s(5));
    $protoAdapter = $rt_nullCheck($protoAdapter);
    $protoAdapter.$encodeWithTag($unknownFieldsWriter, $tag, $value);
},
csw_ProtoReader__clinit_ = () => {
    csw_ProtoReader_Companion = csw_ProtoReader$Companion__init_1(null);
},
o__SegmentedByteString = $rt_classWithoutFields(),
o__SegmentedByteString_DEFAULT__new_UnsafeCursor = null,
o__SegmentedByteString_DEFAULT__ByteString_size = 0,
o__SegmentedByteString_$callClinit = () => {
    o__SegmentedByteString_$callClinit = $rt_eraseClinit(o__SegmentedByteString);
    o__SegmentedByteString__clinit_();
},
o__SegmentedByteString_checkOffsetAndCount = ($size, $offset, $byteCount) => {
    o__SegmentedByteString_$callClinit();
    if (Long_ge(Long_or($offset, $byteCount), Long_ZERO) && Long_le($offset, $size) && Long_ge(Long_sub($size, $offset), $byteCount))
        return;
    $rt_throw(jl_ArrayIndexOutOfBoundsException__init_2($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(244))).$append9($size)).$append3($rt_s(245))).$append9($offset)).$append3($rt_s(246))).$append9($byteCount)).$toString()));
},
o__SegmentedByteString_reverseBytes = $$this$reverseBytes => {
    let var$2, var$3;
    o__SegmentedByteString_$callClinit();
    var$2 = ($$this$reverseBytes & (-16777216)) >>> 24 | 0;
    var$3 = ($$this$reverseBytes & 16711680) >>> 8 | 0;
    var$3 = var$2 | var$3;
    var$2 = ($$this$reverseBytes & 65280) << 8;
    var$3 = var$3 | var$2;
    var$2 = ($$this$reverseBytes & 255) << 24;
    return var$3 | var$2;
},
o__SegmentedByteString_reverseBytes0 = $$this$reverseBytes => {
    let var$2, var$3;
    o__SegmentedByteString_$callClinit();
    var$2 = Long_shru(Long_and($$this$reverseBytes, Long_create(0, 4278190080)), 56);
    var$3 = Long_shru(Long_and($$this$reverseBytes, Long_create(0, 16711680)), 40);
    var$3 = Long_or(var$2, var$3);
    var$2 = Long_shru(Long_and($$this$reverseBytes, Long_create(0, 65280)), 24);
    var$3 = Long_or(var$3, var$2);
    var$2 = Long_shru(Long_and($$this$reverseBytes, Long_create(0, 255)), 8);
    var$3 = Long_or(var$3, var$2);
    var$2 = Long_shl(Long_and($$this$reverseBytes, Long_create(4278190080, 0)), 8);
    var$3 = Long_or(var$3, var$2);
    var$2 = Long_shl(Long_and($$this$reverseBytes, Long_fromInt(16711680)), 24);
    var$3 = Long_or(var$3, var$2);
    var$2 = Long_shl(Long_and($$this$reverseBytes, Long_fromInt(65280)), 40);
    var$3 = Long_or(var$3, var$2);
    var$2 = Long_shl(Long_and($$this$reverseBytes, Long_fromInt(255)), 56);
    return Long_or(var$3, var$2);
},
o__SegmentedByteString_arrayRangeEquals = ($a, $aOffset, $b, $bOffset, $byteCount) => {
    let $i, var$7, var$8, var$9;
    o__SegmentedByteString_$callClinit();
    kji_Intrinsics_checkNotNullParameter($a, $rt_s(247));
    kji_Intrinsics_checkNotNullParameter($b, $rt_s(248));
    $i = 0;
    while ($i < $byteCount) {
        var$7 = $i + $aOffset | 0;
        $a = $rt_nullCheck($a);
        var$8 = $a.data;
        var$7 = var$8[$rt_checkBounds(var$7, var$8)];
        var$9 = $i + $bOffset | 0;
        $b = $rt_nullCheck($b);
        var$8 = $b.data;
        if (var$7 != var$8[$rt_checkBounds(var$9, var$8)])
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
o__SegmentedByteString_resolveDefaultParameter0 = $unsafeCursor => {
    o__SegmentedByteString_$callClinit();
    kji_Intrinsics_checkNotNullParameter($unsafeCursor, $rt_s(30));
    if ($unsafeCursor !== o__SegmentedByteString_DEFAULT__new_UnsafeCursor)
        return $unsafeCursor;
    return o_Buffer$UnsafeCursor__init_();
},
o__SegmentedByteString_resolveDefaultParameter = ($$this$resolveDefaultParameter, $position) => {
    o__SegmentedByteString_$callClinit();
    kji_Intrinsics_checkNotNullParameter($$this$resolveDefaultParameter, $rt_s(29));
    if ($position != o__SegmentedByteString_DEFAULT__ByteString_size)
        return $position;
    $$this$resolveDefaultParameter = $rt_nullCheck($$this$resolveDefaultParameter);
    return o_ByteString_size($$this$resolveDefaultParameter);
},
o__SegmentedByteString__clinit_ = () => {
    o__SegmentedByteString_DEFAULT__new_UnsafeCursor = o_Buffer$UnsafeCursor__init_();
    o__SegmentedByteString_DEFAULT__ByteString_size = (-1234567890);
};
function csw_Message() {
    let a = this; jl_Object.call(a);
    a.$adapter = null;
    a.$unknownFields0 = null;
}
let csw_Message_Companion = null,
csw_Message_$callClinit = () => {
    csw_Message_$callClinit = $rt_eraseClinit(csw_Message);
    csw_Message__clinit_();
},
csw_Message__init_ = ($this, $adapter, $unknownFields) => {
    csw_Message_$callClinit();
    kji_Intrinsics_checkNotNullParameter($adapter, $rt_s(249));
    kji_Intrinsics_checkNotNullParameter($unknownFields, $rt_s(3));
    jl_Object__init_($this);
    $this.$adapter = $adapter;
    $this.$unknownFields0 = $unknownFields;
},
csw_Message_unknownFields = $this => {
    if ($this.$unknownFields0 !== null)
        return $this.$unknownFields0;
    o_ByteString_$callClinit();
    return o_ByteString_EMPTY;
},
csw_Message__clinit_ = () => {
    csw_Message_Companion = csw_Message$Companion__init_1(null);
};
function uciisdp_MyData() {
    let a = this; csw_Message.call(a);
    a.$id0 = null;
    a.$content0 = null;
    a.$value5 = 0;
}
let uciisdp_MyData_ADAPTER = null,
uciisdp_MyData_$callClinit = () => {
    uciisdp_MyData_$callClinit = $rt_eraseClinit(uciisdp_MyData);
    uciisdp_MyData__clinit_();
},
uciisdp_MyData__init_ = ($this, $id, $content, $value, $unknownFields) => {
    uciisdp_MyData_$callClinit();
    csw_Message__init_($this, uciisdp_MyData_ADAPTER, $unknownFields);
    if ($id === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(250)));
    $this.$id0 = $id;
    if ($content !== null) {
        $this.$content0 = $content;
        $this.$value5 = $value;
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(251)));
},
uciisdp_MyData__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new uciisdp_MyData();
    uciisdp_MyData__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
uciisdp_MyData__clinit_ = () => {
    uciisdp_MyData_ADAPTER = uciisdp_MyData$ProtoAdapter_MyData__init_0();
};
function juca_AtomicReference() {
    let a = this; jl_Object.call(a);
    a.$value6 = null;
    a.$version = 0;
}
let juca_AtomicReference__init_ = $this => {
    jl_Object__init_($this);
},
juca_AtomicReference__init_0 = () => {
    let var_0 = new juca_AtomicReference();
    juca_AtomicReference__init_(var_0);
    return var_0;
},
juca_AtomicReference_set = ($this, $newValue) => {
    $this.$value6 = $newValue;
    $this.$version = $this.$version + 1 | 0;
},
juca_AtomicReference_getAndSet = ($this, $newValue) => {
    let $result;
    $result = $this.$value6;
    $this.$value6 = $newValue;
    $this.$version = $this.$version + 1 | 0;
    return $result;
};
function k_SafePublicationLazyImpl() {
    let a = this; jl_Object.call(a);
    a.$initializer1 = null;
    a.$_value = null;
    a.$final = null;
}
let k_SafePublicationLazyImpl_Companion = null,
k_SafePublicationLazyImpl_valueUpdater = null,
k_SafePublicationLazyImpl_$callClinit = () => {
    k_SafePublicationLazyImpl_$callClinit = $rt_eraseClinit(k_SafePublicationLazyImpl);
    k_SafePublicationLazyImpl__clinit_();
},
k_SafePublicationLazyImpl__init_ = ($this, $initializer) => {
    k_SafePublicationLazyImpl_$callClinit();
    kji_Intrinsics_checkNotNullParameter($initializer, $rt_s(94));
    jl_Object__init_($this);
    $this.$initializer1 = $initializer;
    k_UNINITIALIZED_VALUE_$callClinit();
    $this.$_value = k_UNINITIALIZED_VALUE_INSTANCE;
    $this.$final = k_UNINITIALIZED_VALUE_INSTANCE;
},
k_SafePublicationLazyImpl__init_0 = var_0 => {
    let var_1 = new k_SafePublicationLazyImpl();
    k_SafePublicationLazyImpl__init_(var_1, var_0);
    return var_1;
},
k_SafePublicationLazyImpl__clinit_ = () => {
    k_SafePublicationLazyImpl_Companion = k_SafePublicationLazyImpl$Companion__init_1(null);
    k_SafePublicationLazyImpl$_value$_AtomicUpdater$_$callClinit();
    k_SafePublicationLazyImpl_valueUpdater = k_SafePublicationLazyImpl$_value$_AtomicUpdater$_INSTANCE;
};
function kr_IntProgression() {
    let a = this; jl_Object.call(a);
    a.$first0 = 0;
    a.$last = 0;
    a.$step0 = 0;
}
let kr_IntProgression_Companion = null,
kr_IntProgression_$callClinit = () => {
    kr_IntProgression_$callClinit = $rt_eraseClinit(kr_IntProgression);
    kr_IntProgression__clinit_();
},
kr_IntProgression__init_ = ($this, $start, $endInclusive, $step) => {
    kr_IntProgression_$callClinit();
    jl_Object__init_($this);
    if (!$step)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(252)));
    if ($step == (-2147483648))
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(253)));
    $this.$first0 = $start;
    $this.$last = ki_ProgressionUtilKt_getProgressionLastElement($start, $endInclusive, $step);
    $this.$step0 = $step;
},
kr_IntProgression__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new kr_IntProgression();
    kr_IntProgression__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
kr_IntProgression_getFirst = $this => {
    return $this.$first0;
},
kr_IntProgression_getLast = $this => {
    return $this.$last;
},
kr_IntProgression_getStep = $this => {
    return $this.$step0;
},
kr_IntProgression_iterator = $this => {
    return $rt_castToClass(kr_IntProgressionIterator__init_0($this.$first0, $this.$last, $this.$step0), kc_IntIterator);
},
kr_IntProgression__clinit_ = () => {
    kr_IntProgression_Companion = kr_IntProgression$Companion__init_1(null);
},
uciis_MyDataService = $rt_classWithoutFields(0),
csw_ProtoAdapterKt$commonInt64$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonInt64$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Long_valueOf(Long_ZERO);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonInt64$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonInt64$1();
    csw_ProtoAdapterKt$commonInt64$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonInt64$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint64($writer, $value);
},
csw_ProtoAdapterKt$commonInt64$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonInt64$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
};
function otciu_CharMapping() {
    let a = this; jl_Object.call(a);
    a.$binarySearchTable0 = null;
    a.$fastTable = null;
}
let otciu_CharMapping__init_ = ($this, $binarySearchTable, $fastTable) => {
    jl_Object__init_($this);
    $this.$binarySearchTable0 = $binarySearchTable;
    $this.$fastTable = $fastTable;
},
otciu_CharMapping__init_0 = (var_0, var_1) => {
    let var_2 = new otciu_CharMapping();
    otciu_CharMapping__init_(var_2, var_0, var_1);
    return var_2;
},
jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError),
csw_FieldEncoding$WhenMappings = $rt_classWithoutFields(),
csw_FieldEncoding$WhenMappings_$EnumSwitchMapping$0 = null,
csw_FieldEncoding$WhenMappings_$callClinit = () => {
    csw_FieldEncoding$WhenMappings_$callClinit = $rt_eraseClinit(csw_FieldEncoding$WhenMappings);
    csw_FieldEncoding$WhenMappings__clinit_();
},
csw_FieldEncoding$WhenMappings__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray($rt_nullCheck(csw_FieldEncoding_values()).data.length);
    var$2 = var$1.data;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(csw_FieldEncoding_VARINT)), var$2)] = 1;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(csw_FieldEncoding_FIXED32)), var$2)] = 2;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(csw_FieldEncoding_FIXED64)), var$2)] = 3;
    var$2[$rt_checkBounds(jl_Enum_ordinal($rt_nullCheck(csw_FieldEncoding_LENGTH_DELIMITED)), var$2)] = 4;
    csw_FieldEncoding$WhenMappings_$EnumSwitchMapping$0 = var$1;
},
cswi_Internal__InternalKt = $rt_classWithoutFields(),
cswi_Internal__InternalKt_newMutableList = () => {
    return $rt_castToInterface(cswi_MutableOnWriteList__init_0(kc_CollectionsKt__CollectionsKt_emptyList()), ju_List);
},
cswi_Internal__InternalKt_immutableCopyOf = ($name, $list) => {
    let $result, var$4;
    kji_Intrinsics_checkNotNullParameter($name, $rt_s(254));
    kji_Intrinsics_checkNotNullParameter($list, $rt_s(217));
    if ($list instanceof cswi_MutableOnWriteList)
        $list = cswi_MutableOnWriteList_getMutableList$wire_runtime($rt_nullCheck($rt_castToClass($list, cswi_MutableOnWriteList)));
    if ($list !== kc_CollectionsKt__CollectionsKt_emptyList() && !($list instanceof cswi_ImmutableList)) {
        $result = cswi_ImmutableList__init_0($list);
        if ($result.$contains0(null) ? 0 : 1)
            return $rt_castToInterface($result, ju_List);
        var$4 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($name)).$append3($rt_s(255))).$toString();
        $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$4).$toString()));
    }
    return $list;
},
cswi_Internal__InternalKt_equals = ($a, $b) => {
    let var$3;
    a: {
        b: {
            if ($a !== $b) {
                if ($a === null)
                    break b;
                if (!kji_Intrinsics_areEqual($a, $b))
                    break b;
            }
            var$3 = 1;
            break a;
        }
        var$3 = 0;
    }
    return var$3;
},
cswi_Internal__InternalKt_checkElementsNotNull = $list => {
    let $i, var$3;
    kji_Intrinsics_checkNotNullParameter($list, $rt_s(217));
    $i = 0;
    $list = $rt_nullCheck($list);
    var$3 = $list.$size();
    while ($i < var$3) {
        if ($list.$get1($i) === null)
            $rt_throw(jl_NullPointerException__init_($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(256))).$append4($i)).$append3($rt_s(257))).$toString()));
        $i = $i + 1 | 0;
    }
},
cswi_Internal__InternalKt_sanitize0 = $value => {
    let var$2, var$3, $$this$forEach$iv, var$5, $element$iv, var$7;
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    var$2 = $value.$length();
    var$3 = jl_StringBuilder__init_0(var$2);
    $$this$forEach$iv = $rt_castToInterface($value, jl_CharSequence);
    var$5 = 0;
    while (true) {
        $$this$forEach$iv = $rt_nullCheck($$this$forEach$iv);
        if (var$5 >= $$this$forEach$iv.$length())
            break;
        $element$iv = $$this$forEach$iv.$charAt(var$5);
        if (kt_StringsKt__StringsKt_contains$default($rt_castToInterface($rt_s(258), jl_CharSequence), $element$iv, 0, 2, null))
            var$3.$append0(92);
        var$3.$append0($element$iv);
        var$5 = var$5 + 1 | 0;
    }
    var$7 = var$3.$toString();
    kji_Intrinsics_checkNotNullExpressionValue(var$7, $rt_s(259));
    return var$7;
},
cswi_Internal__InternalKt_sanitize = $values => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($values, $rt_s(260));
    var$2 = $rt_castToInterface($values, jl_Iterable);
    var$3 = null;
    var$4 = $rt_castToInterface($rt_s(66), jl_CharSequence);
    var$5 = $rt_castToInterface($rt_s(67), jl_CharSequence);
    var$6 = null;
    cswi_Internal__InternalKt$sanitize$2_$callClinit();
    return kc_CollectionsKt___CollectionsKt_joinToString$default(var$2, var$3, var$4, var$5, 0, var$6, $rt_castToInterface(cswi_Internal__InternalKt$sanitize$2_INSTANCE, kjf_Function1), 25, null);
},
otjc_JSWeakRef = $rt_classWithoutFields();
function otci_CharFlow() {
    let a = this; jl_Object.call(a);
    a.$characters = null;
    a.$pointer = 0;
}
let otci_CharFlow__init_ = ($this, $characters) => {
    jl_Object__init_($this);
    $this.$characters = $characters;
},
otci_CharFlow__init_0 = var_0 => {
    let var_1 = new otci_CharFlow();
    otci_CharFlow__init_(var_1, var_0);
    return var_1;
},
csw_ProtoReader$Companion = $rt_classWithoutFields(),
csw_ProtoReader$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
csw_ProtoReader$Companion__init_2 = () => {
    let var_0 = new csw_ProtoReader$Companion();
    csw_ProtoReader$Companion__init_0(var_0);
    return var_0;
},
csw_ProtoReader$Companion__init_ = ($this, $$constructor_marker) => {
    csw_ProtoReader$Companion__init_0($this);
},
csw_ProtoReader$Companion__init_1 = var_0 => {
    let var_1 = new csw_ProtoReader$Companion();
    csw_ProtoReader$Companion__init_(var_1, var_0);
    return var_1;
},
cswi_Internal__InternalKt$sanitize$2 = $rt_classWithoutFields(kji_FunctionReference),
cswi_Internal__InternalKt$sanitize$2_INSTANCE = null,
cswi_Internal__InternalKt$sanitize$2_$callClinit = () => {
    cswi_Internal__InternalKt$sanitize$2_$callClinit = $rt_eraseClinit(cswi_Internal__InternalKt$sanitize$2);
    cswi_Internal__InternalKt$sanitize$2__clinit_();
},
cswi_Internal__InternalKt$sanitize$2__init_ = $this => {
    cswi_Internal__InternalKt$sanitize$2_$callClinit();
    kji_FunctionReference__init_0($this, 1);
},
cswi_Internal__InternalKt$sanitize$2__init_0 = () => {
    let var_0 = new cswi_Internal__InternalKt$sanitize$2();
    cswi_Internal__InternalKt$sanitize$2__init_(var_0);
    return var_0;
},
cswi_Internal__InternalKt$sanitize$2_invoke = ($this, $p0) => {
    kji_Intrinsics_checkNotNullParameter($p0, $rt_s(261));
    return cswi_Internal_sanitize($p0);
},
cswi_Internal__InternalKt$sanitize$2_invoke0 = ($this, $p1) => {
    return cswi_Internal__InternalKt$sanitize$2_invoke($this, $rt_castToClass($p1, jl_String));
},
cswi_Internal__InternalKt$sanitize$2__clinit_ = () => {
    cswi_Internal__InternalKt$sanitize$2_INSTANCE = cswi_Internal__InternalKt$sanitize$2__init_0();
},
uciis_MyDataService_Stub$processData$lambda$_1_0 = $rt_classWithoutFields(),
uciis_MyDataService_Stub$processData$lambda$_1_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
uciis_MyDataService_Stub$processData$lambda$_1_0__init_0 = () => {
    let var_0 = new uciis_MyDataService_Stub$processData$lambda$_1_0();
    uciis_MyDataService_Stub$processData$lambda$_1_0__init_(var_0);
    return var_0;
},
uciis_MyDataService_Stub$processData$lambda$_1_0_apply0 = (var$0, var$1) => {
    return uciis_MyDataService_Stub$processData$lambda$_1_0_apply(var$0, var$1);
},
uciis_MyDataService_Stub$processData$lambda$_1_0_apply = (var$0, var$1) => {
    return uciis_MyDataService_Stub_lambda$processData$0(var$1);
},
ji_IOException = $rt_classWithoutFields(jl_Exception),
ji_IOException__init_ = $this => {
    jl_Exception__init_($this);
},
ji_IOException__init_2 = () => {
    let var_0 = new ji_IOException();
    ji_IOException__init_(var_0);
    return var_0;
},
ji_IOException__init_1 = ($this, $message) => {
    jl_Exception__init_0($this, $message);
},
ji_IOException__init_0 = var_0 => {
    let var_1 = new ji_IOException();
    ji_IOException__init_1(var_1, var_0);
    return var_1;
},
jnc_CharacterCodingException = $rt_classWithoutFields(ji_IOException),
jnc_CharacterCodingException__init_ = $this => {
    ji_IOException__init_($this);
},
jnc_CharacterCodingException__init_0 = () => {
    let var_0 = new jnc_CharacterCodingException();
    jnc_CharacterCodingException__init_(var_0);
    return var_0;
};
function jnc_UnmappableCharacterException() {
    jnc_CharacterCodingException.call(this);
    this.$length2 = 0;
}
let jnc_UnmappableCharacterException__init_ = ($this, $length) => {
    jnc_CharacterCodingException__init_($this);
    $this.$length2 = $length;
},
jnc_UnmappableCharacterException__init_0 = var_0 => {
    let var_1 = new jnc_UnmappableCharacterException();
    jnc_UnmappableCharacterException__init_(var_1, var_0);
    return var_1;
},
jnc_UnmappableCharacterException_getMessage = $this => {
    let var$1, var$2;
    var$1 = $this.$length2;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$2, $rt_s(262))), var$1);
    return jl_StringBuilder_toString(var$2);
},
kji_ClassReference$Companion = $rt_classWithoutFields(),
kji_ClassReference$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
kji_ClassReference$Companion__init_2 = () => {
    let var_0 = new kji_ClassReference$Companion();
    kji_ClassReference$Companion__init_0(var_0);
    return var_0;
},
kji_ClassReference$Companion__init_ = ($this, $$constructor_marker) => {
    kji_ClassReference$Companion__init_0($this);
},
kji_ClassReference$Companion__init_1 = var_0 => {
    let var_1 = new kji_ClassReference$Companion();
    kji_ClassReference$Companion__init_(var_1, var_0);
    return var_1;
},
jn_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException),
jn_BufferUnderflowException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jn_BufferUnderflowException__init_0 = () => {
    let var_0 = new jn_BufferUnderflowException();
    jn_BufferUnderflowException__init_(var_0);
    return var_0;
};
function otcit_FloatAnalyzer$Result() {
    let a = this; jl_Object.call(a);
    a.$mantissa0 = 0;
    a.$exponent0 = 0;
    a.$sign0 = 0;
}
let otcit_FloatAnalyzer$Result__init_ = $this => {
    jl_Object__init_($this);
},
otcit_FloatAnalyzer$Result__init_0 = () => {
    let var_0 = new otcit_FloatAnalyzer$Result();
    otcit_FloatAnalyzer$Result__init_(var_0);
    return var_0;
},
jl_String$_clinit_$lambda$_115_0 = $rt_classWithoutFields(),
jl_String$_clinit_$lambda$_115_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
jl_String$_clinit_$lambda$_115_0__init_0 = () => {
    let var_0 = new jl_String$_clinit_$lambda$_115_0();
    jl_String$_clinit_$lambda$_115_0__init_(var_0);
    return var_0;
};
function uciisdp_Address$Builder() {
    let a = this; csw_Message$Builder.call(a);
    a.$street1 = null;
    a.$city1 = null;
}
let uciisdp_Address$Builder__init_ = $this => {
    csw_Message$Builder__init_($this);
    $this.$street1 = $rt_s(6);
    $this.$city1 = $rt_s(6);
},
uciisdp_Address$Builder__init_0 = () => {
    let var_0 = new uciisdp_Address$Builder();
    uciisdp_Address$Builder__init_(var_0);
    return var_0;
},
uciisdp_Address$Builder_street = ($this, $street) => {
    $this.$street1 = $street;
    return $this;
},
uciisdp_Address$Builder_city = ($this, $city) => {
    $this.$city1 = $city;
    return $this;
},
uciisdp_Address$Builder_build = $this => {
    return uciisdp_Address__init_0($this.$street1, $this.$city1, csw_Message$Builder_buildUnknownFields($this));
},
kj_JvmClassMappingKt = $rt_classWithoutFields(),
kj_JvmClassMappingKt_getJavaClass = $$this$java => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($$this$java, $rt_s(29));
    var$2 = $rt_nullCheck($rt_castToInterface($$this$java, kji_ClassBasedDeclarationContainer)).$getJClass();
    kji_Intrinsics_checkNotNull0(var$2, $rt_s(263));
    return var$2;
},
kj_JvmClassMappingKt_getKotlinClass = $$this$kotlin => {
    kji_Intrinsics_checkNotNullParameter($$this$kotlin, $rt_s(29));
    return kji_Reflection_getOrCreateKotlinClass($$this$kotlin);
};
function jnc_MalformedInputException() {
    jnc_CharacterCodingException.call(this);
    this.$length3 = 0;
}
let jnc_MalformedInputException__init_ = ($this, $length) => {
    jnc_CharacterCodingException__init_($this);
    $this.$length3 = $length;
},
jnc_MalformedInputException__init_0 = var_0 => {
    let var_1 = new jnc_MalformedInputException();
    jnc_MalformedInputException__init_(var_1, var_0);
    return var_1;
},
jnc_MalformedInputException_getMessage = $this => {
    let var$1, var$2;
    var$1 = $this.$length3;
    var$2 = jl_StringBuilder__init_();
    jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$2, $rt_s(264))), var$1);
    return jl_StringBuilder_toString(var$2);
},
kc_MapsKt__MapWithDefaultKt = $rt_classWithoutFields(),
kc_MapsKt__MapsJVMKt = $rt_classWithoutFields(kc_MapsKt__MapWithDefaultKt),
kc_MapsKt__MapsJVMKt_mapOf = $pair => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($pair, $rt_s(265));
    $pair = $rt_nullCheck($pair);
    var$2 = ju_Collections_singletonMap(k_Pair_getFirst($pair), k_Pair_getSecond($pair));
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(266));
    return var$2;
},
kc_MapsKt__MapsJVMKt_toSingletonMap = $$this$toSingletonMap => {
    let $$this$toSingletonMap_u24lambda_u245, var$3;
    kji_Intrinsics_checkNotNullParameter($$this$toSingletonMap, $rt_s(29));
    $$this$toSingletonMap = $rt_nullCheck($$this$toSingletonMap);
    $$this$toSingletonMap_u24lambda_u245 = $rt_castToInterface($rt_nullCheck($rt_nullCheck($$this$toSingletonMap.$entrySet()).$iterator()).$next(), ju_Map$Entry);
    $$this$toSingletonMap_u24lambda_u245 = $rt_nullCheck($$this$toSingletonMap_u24lambda_u245);
    var$3 = ju_Collections_singletonMap($$this$toSingletonMap_u24lambda_u245.$getKey(), $$this$toSingletonMap_u24lambda_u245.$getValue());
    kji_Intrinsics_checkNotNullExpressionValue(var$3, $rt_s(267));
    return var$3;
},
kc_MapsKt__MapsJVMKt_mapCapacity = $expectedSize => {
    if ($expectedSize >= 0)
        $expectedSize = $expectedSize < 3 ? $expectedSize + 1 | 0 : $expectedSize >= 1073741824 ? 2147483647 : $expectedSize / 0.75 + 1.0 | 0;
    return $expectedSize;
},
kr_ClosedRange = $rt_classWithoutFields(0),
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jl_CloneNotSupportedException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_CloneNotSupportedException__init_0 = () => {
    let var_0 = new jl_CloneNotSupportedException();
    jl_CloneNotSupportedException__init_(var_0);
    return var_0;
},
otjt_ArrayBufferView = $rt_classWithoutFields(),
otjt_Uint8Array = $rt_classWithoutFields(otjt_ArrayBufferView),
kji_Reflection = $rt_classWithoutFields(),
kji_Reflection_factory = null,
kji_Reflection_EMPTY_K_CLASS_ARRAY = null,
kji_Reflection_$callClinit = () => {
    kji_Reflection_$callClinit = $rt_eraseClinit(kji_Reflection);
    kji_Reflection__clinit_();
},
kji_Reflection_getOrCreateKotlinClass = $javaClass => {
    kji_Reflection_$callClinit();
    return $rt_nullCheck(kji_Reflection_factory).$getOrCreateKotlinClass($javaClass);
},
kji_Reflection__clinit_ = () => {
    let $impl, $$je;
    a: {
        b: {
            c: {
                d: {
                    try {
                        $rt_throw(jl_ClassNotFoundException__init_0());
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_ClassCastException) {
                            break d;
                        } else if ($$je instanceof jl_ClassNotFoundException) {
                            break c;
                        } else if ($$je instanceof jl_InstantiationException) {
                            break b;
                        } else if ($$je instanceof jl_IllegalAccessException) {
                        } else {
                            throw $$e;
                        }
                    }
                    $impl = null;
                    break a;
                }
                $impl = null;
                break a;
            }
            $impl = null;
            break a;
        }
        $impl = null;
    }
    if ($impl === null)
        $impl = kji_ReflectionFactory__init_0();
    kji_Reflection_factory = $impl;
    kji_Reflection_EMPTY_K_CLASS_ARRAY = $rt_createArray(kr_KClass, 0);
};
function ucitrcs_ProtobufSerializer() {
    jl_Object.call(this);
    this.$codecRegistry = null;
}
let ucitrcs_ProtobufSerializer__init_ = $this => {
    jl_Object__init_($this);
    $this.$codecRegistry = juc_ConcurrentHashMap__init_();
},
ucitrcs_ProtobufSerializer__init_0 = () => {
    let var_0 = new ucitrcs_ProtobufSerializer();
    ucitrcs_ProtobufSerializer__init_(var_0);
    return var_0;
},
ucitrcs_ProtobufSerializer_register = ($this, $clazz, $adapterOrCodec) => {
    let var$3, var$4, var$5;
    if ($rt_isInstance($adapterOrCodec, ucitrcc_Codec)) {
        $rt_nullCheck($this.$codecRegistry).$put3($clazz, $rt_castToInterface($adapterOrCodec, ucitrcc_Codec));
        return;
    }
    var$3 = new jl_IllegalArgumentException;
    $adapterOrCodec = $rt_nullCheck($adapterOrCodec);
    var$4 = $rt_nullCheck(jl_Object_getClass($adapterOrCodec)).$getName();
    var$5 = jl_StringBuilder__init_();
    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$5, $rt_s(268))), var$4);
    jl_IllegalArgumentException__init_1(var$3, jl_StringBuilder_toString(var$5));
    $rt_throw(var$3);
},
ucitrcs_ProtobufSerializer_encode = ($this, $object) => {
    let $codec, var$3, var$4, var$5;
    if ($object === null)
        return $rt_createByteArray(0);
    $codec = $rt_castToInterface($rt_nullCheck($this.$codecRegistry).$get2(jl_Object_getClass($object)), ucitrcc_Codec);
    if ($codec !== null)
        return ucitrcs_ProtobufSerializer_encodeInternal($this, $codec, $object);
    var$3 = new jl_IllegalArgumentException;
    var$4 = $rt_nullCheck(jl_Object_getClass($object)).$getName();
    var$5 = jl_StringBuilder__init_();
    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$5, $rt_s(269))), var$4);
    jl_IllegalArgumentException__init_1(var$3, jl_StringBuilder_toString(var$5));
    $rt_throw(var$3);
},
ucitrcs_ProtobufSerializer_encodeInternal = ($this, $codec, $object) => {
    let $wire;
    $codec = $rt_nullCheck($codec);
    $wire = $codec.$toWire1($object);
    return csw_ProtoAdapter_encode($rt_nullCheck($codec.$getWireAdapter()), $wire);
},
o_Sink = $rt_classWithoutFields(0),
jnc_WritableByteChannel = $rt_classWithoutFields(0),
o_BufferedSink = $rt_classWithoutFields(0);
function jl_Long() {
    jl_Number.call(this);
    this.$value3 = Long_ZERO;
}
let jl_Long_TYPE = null,
jl_Long_$callClinit = () => {
    jl_Long_$callClinit = $rt_eraseClinit(jl_Long);
    jl_Long__clinit_();
},
jl_Long__init_ = ($this, $value) => {
    jl_Long_$callClinit();
    jl_Number__init_($this);
    $this.$value3 = $value;
},
jl_Long__init_0 = var_0 => {
    let var_1 = new jl_Long();
    jl_Long__init_(var_1, var_0);
    return var_1;
},
jl_Long_valueOf = $value => {
    jl_Long_$callClinit();
    return jl_Long__init_0($value);
},
jl_Long_intValue = $this => {
    return Long_lo($this.$value3);
},
jl_Long_longValue = $this => {
    return $this.$value3;
},
jl_Long_floatValue = $this => {
    return Long_toNumber($this.$value3);
},
jl_Long_doubleValue = $this => {
    return Long_toNumber($this.$value3);
},
jl_Long_toString = $value => {
    jl_Long_$callClinit();
    return $rt_nullCheck((jl_StringBuilder__init_()).$append9($value)).$toString();
},
jl_Long_toString0 = $this => {
    return jl_Long_toString($this.$value3);
},
jl_Long_equals = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Long && Long_eq($rt_nullCheck($rt_castToClass($other, jl_Long)).$value3, $this.$value3) ? 1 : 0;
},
jl_Long_divideUnsigned = (var$1, var$2) => {
    return Long_udiv(var$1, var$2);
},
jl_Long_remainderUnsigned = (var$1, var$2) => {
    return Long_urem(var$1, var$2);
},
jl_Long_compareUnsigned = (var$1, var$2) => {
    return Long_ucompare(var$1, var$2);
},
jl_Long__clinit_ = () => {
    jl_Long_TYPE = $rt_cls($rt_longcls);
};
function oj_ComparisonFailure$ComparisonCompactor() {
    let a = this; jl_Object.call(a);
    a.$contextLength = 0;
    a.$expected = null;
    a.$actual = null;
}
let oj_ComparisonFailure$ComparisonCompactor__init_ = ($this, $contextLength, $expected, $actual) => {
    jl_Object__init_($this);
    $this.$contextLength = $contextLength;
    $this.$expected = $expected;
    $this.$actual = $actual;
},
oj_ComparisonFailure$ComparisonCompactor__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new oj_ComparisonFailure$ComparisonCompactor();
    oj_ComparisonFailure$ComparisonCompactor__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
oj_ComparisonFailure$ComparisonCompactor_compact = ($this, $message) => {
    let $extractor, $compactedPrefix, $compactedSuffix;
    if ($this.$expected !== null && $this.$actual !== null && !$rt_nullCheck($this.$expected).$equals0($this.$actual)) {
        $extractor = oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_1($this, null);
        $compactedPrefix = $extractor.$compactPrefix();
        $compactedSuffix = $extractor.$compactSuffix();
        return oj_Assert_format($message, $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($compactedPrefix)).$append3($extractor.$expectedDiff())).$append3($compactedSuffix)).$toString(), $rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($compactedPrefix)).$append3($extractor.$actualDiff())).$append3($compactedSuffix)).$toString());
    }
    return oj_Assert_format($message, $this.$expected, $this.$actual);
},
oj_ComparisonFailure$ComparisonCompactor_sharedPrefix = $this => {
    let $end, $i;
    $end = jl_Math_min($rt_nullCheck($this.$expected).$length(), $rt_nullCheck($this.$actual).$length());
    $i = 0;
    while ($i < $end) {
        if ($rt_nullCheck($this.$expected).$charAt($i) != $rt_nullCheck($this.$actual).$charAt($i))
            return $rt_nullCheck($this.$expected).$substring(0, $i);
        $i = $i + 1 | 0;
    }
    return $rt_nullCheck($this.$expected).$substring(0, $end);
},
oj_ComparisonFailure$ComparisonCompactor_sharedSuffix = ($this, $prefix) => {
    let $suffixLength, var$3, $maxSuffixLength;
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
},
oj_ComparisonFailure$ComparisonCompactor_access$100 = $x0 => {
    $x0 = $rt_nullCheck($x0);
    return oj_ComparisonFailure$ComparisonCompactor_sharedPrefix($x0);
},
oj_ComparisonFailure$ComparisonCompactor_access$200 = ($x0, $x1) => {
    $x0 = $rt_nullCheck($x0);
    return oj_ComparisonFailure$ComparisonCompactor_sharedSuffix($x0, $x1);
},
oj_ComparisonFailure$ComparisonCompactor_access$300 = $x0 => {
    $x0 = $rt_nullCheck($x0);
    return $x0.$expected;
},
oj_ComparisonFailure$ComparisonCompactor_access$400 = $x0 => {
    $x0 = $rt_nullCheck($x0);
    return $x0.$actual;
},
oj_ComparisonFailure$ComparisonCompactor_access$500 = $x0 => {
    $x0 = $rt_nullCheck($x0);
    return $x0.$contextLength;
},
jtt_TemporalAmount = $rt_classWithoutFields(0);
function jt_Duration() {
    let a = this; jl_Object.call(a);
    a.$seconds = Long_ZERO;
    a.$nanos = 0;
}
let jt_Duration_ZERO = null,
jt_Duration_$callClinit = () => {
    jt_Duration_$callClinit = $rt_eraseClinit(jt_Duration);
    jt_Duration__clinit_();
},
jt_Duration__init_0 = ($this, $seconds, $nanos) => {
    jt_Duration_$callClinit();
    jl_Object__init_($this);
    $this.$seconds = $seconds;
    $this.$nanos = $nanos;
},
jt_Duration__init_ = (var_0, var_1) => {
    let var_2 = new jt_Duration();
    jt_Duration__init_0(var_2, var_0, var_1);
    return var_2;
},
jt_Duration_getSeconds = $this => {
    return $this.$seconds;
},
jt_Duration_getNano = $this => {
    return $this.$nanos;
},
jt_Duration__clinit_ = () => {
    jt_Duration_ZERO = jt_Duration__init_(Long_ZERO, 0);
};
function juc_ConcurrentHashMap$HashEntry() {
    let a = this; juc_MapEntry.call(a);
    a.$origKeyHash0 = 0;
    a.$next4 = null;
    a.$removed = 0;
}
let juc_ConcurrentHashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    juc_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash0 = $hash;
},
juc_ConcurrentHashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new juc_ConcurrentHashMap$HashEntry();
    juc_ConcurrentHashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
},
uciisd_AddressCodec = $rt_classWithoutFields(),
uciisd_AddressCodec__init_ = $this => {
    jl_Object__init_($this);
},
uciisd_AddressCodec__init_0 = () => {
    let var_0 = new uciisd_AddressCodec();
    uciisd_AddressCodec__init_(var_0);
    return var_0;
},
uciisd_AddressCodec_toWire = ($this, $pojo) => {
    let var$2, var$3;
    if ($pojo === null)
        return null;
    var$2 = uciisdp_Address$Builder__init_0();
    var$2 = uciisdp_Address$Builder_street(var$2, $pojo.$getStreet());
    var$3 = $pojo.$getCity();
    var$2 = uciisdp_Address$Builder_city($rt_nullCheck(var$2), var$3);
    var$2 = uciisdp_Address$Builder_build($rt_nullCheck(var$2));
    return var$2;
},
jnc_ByteChannel = $rt_classWithoutFields(0),
jl_ArithmeticException = $rt_classWithoutFields(jl_RuntimeException),
jl_ArithmeticException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
jl_ArithmeticException__init_2 = () => {
    let var_0 = new jl_ArithmeticException();
    jl_ArithmeticException__init_0(var_0);
    return var_0;
},
jl_ArithmeticException__init_ = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_ArithmeticException__init_1 = var_0 => {
    let var_1 = new jl_ArithmeticException();
    jl_ArithmeticException__init_(var_1, var_0);
    return var_1;
},
ju_EnumSet = $rt_classWithoutFields(ju_AbstractSet),
ju_EnumSet__init_ = $this => {
    ju_AbstractSet__init_($this);
},
ju_EnumSet_noneOf = $elementType => {
    return ju_GenericEnumSet__init_0($elementType);
},
o_ByteString$Companion = $rt_classWithoutFields(),
o_ByteString$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
o_ByteString$Companion__init_2 = () => {
    let var_0 = new o_ByteString$Companion();
    o_ByteString$Companion__init_0(var_0);
    return var_0;
},
o_ByteString$Companion_of = ($this, $data) => {
    let var$2, var$3;
    kji_Intrinsics_checkNotNullParameter($data, $rt_s(39));
    var$2 = new o_ByteString;
    $data = $rt_nullCheck($data);
    var$3 = ju_Arrays_copyOf($data, $data.data.length);
    kji_Intrinsics_checkNotNullExpressionValue(var$3, $rt_s(40));
    o_ByteString__init_(var$2, var$3);
    return var$2;
},
o_ByteString$Companion__init_ = ($this, $$constructor_marker) => {
    o_ByteString$Companion__init_0($this);
},
o_ByteString$Companion__init_1 = var_0 => {
    let var_1 = new o_ByteString$Companion();
    o_ByteString$Companion__init_(var_1, var_0);
    return var_1;
};
function kc_AbstractCollection$toString$1() {
    kji_Lambda.call(this);
    this.$this$03 = null;
}
let kc_AbstractCollection$toString$1__init_ = ($this, $$receiver) => {
    $this.$this$03 = $$receiver;
    kji_Lambda__init_($this, 1);
},
kc_AbstractCollection$toString$1__init_0 = var_0 => {
    let var_1 = new kc_AbstractCollection$toString$1();
    kc_AbstractCollection$toString$1__init_(var_1, var_0);
    return var_1;
},
kc_AbstractCollection$toString$1_invoke = ($this, $it) => {
    return $it !== $this.$this$03 ? $rt_castToInterface(jl_String_valueOf($it), jl_CharSequence) : $rt_castToInterface($rt_s(85), jl_CharSequence);
},
kc_AbstractCollection$toString$1_invoke0 = ($this, $p1) => {
    return kc_AbstractCollection$toString$1_invoke($this, $p1);
},
otci_Base46 = $rt_classWithoutFields(),
otci_Base46_decodeUnsigned = $seq => {
    let $number, $pos, var$4, var$5, $digit, $hasMore;
    $number = 0;
    $pos = 1;
    while (true) {
        $seq = $rt_nullCheck($seq);
        var$4 = $seq.$characters;
        var$5 = $seq.$pointer;
        $seq.$pointer = var$5 + 1 | 0;
        var$4 = $rt_nullCheck(var$4).data;
        $digit = otci_Base46_decodeDigit(var$4[$rt_checkBounds(var$5, var$4)]);
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
},
otci_Base46_decode = $seq => {
    let $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
},
otci_Base46_decodeDigit = $c => {
    if ($c < 34)
        return $c - 32 | 0;
    if ($c >= 92)
        return ($c - 32 | 0) - 2 | 0;
    return ($c - 32 | 0) - 1 | 0;
};
function ju_GenericEnumSet() {
    let a = this; ju_EnumSet.call(a);
    a.$cls = null;
    a.$bits = null;
}
let ju_GenericEnumSet__init_ = ($this, $cls) => {
    let $constants, $constantCount, $bitCount;
    ju_EnumSet__init_($this);
    $this.$cls = $cls;
    $constants = ju_GenericEnumSet_getConstants($cls);
    if ($constants === null)
        $rt_throw(jl_ClassCastException__init_());
    $constantCount = $constants.data.length;
    $bitCount = !$constantCount ? 0 : (($constantCount - 1 | 0) / 32 | 0) + 1 | 0;
    $this.$bits = $rt_createIntArray($bitCount);
},
ju_GenericEnumSet__init_0 = var_0 => {
    let var_1 = new ju_GenericEnumSet();
    ju_GenericEnumSet__init_(var_1, var_0);
    return var_1;
},
ju_GenericEnumSet_getConstants = $cls => {
    let $platformClass;
    $platformClass = $rt_nullCheck($rt_castToClass($cls, jl_Class)).$getPlatformClass();
    $platformClass.$clinit();
    return otp_Platform_getEnumConstants($platformClass);
},
ju_GenericEnumSet_add = ($this, $t) => {
    let $tCls, $n, $bitNumber, $bit, var$6;
    $t = $rt_nullCheck($t);
    $tCls = jl_Object_getClass($t);
    if ($tCls !== $this.$cls) {
        $tCls = $rt_nullCheck($tCls);
        if ($tCls.$getSuperclass() !== $this.$cls)
            $rt_throw(jl_ClassCastException__init_());
    }
    $n = jl_Enum_ordinal($t);
    $bitNumber = $n / 32 | 0;
    $bit = 1 << ($n % 32 | 0);
    var$6 = $rt_nullCheck($this.$bits).data;
    $bitNumber = $rt_checkBounds($bitNumber, var$6);
    if (var$6[$bitNumber] & $bit)
        return 0;
    var$6 = $rt_nullCheck($this.$bits).data;
    $bitNumber = $rt_checkUpperBound($bitNumber, var$6);
    var$6[$bitNumber] = var$6[$bitNumber] | $bit;
    return 1;
},
ju_GenericEnumSet_addAll = ($this, $c) => {
    let $other, var$3, $added, $i, var$6, var$7, var$8;
    if ($c instanceof ju_GenericEnumSet) {
        $other = $rt_castToClass($c, ju_GenericEnumSet);
        var$3 = $this.$cls;
        $other = $rt_nullCheck($other);
        if (var$3 === $other.$cls) {
            $added = 0;
            $i = 0;
            while ($i < $rt_nullCheck($this.$bits).data.length) {
                var$6 = $rt_nullCheck($this.$bits).data;
                $i = $rt_checkBounds($i, var$6);
                var$7 = var$6[$i];
                var$6 = $rt_nullCheck($other.$bits).data;
                $i = $rt_checkUpperBound($i, var$6);
                var$7 = var$7 | var$6[$i];
                var$6 = $rt_nullCheck($this.$bits).data;
                $i = $rt_checkUpperBound($i, var$6);
                if (var$7 != var$6[$i]) {
                    $added = 1;
                    var$6 = $rt_nullCheck($this.$bits).data;
                    $i = $rt_checkUpperBound($i, var$6);
                    var$7 = var$6[$i];
                    var$8 = $rt_nullCheck($other.$bits).data;
                    $i = $rt_checkUpperBound($i, var$8);
                    var$6[$i] = var$7 | var$8[$i];
                }
                $i = $i + 1 | 0;
            }
            return $added;
        }
    }
    return ju_AbstractCollection_addAll($this, $c);
},
ju_GenericEnumSet_add0 = ($this, var$1) => {
    return $this.$add0($rt_castToClass(var$1, jl_Enum));
},
jtt_TemporalQuery = $rt_classWithoutFields(0),
jt_Instant$1 = $rt_classWithoutFields(),
jt_Instant$1__init_ = $this => {
    jl_Object__init_($this);
},
jt_Instant$1__init_0 = () => {
    let var_0 = new jt_Instant$1();
    jt_Instant$1__init_(var_0);
    return var_0;
},
kc_IntIterator = $rt_classWithoutFields(),
kc_IntIterator__init_ = $this => {
    jl_Object__init_($this);
},
csw_EnumAdapter = $rt_classWithoutFields(csw_ProtoAdapter),
csw_EnumAdapter__init_ = ($this, $type, $syntax, $identity) => {
    kji_Intrinsics_checkNotNullParameter($type, $rt_s(12));
    kji_Intrinsics_checkNotNullParameter($syntax, $rt_s(10));
    csw_FieldEncoding_$callClinit();
    csw_ProtoAdapter__init_($this, csw_FieldEncoding_VARINT, $type, null, $syntax, $identity);
},
csw_EnumAdapter__init_0 = ($this, $type, $syntax, $identity) => {
    kji_Intrinsics_checkNotNullParameter($type, $rt_s(12));
    kji_Intrinsics_checkNotNullParameter($syntax, $rt_s(10));
    csw_EnumAdapter__init_($this, kj_JvmClassMappingKt_getKotlinClass($type), $syntax, $identity);
},
csw_EnumAdapter_encode0 = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    var$3 = $value.$getValue0();
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint32($writer, var$3);
},
csw_EnumAdapter_decode0 = ($this, $reader) => {
    let $value$iv, var$3;
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    $value$iv = csw_ProtoReader_readVarint32($reader);
    var$3 = $this.$fromValue($value$iv);
    if (var$3 !== null)
        return var$3;
    $rt_throw(csw_ProtoAdapter$EnumConstantNotFoundException__init_0($value$iv, csw_ProtoAdapter_getType($this)));
},
csw_EnumAdapter_encode = ($this, $writer, $value) => {
    $this.$encode20($writer, $rt_castToInterface($value, csw_WireEnum));
},
csw_EnumAdapter_decode = ($this, $reader) => {
    return $this.$decode7($reader);
},
ucicsp_RpcPacket$Type$ProtoAdapter_Type = $rt_classWithoutFields(csw_EnumAdapter),
ucicsp_RpcPacket$Type$ProtoAdapter_Type__init_ = $this => {
    let var$1;
    csw_Syntax_$callClinit();
    var$1 = csw_Syntax_PROTO_3;
    ucicsp_RpcPacket$Type_$callClinit();
    csw_EnumAdapter__init_0($this, $rt_cls(ucicsp_RpcPacket$Type), var$1, ucicsp_RpcPacket$Type_REQUEST);
},
ucicsp_RpcPacket$Type$ProtoAdapter_Type__init_0 = () => {
    let var_0 = new ucicsp_RpcPacket$Type$ProtoAdapter_Type();
    ucicsp_RpcPacket$Type$ProtoAdapter_Type__init_(var_0);
    return var_0;
},
ucicsp_RpcPacket$Type$ProtoAdapter_Type_fromValue = ($this, $value) => {
    return ucicsp_RpcPacket$Type_fromValue($value);
},
ucicsp_RpcPacket$Type$ProtoAdapter_Type_fromValue0 = ($this, var$1) => {
    return ucicsp_RpcPacket$Type$ProtoAdapter_Type_fromValue($this, var$1);
},
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_2 = ($this, $capacity) => {
    jl_AbstractStringBuilder__init_($this, $capacity);
},
jl_StringBuilder__init_0 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_2(var_1, var_0);
    return var_1;
},
jl_StringBuilder__init_1 = $this => {
    jl_AbstractStringBuilder__init_0($this);
},
jl_StringBuilder__init_ = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_0);
    return var_0;
},
jl_StringBuilder_append = ($this, $obj) => {
    jl_AbstractStringBuilder_append5($this, $obj);
    return $this;
},
jl_StringBuilder_append4 = ($this, $string) => {
    jl_AbstractStringBuilder_append($this, $string);
    return $this;
},
jl_StringBuilder_append0 = ($this, $value) => {
    jl_AbstractStringBuilder_append0($this, $value);
    return $this;
},
jl_StringBuilder_append9 = ($this, $value) => {
    jl_AbstractStringBuilder_append4($this, $value);
    return $this;
},
jl_StringBuilder_append2 = ($this, $value) => {
    jl_AbstractStringBuilder_append2($this, $value);
    return $this;
},
jl_StringBuilder_append5 = ($this, $value) => {
    jl_AbstractStringBuilder_append3($this, $value);
    return $this;
},
jl_StringBuilder_append1 = ($this, $c) => {
    jl_AbstractStringBuilder_append6($this, $c);
    return $this;
},
jl_StringBuilder_append10 = ($this, $s, $start, $end) => {
    jl_AbstractStringBuilder_append1($this, $s, $start, $end);
    return $this;
},
jl_StringBuilder_append8 = ($this, $s) => {
    jl_AbstractStringBuilder_append7($this, $s);
    return $this;
},
jl_StringBuilder_insert7 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert5($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert6 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert0($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert9 = ($this, $target, $value) => {
    jl_AbstractStringBuilder_insert1($this, $target, $value);
    return $this;
},
jl_StringBuilder_insert1 = ($this, $index, $s, $start, $end) => {
    jl_AbstractStringBuilder_insert($this, $index, $s, $start, $end);
    return $this;
},
jl_StringBuilder_insert10 = ($this, $index, $obj) => {
    jl_AbstractStringBuilder_insert3($this, $index, $obj);
    return $this;
},
jl_StringBuilder_insert2 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insert4($this, $index, $c);
    return $this;
},
jl_StringBuilder_delete0 = ($this, $start, $end) => {
    jl_AbstractStringBuilder_delete($this, $start, $end);
    return $this;
},
jl_StringBuilder_replace = ($this, $start, $end, $str) => {
    jl_AbstractStringBuilder_replace($this, $start, $end, $str);
    return $this;
},
jl_StringBuilder_insert11 = ($this, $index, $string) => {
    jl_AbstractStringBuilder_insert2($this, $index, $string);
    return $this;
},
jl_StringBuilder_delete = ($this, var$1, var$2) => {
    return $this.$delete0(var$1, var$2);
},
jl_StringBuilder_insert3 = ($this, var$1, var$2, var$3, var$4) => {
    return $this.$insert8(var$1, var$2, var$3, var$4);
},
jl_StringBuilder_append6 = ($this, var$1, var$2, var$3) => {
    return $this.$append8(var$1, var$2, var$3);
};
let jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    return $this.$insert9(var$1, var$2);
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    return $this.$insert10(var$1, var$2);
},
jl_StringBuilder_insert5 = ($this, var$1, var$2) => {
    return $this.$insert11(var$1, var$2);
},
jl_StringBuilder_insert8 = ($this, var$1, var$2) => {
    return $this.$insert12(var$1, var$2);
},
jl_StringBuilder_insert4 = ($this, var$1, var$2) => {
    return $this.$insert13(var$1, var$2);
},
jl_StringBuilder_insert12 = ($this, var$1, var$2) => {
    return $this.$insert14(var$1, var$2);
},
jl_StringBuilder_append7 = ($this, var$1) => {
    return $this.$append0(var$1);
},
jl_StringBuilder_append3 = ($this, var$1) => {
    return $this.$append18(var$1);
},
csw_ProtoAdapterKt$commonUint64$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonUint64$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Long_valueOf(Long_ZERO);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonUint64$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonUint64$1();
    csw_ProtoAdapterKt$commonUint64$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonUint64$1_encodedSize = ($this, $value) => {
    csw_ProtoWriter_$callClinit();
    return csw_ProtoWriter$Companion_varint64Size$wire_runtime($rt_nullCheck(csw_ProtoWriter_Companion), $value);
},
csw_ProtoAdapterKt$commonUint64$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ProtoWriter_writeVarint64($writer, $value);
},
csw_ProtoAdapterKt$commonUint64$1_encode0 = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint64($writer, $value);
},
csw_ProtoAdapterKt$commonUint64$1_decode = ($this, $reader) => {
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    return jl_Long_valueOf(csw_ProtoReader_readVarint64($reader));
},
csw_ProtoAdapterKt$commonUint64$1_encodedSize0 = ($this, $value) => {
    return csw_ProtoAdapterKt$commonUint64$1_encodedSize($this, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
},
csw_ProtoAdapterKt$commonUint64$1_encode2 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonUint64$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
},
csw_ProtoAdapterKt$commonUint64$1_encode1 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonUint64$1_encode0($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$longValue());
},
csw_ProtoAdapterKt$commonUint64$1_decode0 = ($this, $reader) => {
    return csw_ProtoAdapterKt$commonUint64$1_decode($this, $reader);
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException),
ju_ConcurrentModificationException__init_0 = $this => {
    jl_RuntimeException__init_($this);
},
ju_ConcurrentModificationException__init_ = () => {
    let var_0 = new ju_ConcurrentModificationException();
    ju_ConcurrentModificationException__init_0(var_0);
    return var_0;
},
csw_Syntax$Companion = $rt_classWithoutFields(),
csw_Syntax$Companion__init_ = $this => {
    jl_Object__init_($this);
},
csw_Syntax$Companion__init_2 = () => {
    let var_0 = new csw_Syntax$Companion();
    csw_Syntax$Companion__init_(var_0);
    return var_0;
},
csw_Syntax$Companion__init_0 = ($this, $$constructor_marker) => {
    csw_Syntax$Companion__init_($this);
},
csw_Syntax$Companion__init_1 = var_0 => {
    let var_1 = new csw_Syntax$Companion();
    csw_Syntax$Companion__init_0(var_1, var_0);
    return var_1;
},
kc_ArraysKt___ArraysKt = $rt_classWithoutFields(kc_ArraysKt___ArraysJvmKt),
kc_ArraysKt___ArraysKt_single = $$this$single => {
    let var$2, var$3;
    kji_Intrinsics_checkNotNullParameter($$this$single, $rt_s(29));
    $$this$single = $rt_nullCheck($$this$single);
    var$2 = $$this$single.data;
    switch (var$2.length) {
        case 0:
            break;
        case 1:
            var$3 = var$2[$rt_checkUpperBound(0, var$2)];
            return var$3;
        default:
            $rt_throw(jl_IllegalArgumentException__init_($rt_s(270)));
    }
    $rt_throw(ju_NoSuchElementException__init_2($rt_s(271)));
},
kc_ArraysKt___ArraysKt_reverse = $$this$reverse => {
    let var$2, $midPoint, $reverseIndex, var$5, $index, $tmp_0, var$8;
    kji_Intrinsics_checkNotNullParameter($$this$reverse, $rt_s(29));
    $$this$reverse = $rt_nullCheck($$this$reverse);
    var$2 = $$this$reverse.data;
    $midPoint = (var$2.length / 2 | 0) - 1 | 0;
    if ($midPoint < 0)
        return;
    $reverseIndex = kc_ArraysKt___ArraysKt_getLastIndex($$this$reverse);
    var$5 = (kr_IntRange__init_0(0, $midPoint)).$iterator0();
    while (true) {
        var$5 = $rt_nullCheck(var$5);
        if (!var$5.$hasNext())
            break;
        $index = var$5.$nextInt();
        $index = $rt_checkBounds($index, var$2);
        $tmp_0 = var$2[$index];
        var$8 = $rt_checkBounds($reverseIndex, var$2);
        var$2[$index] = var$2[var$8];
        var$2[var$8] = $tmp_0;
        $reverseIndex = var$8 + (-1) | 0;
    }
},
kc_ArraysKt___ArraysKt_getLastIndex = $$this$lastIndex => {
    kji_Intrinsics_checkNotNullParameter($$this$lastIndex, $rt_s(29));
    $$this$lastIndex = $rt_nullCheck($$this$lastIndex);
    return $$this$lastIndex.data.length - 1 | 0;
};
function jl_StackTraceElement() {
    let a = this; jl_Object.call(a);
    a.$declaringClass = null;
    a.$methodName0 = null;
    a.$fileName = null;
    a.$lineNumber = 0;
}
let jl_StackTraceElement__init_ = ($this, $declaringClass, $methodName, $fileName, $lineNumber) => {
    jl_Object__init_($this);
    if ($declaringClass !== null && $methodName !== null) {
        $this.$declaringClass = $declaringClass;
        $this.$methodName0 = $methodName;
        $this.$fileName = $fileName;
        $this.$lineNumber = $lineNumber;
        return;
    }
    $rt_throw(jl_NullPointerException__init_0());
},
jl_StackTraceElement__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jl_StackTraceElement();
    jl_StackTraceElement__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jl_StackTraceElement_getClassName = $this => {
    return $this.$declaringClass;
},
jl_StackTraceElement_getMethodName = $this => {
    return $this.$methodName0;
},
jl_StackTraceElement_equals = ($this, $obj) => {
    let $other, var$3, var$4, var$5;
    if ($this === $obj)
        return 1;
    if (!($obj instanceof jl_StackTraceElement))
        return 0;
    a: {
        $other = $rt_castToClass($obj, jl_StackTraceElement);
        var$3 = $this.$declaringClass;
        $other = $rt_nullCheck($other);
        if (ju_Objects_equals(var$3, $other.$declaringClass)) {
            var$3 = $this.$methodName0;
            var$4 = $other.$methodName0;
            if (ju_Objects_equals(var$3, var$4)) {
                var$3 = $this.$fileName;
                var$4 = $other.$fileName;
                if (ju_Objects_equals(var$3, var$4) && $this.$lineNumber == $other.$lineNumber) {
                    var$5 = 1;
                    break a;
                }
            }
        }
        var$5 = 0;
    }
    return var$5;
},
jl_StackTraceElement_toString = $this => {
    let $sb, $index;
    $sb = jl_StringBuilder__init_();
    $index = $rt_nullCheck($this.$declaringClass).$lastIndexOf1(46);
    $rt_nullCheck($rt_nullCheck($rt_nullCheck($sb.$append3($rt_nullCheck($this.$declaringClass).$substring0($index + 1 | 0))).$append0(46)).$append3($this.$methodName0)).$append0(40);
    if ($this.$fileName === null)
        $sb.$append3($rt_s(272));
    else
        $rt_nullCheck($rt_nullCheck($sb.$append3($this.$fileName)).$append0(58)).$append4($this.$lineNumber);
    $sb.$append3($rt_s(273));
    return $sb.$toString();
};
function uciisdp_Organization() {
    let a = this; csw_Message.call(a);
    a.$name9 = null;
    a.$primaryDepartment0 = null;
}
let uciisdp_Organization_ADAPTER = null,
uciisdp_Organization_$callClinit = () => {
    uciisdp_Organization_$callClinit = $rt_eraseClinit(uciisdp_Organization);
    uciisdp_Organization__clinit_();
},
uciisdp_Organization__init_ = ($this, $name, $primaryDepartment, $unknownFields) => {
    uciisdp_Organization_$callClinit();
    csw_Message__init_($this, uciisdp_Organization_ADAPTER, $unknownFields);
    if ($name !== null) {
        $this.$name9 = $name;
        $this.$primaryDepartment0 = $primaryDepartment;
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(274)));
},
uciisdp_Organization__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new uciisdp_Organization();
    uciisdp_Organization__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
uciisdp_Organization__clinit_ = () => {
    uciisdp_Organization_ADAPTER = uciisdp_Organization$ProtoAdapter_Organization__init_0();
},
o_Segment$Companion = $rt_classWithoutFields(),
o_Segment$Companion__init_ = $this => {
    jl_Object__init_($this);
},
o_Segment$Companion__init_2 = () => {
    let var_0 = new o_Segment$Companion();
    o_Segment$Companion__init_(var_0);
    return var_0;
},
o_Segment$Companion__init_0 = ($this, $$constructor_marker) => {
    o_Segment$Companion__init_($this);
},
o_Segment$Companion__init_1 = var_0 => {
    let var_1 = new o_Segment$Companion();
    o_Segment$Companion__init_0(var_1, var_0);
    return var_1;
};
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value1 = null;
}
let ju_MapEntry__init_ = ($this, $theKey, $theValue) => {
    jl_Object__init_($this);
    $this.$key = $theKey;
    $this.$value1 = $theValue;
},
ju_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_MapEntry();
    ju_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
},
ju_MapEntry_getKey = $this => {
    return $this.$key;
},
ju_MapEntry_getValue = $this => {
    return $this.$value1;
};
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next3 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    ju_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_LinkedHashMap$LinkedHashMapEntry() {
    let a = this; ju_HashMap$HashEntry.call(a);
    a.$chainForward = null;
    a.$chainBackward = null;
}
let ju_LinkedHashMap$LinkedHashMapEntry__init_ = ($this, $theKey, $hash) => {
    ju_HashMap$HashEntry__init_($this, $theKey, $hash);
    $this.$chainForward = null;
    $this.$chainBackward = null;
},
ju_LinkedHashMap$LinkedHashMapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_LinkedHashMap$LinkedHashMapEntry();
    ju_LinkedHashMap$LinkedHashMapEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ucics_RpcClient() {
    let a = this; jl_Object.call(a);
    a.$transport = null;
    a.$replyTo1 = null;
    a.$serializer = null;
    a.$pendingRequests = null;
    a.$pendingStreams = null;
}
let ucics_RpcClient__init_0 = ($this, $transport) => {
    ucics_RpcClient__init_($this, $transport, null);
},
ucics_RpcClient__init_1 = var_0 => {
    let var_1 = new ucics_RpcClient();
    ucics_RpcClient__init_0(var_1, var_0);
    return var_1;
},
ucics_RpcClient__init_ = ($this, $transport, $replyTo) => {
    let var$3, var$4;
    jl_Object__init_($this);
    $this.$serializer = ucitrcs_ProtobufSerializer__init_0();
    $this.$pendingRequests = juc_ConcurrentHashMap__init_();
    $this.$pendingStreams = juc_ConcurrentHashMap__init_();
    $this.$transport = $transport;
    $this.$replyTo1 = $replyTo;
    var$3 = $this.$transport;
    var$4 = ucics_RpcClient$_init_$lambda$_1_0__init_0($this);
    $rt_nullCheck(var$3).$addMessageHandler(var$4);
},
ucics_RpcClient__init_2 = (var_0, var_1) => {
    let var_2 = new ucics_RpcClient();
    ucics_RpcClient__init_(var_2, var_0, var_1);
    return var_2;
},
ucics_RpcClient_registerCodec = ($this, $type, $codec) => {
    $rt_nullCheck($this.$serializer).$register($type, $codec);
},
ucics_RpcClient_handleIncomingBytes = ($this, $data) => {
    let $packet, var$3, $future, $stream, $errorMsg, $e, $$je;
    a: {
        try {
            ucicsp_RpcPacket_$callClinit();
            $packet = $rt_castToClass(csw_ProtoAdapter_decode($rt_nullCheck(ucicsp_RpcPacket_ADAPTER), $data), ucicsp_RpcPacket);
            $packet = $rt_nullCheck($packet);
            var$3 = $packet.$type0;
            ucicsp_RpcPacket$Type_$callClinit();
            if (var$3 === ucicsp_RpcPacket$Type_RESPONSE) {
                $future = $rt_castToClass($rt_nullCheck($this.$pendingRequests).$remove($packet.$requestId0), ucics_RpcClient$RpcResponseFuture);
                if ($future !== null)
                    $future.$complete($rt_nullCheck($packet.$payload0).$toByteArray());
            } else if ($packet.$type0 !== ucicsp_RpcPacket$Type_STREAM_ERROR) {
                if ($packet.$type0 === ucicsp_RpcPacket$Type_STREAM_DATA) {
                    $stream = $rt_castToClass($rt_nullCheck($this.$pendingStreams).$get2($packet.$requestId0), ucics_RpcClient$AsyncStreamResultImpl);
                    if ($stream !== null)
                        $stream.$onNextBytes($rt_nullCheck($packet.$payload0).$toByteArray());
                } else if ($packet.$type0 === ucicsp_RpcPacket$Type_STREAM_COMPLETE) {
                    $stream = $rt_castToClass($rt_nullCheck($this.$pendingStreams).$remove($packet.$requestId0), ucics_RpcClient$AsyncStreamResultImpl);
                    if ($stream !== null)
                        $stream.$onComplete();
                }
            } else {
                $future = $rt_castToClass($rt_nullCheck($this.$pendingRequests).$remove($packet.$requestId0), ucics_RpcClient$RpcResponseFuture);
                if ($future !== null) {
                    $errorMsg = $rt_nullCheck($packet.$payload0).$utf8();
                    $future.$completeExceptionally(jl_RuntimeException__init_1($errorMsg));
                }
                $stream = $rt_castToClass($rt_nullCheck($this.$pendingStreams).$get2($packet.$requestId0), ucics_RpcClient$AsyncStreamResultImpl);
                if ($stream !== null) {
                    $stream.$onError(jl_RuntimeException__init_1($rt_nullCheck($packet.$payload0).$utf8()));
                    $rt_nullCheck($this.$pendingStreams).$remove($packet.$requestId0);
                }
            }
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_Exception) {
                $e = $$je;
            } else {
                throw $$e;
            }
        }
        $e.$printStackTrace1();
    }
},
ucics_RpcClient_invokeStub = ($this, $serviceId, $methodId, $args) => {
    let var$4, $requestDto, $payload, $requestId, var$8, var$9, $packet, $future;
    $args = $rt_nullCheck($args);
    var$4 = $args.data;
    $requestDto = var$4[$rt_checkUpperBound(0, var$4)];
    $payload = $rt_nullCheck($this.$serializer).$encode19($requestDto);
    $requestId = $rt_nullCheck(ju_UUID_randomUUID()).$toString();
    var$8 = ucicsp_RpcPacket$Builder__init_();
    var$8 = ucicsp_RpcPacket$Builder_serviceId(var$8, $serviceId);
    var$8 = ucicsp_RpcPacket$Builder_methodName($rt_nullCheck(var$8), $methodId);
    var$8 = ucicsp_RpcPacket$Builder_requestId($rt_nullCheck(var$8), $requestId);
    var$8 = ucicsp_RpcPacket$Builder_payload($rt_nullCheck(var$8), o_ByteString_of($payload));
    var$9 = $this.$replyTo1 === null ? $rt_s(6) : $this.$replyTo1;
    var$8 = ucicsp_RpcPacket$Builder_replyTo($rt_nullCheck(var$8), var$9);
    ucicsp_RpcPacket$Type_$callClinit();
    var$9 = ucicsp_RpcPacket$Type_REQUEST;
    var$8 = ucicsp_RpcPacket$Builder_type($rt_nullCheck(var$8), var$9);
    $packet = ucicsp_RpcPacket$Builder_build($rt_nullCheck(var$8));
    $future = ucics_RpcClient$RpcResponseFuture__init_0();
    $rt_nullCheck($this.$pendingRequests).$put3($requestId, $future);
    var$8 = $this.$transport;
    ucicsp_RpcPacket_$callClinit();
    var$4 = csw_ProtoAdapter_encode($rt_nullCheck(ucicsp_RpcPacket_ADAPTER), $packet);
    $rt_nullCheck(var$8).$send(var$4);
    return $future;
},
jl_ArrayIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException),
jl_ArrayIndexOutOfBoundsException__init_ = $this => {
    jl_IndexOutOfBoundsException__init_1($this);
},
jl_ArrayIndexOutOfBoundsException__init_1 = () => {
    let var_0 = new jl_ArrayIndexOutOfBoundsException();
    jl_ArrayIndexOutOfBoundsException__init_(var_0);
    return var_0;
},
jl_ArrayIndexOutOfBoundsException__init_0 = ($this, $message) => {
    jl_IndexOutOfBoundsException__init_($this, $message);
},
jl_ArrayIndexOutOfBoundsException__init_2 = var_0 => {
    let var_1 = new jl_ArrayIndexOutOfBoundsException();
    jl_ArrayIndexOutOfBoundsException__init_0(var_1, var_0);
    return var_1;
},
o__JvmPlatformKt = $rt_classWithoutFields(),
o__JvmPlatformKt_toUtf8String = $$this$toUtf8String => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($$this$toUtf8String, $rt_s(29));
    var$2 = new jl_String;
    kt_Charsets_$callClinit();
    jl_String__init_(var$2, $$this$toUtf8String, kt_Charsets_UTF_8);
    return var$2;
},
o__JvmPlatformKt_asUtf8ToByteArray = $$this$asUtf8ToByteArray => {
    let var$2, var$3;
    kji_Intrinsics_checkNotNullParameter($$this$asUtf8ToByteArray, $rt_s(29));
    kt_Charsets_$callClinit();
    var$2 = kt_Charsets_UTF_8;
    $$this$asUtf8ToByteArray = $rt_nullCheck($$this$asUtf8ToByteArray);
    var$3 = $$this$asUtf8ToByteArray.$getBytes(var$2);
    kji_Intrinsics_checkNotNullExpressionValue(var$3, $rt_s(275));
    return var$3;
};
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount2 = 0;
    a.$size3 = 0;
    a.$removeIndex = 0;
    a.$this$00 = null;
}
let ju_AbstractList$1__init_ = ($this, $this$0) => {
    $this.$this$00 = $this$0;
    jl_Object__init_($this);
    $this.$modCount2 = $rt_nullCheck($this.$this$00).$modCount0;
    $this.$size3 = $rt_nullCheck($this.$this$00).$size();
    $this.$removeIndex = (-1);
},
ju_AbstractList$1__init_0 = var_0 => {
    let var_1 = new ju_AbstractList$1();
    ju_AbstractList$1__init_(var_1, var_0);
    return var_1;
},
ju_AbstractList$1_hasNext = $this => {
    return $this.$index >= $this.$size3 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2;
    ju_AbstractList$1_checkConcurrentModification($this);
    $this.$removeIndex = $this.$index;
    var$1 = $this.$this$00;
    var$2 = $this.$index;
    $this.$index = var$2 + 1 | 0;
    return $rt_nullCheck(var$1).$get1(var$2);
},
ju_AbstractList$1_checkConcurrentModification = $this => {
    if ($this.$modCount2 >= $rt_nullCheck($this.$this$00).$modCount0)
        return;
    $rt_throw(ju_ConcurrentModificationException__init_());
},
uciisd_EmployeeCodec = $rt_classWithoutFields(),
uciisd_EmployeeCodec__init_ = $this => {
    jl_Object__init_($this);
},
uciisd_EmployeeCodec__init_0 = () => {
    let var_0 = new uciisd_EmployeeCodec();
    uciisd_EmployeeCodec__init_(var_0);
    return var_0;
},
uciisd_EmployeeCodec_toWire = ($this, $pojo) => {
    let var$2, var$3;
    if ($pojo === null)
        return null;
    var$2 = uciisdp_Employee$Builder__init_0();
    var$2 = uciisdp_Employee$Builder_name(var$2, $pojo.$getName());
    var$3 = uciisd_AddressCodec__init_0();
    var$3 = var$3.$toWire2($pojo.$getAddress());
    var$2 = uciisdp_Employee$Builder_address($rt_nullCheck(var$2), var$3);
    var$3 = ju_Arrays_asList($pojo.$getTags());
    var$2 = uciisdp_Employee$Builder_tags($rt_nullCheck(var$2), var$3);
    var$2 = uciisdp_Employee$Builder_build($rt_nullCheck(var$2));
    return var$2;
},
uciisd_EmployeeCodec_getWireAdapter = $this => {
    uciisdp_Employee_$callClinit();
    return uciisdp_Employee_ADAPTER;
},
uciisd_EmployeeCodec_toWire0 = ($this, var$1) => {
    return $this.$toWire3($rt_castToClass(var$1, uciisd_Employee));
},
otjc_Crypto = $rt_classWithoutFields(),
kr_OpenEndRange = $rt_classWithoutFields(0),
kr_IntProgression$Companion = $rt_classWithoutFields(),
kr_IntProgression$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
kr_IntProgression$Companion__init_2 = () => {
    let var_0 = new kr_IntProgression$Companion();
    kr_IntProgression$Companion__init_0(var_0);
    return var_0;
},
kr_IntProgression$Companion_fromClosedRange = ($this, $rangeStart, $rangeEnd, $step) => {
    return kr_IntProgression__init_0($rangeStart, $rangeEnd, $step);
},
kr_IntProgression$Companion__init_ = ($this, $$constructor_marker) => {
    kr_IntProgression$Companion__init_0($this);
},
kr_IntProgression$Companion__init_1 = var_0 => {
    let var_1 = new kr_IntProgression$Companion();
    kr_IntProgression$Companion__init_(var_1, var_0);
    return var_1;
};
function jus_CollectorImpl() {
    let a = this; jl_Object.call(a);
    a.$supplier = null;
    a.$accumulator = null;
    a.$combiner = null;
    a.$finisher = null;
    a.$characteristics = null;
}
let jus_CollectorImpl__init_ = ($this, $supplier, $accumulator, $combiner, $finisher, $characteristics) => {
    jl_Object__init_($this);
    $this.$supplier = $supplier;
    $this.$accumulator = $accumulator;
    $this.$combiner = $combiner;
    $this.$finisher = $finisher;
    $this.$characteristics = $characteristics;
},
jus_CollectorImpl__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jus_CollectorImpl();
    jus_CollectorImpl__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
otjb_Navigator = $rt_classWithoutFields(),
otpp_ResourceAccessor = $rt_classWithoutFields(),
jnci_UTF8Decoder = $rt_classWithoutFields(jnci_BufferedDecoder),
jnci_UTF8Decoder__init_ = ($this, $cs) => {
    jnci_BufferedDecoder__init_($this, $cs, 0.3333333432674408, 0.5);
},
jnci_UTF8Decoder__init_0 = var_0 => {
    let var_1 = new jnci_UTF8Decoder();
    jnci_UTF8Decoder__init_(var_1, var_0);
    return var_1;
},
jnci_UTF8Decoder_arrayDecode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $b, var$12, var$13, $b2, var$15, $b3, $c, $b4, $code;
    $result = null;
    a: {
        b: {
            c: {
                while ($inPos < $inSize) {
                    if ($outPos >= $outSize)
                        break a;
                    var$9 = $inPos + 1 | 0;
                    $inArray = $rt_nullCheck($inArray);
                    var$10 = $inArray.data;
                    $b = var$10[$rt_checkBounds($inPos, var$10)] & 255;
                    if (!($b & 128)) {
                        var$12 = $outPos + 1 | 0;
                        var$13 = $b & 65535;
                        $outArray = $rt_nullCheck($outArray);
                        var$10 = $outArray.data;
                        var$10[$rt_checkBounds($outPos, var$10)] = var$13;
                    } else if (($b & 224) == 192) {
                        if (var$9 >= $inSize) {
                            $inPos = var$9 + (-1) | 0;
                            $controller = $rt_nullCheck($controller);
                            if ($controller.$hasMoreInput(2))
                                break a;
                            jnc_CoderResult_$callClinit();
                            $result = jnc_CoderResult_UNDERFLOW;
                            break a;
                        }
                        var$13 = var$9 + 1 | 0;
                        $b2 = var$10[$rt_checkBounds(var$9, var$10)];
                        if (!jnci_UTF8Decoder_checkMidByte($this, $b2)) {
                            $inPos = var$13 + (-2) | 0;
                            $result = jnc_CoderResult_malformedForLength(1);
                            break a;
                        }
                        var$12 = $outPos + 1 | 0;
                        var$15 = (($b & 31) << 6 | $b2 & 63) & 65535;
                        $outArray = $rt_nullCheck($outArray);
                        var$10 = $outArray.data;
                        var$10[$rt_checkBounds($outPos, var$10)] = var$15;
                        var$9 = var$13;
                    } else if (($b & 240) == 224) {
                        if ((var$9 + 2 | 0) > $inSize) {
                            $inPos = var$9 + (-1) | 0;
                            $controller = $rt_nullCheck($controller);
                            if ($controller.$hasMoreInput(3))
                                break a;
                            jnc_CoderResult_$callClinit();
                            $result = jnc_CoderResult_UNDERFLOW;
                            break a;
                        }
                        var$13 = var$9 + 1 | 0;
                        $b2 = var$10[$rt_checkBounds(var$9, var$10)];
                        var$9 = var$13 + 1 | 0;
                        $b3 = var$10[$rt_checkBounds(var$13, var$10)];
                        if (!jnci_UTF8Decoder_checkMidByte($this, $b2))
                            break b;
                        if (!jnci_UTF8Decoder_checkMidByte($this, $b3))
                            break b;
                        $c = (($b & 15) << 12 | ($b2 & 63) << 6 | $b3 & 63) & 65535;
                        if (jl_Character_isSurrogate($c)) {
                            $inPos = var$9 + (-3) | 0;
                            $result = jnc_CoderResult_malformedForLength(3);
                            break a;
                        }
                        var$12 = $outPos + 1 | 0;
                        $outArray = $rt_nullCheck($outArray);
                        var$10 = $outArray.data;
                        var$10[$rt_checkBounds($outPos, var$10)] = $c;
                    } else {
                        if (($b & 248) != 240) {
                            $inPos = var$9 + (-1) | 0;
                            $result = jnc_CoderResult_malformedForLength(1);
                            break a;
                        }
                        if ((var$9 + 3 | 0) > $inSize) {
                            $inPos = var$9 + (-1) | 0;
                            $controller = $rt_nullCheck($controller);
                            if ($controller.$hasMoreInput(4))
                                break a;
                            jnc_CoderResult_$callClinit();
                            $result = jnc_CoderResult_UNDERFLOW;
                            break a;
                        }
                        if (($outPos + 2 | 0) > $outSize) {
                            $inPos = var$9 + (-1) | 0;
                            $controller = $rt_nullCheck($controller);
                            if ($controller.$hasMoreOutput0(2))
                                break a;
                            jnc_CoderResult_$callClinit();
                            $result = jnc_CoderResult_OVERFLOW;
                            break a;
                        }
                        var$13 = var$9 + 1 | 0;
                        $b2 = var$10[$rt_checkBounds(var$9, var$10)];
                        var$15 = var$13 + 1 | 0;
                        $b3 = var$10[$rt_checkBounds(var$13, var$10)];
                        var$9 = var$15 + 1 | 0;
                        $b4 = var$10[$rt_checkBounds(var$15, var$10)];
                        if (!jnci_UTF8Decoder_checkMidByte($this, $b2))
                            break c;
                        if (!jnci_UTF8Decoder_checkMidByte($this, $b3))
                            break c;
                        if (!jnci_UTF8Decoder_checkMidByte($this, $b4))
                            break c;
                        $code = ($b & 7) << 18 | ($b2 & 63) << 12 | ($b3 & 63) << 6 | $b4 & 63;
                        var$15 = $outPos + 1 | 0;
                        var$12 = jl_Character_highSurrogate($code);
                        $outArray = $rt_nullCheck($outArray);
                        var$10 = $outArray.data;
                        var$10[$rt_checkBounds($outPos, var$10)] = var$12;
                        var$12 = var$15 + 1 | 0;
                        var$10[$rt_checkBounds(var$15, var$10)] = jl_Character_lowSurrogate($code);
                    }
                    $inPos = var$9;
                    $outPos = var$12;
                }
                break a;
            }
            $inPos = var$9 + (-3) | 0;
            $result = jnc_CoderResult_malformedForLength(1);
            break a;
        }
        $inPos = var$9 + (-3) | 0;
        $result = jnc_CoderResult_malformedForLength(1);
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
},
jnci_UTF8Decoder_checkMidByte = ($this, $b) => {
    return ($b & 192) != 128 ? 0 : 1;
},
ucicsp_RpcPacket$ProtoAdapter_RpcPacket = $rt_classWithoutFields(csw_ProtoAdapter),
ucicsp_RpcPacket$ProtoAdapter_RpcPacket__init_ = $this => {
    let var$1;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_1($this, var$1, $rt_cls(ucicsp_RpcPacket), $rt_s(276), csw_Syntax_PROTO_3, null, $rt_s(277));
},
ucicsp_RpcPacket$ProtoAdapter_RpcPacket__init_0 = () => {
    let var_0 = new ucicsp_RpcPacket$ProtoAdapter_RpcPacket();
    ucicsp_RpcPacket$ProtoAdapter_RpcPacket__init_(var_0);
    return var_0;
},
ucicsp_RpcPacket$ProtoAdapter_RpcPacket_encode = ($this, $writer, $value) => {
    let var$3;
    $value = $rt_nullCheck($value);
    var$3 = csw_Message_unknownFields($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, var$3);
    var$3 = $value.$payload0;
    o_ByteString_$callClinit();
    if (!ju_Objects_equals(var$3, o_ByteString_EMPTY)) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_BYTES).$encodeWithTag0($writer, 6, $value.$payload0);
    }
    if (!ju_Objects_equals($value.$replyTo2, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 5, $value.$replyTo2);
    }
    if (!ju_Objects_equals($value.$requestId0, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 4, $value.$requestId0);
    }
    if (!ju_Objects_equals($value.$methodName2, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 3, $value.$methodName2);
    }
    if (!ju_Objects_equals($value.$serviceId1, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 2, $value.$serviceId1);
    }
    var$3 = $value.$type0;
    ucicsp_RpcPacket$Type_$callClinit();
    if (!ju_Objects_equals(var$3, ucicsp_RpcPacket$Type_REQUEST))
        $rt_nullCheck(ucicsp_RpcPacket$Type_ADAPTER).$encodeWithTag0($writer, 1, $value.$type0);
},
ucicsp_RpcPacket$ProtoAdapter_RpcPacket_decode = ($this, $reader) => {
    let $builder, $token, var$4, $e, $$je;
    $builder = ucicsp_RpcPacket$Builder__init_();
    $reader = $rt_nullCheck($reader);
    $token = csw_ProtoReader_beginMessage($reader);
    a: while (true) {
        var$4 = csw_ProtoReader_nextTag($reader);
        if (var$4 == (-1))
            break;
        switch (var$4) {
            case 1:
                try {
                    ucicsp_RpcPacket$Type_$callClinit();
                    ucicsp_RpcPacket$Builder_type($builder, $rt_castToClass($rt_nullCheck(ucicsp_RpcPacket$Type_ADAPTER).$decode0($reader), ucicsp_RpcPacket$Type));
                    continue a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof csw_ProtoAdapter$EnumConstantNotFoundException) {
                        $e = $$je;
                    } else {
                        throw $$e;
                    }
                }
                csw_FieldEncoding_$callClinit();
                csw_Message$Builder_addUnknownField($builder, var$4, csw_FieldEncoding_VARINT, jl_Long_valueOf(Long_fromInt($e.$value10)));
                continue a;
            case 2:
                csw_ProtoAdapter_$callClinit();
                ucicsp_RpcPacket$Builder_serviceId($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_STRING).$decode0($reader), jl_String));
                continue a;
            case 3:
                csw_ProtoAdapter_$callClinit();
                ucicsp_RpcPacket$Builder_methodName($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_STRING).$decode0($reader), jl_String));
                continue a;
            case 4:
                csw_ProtoAdapter_$callClinit();
                ucicsp_RpcPacket$Builder_requestId($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_STRING).$decode0($reader), jl_String));
                continue a;
            case 5:
                csw_ProtoAdapter_$callClinit();
                ucicsp_RpcPacket$Builder_replyTo($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_STRING).$decode0($reader), jl_String));
                continue a;
            case 6:
                csw_ProtoAdapter_$callClinit();
                ucicsp_RpcPacket$Builder_payload($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_BYTES).$decode0($reader), o_ByteString));
                continue a;
            default:
        }
        csw_ProtoReader_readUnknownField($reader, var$4);
    }
    csw_Message$Builder_addUnknownFields($builder, csw_ProtoReader_endMessageAndGetUnknownFields($reader, $token));
    return ucicsp_RpcPacket$Builder_build($builder);
},
ucicsp_RpcPacket$ProtoAdapter_RpcPacket_decode0 = ($this, var$1) => {
    return ucicsp_RpcPacket$ProtoAdapter_RpcPacket_decode($this, var$1);
},
ucicsp_RpcPacket$ProtoAdapter_RpcPacket_encode0 = ($this, var$1, var$2) => {
    ucicsp_RpcPacket$ProtoAdapter_RpcPacket_encode($this, var$1, $rt_castToClass(var$2, ucicsp_RpcPacket));
};
function jnci_BufferedDecoder$Controller() {
    let a = this; jl_Object.call(a);
    a.$in = null;
    a.$out1 = null;
    a.$inPosition0 = 0;
    a.$outPosition = 0;
}
let jnci_BufferedDecoder$Controller__init_ = ($this, $in, $out) => {
    jl_Object__init_($this);
    $this.$in = $in;
    $this.$out1 = $out;
},
jnci_BufferedDecoder$Controller__init_0 = (var_0, var_1) => {
    let var_2 = new jnci_BufferedDecoder$Controller();
    jnci_BufferedDecoder$Controller__init_(var_2, var_0, var_1);
    return var_2;
},
jnci_BufferedDecoder$Controller_hasMoreInput = $this => {
    return jn_Buffer_hasRemaining($rt_nullCheck($this.$in));
},
jnci_BufferedDecoder$Controller_hasMoreInput0 = ($this, $sz) => {
    return jn_Buffer_remaining($rt_nullCheck($this.$in)) < $sz ? 0 : 1;
},
jnci_BufferedDecoder$Controller_hasMoreOutput = ($this, $sz) => {
    return jn_Buffer_remaining($rt_nullCheck($this.$out1)) < $sz ? 0 : 1;
},
jnci_BufferedDecoder$Controller_setInPosition = ($this, $inPosition) => {
    $this.$inPosition0 = $inPosition;
},
jnci_BufferedDecoder$Controller_setOutPosition = ($this, $outPosition) => {
    $this.$outPosition = $outPosition;
},
jl_InstantiationException = $rt_classWithoutFields(jl_ReflectiveOperationException),
jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0),
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
jl_DefaultUncaughtExceptionHandler__init_ = $this => {
    jl_Object__init_($this);
},
jl_DefaultUncaughtExceptionHandler__init_0 = () => {
    let var_0 = new jl_DefaultUncaughtExceptionHandler();
    jl_DefaultUncaughtExceptionHandler__init_(var_0);
    return var_0;
},
csw_ProtoAdapterKt$commonBool$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonBool$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Boolean_valueOf(0);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonBool$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonBool$1();
    csw_ProtoAdapterKt$commonBool$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonBool$1_encode = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    var$3 = !$value ? 0 : 1;
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint32($writer, var$3);
},
csw_ProtoAdapterKt$commonBool$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonBool$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Boolean)).$booleanValue());
},
ucii_TeaVMWebWorkerTest = $rt_classWithoutFields(),
ucii_TeaVMWebWorkerTest__init_ = $this => {
    jl_Object__init_($this);
},
ucii_TeaVMWebWorkerTest__init_0 = () => {
    let var_0 = new ucii_TeaVMWebWorkerTest();
    ucii_TeaVMWebWorkerTest__init_(var_0);
    return var_0;
},
ucii_TeaVMWebWorkerTest_testWorkerRpcSerialization = $this => {
    let $worker, $transport, $client, $stub, $data, $lastMessage;
    $worker = ucii_TeaVMWebWorkerTest_createFakeWorker$js_body$_3();
    $transport = ucitrt_WebWorkerTransport__init_0($worker);
    $client = ucics_RpcClient__init_1($transport);
    $stub = uciis_MyDataService_Stub__init_0($client);
    $data = uciisd_MyData__init_();
    $data.$setContent($rt_s(278));
    $stub.$processData($data);
    $lastMessage = $worker.getLastMessage();
    oj_Assert_assertNotNull0($rt_s(279), otji_JSWrapper_wrap($lastMessage));
    $rt_nullCheck(jl_System_out()).$println1($rt_s(280));
},
ucii_TeaVMWebWorkerTest_testCodecEncodingDecoding = $this => {
    let $original, $codec, $wireMsg, $encoded, $decodedWire, $decoded, var$7, $e, $$je;
    $original = uciisd_MyData__init_();
    $original.$setId($rt_s(281));
    $original.$setContent($rt_s(282));
    $original.$setValue(123);
    $codec = uciisd_MyDataCodec__init_0();
    $wireMsg = $codec.$toWire4($original);
    oj_Assert_assertNotNull($wireMsg);
    $encoded = csw_ProtoAdapter_encode($rt_nullCheck($codec.$getWireAdapter()), $wireMsg);
    oj_Assert_assertNotNull($encoded);
    a: {
        try {
            $decodedWire = $rt_castToClass(csw_ProtoAdapter_decode($rt_nullCheck($codec.$getWireAdapter()), $encoded), uciisdp_MyData);
            $decoded = $codec.$fromWire($decodedWire);
            var$7 = $original.$getId0();
            $decoded = $rt_nullCheck($decoded);
            oj_Assert_assertEquals(var$7, $decoded.$getId0());
            oj_Assert_assertEquals($original.$getContent(), $decoded.$getContent());
            oj_Assert_assertEquals1(Long_fromInt($original.$getValue0()), Long_fromInt($decoded.$getValue0()));
            $rt_nullCheck(jl_System_out()).$println1($rt_s(283));
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof ji_IOException) {
                $e = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return;
    }
    $rt_throw(jl_RuntimeException__init_3($e));
},
ucii_TeaVMWebWorkerTest_createFakeWorker$js_body$_3 = () => {
    return { lastMessage : null, postMessage : function(msg) {
        this.lastMessage = msg;
    }, getLastMessage : function() {
        return this.lastMessage;
    } };
},
juc_ConcurrentMap = $rt_classWithoutFields(0);
function juc_ConcurrentHashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount0 = 0;
    a.$elementData0 = null;
    a.$modCount1 = 0;
    a.$loadFactor = 0.0;
    a.$threshold0 = 0;
}
let juc_ConcurrentHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(juc_ConcurrentHashMap$HashEntry, $s);
},
juc_ConcurrentHashMap__init_2 = $this => {
    juc_ConcurrentHashMap__init_1($this, 16);
},
juc_ConcurrentHashMap__init_ = () => {
    let var_0 = new juc_ConcurrentHashMap();
    juc_ConcurrentHashMap__init_2(var_0);
    return var_0;
},
juc_ConcurrentHashMap__init_1 = ($this, $capacity) => {
    juc_ConcurrentHashMap__init_0($this, $capacity, 0.75);
},
juc_ConcurrentHashMap__init_3 = var_0 => {
    let var_1 = new juc_ConcurrentHashMap();
    juc_ConcurrentHashMap__init_1(var_1, var_0);
    return var_1;
},
juc_ConcurrentHashMap_calculateCapacity = $x => {
    let var$2, var$3;
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
},
juc_ConcurrentHashMap__init_0 = ($this, $capacity, $loadFactor) => {
    let var$3;
    ju_AbstractMap__init_($this);
    if ($capacity >= 0 && $loadFactor > 0.0) {
        var$3 = juc_ConcurrentHashMap_calculateCapacity($capacity);
        $this.$elementCount0 = 0;
        $this.$elementData0 = $this.$newElementArray0(var$3);
        $this.$loadFactor = $loadFactor;
        juc_ConcurrentHashMap_computeThreshold($this);
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_0());
},
juc_ConcurrentHashMap__init_4 = (var_0, var_1) => {
    let var_2 = new juc_ConcurrentHashMap();
    juc_ConcurrentHashMap__init_0(var_2, var_0, var_1);
    return var_2;
},
juc_ConcurrentHashMap_computeThreshold = $this => {
    $this.$threshold0 = $rt_nullCheck($this.$elementData0).data.length * $this.$loadFactor | 0;
},
juc_ConcurrentHashMap_get = ($this, $key) => {
    let $m;
    $m = juc_ConcurrentHashMap_getEntry0($this, $key);
    if ($m === null)
        return null;
    return $m.$value4;
},
juc_ConcurrentHashMap_getEntry0 = ($this, $key) => {
    return juc_ConcurrentHashMap_getEntry($this, $key, ju_Objects_hashCode($key));
},
juc_ConcurrentHashMap_getEntry = ($this, $key, $hash) => {
    let $table, var$4, $index, $first, $m, $equal;
    if ($key === null)
        return juc_ConcurrentHashMap_findNullKeyEntry($this);
    a: while (true) {
        $table = $this.$elementData0;
        $table = $rt_nullCheck($table);
        var$4 = $table.data;
        $index = $hash & (var$4.length - 1 | 0);
        b: while (true) {
            $index = $rt_checkBounds($index, var$4);
            $first = var$4[$index];
            if ($first === null)
                return null;
            $m = $first;
            c: {
                while (true) {
                    if ($m === null)
                        break c;
                    if (!$m.$removed && $m.$origKeyHash0 == $hash) {
                        $equal = juc_ConcurrentHashMap_areEqualKeys($key, $m.$key0);
                        if ($table !== $this.$elementData0)
                            break b;
                        if ($equal)
                            break;
                    }
                    $m = $m.$next4;
                }
                if (!$m.$removed)
                    break a;
                continue b;
            }
            if ($first === var$4[$index])
                return null;
        }
    }
    return $m;
},
juc_ConcurrentHashMap_findNullKeyEntry = $this => {
    let var$1, $m;
    var$1 = $rt_nullCheck($this.$elementData0).data;
    $m = var$1[$rt_checkUpperBound(0, var$1)];
    a: {
        while ($m !== null) {
            if ($m.$key0 === null)
                break a;
            $m = $m.$next4;
        }
    }
    return $m;
},
juc_ConcurrentHashMap_put = ($this, $key, $value) => {
    return juc_ConcurrentHashMap_putImpl($this, $key, $value);
},
juc_ConcurrentHashMap_putImpl = ($this, $key, $value) => {
    let $hash, $entry, $index, var$6, $result;
    $hash = ju_Objects_hashCode($key);
    $entry = juc_ConcurrentHashMap_getEntry($this, $key, $hash);
    $index = juc_ConcurrentHashMap_computeIndex($this, $hash);
    if ($entry === null)
        $entry = juc_ConcurrentHashMap_placeHashedEntry($this, $key, $index, $hash);
    var$6 = $rt_nullCheck($entry);
    $result = var$6.$value4;
    var$6.$value4 = $value;
    return $result;
},
juc_ConcurrentHashMap_placeHashedEntry = ($this, $key, $index, $hash) => {
    let $entry, var$5;
    $entry = juc_ConcurrentHashMap_createHashedEntry($this, $key, $index, $hash);
    $this.$modCount1 = $this.$modCount1 + 1 | 0;
    var$5 = $this.$elementCount0 + 1 | 0;
    $this.$elementCount0 = var$5;
    if (var$5 > $this.$threshold0)
        juc_ConcurrentHashMap_rehash($this);
    return $entry;
},
juc_ConcurrentHashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry, var$5;
    $entry = juc_ConcurrentHashMap$HashEntry__init_0($key, $hash);
    var$5 = $rt_nullCheck($this.$elementData0).data;
    $index = $rt_checkBounds($index, var$5);
    $entry.$next4 = var$5[$index];
    var$5 = $rt_nullCheck($this.$elementData0).data;
    $index = $rt_checkUpperBound($index, var$5);
    var$5[$index] = $entry;
    return $entry;
},
juc_ConcurrentHashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, var$5, $entry, var$7, $index, $next;
    $length = juc_ConcurrentHashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray0($length);
    $i = 0;
    while ($i < $rt_nullCheck($this.$elementData0).data.length) {
        var$5 = $rt_nullCheck($this.$elementData0).data;
        $i = $rt_checkBounds($i, var$5);
        $entry = var$5[$i];
        var$5 = $this.$elementData0;
        var$7 = null;
        var$5 = $rt_nullCheck(var$5).data;
        $i = $rt_checkUpperBound($i, var$5);
        var$5[$i] = var$7;
        while ($entry !== null) {
            $index = $entry.$origKeyHash0 & ($length - 1 | 0);
            $next = $entry.$next4;
            $newData = $rt_nullCheck($newData);
            var$5 = $newData.data;
            $index = $rt_checkBounds($index, var$5);
            $entry.$next4 = var$5[$index];
            var$5[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData0 = $newData;
    juc_ConcurrentHashMap_computeThreshold($this);
},
juc_ConcurrentHashMap_rehash = $this => {
    juc_ConcurrentHashMap_rehash0($this, $rt_nullCheck($this.$elementData0).data.length);
},
juc_ConcurrentHashMap_remove = ($this, $key) => {
    let $entry;
    $entry = juc_ConcurrentHashMap_getEntry0($this, $key);
    if ($entry === null)
        return null;
    juc_ConcurrentHashMap_removeEntry($this, $entry);
    return $entry.$value4;
},
juc_ConcurrentHashMap_removeEntry = ($this, $entry) => {
    let $index, var$3, $m, var$5, var$6;
    $entry = $rt_nullCheck($entry);
    $index = $entry.$origKeyHash0 & ($rt_nullCheck($this.$elementData0).data.length - 1 | 0);
    var$3 = $rt_nullCheck($this.$elementData0).data;
    $index = $rt_checkBounds($index, var$3);
    $m = var$3[$index];
    if ($m === $entry) {
        var$3 = $this.$elementData0;
        var$5 = $entry.$next4;
        var$3 = $rt_nullCheck(var$3).data;
        $index = $rt_checkUpperBound($index, var$3);
        var$3[$index] = var$5;
    } else {
        while (true) {
            var$6 = $rt_nullCheck($m);
            if (var$6.$next4 === $entry)
                break;
            $m = var$6.$next4;
        }
        var$6.$next4 = $entry.$next4;
    }
    $this.$modCount1 = $this.$modCount1 + 1 | 0;
    $this.$elementCount0 = $this.$elementCount0 - 1 | 0;
    $entry.$removed = 1;
},
juc_ConcurrentHashMap_areEqualKeys = ($key1, $key2) => {
    let var$3;
    a: {
        if ($key1 !== $key2) {
            $key1 = $rt_nullCheck($key1);
            if (!$key1.$equals0($key2)) {
                var$3 = 0;
                break a;
            }
        }
        var$3 = 1;
    }
    return var$3;
},
juc_ConcurrentHashMap_computeIndex = ($this, $hash) => {
    return ($hash & 2147483647) % $rt_nullCheck($this.$elementData0).data.length | 0;
};
function ju_TemplateCollections$SingleElementSet() {
    ju_TemplateCollections$AbstractImmutableSet.call(this);
    this.$element = null;
}
let ju_TemplateCollections$SingleElementSet__init_ = ($this, $element) => {
    ju_TemplateCollections$AbstractImmutableSet__init_($this);
    $this.$element = $element;
},
ju_TemplateCollections$SingleElementSet__init_0 = var_0 => {
    let var_1 = new ju_TemplateCollections$SingleElementSet();
    ju_TemplateCollections$SingleElementSet__init_(var_1, var_0);
    return var_1;
},
ju_TemplateCollections$SingleElementSet_iterator = $this => {
    return ju_TemplateCollections$SingleElementSet$1__init_0($this);
};
function ju_UUID() {
    jl_Object.call(this);
    this.$value12 = null;
}
let ju_UUID__init_0 = ($this, $value) => {
    jl_Object__init_($this);
    $this.$value12 = $value;
},
ju_UUID__init_ = var_0 => {
    let var_1 = new ju_UUID();
    ju_UUID__init_0(var_1, var_0);
    return var_1;
},
ju_UUID_toString = $this => {
    return $this.$value12;
},
ju_UUID_randomUUID = () => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, $value;
    if (crypto != null ? 1 : 0)
        return ju_UUID__init_($rt_str(crypto.randomUUID()));
    var$1 = ju_UUID_s4();
    var$2 = ju_UUID_s4();
    var$3 = ju_UUID_s4();
    var$4 = ju_UUID_s4();
    var$5 = ju_UUID_s4();
    var$6 = ju_UUID_s4();
    var$7 = ju_UUID_s4();
    var$8 = ju_UUID_s4();
    var$9 = jl_StringBuilder__init_();
    jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append(var$9, var$1)), var$2)), 45)), var$3)), 45)), var$4)), 45)), var$5)),
    45)), var$6)), var$7)), var$8);
    $value = jl_StringBuilder_toString(var$9);
    return ju_UUID__init_($value);
},
ju_UUID_s4 = () => {
    return $rt_nullCheck(jl_Integer_toString(jl_Math_floor((1.0 + jl_Math_random()) * 65536.0) | 0, 16)).$substring0(1);
},
jtt_Temporal = $rt_classWithoutFields(0),
jtt_TemporalAdjuster = $rt_classWithoutFields(0);
function jt_Instant() {
    let a = this; jl_Object.call(a);
    a.$seconds0 = Long_ZERO;
    a.$nanos0 = 0;
}
let jt_Instant_EPOCH = null,
jt_Instant_MIN = null,
jt_Instant_MAX = null,
jt_Instant_FROM = null,
jt_Instant_$callClinit = () => {
    jt_Instant_$callClinit = $rt_eraseClinit(jt_Instant);
    jt_Instant__clinit_();
},
jt_Instant_ofEpochSecond = ($epochSecond, $nanoAdjustment) => {
    let $secs, $nos;
    jt_Instant_$callClinit();
    $secs = jl_Math_addExact($epochSecond, jl_Math_floorDiv($nanoAdjustment, 1000000000));
    $nos = jl_Math_floorMod($nanoAdjustment, 1000000000);
    return jt_Instant_create($secs, $nos);
},
jt_Instant_create = ($seconds, $nanoOfSecond) => {
    jt_Instant_$callClinit();
    if (Long_eq(Long_or($seconds, Long_fromInt($nanoOfSecond)), Long_ZERO))
        return jt_Instant_EPOCH;
    if (Long_ge($seconds, Long_create(342103040, 4287619856)) && Long_le($seconds, Long_create(4204099839, 7347410)))
        return jt_Instant__init_($seconds, $nanoOfSecond);
    $rt_throw(jt_DateTimeException__init_0($rt_s(284)));
},
jt_Instant__init_0 = ($this, $epochSecond, $nanos) => {
    jt_Instant_$callClinit();
    jl_Object__init_($this);
    $this.$seconds0 = $epochSecond;
    $this.$nanos0 = $nanos;
},
jt_Instant__init_ = (var_0, var_1) => {
    let var_2 = new jt_Instant();
    jt_Instant__init_0(var_2, var_0, var_1);
    return var_2;
},
jt_Instant_getEpochSecond = $this => {
    return $this.$seconds0;
},
jt_Instant_getNano = $this => {
    return $this.$nanos0;
},
jt_Instant__clinit_ = () => {
    jt_Instant_EPOCH = jt_Instant__init_(Long_ZERO, 0);
    jt_Instant_MIN = jt_Instant_ofEpochSecond(Long_create(342103040, 4287619856), Long_ZERO);
    jt_Instant_MAX = jt_Instant_ofEpochSecond(Long_create(4204099839, 7347410), Long_fromInt(999999999));
    jt_Instant_FROM = jt_Instant$1__init_0();
};
function ju_TemplateCollections$SingleElementSet$1() {
    let a = this; jl_Object.call(a);
    a.$more = 0;
    a.$this$02 = null;
}
let ju_TemplateCollections$SingleElementSet$1__init_ = ($this, $this$0) => {
    $this.$this$02 = $this$0;
    jl_Object__init_($this);
    $this.$more = 1;
},
ju_TemplateCollections$SingleElementSet$1__init_0 = var_0 => {
    let var_1 = new ju_TemplateCollections$SingleElementSet$1();
    ju_TemplateCollections$SingleElementSet$1__init_(var_1, var_0);
    return var_1;
},
ju_TemplateCollections$SingleElementSet$1_hasNext = $this => {
    return $this.$more;
},
ju_TemplateCollections$SingleElementSet$1_next = $this => {
    if (!$this.$more)
        $rt_throw(ju_NoSuchElementException__init_());
    $this.$more = 0;
    return $rt_nullCheck($this.$this$02).$element;
},
jnci_Iso8859Decoder = $rt_classWithoutFields(jnci_BufferedDecoder),
jnci_Iso8859Decoder__init_ = ($this, $cs) => {
    jnci_BufferedDecoder__init_($this, $cs, 1.0, 1.0);
},
jnci_Iso8859Decoder__init_0 = var_0 => {
    let var_1 = new jnci_Iso8859Decoder();
    jnci_Iso8859Decoder__init_(var_1, var_0);
    return var_1;
},
jnci_Iso8859Decoder_arrayDecode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $b, var$12, var$13;
    $result = null;
    while ($inPos < $inSize && $outPos < $outSize) {
        var$9 = $inPos + 1 | 0;
        $inArray = $rt_nullCheck($inArray);
        var$10 = $inArray.data;
        $b = var$10[$rt_checkBounds($inPos, var$10)] & 255;
        var$12 = $outPos + 1 | 0;
        var$13 = $b & 65535;
        $outArray = $rt_nullCheck($outArray);
        var$10 = $outArray.data;
        var$10[$rt_checkBounds($outPos, var$10)] = var$13;
        $inPos = var$9;
        $outPos = var$12;
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
};
function csw_FloatArrayProtoAdapter() {
    csw_ProtoAdapter.call(this);
    this.$originalAdapter3 = null;
}
let csw_FloatArrayProtoAdapter__init_ = ($this, $originalAdapter) => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($originalAdapter, $rt_s(83));
    csw_FieldEncoding_$callClinit();
    var$2 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$3 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_arraycls($rt_floatcls)));
    var$4 = null;
    $originalAdapter = $rt_nullCheck($originalAdapter);
    var$5 = csw_ProtoAdapter_getSyntax($originalAdapter);
    var$6 = $rt_createFloatArray(0);
    csw_ProtoAdapter__init_($this, var$2, var$3, var$4, var$5, var$6);
    $this.$originalAdapter3 = $originalAdapter;
},
csw_FloatArrayProtoAdapter__init_0 = var_0 => {
    let var_1 = new csw_FloatArrayProtoAdapter();
    csw_FloatArrayProtoAdapter__init_(var_1, var_0);
    return var_1;
},
csw_FloatArrayProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null && (($value.data.length ? 0 : 1) ? 0 : 1))
        csw_ProtoAdapter_encodeWithTag($this, $writer, $tag, $value);
},
csw_FloatArrayProtoAdapter_encode = ($this, $writer, $value) => {
    let var$3, $i, var$5;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    var$3 = $value.data;
    $i = var$3.length - 1 | 0;
    while ((-1) < $i) {
        $i = $rt_checkUpperBound($i, var$3);
        var$5 = jl_Float_floatToIntBits(var$3[$i]);
        $writer = $rt_nullCheck($writer);
        csw_ReverseProtoWriter_writeFixed32($writer, var$5);
        $i = $i + (-1) | 0;
    }
},
csw_FloatArrayProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_FloatArrayProtoAdapter_encodeWithTag($this, $writer, $tag, $rt_castToInterface($value, $rt_arraycls($rt_floatcls)));
},
csw_FloatArrayProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_FloatArrayProtoAdapter_encode($this, $writer, $rt_castToInterface($value, $rt_arraycls($rt_floatcls)));
},
ke_EnumEntriesKt = $rt_classWithoutFields(),
ke_EnumEntriesKt_enumEntries = $entries => {
    kji_Intrinsics_checkNotNullParameter($entries, $rt_s(84));
    return $rt_castToInterface(ke_EnumEntriesList__init_0($entries), ke_EnumEntries);
};
function kr_IntProgressionIterator() {
    let a = this; kc_IntIterator.call(a);
    a.$step = 0;
    a.$finalElement = 0;
    a.$hasNext0 = 0;
    a.$next5 = 0;
}
let kr_IntProgressionIterator__init_ = ($this, $first, $last, $step) => {
    kc_IntIterator__init_($this);
    $this.$step = $step;
    $this.$finalElement = $last;
    $this.$hasNext0 = $this.$step <= 0 ? ($first < $last ? 0 : 1) : $first > $last ? 0 : 1;
    if (!$this.$hasNext0)
        $first = $this.$finalElement;
    $this.$next5 = $first;
},
kr_IntProgressionIterator__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new kr_IntProgressionIterator();
    kr_IntProgressionIterator__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
kr_IntProgressionIterator_hasNext = $this => {
    return $this.$hasNext0;
},
kr_IntProgressionIterator_nextInt = $this => {
    let $value;
    $value = $this.$next5;
    if ($value != $this.$finalElement)
        $this.$next5 = $this.$next5 + $this.$step | 0;
    else {
        if (!$this.$hasNext0)
            $rt_throw(ju_NoSuchElementException__init_());
        $this.$hasNext0 = 0;
    }
    return $value;
},
kc_EmptyMap = $rt_classWithoutFields(),
kc_EmptyMap_INSTANCE = null,
kc_EmptyMap_$callClinit = () => {
    kc_EmptyMap_$callClinit = $rt_eraseClinit(kc_EmptyMap);
    kc_EmptyMap__clinit_();
},
kc_EmptyMap__init_ = $this => {
    kc_EmptyMap_$callClinit();
    jl_Object__init_($this);
},
kc_EmptyMap__init_0 = () => {
    let var_0 = new kc_EmptyMap();
    kc_EmptyMap__init_(var_0);
    return var_0;
},
kc_EmptyMap_getEntries = $this => {
    kc_EmptySet_$callClinit();
    return $rt_castToInterface(kc_EmptySet_INSTANCE, ju_Set);
},
kc_EmptyMap_entrySet = $this => {
    return kc_EmptyMap_getEntries($this);
},
kc_EmptyMap__clinit_ = () => {
    kc_EmptyMap_INSTANCE = kc_EmptyMap__init_0();
};
function kc_AbstractList$IteratorImpl() {
    let a = this; jl_Object.call(a);
    a.$index0 = 0;
    a.$this$01 = null;
}
let kc_AbstractList$IteratorImpl__init_ = ($this, $this$0) => {
    $this.$this$01 = $this$0;
    jl_Object__init_($this);
},
kc_AbstractList$IteratorImpl__init_0 = var_0 => {
    let var_1 = new kc_AbstractList$IteratorImpl();
    kc_AbstractList$IteratorImpl__init_(var_1, var_0);
    return var_1;
},
kc_AbstractList$IteratorImpl_hasNext = $this => {
    return $this.$index0 >= kc_AbstractCollection_size($rt_nullCheck($this.$this$01)) ? 0 : 1;
},
kc_AbstractList$IteratorImpl_next = $this => {
    let var$1, var$2;
    if (!$this.$hasNext())
        $rt_throw(ju_NoSuchElementException__init_());
    var$1 = $this.$this$01;
    var$2 = $this.$index0;
    $this.$index0 = var$2 + 1 | 0;
    return $rt_nullCheck(var$1).$get1(var$2);
};
function jn_ByteBuffer() {
    let a = this; jn_Buffer.call(a);
    a.$start1 = 0;
    a.$array3 = null;
    a.$order = null;
}
let jn_ByteBuffer__init_ = ($this, $start, $capacity, $array, $position, $limit) => {
    jn_Buffer__init_($this, $capacity);
    jn_ByteOrder_$callClinit();
    $this.$order = jn_ByteOrder_BIG_ENDIAN;
    $this.$start1 = $start;
    $this.$array3 = $array;
    $this.$position3 = $position;
    $this.$limit2 = $limit;
},
jn_ByteBuffer_allocate = $capacity => {
    let var$2, var$3;
    if ($capacity >= 0)
        return jn_ByteBufferImpl__init_2($capacity, 0);
    var$2 = new jl_IllegalArgumentException;
    var$3 = jl_StringBuilder__init_();
    jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$3, $rt_s(190))), $capacity);
    jl_IllegalArgumentException__init_1(var$2, jl_StringBuilder_toString(var$3));
    $rt_throw(var$2);
},
jn_ByteBuffer_wrap = ($array, $offset, $length) => {
    let var$4;
    $array = $rt_nullCheck($array);
    var$4 = $array.data.length;
    ju_Objects_checkFromIndexSize($offset, $length, var$4);
    return jn_ByteBufferImpl__init_1(0, var$4, $array, $offset, $offset + $length | 0, 0, 0);
},
jn_ByteBuffer_wrap0 = $array => {
    $array = $rt_nullCheck($array);
    return jn_ByteBuffer_wrap($array, 0, $array.data.length);
},
jn_ByteBuffer_get0 = ($this, $dst, $offset, $length) => {
    let var$4, var$5, var$6, var$7, var$8, var$9, $pos, $i, var$12;
    if ($offset >= 0) {
        $dst = $rt_nullCheck($dst);
        var$4 = $dst.data;
        var$5 = var$4.length;
        if ($offset <= var$5) {
            var$6 = $offset + $length | 0;
            if (var$6 > var$5) {
                var$7 = new jl_IndexOutOfBoundsException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(285))), var$6)), $rt_s(192))), var$5);
                jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            if (jn_Buffer_remaining($this) < $length)
                $rt_throw(jn_BufferUnderflowException__init_0());
            if ($length < 0) {
                var$9 = new jl_IndexOutOfBoundsException;
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(193))), $length)), $rt_s(194));
                jl_IndexOutOfBoundsException__init_(var$9, jl_StringBuilder_toString(var$7));
                $rt_throw(var$9);
            }
            $pos = $this.$position3 + $this.$start1 | 0;
            $i = 0;
            while ($i < $length) {
                var$6 = $offset + 1 | 0;
                var$12 = $this.$array3;
                var$5 = $pos + 1 | 0;
                var$12 = $rt_nullCheck(var$12).data;
                var$4[$rt_checkBounds($offset, var$4)] = var$12[$rt_checkBounds($pos, var$12)];
                $i = $i + 1 | 0;
                $offset = var$6;
                $pos = var$5;
            }
            $this.$position3 = $this.$position3 + $length | 0;
            return $this;
        }
    }
    var$9 = new jl_IndexOutOfBoundsException;
    $dst = $rt_nullCheck($dst);
    var$5 = $dst.data.length;
    var$7 = jl_StringBuilder__init_();
    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(195))), $offset)), $rt_s(76))), var$5)), 41);
    jl_IndexOutOfBoundsException__init_(var$9, jl_StringBuilder_toString(var$7));
    $rt_throw(var$9);
},
jn_ByteBuffer_get = ($this, $dst) => {
    $dst = $rt_nullCheck($dst);
    return $this.$get0($dst, 0, $dst.data.length);
},
jn_ByteBuffer_put0 = ($this, $src, $offset, $length) => {
    let var$4, var$5, var$6, var$7, var$8, var$9, $pos, $i, var$12, var$13;
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
                jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$8, $rt_s(286))), var$6)), $rt_s(192))), var$5);
                jl_IndexOutOfBoundsException__init_(var$7, jl_StringBuilder_toString(var$8));
                $rt_throw(var$7);
            }
            if ($length < 0) {
                var$9 = new jl_IndexOutOfBoundsException;
                var$7 = jl_StringBuilder__init_();
                jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(193))), $length)), $rt_s(194));
                jl_IndexOutOfBoundsException__init_(var$9, jl_StringBuilder_toString(var$7));
                $rt_throw(var$9);
            }
            $pos = $this.$position3 + $this.$start1 | 0;
            $i = 0;
            while ($i < $length) {
                var$12 = $this.$array3;
                var$6 = $pos + 1 | 0;
                var$5 = $offset + 1 | 0;
                var$13 = var$4[$rt_checkBounds($offset, var$4)];
                var$12 = $rt_nullCheck(var$12).data;
                var$12[$rt_checkBounds($pos, var$12)] = var$13;
                $i = $i + 1 | 0;
                $pos = var$6;
                $offset = var$5;
            }
            $this.$position3 = $this.$position3 + $length | 0;
            return $this;
        }
    }
    var$9 = new jl_IndexOutOfBoundsException;
    $src = $rt_nullCheck($src);
    var$5 = $src.data.length;
    var$7 = jl_StringBuilder__init_();
    jl_StringBuilder_append1($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append($rt_nullCheck(jl_StringBuilder_append0($rt_nullCheck(jl_StringBuilder_append(var$7, $rt_s(195))), $offset)), $rt_s(76))), var$5)), 41);
    jl_IndexOutOfBoundsException__init_(var$9, jl_StringBuilder_toString(var$7));
    $rt_throw(var$9);
},
jn_ByteBuffer_put = ($this, $src) => {
    $src = $rt_nullCheck($src);
    return $this.$put0($src, 0, $src.data.length);
},
jn_ByteBuffer_hasArray = $this => {
    return 1;
},
jn_ByteBuffer_array = $this => {
    return $this.$array3;
},
jn_ByteBuffer_flip = $this => {
    jn_Buffer_flip($this);
    return $this;
},
jn_ByteBuffer_position = ($this, $newPosition) => {
    jn_Buffer_position0($this, $newPosition);
    return $this;
};
function jn_ByteBufferImpl() {
    let a = this; jn_ByteBuffer.call(a);
    a.$direct = 0;
    a.$readOnly0 = 0;
}
let jn_ByteBufferImpl__init_0 = ($this, $capacity, $direct) => {
    jn_ByteBufferImpl__init_($this, 0, $capacity, $rt_createByteArray($capacity), 0, $capacity, $direct, 0);
},
jn_ByteBufferImpl__init_2 = (var_0, var_1) => {
    let var_2 = new jn_ByteBufferImpl();
    jn_ByteBufferImpl__init_0(var_2, var_0, var_1);
    return var_2;
},
jn_ByteBufferImpl__init_ = ($this, $start, $capacity, $array, $position, $limit, $direct, $readOnly) => {
    jn_ByteBuffer__init_($this, $start, $capacity, $array, $position, $limit);
    $this.$direct = $direct;
    $this.$readOnly0 = $readOnly;
},
jn_ByteBufferImpl__init_1 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new jn_ByteBufferImpl();
    jn_ByteBufferImpl__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
},
jn_ByteBufferImpl_isReadOnly = $this => {
    return $this.$readOnly0;
},
uciisd_Employee = $rt_classWithoutFields();
function csw_ProtoAdapter$EnumConstantNotFoundException() {
    jl_IllegalArgumentException.call(this);
    this.$value10 = 0;
}
let csw_ProtoAdapter$EnumConstantNotFoundException__init_ = ($this, $value, $type) => {
    let var$3, var$4;
    a: {
        var$3 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(287))).$append4($value)).$append3($rt_s(288));
        if ($type !== null) {
            var$4 = kj_JvmClassMappingKt_getJavaClass($type);
            if (var$4 !== null) {
                var$4 = var$4.$getName();
                break a;
            }
        }
        var$4 = null;
    }
    jl_IllegalArgumentException__init_1($this, $rt_nullCheck($rt_nullCheck(var$3).$append3(var$4)).$toString());
    $this.$value10 = $value;
},
csw_ProtoAdapter$EnumConstantNotFoundException__init_0 = (var_0, var_1) => {
    let var_2 = new csw_ProtoAdapter$EnumConstantNotFoundException();
    csw_ProtoAdapter$EnumConstantNotFoundException__init_(var_2, var_0, var_1);
    return var_2;
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper_hashCodes = null,
otji_JSWrapper_wrappers = null,
otji_JSWrapper_stringWrappers = null,
otji_JSWrapper_numberWrappers = null,
otji_JSWrapper_undefinedWrapper = null,
otji_JSWrapper_stringFinalizationRegistry = null,
otji_JSWrapper_numberFinalizationRegistry = null,
otji_JSWrapper_$callClinit = () => {
    otji_JSWrapper_$callClinit = $rt_eraseClinit(otji_JSWrapper);
    otji_JSWrapper__clinit_();
},
otji_JSWrapper__init_0 = ($this, $js) => {
    otji_JSWrapper_$callClinit();
    jl_Object__init_($this);
    $this.$js = $js;
},
otji_JSWrapper__init_ = var_0 => {
    let var_1 = new otji_JSWrapper();
    otji_JSWrapper__init_0(var_1, var_0);
    return var_1;
},
otji_JSWrapper_wrap = $o => {
    let $js, $type, $isObject, $existingRef, $existing, $wrapper, $jsString, $wrapperAsJs, $jsNumber;
    otji_JSWrapper_$callClinit();
    if ($o === null)
        return null;
    $js = $o;
    $type = $rt_str(typeof $js);
    $type = $rt_nullCheck($type);
    $isObject = !$type.$equals0($rt_s(289)) && !$type.$equals0($rt_s(290)) ? 0 : 1;
    if ($isObject && $o[$rt_jso_marker] === true)
        return $o;
    if (otji_JSWrapper_wrappers !== null) {
        if ($isObject) {
            $existingRef = otji_JSWrapper_wrappers.get($js);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($js);
            otji_JSWrapper_wrappers.set($js, new WeakRef($wrapper));
            return $wrapper;
        }
        if ($type.$equals0($rt_s(189))) {
            $jsString = $rt_throwCCEIfFalse(typeof $js === "string" ? 1 : 0, $js);
            $existingRef = otji_JSWrapper_stringWrappers.get($jsString);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($js);
            $wrapperAsJs = $wrapper;
            otji_JSWrapper_stringWrappers.set($jsString, new WeakRef($wrapperAsJs));
            otji_JSWrapper_register$js_body$_4(otji_JSWrapper_stringFinalizationRegistry, $wrapperAsJs, $jsString);
            return $wrapper;
        }
        if ($type.$equals0($rt_s(291))) {
            $jsNumber = $rt_throwCCEIfFalse(typeof $js === "number" ? 1 : 0, $js);
            $existingRef = otji_JSWrapper_numberWrappers.get($jsNumber);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($js);
            $wrapperAsJs = $wrapper;
            otji_JSWrapper_numberWrappers.set($jsNumber, new WeakRef($wrapperAsJs));
            otji_JSWrapper_register$js_body$_4(otji_JSWrapper_numberFinalizationRegistry, $wrapperAsJs, $jsNumber);
            return $wrapper;
        }
        if ($type.$equals0($rt_s(292))) {
            $existingRef = otji_JSWrapper_undefinedWrapper;
            $existing = $existingRef === null ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($js);
            $wrapperAsJs = $wrapper;
            otji_JSWrapper_undefinedWrapper = new WeakRef($wrapperAsJs);
            return $wrapper;
        }
    }
    return otji_JSWrapper__init_($js);
},
otji_JSWrapper_unwrap = $o => {
    otji_JSWrapper_$callClinit();
    if ($o === null)
        return null;
    return $o[$rt_jso_marker] === true ? $o : $rt_nullCheck($rt_castToClass($o, otji_JSWrapper)).$js;
},
otji_JSWrapper_jsToJava = $o => {
    otji_JSWrapper_$callClinit();
    if ($o === null)
        return null;
    return $o instanceof $rt_objcls() ? $o : otji_JSWrapper_wrap($o);
},
otji_JSWrapper_lambda$static$1 = $token => {
    let var$2, var$3;
    otji_JSWrapper_$callClinit();
    var$2 = otji_JSWrapper_numberWrappers;
    var$3 = otji_JSWrapper_unwrap($token);
    var$3 = $rt_throwCCEIfFalse(typeof var$3 === "number" ? 1 : 0, var$3);
    var$2.delete(var$3);
},
otji_JSWrapper_lambda$static$0 = $token => {
    let var$2, var$3;
    otji_JSWrapper_$callClinit();
    var$2 = otji_JSWrapper_stringWrappers;
    var$3 = otji_JSWrapper_unwrap($token);
    var$3 = $rt_throwCCEIfFalse(typeof var$3 === "string" ? 1 : 0, var$3);
    var$2.delete(var$3);
},
otji_JSWrapper__clinit_ = () => {
    let var$1, var$2;
    otji_JSWrapper_hashCodes = new WeakMap();
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new WeakMap();
    otji_JSWrapper_wrappers = var$1;
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper_stringWrappers = var$1;
    var$1 = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper_numberWrappers = var$1;
    if (otji_JSWrapper_stringWrappers === null)
        var$1 = null;
    else {
        var$2 = otji_JSWrapper$_clinit_$lambda$_33_0__init_0();
        var$1 = new FinalizationRegistry(otji_JS_function(var$2, "accept"));
    }
    otji_JSWrapper_stringFinalizationRegistry = var$1;
    if (otji_JSWrapper_numberWrappers === null)
        var$1 = null;
    else {
        var$2 = otji_JSWrapper$_clinit_$lambda$_33_1__init_0();
        var$1 = new FinalizationRegistry(otji_JS_function(var$2, "accept"));
    }
    otji_JSWrapper_numberFinalizationRegistry = var$1;
},
otji_JSWrapper_register$js_body$_4 = (var$1, var$2, var$3) => {
    return var$1.register(var$2, var$3);
},
kt_Charsets = $rt_classWithoutFields(),
kt_Charsets_INSTANCE = null,
kt_Charsets_UTF_8 = null,
kt_Charsets_UTF_16 = null,
kt_Charsets_UTF_16BE = null,
kt_Charsets_UTF_16LE = null,
kt_Charsets_US_ASCII = null,
kt_Charsets_ISO_8859_1 = null,
kt_Charsets_$callClinit = () => {
    kt_Charsets_$callClinit = $rt_eraseClinit(kt_Charsets);
    kt_Charsets__clinit_();
},
kt_Charsets__init_0 = $this => {
    kt_Charsets_$callClinit();
    jl_Object__init_($this);
},
kt_Charsets__init_ = () => {
    let var_0 = new kt_Charsets();
    kt_Charsets__init_0(var_0);
    return var_0;
},
kt_Charsets__clinit_ = () => {
    let var$1, var$2;
    kt_Charsets_INSTANCE = kt_Charsets__init_();
    var$1 = jnc_Charset_forName($rt_s(206));
    kji_Intrinsics_checkNotNullExpressionValue(var$1, $rt_s(293));
    kt_Charsets_UTF_8 = var$1;
    var$2 = jnc_Charset_forName($rt_s(200));
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(293));
    kt_Charsets_UTF_16 = var$2;
    var$2 = jnc_Charset_forName($rt_s(201));
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(293));
    kt_Charsets_UTF_16BE = var$2;
    var$2 = jnc_Charset_forName($rt_s(202));
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(293));
    kt_Charsets_UTF_16LE = var$2;
    var$2 = jnc_Charset_forName($rt_s(95));
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(293));
    kt_Charsets_US_ASCII = var$2;
    var$2 = jnc_Charset_forName($rt_s(203));
    kji_Intrinsics_checkNotNullExpressionValue(var$2, $rt_s(293));
    kt_Charsets_ISO_8859_1 = var$2;
},
csw_ProtoAdapterKt$commonStructNull$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonStructNull$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(294), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonStructNull$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonStructNull$1();
    csw_ProtoAdapterKt$commonStructNull$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonStructNull$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint32($writer, 0);
},
csw_ProtoAdapterKt$commonStructNull$1_encodeWithTag = ($this, $writer, $tag, $value) => {
    let var$4;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    csw_ProtoAdapterKt$commonStructNull$1_encode($this, $writer, $value);
    var$4 = csw_ProtoAdapter_getFieldEncoding$wire_runtime($this);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeTag($writer, $tag, var$4);
},
csw_ProtoAdapterKt$commonStructNull$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonStructNull$1_encode($this, $writer, $rt_castToClass($value, jl_Void));
},
csw_ProtoAdapterKt$commonStructNull$1_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_ProtoAdapterKt$commonStructNull$1_encodeWithTag($this, $writer, $tag, $rt_castToClass($value, jl_Void));
},
jnc_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException),
jnc_BufferUnderflowException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jnc_BufferUnderflowException__init_0 = () => {
    let var_0 = new jnc_BufferUnderflowException();
    jnc_BufferUnderflowException__init_(var_0);
    return var_0;
},
csw_ProtoAdapterKt$commonUint32$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonUint32$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Integer_valueOf(0);
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$4, $$super_call_param$3, var$5);
},
csw_ProtoAdapterKt$commonUint32$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonUint32$1();
    csw_ProtoAdapterKt$commonUint32$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonUint32$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeVarint32($writer, $value);
},
csw_ProtoAdapterKt$commonUint32$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonUint32$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$intValue());
},
kc_MapsKt__MapsKt = $rt_classWithoutFields(kc_MapsKt__MapsJVMKt),
kc_MapsKt__MapsKt_emptyMap = () => {
    let var$1;
    kc_EmptyMap_$callClinit();
    var$1 = kc_EmptyMap_INSTANCE;
    kji_Intrinsics_checkNotNull0(var$1, $rt_s(295));
    return $rt_castToInterface(var$1, ju_Map);
},
kc_MapsKt__MapsKt_putAll = ($$this$putAll, $pairs) => {
    let var$3, var$4, $key, $value;
    kji_Intrinsics_checkNotNullParameter($$this$putAll, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($pairs, $rt_s(296));
    $pairs = $rt_nullCheck($pairs);
    var$3 = $pairs.$iterator();
    while (true) {
        var$3 = $rt_nullCheck(var$3);
        if (!var$3.$hasNext())
            break;
        var$4 = $rt_nullCheck($rt_castToClass(var$3.$next(), k_Pair));
        $key = k_Pair_component1(var$4);
        $value = k_Pair_component2(var$4);
        $$this$putAll = $rt_nullCheck($$this$putAll);
        $$this$putAll.$put3($key, $value);
    }
},
kc_MapsKt__MapsKt_toMap0 = $$this$toMap => {
    let var$2, var$3;
    kji_Intrinsics_checkNotNullParameter($$this$toMap, $rt_s(29));
    if (!$rt_isInstance($$this$toMap, ju_Collection))
        return kc_MapsKt__MapsKt_optimizeReadOnlyMap(kc_MapsKt__MapsKt_toMap($$this$toMap, $rt_castToInterface(ju_LinkedHashMap__init_2(), ju_Map)));
    a: {
        var$2 = $rt_nullCheck($rt_castToInterface($$this$toMap, ju_Collection));
        switch (var$2.$size()) {
            case 0:
                break;
            case 1:
                if (!$rt_isInstance($$this$toMap, ju_List)) {
                    $$this$toMap = $rt_nullCheck($$this$toMap);
                    var$3 = $rt_castToClass($rt_nullCheck($$this$toMap.$iterator()).$next(), k_Pair);
                } else
                    var$3 = $rt_castToClass($rt_nullCheck($rt_castToInterface($$this$toMap, ju_List)).$get1(0), k_Pair);
                var$3 = kc_MapsKt__MapsJVMKt_mapOf(var$3);
                break a;
            default:
                var$3 = kc_MapsKt__MapsKt_toMap($$this$toMap, $rt_castToInterface(ju_LinkedHashMap__init_1(kc_MapsKt__MapsJVMKt_mapCapacity(var$2.$size())), ju_Map));
                break a;
        }
        var$3 = kc_MapsKt__MapsKt_emptyMap();
    }
    return var$3;
},
kc_MapsKt__MapsKt_toMap = ($$this$toMap, $destination) => {
    kji_Intrinsics_checkNotNullParameter($$this$toMap, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($destination, $rt_s(208));
    kc_MapsKt__MapsKt_putAll($destination, $$this$toMap);
    return $destination;
},
kc_MapsKt__MapsKt_optimizeReadOnlyMap = $$this$optimizeReadOnlyMap => {
    a: {
        kji_Intrinsics_checkNotNullParameter($$this$optimizeReadOnlyMap, $rt_s(29));
        $$this$optimizeReadOnlyMap = $rt_nullCheck($$this$optimizeReadOnlyMap);
        switch ($$this$optimizeReadOnlyMap.$size()) {
            case 0:
                $$this$optimizeReadOnlyMap = kc_MapsKt__MapsKt_emptyMap();
                break a;
            case 1:
                $$this$optimizeReadOnlyMap = kc_MapsKt__MapsJVMKt_toSingletonMap($$this$optimizeReadOnlyMap);
                break a;
            default:
        }
    }
    return $$this$optimizeReadOnlyMap;
};
let uciisd_MyDataCodec = $rt_classWithoutFields(),
uciisd_MyDataCodec__init_ = $this => {
    jl_Object__init_($this);
},
uciisd_MyDataCodec__init_0 = () => {
    let var_0 = new uciisd_MyDataCodec();
    uciisd_MyDataCodec__init_(var_0);
    return var_0;
},
uciisd_MyDataCodec_toWire = ($this, $pojo) => {
    let var$2, var$3, var$4;
    if ($pojo === null)
        return null;
    var$2 = uciisdp_MyData$Builder__init_0();
    var$2 = uciisdp_MyData$Builder_id(var$2, $pojo.$getId0());
    var$3 = $pojo.$getContent();
    var$2 = uciisdp_MyData$Builder_content($rt_nullCheck(var$2), var$3);
    var$4 = $pojo.$getValue0();
    var$2 = uciisdp_MyData$Builder_value($rt_nullCheck(var$2), var$4);
    var$2 = uciisdp_MyData$Builder_build($rt_nullCheck(var$2));
    return var$2;
},
uciisd_MyDataCodec_fromWire = ($this, $wire) => {
    let $pojo;
    if ($wire === null)
        return null;
    $pojo = uciisd_MyData__init_();
    $pojo.$setId($wire.$id0);
    $pojo.$setContent($wire.$content0);
    $pojo.$setValue($wire.$value5);
    return $pojo;
},
uciisd_MyDataCodec_getWireAdapter = $this => {
    uciisdp_MyData_$callClinit();
    return uciisdp_MyData_ADAPTER;
},
uciisd_MyDataCodec_toWire0 = ($this, var$1) => {
    return $this.$toWire4($rt_castToClass(var$1, uciisd_MyData));
},
otcic_JSStderrPrintStream = $rt_classWithoutFields(otcic_JsConsolePrintStream),
otcic_JSStderrPrintStream__init_ = $this => {
    otcic_JsConsolePrintStream__init_($this);
},
otcic_JSStderrPrintStream__init_0 = () => {
    let var_0 = new otcic_JSStderrPrintStream();
    otcic_JSStderrPrintStream__init_(var_0);
    return var_0;
},
otcic_JSStderrPrintStream_print = ($this, $s) => {
    $rt_putStderr($rt_ustr($s));
};
function o_Buffer() {
    let a = this; jl_Object.call(a);
    a.$head = null;
    a.$size2 = Long_ZERO;
}
let o_Buffer__init_0 = $this => {
    jl_Object__init_($this);
},
o_Buffer__init_ = () => {
    let var_0 = new o_Buffer();
    o_Buffer__init_0(var_0);
    return var_0;
},
o_Buffer_size = $this => {
    return $this.$size2;
},
o_Buffer_setSize$okio = ($this, $_set___) => {
    $this.$size2 = $_set___;
},
o_Buffer_exhausted = $this => {
    return Long_ne($this.$size2, Long_ZERO) ? 0 : 1;
},
o_Buffer_require = ($this, $byteCount) => {
    if (Long_ge($this.$size2, $byteCount))
        return;
    $rt_throw(ji_EOFException__init_());
},
o_Buffer_readByte = $this => {
    let $segment$iv, $pos$iv, $limit$iv, $data$iv, var$5, var$6, $b$iv;
    if (Long_eq(o_Buffer_size($this), Long_ZERO))
        $rt_throw(ji_EOFException__init_());
    $segment$iv = $this.$head;
    kji_Intrinsics_checkNotNull($segment$iv);
    $segment$iv = $rt_nullCheck($segment$iv);
    $pos$iv = $segment$iv.$pos;
    $limit$iv = $segment$iv.$limit0;
    $data$iv = $segment$iv.$data;
    var$5 = $pos$iv + 1 | 0;
    $data$iv = $rt_nullCheck($data$iv);
    var$6 = $data$iv.data;
    $pos$iv = $rt_checkBounds($pos$iv, var$6);
    $b$iv = var$6[$pos$iv];
    o_Buffer_setSize$okio($this, Long_sub(o_Buffer_size($this), Long_fromInt(1)));
    if (var$5 != $limit$iv)
        $segment$iv.$pos = var$5;
    else {
        $this.$head = o_Segment_pop($segment$iv);
        o_SegmentPool_recycle($segment$iv);
    }
    return $b$iv;
},
o_Buffer_readInt = $this => {
    let $segment$iv, $pos$iv, $limit$iv, $$this$and$iv$iv, $other$iv$iv, var$6, var$7, $i$iv, $data$iv, var$10, var$11, var$12;
    if (Long_lt(o_Buffer_size($this), Long_fromInt(4)))
        $rt_throw(ji_EOFException__init_());
    $segment$iv = $this.$head;
    kji_Intrinsics_checkNotNull($segment$iv);
    $segment$iv = $rt_nullCheck($segment$iv);
    $pos$iv = $segment$iv.$pos;
    $limit$iv = $segment$iv.$limit0;
    if (Long_lt(Long_fromInt($limit$iv - $pos$iv | 0), Long_fromInt(4))) {
        $$this$and$iv$iv = o_Buffer_readByte($this);
        $other$iv$iv = 255;
        var$6 = $$this$and$iv$iv & $other$iv$iv;
        var$6 = var$6 << 24;
        $$this$and$iv$iv = o_Buffer_readByte($this);
        $other$iv$iv = 255;
        var$7 = $$this$and$iv$iv & $other$iv$iv;
        var$7 = var$7 << 16;
        var$6 = var$6 | var$7;
        $$this$and$iv$iv = o_Buffer_readByte($this);
        $other$iv$iv = 255;
        var$7 = $$this$and$iv$iv & $other$iv$iv;
        var$7 = var$7 << 8;
        var$6 = var$6 | var$7;
        $$this$and$iv$iv = o_Buffer_readByte($this);
        $other$iv$iv = 255;
        var$7 = $$this$and$iv$iv & $other$iv$iv;
        $i$iv = var$6 | var$7;
    } else {
        $data$iv = $segment$iv.$data;
        var$7 = $pos$iv + 1 | 0;
        $data$iv = $rt_nullCheck($data$iv);
        var$10 = $data$iv.data;
        $pos$iv = $rt_checkBounds($pos$iv, var$10);
        $$this$and$iv$iv = var$10[$pos$iv];
        $other$iv$iv = 255;
        var$6 = $$this$and$iv$iv & $other$iv$iv;
        var$11 = var$6 << 24;
        var$12 = var$7 + 1 | 0;
        $$this$and$iv$iv = var$10[$rt_checkBounds(var$7, var$10)];
        $other$iv$iv = 255;
        var$6 = $$this$and$iv$iv & $other$iv$iv;
        var$6 = var$6 << 16;
        var$11 = var$11 | var$6;
        var$6 = var$12 + 1 | 0;
        $$this$and$iv$iv = var$10[$rt_checkBounds(var$12, var$10)];
        $other$iv$iv = 255;
        var$7 = $$this$and$iv$iv & $other$iv$iv;
        var$7 = var$7 << 8;
        var$7 = var$11 | var$7;
        var$12 = var$6 + 1 | 0;
        $$this$and$iv$iv = var$10[$rt_checkBounds(var$6, var$10)];
        $other$iv$iv = 255;
        var$6 = $$this$and$iv$iv & $other$iv$iv;
        $i$iv = var$7 | var$6;
        o_Buffer_setSize$okio($this, Long_sub(o_Buffer_size($this), Long_fromInt(4)));
        if (var$12 != $limit$iv)
            $segment$iv.$pos = var$12;
        else {
            $this.$head = o_Segment_pop($segment$iv);
            o_SegmentPool_recycle($segment$iv);
        }
    }
    return $i$iv;
},
o_Buffer_readLong = $this => {
    let $segment$iv, $pos$iv, $limit$iv, $$this$and$iv$iv, $other$iv$iv, var$6, var$7, $v$iv, $data$iv, var$10, var$11, var$12;
    if (Long_lt(o_Buffer_size($this), Long_fromInt(8)))
        $rt_throw(ji_EOFException__init_());
    $segment$iv = $this.$head;
    kji_Intrinsics_checkNotNull($segment$iv);
    $segment$iv = $rt_nullCheck($segment$iv);
    $pos$iv = $segment$iv.$pos;
    $limit$iv = $segment$iv.$limit0;
    if (Long_lt(Long_fromInt($limit$iv - $pos$iv | 0), Long_fromInt(8))) {
        $$this$and$iv$iv = o_Buffer_readInt($this);
        $other$iv$iv = Long_create(4294967295, 0);
        var$6 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$6 = Long_shl(var$6, 32);
        $$this$and$iv$iv = o_Buffer_readInt($this);
        $other$iv$iv = Long_create(4294967295, 0);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        $v$iv = Long_or(var$6, var$7);
    } else {
        $data$iv = $segment$iv.$data;
        var$10 = $pos$iv + 1 | 0;
        $data$iv = $rt_nullCheck($data$iv);
        var$11 = $data$iv.data;
        $pos$iv = $rt_checkBounds($pos$iv, var$11);
        $$this$and$iv$iv = var$11[$pos$iv];
        $other$iv$iv = Long_fromInt(255);
        var$6 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$6 = Long_shl(var$6, 56);
        var$12 = var$10 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$10, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$7 = Long_shl(var$7, 48);
        var$6 = Long_or(var$6, var$7);
        var$10 = var$12 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$12, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$7 = Long_shl(var$7, 40);
        var$6 = Long_or(var$6, var$7);
        var$12 = var$10 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$10, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$7 = Long_shl(var$7, 32);
        var$6 = Long_or(var$6, var$7);
        var$10 = var$12 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$12, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$7 = Long_shl(var$7, 24);
        var$6 = Long_or(var$6, var$7);
        var$12 = var$10 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$10, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$7 = Long_shl(var$7, 16);
        var$6 = Long_or(var$6, var$7);
        var$10 = var$12 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$12, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        var$7 = Long_shl(var$7, 8);
        var$6 = Long_or(var$6, var$7);
        var$12 = var$10 + 1 | 0;
        $$this$and$iv$iv = var$11[$rt_checkBounds(var$10, var$11)];
        $other$iv$iv = Long_fromInt(255);
        var$7 = Long_and(Long_fromInt($$this$and$iv$iv), $other$iv$iv);
        $v$iv = Long_or(var$6, var$7);
        o_Buffer_setSize$okio($this, Long_sub(o_Buffer_size($this), Long_fromInt(8)));
        if (var$12 != $limit$iv)
            $segment$iv.$pos = var$12;
        else {
            $this.$head = o_Segment_pop($segment$iv);
            o_SegmentPool_recycle($segment$iv);
        }
    }
    return $v$iv;
},
o_Buffer_readIntLe = $this => {
    return o__SegmentedByteString_reverseBytes(o_Buffer_readInt($this));
},
o_Buffer_readLongLe = $this => {
    return o__SegmentedByteString_reverseBytes0(o_Buffer_readLong($this));
},
o_Buffer_readByteString = $this => {
    let var$1;
    var$1 = o_Buffer_readByteString0($this, o_Buffer_size($this));
    return var$1;
},
o_Buffer_readByteString0 = ($this, $byteCount) => {
    let var$2;
    if (!(Long_ge($byteCount, Long_ZERO) && Long_le($byteCount, Long_fromInt(2147483647)) ? 1 : 0)) {
        var$2 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(297))).$append9($byteCount)).$toString();
        $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$2).$toString()));
    }
    if (Long_lt(o_Buffer_size($this), $byteCount))
        $rt_throw(ji_EOFException__init_());
    if (Long_lt($byteCount, Long_fromInt(4096)))
        var$2 = o_ByteString__init_0(o_Buffer_readByteArray($this, $byteCount));
    else {
        var$2 = o_Buffer_snapshot($this, Long_lo($byteCount));
        o_Buffer_skip($this, $byteCount);
    }
    return var$2;
},
o_Buffer_readUtf8 = ($this, $byteCount) => {
    kt_Charsets_$callClinit();
    return o_Buffer_readString($this, $byteCount, kt_Charsets_UTF_8);
},
o_Buffer_readString = ($this, $byteCount, $charset) => {
    let var$3, var$4, $s, $result, var$7, var$8;
    kji_Intrinsics_checkNotNullParameter($charset, $rt_s(298));
    var$3 = Long_compare($byteCount, Long_ZERO);
    if (!(var$3 >= 0 && Long_le($byteCount, Long_fromInt(2147483647)) ? 1 : 0)) {
        var$4 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(297))).$append9($byteCount)).$toString();
        $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$4).$toString()));
    }
    if (Long_lt($this.$size2, $byteCount))
        $rt_throw(ji_EOFException__init_());
    if (!var$3)
        return $rt_s(6);
    $s = $this.$head;
    kji_Intrinsics_checkNotNull($s);
    $s = $rt_nullCheck($s);
    if (Long_gt(Long_add(Long_fromInt($s.$pos), $byteCount), Long_fromInt($s.$limit0))) {
        var$4 = jl_String__init_7(o_Buffer_readByteArray($this, $byteCount), $charset);
        return var$4;
    }
    $result = new jl_String;
    var$7 = $s.$data;
    var$3 = $s.$pos;
    var$8 = Long_lo($byteCount);
    jl_String__init_1($result, var$7, var$3, var$8, $charset);
    $s.$pos = $s.$pos + var$8 | 0;
    $this.$size2 = Long_sub($this.$size2, $byteCount);
    if ($s.$pos == $s.$limit0) {
        $this.$head = o_Segment_pop($s);
        o_SegmentPool_recycle($s);
    }
    return $result;
},
o_Buffer_readByteArray0 = $this => {
    let var$1;
    var$1 = o_Buffer_readByteArray($this, o_Buffer_size($this));
    return var$1;
},
o_Buffer_readByteArray = ($this, $byteCount) => {
    let $result$iv, var$3;
    if (Long_ge($byteCount, Long_ZERO) && Long_le($byteCount, Long_fromInt(2147483647)) ? 1 : 0) {
        if (Long_lt(o_Buffer_size($this), $byteCount))
            $rt_throw(ji_EOFException__init_());
        $result$iv = $rt_createByteArray(Long_lo($byteCount));
        o_Buffer_readFully($this, $result$iv);
        return $result$iv;
    }
    var$3 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(297))).$append9($byteCount)).$toString();
    $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$3).$toString()));
},
o_Buffer_readFully = ($this, $sink) => {
    let $offset$iv, var$3, $read$iv;
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    $offset$iv = 0;
    while (true) {
        $sink = $rt_nullCheck($sink);
        var$3 = $sink.data.length;
        if ($offset$iv >= var$3)
            break;
        $read$iv = o_Buffer_read($this, $sink, $offset$iv, var$3 - $offset$iv | 0);
        if ($read$iv == (-1))
            $rt_throw(ji_EOFException__init_());
        $offset$iv = $offset$iv + $read$iv | 0;
    }
},
o_Buffer_read = ($this, $sink, $offset, $byteCount) => {
    let $s$iv, $toCopy$iv, var$6, var$7, var$8;
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    $sink = $rt_nullCheck($sink);
    o__SegmentedByteString_checkOffsetAndCount(Long_fromInt($sink.data.length), Long_fromInt($offset), Long_fromInt($byteCount));
    $s$iv = $this.$head;
    if ($s$iv === null)
        $toCopy$iv = (-1);
    else {
        $toCopy$iv = jl_Math_min($byteCount, $s$iv.$limit0 - $s$iv.$pos | 0);
        var$6 = $s$iv.$data;
        var$7 = $s$iv.$pos;
        var$8 = $s$iv.$pos + $toCopy$iv | 0;
        kc_ArraysKt___ArraysJvmKt_copyInto(var$6, $sink, $offset, var$7, var$8);
        $s$iv.$pos = $s$iv.$pos + $toCopy$iv | 0;
        o_Buffer_setSize$okio($this, Long_sub(o_Buffer_size($this), Long_fromInt($toCopy$iv)));
        if ($s$iv.$pos == $s$iv.$limit0) {
            $this.$head = o_Segment_pop($s$iv);
            o_SegmentPool_recycle($s$iv);
        }
    }
    return $toCopy$iv;
},
o_Buffer_skip = ($this, $byteCount$iv) => {
    let $head$iv, $b$iv$iv, var$4, $toSkip$iv, var$6;
    while (Long_gt($byteCount$iv, Long_ZERO)) {
        $head$iv = $this.$head;
        if ($head$iv === null)
            $rt_throw(ji_EOFException__init_());
        $b$iv$iv = $head$iv.$limit0 - $head$iv.$pos | 0;
        var$4 = jl_Math_min0($byteCount$iv, Long_fromInt($b$iv$iv));
        $toSkip$iv = Long_lo(var$4);
        var$4 = o_Buffer_size($this);
        var$6 = Long_fromInt($toSkip$iv);
        o_Buffer_setSize$okio($this, Long_sub(var$4, var$6));
        $byteCount$iv = Long_sub($byteCount$iv, var$6);
        $head$iv.$pos = $head$iv.$pos + $toSkip$iv | 0;
        if ($head$iv.$pos != $head$iv.$limit0)
            continue;
        $this.$head = o_Segment_pop($head$iv);
        o_SegmentPool_recycle($head$iv);
    }
},
o_Buffer_write2 = ($this, $byteString) => {
    let $offset$iv, $byteCount$iv;
    kji_Intrinsics_checkNotNullParameter($byteString, $rt_s(299));
    $offset$iv = 0;
    $byteString = $rt_nullCheck($byteString);
    $byteCount$iv = o_ByteString_size($byteString);
    $byteString.$write$okio($this, $offset$iv, $byteCount$iv);
    return $this;
},
o_Buffer_write0 = ($this, $source) => {
    let var$2;
    kji_Intrinsics_checkNotNullParameter($source, $rt_s(16));
    $source = $rt_nullCheck($source);
    var$2 = o_Buffer_write($this, $source, 0, $source.data.length);
    return var$2;
},
o_Buffer_write = ($this, $source, $offset, $byteCount) => {
    let var$4, var$5, var$6, $limit$iv, $tail$iv, var$9, $toCopy$iv, var$11, var$12;
    kji_Intrinsics_checkNotNullParameter($source, $rt_s(16));
    $source = $rt_nullCheck($source);
    var$4 = Long_fromInt($source.data.length);
    var$5 = Long_fromInt($offset);
    var$6 = Long_fromInt($byteCount);
    o__SegmentedByteString_checkOffsetAndCount(var$4, var$5, var$6);
    $limit$iv = $offset + $byteCount | 0;
    while ($offset < $limit$iv) {
        $tail$iv = o_Buffer_writableSegment$okio($this, 1);
        var$9 = $limit$iv - $offset | 0;
        $tail$iv = $rt_nullCheck($tail$iv);
        $toCopy$iv = jl_Math_min(var$9, 8192 - $tail$iv.$limit0 | 0);
        var$11 = $tail$iv.$data;
        var$9 = $tail$iv.$limit0;
        var$12 = $offset + $toCopy$iv | 0;
        kc_ArraysKt___ArraysJvmKt_copyInto($source, var$11, var$9, $offset, var$12);
        $tail$iv.$limit0 = $tail$iv.$limit0 + $toCopy$iv | 0;
        $offset = var$12;
    }
    o_Buffer_setSize$okio($this, Long_add(o_Buffer_size($this), var$6));
    return $this;
},
o_Buffer_writeAll = ($this, $source) => {
    let $totalBytesRead$iv, $readCount$iv;
    kji_Intrinsics_checkNotNullParameter($source, $rt_s(16));
    $totalBytesRead$iv = Long_ZERO;
    while (true) {
        $source = $rt_nullCheck($source);
        $readCount$iv = $source.$read0($this, Long_fromInt(8192));
        if (Long_eq($readCount$iv, Long_fromInt(-1)))
            break;
        $totalBytesRead$iv = Long_add($totalBytesRead$iv, $readCount$iv);
    }
    return $totalBytesRead$iv;
},
o_Buffer_writeByte = ($this, $b) => {
    let $tail$iv, var$3, var$4, var$5;
    $tail$iv = o_Buffer_writableSegment$okio($this, 1);
    $tail$iv = $rt_nullCheck($tail$iv);
    var$3 = $tail$iv.$data;
    var$4 = $tail$iv.$limit0;
    $tail$iv.$limit0 = var$4 + 1 | 0;
    var$5 = $b << 24 >> 24;
    var$3 = $rt_nullCheck(var$3).data;
    var$3[$rt_checkBounds(var$4, var$3)] = var$5;
    o_Buffer_setSize$okio($this, Long_add(o_Buffer_size($this), Long_fromInt(1)));
    return $this;
},
o_Buffer_writeInt = ($this, $i) => {
    let $tail$iv, $data$iv, $limit$iv, var$5, var$6, var$7, var$8;
    $tail$iv = o_Buffer_writableSegment$okio($this, 4);
    $tail$iv = $rt_nullCheck($tail$iv);
    $data$iv = $tail$iv.$data;
    $limit$iv = $tail$iv.$limit0;
    var$5 = $limit$iv + 1 | 0;
    var$6 = (($i >>> 24 | 0) & 255) << 24 >> 24;
    $data$iv = $rt_nullCheck($data$iv);
    var$7 = $data$iv.data;
    $limit$iv = $rt_checkBounds($limit$iv, var$7);
    var$7[$limit$iv] = var$6;
    var$6 = var$5 + 1 | 0;
    var$8 = (($i >>> 16 | 0) & 255) << 24 >> 24;
    var$7[$rt_checkBounds(var$5, var$7)] = var$8;
    var$5 = var$6 + 1 | 0;
    var$8 = (($i >>> 8 | 0) & 255) << 24 >> 24;
    var$7[$rt_checkBounds(var$6, var$7)] = var$8;
    var$6 = var$5 + 1 | 0;
    var$8 = ($i & 255) << 24 >> 24;
    var$7[$rt_checkBounds(var$5, var$7)] = var$8;
    $tail$iv.$limit0 = var$6;
    o_Buffer_setSize$okio($this, Long_add(o_Buffer_size($this), Long_fromInt(4)));
    return $this;
},
o_Buffer_writeIntLe = ($this, $i) => {
    return o_Buffer_writeInt($this, o__SegmentedByteString_reverseBytes($i));
},
o_Buffer_writeLong = ($this, $v) => {
    let $tail$iv, $data$iv, $limit$iv, var$5, var$6, var$7, var$8;
    $tail$iv = o_Buffer_writableSegment$okio($this, 8);
    $tail$iv = $rt_nullCheck($tail$iv);
    $data$iv = $tail$iv.$data;
    $limit$iv = $tail$iv.$limit0;
    var$5 = $limit$iv + 1 | 0;
    var$6 = Long_lo(Long_and(Long_shru($v, 56), Long_fromInt(255))) << 24 >> 24;
    $data$iv = $rt_nullCheck($data$iv);
    var$7 = $data$iv.data;
    $limit$iv = $rt_checkBounds($limit$iv, var$7);
    var$7[$limit$iv] = var$6;
    var$6 = var$5 + 1 | 0;
    var$8 = Long_lo(Long_and(Long_shru($v, 48), Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$5, var$7)] = var$8;
    var$5 = var$6 + 1 | 0;
    var$8 = Long_lo(Long_and(Long_shru($v, 40), Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$6, var$7)] = var$8;
    var$6 = var$5 + 1 | 0;
    var$8 = Long_lo(Long_and(Long_shru($v, 32), Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$5, var$7)] = var$8;
    var$8 = var$6 + 1 | 0;
    var$5 = Long_lo(Long_and(Long_shru($v, 24), Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$6, var$7)] = var$5;
    var$6 = var$8 + 1 | 0;
    var$5 = Long_lo(Long_and(Long_shru($v, 16), Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$8, var$7)] = var$5;
    var$5 = var$6 + 1 | 0;
    var$8 = Long_lo(Long_and(Long_shru($v, 8), Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$6, var$7)] = var$8;
    var$6 = var$5 + 1 | 0;
    var$8 = Long_lo(Long_and($v, Long_fromInt(255))) << 24 >> 24;
    var$7[$rt_checkBounds(var$5, var$7)] = var$8;
    $tail$iv.$limit0 = var$6;
    o_Buffer_setSize$okio($this, Long_add(o_Buffer_size($this), Long_fromInt(8)));
    return $this;
},
o_Buffer_writeLongLe = ($this, $v) => {
    return o_Buffer_writeLong($this, o__SegmentedByteString_reverseBytes0($v));
},
o_Buffer_writableSegment$okio = ($this, $minimumCapacity) => {
    let $result$iv, var$3, $tail$iv;
    if (!($minimumCapacity >= 1 && $minimumCapacity <= 8192 ? 1 : 0))
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(300).$toString()));
    if ($this.$head === null) {
        $result$iv = o_SegmentPool_take();
        $this.$head = $result$iv;
        $result$iv = $rt_nullCheck($result$iv);
        $result$iv.$prev = $result$iv;
        $result$iv.$next2 = $result$iv;
    } else {
        var$3 = $this.$head;
        kji_Intrinsics_checkNotNull(var$3);
        $tail$iv = $rt_nullCheck(var$3).$prev;
        kji_Intrinsics_checkNotNull($tail$iv);
        $result$iv = $rt_nullCheck($tail$iv);
        if (!(($result$iv.$limit0 + $minimumCapacity | 0) <= 8192 && $result$iv.$owner))
            $result$iv = o_Segment_push($result$iv, o_SegmentPool_take());
    }
    return $result$iv;
},
o_Buffer_write1 = ($this, $source, $byteCount) => {
    let var$3, var$4, $tail$iv, $segmentToMove$iv, $movedByteCount$iv;
    kji_Intrinsics_checkNotNullParameter($source, $rt_s(16));
    if (!($source === $this ? 0 : 1))
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(301).$toString()));
    $source = $rt_nullCheck($source);
    o__SegmentedByteString_checkOffsetAndCount(o_Buffer_size($source), Long_ZERO, $byteCount);
    a: {
        while (Long_gt($byteCount, Long_ZERO)) {
            var$3 = $source.$head;
            kji_Intrinsics_checkNotNull(var$3);
            var$4 = $rt_nullCheck(var$3).$limit0;
            var$3 = $source.$head;
            kji_Intrinsics_checkNotNull(var$3);
            if (Long_lt($byteCount, Long_fromInt(var$4 - $rt_nullCheck(var$3).$pos | 0))) {
                if ($this.$head === null)
                    $tail$iv = null;
                else {
                    var$3 = $this.$head;
                    kji_Intrinsics_checkNotNull(var$3);
                    $tail$iv = $rt_nullCheck(var$3).$prev;
                }
                if ($tail$iv !== null && $tail$iv.$owner && Long_le(Long_sub(Long_add($byteCount, Long_fromInt($tail$iv.$limit0)), Long_fromInt(!$tail$iv.$shared ? $tail$iv.$pos : 0)), Long_fromInt(8192))) {
                    var$3 = $source.$head;
                    kji_Intrinsics_checkNotNull(var$3);
                    o_Segment_writeTo($rt_nullCheck(var$3), $tail$iv, Long_lo($byteCount));
                    o_Buffer_setSize$okio($source, Long_sub(o_Buffer_size($source), $byteCount));
                    o_Buffer_setSize$okio($this, Long_add(o_Buffer_size($this), $byteCount));
                    break a;
                }
                var$3 = $source.$head;
                kji_Intrinsics_checkNotNull(var$3);
                $source.$head = o_Segment_split($rt_nullCheck(var$3), Long_lo($byteCount));
            }
            $segmentToMove$iv = $source.$head;
            kji_Intrinsics_checkNotNull($segmentToMove$iv);
            $segmentToMove$iv = $rt_nullCheck($segmentToMove$iv);
            $movedByteCount$iv = Long_fromInt($segmentToMove$iv.$limit0 - $segmentToMove$iv.$pos | 0);
            $source.$head = o_Segment_pop($segmentToMove$iv);
            if ($this.$head === null) {
                $this.$head = $segmentToMove$iv;
                $segmentToMove$iv.$prev = $segmentToMove$iv;
                $segmentToMove$iv.$next2 = $segmentToMove$iv.$prev;
            } else {
                var$3 = $this.$head;
                kji_Intrinsics_checkNotNull(var$3);
                $tail$iv = $rt_nullCheck(var$3).$prev;
                kji_Intrinsics_checkNotNull($tail$iv);
                $tail$iv = $rt_nullCheck($tail$iv);
                var$3 = o_Segment_push($tail$iv, $segmentToMove$iv);
                o_Segment_compact($rt_nullCheck(var$3));
            }
            o_Buffer_setSize$okio($source, Long_sub(o_Buffer_size($source), $movedByteCount$iv));
            o_Buffer_setSize$okio($this, Long_add(o_Buffer_size($this), $movedByteCount$iv));
            $byteCount = Long_sub($byteCount, $movedByteCount$iv);
        }
    }
},
o_Buffer_read0 = ($this, $sink, $byteCount) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($sink, $rt_s(14));
    if (!(Long_lt($byteCount, Long_ZERO) ? 0 : 1)) {
        var$3 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(302))).$append9($byteCount)).$toString();
        $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck(var$3).$toString()));
    }
    if (Long_eq(o_Buffer_size($this), Long_ZERO))
        $byteCount = Long_fromInt(-1);
    else {
        if (Long_gt($byteCount, o_Buffer_size($this)))
            $byteCount = o_Buffer_size($this);
        $sink = $rt_nullCheck($sink);
        o_Buffer_write1($sink, $this, $byteCount);
    }
    return $byteCount;
},
o_Buffer_equals = ($this, $other) => {
    let var$2, var$3, var$4, $sa$iv, $sb$iv, $posA$iv, $posB$iv, $pos$iv, $i$iv, var$11, var$12, var$13;
    a: {
        if ($this === $other)
            var$2 = 1;
        else if (!($other instanceof o_Buffer))
            var$2 = 0;
        else {
            var$3 = o_Buffer_size($this);
            var$4 = $rt_nullCheck($rt_castToClass($other, o_Buffer));
            if (Long_ne(var$3, o_Buffer_size(var$4)))
                var$2 = 0;
            else if (Long_eq(o_Buffer_size($this), Long_ZERO))
                var$2 = 1;
            else {
                $sa$iv = $this.$head;
                kji_Intrinsics_checkNotNull($sa$iv);
                $sb$iv = var$4.$head;
                kji_Intrinsics_checkNotNull($sb$iv);
                $sa$iv = $rt_nullCheck($sa$iv);
                $posA$iv = $sa$iv.$pos;
                $sb$iv = $rt_nullCheck($sb$iv);
                $posB$iv = $sb$iv.$pos;
                $pos$iv = Long_ZERO;
                while (Long_lt($pos$iv, o_Buffer_size($this))) {
                    var$3 = Long_fromInt(jl_Math_min($sa$iv.$limit0 - $posA$iv | 0, $sb$iv.$limit0 - $posB$iv | 0));
                    $i$iv = Long_ZERO;
                    while (Long_lt($i$iv, var$3)) {
                        var$11 = $sa$iv.$data;
                        var$12 = $posA$iv + 1 | 0;
                        var$11 = $rt_nullCheck(var$11).data;
                        var$13 = var$11[$rt_checkBounds($posA$iv, var$11)];
                        var$11 = $sb$iv.$data;
                        var$2 = $posB$iv + 1 | 0;
                        var$11 = $rt_nullCheck(var$11).data;
                        if (var$13 != var$11[$rt_checkBounds($posB$iv, var$11)]) {
                            var$2 = 0;
                            break a;
                        }
                        $i$iv = Long_add($i$iv, Long_fromInt(1));
                        $posA$iv = var$12;
                        $posB$iv = var$2;
                    }
                    if ($posA$iv == $sa$iv.$limit0) {
                        var$4 = $sa$iv.$next2;
                        kji_Intrinsics_checkNotNull(var$4);
                        $sa$iv = $rt_nullCheck(var$4);
                        $posA$iv = $sa$iv.$pos;
                    }
                    if ($posB$iv == $sb$iv.$limit0) {
                        var$4 = $sb$iv.$next2;
                        kji_Intrinsics_checkNotNull(var$4);
                        $sb$iv = $rt_nullCheck(var$4);
                        $posB$iv = $sb$iv.$pos;
                    }
                    $pos$iv = Long_add($pos$iv, var$3);
                }
                var$2 = 1;
            }
        }
    }
    return var$2;
},
o_Buffer_toString = $this => {
    return $rt_nullCheck(o_Buffer_snapshot0($this)).$toString();
},
o_Buffer_snapshot0 = $this => {
    let var$1;
    if (Long_gt(o_Buffer_size($this), Long_fromInt(2147483647)) ? 0 : 1) {
        var$1 = o_Buffer_snapshot($this, Long_lo((o_Buffer_size($this))));
        return var$1;
    }
    var$1 = $rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(303))).$append9(o_Buffer_size($this))).$toString();
    $rt_throw(jl_IllegalStateException__init_($rt_nullCheck(var$1).$toString()));
},
o_Buffer_snapshot = ($this, $byteCount) => {
    let var$2, $offset$iv, $segmentCount$iv, $s$iv, $segments$iv, $directory$iv, var$8, var$9, var$10, var$11, var$12, var$13, var$14;
    a: {
        if (!$byteCount) {
            o_ByteString_$callClinit();
            var$2 = o_ByteString_EMPTY;
        } else {
            o__SegmentedByteString_checkOffsetAndCount(o_Buffer_size($this), Long_ZERO, Long_fromInt($byteCount));
            $offset$iv = 0;
            $segmentCount$iv = 0;
            $s$iv = $this.$head;
            while (true) {
                if ($offset$iv >= $byteCount) {
                    $segments$iv = $rt_createArray($rt_arraycls($rt_bytecls), $segmentCount$iv);
                    $directory$iv = $rt_createIntArray($segmentCount$iv * 2 | 0);
                    var$8 = 0;
                    var$9 = 0;
                    var$2 = $this.$head;
                    while (var$8 < $byteCount) {
                        var$10 = $directory$iv.data;
                        var$11 = $segments$iv.data;
                        kji_Intrinsics_checkNotNull(var$2);
                        var$2 = $rt_nullCheck(var$2);
                        var$12 = var$2.$data;
                        var$9 = $rt_checkBounds(var$9, var$11);
                        var$11[var$9] = var$12;
                        var$8 = var$8 + (var$2.$limit0 - var$2.$pos | 0) | 0;
                        var$13 = jl_Math_min(var$8, $byteCount);
                        var$14 = $rt_checkUpperBound(var$9, var$10);
                        var$10[var$14] = var$13;
                        var$9 = var$14 + $rt_nullCheck($rt_castToInterface($segments$iv, $rt_arraycls(jl_Object))).data.length | 0;
                        var$10[$rt_checkBounds(var$9, var$10)] = var$2.$pos;
                        var$2.$shared = 1;
                        var$9 = var$14 + 1 | 0;
                        var$2 = var$2.$next2;
                    }
                    var$2 = $rt_castToClass(o_SegmentedByteString__init_0($segments$iv, $directory$iv), o_ByteString);
                    break a;
                }
                kji_Intrinsics_checkNotNull($s$iv);
                $s$iv = $rt_nullCheck($s$iv);
                if ($s$iv.$limit0 == $s$iv.$pos)
                    break;
                $offset$iv = $offset$iv + ($s$iv.$limit0 - $s$iv.$pos | 0) | 0;
                $segmentCount$iv = $segmentCount$iv + 1 | 0;
                $s$iv = $s$iv.$next2;
            }
            $rt_throw(jl_AssertionError__init_0($rt_s(304)));
        }
    }
    return var$2;
},
o_Buffer_readAndWriteUnsafe = ($this, $unsafeCursor) => {
    kji_Intrinsics_checkNotNullParameter($unsafeCursor, $rt_s(30));
    return oi__Buffer_commonReadAndWriteUnsafe($this, $unsafeCursor);
},
o_Buffer_write3 = ($this, $byteString) => {
    return $rt_castToInterface(o_Buffer_write2($this, $byteString), o_BufferedSink);
},
o_Buffer_writeByte0 = ($this, $b) => {
    return $rt_castToInterface(o_Buffer_writeByte($this, $b), o_BufferedSink);
},
o_Buffer_writeIntLe0 = ($this, $i) => {
    return $rt_castToInterface(o_Buffer_writeIntLe($this, $i), o_BufferedSink);
},
o_Buffer_writeLongLe0 = ($this, $v) => {
    return $rt_castToInterface(o_Buffer_writeLongLe($this, $v), o_BufferedSink);
},
csw_ProtoAdapterKt$commonEmpty$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonEmpty$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(305), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonEmpty$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonEmpty$1();
    csw_ProtoAdapterKt$commonEmpty$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonEmpty$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
},
csw_ProtoAdapterKt$commonEmpty$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonEmpty$1_encode($this, $writer, $rt_castToClass($value, k_Unit));
},
kc_EmptyList = $rt_classWithoutFields(),
kc_EmptyList_INSTANCE = null,
kc_EmptyList_$callClinit = () => {
    kc_EmptyList_$callClinit = $rt_eraseClinit(kc_EmptyList);
    kc_EmptyList__clinit_();
},
kc_EmptyList__init_ = $this => {
    kc_EmptyList_$callClinit();
    jl_Object__init_($this);
};
let kc_EmptyList__init_0 = () => {
    let var_0 = new kc_EmptyList();
    kc_EmptyList__init_(var_0);
    return var_0;
},
kc_EmptyList_equals = ($this, $other) => {
    return $rt_isInstance($other, ju_List) && $rt_nullCheck($rt_castToInterface($other, ju_List)).$isEmpty() ? 1 : 0;
},
kc_EmptyList_toString = $this => {
    return $rt_s(306);
},
kc_EmptyList_getSize = $this => {
    return 0;
},
kc_EmptyList_isEmpty = $this => {
    return 1;
},
kc_EmptyList_get = ($this, $index) => {
    $rt_throw(jl_IndexOutOfBoundsException__init_2($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(307))).$append4($index)).$append0(46)).$toString()));
},
kc_EmptyList_iterator = $this => {
    kc_EmptyIterator_$callClinit();
    return $rt_castToInterface(kc_EmptyIterator_INSTANCE, ju_Iterator);
},
kc_EmptyList_size = $this => {
    return kc_EmptyList_getSize($this);
},
kc_EmptyList_get0 = ($this, $index) => {
    return kc_EmptyList_get($this, $index);
},
kc_EmptyList__clinit_ = () => {
    kc_EmptyList_INSTANCE = kc_EmptyList__init_0();
};
function ju_AbstractMap$SimpleImmutableEntry() {
    let a = this; jl_Object.call(a);
    a.$key1 = null;
    a.$value9 = null;
}
let ju_AbstractMap$SimpleImmutableEntry__init_ = ($this, $key, $value) => {
    jl_Object__init_($this);
    $this.$key1 = $key;
    $this.$value9 = $value;
},
ju_AbstractMap$SimpleImmutableEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_AbstractMap$SimpleImmutableEntry();
    ju_AbstractMap$SimpleImmutableEntry__init_(var_2, var_0, var_1);
    return var_2;
},
ju_AbstractMap$SimpleImmutableEntry_getValue = $this => {
    return $this.$value9;
},
ju_AbstractMap$SimpleImmutableEntry_getKey = $this => {
    return $this.$key1;
};
function uciisdp_Department() {
    let a = this; csw_Message.call(a);
    a.$name4 = null;
    a.$manager0 = null;
    a.$employees0 = null;
}
let uciisdp_Department_ADAPTER = null,
uciisdp_Department_$callClinit = () => {
    uciisdp_Department_$callClinit = $rt_eraseClinit(uciisdp_Department);
    uciisdp_Department__clinit_();
},
uciisdp_Department__init_ = ($this, $name, $manager, $employees, $unknownFields) => {
    uciisdp_Department_$callClinit();
    csw_Message__init_($this, uciisdp_Department_ADAPTER, $unknownFields);
    if ($name === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(274)));
    $this.$name4 = $name;
    $this.$manager0 = $manager;
    $this.$employees0 = cswi_Internal_immutableCopyOf($rt_s(308), $employees);
},
uciisdp_Department__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new uciisdp_Department();
    uciisdp_Department__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
uciisdp_Department_equals = ($this, $other) => {
    let $o, var$3, var$4, var$5;
    if ($other === $this)
        return 1;
    if (!($other instanceof uciisdp_Department))
        return 0;
    a: {
        $o = $rt_castToClass($other, uciisdp_Department);
        var$3 = csw_Message_unknownFields($this);
        $o = $rt_nullCheck($o);
        if ($rt_nullCheck(var$3).$equals0(csw_Message_unknownFields($o))) {
            var$3 = $this.$name4;
            var$4 = $o.$name4;
            if (cswi_Internal_equals(var$3, var$4)) {
                var$3 = $this.$manager0;
                var$4 = $o.$manager0;
                if (cswi_Internal_equals(var$3, var$4)) {
                    var$3 = $this.$employees0;
                    var$4 = $o.$employees0;
                    if ($rt_nullCheck(var$3).$equals0(var$4)) {
                        var$5 = 1;
                        break a;
                    }
                }
            }
        }
        var$5 = 0;
    }
    return var$5;
},
uciisdp_Department_toString = $this => {
    let $builder;
    $builder = jl_StringBuilder__init_();
    if ($this.$name4 !== null)
        $rt_nullCheck($builder.$append3($rt_s(309))).$append3(cswi_Internal_sanitize($this.$name4));
    if ($this.$manager0 !== null)
        $rt_nullCheck($builder.$append3($rt_s(310))).$append($this.$manager0);
    if (!$rt_nullCheck($this.$employees0).$isEmpty())
        $rt_nullCheck($builder.$append3($rt_s(311))).$append($this.$employees0);
    return $rt_nullCheck($rt_nullCheck($builder.$replace1(0, 2, $rt_s(312))).$append0(125)).$toString();
},
uciisdp_Department__clinit_ = () => {
    uciisdp_Department_ADAPTER = uciisdp_Department$ProtoAdapter_Department__init_0();
},
kr_RangesKt___RangesKt = $rt_classWithoutFields(kr_RangesKt__RangesKt),
kr_RangesKt___RangesKt_downTo = ($$this$downTo, $to) => {
    kr_IntProgression_$callClinit();
    return kr_IntProgression$Companion_fromClosedRange($rt_nullCheck(kr_IntProgression_Companion), $$this$downTo, $to, (-1));
},
kr_RangesKt___RangesKt_coerceAtLeast = ($$this$coerceAtLeast, $minimumValue) => {
    if ($$this$coerceAtLeast < $minimumValue)
        $$this$coerceAtLeast = $minimumValue;
    return $$this$coerceAtLeast;
},
kr_RangesKt___RangesKt_coerceAtMost = ($$this$coerceAtMost, $maximumValue) => {
    if ($$this$coerceAtMost > $maximumValue)
        $$this$coerceAtMost = $maximumValue;
    return $$this$coerceAtMost;
},
uciisd_DepartmentCodec$toWire$lambda$_1_0 = $rt_classWithoutFields(),
uciisd_DepartmentCodec$toWire$lambda$_1_0__init_ = var$0 => {
    jl_Object__init_(var$0);
},
uciisd_DepartmentCodec$toWire$lambda$_1_0__init_0 = () => {
    let var_0 = new uciisd_DepartmentCodec$toWire$lambda$_1_0();
    uciisd_DepartmentCodec$toWire$lambda$_1_0__init_(var_0);
    return var_0;
},
kr_IntRange$Companion = $rt_classWithoutFields(),
kr_IntRange$Companion__init_0 = $this => {
    jl_Object__init_($this);
},
kr_IntRange$Companion__init_2 = () => {
    let var_0 = new kr_IntRange$Companion();
    kr_IntRange$Companion__init_0(var_0);
    return var_0;
},
kr_IntRange$Companion__init_ = ($this, $$constructor_marker) => {
    kr_IntRange$Companion__init_0($this);
},
kr_IntRange$Companion__init_1 = var_0 => {
    let var_1 = new kr_IntRange$Companion();
    kr_IntRange$Companion__init_(var_1, var_0);
    return var_1;
},
jl_System = $rt_classWithoutFields(),
jl_System_outCache = null,
jl_System_errCache = null,
jl_System_out = () => {
    if (jl_System_outCache === null)
        jl_System_outCache = $rt_castToClass(otcic_JSStdoutPrintStream__init_0(), ji_PrintStream);
    return jl_System_outCache;
},
jl_System_err = () => {
    if (jl_System_errCache === null)
        jl_System_errCache = $rt_castToClass(otcic_JSStderrPrintStream__init_0(), ji_PrintStream);
    return jl_System_errCache;
},
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6, $srcType, $targetType, $srcArray, $i, var$11, var$12, $elem;
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
                                        if (!$targetType.$isInstance0($elem)) {
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
        $rt_throw(jl_IndexOutOfBoundsException__init_0());
    }
    $rt_throw(jl_NullPointerException__init_($rt_s(313)));
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let var$6;
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src)) {
        var$6 = $destPos + $length | 0;
        if (var$6 <= jlr_Array_getLength($dest)) {
            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
            return;
        }
    }
    $rt_throw(jl_IndexOutOfBoundsException__init_0());
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jl_Void = $rt_classWithoutFields(),
csw_ProtoAdapterKt$commonFixed32$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonFixed32$1__init_ = ($this, var$1, var$2, var$3) => {
    let var$4, var$5;
    var$4 = null;
    var$5 = jl_Integer_valueOf(0);
    csw_ProtoAdapter__init_($this, var$1, var$2, var$4, var$3, var$5);
},
csw_ProtoAdapterKt$commonFixed32$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonFixed32$1();
    csw_ProtoAdapterKt$commonFixed32$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonFixed32$1_encodedSize = ($this, $value) => {
    return 4;
},
csw_ProtoAdapterKt$commonFixed32$1_encode0 = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ProtoWriter_writeFixed32($writer, $value);
},
csw_ProtoAdapterKt$commonFixed32$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeFixed32($writer, $value);
},
csw_ProtoAdapterKt$commonFixed32$1_decode = ($this, $reader) => {
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    return jl_Integer_valueOf(csw_ProtoReader_readFixed32($reader));
},
csw_ProtoAdapterKt$commonFixed32$1_encodedSize0 = ($this, $value) => {
    return csw_ProtoAdapterKt$commonFixed32$1_encodedSize($this, $rt_nullCheck($rt_castToClass($value, jl_Number)).$intValue());
},
csw_ProtoAdapterKt$commonFixed32$1_encode2 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonFixed32$1_encode0($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$intValue());
},
csw_ProtoAdapterKt$commonFixed32$1_encode1 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonFixed32$1_encode($this, $writer, $rt_nullCheck($rt_castToClass($value, jl_Number)).$intValue());
},
csw_ProtoAdapterKt$commonFixed32$1_decode0 = ($this, $reader) => {
    return csw_ProtoAdapterKt$commonFixed32$1_decode($this, $reader);
},
oi__ByteString = $rt_classWithoutFields(),
oi__ByteString_HEX_DIGIT_CHARS = null,
oi__ByteString_$callClinit = () => {
    oi__ByteString_$callClinit = $rt_eraseClinit(oi__ByteString);
    oi__ByteString__clinit_();
},
oi__ByteString_getHEX_DIGIT_CHARS = () => {
    oi__ByteString_$callClinit();
    return oi__ByteString_HEX_DIGIT_CHARS;
},
oi__ByteString_commonWrite = ($$this$commonWrite, $buffer, $offset, $byteCount) => {
    let var$5;
    oi__ByteString_$callClinit();
    kji_Intrinsics_checkNotNullParameter($$this$commonWrite, $rt_s(29));
    kji_Intrinsics_checkNotNullParameter($buffer, $rt_s(41));
    $$this$commonWrite = $rt_nullCheck($$this$commonWrite);
    var$5 = o_ByteString_getData$okio($$this$commonWrite);
    $buffer = $rt_nullCheck($buffer);
    o_Buffer_write($buffer, var$5, $offset, $byteCount);
},
oi__ByteString_codePointIndexToCharIndex = ($s, $codePointCount) => {
    let $charCount, $j, $index$iv, var$6, $endIndex$iv, $b0$iv, var$9, var$10, $index$iv_0, $c, $other$iv$iv, $b0$iv$iv, $b1$iv$iv, $other$iv$iv$iv$iv, $codePoint$iv$iv, $byte$iv$iv$iv, $b2$iv$iv, $b3$iv$iv, var$21;
    oi__ByteString_$callClinit();
    $charCount = 0;
    $j = 0;
    $index$iv = 0;
    $s = $rt_nullCheck($s);
    var$6 = $s.data;
    $endIndex$iv = var$6.length;
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                h: {
                                    i: {
                                        j: {
                                            k: {
                                                l: {
                                                    m: {
                                                        n: {
                                                            o: {
                                                                p: {
                                                                    q: {
                                                                        r: {
                                                                            s: {
                                                                                t: {
                                                                                    u: {
                                                                                        v: while ($index$iv < $endIndex$iv) {
                                                                                            $index$iv = $rt_checkLowerBound($index$iv);
                                                                                            $b0$iv = var$6[$index$iv];
                                                                                            if ($b0$iv >= 0) {
                                                                                                var$9 = $j + 1 | 0;
                                                                                                if ($j == $codePointCount)
                                                                                                    return $charCount;
                                                                                                if ($b0$iv != 10 && $b0$iv != 13) {
                                                                                                    var$10 = 0 > $b0$iv ? 0 : $b0$iv >= 32 ? 0 : 1;
                                                                                                    if (!var$10 && !(127 > $b0$iv ? 0 : $b0$iv >= 160 ? 0 : 1) ? 0 : 1)
                                                                                                        break t;
                                                                                                }
                                                                                                if ($b0$iv == 65533)
                                                                                                    break t;
                                                                                                $charCount = $charCount + ($b0$iv >= 65536 ? 2 : 1) | 0;
                                                                                                $index$iv = $index$iv + 1 | 0;
                                                                                                while ($index$iv < $endIndex$iv) {
                                                                                                    $index$iv_0 = $rt_checkLowerBound($index$iv);
                                                                                                    if (var$6[$index$iv_0] < 0) {
                                                                                                        $j = var$9;
                                                                                                        $index$iv = $index$iv_0;
                                                                                                        continue v;
                                                                                                    }
                                                                                                    $index$iv = $index$iv_0 + 1 | 0;
                                                                                                    $c = var$6[$index$iv_0];
                                                                                                    var$10 = var$9 + 1 | 0;
                                                                                                    if (var$9 == $codePointCount)
                                                                                                        return $charCount;
                                                                                                    if ($c != 10 && $c != 13) {
                                                                                                        var$9 = 0 > $c ? 0 : $c >= 32 ? 0 : 1;
                                                                                                        if (!var$9 && !(127 > $c ? 0 : $c >= 160 ? 0 : 1) ? 0 : 1)
                                                                                                            break u;
                                                                                                    }
                                                                                                    if ($c == 65533)
                                                                                                        break u;
                                                                                                    $charCount = $charCount + ($c >= 65536 ? 2 : 1) | 0;
                                                                                                    var$9 = var$10;
                                                                                                }
                                                                                                $j = var$9;
                                                                                                continue;
                                                                                            }
                                                                                            $other$iv$iv = 5;
                                                                                            var$9 = $b0$iv >> $other$iv$iv;
                                                                                            if (var$9 == (-2)) {
                                                                                                var$9 = $index$iv + 1 | 0;
                                                                                                if ($endIndex$iv <= var$9) {
                                                                                                    var$9 = $j + 1 | 0;
                                                                                                    if ($j == $codePointCount)
                                                                                                        return $charCount;
                                                                                                    if (1 && 1) {
                                                                                                        var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                        if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                            break a;
                                                                                                    }
                                                                                                    if (!0)
                                                                                                        break a;
                                                                                                    $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                    var$10 = 1;
                                                                                                } else {
                                                                                                    $b0$iv$iv = var$6[$index$iv];
                                                                                                    $b1$iv$iv = var$6[$rt_checkBounds(var$9, var$6)];
                                                                                                    $other$iv$iv$iv$iv = 192;
                                                                                                    var$9 = $b1$iv$iv & $other$iv$iv$iv$iv;
                                                                                                    if (!(var$9 != 128 ? 0 : 1)) {
                                                                                                        var$9 = $j + 1 | 0;
                                                                                                        if ($j == $codePointCount)
                                                                                                            return $charCount;
                                                                                                        if (1 && 1) {
                                                                                                            var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                            if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                break b;
                                                                                                        }
                                                                                                        if (!0)
                                                                                                            break b;
                                                                                                        $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                        var$10 = 1;
                                                                                                    } else {
                                                                                                        var$9 = 3968 ^ $b1$iv$iv;
                                                                                                        var$10 = $b0$iv$iv << 6;
                                                                                                        $codePoint$iv$iv = var$9 ^ var$10;
                                                                                                        if ($codePoint$iv$iv < 128) {
                                                                                                            var$9 = $j + 1 | 0;
                                                                                                            if ($j == $codePointCount)
                                                                                                                return $charCount;
                                                                                                            if (1 && 1) {
                                                                                                                var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                    break c;
                                                                                                            }
                                                                                                            if (!0)
                                                                                                                break c;
                                                                                                            $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                        } else {
                                                                                                            var$9 = $j + 1 | 0;
                                                                                                            if ($j == $codePointCount)
                                                                                                                return $charCount;
                                                                                                            if ($codePoint$iv$iv != 10 && $codePoint$iv$iv != 13) {
                                                                                                                var$10 = 0 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 32 ? 0 : 1;
                                                                                                                if (!var$10 && !(127 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 160 ? 0 : 1) ? 0 : 1)
                                                                                                                    break d;
                                                                                                            }
                                                                                                            if ($codePoint$iv$iv == 65533)
                                                                                                                break d;
                                                                                                            $charCount = $charCount + ($codePoint$iv$iv >= 65536 ? 2 : 1) | 0;
                                                                                                        }
                                                                                                        var$10 = 2;
                                                                                                    }
                                                                                                }
                                                                                                $index$iv = $index$iv + var$10 | 0;
                                                                                                $j = var$9;
                                                                                                continue;
                                                                                            }
                                                                                            $other$iv$iv = 4;
                                                                                            var$9 = $b0$iv >> $other$iv$iv;
                                                                                            if (var$9 == (-2)) {
                                                                                                w: {
                                                                                                    var$9 = $index$iv + 2 | 0;
                                                                                                    if ($endIndex$iv <= var$9) {
                                                                                                        var$9 = $j + 1 | 0;
                                                                                                        if ($j == $codePointCount)
                                                                                                            return $charCount;
                                                                                                        if (1 && 1) {
                                                                                                            var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                            if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                break e;
                                                                                                        }
                                                                                                        if (!0)
                                                                                                            break e;
                                                                                                        $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                        var$10 = $index$iv + 1 | 0;
                                                                                                        if ($endIndex$iv > var$10) {
                                                                                                            $byte$iv$iv$iv = var$6[$rt_checkBounds(var$10, var$6)];
                                                                                                            $other$iv$iv$iv$iv = 192;
                                                                                                            var$10 = $byte$iv$iv$iv & $other$iv$iv$iv$iv;
                                                                                                            if (var$10 != 128 ? 0 : 1) {
                                                                                                                var$10 = 2;
                                                                                                                break w;
                                                                                                            }
                                                                                                        }
                                                                                                        var$10 = 1;
                                                                                                    } else {
                                                                                                        $b0$iv$iv = var$6[$index$iv];
                                                                                                        $b1$iv$iv = var$6[$rt_checkBounds($index$iv + 1 | 0, var$6)];
                                                                                                        $other$iv$iv$iv$iv = 192;
                                                                                                        var$10 = $b1$iv$iv & $other$iv$iv$iv$iv;
                                                                                                        if (!(var$10 != 128 ? 0 : 1)) {
                                                                                                            var$9 = $j + 1 | 0;
                                                                                                            if ($j == $codePointCount)
                                                                                                                return $charCount;
                                                                                                            if (1 && 1) {
                                                                                                                var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                    break f;
                                                                                                            }
                                                                                                            if (!0)
                                                                                                                break f;
                                                                                                            $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                            var$10 = 1;
                                                                                                        } else {
                                                                                                            $b2$iv$iv = var$6[$rt_checkBounds(var$9, var$6)];
                                                                                                            $other$iv$iv$iv$iv = 192;
                                                                                                            var$9 = $b2$iv$iv & $other$iv$iv$iv$iv;
                                                                                                            if (!(var$9 != 128 ? 0 : 1)) {
                                                                                                                var$9 = $j + 1 | 0;
                                                                                                                if ($j == $codePointCount)
                                                                                                                    return $charCount;
                                                                                                                if (1 && 1) {
                                                                                                                    var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                    if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                        break g;
                                                                                                                }
                                                                                                                if (!0)
                                                                                                                    break g;
                                                                                                                $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                var$10 = 2;
                                                                                                            } else {
                                                                                                                var$9 = (-123008) ^ $b2$iv$iv;
                                                                                                                var$10 = $b1$iv$iv << 6;
                                                                                                                var$9 = var$9 ^ var$10;
                                                                                                                var$10 = $b0$iv$iv << 12;
                                                                                                                $codePoint$iv$iv = var$9 ^ var$10;
                                                                                                                if ($codePoint$iv$iv < 2048) {
                                                                                                                    var$9 = $j + 1 | 0;
                                                                                                                    if ($j == $codePointCount)
                                                                                                                        return $charCount;
                                                                                                                    if (1 && 1) {
                                                                                                                        var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                        if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                            break h;
                                                                                                                    }
                                                                                                                    if (!0)
                                                                                                                        break h;
                                                                                                                    $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                } else if (55296 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 57344 ? 0 : 1) {
                                                                                                                    var$9 = $j + 1 | 0;
                                                                                                                    if ($j == $codePointCount)
                                                                                                                        return $charCount;
                                                                                                                    if (1 && 1) {
                                                                                                                        var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                        if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                            break i;
                                                                                                                    }
                                                                                                                    if (!0)
                                                                                                                        break i;
                                                                                                                    $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                } else {
                                                                                                                    var$9 = $j + 1 | 0;
                                                                                                                    if ($j == $codePointCount)
                                                                                                                        return $charCount;
                                                                                                                    if ($codePoint$iv$iv != 10 && $codePoint$iv$iv != 13) {
                                                                                                                        var$10 = 0 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 32 ? 0 : 1;
                                                                                                                        if (!var$10 && !(127 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 160 ? 0 : 1) ? 0 : 1)
                                                                                                                            break j;
                                                                                                                    }
                                                                                                                    if ($codePoint$iv$iv == 65533)
                                                                                                                        break j;
                                                                                                                    $charCount = $charCount + ($codePoint$iv$iv >= 65536 ? 2 : 1) | 0;
                                                                                                                }
                                                                                                                var$10 = 3;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                                $index$iv = $index$iv + var$10 | 0;
                                                                                                $j = var$9;
                                                                                                continue;
                                                                                            }
                                                                                            $other$iv$iv = 3;
                                                                                            var$9 = $b0$iv >> $other$iv$iv;
                                                                                            if (var$9 != (-2)) {
                                                                                                var$9 = $j + 1 | 0;
                                                                                                if ($j == $codePointCount)
                                                                                                    return $charCount;
                                                                                                if (1 && 1) {
                                                                                                    var$10 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                    if (!var$10 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                        break s;
                                                                                                }
                                                                                                if (!0)
                                                                                                    break s;
                                                                                                $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                $index$iv = $index$iv + 1 | 0;
                                                                                                $j = var$9;
                                                                                                continue;
                                                                                            }
                                                                                            x: {
                                                                                                var$9 = $index$iv + 3 | 0;
                                                                                                if ($endIndex$iv <= var$9) {
                                                                                                    var$10 = $j + 1 | 0;
                                                                                                    if ($j == $codePointCount)
                                                                                                        return $charCount;
                                                                                                    if (1 && 1) {
                                                                                                        var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                        if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                            break k;
                                                                                                    }
                                                                                                    if (!0)
                                                                                                        break k;
                                                                                                    $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                    var$9 = $index$iv + 1 | 0;
                                                                                                    if ($endIndex$iv > var$9) {
                                                                                                        $byte$iv$iv$iv = var$6[$rt_checkBounds(var$9, var$6)];
                                                                                                        $other$iv$iv$iv$iv = 192;
                                                                                                        var$9 = $byte$iv$iv$iv & $other$iv$iv$iv$iv;
                                                                                                        if (var$9 != 128 ? 0 : 1) {
                                                                                                            var$9 = $index$iv + 2 | 0;
                                                                                                            if ($endIndex$iv > var$9) {
                                                                                                                $byte$iv$iv$iv = var$6[$rt_checkBounds(var$9, var$6)];
                                                                                                                $other$iv$iv$iv$iv = 192;
                                                                                                                var$9 = $byte$iv$iv$iv & $other$iv$iv$iv$iv;
                                                                                                                if (var$9 != 128 ? 0 : 1) {
                                                                                                                    var$9 = 3;
                                                                                                                    break x;
                                                                                                                }
                                                                                                            }
                                                                                                            var$9 = 2;
                                                                                                            break x;
                                                                                                        }
                                                                                                    }
                                                                                                    var$9 = 1;
                                                                                                } else {
                                                                                                    $b0$iv$iv = var$6[$index$iv];
                                                                                                    $b1$iv$iv = var$6[$rt_checkBounds($index$iv + 1 | 0, var$6)];
                                                                                                    $other$iv$iv$iv$iv = 192;
                                                                                                    var$10 = $b1$iv$iv & $other$iv$iv$iv$iv;
                                                                                                    if (!(var$10 != 128 ? 0 : 1)) {
                                                                                                        var$10 = $j + 1 | 0;
                                                                                                        if ($j == $codePointCount)
                                                                                                            return $charCount;
                                                                                                        if (1 && 1) {
                                                                                                            var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                            if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                break l;
                                                                                                        }
                                                                                                        if (!0)
                                                                                                            break l;
                                                                                                        $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                        var$9 = 1;
                                                                                                    } else {
                                                                                                        $b2$iv$iv = var$6[$rt_checkBounds($index$iv + 2 | 0, var$6)];
                                                                                                        $other$iv$iv$iv$iv = 192;
                                                                                                        var$10 = $b2$iv$iv & $other$iv$iv$iv$iv;
                                                                                                        if (!(var$10 != 128 ? 0 : 1)) {
                                                                                                            var$10 = $j + 1 | 0;
                                                                                                            if ($j == $codePointCount)
                                                                                                                return $charCount;
                                                                                                            if (1 && 1) {
                                                                                                                var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                    break m;
                                                                                                            }
                                                                                                            if (!0)
                                                                                                                break m;
                                                                                                            $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                            var$9 = 2;
                                                                                                        } else {
                                                                                                            $b3$iv$iv = var$6[$rt_checkBounds(var$9, var$6)];
                                                                                                            $other$iv$iv$iv$iv = 192;
                                                                                                            var$9 = $b3$iv$iv & $other$iv$iv$iv$iv;
                                                                                                            if (!(var$9 != 128 ? 0 : 1)) {
                                                                                                                var$10 = $j + 1 | 0;
                                                                                                                if ($j == $codePointCount)
                                                                                                                    return $charCount;
                                                                                                                if (1 && 1) {
                                                                                                                    var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                    if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                        break n;
                                                                                                                }
                                                                                                                if (!0)
                                                                                                                    break n;
                                                                                                                $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                var$9 = 3;
                                                                                                            } else {
                                                                                                                var$9 = 3678080 ^ $b3$iv$iv;
                                                                                                                var$10 = $b2$iv$iv << 6;
                                                                                                                var$9 = var$9 ^ var$10;
                                                                                                                var$10 = $b1$iv$iv << 12;
                                                                                                                var$9 = var$9 ^ var$10;
                                                                                                                var$10 = $b0$iv$iv << 18;
                                                                                                                $codePoint$iv$iv = var$9 ^ var$10;
                                                                                                                if ($codePoint$iv$iv > 1114111) {
                                                                                                                    var$10 = $j + 1 | 0;
                                                                                                                    if ($j == $codePointCount)
                                                                                                                        return $charCount;
                                                                                                                    if (1 && 1) {
                                                                                                                        var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                        if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                            break o;
                                                                                                                    }
                                                                                                                    if (!0)
                                                                                                                        break o;
                                                                                                                    $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                } else if (55296 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 57344 ? 0 : 1) {
                                                                                                                    var$10 = $j + 1 | 0;
                                                                                                                    if ($j == $codePointCount)
                                                                                                                        return $charCount;
                                                                                                                    if (1 && 1) {
                                                                                                                        var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                        if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                            break p;
                                                                                                                    }
                                                                                                                    if (!0)
                                                                                                                        break p;
                                                                                                                    $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                } else {
                                                                                                                    var$9 = $rt_compare($codePoint$iv$iv, 65536);
                                                                                                                    if (var$9 < 0) {
                                                                                                                        var$10 = $j + 1 | 0;
                                                                                                                        if ($j == $codePointCount)
                                                                                                                            return $charCount;
                                                                                                                        if (1 && 1) {
                                                                                                                            var$9 = (-1) > 0 ? 0 : 1 >= 0 ? 0 : 1;
                                                                                                                            if (!var$9 && !((-1) > 0 ? 0 : 1 >= 0 ? 0 : 1) ? 0 : 1)
                                                                                                                                break q;
                                                                                                                        }
                                                                                                                        if (!0)
                                                                                                                            break q;
                                                                                                                        $charCount = $charCount + ((-1) >= 0 ? 2 : 1) | 0;
                                                                                                                    } else {
                                                                                                                        var$10 = $j + 1 | 0;
                                                                                                                        if ($j == $codePointCount)
                                                                                                                            return $charCount;
                                                                                                                        if ($codePoint$iv$iv != 10 && $codePoint$iv$iv != 13) {
                                                                                                                            var$21 = 0 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 32 ? 0 : 1;
                                                                                                                            if (!var$21 && !(127 > $codePoint$iv$iv ? 0 : $codePoint$iv$iv >= 160 ? 0 : 1) ? 0 : 1)
                                                                                                                                break r;
                                                                                                                        }
                                                                                                                        if ($codePoint$iv$iv == 65533)
                                                                                                                            break r;
                                                                                                                        $charCount = $charCount + (var$9 >= 0 ? 2 : 1) | 0;
                                                                                                                    }
                                                                                                                }
                                                                                                                var$9 = 4;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            $index$iv = $index$iv + var$9 | 0;
                                                                                            $j = var$10;
                                                                                        }
                                                                                        return $charCount;
                                                                                    }
                                                                                    return (-1);
                                                                                }
                                                                                return (-1);
                                                                            }
                                                                            return (-1);
                                                                        }
                                                                        return (-1);
                                                                    }
                                                                    return (-1);
                                                                }
                                                                return (-1);
                                                            }
                                                            return (-1);
                                                        }
                                                        return (-1);
                                                    }
                                                    return (-1);
                                                }
                                                return (-1);
                                            }
                                            return (-1);
                                        }
                                        return (-1);
                                    }
                                    return (-1);
                                }
                                return (-1);
                            }
                            return (-1);
                        }
                        return (-1);
                    }
                    return (-1);
                }
                return (-1);
            }
            return (-1);
        }
        return (-1);
    }
    return (-1);
},
oi__ByteString_access$codePointIndexToCharIndex = ($s, $codePointCount) => {
    oi__ByteString_$callClinit();
    return oi__ByteString_codePointIndexToCharIndex($s, $codePointCount);
},
oi__ByteString__clinit_ = () => {
    oi__ByteString_HEX_DIGIT_CHARS = $rt_createCharArrayFromData([48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102]);
},
kji_Intrinsics = $rt_classWithoutFields(),
kji_Intrinsics_checkNotNull = $object => {
    if ($object === null)
        kji_Intrinsics_throwJavaNpe0();
};
let kji_Intrinsics_checkNotNull0 = ($object, $message) => {
    if ($object === null)
        kji_Intrinsics_throwJavaNpe($message);
},
kji_Intrinsics_throwJavaNpe0 = () => {
    $rt_throw($rt_nullCheck($rt_castToClass(kji_Intrinsics_sanitizeStackTrace(jl_NullPointerException__init_0()), jl_NullPointerException)));
},
kji_Intrinsics_throwJavaNpe = $message => {
    $rt_throw($rt_nullCheck($rt_castToClass(kji_Intrinsics_sanitizeStackTrace(jl_NullPointerException__init_($message)), jl_NullPointerException)));
},
kji_Intrinsics_checkNotNullExpressionValue = ($value, $expression) => {
    if ($value !== null)
        return;
    $rt_throw($rt_nullCheck($rt_castToClass(kji_Intrinsics_sanitizeStackTrace(jl_NullPointerException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($expression)).$append3($rt_s(314))).$toString())), jl_NullPointerException)));
},
kji_Intrinsics_checkNotNullParameter = ($value, $paramName) => {
    if ($value === null)
        kji_Intrinsics_throwParameterIsNullNPE($paramName);
},
kji_Intrinsics_throwParameterIsNullNPE = $paramName => {
    $rt_throw($rt_nullCheck($rt_castToClass(kji_Intrinsics_sanitizeStackTrace(jl_NullPointerException__init_(kji_Intrinsics_createParameterIsNullExceptionMessage($paramName))), jl_NullPointerException)));
},
kji_Intrinsics_createParameterIsNullExceptionMessage = $paramName => {
    let $stackTraceElements, $thisClassName, $i, var$5, var$6, $caller, $className, $methodName;
    $stackTraceElements = $rt_nullCheck(jl_Thread_currentThread0()).$getStackTrace();
    $thisClassName = $rt_cls(kji_Intrinsics).$getName();
    $i = 0;
    while (true) {
        $stackTraceElements = $rt_nullCheck($stackTraceElements);
        var$5 = $stackTraceElements.data;
        $i = $rt_checkBounds($i, var$5);
        if ($rt_nullCheck(jl_StackTraceElement_getClassName($rt_nullCheck(var$5[$i]))).$equals0($thisClassName))
            break;
        $i = $i + 1 | 0;
    }
    while (true) {
        var$6 = $rt_checkBounds($i, var$5);
        if (!$rt_nullCheck(jl_StackTraceElement_getClassName($rt_nullCheck(var$5[var$6]))).$equals0($thisClassName))
            break;
        $i = var$6 + 1 | 0;
    }
    $caller = var$5[var$6];
    $caller = $rt_nullCheck($caller);
    $className = jl_StackTraceElement_getClassName($caller);
    $methodName = jl_StackTraceElement_getMethodName($caller);
    return $rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(315))).$append3($className)).$append3($rt_s(316))).$append3($methodName)).$append3($rt_s(317))).$append3($paramName)).$toString();
},
kji_Intrinsics_areEqual = ($first, $second) => {
    return $first !== null ? $first.$equals0($second) : $second !== null ? 0 : 1;
},
kji_Intrinsics_sanitizeStackTrace = $throwable => {
    return kji_Intrinsics_sanitizeStackTrace0($throwable, $rt_cls(kji_Intrinsics).$getName());
},
kji_Intrinsics_sanitizeStackTrace0 = ($throwable, $classNameToDrop) => {
    let $stackTrace, var$4, $size, $lastIntrinsic, $i, var$8, $newStackTrace;
    $throwable = $rt_nullCheck($throwable);
    $stackTrace = $throwable.$getStackTrace();
    $stackTrace = $rt_nullCheck($stackTrace);
    var$4 = $stackTrace.data;
    $size = var$4.length;
    $lastIntrinsic = (-1);
    $i = 0;
    while ($i < $size) {
        $i = $rt_checkLowerBound($i);
        var$8 = jl_StackTraceElement_getClassName($rt_nullCheck(var$4[$i]));
        $classNameToDrop = $rt_nullCheck($classNameToDrop);
        if ($classNameToDrop.$equals0(var$8))
            $lastIntrinsic = $i;
        $i = $i + 1 | 0;
    }
    $newStackTrace = $rt_castToInterface(ju_Arrays_copyOfRange0($stackTrace, $lastIntrinsic + 1 | 0, $size), $rt_arraycls(jl_StackTraceElement));
    $throwable.$setStackTrace($newStackTrace);
    return $throwable;
},
k_SafePublicationLazyImpl$Companion = $rt_classWithoutFields(),
k_SafePublicationLazyImpl$Companion__init_ = $this => {
    jl_Object__init_($this);
},
k_SafePublicationLazyImpl$Companion__init_2 = () => {
    let var_0 = new k_SafePublicationLazyImpl$Companion();
    k_SafePublicationLazyImpl$Companion__init_(var_0);
    return var_0;
},
k_SafePublicationLazyImpl$Companion__init_0 = ($this, $$constructor_marker) => {
    k_SafePublicationLazyImpl$Companion__init_($this);
},
k_SafePublicationLazyImpl$Companion__init_1 = var_0 => {
    let var_1 = new k_SafePublicationLazyImpl$Companion();
    k_SafePublicationLazyImpl$Companion__init_0(var_1, var_0);
    return var_1;
},
juca_BaseAtomicReferenceFieldUpdater = $rt_classWithoutFields(juca_AtomicReferenceFieldUpdater),
juca_BaseAtomicReferenceFieldUpdater__init_ = $this => {
    juca_AtomicReferenceFieldUpdater__init_($this);
},
ucitrct_MessageHandler = $rt_classWithoutFields(0);
function ucics_RpcClient$_init_$lambda$_1_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
let ucics_RpcClient$_init_$lambda$_1_0__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_0 = var$1;
},
ucics_RpcClient$_init_$lambda$_1_0__init_0 = var_0 => {
    let var_1 = new ucics_RpcClient$_init_$lambda$_1_0();
    ucics_RpcClient$_init_$lambda$_1_0__init_(var_1, var_0);
    return var_1;
},
ucics_RpcClient$_init_$lambda$_1_0_onMessage = (var$0, var$1) => {
    ucics_RpcClient_handleIncomingBytes($rt_nullCheck(var$0.$_0), var$1);
};
function ju_HashMap$2() {
    ju_AbstractCollection.call(this);
    this.$this$04 = null;
}
let ju_HashMap$2__init_ = ($this, $this$0) => {
    $this.$this$04 = $this$0;
    ju_AbstractCollection__init_($this);
},
ju_HashMap$2__init_0 = var_0 => {
    let var_1 = new ju_HashMap$2();
    ju_HashMap$2__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$2_iterator = $this => {
    return ju_HashMap$ValueIterator__init_0($this.$this$04);
};
function jl_Double() {
    jl_Number.call(this);
    this.$value0 = 0.0;
}
let jl_Double_TYPE = null,
jl_Double_$callClinit = () => {
    jl_Double_$callClinit = $rt_eraseClinit(jl_Double);
    jl_Double__clinit_();
},
jl_Double__init_ = ($this, $value) => {
    jl_Double_$callClinit();
    jl_Number__init_($this);
    $this.$value0 = $value;
},
jl_Double__init_0 = var_0 => {
    let var_1 = new jl_Double();
    jl_Double__init_(var_1, var_0);
    return var_1;
},
jl_Double_doubleValue = $this => {
    return $this.$value0;
},
jl_Double_intValue = $this => {
    return $this.$value0 | 0;
},
jl_Double_longValue = $this => {
    return Long_fromNumber($this.$value0);
},
jl_Double_floatValue = $this => {
    return $this.$value0;
},
jl_Double_valueOf = $d => {
    jl_Double_$callClinit();
    return jl_Double__init_0($d);
},
jl_Double_toString = $d => {
    jl_Double_$callClinit();
    return $rt_nullCheck((jl_StringBuilder__init_()).$append19($d)).$toString();
},
jl_Double_toString0 = $this => {
    return jl_Double_toString($this.$value0);
},
jl_Double_equals0 = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Double && jl_Double_equals($this.$value0, $rt_nullCheck($rt_castToClass($other, jl_Double)).$value0) ? 1 : 0;
},
jl_Double_equals = ($a, $b) => {
    jl_Double_$callClinit();
    return $rt_equalDoubles($a, $b);
},
jl_Double_doubleToLongBits = $value => {
    jl_Double_$callClinit();
    if (!(isNaN($value) ? 1 : 0))
        return $rt_doubleToRawLongBits($value);
    return Long_create(0, 2146959360);
},
jl_Double__clinit_ = () => {
    jl_Double_TYPE = $rt_cls($rt_doublecls);
},
csw_ProtoAdapterKt$commonBytes$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonBytes$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3, $$super_call_param$4) => {
    let var$5;
    var$5 = null;
    csw_ProtoAdapter__init_($this, $$super_call_param$1, $$super_call_param$2, var$5, $$super_call_param$3, $$super_call_param$4);
},
csw_ProtoAdapterKt$commonBytes$1__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new csw_ProtoAdapterKt$commonBytes$1();
    csw_ProtoAdapterKt$commonBytes$1__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
csw_ProtoAdapterKt$commonBytes$1_encodedSize = ($this, $value) => {
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    return o_ByteString_size($value);
},
csw_ProtoAdapterKt$commonBytes$1_encode0 = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $writer = $rt_nullCheck($writer);
    csw_ProtoWriter_writeBytes($writer, $value);
},
csw_ProtoAdapterKt$commonBytes$1_encode = ($this, $writer, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, $value);
},
csw_ProtoAdapterKt$commonBytes$1_decode = ($this, $reader) => {
    kji_Intrinsics_checkNotNullParameter($reader, $rt_s(71));
    $reader = $rt_nullCheck($reader);
    return csw_ProtoReader_readBytes($reader);
},
csw_ProtoAdapterKt$commonBytes$1_encodedSize0 = ($this, $value) => {
    return csw_ProtoAdapterKt$commonBytes$1_encodedSize($this, $rt_castToClass($value, o_ByteString));
},
csw_ProtoAdapterKt$commonBytes$1_encode1 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonBytes$1_encode0($this, $writer, $rt_castToClass($value, o_ByteString));
},
csw_ProtoAdapterKt$commonBytes$1_encode2 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonBytes$1_encode($this, $writer, $rt_castToClass($value, o_ByteString));
},
csw_ProtoAdapterKt$commonBytes$1_decode0 = ($this, $reader) => {
    return csw_ProtoAdapterKt$commonBytes$1_decode($this, $reader);
},
jl_VirtualMachineError = $rt_classWithoutFields(jl_Error),
jl_VirtualMachineError__init_ = $this => {
    jl_Error__init_($this);
},
jl_VirtualMachineError__init_0 = () => {
    let var_0 = new jl_VirtualMachineError();
    jl_VirtualMachineError__init_(var_0);
    return var_0;
};
function csw_Syntax() {
    jl_Enum.call(this);
    this.$string = null;
}
let csw_Syntax_Companion = null,
csw_Syntax_PROTO_2 = null,
csw_Syntax_PROTO_3 = null,
csw_Syntax_$VALUES = null,
csw_Syntax_$ENTRIES = null,
csw_Syntax_$callClinit = () => {
    csw_Syntax_$callClinit = $rt_eraseClinit(csw_Syntax);
    csw_Syntax__clinit_();
},
csw_Syntax__init_0 = ($this, $$enum$name, $$enum$ordinal, $string) => {
    csw_Syntax_$callClinit();
    jl_Enum__init_($this, $$enum$name, $$enum$ordinal);
    $this.$string = $string;
},
csw_Syntax__init_ = (var_0, var_1, var_2) => {
    let var_3 = new csw_Syntax();
    csw_Syntax__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_Syntax_toString = $this => {
    return $this.$string;
},
csw_Syntax_values = () => {
    csw_Syntax_$callClinit();
    return $rt_castToInterface($rt_nullCheck(csw_Syntax_$VALUES).$clone0(), $rt_arraycls(csw_Syntax));
},
csw_Syntax_$values = () => {
    let var$1, var$2;
    csw_Syntax_$callClinit();
    var$1 = $rt_createArray(csw_Syntax, 2);
    var$2 = var$1.data;
    var$2[0] = csw_Syntax_PROTO_2;
    var$2[1] = csw_Syntax_PROTO_3;
    return var$1;
},
csw_Syntax__clinit_ = () => {
    csw_Syntax_PROTO_2 = csw_Syntax__init_($rt_s(318), 0, $rt_s(319));
    csw_Syntax_PROTO_3 = csw_Syntax__init_($rt_s(320), 1, $rt_s(321));
    csw_Syntax_$VALUES = csw_Syntax_$values();
    csw_Syntax_$ENTRIES = ke_EnumEntriesKt_enumEntries($rt_castToInterface(csw_Syntax_$VALUES, $rt_arraycls(jl_Enum)));
    csw_Syntax_Companion = csw_Syntax$Companion__init_1(null);
},
uciisd_Organization = $rt_classWithoutFields(),
k_SafePublicationLazyImpl$_value$_AtomicUpdater$ = $rt_classWithoutFields(juca_BaseAtomicReferenceFieldUpdater),
k_SafePublicationLazyImpl$_value$_AtomicUpdater$_INSTANCE = null,
k_SafePublicationLazyImpl$_value$_AtomicUpdater$_$callClinit = () => {
    k_SafePublicationLazyImpl$_value$_AtomicUpdater$_$callClinit = $rt_eraseClinit(k_SafePublicationLazyImpl$_value$_AtomicUpdater$);
    k_SafePublicationLazyImpl$_value$_AtomicUpdater$__clinit_();
},
k_SafePublicationLazyImpl$_value$_AtomicUpdater$__init_0 = var$0 => {
    k_SafePublicationLazyImpl$_value$_AtomicUpdater$_$callClinit();
    juca_BaseAtomicReferenceFieldUpdater__init_(var$0);
},
k_SafePublicationLazyImpl$_value$_AtomicUpdater$__init_ = () => {
    let var_0 = new k_SafePublicationLazyImpl$_value$_AtomicUpdater$();
    k_SafePublicationLazyImpl$_value$_AtomicUpdater$__init_0(var_0);
    return var_0;
},
k_SafePublicationLazyImpl$_value$_AtomicUpdater$__clinit_ = () => {
    k_SafePublicationLazyImpl$_value$_AtomicUpdater$_INSTANCE = k_SafePublicationLazyImpl$_value$_AtomicUpdater$__init_();
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jl_NegativeArraySizeException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
jl_NegativeArraySizeException__init_0 = () => {
    let var_0 = new jl_NegativeArraySizeException();
    jl_NegativeArraySizeException__init_(var_0);
    return var_0;
},
kc_AbstractMutableList = $rt_classWithoutFields(ju_AbstractList),
kc_AbstractMutableList__init_ = $this => {
    ju_AbstractList__init_($this);
},
kc_AbstractMutableList_size = $this => {
    return $this.$getSize();
},
csw_ProtoAdapterKt$commonInstant$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonInstant$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(322), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonInstant$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonInstant$1();
    csw_ProtoAdapterKt$commonInstant$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonInstant$1_encode = ($this, $writer, $value) => {
    let $nanos, $seconds;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    $nanos = jt_Instant_getNano($value);
    if ($nanos) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_INT32).$encodeWithTag0($writer, 2, jl_Integer_valueOf($nanos));
    }
    $seconds = jt_Instant_getEpochSecond($value);
    if (Long_ne($seconds, Long_ZERO)) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_INT64).$encodeWithTag0($writer, 1, jl_Long_valueOf($seconds));
    }
},
csw_ProtoAdapterKt$commonInstant$1_encode0 = ($this, $writer, $value) => {
    csw_ProtoAdapterKt$commonInstant$1_encode($this, $writer, $rt_castToClass($value, jt_Instant));
},
jn_ProtocolException = $rt_classWithoutFields(ji_IOException),
jn_ProtocolException__init_0 = ($this, $detailMessage) => {
    ji_IOException__init_1($this, $detailMessage);
},
jn_ProtocolException__init_ = var_0 => {
    let var_1 = new jn_ProtocolException();
    jn_ProtocolException__init_0(var_1, var_0);
    return var_1;
},
uciisdp_MyData$ProtoAdapter_MyData = $rt_classWithoutFields(csw_ProtoAdapter),
uciisdp_MyData$ProtoAdapter_MyData__init_ = $this => {
    let var$1;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_1($this, var$1, $rt_cls(uciisdp_MyData), $rt_s(323), csw_Syntax_PROTO_3, null, $rt_s(324));
},
uciisdp_MyData$ProtoAdapter_MyData__init_0 = () => {
    let var_0 = new uciisdp_MyData$ProtoAdapter_MyData();
    uciisdp_MyData$ProtoAdapter_MyData__init_(var_0);
    return var_0;
},
uciisdp_MyData$ProtoAdapter_MyData_encode = ($this, $writer, $value) => {
    let var$3;
    $value = $rt_nullCheck($value);
    var$3 = csw_Message_unknownFields($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, var$3);
    if (!ju_Objects_equals(jl_Integer_valueOf($value.$value5), jl_Integer_valueOf(0))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_INT32).$encodeWithTag0($writer, 3, jl_Integer_valueOf($value.$value5));
    }
    if (!ju_Objects_equals($value.$content0, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 2, $value.$content0);
    }
    if (!ju_Objects_equals($value.$id0, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 1, $value.$id0);
    }
},
uciisdp_MyData$ProtoAdapter_MyData_decode = ($this, $reader) => {
    let $builder, $token, var$4;
    $builder = uciisdp_MyData$Builder__init_0();
    $reader = $rt_nullCheck($reader);
    $token = csw_ProtoReader_beginMessage($reader);
    a: while (true) {
        var$4 = csw_ProtoReader_nextTag($reader);
        if (var$4 == (-1))
            break;
        switch (var$4) {
            case 1:
                csw_ProtoAdapter_$callClinit();
                uciisdp_MyData$Builder_id($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_STRING).$decode0($reader), jl_String));
                continue a;
            case 2:
                csw_ProtoAdapter_$callClinit();
                uciisdp_MyData$Builder_content($builder, $rt_castToClass($rt_nullCheck(csw_ProtoAdapter_STRING).$decode0($reader), jl_String));
                continue a;
            case 3:
                csw_ProtoAdapter_$callClinit();
                uciisdp_MyData$Builder_value($builder, $rt_nullCheck($rt_castToClass($rt_nullCheck(csw_ProtoAdapter_INT32).$decode0($reader), jl_Integer)).$intValue());
                continue a;
            default:
        }
        csw_ProtoReader_readUnknownField($reader, var$4);
    }
    csw_Message$Builder_addUnknownFields($builder, csw_ProtoReader_endMessageAndGetUnknownFields($reader, $token));
    return uciisdp_MyData$Builder_build($builder);
},
uciisdp_MyData$ProtoAdapter_MyData_decode0 = ($this, var$1) => {
    return uciisdp_MyData$ProtoAdapter_MyData_decode($this, var$1);
},
uciisdp_MyData$ProtoAdapter_MyData_encode0 = ($this, var$1, var$2) => {
    uciisdp_MyData$ProtoAdapter_MyData_encode($this, var$1, $rt_castToClass(var$2, uciisdp_MyData));
};
function jnci_UTF16Decoder() {
    let a = this; jnci_BufferedDecoder.call(a);
    a.$bom1 = 0;
    a.$littleEndian = 0;
}
let jnci_UTF16Decoder__init_ = ($this, $cs, $bom, $littleEndian) => {
    jnci_BufferedDecoder__init_($this, $cs, 0.5, 0.5);
    $this.$bom1 = $bom;
    $this.$littleEndian = $littleEndian;
},
jnci_UTF16Decoder__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jnci_UTF16Decoder();
    jnci_UTF16Decoder__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jnci_UTF16Decoder_arrayDecode = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let var$8, var$9, var$10, $b, var$12;
    if ($this.$bom1) {
        if (($inPos + 2 | 0) > $inSize) {
            $controller = $rt_nullCheck($controller);
            if ($controller.$hasMoreInput0())
                var$8 = null;
            else {
                jnc_CoderResult_$callClinit();
                var$8 = jnc_CoderResult_UNDERFLOW;
            }
            return var$8;
        }
        $this.$bom1 = 0;
        var$9 = $inPos + 1 | 0;
        $inArray = $rt_nullCheck($inArray);
        var$10 = $inArray.data;
        $inPos = $rt_checkBounds($inPos, var$10);
        $b = var$10[$inPos];
        if ($b == (-1)) {
            var$12 = $rt_checkBounds(var$9, var$10);
            if (var$10[var$12] != (-2))
                $inPos = var$12 + (-1) | 0;
            else {
                $inPos = var$12 + 1 | 0;
                $this.$littleEndian = 1;
            }
        } else if ($b != (-2))
            $inPos = var$9 + (-1) | 0;
        else {
            var$12 = $rt_checkBounds(var$9, var$10);
            if (var$10[var$12] != (-1))
                $inPos = var$12 + (-1) | 0;
            else {
                $inPos = var$12 + 1 | 0;
                $this.$littleEndian = 0;
            }
        }
    }
    return !$this.$littleEndian ? jnci_UTF16Decoder_decodeBE($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) : jnci_UTF16Decoder_decodeLE($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller);
},
jnci_UTF16Decoder_decodeLE = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $b1, $b2, $c, var$14, $next;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize)
                break a;
            if (($inPos + 2 | 0) > $inSize) {
                $controller = $rt_nullCheck($controller);
                if ($controller.$hasMoreInput(2))
                    break a;
                jnc_CoderResult_$callClinit();
                $result = jnc_CoderResult_UNDERFLOW;
                break a;
            }
            var$9 = $inPos + 1 | 0;
            $inArray = $rt_nullCheck($inArray);
            var$10 = $inArray.data;
            $b1 = var$10[$rt_checkBounds($inPos, var$10)] & 255;
            $inPos = var$9 + 1 | 0;
            $b2 = var$10[$rt_checkBounds(var$9, var$10)] & 255;
            $c = ($b1 | $b2 << 8) & 65535;
            if (!jl_Character_isHighSurrogate($c)) {
                if (jl_Character_isLowSurrogate($c)) {
                    $inPos = $inPos + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(2);
                    break a;
                }
                var$14 = $outPos + 1 | 0;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = $c;
                $outPos = var$14;
            } else {
                if (($inPos + 2 | 0) >= $inSize) {
                    $controller = $rt_nullCheck($controller);
                    if (!$controller.$hasMoreInput(4)) {
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_UNDERFLOW;
                    }
                    $inPos = $inPos + (-2) | 0;
                    break a;
                }
                var$14 = $inPos + 1 | 0;
                var$9 = var$10[$rt_checkBounds($inPos, var$10)] & 255;
                $inPos = var$14 + 1 | 0;
                var$14 = var$10[$rt_checkBounds(var$14, var$10)] & 255;
                $next = (var$9 | var$14 << 8) & 65535;
                if (!jl_Character_isLowSurrogate($next)) {
                    $inPos = $inPos + (-4) | 0;
                    $result = jnc_CoderResult_malformedForLength(4);
                    break a;
                }
                if (($outPos + 2 | 0) > $outSize) {
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreOutput0(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$14 = $outPos + 1 | 0;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = $c;
                $outPos = var$14 + 1 | 0;
                var$10[$rt_checkBounds(var$14, var$10)] = $next;
            }
        }
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
},
jnci_UTF16Decoder_decodeBE = ($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) => {
    let $result, var$9, var$10, $b1, $b2, $c, var$14, $next;
    $result = null;
    a: {
        while ($inPos < $inSize) {
            if ($outPos >= $outSize)
                break a;
            if (($inPos + 2 | 0) > $inSize) {
                $controller = $rt_nullCheck($controller);
                if ($controller.$hasMoreInput(2))
                    break a;
                jnc_CoderResult_$callClinit();
                $result = jnc_CoderResult_UNDERFLOW;
                break a;
            }
            var$9 = $inPos + 1 | 0;
            $inArray = $rt_nullCheck($inArray);
            var$10 = $inArray.data;
            $b1 = var$10[$rt_checkBounds($inPos, var$10)] & 255;
            $inPos = var$9 + 1 | 0;
            $b2 = var$10[$rt_checkBounds(var$9, var$10)] & 255;
            $c = ($b2 | $b1 << 8) & 65535;
            if (!jl_Character_isHighSurrogate($c)) {
                if (jl_Character_isLowSurrogate($c)) {
                    $inPos = $inPos + (-2) | 0;
                    $result = jnc_CoderResult_malformedForLength(2);
                    break a;
                }
                var$14 = $outPos + 1 | 0;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = $c;
                $outPos = var$14;
            } else {
                if (($inPos + 2 | 0) >= $inSize) {
                    $controller = $rt_nullCheck($controller);
                    if (!$controller.$hasMoreInput(4)) {
                        jnc_CoderResult_$callClinit();
                        $result = jnc_CoderResult_UNDERFLOW;
                    }
                    $inPos = $inPos + (-2) | 0;
                    break a;
                }
                var$14 = $inPos + 1 | 0;
                var$9 = var$10[$rt_checkBounds($inPos, var$10)] & 255;
                $inPos = var$14 + 1 | 0;
                var$14 = var$10[$rt_checkBounds(var$14, var$10)] & 255;
                $next = (var$14 | var$9 << 8) & 65535;
                if (!jl_Character_isLowSurrogate($next)) {
                    $inPos = $inPos + (-4) | 0;
                    $result = jnc_CoderResult_malformedForLength(4);
                    break a;
                }
                if (($outPos + 2 | 0) > $outSize) {
                    $controller = $rt_nullCheck($controller);
                    if ($controller.$hasMoreOutput0(2))
                        break a;
                    jnc_CoderResult_$callClinit();
                    $result = jnc_CoderResult_OVERFLOW;
                    break a;
                }
                var$14 = $outPos + 1 | 0;
                $outArray = $rt_nullCheck($outArray);
                var$10 = $outArray.data;
                var$10[$rt_checkBounds($outPos, var$10)] = $c;
                $outPos = var$14 + 1 | 0;
                var$10[$rt_checkBounds(var$14, var$10)] = $next;
            }
        }
    }
    $controller = $rt_nullCheck($controller);
    $controller.$setInPosition($inPos);
    $controller.$setOutPosition($outPos);
    return $result;
},
jl_OutOfMemoryError = $rt_classWithoutFields(jl_VirtualMachineError),
jl_OutOfMemoryError__init_ = $this => {
    jl_VirtualMachineError__init_($this);
},
jl_OutOfMemoryError__init_0 = () => {
    let var_0 = new jl_OutOfMemoryError();
    jl_OutOfMemoryError__init_(var_0);
    return var_0;
},
uciisd_Department = $rt_classWithoutFields(),
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
jl_IllegalStateException__init_2 = $this => {
    jl_RuntimeException__init_($this);
},
jl_IllegalStateException__init_0 = () => {
    let var_0 = new jl_IllegalStateException();
    jl_IllegalStateException__init_2(var_0);
    return var_0;
},
jl_IllegalStateException__init_1 = ($this, $message) => {
    jl_RuntimeException__init_0($this, $message);
},
jl_IllegalStateException__init_ = var_0 => {
    let var_1 = new jl_IllegalStateException();
    jl_IllegalStateException__init_1(var_1, var_0);
    return var_1;
};
function uciis_MyDataService_Stub() {
    jl_Object.call(this);
    this.$client = null;
}
let uciis_MyDataService_Stub__init_ = ($this, $client) => {
    let var$2;
    jl_Object__init_($this);
    $this.$client = $client;
    var$2 = uciisd_EmployeeCodec__init_0();
    $client = $rt_nullCheck($client);
    $client.$registerCodec($rt_cls(uciisd_Employee), var$2);
    $client.$registerCodec($rt_cls(uciisd_Organization), uciisd_OrganizationCodec__init_0());
    $client.$registerCodec($rt_cls(uciisd_MyData), uciisd_MyDataCodec__init_0());
},
uciis_MyDataService_Stub__init_0 = var_0 => {
    let var_1 = new uciis_MyDataService_Stub();
    uciis_MyDataService_Stub__init_(var_1, var_0);
    return var_1;
},
uciis_MyDataService_Stub_processData = ($this, $data) => {
    let var$2, var$3, $rawResult, var$5;
    var$2 = $this.$client;
    var$3 = $rt_createArray(jl_Object, 1);
    var$3.data[0] = $data;
    $rawResult = $rt_nullCheck(var$2).$invokeStub($rt_s(325), $rt_s(326), var$3);
    var$5 = uciis_MyDataService_Stub$processData$lambda$_1_0__init_0();
    $rawResult = $rt_nullCheck($rawResult);
    return $rawResult.$thenApply(var$5);
},
uciis_MyDataService_Stub_lambda$processData$0 = $bytes => {
    return null;
},
kc_AbstractList$Companion = $rt_classWithoutFields(),
kc_AbstractList$Companion__init_ = $this => {
    jl_Object__init_($this);
},
kc_AbstractList$Companion__init_2 = () => {
    let var_0 = new kc_AbstractList$Companion();
    kc_AbstractList$Companion__init_(var_0);
    return var_0;
},
kc_AbstractList$Companion_orderedEquals$kotlin_stdlib = ($this, $c, $other) => {
    let var$3, $otherIterator, var$5, $elem, $elemOther;
    kji_Intrinsics_checkNotNullParameter($c, $rt_s(327));
    kji_Intrinsics_checkNotNullParameter($other, $rt_s(42));
    $c = $rt_nullCheck($c);
    var$3 = $c.$size();
    $other = $rt_nullCheck($other);
    if (var$3 != $other.$size())
        return 0;
    $otherIterator = $other.$iterator();
    var$5 = $c.$iterator();
    while (true) {
        var$5 = $rt_nullCheck(var$5);
        if (!var$5.$hasNext())
            break;
        $elem = var$5.$next();
        $otherIterator = $rt_nullCheck($otherIterator);
        $elemOther = $otherIterator.$next();
        if (!kji_Intrinsics_areEqual($elem, $elemOther))
            return 0;
    }
    return 1;
},
kc_AbstractList$Companion__init_0 = ($this, $$constructor_marker) => {
    kc_AbstractList$Companion__init_($this);
},
kc_AbstractList$Companion__init_1 = var_0 => {
    let var_1 = new kc_AbstractList$Companion();
    kc_AbstractList$Companion__init_0(var_1, var_0);
    return var_1;
},
uciisdp_Organization$ProtoAdapter_Organization = $rt_classWithoutFields(csw_ProtoAdapter),
uciisdp_Organization$ProtoAdapter_Organization__init_ = $this => {
    let var$1;
    csw_FieldEncoding_$callClinit();
    var$1 = csw_FieldEncoding_LENGTH_DELIMITED;
    csw_Syntax_$callClinit();
    csw_ProtoAdapter__init_1($this, var$1, $rt_cls(uciisdp_Organization), $rt_s(328), csw_Syntax_PROTO_3, null, $rt_s(329));
},
uciisdp_Organization$ProtoAdapter_Organization__init_0 = () => {
    let var_0 = new uciisdp_Organization$ProtoAdapter_Organization();
    uciisdp_Organization$ProtoAdapter_Organization__init_(var_0);
    return var_0;
},
uciisdp_Organization$ProtoAdapter_Organization_encode = ($this, $writer, $value) => {
    let var$3;
    $value = $rt_nullCheck($value);
    var$3 = csw_Message_unknownFields($value);
    $writer = $rt_nullCheck($writer);
    csw_ReverseProtoWriter_writeBytes($writer, var$3);
    if (!ju_Objects_equals($value.$primaryDepartment0, null)) {
        uciisdp_Department_$callClinit();
        $rt_nullCheck(uciisdp_Department_ADAPTER).$encodeWithTag0($writer, 2, $value.$primaryDepartment0);
    }
    if (!ju_Objects_equals($value.$name9, $rt_s(6))) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 1, $value.$name9);
    }
},
uciisdp_Organization$ProtoAdapter_Organization_encode0 = ($this, var$1, var$2) => {
    uciisdp_Organization$ProtoAdapter_Organization_encode($this, var$1, $rt_castToClass(var$2, uciisdp_Organization));
};
function ju_HashMap$HashMapEntrySet() {
    ju_AbstractSet.call(this);
    this.$associatedMap0 = null;
}
let ju_HashMap$HashMapEntrySet__init_ = ($this, $hm) => {
    ju_AbstractSet__init_($this);
    $this.$associatedMap0 = $hm;
},
ju_HashMap$HashMapEntrySet__init_0 = var_0 => {
    let var_1 = new ju_HashMap$HashMapEntrySet();
    ju_HashMap$HashMapEntrySet__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$HashMapEntrySet_iterator = $this => {
    return ju_HashMap$EntryIterator__init_0($this.$associatedMap0);
},
csw_WireEnum = $rt_classWithoutFields(0);
function ucicsp_RpcPacket$Type() {
    jl_Enum.call(this);
    this.$value11 = 0;
}
let ucicsp_RpcPacket$Type_REQUEST = null,
ucicsp_RpcPacket$Type_RESPONSE = null,
ucicsp_RpcPacket$Type_STREAM_DATA = null,
ucicsp_RpcPacket$Type_STREAM_ERROR = null,
ucicsp_RpcPacket$Type_STREAM_COMPLETE = null,
ucicsp_RpcPacket$Type_STREAM_CANCEL = null,
ucicsp_RpcPacket$Type_EVENT = null,
ucicsp_RpcPacket$Type_ADAPTER = null,
ucicsp_RpcPacket$Type_$VALUES = null,
ucicsp_RpcPacket$Type_$callClinit = () => {
    ucicsp_RpcPacket$Type_$callClinit = $rt_eraseClinit(ucicsp_RpcPacket$Type);
    ucicsp_RpcPacket$Type__clinit_();
},
ucicsp_RpcPacket$Type_values = () => {
    ucicsp_RpcPacket$Type_$callClinit();
    return $rt_castToInterface($rt_nullCheck(ucicsp_RpcPacket$Type_$VALUES).$clone0(), $rt_arraycls(ucicsp_RpcPacket$Type));
},
ucicsp_RpcPacket$Type__init_0 = ($this, var$1, var$2, $value) => {
    ucicsp_RpcPacket$Type_$callClinit();
    jl_Enum__init_($this, var$1, var$2);
    $this.$value11 = $value;
},
ucicsp_RpcPacket$Type__init_ = (var_0, var_1, var_2) => {
    let var_3 = new ucicsp_RpcPacket$Type();
    ucicsp_RpcPacket$Type__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
ucicsp_RpcPacket$Type_fromValue = $value => {
    ucicsp_RpcPacket$Type_$callClinit();
    switch ($value) {
        case 0:
            break;
        case 1:
            return ucicsp_RpcPacket$Type_RESPONSE;
        case 2:
            return ucicsp_RpcPacket$Type_STREAM_DATA;
        case 3:
            return ucicsp_RpcPacket$Type_STREAM_ERROR;
        case 4:
            return ucicsp_RpcPacket$Type_STREAM_COMPLETE;
        case 5:
            return ucicsp_RpcPacket$Type_STREAM_CANCEL;
        case 6:
            return ucicsp_RpcPacket$Type_EVENT;
        default:
            return null;
    }
    return ucicsp_RpcPacket$Type_REQUEST;
},
ucicsp_RpcPacket$Type_getValue = $this => {
    return $this.$value11;
},
ucicsp_RpcPacket$Type_$values = () => {
    let var$1, var$2;
    ucicsp_RpcPacket$Type_$callClinit();
    var$1 = $rt_createArray(ucicsp_RpcPacket$Type, 7);
    var$2 = var$1.data;
    var$2[0] = ucicsp_RpcPacket$Type_REQUEST;
    var$2[1] = ucicsp_RpcPacket$Type_RESPONSE;
    var$2[2] = ucicsp_RpcPacket$Type_STREAM_DATA;
    var$2[3] = ucicsp_RpcPacket$Type_STREAM_ERROR;
    var$2[4] = ucicsp_RpcPacket$Type_STREAM_COMPLETE;
    var$2[5] = ucicsp_RpcPacket$Type_STREAM_CANCEL;
    var$2[6] = ucicsp_RpcPacket$Type_EVENT;
    return var$1;
},
ucicsp_RpcPacket$Type__clinit_ = () => {
    ucicsp_RpcPacket$Type_REQUEST = ucicsp_RpcPacket$Type__init_($rt_s(330), 0, 0);
    ucicsp_RpcPacket$Type_RESPONSE = ucicsp_RpcPacket$Type__init_($rt_s(331), 1, 1);
    ucicsp_RpcPacket$Type_STREAM_DATA = ucicsp_RpcPacket$Type__init_($rt_s(332), 2, 2);
    ucicsp_RpcPacket$Type_STREAM_ERROR = ucicsp_RpcPacket$Type__init_($rt_s(333), 3, 3);
    ucicsp_RpcPacket$Type_STREAM_COMPLETE = ucicsp_RpcPacket$Type__init_($rt_s(334), 4, 4);
    ucicsp_RpcPacket$Type_STREAM_CANCEL = ucicsp_RpcPacket$Type__init_($rt_s(335), 5, 5);
    ucicsp_RpcPacket$Type_EVENT = ucicsp_RpcPacket$Type__init_($rt_s(336), 6, 6);
    ucicsp_RpcPacket$Type_$VALUES = ucicsp_RpcPacket$Type_$values();
    ucicsp_RpcPacket$Type_ADAPTER = ucicsp_RpcPacket$Type$ProtoAdapter_Type__init_0();
},
kr_IntRange = $rt_classWithoutFields(kr_IntProgression),
kr_IntRange_Companion = null,
kr_IntRange_EMPTY = null,
kr_IntRange_$callClinit = () => {
    kr_IntRange_$callClinit = $rt_eraseClinit(kr_IntRange);
    kr_IntRange__clinit_();
},
kr_IntRange__init_ = ($this, $start, $endInclusive) => {
    kr_IntRange_$callClinit();
    kr_IntProgression__init_($this, $start, $endInclusive, 1);
},
kr_IntRange__init_0 = (var_0, var_1) => {
    let var_2 = new kr_IntRange();
    kr_IntRange__init_(var_2, var_0, var_1);
    return var_2;
},
kr_IntRange__clinit_ = () => {
    kr_IntRange_Companion = kr_IntRange$Companion__init_1(null);
    kr_IntRange_EMPTY = kr_IntRange__init_0(1, 0);
},
jl_IllegalAccessException = $rt_classWithoutFields(jl_ReflectiveOperationException),
ji_EOFException = $rt_classWithoutFields(ji_IOException),
ji_EOFException__init_0 = $this => {
    ji_IOException__init_($this);
},
ji_EOFException__init_ = () => {
    let var_0 = new ji_EOFException();
    ji_EOFException__init_0(var_0);
    return var_0;
},
kc_EmptySet = $rt_classWithoutFields(),
kc_EmptySet_INSTANCE = null,
kc_EmptySet_$callClinit = () => {
    kc_EmptySet_$callClinit = $rt_eraseClinit(kc_EmptySet);
    kc_EmptySet__clinit_();
},
kc_EmptySet__init_0 = $this => {
    kc_EmptySet_$callClinit();
    jl_Object__init_($this);
},
kc_EmptySet__init_ = () => {
    let var_0 = new kc_EmptySet();
    kc_EmptySet__init_0(var_0);
    return var_0;
},
kc_EmptySet_iterator = $this => {
    kc_EmptyIterator_$callClinit();
    return $rt_castToInterface(kc_EmptyIterator_INSTANCE, ju_Iterator);
},
kc_EmptySet__clinit_ = () => {
    kc_EmptySet_INSTANCE = kc_EmptySet__init_();
};
function uciisdp_Employee() {
    let a = this; csw_Message.call(a);
    a.$name3 = null;
    a.$address0 = null;
    a.$tags0 = null;
}
let uciisdp_Employee_ADAPTER = null,
uciisdp_Employee_$callClinit = () => {
    uciisdp_Employee_$callClinit = $rt_eraseClinit(uciisdp_Employee);
    uciisdp_Employee__clinit_();
},
uciisdp_Employee__init_ = ($this, $name, $address, $tags, $unknownFields) => {
    uciisdp_Employee_$callClinit();
    csw_Message__init_($this, uciisdp_Employee_ADAPTER, $unknownFields);
    if ($name === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(274)));
    $this.$name3 = $name;
    $this.$address0 = $address;
    $this.$tags0 = cswi_Internal_immutableCopyOf($rt_s(337), $tags);
},
uciisdp_Employee__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new uciisdp_Employee();
    uciisdp_Employee__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
uciisdp_Employee_equals = ($this, $other) => {
    let $o, var$3, var$4, var$5;
    if ($other === $this)
        return 1;
    if (!($other instanceof uciisdp_Employee))
        return 0;
    a: {
        $o = $rt_castToClass($other, uciisdp_Employee);
        var$3 = csw_Message_unknownFields($this);
        $o = $rt_nullCheck($o);
        if ($rt_nullCheck(var$3).$equals0(csw_Message_unknownFields($o))) {
            var$3 = $this.$name3;
            var$4 = $o.$name3;
            if (cswi_Internal_equals(var$3, var$4)) {
                var$3 = $this.$address0;
                var$4 = $o.$address0;
                if (cswi_Internal_equals(var$3, var$4)) {
                    var$3 = $this.$tags0;
                    var$4 = $o.$tags0;
                    if ($rt_nullCheck(var$3).$equals0(var$4)) {
                        var$5 = 1;
                        break a;
                    }
                }
            }
        }
        var$5 = 0;
    }
    return var$5;
},
uciisdp_Employee_toString = $this => {
    let $builder;
    $builder = jl_StringBuilder__init_();
    if ($this.$name3 !== null)
        $rt_nullCheck($builder.$append3($rt_s(309))).$append3(cswi_Internal_sanitize($this.$name3));
    if ($this.$address0 !== null)
        $rt_nullCheck($builder.$append3($rt_s(338))).$append($this.$address0);
    if (!$rt_nullCheck($this.$tags0).$isEmpty())
        $rt_nullCheck($builder.$append3($rt_s(339))).$append3(cswi_Internal_sanitize0($this.$tags0));
    return $rt_nullCheck($rt_nullCheck($builder.$replace1(0, 2, $rt_s(340))).$append0(125)).$toString();
},
uciisdp_Employee__clinit_ = () => {
    uciisdp_Employee_ADAPTER = uciisdp_Employee$ProtoAdapter_Employee__init_0();
};
function cswi_MutableOnWriteList() {
    let a = this; kc_AbstractMutableList.call(a);
    a.$immutableList = null;
    a.$mutableList = null;
}
let cswi_MutableOnWriteList__init_ = ($this, $immutableList) => {
    kji_Intrinsics_checkNotNullParameter($immutableList, $rt_s(341));
    kc_AbstractMutableList__init_($this);
    $this.$immutableList = $immutableList;
    $this.$mutableList = $this.$immutableList;
},
cswi_MutableOnWriteList__init_0 = var_0 => {
    let var_1 = new cswi_MutableOnWriteList();
    cswi_MutableOnWriteList__init_(var_1, var_0);
    return var_1;
},
cswi_MutableOnWriteList_getMutableList$wire_runtime = $this => {
    return $this.$mutableList;
},
cswi_MutableOnWriteList_get = ($this, $index) => {
    return $rt_nullCheck($this.$mutableList).$get1($index);
},
cswi_MutableOnWriteList_getSize = $this => {
    return $rt_nullCheck($this.$mutableList).$size();
},
csw_ProtoAdapter$Companion = $rt_classWithoutFields(),
csw_ProtoAdapter$Companion__init_ = $this => {
    jl_Object__init_($this);
},
csw_ProtoAdapter$Companion__init_2 = () => {
    let var_0 = new csw_ProtoAdapter$Companion();
    csw_ProtoAdapter$Companion__init_(var_0);
    return var_0;
},
csw_ProtoAdapter$Companion__init_0 = ($this, $$constructor_marker) => {
    csw_ProtoAdapter$Companion__init_($this);
},
csw_ProtoAdapter$Companion__init_1 = var_0 => {
    let var_1 = new csw_ProtoAdapter$Companion();
    csw_ProtoAdapter$Companion__init_0(var_1, var_0);
    return var_1;
},
kjf_Function18 = $rt_classWithoutFields(0),
kjf_Function19 = $rt_classWithoutFields(0),
kc_ArraysUtilJVM = $rt_classWithoutFields(),
kc_ArraysUtilJVM_asList = $array => {
    return ju_Arrays_asList($array);
},
kjf_Function14 = $rt_classWithoutFields(0),
kjf_Function15 = $rt_classWithoutFields(0),
kjf_Function16 = $rt_classWithoutFields(0),
kjf_Function17 = $rt_classWithoutFields(0),
kjf_Function10 = $rt_classWithoutFields(0),
cswi_Internal = $rt_classWithoutFields(),
cswi_Internal_newMutableList = () => {
    return cswi_Internal__InternalKt_newMutableList();
},
cswi_Internal_immutableCopyOf = ($name, $list) => {
    return cswi_Internal__InternalKt_immutableCopyOf($name, $list);
},
cswi_Internal_equals = ($a, $b) => {
    return cswi_Internal__InternalKt_equals($a, $b);
},
cswi_Internal_checkElementsNotNull = $list => {
    cswi_Internal__InternalKt_checkElementsNotNull($list);
},
cswi_Internal_sanitize = $value => {
    return cswi_Internal__InternalKt_sanitize0($value);
},
cswi_Internal_sanitize0 = $values => {
    return cswi_Internal__InternalKt_sanitize($values);
},
kjf_Function11 = $rt_classWithoutFields(0),
kjf_Function12 = $rt_classWithoutFields(0),
kjf_Function13 = $rt_classWithoutFields(0),
ucitrct_Transport = $rt_classWithoutFields(0);
function ucitrt_WebWorkerTransport() {
    let a = this; jl_Object.call(a);
    a.$worker = null;
    a.$handler = null;
}
let ucitrt_WebWorkerTransport__init_ = ($this, $worker) => {
    jl_Object__init_($this);
    $this.$worker = $worker;
    ucitrt_WebWorkerTransport_listenToWorker$js_body$_3($worker, otji_JS_function(ucitrt_WebWorkerTransport$_init_$lambda$_0_0__init_0($this), "handle"));
},
ucitrt_WebWorkerTransport__init_0 = var_0 => {
    let var_1 = new ucitrt_WebWorkerTransport();
    ucitrt_WebWorkerTransport__init_(var_1, var_0);
    return var_1;
},
ucitrt_WebWorkerTransport_send = ($this, $data) => {
    let var$2, var$3, $uint8Array, $i, var$6;
    if ($data === null)
        return;
    var$2 = $data.data;
    var$3 = var$2.length;
    $uint8Array = new Uint8Array(var$3);
    $i = 0;
    while ($i < var$3) {
        $i = $rt_checkLowerBound($i);
        var$6 = (var$2[$i] & 255) << 16 >> 16;
        $uint8Array[$i] = var$6;
        $i = $i + 1 | 0;
    }
    $this.$worker.postMessage($uint8Array);
},
ucitrt_WebWorkerTransport_addMessageHandler = ($this, $handler) => {
    $this.$handler = $handler;
},
ucitrt_WebWorkerTransport_handleMessage = ($this, $event) => {
    let $data, var$3, $array, $bytes, $i, var$7, var$8;
    $data = $event.data;
    if ($data instanceof Uint8Array ? 1 : 0) {
        var$3 = otj_JSObject_cast$static($data);
        $array = $rt_throwCCEIfFalse($rt_instanceOfOrNull(var$3, Uint8Array), var$3);
        $bytes = $rt_createByteArray($array.length);
        $i = 0;
        while (true) {
            var$7 = $bytes.data;
            if ($i >= var$7.length)
                break;
            var$8 = $array[$i] << 24 >> 24;
            $i = $rt_checkLowerBound($i);
            var$7[$i] = var$8;
            $i = $i + 1 | 0;
        }
        if ($this.$handler !== null)
            $rt_nullCheck($this.$handler).$onMessage($bytes);
    }
},
ucitrt_WebWorkerTransport_listenToWorker$js_body$_3 = (var$1, var$2) => {
    var$1.onmessage = function(e) {
        var$2(e);
    };
};
function ucicsp_RpcPacket() {
    let a = this; csw_Message.call(a);
    a.$type0 = null;
    a.$serviceId1 = null;
    a.$methodName2 = null;
    a.$requestId0 = null;
    a.$replyTo2 = null;
    a.$payload0 = null;
}
let ucicsp_RpcPacket_ADAPTER = null,
ucicsp_RpcPacket_$callClinit = () => {
    ucicsp_RpcPacket_$callClinit = $rt_eraseClinit(ucicsp_RpcPacket);
    ucicsp_RpcPacket__clinit_();
},
ucicsp_RpcPacket__init_ = ($this, var$1, var$2, $methodName, $requestId, $replyTo, $payload, $unknownFields) => {
    ucicsp_RpcPacket_$callClinit();
    csw_Message__init_($this, ucicsp_RpcPacket_ADAPTER, $unknownFields);
    if (var$1 === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(342)));
    $this.$type0 = var$1;
    if (var$2 === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(343)));
    $this.$serviceId1 = var$2;
    if ($methodName === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(344)));
    $this.$methodName2 = $methodName;
    if ($requestId === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(345)));
    $this.$requestId0 = $requestId;
    if ($replyTo === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(346)));
    $this.$replyTo2 = $replyTo;
    if ($payload !== null) {
        $this.$payload0 = $payload;
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(347)));
},
ucicsp_RpcPacket__init_0 = (var_0, var_1, var_2, var_3, var_4, var_5, var_6) => {
    let var_7 = new ucicsp_RpcPacket();
    ucicsp_RpcPacket__init_(var_7, var_0, var_1, var_2, var_3, var_4, var_5, var_6);
    return var_7;
},
ucicsp_RpcPacket__clinit_ = () => {
    ucicsp_RpcPacket_ADAPTER = ucicsp_RpcPacket$ProtoAdapter_RpcPacket__init_0();
},
k_LazyKt__LazyJVMKt = $rt_classWithoutFields(),
k_LazyKt__LazyJVMKt_lazy = ($mode, $initializer) => {
    let var$3, var$4, var$5;
    a: {
        kji_Intrinsics_checkNotNullParameter($mode, $rt_s(348));
        kji_Intrinsics_checkNotNullParameter($initializer, $rt_s(94));
        k_LazyKt__LazyJVMKt$WhenMappings_$callClinit();
        var$3 = k_LazyKt__LazyJVMKt$WhenMappings_$EnumSwitchMapping$0;
        $mode = $rt_nullCheck($mode);
        var$4 = jl_Enum_ordinal($mode);
        var$3 = $rt_nullCheck(var$3).data;
        switch (var$3[$rt_checkBounds(var$4, var$3)]) {
            case 1:
                var$5 = $rt_castToInterface(k_SynchronizedLazyImpl__init_1($initializer, null, 2, null), k_Lazy);
                break a;
            case 2:
                var$5 = $rt_castToInterface(k_SafePublicationLazyImpl__init_0($initializer), k_Lazy);
                break a;
            case 3:
                var$5 = $rt_castToInterface(k_UnsafeLazyImpl__init_0($initializer), k_Lazy);
                break a;
            default:
        }
        $rt_throw(k_NoWhenBranchMatchedException__init_0());
    }
    return var$5;
};
function jnc_CoderResult() {
    let a = this; jl_Object.call(a);
    a.$kind = 0;
    a.$length1 = 0;
}
let jnc_CoderResult_UNDERFLOW = null,
jnc_CoderResult_OVERFLOW = null,
jnc_CoderResult_$callClinit = () => {
    jnc_CoderResult_$callClinit = $rt_eraseClinit(jnc_CoderResult);
    jnc_CoderResult__clinit_();
},
jnc_CoderResult__init_0 = ($this, $kind, $length) => {
    jnc_CoderResult_$callClinit();
    jl_Object__init_($this);
    $this.$kind = $kind;
    $this.$length1 = $length;
},
jnc_CoderResult__init_ = (var_0, var_1) => {
    let var_2 = new jnc_CoderResult();
    jnc_CoderResult__init_0(var_2, var_0, var_1);
    return var_2;
},
jnc_CoderResult_isUnderflow = $this => {
    return $this.$kind ? 0 : 1;
},
jnc_CoderResult_isOverflow = $this => {
    return $this.$kind != 1 ? 0 : 1;
},
jnc_CoderResult_isError = $this => {
    return !$this.$isMalformed() && !$this.$isUnmappable() ? 0 : 1;
},
jnc_CoderResult_isMalformed = $this => {
    return $this.$kind != 2 ? 0 : 1;
},
jnc_CoderResult_isUnmappable = $this => {
    return $this.$kind != 3 ? 0 : 1;
},
jnc_CoderResult_length = $this => {
    if ($this.$isError())
        return $this.$length1;
    $rt_throw(jl_UnsupportedOperationException__init_2());
},
jnc_CoderResult_malformedForLength = $length => {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult__init_(2, $length);
},
jnc_CoderResult_unmappableForLength = $length => {
    jnc_CoderResult_$callClinit();
    return jnc_CoderResult__init_(3, $length);
},
jnc_CoderResult_throwException = $this => {
    switch ($this.$kind) {
        case 0:
            $rt_throw(jnc_BufferUnderflowException__init_0());
        case 1:
            $rt_throw(jnc_BufferOverflowException__init_0());
        case 2:
            $rt_throw(jnc_MalformedInputException__init_0($this.$length1));
        case 3:
            $rt_throw(jnc_UnmappableCharacterException__init_0($this.$length1));
        default:
    }
},
jnc_CoderResult__clinit_ = () => {
    jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
    jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
},
otcit_DoubleAnalyzer = $rt_classWithoutFields(),
otcit_DoubleAnalyzer_MAX_MANTISSA = Long_ZERO,
otcit_DoubleAnalyzer_resultForLog10 = null,
otcit_DoubleAnalyzer_mantissa10Table = null,
otcit_DoubleAnalyzer_exp10Table = null,
otcit_DoubleAnalyzer_$callClinit = () => {
    otcit_DoubleAnalyzer_$callClinit = $rt_eraseClinit(otcit_DoubleAnalyzer);
    otcit_DoubleAnalyzer__clinit_();
},
otcit_DoubleAnalyzer_analyze = ($d, $result) => {
    let $bits, var$4, $mantissa, $exponent, var$7, $decExponent, var$9, $binExponentCorrection, $mantissaShift, $decMantissa, var$13, var$14, var$15, var$16, $decMantissaHi, $decMantissaLow, $lowerPos, $upperPos, $posCmp;
    otcit_DoubleAnalyzer_$callClinit();
    $bits = jl_Double_doubleToLongBits($d);
    var$4 = Long_eq(Long_and($bits, Long_create(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $result = $rt_nullCheck($result);
    $result.$sign = var$4;
    $mantissa = Long_and($bits, Long_create(4294967295, 1048575));
    $exponent = Long_lo(Long_shr($bits, 52)) & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    if ($exponent)
        var$7 = Long_or($mantissa, Long_create(0, 1048576));
    else {
        var$7 = Long_shl($mantissa, 1);
        while (Long_eq(Long_and(var$7, Long_create(0, 1048576)), Long_ZERO)) {
            var$7 = Long_shl(var$7, 1);
            $exponent = $exponent + (-1) | 0;
        }
    }
    $decExponent = ju_Arrays_binarySearch0(otcit_DoubleAnalyzer_exp10Table, $exponent << 16 >> 16);
    if ($decExponent < 0)
        $decExponent =  -$decExponent | 0;
    var$9 = otcit_DoubleAnalyzer_exp10Table;
    var$4 = $decExponent + 1 | 0;
    var$9 = $rt_nullCheck(var$9).data;
    var$4 = $rt_checkBounds(var$4, var$9);
    $binExponentCorrection = $exponent - var$9[var$4] | 0;
    $mantissaShift = 12 + $binExponentCorrection | 0;
    var$9 = $rt_nullCheck(otcit_DoubleAnalyzer_mantissa10Table).data;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, var$9[$rt_checkUpperBound(var$4, var$9)], $mantissaShift);
    if (Long_le($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA)) {
        while (jl_Long_compareUnsigned($decMantissa, otcit_DoubleAnalyzer_MAX_MANTISSA) <= 0) {
            $decExponent = $decExponent + (-1) | 0;
            $decMantissa = Long_add(Long_mul($decMantissa, Long_fromInt(10)), Long_fromInt(9));
        }
        var$9 = otcit_DoubleAnalyzer_exp10Table;
        var$4 = $decExponent + 1 | 0;
        var$9 = $rt_nullCheck(var$9).data;
        var$13 = $rt_checkBounds(var$4, var$9);
        var$4 = $exponent - var$9[var$13] | 0;
        $mantissaShift = 12 + var$4 | 0;
        var$9 = $rt_nullCheck(otcit_DoubleAnalyzer_mantissa10Table).data;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, var$9[$rt_checkUpperBound(var$13, var$9)], $mantissaShift);
    }
    var$7 = Long_shl(var$7, 1);
    var$14 = Long_add(var$7, Long_fromInt(1));
    var$9 = otcit_DoubleAnalyzer_mantissa10Table;
    var$4 = $decExponent + 1 | 0;
    var$9 = $rt_nullCheck(var$9).data;
    var$15 = $rt_checkBounds(var$4, var$9);
    var$16 = var$9[var$15];
    var$13 = $mantissaShift - 1 | 0;
    $decMantissaHi = otcit_DoubleAnalyzer_mulAndShiftRight(var$14, var$16, var$13);
    var$7 = Long_sub(var$7, Long_fromInt(1));
    var$9 = $rt_nullCheck(otcit_DoubleAnalyzer_mantissa10Table).data;
    $decMantissaLow = otcit_DoubleAnalyzer_mulAndShiftRight(var$7, var$9[$rt_checkUpperBound(var$15, var$9)], var$13);
    $lowerPos = otcit_DoubleAnalyzer_findLowerDistance($decMantissa, $decMantissaLow);
    $upperPos = otcit_DoubleAnalyzer_findUpperDistance($decMantissa, $decMantissaHi);
    $posCmp = jl_Long_compareUnsigned($lowerPos, $upperPos);
    var$14 = $posCmp > 0 ? Long_mul(jl_Long_divideUnsigned($decMantissa, $lowerPos), $lowerPos) : $posCmp < 0 ? Long_add(Long_mul(jl_Long_divideUnsigned($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(jl_Long_divideUnsigned(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (jl_Long_compareUnsigned(var$14, Long_create(2808348672, 232830643)) >= 0)
        while (true) {
            $decExponent = $decExponent + 1 | 0;
            var$14 = jl_Long_divideUnsigned(var$14, Long_fromInt(10));
            if (jl_Long_compareUnsigned(var$14, Long_create(2808348672, 232830643)) < 0)
                break;
        }
    else if (jl_Long_compareUnsigned(var$14, Long_create(1569325056, 23283064)) < 0) {
        $decExponent = $decExponent + (-1) | 0;
        var$14 = Long_mul(var$14, Long_fromInt(10));
    }
    $result.$mantissa = var$14;
    $result.$exponent = $decExponent - 330 | 0;
},
otcit_DoubleAnalyzer_findLowerDistance = ($mantissa, $lower) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($lower, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) <= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_findUpperDistance = ($mantissa, $upper) => {
    let $pos, $pos_0, var$5, var$6;
    otcit_DoubleAnalyzer_$callClinit();
    $pos = Long_fromInt(1);
    while (true) {
        $pos_0 = Long_mul($pos, Long_fromInt(10));
        var$5 = jl_Long_divideUnsigned($mantissa, $pos_0);
        var$6 = jl_Long_divideUnsigned($upper, $pos_0);
        if (jl_Long_compareUnsigned(var$5, var$6) >= 0)
            break;
        $pos = $pos_0;
    }
    return $pos;
},
otcit_DoubleAnalyzer_mulAndShiftRight = ($a, $b, $shift) => {
    let $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c1, $c2, $c3, $c, var$18;
    otcit_DoubleAnalyzer_$callClinit();
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c1 = Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4));
    $c2 = Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4));
    $c3 = Long_mul($b4, $a4);
    $c = Long_add(Long_add(Long_shl($c3, 32 + $shift | 0), Long_shl($c2, 16 + $shift | 0)), Long_shl($c1, $shift));
    var$18 = Long_add($cm, Long_shl($c0, 16));
    var$18 = Long_add($c, Long_shru(var$18, 32 - $shift | 0));
    return var$18;
},
otcit_DoubleAnalyzer__clinit_ = () => {
    otcit_DoubleAnalyzer_MAX_MANTISSA = jl_Long_divideUnsigned(Long_fromInt(-1), Long_fromInt(10));
    otcit_DoubleAnalyzer_resultForLog10 = otcit_DoubleAnalyzer$Result__init_();
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArrayFromData([Long_create(3251292512, 2194092222), Long_create(1766094183, 3510547556), Long_create(553881887, 2808438045), Long_create(443105509, 2246750436), Long_create(3285949193, 3594800697), Long_create(910772436, 2875840558), Long_create(2446604867, 2300672446), Long_create(2196580869, 3681075914), Long_create(2616258154, 2944860731), Long_create(1234013064, 2355888585), Long_create(1974420903, 3769421736), Long_create(720543263, 3015537389), Long_create(1435428070, 2412429911),
    Long_create(578697993, 3859887858), Long_create(2180945313, 3087910286), Long_create(885762791, 2470328229), Long_create(3135207384, 3952525166), Long_create(1649172448, 3162020133), Long_create(3037324877, 2529616106), Long_create(3141732885, 4047385770), Long_create(2513386308, 3237908616), Long_create(1151715587, 2590326893), Long_create(983751480, 4144523029), Long_create(1645994643, 3315618423), Long_create(3034782633, 2652494738), Long_create(3996658754, 4243991581), Long_create(2338333544, 3395193265),
    Long_create(1870666835, 2716154612), Long_create(4073513845, 2172923689), Long_create(3940641775, 3476677903), Long_create(575533043, 2781342323), Long_create(2178413352, 2225073858), Long_create(2626467905, 3560118173), Long_create(3819161242, 2848094538), Long_create(478348616, 2278475631), Long_create(3342338164, 3645561009), Long_create(3532863990, 2916448807), Long_create(1108304273, 2333159046), Long_create(55299919, 3733054474), Long_create(903233395, 2986443579), Long_create(1581580175, 2389154863),
    Long_create(1671534821, 3822647781), Long_create(478234397, 3058118225), Long_create(382587518, 2446494580), Long_create(612140029, 3914391328), Long_create(2207698941, 3131513062), Long_create(48172235, 2505210450), Long_create(77075576, 4008336720), Long_create(61660460, 3206669376), Long_create(3485302205, 2565335500), Long_create(1281516232, 4104536801), Long_create(166219527, 3283629441), Long_create(3568949458, 2626903552), Long_create(2274345296, 4203045684), Long_create(2678469696, 3362436547), Long_create(424788838, 2689949238),
    Long_create(2057817989, 2151959390), Long_create(3292508783, 3443135024), Long_create(3493000485, 2754508019), Long_create(3653393847, 2203606415), Long_create(1550462860, 3525770265), Long_create(1240370288, 2820616212), Long_create(3569276608, 2256492969), Long_create(3133862195, 3610388751), Long_create(1648096297, 2888311001), Long_create(459483578, 2310648801), Long_create(3312154103, 3697038081), Long_create(1790729823, 2957630465), Long_create(1432583858, 2366104372), Long_create(3151127633, 3785766995),
    Long_create(2520902106, 3028613596), Long_create(1157728226, 2422890877), Long_create(2711358621, 3876625403), Long_create(3887073815, 3101300322), Long_create(1391672133, 2481040258), Long_create(1367681954, 3969664413), Long_create(2812132482, 3175731530), Long_create(2249705985, 2540585224), Long_create(1022549199, 4064936359), Long_create(1677032818, 3251949087), Long_create(3918606632, 2601559269), Long_create(3692790234, 4162494831), Long_create(2095238728, 3329995865), Long_create(1676190982, 2663996692),
    Long_create(3540899031, 4262394707), Long_create(1114732307, 3409915766), Long_create(32792386, 2727932613), Long_create(1744220827, 2182346090), Long_create(2790753324, 3491753744), Long_create(3091596118, 2793402995), Long_create(2473276894, 2234722396), Long_create(2239256113, 3575555834), Long_create(2650398349, 2860444667), Long_create(402331761, 2288355734), Long_create(2361717736, 3661369174), Long_create(2748367648, 2929095339), Long_create(3057687578, 2343276271), Long_create(3174313206, 3749242034),
    Long_create(3398444024, 2999393627), Long_create(1000768301, 2399514902), Long_create(2460222741, 3839223843), Long_create(3686165111, 3071379074), Long_create(3807925548, 2457103259), Long_create(3515700499, 3931365215), Long_create(2812560399, 3145092172), Long_create(532061401, 2516073738), Long_create(4287272078, 4025717980), Long_create(3429817663, 3220574384), Long_create(3602847589, 2576459507), Long_create(2328582306, 4122335212), Long_create(144878926, 3297868170), Long_create(115903141, 2638294536),
    Long_create(2762425404, 4221271257), Long_create(491953404, 3377017006), Long_create(3829536560, 2701613604), Long_create(3922622707, 2161290883), Long_create(1122235577, 3458065414), Long_create(1756781920, 2766452331), Long_create(546432077, 2213161865), Long_create(874291324, 3541058984), Long_create(1558426518, 2832847187), Long_create(3823721592, 2266277749), Long_create(3540974170, 3626044399), Long_create(3691772795, 2900835519), Long_create(3812411695, 2320668415), Long_create(1804891416, 3713069465),
    Long_create(1443913133, 2970455572), Long_create(3732110884, 2376364457), Long_create(2535403578, 3802183132), Long_create(310335944, 3041746506), Long_create(3684242592, 2433397204), Long_create(3317807769, 3893435527), Long_create(936259297, 3114748422), Long_create(3325987815, 2491798737), Long_create(1885606668, 3986877980), Long_create(1508485334, 3189502384), Long_create(2065781726, 2551601907), Long_create(4164244222, 4082563051), Long_create(2472401918, 3266050441), Long_create(1118928075, 2612840353),
    Long_create(931291461, 4180544565), Long_create(745033169, 3344435652), Long_create(3173006913, 2675548521), Long_create(3358824142, 4280877634), Long_create(3546052773, 3424702107), Long_create(1118855300, 2739761686), Long_create(36090780, 2191809349), Long_create(1775732167, 3506894958), Long_create(3138572652, 2805515966), Long_create(1651864662, 2244412773), Long_create(1783990001, 3591060437), Long_create(4004172378, 2872848349), Long_create(4062331362, 2298278679), Long_create(3922749802, 3677245887),
    Long_create(1420212923, 2941796710), Long_create(1136170338, 2353437368), Long_create(958879082, 3765499789), Long_create(1626096725, 3012399831), Long_create(441883920, 2409919865), Long_create(707014273, 3855871784), Long_create(1424604878, 3084697427), Long_create(3716664280, 2467757941), Long_create(4228675929, 3948412706), Long_create(2523947284, 3158730165), Long_create(2019157827, 2526984132), Long_create(4089645983, 4043174611), Long_create(2412723327, 3234539689), Long_create(2789172121, 2587631751),
    Long_create(2744688475, 4140210802), Long_create(477763862, 3312168642), Long_create(2959191467, 2649734913), Long_create(3875712888, 4239575861), Long_create(2241576851, 3391660689), Long_create(2652254940, 2713328551), Long_create(1262810493, 2170662841), Long_create(302509870, 3473060546), Long_create(3677981733, 2778448436), Long_create(2083391927, 2222758749), Long_create(756446706, 3556413999), Long_create(1464150824, 2845131199), Long_create(2030314118, 2276104959), Long_create(671522212, 3641767935),
    Long_create(537217769, 2913414348), Long_create(2147761134, 2330731478), Long_create(2577424355, 3729170365), Long_create(2061939484, 2983336292), Long_create(4226531965, 2386669033), Long_create(1608490388, 3818670454), Long_create(2145785770, 3054936363), Long_create(3434615534, 2443949090), Long_create(1200417559, 3910318545), Long_create(960334047, 3128254836), Long_create(4204241074, 2502603868), Long_create(1572824964, 4004166190), Long_create(1258259971, 3203332952), Long_create(3583588354, 2562666361),
    Long_create(4015754449, 4100266178), Long_create(635623181, 3280212943), Long_create(2226485463, 2624170354), Long_create(985396364, 4198672567), Long_create(3365297469, 3358938053), Long_create(115257597, 2687150443), Long_create(1810192996, 2149720354), Long_create(319328417, 3439552567), Long_create(2832443111, 2751642053), Long_create(3983941407, 2201313642), Long_create(2938332415, 3522101828), Long_create(4068652850, 2817681462), Long_create(1536935362, 2254145170), Long_create(2459096579, 3606632272),
    Long_create(249290345, 2885305818), Long_create(1917419194, 2308244654), Long_create(490890333, 3693191447), Long_create(2969692644, 2954553157), Long_create(657767197, 2363642526), Long_create(3629407892, 3781828041), Long_create(2044532855, 3025462433), Long_create(3353613202, 2420369946), Long_create(3647794205, 3872591914), Long_create(3777228823, 3098073531), Long_create(2162789599, 2478458825), Long_create(3460463359, 3965534120), Long_create(2768370687, 3172427296), Long_create(1355703090, 2537941837),
    Long_create(3028118404, 4060706939), Long_create(3281488183, 3248565551), Long_create(1766197087, 2598852441), Long_create(1107928421, 4158163906), Long_create(27349277, 3326531125), Long_create(21879422, 2661224900), Long_create(35007075, 4257959840), Long_create(28005660, 3406367872), Long_create(2599384905, 2725094297), Long_create(361521006, 2180075438), Long_create(4014407446, 3488120700), Long_create(3211525957, 2790496560), Long_create(2569220766, 2232397248), Long_create(3251759766, 3571835597),
    Long_create(883420894, 2857468478), Long_create(2424723634, 2285974782), Long_create(443583977, 3657559652), Long_create(2931847559, 2926047721), Long_create(1486484588, 2340838177), Long_create(3237368801, 3745341083), Long_create(12914663, 2996272867), Long_create(2587312108, 2397018293), Long_create(3280705914, 3835229269), Long_create(3483558190, 3068183415), Long_create(2786846552, 2454546732), Long_create(1022980646, 3927274772), Long_create(3395364895, 3141819817), Long_create(998304997, 2513455854),
    Long_create(3315274914, 4021529366), Long_create(1793226472, 3217223493), Long_create(3152568096, 2573778794), Long_create(2467128576, 4118046071), Long_create(1114709402, 3294436857), Long_create(3468747899, 2635549485), Long_create(1255029343, 4216879177), Long_create(3581003852, 3373503341), Long_create(2005809622, 2698802673), Long_create(3322634616, 2159042138), Long_create(162254630, 3454467422), Long_create(2706784082, 2763573937), Long_create(447440347, 2210859150), Long_create(715904555, 3537374640),
    Long_create(572723644, 2829899712), Long_create(3035159293, 2263919769), Long_create(2279274491, 3622271631), Long_create(964426134, 2897817305), Long_create(771540907, 2318253844), Long_create(2952452370, 3709206150), Long_create(2361961896, 2967364920), Long_create(1889569516, 2373891936), Long_create(1305324308, 3798227098), Long_create(2762246365, 3038581678), Long_create(3927784010, 2430865342), Long_create(2848480580, 3889384548), Long_create(3996771382, 3111507638), Long_create(620436728, 2489206111),
    Long_create(3569679143, 3982729777), Long_create(1137756396, 3186183822), Long_create(3487185494, 2548947057), Long_create(2143522954, 4078315292), Long_create(4291798741, 3262652233), Long_create(856458615, 2610121787), Long_create(2229327243, 4176194859), Long_create(2642455254, 3340955887), Long_create(395977285, 2672764710), Long_create(633563656, 4276423536), Long_create(3942824761, 3421138828), Long_create(577279431, 2736911063), Long_create(2179810463, 2189528850), Long_create(3487696741, 3503246160),
    Long_create(2790157393, 2802596928), Long_create(3950112833, 2242077542), Long_create(2884206696, 3587324068), Long_create(4025352275, 2869859254), Long_create(4079275279, 2295887403), Long_create(1372879692, 3673419846), Long_create(239310294, 2938735877), Long_create(2768428613, 2350988701), Long_create(2711498862, 3761581922), Long_create(451212171, 3009265538), Long_create(2078956655, 2407412430), Long_create(3326330649, 3851859888), Long_create(84084141, 3081487911), Long_create(3503241150, 2465190328),
    Long_create(451225085, 3944304526), Long_create(3796953905, 3155443620), Long_create(3037563124, 2524354896), Long_create(3142114080, 4038967834), Long_create(3372684723, 3231174267), Long_create(980160860, 2584939414), Long_create(3286244294, 4135903062), Long_create(911008517, 3308722450), Long_create(728806813, 2646977960), Long_create(1166090902, 4235164736), Long_create(73879262, 3388131789), Long_create(918096869, 2710505431), Long_create(4170451332, 2168404344), Long_create(4095741754, 3469446951),
    Long_create(2417599944, 2775557561), Long_create(1075086496, 2220446049), Long_create(3438125312, 3552713678), Long_create(173519872, 2842170943), Long_create(1856802816, 2273736754), Long_create(393904128, 3637978807), Long_create(2892103680, 2910383045), Long_create(2313682944, 2328306436), Long_create(1983905792, 3725290298), Long_create(3305111552, 2980232238), Long_create(67108864, 2384185791), Long_create(2684354560, 3814697265), Long_create(2147483648, 3051757812), Long_create(0, 2441406250), Long_create(0, 3906250000),
    Long_create(0, 3125000000), Long_create(0, 2500000000), Long_create(0, 4000000000), Long_create(0, 3200000000), Long_create(0, 2560000000), Long_create(0, 4096000000), Long_create(0, 3276800000), Long_create(0, 2621440000), Long_create(0, 4194304000), Long_create(0, 3355443200), Long_create(0, 2684354560), Long_create(0, 2147483648), Long_create(3435973836, 3435973836), Long_create(1889785610, 2748779069), Long_create(2370821947, 2199023255), Long_create(3793315115, 3518437208), Long_create(457671715, 2814749767),
    Long_create(2943117749, 2251799813), Long_create(3849994940, 3602879701), Long_create(2221002492, 2882303761), Long_create(917808535, 2305843009), Long_create(3186480574, 3689348814), Long_create(3408177918, 2951479051), Long_create(1867548875, 2361183241), Long_create(1270091283, 3777893186), Long_create(157079567, 3022314549), Long_create(984657113, 2417851639), Long_create(3293438299, 3868562622), Long_create(916763721, 3094850098), Long_create(2451397895, 2475880078), Long_create(3063243173, 3961408125),
    Long_create(2450594538, 3169126500), Long_create(1960475630, 2535301200), Long_create(3136761009, 4056481920), Long_create(2509408807, 3245185536), Long_create(1148533586, 2596148429), Long_create(3555640657, 4153837486), Long_create(1985519066, 3323069989), Long_create(2447408712, 2658455991), Long_create(2197867021, 4253529586), Long_create(899300158, 3402823669), Long_create(1578433585, 2722258935), Long_create(1262746868, 2177807148), Long_create(1161401530, 3484491437), Long_create(3506101601, 2787593149),
    Long_create(3663874740, 2230074519), Long_create(3285219207, 3568119231), Long_create(1769181906, 2854495385), Long_create(1415345525, 2283596308), Long_create(1405559381, 3653754093), Long_create(2842434423, 2923003274), Long_create(3132940998, 2338402619), Long_create(2435725219, 3741444191), Long_create(1089586716, 2993155353), Long_create(2589656291, 2394524282), Long_create(707476229, 3831238852), Long_create(3142961361, 3064991081), Long_create(1655375629, 2451992865), Long_create(2648601007, 3923188584),
    Long_create(2977874265, 3138550867), Long_create(664312493, 2510840694), Long_create(2780886908, 4017345110), Long_create(2224709526, 3213876088), Long_create(3497754539, 2571100870), Long_create(1301439967, 4113761393), Long_create(2759138892, 3291009114), Long_create(3066304573, 2632807291), Long_create(3188100398, 4212491666), Long_create(1691486859, 3369993333), Long_create(3071176406, 2695994666), Long_create(1597947665, 2156795733), Long_create(1697722806, 3450873173), Long_create(3076165163, 2760698538),
    Long_create(4178919049, 2208558830), Long_create(2391303182, 3533694129), Long_create(2772036005, 2826955303), Long_create(3935615722, 2261564242), Long_create(2861011319, 3618502788), Long_create(4006795973, 2894802230), Long_create(3205436779, 2315841784), Long_create(2551718468, 3705346855), Long_create(2041374775, 2964277484), Long_create(2492093279, 2371421987), Long_create(551375410, 3794275180), Long_create(441100328, 3035420144), Long_create(1211873721, 2428336115), Long_create(1938997954, 3885337784),
    Long_create(2410191822, 3108270227), Long_create(210166539, 2486616182), Long_create(1195259923, 3978585891), Long_create(97214479, 3182868713), Long_create(1795758501, 2546294970), Long_create(2873213602, 4074071952), Long_create(580583963, 3259257562), Long_create(3041447548, 2607406049), Long_create(2289335700, 4171849679), Long_create(2690462019, 3337479743), Long_create(3870356534, 2669983794), Long_create(3615590076, 4271974071), Long_create(2033478602, 3417579257), Long_create(4203763259, 2734063405),
    Long_create(3363010607, 2187250724), Long_create(2803836594, 3499601159), Long_create(3102062734, 2799680927), Long_create(763663269, 2239744742), Long_create(2080854690, 3583591587), Long_create(4241664129, 2866873269), Long_create(4252324763, 2293498615), Long_create(2508752324, 3669597785), Long_create(2007001859, 2935678228), Long_create(3323588406, 2348542582), Long_create(1881767613, 3757668132), Long_create(4082394468, 3006134505), Long_create(3265915574, 2404907604), Long_create(2648484541, 3847852167),
    Long_create(400800715, 3078281734), Long_create(1179634031, 2462625387), Long_create(2746407909, 3940200619), Long_create(3056119786, 3152160495), Long_create(2444895829, 2521728396), Long_create(2193846408, 4034765434), Long_create(2614070585, 3227812347), Long_create(373269550, 2582249878), Long_create(4033205117, 4131599804), Long_create(4085557553, 3305279843), Long_create(691465664, 2644223875), Long_create(1106345063, 4230758200), Long_create(885076050, 3384606560), Long_create(708060840, 2707685248),
    Long_create(2284435591, 2166148198), Long_create(2796103486, 3465837117), Long_create(518895870, 2772669694), Long_create(1274110155, 2218135755), Long_create(2038576249, 3549017208), Long_create(3348847917, 2839213766), Long_create(1820084875, 2271371013), Long_create(2053142340, 3634193621), Long_create(783520413, 2907354897), Long_create(3203796708, 2325883917), Long_create(1690100896, 3721414268), Long_create(3070067635, 2977131414), Long_create(3315047567, 2381705131), Long_create(3586089190, 3810728210),
    Long_create(2868871352, 3048582568), Long_create(4013084000, 2438866054), Long_create(3843954022, 3902185687), Long_create(1357176299, 3121748550), Long_create(1085741039, 2497398840), Long_create(1737185663, 3995838144), Long_create(2248741989, 3196670515), Long_create(1798993591, 2557336412), Long_create(3737383206, 4091738259), Long_create(3848900024, 3273390607), Long_create(1361133101, 2618712486), Long_create(459826043, 4189939978), Long_create(2085847752, 3351951982), Long_create(4245658579, 2681561585),
    Long_create(2498086431, 4290498537), Long_create(280482227, 3432398830), Long_create(224385781, 2745919064), Long_create(1038502084, 2196735251), Long_create(4238583712, 3514776401), Long_create(2531873511, 2811821121), Long_create(1166505349, 2249456897), Long_create(2725402018, 3599131035), Long_create(2180321615, 2879304828), Long_create(3462244210, 2303443862), Long_create(2103616899, 3685510180), Long_create(1682893519, 2948408144), Long_create(2205308275, 2358726515), Long_create(3528493240, 3773962424),
    Long_create(3681788051, 3019169939), Long_create(3804423900, 2415335951), Long_create(74124026, 3864537523), Long_create(1777286139, 3091630018), Long_create(3139815829, 2473304014), Long_create(2446724950, 3957286423), Long_create(3675366878, 3165829138), Long_create(363313125, 2532663311), Long_create(3158281377, 4052261297), Long_create(808638183, 3241809038), Long_create(2364897465, 2593447230), Long_create(3783835944, 4149515568), Long_create(450088378, 3319612455), Long_create(360070702, 2655689964),
    Long_create(2294100042, 4249103942), Long_create(117293115, 3399283154), Long_create(952827951, 2719426523), Long_create(2480249279, 2175541218), Long_create(3109405388, 3480865949), Long_create(3346517769, 2784692759), Long_create(3536207675, 2227754207), Long_create(2221958443, 3564406732), Long_create(59579836, 2851525386), Long_create(3483637705, 2281220308), Long_create(419859574, 3649952494), Long_create(1194881118, 2919961995), Long_create(955904894, 2335969596), Long_create(4106428209, 3737551353),
    Long_create(708162189, 2990041083), Long_create(2284516670, 2392032866), Long_create(1937239754, 3827252586), Long_create(690798344, 3061802069), Long_create(1411632134, 2449441655), Long_create(2258611415, 3919106648), Long_create(3524876050, 3135285318), Long_create(242920462, 2508228255), Long_create(388672740, 4013165208), Long_create(2028925110, 3210532166), Long_create(764146629, 2568425733), Long_create(363641147, 4109481173), Long_create(2008899836, 3287584938), Long_create(3325106787, 2630067950),
    Long_create(1025203564, 4208108721), Long_create(4256136688, 3366486976), Long_create(2545915891, 2693189581), Long_create(1177739254, 2154551665), Long_create(1884382806, 3447282664), Long_create(2366499704, 2757826131), Long_create(1034206304, 2206260905), Long_create(1654730086, 3530017448), Long_create(3041770987, 2824013958), Long_create(4151403708, 2259211166), Long_create(629291719, 3614737867), Long_create(3080413753, 2891790293), Long_create(4182317920, 2313432234), Long_create(4114728295, 3701491575),
    Long_create(3291782636, 2961193260), Long_create(2633426109, 2368954608), Long_create(3354488315, 3790327373), Long_create(106610275, 3032261899), Long_create(944281679, 2425809519), Long_create(3228837605, 3881295230), Long_create(2583070084, 3105036184), Long_create(2925449526, 2484028947), Long_create(1244745405, 3974446316), Long_create(136802865, 3179557053), Long_create(1827429210, 2543645642), Long_create(3782880196, 4069833027), Long_create(1308317238, 3255866422), Long_create(3623634168, 2604693137),
    Long_create(2361840832, 4167509020), Long_create(1889472666, 3334007216), Long_create(652584673, 2667205773), Long_create(185142018, 4267529237), Long_create(2725093992, 3414023389), Long_create(3039068653, 2731218711), Long_create(1572261463, 2184974969), Long_create(4233605259, 3495959950), Long_create(3386884207, 2796767960), Long_create(2709507366, 2237414368), Long_create(3476218326, 3579862989), Long_create(3639968120, 2863890391), Long_create(2052981037, 2291112313), Long_create(2425776200, 3665779701),
    Long_create(1081627501, 2932623761), Long_create(6308541, 2346099009), Long_create(1728080585, 3753758414), Long_create(2241457927, 3003006731), Long_create(934172882, 2402405385), Long_create(1494676612, 3843848616), Long_create(336747830, 3075078893), Long_create(1987385183, 2460063114), Long_create(602835915, 3936100983), Long_create(2200255650, 3148880786), Long_create(901211061, 2519104629), Long_create(3159924616, 4030567406), Long_create(1668946233, 3224453925), Long_create(1335156987, 2579563140),
    Long_create(2136251179, 4127301024), Long_create(2567994402, 3301840819), Long_create(2913388981, 2641472655), Long_create(366455074, 4226356249), Long_create(1152157518, 3381084999), Long_create(1780719474, 2704867999), Long_create(2283569038, 2163894399), Long_create(1076730083, 3462231039), Long_create(1720377526, 2769784831), Long_create(517308561, 2215827865), Long_create(827693699, 3545324584), Long_create(1521148418, 2836259667), Long_create(3793899112, 2269007733), Long_create(916277824, 3630412374),
    Long_create(1592015718, 2904329899), Long_create(2132606034, 2323463919), Long_create(835189277, 3717542271), Long_create(4104125258, 2974033816), Long_create(2424306747, 2379227053), Long_create(3019897337, 3806763285), Long_create(2415917869, 3045410628), Long_create(3650721214, 2436328502), Long_create(2405180105, 3898125604), Long_create(2783137543, 3118500483), Long_create(3944496953, 2494800386), Long_create(298240911, 3991680619), Long_create(1097586188, 3193344495), Long_create(878068950, 2554675596),
    Long_create(3981890698, 4087480953), Long_create(608532181, 3269984763), Long_create(2204812663, 2615987810), Long_create(3527700261, 4185580496), Long_create(1963166749, 3348464397), Long_create(4147513777, 2678771517), Long_create(3200048207, 4286034428), Long_create(4278025484, 3428827542), Long_create(1704433468, 2743062034), Long_create(2222540234, 2194449627), Long_create(120090538, 3511119404), Long_create(955065889, 2808895523), Long_create(2482039630, 2247116418), Long_create(3112269949, 3595386269),
    Long_create(3348809418, 2876309015), Long_create(2679047534, 2301047212), Long_create(850502218, 3681675540), Long_create(680401775, 2945340432), Long_create(3121301797, 2356272345), Long_create(699115580, 3770035753), Long_create(2277279382, 3016028602), Long_create(103836587, 2412822882), Long_create(1025131999, 3860516611), Long_create(4256079436, 3088413288), Long_create(827883168, 2470730631), Long_create(3901593088, 3953169009)]);
    otcit_DoubleAnalyzer_exp10Table = $rt_createShortArrayFromData([(-70), (-66), (-63), (-60), (-56), (-53), (-50), (-46), (-43), (-40), (-36), (-33), (-30), (-26), (-23), (-20), (-16), (-13), (-10), (-6), (-3), 0, 4, 7, 10, 14, 17, 20, 23, 27, 30, 33, 37, 40, 43, 47, 50, 53, 57, 60, 63, 67, 70, 73, 77, 80, 83, 87, 90, 93, 97, 100, 103, 107, 110, 113, 116, 120, 123, 126, 130, 133, 136, 140, 143, 146, 150, 153, 156, 160, 163, 166, 170, 173, 176, 180, 183, 186, 190, 193, 196, 200, 203, 206, 210, 213, 216, 219,
    223, 226, 229, 233, 236, 239, 243, 246, 249, 253, 256, 259, 263, 266, 269, 273, 276, 279, 283, 286, 289, 293, 296, 299, 303, 306, 309, 312, 316, 319, 322, 326, 329, 332, 336, 339, 342, 346, 349, 352, 356, 359, 362, 366, 369, 372, 376, 379, 382, 386, 389, 392, 396, 399, 402, 406, 409, 412, 415, 419, 422, 425, 429, 432, 435, 439, 442, 445, 449, 452, 455, 459, 462, 465, 469, 472, 475, 479, 482, 485, 489, 492, 495, 499, 502, 505, 508, 512, 515, 518, 522, 525, 528, 532, 535, 538, 542, 545, 548, 552, 555, 558,
    562, 565, 568, 572, 575, 578, 582, 585, 588, 592, 595, 598, 601, 605, 608, 611, 615, 618, 621, 625, 628, 631, 635, 638, 641, 645, 648, 651, 655, 658, 661, 665, 668, 671, 675, 678, 681, 685, 688, 691, 695, 698, 701, 704, 708, 711, 714, 718, 721, 724, 728, 731, 734, 738, 741, 744, 748, 751, 754, 758, 761, 764, 768, 771, 774, 778, 781, 784, 788, 791, 794, 797, 801, 804, 807, 811, 814, 817, 821, 824, 827, 831, 834, 837, 841, 844, 847, 851, 854, 857, 861, 864, 867, 871, 874, 877, 881, 884, 887, 891, 894, 897,
    900, 904, 907, 910, 914, 917, 920, 924, 927, 930, 934, 937, 940, 944, 947, 950, 954, 957, 960, 964, 967, 970, 974, 977, 980, 984, 987, 990, 993, 997, 1000, 1003, 1007, 1010, 1013, 1017, 1020, 1023, 1027, 1030, 1033, 1037, 1040, 1043, 1047, 1050, 1053, 1057, 1060, 1063, 1067, 1070, 1073, 1077, 1080, 1083, 1086, 1090, 1093, 1096, 1100, 1103, 1106, 1110, 1113, 1116, 1120, 1123, 1126, 1130, 1133, 1136, 1140, 1143, 1146, 1150, 1153, 1156, 1160, 1163, 1166, 1170, 1173, 1176, 1180, 1183, 1186, 1189, 1193, 1196,
    1199, 1203, 1206, 1209, 1213, 1216, 1219, 1223, 1226, 1229, 1233, 1236, 1239, 1243, 1246, 1249, 1253, 1256, 1259, 1263, 1266, 1269, 1273, 1276, 1279, 1282, 1286, 1289, 1292, 1296, 1299, 1302, 1306, 1309, 1312, 1316, 1319, 1322, 1326, 1329, 1332, 1336, 1339, 1342, 1346, 1349, 1352, 1356, 1359, 1362, 1366, 1369, 1372, 1376, 1379, 1382, 1385, 1389, 1392, 1395, 1399, 1402, 1405, 1409, 1412, 1415, 1419, 1422, 1425, 1429, 1432, 1435, 1439, 1442, 1445, 1449, 1452, 1455, 1459, 1462, 1465, 1469, 1472, 1475, 1478,
    1482, 1485, 1488, 1492, 1495, 1498, 1502, 1505, 1508, 1512, 1515, 1518, 1522, 1525, 1528, 1532, 1535, 1538, 1542, 1545, 1548, 1552, 1555, 1558, 1562, 1565, 1568, 1572, 1575, 1578, 1581, 1585, 1588, 1591, 1595, 1598, 1601, 1605, 1608, 1611, 1615, 1618, 1621, 1625, 1628, 1631, 1635, 1638, 1641, 1645, 1648, 1651, 1655, 1658, 1661, 1665, 1668, 1671, 1674, 1678, 1681, 1684, 1688, 1691, 1694, 1698, 1701, 1704, 1708, 1711, 1714, 1718, 1721, 1724, 1728, 1731, 1734, 1738, 1741, 1744, 1748, 1751, 1754, 1758, 1761,
    1764, 1767, 1771, 1774, 1777, 1781, 1784, 1787, 1791, 1794, 1797, 1801, 1804, 1807, 1811, 1814, 1817, 1821, 1824, 1827, 1831, 1834, 1837, 1841, 1844, 1847, 1851, 1854, 1857, 1861, 1864, 1867, 1870, 1874, 1877, 1880, 1884, 1887, 1890, 1894, 1897, 1900, 1904, 1907, 1910, 1914, 1917, 1920, 1924, 1927, 1930, 1934, 1937, 1940, 1944, 1947, 1950, 1954, 1957, 1960, 1963, 1967, 1970, 1973, 1977, 1980, 1983, 1987, 1990, 1993, 1997, 2000, 2003, 2007, 2010, 2013, 2017, 2020, 2023, 2027, 2030, 2033, 2037, 2040, 2043,
    2047, 2050, 2053, 2057, 2060, 2063, 2066, 2070, 2073, 2076, 2080, 2083, 2086, 2090, 2093, 2096, 2100, 2103, 2106, 2110, 2113, 2116, 2120]);
},
kji_ReflectionFactory = $rt_classWithoutFields(),
kji_ReflectionFactory__init_ = $this => {
    jl_Object__init_($this);
},
kji_ReflectionFactory__init_0 = () => {
    let var_0 = new kji_ReflectionFactory();
    kji_ReflectionFactory__init_(var_0);
    return var_0;
},
kji_ReflectionFactory_getOrCreateKotlinClass = ($this, $javaClass) => {
    return kji_ClassReference__init_0($javaClass);
};
function csw_DoubleArrayProtoAdapter() {
    csw_ProtoAdapter.call(this);
    this.$originalAdapter4 = null;
}
let csw_DoubleArrayProtoAdapter__init_ = ($this, $originalAdapter) => {
    let var$2, var$3, var$4, var$5, var$6;
    kji_Intrinsics_checkNotNullParameter($originalAdapter, $rt_s(83));
    csw_FieldEncoding_$callClinit();
    var$2 = csw_FieldEncoding_LENGTH_DELIMITED;
    var$3 = kji_Reflection_getOrCreateKotlinClass($rt_cls($rt_arraycls($rt_doublecls)));
    var$4 = null;
    $originalAdapter = $rt_nullCheck($originalAdapter);
    var$5 = csw_ProtoAdapter_getSyntax($originalAdapter);
    var$6 = $rt_createDoubleArray(0);
    csw_ProtoAdapter__init_($this, var$2, var$3, var$4, var$5, var$6);
    $this.$originalAdapter4 = $originalAdapter;
},
csw_DoubleArrayProtoAdapter__init_0 = var_0 => {
    let var_1 = new csw_DoubleArrayProtoAdapter();
    csw_DoubleArrayProtoAdapter__init_(var_1, var_0);
    return var_1;
},
csw_DoubleArrayProtoAdapter_encodeWithTag = ($this, $writer, $tag, $value) => {
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null && (($value.data.length ? 0 : 1) ? 0 : 1))
        csw_ProtoAdapter_encodeWithTag($this, $writer, $tag, $value);
},
csw_DoubleArrayProtoAdapter_encode = ($this, $writer, $value) => {
    let var$3, $i, var$5;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    kji_Intrinsics_checkNotNullParameter($value, $rt_s(34));
    $value = $rt_nullCheck($value);
    var$3 = $value.data;
    $i = var$3.length - 1 | 0;
    while ((-1) < $i) {
        $i = $rt_checkUpperBound($i, var$3);
        var$5 = jl_Double_doubleToLongBits(var$3[$i]);
        $writer = $rt_nullCheck($writer);
        csw_ReverseProtoWriter_writeFixed64($writer, var$5);
        $i = $i + (-1) | 0;
    }
},
csw_DoubleArrayProtoAdapter_encodeWithTag0 = ($this, $writer, $tag, $value) => {
    csw_DoubleArrayProtoAdapter_encodeWithTag($this, $writer, $tag, $rt_castToInterface($value, $rt_arraycls($rt_doublecls)));
},
csw_DoubleArrayProtoAdapter_encode0 = ($this, $writer, $value) => {
    csw_DoubleArrayProtoAdapter_encode($this, $writer, $rt_castToInterface($value, $rt_arraycls($rt_doublecls)));
},
ki_ProgressionUtilKt = $rt_classWithoutFields(),
ki_ProgressionUtilKt_mod = ($a, $b) => {
    let $mod;
    $mod = $a % $b | 0;
    if ($mod < 0)
        $mod = $mod + $b | 0;
    return $mod;
},
ki_ProgressionUtilKt_differenceModulo = ($a, $b, $c) => {
    return ki_ProgressionUtilKt_mod(ki_ProgressionUtilKt_mod($a, $c) - ki_ProgressionUtilKt_mod($b, $c) | 0, $c);
},
ki_ProgressionUtilKt_getProgressionLastElement = ($start, $end, $step) => {
    if ($step <= 0) {
        if ($step >= 0)
            $rt_throw(jl_IllegalArgumentException__init_($rt_s(349)));
        if ($start > $end)
            $end = $end + ki_ProgressionUtilKt_differenceModulo($start, $end,  -$step | 0) | 0;
    } else if ($start < $end)
        $end = $end - ki_ProgressionUtilKt_differenceModulo($end, $start, $step) | 0;
    return $end;
},
k_NoWhenBranchMatchedException = $rt_classWithoutFields(jl_RuntimeException),
k_NoWhenBranchMatchedException__init_ = $this => {
    jl_RuntimeException__init_($this);
},
k_NoWhenBranchMatchedException__init_0 = () => {
    let var_0 = new k_NoWhenBranchMatchedException();
    k_NoWhenBranchMatchedException__init_(var_0);
    return var_0;
},
csw_ProtoAdapterKt$commonStructValue$1 = $rt_classWithoutFields(csw_ProtoAdapter),
csw_ProtoAdapterKt$commonStructValue$1__init_ = ($this, $$super_call_param$1, $$super_call_param$2, $$super_call_param$3) => {
    csw_ProtoAdapter__init_0($this, $$super_call_param$1, $$super_call_param$2, $rt_s(350), $$super_call_param$3);
},
csw_ProtoAdapterKt$commonStructValue$1__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new csw_ProtoAdapterKt$commonStructValue$1();
    csw_ProtoAdapterKt$commonStructValue$1__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
csw_ProtoAdapterKt$commonStructValue$1_encode = ($this, $writer, $value) => {
    let var$3;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value === null) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRUCT_NULL).$encodeWithTag0($writer, 1, $value);
    } else if ($value instanceof jl_Number) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_DOUBLE).$encodeWithTag0($writer, 2, jl_Double_valueOf($rt_nullCheck($rt_castToClass($value, jl_Number)).$doubleValue()));
    } else if ($value instanceof jl_String) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRING).$encodeWithTag0($writer, 3, $value);
    } else if ($value instanceof jl_Boolean) {
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_BOOL).$encodeWithTag0($writer, 4, $value);
    } else if ($rt_isInstance($value, ju_Map)) {
        csw_ProtoAdapter_$callClinit();
        var$3 = csw_ProtoAdapter_STRUCT_MAP;
        kji_Intrinsics_checkNotNull0($value, $rt_s(351));
        $rt_nullCheck(var$3).$encodeWithTag0($writer, 5, $rt_castToInterface($value, ju_Map));
    } else {
        if (!$rt_isInstance($value, ju_List))
            $rt_throw(jl_IllegalArgumentException__init_($rt_nullCheck($rt_nullCheck((jl_StringBuilder__init_()).$append3($rt_s(352))).$append($value)).$toString()));
        csw_ProtoAdapter_$callClinit();
        $rt_nullCheck(csw_ProtoAdapter_STRUCT_LIST).$encodeWithTag0($writer, 6, $value);
    }
},
csw_ProtoAdapterKt$commonStructValue$1_encodeWithTag = ($this, $writer, $tag, $value) => {
    let $byteCountBefore;
    kji_Intrinsics_checkNotNullParameter($writer, $rt_s(13));
    if ($value !== null)
        csw_ProtoAdapter_encodeWithTag($this, $writer, $tag, $value);
    else {
        $writer = $rt_nullCheck($writer);
        $byteCountBefore = csw_ReverseProtoWriter_getByteCount($writer);
        csw_ProtoAdapterKt$commonStructValue$1_encode($this, $writer, $value);
        csw_ReverseProtoWriter_writeVarint32($writer, csw_ReverseProtoWriter_getByteCount($writer) - $byteCountBefore | 0);
        csw_ReverseProtoWriter_writeTag($writer, $tag, csw_ProtoAdapter_getFieldEncoding$wire_runtime($this));
    }
},
kjf_Function21 = $rt_classWithoutFields(0),
kjf_Function22 = $rt_classWithoutFields(0),
uciisd_DepartmentCodec = $rt_classWithoutFields(),
uciisd_DepartmentCodec__init_ = $this => {
    jl_Object__init_($this);
},
uciisd_DepartmentCodec__init_0 = () => {
    let var_0 = new uciisd_DepartmentCodec();
    uciisd_DepartmentCodec__init_(var_0);
    return var_0;
},
uciisd_DepartmentCodec_toWire = ($this, $pojo) => {
    let var$2, var$3, var$4;
    if ($pojo === null)
        return null;
    var$2 = uciisdp_Department$Builder__init_0();
    var$2 = uciisdp_Department$Builder_name(var$2, $pojo.$getName());
    var$3 = uciisd_EmployeeCodec__init_0();
    var$3 = var$3.$toWire3($pojo.$getManager());
    var$2 = uciisdp_Department$Builder_manager($rt_nullCheck(var$2), var$3);
    var$3 = $rt_nullCheck($pojo.$getEmployees()).$stream();
    var$4 = uciisd_DepartmentCodec$toWire$lambda$_1_0__init_0();
    var$3 = $rt_nullCheck(var$3).$map(var$4);
    var$3 = $rt_castToInterface($rt_nullCheck(var$3).$collect(jus_Collectors_toList()), ju_List);
    var$2 = uciisdp_Department$Builder_employees($rt_nullCheck(var$2), var$3);
    var$2 = uciisdp_Department$Builder_build($rt_nullCheck(var$2));
    return var$2;
},
kjf_Function20 = $rt_classWithoutFields(0);
function ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1() {
    jl_Object.call(this);
    this.$_00 = null;
}
let ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1__init_ = (var$0, var$1) => {
    jl_Object__init_(var$0);
    var$0.$_00 = var$1;
},
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1__init_0 = var_0 => {
    let var_1 = new ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1();
    ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1__init_(var_1, var_0);
    return var_1;
},
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1_accept0 = (var$0, var$1) => {
    ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1_accept(var$0, $rt_castToClass(var$1, jl_Throwable));
},
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1_accept = (var$0, var$1) => {
    $rt_nullCheck(var$0.$_00).$completeExceptionally(var$1);
};
function ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0() {
    let a = this; jl_Object.call(a);
    a.$_02 = null;
    a.$_1 = null;
}
let ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0__init_ = (var$0, var$1, var$2) => {
    jl_Object__init_(var$0);
    var$0.$_02 = var$1;
    var$0.$_1 = var$2;
},
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0__init_0 = (var_0, var_1) => {
    let var_2 = new ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0();
    ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0__init_(var_2, var_0, var_1);
    return var_2;
},
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0_accept = (var$0, var$1) => {
    ucics_RpcClient$AsyncResultImpl_lambda$thenApply$0(var$0.$_02, var$0.$_1, var$1);
},
ju_HashMap$EntryIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator),
ju_HashMap$EntryIterator__init_ = ($this, $map) => {
    ju_HashMap$AbstractMapIterator__init_($this, $map);
},
ju_HashMap$EntryIterator__init_0 = var_0 => {
    let var_1 = new ju_HashMap$EntryIterator();
    ju_HashMap$EntryIterator__init_(var_1, var_0);
    return var_1;
},
ju_HashMap$EntryIterator_next = $this => {
    ju_HashMap$AbstractMapIterator_makeNext($this);
    return $this.$currentEntry;
},
ju_HashMap$EntryIterator_next0 = $this => {
    return $this.$next0();
};
function uciisdp_Address() {
    let a = this; csw_Message.call(a);
    a.$street0 = null;
    a.$city0 = null;
}
let uciisdp_Address_ADAPTER = null,
uciisdp_Address_$callClinit = () => {
    uciisdp_Address_$callClinit = $rt_eraseClinit(uciisdp_Address);
    uciisdp_Address__clinit_();
},
uciisdp_Address__init_ = ($this, $street, $city, $unknownFields) => {
    uciisdp_Address_$callClinit();
    csw_Message__init_($this, uciisdp_Address_ADAPTER, $unknownFields);
    if ($street === null)
        $rt_throw(jl_IllegalArgumentException__init_($rt_s(353)));
    $this.$street0 = $street;
    if ($city !== null) {
        $this.$city0 = $city;
        return;
    }
    $rt_throw(jl_IllegalArgumentException__init_($rt_s(354)));
},
uciisdp_Address__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new uciisdp_Address();
    uciisdp_Address__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
uciisdp_Address_equals = ($this, $other) => {
    let $o, var$3, var$4, var$5;
    if ($other === $this)
        return 1;
    if (!($other instanceof uciisdp_Address))
        return 0;
    a: {
        $o = $rt_castToClass($other, uciisdp_Address);
        var$3 = csw_Message_unknownFields($this);
        $o = $rt_nullCheck($o);
        if ($rt_nullCheck(var$3).$equals0(csw_Message_unknownFields($o))) {
            var$3 = $this.$street0;
            var$4 = $o.$street0;
            if (cswi_Internal_equals(var$3, var$4)) {
                var$3 = $this.$city0;
                var$4 = $o.$city0;
                if (cswi_Internal_equals(var$3, var$4)) {
                    var$5 = 1;
                    break a;
                }
            }
        }
        var$5 = 0;
    }
    return var$5;
},
uciisdp_Address_toString = $this => {
    let $builder;
    $builder = jl_StringBuilder__init_();
    if ($this.$street0 !== null)
        $rt_nullCheck($builder.$append3($rt_s(355))).$append3(cswi_Internal_sanitize($this.$street0));
    if ($this.$city0 !== null)
        $rt_nullCheck($builder.$append3($rt_s(356))).$append3(cswi_Internal_sanitize($this.$city0));
    return $rt_nullCheck($rt_nullCheck($builder.$replace1(0, 2, $rt_s(357))).$append0(125)).$toString();
},
uciisdp_Address__clinit_ = () => {
    uciisdp_Address_ADAPTER = uciisdp_Address$ProtoAdapter_Address__init_0();
};
function ju_Arrays$ArrayAsList() {
    ju_AbstractList.call(this);
    this.$array5 = null;
}
let ju_Arrays$ArrayAsList__init_ = ($this, $array) => {
    ju_AbstractList__init_($this);
    $this.$array5 = $array;
},
ju_Arrays$ArrayAsList__init_0 = var_0 => {
    let var_1 = new ju_Arrays$ArrayAsList();
    ju_Arrays$ArrayAsList__init_(var_1, var_0);
    return var_1;
},
ju_Arrays$ArrayAsList_get = ($this, $index) => {
    let var$2;
    var$2 = $rt_nullCheck($this.$array5).data;
    $index = $rt_checkBounds($index, var$2);
    return var$2[$index];
},
ju_Arrays$ArrayAsList_size = $this => {
    return $rt_nullCheck($this.$array5).data.length;
},
ju_Collections = $rt_classWithoutFields(),
ju_Collections_EMPTY_SET = null,
ju_Collections_EMPTY_MAP = null,
ju_Collections_EMPTY_LIST = null,
ju_Collections_EMPTY_ITERATOR = null,
ju_Collections_EMPTY_LIST_ITERATOR = null,
ju_Collections_reverseOrder = null,
ju_Collections_$callClinit = () => {
    ju_Collections_$callClinit = $rt_eraseClinit(ju_Collections);
    ju_Collections__clinit_();
},
ju_Collections_singleton = $o => {
    ju_Collections_$callClinit();
    return ju_TemplateCollections$SingleElementSet__init_0($o);
},
ju_Collections_singletonMap = ($key, $value) => {
    let $entries;
    ju_Collections_$callClinit();
    $entries = ju_Collections_singleton(ju_AbstractMap$SimpleImmutableEntry__init_0($key, $value));
    return ju_Collections$7__init_0($entries);
},
ju_Collections__clinit_ = () => {
    ju_Collections_EMPTY_SET = ju_Collections$1__init_0();
    ju_Collections_EMPTY_MAP = ju_Collections$2__init_0();
    ju_Collections_EMPTY_LIST = ju_Collections$3__init_0();
    ju_Collections_EMPTY_ITERATOR = ju_Collections$4__init_0();
    ju_Collections_EMPTY_LIST_ITERATOR = ju_Collections$5__init_0();
    ju_Collections_reverseOrder = ju_Collections$_clinit_$lambda$_59_0__init_0();
};
function uciisdp_MyData$Builder() {
    let a = this; csw_Message$Builder.call(a);
    a.$id1 = null;
    a.$content1 = null;
    a.$value7 = 0;
}
let uciisdp_MyData$Builder__init_ = $this => {
    csw_Message$Builder__init_($this);
    $this.$id1 = $rt_s(6);
    $this.$content1 = $rt_s(6);
    $this.$value7 = 0;
},
uciisdp_MyData$Builder__init_0 = () => {
    let var_0 = new uciisdp_MyData$Builder();
    uciisdp_MyData$Builder__init_(var_0);
    return var_0;
},
uciisdp_MyData$Builder_id = ($this, $id) => {
    $this.$id1 = $id;
    return $this;
},
uciisdp_MyData$Builder_content = ($this, $content) => {
    $this.$content1 = $content;
    return $this;
},
uciisdp_MyData$Builder_value = ($this, $value) => {
    $this.$value7 = $value;
    return $this;
},
uciisdp_MyData$Builder_build = $this => {
    return uciisdp_MyData__init_0($this.$id1, $this.$content1, $this.$value7, csw_Message$Builder_buildUnknownFields($this));
};
$rt_packages([-1, "com", 0, "squareup", 1, "wire", 2, "internal", -1, "java", 4, "util", 4, "nio", 6, "charset", 4, "io", 4, "time", 4, "net", 4, "lang", -1, "org", 12, "junit", 12, "teavm", 14, "junit", -1, "okio", -1, "uk", 17, "co", 18, "instanto", 19, "integration", 20, "service", 21, "dto", 22, "proto", 19, "client", 24, "service", 25, "proto", -1, "kotlin", 27, "jvm", 28, "internal", 28, "functions", 27, "collections"
]);
$rt_metadata([jl_Object, "Object", 11, 0, [], 0, 3, 0, 0, ["$getClass0", $rt_wrapFunction0(jl_Object_getClass), "$hashCode", $rt_wrapFunction0(jl_Object_hashCode), "$equals0", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString), "$identity", $rt_wrapFunction0(jl_Object_identity), "$clone0", $rt_wrapFunction0(jl_Object_clone)],
ucitrcc_Codec, 0, jl_Object, [], 3, 3, 0, 0, 0,
uciisd_OrganizationCodec, "OrganizationCodec", 22, jl_Object, [ucitrcc_Codec], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_OrganizationCodec__init_), "$toWire0", $rt_wrapFunction1(uciisd_OrganizationCodec_toWire), "$getWireAdapter", $rt_wrapFunction0(uciisd_OrganizationCodec_getWireAdapter), "$toWire1", $rt_wrapFunction1(uciisd_OrganizationCodec_toWire0)],
kjim_KMappedMarker, 0, jl_Object, [], 3, 3, 0, 0, 0,
kjim_KMutableIterable, 0, jl_Object, [kjim_KMappedMarker], 3, 3, 0, 0, 0,
kjim_KMutableCollection, 0, jl_Object, [kjim_KMutableIterable], 3, 3, 0, 0, 0,
kjim_KMutableList, 0, jl_Object, [kjim_KMutableCollection], 3, 3, 0, 0, 0,
jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_5", $rt_wrapFunction2(jnci_BufferedEncoder$Controller__init_), "$hasMoreInput0", $rt_wrapFunction0(jnci_BufferedEncoder$Controller_hasMoreInput), "$hasMoreInput", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_hasMoreInput0), "$hasMoreOutput", $rt_wrapFunction0(jnci_BufferedEncoder$Controller_hasMoreOutput0), "$hasMoreOutput0", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_hasMoreOutput), "$setInPosition", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_setInPosition),
"$setOutPosition", $rt_wrapFunction1(jnci_BufferedEncoder$Controller_setOutPosition)],
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Number__init_)],
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Integer, "Integer", 11, jl_Number, [jl_Comparable], 0, 3, 0, jl_Integer_$callClinit, ["$_init_0", $rt_wrapFunction1(jl_Integer__init_), "$intValue", $rt_wrapFunction0(jl_Integer_intValue), "$longValue", $rt_wrapFunction0(jl_Integer_longValue), "$floatValue", $rt_wrapFunction0(jl_Integer_floatValue), "$doubleValue", $rt_wrapFunction0(jl_Integer_doubleValue), "$toString", $rt_wrapFunction0(jl_Integer_toString1), "$equals0", $rt_wrapFunction1(jl_Integer_equals)],
uciisd_MyData, "MyData", 22, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_MyData__init_0), "$getId0", $rt_wrapFunction0(uciisd_MyData_getId), "$setId", $rt_wrapFunction1(uciisd_MyData_setId), "$getContent", $rt_wrapFunction0(uciisd_MyData_getContent), "$setContent", $rt_wrapFunction1(uciisd_MyData_setContent), "$getValue0", $rt_wrapFunction0(uciisd_MyData_getValue), "$setValue", $rt_wrapFunction1(uciisd_MyData_setValue)],
kr_KAnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, 0, jl_AbstractStringBuilder$Constants_$callClinit, 0,
jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_1", $rt_wrapFunction4(jnc_CharsetEncoder__init_0), "$_init_4", $rt_wrapFunction3(jnc_CharsetEncoder__init_), "$onMalformedInput0", $rt_wrapFunction1(jnc_CharsetEncoder_onMalformedInput), "$implOnMalformedInput", $rt_wrapFunction1(jnc_CharsetEncoder_implOnMalformedInput), "$onUnmappableCharacter0", $rt_wrapFunction1(jnc_CharsetEncoder_onUnmappableCharacter), "$implOnUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetEncoder_implOnUnmappableCharacter),
"$encode", $rt_wrapFunction3(jnc_CharsetEncoder_encode), "$encode10", $rt_wrapFunction1(jnc_CharsetEncoder_encode0), "$flush", $rt_wrapFunction1(jnc_CharsetEncoder_flush), "$implFlush", $rt_wrapFunction1(jnc_CharsetEncoder_implFlush), "$reset", $rt_wrapFunction0(jnc_CharsetEncoder_reset), "$implReset", $rt_wrapFunction0(jnc_CharsetEncoder_implReset)],
jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0, ["$_init_4", $rt_wrapFunction3(jnci_BufferedEncoder__init_), "$encodeLoop", $rt_wrapFunction2(jnci_BufferedEncoder_encodeLoop)],
jnci_UTF16Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, ["$_init_35", $rt_wrapFunction3(jnci_UTF16Encoder__init_), "$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF16Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
juf_Supplier, 0, jl_Object, [], 3, 3, 0, 0, 0,
jus_Collectors$toList$lambda$_2_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jus_Collectors$toList$lambda$_2_0__init_)],
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, jl_Thread_$callClinit, ["$_init_2", $rt_wrapFunction1(jl_Thread__init_0), "$_init_6", $rt_wrapFunction2(jl_Thread__init_), "$getId", $rt_wrapFunction0(jl_Thread_getId), "$getStackTrace", $rt_wrapFunction0(jl_Thread_getStackTrace)],
kr_KCallable, 0, jl_Object, [kr_KAnnotatedElement], 3, 3, 0, 0, 0,
k_Function, 0, jl_Object, [], 3, 3, 0, 0, 0,
kr_KFunction, 0, jl_Object, [kr_KCallable, k_Function], 3, 3, 0, 0, 0,
otj_TestEntryPoint$Launcher, 0, jl_Object, [], 3, 0, 0, 0, 0,
otj_TestEntryPoint$LauncherImpl1, "TestEntryPoint$LauncherImpl1", 15, jl_Object, [otj_TestEntryPoint$Launcher], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(otj_TestEntryPoint$LauncherImpl1__init_), "$launch", $rt_wrapFunction1(otj_TestEntryPoint$LauncherImpl1_launch)],
otj_TestEntryPoint$LauncherImpl0, "TestEntryPoint$LauncherImpl0", 15, jl_Object, [otj_TestEntryPoint$Launcher], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(otj_TestEntryPoint$LauncherImpl0__init_), "$launch", $rt_wrapFunction1(otj_TestEntryPoint$LauncherImpl0_launch)],
kt_CharsKt__CharJVMKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
csw_Message$Builder, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(csw_Message$Builder__init_), "$addUnknownFields", $rt_wrapFunction1(csw_Message$Builder_addUnknownFields), "$addUnknownField0", $rt_wrapFunction3(csw_Message$Builder_addUnknownField), "$buildUnknownFields", $rt_wrapFunction0(csw_Message$Builder_buildUnknownFields)],
uciisdp_Department$Builder, 0, csw_Message$Builder, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Department$Builder__init_), "$name2", $rt_wrapFunction1(uciisdp_Department$Builder_name), "$manager", $rt_wrapFunction1(uciisdp_Department$Builder_manager), "$employees", $rt_wrapFunction1(uciisdp_Department$Builder_employees), "$build4", $rt_wrapFunction0(uciisdp_Department$Builder_build)],
jus_Collector, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$fillInStackTrace", $rt_wrapFunction0(jl_Throwable_fillInStackTrace), "$getMessage", $rt_wrapFunction0(jl_Throwable_getMessage), "$getLocalizedMessage", $rt_wrapFunction0(jl_Throwable_getLocalizedMessage), "$getCause", $rt_wrapFunction0(jl_Throwable_getCause), "$printStackTrace1", $rt_wrapFunction0(jl_Throwable_printStackTrace), "$printStackTrace", $rt_wrapFunction1(jl_Throwable_printStackTrace0), "$getStackTrace", $rt_wrapFunction0(jl_Throwable_getStackTrace), "$setStackTrace",
$rt_wrapFunction1(jl_Throwable_setStackTrace)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Exception__init_), "$_init_2", $rt_wrapFunction1(jl_Exception__init_0), "$_init_3", $rt_wrapFunction1(jl_Exception__init_1)],
jl_RuntimeException, "RuntimeException", 11, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_RuntimeException__init_), "$_init_2", $rt_wrapFunction1(jl_RuntimeException__init_0), "$_init_3", $rt_wrapFunction1(jl_RuntimeException__init_2)],
jnc_BufferOverflowException, "BufferOverflowException", 7, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jnc_BufferOverflowException__init_)],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
jnc_Channel, 0, jl_Object, [ji_Closeable], 3, 3, 0, 0, 0,
csw_ProtoAdapter, 0, jl_Object, [], 1, 3, 0, csw_ProtoAdapter_$callClinit, ["$_init_13", function(var_1, var_2, var_3, var_4, var_5, var_6) { csw_ProtoAdapter__init_2(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$getFieldEncoding$wire_runtime", $rt_wrapFunction0(csw_ProtoAdapter_getFieldEncoding$wire_runtime), "$getType", $rt_wrapFunction0(csw_ProtoAdapter_getType), "$getSyntax", $rt_wrapFunction0(csw_ProtoAdapter_getSyntax), "$getIdentity", $rt_wrapFunction0(csw_ProtoAdapter_getIdentity), "$_init_44",
$rt_wrapFunction2(csw_ProtoAdapter__init_3), "$_init_11", $rt_wrapFunction4(csw_ProtoAdapter__init_0), "$_init_12", function(var_1, var_2, var_3, var_4, var_5) { csw_ProtoAdapter__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$_init_16", function(var_1, var_2, var_3, var_4, var_5, var_6) { csw_ProtoAdapter__init_1(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$encodeWithTag", $rt_wrapFunction3(csw_ProtoAdapter_encodeWithTag0), "$encodeWithTag0", $rt_wrapFunction3(csw_ProtoAdapter_encodeWithTag),
"$encode2", $rt_wrapFunction2(csw_ProtoAdapter_encode0), "$encode19", $rt_wrapFunction1(csw_ProtoAdapter_encode), "$decode8", $rt_wrapFunction1(csw_ProtoAdapter_decode), "$decode", $rt_wrapFunction1(csw_ProtoAdapter_decode0), "$asRepeated", $rt_wrapFunction0(csw_ProtoAdapter_asRepeated)],
uciisdp_Department$ProtoAdapter_Department, 0, csw_ProtoAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Department$ProtoAdapter_Department__init_), "$encode3", $rt_wrapFunction2(uciisdp_Department$ProtoAdapter_Department_encode), "$encode1", $rt_wrapFunction2(uciisdp_Department$ProtoAdapter_Department_encode0)],
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_Error__init_), "$_init_17", $rt_wrapFunction2(jl_Error__init_1), "$_init_2", $rt_wrapFunction1(jl_Error__init_2), "$_init_3", $rt_wrapFunction1(jl_Error__init_0)],
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, 0,
ju_Map, "Map", 5, jl_Object, [], 3, 3, 0, 0, 0,
ju_SequencedMap, 0, jl_Object, [ju_Map], 3, 3, 0, 0, 0,
oi__Buffer, 0, jl_Object, [], 4, 3, 0, oi__Buffer_$callClinit, 0,
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IndexOutOfBoundsException__init_1), "$_init_2", $rt_wrapFunction1(jl_IndexOutOfBoundsException__init_)],
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 11, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_StringIndexOutOfBoundsException__init_0)],
csw_ProtoAdapterKt$commonDuration$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonDuration$1__init_), "$encode4", $rt_wrapFunction2(csw_ProtoAdapterKt$commonDuration$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonDuration$1_encode0)]]);
$rt_metadata([jnc_CharsetDecoder, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_4", $rt_wrapFunction3(jnc_CharsetDecoder__init_), "$onMalformedInput", $rt_wrapFunction1(jnc_CharsetDecoder_onMalformedInput), "$implOnMalformedInput", $rt_wrapFunction1(jnc_CharsetDecoder_implOnMalformedInput), "$onUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetDecoder_onUnmappableCharacter), "$implOnUnmappableCharacter", $rt_wrapFunction1(jnc_CharsetDecoder_implOnUnmappableCharacter), "$decode1", $rt_wrapFunction3(jnc_CharsetDecoder_decode),
"$flush0", $rt_wrapFunction1(jnc_CharsetDecoder_flush), "$reset0", $rt_wrapFunction0(jnc_CharsetDecoder_reset), "$decode3", $rt_wrapFunction1(jnc_CharsetDecoder_decode0), "$implFlush0", $rt_wrapFunction1(jnc_CharsetDecoder_implFlush), "$implReset", $rt_wrapFunction0(jnc_CharsetDecoder_implReset)],
o_ByteString, "ByteString", 16, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, o_ByteString_$callClinit, ["$_init_18", $rt_wrapFunction1(o_ByteString__init_), "$getData$okio", $rt_wrapFunction0(o_ByteString_getData$okio), "$getUtf8$okio", $rt_wrapFunction0(o_ByteString_getUtf8$okio), "$setUtf8$okio", $rt_wrapFunction1(o_ByteString_setUtf8$okio), "$utf8", $rt_wrapFunction0(o_ByteString_utf8), "$hex", $rt_wrapFunction0(o_ByteString_hex), "$size", $rt_wrapFunction0(o_ByteString_size), "$getSize$okio", $rt_wrapFunction0(o_ByteString_getSize$okio),
"$toByteArray", $rt_wrapFunction0(o_ByteString_toByteArray), "$internalArray$okio", $rt_wrapFunction0(o_ByteString_internalArray$okio), "$write$okio", $rt_wrapFunction3(o_ByteString_write$okio), "$rangeEquals", $rt_wrapFunction4(o_ByteString_rangeEquals), "$copyInto0", $rt_wrapFunction4(o_ByteString_copyInto), "$equals0", $rt_wrapFunction1(o_ByteString_equals), "$toString", $rt_wrapFunction0(o_ByteString_toString)],
o_SegmentedByteString, "SegmentedByteString", 16, o_ByteString, [], 4, 3, 0, 0, ["$_init_86", $rt_wrapFunction2(o_SegmentedByteString__init_), "$getSegments$okio", $rt_wrapFunction0(o_SegmentedByteString_getSegments$okio), "$getDirectory$okio", $rt_wrapFunction0(o_SegmentedByteString_getDirectory$okio), "$hex", $rt_wrapFunction0(o_SegmentedByteString_hex), "$getSize$okio", $rt_wrapFunction0(o_SegmentedByteString_getSize$okio), "$toByteArray", $rt_wrapFunction0(o_SegmentedByteString_toByteArray), "$write$okio",
$rt_wrapFunction3(o_SegmentedByteString_write$okio), "$rangeEquals0", $rt_wrapFunction4(o_SegmentedByteString_rangeEquals), "$rangeEquals", $rt_wrapFunction4(o_SegmentedByteString_rangeEquals0), "$copyInto0", $rt_wrapFunction4(o_SegmentedByteString_copyInto), "$internalArray$okio", $rt_wrapFunction0(o_SegmentedByteString_internalArray$okio), "$equals0", $rt_wrapFunction1(o_SegmentedByteString_equals), "$toString", $rt_wrapFunction0(o_SegmentedByteString_toString)],
o_Source, 0, jl_Object, [ji_Closeable], 3, 3, 0, 0, 0,
jnc_ReadableByteChannel, 0, jl_Object, [jnc_Channel], 3, 3, 0, 0, 0,
o_BufferedSource, 0, jl_Object, [o_Source, jnc_ReadableByteChannel], 3, 3, 0, 0, 0,
jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, jn_ByteOrder_$callClinit, 0,
k_Unit, "Unit", 27, jl_Object, [], 4, 3, 0, 0, 0,
csw_ProtoAdapterKt$commonSint64$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonSint64$1__init_), "$encode5", $rt_wrapFunction2(csw_ProtoAdapterKt$commonSint64$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonSint64$1_encode0)],
csw_ReverseProtoWriter, 0, jl_Object, [], 4, 3, 0, csw_ReverseProtoWriter_$callClinit, ["$_init_", $rt_wrapFunction0(csw_ReverseProtoWriter__init_), "$getByteCount", $rt_wrapFunction0(csw_ReverseProtoWriter_getByteCount), "$writeTo", $rt_wrapFunction1(csw_ReverseProtoWriter_writeTo), "$writeBytes", $rt_wrapFunction1(csw_ReverseProtoWriter_writeBytes), "$writeString", $rt_wrapFunction1(csw_ReverseProtoWriter_writeString), "$writeTag", $rt_wrapFunction2(csw_ReverseProtoWriter_writeTag), "$writeSignedVarint32$wire_runtime",
$rt_wrapFunction1(csw_ReverseProtoWriter_writeSignedVarint32$wire_runtime), "$writeVarint32", $rt_wrapFunction1(csw_ReverseProtoWriter_writeVarint32), "$writeVarint64", $rt_wrapFunction1(csw_ReverseProtoWriter_writeVarint64), "$writeFixed32", $rt_wrapFunction1(csw_ReverseProtoWriter_writeFixed32), "$writeFixed64", $rt_wrapFunction1(csw_ReverseProtoWriter_writeFixed64)],
oj_ComparisonFailure$ComparisonCompactor$DiffExtractor, 0, jl_Object, [], 0, 0, 0, 0, ["$expectedDiff", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_expectedDiff), "$actualDiff", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_actualDiff), "$compactPrefix", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactPrefix), "$compactSuffix", $rt_wrapFunction0(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor_compactSuffix), "$_init_69",
$rt_wrapFunction2(oj_ComparisonFailure$ComparisonCompactor$DiffExtractor__init_)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0, ["$_init_22", $rt_wrapFunction2(jl_Enum__init_), "$ordinal", $rt_wrapFunction0(jl_Enum_ordinal), "$toString", $rt_wrapFunction0(jl_Enum_toString), "$equals0", $rt_wrapFunction1(jl_Enum_equals)],
k_LazyThreadSafetyMode, "LazyThreadSafetyMode", 27, jl_Enum, [], 12, 3, 0, k_LazyThreadSafetyMode_$callClinit, 0,
ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_OutputStream__init_)],
ji_ByteArrayOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_ByteArrayOutputStream__init_0), "$_init_0", $rt_wrapFunction1(ji_ByteArrayOutputStream__init_)],
csw_Message$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(csw_Message$Companion__init_)],
csw_ProtoAdapterKt$commonFixed64$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonFixed64$1__init_), "$encodedSize0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed64$1_encodedSize), "$encode6", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed64$1_encode0), "$encode5", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed64$1_encode), "$decode2", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed64$1_decode), "$encodedSize", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed64$1_encodedSize0),
"$encode0", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed64$1_encode1), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed64$1_encode2), "$decode0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed64$1_decode0)],
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
kc_AbstractCollection, 0, jl_Object, [ju_Collection, kjim_KMappedMarker], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(kc_AbstractCollection__init_), "$contains0", $rt_wrapFunction1(kc_AbstractCollection_contains), "$isEmpty", $rt_wrapFunction0(kc_AbstractCollection_isEmpty), "$toString", $rt_wrapFunction0(kc_AbstractCollection_toString), "$size", $rt_wrapFunction0(kc_AbstractCollection_size)],
jnci_AsciiEncoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction1(jnci_AsciiEncoder__init_), "$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_AsciiEncoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
kji_FunctionBase, 0, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kji_Lambda, 0, jl_Object, [kji_FunctionBase, ji_Serializable], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(kji_Lambda__init_)],
kjf_Function0, "Function0", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
csw_ReverseProtoWriter$forwardWriter$2, 0, kji_Lambda, [kjf_Function0], 4, 0, 0, 0, ["$_init_20", $rt_wrapFunction1(csw_ReverseProtoWriter$forwardWriter$2__init_)],
jl_ReflectiveOperationException, 0, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ReflectiveOperationException__init_)],
jl_ClassCastException, "ClassCastException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ClassCastException__init_0)],
jtt_TemporalAccessor, 0, jl_Object, [], 3, 3, 0, 0, 0,
jnc_CoderMalfunctionError, "CoderMalfunctionError", 7, jl_Error, [], 0, 3, 0, 0, ["$_init_3", $rt_wrapFunction1(jnc_CoderMalfunctionError__init_)],
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractMap__init_)],
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$_init_", $rt_wrapFunction0(ju_HashMap__init_1), "$_init_0", $rt_wrapFunction1(ju_HashMap__init_), "$_init_24", $rt_wrapFunction2(ju_HashMap__init_2), "$entrySet", $rt_wrapFunction0(ju_HashMap_entrySet), "$get2", $rt_wrapFunction1(ju_HashMap_get), "$entryByKey", $rt_wrapFunction1(ju_HashMap_entryByKey), "$findNonNullKeyEntry", $rt_wrapFunction3(ju_HashMap_findNonNullKeyEntry),
"$findNullKeyEntry", $rt_wrapFunction0(ju_HashMap_findNullKeyEntry), "$isEmpty", $rt_wrapFunction0(ju_HashMap_isEmpty), "$put3", $rt_wrapFunction2(ju_HashMap_put), "$putAll", $rt_wrapFunction1(ju_HashMap_putAll), "$putAllImpl", $rt_wrapFunction1(ju_HashMap_putAllImpl), "$rehash0", $rt_wrapFunction1(ju_HashMap_rehash0), "$rehash", $rt_wrapFunction0(ju_HashMap_rehash), "$removeEntry", $rt_wrapFunction1(ju_HashMap_removeEntry), "$size", $rt_wrapFunction0(ju_HashMap_size), "$values0", $rt_wrapFunction0(ju_HashMap_values)],
ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_LinkedHashMap__init_0), "$_init_0", $rt_wrapFunction1(ju_LinkedHashMap__init_), "$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray), "$put3", $rt_wrapFunction2(ju_LinkedHashMap_put), "$putImpl0", $rt_wrapFunction4(ju_LinkedHashMap_putImpl), "$entrySet", $rt_wrapFunction0(ju_LinkedHashMap_entrySet), "$removeLinkedEntry", $rt_wrapFunction1(ju_LinkedHashMap_removeLinkedEntry), "$removeEldestEntry",
$rt_wrapFunction1(ju_LinkedHashMap_removeEldestEntry)],
kc_CollectionsKt__CollectionsJVMKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
kc_CollectionsKt__CollectionsKt, 0, kc_CollectionsKt__CollectionsJVMKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt__IterablesKt, 0, kc_CollectionsKt__CollectionsKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt__IteratorsJVMKt, 0, kc_CollectionsKt__IterablesKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt__IteratorsKt, 0, kc_CollectionsKt__IteratorsJVMKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt__MutableCollectionsJVMKt, 0, kc_CollectionsKt__IteratorsKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__AppendableKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
kt_StringsKt__IndentKt, 0, kt_StringsKt__AppendableKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__RegexExtensionsJVMKt, 0, kt_StringsKt__IndentKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__RegexExtensionsKt, 0, kt_StringsKt__RegexExtensionsJVMKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__StringBuilderJVMKt, 0, kt_StringsKt__RegexExtensionsKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__StringBuilderKt, 0, kt_StringsKt__StringBuilderJVMKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__StringNumberConversionsJVMKt, 0, kt_StringsKt__StringBuilderKt, [], 0, 0, 0, 0, 0,
uciisdp_Organization$Builder, 0, csw_Message$Builder, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Organization$Builder__init_), "$name", $rt_wrapFunction1(uciisdp_Organization$Builder_name), "$primaryDepartment", $rt_wrapFunction1(uciisdp_Organization$Builder_primaryDepartment), "$build", $rt_wrapFunction0(uciisdp_Organization$Builder_build)],
csw_DoubleProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(csw_DoubleProtoAdapter__init_), "$encode7", $rt_wrapFunction2(csw_DoubleProtoAdapter_encode), "$encode1", $rt_wrapFunction2(csw_DoubleProtoAdapter_encode0)],
jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jn_Buffer__init_), "$capacity", $rt_wrapFunction0(jn_Buffer_capacity), "$position0", $rt_wrapFunction0(jn_Buffer_position), "$position2", $rt_wrapFunction1(jn_Buffer_position0), "$limit", $rt_wrapFunction0(jn_Buffer_limit), "$flip1", $rt_wrapFunction0(jn_Buffer_flip), "$remaining", $rt_wrapFunction0(jn_Buffer_remaining), "$hasRemaining", $rt_wrapFunction0(jn_Buffer_hasRemaining)]]);
$rt_metadata([jnci_BufferedDecoder, 0, jnc_CharsetDecoder, [], 1, 3, 0, 0, ["$_init_4", $rt_wrapFunction3(jnci_BufferedDecoder__init_), "$decodeLoop", $rt_wrapFunction2(jnci_BufferedDecoder_decodeLoop)],
jnci_AsciiDecoder, 0, jnci_BufferedDecoder, [], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction1(jnci_AsciiDecoder__init_), "$arrayDecode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_AsciiDecoder_arrayDecode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
k_LazyKt__LazyJVMKt$WhenMappings, 0, jl_Object, [], 36, 3, 0, k_LazyKt__LazyJVMKt$WhenMappings_$callClinit, 0,
jus_Collector$Characteristics, 0, jl_Enum, [], 12, 3, 0, jus_Collector$Characteristics_$callClinit, 0,
kc_ArraysKt__ArraysJVMKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
kc_ArraysKt__ArraysKt, 0, kc_ArraysKt__ArraysJVMKt, [], 0, 0, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
ucitrt_WebWorkerTransport$MessageHandlerCallback, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
jl_AssertionError, "AssertionError", 11, jl_Error, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AssertionError__init_3), "$_init_17", $rt_wrapFunction2(jl_AssertionError__init_1), "$_init_30", $rt_wrapFunction1(jl_AssertionError__init_)],
oj_ComparisonFailure, "ComparisonFailure", 13, jl_AssertionError, [], 0, 3, 0, 0, ["$_init_63", $rt_wrapFunction3(oj_ComparisonFailure__init_), "$getMessage", $rt_wrapFunction0(oj_ComparisonFailure_getMessage)],
jl_UnsupportedOperationException, "UnsupportedOperationException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_UnsupportedOperationException__init_), "$_init_2", $rt_wrapFunction1(jl_UnsupportedOperationException__init_0)],
jn_ReadOnlyBufferException, "ReadOnlyBufferException", 6, jl_UnsupportedOperationException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jn_ReadOnlyBufferException__init_0)],
csw_PackedProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction1(csw_PackedProtoAdapter__init_), "$encodeWithTag1", $rt_wrapFunction3(csw_PackedProtoAdapter_encodeWithTag), "$encode8", $rt_wrapFunction2(csw_PackedProtoAdapter_encode), "$encodeWithTag0", $rt_wrapFunction3(csw_PackedProtoAdapter_encodeWithTag0), "$encode1", $rt_wrapFunction2(csw_PackedProtoAdapter_encode0)],
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcit_DoubleAnalyzer$Result__init_0)],
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_List, "List", 5, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
kc_AbstractList, 0, kc_AbstractCollection, [ju_List, kjim_KMappedMarker], 1, 3, 0, kc_AbstractList_$callClinit, ["$_init_", $rt_wrapFunction0(kc_AbstractList__init_), "$iterator", $rt_wrapFunction0(kc_AbstractList_iterator), "$equals0", $rt_wrapFunction1(kc_AbstractList_equals)],
ke_EnumEntries, 0, jl_Object, [ju_List, kjim_KMappedMarker], 3, 3, 0, 0, 0,
ke_EnumEntriesList, 0, kc_AbstractList, [ke_EnumEntries, ji_Serializable], 4, 0, 0, 0, ["$_init_81", $rt_wrapFunction1(ke_EnumEntriesList__init_)],
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractCollection__init_), "$isEmpty", $rt_wrapFunction0(ju_AbstractCollection_isEmpty), "$addAll", $rt_wrapFunction1(ju_AbstractCollection_addAll), "$toString", $rt_wrapFunction0(ju_AbstractCollection_toString)],
csw_ProtoAdapterKt$commonStructMap$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructMap$1__init_), "$encode9", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructMap$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructMap$1_encode0)],
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Readable, 0, jl_Object, [], 3, 3, 0, 0, 0,
csw_RepeatedProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction1(csw_RepeatedProtoAdapter__init_), "$encode8", $rt_wrapFunction2(csw_RepeatedProtoAdapter_encode), "$encodeWithTag1", $rt_wrapFunction3(csw_RepeatedProtoAdapter_encodeWithTag), "$encode1", $rt_wrapFunction2(csw_RepeatedProtoAdapter_encode0), "$encodeWithTag0", $rt_wrapFunction3(csw_RepeatedProtoAdapter_encodeWithTag0)],
otjc_JSObjects, 0, jl_Object, [], 4, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
otjc_JSFinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otji_JSWrapper$_clinit_$lambda$_33_0, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$_clinit_$lambda$_33_0__init_), "$accept", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_33_0_accept), "$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_33_0_accept$exported$0)],
juca_AtomicReferenceFieldUpdater, 0, jl_Object, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(juca_AtomicReferenceFieldUpdater__init_)],
jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, ["$_init_34", $rt_wrapFunction2(jnc_Charset__init_), "$name0", $rt_wrapFunction0(jnc_Charset_name), "$decode3", $rt_wrapFunction1(jnc_Charset_decode), "$encode10", $rt_wrapFunction1(jnc_Charset_encode)],
jnci_UTF16Charset, 0, jnc_Charset, [], 0, 3, 0, 0, ["$_init_60", $rt_wrapFunction3(jnci_UTF16Charset__init_0), "$newDecoder", $rt_wrapFunction0(jnci_UTF16Charset_newDecoder), "$newEncoder", $rt_wrapFunction0(jnci_UTF16Charset_newEncoder)],
kt_CharsKt__CharKt, 0, kt_CharsKt__CharJVMKt, [], 0, 0, 0, 0, 0,
kr_KDeclarationContainer, 0, jl_Object, [], 3, 3, 0, 0, 0,
csw_ProtoAdapterKt, 0, jl_Object, [], 4, 3, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 4, 3, 0, 0, 0,
jus_Collectors, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
csw_ProtoAdapterKt$commonWrapper$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_38", function(var_1, var_2, var_3, var_4, var_5, var_6) { csw_ProtoAdapterKt$commonWrapper$1__init_(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonWrapper$1_encode)],
otjc_JSUndefined, 0, jl_Object, [otj_JSObject], 0, 3, 0, 0, 0,
k_Lazy, 0, jl_Object, [], 3, 3, 0, 0, 0,
k_SynchronizedLazyImpl, 0, jl_Object, [k_Lazy, ji_Serializable], 4, 0, 0, 0, ["$_init_40", $rt_wrapFunction2(k_SynchronizedLazyImpl__init_), "$_init_90", $rt_wrapFunction4(k_SynchronizedLazyImpl__init_0)],
jnci_AsciiCharset, 0, jnc_Charset, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jnci_AsciiCharset__init_), "$newDecoder", $rt_wrapFunction0(jnci_AsciiCharset_newDecoder), "$newEncoder", $rt_wrapFunction0(jnci_AsciiCharset_newEncoder)],
ucics_AsyncResult, 0, jl_Object, [], 3, 3, 0, 0, 0,
ucics_RpcClient$AsyncResultImpl, 0, jl_Object, [ucics_AsyncResult], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucics_RpcClient$AsyncResultImpl__init_), "$complete", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl_complete), "$completeExceptionally", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl_completeExceptionally), "$thenApply", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl_thenApply)],
ucics_RpcClient$RpcResponseFuture, 0, ucics_RpcClient$AsyncResultImpl, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucics_RpcClient$RpcResponseFuture__init_)],
jl_ArrayStoreException, "ArrayStoreException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayStoreException__init_0)],
csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter__init_0), "$encode11", $rt_wrapFunction2(csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapter$Companion$UnsupportedTypeProtoAdapter_encode0)],
kr_KClassifier, 0, jl_Object, [], 3, 3, 0, 0, 0,
kr_KClass, 0, jl_Object, [kr_KDeclarationContainer, kr_KAnnotatedElement, kr_KClassifier], 3, 3, 0, 0, 0]);
$rt_metadata([ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$_init_45", $rt_wrapFunction1(ji_FilterOutputStream__init_)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ji_PrintStream, 0, ji_FilterOutputStream, [jl_Appendable], 0, 3, 0, 0, ["$_init_46", $rt_wrapFunction2(ji_PrintStream__init_0), "$_init_45", $rt_wrapFunction1(ji_PrintStream__init_)],
otcic_JsConsolePrintStream, 0, ji_PrintStream, [], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JsConsolePrintStream__init_), "$println1", $rt_wrapFunction1(otcic_JsConsolePrintStream_println1), "$println", $rt_wrapFunction0(otcic_JsConsolePrintStream_println0), "$println0", $rt_wrapFunction1(otcic_JsConsolePrintStream_println)],
otcic_JSStdoutPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStdoutPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStdoutPrintStream_print)],
csw_FieldEncoding$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(csw_FieldEncoding$Companion__init_0)],
csw_FloatProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(csw_FloatProtoAdapter__init_), "$encode12", $rt_wrapFunction2(csw_FloatProtoAdapter_encode), "$encode1", $rt_wrapFunction2(csw_FloatProtoAdapter_encode0)],
juf_Function, 0, jl_Object, [], 3, 3, 0, 0, 0,
csw_LongArrayProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction1(csw_LongArrayProtoAdapter__init_0), "$encodeWithTag2", $rt_wrapFunction3(csw_LongArrayProtoAdapter_encodeWithTag), "$encode13", $rt_wrapFunction2(csw_LongArrayProtoAdapter_encode), "$encodeWithTag0", $rt_wrapFunction3(csw_LongArrayProtoAdapter_encodeWithTag0), "$encode1", $rt_wrapFunction2(csw_LongArrayProtoAdapter_encode0)],
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
k_TuplesKt, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, jnc_CodingErrorAction_$callClinit, ["$_init_2", $rt_wrapFunction1(jnc_CodingErrorAction__init_0)],
csw_ProtoWriter$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$makeTag$wire_runtime", $rt_wrapFunction2(csw_ProtoWriter$Companion_makeTag$wire_runtime), "$varint32Size$wire_runtime", $rt_wrapFunction1(csw_ProtoWriter$Companion_varint32Size$wire_runtime), "$varint64Size$wire_runtime", $rt_wrapFunction1(csw_ProtoWriter$Companion_varint64Size$wire_runtime), "$encodeZigZag32$wire_runtime", $rt_wrapFunction1(csw_ProtoWriter$Companion_encodeZigZag32$wire_runtime), "$encodeZigZag64$wire_runtime", $rt_wrapFunction1(csw_ProtoWriter$Companion_encodeZigZag64$wire_runtime),
"$_init_15", $rt_wrapFunction1(csw_ProtoWriter$Companion__init_)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jl_AbstractStringBuilder__init_0), "$_init_0", $rt_wrapFunction1(jl_AbstractStringBuilder__init_), "$append10", $rt_wrapFunction1(jl_AbstractStringBuilder_append5), "$append11", $rt_wrapFunction1(jl_AbstractStringBuilder_append), "$insert0", $rt_wrapFunction2(jl_AbstractStringBuilder_insert2), "$append12", $rt_wrapFunction1(jl_AbstractStringBuilder_append0), "$append1", $rt_wrapFunction2(jl_AbstractStringBuilder_append8),
"$insert1", $rt_wrapFunction3(jl_AbstractStringBuilder_insert7), "$append13", $rt_wrapFunction1(jl_AbstractStringBuilder_append4), "$insert2", $rt_wrapFunction2(jl_AbstractStringBuilder_insert5), "$insert3", $rt_wrapFunction3(jl_AbstractStringBuilder_insert6), "$append14", $rt_wrapFunction1(jl_AbstractStringBuilder_append2), "$insert4", $rt_wrapFunction2(jl_AbstractStringBuilder_insert0), "$append15", $rt_wrapFunction1(jl_AbstractStringBuilder_append3), "$insert5", $rt_wrapFunction2(jl_AbstractStringBuilder_insert1),
"$append16", $rt_wrapFunction1(jl_AbstractStringBuilder_append6), "$insert6", $rt_wrapFunction2(jl_AbstractStringBuilder_insert4), "$insert", $rt_wrapFunction2(jl_AbstractStringBuilder_insert3), "$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString), "$append7", $rt_wrapFunction3(jl_AbstractStringBuilder_append1), "$insert7", $rt_wrapFunction4(jl_AbstractStringBuilder_insert), "$append17", $rt_wrapFunction1(jl_AbstractStringBuilder_append7),
"$delete", $rt_wrapFunction2(jl_AbstractStringBuilder_delete), "$replace0", $rt_wrapFunction3(jl_AbstractStringBuilder_replace)],
jl_Boolean, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, jl_Boolean_$callClinit, ["$_init_49", $rt_wrapFunction1(jl_Boolean__init_0)],
jl_IllegalArgumentException, "IllegalArgumentException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalArgumentException__init_2), "$_init_2", $rt_wrapFunction1(jl_IllegalArgumentException__init_1)],
jnc_IllegalCharsetNameException, "IllegalCharsetNameException", 7, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jnc_IllegalCharsetNameException__init_0)],
kji_ClassBasedDeclarationContainer, 0, jl_Object, [kr_KDeclarationContainer], 3, 3, 0, 0, 0,
kji_ClassReference, 0, jl_Object, [kr_KClass, kji_ClassBasedDeclarationContainer], 4, 3, 0, kji_ClassReference_$callClinit, ["$_init_71", $rt_wrapFunction1(kji_ClassReference__init_), "$getJClass", $rt_wrapFunction0(kji_ClassReference_getJClass)],
otji_JSWrapper$_clinit_$lambda$_33_1, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otji_JSWrapper$_clinit_$lambda$_33_1__init_), "$accept", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_33_1_accept), "$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_33_1_accept$exported$0)],
ju_NoSuchElementException, "NoSuchElementException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_NoSuchElementException__init_0), "$_init_2", $rt_wrapFunction1(ju_NoSuchElementException__init_1)],
otcit_FloatAnalyzer, 0, jl_Object, [], 4, 3, 0, otcit_FloatAnalyzer_$callClinit, 0,
ucicsp_RpcPacket$Builder, 0, csw_Message$Builder, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucicsp_RpcPacket$Builder__init_0), "$type", $rt_wrapFunction1(ucicsp_RpcPacket$Builder_type), "$serviceId", $rt_wrapFunction1(ucicsp_RpcPacket$Builder_serviceId), "$methodName", $rt_wrapFunction1(ucicsp_RpcPacket$Builder_methodName), "$requestId", $rt_wrapFunction1(ucicsp_RpcPacket$Builder_requestId), "$replyTo", $rt_wrapFunction1(ucicsp_RpcPacket$Builder_replyTo), "$payload", $rt_wrapFunction1(ucicsp_RpcPacket$Builder_payload),
"$build1", $rt_wrapFunction0(ucicsp_RpcPacket$Builder_build)],
juf_Consumer, 0, jl_Object, [], 3, 3, 0, 0, 0,
otj_TestJsEntryPoint, 0, jl_Object, [], 4, 0, 0, otj_TestJsEntryPoint_$callClinit, 0,
ucics_AsyncStreamResult, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_25", $rt_wrapFunction1(ju_HashMap$AbstractMapIterator__init_), "$hasNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_hasNext), "$checkConcurrentMod", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_checkConcurrentMod), "$makeNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_makeNext)],
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_HashMap$ValueIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$_init_25", $rt_wrapFunction1(ju_HashMap$ValueIterator__init_), "$next", $rt_wrapFunction0(ju_HashMap$ValueIterator_next)],
uciisdp_Employee$Builder, 0, csw_Message$Builder, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Employee$Builder__init_), "$name1", $rt_wrapFunction1(uciisdp_Employee$Builder_name), "$address", $rt_wrapFunction1(uciisdp_Employee$Builder_address), "$tags", $rt_wrapFunction1(uciisdp_Employee$Builder_tags), "$build2", $rt_wrapFunction0(uciisdp_Employee$Builder_build)],
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, "Class", 11, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_Class_toString), "$getPlatformClass", $rt_wrapFunction0(jl_Class_getPlatformClass), "$isInstance0", $rt_wrapFunction1(jl_Class_isInstance), "$getName", $rt_wrapFunction0(jl_Class_getName), "$isPrimitive", $rt_wrapFunction0(jl_Class_isPrimitive), "$isInterface", $rt_wrapFunction0(jl_Class_isInterface), "$getComponentType", $rt_wrapFunction0(jl_Class_getComponentType), "$getSuperclass", $rt_wrapFunction0(jl_Class_getSuperclass)],
kc_CollectionsKt__MutableCollectionsKt, 0, kc_CollectionsKt__MutableCollectionsJVMKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt__ReversedViewsKt, 0, kc_CollectionsKt__MutableCollectionsKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt___CollectionsJvmKt, 0, kc_CollectionsKt__ReversedViewsKt, [], 0, 0, 0, 0, 0,
kc_CollectionsKt___CollectionsKt, 0, kc_CollectionsKt___CollectionsJvmKt, [], 0, 0, 0, 0, 0,
uciisd_Address, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_Float, 0, jl_Number, [jl_Comparable], 0, 3, 0, jl_Float_$callClinit, ["$_init_53", $rt_wrapFunction1(jl_Float__init_)],
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
juc_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, ["$_init_47", $rt_wrapFunction2(juc_MapEntry__init_)],
uciisdp_Address$ProtoAdapter_Address, 0, csw_ProtoAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Address$ProtoAdapter_Address__init_), "$encode14", $rt_wrapFunction2(uciisdp_Address$ProtoAdapter_Address_encode), "$encode1", $rt_wrapFunction2(uciisdp_Address$ProtoAdapter_Address_encode0)],
csw_ReverseProtoWriter$forwardBuffer$2, 0, kji_Lambda, [kjf_Function0], 4, 0, 0, csw_ReverseProtoWriter$forwardBuffer$2_$callClinit, ["$_init_", $rt_wrapFunction0(csw_ReverseProtoWriter$forwardBuffer$2__init_)],
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0, 0,
ju_Collections$5, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$5__init_)],
o_Buffer$UnsafeCursor, 0, jl_Object, [ji_Closeable], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(o_Buffer$UnsafeCursor__init_0), "$setSegment$okio", $rt_wrapFunction1(o_Buffer$UnsafeCursor_setSegment$okio), "$expandBuffer", $rt_wrapFunction1(o_Buffer$UnsafeCursor_expandBuffer), "$close", $rt_wrapFunction0(o_Buffer$UnsafeCursor_close)],
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractList__init_), "$iterator", $rt_wrapFunction0(ju_AbstractList_iterator), "$equals0", $rt_wrapFunction1(ju_AbstractList_equals)],
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_TemplateCollections$AbstractImmutableList, 0, ju_AbstractList, [ju_RandomAccess], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableList__init_)]]);
$rt_metadata([ju_Collections$3, 0, ju_TemplateCollections$AbstractImmutableList, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$3__init_)],
csw_FieldEncoding, "FieldEncoding", 2, jl_Enum, [], 12, 3, 0, csw_FieldEncoding_$callClinit, ["$getValue$wire_runtime", $rt_wrapFunction0(csw_FieldEncoding_getValue$wire_runtime), "$rawProtoAdapter", $rt_wrapFunction0(csw_FieldEncoding_rawProtoAdapter)],
ju_Collections$4, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$4__init_)],
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, jl_Character_$callClinit, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_AbstractSet__init_)],
ju_TemplateCollections$AbstractImmutableSet, 0, ju_AbstractSet, [], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableSet__init_)],
ju_Collections$1, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$1__init_)],
ju_TemplateCollections$AbstractImmutableMap, 0, ju_AbstractMap, [], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_TemplateCollections$AbstractImmutableMap__init_)],
ju_Collections$2, 0, ju_TemplateCollections$AbstractImmutableMap, [], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$2__init_)],
ju_Collections$7, 0, ju_AbstractMap, [], 0, 0, 0, 0, ["$_init_93", $rt_wrapFunction1(ju_Collections$7__init_), "$entrySet", $rt_wrapFunction0(ju_Collections$7_entrySet)],
ju_SequencedSet, 0, jl_Object, [ju_SequencedCollection, ju_Set], 3, 3, 0, 0, 0,
kt_StringsKt__StringNumberConversionsKt, 0, kt_StringsKt__StringNumberConversionsJVMKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__StringsJVMKt, 0, kt_StringsKt__StringNumberConversionsKt, [], 0, 0, 0, 0, 0,
kt_StringsKt__StringsKt, 0, kt_StringsKt__StringsJVMKt, [], 0, 0, 0, 0, 0,
jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0, ["$_init_59", $rt_wrapFunction3(jn_CharBuffer__init_), "$get", $rt_wrapFunction3(jn_CharBuffer_get), "$get3", $rt_wrapFunction1(jn_CharBuffer_get0), "$put2", $rt_wrapFunction3(jn_CharBuffer_put1), "$put4", $rt_wrapFunction3(jn_CharBuffer_put0), "$put1", $rt_wrapFunction1(jn_CharBuffer_put), "$hasArray", $rt_wrapFunction0(jn_CharBuffer_hasArray), "$array0", $rt_wrapFunction0(jn_CharBuffer_array), "$flip0", $rt_wrapFunction0(jn_CharBuffer_flip),
"$position", $rt_wrapFunction1(jn_CharBuffer_position)],
jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0, ["$_init_59", $rt_wrapFunction3(jn_CharBufferImpl__init_), "$isReadOnly", $rt_wrapFunction0(jn_CharBufferImpl_isReadOnly)],
jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0, ["$_init_0", $rt_wrapFunction1(jn_CharBufferOverArray__init_0), "$_init_58", function(var_1, var_2, var_3, var_4, var_5, var_6) { jn_CharBufferOverArray__init_(this, var_1, var_2, var_3, var_4, var_5, var_6); }, "$getChar", $rt_wrapFunction1(jn_CharBufferOverArray_getChar), "$putChar", $rt_wrapFunction2(jn_CharBufferOverArray_putChar), "$isArrayPresent", $rt_wrapFunction0(jn_CharBufferOverArray_isArrayPresent), "$getArray", $rt_wrapFunction0(jn_CharBufferOverArray_getArray),
"$readOnly", $rt_wrapFunction0(jn_CharBufferOverArray_readOnly)],
jl_Runtime, 0, jl_Object, [], 0, 3, 0, jl_Runtime_$callClinit, ["$_init_", $rt_wrapFunction0(jl_Runtime__init_), "$availableProcessors", $rt_wrapFunction0(jl_Runtime_availableProcessors)],
kjf_Function3, "Function3", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function4, "Function4", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
jnci_Iso8859Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction1(jnci_Iso8859Encoder__init_), "$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_Iso8859Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
kjf_Function1, "Function1", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function2, "Function2", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
csw_ProtoWriter, 0, jl_Object, [], 4, 3, 0, csw_ProtoWriter_$callClinit, ["$_init_7", $rt_wrapFunction1(csw_ProtoWriter__init_), "$writeBytes", $rt_wrapFunction1(csw_ProtoWriter_writeBytes), "$writeTag", $rt_wrapFunction2(csw_ProtoWriter_writeTag), "$writeVarint32", $rt_wrapFunction1(csw_ProtoWriter_writeVarint32), "$writeVarint64", $rt_wrapFunction1(csw_ProtoWriter_writeVarint64), "$writeFixed32", $rt_wrapFunction1(csw_ProtoWriter_writeFixed32), "$writeFixed64", $rt_wrapFunction1(csw_ProtoWriter_writeFixed64)],
jnc_StandardCharsets, 0, jl_Object, [], 4, 3, 0, jnc_StandardCharsets_$callClinit, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collections$_clinit_$lambda$_59_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_Collections$_clinit_$lambda$_59_0__init_)],
kjf_Function9, "Function9", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function7, "Function7", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function8, "Function8", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function5, "Function5", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function6, "Function6", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
ju_LinkedHashMapIterator, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_27", $rt_wrapFunction2(ju_LinkedHashMapIterator__init_), "$hasNext", $rt_wrapFunction0(ju_LinkedHashMapIterator_hasNext), "$checkConcurrentMod", $rt_wrapFunction0(ju_LinkedHashMapIterator_checkConcurrentMod), "$makeNext", $rt_wrapFunction0(ju_LinkedHashMapIterator_makeNext)],
jnc_UnsupportedCharsetException, "UnsupportedCharsetException", 7, jl_IllegalArgumentException, [], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jnc_UnsupportedCharsetException__init_)],
csw_ProtoAdapterKt$commonInt32$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonInt32$1__init_), "$encode15", $rt_wrapFunction2(csw_ProtoAdapterKt$commonInt32$1_encode), "$decode5", $rt_wrapFunction1(csw_ProtoAdapterKt$commonInt32$1_decode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonInt32$1_encode0), "$decode0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonInt32$1_decode0)],
jnci_Iso8859Charset, 0, jnc_Charset, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jnci_Iso8859Charset__init_), "$newDecoder", $rt_wrapFunction0(jnci_Iso8859Charset_newDecoder), "$newEncoder", $rt_wrapFunction0(jnci_Iso8859Charset_newEncoder)],
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ArrayList__init_2), "$_init_0", $rt_wrapFunction1(ju_ArrayList__init_), "$_init_64", $rt_wrapFunction1(ju_ArrayList__init_1), "$ensureCapacity", $rt_wrapFunction1(ju_ArrayList_ensureCapacity), "$get1", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$add", $rt_wrapFunction1(ju_ArrayList_add), "$clear", $rt_wrapFunction0(ju_ArrayList_clear)],
ju_LinkedHashMapIterator$EntryIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$_init_27", $rt_wrapFunction2(ju_LinkedHashMapIterator$EntryIterator__init_), "$next0", $rt_wrapFunction0(ju_LinkedHashMapIterator$EntryIterator_next), "$next", $rt_wrapFunction0(ju_LinkedHashMapIterator$EntryIterator_next0)],
jl_String, "String", 11, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$_init_", $rt_wrapFunction0(jl_String__init_3), "$_init_33", $rt_wrapFunction1(jl_String__init_4), "$_init_30", $rt_wrapFunction1(jl_String__init_5), "$_init_48", $rt_wrapFunction3(jl_String__init_6), "$_init_85", $rt_wrapFunction4(jl_String__init_1), "$_init_77", $rt_wrapFunction2(jl_String__init_), "$charAt", $rt_wrapFunction1(jl_String_charAt), "$length", $rt_wrapFunction0(jl_String_length),
"$isEmpty", $rt_wrapFunction0(jl_String_isEmpty), "$regionMatches", function(var_1, var_2, var_3, var_4, var_5) { return jl_String_regionMatches0(this, var_1, var_2, var_3, var_4, var_5); }, "$regionMatches0", $rt_wrapFunction4(jl_String_regionMatches), "$indexOf0", $rt_wrapFunction2(jl_String_indexOf), "$lastIndexOf", $rt_wrapFunction2(jl_String_lastIndexOf), "$lastIndexOf1", $rt_wrapFunction1(jl_String_lastIndexOf0), "$indexOf2", $rt_wrapFunction2(jl_String_indexOf0), "$substring", $rt_wrapFunction2(jl_String_substring),
"$substring0", $rt_wrapFunction1(jl_String_substring0), "$toString", $rt_wrapFunction0(jl_String_toString), "$toCharArray", $rt_wrapFunction0(jl_String_toCharArray), "$equals0", $rt_wrapFunction1(jl_String_equals), "$getBytes", $rt_wrapFunction1(jl_String_getBytes), "$hashCode", $rt_wrapFunction0(jl_String_hashCode), "$toUpperCase", $rt_wrapFunction0(jl_String_toUpperCase)],
k_UNINITIALIZED_VALUE, 0, jl_Object, [], 4, 3, 0, k_UNINITIALIZED_VALUE_$callClinit, 0,
csw_ProtoAdapterKt$commonSint32$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonSint32$1__init_), "$encode15", $rt_wrapFunction2(csw_ProtoAdapterKt$commonSint32$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonSint32$1_encode0)],
jnc_Charset$Charsets, 0, jl_Object, [], 0, 0, 0, jnc_Charset$Charsets_$callClinit, 0,
kji_CallableReference, 0, jl_Object, [kr_KCallable, ji_Serializable], 1, 3, 0, kji_CallableReference_$callClinit, ["$_init_62", function(var_1, var_2, var_3, var_4, var_5) { kji_CallableReference__init_(this, var_1, var_2, var_3, var_4, var_5); }],
kji_FunctionReference, 0, kji_CallableReference, [kji_FunctionBase, kr_KFunction], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(kji_FunctionReference__init_0), "$_init_61", function(var_1, var_2, var_3, var_4, var_5, var_6) { kji_FunctionReference__init_(this, var_1, var_2, var_3, var_4, var_5, var_6); }],
jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction1(jnci_UTF8Encoder__init_), "$arrayEncode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF8Encoder_arrayEncode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
juf_BiFunction, 0, jl_Object, [], 3, 3, 0, 0, 0,
juf_BinaryOperator, 0, jl_Object, [juf_BiFunction], 3, 3, 0, 0, 0,
jus_Collectors$toCollection$lambda$_1_1, 0, jl_Object, [juf_BinaryOperator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jus_Collectors$toCollection$lambda$_1_1__init_)],
juf_BiConsumer, 0, jl_Object, [], 3, 3, 0, 0, 0]);
$rt_metadata([jus_Collectors$toCollection$lambda$_1_0, 0, jl_Object, [juf_BiConsumer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jus_Collectors$toCollection$lambda$_1_0__init_)],
ucics_RpcClient$AsyncStreamResultImpl, 0, jl_Object, [ucics_AsyncStreamResult], 0, 3, 0, 0, 0,
uciisdp_Employee$ProtoAdapter_Employee, 0, csw_ProtoAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Employee$ProtoAdapter_Employee__init_), "$encode16", $rt_wrapFunction2(uciisdp_Employee$ProtoAdapter_Employee_encode), "$encode1", $rt_wrapFunction2(uciisdp_Employee$ProtoAdapter_Employee_encode0)],
jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, jnci_UTF8Charset_$callClinit, ["$newDecoder", $rt_wrapFunction0(jnci_UTF8Charset_newDecoder), "$newEncoder", $rt_wrapFunction0(jnci_UTF8Charset_newEncoder)],
csw_ReverseProtoWriter$Companion, 0, jl_Object, [], 4, 0, 0, 0, ["$_init_15", $rt_wrapFunction1(csw_ReverseProtoWriter$Companion__init_)],
kc_ArraysKt___ArraysJvmKt, 0, kc_ArraysKt__ArraysKt, [], 0, 0, 0, 0, 0,
kc_EmptyIterator, 0, jl_Object, [ju_ListIterator, kjim_KMappedMarker], 4, 3, 0, kc_EmptyIterator_$callClinit, ["$hasNext", $rt_wrapFunction0(kc_EmptyIterator_hasNext), "$next1", $rt_wrapFunction0(kc_EmptyIterator_next), "$next", $rt_wrapFunction0(kc_EmptyIterator_next0)],
oi__SegmentedByteString, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_ClassNotFoundException, 0, jl_ReflectiveOperationException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ClassNotFoundException__init_)],
oj_Assert, 0, jl_Object, [], 0, 3, 0, 0, 0,
k_UnsafeLazyImpl, 0, jl_Object, [k_Lazy, ji_Serializable], 4, 3, 0, 0, ["$_init_91", $rt_wrapFunction1(k_UnsafeLazyImpl__init_)],
cswi_ImmutableList, "ImmutableList", 3, kc_AbstractList, [ju_RandomAccess, ji_Serializable], 4, 3, 0, 0, ["$_init_66", $rt_wrapFunction1(cswi_ImmutableList__init_), "$getSize", $rt_wrapFunction0(cswi_ImmutableList_getSize), "$get1", $rt_wrapFunction1(cswi_ImmutableList_get)],
csw_IntArrayProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction1(csw_IntArrayProtoAdapter__init_0), "$encodeWithTag3", $rt_wrapFunction3(csw_IntArrayProtoAdapter_encodeWithTag), "$encode17", $rt_wrapFunction2(csw_IntArrayProtoAdapter_encode), "$encodeWithTag0", $rt_wrapFunction3(csw_IntArrayProtoAdapter_encodeWithTag0), "$encode1", $rt_wrapFunction2(csw_IntArrayProtoAdapter_encode0)],
k_Pair, "Pair", 27, jl_Object, [ji_Serializable], 4, 3, 0, 0, ["$_init_47", $rt_wrapFunction2(k_Pair__init_), "$getFirst", $rt_wrapFunction0(k_Pair_getFirst), "$getSecond", $rt_wrapFunction0(k_Pair_getSecond), "$toString", $rt_wrapFunction0(k_Pair_toString), "$component1", $rt_wrapFunction0(k_Pair_component1), "$component2", $rt_wrapFunction0(k_Pair_component2), "$equals0", $rt_wrapFunction1(k_Pair_equals)],
jl_NullPointerException, "NullPointerException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jl_NullPointerException__init_2), "$_init_", $rt_wrapFunction0(jl_NullPointerException__init_1)],
csw_ProtoAdapterKt$commonString$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonString$1__init_), "$encode18", $rt_wrapFunction2(csw_ProtoAdapterKt$commonString$1_encode), "$decode6", $rt_wrapFunction1(csw_ProtoAdapterKt$commonString$1_decode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonString$1_encode0), "$decode0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonString$1_decode0)],
kji_CallableReference$NoReceiver, 0, jl_Object, [ji_Serializable], 0, 0, 0, kji_CallableReference$NoReceiver_$callClinit, 0,
jus_Collector$of$lambda$_5_0, 0, jl_Object, [juf_Function], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jus_Collector$of$lambda$_5_0__init_)],
csw_ProtoAdapterKt$commonStructList$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructList$1__init_), "$encode8", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructList$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructList$1_encode0)],
ju_LinkedHashMapEntrySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, 0, ["$_init_27", $rt_wrapFunction2(ju_LinkedHashMapEntrySet__init_), "$iterator", $rt_wrapFunction0(ju_LinkedHashMapEntrySet_iterator)],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
o_Segment, 0, jl_Object, [], 4, 3, 0, o_Segment_$callClinit, ["$_init_", $rt_wrapFunction0(o_Segment__init_0), "$_init_19", function(var_1, var_2, var_3, var_4, var_5) { o_Segment__init_1(this, var_1, var_2, var_3, var_4, var_5); }, "$sharedCopy", $rt_wrapFunction0(o_Segment_sharedCopy), "$pop", $rt_wrapFunction0(o_Segment_pop), "$push", $rt_wrapFunction1(o_Segment_push), "$split", $rt_wrapFunction1(o_Segment_split), "$compact0", $rt_wrapFunction0(o_Segment_compact), "$writeTo0", $rt_wrapFunction2(o_Segment_writeTo)],
jt_DateTimeException, "DateTimeException", 9, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jt_DateTimeException__init_)],
o_SegmentPool, 0, jl_Object, [], 4, 3, 0, o_SegmentPool_$callClinit, 0,
ucitrcs_Serializer, 0, jl_Object, [], 3, 3, 0, 0, 0,
otj_TestEntryPoint, 0, jl_Object, [], 4, 0, 0, 0, 0,
kr_RangesKt__RangesKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
ucitrt_WebWorkerTransport$_init_$lambda$_0_0, 0, jl_Object, [ucitrt_WebWorkerTransport$MessageHandlerCallback], 0, 3, 0, 0, ["$_init_89", $rt_wrapFunction1(ucitrt_WebWorkerTransport$_init_$lambda$_0_0__init_), "$handle", $rt_wrapFunction1(ucitrt_WebWorkerTransport$_init_$lambda$_0_0_handle), "$handle$exported$0", $rt_wrapFunction1(ucitrt_WebWorkerTransport$_init_$lambda$_0_0_handle$exported$0)],
jn_BufferOverflowException, "BufferOverflowException", 6, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jn_BufferOverflowException__init_0)],
csw_ProtoReader, 0, jl_Object, [], 4, 3, 0, csw_ProtoReader_$callClinit, ["$_init_14", $rt_wrapFunction1(csw_ProtoReader__init_), "$beginMessage", $rt_wrapFunction0(csw_ProtoReader_beginMessage), "$endMessageAndGetUnknownFields", $rt_wrapFunction1(csw_ProtoReader_endMessageAndGetUnknownFields), "$nextTag", $rt_wrapFunction0(csw_ProtoReader_nextTag), "$peekFieldEncoding", $rt_wrapFunction0(csw_ProtoReader_peekFieldEncoding), "$readBytes", $rt_wrapFunction0(csw_ProtoReader_readBytes), "$readString", $rt_wrapFunction0(csw_ProtoReader_readString),
"$readVarint32", $rt_wrapFunction0(csw_ProtoReader_readVarint32), "$readVarint64", $rt_wrapFunction0(csw_ProtoReader_readVarint64), "$readFixed32", $rt_wrapFunction0(csw_ProtoReader_readFixed32), "$readFixed64", $rt_wrapFunction0(csw_ProtoReader_readFixed64), "$readUnknownField", $rt_wrapFunction1(csw_ProtoReader_readUnknownField), "$addUnknownField", $rt_wrapFunction3(csw_ProtoReader_addUnknownField)],
o__SegmentedByteString, 0, jl_Object, [], 4, 3, 0, o__SegmentedByteString_$callClinit, 0,
csw_Message, 0, jl_Object, [ji_Serializable], 1, 3, 0, csw_Message_$callClinit, ["$_init_65", $rt_wrapFunction2(csw_Message__init_), "$unknownFields", $rt_wrapFunction0(csw_Message_unknownFields)],
uciisdp_MyData, "MyData", 23, csw_Message, [], 4, 3, 0, uciisdp_MyData_$callClinit, ["$_init_94", $rt_wrapFunction4(uciisdp_MyData__init_)],
juca_AtomicReference, 0, jl_Object, [ji_Serializable], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(juca_AtomicReference__init_), "$set", $rt_wrapFunction1(juca_AtomicReference_set), "$getAndSet", $rt_wrapFunction1(juca_AtomicReference_getAndSet)],
k_SafePublicationLazyImpl, 0, jl_Object, [k_Lazy, ji_Serializable], 4, 0, 0, k_SafePublicationLazyImpl_$callClinit, ["$_init_91", $rt_wrapFunction1(k_SafePublicationLazyImpl__init_)],
kr_IntProgression, 0, jl_Object, [jl_Iterable, kjim_KMappedMarker], 0, 3, 0, kr_IntProgression_$callClinit, ["$_init_59", $rt_wrapFunction3(kr_IntProgression__init_), "$getFirst0", $rt_wrapFunction0(kr_IntProgression_getFirst), "$getLast", $rt_wrapFunction0(kr_IntProgression_getLast), "$getStep", $rt_wrapFunction0(kr_IntProgression_getStep), "$iterator0", $rt_wrapFunction0(kr_IntProgression_iterator)],
uciis_MyDataService, 0, jl_Object, [], 3, 3, 0, 0, 0,
csw_ProtoAdapterKt$commonInt64$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonInt64$1__init_), "$encode5", $rt_wrapFunction2(csw_ProtoAdapterKt$commonInt64$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonInt64$1_encode0)],
otciu_CharMapping, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_39", $rt_wrapFunction2(otciu_CharMapping__init_)],
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
csw_FieldEncoding$WhenMappings, 0, jl_Object, [], 36, 3, 0, csw_FieldEncoding$WhenMappings_$callClinit, 0,
cswi_Internal__InternalKt, 0, jl_Object, [], 36, 0, 0, 0, 0,
otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otci_CharFlow, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_33", $rt_wrapFunction1(otci_CharFlow__init_)],
csw_ProtoReader$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(csw_ProtoReader$Companion__init_)],
cswi_Internal__InternalKt$sanitize$2, 0, kji_FunctionReference, [kjf_Function1], 36, 0, 0, cswi_Internal__InternalKt$sanitize$2_$callClinit, ["$_init_", $rt_wrapFunction0(cswi_Internal__InternalKt$sanitize$2__init_), "$invoke0", $rt_wrapFunction1(cswi_Internal__InternalKt$sanitize$2_invoke), "$invoke", $rt_wrapFunction1(cswi_Internal__InternalKt$sanitize$2_invoke0)],
uciis_MyDataService_Stub$processData$lambda$_1_0, 0, jl_Object, [juf_Function], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciis_MyDataService_Stub$processData$lambda$_1_0__init_), "$apply", $rt_wrapFunction1(uciis_MyDataService_Stub$processData$lambda$_1_0_apply0), "$apply0", $rt_wrapFunction1(uciis_MyDataService_Stub$processData$lambda$_1_0_apply)],
ji_IOException, "IOException", 8, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_IOException__init_), "$_init_2", $rt_wrapFunction1(ji_IOException__init_1)],
jnc_CharacterCodingException, 0, ji_IOException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jnc_CharacterCodingException__init_)],
jnc_UnmappableCharacterException, "UnmappableCharacterException", 7, jnc_CharacterCodingException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jnc_UnmappableCharacterException__init_), "$getMessage", $rt_wrapFunction0(jnc_UnmappableCharacterException_getMessage)]]);
$rt_metadata([kji_ClassReference$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(kji_ClassReference$Companion__init_)],
jn_BufferUnderflowException, "BufferUnderflowException", 6, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jn_BufferUnderflowException__init_)],
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcit_FloatAnalyzer$Result__init_)],
jl_String$_clinit_$lambda$_115_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_String$_clinit_$lambda$_115_0__init_)],
uciisdp_Address$Builder, 0, csw_Message$Builder, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Address$Builder__init_), "$street", $rt_wrapFunction1(uciisdp_Address$Builder_street), "$city", $rt_wrapFunction1(uciisdp_Address$Builder_city), "$build0", $rt_wrapFunction0(uciisdp_Address$Builder_build)],
kj_JvmClassMappingKt, 0, jl_Object, [], 4, 3, 0, 0, 0,
jnc_MalformedInputException, "MalformedInputException", 7, jnc_CharacterCodingException, [], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jnc_MalformedInputException__init_), "$getMessage", $rt_wrapFunction0(jnc_MalformedInputException_getMessage)],
kc_MapsKt__MapWithDefaultKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
kc_MapsKt__MapsJVMKt, 0, kc_MapsKt__MapWithDefaultKt, [], 0, 0, 0, 0, 0,
kr_ClosedRange, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_CloneNotSupportedException, "CloneNotSupportedException", 11, jl_Exception, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_CloneNotSupportedException__init_)],
otjt_ArrayBufferView, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otjt_Uint8Array, 0, otjt_ArrayBufferView, [], 0, 3, 0, 0, 0,
kji_Reflection, 0, jl_Object, [], 0, 3, 0, kji_Reflection_$callClinit, 0,
ucitrcs_ProtobufSerializer, 0, jl_Object, [ucitrcs_Serializer], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucitrcs_ProtobufSerializer__init_), "$register", $rt_wrapFunction2(ucitrcs_ProtobufSerializer_register), "$encode19", $rt_wrapFunction1(ucitrcs_ProtobufSerializer_encode)],
o_Sink, 0, jl_Object, [ji_Closeable, ji_Flushable], 3, 3, 0, 0, 0,
jnc_WritableByteChannel, 0, jl_Object, [jnc_Channel], 3, 3, 0, 0, 0,
o_BufferedSink, 0, jl_Object, [o_Sink, jnc_WritableByteChannel], 3, 3, 0, 0, 0,
jl_Long, "Long", 11, jl_Number, [jl_Comparable], 0, 3, 0, jl_Long_$callClinit, ["$_init_68", $rt_wrapFunction1(jl_Long__init_), "$intValue", $rt_wrapFunction0(jl_Long_intValue), "$longValue", $rt_wrapFunction0(jl_Long_longValue), "$floatValue", $rt_wrapFunction0(jl_Long_floatValue), "$doubleValue", $rt_wrapFunction0(jl_Long_doubleValue), "$toString", $rt_wrapFunction0(jl_Long_toString0), "$equals0", $rt_wrapFunction1(jl_Long_equals)],
oj_ComparisonFailure$ComparisonCompactor, 0, jl_Object, [], 0, 0, 0, 0, ["$_init_31", $rt_wrapFunction3(oj_ComparisonFailure$ComparisonCompactor__init_), "$compact", $rt_wrapFunction1(oj_ComparisonFailure$ComparisonCompactor_compact)],
jtt_TemporalAmount, 0, jl_Object, [], 3, 3, 0, 0, 0,
jt_Duration, "Duration", 9, jl_Object, [jtt_TemporalAmount, jl_Comparable, ji_Serializable], 4, 3, 0, jt_Duration_$callClinit, ["$getSeconds", $rt_wrapFunction0(jt_Duration_getSeconds), "$getNano", $rt_wrapFunction0(jt_Duration_getNano)],
juc_ConcurrentHashMap$HashEntry, 0, juc_MapEntry, [], 0, 0, 0, 0, ["$_init_26", $rt_wrapFunction2(juc_ConcurrentHashMap$HashEntry__init_)],
uciisd_AddressCodec, 0, jl_Object, [ucitrcc_Codec], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_AddressCodec__init_), "$toWire2", $rt_wrapFunction1(uciisd_AddressCodec_toWire)],
jnc_ByteChannel, 0, jl_Object, [jnc_ReadableByteChannel, jnc_WritableByteChannel], 3, 3, 0, 0, 0,
jl_ArithmeticException, "ArithmeticException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArithmeticException__init_0), "$_init_2", $rt_wrapFunction1(jl_ArithmeticException__init_)],
ju_EnumSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_EnumSet__init_)],
o_ByteString$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$of0", $rt_wrapFunction1(o_ByteString$Companion_of), "$_init_15", $rt_wrapFunction1(o_ByteString$Companion__init_)],
kc_AbstractCollection$toString$1, 0, kji_Lambda, [kjf_Function1], 4, 0, 0, 0, ["$_init_23", $rt_wrapFunction1(kc_AbstractCollection$toString$1__init_), "$invoke1", $rt_wrapFunction1(kc_AbstractCollection$toString$1_invoke), "$invoke", $rt_wrapFunction1(kc_AbstractCollection$toString$1_invoke0)],
otci_Base46, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_GenericEnumSet, 0, ju_EnumSet, [], 0, 0, 0, 0, ["$_init_71", $rt_wrapFunction1(ju_GenericEnumSet__init_), "$add0", $rt_wrapFunction1(ju_GenericEnumSet_add), "$addAll", $rt_wrapFunction1(ju_GenericEnumSet_addAll), "$add", $rt_wrapFunction1(ju_GenericEnumSet_add0)],
jtt_TemporalQuery, 0, jl_Object, [], 3, 3, 0, 0, 0,
jt_Instant$1, 0, jl_Object, [jtt_TemporalQuery], 0, 0, 0, 0, ["$_init_", $rt_wrapFunction0(jt_Instant$1__init_)],
kc_IntIterator, 0, jl_Object, [ju_Iterator, kjim_KMappedMarker], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(kc_IntIterator__init_)],
csw_EnumAdapter, 0, csw_ProtoAdapter, [], 1, 3, 0, 0, ["$_init_72", $rt_wrapFunction3(csw_EnumAdapter__init_), "$_init_74", $rt_wrapFunction3(csw_EnumAdapter__init_0), "$encode20", $rt_wrapFunction2(csw_EnumAdapter_encode0), "$decode7", $rt_wrapFunction1(csw_EnumAdapter_decode0), "$encode1", $rt_wrapFunction2(csw_EnumAdapter_encode), "$decode0", $rt_wrapFunction1(csw_EnumAdapter_decode)],
ucicsp_RpcPacket$Type$ProtoAdapter_Type, 0, csw_EnumAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ucicsp_RpcPacket$Type$ProtoAdapter_Type__init_), "$fromValue0", $rt_wrapFunction1(ucicsp_RpcPacket$Type$ProtoAdapter_Type_fromValue), "$fromValue", $rt_wrapFunction1(ucicsp_RpcPacket$Type$ProtoAdapter_Type_fromValue0)],
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$_init_0", $rt_wrapFunction1(jl_StringBuilder__init_2), "$_init_", $rt_wrapFunction0(jl_StringBuilder__init_1), "$append", $rt_wrapFunction1(jl_StringBuilder_append), "$append3", $rt_wrapFunction1(jl_StringBuilder_append4), "$append4", $rt_wrapFunction1(jl_StringBuilder_append0), "$append9", $rt_wrapFunction1(jl_StringBuilder_append9), "$append2", $rt_wrapFunction1(jl_StringBuilder_append2), "$append19", $rt_wrapFunction1(jl_StringBuilder_append5),
"$append0", $rt_wrapFunction1(jl_StringBuilder_append1), "$append8", $rt_wrapFunction3(jl_StringBuilder_append10), "$append18", $rt_wrapFunction1(jl_StringBuilder_append8), "$insert13", $rt_wrapFunction2(jl_StringBuilder_insert7), "$insert12", $rt_wrapFunction2(jl_StringBuilder_insert6), "$insert11", $rt_wrapFunction2(jl_StringBuilder_insert9), "$insert8", $rt_wrapFunction4(jl_StringBuilder_insert1), "$insert9", $rt_wrapFunction2(jl_StringBuilder_insert10), "$insert10", $rt_wrapFunction2(jl_StringBuilder_insert2),
"$delete0", $rt_wrapFunction2(jl_StringBuilder_delete0), "$replace1", $rt_wrapFunction3(jl_StringBuilder_replace), "$insert14", $rt_wrapFunction2(jl_StringBuilder_insert11), "$delete", $rt_wrapFunction2(jl_StringBuilder_delete), "$insert7", $rt_wrapFunction4(jl_StringBuilder_insert3), "$append7", $rt_wrapFunction3(jl_StringBuilder_append6), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert", $rt_wrapFunction2(jl_StringBuilder_insert0),
"$insert6", $rt_wrapFunction2(jl_StringBuilder_insert), "$insert5", $rt_wrapFunction2(jl_StringBuilder_insert5), "$insert4", $rt_wrapFunction2(jl_StringBuilder_insert8), "$insert2", $rt_wrapFunction2(jl_StringBuilder_insert4), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert12), "$append6", $rt_wrapFunction1(jl_StringBuilder_append7), "$append5", $rt_wrapFunction1(jl_StringBuilder_append3)],
csw_ProtoAdapterKt$commonUint64$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonUint64$1__init_), "$encodedSize0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonUint64$1_encodedSize), "$encode6", $rt_wrapFunction2(csw_ProtoAdapterKt$commonUint64$1_encode), "$encode5", $rt_wrapFunction2(csw_ProtoAdapterKt$commonUint64$1_encode0), "$decode2", $rt_wrapFunction1(csw_ProtoAdapterKt$commonUint64$1_decode), "$encodedSize", $rt_wrapFunction1(csw_ProtoAdapterKt$commonUint64$1_encodedSize0),
"$encode0", $rt_wrapFunction2(csw_ProtoAdapterKt$commonUint64$1_encode2), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonUint64$1_encode1), "$decode0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonUint64$1_decode0)],
ju_ConcurrentModificationException, "ConcurrentModificationException", 5, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ju_ConcurrentModificationException__init_0)],
csw_Syntax$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(csw_Syntax$Companion__init_0)],
kc_ArraysKt___ArraysKt, 0, kc_ArraysKt___ArraysJvmKt, [], 0, 0, 0, 0, 0,
jl_StackTraceElement, "StackTraceElement", 11, jl_Object, [ji_Serializable], 4, 3, 0, 0, ["$_init_95", $rt_wrapFunction4(jl_StackTraceElement__init_), "$getClassName", $rt_wrapFunction0(jl_StackTraceElement_getClassName), "$getMethodName", $rt_wrapFunction0(jl_StackTraceElement_getMethodName), "$equals0", $rt_wrapFunction1(jl_StackTraceElement_equals), "$toString", $rt_wrapFunction0(jl_StackTraceElement_toString)],
uciisdp_Organization, "Organization", 23, csw_Message, [], 4, 3, 0, uciisdp_Organization_$callClinit, ["$_init_28", $rt_wrapFunction3(uciisdp_Organization__init_)],
o_Segment$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(o_Segment$Companion__init_0)],
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, ["$_init_47", $rt_wrapFunction2(ju_MapEntry__init_), "$getKey", $rt_wrapFunction0(ju_MapEntry_getKey), "$getValue", $rt_wrapFunction0(ju_MapEntry_getValue)],
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, ["$_init_26", $rt_wrapFunction2(ju_HashMap$HashEntry__init_)],
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 4, 0, 0, 0, ["$_init_26", $rt_wrapFunction2(ju_LinkedHashMap$LinkedHashMapEntry__init_)],
ucics_RpcClient, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_79", $rt_wrapFunction1(ucics_RpcClient__init_0), "$_init_75", $rt_wrapFunction2(ucics_RpcClient__init_), "$registerCodec", $rt_wrapFunction2(ucics_RpcClient_registerCodec), "$invokeStub", $rt_wrapFunction3(ucics_RpcClient_invokeStub)],
jl_ArrayIndexOutOfBoundsException, "ArrayIndexOutOfBoundsException", 11, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_ArrayIndexOutOfBoundsException__init_), "$_init_2", $rt_wrapFunction1(jl_ArrayIndexOutOfBoundsException__init_0)],
o__JvmPlatformKt, 0, jl_Object, [], 4, 3, 0, 0, 0]);
$rt_metadata([ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_55", $rt_wrapFunction1(ju_AbstractList$1__init_), "$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next", $rt_wrapFunction0(ju_AbstractList$1_next)],
uciisd_EmployeeCodec, "EmployeeCodec", 22, jl_Object, [ucitrcc_Codec], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_EmployeeCodec__init_), "$toWire3", $rt_wrapFunction1(uciisd_EmployeeCodec_toWire), "$getWireAdapter", $rt_wrapFunction0(uciisd_EmployeeCodec_getWireAdapter), "$toWire1", $rt_wrapFunction1(uciisd_EmployeeCodec_toWire0)],
otjc_Crypto, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
kr_OpenEndRange, 0, jl_Object, [], 3, 3, 0, 0, 0,
kr_IntProgression$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$fromClosedRange", $rt_wrapFunction3(kr_IntProgression$Companion_fromClosedRange), "$_init_15", $rt_wrapFunction1(kr_IntProgression$Companion__init_)],
jus_CollectorImpl, 0, jl_Object, [jus_Collector], 0, 0, 0, 0, ["$_init_9", function(var_1, var_2, var_3, var_4, var_5) { jus_CollectorImpl__init_(this, var_1, var_2, var_3, var_4, var_5); }],
otjb_Navigator, 0, jl_Object, [otj_JSObject], 4, 3, 0, 0, 0,
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0, 0,
jnci_UTF8Decoder, 0, jnci_BufferedDecoder, [], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction1(jnci_UTF8Decoder__init_), "$arrayDecode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF8Decoder_arrayDecode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
ucicsp_RpcPacket$ProtoAdapter_RpcPacket, 0, csw_ProtoAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(ucicsp_RpcPacket$ProtoAdapter_RpcPacket__init_), "$encode21", $rt_wrapFunction2(ucicsp_RpcPacket$ProtoAdapter_RpcPacket_encode), "$decode9", $rt_wrapFunction1(ucicsp_RpcPacket$ProtoAdapter_RpcPacket_decode), "$decode0", $rt_wrapFunction1(ucicsp_RpcPacket$ProtoAdapter_RpcPacket_decode0), "$encode1", $rt_wrapFunction2(ucicsp_RpcPacket$ProtoAdapter_RpcPacket_encode0)],
jnci_BufferedDecoder$Controller, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_29", $rt_wrapFunction2(jnci_BufferedDecoder$Controller__init_), "$hasMoreInput0", $rt_wrapFunction0(jnci_BufferedDecoder$Controller_hasMoreInput), "$hasMoreInput", $rt_wrapFunction1(jnci_BufferedDecoder$Controller_hasMoreInput0), "$hasMoreOutput0", $rt_wrapFunction1(jnci_BufferedDecoder$Controller_hasMoreOutput), "$setInPosition", $rt_wrapFunction1(jnci_BufferedDecoder$Controller_setInPosition), "$setOutPosition", $rt_wrapFunction1(jnci_BufferedDecoder$Controller_setOutPosition)],
jl_InstantiationException, 0, jl_ReflectiveOperationException, [], 0, 3, 0, 0, 0,
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_DefaultUncaughtExceptionHandler__init_)],
csw_ProtoAdapterKt$commonBool$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonBool$1__init_), "$encode22", $rt_wrapFunction2(csw_ProtoAdapterKt$commonBool$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonBool$1_encode0)],
ucii_TeaVMWebWorkerTest, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ucii_TeaVMWebWorkerTest__init_), "$testWorkerRpcSerialization", $rt_wrapFunction0(ucii_TeaVMWebWorkerTest_testWorkerRpcSerialization), "$testCodecEncodingDecoding", $rt_wrapFunction0(ucii_TeaVMWebWorkerTest_testCodecEncodingDecoding)],
juc_ConcurrentMap, 0, jl_Object, [ju_Map], 3, 3, 0, 0, 0,
juc_ConcurrentHashMap, 0, ju_AbstractMap, [juc_ConcurrentMap, jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray0", $rt_wrapFunction1(juc_ConcurrentHashMap_newElementArray), "$_init_", $rt_wrapFunction0(juc_ConcurrentHashMap__init_2), "$_init_0", $rt_wrapFunction1(juc_ConcurrentHashMap__init_1), "$_init_24", $rt_wrapFunction2(juc_ConcurrentHashMap__init_0), "$get2", $rt_wrapFunction1(juc_ConcurrentHashMap_get), "$put3", $rt_wrapFunction2(juc_ConcurrentHashMap_put), "$remove", $rt_wrapFunction1(juc_ConcurrentHashMap_remove)],
ju_TemplateCollections$SingleElementSet, 0, ju_TemplateCollections$AbstractImmutableSet, [], 0, 0, 0, 0, ["$_init_30", $rt_wrapFunction1(ju_TemplateCollections$SingleElementSet__init_), "$iterator", $rt_wrapFunction0(ju_TemplateCollections$SingleElementSet_iterator)],
ju_UUID, 0, jl_Object, [], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(ju_UUID_toString)],
jtt_Temporal, 0, jl_Object, [jtt_TemporalAccessor], 3, 3, 0, 0, 0,
jtt_TemporalAdjuster, 0, jl_Object, [], 3, 3, 0, 0, 0,
jt_Instant, "Instant", 9, jl_Object, [jtt_Temporal, jtt_TemporalAdjuster, jl_Comparable, ji_Serializable, jtt_TemporalAccessor], 4, 3, 0, jt_Instant_$callClinit, ["$getEpochSecond", $rt_wrapFunction0(jt_Instant_getEpochSecond), "$getNano", $rt_wrapFunction0(jt_Instant_getNano)],
ju_TemplateCollections$SingleElementSet$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$_init_80", $rt_wrapFunction1(ju_TemplateCollections$SingleElementSet$1__init_), "$hasNext", $rt_wrapFunction0(ju_TemplateCollections$SingleElementSet$1_hasNext), "$next", $rt_wrapFunction0(ju_TemplateCollections$SingleElementSet$1_next)],
jnci_Iso8859Decoder, 0, jnci_BufferedDecoder, [], 0, 3, 0, 0, ["$_init_41", $rt_wrapFunction1(jnci_Iso8859Decoder__init_), "$arrayDecode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_Iso8859Decoder_arrayDecode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
csw_FloatArrayProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction1(csw_FloatArrayProtoAdapter__init_), "$encodeWithTag4", $rt_wrapFunction3(csw_FloatArrayProtoAdapter_encodeWithTag), "$encode23", $rt_wrapFunction2(csw_FloatArrayProtoAdapter_encode), "$encodeWithTag0", $rt_wrapFunction3(csw_FloatArrayProtoAdapter_encodeWithTag0), "$encode1", $rt_wrapFunction2(csw_FloatArrayProtoAdapter_encode0)],
ke_EnumEntriesKt, 0, jl_Object, [], 4, 3, 0, 0, 0,
kr_IntProgressionIterator, 0, kc_IntIterator, [], 4, 3, 0, 0, ["$_init_59", $rt_wrapFunction3(kr_IntProgressionIterator__init_), "$hasNext", $rt_wrapFunction0(kr_IntProgressionIterator_hasNext), "$nextInt", $rt_wrapFunction0(kr_IntProgressionIterator_nextInt)],
kc_EmptyMap, 0, jl_Object, [ju_Map, ji_Serializable, kjim_KMappedMarker], 4, 0, 0, kc_EmptyMap_$callClinit, ["$getEntries", $rt_wrapFunction0(kc_EmptyMap_getEntries), "$entrySet", $rt_wrapFunction0(kc_EmptyMap_entrySet)],
kc_AbstractList$IteratorImpl, 0, jl_Object, [ju_Iterator, kjim_KMappedMarker], 0, 0, 0, 0, ["$_init_32", $rt_wrapFunction1(kc_AbstractList$IteratorImpl__init_), "$hasNext", $rt_wrapFunction0(kc_AbstractList$IteratorImpl_hasNext), "$next", $rt_wrapFunction0(kc_AbstractList$IteratorImpl_next)],
jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, ["$_init_84", function(var_1, var_2, var_3, var_4, var_5) { jn_ByteBuffer__init_(this, var_1, var_2, var_3, var_4, var_5); }, "$get0", $rt_wrapFunction3(jn_ByteBuffer_get0), "$get4", $rt_wrapFunction1(jn_ByteBuffer_get), "$put0", $rt_wrapFunction3(jn_ByteBuffer_put0), "$put", $rt_wrapFunction1(jn_ByteBuffer_put), "$hasArray", $rt_wrapFunction0(jn_ByteBuffer_hasArray), "$array", $rt_wrapFunction0(jn_ByteBuffer_array), "$flip", $rt_wrapFunction0(jn_ByteBuffer_flip),
"$position1", $rt_wrapFunction1(jn_ByteBuffer_position)],
jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0, ["$_init_82", $rt_wrapFunction2(jn_ByteBufferImpl__init_0), "$_init_83", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { jn_ByteBufferImpl__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }, "$isReadOnly", $rt_wrapFunction0(jn_ByteBufferImpl_isReadOnly)],
uciisd_Employee, 0, jl_Object, [], 0, 3, 0, 0, 0,
csw_ProtoAdapter$EnumConstantNotFoundException, "ProtoAdapter$EnumConstantNotFoundException", 2, jl_IllegalArgumentException, [], 4, 3, 0, 0, ["$_init_73", $rt_wrapFunction2(csw_ProtoAdapter$EnumConstantNotFoundException__init_)],
otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, otji_JSWrapper_$callClinit, 0,
kt_Charsets, 0, jl_Object, [], 4, 3, 0, kt_Charsets_$callClinit, 0,
csw_ProtoAdapterKt$commonStructNull$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructNull$1__init_), "$encode24", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructNull$1_encode), "$encodeWithTag5", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructNull$1_encodeWithTag), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructNull$1_encode0), "$encodeWithTag0", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructNull$1_encodeWithTag0)],
jnc_BufferUnderflowException, "BufferUnderflowException", 7, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jnc_BufferUnderflowException__init_)],
csw_ProtoAdapterKt$commonUint32$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonUint32$1__init_), "$encode15", $rt_wrapFunction2(csw_ProtoAdapterKt$commonUint32$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonUint32$1_encode0)],
kc_MapsKt__MapsKt, 0, kc_MapsKt__MapsJVMKt, [], 0, 0, 0, 0, 0,
uciisd_MyDataCodec, "MyDataCodec", 22, jl_Object, [ucitrcc_Codec], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_MyDataCodec__init_), "$toWire4", $rt_wrapFunction1(uciisd_MyDataCodec_toWire), "$fromWire", $rt_wrapFunction1(uciisd_MyDataCodec_fromWire), "$getWireAdapter", $rt_wrapFunction0(uciisd_MyDataCodec_getWireAdapter), "$toWire1", $rt_wrapFunction1(uciisd_MyDataCodec_toWire0)],
otcic_JSStderrPrintStream, 0, otcic_JsConsolePrintStream, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(otcic_JSStderrPrintStream__init_), "$print", $rt_wrapFunction1(otcic_JSStderrPrintStream_print)],
o_Buffer, "Buffer", 16, jl_Object, [o_BufferedSource, o_BufferedSink, jl_Cloneable, jnc_ByteChannel], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(o_Buffer__init_0), "$size0", $rt_wrapFunction0(o_Buffer_size), "$setSize$okio", $rt_wrapFunction1(o_Buffer_setSize$okio), "$exhausted", $rt_wrapFunction0(o_Buffer_exhausted), "$require0", $rt_wrapFunction1(o_Buffer_require), "$readByte", $rt_wrapFunction0(o_Buffer_readByte), "$readInt", $rt_wrapFunction0(o_Buffer_readInt), "$readLong", $rt_wrapFunction0(o_Buffer_readLong),
"$readIntLe", $rt_wrapFunction0(o_Buffer_readIntLe), "$readLongLe", $rt_wrapFunction0(o_Buffer_readLongLe), "$readByteString", $rt_wrapFunction0(o_Buffer_readByteString), "$readByteString0", $rt_wrapFunction1(o_Buffer_readByteString0), "$readUtf8", $rt_wrapFunction1(o_Buffer_readUtf8), "$readString0", $rt_wrapFunction2(o_Buffer_readString), "$readByteArray", $rt_wrapFunction0(o_Buffer_readByteArray0), "$readByteArray0", $rt_wrapFunction1(o_Buffer_readByteArray), "$readFully", $rt_wrapFunction1(o_Buffer_readFully),
"$read", $rt_wrapFunction3(o_Buffer_read), "$skip", $rt_wrapFunction1(o_Buffer_skip), "$write3", $rt_wrapFunction1(o_Buffer_write2), "$write", $rt_wrapFunction1(o_Buffer_write0), "$write1", $rt_wrapFunction3(o_Buffer_write), "$writeAll", $rt_wrapFunction1(o_Buffer_writeAll), "$writeByte0", $rt_wrapFunction1(o_Buffer_writeByte), "$writeInt", $rt_wrapFunction1(o_Buffer_writeInt), "$writeIntLe0", $rt_wrapFunction1(o_Buffer_writeIntLe), "$writeLong", $rt_wrapFunction1(o_Buffer_writeLong), "$writeLongLe0", $rt_wrapFunction1(o_Buffer_writeLongLe),
"$writableSegment$okio", $rt_wrapFunction1(o_Buffer_writableSegment$okio), "$write2", $rt_wrapFunction2(o_Buffer_write1), "$read0", $rt_wrapFunction2(o_Buffer_read0), "$equals0", $rt_wrapFunction1(o_Buffer_equals), "$toString", $rt_wrapFunction0(o_Buffer_toString), "$snapshot0", $rt_wrapFunction0(o_Buffer_snapshot0), "$snapshot", $rt_wrapFunction1(o_Buffer_snapshot), "$readAndWriteUnsafe", $rt_wrapFunction1(o_Buffer_readAndWriteUnsafe), "$write0", $rt_wrapFunction1(o_Buffer_write3), "$writeByte", $rt_wrapFunction1(o_Buffer_writeByte0),
"$writeIntLe", $rt_wrapFunction1(o_Buffer_writeIntLe0), "$writeLongLe", $rt_wrapFunction1(o_Buffer_writeLongLe0)],
csw_ProtoAdapterKt$commonEmpty$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonEmpty$1__init_), "$encode25", $rt_wrapFunction2(csw_ProtoAdapterKt$commonEmpty$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonEmpty$1_encode0)],
kc_EmptyList, "EmptyList", 31, jl_Object, [ju_List, ji_Serializable, ju_RandomAccess, kjim_KMappedMarker], 4, 3, 0, kc_EmptyList_$callClinit, ["$equals0", $rt_wrapFunction1(kc_EmptyList_equals), "$toString", $rt_wrapFunction0(kc_EmptyList_toString), "$getSize", $rt_wrapFunction0(kc_EmptyList_getSize), "$isEmpty", $rt_wrapFunction0(kc_EmptyList_isEmpty), "$get5", $rt_wrapFunction1(kc_EmptyList_get), "$iterator", $rt_wrapFunction0(kc_EmptyList_iterator), "$size", $rt_wrapFunction0(kc_EmptyList_size), "$get1",
$rt_wrapFunction1(kc_EmptyList_get0)],
ju_AbstractMap$SimpleImmutableEntry, 0, jl_Object, [ju_Map$Entry, ji_Serializable], 0, 3, 0, 0, ["$_init_47", $rt_wrapFunction2(ju_AbstractMap$SimpleImmutableEntry__init_), "$getValue", $rt_wrapFunction0(ju_AbstractMap$SimpleImmutableEntry_getValue), "$getKey", $rt_wrapFunction0(ju_AbstractMap$SimpleImmutableEntry_getKey)],
uciisdp_Department, "Department", 23, csw_Message, [], 4, 3, 0, uciisdp_Department_$callClinit, ["$_init_8", $rt_wrapFunction4(uciisdp_Department__init_), "$equals0", $rt_wrapFunction1(uciisdp_Department_equals), "$toString", $rt_wrapFunction0(uciisdp_Department_toString)],
kr_RangesKt___RangesKt, 0, kr_RangesKt__RangesKt, [], 0, 0, 0, 0, 0,
uciisd_DepartmentCodec$toWire$lambda$_1_0, 0, jl_Object, [juf_Function], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_DepartmentCodec$toWire$lambda$_1_0__init_)],
kr_IntRange$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(kr_IntRange$Companion__init_)]]);
$rt_metadata([jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Void, "Void", 11, jl_Object, [], 4, 3, 0, 0, 0,
csw_ProtoAdapterKt$commonFixed32$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonFixed32$1__init_), "$encodedSize1", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed32$1_encodedSize), "$encode26", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed32$1_encode0), "$encode15", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed32$1_encode), "$decode5", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed32$1_decode), "$encodedSize", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed32$1_encodedSize0),
"$encode0", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed32$1_encode2), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonFixed32$1_encode1), "$decode0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonFixed32$1_decode0)],
oi__ByteString, 0, jl_Object, [], 4, 3, 0, oi__ByteString_$callClinit, 0,
kji_Intrinsics, "Intrinsics", 29, jl_Object, [], 0, 3, 0, 0, 0,
k_SafePublicationLazyImpl$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(k_SafePublicationLazyImpl$Companion__init_0)],
juca_BaseAtomicReferenceFieldUpdater, 0, juca_AtomicReferenceFieldUpdater, [], 1, 0, 0, 0, ["$_init_", $rt_wrapFunction0(juca_BaseAtomicReferenceFieldUpdater__init_)],
ucitrct_MessageHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
ucics_RpcClient$_init_$lambda$_1_0, 0, jl_Object, [ucitrct_MessageHandler], 0, 3, 0, 0, ["$_init_76", $rt_wrapFunction1(ucics_RpcClient$_init_$lambda$_1_0__init_), "$onMessage", $rt_wrapFunction1(ucics_RpcClient$_init_$lambda$_1_0_onMessage)],
ju_HashMap$2, 0, ju_AbstractCollection, [], 0, 0, 0, 0, ["$_init_25", $rt_wrapFunction1(ju_HashMap$2__init_), "$iterator", $rt_wrapFunction0(ju_HashMap$2_iterator)],
jl_Double, "Double", 11, jl_Number, [jl_Comparable], 0, 3, 0, jl_Double_$callClinit, ["$_init_87", $rt_wrapFunction1(jl_Double__init_), "$doubleValue", $rt_wrapFunction0(jl_Double_doubleValue), "$intValue", $rt_wrapFunction0(jl_Double_intValue), "$longValue", $rt_wrapFunction0(jl_Double_longValue), "$floatValue", $rt_wrapFunction0(jl_Double_floatValue), "$toString", $rt_wrapFunction0(jl_Double_toString0), "$equals0", $rt_wrapFunction1(jl_Double_equals0)],
csw_ProtoAdapterKt$commonBytes$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_37", $rt_wrapFunction4(csw_ProtoAdapterKt$commonBytes$1__init_), "$encodedSize2", $rt_wrapFunction1(csw_ProtoAdapterKt$commonBytes$1_encodedSize), "$encode27", $rt_wrapFunction2(csw_ProtoAdapterKt$commonBytes$1_encode0), "$encode28", $rt_wrapFunction2(csw_ProtoAdapterKt$commonBytes$1_encode), "$decode10", $rt_wrapFunction1(csw_ProtoAdapterKt$commonBytes$1_decode), "$encodedSize", $rt_wrapFunction1(csw_ProtoAdapterKt$commonBytes$1_encodedSize0),
"$encode0", $rt_wrapFunction2(csw_ProtoAdapterKt$commonBytes$1_encode1), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonBytes$1_encode2), "$decode0", $rt_wrapFunction1(csw_ProtoAdapterKt$commonBytes$1_decode0)],
jl_VirtualMachineError, 0, jl_Error, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_VirtualMachineError__init_)],
csw_Syntax, "Syntax", 2, jl_Enum, [], 12, 3, 0, csw_Syntax_$callClinit, ["$toString", $rt_wrapFunction0(csw_Syntax_toString)],
uciisd_Organization, 0, jl_Object, [], 0, 3, 0, 0, 0,
k_SafePublicationLazyImpl$_value$_AtomicUpdater$, 0, juca_BaseAtomicReferenceFieldUpdater, [], 0, 3, 0, k_SafePublicationLazyImpl$_value$_AtomicUpdater$_$callClinit, 0,
jl_NegativeArraySizeException, "NegativeArraySizeException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_NegativeArraySizeException__init_)],
kc_AbstractMutableList, 0, ju_AbstractList, [ju_List, kjim_KMutableList], 1, 3, 0, 0, ["$_init_", $rt_wrapFunction0(kc_AbstractMutableList__init_), "$size", $rt_wrapFunction0(kc_AbstractMutableList_size)],
csw_ProtoAdapterKt$commonInstant$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonInstant$1__init_), "$encode29", $rt_wrapFunction2(csw_ProtoAdapterKt$commonInstant$1_encode), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonInstant$1_encode0)],
jn_ProtocolException, "ProtocolException", 10, ji_IOException, [], 0, 3, 0, 0, ["$_init_2", $rt_wrapFunction1(jn_ProtocolException__init_0)],
uciisdp_MyData$ProtoAdapter_MyData, 0, csw_ProtoAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_MyData$ProtoAdapter_MyData__init_), "$encode30", $rt_wrapFunction2(uciisdp_MyData$ProtoAdapter_MyData_encode), "$decode11", $rt_wrapFunction1(uciisdp_MyData$ProtoAdapter_MyData_decode), "$decode0", $rt_wrapFunction1(uciisdp_MyData$ProtoAdapter_MyData_decode0), "$encode1", $rt_wrapFunction2(uciisdp_MyData$ProtoAdapter_MyData_encode0)],
jnci_UTF16Decoder, 0, jnci_BufferedDecoder, [], 0, 3, 0, 0, ["$_init_35", $rt_wrapFunction3(jnci_UTF16Decoder__init_), "$arrayDecode", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { return jnci_UTF16Decoder_arrayDecode(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
jl_OutOfMemoryError, "OutOfMemoryError", 11, jl_VirtualMachineError, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_OutOfMemoryError__init_)],
uciisd_Department, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_IllegalStateException, "IllegalStateException", 11, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(jl_IllegalStateException__init_2), "$_init_2", $rt_wrapFunction1(jl_IllegalStateException__init_1)],
uciis_MyDataService_Stub, 0, jl_Object, [uciis_MyDataService], 0, 3, 0, 0, ["$_init_76", $rt_wrapFunction1(uciis_MyDataService_Stub__init_), "$processData", $rt_wrapFunction1(uciis_MyDataService_Stub_processData)],
kc_AbstractList$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$orderedEquals$kotlin_stdlib", $rt_wrapFunction2(kc_AbstractList$Companion_orderedEquals$kotlin_stdlib), "$_init_15", $rt_wrapFunction1(kc_AbstractList$Companion__init_0)],
uciisdp_Organization$ProtoAdapter_Organization, 0, csw_ProtoAdapter, [], 4, 0, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_Organization$ProtoAdapter_Organization__init_), "$encode31", $rt_wrapFunction2(uciisdp_Organization$ProtoAdapter_Organization_encode), "$encode1", $rt_wrapFunction2(uciisdp_Organization$ProtoAdapter_Organization_encode0)],
ju_HashMap$HashMapEntrySet, 0, ju_AbstractSet, [], 0, 0, 0, 0, ["$_init_25", $rt_wrapFunction1(ju_HashMap$HashMapEntrySet__init_), "$iterator", $rt_wrapFunction0(ju_HashMap$HashMapEntrySet_iterator)],
csw_WireEnum, 0, jl_Object, [], 3, 3, 0, 0, 0,
ucicsp_RpcPacket$Type, "RpcPacket$Type", 26, jl_Enum, [csw_WireEnum], 12, 3, 0, ucicsp_RpcPacket$Type_$callClinit, ["$getValue0", $rt_wrapFunction0(ucicsp_RpcPacket$Type_getValue)],
kr_IntRange, 0, kr_IntProgression, [kr_ClosedRange, kr_OpenEndRange], 4, 3, 0, kr_IntRange_$callClinit, ["$_init_57", $rt_wrapFunction2(kr_IntRange__init_)],
jl_IllegalAccessException, 0, jl_ReflectiveOperationException, [], 0, 3, 0, 0, 0,
ji_EOFException, "EOFException", 8, ji_IOException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(ji_EOFException__init_0)],
kc_EmptySet, 0, jl_Object, [ju_Set, ji_Serializable, kjim_KMappedMarker], 4, 3, 0, kc_EmptySet_$callClinit, ["$iterator", $rt_wrapFunction0(kc_EmptySet_iterator)],
uciisdp_Employee, "Employee", 23, csw_Message, [], 4, 3, 0, uciisdp_Employee_$callClinit, ["$_init_51", $rt_wrapFunction4(uciisdp_Employee__init_), "$equals0", $rt_wrapFunction1(uciisdp_Employee_equals), "$toString", $rt_wrapFunction0(uciisdp_Employee_toString)],
cswi_MutableOnWriteList, "MutableOnWriteList", 3, kc_AbstractMutableList, [ju_RandomAccess, ji_Serializable], 4, 3, 0, 0, ["$_init_66", $rt_wrapFunction1(cswi_MutableOnWriteList__init_), "$getMutableList$wire_runtime", $rt_wrapFunction0(cswi_MutableOnWriteList_getMutableList$wire_runtime), "$get1", $rt_wrapFunction1(cswi_MutableOnWriteList_get), "$getSize", $rt_wrapFunction0(cswi_MutableOnWriteList_getSize)],
csw_ProtoAdapter$Companion, 0, jl_Object, [], 4, 3, 0, 0, ["$_init_15", $rt_wrapFunction1(csw_ProtoAdapter$Companion__init_0)],
kjf_Function18, "Function18", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function19, "Function19", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kc_ArraysUtilJVM, 0, jl_Object, [], 0, 0, 0, 0, 0,
kjf_Function14, "Function14", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function15, "Function15", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function16, "Function16", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function17, "Function17", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function10, "Function10", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
cswi_Internal, 0, jl_Object, [], 4, 3, 0, 0, 0,
kjf_Function11, "Function11", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function12, "Function12", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function13, "Function13", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0]);
$rt_metadata([ucitrct_Transport, 0, jl_Object, [], 3, 3, 0, 0, 0,
ucitrt_WebWorkerTransport, 0, jl_Object, [ucitrct_Transport], 0, 3, 0, 0, ["$_init_78", $rt_wrapFunction1(ucitrt_WebWorkerTransport__init_), "$send", $rt_wrapFunction1(ucitrt_WebWorkerTransport_send), "$addMessageHandler", $rt_wrapFunction1(ucitrt_WebWorkerTransport_addMessageHandler)],
ucicsp_RpcPacket, "RpcPacket", 26, csw_Message, [], 4, 3, 0, ucicsp_RpcPacket_$callClinit, ["$_init_50", function(var_1, var_2, var_3, var_4, var_5, var_6, var_7) { ucicsp_RpcPacket__init_(this, var_1, var_2, var_3, var_4, var_5, var_6, var_7); }],
k_LazyKt__LazyJVMKt, 0, jl_Object, [], 0, 0, 0, 0, 0,
jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, jnc_CoderResult_$callClinit, ["$_init_92", $rt_wrapFunction2(jnc_CoderResult__init_0), "$isUnderflow", $rt_wrapFunction0(jnc_CoderResult_isUnderflow), "$isOverflow", $rt_wrapFunction0(jnc_CoderResult_isOverflow), "$isError", $rt_wrapFunction0(jnc_CoderResult_isError), "$isMalformed", $rt_wrapFunction0(jnc_CoderResult_isMalformed), "$isUnmappable", $rt_wrapFunction0(jnc_CoderResult_isUnmappable), "$length", $rt_wrapFunction0(jnc_CoderResult_length), "$throwException",
$rt_wrapFunction0(jnc_CoderResult_throwException)],
otcit_DoubleAnalyzer, 0, jl_Object, [], 4, 3, 0, otcit_DoubleAnalyzer_$callClinit, 0,
kji_ReflectionFactory, 0, jl_Object, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(kji_ReflectionFactory__init_), "$getOrCreateKotlinClass", $rt_wrapFunction1(kji_ReflectionFactory_getOrCreateKotlinClass)],
csw_DoubleArrayProtoAdapter, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_10", $rt_wrapFunction1(csw_DoubleArrayProtoAdapter__init_), "$encodeWithTag6", $rt_wrapFunction3(csw_DoubleArrayProtoAdapter_encodeWithTag), "$encode32", $rt_wrapFunction2(csw_DoubleArrayProtoAdapter_encode), "$encodeWithTag0", $rt_wrapFunction3(csw_DoubleArrayProtoAdapter_encodeWithTag0), "$encode1", $rt_wrapFunction2(csw_DoubleArrayProtoAdapter_encode0)],
ki_ProgressionUtilKt, 0, jl_Object, [], 4, 3, 0, 0, 0,
k_NoWhenBranchMatchedException, "NoWhenBranchMatchedException", 27, jl_RuntimeException, [], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(k_NoWhenBranchMatchedException__init_)],
csw_ProtoAdapterKt$commonStructValue$1, 0, csw_ProtoAdapter, [], 4, 3, 0, 0, ["$_init_36", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructValue$1__init_), "$encode1", $rt_wrapFunction2(csw_ProtoAdapterKt$commonStructValue$1_encode), "$encodeWithTag0", $rt_wrapFunction3(csw_ProtoAdapterKt$commonStructValue$1_encodeWithTag)],
kjf_Function21, "Function21", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
kjf_Function22, "Function22", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
uciisd_DepartmentCodec, 0, jl_Object, [ucitrcc_Codec], 0, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisd_DepartmentCodec__init_), "$toWire", $rt_wrapFunction1(uciisd_DepartmentCodec_toWire)],
kjf_Function20, "Function20", 30, jl_Object, [k_Function], 3, 3, 0, 0, 0,
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1, "RpcClient$AsyncResultImpl$thenApply$lambda$_3_1", 25, jl_Object, [juf_Consumer], 0, 3, 0, 0, ["$_init_43", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1__init_), "$accept", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1_accept0), "$accept0", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_1_accept)],
ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0, "RpcClient$AsyncResultImpl$thenApply$lambda$_3_0", 25, jl_Object, [juf_Consumer], 0, 3, 0, 0, ["$_init_42", $rt_wrapFunction2(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0__init_), "$accept", $rt_wrapFunction1(ucics_RpcClient$AsyncResultImpl$thenApply$lambda$_3_0_accept)],
ju_HashMap$EntryIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$_init_25", $rt_wrapFunction1(ju_HashMap$EntryIterator__init_), "$next0", $rt_wrapFunction0(ju_HashMap$EntryIterator_next), "$next", $rt_wrapFunction0(ju_HashMap$EntryIterator_next0)],
uciisdp_Address, "Address", 23, csw_Message, [], 4, 3, 0, uciisdp_Address_$callClinit, ["$_init_67", $rt_wrapFunction3(uciisdp_Address__init_), "$equals0", $rt_wrapFunction1(uciisdp_Address_equals), "$toString", $rt_wrapFunction0(uciisdp_Address_toString)],
ju_Arrays$ArrayAsList, "Arrays$ArrayAsList", 5, ju_AbstractList, [ju_RandomAccess], 0, 0, 0, 0, ["$_init_54", $rt_wrapFunction1(ju_Arrays$ArrayAsList__init_), "$get1", $rt_wrapFunction1(ju_Arrays$ArrayAsList_get), "$size", $rt_wrapFunction0(ju_Arrays$ArrayAsList_size)],
ju_Collections, 0, jl_Object, [], 0, 3, 0, ju_Collections_$callClinit, 0,
uciisdp_MyData$Builder, 0, csw_Message$Builder, [], 4, 3, 0, 0, ["$_init_", $rt_wrapFunction0(uciisdp_MyData$Builder__init_), "$id", $rt_wrapFunction1(uciisdp_MyData$Builder_id), "$content", $rt_wrapFunction1(uciisdp_MyData$Builder_content), "$value", $rt_wrapFunction1(uciisdp_MyData$Builder_value), "$build3", $rt_wrapFunction0(uciisdp_MyData$Builder_build)]]);
let $rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_shortArrayCls = $rt_arraycls($rt_shortcls),
$rt_intArrayCls = $rt_arraycls($rt_intcls),
$rt_longArrayCls = $rt_arraycls($rt_longcls),
$rt_floatArrayCls = $rt_arraycls($rt_floatcls),
$rt_doubleArrayCls = $rt_arraycls($rt_doublecls);
$rt_stringPool(["Replacement preconditions do not hold", "Action must be non-null", "main", "unknownFields", "fieldEncoding", "null cannot be cast to non-null type com.squareup.wire.ProtoAdapter<kotlin.Any>", "", ": ", "\tat ", "Caused by: ", "syntax", "Unable to pack a length-delimited type.", "type", "writer", "sink", "bytes", "source", "Can\'t create a repeated adapter from a repeated or packed adapter.", "type.googleapis.com/google.protobuf.DoubleValue", "type.googleapis.com/google.protobuf.FloatValue",
"type.googleapis.com/google.protobuf.Int64Value", "type.googleapis.com/google.protobuf.UInt64Value", "type.googleapis.com/google.protobuf.Int32Value", "type.googleapis.com/google.protobuf.UInt32Value", "type.googleapis.com/google.protobuf.BoolValue", "type.googleapis.com/google.protobuf.StringValue", "type.googleapis.com/google.protobuf.BytesValue", "type.googleapis.com/uk.co.instanto.integration.service.dto.proto.Department", "uk/co/instanto/integration/service/dto/proto/Department.proto", "<this>", "unsafeCursor",
"already attached to a buffer", "0123456789abcdef", "type.googleapis.com/google.protobuf.Duration", "value", "�", "averageCharsPerByte must be positive. Actual value is ", "maxCharsPerByte must be positive. Actual value is ", "newAction must be non-null", "data", "copyOf(...)", "buffer", "other", "target", "[size=0]", "substring(...)", "\\", "\\\\", "\n", "\\n", "\r", "\\r", "[text=", "[size=", " text=", "…]", "[hex=", " hex=", "endIndex > length(", "endIndex < beginIndex", "segments", "directory", "BIG_ENDIAN",
"LITTLE_ENDIAN", "Check failed.", "...", "[", "]", "SYNCHRONIZED", "PUBLICATION", "NONE", "reader", ", ", "elements", "Index overflow has happened.", "New position ", " is outside of range [0;", "CONCURRENT", "UNORDERED", "IDENTITY_FINISH", "toIndex (", ") is greater than size (", ").", "originalAdapter", "entries", "(this Collection)", "type.googleapis.com/google.protobuf.Struct", "0", "Repeated values can only be encoded with a tag.", "charsetName is null", "Should never been thrown", "delegate", "typeUrl",
"null", "initializer", "US-ASCII", "Operation not supported.", "IGNORE", "REPLACE", "REPORT", "jClass", "boolean", "kotlin.Boolean", "char", "kotlin.Char", "byte", "kotlin.Byte", "short", "kotlin.Short", "int", "kotlin.Int", "float", "kotlin.Float", "long", "kotlin.Long", "double", "kotlin.Double", "java.lang.Boolean", "java.lang.Character", "java.lang.Byte", "java.lang.Short", "java.lang.Integer", "java.lang.Float", "java.lang.Long", "java.lang.Double", "java.lang.Object", "kotlin.Any", "java.lang.String",
"kotlin.String", "java.lang.CharSequence", "kotlin.CharSequence", "java.lang.Throwable", "kotlin.Throwable", "java.lang.Cloneable", "kotlin.Cloneable", "java.lang.Number", "kotlin.Number", "java.lang.Comparable", "kotlin.Comparable", "java.lang.Enum", "kotlin.Enum", "java.lang.annotation.Annotation", "kotlin.Annotation", "java.lang.Iterable", "kotlin.collections.Iterable", "java.util.Iterator", "kotlin.collections.Iterator", "java.util.Collection", "kotlin.collections.Collection", "java.util.List", "kotlin.collections.List",
"java.util.Set", "kotlin.collections.Set", "java.util.ListIterator", "kotlin.collections.ListIterator", "java.util.Map", "kotlin.collections.Map", "java.util.Map$Entry", "kotlin.collections.Map.Entry", "kotlin.jvm.internal.StringCompanionObject", "kotlin.String.Companion", "kotlin.jvm.internal.EnumCompanionObject", "kotlin.Enum.Companion", "<get-values>(...)", "kotlin.jvm.internal.", "CompanionObject", ".Companion", "kotlin.Function", "interface ", "class ", "separator", "prefix", "postfix", "truncated", "toString(...)",
"type.googleapis.com/uk.co.instanto.integration.service.dto.proto.Address", "uk/co/instanto/integration/service/dto/proto/Address.proto", "minByteCount <= 0: ", "minByteCount > Segment.SIZE: ", "not attached to a buffer", "expandBuffer() only permitted for read/write buffers", "VARINT", "FIXED64", "LENGTH_DELIMITED", "FIXED32", "oldValue", "newValue", "missingDelimiterValue", "chars", "string", "Capacity is negative: ", "The last char in dst ", " is outside of array of size ", "Length ", " must be non-negative",
"Offset ", "The last char in src ", " is outside of string of size ", "Start ", " must be before end ", "UTF-16", "UTF-16BE", "UTF-16LE", "ISO-8859-1", "type.googleapis.com/uk.co.instanto.integration.service.dto.proto.Employee", "uk/co/instanto/integration/service/dto/proto/Employee.proto", "UTF-8", "asList(...)", "destination", "copyOfRange(...)", " ", "expected: ", " but was: ", "expected:<", "> but was:<", ">", "<", "list", "type.googleapis.com/google.protobuf.ListValue", "segment", "byteCount out of range",
"cannot compact", "only owner can write", "Failed requirement.", "uk.co.instanto.integration.TeaVMWebWorkerTest.testWorkerRpcSerialization()V", "uk.co.instanto.integration.TeaVMWebWorkerTest.testCodecEncodingDecoding()V", "Invalid test name", "Unexpected call to beginMessage()", "Wire recursion limit exceeded", "Unexpected call to endMessage()", "No corresponding call to beginMessage()", "Expected to end at ", " but was ", "Unexpected call to nextTag()", "Unexpected tag 0", "Negative length: ", "Unexpected end group",
"Unexpected field encoding: ", "Expected VARINT or LENGTH_DELIMITED but was ", "Malformed VARINT", "WireInput encountered a malformed varint", "Expected FIXED32 or LENGTH_DELIMITED but was ", "Expected FIXED64 or LENGTH_DELIMITED but was ", "Expected LENGTH_DELIMITED but was ", "size=", " offset=", " byteCount=", "a", "b", "adapter", "id == null", "content == null", "Step must be non-zero.", "Step must be greater than Int.MIN_VALUE to avoid overflow on negation.", "name", ".contains(null)", "Element at index ",
" is null", ",[]{}\\", "StringBuilder(capacity).…builderAction).toString()", "values", "p0", "Unmappable characters of length ", "null cannot be cast to non-null type java.lang.Class<T of kotlin.jvm.JvmClassMappingKt.<get-java>>", "Malformed input of length ", "pair", "singletonMap(...)", "with(...)", "ProtobufSerializer requires a Codec instance, got: ", "No codec registered for class: ", "Array has more than one element.", "Array is empty.", "Unknown Source", ")", "name == null", "getBytes(...)", "type.googleapis.com/uk.co.instanto.client.service.proto.RpcPacket",
"rpc.proto", "Hello TeaVM", "Worker should have received a message", "TeaVM Test: Worker received RPC message successfully", "test-id", "Codec Test Content", "TeaVM Test: Codec encode/decode successful", "Instant exceeds minimum or maximum instant", "The last byte in dst ", "The last byte in src ", "Unknown enum tag ", " for ", "object", "function", "number", "undefined", "forName(...)", "type.googleapis.com/google.protobuf.NullValue", "null cannot be cast to non-null type kotlin.collections.Map<K of kotlin.collections.MapsKt__MapsKt.emptyMap, V of kotlin.collections.MapsKt__MapsKt.emptyMap>",
"pairs", "byteCount: ", "charset", "byteString", "unexpected capacity", "source == this", "byteCount < 0: ", "size > Int.MAX_VALUE: ", "s.limit == s.pos", "type.googleapis.com/google.protobuf.Empty", "[]", "Empty list doesn\'t contain element at index ", "employees", ", name=", ", manager=", ", employees=", "Department{", "Either src or dest is null", " must not be null", "Parameter specified as non-null is null: method ", ".", ", parameter ", "PROTO_2", "proto2", "PROTO_3", "proto3", "type.googleapis.com/google.protobuf.Timestamp",
"type.googleapis.com/uk.co.instanto.integration.service.dto.proto.MyData", "uk/co/instanto/integration/service/dto/proto/MyData.proto", "uk.co.instanto.integration.service.MyDataService", "processData", "c", "type.googleapis.com/uk.co.instanto.integration.service.dto.proto.Organization", "uk/co/instanto/integration/service/dto/proto/Organization.proto", "REQUEST", "RESPONSE", "STREAM_DATA", "STREAM_ERROR", "STREAM_COMPLETE", "STREAM_CANCEL", "EVENT", "tags", ", address=", ", tags=", "Employee{", "immutableList",
"type == null", "serviceId == null", "methodName == null", "requestId == null", "replyTo == null", "payload == null", "mode", "Step is zero.", "type.googleapis.com/google.protobuf.Value", "null cannot be cast to non-null type kotlin.collections.Map<kotlin.String, *>", "unexpected struct value: ", "street == null", "city == null", ", street=", ", city=", "Address{"]);
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
let $rt_export_main = $rt_mainStarter(otj_TestJsEntryPoint_main);
$rt_export_main.javaException = $rt_javaException;
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
    c = otji_JSWrapper$_clinit_$lambda$_33_0.prototype;
    c[$rt_jso_marker] = true;
    c.accept = c.$accept$exported$0;
    c = otji_JSWrapper$_clinit_$lambda$_33_1.prototype;
    c[$rt_jso_marker] = true;
    c.accept = c.$accept$exported$0;
    c = ucitrt_WebWorkerTransport$_init_$lambda$_0_0.prototype;
    c[$rt_jso_marker] = true;
    c.handle = c.$handle$exported$0;
})();
jl_Throwable.prototype.getMessage = function() {
    return $rt_ustr(this.$getMessage());
};
$rt_exports.main = $rt_export_main;
}));

//# sourceMappingURL=classTest.js.map