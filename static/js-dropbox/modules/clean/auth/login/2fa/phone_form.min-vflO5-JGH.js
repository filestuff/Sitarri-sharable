define(["require", "exports", "tslib", "classnames", "react", "modules/core/i18n", "modules/clean/auth/common/inputs/text", "modules/clean/auth/common/types", "modules/clean/auth/common/utils", "modules/clean/auth/login/2fa/trust_checkbox"], (function(e, t, a, n, o, l, i, s, r, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = a.__importDefault(n), o = a.__importDefault(o), t.Phone2FAForm = function(e) {
        var t = o.default.createElement("button", {
            className: n.default("mc-button mc-button-primary", {
                "inline-submit": e.inlineSubmit,
                "login-button": !e.inlineSubmit
            }),
            type: "submit"
        }, l.intl.formatMessage({
            defaultMessage: "Enter"
        }));
        return o.default.createElement("form", {
            className: "two-factor-form clearfix 2fa-phone-form",
            onSubmit: e.onSubmit
        }, o.default.createElement("div", {
            className: "login-info two-factor-uses-sms"
        }, l.intl.formatMessage({
            defaultMessage: "We sent a code to your phone number ending in <span>{last_two_digits}</span>."
        }, {
            span: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return o.default.createElement("span", {
                    className: "last-two-digits"
                }, e)
            },
            last_two_digits: e.lastTwoDigits
        })), o.default.createElement("div", {
            className: n.default({
                "inline-input-submit-pair": e.inlineSubmit,
                "backup-verification-code-form": e.inlineSubmit
            })
        }, o.default.createElement(i.AuthTextField, {
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
        }), e.inlineSubmit && t), !e.hideTrustCheckbox && o.default.createElement(u.TwoFactorTrustCheckbox, {
            checked: e.trusted,
            maestroStyle: e.maestroStyle,
            onChange: e.onInputChange,
            tooltipPosition: e.trustTooltipPosition,
            variant: e.variant
        }), !e.inlineSubmit && t, !e.hideHelp && o.default.createElement("div", {
            className: "two-factor-need-help"
        }, o.default.createElement("a", {
            href: "#",
            onClick: e.onResendCodeClick,
            className: "resend-two-factor-code two-factor-uses-sms"
        }, l.intl.formatMessage({
            defaultMessage: "Resend code"
        })), o.default.createElement("a", {
            href: r.twoFactorRecoveryUrl(e.rememberMe, e.continuationUrl),
            className: "twofactor_recovery_url"
        }, l.intl.formatMessage({
            defaultMessage: "Having trouble getting a code?"
        }))))
    }
}));
//# sourceMappingURL=phone_form.min.js-vflwN5dsL.map