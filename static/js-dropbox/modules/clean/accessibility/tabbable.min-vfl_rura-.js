define(["require", "exports", "tslib", "jquery"], (function(e, t, n, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = n.__importDefault(i);
    var u = (function() {
        function e() {
            e.initialized || this.listen()
        }
        return e.prototype.listen = function() {
            e.initialized = !0, i.default(document).on("keydown", (function(e) {
                if (9 === e.keyCode) return i.default(document.body).addClass("tabbing")
            })), i.default(document).on("mousedown", (function(e) {
                return i.default(document.body).removeClass("tabbing")
            }))
        }, e.initialized = !1, e
    })();
    t.default = u, t.initialize_module = function() {
        return new u
    }
}));
//# sourceMappingURL=tabbable.min.js-vflchN8az.map