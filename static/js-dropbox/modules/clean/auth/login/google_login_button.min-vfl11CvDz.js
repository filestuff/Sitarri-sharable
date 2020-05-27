define(["require", "exports", "tslib", "react", "classnames", "modules/core/i18n", "modules/clean/auth/login/login_error"], (function(e, t, o, a, l, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), a = o.__importDefault(a), l = o.__importDefault(l), t.GoogleLoginButton = function(e) {
        var t = e.buttonProps || {},
            o = l.default("auth-google", "button-primary", t.className),
            i = t.text || r.intl.formatMessage({
                defaultMessage: "Sign in with Google"
            });
        return a.default.createElement("div", {
            className: "login-form-container__google-div"
        }, a.default.createElement("button", {
            className: o,
            onClick: e.onClick,
            type: "button",
            disabled: e.disabled || t.disabled,
            "data-uxa-log": "google_login_start"
        }, a.default.createElement("div", {
            className: "sign-in-text"
        }, i)), e.error && a.default.createElement(n.LoginError, {
            className: "google-login-error",
            message: e.error
        }))
    }
}));
//# sourceMappingURL=google_login_button.min.js-vfln1_J_8.map