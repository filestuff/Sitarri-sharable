define("modules/clean/legacy_pyxl_controllers/tooltip", ["require", "exports", "tslib", "external/lodash", "modules/core/controller_helpers", "modules/clean/analytics"], (function(t, e, o, r, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = o.__importStar(r), i = o.__importStar(i);
    var a = [],
        l = (function() {
            function t(t, e, o, n, a) {
                this.$wrapper = t, this.prompt = this.$wrapper.find(".tooltip-prompt"), this.tooltip = this.$wrapper.find(".tooltip-tooltip"), this.hover_target = this.find_hover_target(), this.hover_log_event_name = a, this.position_global = e, this.tooltip_location = o, this.listen();
                var l = i.clone_element(this.tooltip).appendTo("body");
                l.css({
                    position: "static",
                    display: "inline-block"
                });
                var u = n || 500,
                    s = l.width() + 1;
                if (s > u && (s = u), this.tooltip.css({
                        width: s,
                        position: "absolute",
                        display: "none"
                    }), l.remove(), this.position_global && this.tooltip.remove().appendTo("body"), this.is_focusable()) {
                    var c = r.uniqueId("tooltip-tooltip-");
                    this.tooltip.attr({
                        role: "tooltip",
                        id: c
                    }), this.hover_target.attr({
                        tabindex: 0,
                        "aria-describedby": c
                    })
                }
            }
            return t.initClass = function() {
                this.prototype.tooltip_shown = !1, this.prototype.position_global = !1
            }, t.prototype.listen = function() {
                var t = this;
                return (function() {
                    for (var e = [], o = 0, r = [t.hover_target, t.tooltip]; o < r.length; o++) {
                        var i = r[o];
                        i.mouseenter((function() {
                            return clearTimeout(t.tooltip.data("timeout_id")), t.show_tooltip()
                        })), i.mouseleave((function() {
                            var e = setTimeout((function() {
                                return t.hide_tooltip()
                            }), 200);
                            return t.tooltip.data("timeout_id", e)
                        })), t.is_focusable() ? (i.focusin((function() {
                            return clearTimeout(t.tooltip.data("timeout_id")), t.show_tooltip()
                        })), e.push(i.focusout((function() {
                            var e = setTimeout((function() {
                                return t.hide_tooltip()
                            }), 200);
                            return t.tooltip.data("timeout_id", e)
                        })))) : e.push(void 0)
                    }
                    return e
                })()
            }, t.prototype.find_hover_target = function() {
                return this.prompt
            }, t.prototype.is_focusable = function() {
                return !1
            }, t.prototype.show_tooltip = function(t) {
                var e, o, r, i;
                if (!this.tooltip_shown) {
                    r = this.position_global ? this.hover_target.offset() : this.hover_target.position();
                    for (var l = 0, u = Array.from(a); l < u.length; l++) {
                        u[l].hide_tooltip()
                    }
                    return a.push(this), "top" === this.tooltip_location ? (i = r.top - this.tooltip.outerHeight() - this.hover_target.height() / 2, o = r.left - this.tooltip.outerWidth() / 2, e = {
                        top: "-=7"
                    }) : "left" === this.tooltip_location ? (i = r.top - this.tooltip.outerHeight() / 2 + this.hover_target.outerHeight() / 2, o = r.left - this.tooltip.outerWidth() - 2, e = {
                        left: "-=7"
                    }) : "bottom" === this.tooltip_location ? (i = r.top + this.hover_target.outerHeight(), o = r.left - this.tooltip.outerWidth() / 2 + this.hover_target.outerWidth() / 2, e = {
                        top: "+=7"
                    }) : (i = r.top - this.tooltip.outerHeight() / 2 + this.hover_target.outerHeight() / 2, o = r.left + this.hover_target.width() + 2, e = {
                        left: "+=7"
                    }), this.tooltip.css({
                        top: i,
                        left: o
                    }).show().animate(e, 50), this.hover_log_event_name && n.TeamsWebActionsLogger.log(this.hover_log_event_name), this.tooltip_shown = !0
                }
            }, t.prototype.hide_tooltip = function() {
                if (this.tooltip_shown) {
                    clearTimeout(this.tooltip.data("timeout_id")), this.tooltip.hide(), this.tooltip_shown = !1;
                    var t = a.indexOf(this);
                    return -1 !== t ? a.splice(t, 1) : void 0
                }
            }, t
        })();
    e.DBTooltip = l, l.initClass();
    var u = (function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return o.__extends(e, t), e.prototype.find_hover_target = function() {
            return this.prompt.find(".sprite")
        }, e.prototype.is_focusable = function() {
            return !0
        }, e
    })(l);
    e.InfoTooltip = u
})), define("modules/clean/legacy_ui_button", ["require", "exports", "tslib", "jquery"], (function(t, e, o, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = o.__importDefault(r);
    e.default = function() {
        var t = r.default(document);
        return r.default(document).on("mouseover.ui-button", ".ui-button", (function() {
            return r.default(this).addClass("over")
        })).on("mouseout.ui-button", ".ui-button", (function() {
            return r.default(this).removeClass("over")
        })).on("mousedown.ui-button", ".ui-button", (function() {
            return r.default(this).addClass("down")
        })).on("click.ui-button", ".ui-button", (function() {
            var e = r.default(this);
            return e.hasClass("ui-button-dropdown") && (e.hasClass("active") ? t.trigger("dropdownClosed", [1]) : t.trigger("dropdownOpened", [1])), e.toggleClass("active")
        })), t.on("click.ui-button", (function(e) {
            var o = r.default(e.target).closest(".ui-button.active"),
                i = 0;
            r.default(".ui-button.active").not(o).each((function() {
                var t = r.default(this);
                t.hasClass("active") && t.hasClass("ui-button-dropdown") && (i += 1), t.removeClass("active")
            })), t.trigger("dropdownClosed", [i])
        })).on("mouseup.ui-button", (function() {
            return r.default(".ui-button.down").removeClass("down")
        }))
    }
})), define("modules/clean/photos/legacy_thumb_loader", ["require", "exports", "tslib", "jquery", "modules/clean/photos/batch_thumb_loader", "modules/clean/sprite"], (function(t, e, o, r, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = o.__importDefault(r), n = o.__importDefault(n), e.LegacyBatchThumbLoader = {
        MAX_THUMB_BATCH_REQUESTS: 24,
        batch_load_thumbs: function(t, e, o, a) {
            for (var l = r.default.grep(t, (function(t) {
                    return r.default(t).data("src")
                })), u = {}, s = 0, c = l; s < c.length; s++) {
                var d = c[s],
                    f = String(r.default(d).data("src"));
                u[f] || (u[f] = []), u[f].push(d)
            }
            this.instance ? this.instance.reset({
                batch_size: e,
                batch_logger: a
            }) : this.instance = new i.BatchThumbLoader({
                batch_size: e,
                max_parallel_requests: this.MAX_THUMB_BATCH_REQUESTS,
                on_batch: function(t) {
                    for (var e = 0, o = t; e < o.length; e++) {
                        var i = o[e],
                            n = r.default(u[i]);
                        n.data("src", null), [].push(n.data("loading-src", i))
                    }
                },
                batch_logger: a
            });
            for (var p = 0, g = l; p < g.length; p++) {
                var h = g[p],
                    _ = r.default(h),
                    b = _.data("src");
                this.instance.queue_thumb(b, function(t, e, r, i) {
                    if (i || e.data("loading-src")) {
                        if (e.data("loading-src", null), 0 === r.indexOf("data:image")) return e.attr("src", r), "function" == typeof o ? o(e[0]) : void 0;
                        e.error((function() {
                            return e.attr("src", e.data("fail-src") || n.default.SPACER)
                        })), e.load((function() {
                            return "function" == typeof o ? o(e[0]) : void 0
                        })), e.attr("src", r)
                    }
                }.bind(this, b, _))
            }
            return this.instance.flush(), l.length
        },
        clear_all_pending_batches: function() {
            this.instance && this.instance.clear()
        }
    }
})), define("modules/clean/shared_link_error", ["require", "exports", "tslib", "jquery", "modules/clean/ajax"], (function(t, e, o, r, i) {
    "use strict";
    var n, a;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = o.__importDefault(r), i = o.__importStar(i), a = void 0, (n = (function() {
        function t() {
            r.default("#broken-share-article").on("click", (function() {
                return i.WebRequest({
                    url: "/shared_link_error_log",
                    data: {
                        evt: a
                    }
                })
            }))
        }
        return t.initClass = function() {
            a = "click-sharing-article"
        }, t
    })()).initClass(), n = n, e.default = n
})), define("modules/clean/marketing_tracker", ["require", "exports", "tslib", "modules/core/exception", "proto_utils/unpack", "dropbox/proto/js_init_data/marketing_tracker/marketing_tracker"], (function(t, e, o, r, i, n) {
    "use strict";
    var a;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r = o.__importStar(r), e.MARKETING_URI = "https://marketing.dropbox.com", e.MARKETING_LOGIN_EVENT = "user_login", e.MARKETING_REGISTER_EVENT = "user_register", (function(t) {
        t.Link = "link", t.View = "view"
    })(a = e.EventTypeEnum || (e.EventTypeEnum = {}));
    var l = function() {
        var t = this;
        return this.el = null, this.ready = !1, this.readyTimeout = null, this.push = function(i) {
            var n = i.src,
                l = i.dataLayer,
                u = i.config,
                s = i.eventType,
                c = o.__assign(o.__assign({}, l), {
                    _config: u || {},
                    _eventType: s || a.Link
                });
            r.assert(!!n, "MarketingTracker.push requires src"), t.ready ? t.el && t.el.contentWindow && t.el.contentWindow.postMessage(c, e.MARKETING_URI) : (t.el || (t.el = t.load(n), t.src = n, u && (t.config = u), t.readyTimeout = setTimeout((function() {
                r.reportException({
                    err: new Error("Timed-out while waiting for marketing_tracker iframe load event"),
                    severity: "non-critical"
                })
            }), 3e4)), t.el.addEventListener("load", (function() {
                null !== t.readyTimeout && (clearTimeout(t.readyTimeout), t.readyTimeout = null), t.el && t.el.contentWindow ? (t.ready = !0, t.el.contentWindow.postMessage(c, e.MARKETING_URI)) : r.reportException({
                    err: new Error("Could not find contentWindow on marketing_tracker iframe element"),
                    severity: "non-critical"
                })
            })))
        }, this.load = function(t) {
            var e = document.createElement("iframe");
            return e.style.display = "none", e.hidden = !0, e.src = t, e.setAttribute("sandbox", "allow-scripts allow-same-origin"), document.body.appendChild(e), e
        }, this.pushWithDefaults = function(e, i) {
            var n = t,
                a = n.config,
                l = n.src;
            if (a) {
                var u = {
                    config: a,
                    dataLayer: o.__assign(o.__assign({}, t.config.default_marketing_data), e),
                    src: l,
                    eventType: i
                };
                t.push(u)
            } else r.reportStack("MarketingTracker.pushWithDefaults requires config, which is undefined. This probably           means there is no MarketingTracker instance on the page.")
        }, this.pushEvent = function(e, r, i) {
            var n = o.__assign({
                event: e,
                tealium_event: e
            }, i);
            t.pushWithDefaults(n, r)
        }, this.tryPushEvent = function(e, r, i) {
            var n = t,
                l = n.config,
                u = n.src,
                s = {
                    event: e,
                    tealium_event: e
                };
            if (i = i || {}, l) {
                var c = {
                    config: l,
                    dataLayer: o.__assign(o.__assign(o.__assign({}, t.config.default_marketing_data), s), i),
                    src: u,
                    eventType: r || a.Link
                };
                t.push(c)
            }
        }, e.MarketingTracker ? e.MarketingTracker : this
    };
    e.getGAEventData = function(t, e, o, r) {
        var i = {
            ga_eventaction: e,
            ga_eventCategory: t
        };
        return o && (i.ga_eventLabel = o), r && (i.ga_eventValue = r), i
    }, e.getGAViewData = function(t, e, o) {
        var i = {};
        return r.assert(!o || o.startsWith("/virtual"), "virtual pageview page should start with virtual"), t && (i.title = t), e && (i.ga_pageview_location = e), o && (i.ga_pageview_page = o), i
    }, e.MarketingTracker = new l;
    var u = function(t) {
        for (var e = {}, o = t.fields, r = 0, i = Object.keys(o); r < i.length; r++) {
            var n = i[r],
                a = o[n];
            e[n] = a[a.kind]
        }
        return e
    };
    e.moduleInit = function(t) {
        var o = i.unpackProto(t, n.marketing_tracker.MarketingTrackerData),
            r = o.src,
            a = {
                gtm_disabled: o.config.gtmDisabled,
                gtm_id: o.config.gtmId,
                tealium_enabled: o.config.tealiumEnabled,
                tealium_env: o.config.tealiumEnv,
                tealium_profile: o.config.tealiumProfile,
                default_marketing_data: u(o.config.defaultMarketingData)
            },
            l = u(o.dataLayer);
        e.MarketingTracker.push({
            src: r,
            config: a,
            dataLayer: l
        })
    }
})), define("dropbox/proto/js_init_data/marketing_tracker/marketing_tracker", ["require", "exports", "tslib", "protobufjs/minimal", "google/protobuf/struct"], (function(t, e, o, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i, n = (r = o.__importStar(r)).Reader,
        a = r.Writer,
        l = (r.util, r.roots.default || (r.roots.default = {}));
    e.default = l, e.marketing_tracker = l.marketing_tracker = ((i = l.marketing_tracker || {}).Config = (function(t) {
        function t(t) {
            if (t)
                for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] && (this[e[o]] = t[e[o]])
        }
        return t.prototype.gtmDisabled = !1, t.prototype.gtmId = "", t.prototype.tealiumEnabled = !1, t.prototype.tealiumEnv = "", t.prototype.tealiumProfile = "", t.prototype.defaultMarketingData = null, t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            return e || (e = a.create()), null != t.gtmDisabled && Object.hasOwnProperty.call(t, "gtmDisabled") && e.uint32(8).bool(t.gtmDisabled), null != t.gtmId && Object.hasOwnProperty.call(t, "gtmId") && e.uint32(18).string(t.gtmId), null != t.tealiumEnabled && Object.hasOwnProperty.call(t, "tealiumEnabled") && e.uint32(24).bool(t.tealiumEnabled), null != t.tealiumEnv && Object.hasOwnProperty.call(t, "tealiumEnv") && e.uint32(34).string(t.tealiumEnv), null != t.tealiumProfile && Object.hasOwnProperty.call(t, "tealiumProfile") && e.uint32(42).string(t.tealiumProfile), null != t.defaultMarketingData && Object.hasOwnProperty.call(t, "defaultMarketingData") && l.google.protobuf.Struct.encode(t.defaultMarketingData, e.uint32(50).fork()).ldelim(), e
        }, t.decode = function(t, e) {
            t instanceof n || (t = n.create(t));
            for (var o = void 0 === e ? t.len : t.pos + e, r = new l.marketing_tracker.Config; t.pos < o;) {
                var i = t.uint32();
                switch (i >>> 3) {
                    case 1:
                        r.gtmDisabled = t.bool();
                        break;
                    case 2:
                        r.gtmId = t.string();
                        break;
                    case 3:
                        r.tealiumEnabled = t.bool();
                        break;
                    case 4:
                        r.tealiumEnv = t.string();
                        break;
                    case 5:
                        r.tealiumProfile = t.string();
                        break;
                    case 6:
                        r.defaultMarketingData = l.google.protobuf.Struct.decode(t, t.uint32());
                        break;
                    default:
                        t.skipType(7 & i)
                }
            }
            return r
        }, t
    })(i.Config || {}), i.MarketingTrackerData = (function(t) {
        function t(t) {
            if (t)
                for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] && (this[e[o]] = t[e[o]])
        }
        return t.prototype.src = "", t.prototype.config = null, t.prototype.dataLayer = null, t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            return e || (e = a.create()), null != t.src && Object.hasOwnProperty.call(t, "src") && e.uint32(10).string(t.src), null != t.config && Object.hasOwnProperty.call(t, "config") && l.marketing_tracker.Config.encode(t.config, e.uint32(18).fork()).ldelim(), null != t.dataLayer && Object.hasOwnProperty.call(t, "dataLayer") && l.google.protobuf.Struct.encode(t.dataLayer, e.uint32(26).fork()).ldelim(), e
        }, t.decode = function(t, e) {
            t instanceof n || (t = n.create(t));
            for (var o = void 0 === e ? t.len : t.pos + e, r = new l.marketing_tracker.MarketingTrackerData; t.pos < o;) {
                var i = t.uint32();
                switch (i >>> 3) {
                    case 1:
                        r.src = t.string();
                        break;
                    case 2:
                        r.config = l.marketing_tracker.Config.decode(t, t.uint32());
                        break;
                    case 3:
                        r.dataLayer = l.google.protobuf.Struct.decode(t, t.uint32());
                        break;
                    default:
                        t.skipType(7 & i)
                }
            }
            return r
        }, t
    })(i.MarketingTrackerData || {}), i)
})), define("google/protobuf/struct", ["require", "exports", "tslib", "protobufjs/minimal"], (function(t, e, o, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i, n, a, l, u = (r = o.__importStar(r)).Reader,
        s = r.Writer,
        c = r.util,
        d = r.roots.default || (r.roots.default = {});
    e.default = d, e.google = d.google = ((i = d.google || {}).protobuf = ((n = i.protobuf || {}).Struct = (function(t) {
        function t(t) {
            if (this.fields = {}, t)
                for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] && (this[e[o]] = t[e[o]])
        }
        return t.prototype.fields = c.emptyObject, t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            if (e || (e = s.create()), null != t.fields && Object.hasOwnProperty.call(t, "fields"))
                for (var o = Object.keys(t.fields), r = 0; r < o.length; ++r) e.uint32(10).fork().uint32(10).string(o[r]), d.google.protobuf.Value.encode(t.fields[o[r]], e.uint32(18).fork()).ldelim().ldelim();
            return e
        }, t.decode = function(t, e) {
            t instanceof u || (t = u.create(t));
            for (var o, r = void 0 === e ? t.len : t.pos + e, i = new d.google.protobuf.Struct; t.pos < r;) {
                var n = t.uint32();
                switch (n >>> 3) {
                    case 1:
                        t.skip().pos++, i.fields === c.emptyObject && (i.fields = {}), o = t.string(), t.pos++, i.fields[o] = d.google.protobuf.Value.decode(t, t.uint32());
                        break;
                    default:
                        t.skipType(7 & n)
                }
            }
            return i
        }, t
    })(n.Struct || {}), n.Value = (function(t) {
        function t(t) {
            if (t)
                for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] && (this[e[o]] = t[e[o]])
        }
        var e;
        return t.prototype.nullValue = 0, t.prototype.numberValue = 0, t.prototype.stringValue = "", t.prototype.boolValue = !1, t.prototype.structValue = null, t.prototype.listValue = null, Object.defineProperty(t.prototype, "kind", {
            get: c.oneOfGetter(e = ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]),
            set: c.oneOfSetter(e)
        }), t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            return e || (e = s.create()), null != t.nullValue && Object.hasOwnProperty.call(t, "nullValue") && e.uint32(8).int32(t.nullValue), null != t.numberValue && Object.hasOwnProperty.call(t, "numberValue") && e.uint32(17).double(t.numberValue), null != t.stringValue && Object.hasOwnProperty.call(t, "stringValue") && e.uint32(26).string(t.stringValue), null != t.boolValue && Object.hasOwnProperty.call(t, "boolValue") && e.uint32(32).bool(t.boolValue), null != t.structValue && Object.hasOwnProperty.call(t, "structValue") && d.google.protobuf.Struct.encode(t.structValue, e.uint32(42).fork()).ldelim(), null != t.listValue && Object.hasOwnProperty.call(t, "listValue") && d.google.protobuf.ListValue.encode(t.listValue, e.uint32(50).fork()).ldelim(), e
        }, t.decode = function(t, e) {
            t instanceof u || (t = u.create(t));
            for (var o = void 0 === e ? t.len : t.pos + e, r = new d.google.protobuf.Value; t.pos < o;) {
                var i = t.uint32();
                switch (i >>> 3) {
                    case 1:
                        r.nullValue = t.int32();
                        break;
                    case 2:
                        r.numberValue = t.double();
                        break;
                    case 3:
                        r.stringValue = t.string();
                        break;
                    case 4:
                        r.boolValue = t.bool();
                        break;
                    case 5:
                        r.structValue = d.google.protobuf.Struct.decode(t, t.uint32());
                        break;
                    case 6:
                        r.listValue = d.google.protobuf.ListValue.decode(t, t.uint32());
                        break;
                    default:
                        t.skipType(7 & i)
                }
            }
            return r
        }, t
    })(n.Value || {}), n.NullValue = (a = {}, (l = Object.create(a))[a[0] = "NULL_VALUE"] = 0, l), n.ListValue = (function(t) {
        function t(t) {
            if (this.values = [], t)
                for (var e = Object.keys(t), o = 0; o < e.length; ++o) null != t[e[o]] && (this[e[o]] = t[e[o]])
        }
        return t.prototype.values = c.emptyArray, t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            if (e || (e = s.create()), null != t.values && t.values.length)
                for (var o = 0; o < t.values.length; ++o) d.google.protobuf.Value.encode(t.values[o], e.uint32(10).fork()).ldelim();
            return e
        }, t.decode = function(t, e) {
            t instanceof u || (t = u.create(t));
            for (var o = void 0 === e ? t.len : t.pos + e, r = new d.google.protobuf.ListValue; t.pos < o;) {
                var i = t.uint32();
                switch (i >>> 3) {
                    case 1:
                        r.values && r.values.length || (r.values = []), r.values.push(d.google.protobuf.Value.decode(t, t.uint32()));
                        break;
                    default:
                        t.skipType(7 & i)
                }
            }
            return r
        }, t
    })(n.ListValue || {}), n), i)
}));
//# sourceMappingURL=pkg-legacy-ab.min.js-vflDEq-wZ.map