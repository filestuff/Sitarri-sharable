define(["require", "exports", "tslib"], (function(e, s, _) {
    "use strict";

    function f() {
        if (self._DBX_UXA_isUxaListening) {
            var e = self._DBX_UXA_bufferedClosures = self._DBX_UXA_bufferedClosures || [],
                s = _.__spreadArrays(e);
            e.length = 0;
            for (var f = 0, i = s; f < i.length; f++) {
                (0, i[f])()
            }
        }
    }
    Object.defineProperty(s, "__esModule", {
        value: !0
    }), s.runAfterUxaListening = function(e) {
        (self._DBX_UXA_bufferedClosures = self._DBX_UXA_bufferedClosures || []).push(e), f()
    }, s.uxaIsListening = function() {
        self._DBX_UXA_isUxaListening = !0, f()
    }, s.resetForTesting = function() {
        self._DBX_UXA_isUxaListening = void 0, self._DBX_UXA_bufferedClosures = void 0;
        try {
            delete self._DBX_UXA_isUxaListening, delete self._DBX_UXA_bufferedClosures
        } catch (e) {}
    }
}));
//# sourceMappingURL=lazy_ux_analytics.min.js-vfl97YDvs.map