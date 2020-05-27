define(["require", "exports", "tslib", "classnames", "react", "modules/core/i18n", "modules/clean/auth/common/inputs/checkbox", "modules/clean/auth/common/inputs/text", "modules/clean/auth/common/recaptcha", "modules/clean/auth/common/types", "modules/clean/auth/register/google_register_button", "modules/clean/auth/register/name_fields", "modules/clean/react/file_viewer/conversions/conversion_utils"], (function(e, t, a, s, r, o, n, l, i, p, m, u, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), s = a.__importDefault(s);
    var c = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.setCaptchaComponent = function(e) {
                t.captchaComponent = e
            }, t
        }
        return a.__extends(t, e), t.prototype.handleRecaptchaErrors = function(e) {
            return i.handle_recaptcha_errors(this.captchaComponent, e)
        }, t.prototype.getRecaptchaComponent = function() {
            return this.captchaComponent
        }, t.prototype.getRecaptchaResponses = function() {
            return i.get_recaptcha_responses(this.captchaComponent)
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                a = e.variant,
                c = e.thirdPartyInitiatedSignup,
                h = e.tosCheckboxProps,
                f = e.onGoogleRegisterClick,
                g = e.disabled,
                b = e.isSubmitting,
                M = e.maestroStyle,
                _ = e.onInputChange,
                S = e.showMarketingOptIn,
                v = e.marketingOptInChecked,
                E = s.default("form_shown", "login-form-container", "register", t, a, {
                    third_party_auth: c
                }),
                C = h || {},
                y = void 0;
            C.unsafeLabelHTML || (y = o.intl.formatMessage({
                defaultMessage: "I agree to the <a>Dropbox Terms</a>"
            }, {
                a: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return r.default.createElement("a", {
                        href: "/terms",
                        target: "_blank",
                        rel: "noreferrer noopener"
                    }, e)
                }
            }));
            var P = this.props.submitButtonProps || {},
                k = s.default("login-button", "button-primary", P.className, {
                    "button-small": P.variant === p.AuthButtonVariant.SMALL,
                    "button-big": P.variant === p.AuthButtonVariant.BIG
                }),
                x = this.props.thirdPartyInitiatedSignup,
                N = !!this.props.googleRegisterProps && !x,
                R = this.props.googleRegisterProps || {},
                w = r.default.createElement(m.GoogleRegisterButton, {
                    onClick: f,
                    disabled: g || b,
                    variant: R.variant,
                    buttonProps: R.buttonProps
                }),
                I = r.default.createElement("div", {
                    className: "hr-label"
                }, r.default.createElement("span", {
                    className: "hr-label__text"
                }, o.intl.formatMessage({
                    defaultMessage: "or"
                }))),
                T = this.props.emailProps || {},
                A = s.default("input-email", "text-input__margin-right", T.className),
                V = this.props.passwordProps || {},
                L = s.default("input-password", V.className),
                O = this.props.maestroStyle;
            "TOP" === R.position ? O = !0 : "BOTTOM" === R.position && (O = !1);
            var B = C.variant || a,
                D = void 0 === C.inline || C.inline,
                F = x ? o.intl.formatMessage({
                    defaultMessage: "Create and continue"
                }) : P.text || o.intl.formatMessage({
                    defaultMessage: "Create an account"
                });
            return r.default.createElement("div", {
                className: E
            }, r.default.createElement("form", {
                className: "clearfix credentials-form register-form",
                onSubmit: this.props.onClickSignUp,
                method: "post"
            }, O && N && w, O && N && I, r.default.createElement("div", {
                className: "credentials-form__fields"
            }, r.default.createElement(u.RegisterFormNameFields, {
                maestroStyle: M,
                onInputChange: _,
                combinedName: this.props.combinedName,
                fnameError: this.props.fnameError,
                fnameProps: this.props.fnameProps,
                lnameProps: this.props.lnameProps,
                fnameValue: this.props.fnameValue,
                lnameValue: this.props.lnameValue,
                disabled: g,
                variant: a
            }), r.default.createElement("div", {
                className: "register-form__credential-fields"
            }, r.default.createElement(l.AuthTextField, {
                value: this.props.emailValue,
                className: A,
                onChange: _,
                disabled: g || T.readonly || !1,
                label: T.label || (M ? o.intl.formatMessage({
                    defaultMessage: "Email"
                }) : void 0),
                placeholder: T.placeholder || (this.props.maestroStyle ? o.intl.formatMessage({
                    defaultMessage: "you@mail.com"
                }) : o.intl.formatMessage({
                    defaultMessage: "Email"
                })),
                error: this.props.emailError,
                maestroStyle: M,
                name: "email",
                type: p.AuthTextInputType.EMAIL,
                variant: a
            }), !this.props.thirdPartyInitiatedSignup && r.default.createElement(l.AuthTextField, {
                value: this.props.passwordValue,
                placeholder: V.placeholder || (this.props.maestroStyle ? o.intl.formatMessage({
                    defaultMessage: "Minimum 6 characters"
                }) : o.intl.formatMessage({
                    defaultMessage: "Password"
                })),
                name: "password",
                className: L,
                inputClassName: "password-input",
                onChange: _,
                measureStrength: V.measureStrength,
                label: V.label || (M ? o.intl.formatMessage({
                    defaultMessage: "Password"
                }) : void 0),
                error: this.props.passwordError,
                maestroStyle: M,
                disabled: g,
                variant: a,
                passwordStrengthProps: V.strengthMeterProps,
                type: p.AuthTextInputType.PASSWORD
            }))), !d.shouldShowSimplifiedModal() && r.default.createElement(i.Recaptcha, {
                ref: this.setCaptchaComponent,
                email: this.props.emailValue,
                onSubmit: this.props.onSubmit,
                source: "REGISTER"
            }), r.default.createElement(n.AuthCheckbox, {
                variant: B,
                className: "agree",
                disabled: C.disabled || g,
                maestroStyle: M,
                error: this.props.tosError,
                inline: D,
                onChange: _,
                name: "tos_agree",
                checked: this.props.tosChecked,
                label: C.label || y,
                unsafeLabelHTML: C.unsafeLabelHTML
            }), S && r.default.createElement(n.AuthCheckbox, {
                variant: B,
                className: "agree marketing-opt-in-checkbox",
                disabled: g,
                maestroStyle: M,
                inline: D,
                onChange: _,
                checked: v,
                name: "marketing_opt_in",
                label: o.intl.formatMessage({
                    defaultMessage: "I’d like to receive direct marketing email updates from Dropbox"
                })
            }), r.default.createElement("button", {
                className: k,
                type: "submit",
                "data-uxa-log": "register_form_submit_button",
                disabled: this.props.disabled || P.disabled || this.props.isSubmitting
            }, r.default.createElement("span", null, F)), !O && N && !d.shouldShowSimplifiedModal() && I, !O && N && w, d.shouldShowSimplifiedModal() && r.default.createElement(i.Recaptcha, {
                ref: this.setCaptchaComponent,
                email: this.props.emailValue,
                onSubmit: this.props.onSubmit,
                source: "REGISTER"
            })))
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.RegisterFormView = c
}));
//# sourceMappingURL=view.min.js-vflxxvwfF.map