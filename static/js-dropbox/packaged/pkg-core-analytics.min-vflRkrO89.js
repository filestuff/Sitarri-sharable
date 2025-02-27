define("modules/clean/analytics", ["require", "exports", "tslib", "modules/clean/ajax", "modules/clean/insecure_uuid", "modules/clean/viewer", "modules/clean/amp_web_logger"], (function(e, t, n, r, i, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), (function(e) {
        e.SUGGESTION_ACCEPTED = "suggest_invite_modal_accepted", e.SUGGESTION_DISMISSED = "suggest_invite_modal_dismissed", e.SUGGESTION_MODAL_OPENED = "suggest_invite_modal_opened"
    })(t.SuggestInvitingSharedUsersModalEvents || (t.SuggestInvitingSharedUsersModalEvents = {})), t.PROJECT_MAGNET_ORIGIN = "magnet", t.get_uids_for_logging = function(e) {
        var t = o.Viewer.get_viewer();
        return e ? [e] : t.get_users().map((function(e) {
            return e.id
        }))
    };
    var s = {
        modal_open: ["modal"],
        modal_close: ["modal"],
        link_click: ["link_id", "origin_href", "link_rank"],
        link_no_session_storage: ["link_id", "origin_href", "link_rank"],
        element_click: ["element_id"],
        page_view: ["page"]
    };
    t.UXAnalyticsLogger = {
        log: function(e, t, n, i) {
            var o = {
                url: "/log/ux_analytics",
                data: {
                    event_type: e,
                    extra_params: JSON.stringify(t)
                }
            };
            try {
                if (i && i.includes(e)) {
                    var l = {};
                    if (t && e in s) s[e].forEach((function(e) {
                        e in t && t[e] && (l[e] = t[e])
                    }));
                    a.AMPWebLogger.logEventCount("uxa_events", e, l)
                }
            } catch (e) {}
            n ? r.SilentBackgroundBeaconRequest(o) : r.SilentBackgroundRequest(o)
        }
    }, t.GrowthEventsLogger = {
        log: function(e, t, n, i) {
            r.SilentBackgroundRequest({
                url: "/log/pro_events",
                data: {
                    event: e,
                    extra: JSON.stringify(t),
                    is_client: !!i
                },
                success: n || void 0,
                error: n || void 0
            })
        }
    }, (function(e) {
        e.BUY_TRY_PAGE_CHECKOUT = "buy_try_page_checkout", e.BUY_TRY_PAGE_CHECKOUT_CRASH = "buy_try_page_checkout_crash"
    })(t.ProEventNames || (t.ProEventNames = {})), t.ProEventsLogger = {
        log: function(e, t, n, i, o) {
            r.SilentBackgroundRequest({
                url: "/log/pro_events",
                data: {
                    event: e,
                    extra: JSON.stringify(t),
                    is_client: !!i,
                    project: o
                },
                success: n || void 0,
                error: n || void 0
            })
        }
    }, t.ProWebActivityLogger = {
        log: function(e, t, n) {
            r.SilentBackgroundRequest({
                url: "/log/pro_web_activity",
                data: {
                    endpoint_name: e,
                    url: t,
                    query_params: n ? JSON.stringify(n) : void 0
                }
            })
        }
    }, t.RestorationStepsLogger = {
        generate_restore_id: function(e) {
            return {
                type: "restore",
                value: "restore#" + e + "#" + i.InsecureUUID.v4()
            }
        },
        restore_id_from_string: function(e) {
            return {
                type: "restore",
                value: e
            }
        },
        log_step: function(e) {
            var t = e.postHandler || void 0;
            r.SilentBackgroundRequest({
                url: "/log/restoration_step/step",
                data: {
                    restore_id: e.restoreId.value,
                    step: e.step,
                    extra: JSON.stringify(e.extra)
                },
                subject_user: e.userId,
                success: t,
                error: t
            })
        },
        log_entry: function(e) {
            var n = e.postHandler || void 0,
                i = e.restoreId || t.RestorationStepsLogger.generate_restore_id(e.userId);
            return r.SilentBackgroundRequest({
                url: "/log/restoration_step/entry",
                data: {
                    restore_id: i.value,
                    step: e.step,
                    entry_point: e.entry_point,
                    extra: JSON.stringify(e.extra)
                },
                subject_user: e.userId,
                success: n,
                error: n
            }), i
        },
        log_success: function(e) {
            var t = e.postHandler || void 0;
            r.SilentBackgroundRequest({
                url: "/log/restoration_step/success",
                data: {
                    restore_id: e.restoreId.value,
                    step: e.step,
                    success: e.success || "success",
                    extra: JSON.stringify(e.extra)
                },
                subject_user: e.userId,
                success: t,
                error: t
            })
        },
        log_failure: function(e) {
            var t = e.postHandler || void 0;
            r.SilentBackgroundRequest({
                url: "/log/restoration_step/failure",
                data: {
                    restore_id: e.restoreId.value,
                    step: e.step,
                    failure: e.failure,
                    extra: JSON.stringify(e.extra)
                },
                subject_user: e.userId,
                success: t,
                error: t
            })
        }
    }, t.PreviewActivityLogger = {
        start_times: {},
        start: function(e, n) {
            t.PreviewActivityLogger.start_times[e] = n || Date.now()
        },
        stop: function(e, n) {
            null != t.PreviewActivityLogger.start_times[e] && (n.total_time = Date.now() - t.PreviewActivityLogger.start_times[e], t.PreviewActivityLogger.log(e, n), delete t.PreviewActivityLogger.start_times[e])
        },
        log: function(e, t) {
            r.SilentBackgroundRequest({
                url: "/preview_activity_log",
                data: {
                    event_name: e,
                    input_method: t.input_method,
                    file_ext: t.file_ext,
                    extra: t.extra
                }
            })
        }
    }, t.MobileFilePreviewLogger = {
        log: function(e, t, n, i, o, a) {
            r.SilentBackgroundRequest({
                url: "/log/mobile_file_preview",
                data: {
                    client_time: +new Date,
                    event_name: e,
                    file_viewer_session_id: t,
                    file_preview_session_id: n,
                    file_ns_id: i,
                    file_sjid: o,
                    extra: JSON.stringify(a)
                }
            })
        }
    }, t.SearchClientActivityLogger = {
        create_search_log_dict: function(e, t, n, r, i, o, a) {
            return null != t && (e.request_id = t), null != n && (e.latency = (new Date).getTime() - n), null != r && (e.query_string = r), null != i && (e.result_count = i), null != o && "200" !== o && (e.failure_type = o), null != a && (e.search_session_id = a), e
        },
        log: function(e, t, i) {
            r.SilentBackgroundRequest({
                url: "/searchclientlogger",
                subject_user: t,
                data: n.__assign(n.__assign({
                    event_name: e,
                    typeahead_session_id: i.search_session_id
                }, i), {
                    extra: JSON.stringify(i.extra)
                })
            })
        }
    }, t.ShareTibEventLogger = {
        log: function(e, t, n, i) {
            r.SilentBackgroundRequest({
                url: "/share_tib_log",
                data: {
                    event: t,
                    origin: n,
                    extra: JSON.stringify(i)
                },
                subject_user: e
            })
        },
        log_unauth: function(e, t, n) {
            r.SilentBackgroundRequest({
                url: "/share_tib_log_unauth",
                data: {
                    event: e,
                    origin: t,
                    extra: JSON.stringify(n)
                }
            })
        }
    }, t.SharingExperimentsLogger = {
        log: function(e, t, n) {
            void 0 === n && (n = {}), r.SilentBackgroundRequest({
                url: "/log/sharing_experiments",
                data: {
                    action_type: t,
                    action_extras: JSON.stringify(n)
                },
                subject_user: e
            })
        }
    }, t.TeamsWebActionsLogger = {
        LOG_CATEGORY: {
            PROMO_TEAMS: "promo_teams",
            TEAM_INFO: "team_info",
            UPGRADE: "upgrade_to_dfb",
            USAGE_INFO: "usage_info",
            LIMITED_TEAM_INFO_DETAILED: "limited_team_info_detailed",
            TEAM_AND_USER_INFO: "team_and_user_info"
        },
        log: function(e, n, i, o, a, s) {
            var l = t.get_uids_for_logging(o);
            return new Promise((function(t, o) {
                r.SilentBackgroundRequest({
                    url: "/teamswalogger",
                    data: {
                        event_name: e,
                        extra: n ? JSON.stringify(n) : void 0,
                        for_uids: JSON.stringify(l),
                        log_category: s,
                        restricted: a ? "1" : void 0
                    },
                    success: i || void 0,
                    error: i || void 0
                }).then(t, o)
            }))
        },
        log_for_category: function(e, n, r) {
            t.TeamsWebActionsLogger.log(e, r, void 0, void 0, !1, n)
        }
    }, t.IntentLogger = {
        log: function(e, t, i, a) {
            var s = (function(e, t) {
                    void 0 === t && (t = !0);
                    var n = o.Viewer.get_viewer();
                    return e ? [n.get_user_by_id(e).account_id] : n.get_account_ids ? n.get_account_ids(t) : []
                })(a),
                l = {};
            t && t.extra && (l = t.extra, delete t.extra);
            var c = n.__assign({
                event_name: e,
                extra: JSON.stringify(l),
                for_acc_ids: JSON.stringify(s)
            }, t);
            r.SilentBackgroundRequest({
                url: "/intentlogger",
                data: c,
                success: i || void 0,
                error: i || void 0
            })
        }
    }, t.UserActivityLogger = {
        start_times: {},
        start: function(e, n, r) {
            t.UserActivityLogger.start_times[n] = r || Date.now()
        },
        stop: function(e, n, r, i) {
            null != t.UserActivityLogger.start_times[n] && (r.total_time = Date.now() - t.UserActivityLogger.start_times[n], t.UserActivityLogger.log(e, n, r, i), delete t.UserActivityLogger.start_times[n])
        },
        log: function(e, n, i, o) {
            i = i || {};
            var a = t.get_uids_for_logging(o);
            r.SilentBackgroundRequest({
                url: "/ualogger",
                data: {
                    platform: e,
                    event_name: n,
                    extra: JSON.stringify(i),
                    for_uids: JSON.stringify(a)
                }
            })
        }
    }, t.WebMiscActivityLogger = {
        log: function(e, n, i, o) {
            var a = t.get_uids_for_logging(i);
            r.SilentBackgroundRequest({
                url: "/misclogger",
                data: {
                    event_name: e,
                    extra: JSON.stringify(n),
                    for_uids: JSON.stringify(a)
                },
                success: o || void 0,
                error: o || void 0
            })
        }
    };
    var l = (function() {
        function e(e, t) {
            void 0 === e && (e = null), this.context = e, this.search_mode = t, this._clear_buffers()
        }
        return e.prototype._clear_buffers = function() {
            this.selection_buffer = [], this.timing_buffer = [], this.total_searches = 0, this.slow_searches = 0, this.downloaded_contacts = null, this.downloading_time = null
        }, e.prototype.add_record = function(e) {
            e.deleted = !1, this.selection_buffer.push(e)
        }, e.prototype.flag_record_as_removed = function(e) {
            for (var t = 0, n = this.selection_buffer; t < n.length; t++) {
                var r = n[t];
                if (r.contact_id === e && !r.deleted) return void(r.deleted = !0)
            }
        }, e.prototype.add_timing_record = function(e) {
            this.timing_buffer.push(e)
        }, e.prototype.count_search = function(e) {
            this.total_searches += 1, e && (this.slow_searches += 1)
        }, e.prototype.add_downloading_stats = function(e) {
            e && (this.downloading_time = e.downloading_time, this.downloaded_contacts = e.num_contacts)
        }, e.prototype.log_records = function(e, t, n) {
            void 0 === n && (n = 0);
            var i = {
                events: JSON.stringify(this.selection_buffer),
                canceled: t
            };
            if (this.total_searches || this.timing_buffer.length) {
                var o = {
                    context: this.context,
                    search_mode: this.search_mode,
                    total_searches: this.total_searches,
                    slow_searches: this.slow_searches,
                    downloading_time: this.downloading_time,
                    downloaded_contacts: this.downloaded_contacts
                };
                i.total_contacts = n, i.timing_events = JSON.stringify(this.timing_buffer), i.session_summary = JSON.stringify(o)
            }
            r.SilentBackgroundRequest({
                url: "/contact_search_log",
                subject_user: e,
                data: i
            }), this._clear_buffers()
        }, e
    })();
    t.ContactSearchLogger = l, t.LegacySharingVortexLogger = {
        log: function(e) {
            r.SilentBackgroundRequest({
                url: "/legacy_sharing_vortex_log",
                data: {
                    event_name: e
                }
            })
        }
    }, t.WebOnboardingLogger = {
        log: function(e, t, n, i, o) {
            r.SilentBackgroundRequest({
                url: "/log/onboarding",
                data: {
                    module_name: t,
                    event_name: n,
                    status: i,
                    extra: JSON.stringify(o)
                },
                subject_user: e
            })
        }
    }, t.NQOQLogger = {
        logViewModal: function(e, n) {
            var r = {
                modal_type: n.modal_type
            };
            t.ProEventsLogger.log(e + "_view", r)
        },
        logCloseModal: function(e, n) {
            var r = {
                modal_type: n.modal_type,
                cta_type: "close"
            };
            t.ProEventsLogger.log(e + "_click_close", r)
        },
        logPreviewLink: function(e, n) {
            var r = {
                modal_type: n.modal_type,
                cta_type: "secondary",
                cta_text: "preview link"
            };
            t.ProEventsLogger.log(e + "_click_secondary_preview", r)
        },
        logCancelModal: function(e, n) {
            var r = {
                modal_type: n.modal_type,
                cta_type: "secondary",
                cta_text: "cancel"
            };
            t.ProEventsLogger.log(e + "_click_secondary_cancel", r)
        },
        logAcceptModal: function(e, n) {
            var r = {
                modal_type: n.modal_type,
                cta_type: "primary",
                cta_text: n.cta_text
            };
            t.ProEventsLogger.log(e + "_click_primary", r)
        }
    }, (function(e) {
        e.PRO = "pro", e.PLUS = "plus", e.BUY_TOP = "buy_top", e.BUY_BOTTOM = "buy_bottom", e.BUSINESS = "business", e.PRO_TRY = "pro_try", e.BUY_PLUS = "buy_plus"
    })(t.LowSpaceEventNames || (t.LowSpaceEventNames = {})), t.LowSpaceLogger = {
        logView: function(e) {
            t.ProEventsLogger.log("low_space" + (e ? "_sharing" : "") + "_view")
        },
        logCtaClick: function(e, n, r, i) {
            void 0 === r && (r = {}), t.ProEventsLogger.log("low_space" + (n ? "_sharing" : "") + "_cta_click_" + e, r, i)
        }
    }, (function(e) {
        e.PRO = "pro", e.PLUS = "plus", e.BUY_TOP = "buy_top", e.BUY_BOTTOM = "buy_bottom", e.BUSINESS = "business", e.PRO_TRY = "pro_try", e.BUY_PLUS = "buy_plus"
    })(t.OutOfSpaceEventNames || (t.OutOfSpaceEventNames = {})), t.OutOfSpaceLogger = {
        logView: function() {
            t.ProEventsLogger.log("out_of_space_view")
        },
        logCtaClick: function(e, n, r) {
            void 0 === n && (n = {}), t.ProEventsLogger.log("out_of_space_cta_click_" + e, n, r)
        }
    }
})), define("modules/clean/ux_analytics", ["require", "exports", "modules/clean/ux_analytics/lazy_ux_analytics", "modules/clean/ux_analytics/ux_variants", "modules/clean/ux_analytics/window_history_listeners"], (function(e, t, n, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });

    function o() {
        return (new Date).getTime()
    }

    function a() {
        var e = document.documentElement;
        return (window.pageYOffset || e.scrollTop) - (e.clientTop || 0)
    }

    function s(e) {
        return void 0 === e && (e = window), e.location.href
    }

    function l() {
        var e, t = {},
            n = (void 0 === e && (e = window), e.location.search);
        if (n.length)
            for (var r = 0, i = n.substring(1).replace(/&amp;/g, "&").split("&"); r < i.length; r++) {
                var o = i[r].split("="),
                    a = o[0],
                    s = o[1];
                a && s && (a = a.trim(), s = s.trim(), a.length && s.length && (t[a] = decodeURIComponent(s.replace(/\+/g, " "))))
            }
        return t
    }

    function c(e) {
        return e && e.hasAttribute("data-uxa-log")
    }

    function u(e) {
        return e && "A" === e.nodeName
    }

    function g(e) {
        return e && e.getAttribute("data-trackingid")
    }

    function d(e) {
        return e && "BODY" === e.nodeName
    }

    function _() {
        return Math.random().toString().slice(2)
    }
    t.UXA_HISTORY_CHANGE_EVENT = "historyChange", t.UXA_VIEW_UPDATE_EVENT = "viewUpdate";
    var f, v, m = (function() {
            var e = null,
                t = "uxa.onedoesnotsimplyusesessionstorage";
            try {
                (e = window.sessionStorage) && (e.setItem(t, t), e.removeItem(t))
            } catch (t) {
                e = null
            }
            return e
        })(),
        h = (f = window).hasOwnProperty("JSON") ? f.JSON : null;
    (function(e) {
        function t(e) {
            return "uxa." + e
        }
        var n = m,
            r = h;

        function i(e) {
            return n ? (n.removeItem(t(e)), null) : null
        }
        e.isEnabled = function() {
            return !!n
        }, e.get = function(e) {
            if (!n || !r) return null;
            try {
                var i = n.getItem(t(e));
                return null === i ? null : r.parse(i)
            } catch (e) {
                return null
            }
        }, e.set = function(e, o) {
            if (!n || !r) return null;
            try {
                return null === o ? i(e) : (n.setItem(t(e), r.stringify(o)), null)
            } catch (e) {
                return null
            }
        }, e.remove = i, e.clear = function(e) {
            return n ? (n.clear(), null) : null
        }
    })(v = t.UXStorage || (t.UXStorage = {}));
    var p = {
            heartbeat: "heartbeat",
            linkClick: "link_click",
            elementClick: "element_click",
            linkNoSessionStorage: "link_no_session_storage",
            modalClose: "modal_close",
            modalOpen: "modal_open",
            pageView: "page_view",
            scroll: "scroll_event",
            finalHeartbeat: "final_heartbeat",
            spaPageView: "spa_page_view"
        },
        y = new Set(Object.keys(p).map((function(e) {
            return p[e]
        }))),
        S = "clicked_link",
        k = "tracking_params",
        w = "visit_id",
        E = "previous_url",
        O = "last_active_time",
        b = /\/account|\/share|\/buy|\/pro\/try/;
    var L = (function() {
        function e(e, n, r) {
            var l = this;
            void 0 === r && (r = !0), this.currentModalId = null, this.lastScrollOffset = 0, this.scrollTimer = null, this.startHeartbeat = function() {
                for (var e = 0, t = [2, 5, 10, 15, 30]; e < t.length; e++) {
                    var n = t[e];
                    setTimeout(l.logOnPage.bind(l, p.heartbeat), 1e3 * n)
                }
                for (var r = 0, i = [1, 2, 4, 9]; r < i.length; r++) {
                    n = i[r];
                    setTimeout(l.logOnPage.bind(l, p.heartbeat), 60 * n * 1e3)
                }
            }, this.delayedInit = function() {
                l.saveTrackingParams(), l.setupListeners(), l.logPageView(), l.logDelayedClickEvent()
            }, this.getListeners = function() {
                return [
                    [window, "scroll", l.handleScroll],
                    [window, "pageshow", l.handlePageShow],
                    [window, "unload", l.handlePageClose],
                    [document.body, "mousedown", l.handleMousedown],
                    [document.body, "keydown", l.handleKeyboardEnter],
                    [document, "modalOpened", l.trackModalShow],
                    [document, "modalClosed", l.trackModalHide],
                    [window, t.UXA_HISTORY_CHANGE_EVENT, l.onDBHistoryChange],
                    [document, t.UXA_VIEW_UPDATE_EVENT, function(e) {
                        return l.logViewUpdate(e)
                    }],
                    [window, i.SPA_HISTORY_STATE_CHANGE, l.handleHistoryStateChange]
                ]
            }, this.trackScrolling = function() {
                l.scrollTimer && clearTimeout(l.scrollTimer), l.scrollTimer = setTimeout(l.onScroll, 500)
            }, this.handleScroll = (function(e, t, n) {
                void 0 === n && (n = {});
                var r = null,
                    i = 0;
                return function() {
                    var a = o();
                    i || !1 !== n.leading || (i = a);
                    var s = t - (a.valueOf() - i.valueOf()),
                        l = arguments;
                    if (s <= 0 || s > t) r && (clearTimeout(r), r = null), i = a, e.apply(null, l), l = null;
                    else if (!r && !1 !== n.trailing) {
                        var c = function() {
                            i = !1 === n.leading ? 0 : o(), r = null, e.apply(null, l), l = null
                        };
                        r = setTimeout(c, s)
                    }
                }
            })(this.trackScrolling, 2e3, {
                leading: !0
            }), this.onScroll = function() {
                var e = a();
                l.lastScrollOffset !== e && (l.lastScrollOffset = e, l.logOnPage(p.scroll, {
                    vertical_offset: e
                }))
            }, this.handlePageShow = function(e) {
                if (e.persisted) {
                    l.cleanSessionStorage();
                    var t = v.get(E);
                    v.set(E, s()), l.previousUrl = t, l.visitId = v.get(w), setTimeout(l.delayedInit, 200)
                }
            }, this.handlePageClose = function(e) {
                var t = {};
                t.vertical_offset = t.vertical_offset || a(), t.time_on_page = t.time_on_page || l.getTimeOnPage(), l.logEvent(l.createEvent(p.finalHeartbeat, t))
            }, this.handleElementClick = function(e) {
                var t = (function(e) {
                    for (var t = e, n = 0; n < 6 && !c(t) && !d(t); n++) {
                        var r = t.parentNode;
                        if (!(r instanceof HTMLElement)) break;
                        t = r
                    }
                    return t
                })(e.target);
                if (c(t)) {
                    var n = t.getBoundingClientRect(),
                        r = l.createEvent(p.elementClick, {
                            left: Math.round(n.left),
                            element_id: t.getAttribute("data-uxa-log"),
                            element_rank: l.getElementRank(t),
                            time_on_page: l.getTimeOnPage(),
                            top: Math.round(n.top),
                            vertical_offset: a(),
                            tag_name: t.tagName.toLowerCase()
                        });
                    l.logEvent(r)
                }
            }, this.handleLinkClick = function(e) {
                var t = (function(e) {
                    for (var t = e, n = 0; n < 6 && (!u(t) && !g(t)) && !d(t); n++) {
                        var r = t.parentNode;
                        if (!(r instanceof HTMLElement)) break;
                        t = r
                    }
                    return t
                })(e.target);
                if (u(t) || g(t)) {
                    var n = t.getBoundingClientRect(),
                        r = l.createEvent(p.linkClick, {
                            left: Math.round(n.left),
                            link_id: t.getAttribute("data-trackingid"),
                            link_rank: l.getLinkRank(t),
                            origin_href: t.getAttribute("href"),
                            time_on_page: l.getTimeOnPage(),
                            top: Math.round(n.top),
                            vertical_offset: a(),
                            tag_name: t.tagName.toLowerCase()
                        });
                    l.delayedLinkClickLogging && u(t) ? l.storeDelayedLinkClick(r) : l.logEvent(r)
                }
            }, this.onDBHistoryChange = function(e) {
                var t;
                t = e.detail.url, b.test(t) && (v.set(E, s()), l.previousUrl = e.detail.previousUrl, ++l.requestSeq, l.logPageView())
            }, this.handleHistoryStateChange = function(e) {
                var t = v.get(E);
                v.set(E, s()), l.previousUrl = t, ++l.requestSeq, l.logSpaPageView(e.detail.eventSource)
            }, this.handleMousedown = function(e) {
                l.handleLinkClick(e), l.handleElementClick(e)
            }, this.handleKeyboardEnter = function(e) {
                13 === e.keyCode && (l.handleLinkClick(e), l.handleElementClick(e))
            }, this._modalIdSanitizer = function(e) {
                if ("upsell-home-modal" === e.id) {
                    var t = Array.from(e.classList).find((function(e) {
                        return e.indexOf("db-modal-custom-") > -1
                    }));
                    if (t) return t.replace("db-modal-custom-", "")
                }
                return e.id
            }, this.trackModalShow = function() {
                var e = document.querySelectorAll(l.modalClass),
                    t = Array.from(e).find((function(e) {
                        return "none" !== window.getComputedStyle(e).display || e.classList.contains("clean-react-modal") || e.classList.contains("uxa-modal-tracking-span")
                    }));
                t && (l.currentModalId = l._modalIdSanitizer(t) || "n/a -- file bug to acquisition-core-eng", l.logModal(p.modalOpen, l.currentModalId))
            }, this.trackModalHide = function() {
                l.currentModalId && (l.logModal(p.modalClose, l.currentModalId), l.currentModalId = null)
            }, i.installHistoryListeners(), this.cleanSessionStorage();
            var _ = v.get(E) || n.previousUrl;
            v.set(E, s()), this.requestId = n.requestId, this.orgReferrer = n.orgReferrer, this.httpReferrer = n.httpReferrer, this.previousUrl = _, this.visitId = v.get(w), this.requestSeq = 0, this.event_names = n.event_names, this.logger = e, void 0 !== n.delayed_link_click_logging ? this.delayedLinkClickLogging = n.delayed_link_click_logging : this.delayedLinkClickLogging = !0, void 0 !== n.modal_class ? this.modalClass = n.modal_class : this.modalClass = ".uxa-modal", this.initTime = o(), this.startHeartbeat(), r ? setTimeout(this.delayedInit, 200) : this.delayedInit()
        }
        return e.initialize = function(t, n, r, i) {
            if (void 0 === r && (r = null), void 0 === i && (i = !0), null === e.singleton) e.singleton = new e(t, n, i);
            else if (r) {
                [
                    ["requestId", n.requestId, e.singleton.requestId],
                    ["orgReferrer", n.orgReferrer, e.singleton.orgReferrer],
                    ["httpReferrer", n.httpReferrer, e.singleton.httpReferrer],
                    ["configs.delayed_link_click_logging", n.delayed_link_click_logging, e.singleton.delayedLinkClickLogging],
                    ["configs.event_names", n.event_names, e.singleton.event_names],
                    ["configs.modal_class", n.modal_class, e.singleton.modalClass]
                ].forEach((function(e) {
                    var t = e[0],
                        n = e[1],
                        i = e[2];
                    void 0 !== n && n !== i && r(new Error("UX Analytics initialize overload attempt; " + t + " '" + n + "' !== '" + i + "'"))
                }))
            }
            return e.singleton
        }, e.prototype.setupListeners = function() {
            this.getListeners().forEach((function(e) {
                var t = e[0],
                    n = e[1],
                    r = e[2];
                t.addEventListener(n, r)
            })), n.uxaIsListening()
        }, e.prototype.cleanupListeners = function() {
            this.getListeners().forEach((function(e) {
                var t = e[0],
                    n = e[1],
                    r = e[2];
                t.removeEventListener(n, r)
            }))
        }, e.prototype.cleanSessionStorage = function() {
            var e = (new Date).getTime(),
                t = v.get(w),
                n = v.get(O);
            null === t ? v.set(w, _()) : null !== n && e - n >= 18e5 && (v.remove(E), v.set(w, _())), v.set(O, e)
        }, e.prototype.logPageView = function() {
            this.logEvent(this.createEvent(p.pageView))
        }, e.prototype.logSpaPageView = function(e) {
            this.logEvent(this.createEvent(p.spaPageView, {
                spa_source: e
            }))
        }, e.prototype.logModal = function(e, t) {
            var n = {
                modal: t
            };
            this.logOnPage(e, n, !0)
        }, e.prototype.logViewUpdate = function(e) {
            var t = e.detail,
                n = {
                    view: t.viewId,
                    view_step: t.viewStep
                };
            this.logOnPage("view_update", n, !0)
        }, e.prototype.logDelayedClickEvent = function() {
            if (!v.isEnabled()) return null;
            var e = v.get(S);
            if (e) try {
                e.destination_url = s();
                var t = {
                    eventName: p.linkClick,
                    extra: e
                };
                this.logEvent(t), v.remove(S)
            } catch (e) {}
            return null
        }, e.prototype.logOnPage = function(e, t, n) {
            void 0 === t && (t = {}), void 0 === n && (n = !1);
            var r = this.getTimeOnPage();
            t.vertical_offset = t.vertical_offset || a(), t.time_on_page = t.time_on_page || r, (r < 600 || n) && this.logEvent(this.createEvent(e, t))
        }, e.prototype.logEvent = function(e) {
            try {
                if (t = e.eventName, !y.has(t)) throw new Error("UXAnalytics.log: trying to log an invalid event (" + e.eventName + ")");
                r.addMatchedVariantsToEvent(e), e.eventName === p.finalHeartbeat ? this.logger.log(e.eventName, e.extra, !0, this.event_names) : this.logger.log(e.eventName, e.extra, !1, this.event_names)
            } catch (e) {
                throw e
            }
            var t
        }, e.prototype.createEvent = function(e, t) {
            if (void 0 === t && (t = {}), this.orgReferrer && (t.org_referrer = this.orgReferrer), this.visitId && (t.visit_id = this.visitId), t.request_seq = this.requestSeq, this.httpReferrer && (t.http_referrer = this.httpReferrer), this.previousUrl && (t.previous_url = this.previousUrl), t.request_id = t.request_id || this.requestId, t.url = t.url || s(), location.hash && (t.hash_fragment = location.hash), t.uxa_v = 2.2, this.trackingParams)
                for (var n = 0, r = Object.keys(this.trackingParams); n < r.length; n++) {
                    var i = r[n],
                        o = i.replace(/^_/, ""),
                        a = this.trackingParams[i];
                    t["param_" + o] = a
                }
            return {
                eventName: e,
                extra: t
            }
        }, e.prototype.storeDelayedLinkClick = function(e) {
            if (!v.isEnabled()) return this.logOnPage(p.linkNoSessionStorage), !1;
            try {
                v.set(S, e.extra)
            } catch (e) {
                return !1
            }
            return !0
        }, e.prototype.saveTrackingParams = function() {
            var e = this.getTrackingParams();
            Object.keys(e).length ? (v.set(k, e), this.trackingParams = e) : this.trackingParams = null
        }, e.prototype.getTrackingParams = function() {
            for (var e = v.get(k) || {}, t = l(), n = 0, r = ["gclid", "oqa", "trigger", "msclkid", "_tk", "_camp", "_ad", "_net", "_kw", "utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term", "fbclid"]; n < r.length; n++) {
                var i = r[n];
                t.hasOwnProperty(i) && (e[i] = t[i])
            }
            return e
        }, e.prototype.getTimeOnPage = function() {
            return Math.round((o() - this.initTime) / 1e3)
        }, e.prototype.getElementRank = function(e) {
            var t = e.nodeName.toLowerCase(),
                n = e.getAttribute("data-uxa-log"),
                r = document.querySelectorAll(t + '[data-uxa-log="' + n + '"]');
            if (1 === r.length) return 1;
            for (var i = 0; i < r.length; i++)
                if (r[i] === e) return i + 1;
            return -1
        }, e.prototype.getLinkRank = function(e) {
            var t = e.getAttribute("href"),
                n = document.querySelectorAll('a[href="' + t + '"]');
            if (1 === n.length) return 1;
            for (var r = 0; r < n.length; r++)
                if (n[r] === e) return r + 1;
            return -1
        }, e.singleton = null, e
    })();
    t.UXAnalytics = L
})), define("modules/clean/amp_web_logger", ["require", "exports", "modules/clean/metrics/index"], (function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = (function() {
        function e() {
            this.metricsReporter = n.getMetricsReporter()
        }
        return e.prototype.logEventCount = function(e, t, n, r) {
            void 0 === r && (r = 1);
            var i = {};
            for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
            this.metricsReporter.createStats({
                ns: e,
                name: t
            }, i).record(r)
        }, e
    })();
    t.AMPLoggerSingleton = r, t.AMPWebLogger = new r
}));
//# sourceMappingURL=pkg-core-analytics.min.js-vflPoTZo1.map