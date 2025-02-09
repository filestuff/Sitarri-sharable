(function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t(require("react")) : "function" == typeof define && define.amd ? define("create-react-class", ["react"], t) : "object" == typeof exports ? exports.createReactClass = t(require("react")) : e.createReactClass = t(e.React)
})(this, (function(e) {
    return (function(e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
        }
        return n.m = e, n.c = t, n.i = function(e) {
            return e
        }, n.d = function(e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 2)
    })([function(e, t, n) {
        "use strict";
        var r, o = n(7),
            i = n(4),
            a = n(5),
            c = n(6);
        r = {
            prop: "prop",
            context: "context",
            childContext: "child context"
        }, e.exports = function(e, t, n) {
            var s = [],
                u = {
                    mixins: "DEFINE_MANY",
                    statics: "DEFINE_MANY",
                    propTypes: "DEFINE_MANY",
                    contextTypes: "DEFINE_MANY",
                    childContextTypes: "DEFINE_MANY",
                    getDefaultProps: "DEFINE_MANY_MERGED",
                    getInitialState: "DEFINE_MANY_MERGED",
                    getChildContext: "DEFINE_MANY_MERGED",
                    render: "DEFINE_ONCE",
                    componentWillMount: "DEFINE_MANY",
                    componentDidMount: "DEFINE_MANY",
                    componentWillReceiveProps: "DEFINE_MANY",
                    shouldComponentUpdate: "DEFINE_ONCE",
                    componentWillUpdate: "DEFINE_MANY",
                    componentDidUpdate: "DEFINE_MANY",
                    componentWillUnmount: "DEFINE_MANY",
                    UNSAFE_componentWillMount: "DEFINE_MANY",
                    UNSAFE_componentWillReceiveProps: "DEFINE_MANY",
                    UNSAFE_componentWillUpdate: "DEFINE_MANY",
                    updateComponent: "OVERRIDE_BASE"
                },
                l = {
                    getDerivedStateFromProps: "DEFINE_MANY_MERGED"
                },
                p = {
                    displayName: function(e, t) {
                        e.displayName = t
                    },
                    mixins: function(e, t) {
                        if (t)
                            for (var n = 0; n < t.length; n++) y(e, t[n])
                    },
                    childContextTypes: function(e, t) {
                        f(e, t, "childContext"), e.childContextTypes = o({}, e.childContextTypes, t)
                    },
                    contextTypes: function(e, t) {
                        f(e, t, "context"), e.contextTypes = o({}, e.contextTypes, t)
                    },
                    getDefaultProps: function(e, t) {
                        e.getDefaultProps ? e.getDefaultProps = h(e.getDefaultProps, t) : e.getDefaultProps = t
                    },
                    propTypes: function(e, t) {
                        f(e, t, "prop"), e.propTypes = o({}, e.propTypes, t)
                    },
                    statics: function(e, t) {
                        (function(e, t) {
                            if (!t) return;
                            for (var n in t) {
                                var r = t[n];
                                if (t.hasOwnProperty(n)) {
                                    if (a(!(n in p), 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', n), n in e) {
                                        var o = l.hasOwnProperty(n) ? l[n] : null;
                                        return a("DEFINE_MANY_MERGED" === o, "ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", n), void(e[n] = h(e[n], r))
                                    }
                                    e[n] = r
                                }
                            }
                        })(e, t)
                    },
                    autobind: function() {}
                };

            function f(e, t, n) {
                for (var o in t) t.hasOwnProperty(o) && c("function" == typeof t[o], "%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.", e.displayName || "ReactClass", r[n], o)
            }

            function d(e, t) {
                var n = u.hasOwnProperty(t) ? u[t] : null;
                w.hasOwnProperty(t) && a("OVERRIDE_BASE" === n, "ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.", t), e && a("DEFINE_MANY" === n || "DEFINE_MANY_MERGED" === n, "ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.", t)
            }

            function y(e, n) {
                if (n) {
                    a("function" != typeof n, "ReactClass: You're attempting to use a component class or function as a mixin. Instead, just use a regular object."), a(!t(n), "ReactClass: You're attempting to use a component as a mixin. Instead, just use a regular object.");
                    var r = e.prototype,
                        o = r.__reactAutoBindPairs;
                    for (var i in n.hasOwnProperty("mixins") && p.mixins(e, n.mixins), n)
                        if (n.hasOwnProperty(i) && "mixins" !== i) {
                            var s = n[i],
                                l = r.hasOwnProperty(i);
                            if (d(l, i), p.hasOwnProperty(i)) p[i](e, s);
                            else {
                                var f = u.hasOwnProperty(i);
                                if ("function" == typeof s && !f && !l && !1 !== n.autobind) o.push(i, s), r[i] = s;
                                else if (l) {
                                    var y = u[i];
                                    a(f && ("DEFINE_MANY_MERGED" === y || "DEFINE_MANY" === y), "ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.", y, i), "DEFINE_MANY_MERGED" === y ? r[i] = h(r[i], s) : "DEFINE_MANY" === y && (r[i] = b(r[i], s))
                                } else r[i] = s, "function" == typeof s && n.displayName && (r[i].displayName = n.displayName + "_" + i)
                            }
                        }
                } else {
                    var m = typeof n;
                    c("object" === m && null !== n, "%s: You're attempting to include a mixin that is either null or not an object. Check the mixins included by the component, as well as any mixins they include themselves. Expected object but got %s.", e.displayName || "ReactClass", null === n ? null : m)
                }
            }

            function m(e, t) {
                for (var n in a(e && t && "object" == typeof e && "object" == typeof t, "mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects."), t) t.hasOwnProperty(n) && (a(void 0 === e[n], "mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.", n), e[n] = t[n]);
                return e
            }

            function h(e, t) {
                return function() {
                    var n = e.apply(this, arguments),
                        r = t.apply(this, arguments);
                    if (null == n) return r;
                    if (null == r) return n;
                    var o = {};
                    return m(o, n), m(o, r), o
                }
            }

            function b(e, t) {
                return function() {
                    e.apply(this, arguments), t.apply(this, arguments)
                }
            }

            function v(e, t) {
                var n = t.bind(e);
                n.__reactBoundContext = e, n.__reactBoundMethod = t, n.__reactBoundArguments = null;
                var r = e.constructor.displayName,
                    o = n.bind;
                return n.bind = function(i) {
                    for (var a = arguments.length, s = Array(a > 1 ? a - 1 : 0), u = 1; u < a; u++) s[u - 1] = arguments[u];
                    if (i !== e && null !== i) c(!1, "bind(): React component methods may only be bound to the component instance. See %s", r);
                    else if (!s.length) return c(!1, "bind(): You are binding a component method to the component. React does this for you automatically in a high-performance way, so you can safely remove this call. See %s", r), n;
                    var l = o.apply(n, arguments);
                    return l.__reactBoundContext = e, l.__reactBoundMethod = t, l.__reactBoundArguments = s, l
                }, n
            }
            var g = {
                    componentDidMount: function() {
                        this.__isMounted = !0
                    }
                },
                E = {
                    componentWillUnmount: function() {
                        this.__isMounted = !1
                    }
                },
                w = {
                    replaceState: function(e, t) {
                        this.updater.enqueueReplaceState(this, e, t)
                    },
                    isMounted: function() {
                        return c(this.__didWarnIsMounted, "%s: isMounted is deprecated. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.", this.constructor && this.constructor.displayName || this.name || "Component"), this.__didWarnIsMounted = !0, !!this.__isMounted
                    }
                },
                x = function() {};
            return o(x.prototype, e.prototype, w),
                function(e) {
                    var t = function(e, r, o) {
                        c(this instanceof t, "Something is calling a React component directly. Use a factory or JSX instead. See: https://fb.me/react-legacyfactory"), this.__reactAutoBindPairs.length && (function(e) {
                            for (var t = e.__reactAutoBindPairs, n = 0; n < t.length; n += 2) {
                                var r = t[n],
                                    o = t[n + 1];
                                e[r] = v(e, o)
                            }
                        })(this), this.props = e, this.context = r, this.refs = i, this.updater = o || n, this.state = null;
                        var s = this.getInitialState ? this.getInitialState() : null;
                        void 0 === s && this.getInitialState._isMockFunction && (s = null), a("object" == typeof s && !Array.isArray(s), "%s.getInitialState(): must return an object or null", t.displayName || "ReactCompositeComponent"), this.state = s
                    };
                    for (var r in t.prototype = new x, t.prototype.constructor = t, t.prototype.__reactAutoBindPairs = [], s.forEach(y.bind(null, t)), y(t, g), y(t, e), y(t, E), t.getDefaultProps && (t.defaultProps = t.getDefaultProps()), t.getDefaultProps && (t.getDefaultProps.isReactClassApproved = {}), t.prototype.getInitialState && (t.prototype.getInitialState.isReactClassApproved = {}), a(t.prototype.render, "createClass(...): Class specification must implement a `render` method."), c(!t.prototype.componentShouldUpdate, "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", e.displayName || "A component"), c(!t.prototype.componentWillRecieveProps, "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", e.displayName || "A component"), c(!t.prototype.UNSAFE_componentWillRecieveProps, "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", e.displayName || "A component"), u) t.prototype[r] || (t.prototype[r] = null);
                    return t
                }
        }
    }, function(t, n) {
        t.exports = e
    }, function(e, t, n) {
        "use strict";
        var r = n(1),
            o = n(0);
        if (void 0 === r) throw Error("create-react-class could not find the React object. If you are using script tags, make sure that React is being loaded before create-react-class.");
        var i = (new r.Component).updater;
        e.exports = o(r.Component, r.isValidElement, i)
    }, function(e, t, n) {
        "use strict";

        function r(e) {
            return function() {
                return e
            }
        }
        var o = function() {};
        o.thatReturns = r, o.thatReturnsFalse = r(!1), o.thatReturnsTrue = r(!0), o.thatReturnsNull = r(null), o.thatReturnsThis = function() {
            return this
        }, o.thatReturnsArgument = function(e) {
            return e
        }, e.exports = o
    }, function(e, t, n) {
        "use strict";
        var r = {};
        Object.freeze(r), e.exports = r
    }, function(e, t, n) {
        "use strict";
        var r = function(e) {};
        r = function(e) {
            if (void 0 === e) throw new Error("invariant requires an error message argument")
        }, e.exports = function(e, t, n, o, i, a, c, s) {
            if (r(t), !e) {
                var u;
                if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var l = [n, o, i, a, c, s],
                        p = 0;
                    (u = new Error(t.replace(/%s/g, (function() {
                        return l[p++]
                    })))).name = "Invariant Violation"
                }
                throw u.framesToPop = 1, u
            }
        }
    }, function(e, t, n) {
        "use strict";
        var r, o = n(3);
        r = function(e) {
            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
            var o = 0,
                i = "Warning: " + e.replace(/%s/g, (function() {
                    return n[o++]
                }));
            "undefined" != typeof console && console.error(i);
            try {
                throw new Error(i)
            } catch (e) {}
        }, o = function(e, t) {
            if (void 0 === t) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
            if (0 !== t.indexOf("Failed Composite propType: ") && !e) {
                for (var n = arguments.length, o = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) o[i - 2] = arguments[i];
                r.apply(void 0, [t].concat(o))
            }
        }, e.exports = o
    }, function(e, t, n) {
        "use strict";
        var r = Object.getOwnPropertySymbols,
            o = Object.prototype.hasOwnProperty,
            i = Object.prototype.propertyIsEnumerable;

        function a(e) {
            if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(e)
        }
        e.exports = (function() {
            try {
                if (!Object.assign) return !1;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
                        return t[e]
                    })).join("")) return !1;
                var r = {};
                return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                    r[e] = e
                })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
            } catch (e) {
                return !1
            }
        })() ? Object.assign : function(e, t) {
            for (var n, c, s = a(e), u = 1; u < arguments.length; u++) {
                for (var l in n = Object(arguments[u])) o.call(n, l) && (s[l] = n[l]);
                if (r) {
                    c = r(n);
                    for (var p = 0; p < c.length; p++) i.call(n, c[p]) && (s[c[p]] = n[c[p]])
                }
            }
            return s
        }
    }])
})), (function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define("prop-types", [], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).PropTypes = e()
    }
})((function() {
    return (function e(t, n, r) {
        function o(a, c) {
            if (!n[a]) {
                if (!t[a]) {
                    var s = "function" == typeof require && require;
                    if (!c && s) return s(a, !0);
                    if (i) return i(a, !0);
                    var u = new Error("Cannot find module '" + a + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var l = n[a] = {
                    exports: {}
                };
                t[a][0].call(l.exports, (function(e) {
                    var n = t[a][1][e];
                    return o(n || e)
                }), l, l.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
        return o
    })({
        1: [function(e, t, n) {
            "use strict";
            var r = function() {},
                o = e("./lib/ReactPropTypesSecret"),
                i = {},
                a = Function.call.bind(Object.prototype.hasOwnProperty);

            function c(e, t, n, c, s) {
                for (var u in e)
                    if (a(e, u)) {
                        var l;
                        try {
                            if ("function" != typeof e[u]) {
                                var p = Error((c || "React class") + ": " + n + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[u] + "`.");
                                throw p.name = "Invariant Violation", p
                            }
                            l = e[u](t, u, c, n, null, o)
                        } catch (e) {
                            l = e
                        }
                        if (!l || l instanceof Error || r((c || "React class") + ": type specification of " + n + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof l + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), l instanceof Error && !(l.message in i)) {
                            i[l.message] = !0;
                            var f = s ? s() : "";
                            r("Failed " + n + " type: " + l.message + (null != f ? f : ""))
                        }
                    }
            }
            r = function(e) {
                var t = "Warning: " + e;
                "undefined" != typeof console && console.error(t);
                try {
                    throw new Error(t)
                } catch (e) {}
            }, c.resetWarningCache = function() {
                i = {}
            }, t.exports = c
        }, {
            "./lib/ReactPropTypesSecret": 5
        }],
        2: [function(e, t, n) {
            "use strict";
            var r = e("./lib/ReactPropTypesSecret");

            function o() {}

            function i() {}
            i.resetWarningCache = o, t.exports = function() {
                function e(e, t, n, o, i, a) {
                    if (a !== r) {
                        var c = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                        throw c.name = "Invariant Violation", c
                    }
                }

                function t() {
                    return e
                }
                e.isRequired = e;
                var n = {
                    array: e,
                    bool: e,
                    func: e,
                    number: e,
                    object: e,
                    string: e,
                    symbol: e,
                    any: e,
                    arrayOf: t,
                    element: e,
                    elementType: e,
                    instanceOf: t,
                    node: e,
                    objectOf: t,
                    oneOf: t,
                    oneOfType: t,
                    shape: t,
                    exact: t,
                    checkPropTypes: i,
                    resetWarningCache: o
                };
                return n.PropTypes = n, n
            }
        }, {
            "./lib/ReactPropTypesSecret": 5
        }],
        3: [function(e, t, n) {
            "use strict";
            var r = e("react-is"),
                o = e("object-assign"),
                i = e("./lib/ReactPropTypesSecret"),
                a = e("./checkPropTypes"),
                c = Function.call.bind(Object.prototype.hasOwnProperty),
                s = function() {};

            function u() {
                return null
            }
            s = function(e) {
                var t = "Warning: " + e;
                "undefined" != typeof console && console.error(t);
                try {
                    throw new Error(t)
                } catch (e) {}
            }, t.exports = function(e, t) {
                var n = "function" == typeof Symbol && Symbol.iterator;
                var l = {
                    array: y("array"),
                    bool: y("boolean"),
                    func: y("function"),
                    number: y("number"),
                    object: y("object"),
                    string: y("string"),
                    symbol: y("symbol"),
                    any: d(u),
                    arrayOf: function(e) {
                        return d((function(t, n, r, o, a) {
                            if ("function" != typeof e) return new f("Property `" + a + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");
                            var c = t[n];
                            if (!Array.isArray(c)) return new f("Invalid " + o + " `" + a + "` of type `" + h(c) + "` supplied to `" + r + "`, expected an array.");
                            for (var s = 0; s < c.length; s++) {
                                var u = e(c, s, r, o, a + "[" + s + "]", i);
                                if (u instanceof Error) return u
                            }
                            return null
                        }))
                    },
                    element: d((function(t, n, r, o, i) {
                        var a = t[n];
                        return e(a) ? null : new f("Invalid " + o + " `" + i + "` of type `" + h(a) + "` supplied to `" + r + "`, expected a single ReactElement.")
                    })),
                    elementType: d((function(e, t, n, o, i) {
                        var a = e[t];
                        return r.isValidElementType(a) ? null : new f("Invalid " + o + " `" + i + "` of type `" + h(a) + "` supplied to `" + n + "`, expected a single ReactElement type.")
                    })),
                    instanceOf: function(e) {
                        return d((function(t, n, r, o, i) {
                            if (!(t[n] instanceof e)) {
                                var a = e.name || "<<anonymous>>";
                                return new f("Invalid " + o + " `" + i + "` of type `" + (function(e) {
                                    if (!e.constructor || !e.constructor.name) return "<<anonymous>>";
                                    return e.constructor.name
                                })(t[n]) + "` supplied to `" + r + "`, expected instance of `" + a + "`.")
                            }
                            return null
                        }))
                    },
                    node: d((function(e, t, n, r, o) {
                        return m(e[t]) ? null : new f("Invalid " + r + " `" + o + "` supplied to `" + n + "`, expected a ReactNode.")
                    })),
                    objectOf: function(e) {
                        return d((function(t, n, r, o, a) {
                            if ("function" != typeof e) return new f("Property `" + a + "` of component `" + r + "` has invalid PropType notation inside objectOf.");
                            var s = t[n],
                                u = h(s);
                            if ("object" !== u) return new f("Invalid " + o + " `" + a + "` of type `" + u + "` supplied to `" + r + "`, expected an object.");
                            for (var l in s)
                                if (c(s, l)) {
                                    var p = e(s, l, r, o, a + "." + l, i);
                                    if (p instanceof Error) return p
                                }
                            return null
                        }))
                    },
                    oneOf: function(e) {
                        if (!Array.isArray(e)) return arguments.length > 1 ? s("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).") : s("Invalid argument supplied to oneOf, expected an array."), u;

                        function t(t, n, r, o, i) {
                            for (var a = t[n], c = 0; c < e.length; c++)
                                if (p(a, e[c])) return null;
                            var s = JSON.stringify(e, (function(e, t) {
                                return "symbol" === b(t) ? String(t) : t
                            }));
                            return new f("Invalid " + o + " `" + i + "` of value `" + String(a) + "` supplied to `" + r + "`, expected one of " + s + ".")
                        }
                        return d(t)
                    },
                    oneOfType: function(e) {
                        if (!Array.isArray(e)) return s("Invalid argument supplied to oneOfType, expected an instance of array."), u;
                        for (var t = 0; t < e.length; t++) {
                            var n = e[t];
                            if ("function" != typeof n) return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + v(n) + " at index " + t + "."), u
                        }
                        return d((function(t, n, r, o, a) {
                            for (var c = 0; c < e.length; c++) {
                                if (null == (0, e[c])(t, n, r, o, a, i)) return null
                            }
                            return new f("Invalid " + o + " `" + a + "` supplied to `" + r + "`.")
                        }))
                    },
                    shape: function(e) {
                        return d((function(t, n, r, o, a) {
                            var c = t[n],
                                s = h(c);
                            if ("object" !== s) return new f("Invalid " + o + " `" + a + "` of type `" + s + "` supplied to `" + r + "`, expected `object`.");
                            for (var u in e) {
                                var l = e[u];
                                if (l) {
                                    var p = l(c, u, r, o, a + "." + u, i);
                                    if (p) return p
                                }
                            }
                            return null
                        }))
                    },
                    exact: function(e) {
                        return d((function(t, n, r, a, c) {
                            var s = t[n],
                                u = h(s);
                            if ("object" !== u) return new f("Invalid " + a + " `" + c + "` of type `" + u + "` supplied to `" + r + "`, expected `object`.");
                            var l = o({}, t[n], e);
                            for (var p in l) {
                                var d = e[p];
                                if (!d) return new f("Invalid " + a + " `" + c + "` key `" + p + "` supplied to `" + r + "`.\nBad object: " + JSON.stringify(t[n], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(e), null, "  "));
                                var y = d(s, p, r, a, c + "." + p, i);
                                if (y) return y
                            }
                            return null
                        }))
                    }
                };

                function p(e, t) {
                    return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
                }

                function f(e) {
                    this.message = e, this.stack = ""
                }

                function d(e) {
                    var n = {},
                        r = 0;

                    function o(o, a, c, u, l, p, d) {
                        if (u = u || "<<anonymous>>", p = p || c, d !== i) {
                            if (t) {
                                var y = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                                throw y.name = "Invariant Violation", y
                            }
                            if ("undefined" != typeof console) {
                                var m = u + ":" + c;
                                !n[m] && r < 3 && (s("You are manually calling a React.PropTypes validation function for the `" + p + "` prop on `" + u + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), n[m] = !0, r++)
                            }
                        }
                        return null == a[c] ? o ? null === a[c] ? new f("The " + l + " `" + p + "` is marked as required in `" + u + "`, but its value is `null`.") : new f("The " + l + " `" + p + "` is marked as required in `" + u + "`, but its value is `undefined`.") : null : e(a, c, u, l, p)
                    }
                    var a = o.bind(null, !1);
                    return a.isRequired = o.bind(null, !0), a
                }

                function y(e) {
                    return d((function(t, n, r, o, i, a) {
                        var c = t[n];
                        return h(c) !== e ? new f("Invalid " + o + " `" + i + "` of type `" + b(c) + "` supplied to `" + r + "`, expected `" + e + "`.") : null
                    }))
                }

                function m(t) {
                    switch (typeof t) {
                        case "number":
                        case "string":
                        case "undefined":
                            return !0;
                        case "boolean":
                            return !t;
                        case "object":
                            if (Array.isArray(t)) return t.every(m);
                            if (null === t || e(t)) return !0;
                            var r = (function(e) {
                                var t = e && (n && e[n] || e["@@iterator"]);
                                if ("function" == typeof t) return t
                            })(t);
                            if (!r) return !1;
                            var o, i = r.call(t);
                            if (r !== t.entries) {
                                for (; !(o = i.next()).done;)
                                    if (!m(o.value)) return !1
                            } else
                                for (; !(o = i.next()).done;) {
                                    var a = o.value;
                                    if (a && !m(a[1])) return !1
                                }
                            return !0;
                        default:
                            return !1
                    }
                }

                function h(e) {
                    var t = typeof e;
                    return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : (function(e, t) {
                        return "symbol" === e || !!t && ("Symbol" === t["@@toStringTag"] || "function" == typeof Symbol && t instanceof Symbol)
                    })(t, e) ? "symbol" : t
                }

                function b(e) {
                    if (null == e) return "" + e;
                    var t = h(e);
                    if ("object" === t) {
                        if (e instanceof Date) return "date";
                        if (e instanceof RegExp) return "regexp"
                    }
                    return t
                }

                function v(e) {
                    var t = b(e);
                    switch (t) {
                        case "array":
                        case "object":
                            return "an " + t;
                        case "boolean":
                        case "date":
                        case "regexp":
                            return "a " + t;
                        default:
                            return t
                    }
                }
                return f.prototype = Error.prototype, l.checkPropTypes = a, l.resetWarningCache = a.resetWarningCache, l.PropTypes = l, l
            }
        }, {
            "./checkPropTypes": 1,
            "./lib/ReactPropTypesSecret": 5,
            "object-assign": 6,
            "react-is": 10
        }],
        4: [function(e, t, n) {
            var r = e("react-is");
            t.exports = e("./factoryWithTypeCheckers")(r.isElement, !0)
        }, {
            "./factoryWithThrowingShims": 2,
            "./factoryWithTypeCheckers": 3,
            "react-is": 10
        }],
        5: [function(e, t, n) {
            "use strict";
            t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
        }, {}],
        6: [function(e, t, n) {
            "use strict";
            var r = Object.getOwnPropertySymbols,
                o = Object.prototype.hasOwnProperty,
                i = Object.prototype.propertyIsEnumerable;

            function a(e) {
                if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(e)
            }
            t.exports = (function() {
                try {
                    if (!Object.assign) return !1;
                    var e = new String("abc");
                    if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                    for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
                    if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
                            return t[e]
                        })).join("")) return !1;
                    var r = {};
                    return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                        r[e] = e
                    })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("")
                } catch (e) {
                    return !1
                }
            })() ? Object.assign : function(e, t) {
                for (var n, c, s = a(e), u = 1; u < arguments.length; u++) {
                    for (var l in n = Object(arguments[u])) o.call(n, l) && (s[l] = n[l]);
                    if (r) {
                        c = r(n);
                        for (var p = 0; p < c.length; p++) i.call(n, c[p]) && (s[c[p]] = n[c[p]])
                    }
                }
                return s
            }
        }, {}],
        7: [function(e, t, n) {
            var r, o, i = t.exports = {};

            function a() {
                throw new Error("setTimeout has not been defined")
            }

            function c() {
                throw new Error("clearTimeout has not been defined")
            }

            function s(e) {
                if (r === setTimeout) return setTimeout(e, 0);
                if ((r === a || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
                try {
                    return r(e, 0)
                } catch (t) {
                    try {
                        return r.call(null, e, 0)
                    } catch (t) {
                        return r.call(this, e, 0)
                    }
                }
            }(function() {
                try {
                    r = "function" == typeof setTimeout ? setTimeout : a
                } catch (e) {
                    r = a
                }
                try {
                    o = "function" == typeof clearTimeout ? clearTimeout : c
                } catch (e) {
                    o = c
                }
            })();
            var u, l = [],
                p = !1,
                f = -1;

            function d() {
                p && u && (p = !1, u.length ? l = u.concat(l) : f = -1, l.length && y())
            }

            function y() {
                if (!p) {
                    var e = s(d);
                    p = !0;
                    for (var t = l.length; t;) {
                        for (u = l, l = []; ++f < t;) u && u[f].run();
                        f = -1, t = l.length
                    }
                    u = null, p = !1, (function(e) {
                        if (o === clearTimeout) return clearTimeout(e);
                        if ((o === c || !o) && clearTimeout) return o = clearTimeout, clearTimeout(e);
                        try {
                            o(e)
                        } catch (t) {
                            try {
                                return o.call(null, e)
                            } catch (t) {
                                return o.call(this, e)
                            }
                        }
                    })(e)
                }
            }

            function m(e, t) {
                this.fun = e, this.array = t
            }

            function h() {}
            i.nextTick = function(e) {
                var t = new Array(arguments.length - 1);
                if (arguments.length > 1)
                    for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                l.push(new m(e, t)), 1 !== l.length || p || s(y)
            }, m.prototype.run = function() {
                this.fun.apply(null, this.array)
            }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = h, i.addListener = h, i.once = h, i.off = h, i.removeListener = h, i.removeAllListeners = h, i.emit = h, i.prependListener = h, i.prependOnceListener = h, i.listeners = function(e) {
                return []
            }, i.binding = function(e) {
                throw new Error("process.binding is not supported")
            }, i.cwd = function() {
                return "/"
            }, i.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }, i.umask = function() {
                return 0
            }
        }, {}],
        8: [function(e, t, n) {
            (function(e) {
                "use strict";
                "production" !== e.env.NODE_ENV && (function() {
                    Object.defineProperty(n, "__esModule", {
                        value: !0
                    });
                    var e = "function" == typeof Symbol && Symbol.for,
                        t = e ? Symbol.for("react.element") : 60103,
                        r = e ? Symbol.for("react.portal") : 60106,
                        o = e ? Symbol.for("react.fragment") : 60107,
                        i = e ? Symbol.for("react.strict_mode") : 60108,
                        a = e ? Symbol.for("react.profiler") : 60114,
                        c = e ? Symbol.for("react.provider") : 60109,
                        s = e ? Symbol.for("react.context") : 60110,
                        u = e ? Symbol.for("react.async_mode") : 60111,
                        l = e ? Symbol.for("react.concurrent_mode") : 60111,
                        p = e ? Symbol.for("react.forward_ref") : 60112,
                        f = e ? Symbol.for("react.suspense") : 60113,
                        d = e ? Symbol.for("react.memo") : 60115,
                        y = e ? Symbol.for("react.lazy") : 60116;
                    var m = function(e) {
                            for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                            var o = 0,
                                i = "Warning: " + e.replace(/%s/g, (function() {
                                    return n[o++]
                                }));
                            "undefined" != typeof console && console.warn(i);
                            try {
                                throw new Error(i)
                            } catch (e) {}
                        },
                        h = function(e, t) {
                            if (void 0 === t) throw new Error("`lowPriorityWarning(condition, format, ...args)` requires a warning message argument");
                            if (!e) {
                                for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), o = 2; o < n; o++) r[o - 2] = arguments[o];
                                m.apply(void 0, [t].concat(r))
                            }
                        };

                    function b(e) {
                        if ("object" == typeof e && null !== e) {
                            var n = e.$$typeof;
                            switch (n) {
                                case t:
                                    var m = e.type;
                                    switch (m) {
                                        case u:
                                        case l:
                                        case o:
                                        case a:
                                        case i:
                                        case f:
                                            return m;
                                        default:
                                            var h = m && m.$$typeof;
                                            switch (h) {
                                                case s:
                                                case p:
                                                case c:
                                                    return h;
                                                default:
                                                    return n
                                            }
                                    }
                                case y:
                                case d:
                                case r:
                                    return n
                            }
                        }
                    }
                    var v = u,
                        g = l,
                        E = s,
                        w = c,
                        x = t,
                        _ = p,
                        O = o,
                        j = y,
                        P = d,
                        S = r,
                        N = a,
                        T = i,
                        R = f,
                        I = !1;

                    function A(e) {
                        return b(e) === l
                    }
                    n.typeOf = b, n.AsyncMode = v, n.ConcurrentMode = g, n.ContextConsumer = E, n.ContextProvider = w, n.Element = x, n.ForwardRef = _, n.Fragment = O, n.Lazy = j, n.Memo = P, n.Portal = S, n.Profiler = N, n.StrictMode = T, n.Suspense = R, n.isValidElementType = function(e) {
                        return "string" == typeof e || "function" == typeof e || e === o || e === l || e === a || e === i || e === f || "object" == typeof e && null !== e && (e.$$typeof === y || e.$$typeof === d || e.$$typeof === c || e.$$typeof === s || e.$$typeof === p)
                    }, n.isAsyncMode = function(e) {
                        return I || (I = !0, h(!1, "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), A(e) || b(e) === u
                    }, n.isConcurrentMode = A, n.isContextConsumer = function(e) {
                        return b(e) === s
                    }, n.isContextProvider = function(e) {
                        return b(e) === c
                    }, n.isElement = function(e) {
                        return "object" == typeof e && null !== e && e.$$typeof === t
                    }, n.isForwardRef = function(e) {
                        return b(e) === p
                    }, n.isFragment = function(e) {
                        return b(e) === o
                    }, n.isLazy = function(e) {
                        return b(e) === y
                    }, n.isMemo = function(e) {
                        return b(e) === d
                    }, n.isPortal = function(e) {
                        return b(e) === r
                    }, n.isProfiler = function(e) {
                        return b(e) === a
                    }, n.isStrictMode = function(e) {
                        return b(e) === i
                    }, n.isSuspense = function(e) {
                        return b(e) === f
                    }
                })()
            }).call(this, e("_process"))
        }, {
            _process: 7
        }],
        9: [function(e, t, n) {
            "use strict";
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var r = "function" == typeof Symbol && Symbol.for,
                o = r ? Symbol.for("react.element") : 60103,
                i = r ? Symbol.for("react.portal") : 60106,
                a = r ? Symbol.for("react.fragment") : 60107,
                c = r ? Symbol.for("react.strict_mode") : 60108,
                s = r ? Symbol.for("react.profiler") : 60114,
                u = r ? Symbol.for("react.provider") : 60109,
                l = r ? Symbol.for("react.context") : 60110,
                p = r ? Symbol.for("react.async_mode") : 60111,
                f = r ? Symbol.for("react.concurrent_mode") : 60111,
                d = r ? Symbol.for("react.forward_ref") : 60112,
                y = r ? Symbol.for("react.suspense") : 60113,
                m = r ? Symbol.for("react.memo") : 60115,
                h = r ? Symbol.for("react.lazy") : 60116;

            function b(e) {
                if ("object" == typeof e && null !== e) {
                    var t = e.$$typeof;
                    switch (t) {
                        case o:
                            switch (e = e.type) {
                                case p:
                                case f:
                                case a:
                                case s:
                                case c:
                                case y:
                                    return e;
                                default:
                                    switch (e = e && e.$$typeof) {
                                        case l:
                                        case d:
                                        case u:
                                            return e;
                                        default:
                                            return t
                                    }
                            }
                        case h:
                        case m:
                        case i:
                            return t
                    }
                }
            }

            function v(e) {
                return b(e) === f
            }
            n.typeOf = b, n.AsyncMode = p, n.ConcurrentMode = f, n.ContextConsumer = l, n.ContextProvider = u, n.Element = o, n.ForwardRef = d, n.Fragment = a, n.Lazy = h, n.Memo = m, n.Portal = i, n.Profiler = s, n.StrictMode = c, n.Suspense = y, n.isValidElementType = function(e) {
                return "string" == typeof e || "function" == typeof e || e === a || e === f || e === s || e === c || e === y || "object" == typeof e && null !== e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === u || e.$$typeof === l || e.$$typeof === d)
            }, n.isAsyncMode = function(e) {
                return v(e) || b(e) === p
            }, n.isConcurrentMode = v, n.isContextConsumer = function(e) {
                return b(e) === l
            }, n.isContextProvider = function(e) {
                return b(e) === u
            }, n.isElement = function(e) {
                return "object" == typeof e && null !== e && e.$$typeof === o
            }, n.isForwardRef = function(e) {
                return b(e) === d
            }, n.isFragment = function(e) {
                return b(e) === a
            }, n.isLazy = function(e) {
                return b(e) === h
            }, n.isMemo = function(e) {
                return b(e) === m
            }, n.isPortal = function(e) {
                return b(e) === i
            }, n.isProfiler = function(e) {
                return b(e) === s
            }, n.isStrictMode = function(e) {
                return b(e) === c
            }, n.isSuspense = function(e) {
                return b(e) === y
            }
        }, {}],
        10: [function(e, t, n) {
            (function(n) {
                "use strict";
                "production" === n.env.NODE_ENV ? t.exports = e("./cjs/react-is.production.min.js") : t.exports = e("./cjs/react-is.development.js")
            }).call(this, e("_process"))
        }, {
            "./cjs/react-is.development.js": 8,
            "./cjs/react-is.production.min.js": 9,
            _process: 7
        }]
    }, {}, [4])(4)
})), (function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e(require("react"));
    else if ("function" == typeof define && define.amd) define("react-dom-factories", ["react"], e);
    else {
        var t;
        if (void 0 === (t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).React) throw Error("React module should be required before ReactDOMFactories");
        t.ReactDOMFactories = e(t.React)
    }
})((function(e) {
    function t(t) {
        var n = e.createElement.bind(null, t);
        return n.type = t, n
    }
    return {
        a: t("a"),
        abbr: t("abbr"),
        address: t("address"),
        area: t("area"),
        article: t("article"),
        aside: t("aside"),
        audio: t("audio"),
        b: t("b"),
        base: t("base"),
        bdi: t("bdi"),
        bdo: t("bdo"),
        big: t("big"),
        blockquote: t("blockquote"),
        body: t("body"),
        br: t("br"),
        button: t("button"),
        canvas: t("canvas"),
        caption: t("caption"),
        cite: t("cite"),
        code: t("code"),
        col: t("col"),
        colgroup: t("colgroup"),
        data: t("data"),
        datalist: t("datalist"),
        dd: t("dd"),
        del: t("del"),
        details: t("details"),
        dfn: t("dfn"),
        dialog: t("dialog"),
        div: t("div"),
        dl: t("dl"),
        dt: t("dt"),
        em: t("em"),
        embed: t("embed"),
        fieldset: t("fieldset"),
        figcaption: t("figcaption"),
        figure: t("figure"),
        footer: t("footer"),
        form: t("form"),
        h1: t("h1"),
        h2: t("h2"),
        h3: t("h3"),
        h4: t("h4"),
        h5: t("h5"),
        h6: t("h6"),
        head: t("head"),
        header: t("header"),
        hgroup: t("hgroup"),
        hr: t("hr"),
        html: t("html"),
        i: t("i"),
        iframe: t("iframe"),
        img: t("img"),
        input: t("input"),
        ins: t("ins"),
        kbd: t("kbd"),
        keygen: t("keygen"),
        label: t("label"),
        legend: t("legend"),
        li: t("li"),
        link: t("link"),
        main: t("main"),
        map: t("map"),
        mark: t("mark"),
        menu: t("menu"),
        menuitem: t("menuitem"),
        meta: t("meta"),
        meter: t("meter"),
        nav: t("nav"),
        noscript: t("noscript"),
        object: t("object"),
        ol: t("ol"),
        optgroup: t("optgroup"),
        option: t("option"),
        output: t("output"),
        p: t("p"),
        param: t("param"),
        picture: t("picture"),
        pre: t("pre"),
        progress: t("progress"),
        q: t("q"),
        rp: t("rp"),
        rt: t("rt"),
        ruby: t("ruby"),
        s: t("s"),
        samp: t("samp"),
        script: t("script"),
        section: t("section"),
        select: t("select"),
        small: t("small"),
        source: t("source"),
        span: t("span"),
        strong: t("strong"),
        style: t("style"),
        sub: t("sub"),
        summary: t("summary"),
        sup: t("sup"),
        table: t("table"),
        tbody: t("tbody"),
        td: t("td"),
        textarea: t("textarea"),
        tfoot: t("tfoot"),
        th: t("th"),
        thead: t("thead"),
        time: t("time"),
        title: t("title"),
        tr: t("tr"),
        track: t("track"),
        u: t("u"),
        ul: t("ul"),
        var: t("var"),
        video: t("video"),
        wbr: t("wbr"),
        circle: t("circle"),
        clipPath: t("clipPath"),
        defs: t("defs"),
        ellipse: t("ellipse"),
        g: t("g"),
        image: t("image"),
        line: t("line"),
        linearGradient: t("linearGradient"),
        mask: t("mask"),
        path: t("path"),
        pattern: t("pattern"),
        polygon: t("polygon"),
        polyline: t("polyline"),
        radialGradient: t("radialGradient"),
        rect: t("rect"),
        stop: t("stop"),
        svg: t("svg"),
        text: t("text"),
        tspan: t("tspan")
    }
}));
//# sourceMappingURL=pkg-react-libs.min.js-vflQDaMNL.map