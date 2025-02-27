define("spectrum/culled_list/culled_item", ["require", "exports", "tslib", "react"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.CulledItem = function(e) {
        var t = e.children,
            o = e.className,
            i = e.style,
            a = e.tagName,
            s = e.topOffset,
            l = e.height,
            c = r.__rest(e, ["children", "className", "style", "tagName", "topOffset", "height"]);
        return n.createElement(a, Object.assign({
            className: o,
            style: r.__assign(r.__assign({}, i), {
                position: "absolute",
                top: s,
                width: "100%",
                height: l
            })
        }, c), t)
    }, t.CulledItem.displayName = "CulledItem"
})), define("spectrum/culled_list/culled_list", ["require", "exports", "tslib", "react", "spectrum/scroll_monitor", "spectrum/culled_list/util", "spectrum/scroll_monitor/utils"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n);
    var s = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            r.handleScroll = function(e) {
                r.scrollPosition = e.fromTop, r.viewportHeight = e.innerHeight;
                var t = r.state,
                    n = t.startIndex,
                    o = t.endIndex,
                    i = r.props.scrollThreshold,
                    a = r.getIndexRangeInView(),
                    s = a[0],
                    l = a[1],
                    c = Math.abs(s - n),
                    u = Math.abs(l - o);
                (c >= i || u >= i) && r.setState({
                    startIndex: s,
                    endIndex: l
                })
            };
            var n = t.items,
                o = t.listItemHeight;
            r.updateOffsetCache(n, o);
            var i = r.getIndexRangeInView(t);
            return r.state = {
                startIndex: i[0],
                endIndex: i[1]
            }, r
        }
        return r.__extends(t, e), t.prototype.UNSAFE_componentWillMount = function() {
            var e = this.props,
                t = e.viewportHeight,
                r = e.scrollPosition,
                n = e.shouldUseWindowAsScrollContainer,
                o = void 0 !== t,
                i = void 0 !== r;
            if (o && (this.viewportHeight = t), i && (this.scrollPosition = r), n) {
                var s = a.getWindowScrollMeasurements(window),
                    l = s.fromTop,
                    c = s.innerHeight;
                o || (this.viewportHeight = c), i || (this.scrollPosition = l)
            }
        }, t.prototype.UNSAFE_componentWillReceiveProps = function(e) {
            var t = e.viewportHeight,
                r = e.scrollPosition,
                n = e.items,
                o = e.listItemHeight;
            void 0 !== t && (this.viewportHeight = t), void 0 !== r && (this.scrollPosition = r), this.updateOffsetCache(n, o);
            var i = this.getIndexRangeInView(e);
            this.setState({
                startIndex: i[0],
                endIndex: i[1]
            })
        }, t.prototype.componentDidUpdate = function() {
            var e = this.state,
                t = e.startIndex,
                r = e.endIndex,
                n = this.props.onRangeInView;
            n && n(t, r)
        }, t.prototype.renderItemContainer = function(e) {
            var t = this.props,
                r = t.role,
                o = t.id,
                i = t["aria-labelledby"],
                a = t.className,
                s = e.tagName || "div";
            return n.createElement(s, {
                role: r,
                id: o,
                "aria-labelledby": i,
                children: e.children,
                className: a,
                key: "Container " + e.containerIndex,
                style: {
                    height: e.height
                }
            })
        }, t.prototype.wrapWithElementScrollMonitor = function(e) {
            var t = this.props,
                r = t.viewportHeight,
                i = t.scrollContainerTagName,
                a = t.window;
            return n.createElement(o.ElementScrollMonitor, {
                height: r,
                tagName: i,
                onScroll: this.handleScroll,
                window: a
            }, e)
        }, t.prototype.renderWithMaxHeightGrouping = function() {
            var e = this.props,
                t = e.id,
                r = e["aria-labelledby"],
                i = e.className,
                a = e.items,
                s = e.listItemHeight,
                l = e.role,
                c = e.shouldUseWindowAsScrollContainer,
                u = e.tagName,
                d = e.window,
                m = a.length,
                p = this.state,
                f = p.startIndex,
                h = p.endIndex,
                _ = [],
                b = [];
            if (c && b.push(n.createElement(o.WindowScrollMonitor, {
                    window: d,
                    onScroll: this.handleScroll
                })), Array.isArray(s)) {
                for (var v = s, g = 0, y = 0; y < m; y++) g + v[y] > 15e5 && (_.push(this.renderItemContainer({
                    tagName: u,
                    className: i,
                    children: b,
                    containerIndex: _.length,
                    height: g,
                    role: l,
                    id: t,
                    ariaLabelledby: r
                })), b = [], g = 0), y >= f && y <= h && b.push(this.renderItem(y, v[y], g)), g += v[y];
                g > 0 && (_.push(this.renderItemContainer({
                    tagName: u,
                    className: i,
                    children: b,
                    containerIndex: _.length,
                    height: g,
                    role: l,
                    id: t,
                    ariaLabelledby: r
                })), b = [])
            } else {
                var w = s,
                    x = Math.floor(15e5 / w),
                    N = (g = x * w, m % x * w);
                N || (N = g);
                var M = Math.ceil(m / x),
                    S = Math.floor(f / x);
                for (y = 0; y < S; y++) _.push(this.renderItemContainer({
                    tagName: u,
                    className: i,
                    children: [],
                    containerIndex: _.length,
                    height: g,
                    role: l,
                    id: t,
                    ariaLabelledby: r
                }));
                var O = x * (S + 1),
                    E = f % x * w;
                for (y = f; y <= h; y++) y === O && (_.push(this.renderItemContainer({
                    tagName: u,
                    className: i,
                    children: b,
                    containerIndex: _.length,
                    height: g,
                    role: l,
                    id: t,
                    ariaLabelledby: r
                })), b = [], O += x, E = 0), b.push(this.renderItem(y, w, E)), E += w;
                for (y = _.length; y < M; y++) y === M - 1 && (g = N), _.push(this.renderItemContainer({
                    tagName: u,
                    className: i,
                    children: b,
                    containerIndex: _.length,
                    height: g,
                    role: l,
                    id: t,
                    ariaLabelledby: r
                })), b = []
            }
            return 1 === _.length ? _[0] : n.createElement("div", {
                className: "mc-culled-list-container-wrapper"
            }, _)
        }, t.prototype.renderWithoutMaxHeightGrouping = function() {
            var e = this.props,
                t = e.className,
                r = e.items,
                i = e.listItemHeight,
                a = e.shouldUseWindowAsScrollContainer,
                s = e.role,
                l = e.tagName,
                c = e.window,
                u = e.id,
                d = e["aria-labelledby"],
                m = r.length,
                p = this.state,
                f = p.startIndex,
                h = p.endIndex,
                _ = [];
            a && _.push(n.createElement(o.WindowScrollMonitor, {
                window: c,
                onScroll: this.handleScroll
            }));
            var b = 0;
            if (Array.isArray(i))
                for (var v = i, g = 0; g < m; g++) g >= f && g <= h && _.push(this.renderItem(g, v[g], b)), b += v[g];
            else {
                var y = i;
                for (g = f; g <= h; g++) _.push(this.renderItem(g, y, g * y));
                b = y * m
            }
            return this.renderItemContainer({
                tagName: l,
                className: t,
                children: _,
                containerIndex: 0,
                height: b,
                role: s,
                id: u,
                ariaLabelledby: d
            })
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.enableMaxHeightGrouping,
                r = e.shouldUseWindowAsScrollContainer,
                n = t ? this.renderWithMaxHeightGrouping() : this.renderWithoutMaxHeightGrouping();
            return r || (n = this.wrapWithElementScrollMonitor(n)), n
        }, t.prototype.renderItem = function(e, t, r) {
            var n = this.props,
                o = n.items,
                i = n.getItemKey,
                a = n.renderRow,
                s = o[e];
            return i && i(s, e), a(s, e, r)
        }, t.prototype.getIndexRangeInView = function(e) {
            void 0 === e && (e = this.props);
            var t = e.itemBuffer,
                r = e.items,
                n = e.listItemHeight,
                o = e.scrollPositionOffset,
                a = e.scrollThreshold,
                s = e.window,
                l = e.viewportHeight,
                c = void 0 === l ? this.viewportHeight : l,
                u = e.scrollPosition,
                d = void 0 === u ? this.scrollPosition : u,
                m = e.shouldUseWindowAsScrollContainer,
                p = s.document.documentElement,
                f = d;
            void 0 === f && (f = m ? Math.max(p.scrollTop, 0) : 0), o && (f -= o);
            var h = r.length,
                _ = t + Math.max(a - 1, 0);
            return Array.isArray(n) ? i.rangeInSlicedBoundary(this.cachedItemOffsets, c, f, _) : i.rangeInEvenSlicedBoundary(h, n, f, c, _)
        }, t.prototype.updateOffsetCache = function(e, t) {
            if (Array.isArray(t)) {
                if (e.length !== t.length) throw new Error("Must supply a height for every item.");
                this.cachedItemOffsets = i.computeSliceOffsets(t)
            }
        }, t
    })(n.PureComponent);
    t.CulledList = s, s.displayName = "CulledList", s.defaultProps = {
        itemBuffer: 10,
        itemTagName: "li",
        enableMaxHeightGrouping: !1,
        scrollThreshold: 1,
        shouldUseWindowAsScrollContainer: !0,
        tagName: "ul",
        window: "undefined" != typeof window ? window : void 0
    }
})), define("spectrum/culled_list/util", ["require", "exports"], (function(e, t) {
    "use strict";

    function r(e, t, n, o, i) {
        if (void 0 === n && (n = !1), void 0 === o && (o = 0), !e.length) return -1;
        var a = e.length - 1;
        if (void 0 === i && (i = a), o === i || t < e[o] || n && t === e[o]) return o;
        if (t >= e[a]) return i;
        var s = o + Math.floor((i - o) / 2),
            l = e[s];
        return t === l ? s + 1 : t < l ? r(e, t, n, o, s) : r(e, t, n, s + 1, i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.rangeInEvenSlicedBoundary = function(e, t, r, n, o) {
        var i = t * e,
            a = Math.floor(r / i * e),
            s = Math.max(a - o, 0),
            l = Math.ceil((r + n || 1) / i * e) - 1;
        return [s, Math.min(l + o, e - 1)]
    }, t.binaryBucket = r, t.computeSliceOffsets = function(e) {
        return e.reduce((function(e, t) {
            return e.push(t + (e[e.length - 1] || 0)), e
        }), [])
    }, t.rangeInSlicedBoundary = function(e, t, n, o) {
        if (!e.length) return [];
        var i = r(e, n, !1),
            a = r(e, n + t, !0, i);
        return [Math.max(i - o, 0), Math.min(a + o, e.length - 1)]
    }
})), define("spectrum/culled_list", ["require", "exports", "tslib", "spectrum/culled_list/culled_item", "spectrum/culled_list/culled_list"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t), r.__exportStar(o, t)
})), define("spectrum/dimensions", ["require", "exports", "tslib", "spectrum/dimensions/dimensions"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t)
})), define("spectrum/dimensions/dimensions", ["require", "exports", "tslib", "react", "resize-observer-polyfill"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importDefault(o);
    var i = (function(e) {
        function t() {
            var t = e.apply(this, arguments) || this;
            return t.state = {}, t.animationFrameId = null, t.handleResize = function(e) {
                var r = e[0].contentRect,
                    n = r.width,
                    o = r.height;
                t.animationFrameId = window.requestAnimationFrame((function() {
                    t.setState({
                        width: n,
                        height: o
                    })
                }))
            }, t
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.rootElement && (this.resizeObserver = new o.default(this.handleResize), this.resizeObserver.observe(this.rootElement))
        }, t.prototype.componentDidUpdate = function(e) {
            e.tagName !== this.props.tagName && this.rootElement && (this.animationFrameId && window.cancelAnimationFrame(this.animationFrameId), this.resizeObserver.disconnect(), this.resizeObserver.observe(this.rootElement))
        }, t.prototype.componentWillUnmount = function() {
            this.animationFrameId && window.cancelAnimationFrame(this.animationFrameId), this.resizeObserver.disconnect()
        }, t.prototype.render = function() {
            var e = this,
                t = this.props,
                o = t.children,
                i = t.tagName,
                a = void 0 === i ? "div" : i,
                s = r.__rest(t, ["children", "tagName"]),
                l = this.state,
                c = l.width,
                u = l.height,
                d = null;
            return "function" == typeof o && (d = o({
                width: c,
                height: u
            })), n.createElement(a, Object.assign({
                ref: function(t) {
                    return e.rootElement = t
                }
            }, s), d)
        }, t
    })(n.PureComponent);
    t.Dimensions = i, i.displayName = "Dimensions"
})), define("spectrum/dropdown_button", ["require", "exports", "tslib", "spectrum/dropdown_button/dropdown_button"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t)
})), define("spectrum/dropdown_button/dropdown_button", ["require", "exports", "tslib", "classnames", "react", "spectrum/button"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.DropdownButton = function(e) {
        var t = e.children,
            a = e.className,
            s = e.tagName,
            l = e.type,
            c = void 0 === l ? "button" : l,
            u = r.__rest(e, ["children", "className", "tagName", "type"]),
            d = n.default(a, "mc-dropdown-button"),
            m = {};
        return "button" === s && (m.type = c), o.createElement(i.Button, Object.assign({
            variant: "secondary",
            className: d,
            tagName: s
        }, m, u), o.createElement("span", {
            className: "mc-dropdown-button-content"
        }, t))
    }, t.DropdownButton.displayName = "DropdownButton"
})), define("spectrum/dropdown_menu", ["require", "exports", "tslib", "spectrum/dropdown_menu/dropdown_menu", "spectrum/dropdown_menu/dropdown_menu_button", "spectrum/dropdown_menu/menu", "spectrum/dropdown_menu/menu_item"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t), r.__exportStar(o, t), r.__exportStar(i, t), r.__exportStar(a, t)
})), define("spectrum/dropdown_menu/dropdown_menu", ["require", "exports", "tslib", "classnames", "react", "react-aria-menubutton", "spectrum/dropdown_menu/dropdown_menu_button"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.DropdownMenu = function(e) {
        var t = e.children,
            s = e.className,
            l = e.disabled,
            c = e.fullWidth,
            u = e.onSelection,
            d = e.ref,
            m = r.__rest(e, ["children", "className", "disabled", "fullWidth", "onSelection", "ref"]),
            p = n.default("mc-dropdown-menu", s, {
                "mc-dropdown-menu-full-width": c
            }),
            f = t;
        return t && (f = o.Children.map(t, (function(e) {
            if (o.isValidElement(e) && e.type === a.DropdownMenuButton) {
                var t = {
                    disabled: l
                };
                return o.cloneElement(e, t)
            }
            return e
        }))), o.createElement(i.Wrapper, Object.assign({
            className: p,
            onSelection: function(e) {
                u && u(e)
            },
            ref: d
        }, m), f)
    }, t.DropdownMenu.displayName = "DropdownMenu"
})), define("spectrum/dropdown_menu/dropdown_menu_button", ["require", "exports", "tslib", "classnames", "react", "spectrum/fixed_aria_menu_button", "spectrum/dropdown_button"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.DropdownMenuButton = function(e) {
        var t = e.children,
            s = e.className,
            l = (e.ref, e.disabled),
            c = e.fullWidth,
            u = e.variant,
            d = void 0 === u ? "secondary" : u,
            m = r.__rest(e, ["children", "className", "ref", "disabled", "fullWidth", "variant"]),
            p = n.default("mc-dropdown-menu-button", "mc-button-styleless", "mc-button-aria-wrapper", {
                "mc-button-full-width": c
            }, s),
            f = m;
        return l && (f.tabIndex = -1), o.createElement(i.FixedAriaMenuButton, Object.assign({
            tag: "button",
            type: "button",
            className: p,
            disabled: l
        }, f), o.createElement(a.DropdownButton, {
            tagName: "span",
            disabled: l,
            fullWidth: c,
            variant: d
        }, t))
    }, t.DropdownMenuButton.displayName = "DropdownMenuButton"
})), define("spectrum/dropdown_menu/menu", ["require", "exports", "tslib", "classnames", "react", "react-aria-menubutton"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.Menu = function(e) {
        var t = e.className,
            a = e.ref,
            s = r.__rest(e, ["className", "ref"]),
            l = n.default("mc-menu", t);
        return o.createElement(i.Menu, Object.assign({
            tag: "ul",
            className: l,
            ref: a
        }, s))
    }, t.Menu.displayName = "Menu"
})), define("spectrum/dropdown_menu/menu_item", ["require", "exports", "tslib", "classnames", "react", "react-aria-menubutton", "spectrum/button"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.MenuItem = function(e) {
        var t = e.children,
            s = e.className,
            l = e.disabled,
            c = (e.ref, e.selected),
            u = e.value,
            d = r.__rest(e, ["children", "className", "disabled", "ref", "selected", "value"]),
            m = n.default("mc-menu-item", s, {
                "mc-menu-item-disabled": l,
                "mc-menu-item-selected": c
            });
        return l ? o.createElement("li", Object.assign({
            className: m
        }, d), o.createElement(a.Button, {
            tagName: "span",
            variant: "styleless",
            className: "mc-menu-item-button",
            disabled: l
        }, t)) : o.createElement(i.MenuItem, Object.assign({
            tag: "li",
            className: m,
            value: u
        }, d), o.createElement(a.Button, {
            variant: "styleless",
            className: "mc-menu-item-button"
        }, t))
    }, t.MenuItem.displayName = "MenuItem"
})), define("spectrum/fixed_aria_menu_button", ["require", "exports", "tslib", "react", "react-dom", "react-aria-menubutton"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importStar(o), t.FixedAriaMenuButton = function(e, t) {
        var a, s = t.ambManager,
            l = (e.ref, r.__rest(e, ["ref"])),
            c = l.onMouseDown;
        return n.createElement(i.Button, Object.assign({
            ref: function(e) {
                return a = e
            },
            onClick: function() {
                l.disabled || (a && o.findDOMNode(a).focus(), s.toggleMenu({}, {
                    focusMenu: !1
                }), c && c.apply(this, arguments))
            }
        }, l))
    }, t.FixedAriaMenuButton.contextTypes = {
        ambManager: function() {
            return null
        }
    }, t.FixedAriaMenuButton.displayName = "FixedAriaMenuButton"
})), (function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("resize-observer-polyfill", t) : e.ResizeObserver = t()
})(this, (function() {
    "use strict";
    var e = (function() {
            if ("undefined" != typeof Map) return Map;

            function e(e, t) {
                var r = -1;
                return e.some((function(e, n) {
                    return e[0] === t && (r = n, !0)
                })), r
            }
            return (function() {
                function t() {
                    this.__entries__ = []
                }
                return Object.defineProperty(t.prototype, "size", {
                    get: function() {
                        return this.__entries__.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.get = function(t) {
                    var r = e(this.__entries__, t),
                        n = this.__entries__[r];
                    return n && n[1]
                }, t.prototype.set = function(t, r) {
                    var n = e(this.__entries__, t);
                    ~n ? this.__entries__[n][1] = r : this.__entries__.push([t, r])
                }, t.prototype.delete = function(t) {
                    var r = this.__entries__,
                        n = e(r, t);
                    ~n && r.splice(n, 1)
                }, t.prototype.has = function(t) {
                    return !!~e(this.__entries__, t)
                }, t.prototype.clear = function() {
                    this.__entries__.splice(0)
                }, t.prototype.forEach = function(e, t) {
                    void 0 === t && (t = null);
                    for (var r = 0, n = this.__entries__; r < n.length; r++) {
                        var o = n[r];
                        e.call(t, o[1], o[0])
                    }
                }, t
            })()
        })(),
        t = "undefined" != typeof window && "undefined" != typeof document && window.document === document,
        r = "undefined" != typeof global && global.Math === Math ? global : "undefined" != typeof self && self.Math === Math ? self : "undefined" != typeof window && window.Math === Math ? window : Function("return this")(),
        n = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(r) : function(e) {
            return setTimeout((function() {
                return e(Date.now())
            }), 1e3 / 60)
        };
    var o = ["top", "right", "bottom", "left", "width", "height", "size", "weight"],
        i = "undefined" != typeof MutationObserver,
        a = (function() {
            function e() {
                this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = (function(e, t) {
                    var r = !1,
                        o = !1,
                        i = 0;

                    function a() {
                        r && (r = !1, e()), o && l()
                    }

                    function s() {
                        n(a)
                    }

                    function l() {
                        var e = Date.now();
                        if (r) {
                            if (e - i < 2) return;
                            o = !0
                        } else r = !0, o = !1, setTimeout(s, t);
                        i = e
                    }
                    return l
                })(this.refresh.bind(this), 20)
            }
            return e.prototype.addObserver = function(e) {
                ~this.observers_.indexOf(e) || this.observers_.push(e), this.connected_ || this.connect_()
            }, e.prototype.removeObserver = function(e) {
                var t = this.observers_,
                    r = t.indexOf(e);
                ~r && t.splice(r, 1), !t.length && this.connected_ && this.disconnect_()
            }, e.prototype.refresh = function() {
                this.updateObservers_() && this.refresh()
            }, e.prototype.updateObservers_ = function() {
                var e = this.observers_.filter((function(e) {
                    return e.gatherActive(), e.hasActive()
                }));
                return e.forEach((function(e) {
                    return e.broadcastActive()
                })), e.length > 0
            }, e.prototype.connect_ = function() {
                t && !this.connected_ && (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), i ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0)
            }, e.prototype.disconnect_ = function() {
                t && this.connected_ && (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1)
            }, e.prototype.onTransitionEnd_ = function(e) {
                var t = e.propertyName,
                    r = void 0 === t ? "" : t;
                o.some((function(e) {
                    return !!~r.indexOf(e)
                })) && this.refresh()
            }, e.getInstance = function() {
                return this.instance_ || (this.instance_ = new e), this.instance_
            }, e.instance_ = null, e
        })(),
        s = function(e, t) {
            for (var r = 0, n = Object.keys(t); r < n.length; r++) {
                var o = n[r];
                Object.defineProperty(e, o, {
                    value: t[o],
                    enumerable: !1,
                    writable: !1,
                    configurable: !0
                })
            }
            return e
        },
        l = function(e) {
            return e && e.ownerDocument && e.ownerDocument.defaultView || r
        },
        c = h(0, 0, 0, 0);

    function u(e) {
        return parseFloat(e) || 0
    }

    function d(e) {
        for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        return t.reduce((function(t, r) {
            return t + u(e["border-" + r + "-width"])
        }), 0)
    }

    function m(e) {
        var t = e.clientWidth,
            r = e.clientHeight;
        if (!t && !r) return c;
        var n = l(e).getComputedStyle(e),
            o = (function(e) {
                for (var t = {}, r = 0, n = ["top", "right", "bottom", "left"]; r < n.length; r++) {
                    var o = n[r],
                        i = e["padding-" + o];
                    t[o] = u(i)
                }
                return t
            })(n),
            i = o.left + o.right,
            a = o.top + o.bottom,
            s = u(n.width),
            m = u(n.height);
        if ("border-box" === n.boxSizing && (Math.round(s + i) !== t && (s -= d(n, "left", "right") + i), Math.round(m + a) !== r && (m -= d(n, "top", "bottom") + a)), !(function(e) {
                return e === l(e).document.documentElement
            })(e)) {
            var p = Math.round(s + i) - t,
                f = Math.round(m + a) - r;
            1 !== Math.abs(p) && (s -= p), 1 !== Math.abs(f) && (m -= f)
        }
        return h(o.left, o.top, s, m)
    }
    var p = "undefined" != typeof SVGGraphicsElement ? function(e) {
        return e instanceof l(e).SVGGraphicsElement
    } : function(e) {
        return e instanceof l(e).SVGElement && "function" == typeof e.getBBox
    };

    function f(e) {
        return t ? p(e) ? (function(e) {
            var t = e.getBBox();
            return h(0, 0, t.width, t.height)
        })(e) : m(e) : c
    }

    function h(e, t, r, n) {
        return {
            x: e,
            y: t,
            width: r,
            height: n
        }
    }
    var _ = (function() {
            function e(e) {
                this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = h(0, 0, 0, 0), this.target = e
            }
            return e.prototype.isActive = function() {
                var e = f(this.target);
                return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight
            }, e.prototype.broadcastRect = function() {
                var e = this.contentRect_;
                return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e
            }, e
        })(),
        b = function(e, t) {
            var r, n, o, i, a, l, c, u = (n = (r = t).x, o = r.y, i = r.width, a = r.height, l = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, c = Object.create(l.prototype), s(c, {
                x: n,
                y: o,
                width: i,
                height: a,
                top: o,
                right: n + i,
                bottom: a + o,
                left: n
            }), c);
            s(this, {
                target: e,
                contentRect: u
            })
        },
        v = (function() {
            function t(t, r, n) {
                if (this.activeObservations_ = [], this.observations_ = new e, "function" != typeof t) throw new TypeError("The callback provided as parameter 1 is not a function.");
                this.callback_ = t, this.controller_ = r, this.callbackCtx_ = n
            }
            return t.prototype.observe = function(e) {
                if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                if ("undefined" != typeof Element && Element instanceof Object) {
                    if (!(e instanceof l(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                    var t = this.observations_;
                    t.has(e) || (t.set(e, new _(e)), this.controller_.addObserver(this), this.controller_.refresh())
                }
            }, t.prototype.unobserve = function(e) {
                if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
                if ("undefined" != typeof Element && Element instanceof Object) {
                    if (!(e instanceof l(e).Element)) throw new TypeError('parameter 1 is not of type "Element".');
                    var t = this.observations_;
                    t.has(e) && (t.delete(e), t.size || this.controller_.removeObserver(this))
                }
            }, t.prototype.disconnect = function() {
                this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this)
            }, t.prototype.gatherActive = function() {
                var e = this;
                this.clearActive(), this.observations_.forEach((function(t) {
                    t.isActive() && e.activeObservations_.push(t)
                }))
            }, t.prototype.broadcastActive = function() {
                if (this.hasActive()) {
                    var e = this.callbackCtx_,
                        t = this.activeObservations_.map((function(e) {
                            return new b(e.target, e.broadcastRect())
                        }));
                    this.callback_.call(e, t, e), this.clearActive()
                }
            }, t.prototype.clearActive = function() {
                this.activeObservations_.splice(0)
            }, t.prototype.hasActive = function() {
                return this.activeObservations_.length > 0
            }, t
        })(),
        g = "undefined" != typeof WeakMap ? new WeakMap : new e,
        y = function e(t) {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function.");
            if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
            var r = a.getInstance(),
                n = new v(t, r, this);
            g.set(this, n)
        };
    return ["observe", "unobserve", "disconnect"].forEach((function(e) {
        y.prototype[e] = function() {
            var t;
            return (t = g.get(this))[e].apply(t, arguments)
        }
    })), void 0 !== r.ResizeObserver ? r.ResizeObserver : y
})), define("spectrum/icon_status", ["require", "exports", "tslib", "react", "spectrum/icon_templates/status", "spectrum/svg_icon_bundle", "spectrum/icon_status/bundle"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.ICONS = a.ICONS, t.IconStatus = function(e) {
        var t = e.name,
            r = n.createElement(i.SvgIconBundle, {
                focusable: "false",
                icon: a.ICONS[t]
            });
        return n.createElement(o.Component, Object.assign({
            icon: r
        }, e))
    }, t.IconStatus.displayName = "IconStatus"
})), define("spectrum/icon_status/bundle", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ICONS = JSON.parse('\n    {"complete":{"attrs":{"width":"18","height":"18","viewBox":"0 0 18 18"},"dangerouslySetInnerIconHtml":"<path d=\\"M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z\\" fill=\\"#00A83E\\"></path><path d=\\"M7.583 10.315l5.128-5.128 1.62 1.62-6.748 6.749-1.62-1.62 1.62-1.621 1.35 1.35-1.62 1.62L3.938 9.91l1.62-1.62 2.025 2.025z\\" fill=\\"#fff\\"></path>"},"fail":{"attrs":{"width":"18","height":"18","viewBox":"0 0 18 18"},"dangerouslySetInnerIconHtml":"<path d=\\"M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z\\" fill=\\"#D5001F\\"></path><path d=\\"M13.91 7.773H4.09v2.454h9.82V7.773z\\" fill=\\"#fff\\"></path>"},"sync":{"attrs":{"width":"18","height":"18","viewBox":"0 0 18 18"},"dangerouslySetInnerIconHtml":"<path d=\\"M9 18A9 9 0 1 0 9 0a9 9 0 0 0 0 18z\\" fill=\\"#0061FF\\"></path><path d=\\"M8.98 3.751h-.19c.063-.002.127-.004.19-.004V2.328l2.387 2.386-2.386 2.387V5.665a3.34 3.34 0 0 0-2.712 5.27l-1.362 1.362A5.25 5.25 0 0 1 8.98 3.756V3.75zm.025 10.505v1.419l-2.386-2.386 2.386-2.387v1.436a3.341 3.341 0 0 0 2.712-5.27l1.362-1.362a5.25 5.25 0 0 1-4.074 8.541v.005h.19a5.263 5.263 0 0 1-.19.004z\\" fill=\\"#fff\\"></path>"},"warn":{"attrs":{"width":"18","height":"18","viewBox":"0 0 18 18"},"dangerouslySetInnerIconHtml":"<path d=\\"M11.543 1.572l6.156 12.314A2.843 2.843 0 0 1 15.156 18H2.843A2.843 2.843 0 0 1 .3 13.886L6.457 1.572a2.843 2.843 0 0 1 5.086 0z\\" fill=\\"#F1AA00\\"></path><path d=\\"M10.233 5.17v5.728H7.78V5.171h2.454zm0 9.827H7.78v-2.455h2.454v2.455z\\" fill=\\"#fff\\"></path>"}}\n  ')
})), define("spectrum/input", ["require", "exports", "tslib", "spectrum/input/input", "spectrum/input/text_area"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t), r.__exportStar(o, t)
})), define("spectrum/input/input", ["require", "exports", "tslib", "classnames", "react"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.Input = function(e) {
        var t = e.variant,
            i = e.className,
            a = e.forwardedRef,
            s = e.fullWidth,
            l = r.__rest(e, ["variant", "className", "forwardedRef", "fullWidth"]),
            c = n.default(i, {
                "mc-input": !0,
                "mc-input-full-width": s,
                disabled: !!l.disabled,
                focus: !l.disabled && "focus" === t,
                invalid: !l.disabled && "invalid" === t
            });
        return o.createElement("input", Object.assign({
            className: c,
            ref: a,
            type: "text"
        }, l))
    }, t.Input.displayName = "Input"
})), define("spectrum/input/text_area", ["require", "exports", "tslib", "classnames", "react"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.TextArea = function(e) {
        var t = e.className,
            i = e.fullWidth,
            a = e.forwardedRef,
            s = e.variant,
            l = void 0 === s ? "default" : s,
            c = r.__rest(e, ["className", "fullWidth", "forwardedRef", "variant"]),
            u = n.default("mc-text-area", {
                "mc-text-area-full-width": i,
                "mc-text-area-invalid": !c.disabled && "invalid" === l
            }, t);
        return o.createElement("textarea", Object.assign({
            className: u,
            ref: a
        }, c))
    }, t.TextArea.displayName = "TextArea"
})), define("spectrum/media_table", ["require", "exports", "tslib", "spectrum/media_table/culled_media_row", "spectrum/media_table/media_actions", "spectrum/media_table/media_cell", "spectrum/media_table/media_cell_text", "spectrum/media_table/media_row"], (function(e, t, r, n, o, i, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t), r.__exportStar(o, t), r.__exportStar(i, t), r.__exportStar(a, t), r.__exportStar(s, t)
})), define("spectrum/media_table/culled_media_row", ["require", "exports", "tslib", "classnames", "react", "spectrum/media_table/media_row"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.CulledMediaRow = function(e) {
        var t = e.className,
            a = e.topOffset,
            s = e.ref,
            l = e.style,
            c = r.__rest(e, ["className", "topOffset", "ref", "style"]),
            u = n.default("mc-media-row-culled", t),
            d = r.__assign({
                top: a
            }, l);
        return o.createElement(i.MediaRow, Object.assign({
            className: u,
            style: d,
            ref: s
        }, c))
    }, t.CulledMediaRow.displayName = "CulledMediaRow"
})), define("spectrum/media_table/media_actions", ["require", "exports", "tslib", "classnames", "react", "spectrum/button", "spectrum/overflow_button"], (function(e, t, r, n, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.MediaActions = function(e) {
        var t = e.className,
            i = r.__rest(e, ["className"]),
            a = n.default("mc-media-actions", t);
        return o.createElement("div", Object.assign({
            className: a
        }, i))
    }, t.MediaActions.displayName = "MediaActions", t.MediaActionsButton = function(e) {
        var t = e.isHovered,
            n = r.__rest(e, ["isHovered"]);
        return o.createElement(i.Button, Object.assign({
            variant: t ? "secondary" : "invisible"
        }, n))
    }, t.MediaActionsButton.displayName = "MediaActionsButton", t.MediaActionsOverflowButton = function(e) {
        var t = e.isHovered,
            n = r.__rest(e, ["isHovered"]);
        return o.createElement(a.OverflowButton, Object.assign({
            variant: t ? void 0 : "borderless"
        }, n))
    }, t.MediaActionsOverflowButton.displayName = "MediaActionsOverflowButton"
})), define("spectrum/media_table/media_cell", ["require", "exports", "tslib", "react", "spectrum/table", "spectrum/media_table/media_cell_text"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.MediaCell = function(e) {
        var t = e.accessory,
            a = e.children,
            s = e.className,
            l = e.icon,
            c = e.title,
            u = e.quote,
            d = e.subtitle,
            m = e.highlight,
            p = e.variant,
            f = void 0 === p ? "default" : p,
            h = r.__rest(e, ["accessory", "children", "className", "icon", "title", "quote", "subtitle", "highlight", "variant"]),
            _ = !(!c || !d) ? "mc-media-cell mc-media-cell-double-line" : "mc-media-cell",
            b = s ? _ + " " + s : _;
        return n.createElement(o.TableCell, Object.assign({
            className: b
        }, h), t && n.createElement("div", {
            className: "mc-media-cell-accessory"
        }, t), l && n.createElement("div", {
            className: "mc-media-cell-icon"
        }, l), (c || d) && n.createElement("div", {
            className: "mc-media-cell-content"
        }, c && n.createElement(i.MediaCellText, {
            variant: "default" === f ? "title" : "detail",
            highlight: m
        }, c), d && n.createElement(i.MediaCellText, {
            variant: "subtitle"
        }, d), u && n.createElement(i.MediaCellText, {
            variant: "quote"
        }, u)), a)
    }, t.MediaCell.displayName = "MediaCell"
})), define("spectrum/media_table/media_cell_text", ["require", "exports", "tslib", "react"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.MediaCellText = function(e) {
        var t = e.variant,
            o = void 0 === t ? "title" : t,
            i = e.highlight,
            a = e.className,
            s = r.__rest(e, ["variant", "highlight", "className"]),
            l = i ? "mc-media-cell-text mc-media-cell-text-" + o + " mc-media-cell-text-highlight" : "mc-media-cell-text mc-media-cell-text-" + o,
            c = a ? l + " " + a : l;
        return n.createElement("div", Object.assign({
            className: c
        }, s))
    }, t.MediaCellText.displayName = "MediaCellText"
})), define("spectrum/media_table/media_row", ["require", "exports", "tslib", "classnames", "react", "spectrum/table"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n);
    var a = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            return r.handleHover = function() {
                r.setState({
                    isHovered: !0
                })
            }, r.handleBlur = function() {
                r.setState({
                    isHovered: !1
                })
            }, r.state = {
                isHovered: !1
            }, r
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.borderless,
                a = void 0 !== t && t,
                s = e.children,
                l = e.className,
                c = e.doubleLine,
                u = void 0 !== c && c,
                d = e.onClick,
                m = e.ref,
                p = e.variant,
                f = e.deprecatedDoNotUseColumnFlex,
                h = r.__rest(e, ["borderless", "children", "className", "doubleLine", "onClick", "ref", "variant", "deprecatedDoNotUseColumnFlex"]),
                _ = this.state.isHovered,
                b = n.default("mc-media-row", {
                    "mc-media-row-border": !a,
                    "mc-media-row-clickable": !!d,
                    "mc-media-row-double-line": u,
                    "mc-media-row-dragover": "dragover" === p,
                    "mc-media-row-droppable": "droppable" === p,
                    "mc-media-row-inactive": "inactive" === p,
                    "mc-media-row-selected": "selected" === p
                }, l),
                v = (function(e) {
                    return "function" == typeof e
                })(s),
                g = s;
            v && (g = s({
                isHovered: _
            }));
            var y = r.__assign({
                className: b,
                onMouseEnter: v ? this.handleHover : void 0,
                onMouseLeave: v ? this.handleBlur : void 0,
                onClick: d,
                ref: m
            }, h);
            return f ? o.createElement(i.TableRowWithoutContext, Object.assign({
                columnFlex: f
            }, y), g) : o.createElement(i.TableRow, Object.assign({}, y), g)
        }, t
    })((o = r.__importStar(o)).PureComponent);
    t.MediaRow = a, a.displayName = "MediaRow", a.defaultProps = {
        doubleLine: !1
    }
})), define("spectrum/icon_templates/status", ["require", "exports", "tslib", "classnames", "react", "spectrum/icon_templates/css_utils"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.Component = function(e) {
        var t = e.name,
            a = e.icon,
            s = e.className,
            l = e.rotating,
            c = e.role,
            u = void 0 === c ? "img" : c,
            d = r.__rest(e, ["name", "icon", "className", "rotating", "role"]),
            m = n.default(i.getClassNamesForName("status", t), {
                "mc-icon-template-status-rotating": l
            }, s);
        return o.cloneElement(a, r.__assign({
            className: m,
            role: u
        }, d))
    }, t.Component.displayName = "IconTemplateStatus"
})), define("spectrum/progress_bar", ["require", "exports", "tslib", "spectrum/progress_bar/progress_bar"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t)
})), define("spectrum/progress_bar/progress_bar", ["require", "exports", "tslib", "react"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.ProgressBar = function(e) {
        var t = e.progress / 100;
        return n.createElement("div", {
            className: "mc-progress-bar-bg"
        }, n.createElement("div", {
            className: "mc-progress-bar-fg",
            style: {
                transform: "scaleX(" + t + ")"
            }
        }))
    }, t.ProgressBar.displayName = "ProgressBar"
})), define("spectrum/scroll_monitor", ["require", "exports", "tslib", "spectrum/scroll_monitor/element_scroll_monitor", "spectrum/scroll_monitor/window_scroll_monitor"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t), r.__exportStar(o, t)
})), define("spectrum/scroll_monitor/element_scroll_monitor", ["require", "exports", "tslib", "react", "spectrum/util/raf_throttle", "spectrum/scroll_monitor/utils"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            r.lastFromTop = null, r.lastTotalTop = null, r.lastFromBottom = null, r.lastTotalBottom = null, r.reportScroll = function() {
                var e = r.props.onScroll,
                    t = i.getElementScrollMeasurements(r.scrollElement),
                    n = t.fromBottom,
                    o = t.fromTop,
                    a = t.innerHeight,
                    s = t.totalBottom,
                    l = t.totalTop,
                    c = o !== r.lastFromTop || l !== r.lastTotalTop,
                    u = n !== r.lastFromBottom || s !== r.lastTotalBottom;
                r.lastFromTop = o, r.lastTotalTop = l, r.lastFromBottom = n, r.lastTotalBottom = s, (c || u) && e({
                    fromBottom: n,
                    fromTop: o,
                    innerHeight: a,
                    totalBottom: s,
                    totalTop: l
                })
            };
            var n = t.window;
            return r.throttle = new o.RafThrottle(r.reportScroll, n), r
        }
        return r.__extends(t, e), t.prototype.componentWillUnmount = function() {
            this.throttle.cancelPending()
        }, t.prototype.render = function() {
            var e = this,
                t = this.props,
                o = t.children,
                i = t.className,
                a = t.height,
                s = this.props,
                l = s.tagName,
                c = void 0 === l ? "div" : l;
            r.__rest(s, ["tagName"]);
            if (!o) return null;
            var u = {
                height: a,
                overflow: "auto",
                position: "relative"
            };
            return n.createElement(c, {
                children: o,
                className: i,
                onScroll: this.throttle.request,
                ref: function(t) {
                    return e.scrollElement = t
                },
                style: u
            })
        }, t
    })((n = r.__importStar(n)).Component);
    t.ElementScrollMonitor = a, a.displayName = "ElementScrollMonitor", a.defaultProps = {
        tagName: "div"
    }
})), define("spectrum/scroll_monitor/utils", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getWindowScrollMeasurements = function(e) {
        var t = e || window,
            r = t.document,
            n = t.innerHeight,
            o = t.pageYOffset,
            i = r.documentElement,
            a = r.body,
            s = i.scrollHeight,
            l = i.scrollTop;
        return {
            fromBottom: s - (n + o),
            fromTop: Math.max(l, a.scrollTop),
            innerHeight: n,
            totalBottom: s - n,
            totalTop: s
        }
    }, t.getElementScrollMeasurements = function(e) {
        var t = e.scrollHeight,
            r = e.clientHeight,
            n = e.scrollTop;
        return {
            fromBottom: t - (r + n),
            fromTop: n,
            innerHeight: r,
            totalBottom: t - r,
            totalTop: t
        }
    }
})), define("spectrum/scroll_monitor/window_scroll_monitor", ["require", "exports", "tslib", "react", "spectrum/util/raf_throttle", "spectrum/scroll_monitor/utils"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            r.lastFromTop = null, r.lastTotalTop = null, r.lastFromBottom = null, r.lastTotalBottom = null, r.reportScroll = function() {
                var e = r.props,
                    t = e.onScroll,
                    n = e.window,
                    o = i.getWindowScrollMeasurements(n),
                    a = o.fromBottom,
                    s = o.fromTop,
                    l = o.innerHeight,
                    c = o.totalBottom,
                    u = o.totalTop,
                    d = s !== r.lastFromTop || u !== r.lastTotalTop,
                    m = a !== r.lastFromBottom || c !== r.lastTotalBottom;
                r.lastFromTop = s, r.lastTotalTop = u, r.lastFromBottom = a, r.lastTotalBottom = c, (d || m) && t({
                    fromBottom: a,
                    fromTop: s,
                    totalBottom: c,
                    totalTop: u,
                    innerHeight: l
                })
            };
            var n = t.window;
            return r.throttle = new o.RafThrottle(r.reportScroll, n), r
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.setupScrollListeners()
        }, t.prototype.componentWillUnmount = function() {
            this.destroyScrollListeners(), this.throttle.cancelPending()
        }, t.prototype.render = function() {
            var e = this.props.children,
                t = this.props,
                o = t.tagName,
                i = void 0 === o ? "div" : o,
                a = (t.window, t.onScroll, r.__rest(t, ["tagName", "window", "onScroll"]));
            return e ? n.createElement(i, Object.assign({}, a)) : null
        }, t.prototype.setupScrollListeners = function() {
            this.props.window.addEventListener("scroll", this.throttle.request, {
                passive: !0
            })
        }, t.prototype.destroyScrollListeners = function() {
            this.props.window.removeEventListener("scroll", this.throttle.request)
        }, t
    })((n = r.__importStar(n)).Component);
    t.WindowScrollMonitor = a, a.displayName = "WindowScrollMonitor", a.defaultProps = {
        tagName: "div",
        window: "undefined" != typeof window ? window : void 0
    }
})), define("spectrum/snackbar", ["require", "exports", "tslib", "spectrum/snackbar/snackbar"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t)
})), define("spectrum/snackbar/snackbar", ["require", "exports", "tslib", "classnames", "react", "spectrum/button", "spectrum/icon_status", "spectrum/progress_bar"], (function(e, t, r, n, o, i, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.SnackbarAction = function(e) {
        var t = e.className,
            a = r.__rest(e, ["className"]),
            s = n.default("mc-snackbar-actions", t);
        return o.createElement(i.Button, Object.assign({
            variant: "styleless",
            className: s
        }, a))
    }, t.SnackbarAction.displayName = "SnackbarAction", t.Snackbar = function(e) {
        var t, r, i, l, c = e.className,
            u = e.children,
            d = e.disablePositioningAndBackdrop,
            m = void 0 !== d && d,
            p = e.progress,
            f = void 0 === p ? 0 : p,
            h = e.title,
            _ = e.variant,
            b = void 0 === _ ? "generic" : _;
        "sync" === b && (r = !0, t = o.createElement(s.ProgressBar, {
            progress: f
        })), "generic" !== b && (i = !0, l = o.createElement("div", {
            className: "mc-snackbar-icon"
        }, o.createElement(a.IconStatus, {
            name: b,
            rotating: r,
            "aria-hidden": !0
        })));
        var v = n.default("mc-snackbar", c),
            g = n.default("mc-snackbar-container", {
                "mc-snackbar-container--snackbar-icon": i
            }),
            y = o.createElement("div", {
                className: v
            }, o.createElement("div", {
                className: g
            }, l, o.createElement("p", {
                className: "mc-snackbar-title"
            }, h), u), t);
        return m ? y : o.createElement("div", {
            className: "mc-snackbar-holder-backdrop"
        }, y)
    }, t.Snackbar.displayName = "Snackbar"
})), define("spectrum/table", ["require", "exports", "tslib", "spectrum/table/culled_table", "spectrum/table/fixed_table_head", "spectrum/table/table", "spectrum/table/table_body", "spectrum/table/table_row", "spectrum/table/table_cell", "spectrum/table/table_head", "spectrum/table/table_head_cell"], (function(e, t, r, n, o, i, a, s, l, c, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(n, t), r.__exportStar(o, t), r.__exportStar(i, t), r.__exportStar(a, t), r.__exportStar(s, t), r.__exportStar(l, t), r.__exportStar(c, t), r.__exportStar(u, t)
})), define("spectrum/table/culled_table", ["require", "exports", "tslib", "react", "spectrum/culled_list", "spectrum/table/table_row"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), t.CulledTableBody = function(e) {
        return n.createElement(o.CulledList, Object.assign({
            tagName: "tbody",
            className: "mc-table-body mc-table-body-culled"
        }, e))
    }, t.CulledTableBody.displayName = "CulledTableBody", t.CulledTableRow = function(e) {
        var t = e.topOffset,
            o = e.ref,
            a = r.__rest(e, ["topOffset", "ref"]);
        return n.createElement(i.TableRow, Object.assign({
            className: "mc-table-row-culled",
            style: {
                top: t
            },
            ref: o
        }, a))
    }, t.CulledTableRow.displayName = "CulledTableRow"
})), define("spectrum/table/fixed_table_head", ["require", "exports", "tslib", "classnames", "react", "spectrum/dimensions", "spectrum/vertically_fixed", "spectrum/table/table_row"], (function(e, t, r, n, o, i, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.FixedTableHead = function(e) {
        var t = e.children,
            l = e.className,
            c = e.ref,
            u = e.window,
            d = e.tableRowRole,
            m = e.tableRowTagName,
            p = e.tagName,
            f = void 0 === p ? "thead" : p,
            h = r.__rest(e, ["children", "className", "ref", "window", "tableRowRole", "tableRowTagName", "tagName"]),
            _ = n.default("mc-table-head", "mc-table-head-fixed", l);
        return o.createElement(i.Dimensions, Object.assign({
            tagName: f,
            className: _,
            ref: c
        }, h), (function(e) {
            var n = e.width,
                i = e.height;
            return o.createElement(a.VerticallyFixed, {
                window: u,
                tag: function(e) {
                    var a = e.style;
                    return o.createElement(s.TableRow, {
                        style: r.__assign({
                            width: n,
                            height: i
                        }, a),
                        className: "mc-table-head-row mc-table-head-row-fixed",
                        role: d,
                        tagName: m
                    }, t)
                }
            })
        }))
    }, t.FixedTableHead.displayName = "FixedTableHead"
})), define("spectrum/table/table", ["require", "exports", "tslib", "classnames", "react", "prop-types"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), i = r.__importStar(i);
    var a = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.getChildContext = function() {
            var e = this;
            return {
                getColumnFlex: function() {
                    return e.props.columnFlex
                }
            }
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                i = (e.columnFlex, e.tagName),
                a = void 0 === i ? "table" : i,
                s = r.__rest(e, ["className", "columnFlex", "tagName"]),
                l = n.default("mc-table", t);
            return o.createElement(a, Object.assign({
                role: "table",
                className: l
            }, s))
        }, t
    })(o.PureComponent);
    t.Table = a, a.displayName = "Table", a.childContextTypes = {
        getColumnFlex: i.func
    }
})), define("spectrum/table/table_body", ["require", "exports", "tslib", "classnames", "react"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.TableBody = function(e) {
        var t = e.className,
            i = e.tagName,
            a = void 0 === i ? "tbody" : i,
            s = r.__rest(e, ["className", "tagName"]),
            l = n.default("mc-table-body", t);
        return o.createElement(a, Object.assign({
            className: l
        }, s))
    }, t.TableBody.displayName = "TableBody"
})), define("spectrum/table/table_cell", ["require", "exports", "tslib", "react", "prop-types"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importStar(o);
    var i = (function(e) {
        function t() {
            var t = e.apply(this, arguments) || this;
            return t.flex = 1, t
        }
        return r.__extends(t, e), t.prototype.UNSAFE_componentWillMount = function() {
            this.flex = this.context.getCellFlex()
        }, t.prototype.UNSAFE_componentWillUpdate = function() {
            this.flex = this.context.getCellFlex()
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.align,
                o = void 0 === t ? "left" : t,
                i = e.className,
                a = (e.ref, e.style),
                s = e.tagName,
                l = void 0 === s ? "td" : s,
                c = e.useThTag,
                u = r.__rest(e, ["align", "className", "ref", "style", "tagName", "useThTag"]),
                d = this.flex,
                m = "right" === o ? "mc-table-cell mc-table-cell-align-right" : "mc-table-cell",
                p = i ? m + " " + i : m,
                f = r.__assign({
                    flex: d
                }, a);
            return c ? n.createElement("th", Object.assign({
                className: p,
                style: f
            }, u)) : n.createElement(l, Object.assign({
                className: p,
                style: f
            }, u))
        }, t
    })(n.Component);
    t.TableCell = i, i.displayName = "TableCell", i.contextTypes = {
        getCellFlex: o.func
    }
})), define("spectrum/table/table_head", ["require", "exports", "tslib", "classnames", "react", "spectrum/table/table_row"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.TableHead = function(e) {
        var t = e.children,
            a = e.className,
            s = e.tableRowRole,
            l = e.tableRowTagName,
            c = e.tagName,
            u = void 0 === c ? "thead" : c,
            d = r.__rest(e, ["children", "className", "tableRowRole", "tableRowTagName", "tagName"]),
            m = n.default("mc-table-head", a);
        return o.createElement(u, Object.assign({
            className: m
        }, d), o.createElement(i.TableRow, {
            className: "mc-table-head-row",
            role: s,
            tagName: l
        }, t))
    }, t.TableHead.displayName = "TableHead"
})), define("spectrum/table/table_head_cell", ["require", "exports", "tslib", "classnames", "react", "spectrum/table/table_cell"], (function(e, t, r, n, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o), t.TableHeadCell = function(e) {
        var t = e.className,
            a = e.ref,
            s = e.tagName,
            l = void 0 === s ? "th" : s,
            c = r.__rest(e, ["className", "ref", "tagName"]),
            u = n.default("mc-table-head-cell", t);
        return o.createElement(i.TableCell, Object.assign({
            className: u,
            ref: a,
            tagName: l
        }, c))
    }, t.TableHeadCell.displayName = "TableHeadCell"
})), define("spectrum/table/table_row", ["require", "exports", "tslib", "react", "prop-types"], (function(e, t, r, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importStar(o);
    var i = (function(e) {
        function t() {
            var t = e.apply(this, arguments) || this;
            return t.currentCellIndex = 0, t
        }
        return r.__extends(t, e), t.prototype.getColumnFlex = function() {}, t.prototype.getChildContext = function() {
            var e = this;
            return {
                getCellFlex: function() {
                    var t = e.getColumnFlex(),
                        r = t && t[e.currentCellIndex] || 1;
                    return e.currentCellIndex++, r
                }
            }
        }, t.prototype.UNSAFE_componentWillUpdate = function() {
            this.currentCellIndex = 0
        }, t
    })(n.Component);
    i.displayName = "TableRow", i.contextTypes = {
        getColumnFlex: o.func
    }, i.childContextTypes = {
        getCellFlex: o.func
    };
    var a = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.getColumnFlex = function() {
            return this.props.columnFlex
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = (e.columnFlex, e.tagName),
                o = void 0 === n ? "tr" : n,
                i = r.__rest(e, ["className", "columnFlex", "tagName"]);
            return l(t, o, i)
        }, t
    })(i);
    t.TableRowWithoutContext = a;
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.getColumnFlex = function() {
            return this.context.getColumnFlex()
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.tagName,
                o = void 0 === n ? "tr" : n,
                i = r.__rest(e, ["className", "tagName"]);
            return l(t, o, i)
        }, t
    })(i);
    t.TableRow = s, s.contextTypes = {
        getColumnFlex: o.func
    };
    var l = function(e, t, r) {
        var o = e ? "mc-table-row " + e : "mc-table-row";
        return n.createElement(t, Object.assign({
            className: o
        }, r))
    }
}));
//# sourceMappingURL=pkg-mcl-additional.min.js-vflASFZcZ.map