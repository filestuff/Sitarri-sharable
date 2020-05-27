define("modules/clean/abuse/funcaptcha_modal", ["require", "exports", "tslib", "react", "modules/clean/ajax", "classnames", "modules/clean/flux/base_store", "modules/clean/flux/dispatcher", "modules/clean/flux/store_listener", "modules/constants/env", "modules/constants/login_and_register", "modules/core/browser_detection", "modules/core/uri", "react-dom", "modules/core/dom"], (function(e, t, r, o, n, i, s, a, c, u, l, d, p, h, _) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importDefault(o), n = r.__importStar(n), i = r.__importDefault(i), l = r.__importStar(l), d = r.__importStar(d), h = r.__importStar(h), _ = r.__importStar(_);
    var f = function(e, t) {
            a.Dispatcher.dispatch({
                type: e,
                data: t
            })
        },
        g = function(e, t, r) {
            n.BackgroundRequest({
                url: "/log_invisible_recaptcha_event",
                data: {
                    event: e,
                    email: t,
                    source: r
                }
            })
        };
    t.loadFuncaptchaModal = function() {
        var e = new m,
            t = c.listenToStores(S, {
                fs: e
            }, (function() {
                return {
                    show: e.show,
                    email: e.email,
                    firstTime: e.firstTime,
                    onSuccess: e.onSuccess,
                    runningFuncaptcha: e.runningFuncaptcha,
                    source: e.source
                }
            })),
            r = document.createElement("div");
        document.body.insertBefore(r, document.body.firstChild || null), h.render(o.default.createElement(t, null), r)
    }, t.openFuncaptchaModal = function(e, t, r) {
        g("FUNCAPTCHA_START", e, t), f("FUNCAPTCHA_START", {
            email: e,
            source: t,
            onSuccess: r
        })
    };
    var m = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.show = !1, t.email = "", t.runningFuncaptcha = !1, t.firstTime = !0, t.source = "", t
            }
            return r.__extends(t, e), t.prototype._new_payload = function(e) {
                if (e && e.action && e.action.type) switch (e.action.type) {
                    case "FUNCAPTCHA_START":
                        this.runningFuncaptcha = !0, this.firstTime = !1;
                        var t = e.action.data;
                        this.email = t.email, this.onSuccess = t.onSuccess, this.source = t.source, this.emit_change();
                        break;
                    case "FUNCAPTCHA_OPEN_MODAL":
                        this.show = !0, this.emit_change();
                        break;
                    case "FUNCAPTCHA_FINISH":
                        this.show = !1, this.runningFuncaptcha = !1, this.onSuccess = void 0, this.emit_change()
                }
            }, t
        })(s.Store),
        S = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r.__extends(t, e), t.prototype.getIFrame = function() {
                return h.findDOMNode(this.refs.iframe)
            }, t.prototype.componentDidMount = function() {
                var e = this;
                window.addEventListener("message", (function(t) {
                    if (t.data && "funcaptcha-component" === t.data.origin && p.URI.parse(t.origin).getAuthority() === u.FUNCAPTCHA_SERVER)
                        if ("loaded" === t.data.event) g("FUNCAPTCHA_CHALLENGE_SHOWN", e.props.email, e.props.source), f("FUNCAPTCHA_OPEN_MODAL");
                        else if ("played" === t.data.event) {
                        var r = e.props.show ? "FUNCAPTCHA_SOLVED" : "FUNCAPTCHA_SUCCESS";
                        g(r, e.props.email, e.props.source), e.props.onSuccess(t.data.fc_token), f("FUNCAPTCHA_FINISH")
                    }
                }))
            }, t.prototype.componentWillReceiveProps = function(e) {
                if (!this.props.runningFuncaptcha && e.runningFuncaptcha) {
                    var t = this.props.firstTime ? "load" : "play",
                        r = e.source,
                        o = void 0;
                    o = "LOGIN" === r ? l.FUNCAPTCHA_PUBLIC_KEY : l.FUNCAPTCHA_REGISTER_PUBLIC_KEY;
                    this.getIFrame().contentWindow.postMessage({
                        event: t,
                        origin: "funcaptcha-component",
                        public_key: o,
                        source: r
                    }, "*")
                }
            }, t.prototype.componentDidUpdate = function(e, t) {
                !e.show && this.props.show ? _.scroll_lock_document() : e.show && !this.props.show && _.scroll_unlock_document()
            }, t.prototype.render = function() {
                var e = new p.URI({
                        scheme: "https",
                        authority: u.FUNCAPTCHA_SERVER,
                        query: {
                            fc_nosuppress: p.URI.parse(window.location.href).getQuery().fc_nosuppress
                        }
                    }).toString(),
                    t = o.default.createElement("iframe", {
                        frameBorder: 0,
                        height: "100%",
                        width: "100%",
                        sandbox: "allow-scripts allow-same-origin allow-forms",
                        className: "funcaptcha-frame",
                        src: e,
                        ref: "iframe",
                        key: "iframe-id"
                    });
                return o.default.createElement("div", {
                    className: i.default({
                        "funcaptcha-modal--hidden-firefox": !this.props.show && d.mozilla,
                        "funcaptcha-modal--hidden-non-firefox": !this.props.show && !d.mozilla,
                        "funcaptcha-modal": !0
                    })
                }, o.default.createElement("div", {
                    className: "funcaptcha-div"
                }, t))
            }, t
        })(o.default.Component)
})), define("modules/clean/abuse/invisible_recaptcha", ["require", "exports", "tslib", "modules/clean/abuse/recaptcha_helper", "modules/clean/ajax", "modules/clean/auth_event_logger", "modules/clean/legacy_pyxl_controllers/ajax_form", "modules/constants/login_and_register"], (function(e, t, r, o, n, i, s, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), s = r.__importDefault(s), a = r.__importStar(a), t.loadRecaptchaAndSetupInvisibleRecaptcha = function(t, c, u, l, d) {
        var p = c.find(".recaptcha_v2_challenge");
        if (p[0]) {
            var h, _, f = function(e) {
                    e.reset(h), _.querySelector(".g-recaptcha-response").setAttribute("name", "g-recaptcha-response-v3")
                },
                g = function() {
                    return c.find("input[name='" + u + "']").val()
                },
                m = o.LoadRecaptcha(d, !0).then((function(o) {
                    return p.parent().show(), p.empty(), _ = document.createElement("span"), p[0].appendChild(_), h = o.render(_, {
                        action: l,
                        size: "invisible",
                        sitekey: a.RECAPTCHA_V3_SITE_KEY
                    }), f(o), c.on(s.default.ERROR_EVENT, (function(s, c) {
                        if (c && c.recaptcha_response_v3) {
                            t.set_pending_state(), n.BackgroundRequest({
                                url: "/log_invisible_recaptcha_event",
                                data: {
                                    email: g(),
                                    event: "INVISIBLE_RECAPTCHA_START_" + l
                                }
                            }), "LOGIN" === l ? i.AuthEventLogger.log_web_login_captcha() : i.AuthEventLogger.log_web_signup_captcha();
                            var u = document.createElement("span");
                            p[0].appendChild(u), new Promise((function(e, t) {
                                o.execute(o.render(u, {
                                    size: "invisible",
                                    sitekey: a.INVISIBLE_RECAPTCHA_SITE_KEY,
                                    callback: e
                                }))
                            })).then((function(e) {
                                n.BackgroundRequest({
                                    url: "/log_invisible_recaptcha_event",
                                    data: {
                                        email: g(),
                                        event: "INVISIBLE_RECAPTCHA_PASSED_" + l
                                    }
                                }), t.send_request(), p[0].removeChild(u)
                            }))
                        } else c && c.funcaptcha_response && (t.set_pending_state(), new Promise((function(t, r) {
                            e(["modules/clean/abuse/funcaptcha_modal"], t, r)
                        })).then(r.__importStar).then((function(e) {
                            (0, e.openFuncaptchaModal)(g(), l, (function(e) {
                                var r = document.createElement("input");
                                r.setAttribute("name", "funcaptcha-response"), r.setAttribute("value", e), r.setAttribute("type", "hidden"), t.$form.append(r), t.send_request(), t.$form.find("[name='funcaptcha-response']").remove()
                            }))
                        })))
                    })), o
                }));
            t.send_request_wrapper = function() {
                m.then((function(e) {
                    e.execute(h).then((function() {
                        t.send_request(), f(e)
                    }))
                }))
            }
        }
    }
})), define("modules/clean/auth/u2f", ["require", "exports", "tslib", "u2f-api", "modules/core/browser_detection"], (function(e, t, r, o, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importDefault(o), n = r.__importStar(n), (function(e) {
        var t;
        (function(e) {
            e.bt = "bt", e.ble = "ble", e.nfc = "nfc", e.usb = "usb"
        })(t || (t = {})), (function(e) {
            e[e.OK = 0] = "OK", e[e.OTHER_ERROR = 1] = "OTHER_ERROR", e[e.BAD_REQUEST = 2] = "BAD_REQUEST", e[e.CONFIGURATION_UNSUPPORTED = 3] = "CONFIGURATION_UNSUPPORTED", e[e.DEVICE_INELIGIBLE = 4] = "DEVICE_INELIGIBLE", e[e.TIMEOUT = 5] = "TIMEOUT"
        })(e.ErrorCode || (e.ErrorCode = {}))
    })(t.FidoU2f || (t.FidoU2f = {})), t.PROTOCOLS = {
        "u2f_js1.1": ""
    }, t.LATEST_PROTOCOL = "u2f_js1.1";
    var i = window.u2f;

    function s() {
        return !0 === n.chrome && parseInt(n.version, 10) >= 38 && !n.is_mobile_or_tablet() || Boolean(i)
    }
    t.isSupportedOnBrowser = s, t.canRegisterAuthenticator = function(e) {
        return !!e && s()
    }, t.canUseAuthenticator = function(e) {
        return !!e && s()
    }, t.register = function(e) {
        return new Promise((function(t, r) {
            (i || o.default).register(e.appId, e.registerRequests, e.registeredKeys, t, e.opt_timeoutSeconds)
        }))
    }, t.sign = function(e) {
        return new Promise((function(t, r) {
            (i || o.default).sign(e.appId, e.challenge, e.registeredKeys, t, e.opt_timeoutSeconds)
        }))
    }
})), define("modules/clean/auth/authenticator", ["require", "exports", "tslib", "modules/clean/auth/u2f", "modules/clean/auth/webauthn"], (function(e, t, r, o, n) {
    "use strict";

    function i(e) {
        return n.canRegisterAuthenticator(e[n.LATEST_PROTOCOL]) ? n.LATEST_PROTOCOL : o.canRegisterAuthenticator(e[o.LATEST_PROTOCOL]) ? o.LATEST_PROTOCOL : null
    }

    function s(e) {
        return n.canUseAuthenticator(e[n.LATEST_PROTOCOL]) ? n.LATEST_PROTOCOL : o.canUseAuthenticator(e[o.LATEST_PROTOCOL]) ? o.LATEST_PROTOCOL : null
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importStar(o), n = r.__importStar(n), t.PROTOCOLS = r.__assign(r.__assign({}, o.PROTOCOLS), n.PROTOCOLS), t.isWebAuthnEnabled = function(e) {
        return !!e && !!e[n.LATEST_PROTOCOL]
    }, t.canRegisterAuthenticator = function(e) {
        return void 0 === e ? o.isSupportedOnBrowser() : null !== i(e)
    }, t.canUseAuthenticator = function(e) {
        return null !== s(e)
    };
    var a = {
            error: "Authenticator devices are not supported on this browser"
        },
        c = {
            error: "Authenticator protocol not supported"
        };

    function u(e, t) {
        var r;
        return null !== (r = "register" === e ? i(t) : s(t)) ? Promise.resolve(r) : o.isSupportedOnBrowser() || n.isSupportedOnBrowser() ? Promise.reject(c) : Promise.reject(a)
    }
    t.register = function(e) {
        return u("register", e).then((function(t) {
            return t in n.PROTOCOLS ? n.register(e[t]).then((function(e) {
                return {
                    protocol: t,
                    response: e
                }
            })) : t in o.PROTOCOLS ? o.register(e[t]).then((function(e) {
                return {
                    protocol: t,
                    response: e
                }
            })) : Promise.reject(c)
        }))
    }, t.sign = function(e) {
        return u("sign", e).then((function(t) {
            return t in n.PROTOCOLS ? n.sign(e[t]).then((function(e) {
                return {
                    protocol: t,
                    response: e
                }
            })) : t in o.PROTOCOLS ? o.sign(e[t]).then((function(e) {
                return {
                    protocol: t,
                    response: e
                }
            })) : Promise.reject(c)
        }))
    }
})), define("modules/clean/auth/webauthn", ["require", "exports", "tslib", "modules/core/browser_detection", "modules/clean/security/util"], (function(e, t, r, o, n) {
    "use strict";
    var i;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importStar(o), t.PROTOCOLS = {
        webauthn_wd07: ""
    }, t.LATEST_PROTOCOL = "webauthn_wd07", (function(e) {
        e[e.OtherError = 1] = "OtherError", e[e.SecurityError = 2] = "SecurityError", e[e.NotAllowedError = 3] = "NotAllowedError", e[e.InvalidStateError = 4] = "InvalidStateError", e[e.Canceled = 5] = "Canceled", e[e.Timeout = 6] = "Timeout", e[e.NotSupportedError = 7] = "NotSupportedError"
    })(i || (i = {}));
    var s, a = {
        SecurityError: i.SecurityError,
        NotAllowedError: i.NotAllowedError,
        InvalidStateError: i.InvalidStateError,
        AbortError: i.Canceled,
        TimeoutError: i.Timeout,
        NotSupportedError: i.NotSupportedError
    };

    function c() {
        return window.PublicKeyCredential && (!0 === o.mozilla && parseInt(o.version, 10) >= 60 || !0 === o.chrome && parseInt(o.version, 10) >= 66 || !0 === o.edge && parseFloat(o.version) >= 17.17682 || !0 === o.safari && parseFloat(o.version) >= 12.2)
    }

    function u(e) {
        return !(!e || !c()) && ((!0 !== o.edge || !0 !== e.disable_on_edge) && (!0 !== o.safari || !0 !== e.disable_on_safari))
    }

    function l(e) {
        if (e instanceof DOMException) {
            var t = a[e.name];
            if (void 0 !== t) return {
                errorCode: t,
                errorData: e.toString && e.toString()
            }
        }
        return {
            errorCode: i.OtherError,
            errorData: e.toString && e.toString()
        }
    }(function(e) {
        e[e.COSE = 0] = "COSE", e[e.DER = 1] = "DER"
    })(s || (s = {})), t.isSupportedOnBrowser = c, t.canRegisterAuthenticator = function(e) {
        return u(e)
    }, t.canUseAuthenticator = function(e) {
        return u(e) && (function(e) {
            if (!0 === o.edge && parseFloat(o.version) >= 17.17682 && parseFloat(o.version) < 17.17713 || !0 === o.chrome && 69 === parseInt(o.version, 10) || !0 === o.safari && parseFloat(o.version) < 13.1) {
                if (e.allowCredentials)
                    for (var t = 0, r = e.allowCredentials; t < r.length; t++) {
                        if (r[t].key_format === s.COSE) return !0
                    }
                return !1
            }
            return !0
        })(e)
    }, t.register = function(e) {
        var t = {
            challenge: n.b64urldecode(e.challenge),
            timeout: e.timeout,
            rp: {
                id: e.rp.id,
                name: e.rp.name,
                icon: e.rp.icon
            },
            user: {
                id: n.b64urldecode(e.user.id),
                name: e.user.name,
                displayName: e.user.displayName,
                icon: e.user.icon
            },
            authenticatorSelection: e.authenticatorSelection
        };
        return void 0 !== e.excludeCredentials && (t.excludeCredentials = e.excludeCredentials.map((function(e) {
            return {
                type: e.type,
                id: n.b64urldecode(e.id),
                transports: e.transports
            }
        }))), void 0 !== e.pubKeyCredParams && (t.pubKeyCredParams = e.pubKeyCredParams.map((function(e) {
            return {
                type: e.type,
                alg: e.alg
            }
        }))), void 0 === e.attestation && (t.attestation = "direct"), navigator.credentials.create({
            publicKey: t
        }).then((function(e) {
            return {
                response: {
                    clientDataJSON: n.b64urlencode(e.response.clientDataJSON),
                    attestationObject: n.b64urlencode(e.response.attestationObject)
                }
            }
        })).catch((function(e) {
            return l(e)
        }))
    }, t.sign = function(e) {
        var t = {
            challenge: n.b64urldecode(e.challenge),
            timeout: e.timeout,
            rpId: e.rpId,
            userVerification: e.userVerification,
            extensions: e.extensions
        };
        return void 0 !== e.allowCredentials && (t.allowCredentials = e.allowCredentials.map((function(e) {
            var t = void 0;
            return e.transports && e.transports.length > 0 && (t = e.transports), {
                type: e.type,
                id: n.b64urldecode(e.id),
                transports: t
            }
        }))), navigator.credentials.get({
            publicKey: t
        }).then((function(e) {
            return {
                id: e.id,
                response: {
                    clientDataJSON: n.b64urlencode(e.response.clientDataJSON),
                    authenticatorData: n.b64urlencode(e.response.authenticatorData),
                    signature: n.b64urlencode(e.response.signature),
                    userHandle: e.response.userHandle && n.b64urlencode(e.response.userHandle)
                }
            }
        })).catch((function(e) {
            return l(e)
        }))
    }
})), define("modules/clean/legacy_pyxl_controllers/login_form", ["require", "exports", "tslib", "jquery", "modules/clean/abuse/invisible_recaptcha", "modules/clean/ajax", "modules/core/exception", "modules/clean/legacy_pyxl_controllers/ajax_form", "modules/clean/profile_services/profile_services_constants", "modules/clean/profile_services/profile_services_link", "modules/clean/sso_login_checks", "modules/core/browser", "modules/core/html", "modules/core/i18n", "modules/core/notify", "modules/core/uri", "modules/clean/auth/authenticator", "modules/clean/web_register_logging_data", "modules/clean/react/fedramp/fedramp_util"], (function(e, t, r, o, n, i, s, a, c, u, l, d, p, h, _, f, g, m, S) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importDefault(o), i = r.__importStar(i), a = r.__importDefault(a), c = r.__importDefault(c), d = r.__importStar(d), g = r.__importStar(g);
    var v = (function() {
        function t(t, i, s, c, u, p, h, _, g, m, S, v, E) {
            var w = this;
            void 0 === c && (c = !1), void 0 === u && (u = !0), void 0 === p && (p = !1), void 0 === h && (h = null), void 0 === _ && (_ = null), void 0 === g && (g = !0), void 0 === m && (m = !0), void 0 === S && (S = !1), void 0 === v && (v = !1), void 0 === E && (E = null), this.loginType = i, this.inlineGoogleLoginErrors = p, this.signupTag = h, this.signupEndpoint = _, this.canRedirect = g, this.keepUrlFragment = m, this.useCurrentUri = S, this.multiLogin = "multi" === this.loginType, this.pairing = "pairing" === this.loginType, this.encryption_options = E, this.$loginForm = t.find(".login-form"), this.$rebrandLoginSubContainer = t.find(".login-form-container--subcontainer"), this.$googleAuthContainer = t.find(".login-form-container__google-div"), this.$appleAuthContainer = t.find(".login-form-container__apple-div"), this.$allTwoFactorForms = t.find(".two-factor-form"), this.$twoFactorPhoneForm = t.find(".two-factor-form.2fa-phone-form"), this.$twoFactorSeckeyForm = t.find(".two-factor-form.2fa-seckey-form"), this.$loginViaEmailForm = t.find(".login-via-email-link"), this.$twoFactorForm = this.$twoFactorPhoneForm, c || new Promise((function(t, r) {
                e(["modules/clean/unity/features/web_destiny_ui"], t, r)
            })).then(r.__importStar).then((function(e) {
                new(0, e.default)(t).maybe_show_web_destiny()
            })), this.wrapPassword = new Promise((function(t, r) {
                e(["modules/clean/security/passwords"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.wrapPassword
            })), this.loginController = new a.default(this.$loginForm, this.beforeSubmit.bind(this), {
                should_submit_once: !0
            }), n.loadRecaptchaAndSetupInvisibleRecaptcha(this.loginController, this.$loginForm, "login_email", "LOGIN", v), this.$loginForm.on(a.default.SUCCESS_EVENT, this.loginSuccess.bind(this)), this.$loginForm.on(a.default.ERROR_EVENT, (function(e, t) {
                return w.$loginForm.find(".login-via-email-blade-link").click(w.loginViaEmailStart.bind(w))
            }));
            var y = f.URI.parse(this.$loginForm.find("input[name='cont']").val());
            this.useCurrentUri && (y = f.URI.parse(d.get_href())), this.keepUrlFragment && y.setFragment(window.location.hash.substr(1)), this.cont = y.toString(), this.twoFactorPhoneController = new a.default(this.$twoFactorPhoneForm, (function() {
                return null
            }), {
                should_submit_once: !0
            }), this.twoFactorSeckeyController = new a.default(this.$twoFactorSeckeyForm, (function() {
                return null
            }), {
                should_submit_once: !0
            }), this.twoFactorController = this.twoFactorPhoneController, this.$twoFactorPhoneForm.on(a.default.SUCCESS_EVENT, this.twoFactorSuccess.bind(this)), this.$twoFactorSeckeyForm.on(a.default.SUCCESS_EVENT, this.twoFactorSuccess.bind(this)), this.$twoFactorSeckeyForm.on(a.default.ERROR_EVENT, (function(e, t) {
                return w.$twoFactorSeckeyForm.find(".two-factor-seckey-instructions .error-msg").text(t.u2f.message_text), w.$twoFactorSeckeyForm.find(".two-factor-seckey-instructions").toggle()
            })), this.$twoFactorPhoneForm.find(".resend-two-factor-code").click(this.resendCode.bind(this)), this.$twoFactorSeckeyForm.find(".two-factor-use-phone-instead").click(this.usePhoneInstead.bind(this)), this.$twoFactorSeckeyForm.find(".two-factor-seckey-retry").click(this.retryU2fChallenge.bind(this)), null != this.$loginViaEmailForm && this.$loginViaEmailForm.click(this.loginViaEmailStart.bind(this)), this.$googleAuthContainer.find(".auth-google").click(this.googleLogin.bind(this)), this.$googleAuthContainer.find(".auth-google").prop("disabled", !1), this.$appleAuthContainer.find(".auth-apple").click(this.appleLogin.bind(this)), this.$appleAuthContainer.find(".auth-apple").prop("disabled", !1);
            var b = this.$twoFactorSeckeyForm.find("input[name='u2f_challenge']").val();
            if (b) {
                var T = this.parseU2fChallenge(b);
                void 0 !== T && this.signU2fChallenge(T)
            }
            this.$loginForm.find(".sso-optout a").click((function() {
                return w.hideSso(!0)
            })), this.$loginForm.find(".login-button").attr("disabled", null), this.$loginForm.find(".login-button.disabled-button").prop("disabled", !0), u && t.find(".login-need-help a").click((function(e) {
                e.preventDefault();
                var t = o.default(e.target).attr("href"),
                    r = encodeURIComponent(w.$loginForm.find("input[name='login_email']").val());
                return d.redirect(t + "?email_from_login=" + r)
            })), this.setFocusToPassword(), new l.SsoLoginChecks(this.$loginForm.find("input[name='login_email']"), this.showSso.bind(this), this.hideSso.bind(this))
        }
        return t.prototype.ie8SafeFocus = function(e) {
            try {
                e.focus()
            } catch (e) {}
        }, t.prototype.setFocusToPassword = function() {
            this.$loginForm.find("input[name='login_email']").first().val() && this.ie8SafeFocus(this.$loginForm.find("input[name='login_password']")[0])
        }, t.prototype.isRememberMeChecked = function() {
            return "on" === this.$loginForm.find("input[name='remember_me']:checked").val()
        }, t.prototype.setFocusToTwofactor = function() {
            this.ie8SafeFocus(this.$twoFactorForm.find("input[name='code']").val(""))
        }, t.prototype.googleLogin = function() {
            a.default.clear_errors(this.$loginForm);
            var e = this.isRememberMeChecked(),
                t = new u.ProfileServicesLinkingHandler,
                r = this.$googleAuthContainer.find(".auth-google").data("is-popup");
            t.auth_service_login_web(c.default.GOOGLE, this.googleLoginCallback.bind(this), "login_form", r, e, this.cont, this.pairing)
        }, t.prototype.appleLogin = function() {
            a.default.clear_errors(this.$loginForm);
            var e = this.isRememberMeChecked(),
                t = new u.ProfileServicesLinkingHandler,
                r = this.$appleAuthContainer.find(".auth-apple").data("is-popup");
            t.auth_service_login_web(c.default.APPLE, this.appleLoginCallback.bind(this), "login_form", r, e, this.cont, this.pairing)
        }, t.prototype.googleLoginCallback = function(e) {
            if (e.success) {
                _.Notify.success(h.intl.formatMessage({
                    defaultMessage: "Log in successful! Your browser will be redirected in a few seconds."
                })), i.SilentBackgroundRequest({
                    url: "/profile_services/log",
                    data: {
                        event_name: "login_callback_success"
                    }
                });
                var t = S.getFedrampRedirectUrlIfApplicable(e.is_fedramp_user || !1, this.cont || "/h");
                d.redirect(t)
            } else if (i.SilentBackgroundRequest({
                    url: "/profile_services/log",
                    data: {
                        event_name: "login_callback_error"
                    }
                }), "emails_do_not_match_redirect" === e.err_msg) {
                var r = this.getThirdPartyAuthUrl(e, !0);
                d.redirect(r)
            } else if ("emails_do_not_match" === e.err_msg && this.inlineGoogleLoginErrors && !this.pairing) this.handleEmailsDoNotMatch(e);
            else if ("tfa_required" === e.err_msg) this.redirectToPath(e, "/verify_code");
            else if ("enable_twofactor_required" === e.err_msg) this.redirectToPath(e, "/twofactor");
            else if ("not_verified" === e.err_msg) this.redirectToPath(e, "/show_password_form");
            else if ("email_not_verified" === e.err_msg) {
                var o = h.intl.formatMessage({
                    defaultMessage: "Before you can sign in, you’ll need to verify your account with Google {email}"
                }, {
                    email: e.profile.email
                });
                _.Notify.error(new p.HTML("<span>" + o + "</span>"), 30)
            } else e.localized_error && _.Notify.error(e.localized_error), "google_login_not_allowed" !== e.err_msg && "sso_required" !== e.err_msg || this.fillInEmail(e.profile.email)
        }, t.prototype.appleLoginCallback = function(e) {
            if (e.success) {
                _.Notify.success(h.intl.formatMessage({
                    defaultMessage: "Sign in successful! Your browser will be redirected in a few seconds."
                })), i.SilentBackgroundRequest({
                    url: "/profile_services/log",
                    data: {
                        event_name: "login_callback_success"
                    }
                });
                var t = S.getFedrampRedirectUrlIfApplicable(e.is_fedramp_user || !1, this.cont || "/h");
                d.redirect(t)
            } else if (i.SilentBackgroundRequest({
                    url: "/profile_services/log",
                    data: {
                        event_name: "login_callback_error"
                    }
                }), "no_email_in_response" === e.err_msg) {
                var r = h.intl.formatMessage({
                    defaultMessage: "Sign in failed. If you’d like to sign in with Apple again, <a>see how in our help center</a>. You could also sign in with your Dropbox account email and password."
                }, {
                    a: function(e) {
                        return '<a href="/help/accounts-billing/settings-sign-in/apple-sign-in-error">' + e + "</a>"
                    }
                });
                _.Notify.error(new p.HTML("<span>" + r + "</span>"), 30)
            } else if ("emails_do_not_match" === e.err_msg) {
                r = h.intl.formatMessage({
                    defaultMessage: "We couldn’t find a Dropbox account matching the email {email}. <a1>Sign up for a new account</a1> or <a2>get help signing in</a2> to an existing account."
                }, {
                    a2: function(e) {
                        return '<a href="/help/accounts-billing/settings-sign-in/sign-in-with-apple?_tk=sia_nomatch_help_web">' + e + "</a>"
                    },
                    a1: function(e) {
                        return '<a href="/individual/plans-comparison?_tk=sia_nomatch_plan_web">' + e + "</a>"
                    },
                    email: e.profile.email
                });
                _.Notify.error(new p.HTML("<span>" + r + "</span>"), 30)
            } else "tfa_required" === e.err_msg ? this.redirectToPath(e, "/verify_code") : "enable_twofactor_required" === e.err_msg ? this.redirectToPath(e, "/twofactor") : "requires_password_on_first_link" === e.err_msg ? this.redirectToPath(e, "/show_password_form") : e.localized_error && _.Notify.error(e.localized_error)
        }, t.prototype.handleEmailsDoNotMatch = function(e) {
            var t = this.getThirdPartyAuthUrl(e, !1);
            this.$googleAuthContainer.find(".third-party-signup-link").attr("href", t), this.$googleAuthContainer.find(".google-login-error").removeClass("u-l-dn")
        }, t.prototype.getThirdPartyAuthUrl = function(e, t) {
            var r = {
                fname: e.profile.given_name,
                lname: e.profile.family_name,
                email: e.profile.email,
                picture_url: e.profile.picture_url,
                refresh_token: e.refresh_token,
                email_sig: e.email_sig,
                automatic_redirect: t.toString(),
                cont: this.cont
            };
            this.signupTag && (r.signup_tag = this.signupTag), this.signupEndpoint && (r.signup_endpoint = this.signupEndpoint);
            var o = m.setWebRegisterLoggingData(r);
            return String(new f.URI({
                path: "/third_party_signup"
            }).updateQuery(o))
        }, t.prototype.fillInEmail = function(e) {
            this.$loginForm.find("input[name='login_email']").val(e), this.$loginForm.find("input[name='login_email']").trigger("input"), this.setFocusToPassword()
        }, t.prototype.redirectToPath = function(e, t) {
            var r = new f.URI({
                path: t
            }).updateQuery({
                cont: this.cont,
                remember_me: e.remember_me.toString(),
                pair_user: e.pair_user.toString()
            });
            d.redirect(r.toString())
        }, t.prototype.beforeSubmit = function() {
            var e = this;
            if (null === this.encryption_options) {
                var t = new Error("Must define encryption options to submit form");
                return s.reportException({
                    err: t,
                    severity: "critical",
                    tags: ["legacy-login-form"]
                }), Promise.reject(t)
            }
            var r = this.encryption_options,
                o = this.$loginForm.find("input[name='login_password']").val();
            return this.wrapPassword.then((function(t) {
                return t(o, r).then((function(t) {
                    e.loginController.add_additional_data({
                        login_password: "",
                        encrypted_password: t
                    })
                }))
            })).catch((function(e) {
                throw s.reportException({
                    err: e,
                    severity: "critical",
                    tags: ["legacy-login-form"]
                }), e
            }))
        }, t.prototype.showSso = function(e) {
            this.$loginForm.find("input[name='login_password']").val(""), this.$loginForm.addClass("sso-required"), this.$rebrandLoginSubContainer.addClass("sso-required"), e && (this.$loginForm.addClass("sso-optional"), this.$rebrandLoginSubContainer.addClass("sso-optional"))
        }, t.prototype.hideSso = function(e) {
            if (void 0 === e && (e = !1), this.$loginForm.removeClass("sso-required sso-optional"), this.$rebrandLoginSubContainer.removeClass("sso-required sso-optional"), e) try {
                this.$loginForm.find("input[name='login_password']").focus()
            } catch (e) {}
        }, t.prototype.browserSupportsU2f = function(e) {
            return g.canUseAuthenticator(e)
        }, t.prototype.showLogin = function() {
            this.$twoFactorForm.hide(), this.$loginForm.show(), this.$loginForm.find("input[name='login_password']").val(""), this.$googleAuthContainer.show()
        }, t.prototype.setupTwoFactor = function(e) {
            if (e.u2f_challenge) {
                var t = this.parseU2fChallenge(e.u2f_challenge);
                void 0 !== t && (this.$twoFactorForm = this.$twoFactorSeckeyForm, this.twoFactorController = this.twoFactorSeckeyController, this.signU2fChallenge(t))
            }
            e.last_two_digits ? (this.$allTwoFactorForms.addClass("hide-authenticator"), this.$allTwoFactorForms.addClass("hide-other-authentication"), this.$twoFactorPhoneForm.find(".last-two-digits").text(e.last_two_digits)) : e.use_email_2fa ? (this.$allTwoFactorForms.addClass("hide-sms-info"), this.$allTwoFactorForms.addClass("hide-authenticator"), this.$twoFactorPhoneForm.find(".2fa-code-sent-location").text(h.intl.formatMessage({
                defaultMessage: "We sent a code to {email} and any devices you’ve linked to this account. Enter the code to continue."
            }, {
                email: e.email
            })), this.$twoFactorPhoneForm.addClass("hide-recovery-url"), this.$twoFactorPhoneForm.addClass("hide-remember-me")) : (this.$allTwoFactorForms.addClass("hide-sms"), this.$allTwoFactorForms.addClass("hide-other-authentication")), this.$twoFactorForm.find("input[name='remember_me']").val(e.remember_me), e.remember_me && this.$twoFactorForm.find("a[class='twofactor_recovery_url']").attr("href", (function(e, t) {
                return f.URI.parse(t).updateQuery({
                    remember_me: "true"
                }).toString()
            })), this.showTwoFactor()
        }, t.prototype.showTwoFactor = function() {
            this.$loginForm.hide(), this.$googleAuthContainer.hide(), this.$twoFactorForm.show(), this.setFocusToTwofactor()
        }, t.prototype.loginSuccess = function(e, t) {
            switch (t.status) {
                case "OK":
                    return this.finishLogin(t);
                case "DEVICE_LIMIT":
                    return d.redirect(new f.URI({
                        path: t.device_limit_url,
                        query: {
                            nonce: t.nonce || ""
                        }
                    }));
                case "TWOFACTOR":
                    return this.setupTwoFactor(t);
                case "TWOFACTOR_REQUIRED":
                case "TOS_SIGNATURE_REQUIRED":
                    return d.redirect(t.cont);
                case "LOGIN_VIA_EMAIL_REQUIRED":
                    var r = t.email,
                        o = new f.URI({
                            path: t.cont
                        }).updateQuery({
                            email: r
                        });
                    return d.redirect(o.toString());
                case "SSO":
                    return d.unsafeRedirect(t.sso_url);
                case "RATELIMIT":
                    return this.fillLoginError(h.intl.formatMessage({
                        defaultMessage: "You’ve tried to log in too many times. Please try again in a few minutes."
                    }));
                case "ERROR":
                    var n = t.html_response ? new p.HTML(t.message) : t.message;
                    return _.Notify.error(n), this.loginController._clear_pending(!0);
                case "PASSWORD_EXPIRED":
                    return this.fillLoginError(h.intl.formatMessage({
                        defaultMessage: "The password of the account associated with this email has expired. Please login to this account and update its password before pairing."
                    }));
                case "EXPIRED":
                    return d.redirect(t.cont);
                default:
                    return _.Notify.error(h.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
            }
        }, t.prototype.twoFactorSuccess = function(e, t) {
            switch (t.status) {
                case "OK":
                    return this.$twoFactorSeckeyForm.find(".seckey-loading-status").toggle(), this.finishLogin(t);
                case "EXPIRED":
                case "INVALID_CREDENTIALS":
                case "REQUIRES_ROLE":
                    return this.switchFromTwoFactorToLoginError(t.message);
                case "ERROR":
                    return _.Notify.error(t.message);
                default:
                    return _.Notify.error(h.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
            }
        }, t.prototype.switchFromTwoFactorToLoginError = function(e) {
            this.twoFactorController._clear_pending(!0), this.loginController._clear_pending(!0), this.showLogin(), this.fillLoginError(e), this.setFocusToPassword()
        }, t.prototype.resendCodeSuccess = function(e) {
            switch (e) {
                case "OK":
                    return _.Notify.success(h.intl.formatMessage({
                        defaultMessage: "We sent you a code. It may take a few minutes to arrive."
                    }));
                case "RATELIMIT":
                    return this.fillTwoFactorError(h.intl.formatMessage({
                        defaultMessage: "You’ve tried to log in too many times. Please try again in a few minutes."
                    }));
                case "UNREACHABLE":
                    return this.fillTwoFactorError(h.intl.formatMessage({
                        defaultMessage: "We couldn’t reach your phone number. Are you sure it’s correct?"
                    }));
                case "EXPIRED":
                    return this.fillTwoFactorError(h.intl.formatMessage({
                        defaultMessage: "Sorry, your phone code has expired. Please log in again."
                    }));
                case "BADCARRIER":
                    return this.fillTwoFactorError(h.intl.formatMessage({
                        defaultMessage: "Unfortunately, your carrier isn’t supported at this time."
                    }));
                case "INVALIDNUMBER":
                    return this.fillTwoFactorError(h.intl.formatMessage({
                        defaultMessage: "That isn’t a valid phone number."
                    }));
                case "NOTAMOBILE":
                    return this.fillTwoFactorError(h.intl.formatMessage({
                        defaultMessage: "That phone number doesn’t appear to be a valid mobile number."
                    }));
                default:
                    return _.Notify.error(h.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
            }
        }, t.prototype.resendCode = function() {
            return i.WebRequest({
                url: "/twofactor_resend",
                data: {
                    backup: this.$twoFactorForm.find("input[name='backup']").val(),
                    mobile_push: this.$twoFactorForm.find("input[name='mobile_push']").val()
                },
                success: this.resendCodeSuccess.bind(this),
                error: function() {
                    return _.Notify.error(h.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                }
            }), !1
        }, t.prototype.usePhoneInstead = function() {
            return this.$twoFactorSeckeyForm.hide(), this.$twoFactorPhoneForm.show(), this.$twoFactorForm = this.$twoFactorPhoneForm, this.$twoFactorPhoneForm.hasClass("hide-authenticator") && this.resendCode(), this.setFocusToTwofactor(), !1
        }, t.prototype.retryU2fChallenge = function() {
            var e = this;
            return i.WebRequest({
                url: "/account/twofactor/u2f_start_authentication",
                success: function(t) {
                    e.$twoFactorSeckeyForm.find(".two-factor-seckey-instructions").toggle();
                    var r = e.parseU2fChallenge(t);
                    void 0 !== r && e.signU2fChallenge(r)
                },
                error: function() {
                    _.Notify.error(h.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                }
            }), !1
        }, t.prototype.parseU2fChallenge = function(e) {
            for (var t = JSON.parse(e), r = {}, o = 0, n = Object.keys(g.PROTOCOLS); o < n.length; o++) {
                var i = n[o];
                r[i] = t[i] && JSON.parse(t[i])
            }
            if (this.browserSupportsU2f(r)) return r
        }, t.prototype.signU2fChallenge = function(e) {
            var t = this;
            g.sign(e).catch((function(e) {
                return {
                    error: e.toString()
                }
            })).then((function(e) {
                t.$twoFactorSeckeyForm.find(".text-input-input").val(JSON.stringify(e)), t.$twoFactorSeckeyForm.submit()
            }))
        }, t.prototype.loginViaEmailStart = function() {
            var e = this;
            return a.default.clear_errors(this.$loginForm), i.WebRequest({
                url: "/ajax_login_via_email_start",
                data: {
                    login_email: this.$loginForm.find("input[name='login_email']").val(),
                    remember_me: this.isRememberMeChecked()
                },
                success: function() {
                    _.Notify.success(h.intl.formatMessage({
                        defaultMessage: "We emailed you a sign in link. Please check your inbox."
                    }))
                },
                error: function(t, r, o) {
                    return a.default.fill_errors(e.$loginForm, JSON.parse(o))
                }
            }), !1
        }, t.prototype.fillLoginError = function(e) {
            a.default.fill_errors(this.$loginForm, {
                login_email: {
                    message_text: e
                }
            })
        }, t.prototype.fillTwoFactorError = function(e) {
            a.default.fill_errors(this.$twoFactorForm, {
                code: {
                    message_text: e
                }
            })
        }, t.prototype.finishLogin = function(e) {
            var r = this.$loginForm.find("input[type='hidden'][name=refresh_token]").val(),
                o = this.$loginForm.find("input[type='hidden'][name=email_sig]").val();
            r && o && i.WebRequest({
                url: "/profile_services/link_google_service_with_user",
                subject_user: e.id,
                data: {
                    service: c.default.GOOGLE,
                    refresh_token: r,
                    email_sig: o
                }
            });
            var n = this.multiLogin ? t.MULTI_LOGIN_SUCCESS : t.LOGIN_SUCCESS;
            this.$loginForm.trigger(n, e);
            var s = S.getFedrampRedirectUrlIfApplicable(e.is_fedramp_user, this.cont);
            s && this.canRedirect && d.redirect(s)
        }, t.LOGIN_SUCCESS = "db:login:success", t.MULTI_LOGIN_SUCCESS = "db:multilogin:success", t
    })();
    t.default = v
})), define("modules/clean/security/util", ["require", "exports"], (function(e, t) {
    "use strict";

    function r(e) {
        return btoa(e).replace(/\//g, "_").replace(/\+/g, "-")
    }

    function o(e) {
        return String.fromCharCode.apply(null, new Uint8Array(e))
    }

    function n(e) {
        return new Uint8Array(Array.prototype.map.call(e, (function(e) {
            return e.charCodeAt(0)
        })))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.b64urlencode = function(e) {
        return r(o(e))
    }, t.b64urlencodeString = r, t.b64urldecode = function(e) {
        return n(atob(e.replace(/_/g, "/").replace(/-/g, "+")))
    }, t.bytesToString = o, t.stringToBytes = n, t.concatenateArrayBuffers = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var r = 0, o = 0, n = e; o < n.length; o++) {
            r += (u = n[o]).byteLength
        }
        for (var i = new Uint8Array(r), s = 0, a = 0, c = e; a < c.length; a++) {
            var u = c[a],
                l = new Uint8Array(u);
            i.set(l, s), s += u.byteLength
        }
        return i
    }, t.asNumber = function(e) {
        return "number" == typeof e ? e : e.toNumber()
    }
})), define("modules/clean/sso_login_checks", ["require", "exports", "tslib", "modules/clean/ajax"], (function(e, t, r, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importStar(o);
    var n = (function() {
        function e(e, t, r, o) {
            void 0 === o && (o = !0), this._trigger_check_sso_state = this._trigger_check_sso_state.bind(this), this.check_sso_state = this.check_sso_state.bind(this), this.$email_input = e, this.show_sso_fn = t, this.hide_sso_fn = r, this.should_trigger_check = o, this.should_trigger_check && (this._trigger_check_sso_state(), this.$email_input.on("input keyup change", this._trigger_check_sso_state))
        }
        return e.initClass = function() {
            this._sso_check_in_flight = {}, this._sso_check_cache = {}
        }, e.prototype._trigger_check_sso_state = function() {
            var e = this.$email_input.val();
            return this.check_sso_state(e)
        }, e.prototype.check_sso_state = function(t) {
            var r = this,
                n = t.trim();
            if (!n.match(/^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/)) return this.hide_sso_fn();
            var i = n.toLowerCase();
            return i in e._sso_check_cache ? this._handle_sso_state(e._sso_check_cache[i]) : e._sso_check_in_flight[i] ? void 0 : (e._sso_check_in_flight[i] = !0, o.WebRequest({
                url: "/sso_state",
                data: {
                    email: n
                },
                success: function(o) {
                    return o = JSON.parse(o), delete e._sso_check_in_flight[i], e._sso_check_cache[i] = o.user_sso_state, r.should_trigger_check && r.$email_input.val() !== t ? r._trigger_check_sso_state() : r._handle_sso_state(o.user_sso_state)
                },
                error: function() {
                    return delete e._sso_check_in_flight[i], r.hide_sso_fn()
                }
            }))
        }, e.prototype._handle_sso_state = function(e) {
            return "required" === e ? this.show_sso_fn(!1) : "optional" === e ? this.show_sso_fn(!0) : this.hide_sso_fn()
        }, e
    })();
    t.SsoLoginChecks = n, n.initClass()
})), define("modules/clean/web_register_logging_data", ["require", "exports", "tslib", "modules/core/browser", "modules/clean/query_string_helpers"], (function(e, t, r, o, n) {
    "use strict";

    function i() {
        return {
            signupUrl: o.get_href(),
            signupReferrer: document.referrer,
            trackingParams: n.getTrackingParamsAsJSON()
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importStar(o), t.getWebRegisterLoggingData = i, t.setWebRegisterLoggingData = function(e) {
        void 0 === e && (e = {});
        var t = i(),
            o = {
                signup_url: t.signupUrl,
                signup_referrer: t.signupReferrer,
                tracking_params: t.trackingParams
            };
        return r.__assign(r.__assign({}, e), o)
    }
})), define("modules/clean/react/fedramp/fedramp_util", ["require", "exports", "modules/core/uri"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getFedrampRedirectUrlIfApplicable = function(e, t) {
        return e ? String(new r.URI({
            path: "/fedramp_message"
        }).updateQuery({
            cont: t
        })) : t
    }
})), define("u2f-api", (function() {
    return (function(e) {
        var t = {};

        function r(o) {
            if (t[o]) return t[o].exports;
            var n = t[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return e[o].call(n.exports, n, n.exports, r), n.l = !0, n.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, o) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: o
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
            var o = Object.create(null);
            if (r.r(o), Object.defineProperty(o, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var n in e) r.d(o, n, function(t) {
                    return e[t]
                }.bind(null, n));
            return o
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
        "./u2f-api.js": function(e, t, r) {
            "use strict";
            var o, n = n || {};
            n.EXTENSION_ID = "kmendfapggjehodndflmmgagdbamhnfd", n.MessageTypes = {
                U2F_REGISTER_REQUEST: "u2f_register_request",
                U2F_REGISTER_RESPONSE: "u2f_register_response",
                U2F_SIGN_REQUEST: "u2f_sign_request",
                U2F_SIGN_RESPONSE: "u2f_sign_response",
                U2F_GET_API_VERSION_REQUEST: "u2f_get_api_version_request",
                U2F_GET_API_VERSION_RESPONSE: "u2f_get_api_version_response"
            }, n.ErrorCodes = {
                OK: 0,
                OTHER_ERROR: 1,
                BAD_REQUEST: 2,
                CONFIGURATION_UNSUPPORTED: 3,
                DEVICE_INELIGIBLE: 4,
                TIMEOUT: 5
            }, n.U2fRequest, n.U2fResponse, n.Error, n.Transport, n.Transports, n.SignRequest, n.SignResponse, n.RegisterRequest, n.RegisterResponse, n.RegisteredKey, n.GetJsApiVersionResponse, n.getMessagePort = function(e) {
                if ("undefined" != typeof chrome && chrome.runtime) {
                    var t = {
                        type: n.MessageTypes.U2F_SIGN_REQUEST,
                        signRequests: []
                    };
                    chrome.runtime.sendMessage(n.EXTENSION_ID, t, (function() {
                        chrome.runtime.lastError ? n.getIframePort_(e) : n.getChromeRuntimePort_(e)
                    }))
                } else n.isAndroidChrome_() ? n.getAuthenticatorPort_(e) : n.isIosChrome_() ? n.getIosPort_(e) : n.getIframePort_(e)
            }, n.isAndroidChrome_ = function() {
                var e = navigator.userAgent;
                return -1 != e.indexOf("Chrome") && -1 != e.indexOf("Android")
            }, n.isIosChrome_ = function() {
                return ["iPhone", "iPad", "iPod"].indexOf(navigator.platform) > -1
            }, n.getChromeRuntimePort_ = function(e) {
                var t = chrome.runtime.connect(n.EXTENSION_ID, {
                    includeTlsChannelId: !0
                });
                setTimeout((function() {
                    e(new n.WrappedChromeRuntimePort_(t))
                }), 0)
            }, n.getAuthenticatorPort_ = function(e) {
                setTimeout((function() {
                    e(new n.WrappedAuthenticatorPort_)
                }), 0)
            }, n.getIosPort_ = function(e) {
                setTimeout((function() {
                    e(new n.WrappedIosPort_)
                }), 0)
            }, n.WrappedChromeRuntimePort_ = function(e) {
                this.port_ = e
            }, n.formatSignRequest_ = function(e, t, r, i, s) {
                if (void 0 === o || o < 1.1) {
                    for (var a = [], c = 0; c < r.length; c++) a[c] = {
                        version: r[c].version,
                        challenge: t,
                        keyHandle: r[c].keyHandle,
                        appId: e
                    };
                    return {
                        type: n.MessageTypes.U2F_SIGN_REQUEST,
                        signRequests: a,
                        timeoutSeconds: i,
                        requestId: s
                    }
                }
                return {
                    type: n.MessageTypes.U2F_SIGN_REQUEST,
                    appId: e,
                    challenge: t,
                    registeredKeys: r,
                    timeoutSeconds: i,
                    requestId: s
                }
            }, n.formatRegisterRequest_ = function(e, t, r, i, s) {
                if (void 0 === o || o < 1.1) {
                    for (var a = 0; a < r.length; a++) r[a].appId = e;
                    var c = [];
                    for (a = 0; a < t.length; a++) c[a] = {
                        version: t[a].version,
                        challenge: r[0],
                        keyHandle: t[a].keyHandle,
                        appId: e
                    };
                    return {
                        type: n.MessageTypes.U2F_REGISTER_REQUEST,
                        signRequests: c,
                        registerRequests: r,
                        timeoutSeconds: i,
                        requestId: s
                    }
                }
                return {
                    type: n.MessageTypes.U2F_REGISTER_REQUEST,
                    appId: e,
                    registerRequests: r,
                    registeredKeys: t,
                    timeoutSeconds: i,
                    requestId: s
                }
            }, n.WrappedChromeRuntimePort_.prototype.postMessage = function(e) {
                this.port_.postMessage(e)
            }, n.WrappedChromeRuntimePort_.prototype.addEventListener = function(e, t) {
                var r = e.toLowerCase();
                "message" == r || "onmessage" == r ? this.port_.onMessage.addListener((function(e) {
                    t({
                        data: e
                    })
                })) : console.error("WrappedChromeRuntimePort only supports onMessage")
            }, n.WrappedAuthenticatorPort_ = function() {
                this.requestId_ = -1, this.requestObject_ = null
            }, n.WrappedAuthenticatorPort_.prototype.postMessage = function(e) {
                var t = n.WrappedAuthenticatorPort_.INTENT_URL_BASE_ + ";S.request=" + encodeURIComponent(JSON.stringify(e)) + ";end";
                document.location = t
            }, n.WrappedAuthenticatorPort_.prototype.getPortType = function() {
                return "WrappedAuthenticatorPort_"
            }, n.WrappedAuthenticatorPort_.prototype.addEventListener = function(e, t) {
                if ("message" == e.toLowerCase()) {
                    window.addEventListener("message", this.onRequestUpdate_.bind(this, t), !1)
                } else console.error("WrappedAuthenticatorPort only supports message")
            }, n.WrappedAuthenticatorPort_.prototype.onRequestUpdate_ = function(e, t) {
                var r = JSON.parse(t.data),
                    o = (r.intentURL, r.errorCode, null);
                r.hasOwnProperty("data") && (o = JSON.parse(r.data)), e({
                    data: o
                })
            }, n.WrappedAuthenticatorPort_.INTENT_URL_BASE_ = "intent:#Intent;action=com.google.android.apps.authenticator.AUTHENTICATE", n.WrappedIosPort_ = function() {}, n.WrappedIosPort_.prototype.postMessage = function(e) {
                var t = JSON.stringify(e),
                    r = "u2f://auth?" + encodeURI(t);
                location.replace(r)
            }, n.WrappedIosPort_.prototype.getPortType = function() {
                return "WrappedIosPort_"
            }, n.WrappedIosPort_.prototype.addEventListener = function(e, t) {
                "message" !== e.toLowerCase() && console.error("WrappedIosPort only supports message")
            }, n.getIframePort_ = function(e) {
                var t = "chrome-extension://" + n.EXTENSION_ID,
                    r = document.createElement("iframe");
                r.src = t + "/u2f-comms.html", r.setAttribute("style", "display:none"), document.body.appendChild(r);
                var o = new MessageChannel,
                    i = function(t) {
                        "ready" == t.data ? (o.port1.removeEventListener("message", i), e(o.port1)) : console.error('First event on iframe port was not "ready"')
                    };
                o.port1.addEventListener("message", i), o.port1.start(), r.addEventListener("load", (function() {
                    r.contentWindow.postMessage("init", t, [o.port2])
                }))
            }, n.EXTENSION_TIMEOUT_SEC = 30, n.port_ = null, n.waitingForPort_ = [], n.reqCounter_ = 0, n.callbackMap_ = {}, n.getPortSingleton_ = function(e) {
                n.port_ ? e(n.port_) : (0 == n.waitingForPort_.length && n.getMessagePort((function(e) {
                    for (n.port_ = e, n.port_.addEventListener("message", n.responseHandler_); n.waitingForPort_.length;) n.waitingForPort_.shift()(n.port_)
                })), n.waitingForPort_.push(e))
            }, n.responseHandler_ = function(e) {
                var t = e.data,
                    r = t.requestId;
                if (r && n.callbackMap_[r]) {
                    var o = n.callbackMap_[r];
                    delete n.callbackMap_[r], o(t.responseData)
                } else console.error("Unknown or missing requestId in response.")
            }, n.sign = function(e, t, r, i, s) {
                void 0 === o ? n.getApiVersion((function(a) {
                    o = void 0 === a.js_api_version ? 0 : a.js_api_version, console.log("Extension JS API Version: ", o), n.sendSignRequest(e, t, r, i, s)
                })) : n.sendSignRequest(e, t, r, i, s)
            }, n.sendSignRequest = function(e, t, r, o, i) {
                n.getPortSingleton_((function(s) {
                    var a = ++n.reqCounter_;
                    n.callbackMap_[a] = o;
                    var c = void 0 !== i ? i : n.EXTENSION_TIMEOUT_SEC,
                        u = n.formatSignRequest_(e, t, r, c, a);
                    s.postMessage(u)
                }))
            }, n.register = function(e, t, r, i, s) {
                void 0 === o ? n.getApiVersion((function(a) {
                    o = void 0 === a.js_api_version ? 0 : a.js_api_version, console.log("Extension JS API Version: ", o), n.sendRegisterRequest(e, t, r, i, s)
                })) : n.sendRegisterRequest(e, t, r, i, s)
            }, n.sendRegisterRequest = function(e, t, r, o, i) {
                n.getPortSingleton_((function(s) {
                    var a = ++n.reqCounter_;
                    n.callbackMap_[a] = o;
                    var c = void 0 !== i ? i : n.EXTENSION_TIMEOUT_SEC,
                        u = n.formatRegisterRequest_(e, r, t, c, a);
                    s.postMessage(u)
                }))
            }, n.getApiVersion = function(e, t) {
                n.getPortSingleton_((function(r) {
                    if (r.getPortType) {
                        var o;
                        switch (r.getPortType()) {
                            case "WrappedIosPort_":
                            case "WrappedAuthenticatorPort_":
                                o = 1.1;
                                break;
                            default:
                                o = 0
                        }
                        e({
                            js_api_version: o
                        })
                    } else {
                        var i = ++n.reqCounter_;
                        n.callbackMap_[i] = e;
                        var s = {
                            type: n.MessageTypes.U2F_GET_API_VERSION_REQUEST,
                            timeoutSeconds: void 0 !== t ? t : n.EXTENSION_TIMEOUT_SEC,
                            requestId: i
                        };
                        r.postMessage(s)
                    }
                }))
            }, e.exports = n
        },
        0: function(e, t, r) {
            e.exports = r("./u2f-api.js")
        }
    })
}));
//# sourceMappingURL=pkg-login-pages-externals.min.js-vflxdymFY.map