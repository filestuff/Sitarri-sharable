define(["require", "exports", "tslib", "modules/clean/ux_analytics/lazy_ux_analytics", "modules/clean/ux_analytics/dispatch_custom_event"], (function(t, e, a, n, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), s = a.__importStar(s), e.SPA_HISTORY_STATE_CHANGE = "SPAHistoryStateChange";
    var i = function(t) {
            var a = {
                detail: {
                    eventSource: t
                }
            };
            n.runAfterUxaListening((function() {
                s.dispatchCustomEvent(e.SPA_HISTORY_STATE_CHANGE, a)
            }))
        },
        l = history.pushState,
        o = history.replaceState,
        r = function(t) {
            i("popState")
        };
    e.lib = {
        oldReplaceState: o,
        oldPushState: l,
        resetHistoryListenersInstalled: function() {
            self._DBX_UXA_historyListenersInstalled = !1
        },
        getHistoryListenersInstalled: function() {
            return self._DBX_UXA_historyListenersInstalled
        },
        installPushStateMonkeyPatch: function() {
            Object.defineProperty(history, "pushState", {
                value: function(t, a, n) {
                    var s = location.pathname + location.hash;
                    e.lib.oldPushState.call(history, t, a, n), s !== location.pathname + location.hash && i("pushState")
                }
            })
        },
        installReplaceStateMonkeyPatch: function() {
            Object.defineProperty(history, "replaceState", {
                value: function(t, a, n) {
                    var s = location.pathname + location.hash;
                    e.lib.oldReplaceState.call(history, t, a, n), s !== location.pathname + location.hash && i("replaceState")
                }
            })
        }
    }, e.installHistoryListeners = function() {
        self._DBX_UXA_historyListenersInstalled || (e.lib.installPushStateMonkeyPatch(), e.lib.installReplaceStateMonkeyPatch(), window.addEventListener("popstate", r), self._DBX_UXA_historyListenersInstalled = !0)
    }
}));
//# sourceMappingURL=window_history_listeners.min.js-vfl_mFHFc.map