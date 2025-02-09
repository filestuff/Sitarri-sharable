define("modules/clean/abuse/recaptcha_helper", ["require", "exports", "tslib", "modules/constants/login_and_register", "modules/constants/page_load", "modules/clean/global_constants", "modules/clean/web_timing_logger", "modules/core/exception", "modules/core/uri"], (function(e, t, a, r, c, n, o, s, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importStar(r), s = a.__importStar(s);
    var p = !1;

    function l() {
        var e = {
            onload: "recaptchaOnloadCallback",
            render: "explicit",
            hl: c.USER_LOCALE.replace("_", "-")
        };
        return new i.URI({
            scheme: "https",
            authority: "www.google.com",
            path: "/recaptcha/api.js",
            query: e
        }).toString()
    }

    function u() {
        return new Promise((function(c, o) {
            if (window.recaptchaOnloadCallback = function() {
                    c(window.grecaptcha)
                }, r.SHOULD_LOAD_FUNCAPTCHA && p && new Promise((function(t, a) {
                    e(["modules/clean/abuse/funcaptcha_modal"], t, a)
                })).then(a.__importStar).then((function(e) {
                    (0, e.loadFuncaptchaModal)()
                })), t.isTest()) c(f);
            else {
                var i = document.createElement("script"),
                    u = l();
                if (i.setAttribute("src", u), !n.GlobalConstants.CSP_SCRIPT_NONCE) return s.reportException({
                    err: new Error("CSP nonce not set"),
                    severity: s.SEVERITY.CRITICAL,
                    tags: ["product-safety-infra", "recaptcha"]
                }), void o();
                i.setAttribute("nonce", n.GlobalConstants.CSP_SCRIPT_NONCE), document.body.appendChild(i)
            }
        }))
    }
    t.HasCaptchaLoaded = function() {
        return null != t.captchaPromise
    }, t.ClearCaptchaPromise = function() {
        t.captchaPromise = null
    }, t.LoadRecaptcha = function(e, a) {
        return void 0 !== a && (p = a), t.captchaPromise || (t.captchaPromise = e ? new Promise((function(e, t) {
            o.waitForTTI().then(e), setTimeout(e, 2500)
        })).then(u) : u()), t.captchaPromise
    }, t.isTest = function() {
        return r.IS_SELENIUM_TEST
    }, t.BuildRecaptchaURI = l;
    var _ = {},
        h = {},
        d = 0;
    t.DUMMY_RESPONSE = "DUMMY-RESPONSE";
    var m = function(e) {
            e.setAttribute("class", "g-recaptcha-response"), e.setAttribute("name", "g-recaptcha-response"), e.value = ""
        },
        f = {
            reset: function(e) {
                var t = h[e].querySelector(".g-recaptcha-response");
                return m(t), !0
            },
            render: function(e, a, r) {
                var c = d;
                d += 1, s.assert(null == e.querySelector(".g-recaptcha-response"), "can't render multiple recaptcha elements in same div");
                var n = document.createElement("textarea");
                return n.id = "g-recaptcha-response-" + c, m(n), e.appendChild(n), h[c] = e, _[c] = function() {
                    var e = t.DUMMY_RESPONSE;
                    return n.value = e, a.callback && a.callback(e), e
                }, c
            },
            execute: function(e) {
                return Promise.resolve(_[e]())
            }
        }
})), define("modules/clean/auth/common/recaptcha", ["require", "exports", "tslib", "modules/clean/ajax", "classnames", "react", "modules/clean/auth_event_logger", "modules/clean/react/css", "modules/core/i18n", "modules/clean/abuse/recaptcha_helper", "modules/constants/login_and_register"], (function(e, t, a, r, c, n, o, s, i, p, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importStar(r), c = a.__importDefault(c), n = a.__importDefault(n), l = a.__importStar(l), t.get_recaptcha_responses = function(e) {
        var t = e.getWrappedComponent();
        return {
            "g-recaptcha-response": t.recaptcha_response,
            "g-recaptcha-response-v3": t.recaptcha_response_v3,
            "funcaptcha-response": t.funcaptcha_response
        }
    }, t.handle_recaptcha_errors = function(e, t) {
        return e.getWrappedComponent().handle_recaptcha_errors(t)
    }, t.clear_recaptcha_response = function(e) {
        return e.getWrappedComponent().clear_recaptcha_response()
    };
    var u = (function(t) {
        function s(e) {
            return t.call(this, e) || this
        }
        return a.__extends(s, t), s.prototype.render_recaptcha = function(e, t) {
            var a = this;
            void 0 !== this.refs.container_div && (this.refs.container_div.style.display = "block", void 0 !== this.recaptcha_id ? (e.reset(this.recaptcha_id), void 0 !== this.invisible_recaptcha_id && e.reset(this.invisible_recaptcha_id)) : (this.invisible_recaptcha_id = e.render(this.refs.captcha_div, {
                size: "invisible",
                sitekey: l.INVISIBLE_RECAPTCHA_SITE_KEY,
                callback: function(t) {
                    r.BackgroundRequest({
                        url: "/log_invisible_recaptcha_event",
                        data: {
                            email: a.props.email,
                            event: "INVISIBLE_RECAPTCHA_PASSED_" + a.props.source
                        }
                    }), a.recaptcha_response_v3 = void 0, a.recaptcha_response = t, e.reset(a.invisible_recaptcha_id), a.props.onSubmit()
                }
            }), this.recaptcha_id = e.render(this.refs.captcha_div_2, {
                size: "invisible",
                sitekey: l.RECAPTCHA_V3_SITE_KEY,
                callback: function(t) {
                    a.recaptcha_response_v3 = t, e.reset(a.recaptcha_id), a.props.onSubmit()
                }
            })))
        }, s.prototype.handle_recaptcha_errors = function(t) {
            var r = this;
            return t && t.recaptcha_response_v3 ? (this.log_recaptcha_start_event(this.props.source), p.LoadRecaptcha(void 0, !0).then((function(e) {
                e.execute(r.invisible_recaptcha_id)
            })), !0) : !(!t || !t.funcaptcha_response) && (new Promise((function(t, a) {
                e(["modules/clean/abuse/funcaptcha_modal"], t, a)
            })).then(a.__importStar).then((function(e) {
                (0, e.openFuncaptchaModal)(r.props.email || "", r.props.source, (function(e) {
                    r.funcaptcha_response = e, r.props.onSubmit()
                }))
            })), !0)
        }, s.prototype.clear_recaptcha_response = function() {
            this.recaptcha_response = void 0, this.recaptcha_response_v3 = void 0, this.funcaptcha_response = void 0
        }, s.prototype.log_recaptcha_start_event = function(e) {
            r.BackgroundRequest({
                url: "/log_invisible_recaptcha_event",
                data: {
                    email: this.props.email,
                    event: "INVISIBLE_RECAPTCHA_START_" + e
                }
            }), "LOGIN" === e ? o.AuthEventLogger.log_web_login_captcha() : o.AuthEventLogger.log_web_signup_captcha()
        }, s.prototype.componentDidMount = function() {
            var e = this;
            p.LoadRecaptcha(void 0, !0).then((function(t) {
                e.render_recaptcha(t, l.INVISIBLE_RECAPTCHA_SITE_KEY)
            }))
        }, s.prototype.render = function() {
            var e = n.default.createElement("div", {
                className: "recaptcha-terms-text"
            }, i.intl.formatMessage({
                defaultMessage: "This page is protected by reCAPTCHA, and subject to the Google <a_p>Privacy Policy</a_p> and <a_t>Terms of service</a_t>."
            }, {
                a_p: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("a", {
                        href: "https://www.google.com/policies/privacy/",
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, e)
                },
                a_t: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("a", {
                        href: "https://www.google.com/policies/terms/",
                        target: "_blank",
                        rel: "noopener noreferrer"
                    }, e)
                }
            }));
            return n.default.createElement("div", {
                ref: "container_div",
                className: c.default({
                    "recaptcha-v2-challenge-container": !0,
                    "recaptcha-v2-challenge-container--invisible": !0
                })
            }, e, n.default.createElement("div", {
                ref: "captcha_div",
                className: "recaptcha_v2_challenge"
            }), n.default.createElement("div", {
                ref: "captcha_div_2",
                className: "recaptcha_v2_challenge"
            }))
        }, s.prototype.submit = function() {
            var e = this;
            p.LoadRecaptcha(void 0, !0).then((function(t) {
                return t.execute(e.recaptcha_id)
            }))
        }, s
    })(n.default.Component);
    t.RecaptchaComponent = u, t.Recaptcha = s.requireCssWithComponent(u, ["/static/css/recaptcha-vflIN6j39.css"])
}));
//# sourceMappingURL=pkg-captcha.min.js-vfldZfbeY.map