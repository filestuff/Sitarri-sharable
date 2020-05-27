define(["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.DROPBOX_VARIANTS_ISSUER = "https://dropbox.com/ux_analytics", t.addMatchedVariantsToEvent = function(e) {
        var t = function(e, t) {
            return void 0 === e || (function(e, t) {
                if (void 0 === e) return !0;
                var a = e;
                for (var n in a)
                    if (String(t[n]) !== String(a[n])) return !1;
                return !0
            })(e.extra, t.extra)
        };
        if ("undefined" != typeof self && self) {
            var a, n = self._DBX_UX_variants_configStore,
                r = {};
            if (e && n && n.matchers && e.eventName && (a = n.matchers[e.eventName]))
                for (var i in a)
                    if (n.assignments && a.hasOwnProperty(i)) {
                        var s = a[i],
                            o = n.assignments[s.feature_name];
                        o && void 0 === r[o.variantToken] && t(s.like, e) && (e.extra || (e.extra = {}), e.extra.variants ? e.extra.variants += "," + o.variantToken : e.extra.variants = o.variantToken, r[o.variantToken] = !0)
                    }
        }
    }, t.addConfig = function(e) {
        if (e) {
            self._DBX_UX_variants_configStore = self._DBX_UX_variants_configStore || {};
            var a = self._DBX_UX_variants_configStore,
                n = e.variant_tokens,
                r = e.matchers,
                i = function(e) {
                    return atob(e.split("_").join("/").split("-").join("+"))
                },
                s = function(e) {
                    return decodeURIComponent(escape(e))
                };
            if (n)
                for (var o = 0, f = n.split(","); o < f.length; o++) {
                    var v = f[o],
                        _ = v.split(".").map(i),
                        c = _[0],
                        m = _[1];
                    if (_[2])
                        if ("JWT" === JSON.parse(s(c)).typ) {
                            var u = JSON.parse(s(m)),
                                l = u.variants,
                                g = u.iss;
                            if (l && g === t.DROPBOX_VARIANTS_ISSUER)
                                for (var p = 0, d = l.split(","); p < d.length; p++) {
                                    var S = d[p].split(":"),
                                        h = S[0],
                                        X = S[1];
                                    a.assignments = a.assignments || {}, a.assignments[h] = {
                                        variant: X,
                                        variantToken: v
                                    }
                                }
                        }
                }
            if (r)
                for (var x = 0, O = r; x < O.length; x++) {
                    var k = O[x];
                    a.matchers = a.matchers || {};
                    var T = k.event_name;
                    a.matchers[T] = a.matchers[T] || {};
                    var U = {
                            feature_name: k.feature_name,
                            event_name: T,
                            is_pre_tti: k.is_pre_tti,
                            like: k.like
                        },
                        B = JSON.stringify(U);
                    a.matchers[T][B] = U
                }
        }
    }, t.getVariant = function(e) {
        var t = self._DBX_UX_variants_configStore;
        return (t && t.assignments && t.assignments[e] || {}).variant || "OFF"
    }
}));
//# sourceMappingURL=ux_variants.min.js-vflSTayza.map