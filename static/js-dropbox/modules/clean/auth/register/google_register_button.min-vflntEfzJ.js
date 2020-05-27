define(["require", "exports", "tslib", "classnames", "react", "modules/core/i18n", "modules/clean/auth/common/utils"], (function(e, t, a, o, n, r, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = a.__importDefault(o), n = a.__importDefault(n);
    t.GoogleRegisterButton = function(e) {
        var t, a = e.buttonProps || {},
            l = s.isGoogleGrowthExperimentOn(e.variant || ""),
            i = o.default("auth-google", "button-primary", a.className, ((t = {
                "exp-growth_web_google_register": l
            })["button-" + a.variant] = "standard" !== a.variant, t["exp-growth_web_google_register__" + e.variant] = l, t)),
            u = a.text || (function(e) {
                return e ? r.intl.formatMessage({
                    defaultMessage: "Sign up free with Google"
                }) : r.intl.formatMessage({
                    defaultMessage: "Sign up with Google"
                })
            })(l);
        return n.default.createElement("button", {
            className: i,
            type: "button",
            onClick: e.onClick,
            disabled: e.disabled || a.disabled,
            "data-uxa-log": "google_signup_start"
        }, n.default.createElement("span", {
            className: "sign-up-text"
        }, u))
    }
}));
//# sourceMappingURL=google_register_button.min.js-vflexfIFq.map