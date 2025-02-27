!(function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define("redux-prod", ["exports"], t) : t((e = e || self).Redux = {})
})(this, (function(e) {
    "use strict";
    var t = (function(e) {
            var t, r = ("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")()).Symbol;
            return "function" == typeof r ? r.observable ? t = r.observable : (t = r("observable"), r.observable = t) : t = "@@observable", t
        })(),
        r = function() {
            return Math.random().toString(36).substring(7).split("").join(".")
        },
        n = {
            INIT: "@@redux/INIT" + r(),
            REPLACE: "@@redux/REPLACE" + r(),
            PROBE_UNKNOWN_ACTION: function() {
                return "@@redux/PROBE_UNKNOWN_ACTION" + r()
            }
        };

    function o(e, t) {
        var r = t && t.type;
        return "Given " + (r && 'action "' + r + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
    }

    function i(e, t) {
        return function() {
            return t(e.apply(this, arguments))
        }
    }

    function s(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e
    }

    function a(e, t) {
        var r = Object.keys(e);
        return Object.getOwnPropertySymbols && r.push.apply(r, Object.getOwnPropertySymbols(e)), t && (r = r.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), r
    }

    function u(e) {
        for (var t = 1; arguments.length > t; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? a(r, !0).forEach((function(t) {
                s(e, t, r[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : a(r).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            }))
        }
        return e
    }

    function c() {
        for (var e = arguments.length, t = Array(e), r = 0; e > r; r++) t[r] = arguments[r];
        return 0 === t.length ? function(e) {
            return e
        } : 1 === t.length ? t[0] : t.reduce((function(e, t) {
            return function() {
                return e(t.apply(void 0, arguments))
            }
        }))
    }
    e.__DO_NOT_USE__ActionTypes = n, e.applyMiddleware = function() {
        for (var e = arguments.length, t = Array(e), r = 0; e > r; r++) t[r] = arguments[r];
        return function(e) {
            return function() {
                var r = e.apply(void 0, arguments),
                    n = function() {
                        throw Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")
                    },
                    o = {
                        getState: r.getState,
                        dispatch: function() {
                            return n.apply(void 0, arguments)
                        }
                    },
                    i = t.map((function(e) {
                        return e(o)
                    }));
                return u({}, r, {
                    dispatch: n = c.apply(void 0, i)(r.dispatch)
                })
            }
        }
    }, e.bindActionCreators = function(e, t) {
        if ("function" == typeof e) return i(e, t);
        if ("object" != typeof e || null === e) throw Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        var r = {};
        for (var n in e) {
            var o = e[n];
            "function" == typeof o && (r[n] = i(o, t))
        }
        return r
    }, e.combineReducers = function(e) {
        for (var t = Object.keys(e), r = {}, i = 0; t.length > i; i++) {
            var s = t[i];
            "function" == typeof e[s] && (r[s] = e[s])
        }
        var a, u = Object.keys(r);
        try {
            !(function(e) {
                Object.keys(e).forEach((function(t) {
                    var r = e[t];
                    if (void 0 === r(void 0, {
                            type: n.INIT
                        })) throw Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
                    if (void 0 === r(void 0, {
                            type: n.PROBE_UNKNOWN_ACTION()
                        })) throw Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + n.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')
                }))
            })(r)
        } catch (e) {
            a = e
        }
        return function(e, t) {
            if (void 0 === e && (e = {}), a) throw a;
            for (var n = !1, i = {}, s = 0; u.length > s; s++) {
                var c = u[s],
                    l = e[c],
                    p = (0, r[c])(l, t);
                if (void 0 === p) {
                    var f = o(c, t);
                    throw Error(f)
                }
                i[c] = p, n = n || p !== l
            }
            return n ? i : e
        }
    }, e.compose = c, e.createStore = function e(r, o, i) {
        var s;
        if ("function" == typeof o && "function" == typeof i || "function" == typeof i && "function" == typeof arguments[3]) throw Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
        if ("function" == typeof o && void 0 === i && (i = o, o = void 0), void 0 !== i) {
            if ("function" != typeof i) throw Error("Expected the enhancer to be a function.");
            return i(e)(r, o)
        }
        if ("function" != typeof r) throw Error("Expected the reducer to be a function.");
        var a = r,
            u = o,
            c = [],
            l = c,
            p = !1;

        function f() {
            l === c && (l = c.slice())
        }

        function d() {
            if (p) throw Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
            return u
        }

        function h(e) {
            if ("function" != typeof e) throw Error("Expected the listener to be a function.");
            if (p) throw Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
            var t = !0;
            return f(), l.push(e),
                function() {
                    if (t) {
                        if (p) throw Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                        t = !1, f();
                        var r = l.indexOf(e);
                        l.splice(r, 1)
                    }
                }
        }

        function m(e) {
            if (!(function(e) {
                    if ("object" != typeof e || null === e) return !1;
                    for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
                    return Object.getPrototypeOf(e) === t
                })(e)) throw Error("Actions must be plain objects. Use custom middleware for async actions.");
            if (void 0 === e.type) throw Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (p) throw Error("Reducers may not dispatch actions.");
            try {
                p = !0, u = a(u, e)
            } finally {
                p = !1
            }
            for (var t = c = l, r = 0; t.length > r; r++)(0, t[r])();
            return e
        }
        return m({
            type: n.INIT
        }), (s = {
            dispatch: m,
            subscribe: h,
            getState: d,
            replaceReducer: function(e) {
                if ("function" != typeof e) throw Error("Expected the nextReducer to be a function.");
                a = e, m({
                    type: n.REPLACE
                })
            }
        })[t] = function() {
            var e, r = h;
            return (e = {
                subscribe: function(e) {
                    if ("object" != typeof e || null === e) throw new TypeError("Expected the observer to be an object.");

                    function t() {
                        e.next && e.next(d())
                    }
                    return t(), {
                        unsubscribe: r(t)
                    }
                }
            })[t] = function() {
                return this
            }, e
        }, s
    }, Object.defineProperty(e, "__esModule", {
        value: !0
    })
})), (function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("react"), require("redux")) : "function" == typeof define && define.amd ? define("react-redux", ["exports", "react", "redux"], t) : t(e.ReactRedux = {}, e.React, e.Redux)
})(this, (function(e, t, r) {
    "use strict";
    var n = "default" in t ? t.default : t;

    function o(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }

    function i(e) {
        return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
    }

    function s(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }

    function a(e) {
        return function() {
            return e
        }
    }
    var u = function() {};
    u.thatReturns = a, u.thatReturnsFalse = a(!1), u.thatReturnsTrue = a(!0), u.thatReturnsNull = a(null), u.thatReturnsThis = function() {
        return this
    }, u.thatReturnsArgument = function(e) {
        return e
    };
    var c, l = u;
    c = function(e) {
        if (void 0 === e) throw new Error("invariant requires an error message argument")
    };
    var p = function(e, t, r, n, o, i, s, a) {
            if (c(t), !e) {
                var u;
                if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var l = [r, n, o, i, s, a],
                        p = 0;
                    (u = new Error(t.replace(/%s/g, (function() {
                        return l[p++]
                    })))).name = "Invariant Violation"
                }
                throw u.framesToPop = 1, u
            }
        },
        f = function(e) {
            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
            var o = 0,
                i = "Warning: " + e.replace(/%s/g, (function() {
                    return r[o++]
                }));
            "undefined" != typeof console && console.error(i);
            try {
                throw new Error(i)
            } catch (e) {}
        },
        d = function(e, t) {
            if (void 0 === t) throw new Error("`warning(condition, format, ...args)` requires a warning message argument");
            if (0 !== t.indexOf("Failed Composite propType: ") && !e) {
                for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) n[o - 2] = arguments[o];
                f.apply(void 0, [t].concat(n))
            }
        },
        h = Object.getOwnPropertySymbols,
        m = Object.prototype.hasOwnProperty,
        y = Object.prototype.propertyIsEnumerable;

    function _(e) {
        if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }
    var v = (function() {
            try {
                if (!Object.assign) return !1;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
                for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
                if ("0123456789" !== Object.getOwnPropertyNames(t).map((function(e) {
                        return t[e]
                    })).join("")) return !1;
                var n = {};
                return "abcdefghijklmnopqrst".split("").forEach((function(e) {
                    n[e] = e
                })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, n)).join("")
            } catch (e) {
                return !1
            }
        })() ? Object.assign : function(e, t) {
            for (var r, n, o = _(e), i = 1; i < arguments.length; i++) {
                for (var s in r = Object(arguments[i])) m.call(r, s) && (o[s] = r[s]);
                if (h) {
                    n = h(r);
                    for (var a = 0; a < n.length; a++) y.call(r, n[a]) && (o[n[a]] = r[n[a]])
                }
            }
            return o
        },
        E = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        b = p,
        g = d,
        O = {};
    var S = function(e, t, r, n, o) {
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var s;
                    try {
                        b("function" == typeof e[i], "%s: %s type `%s` is invalid; it must be a function, usually from the `prop-types` package, but received `%s`.", n || "React class", r, i, typeof e[i]), s = e[i](t, i, n, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")
                    } catch (e) {
                        s = e
                    }
                    if (g(!s || s instanceof Error, "%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", r, i, typeof s), s instanceof Error && !(s.message in O)) {
                        O[s.message] = !0;
                        var a = o ? o() : "";
                        g(!1, "Failed %s type: %s%s", r, s.message, null != a ? a : "")
                    }
                }
        },
        P = function(e, t) {
            var r = "function" == typeof Symbol && Symbol.iterator;
            var n = {
                array: a("array"),
                bool: a("boolean"),
                func: a("function"),
                number: a("number"),
                object: a("object"),
                string: a("string"),
                symbol: a("symbol"),
                any: s(l.thatReturnsNull),
                arrayOf: function(e) {
                    return s((function(t, r, n, o, s) {
                        if ("function" != typeof e) return new i("Property `" + s + "` of component `" + n + "` has invalid PropType notation inside arrayOf.");
                        var a = t[r];
                        if (!Array.isArray(a)) return new i("Invalid " + o + " `" + s + "` of type `" + c(a) + "` supplied to `" + n + "`, expected an array.");
                        for (var u = 0; u < a.length; u++) {
                            var l = e(a, u, n, o, s + "[" + u + "]", E);
                            if (l instanceof Error) return l
                        }
                        return null
                    }))
                },
                element: s((function(t, r, n, o, s) {
                    var a = t[r];
                    return e(a) ? null : new i("Invalid " + o + " `" + s + "` of type `" + c(a) + "` supplied to `" + n + "`, expected a single ReactElement.")
                })),
                instanceOf: function(e) {
                    return s((function(t, r, n, o, s) {
                        if (!(t[r] instanceof e)) {
                            var a = e.name || "<<anonymous>>";
                            return new i("Invalid " + o + " `" + s + "` of type `" + (function(e) {
                                if (!e.constructor || !e.constructor.name) return "<<anonymous>>";
                                return e.constructor.name
                            })(t[r]) + "` supplied to `" + n + "`, expected instance of `" + a + "`.")
                        }
                        return null
                    }))
                },
                node: s((function(e, t, r, n, o) {
                    return u(e[t]) ? null : new i("Invalid " + n + " `" + o + "` supplied to `" + r + "`, expected a ReactNode.")
                })),
                objectOf: function(e) {
                    return s((function(t, r, n, o, s) {
                        if ("function" != typeof e) return new i("Property `" + s + "` of component `" + n + "` has invalid PropType notation inside objectOf.");
                        var a = t[r],
                            u = c(a);
                        if ("object" !== u) return new i("Invalid " + o + " `" + s + "` of type `" + u + "` supplied to `" + n + "`, expected an object.");
                        for (var l in a)
                            if (a.hasOwnProperty(l)) {
                                var p = e(a, l, n, o, s + "." + l, E);
                                if (p instanceof Error) return p
                            }
                        return null
                    }))
                },
                oneOf: function(e) {
                    if (!Array.isArray(e)) return d(!1, "Invalid argument supplied to oneOf, expected an instance of array."), l.thatReturnsNull;
                    return s((function(t, r, n, s, a) {
                        for (var u = t[r], c = 0; c < e.length; c++)
                            if (o(u, e[c])) return null;
                        return new i("Invalid " + s + " `" + a + "` of value `" + u + "` supplied to `" + n + "`, expected one of " + JSON.stringify(e) + ".")
                    }))
                },
                oneOfType: function(e) {
                    if (!Array.isArray(e)) return d(!1, "Invalid argument supplied to oneOfType, expected an instance of array."), l.thatReturnsNull;
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        if ("function" != typeof r) return d(!1, "Invalid argument supplied to oneOfType. Expected an array of check functions, but received %s at index %s.", h(r), t), l.thatReturnsNull
                    }
                    return s((function(t, r, n, o, s) {
                        for (var a = 0; a < e.length; a++) {
                            if (null == (0, e[a])(t, r, n, o, s, E)) return null
                        }
                        return new i("Invalid " + o + " `" + s + "` supplied to `" + n + "`.")
                    }))
                },
                shape: function(e) {
                    return s((function(t, r, n, o, s) {
                        var a = t[r],
                            u = c(a);
                        if ("object" !== u) return new i("Invalid " + o + " `" + s + "` of type `" + u + "` supplied to `" + n + "`, expected `object`.");
                        for (var l in e) {
                            var p = e[l];
                            if (p) {
                                var f = p(a, l, n, o, s + "." + l, E);
                                if (f) return f
                            }
                        }
                        return null
                    }))
                },
                exact: function(e) {
                    return s((function(t, r, n, o, s) {
                        var a = t[r],
                            u = c(a);
                        if ("object" !== u) return new i("Invalid " + o + " `" + s + "` of type `" + u + "` supplied to `" + n + "`, expected `object`.");
                        var l = v({}, t[r], e);
                        for (var p in l) {
                            var f = e[p];
                            if (!f) return new i("Invalid " + o + " `" + s + "` key `" + p + "` supplied to `" + n + "`.\nBad object: " + JSON.stringify(t[r], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(e), null, "  "));
                            var d = f(a, p, n, o, s + "." + p, E);
                            if (d) return d
                        }
                        return null
                    }))
                }
            };

            function o(e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
            }

            function i(e) {
                this.message = e, this.stack = ""
            }

            function s(e) {
                var r = {},
                    n = 0;

                function o(o, s, a, u, c, l, f) {
                    if (u = u || "<<anonymous>>", l = l || a, f !== E)
                        if (t) p(!1, "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                        else if ("undefined" != typeof console) {
                        var h = u + ":" + a;
                        !r[h] && n < 3 && (d(!1, "You are manually calling a React.PropTypes validation function for the `%s` prop on `%s`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.", l, u), r[h] = !0, n++)
                    }
                    return null == s[a] ? o ? null === s[a] ? new i("The " + c + " `" + l + "` is marked as required in `" + u + "`, but its value is `null`.") : new i("The " + c + " `" + l + "` is marked as required in `" + u + "`, but its value is `undefined`.") : null : e(s, a, u, c, l)
                }
                var s = o.bind(null, !1);
                return s.isRequired = o.bind(null, !0), s
            }

            function a(e) {
                return s((function(t, r, n, o, s, a) {
                    var u = t[r];
                    return c(u) !== e ? new i("Invalid " + o + " `" + s + "` of type `" + f(u) + "` supplied to `" + n + "`, expected `" + e + "`.") : null
                }))
            }

            function u(t) {
                switch (typeof t) {
                    case "number":
                    case "string":
                    case "undefined":
                        return !0;
                    case "boolean":
                        return !t;
                    case "object":
                        if (Array.isArray(t)) return t.every(u);
                        if (null === t || e(t)) return !0;
                        var n = (function(e) {
                            var t = e && (r && e[r] || e["@@iterator"]);
                            if ("function" == typeof t) return t
                        })(t);
                        if (!n) return !1;
                        var o, i = n.call(t);
                        if (n !== t.entries) {
                            for (; !(o = i.next()).done;)
                                if (!u(o.value)) return !1
                        } else
                            for (; !(o = i.next()).done;) {
                                var s = o.value;
                                if (s && !u(s[1])) return !1
                            }
                        return !0;
                    default:
                        return !1
                }
            }

            function c(e) {
                var t = typeof e;
                return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : (function(e, t) {
                    return "symbol" === e || ("Symbol" === t["@@toStringTag"] || "function" == typeof Symbol && t instanceof Symbol)
                })(t, e) ? "symbol" : t
            }

            function f(e) {
                if (null == e) return "" + e;
                var t = c(e);
                if ("object" === t) {
                    if (e instanceof Date) return "date";
                    if (e instanceof RegExp) return "regexp"
                }
                return t
            }

            function h(e) {
                var t = f(e);
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
            return i.prototype = Error.prototype, n.checkPropTypes = S, n.PropTypes = n, n
        },
        T = s((function(e) {
            var t = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
            e.exports = P((function(e) {
                return "object" == typeof e && null !== e && e.$$typeof === t
            }), !0)
        })),
        C = T.shape({
            trySubscribe: T.func.isRequired,
            tryUnsubscribe: T.func.isRequired,
            notifyNestedSubs: T.func.isRequired,
            isSubscribed: T.func.isRequired
        }),
        A = T.shape({
            subscribe: T.func.isRequired,
            dispatch: T.func.isRequired,
            getState: T.func.isRequired
        });

    function N(e) {
        "undefined" != typeof console && "function" == typeof console.error && console.error(e);
        try {
            throw new Error(e)
        } catch (e) {}
    }
    var w = void 0 !== n.forwardRef,
        I = !1;

    function R(e) {
        var r;
        void 0 === e && (e = "store");
        var n = e + "Subscription",
            i = (function(r) {
                o(s, r);
                var i = s.prototype;

                function s(t, n) {
                    var o;
                    return (o = r.call(this, t, n) || this)[e] = t.store, o
                }
                return i.getChildContext = function() {
                    var t;
                    return (t = {})[e] = this[e], t[n] = null, t
                }, i.render = function() {
                    return t.Children.only(this.props.children)
                }, s
            })(t.Component),
            s = w ? "UNSAFE_componentWillReceiveProps" : "componentWillReceiveProps";
        return i.prototype[s] = function(t) {
            this[e] !== t.store && (I || (I = !0, N("<Provider> does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reduxjs/react-redux/releases/tag/v2.0.0 for the migration instructions.")))
        }, i.propTypes = {
            store: A.isRequired,
            children: T.element.isRequired
        }, i.childContextTypes = ((r = {})[e] = A.isRequired, r[n] = C, r), i
    }
    var M = R();

    function x(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function F() {
        return (F = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function D(e, t) {
        if (null == e) return {};
        var r, n, o = {},
            i = Object.keys(e);
        for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
        return o
    }
    var L = s((function(e, t) {
        (function() {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var e = "function" == typeof Symbol && Symbol.for,
                r = e ? Symbol.for("react.element") : 60103,
                n = e ? Symbol.for("react.portal") : 60106,
                o = e ? Symbol.for("react.fragment") : 60107,
                i = e ? Symbol.for("react.strict_mode") : 60108,
                s = e ? Symbol.for("react.profiler") : 60114,
                a = e ? Symbol.for("react.provider") : 60109,
                u = e ? Symbol.for("react.context") : 60110,
                c = e ? Symbol.for("react.async_mode") : 60111,
                l = e ? Symbol.for("react.concurrent_mode") : 60111,
                p = e ? Symbol.for("react.forward_ref") : 60112,
                f = e ? Symbol.for("react.suspense") : 60113,
                d = e ? Symbol.for("react.suspense_list") : 60120,
                h = e ? Symbol.for("react.memo") : 60115,
                m = e ? Symbol.for("react.lazy") : 60116,
                y = e ? Symbol.for("react.fundamental") : 60117,
                _ = e ? Symbol.for("react.responder") : 60118,
                v = e ? Symbol.for("react.scope") : 60119;
            var E = function(e) {
                    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    var o = 0,
                        i = "Warning: " + e.replace(/%s/g, (function() {
                            return r[o++]
                        }));
                    "undefined" != typeof console && console.warn(i);
                    try {
                        throw new Error(i)
                    } catch (e) {}
                },
                b = function(e, t) {
                    if (void 0 === t) throw new Error("`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning message argument");
                    if (!e) {
                        for (var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) n[o - 2] = arguments[o];
                        E.apply(void 0, [t].concat(n))
                    }
                };

            function g(e) {
                if ("object" == typeof e && null !== e) {
                    var t = e.$$typeof;
                    switch (t) {
                        case r:
                            var d = e.type;
                            switch (d) {
                                case c:
                                case l:
                                case o:
                                case s:
                                case i:
                                case f:
                                    return d;
                                default:
                                    var y = d && d.$$typeof;
                                    switch (y) {
                                        case u:
                                        case p:
                                        case a:
                                            return y;
                                        default:
                                            return t
                                    }
                            }
                        case m:
                        case h:
                        case n:
                            return t
                    }
                }
            }
            var O = c,
                S = l,
                P = u,
                T = a,
                C = r,
                A = p,
                N = o,
                w = m,
                I = h,
                R = n,
                M = s,
                x = i,
                F = f,
                D = !1;

            function L(e) {
                return g(e) === l
            }
            t.typeOf = g, t.AsyncMode = O, t.ConcurrentMode = S, t.ContextConsumer = P, t.ContextProvider = T, t.Element = C, t.ForwardRef = A, t.Fragment = N, t.Lazy = w, t.Memo = I, t.Portal = R, t.Profiler = M, t.StrictMode = x, t.Suspense = F, t.isValidElementType = function(e) {
                return "string" == typeof e || "function" == typeof e || e === o || e === l || e === s || e === i || e === f || e === d || "object" == typeof e && null !== e && (e.$$typeof === m || e.$$typeof === h || e.$$typeof === a || e.$$typeof === u || e.$$typeof === p || e.$$typeof === y || e.$$typeof === _ || e.$$typeof === v)
            }, t.isAsyncMode = function(e) {
                return D || (D = !0, b(!1, "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), L(e) || g(e) === c
            }, t.isConcurrentMode = L, t.isContextConsumer = function(e) {
                return g(e) === u
            }, t.isContextProvider = function(e) {
                return g(e) === a
            }, t.isElement = function(e) {
                return "object" == typeof e && null !== e && e.$$typeof === r
            }, t.isForwardRef = function(e) {
                return g(e) === p
            }, t.isFragment = function(e) {
                return g(e) === o
            }, t.isLazy = function(e) {
                return g(e) === m
            }, t.isMemo = function(e) {
                return g(e) === h
            }, t.isPortal = function(e) {
                return g(e) === n
            }, t.isProfiler = function(e) {
                return g(e) === s
            }, t.isStrictMode = function(e) {
                return g(e) === i
            }, t.isSuspense = function(e) {
                return g(e) === f
            }
        })()
    }));
    i(L);
    L.typeOf, L.AsyncMode, L.ConcurrentMode, L.ContextConsumer, L.ContextProvider, L.Element, L.ForwardRef, L.Fragment, L.Lazy, L.Memo, L.Portal, L.Profiler, L.StrictMode, L.Suspense, L.isValidElementType, L.isAsyncMode, L.isConcurrentMode, L.isContextConsumer, L.isContextProvider, L.isElement, L.isForwardRef, L.isFragment, L.isLazy, L.isMemo, L.isPortal, L.isProfiler, L.isStrictMode, L.isSuspense;
    var j = s((function(e) {
            e.exports = L
        })),
        H = {
            childContextTypes: !0,
            contextType: !0,
            contextTypes: !0,
            defaultProps: !0,
            displayName: !0,
            getDefaultProps: !0,
            getDerivedStateFromError: !0,
            getDerivedStateFromProps: !0,
            mixins: !0,
            propTypes: !0,
            type: !0
        },
        B = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            callee: !0,
            arguments: !0,
            arity: !0
        },
        k = {
            $$typeof: !0,
            compare: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
            type: !0
        },
        G = {};

    function W(e) {
        return j.isMemo(e) ? k : G[e.$$typeof] || H
    }
    G[j.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0
    };
    var q = Object.defineProperty,
        K = Object.getOwnPropertyNames,
        U = Object.getOwnPropertySymbols,
        Y = Object.getOwnPropertyDescriptor,
        $ = Object.getPrototypeOf,
        V = Object.prototype;
    var z = function e(t, r, n) {
            if ("string" != typeof r) {
                if (V) {
                    var o = $(r);
                    o && o !== V && e(t, o, n)
                }
                var i = K(r);
                U && (i = i.concat(U(r)));
                for (var s = W(t), a = W(r), u = 0; u < i.length; ++u) {
                    var c = i[u];
                    if (!(B[c] || n && n[c] || a && a[c] || s && s[c])) {
                        var l = Y(r, c);
                        try {
                            q(t, c, l)
                        } catch (e) {}
                    }
                }
                return t
            }
            return t
        },
        J = function(e, t, r, n, o, i, s, a) {
            if (void 0 === t) throw new Error("invariant requires an error message argument");
            if (!e) {
                var u;
                if (void 0 === t) u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                else {
                    var c = [r, n, o, i, s, a],
                        l = 0;
                    (u = new Error(t.replace(/%s/g, (function() {
                        return c[l++]
                    })))).name = "Invariant Violation"
                }
                throw u.framesToPop = 1, u
            }
        },
        X = s((function(e, t) {
            (function() {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var e = "function" == typeof Symbol && Symbol.for,
                    r = e ? Symbol.for("react.element") : 60103,
                    n = e ? Symbol.for("react.portal") : 60106,
                    o = e ? Symbol.for("react.fragment") : 60107,
                    i = e ? Symbol.for("react.strict_mode") : 60108,
                    s = e ? Symbol.for("react.profiler") : 60114,
                    a = e ? Symbol.for("react.provider") : 60109,
                    u = e ? Symbol.for("react.context") : 60110,
                    c = e ? Symbol.for("react.concurrent_mode") : 60111,
                    l = e ? Symbol.for("react.forward_ref") : 60112,
                    p = e ? Symbol.for("react.suspense") : 60113,
                    f = e ? Symbol.for("react.memo") : 60115,
                    d = e ? Symbol.for("react.lazy") : 60116;
                var h = function(e) {
                        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                        var o = 0,
                            i = "Warning: " + e.replace(/%s/g, (function() {
                                return r[o++]
                            }));
                        "undefined" != typeof console && console.warn(i);
                        try {
                            throw new Error(i)
                        } catch (e) {}
                    },
                    m = function(e, t) {
                        if (void 0 === t) throw new Error("`lowPriorityWarning(condition, format, ...args)` requires a warning message argument");
                        if (!e) {
                            for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), o = 2; o < r; o++) n[o - 2] = arguments[o];
                            h.apply(void 0, [t].concat(n))
                        }
                    };

                function y(e) {
                    if ("object" == typeof e && null !== e) {
                        var t = e.$$typeof;
                        switch (t) {
                            case r:
                                var p = e.type;
                                switch (p) {
                                    case c:
                                    case o:
                                    case s:
                                    case i:
                                        return p;
                                    default:
                                        var f = p && p.$$typeof;
                                        switch (f) {
                                            case u:
                                            case l:
                                            case a:
                                                return f;
                                            default:
                                                return t
                                        }
                                }
                            case n:
                                return t
                        }
                    }
                }
                var _ = c,
                    v = c,
                    E = u,
                    b = a,
                    g = r,
                    O = l,
                    S = o,
                    P = s,
                    T = n,
                    C = i,
                    A = !1;

                function N(e) {
                    return y(e) === c
                }
                t.typeOf = y, t.AsyncMode = _, t.ConcurrentMode = v, t.ContextConsumer = E, t.ContextProvider = b, t.Element = g, t.ForwardRef = O, t.Fragment = S, t.Profiler = P, t.Portal = T, t.StrictMode = C, t.isValidElementType = function(e) {
                    return "string" == typeof e || "function" == typeof e || e === o || e === c || e === s || e === i || e === p || "object" == typeof e && null !== e && (e.$$typeof === d || e.$$typeof === f || e.$$typeof === a || e.$$typeof === u || e.$$typeof === l)
                }, t.isAsyncMode = function(e) {
                    return A || (A = !0, m(!1, "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(e)
                }, t.isConcurrentMode = N, t.isContextConsumer = function(e) {
                    return y(e) === u
                }, t.isContextProvider = function(e) {
                    return y(e) === a
                }, t.isElement = function(e) {
                    return "object" == typeof e && null !== e && e.$$typeof === r
                }, t.isForwardRef = function(e) {
                    return y(e) === l
                }, t.isFragment = function(e) {
                    return y(e) === o
                }, t.isProfiler = function(e) {
                    return y(e) === s
                }, t.isPortal = function(e) {
                    return y(e) === n
                }, t.isStrictMode = function(e) {
                    return y(e) === i
                }
            })()
        }));
    i(X);
    X.typeOf, X.AsyncMode, X.ConcurrentMode, X.ContextConsumer, X.ContextProvider, X.Element, X.ForwardRef, X.Fragment, X.Profiler, X.Portal, X.StrictMode, X.isValidElementType, X.isAsyncMode, X.isConcurrentMode, X.isContextConsumer, X.isContextProvider, X.isElement, X.isForwardRef, X.isFragment, X.isProfiler, X.isPortal, X.isStrictMode;
    var Q = s((function(e) {
            e.exports = X
        })).isValidElementType,
        Z = {
            notify: function() {}
        };
    var ee = (function() {
            function e(e, t, r) {
                this.store = e, this.parentSub = t, this.onStateChange = r, this.unsubscribe = null, this.listeners = Z
            }
            var t = e.prototype;
            return t.addNestedSub = function(e) {
                return this.trySubscribe(), this.listeners.subscribe(e)
            }, t.notifyNestedSubs = function() {
                this.listeners.notify()
            }, t.isSubscribed = function() {
                return Boolean(this.unsubscribe)
            }, t.trySubscribe = function() {
                var e, t;
                this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange), this.listeners = (e = [], t = [], {
                    clear: function() {
                        t = null, e = null
                    },
                    notify: function() {
                        for (var r = e = t, n = 0; n < r.length; n++) r[n]()
                    },
                    get: function() {
                        return t
                    },
                    subscribe: function(r) {
                        var n = !0;
                        return t === e && (t = e.slice()), t.push(r),
                            function() {
                                n && null !== e && (n = !1, t === e && (t = e.slice()), t.splice(t.indexOf(r), 1))
                            }
                    }
                }))
            }, t.tryUnsubscribe = function() {
                this.unsubscribe && (this.unsubscribe(), this.unsubscribe = null, this.listeners.clear(), this.listeners = Z)
            }, e
        })(),
        te = void 0 !== n.forwardRef,
        re = 0,
        ne = {};

    function oe() {}

    function ie(e, r) {
        var n, i;
        void 0 === r && (r = {});
        var s = r,
            a = s.getDisplayName,
            u = void 0 === a ? function(e) {
                return "ConnectAdvanced(" + e + ")"
            } : a,
            c = s.methodName,
            l = void 0 === c ? "connectAdvanced" : c,
            p = s.renderCountProp,
            f = void 0 === p ? void 0 : p,
            d = s.shouldHandleStateChanges,
            h = void 0 === d || d,
            m = s.storeKey,
            y = void 0 === m ? "store" : m,
            _ = s.withRef,
            v = void 0 !== _ && _,
            E = D(s, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]),
            b = y + "Subscription",
            g = re++,
            O = ((n = {})[y] = A, n[b] = C, n),
            S = ((i = {})[b] = C, i);
        return function(r) {
            J(Q(r), "You must pass a component to the function returned by " + l + ". Instead received " + JSON.stringify(r));
            var n = r.displayName || r.name || "Component",
                i = u(n),
                s = F({}, E, {
                    getDisplayName: u,
                    methodName: l,
                    renderCountProp: f,
                    shouldHandleStateChanges: h,
                    storeKey: y,
                    withRef: v,
                    displayName: i,
                    wrappedComponentName: n,
                    WrappedComponent: r
                }),
                a = (function(n) {
                    function a(e, t) {
                        var r;
                        return (r = n.call(this, e, t) || this).version = g, r.state = {}, r.renderCount = 0, r.store = e[y] || t[y], r.propsMode = Boolean(e[y]), r.setWrappedInstance = r.setWrappedInstance.bind(x(x(r))), J(r.store, 'Could not find "' + y + '" in either the context or props of "' + i + '". Either wrap the root component in a <Provider>, or explicitly pass "' + y + '" as a prop to "' + i + '".'), r.initSelector(), r.initSubscription(), r
                    }
                    o(a, n);
                    var u = a.prototype;
                    return u.getChildContext = function() {
                        var e, t = this.propsMode ? null : this.subscription;
                        return (e = {})[b] = t || this.context[b], e
                    }, u.componentDidMount = function() {
                        h && (this.subscription.trySubscribe(), this.selector.run(this.props), this.selector.shouldComponentUpdate && this.forceUpdate())
                    }, u.componentWillReceiveProps = function(e) {
                        this.selector.run(e)
                    }, u.shouldComponentUpdate = function() {
                        return this.selector.shouldComponentUpdate
                    }, u.componentWillUnmount = function() {
                        this.subscription && this.subscription.tryUnsubscribe(), this.subscription = null, this.notifyNestedSubs = oe, this.store = null, this.selector.run = oe, this.selector.shouldComponentUpdate = !1
                    }, u.getWrappedInstance = function() {
                        return J(v, "To access the wrapped instance, you need to specify { withRef: true } in the options argument of the " + l + "() call."), this.wrappedInstance
                    }, u.setWrappedInstance = function(e) {
                        this.wrappedInstance = e
                    }, u.initSelector = function() {
                        var t = e(this.store.dispatch, s);
                        this.selector = (function(e, t) {
                            var r = {
                                run: function(n) {
                                    try {
                                        var o = e(t.getState(), n);
                                        (o !== r.props || r.error) && (r.shouldComponentUpdate = !0, r.props = o, r.error = null)
                                    } catch (e) {
                                        r.shouldComponentUpdate = !0, r.error = e
                                    }
                                }
                            };
                            return r
                        })(t, this.store), this.selector.run(this.props)
                    }, u.initSubscription = function() {
                        if (h) {
                            var e = (this.propsMode ? this.props : this.context)[b];
                            this.subscription = new ee(this.store, e, this.onStateChange.bind(this)), this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription)
                        }
                    }, u.onStateChange = function() {
                        this.selector.run(this.props), this.selector.shouldComponentUpdate ? (this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate, this.setState(ne)) : this.notifyNestedSubs()
                    }, u.notifyNestedSubsOnComponentDidUpdate = function() {
                        this.componentDidUpdate = void 0, this.notifyNestedSubs()
                    }, u.isSubscribed = function() {
                        return Boolean(this.subscription) && this.subscription.isSubscribed()
                    }, u.addExtraProps = function(e) {
                        if (!(v || f || this.propsMode && this.subscription)) return e;
                        var t = F({}, e);
                        return v && (t.ref = this.setWrappedInstance), f && (t[f] = this.renderCount++), this.propsMode && this.subscription && (t[b] = this.subscription), t
                    }, u.render = function() {
                        var e = this.selector;
                        if (e.shouldComponentUpdate = !1, e.error) throw e.error;
                        return t.createElement(r, this.addExtraProps(e.props))
                    }, a
                })(t.Component);
            te && (a.prototype.UNSAFE_componentWillReceiveProps = a.prototype.componentWillReceiveProps, delete a.prototype.componentWillReceiveProps), a.WrappedComponent = r, a.displayName = i, a.childContextTypes = S, a.contextTypes = O, a.propTypes = O;
            var c = te ? "UNSAFE_componentWillUpdate" : "componentWillUpdate";
            return a.prototype[c] = function() {
                var e = this;
                if (this.version !== g) {
                    this.version = g, this.initSelector();
                    var t = [];
                    this.subscription && (t = this.subscription.listeners.get(), this.subscription.tryUnsubscribe()), this.initSubscription(), h && (this.subscription.trySubscribe(), t.forEach((function(t) {
                        return e.subscription.listeners.subscribe(t)
                    })))
                }
            }, z(a, r)
        }
    }
    var se = Object.prototype.hasOwnProperty;

    function ae(e, t) {
        return e === t ? 0 !== e || 0 !== t || 1 / e == 1 / t : e != e && t != t
    }

    function ue(e, t) {
        if (ae(e, t)) return !0;
        if ("object" != typeof e || null === e || "object" != typeof t || null === t) return !1;
        var r = Object.keys(e),
            n = Object.keys(t);
        if (r.length !== n.length) return !1;
        for (var o = 0; o < r.length; o++)
            if (!se.call(t, r[o]) || !ae(e[r[o]], t[r[o]])) return !1;
        return !0
    }

    function ce(e, t, r) {
        (function(e) {
            if ("object" != typeof e || null === e) return !1;
            var t = Object.getPrototypeOf(e);
            if (null === t) return !0;
            for (var r = t; null !== Object.getPrototypeOf(r);) r = Object.getPrototypeOf(r);
            return t === r
        })(e) || N(r + "() in " + t + " must return a plain object. Instead received " + e + ".")
    }

    function le(e) {
        return function(t, r) {
            var n = e(t, r);

            function o() {
                return n
            }
            return o.dependsOnOwnProps = !1, o
        }
    }

    function pe(e) {
        return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length
    }

    function fe(e, t) {
        return function(r, n) {
            var o = n.displayName,
                i = function(e, t) {
                    return i.dependsOnOwnProps ? i.mapToProps(e, t) : i.mapToProps(e)
                };
            return i.dependsOnOwnProps = !0, i.mapToProps = function(r, n) {
                i.mapToProps = e, i.dependsOnOwnProps = pe(e);
                var s = i(r, n);
                return "function" == typeof s && (i.mapToProps = s, i.dependsOnOwnProps = pe(s), s = i(r, n)), ce(s, o, t), s
            }, i
        }
    }
    var de = [function(e) {
        return "function" == typeof e ? fe(e, "mapDispatchToProps") : void 0
    }, function(e) {
        return e ? void 0 : le((function(e) {
            return {
                dispatch: e
            }
        }))
    }, function(e) {
        return e && "object" == typeof e ? le((function(t) {
            return r.bindActionCreators(e, t)
        })) : void 0
    }];
    var he = [function(e) {
        return "function" == typeof e ? fe(e, "mapStateToProps") : void 0
    }, function(e) {
        return e ? void 0 : le((function() {
            return {}
        }))
    }];

    function me(e, t, r) {
        return F({}, r, e, t)
    }
    var ye = [function(e) {
        return "function" == typeof e ? (function(e) {
            return function(t, r) {
                var n, o = r.displayName,
                    i = r.pure,
                    s = r.areMergedPropsEqual,
                    a = !1;
                return function(t, r, u) {
                    var c = e(t, r, u);
                    return a ? i && s(c, n) || (n = c) : (a = !0, ce(n = c, o, "mergeProps")), n
                }
            }
        })(e) : void 0
    }, function(e) {
        return e ? void 0 : function() {
            return me
        }
    }];

    function _e(e, t, r) {
        if (!e) throw new Error("Unexpected value for " + t + " in " + r + ".");
        "mapStateToProps" !== t && "mapDispatchToProps" !== t || e.hasOwnProperty("dependsOnOwnProps") || N("The selector for " + t + " of " + r + " did not specify a value for dependsOnOwnProps.")
    }

    function ve(e, t, r, n) {
        return function(o, i) {
            return r(e(o, i), t(n, i), i)
        }
    }

    function Ee(e, t, r, n, o) {
        var i, s, a, u, c, l = o.areStatesEqual,
            p = o.areOwnPropsEqual,
            f = o.areStatePropsEqual,
            d = !1;

        function h(o, d) {
            var h, m, y = !p(d, s),
                _ = !l(o, i);
            return i = o, s = d, y && _ ? (a = e(i, s), t.dependsOnOwnProps && (u = t(n, s)), c = r(a, u, s)) : y ? (e.dependsOnOwnProps && (a = e(i, s)), t.dependsOnOwnProps && (u = t(n, s)), c = r(a, u, s)) : _ ? (h = e(i, s), m = !f(h, a), a = h, m && (c = r(a, u, s)), c) : c
        }
        return function(o, l) {
            return d ? h(o, l) : (a = e(i = o, s = l), u = t(n, s), c = r(a, u, s), d = !0, c)
        }
    }

    function be(e, t) {
        var r = t.initMapStateToProps,
            n = t.initMapDispatchToProps,
            o = t.initMergeProps,
            i = D(t, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]),
            s = r(e, i),
            a = n(e, i),
            u = o(e, i);
        return (function(e, t, r, n) {
            _e(e, "mapStateToProps", n), _e(t, "mapDispatchToProps", n), _e(r, "mergeProps", n)
        })(s, a, u, i.displayName), (i.pure ? Ee : ve)(s, a, u, e, i)
    }

    function ge(e, t, r) {
        for (var n = t.length - 1; n >= 0; n--) {
            var o = t[n](e);
            if (o) return o
        }
        return function(t, n) {
            throw new Error("Invalid value of type " + typeof e + " for " + r + " argument when connecting component " + n.wrappedComponentName + ".")
        }
    }

    function Oe(e, t) {
        return e === t
    }
    var Se, Pe, Te, Ce, Ae, Ne, we, Ie, Re, Me, xe, Fe, De = (Te = (Pe = void 0 === Se ? {} : Se).connectHOC, Ce = void 0 === Te ? ie : Te, Ae = Pe.mapStateToPropsFactories, Ne = void 0 === Ae ? he : Ae, we = Pe.mapDispatchToPropsFactories, Ie = void 0 === we ? de : we, Re = Pe.mergePropsFactories, Me = void 0 === Re ? ye : Re, xe = Pe.selectorFactory, Fe = void 0 === xe ? be : xe, function(e, t, r, n) {
        void 0 === n && (n = {});
        var o = n,
            i = o.pure,
            s = void 0 === i || i,
            a = o.areStatesEqual,
            u = void 0 === a ? Oe : a,
            c = o.areOwnPropsEqual,
            l = void 0 === c ? ue : c,
            p = o.areStatePropsEqual,
            f = void 0 === p ? ue : p,
            d = o.areMergedPropsEqual,
            h = void 0 === d ? ue : d,
            m = D(o, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]),
            y = ge(e, Ne, "mapStateToProps"),
            _ = ge(t, Ie, "mapDispatchToProps"),
            v = ge(r, Me, "mergeProps");
        return Ce(Fe, F({
            methodName: "connect",
            getDisplayName: function(e) {
                return "Connect(" + e + ")"
            },
            shouldHandleStateChanges: Boolean(e),
            initMapStateToProps: y,
            initMapDispatchToProps: _,
            initMergeProps: v,
            pure: s,
            areStatesEqual: u,
            areOwnPropsEqual: l,
            areStatePropsEqual: f,
            areMergedPropsEqual: h
        }, m))
    });
    e.Provider = M, e.createProvider = R, e.connectAdvanced = ie, e.connect = De, Object.defineProperty(e, "__esModule", {
        value: !0
    })
})), (function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("redux-thunk", [], t) : "object" == typeof exports ? exports.ReduxThunk = t() : e.ReduxThunk = t()
})(this, (function() {
    return (function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var o = t[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(o.exports, o, o.exports, r), o.loaded = !0, o.exports
        }
        return r.m = e, r.c = t, r.p = "", r(0)
    })([function(e, t, r) {
        e.exports = r(1)
    }, function(e, t) {
        "use strict";

        function r(e) {
            return function(t) {
                var r = t.dispatch,
                    n = t.getState;
                return function(t) {
                    return function(o) {
                        return "function" == typeof o ? o(r, n, e) : t(o)
                    }
                }
            }
        }
        t.__esModule = !0;
        var n = r();
        n.withExtraArgument = r, t.default = n
    }])
})), define("hoist-non-react-statics", (function() {
    return (function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var o = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var o in e) r.d(n, o, function(t) {
                    return e[t]
                }.bind(null, o));
            return n
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 0)
    })({
        "./hoist-non-react-statics.js": function(e, t, r) {
            "use strict";
            var n = {
                    childContextTypes: !0,
                    contextTypes: !0,
                    defaultProps: !0,
                    displayName: !0,
                    getDefaultProps: !0,
                    mixins: !0,
                    propTypes: !0,
                    type: !0
                },
                o = {
                    name: !0,
                    length: !0,
                    prototype: !0,
                    caller: !0,
                    arguments: !0,
                    arity: !0
                },
                i = "function" == typeof Object.getOwnPropertySymbols;
            e.exports = function(e, t, r) {
                if ("string" != typeof t) {
                    var s = Object.getOwnPropertyNames(t);
                    i && (s = s.concat(Object.getOwnPropertySymbols(t)));
                    for (var a = 0; a < s.length; ++a)
                        if (!(n[s[a]] || o[s[a]] || r && r[s[a]])) try {
                            e[s[a]] = t[s[a]]
                        } catch (e) {}
                }
                return e
            }
        },
        0: function(e, t, r) {
            e.exports = r("./hoist-non-react-statics.js")
        }
    })
})), define("modules/clean/init_react", ["require", "exports", "tslib", "modules/core/exception", "react", "react-dom"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importDefault(o), i = r.__importDefault(i);
    t.mountComponent = function(e, t) {
        var s;
        s = null != t.component_name ? e[t.component_name] : e;
        var u = Date.now();
        (function e() {
            var c = document.getElementById(t.elem_id);
            if (c) {
                var l = t.component_name || "unknown_react_component",
                    p = new a(l).start();
                try {
                    i.default.render(o.default.createElement(s, t.props), c), p.end()
                } catch (e) {
                    console.error(e), n.reportException({
                        err: e,
                        exc_extra: {
                            componentDesc: r.__assign(r.__assign({}, t), {
                                props: "redacted"
                            }),
                            domElementExists: !!c
                        }
                    })
                }
            } else Date.now() - u < 1e4 ? window.requestAnimationFrame(e) : n.reportStack("React container not found in DOM after 10s: " + t.elem_id)
        })()
    };
    var s = !(!window.performance || !window.performance.now),
        a = (function() {
            function e(e) {
                this.componentName = e, this.shouldShowDebugSpans = window.performance && window.performance.mark && window.performance.measure && window.location.search.indexOf("show_debug_spans") > -1
            }
            return e.prototype.start = function() {
                return s && (this.shouldShowDebugSpans && window.performance.mark(this.componentName + " InitReact start"), this.startTime = window.performance.now()), this
            }, e.prototype.end = function() {
                s && (e.RECORDED_COMPONENTS.push({
                    name: this.componentName,
                    startTime: this.startTime,
                    endTime: window.performance.now()
                }), this.shouldShowDebugSpans && (window.performance.mark(this.componentName + " InitReact end"), window.performance.measure("InitReact " + this.componentName, this.componentName + " InitReact start", this.componentName + " InitReact end")))
            }, e.getData = function() {
                return e.RECORDED_COMPONENTS
            }, e.RECORDED_COMPONENTS = [], e
        })();
    t.getReactInitData = function() {
        return a.getData()
    }
})), define("modules/clean/raf_throttle", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e) {
        var t = this;
        this.request = function() {
            t.ticking || (t.ticking = !0, t.currentRequestId = requestAnimationFrame((function() {
                t.thunk(), t.ticking = !1
            })))
        }, this.cancelPending = function() {
            cancelAnimationFrame(t.currentRequestId)
        }, this.thunk = e
    };
    t.RafThrottle = r
})), define("modules/clean/react/button", ["require", "exports", "tslib", "classnames", "react", "react-dom-factories"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importDefault(o), i = r.__importStar(i);
    var s = function(e) {
            var t = {};
            "styleless" !== e.importance && (t["button-" + e.importance] = !0), t["button-" + e.variant] = null != e.variant && "standard" !== e.variant, null != e.className && (t[e.className] = !0);
            e.importance, e.variant;
            var o = r.__rest(e, ["importance", "variant"]);
            return o.className = n.default(t), o
        },
        a = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r.__extends(t, e), t.prototype.render = function() {
                return i.button(s(this.props), this.props.children)
            }, t.defaultProps = {
                importance: "primary"
            }, t
        })(o.default.Component);
    t.Button = a;
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = s(this.props);
            return delete e.disabled, i.a(e, this.props.children)
        }, t.defaultProps = {
            importance: "primary"
        }, t
    })(o.default.Component);
    t.LinkButton = u, t.button = a, t.link_button = u
})), define("modules/clean/react/css", ["require", "exports", "tslib", "react", "hoist-non-react-statics", "modules/clean/css", "modules/clean/react/helpers", "modules/clean/react/document"], (function(e, t, r, n, o, i, s, a) {
    "use strict";
    var u;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importDefault(o), i = r.__importStar(i), (function(e) {
        e.LOADING = "loading", e.SUCCESS = "success", e.FAILED = "failed", e.FORCE_RENDERED = "force-rendered"
    })(u || (u = {})), t.requireCssWithComponent = function(e, t, c, l) {
        void 0 === t && (t = []), void 0 === c && (c = []), void 0 === l && (l = {});
        var p = (function(o) {
            function p(e, t) {
                var r = o.call(this, e) || this;
                return r._isUnmounted = !1, r.getWrappedComponent = function() {
                    return r.refs.wrapped
                }, r._handleCssLoaded = function() {
                    l.onCssResponse && l.onCssResponse(), r._isUnmounted || r.setState({
                        cssMode: u.SUCCESS
                    }, (function() {
                        return "function" == typeof r.props.onCssLoad ? r.props.onCssLoad() : void 0
                    }))
                }, r._handleCssFailed = function() {
                    l.onCssResponse && l.onCssResponse(), r._isUnmounted || r.setState({
                        cssMode: u.FAILED
                    }, (function() {
                        return "function" == typeof r.props.onCssFail ? r.props.onCssFail(r._forceRender) : void 0
                    }))
                }, r._forceRender = function() {
                    r._isUnmounted || r.setState({
                        cssMode: u.FORCE_RENDERED
                    })
                }, r.state = {
                    cssMode: e.skipCss || i.is_loaded(p.combinedCssPaths, t.document) ? u.FORCE_RENDERED : u.LOADING
                }, r
            }
            return r.__extends(p, o), p.getCombinedCssPaths = function() {
                return p.combinedCssPaths
            }, p.prototype.UNSAFE_componentWillMount = function() {
                this.state.cssMode === u.LOADING && (l.onWillLoadCss && l.onWillLoadCss(), i.require_css_multi(p.combinedCssPaths, this._handleCssLoaded, this._handleCssFailed, this.context.document))
            }, p.prototype.componentWillUnmount = function() {
                this._isUnmounted = !0
            }, p.prototype.render = function() {
                var t = this.props,
                    o = t.cssPlaceholder,
                    i = (t.onCssFail, t.onCssLoad, t.skipCss, r.__rest(t, ["cssPlaceholder", "onCssFail", "onCssLoad", "skipCss"]));
                if ([u.FORCE_RENDERED, u.SUCCESS].includes(this.state.cssMode)) {
                    if (s.isStatelessFunction(e)) {
                        var a = e;
                        return n.createElement(a, r.__assign({}, i))
                    }
                    var c = e;
                    return n.createElement(c, r.__assign({
                        ref: "wrapped"
                    }, i))
                }
                return null != o ? o : null
            }, p.displayName = "Css(" + s.getDisplayName(e) + ")", p.wrappedClass = e, p.combinedCssPaths = Object.keys(t.concat.apply(t, c.map((function(e) {
                return void 0 !== e.getCombinedCssPaths ? e.getCombinedCssPaths() : []
            }))).reduce((function(e, t) {
                return e[t] = !0, e
            }), {})), p.defaultProps = {
                cssPlaceholder: null,
                onCssFail: function(e) {
                    return e()
                },
                onCssLoad: null,
                skipCss: !!window.jasmine
            }, p.contextTypes = a.DocumentContextTypes, p
        })(n.Component);
        return o.default(p, e)
    }
})), define("modules/clean/react/document", ["require", "exports", "tslib", "react", "prop-types", "hoist-non-react-statics", "modules/clean/react/helpers"], (function(e, t, r, n, o, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importStar(o), i = r.__importDefault(i), t.DocumentContextTypes = {
        document: o.object,
        window: o.object
    };
    var a = (function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(o, e), o.prototype.getChildContext = function() {
            return {
                document: this.props.document,
                window: this.props.window
            }
        }, o.prototype.render = function() {
            return n.Children.only(this.props.children)
        }, o.childContextTypes = t.DocumentContextTypes, o
    })(n.Component);
    t.DocumentProvider = a, t.withDocument = function(e) {
        var o = (function(o) {
            function i() {
                return null !== o && o.apply(this, arguments) || this
            }
            return r.__extends(i, o), i.prototype.render = function() {
                var t = {
                    document: this.context.document || document,
                    window: this.context.window || window
                };
                return n.createElement(e, r.__assign({}, this.props, t))
            }, i.displayName = "WithDocument(" + s.getDisplayName(e) + ")", i.wrappedClass = e, i.contextTypes = t.DocumentContextTypes, i
        })(n.Component);
        return i.default(o, e)
    }
})), define("modules/clean/react/free_positioned", ["require", "exports", "tslib", "react", "react-dom", "react-dom-factories", "prop-types", "external/lodash", "jquery", "modules/clean/raf_throttle"], (function(e, t, r, n, o, i, s, a, u, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), i = r.__importStar(i), s = r.__importStar(s), a = r.__importStar(a), u = r.__importDefault(u);
    var l = {
            TOP_LEFT: 1,
            TOP: 2,
            TOP_RIGHT: 3,
            LEFT_TOP: 4,
            LEFT: 5,
            LEFT_BOTTOM: 6,
            RIGHT_TOP: 7,
            RIGHT: 8,
            RIGHT_BOTTOM: 9,
            BOTTOM_LEFT: 10,
            BOTTOM: 11,
            BOTTOM_RIGHT: 12,
            TOP_ALIGN_LEFT: 13,
            TOP_ALIGN_RIGHT: 14,
            LEFT_ALIGN_TOP: 15,
            LEFT_ALIGN_BOTTOM: 16,
            RIGHT_ALIGN_TOP: 17,
            RIGHT_ALIGN_BOTTOM: 18,
            BOTTOM_ALIGN_LEFT: 19,
            BOTTOM_ALIGN_RIGHT: 20
        },
        p = function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            var r = e[0],
                n = r.targetNode,
                o = r.isTargetFixed,
                i = r.position,
                s = r.offset,
                a = null != s ? s : {};
            return function(e, t) {
                if (null == n) return null;
                var r = u.default(n).offset();
                if (o && (r.top -= u.default(window).scrollTop(), t && (r.left -= window.pageXOffset)), null == e) return {
                    top: r.top,
                    left: r.left
                };
                switch (a.vertical && (r.top += a.vertical), a.horizontal && (r.left += a.horizontal), i) {
                    case l.TOP_LEFT:
                        return {
                            top: r.top - e.offsetHeight,
                            left: r.left + .5 * n.offsetWidth - .75 * e.offsetWidth
                        };
                    case l.TOP:
                        return {
                            top: r.top - e.offsetHeight,
                            left: r.left + .5 * (n.offsetWidth - e.offsetWidth)
                        };
                    case l.TOP_RIGHT:
                        return {
                            top: r.top - e.offsetHeight,
                            left: r.left + .5 * n.offsetWidth - .25 * e.offsetWidth
                        };
                    case l.LEFT_TOP:
                        return {
                            top: r.top + .5 * n.offsetHeight - .75 * e.offsetHeight,
                            left: r.left - e.offsetWidth
                        };
                    case l.LEFT:
                        return {
                            top: r.top + .5 * (n.offsetHeight - e.offsetHeight),
                            left: r.left - e.offsetWidth
                        };
                    case l.LEFT_BOTTOM:
                        return {
                            top: r.top + .5 * n.offsetHeight - .25 * e.offsetHeight,
                            left: r.left - e.offsetWidth
                        };
                    case l.RIGHT_TOP:
                        return {
                            top: r.top + .5 * n.offsetHeight - .75 * e.offsetHeight,
                            left: r.left + n.offsetWidth
                        };
                    case l.RIGHT:
                        return {
                            top: r.top + .5 * (n.offsetHeight - e.offsetHeight),
                            left: r.left + n.offsetWidth
                        };
                    case l.RIGHT_BOTTOM:
                        return {
                            top: r.top + .5 * n.offsetHeight - .25 * e.offsetHeight,
                            left: r.left + n.offsetWidth
                        };
                    case l.BOTTOM_LEFT:
                        return {
                            top: r.top + n.offsetHeight,
                            left: r.left + .5 * n.offsetWidth - .75 * e.offsetWidth
                        };
                    case l.BOTTOM:
                        return {
                            top: r.top + n.offsetHeight,
                            left: r.left + .5 * (n.offsetWidth - e.offsetWidth)
                        };
                    case l.BOTTOM_RIGHT:
                        return {
                            top: r.top + n.offsetHeight,
                            left: r.left + .5 * n.offsetWidth - .25 * e.offsetWidth
                        };
                    case l.TOP_ALIGN_LEFT:
                        return {
                            top: r.top - e.offsetHeight,
                            left: r.left
                        };
                    case l.TOP_ALIGN_RIGHT:
                        return {
                            top: r.top - e.offsetHeight,
                            left: r.left + n.offsetWidth - e.offsetWidth
                        };
                    case l.LEFT_ALIGN_TOP:
                        return {
                            top: r.top,
                            left: r.left - e.offsetWidth
                        };
                    case l.LEFT_ALIGN_BOTTOM:
                        return {
                            top: r.top + n.offsetHeight - e.offsetHeight,
                            left: r.left - e.offsetWidth
                        };
                    case l.RIGHT_ALIGN_TOP:
                        return {
                            top: r.top,
                            left: r.left + n.offsetWidth
                        };
                    case l.RIGHT_ALIGN_BOTTOM:
                        return {
                            top: r.top + n.offsetHeight - e.offsetHeight,
                            left: r.left + n.offsetWidth
                        };
                    case l.BOTTOM_ALIGN_LEFT:
                        return {
                            top: r.top + n.offsetHeight,
                            left: r.left
                        };
                    case l.BOTTOM_ALIGN_RIGHT:
                        return {
                            top: r.top + n.offsetHeight,
                            left: r.left + n.offsetWidth - e.offsetWidth
                        }
                }
            }
        },
        f = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    positioning: t.props.initialPositioning
                }, t._throttle = null, t._scrollHandler = null, t._debounceRate = 500, t._getStyle = function() {
                    return a.assignIn({
                        outline: 0,
                        position: t.props.isTargetFixed ? "fixed" : "absolute"
                    }, t.state.positioning)
                }, t._createScrollHandler = function() {
                    var e = a.debounce(t._throttle.request, t._debounceRate);
                    return function() {
                        return t._throttle.request(), e()
                    }
                }, t._updatePositioning = function() {
                    if (t.refs.root) {
                        var e = t.props.getPositioning(o.findDOMNode(t), t.props.compensateForHorizontalScroll);
                        return null != e ? t.setState({
                            positioning: e
                        }, (function() {
                            return "function" == typeof t.props.onReposition ? t.props.onReposition(t.state.positioning) : void 0
                        })) : void 0
                    }
                }, t
            }
            return r.__extends(t, e), t.prototype.componentDidMount = function() {
                this._throttle = new c.RafThrottle(this._updatePositioning), u.default(window).on("resize.freePositioned", this._throttle.request), this.props.compensateForHorizontalScroll && (this._scrollHandler = this._createScrollHandler(), u.default(window).on("scroll.freePositioned", this._scrollHandler)), this._updatePositioning()
            }, t.prototype.componentDidUpdate = function(e) {
                if (this.props !== e) return this._throttle.request()
            }, t.prototype.componentWillUnmount = function() {
                this._throttle.cancelPending(), u.default(window).off("resize.freePositioned", this._throttle.request), this.props.compensateForHorizontalScroll && u.default(window).off("scroll.freePositioned", this._scrollHandler)
            }, t.prototype.render = function() {
                return i.div({
                    ref: "root",
                    style: this._getStyle(),
                    tabIndex: -1
                }, this.props.children)
            }, t.displayName = "FreePositioned", t.STICKY_POSITION = l, t.makeStickyPositioner = p, t.propTypes = {
                getPositioning: s.func.isRequired,
                isTargetFixed: s.bool,
                initialPositioning: s.shape({
                    top: s.number,
                    left: s.number
                }),
                onReposition: s.func,
                compensateForHorizontalScroll: s.bool
            }, t.defaultProps = {
                isTargetFixed: !1,
                initialPositioning: null,
                compensateForHorizontalScroll: !0
            }, t
        })(n.default.Component);
    t.FreePositioned = f
})), define("modules/clean/react/helpers", ["require", "exports", "tslib", "external/lodash"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n);
    var o = function(e, t) {
        if (e === t) return !0;
        var r, n, o = Object.keys(e),
            i = Object.keys(t);
        if (o.length !== i.length) return !1;
        for (var s = 0, a = Array.from(o); s < a.length; s++) {
            var u = a[s],
                c = e[u],
                l = t[u];
            if (Array.isArray(c) && Array.isArray(l)) {
                if (c.length !== l.length) return !1;
                for (var p = 0; p < c.length; p++)
                    if (c[p] !== l[p]) return !1
            } else if (!((r = c) === (n = l) ? 0 !== r || 1 / r == 1 / n : r != r && n != n)) return !1
        }
        return !0
    };

    function i(e) {
        return !!(e && e.prototype && e.prototype.render)
    }
    t.compareStateAndProps = function(e, t) {
        return !n.isEqual(this.state, t) || !n.isEqual(this.props, e)
    }, t.shallowCompareStateAndProps = function(e, t) {
        return !o(this.state, t) || !o(this.props, e)
    }, t.getDisplayName = function(e, t) {
        return void 0 === t && (t = "Component"), e.displayName || e.name || t
    }, t.isStatelessFunction = function(e) {
        return "string" != typeof e && !i(e)
    }, t.isComponentClass = i
})), define("modules/clean/react/overlay", ["require", "exports", "tslib", "classnames", "react", "react-dom", "external/lodash", "jquery", "modules/clean/react/css", "modules/core/dom", "modules/clean/keycode", "modules/clean/react/free_positioned", "modules/clean/react/portal", "modules/clean/react/document"], (function(e, t, r, n, o, i, s, a, u, c, l, p, f, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importDefault(o), i = r.__importStar(i), s = r.__importStar(s), a = r.__importDefault(a), c = r.__importStar(c);
    var h = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.overlayContentDidMount = function() {
                t.$overlayContent = a.default(i.findDOMNode(t.refs.overlayContent)), t.props.isContentFocusable && (t._focusElementInOverlay(), t._bindOverlayHandlers()), t.props.isFullScreen && (t._maskElementsBehindOverlay(t.$overlayContent), c.scroll_lock_document()), t.props.onRendered()
            }, t._bindOverlayHandlers = function() {
                t.$overlayContent.on("keydown", t._handleKeyDown), window.addEventListener("mousedown", t._handleFocusOutOverlay, !0), window.addEventListener("blur", t._handleFocusIntoIframe, !0)
            }, t._unbindOverlayHandlers = function() {
                t.$overlayContent.off("keydown"), window.removeEventListener("mousedown", t._handleFocusOutOverlay, !0), window.removeEventListener("blur", t._handleFocusIntoIframe, !0)
            }, t._getContentStyle = function() {
                return t.props.position && !t.props.isFullScreen ? {
                    top: t.props.position.top,
                    left: t.props.position.left
                } : {}
            }, t._maskElementsBehindOverlay = function(e) {
                t._setScreenReaderHiddenForSiblingsAndAncestors(e, !0)
            }, t._unmaskElementsBehindOverlay = function(e) {
                t._setScreenReaderHiddenForSiblingsAndAncestors(e, !1)
            }, t._setScreenReaderHiddenForSiblingsAndAncestors = function(e, r) {
                var n = e.siblings().not("#accessible-announce");
                r ? n.attr("aria-hidden", "true") : n.removeAttr("aria-hidden");
                var o = e.parent();
                o.is(t._rootContainer) || t._setScreenReaderHiddenForSiblingsAndAncestors(o, r)
            }, t._focusElementInOverlay = function() {
                var e = t.$overlayContent.children().first();
                if (null == e.attr("tabindex") && (e = t.$overlayContent), t.props.shouldAutoFocusOverlayContent) {
                    var r = c.getTabbableElementsIn(t.$overlayContent);
                    r.length > 0 && (e = a.default(r[0]))
                }
                e.focus()
            }, t._handleKeyDown = function(e) {
                t.props.isContentFocusable && (e.which === l.KeyCode.TAB ? t._handleTabNavigate(e) : e.which === l.KeyCode.ESC && t._blur(e, t.overlayTarget))
            }, t._handleFocusOutOverlay = function(e) {
                t.props.isContentFocusable && (e.target === t.overlayTarget || t.overlayTarget.contains(e.target) || t.$overlayContent.get(0).contains(e.target) || t._blur(e, e.target || t.overlayTarget))
            }, t._handleFocusIntoIframe = function(e) {
                t.props.document.activeElement && "IFRAME" === t.props.document.activeElement.tagName && t._blur(e, t.props.document.activeElement)
            }, t._handleTabNavigate = function(e) {
                if (t.props.shouldTrapKeyboardFocus || t.props.isFullScreen) c.keepFocusIn(t.$overlayContent, e);
                else {
                    var r = void 0,
                        n = void 0,
                        o = c.getTabbableElementsIn(t.$overlayContent),
                        i = o[0],
                        s = o[o.length - 1];
                    if (e.shiftKey && (r = e.target, [t.$overlayContent.get(0), i].includes(r))) t._blur(e, t.overlayTarget);
                    else if (!e.shiftKey && (n = e.target, [t.$overlayContent.get(0), s].includes(n))) {
                        var a = t.overlayTarget;
                        if (t.overlayTarget.parentNode) {
                            var u = c.getFocusableElementsIn(t.overlayTarget.parentNode),
                                l = u.index(t.overlayTarget);
                            l < u.length - 1 && (a = u[l + 1])
                        }
                        t._blur(e, a)
                    }
                }
            }, t._blur = function(e, r) {
                e.preventDefault(), e.stopPropagation(), r.focus(), t.props.onBlur(e)
            }, t
        }
        return r.__extends(t, e), t.prototype.UNSAFE_componentWillMount = function() {
            this._rootContainer = this.props.document.body, this.overlayTarget = this.props.overlayTarget || this.props.document.activeElement
        }, t.prototype.componentDidUpdate = function(e) {
            this.$overlayContent && !e.isContentFocusable && this.props.isContentFocusable && (this._focusElementInOverlay(), this._bindOverlayHandlers())
        }, t.prototype.componentWillUnmount = function() {
            this._unbindOverlayHandlers(), this.props.isFullScreen && (this._unmaskElementsBehindOverlay(this.$overlayContent), c.scroll_unlock_document())
        }, t.prototype.render = function() {
            return o.default.createElement(f.Portal, {
                className: "react-overlay-portal-container",
                parentElement: this.props.overlayRoot || this._rootContainer,
                onRendered: this.overlayContentDidMount
            }, o.default.createElement("div", {
                ref: "overlayContent",
                tabIndex: -1,
                className: n.default(this.props.className, {
                    "react-overlay": !0,
                    "react-overlay--is-fullscreen": this.props.isFullScreen
                }),
                style: this._getContentStyle(),
                role: this.props.isFullScreen ? "dialog" : void 0
            }, this.props.children))
        }, t.displayName = "Overlay", t.defaultProps = {
            overlayRoot: null,
            overlayTarget: null,
            isFullScreen: !1,
            shouldTrapKeyboardFocus: !1,
            isContentFocusable: !0,
            shouldAutoFocusOverlayContent: !0,
            position: null,
            onRendered: s.noop,
            onBlur: s.noop
        }, t
    })(o.default.Component);
    t.Overlay = u.requireCssWithComponent(d.withDocument(h), ["/static/css/react/overlay-vflNXoFem.css"]);
    var m = (function(e) {
        function n() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = {
                readyToFocusInOverlay: !1
            }, t._handlePositionUpdated = function(e) {
                !t.currentPositioning && t.props.isContentFocusable && t.setState({
                    readyToFocusInOverlay: !0
                }), t.currentPositioning = e, t.props.onReposition && t.props.onReposition(e)
            }, t
        }
        return r.__extends(n, e), n.prototype.render = function() {
            var e = this.props,
                n = (e.position, e.children, e.onReposition, r.__rest(e, ["position", "children", "onReposition"]));
            return o.default.createElement(t.Overlay, r.__assign({
                overlayTarget: this.props.targetNode,
                isFullScreen: !1,
                isContentFocusable: this.state.readyToFocusInOverlay,
                className: this.props.className
            }, n), o.default.createElement(p.FreePositioned, r.__assign({
                getPositioning: p.FreePositioned.makeStickyPositioner({
                    targetNode: this.props.targetNode,
                    isTargetFixed: this.props.isTargetPositionFixed,
                    position: this.props.position,
                    offset: this.props.positionOffset
                }),
                isTargetFixed: this.props.isTargetPositionFixed,
                onReposition: this._handlePositionUpdated
            }, n), this.props.children))
        }, n.displayName = "PositionedOverlay", n.POSITIONS = p.FreePositioned.STICKY_POSITION, n.defaultProps = {
            isTargetPositionFixed: !1,
            isContentFocusable: !0
        }, n
    })(o.default.Component);
    t.PositionedOverlay = m
})), define("modules/clean/react/portal", ["require", "exports", "tslib", "react", "react-dom", "classnames", "modules/clean/react/document"], (function(e, t, r, n, o, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importStar(o), i = r.__importDefault(i);
    var a = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.el = null, t.parentEl = null, t.portal = null, t
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.mountPortal()
        }, t.prototype.componentDidUpdate = function(e) {
            var t = this.props,
                r = t.className,
                n = t.style,
                o = t.tagName,
                i = t.parentElement,
                s = t.replaceParent,
                a = t.children;
            if (o !== e.tagName || i !== e.parentElement || s !== e.replaceParent) return this.unmountPortal(), void this.mountPortal();
            r === e.className && n === e.style || !this.el || s || this.applyContainerAttributes(this.el), a !== e.children && this.renderPortal()
        }, t.prototype.componentWillUnmount = function() {
            this.unmountPortal()
        }, t.prototype.mountPortal = function() {
            null !== this.props.parentElement && (this.el || (this.props.replaceParent && this.props.parentElement ? this.el = this.props.parentElement : (this.el = this.props.document.createElement(this.props.tagName || "div"), this.applyContainerAttributes(this.el), this.parentEl = this.props.parentElement || this.props.document.body, this.parentEl.appendChild(this.el))), this.renderPortal())
        }, t.prototype.unmountPortal = function() {
            this.el && this.parentEl && (o.unmountComponentAtNode(this.el), this.props.replaceParent || this.parentEl.removeChild(this.el)), this.el = null, this.portal = null
        }, t.prototype.applyContainerAttributes = function(e) {
            var t = this.props,
                r = t.className,
                n = t.style;
            e.className = i.default("react-portal-container", r), void 0 !== n && Object.assign(e.style, n)
        }, t.prototype.renderPortal = function() {
            if (!this.el) throw new Error("No portal element found");
            this.portal = o.unstable_renderSubtreeIntoContainer(this, n.Children.only(this.props.children), this.el, this.props.onRendered)
        }, t.prototype.render = function() {
            return null
        }, t.displayName = "Portal", t
    })(n.PureComponent);
    t.Portal = s.withDocument(a)
})), define("modules/clean/react/sprite", ["require", "exports", "tslib", "classnames", "react", "modules/clean/static_urls", "modules/clean/css"], (function(e, t, r, n, o, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n);
    var a = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            s.require_css({
                web: "/static/css/sprites/web_sprites-vflOYvtKM.css",
                carousel: "/static/css/sprites/carousel_sprites-vflOnjKS2.css",
                dropins: "/static/css/sprites/dropins_sprites-vfldIK_em.css",
                emoji: "/static/css/sprites/emoji_sprites-vflv103Ke.css",
                teams: "/static/css/sprites/teams_sprites-vflw_ZKyd.css",
                business: "/static/css/sprites/business_sprites-vflS_X7zE.css"
            }[this.props.group])
        }, t.prototype.render = function() {
            var e = this.props.alt || "";
            return o.default.createElement("img", {
                className: n.default("sprite", "sprite_" + this.props.group, "s_" + this.props.group + "_" + this.props.name, this.props.className),
                src: i.static_url("/static/images/icons/icon_spacer-vflN3BYt2.gif"),
                "data-src": this.props["data-src"],
                onClick: this.props.onClick,
                onDragStart: this.props.onDragStart,
                onMouseDown: this.props.onMouseDown,
                alt: e,
                title: this.props.title,
                tabIndex: this.props.tabIndex
            })
        }, t.displayName = "Sprite", t
    })((o = r.__importDefault(o)).default.Component);
    t.Sprite = a
})), define("modules/clean/react/title_bubble", ["require", "exports", "tslib", "classnames", "react", "prop-types", "external/lodash", "jquery", "modules/clean/react/css", "modules/clean/react/overlay"], (function(e, t, r, n, o, i, s, a, u, c) {
    "use strict";
    var l;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importDefault(o), i = r.__importStar(i), s = r.__importStar(s);
    var p = (a = r.__importDefault(a)).default(document.body),
        f = {
            TOP: c.PositionedOverlay.POSITIONS.TOP,
            BOTTOM: c.PositionedOverlay.POSITIONS.BOTTOM,
            LEFT: c.PositionedOverlay.POSITIONS.LEFT,
            RIGHT: c.PositionedOverlay.POSITIONS.RIGHT,
            BOTTOM_ALIGN_RIGHT: c.PositionedOverlay.POSITIONS.BOTTOM_ALIGN_RIGHT,
            BOTTOM_ALIGN_LEFT: c.PositionedOverlay.POSITIONS.BOTTOM_ALIGN_LEFT,
            TOP_ALIGN_RIGHT: c.PositionedOverlay.POSITIONS.TOP_ALIGN_RIGHT,
            TOP_ALIGN_LEFT: c.PositionedOverlay.POSITIONS.TOP_ALIGN_LEFT
        },
        d = ((l = {})[f.TOP] = "top", l[f.BOTTOM] = "bottom", l[f.LEFT] = "left", l[f.RIGHT] = "right", l[f.BOTTOM_ALIGN_RIGHT] = "bottom-align-right", l[f.BOTTOM_ALIGN_LEFT] = "bottom-align-left", l[f.TOP_ALIGN_RIGHT] = "top-align-right", l[f.TOP_ALIGN_LEFT] = "top-align-left", l),
        h = (function(e) {
            function u(r) {
                var n = e.call(this, r) || this;
                return n.titleBubbleContainer = null, n.arrow = null, n._getTargetNode = function() {
                    if (n.titleBubbleContainer && n.titleBubbleContainer.children.length > 0) {
                        var e = n.titleBubbleContainer.children[0];
                        if ("NOSCRIPT" !== e.tagName) {
                            var t = n.titleBubbleContainer.getElementsByClassName("titleBubble-positioningTarget")[0] || e;
                            return n.setState({
                                targetNode: t
                            }), n.props.shouldReadContents && a.default(e).attr("aria-describedby", n.titleBubbleId), t
                        }
                    }
                }, n._getPositionOffset = function() {
                    var e = {
                        horizontal: 0,
                        vertical: 0
                    };
                    return d[n.props.position].match(/^top/) ? e.vertical = -n.props.distanceFromTarget : d[n.props.position].match(/^bottom/) ? e.vertical = n.props.distanceFromTarget : d[n.props.position].match(/^left/) ? e.horizontal = -n.props.distanceFromTarget : d[n.props.position].match(/^right/) && (e.horizontal = n.props.distanceFromTarget), e
                }, n._adjustArrowPosition = function(e) {
                    if (null != e) switch (n.props.position) {
                        case t.TitleBubble.POSITIONS.TOP_ALIGN_LEFT:
                        case t.TitleBubble.POSITIONS.BOTTOM_ALIGN_LEFT:
                            n.arrow && (n.arrow.style.left = e.offsetWidth / 2 + "px");
                            break;
                        case t.TitleBubble.POSITIONS.TOP_ALIGN_RIGHT:
                        case t.TitleBubble.POSITIONS.BOTTOM_ALIGN_RIGHT:
                            n.arrow && (n.arrow.style.right = e.offsetWidth / 2 + "px")
                    }
                }, n.handleOnClick = function() {
                    n._throttledSetState({
                        isFocused: !1,
                        isHovering: !1
                    })
                }, n.handleOnFocus = function() {
                    n._throttledSetState({
                        isFocused: !0
                    })
                }, n.handleOnBlur = function() {
                    n._throttledSetState({
                        isFocused: !1
                    })
                }, n.handleOnMouseEnter = function() {
                    n.props.onMouseEnter && n.props.onMouseEnter(), n._throttledSetState({
                        isHovering: !0
                    })
                }, n.setTitleBubbleContainerRef = function(e) {
                    n.titleBubbleContainer = e
                }, n.setArrowRef = function(e) {
                    n.arrow = e
                }, n.handleOnMouseLeave = function() {
                    n.props.onMouseLeave && n.props.onMouseLeave(), a.default(n.state.targetNode).is(":focus") || a.default(n.state.targetNode).children(":focus").length ? n._throttledSetState({
                        isHovering: !1
                    }) : n.props.allowInteractTooltip ? n.closeTooltipId = setTimeout((function() {
                        n._throttledSetState({
                            isFocused: !1,
                            isHovering: !1
                        })
                    }), 50) : n._throttledSetState({
                        isFocused: !1,
                        isHovering: !1
                    })
                }, n.handleContentMouseEnter = function() {
                    n.props.allowInteractTooltip && clearTimeout(n.closeTooltipId)
                }, n.handleContentMouseLeave = function() {
                    n.props.allowInteractTooltip && n._throttledSetState({
                        isHovering: !1
                    })
                }, n.state = {
                    isFocused: !1,
                    isHovering: !1,
                    targetNode: null
                }, n.titleBubbleId = s.uniqueId("react-title-bubble-"), n
            }
            return r.__extends(u, e), u.prototype.componentDidMount = function() {
                var e = this._getTargetNode();
                return this._adjustArrowPosition(e), this._throttledSetState = s.throttle(this.setState, void 0 === this.props.throttleSpeed ? 100 : this.props.throttleSpeed)
            }, u.prototype.componentDidUpdate = function() {
                return this.state.targetNode || this._getTargetNode(), this._adjustArrowPosition(this.state.targetNode)
            }, u.prototype.render = function() {
                var e = {},
                    t = d[this.props.position],
                    r = n.default("react-title-bubble", "react-title-bubble--" + t, this.props.className),
                    i = this.props.backgroundColor ? {
                        backgroundColor: this.props.backgroundColor
                    } : {};
                this.props.backgroundColor && (e["border-" + t.split("-")[0] + "-color"] = this.props.backgroundColor);
                return o.default.createElement("div", {
                    "aria-label": this.props.ariaLabel,
                    ref: this.setTitleBubbleContainerRef,
                    className: n.default("react-title-bubble__container", this.props.containerClassName),
                    onClick: this.handleOnClick,
                    onFocus: this.handleOnFocus,
                    onBlur: this.handleOnBlur,
                    onMouseEnter: this.handleOnMouseEnter,
                    onMouseLeave: this.handleOnMouseLeave
                }, o.default.Children.only(this.props.children), this.state.isHovering || this.state.isFocused && p.hasClass("tabbing") ? o.default.createElement(c.PositionedOverlay, {
                    className: this.props.allowInteractTooltip ? "" : "react-title-bubble--disable-pointer",
                    targetNode: this.state.targetNode,
                    isTargetPositionFixed: this.props.isTargetPositionFixed,
                    position: this.props.position,
                    positionOffset: this._getPositionOffset(),
                    isContentFocusable: !1
                }, o.default.createElement("div", {
                    id: this.titleBubbleId,
                    className: r,
                    style: i,
                    onMouseEnter: this.handleContentMouseEnter,
                    onMouseLeave: this.handleContentMouseLeave
                }, this.props.content, o.default.createElement("div", {
                    ref: this.setArrowRef,
                    className: "arrow",
                    style: e
                }))) : void 0)
            }, u.displayName = "TitleBubble", u.POSITIONS = f, u.POSITIONING_TARGET_CLASS = "titleBubble-positioningTarget", u.propTypes = {
                content: i.oneOfType([i.element, i.string]).isRequired,
                children: i.element.isRequired,
                position: i.oneOf(s.values(f)).isRequired,
                distanceFromTarget: i.number,
                isTargetPositionFixed: i.bool,
                onMouseEnter: i.func,
                onMouseLeave: i.func,
                shouldReadContents: i.bool,
                className: i.string,
                containerClassName: i.string,
                backgroundColor: i.string
            }, u.defaultProps = {
                distanceFromTarget: 0,
                isTargetPositionFixed: !1,
                onMouseEnter: s.noop,
                onMouseLeave: s.noop,
                shouldReadContents: !1,
                className: "",
                containerClassName: "",
                allowInteractTooltip: !1
            }, u
        })(o.default.Component);
    t.TitleBubble = u.requireCssWithComponent(h, ["/static/css/components/title_bubble-vflNHwZeu.css"])
})), define("modules/clean/react/maestro_nav/shared_code/dropbox_logo", ["require", "exports", "tslib", "react"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), t.DropboxLogo = function(e) {
        var t = void 0 === e.color ? "#0062ff" : e.color,
            o = r.__assign({}, e);
        return delete o.color, n.default.createElement("svg", r.__assign({}, o, {
            xmlns: "http://www.w3.org/2000/svg",
            role: "img",
            width: "32px",
            height: "32px",
            viewBox: "0 0 32 32",
            style: {
                fill: t
            }
        }), n.default.createElement("title", null, e.alt), n.default.createElement("path", {
            d: "M8 2.4l8 5.1-8 5.1-8-5.1 8-5.1zm16 0l8 5.1-8 5.1-8-5.1 8-5.1zM0 17.7l8-5.1 8 5.1-8 5.1-8-5.1zm24-5.1l8 5.1-8 5.1-8-5.1 8-5.1zM8 24.5l8-5.1 8 5.1-8 5.1-8-5.1z"
        }))
    }
})), define("modules/clean/redux/devtools", ["require", "exports", "redux"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.composeEnhancersWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || r.compose
})), define("modules/clean/redux/namespaces", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.BROWSE_NAMESPACE_KEY = "BROWSE", t.BUSINESS_NAMESPACE_KEY = "BUSINESS", t.CDM_MIGRATION_NAMESPACE_KEY = "CDM_MIGRATION", t.CHECKLIST_SIDEBAR_NAMESPACE_KEY = "CHECKLIST_SIDEBAR", t.COMMENTS2_NAMESPACE_KEY = "COMMENTS2", t.CONTENT_MANAGER_NAMESPACE_KEY = "CONTENT_MANAGER_REDUCER", t.TEAM_ALERTS_KEY = "TEAM_ALERTS_REDUCER", t.DASHBOARD_NAMESPACE_KEY = "DASHBOARD_REDUCER", t.DEEP_INTEGRATIONS_NAMESPACE_KEY = "DEEP_INTEGRATIONS_NAMESPACE", t.DELOREAN_NAMESPACE_KEY = "DELOREAN_NAMESPACE_KEY", t.DEVICE_LIMIT_NAMESPACE_KEY = "DEVICE_LIMIT", t.EMBEDDED_FILE_NAMESPACE_KEY = "EMBEDDED_FILE_NAMESPACE", t.EXTENSIONS_NAMESPACE_KEY = "EXTENSIONS_NAMESPACE_KEY", t.FILE_NAMESPACE_KEY = "FILE_NAMESPACE", t.FILE_VIEWER_NAMESPACE_KEY = "FILE_VIEWER_REDUCER", t.FILE_TRANSFERS_NAMESPACE_KEY = "FILE_TRANSFERS", t.FILES_VIEW_NAMESPACE_KEY = "FILES_VIEW", t.FIRST_TASK_NAMESPACE_KEY = "FIRST_TASK", t.FOLDER_OVERVIEW_NAMESPACE_KEY = "FOLDER_OVERVIEW", t.IMMERSIVE_INGEST_NAMESPACE_KEY = "IMMERSIVE_INGEST", t.INTEGRATIONS_NAMESPACE_KEY = "INTEGRATIONS_NAMESPACE", t.LEGAL_HOLD_NAMESPACE_KEY = "LEGAL_HOLD_NAMESPACE", t.LOCKED_FILES_NAMESPACE_KEY = "LOCKED_FILES_NAMESPACE_KEY", t.MEGAPHONE_ALERTS_NAMESPACE_KEY = "MEGAPHONE_ALERTS", t.MEGAPHONE_APPROVAL_NAMESPACE_KEY = "MEGAPHONE_APPROVAL", t.MEGAPHONE_NAMESPACE_KEY = "ADMIN_MEGAPHONE", t.ONBOARDING_SIDEBAR_NAMESPACE_KEY = "ONBOARDING_SIDEBAR", t.PAPER_TEMPLATE_LIBRARY_NAMESPACE_KEY = "PAPER_TEMPLATE_LIBRARY", t.PREVIEW_ARCHIVE_NAMESPACE_KEY = "PREVIEW_ARCHIVE_REDUCER", t.PREVIEW_METADATA_NAMESPACE_KEY = "PREVIEW_METADATA_NAMESPACE_KEY", t.PREVIEW_NAMESPACE_KEY = "PREVIEW_NAMESPACE_KEY", t.PRO_ANALYTICS_NAMESPACE_KEY = "PRO_ANALYTICS_NAMESPACE_KEY", t.PROMPT_NAMESPACE_KEY = "ADMIN_MEGAPHONE_PROMPT", t.RETRIEVAL_SUCCESS_BANNER_NAMESPACE_KEY = "RETRIEVAL_SUCCESS_BANNER", t.SEARCH_BAR_NAMESPACE_KEY = "SEARCH_BAR", t.SEARCH_NAMESPACE_KEY = "SEARCH", t.SHARED_LINK_FOLDER_NAMESPACE_KEY = "SHARED_LINK_FOLDER", t.SHARED_LINK_NAMESPACE_KEY = "SHARED_LINK", t.STORMCROW_NAMESPACE_KEY = "STORMCROW_NAMESPACE_KEY", t.TEAM_DISCOVERY_NAMESPACE_KEY = "TEAM_DISCOVERY", t.TRACKS_NAMESPACE_KEY = "ADMIN_MEGAPHONE_TRACKS", t.VAULT_NAMESPACE_KEY = "VAULT"
})), define("modules/clean/redux/selectors", ["require", "exports", "tslib", "external/lodash", "modules/core/exception"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.getOptions = function(e, t) {
        return t
    };
    var i = n.memoize((function(e) {
        o.reportStack("User attempted to call a selector when reducer is not registered", {
            tags: ["redux"],
            exc_extra: {
                namespace: e
            }
        })
    }));
    t.getStateAtNamespace = function(e, t) {
        return e[t] || i(t), e[t]
    }
})), define("modules/clean/redux/store", ["require", "exports", "tslib", "redux", "redux-thunk", "modules/clean/redux/devtools"], (function(e, t, r, n, o, i) {
    "use strict";
    var s;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importDefault(o);
    var a = {},
        u = {};

    function c() {
        return r.__assign({}, u)
    }

    function l(e) {
        var t = n.combineReducers(e);
        return n.createStore(t, i.composeEnhancersWithDevTools(n.applyMiddleware(o.default.withExtraArgument(c))))
    }

    function p(e) {
        var t = (function(e) {
            for (var t = [], r = {}, n = 0, o = Object.keys(e); n < o.length; n++) {
                var i = o[n],
                    s = a[i],
                    u = e[i];
                null != s ? s !== u && t.push(i) : r[i] = u
            }
            if (t.length) throw new Error("Attempted to register new reducer for allocated keys " + JSON.stringify(t));
            return r
        })(e);
        a = r.__assign(r.__assign({}, a), t), s.replaceReducer(n.combineReducers(a))
    }
    t.getStoreAndRegisterReducers = function(e, t) {
        var n;
        return void 0 !== t && (n = t, u = r.__assign(r.__assign({}, u), n)), null != s ? (p(e), s) : (s = l(e), a = e, s)
    }, t.testStoreContructor = l
})), define("modules/clean/redux/unsupported", ["require", "exports", "redux"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createStore = r.createStore
})), define("modules/clean/react/sprite_div", ["require", "exports", "tslib", "classnames", "react", "modules/clean/react/sprite"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n);
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.group,
                r = e.name,
                s = e.text,
                a = e.alt,
                u = n.default("sprite-frame", "small", "icon-" + this.props.spritePosition),
                c = o.default.createElement("div", {
                    key: "sprite",
                    className: u
                }, o.default.createElement(i.Sprite, {
                    group: t,
                    name: r,
                    alt: a
                })),
                l = o.default.createElement("div", {
                    key: "sprite-text",
                    className: "sprite-text"
                }, s),
                p = null;
            switch (this.props.spritePosition) {
                case "left":
                    p = [c, l];
                    break;
                case "right":
                    p = [l, c]
            }
            return o.default.createElement("div", {
                className: "sprite-div"
            }, p)
        }, t.displayName = "SpriteDiv", t.defaultProps = {
            alt: "",
            spritePosition: "left"
        }, t
    })((o = r.__importDefault(o)).default.Component);
    t.default = s
})), define("modules/clean/react/image", ["require", "exports", "tslib", "react", "modules/core/exception"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o);
    var i = function(e) {
            return -1 !== e.indexOf("-vfl")
        },
        s = function(e) {
            return 0 === e.indexOf("https://assets.dropbox.com")
        },
        a = {};

    function u(e) {
        i(e) || s(e) || null != a[e] || (a[e] = !0, o.reportStack("Non-VFL path detected: " + e + ".  This usually means that the image doesn't exist and is 404ing; though another possibility is that the image exists but vfl cache busting isn't being applied, which can happen when the url is a relative url, since we generally don't vfl relative urls."))
    }
    var c = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e;
            u(this.props.src), this.props.src.endsWith(".svg") || !this.props.srcHiRes ? e = this.props.src : (u(this.props.srcHiRes), e = this.props.srcHiRes + " 2x");
            var t = this.props,
                o = (t.ref, t.srcHiRes, r.__rest(t, ["ref", "srcHiRes"]));
            return n.default.createElement("img", r.__assign({
                srcSet: e,
                alt: this.props.alt
            }, o))
        }, t.displayName = "Image", t.defaultProps = {
            alt: ""
        }, t
    })(n.default.Component);
    t.Image = c
}));
//# sourceMappingURL=pkg-coreui.min.js-vfl5C5TVx.map