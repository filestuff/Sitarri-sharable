define("modules/clean/react/async/loadable", ["require", "exports", "tslib", "react", "modules/core/cancelable_promise"], (function(e, t, n, o, a) {
    "use strict";
    var r;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = n.__importDefault(o), (function(e) {
        e[e.Default = 0] = "Default", e[e.Loaded = 1] = "Loaded", e[e.Error = 2] = "Error"
    })(r = t.LoadState || (t.LoadState = {})), t.Loadable = function(e) {
        var t = e.loader,
            l = e.loading,
            i = e.loadError,
            s = e.displayName;
        return (function(e) {
            function u() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    loadState: r.Default
                }, t
            }
            return n.__extends(u, e), u.prototype.componentDidMount = function() {
                return n.__awaiter(this, void 0, void 0, (function() {
                    var e;
                    return n.__generator(this, (function(n) {
                        switch (n.label) {
                            case 0:
                                return n.trys.push([0, 2, , 3]), this.loader = a.makeCancelable(t()), [4, this.loader];
                            case 1:
                                return e = n.sent(), this.loadedComponent = e, this.setState({
                                    loadState: r.Loaded
                                }), [3, 3];
                            case 2:
                                return n.sent().isCanceled || this.setState({
                                    loadState: r.Error
                                }), [3, 3];
                            case 3:
                                return [2]
                        }
                    }))
                }))
            }, u.prototype.componentWillUnmount = function() {
                this.loader.cancel()
            }, u.prototype.render = function() {
                return this.state.loadState === r.Loaded && null != this.loadedComponent ? o.default.createElement(this.loadedComponent, this.props) : this.state.loadState === r.Error && i ? "function" == typeof i ? i(this.props) : i : l ? "function" == typeof l ? l(this.props) : l : null
            }, u.displayName = s ? "LoadableComponent(" + s + ")" : "LoadableComponent", u
        })(o.default.Component)
    }
})), define("modules/core/cancelable_promise", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.makeCancelable = function(e) {
        var t = !1,
            n = new Promise((function(n, o) {
                e.then((function(e) {
                    return t ? o({
                        isCanceled: !0
                    }) : n(e)
                }), (function(e) {
                    return o(t ? {
                        isCanceled: !0
                    } : e)
                }))
            }));
        return n.cancel = function() {
            t = !0
        }, n
    }
}));
//# sourceMappingURL=pkg-loadable.min.js-vflgNkU3S.map