define(["require", "exports", "modules/constants/page_load", "modules/core/uri"], (function(e, r, t, n) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), r.generateId = function(e) {
        return e + Math.random().toString().slice(2)
    };
    var o = ["ja", "ko", "zh"];
    r.lastNameGoesFirst = function() {
        return o.includes(t.USER_LOCALE.slice(0, 2))
    }, r.isGoogleGrowthExperimentOn = function(e) {
        return ["GOOGLE2", "GOOGLE3", "MULTISTEP"].includes(e)
    }, r.twoFactorRecoveryUrl = function(e, r) {
        var t = new n.URI({
            path: "/twofactor_recovery"
        });
        return e && t.updateQuery({
            remember_me: e.toString()
        }), r && !["/", ""].includes(r) && t.updateQuery({
            cont: r
        }), t.toString()
    }
}));
//# sourceMappingURL=utils.min.js-vflpVEaLP.map