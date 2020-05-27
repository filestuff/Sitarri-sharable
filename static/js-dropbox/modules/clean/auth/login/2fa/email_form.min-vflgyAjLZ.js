define(["require", "exports", "tslib", "classnames", "react", "modules/core/i18n", "modules/clean/auth/common/inputs/text", "modules/clean/auth/common/types"], (function(e, t, a, n, i, l, o, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = a.__importDefault(n), i = a.__importDefault(i), t.Email2FAForm = function(e) {
        var t = i.default.createElement("button", {
            className: n.default("mc-button mc-button-primary", {
                "inline-submit": e.inlineSubmit,
                "login-button": !e.inlineSubmit
            }),
            type: "submit"
        }, l.intl.formatMessage({
            defaultMessage: "Enter"
        }));
        return i.default.createElement("form", {
            className: "two-factor-form clearfix 2fa-email-form",
            onSubmit: e.onSubmit
        }, i.default.createElement("div", {
            className: "login-info two-factor-uses-email"
        }, l.intl.formatMessage({
            defaultMessage: "We sent a code to {email} and any devices you’ve linked to this account. Enter the code to continue."
        }, {
            span: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return i.default.createElement("span", {
                    className: "tfa-email"
                }, e)
            },
            email: e.email
        })), i.default.createElement("div", {
            className: n.default({
                "inline-input-submit-pair": e.inlineSubmit,
                "backup-verification-code-form": e.inlineSubmit
            })
        }, i.default.createElement(o.AuthTextField, {
            className: "login-text-input inline-input",
            disabled: !1,
            error: e.error,
            maestroStyle: e.maestroStyle,
            name: "code",
            onChange: e.onInputChange,
            value: e.value,
            placeholder: l.intl.formatMessage({
                defaultMessage: "6-digit code"
            }),
            type: s.AuthTextInputType.TEXT,
            variant: e.variant,
            autoFocus: !0,
            autoComplete: !1
        }), e.inlineSubmit && t), !e.inlineSubmit && t, i.default.createElement("div", {
            className: "two-factor-need-help"
        }, i.default.createElement("a", {
            href: "#",
            onClick: e.onResendCodeClick,
            className: "resend-two-factor-code two-factor-uses-sms"
        }, l.intl.formatMessage({
            defaultMessage: "Resend code"
        }))))
    }
}));
//# sourceMappingURL=email_form.min.js-vflTWioWO.map