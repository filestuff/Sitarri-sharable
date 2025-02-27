define("modules/clean/ajax", ["require", "exports", "tslib", "jquery", "modules/clean/devtools/panels/performance/perf_hub_action_types", "modules/clean/devtools/panels/performance/perf_hub_actions", "modules/clean/job_progress", "modules/clean/storage", "modules/constants/ajax_strings", "modules/constants/debug", "modules/constants/page_load", "modules/constants/request", "modules/core/browser", "modules/core/exception", "modules/core/html", "modules/core/notify", "modules/core/uri", "modules/clean/csrf", "modules/clean/viewer"], (function(t, e, n, r, o, i, s, a, u, c, l, d, _, p, f, h, m, g, v) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importStar(s), a = n.__importStar(a), u = n.__importStar(u), c = n.__importStar(c), l = n.__importStar(l), d = n.__importStar(d), _ = n.__importStar(_), p = n.__importStar(p);

    function w(t, e) {
        var n;
        null == t && (t = {}), null == e && (e = []), null == t.type && (null != t.method ? (p.reportStack("Use of method property within modules/clean/ajax's Request", {
            tags: ["module:ajax"]
        }), n = t.method) : n = "POST", t.type = n);
        var o = new b(t),
            i = y(o, e),
            s = r.default.ajax({
                url: i.url(),
                type: t.type,
                data: i.data(),
                dataType: t.dataType || "text",
                headers: i.headers(),
                traditional: !0,
                xhrFields: i.xhrFields(),
                success: function(t, e, n) {
                    return i.success(t, e, n)
                },
                error: function(t, e, n) {
                    return i.error(t, e, n)
                },
                complete: function(t, e) {
                    return i.complete(t, e)
                },
                async: null == t.async || t.async,
                timeout: t.timeout
            });
        return i.request(s)
    }
    e.Request = w;
    var y = function(t, e) {
            for (var n = [t], r = 0, o = Array.from(e.slice(0).reverse()); r < o.length; r++) {
                var i = o[r];
                n.push(new i)
            }
            for (var s = null, a = 0, u = Array.from(n); a < u.length; a++) {
                i = u[a];
                s && (i.next = s), s = i
            }
            return s
        },
        b = (function() {
            function t(t) {
                null == t && (t = {}), this.options = function() {
                    return t
                }, this.url = function() {
                    return String(t.url || "")
                }, this.data = function() {
                    return t.data || {}
                }, this.headers = function() {
                    return t.headers || {}
                }, this.xhrFields = function() {
                    return t.xhrFields || {}
                }, this.success = t.success || this.identity, this.error = t.error || this.identity, this.complete = t.complete || this.identity, this.request = this.identity
            }
            return t.prototype.identity = function(t) {
                return t
            }, t
        })(),
        x = (function() {
            function t() {}
            return t.prototype.options = function() {
                return this.next.options()
            }, t.prototype.url = function() {
                return this.next.url()
            }, t.prototype.data = function() {
                return this.next.data()
            }, t.prototype.headers = function() {
                return this.next.headers()
            }, t.prototype.xhrFields = function() {
                return this.next.xhrFields()
            }, t.prototype.success = function(t, e, n) {
                return this.next.success(t, e, n)
            }, t.prototype.error = function(t, e, n) {
                return this.next.error(t, e, n)
            }, t.prototype.complete = function(t, e) {
                return this.next.complete(t, e)
            }, t.prototype.request = function(t) {
                return this.next.request(t)
            }, t
        })(),
        E = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.initClass = function() {
                this.prototype.SUPPORTED_TLDS = ["dropbox.com"]
            }, e.prototype.data = function() {
                if (this.options().skipInjectCsrf) return this.next.data();
                p.assert(this._is_db_domain(), "injecting CSRF token into request to non-dropbox domain");
                var t = {
                    is_xhr: !0
                };
                return "get" !== (this.options().type || "post").toLowerCase() && (t.t = g.readCsrfToken()), r.default.extend(t, this.next.data())
            }, e.prototype._is_db_domain = function() {
                var t = m.URI.parse(String(this.url())).getAuthority();
                if (!t) return !0;
                var e = t.split(".");
                return this.SUPPORTED_TLDS.reduce((function(t, n) {
                    var r = n.split("."),
                        o = e.slice(-1 * r.length).join(".");
                    return t || n === o
                }), !1)
            }, e
        })(x);
    E.initClass();
    var S = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.data = function() {
                var t = this.next.data(),
                    e = this.options();
                return e.subject_user && !t._subject_uid && (t._subject_uid = String(e.subject_user)), t
            }, e.prototype.headers = function() {
                var t = this.next.headers(),
                    e = this.options();
                return e.subject_user && (t["X-DROPBOX-UID"] = String(e.subject_user)), t
            }, e
        })(x),
        O = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.headers = function() {
                var t = this.next.headers(),
                    e = this.options().teamAuthParams || {},
                    n = e.team_id || v.Viewer.get_viewer().team_id;
                n && (t["X-Dropbox-Teamid"] = String(n));
                var r = e.auth_role || v.Viewer.get_viewer().auth_role,
                    o = e.auth_action_type || v.Viewer.get_viewer().auth_action_type;
                return (r || o) && (t["X-Dropbox-Team-Authorization"] = JSON.stringify({
                    auth_role: String(r),
                    auth_action_type: String(o)
                })), t
            }, e
        })(x),
        T = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.error = function(t, e, n) {
                if (403 === t.status) {
                    var r = a.SessionStorage.get("reload-timestamp"),
                        o = (new Date).getTime();
                    (!r || o - r > 3e4) && (a.SessionStorage.set("reload-timestamp", o), window.location.reload(!0))
                }
                return this.next.error(t, e, n)
            }, e
        })(x),
        A = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.data = function() {
                var t = this.next.data();
                return null != r.default.ajaxSettings.restrict && (t.restrict = r.default.ajaxSettings.restrict), t
            }, e
        })(x),
        I = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.data = function() {
                var t = this.next.data();
                if (!d.REQUEST_TRACING_ENABLED || "post" !== this.options().type.toLowerCase()) return t;
                var e = {
                    parent_request_id: d.REQUEST_ID
                };
                return r.default.extend(e, t)
            }, e
        })(x),
        C = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.data = function() {
                var t = this.next.data(),
                    e = {};
                return l.PUBLIC_MODE_OVERRIDE && (e.public_mode_override = 1), l.COUNTRY_OVERRIDE && (e.country_override = l.COUNTRY_OVERRIDE), r.default.extend(e, t)
            }, e
        })(x),
        R = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.headers = function() {
                var t = this.next.headers();
                return c.CPROFILE_ENABLED && (t[o.PerfHubHeaderNames.FORCE_REQUEST_TRACING_HEADER] = "ON"), t
            }, e.prototype.url = function() {
                var t = this.next.url();
                if (!c.CPROFILE_ENABLED) return t;
                var e = c.CPROFILE_PARAMETER;
                return 0 !== e.indexOf("deps:") ? m.URI.parse(t).updateQuery({
                    cProfile: e
                }).toString() : t
            }, e.prototype.success = function(t, e, n) {
                var r = n.getResponseHeader(o.PerfHubHeaderNames.SERVER_RESPONSE_TIME) || "-1",
                    s = n.getResponseHeader(o.PerfHubHeaderNames.REQUEST_PROFILE_ID) || "",
                    a = n.getResponseHeader(o.PerfHubHeaderNames.REQUEST_ID);
                return i.PerfHubActions.add_ajax_profile(this.url(), r, s, a), this.next.success(t, e, n)
            }, e
        })(x),
        M = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.error = function(t, e, n) {
                return this._notify_dev(t, e, n), this.next.error(t, e, n)
            }, e.prototype._notify_dev = function(t, e, n) {}, e
        })(x),
        P = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.success = function(t, e, n) {
                var r;
                if (!n.responseText.length) return this.next.error(n, e, "");
                var o = !0,
                    i = !1;
                if (0 === n.responseText.indexOf("err:")) r = n.responseText.substr("err:".length), ["{", "["].includes(r[0]) && (o = !1);
                else {
                    if (0 !== n.responseText.indexOf("htmlerr:")) return this.next.success(t, e, n);
                    r = n.responseText.substr("htmlerr:".length), i = !0
                }
                var s = this.next.error(n, e, r);
                return o && !this.options().skipNotifyError && (i && (r = new f.HTML(r)), h.Notify.error(r)), s
            }, e.prototype.error = function(t, e, n) {
                return "abort" !== e && h.Notify.error(u.PROBLEM_COMPLETING_REQUEST), this.next.error(t, e, n)
            }, e
        })(x),
        L = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.success = function(t, e, n) {
                if (!this.options().skipErrorHandling) {
                    if (!n.responseText.length) return this.next.error(n, e, "");
                    if (0 === n.responseText.indexOf("err:")) {
                        var r = n.responseText.substr("err:".length);
                        return this.next.error(n, e, r)
                    }
                }
                return this.next.success(t, e, n)
            }, e
        })(x),
        j = (function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._clear_working_msg = e._clear_working_msg.bind(e), e
            }
            return n.__extends(e, t), e.prototype.request = function(t) {
                var e = this;
                return this.xhr = t, setTimeout((function() {
                    if (!e._request_finished()) return e._should_show_working_msg() ? (e._show_working_msg(), e.xhr.done(e._clear_working_msg)) : void 0
                }), 4e3), this.next.request(this.xhr)
            }, e.prototype._request_finished = function() {
                return 4 === this.xhr.readyState
            }, e.prototype._should_show_working_msg = function() {
                return h.Notify.isShown()
            }, e.prototype._show_working_msg = function() {
                return this.notification = h.Notify.success(u.STILL_WORKING)
            }, e.prototype._clear_working_msg = function() {
                if (h.Notify.isShown() && this.notification === h.Notify.current()) return h.Notify.clear()
            }, e
        })(x),
        k = (function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._watch = e._watch.bind(e), e
            }
            return n.__extends(e, t), e.prototype.data = function() {
                this.job_id = e.generate_job_id();
                var t = this.next.data();
                this.uid = t._subject_uid;
                var n = this.options().subject_user;
                return !this.uid && n && (this.uid = String(n)), r.default.extend({
                    job_id: this.job_id
                }, t)
            }, e.prototype.request = function(t) {
                return this._interval = 1e3, this._failures = 0, this._watch_count = 0, this._watch_id = setInterval(this._watch, this._interval), this.next.request(t)
            }, e.prototype.success = function(t, e, n) {
                return this.next.success(t, e, n)
            }, e.prototype.error = function(t, e, n) {
                return this.next.error(t, e, n)
            }, e.prototype.complete = function(t, e) {
                return this._stop(), s.Job.handled(this.job_id), this.next.complete(t, e)
            }, e.prototype._watch = function() {
                return s.Job.peek(this.job_id) ? this._stop() : (this._watch_count++, this._watch_count % 10 == 0 && (clearInterval(this._watch_id), this._interval = Math.min(Math.floor(1.5 * this._interval), 3e4), this._watch_id = setInterval(this._watch, this._interval)), this._show_progress_modal(), this._fetch_progress())
            }, e.prototype._stop = function() {
                return clearInterval(this._watch_id), s.ModalProgress.hide()
            }, e.prototype._show_progress_modal = function() {
                if (!this._modal_shown) return this._modal_shown = !0, s.ModalProgress.show(this.options().progress_text)
            }, e.prototype._fetch_progress = function() {
                var t = this,
                    e = {};
                return this.uid && (e._subject_uid = this.uid), V({
                    url: "/job_status/" + this.job_id,
                    data: e,
                    success: function(t, e, n) {
                        var r;
                        return r = 0 === n.responseText.indexOf("done") ? "1/1" : n.responseText, s.ModalProgress.update(r)
                    },
                    error: function(e, n, r) {
                        if (t._failures++, !(t._failures < 3)) return t._stop(), t.next.error(e, n, r)
                    }
                })
            }, e.generate_job_id = function() {
                var t = (new Date).getTime().toString(),
                    e = Math.floor(1e6 * Math.random()).toString();
                return t + (e = ("000000" + e).substring(e.length))
            }, e
        })(x),
        N = (function(t) {
            function e() {
                var e = t.call(this) || this;
                return e._watch = e._watch.bind(e), e
            }
            return n.__extends(e, t), e.prototype.data = function() {
                var t = this.next.data();
                this.uid = t._subject_uid;
                var e = this.options().subject_user;
                return !this.uid && e && (this.uid = String(e)), t
            }, e.prototype.success = function(t, e, n) {
                return this._is_async_job_response(n) ? (this.job_id = n.responseText.split(":")[1], this._interval = 1e3, this._failures = 0, this._watch_count = 0, this._watch_id = setInterval(this._watch, this._interval)) : this.next.success(t, e, n)
            }, e.prototype.complete = function(t, e) {
                if (!this._is_async_job_response(t)) return this.next.complete(t, e)
            }, e.prototype._is_async_job_response = function(t) {
                return 0 === (null != t.responseText ? t.responseText.indexOf("async_task_started:") : void 0) && t.responseText.split(":")[1].match(/^[A-Za-z0-9_\-=]*$/)
            }, e.prototype._watch = function() {
                return s.Job.peek(this.job_id) ? this._stop() : (this._watch_count++, this._watch_count % 10 == 0 && (clearInterval(this._watch_id), this._interval = Math.min(Math.floor(1.5 * this._interval), 3e4), this._watch_id = setInterval(this._watch, this._interval)), this._show_progress_modal(), this._fetch_progress())
            }, e.prototype._stop = function() {
                return clearInterval(this._watch_id), s.ModalProgress.hide()
            }, e.prototype._show_progress_modal = function() {
                if (!this._modal_shown) return this._modal_shown = !0, s.ModalProgress.show(this.options().progress_text)
            }, e.prototype._fetch_progress = function() {
                var t = this,
                    e = {};
                return this.uid && (e._subject_uid = this.uid), z({
                    url: "/async_task_status/" + this.job_id,
                    data: e,
                    success: function(e, n, r) {
                        var o = r.responseText;
                        if (0 === o.indexOf("done:")) return s.Job.handled(t.job_id), t._stop(), o = o.substr("done:".length), r.responseText = o, t.next.success(o, n, r), t.next.complete(r, n);
                        if (0 === o.indexOf("err:")) {
                            s.Job.handled(t.job_id), t._stop();
                            var i = o.substr("err:".length);
                            return h.Notify.error(i), t.next.error(r, n, i), t.next.complete(r, n)
                        }
                        if (0 === o.indexOf("async_task_err:")) {
                            s.Job.handled(t.job_id), t._stop();
                            var a = o.substr("async_task_err:".length);
                            return h.Notify.error(new f.HTML(a)), t.next.complete(r, n)
                        }
                        return s.ModalProgress.update(o)
                    },
                    error: function(e, n, r) {
                        if (t._failures++, !(t._failures < 3)) return t._stop(), t.next.error(e, n, r), t.next.complete(e, n)
                    }
                })
            }, e
        })(x),
        F = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.data = function() {
                var t, e = _.get_uri().getQuery().oref;
                return !(null === (t = this.next.data()) || void 0 === t ? void 0 : t.oref) && e ? r.default.extend({
                    oref: e
                }, this.next.data()) : this.next.data()
            }, e
        })(x),
        D = [(function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.browser_unload_handler = e.browser_unload_handler.bind(e), e.is_browser_unloading = !1, e
            }
            return n.__extends(e, t), e.prototype.browser_unload_handler = function() {
                this.is_browser_unloading = !0
            }, e.prototype.request = function(t) {
                var e;
                return r.default(window).on("beforeunload", this.browser_unload_handler), (e = this.next).request.apply(e, arguments)
            }, e.prototype.error = function(t, e, n) {
                var r, o = 0 === t.status && 0 === t.readyState && "error" === e && !n,
                    i = o && this.is_browser_unloading;
                return i ? this.next.error(t, "abort", "unload") : (r = this.next).error.apply(r, arguments)
            }, e.prototype.complete = function() {
                var t;
                return r.default(window).off("beforeunload", this.browser_unload_handler), (t = this.next).complete.apply(t, arguments)
            }, e
        })(x)],
        q = [S, O, E, T, A],
        H = [j],
        U = [M, R, I, C],
        B = [N],
        Q = [].concat(D, H, P, U, q, B);
    e.WebRequest = function(t) {
        return null == t && (t = {}), w(t, Q)
    }, e.WebRequestOref = function(t) {
        return null == t && (t = {}), w(t, [].concat(F, Q))
    };
    var W = [].concat(D, H, L, U, q, B);
    e.FormWebRequest = function(t) {
        return null == t && (t = {}), w(t, W)
    };
    var G = [].concat(D, H, P, U, q, k, B);

    function V(t) {
        return null == t && (t = {}), w(t, [].concat(D, U, q))
    }
    e.WebProgressRequest = function(t) {
        return null == t && (t = {}), w(t, G)
    }, e.BackgroundRequest = V;
    var K = [S, O, E, A],
        J = [].concat(D, U, K);

    function z(t) {
        return null == t && (t = {}), w(t, J)
    }
    e.SilentBackgroundRequest = z, e.SilentBackgroundRequestOref = function(t) {
        return null == t && (t = {}), w(t, [].concat(F, J))
    }, e.ValidationSchemaRequest = function(t) {
        null == t && (t = {});
        var e = new b(t),
            n = y(e, q),
            o = r.default.ajax({
                url: n.url(),
                type: "OPTIONS",
                data: n.data(),
                success: function(t, e, r) {
                    return n.success(t, e, r)
                },
                error: function(t, e, r) {
                    return n.error(t, e, r)
                },
                complete: function(t, e) {
                    return n.complete(t, e)
                }
            });
        return n.request(o)
    }, e.SilentBackgroundBeaconRequest = function(t) {
        if (null == t && (t = {}), delete t.success, delete t.error, delete t.complete, null == navigator.sendBeacon) return z(t);
        null == t.type && (t.type = "POST");
        var e = new b(t),
            n = y(e, [].concat(K, I)),
            r = n.url(),
            o = new FormData,
            i = n.data();
        for (var s in i) {
            var a = i[s];
            null != a && "" !== a && o.append(s, a)
        }
        navigator.sendBeacon(r, o) || console.warn("Beacon request failed: " + r)
    }
})), define("modules/clean/css", ["require", "exports", "modules/clean/static_urls", "modules/core/exception", "modules/core/uri"], (function(t, e, n, r, o) {
    "use strict";

    function i(t) {
        var e = t;
        return e._cssCache || (e._cssCache = {
            loaded_css: Object.create(null),
            already_loaded_css_paths: Object.create(null)
        }), e._cssCache
    }

    function s(t) {
        void 0 === t && (t = document);
        for (var e = i(t), n = t.querySelectorAll('link[rel="stylesheet"]'), r = 0; r < n.length; r++) {
            var s = n[r],
                a = o.URI.parse(s.href).getPath();
            0, null == e.already_loaded_css_paths[a] && (e.loaded_css[a] = Promise.resolve(), e.already_loaded_css_paths[a] = "loaded")
        }
    }

    function a(t, e, o, s) {
        void 0 === s && (s = document), r.assert(t.startsWith("/static/"), "invalid static css path: " + t);
        var a = i(s),
            u = a.loaded_css[t];
        return u || (u = new Promise((function(e, r) {
            var o = s.createElement("link");
            return o.href = n.static_url(t), o.rel = "stylesheet", o.type = "text/css", o.crossorigin = "anonymous", o.onload = function() {
                return a.already_loaded_css_paths[t] = "loaded", e()
            }, o.onerror = r, s.head.appendChild(o)
        })), a.loaded_css[t] = u, a.already_loaded_css_paths[t] = "downloading"), u.then(e, o)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), s(), e.css_url = function(t) {
        return 'url("' + String(t).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '")'
    }, e.require_css = a, e.require_css_multi = function(t, e, n, r) {
        void 0 === r && (r = document);
        var o = t.map((function(t) {
            return a(t, void 0, void 0, r)
        }));
        return Promise.all(o).then(e, n)
    }, e.is_loaded = function(t, e) {
        void 0 === e && (e = document);
        var n = i(e);
        return !!t.every((function(t) {
            return r.assert(t.startsWith("/static/"), "invalid static css path: " + t), "loaded" === n.already_loaded_css_paths[t]
        })) || (s(e), t.every((function(t) {
            return "loaded" === n.already_loaded_css_paths[t]
        })))
    }
})), define("modules/clean/dbmodal_stack", ["require", "exports", "tslib", "jquery"], (function(t, e, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importDefault(r);
    var o = (function() {
        function t() {}
        return t.initClass = function() {
            this.__stack = [], this.CLEAR = "dbmodal:clear"
        }, t.pop = function(e) {
            null != e ? t.remove(e) : e = t.__stack.pop(), null != e && e._hide();
            var n = t.top();
            null != n ? n._show() : r.default(document).trigger(t.CLEAR)
        }, t.push = function(e) {
            t.remove(e);
            var n = t.top();
            (null != n ? n.visible : void 0) && n._hide(), t.__stack.push(e), e._show()
        }, t.top = function() {
            var e = t.__stack.length;
            return e ? t.__stack[e - 1] : null
        }, t.remove = function(e) {
            for (var n = [], r = 0, o = Array.from(t.__stack); r < o.length; r++) {
                var i = o[r];
                i !== e && n.push(i)
            }
            t.__stack = n
        }, t.clear = function() {
            for (var e = t.__stack.length - 1; e >= 0; e--) {
                var n = t.__stack[e];
                n.visible && n._hide()
            }
            r.default(document).trigger(t.CLEAR), t.__stack = []
        }, t.register = function(e, n) {
            r.default(document).on(e, n), r.default(document).on(t.CLEAR, (function() {
                return r.default(document).off(e, n)
            }))
        }, t.unregister = function(t, e) {
            r.default(document).off(t, e)
        }, t.trigger = function(t, e) {
            r.default(document).trigger(t, e)
        }, t
    })();
    e.DBModalStack = o, o.initClass()
})), define("modules/clean/devtools/panels/performance/perf_hub_action_types", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), (function(t) {
        t.PROFILED_AJAX_LOAD_FINISHED = "PROFILED_AJAX_LOAD_FINISHED", t.WEB_TIMING_FETCHED = "WEB_TIMING_FETCHED"
    })(e.ActionTypes || (e.ActionTypes = {})), (function(t) {
        t.SERVER_RESPONSE_TIME = "x-server-response-time", t.REQUEST_PROFILE_ID = "x-dropbox-request-profile-id", t.REQUEST_ID = "x-dropbox-request-id", t.FORCE_REQUEST_TRACING_HEADER = "x-dropbox-force-request-tracing"
    })(e.PerfHubHeaderNames || (e.PerfHubHeaderNames = {}))
})), define("modules/clean/devtools/panels/performance/perf_hub_actions", ["require", "exports", "modules/clean/devtools/panels/performance/perf_hub_action_types", "modules/clean/flux/dispatcher"], (function(t, e, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = (function() {
        function t() {}
        return t.prototype.add_ajax_profile = function(t, e, o, i) {
            var s = i ? i.substring(0, Math.min(i.length, 16)) : i;
            return r.Dispatcher.dispatch({
                type: n.ActionTypes.PROFILED_AJAX_LOAD_FINISHED,
                data: {
                    url: t,
                    serverResponseTime: e,
                    profileRequestId: o,
                    traceId: s
                }
            })
        }, t.prototype.add_web_timing_details = function(t) {
            return r.Dispatcher.dispatch({
                type: n.ActionTypes.WEB_TIMING_FETCHED,
                data: t
            })
        }, t
    })();
    e.PerfHubActions = new o
})), define("modules/clean/em_string", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = (function() {
        function t(e) {
            if (!(this instanceof t)) return new t(e);
            this.s = e, this.info = this.widthInfo(), this.length = e.length ? this.info[this.s.length - 1] : 0
        }
        return t.initClass = function() {
            this.ACCURACY = 2, this.CODEPOINT_TO_WIDTH = {
                32: 38,
                33: 25,
                34: 42,
                35: 67,
                36: 58,
                37: 92,
                38: 75,
                39: 25,
                40: 33,
                41: 33,
                42: 58,
                43: 58,
                44: 25,
                45: 33,
                46: 25,
                47: 42,
                48: 58,
                49: 58,
                50: 58,
                51: 58,
                52: 58,
                53: 58,
                54: 58,
                55: 58,
                56: 58,
                57: 58,
                58: 25,
                59: 25,
                60: 58,
                61: 58,
                62: 58,
                63: 50,
                64: 100,
                65: 67,
                66: 67,
                67: 67,
                68: 75,
                69: 58,
                70: 58,
                71: 75,
                72: 83,
                73: 33,
                74: 25,
                75: 67,
                76: 58,
                77: 100,
                78: 83,
                79: 83,
                80: 67,
                81: 83,
                82: 67,
                83: 58,
                84: 58,
                85: 75,
                86: 67,
                87: 100,
                88: 67,
                89: 58,
                90: 58,
                91: 33,
                92: 42,
                93: 33,
                94: 58,
                95: 50,
                96: 67,
                97: 58,
                98: 67,
                99: 50,
                100: 67,
                101: 58,
                102: 33,
                103: 58,
                104: 67,
                105: 25,
                106: 25,
                107: 58,
                108: 25,
                109: 100,
                110: 67,
                111: 67,
                112: 67,
                113: 67,
                114: 42,
                115: 50,
                116: 42,
                117: 67,
                118: 58,
                119: 83,
                120: 58,
                121: 58,
                122: 50,
                123: 42,
                124: 58,
                125: 42,
                126: 58,
                161: 25,
                162: 58,
                163: 58,
                164: 58,
                165: 58,
                166: 58,
                167: 58,
                168: 67,
                169: 92,
                170: 42,
                171: 50,
                172: 58,
                174: 92,
                175: 58,
                176: 50,
                177: 58,
                178: 42,
                179: 42,
                180: 67,
                181: 67,
                182: 75,
                183: 25,
                184: 25,
                185: 42,
                186: 42,
                187: 50,
                188: 83,
                189: 83,
                190: 83,
                191: 50,
                192: 67,
                193: 67,
                194: 67,
                195: 67,
                196: 67,
                197: 67,
                198: 92,
                199: 67,
                200: 58,
                201: 58,
                202: 58,
                203: 58,
                204: 33,
                205: 33,
                206: 33,
                207: 33,
                208: 75,
                209: 83,
                210: 83,
                211: 83,
                212: 83,
                213: 83,
                214: 83,
                215: 58,
                216: 83,
                217: 75,
                218: 75,
                219: 75,
                220: 75,
                221: 58,
                222: 67,
                223: 67,
                224: 58,
                225: 58,
                226: 58,
                227: 58,
                228: 58,
                229: 58,
                230: 92,
                231: 50,
                232: 58,
                233: 58,
                234: 58,
                235: 58,
                236: 25,
                237: 25,
                238: 25,
                239: 25,
                240: 67,
                241: 67,
                242: 67,
                243: 67,
                244: 67,
                245: 67,
                246: 67,
                247: 58,
                248: 67,
                249: 67,
                250: 67,
                251: 67,
                252: 67,
                253: 58,
                254: 67,
                255: 58,
                256: 75,
                257: 67,
                258: 75,
                259: 67,
                260: 75,
                261: 67,
                262: 75,
                263: 58,
                264: 75,
                265: 58,
                266: 75,
                267: 58,
                268: 75,
                269: 58,
                270: 83,
                271: 83,
                272: 83,
                273: 75,
                274: 67,
                275: 67,
                276: 67,
                277: 67,
                278: 67,
                279: 67,
                280: 67,
                281: 67,
                282: 67,
                283: 67,
                284: 83,
                285: 75,
                286: 83,
                287: 75,
                288: 83,
                289: 75,
                290: 83,
                291: 75,
                292: 83,
                293: 75,
                294: 92,
                295: 75,
                296: 33,
                297: 33,
                298: 33,
                299: 33,
                300: 33,
                301: 33,
                302: 33,
                303: 33,
                304: 33,
                305: 25,
                306: 67,
                307: 67,
                308: 42,
                309: 33,
                310: 75,
                311: 67,
                312: 67,
                313: 58,
                314: 33,
                315: 58,
                316: 33,
                317: 58,
                318: 42,
                319: 58,
                320: 50,
                321: 67,
                322: 42,
                323: 83,
                324: 75,
                325: 83,
                326: 75,
                327: 83,
                328: 75,
                329: 83,
                330: 83,
                331: 75,
                332: 92,
                333: 67,
                334: 92,
                335: 67,
                336: 92,
                337: 67,
                338: 100,
                339: 100,
                340: 75,
                341: 50,
                342: 75,
                343: 50,
                344: 75,
                345: 50,
                346: 67,
                347: 58,
                348: 67,
                349: 58,
                350: 67,
                351: 58,
                352: 67,
                353: 58,
                354: 75,
                355: 42,
                356: 75,
                357: 42,
                358: 75,
                359: 42,
                360: 83,
                361: 75,
                362: 83,
                363: 75,
                364: 83,
                365: 75,
                366: 83,
                367: 75,
                368: 83,
                369: 75,
                370: 83,
                371: 75,
                372: 100,
                373: 92,
                374: 75,
                375: 58,
                376: 75,
                377: 67,
                378: 67,
                379: 67,
                380: 67,
                381: 67,
                382: 67,
                383: 42,
                384: 75,
                385: 83,
                386: 67,
                387: 75,
                388: 75,
                389: 67,
                390: 75,
                391: 83,
                392: 58,
                393: 83,
                394: 100,
                395: 67,
                396: 75,
                397: 67,
                398: 67,
                399: 75,
                400: 58,
                401: 58,
                402: 75,
                403: 83,
                404: 75,
                405: 100,
                406: 50,
                407: 50,
                408: 75,
                409: 67,
                410: 50,
                411: 67,
                412: 117,
                413: 83,
                414: 75,
                415: 92,
                416: 92,
                417: 75,
                418: 117,
                419: 100,
                420: 75,
                421: 75,
                422: 75,
                423: 67,
                424: 58,
                425: 67,
                426: 58,
                427: 42,
                428: 75,
                429: 42,
                430: 75,
                431: 83,
                432: 75,
                433: 92,
                434: 83,
                435: 75,
                436: 75,
                437: 67,
                438: 67,
                439: 67,
                440: 67,
                441: 58,
                442: 58,
                443: 75,
                444: 75,
                445: 58,
                446: 50,
                447: 67,
                448: 33,
                449: 50,
                450: 50,
                451: 33,
                452: 142,
                453: 142,
                454: 133,
                455: 100,
                456: 92,
                457: 67,
                458: 117,
                459: 117,
                460: 100,
                461: 75,
                462: 67,
                463: 33,
                464: 33,
                465: 92,
                466: 67,
                467: 83,
                468: 75,
                469: 83,
                470: 75,
                471: 83,
                472: 75,
                473: 83,
                474: 75,
                475: 83,
                476: 75,
                477: 67,
                478: 75,
                479: 67,
                480: 75,
                481: 67,
                482: 100,
                483: 100,
                484: 92,
                485: 75,
                486: 83,
                487: 75,
                488: 75,
                489: 67,
                490: 92,
                491: 67,
                492: 92,
                493: 67,
                494: 67,
                495: 58,
                496: 33,
                497: 142,
                498: 142,
                499: 133,
                500: 83,
                501: 75,
                502: 117,
                503: 67,
                504: 83,
                505: 75,
                506: 75,
                507: 67,
                508: 100,
                509: 100,
                510: 92,
                511: 67,
                512: 75,
                513: 67,
                514: 75,
                515: 67,
                516: 67,
                517: 67,
                518: 67,
                519: 67,
                520: 33,
                521: 33,
                522: 33,
                523: 33,
                524: 92,
                525: 67,
                526: 92,
                527: 67,
                528: 75,
                529: 50,
                530: 75,
                531: 50,
                532: 83,
                533: 75,
                534: 83,
                535: 75,
                536: 67,
                537: 58,
                538: 75,
                539: 42,
                540: 58,
                541: 58,
                542: 83,
                543: 75,
                544: 83,
                545: 100,
                546: 92,
                547: 67,
                548: 67,
                549: 67,
                550: 75,
                551: 67,
                552: 67,
                553: 67,
                554: 92,
                555: 67,
                556: 92,
                557: 67,
                558: 92,
                559: 67,
                560: 92,
                561: 67,
                562: 75,
                563: 58,
                564: 67,
                565: 100,
                566: 67,
                567: 33,
                568: 100,
                569: 100,
                570: 75,
                571: 75,
                572: 58,
                573: 58,
                574: 67,
                575: 58,
                576: 58,
                577: 67,
                578: 50,
                579: 75,
                580: 75,
                581: 75,
                582: 75,
                583: 58,
                584: 58,
                585: 25,
                586: 83,
                587: 58,
                588: 75,
                589: 33,
                590: 75,
                591: 58,
                880: 67,
                881: 50,
                882: 67,
                883: 50,
                884: 33,
                885: 33,
                886: 75,
                887: 67,
                888: 108,
                889: 108,
                890: 67,
                891: 58,
                892: 58,
                893: 58,
                894: 42,
                895: 108,
                896: 108,
                897: 108,
                898: 108,
                899: 108,
                900: 67,
                901: 67,
                902: 75,
                903: 42,
                904: 83,
                905: 100,
                906: 58,
                907: 108,
                908: 100,
                909: 108,
                910: 100,
                911: 100,
                912: 42,
                913: 75,
                914: 67,
                915: 58,
                916: 83,
                917: 67,
                918: 67,
                919: 83,
                920: 92,
                921: 33,
                922: 75,
                923: 75,
                924: 100,
                925: 83,
                926: 75,
                927: 92,
                928: 83,
                929: 67,
                930: 108,
                931: 67,
                932: 75,
                933: 75,
                934: 83,
                935: 75,
                936: 83,
                937: 92,
                938: 33,
                939: 75,
                940: 83,
                941: 58,
                942: 75,
                943: 42,
                944: 67,
                945: 83,
                946: 67,
                947: 67,
                948: 67,
                949: 58,
                950: 75,
                951: 75,
                952: 67,
                953: 42,
                954: 67,
                955: 67,
                956: 75,
                957: 67,
                958: 67,
                959: 67,
                960: 92,
                961: 67,
                962: 67,
                963: 75,
                964: 67,
                965: 67,
                966: 92,
                967: 67,
                968: 92,
                969: 100,
                970: 42,
                971: 67,
                972: 67,
                973: 67,
                974: 100,
                975: 108,
                976: 58,
                977: 75,
                978: 75,
                979: 100,
                980: 75,
                981: 92,
                982: 100,
                983: 67,
                984: 92,
                985: 67,
                986: 75,
                987: 58,
                988: 58,
                989: 58,
                990: 67,
                991: 58,
                992: 75,
                993: 92,
                994: 100,
                995: 92,
                996: 75,
                997: 58,
                998: 75,
                999: 58,
                1e3: 75,
                1001: 75,
                1002: 67,
                1003: 67,
                1004: 83,
                1005: 58,
                1006: 50,
                1007: 42,
                1008: 67,
                1009: 67,
                1010: 58,
                1011: 33,
                1012: 92,
                1013: 58,
                1014: 58,
                1015: 67,
                1016: 67,
                1017: 75,
                1018: 100,
                1019: 83,
                1020: 58,
                1021: 75,
                1022: 75,
                1023: 75,
                1024: 67,
                1025: 67,
                1026: 92,
                1027: 58,
                1028: 75,
                1029: 67,
                1030: 33,
                1031: 33,
                1032: 42,
                1033: 108,
                1034: 108,
                1035: 83,
                1036: 75,
                1037: 83,
                1038: 75,
                1039: 83,
                1040: 75,
                1041: 67,
                1042: 67,
                1043: 58,
                1044: 83,
                1045: 67,
                1046: 92,
                1047: 67,
                1048: 83,
                1049: 83,
                1050: 75,
                1051: 83,
                1052: 100,
                1053: 83,
                1054: 92,
                1055: 83,
                1056: 67,
                1057: 75,
                1058: 75,
                1059: 75,
                1060: 83,
                1061: 75,
                1062: 83,
                1063: 75,
                1064: 108,
                1065: 108,
                1066: 75,
                1067: 92,
                1068: 67,
                1069: 75,
                1070: 108,
                1071: 75,
                1072: 67,
                1073: 67,
                1074: 58,
                1075: 58,
                1076: 75,
                1077: 67,
                1078: 83,
                1079: 58,
                1080: 75,
                1081: 75,
                1082: 67,
                1083: 67,
                1084: 83,
                1085: 75,
                1086: 67,
                1087: 75,
                1088: 75,
                1089: 58,
                1090: 58,
                1091: 58,
                1092: 92,
                1093: 67,
                1094: 75,
                1095: 58,
                1096: 92,
                1097: 100,
                1098: 67,
                1099: 83,
                1100: 58,
                1101: 58,
                1102: 92,
                1103: 58,
                1104: 67,
                1105: 67,
                1106: 75,
                1107: 58,
                1108: 58,
                1109: 58,
                1110: 33,
                1111: 33,
                1112: 42,
                1113: 92,
                1114: 92,
                1115: 75,
                1116: 67,
                1117: 75,
                1118: 58,
                1119: 75,
                1120: 100,
                1121: 75,
                1122: 75,
                1123: 67,
                1124: 83,
                1125: 83,
                1126: 75,
                1127: 67,
                1128: 100,
                1129: 92,
                1130: 92,
                1131: 83,
                1132: 117,
                1133: 108,
                1134: 67,
                1135: 67,
                1136: 83,
                1137: 83,
                1138: 92,
                1139: 67,
                1140: 83,
                1141: 67,
                1142: 83,
                1143: 67,
                1144: 133,
                1145: 125,
                1146: 92,
                1147: 67,
                1148: 100,
                1149: 75,
                1150: 100,
                1151: 75,
                1152: 75,
                1153: 58,
                1154: 75,
                1155: 0,
                1156: 0,
                1157: 0,
                1158: 0,
                1159: 108,
                1160: 0,
                1161: 0,
                1162: 83,
                1163: 75,
                1164: 67,
                1165: 58,
                1166: 67,
                1167: 75,
                1168: 58,
                1169: 58,
                1170: 67,
                1171: 58,
                1172: 75,
                1173: 67,
                1174: 100,
                1175: 92,
                1176: 67,
                1177: 58,
                1178: 75,
                1179: 67,
                1180: 83,
                1181: 75,
                1182: 75,
                1183: 67,
                1184: 83,
                1185: 75,
                1186: 83,
                1187: 75,
                1188: 100,
                1189: 83,
                1190: 117,
                1191: 100,
                1192: 92,
                1193: 75,
                1194: 75,
                1195: 58,
                1196: 75,
                1197: 58,
                1198: 75,
                1199: 58,
                1200: 75,
                1201: 58,
                1202: 75,
                1203: 75,
                1204: 100,
                1205: 83,
                1206: 75,
                1207: 67,
                1208: 75,
                1209: 67,
                1210: 75,
                1211: 58,
                1212: 92,
                1213: 75,
                1214: 92,
                1215: 75,
                1216: 33,
                1217: 92,
                1218: 83,
                1219: 75,
                1220: 67,
                1221: 83,
                1222: 67,
                1223: 83,
                1224: 75,
                1225: 83,
                1226: 75,
                1227: 75,
                1228: 58,
                1229: 100,
                1230: 83,
                1231: 25,
                1232: 75,
                1233: 67,
                1234: 75,
                1235: 67,
                1236: 100,
                1237: 100,
                1238: 67,
                1239: 67,
                1240: 75,
                1241: 67,
                1242: 75,
                1243: 67,
                1244: 92,
                1245: 83,
                1246: 67,
                1247: 58,
                1248: 67,
                1249: 58,
                1250: 83,
                1251: 75,
                1252: 83,
                1253: 75,
                1254: 92,
                1255: 67,
                1256: 92,
                1257: 67,
                1258: 92,
                1259: 67,
                1260: 75,
                1261: 58,
                1262: 75,
                1263: 58,
                1264: 75,
                1265: 58,
                1266: 75,
                1267: 58,
                1268: 75,
                1269: 58,
                1270: 58,
                1271: 42,
                1272: 92,
                1273: 83,
                1274: 58,
                1275: 42,
                1276: 75,
                1277: 58,
                1278: 75,
                1279: 58,
                2026: 67,
                19977: 108,
                65403: 58
            }, this._ELLIPSIS_LENGTH = new t("…").length
        }, t.em_snippet = function(e, n, r) {
            return null == n && (n = 50), null == r && (r = .75), new t(e.toString()).snippet(n, r).toString()
        }, t.prototype.widthInfo = function() {
            for (var t = {
                    "-1": 0
                }, e = 0, n = this.s.length, r = 0 <= n; r ? e < n : e > n; r ? e++ : e--) t[e] = t[e - 1] + this.ems(this.s.charAt(e));
            return t
        }, t.prototype.findSpot = function(t) {
            var e;
            if (!t) return 0;
            for (var n = 0, r = this.s.length; n <= r;) {
                e = Math.floor(n / 2 + r / 2);
                var o = this.info[e - 1];
                if (o > t) r = e - 1;
                else {
                    if (!(o < t)) return e;
                    n = e + 1
                }
            }
            return n > e ? n : e
        }, t.prototype.ems = function(e) {
            var n = e.charCodeAt(0),
                r = t.CODEPOINT_TO_WIDTH[n];
            return r ? r / Math.pow(10, t.ACCURACY) : 768 <= n && n <= 879 ? 0 : 65377 <= n && n <= 65500 ? .58 : 11904 <= n && n <= 40911 || 44032 <= n && n <= 55215 || 4352 <= n && n <= 4607 || 63744 <= n && n <= 64255 || 65280 <= n && n <= 65535 || 131072 <= n && n <= 196607 ? 1.08 : .65
        }, t.prototype.substr = function(e, n) {
            var r = this.findSpot(e);
            if (null != n) {
                var o = this.findSpot(e + n);
                if (o - r < this.s.length) {
                    var i = this.s.charCodeAt(o - r);
                    65024 <= i && i <= 65039 && o--
                }
                return new t(this.s.substr(r, o - r))
            }
            return new t(this.s.substr(r))
        }, t.prototype.toString = function() {
            return this.s
        }, t.prototype.snippet = function(e, n) {
            if (void 0 === e && (e = 50), void 0 === n && (n = .75), this.length <= e) return this;
            var r = (e -= t._ELLIPSIS_LENGTH) * n,
                o = e - r,
                i = this.length - o,
                s = this.substr(0, r),
                a = this.substr(i);
            return new t(s.toString() + "…" + a.toString())
        }, t
    })();
    e.Emstring = n, n.initClass()
})), define("modules/clean/event_load", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.window_load = function(t) {
        "complete" === document.readyState && (function(t) {
            window.setTimeout((function() {
                return t.apply(t)
            }), 0)
        })(t), window.addEventListener("load", t, !1)
    }
})), define("modules/clean/filepath", ["require", "exports"], (function(t, e) {
    "use strict";

    function n(t) {
        return t ? ("/" !== t.charAt(0) && (t = "/" + t), "/" === t.charAt(t.length - 1) ? t.substr(0, t.length - 1) : t) : ""
    }

    function r(t) {
        if (!t) return {
            name: "",
            ext: ""
        };
        var e = t.split("."),
            n = t.length > 0 && "." === t[0],
            r = t.indexOf(".") < 0;
        n && (r = e.length <= 2);
        var o = e.pop();
        return o && !r ? {
            name: e.join("."),
            ext: o
        } : {
            name: t,
            ext: ""
        }
    }

    function o(t) {
        return r(t).ext.toLowerCase()
    }

    function i(t) {
        return t.split("/").slice(0, -1).join("/") || "/"
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.normalize = n, e.paths_are_equal = function(t, e) {
        return n(t).toLowerCase() === n(e).toLowerCase()
    }, e.inSameDirectory = function(t) {
        if (!t.length) return !1;
        var e = i(t[0]);
        return !t.find((function(t) {
            return i(t) !== e
        }))
    }, e.inSubDirectory = function(t, e) {
        var r = (t = n(t)).split("/"),
            o = (e = n(e)).split("/");
        if (o.length <= r.length) return !1;
        for (var i = 0; i < r.length; i++)
            if (r[i] !== o[i]) return !1;
        return !0
    }, e.filename = function(t, e) {
        var r = (t = n(t)).split("/").pop();
        return r || (e || "Dropbox")
    }, e.filename_without_extension = function(t) {
        return t ? -1 === t.indexOf(".") ? t : t.split(".").slice(0, -1).join(".") : ""
    }, e.split_filename = r, e.file_extension = o, e.file_extension_for_logging = function(t) {
        return -1 === t.indexOf(".") ? "" : o(t).toLowerCase()
    }, e.parent_dir = i, e.parent_dirs = function(t) {
        for (var e = [], n = i(t);
            "/" !== n;) e.push(n), n = i(n);
        return e
    }, e.child_dir = function(t) {
        return t.split("/").pop() || ""
    }
})), define("modules/clean/flux/dispatcher", ["require", "exports", "tslib", "flux", "modules/core/exception"], (function(t, e, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importStar(r), o = n.__importStar(o);
    var i = null,
        s = (function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n.__extends(e, t), e.prototype.dispatch = function(e) {
                o.assert(null != e.type, "Invariant error: cannot dispatch action without 'type' property."), o.assert(null === i, "Invariant error: cannot dispatch " + e.type + " while also dispatching " + i + "."), i = e.type;
                try {
                    "function" == typeof this.dispatch_begin && this.dispatch_begin();
                    try {
                        return t.prototype.dispatch.call(this, {
                            action: e
                        })
                    } catch (t) {
                        return o.reportException({
                            err: t
                        }), console.error(t)
                    } finally {
                        "function" == typeof this.dispatch_end && this.dispatch_end()
                    }
                } finally {
                    i = null
                }
            }, e
        })(r.Dispatcher);
    e.DispatcherClass = s;
    var a = new s;
    e.Dispatcher = a
})), define("modules/clean/global_constants", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.GlobalConstants = window.GlobalConstants
})), define("modules/clean/job_progress", ["require", "exports", "tslib", "jquery", "modules/clean/dbmodal_stack", "modules/core/dom"], (function(t, e, n, r, o, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), i = n.__importStar(i);
    var s = function(t, e) {
            void 0 === e && (e = 300);
            var n = e.toString() + "px",
                o = r.default("<div />", {
                    class: "outer-progress-bar"
                }).css({
                    width: n
                }),
                i = r.default("<div />", {
                    class: "inner-progress-bar",
                    id: "pb_" + t
                }).css({
                    width: n
                }),
                s = r.default("<div />", {
                    class: "under-pb progress-bar"
                }).css({
                    width: n
                }),
                a = r.default("<div />", {
                    class: "over-pb progress-bar",
                    id: "pb_" + t + "_over"
                }).css({
                    display: "none"
                }),
                u = r.default("<div />", {
                    class: "pb-percentage",
                    id: "pb_" + t + "_upct"
                }).css({
                    width: n
                }),
                c = r.default("<div />", {
                    class: "pb-percentage",
                    id: "pb_" + t + "_opct"
                }).css({
                    width: n
                });
            return s.append(u), a.append(c), i.append(s), i.append(a), o.append(i), a.data("progress-width", e), o
        },
        a = function(t, e) {
            var n = r.default("#pb_" + t + "_over");
            if (n) {
                var o = e.split("/").map(Number);
                e = o.length > 1 ? o[0] / o[1] : o[0], e = isNaN(e) ? 0 : e;
                var i = 100 * Math.min(e, 1),
                    s = String(i) + "%";
                return n.show(), n.css({
                    backgroundColor: "#348DD3",
                    overflow: "hidden",
                    width: s
                })
            }
        },
        u = {
            complete: {},
            handled: function(t) {
                if (!t) return !1;
                var e = !!u.complete[t];
                return u.complete[t] = !0, e
            },
            peek: function(t) {
                return !!t && !!u.complete[t]
            }
        };
    e.Job = u;
    var c = {
        show: function(t) {
            var e;
            if (t) {
                null === (e = o.DBModalStack.top()) || void 0 === e || e.hide();
                var n = r.default("body"),
                    a = r.default("<div />", {
                        id: "modal-progress-overlay"
                    });
                if (a.hide(), a.appendTo(n), r.default("#browse-box").length ? i.clone_position(a, r.default("#browse-box")) : r.default("#gallery-view-media").length ? i.clone_position(a, r.default("#gallery-view-media")) : a.css({
                        position: "fixed",
                        width: "100%",
                        height: "100%"
                    }), a.width()) {
                    var u = r.default("<div />", {
                            id: "modal-progress-content"
                        }),
                        c = r.default("<div />", {
                            id: "modal-progress-container"
                        }),
                        l = r.default("<div />", {
                            id: "modal-progress-bar",
                            opacity: 1,
                            html: s("modal-progress", 150, "")
                        }),
                        d = r.default("<div />", {
                            id: "modal-progress-text",
                            text: t
                        });
                    return u.hide(), c.append(l, d), u.append(c), n.append(u), a.fadeTo(250, .7), u.fadeIn(250)
                }
            }
        },
        update: function(t) {
            if (!(t.indexOf("progress") > -1 && (t = t.substring("progress".length), isNaN(t)))) return a("modal-progress", t)
        },
        hide: function() {
            return r.default("#modal-progress-overlay").fadeOut(250, (function() {
                return r.default("#modal-progress-overlay").remove()
            })), r.default("#modal-progress-content").fadeOut(250, (function() {
                return r.default("#modal-progress-content").remove()
            }))
        }
    };
    e.ModalProgress = c
})), define("modules/clean/keycode", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), (function(t) {
        t[t.A = 65] = "A", t[t.C = 67] = "C", t[t.F = 70] = "F", t[t.P = 80] = "P", t[t.V = 86] = "V", t[t.BACKSPACE = 8] = "BACKSPACE", t[t.TAB = 9] = "TAB", t[t.ENTER = 13] = "ENTER", t[t.SHIFT = 16] = "SHIFT", t[t.CONTROL = 17] = "CONTROL", t[t.ALT = 18] = "ALT", t[t.ESC = 27] = "ESC", t[t.SPACE = 32] = "SPACE", t[t.PAGE_UP = 33] = "PAGE_UP", t[t.PAGE_DOWN = 34] = "PAGE_DOWN", t[t.END = 35] = "END", t[t.HOME = 36] = "HOME", t[t.LEFT = 37] = "LEFT", t[t.UP = 38] = "UP", t[t.RIGHT = 39] = "RIGHT", t[t.DOWN = 40] = "DOWN", t[t.INSERT = 45] = "INSERT", t[t.DELETE = 46] = "DELETE", t[t.TWO_KEY = 50] = "TWO_KEY", t[t.EQUALS = 61] = "EQUALS", t[t.COMMAND = 91] = "COMMAND", t[t.PLUS_EQUALS_FF = 107] = "PLUS_EQUALS_FF", t[t.MINUS_FF = 109] = "MINUS_FF", t[t.F1 = 112] = "F1", t[t.F2 = 113] = "F2", t[t.F3 = 114] = "F3", t[t.F4 = 115] = "F4", t[t.F5 = 116] = "F5", t[t.F6 = 117] = "F6", t[t.F7 = 118] = "F7", t[t.F8 = 119] = "F8", t[t.F9 = 120] = "F9", t[t.F10 = 121] = "F10", t[t.F11 = 122] = "F11", t[t.F12 = 123] = "F12", t[t.PLUS_EQUALS_FF_GERMAN = 171] = "PLUS_EQUALS_FF_GERMAN", t[t.MINUS_FF_MAC = 173] = "MINUS_FF_MAC", t[t.PLUS_CHROME = 187] = "PLUS_CHROME", t[t.MINUS_CHROME = 189] = "MINUS_CHROME", t[t.FORWARD_SLASH = 191] = "FORWARD_SLASH", t[t.AT_SIGN = 64] = "AT_SIGN", t[t.PROCESSING = 229] = "PROCESSING"
    })(e.KeyCode || (e.KeyCode = {}))
})), define("modules/clean/static_urls", ["require", "exports", "tslib", "modules/constants/env", "modules/core/exception", "modules/core/uri"], (function(t, e, n, r, o, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importStar(r), e.static_url = function(t) {
        return o.assert(0 === t.indexOf("/static/"), "#{path} is not a /static url"), new i.URI({
            scheme: "https",
            authority: "cfl.dropboxstatic.com",
            path: t
        }).toString()
    }
})), define("modules/clean/storage", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = (function() {
        function t() {
            this.storage = {}
        }
        return t.prototype.clear = function() {
            this.storage = {}
        }, t.prototype.getItem = function(t) {
            return this.storage[t]
        }, t.prototype.key = function(t) {
            return Object.keys(this.storage)[t]
        }, t.prototype.removeItem = function(t) {
            delete this.storage[t]
        }, t.prototype.setItem = function(t, e) {
            this.storage[t] = e
        }, t
    })();
    e.MemoryStorage = n;
    var r = (function() {
        function t(t) {
            this.initFn = t
        }
        return Object.defineProperty(t.prototype, "storage", {
            get: function() {
                return this.initFn && (this._storage = (function(t) {
                    var e;
                    try {
                        e = t() || new n
                    } catch (t) {
                        e = new n
                    }
                    try {
                        var r = "__storage_test__";
                        return e.setItem(r, r), e.removeItem(r), e
                    } catch (t) {
                        return e && i(t) ? e : new n
                    }
                })(this.initFn), delete this.initFn), this._storage
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.get = function(t) {
            if (this.storage) {
                var e = this.storage.getItem(t);
                return e ? JSON.parse(e) : e
            }
        }, t.prototype.set = function(t, e) {
            if (this.storage) try {
                return null === e ? this.delete(t) : this.storage.setItem(t, JSON.stringify(e))
            } catch (t) {
                if (i(t)) return;
                throw t
            }
        }, t.prototype.delete = function(t) {
            return this.storage ? this.storage.removeItem(t) : void 0
        }, t.prototype.reset = function() {
            return this.storage ? this.storage.clear() : void 0
        }, t
    })();
    e.BrowserStorage = r;
    var o = (function() {
        function t(t) {
            this.idPrefix = "userId:", this.browserStorage = t
        }
        return t.prototype.get = function(t, e) {
            return this.browserStorage.get(this.formatKey(t, e))
        }, t.prototype.set = function(t, e, n) {
            return this.browserStorage.set(this.formatKey(t, e), n)
        }, t.prototype.clearOtherUsers = function(t) {
            var e = this;
            Object.keys(this.browserStorage.storage).map((function(n) {
                if (n.startsWith(e.idPrefix)) {
                    var r = n.substring(e.idPrefix.length, n.indexOf("."));
                    t.includes(Number(r)) || e.browserStorage.delete(n)
                }
            }))
        }, t.prototype.delete = function(t, e) {
            return this.browserStorage.delete(this.formatKey(t, e))
        }, t.prototype.formatKey = function(t, e) {
            return "" + this.idPrefix + t + "." + e
        }, t
    })();

    function i(t) {
        return t instanceof DOMException && (22 === t.code || 1014 === t.code || "QuotaExceededError" === t.name || "NS_ERROR_DOM_QUOTA_REACHED" === t.name)
    }
    e.SessionStorage = new r((function() {
        return window.sessionStorage
    })), e.LocalStorage = new r((function() {
        return window.localStorage
    })), e.UserLocalStorage = new o(e.LocalStorage)
})), define("modules/clean/user", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = (function() {
        function t(t) {
            Object.assign(this, t)
        }
        return t.prototype.toString = function() {
            return String(this.id)
        }, t
    })();
    e.mkUser = function(t) {
        return new n(t)
    }
})), define("modules/clean/ux_analytics_utils", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function(t, e) {
        if ("function" == typeof CustomEvent) document.dispatchEvent(new CustomEvent(t, {
            detail: e
        }));
        else {
            var n = document.createEvent("CustomEvent");
            n.initCustomEvent(t, !0, !0, e), document.dispatchEvent(n)
        }
    };
    e.dispatchModalOpened = function() {
        n("modalOpened")
    }, e.dispatchModalClosed = function() {
        n("modalClosed")
    }, e.getModalId = function(t) {
        if (t.id) return t.id;
        var e = t.className;
        if (e) {
            var n = e.split(" ");
            return n.length > 1 ? n.find((function(t) {
                return t.indexOf("modal") > -1
            })) || e[0] + "-modal" : e.indexOf("modal") > -1 ? e : e + "-modal"
        }
    }
})), define("modules/clean/viewer", ["require", "exports", "tslib", "modules/constants/viewer", "modules/core/exception", "modules/clean/user"], (function(t, e, n, r, o, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = (function() {
        function t(t) {
            void 0 === t && (t = {}), this.replace_viewer_data(t)
        }
        return t.get_viewer = function() {
            return t._cached_viewer
        }, t.get_role_title = function(t) {
            return this.get_viewer().get_title_by_role(t.role)
        }, t.get_root_name = function(t) {
            return this.get_viewer().get_root_name_by_role(t.role)
        }, t.get_is_signed_in = function(t) {
            return t.is_signed_in
        }, t.prototype.replace_viewer_data = function(t) {
            void 0 === t && (t = {}), this._authed_users = {}, this._all_users = {};
            for (var e = t._user_data || [], n = 0, r = e; n < r.length; n++) {
                var o = r[n],
                    s = i.mkUser(o);
                this._all_users[s.id] = s, o._authed && (this._authed_users[s.id] = s)
            }
            this.display_name = t.display_name, this.team_id = t.team_id, this.auth_role = t.auth_role, this.auth_action_type = t.auth_action_type, this.team_dbtid = t.team_dbtid, this.team_name = t.team_name, this.team_type = t.team_type, this.team_is_limited = t.team_is_limited || !1, this.team_is_locked = t.team_is_locked || !1, this.is_assume_user_session = t.is_assume_user_session || !1, this.is_team_assume_user_session = t.is_team_assume_user_session || !1, this.is_signed_in = e.length > 0, this.is_paired = e.length > 1, t.deprecated_first_user_in_the_cookie_id && (this.deprecated_first_user_in_the_cookie = this.get_user_by_id(t.deprecated_first_user_in_the_cookie_id)), this._load_cached_users()
        }, t.prototype.get_user_by_role = function(t, e) {
            var n = this.get_uid_by_role(t);
            return null != n ? this.get_user_by_id(n, e) : void 0
        }, t.prototype.role_exists = function(t) {
            return null != this.get_uid_by_role(t)
        }, t.prototype.get_user_by_id = function(t, e) {
            o.assert(this.is_uid_associated(t), "User " + t + " is not associated with this viewer");
            var n = (e ? this._all_users : this._authed_users)[t];
            return o.assert(!!n, "User " + t + " is not signed in"), n
        }, t.prototype.is_role_signed_in = function(t) {
            var e = this.get_uid_by_role(t);
            return null != e && e in this._authed_users
        }, t.prototype.is_uid_signed_in = function(t) {
            return t in this._authed_users
        }, t.prototype.is_user_signed_in = function(t) {
            return null != t && this.is_uid_signed_in(t.id)
        }, t.prototype.is_uid_associated = function(t) {
            return t in this._all_users
        }, t.prototype.get_users = function(t) {
            var e = t ? this._all_users : this._authed_users,
                n = Object.keys(e).map((function(t) {
                    return e[t]
                }));
            return n.sort((function(t, e) {
                return "personal" === t.role ? -1 : 1
            })), n
        }, t.prototype.get_user_ids = function(t) {
            return this.get_users(t).map((function(t) {
                return t.id
            }))
        }, t.prototype.get_roles = function(t) {
            return this.get_users(t).map((function(t) {
                return t.role
            }))
        }, t.prototype.get_account_ids = function(t) {
            return this.get_users(t).map((function(t) {
                return t.account_id
            }))
        }, t.prototype.get_email_by_role = function(t) {
            var e = this.get_user_by_role(t, !0);
            return e && e.email
        }, t.prototype.get_uid_by_role = function(t) {
            for (var e in "photos" === t && (t = this.is_paired || !this.is_signed_in ? "personal" : this._all_users[Object.keys(this._all_users)[0]].role), this._all_users)
                if (this._all_users.hasOwnProperty(e)) {
                    var n = this._all_users[e];
                    if (n.role === t) return n.id
                }
        }, t.prototype.get_title_by_role = function(t) {
            return "work" === t ? this.team_name : this.is_paired ? r.PERSONAL_ROLE_STRING : ""
        }, t.prototype.get_root_name_by_role = function(t) {
            return this.get_title_by_role(t) || r.DEFAULT_ROOT_NAME
        }, t.prototype._sign_in_all_users = function() {
            this._authed_users = n.__assign({}, this._all_users), this._load_cached_users()
        }, t.prototype._sign_out_user_by_id = function(t) {
            delete this._authed_users[t], this._load_cached_users()
        }, t.prototype.sign_in_user_by_id = function(t) {
            o.assert(this.is_uid_associated(t), "User " + t + " is not associated with this viewer"), this._authed_users[t] = this._all_users[t], this._load_cached_users()
        }, t.prototype._load_cached_users = function() {
            this.personal_user = this._authed_users[this.get_uid_by_role("personal")], this.photos_user = this._authed_users[this.get_uid_by_role("photos")], this.work_user = this._authed_users[this.get_uid_by_role("work")], this.personal_email = this.get_email_by_role("personal"), this.work_email = this.get_email_by_role("work"), this.is_personal_user_signed_in = this.is_role_signed_in("personal"), this.is_photos_user_signed_in = this.is_role_signed_in("photos"), this.is_work_user_signed_in = this.is_role_signed_in("work")
        }, t._cached_viewer = new t(r._viewer_properties), t
    })();
    e.Viewer = s
})), define("modules/core/accessible_announce", ["require", "exports", "tslib", "jquery", "purify", "modules/clean/css"], (function(t, e, n, r, o, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), o = n.__importStar(o);
    var s = (function() {
        function t() {}
        return t.polite = function(t, e) {
            return void 0 === e && (e = 10), this.announce("polite", t, e)
        }, t.assertive = function(t, e) {
            return void 0 === e && (e = 10), this.announce("assertive", t, e)
        }, t.clear = function() {
            return this.lastTimeout && clearTimeout(this.lastTimeout), r.default("#accessible-announce").html("").attr("aria-live", "off")
        }, t.announce = function(t, e, n) {
            var o = this;
            return void 0 === n && (n = 10), i.require_css("/static/css/accessibility-vfliGZNRm.css", (function() {
                return r.default("#accessible-announce").length ? (o.setMessage(e, t), o.scheduleClear(n)) : (r.default("body").append("<div id='accessible-announce' aria-live='assertive' class='ax-visually-hidden'></div>"), setTimeout((function() {
                    return o.setMessage(e, t), o.scheduleClear(n)
                }), o.TIMEOUT_LENGTH))
            }))
        }, t.setMessage = function(t, e) {
            this.clear();
            var n = r.default("#accessible-announce");
            n.attr("aria-live", e), t.toHTML ? n.html(o.sanitize(t.toHTML())) : "string" == typeof t ? n.text(t) : t instanceof r.default && n.html(o.sanitize(t.html()))
        }, t.scheduleClear = function(t) {
            return this.lastTimeout = setTimeout(this.clear, 1e3 * t)
        }, t.TIMEOUT_LENGTH = 50, t
    })();
    e.AccessibleAnnounce = s
})), define("modules/core/browser", ["require", "exports", "tslib", "modules/constants/env", "modules/core/exception", "modules/core/uri"], (function(t, e, n, r, o, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var s = (r = n.__importStar(r)).REDIRECT_SAFE_ORIGINS;

    function a(t) {
        return void 0 === t && (t = window), t.location.href
    }
    e.get_href = a, e.get_pathname = function(t) {
        return void 0 === t && (t = window), t.location.pathname
    }, e.get_hostname = function(t) {
        return void 0 === t && (t = window), t.location.hostname
    }, e.get_uri = function(t) {
        return void 0 === t && (t = window), i.URI.parse(a(t))
    }, e.get_hash = function() {
        return window.location.hash.split("#")[1]
    }, e.get_href_no_hash = function() {
        return a().split("#")[0]
    }, e.set_hash = function(t) {
        window.location.hash = t
    }, e.mockableInternalMethods = {
        _navigate: function(t, e) {
            void 0 === e && (e = window), e.location.href = t
        },
        _parse_target: function(t, e) {
            var n = void 0 === e ? {} : e,
                r = n.target_window,
                a = void 0 === r ? window : r,
                u = n.checkDomainWhitelist,
                c = void 0 === u || u,
                l = n.httpsOnly,
                d = void 0 === l || l,
                _ = a.document.createElement("a");
            t instanceof i.URI ? _.href = t.toString() : _.href = t;
            var p = _.protocol || a.location.protocol;
            ":" === _.protocol && (p = a.location.protocol);
            var f = _.hostname || a.location.hostname,
                h = _.port || a.location.port;
            "443" === h && "https:" === p && (h = ""), c && o.assert(!h, "Non-default port not legal when checking the whitelist.");
            var m = 0 === _.pathname.indexOf("/") ? _.pathname : "/" + _.pathname;
            d ? o.assert("https:" === p, "Target URI must be secure") : o.assert("data:" !== p && "javascript:" !== p && "vbscript:" !== p, "Target URI can't use the data or javascript scheme"), c && o.assert(s.indexOf(f) > -1, "Target URI must be in the domain whitelist");
            var g = f;
            return h && (g = g + ":" + h), t = p + "//" + g + m + _.search + _.hash
        }
    }, e.open_tab = function(t, n) {
        void 0 === n && (n = !1);
        var r = e.mockableInternalMethods._parse_target(t),
            o = window.open(r, "_blank");
        return n ? o : null
    }, e.unsafe_open_tab = function(t) {
        return t = e.mockableInternalMethods._parse_target(t, {
            checkDomainWhitelist: !1,
            httpsOnly: !1
        }), window.open(t, "_blank")
    }, e.open_mail = function(t, e) {
        void 0 === e && (e = "_blank"), o.assert(t.startsWith("mailto:"), "Mailto link is malformed."), window.open(t, e)
    };
    var u = [];

    function c() {
        return window.performance || null
    }
    e.onBrowserRedirect = function(t) {
        u.push(t)
    }, e.redirect = function(t, n) {
        void 0 === n && (n = window);
        for (var r = "string" == typeof t ? t : t.toString(), o = 0, i = u; o < i.length; o++) {
            (0, i[o])(r)
        }
        var s = e.mockableInternalMethods._parse_target(t, {
            target_window: n
        });
        e.mockableInternalMethods._navigate(s, n)
    }, e.replace_location = function(t) {
        var n = e.mockableInternalMethods._parse_target(t);
        window.location.replace(n)
    }, e.reload = function(t) {
        void 0 === t && (t = !1), window.location.reload(t)
    }, e.performance = c, e.now = function() {
        var t = c();
        return t && t.now && t.timing ? Math.round(t.now() + t.timing.navigationStart) : Date.now()
    }, e.unsafeRedirect = function(t) {
        t = e.mockableInternalMethods._parse_target(t, {
            checkDomainWhitelist: !1,
            httpsOnly: !1
        }), e.mockableInternalMethods._navigate(t)
    }
})), define("modules/core/browser_detection", ["require", "exports"], (function(t, e) {
    "use strict";

    function n(t, e) {
        var n = /win(dows)? 9x 4\.90/.test(t) || /windows me/.test(t),
            r = {
                windows3_11: /win16/.test(t),
                windows95: /windows 95/.test(t) || /win95/.test(t) || /windows_95/.test(t),
                windows98: !n && (/windows 98/.test(t) || /win98/.test(t)),
                windowsCE: /windows ce/.test(t),
                windowsME: n,
                windowsNT4_0: /windows nt 4\.0/.test(t) || /winnt4.0/.test(t) || /winnt/.test(t) || /windows nt([^ ]| [^0-9])/.test(t),
                windows2000: /windows nt 5\.0/.test(t) || /windows 2000/.test(t),
                windowsXP: /windows nt 5\.1/.test(t) || /windows xp/.test(t),
                windowsXPx64: /windows nt 5\.2/.test(t),
                windowsVista: /windows nt 6\.0/.test(t) || /windows vista/.test(t),
                windows7: /windows nt 6\.1/.test(t),
                windows8: /windows nt 6\.2/.test(t),
                windows8_1: /windows nt 6\.3/.test(t),
                windows10: /windows nt 6\.4/.test(t) || /windows nt 10\.0/.test(t),
                win7OrLower: !1,
                win8OrHigher: !1
            };
        return r.win7OrLower = r.windows3_11 || r.windows95 || r.windows98 || r.windowsCE || r.windowsME || r.windowsNT4_0 || r.windows2000 || r.windowsXP || r.windowsXPx64 || r.windowsVista || r.windows7, r.win8OrHigher = e && !r.win7OrLower, r
    }

    function r(t) {
        void 0 === t && (t = navigator.userAgent);
        var e = (function(t) {
            var e = t.toLowerCase(),
                n = /(ipad)/.exec(e) || /(edge)[ \/]([\w.]+)/.exec(e) || /(edg)[ \/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || /(trident).*? rv:([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
                r = e.match(/version\/([\d.]+)/i),
                o = null != r ? n[1] : null;
            return "webkit" === o && (o = null != r ? r[1] : null), {
                browser: n[1] || "",
                version: o || n[2] || "0",
                userAgent: t
            }
        })(t);
        return "trident" === e.browser && (e.browser = "msie"), e
    }

    function o(t) {
        return void 0 === t && (t = navigator.plugins || []), Array.from(t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.parseWindowsOsInfo = n, e.get_browser_info = r, e.get_plugins = o;
    var i = r();

    function s(t, n, r) {
        return void 0 === r && (r = !0), r ? Boolean(t) && parseInt(e.version, 10) >= n : Boolean(t) && parseInt(e.version, 10) <= n
    }

    function a(t) {
        void 0 === t && (t = navigator.userAgent);
        var n = (t || "").toLowerCase();
        return e.ipod || e.iphone || -1 !== n.indexOf("tizen") || -1 !== n.indexOf("android") && -1 !== n.indexOf("mobile") || -1 !== n.indexOf("bb10") || -1 !== n.indexOf("netfront") || /windows phone|opera mini|blackberry|nokia/.test(n) || -1 !== n.indexOf("firefox") && -1 !== n.indexOf("mobile") || -1 !== n.indexOf("googlebot-mobile") || -1 !== n.indexOf("iemobile") || -1 !== n.indexOf("opera mobi") || /ucweb|ucbrowser/.test(n) || -1 !== n.indexOf("microsoft office mobile")
    }

    function u(t) {
        void 0 === t && (t = navigator.userAgent);
        var e = (t || "").toLowerCase();
        return -1 !== e.indexOf("android") || -1 !== e.indexOf("silk")
    }

    function c(t) {
        return void 0 === t && (t = navigator.userAgent), e.ipad || u(t) && !a(t)
    }
    e.ipad = "ipad" === i.browser || void 0, e.chrome = "chrome" === i.browser || void 0, e.safari = !("webkit" !== i.browser && !Boolean(e.ipad)) || void 0, e.opera = "opera" === i.browser || void 0, e.msie = "msie" === i.browser || void 0, e.edge = "edge" === i.browser || "edg" === i.browser, e.edgeChromium = function() {
        return "edg" === r().browser
    }, e.chromium = function() {
        return Boolean(e.chrome) || e.edgeChromium()
    }, e.mozilla = "mozilla" === i.browser || void 0, e.webkit = !("webkit" !== i.browser && !Boolean(e.ipad) && !Boolean(e.chrome)) || void 0, e.mac = Boolean(/(macintosh)/.exec(navigator.userAgent.toLowerCase())), e.windows = /win(16|nt|dows)/.test(navigator.userAgent.toLowerCase()), e.windowsInfo = n(navigator.userAgent.toLowerCase(), e.windows), e.iphone = Boolean(/(iphone)/.exec(navigator.userAgent.toLowerCase())), e.ipod = Boolean(/(ipod)/.exec(navigator.userAgent.toLowerCase())), e.iOS = e.ipad || e.ipod || e.iphone, e.browser_name = i.browser, e.version = i.version, e.userAgent = i.userAgent, e.plugins = o(), e.pluginNames = e.plugins.map((function(t) {
        return t.name
    })), e.msie_version_at_most = function(t) {
        return s(e.msie, t, !1)
    }, e.is_high_density_display = function() {
        if (window.matchMedia) {
            return Boolean(window.matchMedia("(-webkit-min-device-pixel-ratio: 1.1), (min-resolution: 192dpx), (min-resolution: 1.1dppx)").matches)
        }
        return !1
    }, e.isOnline = function() {
        return navigator.onLine
    }, e.subscribeConnectivityStatusChange = function(t) {
        window.addEventListener("online", t), window.addEventListener("offline", t)
    }, e.unsubscribeConnectivityStatusChange = function(t) {
        window.removeEventListener("online", t), window.removeEventListener("offline", t)
    }, e.checkBrowserVersion = s, e.is_supported_mobile_browser = a, e.is_android = u, e.is_tablet = c, e.is_mobile_or_tablet = function(t) {
        return void 0 === t && (t = navigator.userAgent), a(t) || c(t)
    }, e.is_input_webkitdirectory_supported = function() {
        return "webkitdirectory" in document.createElement("input")
    }, e.INTERNAL_FILE_DATA_TRANSFER_TYPE = e.msie ? "text" : e.edge ? "text/plain" : "application/x-dropbox-file-list"
})), define("modules/core/dom", ["require", "exports", "tslib", "jquery", "modules/clean/keycode"], (function(t, e, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importDefault(r);
    e.is_element = function(t) {
        return !!t && (1 === t.nodeType || t.length >= 1 && 1 === t[0].nodeType)
    }, e.focus_in_input = function() {
        return e.is_input(document.activeElement)
    }, e.is_input = function(t) {
        return null != t && (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) && !(t.type in ["submit", "button"]) || e.is_content_editable(t))
    }, e.is_content_editable = function(t) {
        return null != t && (t.hasAttribute && t.hasAttribute("contenteditable") && "false" !== t.getAttribute("contenteditable").toLowerCase())
    }, e.viewport_offset = function(t) {
        var e = r.default(t).offset(),
            n = r.default(window);
        return {
            left: e.left - n.scrollLeft(),
            top: e.top - n.scrollTop()
        }
    };
    var i = null,
        s = null;
    e.viewport_dimensions = function() {
        return i || (i = {
            height: r.default(window).height(),
            width: r.default(window).width()
        }), s || (s = r.default(window).on("resize", (function() {
            return i = null
        }))), i
    }, e.document_height = function() {
        return Math.max(r.default(document).height(), r.default(window).height(), document.documentElement.clientHeight)
    };
    var a = null,
        u = null,
        c = 0,
        l = null;
    e.scroll_offsets = function() {
        var t, n;
        return a || (a = r.default(window).scroll((function() {
            return u = null
        }))), e.is_page_scrollable() ? u || (n = r.default(window).scrollTop(), t = r.default(window).scrollLeft(), u = {
            0: t,
            1: n,
            left: t,
            top: n
        }) : (n = l.top, t = l.left, u = {
            0: t,
            1: n,
            left: t,
            top: n
        }), u
    }, e.scroll_clear_cache = function() {
        return u = null
    }, e.is_page_scrollable = function() {
        return !r.default(document.documentElement).hasClass("no-scroll")
    }, e.scroll_lock_document = function() {
        c++;
        var t = r.default(document.documentElement);
        if (!t.hasClass("no-scroll")) {
            var n = -1 * (l = e.scroll_offsets()).top + "px",
                o = -1 * l.left + "px";
            t.css({
                top: n,
                left: o
            }), t.addClass("no-scroll")
        }
    }, e.scroll_unlock_document = function() {
        c > 0 && c--;
        var t = r.default(document.documentElement);
        if (0 === c && t.hasClass("no-scroll") && l) {
            var n = l.top,
                o = l.left;
            t.css({
                top: "",
                left: ""
            }), t.removeClass("no-scroll"), e.scroll_to(o, n + 1), e.scroll_to(o, n - 1), e.scroll_to(o, n)
        }
    }, e.scroll_to = function(t, n) {
        if (t = Math.max(t, 0), (n = Math.max(n, 0)) > e.scroll_offsets().top && (n = Math.min(n, e.document_height() - e.viewport_dimensions().height)), e.is_page_scrollable()) window.scrollTo(t, n), u = {
            0: t,
            1: n,
            left: t,
            top: n
        };
        else {
            l = {
                0: t,
                1: n,
                left: t,
                top: n
            };
            var o = -1 * n + "px",
                i = -1 * t + "px";
            r.default(document.documentElement).css({
                top: o,
                left: i
            })
        }
    }, e.clone_position = function(t, n, o) {
        var i = r.default(n),
            s = r.default(t),
            a = r.default.extend({}, {
                setLeft: !0,
                setTop: !0,
                setWidth: !0,
                setHeight: !0,
                offsetTop: 0,
                offsetLeft: 0
            }, o),
            u = e.viewport_offset(i),
            c = {
                top: 0,
                left: 0
            },
            l = null;
        if ("absolute" === s.css("position") && (l = s.offsetParent(), c = e.viewport_offset(l)), l && l[0] === document.body && (c.left -= document.body.offsetLeft, c.top -= document.body.offsetTop), a.setLeft) {
            var d = u.left - c.left + a.offsetLeft + "px";
            s.css("left", d)
        }
        if (a.setTop) {
            var _ = u.top - c.top + a.offsetTop + "px";
            s.css("top", _)
        }
        return a.setWidth && s.width(i[0].offsetWidth), a.setHeight && s.height(i[0].offsetHeight), s
    }, e.getFocusableElementsIn = function(t, e) {
        var n = r.default(t).find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter((function() {
            return !!(this.offsetWidth && this.offsetHeight || this.getClientRects().length)
        }));
        return e ? n.not('*[tabindex="-1"]') : n
    }, e.getTabbableElementsIn = function(t) {
        var n = e.getFocusableElementsIn(t, !0),
            r = n.filter('*:not([tabindex]), *[tabindex="0"]'),
            o = n.not(r).toArray();
        if (!o.length) return r.toArray();
        return o.sort((function(t, e) {
            return parseInt(t.getAttribute("tabindex"), 10) - parseInt(e.getAttribute("tabindex"), 10)
        })), o.concat(r.toArray())
    }, e.keepFocusIn = function(t, n, r) {
        if (n.which === o.KeyCode.TAB) {
            var i = e.getTabbableElementsIn(t);
            if (i.length) {
                var s = i.indexOf(n.target);
                if (-1 !== s) n.shiftKey ? 0 === s ? (n.preventDefault(), i[i.length - 1].focus()) : r && i[s - 1] && (n.preventDefault(), i[s - 1].focus()) : s === i.length - 1 ? (n.preventDefault(), i[0].focus()) : r && i[s + 1] && (n.preventDefault(), i[s + 1].focus());
                else {
                    n.preventDefault();
                    var a = e.getFocusableElementsIn(t).toArray();
                    n.shiftKey && a.reverse();
                    var u = a.indexOf(n.target);
                    if (-1 === u) i[0].focus();
                    else {
                        for (var c = null, l = 0, d = a.slice(u); l < d.length; l++) {
                            var _ = d[l];
                            if (i.includes(_)) {
                                c = _;
                                break
                            }
                        }
                        c ? c.focus() : n.shiftKey ? i[i.length - 1].focus() : i[0].focus()
                    }
                }
            }
        }
    }, e.isElementInViewport = function(t, e) {
        if (void 0 === e && (e = 0), !t) return !1;
        var n = t.getBoundingClientRect().top;
        return n + e >= 0 && n - e <= window.innerHeight
    }
})), define("modules/core/html", ["require", "exports", "tslib", "external/lodash", "jquery", "modules/clean/global_constants"], (function(t, e, n, r, o, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importStar(r), o = n.__importDefault(o);
    var s = /[^\w@\.\ \-\(\)\,\$~%#\[\]\{\}\!\^]/g,
        a = function(t) {
            return "&#" + t.charCodeAt(0) + ";"
        },
        u = function(t) {
            return ("" + t).replace(s, a)
        },
        c = (function() {
            function t(t) {
                this._str_DONT_TOUCH = t
            }
            return t.prototype.toHTML = function() {
                return this._str_DONT_TOUCH
            }, t.prototype.toString = function() {
                return "[object HTML]"
            }, t.tmpl = function(e, n) {
                if (!/[^\w:.-]/.test(e)) {
                    var s = document.getElementById(e);
                    e = s.innerHTML, i.GlobalConstants.CSP_SCRIPT_NONCE !== (s.nonce || s.getAttribute("nonce")) && (e = "")
                }
                var a = e.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.*?)%>/g, "',__no_conflict_HTML__._raw_escape($1),'").split("<%").join("');").split("%>").join("p.push('"),
                    u = new Function("__no_conflict_HTML__", "__no_conflict_jQuery__", "TEMPLATE_DATA", "var p=[],print=function(){p.push.apply(p,arguments);}; p.push('" + a + "'); return new __no_conflict_HTML__(__no_conflict_jQuery__.trim(p.join('')));"),
                    c = r.partial(u, t, o.default);
                return n ? c(n) : c
            }, t.escape = function(e) {
                return e instanceof t ? e : new t(u(e))
            }, t._raw_escape = function(e) {
                return e instanceof t ? e.toHTML() : "number" == typeof e ? e : u(e)
            }, t
        })();
    e.HTML = c
})), define("modules/core/notify", ["require", "exports", "tslib", "jquery", "modules/core/accessible_announce"], (function(t, e, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = n.__importDefault(r);
    var i = (function() {
        function t() {}
        return t.success = function(t, e, n) {
            return void 0 === e && (e = 10), o.AccessibleAnnounce.polite(t, e + 1), this._show(t, e, "server-success", n), this.current()
        }, t.error = function(t, e, n) {
            return void 0 === e && (e = 10), o.AccessibleAnnounce.assertive(t, e + 1), this._show(t, e, "server-error", n), this.current()
        }, t.warning = function(t, e, n) {
            return void 0 === e && (e = 10), o.AccessibleAnnounce.polite(t, e + 1), this._show(t, e, "server-warning", n), this.current()
        }, t.info = function(t, e, n) {
            return void 0 === e && (e = 10), o.AccessibleAnnounce.polite(t, e + 1), this._show(t, e, "server-info", n), this.current()
        }, t.clear = function() {
            this._last_timeout && clearTimeout(this._last_timeout), this._last_animation && this._last_animation.stop(), this._last_timeout = null, this._last_animation = null, r.default("#notify").removeClass("server-error server-info server-success server-warning").hide()
        }, t.isShown = function() {
            return r.default("#notify").is(":visible")
        }, t.current = function() {
            return this._last_timeout
        }, t._show = function(t, e, n, r) {
            return this._buildElement(), this.clear(), this._setMessage(t), this._showElement(n), this._scheduleHide(e, r), this.current()
        }, t._buildElement = function() {
            if (!r.default("#notify").length) {
                r.default("body").append('<div id="notify-wrapper" class="notify-wrapper"> <span id="notify" style="display: inline-block"> <span id="notify-msg" class="notify-msg" /> </span> </div>'), r.default(".maestro .has-top-notification").length && r.default("#notify-wrapper").addClass("with-top-notification")
            }
        }, t._setMessage = function(t) {
            var e = r.default("#notify-msg");
            t.toHTML ? e.html(t.toHTML()) : "string" == typeof t ? e.text(t) : t instanceof r.default && (e.empty(), e.append(t))
        }, t._showElement = function(t) {
            var e = r.default("#notify");
            e.addClass(t), this._last_animation = e.fadeIn(500)
        }, t._scheduleHide = function(t, e) {
            this._last_timeout = setTimeout(this._hide(e), 1e3 * t)
        }, t._hide = function(t) {
            var e = this;
            return function() {
                var n = r.default("#notify");
                return e._last_animation = n.fadeOut(1e3), t && t(), e._last_timeout = null
            }
        }, t
    })();
    e.Notify = i
})), define("modules/core/uri", ["require", "exports", "modules/core/exception"], (function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = /^(?:([^:\/\\?#]+):)?(?:[\/\\]{2}([^\/\\?#]*))?([^?#]*)(?:\?([^#]*))?(?:[#](.*))?$/,
        o = /^[a-zA-Z][a-zA-Z0-9+.\-]*$/,
        i = (function() {
            function t(t) {
                void 0 === t && (t = {}), this.dict = {}, this.add(t)
            }
            return t.parseString = function(e) {
                if (!e) return {};
                var n = {};
                return e.split("&").forEach((function(e) {
                    if ("" !== e) {
                        var r = e.split("="),
                            o = t.decode(r[0]),
                            i = t.decode(r.slice(1).join("="));
                        if (n.hasOwnProperty(o)) {
                            var s = n[o],
                                a = void 0;
                            (a = "string" == typeof s ? [s] : void 0 === s ? [] : s).push(i), n[o] = a
                        } else n[o] = i
                    }
                })), n
            }, t.prototype.add = function(t, e) {
                if ("string" == typeof t) e && (Array.isArray(e) ? this.dict[t] = e.map(String) : this.dict[t] = String(e));
                else
                    for (var n in t)
                        if (t.hasOwnProperty(n)) {
                            var r = t[n];
                            null != r && (Array.isArray(r) ? this.dict[n] = r.map(String) : this.dict[n] = String(r))
                        } return this
            }, t.prototype.remove = function(t) {
                return delete this.dict[t], this
            }, t.prototype.replace = function(t) {
                return this.dict = t, this
            }, t.prototype.toString = function() {
                for (var e = [], n = Object.keys(this.dict).sort(), r = function(n) {
                        if (o.dict.hasOwnProperty(n)) {
                            var r = o.dict[n];
                            Array.isArray(r) ? r.forEach((function(r) {
                                e.push(t.encode(n) + "=" + t.encode(r))
                            })) : e.push(t.encode(n) + "=" + t.encode(r))
                        }
                    }, o = this, i = 0, s = n; i < s.length; i++) {
                    r(s[i])
                }
                return e.length ? e.join("&") : ""
            }, t.decode = function(t) {
                return null == t ? "" : s.decode(t.replace(/\+/g, "%20"))
            }, t.encode = function(t) {
                return null == t ? "" : s.encode(t).replace(/%20/g, "+")
            }, t
        })();
    e.QueryComponent = i;
    var s = (function() {
        function t(t) {
            void 0 === t && (t = {}), this.query = new i, this.initFromObject(t)
        }
        return t.prototype.initFromObject = function(t) {
            this.setScheme(t.scheme), this.authority = t.authority || "", this.path = t.path || "", this.setQuery(t.query), this.fragment = t.fragment || ""
        }, t.prototype.getScheme = function() {
            return this.scheme
        }, t.prototype.getAuthority = function() {
            return this.authority
        }, t.prototype.getPath = function() {
            return this.path
        }, t.prototype.getQuery = function() {
            return this.query.dict
        }, t.prototype.getFragment = function() {
            return this.fragment
        }, t.prototype.setScheme = function(t) {
            void 0 === t && (t = "");
            var e = !t || Boolean(t.match(o));
            return n.assert(e, "Invalid scheme", {
                exc_extra: {
                    scheme_param: t
                }
            }), this.scheme = t, this
        }, t.prototype.setAuthority = function(t) {
            return void 0 === t && (t = ""), this.authority = t, this
        }, t.prototype.setPath = function(t) {
            return void 0 === t && (t = ""), this.path = t, this
        }, t.prototype.setQuery = function(t) {
            return void 0 === t && (t = {}), this.query = new i(t), this
        }, t.prototype.setFragment = function(t) {
            return void 0 === t && (t = ""), this.fragment = t, this
        }, t.prototype.updateQuery = function(t, e) {
            return this.query.add(t, e), this
        }, t.prototype.removeQuery = function(t) {
            return this.query.remove(t), this
        }, t.prototype.clone = function() {
            return new t(this.toObject())
        }, t.prototype.toObject = function() {
            return {
                scheme: this.getScheme(),
                authority: this.getAuthority(),
                path: this.getPath(),
                query: this.getQuery(),
                fragment: this.getFragment()
            }
        }, t.prototype.toString = function() {
            var e = "";
            this.scheme && (e += this.scheme + ":"), this.authority && (e += "//" + t.encode(this.authority, ":@[]")), this.path && (n.assert(!this.authority || !this.path.length || "/" === this.path[0], 'Path must start with a "/" if URI is not relative'), e += t.encode(this.path, "/"));
            var r = this.query.toString();
            return r && (e += "?" + r), this.fragment && (e += "#" + t.encode(this.fragment, ":@[]/&=+?#!")), e
        }, t.parse = function(e) {
            var n = String(e).match(r) || [],
                o = n[1],
                s = n[2],
                a = n[3],
                u = n[4],
                c = n[5],
                l = new t;
            return l.setScheme(o), l.setAuthority(t.decode(s)), l.setPath(t.decode(a)), l.setQuery(i.parseString(u)), l.setFragment(t.decode(c)), l
        }, t.decode = function(t) {
            return t ? decodeURIComponent(t) : ""
        }, t.encode = function(t, e) {
            if (void 0 === e && (e = ""), !t) return "";
            t = encodeURIComponent(t);
            for (var n = 0, r = e += "~"; n < r.length; n++) {
                var o = r[n],
                    i = encodeURIComponent(o);
                t = t.replace(new RegExp(i, "g"), o)
            }
            return t
        }, t.encode_parts = function(e, n) {
            return void 0 === n && (n = "/"), e.split(n).map((function(e) {
                return t.encode(e)
            })).join(n)
        }, t.Query = i, t
    })();
    e.URI = s
}));
//# sourceMappingURL=pkg-core.min.js-vflID6oHy.map