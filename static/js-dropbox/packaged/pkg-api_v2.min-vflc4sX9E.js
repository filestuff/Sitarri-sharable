(function(e, t) {
    if ("function" == typeof define && define.amd) define("Reselect", ["exports"], t);
    else if ("undefined" != typeof exports) t(exports);
    else {
        var r = {
            exports: {}
        };
        t(r.exports), e.Reselect = r.exports
    }
})(this, (function(e) {
    "use strict";

    function t(e, t) {
        return e === t
    }

    function r(e, t, r) {
        if (null === t || null === r || t.length !== r.length) return !1;
        for (var n = t.length, o = 0; o < n; o++)
            if (!e(t[o], r[o])) return !1;
        return !0
    }

    function n(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : t,
            o = null,
            i = null;
        return function() {
            return r(n, o, arguments) || (i = e.apply(null, arguments)), o = arguments, i
        }
    }

    function o(e) {
        var t = Array.isArray(e[0]) ? e[0] : e;
        if (!t.every((function(e) {
                return "function" == typeof e
            }))) {
            var r = t.map((function(e) {
                return typeof e
            })).join(", ");
            throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: [" + r + "]")
        }
        return t
    }

    function i(e) {
        for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
        return function() {
            for (var t = arguments.length, i = Array(t), u = 0; u < t; u++) i[u] = arguments[u];
            var s = 0,
                a = i.pop(),
                c = o(i),
                l = e.apply(void 0, [function() {
                    return s++, a.apply(null, arguments)
                }].concat(r)),
                p = n((function() {
                    for (var e = [], t = c.length, r = 0; r < t; r++) e.push(c[r].apply(null, arguments));
                    return l.apply(null, e)
                }));
            return p.resultFunc = a, p.recomputations = function() {
                return s
            }, p.resetRecomputations = function() {
                return s = 0
            }, p
        }
    }
    e.__esModule = !0, e.defaultMemoize = n, e.createSelectorCreator = i, e.createStructuredSelector = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u;
        if ("object" != typeof e) throw new Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a " + typeof e);
        var r = Object.keys(e);
        return t(r.map((function(t) {
            return e[t]
        })), (function() {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            return t.reduce((function(e, t, n) {
                return e[r[n]] = t, e
            }), {})
        }))
    };
    var u = e.createSelector = i(n)
})), define("modules/clean/api_v2/client_base", ["require", "exports", "tslib", "modules/clean/api_v2/types", "modules/clean/api_v2/transport/jquery", "modules/clean/devtools/panels/performance/perf_hub_action_types", "modules/clean/devtools/panels/performance/perf_hub_actions", "modules/constants/debug", "modules/constants/request", "modules/core/browser", "modules/core/cookies", "modules/core/uri"], (function(e, t, r, n, o, i, u, s, a, c, l, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), s = r.__importStar(s), c = r.__importStar(c);
    var f = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t
    })(o.JQueryAsyncTransport);
    t.DefaultApiV2Transport = f;
    var d = (function() {
        function e(e) {
            this.transport = e || new f
        }
        return e.prototype._upload = function(e, t, o, i) {
            var u, s = r.__assign(((u = {})[n.ApiV2HeaderNames.CsrfToken] = this.csrfToken(), u[n.ApiV2HeaderNames.DropboxApiArg] = JSON.stringify(t), u), this._headers(i));
            return this.executeRpc(e, s, o, "application/octet-stream")
        }, e.prototype._rpc = function(e, t, o) {
            var i, u = r.__assign(((i = {})[n.ApiV2HeaderNames.CsrfToken] = this.csrfToken(), i), this._headers(o)),
                s = JSON.stringify(t || null);
            return this.executeRpc(e, u, s, "application/json")
        }, e.prototype.csrfToken = function() {
            return l.Cookies.read("__Host-js_csrf") || ""
        }, e.prototype.executeRpc = function(e, t, n, o) {
            return r.__awaiter(this, void 0, void 0, (function() {
                var l, f, d, _, m, h, y;
                return r.__generator(this, (function(r) {
                    switch (r.label) {
                        case 0:
                            return l = "client-web.dropbox.com" === c.get_hostname() ? "client-web.dropbox.com" : "www.dropbox.com", s.CPROFILE_ENABLED && (f = {
                                cProfile: s.CPROFILE_PARAMETER,
                                parent_request_id: a.REQUEST_ID
                            }, t[i.PerfHubHeaderNames.FORCE_REQUEST_TRACING_HEADER] = "ON"), d = new p.URI({
                                scheme: "https",
                                authority: l,
                                path: "/2/" + e,
                                query: f
                            }), [4, this.transport.executeRpc(d, t, n, o)];
                        case 1:
                            return _ = r.sent(), s.CPROFILE_ENABLED && (m = _.headers[i.PerfHubHeaderNames.SERVER_RESPONSE_TIME] || "-1", h = _.headers[i.PerfHubHeaderNames.REQUEST_PROFILE_ID] || "", y = _.headers[i.PerfHubHeaderNames.REQUEST_ID], u.PerfHubActions.add_ajax_profile(d.getPath(), m, h, y)), [2, _.result]
                    }
                }))
            }))
        }, e
    })();
    t.ApiV2ClientBase = d, d.prototype.ns = function(e) {
        var t = this;
        return {
            rpc: function(r, n, o) {
                return t._rpc(e + "/" + r, n, o)
            },
            upload: function(r, n, o, i) {
                return t._upload(e + "/" + r, n, o, i)
            }
        }
    }
})), define("modules/clean/api_v2/error", ["require", "exports", "tslib", "modules/core/html", "modules/core/i18n"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = (function() {
        function e(e) {
            this.message = e
        }
        return e.prototype.toString = function() {
            return void 0 === this.message ? "ApiError" : "string" == typeof this.message ? this.message : this.message.toString()
        }, e.parseResponse = function(t, r, i, u) {
            void 0 === u && (u = null);
            var s = "";
            null == u && (u = t in f ? f[t] : t >= 500 ? c : e);
            var a = {
                raw: {
                    status: t,
                    responseBody: i
                },
                summary: null,
                error: {},
                headers: r
            };
            try {
                var l = JSON.parse(i) || {};
                a.error = l.error, a.summary = l.error_summary, s = null != l.user_message ? l.user_message.text : ""
            } catch (e) {}
            429 !== t || s || (s = o.intl.formatMessage({
                defaultMessage: "Folder updates in progress — please try again later. <a>Learn more</a>"
            }, {
                a: function(e) {
                    return '<a href="/help/9259" target="_blank" rel="noopener">' + e + "</a>"
                }
            }));
            var p = void 0;
            return s && (p = new n.HTML(s)), Object.assign(new u(p), a)
        }, e
    })();
    t.ApiError = i;
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t
    })(i);
    t.BadRequestError = u;
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t
    })(i);
    t.AuthError = s;
    var a = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t
    })(i);
    t.AppError = a;
    var c = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t
    })(i);
    t.ServerError = c;
    var l = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t
    })(i);

    function p(e) {
        return e instanceof i
    }
    t.RateLimitError = l, t.isApiError = p, t.isBadRequestError = function(e) {
        return e instanceof u
    }, t.isAuthError = function(e) {
        return e instanceof s
    }, t.isAppError = function(e) {
        return e instanceof a
    }, t.isServerError = function(e) {
        return e instanceof c
    }, t.isRateLimitError = function(e) {
        return e instanceof l
    }, t.catchApiError = function(e) {
        return function(t) {
            if (p(t)) return e(t);
            throw t
        }
    };
    var f = {
        400: u,
        401: s,
        409: a,
        429: l
    }
})), define("modules/clean/insecure_uuid", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = (function() {
            var e, t, r = [];
            for (e = t = 0; t <= 255; e = ++t) r.push((e + 256).toString(16).substr(1));
            return r
        })(),
        n = (function() {
            function e() {}
            return e.bytesToHex = function(e) {
                return e.map((function(e) {
                    return r[e]
                })).join("")
            }, e.toByte = function(e) {
                return 255 & e
            }, e.bytesToUUIDString = function(e) {
                var t = this;
                return [e.slice(0, 4), e.slice(4, 6), e.slice(6, 8), e.slice(8, 10), e.slice(10, 16)].map((function(e) {
                    return t.bytesToHex(e)
                })).join("-")
            }, e.getRandomBytes = function() {
                var e = this,
                    t = new Array(16);
                return this.getInsecureRandomValues(t), t.map((function(t) {
                    return e.toByte(t)
                }))
            }, e.getInsecureRandomValues = function(e) {
                for (var t = Math.pow(2, 8), r = 0; r < e.length; r++) e[r] = Math.floor(Math.random() * t);
                return e
            }, e.v4 = function() {
                var e = this.getRandomBytes();
                return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, this.bytesToUUIDString(e)
            }, e
        })();
    t.InsecureUUID = n
})), define("modules/clean/api_v2/transport/jquery", ["require", "exports", "tslib", "jquery", "modules/clean/api_v2/error"], (function(e, t, r, n, o) {
    "use strict";

    function i(e) {
        var t = e.getAllResponseHeaders(),
            r = {};
        t && t.trim().split(/[\r\n]+/).map((function(e) {
            return e.split(": ")
        })).forEach((function(e) {
            e && (r[e[0]] = e[1])
        }));
        return r
    }

    function u(e, t, r, n) {
        return {
            result: JSON.parse(n.responseText),
            headers: i(n)
        }
    }

    function s(e) {
        return o.ApiError.parseResponse(e.status, i(e), e.responseText)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n);
    var a = (function() {
        function e() {}
        return e.prototype.executeRpc = function(e, t, r, o) {
            return new Promise((function(i, a) {
                return n.default.ajax({
                    type: "POST",
                    url: e.toString(),
                    contentType: o,
                    headers: t,
                    data: r
                }).done((function(e, t, r) {
                    return i(u(0, 0, 0, r))
                })).fail((function(e) {
                    return a(s(e))
                }))
            }))
        }, e
    })();
    t.JQueryAsyncTransport = a;
    var c = (function() {
        function e(e) {
            if (e <= 0) throw new Error("You passed syncTimeout=${syncTimeout}. syncTimeout must be a positive number");
            this.syncTimeout = e
        }
        return e.prototype.executeRpc = function(e, t, r, o) {
            var i = Promise.resolve(null);
            return n.default.ajax({
                type: "POST",
                url: e.toString(),
                contentType: o,
                headers: t,
                data: r,
                async: !1,
                timeout: this.syncTimeout,
                success: function(e, t, r) {
                    i = Promise.resolve(u(0, 0, 0, r))
                },
                error: function(e) {
                    i = Promise.reject(s(e))
                }
            }), i
        }, e
    })();
    t.JQuerySyncTransport = c
})), define("modules/clean/api_v2/types", ["require", "exports", "tslib"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.DropboxApiArg = "Dropbox-API-Arg", e.DropboxApiSelectAdmin = "Dropbox-API-Select-Admin", e.DropboxPathRoot = "X-Dropbox-Path-Root", e.DropboxUid = "X-Dropbox-Uid", e.DropboxTeamId = "X-Dropbox-Teamid", e.DropboxTeamAuthorization = "X-Dropbox-Team-Authorization", e.CsrfToken = "X-CSRF-Token"
    })(t.ApiV2HeaderNames || (t.ApiV2HeaderNames = {})), (function(e) {
        e[e.TeamAdminRole = 0] = "TeamAdminRole", e[e.MTARole = 1] = "MTARole", e[e.FederationAdminRole = 2] = "FederationAdminRole"
    })(t.TeamAuthRequestRole || (t.TeamAuthRequestRole = {})), (function(e) {
        e[e.AdminAction = 0] = "AdminAction", e[e.AssumeAction = 1] = "AssumeAction", e[e.OnBehalfOfAction = 2] = "OnBehalfOfAction"
    })(t.TeamAuthRequestActionType || (t.TeamAuthRequestActionType = {}));
    var n = (function() {
        function e(e, t, r) {
            this.type = e, this.value = t, this.isScalar = r
        }
        return e.parse = function(e) {
            var t = e[".tag"];
            return 2 === Object.keys(e).length && null != e[t] ? new o(t, e[t]) : new i(t, e)
        }, e
    })();
    t.Union = n;
    var o = (function(e) {
        function t(t, r) {
            return void 0 === r && (r = null), e.call(this, t, r, !0) || this
        }
        return r.__extends(t, e), t.prototype.toJSON = function() {
            var e = {
                ".tag": this.type
            };
            return null != this.value && (e[this.type] = this.value), e
        }, t
    })(n);
    t.UnionScalar = o;
    var i = (function(e) {
        function t(t, r) {
            return void 0 === r && (r = {}), e.call(this, t, r, !1) || this
        }
        return r.__extends(t, e), t.prototype.toJSON = function() {
            return r.__assign({
                ".tag": this.type
            }, this.value)
        }, t
    })(n);
    t.UnionStruct = i
})), define("modules/clean/api_v2/noauth_client", ["require", "exports", "tslib", "modules/clean/api_v2/types", "modules/clean/api_v2/client_base", "modules/constants/request"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = (function(e) {
        function t(t) {
            return e.call(this, t) || this
        }
        return r.__extends(t, e), t.prototype._headers = function(e) {
            var t;
            return r.__assign(((t = {})[n.ApiV2HeaderNames.DropboxUid] = String(i.LOGGED_OUT_X_DROPBOX_UID), t), e.headers)
        }, t
    })(o.ApiV2ClientBase);
    t.NoAuthApiV2Client = u
})), define("modules/clean/api_v2/user_client", ["require", "exports", "tslib", "modules/clean/api_v2/types", "modules/clean/api_v2/client_base", "modules/clean/viewer"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var u = (function(e) {
        function t(t) {
            return e.call(this, t) || this
        }
        return r.__extends(t, e), t.prototype._headers = function(e) {
            var t, o = i.Viewer.get_viewer().get_user_by_id(e.subjectUserId);
            return r.__assign(((t = {})[n.ApiV2HeaderNames.DropboxUid] = String(o.id), t[n.ApiV2HeaderNames.DropboxPathRoot] = String(o.root_ns_id), t), e.headers)
        }, t
    })(o.ApiV2ClientBase);
    t.UserApiV2Client = u
})), define("modules/clean/undo", ["require", "exports", "tslib", "jquery", "modules/constants/undo_strings", "modules/core/notify"], (function(e, t, r, n, o, i) {
    "use strict";
    var u, s;

    function a() {
        s && (s(u), s = void 0, u = null)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), t.performUndo = a, t.setHandleUndo = function(e, t) {
        s = e, u = t || null
    }, t.notifyWithUndo = function(e, t, r, c, l) {
        if (void 0 === l && (l = o.UNDO), t && Object.keys(t).length) {
            u = t, s = r, c = null == c ? 30 : c;
            var p = n.default('<span aria-live="polite" />');
            e.toHTML ? p.html(e.toHTML()) : p.text(e);
            var f = n.default('<button class="button-as-link"/>').text(l);
            f.on("click", (function(e) {
                e.preventDefault(), a(), i.Notify.clear()
            })), p.append("&nbsp;").append(f), i.Notify.success(p, c)
        } else i.Notify.success(e)
    }
})), define("modules/clean/query_string_helpers", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = ["gclid", "oqa", "trigger", "_tk", "_camp", "_ad", "_net", "_kw", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term", "cont"];

    function n(e) {
        return void 0 === e && (e = window), e.location.search
    }

    function o(e) {
        var t = {};
        if (e.length)
            for (var r = 0, n = e.substring(1).replace(/&amp;/g, "&").split("&"); r < n.length; r++) {
                var o = n[r].split("="),
                    i = o[0],
                    u = o[1];
                i && u && (i = i.trim(), u = u.trim(), i.length && u.length && (t[i] = decodeURIComponent(u.replace(/\+/g, " "))))
            }
        return t
    }

    function i(e, t) {
        return t.reduce((function(t, r) {
            return e.hasOwnProperty(r) && (t[r] = e[r]), t
        }), {})
    }

    function u(e) {
        return i(e || o(n()), r)
    }
    t.TRACKING_PARAMS_LIST = r, t.getQueryString = n, t.parseQueryString = o, t.getParsedQueryString = function() {
        return o(n())
    }, t.filterQueryObject = i, t.getTrackingParams = u, t.getTrackingParamsAsJSON = function() {
        var e = u();
        return JSON.stringify(e)
    }
}));
//# sourceMappingURL=pkg-api_v2.min.js-vflx07WHY.map