(function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define("eventemitter3", [], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).EventEmitter3 = e()
    }
})((function() {
    return (function e(t, r, n) {
        function s(o, a) {
            if (!r[o]) {
                if (!t[o]) {
                    var _ = "function" == typeof require && require;
                    if (!a && _) return _(o, !0);
                    if (i) return i(o, !0);
                    var c = new Error("Cannot find module '" + o + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var E = r[o] = {
                    exports: {}
                };
                t[o][0].call(E.exports, (function(e) {
                    return s(t[o][1][e] || e)
                }), E, E.exports, e, t, r, n)
            }
            return r[o].exports
        }
        for (var i = "function" == typeof require && require, o = 0; o < n.length; o++) s(n[o]);
        return s
    })({
        1: [function(e, t, r) {
            "use strict";
            var n = Object.prototype.hasOwnProperty,
                s = "~";

            function i() {}

            function o(e, t, r) {
                this.fn = e, this.context = t, this.once = r || !1
            }

            function a(e, t, r, n, i) {
                if ("function" != typeof r) throw new TypeError("The listener must be a function");
                var a = new o(r, n || e, i),
                    _ = s ? s + t : t;
                return e._events[_] ? e._events[_].fn ? e._events[_] = [e._events[_], a] : e._events[_].push(a) : (e._events[_] = a, e._eventsCount++), e
            }

            function _(e, t) {
                0 == --e._eventsCount ? e._events = new i : delete e._events[t]
            }

            function c() {
                this._events = new i, this._eventsCount = 0
            }
            Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (s = !1)), c.prototype.eventNames = function() {
                var e, t, r = [];
                if (0 === this._eventsCount) return r;
                for (t in e = this._events) n.call(e, t) && r.push(s ? t.slice(1) : t);
                return Object.getOwnPropertySymbols ? r.concat(Object.getOwnPropertySymbols(e)) : r
            }, c.prototype.listeners = function(e) {
                var t = s ? s + e : e,
                    r = this._events[t];
                if (!r) return [];
                if (r.fn) return [r.fn];
                for (var n = 0, i = r.length, o = new Array(i); n < i; n++) o[n] = r[n].fn;
                return o
            }, c.prototype.listenerCount = function(e) {
                var t = s ? s + e : e,
                    r = this._events[t];
                return r ? r.fn ? 1 : r.length : 0
            }, c.prototype.emit = function(e, t, r, n, i, o) {
                var a = s ? s + e : e;
                if (!this._events[a]) return !1;
                var _, c, E = this._events[a],
                    l = arguments.length;
                if (E.fn) {
                    switch (E.once && this.removeListener(e, E.fn, void 0, !0), l) {
                        case 1:
                            return E.fn.call(E.context), !0;
                        case 2:
                            return E.fn.call(E.context, t), !0;
                        case 3:
                            return E.fn.call(E.context, t, r), !0;
                        case 4:
                            return E.fn.call(E.context, t, r, n), !0;
                        case 5:
                            return E.fn.call(E.context, t, r, n, i), !0;
                        case 6:
                            return E.fn.call(E.context, t, r, n, i, o), !0
                    }
                    for (c = 1, _ = new Array(l - 1); c < l; c++) _[c - 1] = arguments[c];
                    E.fn.apply(E.context, _)
                } else {
                    var u, d = E.length;
                    for (c = 0; c < d; c++) switch (E[c].once && this.removeListener(e, E[c].fn, void 0, !0), l) {
                        case 1:
                            E[c].fn.call(E[c].context);
                            break;
                        case 2:
                            E[c].fn.call(E[c].context, t);
                            break;
                        case 3:
                            E[c].fn.call(E[c].context, t, r);
                            break;
                        case 4:
                            E[c].fn.call(E[c].context, t, r, n);
                            break;
                        default:
                            if (!_)
                                for (u = 1, _ = new Array(l - 1); u < l; u++) _[u - 1] = arguments[u];
                            E[c].fn.apply(E[c].context, _)
                    }
                }
                return !0
            }, c.prototype.on = function(e, t, r) {
                return a(this, e, t, r, !1)
            }, c.prototype.once = function(e, t, r) {
                return a(this, e, t, r, !0)
            }, c.prototype.removeListener = function(e, t, r, n) {
                var i = s ? s + e : e;
                if (!this._events[i]) return this;
                if (!t) return _(this, i), this;
                var o = this._events[i];
                if (o.fn) o.fn !== t || n && !o.once || r && o.context !== r || _(this, i);
                else {
                    for (var a = 0, c = [], E = o.length; a < E; a++)(o[a].fn !== t || n && !o[a].once || r && o[a].context !== r) && c.push(o[a]);
                    c.length ? this._events[i] = 1 === c.length ? c[0] : c : _(this, i)
                }
                return this
            }, c.prototype.removeAllListeners = function(e) {
                var t;
                return e ? (t = s ? s + e : e, this._events[t] && _(this, t)) : (this._events = new i, this._eventsCount = 0), this
            }, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = s, c.EventEmitter = c, void 0 !== t && (t.exports = c)
        }, {}]
    }, {}, [1])(1)
})), define("deep-freeze", (function() {
    return (function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var s = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(s.exports, s, s.exports, r), s.l = !0, s.exports
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
                for (var s in e) r.d(n, s, function(t) {
                    return e[t]
                }.bind(null, s));
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
        "./deep-freeze.js": function(e, t) {
            e.exports = function e(t) {
                return Object.freeze(t), Object.getOwnPropertyNames(t).forEach((function(r) {
                    !t.hasOwnProperty(r) || null === t[r] || "object" != typeof t[r] && "function" != typeof t[r] || Object.isFrozen(t[r]) || e(t[r])
                })), t
            }
        },
        0: function(e, t, r) {
            e.exports = r("./deep-freeze.js")
        }
    })
})), define("modules/clean/accessibility/utils", ["require", "exports", "modules/clean/keycode"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.accessibleColorPalette = ["#006AFF", "#0073E1", "#007BC3", "#007F9B", "#008578", "#008750", "#008928", "#008800", "#0573EB", "#0579C3", "#0580A0", "#05857D", "#058655", "#058932", "#05890A", "#0A71F0", "#0A78CD", "#0A7FAA", "#0A8487", "#0A855F", "#0A8737", "#0A880F", "#0F6EF5", "#0F76D7", "#0F7DB4", "#0F818C", "#0F8669", "#0F8741", "#0F8819", "#146DFF", "#1475DC", "#147BBE", "#14819B", "#148473", "#14864B", "#148723", "#1969FF", "#1972E1", "#1979C3", "#1980A0", "#198278", "#198550", "#198728", "#198700", "#1E70E6", "#1E79C8", "#1E7FA5", "#1E837D", "#1E8555", "#1E8832", "#1E880A", "#236EEB", "#2376D2", "#237CAF", "#238187", "#23845F", "#23883C", "#238914", "#286DF5", "#2876D7", "#287CB4", "#28808C", "#288469", "#288541", "#288619", "#2D6AFA", "#2D73DC", "#2D7BB9", "#2D8096", "#2D836E", "#2D8446", "#2D8823", "#3267FF", "#3271E1", "#3279C3", "#327D9B", "#328378", "#328550", "#328528", "#328600", "#376EE6", "#3777C8", "#377DA5", "#37807D", "#37855A", "#378632", "#37860A", "#3C6CEB", "#3C74CD", "#3C7BAA", "#3C8087", "#3C835F", "#3C8437", "#3C8614", "#416AF5", "#4173D7", "#4179B9", "#417E91", "#418069", "#418341", "#418419", "#4667FA", "#466FDC", "#4676BE", "#467B9B", "#468073", "#46824B", "#468423", "#4B63FF", "#4B6DE1", "#4B75BE", "#4B7B9B", "#4B8078", "#4B8150", "#4B8228", "#4B8300", "#5069E6", "#5072C8", "#5079A5", "#507C7D", "#50815A", "#508232", "#50830A", "#5567F0", "#556FD2", "#5575AA", "#557A87", "#557E5F", "#55823C", "#558314", "#5A65F5", "#5A6DD7", "#5A75B4", "#5A7A91", "#5A7D69", "#5A7F41", "#5A821E", "#5F61FA", "#5F69DC", "#5F71BE", "#5F779B", "#5F7E50", "#5F7F28", "#5F8100", "#6466E6", "#646DC3", "#6475A5", "#647D55", "#647E2D", "#648005", "#6964EB", "#696BC8", "#6972A5", "#697C55", "#697E2D", "#697F05", "#6E62EB", "#6E6AC8", "#6E71A5", "#6E7C46", "#6E7E1E", "#7358FF", "#7363E1", "#736ABE", "#7372A0", "#785CEB", "#7864CD", "#786DAF", "#7D53FF", "#7D5EE1", "#7D66C3", "#7D6EA0", "#8255F5", "#825FD7", "#8268B9", "#826D91", "#8756F0", "#8760D2", "#8766AA", "#8C4AFF", "#8C56E6", "#8C60C8", "#8C66A0", "#914BF5", "#9157DC", "#9160BE", "#916596", "#964BEB", "#9655D2", "#965EAF", "#966691", "#9B47F0", "#9B51D2", "#9B5CB4", "#9B6191", "#A041F5", "#A04EDC", "#A058B9", "#A06196", "#A53BF5", "#A548DC", "#A553BE", "#A55A96", "#AA34FA", "#AA42E6", "#AA4FC8", "#AA58A0", "#AA5F78", "#AA614B", "#AA6623", "#AF29FF", "#AF38E6", "#AF47D2", "#AF52AF", "#AF5782", "#AF5E5A", "#AF622D", "#AF6400", "#B42CF0", "#B43CD7", "#B447B4", "#B45291", "#B45864", "#B45D37", "#B45D05", "#B919FF", "#B92CE6", "#B93BC8", "#B94AAA", "#B9547D", "#B95B4B", "#B95A14", "#BE0CF0", "#BE1FEB", "#BE31CD", "#BE41B4", "#BE4C87", "#BE5455", "#BE561E", "#C307EB", "#C31AE1", "#C32CC8", "#C33DB4", "#C3488C", "#C34F5A", "#C35428", "#C803E1", "#C816E1", "#C826C3", "#C836AF", "#C8428C", "#C8495F", "#C84F32", "#C85200", "#CD11C8", "#CD22C8", "#CD31AF", "#CD3B87", "#CD4664", "#CD4B37", "#CD4D0A", "#D20CC3", "#D21CB4", "#D229A0", "#D23587", "#D23E64", "#D23F37", "#D2430F", "#D708AF", "#D716A0", "#D72291", "#D73087", "#D7355F", "#D73A3C", "#D73A14", "#DC0596", "#DC119B", "#DC1D91", "#DC256E", "#DC2E5A", "#DC343C", "#DC3419", "#E1027D", "#E10C87", "#E11882", "#E11B5A", "#E12755", "#E12A37", "#E12919", "#E13200", "#E6075F", "#E60C4B", "#E61655", "#E61D46", "#E62132", "#E61B14", "#E61A00", "#EB0232", "#EB0214", "#EB0D30"], t.accessibleBrandedColorPalette = ["#61082B", "#CEB4FF", "#FFAFA2", "#FFD830", "#FFCB95", "#D8BEA2", "#0D2481", "#B4D0E7", "#A2D39B", "#005744", "#D0D0D3", "#813BF6"], t.accessibleTriggerProps = function(e, t) {
        return void 0 === t && (t = "button"), {
            role: t,
            tabIndex: 0,
            onClick: function(t) {
                return e(t)
            },
            onKeyDown: function(t) {
                if (t.keyCode === r.KeyCode.ENTER || t.keyCode === r.KeyCode.SPACE) return e(t)
            }
        }
    }
})), define("modules/clean/browse_uri_interface", ["require", "exports", "tslib", "modules/clean/previews/data/preview_type_util", "modules/clean/react/browse/uri_helper", "modules/clean/viewer", "modules/core/uri"], (function(e, t, r, n, s, i, o) {
    "use strict";

    function a(e) {
        return s.browse_root(i.Viewer.get_viewer(), e)
    }

    function _(e, t, n) {
        void 0 === n && (n = {});
        return "/" !== t.charAt(0) && (t = "/" + t), new o.URI({
            scheme: "https",
            authority: "www.dropbox.com",
            path: "/preview" + t,
            query: r.__assign(r.__assign({}, n), {
                role: e.role
            })
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.get_browse_root = a, t.preview_uri_for_fq_path = _, t.href_for_file = function(e, t) {
        var r;
        return t.is_dir && (r = a(e) + o.URI.encode_parts(t.fq_path)), t.preview && n.isCloudDoc(t.preview) && (r = t.preview.content.exit_url || t.href), r || (r = _(e, t.fq_path).toString()), r
    }, t.browse_uri_for_fq_path = function(e, t) {
        return new o.URI({
            scheme: "https",
            authority: "www.dropbox.com",
            path: "" + a(e) + t
        })
    }
})), define("modules/clean/filetypes", ["require", "exports"], (function(e, t) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e[e.FILE = 1] = "FILE", e[e.FOLDER = 2] = "FOLDER", e[e.PACKAGE = 3] = "PACKAGE", e[e.SHARED_FOLDER = 4] = "SHARED_FOLDER", e[e.SANDBOX = 5] = "SANDBOX", e[e.TEAM_SHARED_FOLDER = 6] = "TEAM_SHARED_FOLDER", e[e.TEAM_MEMBER_FOLDER = 7] = "TEAM_MEMBER_FOLDER", e[e.VAULT_FOLDER = 8] = "VAULT_FOLDER"
    })(r = t.FileTypes || (t.FileTypes = {})), t.FileTypeMap = new Map([
        ["file", r.FILE],
        ["folder", r.FOLDER],
        ["package", r.PACKAGE],
        ["shared_folder", r.SHARED_FOLDER],
        ["sandbox", r.SANDBOX],
        ["team_shared_folder", r.TEAM_SHARED_FOLDER],
        ["team_member_folder", r.TEAM_MEMBER_FOLDER]
    ])
})), define("modules/clean/history", ["require", "exports", "tslib", "external/lodash", "modules/core/exception", "modules/core/uri", "modules/clean/ux_analytics/UxAnalyticsDispatcher", "modules/core/browser"], (function(e, t, r, n, s, i, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), a = r.__importStar(a);
    var _ = (function() {
        var e = new RegExp("#|;|\\?|:|@|&|=|\\+|\\$"),
            t = function() {
                var t = window.location.pathname,
                    r = window.location.search;
                return -1 !== t.search(e) && (t = String(new i.URI({
                    path: t
                }))), t + r
            },
            r = function(e, t) {
                return null == t && (t = void 0), String(i.URI.parse(e).setQuery(t))
            },
            _ = function(e) {
                void 0 === e && (e = t());
                var r = e.split("?");
                return {
                    url: e,
                    path: r[0],
                    qargs: i.URI.parse(e).getQuery()
                }
            },
            c = {},
            E = {},
            l = t(),
            u = null,
            d = "",
            S = function(e) {
                return d + "/" + e.substring(d.length).split("/")[1]
            },
            f = function(e) {
                var t = _(l),
                    r = S(t.path);
                if (r in e) {
                    var n = t.path.substr(r.length + 1);
                    return Array.from(e[r]).map((function(e) {
                        return e(n, t.qargs)
                    }))
                }
            },
            p = function() {
                return f(c)
            },
            h = function() {
                return f(E)
            },
            A = function(e, t, r) {
                if (r[e]) {
                    var n = r[e].indexOf(t);
                    return r[e].splice(n, 1)
                }
            },
            O = function(e, t) {
                if (S(e) !== S(t)) return h()
            },
            R = function() {
                var e = t();
                e !== l && (O(l, e), l = e, p(), T())
            };

        function T() {
            o.UxAnalyticsDispatcher.dispatchHistoryChange(a.get_href())
        }
        return o.UxAnalyticsDispatcher.initUrl(a.get_href()), {
            init: function() {
                if (!u) return l = t(), u = setInterval(R, 50)
            },
            _add_callback: function(e, t, r) {
                return this.init(), s.assert("string" == typeof e, "DBHistory prefix is not a string"), s.assert(0 === e.indexOf("/"), "DBHistory prefix must be absolute"), s.assert(-1 === e.substring(d.length).indexOf("/", 1), "multi-component prefixes arent supported"), r[e] || (r[e] = []), r[e].push(t)
            },
            add_callback: function(e, t, r) {
                if (void 0 === r && (r = !1), this._add_callback(e, t, c), !r) return p()
            },
            remove_callback: function(e, t) {
                return A(e, t, c)
            },
            remove_exit_callback: function(e, t) {
                return A(e, t, E)
            },
            add_exit_callback: function(e, t) {
                return this._add_callback(e, t, E)
            },
            fire_callbacks: function() {
                return p()
            },
            fire_exit_callbacks: function() {
                return h()
            },
            _build_url_for_state_change: function(e, t) {
                return s.assert("string" == typeof e, "DBHistory path is not a string"), s.assert(0 === e.indexOf("/"), "DBHistory path must be relative"), s.assert(-1 === e.indexOf("//"), "DBHistory path contains //"), r(e, t)
            },
            _pre_state_change: function(e) {
                return e !== l && (O(l, e), !0)
            },
            _post_state_change: function(e) {
                if (void 0 === e && (e = !0), l = t(), e) return p()
            },
            replace_state: function(e, t, r) {
                void 0 === r && (r = {}), r = n.defaults(r, {
                    immediatelyRestoreState: !0
                });
                var s = this._build_url_for_state_change(e, t);
                this._pre_state_change(s) && window.history.replaceState && (window.history.replaceState(null, null, s), this._post_state_change(r.immediatelyRestoreState), T())
            },
            push_state: function(e, t, r) {
                null == r && (r = {}), r = n.defaults(r, {
                    immediatelyRestoreState: !0
                }), s.assert(-1 === e.indexOf("?"), "DBHistory path contains ?"), s.assert(-1 === e.indexOf("#"), "DBHistory path contains #");
                var i = this._build_url_for_state_change(e, t);
                this._pre_state_change(i) && (window.history.pushState(null, null, i), this._post_state_change(r.immediatelyRestoreState), T())
            },
            update_query_param: function(e, t) {
                var r = this.deconstruct_url();
                return r.qargs[e] = t, this.replace_state(r.path, r.qargs)
            },
            remove_query_param: function(e) {
                var t = this.deconstruct_url();
                return delete t.qargs[e], this.replace_state(t.path, t.qargs)
            },
            reset: function() {
                [c, E].forEach((function(e) {
                    Object.keys(e).forEach((function(t) {
                        e[t].forEach((function(r) {
                            A(t, r, e)
                        }))
                    }))
                })), l = t(), u = null, d = ""
            },
            get_url: t,
            get_uri: function() {
                var e = i.URI.parse(t());
                return e.setPath(i.URI.encode_parts(e.getPath())), e
            },
            construct_url: r,
            deconstruct_url: _,
            set_base_prefix: function(e) {
                return d = e
            },
            URL_ESCAPE_REGEX: e
        }
    })();
    t.default = _
})), define("modules/clean/immutability_helper", ["require", "exports", "tslib", "deep-freeze"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n);
    var s = Array.prototype.slice;

    function i(e) {
        if (null == e) throw new TypeError("Cannot thaw null/undefined object");
        if (Array.isArray(e)) return s.call(e);
        for (var t = Object.create(Object.getPrototypeOf(e)), r = 0, n = Object.getOwnPropertyNames(e); r < n.length; r++) {
            var i = n[r],
                o = Object.getOwnPropertyDescriptor(e, i);
            o && (o.get || o.set) ? (o.configurable = !0, Object.defineProperty(t, i, o)) : t[i] = e[i]
        }
        return t
    }

    function o(e, t, r) {
        if (null == e) throw new TypeError("Object to `set` cannot be null");
        if (e[t] === r) return e;
        var s = i(e);
        return s[t] = r, n.default(s)
    }

    function a(e, t, r) {
        return o(e, t, r(e[t]))
    }

    function _(e, t, r) {
        if (!t || 0 === t.length) throw new TypeError("Invalid key path: " + JSON.stringify(t));
        if (null == e) throw new TypeError("Target object cannot be null");
        var n = t[0];
        return 1 === t.length ? a(e, n, r) : o(e, n, _(e[n], t.slice(1), r))
    }

    function c(e, t) {
        if (null == e || null == t) throw new TypeError("Both target and source cannot be null");
        var r = Object.keys(t).reduce((function(r, n) {
            return t[n] !== e[n] && r.push(n), r
        }), []);
        if (r.length) {
            for (var s = i(e), o = 0, a = r; o < a.length; o++) {
                var _ = a[o],
                    c = Object.getOwnPropertyDescriptor(t, _);
                void 0 !== c && Object.defineProperty(s, _, c)
            }
            return n.default(s)
        }
        return e
    }
    t.thaw = i, t.withMutations = function(e, t) {
        var r = i(e);
        return t(r), n.default(r)
    }, t.getIn = function(e, t) {
        if (!t || 0 === t.length) throw new TypeError("Invalid key path: " + JSON.stringify(t));
        return t.reduce((function(e, t) {
            return null == e ? null : e[t]
        }), e)
    }, t.set = o, t.update = a, t.updateIn = _, t.setIn = function e(t, r, n) {
        if (!r || 0 === r.length) throw new TypeError("Invalid key path: " + JSON.stringify(r));
        if (null == t) throw new TypeError("Target object cannot be null");
        var s = r[0];
        switch (r.length) {
            case 1:
                return o(t, s, n);
            default:
                return o(t, s, e(t[s] || {}, r.slice(1), n))
        }
    }, t.merge = c, t.mergeIn = function(e, t, r) {
        if (null == e || null == r) throw new TypeError("Both target and source cannot be null");
        return _(e, t, (function(e) {
            return c(e, r)
        }))
    }, t.splice = function(e, t, i) {
        for (var o = [], a = 3; a < arguments.length; a++) o[a - 3] = arguments[a];
        var _ = s.call(e);
        return _.splice.apply(_, r.__spreadArrays([t, i], o)), n.default(_)
    }, t.unshift = function(e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        var i = s.call(e);
        return i.unshift.apply(i, t), n.default(i)
    }, t.push = function(e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        var i = s.call(e);
        return i.push.apply(i, t), n.default(i)
    }
})), define("modules/clean/previews/constants", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.Archive = "archive", e.Audio = "audio", e.CloudDoc = "cloud_doc", e.Excel = "excel", e.HTML = "html", e.Image = "image", e.Linkfile = "linkfile", e.Other = "other", e.SsrDoc = "ssr_doc", e.RawHTML = "raw_html", e.Restricted = "restricted", e.Video = "video", e.Doc = "doc", e.Photo = "photo", e.Text = "text"
    })(t.PreviewType || (t.PreviewType = {})), t.IworkExtensions = ["key", "pages", "numbers", "kth"], t.MAX_ARCHIVE_FILE_SIZE_B = 536870912, t.MAX_PPT_FILE_SIZE_B = 301989888, t.MAX_WORD_DOC_FILE_SIZE_B = 167772160
})), define("modules/clean/previews/data/preview_type_util", ["require", "exports", "modules/clean/previews/constants"], (function(e, t, r) {
    "use strict";

    function n(e) {
        return function(t) {
            var r = s(t);
            return !!r && r === e
        }
    }

    function s(e) {
        if (e && e.content) return e.content[".tag"]
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isArchive = n(r.PreviewType.Archive), t.isRawHtml = n(r.PreviewType.RawHTML), t.isExcel = n(r.PreviewType.Excel), t.isVideo = n(r.PreviewType.Video), t.isAudio = n(r.PreviewType.Audio), t.isLinkfile = n(r.PreviewType.Linkfile), t.isHtml = n(r.PreviewType.HTML), t.isSsrDoc = n(r.PreviewType.SsrDoc), t.isImage = n(r.PreviewType.Image), t.isCloudDoc = n(r.PreviewType.CloudDoc), t.isRestricted = n(r.PreviewType.Restricted), t.isOther = n(r.PreviewType.Other), t.getPreviewType = s
})), define("modules/clean/react/badge", ["require", "exports", "tslib", "react", "classnames", "modules/clean/react/css", "modules/core/i18n"], (function(e, t, r, n, s, i, o) {
    "use strict";
    var a, _;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), s = r.__importDefault(s), (function(e) {
        e.NEW = "new", e.PRO = "pro", e.BETA = "beta", e.PLUS = "plus", e.ALPHA = "alpha", e.FAMILY = "family"
    })(a = t.BadgeVariant || (t.BadgeVariant = {})), (function(e) {
        e.NEON_GREEN = "neon-green", e.STONE_FORTY = "stone-forty", e.SQUASH = "squash", e.PINK = "pink", e.PINK_OUTLINE = "pink-outline", e.SAPPHIRE = "sapphire"
    })(_ = t.BadgeColor || (t.BadgeColor = {}));
    var c = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e, t = this.props,
                i = t.variant,
                _ = t.color,
                c = t.absolute,
                E = t.className,
                l = t.onClick,
                u = t.upperCase,
                d = {};
            l && (d.onClick = l);
            var S = function(e) {
                    return u ? e.toUpperCase() : e
                },
                f = ((e = {})[a.NEW] = o.intl.formatMessage({
                    defaultMessage: S("New")
                }), e[a.PRO] = o.intl.formatMessage({
                    defaultMessage: S("Pro")
                }), e[a.BETA] = o.intl.formatMessage({
                    defaultMessage: S("Beta")
                }), e[a.PLUS] = o.intl.formatMessage({
                    defaultMessage: S("Plus")
                }), e[a.ALPHA] = o.intl.formatMessage({
                    defaultMessage: S("Alpha")
                }), e[a.FAMILY] = o.intl.formatMessage({
                    defaultMessage: S("Family"),
                    description: "Family refers to the Dropbox Family plan"
                }), e);
            return n.default.createElement("span", r.__assign({
                className: s.default("badge", "badge--variant-" + i, "badge--color-" + _, {
                    "badge--absolute": c
                }, E)
            }, d), f[i] || null)
        }, t.defaultProps = {
            color: _.NEON_GREEN,
            absolute: !1,
            upperCase: !1
        }, t
    })(n.default.Component);
    t.Badge = i.requireCssWithComponent(c, ["/static/css/react/badge-vflZ3Vv1R.css"])
})), define("modules/clean/react/browse/constants", ["require", "exports", "modules/core/i18n"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e[e.NotReady = 0] = "NotReady", e[e.NotLive = 1] = "NotLive", e[e.Live = 2] = "Live"
    })(t.BrowseBoltClientStatus || (t.BrowseBoltClientStatus = {})), t.BROWSE_FILE_VIEWER_ELEMENT_ID = "browse-react-file-viewer-container";
    var n, s = {
        BINDER: ["binder"],
        PAPER: ["paper"],
        PAPER_TEMPLATE: ["papert"],
        IMAGE: ["bmp", "cr2", "gif", "ico", "jpeg", "jpg", "nef", "png", "psd", "tif", "tiff", "svg", "svgz"],
        VIDEO: ["3gp", "3gpp", "3gpp2", "avi", "dv", "flv", "m2t", "m4v", "mkv", "mov", "mp4", "mpeg", "mpg", "mts", "ts", "vob", "wmv"],
        AUDIO: ["aif", "flac", "m4a", "m4p", "mp3", "ogg", "wav", "wma"],
        DOCUMENT: ["ai", "cdr", "csv", "doc", "docx", "docm", "eps", "fla", "gdoc", "gsheet", "gslides", "indd", "keynote", "numbers", "otf", "pages", "pdf", "ppt", "pptx", "pptm", "pps", "ppsx", "ppsm", "ps", "rtf", "swf", "txt", "wpd", "xls", "xlsx", "xlsm"],
        COMPRESSED_FILE: ["7z", "bz2", "gz", "gzip", "rar", "tar", "zip"],
        CODE: ["as", "as3", "asm", "aspx", "bat", "c", "cc", "cmake", "coffee", "cpp", "cs", "css", "cxx", "diff", "erb", "erl", "groovy", "gry", "h", "haml", "hh", "hpp", "html", "htm", "hxx", "java", "js", "json", "jsx", "less", "lst", "m", "make", "mk", "ml", "mm", "msg", "out", "patch", "php", "pl", "pm", "plist", "properties", "py", "rb", "sass", "scala", "scm", "script", "scss", "sh", "sml", "sql", "vb", "vi", "vim", "xhtml", "xml", "xsd", "xsl", "y", "yaml", "yml", "yxx"],
        DISK_IMAGE: ["dmg", "iso"],
        EXECUTABLE: ["exe"],
        SHORTCUT: ["lnk", "web"],
        LINK: ["url", "webloc"],
        FONT: ["ttf"]
    };
    t.FileTypeCategoryTranslations = {
        FILE: r.intl.formatMessage({
            defaultMessage: "File"
        }),
        FOLDER: r.intl.formatMessage({
            defaultMessage: "Folder"
        }),
        SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "Shared folder"
        }),
        TEAM_SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "Team folder"
        }),
        TEAM_MEMBER_FOLDER: r.intl.formatMessage({
            defaultMessage: "Member folder"
        }),
        PUBLIC_FOLDER: r.intl.formatMessage({
            defaultMessage: "Folder"
        }),
        IMAGE: r.intl.formatMessage({
            defaultMessage: "Image"
        }),
        VIDEO: r.intl.formatMessage({
            defaultMessage: "Video"
        }),
        AUDIO: r.intl.formatMessage({
            defaultMessage: "Audio"
        }),
        DOCUMENT: r.intl.formatMessage({
            defaultMessage: "Document"
        }),
        COMPRESSED_FILE: r.intl.formatMessage({
            defaultMessage: "Archive"
        }),
        CODE: r.intl.formatMessage({
            defaultMessage: "Code"
        }),
        DISK_IMAGE: r.intl.formatMessage({
            defaultMessage: "Disk image"
        }),
        EXECUTABLE: r.intl.formatMessage({
            defaultMessage: "Executable"
        }),
        SHORTCUT: r.intl.formatMessage({
            defaultMessage: "Shortcut"
        }),
        LINK: r.intl.formatMessage({
            defaultMessage: "Link",
            description: "A noun describing a url link"
        }),
        FONT: r.intl.formatMessage({
            defaultMessage: "Font"
        }),
        SANDBOX: r.intl.formatMessage({
            defaultMessage: "App folder"
        }),
        PAPER: r.intl.formatMessage({
            defaultMessage: "Paper doc",
            description: "The category of files that are Paper files"
        }),
        PAPER_TEMPLATE: r.intl.formatMessage({
            defaultMessage: "Paper template",
            description: "The category of files that are Paper Template files"
        }),
        BINDER: r.intl.formatMessage({
            defaultMessage: "Binder",
            description: "The category of files that are Binder files"
        }),
        VAULT_FOLDER: r.intl.formatMessage({
            defaultMessage: "Life Vault folder"
        })
    }, t.FileTypeCapitalizedCategoryTranslations = {
        FILE: r.intl.formatMessage({
            defaultMessage: "FILE"
        }),
        FOLDER: r.intl.formatMessage({
            defaultMessage: "FOLDER"
        }),
        SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "SHARED FOLDER"
        }),
        TEAM_SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "TEAM FOLDER"
        }),
        TEAM_MEMBER_FOLDER: r.intl.formatMessage({
            defaultMessage: "MEMBER FOLDER"
        }),
        PUBLIC_FOLDER: r.intl.formatMessage({
            defaultMessage: "FOLDER"
        }),
        IMAGE: r.intl.formatMessage({
            defaultMessage: "IMAGE"
        }),
        VIDEO: r.intl.formatMessage({
            defaultMessage: "VIDEO"
        }),
        AUDIO: r.intl.formatMessage({
            defaultMessage: "AUDIO"
        }),
        DOCUMENT: r.intl.formatMessage({
            defaultMessage: "DOCUMENT"
        }),
        COMPRESSED_FILE: r.intl.formatMessage({
            defaultMessage: "ARCHIVE"
        }),
        CODE: r.intl.formatMessage({
            defaultMessage: "CODE"
        }),
        DISK_IMAGE: r.intl.formatMessage({
            defaultMessage: "DISK IMAGE"
        }),
        EXECUTABLE: r.intl.formatMessage({
            defaultMessage: "EXECUTABLE"
        }),
        SHORTCUT: r.intl.formatMessage({
            defaultMessage: "SHORTCUT"
        }),
        LINK: r.intl.formatMessage({
            defaultMessage: "LINK",
            description: "A noun describing a url link"
        }),
        FONT: r.intl.formatMessage({
            defaultMessage: "FONT"
        }),
        SANDBOX: r.intl.formatMessage({
            defaultMessage: "APP FOLDER"
        }),
        PAPER: r.intl.formatMessage({
            defaultMessage: "PAPER DOC",
            description: "The category of files that are Paper files"
        }),
        PAPER_TEMPLATE: r.intl.formatMessage({
            defaultMessage: "PAPER TEMPLATE",
            description: "The category of files that are Paper Template files"
        }),
        BINDER: r.intl.formatMessage({
            defaultMessage: "BINDER",
            description: "The category of files that are Binder files"
        }),
        VAULT_FOLDER: r.intl.formatMessage({
            defaultMessage: "LIFE VAULT FOLDER"
        })
    }, t.DeletedFileTypeCategoryTranslations = {
        FILE: r.intl.formatMessage({
            defaultMessage: "Deleted file"
        }),
        FOLDER: r.intl.formatMessage({
            defaultMessage: "Deleted folder"
        }),
        SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "Deleted shared folder"
        }),
        TEAM_SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "Deleted team folder"
        }),
        TEAM_MEMBER_FOLDER: r.intl.formatMessage({
            defaultMessage: "Deleted member folder"
        }),
        PUBLIC_FOLDER: r.intl.formatMessage({
            defaultMessage: "Deleted folder"
        }),
        IMAGE: r.intl.formatMessage({
            defaultMessage: "Deleted image"
        }),
        VIDEO: r.intl.formatMessage({
            defaultMessage: "Deleted video"
        }),
        AUDIO: r.intl.formatMessage({
            defaultMessage: "Deleted audio"
        }),
        DOCUMENT: r.intl.formatMessage({
            defaultMessage: "Deleted document"
        }),
        COMPRESSED_FILE: r.intl.formatMessage({
            defaultMessage: "Deleted archive"
        }),
        CODE: r.intl.formatMessage({
            defaultMessage: "Deleted code"
        }),
        DISK_IMAGE: r.intl.formatMessage({
            defaultMessage: "Deleted disk image"
        }),
        EXECUTABLE: r.intl.formatMessage({
            defaultMessage: "Deleted executable"
        }),
        SHORTCUT: r.intl.formatMessage({
            defaultMessage: "Deleted shortcut"
        }),
        LINK: r.intl.formatMessage({
            defaultMessage: "Deleted link"
        }),
        FONT: r.intl.formatMessage({
            defaultMessage: "Deleted font"
        }),
        SANDBOX: r.intl.formatMessage({
            defaultMessage: "Deleted app folder"
        }),
        PAPER: r.intl.formatMessage({
            defaultMessage: "Deleted Paper doc",
            description: 'Label for the "type" of a file in a list of files'
        }),
        PAPER_TEMPLATE: r.intl.formatMessage({
            defaultMessage: "Deleted Paper template",
            description: 'Label for the "type" of a file in a list of files'
        }),
        BINDER: r.intl.formatMessage({
            defaultMessage: "Deleted Binder",
            description: 'Label for the "type" of a file in a list of files'
        }),
        VAULT_FOLDER: r.intl.formatMessage({
            defaultMessage: "Deleted life vault folder"
        })
    }, t.DeletedFileTypeCapitalizedCategoryTranslations = {
        FILE: r.intl.formatMessage({
            defaultMessage: "DELETED FILE"
        }),
        FOLDER: r.intl.formatMessage({
            defaultMessage: "DELETED FOLDER"
        }),
        SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "DELETED SHARED FOLDER"
        }),
        TEAM_SHARED_FOLDER: r.intl.formatMessage({
            defaultMessage: "DELETED TEAM FOLDER"
        }),
        TEAM_MEMBER_FOLDER: r.intl.formatMessage({
            defaultMessage: "DELETED MEMBER FOLDER"
        }),
        PUBLIC_FOLDER: r.intl.formatMessage({
            defaultMessage: "DELETED FOLDER"
        }),
        IMAGE: r.intl.formatMessage({
            defaultMessage: "DELETED IMAGE"
        }),
        VIDEO: r.intl.formatMessage({
            defaultMessage: "DELETED VIDEO"
        }),
        AUDIO: r.intl.formatMessage({
            defaultMessage: "DELETED AUDIO"
        }),
        DOCUMENT: r.intl.formatMessage({
            defaultMessage: "DELETED DOCUMENT"
        }),
        COMPRESSED_FILE: r.intl.formatMessage({
            defaultMessage: "DELETED ARCHIVE"
        }),
        CODE: r.intl.formatMessage({
            defaultMessage: "DELETED CODE"
        }),
        DISK_IMAGE: r.intl.formatMessage({
            defaultMessage: "DELETED DISK IMAGE"
        }),
        EXECUTABLE: r.intl.formatMessage({
            defaultMessage: "DELETED EXECUTABLE"
        }),
        SHORTCUT: r.intl.formatMessage({
            defaultMessage: "DELETED SHORTCUT"
        }),
        LINK: r.intl.formatMessage({
            defaultMessage: "DELETED LINK"
        }),
        FONT: r.intl.formatMessage({
            defaultMessage: "DELETED FONT"
        }),
        SANDBOX: r.intl.formatMessage({
            defaultMessage: "DELETED APP FOLDER"
        }),
        PAPER: r.intl.formatMessage({
            defaultMessage: "DELETED PAPER DOC"
        }),
        PAPER_TEMPLATE: r.intl.formatMessage({
            defaultMessage: "DELETED PAPER TEMPLATE"
        }),
        BINDER: r.intl.formatMessage({
            defaultMessage: "DELETED BINDER"
        }),
        VAULT_FOLDER: r.intl.formatMessage({
            defaultMessage: "DELETED LIFE VAULT FOLDER"
        })
    }, t.ExtensionCategories = {};
    for (var i = 0, o = Object.keys(s); i < o.length; i++)
        for (var a = o[i], _ = 0, c = s[a]; _ < c.length; _++) {
            var E = c[_];
            t.ExtensionCategories[E] = a
        }(function(e) {
            e.SET_SHARED_FOLDER_DATA = "SET_SHARED_FOLDER_DATA", e.SET_SHARED_LINK_DATA = "SET_SHARED_LINK_DATA", e.SET_SHARED_LINK_INFO_FOR_PARENT_PATH = "SET_SHARED_LINK_INFO_FOR_PARENT_PATH", e.SET_SHARED_FILE_DATA = "SET_SHARED_FILE_DATA", e.SIGNAL_SHARED_FILE_DATA_OUT_OF_DATE = "SIGNAL_SHARED_FILE_DATA_OUT_OF_DATE", e.SIGNAL_SHARED_FOLDER_DATA_OUT_OF_DATE = "SIGNAL_SHARED_FOLDER_DATA_OUT_OF_DATE", e.SIGNAL_SHARED_LINK_DATA_OUT_OF_DATE = "SIGNAL_SHARED_LINK_DATA_OUT_OF_DATE", e.CLEAR_SHARED_FOLDER_DATA_FOR_NS = "CLEAR_SHARED_FOLDER_DATA_FOR_NS", e.REMOVE_SHARED_LINK_DATA = "REMOVE_SHARED_LINK_DATA", e.BROWSE_FILES_UPDATED = "BROWSE_FILES_UPDATED", e.BROWSE_FILES_LOADED = "BROWSE_FILES_LOADED", e.INIT_INTEGRATION_DATA = "INIT_INTEGRATION_DATA"
        })(t.SharedWithActionType || (t.SharedWithActionType = {})), t.MAX_FOLDERS_PER_CALL = 100, t.MAX_FOLDER_SIZE_QUEUE_SIZE = 50, t.MAX_FOLDER_SIZE_ITERATIONS = 1e3, t.BROWSE_SORT_COOKIE_NAME = "browse_current_sort", (function(e) {
            e.RELEVANCE = "RELEVANCE", e.LAST_MODIFIED_TIME = "LAST_MODIFIED_TIME"
        })(t.SEARCH_ORDER_BY_TYPE || (t.SEARCH_ORDER_BY_TYPE = {})), (function(e) {
            e.TRUE = "true", e.FALSE = "false"
        })(t.SEARCH_REVERSE_ORDER_TYPE || (t.SEARCH_REVERSE_ORDER_TYPE = {})), (function(e) {
            e.country_override = "country_override", e.cProfile = "cProfile", e.d = "d", e.last_fq_path = "last_fq_path", e.path = "path", e.preview = "preview", e.public_mode_override = "public_mode_override", e.query = "query", e.query_unnormalized = "query_unnormalized", e.search_session_id = "search_session_id", e.search_token = "search_token", e.select = "select", e.activity = "activity", e.rewind = "rewind", e.folder_history = "folder_history", e.from_desktop_client = "from_desktop_client", e.stormcrow_override = "stormcrow_override", e.stormcrow_override_data_field = "stormcrow_override_data_field", e.stormcrow_override_population = "stormcrow_override_population", e.stormcrow_override_ttl = "stormcrow_override_ttl", e.stormcrow_panel = "stormcrow_panel", e.uncompressed_js = "uncompressed_js", e.use_packages = "use_packages", e.file_categories = "file_categories", e.preselected_for_showcase = "preselected_for_showcase", e.search_from = "search_from", e.share = "share", e.reload = "reload", e.folder_overview = "folder_overview", e.search_order_by = "search_order_by", e.search_reverse_order = "search_reverse_order", e.search_type = "search_type", e.search_account_id = "search_account_id", e.pp_setup = "pp_setup"
        })(n = t.BrowseQueryArg || (t.BrowseQueryArg = {})), t.FRAMEWORK_ARGS = [
            [n.country_override],
            [n.cProfile],
            [n.public_mode_override],
            [n.stormcrow_override],
            [n.stormcrow_override_data_field],
            [n.stormcrow_override_population],
            [n.stormcrow_override_ttl],
            [n.stormcrow_panel],
            [n.uncompressed_js],
            [n.use_packages]
        ], t.DEFAULT_PAGE_HEADER_HEIGHT = 96, t.COMPACT_PAGE_HEADER_HEIGHT = 76, t.BrowseFolderOverviewComponentNamespace = "BROWSE", t.CREATE_FOLDER_ACTION_ORIGIN_TYPE = {
            BROWSE_CDM_NEW_FOLDER_MODAL: "BROWSE_CDM_NEW_FOLDER_MODAL",
            BROWSE_NEW_FOLDER_MODAL: "BROWSE_NEW_FOLDER_MODAL",
            BROWSE_MOVE_DIALOG: "BROWSE_MOVE_DIALOG",
            BROWSE_VAULT_NEW_FOLDER_MODAL: "BROWSE_VAULT_NEW_FOLDER_MODAL",
            HOME_NEW_FOLDER_MODAL: "HOME_NEW_FOLDER_MODAL",
            HOME_CREATE_FILE_MODAL: "HOME_CREATE_FILE_MODAL",
            HOME_UPLOAD_MODAL: "HOME_UPLOAD_MODAL"
        }, t.browseSidebarNavigationCommandIds = ["files", "cdmFiles", "myFiles"]
})), define("modules/clean/react/browse/models", ["require", "exports", "tslib", "modules/clean/datetime", "modules/clean/display_format", "modules/clean/filepath", "modules/clean/filetypes", "modules/clean/immutability_helper", "modules/clean/react/browse/constants", "modules/clean/sharing/access_level", "modules/core/exception", "modules/core/i18n"], (function(e, t, r, n, s, i, o, a, _, c, E, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i);
    var u = (function() {
        function e(e) {
            this.bytes = e.bytes, this.direct_blockserver_link = e.direct_blockserver_link, this.event_type = e.event_type, this.ext = e.ext, this.file_id = e.file_id, this.filename_highlights = e.filename_highlights, this.highlight_spans = e.highlight_spans, this.fq_path = e.fq_path, this.href = e.href, this.icon = e.icon, this.is_cloud_doc = e.is_cloud_doc, this.is_dir = e.is_dir, this.is_in_team_folder_tree = e.is_in_team_folder_tree, this.is_in_vault_folder = e.is_in_vault_folder, this.is_locked = e.is_locked, this.is_lockholder = e.is_lockholder, this.is_symlink = e.is_symlink, this.is_unmounted = e.is_unmounted, this.is_versionable = e.is_versionable, this.last_modified_name = e.last_modified_name, this.latest_rev = e.latest_rev, this.lockholder_name = e.lockholder_name, this.ts_locked = e.ts_locked, this.lock_info = e.lock_info, this.match_type = e.match_type, this._mount_access_perms = e._mount_access_perms, this.ns_id = e.ns_id, this.ns_path = e.ns_path, this.open_to_url = e.open_to_url, this.preview = e.preview, this.per_node_metadata = e.per_node_metadata, this.preview_type = e.preview_type, this.read_only = !!e.read_only, this.request_id = e.request_id, this.revision_id = e.revision_id, this.sjid = e.sjid, this.sort_key = e.sort_key, this.sort_rank = e.sort_rank, this.snippets = e.snippets, this.sync_setting = e.sync_setting, this.target_ns = e.target_ns, this.team_folder_status = e.team_folder_status, this.thumbnail_url_tmpl = e.thumbnail_url_tmpl, this.ts = e.ts, this.type = e.type, this.isDeleted = !!e.isDeleted, this.fetchFolderSizesStatus = e.fetchFolderSizesStatus, this.last_action_by_user_ts = e.last_action_by_user_ts
        }
        return Object.defineProperty(e.prototype, "ago", {
            get: function() {
                return O(this.ts)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "agoFromLastActionByUserTs", {
            get: function() {
                return O(this.last_action_by_user_ts)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "size", {
            get: function() {
                return this.isDeleted || this.bytes < 0 ? l.intl.formatMessage({
                    defaultMessage: "Deleted"
                }) : void 0 === this.bytes ? "" : s.format_bytes(this.bytes)
            },
            enumerable: !0,
            configurable: !0
        }), e.fromServerObject = function(t) {
            return new e(r.__assign(r.__assign({}, t), {
                _mount_access_perms: t.mount_access_perms,
                isDeleted: -1 === t.bytes
            }))
        }, e.fromApiV2Object = function(t) {
            var n, s, i, a, _ = null;
            return t.has_mount_access_perms && (n = t.mount_access_perms), t.is_locked && (_ = t.lock_info, s = t.lock_info.is_lockholder, i = t.lock_info.lockholder_name, a = t.lock_info.ts_locked), new e(r.__assign(r.__assign({}, t), {
                bytes: t.size_bytes,
                direct_blockserver_link: t.direct_blockserver_link,
                event_type: 0,
                ext: t.ext || "",
                file_id: t.file_id || "",
                href: t.href || "",
                icon: t.icon,
                is_cloud_doc: !!t.is_cloud_doc,
                is_dir: !!t.is_dir,
                is_in_team_folder_tree: !!t.is_in_team_folder_tree,
                is_in_vault_folder: !!t.is_in_vault_folder,
                is_locked: !!t.is_locked,
                is_symlink: !!t.is_symlink,
                is_unmounted: !!t.is_unmounted,
                is_versionable: !0,
                revision_id: t.revision_id || "",
                sjid: t.sjid,
                sort_key: t.sort_key,
                target_ns: t.target_ns || 0,
                type: o.FileTypeMap.get(t.type[".tag"]) || 0,
                ns_id: t.ns_id,
                ns_path: t.ns_path,
                fq_path: t.fq_path,
                _mount_access_perms: n,
                isDeleted: -1 === t.size_bytes,
                is_lockholder: s,
                lockholder_name: i,
                ts_locked: a,
                lock_info: _
            }))
        }, e.prototype.set = function(e, t) {
            return a.set(this, e, t)
        }, e.prototype.merge = function(e) {
            return a.merge(this, e)
        }, e.prototype.toJS = function() {
            return Object.assign({}, this)
        }, e.getFilename = function(e) {
            return i.filename(e.fq_path)
        }, e.getExtension = function(e) {
            return e.is_dir ? "" : i.file_extension(i.filename(e.fq_path))
        }, e.getCategoryDescription = function(t, r) {
            var n;
            if (void 0 === r && (r = !1), t.is_dir)
                if (t.is_in_team_folder_tree) n = "TEAM_SHARED_FOLDER";
                else switch (n = "FOLDER", t.type) {
                    case o.FileTypes.TEAM_SHARED_FOLDER:
                        n = "TEAM_SHARED_FOLDER";
                        break;
                    case o.FileTypes.SHARED_FOLDER:
                        n = "SHARED_FOLDER";
                        break;
                    case o.FileTypes.SANDBOX:
                        n = "SANDBOX";
                        break;
                    case o.FileTypes.TEAM_MEMBER_FOLDER:
                        n = "TEAM_MEMBER_FOLDER";
                        break;
                    case o.FileTypes.VAULT_FOLDER:
                        n = "VAULT_FOLDER";
                        break;
                    default:
                        t.target_ns && (n = "SHARED_FOLDER")
                } else n = _.ExtensionCategories[e.getExtension(t)] || "FILE";
            return t.isDeleted ? r ? _.DeletedFileTypeCapitalizedCategoryTranslations[n] : _.DeletedFileTypeCategoryTranslations[n] : r ? _.FileTypeCapitalizedCategoryTranslations[n] : _.FileTypeCategoryTranslations[n]
        }, e.isTeamSharedFolder = function(e) {
            return e.type === o.FileTypes.TEAM_SHARED_FOLDER
        }, e.isTeamMemberFolder = function(e) {
            return e.type === o.FileTypes.TEAM_MEMBER_FOLDER
        }, e.isReadOnlySharedFolder = function(e) {
            var t = e._mount_access_perms;
            return null != t && !t.includes("can_edit")
        }, e.isNoAccessSharedFolder = function(e) {
            var t = e._mount_access_perms;
            return null != t && !t.includes("can_view")
        }, e.canViewFileMembers = function(e, t) {
            var r = e._mount_access_perms;
            return !(r && r.indexOf("can_view_members") < 0) && (!(t && !t.canViewContainingNSMembers) || !!(r && r.indexOf("can_view_members") >= 0))
        }, e.prototype.updateSize = function(e, t) {
            return this.merge({
                bytes: e,
                fetchFolderSizesStatus: t
            })
        }, e
    })();
    t.File = u;
    var d = (function() {
        function e(e) {
            void 0 === e && (e = {}), this.isPublicFolderEnabled = !!e.isPublicFolderEnabled, this.publicFolderFqPath = e.publicFolderFqPath, this.publicAppToken = e.publicAppToken, Object.freeze(this)
        }
        return e.fromServerObject = function(t) {
            return new e({
                isPublicFolderEnabled: t.public_folder_enabled,
                publicFolderFqPath: t.public_folder_fq_path,
                publicAppToken: t.public_app_token
            })
        }, e.prototype.set = function(e, t) {
            return a.set(this, e, t)
        }, e.prototype.toJSON = function() {
            return Object.assign({}, this)
        }, e.prototype.toJS = function() {
            return this.toJSON()
        }, e
    })();
    t.Config = d;
    var S = (function() {
        function e(e) {
            var t = void 0 === e ? {} : e,
                r = t.canViewContainingNSMembers,
                n = t.currentNSID,
                s = t.currentFQPath,
                i = t.currentMountPoint,
                o = t.currentNSPath,
                a = t.currentSharedFolderPermissionRole,
                _ = t.currentNSAllowsNesting,
                E = t.inactiveNSIDByFQPath,
                l = t.permanentDeletionDisabledStateByNSID,
                u = t.isInFolderMode,
                S = t.isCurrentlyInRoot,
                f = t.isInsideSandboxFolder,
                p = t.isInsideSharedFolder,
                h = t.isInsideTeamFolderRoot,
                A = t.isInsideArchivedTeamFolder,
                O = t.isInsideTeamFolderTree,
                R = t.isInsideMyTeamFolderTree,
                T = t.isInsideDeletedFolder,
                C = t.isInsideDeletedSharedFolder,
                I = t.isInsideDeletedNestedSharedFolder,
                m = t.isInsideVaultFolder,
                L = t.isNonUserRelativeContext,
                g = t.pathRoot,
                D = t.rootNSID,
                N = t.showPinnedTeamFolder,
                v = t.teamFolderOwnerTeamApiId,
                y = t.blockHash,
                F = t.config,
                M = t.syncSetting;
            this.canViewContainingNSMembers = null == r || r, this.currentNSID = n || 0, this.currentFQPath = s || "", this.currentMountPoint = i, this.currentNSPath = o, this.currentSharedFolderPermissionRole = null != a ? a : c.NameSpaceAccess.ACCESS_NO_ACCESS, this.currentNSAllowsNesting = !!_, this.inactiveNSIDByFQPath = E || {}, this.permanentDeletionDisabledStateByNSID = l || {}, this.isInFolderMode = null == u || u, this.isCurrentlyInRoot = !!S, this.isInsideSandboxFolder = !!f, this.isInsideSharedFolder = !!p, this.isInsideTeamFolderRoot = !!h, this.isInsideArchivedTeamFolder = !!A, this.isInsideTeamFolderTree = !!O, this.isInsideMyTeamFolderTree = !!R, this.isInsideDeletedFolder = !!T, this.isInsideDeletedSharedFolder = !!C, this.isInsideDeletedNestedSharedFolder = !!I, this.isInsideVaultFolder = !!m, this.isNonUserRelativeContext = !!L, this.pathRoot = g, this.rootNSID = D, this.showPinnedTeamFolder = !!N, this.teamFolderOwnerTeamApiId = v, this.blockHash = y, this.config = F || new d, this.syncSetting = M
        }
        return e.fromServerObject = function(t) {
            var r, n, s = t.containing_fq_path || "";
            s.startsWith("/") || (s = "/" + s), t.inside_shared_folder && (r = c.NameSpaceAccess.ACCESS_READER);
            var i = t.containing_ns_permissions || [],
                o = i.includes("mount_shared_folders");
            return t.inside_shared_folder && (i.includes("edit_contents") && (r = c.NameSpaceAccess.ACCESS_WRITER), i.includes("change_folder_options") && (r = c.NameSpaceAccess.ACCESS_OWNER), i.includes("view_members") || (n = !1)), new e({
                blockHash: t.block_hash,
                canViewContainingNSMembers: n,
                config: d.fromServerObject(t),
                currentFQPath: s,
                currentMountPoint: t.containing_mount_point,
                currentNSAllowsNesting: o,
                currentNSID: t.containing_ns_id,
                currentNSPath: t.containing_ns_path,
                currentSharedFolderPermissionRole: r,
                inactiveNSIDByFQPath: t.old_path_to_ns_id,
                isCurrentlyInRoot: t.in_root_dir,
                isInFolderMode: t.inside_dir,
                isInsideSandboxFolder: t.inside_sandbox_folder,
                isInsideArchivedTeamFolder: t.inside_archived_team_folder,
                isInsideTeamFolderRoot: t.inside_team_folder_root,
                isInsideDeletedFolder: t.inside_deleted_dir,
                isInsideDeletedNestedSharedFolder: t.inside_deleted_nested_shared_folder,
                isInsideDeletedSharedFolder: t.inside_deleted_shared_folder,
                isInsideSharedFolder: t.inside_shared_folder,
                isInsideTeamFolderTree: t.inside_team_folder_tree,
                isInsideMyTeamFolderTree: t.inside_my_team_folder_tree,
                isInsideVaultFolder: t.inside_vault_folder,
                isNonUserRelativeContext: t.is_non_user_relative_context,
                pathRoot: t.path_root,
                permanentDeletionDisabledStateByNSID: t.permanent_delete_is_disabled_by_ns_id,
                rootNSID: t.root_ns_id,
                showPinnedTeamFolder: t.show_pinned_team_folder,
                teamFolderOwnerTeamApiId: t.team_folder_owner_team_dbtid,
                syncSetting: t.sync_setting
            })
        }, e.fromApiV2Object = function(t) {
            var r, n, s = t.containing_fq_path || "";
            s.startsWith("/") || (s = "/" + s), t.inside_shared_folder && (r = c.NameSpaceAccess.ACCESS_READER);
            var i = t.containing_ns_permissions || [],
                o = i.includes("mount_shared_folders");
            return t.inside_shared_folder && (i.includes("edit_contents") && (r = c.NameSpaceAccess.ACCESS_WRITER), i.includes("change_folder_options") && (r = c.NameSpaceAccess.ACCESS_OWNER), i.includes("view_members") || (n = !1)), new e({
                blockHash: t.block_hash,
                canViewContainingNSMembers: n,
                currentFQPath: s,
                currentMountPoint: t.containing_mount_point,
                currentNSAllowsNesting: o,
                currentNSID: t.containing_ns_id,
                currentNSPath: t.containing_ns_path,
                currentSharedFolderPermissionRole: r,
                inactiveNSIDByFQPath: {},
                isCurrentlyInRoot: t.in_root_dir,
                isInFolderMode: t.inside_dir,
                isInsideSandboxFolder: t.inside_sandbox_folder,
                isInsideArchivedTeamFolder: t.inside_archived_team_folder,
                isInsideTeamFolderRoot: t.inside_team_folder_root,
                isInsideDeletedFolder: t.inside_deleted_dir,
                isInsideDeletedNestedSharedFolder: t.inside_deleted_nested_shared_folder,
                isInsideDeletedSharedFolder: t.inside_deleted_shared_folder,
                isInsideSharedFolder: t.inside_shared_folder,
                isInsideTeamFolderTree: t.inside_team_folder_tree,
                isInsideMyTeamFolderTree: t.inside_my_team_folder_tree,
                isInsideVaultFolder: t.inside_vault_folder,
                isNonUserRelativeContext: t.is_non_user_relative_context,
                permanentDeletionDisabledStateByNSID: {},
                rootNSID: t.root_ns_id,
                showPinnedTeamFolder: t.show_pinned_team_folder,
                teamFolderOwnerTeamApiId: t.team_folder_owner_team_dbtid
            })
        }, e.prototype.set = function(e, t) {
            return a.set(this, e, t)
        }, e.prototype.toJSON = function() {
            return Object.assign({}, this)
        }, e.prototype.toJS = function() {
            return this.toJSON()
        }, e.prototype.isCurrentPathWriteable = function() {
            var e = this.currentSharedFolderPermissionRole;
            return !this.isInsideSharedFolder || e === c.NameSpaceAccess.ACCESS_WRITER || e === c.NameSpaceAccess.ACCESS_OWNER
        }, e.prototype.getNameOfTargetFolder = function() {
            return i.filename(this.currentFQPath)
        }, e
    })();
    t.BrowseContext = S;
    var f = (function() {
        function e(e) {
            this.title = e.title, this.pad_id = e.pad_id, this.url = e.url, this.title_highlights = e.title_highlights, this.highlight_spans = e.highlight_spans, this.creator_name = e.creator_name, this.last_editor_name = e.last_editor_name, this.request_id = e.request_id, this.sort_rank = e.sort_rank, this.snippets = e.snippets, this.ts = e.ts
        }
        return Object.defineProperty(e.prototype, "last_modified_date", {
            get: function() {
                if (!this.ts) return "";
                var e = new Date(this.ts).getTime();
                return n.getActingTimeWithAgoEnabled(e, !1, !0, 0, !0, !0, !0)
            },
            enumerable: !0,
            configurable: !0
        }), e.fromServerObject = function(t) {
            return new e(t)
        }, e
    })();
    t.Paper = f;
    var p = (function() {
        function e(e) {
            this.name = e.name, this.url = e.url, this.folder_id = e.folder_id, this.title_highlights = e.title_highlights, this.highlight_spans = e.highlight_spans, this.request_id = e.request_id, this.sort_rank = e.sort_rank
        }
        return e.fromServerObject = function(t) {
            return new e(t)
        }, e
    })();
    t.PaperFolder = p;
    var h = function(e) {
        this.renderUserDefinedItemRow = e.renderUserDefinedItemRow
    };
    t.UserDefinedItem = h;
    var A = (function() {
        function e(e) {
            this.bytes = e.bytes, this.ext = e.ext, this.file_id = e.file_id, this.filename = e.filename, this.highlight_spans = e.highlight_spans, this.href = e.href, this.icon = e.icon, this.is_cloud_doc = e.is_cloud_doc, this.last_modified_name = e.last_modified_name, this.match_type = e.match_type, this.request_id = e.request_id, this.server_timestamp = e.server_timestamp, this.sort_rank = e.sort_rank, this.snippets = e.snippets, this.thumbnail_url_tmpl = e.thumbnail_url_tmpl, this.ts = e.ts, this.type = e.type, this.last_action_by_user_ts = e.last_action_by_user_ts
        }
        return e.fromServerObject = function(t) {
            return new e(t)
        }, Object.defineProperty(e.prototype, "ago", {
            get: function() {
                return O(this.ts)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "agoFromLastActionByUserTs", {
            get: function() {
                return O(this.last_action_by_user_ts)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "size", {
            get: function() {
                return this.bytes < 0 || void 0 === this.bytes ? "" : s.format_bytes(this.bytes)
            },
            enumerable: !0,
            configurable: !0
        }), e.getFilename = function(e) {
            return e.filename || "Dropbox"
        }, e
    })();

    function O(e) {
        return null == e ? "" : n.getActingTimeWithAgoEnabled(1e3 * e, !1, !0, 0, !0, !0, !0)
    }
    t.FileSharedWithMe = A, t.itemId = function(e) {
        return e instanceof u ? e.fq_path : e instanceof A ? e.file_id : e instanceof f ? e.pad_id : e.folder_id
    }, t.itemTimestampInMs = function(e) {
        return e instanceof u || e instanceof A || e instanceof f ? e instanceof u || e instanceof A ? null === e.ts || void 0 === e.ts ? 0 : 1e3 * e.ts : new Date(e.ts).getTime() : (E.assert(!1, "Get timestamp in millisecond is only supported for File, FileSharedWithMe and Paper", {
            tags: ["search"]
        }), 0)
    }, t.getAgo = O
})), define("modules/clean/react/browse/uri_helper", ["require", "exports", "tslib", "modules/clean/history", "modules/clean/react/browse/constants"], (function(e, t, r, n, s) {
    "use strict";

    function i(e, t) {
        return e.is_paired ? "personal" === t.role ? "/personal" : "/work" : "/home"
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), t.browse_root = i, t.getUserRoot = function(e, t) {
        var r = i(e, t);
        return t.is_cdm_member && t.cdm_tmf_path ? r + t.cdm_tmf_path : r
    }, t.getQueryArgs = function() {
        var e = n.default.deconstruct_url().qargs;
        return {
            d: e[s.BrowseQueryArg.d],
            select: e[s.BrowseQueryArg.select],
            path: e[s.BrowseQueryArg.path],
            last_fq_path: e[s.BrowseQueryArg.last_fq_path],
            query: e[s.BrowseQueryArg.query],
            query_unnormalized: e[s.BrowseQueryArg.query_unnormalized],
            preview: e[s.BrowseQueryArg.preview],
            search_session_id: e[s.BrowseQueryArg.search_session_id],
            country_override: e[s.BrowseQueryArg.country_override],
            cProfile: e[s.BrowseQueryArg.cProfile],
            public_mode_override: e[s.BrowseQueryArg.public_mode_override],
            stormcrow_override: e[s.BrowseQueryArg.stormcrow_override],
            stormcrow_override_data_field: e[s.BrowseQueryArg.stormcrow_override_data_field],
            stormcrow_override_population: e[s.BrowseQueryArg.stormcrow_override_population],
            stormcrow_override_ttl: e[s.BrowseQueryArg.stormcrow_override_ttl],
            stormcrow_panel: e[s.BrowseQueryArg.stormcrow_panel],
            uncompressed_js: e[s.BrowseQueryArg.uncompressed_js],
            use_packages: e[s.BrowseQueryArg.use_packages],
            file_categories: e[s.BrowseQueryArg.file_categories],
            preselected_for_showcase: e[s.BrowseQueryArg.preselected_for_showcase],
            activity: e[s.BrowseQueryArg.activity],
            rewind: e[s.BrowseQueryArg.rewind],
            from_desktop_client: e[s.BrowseQueryArg.from_desktop_client],
            search_from: e[s.BrowseQueryArg.search_from],
            folder_overview: void 0 !== e[s.BrowseQueryArg.folder_overview] || void 0,
            search_order_by: e[s.BrowseQueryArg.search_order_by],
            search_reverse_order: e[s.BrowseQueryArg.search_reverse_order],
            search_type: e[s.BrowseQueryArg.search_type],
            pp_setup: void 0 !== e[s.BrowseQueryArg.pp_setup] || void 0
        }
    }
})), define("modules/clean/react/browse/logger_util", ["require", "exports", "modules/clean/web_user_action_events"], (function(e, t, r) {
    "use strict";

    function n(e) {
        return !!e && !!e.fq_path
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isFile = n, t.isPaper = function(e) {
        return !!e && !!e.pad_id
    }, t.isPaperFolder = function(e) {
        return void 0 !== e.folder_id
    }, t.countFilesAndFolders = function(e) {
        var t = e.filter((function(e) {
            return n(e) && e.is_dir
        })).count();
        return {
            num_files_selected: e.filter((function(e) {
                return n(e) && !e.is_dir
            })).count(),
            num_folders_selected: t
        }
    }, t.makeSelectionEvent = function(e, t) {
        var n = t.selected.subtract(e.selected);
        if (!n.size) {
            var s = e.selected.subtract(t.selected);
            return {
                event: r.WebUserActionLogEvent.UNSELECT_ROW,
                itemId: s.first()
            }
        }
        return {
            event: r.WebUserActionLogEvent.SELECT_ROW,
            itemId: n.first()
        }
    }
})), define("modules/clean/react/browse/data/types", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.APP_INIT = "BROWSE/APP_INIT", e.PUSH_BOLT_IGNORE = "BROWSE/PUSH_BOLT_IGNORE", e.POP_BOLT_IGNORE = "BROWSE/POP_BOLT_IGNORE", e.SELECT_FILES_BY_FQ_PATH = "BROWSE/SELECT_FILES_BY_FQ_PATH", e.SHOW_TIMELINE = "BROWSE/SHOW_TIMELINE", e.HIDE_TIMELINE = "BROWSE/HIDE_TIMELINE", e.SHOW_FOLDER_HISTORY_PANEL = "BROWSE/SHOW_FOLDER_HISTORY_PANEL", e.HIDE_FOLDER_HISTORY_PANEL = "BROWSE/HIDE_FOLDER_HISTORY_PANEL", e.SET_IS_REWIND_ENABLED = "BROWSE/SET_IS_REWIND_ENABLED", e.SET_BROWSE_POST_TTI_EXPERIMENTS = "BROWSE/SET_BROWSE_POST_TTI_EXPERIMENTS", e.SET_CAN_DISPLAY_FOLDER_SIZES = "BROWSE/SET_CAN_DISPLAY_FOLDER_SIZES", e.SET_CLIPBOARD_FILES = "BROWSE/SET_CLIPBOARD_FILES", e.SET_CONTEXT = "BROWSE/SET_CONTEXT", e.SET_FILE_JUMP_FILTER = "BROWSE/SET_FILE_JUMP_FILTER", e.SET_FILE_PATHS_TO_SELECT_ON_NEXT_UPDATE = "BROWSE/SET_FILE_PATHS_TO_SELECT_ON_NEXT_UPDATE", e.SET_FILE_RENAME = "BROWSE/SET_FILE_RENAME", e.SET_FOLDER_SIZES = "BROWSE/SET_FOLDER_SIZES", e.SET_LOADING_STATE = "BROWSE/SET_LOADING_STATE", e.SET_MOUNT_POINTS = "BROWSE/SET_MOUNT_POINTS", e.SET_NEW_FOLDER_CREATION_STATE = "BROWSE/SET_NEW_FOLDER_CREATION_STATE", e.SET_PAGINATED_TOTAL_NUM_FILES = "BROWSE/SET_PAGINATED_TOTAL_NUM_FILES", e.SET_PATH = "BROWSE/SET_PATH", e.SET_SELECTION = "BROWSE/SET_SELECTION", e.SET_SHOULD_SHOW_DELETED_FILES = "BROWSE/SET_SHOULD_SHOW_DELETED_FILES", e.SET_SORT_ORDER = "BROWSE/SET_SORT_ORDER", e.SET_UNSORTED_FILES = "BROWSE/SET_UNSORTED_FILES", e.SET_IS_FILE_VIEWER_SHOWN = "BROWSE/IS_FILE_VIEWER_SHOWN", e.SET_IS_SEARCH_MODE = "BROWSE/SET_IS_SEARCH_MODE", e.REQUEST_FOLDER_SIZES = "BROWSE/REQUEST_FOLDER_SIZES", e.SET_FOLDER_SIZES_PENDING = "BROWSE/SET_FOLDER_SIZES_PENDING", e.COMPLETE_FOLDER_SIZES = "BROWSE/COMPLETE_FOLDER_SIZES"
    })(t.ActionTypes || (t.ActionTypes = {}))
})), define("modules/clean/react/files_view/types", ["require", "exports", "modules/clean/web_user_action_events"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FilesViewActionSource = r.ActionSourceValue, (function(e) {
        e.ESC = "ESC", e.SUBMIT = "SUBMIT", e.BLUR = "BLUR"
    })(t.NameInputActionSource || (t.NameInputActionSource = {})), (function(e) {
        e.CREATE_FOLDER_INACTIVE = "CREATE_FOLDER_INACTIVE", e.PENDING_INPUT = "PENDING_INPUT", e.SAVING_INPUT = "SAVING_INPUT"
    })(t.NewFolderCreationState || (t.NewFolderCreationState = {})), (function(e) {
        e.PENDING_INPUT = "pending-input", e.SAVING_INPUT = "saving-input"
    })(t.RenameState || (t.RenameState = {})), (function(e) {
        e.LOADED = "LOADED", e.LOADING_FIRST_PAGE = "LOADING_FIRST_PAGE", e.LOADING_REMAINING_PAGES = "LOADING_REMAINING_PAGES", e.LOAD_ERROR = "LOAD_ERROR"
    })(t.LoadingState || (t.LoadingState = {})), (function(e) {
        e.FILENAME = "FILENAME", e.MODIFIED = "MODIFIED", e.CATEGORY = "CATEGORY", e.EXTENSION = "EXTENSION", e.SIZE = "SIZE", e.SHARED_WITH = "SHARED_WITH", e.SYNC_SETTING = "SYNC_SETTING", e.FILE_COUNTS = "FILE_COUNTS", e.RELEVANCE = "RELEVANCE", e.LOCKED_FILES = "LOCKED_FILES"
    })(t.SortField || (t.SortField = {})), (function(e) {
        e.FILENAME = "FILES_BY_NAME", e.MODIFIED = "FILES_BY_MODIFIED", e.CATEGORY = "FILES_BY_CATEGORY", e.EXTENSION = "FILES_BY_NAME", e.SIZE = "FILES_BY_SIZE", e.SHARED_WITH = "FILES_BY_NAME", e.SYNC_SETTING = "FILES_BY_SYNC_SETTING", e.FILE_COUNTS = "FILES_BY_FILE_COUNTS", e.RELEVANCE = "FILES_BY_RELEVANCE", e.LOCKED_FILES = "LOCKED_FILES"
    })(t.SortLabel || (t.SortLabel = {})), (function(e) {
        e.ASCENDING = "ASCENDING", e.DESCENDING = "DESCENDING"
    })(t.SortDirection || (t.SortDirection = {})), (function(e) {
        e.Grid = "GRID_VIEW", e.List = "LIST_VIEW", e.LargeGrid = "LARGE_GRID_VIEW"
    })(t.ViewType || (t.ViewType = {})), (function(e) {
        e.LOADING = "LOADING", e.COMPLETE = "COMPLETE", e.NO_ACCESS = "NO_ACCESS", e.ERROR = "ERROR"
    })(t.FetchFolderSizeState || (t.FetchFolderSizeState = {})), (function(e) {
        e.NONE = "NONE", e.ALL_FOLDERS = "ALL_FOLDERS", e.NONSELECTED_FOLDERS = "NONSELECTED_FOLDERS", e.NONSELECTED_NONSHARED_FOLDERS = "NONSELECTED_NONSHARED_FOLDERS", e.NONSELECTED_NONSHARED_NONTEAM_FOLDERS = "NONSELECTED_NONSHARED_NONTEAM_FOLDERS"
    })(t.DropTargetHighlightMode || (t.DropTargetHighlightMode = {}))
})), define("modules/clean/react/no-jquery", ["require", "exports"], (function(e, t) {
    "use strict";

    function r(e) {
        return e.matches || e.msMatchesSelector || e.webkitMatchesSelector
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.closestElement = function(e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n;) {
            var s = r(n);
            if (s && s.call(n, t)) return n;
            n = n.parentElement
        }
        return null
    };
    var n = (function() {
        function e(e) {
            this.handlers = {}, this.element = e
        }
        return e.prototype.add = function(e, t, r) {
            this.handlers[e] = this.handlers[e] || {}, this.handlers[e][t] = r, this.element.addEventListener(t, r)
        }, e.prototype.remove = function(e, t, r) {
            this.handlers[e] && this.handlers[e][t] && (this.element.removeEventListener(t, r || this.handlers[e][t]), this.handlers[e][t] === r && delete this.handlers[e][t])
        }, e.prototype.removeAll = function(e) {
            if (this.handlers[e])
                for (var t in this.handlers[e]) this.handlers[e].hasOwnProperty(t) && (this.element.removeEventListener(t, this.handlers[e][t]), delete this.handlers[e][t])
        }, e
    })();
    t.ScopedEventHandlers = n;
    var s = null;
    t.corsSupport = function() {
        if (null === s) try {
            var e = new window.XMLHttpRequest;
            s = !!e && "withCredentials" in e
        } catch (e) {
            s = !1
        }
        return s
    }
})), define("modules/clean/search/constants", ["require", "exports", "modules/clean/search/types"], (function(e, t, r) {
    "use strict";
    var n, s;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MaxResults = {
        MAX_SEARCH_SUGGESTIONS: 8,
        MAX_SEARCH_RESULTS: 30
    }, t.FOCUS_SEARCH_BAR_ACTION = "search__FOCUS_SEARCH_BAR", t.BLUR_SEARCH_BAR_ACTION = "search__BLUR_SEARCH_BAR", t.SET_SEARCH_QUERY_ACTION = "search__SET_SEARCH_QUERY", t.SET_SEARCH_SUGGESTIONS_ACTION = "search__SET_SEARCH_SUGGESTIONS", t.SET_SLIM_SEARCH_SUGGESTIONS_ACTION = "search__SET_SLIM_SEARCH_SUGGESTIONS", t.SET_HIGHLIGHTED_ROW_ACTION = "search__SET_HIGHLIGHTED_ROW", t.HIGHLIGHT_PREVIOUS_ROW_ACTION = "search__HIGHLIGHT_PREVIOUS_ROW", t.HIGHLIGHT_NEXT_ROW_ACTION = "search__HIGHLIGHT_NEXT_ROW", t.CLEAR_SEARCH_BAR_ACTION = "search__CLEAR_SEARCH_BAR", t.SEARCH_SUCCESSFUL_ACTION = "search__SEARCH_SUCCESSFUL", t.CLEAR_ALL_HISTORY_ACTION = "search__CLEAR_ALL_HISTORY", t.SET_SEARCH_SELECTION_ACTION = "search__SET_SEARCH_SELECTION", t.CHANGE_FILES_ACTION = "search__CHANGE_SEARCH_FILES", t.SET_SCOPE_CHIP_ACTION = "search__SET_SCOPE_CHIP_ACTION", t.SET_FILE_TYPE_FILTER_ACTION = "search__SET_FILE_TYPE_FILTER_ACTION", t.SELECT_FIRST_FILE_ACTION = "search__SET_FIRST_FILE_ACTION", t.SORT_SEARCH_RESULTS_ACTION = "search__SORT_SEARCH_RESULTS_ACTION", t.SET_IMAGE_SEARCH_SUGGESTION_ACTION = "search__SET_IMAGE_SEARCH_SUGGESTION_ACTION", t.ADMIN_CONSOLE_SEARCH_ENDPOINT = "/search/admin_console_search", t.SEARCH_FRONTEND_SERVICE_ENDPOINT = "/search/full_search_result", t.FILE_INFO_ENDPOINT = "/browse_file_info", t.DIRECT_BLOCKSERVER_LINK = "direct_blockserver_link", t.HREF = "href", (function(e) {
        e.ZERO_QUERY = "ZERO_QUERY", e.LOADED = "LOADED", e.LOADING_FIRST_PAGE = "LOADING_FIRST_PAGE", e.LOADING_ADDITIONAL_PAGE = "LOADING_ADDITIONAL_PAGE", e.LOAD_ERROR = "LOAD_ERROR"
    })(t.SearchLoadingState || (t.SearchLoadingState = {})), (function(e) {
        e.ALL = "all", e.IMAGE = "image"
    })(t.SearchType || (t.SearchType = {})), (function(e) {
        e.ASSISTANT = "assistant", e.COLLAB_BROWSE = "collab_browse", e.WEB = "web"
    })(t.SearchOriginPathway || (t.SearchOriginPathway = {})), t.SEARCH_RECENT_HISTORY_CAPACITY = 5, t.SEARCH_RECENT_HISTORY_STORAGE_KEY = "search_recent_history", t.FILE_CATEGORIES_UNCHECKED = ((n = {})[r.FileCategory.IMAGE] = "unchecked", n[r.FileCategory.DOCUMENT] = "unchecked", n[r.FileCategory.PDF] = "unchecked", n[r.FileCategory.SPREADSHEET] = "unchecked", n[r.FileCategory.PRESENTATION] = "unchecked", n[r.FileCategory.AUDIO] = "unchecked", n[r.FileCategory.VIDEO] = "unchecked", n[r.FileCategory.FOLDER] = "unchecked", n[r.FileCategory.PAPER] = "unchecked", n[r.FileCategory.OTHER] = "unchecked", n), t.FILE_CATEGORIES_CHECKED = ((s = {})[r.FileCategory.IMAGE] = "checked", s[r.FileCategory.DOCUMENT] = "checked", s[r.FileCategory.PDF] = "checked", s[r.FileCategory.SPREADSHEET] = "checked", s[r.FileCategory.PRESENTATION] = "checked", s[r.FileCategory.AUDIO] = "checked", s[r.FileCategory.VIDEO] = "checked", s[r.FileCategory.FOLDER] = "checked", s[r.FileCategory.PAPER] = "checked", s[r.FileCategory.OTHER] = "checked", s), t.TIME_TO_INVALIDATE_QUERY_SUGGESTIONS_CACHE = 6e4, t.SEARCH_CONTACT_SUGGESTION_CAPACITY = 3
})), define("modules/clean/search/models", ["require", "exports", "tslib", "deep-freeze", "modules/clean/react/browse/models"], (function(e, t, r, n, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n);
    var i = (function() {
        function e(e) {
            this.fq_path = e.fq_path, this.is_unmounted = e.is_unmounted, this.icon = e.icon, this.filename_highlights = e.filename_highlights, this.highlight_spans = e.highlight_spans, this.ns_id = e.ns_id, this.sjid = e.sjid, this.is_dir = e.is_dir, this.is_symlink = e.is_symlink, this.type = e.type, this.ns_path = e.ns_path, this.match_type = e.match_type, this._mount_access_perms = e.mount_access_perms, this.thumbnail_url_tmpl = e.thumbnail_url_tmpl, this.hover_preview_url = e.hover_preview_url, this.request_id = e.request_id, this.sort_rank = e.sort_rank, n.default(this)
        }
        return e.fromServerObject = function(t) {
            return new e(t)
        }, e
    })();
    t.SlimFileSearchResult = i, t.extractBrowseContext = function(e) {
        return new s.BrowseContext({
            isInFolderMode: e.inside_dir,
            inactiveNSIDByFQPath: e.old_path_to_ns_id,
            blockHash: e.block_hash
        })
    }
})), define("modules/clean/search/search_bar/chips", ["require", "exports", "tslib", "modules/clean/filepath"], (function(e, t, r, n) {
    "use strict";

    function s(e) {
        return n.paths_are_equal(e, "/")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.isScopeChipRoot = s, t.isValidPathForChip = function(e) {
        return !!e && !s(e)
    }
})), define("modules/clean/search/search_bar/data/reducer", ["require", "exports", "tslib", "modules/clean/react/browse/data/types", "modules/clean/search/constants", "modules/clean/search/search_bar/chips", "modules/clean/search/search_bar/data/types", "modules/clean/search/store_helpers"], (function(e, t, r, n, s, i, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), a = r.__importStar(a), t.defaultSearchBarState = {
        isSearchBarFocused: !1,
        searchHistory: [],
        query: "",
        searchSessionId: a.generateRandomId(),
        searchPath: "",
        isSearchBarLoading: !1,
        searchResults: [],
        hasMoreResults: !1,
        slimSearchResults: [],
        highlightedSearchRow: 0,
        browseScope: "/",
        canScope: !1,
        scopeChip: "/",
        experiments: {},
        fileCategories: r.__assign({}, s.FILE_CATEGORIES_UNCHECKED),
        resultsInvalid: !0
    };
    var _ = function(e, t) {
            var n = t.browseScope,
                s = e.scopeChip,
                o = i.isValidPathForChip(n);
            return r.__assign(r.__assign({}, e), {
                browseScope: n,
                canScope: o,
                scopeChip: o ? s : "/"
            })
        },
        c = function(e) {
            var n = e.scopeChip,
                s = e.searchHistory,
                i = e.browseScope,
                o = e.experiments;
            return r.__assign(r.__assign({}, t.defaultSearchBarState), {
                scopeChip: n,
                searchHistory: s,
                browseScope: i,
                experiments: o
            })
        };
    t.searchBarReducer = function(e, i) {
        switch (void 0 === e && (e = t.defaultSearchBarState), i.type) {
            case o.ActionTypes.FOCUS:
                return (function(e) {
                    return r.__assign(r.__assign({}, e), {
                        highlightedSearchRow: 0,
                        isSearchBarFocused: !0
                    })
                })(e);
            case o.ActionTypes.BLUR:
                return (function(e) {
                    return r.__assign(r.__assign({}, e), {
                        highlightedSearchRow: 0,
                        isSearchBarFocused: !1,
                        fileCategories: r.__assign({}, s.FILE_CATEGORIES_UNCHECKED)
                    })
                })(e);
            case o.ActionTypes.UPDATE_HISTORY:
                return (function(e, t) {
                    var n = t.searchHistory;
                    return r.__assign(r.__assign({}, e), {
                        searchHistory: n
                    })
                })(e, i.payload);
            case o.ActionTypes.SET_QUERY:
                return (function(e, t) {
                    var n = t.query,
                        s = t.searchPath,
                        i = t.searchSessionId,
                        o = t.keepHighlightedRow,
                        _ = e.searchSessionId;
                    i ? _ = i : a.shouldStartNewSearchSession(e.query, n) && (_ = a.generateRandomId());
                    var c = o ? e.highlightedSearchRow : 0;
                    return r.__assign(r.__assign({}, e), {
                        query: n,
                        searchPath: s,
                        searchSessionId: _,
                        searchResults: [],
                        hasMoreResults: !1,
                        isSearchBarLoading: !a.isBlank(n),
                        slimSearchResults: [],
                        highlightedSearchRow: c
                    })
                })(e, i.payload);
            case o.ActionTypes.SET_SEARCH_RESULTS:
                return (function(e, t) {
                    var n = t.searchResults;
                    return r.__assign(r.__assign({}, e), {
                        searchResults: n.results,
                        hasMoreResults: n.hasMore,
                        isSearchBarLoading: !1,
                        resultsInvalid: !1
                    })
                })(e, i.payload);
            case o.ActionTypes.SET_SLIM_SEARCH_RESULTS:
                return (function(e, t) {
                    var n = t.slimSearchResults;
                    return r.__assign(r.__assign({}, e), {
                        slimSearchResults: n.results,
                        hasMoreResults: n.hasMore,
                        isSearchBarLoading: !1,
                        resultsInvalid: !1
                    })
                })(e, i.payload);
            case o.ActionTypes.SET_HIGHLIGHTED_ROW:
                return (function(e, t) {
                    var n = t.highlightedSearchRow;
                    return r.__assign(r.__assign({}, e), {
                        highlightedSearchRow: n
                    })
                })(e, i.payload);
            case o.ActionTypes.HIGHLIGHT_PREVIOUS_ROW:
                return (function(e) {
                    var t = Math.max(0, e.highlightedSearchRow - 1);
                    return r.__assign(r.__assign({}, e), {
                        highlightedSearchRow: t
                    })
                })(e);
            case o.ActionTypes.HIGHLIGHT_NEXT_ROW:
                return (function(e) {
                    var t = !a.isBlank(e.query),
                        n = Math.min(s.MaxResults.MAX_SEARCH_SUGGESTIONS, e.slimSearchResults.length || e.searchResults.length) || !t && e.searchHistory.length || 0,
                        i = 0;
                    i += t ? 1 : 0, i += e.canScope ? 1 : 0;
                    var o = Math.min(n + i - 1, e.highlightedSearchRow + 1);
                    return r.__assign(r.__assign({}, e), {
                        highlightedSearchRow: o
                    })
                })(e);
            case o.ActionTypes.SET_BROWSE_SCOPE:
                return _(e, i.payload);
            case o.ActionTypes.SET_SCOPE_CHIP:
                return (function(e, t) {
                    var n = t.scopeChip;
                    return r.__assign(r.__assign({}, e), {
                        scopeChip: n || "/"
                    })
                })(e, i.payload);
            case o.ActionTypes.CLEAR:
                return c(e);
            case o.ActionTypes.SET_EXPERIMENTS:
                return (function(e, t) {
                    var n = t.experiments;
                    return r.__assign(r.__assign({}, e), {
                        experiments: n
                    })
                })(e, i.payload);
            case o.ActionTypes.SET_FILE_CATEGORIES:
                return (function(e, t) {
                    var n = t.fileCategories;
                    return r.__assign(r.__assign({}, e), {
                        fileCategories: n
                    })
                })(e, i.payload);
            case o.ActionTypes.INVALIDATE_RESULTS:
                return (function(e) {
                    return r.__assign(r.__assign({}, e), {
                        resultsInvalid: !0
                    })
                })(e);
            case n.ActionTypes.SET_PATH:
                return (function(e, t) {
                    return _(c(e), {
                        browseScope: t.path
                    })
                })(e, i.payload);
            default:
                return e
        }
    }
})), define("modules/clean/search/search_bar/data/selectors", ["require", "exports", "tslib", "reselect", "modules/clean/filepath", "modules/clean/react/browse/models", "modules/clean/redux/namespaces", "modules/clean/redux/selectors", "modules/clean/search/store_helpers", "modules/clean/search/types"], (function(e, t, r, n, s, i, o, a, _, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), s = r.__importStar(s), _ = r.__importStar(_);
    var E = function(e) {
        return a.getStateAtNamespace(e, o.SEARCH_BAR_NAMESPACE_KEY)
    };
    t.isSearchBarFocused = function(e) {
        return E(e).isSearchBarFocused
    }, t.searchHistory = function(e) {
        return E(e).searchHistory
    }, t.rawQuery = function(e) {
        return E(e).query
    }, t.normalizedQuery = function(e) {
        return _.normalize(t.rawQuery(e))
    }, t.searchSessionId = function(e) {
        return E(e).searchSessionId
    }, t.isSearchBarActive = function(e) {
        return !!t.rawQuery(e)
    }, t.searchPath = function(e) {
        return E(e).searchPath
    }, t.isSearchBarLoading = function(e) {
        return E(e).isSearchBarLoading
    }, t.searchResults = function(e) {
        return E(e).searchResults
    }, t.hasMoreResults = function(e) {
        return E(e).hasMoreResults
    }, t.slimSearchResults = function(e) {
        return E(e).slimSearchResults
    }, t.highlightedSearchRow = function(e) {
        return E(e).highlightedSearchRow
    }, t.searchResultForPath = function(e, r) {
        return t.searchResults(e).find((function(e) {
            return e instanceof i.File && s.paths_are_equal(e.fq_path, r)
        }))
    }, t.browseScope = function(e) {
        return E(e).browseScope
    }, t.scopeChip = function(e) {
        return E(e).scopeChip
    }, t.canScope = function(e) {
        return E(e).canScope
    }, t.experiments = function(e) {
        return E(e).experiments
    }, t.fileCategories = function(e) {
        return E(e).fileCategories
    }, t.resultsInvalid = function(e) {
        return E(e).resultsInvalid
    }, t.headerItems = n.createSelector(t.normalizedQuery, t.canScope, t.experiments, (function(e, t, r) {
        var n = [];
        return "" !== e && n.push(c.SearchBarDropdownHeaderItemType.SEARCH_ALL), t && n.push(c.SearchBarDropdownHeaderItemType.SCOPE_CHIPS), n
    }))
})), define("modules/clean/search/search_bar/data/store", ["require", "exports", "modules/clean/redux/store", "modules/clean/redux/namespaces", "modules/clean/search/search_bar/data/reducer"], (function(e, t, r, n, s) {
    "use strict";
    var i;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getStoreForSearchBar = function() {
        var e;
        return i || (i = r.getStoreAndRegisterReducers(((e = {})[n.SEARCH_BAR_NAMESPACE_KEY] = s.searchBarReducer, e))), i
    }
})), define("modules/clean/search/search_bar/data/types", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.FOCUS = "SEARCH_BAR/FOCUS", e.BLUR = "SEARCH_BAR/BLUR", e.CLEAR = "SEARCH_BAR/CLEAR", e.UPDATE_HISTORY = "SEARCH_BAR/UPDATE_HISTORY", e.SET_QUERY = "SEARCH_BAR/SET_QUERY", e.SET_SEARCH_RESULTS = "SEARCH_BAR/SET_SEARCH_RESULTS", e.SET_SLIM_SEARCH_RESULTS = "SEARCH_BAR/SET_SLIM_SEARCH_RESULTS", e.SET_HIGHLIGHTED_ROW = "SEARCH_BAR/SET_HIGHLIGHTED_ROW", e.HIGHLIGHT_PREVIOUS_ROW = "SEARCH_BAR/HIGHLIGHT_PREVIOUS_ROW", e.HIGHLIGHT_NEXT_ROW = "SEARCH_BAR/HIGHLIGHT_NEXT_ROW", e.SET_BROWSE_SCOPE = "SEARCH_BAR/SET_BROWSE_SCOPE", e.SET_SCOPE_CHIP = "SEARCH_BAR/SET_SCOPE_CHIP", e.SET_EXPERIMENTS = "SEARCH_BAR/SET_EXPERIMENTS", e.SET_FILE_CATEGORIES = "SEARCH_BAR/SET_FILE_CATEGORIES", e.INVALIDATE_RESULTS = "SEARCH_BAR/INVALIDATE_RESULTS"
    })(t.ActionTypes || (t.ActionTypes = {}))
})), define("modules/clean/search/search_helpers", ["require", "exports", "tslib", "sjcl", "modules/clean/react/browse/models", "modules/clean/react/browse/constants", "modules/clean/search/types", "modules/clean/react/files_view/types", "modules/clean/search/constants", "modules/clean/search/models", "modules/core/uri", "modules/clean/browse_uri_interface", "modules/core/cookies"], (function(e, t, r, n, s, i, o, a, _, c, E, l, u) {
    "use strict";

    function d(e, t) {
        var n;
        return void 0 === t && (t = !0), t || (e = r.__assign(r.__assign({}, e), ((n = {})[o.FileCategory.PAPER] = "unchecked", n))), Object.keys(e).every((function(t) {
            return "unchecked" === e[t]
        }))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.buildSearchURL = function(e) {
        var t = e.user,
            n = e.searchPath,
            s = e.normalizedQuery,
            i = e.searchSessionId,
            o = e.searchToken,
            a = e.qargs,
            _ = r.__assign({
                path: n,
                search_session_id: i,
                search_token: o,
                query: s
            }, a);
        return new E.URI({
            path: "/search/" + t.role,
            query: _
        })
    }, t.resultObjectToUrl = function(e, t) {
        return e instanceof c.SlimFileSearchResult || e instanceof s.File ? l.browse_uri_for_fq_path(t, e.fq_path).toString() : e instanceof s.FileSharedWithMe ? e.href : e.url
    }, t.shouldHandleClick = function(e) {
        return 0 === e.button && !e.altKey && !e.ctrlKey && !e.metaKey
    }, t.getSearchCsrfToken = function() {
        var e = n.codec.utf8String.toBits(u.Cookies.read("__Host-js_csrf")),
            t = n.codec.utf8String.toBits("search"),
            r = new n.misc.hmac(e);
        return n.codec.base64.fromBits(r.encrypt(t))
    }, t.fileCategoriesToString = function(e) {
        var t = [];
        return Object.keys(e).forEach((function(r) {
            "checked" === e[r] && t.push(r)
        })), t.join(",")
    }, t.fileCategoriesFromString = function(e) {
        var t = r.__assign({}, _.FILE_CATEGORIES_UNCHECKED);
        return e && e.split(",").forEach((function(e) {
            e in t && (t[e] = "checked")
        })), t
    }, t.fileCategoryStringToLogValue = function(e) {
        if (!e) return JSON.stringify(["all_unchecked"]);
        var t = e.split(","),
            r = t;
        return 10 === t.length ? JSON.stringify(["all_checked"]) : JSON.stringify(r)
    }, t.allCategoriesChecked = function(e, t) {
        var n;
        return void 0 === t && (t = !0), t || (e = r.__assign(r.__assign({}, e), ((n = {})[o.FileCategory.PAPER] = "checked", n))), Object.keys(e).every((function(t) {
            return "checked" === e[t]
        }))
    }, t.allCategoriesUnchecked = d, t.fileCategoriesSet = function(e, t) {
        return void 0 === t && (t = !0), !!e && !d(e, t)
    }, t.sortFieldToOrderBy = function(e) {
        switch (e) {
            case a.SortField.MODIFIED:
                return i.SEARCH_ORDER_BY_TYPE.LAST_MODIFIED_TIME;
            case a.SortField.RELEVANCE:
            default:
                return i.SEARCH_ORDER_BY_TYPE.RELEVANCE
        }
    }, t.orderByToSortField = function(e) {
        switch (e) {
            case i.SEARCH_ORDER_BY_TYPE.LAST_MODIFIED_TIME:
                return a.SortField.MODIFIED;
            case i.SEARCH_ORDER_BY_TYPE.RELEVANCE:
            default:
                return a.SortField.RELEVANCE
        }
    }, t.sortDirectionToReverseOrder = function(e) {
        switch (e) {
            case a.SortDirection.ASCENDING:
                return i.SEARCH_REVERSE_ORDER_TYPE.TRUE;
            case a.SortDirection.DESCENDING:
            default:
                return i.SEARCH_REVERSE_ORDER_TYPE.FALSE
        }
    }, t.reverseOrderToSortDirection = function(e) {
        switch (e) {
            case i.SEARCH_REVERSE_ORDER_TYPE.TRUE:
                return a.SortDirection.ASCENDING;
            case i.SEARCH_REVERSE_ORDER_TYPE.FALSE:
            default:
                return a.SortDirection.DESCENDING
        }
    }, t.areSortOrdersEqual = function(e, t) {
        return !e && !t || !(!e || !t) && (e.sortField === t.sortField && e.sortDirection === t.sortDirection)
    }
})), define("modules/clean/search/store_helpers", ["require", "exports"], (function(e, t) {
    "use strict";

    function r(e) {
        return e.trim().replace(/\ +/g, " ")
    }

    function n(e) {
        return !r(e)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.normalize = r, t.isBlank = n, t.shouldStartNewSearchSession = function(e, t) {
        return !(!n(e) || n(t)) || (!(n(e) || !n(t)) || e.length >= 3 && 1 === t.length)
    }, t.generateRandomId = function() {
        for (var e = "", t = 0; t < 32; t++) {
            var r = Math.floor(10 * Math.random());
            e += String(r)
        }
        return e
    }
})), define("modules/clean/search/types", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SearchResultTypes = {
        FILE: "FILE",
        FILE_SHARED_WITH_ME: "FILE_SHARED_WITH_ME",
        PAPER: "PAPER",
        PAPER_FOLDER: "PAPER_FOLDER"
    }, (function(e) {
        e.NOT_LOADED = "NOT_LOADED", e.LOADING = "LOADING", e.LOADED = "LOADED", e.DISMISSED = "DISMISSED", e.FAILED = "FAILED"
    })(t.QuerySuggestionsLoadingState || (t.QuerySuggestionsLoadingState = {})), (function(e) {
        e.V1 = "V1", e.V2 = "V2", e.V3 = "V3", e.OFF = "OFF", e.CONTROL = "CONTROL", e.HOLDOUT = "HOLDOUT"
    })(t.BrowseSuccessBannerVariants || (t.BrowseSuccessBannerVariants = {})), (function(e) {
        e.ON = "ON", e.OFF = "OFF", e.CONTROL = "CONTROL", e.HOLDOUT = "HOLDOUT"
    })(t.PeopleFilterVariants || (t.PeopleFilterVariants = {})), (function(e) {
        e.NOT_LOADED = "NOT_LOADED", e.LOADING = "LOADING", e.LOADED = "LOADED", e.DISMISSED = "DISMISSED", e.FAILED = "FAILED"
    })(t.PeopleSuggestionsLoadingState || (t.PeopleSuggestionsLoadingState = {})), (function(e) {
        e.IMAGE = "image", e.DOCUMENT = "document", e.PDF = "pdf", e.SPREADSHEET = "spreadsheet", e.PRESENTATION = "presentation", e.AUDIO = "audio", e.VIDEO = "video", e.FOLDER = "folder", e.PAPER = "paper", e.OTHER = "other"
    })(t.FileCategory || (t.FileCategory = {})), (function(e) {
        e.OFF = "OFF", e.IMAGE_PANEL = "IMAGE_PANEL", e.TAB = "TAB", e.NONE = "NONE"
    })(t.ImageSearchDiscoveryVariants || (t.ImageSearchDiscoveryVariants = {})), (function(e) {
        e.OFF = "OFF", e.CONTROL = "CONTROL", e.A_V1 = "A_V1", e.A_V2 = "A_V2"
    })(t.SearchLockupVariants || (t.SearchLockupVariants = {})), (function(e) {
        e.SEARCH_ALL = "SEARCH_ALL", e.SCOPE_CHIPS = "SCOPE_CHIPS"
    })(t.SearchBarDropdownHeaderItemType || (t.SearchBarDropdownHeaderItemType = {}))
})), define("modules/clean/sharing/access_level", ["require", "exports", "tslib", "external/lodash"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), (function(e) {
        e[e.ACCESS_NO_ACCESS = 0] = "ACCESS_NO_ACCESS", e[e.ACCESS_READER_NO_COMMENT = -10] = "ACCESS_READER_NO_COMMENT", e[e.ACCESS_READER = 1] = "ACCESS_READER", e[e.ACCESS_WRITER = 2] = "ACCESS_WRITER", e[e.ACCESS_OWNER = 3] = "ACCESS_OWNER"
    })(t.NameSpaceAccess || (t.NameSpaceAccess = {})), t.ACCESS_LEVEL = {
        OWNER: "owner",
        WRITER: "writer",
        READER: "reader",
        READER_NO_COMMENT: "reader_no_comment"
    }, t.ACCESS_VALUES = n.values(t.ACCESS_LEVEL);
    var s = {
        reader_no_comment: -10,
        reader: 1,
        writer: 2,
        owner: 3
    };
    t.isLowerAccess = function(e, r) {
        var n = Object.keys(s);
        return e !== r && -1 !== n.indexOf(e) && -1 !== n.indexOf(r) && t.getMaxAccess([e, r]) === e
    }, t.getMaxAccess = function(e) {
        if (0 === e.length) throw Error("Argument accessLevels are not valid.");
        for (var t = e[0], r = s[t], n = 0; n < e.length; n++) {
            var i = e[n],
                o = s[i];
            o > r && (r = o, t = i)
        }
        return t
    }
})), define("modules/clean/sharing/constants", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e[e.PUBLIC = 1] = "PUBLIC", e[e.TEAM_ONLY = 2] = "TEAM_ONLY", e[e.PASSWORD = 3] = "PASSWORD", e[e.ONLY_YOU = 99] = "ONLY_YOU"
    })(t.SHMODEL_LINK_TOKEN_VISIBILITY || (t.SHMODEL_LINK_TOKEN_VISIBILITY = {})), t.MEMBER_ACTION = {
        LEAVE_A_COPY: "leave_a_copy",
        MAKE_EDITOR: "make_editor",
        MAKE_OWNER: "make_owner",
        MAKE_VIEWER: "make_viewer",
        MAKE_VIEWER_NO_COMMENT: "make_viewer_no_comment",
        REMOVE: "remove",
        MANAGE_LINK_ACCESS: "manage_link_access",
        ALL: ["leave_a_copy", "make_editor", "make_owner", "make_viewer", "make_viewer_no_comment", "remove"]
    }, t.SNIPPET_SIZES = {
        FILENAME: 22,
        DISPLAY_NAME: 26,
        EMAIL: 30,
        OUT_OF_QUOTA_FOLDER_NAME: 15,
        NEW_FOLDER_MODAL_FOLDER_NAME: 15,
        SHARE_ME_MANAGE_ACCESS_FILE_FOLDER_TITLE: 15
    }, t.VALIDATE_PATH_PERMISSIONS_CONFIDENTIAL_AWARE = {
        change_options: "canChangeOptions",
        disable_viewer_info: "disableViewerInfo",
        edit_contents: "canEditContents",
        enable_viewer_info: "enableViewerInfo",
        invite_editor: "canInviteEditor",
        invite_viewer: "canInviteViewer",
        invite_viewer_no_comment: "canInviteViewerNoComment",
        unshare: "canUnshareFolder",
        update_confidentiality: "canUpdateConfidentiality",
        relinquish_membership: "canRelinquishMembership"
    }, t.ALPHA_FOLDER_METADATA_PERMISSIONS = {
        change_options: "canChangeOptions",
        disable_viewer_info: "disableViewerInfo",
        edit_contents: "canEditContents",
        enable_viewer_info: "enableViewerInfo",
        invite_editor: "canInviteEditor",
        invite_viewer: "canInviteViewer",
        invite_viewer_no_comment: "canInviteViewerNoComment",
        leave_a_copy: "leaveACopy",
        relinquish_membership: "canRelinquishMembership",
        remove_download_policy: "removeDownloadPolicy",
        set_download_policy: "setDownloadPolicy",
        unmount: "canUnmountFolder",
        unshare: "canUnshareFolder",
        update_confidentiality: "canUpdateConfidentiality"
    }, t.ALPHA_FILE_METADATA_PERMISSIONS = {
        change_options: "canChangeOptions",
        create_view_link: "createViewLink",
        create_edit_link: "createEditLink",
        disable_viewer_info: "disableViewerInfo",
        enable_viewer_info: "enableViewerInfo",
        invite_viewer: "canInviteViewer",
        invite_editor: "canInviteEditor",
        invite_viewer_no_comment: "canInviteViewerNoComment",
        relinquish_membership: "canRelinquishMembership",
        remove_download_policy: "removeDownloadPolicy",
        set_download_policy: "setDownloadPolicy",
        unshare: "unshare",
        share_message_as_comment: "shareMessageAsComment"
    }, t.FILE_METADATA_PERMISSIONS = {
        invite_viewer: "canInviteViewer",
        invite_editor: "canInviteEditor",
        invite_viewer_no_comment: "canInviteViewerNoComment",
        relinquish_membership: "canRelinquishMembership",
        unshare: "unshare"
    }, (function(e) {
        e.BROWSE_FILE_ROW = "BROWSE_FILE_ROW", e.FILE_ROW_SHARE_MENU = "FILE_ROW_SHARE_MENU", e.PREVIEW_PAGE = "PREVIEW_PAGE", e.NOTIFICATION_WEB = "NOTIFICATION_WEB", e.RECENTS = "RECENTS", e.SHARE = "SHARE", e.SYNC_MODAL = "SYNC_MODAL", e.GRANT_ACCESS = "GRANT_ACCESS", e.DESKTOP_CLIENT = "DESKTOP_CLIENT", e.WIZARD = "WIZARD", e.OFFICE_INTEGRATION = "OFFICE_INTEGRATION", e.LEGACY_BROWSE = "LEGACY_BROWSE", e.SHARE_LINK_MODAL = "SHARE_LINK_MODAL", e.BROWSE_SHARED_FOLDER_BANNER = "BROWSE_SHARED_FOLDER_BANNER", e.BROWSE_GLOBAL_ACTIONS = "BROWSE_GLOBAL_ACTIONS", e.EVENTS_PAGE = "EVENTS_PAGE", e.BROWSE_FILE_ACTIONS = "BROWSE_FILE_ACTIONS", e.CONTENT_MANAGER = "CONTENT_MANAGER", e.PARENT_FOLDER_MODAL = "PARENT_FOLDER_MODAL", e.OUT_OF_QUOTA_MODAL = "OUT_OF_QUOTA_MODAL", e.LINKS_PAGE = "LINKS_PAGE", e.PREVIEW_PAGE_FACEPILE = "PREVIEW_PAGE_FACEPILE", e.BROWSE_FILE_FACEPILE = "BROWSE_FILE_FACEPILE", e.SHARE_PAGE_FROM_EMAIL = "SHARE_PAGE_FROM_EMAIL", e.SHARE_PAGE_FROM_NOTIFICATION_WEB = "SHARE_PAGE_FROM_NOTIFICATION_WEB", e.COPY_SCL_LINK_MODAL = "COPY_SCL_LINK_MODAL", e.HARMONY = "HARMONY", e.NOTIFICATION_CLIENT = "NOTIFICATION_CLIENT", e.NATIVE_SHARE_CLIENT = "NATIVE_SHARE_CLIENT", e.FILESYSTEM = "FILESYSTEM", e.NOTIFICATION_MOBILE = "NOTIFICATION_MOBILE", e.WEB_MOBILE = "WEB_MOBILE", e.IN_APP = "IN_APP", e.EMAIL = "EMAIL", e.GMAIL_PLUGIN = "GMAIL_PLUGIN", e.PAPER_INTEGRATION = "PAPER_INTEGRATION", e.GOOGLE_DSS = "GOOGLE_DSS", e.BROWSE_NEW_FOLDER_MODAL = "BROWSE_NEW_FOLDER_MODAL", e.TRELLO_FILE_VIEWER = "TRELLO_FILE_VIEWER", e.STARRED = "STARRED", e.AUTO_MOUNT = "AUTO_MOUNT", e.DROPBOX_FORM = "DROPBOX_FORM", e.VIEW_LINK_ONLY_MODAL = "VIEW_LINK_ONLY_MODAL", e.VIEW_SHARE_MODAL = "VIEW_SHARE_MODAL", e.MEMBER_LIST_LOADED = "MEMBER_LIST_LOADED"
    })(t.SHARE_ACTION_ORIGIN_TYPE || (t.SHARE_ACTION_ORIGIN_TYPE = {})), (function(e) {
        e.Content = "c", e.Shmodel = "s"
    })(t.SharedLinkType || (t.SharedLinkType = {})), t.FETCH_FILE_MEMBER_COUNT_LIMIT = 100, t.COLORS = {
        COLOR_INK_60: "#717781"
    }, t.SHARE_SCREEN = "share", t.MANAGE_SCREEN = "manage", t.SETTINGS_SCREEN = "settings"
})), define("modules/clean/ux_analytics/UxAnalyticsDispatcher", ["require", "exports", "tslib", "modules/clean/ux_analytics/dispatch_custom_event", "modules/core/exception"], (function(e, t, r, n, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.UXA_HISTORY_CHANGE_EVENT = "historyChange";
    var i = null;
    t.UxAnalyticsDispatcher = {
        initUrl: function(e) {
            i = e
        },
        dispatchHistoryChange: function(e) {
            s.assert(null !== i, "spaChangesToUxa needs an initial URL");
            var r = {
                detail: {
                    previousUrl: i,
                    url: i = e
                }
            };
            n.dispatchCustomEvent(t.UXA_HISTORY_CHANGE_EVENT, r)
        },
        reset: function() {
            i = null
        }
    }
})), define("modules/clean/ux_analytics/dispatch_custom_event", ["require", "exports"], (function(e, t) {
    "use strict";

    function r(e, t) {
        if (void 0 === t && (t = {
                detail: null
            }), "function" == typeof CustomEvent) return new CustomEvent(e, t);
        var r = document.createEvent("CustomEvent");
        return r.initCustomEvent(e, !0, !0, t.detail), r
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createCustomEvent = r, t.dispatchCustomEvent = function(e, t) {
        window.dispatchEvent(r(e, t))
    }
})), define("modules/clean/web_user_action_events", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.ADD_COMMENT = "add_comment", e.ARCHIVE = "archive", e.ATTACHMENT_ADD_SUCCESS = "attachment_add_success", e.ATTACHMENT_CLICKED = "attachment_clicked", e.ATTACHMENT_REMOVED = "attachment_removed", e.CALCULATE_SIZE = "calculate_size", e.CALENDAR_TAB_CLICKED = "calendar_tab_clicked", e.CALENDAR_SUGGESTIONS_REMOVED = "calendar_suggestions_removed", e.CLICK_ADD_ATTACHMENT = "click_add_attachment", e.CLICK_CONVERT_INDIVIDUAL_ACCOUNT = "click_convert_individual_account", e.CLICK_LEARN_MORE_ACCOUNT_CONVERSION = "click_learn_more_account_conversion", e.CLICK_PATH_LINK = "click_path_link", e.CLICK_REVIEW_SUMMARY_DELETE_USER = "click_review_summary_delete_user", e.CONTEXT_MENU = "context_menu", e.CONTEXT_MENU_CLICK = "context_menu_click", e.COPY = "copy", e.COPY_REQUEST_SUCCESS = "copy_request_success", e.COPY_REQUEST_FAIL = "copy_request_fail", e.COPY_UNDO = "copy_undo", e.COPY_UNDO_REQUEST_SUCCESS = "copy_undo_request_success", e.COPY_UNDO_REQUEST_FAIL = "copy_undo_request_fail", e.COPY_ACCEPT_CLICK = "copy_accept_click", e.CREATE_FOLDER = "create_folder", e.CREATE_FOLDER_CANCEL = "create_folder_cancel", e.CREATE_FOLDER_ERROR = "create_folder_error", e.CREATE_FOLDER_PENDING = "create_folder_pending", e.CREATE_FOLDER_SUCCESS = "create_folder_success", e.DELETE_REQUEST_SUCCESS = "delete_request_success", e.DELETE_REQUEST_FAIL = "delete_request_fail", e.DELETE_UNDO = "delete_undo", e.DELETE_UNDO_REQUEST_FAIL = "delete_undo_request_fail", e.DELETE_UNDO_REQUEST_SUCCESS = "delete_undo_request_success", e.DISBAND_TEAM_CONFIRM = "disband_team_confirm", e.DISBAND_TEAM_KEEP = "disband_team_keep", e.DISBAND_TEAM_LEARN_MORE = "disband_team_learn_more", e.DISBAND_TEAM_VIEW = "disband_team_view", e.DELETE = "delete", e.DELETE_ACCEPT_CLICK = "delete_accept_click", e.DOWNLOAD = "download", e.EVENTS = "events", e.FILE_VIEW = "file_view", e.FILE_UPLOAD_FSW_RETURNED = "file_upload_fsw_returned", e.FOLDER_OPEN = "folder_open", e.INTERSTITIAL_LOGIN_ACTION = "interstitial_login_action", e.KEYBOARD_SHORTCUT = "keyboard_shortcut", e.LEAVE_TEAM_CANCEL = "leave_team_cancel", e.LEAVE_TEAM_LEARN_MORE = "leave_team_learn_more", e.LEAVE_TEAM_VIEW = "leave_team_view", e.LINK_GOOGLE_CAL_CLICKED = "link_google_cal_clicked", e.LINK_GOOGLE_CAL_SUCCESS = "link_google_cal_success", e.LOGGED_OUT_UX_SNACKBAR_ACTION = "logged_out_ux_snackbar_action", e.MOVE = "move", e.MOVE_REQUEST_SUCCESS = "move_request_success", e.MOVE_REQUEST_FAIL = "move_request_fail", e.MOVE_UNDO = "move_undo", e.MOVE_UNDO_REQUEST_SUCCESS = "move_undo_request_success", e.MOVE_UNDO_REQUEST_FAIL = "move_undo_request_fail", e.MOVE_ACCEPT_CLICK = "move_accept_click", e.OPEN_ADD_TO_COLLECTION_MODAL = "open_add_to_collection_modal", e.OPEN_CALENDAR_FLYOUT = "open_calendar_flyout", e.OPEN_COPY_MODAL = "open_copy_modal", e.OPEN_DELETE_USER_MODAL = "open_delete_user_modal", e.OPEN_MOVE_MODAL = "open_move_modal", e.OPEN_ROW = "open_row", e.PAPER_CONTEXT_MENU = "paper_context_menu", e.PAPER_OPEN = "paper_open", e.PERMANENT_DELETE = "permanent_delete", e.PERMANENT_DELETE_ACCEPT_CLICK = "permanent_delete_accept_click", e.RENAME = "rename", e.RENAME_REQUEST_SUCCESS = "rename_request_success", e.RENAME_REQUEST_FAIL = "rename_request_fail", e.RENAME_UNDO = "rename_undo", e.RENAME_UNDO_REQUEST_SUCCESS = "rename_undo_request_success", e.RENAME_UNDO_REQUEST_FAIL = "rename_undo_request_fail", e.RESTORE = "restore", e.RESTORE_ACCEPT_CLICK = "restore_accept_click", e.RIGHT_CLICK_ITEMS = "right_click_items", e.SELECT_ROW = "select_row", e.SHARE = "share", e.OPEN_SPLITSHARE = "open_splitshare", e.OPEN_EXTENSIONS = "open_extensions", e.EXTENSIONS_SELECTED = "extensions_selected", e.SHOW_IN_FOLDER = "show_in_folder", e.SORT_RECORDS = "sort_records", e.STAR = "star", e.REMOVE_STAR = "remove_star", e.SWITCH_VIEW_TYPE = "switch_view_type", e.TOGGLE_DELETED_FILES = "toggle_deleted_files", e.UNSELECT_ROW = "unselect_row", e.VERSIONS = "versions", e.VIEW_SHARE_MODEL = "view_share_model", e.OPEN_DESKTOP = "open_via_unity", e.RESTORE_VERSION = "restore_version", e.CONF_BY_REMOVE_MEMBER = "conf_by_remove_member", e.CONF_BY_DOWNGRADE_MEMBER = "conf_by_downgrade_member", e.CONF_BY_MANAGE_ACCESS = "conf_by_manage_access", e.CONF_BY_UNDO_AFTER_RESTORE_ACCESS = "conf_by_undo_after_restore_access", e.CONF_BY_CREATE_CONFIDENTIAL_FOLDER = "conf_by_create_confidential_folder", e.ADD_MORE_FILES_CLICK = "add_more_files_click", e.CLOSE_MODAL_CLICK = "close_modal_click", e.UPLOAD_BUTTON_CLICK = "upload_button_click", e.VIEW_DETAILS_CLICK = "view_details_click", e.CANCEL_UPLOAD_CLICK = "cancel_upload_click", e.UPLOAD_CLICK = "upload_click", e.UPLOAD_FILES_CLICK = "upload_files_click", e.UPLOAD_FOLDER_CLICK = "upload_folder_click", e.FILE_CREATE_OPEN_MENU = "file_create_open_menu", e.FILE_CREATE_WORD = "file_create_word", e.FILE_CREATE_POWERPOINT = "file_create_powerpoint", e.FILE_CREATE_EXCEL = "file_create_excel", e.FILE_CREATE_HOME_FOLDER_SELECTED = "file_create_home_folder_selected", e.FILE_CREATE_SUCCESS = "file_create_success", e.FILE_CREATE_PAPER = "file_create_paper", e.FILE_CREATE_PAPER_TEMPLATE = "file_create_paper_template", e.FILE_CREATE_BINDER = "file_create_binder", e.FILE_CREATE_DROPBOX_FORM = "file_create_dropbox_form", e.FILE_CREATE_GOOGLE_DOC = "file_create_google_doc", e.FILE_CREATE_GOOGLE_SHEET = "file_create_google_sheet", e.FILE_CREATE_GOOGLE_SLIDES = "file_create_google_slides", e.FILE_CREATE_SIMPLE_POINTER = "file_create_simple_pointer", e.FILE_CREATE_SHORTCUT_GDOC = "file_create_shortcut_gdoc", e.FILE_CREATE_SHORTCUT_GSHEET = "file_create_shortcut_gsheet", e.FILE_CREATE_SHORTCUT_GSLIDES = "file_create_shortcut_gslides", e.FILE_CREATE_TITLE_FLOW_SHOW = "file_create_title_flow_show", e.FILE_CREATE_TITLE_FLOW_NAME_DOC = "file_create_title_flow_name_doc", e.FILE_CREATE_TITLE_FLOW_CONFIRM = "file_create_title_flow_confirm", e.FILE_CREATE_TITLE_FLOW_CANCEL = "file_create_title_flow_cancel", e.FILE_OPEN_PROMPT_ACTION = "file_open_prompt_action", e.FILE_CONVERT_PROMPT_ACTION = "file_convert_prompt_action", e.FOLDER_OVERVIEW_TOGGLED = "folder_overview_toggled", e.FOLDER_OVERVIEW_EDITED = "folder_overview_edited", e.FOLDER_OVERVIEW_DESCRIPTION_SAVE = "folder_overview_description_save", e.FOLDER_OVERVIEW_UNPIN = "folder_overview_unpin", e.FOLDER_OVERVIEW_PIN = "folder_overview_pin", e.FOLDER_OVERVIEW_PIN_CLICK = "folder_overview_pin_click", e.FOLDER_OVERVIEW_EXAMPLES_CLICK = "folder_overview_examples_click", e.FOLDER_OVERVIEW_TASK_COMPLETED = "folder_overview_task_completed", e.LOCK_FILE = "lock_file", e.UNLOCK_FILE = "unlock_file", e.REQUEST_UNLOCK_FILE = "request_unlock", e.PAGE_VIEW = "page_view", e.BROWSE_LOADED = "browse_loaded", e.SHOW_DELETED_FILES_CLICK = "show_deleted_files_click", e.VIEW_IN_ADMIN_CONSOLE_CLICK = "view_in_admin_console_click", e.NEW_SHARED_FOLDER_CLICK = "new_shared_folder_click", e.SELECT_FOLDER_TYPE = "select_folder_type", e.NEW_SHARED_FOLDER_SUCCESS = "new_shared_folder_success", e.NEW_FOLDER_CLICK = "new_folder_click", e.NEW_FOLDER_CHOOSE_AUDIENCE_CLICK = "new_folder_choose_audience_click", e.NEW_FOLDER_ADD_MEMBER = "new_folder_add_member", e.CREATE_CLICK = "create_click", e.CONSOLIDATED_UPLOAD_CLICK = "consolidated_upload_click", e.IMPORT_CLICK = "import_click", e.IMPORT_OPTION_CLICK = "import_option_click", e.SHORTCUTS_CREATE_INLINE_CELL_SELECT = "shortcuts_create_inline_cell_select", e.SHORTCUTS_CREATE_INLINE_CELL_URL_INPUT = "shortcuts_create_inline_cell_url_input", e.SHORTCUTS_CREATE_INLINE_CELL_URL_CONFIRMED = "shortcuts_create_inline_cell_url_confirmed", e.SHORTCUTS_CREATE_INLINE_CELL_ADD_NAME_CLICKED = "shortcuts_create_inline_cell_add_name_clicked", e.SHORTCUTS_CREATE_INLINE_CELL_SAVE_SHORTCUT = "shortcuts_create_inline_cell_save_shortcut", e.SHORTCUTS_CREATE_INLINE_CELL_CREATE_SUCCESS = "shortcuts_create_inline_cell_create_success"
    })(t.WebUserActionLogEvent || (t.WebUserActionLogEvent = {})), (function(e) {
        e.SHARED_FOLDER = "shared folder", e.FILE_FOLDER = "file folder", e.EVERYONE_GROUP_VIEW_ACCESS = "everyone group view access", e.SPECIFIC_PEOPLE = "specific people", e.BROWSE = "browse", e.CONTENT_MANAGER = "content manager"
    })(t.WebUserActionLogExtraValue || (t.WebUserActionLogExtraValue = {})), (function(e) {
        e.BROWSE = "browse", e.SEARCH = "search"
    })(t.RetrievalSourceValue || (t.RetrievalSourceValue = {})), (function(e) {
        e.OVERFLOW_MENU = "overflow_menu", e.RIGHT_SIDEBAR = "right_sidebar", e.CENTER_PANE = "center_pane", e.TOP_NAVIGATION = "top_navigation"
    })(t.ActionSurfaceLogValue || (t.ActionSurfaceLogValue = {})), (function(e) {
        e.ROW_SINGLE_CLICK = "row_single_click", e.ROW_DOUBLE_CLICK = "row_double_click", e.ROW_TITLE = "row_title", e.ROW_PREVIEW_ICON = "row_preview_icon", e.FOLDER_OVERVIEW = "folder_overview", e.KEYBOARD = "keyboard", e.SHARE = "share", e.SPLIT_SHARE = "split_share", e.OVERFLOW_MENU = "overflow_menu", e.WHITESPACE = "whitespace", e.SINGLE_CHECKBOX = "single_checkbox", e.ALL_CHECKBOX = "all_checkbox"
    })(t.ActionSourceValue || (t.ActionSourceValue = {}))
})), define("modules/clean/web_user_action_logger", ["require", "exports", "tslib", "modules/clean/ajax"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.MAX_ERRORS = 3;
    var s = (function() {
        function e() {
            this.errorCount = 0, this.lastError = Date.now(), this.shouldReport = !0
        }
        return e.prototype.log = function(e, r, s) {
            var i = this;
            return this.shouldReport && (this.errorCount < t.MAX_ERRORS || Date.now() - this.lastError > 6e5) ? new Promise((function(o, a) {
                n.SilentBackgroundRequest({
                    url: "/log/web_user_action",
                    data: {
                        _subject_uid: e,
                        event_type: r,
                        extra_params: JSON.stringify(s)
                    },
                    error: function(e) {
                        429 === e.status ? i.errorCount = t.MAX_ERRORS : i.errorCount++, i.lastError = Date.now(), a(e)
                    },
                    success: function(e) {
                        try {
                            var t = JSON.parse(e);
                            t && !t.continue_sending && (i.shouldReport = !1), i.errorCount = 0, o(e)
                        } catch (e) {
                            throw i.errorCount++, i.lastError = Date.now(), a(e), e
                        }
                    }
                })
            })) : Promise.resolve({})
        }, e
    })();
    t.WebUserActionLogClass = s, t.WebUserActionLog = new s
})), define("modules/clean/react/retrieval_success_banner/util", ["require", "exports", "tslib", "modules/clean/filepath", "modules/clean/history", "modules/clean/storage", "modules/clean/react/retrieval_success_banner/constants", "modules/clean/search/types", "modules/clean/web_timing_logger"], (function(e, t, r, n, s, i, o, a, _) {
    "use strict";
    var c, E;

    function l() {
        return c && E ? Promise.resolve({
            store: c,
            actionCreators: E
        }) : _.waitForTTI().then((function() {
            return Promise.all([new Promise((function(t, r) {
                e(["modules/clean/react/retrieval_success_banner/data/store"], t, r)
            })).then(r.__importStar), new Promise((function(t, r) {
                e(["modules/clean/react/retrieval_success_banner/data/action_creators"], t, r)
            })).then(r.__importStar)]).then((function(e) {
                var t = e[0],
                    r = e[1];
                return {
                    store: c = t.getStoreForSuccessBanner(),
                    actionCreators: E = r
                }
            }))
        }))
    }

    function u(e) {
        void 0 === e && (e = !0), e && p() || (i.LocalStorage.set(o.SEARCH_SUCCESS_SHOW_BANNER_KEY, e), l().then((function(t) {
            var r = t.store,
                n = t.actionCreators.updateSearchSuccessBannerVisibility;
            r.dispatch(n(e))
        })))
    }

    function d() {
        i.LocalStorage.set(o.SEARCH_RESULT_CLICK_TIMESTAMP_KEY, Date.now())
    }

    function S(e) {
        i.LocalStorage.set(o.SEARCH_RESULT_PATH_KEY, e)
    }

    function f() {
        return !!i.LocalStorage.get(o.SEARCH_RESULT_CLICK_KEY)
    }

    function p() {
        return !!i.LocalStorage.get(o.SEARCH_SUCCESS_OPT_OUT_KEY)
    }

    function h() {
        var e = i.LocalStorage.get(o.BROWSE_SUCCESS_COUNT_DOWN_ID);
        e && (clearTimeout(e), i.LocalStorage.delete(o.BROWSE_SUCCESS_COUNT_DOWN_ID))
    }

    function A() {
        i.LocalStorage.get(o.BROWSE_SUCCESS_COUNT_DOWN_COMPLETE) && (i.LocalStorage.delete(o.BROWSE_SUCCESS_COUNT_DOWN_COMPLETE), l().then((function(e) {
            var t = e.store,
                r = e.actionCreators.updateBrowseSuccessBannerCounterCompleteKey;
            t.dispatch(r(!1))
        })))
    }

    function O(e) {
        p() || i.LocalStorage.set(o.BROWSE_SUCCESS_BANNER_TRIGGER_ACTION, e)
    }

    function R() {
        var e = s.default.deconstruct_url(document.referrer).path.split("/").filter((function(e) {
            return !!e
        })).length;
        return e > 3 ? e - 3 : 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), s = r.__importDefault(s), t.resetSearchResultClickKey = function() {
        i.LocalStorage.delete(o.SEARCH_RESULT_CLICK_KEY)
    }, t.shouldShowSearchSuccessBanner = function() {
        return !!i.LocalStorage.get(o.SEARCH_SUCCESS_SHOW_BANNER_KEY)
    }, t.shouldShowBrowseSuccessBanner = function() {
        var e = !!i.LocalStorage.get(o.SEARCH_SUCCESS_OPT_OUT_KEY),
            t = !!i.LocalStorage.get(o.BROWSE_SUCCESS_COUNT_DOWN_COMPLETE),
            r = !!i.LocalStorage.get(o.SEARCH_SUCCESS_SHOW_BANNER_KEY),
            n = !!i.LocalStorage.get(o.BROWSE_SUCCESS_SHOW_BANNER_KEY);
        return !e && (t || n) && !r
    }, t.getSearchSuccessBannerVisibility = function() {
        return !!i.LocalStorage.get(o.SEARCH_SUCCESS_SHOW_BANNER_KEY) && !i.LocalStorage.get(o.SEARCH_SUCCESS_OPT_OUT_KEY)
    }, t.setSearchSuccessBannerVisible = u, t.setSearchResultClickTimestamp = d, t.getSearchResultClickTimestamp = function() {
        return i.LocalStorage.get(o.SEARCH_RESULT_CLICK_TIMESTAMP_KEY)
    }, t.getClickableFilePathClickTimestamp = function() {
        return i.LocalStorage.get(o.CLICKABLE_FILE_PATH_CLICK_TIMESTAMP_KEY)
    }, t.setSearchResultPath = S, t.setFolderSearchResultData = function(e) {
        p() || (d(), S(e))
    }, t.setClickablePathData = function(e) {
        p() || (i.LocalStorage.set(o.CLICKABLE_FILE_PATH_CLICK_TIMESTAMP_KEY, Date.now()), (function(e) {
            i.LocalStorage.set(o.CLICKABLE_PATH_KEY, e)
        })(e))
    }, t.getSearchResultPath = function() {
        return i.LocalStorage.get(o.SEARCH_RESULT_PATH_KEY)
    }, t.getClickablePath = function() {
        return i.LocalStorage.get(o.CLICKABLE_PATH_KEY)
    }, t.setClickedOnSearchResultsPageItem = function() {
        p() || i.LocalStorage.set(o.SEARCH_RESULT_CLICK_KEY, !0)
    }, t.getClickedOnSearchResultsPageItem = f, t.userIsOptedOutOfRetrievalSuccessBanner = p, t.optOutOfSearchSuccessBanner = function() {
        i.LocalStorage.set(o.SEARCH_SUCCESS_OPT_OUT_KEY, !0)
    }, t.optOutOfBrowseSuccessBanner = function() {
        i.LocalStorage.set(o.SEARCH_SUCCESS_OPT_OUT_KEY, !0)
    }, t.setSearchSuccessBannerVisibleFromHome = function() {
        i.LocalStorage.set(o.SEARCH_SUCCESS_SHOW_BANNER_FROM_HOME_KEY, !0)
    }, t.getSearchSuccessBannerVisibleFromHome = function() {
        return !!i.LocalStorage.get(o.SEARCH_SUCCESS_SHOW_BANNER_FROM_HOME_KEY)
    }, t.resetSearchSuccessBannerVisibleFromHome = function() {
        i.LocalStorage.delete(o.SEARCH_SUCCESS_SHOW_BANNER_FROM_HOME_KEY)
    }, t.parentPathOfFileEqualsSearchResultPath = function(e, t, r) {
        return n.parent_dir(e) === t && !r
    }, t.doSearchBarInteractionBroadcast = function(e) {
        l().then((function(t) {
            var r = t.store,
                n = t.actionCreators.updateSearchBarAbandoned;
            r.dispatch(n(e))
        }))
    }, t.doSearchResultBannerDismissBroadcast = function(e) {
        l().then((function(t) {
            var r = t.store,
                n = t.actionCreators.updateSearchResultBannerDismissed;
            r.dispatch(n(e))
        }))
    }, t.doSearchResultActionClickBroadcast = function(e) {
        p() || l().then((function(t) {
            var r = t.store,
                n = t.actionCreators.updateSearchResultActionClicked;
            r.dispatch(n(e))
        }))
    }, t.setupSearchSuccessBannerForHome = function() {
        s.default.deconstruct_url(document.referrer).qargs.search_session_id && !f() && u()
    }, t.tearDownSearchSuccessBannerForHome = function(e) {
        window.removeEventListener(o.SEARCH_BAR_ABANDONED_EVENT, e)
    }, t.isFilePreview = function() {
        return !!s.default.deconstruct_url().qargs.hasOwnProperty("preview")
    }, t.startBrowseSuccessBannerCounter = function(e) {
        void 0 === e && (e = a.BrowseSuccessBannerVariants.V1), A(), h();
        var t = o.BROWSE_SUCCESS_BANNER_V1_TIMER;
        e === a.BrowseSuccessBannerVariants.V3 && (t = o.BROWSE_SUCCESS_BANNER_V3_TIMER);
        var r = setTimeout((function() {
            i.LocalStorage.set(o.BROWSE_SUCCESS_COUNT_DOWN_COMPLETE, !0), l().then((function(e) {
                var t = e.store,
                    r = e.actionCreators.updateBrowseSuccessBannerCounterCompleteKey;
                t.dispatch(r(!0))
            }))
        }), t);
        i.LocalStorage.set(o.BROWSE_SUCCESS_COUNT_DOWN_ID, r)
    }, t.clearBrowseSuccessBannerCounter = h, t.clearBrowseSuccessBannerKey = A, t.updateRSBVisibility = function(e, t) {
        e || t ? l().then((function(e) {
            var t = e.store,
                r = e.actionCreators.updateRetrievalSuccessBannerVisibility;
            t.dispatch(r(!0))
        })) : l().then((function(e) {
            var t = e.store,
                r = e.actionCreators.updateRetrievalSuccessBannerVisibility;
            t.dispatch(r(!1))
        }))
    }, t.setBrowseSuccessBannerVisible = function(e) {
        var t = i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER),
            r = Date.now();
        !p() && r - t <= o.BROWSE_SUCCESS_BANNER_V2_TIMER && (i.LocalStorage.set(o.BROWSE_SUCCESS_SHOW_BANNER_KEY, !0), l().then((function(e) {
            var t = e.store,
                r = e.actionCreators.updateBrowseSuccessBannerVisibility;
            t.dispatch(r(!0))
        })), e && O(e))
    }, t.setBrowseSuccessBannerTimer = function() {
        if (!p())
            if (i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER)) {
                if (Date.now() - i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER) > o.BROWSE_SUCCESS_BANNER_V2_TIMER) i.LocalStorage.set(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER, Date.now());
                else if (!i.LocalStorage.get(o.BROWSE_SUCCESS_SHOW_BANNER_KEY)) {
                    i.LocalStorage.set(o.BROWSE_SUCCESS_BANNER_KEY_END_TIMER, Date.now()), i.LocalStorage.set(o.BROWSE_SUCCESS_SHOW_BANNER_KEY, !0), l().then((function(e) {
                        var t = e.store,
                            r = e.actionCreators.updateBrowseSuccessBannerVisibility;
                        t.dispatch(r(!0))
                    }));
                    var e = R();
                    i.LocalStorage.set(o.BROWSE_SUCCESS_BROWSE_SESSION_DEPTH, e)
                }
            } else i.LocalStorage.set(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER, Date.now())
    }, t.setBrowseSuccessTriggerAction = O, t.getDepthOfAbandonedBrowseSession = R, t.hasValidTriggerAction = function() {
        return !!i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_TRIGGER_ACTION)
    }, t.getBrowseSuccessTriggerAction = function() {
        return i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_TRIGGER_ACTION)
    }, t.isAbandonFlow = function() {
        return !!i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_KEY_END_TIMER)
    }, t.getDwellTime = function() {
        return (i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_KEY_END_TIMER) - i.LocalStorage.get(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER)).toString()
    }, t.getDepthOnLocalStorage = function() {
        var e = i.LocalStorage.get(o.BROWSE_SUCCESS_BROWSE_SESSION_DEPTH);
        return e || 0
    }, t.clearBSBExtraData = function() {
        i.LocalStorage.delete(o.BROWSE_SUCCESS_BANNER_KEY_START_TIMER), i.LocalStorage.delete(o.BROWSE_SUCCESS_BANNER_KEY_END_TIMER), i.LocalStorage.delete(o.BROWSE_SUCCESS_BANNER_TRIGGER_ACTION), i.LocalStorage.delete(o.BROWSE_SUCCESS_BROWSE_SESSION_DEPTH)
    }, t.deleteSearchSuccessBannerSettings = function() {
        i.LocalStorage.delete(o.SEARCH_SUCCESS_SHOW_BANNER_KEY)
    }
})), define("modules/clean/react/retrieval_success_banner/constants", ["require", "exports", "modules/core/i18n"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.BROWSE_SUCCESS_QUESTION = r.intl.formatMessage({
        defaultMessage: "Was Dropbox helpful today?"
    }), t.FEEDBACK_PLACEHOLDER = r.intl.formatMessage({
        defaultMessage: "Share the good, the bad, and the unexpected"
    }), t.SEARCH_SUCCESS_QUESTION = r.intl.formatMessage({
        defaultMessage: "Find what you were looking for?"
    }), t.SEARCH_SUCCESS_OPTION_YES = r.intl.formatMessage({
        defaultMessage: "Yes"
    }), t.SEARCH_SUCCESS_OPTION_NO = r.intl.formatMessage({
        defaultMessage: "No"
    }), t.SEARCH_SUCCESS_OPTION_KIND_OF = r.intl.formatMessage({
        defaultMessage: "Kind of"
    }), t.SEARCH_SUCCESS_THANKS_TEXT = r.intl.formatMessage({
        defaultMessage: "Thanks for the feedback."
    }), t.SEARCH_SUCCESS_MORE_FEEDBACK_LINK_TEXT = r.intl.formatMessage({
        defaultMessage: "Tell us more"
    }), t.SUBMIT_BUTTON_TEXT = r.intl.formatMessage({
        defaultMessage: "Submit"
    }), t.CANCEL_BUTTON_TEXT = r.intl.formatMessage({
        defaultMessage: "Cancel"
    }), t.NEXT_BUTTON_TEXT = r.intl.formatMessage({
        defaultMessage: "Next"
    }), t.MODAL_TITLE_TEXT = r.intl.formatMessage({
        defaultMessage: "Tell us more about your search experience"
    }), t.SEARCH_SUCCESS_OPT_OUT_KEY = "search-success-opt-out", t.SEARCH_SUCCESS_SHOW_BANNER_KEY = "search-success-show-banner-key", t.SEARCH_SUCCESS_SHOW_BANNER_FROM_HOME_KEY = "search-success-show-banner-from-home-key", t.SEARCH_RESULT_CLICK_TIMESTAMP_KEY = "search-result-click-timestamp-key", t.SEARCH_RESULT_PATH_KEY = "search-result-location-key", t.SEARCH_RESULT_CLICK_KEY = "search-result-click-key", t.CLICKABLE_PATH_KEY = "clickable-path-key", t.CLICKABLE_FILE_PATH_CLICK_TIMESTAMP_KEY = "clickable-file-path-click-timestamp-key", t.SEARCH_BAR_ABANDONED_EVENT = "dbxSearchBarAbandonedEvent", t.SEARCH_SUCCESSS_BANNER_HEIGHT_IN_SEARCH_RESULTS = 75, t.BROWSE_SUCCESS_COUNT_DOWN_COMPLETE = "browse-success-count-down-complete", t.BROWSE_SUCCESS_COUNT_DOWN_ID = "browse-success-count-down-id", t.BROWSE_SUCCESS_SHOW_BANNER_KEY = "browse-success-show-banner-key", t.BROWSE_SUCCESS_BANNER_KEY_START_TIMER = "browse-success-banner_key_start_timer", t.BROWSE_SUCCESS_BANNER_KEY_END_TIMER = "browse-success-banner_key_end_timer", t.BROWSE_SUCCESS_BANNER_TRIGGER_ACTION = "browse_success_banner_trigger_action", t.BROWSE_SUCCESS_BROWSE_SESSION_DEPTH = "browse_success_browse_session_depth", t.BROWSE_SUCCESS_BANNER_V1_TIMER = 18e4, t.BROWSE_SUCCESS_BANNER_V2_TIMER = 18e5, t.BROWSE_SUCCESS_BANNER_V3_TIMER = 1e4, t.QUESTION_MODAL_TITLE_TEXT = r.intl.formatMessage({
        defaultMessage: "What did you use Dropbox for today? Check all that apply."
    }), t.OTHER_INPUT_PLACEHOLDER = r.intl.formatMessage({
        defaultMessage: "Please explain"
    }), t.BROWSE_SUCCESS_FEEDBACK_MODAL_TITLE_TEXT = r.intl.formatMessage({
        defaultMessage: "How can Dropbox be more helpful to you?"
    }), (function(e) {
        e.YES = "yes", e.NO = "no", e.KIND_OF = "kindof"
    })(t.RetrievalSuccessOption || (t.RetrievalSuccessOption = {})), (function(e) {
        e.IN_EMBEDDED_APP = "in-embedded-app", e.PREVIEW = "preview", e.SEARCH_RESULTS = "search_results", e.IN_USPS = "in-universal-single-page-search"
    })(t.SearchSuccessDisplayContext || (t.SearchSuccessDisplayContext = {})), (function(e) {
        e.NONE = "NONE", e.BSB = "BSB", e.SSB = "SSB"
    })(t.BannerVariant || (t.BannerVariant = {}))
})), (function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("react"), require("react-dom")) : "function" == typeof define && define.amd ? define("react-transition-group", ["exports", "react", "react-dom"], t) : t((e = e || self).ReactTransitionGroup = {}, e.React, e.ReactDOM)
})(this, (function(e, t, r) {
    "use strict";
    var n = "default" in t ? t.default : t;

    function s() {
        return (s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
        }).apply(this, arguments)
    }

    function i(e, t) {
        if (null == e) return {};
        var r, n, s = {},
            i = Object.keys(e);
        for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (s[r] = e[r]);
        return s
    }

    function o(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    r = r && r.hasOwnProperty("default") ? r.default : r;
    var a = Object.getOwnPropertySymbols,
        _ = Object.prototype.hasOwnProperty,
        c = Object.prototype.propertyIsEnumerable;

    function E(e) {
        if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
    }
    var l, u = (function() {
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
            for (var r, n, s = E(e), i = 1; i < arguments.length; i++) {
                for (var o in r = Object(arguments[i])) _.call(r, o) && (s[o] = r[o]);
                if (a) {
                    n = a(r);
                    for (var l = 0; l < n.length; l++) c.call(r, n[l]) && (s[n[l]] = r[n[l]])
                }
            }
            return s
        },
        d = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
        S = {};
    l = function(e) {
        var t = "Warning: " + e;
        "undefined" != typeof console && console.error(t);
        try {
            throw new Error(t)
        } catch (e) {}
    };
    var f, p = function(e, t, r, n, s) {
        for (var i in e)
            if (e.hasOwnProperty(i)) {
                var o;
                try {
                    if ("function" != typeof e[i]) {
                        var a = Error((n || "React class") + ": " + r + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.");
                        throw a.name = "Invariant Violation", a
                    }
                    o = e[i](t, i, n, r, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")
                } catch (e) {
                    o = e
                }
                if (!o || o instanceof Error || l((n || "React class") + ": type specification of " + r + " `" + i + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof o + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), o instanceof Error && !(o.message in S)) {
                    S[o.message] = !0;
                    var _ = s ? s() : "";
                    l("Failed " + r + " type: " + o.message + (null != _ ? _ : ""))
                }
            }
    };

    function h() {
        return null
    }
    f = function(e) {
        var t = "Warning: " + e;
        "undefined" != typeof console && console.error(t);
        try {
            throw new Error(t)
        } catch (e) {}
    };
    var A = function(e, t) {
            var r = "function" == typeof Symbol && Symbol.iterator;
            var n = {
                array: a("array"),
                bool: a("boolean"),
                func: a("function"),
                number: a("number"),
                object: a("object"),
                string: a("string"),
                symbol: a("symbol"),
                any: o(h),
                arrayOf: function(e) {
                    return o((function(t, r, n, s, o) {
                        if ("function" != typeof e) return new i("Property `" + o + "` of component `" + n + "` has invalid PropType notation inside arrayOf.");
                        var a = t[r];
                        if (!Array.isArray(a)) return new i("Invalid " + s + " `" + o + "` of type `" + c(a) + "` supplied to `" + n + "`, expected an array.");
                        for (var _ = 0; _ < a.length; _++) {
                            var E = e(a, _, n, s, o + "[" + _ + "]", d);
                            if (E instanceof Error) return E
                        }
                        return null
                    }))
                },
                element: o((function(t, r, n, s, o) {
                    var a = t[r];
                    return e(a) ? null : new i("Invalid " + s + " `" + o + "` of type `" + c(a) + "` supplied to `" + n + "`, expected a single ReactElement.")
                })),
                instanceOf: function(e) {
                    return o((function(t, r, n, s, o) {
                        if (!(t[r] instanceof e)) {
                            var a = e.name || "<<anonymous>>";
                            return new i("Invalid " + s + " `" + o + "` of type `" + (function(e) {
                                if (!e.constructor || !e.constructor.name) return "<<anonymous>>";
                                return e.constructor.name
                            })(t[r]) + "` supplied to `" + n + "`, expected instance of `" + a + "`.")
                        }
                        return null
                    }))
                },
                node: o((function(e, t, r, n, s) {
                    return _(e[t]) ? null : new i("Invalid " + n + " `" + s + "` supplied to `" + r + "`, expected a ReactNode.")
                })),
                objectOf: function(e) {
                    return o((function(t, r, n, s, o) {
                        if ("function" != typeof e) return new i("Property `" + o + "` of component `" + n + "` has invalid PropType notation inside objectOf.");
                        var a = t[r],
                            _ = c(a);
                        if ("object" !== _) return new i("Invalid " + s + " `" + o + "` of type `" + _ + "` supplied to `" + n + "`, expected an object.");
                        for (var E in a)
                            if (a.hasOwnProperty(E)) {
                                var l = e(a, E, n, s, o + "." + E, d);
                                if (l instanceof Error) return l
                            }
                        return null
                    }))
                },
                oneOf: function(e) {
                    if (!Array.isArray(e)) return f("Invalid argument supplied to oneOf, expected an instance of array."), h;
                    return o((function(t, r, n, o, a) {
                        for (var _ = t[r], c = 0; c < e.length; c++)
                            if (s(_, e[c])) return null;
                        return new i("Invalid " + o + " `" + a + "` of value `" + _ + "` supplied to `" + n + "`, expected one of " + JSON.stringify(e) + ".")
                    }))
                },
                oneOfType: function(e) {
                    if (!Array.isArray(e)) return f("Invalid argument supplied to oneOfType, expected an instance of array."), h;
                    for (var t = 0; t < e.length; t++) {
                        var r = e[t];
                        if ("function" != typeof r) return f("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + l(r) + " at index " + t + "."), h
                    }
                    return o((function(t, r, n, s, o) {
                        for (var a = 0; a < e.length; a++) {
                            if (null == (0, e[a])(t, r, n, s, o, d)) return null
                        }
                        return new i("Invalid " + s + " `" + o + "` supplied to `" + n + "`.")
                    }))
                },
                shape: function(e) {
                    return o((function(t, r, n, s, o) {
                        var a = t[r],
                            _ = c(a);
                        if ("object" !== _) return new i("Invalid " + s + " `" + o + "` of type `" + _ + "` supplied to `" + n + "`, expected `object`.");
                        for (var E in e) {
                            var l = e[E];
                            if (l) {
                                var u = l(a, E, n, s, o + "." + E, d);
                                if (u) return u
                            }
                        }
                        return null
                    }))
                },
                exact: function(e) {
                    return o((function(t, r, n, s, o) {
                        var a = t[r],
                            _ = c(a);
                        if ("object" !== _) return new i("Invalid " + s + " `" + o + "` of type `" + _ + "` supplied to `" + n + "`, expected `object`.");
                        var E = u({}, t[r], e);
                        for (var l in E) {
                            var S = e[l];
                            if (!S) return new i("Invalid " + s + " `" + o + "` key `" + l + "` supplied to `" + n + "`.\nBad object: " + JSON.stringify(t[r], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(e), null, "  "));
                            var f = S(a, l, n, s, o + "." + l, d);
                            if (f) return f
                        }
                        return null
                    }))
                }
            };

            function s(e, t) {
                return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
            }

            function i(e) {
                this.message = e, this.stack = ""
            }

            function o(e) {
                var r = {},
                    n = 0;

                function s(s, o, a, _, c, E, l) {
                    if (_ = _ || "<<anonymous>>", E = E || a, l !== d) {
                        if (t) {
                            var u = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                            throw u.name = "Invariant Violation", u
                        }
                        if ("undefined" != typeof console) {
                            var S = _ + ":" + a;
                            !r[S] && n < 3 && (f("You are manually calling a React.PropTypes validation function for the `" + E + "` prop on `" + _ + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), r[S] = !0, n++)
                        }
                    }
                    return null == o[a] ? s ? null === o[a] ? new i("The " + c + " `" + E + "` is marked as required in `" + _ + "`, but its value is `null`.") : new i("The " + c + " `" + E + "` is marked as required in `" + _ + "`, but its value is `undefined`.") : null : e(o, a, _, c, E)
                }
                var o = s.bind(null, !1);
                return o.isRequired = s.bind(null, !0), o
            }

            function a(e) {
                return o((function(t, r, n, s, o, a) {
                    var _ = t[r];
                    return c(_) !== e ? new i("Invalid " + s + " `" + o + "` of type `" + E(_) + "` supplied to `" + n + "`, expected `" + e + "`.") : null
                }))
            }

            function _(t) {
                switch (typeof t) {
                    case "number":
                    case "string":
                    case "undefined":
                        return !0;
                    case "boolean":
                        return !t;
                    case "object":
                        if (Array.isArray(t)) return t.every(_);
                        if (null === t || e(t)) return !0;
                        var n = (function(e) {
                            var t = e && (r && e[r] || e["@@iterator"]);
                            if ("function" == typeof t) return t
                        })(t);
                        if (!n) return !1;
                        var s, i = n.call(t);
                        if (n !== t.entries) {
                            for (; !(s = i.next()).done;)
                                if (!_(s.value)) return !1
                        } else
                            for (; !(s = i.next()).done;) {
                                var o = s.value;
                                if (o && !_(o[1])) return !1
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

            function E(e) {
                if (null == e) return "" + e;
                var t = c(e);
                if ("object" === t) {
                    if (e instanceof Date) return "date";
                    if (e instanceof RegExp) return "regexp"
                }
                return t
            }

            function l(e) {
                var t = E(e);
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
            return i.prototype = Error.prototype, n.checkPropTypes = p, n.PropTypes = n, n
        },
        O = (function(e, t) {
            return e(t = {
                exports: {}
            }, t.exports), t.exports
        })((function(e) {
            var t = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
            e.exports = A((function(e) {
                return "object" == typeof e && null !== e && e.$$typeof === t
            }), !0)
        }));
    O.object, O.oneOfType, O.element, O.bool, O.func;

    function R(e, t) {
        return e.replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "")
    }
    var T = {
            disabled: !1
        },
        C = O.oneOfType([O.number, O.shape({
            enter: O.number,
            exit: O.number,
            appear: O.number
        }).isRequired]),
        I = O.oneOfType([O.string, O.shape({
            enter: O.string,
            exit: O.string,
            active: O.string
        }), O.shape({
            enter: O.string,
            enterDone: O.string,
            enterActive: O.string,
            exit: O.string,
            exitDone: O.string,
            exitActive: O.string
        })]),
        m = n.createContext(null),
        L = "entering",
        g = "entered",
        D = (function(e) {
            function t(t, r) {
                var n;
                n = e.call(this, t, r) || this;
                var s, i = r && !r.isMounting ? t.enter : t.appear;
                return n.appearStatus = null, t.in ? i ? (s = "exited", n.appearStatus = L) : s = g : s = t.unmountOnExit || t.mountOnEnter ? "unmounted" : "exited", n.state = {
                    status: s
                }, n.nextCallback = null, n
            }
            o(t, e), t.getDerivedStateFromProps = function(e, t) {
                return e.in && "unmounted" === t.status ? {
                    status: "exited"
                } : null
            };
            var s = t.prototype;
            return s.componentDidMount = function() {
                this.updateStatus(!0, this.appearStatus)
            }, s.componentDidUpdate = function(e) {
                var t = null;
                if (e !== this.props) {
                    var r = this.state.status;
                    this.props.in ? r !== L && r !== g && (t = L) : r !== L && r !== g || (t = "exiting")
                }
                this.updateStatus(!1, t)
            }, s.componentWillUnmount = function() {
                this.cancelNextCallback()
            }, s.getTimeouts = function() {
                var e, t, r, n = this.props.timeout;
                return e = t = r = n, null != n && "number" != typeof n && (e = n.exit, t = n.enter, r = void 0 !== n.appear ? n.appear : t), {
                    exit: e,
                    enter: t,
                    appear: r
                }
            }, s.updateStatus = function(e, t) {
                if (void 0 === e && (e = !1), null !== t) {
                    this.cancelNextCallback();
                    var n = r.findDOMNode(this);
                    t === L ? this.performEnter(n, e) : this.performExit(n)
                } else this.props.unmountOnExit && "exited" === this.state.status && this.setState({
                    status: "unmounted"
                })
            }, s.performEnter = function(e, t) {
                var r = this,
                    n = this.props.enter,
                    s = this.context ? this.context.isMounting : t,
                    i = this.getTimeouts(),
                    o = s ? i.appear : i.enter;
                !t && !n || T.disabled ? this.safeSetState({
                    status: g
                }, (function() {
                    r.props.onEntered(e)
                })) : (this.props.onEnter(e, s), this.safeSetState({
                    status: L
                }, (function() {
                    r.props.onEntering(e, s), r.onTransitionEnd(e, o, (function() {
                        r.safeSetState({
                            status: g
                        }, (function() {
                            r.props.onEntered(e, s)
                        }))
                    }))
                })))
            }, s.performExit = function(e) {
                var t = this,
                    r = this.props.exit,
                    n = this.getTimeouts();
                r && !T.disabled ? (this.props.onExit(e), this.safeSetState({
                    status: "exiting"
                }, (function() {
                    t.props.onExiting(e), t.onTransitionEnd(e, n.exit, (function() {
                        t.safeSetState({
                            status: "exited"
                        }, (function() {
                            t.props.onExited(e)
                        }))
                    }))
                }))) : this.safeSetState({
                    status: "exited"
                }, (function() {
                    t.props.onExited(e)
                }))
            }, s.cancelNextCallback = function() {
                null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null)
            }, s.safeSetState = function(e, t) {
                t = this.setNextCallback(t), this.setState(e, t)
            }, s.setNextCallback = function(e) {
                var t = this,
                    r = !0;
                return this.nextCallback = function(n) {
                    r && (r = !1, t.nextCallback = null, e(n))
                }, this.nextCallback.cancel = function() {
                    r = !1
                }, this.nextCallback
            }, s.onTransitionEnd = function(e, t, r) {
                this.setNextCallback(r);
                var n = null == t && !this.props.addEndListener;
                e && !n ? (this.props.addEndListener && this.props.addEndListener(e, this.nextCallback), null != t && setTimeout(this.nextCallback, t)) : setTimeout(this.nextCallback, 0)
            }, s.render = function() {
                var e = this.state.status;
                if ("unmounted" === e) return null;
                var t = this.props,
                    r = t.children,
                    s = i(t, ["children"]);
                if (delete s.in, delete s.mountOnEnter, delete s.unmountOnExit, delete s.appear, delete s.enter, delete s.exit, delete s.timeout, delete s.addEndListener, delete s.onEnter, delete s.onEntering, delete s.onEntered, delete s.onExit, delete s.onExiting, delete s.onExited, "function" == typeof r) return n.createElement(m.Provider, {
                    value: null
                }, r(e, s));
                var o = n.Children.only(r);
                return n.createElement(m.Provider, {
                    value: null
                }, n.cloneElement(o, s))
            }, t
        })(n.Component);

    function N() {}
    D.contextType = m, D.propTypes = {
        children: O.oneOfType([O.func.isRequired, O.element.isRequired]).isRequired,
        in: O.bool,
        mountOnEnter: O.bool,
        unmountOnExit: O.bool,
        appear: O.bool,
        enter: O.bool,
        exit: O.bool,
        timeout: function(e) {
            var t = C;
            e.addEndListener || (t = t.isRequired);
            for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) n[s - 1] = arguments[s];
            return t.apply(void 0, [e].concat(n))
        },
        addEndListener: O.func,
        onEnter: O.func,
        onEntering: O.func,
        onEntered: O.func,
        onExit: O.func,
        onExiting: O.func,
        onExited: O.func
    }, D.defaultProps = { in: !1,
        mountOnEnter: !1,
        unmountOnExit: !1,
        appear: !1,
        enter: !0,
        exit: !0,
        onEnter: N,
        onEntering: N,
        onEntered: N,
        onExit: N,
        onExiting: N,
        onExited: N
    }, D.UNMOUNTED = 0, D.EXITED = 1, D.ENTERING = 2, D.ENTERED = 3, D.EXITING = 4;
    var v = function(e, t) {
            return e && t && t.split(" ").forEach((function(t) {
                return n = t, void((r = e).classList ? r.classList.add(n) : (function(e, t) {
                    return e.classList ? !!t && e.classList.contains(t) : -1 !== (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + t + " ")
                })(r, n) || ("string" == typeof r.className ? r.className = r.className + " " + n : r.setAttribute("class", (r.className && r.className.baseVal || "") + " " + n)));
                var r, n
            }))
        },
        y = function(e, t) {
            return e && t && t.split(" ").forEach((function(t) {
                return n = t, void((r = e).classList ? r.classList.remove(n) : "string" == typeof r.className ? r.className = R(r.className, n) : r.setAttribute("class", R(r.className && r.className.baseVal || "", n)));
                var r, n
            }))
        },
        F = (function(e) {
            function t() {
                for (var t, r = arguments.length, n = new Array(r), s = 0; s < r; s++) n[s] = arguments[s];
                return (t = e.call.apply(e, [this].concat(n)) || this).appliedClasses = {
                    appear: {},
                    enter: {},
                    exit: {}
                }, t.onEnter = function(e, r) {
                    t.removeClasses(e, "exit"), t.addClass(e, r ? "appear" : "enter", "base"), t.props.onEnter && t.props.onEnter(e, r)
                }, t.onEntering = function(e, r) {
                    var n = r ? "appear" : "enter";
                    t.addClass(e, n, "active"), t.props.onEntering && t.props.onEntering(e, r)
                }, t.onEntered = function(e, r) {
                    var n = r ? "appear" : "enter";
                    t.removeClasses(e, n), t.addClass(e, n, "done"), t.props.onEntered && t.props.onEntered(e, r)
                }, t.onExit = function(e) {
                    t.removeClasses(e, "appear"), t.removeClasses(e, "enter"), t.addClass(e, "exit", "base"), t.props.onExit && t.props.onExit(e)
                }, t.onExiting = function(e) {
                    t.addClass(e, "exit", "active"), t.props.onExiting && t.props.onExiting(e)
                }, t.onExited = function(e) {
                    t.removeClasses(e, "exit"), t.addClass(e, "exit", "done"), t.props.onExited && t.props.onExited(e)
                }, t.getClassNames = function(e) {
                    var r = t.props.classNames,
                        n = "string" == typeof r,
                        s = n ? "" + (n && r ? r + "-" : "") + e : r[e];
                    return {
                        baseClassName: s,
                        activeClassName: n ? s + "-active" : r[e + "Active"],
                        doneClassName: n ? s + "-done" : r[e + "Done"]
                    }
                }, t
            }
            o(t, e);
            var r = t.prototype;
            return r.addClass = function(e, t, r) {
                var n = this.getClassNames(t)[r + "ClassName"];
                "appear" === t && "done" === r && (n += " " + this.getClassNames("enter").doneClassName), "active" === r && e && e.scrollTop, this.appliedClasses[t][r] = n, v(e, n)
            }, r.removeClasses = function(e, t) {
                var r = this.appliedClasses[t],
                    n = r.base,
                    s = r.active,
                    i = r.done;
                this.appliedClasses[t] = {}, n && y(e, n), s && y(e, s), i && y(e, i)
            }, r.render = function() {
                var e = this.props,
                    t = (e.classNames, i(e, ["classNames"]));
                return n.createElement(D, s({}, t, {
                    onEnter: this.onEnter,
                    onEntered: this.onEntered,
                    onEntering: this.onEntering,
                    onExit: this.onExit,
                    onExiting: this.onExiting,
                    onExited: this.onExited
                }))
            }, t
        })(n.Component);

    function M(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function b(e, r) {
        var n = Object.create(null);
        return e && t.Children.map(e, (function(e) {
            return e
        })).forEach((function(e) {
            n[e.key] = (function(e) {
                return r && t.isValidElement(e) ? r(e) : e
            })(e)
        })), n
    }

    function B(e, t, r) {
        return null != r[t] ? r[t] : e.props[t]
    }

    function P(e, r, n) {
        var s = b(e.children),
            i = (function(e, t) {
                function r(r) {
                    return r in t ? t[r] : e[r]
                }
                e = e || {}, t = t || {};
                var n, s = Object.create(null),
                    i = [];
                for (var o in e) o in t ? i.length && (s[o] = i, i = []) : i.push(o);
                var a = {};
                for (var _ in t) {
                    if (s[_])
                        for (n = 0; n < s[_].length; n++) {
                            var c = s[_][n];
                            a[s[_][n]] = r(c)
                        }
                    a[_] = r(_)
                }
                for (n = 0; n < i.length; n++) a[i[n]] = r(i[n]);
                return a
            })(r, s);
        return Object.keys(i).forEach((function(o) {
            var a = i[o];
            if (t.isValidElement(a)) {
                var _ = o in r,
                    c = o in s,
                    E = r[o],
                    l = t.isValidElement(E) && !E.props.in;
                !c || _ && !l ? c || !_ || l ? c && _ && t.isValidElement(E) && (i[o] = t.cloneElement(a, {
                    onExited: n.bind(null, a),
                    in: E.props.in,
                    exit: B(a, "exit", e),
                    enter: B(a, "enter", e)
                })) : i[o] = t.cloneElement(a, { in: !1
                }) : i[o] = t.cloneElement(a, {
                    onExited: n.bind(null, a),
                    in: !0,
                    exit: B(a, "exit", e),
                    enter: B(a, "enter", e)
                })
            }
        })), i
    }
    F.defaultProps = {
        classNames: ""
    }, F.propTypes = s({}, D.propTypes, {
        classNames: I,
        onEnter: O.func,
        onEntering: O.func,
        onEntered: O.func,
        onExit: O.func,
        onExiting: O.func,
        onExited: O.func
    });
    var w = Object.values || function(e) {
            return Object.keys(e).map((function(t) {
                return e[t]
            }))
        },
        H = (function(e) {
            function r(t, r) {
                var n, s = (n = e.call(this, t, r) || this).handleExited.bind(M(M(n)));
                return n.state = {
                    contextValue: {
                        isMounting: !0
                    },
                    handleExited: s,
                    firstRender: !0
                }, n
            }
            o(r, e);
            var a = r.prototype;
            return a.componentDidMount = function() {
                this.mounted = !0, this.setState({
                    contextValue: {
                        isMounting: !1
                    }
                })
            }, a.componentWillUnmount = function() {
                this.mounted = !1
            }, r.getDerivedStateFromProps = function(e, r) {
                var n, s, i = r.children,
                    o = r.handleExited;
                return {
                    children: r.firstRender ? (n = e, s = o, b(n.children, (function(e) {
                        return t.cloneElement(e, {
                            onExited: s.bind(null, e),
                            in: !0,
                            appear: B(e, "appear", n),
                            enter: B(e, "enter", n),
                            exit: B(e, "exit", n)
                        })
                    }))) : P(e, i, o),
                    firstRender: !1
                }
            }, a.handleExited = function(e, t) {
                var r = b(this.props.children);
                e.key in r || (e.props.onExited && e.props.onExited(t), this.mounted && this.setState((function(t) {
                    var r = s({}, t.children);
                    return delete r[e.key], {
                        children: r
                    }
                })))
            }, a.render = function() {
                var e = this.props,
                    t = e.component,
                    r = e.childFactory,
                    s = i(e, ["component", "childFactory"]),
                    o = this.state.contextValue,
                    a = w(this.state.children).map(r);
                return delete s.appear, delete s.enter, delete s.exit, null === t ? n.createElement(m.Provider, {
                    value: o
                }, a) : n.createElement(m.Provider, {
                    value: o
                }, n.createElement(t, s, a))
            }, r
        })(n.Component);
    H.propTypes = {
        component: O.any,
        children: O.node,
        appear: O.bool,
        enter: O.bool,
        exit: O.bool,
        childFactory: O.func
    }, H.defaultProps = {
        component: "div",
        childFactory: function(e) {
            return e
        }
    };
    var U, x, k = (function(e) {
        function t() {
            for (var t, r = arguments.length, n = new Array(r), s = 0; s < r; s++) n[s] = arguments[s];
            return (t = e.call.apply(e, [this].concat(n)) || this).handleEnter = function() {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                return t.handleLifecycle("onEnter", 0, r)
            }, t.handleEntering = function() {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                return t.handleLifecycle("onEntering", 0, r)
            }, t.handleEntered = function() {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                return t.handleLifecycle("onEntered", 0, r)
            }, t.handleExit = function() {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                return t.handleLifecycle("onExit", 1, r)
            }, t.handleExiting = function() {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                return t.handleLifecycle("onExiting", 1, r)
            }, t.handleExited = function() {
                for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];
                return t.handleLifecycle("onExited", 1, r)
            }, t
        }
        o(t, e);
        var s = t.prototype;
        return s.handleLifecycle = function(e, t, s) {
            var i, o = this.props.children,
                a = n.Children.toArray(o)[t];
            a.props[e] && (i = a.props)[e].apply(i, s), this.props[e] && this.props[e](r.findDOMNode(this))
        }, s.render = function() {
            var e = this.props,
                t = e.children,
                r = e.in,
                s = i(e, ["children", "in"]),
                o = n.Children.toArray(t),
                a = o[0],
                _ = o[1];
            return delete s.onEnter, delete s.onEntering, delete s.onEntered, delete s.onExit, delete s.onExiting, delete s.onExited, n.createElement(H, s, r ? n.cloneElement(a, {
                key: "first",
                onEnter: this.handleEnter,
                onEntering: this.handleEntering,
                onEntered: this.handleEntered
            }) : n.cloneElement(_, {
                key: "second",
                onEnter: this.handleExit,
                onEntering: this.handleExiting,
                onEntered: this.handleExited
            }))
        }, t
    })(n.Component);
    k.propTypes = { in: O.bool.isRequired,
        children: function(e, t) {
            return 2 !== n.Children.count(e[t]) ? new Error('"' + t + '" must be exactly two transition components.') : null
        }
    };
    var W = "out-in",
        V = "in-out",
        G = function(e, t, r) {
            return function() {
                var n;
                e.props[t] && (n = e.props)[t].apply(n, arguments), r()
            }
        },
        K = ((U = {})[W] = function(e) {
            var t = e.current,
                r = e.changeState;
            return n.cloneElement(t, { in: !1,
                onExited: G(t, "onExited", (function() {
                    r(L, null)
                }))
            })
        }, U[V] = function(e) {
            var t = e.current,
                r = e.changeState,
                s = e.children;
            return [t, n.cloneElement(s, { in: !0,
                onEntered: G(s, "onEntered", (function() {
                    r(L)
                }))
            })]
        }, U),
        Y = ((x = {})[W] = function(e) {
            var t = e.children,
                r = e.changeState;
            return n.cloneElement(t, { in: !0,
                onEntered: G(t, "onEntered", (function() {
                    r(g, n.cloneElement(t, { in: !0
                    }))
                }))
            })
        }, x[V] = function(e) {
            var t = e.current,
                r = e.children,
                s = e.changeState;
            return [n.cloneElement(t, { in: !1,
                onExited: G(t, "onExited", (function() {
                    s(g, n.cloneElement(r, { in: !0
                    }))
                }))
            }), n.cloneElement(r, { in: !0
            })]
        }, x),
        j = (function(e) {
            function t() {
                for (var t, r = arguments.length, n = new Array(r), s = 0; s < r; s++) n[s] = arguments[s];
                return (t = e.call.apply(e, [this].concat(n)) || this).state = {
                    status: g,
                    current: null
                }, t.appeared = !1, t.changeState = function(e, r) {
                    void 0 === r && (r = t.state.current), t.setState({
                        status: e,
                        current: r
                    })
                }, t
            }
            o(t, e);
            var r = t.prototype;
            return r.componentDidMount = function() {
                this.appeared = !0
            }, t.getDerivedStateFromProps = function(e, t) {
                return null == e.children ? {
                    current: null
                } : t.status === L && e.mode === V ? {
                    status: L
                } : !t.current || (r = t.current, s = e.children, r === s || n.isValidElement(r) && n.isValidElement(s) && null != r.key && r.key === s.key) ? {
                    current: n.cloneElement(e.children, { in: !0
                    })
                } : {
                    status: "exiting"
                };
                var r, s
            }, r.render = function() {
                var e, t = this.props,
                    r = t.children,
                    s = t.mode,
                    i = this.state,
                    o = i.status,
                    a = i.current,
                    _ = {
                        children: r,
                        current: a,
                        changeState: this.changeState,
                        status: o
                    };
                switch (o) {
                    case L:
                        e = Y[s](_);
                        break;
                    case "exiting":
                        e = K[s](_);
                        break;
                    case g:
                        e = a
                }
                return n.createElement(m.Provider, {
                    value: {
                        isMounting: !this.appeared
                    }
                }, e)
            }, t
        })(n.Component);
    j.propTypes = {
        mode: O.oneOf([V, W]),
        children: O.oneOfType([O.element.isRequired])
    }, j.defaultProps = {
        mode: W
    }, e.CSSTransition = F, e.ReplaceTransition = k, e.SwitchTransition = j, e.Transition = D, e.TransitionGroup = H, e.config = T, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}));
//# sourceMappingURL=pkg-embedded_app.min.js-vflKFNYKc.map