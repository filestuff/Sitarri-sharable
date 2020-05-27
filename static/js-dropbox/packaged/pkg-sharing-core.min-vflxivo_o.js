define("modules/clean/avatar/contact_avatar", ["require", "exports", "tslib", "react", "prop-types", "modules/clean/avatar/avatar_with_default", "modules/clean/avatar/initials_avatar", "modules/clean/avatar/size", "modules/clean/contacts/contact", "modules/clean/contacts/types", "modules/core/i18n", "modules/core/user_i18n"], (function(e, t, n, r, s, o, i, a, l, u, c, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importStar(s), o = n.__importDefault(o), u = n.__importDefault(u), d = n.__importStar(d);
    var p = r.default.createElement,
        h = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n.__extends(t, e), t.prototype.render = function() {
                var e, t, n = this.props.contact,
                    r = n.name || n.email,
                    s = n.photo_url;
                n.type === u.default.FB && (s = "https://graph.facebook.com/" + n.fb_id + "/picture");
                var l = "";
                this.props.dimension !== a.AVATAR_DIMENSION_BY_SIZE.XSMALL && (l = d.getInitials(r)), n.type === u.default.NEW_STYLE_GROUP ? (e = c.intl.formatMessage({
                    defaultMessage: "Group"
                }), t = "SQUARE") : (e = c.intl.formatMessage({
                    defaultMessage: "User"
                }), t = "CIRCLE");
                var h = {
                    alt: e,
                    dimension: this.props.dimension,
                    photoUrl: s,
                    shape: t,
                    optionalClass: this.props.optionalClass,
                    defaultAvatar: p(i.InitialsAvatarWithColorDerivedFromName, {
                        alt: e,
                        dimension: this.props.dimension,
                        name: r,
                        initials: l,
                        shape: t,
                        optionalClass: this.props.optionalClass
                    })
                };
                return p(o.default, h)
            }, t.displayName = "ContactAvatar", t.propTypes = {
                dimension: s.oneOf(a.VALID_AVATAR_DIMENSIONS).isRequired,
                contact: s.instanceOf(l.Contact).isRequired,
                optionalClass: s.string
            }, t
        })(r.default.Component);
    t.default = h
})), define("modules/clean/beacon", ["require", "exports", "tslib", "external/lodash", "jquery", "modules/clean/beacon_nodeps", "modules/clean/bolt_nodeps", "modules/core/exception"], (function(e, t, n, r, s, o, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), s = n.__importDefault(s), o = n.__importStar(o), i = n.__importStar(i), a = n.__importStar(a);
    var l = (function(e) {
        function t(t, n, o) {
            var i = e.call(this, t, n, o, "beacon.dropbox.com", s.default.ajax, r, a) || this;
            return i._token = t, i._authn_cb = n, i._authz_cb = o, i
        }
        return n.__extends(t, e), t
    })(o.Transmitter);
    t.Transmitter = l;
    var u = (function(e) {
        function t(t, n, o) {
            return e.call(this, t, n, o, i, "thunder.dropbox.com", s.default.ajax, r, a) || this
        }
        return n.__extends(t, e), t
    })(o.Receiver);
    t.Receiver = u, t.Agent = o.Agent, t.AgentStatus = o.AgentStatus, t.Platforms = o.Platforms, t.PresenceParams = o.PresenceParams, t.PresenceType = o.PresenceType, t.Source = o.Source, t.UserAppPresence = o.UserAppPresence, t.UserContextPresence = o.UserContextPresence
})), define("modules/clean/beacon_nodeps", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        WEB: 0,
        IOS: 1,
        ANDROID: 2,
        DESKTOP: 3
    };
    t.Platforms = n;
    var r = (function() {
        function e(e, t, r) {
            void 0 === r && (r = null), this.platform = e, this.surface = t, this.identifier = r;
            var s = !1;
            for (var o in n) {
                var i = n[o];
                if (this.platform === i) {
                    s = !0;
                    break
                }
            }
            if (!s) throw new Error("platform must be from Beacon.Platforms");
            if (this.surface.length > 32 || 0 === this.surface.length) throw new Error("surface must be populated and <= 32 chars.");
            if ((null != this.identifier ? this.identifier.length : void 0) > 128) throw new Error("identifier must be <= 128 chars.");
            null === this.identifier && (this.identifier = "")
        }
        return e.from_json = function(t) {
            return new e(t.platform, t.surface, t.identifier)
        }, e
    })();
    t.Source = r;
    var s = (function() {
        function e(e, t, n, r) {
            if (this.user_id = e, this.app = t, this.context = n, this.source = r, this.user_id.length > 256) throw new Error("user_id must be <= 256 chars.");
            if (this.app.length > 32 || 0 === this.app.length) throw new Error("app must be populated and <= 32 chars.");
            if (this.context.length > 64 || 0 === this.context.length) throw new Error("context must be populated and <= 64 chars.")
        }
        return e.from_json = function(t) {
            var n = r.from_json(t.source);
            return new e(t.user_id, t.app, t.context, n)
        }, e
    })();
    t.Agent = s;
    var o = (function() {
        function e(e, t, n) {
            if (void 0 === n && (n = null), this.agent = e, this.status = t, this.auth_key = n, this.status.length > 32) throw new Error("status must be <= 32 chars")
        }
        return e.from_json = function(t) {
            return new e(s.from_json(t.agent), t.status)
        }, e
    })();
    t.AgentStatus = o;
    var i = {
        UserContext: "UserContext",
        UserApp: "UserApp",
        Context: "Context"
    };
    t.PresenceType = i;
    var a = function(e, t, n, r, s) {
        if (this.type = e, this.user_id = t, this.app = n, this.context = r, this.token = s, this.type !== i.UserContext && this.type !== i.UserApp && this.type !== i.Context) throw new Error("Unsupported type: " + this.type + ".");
        if ((null != this.user_id ? this.user_id.length : void 0) > 256) throw new Error("user_id must be <= 256 chars.");
        if (this.app.length > 32) throw new Error("app must be <= 32 chars.");
        if ((null != this.context ? this.context.length : void 0) > 64) throw new Error("context must be <= 64 chars.")
    };
    t.PresenceParams = a;
    var l = function(e, t) {
        this.presence_params = e, this.agents = t
    };
    t.UserContextPresence = l;
    var u = (function() {
        function e(e, t) {
            this.presence_params = e, this.status = t
        }
        return e.initClass = function() {
            this.Status = {
                Offline: 1,
                Online: 2
            }
        }, e
    })();
    t.UserAppPresence = u, u.initClass();
    var c = function(e, t, n) {
            this.presence_params = e, this.snapshot = t, this.delta = n
        },
        d = (function() {
            function e(e, t, n, r, s, o, i) {
                void 0 === i && (i = null), this._heartbeat = this._heartbeat.bind(this), this._handle_heartbeat_success = this._handle_heartbeat_success.bind(this), this._handle_heartbeat_error = this._handle_heartbeat_error.bind(this), this._token = e, this._authn_cb = t, this._authz_cb = n, this._beacon_server = r, this._ajax = s, this._lodash = o, this._exclog = i, this._started = !1, this._heartbeat_xhr = null, this._timeout_id = null, this._presence_data = [], this._offline_agents = [], this._has_changes = !1
            }
            return e.prototype.start = function() {
                if (!this._started) return this._backoff_window = 5e3, this._started = !0, this._has_changes = !1, this._heartbeat()
            }, e.prototype.stop = function() {
                return this._started = !1, this._heartbeat_xhr = null, window.clearTimeout(this._timeout_id), this._timeout_id = null
            }, e.prototype.add_or_update_agents = function(e) {
                for (var t = 0, n = Array.from(e); t < n.length; t++) {
                    var r = n[t];
                    this._has_changes = this._add_or_update_agent(r) || this._has_changes
                }
                if (!this._heartbeat_xhr && this._started) return window.clearTimeout(this._timeout_id), this._timeout_id = window.setTimeout(this._heartbeat, 0)
            }, e.prototype.update_token = function(e) {
                this._token = e
            }, e.prototype._add_or_update_agent = function(e) {
                for (var t = 0; t < this._presence_data.length; t++) {
                    var n = this._presence_data[t];
                    if (this._lodash.isEqual(n.agent, e.agent)) return (n.status !== e.status || n.auth_key !== e.auth_key) && (this._presence_data[t] = e, !0)
                }
                return this._presence_data.push(e), !0
            }, e.prototype._heartbeat = function() {
                if (this._started && 0 !== this._presence_data.length) return this._offline_agents = this._presence_data.filter((function(e) {
                    return "" !== e.status
                })).map((function(e) {
                    return e.agent
                })), this._has_changes = !1, this._heartbeat_xhr = this._ajax({
                    url: "https://" + this._beacon_server + "/1/update",
                    type: "POST",
                    data: JSON.stringify({
                        token: this._token,
                        updates: this._presence_data
                    }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    timeout: 5e3,
                    success: this._handle_heartbeat_success,
                    error: this._handle_heartbeat_error,
                    xhrFields: {
                        withCredentials: !0
                    }
                })
            }, e.prototype._handle_heartbeat_success = function(e, t, n) {
                var r, o, i = this;
                if (this._heartbeat_xhr = null, this._started) {
                    for (var a = [], l = 0, u = Array.from(e.agent_errors || []); l < u.length; l++) {
                        var c = u[l],
                            d = c.error;
                        r = s.from_json(c.agent), "authorization_error" === d ? a.push(r) : "invalid_agent" === d && null != this._exclog && this._exclog.reportStack("Input error: " + c), this._presence_data = this._presence_data.filter((function(e) {
                            return !i._lodash.isEqual(e.agent, r)
                        }))
                    }
                    if (a.length) {
                        var p = this._authz_cb;
                        window.setTimeout((function() {
                            return p(a)
                        }), 0)
                    }
                    for (var h = 0, _ = Array.from(this._offline_agents); h < _.length; h++)
                        for (var f = _[h], m = 0; m < this._presence_data.length; m++) {
                            var g = this._presence_data[m];
                            if (this._lodash.isEqual(g.agent, f) && "" === g.status) {
                                this._presence_data.splice(m, 1);
                                break
                            }
                        }
                    return o = this._has_changes ? 0 : 6e4, this._backoff_window = 5e3, this._timeout_id = window.setTimeout(this._heartbeat, o)
                }
            }, e.prototype._handle_heartbeat_error = function(e, t, n) {
                if (this._heartbeat_xhr = null, this._started) {
                    if (e.status >= 400 && e.status < 500) {
                        if (401 === e.status) return window.setTimeout(this._authn_cb, 0), void this.stop();
                        400 === e.status && null != this._exclog && this._exclog.reportStack("Bad request: " + e.responseText)
                    }
                    var r = Math.random() * this._backoff_window;
                    return this._backoff_window = Math.min(2 * this._backoff_window, 12e4), this._timeout_id = window.setTimeout(this._heartbeat, r)
                }
            }, e
        })();
    t.Transmitter = d;
    var p = (function() {
        function e(e, t, n, r, s, o, i, a) {
            var l = this;
            void 0 === a && (a = null), this._compact_context_updates = this._compact_context_updates.bind(this), this._on_update = this._on_update.bind(this), this._on_refresh = this._on_refresh.bind(this), this._presence_params = e, this._update_callback = t, this._refresh_callback = n, this._bolt = r, this._thunder_hostname = s, this._ajax = o, this._lodash = i, this._exclog = a;
            var u = Array.from(this._presence_params).map((function(e) {
                return l._presence_params_to_bolt_channel(e)
            }));
            this._thunder_client = new this._bolt.ThunderClient(u, this._on_update, this._on_refresh, this._thunder_hostname, this._ajax, this._lodash, this._exclog)
        }
        return e.prototype.start = function() {
            return this._thunder_client.start()
        }, e.prototype.stop = function() {
            return this._thunder_client.unsubscribe()
        }, e.prototype.add_presence_params = function(e) {
            var t = this,
                n = this._presence_params.length;
            if (this._presence_params = this._lodash.union(e, this._presence_params), this._presence_params.length === n) return !1;
            this._thunder_client.unsubscribe();
            var r = Array.from(this._presence_params).map((function(e) {
                return t._presence_params_to_bolt_channel(e)
            }));
            return this._thunder_client = new this._bolt.ThunderClient(r, this._on_update, this._on_refresh, this._thunder_hostname, this._ajax, this._lodash, this._exclog), this._thunder_client.start(), !0
        }, e.prototype._presence_params_to_bolt_channel = function(e) {
            switch (e.type) {
                case i.UserContext:
                    return new this._bolt.SignedChannelState("beacon_uc-" + e.app, e.user_id + "|" + e.context, "0", e.token);
                case i.UserApp:
                    return new this._bolt.SignedChannelState("beacon_ua-" + e.app, e.user_id, "0", e.token);
                case i.Context:
                    return new this._bolt.SignedChannelState("beacon_c-" + e.app, e.context, "0", e.token);
                default:
                    throw new Error("Unknown type: " + e.type)
            }
        }, e.prototype._bolt_channel_to_presence_params = function(e) {
            var t, n = e.app_id.split("-"),
                r = e.unique_id.split("|");
            if (2 !== n.length) throw new Error("Unexpected format of Bolt app_id: " + e.app_id + ".");
            var s = n[1],
                o = "",
                l = "";
            switch (n[0]) {
                case "beacon_uc":
                    if (2 !== r.length) throw new Error("Unexpected format of beacon_uc: " + e.unique_id + ".");
                    t = i.UserContext, o = r[0], l = r[1];
                    break;
                case "beacon_ua":
                    if (1 !== r.length) throw new Error("Unexpected format of beacon_ua: " + e.unique_id + ".");
                    t = i.UserApp, o = r[0];
                    break;
                case "beacon_c":
                    if (1 !== r.length) throw new Error("Unexpected format of beacon_c: " + e.unique_id + ".");
                    t = i.Context, l = r[0];
                    break;
                default:
                    throw new Error("Unknown Bolt app_id: " + e.app_id + ".")
            }
            return new a(t, o, s, l, null)
        }, e.prototype._compact_context_updates = function(e, t) {
            for (var n, r, s = !1, o = [], i = 0, a = Array.from(t); i < a.length; i++) {
                var l = a[i];
                if (null != l.snapshot) s = !0, o = l.snapshot;
                else if (null != l.delta)
                    for (var u = 0, d = Array.from(l.delta); u < d.length; u++) {
                        for (var p = d[u], h = !1, _ = 0; _ < o.length; _++) {
                            var f = o[_];
                            if (this._lodash.isEqual(f.agent, p.agent)) {
                                h = !0, o[_] = p;
                                break
                            }
                        }
                        h || o.push(p)
                    }
            }
            return s ? (r = o, n = null) : (r = null, n = o), new c(e, r, n)
        }, e.prototype._on_update = function(e) {
            for (var t, n, a = this, c = [], d = 0, p = Array.from(e); d < p.length; d++) {
                var h = p[d],
                    _ = h.channel_state,
                    f = new this._bolt.ChannelId(_.app_id, _.unique_id),
                    m = this._bolt_channel_to_presence_params(f);
                c.push((function() {
                    var e;
                    switch (m.type) {
                        case i.UserContext:
                            return e = null != (n = h.payloads.slice(-1)[0].payload).agents ? (function() {
                                for (var e = [], r = 0, s = Array.from(n.agents); r < s.length; r++) t = s[r], e.push(o.from_json(t));
                                return e
                            })() : [], new l(m, e);
                        case i.UserApp:
                            return n = h.payloads.slice(-1)[0].payload, new u(m, n.status);
                        case i.Context:
                            var c = function(e) {
                                    var n = r.from_json(e.source);
                                    return t = new s(e.user_id, m.app, m.context, n), new o(t, e.status)
                                },
                                d = function(e) {
                                    var t;
                                    return {
                                        snapshot: null != (null != e.snapshot ? e.snapshot.agents : void 0) ? (function() {
                                            for (var n = [], r = 0, s = Array.from(e.snapshot.agents); r < s.length; r++) t = s[r], n.push(c(t));
                                            return n
                                        })() : void 0,
                                        delta: null != (null != e.delta ? e.delta.agents : void 0) ? (function() {
                                            for (var n = [], r = 0, s = Array.from(e.delta.agents); r < s.length; r++) t = s[r], n.push(c(t));
                                            return n
                                        })() : void 0
                                    }
                                },
                                p = (function() {
                                    for (var e = [], t = 0, r = Array.from(h.payloads); t < r.length; t++) n = r[t], e.push(d(n.payload));
                                    return e
                                })();
                            return a._compact_context_updates(m, p)
                    }
                })())
            }
            return this._update_callback(c)
        }, e.prototype._on_refresh = function(e) {
            var t = this;
            return this._refresh_callback(Array.from(e).map((function(e) {
                return t._bolt_channel_to_presence_params(e)
            })))
        }, e
    })();
    t.Receiver = p
})), define("modules/clean/clipboard", ["require", "exports", "tslib", "swfobject", "jquery", "modules/clean/static_urls", "modules/core/dom"], (function(e, t, n, r, s, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), s = n.__importDefault(s), i = n.__importStar(i);
    t.clipboard_overlay = function(e, t, n, a) {
        void 0 === n && (n = null), void 0 === a && (a = null), a = a || s.default(document.body);
        var l = "swf_" + (new Date).getTime() + "_" + ("00000" + Math.floor(1e6 * Math.random())).slice(-6),
            u = s.default("<div />", {
                id: "flash_copy_container"
            }).append(s.default("<div />", {
                id: l
            })).css({
                position: "absolute",
                zIndex: 1
            });
        (function(e, t) {
            e.on("mouseover", (function() {
                return t.addClass("hovered")
            })), e.on("mousedown", (function() {
                return t.addClass("pressed")
            })), e.on("mouseout", (function() {
                return t.removeClass("hovered pressed")
            })), e.on("mouseup", (function() {
                return t.removeClass("pressed")
            }))
        })(u, t), a.append(u), i.clone_position(u, t, {});
        var c = (function(e, t) {
            return window.ClipboardSWFRegister = window.ClipboardSWFRegister || {}, window.ClipboardSWFRegister[e] = function() {
                return t()
            }, "ClipboardSWFRegister." + e
        })(l, n);
        return window.copyLoaded = function() {
            var t = s.default("#" + l)[0];
            return t.setCopyText(e), t.setCallbackFunction(c)
        }, r.embedSWF(o.static_url("/static/swf/copy_clipboard-vflvMcZTC.swf"), l, "100%", "100%", "6.0.65", !1, !1, {
            wmode: "transparent",
            scale: "exactfit",
            allowScriptAccess: "always"
        }), u
    }
})), define("modules/clean/components/title_bubble", ["require", "exports", "tslib", "classnames", "react", "react-dom", "react-dom-factories", "prop-types", "jquery", "modules/clean/react/css"], (function(e, t, n, r, s, o, i, a, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s), o = n.__importStar(o), i = n.__importStar(i), a = n.__importStar(a), l = n.__importDefault(l);
    var c = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    isChildFocused: !1
                }, t
            }
            return n.__extends(t, e), t.prototype.componentDidMount = function() {
                var e = this;
                l.default(o.findDOMNode(this)).on("focusin.title-bubble", (function(t) {
                    return e.setState({
                        isChildFocused: !0
                    })
                })).on("focusout.title-bubble", (function(t) {
                    return e.setState({
                        isChildFocused: !1
                    })
                })).on("mouseenter.title-bubble", (function() {
                    return "function" == typeof e.props.onMouseEnter ? e.props.onMouseEnter() : void 0
                }))
            }, t.prototype.componentWillUnmount = function() {
                l.default(o.findDOMNode(this)).off("focusin.title-bubble").off("focusout.title-bubble").off("mouseenter.title-bubble")
            }, t.prototype.render = function() {
                var e = this,
                    t = {
                        "c-title-bubble": !0,
                        "is-child-focused": this.state.isChildFocused,
                        "c-title-bubble--respect-line-break": this.props.respectLineBreaks
                    };
                return t["c-title-bubble--" + this.props.direction.slice(0, 1)] = !0, i.div({
                    className: r.default([t, this.props.className]),
                    "data-title": this.props.text,
                    onClick: function(t) {
                        if (t.detail > 0) return e.setState({
                            isChildFocused: !1
                        })
                    },
                    onMouseLeave: function() {
                        return e.setState({
                            isChildFocused: !1
                        })
                    }
                }, this.props.children)
            }, t.displayName = "TitleBubble", t.propTypes = {
                text: a.string.isRequired,
                direction: a.oneOf(["north", "south", "east", "west"]).isRequired,
                onMouseEnter: a.func,
                respectLineBreaks: a.bool,
                className: a.string
            }, t
        })(s.default.Component),
        d = u.requireCssWithComponent(c, ["/static/css/scooter/scooter-scoped-vfljL5ijS.css"]);
    t.default = d
})), define("modules/clean/contacts/bloodhound_contacts_v2", ["require", "exports", "tslib", "bloodhound", "modules/clean/contacts/config", "modules/clean/contacts/contact", "modules/clean/profile_services/profile_services_link", "modules/clean/viewer", "modules/core/cookies"], (function(e, t, n, r, s, o, i, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importStar(s), i = n.__importStar(i);
    var u = {};

    function c(e, t) {
        (function(e, t) {
            if (!(e.id in u)) return;
            var n = u[e.id];
            t = t.filter(o.ContactCommon.is_valid), n.clearRemoteCache(), n.clear(), n.add(t)
        })(e, t.includeForUser(e.id).contacts)
    }

    function d(e) {
        var t = document.createElement("a");
        t.href = e;
        var n = t.hostname || window.location.hostname;
        if (-1 === n.indexOf(".dropbox.com", n.length - ".dropbox.com".length)) throw new Error("Cannot send the CSRF token to " + n);
        return e
    }
    t.BloodhoundContactsV2 = {
        getOrCreateForUser: function(e) {
            if (e.id in u) return u[e.id];
            var t, n = s.getSearchConfigForUser(e);
            if (n.remoteEndpoint) {
                var p = String(e.id);
                t = {
                    url: d(n.remoteEndpoint),
                    prepare: function(e, t) {
                        return t.type = "POST", t.headers = {
                            "X-CSRF-Token": l.Cookies.read("__Host-js_csrf"),
                            "X-Dropbox-Uid": p
                        }, t.data = {
                            query: JSON.stringify(e)
                        }, t.data._subject_uid = p, t
                    },
                    rateLimitBy: "debounce",
                    rateLimitWait: n.remoteDebounceWait
                }
            }
            var h = new r.default({
                datumTokenizer: o.ContactCommon.get_index_tokens,
                queryTokenizer: r.default.tokenizers.whitespace,
                identify: o.ContactCommon.get_key,
                sufficient: n.sufficientResults,
                sorter: o.ContactCommon.sorter,
                local: [],
                remote: t
            });
            if (u[e.id] = h, a.Viewer.get_viewer().is_user_signed_in(e)) {
                var _ = n.localCacheStore.getOrCreateForUser(e);
                _.load_contacts(!1, (function(t) {
                    c(e, t), _.register_for_updates("bloodhound_contacts_v2", (function(t) {
                        c(e, t)
                    }))
                }))
            }
            return i.LinkedProfileServices.get_linked_profile_services_for_user(e.id).register_for_service_changes("bloodhound_contacts_v2", (function(e) {
                h.clearRemoteCache()
            })), u[e.id]
        },
        search: function(e, n, r, o) {
            var i = t.BloodhoundContactsV2.getOrCreateForUser(e),
                a = s.getSearchConfigForUser(e);
            if (!n) return r([]), void(o && a.remoteEndpoint && o([]));
            var l = a.localCacheStore.getOrCreateForUser(e);
            l.is_loaded() ? i.search(n, r, o) : l.load_contacts(!1, (function(e) {
                i.search(n, r, o)
            })), l.refresh_contacts(!1)
        },
        getAll: function(e) {
            return t.BloodhoundContactsV2.getOrCreateForUser(e).all()
        }
    }
})), define("modules/clean/contacts/cache", ["require", "exports", "tslib", "modules/clean/ajax", "modules/clean/bolt", "modules/clean/contacts/cache_type", "modules/clean/contacts/list", "modules/clean/viewer", "modules/core/browser", "modules/core/exception"], (function(e, t, n, r, s, o, i, a, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), s = n.__importStar(s), i = n.__importDefault(i), l = n.__importStar(l);
    var c = (function() {
        function e(e) {
            this.callbacks = {}, this.one_time_callbacks = [], this.cached_contacts = null, this._cache_download_name = e, this.should_force_refresh = !1, this.request_perf_records = [], this._config = null
        }
        return e.initClass = function() {
            this.MAX_REQUEST_PERF_RECORDS = 20
        }, e.prototype.register_for_updates = function(e, t) {
            this.callbacks[e] = t
        }, e.prototype.unregister_for_updates = function(e) {
            null != this.callbacks[e] && delete this.callbacks[e]
        }, e.prototype.get_contacts_count = function() {
            return null != this.cached_contacts ? this.cached_contacts.length() : 0
        }, e.prototype.get_downloaded_time = function() {
            var e = this,
                t = h(l.performance(), "getEntriesByName", (function(t) {
                    return t.getEntriesByName(e._get_contacts_downloaded_mark_name())
                }));
            return t && t.length ? t[0].startTime : null
        }, e.prototype.get_request_perf_records = function() {
            return this.request_perf_records
        }, e.prototype._is_contact_get_or_check_ajax_request = function(e) {
            var t = e.initiatorType,
                n = e.name;
            return "xmlhttprequest" === t && n.endsWith(this._config.getUrl)
        }, e.prototype._find_last_perf_entry = function(e) {
            void 0 === e && (e = 500);
            var t = h(l.performance(), "getEntriesByType", (function(e) {
                return e.getEntriesByType("resource")
            }));
            if (null != t ? t.length : void 0)
                for (var n = Math.min(t.length - 1, e); n >= 0; n--)
                    if (this._is_contact_get_or_check_ajax_request(t[n])) return t[n];
            return null
        }, e.prototype._record_perf_stats = function(t) {
            void 0 === t && (t = {});
            var n = this._find_last_perf_entry();
            if (n && (t.ttfb = n.responseStart - n.requestStart, t.downloading_time = n.responseEnd - n.responseStart, t.duration = n.duration, this.request_perf_records.push(t), this.request_perf_records.length > e.MAX_REQUEST_PERF_RECORDS)) return this.request_perf_records = this.request_perf_records.slice(this.request_perf_records.length - 1)
        }, e.prototype._get_request_url = function() {
            throw new Error("method unimplemented")
        }, e.prototype._get_request_params = function() {
            throw new Error("method unimplemented")
        }, e.prototype._contacts_loaded_callback = function(e) {
            throw new Error("method unimplemented")
        }, e.prototype._fetch_contacts = function() {
            var e = this;
            return r.BackgroundRequest({
                url: this._get_request_url(),
                data: this._get_request_params(),
                success: function(t, n, r) {
                    var s = JSON.parse(t);
                    if (e._contacts_loaded_callback(s), e._schedule_fetch) return e._schedule_fetch()
                }
            })
        }, e.prototype._get_versioned_params = function(e, t) {
            void 0 === t && (t = !0);
            var n = {
                version: e
            };
            return t && (n.force_refresh = this.should_force_refresh, this.should_force_refresh = !1), null != this.digest && (n.digest = this.digest), null != this.limit && (n.limit = this.limit), n
        }, e.prototype._get_contacts_downloaded_mark_name = function() {
            return this._cache_download_name + "-" + this.instance
        }, e.prototype._is_page_hidden = function() {
            return null != window.document.visibilityState && window.document.hidden
        }, e.prototype._add_one_time_callback = function(e) {
            if (null != e && !Array.from(this.one_time_callbacks).includes(e)) return this.one_time_callbacks.push(e)
        }, e.prototype._invoke_all_callbacks = function(e) {
            return this._invoke_callbacks(this.one_time_callbacks, e, !0), this._invoke_callbacks(this.callbacks, e, !1)
        }, e.prototype._invoke_one_time_callbacks = function(e) {
            return this._invoke_callbacks(this.one_time_callbacks, e, !0)
        }, e.prototype._invoke_callbacks = function(e, t, n) {
            return (function() {
                for (var r = [], s = 0, o = Array.from(Object.keys(e)); s < o.length; s++) {
                    var i = o[s];
                    e[i](t), n ? r.push(delete e[i]) : r.push(void 0)
                }
                return r
            })()
        }, e
    })();
    t.ContactsCacheProto = c, c.initClass();
    var d = (function(e) {
        function t(n, r, s) {
            void 0 === r && (r = null), void 0 === s && (s = null);
            var i = e.call(this, "BoltContactsCache download") || this;
            return i.bolt_update_callback = i.bolt_update_callback.bind(i), i.bolt_refresh_callback = i.bolt_refresh_callback.bind(i), i.cache_type = n, i.limit = r, i.user_id = s, i.instance = t.INSTANCE++, i.loading_state = t.BOLT_NEED_TO_SEND_REQUEST, i._config = o.CONTACT_CACHE_TYPE_TO_CONFIG[o.ContactCacheType[i.cache_type]], i.current_bolt_states = null, i._notified_states = {}, i._bolt = null, i._last_refresh_ts = null, i
        }
        return n.__extends(t, e), t.initClass = function() {
            this.INSTANCE = 0, this.BOLT_NEED_TO_SEND_REQUEST = 0, this.BOLT_REQUEST_SENT = 1, this.REFRESH_THRESHOLD = 36e5
        }, t.prototype.load_contacts = function(e, n) {
            a.Viewer.get_viewer().is_signed_in && (this._add_one_time_callback(n), (this.loading_state === t.BOLT_NEED_TO_SEND_REQUEST || e) && (this.loading_state = t.BOLT_REQUEST_SENT, e && (this.should_force_refresh = !0), this._fetch_contacts()), !this._should_update_contacts() && this.is_loaded() && this._invoke_one_time_callbacks(this.cached_contacts))
        }, t.prototype.refresh_contacts = function(e) {
            void 0 === e && (e = !1);
            var n = h(l.performance(), "now", (function(e) {
                return e.now()
            }));
            if (this._last_refresh_ts || (e = !0), !(!e && this._last_refresh_ts && n - this._last_refresh_ts < t.REFRESH_THRESHOLD)) return r.BackgroundRequest({
                url: this._get_refresh_url(),
                data: this._get_refresh_params({
                    force_refresh: e
                })
            }), this._last_refresh_ts = n
        }, t.prototype.is_loaded = function() {
            return null != this.cached_contacts
        }, t.prototype.bolt_update_callback = function(e) {
            for (var n = 0, r = Array.from(e); n < r.length; n++) {
                var s = r[n];
                (!Array.from(this._notified_states).includes(s.unique_id) || +this._notified_states[s.unique_id].revision < +s.revision) && (this._notified_states[s.unique_id] = s)
            }
            return this._should_update_contacts() && (this.loading_state = t.BOLT_NEED_TO_SEND_REQUEST), this.load_contacts()
        }, t.prototype.bolt_refresh_callback = function(e) {
            if (null != this._bolt && this._bolt.unsubscribe(), this._bolt = null, this.loading_state = t.BOLT_NEED_TO_SEND_REQUEST, !this._is_page_hidden()) return this.load_contacts()
        }, t.prototype._contacts_loaded_callback = function(e) {
            var t = this;
            if (!this._is_old_contacts(e.bolt_info)) {
                var n = this._is_new_contacts(e.bolt_info);
                if (this.current_bolt_states = e.bolt_info, null == this._bolt && this._subscribe_to_bolt(), n && (null != e.contacts ? e.contacts.length : void 0)) return this._record_perf_stats({
                    num_contacts: e.contacts.length
                }), this.digest = e.digest, this._create_contacts_list(e.contacts), this._invoke_all_callbacks(this.cached_contacts), h(l.performance(), "mark", (function(e) {
                    return e.mark(t._get_contacts_downloaded_mark_name())
                }))
            }
        }, t.prototype._create_contacts_list = function(e) {
            return this.cached_contacts = i.default.create_contacts_list(e)
        }, t.prototype._subscribe_to_bolt = function() {
            var e = [];
            for (var t in this.current_bolt_states) {
                var n = this.current_bolt_states[t];
                e.push(new s.SignedChannelState(this._config.boltAppId, t.toString(), n.revision, n.token))
            }
            return this._bolt = new s.BoltClient(e, this.bolt_update_callback, this.bolt_refresh_callback), this._bolt.start()
        }, t.prototype._is_new_contacts = function(e) {
            return this._first_contacts_are_newer(e, this.current_bolt_states)
        }, t.prototype._is_old_contacts = function(e) {
            return this._first_contacts_are_newer(this.current_bolt_states, e)
        }, t.prototype._first_contacts_are_newer = function(e, t) {
            if (!t) return !0;
            for (var n in t) {
                var r = t[n];
                for (var s in e) {
                    var o = e[s];
                    if (s === n && +r.revision < +o.revision) return !0
                }
            }
            return !1
        }, t.prototype._should_update_contacts = function() {
            return this._is_new_contacts(this._notified_states)
        }, t.prototype._get_request_params = function() {
            return this._get_versioned_params(1)
        }, t.prototype._get_request_url = function() {
            return this._config.getUrl
        }, t.prototype._get_refresh_params = function(e) {
            return void 0 === e && (e = {}), e
        }, t.prototype._get_refresh_url = function() {
            return this._config.refreshUrl
        }, t
    })(c);
    t.BoltContactsCache = d, d.initClass();
    var p = (function(e) {
        function t(t, n) {
            var r = this;
            return u.assert(null != n.id, "user has invalid id"), (r = e.call(this, t, null) || this).cache_type = t, r.user = n, r
        }
        return n.__extends(t, e), t.prototype._get_request_params = function() {
            var e = this._get_versioned_params(1);
            return e._subject_uid = this.user.id, e
        }, t.prototype._get_refresh_params = function(e) {
            return void 0 === e && (e = {}), e._subject_uid = this.user.id, e
        }, t.prototype._create_contacts_list = function(e) {
            return this.cached_contacts = i.default.create_per_user_contacts_list(e, this.user.id)
        }, t
    })(d);

    function h(e, t, n) {
        return null != e && "function" == typeof e[t] ? n(e, t) : void 0
    }
    t.PerUserBoltContactsCache = p
})), define("modules/clean/contacts/cache_store", ["require", "exports", "tslib", "modules/clean/contacts/cache_type", "modules/clean/contacts/cache", "modules/constants/contacts", "modules/clean/viewer"], (function(e, t, n, r, s, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = n.__importStar(o);
    var a = function(e) {
        this.cacheType = e
    };
    t.BoltContactsCacheStore = a;
    var l = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t.prototype.getOrCreateForUser = function(e) {
            if (!i.Viewer.get_viewer().is_uid_associated(e.id)) throw new Error("Requested contacts cache for a user not associated with the current viewer.");
            return this.getOrCreateForViewer()
        }, t.prototype.getOrCreateForViewer = function() {
            return null == this.contactsCache && (this.contactsCache = new s.BoltContactsCache(this.cacheType)), this.contactsCache
        }, t
    })(a);
    t.PerViewerBoltContactsCacheStore = l;
    var u = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.uidToContactsCache = {}, t
        }
        return n.__extends(t, e), t.prototype.getOrCreateForUser = function(e) {
            return e.id in this.uidToContactsCache || (this.uidToContactsCache[e.id] = new s.PerUserBoltContactsCache(this.cacheType, e)), this.uidToContactsCache[e.id]
        }, t
    })(a);
    t.PerUserBoltContactsCacheStore = u, t.DefaultContactsCacheStore = new l(r.ContactCacheType.ALL);
    var c = t.DefaultContactsCacheStore;
    "OFF" !== o.LEGACY_CACHE_LIMIT && ((c = new l(r.ContactCacheType.ALL)).contactsCache = new s.BoltContactsCache(r.ContactCacheType.ALL, +o.LEGACY_CACHE_LIMIT)), t.LegacyContactsCacheStore = c, t.IndividualContactsCacheStore = new u(r.ContactCacheType.INDIVIDUAL)
})), define("modules/clean/contacts/cache_type", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e[e.ALL = 0] = "ALL", e[e.INDIVIDUAL = 1] = "INDIVIDUAL"
    })(t.ContactCacheType || (t.ContactCacheType = {})), t.CONTACT_CACHE_TYPE_TO_CONFIG = {
        ALL: {
            getUrl: "/contacts/get",
            refreshUrl: "/contacts/refresh",
            boltAppId: "contacts_cache_notify"
        },
        INDIVIDUAL: {
            getUrl: "/contacts/get_individual_for_user",
            refreshUrl: "/contacts/refresh_individual_for_user",
            boltAppId: "individual_contacts_cache_notify"
        }
    }
})), define("modules/clean/contacts/config", ["require", "exports", "tslib", "modules/constants/contacts", "modules/clean/contacts/cache_store"], (function(e, t, n, r, s) {
    "use strict";
    var o;

    function i(e) {
        return r.MERGE_SEARCH_ALLOWED[e.id] ? o.INDIVIDUAL_LOCAL_TEAM_REMOTE : o.ALL_LOCAL
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), (function(e) {
        e[e.ALL_LOCAL = 0] = "ALL_LOCAL", e[e.INDIVIDUAL_LOCAL_TEAM_REMOTE = 1] = "INDIVIDUAL_LOCAL_TEAM_REMOTE"
    })(o = t.ContactsSearchMode || (t.ContactsSearchMode = {})), t.LOCAL_ONLY_SEARCH_MODES = [o.ALL_LOCAL], t.CONTACTS_SEARCH_PREEMPTED_THRESHOLD = 300, t.CONTACTS_SEARCH_DEBOUNCE_WAIT = 10, t.CONTACTS_SEARCH_MODE_TO_CONFIG = {
        ALL_LOCAL: {
            localCacheStore: s.DefaultContactsCacheStore,
            sufficientResults: 1e3,
            remoteDebounceWait: t.CONTACTS_SEARCH_DEBOUNCE_WAIT
        },
        INDIVIDUAL_LOCAL_TEAM_REMOTE: {
            localCacheStore: s.IndividualContactsCacheStore,
            remoteEndpoint: "/team/search_contacts",
            remoteBatchEndpoint: "/team/search_contacts_batch",
            sufficientResults: 1e3,
            remoteDebounceWait: t.CONTACTS_SEARCH_DEBOUNCE_WAIT
        }
    }, t.getSearchModeForUser = i, t.getSearchConfigForUser = function(e) {
        return t.CONTACTS_SEARCH_MODE_TO_CONFIG[o[i(e)]]
    }
})), define("modules/clean/contacts/contact", ["require", "exports", "tslib", "modules/clean/contacts/types", "modules/core/exception", "modules/clean/validators/validators"], (function(e, t, n, r, s, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r);
    var i = o.validators.check(o.validators.create(["EmailValidator"]));
    var a = (function() {
        function e() {}
        return e.sorter = function(e, t) {
            return t.domain_contact && !e.domain_contact ? -1 : e.domain_contact && !t.domain_contact ? 1 : e.sort_key || t.sort_key ? e.sort_key ? t.sort_key ? e.sort_key > t.sort_key ? -1 : e.sort_key < t.sort_key ? 1 : 0 : -1 : 1 : 0
        }, e.is_valid = function(e) {
            return e.dbx_account_id ? e.type === r.default.DBX_ID || e.type === r.default.EMAIL : e.group_id ? e.type === r.default.NEW_STYLE_GROUP : !!e.email && e.type === r.default.EMAIL
        }, e.get_key = function(t) {
            return s.assert(e.is_valid(t), "invalid contact: type: " + t.type), t.dbx_account_id ? "DBX_USER-" + t.dbx_account_id : t.group_id ? "DBX_GROUP-" + t.group_id : "CONTACT-" + t.type + "-" + t.email
        }, e.get_index_tokens = function(e) {
            var t = [];
            return e.name && t.push(e.name), e.email && t.push(e.email), e.fname && t.push(e.fname), e.lname && t.push(e.lname), e.name_tokens && (t = t.concat(e.name_tokens)), t
        }, e
    })();
    t.ContactCommon = a;
    var l = (function() {
        function e(e) {
            var t = e.dbx_account_id,
                n = e.type,
                r = e.name,
                s = e.email,
                o = e.fb_id,
                i = e.group_id,
                a = e.group_size,
                l = e.photo_url,
                u = e.members,
                c = e.avatar_url,
                d = e.invalid,
                p = e.on_team,
                h = e.domain_contact,
                _ = e.dbx_team_id,
                f = e.nameMatch,
                m = e.emailMatch,
                g = e.pending,
                y = e.join_state,
                v = e.query,
                b = e.is_directory_restricted,
                w = void 0 !== b && b;
            this.dbx_account_id = t, this.type = n, this.name = r, this.email = s, this.fb_id = o, this.group_id = i, this.group_size = a, this.photo_url = l, this.members = u, this.avatar_url = c, this.invalid = d, this.on_team = p, this.domain_contact = h, this.dbx_team_id = _, this.nameMatch = f, this.emailMatch = m, this.pending = g, this.join_state = y, this.query = v, this.is_directory_restricted = !!w, this.team = this.on_team
        }
        return e.buildFromRawEmail = function(t) {
            var n = (function(e) {
                return e.toLowerCase()
            })(t);
            return new e({
                name: n,
                email: n,
                type: r.default.EMAIL,
                invalid: !i(t),
                on_team: !1,
                pending: !0,
                query: n
            })
        }, e.prototype.getKey = function() {
            return a.get_key(this)
        }, e.prototype.getContactID = function() {
            switch (this.type) {
                case r.default.FB:
                    return this.fb_id;
                case r.default.NEW_STYLE_GROUP:
                    return this.group_id;
                default:
                    return this.email
            }
        }, e
    })();
    t.Contact = l
})), define("modules/clean/contacts/contact_token_state", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ContactTokenState = {
        invalid: "invalid",
        warn: "warn",
        pending: "pending",
        ok: "ok"
    }
})), define("modules/clean/contacts/data_v2", ["require", "exports", "tslib", "modules/clean/ajax", "modules/clean/contacts/bloodhound_contacts_v2", "modules/clean/contacts/config", "modules/clean/contacts/contact", "modules/clean/contacts/types", "modules/clean/fuzzy"], (function(e, t, n, r, s, o, i, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), o = n.__importStar(o), a = n.__importDefault(a), l = n.__importDefault(l);
    var u = (function() {
        function e(e, t, n, r) {
            void 0 === n && (n = !0), void 0 === r && (r = !0), this.query = this.search, this.query_batch = this.searchBatch, this.user = e, this.filterFunc = t, this.excludeDomainContacts = n, this.excludeDirectoryRestrictedContacts = r, this.searchConfig = o.getSearchConfigForUser(e), this.searchMode = o.getSearchModeForUser(e), this.searchModeName = o.ContactsSearchMode[this.searchMode], s.BloodhoundContactsV2.getOrCreateForUser(this.user)
        }
        return e.prototype.search = function(e, t, n) {
            var r = this;
            if ("" === (e = this.normalizeQuery(e))) return t([]), void(n && n([]));
            s.BloodhoundContactsV2.search(this.user, e, (function(n) {
                return r.processMatches(n, t, e)
            }), (function(t) {
                return r.processMatches(t, n, e)
            }))
        }, e.prototype.searchBatch = function(e, t, n) {
            var r = this,
                s = this.searchConfig.localCacheStore.getOrCreateForUser(this.user);
            if (s.is_loaded()) return this.searchBatchInternal(e, t, n);
            s.load_contacts(!0, (function() {
                return r.searchBatchInternal(e, t, n)
            }))
        }, e.prototype.searchBatchInternal = function(e, t, n) {
            for (var r = this, o = e.map(this.normalizeQuery).filter((function(e) {
                    return e.length > 0
                })), a = {}, l = function(e) {
                    s.BloodhoundContactsV2.search(u.user, e, (function(t) {
                        a[e] = r.processMatches(t, void 0, e)
                    }))
                }, u = this, c = 0, d = o; c < d.length; c++) {
                l(d[c])
            }
            if (t(a), this.searchConfig.remoteBatchEndpoint) {
                this.searchRemoteBatch(o, (function(e) {
                    if (n) {
                        var t = {},
                            s = function(n) {
                                if (e.hasOwnProperty(n)) {
                                    var s = a[n].map(i.ContactCommon.get_key),
                                        o = e[n].filter((function(e) {
                                            var t = i.ContactCommon.get_key(e);
                                            return s.every((function(e) {
                                                return e !== t
                                            }))
                                        }));
                                    t[n] = r.processMatches(o)
                                }
                            };
                        for (var o in e) s(o);
                        n(t)
                    }
                }))
            }
        }, e.prototype.normalizeQuery = function(e) {
            return e.trim().toLowerCase()
        }, e.prototype.isSearchLocalOnly = function() {
            return -1 !== o.LOCAL_ONLY_SEARCH_MODES.indexOf(this.searchMode)
        }, e.prototype.getStats = function() {
            var e = this.searchConfig.localCacheStore.getOrCreateForUser(this.user);
            return {
                numLocalContacts: e.get_contacts_count(),
                localContactsDownloadedTime: e.get_downloaded_time()
            }
        }, e.prototype.searchRemoteBatch = function(e, t) {
            r.WebRequest({
                url: this.searchConfig.remoteBatchEndpoint,
                type: "post",
                subject_user: this.user.id,
                dataType: "json",
                data: {
                    queries: JSON.stringify(e)
                },
                success: t
            })
        }, e.prototype.isTeamContact = function(e) {
            return this.user.is_team && null != e.team && e.team
        }, e.isDirectoryRestrictedContact = function(e, t) {
            var n = !!e.is_directory_restricted,
                r = t && t === e.email;
            return n && !r
        }, e.prototype.processMatches = function(t, n, r) {
            for (var s = [], o = 0, u = t; o < u.length; o++) {
                var c = u[o];
                r && (c.nameMatch = l.default.match(r, c.name || ""), c.emailMatch = l.default.match(r, c.email || "")), c.on_team = !(c.type === a.default.FB || !this.isTeamContact(c));
                var d = new i.Contact(c);
                d.pending = !1;
                var p = this.excludeDomainContacts && d.domain_contact,
                    h = this.excludeDirectoryRestrictedContacts && e.isDirectoryRestrictedContact(d, r);
                p || h || this.filterFunc && !this.filterFunc(d) || s.push(d)
            }
            return n && n(s), s
        }, e.prototype.getAll = function(e) {
            var t = this,
                n = this.searchConfig.localCacheStore.getOrCreateForUser(this.user);
            if (n.is_loaded()) {
                var r = s.BloodhoundContactsV2.getAll(this.user).map((function(e) {
                        return new i.Contact(e)
                    })),
                    o = this.filterFunc ? r.filter(this.filterFunc) : r;
                e(o)
            } else n.load_contacts(!0, (function(n) {
                if (n) {
                    var r = n.contacts,
                        s = t.filterFunc ? r.filter(t.filterFunc) : r;
                    e(s)
                }
            }))
        }, e
    })();
    t.ContactsDataSourceV2 = u
})), define("modules/clean/contacts/list", ["require", "exports", "tslib", "modules/clean/contacts/types"], (function(e, t, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r);
    var s = (function() {
        function e(e, t) {
            var n = this;
            this.filterContacts = this.filterContacts.bind(this), this.length = this.length.bind(this), this.slice = this.slice.bind(this), this.includeForUser = this.includeForUser.bind(this), this.includeForViewer = this.includeForViewer.bind(this), this.excludeByEmail = this.excludeByEmail.bind(this), this.excludeMe = this.excludeMe.bind(this), this.excludeNewStyleGroups = this.excludeNewStyleGroups.bind(this), this.excludeFacebook = this.excludeFacebook.bind(this), this.excludeTeamMembers = this.excludeTeamMembers.bind(this), this.excludePairedUserDuplicates = this.excludePairedUserDuplicates.bind(this), this.excludeNonTeam = this.excludeNonTeam.bind(this), this.excludeNonTeamActive = this.excludeNonTeamActive.bind(this), this.excludeSuspended = this.excludeSuspended.bind(this), this.sortByTeamFirst = this.sortByTeamFirst.bind(this), this._excludeType = this._excludeType.bind(this), this._lowercaseContact = this._lowercaseContact.bind(this), this.contacts = e, this.owningUserId = t, this.lcontacts = Array.from(this.contacts).map((function(e) {
                return n._lowercaseContact(e)
            }))
        }
        return e.create_contacts_list = function(t) {
            return new e(t, null)
        }, e.create_per_user_contacts_list = function(t, n) {
            return new e(t, n)
        }, e.prototype.filterContacts = function(t) {
            return new e(this.contacts.filter(t), this.owningUserId)
        }, e.prototype.length = function() {
            return this.contacts.length
        }, e.prototype.slice = function(t, n) {
            return new e(this.contacts.slice(t, n), this.owningUserId)
        }, e.prototype.includeForUser = function(t) {
            return null != this.owningUserId ? this.owningUserId === t ? this : new e([], t) : new e(this.contacts.filter((function(e) {
                return e.owning_user_id === t
            })), t)
        }, e.prototype.includeForViewer = function(e) {
            var t = e.get_user_ids();
            return this.filterContacts((function(e) {
                return Array.from(t).includes(e.owning_user_id)
            }))
        }, e.prototype.excludeByEmail = function(e) {
            return e = e ? e.toLowerCase() : "", this.filterContacts((function(t) {
                return !(e === t.email.toLowerCase())
            }))
        }, e.prototype.excludeMe = function() {
            return this.filterContacts((function(e) {
                return !e.is_owner
            }))
        }, e.prototype.excludeNewStyleGroups = function() {
            return this._excludeType(r.default.NEW_STYLE_GROUP)
        }, e.prototype.excludeFacebook = function() {
            return this._excludeType(r.default.FB)
        }, e.prototype.excludeTeamMembers = function() {
            return this.filterContacts((function(e) {
                return !e.team
            }))
        }, e.prototype.excludePairedUserDuplicates = function() {
            return this.filterContacts((function(e) {
                return !e.paired_user_duplicate
            }))
        }, e.prototype.excludeNonTeam = function() {
            return this.filterContacts((function(e) {
                return e.team
            }))
        }, e.prototype.excludeNonTeamActive = function() {
            return this.filterContacts((function(e) {
                return e.team && "active" === e.join_state
            }))
        }, e.prototype.excludeSuspended = function() {
            return this.filterContacts((function(e) {
                return "suspended" !== e.join_state
            }))
        }, e.prototype.sortByTeamFirst = function() {
            return new e(e.sortContactsByTeamFirst(this.contacts), this.owningUserId)
        }, e.sortContactsByTeamFirst = function(e) {
            for (var t = [], n = [], r = 0, s = Array.from(e); r < s.length; r++) {
                var o = s[r];
                o.team ? t.push(o) : n.push(o)
            }
            return t.concat(n)
        }, e.prototype._excludeType = function(e) {
            return this.filterContacts((function(t) {
                return t.type !== e
            }))
        }, e.prototype._lowercaseContact = function(e) {
            var t = {};
            for (var n in e) {
                var r = e[n];
                ("string" == typeof r || r instanceof String) && (r = r.toLowerCase()), t[n] = r
            }
            return t
        }, e
    })();
    t.default = s
})), define("modules/clean/contacts/tokenizer", ["require", "exports", "tslib", "classnames", "react", "react-dom-factories", "prop-types", "jquery", "modules/clean/analytics", "modules/clean/avatar/contact_avatar", "modules/clean/contacts/config", "modules/clean/contacts/contact", "modules/clean/contacts/contact_token_state", "modules/clean/contacts/data_v2", "modules/clean/contacts/typeahead", "modules/clean/contacts/types", "modules/clean/em_string", "modules/clean/tokenizer", "modules/clean/validators/validators", "modules/core/browser", "modules/core/i18n"], (function(e, t, n, r, s, o, i, a, l, u, c, d, p, h, _, f, m, g, y, v, b) {
    "use strict";
    var w, k;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s), o = n.__importStar(o), i = n.__importStar(i), a = n.__importDefault(a), u = n.__importDefault(u), c = n.__importStar(c), f = n.__importDefault(f), v = n.__importStar(v), t.ContactTokenState = p.ContactTokenState;
    var M = s.default.createElement;
    t.SLOW_CONTACT_SEARCH_THRESHOLD = 100;
    var E = y.validators.check(y.validators.create(["EmailValidator"])),
        S = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._getTokenName = function() {
                    switch (t.props.contact.type) {
                        case f.default.FB:
                            return "fb_ids";
                        case f.default.EMAIL:
                            return "emails";
                        case f.default.NEW_STYLE_GROUP:
                            return "new_style_group_ids";
                        default:
                            return "invalids"
                    }
                }, t._getTokenValue = function() {
                    switch (t.props.contact.type) {
                        case f.default.FB:
                            return t.props.contact.fb_id;
                        case f.default.NEW_STYLE_GROUP:
                            return t.props.contact.group_id;
                        default:
                            return t.props.contact.email
                    }
                }, t._renderIcon = function() {
                    return t.props.contact.type === f.default.FB ? o.img({
                        className: "token-icon",
                        src: "/static/images/icons/fb_16-vflbiYTkC.png"
                    }) : t.props.contact.type === f.default.NEW_STYLE_GROUP || t.props.contact.dbx_account_id || t.props.contact.photo_url ? M(u.default, {
                        dimension: 16,
                        contact: t.props.contact,
                        optionalClass: "token-icon"
                    }) : ""
                }, t._renderInput = function() {
                    return o.input({
                        type: "hidden",
                        name: t._getTokenName(),
                        value: t._getTokenValue()
                    })
                }, t._renderText = function() {
                    var e = t.props.contact.name || t.props.contact.email;
                    return m.Emstring.em_snippet(e, 22)
                }, t._makeCloseButton = function() {
                    return t.props.onRemove ? o.span({
                        className: "tokenizer-token-close",
                        onClick: function(e) {
                            return e.preventDefault(), e.stopPropagation(), t.props.onRemove(t.props.contact), !1
                        },
                        dangerouslySetInnerHTML: {
                            __html: "&nbsp;"
                        }
                    }) : ""
                }, t
            }
            return n.__extends(t, e), t.prototype.render = function() {
                var e = {
                    "tokenizer-token": !0,
                    "contact-token": !0,
                    invalid: this.props.tokenState === p.ContactTokenState.invalid,
                    warned: this.props.tokenState === p.ContactTokenState.warn,
                    pending: this.props.tokenState === p.ContactTokenState.pending
                };
                e[this.props.customClass] = null != this.props.customClass, e[this.props.className] = null != this.props.className;
                var t = r.default(e);
                return o.a(a.default.extend({
                    tabIndex: -1
                }, this.props, {
                    className: t
                }), this._renderInput(), this._renderIcon(), this._renderText(), this._makeCloseButton())
            }, t.displayName = "ContactsToken", t.propTypes = {
                customClass: i.string,
                className: i.string,
                contact: i.object.isRequired,
                onRemove: i.func,
                tabIndex: i.number,
                tokenState: i.oneOf((function() {
                    var e = [];
                    for (w in p.ContactTokenState) k = p.ContactTokenState[w], e.push(k);
                    return e
                })()).isRequired
            }, t
        })(s.default.Component),
        C = {
            basic: function(e) {
                var t = e.name && !e.invalid && e.email !== e.name;
                return {
                    state: e.invalid ? p.ContactTokenState.invalid : p.ContactTokenState.ok,
                    msg: t ? e.email : null
                }
            },
            warn: function(e) {
                return {
                    state: e.pending ? p.ContactTokenState.pending : e.on_team ? p.ContactTokenState.ok : e.invalid ? p.ContactTokenState.invalid : p.ContactTokenState.warn,
                    msg: null
                }
            },
            forbid: function(e) {
                return {
                    state: e.pending ? p.ContactTokenState.pending : e.on_team ? p.ContactTokenState.ok : p.ContactTokenState.invalid,
                    msg: null
                }
            }
        };
    t.ContactTokenValidator = C;
    var A = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t._initContactsDataSource = function(e) {
                var t = e.user,
                    n = e.customContactFilter,
                    r = e.excludeDomainContacts,
                    s = e.customContactsDataSourceFactory;
                return s ? s(t, n) : new h.ContactsDataSourceV2(t, n, r)
            }, t._validateTokens = function(e, t) {
                if (void 0 === t && (t = !1), (null != e ? e.length : void 0) > 0) return (function() {
                    for (var n = [], r = 0, s = Array.from(e); r < s.length; r++) {
                        var o = s[r];
                        o.type === f.default.EMAIL && (o.invalid = !E(o.email)), t ? (o.query = o.query || o.email || o.name, n.push(o.pending = !0)) : n.push(void 0)
                    }
                    return n
                })()
            }, t.finishLogging = function(e) {
                var n = t.contactsDataSource.getStats().numLocalContacts;
                if (t._flush_unfinished_queries_cache(), t.props.shouldLogContactSearch) return t.contact_search_logger.log_records(t.props.user.id, e, n)
            }, t._logTokenChangeEvent = function(e, n, r) {
                if (void 0 === n && (n = !1), void 0 === r && (r = {}), t.contact_search_logger) {
                    if (n) return t.contact_search_logger.flag_record_as_removed(e.getContactID());
                    var s = {
                        context: t._getLoggingContext(),
                        contact_type: e.type,
                        contact_id: e.getContactID(),
                        contact_name: e.name,
                        sort_variant: null,
                        event_ts: D(v.performance(), "now", (function(e) {
                            return e.now()
                        }))
                    };
                    for (w in r) k = r[w], s[w] = k;
                    return t.contact_search_logger.add_record(s)
                }
            }, t._logSearchComplete = function(e, n, r) {
                if (void 0 === r && (r = !0), t._shouldLogSearch() && e) {
                    var s = v.performance().now(),
                        o = t.unfinished_contact_search_queries[e];
                    if (o) {
                        var i = o.begin_time;
                        !("ttfr" in o) && n > 0 && (o.ttfr = Math.floor(s - i)), r ? (o.local_duration = Math.floor(s - i), o.num_local_results = n) : (o.remote_duration = Math.floor(s - i), o.num_additional_remote_results = n), o.num_results += n;
                        return t.contactsDataSource.isSearchLocalOnly() && r || !r ? (o = t._prepareSearchStatsForLogging(o, e, s, !0), t.contact_search_logger.add_timing_record(o), t.contact_search_logger.count_search(o.is_slow), delete t.unfinished_contact_search_queries[e]) : void 0
                    }
                }
            }, t._logSearchBegin = function(e) {
                if (t._shouldLogSearch() && e) {
                    var n = v.performance().now();
                    return t._flush_unfinished_queries_cache(n), t.unfinished_contact_search_queries[e] = {
                        begin_time: n,
                        num_results: 0
                    }
                }
            }, t._shouldLogSearch = function() {
                var e;
                return t.props.shouldLogContactSearch && null != t.contact_search_logger && null != (null === (e = v.performance()) || void 0 === e ? void 0 : e.now)
            }, t._flush_unfinished_queries_cache = function(e) {
                if (t._shouldLogSearch()) {
                    for (var n in null == e && (e = v.performance().now()), t.unfinished_contact_search_queries) {
                        var r = t.unfinished_contact_search_queries[n];
                        e - r.begin_time < c.CONTACTS_SEARCH_PREEMPTED_THRESHOLD && (r.is_preempted = !0), r = t._prepareSearchStatsForLogging(r, n, e, !1), t.contact_search_logger.add_timing_record(r), t.contact_search_logger.count_search(r.is_slow)
                    }
                    return t.unfinished_contact_search_queries = {}
                }
            }, t._prepareSearchStatsForLogging = function(e, n, r, s) {
                var o = e.begin_time;
                e.duration = Math.floor(r - o), "ttfr" in e ? e.is_slow = e.ttfr > 100 : s && 0 === e.num_results ? e.is_slow = !1 : e.is_slow = e.duration > 100;
                var i = t.contactsDataSource.getStats().localContactsDownloadedTime;
                return e.started_before_download = null == i || o < i, "is_preempted" in e || (e.is_preempted = !1), e.context = t._getLoggingContext(), e.query_length = n.length, e.is_finished = s, e
            }, t._getLoggingContext = function() {
                var e = "react_tokenizer";
                return null != t.props.context && (e += "_" + t.props.context), e
            }, t.addExternalContacts = function(e) {
                return t.refs.tokenizer.addExternalTokens(e)
            }, t._renderToken = function(e) {
                return M(S, {
                    contact: e,
                    tabIndex: t.props.disableAdditionalInput ? 0 : -1,
                    tokenState: t.props.customContactValidator(e).state
                })
            }, t._renderTokenHover = function(e) {
                return t.props.customContactValidator(e).msg
            }, t._autoSelectMatch = function(e, n) {
                if (!n || !e) return null;
                e = t.contactsDataSource.normalizeQuery(e);
                for (var r = {
                        email: [],
                        name: []
                    }, s = 0, o = Array.from(n); s < o.length; s++) {
                    var i = o[s],
                        a = i.email ? t.contactsDataSource.normalizeQuery(i.email) : null,
                        l = i.name ? t.contactsDataSource.normalizeQuery(i.name) : null;
                    e === a ? r.email.push(i) : e === l && r.name.push(i)
                }
                for (var u = 0, c = ["email", "name"]; u < c.length; u++) {
                    var d = c[u];
                    if (1 === r[d].length) return r[d][0]
                }
                return null
            }, t._queryTokens = function(e, n) {
                var r = e.filter((function(e) {
                    return e.pending && e.query
                }));
                if (r.length) {
                    var s = Array.from(r).map((function(e) {
                            return e.query
                        })),
                        o = function(r) {
                            var s = [];
                            e = [];
                            for (var o = t.serializeInputData(n).tokens, i = 0, a = Array.from(o); i < a.length; i++) {
                                var l = a[i],
                                    u = l;
                                if (l.pending && l.query) {
                                    var c = t.contactsDataSource.normalizeQuery(l.query),
                                        d = t._autoSelectMatch(c, r[c]);
                                    d && (u = d)
                                }
                                w = u.getKey(), Array.from(s).includes(w) || (s.push(w), e.push(u))
                            }
                            return n.replaceTokens(e)
                        },
                        i = o,
                        a = o;
                    return t.contactsDataSource.searchBatch(s, i, a)
                }
            }, t.tokenizeEmails = function(e, t) {
                var n;
                void 0 === t && (t = !1);
                var r = e.split(/[,|;\n ]+/);
                2 === r.length && E(r[0] + r[1]) ? (n = [r[0] + r[1]], t = !0) : n = 2 === r.length && E(r[0]) && "" === r[1] ? r : e.split(/[,|;\n]+/);
                var s = "";
                t || (s = n.pop());
                for (var o = [], i = 0, a = Array.from(n); i < a.length; i++) {
                    var l = a[i].trim();
                    "" !== l && o.push(new d.Contact({
                        name: l,
                        email: l,
                        type: f.default.EMAIL,
                        invalid: !E(l),
                        on_team: !1,
                        pending: !0,
                        query: l
                    }))
                }
                return {
                    tokens: o,
                    value: s
                }
            }, t.serializeInputData = function(e) {
                return (e = e || t.refs.tokenizer).serializeInputData()
            }, t.getInputValue = function(e) {
                return void 0 === e && (e = void 0), (e || t.refs.tokenizer).getInputValue()
            }, t.getContacts = function() {
                var e = t.serializeInputData(),
                    n = e.tokens,
                    r = e.value,
                    s = t.tokenizeEmails(r, !0);
                return n.concat(s.tokens)
            }, t.removeAllTokens = function() {
                var e = t.serializeInputData().tokens;
                t.refs.tokenizer.removeTokens(e)
            }, t.tokenizeAll = function() {
                return t.refs.tokenizer.tokenizeAll()
            }, t
        }
        return n.__extends(t, e), t.prototype.componentWillReceiveProps = function(e) {
            e.user === this.props.user && e.customContactFilter.toString() === this.props.customContactFilter.toString() || (this.contactsDataSource = this._initContactsDataSource(e)), this._validateTokens(null != e.populatedInputData ? e.populatedInputData.tokens : void 0)
        }, t.prototype.componentWillMount = function() {
            this.contactsDataSource = this._initContactsDataSource(this.props), this._validateTokens(null != this.props.populatedInputData ? this.props.populatedInputData.tokens : void 0, !0)
        }, t.prototype.componentDidMount = function() {
            var e = this.props,
                t = e.shouldLogContactSearch,
                n = e.populatedInputData,
                r = e.onContentsChange;
            if (t && (this.contact_search_logger = new l.ContactSearchLogger(this._getLoggingContext(), this.contactsDataSource.searchModeName), this.unfinished_contact_search_queries = {}), n.tokens && n.tokens.length || n.value && n.value.length) {
                var s = this.serializeInputData(),
                    o = s.tokens,
                    i = s.value;
                "function" == typeof r && r(o, i)
            }
        }, t.prototype.render = function() {
            var e = this;
            return M(g.Tokenizer, {
                ref: "tokenizer",
                dataSource: this.contactsDataSource,
                customClass: this.props.customClass,
                initialInputText: this.props.populatedInputData.value,
                placeholderText: this.props.placeholder,
                renderSelector: function() {
                    return M(_.ContactsTypeaheadSelector, {
                        showContactImport: e.props.showContactImport,
                        teamGroupInfo: e.props.teamGroupInfo,
                        user: e.props.user,
                        listHeight: e.props.listHeight
                    })
                },
                renderInput: function() {
                    return o.textarea({
                        className: "contacts-tokenizer-input",
                        id: e.props.id,
                        rows: 1,
                        autoCapitalize: "off"
                    })
                },
                renderToken: this._renderToken,
                renderTokenHover: this._renderTokenHover,
                onContentsChange: this.props.onContentsChange,
                onTokensAdd: this._queryTokens,
                stringTokenizer: this.tokenizeEmails,
                populatedTokenData: this.props.populatedInputData.tokens,
                tabIndex: this.props.tabIndex,
                tokenSpacing: this.props.tokenSpacing,
                focusOnMount: this.props.focusOnMount,
                logSearchBegin: this._logSearchBegin,
                logSearchComplete: this._logSearchComplete,
                logTokenChangeEvent: this._logTokenChangeEvent,
                disableAdditionalInput: this.props.disableAdditionalInput,
                disabled: this.props.disabled,
                resetTokenData: this.props.resetTokenData,
                tokenizeOnOutOfFocus: this.props.tokenizeOnOutOfFocus
            }, this.props.children)
        }, t.displayName = "ContactsTokenizer", t.propTypes = {
            user: i.object.isRequired,
            context: i.string,
            customClass: i.string,
            customContactFilter: i.func,
            excludeDomainContacts: i.bool,
            customContactValidator: i.func,
            focusOnMount: i.bool,
            id: i.string,
            onContentsChange: i.func,
            placeholder: i.string,
            populatedInputData: i.shape({
                tokens: i.array,
                value: i.string
            }),
            tabIndex: i.number,
            showContactImport: i.bool,
            shouldLogContactSearch: i.bool,
            teamGroupInfo: i.shape({
                id: i.string,
                name: i.string
            }),
            tokenSpacing: i.number,
            disableAdditionalInput: i.bool,
            disabled: i.bool,
            resetTokenData: i.bool,
            customContactsDataSourceFactory: i.func,
            listHeight: i.number,
            tokenizeOnOutOfFocus: i.bool
        }, t.defaultProps = {
            customContactFilter: function(e) {
                return !0
            },
            customContactValidator: C.basic,
            excludeDomainContacts: !0,
            focusOnMount: !1,
            id: null,
            placeholder: b.intl.formatMessage({
                defaultMessage: "Invite more people"
            }),
            populatedInputData: {
                tokens: [],
                value: ""
            },
            tokenSpacing: 4,
            showContactImport: !1,
            shouldLogContactSearch: !1,
            teamGroupInfo: null,
            disableAdditionalInput: !1,
            disabled: !1,
            resetTokenData: !1,
            tokenizeOnOutOfFocus: !1
        }, t
    })(s.default.Component);

    function D(e, t, n) {
        return null != e && "function" == typeof e[t] ? n(e, t) : void 0
    }
    t.ContactsTokenizer = A
})), define("modules/clean/contacts/typeahead", ["require", "exports", "tslib", "classnames", "create-react-class", "react", "react-dom-factories", "prop-types", "external/lodash", "modules/clean/avatar/contact_avatar", "modules/clean/contacts/types", "modules/clean/contacts/util", "modules/clean/css", "modules/clean/em_string", "modules/clean/profile_services/popup_handler", "modules/clean/profile_services/profile_services_constants", "modules/clean/profile_services/profile_services_link", "modules/clean/react/flag", "modules/clean/react/image", "modules/clean/react/paging_list", "modules/clean/react/sprite", "modules/clean/react/title_bubble", "modules/clean/static_urls", "modules/clean/typeahead", "modules/core/exception", "modules/core/i18n", "modules/core/notify"], (function(e, t, n, r, s, o, i, a, l, u, c, d, p, h, _, f, m, g, y, v, b, w, k, M, E, S, C) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s), o = n.__importDefault(o), i = n.__importStar(i), a = n.__importStar(a), l = n.__importStar(l), u = n.__importDefault(u), c = n.__importDefault(c), d = n.__importDefault(d), p = n.__importStar(p), f = n.__importDefault(f), g = n.__importStar(g), v = n.__importDefault(v);
    var A = o.default.createElement,
        D = function(e, t) {
            return l.assignIn({}, e, t)
        },
        I = D(M.TypeaheadSelectorMixin, {
            getOptions: function() {
                var e = this;
                if (null == this.props.queryOptions) return [];
                if (this.state.importsExpanded) return Array.from(f.default.importable_contact_services()).map((function(t) {
                    return new P({
                        provider: t,
                        connected: e.profile_services.service_is_connected(t)
                    })
                }));
                var t = this.props.queryOptions.slice();
                return this.props.teamGroupInfo ? t.push(d.default.teamGroupInfoToContact(this.props.teamGroupInfo)) : (null != this.profile_services ? this.profile_services.has_unconnected_services(!0) : void 0) && t.push(new x), t
            },
            renderOption: function(e) {
                return e instanceof x ? A(O) : e instanceof P ? A(N, {
                    import: e
                }) : this.props.renderQueryOption(e)
            },
            onSelect: function(e) {
                if (e instanceof x) return this._changeSelectionIndex(0), this.setState({
                    importsExpanded: !0
                });
                if (e instanceof P) {
                    var t;
                    if (E.assert((t = e.provider, Array.from(f.default.importable_contact_services()).includes(t)), "invalid party contact provider " + e.provider), this.profile_services.service_is_connected(e.provider)) {
                        var n = S.intl.formatMessage({
                            defaultMessage: "You're already connected to {service_name}"
                        }, {
                            service_name: f.default.to_name(e.provider)
                        });
                        return void C.Notify.success(n)
                    }
                    return this.link_handler.auth_service_with_user(e.provider, this.props.user.id, (function(e) {
                        return m.ProfileServicesLinkingHandler.show_import_notifications(e)
                    }))
                }
                return this.props.onSelect(e)
            },
            reset: function() {
                return this._changeSelectionIndex(0), this.setState({
                    importsExpanded: !1
                })
            }
        }),
        T = s.default({
            displayName: "ContactsTypeaheadSelector",
            mixins: [I],
            propTypes: {
                customClass: a.string,
                onSelect: a.func.isRequired,
                queryOptions: a.array,
                renderQueryOption: a.func.isRequired,
                showContactImport: a.bool,
                teamGroupInfo: a.shape({
                    id: a.string,
                    name: a.string
                }),
                user: a.object.isRequired,
                listHeight: a.number
            },
            componentWillMount: function() {
                if (this.link_handler = new m.ProfileServicesLinkingHandler, this.profile_services = null, null === this.props.teamGroupInfo && this.props.showContactImport && null != this.props.user) return this.profile_services = m.LinkedProfileServices.get_linked_profile_services_for_user(this.props.user.id)
            },
            componentWillReceiveProps: function(e) {
                return 0 === (null != e.queryOptions ? e.queryOptions.length : void 0) ? this._changeSelectionIndex(-1) : (null != e.queryOptions ? e.queryOptions.length : void 0) > 0 && -1 === this.state.selectionIndex ? this._changeSelectionIndex(0) : void 0
            },
            shouldComponentUpdate: function(e, t) {
                return !l.isEqual(e, this.props) || !l.isEqual(t, this.state)
            },
            getDefaultProps: function() {
                return {
                    showContactImport: !1,
                    teamGroupInfo: null,
                    onSelect: function(e) {},
                    renderQueryOption: function(e) {
                        return A(R, {
                            contact: e
                        })
                    }
                }
            },
            onSelectionIndexChange: function(e) {
                return null != this.refs.pagingList ? this.refs.pagingList.scrollAround(e) : void 0
            },
            render: function() {
                if (p.require_css("/static/css/react/contacts_typeahead-vflRzfV9H.css"), !this.getOptions().length) return i.div({});
                var e = {
                    "typeahead-selector": !0,
                    "contacts-selector": !0
                };
                e[this.props.customClass] = null != this.props.customClass;
                var t = this.props.listHeight;
                return A(v.default, {
                    customClass: r.default(e),
                    pageSize: 4,
                    itemSize: 54,
                    ref: "pagingList",
                    listHeight: t
                }, this.renderOptions())
            }
        });
    t.ContactsTypeaheadSelector = T;
    var R = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t._renderPrimary = function() {
                return t._renderMatch(t.props.contact.name, t.props.contact.nameMatch)
            }, t._renderSecondary = function() {
                switch (t.props.contact.type) {
                    case c.default.EMAIL:
                        return t.props.contact.email === t.props.contact.name ? "" : t._renderMatch(t.props.contact.email, t.props.contact.emailMatch);
                    case c.default.FB:
                        return S.intl.formatMessage({
                            defaultMessage: "Facebook message"
                        });
                    case c.default.NEW_STYLE_GROUP:
                        return t.props.contact.members;
                    default:
                        return ""
                }
            }, t._renderMatch = function(e, t) {
                if (e && (e = h.Emstring.em_snippet(e, 22)), !t) return e;
                for (var n = e.indexOf("…"), r = 0, s = [], o = 0, a = Array.from(t.highlighted); o < a.length; o++) {
                    var l = a[o],
                        u = l[0],
                        c = l[1];
                    u > r && s.push(e.slice(r, u));
                    var d = u + c;
                    d > n && -1 !== n && (d = n);
                    var p = e.slice(u, d);
                    s.push(i.strong({
                        key: "highlight-" + p + "-" + u
                    }, p)), r = d
                }
                return r < e.length && s.push(e.slice(r)), s
            }, t._renderIcon = function() {
                return i.div({
                    className: "u-pad-right-xs"
                }, A(u.default, {
                    dimension: 32,
                    contact: t.props.contact,
                    optionalClass: "contact-icon"
                }))
            }, t._renderDomainTooltip = function() {
                return i.div({
                    className: "u-pad-right-xs"
                }, A(w.TitleBubble, {
                    content: S.intl.formatMessage({
                        defaultMessage: "Suggested contact from your domain"
                    }),
                    position: w.TitleBubble.POSITIONS.BOTTOM
                }, A(b.Sprite, {
                    group: "web",
                    name: "info",
                    alt: S.intl.formatMessage({
                        defaultMessage: "Domain contact"
                    })
                })))
            }, t
        }
        return n.__extends(t, e), t.prototype.render = function() {
            var e;
            (e = {
                "contacts-typeahead-option": !0
            })[this.props.customClass] = null != this.props.customClass, null != this.props.className && (e[this.props.className] = !0);
            var t = {
                primary: this._renderPrimary(),
                secondary: this._renderSecondary()
            };
            return t = l.pickBy(t, (function(e) {
                return "" !== e
            })), i.li(D(this.props, {
                className: r.default(e)
            }), A(g.Flag, {
                leftAttachment: this._renderIcon(),
                rightAttachment: this.props.contact.domain_contact ? this._renderDomainTooltip() : void 0
            }, (function() {
                var n = [];
                for (var s in t) {
                    var o = t[s];
                    (e = {
                        "option-only": 1 === l.size(t)
                    })["option-" + s] = !0, n.push(i.div({
                        className: r.default(e),
                        key: "option-" + s
                    }, o))
                }
                return n
            })()))
        }, t.displayName = "ContactsTypeaheadSelectorOption", t.propTypes = {
            contact: a.object.isRequired,
            customClass: a.string
        }, t
    })(o.default.Component);
    t.ContactsTypeaheadSelectorOption = R;
    var x = (function() {
            function e() {}
            return e.prototype.getKey = function() {
                return "expand-importer"
            }, e
        })(),
        O = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return n.__extends(t, e), t.prototype.render = function() {
                var e = {
                    "expand-imports-option": !0,
                    "contacts-typeahead-option": !0
                };
                return null != this.props.className && (e[this.props.className] = !0), i.li(D(this.props, {
                    className: r.default(e)
                }), A(g.Flag, {
                    leftAttachment: A(y.Image, {
                        className: "u-pad-right-xs",
                        src: k.static_url("/static/images/icons/icon-import-vflOL9sCs.png"),
                        srcHiRes: k.static_url("/static/images/icons/icon-import@2x-vfluE8TBO.png")
                    })
                }, i.div({
                    className: "option-primary option-only"
                }, S.intl.formatMessage({
                    defaultMessage: "Import contacts"
                }))))
            }, t.displayName = "ExpandImportOption", t
        })(o.default.Component);
    t.ExpandImportOption = O;
    var P = (function() {
            function e(e) {
                var t = e.provider,
                    n = e.connected;
                this.provider = t, this.connected = n
            }
            return e.prototype.getKey = function() {
                return "third-party-import" + this.provider
            }, e
        })(),
        N = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    showSpinner: !1
                }, t.show_contact_import_spinner = function(e) {
                    if (t.props.import.provider === e.provider) return t.setState({
                        showSpinner: !0
                    })
                }, t
            }
            return n.__extends(t, e), t.prototype.componentDidMount = function() {
                return this.authCompleteListenerToken = _.addAuthCompleteListener(this.show_contact_import_spinner)
            }, t.prototype.componentWillUnmount = function() {
                return _.removeAuthCompleteListener(this.authCompleteListenerToken)
            }, t.prototype.render = function() {
                var e = this.props.import,
                    t = e.provider,
                    n = e.connected,
                    s = f.default.to_name(t);
                !n && this.state.showSpinner && (s = S.intl.formatMessage({
                    defaultMessage: "Importing {service_name} Contacts"
                }, {
                    service_name: s
                }));
                var o = n ? S.intl.formatMessage({
                        defaultMessage: "Connected"
                    }) : "",
                    a = {
                        "third-party-option": !0,
                        "contacts-typeahead-option": !0
                    };
                return null != this.props.className && (a[this.props.className] = !0), i.li(D(this.props, {
                    className: r.default(a)
                }), !n && this.state.showSpinner ? i.div({
                    className: "option-spinner"
                }, i.img({
                    src: "/static/images/icons/ajax-loading-small-blue-vflVk_QNP.gif"
                })) : void 0, A(g.Flag, {
                    spacing: "xs",
                    leftAttachment: A(y.Image, {
                        alt: "",
                        src: k.static_url(f.default.to_img_legacy(t)[0]),
                        srcHiRes: k.static_url(f.default.to_img_legacy(t)[1])
                    })
                }, i.div({
                    className: r.default({
                        "option-primary": !0,
                        "option-only": !n
                    })
                }, s, n ? i.div({
                    className: "option-secondary u-font-meta"
                }, o) : void 0)))
            }, t.displayName = "ThirdPartyImportOption", t.propTypes = {
                import: a.object.isRequired
            }, t
        })(o.default.Component);
    t.ThirdPartyImportOption = N
})), define("modules/clean/contacts/types", ["require", "exports"], (function(e, t) {
    "use strict";
    var n;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e[e.EMAIL = 0] = "EMAIL", e[e.FB = 1] = "FB", e[e.INVALID_ID = 2] = "INVALID_ID", e[e.NEW_STYLE_GROUP = 4] = "NEW_STYLE_GROUP", e[e.DBX_ID = 5] = "DBX_ID"
    })(n || (n = {})), t.default = n
})), define("modules/clean/contacts/util", ["require", "exports", "tslib", "modules/clean/contacts/contact", "modules/clean/contacts/types"], (function(e, t, n, r, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), s = n.__importDefault(s);
    var o = (function() {
        function e() {}
        return e.activityUserToContact = function(e, t) {
            return void 0 === t && (t = 0), {
                dbx_account_id: e.unique_id,
                fname: e.fname,
                lname: e.lname,
                name: e.display_name,
                name_tokens: [e.fname, e.lname],
                email: e.email,
                type: s.default.DBX_ID,
                priority: t,
                photo_url: e.photo_circle_url
            }
        }, e.teamGroupInfoToContact = function(e) {
            return new r.Contact({
                group_id: e.id,
                group_size: e.group_size,
                type: s.default.NEW_STYLE_GROUP,
                name: e.name,
                on_team: !0,
                pending: !1
            })
        }, e
    })();
    t.default = o
})), define("modules/clean/flux/store_listener", ["require", "exports", "tslib", "create-react-class", "react"], (function(e, t, n, r, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s);
    t.listenToStores = function(e, t, n) {
        return r.default({
            displayName: "StoreListener(" + (null != e.displayName ? e.displayName : "Unknown") + ")",
            getInitialState: function() {
                return {
                    childProps: n(this.props, t)
                }
            },
            componentDidMount: function() {
                for (var e = 0, r = Object.keys(t || {}); e < r.length; e++) {
                    var s = r[e];
                    t[s].add_change_listener(this._handleStoreChanged)
                }
                return this.setState({
                    childProps: n(this.props, t)
                })
            },
            componentWillUnmount: function() {
                var e = this;
                return (function() {
                    for (var n = [], r = 0, s = Object.keys(t || {}); r < s.length; r++) {
                        var o = s[r],
                            i = t[o];
                        n.push(i.remove_change_listener(e._handleStoreChanged))
                    }
                    return n
                })()
            },
            render: function() {
                for (var t = {
                        ref: "wrapped"
                    }, n = 0, r = Object.keys(this.state.childProps || {}); n < r.length; n++) {
                    var o = r[n],
                        i = this.state.childProps[o];
                    t[o] = i
                }
                return s.default.createElement(e, t, this.props.children)
            },
            getWrappedComponent: function() {
                return this.refs.wrapped
            },
            getStores: function() {
                return t
            },
            _handleStoreChanged: function() {
                if (this.isMounted()) {
                    var e = n(this.props, t);
                    if (null != e) return this.setState({
                        childProps: e
                    })
                }
            }
        })
    }
})), define("modules/clean/growth/experiments/overquota_sharing_helper", ["require", "exports", "modules/core/i18n"], (function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getModalConfigSubgrowthProShmCtaCopy = function(e) {
        void 0 === e && (e = "OFF");
        var t = {
            buttonText: n.intl.formatMessage({
                defaultMessage: "Upgrade to add folder"
            }),
            buttonTextUntranslated: "Upgrade to add folder",
            secondaryCtaText: "",
            showX: !0
        };
        return "OFF" !== e && (["V1", "V4", "V7"].includes(e) && (t.buttonText = n.intl.formatMessage({
            defaultMessage: "Upgrade for more space"
        }), t.buttonTextUntranslated = "Upgrade for more space"), ["V2", "V5", "V8"].includes(e) && (t.buttonText = n.intl.formatMessage({
            defaultMessage: "Upgrade to collaborate"
        }), t.buttonTextUntranslated = "Upgrade to collaborate"), ["V3", "V4", "V5"].includes(e) && (t.secondaryCtaText = n.intl.formatMessage({
            defaultMessage: "Cancel"
        })), ["V6", "V7", "V8"].includes(e) && (t.secondaryCtaText = n.intl.formatMessage({
            defaultMessage: "I understand, but no thanks"
        })), ["V3", "V4", "V5", "V6", "V7", "V8"].includes(e) && (t.showX = !1)), t
    }
})), define("modules/clean/react/calendar", ["require", "exports", "tslib", "classnames", "spectrum/dropdown_button", "react", "react-dom", "modules/clean/datetime", "modules/clean/react/css", "modules/clean/react/sprite", "modules/core/i18n"], (function(e, t, n, r, s, o, i, a, l, u, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), o = n.__importDefault(o), i = n.__importStar(i), a = n.__importStar(a);
    var d = 37,
        p = 38,
        h = 39,
        _ = 40,
        f = function() {},
        m = 0,
        g = function(e) {
            void 0 === e && (e = new Date);
            var t = new Date(e.getTime());
            t.setFullYear(t.getFullYear() - 1);
            var n = new Date(e.getTime());
            return n.setFullYear(n.getFullYear() + 1), {
                disabled: !1,
                isMaestroDesign: !1,
                firstDay: t,
                lastDay: n,
                alignAtLeft: !0,
                onDateChange: f,
                calendarIsInitiallyVisible: !1
            }
        },
        y = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    currentDate: t.props.initDate,
                    calendarIsVisible: t.props.calendarIsInitiallyVisible
                }, t.setCalendarDateViewRef = function(e) {
                    t.refCalendarDateView = i.findDOMNode(e)
                }, t.setCalendarViewRef = function(e) {
                    t.refCalendarView = i.findDOMNode(e)
                }, t._handleDocumentClick = function(e) {
                    if (t.refCalendarView && t.refCalendarDateView) {
                        var n = e.target;
                        !t.state.calendarIsVisible || t.refCalendarView.contains(n) || t.refCalendarDateView.contains(n) || (e.preventDefault(), e.stopPropagation(), t.closeCalendar())
                    }
                }, t.toggleCalendarView = function() {
                    t.setState({
                        calendarIsVisible: !t.state.calendarIsVisible
                    })
                }, t.handleDateSelected = function(e) {
                    t.setState({
                        currentDate: e
                    }), t.props.onDateChange(e), t.closeCalendar()
                }, t.closeCalendar = function() {
                    t.setState({
                        calendarIsVisible: !1
                    }), t.refCalendarDateView && t.refCalendarDateView.focus(), t.props.onCalendarClose && t.props.onCalendarClose()
                }, t._startOfDay = function(e) {
                    var t = new Date(e.getTime());
                    return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t
                }, t._getDateViewText = function() {
                    var e = function(e) {
                        return a.format_date(e, a.localized_date_format)
                    };
                    return t.props.placeholderText && !t.props.initDate ? t.props.placeholderText : t.state.currentDate ? e(t.state.currentDate) : e(new Date)
                }, t
            }
            return n.__extends(t, e), t.prototype.componentDidMount = function() {
                document.addEventListener("click", this._handleDocumentClick)
            }, t.prototype.componentWillUnmount = function() {
                document.removeEventListener("click", this._handleDocumentClick)
            }, t.prototype.render = function() {
                var e, t = {
                    "c-datepicker": !0,
                    "scooter-css u-l-fl clearfix": !this.props.isMaestroDesign
                };
                return this.state.calendarIsVisible && (e = o.default.createElement(w, {
                    ref: this.setCalendarViewRef,
                    alignAtLeft: this.props.alignAtLeft,
                    firstDay: this._startOfDay(this.props.firstDay),
                    lastDay: this._startOfDay(this.props.lastDay),
                    initDate: this.state.currentDate || new Date,
                    onDateChange: this.handleDateSelected,
                    onCalendarClose: this.props.onCalendarClose,
                    onEscapePressed: this.closeCalendar
                })), o.default.createElement("div", {
                    className: r.default(t)
                }, o.default.createElement(b, {
                    buttonText: this._getDateViewText(),
                    ref: this.setCalendarDateViewRef,
                    calendarVisible: this.state.calendarIsVisible,
                    disabled: this.props.disabled,
                    isMaestroDesign: this.props.isMaestroDesign,
                    onClick: this.toggleCalendarView
                }), e)
            }, t.displayName = "Calendar", t.__updateDefaultProps = function(e) {
                t.defaultProps = g(e)
            }, t.defaultProps = g(), t
        })(o.default.Component);

    function v(e, t) {
        return e.getDate() === t.getDate() && e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear()
    }
    t.CalendarComponent = y;
    var b = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.renderLegacyCaret = function() {
                    return o.default.createElement(u.Sprite, {
                        group: "web",
                        name: "calendar_view_month",
                        className: "u-l-fr",
                        alt: t.props.description
                    })
                }, t
            }
            return n.__extends(t, e), t.prototype.render = function() {
                var e = {
                    "is-active": this.props.calendarVisible,
                    "c-input": !this.props.isMaestroDesign,
                    "filter-item__filter-input": this.props.isMaestroDesign
                };
                if (this.props.isMaestroDesign) return o.default.createElement(s.DropdownButton, {
                    disabled: this.props.disabled,
                    onClick: this.props.onClick,
                    "aria-expanded": this.props.calendarVisible
                }, this.props.buttonText);
                var t = o.default.createElement("span", {
                    className: "c-calendar__date-text"
                }, this.props.buttonText);
                return o.default.createElement("button", {
                    className: r.default(e),
                    disabled: this.props.disabled,
                    onClick: this.props.onClick,
                    "aria-expanded": this.props.calendarVisible
                }, this.renderLegacyCaret(), t)
            }, t.displayName = "CalendarDateView", t.defaultProps = {
                isMaestroDesign: !1,
                calendarVisible: !0,
                onClick: function() {},
                disabled: !1,
                description: c.intl.formatMessage({
                    defaultMessage: "Change deadline"
                })
            }, t
        })(o.default.Component),
        w = (function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.state = {
                    viewDate: n.props.initDate,
                    currentlyActiveDate: n.props.initDate
                }, n.clampToFirstLastDate = function(e) {
                    e < n.props.firstDay ? e.setTime(n.props.firstDay.getTime()) : e > n.props.lastDay && e.setTime(n.props.lastDay.getTime())
                }, n.getDaysInMonth = function(e) {
                    return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()
                }, n.setPrevMonthButtonRef = function(e) {
                    n.refPrevButton = e
                }, n.setNextMonthButtonRef = function(e) {
                    n.refNextButton = e
                }, n.setCurrentDayButtonRefAndMaintainFocus = function(e) {
                    var t = document.activeElement && document.activeElement.getAttribute("data-day-in-month");
                    n.refCurrentDayButton = e, n.refCurrentDayButton && t && n.refCurrentDayButton.focus()
                }, n.handleDayClicked = function(e) {
                    var t = e.target,
                        r = parseInt(t.getAttribute("data-day-in-month") || "", 10),
                        s = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth(), r);
                    n.setState({
                        currentlyActiveDate: s
                    }), n.props.onDateChange(s)
                }, n.handleKeyDownOnDay = function(e) {
                    if (27 === e.which) return n.props.onEscapePressed(), void e.preventDefault();
                    if (9 === e.which) {
                        var t = void 0,
                            r = n.refNextButton.classList.contains("u-l-dn") ? null : n.refNextButton,
                            s = n.refPrevButton.classList.contains("u-l-dn") ? null : n.refPrevButton;
                        return (t = e.shiftKey ? r || s : s || r) && t.focus(), void e.preventDefault()
                    }
                    if (-1 !== [p, h, _, d].indexOf(e.which)) {
                        var o = n.getDaysInMonth(n.props.initDate),
                            i = (n.state.currentlyActiveDate || n.props.initDate).getDate(),
                            a = null;
                        switch (e.which) {
                            case p:
                                a = Math.max(1, i - 7);
                                break;
                            case h:
                                a = Math.min(o, i + 1);
                                break;
                            case _:
                                a = Math.min(o, i + 7);
                                break;
                            case d:
                                a = Math.max(1, i - 1)
                        }
                        if (null != a) {
                            var l = new Date(n.state.viewDate.getTime());
                            l.setDate(a), n.clampToFirstLastDate(l), n.setState({
                                currentlyActiveDate: l
                            })
                        }
                        e.preventDefault()
                    }
                }, n.renderDay = function(e, t) {
                    var s = !t;
                    n.props.lastDay && (t = t || e > n.props.lastDay), n.props.firstDay && (t = t || e < n.props.firstDay);
                    var i = v(n.state.currentlyActiveDate, e),
                        l = {
                            "button-as-link": !t,
                            "c-calendar__date": !0,
                            "c-calendar__date--disabled": t,
                            "current-month": s,
                            "c-calendar__date--was-initially-active": v(n.props.initDate, e),
                            "c-calendar__date--is-active": i
                        },
                        u = f;
                    v(n.state.currentlyActiveDate, e) && (u = n.setCurrentDayButtonRefAndMaintainFocus);
                    var c = "day" + e.getDate() + "-" + e.getMonth(),
                        d = a.nice_date_with_month_name(e, !0, !0);
                    return o.default.createElement("td", {
                        key: c
                    }, o.default.createElement("button", {
                        className: r.default(l),
                        disabled: t,
                        onClick: t ? void 0 : n.handleDayClicked,
                        onKeyDown: n.handleKeyDownOnDay,
                        "data-day-in-month": e.getDate(),
                        "aria-label": d,
                        ref: u
                    }, e.getDate()))
                }, n.renderDays = function() {
                    for (var e = [], t = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth(), 1), r = t.getDay(); r > 0; r--) {
                        var s = new Date(t.getFullYear(), t.getMonth(), t.getDate());
                        s.setDate(s.getDate() - r), e.push(n.renderDay(s, !0))
                    }
                    for (var i = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth(), 1); i.getMonth() === n.state.viewDate.getMonth();) e.push(n.renderDay(i)), i = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth(), i.getDate() + 1);
                    for (var a = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth() + 1, 0); 6 !== a.getDay();) a = new Date(a.getFullYear(), a.getMonth(), a.getDate() + 1), e.push(n.renderDay(a, !0));
                    var l = [],
                        u = [];
                    return e.forEach((function(e, t) {
                        u.push(e), (t + 1) % 7 == 0 && (l.push(o.default.createElement("tr", {
                            key: "week-" + t
                        }, u)), u = [])
                    })), l
                }, n.offsetViewDateByMonth = function(e) {
                    n.setState({
                        viewDate: new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth() + e, 1)
                    })
                }, n.handleClickNextMonth = function() {
                    n.offsetViewDateByMonth(1)
                }, n.handleClickPrevMonth = function() {
                    n.offsetViewDateByMonth(-1)
                }, n.handleKeyDownMonthButton = function(e) {
                    if (27 === e.which) return n.props.onEscapePressed(), void e.preventDefault();
                    if (9 === e.which) {
                        var t = !e.shiftKey,
                            r = void 0,
                            s = n.refNextButton.classList.contains("u-l-dn") ? void 0 : n.refNextButton,
                            o = n.refPrevButton.classList.contains("u-l-dn") ? void 0 : n.refPrevButton,
                            i = n.refCurrentDayButton;
                        (r = e.target === n.refPrevButton ? t ? s || i : i || s : t ? i || o : o || i) && r.focus(), e.preventDefault()
                    }
                }, n.renderMonthChangers = function() {
                    var e = [],
                        t = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth(), 1),
                        s = new Date(n.state.viewDate.getFullYear(), n.state.viewDate.getMonth(), n.getDaysInMonth(n.state.viewDate)),
                        i = {
                            "arrow-select": !0,
                            "u-l-dn": t <= n.props.firstDay,
                            "ax-focusable": !0,
                            "u-l-fl": !0
                        };
                    e.push(o.default.createElement("button", {
                        className: r.default(i),
                        onClick: n.handleClickPrevMonth,
                        ref: n.setPrevMonthButtonRef,
                        onKeyDown: n.handleKeyDownMonthButton
                    }, o.default.createElement("span", {
                        className: "c-arrow c-arrow--left u-thide"
                    }, c.intl.formatMessage({
                        defaultMessage: "Previous month"
                    }))));
                    var a = {
                        "arrow-select": !0,
                        "u-l-dn": s >= n.props.lastDay,
                        "ax-focusable": !0,
                        "u-l-fr": !0
                    };
                    return e.push(o.default.createElement("button", {
                        className: r.default(a),
                        onClick: n.handleClickNextMonth,
                        ref: n.setNextMonthButtonRef,
                        onKeyDown: n.handleKeyDownMonthButton
                    }, o.default.createElement("span", {
                        className: "c-arrow c-arrow--right u-thide"
                    }, c.intl.formatMessage({
                        defaultMessage: "Next month"
                    })))), e
                }, n.renderWeekdayRows = function() {
                    return [c.intl.formatMessage({
                        defaultMessage: "Sunday"
                    }), c.intl.formatMessage({
                        defaultMessage: "Monday"
                    }), c.intl.formatMessage({
                        defaultMessage: "Tuesday"
                    }), c.intl.formatMessage({
                        defaultMessage: "Wednesday"
                    }), c.intl.formatMessage({
                        defaultMessage: "Thursday"
                    }), c.intl.formatMessage({
                        defaultMessage: "Friday"
                    }), c.intl.formatMessage({
                        defaultMessage: "Saturday"
                    })].map((function(e) {
                        return o.default.createElement("th", {
                            key: e
                        }, o.default.createElement("abbr", {
                            title: e
                        }, e.slice(0, 3)))
                    }))
                }, n.calendarId = ++m, n
            }
            return n.__extends(t, e), t.prototype.componentDidMount = function() {
                this.refCurrentDayButton && this.refCurrentDayButton.focus()
            }, t.prototype.componentWillUpdate = function(e, t) {
                if (t.viewDate && t.viewDate.getMonth() !== this.state.viewDate.getMonth()) {
                    var n = new Date(t.viewDate.getTime()),
                        r = this.getDaysInMonth(t.viewDate);
                    n.setDate(Math.min(r, this.state.currentlyActiveDate.getDate())), this.clampToFirstLastDate(n), this.setState({
                        currentlyActiveDate: n
                    })
                }
            }, t.prototype.render = function() {
                var e = {
                        "c-calendar": !0,
                        "c-card": !0,
                        "u-pad-xs": !0,
                        "u-left": this.props.alignAtLeft,
                        "u-right": !this.props.alignAtLeft
                    },
                    t = "calendar-header-" + ++this.calendarId,
                    n = this.renderMonthChangers(),
                    s = n[0],
                    i = n[1],
                    l = o.default.createElement("strong", {
                        id: t,
                        "aria-live": "assertive",
                        "aria-atomic": "true"
                    }, c.intl.formatMessage({
                        defaultMessage: "{month} {year}",
                        description: "For example 'January 2010'. This is used as part of a calendar."
                    }, {
                        month: a.month_name(this.state.viewDate.getMonth()),
                        year: this.state.viewDate.getFullYear()
                    }));
                return o.default.createElement("div", {
                    className: r.default(e)
                }, o.default.createElement("div", {
                    className: "c-calendar__nav u-mar-bottom-s u-font-center u-cf"
                }, s, i, l), o.default.createElement("table", {
                    className: "c-calendar__picker"
                }, o.default.createElement("thead", {
                    className: "ax-visually-hidden"
                }, o.default.createElement("tr", null, this.renderWeekdayRows())), o.default.createElement("tbody", null, this.renderDays())))
            }, t.displayName = "CalendarView", t.defaultProps = {
                onDateChange: f,
                onEscapePressed: f,
                alignAtLeft: !1
            }, t
        })(o.default.Component);
    t.CalendarView = w, t.Calendar = l.requireCssWithComponent(y, ["/static/css/scooter/scooter-scoped-vfljL5ijS.css", "/static/css/components/calendar-vflL_rFOa.css"])
})), define("modules/clean/react/overquota_modal_helpers", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.constructImageObject = function(e) {
        void 0 === e && (e = "");
        var t = function(e) {
                return "/static/images/pro/overquota/" + e + ".png"
            },
            n = function(e, n, r) {
                return {
                    height: r,
                    width: n,
                    src: t(e),
                    srcHiRes: t(e + "@2x")
                }
            };
        switch (e) {
            case "V1":
                return n("illo-catbox", 138, 98);
            case "V2":
                return n("illo-clown-car", 138, 111);
            default:
                return n("overquota-folder", 130, 90)
        }
    }
})), define("modules/clean/react/pass/constants", ["require", "exports"], (function(e, t) {
    "use strict";
    var n;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ActionTypes = {
        PASS_PERMISSION_REQUEST: "PASS_PERMISSION_REQUEST",
        UPDATE_PERMISSIONS: "UPDATE_PERMISSIONS",
        FETCH_PASS_CONCLUDED: "FETCH_PASS_CONCLUDED",
        FETCH_PASS_ERROR: "FETCH_PASS_ERROR",
        RECEIVE_PRESENCE_DELTA: "RECEIVE_PRESENCE_DELTA",
        RECEIVE_PRESENCE_SNAPSHOT: "RECEIVE_PRESENCE_SNAPSHOT",
        RESET_PASS_INFO: "RESET_PASS_INFO",
        UPDATE_SEEN_STATE_INFO: "UPDATE_SEEN_STATE_INFO",
        UPDATE_SEEN_STATE_INFO_CONTINUE: "UPDATE_SEEN_STATE_INFO_CONTINUE",
        DISCONTINUE_SEEN_STATE_INFO: "DISCONTINUE_SEEN_STATE_INFO",
        UPDATE_SEEN_STATE_UNAVAILABLE: "FETCH_SEEN_STATE_UNAVAILABLE"
    }, t.EventTypes = {
        PASS_CLICK: "PASS_CLICK",
        PASS_SHOWN: "PASS_SHOWN",
        PASS_HOVER: "PASS_HOVER"
    }, t.LoggingActions = {
        STATUS_BEGIN: "status_begin",
        STATUS_RECEIVE: "status_receive",
        SEEN_STATE_BEGIN: "seen_state_begin",
        SEEN_STATE_RECEIVE: "seen_state_receive",
        SEEN_STATE_USERS_BEGIN: "seen_state_users_begin",
        SEEN_STATE_USERS_RECEIVE: "seen_state_users_receive",
        TRANSMITTER_TOKEN_BEGIN: "transmitter_token_begin",
        TRANSMITTER_TOKEN_RECEIVE: "transmitter_token_receive",
        RECEIVER_TOKEN_BEGIN: "receiver_token_begin",
        RECEIVER_TOKEN_RECEIVE: "receiver_token_receive",
        PRESENCE_RECEIVE: "presence_receive",
        MEMBER_COUNTS_BEGIN: "member_counts_begin",
        MEMBER_COUNTS_RECEIVE: "member_counts_receive",
        LIST_MEMBERS_BEGIN: "list_members_begin",
        LIST_MEMBERS_RECEIVE: "list_members_receive",
        LIST_MEMBERS_NO_SEEN_STATE: "list_members_no_seen_state"
    }, (function(e) {
        e[e.NOT_YET_KNOWN = 0] = "NOT_YET_KNOWN", e[e.FETCHING = 1] = "FETCHING", e[e.ERROR = 2] = "ERROR", e[e.SEEN_STATE_SUCCESS = 3] = "SEEN_STATE_SUCCESS", e[e.SEEN_STATE_DISALLOWED = 4] = "SEEN_STATE_DISALLOWED", e[e.PRESENCE_SUCCESS = 5] = "PRESENCE_SUCCESS", e[e.PASS_SUCCESS = 6] = "PASS_SUCCESS", e[e.PASS_MIXED_SUCCESS = 7] = "PASS_MIXED_SUCCESS", e[e.CONCLUDED = 8] = "CONCLUDED"
    })(n = t.PassFetchingStatus || (t.PassFetchingStatus = {})), (function(e) {
        e[e.UNKNOWN = 0] = "UNKNOWN", e[e.WEB = 1] = "WEB", e[e.MOBILE = 2] = "MOBILE", e[e.DESKTOP = 3] = "DESKTOP"
    })(t.PassPlatform || (t.PassPlatform = {})), t.fetchingStatusSeenStateIsComplete = function(e) {
        return -1 !== [n.SEEN_STATE_SUCCESS, n.SEEN_STATE_DISALLOWED, n.PASS_SUCCESS, n.PASS_MIXED_SUCCESS, n.CONCLUDED].indexOf(e)
    }, t.fetchingStatusCanLogAsShown = function(e) {
        return e === n.PASS_SUCCESS || e === n.PASS_MIXED_SUCCESS
    }, t.fetchingStatusIsSuccessful = function(e) {
        return -1 !== [n.PASS_SUCCESS, n.PASS_MIXED_SUCCESS, n.CONCLUDED].indexOf(e)
    }, t.fetchingStatusIsComplete = function(e) {
        return -1 !== [n.PASS_SUCCESS, n.PASS_MIXED_SUCCESS, n.ERROR, n.CONCLUDED].indexOf(e)
    }, t.fetchingStatusIsError = function(e) {
        return e === n.ERROR
    }, t.MAX_FACES_NORMAL = 5, t.MAX_OVERFLOW_BUTTON_INDICATOR = 99, t.FACEPILE_CLASSNAME = "react-pass__facepile", t.PRESENCE_RECEIVED_CLASSNAME = "facepile-presence-received", t.EMPTY_FACEPILE_CLASSNAME = "react-pass__facepile--empty"
})), define("modules/clean/react/pass/utils", ["require", "exports", "tslib", "external/lodash", "modules/clean/react/pass/constants", "modules/core/i18n", "modules/core/user_i18n", "modules/core/browser", "modules/core/uri"], (function(e, t, n, r, s, o, i, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), i = n.__importStar(i), a = n.__importStar(a), (function(e) {
        function t(e) {
            return e.startsWith("dbafvid:")
        }
        e.isAnonymousUserId = t, e.isAnonymousSeenState = function(e) {
            return t(e.seen_state_user.user_id)
        }, e.getAnonymousUserIds = function(e) {
            return r.filter(e, t)
        }, e.filterAnonymousUserIds = function(e) {
            return r.reject(e, t)
        }, e.getAnonymousViewerInitials = function(e) {
            return i.isCjkLocale() && 1 === e.split(" ").length ? e.substring(0, 1) : i.getInitials(e)
        }
    })(t.AnonymousViewerUtils || (t.AnonymousViewerUtils = {})), t.parsePlatformString = function(e) {
        switch (e) {
            case "web":
                return s.PassPlatform.WEB;
            case "mobile":
                return s.PassPlatform.MOBILE;
            case "desktop":
                return s.PassPlatform.DESKTOP
        }
        return s.PassPlatform.UNKNOWN
    }, t.getOnPlatformText = function(e) {
        switch (e) {
            case s.PassPlatform.WEB:
                return o.intl.formatMessage({
                    defaultMessage: "on web"
                });
            case s.PassPlatform.DESKTOP:
                return o.intl.formatMessage({
                    defaultMessage: "on desktop"
                });
            case s.PassPlatform.MOBILE:
                return o.intl.formatMessage({
                    defaultMessage: "on mobile"
                })
        }
        return null
    }, t.shouldIncrementOverflowBasisForAccessType = function(e) {
        if (e) switch (e.type) {
            case "link_only":
            case "view_link_access":
            case "edit_link_access":
                return !0;
            case "view_member_access":
            case "edit_member_access":
                return e.value.group_access_only
        }
        return !1
    }, t.navigateToInviteModal = function(e) {
        void 0 === e && (e = []);
        var t = {};
        return e.length > 0 && btoa ? t.invite_emails = btoa(e.join(",")) : t.show_invite_members = "1", a.redirect(new l.URI({
            path: "/team/admin/members",
            query: t
        }))
    }, t.navigateToSuggestModal = function(e) {
        void 0 === e && (e = []);
        var t = {
            suggest_members: "1"
        };
        return e.length > 0 && btoa && (t.invite_emails = btoa(e.join(","))), a.redirect(new l.URI({
            path: "/team",
            query: t
        }))
    }
})), define("modules/clean/react/select", ["require", "exports", "tslib", "classnames", "create-react-class", "react", "react-dom", "react-dom-factories", "prop-types", "external/lodash", "jquery", "modules/clean/keycode", "modules/clean/react/form_error_mixin", "modules/clean/react/hidden", "modules/clean/react/sprite", "modules/clean/react/util", "modules/core/dom"], (function(e, t, n, r, s, o, i, a, l, u, c, d, p, h, _, f, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s), o = n.__importDefault(o), i = n.__importStar(i), a = n.__importStar(a), l = n.__importStar(l), u = n.__importStar(u), c = n.__importDefault(c), p = n.__importDefault(p), f = n.__importStar(f), m = n.__importStar(m);
    var g = o.default.createElement,
        y = l.oneOfType([l.string, l.number]),
        v = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    id: u.uniqueId("option")
                }, t
            }
            return n.__extends(t, e), t.prototype.componentWillReceiveProps = function(e) {
                if (null != e.id) return this.setState({
                    id: e.id
                })
            }, t.prototype.render = function() {
                var e = {
                    "list-item": !0,
                    "select-option": !0,
                    "select-option-disabled": this.props.disabled
                };
                null != this.props.className && (e[this.props.className] = !0);
                var t = this.props.value,
                    n = c.default.extend(!0, {}, this.props);
                return delete n.value, a.div(c.default.extend({
                    "data-value": t
                }, n, {
                    id: this.state.id,
                    role: "option",
                    className: r.default(e),
                    "aria-disabled": this.props.disabled
                }), this.props.children)
            }, t.displayName = "selectOption", t.propTypes = {
                id: l.string,
                className: l.string,
                disabled: l.bool,
                title: l.string,
                value: y,
                error: l.shape({
                    message_text: l.string,
                    message_html: l.string
                })
            }, t
        })(o.default.Component);
    t.option = v;
    var b = s.default({
        displayName: "selectInput",
        mixins: [p.default],
        mouseInput: !0,
        propTypes: {
            name: l.string,
            onChange: l.func,
            defaultValue: y,
            style: l.object,
            value: y,
            variant: l.string,
            className: l.string,
            ariaLabelId: l.string,
            ariaDescriptionId: l.string,
            valueLink: l.object,
            isDisabled: l.bool,
            headerElement: l.element
        },
        getDefaultProps: function() {
            return {
                errorWrapperClassName: "select-input-error-wrapper",
                ariaLabelId: "",
                ariaDescriptionId: "",
                style: null,
                headerElement: null
            }
        },
        getInitialState: function() {
            return {
                open: !1,
                focused: null,
                keyboarsSelectPrefix: "",
                selectOptionId: u.uniqueId("selected-option"),
                listboxId: u.uniqueId("listbox"),
                value: this.props.defaultValue
            }
        },
        _getFilteredChildren: function() {
            return u.isArray(this.props.children) ? u.filter(this.props.children, (function(e) {
                return e
            })) : this.props.children
        },
        render: function() {
            var e = this,
                t = {
                    "select-input": !0,
                    "select-input-dropdown-shown": this.state.open,
                    "select-input-disabled": this.props.isDisabled
                };
            this.props.variant && (t[this.props.variant] = !0), this.props.className && (t[this.props.className] = !0);
            var n = {
                    "list-menu": !0,
                    "select-input-dropdown": !0,
                    "select-input-disable-error": this.props["disable-errors"]
                },
                s = this.renderErrorIfEnabled(),
                i = this.props.ariaDescriptionId;
            ((null != this.props.error ? this.props.error.message_text : void 0) || null != (null != this.props.error ? this.props.error.message_html : void 0)) && (i = s.props.id);
            var l, u = this.selectedOption();
            return a.div({
                className: r.default(t),
                style: this.props.style,
                ref: "wrapperDiv"
            }, s, a.button({
                className: "select-input-button",
                "aria-expanded": this.state.open,
                "aria-describedby": i,
                "aria-controls": this.state.listboxId,
                "aria-labelledby": this.props.ariaLabelId + " " + u.props.id,
                ref: "selectButton",
                tabIndex: 0,
                onClick: this.handleClickOnInputButton
            }, a.div({
                className: "select-input-input filter-item__filter-input",
                ref: "label"
            }, u, a.div({
                className: "select-input-dropdown-arrow"
            }, g(_.Sprite, {
                group: "web",
                name: "arrow-down-gray",
                alt: ""
            })))), g(h.HiddenSelect, {
                name: this.props.name,
                defaultValue: this.props.defaultValue,
                value: this.getValue(),
                options: (l = [], o.default.Children.forEach(e._getFilteredChildren(), (function(e) {
                    return l.push(e.props.value)
                })), l)
            }), a.div({
                className: "hidden-option-container"
            }, a.div({
                id: this.state.listboxId,
                className: r.default(n),
                role: "listbox",
                onKeyDown: this.handleKeydown,
                onMouseMove: this.handleMouseMove,
                tabIndex: -1,
                ref: "dropdown"
            }, this.menuChildren())))
        },
        handleMouseMove: function(e) {
            var t;
            if (!this.props.isDisabled) {
                e.pageX === n && e.pageY === t || (this.mouseInput = !0);
                var n = e.pageX;
                return e.pageY
            }
        },
        _commonPrefixLen: function(e, t) {
            e = e.trim().toLowerCase(), t = t.trim().toLowerCase();
            for (var n = 0; n < e.length && n < t.length && e.charAt(n) === t.charAt(n);) n++;
            return n
        },
        _keyboardSelect: function(e) {
            var t = u.sortedIndexBy(this.sortedOptions, {
                    text: e.toLowerCase()
                }, "text"),
                n = this.sortedOptions[Math.max(t - 1, 0)],
                r = this.sortedOptions[Math.min(t, this.sortedOptions.length - 1)];
            return this._commonPrefixLen(e, n.text) >= this._commonPrefixLen(e, r.text) ? this.setState({
                keyboarsSelectPrefix: e,
                focused: n.value
            }) : this.setState({
                keyboarsSelectPrefix: e,
                focused: r.value
            })
        },
        handleKeydown: function(e) {
            var t = this;
            if (!this.props.isDisabled) {
                switch (this.mouseInput = !1, e.keyCode) {
                    case d.KeyCode.TAB:
                        return this.setState({
                            open: !1,
                            focused: null
                        }), !0;
                    case d.KeyCode.ENTER:
                    case d.KeyCode.SPACE:
                        this.state.open && this.state.focused ? (this.setValue(this.state.focused), this.setState({
                            open: !1
                        })) : this.toggle();
                        break;
                    case d.KeyCode.ESC:
                        if (this.state.open) {
                            var n = this.getValue();
                            this.setValue(n), this.setState({
                                open: !1
                            })
                        }
                        break;
                    case d.KeyCode.UP:
                        this.state.open ? this.setState({
                            focused: this.prev(this.state.focused)
                        }) : this.setState({
                            open: !0
                        });
                        break;
                    case d.KeyCode.DOWN:
                        this.state.open ? this.setState({
                            focused: this.next(this.state.focused)
                        }) : this.setState({
                            open: !0
                        });
                        break;
                    default:
                        if (!this.state.open) return !0;
                        if (!u.values(d.KeyCode).includes(e.keyCode)) {
                            var r = String.fromCharCode(e.which),
                                s = this.state.keyboarsSelectPrefix + r;
                            this._keyboardSelect(s), this._keyboardSelect_timeout && clearTimeout(this._keyboardSelect_timeout), this._keyboardSelect_timeout = setTimeout((function() {
                                return t.setState({
                                    keyboarsSelectPrefix: ""
                                }), t._keyboardSelect_timeout = null
                            }), 500)
                        }
                }
                return !1
            }
        },
        prev: function(e) {
            var t = null,
                n = null;
            return o.default.Children.forEach(this._getFilteredChildren(), (function(r) {
                if (n || r.props.disabled || (n = r), r.props.value === e && (t = n), !r.props.disabled) return n = r
            })), null != t ? t.props.value : void 0
        },
        next: function(e) {
            var t, n = null,
                r = null;
            return o.default.Children.forEach(this._getFilteredChildren(), (function(t) {
                if (!t.props.disabled) return (null != r ? r.props.value : void 0) === e && (n = t), r = t
            })), null === (t = n || r) || void 0 === t ? void 0 : t.props.value
        },
        menuChildren: function() {
            var e = this,
                t = this.getValue();
            return o.default.Children.map(this._getFilteredChildren(), (function(n) {
                return o.default.cloneElement(n, {
                    onMouseEnter: function() {
                        if (m.scroll_lock_document(), e.mouseInput) return e.setState({
                            focused: n.props.value
                        })
                    },
                    onMouseOut: function() {
                        return m.scroll_unlock_document()
                    },
                    onClick: function() {
                        if (!n.props.disabled) return e.setState({
                            open: !1
                        }), e.setValue(n.props.value)
                    },
                    className: r.default({
                        "focused-option": null != e.state.focused && e.state.focused === n.props.value,
                        "selected-option": t === n.props.value
                    }, n.props.className)
                })
            }))
        },
        componentWillMount: function() {
            var e = o.default.Children.map(this._getFilteredChildren(), (function(e) {
                return {
                    value: e.props.value,
                    text: f.getText(e).trim().toLowerCase()
                }
            }));
            return this.sortedOptions = u.sortBy(e, "text")
        },
        componentDidMount: function() {
            var e = this;
            return this.globalMenuCloser = function(t) {
                if (e.state.open) {
                    var n = c.default(t.target).closest(".select-input");
                    if (!n.length || n[0] !== i.findDOMNode(e.refs.wrapperDiv)) return e.setState({
                        open: !1,
                        focused: null
                    })
                }
            }, c.default(document).on("click", this.globalMenuCloser)
        },
        componentWillUnmount: function() {
            return c.default(document).off("click", this.globalMenuCloser)
        },
        componentDidUpdate: function(e, t) {
            var n, r = c.default(i.findDOMNode(this.refs.dropdown)),
                s = c.default(i.findDOMNode(this.refs.selectButton));
            this.state.open && (n = r.find("[data-value='" + this.state.focused + "']"), r.attr("aria-activedescendant", n.attr("id"))), this.state.open && this.state.focused && null == this.props.headerElement && (n = r.find("[data-value='" + this.state.focused + "']"), r.attr("aria-activedescendant", n.attr("id")), (function(e, t) {
                var n = e.scrollTop(),
                    r = n + e.height(),
                    s = t.position().top + n,
                    o = s + t.height();
                s < n ? e.scrollTop(s) : o > r && e.scrollTop(o - e.height())
            })(r, n));
            var o = t.open && !this.state.open;
            if (!t.open && this.state.open && r.focus(), o) return s.focus()
        },
        selectedOption: function() {
            var e = this,
                t = null;
            return null != this.props.headerElement ? this.props.headerElement : (o.default.Children.forEach(this._getFilteredChildren(), (function(n) {
                if (t || (t = n), (null != n ? n.props.value : void 0) === e.getValue()) return t = n
            })), t ? o.default.cloneElement(t, {
                id: this.state.selectOptionId
            }) : null)
        },
        handleClickOnInputButton: function(e) {
            return e.preventDefault(), this.toggle()
        },
        toggle: function() {
            if (!this.props.isDisabled) return this.state.open ? this.setState({
                open: !1,
                focused: null
            }) : this.setState({
                open: !0,
                focused: this.getValue()
            })
        },
        getValue: function() {
            var e, t;
            return null != (e = null != (t = null != this.props.value ? this.props.value : null != this.props.valueLink ? this.props.valueLink.value : void 0) ? t : this.state.value) ? e : this.props.defaultValue
        },
        setValue: function(e) {
            var t = this.getValue();
            if (this.props.valueLink ? this.props.valueLink.requestChange(e) : this.setState({
                    value: e
                }), t !== e || null != this.props.headerElement) return "function" == typeof this.props.onChange ? this.props.onChange(t, e) : void 0
        }
    });
    t.input = b
})), define("modules/clean/sharing/api/client", ["require", "exports", "tslib", "immutable", "external/lodash", "modules/clean/api_v2/error", "modules/clean/api_v2/types", "modules/clean/api_v2/user_client", "modules/clean/sharing/api/types/metadata", "modules/clean/sharing/api/util/types", "modules/clean/sharing/access_level", "modules/clean/sharing/constants", "modules/clean/viewer", "modules/core/exception", "modules/constants/sharing"], (function(e, t, n, r, s, o, i, a, l, u, c, d, p, h, _) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), s = n.__importStar(s), t.FilePolicy = l.FilePolicy, t.FolderPolicy = l.FolderPolicy, t.TeamSharingPolicies = l.TeamSharingPolicies, t.parseFolderPolicy = u.parseFolderPolicy;
    var f = (function(e) {
        function t(t) {
            var n = e.call(this) || this;
            return n.message = t, n.name = "ShareError", n.stack = (new Error).stack, n
        }
        return n.__extends(t, e), t
    })(Error);
    t.ShareError = f;
    var m = (function(e) {
        function t(t, n) {
            var r = t.userId,
                s = t.isNonUserRelativeContext,
                o = e.call(this, n) || this;
            return null == s && (s = !1), o.userId = r, s && null == o.teamMemberId && (o.teamMemberId = p.Viewer.get_viewer().work_user.team_member_id), o
        }
        return n.__extends(t, e), t.initClass = function() {
            this.prototype._getAccountBatchCache = {}, this.prototype._getCurrentAccountCache = null
        }, t.prototype._headers = function(t) {
            var r;
            return null != this.teamMemberId ? n.__assign(((r = {})[i.ApiV2HeaderNames.DropboxApiSelectAdmin] = this.teamMemberId, r), e.prototype._headers.call(this, t)) : e.prototype._headers.call(this, t)
        }, t.prototype.validateMembers = function(e) {
            e.contentId, e.accessLevel, e.members;
            throw new TypeError("Not implemented")
        }, t.prototype._validateMembers = function(e) {
            var t = e.contentId,
                n = e.contentType,
                r = e.accessLevel,
                s = e.members;
            return this.ns("sharing").rpc("targets/validate", {
                access_level: u.accessLevelConstToApi(r),
                content_type: n,
                content_id: t,
                members: s
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.addMembers = function(e) {
            e.contentId, e.members, e.accessLevel, e.customMessage, e.quiet, e.addMessageAsComment;
            throw new TypeError("Not implemented")
        }, t.prototype.addMembersWithAccessLevel = function(e) {
            e.contentId, e.members, e.customMessage, e.quiet;
            throw new TypeError("Not implemented")
        }, t.prototype.removeMember = function(e) {
            e.contentId, e.memberId;
            throw new TypeError("Not implemented")
        }, t.prototype.getMetadata = function(e) {
            e.contentId, e.isInSharedFolder, e.actions;
            throw new TypeError("Not implemented")
        }, t.prototype.getMetadataInternal = function(e) {
            e.contentId, e.actions;
            throw new TypeError("Not implemented")
        }, t.prototype.getMetadataAlpha = function(e) {
            e.contentId, e.actions;
            throw new TypeError("Not implemented")
        }, t.prototype.listMembers = function(e) {
            e.contentId, e.isAlpha;
            throw new TypeError("Not implemented")
        }, t.prototype.listMembersContinue = function(e) {
            e.cursor, e.isAlpha;
            throw new TypeError("Not implemented")
        }, t.prototype.getMemberCounts = function(e) {
            e.contentId;
            throw new TypeError("Not implemented")
        }, t.prototype.getParentFolderAccess = function(e) {
            e.contentId, e.memberId, e.accessLevel;
            throw new TypeError("Not implemented")
        }, t.prototype.updateMember = function(e) {
            e.contentId, e.memberId, e.accessLevel;
            throw new TypeError("Not implemented")
        }, t.prototype.dismissInviteNotification = function(e) {
            var t = e.contentId;
            return this.ns("sharing").rpc("dismiss_invite_notification", {
                content_id: t
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.getSharingPrefs = function() {
            return this.ns("users").rpc("get_sharing_prefs", void 0, {
                subjectUserId: this.userId
            }).then(u.sharingPrefsApiToRecord)
        }, t.prototype.setSharingPrefs = function(e) {
            return this.ns("users").rpc("set_sharing_prefs", e, {
                subjectUserId: this.userId
            })
        }, t.prototype.claimMembership = function(e) {
            var t = e.contentUrl;
            return this.ns("sharing").rpc("claim_membership", {
                content_url: t
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.checkJobStatus = function(e) {
            var t = e.jobId;
            return this.ns("sharing").rpc("check_job_status", {
                async_job_id: t
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.getAccountBatch = function(e) {
            var t = e.accountIds;
            return t.length > 0 ? (_.SHARING_EXPERIMENTS.FIX_MAX_ACCOUNT_BATCH_SIZE && t.length > 300 && (t = t.slice(0, 300)), this.ns("users").rpc("get_account_batch", {
                account_ids: t
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return e.map(u.accountInfoApiToRecord)
            }))) : Promise.resolve([])
        }, t.prototype.getAccountBatchCached = function(e) {
            var t = this,
                r = e.accountIds,
                o = this._getAccountBatchCache,
                i = Array.from(s.partition(r, (function(e) {
                    return e in o
                }))),
                a = i[0],
                l = i[1],
                u = s.values(s.pick(o, a));
            return this.getAccountBatch({
                accountIds: l
            }).then((function(e) {
                var r = s.zipObject(e.map((function(e) {
                    return e.account_id
                })), e);
                return t._getAccountBatchCache = n.__assign(n.__assign({}, o), r), e.concat(u)
            }))
        }, t.prototype.resetGetAccountBatchCache = function() {
            return this._getAccountBatchCache = {}
        }, t.prototype.getCurrentAccount = function(e) {
            return this.ns("users").rpc("get_current_account", void 0, {
                subjectUserId: this.userId
            }).then((function(e) {
                return u.fullAccountApiToRecord(e)
            }))
        }, t.prototype.getCurrentAccountCached = function(e) {
            return null == this._getCurrentAccountCache && (this._getCurrentAccountCache = this.getCurrentAccount()), this._getCurrentAccountCache
        }, t.prototype.resetGetCurrentAccountCache = function() {
            return this._getCurrentAccountCache = {}
        }, t.prototype.requestAccess = function(e) {
            var t = e.contentUrl,
                n = e.customMessage;
            return this.ns("sharing").rpc("request_access", {
                content_url: t,
                custom_message: n
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.sharedLinkInfo = function(e) {
            var t = e.fileIdOrPath;
            return h.assert(null != t, "an fqPath or fileId must be present to retrieve shared link info"), this.ns("sharing").rpc("alpha/list_shared_links", {
                path: t,
                direct_only: !0
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return e.links.map((function(e) {
                    return u.linkMetadataApiToRecord(e)
                }))
            }))
        }, t.prototype.createSharedLink = function(e) {
            var t = e.fileIdOrPath,
                n = e.settings;
            return h.assert(null != t, "an fqPath or fileId must be present to retrieve shared link info"), this.ns("sharing").rpc("alpha/create_shared_link_with_settings", {
                path: t,
                settings: n
            }, {
                subjectUserId: this.userId
            }).then(u.linkMetadataApiToRecord)
        }, t.prototype.modifySharedLinkSettings = function(e) {
            var t = e.url,
                n = e.settings,
                r = e.remove_expiration;
            return this.ns("sharing").rpc("alpha/modify_shared_link_settings", {
                url: t,
                settings: n,
                remove_expiration: r
            }, {
                subjectUserId: this.userId
            }).then(u.linkMetadataApiToRecord)
        }, t.prototype.revokeSharedLink = function(e) {
            var t = e.url;
            return this.ns("sharing").rpc("revoke_shared_link", {
                url: t
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype._addAccountsToMembership = function(e) {
            return this._addAccountsToMembershipBatch(r.Map([
                [1, e]
            ])).then((function(e) {
                return e.get(1)
            }))
        }, t.prototype._addAccountsToMembershipBatch = function(e) {
            var t = e.valueSeq().flatMap((function(e) {
                return e.users.valueSeq()
            })).map((function(e) {
                return e.memberId()
            })).toSet().toArray();
            return t.length > 0 ? this.getAccountBatchCached({
                accountIds: t
            }).then((function(t) {
                var n = r.Map(t.map((function(e) {
                    return [e.account_id, e]
                })));
                return e.map((function(e, t) {
                    return e.set("users", e.users.map((function(e) {
                        var t = n.get(e.account_id);
                        return null != t ? e.set("account", t) : e
                    })))
                }))
            })) : Promise.resolve(e)
        }, t
    })(a.UserApiV2Client);
    t.ShareApiClient = m, m.initClass();
    var g = (function(e) {
        function t(t) {
            var n = t.userId,
                r = t.isNonUserRelativeContext,
                s = e.call(this, {
                    userId: n,
                    isNonUserRelativeContext: r
                }) || this;
            return s.getMetadata = s.getMetadata.bind(s), s.getMetadataInternal = s.getMetadataInternal.bind(s), s.getMetadataAlpha = s.getMetadataAlpha.bind(s), s.validateFqPath = s.validateFqPath.bind(s), s._promises = {}, s
        }
        return n.__extends(t, e), t.prototype.validateMembers = function(e) {
            e.contentId, e.accessLevel, e.members;
            return this.createPromise("validateMembers")
        }, t.prototype.addMembers = function(e) {
            e.contentId, e.members, e.accessLevel, e.customMessage, e.quiet, e.addMessageAsComment;
            return this.createPromise("addMembers")
        }, t.prototype.addMembersWithAccessLevel = function(e) {
            e.contentId, e.members, e.customMessage, e.quiet;
            return this.createPromise("addMembersWithAccessLevel")
        }, t.prototype.getMetadata = function(e) {
            e.contentId, e.isInSharedFolder, e.actions;
            return this.createPromise("getMetadata")
        }, t.prototype.getMetadataInternal = function(e) {
            e.contentId, e.actions;
            return this.createPromise("getMetadataInternal")
        }, t.prototype.getMetadataAlpha = function(e) {
            e.contentId, e.actions;
            return this.createPromise("getMetadataAlpha")
        }, t.prototype.dismissInviteNotification = function(e) {
            e.contentId, e.cursor;
            return this.createPromise("dismissInviteNotification")
        }, t.prototype.getSharingPrefs = function() {
            return this.createPromise("getSharingPrefs")
        }, t.prototype.listMembers = function(e) {
            e.contentId, e.isAlpha;
            return this.createPromise("listMembers")
        }, t.prototype.listMembersContinue = function(e) {
            e.cursor, e.isAlpha;
            return this.createPromise("listMembersContinue")
        }, t.prototype.getMemberCounts = function(e) {
            e.contentId;
            return this.createPromise("getMemberCounts")
        }, t.prototype.getParentFolderAccess = function(e) {
            e.contentId, e.memberId, e.accessLevel;
            return this.createPromise("getParentFolderAccess")
        }, t.prototype.removeMember = function(e) {
            e.contentId, e.memberId;
            return this.createPromise("removeMember")
        }, t.prototype.setLinkSettings = function(e) {
            e.linkSettings, e.url;
            return this.createPromise("setLinkSettings")
        }, t.prototype.share = function(e) {
            e.fqPath, e.memberPolicy, e.aclUpdatePolicy, e.sharedLinkPolicy, e.forceAsync;
            return this.createPromise("share")
        }, t.prototype.shareInternal = function(e) {
            e.fqPath, e.folderPolicy, e.forceAsync, e.confidential;
            return this.createPromise("shareInternal")
        }, t.prototype.requestAccess = function(e) {
            e.contentUrl, e.customMessage;
            return this.createPromise("requestAccess")
        }, t.prototype.sharedLinkInfo = function(e) {
            e.fileIdOrPath;
            return this.createPromise("sharedLinkInfo")
        }, t.prototype.transferContent = function(e) {
            e.contentId, e.memberId;
            return this.createPromise("transferContent")
        }, t.prototype.createSharedLink = function(e) {
            e.fileIdOrPath;
            return this.createPromise("createSharedLink")
        }, t.prototype.updateMember = function() {
            return this.createPromise("updateMember")
        }, t.prototype.updatePolicyAlpha = function() {
            return this.createPromise("updatePolicyAlpha")
        }, t.prototype.validateFqPath = function(e) {
            e.fqPath, e.actions;
            return this.createPromise("validateFqPath")
        }, t.prototype.getCurrentAccountCached = function(e) {
            return this.createPromise("getCurrentAccountCached")
        }, t.prototype.modifySharedLinkSettings = function(e) {
            e.url, e.settings, e.remove_expiration;
            return this.createPromise("modifySharedLinkSettings")
        }, t.prototype.revokeSharedLink = function(e) {
            e.url;
            return this.createPromise("revokeSharedLink")
        }, t.prototype.relinquishMembership = function(e) {
            e.contentId, e.leaveACopy;
            return this.createPromise("relinquishMembership")
        }, t.prototype.setConfidentiality = function(e) {
            e.contentId, e.confidential, e.keep_inherited_members;
            return this.createPromise("setConfidentiality")
        }, t.prototype.validatePathContinue = function(e, t) {
            return this.createPromise("validatePathContinue")
        }, t.prototype.createPromise = function(e) {
            var t = this._promises[e];
            return t && t.calledBeforeCreatePromise ? (this._promises[e] = null, t.promise) : ((t = {}).promise = new Promise((function(e, n) {
                return t.resolve = e, t.reject = n
            })), this._promises[e] = t, t.promise)
        }, t.prototype.getPromise = function(e) {
            return null != this._promises[e] ? this._promises[e].promise : void 0
        }, t.prototype.resolvePromise = function(e, t, n) {
            void 0 === n && (n = !1), this._promises[e] || this.createPromise(e);
            var r = this._promises[e];
            return r.calledBeforeCreatePromise = n, r.resolve.apply(null, t), r.promise
        }, t.prototype.rejectPromise = function(e, t) {
            this._promises[e] || this.createPromise(e);
            var n = this._promises[e];
            return n.reject.apply(null, t), n.promise
        }, t
    })(m);
    t.MockShareApiClient = g;
    var y = (function(e) {
        function t(t) {
            var n = t.userId,
                r = t.isNonUserRelativeContext,
                s = e.call(this, {
                    userId: n,
                    isNonUserRelativeContext: r
                }) || this;
            return s.getMetadata = s.getMetadata.bind(s), s.getMetadataAlpha = s.getMetadataAlpha.bind(s), s.getMetadataBatchAlpha = s.getMetadataBatchAlpha.bind(s), s
        }
        return n.__extends(t, e), t.prototype.validateMembers = function(e) {
            var t = e.contentId,
                n = e.accessLevel,
                r = e.members;
            return this._validateMembers({
                accessLevel: n,
                contentId: t,
                members: r,
                contentType: l.ContentTypes.File
            })
        }, t.prototype.addMembers = function(e) {
            var t = e.contentId,
                n = e.members,
                r = e.customMessage,
                s = void 0 === r ? null : r,
                o = e.quiet,
                i = void 0 !== o && o,
                a = e.accessLevel,
                l = e.addMessageAsComment,
                d = void 0 !== l && l;
            null == a && (a = c.ACCESS_LEVEL.READER);
            var p = u.accessLevelConstToApi(a);
            return 0 === (null != s ? s.length : void 0) && (s = null), this.ns("sharing").rpc("add_file_member", {
                file: t,
                members: n,
                custom_message: s,
                quiet: i,
                access_level: p,
                add_message_as_comment: d
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.removeMember = function(e) {
            var t = this,
                n = e.contentId,
                r = e.memberId;
            return this.ns("sharing").rpc("remove_file_member_2", {
                file: n,
                member: u.makeMemberSelector(r)
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return u.memberAccessLevelApiToRecord(t.userId, e)
            }))
        }, t.prototype.getMetadata = function(e) {
            var t = e.contentId,
                n = (e.isInSharedFolder, e.actions),
                r = void 0 === n ? [] : n;
            return this.ns("sharing").rpc("get_file_metadata", {
                file: t,
                actions: r
            }, {
                subjectUserId: this.userId
            }).then(u.fileMetadataApiToRecord)
        }, t.prototype.getMetadataAlpha = function(e) {
            var t = e.contentId,
                n = e.actions,
                r = void 0 === n ? [] : n,
                s = e.sourceURL;
            return this.ns("sharing").rpc("alpha/get_file_metadata", {
                file: t,
                actions: r,
                url: s
            }, {
                subjectUserId: this.userId
            }).then(u.fileMetadataApiToRecord)
        }, t.prototype.getMetadataBatchAlpha = function(e) {
            var t = e.contentIds,
                n = e.actions,
                r = void 0 === n ? [] : n;
            return this.ns("sharing").rpc("alpha/get_file_metadata/batch", {
                files: t,
                actions: r
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return e.map((function(e) {
                    return u.fileMetadataApiToRecord(e.result)
                }))
            }))
        }, t.prototype.listMembers = function(e) {
            var t = e.contentId,
                n = e.url,
                r = void 0 === n ? null : n,
                s = e.limit,
                o = e.isAlpha,
                i = void 0 !== o && o,
                a = e.includeSeenState;
            null == s && (s = 100), null == a && (a = !0);
            var l = {
                    file: t,
                    actions: d.MEMBER_ACTION.ALL,
                    include_inherited: !0,
                    limit: s,
                    url: i ? r : void 0,
                    include_seen_state: a
                },
                c = this.ns("sharing");
            return (i ? c.rpc("alpha/list_file_members", l, {
                subjectUserId: this.userId
            }) : c.rpc("list_file_members", l, {
                subjectUserId: this.userId
            })).then(u.membershipApiToRecord).then(this._addAccountsToMembership.bind(this))
        }, t.prototype.listMembersContinue = function(e) {
            var t = e.cursor,
                n = e.url,
                r = void 0 === n ? null : n,
                s = e.isAlpha,
                o = void 0 !== s && s,
                i = {
                    cursor: t,
                    url: o ? r : void 0
                },
                a = this.ns("sharing");
            return (o ? a.rpc("alpha/list_file_members/continue", i, {
                subjectUserId: this.userId
            }) : a.rpc("list_file_members/continue", i, {
                subjectUserId: this.userId
            })).then((function(e) {
                return u.membershipApiToRecord(e, null)
            })).then(this._addAccountsToMembership.bind(this))
        }, t.prototype.listMembersBatch = function(e) {
            var t = e.contentIds,
                n = e.limit;
            return null == n && (n = 10), this.ns("sharing").rpc("list_file_members/batch", {
                files: t,
                limit: n
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                for (var t = {}, n = 0, s = Array.from(e); n < s.length; n++) {
                    var o = s[n];
                    "result" === o.result[".tag"] && (t[o.file] = u.membershipApiToRecord(o.result.members, o.result.member_count))
                }
                return r.Map(t)
            })).then(this._addAccountsToMembershipBatch.bind(this))
        }, t.prototype.getMemberCounts = function(e) {
            var t = e.contentId,
                n = e.limit,
                r = e.countGroupsAsMembers,
                s = void 0 !== r && r,
                o = e.url,
                i = void 0 === o ? null : o,
                a = e.runViewerInfoChecks,
                l = void 0 !== a && a;
            return this.ns("sharing").rpc("get_file_member_counts", {
                file: t,
                limit: n,
                count_groups_as_members: s,
                url: i,
                run_viewer_info_checks: l
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.getParentFolderAccess = function(e) {
            e.contentId, e.memberId, e.accessLevel;
            throw new f("Parent folder access points not implemented for files")
        }, t.prototype.relinquishMembership = function(e) {
            var t = e.contentId;
            return this.ns("sharing").rpc("relinquish_file_membership", {
                file: String(t)
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.listReceivedFiles = function(e) {
            var t = e.limit,
                n = e.actions,
                r = e.descending;
            return null == t && (t = 100), null == n && (n = []), null == r && (r = !1), this.ns("sharing").rpc("list_received_files", {
                limit: t,
                actions: n,
                descending: r
            }, {
                subjectUserId: this.userId
            }).then(u.listFilesResultApiToRecord)
        }, t.prototype.listReceivedFilesContinue = function(e) {
            var t = e.cursor;
            return this.ns("sharing").rpc("list_received_files/continue", {
                cursor: t
            }, {
                subjectUserId: this.userId
            }).then(u.listFilesResultApiToRecord)
        }, t.prototype.updateMember = function(e) {
            var t = this,
                n = e.contentId,
                r = e.memberId,
                s = e.accessLevel;
            return this.ns("sharing").rpc("update_file_member", {
                file: String(n),
                member: u.makeMemberSelector(r),
                access_level: u.accessLevelConstToApi(s)
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return u.memberAccessLevelApiToRecord(t.userId, e)
            }))
        }, t.prototype.updatePolicy = function(e) {
            var t = e.contentId,
                n = e.newPolicy,
                r = e.actions,
                s = u.combinedPolicyDiffToApi(n);
            return s.actions = r, s.file = t, this.ns("sharing").rpc("alpha/update_file_policy", s, {
                subjectUserId: this.userId
            }).then((function(e) {
                return null != e.metadata && (e = e.metadata), u.fileMetadataApiToRecord(e)
            }))
        }, t.prototype.unshare = function(e) {
            var t = e.contentId;
            return this.ns("sharing").rpc("unshare_file", {
                file: String(t)
            }, {
                subjectUserId: this.userId
            })
        }, t
    })(m);
    t.FileShareApiClient = y;
    var v = (function(e) {
        function t(t) {
            var n = t.userId,
                r = t.isNonUserRelativeContext,
                s = e.call(this, {
                    userId: n,
                    isNonUserRelativeContext: r
                }) || this;
            return s.getMetadata = s.getMetadata.bind(s), s.validateFqPath = s.validateFqPath.bind(s), s.updatePolicy = s.updatePolicy.bind(s), s.updatePolicyAlpha = s.updatePolicyAlpha.bind(s), s
        }
        return n.__extends(t, e), t.prototype.share = function(e) {
            var t = this,
                n = e.fqPath,
                r = e.folderPolicy,
                s = e.confidential,
                o = void 0 !== s && s,
                i = e.checkFSWs,
                a = void 0 !== i && i,
                l = e.syncSetting,
                c = void 0 === l ? null : l,
                d = e.should_be_new_path,
                p = void 0 === d ? null : d,
                h = e.intervalMs,
                _ = void 0 === h ? 1e3 : h,
                f = e.timeoutMs,
                m = void 0 === f ? null : f,
                g = u.combinedPolicyDiffToApi(r);
            return g.path = n, g.confidentiality = o ? "confidential" : "not_confidential", a && (g.fsw_request = "check"), null !== c && (g.sync_setting = c), null !== p && (g.should_be_new_path = p), this.ns("sharing").rpc("alpha/share_folder", g, {
                subjectUserId: this.userId
            }).then((function(e) {
                return ("complete" === e[".tag"] ? Promise.resolve(e) : b(t.checkShareJobStatus.bind(t, {
                    jobId: e.async_job_id
                }), {
                    interval: _,
                    timeout: m
                })).then(u.folderMetadataApiToRecord)
            }))
        }, t.prototype.shareWithFsws = function(e) {
            return this.share(n.__assign(n.__assign({}, e), {
                checkFSWs: !0
            })).then((function(e) {
                return {
                    metadata: e
                }
            })).catch(o.catchApiError((function(e) {
                var t = function(e, t) {
                    return e && e[".tag"] && e[".tag"] === t
                };
                if (e && t(e.error, "bad_path") && t(e.error.bad_path, "file_system_warnings")) return {
                    fsws: e.error.bad_path.details
                };
                throw e
            })))
        }, t.prototype.shareWithoutFsws = function(e) {
            return this.share(n.__assign(n.__assign({}, e), {
                checkFSWs: !1
            })).then((function(e) {
                return {
                    metadata: e
                }
            })).catch(o.catchApiError((function(e) {
                throw e
            })))
        }, t.prototype.checkShareJobStatus = function(e) {
            var t = e.jobId;
            return this.ns("sharing").rpc("check_share_internal_job_status", {
                async_job_id: t
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.checkRemoveMemberJobStatus = function(e) {
            var t = e.jobId;
            return this.ns("sharing").rpc("check_remove_member_job_status", {
                async_job_id: t
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.validateMembers = function(e) {
            var t = e.contentId,
                n = e.accessLevel,
                r = e.members;
            return this._validateMembers({
                accessLevel: n,
                contentId: t,
                members: r,
                contentType: l.ContentTypes.Folder
            })
        }, t.prototype.addMembers = function(e) {
            var t = e.contentId,
                n = e.members,
                r = e.accessLevel,
                s = e.customMessage,
                o = void 0 === s ? null : s,
                i = e.quiet,
                a = void 0 !== i && i,
                l = (e.addMessageAsComment, u.accessLevelConstToApi(r)),
                c = Array.from(n).map((function(e) {
                    return {
                        member: e,
                        access_level: l
                    }
                }));
            return this.addMembersWithAccessLevel({
                contentId: t,
                members: c,
                customMessage: o,
                quiet: a
            })
        }, t.prototype.addMembersWithAccessLevel = function(e) {
            var t = e.contentId,
                n = e.members,
                r = e.customMessage,
                s = void 0 === r ? null : r,
                o = e.quiet,
                i = void 0 !== o && o;
            0 === (null != s ? s.length : void 0) && (s = null);
            var a = {
                shared_folder_id: String(t),
                members: n,
                custom_message: s,
                quiet: i
            };
            return null != this.teamMemberId ? this.ns("sharing").rpc("add_folder_member_v2", a, {
                subjectUserId: this.userId
            }) : this.ns("sharing").rpc("add_folder_member", a, {
                subjectUserId: this.userId
            })
        }, t.prototype.fetchNsId = function(e) {
            return this.ns("files").rpc("get_metadata", {
                path: e
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return null != e.sharing_info ? e.sharing_info.shared_folder_id : void 0
            }))
        }, t.prototype.getMetadata = function(e) {
            var t = e.contentId,
                n = e.isInSharedFolder,
                r = e.actions,
                s = void 0 === r ? [] : r;
            return null == this.teamMemberId || n ? this.ns("sharing").rpc("alpha/get_folder_metadata", {
                shared_folder_id: String(t),
                actions: s
            }, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord) : this.ns("sharing").rpc("alpha/get_folder_metadata_v2", {
                shared_folder_id: String(t),
                actions: s
            }, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord)
        }, t.prototype._metadataAndInheritMembers = function(e) {
            var t = e.members_cursor;
            return t ? this.listMembersContinue({
                cursor: t
            }).then((function(t) {
                return {
                    metadata: e,
                    inheritedMembers: t
                }
            })) : {
                metadata: e,
                inheritedMembers: new l.SharingMembership
            }
        }, t.prototype.validateFqPath = function(e) {
            var t = e.fqPath,
                n = e.actions,
                r = e.listMembersArg,
                s = e.shouldParseMetadataFromError,
                o = void 0 !== s && s,
                i = e.shareAsConfidential,
                a = void 0 !== i && i;
            null == n && (n = []), null == r && (r = {});
            var l = this.ns("sharing").rpc("validate_folder_path", {
                path: t,
                actions: n,
                list_members_arg: r,
                confidentiality: a ? {
                    ".tag": "confidential"
                } : {
                    ".tag": "not_confidential"
                }
            }, {
                subjectUserId: this.userId
            });
            return this.validatePathContinue(l, o)
        }, t.prototype.validatePathContinue = function(e, t) {
            return e.catch(o.catchApiError((function(e) {
                var n, r;
                if ("already_shared" === (null === (r = null === (n = e.error) || void 0 === n ? void 0 : n.bad_path) || void 0 === r ? void 0 : r[".tag"])) return e.error.bad_path;
                if (t && e instanceof o.AppError && e.error && "no_permission" === e.error[".tag"] && u.hasFolderMetadataRecordInMetadata(e.error)) return e.error;
                throw e
            }))).then(u.folderMetadataApiToRecord).then(this._metadataAndInheritMembers.bind(this))
        }, t.prototype.validateFolderPathBatch = function(e) {
            var t = e.paths;
            return this.ns("sharing").rpc("validate_folder_path/batch", {
                paths: t
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return e.entries.map((function(e) {
                    var t, n, r = e.result,
                        s = null;
                    "metadata" === r[".tag"] ? s = r : "no_permission" === (null != r.path_error ? r.path_error[".tag"] : void 0) ? s = r.path_error : "already_shared" === (null === (n = null === (t = r.path_error) || void 0 === t ? void 0 : t.bad_path) || void 0 === n ? void 0 : n[".tag"]) && (s = r.path_error.bad_path);
                    var o = null;
                    return s && s.link_metadata && (o = u.folderMetadataApiToRecord(s)), {
                        path: e.path,
                        metadata: o
                    }
                }))
            }))
        }, t.prototype.updatePolicy = function(e) {
            var t = e.contentId,
                n = e.newPolicy;
            return n.shared_folder_id = String(t), null != this.teamMemberId ? this.ns("sharing").rpc("update_folder_policy_v2", n, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord) : this.ns("sharing").rpc("update_folder_policy", n, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord)
        }, t.prototype.updatePolicyAlpha = function(e) {
            var t = e.contentId,
                n = e.newPolicy,
                r = u.combinedPolicyDiffToApi(n);
            return r.shared_folder_id = String(t), null != this.teamMemberId ? this.ns("sharing").rpc("alpha/update_folder_policy_v2", r, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord) : this.ns("sharing").rpc("alpha/update_folder_policy", r, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord)
        }, t.prototype.unshare = function(e) {
            var t = this,
                n = e.contentId,
                r = e.leaveACopy,
                s = void 0 !== r && r;
            return this.ns("sharing").rpc("unshare_folder", {
                shared_folder_id: String(n),
                leave_a_copy: s
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return "complete" === e[".tag"] ? Promise.resolve(e) : b(t.checkJobStatus.bind(t, {
                    jobId: e.async_job_id
                }))
            }))
        }, t.prototype.listMembers = function(e) {
            var t = e.contentId,
                n = e.limit;
            e.isAlpha;
            return null == n && (n = 100), this.ns("sharing").rpc("list_folder_members", {
                shared_folder_id: String(t),
                actions: d.MEMBER_ACTION.ALL,
                limit: n
            }, {
                subjectUserId: this.userId
            }).then(u.membershipApiToRecord).then(this._addAccountsToMembership.bind(this))
        }, t.prototype.listMembersContinue = function(e) {
            var t = e.cursor;
            e.isAlpha;
            return this.ns("sharing").rpc("list_folder_members/continue", {
                cursor: t
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return u.membershipApiToRecord(e, null)
            })).then(this._addAccountsToMembership.bind(this))
        }, t.prototype.listMountableFolders = function(e) {
            var t = void 0 === e ? {} : e,
                n = t.limit,
                r = t.actions;
            return null == n && (n = 100), null == r && (r = []), this.ns("sharing").rpc("list_mountable_folders", {
                limit: n,
                actions: r
            }, {
                subjectUserId: this.userId
            }).then(u.listFoldersResultApiToRecord)
        }, t.prototype.listMountableFoldersContinue = function(e) {
            var t = e.cursor;
            return this.ns("sharing").rpc("list_mountable_folders/continue", {
                cursor: t
            }, {
                subjectUserId: this.userId
            }).then(u.listFoldersResultApiToRecord)
        }, t.prototype.listMountableFoldersAlpha = function(e) {
            var t = void 0 === e ? {} : e,
                n = t.limit,
                r = t.actions,
                s = t.show_mounted,
                o = t.get_invite_data;
            return null == n && (n = 100), null == r && (r = []), null == o && (o = !1), this.ns("sharing").rpc("alpha/list_mountable_folders", {
                limit: n,
                actions: r,
                show_mounted: s,
                get_invite_data: o
            }, {
                subjectUserId: this.userId
            }).then(u.listFoldersResultApiToRecord)
        }, t.prototype.listMountableFoldersContinueAlpha = function(e) {
            var t = e.cursor;
            return this.ns("sharing").rpc("alpha/list_mountable_folders/continue", {
                cursor: t
            }, {
                subjectUserId: this.userId
            }).then(u.listFoldersResultApiToRecord)
        }, t.prototype.getMemberCounts = function(e) {
            var t = e.contentId;
            return null != this.teamMemberId ? this.ns("sharing").rpc("get_folder_member_counts_v2", {
                shared_folder_id: String(t)
            }, {
                subjectUserId: this.userId
            }).then(u.memberCountsApiToRecord) : this.ns("sharing").rpc("get_folder_member_counts", {
                shared_folder_id: String(t)
            }, {
                subjectUserId: this.userId
            }).then(u.memberCountsApiToRecord)
        }, t.prototype.getParentFolderAccess = function(e) {
            var t = e.contentId,
                n = e.memberId,
                r = e.accessLevel;
            return this.ns("sharing").rpc("get_parent_folder_access", {
                shared_folder_id: String(t),
                member: u.makeMemberSelector(n),
                access_level: null != r ? u.accessLevelConstToApi(r) : void 0
            }, {
                subjectUserId: this.userId
            }).then(u.memberAccessLevelApiToRecord.bind(null, this.userId))
        }, t.prototype.relinquishMembership = function(e) {
            var t = this,
                n = e.contentId,
                r = e.leaveACopy,
                s = void 0 !== r && r;
            return this.ns("sharing").rpc("relinquish_folder_membership", {
                shared_folder_id: String(n),
                leave_a_copy: s
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return "complete" === e[".tag"] ? Promise.resolve() : b(t.checkJobStatus.bind(t, {
                    jobId: e.async_job_id
                }))
            }))
        }, t.prototype.removeMember = function(e) {
            var t = this,
                n = e.contentId,
                r = e.memberId,
                s = e.leaveACopy,
                o = void 0 !== s && s;
            return (null != this.teamMemberId ? this.ns("sharing").rpc("remove_folder_member_v2", {
                shared_folder_id: String(n),
                member: u.makeMemberSelector(r),
                leave_a_copy: o
            }, {
                subjectUserId: this.userId
            }) : this.ns("sharing").rpc("remove_folder_member", {
                shared_folder_id: String(n),
                member: u.makeMemberSelector(r),
                leave_a_copy: o
            }, {
                subjectUserId: this.userId
            })).then((function(e) {
                return "complete" === e[".tag"] ? Promise.resolve(e) : b(t.checkRemoveMemberJobStatus.bind(t, {
                    jobId: e.async_job_id
                }))
            })).then((function(e) {
                return u.memberAccessLevelApiToRecord(t.userId, e)
            }))
        }, t.prototype.transferContent = function(e) {
            var t = e.contentId,
                n = e.memberId;
            return null != this.teamMemberId ? this.ns("sharing").rpc("transfer_folder_v2", {
                shared_folder_id: String(t),
                to_dropbox_id: n
            }, {
                subjectUserId: this.userId
            }) : this.ns("sharing").rpc("transfer_folder", {
                shared_folder_id: String(t),
                to_dropbox_id: n
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.updateMember = function(e) {
            var t = this,
                n = e.contentId,
                r = e.memberId,
                s = e.accessLevel;
            return (null != this.teamMemberId ? this.ns("sharing").rpc("update_folder_member_v2", {
                shared_folder_id: String(n),
                member: u.makeMemberSelector(r),
                access_level: u.accessLevelConstToApi(s)
            }, {
                subjectUserId: this.userId
            }) : this.ns("sharing").rpc("update_folder_member", {
                shared_folder_id: String(n),
                member: u.makeMemberSelector(r),
                access_level: u.accessLevelConstToApi(s)
            }, {
                subjectUserId: this.userId
            })).then((function(e) {
                return u.memberAccessLevelApiToRecord(t.userId, e)
            }))
        }, t.prototype.mount = function(e) {
            var t = e.contentId;
            return this.ns("sharing").rpc("mount_folder", {
                shared_folder_id: String(t)
            }, {
                subjectUserId: this.userId
            }).then(u.folderMetadataApiToRecord)
        }, t.prototype.unmount = function(e) {
            var t = e.contentId;
            return this.ns("sharing").rpc("unmount_folder", {
                shared_folder_id: String(t)
            }, {
                subjectUserId: this.userId
            })
        }, t.prototype.setConfidentiality = function(e) {
            var t = this,
                n = e.contentId,
                r = e.confidential,
                s = e.keepInheritedMembers,
                o = void 0 !== s && s;
            return this.ns("sharing").rpc("set_access_inheritance", {
                shared_folder_id: String(n),
                access_inheritance: r ? {
                    ".tag": "no_inherit"
                } : {
                    ".tag": "inherit"
                },
                keep_inherited_members: o
            }, {
                subjectUserId: this.userId
            }).then((function(e) {
                return "complete" === e[".tag"] ? Promise.resolve(e) : b(t.checkShareJobStatus.bind(t, {
                    jobId: e.async_job_id
                }))
            })).then(u.folderMetadataApiToRecord)
        }, t
    })(m);
    t.FolderShareApiClient = v;
    var b = function(e, t) {
        var n = 1e3,
            r = null;
        t && t.interval && (n = t.interval), t && t.timeout && (r = t.timeout);
        var s = null != r ? Date.now() + r : null,
            i = function(t, r) {
                return null != s && Date.now() > s ? r() : e().then((function(e) {
                    switch (e[".tag"]) {
                        case "failed":
                            return r(e);
                        case "complete":
                            return t(e);
                        case "in_progress":
                            return window.setTimeout(i, n, t, r)
                    }
                })).catch(o.catchApiError((function(e) {
                    return r(e)
                })))
            };
        return new Promise(i)
    }
})), define("modules/clean/sharing/api/types/metadata", ["require", "exports", "tslib", "immutable", "modules/clean/api_v2/types"], (function(e, t, n, r, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importStar(r), t.MemberPolicy = {
        team: new s.UnionScalar("team"),
        anyone: new s.UnionScalar("anyone")
    }, t.AclUpdatePolicy = {
        owner: new s.UnionScalar("owner"),
        editors: new s.UnionScalar("editors")
    }, t.SharedLinkPolicy = {
        anyone: new s.UnionScalar("anyone"),
        members: new s.UnionScalar("members")
    }, t.SharedFolderMemberMemberPolicy = {
        team: new s.UnionScalar("team"),
        anyone: new s.UnionScalar("anyone")
    }, t.SharedFolderJoinPolicy = {
        from_team_only: new s.UnionScalar("from_team_only"),
        from_anyone: new s.UnionScalar("from_anyone")
    }, t.SharedLinkCreatePolicy = {
        default_public: new s.UnionScalar("default_public"),
        default_team_only: new s.UnionScalar("default_team_only"),
        team_only: new s.UnionScalar("team_only")
    }, t.RequestedVisibilityPolicy = {
        policy_name: "requested_visibility",
        password: "password",
        public: "public",
        team_only: "team_only"
    }, t.ResolvedVisibilityPolicy = {
        policy_name: "resolved_visibility",
        only_you: "only_you",
        password: "password",
        public: "public",
        shared_folder_only: "shared_folder_only",
        team_and_password: "team_and_password",
        team_only: "team_only"
    }, t.VisibilityDisallowedReason = {
        delete_and_recreate: "delete_and_recreate",
        restricted_by_shared_folder: "restricted_by_shared_folder",
        restricted_by_team: "restricted_by_team",
        user_account_type: "user_account_type",
        user_not_on_team: "user_not_on_team",
        permission_denied: "permission_denied"
    }, t.LinkExpiryPolicy = {
        policy_name: "expires"
    }, t.ViewerInfoPolicy = {
        policy_name: "viewer_info_policy",
        enabled: "enabled",
        disabled: "disabled"
    }, t.DownloadPolicy = {
        policy_name: "download_policy",
        allow: "allow",
        disallow: "disallow"
    }, t.LinkAudience = {
        public: "public",
        team: "team",
        members: "members",
        default_on: "default_on"
    }, t.GroupManagementType = {
        user_managed: new s.UnionScalar("user_managed"),
        company_managed: new s.UnionScalar("company_managed"),
        system_managed: new s.UnionScalar("system_managed")
    };
    var o = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        id: null,
        name: null
    }, "Team"));
    t.Team = o;
    var i = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        display_name: null,
        member_id: null,
        team_info: null
    }, "TeamMemberInfo"));
    t.TeamMemberInfo = i;
    var a = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        id: null,
        name: null,
        sharing_policies: null
    }, "FullTeam"));
    t.FullTeam = a;
    var l = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        shared_folder_member_policy: null,
        shared_folder_join_policy: null,
        shared_link_create_policy: null
    }, "TeamSharingPolicies"));
    t.TeamSharingPolicies = l;
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        account_id: null,
        display_name: null,
        disabled: !1,
        email: null,
        email_verified: !1,
        familiar_name: null,
        given_name: null,
        is_teammate: !1,
        profile_photo_url: null,
        surname: null,
        team_member_id: null
    }, "BasicAccount"));
    t.BasicAccount = u;
    var c = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        account_id: null,
        display_name: null,
        disabled: !1,
        email: null,
        email_verified: !1,
        familiar_name: null,
        given_name: null,
        profile_photo_url: null,
        surname: null,
        team: null,
        team_member_id: null
    }, "FullAccount"));
    t.FullAccount = c;
    var d = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        allow: !1,
        reason: null
    }, "PermissionSetting"));
    t.PermissionSetting = d;
    var p = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t.prototype.contentId = function() {
            return this.shared_folder_id || this.path_lower
        }, t.prototype.isSharedFolder = function() {
            return Boolean(this.shared_folder_id)
        }, t.prototype.isNewSharedFolder = function() {
            return !this.shared_folder_id
        }, t
    })(r.Record({
        access_type: null,
        is_confidential: !1,
        is_inside_team_folder: !1,
        is_team_folder: !1,
        link_metadata: null,
        members_cursor: null,
        name: null,
        owner_team: null,
        parent_shared_folder_id: null,
        path_lower: null,
        permissions: null,
        policy: null,
        preview_url: null,
        shared_folder_id: null,
        time_invited: null,
        can_mount: null,
        folder_size: null,
        invite_info: null,
        parent_folder_name: null
    }, "SharedFolderMetadata"));
    t.SharedFolderMetadata = p;
    var h = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        acl_update_policy: null,
        download_policy: null,
        member_policy: null,
        viewer_info_policy: null,
        resolved_member_policy: null,
        shared_link_policy: null
    }, "FolderPolicy"));
    t.FolderPolicy = h;
    var _ = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        change_options: null,
        disable_viewer_info: null,
        edit_contents: null,
        enable_viewer_info: null,
        invite_editor: null,
        invite_viewer: null,
        invite_viewer_no_comment: null,
        leave_a_copy: null,
        relinquish_membership: null,
        remove_download_policy: null,
        set_download_policy: null,
        update_confidentiality: null,
        unmount: null,
        unshare: null,
        create_link: null
    }, "FolderPermissions"));
    t.FolderPermissions = _;
    var f = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        entries: r.Map(),
        cursor: null
    }, "ListFoldersResult"));
    t.ListFoldersResult = f;
    var m = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t.prototype.contentId = function() {
            return this.id
        }, t.prototype.isSharedFolder = function() {
            return !1
        }, t.prototype.isNewSharedFolder = function() {
            return !1
        }, t
    })(r.Record({
        access_type: null,
        id: null,
        file_policy: null,
        link_metadata: null,
        name: null,
        owner_team: null,
        policy: null,
        parent_shared_folder_id: null,
        path_display: null,
        path_lower: null,
        permissions: null,
        preview_url: null,
        time_invited: null,
        is_cloud_doc: null
    }, "SharedFileMetadata"));
    t.SharedFileMetadata = m;
    var g = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        change_options: null,
        disable_viewer_info: null,
        edit_contents: null,
        enable_viewer_info: null,
        invite_viewer: null,
        invite_editor: null,
        invite_viewer_no_comment: null,
        relinquish_membership: null,
        remove_download_policy: null,
        set_download_policy: null,
        unshare: null,
        view_members: null,
        create_link: null,
        create_edit_link: null,
        create_view_link: null,
        share_message_as_comment: null
    }, "FilePermissions"));
    t.FilePermissions = g;
    var y = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        audience: null,
        download_policy: null,
        viewer_info_policy: null
    }, "FilePolicy"));
    t.FilePolicy = y;
    var v = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        entries: r.Map(),
        cursor: null
    }, "ListFilesResult"));
    t.ListFilesResult = v;
    var b, w = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t.prototype.getMemberCount = function() {
            return this.memberCount || this.invitees.count() + this.groups.count() + this.users.count()
        }, t.prototype.getTotalMemberCount = function(e) {
            return void 0 === e && (e = []), this.groups.map((function(e) {
                return e.member_count || 1
            })).reduce((function(e, t) {
                return e + t
            }), 0) + this.invitees.count() + this.users.filter((function(t) {
                return !e.includes(t.memberId())
            })).count()
        }, t
    })(r.Record({
        cursor: null,
        invitees: r.Map(),
        groups: r.Map(),
        users: r.Map(),
        memberCount: null
    }, "SharingMembership"));
    t.SharingMembership = w, t.makeMemberKey = function(e, t) {
        return e + ":" + t
    }, (function(e) {
        e.USERS = "users", e.GROUPS = "groups", e.INVITEES = "invitees"
    })(b = t.MembershipType || (t.MembershipType = {}));
    var k = (function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(r, e), r.prototype.memberId = function() {
            return this.account_id
        }, r.prototype.memberKey = function() {
            return t.makeMemberKey(this.is_inherited, this.memberId())
        }, r.prototype.displayName = function() {
            return this.account ? this.account.display_name : void 0
        }, r.prototype.contactId = function() {
            return this.account_id
        }, r.prototype.contactType = function() {
            return "dropbox_id"
        }, r.prototype.type = function() {
            return b.USERS
        }, r.prototype.email = function() {
            return this.account ? this.account.email : void 0
        }, r
    })(r.Record({
        access_type: null,
        inherited_access_type: null,
        account: null,
        account_id: null,
        initials: null,
        is_inherited: !1,
        permissions: null,
        platform_type: null,
        same_team: null,
        team_member_id: null,
        time_last_seen: null
    }, "UserMembershipInfo"));
    t.UserMembershipInfo = k;
    var M = (function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(r, e), r.prototype.memberId = function() {
            return this.contact_type + ":" + this.contact
        }, r.prototype.memberKey = function() {
            return t.makeMemberKey(this.is_inherited, this.memberId())
        }, r.prototype.displayName = function() {
            return this.contact
        }, r.prototype.contactId = function() {
            return this.contact
        }, r.prototype.contactType = function() {
            return "email"
        }, r.prototype.type = function() {
            return b.INVITEES
        }, r
    })(r.Record({
        access_type: null,
        inherited_access_type: null,
        contact: null,
        contact_type: null,
        initials: !1,
        is_inherited: null,
        permissions: null,
        same_team: null
    }, "InviteeMembershipInfo"));
    t.InviteeMembershipInfo = M;
    var E = (function(e) {
        function r() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(r, e), r.prototype.memberId = function() {
            return this.group_id
        }, r.prototype.memberKey = function() {
            return t.makeMemberKey(this.is_inherited, this.memberId())
        }, r.prototype.displayName = function() {
            return this.group_name
        }, r.prototype.contactId = function() {
            return this.group_id
        }, r.prototype.contactType = function() {
            return "dropbox_id"
        }, r.prototype.type = function() {
            return b.GROUPS
        }, r
    })(r.Record({
        access_type: null,
        inherited_access_type: null,
        group_external_id: null,
        group_id: null,
        group_management_type: null,
        group_name: null,
        group_type: null,
        initials: null,
        is_inherited: !1,
        is_member: !1,
        is_owner: !1,
        member_count: null,
        permissions: null,
        same_team: !0
    }, "GroupMembershipInfo"));
    t.GroupMembershipInfo = E;
    var S = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        leave_a_copy: null,
        make_editor: null,
        make_owner: null,
        make_viewer: null,
        make_viewer_no_comment: null,
        remove: null
    }, "MemberPermissions"));
    t.MemberPermissions = S;
    var C = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        total_unique_users: null,
        total_unique_inherited_members: null,
        users_outside_team: null,
        exceeds_count: !1
    }, "MemberCounts"));
    t.MemberCounts = C;
    var A = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        access_level: null,
        warning: null,
        parentFolders: null
    }, "MemberAccessLevelResult"));
    t.MemberAccessLevelResult = A;
    var D = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        name: null,
        shared_folder_id: null,
        path: null,
        permissions: null
    }, "ParentFolderInfo"));
    t.ParentFolderInfo = D;
    var I = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t.prototype.isFolder = function() {
            return "folder" === this.file_type
        }, t.prototype.teamInfo = function() {
            return this.content_owner_team_info ? this.content_owner_team_info : this.team_member_info ? this.team_member_info.team_info : void 0
        }, t.prototype.accessLevel = function() {
            return this.link_permissions.link_access_level
        }, t.prototype.isRighteousLink = function() {
            return Boolean(this.link_permissions && this.link_permissions.audience_options && this.link_permissions.effective_audience && this.link_permissions.link_access_level)
        }, t.prototype.canChangePassword = function() {
            return Boolean(this.link_permissions && this.link_permissions.require_password ? this.link_permissions.can_remove_password : this.link_permissions.can_set_password)
        }, t.prototype.canChangeExpiration = function() {
            return Boolean(null != this.expires ? this.link_permissions.can_remove_expiry : this.link_permissions.can_set_expiry)
        }, t.prototype.canChangeDownload = function() {
            return Boolean(this.link_permissions && this.link_permissions.allow_download ? this.link_permissions.can_disallow_download : this.link_permissions.can_allow_download)
        }, t
    })(r.Record({
        url: null,
        client_modified: null,
        content_owner_team_info: null,
        expires: null,
        require_password: null,
        file_type: null,
        id: null,
        link_permissions: null,
        name: null,
        path_lower: null,
        rev: null,
        server_modified: null,
        size: null,
        team_member_info: null,
        preview_type: null
    }, "LinkMetadata"));
    t.LinkMetadata = I;
    var T = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        requested_visibility: null,
        link_password: null,
        expires: null,
        allow_download: null,
        audience: null,
        require_password: null
    }, "LinkPolicy"));
    t.LinkPolicy = T;
    var R = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t.prototype.canChangeDownload = function() {
            return null != this.can_disallow_download && null != this.can_allow_download && null != this.allow_download
        }, t
    })(r.Record({
        allow_comments: null,
        can_revoke: null,
        allow_download: null,
        can_allow_download: null,
        can_disallow_download: null,
        can_set_expiry: null,
        can_remove_expiry: null,
        can_set_password: null,
        can_remove_password: null,
        require_password: null,
        effective_audience: null,
        link_access_level: null,
        requested_visibility: null,
        resolved_visibility: null,
        restricting_shared_folder_path: null,
        revoke_failure_reason: null,
        team_restricts_comments: null,
        visibility_policies: null,
        audience_options: null,
        can_use_extended_sharing_controls: null
    }, "LinkPermissions"));
    t.LinkPermissions = R;
    var x = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        policy: null,
        resolved_policy: null,
        allowed: null,
        disallowed_reason: null
    }, "LinkVisibilityPolicy"));
    t.LinkVisibilityPolicy = x;
    var O = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        audience: null,
        allowed: null
    }, "LinkAudienceOption"));
    t.LinkAudienceOption = O;
    var P = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        in_server_side_contact_validation_settings: !1,
        in_share_modal_evolution: !1,
        in_share_modal_upsell_premium_sharing: !1,
        in_share_modal_upsell_premium_sharing_variant: "OFF",
        has_seen_share_modal_upsell_premium_sharing_counter: 0
    }, "SharingPrefs"));
    t.SharingPrefs = P;
    var N = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(t, e), t
    })(r.Record({
        shared_folder_id: null,
        name: null,
        audience: null
    }, "AudienceRestrictingSharedFolder"));
    t.AudienceRestrictingSharedFolder = N, t.ContentTypes = {
        File: {
            ".tag": "file"
        },
        Folder: {
            ".tag": "folder"
        }
    }
})), define("modules/clean/sharing/api/util/types", ["require", "exports", "tslib", "modules/clean/contacts/types", "immutable", "modules/clean/api_v2/types", "modules/clean/react/pass/utils", "modules/clean/sharing/access_level", "modules/clean/sharing/link_info", "modules/clean/sharing/api/types/metadata"], (function(e, t, n, r, s, o, i, a, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importStar(s), t.accessLevelConstToApi = function(e) {
        var n = t.rawAccessLevelConstToApi(e);
        return new o.UnionScalar(n[".tag"])
    }, t.rawAccessLevelConstToApi = function(e) {
        switch (e) {
            case a.ACCESS_LEVEL.OWNER:
                return {
                    ".tag": "owner"
                };
            case a.ACCESS_LEVEL.WRITER:
                return {
                    ".tag": "editor"
                };
            case a.ACCESS_LEVEL.READER:
                return {
                    ".tag": "viewer"
                };
            case a.ACCESS_LEVEL.READER_NO_COMMENT:
                return {
                    ".tag": "viewer_no_comment"
                };
            default:
                throw new Error("unknown access level: " + e)
        }
    }, t.linkAccessLevelToApi = function(e) {
        return new o.UnionScalar(e)
    }, t.accessLevelApiToConst = function(e) {
        switch (e.type || e) {
            case "owner":
                return a.ACCESS_LEVEL.OWNER;
            case "editor":
                return a.ACCESS_LEVEL.WRITER;
            case "viewer":
                return a.ACCESS_LEVEL.READER;
            case "viewer_no_comment":
                return a.ACCESS_LEVEL.READER_NO_COMMENT
        }
    }, t.groupManagementTypeApiToConst = function(e) {
        if (!e) return null;
        switch (e[".tag"]) {
            case "user_managed":
                return u.GroupManagementType.user_managed;
            case "company_managed":
                return u.GroupManagementType.company_managed;
            case "system_managed":
                return u.GroupManagementType.system_managed;
            default:
                return
        }
    }, t.platformTypeApiToConst = function(e) {
        return i.parsePlatformString(e.type)
    }, t.hasFolderMetadataRecordInMetadata = function(e) {
        return null != e.path_lower && null != e.access_type && null != e.policy
    }, t.folderPolicyApiToRecord = function(e) {
        return null == e ? new u.FolderPolicy : new u.FolderPolicy({
            acl_update_policy: e.acl_update_policy && e.acl_update_policy[".tag"],
            download_policy: e.download_policy && e.download_policy[".tag"],
            member_policy: e.member_policy && e.member_policy[".tag"],
            resolved_member_policy: e.resolved_member_policy && e.resolved_member_policy[".tag"],
            shared_link_policy: e.shared_link_policy && e.shared_link_policy[".tag"],
            viewer_info_policy: e.viewer_info_policy && e.viewer_info_policy[".tag"]
        })
    };
    t.audienceRestrictingSharedFolderToRecord = function(e) {
        return new u.AudienceRestrictingSharedFolder({
            shared_folder_id: e.shared_folder_id,
            name: e.name,
            audience: e.audience[".tag"]
        })
    }, t.parseFolderPolicy = t.folderPolicyApiToRecord, t.folderPermissionsApiToRecord = function(e) {
        var t = (function(e) {
            for (var t = {}, n = 0, r = e; n < r.length; n++) {
                var s = r[n];
                t[s.action[".tag"]] = new u.PermissionSetting({
                    allow: s.allow,
                    reason: s.reason ? s.reason[".tag"] : void 0
                })
            }
            return t
        })(e);
        return new u.FolderPermissions(t)
    }, t.folderMetadataApiToRecord = function(e) {
        return new u.SharedFolderMetadata({
            access_type: t.accessLevelApiToConst(o.Union.parse(e.access_type)),
            is_inside_team_folder: e.is_inside_team_folder,
            is_team_folder: e.is_team_folder,
            members_cursor: e.members_cursor,
            name: e.name,
            owner_team: null != e.owner_team ? new u.Team(e.owner_team) : void 0,
            parent_shared_folder_id: e.parent_shared_folder_id,
            path_lower: e.path_lower,
            permissions: null != e.permissions ? t.folderPermissionsApiToRecord(e.permissions) : void 0,
            policy: t.parseFolderPolicy(e.policy),
            preview_url: e.preview_url,
            shared_folder_id: e.shared_folder_id,
            time_invited: null != e.time_invited ? new Date(e.time_invited) : void 0,
            is_confidential: null != e.is_confidential ? e.is_confidential : void 0,
            folder_size: null != e.folder_size ? e.folder_size : void 0,
            can_mount: null != e.can_mount ? e.can_mount : void 0,
            invite_info: null != e.invite_info ? e.invite_info : void 0,
            parent_folder_name: e.parent_folder_name
        })
    }, t.listFoldersResultApiToRecord = function(e) {
        return new u.ListFoldersResult({
            entries: s.Map(e.entries.map(t.folderMetadataApiToRecord).map((function(e) {
                return [e.shared_folder_id, e]
            }))),
            cursor: e.cursor
        })
    }, t.filePermissionsApiToRecord = function(e) {
        var t = {};
        if (e)
            for (var n = 0, r = e; n < r.length; n++) {
                var s = r[n];
                t[s.action[".tag"]] = new u.PermissionSetting({
                    allow: s.allow,
                    reason: s.reason && s.reason[".tag"]
                })
            }
        return new u.FilePermissions(t)
    }, t.getFilePolicy = function(e) {
        var t = {};
        return t[u.ViewerInfoPolicy.policy_name] = e && e.viewer_info_policy && e.viewer_info_policy[".tag"], t[u.DownloadPolicy.policy_name] = e && e.download_policy && e.download_policy[".tag"] || u.DownloadPolicy.allow, new u.FilePolicy(t)
    }, t.fileMetadataApiToRecord = function(e) {
        return new u.SharedFileMetadata({
            access_type: null != e.access_type ? t.accessLevelApiToConst(o.Union.parse(e.access_type)) : a.ACCESS_LEVEL.READER,
            id: e.id,
            file_policy: t.getFilePolicy(e.policy),
            is_cloud_doc: null != e.is_cloud_doc && e.is_cloud_doc,
            name: e.name,
            owner_team: e.owner_team && new u.Team(e.owner_team),
            policy: null != e.policy ? t.parseFolderPolicy(e.policy) : new u.FolderPolicy,
            parent_shared_folder_id: e.parent_shared_folder_id,
            path_display: e.path_display,
            path_lower: e.path_lower,
            permissions: t.filePermissionsApiToRecord(e.permissions),
            preview_url: e.preview_url,
            time_invited: e.time_invited && new Date(e.time_invited)
        })
    }, t.listFilesResultApiToRecord = function(e) {
        return new u.ListFilesResult({
            entries: s.Map(e.entries.map((function(e) {
                return [e.id, t.fileMetadataApiToRecord(e)]
            }))),
            cursor: e.cursor
        })
    }, t.memberPermissionsApiToRecord = function(e) {
        var t = {};
        if (null != e)
            for (var n = 0, r = e; n < r.length; n++) {
                var s = r[n];
                t[s.action[".tag"]] = new u.PermissionSetting({
                    allow: s.allow,
                    reason: s.reason && s.reason[".tag"]
                })
            }
        return new u.MemberPermissions(t)
    }, t.inviteeMembershipApiToRecord = function(e) {
        var n = void 0;
        e.inherited_access_type && (n = t.accessLevelApiToConst(o.Union.parse(e.inherited_access_type)));
        var r = e.invitee[".tag"];
        return new u.InviteeMembershipInfo({
            access_type: t.accessLevelApiToConst(o.Union.parse(e.access_type)),
            inherited_access_type: n,
            contact: e.invitee[r],
            contact_type: r,
            initials: e.initials,
            is_inherited: e.is_inherited,
            permissions: t.memberPermissionsApiToRecord(e.permissions),
            same_team: Boolean(e.user && e.user.same_team)
        })
    }, t.groupMembershipApiToRecord = function(e) {
        var n = void 0;
        return e.inherited_access_type && (n = t.accessLevelApiToConst(o.Union.parse(e.inherited_access_type))), new u.GroupMembershipInfo({
            access_type: t.accessLevelApiToConst(o.Union.parse(e.access_type)),
            inherited_access_type: n,
            group_external_id: e.group.group_external_id,
            group_id: e.group.group_id,
            group_management_type: t.groupManagementTypeApiToConst(e.group.group_management_type),
            group_name: e.group.group_name,
            group_type: e.group.group_type[".tag"],
            initials: e.initials,
            is_inherited: e.is_inherited,
            is_member: e.group.is_member,
            is_owner: e.group.is_owner,
            member_count: e.group.member_count,
            permissions: t.memberPermissionsApiToRecord(e.permissions),
            same_team: e.group.same_team
        })
    }, t.userMembershipApiToRecord = function(e) {
        var n = void 0;
        return e.inherited_access_type && (n = t.accessLevelApiToConst(o.Union.parse(e.inherited_access_type))), new u.UserMembershipInfo({
            access_type: t.accessLevelApiToConst(o.Union.parse(e.access_type)),
            inherited_access_type: n,
            account_id: e.user.account_id,
            initials: e.initials,
            is_inherited: e.is_inherited,
            permissions: t.memberPermissionsApiToRecord(e.permissions),
            platform_type: e.platform_type && t.platformTypeApiToConst(o.Union.parse(e.platform_type)),
            same_team: e.user.same_team,
            team_member_id: e.user.team_member_id,
            time_last_seen: e.time_last_seen && new Date(e.time_last_seen)
        })
    }, t.membershipApiToRecord = function(e, n) {
        return void 0 === n && (n = null), new u.SharingMembership({
            cursor: e.cursor,
            invitees: s.Map(e.invitees.map((function(e) {
                var n = t.inviteeMembershipApiToRecord(e);
                return [n.memberKey(), n]
            }))),
            groups: s.Map(e.groups.map((function(e) {
                var n = t.groupMembershipApiToRecord(e);
                return [n.memberKey(), n]
            }))),
            users: s.Map(e.users.map((function(e) {
                var n = t.userMembershipApiToRecord(e);
                return [n.memberKey(), n]
            }))),
            memberCount: n
        })
    }, t.memberCountsApiToRecord = function(e) {
        return new u.MemberCounts(e)
    }, t.parentFolderInfoApiToRecord = function(e) {
        return new u.ParentFolderInfo({
            name: e.folder_name,
            shared_folder_id: e.shared_folder_id,
            path: e.path,
            permissions: t.memberPermissionsApiToRecord(e.permissions)
        })
    }, t.memberAccessLevelApiToRecord = function(e, n) {
        return null == n ? new u.MemberAccessLevelResult : (null != n.access_details && (r = n.access_details.map((function(e) {
            return t.parentFolderInfoApiToRecord(e)
        }))), new u.MemberAccessLevelResult({
            access_level: n.access_level && t.accessLevelApiToConst(o.Union.parse(n.access_level)),
            warning: n.warning,
            parentFolders: r
        }));
        var r
    }, t.teamMemberInfoApiToRecord = function(e) {
        return null == e ? null : new u.TeamMemberInfo({
            display_name: e.display_name,
            member_id: e.member_id,
            team_info: e.team_info && new u.Team(e.team_info)
        })
    }, t.visibilityPolicyApiToRecord = function(e) {
        return new u.LinkVisibilityPolicy({
            policy: e.policy && e.policy[".tag"],
            resolved_policy: e.resolved_policy && e.resolved_policy[".tag"],
            allowed: e.allowed,
            disallowed_reason: e.disallowed_reason && e.disallowed_reason[".tag"]
        })
    }, t.audienceOptionApiToRecord = function(e) {
        return new u.LinkAudienceOption({
            audience: e.audience[".tag"],
            allowed: e.allowed
        })
    }, t.linkPermissionsApiToRecord = function(e) {
        return null == e ? new u.LinkPermissions : new u.LinkPermissions({
            allow_download: e.allow_download,
            allow_comments: e.allow_comments,
            can_allow_download: e.can_allow_download,
            can_disallow_download: e.can_disallow_download,
            can_revoke: e.can_revoke,
            can_set_expiry: e.can_set_expiry,
            can_remove_expiry: e.can_remove_expiry,
            can_set_password: e.can_set_password,
            can_remove_password: e.can_remove_password,
            require_password: e.require_password,
            requested_visibility: e.requested_visibility && e.requested_visibility[".tag"],
            resolved_visibility: e.resolved_visibility && e.resolved_visibility[".tag"],
            restricting_shared_folder_path: e.restricting_shared_folder_path,
            revoke_failure_reason: e.revoke_failure_reason && e.revoke_failure_reason[".tag"],
            team_restricts_comments: e.team_restricts_comments,
            visibility_policies: e.visibility_policies && e.visibility_policies.map(t.visibilityPolicyApiToRecord),
            audience_options: e.audience_options && e.audience_options.map(t.audienceOptionApiToRecord),
            effective_audience: e.effective_audience && e.effective_audience[".tag"],
            link_access_level: e.link_access_level && e.link_access_level[".tag"],
            can_use_extended_sharing_controls: e.can_use_extended_sharing_controls
        })
    }, t.linkMetadataApiToRecord = function(e) {
        return new u.LinkMetadata({
            url: e.url,
            client_modified: e.client_modified && new Date(e.client_modified),
            content_owner_team_info: e.content_owner_team_info && new u.Team(e.content_owner_team_info),
            expires: e.expires && new Date(e.expires),
            file_type: e[".tag"],
            id: e.id,
            link_permissions: t.linkPermissionsApiToRecord(e.link_permissions),
            name: e.name,
            path_lower: e.path_lower,
            rev: e.rev,
            server_modified: e.server_modified && new Date(e.server_modified),
            size: e.size,
            team_member_info: t.teamMemberInfoApiToRecord(e.team_member_info),
            preview_type: e.preview_type
        })
    }, t.accountInfoApiToRecord = function(e) {
        return new u.BasicAccount({
            account_id: e.account_id,
            disabled: e.disabled,
            display_name: e.name.display_name,
            email: e.email,
            email_verified: e.email_verified,
            familiar_name: e.name.familiar_name,
            given_name: e.name.given_name,
            is_teammate: e.is_teammate,
            profile_photo_url: e.profile_photo_url,
            surname: e.name.surname,
            team_member_id: e.team_member_id
        })
    }, t.teamSharingPoliciesApiToRecord = function(e) {
        return e && new u.TeamSharingPolicies({
            shared_folder_member_policy: e.shared_folder_member_policy && e.shared_folder_member_policy[".tag"],
            shared_folder_join_policy: e.shared_folder_join_policy && e.shared_folder_join_policy[".tag"],
            shared_link_create_policy: e.shared_link_create_policy && e.shared_link_create_policy[".tag"]
        })
    }, t.fullAccountApiToRecord = function(e) {
        var n = e.team && new u.FullTeam({
            id: e.team.id,
            name: e.team.name,
            sharing_policies: t.teamSharingPoliciesApiToRecord(e.team.sharing_policies)
        });
        return new u.FullAccount({
            account_id: e.account_id,
            disabled: e.disabled,
            display_name: e.name.display_name,
            email: e.email,
            email_verified: e.email_verified,
            familiar_name: e.name.familiar_name,
            given_name: e.name.given_name,
            profile_photo_url: e.profile_photo_url,
            surname: e.name.surname,
            team_member_id: e.team_member_id,
            team: n
        })
    }, t.sharingPrefsApiToRecord = function(e) {
        return new u.SharingPrefs({
            in_server_side_contact_validation_settings: Boolean(e.in_server_side_contact_validation_settings),
            in_share_modal_evolution: Boolean(e.in_share_modal_evolution),
            in_share_modal_upsell_premium_sharing: Boolean(e.in_share_modal_upsell_premium_sharing),
            in_share_modal_upsell_premium_sharing_variant: e.in_share_modal_upsell_premium_sharing_variant,
            has_seen_share_modal_upsell_premium_sharing_counter: e.has_seen_share_modal_upsell_premium_sharing_counter
        })
    }, t.makeMemberSelector = function(e) {
        return e.startsWith("email:") ? new o.UnionScalar("email", e.substr(6)) : new o.UnionScalar("dropbox_id", e)
    }, t.parseSharedLinkMetadata = function(e) {
        if (null == e) return null;
        var t = o.Union.parse(e.link_permissions.resolved_visibility).type,
            r = null != e.team_member_info ? {
                teamId: e.team_member_info.team_info.id,
                teamName: e.team_member_info.team_info.name
            } : {
                teamId: null,
                teamName: null
            },
            s = {
                isFolder: "folder" === e[".tag"],
                url: e.url,
                name: e.name,
                expires: e.expires && new Date(e.expires),
                visibility: t,
                isPackage: e.is_package
            };
        return new l.LinkInfo(n.__assign(n.__assign({}, s), r))
    }, t.contactToMember = function(e, t) {
        if (void 0 === t && (t = !1), e.type === r.default.NEW_STYLE_GROUP) return {
            ".tag": "dropbox_id",
            dropbox_id: e.getContactID()
        };
        if (t && e.type === r.default.EMAIL && void 0 !== e.dbx_account_id) return {
            ".tag": "dropbox_id",
            dropbox_id: e.dbx_account_id
        };
        if (e.type !== r.default.INVALID_ID) return {
            ".tag": "email",
            email: e.getContactID()
        };
        throw new Error("Unknown contact type")
    }, t.contactsToMembers = function(e, n) {
        return void 0 === n && (n = !1), e.map((function(e) {
            return t.contactToMember(e, n)
        }))
    }, t.createUnionScalar = function(e, t) {
        return new o.UnionScalar(e, t)
    }, t.combinedPolicyDiffToApi = function(e) {
        var t = {};
        return e ? (null != e.acl_update_policy && (t.acl_update_policy = e.acl_update_policy), null != e.member_policy && (t.member_policy = e.member_policy), null != e.shared_link_policy && (t.shared_link_policy = e.shared_link_policy), null != e.download_policy && (t.download_policy = e.download_policy), null != e.viewer_info_policy && (t.viewer_info_policy = e.viewer_info_policy), t) : t
    }
})), define("modules/clean/sharing/confirmation_modals/confirm_with_option_modal", ["require", "exports", "tslib", "react", "spectrum/modal", "modules/clean/ux_analytics_utils", "modules/clean/ux_analytics_modal_tracking"], (function(e, t, n, r, s, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = (function(e) {
        function t(t) {
            var n = e.call(this, t) || this;
            if (n.onCancel = function() {
                    n.props.onCancel && n.props.onCancel(n.state.checked), o.dispatchModalClosed()
                }, null == n.props.children) throw new Error("Must have children prop");
            return n.state = {
                checked: !1
            }, n.handleOptionClick = n.handleOptionClick.bind(n), n.handleAccept = n.handleAccept.bind(n), n.handleDismissCompleted = n.handleDismissCompleted.bind(n), n
        }
        return n.__extends(t, e), t.prototype.render = function() {
            var e = this.props.id || "confirm-with-option-modal";
            return r.default.createElement(s.UtilityModal, {
                ariaLabel: this.props.title,
                title: this.props.title,
                overlayClickClose: !0,
                primaryAction: this.props.confirmText,
                secondaryAction: this.props.cancelText,
                onPrimaryAction: this.handleAccept,
                onSecondaryAction: this.onCancel,
                open: !0,
                onReady: o.dispatchModalOpened,
                onRequestClose: this.onCancel,
                overlayClassName: "file-viewer-modal-overlay",
                link: this.props.link,
                onLink: this.props.onClickLink
            }, r.default.createElement(i.UXAnalyticsModalTracking, {
                id: e
            }), this.renderContent())
        }, t.prototype.renderContent = function() {
            return r.default.createElement("div", {
                className: "simple-modal-content"
            }, r.default.createElement("div", {
                className: "confirm-with-option-modal__body-text"
            }, this.props.children), this.renderOption())
        }, t.prototype.renderOption = function() {
            return this.props.showOption ? r.default.createElement("div", {
                className: "u-mar-vertical-s confirm-with-option-modal__option"
            }, r.default.createElement("input", {
                "aria-checked": this.state.checked,
                checked: this.state.checked,
                className: "confirm-with-option-modal__option-input",
                id: "confirm-with-option-modal__input",
                name: "confirmation_option",
                onClick: this.handleOptionClick,
                role: "checkbox",
                type: "checkbox"
            }), r.default.createElement("label", {
                className: "confirm-with-option-modal__option-label",
                htmlFor: "confirm-with-option-modal__input"
            }, this.props.optionLabel)) : null
        }, t.prototype.handleOptionClick = function() {
            this.setState({
                checked: !this.state.checked
            })
        }, t.prototype.handleAccept = function() {
            this.props.onConfirm && this.props.onConfirm(this.state.checked), o.dispatchModalClosed()
        }, t.prototype.handleDismissCompleted = function() {
            this.props.onCancel && this.props.onCancel(this.state.checked)
        }, t
    })((r = n.__importDefault(r)).default.Component);
    t.ConfirmWithOptionModal = a
})), define("modules/clean/sharing/confirmation_modals/relinquish_membership_confirmation_modal", ["require", "exports", "tslib", "react", "modules/clean/sharing/confirmation_modals/confirm_with_option_modal", "modules/core/i18n", "modules/clean/react/modal"], (function(e, t, n, r, s, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), t.showRelinquishMembershipConfirmationModal = function(e, t, n, a, l, u) {
        var c, d;
        void 0 === l && (l = !1), void 0 === u && (u = !1);
        var p = null;
        e ? (d = o.intl.formatMessage({
            defaultMessage: "Remove your access to this folder?"
        }), c = t && !u ? o.intl.formatMessage({
            defaultMessage: "You may still have access to this folder through a company group or parent folder."
        }) : o.intl.formatMessage({
            defaultMessage: "If you continue, you won’t be able to access this folder anymore."
        }), l && (p = o.intl.formatMessage({
            defaultMessage: "Keep a copy of this folder"
        }))) : (d = o.intl.formatMessage({
            defaultMessage: "Remove your access to this file?"
        }), c = o.intl.formatMessage({
            defaultMessage: "If you continue, you won’t be able to access this file anymore."
        }));
        var h = e ? "relinquish-membership-folder-modal" : "relinquish-membership-file-modal";
        return i.Modal.showInstance(r.default.createElement(s.ConfirmWithOptionModal, {
            cancelText: o.intl.formatMessage({
                defaultMessage: "Cancel"
            }),
            id: h,
            confirmText: o.intl.formatMessage({
                defaultMessage: "Remove my access"
            }),
            onCancel: a,
            onConfirm: n,
            optionLabel: p,
            showOption: null != p,
            title: d
        }, c))
    }
})), define("modules/clean/sharing/confirmation_modals/reset_access_modal", ["require", "exports", "tslib", "react", "modules/clean/em_string", "modules/clean/react/modal", "modules/clean/sharing/confirmation_modals/confirm_with_option_modal", "modules/clean/sharing/constants", "modules/core/i18n"], (function(e, t, n, r, s, o, i, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), t.confirmResetAccess = function(e) {
        var t;
        t = e.isFolder ? l.intl.formatMessage({
            defaultMessage: "Everyone will be removed from this folder. You’ll still keep a copy of this folder in your Dropbox."
        }) : l.intl.formatMessage({
            defaultMessage: "Everyone will be removed from this file. You’ll still keep a copy of this file in your Dropbox."
        });
        var n = l.intl.formatMessage({
            defaultMessage: "Unshare “{content_name}”?"
        }, {
            content_name: s.Emstring.em_snippet(e.contentName, a.SNIPPET_SIZES.FILENAME)
        });
        o.Modal.showInstance(r.default.createElement(i.ConfirmWithOptionModal, {
            cancelText: l.intl.formatMessage({
                defaultMessage: "Cancel"
            }),
            confirmText: l.intl.formatMessage({
                defaultMessage: "Unshare"
            }),
            onCancel: e.onCancel,
            onConfirm: e.onConfirm,
            optionLabel: l.intl.formatMessage({
                defaultMessage: "Let removed members keep a copy of this shared folder"
            }),
            showOption: e.allowLeaveACopy && e.isFolder,
            title: n
        }, t))
    }
})), define("modules/clean/sharing/link_description", ["require", "exports", "tslib", "react", "modules/clean/em_string", "modules/clean/sharing/constants", "modules/constants/trademark", "modules/core/i18n", "modules/core/exception", "modules/clean/sharing/link_description_plain_text", "modules/clean/sharing/link_description_advanced_settings"], (function(e, t, n, r, s, o, i, a, l, u, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r);
    t.formatLinkVisibilityOption = function(e) {
        return (function() {
            switch (e) {
                case "public":
                    return a.intl.formatMessage({
                        defaultMessage: "Anyone with the link"
                    });
                case "team_only":
                    return a.intl.formatMessage({
                        defaultMessage: "Only people on your Dropbox team"
                    });
                case "password":
                    return a.intl.formatMessage({
                        defaultMessage: "Only people with the password"
                    });
                case "team_and_password":
                    return a.intl.formatMessage({
                        defaultMessage: "Only people on your Dropbox team with the password"
                    });
                default:
                    throw Error("Unknown visibility option " + e)
            }
        })()
    };
    t.formatLinkCommentingVisibility = function(e, t, n) {
        return void 0 === n && (n = null), e ? (function() {
            switch (t) {
                case "public":
                    return a.intl.formatMessage({
                        defaultMessage: "Anyone with the link can comment."
                    });
                case "team_only":
                    return a.intl.formatMessage({
                        defaultMessage: "Only people on your Dropbox team can comment."
                    });
                case "password":
                    return a.intl.formatMessage({
                        defaultMessage: "Only people with the password can comment."
                    });
                case "team_and_password":
                    return a.intl.formatMessage({
                        defaultMessage: "Only people on your Dropbox team with the password can comment."
                    });
                case "shared_folder_only":
                    return n = n || "", a.intl.formatMessage({
                        defaultMessage: "Only members of the shared folder “{shared_folder_name}” can comment."
                    }, {
                        shared_folder_name: s.Emstring.em_snippet(n, o.SNIPPET_SIZES.FILENAME)
                    });
                case "only_you":
                    return a.intl.formatMessage({
                        defaultMessage: "Only you can comment."
                    });
                default:
                    throw Error("Unknown visibility setting " + t)
            }
        })() : a.intl.formatMessage({
            defaultMessage: "No one can comment."
        })
    };
    var d = function(e) {
            return null != e.expires ? (function(e) {
                l.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
                var t = (function() {
                    if (null != e.expires) {
                        var t = e.expires.getTime() - (new Date).getTime();
                        return t < 0 && (t = 0), Math.floor(t / 864e5)
                    }
                    return -1
                })();
                return (function() {
                    if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this folder. Expires in <strong>a day</strong>.} other{<strong>Anyone </strong>with the link and the password can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link can <strong>view</strong> this folder. Expires in <strong>a day</strong>.} other{<strong>Anyone</strong> with the link can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Members of this folder</strong> with the link can <strong>view</strong> this folder.             Expires in <strong>a day</strong>.} other{<strong>Members of this folder</strong> with the link can <strong>view</strong> this folder.             Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this folder.             Expires in <strong>a day</strong>.} other{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this folder.             Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this folder. Expires in <strong>a day</strong>.} other{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>a day</strong>.} other{<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    } else switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this file. Expires in <strong>a day</strong>.} other{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this file. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link can <strong>view</strong> this file. Expires in <strong>a day</strong>.} other{<strong>Anyone</strong> with the link can <strong>view</strong> this file. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Members of the containing shared folder</strong> with the link can <strong>view</strong> this file.             Expires in <strong>a day</strong>.} other{<strong>Members of the containing shared folder</strong> with the link can <strong>view</strong> this file.             Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this file.             Expires in <strong>a day</strong>.} other{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this file.             Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this file. Expires in <strong>a day</strong>.} other{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this file. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>a day</strong>.} other{<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>{count} days</strong>.}}"
                            }, {
                                count: t,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    }
                })()
            })(e) : (function(e) {
                return (function() {
                    if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link and password can <strong>view</strong> this folder"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link can <strong>view</strong> this folder"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Members of this folder</strong> with this link can <strong>view</strong> this folder"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this folder"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this folder"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Only you</strong> can <strong>view</strong> via the link."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    } else switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link and password can <strong>view</strong> this file"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link can <strong>view</strong> this file"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Members of the containing shared folder</strong> with the link can <strong>view</strong> this file"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this file"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this file"
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Only you</strong> can <strong>view</strong> via the link."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    }
                })()
            })(e)
        },
        p = function(e) {
            return null != e.expires ? (function(e) {
                l.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
                var t = e.expires ? e.expires.getTime() : 0,
                    n = (function() {
                        if (null != e.expires) {
                            var n = t - (new Date).getTime();
                            return n < 0 && (n = 0), Math.floor(n / 864e5)
                        }
                        return -1
                    })();
                return (function() {
                    if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this folder. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link can <strong>view</strong> this folder. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone</strong> with the link can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Members of this folder</strong> with the link can <strong>view</strong> this folder. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Members of this folder</strong> with the link can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this folder. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this folder. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this folder. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    } else switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this file. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone</strong> with the link and the password can <strong>view</strong> this file. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone</strong> with the link can <strong>view</strong> this file.\nExpires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone</strong> with the link can <strong>view</strong> this file. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Members of the containing shared folder</strong> with the link can <strong>view</strong> this file.\nExpires in <strong>a day</strong>. Downloads disabled.} other{<strong>Members of the containing shared folder</strong> with the link can <strong>view</strong> this file. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this file. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this file.             Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "{count, plural, one{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this file. Expires in <strong>a day</strong>. Downloads disabled.} other{<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this file. Expires in <strong>{count} days</strong>. Downloads disabled.}}"
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Only you</strong> can <strong>view</strong> via the link. Expires in <strong>{count, plural, one{a day} other{# days}}</strong>. Downloads disabled."
                            }, {
                                count: n,
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    }
                })()
            })(e) : (function(e) {
                return (function() {
                    if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link and password can <strong>view</strong> this folder. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link can <strong>view</strong> this folder. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Members of this folder</strong> with this link can <strong>view</strong> this folder. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this folder. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this folder. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Only you</strong> can <strong>view</strong> via the link. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    } else switch (e.link_permissions.resolved_visibility) {
                        case "password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link and password can <strong>view</strong> this file. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "public":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone</strong> with the link can <strong>view</strong> this file. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "shared_folder_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Members of the containing shared folder</strong> with the link can <strong>view</strong> this file. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_and_password":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link and the password can <strong>view</strong> this file. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "team_only":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Anyone on your Dropbox team</strong> with the link can <strong>view</strong> this file. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        case "only_you":
                            return a.intl.formatMessage({
                                defaultMessage: "<strong>Only you</strong> can <strong>view</strong> via the link. Downloads disabled."
                            }, {
                                strong: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return r.default.createElement("strong", null, e)
                                }
                            });
                        default:
                            throw Error("Unknown visibility setting")
                    }
                })()
            })(e)
        },
        h = function(e) {
            return !1 === e.link_permissions.allow_download ? p(e) : d(e)
        };
    t.formatShmodelLinkDescription = h;
    var _ = function(e, t) {
        switch (e.link_permissions.link_access_level) {
            case "editor":
                return f(e, t);
            case "viewer":
                return m(e, t);
            default:
                throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
        }
    };
    t.formatRighteousLinkDescription = _;
    t.formatLinkDescription = function(e, t) {
        return e.isRighteousLink() ? _(e, t) : h(e)
    };
    t.formatLinkDescriptionPlainText = function(e, t, n) {
        return e.isRighteousLink() ? n ? c.formatRighteousLinkAdvancedSettingsDescription(e, t) : _(e, t) : u.formatShmodelLinkDescriptionPlainText(e)
    };
    var f = function(e, t) {
            switch (e.link_permissions.effective_audience) {
                case "public":
                    return a.intl.formatMessage({
                        defaultMessage: "Anyone with this link can edit the file."
                    });
                case "team":
                    return t ? a.intl.formatMessage({
                        defaultMessage: "Anyone on your {trademark_business} team with this link can edit the file."
                    }, {
                        trademark_business: i.TRADEMARK_BUSINESS
                    }) : a.intl.formatMessage({
                        defaultMessage: "Anyone on the {trademark_business} team with this link can edit the file."
                    }, {
                        trademark_business: i.TRADEMARK_BUSINESS
                    });
                case "no_one":
                    return a.intl.formatMessage({
                        defaultMessage: "Members of the file with this link can edit."
                    });
                default:
                    throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
            }
        },
        m = function(e, t) {
            switch (e.link_permissions.effective_audience) {
                case "public":
                    return a.intl.formatMessage({
                        defaultMessage: "Anyone with this link can view the file."
                    });
                case "team":
                    return t ? a.intl.formatMessage({
                        defaultMessage: "Anyone on your {trademark_business} team with this link can view the file."
                    }, {
                        trademark_business: i.TRADEMARK_BUSINESS
                    }) : a.intl.formatMessage({
                        defaultMessage: "Anyone on the {trademark_business} team with this link can view the file."
                    }, {
                        trademark_business: i.TRADEMARK_BUSINESS
                    });
                case "no_one":
                    return a.intl.formatMessage({
                        defaultMessage: "Members of the file with this link can view."
                    });
                default:
                    throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
            }
        }
})), define("modules/clean/sharing/link_description_advanced_settings", ["require", "exports", "modules/core/i18n", "modules/core/exception", "modules/constants/trademark"], (function(e, t, n, r, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    t.formatRighteousLinkAdvancedSettingsDescription = function(e, t) {
        return !1 === e.link_permissions.allow_download ? null != e.expires ? !1 === e.link_permissions.require_password ? p(e, t) : h(e, t) : !1 === e.link_permissions.require_password ? l(e, t) : i(e, t) : null != e.expires ? !1 === e.link_permissions.require_password ? d(e, t) : c(e, t) : !1 === e.link_permissions.require_password ? u(e, t) : a(e, t)
    };
    var o = function(e) {
            var t = e.expires ? e.expires.getTime() : 0;
            if (null != e.expires) {
                var n = t - (new Date).getTime();
                return n < 0 && (n = 0), Math.floor(n / 864e5)
            }
            return -1
        },
        i = function(e, t) {
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link and password can edit the file. Downloads disabled."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link and password can edit the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link and password can edit the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link and password can edit. Downloads disabled."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link and password can view the file. Downloads disabled."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link and password can view the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link and password can view the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link and password can view. Downloads disabled."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        a = function(e, t) {
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link and password can edit the file."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link and password can edit the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link and password can edit the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link and password can edit."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link and password can view the file."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link and password can view the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link and password can view the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link and password can view."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        l = function(e, t) {
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link can edit the file. Downloads disabled."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link can edit the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link can edit the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link can edit. Downloads disabled."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link can view the file. Downloads disabled."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link can view the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link can view the file. Downloads disabled."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link can view. Downloads disabled."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        u = function(e, t) {
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link can edit the file."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link can edit the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link can edit the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link can edit."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "Anyone with this link can view the file."
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "Anyone on your {trademark_business} team with this link can view the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "Anyone on the {trademark_business} team with this link can view the file."
                            }, {
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "Members of the file with this link can view."
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        c = function(e, t) {
            r.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
            var i = o(e);
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link and password can edit the file. Expires in a day.} other{Anyone with this link and password can edit the file. Expires in {count} days.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link and password can edit the file. Expires in a day.} other{Anyone on your {trademark_business} team with this link and password can edit the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link and password can edit the file. Expires in a day.} other{Anyone on the {trademark_business} team with this link and password can edit the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link and password can edit. Expires in a day.} other{Members of the file with this link and password can edit. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link and password can view the file. Expires in a day.} other{Anyone with this link and password can view the file. Expires in {count} days.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link and password can view the file. Expires in a day.} other{Anyone on your {trademark_business} team with this link and password can view the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link and password can view the file. Expires in a day.} other{Anyone on the {trademark_business} team with this link and password can view the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link and password can view. Expires in a day.} other{Members of the file with this link and password can view. Expires in {count} days.}}"
                            }, {
                                count: i
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        d = function(e, t) {
            r.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
            var i = o(e);
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link can edit the file. Expires in a day.} other{Anyone with this link can edit the file. Expires in {count} days.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link can edit the file. Expires in a day.} other{Anyone on your {trademark_business} team with this link can edit the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link can edit the file. Expires in a day.} other{Anyone on the {trademark_business} team with this link can edit the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link can edit. Expires in a day.} other{Members of the file with this link can edit. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link can view the file. Expires in a day.} other{Anyone with this link can view the file. Expires in {count} days.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link can view the file. Expires in a day.} other{Anyone on your {trademark_business} team with this link can view the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link can view the file. Expires in a day.} other{Anyone on the {trademark_business} team with this link can view the file. Expires in {count} days.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link can view. Expires in a day.} other{Members of the file with this link can view. Expires in {count} days.}}"
                            }, {
                                count: i
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        p = function(e, t) {
            r.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
            var i = o(e);
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link can edit the file. Expires in a day. Downloads disabled.} other{Anyone with this link can edit the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link can edit the file. Expires in a day. Downloads disabled.} other{Anyone on your {trademark_business} team with this link can edit the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link can edit the file. Expires in a day. Downloads disabled.} other{Anyone on the {trademark_business} team with this link can edit the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link can edit. Expires in a day. Downloads disabled.} other{Members of the file with this link can edit. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link can view the file. Expires in a day. Downloads disabled.} other{Anyone with this link can view the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link can view the file. Expires in a day. Downloads disabled.} other{Anyone on your {trademark_business} team with this link can view the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link can view the file. Expires in a day. Downloads disabled.} other{Anyone on the {trademark_business} team with this link can view the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link can view. Expires in a day. Downloads disabled.} other{Members of the file with this link can view. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        },
        h = function(e, t) {
            r.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
            var i = o(e);
            switch (e.link_permissions.link_access_level) {
                case "editor":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link and password can edit the file. Expires in a day. Downloads disabled.} other{Anyone with this link and password can edit the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link and password can edit the file. Expires in a day. Downloads disabled.} other{Anyone on your {trademark_business} team with this link and password can edit the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link and password can edit the file. Expires in a day. Downloads disabled.} other{Anyone on the {trademark_business} team with this link and password can edit the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link and password can edit. Expires in a day. Downloads disabled.} other{Members of the file with this link and password can edit. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                case "viewer":
                    switch (e.link_permissions.effective_audience) {
                        case "public":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone with this link and password can view the file. Expires in a day. Downloads disabled.} other{Anyone with this link and password can view the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        case "team":
                            return t ? n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on your {trademark_business} team with this link and password and password can view the file. Expires in a day. Downloads disabled.} other{Anyone on your {trademark_business} team with this link and password can view the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            }) : n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Anyone on the {trademark_business} team with this link and password can view the file. Expires in a day. Downloads disabled.} other{Anyone on the {trademark_business} team with this link and password can view the file. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i,
                                trademark_business: s.TRADEMARK_BUSINESS
                            });
                        case "no_one":
                            return n.intl.formatMessage({
                                defaultMessage: "{count, plural, one{Members of the file with this link and password can view. Expires in a day. Downloads disabled.} other{Members of the file with this link and password can view. Expires in {count} days. Downloads disabled.}}"
                            }, {
                                count: i
                            });
                        default:
                            throw Error("Unknown link audience: " + e.link_permissions.effective_audience)
                    }
                default:
                    throw Error("Unknown link access level: " + e.link_permissions.link_access_level)
            }
        }
})), define("modules/clean/sharing/link_description_plain_text", ["require", "exports", "modules/core/i18n", "modules/core/exception"], (function(e, t, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(e) {
        var t = e.expires ? e.expires.getTime() : 0;
        if (null != e.expires) {
            var n = t - (new Date).getTime();
            return n < 0 && (n = 0), Math.floor(n / 864e5)
        }
        return -1
    };
    t.formatShmodelLinkDescriptionPlainText = function(e) {
        return !1 === e.link_permissions.allow_download ? null != e.expires ? (function(e) {
            r.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
            var t = s(e);
            return (function() {
                if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link and the password can view the folder. Expires in a day. Downloads disabled.} other{Anyone with this link and the password can view the folder. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link can view the folder. Expires in a day. Downloads disabled.} other{Anyone with this link can view the folder. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Members of the folder with this link can view this folder. Expires in a day. Downloads disabled.} other{Members of the folder with this link can view this folder. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link and the password can view the folder. Expires in a day. Downloads disabled.} other{Anyone on your Dropbox team with this link and the password can view the folder. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link can view the folder. Expires in a day. Downloads disabled.} other{Anyone on your Dropbox team with this link can view the folder. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Only you can view via this link. Expires in a day. Downloads disabled.} other{Only you can view via this link. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    default:
                        throw Error("Unknown visibility setting")
                } else switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link and the password can view the file. Expires in a day. Downloads disabled.} other{Anyone with this link and the password can view the file. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link can view the file.\nExpires in a day. Downloads disabled.} other{Anyone with this link can view the file. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Members of the containing shared folder with this link can view the file.\nExpires in a day. Downloads disabled.} other{Members of the containing shared folder with this link can view this file. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link and the password can view the file. Expires in a day. Downloads disabled.} other{Anyone on your Dropbox team with this link and the password can view the file.               Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link can view the file. Expires in a day. Downloads disabled.} other{Anyone on your Dropbox team with this link can view the file. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Only you can view via this link. Expires in a day. Downloads disabled.} other{Only you can view via this link. Expires in {count} days. Downloads disabled.}}"
                        }, {
                            count: t
                        });
                    default:
                        throw Error("Unknown visibility setting")
                }
            })()
        })(e) : (function(e) {
            return (function() {
                if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link and password can view the folder. Downloads disabled."
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link can view the folder. Downloads disabled."
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Members of the folder with this link can view the folder. Downloads disabled."
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link and the password can view the folder. Downloads disabled."
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link can view the folder. Downloads disabled."
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "Only you can view via this link. Downloads disabled."
                        });
                    default:
                        throw Error("Unknown visibility setting")
                } else switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link and password can view the file. Downloads disabled."
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link can view the file. Downloads disabled."
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Members of the containing shared folder with this link can view the file. Downloads disabled."
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link and the password can view the file. Downloads disabled."
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link can view the file. Downloads disabled."
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "Only you can view via this link. Downloads disabled."
                        });
                    default:
                        throw Error("Unknown visibility setting")
                }
            })()
        })(e) : null != e.expires ? (function(e) {
            r.assert(!!e.expires, "this function should only be used when there is expiry for linkMetadata");
            var t = s(e);
            return (function() {
                if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link and the password can view the folder. Expires in a day.} other{Anyone with this link and the password can view the folder. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link can view the folder. Expires in a day.} other{Anyone with this link can view the folder. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Members of the folder with this link can view the folder.               Expires in a day.} other{Members of the folder with this link can view the folder.               Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link and the password can view the folder.               Expires in a day.} other{Anyone on your Dropbox team with this link and the password can view the folder.               Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link can view the folder. Expires in a day.} other{Anyone on your Dropbox team with this link can view the folder. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Only you can view via this link. Expires in a day.} other{Only you can view via this link. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    default:
                        throw Error("Unknown visibility setting")
                } else switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link and the password can view the file. Expires in a day.} other{Anyone with this link and the password can view the file. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone with this link can view the file. Expires in a day.} other{Anyone with this link can view the file. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Members of the containing shared folder with this link can view the file.               Expires in a day.} other{Members of the containing shared folder with this link can view the file.               Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link and the password can view the file.               Expires in a day.} other{Anyone on your Dropbox team with this link and the password can view the file.               Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Anyone on your Dropbox team with this link can view the file. Expires in a day.} other{Anyone on your Dropbox team with this link can view the file. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "{count, plural, one{Only you can view via this link. Expires in a day.} other{Only you can view via this link. Expires in {count} days.}}"
                        }, {
                            count: t
                        });
                    default:
                        throw Error("Unknown visibility setting")
                }
            })()
        })(e) : (function(e) {
            return (function() {
                if (e.isFolder()) switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link and password can view the folder."
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link can view the folder."
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Members of the folder with this link can view the folder."
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link and the password can view the folder."
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link can view the folder."
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "Only you can view via this link."
                        });
                    default:
                        throw Error("Unknown visibility setting")
                } else switch (e.link_permissions.resolved_visibility) {
                    case "password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link and password can view the file."
                        });
                    case "public":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone with this link can view the file."
                        });
                    case "shared_folder_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Members of the containing shared folder with this link can view the file."
                        });
                    case "team_and_password":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link and the password can view the file."
                        });
                    case "team_only":
                        return n.intl.formatMessage({
                            defaultMessage: "Anyone on your Dropbox team with this link can view the file."
                        });
                    case "only_you":
                        return n.intl.formatMessage({
                            defaultMessage: "Only you can view via this link."
                        });
                    default:
                        throw Error("Unknown visibility setting")
                }
            })()
        })(e)
    }
})), define("modules/clean/sharing/link_info", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function(e) {
        var t = e.expires,
            n = e.isFolder,
            r = e.name,
            s = e.teamId,
            o = e.teamName,
            i = e.url,
            a = e.visibility,
            l = e.isPackage;
        this.expires = t, this.isFolder = n, this.name = r, this.teamId = s, this.teamName = o, this.url = i, this.visibility = a, this.isPackage = l
    };
    t.LinkInfo = n
})), define("modules/clean/sharing/share_page/action_types", ["require", "exports", "modules/clean/flux/action_type"], (function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n.withActionNamespace("share-page", {
        INITIALIZE: "initialize-store",
        EMAIL_UNVERIFIED: "email-unverified",
        RECENT_TAB_EMAIL_UNVERIFIED: "recent-tab-email-unverified",
        SWITCH_TAB: "switch-tab",
        SWITCH_ROLE: "switch-role",
        SWITCH_USER: "switch-user",
        LOAD_PRE_FOLDER_DATA_REQUEST: "load-pre-folder-data-request",
        LOAD_PRE_FOLDER_DATA_SUCCESS: "load-pre-folder-data-success",
        LOAD_PRE_FOLDER_DATA_ERROR: "load-pre-folder-data-error",
        LOAD_FOLDER_DATA_REQUEST: "load-folder-data-request",
        LOAD_FOLDER_DATA_SUCCESS: "load-folder-data-success",
        LOAD_FOLDER_DATA_ERROR: "load-folder-data-error",
        LOAD_PRE_FILE_DATA_REQUEST: "load-pre-file-data-request",
        LOAD_PRE_FILE_DATA_SUCCESS: "load-pre-file-data-success",
        LOAD_PRE_FILE_DATA_ERROR: "load-pre-file-data-error",
        LOAD_FILE_DATA_REQUEST: "load-file-data-request",
        LOAD_FILE_DATA_SUCCESS: "load-file-data-success",
        LOAD_FILE_DATA_ERROR: "load-file-data-error",
        MOUNT_FOLDER_REQUEST: "mount-folder-request",
        MOUNT_FOLDER_SUCCESS: "mount-folder-success",
        MOUNT_FOLDER_ERROR: "mount-folder-error",
        UNMOUNT_FOLDER_REQUEST: "unmount-folder-request",
        UNMOUNT_FOLDER_SUCCESS: "unmount-folder-success",
        UNMOUNT_FOLDER_ERROR: "unmount-folder-error",
        UNSHARE_FOLDER_REQUEST: "unshare-folder-request",
        UNSHARE_FOLDER_SUCCESS: "unshare-folder-success",
        UNSHARE_FOLDER_ERROR: "unshare-folder-error",
        FETCH_TEAM_POLICY_REQUEST: "fetch-team-policy-request",
        FETCH_TEAM_POLICY_SUCCESS: "fetch-team-policy-success",
        FETCH_TEAM_POLICY_ERROR: "fetch-team-policy-error",
        FETCH_FOLDER_POLICY_SUCCESS: "fetch-folder-policy-success",
        FETCH_METADATA_SUCCESS: "fetch-metadata-success",
        RELINQUISH_FOLDER_MEMBERSHIP_REQUEST: "relinquish-folder-membership-request",
        RELINQUISH_FOLDER_MEMBERSHIP_SUCCESS: "relinquish-folder-membership-success",
        RELINQUISH_FOLDER_MEMBERSHIP_ERROR: "relinquish-folder-membership-error",
        RELINQUISH_FILE_MEMBERSHIP_REQUEST: "relinquish-file-membership-request",
        RELINQUISH_FILE_MEMBERSHIP_SUCCESS: "relinquish-file-membership-success",
        RELINQUISH_FILE_MEMBERSHIP_ERROR: "relinquish-file-membership-error"
    });
    t.SharePageActionTypes = r
})), define("modules/clean/sharing/ui_util", ["require", "exports", "tslib", "react", "external/lodash", "modules/clean/analytics", "modules/clean/api_v2/error", "modules/clean/contacts/contact_token_state", "modules/clean/filepath", "modules/clean/filetypes", "modules/clean/react/icon/icon_helper", "modules/clean/sharing/api/types/metadata", "modules/clean/sharing/gating_util", "modules/constants/trademark", "modules/core/i18n", "modules/core/format_html"], (function(e, t, n, r, s, o, i, a, l, u, c, d, p, h, _, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importStar(s);
    t.SharingExperiments = {};
    var m = {
        strong: function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return r.default.createElement("strong", null, e)
        },
        em: function() {
            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
            return r.default.createElement("em", null, e)
        }
    };
    t.SHARE_UI_TYPE = {
        SHARED_FILE: "shared-file",
        SHARED_FOLDER: "shared-folder",
        SHARED_LINK: "shared-link",
        PUBLIC: "public",
        NO_SHARE: "no-share"
    };
    var g, y = {
        SINGLE_INVALID: _.intl.formatMessage({
            defaultMessage: "The email address you entered is invalid."
        }),
        SINGLE_OUT_OF_TEAM: _.intl.formatMessage({
            defaultMessage: "You can only share with your team and people your admin has approved."
        }),
        SINGLE_TOO_MANY_MEMBERS: _.intl.formatMessage({
            defaultMessage: "Can’t share with this many people."
        }),
        GENERAL_INVALID: _.intl.formatMessage({
            defaultMessage: "One or more names or email addresses you entered are invalid."
        }),
        GENERAL_OUT_OF_TEAM: _.intl.formatMessage({
            defaultMessage: "Some of these people aren’t on your Dropbox team."
        }),
        GENERAL_TOO_MANY_MEMBERS: _.intl.formatMessage({
            defaultMessage: "This will put the folder over its {member_limit}-member limit. <a>Learn more.</a>",
            description: "member_limit will be a number greater than 200"
        }, {
            member_limit: p.GoldenGate.SHARING_TOTAL_LIMIT,
            a: function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return r.default.createElement("a", {
                    href: "/help/9292",
                    target: "_blank",
                    key: "help_center_article"
                }, e)
            }
        }),
        NONGROUP_INVITEE: _.intl.formatMessage({
            defaultMessage: "Only groups can be added to team folders."
        }),
        NO_PERMISSION: _.intl.formatMessage({
            defaultMessage: "You don’t have permission to share with this person."
        }),
        GENERAL_NO_PERMISSION: _.intl.formatMessage({
            defaultMessage: "You don’t have permission to share with some of these people."
        })
    };
    t.CONTACT_ERROR_MESSAGES = y, (function(e) {
        e.Error = "error", e.Warn = "warn"
    })(g || (g = {})), t.ContactsErrorLevel = g;
    var v = function(e, t) {
            return (t.displayName() || "").toLowerCase()
        },
        b = Math.pow(2, 53) - 1;
    t.makeMemberSortCmp = function(e, t, n) {
        var r = n ? (function(e) {
            return function(t, n) {
                var r, s, o, i = n.memberId() === t,
                    a = n instanceof d.GroupMembershipInfo ? "0" : "1",
                    l = (n.displayName() || "").toLowerCase(),
                    u = null != n.account_id && e.has(n.account_id);
                return "" + a + (u && i ? "a" : u ? "b" : null != n.time_last_seen ? "c" + (r = n.time_last_seen, s = String(b - Number(r)), o = String(b).length, s.length < o && (s = "" + Array(o - s.length + 1).join("0") + s), s) : "d") + l
            }
        })(t) : v;
        return function(t, n) {
            var s = r(e.account_id, t),
                o = r(e.account_id, n);
            return s < o ? -1 : s === o ? 0 : 1
        }
    };
    var w = function(e, t, n) {
        return !e.is_cdm_member && (t || n)
    };
    t.shouldEnforceMemberLimits = w;
    t.validateContact = function(e, t, n, r, s, o, i) {
        var l = {
            state: a.ContactTokenState.ok,
            msg: null
        };
        if (s && !e.group_id) return {
            state: a.ContactTokenState.invalid,
            msg: y.NONGROUP_INVITEE
        };
        if (w(t, s, o) && i > p.GoldenGate.SHARING_TOTAL_LIMIT) return {
            state: a.ContactTokenState.invalid,
            msg: y.SINGLE_TOO_MANY_MEMBERS
        };
        if (e.invalid) l = {
            state: a.ContactTokenState.invalid,
            msg: y.SINGLE_INVALID
        };
        else {
            if (e.email === t.email) return l;
            if (null != n && t.is_team && e.dbx_team_id !== n.id && !e.group_id) {
                l = {
                    msg: y.SINGLE_OUT_OF_TEAM,
                    state: "team" === (null != r ? r.member_policy : void 0) || "team" === (null != r ? r.resolved_member_policy : void 0) ? a.ContactTokenState.invalid : a.ContactTokenState.warn
                }
            }
        }
        return l
    };
    t.validateContacts = function(e, t, n, r, s, o, i) {
        for (var l = null, u = null, c = 0, d = e; c < d.length; c++) {
            var h = n[d[c].getKey()];
            if (h) {
                var _ = h.state,
                    f = h.msg;
                if (_ === a.ContactTokenState.invalid) {
                    if (l = g.Error, f === y.SINGLE_INVALID) {
                        u = y.GENERAL_INVALID;
                        break
                    }
                    f === y.SINGLE_OUT_OF_TEAM && (u = y.GENERAL_OUT_OF_TEAM), f === y.NONGROUP_INVITEE && (u = y.NONGROUP_INVITEE), f === y.NO_PERMISSION && (u = y.GENERAL_NO_PERMISSION)
                }
                _ === a.ContactTokenState.warn && f === y.SINGLE_OUT_OF_TEAM && (l || (l = g.Warn, u = y.GENERAL_OUT_OF_TEAM))
            }
        }
        return w(t, s, o) && e.length > 0 && l !== g.Error && i > p.GoldenGate.SHARING_TOTAL_LIMIT && (l = g.Error, u = y.GENERAL_TOO_MANY_MEMBERS), {
            level: l,
            message: u
        }
    };
    t.logTiburonEvent = function(e, t, n, r) {
        void 0 === r && (r = {});
        var i = e.extras.origin;
        o.ShareTibEventLogger.log(t, n, i, s.assignIn(r, {
            file_id: e.extras.fileId,
            fq_path: e.displayPath(),
            ns_id: e.isSharedFolder() ? e.sharedFolderId() : void 0,
            modal_session_id: e.extras.modalSessionId
        }))
    };
    var k = {
        access_error: _.intl.formatMessage({
            defaultMessage: "You don’t have access to this content."
        }),
        email_unverified: _.intl.formatMessage({
            defaultMessage: "You haven’t verified your email. Check your email and try again."
        }),
        bad_member: _.intl.formatMessage({
            defaultMessage: "You entered an invalid name or email address."
        }),
        cant_share_outside_team: _.intl.formatMessage({
            defaultMessage: "Your team settings don’t allow sharing outside your team."
        }),
        too_many_members: _.intl.formatMessage({
            defaultMessage: "You’re sharing with too many people."
        }),
        too_many_pending_invites: _.intl.formatMessage({
            defaultMessage: "You’re sharing with too many people."
        }),
        rate_limit: _.intl.formatMessage({
            defaultMessage: "You’ve hit the limit of invites for today. Try again later."
        }),
        insufficient_plan: _.intl.formatMessage({
            defaultMessage: "You need a Dropbox {trademark_plus} or Business account to do this."
        }, {
            trademark_plus: h.TRADEMARK_PLUS
        }),
        team_folder: _.intl.formatMessage({
            defaultMessage: "You can’t add members to a team folder. Contact your team admin."
        }),
        no_permission: _.intl.formatMessage({
            defaultMessage: "You don’t have permission to do this. Contact the owner."
        })
    };
    t.genAddMemberErrorMessage = function(e) {
        return e.message ? e.message : e instanceof i.AppError && e.error && e.error[".tag"] && k[e.error[".tag"]] ? k[e.error[".tag"]] : _.intl.formatMessage({
            defaultMessage: "There was a problem completing this request."
        })
    };
    t.folderIconForMetadata = function(e) {
        var t = null != e.parent_shared_folder_id,
            n = !1;
        return e.permissions && e.permissions.edit_contents && (n = !e.permissions.edit_contents.allow), c.folder_icon({
            isShared: e.isSharedFolder(),
            isDeleted: null == e.path_lower,
            isInTeamFolderTree: t,
            isTeamFolder: e.is_team_folder,
            isViewOnly: n
        })
    };
    t.spectrumFolderIconForMetadata = function(e) {
        var t = null != e.parent_shared_folder_id,
            n = !1;
        e.permissions && e.permissions.edit_contents && (n = !e.permissions.edit_contents.allow);
        var r = u.FileTypes.FOLDER;
        return e.isSharedFolder() ? r = u.FileTypes.SHARED_FOLDER : e.is_team_folder && (r = u.FileTypes.TEAM_SHARED_FOLDER), c.spectrumFolderIcon({
            fileType: r,
            isInTeamFolderTree: t,
            isViewOnly: n
        })
    };
    t.fileIconForMetadata = function(e) {
        return c.file_icon(e.name, {
            size: c.ICON_SIZES.LARGE
        })
    };
    t.getNewFolderPathFromContentName = function(e, t) {
        return [l.normalize(t), e].join("/")
    };
    t.getMemberCountForTokens = function(e) {
        return null == e ? 0 : e.map((function(e) {
            return e.group_size || 1
        })).reduce((function(e, t) {
            return e + t
        }), 0)
    };
    t.convertIfHTML = function(e) {
        return e.toHTML ? f.legacyFormatHtmlAsReact(e.toHTML(), m) : e
    }
})), define("modules/clean/teams/admin/api/admin_console_api_client", ["require", "exports", "tslib", "modules/clean/api_v2/types", "modules/clean/cloud_docs/types", "modules/clean/api_v2/default_team_client", "modules/clean/filepath", "modules/clean/sharing/api/util/types", "modules/clean/viewer"], (function(e, t, n, r, s, o, i, a, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = n.__importStar(i);
    var u = (function() {
        function e(e) {
            var t;
            void 0 === e && (e = !1), this.isCMForCDM = e;
            var n = l.Viewer.get_viewer().get_user_by_role("work");
            n && (n.team_member_id && (this.selectAdminParams = {
                headers: (t = {}, t[r.ApiV2HeaderNames.DropboxApiSelectAdmin] = n.team_member_id, t)
            }), this.teamClient = new o.DefaultTeamApiV2Client(n))
        }
        return e.prototype.teamRoutes = function() {
            return this.teamClient.ns("team")
        }, e.prototype.domainRoutes = function() {
            return this.teamClient.ns("domains")
        }, e.prototype.teamMembersInternal = function() {
            return this.teamClient.ns("team_members_internal")
        }, e.prototype.teamInsightsRoutes = function() {
            return this.teamClient.ns("team_insights")
        }, e.prototype.teamLogRoutes = function() {
            return this.teamClient.ns("team_log")
        }, e.prototype.usersRoutes = function() {
            return this.teamClient.ns("users")
        }, e.prototype.filesRoutes = function() {
            return this.teamClient.ns("files")
        }, e.prototype.sharingRoutes = function() {
            return this.teamClient.ns("sharing")
        }, e.prototype.federationRoutes = function() {
            return this.teamClient.ns("federation")
        }, e.prototype.fileTransfersRoutes = function() {
            return this.teamClient.ns("file_transfers")
        }, e.prototype.cloudDocsRoutes = function() {
            return this.teamClient.ns("cloud_docs")
        }, e.prototype.setPermanentDeletePolicy = function(e) {
            return this.teamRoutes().rpc("set_permanent_delete_policy", {
                permanent_delete_enabled: e
            }, {})
        }, e.prototype.setRewindPolicy = function(e) {
            var t = {
                ".tag": e
            };
            return this.teamRoutes().rpc("set_rewind_policy", {
                rewind_policy: t
            }, {})
        }, e.prototype.setCloudDocsPolicy = function(e, t) {
            var n = {};
            (n[s.CloudDocProviderIntegration.GDD_INTEGRATION.toString()] = e ? s.IntegrationCreateAndEdit : s.IntegrationViewOnly, "boolean" == typeof t) && (n[s.CloudDocProviderIntegration.PAPER_INTEGRATION.toString()] = t ? s.IntegrationCreateAndEdit : s.IntegrationViewOnly);
            return this.cloudDocsRoutes().rpc("team_settings/set", {
                settings: n
            }, this.selectAdminParams)
        }, e.prototype.setMultipleAccountsPolicy = function(e) {
            return this.teamRoutes().rpc("set_multiple_accounts_policy", {
                multiple_accounts_enabled: e
            }, {})
        }, e.prototype.setSecondaryEmailsPolicy = function(e) {
            var t = e ? {
                ".tag": "enabled"
            } : {
                ".tag": "disabled"
            };
            return this.teamRoutes().rpc("set_secondary_mails_policy", {
                secondary_mails_policy: t
            }, {})
        }, e.prototype.setCameraUploadsPolicy = function(e) {
            var t = e ? {
                ".tag": "enabled"
            } : {
                ".tag": "disabled"
            };
            return this.teamRoutes().rpc("set_camera_uploads_policy", {
                camera_uploads_policy: t
            }, {})
        }, e.prototype.setDesktopAppDefaults = function(e) {
            var t = e;
            return this.teamRoutes().rpc("set_team_default_desktop_pathway", {
                pathway: t
            }, {})
        }, e.prototype.setFileLockingPolicy = function(e) {
            var t = e ? {
                ".tag": "enabled"
            } : {
                ".tag": "disabled"
            };
            return this.teamRoutes().rpc("set_file_locking_policy", {
                file_locking_policy: t
            }, {})
        }, e.prototype.setSmarterSmartSyncPolicy = function(e) {
            var t = e ? {
                ".tag": "enabled"
            } : {
                ".tag": "disabled"
            };
            return this.teamRoutes().rpc("set_smarter_smart_sync_policy", {
                smarter_smart_sync_policy: t
            }, {})
        }, e.prototype.updateAppActionSettings = function(e, t) {
            return this.teamRoutes().rpc("app_actions/update_settings", {
                allow_actions: e,
                action_state_updates: t.map((function(e) {
                    return {
                        id: e.id,
                        is_enabled: !e.isIndividuallyDisabled
                    }
                }))
            }, {})
        }, e.prototype.updateTeamIntegrationSettings = function(e) {
            var t = e.find((function(e) {
                return "zoom" === e.id
            }));
            return t && t.teamSettings ? this.teamRoutes().rpc("integrations/set_team_integration_settings", {
                zoom_team_settings: {
                    meeting_recordings_disabled_by_admin: t.teamSettings.zoomMeetingRecordingsDisabledByAdmin
                }
            }, {}) : Promise.resolve()
        }, e.prototype.updateCommunicationAppSettings = function(e) {
            return this.teamRoutes().rpc("profile_services/set_service_enabled_states", {
                enabled_state_updates: e.map((function(e) {
                    return {
                        service: {
                            ".tag": e.id
                        },
                        is_enabled: !e.isIndividuallyDisabled
                    }
                }))
            }, {})
        }, e.prototype.updateCoordinationAppSettings = function(e) {
            return this.teamRoutes().rpc("profile_services/set_service_enabled_states", {
                enabled_state_updates: e.map((function(e) {
                    return {
                        service: {
                            ".tag": e.id
                        },
                        is_enabled: !e.isIndividuallyDisabled
                    }
                }))
            }, {})
        }, e.prototype.setFileRequestPolicy = function(e) {
            return this.teamRoutes().rpc("sharing/set_file_request_policy", {
                file_request_enabled: e
            }, {})
        }, e.prototype.setOfficeAddInPolicy = function(e) {
            return this.teamRoutes().rpc("set_office_addin_policy", {
                office_addin_enabled: e
            }, {})
        }, e.prototype.setSharedLinkPolicy = function(e, t) {
            var n = {
                sharing_outside_enabled: e
            };
            return e && (n.default_visibility = t), this.teamRoutes().rpc("sharing/set_shared_link_policy", n, {})
        }, e.prototype.setSharedFolderSharingPolicy = function(e, t) {
            return t ? this.teamRoutes().rpc("sharing/set_shared_folder_sharing_policy", {
                sharing_outside_enabled: e,
                external_sharing_policy: {
                    ".tag": t
                }
            }, {}) : this.teamRoutes().rpc("sharing/set_shared_folder_sharing_policy", {
                sharing_outside_enabled: e
            }, {})
        }, e.prototype.setSharedFolderJoiningPolicy = function(e) {
            return this.teamRoutes().rpc("sharing/set_shared_folder_joining_policy", {
                joining_outside_enabled: e
            }, {})
        }, e.prototype.setFileTransfersPolicy = function(e) {
            return this.fileTransfersRoutes().rpc("teams/set_file_transfers_policy", {
                file_transfers_enabled: e
            }, {})
        }, e.prototype.setCommentingPolicy = function(e) {
            return this.teamRoutes().rpc("sharing/set_commenting_policy", {
                commenting_enabled: e
            }, {})
        }, e.prototype.setPasswordStrength = function(e, t) {
            var n = "enabled" === e ? t : "minimal_requirements";
            return this.teamRoutes().rpc("set_password_requirements", {
                password_strength_policy: n
            }, {})
        }, e.prototype.resetAllPasswords = function() {
            return this.teamRoutes().rpc("reset_all_passwords", void 0, {})
        }, e.prototype.setViewerInfoSetting = function(e) {
            return this.teamRoutes().rpc("set_viewer_info_policy", {
                viewer_info_policy: e
            }, {})
        }, e.prototype.setPaperPolicy = function(e, t, n, r) {
            var s = {
                paper_enabled: e,
                paper_deployment_mode: {
                    paper_deployment_type: n,
                    enabled_members_update: {
                        users_to_add: this.make_user_selector_list(r.users_to_add),
                        users_to_remove: this.make_user_selector_list(r.users_to_remove)
                    }
                }
            };
            return t && (s.dropbox_terms = "agree"), this.teamRoutes().rpc("paper/set_paper_policy", s, {})
        }, e.prototype.setPaperSharingPolicy = function(e, t) {
            void 0 === e && (e = !0);
            var n = {
                external_sharing_allowed: void 0 === e || e,
                default_visibility: t
            };
            return this.teamRoutes().rpc("paper/set_paper_sharing_policy", n, {})
        }, e.prototype.setPaperDefaultFolderPolicy = function(e) {
            return this.teamRoutes().rpc("paper/set_paper_default_folder_policy", {
                default_folder_policy: e
            }, {})
        }, e.prototype.setPaperDesktopPolicy = function(e) {
            return this.teamRoutes().rpc("paper/set_paper_desktop_policy", {
                enabled: e
            }, {})
        }, e.prototype.setShowcasePolicy = function(e, t, n) {
            var r = {
                showcase_enabled: e,
                external_sharing_enabled: t,
                download_enabled: n
            };
            return this.teamRoutes().rpc("showcase/set_showcase_policy", r, {})
        }, e.prototype.setRequestMembershipPolicy = function(e) {
            return this.teamRoutes().rpc("set_request_membership_policy", {
                request_membership: e
            }, {})
        }, e.prototype.setSuggestMembersPolicy = function(e) {
            return this.teamRoutes().rpc("set_suggest_members_policy", {
                suggest_members_enabled: e
            }, {})
        }, e.prototype.setWatermarkingPolicy = function(e) {
            return this.teamRoutes().rpc("workflows/set_watermarking_policy", {
                watermarking_policy: {
                    ".tag": e ? "on" : "off"
                }
            }, {})
        }, e.prototype.deviceManagementGetExcludedUsers = function() {
            return this.teamRoutes().rpc("device_management/get_excluded_users", void 0, {})
        }, e.prototype.deviceManagementConfigureSettings = function(e) {
            return this.teamRoutes().rpc("device_management/configure_settings", e, {})
        }, e.mapValueToRolloutMethod = function(e) {
            return 0 === e ? "unlink_all" : 1 === e ? "unlink_most_inactive" : "add_member_to_exceptions"
        }, e.prototype.deviceManagementConfigureSettingsForAcf = function(t, n, r, s, o) {
            var i = {
                is_enabled: !0,
                can_user_remove_device: n,
                rollout_method: {
                    ".tag": e.mapValueToRolloutMethod(o)
                },
                users_to_add: t.users_to_add,
                users_to_remove: t.users_to_remove,
                desktop_devices_limit: -1 === r ? {
                    ".tag": "unlimited"
                } : {
                    limited: Number(r),
                    ".tag": "limited"
                },
                mobile_devices_limit: -1 === s ? {
                    ".tag": "unlimited"
                } : {
                    limited: Number(s),
                    ".tag": "limited"
                }
            };
            return this.teamRoutes().rpc("device_management/configure_settings", i, {})
        }, e.prototype.deviceManagementConfigureSettingsDisable = function() {
            return this.teamRoutes().rpc("device_management/configure_settings", {
                is_enabled: !1
            }, {})
        }, e.prototype.deviceManagementRemoveDevice = function(e, t, n) {
            return this.teamRoutes().rpc("device_management/remove_device", {
                user_id: e,
                device_id: t,
                delete_data: n
            }, {})
        }, e.prototype.deviceManagementRemoveClient = function(e, t, n, r) {
            return this.teamRoutes().rpc("device_management/remove_client", {
                user_id: e,
                device_id: t,
                client_unique_identifier: n,
                delete_data: r
            }, {})
        }, e.prototype.webSessionManagementConfigureSettings = function(e, t, n) {
            return this.teamRoutes().rpc("web_session_management/configure_settings", {
                remember_session_expires: e,
                idle_session_timeout: t,
                number_of_allowed_sessions: n
            }, {})
        }, e.prototype.teamFolderArchive = function(e, t) {
            return void 0 === t && (t = !1), this.teamRoutes().rpc("team_folder/archive", {
                team_folder_id: String(e),
                force_async_off: !t
            }, {})
        }, e.prototype.teamFolderUnarchive = function(e) {
            return this.teamRoutes().rpc("team_folder/activate", {
                team_folder_id: String(e)
            }, {})
        }, e.prototype.teamFolderCreate = function(e, t) {
            var n = {
                name: e
            };
            return void 0 !== t && (n.sync_setting = t ? {
                ".tag": "default"
            } : {
                ".tag": "not_synced"
            }), this.teamRoutes().rpc("team_folder/create", n, {})
        }, e.prototype.teamFolderUpdateSyncSetting = function(e) {
            var t = e.teamFolderId,
                n = e.syncSetting,
                r = e.fileIds,
                s = {
                    team_folder_id: t
                },
                o = {
                    ".tag": n
                };
            return r ? s.content_sync_settings = r.map((function(e) {
                return {
                    id: e,
                    sync_setting: o
                }
            })) : s.sync_setting = o, this.teamRoutes().rpc("team_folder/update_sync_settings", s, {})
        }, e.prototype.teamFoldersList = function(e) {
            return void 0 === e && (e = 1e3), this.teamRoutes().rpc("team_folder/list", {
                limit: e
            }, {})
        }, e.prototype.teamFoldersListContinue = function(e) {
            return this.teamRoutes().rpc("team_folder/list/continue", {
                cursor: e
            }, {})
        }, e.prototype.teamNamespacesList = function() {
            return this.teamRoutes().rpc("namespaces/list", {
                filter: {
                    ".tag": "eligible_for_cm_top_level_page"
                }
            }, {})
        }, e.prototype.teamNamespacesListContinue = function(e) {
            return this.teamRoutes().rpc("namespaces/list/continue", {
                cursor: e,
                filter: {
                    ".tag": "eligible_for_cm_top_level_page"
                }
            }, {})
        }, e.prototype.teamFolderRename = function(e, t) {
            return this.teamRoutes().rpc("team_folder/rename", {
                team_folder_id: String(e),
                name: t
            }, {})
        }, e.prototype.teamFolderPermanentlyDelete = function(e) {
            return this.teamRoutes().rpc("team_folder/permanently_delete", {
                team_folder_id: String(e)
            }, {})
        }, e.prototype.teamIntegrationSettings = function() {
            return this.teamRoutes().rpc("integrations/get_team_integration_settings", void 0, {})
        }, e.prototype.setGroupsCreationPolicy = function(e) {
            return this.teamRoutes().rpc("groups/set_creation_policy", {
                group_creation: e
            }, {})
        }, e.prototype.setNTSBlockTrafficPolicy = function(e) {
            return this.teamRoutes().rpc("nts/set_block_traffic_policy", {
                block_traffic_enabled: e
            }, {})
        }, e.prototype.setSyncPolicy = function(e, t) {
            return void 0 === t && (t = void 0), this.teamRoutes().rpc("set_infinite_policy", {
                setting: e,
                admin_sync_defaults_enabled: t
            }, {})
        }, e.prototype.configureSsoAndGoogleLoginPolicy = function(e, t, n, r, s, o) {
            return this.teamRoutes().rpc("configure_sso_and_google_login_policy", {
                sso_policy: e,
                sign_in_url: t,
                sign_out_url: n,
                saml_cert: r,
                saml_nameid_format: s,
                google_login_enabled: o
            }, {})
        }, e.prototype.configureSso = function(e, t, n, r, s) {
            return this.teamRoutes().rpc("configure_sso", {
                sso_policy: e,
                saml_cert: t,
                sign_in_url: n,
                sign_out_url: r,
                nameid_format: s
            }, {})
        }, e.prototype.configureDirectoryRestrictions = function(e) {
            var t = {
                users_to_add: e.users_to_add,
                users_to_remove: e.users_to_remove
            };
            return this.teamRoutes().rpc("directory_restrictions/configure_settings", t, {})
        }, e.prototype.configureGoogleLoginPolicy = function(e) {
            return this.teamRoutes().rpc("configure_google_login_policy", {
                google_login_enabled: e
            }, {})
        }, e.prototype.setResellerSupportSetting = function(e) {
            return this.teamRoutes().rpc("change_reseller_support", {
                reseller_support_enabled: e
            }, {})
        }, e.prototype.folderCreate = function(e, t, n) {
            "/" !== t && (t += "/");
            var r = "ns:" + e + t + n;
            return this.filesRoutes().rpc("create_folder", {
                path: r
            }, this.selectAdminParams)
        }, e.prototype.bulkFileDelete = function(e) {
            for (var t = [], n = null, r = 0, s = e.length; r < s; r++) n = e[r], t.push({
                path: "ns:" + n.ns_id + n.ns_path
            });
            return this.filesRoutes().rpc("delete_batch_with_changeset_sync", {
                entries: t
            }, this.selectAdminParams)
        }, e.prototype.fileRename = function(e, t, n) {
            var r = "ns:" + e + t,
                s = "ns:" + e + (t.substring(0, t.lastIndexOf("/")) + "/" + n);
            return this.filesRoutes().rpc("move", {
                from_path: r,
                to_path: s,
                autorename: !0
            }, this.selectAdminParams)
        }, e.prototype.userUiInfo = function(e) {
            return this.usersRoutes().rpc("get_user_ui_info", {
                user_id: e
            }, {})
        }, e.prototype.shareFolder = function(e, t, r, s) {
            void 0 === r && (r = null), void 0 === s && (s = !1);
            var o = "ns:" + e + t,
                i = n.__assign(n.__assign({}, a.combinedPolicyDiffToApi(r)), {
                    confidentiality: s ? "confidential" : "not_confidential",
                    path: o
                });
            return this.sharingRoutes().rpc("alpha/share_folder", i, this.selectAdminParams)
        }, e.prototype.validateFolderPath = function(e, t, n, r) {
            var s = "ns:" + e + t;
            return this.sharingRoutes().rpc("validate_folder_path", {
                path: s,
                actions: n,
                list_members_arg: r
            }, this.selectAdminParams)
        }, e.prototype.restoreFile = function(e, t, n) {
            var r = "ns:" + e + t;
            return this.filesRoutes().rpc("restore", {
                path: r,
                rev: n
            }, this.selectAdminParams)
        }, e.prototype.restorePaths = function(e) {
            for (var t, n = [], r = 0, s = e; r < s.length; r++) {
                var o = s[r];
                t = "ns:" + o.ns_id + o.ns_path, n.push(t)
            }
            return this.filesRoutes().rpc("restore_path_batch_sync", {
                entries: n
            }, this.selectAdminParams)
        }, e.prototype.permanentDeleteFile = function(e, t) {
            var n = "ns:" + e + t;
            return this.filesRoutes().rpc("permanently_delete", {
                path: n
            }, this.selectAdminParams)
        }, e.prototype.listRevisions = function(e, t) {
            var n = "ns:" + e + t;
            return this.filesRoutes().rpc("list_revisions", {
                path: n
            }, this.selectAdminParams)
        }, e.prototype.setTSDWritePolicy = function(e) {
            return this.teamRoutes().rpc("team_folder/set_tsd_writable_setting", {
                is_writable: e
            }, {})
        }, e.prototype.setInfinitePolicy = function(e) {
            return this.teamRoutes().rpc("set_infinite_policy", {
                setting: e
            }, {})
        }, e.prototype.setSmartSyncDesktopPolicy = function(e) {
            return this.teamRoutes().rpc("set_smart_sync_desktop_policy", {
                setting: e
            }, {})
        }, e.prototype.getTeamFolderNsPathForFile = function(e) {
            return this.isCMForCDM ? e.fq_path : "/" + e.fq_path.split("/").slice(2).join("/")
        }, e.prototype.bulkFileMove = function(e, t, n, r, s) {
            void 0 === s && (s = null);
            for (var o, a, l = [], u = 0, c = n; u < c.length; u++) {
                var d = c[u];
                a = this.getTeamFolderNsPathForFile(d), o = i.filename(d.fq_path), l.push({
                    from_path: "ns:" + e + a,
                    to_path: "ns:" + t + r + "/" + o
                })
            }
            return this.filesRoutes().rpc("move_batch_sync", {
                entries: l,
                autorename: !0,
                fsw_request: s
            }, this.selectAdminParams)
        }, e.prototype.bulkFileCopy = function(e, t, n, r, s) {
            void 0 === s && (s = null);
            for (var o, a, l = [], u = 0, c = n; u < c.length; u++) {
                var d = c[u];
                a = this.getTeamFolderNsPathForFile(d), o = i.filename(d.fq_path), l.push({
                    from_path: "ns:" + e + a,
                    to_path: "ns:" + t + r + "/" + o
                })
            }
            return this.filesRoutes().rpc("copy_batch_sync", {
                entries: l,
                autorename: !0,
                allow_shared_folder: !0,
                fsw_request: s
            }, this.selectAdminParams)
        }, e.prototype.setMemberSpaceLimits = function(e) {
            return this.teamRoutes().rpc("member_space_limits/set_default_limit", {
                limit_level: e
            }, {})
        }, e.prototype.setMslCapsType = function(e) {
            return this.teamRoutes().rpc("member_space_limits/set_caps_type", {
                caps_type: e
            }, {})
        }, e.prototype.setCustomQuota = function(e, t) {
            return this.teamRoutes().rpc("member_space_limits/set_custom_quota", {
                users_and_quotas: [{
                    user: this._create_user_selector_json(e),
                    quota_gb: t
                }]
            }, {})
        }, e.prototype.removeCustomQuota = function(e) {
            return this.teamRoutes().rpc("member_space_limits/remove_custom_quota", {
                users: [this._create_user_selector_json(e)]
            }, {})
        }, e.prototype._create_user_selector_json = function(e) {
            return {
                ".tag": "email",
                email: e
            }
        }, e.prototype.make_user_selector_list = function(e) {
            return void 0 === e && (e = []), e.map(this._create_user_selector_json)
        }, e.prototype.memberSpaceLimitsUpdateExclusionList = function(e) {
            var t = this.make_user_selector_list(e.users_to_add),
                n = this.make_user_selector_list(e.users_to_remove);
            return this.teamRoutes().rpc("member_space_limits/update_excluded_users", {
                users_to_add: t,
                users_to_remove: n
            }, {})
        }, e.prototype.getUserInfos = function(e) {
            return this.usersRoutes().rpc("get_account_batch", {
                account_ids: e
            }, this.selectAdminParams)
        }, e.prototype.emmConfigureSettings = function(e, t) {
            var n = {
                users_to_add: this.make_user_selector_list(t.users_to_add),
                users_to_remove: this.make_user_selector_list(t.users_to_remove)
            };
            return this.teamRoutes().rpc("emm/configure_settings", {
                emm_policy: {
                    ".tag": e
                },
                exclusion_list: n
            }, {})
        }, e.prototype.twofaConfigureSettings = function(e, t) {
            var n = {
                users_to_add: this.make_user_selector_list(t.users_to_add),
                users_to_remove: this.make_user_selector_list(t.users_to_remove)
            };
            return this.teamRoutes().rpc("two_step_verification/configure_settings", {
                tfa_policy: {
                    ".tag": e
                },
                exclusion_list: n
            }, {})
        }, e.prototype.twofaSendReminders = function() {
            return this.teamRoutes().rpc("two_step_verification/send_a_reminder", void 0, {})
        }, e.prototype.sharingWhitelistConfigureSettings = function(e) {
            var t = {
                subjects_to_add: e.subjects_to_add,
                subjects_to_remove: e.subjects_to_remove
            };
            return this.teamRoutes().rpc("sharing_whitelist/update", t, {})
        }, e.prototype.emmRefreshToken = function() {
            return this.teamRoutes().rpc("emm/refresh_token", void 0, {})
        }, e.prototype.emmGenerateUsageReport = function() {
            return this.teamRoutes().rpc("emm/generate_report", {
                report_type: {
                    ".tag": "mobile_app_usage"
                }
            }, {})
        }, e.prototype.teamContentGetMetadata = function(e) {
            return this.teamRoutes().rpc("team_content/get_metadata", e, {})
        }, e.prototype.createLegalHoldPolicy = function(e) {
            return this.teamRoutes().rpc("legal_holds/create", e, {})
        }, e.prototype.updateLegalHoldPolicy = function(e) {
            return this.teamRoutes().rpc("legal_holds/update", e, {})
        }, e.prototype.legalHoldCreateExport = function(e) {
            return this.teamRoutes().rpc("legal_holds/export_v2", e, {})
        }, e.prototype.releaseLegalHoldPolicy = function(e) {
            return this.teamRoutes().rpc("legal_holds/release", e, {})
        }, e.prototype.getLegalHoldPolicy = function(e) {
            return this.teamRoutes().rpc("legal_holds/get", e, {})
        }, e.prototype.listLegalHoldPolicies = function() {
            return this.teamRoutes().rpc("legal_holds/list", void 0, {})
        }, e.prototype.listLegalHoldExports = function(e) {
            return this.teamRoutes().rpc("legal_holds/list_exports", e, {})
        }, e.prototype.cancelLegalHoldExport = function(e) {
            var t = e.legalHoldId,
                n = e.exportId;
            return this.teamRoutes().rpc("legal_holds/export/update", {
                legal_hold_id: t,
                export_id: n,
                status: {
                    ".tag": "canceled"
                }
            }, {})
        }, e.prototype.removeLegalHoldExport = function(e) {
            var t = e.legalHoldId,
                n = e.exportId;
            return this.teamRoutes().rpc("legal_holds/export/update", {
                legal_hold_id: t,
                export_id: n,
                status: {
                    ".tag": "removed"
                }
            }, {})
        }, e.prototype.getExportDownloadsMetadata = function(e) {
            var t = e.legalHoldId,
                n = e.exportId;
            return this.teamRoutes().rpc("legal_holds/export/downloads/metadata", {
                id: t,
                export_id: n
            }, {})
        }, e.prototype.sendExportDownloadsLogging = function(e) {
            return this.teamRoutes().rpc("legal_holds/export/downloads/logging", e, {})
        }, e.prototype.getLegalHoldInfoz = function(e) {
            return this.teamRoutes().rpc("legal_holds/infoz", e, {})
        }, e.prototype.validateMemberImportCsv = function(e) {
            return this.teamRoutes().rpc("members/validate_import_csv", {
                csv_file_content: e
            }, {})
        }, e.prototype.checkImportMembersCsvValidationJobStatus = function(e) {
            return this.teamRoutes().rpc("members/validate_import_csv/job_status/check", {
                async_job_id: e
            }, {})
        }, e.prototype.checkImportMembersJobStatus = function(e) {
            return this.teamRoutes().rpc("members/import_from_csv/job_status/check", {
                async_job_id: e
            }, {})
        }, e.prototype.importMembersFromCsv = function(e) {
            return this.teamRoutes().rpc("members/import_from_csv", {
                csv_file_content: e
            }, {})
        }, e.prototype.changeAALOnDomain = function(e, t) {
            return this.domainRoutes().rpc("change_aal_configuration", {
                domain_name: e,
                is_enabled: t
            }, {})
        }, e.prototype.unlockUser = function(e) {
            return this.teamRoutes().rpc("members/unlock", {
                account_id: e
            }, {})
        }, e
    })();
    t.AdminConsoleApiClient = u, t.default = u
})), define("modules/clean/tokenizer", ["require", "exports", "tslib", "classnames", "create-react-class", "react", "react-dom", "react-dom-factories", "prop-types", "external/lodash", "jquery", "modules/clean/keycode", "modules/clean/typeahead"], (function(e, t, n, r, s, o, i, a, l, u, c, d, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s), o = n.__importDefault(o), i = n.__importStar(i), a = n.__importStar(a), l = n.__importStar(l), u = n.__importStar(u), c = n.__importDefault(c);
    var h = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t._makeCloseButton = function() {
                return t.props.onRemove ? a.span({
                    className: "tokenizer-token-close",
                    onClick: function() {
                        return t.props.onRemove(), !1
                    },
                    dangerouslySetInnerHTML: {
                        __html: "&nbsp;"
                    }
                }) : ""
            }, t
        }
        return n.__extends(t, e), t.prototype.render = function() {
            var e = {
                "tokenizer-token": !0
            };
            return e[this.props.className] = !0, a.a(c.default.extend({
                tabIndex: -1
            }, this.props, {
                className: r.default(e)
            }), String(this.props.data), this._makeCloseButton())
        }, t.displayName = "Token", t.propTypes = {
            className: l.string,
            data: l.any,
            onRemove: l.func
        }, t
    })(o.default.Component);
    t.Token = h;
    var _ = s.default({
        displayName: "Tokenizer",
        propTypes: {
            customClass: l.string,
            dataSource: l.object.isRequired,
            initialInputText: l.string,
            logSearchBegin: l.func,
            logSearchComplete: l.func,
            logTokenChangeEvent: l.func,
            onContentsChange: l.func,
            onTokensAdd: l.func,
            onTokenRemove: l.func,
            placeholderText: l.string,
            populatedTokenData: l.array,
            renderToken: l.func.isRequired,
            renderTokenHover: l.func,
            renderInput: l.func.isRequired,
            renderSelector: l.func.isRequired,
            stringTokenizer: l.func.isRequired,
            tokenSpacing: l.number,
            focusOnMount: l.bool,
            tabIndex: l.number,
            disableAdditionalInput: l.bool,
            disabled: l.bool,
            resetTokenData: l.bool,
            tokenizeOnOutOfFocus: l.bool
        },
        getDefaultProps: function() {
            return {
                initialInputText: "",
                renderInput: function() {
                    return a.input()
                },
                renderSelector: function() {
                    return o.default.createElement(p.TypeaheadSelector, null)
                },
                renderToken: function(e) {
                    return o.default.createElement(h, {
                        data: e
                    })
                },
                stringTokenizer: function(e, t) {
                    var n = e.split(","),
                        r = t ? "" : n.pop();
                    return {
                        tokens: n,
                        value: r
                    }
                },
                tokenSpacing: 3,
                focusOnMount: !1,
                logSearchBegin: null,
                logSearchComplete: null,
                disableAdditionalInput: !1,
                disabled: !1,
                resetTokenData: !1,
                tokenizeOnOutOfFocus: !1
            }
        },
        getInitialState: function() {
            return this.tokenData = [], this.queryResults = null, {
                queryResults: this.queryResults,
                tokenData: this.tokenData,
                selectedTokenIndex: null,
                inputWidth: 150,
                numLines: 1
            }
        },
        componentDidMount: function() {
            var e = this;
            if (setTimeout(this._resizeTokenizerInput, 0), i.findDOMNode(this.refs.input).value = this.props.initialInputText, c.default(i.findDOMNode(this.refs.tokenizer_input)).on("keydown", this._proxyKeys), this.tokenizeOnOutOfFocus && c.default(i.findDOMNode(this.refs.tokenizer_input)).on("focusout", this._tokenizeIfHasInput), document.addEventListener("click", this._handleDocumentClick, !1), this.props.focusOnMount && setTimeout((function() {
                    return i.findDOMNode(e.refs.input).focus()
                })), "function" == typeof this.props.dataSource.registerForUpdates && this.props.dataSource.registerForUpdates(this._dataUpdatedCallback), this.props.populatedTokenData && this.props.populatedTokenData.length) return this._addTokens(this.props.populatedTokenData, !1, null)
        },
        componentWillUnmount: function() {
            return c.default(i.findDOMNode(this.refs.tokenizer_input)).off("keydown", this._proxyKeys), document.removeEventListener("click", this._handleDocumentClick, !1)
        },
        componentDidUpdate: function(e, t) {
            var n = this.props,
                r = n.populatedTokenData;
            return n.resetTokenData && !e.resetTokenData && 0 !== this.tokenData.length && this.removeTokens(this.tokenData), (null != r ? r.length : void 0) !== (null != e.populatedTokenData ? e.populatedTokenData.length : void 0) && (r.length > e.populatedTokenData.length ? this._addTokens(r, !1, null) : r.length < e.populatedTokenData.length && (this.removeTokens(this.tokenData), this._addTokens(r))), this._resizeTokenizerInput()
        },
        render: function() {
            var e = {
                "react-tokenizer": !0
            };
            null != this.props.customClass && (e[this.props.customClass] = null != this.props.customClass);
            var t = {
                    padding: this.props.tokenSpacing,
                    paddingRight: 0,
                    maxHeight: this.props.tokenSpacing + 3 * (this.props.tokenSpacing + 29) + 14 + 2
                },
                n = r.default({
                    "tokenizer-input": !0,
                    "tokenizer-input-disabled": this.props.disabled,
                    "tokenizer-input-additionalInputDisabled": this.props.disableAdditionalInput
                });
            return this.state.numLines > 3 && (t.overflowY = "auto", t.overflowX = "visible"), a.div({
                onClick: this._handleMyClick,
                className: r.default(e)
            }, a.div({
                className: n,
                ref: "tokenizer_input",
                style: t
            }, a.div({
                className: "token-container",
                style: {
                    marginLeft: -this.props.tokenSpacing,
                    marginBottom: -this.props.tokenSpacing
                }
            }, this._renderTokens(), this._renderInput())), this._renderSelector())
        },
        getInputValue: function() {
            return i.findDOMNode(this.refs.input).value
        },
        serializeInputData: function() {
            return {
                tokens: this.tokenData,
                value: this.getInputValue()
            }
        },
        tokenizeAll: function() {
            var e = i.findDOMNode(this.refs.input),
                t = this.props.stringTokenizer(e.value, !0).tokens;
            return t.length > 0 && this._addTokens(t, !1), e.value = "", this.refs.selector.close()
        },
        addExternalTokens: function(e) {
            this._addTokens(e, !1, null), this.refs.selector.close()
        },
        _getCurrentValue: function() {
            var e = i.findDOMNode(this.refs.input);
            return this.props.stringTokenizer(e.value).value
        },
        queryDataSource: function(e) {
            var t = this,
                n = function(n) {
                    var r;
                    e || (n = null);
                    var s = function(e) {
                            return ("function" == typeof e.getKey ? e.getKey() : void 0) || String(e)
                        },
                        o = u.map(t.tokenData, s);
                    return n = null != n ? n.filter((function(e) {
                        return r = s(e), !Array.from(o).includes(r)
                    })) : null
                };
            return this.props.dataSource.query(e, (function(r) {
                return r = n(r), t.queryResults = r, t.setState({
                    queryResults: t.queryResults
                }), "function" == typeof t.props.logSearchComplete ? t.props.logSearchComplete(e, (null != r ? r.length : void 0) || 0, !0) : void 0
            }), (function(r) {
                return e === t._getCurrentValue() && (r = n(r)) && r.length && (t.queryResults = t.queryResults ? t.queryResults.concat(r) : r, t.setState({
                    queryResults: t.queryResults
                })), "function" == typeof t.props.logSearchComplete ? t.props.logSearchComplete(e, (null != r ? r.length : void 0) || 0, !1) : void 0
            }))
        },
        _dataUpdatedCallback: function() {
            if (this.isMounted()) {
                var e = Boolean(this.state.queryResults);
                return t = this.refs.selector, n = "reset", r = function(e) {
                    return e.reset()
                }, null != t && "function" == typeof t[n] && r(t, n), e && i.findDOMNode(this.refs.input).focus(), this.queryDataSource(this.getInputValue())
            }
            var t, n, r
        },
        _addTokens: function(e, t, n) {
            var r, s = this;
            void 0 === t && (t = !1), void 0 === n && (n = null);
            for (var o = function(e) {
                    return ("function" == typeof e.getKey ? e.getKey() : void 0) || String(e)
                }, a = u.map(this.tokenData, o), l = [], c = 0, d = Array.from(e); c < d.length; c++) {
                var p = d[c],
                    h = o(p);
                Array.from(a).includes(h) || (l.push(p), a.push(h))
            }
            this.tokenData = this.tokenData.concat(l), this.setState({
                tokenData: this.tokenData
            }), "function" == typeof this.props.onTokensAdd && this.props.onTokensAdd(l, this), "function" == typeof this.props.onContentsChange && this.props.onContentsChange(this.tokenData, null === (r = i.findDOMNode(this.refs.input)) || void 0 === r ? void 0 : r.value);
            var _ = t ? {
                search_expr: n,
                selected_pos: (null != this.refs.selector ? this.refs.selector.state.selectionIndex : void 0) || 0,
                num_query_results: null != this.state.queryResults ? this.state.queryResults.length : void 0,
                did_select_suggestion: !0
            } : {
                did_select_suggestion: !1
            };
            return (function() {
                for (var e = [], t = 0, n = Array.from(l); t < n.length; t++) {
                    var r = n[t];
                    e.push("function" == typeof s.props.logTokenChangeEvent ? s.props.logTokenChangeEvent(r, !1, _) : void 0)
                }
                return e
            })()
        },
        _addToken: function(e, t, n) {
            return void 0 === t && (t = !1), void 0 === n && (n = null), this._addTokens([e], t, n)
        },
        removeTokens: function(e) {
            for (var t = this.state.selectedTokenIndex, n = [], r = 0, s = Array.from(e); r < s.length; r++) {
                var o = s[r],
                    a = this.tokenData.indexOf(o); - 1 !== a && (t === a ? t = null : t > a && (t -= 1), this.tokenData.splice(a, 1), n.push(o))
            }
            var l = i.findDOMNode(this.refs.input);
            l.focus(), this._setSelectedToken(t), this.queryResults = null, this.setState({
                tokenData: this.tokenData,
                queryResults: this.queryResults
            });
            for (var u = 0, c = Array.from(n); u < c.length; u++) {
                o = c[u];
                "function" == typeof this.props.onTokenRemove && this.props.onTokenRemove(o)
            }
            for (var d = 0, p = Array.from(n); d < p.length; d++) {
                o = p[d];
                "function" == typeof this.props.logTokenChangeEvent && this.props.logTokenChangeEvent(o, !0)
            }
            return "function" == typeof this.props.onContentsChange ? this.props.onContentsChange(this.tokenData, l.value) : void 0
        },
        removeToken: function(e) {
            return this.removeTokens([e])
        },
        replaceTokens: function(e) {
            var t, n = function(e) {
                return ("function" == typeof e.getKey ? e.getKey() : void 0) || String(e)
            };
            if (e.length !== this.tokenData.length || !u.every(u.zip(this.tokenData, e), (function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var r = Array.from(e[0]),
                        s = r[0],
                        o = r[1];
                    return n(s) === n(o)
                }))) return this.tokenData = e, this.setState({
                tokenData: e
            }), "function" == typeof this.props.onContentsChange ? this.props.onContentsChange(this.tokenData, null === (t = i.findDOMNode(this.refs.input)) || void 0 === t ? void 0 : t.value) : void 0
        },
        _renderTokens: function() {
            for (var e = [], t = function(e) {
                    return ("function" == typeof e.getKey ? e.getKey() : void 0) || String(e)
                }, n = 0; n < this.state.tokenData.length; n++) {
                var s = this.state.tokenData[n],
                    i = this.props.renderToken(s),
                    a = this.state.selectedTokenIndex === n,
                    l = "function" == typeof this.props.renderTokenHover ? this.props.renderTokenHover(s) : void 0,
                    u = [{
                        selected: a,
                        "c-title-bubble": null != l,
                        "c-title-bubble--s": null != l
                    }];
                e.push(o.default.cloneElement(i, {
                    ref: "token" + n,
                    key: "token" + t(s),
                    style: {
                        margin: "0 0 " + this.props.tokenSpacing + "px " + this.props.tokenSpacing + "px"
                    },
                    className: r.default(u, i.props.className),
                    "data-title": l,
                    onClick: this._setSelectedToken.bind(this, n),
                    onRemove: this.removeToken.bind(this, s),
                    tokenSpacing: this.props.tokenSpacing
                }))
            }
            return e
        },
        _renderSelector: function() {
            return o.default.cloneElement(this.props.renderSelector(), {
                ref: "selector",
                queryOptions: this.state.queryResults,
                onSelect: this._onSelect,
                onClose: this._clearResults
            })
        },
        _renderInput: function() {
            var e = this.state.tokenData.length ? "" : this.props.placeholderText;
            return o.default.cloneElement(this.props.renderInput(), {
                ref: "input",
                style: {
                    width: this.state.inputWidth,
                    marginLeft: this.props.tokenSpacing,
                    marginBottom: this.props.tokenSpacing
                },
                onChange: this._textUpdated,
                placeholder: e,
                tabIndex: this.props.tabIndex,
                onClick: this._setSelectedToken.bind(this, null),
                disabled: this.props.disabled || this.props.disableAdditionalInput
            })
        },
        _getTokenizerInput: function() {
            return this.refs.tokenizer_input
        },
        _getTokenComponents: function() {
            var e = this;
            return (function(e, t, n) {
                for (var r = [], s = e < t, o = n ? s ? t + 1 : t - 1 : t, i = e; s ? i < o : i > o; s ? i++ : i--) r.push(i);
                return r
            })(0, this.state.tokenData.length, !1).map((function(t) {
                return e.refs["token" + t]
            })).filter((function(e) {
                return e
            }))
        },
        _setSelectedToken: function(e) {
            return null != e ? (i.findDOMNode(this.refs["token" + e]).focus(), this.refs.selector.close()) : i.findDOMNode(this.refs.input).focus(), this.setState({
                selectedTokenIndex: e
            })
        },
        _resizeTokenizerInput: function() {
            var e = function(e) {
                    var t;
                    return null === (t = i.findDOMNode(e)) || void 0 === t ? void 0 : t.clientWidth
                },
                t = e(this._getTokenizerInput());
            if (null != t) {
                for (var n = this.props.tokenSpacing + 2, r = this.props.tokenSpacing, s = 0, o = this._getTokenComponents(), a = 1, l = 0, u = Array.from(o); l < u.length; l++) {
                    var c = e(u[l]) + n;
                    s + c + r > t && (a += 1, s = 0), s += c
                }
                var d = t - s - r - 2;
                return d < 80 && (a += 1, d = t - r), d !== this.state.inputWidth && this.setState({
                    inputWidth: d
                }), a !== this.state.numLines ? this.setState({
                    numLines: a
                }) : void 0
            }
        },
        _onSelect: function(e) {
            var t = i.findDOMNode(this.refs.input);
            return t.focus(), this._addToken(e, !0, t.value), t.value = "", this.queryResults = null, this.setState({
                queryResults: this.queryResults
            })
        },
        _handleMyClick: function(e) {
            return "function" == typeof e.nativeEvent.stopImmediatePropagation ? e.nativeEvent.stopImmediatePropagation() : void 0
        },
        _handleDocumentClick: function(e) {
            return this.refs.selector.close()
        },
        _proxyKeys: function(e) {
            if (e.keyCode === d.KeyCode.BACKSPACE && "" === this._getCurrentValue() && e.preventDefault(), this._shouldListenForTokenNavigation()) {
                var t = this.state.selectedTokenIndex;
                switch (e.keyCode) {
                    case d.KeyCode.BACKSPACE:
                        return void(null === t ? (this._setSelectedToken(this.state.tokenData.length - 1), i.findDOMNode(this.refs.input).focus()) : this.removeToken(this.state.tokenData[t]));
                    case d.KeyCode.LEFT:
                        return void(null === t ? this._setSelectedToken(this.state.tokenData.length - 1) : t > 0 && this._setSelectedToken(t - 1));
                    case d.KeyCode.RIGHT:
                        if (null !== t) return void(t >= this.state.tokenData.length - 1 ? this._setSelectedToken(null) : this._setSelectedToken(t + 1));
                        break;
                    case d.KeyCode.DELETE:
                        if (null !== t) return void this.removeToken(this.state.tokenData[t])
                }
            }
            this.refs.selector.onKeyDown(e), e.isDefaultPrevented() || e.keyCode === d.KeyCode.TAB && "" !== this.getInputValue() && this.tokenizeAll()
        },
        _tokenizeIfHasInput: function(e) {
            if ("" !== this.getInputValue()) return this.tokenizeAll(), e.preventDefault()
        },
        _shouldListenForTokenNavigation: function() {
            if (!this.state.tokenData.length) return !1;
            var e = i.findDOMNode(this.refs.input);
            return 0 === e.selectionStart && 0 === e.selectionEnd
        },
        _textUpdated: function(e) {
            var t = i.findDOMNode(this.refs.input),
                n = e.target.value,
                r = this.props.stringTokenizer(n),
                s = r.tokens,
                o = r.value;
            return "function" == typeof this.props.logSearchBegin && this.props.logSearchBegin(o), o !== n && (t.value = o, o || this.refs.selector.close()), s.length > 0 ? this._addTokens(s, !1) : "function" == typeof this.props.onContentsChange && this.props.onContentsChange(this.tokenData, o), this.queryDataSource(o)
        },
        _clearResults: function() {
            return this.queryResults = null, this.setState({
                queryResults: this.queryResults
            })
        }
    });
    t.Tokenizer = _
})), define("modules/clean/typeahead", ["require", "exports", "tslib", "classnames", "create-react-class", "react", "react-dom-factories", "react-dom", "prop-types", "external/lodash", "modules/clean/fuzzy", "modules/clean/keycode"], (function(e, t, n, r, s, o, i, a, l, u, c, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = n.__importDefault(r), s = n.__importDefault(s), o = n.__importDefault(o), i = n.__importStar(i), a = n.__importStar(a), l = n.__importStar(l), u = n.__importStar(u), c = n.__importDefault(c);
    var p = (function() {
        function e(e) {
            var t = (void 0 === e ? {} : e).local;
            this.local = t
        }
        return e.prototype.filterAndSort = function(e) {
            return c.default.filter(e, this.local)
        }, e.prototype.query = function(e, t) {
            return t(u.map(this.filterAndSort(e), (function(e) {
                return e.original
            })))
        }, e
    })();
    t.DataSource = p;
    var h = {
        getInitialState: function() {
            return {
                selectionIndex: 0
            }
        },
        getOptions: function() {
            if (!this.props.queryOptions) return [];
            var e = this.props.maxVisible || this.props.queryOptions.length;
            return this.props.queryOptions.slice(0, e)
        },
        renderOptions: function() {
            for (var e = [], t = this.getOptions(), n = function(e) {
                    return ("function" == typeof e.getKey ? e.getKey() : void 0) || String(e)
                }, s = 0; s < t.length; s++) {
                var i = t[s],
                    a = {
                        selected: this.state.selectionIndex === s,
                        "typeahead-option": !0,
                        "u-pad-xs": !0
                    },
                    l = this.renderOption(i);
                e.push(o.default.cloneElement(l, {
                    className: r.default(a, l.props.className),
                    key: "option" + n(i),
                    onMouseEnter: this._hover.bind(this, s),
                    onClick: this.onSelect.bind(this, i)
                }))
            }
            return e
        },
        onSelect: function(e) {
            return this.props.onSelect(e), this.reset()
        },
        renderOption: function(e) {
            return this.props.renderQueryOption(e)
        },
        onKeyDown: function(e) {
            switch (e.keyCode) {
                case d.KeyCode.UP:
                    return this._navigate(-1), e.preventDefault();
                case d.KeyCode.DOWN:
                    return this._navigate(1), e.preventDefault();
                case d.KeyCode.ENTER:
                    return this._selectSelectionIndex(e);
                case d.KeyCode.ESC:
                    if (Boolean(this.props.queryOptions)) return this.close(), e.preventDefault();
                    break;
                case d.KeyCode.TAB:
                    return this._selectSelectionIndex(e);
                default:
                    return this.reset()
            }
        },
        _selectSelectionIndex: function(e) {
            var t = this.getOptions();
            if (t.length) {
                var n = this.state.selectionIndex;
                if (-1 !== n) return this.onSelect(t[n]), e.preventDefault()
            }
        },
        reset: function() {
            return this._changeSelectionIndex(0)
        },
        close: function() {
            return "function" == typeof this.props.onClose && this.props.onClose(), this.reset()
        },
        _hover: function(e) {
            return this._changeSelectionIndex(e)
        },
        _navigate: function(e) {
            var t = this.getOptions().length;
            if (t) {
                var n = this.state.selectionIndex + e,
                    r = t + 1;
                return n < -1 ? n += r : n >= t && (n -= r), this._changeSelectionIndex(n)
            }
        },
        _changeSelectionIndex: function(e) {
            return e !== this.state.selectionIndex && "function" == typeof this.onSelectionIndexChange && this.onSelectionIndexChange(e), this.setState({
                selectionIndex: e
            })
        }
    };
    t.TypeaheadSelectorMixin = h;
    var _ = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = {
                queryResults: null,
                value: t.props.value,
                focus: !1
            }, t._onMouseOver = function() {
                return t.setState({
                    focus: !0
                })
            }, t._onMouseLeave = function() {
                return t.setState({
                    focus: !1
                })
            }, t._onBlur = function() {
                if (t.props.onBlur(), !t.state.focus) return t._clearResults()
            }, t._onFocus = function() {
                return t._queryDataSource(t.state.value), t.refs.selector.reset()
            }, t._renderInput = function() {
                var e = t.props.renderInput();
                return o.default.cloneElement(e, {
                    ref: "input",
                    onChange: function(n) {
                        return null != e.props.onChange && e.props.onChange(n), t._inputChanged(n)
                    },
                    onKeyDown: function(n) {
                        return null != e.props.onKeyDown && e.props.onKeyDown(n), t._proxyKeys(n)
                    },
                    onBlur: function(n) {
                        return null != e.props.onBlur && e.props.onBlur(n), t._onBlur(n)
                    },
                    onFocus: function(n) {
                        return null != e.props.onFocus && e.props.onFocus(n), t._onFocus(n)
                    },
                    placeholder: t.props.placeholder,
                    value: t.state.value,
                    name: t.props.name,
                    autoComplete: "off",
                    disabled: t.props.disabled
                })
            }, t._renderSelector = function() {
                return o.default.cloneElement(t.props.renderSelector(), {
                    ref: "selector",
                    queryOptions: t.state.queryResults,
                    onSelect: t._autocomplete,
                    onClose: t._clearResults,
                    maxVisible: t.props.maxVisible
                })
            }, t._inputChanged = function(e) {
                var n = e.target.value;
                return t.setState({
                    value: e.target.value
                }), t.props.onChange(n), t._queryDataSource(n), t.refs.selector.reset()
            }, t._getCurrentValue = function() {
                return a.findDOMNode(t.refs.input).value
            }, t._queryDataSource = function(e) {
                var n = function(e) {
                    return t.queryResults = e, t.setState({
                        queryResults: t.queryResults
                    })
                };
                return t.props.dataSource.query(e, n, (function(r) {
                    if (e === t._getCurrentValue() && r && r.length) {
                        var s = t.queryResults ? t.queryResults.concat(r) : r;
                        return n(s)
                    }
                }))
            }, t._proxyKeys = function(e) {
                return t.refs.selector.onKeyDown(e)
            }, t._autocomplete = function(e) {
                return a.findDOMNode(t.refs.input).focus(), e = t.props.renderCompletionText(e), t.setState({
                    value: e
                }), t.props.onSelect(e), t._clearResults()
            }, t._clearResults = function() {
                return t.queryResults = null, t.setState({
                    queryResults: t.queryResults
                })
            }, t
        }
        return n.__extends(t, e), t.prototype.render = function() {
            var e = {};
            return e[this.props.customClass] = null != this.props.customClass, i.div({
                className: r.default(e),
                onMouseOver: this._onMouseOver,
                onMouseLeave: this._onMouseLeave
            }, this._renderInput(), this._renderSelector())
        }, t.prototype.componentWillReceiveProps = function(e) {
            return this.setState({
                value: e.value
            })
        }, t.displayName = "Autocomplete", t.propTypes = {
            customClass: l.string,
            maxVisible: l.number,
            dataSource: l.object.isRequired,
            onBlur: l.func,
            onSelect: l.func,
            onChange: l.func,
            placeholder: l.string,
            renderCompletionText: l.func.isRequired,
            renderInput: l.func.isRequired,
            renderSelector: l.func.isRequired,
            value: l.string,
            name: l.string,
            disabled: l.bool
        }, t.defaultProps = {
            value: "",
            maxVisible: 7,
            onBlur: function() {},
            onSelect: function(e) {},
            onChange: function(e) {},
            renderCompletionText: function(e) {
                return String(e)
            },
            renderInput: function() {
                return i.input()
            },
            renderSelector: function() {
                return o.default.createElement(f, null)
            },
            disabled: !1
        }, t
    })(o.default.Component);
    t.Autocomplete = _;
    var f = s.default({
        displayName: "TypeaheadSelector",
        mixins: [h],
        propTypes: {
            customClass: l.string,
            maxVisible: l.number,
            onClose: l.func.isRequired,
            onSelect: l.func.isRequired,
            queryOptions: l.array,
            renderQueryOption: l.func.isRequired
        },
        getDefaultProps: function() {
            return {
                maxVisible: 7,
                onClose: function() {},
                onSelect: function(e) {},
                renderQueryOption: function(e) {
                    return i.li({}, String(e))
                }
            }
        },
        render: function() {
            if (!this.getOptions().length) return i.div({});
            var e = {
                "typeahead-selector": !0
            };
            return e[this.props.customClass] = null != this.props.customClass, i.ul({
                className: r.default(e)
            }, this.renderOptions())
        }
    });
    t.TypeaheadSelector = f
}));
//# sourceMappingURL=pkg-sharing-core.min.js-vflx8aMUQ.map