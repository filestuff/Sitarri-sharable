define(["require", "exports", "tslib", "modules/clean/analytics", "modules/core/browser", "modules/clean/auth/login/types"], (function(e, o, i, s, n, r) {
    "use strict";

    function g(e) {
        return {
            url: n.get_href(),
            status: e.status ? e.status : void 0
        }
    }

    function t(e) {
        return {
            url: n.get_href(),
            remember_me: e.remember_me ? e.remember_me.toString() : void 0,
            pair_user: e.pair_user ? e.pair_user.toString() : void 0,
            err_msg: e.err_msg ? e.err_msg : void 0
        }
    }

    function l(e, o) {
        s.UXAnalyticsLogger.log(e, o)
    }
    Object.defineProperty(o, "__esModule", {
        value: !0
    }), n = i.__importStar(n), o.AuthUXAnalyticsLogger = {
        logSignupModalShown: function(e) {
            l("signup_modal_shown", {
                url: n.get_href(),
                kind: e
            })
        },
        logLoginModalShown: function(e) {
            l("login_modal_shown", {
                url: n.get_href(),
                kind: e
            })
        },
        logSignupModalDismissed: function(e) {
            l("signup_modal_dismissed", {
                url: n.get_href(),
                kind: e
            })
        },
        logLoginModalDismissed: function(e) {
            l("login_modal_dismissed", {
                url: n.get_href(),
                kind: e
            })
        }
    }, o.EmailAuthUXAnalyticsLogger = {
        logLoginStart: function() {
            l("email_login_start", {
                url: n.get_href()
            })
        },
        logLoginResponse: function(e) {
            switch (e.status) {
                case r.LoginResponseStatus.OK:
                    l("email_login_succeeded", g(e));
                    break;
                case r.LoginResponseStatus.TWOFACTOR:
                    l("email_login_requires_two_factor", g(e));
                    break;
                case r.LoginResponseStatus.TWOFACTOR_REQUIRED:
                case r.LoginResponseStatus.TOS_SIGNATURE_REQUIRED:
                case r.LoginResponseStatus.EXPIRED:
                case r.LoginResponseStatus.SSO:
                    l("email_login_redirect", g(e));
                    break;
                default:
                    l("email_login_failed", g(e))
            }
        },
        logLoginError: function() {
            l("email_login_failed", {
                url: n.get_href()
            })
        },
        logSignupStart: function() {
            l("email_signup_start", {
                url: n.get_href()
            })
        },
        logSignupResponse: function() {
            l("email_signup_succeeded", {
                url: n.get_href()
            })
        },
        logSignupError: function() {
            l("email_signup_failed", {
                url: n.get_href()
            })
        }
    }, o.GoogleUXAnalyticsLogger = {
        logLoginStart: function() {
            l("google_login_start", {
                url: n.get_href()
            })
        },
        logLoginResponse: function(e) {
            e.success ? l("google_login_succeeded", t(e)) : "tfa_required" === e.err_msg ? l("google_login_requires_two_factor", t(e)) : l("google_login_failed", t(e))
        },
        logSignupStart: function() {
            l("google_signup_start", {
                url: n.get_href()
            })
        },
        logSignupResponse: function(e) {
            e.success ? l("google_signup_succeeded", t(e)) : l("google_signup_failed", t(e))
        }
    }, o.AppleUXAnalyticsLogger = {
        logLoginStart: function() {
            l("sia_login_start", {
                url: n.get_href()
            })
        },
        logLoginResponse: function(e) {
            e.success ? l("sia_login_succeeded", t(e)) : "tfa_required" === e.err_msg ? l("sia_login_requires_two_factor", t(e)) : "requires_password_on_first_link" === e.err_msg ? l("sia_login_requires_password", t(e)) : l("sia_login_failed", t(e))
        }
    }
}));
//# sourceMappingURL=stats.min.js-vflpgtS5k.map