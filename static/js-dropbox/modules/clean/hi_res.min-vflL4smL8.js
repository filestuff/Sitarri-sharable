define(["require", "exports", "tslib", "jquery", "modules/core/i18n"], (function(e, r, t, i) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }), i = t.__importDefault(i);
    var n = (function() {
        function e(e) {
            if (this.constructor._show_hi_res()) {
                var r = e.attr("data-hi-res-no-resize");
                this.constructor.set_src(e, e.attr("data-hi-res"), r), this.constructor.set_bg(e, e.attr("data-hi-res-background"), r)
            }
        }
        return e.set_src = function(e, r, t) {
            if (this._show_hi_res()) return r && r !== e.attr("src") ? this._replace(e, r, !t, this._replace_img) : void 0
        }, e.set_bg = function(e, r, t) {
            if (this._show_hi_res()) return this._replace(e, r, !t, this._replace_background)
        }, e._show_hi_res = function() {
            return "devicePixelRatio" in window && window.devicePixelRatio > 1
        }, e._replace = function(e, r, t, n) {
            if (r) {
                var s = new Image;
                return s.src = r, i.default(s).on("load", (function() {
                    return n(e, r, t, s.width, s.height)
                }))
            }
        }, e._replace_img = function(e, r, t, i, n) {
            if (e.attr("src", r), t) return e.width(i / 2), e.height(n / 2)
        }, e._replace_background = function(e, r, t, i, n) {
            var s = "url('" + r + "')";
            if (e.css("backgroundImage", s), t) return e.css("backgroundSize", i / 2 + "px " + n / 2 + "px")
        }, e
    })();
    r.default = n
}));
//# sourceMappingURL=hi_res.min.js-vflWHOVh8.map