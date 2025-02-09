define("modules/clean/flux/base_store", ["require", "exports", "modules/clean/flux/dispatcher", "modules/core/exception"], (function(e, t, o, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, i, s = (r = !1, i = [], o.Dispatcher.dispatch_begin = function() {
            return r = !0
        }, o.Dispatcher.dispatch_end = function() {
            r = !1;
            try {
                return Array.from(i).map((function(e) {
                    return e()
                }))
            } finally {
                i.length = 0
            }
        }, function(e) {
            return r ? Array.from(i).includes(e) ? void 0 : i.push(e) : e()
        }),
        a = (function() {
            function e(e) {
                "function" == typeof this._init && this._init(), this._change_listeners = [], this._dispatcher = e || o.Dispatcher, this.dispatchToken = this._dispatcher.register(this._new_payload_wrapper.bind(this))
            }
            return e.prototype.destructor = function() {
                this._dispatcher.unregister(this.dispatchToken), this.remove_all_change_listeners()
            }, e.prototype.emit_change = function() {
                for (var e = 0, t = this._change_listeners; e < t.length; e++) {
                    var o = t[e];
                    s(o)
                }
            }, e.prototype.add_change_listener = function(e) {
                n.assert(!this._change_listeners.includes(e), "adding duplicate change listener not allowed"), this._change_listeners.push(e)
            }, e.prototype.remove_change_listener = function(e) {
                this._change_listeners = this._change_listeners.filter((function(t) {
                    return t !== e
                }))
            }, e.prototype.remove_all_change_listeners = function() {
                this._change_listeners.length = 0
            }, e.prototype._new_payload_wrapper = function(e) {
                var t, o;
                (null === (o = null === (t = e) || void 0 === t ? void 0 : t.action) || void 0 === o ? void 0 : o.type) === this.constructor.WIPE_TYPE && "function" == typeof this._init && this._init(), this._new_payload(e)
            }, e.prototype._new_payload = function(e) {
                throw new Error("Abstract method - must be implemented")
            }, e.WIPE_TYPE = "WIPE_ALL", e
        })();
    t.Store = a
})), define("modules/clean/downloads", ["require", "exports", "tslib", "jquery", "modules/clean/api_v2/user_client", "modules/clean/filepath", "modules/clean/react/snackbar", "modules/core/browser", "modules/core/browser_detection", "modules/core/exception", "modules/core/html", "modules/core/i18n", "modules/core/notify", "modules/core/uri"], (function(e, t, o, n, r, i, s, a, l, u, d, p, c, _) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), i = o.__importStar(i), a = o.__importStar(a), l = o.__importStar(l);
    var h = ["dl-web.dropbox.com", "dl.dropboxusercontent.com"],
        f = p.intl.formatMessage({
            defaultMessage: "There was an error downloading your file."
        }),
        m = !1,
        b = {};
    t.get = function(e) {
        var t, n = e.url,
            r = e.error,
            i = _.URI.parse(n),
            s = i.getAuthority();
        if (u.assert(h.includes(s) || s.endsWith("dl.dropboxusercontent.com") || "www.dropbox.com" === s, "attempt to download from a non-blockserver domain"), l.iOS) return u.assert(o.__spreadArrays(["", window.location.host], h).includes(i.getAuthority()) || i.getAuthority().endsWith("dl.dropboxusercontent.com"), "blocked attempted download from non-block domain that differs from current domain"), a.unsafeRedirect(n), !1;
        m || w();
        var d = (function() {
            for (var e = "", t = 1; t <= 4; t++) e += String(Math.random()).split(".")[1];
            return e
        })();
        i.updateQuery(((t = {})._download_id = d, t._notify_domain = window.location.host, t));
        return v({
            downloadUri: i,
            downloadId: d,
            error: r,
            downloadDomain: s,
            onLoad: function() {
                setTimeout((function() {
                    var e = b[d];
                    null != e && (l.chrome && (c.Notify.error(f), e.error && e.error()), S(d))
                }), 100)
            }
        }), !1
    };
    var v = function(e) {
        var t = e.downloadUri,
            o = e.downloadId,
            r = e.error,
            i = e.downloadDomain,
            s = e.onLoad,
            a = n.default("<iframe />", {
                src: String(t)
            }).css("display", "none");
        s && a.on("load", s), b[o] = {
            origin: i,
            error: r,
            iframe: a
        }, n.default("body").append(a), window.setTimeout((function() {
            return S(o)
        }), 9e4)
    };
    t.get_blockserver_link = function(e) {
        var o = e.url,
            n = e.ns_id,
            r = e.ns_path,
            i = e.inside_admin_console,
            s = e.legal_hold_export_gid,
            a = e.error,
            l = _.URI.parse(o);
        return l.setScheme("https"), i ? (l.updateQuery({
            dl: "1",
            inside_admin_console: "true"
        }), s && l.updateQuery({
            legal_hold_export_gid: s
        })) : l.updateQuery({
            dl: "1"
        }), null != n && (u.assert("string" == typeof r, "Namespace ID was passed with invalid path, got: " + r), l.updateQuery({
            nsid: String(n),
            path: r
        })), u.assert("dl-web.dropbox.com" === l.getAuthority(), "download_blockserver_url expects a blockserver resource, got: " + o), t.get({
            url: l.toString(),
            error: a
        })
    }, t.zip_batch_by_ns_id = function(e) {
        for (var t, o = e.parent_ns_id, r = e.parent_ns_path, s = e.files, a = e.subject_uid, l = e.block_hash, u = new _.URI({
                scheme: "https",
                authority: "dl-web.dropbox.com",
                path: "/zip_batch_by_ns_id",
                query: (t = {}, t._subject_uid = String(a), t.parent_ns_id = String(o), t.parent_ns_path = r || "/", t)
            }).toString(), d = n.default("<form>", {
                action: u,
                method: "post"
            }), p = 0, c = s; p < c.length; p++) {
            var h = c[p],
                f = r + "/" + i.filename(h.fq_path);
            n.default("<input>", {
                name: "ns_paths",
                value: f
            }).appendTo(d)
        }
        n.default("<input>", {
            name: "w",
            value: l
        }).appendTo(d), n.default(document.body).append(d), d.submit(), d.remove()
    };
    var g = function(e) {
        var t = e.block_hash,
            n = e.fq_paths,
            i = e.parent_path,
            s = e.flat_mode,
            a = e.subjectUserId;
        return o.__awaiter(this, void 0, Promise, (function() {
            return o.__generator(this, (function(e) {
                switch (e.label) {
                    case 0:
                        return e.trys.push([0, 2, , 3]), [4, (new r.UserApiV2Client).ns("browse_zip_downloads").rpc("create_zip_token", {
                            block_hash: t,
                            unnormalized_files: o.__spreadArrays(n),
                            parent_path: i,
                            flat_mode: s
                        }, {
                            subjectUserId: a
                        })];
                    case 1:
                        return [2, {
                            result: e.sent(),
                            isError: !1
                        }];
                    case 2:
                        return e.sent(), [2, {
                            isError: !0,
                            error: {
                                ".tag": "undefined_error"
                            }
                        }];
                    case 3:
                        return [2]
                }
            }))
        }))
    };
    t.get_zip = function(e) {
        var t = e.fq_paths,
            n = e.subject_uid,
            r = e.block_hash,
            i = e.parent_path,
            a = e.flat_zip_mode;
        return o.__awaiter(this, void 0, Promise, (function() {
            var e, l;
            return o.__generator(this, (function(u) {
                switch (u.label) {
                    case 0:
                        return "" === i && (i = "/"), [4, g({
                            block_hash: r,
                            fq_paths: o.__spreadArrays(t),
                            parent_path: i,
                            flat_mode: !!a,
                            subjectUserId: n
                        })];
                    case 1:
                        return (e = u.sent()).isError ? (d = e.error, c = "too_many_files" === d[".tag"] ? p.intl.formatMessage({
                            defaultMessage: "Attempted to zip too many files."
                        }) : "too_much_data" === d[".tag"] ? p.intl.formatMessage({
                            defaultMessage: "Attempted to zip too much data."
                        }) : "file_not_found" === d[".tag"] ? p.intl.formatMessage({
                            defaultMessage: "File not found."
                        }) : "unauthorized_user" === d[".tag"] ? p.intl.formatMessage({
                            defaultMessage: "Unauthorized user."
                        }) : "unauthorized_namespace" === d[".tag"] ? p.intl.formatMessage({
                            defaultMessage: "Unauthorized namespace."
                        }) : p.intl.formatMessage({
                            defaultMessage: "Zip download failed."
                        }), s.Snackbar.fail(c, "zip-download-status")) : (l = e.result.token, y(l)), [2]
                }
                var d, c
            }))
        }))
    };
    var y = function(e) {
        var o = new _.URI({
            scheme: "https",
            authority: "dl-web.dropbox.com",
            path: "/zip_download_get/" + e
        }).toString();
        t.get({
            url: o
        })
    };

    function w() {
        m = !0, b = {}, n.default(window).on("message", T)
    }

    function T(e) {
        var t = e.originalEvent,
            o = _.URI.parse(t.origin);
        if ("https" === o.getScheme() && (h.includes(o.getAuthority()) || o.getAuthority().endsWith("dl.dropboxusercontent.com"))) {
            var n;
            try {
                n = JSON.parse(t.data)
            } catch (e) {
                return
            }
            if (n && n.download_id) {
                var r = b[n.download_id];
                if (null != r && o.getAuthority() === r.origin && t.source === r.iframe[0].contentWindow) {
                    if ("failed" === n.status) {
                        var i = (n.message || f) + '<a target="_blank" rel="noreferrer" href="/help/desktop-web/download-entire-folders">' + p.intl.formatMessage({
                            defaultMessage: "More info"
                        }) + "</a>";
                        c.Notify.error(new d.HTML(i)), r.error && r.error()
                    }
                    S(n.download_id)
                }
            }
        }
    }

    function S(e) {
        var t = b[e];
        null != t && (t.iframe.remove(), delete b[e])
    }
    t.init = w
})), define("modules/clean/ajax_as_promised", ["require", "exports", "tslib", "modules/clean/ajax"], (function(e, t, o, n) {
    "use strict";

    function r(e) {
        return function(t) {
            return new Promise((function(o, n) {
                return e(t).then(o, (function(e, t, o) {
                    return n({
                        jqXHR: e,
                        textStatus: t,
                        errorThrown: o
                    })
                }))
            }))
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importStar(n), t.Request = r(n.Request), t.BackgroundRequest = r(n.BackgroundRequest), t.SilentBackgroundRequest = r(n.SilentBackgroundRequest), t.SilentBackgroundRequestOref = r(n.SilentBackgroundRequestOref), t.WebRequest = r(n.WebRequest), t.WebRequestOref = r(n.WebRequestOref), t.FormWebRequest = r(n.FormWebRequest), t.WebProgressRequest = r(n.WebProgressRequest), t.ValidationSchemaRequest = r(n.ValidationSchemaRequest)
})), define("modules/clean/avatar/viewer_avatar", ["require", "exports", "tslib", "react", "prop-types", "modules/clean/avatar/photo_avatar", "modules/clean/avatar/size", "modules/clean/css", "modules/core/uri", "modules/clean/event_handler"], (function(e, t, o, n, r, i, s, a, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r), a = o.__importStar(a);
    var d = (function(e) {
        function t(t) {
            var o = e.call(this, t) || this;
            return o.state = {
                photoUrl: o.props.photoUrl
            }, o
        }
        return o.__extends(t, e), t.prototype.componentDidMount = function() {
            var e = this;
            a.require_css("/static/css/scooter/scooter-scoped-vfljL5ijS.css"), this.events.on(document, "db:account_photo:photo_set", (function(t, o) {
                var n = 2 * e.props.dimension,
                    r = n + "x" + n,
                    i = l.URI.parse(o.saved_photo_url).updateQuery({
                        size: r
                    }).toString();
                e.setState({
                    photoUrl: i
                })
            })), this.events.on(document, "db:account_photo:photo_deleted", (function() {
                e.setState({
                    photoUrl: null
                })
            })), !this.hasPhotoAvatar() && this.props.onLoad && this.props.onLoad()
        }, t.prototype.hasPhotoAvatar = function() {
            return null != this.state.photoUrl
        }, t.prototype.render = function() {
            return this.hasPhotoAvatar() ? n.default.createElement(i.PhotoAvatar, {
                alt: this.props.alt,
                dimension: this.props.dimension,
                onClick: this.props.onPhotoClick,
                photoUrl: this.state.photoUrl,
                optionalClass: this.props.optionalClass,
                onLoad: this.props.onLoad,
                onError: this.props.onError
            }) : this.props.defaultAvatar
        }, t.displayName = "ViewerAvatar", t.propTypes = {
            dimension: r.oneOf(s.VALID_AVATAR_DIMENSIONS).isRequired
        }, t = o.__decorate([u.eventHandler], t)
    })(n.default.Component);
    t.default = d
})), define("modules/clean/browse_interface", ["require", "exports", "tslib", "modules/clean/viewer", "modules/core/i18n", "modules/core/uri", "modules/clean/browse_uri_interface", "modules/clean/browse_uri_interface"], (function(e, t, o, n, r, i, s, a) {
    "use strict";

    function l(e) {
        return n.Viewer.get_viewer().is_paired ? n.Viewer.get_root_name(e) : r.intl.formatMessage({
            defaultMessage: "Files"
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.get_browse_root = s.get_browse_root, t.href_for_file = s.href_for_file, t.preview_uri_for_fq_path = s.preview_uri_for_fq_path, t.browse_uri_for_fq_path = s.browse_uri_for_fq_path, t.get_browse_root_name = l, t.get_all_browse_roots = function() {
        return n.Viewer.get_viewer().get_users().map((function(e) {
            return {
                name: l(e),
                path: a.get_browse_root(e)
            }
        }))
    }, t.getFileHistoryUrl = function(e, t) {
        var n, r = e.fqPath,
            s = e.userId,
            a = o.__assign(o.__assign({}, null == t ? {} : t), ((n = {
                undelete: "1"
            })._subject_uid = String(s), n));
        return r = r.replace(/^[/]/, ""), new i.URI({
            path: "/history/" + r
        }).updateQuery(a).toString()
    }
})), define("modules/clean/bolt", ["require", "exports", "tslib", "external/lodash", "jquery", "modules/clean/bolt_nodeps", "modules/core/exception"], (function(e, t, o, n, r, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importStar(n), r = o.__importDefault(r), s = o.__importStar(s), t.ChannelId = i.ChannelId, t.ChannelPayloads = i.ChannelPayloads, t.Payload = i.Payload, t.SignedChannelState = i.SignedChannelState;
    var a = (function(e) {
        function t(t, o, i) {
            return e.call(this, t, o, i, "bolt.dropbox.com", r.default.ajax, n, s) || this
        }
        return o.__extends(t, e), t
    })(i.BoltClient);
    t.BoltClient = a;
    var l = (function(e) {
        function t(t, o, i) {
            return e.call(this, t, o, i, "thunder.dropbox.com", r.default.ajax, n, s) || this
        }
        return o.__extends(t, e), t
    })(i.ThunderClient);
    t.ThunderClient = l
})), define("modules/clean/bolt_nodeps", ["require", "exports", "tslib"], (function(e, t, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function(e, t) {
        this.app_id = e, this.unique_id = t
    };
    t.ChannelId = n;
    var r = function(e, t, o, n) {
        this.app_id = e, this.unique_id = t, this.revision = o, this.token = n
    };
    t.SignedChannelState = r;
    var i = function(e, t) {
        this.revision = e, this.payload = t
    };
    t.Payload = i;
    var s = function(e, t) {
        this.channel_state = e, this.payloads = t
    };
    t.ChannelPayloads = s;
    var a = function(e) {
            return JSON.stringify(e)
        },
        l = (function() {
            function e(e, t, o, n, r, i, s) {
                void 0 === s && (s = null), this._find_state = this._find_state.bind(this), this._long_poll = this._long_poll.bind(this), this._must_find_state = this._must_find_state.bind(this), this._handle_poll_success = this._handle_poll_success.bind(this), this._handle_poll_error = this._handle_poll_error.bind(this), this._update_callback = t, this._refresh_callback = o, this._hostname = n, this._ajax = r, this._lodash = i, this._exclog = s, this._signed_channel_states = {}, this._signed_channel_states_keys = [], this._started = !1, this._sequence_num = 0, this._backoff_window = 1e3, this._additional_headers = {}, this._timeout_id = null, this.update_states(e)
            }
            return e.prototype._encode_channel_state = function(e) {
                return {
                    channel_id: {
                        app_id: e.app_id,
                        unique_id: e.unique_id
                    },
                    revision: e.revision,
                    token: e.token
                }
            }, e.prototype._decode_channel_state = function(e) {
                return new r(e.channel_id.app_id, e.channel_id.unique_id, e.revision, e.token)
            }, e.prototype._decode_channel_id = function(e) {
                return new n(e.app_id, e.unique_id)
            }, e.prototype._compare_revisions = function(e, t) {
                var o = Math.max(e.length, t.length),
                    n = Array(o - e.length + 1).join("0") + e,
                    r = Array(o - t.length + 1).join("0") + t;
                return n < r ? -1 : n > r ? 1 : 0
            }, e.prototype._find_state = function(e) {
                return this._signed_channel_states[a(e)]
            }, e.prototype.update_states = function(e) {
                for (var t = 0, o = e; t < o.length; t++) {
                    var n = o[t],
                        r = this._encode_channel_state(n),
                        i = this._find_state(r.channel_id);
                    if (null == i) {
                        var s = a(r.channel_id);
                        this._signed_channel_states[s] = r, this._signed_channel_states_keys.push(s)
                    } else this._compare_revisions(r.revision, i.revision) >= 0 && (i.revision = r.revision, i.token = r.token)
                }
            }, e.prototype.start = function() {
                if (!this._started) return this._started = !0, this._long_poll()
            }, e.prototype.unsubscribe = function() {
                this._started = !1, null != this._long_poll_xhr && this._long_poll_xhr.abort(), this._long_poll_xhr = null, window.clearTimeout(this._timeout_id), this._timeout_id = null
            }, e.prototype._long_poll = function() {
                var e = this;
                this._sequence_num++;
                var t = this._sequence_num;
                return this._long_poll_xhr = this._ajax({
                    url: this._subscribe_url(),
                    type: "POST",
                    data: JSON.stringify({
                        channel_states: this._signed_channel_states_keys.map((function(t) {
                            return e._signed_channel_states[t]
                        }))
                    }),
                    contentType: "application/json; charset=utf-8",
                    headers: this._additional_headers,
                    dataType: "json",
                    timeout: 12e4,
                    success: function(o, n, r) {
                        return e._handle_poll_success(t, o, n, r)
                    },
                    error: function(o, n) {
                        return e._handle_poll_error(t, o, n)
                    },
                    xhrFields: {
                        withCredentials: !0
                    }
                })
            }, e.prototype._must_find_state = function(e) {
                var t = this._find_state(e);
                if (null == t) {
                    var o = "Bolt returned unknown channel id " + e;
                    null != this._exclog && this._exclog.reportStack(o)
                }
                return t
            }, e.prototype._handle_poll_data = function(e, t, o) {
                return null != this._exclog ? this._exclog.reportStack("Method must be implemented.") : void 0
            }, e.prototype._subscribe_url = function() {
                return "https://" + this._hostname + this._subscribe_endpoint()
            }, e.prototype._subscribe_endpoint = function() {
                return null != this._exclog ? this._exclog.reportStack("Method must be implemented.") : void 0
            }, e.prototype._handle_poll_success = function(e, t, o, n) {
                var r = this;
                if (e === this._sequence_num && (this._long_poll_xhr = null, this._started)) {
                    var i = this._handle_poll_data(t, o, n);
                    if (i.length > 0 && this._lodash.defer(this._update_callback, i), !((null != t.invalid_channels ? t.invalid_channels.length : void 0) > 0)) return this._backoff_window = 1e3, this._timeout_id = window.setTimeout(this._long_poll, 0);
                    this._lodash.defer(this._refresh_callback, Array.from(t.invalid_channels).map((function(e) {
                        return r._decode_channel_id(e)
                    })))
                }
            }, e.prototype._handle_poll_error = function(e, t, o) {
                if (e === this._sequence_num && (this._long_poll_xhr = null, this._started)) {
                    var n = Math.random() * this._backoff_window;
                    return this._backoff_window = Math.min(2 * this._backoff_window, 3e5), this._timeout_id = window.setTimeout(this._long_poll, n)
                }
            }, e
        })(),
        u = (function(e) {
            function t(t, o, n, r, i, s, a) {
                void 0 === a && (a = null);
                var l = e.call(this, t, o, n, r, i, s, a) || this;
                return l._handle_poll_data = l._handle_poll_data.bind(l), l
            }
            return o.__extends(t, e), t.prototype._subscribe_endpoint = function() {
                return "/2/notify/subscribe"
            }, t.prototype._handle_poll_data = function(e, t, o) {
                var n = [];
                if (null != e.channel_states)
                    for (var r = 0, i = Array.from(e.channel_states); r < i.length; r++) {
                        var s = i[r],
                            a = this._must_find_state(s.channel_id);
                        this._compare_revisions(s.revision, a.revision) > 0 && (a.revision = s.revision, a.token = s.token, n.push(this._decode_channel_state(s)))
                    }
                return n
            }, t
        })(l);
    t.BoltClient = u;
    var d = (function(e) {
        function t(t, o, n, r, i, s, a) {
            void 0 === a && (a = null);
            var l = e.call(this, t, o, n, r, i, s, a) || this;
            return l._handle_poll_data = l._handle_poll_data.bind(l), l
        }
        return o.__extends(t, e), t.prototype.unsubscribe = function() {
            return delete this._additional_headers["X-Bolt-Session"], e.prototype.unsubscribe.call(this)
        }, t.prototype._subscribe_endpoint = function() {
            return "/2/payloads/subscribe"
        }, t.prototype._handle_poll_data = function(e, t, o) {
            var n = [];
            if (this._additional_headers = {}, this._additional_headers["X-Bolt-Session"] = o.getResponseHeader("X-Bolt-Session"), null != e.channel_payloads)
                for (var r = 0, a = Array.from(e.channel_payloads); r < a.length; r++) {
                    for (var l = a[r], u = l.channel_state, d = this._must_find_state(u.channel_id), p = this._decode_channel_state(l.channel_state), c = [], _ = 0, h = Array.from(l.payloads); _ < h.length; _++) {
                        var f = h[_];
                        this._compare_revisions(f.revision, d.revision) > 0 && c.push(new i(f.revision, f.payload))
                    }
                    c.length > 0 && n.push(new s(p, c)), this._compare_revisions(u.revision, d.revision) > 0 && (d.revision = u.revision, d.token = u.token)
                }
            return n
        }, t
    })(l);
    t.ThunderClient = d
})), define("modules/clean/event_handler", ["require", "exports", "tslib", "jquery"], (function(e, t, o, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), t.eventHandler = function(e) {
        var o = e.prototype.componentWillMount,
            n = e.prototype.componentWillUnmount;
        e.prototype.componentWillMount = function() {
            t.EventHandlerMixin.componentWillMount.apply(this), o && "function" == typeof o && o.apply(this)
        }, e.prototype.componentWillUnmount = function() {
            n && "function" == typeof n && n.apply(this), t.EventHandlerMixin.componentWillUnmount.apply(this)
        }
    }, t.EventHandlerMixin = {
        componentWillMount: function() {
            this.events = new r
        },
        componentWillUnmount: function() {
            this.events.removeAll()
        }
    };
    var r = (function() {
        function e() {}
        return e.prototype.on = function(e, t, o, r, i) {
            "string" != typeof o && (i = r, r = o, o = void 0), i && (r = n.default.proxy(r, i)), this.handlers || (this.handlers = []), e = n.default(e), o ? e.on(t, o, r) : e.on(t, r), this.handlers.push({
                element: e,
                event: t,
                selector: o,
                callback: r
            })
        }, e.prototype.removeAll = function() {
            this.handlers && (this.handlers.forEach((function(e) {
                e.selector ? e.element.off(e.event, e.selector, e.callback) : e.element.off(e.event, e.callback)
            })), this.handlers = null)
        }, e
    })();
    t.EventHandler = r
})), define("modules/clean/fuzzy", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = {
        simpleFilter: function(e, t) {
            return t.filter((function(t) {
                return o.test(e, t)
            }))
        },
        test: function(e, t) {
            return null !== o.match(e, t)
        },
        match: function(e, t, o) {
            o = o || {};
            var n = 0,
                r = [],
                i = t.length,
                s = 0,
                a = 0,
                l = o.pre || "",
                u = o.post || "",
                d = o.caseSensitive && t || t.toLowerCase(),
                p = void 0;
            e = o.caseSensitive && e || e.toLowerCase();
            for (var c = 0, _ = [], h = 0, f = 0; c < i;) p = t[c], d[c] === e[n] ? (p = l + p + u, f ? f += 1 : (h = c, f = 1), n += 1, a += 1 + a) : (a = 0, f && (_.push([h, f]), f = 0)), s += a, r[r.length] = p, c++;
            return f && _.push([h, f]), n === e.length ? {
                highlighted: _,
                rendered: r.join(""),
                score: s
            } : null
        },
        filter: function(e, t, o) {
            void 0 === o && (o = {});
            var n = this._reduce.bind(this, e, o);
            return t.reduce(n, []).sort(this._sort)
        },
        _reduce: function(e, t, n, r, i) {
            var s = r;
            t.extract && (s = t.extract(r));
            var a = o.match(e, s, t);
            return null != a && n.push({
                string: a.rendered,
                score: a.score,
                index: i,
                original: r
            }), n
        },
        _sort: function(e, t) {
            var o = t.score - e.score;
            return o || e.index - t.index
        }
    };
    t.default = o
})), define("modules/clean/pagelet_logger", ["require", "exports", "tslib", "modules/core/browser", "modules/clean/js_client_stopwatch", "modules/clean/web_timing_logger"], (function(e, t, o, n, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = o.__importStar(i);
    var s = (function() {
        function e(e, t, o, i) {
            var s = this;
            if (void 0 === t && (t = []), void 0 === o && (o = !1), void 0 === i && (i = {}), this.pageletName = e, o) {
                var a = n.performance();
                a && a.now && (this.performance = a, this.stopwatchName = this.pageletName + "_client_logging", r.JSStopwatch.create_stopwatch_if_not_exist(this.stopwatchName))
            } else this.stopwatchName = void 0;
            this.ttiComponents = [], t.map((function(e) {
                s.ttiComponents.push({
                    name: e,
                    isReady: !1
                })
            })), this.ttiMarked = !1, this.extraColumns = i
        }
        return e.prototype.componentReady = function(e) {
            if (!this.ttiMarked) {
                for (var t = !1, o = 0; o < this.ttiComponents.length; ++o) this.ttiComponents[o].name !== e || this.ttiComponents[o].isReady ? this.ttiComponents[o].isReady || (t = !0) : (this.ttiComponents[o].isReady = !0, r.JSStopwatch.recordTrace(e + "_since_start", {
                    stopwatchName: this.stopwatchName
                }), console.timeStamp && console.timeStamp(e + " TTI"));
                t || (i.mark_time_to_interactive(this.extraColumns), this.ttiMarked = !0)
            }
        }, Object.defineProperty(e.prototype, "ttiLogged", {
            get: function() {
                return this.ttiMarked
            },
            enumerable: !0,
            configurable: !0
        }), e
    })();
    t.PageletLogger = s
})), define("modules/clean/react/bubble_dropdown_v2", ["require", "exports", "tslib", "classnames", "react", "react-dom", "prop-types", "external/lodash", "jquery", "modules/clean/react/css", "modules/clean/react/overlay"], (function(e, t, o, n, r, i, s, a, l, u, d) {
    "use strict";
    var p;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importDefault(r), i = o.__importStar(i), s = o.__importStar(s), a = o.__importStar(a), l = o.__importDefault(l), t.BubbleDropdownPositions = d.PositionedOverlay.POSITIONS, t.POSITION_TO_CSS_CLASS_MAP = ((p = {})[t.BubbleDropdownPositions.TOP_LEFT] = "top-left", p[t.BubbleDropdownPositions.TOP] = "top", p[t.BubbleDropdownPositions.TOP_RIGHT] = "top-right", p[t.BubbleDropdownPositions.LEFT_TOP] = "left-top", p[t.BubbleDropdownPositions.LEFT] = "left", p[t.BubbleDropdownPositions.LEFT_BOTTOM] = "left-bottom", p[t.BubbleDropdownPositions.RIGHT_TOP] = "right-top", p[t.BubbleDropdownPositions.RIGHT] = "right", p[t.BubbleDropdownPositions.RIGHT_BOTTOM] = "right-bottom", p[t.BubbleDropdownPositions.BOTTOM_LEFT] = "bottom-left", p[t.BubbleDropdownPositions.BOTTOM] = "bottom", p[t.BubbleDropdownPositions.BOTTOM_RIGHT] = "bottom-right", p[t.BubbleDropdownPositions.TOP_ALIGN_LEFT] = "top-align-left", p[t.BubbleDropdownPositions.TOP_ALIGN_RIGHT] = "top-align-right", p[t.BubbleDropdownPositions.LEFT_ALIGN_TOP] = "left-align-top", p[t.BubbleDropdownPositions.LEFT_ALIGN_BOTTOM] = "left-align-bottom", p[t.BubbleDropdownPositions.RIGHT_ALIGN_TOP] = "right-align-top", p[t.BubbleDropdownPositions.RIGHT_ALIGN_BOTTOM] = "right-align-bottom", p[t.BubbleDropdownPositions.BOTTOM_ALIGN_LEFT] = "bottom-align-left", p[t.BubbleDropdownPositions.BOTTOM_ALIGN_RIGHT] = "bottom-align-right", p);
    var c = (function(e) {
        function u() {
            var o = null !== e && e.apply(this, arguments) || this;
            return o._getArrowStyleFromPosition = function() {
                return t.POSITION_TO_CSS_CLASS_MAP[o.props.position]
            }, o._adjustArrowPosition = function(e) {
                if (void 0 === e && (e = !1), o.props.shouldShowArrow) {
                    var n = l.default(i.findDOMNode(o.refs.bubbleArrowContainer));
                    switch (o.props.position) {
                        case t.BubbleDropdownPositions.TOP_ALIGN_LEFT:
                        case t.BubbleDropdownPositions.BOTTOM_ALIGN_LEFT:
                            n.css("left", o.props.targetNode.offsetWidth / 2);
                            break;
                        case t.BubbleDropdownPositions.TOP_ALIGN_RIGHT:
                        case t.BubbleDropdownPositions.BOTTOM_ALIGN_RIGHT:
                            n.css("right", o.props.targetNode.offsetWidth / 2);
                            break;
                        case t.BubbleDropdownPositions.LEFT_ALIGN_TOP:
                        case t.BubbleDropdownPositions.RIGHT_ALIGN_TOP:
                            n.css("top", o.props.targetNode.offsetHeight / 2);
                            break;
                        case t.BubbleDropdownPositions.LEFT_ALIGN_BOTTOM:
                        case t.BubbleDropdownPositions.RIGHT_ALIGN_BOTTOM:
                            n.css("bottom", o.props.targetNode.offsetHeight / 2)
                    }
                    return (!e || e && o.props.shouldArrowDecrement) && (o.props.verticalArrowOffset || o.props.horizontalArrowOffset) && (o._getArrowStyleFromPosition().match(/^(top|bottom)/) && n.css("left", "-=" + o.props.horizontalArrowOffset), o._getArrowStyleFromPosition().match(/^(left|right)/)) ? n.css("top", "-=" + o.props.verticalArrowOffset) : void 0
                }
            }, o
        }
        return o.__extends(u, e), u.prototype.componentDidMount = function() {
            return this._adjustArrowPosition()
        }, u.prototype.componentDidUpdate = function() {
            return this._adjustArrowPosition(!0)
        }, u.prototype.render = function() {
            return r.default.createElement("div", {
                className: this.props.isMaestroDesign ? "maestro" : ""
            }, r.default.createElement("div", {
                ref: "dropdown",
                className: n.default("bubble-dropdown-v2", "bubble-dropdown-v2--" + this._getArrowStyleFromPosition(), this.props.className),
                "aria-labelledby": this.props.targetNode.id
            }, this.props.children, this.props.shouldShowArrow ? r.default.createElement("div", {
                ref: "bubbleArrowContainer",
                className: "bubble-arrow-container"
            }, r.default.createElement("div", {
                className: "bubble-arrow-border"
            }), r.default.createElement("div", {
                className: "bubble-arrow"
            })) : null))
        }, u.displayName = "BubbleDropdownContents", u.propTypes = {
            targetNode: s.instanceOf(HTMLElement).isRequired,
            position: s.oneOf(a.values(t.BubbleDropdownPositions)).isRequired,
            verticalArrowOffset: s.number,
            horizontalArrowOffset: s.number,
            shouldShowArrow: s.bool,
            shouldArrowDecrement: s.bool,
            className: s.string,
            isMaestroDesign: s.bool
        }, u.defaultProps = {
            verticalArrowOffset: 0,
            horizontalArrowOffset: 0,
            shouldShowArrow: !0,
            shouldArrowDecrement: !0,
            className: null,
            isMaestroDesign: !1
        }, u
    })(r.default.Component);
    t.BubbleDropdownContents = c;
    var _ = (function(e) {
        function n() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.state = {
                isVisible: !1,
                targetNode: null,
                shouldAutoFocusDropdownContent: !1
            }, t.hasOnShowNotBeenCalledSinceLastOpened = !1, t.updateTargetNode = function() {
                var e = i.findDOMNode(t.refs.bubbleDropdownContainer).childNodes[0];
                return e && (e.setAttribute("aria-expanded", t.state.isVisible), e.hasAttribute("id") || e.setAttribute("id", "bubbleDropdownTarget-" + a.uniqueId())), t.setState({
                    targetNode: e
                })
            }, t.showDropdown = function() {
                if (!t.props.disabled) return t.setState({
                    isVisible: !0
                })
            }, t.hideDropdown = function() {
                if (!t.props.disabled) return t.setState({
                    isVisible: !1
                })
            }, t._handleClick = function(e) {
                var o = !(e.clientX > 0 && e.clientY > 0);
                return t.setState({
                    shouldAutoFocusDropdownContent: o
                }, t._toggle)
            }, t._toggle = function() {
                if (!t.props.disabled) return t.setState({
                    isVisible: !t.state.isVisible
                })
            }, t._hasShown = function() {
                if (t.hasOnShowNotBeenCalledSinceLastOpened) return t.state.targetNode.setAttribute("aria-expanded", !0), t.props.onShowDropdown(), t.hasOnShowNotBeenCalledSinceLastOpened = !1
            }, t._hasHidden = function() {
                return t.state.targetNode.setAttribute("aria-expanded", !1), t.props.onHideDropdown()
            }, t
        }
        return o.__extends(n, e), n.prototype.componentDidMount = function() {
            return this.updateTargetNode()
        }, n.prototype.UNSAFE_componentWillUpdate = function(e, t) {
            this.state.isVisible && !this.props.disabled || !t.isVisible || e.disabled || (this.hasOnShowNotBeenCalledSinceLastOpened = !0)
        }, n.prototype.componentDidUpdate = function(e, t) {
            if (t.isVisible !== this.state.isVisible && (this.state.isVisible || this._hasHidden()), i.findDOMNode(this.refs.bubbleDropdownContainer).childNodes[0] !== this.state.targetNode) return this.updateTargetNode()
        }, n.prototype.render = function() {
            var e = this,
                t = this.state.targetNode;
            return r.default.createElement("div", {
                className: "bubble-dropdown-v2-container",
                onClick: this._handleClick,
                ref: "bubbleDropdownContainer"
            }, this.props.targetButton, this.state.isVisible && !this.props.disabled && t ? r.default.createElement(d.PositionedOverlay, {
                targetNode: t,
                isTargetPositionFixed: this.props.targetFixed,
                shouldTrapKeyboardFocus: this.props.shouldTrapKeyboardFocus,
                shouldAutoFocusOverlayContent: this.state.shouldAutoFocusDropdownContent,
                position: this.props.position,
                positionOffset: {
                    horizontal: this.props.horizontalDisplacement,
                    vertical: this.props.verticalDisplacement
                },
                onRendered: function() {
                    return e._hasShown()
                },
                onBlur: function() {
                    return e.hideDropdown()
                }
            }, r.default.createElement(c, {
                ref: "bubbleDropdownContents",
                targetNode: t,
                position: this.props.position,
                verticalArrowOffset: this.props.verticalDisplacement,
                horizontalArrowOffset: this.props.horizontalDisplacement,
                shouldShowArrow: this.props.shouldShowArrow,
                className: this.props.className,
                shouldArrowDecrement: this.props.shouldArrowDecrement,
                isMaestroDesign: this.props.isMaestroDesign
            }, this.props.children)) : void 0)
        }, n.displayName = "BubbleDropdown", n.propTypes = {
            targetButton: function(e, t, o) {
                if (null == e.targetButton || "button" !== e.targetButton.type) return new Error("BubbleDropdown's targetButton must be a `<button>`")
            },
            position: s.oneOf(a.values(t.BubbleDropdownPositions)).isRequired,
            targetFixed: s.bool,
            verticalDisplacement: s.number,
            horizontalDisplacement: s.number,
            className: s.string,
            disabled: s.bool,
            shouldShowArrow: s.bool,
            shouldTrapKeyboardFocus: s.bool,
            onShowDropdown: s.func,
            onHideDropdown: s.func,
            shouldArrowDecrement: s.bool,
            isMaestroDesign: s.bool
        }, n.defaultProps = {
            targetFixed: !1,
            verticalDisplacement: 0,
            horizontalDisplacement: 0,
            className: null,
            disabled: !1,
            shouldShowArrow: !0,
            shouldTrapKeyboardFocus: !1,
            onShowDropdown: a.noop,
            onHideDropdown: a.noop,
            shouldArrowDecrement: !0,
            isMaestroDesign: !1
        }, n.POSITIONS = t.BubbleDropdownPositions, n
    })(r.default.Component);
    t.BubbleDropdown = u.requireCssWithComponent(_, ["/static/css/components/bubble_dropdown_v2-vflhhYVBe.css"])
})), define("modules/clean/react/bubble_menu", ["require", "exports", "tslib", "classnames", "create-react-class", "react", "react-dom", "react-dom-factories", "prop-types", "external/lodash", "jquery", "modules/clean/keycode", "modules/clean/react/bubble_dropdown_v2"], (function(e, t, o, n, r, i, s, a, l, u, d, p, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importDefault(r), i = o.__importDefault(i), s = o.__importStar(s), a = o.__importStar(a), l = o.__importStar(l), u = o.__importStar(u), d = o.__importDefault(d);
    var _ = i.default.createElement,
        h = function(e, t, o) {
            var n = e[t].type;
            if (![m, b, v].includes(n)) {
                var r = (null != n ? n.displayName : void 0) || e[t];
                return new Error("Expected menu items to be instances of BubbleMenuItem, not " + r + ".")
            }
            return null
        },
        f = {
            DEFAULT: 1,
            CHECKBOX: 2,
            RADIO: 3
        },
        m = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._handleMouseEnter = function(e) {
                    if (null != t.refs.item) return d.default(s.findDOMNode(t.refs.item)).closest(".bubble-menu").removeClass("bubble-menu--keyboard"), t.props.onMouseEnter(e)
                }, t._handleClick = function(e) {
                    return t.props.disabled ? (e.preventDefault(), e.stopPropagation()) : "#" === t.props.href && (e.preventDefault(), t.props.onClick(e), t.props.closeOnClick) ? t.props.closeFunc() : void 0
                }, t._getRole = function() {
                    switch (t.props.itemType) {
                        case f.CHECKBOX:
                            return "menuitemcheckbox";
                        case f.RADIO:
                            return "menuitemradio";
                        default:
                            return "menuitem"
                    }
                }, t._getAriaChecked = function() {
                    switch (t.props.itemType) {
                        case f.CHECKBOX:
                        case f.RADIO:
                            return t.props.checked || !1;
                        default:
                            return null
                    }
                }, t.renderContents = function() {
                    var e = {
                        "bubble-menu-item": !0,
                        "bubble-menu-item--disabled": t.props.disabled,
                        "bubble-menu-item--checked": t.props.checked
                    };
                    return a.a({
                        ref: "item",
                        role: t._getRole(),
                        className: n.default(e),
                        href: t.props.href,
                        target: t.props.target,
                        onClick: t._handleClick,
                        onMouseEnter: t._handleMouseEnter,
                        onMouseLeave: t.props.onMouseLeave,
                        "aria-disabled": t.props.disabled,
                        "aria-checked": t._getAriaChecked()
                    }, t.props.children)
                }, t
            }
            return o.__extends(t, e), t.prototype.render = function() {
                return a.li({
                    role: "presentation",
                    className: n.default("bubble-menu-item-wrapper", this.props.className)
                }, this.renderContents())
            }, t.displayName = "BubbleMenuItem", t.propTypes = {
                onClick: l.func,
                href: l.string,
                target: l.string,
                disabled: l.bool,
                closeOnClick: l.bool,
                closeFunc: l.func,
                className: l.string,
                onMouseEnter: l.func,
                onMouseLeave: l.func,
                itemType: l.oneOf(u.values(f)),
                checked: l.bool
            }, t.defaultProps = {
                onClick: u.noop,
                href: "#",
                target: null,
                disabled: !1,
                closeOnClick: !0,
                closeFunc: u.noop,
                className: null,
                onMouseEnter: u.noop,
                onMouseLeave: u.noop,
                itemType: f.DEFAULT,
                checked: null
            }, t.TYPES = f, t
        })(i.default.Component);
    t.BubbleMenuItem = m;
    var b = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.render = function() {
            return a.li({
                role: "separator",
                className: this.props.className
            }, this.props.children)
        }, t.displayName = "BubbleMenuSeparator", t.propTypes = {
            className: l.string
        }, t.defaultProps = {
            className: "bubble-menu-item-separator"
        }, t
    })(i.default.Component);
    t.BubbleMenuSeparator = b;
    var v = r.default({
        displayName: "BubbleMenuItemGroup",
        props: {
            items: l.arrayOf(h).isRequired,
            closeFunc: l.func
        },
        render: function() {
            var e = this;
            return 0 === this.props.items.length ? null : a.li({
                className: "bubble-menu-item-group",
                role: "presentation"
            }, a.ul({
                className: "bubble-menu-item-group u-unlist u-trim-padding",
                role: "group"
            }, Array.from(this.props.items).map((function(t, o) {
                return i.default.cloneElement(t, {
                    closeFunc: e.props.closeFunc,
                    key: null != t.key ? t.key : o
                })
            }))))
        }
    });
    t.BubbleMenuItemGroup = v;
    var g = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.showMenu = function() {
                var e, o;
                return null === (o = null === (e = t.refs.bubble) || void 0 === e ? void 0 : e.getWrappedComponent()) || void 0 === o ? void 0 : o.showDropdown()
            }, t.hideMenu = function() {
                var e, o;
                return null === (o = null === (e = t.refs.bubble) || void 0 === e ? void 0 : e.getWrappedComponent()) || void 0 === o ? void 0 : o.hideDropdown()
            }, t._onShowBubbleMenu = function() {
                if (null != t.refs.menu && null != t.refs.bubble) return t.$menu = d.default(s.findDOMNode(t.refs.menu)), t.$menuitems = t.$menu.find('*[role="menuitem"],*[role="menuitemcheckbox"],*[role="menuitemradio"]'), t.$menu.addClass("bubble-menu--keyboard"), "function" == typeof t.props.onShowDropdown ? t.props.onShowDropdown() : void 0
            }, t._onKeyDown = function(e) {
                return t.$menu.addClass("bubble-menu--keyboard"), e.keyCode === p.KeyCode.DOWN ? (t._focusNext(e.target), e.preventDefault(), e.stopPropagation()) : e.keyCode === p.KeyCode.UP ? (t._focusPrevious(e.target), e.preventDefault(), e.stopPropagation()) : void 0
            }, t._onKeyPress = function(e) {
                t.$menu.addClass("bubble-menu--keyboard");
                var o = null != e.which ? e.which : e.keyCode,
                    n = String.fromCharCode(o).toLowerCase();
                return (function() {
                    for (var o, r, i = [], s = 0; s < t.$menuitems.length; s++) {
                        var a = t.$menuitems[s];
                        if ((null === (r = null === (o = a.textContent) || void 0 === o ? void 0 : o[0]) || void 0 === r ? void 0 : r.toLowerCase()) === n && s > t.$menuitems.index(e.target)) {
                            a.focus(), e.stopPropagation();
                            break
                        }
                        i.push(void 0)
                    }
                    return i
                })()
            }, t._focusPrevious = function(e) {
                var o = t.$menuitems.index(e);
                return o = [-1, 0].includes(o) ? t.$menuitems.length - 1 : o - 1, t.$menuitems.get(o).focus()
            }, t._focusNext = function(e) {
                var o = t.$menuitems.index(e);
                return o = [-1, t.$menuitems.length - 1].includes(o) ? 0 : o + 1, t.$menuitems.get(o).focus()
            }, t
        }
        return o.__extends(t, e), t.prototype.render = function() {
            var e, t = this;
            return this.props.targetButton && (e = _(y, {
                ref: "targetButton",
                childProps: {
                    "aria-haspopup": !0
                }
            }, this.props.targetButton)), _(c.BubbleDropdown, u.assignIn({}, this.props, {
                ref: "bubble",
                shouldTrapKeyboardFocus: !0,
                onShowDropdown: this._onShowBubbleMenu,
                targetButton: e
            }), a.div({}, this.props.headerContent), a.ul({
                role: "menu",
                ref: "menu",
                className: "bubble-menu",
                onKeyDown: this._onKeyDown,
                onKeyPress: this._onKeyPress
            }, Array.from(this.props.items).map((function(e, o) {
                return i.default.cloneElement(e, {
                    closeFunc: t.hideMenu,
                    key: null != e.key ? e.key : o
                })
            }))))
        }, t.displayName = "BubbleMenu", t.POSITIONS = c.BubbleDropdown.POSITIONS, t.propTypes = u.assignIn({}, c.BubbleDropdown.propTypes, {
            headerContent: l.element,
            items: l.arrayOf(h).isRequired,
            onShowDropdown: l.func,
            targetButton: function(e, t, o) {
                if ("button" !== (null != e.targetButton ? e.targetButton.type : void 0)) return new Error("BubbleDropdown's targetButton must be a `<button>`, found: " + e[t].type)
            }
        }), t
    })(i.default.Component);
    t.BubbleMenu = g;
    var y = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.render = function() {
            return i.default.cloneElement(this.props.children, this.props.childProps)
        }, t.displayName = "BubbleMenuTargetButtonWrapper", t.propTypes = {
            childProps: l.object
        }, t
    })(i.default.Component)
})), define("modules/clean/react/hidden", ["require", "exports", "tslib", "react", "react-dom-factories", "prop-types", "external/lodash"], (function(e, t, o, n, r, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r), i = o.__importStar(i), s = o.__importStar(s);
    var a = n.default.createElement,
        l = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return o.__extends(t, e), t.prototype.render = function() {
                return r.div({
                    className: "hidden-option"
                }, this.props.children)
            }, t.displayName = "Hidden", t
        })(n.default.Component);
    t.Hidden = l;
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.render = function() {
            return a(l, {}, r.select(s.omit(this.props, "options"), Array.from(this.props.options).map((function(e) {
                return r.option({
                    key: e,
                    label: e,
                    value: e
                })
            }))))
        }, t.displayName = "HiddenSelect", t.propTypes = {
            options: i.arrayOf(i.any).isRequired,
            value: i.any
        }, t
    })(n.default.Component);
    t.HiddenSelect = u
})), define("modules/clean/react/rebrand/elements/rebrand_buttons", ["require", "exports", "tslib", "react", "classnames", "external/lodash", "modules/clean/react/css"], (function(e, t, o, n, r, i, s) {
    "use strict";

    function a(e, t, o, n, i, s) {
        var a;
        void 0 === e && (e = "primary"), void 0 === t && (t = !1), void 0 === o && (o = "small"), void 0 === n && (n = null), void 0 === i && (i = null), void 0 === s && (s = !1);
        var l = "button--" + o,
            u = "";
        n && (u = l + "--" + n);
        var d = "button--" + e,
            p = "";
        return t && (p = d + "--disabled"), r.default(((a = {})["button--with-border"] = "secondary" === e && s, a), "button", d, l, u, i, p)
    }

    function l(e) {
        e.preventDefault()
    }

    function u() {}
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importDefault(r), i = o.__importStar(i);
    var d = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.importance,
                o = e.disabled,
                r = e.size,
                i = e.width,
                s = e.className,
                d = e.withBorder,
                p = e.trackingId,
                c = a(t, o, r, i, s, d);
            return n.default.createElement("a", {
                href: this.props.href,
                className: c,
                onClick: o ? l : u,
                "aria-disabled": o,
                "data-trackingid": p
            }, this.props.children)
        }, t
    })(n.default.Component);
    t.RebrandButtonAnchorElement = d, t.RebrandButtonAnchor = s.requireCssWithComponent(d, ["/static/css/rebrand/elements/button-vfl3ixhP6.css"]);
    var p = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.importance,
                r = e.disabled,
                s = e.size,
                l = e.width,
                u = e.className,
                d = e.onClick,
                p = e.type,
                c = e.trackingId,
                _ = o.__rest(e, ["importance", "disabled", "size", "width", "className", "onClick", "type", "trackingId"]),
                h = a(t, r, s, l, u),
                f = i.pickBy(_, (function(e, t) {
                    return t.startsWith("data-")
                }));
            return n.default.createElement("button", o.__assign({
                className: h,
                onClick: d,
                disabled: r,
                type: p || "button",
                "data-uxa-log": c,
                "aria-label": this.props.ariaLabel
            }, f), this.props.children)
        }, t
    })(n.default.Component);
    t.RebrandButtonElement = p, t.RebrandButton = s.requireCssWithComponent(p, ["/static/css/rebrand/elements/button-vfl3ixhP6.css"])
})), define("modules/clean/react/snackbar", ["require", "exports", "tslib", "react", "react-dom", "spectrum/snackbar", "modules/clean/react/css", "modules/core/i18n"], (function(e, t, o, n, r, i, s, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r);
    var l = (function(e) {
        function t(o) {
            var n = e.call(this, o) || this;
            return n.handleTimeout = function() {
                n.props.onTimeout && n.props.onTimeout()
            }, n.handleTimeoutForCompleteVariant = function() {
                var e = n.props,
                    t = e.variant,
                    o = e.onTimeout;
                o && "complete" === t && o()
            }, n.handleProgressLoop = function() {
                n.setState((function(e) {
                    return {
                        progress: (e.progress + t.LOOP_UPDATE_STEP) % (t.MAX_PROGRESS + 1)
                    }
                }))
            }, n.state = {
                progress: 0
            }, n
        }
        return o.__extends(t, e), t.prototype.componentDidUpdate = function(e) {
            var o = e.syncProgressLoop;
            u.manager && (clearTimeout(this.timer), this.props.timeoutDelayMs && (this.timer = setTimeout(this.handleTimeout, this.props.timeoutDelayMs)), o ? this.progressLoop || (this.progressLoop = setInterval(this.handleProgressLoop, t.LOOP_UPDATE_RATE)) : clearInterval(this.progressLoop))
        }, t.prototype.componentDidMount = function() {
            var e = this.props,
                o = e.syncProgressLoop,
                n = e.timeoutDelayMs,
                r = e.timeoutDelayMsForCompleteVariant;
            r && (this.timer = setTimeout(this.handleTimeoutForCompleteVariant, r)), n && (this.timer = setTimeout(this.handleTimeout, n)), o && (this.progressLoop = setInterval(this.handleProgressLoop, t.LOOP_UPDATE_RATE)), this.props.onShown && this.props.onShown()
        }, t.prototype.componentWillUnmount = function() {
            this.timer && clearTimeout(this.timer), this.progressLoop && clearInterval(this.progressLoop), this.props.onClosed && this.props.onClosed()
        }, t.prototype.render = function() {
            var e = this.props,
                o = e.title,
                r = e.variant,
                s = e.actionButtonText,
                a = e.closeButtonText,
                l = e.externalProgress,
                u = Math.min(l || this.state.progress, t.MAX_PROGRESS);
            return n.default.createElement(i.Snackbar, {
                progress: u,
                variant: r,
                title: o
            }, this.props.children, s && n.default.createElement(i.SnackbarAction, {
                onClick: this.props.onActionClick
            }, s), a && n.default.createElement(i.SnackbarAction, {
                onClick: this.props.onCloseClick
            }, a))
        }, t.displayName = "ControlledSnackbar", t.LOOP_UPDATE_RATE = 16, t.LOOP_UPDATE_STEP = .2, t.MAX_PROGRESS = 100, t.defaultProps = {
            syncProgressLoop: !1
        }, t
    })(n.default.Component);
    t.ControlledSnackbarComponent = l, t.ControlledSnackbar = s.requireCssWithComponent(l, ["/static/css/snackbar-vfl8chDI1.css", "/static/css/spectrum/index.web-vfl_-DzRS.css"]);
    var u = (function(e) {
        function i() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.handleActionClick = function() {
                var e = t.props.onActionClick;
                e && e()
            }, t.handleCloseClick = function() {
                var e = t.props,
                    o = e.onCloseClick,
                    n = e.id;
                i.close(n), o && o()
            }, t.handleTimeout = function() {
                var e = t.props,
                    o = e.onTimeout,
                    n = e.id;
                i.close(n), o && o()
            }, t
        }
        return o.__extends(i, e), i.show = function(e) {
            if (i.manager) i.manager.show(e.props);
            else {
                var t = i.getOrCreateContainer();
                i.close(), r.render(e, t)
            }
        }, i.update = function(e) {
            if (i.manager) i.manager.update(e.props);
            else {
                var t = i.getOrCreateContainer();
                r.render(e, t)
            }
        }, i.close = function(e) {
            if (i.manager) i.manager.close(e);
            else {
                var t = i.getOrCreateContainer();
                r.unmountComponentAtNode(t)
            }
        }, i.generic = function(e, t) {
            return i.show(n.default.createElement(i, {
                closeButtonText: a.intl.formatMessage({
                    defaultMessage: "Close"
                }),
                timeoutDelayMs: 5e3,
                title: e,
                variant: "generic",
                id: t
            }))
        }, i.sync = function(e, t, o) {
            return i.show(n.default.createElement(i, {
                syncProgressLoop: t,
                timeoutDelayMs: void 0,
                title: e,
                variant: "sync",
                id: o
            }))
        }, i.complete = function(e, t) {
            return i.show(n.default.createElement(i, {
                closeButtonText: a.intl.formatMessage({
                    defaultMessage: "Close"
                }),
                timeoutDelayMs: 5e3,
                title: e,
                variant: "complete",
                id: t
            }))
        }, i.completeSticky = function(e, t) {
            return i.show(n.default.createElement(i, {
                closeButtonText: a.intl.formatMessage({
                    defaultMessage: "Close"
                }),
                timeoutDelayMs: void 0,
                title: e,
                variant: "complete",
                id: t
            }))
        }, i.completeWithUndo = function(e, t, o) {
            return i.show(n.default.createElement(i, {
                title: e,
                variant: "complete",
                actionButtonText: a.intl.formatMessage({
                    defaultMessage: "Undo"
                }),
                onActionClick: t,
                closeButtonText: a.intl.formatMessage({
                    defaultMessage: "Close"
                }),
                timeoutDelayMs: 5e3,
                id: o
            }))
        }, i.warn = function(e, t) {
            return i.show(n.default.createElement(i, {
                closeButtonText: a.intl.formatMessage({
                    defaultMessage: "Close"
                }),
                timeoutDelayMs: 5e3,
                title: e,
                variant: "warn",
                id: t
            }))
        }, i.fail = function(e, t) {
            return i.show(n.default.createElement(i, {
                closeButtonText: a.intl.formatMessage({
                    defaultMessage: "Close"
                }),
                timeoutDelayMs: 5e3,
                title: e,
                variant: "fail",
                id: t
            }))
        }, i.getOrCreateContainer = function() {
            var e = document.getElementById(i.SNACKBAR_ROOT_ID);
            return e || ((e = document.createElement("div")).id = i.SNACKBAR_ROOT_ID, e.className = i.SNACKBAR_CONTAINER_CLASSNAME, document.body.insertBefore(e, document.body.firstChild)), e
        }, i.prototype.render = function() {
            return n.default.createElement(t.ControlledSnackbar, o.__assign({}, this.props, {
                onActionClick: this.handleActionClick,
                onCloseClick: this.handleCloseClick,
                onTimeout: this.handleTimeout
            }))
        }, i.SNACKBAR_ROOT_ID = "react-snackbar-root", i.SNACKBAR_CONTAINER_CLASSNAME = "snackbar-container", i.snackbarTypes = ["generic", "sync", "complete", "warn", "fail"], i
    })(n.default.Component);
    t.Snackbar = u
})), define("modules/clean/react/util", ["require", "exports", "tslib", "react"], (function(e, t, o, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n);
    var r = function(e) {
        if ("string" == typeof e) return e;
        if ("string" == typeof e.props) return e.props;
        if (e.props.text) return e.props.text;
        var t = [];
        return n.default.Children.forEach(e.props.children, (function(e) {
            return t.push(r(e))
        })), t.join("")
    };
    t.getText = r;
    var i = function(e, t, o) {
        if (t(e)) return o(e);
        var r = !1,
            s = [];
        return n.default.Children.forEach(e.props.children, (function(e) {
            var n = i(e, t, o);
            if (s.push(n), n !== e) return r = !0
        })), r ? n.default.cloneElement(e, {}, s) : e
    };
    t.replaceSubtree = i;
    t.mergeProps = function() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var o = {}, n = [], r = 0, i = Array.from(e); r < i.length; r++)
            for (var s = i[r], a = 0, l = Object.keys(s || {}); a < l.length; a++) {
                var u = l[a],
                    d = s[u];
                "className" === u ? n.push(d) : o[u] = d
            }
        return null != n.length && (o.className = n.join(" ")), o
    };
    t.setStatePromise = function(e, t) {
        return new Promise((function(o, n) {
            return e.setState(t, o)
        }))
    }
})), define("modules/clean/referrer_cleansing_redirect", ["require", "exports", "tslib", "sjcl", "modules/core/browser", "modules/core/cookies", "modules/core/uri"], (function(e, t, o, n, r, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importStar(n), r = o.__importStar(r);
    var a = function(e) {
        var t = n.codec.utf8String.toBits(i.Cookies.read("__Host-js_csrf")),
            o = new n.misc.hmac(t).encrypt(e);
        return n.codec.base64.fromBits(o)
    };

    function l(e) {
        var t = s.URI.parse(e).getScheme();
        if (t && !["http", "https"].includes(t)) return "#";
        var o = new s.URI({
            scheme: "https",
            authority: "www.dropbox.com",
            path: "/referrer_cleansing_redirect"
        });
        return o.setQuery({
            url: e,
            hmac: a(e)
        }), o
    }

    function u(e, t, o) {
        void 0 === t && (t = window), void 0 === o && (o = !1), o && (t.opener = null), r.redirect(l(e), t)
    }
    t.get_redirect_uri = l, t.redirect = u, t.safe_open_tab_and_redirect = function(e) {
        u(e, r.unsafe_open_tab(""), !0)
    }
})), define("modules/core/user_i18n", ["require", "exports", "tslib", "modules/constants/page_load"], (function(e, t, o, n) {
    "use strict";

    function r() {
        return -1 !== ["zh", "ja", "ko"].indexOf(n.USER_LOCALE)
    }

    function i(e) {
        for (var t = [], o = e.length, n = 0; n < o;) {
            var r = e[n];
            if (r >= "\ud800" && r <= "\udb7f") {
                if (!(n < o - 1)) break;
                var i = r + e[n + 1];
                t.push(i), n += 2
            } else t.push(r), n += 1
        }
        return t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importStar(n), t.getInitials = function(e) {
        if (!e) return "";
        var t = (e = e.toUpperCase()).trim().split(" "),
            o = i(t[0]),
            n = i(t[t.length - 1]);
        if (t.length >= 2) return r() ? n[0] + o[0] : o[0] + n[0];
        var s = i(e);
        return r() && !(function(e) {
            for (var t = 0; t < e.length; t++)
                if (e.charCodeAt(t) >= 128) return !1;
            return !0
        })(e) && s.length > 1 ? s[0] + s[1] : s[0]
    }, t.getShortName = function(e) {
        if (!e) return "";
        var t = e.trim().split(" ");
        if (t.length < 2) return e;
        var o = t[0],
            n = i(t[t.length - 1]);
        return r() ? n[0] + " " + o : o + " " + n[0]
    }, t.isCjkLocale = r
})), define("modules/clean/react/tooltip", ["require", "exports", "tslib", "react", "react-dom", "react-dom-factories", "prop-types", "external/lodash", "jquery"], (function(e, t, o, n, r, i, s, a, l) {
    "use strict";
    var u;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r), i = o.__importStar(i), s = o.__importStar(s), a = o.__importStar(a), l = o.__importDefault(l);
    var d = {
        TOP: 0,
        BOTTOM: 1,
        LEFT: 2,
        RIGHT: 3,
        BOTTOM_RIGHT: 4
    };
    t.TooltipPosition = d;
    var p = function() {
            var e = "tooltip-holder",
                t = l.default("#" + e);
            return t.length || (t = l.default("<div />").attr({
                id: e,
                style: "z-index: " + 1e4
            }).prependTo("body")), t[0]
        },
        c = function() {
            var e = p();
            r.unmountComponentAtNode(e), e.parentNode.removeChild(e)
        },
        _ = function(e) {
            var t = e.offset(),
                o = e.outerWidth(),
                n = e.outerHeight();
            return {
                left_x: t.left,
                right_x: t.left + o,
                top_y: t.top,
                bottom_y: t.top + n,
                width: o,
                height: n
            }
        },
        h = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t._centerAndShow = function() {
                    var e = l.default(r.findDOMNode(t.refs.tooltip)),
                        o = t.props.targetElementDimensions,
                        n = _(e),
                        i = l.default(window).scrollTop(),
                        s = l.default(window).scrollLeft();
                    if ([d.TOP, d.BOTTOM].includes(t.props.position)) {
                        var a = l.default(window).width(),
                            u = o.left_x + o.width / 2 - n.width / 2 - s;
                        u < 0 ? u = 0 : u + n.width > a && (u = a - n.width - 7), e.css("left", u + "px")
                    } else if ([d.LEFT, d.RIGHT].includes(t.props.position)) {
                        var p = l.default(window).height(),
                            c = o.top_y + o.height / 2 - n.height / 2 - i;
                        c < 0 ? c = 0 : c + n.height > p && (c = p - n.height - 7), e.css("top", c + "px")
                    }
                    return e.show()
                }, t
            }
            return o.__extends(t, e), t.prototype.render = function() {
                var e = this,
                    t = this.props.targetElementDimensions,
                    o = l.default(window),
                    n = l.default(window).scrollTop(),
                    r = l.default(window).scrollLeft(),
                    s = (function() {
                        switch (e.props.position) {
                            case d.TOP:
                                return {
                                    bottom: o.height() - t.top_y + 7 + n
                                };
                            case d.BOTTOM:
                                return {
                                    top: t.bottom_y + 7 - n
                                };
                            case d.LEFT:
                                return {
                                    right: o.width() - t.left_x + 7 + r
                                };
                            case d.RIGHT:
                                return {
                                    left: t.right_x + 7 - r
                                };
                            case d.BOTTOM_RIGHT:
                                return {
                                    left: t.right_x - 7 - r,
                                    top: t.bottom_y + 7 - n
                                }
                        }
                    })();
                return i.div({
                    className: "tooltip-bubble " + (this.props.className || ""),
                    ref: "tooltip",
                    style: s,
                    onMouseMove: this.props.mouse_move_cb ? this.props.mouse_move_cb : void 0,
                    onMouseLeave: this.props.mouse_out_cb ? this.props.mouse_out_cb : void 0,
                    onMouseEnter: this.props.mouse_enter_cb ? this.props.mouse_enter_cb : void 0
                }, i.div({
                    className: "tooltip-inner"
                }, this.props.contents))
            }, t.prototype.componentDidMount = function() {
                return this._centerAndShow()
            }, t.prototype.componentDidUpdate = function() {
                return this._centerAndShow()
            }, t.displayName = "TooltipBubble", t.propTypes = {
                position: s.oneOf((function() {
                    var e = [];
                    for (u in d) e.push(d[u]);
                    return e
                })()),
                contents: s.oneOfType([s.element, s.string]),
                className: s.string,
                mouse_move_cb: s.func,
                mouse_out_cb: s.func,
                mouse_enter_cb: s.func,
                targetElementDimensions: s.shape({
                    left_x: s.number,
                    right_x: s.number,
                    top_y: s.number,
                    bottom_y: s.number,
                    width: s.number,
                    height: s.number
                })
            }, t
        })(n.default.Component),
        f = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    visible: !1,
                    event_id: a.uniqueId()
                }, t._on_mouse_enter = function() {
                    t.props.show_delay > 0 ? t._scheduleShow() : t._show()
                }, t._on_mouse_leave = function() {
                    t.props.hide_delay > 0 ? t._scheduleHide(t.props.hide_delay) : t._hide()
                }, t._render_tooltip = function() {
                    c();
                    var e = p();
                    l.default("#tooltip-holder").css("position", "fixed"), l.default("#tooltip-holder").css("left", "0"), l.default("#tooltip-holder").css("right", "0"), t.props.hide_delay > 0 && l.default("#tooltip-holder").attr("data-event-id", t.state.event_id), t.props.position === d.TOP ? (l.default("#tooltip-holder").css("top", "auto"), l.default("#tooltip-holder").css("bottom", "0")) : (l.default("#tooltip-holder").css("top", "0"), l.default("#tooltip-holder").css("bottom", "auto"));
                    var o = n.default.createElement(h, {
                        position: t.props.position,
                        contents: t.props.tooltip_contents,
                        className: t.props.tooltip_classname,
                        mouse_move_cb: t.props.interaction_enabled ? t._clear_timeout : void 0,
                        mouse_out_cb: t.props.interaction_enabled ? t._on_mouse_leave : void 0,
                        mouse_enter_cb: t.props.interaction_enabled ? t._on_mouse_enter : void 0,
                        targetElementDimensions: _(l.default(r.findDOMNode(t.refs.tooltipTarget)))
                    });
                    return r.render(o, e)
                }, t._show = function() {
                    if (!t.state.visible || t._last_timeout) return t._render_tooltip(), t.setState({
                        visible: !0
                    }), t.props.on_show && t.props.on_show(), t._clear_timeout()
                }, t._hide = function() {
                    if (t.state.visible) {
                        var e = p();
                        if (t._last_timeout) l.default(e).attr("data-event-id") === t.state.event_id && (c(), t._clear_timeout());
                        else c();
                        return t.setState({
                            visible: !1
                        })
                    }
                }, t._scheduleHide = function(e) {
                    if (t.state.visible) return t._last_timeout = setTimeout(t._hide, e)
                }, t._clear_timeout = function() {
                    if (t._last_timeout) return clearTimeout(t._last_timeout), t._last_timeout = null
                }, t._scheduleShow = function() {
                    return t._clear_timeout(), t._last_timeout = setTimeout(t._show, t.props.show_delay)
                }, t
            }
            return o.__extends(t, e), t.prototype.render = function() {
                return i.div({
                    className: "tooltip-target",
                    onMouseEnter: this._on_mouse_enter,
                    onFocus: this._show,
                    onMouseLeave: this._on_mouse_leave,
                    onBlur: this._on_mouse_leave,
                    id: this.state.tooltip_id,
                    ref: "tooltipTarget",
                    tabIndex: this.props.is_focusable ? 0 : void 0
                }, this.props.children)
            }, t.prototype.componentDidMount = function() {
                var e = this;
                return l.default(document).bind("scroll." + this.state.event_id, (function(t) {
                    return e._hide(t)
                }))
            }, t.prototype.componentDidUpdate = function() {
                if (this.state.visible) return this._render_tooltip()
            }, t.prototype.componentWillUnmount = function() {
                l.default(document).unbind("scroll." + this.state.event_id), c()
            }, t.displayName = "Tooltip", t.propTypes = {
                position: s.oneOf((function() {
                    var e = [];
                    for (u in d) e.push(d[u]);
                    return e
                })()),
                tooltip_contents: s.oneOfType([s.oneOfType([s.element, s.string]), s.arrayOf(s.oneOfType([s.element, s.string]))]),
                tooltip_classname: s.string,
                hide_delay: s.number,
                show_delay: s.number,
                interaction_enabled: s.bool,
                is_focusable: s.bool,
                on_show: s.func
            }, t.defaultProps = {
                interaction_enabled: !1,
                hide_delay: 0,
                show_delay: 0
            }, t
        })(n.default.Component);
    t.Tooltip = f
}));
//# sourceMappingURL=pkg-modules-unneeded-for-home.min.js-vflRZoeLi.map