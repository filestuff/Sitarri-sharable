define(["require", "exports", "tslib", "modules/clean/auth/login/api", "modules/clean/auth/login/types"], (function(t, e, s, a, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), a = s.__importStar(a);
    var i = /^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/,
        n = function() {
            var t = this;
            this.shouldCheckSsoState = function(t) {
                return t.match(i)
            }, this.checkSsoState = function(e, s) {
                t.shouldCheckSsoState(e) ? t.CACHE[e] ? s(e, t.CACHE[e]) : t.INFLIGHT[e] || (t.INFLIGHT[e] = !0, a.checkSsoState(e).then((function(a) {
                    switch (a.user_sso_state) {
                        case "optional":
                            t.CACHE[e] = o.SsoState.OPTIONAL;
                            break;
                        case "required":
                            t.CACHE[e] = o.SsoState.REQUIRED;
                            break;
                        default:
                            t.CACHE[e] = o.SsoState.OFF
                    }
                    s(e, t.CACHE[e])
                })).finally((function() {
                    delete t.INFLIGHT[e]
                }))) : s(e, o.SsoState.OFF)
            }, this.CACHE = {}, this.INFLIGHT = {}
        };
    e.SsoStateChecker = n
}));
//# sourceMappingURL=sso_utils.min.js-vfl_6rTKT.map