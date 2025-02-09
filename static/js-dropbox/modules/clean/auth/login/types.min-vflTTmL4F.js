define(["require", "exports"], (function(E, R) {
    "use strict";
    Object.defineProperty(R, "__esModule", {
        value: !0
    }), (function(E) {
        E.ROLE_WORK = "work", E.ROLE_PERSONAL = "personal", E.ROLE_PHOTOS = "photos", E.ROLE_BOTH = "both"
    })(R.LoginRole || (R.LoginRole = {})), (function(E) {
        E[E.EMAIL = 0] = "EMAIL", E[E.SMS = 1] = "SMS", E[E.AUTHENTICATOR = 2] = "AUTHENTICATOR", E[E.SEC_KEY = 3] = "SEC_KEY"
    })(R.TwoFactorType || (R.TwoFactorType = {})), (function(E) {
        E[E.LOADING = 0] = "LOADING", E[E.FOUND = 1] = "FOUND", E[E.NOT_FOUND = 2] = "NOT_FOUND"
    })(R.SecurityKeyState || (R.SecurityKeyState = {})), (function(E) {
        E.OFF = "off", E.OPTIONAL = "optional", E.REQUIRED = "required"
    })(R.SsoState || (R.SsoState = {})), (function(E) {
        E.DEVICE_LIMIT = "DEVICE_LIMIT", E.OK = "OK", E.SSO = "SSO", E.TWOFACTOR = "TWOFACTOR", E.TWOFACTOR_REQUIRED = "TWOFACTOR_REQUIRED", E.RATELIMIT = "RATELIMIT", E.PASSWORD_EXPIRED = "PASSWORD_EXPIRED", E.EXPIRED = "EXPIRED", E.ERROR = "ERROR", E.REQUIRES_ROLE = "REQUIRES_ROLE", E.INVALID_CREDENTIALS = "INVALID_CREDENTIALS", E.PASSWORD_DECRYPTION_ERROR = "PASSWORD_DECRYPTION_ERROR", E.TOS_SIGNATURE_REQUIRED = "TOS_SIGNATURE_REQUIRED"
    })(R.LoginResponseStatus || (R.LoginResponseStatus = {})), (function(E) {
        E.OK = "OK", E.RATELIMIT = "RATELIMIT", E.UNREACHABLE = "UNREACHABLE", E.EXPIRED = "EXPIRED", E.BADCARRIER = "BADCARRIER", E.INVALIDNUMBER = "BADCARRIER", E.NOTAMOBILE = "BADCARRIER"
    })(R.TwoFactorResendResponse || (R.TwoFactorResendResponse = {})), (function(E) {
        E.LOGIN_CLICK = "LOGIN_CLICK", E.LOGIN_IMMEDIATE_SUCCESS = "LOGIN_IMMEDIATE_SUCCESS", E.GOOGLE_LOGIN_CLICK = "GOOGLE_LOGIN_CLICK", E.GOOGLE_LOGIN_SUCCESS = "GOOGLE_LOGIN_SUCCESS", E.APPLE_LOGIN_CLICK = "APPLE_LOGIN_CLICK", E.APPLE_LOGIN_SUCCESS = "APPLE_LOGIN_SUCCESS"
    })(R.LoginFormEvent || (R.LoginFormEvent = {}))
}));
//# sourceMappingURL=types.min.js-vflh_dboJ.map