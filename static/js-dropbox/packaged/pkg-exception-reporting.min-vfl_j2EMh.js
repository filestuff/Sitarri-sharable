(function(e, t) {
    if (e) {
        var n = {},
            r = e.TraceKit,
            i = [].slice;
        n.noConflict = function() {
            return e.TraceKit = r, n
        }, n.wrap = function(e) {
            return function() {
                try {
                    return e.apply(this, arguments)
                } catch (e) {
                    throw n.report(e), e
                }
            }
        }, n.report = (function() {
            var t, r, a = [],
                s = null,
                c = null,
                l = null;

            function u(e, t) {
                var r = null;
                if (!t || n.collectWindowErrors) {
                    for (var s in a)
                        if (o(a, s)) try {
                            a[s].apply(null, [e].concat(i.call(arguments, 2)))
                        } catch (e) {
                            r = e
                        }
                    if (r) throw r
                }
            }

            function f(e, r, i, o, a) {
                if (l) n.computeStackTrace.augmentStackTraceWithInitialElement(l, r, i, e), p();
                else if (a) u(n.computeStackTrace(a), !0);
                else {
                    var s = {
                        url: r,
                        line: i,
                        column: o
                    };
                    s.func = n.computeStackTrace.guessFunctionName(s.url, s.line), s.context = n.computeStackTrace.gatherContext(s.url, s.line), u({
                        mode: "onerror",
                        message: e,
                        stack: [s]
                    }, !0)
                }
                return !!t && t.apply(this, arguments)
            }

            function p() {
                var e = l,
                    t = s;
                s = null, l = null, c = null, u.apply(null, [e, !1].concat(t))
            }

            function d(t) {
                if (l) {
                    if (c === t) return;
                    p()
                }
                var r = n.computeStackTrace(t);
                throw l = r, c = t, s = i.call(arguments, 1), e.setTimeout((function() {
                    c === t && p()
                }), r.incomplete ? 2e3 : 0), t
            }
            return d.subscribe = function(n) {
                (function() {
                    if (!0 === r) return;
                    t = e.onerror, e.onerror = f, r = !0
                })(), a.push(n)
            }, d.unsubscribe = function(e) {
                for (var t = a.length - 1; t >= 0; --t) a[t] === e && a.splice(t, 1)
            }, d
        })(), n.computeStackTrace = (function() {
            var t = {};

            function r(r) {
                if ("string" != typeof r) return [];
                if (!o(t, r)) {
                    var i = "",
                        a = "";
                    try {
                        a = e.document.domain
                    } catch (e) {}
                    var s = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(r);
                    s && s[2] === a && (i = (function(t) {
                        if (!n.remoteFetching) return "";
                        try {
                            var r = (function() {
                                try {
                                    return new e.XMLHttpRequest
                                } catch (t) {
                                    return new e.ActiveXObject("Microsoft.XMLHTTP")
                                }
                            })();
                            return r.open("GET", t, !1), r.send(""), r.responseText
                        } catch (e) {
                            return ""
                        }
                    })(r)), t[r] = i ? i.split("\n") : []
                }
                return t[r]
            }

            function i(e, t) {
                var n, i = /function ([^(]*)\(([^)]*)\)/,
                    o = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,
                    s = "",
                    c = r(e);
                if (!c.length) return "?";
                for (var l = 0; l < 10; ++l)
                    if (!a(s = c[t - l] + s)) {
                        if (n = o.exec(s)) return n[1];
                        if (n = i.exec(s)) return n[1]
                    }
                return "?"
            }

            function s(e, t) {
                var i = r(e);
                if (!i.length) return null;
                var o = [],
                    s = Math.floor(n.linesOfContext / 2),
                    c = s + n.linesOfContext % 2,
                    l = Math.max(0, t - s - 1),
                    u = Math.min(i.length, t + c - 1);
                t -= 1;
                for (var f = l; f < u; ++f) a(i[f]) || o.push(i[f]);
                return o.length > 0 ? o : null
            }

            function c(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, "\\$&")
            }

            function l(e) {
                return c(e).replace("<", "(?:<|&lt;)").replace(">", "(?:>|&gt;)").replace("&", "(?:&|&amp;)").replace('"', '(?:"|&quot;)').replace(/\s+/g, "\\s+")
            }

            function u(e, t) {
                for (var n, i, o = 0, a = t.length; o < a; ++o)
                    if ((n = r(t[o])).length && (n = n.join("\n"), i = e.exec(n))) return {
                        url: t[o],
                        line: n.substring(0, i.index).split("\n").length,
                        column: i.index - n.lastIndexOf("\n", i.index) - 1
                    };
                return null
            }

            function f(e, t, n) {
                var i, o = r(t),
                    a = new RegExp("\\b" + c(e) + "\\b");
                return n -= 1, o && o.length > n && (i = a.exec(o[n])) ? i.index : null
            }

            function p(t) {
                if (!a(e && e.document)) {
                    for (var n, r, i, o, s = [e.location.href], f = e.document.getElementsByTagName("script"), p = "" + t, d = 0; d < f.length; ++d) {
                        var h = f[d];
                        h.src && s.push(h.src)
                    }
                    if (i = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(p)) {
                        var g = i[1] ? "\\s+" + i[1] : "",
                            m = i[2].split(",").join("\\s*,\\s*");
                        n = c(i[3]).replace(/;$/, ";?"), r = new RegExp("function" + g + "\\s*\\(\\s*" + m + "\\s*\\)\\s*{\\s*" + n + "\\s*}")
                    } else r = new RegExp(c(p).replace(/\s+/g, "\\s+"));
                    if (o = u(r, s)) return o;
                    if (i = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/.exec(p)) {
                        var _ = i[1];
                        if (n = l(i[2]), o = u(r = new RegExp("on" + _ + "=[\\'\"]\\s*" + n + "\\s*[\\'\"]", "i"), s[0])) return o;
                        if (o = u(r = new RegExp(n), s)) return o
                    }
                    return null
                }
            }

            function d(e, t, n, r) {
                var o = {
                    url: t,
                    line: n
                };
                if (o.url && o.line) {
                    e.incomplete = !1, o.func || (o.func = i(o.url, o.line)), o.context || (o.context = s(o.url, o.line));
                    var a = / '([^']+)' /.exec(r);
                    if (a && (o.column = f(a[1], o.url, o.line)), e.stack.length > 0 && e.stack[0].url === o.url) {
                        if (e.stack[0].line === o.line) return !1;
                        if (!e.stack[0].line && e.stack[0].func === o.func) return e.stack[0].line = o.line, e.stack[0].context = o.context, !1
                    }
                    return e.stack.unshift(o), e.partial = !0, !0
                }
                return e.incomplete = !0, !1
            }

            function h(e, t) {
                for (var r, o, a, s = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, c = [], l = {}, u = !1, m = h.caller; m && !u; m = m.caller)
                    if (m !== g && m !== n.report) {
                        if (o = {
                                url: null,
                                func: "?",
                                args: [],
                                line: null,
                                column: null
                            }, m.name ? o.func = m.name : (r = s.exec(m.toString())) && (o.func = r[1]), void 0 === o.func) try {
                            o.func = r.input.substring(0, r.input.indexOf("{"))
                        } catch (e) {}
                        if (a = p(m)) {
                            o.url = a.url, o.line = a.line, "?" === o.func && (o.func = i(o.url, o.line));
                            var _ = / '([^']+)' /.exec(e.message || e.description);
                            _ && (o.column = f(_[1], a.url, a.line))
                        }
                        l["" + m] ? u = !0 : l["" + m] = !0, c.push(o)
                    }
                t && c.splice(0, t);
                var v = {
                    mode: "callers",
                    name: e.name,
                    message: e.message,
                    stack: c
                };
                return d(v, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), v
            }

            function g(t, n) {
                var c = null;
                n = null == n ? 0 : +n;
                try {
                    if (c = (function(e) {
                            var t = e.stacktrace;
                            if (t) {
                                for (var n, r = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, o = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, a = t.split("\n"), c = [], l = 0; l < a.length; l += 2) {
                                    var u = null;
                                    if ((n = r.exec(a[l])) ? u = {
                                            url: n[2],
                                            line: +n[1],
                                            column: null,
                                            func: n[3],
                                            args: []
                                        } : (n = o.exec(a[l])) && (u = {
                                            url: n[6],
                                            line: +n[1],
                                            column: +n[2],
                                            func: n[3] || n[4],
                                            args: n[5] ? n[5].split(",") : []
                                        }), u) {
                                        if (!u.func && u.line && (u.func = i(u.url, u.line)), u.line) try {
                                            u.context = s(u.url, u.line)
                                        } catch (e) {}
                                        u.context || (u.context = [a[l + 1]]), c.push(u)
                                    }
                                }
                                return c.length ? {
                                    mode: "stacktrace",
                                    name: e.name,
                                    message: e.message,
                                    stack: c
                                } : null
                            }
                        })(t)) return c
                } catch (e) {
                    0
                }
                try {
                    if (c = (function(e) {
                            if (!e.stack) return null;
                            for (var t, n, r = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, o = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i, c = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|https?|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, l = e.stack.split("\n"), u = [], p = /^(.*) is undefined$/.exec(e.message), d = 0, h = l.length; d < h; ++d) {
                                if (t = r.exec(l[d])) {
                                    var g = t[2] && -1 !== t[2].indexOf("native");
                                    n = {
                                        url: g ? null : t[2],
                                        func: t[1] || "?",
                                        args: g ? [t[2]] : [],
                                        line: t[3] ? +t[3] : null,
                                        column: t[4] ? +t[4] : null
                                    }
                                } else if (t = c.exec(l[d])) n = {
                                    url: t[2],
                                    func: t[1] || "?",
                                    args: [],
                                    line: +t[3],
                                    column: t[4] ? +t[4] : null
                                };
                                else {
                                    if (!(t = o.exec(l[d]))) continue;
                                    n = {
                                        url: t[3],
                                        func: t[1] || "?",
                                        args: t[2] ? t[2].split(",") : [],
                                        line: t[4] ? +t[4] : null,
                                        column: t[5] ? +t[5] : null
                                    }
                                }!n.func && n.line && (n.func = i(n.url, n.line)), n.line && (n.context = s(n.url, n.line)), u.push(n)
                            }
                            return u.length ? (u[0] && u[0].line && !u[0].column && p ? u[0].column = f(p[1], u[0].url, u[0].line) : u[0].column || a(e.columnNumber) || (u[0].column = e.columnNumber + 1), {
                                mode: "stack",
                                name: e.name,
                                message: e.message,
                                stack: u
                            }) : null
                        })(t)) return c
                } catch (e) {
                    0
                }
                try {
                    if (c = (function(t) {
                            var n = t.message.split("\n");
                            if (n.length < 4) return null;
                            var a, c = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                                f = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                                p = /^\s*Line (\d+) of function script\s*$/i,
                                d = [],
                                h = e && e.document && e.document.getElementsByTagName("script"),
                                g = [];
                            for (var m in h) o(h, m) && !h[m].src && g.push(h[m]);
                            for (var _ = 2; _ < n.length; _ += 2) {
                                var v = null;
                                if (a = c.exec(n[_])) v = {
                                    url: a[2],
                                    func: a[3],
                                    args: [],
                                    line: +a[1],
                                    column: null
                                };
                                else if (a = f.exec(n[_])) {
                                    v = {
                                        url: a[3],
                                        func: a[4],
                                        args: [],
                                        line: +a[1],
                                        column: null
                                    };
                                    var x = +a[1],
                                        E = g[a[2] - 1];
                                    if (E) {
                                        var w = r(v.url);
                                        if (w) {
                                            var y = (w = w.join("\n")).indexOf(E.innerText);
                                            y >= 0 && (v.line = x + w.substring(0, y).split("\n").length)
                                        }
                                    }
                                } else if (a = p.exec(n[_])) {
                                    var b = e.location.href.replace(/#.*$/, ""),
                                        k = u(new RegExp(l(n[_ + 1])), [b]);
                                    v = {
                                        url: b,
                                        func: "",
                                        args: [],
                                        line: k ? k.line : a[1],
                                        column: null
                                    }
                                }
                                if (v) {
                                    v.func || (v.func = i(v.url, v.line));
                                    var D = s(v.url, v.line),
                                        S = D ? D[Math.floor(D.length / 2)] : null;
                                    D && S.replace(/^\s*/, "") === n[_ + 1].replace(/^\s*/, "") ? v.context = D : v.context = [n[_ + 1]], d.push(v)
                                }
                            }
                            return d.length ? {
                                mode: "multiline",
                                name: t.name,
                                message: n[0],
                                stack: d
                            } : null
                        })(t)) return c
                } catch (e) {
                    0
                }
                try {
                    if (c = h(t, n + 1)) return c
                } catch (e) {
                    0
                }
                return {
                    mode: "failed"
                }
            }
            return g.augmentStackTraceWithInitialElement = d, g.guessFunctionName = i, g.gatherContext = s, g.ofCaller = function(e) {
                e = 1 + (null == e ? 0 : +e);
                try {
                    throw new Error
                } catch (t) {
                    return g(t, e + 1)
                }
            }, g.getSource = r, g
        })(), n.extendToAsynchronousCallbacks = function() {
            var t = function(t) {
                var r = e[t];
                e[t] = function() {
                    var e = i.call(arguments),
                        t = e[0];
                    return "function" == typeof t && (e[0] = n.wrap(t)), r.apply ? r.apply(this, e) : r(e[0], e[1])
                }
            };
            t("setTimeout"), t("setInterval")
        }, n.remoteFetching || (n.remoteFetching = !0), n.collectWindowErrors || (n.collectWindowErrors = !0), (!n.linesOfContext || n.linesOfContext < 1) && (n.linesOfContext = 11), "undefined" != typeof module && module.exports && this.module !== module ? module.exports = n : "function" == typeof define && define.amd ? define("TraceKit", [], n) : e.TraceKit = n
    }

    function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function a(e) {
        return void 0 === e
    }
})("undefined" != typeof window ? window : global), define("modules/core/exception_tag_registry", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = new Set;
    if (window.ensemble) {
        var r = window;
        r.REGISTERED_EXCEPTION_TAGS || (r.REGISTERED_EXCEPTION_TAGS = new Set), n = r.REGISTERED_EXCEPTION_TAGS
    }
    t.get_registered_tags = function() {
        var e = [];
        return n.forEach((function(t) {
            return e.push(t)
        })), e
    }, t.register_tag = function(e) {
        n.add(e)
    }, t.unregister_tag = function(e) {
        n.delete(e)
    }, t.clear_all_tags = function() {
        n.clear()
    }
})), define("modules/core/exception", ["require", "exports", "tslib", "modules/shims/tracekit", "modules/constants/page_load", "modules/constants/request", "modules/core/exception_tag_registry", "modules/core/xhr"], (function(e, t, n, r, i, o, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), i = n.__importStar(i), o = n.__importStar(o);
    var c = 0,
        l = [],
        u = void 0,
        f = void 0;

    function p(e, t) {
        for (var n = function(e) {
                if (!e) return !1;
                for (var n = 0, r = t; n < r.length; n++) {
                    var i = r[n];
                    if (-1 !== e.search(i)) return !0
                }
                return !1
            }; e.length > 0 && n(e[0].func);) e = e.slice(1);
        return e
    }
    t.SEVERITY = {
        CRITICAL: "critical",
        NONCRITICAL: "non-critical",
        USER_ERROR: "user-error",
        UNCAUGHT: "uncaught",
        OPERATIONAL: "operational"
    }, t.registerOnFailedAssert = function(e) {
        l.push(e)
    }, t.unregisterOnFailedAssert = function(e) {
        var t = l.indexOf(e);
        t >= 0 && l.splice(t, 1)
    }, t.reportException = function(e) {
        var i = e.err,
            o = e.force,
            a = e.tags,
            s = e.severity,
            c = e.exc_extra;
        if (!i.reported) {
            var u = r.default.computeStackTrace(i),
                f = null != (u && u.stack) ? u.stack : [];
            if (i.isAssertion) {
                var p = i;
                p.assertOptions && p.assertOptions.tags && (a = (a || []).concat(p.assertOptions.tags)), p.assertOptions && p.assertOptions.exc_extra && (c = n.__assign(n.__assign({}, c || {}), p.assertOptions.exc_extra)), l.forEach((function(e) {
                    return e(u)
                }))
            }
            t._reportException({
                msg: i.message,
                stack: f,
                force: o,
                tags: a,
                severity: s,
                exc_extra: c
            }), i.reported = !0
        }
    }, t._reportException = function(e) {
        var l = e.msg,
            d = e.stack,
            h = e.force,
            g = e.tags,
            m = e.severity,
            _ = e.exc_extra;
        if (!u || h) {
            var v = ["\\b_reportException\\b", "\\breportException\\b", "\\bassert\\b", "\\breportStack\\b"],
                x = [];
            d = p(d, v);
            try {
                throw new Error
            } catch (e) {
                var E = r.default.computeStackTrace(e);
                null != E && null != E.stack && (x = E.stack), x = p(x, v)
            }
            var w = d.length - x.length;
            w <= 0 && (w = 1);
            var y = d.slice(0, w),
                b = d.slice(w);
            g || (g = []), g = g.concat(a.get_registered_tags()), _ = _ ? n.__assign({}, _) : {}, window.DB_FRAME_BUST && (_.DB_FRAME_BUST = !0, m = t.SEVERITY.USER_ERROR), _.client_time = (new Date).toString(), _.client_utc_time = (new Date).toUTCString(), c += 1, _.exception_number = c, _ = f ? Object.assign(_, f) : Object.assign(_, {
                page_repo_rev: i.REPO_REV,
                page_load_timestamp: o.PAGE_LOAD_TIME,
                page_load_hostname: i.HOSTNAME,
                yaps_project: i.YAPS_PROJECT,
                yaps_deployment: i.YAPS_DEPLOYMENT,
                user_locale: i.USER_LOCALE
            });
            var k = {};
            for (var D in window.requireContexts)
                if (window.requireContexts.hasOwnProperty(D)) {
                    var S = {},
                        O = window.requireContexts[D].firstUndefinedModule;
                    O && (S.first_undefined_module = O), k[D] = S
                }
            _.page_alameda_failures = k;
            var T = window.ensemble;
            if (null != T && null != T.getPageletInfoForExceptionReporting) {
                var C = T.getPageletInfoForExceptionReporting();
                _.pagelet_info = C, _.page_load_timestamp = Math.floor(Math.max.apply(Math, C.map((function(e) {
                    return e.pagelet_client_load_time
                }))))
            }
            var $ = {
                e: l,
                loc: window.location.href,
                ref: document.referrer,
                stack: JSON.stringify(y.reverse()),
                context_tb: JSON.stringify(b.reverse()),
                tags: JSON.stringify(g),
                sev: m || "",
                exc_extra: JSON.stringify(_ || {})
            };
            s.sendXhr("/jse", $), u = l
        }
    }, t.cleanup_stack_trace = p, t.assert = function(e, t, n) {
        if (void 0 === n && (n = {}), !e) {
            0;
            var r = new Error("Assertion Error: " + t),
                i = n.tags,
                o = void 0 === i ? [] : i,
                a = n.exc_extra,
                s = void 0 === a ? null : a;
            throw r.assertOptions = {
                tags: o.concat("module:exception", "assert"),
                exc_extra: s
            }, r.isAssertion = !0, r
        }
    }, t.reportStack = function(e, n) {
        void 0 === n && (n = {}), n = {
            severity: n.severity || t.SEVERITY.NONCRITICAL,
            tags: n.tags || [],
            exc_extra: n.exc_extra || {},
            silent: !!n.silent
        };
        var r = new Error(e);
        t.reportException({
            err: r,
            force: !0,
            tags: (n.tags || []).concat("module:exception", "reportStack"),
            severity: n.severity,
            exc_extra: n.exc_extra
        })
    }, t.setEdisonExceptionExtras = function(e) {
        f = e
    }
})), define("modules/pagelet_config", ["require", "exports", "module"], (function(e, t, n) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.REQUIREJS_CONTEXT_NAME = r, window.ensemble && window.ensemble.isUsingWaaCServer || window.RUNNING_IN_EDISON ? t.REQUIREJS_CONTEXT_NAME = r = "_" : t.REQUIREJS_CONTEXT_NAME = r = n.config().REQUIREJS_CONFIG.context
})), define("modules/shims/tracekit", ["require", "exports", "tslib", "tracekit"], (function(e, t, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (r = n.__importDefault(r)).default.linesOfContext = 1, r.default.remoteFetching = !1, r.default.noConflict(), t.default = r.default
})), (function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define("flux", [], e);
    else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.Flux = e()
    }
})((function() {
    return (function e(t, n, r) {
        function i(a, s) {
            if (!n[a]) {
                if (!t[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (o) return o(a, !0);
                    var l = new Error("Cannot find module '" + a + "'");
                    throw l.code = "MODULE_NOT_FOUND", l
                }
                var u = n[a] = {
                    exports: {}
                };
                t[a][0].call(u.exports, (function(e) {
                    var n = t[a][1][e];
                    return i(n || e)
                }), u, u.exports, e, t, n, r)
            }
            return n[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i
    })({
        1: [function(e, t, n) {
            t.exports.Dispatcher = e("./lib/Dispatcher")
        }, {
            "./lib/Dispatcher": 2
        }],
        2: [function(e, t, n) {
            "use strict";
            var r = e("./invariant"),
                i = 1;

            function o() {
                this.$Dispatcher_callbacks = {}, this.$Dispatcher_isPending = {}, this.$Dispatcher_isHandled = {}, this.$Dispatcher_isDispatching = !1, this.$Dispatcher_pendingPayload = null
            }
            o.prototype.register = function(e) {
                var t = "ID_" + i++;
                return this.$Dispatcher_callbacks[t] = e, t
            }, o.prototype.unregister = function(e) {
                r(this.$Dispatcher_callbacks[e], "Dispatcher.unregister(...): `%s` does not map to a registered callback.", e), delete this.$Dispatcher_callbacks[e]
            }, o.prototype.waitFor = function(e) {
                r(this.$Dispatcher_isDispatching, "Dispatcher.waitFor(...): Must be invoked while dispatching.");
                for (var t = 0; t < e.length; t++) {
                    var n = e[t];
                    this.$Dispatcher_isPending[n] ? r(this.$Dispatcher_isHandled[n], "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.", n) : (r(this.$Dispatcher_callbacks[n], "Dispatcher.waitFor(...): `%s` does not map to a registered callback.", n), this.$Dispatcher_invokeCallback(n))
                }
            }, o.prototype.dispatch = function(e) {
                r(!this.$Dispatcher_isDispatching, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."), this.$Dispatcher_startDispatching(e);
                try {
                    for (var t in this.$Dispatcher_callbacks) this.$Dispatcher_isPending[t] || this.$Dispatcher_invokeCallback(t)
                } finally {
                    this.$Dispatcher_stopDispatching()
                }
            }, o.prototype.isDispatching = function() {
                return this.$Dispatcher_isDispatching
            }, o.prototype.$Dispatcher_invokeCallback = function(e) {
                this.$Dispatcher_isPending[e] = !0, this.$Dispatcher_callbacks[e](this.$Dispatcher_pendingPayload), this.$Dispatcher_isHandled[e] = !0
            }, o.prototype.$Dispatcher_startDispatching = function(e) {
                for (var t in this.$Dispatcher_callbacks) this.$Dispatcher_isPending[t] = !1, this.$Dispatcher_isHandled[t] = !1;
                this.$Dispatcher_pendingPayload = e, this.$Dispatcher_isDispatching = !0
            }, o.prototype.$Dispatcher_stopDispatching = function() {
                this.$Dispatcher_pendingPayload = null, this.$Dispatcher_isDispatching = !1
            }, t.exports = o
        }, {
            "./invariant": 3
        }],
        3: [function(e, t, n) {
            "use strict";
            t.exports = function(e, t, n, r, i, o, a, s) {
                if (!e) {
                    var c;
                    if (void 0 === t) c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                    else {
                        var l = [n, r, i, o, a, s],
                            u = 0;
                        c = new Error("Invariant Violation: " + t.replace(/%s/g, (function() {
                            return l[u++]
                        })))
                    }
                    throw c.framesToPop = 1, c
                }
            }
        }, {}]
    }, {}, [1])(1)
})), define("modules/core/cookies", ["require", "exports", "tslib"], (function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var assert = function(e, t) {
            if (!e) throw new Error(t)
        },
        r = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/,
        i = ["=", ";"],
        o = function(e, t, n) {
            void 0 === n && (n = !1), assert("string" == typeof e, t + " must be a string, but was " + typeof e), assert(n || e.length > 0, t + " must not be empty"), assert(!(function(e) {
                if (null == e) return !1;
                for (var t = 0, n = i; t < n.length; t++) {
                    var r = n[t];
                    if (-1 !== e.indexOf(r)) return !0
                }
                return !1
            })(e), t + " contains illegal characters")
        },
        a = function(e) {
            return o(e, "Cookie name", !1)
        },
        s = function(e, t, n) {
            var r, i, s;
            void 0 === n && (n = {}), a(e), (function(e) {
                o(e, "Cookie value", !0)
            })(t), n.expires && (r = n.expires, o(r, "Cookie expiration date", !1)), n.domain && (i = n.domain, o(i, "Cookie domain", !1)), n.path && (s = n.path, o(s, "Cookie path", !1)), document.cookie = [e + "=" + t, n.expires ? "expires=" + n.expires : void 0, n.domain ? "domain=" + n.domain : void 0, n.path ? "path=" + n.path : void 0].join("; ")
        },
        c = new Date(1).toUTCString();
    t.Cookies = {
        create: function(e, t, n, r, i) {
            var o;
            if (void 0 === i && (i = "/"), null != n) {
                assert("number" == typeof n, "Cookie expiration must be a number");
                var a = new Date;
                a.setTime(a.getTime() + 24 * n * 60 * 60 * 1e3), o = a.toUTCString()
            }
            s(e, t, {
                expires: o,
                path: i,
                domain: r
            })
        },
        read: function(e) {
            a(e);
            for (var n = [], r = 0, i = document.cookie.split(";"); r < i.length; r++) {
                var o = i[r],
                    s = o.split("=", 1)[0];
                s.trim() === e && n.push(o.substring(s.length + 1, o.length).trim())
            }
            for (var c = !1, l = [], u = 0, f = n; u < f.length; u++) {
                var p = f[u];
                "" === p ? c = !0 : l.push(p)
            }
            return 1 === l.length ? l[0] : l.length > 1 ? (t.Cookies.delete(e), null) : c ? "" : null
        },
        delete: function(e) {
            for (var t = n.__spreadArrays([null], (function(e) {
                    if (e.match(r)) return [e];
                    for (var t = e.split("."), n = [], i = 0; i < t.length; i++) n.push(t.slice(i).join("."));
                    return n
                })(window.location.hostname)), i = n.__spreadArrays([null], (function(e) {
                    for (var t = e.split("/"), n = [], r = 0; r < t.length; r++) {
                        var i = t.slice(0, t.length - r).join("/");
                        "" !== i && n.push(i), n.push(i + "/")
                    }
                    return n
                })(window.location.pathname)), o = 0, a = t; o < a.length; o++)
                for (var l = a[o], u = 0, f = i; u < f.length; u++) {
                    var p = f[u];
                    s(e, "", {
                        expires: c,
                        domain: l,
                        path: p
                    })
                }
        },
        are_enabled: function() {
            return navigator.cookieEnabled ? navigator.cookieEnabled : (document.cookie = "this_is_a_test_cookie", -1 !== document.cookie.indexOf("this_is_a_test_cookie"))
        }
    }
})), define("modules/core/xhr", ["require", "exports", "modules/clean/csrf"], (function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e) {};
    t.sendXhr = function(e, t, i) {
        var o, a;
        void 0 === i && (i = r), n.assertDropboxDomain(e), o = t, a = n.readCsrfToken(), o.is_xhr = !0, o.t = a;
        var s = (function(e) {
                var t = [];
                for (var n in e) e.hasOwnProperty(n) && void 0 !== e[n] && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(String(e[n])));
                return t.join("&")
            })(t),
            c = new XMLHttpRequest;
        return c.onreadystatechange = function() {
            c.readyState === XMLHttpRequest.DONE && i(c.status)
        }, c.open("POST", e), c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), c.send(s), c
    }
})), define("modules/clean/csrf", ["require", "exports", "modules/core/cookies"], (function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.readCsrfToken = function() {
        return n.Cookies.read("__Host-js_csrf")
    }, t.assertDropboxDomain = function(e) {
        var t = document.createElement("a");
        t.href = e;
        var n = t.hostname || window.location.hostname;
        if (-1 === n.indexOf(".dropbox.com", n.length - ".dropbox.com".length)) throw new Error("Cannot send the CSRF token to " + n)
    }
}));
//# sourceMappingURL=pkg-exception-reporting.min.js-vfllfzCkM.map