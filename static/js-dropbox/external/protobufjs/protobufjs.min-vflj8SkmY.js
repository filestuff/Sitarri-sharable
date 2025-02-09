define((function() {
    return (function(t) {
        var r = {};

        function e(n) {
            if (r[n]) return r[n].exports;
            var i = r[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return t[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports
        }
        return e.m = t, e.c = r, e.d = function(t, r, n) {
            e.o(t, r) || Object.defineProperty(t, r, {
                enumerable: !0,
                get: n
            })
        }, e.r = function(t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, e.t = function(t, r) {
            if (1 & r && (t = e(t)), 8 & r) return t;
            if (4 & r && "object" == typeof t && t && t.__esModule) return t;
            var n = Object.create(null);
            if (e.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & r && "string" != typeof t)
                for (var i in t) e.d(n, i, function(r) {
                    return t[r]
                }.bind(null, i));
            return n
        }, e.n = function(t) {
            var r = t && t.__esModule ? function() {
                return t.default
            } : function() {
                return t
            };
            return e.d(r, "a", r), r
        }, e.o = function(t, r) {
            return Object.prototype.hasOwnProperty.call(t, r)
        }, e.p = "", e(e.s = 0)
    })([function(t, r, e) {
        "use strict";
        t.exports = e(1)
    }, function(t, r, e) {
        "use strict";
        var n = r;

        function i() {
            n.util._configure(), n.Writer._configure(n.BufferWriter), n.Reader._configure(n.BufferReader)
        }
        n.build = "minimal", n.Writer = e(2), n.BufferWriter = e(13), n.Reader = e(14), n.BufferReader = e(15), n.util = e(3), n.rpc = e(16), n.roots = e(18), n.configure = i, i()
    }, function(t, r, e) {
        "use strict";
        t.exports = a;
        var n, i = e(3),
            o = i.LongBits,
            s = i.base64,
            u = i.utf8;

        function f(t, r, e) {
            this.fn = t, this.len = r, this.next = void 0, this.val = e
        }

        function h() {}

        function l(t) {
            this.head = t.head, this.tail = t.tail, this.len = t.len, this.next = t.states
        }

        function a() {
            this.len = 0, this.head = new f(h, 0, 0), this.tail = this.head, this.states = null
        }
        var c = function() {
            return i.Buffer ? function() {
                return (a.create = function() {
                    return new n
                })()
            } : function() {
                return new a
            }
        };

        function p(t, r, e) {
            r[e] = 255 & t
        }

        function y(t, r) {
            this.len = t, this.next = void 0, this.val = r
        }

        function d(t, r, e) {
            for (; t.hi;) r[e++] = 127 & t.lo | 128, t.lo = (t.lo >>> 7 | t.hi << 25) >>> 0, t.hi >>>= 7;
            for (; t.lo > 127;) r[e++] = 127 & t.lo | 128, t.lo = t.lo >>> 7;
            r[e++] = t.lo
        }

        function b(t, r, e) {
            r[e] = 255 & t, r[e + 1] = t >>> 8 & 255, r[e + 2] = t >>> 16 & 255, r[e + 3] = t >>> 24
        }
        a.create = c(), a.alloc = function(t) {
            return new i.Array(t)
        }, i.Array !== Array && (a.alloc = i.pool(a.alloc, i.Array.prototype.subarray)), a.prototype._push = function(t, r, e) {
            return this.tail = this.tail.next = new f(t, r, e), this.len += r, this
        }, y.prototype = Object.create(f.prototype), y.prototype.fn = function(t, r, e) {
            for (; t > 127;) r[e++] = 127 & t | 128, t >>>= 7;
            r[e] = t
        }, a.prototype.uint32 = function(t) {
            return this.len += (this.tail = this.tail.next = new y((t >>>= 0) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : t < 268435456 ? 4 : 5, t)).len, this
        }, a.prototype.int32 = function(t) {
            return t < 0 ? this._push(d, 10, o.fromNumber(t)) : this.uint32(t)
        }, a.prototype.sint32 = function(t) {
            return this.uint32((t << 1 ^ t >> 31) >>> 0)
        }, a.prototype.uint64 = function(t) {
            var r = o.from(t);
            return this._push(d, r.length(), r)
        }, a.prototype.int64 = a.prototype.uint64, a.prototype.sint64 = function(t) {
            var r = o.from(t).zzEncode();
            return this._push(d, r.length(), r)
        }, a.prototype.bool = function(t) {
            return this._push(p, 1, t ? 1 : 0)
        }, a.prototype.fixed32 = function(t) {
            return this._push(b, 4, t >>> 0)
        }, a.prototype.sfixed32 = a.prototype.fixed32, a.prototype.fixed64 = function(t) {
            var r = o.from(t);
            return this._push(b, 4, r.lo)._push(b, 4, r.hi)
        }, a.prototype.sfixed64 = a.prototype.fixed64, a.prototype.float = function(t) {
            return this._push(i.float.writeFloatLE, 4, t)
        }, a.prototype.double = function(t) {
            return this._push(i.float.writeDoubleLE, 8, t)
        };
        var g = i.Array.prototype.set ? function(t, r, e) {
            r.set(t, e)
        } : function(t, r, e) {
            for (var n = 0; n < t.length; ++n) r[e + n] = t[n]
        };
        a.prototype.bytes = function(t) {
            var r = t.length >>> 0;
            if (!r) return this._push(p, 1, 0);
            if (i.isString(t)) {
                var e = a.alloc(r = s.length(t));
                s.decode(t, e, 0), t = e
            }
            return this.uint32(r)._push(g, r, t)
        }, a.prototype.string = function(t) {
            var r = u.length(t);
            return r ? this.uint32(r)._push(u.write, r, t) : this._push(p, 1, 0)
        }, a.prototype.fork = function() {
            return this.states = new l(this), this.head = this.tail = new f(h, 0, 0), this.len = 0, this
        }, a.prototype.reset = function() {
            return this.states ? (this.head = this.states.head, this.tail = this.states.tail, this.len = this.states.len, this.states = this.states.next) : (this.head = this.tail = new f(h, 0, 0), this.len = 0), this
        }, a.prototype.ldelim = function() {
            var t = this.head,
                r = this.tail,
                e = this.len;
            return this.reset().uint32(e), e && (this.tail.next = t.next, this.tail = r, this.len += e), this
        }, a.prototype.finish = function() {
            for (var t = this.head.next, r = this.constructor.alloc(this.len), e = 0; t;) t.fn(t.val, r, e), e += t.len, t = t.next;
            return r
        }, a._configure = function(t) {
            n = t, a.create = c(), n._configure()
        }
    }, function(t, r, e) {
        "use strict";
        (function(t) {
            var n = r;

            function i(t, r, e) {
                for (var n = Object.keys(r), i = 0; i < n.length; ++i) void 0 !== t[n[i]] && e || (t[n[i]] = r[n[i]]);
                return t
            }

            function o(t) {
                function r(t, e) {
                    if (!(this instanceof r)) return new r(t, e);
                    Object.defineProperty(this, "message", {
                        get: function() {
                            return t
                        }
                    }), Error.captureStackTrace ? Error.captureStackTrace(this, r) : Object.defineProperty(this, "stack", {
                        value: (new Error).stack || ""
                    }), e && i(this, e)
                }
                return (r.prototype = Object.create(Error.prototype)).constructor = r, Object.defineProperty(r.prototype, "name", {
                    get: function() {
                        return t
                    }
                }), r.prototype.toString = function() {
                    return this.name + ": " + this.message
                }, r
            }
            n.asPromise = e(5), n.base64 = e(6), n.EventEmitter = e(7), n.float = e(8), n.inquire = e(9), n.utf8 = e(10), n.pool = e(11), n.LongBits = e(12), n.global = "undefined" != typeof window && window || void 0 !== t && t || "undefined" != typeof self && self || this, n.emptyArray = Object.freeze ? Object.freeze([]) : [], n.emptyObject = Object.freeze ? Object.freeze({}) : {}, n.isNode = Boolean(n.global.process && n.global.process.versions && n.global.process.versions.node), n.isInteger = Number.isInteger || function(t) {
                return "number" == typeof t && isFinite(t) && Math.floor(t) === t
            }, n.isString = function(t) {
                return "string" == typeof t || t instanceof String
            }, n.isObject = function(t) {
                return t && "object" == typeof t
            }, n.isset = n.isSet = function(t, r) {
                var e = t[r];
                return !(null == e || !t.hasOwnProperty(r)) && ("object" != typeof e || (Array.isArray(e) ? e.length : Object.keys(e).length) > 0)
            }, n.Buffer = (function() {
                try {
                    var t = n.inquire("buffer").Buffer;
                    return t.prototype.utf8Write ? t : null
                } catch (t) {
                    return null
                }
            })(), n._Buffer_from = null, n._Buffer_allocUnsafe = null, n.newBuffer = function(t) {
                return "number" == typeof t ? n.Buffer ? n._Buffer_allocUnsafe(t) : new n.Array(t) : n.Buffer ? n._Buffer_from(t) : "undefined" == typeof Uint8Array ? t : new Uint8Array(t)
            }, n.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array, n.Long = n.global.dcodeIO && n.global.dcodeIO.Long || n.global.Long || n.inquire("long"), n.key2Re = /^true|false|0|1$/, n.key32Re = /^-?(?:0|[1-9][0-9]*)$/, n.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/, n.longToHash = function(t) {
                return t ? n.LongBits.from(t).toHash() : n.LongBits.zeroHash
            }, n.longFromHash = function(t, r) {
                var e = n.LongBits.fromHash(t);
                return n.Long ? n.Long.fromBits(e.lo, e.hi, r) : e.toNumber(Boolean(r))
            }, n.merge = i, n.lcFirst = function(t) {
                return t.charAt(0).toLowerCase() + t.substring(1)
            }, n.newError = o, n.ProtocolError = o("ProtocolError"), n.oneOfGetter = function(t) {
                for (var r = {}, e = 0; e < t.length; ++e) r[t[e]] = 1;
                return function() {
                    for (var t = Object.keys(this), e = t.length - 1; e > -1; --e)
                        if (1 === r[t[e]] && void 0 !== this[t[e]] && null !== this[t[e]]) return t[e]
                }
            }, n.oneOfSetter = function(t) {
                return function(r) {
                    for (var e = 0; e < t.length; ++e) t[e] !== r && delete this[t[e]]
                }
            }, n.toJSONOptions = {
                longs: String,
                enums: String,
                bytes: String,
                json: !0
            }, n._configure = function() {
                var t = n.Buffer;
                t ? (n._Buffer_from = t.from !== Uint8Array.from && t.from || function(r, e) {
                    return new t(r, e)
                }, n._Buffer_allocUnsafe = t.allocUnsafe || function(r) {
                    return new t(r)
                }) : n._Buffer_from = n._Buffer_allocUnsafe = null
            }
        }).call(this, e(4))
    }, function(t, r) {
        var e;
        e = (function() {
            return this
        })();
        try {
            e = e || Function("return this")() || (0, eval)("this")
        } catch (t) {
            "object" == typeof window && (e = window)
        }
        t.exports = e
    }, function(t, r, e) {
        "use strict";
        t.exports = function(t, r) {
            var e = new Array(arguments.length - 1),
                n = 0,
                i = 2,
                o = !0;
            for (; i < arguments.length;) e[n++] = arguments[i++];
            return new Promise((function(i, s) {
                e[n] = function(t) {
                    if (o)
                        if (o = !1, t) s(t);
                        else {
                            for (var r = new Array(arguments.length - 1), e = 0; e < r.length;) r[e++] = arguments[e];
                            i.apply(null, r)
                        }
                };
                try {
                    t.apply(r || null, e)
                } catch (t) {
                    o && (o = !1, s(t))
                }
            }))
        }
    }, function(t, r, e) {
        "use strict";
        var n = r;
        n.length = function(t) {
            var r = t.length;
            if (!r) return 0;
            for (var e = 0; --r % 4 > 1 && "=" === t.charAt(r);) ++e;
            return Math.ceil(3 * t.length) / 4 - e
        };
        for (var i = new Array(64), o = new Array(123), s = 0; s < 64;) o[i[s] = s < 26 ? s + 65 : s < 52 ? s + 71 : s < 62 ? s - 4 : s - 59 | 43] = s++;
        n.encode = function(t, r, e) {
            for (var n, o = null, s = [], u = 0, f = 0; r < e;) {
                var h = t[r++];
                switch (f) {
                    case 0:
                        s[u++] = i[h >> 2], n = (3 & h) << 4, f = 1;
                        break;
                    case 1:
                        s[u++] = i[n | h >> 4], n = (15 & h) << 2, f = 2;
                        break;
                    case 2:
                        s[u++] = i[n | h >> 6], s[u++] = i[63 & h], f = 0
                }
                u > 8191 && ((o || (o = [])).push(String.fromCharCode.apply(String, s)), u = 0)
            }
            return f && (s[u++] = i[n], s[u++] = 61, 1 === f && (s[u++] = 61)), o ? (u && o.push(String.fromCharCode.apply(String, s.slice(0, u))), o.join("")) : String.fromCharCode.apply(String, s.slice(0, u))
        };
        n.decode = function(t, r, e) {
            for (var n, i = e, s = 0, u = 0; u < t.length;) {
                var f = t.charCodeAt(u++);
                if (61 === f && s > 1) break;
                if (void 0 === (f = o[f])) throw Error("invalid encoding");
                switch (s) {
                    case 0:
                        n = f, s = 1;
                        break;
                    case 1:
                        r[e++] = n << 2 | (48 & f) >> 4, n = f, s = 2;
                        break;
                    case 2:
                        r[e++] = (15 & n) << 4 | (60 & f) >> 2, n = f, s = 3;
                        break;
                    case 3:
                        r[e++] = (3 & n) << 6 | f, s = 0
                }
            }
            if (1 === s) throw Error("invalid encoding");
            return e - i
        }, n.test = function(t) {
            return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)
        }
    }, function(t, r, e) {
        "use strict";

        function n() {
            this._listeners = {}
        }
        t.exports = n, n.prototype.on = function(t, r, e) {
            return (this._listeners[t] || (this._listeners[t] = [])).push({
                fn: r,
                ctx: e || this
            }), this
        }, n.prototype.off = function(t, r) {
            if (void 0 === t) this._listeners = {};
            else if (void 0 === r) this._listeners[t] = [];
            else
                for (var e = this._listeners[t], n = 0; n < e.length;) e[n].fn === r ? e.splice(n, 1) : ++n;
            return this
        }, n.prototype.emit = function(t) {
            var r = this._listeners[t];
            if (r) {
                for (var e = [], n = 1; n < arguments.length;) e.push(arguments[n++]);
                for (n = 0; n < r.length;) r[n].fn.apply(r[n++].ctx, e)
            }
            return this
        }
    }, function(t, r, e) {
        "use strict";

        function n(t) {
            return "undefined" != typeof Float32Array ? (function() {
                var r = new Float32Array([-0]),
                    e = new Uint8Array(r.buffer),
                    n = 128 === e[3];

                function i(t, n, i) {
                    r[0] = t, n[i] = e[0], n[i + 1] = e[1], n[i + 2] = e[2], n[i + 3] = e[3]
                }

                function o(t, n, i) {
                    r[0] = t, n[i] = e[3], n[i + 1] = e[2], n[i + 2] = e[1], n[i + 3] = e[0]
                }

                function s(t, n) {
                    return e[0] = t[n], e[1] = t[n + 1], e[2] = t[n + 2], e[3] = t[n + 3], r[0]
                }

                function u(t, n) {
                    return e[3] = t[n], e[2] = t[n + 1], e[1] = t[n + 2], e[0] = t[n + 3], r[0]
                }
                t.writeFloatLE = n ? i : o, t.writeFloatBE = n ? o : i, t.readFloatLE = n ? s : u, t.readFloatBE = n ? u : s
            })() : (function() {
                function r(t, r, e, n) {
                    var i = r < 0 ? 1 : 0;
                    if (i && (r = -r), 0 === r) t(1 / r > 0 ? 0 : 2147483648, e, n);
                    else if (isNaN(r)) t(2143289344, e, n);
                    else if (r > 34028234663852886e22) t((i << 31 | 2139095040) >>> 0, e, n);
                    else if (r < 11754943508222875e-54) t((i << 31 | Math.round(r / 1401298464324817e-60)) >>> 0, e, n);
                    else {
                        var o = Math.floor(Math.log(r) / Math.LN2);
                        t((i << 31 | o + 127 << 23 | 8388607 & Math.round(r * Math.pow(2, -o) * 8388608)) >>> 0, e, n)
                    }
                }

                function e(t, r, e) {
                    var n = t(r, e),
                        i = 2 * (n >> 31) + 1,
                        o = n >>> 23 & 255,
                        s = 8388607 & n;
                    return 255 === o ? s ? NaN : i * (1 / 0) : 0 === o ? 1401298464324817e-60 * i * s : i * Math.pow(2, o - 150) * (s + 8388608)
                }
                t.writeFloatLE = r.bind(null, i), t.writeFloatBE = r.bind(null, o), t.readFloatLE = e.bind(null, s), t.readFloatBE = e.bind(null, u)
            })(), "undefined" != typeof Float64Array ? (function() {
                var r = new Float64Array([-0]),
                    e = new Uint8Array(r.buffer),
                    n = 128 === e[7];

                function i(t, n, i) {
                    r[0] = t, n[i] = e[0], n[i + 1] = e[1], n[i + 2] = e[2], n[i + 3] = e[3], n[i + 4] = e[4], n[i + 5] = e[5], n[i + 6] = e[6], n[i + 7] = e[7]
                }

                function o(t, n, i) {
                    r[0] = t, n[i] = e[7], n[i + 1] = e[6], n[i + 2] = e[5], n[i + 3] = e[4], n[i + 4] = e[3], n[i + 5] = e[2], n[i + 6] = e[1], n[i + 7] = e[0]
                }

                function s(t, n) {
                    return e[0] = t[n], e[1] = t[n + 1], e[2] = t[n + 2], e[3] = t[n + 3], e[4] = t[n + 4], e[5] = t[n + 5], e[6] = t[n + 6], e[7] = t[n + 7], r[0]
                }

                function u(t, n) {
                    return e[7] = t[n], e[6] = t[n + 1], e[5] = t[n + 2], e[4] = t[n + 3], e[3] = t[n + 4], e[2] = t[n + 5], e[1] = t[n + 6], e[0] = t[n + 7], r[0]
                }
                t.writeDoubleLE = n ? i : o, t.writeDoubleBE = n ? o : i, t.readDoubleLE = n ? s : u, t.readDoubleBE = n ? u : s
            })() : (function() {
                function r(t, r, e, n, i, o) {
                    var s = n < 0 ? 1 : 0;
                    if (s && (n = -n), 0 === n) t(0, i, o + r), t(1 / n > 0 ? 0 : 2147483648, i, o + e);
                    else if (isNaN(n)) t(0, i, o + r), t(2146959360, i, o + e);
                    else if (n > 17976931348623157e292) t(0, i, o + r), t((s << 31 | 2146435072) >>> 0, i, o + e);
                    else {
                        var u;
                        if (n < 22250738585072014e-324) t((u = n / 5e-324) >>> 0, i, o + r), t((s << 31 | u / 4294967296) >>> 0, i, o + e);
                        else {
                            var f = Math.floor(Math.log(n) / Math.LN2);
                            1024 === f && (f = 1023), t(4503599627370496 * (u = n * Math.pow(2, -f)) >>> 0, i, o + r), t((s << 31 | f + 1023 << 20 | 1048576 * u & 1048575) >>> 0, i, o + e)
                        }
                    }
                }

                function e(t, r, e, n, i) {
                    var o = t(n, i + r),
                        s = t(n, i + e),
                        u = 2 * (s >> 31) + 1,
                        f = s >>> 20 & 2047,
                        h = 4294967296 * (1048575 & s) + o;
                    return 2047 === f ? h ? NaN : u * (1 / 0) : 0 === f ? 5e-324 * u * h : u * Math.pow(2, f - 1075) * (h + 4503599627370496)
                }
                t.writeDoubleLE = r.bind(null, i, 0, 4), t.writeDoubleBE = r.bind(null, o, 4, 0), t.readDoubleLE = e.bind(null, s, 0, 4), t.readDoubleBE = e.bind(null, u, 4, 0)
            })(), t
        }

        function i(t, r, e) {
            r[e] = 255 & t, r[e + 1] = t >>> 8 & 255, r[e + 2] = t >>> 16 & 255, r[e + 3] = t >>> 24
        }

        function o(t, r, e) {
            r[e] = t >>> 24, r[e + 1] = t >>> 16 & 255, r[e + 2] = t >>> 8 & 255, r[e + 3] = 255 & t
        }

        function s(t, r) {
            return (t[r] | t[r + 1] << 8 | t[r + 2] << 16 | t[r + 3] << 24) >>> 0
        }

        function u(t, r) {
            return (t[r] << 24 | t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]) >>> 0
        }
        t.exports = n(n)
    }, function(module, exports, __webpack_require__) {
        "use strict";

        function inquire(moduleName) {
            try {
                var mod = eval("quire".replace(/^/, "re"))(moduleName);
                if (mod && (mod.length || Object.keys(mod).length)) return mod
            } catch (t) {}
            return null
        }
        module.exports = inquire
    }, function(t, r, e) {
        "use strict";
        var n = r;
        n.length = function(t) {
            for (var r = 0, e = 0, n = 0; n < t.length; ++n)(e = t.charCodeAt(n)) < 128 ? r += 1 : e < 2048 ? r += 2 : 55296 == (64512 & e) && 56320 == (64512 & t.charCodeAt(n + 1)) ? (++n, r += 4) : r += 3;
            return r
        }, n.read = function(t, r, e) {
            if (e - r < 1) return "";
            for (var n, i = null, o = [], s = 0; r < e;)(n = t[r++]) < 128 ? o[s++] = n : n > 191 && n < 224 ? o[s++] = (31 & n) << 6 | 63 & t[r++] : n > 239 && n < 365 ? (n = ((7 & n) << 18 | (63 & t[r++]) << 12 | (63 & t[r++]) << 6 | 63 & t[r++]) - 65536, o[s++] = 55296 + (n >> 10), o[s++] = 56320 + (1023 & n)) : o[s++] = (15 & n) << 12 | (63 & t[r++]) << 6 | 63 & t[r++], s > 8191 && ((i || (i = [])).push(String.fromCharCode.apply(String, o)), s = 0);
            return i ? (s && i.push(String.fromCharCode.apply(String, o.slice(0, s))), i.join("")) : String.fromCharCode.apply(String, o.slice(0, s))
        }, n.write = function(t, r, e) {
            for (var n, i, o = e, s = 0; s < t.length; ++s)(n = t.charCodeAt(s)) < 128 ? r[e++] = n : n < 2048 ? (r[e++] = n >> 6 | 192, r[e++] = 63 & n | 128) : 55296 == (64512 & n) && 56320 == (64512 & (i = t.charCodeAt(s + 1))) ? (n = 65536 + ((1023 & n) << 10) + (1023 & i), ++s, r[e++] = n >> 18 | 240, r[e++] = n >> 12 & 63 | 128, r[e++] = n >> 6 & 63 | 128, r[e++] = 63 & n | 128) : (r[e++] = n >> 12 | 224, r[e++] = n >> 6 & 63 | 128, r[e++] = 63 & n | 128);
            return e - o
        }
    }, function(t, r, e) {
        "use strict";
        t.exports = function(t, r, e) {
            var n = e || 8192,
                i = n >>> 1,
                o = null,
                s = n;
            return function(e) {
                if (e < 1 || e > i) return t(e);
                s + e > n && (o = t(n), s = 0);
                var u = r.call(o, s, s += e);
                return 7 & s && (s = 1 + (7 | s)), u
            }
        }
    }, function(t, r, e) {
        "use strict";
        t.exports = i;
        var n = e(3);

        function i(t, r) {
            this.lo = t >>> 0, this.hi = r >>> 0
        }
        var o = i.zero = new i(0, 0);
        o.toNumber = function() {
            return 0
        }, o.zzEncode = o.zzDecode = function() {
            return this
        }, o.length = function() {
            return 1
        };
        var s = i.zeroHash = "\0\0\0\0\0\0\0\0";
        i.fromNumber = function(t) {
            if (0 === t) return o;
            var r = t < 0;
            r && (t = -t);
            var e = t >>> 0,
                n = (t - e) / 4294967296 >>> 0;
            return r && (n = ~n >>> 0, e = ~e >>> 0, ++e > 4294967295 && (e = 0, ++n > 4294967295 && (n = 0))), new i(e, n)
        }, i.from = function(t) {
            if ("number" == typeof t) return i.fromNumber(t);
            if (n.isString(t)) {
                if (!n.Long) return i.fromNumber(parseInt(t, 10));
                t = n.Long.fromString(t)
            }
            return t.low || t.high ? new i(t.low >>> 0, t.high >>> 0) : o
        }, i.prototype.toNumber = function(t) {
            if (!t && this.hi >>> 31) {
                var r = 1 + ~this.lo >>> 0,
                    e = ~this.hi >>> 0;
                return r || (e = e + 1 >>> 0), -(r + 4294967296 * e)
            }
            return this.lo + 4294967296 * this.hi
        }, i.prototype.toLong = function(t) {
            return n.Long ? new n.Long(0 | this.lo, 0 | this.hi, Boolean(t)) : {
                low: 0 | this.lo,
                high: 0 | this.hi,
                unsigned: Boolean(t)
            }
        };
        var u = String.prototype.charCodeAt;
        i.fromHash = function(t) {
            return t === s ? o : new i((u.call(t, 0) | u.call(t, 1) << 8 | u.call(t, 2) << 16 | u.call(t, 3) << 24) >>> 0, (u.call(t, 4) | u.call(t, 5) << 8 | u.call(t, 6) << 16 | u.call(t, 7) << 24) >>> 0)
        }, i.prototype.toHash = function() {
            return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24)
        }, i.prototype.zzEncode = function() {
            var t = this.hi >> 31;
            return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ t) >>> 0, this.lo = (this.lo << 1 ^ t) >>> 0, this
        }, i.prototype.zzDecode = function() {
            var t = -(1 & this.lo);
            return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ t) >>> 0, this.hi = (this.hi >>> 1 ^ t) >>> 0, this
        }, i.prototype.length = function() {
            var t = this.lo,
                r = (this.lo >>> 28 | this.hi << 4) >>> 0,
                e = this.hi >>> 24;
            return 0 === e ? 0 === r ? t < 16384 ? t < 128 ? 1 : 2 : t < 2097152 ? 3 : 4 : r < 16384 ? r < 128 ? 5 : 6 : r < 2097152 ? 7 : 8 : e < 128 ? 9 : 10
        }
    }, function(t, r, e) {
        "use strict";
        t.exports = o;
        var n = e(2);
        (o.prototype = Object.create(n.prototype)).constructor = o;
        var i = e(3);

        function o() {
            n.call(this)
        }

        function s(t, r, e) {
            t.length < 40 ? i.utf8.write(t, r, e) : r.utf8Write ? r.utf8Write(t, e) : r.write(t, e)
        }
        o._configure = function() {
            o.alloc = i._Buffer_allocUnsafe, o.writeBytesBuffer = i.Buffer && i.Buffer.prototype instanceof Uint8Array && "set" === i.Buffer.prototype.set.name ? function(t, r, e) {
                r.set(t, e)
            } : function(t, r, e) {
                if (t.copy) t.copy(r, e, 0, t.length);
                else
                    for (var n = 0; n < t.length;) r[e++] = t[n++]
            }
        }, o.prototype.bytes = function(t) {
            i.isString(t) && (t = i._Buffer_from(t, "base64"));
            var r = t.length >>> 0;
            return this.uint32(r), r && this._push(o.writeBytesBuffer, r, t), this
        }, o.prototype.string = function(t) {
            var r = i.Buffer.byteLength(t);
            return this.uint32(r), r && this._push(s, r, t), this
        }, o._configure()
    }, function(t, r, e) {
        "use strict";
        t.exports = f;
        var n, i = e(3),
            o = i.LongBits,
            s = i.utf8;

        function u(t, r) {
            return RangeError("index out of range: " + t.pos + " + " + (r || 1) + " > " + t.len)
        }

        function f(t) {
            this.buf = t, this.pos = 0, this.len = t.length
        }
        var h, l = "undefined" != typeof Uint8Array ? function(t) {
                if (t instanceof Uint8Array || Array.isArray(t)) return new f(t);
                throw Error("illegal buffer")
            } : function(t) {
                if (Array.isArray(t)) return new f(t);
                throw Error("illegal buffer")
            },
            a = function() {
                return i.Buffer ? function(t) {
                    return (f.create = function(t) {
                        return i.Buffer.isBuffer(t) ? new n(t) : l(t)
                    })(t)
                } : l
            };

        function c() {
            var t = new o(0, 0),
                r = 0;
            if (!(this.len - this.pos > 4)) {
                for (; r < 3; ++r) {
                    if (this.pos >= this.len) throw u(this);
                    if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * r) >>> 0, this.buf[this.pos++] < 128) return t
                }
                return t.lo = (t.lo | (127 & this.buf[this.pos++]) << 7 * r) >>> 0, t
            }
            for (; r < 4; ++r)
                if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 7 * r) >>> 0, this.buf[this.pos++] < 128) return t;
            if (t.lo = (t.lo | (127 & this.buf[this.pos]) << 28) >>> 0, t.hi = (t.hi | (127 & this.buf[this.pos]) >> 4) >>> 0, this.buf[this.pos++] < 128) return t;
            if (r = 0, this.len - this.pos > 4) {
                for (; r < 5; ++r)
                    if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * r + 3) >>> 0, this.buf[this.pos++] < 128) return t
            } else
                for (; r < 5; ++r) {
                    if (this.pos >= this.len) throw u(this);
                    if (t.hi = (t.hi | (127 & this.buf[this.pos]) << 7 * r + 3) >>> 0, this.buf[this.pos++] < 128) return t
                }
            throw Error("invalid varint encoding")
        }

        function p(t, r) {
            return (t[r - 4] | t[r - 3] << 8 | t[r - 2] << 16 | t[r - 1] << 24) >>> 0
        }

        function y() {
            if (this.pos + 8 > this.len) throw u(this, 8);
            return new o(p(this.buf, this.pos += 4), p(this.buf, this.pos += 4))
        }
        f.create = a(), f.prototype._slice = i.Array.prototype.subarray || i.Array.prototype.slice, f.prototype.uint32 = (h = 4294967295, function() {
            if (h = (127 & this.buf[this.pos]) >>> 0, this.buf[this.pos++] < 128) return h;
            if (h = (h | (127 & this.buf[this.pos]) << 7) >>> 0, this.buf[this.pos++] < 128) return h;
            if (h = (h | (127 & this.buf[this.pos]) << 14) >>> 0, this.buf[this.pos++] < 128) return h;
            if (h = (h | (127 & this.buf[this.pos]) << 21) >>> 0, this.buf[this.pos++] < 128) return h;
            if (h = (h | (15 & this.buf[this.pos]) << 28) >>> 0, this.buf[this.pos++] < 128) return h;
            if ((this.pos += 5) > this.len) throw this.pos = this.len, u(this, 10);
            return h
        }), f.prototype.int32 = function() {
            return 0 | this.uint32()
        }, f.prototype.sint32 = function() {
            var t = this.uint32();
            return t >>> 1 ^ -(1 & t) | 0
        }, f.prototype.bool = function() {
            return 0 !== this.uint32()
        }, f.prototype.fixed32 = function() {
            if (this.pos + 4 > this.len) throw u(this, 4);
            return p(this.buf, this.pos += 4)
        }, f.prototype.sfixed32 = function() {
            if (this.pos + 4 > this.len) throw u(this, 4);
            return 0 | p(this.buf, this.pos += 4)
        }, f.prototype.float = function() {
            if (this.pos + 4 > this.len) throw u(this, 4);
            var t = i.float.readFloatLE(this.buf, this.pos);
            return this.pos += 4, t
        }, f.prototype.double = function() {
            if (this.pos + 8 > this.len) throw u(this, 4);
            var t = i.float.readDoubleLE(this.buf, this.pos);
            return this.pos += 8, t
        }, f.prototype.bytes = function() {
            var t = this.uint32(),
                r = this.pos,
                e = this.pos + t;
            if (e > this.len) throw u(this, t);
            return this.pos += t, Array.isArray(this.buf) ? this.buf.slice(r, e) : r === e ? new this.buf.constructor(0) : this._slice.call(this.buf, r, e)
        }, f.prototype.string = function() {
            var t = this.bytes();
            return s.read(t, 0, t.length)
        }, f.prototype.skip = function(t) {
            if ("number" == typeof t) {
                if (this.pos + t > this.len) throw u(this, t);
                this.pos += t
            } else
                do {
                    if (this.pos >= this.len) throw u(this)
                } while (128 & this.buf[this.pos++]);
            return this
        }, f.prototype.skipType = function(t) {
            switch (t) {
                case 0:
                    this.skip();
                    break;
                case 1:
                    this.skip(8);
                    break;
                case 2:
                    this.skip(this.uint32());
                    break;
                case 3:
                    for (; 4 != (t = 7 & this.uint32());) this.skipType(t);
                    break;
                case 5:
                    this.skip(4);
                    break;
                default:
                    throw Error("invalid wire type " + t + " at offset " + this.pos)
            }
            return this
        }, f._configure = function(t) {
            n = t, f.create = a(), n._configure();
            var r = i.Long ? "toLong" : "toNumber";
            i.merge(f.prototype, {
                int64: function() {
                    return c.call(this)[r](!1)
                },
                uint64: function() {
                    return c.call(this)[r](!0)
                },
                sint64: function() {
                    return c.call(this).zzDecode()[r](!1)
                },
                fixed64: function() {
                    return y.call(this)[r](!0)
                },
                sfixed64: function() {
                    return y.call(this)[r](!1)
                }
            })
        }
    }, function(t, r, e) {
        "use strict";
        t.exports = o;
        var n = e(14);
        (o.prototype = Object.create(n.prototype)).constructor = o;
        var i = e(3);

        function o(t) {
            n.call(this, t)
        }
        o._configure = function() {
            i.Buffer && (o.prototype._slice = i.Buffer.prototype.slice)
        }, o.prototype.string = function() {
            var t = this.uint32();
            return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + t, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + t, this.len))
        }, o._configure()
    }, function(t, r, e) {
        "use strict";
        r.Service = e(17)
    }, function(t, r, e) {
        "use strict";
        t.exports = i;
        var n = e(3);

        function i(t, r, e) {
            if ("function" != typeof t) throw TypeError("rpcImpl must be a function");
            n.EventEmitter.call(this), this.rpcImpl = t, this.requestDelimited = Boolean(r), this.responseDelimited = Boolean(e)
        }(i.prototype = Object.create(n.EventEmitter.prototype)).constructor = i, i.prototype.rpcCall = function t(r, e, i, o, s) {
            if (!o) throw TypeError("request must be specified");
            var u = this;
            if (!s) return n.asPromise(t, u, r, e, i, o);
            if (u.rpcImpl) try {
                return u.rpcImpl(r, e[u.requestDelimited ? "encodeDelimited" : "encode"](o).finish(), (function(t, e) {
                    if (t) return u.emit("error", t, r), s(t);
                    if (null !== e) {
                        if (!(e instanceof i)) try {
                            e = i[u.responseDelimited ? "decodeDelimited" : "decode"](e)
                        } catch (t) {
                            return u.emit("error", t, r), s(t)
                        }
                        return u.emit("data", e, r), s(null, e)
                    }
                    u.end(!0)
                }))
            } catch (t) {
                return u.emit("error", t, r), void setTimeout((function() {
                    s(t)
                }), 0)
            } else setTimeout((function() {
                s(Error("already ended"))
            }), 0)
        }, i.prototype.end = function(t) {
            return this.rpcImpl && (t || this.rpcImpl(null, null, null), this.rpcImpl = null, this.emit("end").off()), this
        }
    }, function(t, r, e) {
        "use strict";
        t.exports = {}
    }])
}));
//# sourceMappingURL=protobufjs.min.js-vflFWUXqQ.map