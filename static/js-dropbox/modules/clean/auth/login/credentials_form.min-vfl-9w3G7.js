define(["require", "exports", "tslib", "classnames", "react", "modules/core/browser_detection", "modules/core/i18n", "modules/clean/auth/common/inputs/checkbox", "modules/clean/auth/common/inputs/text", "modules/clean/auth/common/types", "modules/clean/auth/common/recaptcha", "modules/clean/auth/login/login_error", "modules/clean/auth/login/google_login_button", "modules/clean/auth/login/apple_login_button", "modules/clean/auth/login/types", "modules/clean/react/image", "modules/clean/react/sprite_div", "modules/clean/static_urls", "modules/clean/react/file_viewer/conversions/conversion_utils"], (function(e, t, s, a, o, r, l, i, n, p, d, m, u, c, h, g, f, b, S) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), a = s.__importDefault(a), o = s.__importDefault(o), f = s.__importDefault(f);
    var E = function(e) {
            var t = "/forgot",
                s = e.target;
            return e.appendEmail && (t = "/forgot?email_from_login=" + e.email, s = void 0), o.default.createElement("a", {
                className: "forgot-password-link",
                href: t,
                target: s
            }, e.text || l.intl.formatMessage({
                defaultMessage: "Forgot your password?"
            }))
        },
        C = function(e) {
            return o.default.createElement("div", {
                id: "navisite"
            }, o.default.createElement("br", null), o.default.createElement("a", {
                href: "/navi_redirect/login",
                target: e.openLinkInNewTab ? "_blank" : void 0
            }, l.intl.formatMessage({
                defaultMessage: "Dropbox NAVI"
            })))
        },
        M = function(e) {
            return o.default.createElement("div", {
                className: "sso-optout"
            }, l.intl.formatMessage({
                defaultMessage: "or"
            }), " ", o.default.createElement("a", {
                href: "#",
                onClick: e.onClick
            }, l.intl.formatMessage({
                defaultMessage: "Log in with Dropbox credentials"
            })))
        },
        _ = function() {
            return o.default.createElement("span", {
                className: "login-loading-indicator ajax-loading"
            }, o.default.createElement(g.Image, {
                src: b.static_url("/static/images/icons/ajax-loading-small-vfl3Wt7C_.gif"),
                srcHiRes: b.static_url("/static/images/icons/ajax-loading-small@2x-vflAxdZTP.gif")
            }))
        },
        v = function() {
            return o.default.createElement("div", {
                className: "sso-description"
            }, o.default.createElement(f.default, {
                group: "web",
                name: "lock",
                text: l.intl.formatMessage({
                    defaultMessage: "Single sign-on enabled"
                })
            }))
        },
        w = function(e) {
            return o.default.createElement("div", {
                className: "credentials-form__fields"
            }, o.default.createElement(n.AuthTextField, {
                value: e.emailValue,
                className: a.default("login-text-input", "login-email", e.emailProps.className),
                onChange: e.onInputChange,
                disabled: e.disabled || e.emailProps.readonly || !1,
                label: e.emailProps.label || (e.maestroStyle ? l.intl.formatMessage({
                    defaultMessage: "Email"
                }) : void 0),
                placeholder: e.emailProps.placeholder || (e.maestroStyle ? l.intl.formatMessage({
                    defaultMessage: "you@mail.com"
                }) : l.intl.formatMessage({
                    defaultMessage: "Email"
                })),
                error: e.emailError,
                maestroStyle: e.maestroStyle,
                name: "login_email",
                type: p.AuthTextInputType.EMAIL,
                variant: e.variant
            }), e.ssoState === h.SsoState.OFF && o.default.createElement(n.AuthTextField, {
                value: e.passwordValue,
                placeholder: e.passwordProps.placeholder || (e.maestroStyle ? l.intl.formatMessage({
                    defaultMessage: "Minimum 6 characters"
                }) : l.intl.formatMessage({
                    defaultMessage: "Password"
                })),
                name: "login_password",
                className: a.default("login-text-input", "login-password", e.passwordProps.className),
                error: e.passwordError,
                inputClassName: "password-input",
                onChange: e.onInputChange,
                measureStrength: !1,
                label: e.passwordProps.label || (e.maestroStyle ? l.intl.formatMessage({
                    defaultMessage: "Password"
                }) : void 0),
                maestroStyle: e.maestroStyle,
                disabled: e.disabled,
                variant: e.variant,
                type: p.AuthTextInputType.PASSWORD
            }))
        },
        P = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.setCaptchaComponent = function(e) {
                    t.captchaComponent = e
                }, t.getRecaptchaResponses = function() {
                    return t.props.supportsCaptcha ? d.get_recaptcha_responses(t.captchaComponent) : {}
                }, t.handleRecaptchaErrors = function(e) {
                    return !!t.props.supportsCaptcha && d.handle_recaptcha_errors(t.captchaComponent, e)
                }, t.submitRecaptcha = function() {
                    t.props.supportsCaptcha ? t.captchaComponent.getWrappedComponent().submit() : t.props.onSubmit()
                }, t
            }
            return s.__extends(t, e), t.prototype.render = function() {
                var e = this.props.rememberMeProps || {},
                    t = this.props.googleLoginProps,
                    s = this.props.appleLoginProps,
                    n = a.default({
                        clearfix: !this.props.hideRememberMe || !this.props.hideHelp && r.is_supported_mobile_browser()
                    }),
                    g = this.props.openLinksInNewTab ? "_blank" : void 0,
                    f = a.default("clearfix", "credentials-form", "login-form", {
                        "sso-required": this.props.ssoState !== h.SsoState.OFF,
                        "sso-optional": this.props.ssoState === h.SsoState.OPTIONAL
                    }),
                    b = t && t.positionBelow,
                    P = t && !t.positionBelow,
                    N = s && s.positionBelow,
                    x = s && !s.positionBelow,
                    y = b || N,
                    L = P || x,
                    k = t ? o.default.createElement(u.GoogleLoginButton, {
                        buttonProps: t.buttonProps,
                        disabled: this.props.isSubmitting,
                        error: this.props.googleLoginError,
                        onClick: this.props.onGoogleLoginClick
                    }) : null,
                    F = s ? o.default.createElement(c.AppleLoginButton, {
                        buttonProps: s.buttonProps,
                        disabled: this.props.isSubmitting,
                        error: this.props.appleLoginError,
                        onClick: this.props.onAppleLoginClick
                    }) : null,
                    I = this.props.hideHelp || this.props.ssoState === h.SsoState.REQUIRED ? null : o.default.createElement(E, {
                        email: this.props.emailValue,
                        target: g,
                        appendEmail: void 0 === this.props.forgotPasswordProps.appendEmail || this.props.forgotPasswordProps.appendEmail,
                        text: this.props.forgotPasswordProps.text
                    }),
                    A = o.default.createElement("button", {
                        className: a.default("login-button", "signin-button", "button-primary", this.props.loginButtonProps.className),
                        type: "submit",
                        disabled: this.props.disabled || this.props.isSubmitting || this.props.loginButtonProps.disabled
                    }, this.props.ssoState === h.SsoState.OFF && o.default.createElement("div", {
                        className: "signin-text"
                    }, this.props.loginButtonProps.text || l.intl.formatMessage({
                        defaultMessage: "Sign in"
                    })), this.props.ssoState !== h.SsoState.OFF && o.default.createElement("div", {
                        className: "sso-text"
                    }, l.intl.formatMessage({
                        defaultMessage: "Continue"
                    }))),
                    O = o.default.createElement("div", {
                        className: "hr-label"
                    }, o.default.createElement("span", {
                        className: "hr-label__text"
                    }, l.intl.formatMessage({
                        defaultMessage: "or"
                    }))),
                    R = this.props.variant === p.AuthFormVariant.PAPER_COMPACT;
                return o.default.createElement("div", {
                    className: "login-form-container--subcontainer"
                }, P && k, x && F, L && !this.props.hideCredentialFields && O, o.default.createElement("form", {
                    className: f,
                    onSubmit: this.props.onLoginClick,
                    method: "POST"
                }, !this.props.hideCredentialFields && o.default.createElement(w, {
                    disabled: this.props.disabled,
                    emailError: this.props.emailError,
                    emailProps: this.props.emailProps,
                    emailValue: this.props.emailValue,
                    maestroStyle: this.props.maestroStyle,
                    onInputChange: this.props.onInputChange,
                    passwordError: this.props.passwordError,
                    passwordProps: this.props.passwordProps,
                    passwordValue: this.props.passwordValue,
                    ssoState: this.props.ssoState,
                    variant: this.props.variant
                }), this.props.loginError && o.default.createElement(m.LoginError, {
                    message: this.props.loginError
                }), this.props.supportsCaptcha && !S.shouldShowSimplifiedModal() && o.default.createElement(d.Recaptcha, {
                    ref: this.setCaptchaComponent,
                    email: this.props.emailValue,
                    onSubmit: this.props.onSubmit,
                    source: "LOGIN"
                }), o.default.createElement("div", {
                    className: n
                }, this.props.ssoState !== h.SsoState.OFF && o.default.createElement(v, null), !this.props.hideRememberMe && o.default.createElement(i.AuthCheckbox, {
                    checked: this.props.rememberMeValue,
                    className: "remember-me",
                    disabled: e.disabled || this.props.disabled,
                    inline: void 0 === e.inline || e.inline,
                    label: e.label || l.intl.formatMessage({
                        defaultMessage: "Remember me"
                    }),
                    maestroStyle: this.props.maestroStyle,
                    name: "remember_me",
                    onChange: this.props.onInputChange,
                    variant: this.props.variant
                }), (R || S.shouldShowSimplifiedModal()) && I, !R && !this.props.hideCredentialFields && A, this.props.isSubmitting && o.default.createElement(_, null), this.props.ssoState === h.SsoState.OPTIONAL && o.default.createElement(M, {
                    onClick: this.props.onSsoChangeClick
                }), !y && !R && o.default.createElement("div", {
                    className: "login-need-help"
                }, I), this.props.showNaviSiteLogin && o.default.createElement(C, {
                    openLinkInNewTab: this.props.openLinksInNewTab
                }), R && A)), y && !this.props.hideCredentialFields && !S.shouldShowSimplifiedModal() && O, b && k, N && F, y && !R && !S.shouldShowSimplifiedModal() && o.default.createElement("div", {
                    className: "login-need-help"
                }, I), this.props.supportsCaptcha && S.shouldShowSimplifiedModal() && o.default.createElement(d.Recaptcha, {
                    ref: this.setCaptchaComponent,
                    email: this.props.emailValue,
                    onSubmit: this.props.onSubmit,
                    source: "LOGIN"
                }))
            }, t
        })(o.default.Component);
    t.LoginCredentialsForm = P
}));
//# sourceMappingURL=credentials_form.min.js-vflfDc7fw.map