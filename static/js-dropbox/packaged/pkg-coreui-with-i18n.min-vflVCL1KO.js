define("modules/clean/avatar/avatar_with_default", ["require", "exports", "tslib", "react", "prop-types", "modules/clean/avatar/photo_avatar", "modules/clean/avatar/size", "modules/clean/css"], (function(e, t, o, n, r, i, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r), s = o.__importStar(s);
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.componentDidMount = function() {
            if (this.props.loadScooterCss && s.require_css("/static/css/scooter/scooter-scoped-vfljL5ijS.css"), null == this.props.photoUrl && null != this.props.onLoad) return this.props.onLoad()
        }, t.prototype.render = function() {
            if (null != this.props.photoUrl) {
                var e = {
                    alt: this.props.alt,
                    dimension: this.props.dimension,
                    onClick: this.props.onPhotoClick,
                    photoUrl: this.props.photoUrl,
                    optionalClass: this.props.optionalClass,
                    shape: this.props.shape,
                    onLoad: this.props.onLoad,
                    onError: this.props.onError
                };
                return n.default.createElement(i.PhotoAvatar, o.__assign({}, e))
            }
            return this.props.defaultAvatar
        }, t.displayName = "AvatarWithDefault", t.propTypes = {
            alt: r.string,
            dimension: r.oneOf(a.VALID_AVATAR_DIMENSIONS).isRequired,
            defaultAvatar: r.element.isRequired,
            onPhotoClick: r.func,
            photoUrl: r.string,
            optionalClass: r.string,
            shape: r.oneOf(["CIRCLE", "SQUARE"]).isRequired,
            onLoad: r.func,
            onError: r.func,
            loadScooterCss: r.bool
        }, t.defaultProps = {
            shape: "CIRCLE",
            loadScooterCss: !0
        }, t
    })(n.default.Component);
    t.default = u
})), define("modules/clean/avatar/initials_avatar", ["require", "exports", "tslib", "react", "react-dom-factories", "prop-types", "modules/clean/avatar/size", "modules/clean/avatar/style", "modules/clean/avatar/style", "modules/clean/css"], (function(e, t, o, n, r, i, a, s, u, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r), i = o.__importStar(i), l = o.__importStar(l);
    var p = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = (e.colorFromNameGenerator, e.name, o.__rest(e, ["colorFromNameGenerator", "name"]));
            return n.default.createElement(c, o.__assign({}, t, {
                color: this.props.colorFromNameGenerator(this.props.name)
            }))
        }, t.displayName = "InitialsAvatarWithColorDerivedFromName", t.propTypes = {
            name: i.string.isRequired,
            loadScooterCss: i.bool,
            colorFromNameGenerator: i.func
        }, t.defaultProps = {
            loadScooterCss: !0,
            colorFromNameGenerator: s.colorValueForAvatarName
        }, t
    })(n.default.Component);
    t.InitialsAvatarWithColorDerivedFromName = p;
    var c = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.getContainerStyle = function() {
                var e = {};
                return t.props.color && (e.backgroundColor = t.props.color), e
            }, t
        }
        return o.__extends(t, e), t.prototype.componentDidMount = function() {
            this.props.loadScooterCss && l.require_css("/static/css/scooter/scooter-scoped-vfljL5ijS.css")
        }, t.prototype.render = function() {
            var e = ["c-avatar--no-img", "c-avatar--" + this.props.shape.toLowerCase()];
            return null != this.props.optionalClass && e.push(this.props.optionalClass), null != this.props.onClick && this.props.alt ? (e.push("u-unbutton"), r.button({
                className: u.getClassName(this.props.dimension, e),
                onClick: this.props.onClick,
                style: this.getContainerStyle()
            }, r.span({
                "aria-hidden": !0
            }, this.props.initials), r.span({
                className: "ax-visually-hidden"
            }, this.props.alt))) : r.div({
                className: u.getClassName(this.props.dimension, e),
                onClick: this.props.onClick,
                style: this.getContainerStyle()
            }, null != this.props.alt ? [r.span({
                key: "initials",
                "aria-hidden": !0
            }, this.props.initials), r.span({
                key: "alt",
                className: "ax-visually-hidden"
            }, this.props.alt)] : this.props.initials)
        }, t.displayName = "InitialsAvatar", t.propTypes = {
            alt: i.string,
            dimension: i.oneOf(a.VALID_AVATAR_DIMENSIONS).isRequired,
            initials: i.string.isRequired,
            shape: i.oneOf(["CIRCLE", "SQUARE"]).isRequired,
            color: i.string,
            onClick: i.func,
            optionalClass: i.string,
            loadScooterCss: i.bool
        }, t.defaultProps = {
            loadScooterCss: !0
        }, t
    })(n.default.Component);
    t.InitialsAvatar = c
})), define("modules/clean/avatar/photo_avatar", ["require", "exports", "tslib", "react", "react-dom-factories", "prop-types", "modules/clean/avatar/size", "modules/clean/avatar/style"], (function(e, t, o, n, r, i, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), r = o.__importStar(r), i = o.__importStar(i);
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return o.__extends(t, e), t.propTypes = function() {
            return {
                alt: i.string,
                dimension: i.oneOf(a.VALID_AVATAR_DIMENSIONS).isRequired,
                photoUrl: i.string.isRequired,
                onClick: i.func,
                optionalClass: i.string,
                shape: i.oneOf(["CIRCLE", "SQUARE"]),
                onLoad: i.func,
                onError: i.func
            }
        }, t.prototype.render = function() {
            var e = ["c-avatar--" + this.props.shape.toLowerCase()];
            null != this.props.optionalClass && e.push(this.props.optionalClass);
            var t = r.img({
                alt: this.props.alt || "",
                src: this.props.photoUrl,
                width: this.props.dimension,
                height: this.props.dimension,
                onLoad: this.props.onLoad,
                onError: this.props.onError
            });
            return null != this.props.onClick && this.props.alt ? (e.push("u-unbutton"), r.button({
                className: s.getClassName(this.props.dimension, e),
                onClick: this.props.onClick
            }, t)) : r.div({
                className: s.getClassName(this.props.dimension, e),
                onClick: this.props.onClick
            }, t)
        }, t.defaultProps = {
            shape: "CIRCLE"
        }, t
    })(n.default.Component);
    t.PhotoAvatar = u
})), define("modules/clean/avatar/size", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = {
        XSMALL: 16,
        SMALL: 24,
        MEDIUM: 32,
        LARGE: 48,
        XLARGE: 64
    };
    t.AVATAR_DIMENSION_BY_SIZE = o;
    var n = (function() {
        var e = [];
        for (var t in o) e.push(o[t]);
        return e
    })();
    t.VALID_AVATAR_DIMENSIONS = n
})), define("modules/clean/avatar/style", ["require", "exports", "tslib", "classnames", "modules/clean/accessibility/utils"], (function(e, t, o, n, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n);
    var i = {
            16: "c-avatar--xs",
            24: "c-avatar--s",
            32: "c-avatar--m",
            48: "c-avatar--l",
            64: "c-avatar--xl"
        },
        a = function(e, t) {
            void 0 === e && (e = ""), void 0 === t && (t = r.accessibleColorPalette);
            for (var o = 5381 * e.length, n = 0; n < e.length;) o = e.charCodeAt(n) + ((o << 6) + (o << 16) - o), n++;
            return t[(o = Math.abs(o)) % t.length]
        };
    t.colorValueForAvatarName = a;
    t.brandedColorValueFromAvatarName = function(e) {
        return void 0 === e && (e = ""), a(e, r.accessibleBrandedColorPalette)
    };
    t.getClassName = function(e, t) {
        void 0 === e && (e = 32), void 0 === t && (t = []);
        var o = ["c-avatar", i[e]];
        return t = t.concat(o), n.default.apply(this, t)
    }
})), define("modules/clean/cookie_check", ["require", "exports", "tslib", "jquery", "modules/core/cookies", "modules/core/i18n", "modules/core/notify"], (function(e, t, o, n, r, i, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importDefault(n), t.initialize_module = function(e) {
        if (!r.Cookies.are_enabled()) return n.default((function() {
            return a.Notify.error(i.intl.formatMessage({
                defaultMessage: "Please enable browser-cookies to use the Dropbox website."
            }))
        }))
    }
})), define("modules/clean/react/user_notifications/api_helper", ["require", "exports", "modules/clean/react/user_notifications/constants", "modules/clean/react/user_notifications/models"], (function(e, t, o, n) {
    "use strict";

    function r(e) {
        return new n.UserNotification({
            id: e.nid,
            userId: e.user_id,
            typeId: e.type_id,
            typeData: i(e),
            targetObjectKey: e.target_object_key,
            status: e.status,
            seenState: e.seen_state,
            feedTimeInSec: e.feed_time,
            rawDropdownRowHtml: e.notification_div,
            roleLabel: e.role_label,
            bluenoteActor: f(e),
            bluenoteObject: _(e),
            bluenoteNotificationTypeId: e.bluenote_notification_type_id,
            bluenoteTypedData: m(e)
        })
    }

    function i(e) {
        switch (e.type_id) {
            case n.NotificationTypes.SharedFolderInvite:
                return (function(e) {
                    return {
                        overQuotaStatus: e.sf_invite_overquota
                    }
                })(e);
            case n.NotificationTypes.Bluenote:
                return (function(e) {
                    var t = e.bluenote_payload;
                    if (null != t) return {
                        templateType: t.template_type,
                        templateVersion: t.template_version,
                        campaignInfo: l(t.campaign_info),
                        displayMessage: t.home_params.message,
                        icon: p(t.image),
                        surfaceAction: c(t.home_params.surface_action),
                        buttonActions: (t.home_params.button_actions || []).map(c),
                        preview: a(t.preview)
                    };
                    return
                })(e)
        }
    }

    function a(e) {
        if (null != e) return {
            showThumbnail: e.show_thumbnail || !1,
            quote: e.quote,
            tasks: s(e.tasks)
        }
    }

    function s(e) {
        if (null != e) return {
            taskEndpoint: e.task_endpoint,
            tasks: (e.tasks || []).map(u)
        }
    }

    function u(e) {
        if (null != e) return {
            name: e.name,
            id: e.id,
            isComplete: e.is_complete
        }
    }

    function l(e) {
        if (null != e) return {
            campaignId: e.campaignId,
            categoryId: e.categoryId,
            versionId: e.versionId ? "" + e.versionId : void 0,
            contentId: e.contentId
        }
    }

    function p(e) {
        if (null != e) return "avatar" === e.type ? {
            avatarInitials: e.avatar_initials,
            avatarUrl: e.avatar_url
        } : {
            lowResIconUrl: e.system_url32,
            highResIconUrl: e.system_url64
        }
    }

    function c(e) {
        if (null != e) {
            var t = void 0;
            if ("open_url" === e.action_name ? t = n.BluenoteActionTypes.OpenUrl : "mount_shared_folder" === e.action_name ? t = n.BluenoteActionTypes.MountSharedFolder : "approve_group_join_request" === e.action_name ? t = n.BluenoteActionTypes.ApproveGroupJoinRequest : "remove_group_join_request" === e.action_name && (t = n.BluenoteActionTypes.RemoveGroupJoinRequest), t) return {
                buttonLabel: e.label,
                actionType: t,
                params: d(t, e.params)
            }
        }
    }

    function d(e, t) {
        if (null != t) {
            if (e === n.BluenoteActionTypes.OpenUrl) return {
                urlPath: t.url_path
            };
            if (e === n.BluenoteActionTypes.MountSharedFolder) return {
                nsId: t.ns_id
            };
            if (e === n.BluenoteActionTypes.ApproveGroupJoinRequest || e === n.BluenoteActionTypes.RemoveGroupJoinRequest) return {
                requestingUserId: t.requesting_user_id,
                groupId: t.group_id
            }
        }
    }

    function f(e) {
        var t = e.bluenote_actor;
        if (null != t) return {
            accountId: t.actor_account_id,
            avatarUrl: t.actor_avatar_url,
            displayName: t.actor_display_name,
            initials: t.actor_initials
        }
    }

    function _(e) {
        var t = e.bluenote_object;
        if (null != t) return {
            id: t.id,
            ignore: t.ignore,
            name: t.name,
            thumbnailUrl: t.thumbnail_url,
            type: t.type,
            url: t.url
        }
    }

    function m(e) {
        var t = e.bluenote_notification_type_id,
            n = e.bluenote_typed_data;
        if (null != t && null != n) switch (t) {
            case o.BNNotificationTypeIdentifier.NONE:
                return;
            case o.BNNotificationTypeIdentifier.DROPBOX_FILE_COMMENT:
                return (function(e) {
                    return {
                        commentText: e.comment_text
                    }
                })(n);
            case o.BNNotificationTypeIdentifier.DROPBOX_SHARED_CONTENT:
            case o.BNNotificationTypeIdentifier.PAPER_SHARE:
                return (function(e) {
                    return {
                        shareText: e.share_text
                    }
                })(n);
            case o.BNNotificationTypeIdentifier.PAPER_COMMENT:
                return (function(e) {
                    return {
                        commentText: e.comment_text,
                        numOtherCommenters: e.num_other_commenters,
                        numOtherComments: e.num_other_comments
                    }
                })(n);
            case o.BNNotificationTypeIdentifier.PAPER_MENTION:
                return (function(e) {
                    return {
                        mentionText: e.mention_text
                    }
                })(n);
            case o.BNNotificationTypeIdentifier.PAPER_TASK:
                return (function(e) {
                    return {
                        isComplete: e.is_complete,
                        isNew: e.is_new
                    }
                })(n);
            case o.BNNotificationTypeIdentifier.COMMENTS2_COMMENT:
                return (function(e) {
                    return {
                        previewQuote: e.preview_quote
                    }
                })(n);
            default:
                return
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.userNotificationDeserializer = r, t.parseGetAllResponse = function(e) {
        var t = e.notifications.map(r);
        return {
            cursor: e.latest_nid,
            boltToken: e.bolt_token,
            notifications: t
        }
    }, t.userNotificationComparator = function(e, t) {
        return t.feedTime.getTime() - e.feedTime.getTime() || e.key.localeCompare(t.key)
    }
})), define("modules/clean/react/user_notifications/constants", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ActionTypes = {
        LOAD_REQUEST: "USER_NOTIFICATIONS_LOAD_REQUEST",
        LOAD_SUCCESS: "USER_NOTIFICATIONS_LOAD_SUCCESS",
        LOAD_FAILURE: "USER_NOTIFICATIONS_LOAD_FAILURE",
        ACKNOWLEDGEMENT_REQUEST: "USER_NOTIFICATIONS_ACKNOWLEDGEMENT_REQUEST",
        ACKNOWLEDGEMENT_REQUEST_SINGLE: "USER_NOTIFICATIONS_ACKNOWLEDGEMENT_REQUEST_SINGLE",
        MARK_AS_SEEN_REQUEST: "USER_NOTIFICATIONS_MARK_AS_SEEN_REQUEST"
    }, t.EventTypes = {
        RENDERED_NOTIFICATIONS: "USER_NOTIFICATIONS_RENDERED_NOTIFICATIONS"
    }, t.BNNotificationTypeIdentifier = {
        NONE: "NONE",
        DROPBOX_FILE_COMMENT: "DROPBOX_FILE_COMMENT",
        DROPBOX_SHARED_CONTENT: "DROPBOX_SHARED_CONTENT",
        PAPER_SHARE: "PAPER_SHARE",
        PAPER_COMMENT: "PAPER_COMMENT",
        PAPER_MENTION: "PAPER_MENTION",
        PAPER_TASK: "PAPER_TASK",
        COMMENTS2_COMMENT: "COMMENTS2_COMMENT"
    }, t.BluenoteObjectTypes = {
        DROPBOX_FILE: "dropbox-file",
        DROPBOX_FOLDER: "dropbox-folder",
        PAPER_PAD: "paper-pad",
        PAPER_FOLDER: "paper-folder"
    }
})), define("modules/clean/react/user_notifications/models", ["require", "exports", "tslib", "modules/clean/datetime"], (function(e, t, o, n) {
    "use strict";
    var r, i, a;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = o.__importStar(n), (function(e) {
        e[e.OpenUrl = 1] = "OpenUrl", e[e.MountSharedFolder = 2] = "MountSharedFolder", e[e.ApproveGroupJoinRequest = 3] = "ApproveGroupJoinRequest", e[e.RemoveGroupJoinRequest = 4] = "RemoveGroupJoinRequest"
    })(t.BluenoteActionTypes || (t.BluenoteActionTypes = {})), (function(e) {
        e[e.Unread = 0] = "Unread", e[e.Read = 1] = "Read", e[e.Invisible = 2] = "Invisible"
    })(r = t.NotificationStatuses || (t.NotificationStatuses = {})), (function(e) {
        e[e.Unseen = 1] = "Unseen", e[e.Seen = 2] = "Seen"
    })(i = t.NotificationSeenState || (t.NotificationSeenState = {})), t.NotificationStatusStrings = {
        0: "unread",
        1: "read",
        2: "invisible"
    }, t.SharedFolderInviteOverQuotaStatuses = {
        ALREADY_OVER: "overquota",
        WILL_BE_OVER: "will_be_overquota"
    }, (function(e) {
        e[e.SharedFolderInvite = 100] = "SharedFolderInvite", e[e.Bluenote = 2200] = "Bluenote"
    })(a = t.NotificationTypes || (t.NotificationTypes = {}));
    var s = (function() {
        function e(e) {
            var t = e.id,
                o = e.userId,
                n = e.typeId,
                r = e.typeData,
                i = e.targetObjectKey,
                a = e.status,
                s = e.seenState,
                u = e.feedTimeInSec,
                l = e.rawDropdownRowHtml,
                p = e.roleLabel,
                c = e.bluenoteActor,
                d = e.bluenoteObject,
                f = e.bluenoteNotificationTypeId,
                _ = e.bluenoteTypedData;
            this.id = t, this.userId = o, this.typeId = n, this.typeData = r, this.targetObjectKey = i, this.status = a, this.seenState = s, this.feedTimeInSec = u, this.rawDropdownRowHtml = l, this.roleLabel = p, this.bluenoteActor = c, this.bluenoteObject = d, this.bluenoteNotificationTypeId = f, this.bluenoteTypedData = _
        }
        return Object.defineProperty(e.prototype, "key", {
            get: function() {
                return this.userId + " " + this.typeId + " " + this.targetObjectKey
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "isUnread", {
            get: function() {
                return this.status === r.Unread
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "isRead", {
            get: function() {
                return this.status === r.Read
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "isInvisible", {
            get: function() {
                return this.status === r.Invisible
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "isSeen", {
            get: function() {
                return !(this.seenState === i.Unseen && this.status === r.Unread)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this.typeId
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "feedTime", {
            get: function() {
                return new Date(1e3 * this.feedTimeInSec)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "campaignId", {
            get: function() {
                var e;
                if (this.typeId === a.Bluenote) {
                    var t = this.typeData;
                    t.campaignInfo && t.campaignInfo.campaignId && (e = "" + t.campaignInfo.campaignId)
                }
                return e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "campaignVersion", {
            get: function() {
                if (this.typeId === a.Bluenote) {
                    var e = this.typeData;
                    if (e.campaignInfo && e.campaignInfo.versionId) return e.campaignInfo.versionId
                }
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "displayTime", {
            get: function() {
                return n.ago(this.feedTime, !0, !0)
            },
            enumerable: !0,
            configurable: !0
        }), e
    })();
    t.UserNotification = s;
    var u = function() {};
    t.SharedFolderInviteData = u
}));
//# sourceMappingURL=pkg-coreui-with-i18n.min.js-vflsnS5Gq.map