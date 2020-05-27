define("modules/clean/react/previews/video/preview_video", ["require", "exports", "tslib", "react", "modules/clean/react/previews/video/preview_video_basic", "modules/clean/react/previews/video/preview_video_comments2", "modules/clean/react/previews/constants"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.PreviewVideoProps = n.PreviewVideoProps, t.PreviewVideo = function(e) {
        var t = e.sourceContext,
            s = e.hidePageChrome;
        return t !== a.PreviewSourceContext.EmbeddedSharedLinkFile && !s ? i.default.createElement(o.PreviewVideoComments2, r.__assign({}, e)) : i.default.createElement(n.PreviewVideoBasic, r.__assign({}, e))
    }
})), define("modules/clean/react/previews/error/preview_error", ["require", "exports", "tslib", "react", "modules/clean/em_string", "modules/clean/previews/pending_upload_watcher", "modules/clean/react/css", "modules/clean/file_store/utils", "modules/clean/react/file_viewer/constants", "modules/clean/react/previews/constants", "modules/clean/react/previews/error/fullscreen_view", "modules/clean/react/previews/error/view", "modules/clean/web_timing_logger", "modules/clean/react/previews/error/upsell"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), p = r.__importStar(p);
    var f = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            (p.set_tti_exclusion_flow("failed previews not included"), p.mark_time_to_view(), p.mark_time_to_interactive(), this.logPreviewSupportDenied(), this.props.errorType === c.ErrorType.PendingUploadError && this.props.shareToken) && new o.PendingUploadWatcher(this.props.shareToken.linkType, this.props.shareToken.linkKey, this.props.shareToken.secureHash).startPolling()
        }, Object.defineProperty(t.prototype, "allowOpenInApp", {
            get: function() {
                return !!this.props.file.open_in_app_data && !this.props.isMobileUserAgent
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.logPreviewSupportDenied = function() {
            this.props.errorType !== c.ErrorType.LoadError && this.props.errorType !== c.ErrorType.PendingUploadError && this.props.filePreviewSession && this.props.filePreviewSession.recordEvent(l.EventType.FilePreviewSupportDenied, {
                errorType: this.props.errorType
            })
        }, t.prototype.render = function() {
            var e = n.Emstring.em_snippet(s.getFilename(this.props.file), this.props.maxFilenameEmLength);
            return this.props.errorType === c.ErrorType.UpsellError ? i.default.createElement(m.PreviewUpsellErrorView, {
                areActionablesEnabled: this.props.areActionablesEnabled,
                allowOpenInApp: this.allowOpenInApp,
                count: this.props.count,
                errorType: this.props.errorType,
                extensionsEnabled: this.props.extensionsEnabled,
                file: this.props.file,
                filePreviewSession: this.props.filePreviewSession,
                filename: e,
                index: this.props.index,
                onNext: this.props.onNext,
                onPrevious: this.props.onPrevious,
                preview: this.props.preview,
                sharePermission: this.props.sharePermission,
                shareToken: this.props.shareToken,
                sharedLinkInfo: this.props.sharedLinkInfo,
                shouldDisplayToolbar: this.props.shouldDisplayToolbar,
                sizeClass: this.props.sizeClass,
                user: this.props.user
            }) : this.props.isFullscreen ? i.default.createElement(u.PreviewErrorFullscreenView, r.__assign({}, this.props, {
                allowOpenInApp: this.allowOpenInApp,
                filename: e
            })) : i.default.createElement(d.PreviewErrorView, r.__assign({}, this.props, {
                allowOpenInApp: this.allowOpenInApp,
                filename: e
            }))
        }, t.defaultProps = {
            areActionablesEnabled: !0,
            isFullscreen: !1
        }, t
    })(i.default.Component);
    t._PreviewError = f;
    var g = a.requireCssWithComponent(f, ["/static/css/preview_error-vfl4ZhJ3a.css"]);
    t.PreviewError = g
})), define("modules/clean/react/previews/video/preview_video_comments2", ["require", "exports", "tslib", "react", "react-redux", "modules/clean/react/comments2/data/actions", "modules/clean/react/comments2/data/store", "modules/clean/react/comments2/data/selectors", "modules/clean/react/comments2/video_annotations/annotation_helper", "modules/clean/react/comments2/video_annotations/constants", "modules/clean/react/comments2/video_annotations/video_preview_event_emitter", "modules/clean/react/previews/video/preview_video_basic"], (function(e, t, r, i, n, o, a, s, l, c, u, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.seekToActivatedTimecode()
        }, t.prototype.componentDidUpdate = function(e) {
            e.activatedTimecodeThread !== this.props.activatedTimecodeThread && this.seekToActivatedTimecode()
        }, t.prototype.seekToActivatedTimecode = function() {
            var e = this.props.activatedTimecodeThread;
            if (e) {
                var t = l.VideoAnnotationHelper.unitConvertDomainObjectTimeToSeconds(e.annotation.time);
                u.videoPreviewEventEmitter.emit(c.EventTypes.SEEK_POSITION_AND_PAUSE, t)
            }
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.onTimeUpdate,
                n = e.playerIntegrationEnabled;
            return i.default.createElement(d.PreviewVideoBasic, r.__assign({}, this.props, {
                onTimeUpdate: n ? t : void 0
            }))
        }, t
    })((i = r.__importDefault(i)).default.PureComponent);
    t.PreviewVideoBasicWithPlayerIntegration = p, t.ConnectedPreviewVideoComments2 = n.connect((function(e) {
        var t = s.getIsPlayerIntegrationEnabled(e);
        return {
            showOnboarding: s.getShowOnboardingOnVideo(e),
            playerIntegrationEnabled: t,
            activatedTimecodeThread: t ? s.getActivatedTimecodeThread(e) : void 0
        }
    }), {
        onTimeUpdate: o.Actions.updatePlayerCurrentTime,
        onGutterClick: o.Actions.deactivateAllThreads
    })(p);
    var m = (function(e) {
        function o(t) {
            var r = e.call(this, t) || this;
            return r.store = a.getStoreForComments2(), r
        }
        return r.__extends(o, e), o.prototype.render = function() {
            return i.default.createElement(n.Provider, {
                store: this.store
            }, i.default.createElement(t.ConnectedPreviewVideoComments2, r.__assign({}, this.props)))
        }, o
    })(i.default.PureComponent);
    t.PreviewVideoComments2 = m
})), define("modules/clean/react/workflows/markup/api", ["require", "exports", "modules/clean/react/file_viewer/feedback_form/types", "modules/clean/react/file_viewer/feedback_form/api"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.submitMarkupFeedback = function(e, t, n) {
        return i.submitFeedback(r.SubmitFeedbackProductName.DROPBOX_MARKUP, e, t, n)
    }
})), define("modules/clean/react/previews/preview_zoom_container", ["require", "exports", "tslib", "keymaster", "classnames", "react", "external/lodash", "jquery", "modules/clean/react/file_viewer/logging", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/flippable_controls", "modules/clean/react/sprite", "modules/clean/react/title_bubble", "modules/core/i18n"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), o = r.__importDefault(o), a = r.__importStar(a), s = r.__importDefault(s);
    var f = "",
        g = "previewzoomcontainer",
        h = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    controlsHidden: !1
                }, t.flipNext = function(e) {
                    void 0 === e && (e = c.UserActionContext.LightboxToolbar), t.props.onFlipNext && t.props.onFlipNext(), l.logUserAction(c.UserAction.FlipNext, e)
                }, t.flipPrevious = function(e) {
                    void 0 === e && (e = c.UserActionContext.LightboxToolbar), t.props.onFlipPrevious && t.props.onFlipPrevious(), l.logUserAction(c.UserAction.FlipPrevious, e)
                }, t.onClick = function(e) {
                    e.target === e.currentTarget && (e.preventDefault(), t.onCloseFactory({}, c.UserActionContext.LightboxFrame))
                }, t.onMouseMove = function(e) {
                    0 === s.default(e.target).parents(".preview-toolbar-overlay").length ? t.startControlsTimer() : clearTimeout(t.controlsHideTimer)
                }, t.onCloseFactory = function(e, r) {
                    void 0 === e && (e = {}), void 0 === r && (r = c.UserActionContext.LightboxCloseButton), l.logUserAction(c.UserAction.ToggleFullscreenOff, r), t.props.onClose()
                }, t
            }
            return r.__extends(t, e), t.prototype.componentDidMount = function() {
                var e = this;
                this.flipNext = a.throttle(this.flipNext, 100), this.flipPrevious = a.throttle(this.flipPrevious, 100), i.default("esc", g, (function() {
                    e.onCloseFactory({}, c.UserActionContext.Keyboard)
                })), null != this.props.onZoomOut && i.default("space", g, this.props.onZoomOut), f = i.default.getScope(), i.default.setScope(g), this.startControlsTimer()
            }, t.prototype.componentWillUpdate = function() {
                i.default.setScope(g)
            }, t.prototype.componentWillUnmount = function() {
                i.default.clearScope(g), i.default.setScope(f), clearTimeout(this.controlsHideTimer)
            }, t.prototype.startControlsTimer = function() {
                var e = this;
                this.showControls(), clearTimeout(this.controlsHideTimer), this.controlsHideTimer = setTimeout((function() {
                    e.hideControls()
                }), 3e3)
            }, t.prototype.showControls = function() {
                this.setState({
                    controlsHidden: !1
                })
            }, t.prototype.hideControls = function() {
                this.setState({
                    controlsHidden: !0
                })
            }, t.prototype.renderFlippableControls = function() {
                return this.props.fileCount ? o.default.createElement(u.FlippableControls, {
                    index: "" + (this.props.fileIndex + 1),
                    numFlippableFiles: this.props.fileCount,
                    onNext: this.flipNext,
                    onPrevious: this.flipPrevious
                }) : null
            }, t.prototype.renderControls = function() {
                var e = this.props,
                    t = e.renderZoomControls,
                    r = e.scaleFactor,
                    i = n.default("preview-toolbar-container", {
                        hidden: this.state.controlsHidden
                    });
                return o.default.createElement("div", {
                    className: i,
                    ref: "previewZoomerToolbarContainer"
                }, o.default.createElement("div", {
                    className: "preview-toolbar-overlay-container"
                }, o.default.createElement("div", {
                    className: "preview-toolbar-overlay"
                }, o.default.createElement("div", {
                    className: "preview-toolbar-content"
                }, this.renderFlippableControls(), t ? o.default.createElement("div", {
                    className: n.default("toolbar-button-entry", "zoom-out", {
                        disabled: this.props.zoomOutDisabled
                    }),
                    onClick: this.props.onZoomOut
                }, o.default.createElement(d.Sprite, {
                    alt: m.intl.formatMessage({
                        defaultMessage: "Zoom out"
                    }),
                    group: "web",
                    name: "zoomout"
                })) : null, t ? o.default.createElement("div", {
                    className: "toolbar-button-entry",
                    ref: "zoomLabelContainer",
                    onClick: this.props.onViewActualSize
                }, o.default.createElement(p.TitleBubble, {
                    content: m.intl.formatMessage({
                        defaultMessage: "View actual size"
                    }),
                    position: p.TitleBubble.POSITIONS.TOP,
                    isTargetPositionFixed: !0,
                    distanceFromTarget: 16
                }, o.default.createElement("span", null, Math.floor(100 * (r || 0)), "%"))) : null, t ? o.default.createElement("div", {
                    className: n.default("toolbar-button-entry", "zoom-in", {
                        disabled: this.props.zoomInDisabled
                    }),
                    onClick: this.props.onZoomIn
                }, o.default.createElement(d.Sprite, {
                    alt: m.intl.formatMessage({
                        defaultMessage: "Zoom in"
                    }),
                    group: "web",
                    name: "zoom"
                })) : null))))
            }, t.prototype.renderClose = function() {
                var e = n.default("preview-zoomer-close", {
                    hidden: this.state.controlsHidden
                });
                return o.default.createElement("span", null, o.default.createElement("button", {
                    "aria-label": m.intl.formatMessage({
                        defaultMessage: "Close"
                    }),
                    className: e,
                    onClick: this.onCloseFactory,
                    ref: "previewZoomerClose"
                }, o.default.createElement(d.Sprite, {
                    alt: m.intl.formatMessage({
                        defaultMessage: "Close"
                    }),
                    group: "web",
                    name: "xclose"
                })))
            }, t.prototype.render = function() {
                var e = n.default("preview-zoomer-container", {
                    "zoomer-drag-disabled": this.props.dragDisabled
                });
                return o.default.createElement("div", {
                    className: e,
                    onClick: this.onClick,
                    onMouseMove: this.onMouseMove,
                    ref: "previewZoomerContainer"
                }, this.props.children, this.renderClose(), this.renderControls())
            }, t.defaultProps = {
                dragDisabled: !0,
                zoomInDisabled: !0,
                zoomOutDisabled: !0
            }, t
        })(o.default.Component);
    t.PreviewZoomContainer = h
})), define("modules/clean/react/previews/preview_html", ["require", "exports", "tslib", "react", "react-dom", "file-viewer/core", "modules/clean/previews/util", "modules/clean/react/file_viewer/constants", "modules/clean/react/previews/frame_messenger_host", "modules/clean/react/previews/preview_toolbar", "modules/clean/react/size_class/constants", "modules/clean/web_timing_logger", "modules/core/browser_detection", "modules/core/uri", "modules/clean/react/previews/toolbar_flip_buttons", "modules/clean/react/file_viewer/full_screen_helpers", "file-viewer/toolbar", "file-viewer/strings", "modules/clean/i18n/formatters", "modules/clean/react/previews/preview_toolbar_button", "modules/clean/react/previews/print_helpers", "modules/clean/react/keyboard_binding/keyboard_binding_connector", "modules/clean/react/keyboard_binding/keyboard_binding", "modules/clean/keycode", "modules/clean/react/previews/preview_toolbar_frame_messenger", "modules/clean/react/file_viewer/logging", "modules/constants/page_load"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P) {
    "use strict";
    var M;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importStar(n), d = r.__importStar(d), p = r.__importStar(p);
    var T, A = _.createFormatters(P.USER_LOCALE, v.strings),
        x = ["failed", "viewer-ready", "idle-mouse", "active-mouse", "exit-parent-fullscreen", "keydown", "child-focus", "get-keydown-keys-handled-by-parent"];
    (function(e) {
        e.ClearMouseTracking = "clear-mouse-tracking", e.EnableRegionCreation = "enable-region-creation", e.EnterFullscreen = "enter-fullscreen", e.ExitViewerFullscreen = "exit-viewer-fullscreen", e.PageDown = "page-down", e.PageUp = "page-up", e.SetCurrentPage = "set-current-page", e.PreviewToolbarMounted = "preview-toolbar-mounted", e.Print = "print", e.ScreenDown = "screen-down", e.ScreenUp = "screen-up", e.ZoomIn = "zoom-in", e.ZoomOut = "zoom-out"
    })(T || (T = {}));
    var F = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.getIframeProps = function() {
                var e = {
                    title: t.props.filename,
                    name: "preview-content",
                    type: "text/html",
                    src: t.getIframeSrc(),
                    sandbox: "",
                    className: "previewhtml",
                    ref: t.setRefIframe
                };
                return t.props.usesFrameMessenger && (e.sandbox = "allow-modals allow-scripts allow-forms"), e
            }, t.handleTrustedMessageFromChild = function(e) {
                switch (e.action) {
                    case "failed":
                        t.logFilePreviewEvent(s.EventType.FilePreviewDownloadSucceeded), t.logFilePreviewEvent(s.EventType.FilePreviewRenderFailed);
                        var r = o.RivieraStatus.Unknown;
                        e.parameters && (r = e.parameters.rivieraStatusCode), t.props.onError && t.props.onError(a.mapRivieraStatusToErrorType(r));
                        break;
                    case "viewer-ready":
                        t.markWebTiming(), t.logFilePreviewEvent(s.EventType.FilePreviewDownloadSucceeded), t.logFilePreviewEvent(s.EventType.FilePreviewRenderSucceeded), t.props.setRenderStatusSuccess(), t.props.isFullscreen ? t.frameMessenger.postMessageToChildren("enter-fullscreen") : t.frameMessenger.postMessageToChildren("exit-viewer-fullscreen"), t.props.sharePermission && 0 === t.props.sharePermission.canDownloadRoles.length && t.frameMessenger.postMessageToChildren("disable-download"), t.shouldIncreaseTabHeightForExcel() && t.frameMessenger.postMessageToChildren("increase-tab-height");
                        break;
                    case "exit-parent-fullscreen":
                        g.exitFullScreen(s.UserActionContext.Unknown);
                        break;
                    case "get-keydown-keys-handled-by-parent":
                        t.postKeysHandledByParent()
                }
            }, t.handleIframeLoad = function() {
                t.logFilePreviewEvent(s.EventType.FilePreviewDownloadSucceeded), t.props.usesFrameMessenger || (t.markWebTiming(), t.logFilePreviewEvent(s.EventType.FilePreviewRenderSucceeded), t.props.setRenderStatusSuccess())
            }, t.handleIframeError = function() {
                t.logFilePreviewEvent(s.EventType.FilePreviewDownloadFailed)
            }, t.setRefIframe = function(e) {
                t.iframe = e
            }, t.printDocument = function(e) {
                t.frameMessenger.postMessageToChildren(T.Print, {
                    context: e
                })
            }, t.keyboardBindings = [E.hydrateKeyboardBinding({
                keyboardEventCriteria: {
                    which: S.KeyCode.P
                },
                callback: function() {
                    return t.printDocument(s.UserActionContext.Keyboard)
                }
            })], t.handleClickPrevious = k.wrapToolbarActionWithLogging((function() {
                var e = t.props.onClickPrevious;
                return e && e()
            }), s.UserAction.FlipPrevious), t.handleClickNext = k.wrapToolbarActionWithLogging((function() {
                var e = t.props.onClickNext;
                return e && e()
            }), s.UserAction.FlipNext), t
        }
        return r.__extends(t, e), t.prototype.getIframeSrc = function() {
            var e = m.URI.parse(this.props.src);
            return this.props.isExcel && (this.props.forceTestExcelHtml ? e.updateQuery({
                canned_file_name: s.CannedTestFilename.ExcelHTML
            }) : "password_protected" === this.props.forceRivieraException ? e.updateQuery({
                canned_exception: "riviera_exception_password"
            }) : "too_big" === this.props.forceRivieraException && e.updateQuery({
                canned_exception: "riviera_exception_too_big"
            })), e.toString()
        }, t.prototype.shouldIncreaseTabHeightForExcel = function() {
            return this.props.isExcel && p.is_mobile_or_tablet()
        }, t.prototype.logFilePreviewEvent = function(e) {
            this.props.filePreviewSession && this.props.filePreviewSession.recordEvent(e)
        }, t.prototype.postKeysHandledByParent = function() {
            this.frameMessenger.postMessageToChildren("keydown-keys-handled-by-parent", {
                keycodes: I
            })
        }, t.prototype.markWebTiming = function() {
            this.props.filePreviewSession && this.props.filePreviewSession.markPrimaryEvent(), d.mark_time_to_view(), d.mark_time_to_interactive()
        }, t.prototype.componentDidMount = function() {
            this.logFilePreviewEvent(s.EventType.FilePreviewSupportConfirmed), this.logFilePreviewEvent(s.EventType.FilePreviewDownloadAttempted), this.props.usesFrameMessenger && (this.frameMessenger = new l.PreviewFrameMessengerHost, this.frameMessenger.configureChildMessaging("iframe.previewhtml", this.handleTrustedMessageFromChild, x), this.frameMessenger.startListening(), this.postKeysHandledByParent());
            var e = n.findDOMNode(this.iframe);
            e.onload = this.handleIframeLoad, e.onerror = this.handleIframeError
        }, t.prototype.componentWillUnmount = function() {
            this.props.usesFrameMessenger && this.frameMessenger.stopListening()
        }, t.prototype.render = function() {
            var e = this,
                t = {};
            p.iOS && (t = a.iOSIframeScrollStyles());
            var n = this.props,
                o = n.count,
                l = n.index,
                d = n.isFullscreen,
                m = n.isExcel,
                v = n.sharePermission,
                _ = n.sizeClass,
                E = n.onClickNext,
                S = n.onClickPrevious;
            return i.default.createElement("div", {
                className: "preview-content",
                style: t
            }, i.default.createElement("iframe", r.__assign({}, this.getIframeProps())), i.default.createElement(c.PreviewToolbar, {
                elevateToolbar: m,
                isFullscreen: d,
                isHidden: _ === u.SizeClass.Small,
                fadeController: function(e) {
                    var t = e.fadeIn,
                        r = e.fadeOut;
                    return i.default.createElement(C.PreviewToolbarFrameMessenger, {
                        activeMouse: t,
                        idleMouse: r
                    })
                }
            }, m ? null : i.default.createElement(f.ToolbarFlipButtons, {
                index: l,
                count: o,
                onClickPrevious: S && this.handleClickPrevious,
                onClickNext: E && this.handleClickNext
            }), i.default.createElement(h.FullScreenButton, {
                className: "toolbar-button-entry",
                intl: A,
                onClick: function() {
                    return g.toggleFullScreen(d, s.UserActionContext.Toolbar)
                }
            }), i.default.createElement(w.PreviewToolbarButton, {
                "data-test": "print",
                disabled: !b.canPrint(v),
                spriteGroup: "web",
                spriteName: "print",
                tooltip: b.getPrintTooltip(v),
                onClick: b.canPrint(v) ? function() {
                    return e.printDocument(s.UserActionContext.Toolbar)
                } : function() {}
            }), i.default.createElement(y.KeyboardBindingConnector, {
                keyboardBindings: this.keyboardBindings
            })))
        }, t.defaultProps = {
            usesFrameMessenger: !0
        }, t
    })(i.default.Component);
    t.PreviewHTML = F;
    var I = ((M = {})[S.KeyCode.ESC] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.ENTER] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.SPACE] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.PAGE_UP] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.PAGE_DOWN] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.LEFT] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.UP] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.RIGHT] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.DOWN] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.EQUALS] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[70] = {
        altKey: !1,
        ctrlKey: !0,
        metaKey: !0
    }, M[80] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.PLUS_EQUALS_FF] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.MINUS_FF] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.PLUS_EQUALS_FF_GERMAN] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.MINUS_FF_MAC] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.PLUS_CHROME] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M[S.KeyCode.MINUS_CHROME] = {
        altKey: !0,
        ctrlKey: !0,
        metaKey: !0
    }, M)
})), define("modules/clean/react/previews/preview_image", ["require", "exports", "tslib", "classnames", "react", "react-redux", "modules/clean/analytics", "modules/clean/image_preview_util", "modules/clean/photos/thumbnail_url_util", "modules/clean/previews/actions", "modules/clean/react/comments2/components/annotations/loadable", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/logging", "modules/clean/react/file_viewer/data/selectors", "modules/clean/react/file_viewer/data/actions", "modules/clean/react/file_viewer/full_screen_helpers", "modules/clean/react/file_viewer/utils", "modules/clean/react/previews/constants", "file-viewer/core", "modules/clean/i18n/formatters", "modules/clean/react/previews/image_helpers", "modules/clean/react/previews/preview_toolbar", "modules/clean/react/size_class/constants", "modules/clean/web_timing_logger", "modules/clean/react/css", "spectrum/dimensions", "file-viewer/preview_image", "file-viewer/strings", "modules/clean/file_store/utils", "modules/clean/react/previews/toolbar_flip_buttons", "file-viewer/toolbar", "modules/clean/react/keyboard_binding/keyboard_binding_connector", "modules/clean/react/keyboard_binding/keyboard_binding", "file-viewer/assets-metaserver", "modules/clean/react/previews/print_helpers", "modules/clean/react/previews/preview_toolbar_button", "modules/clean/react/keyboard_binding/keyboard_binding", "modules/clean/keycode", "modules/clean/react/file_viewer/logging", "modules/clean/react/watermarking/watermarking_layer", "modules/clean/react/workflows/markup/markup_layer", "modules/constants/page_load", "file-viewer/polyfills"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P, M, T, A, x, F, I, O, R, D, L, N, U, W, B, V) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), s = r.__importDefault(s), c = r.__importStar(c), b = r.__importStar(b), S = r.__importStar(S);
    var K = w.createFormatters(V.USER_LOCALE, M.strings),
        q = _.resolveAsset.bind(null, O.assets);

    function j() {}
    var H = (function(t) {
        function o() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.imgLoaded = !1, e.state = {}, e.logTTI = function() {
                e.props.filePreviewSession && e.props.filePreviewSession.markPrimaryEvent(), S.mark_time_to_view(), S.mark_time_to_interactive()
            }, e.logRenderSuccess = function() {
                e.imgLoaded || (e.imgLoaded = !0, e.logFilePreviewEvent(d.EventType.FilePreviewDownloadSucceeded), e.logFilePreviewEvent(d.EventType.FilePreviewRenderSucceeded), e.props.setRenderStatusSuccess(), null != e.props.onLoad && e.props.onLoad())
            }, e.onImageDoubleClick = function() {
                e.shouldDisableZoom() && e.props.sizeClass !== E.SizeClass.Small && e.openFullscreen()
            }, e.openFullscreen = function() {
                null != e.props.isFullscreen && g.enterFullScreen()
            }, e.logRenderFailure = function() {
                var t = function(t) {
                    var r = {};
                    void 0 !== t && (r.rivieraStatusCode = t.toString()), e.logFilePreviewEvent(d.EventType.FilePreviewDownloadFailed, r), e.props.onError && e.props.onError(v.ErrorType.LoadError, t)
                };
                e.rivieraStatusCodeRequest = h.fetchRivieraStatusCode(e.props["preview-url"], t, t)
            }, e.onZoomIn = function() {
                e.zoomWithMultiplier(1.25), p.logUserAction(d.UserAction.ZoomIn, d.UserActionContext.Toolbar)
            }, e.onZoomOut = function() {
                e.zoomWithMultiplier(.8), p.logUserAction(d.UserAction.ZoomOut, d.UserActionContext.Toolbar)
            }, e.onZoomOriginalOrFit = function() {
                var t = e.state,
                    r = t.scaleFactor,
                    i = t.fitScaleFactor;
                e.setState({
                    scaleFactor: r === i ? 1 : i
                })
            }, e.onPrint = function(t) {
                c.imagePrint(l.fullSizeUrl(e.props["preview-url"])), p.logUserAction(d.UserAction.Print, t)
            }, e.handleFitScaleFactorChange = function(t) {
                isNaN(t) || e.state.fitScaleFactor === t || e.setState({
                    fitScaleFactor: t
                })
            }, e.keyboardBindings = r.__spreadArrays(I.getEqualsKeyBindings(U.wrapKeyboardActionWithLogging(e.onZoomIn, d.UserAction.ZoomIn)), I.getMinusKeyBindings(U.wrapKeyboardActionWithLogging(e.onZoomOut, d.UserAction.ZoomOut)), [L.hydrateKeyboardBinding({
                keyboardEventCriteria: {
                    which: N.KeyCode.P
                },
                callback: function() {
                    return e.onPrint(d.UserActionContext.Keyboard)
                }
            })]), e.handleClickPrevious = U.wrapToolbarActionWithLogging((function() {
                var t = e.props.onPrevious;
                return t && t()
            }), d.UserAction.FlipPrevious), e.handleClickNext = U.wrapToolbarActionWithLogging((function() {
                var t = e.props.onNext;
                return t && t()
            }), d.UserAction.FlipNext), e.renderLayers = function(t) {
                return function(i) {
                    var o = n.default.createElement(P.ImageLayer, r.__assign({}, t, i)),
                        a = e.state.scaleFactor || e.state.fitScaleFactor || 1,
                        s = i.originalWidth,
                        l = i.originalHeight,
                        c = s && l ? {
                            width: s * a,
                            height: l * a
                        } : void 0,
                        d = s && l ? {
                            width: s,
                            height: l
                        } : void 0,
                        p = i.data.thumbnailUrl,
                        m = c && d && e.props.isWatermarkingMode ? n.default.createElement(W.WatermarkingLayer, {
                            layerSize: c,
                            pageDimensions: d,
                            thumbUrl: p
                        }) : null,
                        f = c && d && e.props.isMarkupMode ? n.default.createElement(B.MarkupLayer, {
                            layerSize: c,
                            pageDimensions: d,
                            page: 0
                        }) : null;
                    return c && e.props.annotationAllowed ? [n.default.createElement(u.AnnotationConductorLayer, {
                        layerSize: c
                    }, n.default.createElement(u.AnnotationInstructionalTooltipPane, {
                        layerSize: c
                    }, o, m, f, n.default.createElement(u.AnnotationViewLayer, null)))] : [o, m, f]
                }
            }, e
        }
        return r.__extends(o, t), o.prototype.componentWillUnmount = function() {
            this.rivieraStatusCodeRequest && this.rivieraStatusCodeRequest.readyState !== XMLHttpRequest.DONE && this.rivieraStatusCodeRequest.abort(), this.props.overflowZoomOff()
        }, o.prototype.componentWillMount = function() {
            this.logFilePreviewEvent(d.EventType.FilePreviewSupportConfirmed), this.logFilePreviewEvent(d.EventType.FilePreviewDownloadAttempted)
        }, o.prototype.componentDidMount = function() {
            this.logOpen();
            var t = this.props,
                i = t.nsId,
                n = t.sjId,
                o = i + "_" + n;
            null != i && null != n && window._timingData && window._timingData.img && window._timingData.img.dl_error_finish && window._timingData.img.dl_error_finish[o] && this.logRenderFailure(), new Promise((function(t, r) {
                e(["modules/clean/react/previews/preview_image_zoom"], t, r)
            })).then(r.__importStar)
        }, o.prototype.componentWillReceiveProps = function(e) {
            if (e["preview-url"] !== this.props["preview-url"]) {
                var t = e.filePreviewSession;
                this.logFilePreviewEvent(d.EventType.FilePreviewSupportConfirmed, void 0, t), this.logFilePreviewEvent(d.EventType.FilePreviewDownloadAttempted, void 0, t), this.logOpen(), this.setState({
                    scaleFactor: void 0,
                    fitScaleFactor: void 0
                }), this.imgLoaded = !1
            }
        }, o.prototype.componentDidUpdate = function(e, t) {
            t.scaleFactor !== this.state.scaleFactor && (null != this.state.scaleFactor && null != this.state.fitScaleFactor && this.state.scaleFactor > this.state.fitScaleFactor ? this.props.overflowZoomOn() : this.props.overflowZoomOff())
        }, o.prototype.logFilePreviewEvent = function(e, t, r) {
            void 0 === t && (t = {}), void 0 === r && (r = this.props.filePreviewSession), null != r && r.recordEvent(e, t)
        }, o.prototype.logOpen = function() {
            a.PreviewActivityLogger.log("open", {
                file_ext: this.props["file-extension"]
            })
        }, o.prototype.shouldDisableZoom = function() {
            var e = this.props,
                t = e.sizeClass;
            return e.shouldDisplayToolbar || t === E.SizeClass.Small
        }, o.prototype.zoomWithMultiplier = function(e) {
            var t = this.state.fitScaleFactor,
                r = this.state.scaleFactor || t;
            if (1 !== e && r) {
                var i = .05 * Math.round(r * e / .05);
                Math.abs(i - r) < .05 && (i += e > 1 ? .05 : -.05), this.setState({
                    scaleFactor: Math.min(Math.max(i, t || 0), 16)
                })
            }
        }, o.prototype.render = function() {
            var e = this,
                t = this.props,
                r = t.count,
                o = t.currentMode,
                a = t.index,
                c = t.onNext,
                u = t.onPrevious,
                p = t.shouldDisplayToolbar,
                m = t.isEditMode,
                f = t.isFlippingEnabled,
                h = t.isFullscreen,
                v = t.sharePermission,
                w = t.contextMenuDisabled,
                E = t.windowWidth,
                S = t.windowHeight,
                C = t.nsId,
                k = void 0 === C ? 0 : C,
                M = t.sjId,
                I = void 0 === M ? 0 : M,
                O = t.fileName,
                L = t["preview-url"],
                U = this.state,
                W = U.scaleFactor,
                B = U.fitScaleFactor,
                V = W || B;
            return n.default.createElement("div", {
                className: i.default("flex-preview-container", "image-visible", "annotations-visible", s.default.PREVIEW_IMAGE_CONTAINER, {
                    "zoom-disabled": this.shouldDisableZoom(),
                    "has-toolbar": p
                })
            }, n.default.createElement(P.PreviewImage, {
                previewMetadata: {
                    content: {
                        ".tag": "image",
                        default_src: b.getFallbackSrc(L),
                        src_set: b.getSrcSet(L),
                        full_size_src: l.fullSizeUrl(L),
                        thumbnail_url_tmpl: L
                    }
                },
                fileMetadata: {
                    file_id: T.getFileRevisionId({
                        ns_id: k,
                        sjid: I
                    }),
                    file_name: O
                },
                fileInfo: {
                    ns_id: k,
                    sj_id: I,
                    file_id: T.getFileRevisionId({
                        ns_id: k,
                        sjid: I
                    }),
                    bootstrap: {
                        state: "ready"
                    }
                },
                currentMode: o,
                data: void 0,
                filePreviewUiData: {
                    zoomScaleFactor: W,
                    fitScaleFactor: B || 0,
                    isSidebarOpen: !1
                },
                coreFileViewerUiData: {
                    isDocSidebarOpen: !1
                },
                fileViewerId: "",
                intl: K,
                dispatch: j,
                config: _.DEFAULT_CONFIG,
                contextMenuDisabled: !!w,
                onDoubleClick: this.onImageDoubleClick,
                onInteractive: this.logTTI,
                onRenderSucceeded: this.logRenderSuccess,
                onRenderFailed: this.logRenderFailure,
                sizerClassName: s.default.PREVIEW_IMAGE,
                className: i.default(s.default.PREVIEW_IMAGE_WRAPPER, "preview-content"),
                width: +E,
                height: +S,
                layerRenderFn: this.renderLayers,
                onFitScaleFactorChanged: this.handleFitScaleFactorChange,
                resolveAsset: q
            }), !m && n.default.createElement(F.KeyboardBindingConnector, {
                keyboardBindings: this.keyboardBindings
            }), !m && p && n.default.createElement(y.PreviewToolbar, {
                isFullscreen: !!h
            }, f ? n.default.createElement(A.ToolbarFlipButtons, {
                index: a,
                count: r,
                onClickPrevious: u && this.handleClickPrevious,
                onClickNext: c && this.handleClickNext
            }) : null, n.default.createElement(x.ZoomOutButton, {
                className: "toolbar-button-entry",
                disabled: null != V && null != B && V <= B,
                intl: K,
                onClick: this.onZoomOut,
                onKeyUp: function(t) {
                    t.keyCode === N.KeyCode.ENTER && e.onZoomOut()
                }
            }), n.default.createElement(x.ZoomToFitButton, {
                className: "zoom-label toolbar-button-entry",
                intl: K,
                onClick: this.onZoomOriginalOrFit,
                zoomPercent: V
            }), n.default.createElement(x.ZoomInButton, {
                className: "toolbar-button-entry",
                disabled: null != V && V >= 16,
                intl: K,
                onClick: this.onZoomIn,
                onKeyUp: function(t) {
                    t.keyCode === N.KeyCode.ENTER && e.onZoomIn()
                }
            }), n.default.createElement(x.FullScreenButton, {
                className: "toolbar-button-entry",
                intl: K,
                onClick: function() {
                    return g.toggleFullScreen(!!h, d.UserActionContext.Toolbar)
                }
            }), n.default.createElement(D.PreviewToolbarButton, {
                "data-test": "print",
                disabled: !R.canPrint(v),
                spriteGroup: "web",
                spriteName: "print",
                tooltip: R.getPrintTooltip(v),
                onClick: R.canPrint(v) ? function() {
                    return e.onPrint(d.UserActionContext.Toolbar)
                } : j
            })))
        }, o
    })(n.default.Component);
    t._PreviewImage = H;
    var z = C.requireCssWithComponent((function(e) {
            return n.default.createElement(k.Dimensions, {
                className: "flex-preview-container"
            }, (function(t) {
                var i = t.width,
                    o = t.height;
                return n.default.createElement(H, r.__assign({}, e, {
                    windowHeight: o,
                    windowWidth: i
                }))
            }))
        }), ["/static/css/preview_image-vfl6CN2zA.css"]),
        G = o.connect((function(e) {
            return {
                isFlippingEnabled: m.getIsFlippingEnabled(e),
                annotationAllowed: m.getAnnotationAllowed(e),
                isEditMode: m.getIsEditMode(e),
                isWatermarkingMode: m.getIsWatermarkingMode(e),
                isMarkupMode: m.getIsMarkupMode(e)
            }
        }), {
            overflowZoomOn: f.overflowZoomOn,
            overflowZoomOff: f.overflowZoomOff
        })(z);
    t.PreviewImage = G
})), define("modules/clean/react/previews/video/preview_video_basic", ["require", "exports", "tslib", "classnames", "external/lodash", "react", "modules/clean/image_size", "modules/clean/keycode", "modules/clean/loggers/file_preview_logger", "modules/clean/loggers/video_preview_logger", "modules/clean/previews/util", "modules/clean/react/async/loadable", "modules/clean/react/css", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/file_preview_event_emitter", "modules/clean/react/helpers", "modules/clean/react/keyboard_binding/keyboard_binding", "modules/clean/react/keyboard_binding/keyboard_binding_connector", "modules/clean/react/previews/constants", "modules/clean/react/previews/video/constants", "modules/clean/web_timing_logger", "modules/core/browser_detection", "modules/core/uri", "modules/clean/react/previews/video/utils", "modules/clean/react/file_viewer/data/actions", "react-redux"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importStar(n), o = r.__importDefault(o), b = r.__importStar(b), t.AsyncVideoPlayer = d.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/previews/video/video_player"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.VideoPlayer
            }))
        }
    });
    var P = (function(e) {
        function d() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.lastPlaybackRate = 1, t.startsPlayingEvent = w.VideoPreviewEvent.VideoStartsPlaying, t.onEmbed = function() {
                t.logFilePreviewTimelineEvent(m.EventType.FilePreviewSupportConfirmed), t.logFilePreviewTimelineEvent(m.EventType.FilePreviewDownloadAttempted)
            }, t.onLoadedMetadata = function(e) {
                void 0 === e && (e = 0), t.videoLogger.populateVideoDuration(e)
            }, t.onReady = function(e) {
                void 0 === e && (e = !1), t.logFilePreviewTimelineEvent(m.EventType.FilePreviewDownloadSucceeded), t.props.filePreviewSession && t.props.filePreviewSession.markPrimaryEvent(), b.mark_time_to_view(), b.mark_time_to_interactive(), t.markRenderSucceeded(), t.videoLogger.logEvent(w.VideoPreviewEvent.PlayerRendered)
            }, t.logPlay = n.once((function() {
                t.videoLogger.logEvent(w.VideoPreviewEvent.FirstClickPlay)
            })), t.onPlay = function() {
                var e = t.props.setMediaPlaying;
                t.logPlay(), e && e()
            }, t.onPause = function(e) {
                var r = t.props.setMediaPaused;
                r && r(), t.videoLogger.logEvent(w.VideoPreviewEvent.VideoPaused, {
                    video_timestamp: e.toString()
                })
            }, t.onStartsPlaying = function(e) {
                t.videoLogger.logEvent(t.startsPlayingEvent, {
                    play_latency: e.latency.toString(),
                    play_latency_since: e.trigger
                }), t.startsPlayingEvent = w.VideoPreviewEvent.VideoResumesPlaying
            }, t.onUserInactive = function(e) {
                e !== t.lastPlaybackRate && (t.lastPlaybackRate = e, t.logUserAction(m.UserAction.VideoPlaybackRateChanged, {
                    playback_rate: e.toString()
                }))
            }, t.onScrubberThumbnailsLoaded = function(e) {
                e ? t.videoLogger.logEvent(w.VideoPreviewEvent.ScrubberThumbnailsLoaded) : t.videoLogger.logEvent(w.VideoPreviewEvent.ScrubberThumbnailsFailed)
            }, t.onAudioWaveformLoaded = function() {
                t.videoLogger.logEvent(w.VideoPreviewEvent.AudioWaveformLoaded)
            }, t.onAudioWaveformFailed = function() {
                t.videoLogger.logEvent(w.VideoPreviewEvent.AudioWaveformFailed)
            }, t.onError = function(e) {
                if (e && (t.videoLogger.logEvent(w.VideoPreviewEvent.MediaError, {
                        errorCode: e.code ? e.code.toString() : "",
                        errorMessage: e.message || ""
                    }), "needflash" === e.message)) return t.logFilePreviewTimelineEvent(m.EventType.FilePreviewSupportDenied), void("function" == typeof t.props.onError && t.props.onError(_.ErrorType.NeedFlashError));
                t.logFilePreviewTimelineEvent(m.EventType.FilePreviewDownloadFailed), b.mark_time_to_view(), b.mark_time_to_interactive(), t.props.onError && t.props.onError(_.ErrorType.LoadError)
            }, t.onPlaybackRateChange = function(e, r) {
                t.videoLogger.logEvent(w.VideoPreviewEvent.ChangePlaybackRate, {
                    old_playback_rate: e.toString(),
                    new_playback_rate: r.toString()
                })
            }, t.onSeek = function(e, r) {
                t.videoLogger.logEvent(w.VideoPreviewEvent.SeekVideo, {
                    old_video_time: e.toString(),
                    new_video_time: r.toString()
                })
            }, t.onStalled = function(e, r) {
                t.videoLogger.logEvent(w.VideoPreviewEvent.VideoStalled, {
                    video_timestamp: e.toString(),
                    playback_rate: r.toString()
                })
            }, t.onTruncated = function() {
                f.filePreviewEventEmitter.emit(m.EventType.FilePreviewVideoTruncated), t.videoLogger.setVideoTruncated()
            }, t.onClose = function(e) {
                t.videoLogger.logEvent(w.VideoPreviewEvent.ClosePreview, {
                    video_time_on_close: e.toString()
                })
            }, t.onSelectQuality = function(e, r) {
                t.videoLogger.logEvent(w.VideoPreviewEvent.ChangeVideoQuality, {
                    old_video_quality: e,
                    new_video_quality: r
                })
            }, t.handleKeyPress = function(e) {
                return e.keyCode === s.KeyCode.SPACE && (t.togglePlayback(), e.preventDefault(), !0)
            }, t.keyboardBindings = [{
                keyboardEventCriteria: h.generateUnmodifiedKeyboardEventCriteria(s.KeyCode.SPACE),
                callback: t.handleKeyPress
            }], t.processGutterClick = function(e) {
                var r = t.props.onGutterClick;
                r && e.target === e.currentTarget && r()
            }, t
        }
        return r.__extends(d, e), d.prototype.setUpLoggers = function() {
            this.teardownLoggers(), this.userActionLogger = new l.FilePreviewUserActionLogger, this.userActionLogger.listenTo(f.filePreviewEventEmitter), this.videoLogger = new c.VideoPreviewLogger(this.props.fileExtension, this.props.filePreviewSession)
        }, d.prototype.teardownLoggers = function() {
            this.userActionLogger && (this.userActionLogger.unlistenTo(f.filePreviewEventEmitter), delete this.userActionLogger)
        }, d.prototype.logFilePreviewTimelineEvent = function(e) {
            this.props.filePreviewSession && this.props.filePreviewSession.recordEvent(e)
        }, d.prototype.logUserAction = function(e, t) {
            f.filePreviewEventEmitter.emit(m.EventType.FilePreviewUserAction, this.props.filePreviewSession, e, m.UserActionContext.VideoPlayer, t)
        }, d.prototype.markRenderSucceeded = function() {
            this.logFilePreviewTimelineEvent(m.EventType.FilePreviewRenderSucceeded), this.props.setRenderStatusSuccess()
        }, d.prototype.getPlaybackRates = function() {
            return [.5, 1, 1.25, 1.5, 2, 4]
        }, d.prototype.componentDidMount = function() {
            this.setUpLoggers()
        }, d.prototype.componentWillUnmount = function() {
            this.teardownLoggers()
        }, d.prototype.shouldComponentUpdate = function(e) {
            return g.compareStateAndProps(e, {})
        }, d.prototype.togglePlayback = function() {
            f.filePreviewEventEmitter.emit(m.EventType.FilePreviewVideoToggled)
        }, d.prototype.render = function() {
            var e = this.props,
                n = e.title,
                s = e.previewUrl,
                l = e.separateResolutionUrls,
                c = e.sourceContext,
                d = e.thumbnailUrlTmpl,
                p = e.videoMetadataUrl,
                m = e.videoContainer,
                f = e.vttThumbnailsUrl,
                g = e.waveformUrl,
                h = S.video_type(m),
                w = c !== _.PreviewSourceContext.EmbeddedSharedLinkFile,
                b = !1,
                C = !1,
                k = 0;
            y.is_mobile_or_tablet() && (b = !0, C = !0, k = 1);
            var P = {
                preload: "auto",
                playbackRates: this.getPlaybackRates(),
                nativeControlsForTouch: C,
                playsinline: k
            };
            null != d && (P.poster = u.tagCriticalPathContentRequest((function(e) {
                return E.URI.parse(e).updateQuery({
                    size: a.imageBestFitSize(window.innerWidth, window.innerHeight),
                    size_mode: "2"
                }).toString()
            })(d), this.props.filePreviewSession));
            var M = {
                videoProps: {
                    src: s,
                    separateResolutionSrcs: l,
                    sourceContentType: h,
                    metadataLink: p,
                    title: n,
                    vttThumbnailsUrl: f,
                    waveformUrl: g
                },
                playerCallbacks: {
                    onLoadedMetadata: this.onLoadedMetadata,
                    onError: this.onError,
                    onReady: this.onReady,
                    onPlay: this.onPlay,
                    onPause: this.onPause,
                    onStartsPlaying: this.onStartsPlaying,
                    onUserInactive: this.onUserInactive,
                    onScrubberThumbnailsLoaded: this.onScrubberThumbnailsLoaded,
                    onAudioWaveformLoaded: this.onAudioWaveformLoaded,
                    onAudioWaveformFailed: this.onAudioWaveformFailed,
                    onPlaybackRateChange: this.onPlaybackRateChange,
                    onSeek: this.onSeek,
                    onStalled: this.onStalled,
                    onSelectQuality: this.onSelectQuality,
                    onTimeUpdate: this.props.onTimeUpdate
                },
                playerOptions: P,
                seekPosition: this.props.seekPosition,
                shouldEnableControls: !this.props.hideControls,
                noDownload: b,
                shouldFocusOnReady: this.props.shouldFocusOnReady,
                onEmbed: this.onEmbed,
                onTruncated: this.onTruncated,
                onClose: this.onClose,
                shouldShowTruncationMessage: w,
                isAudio: this.props.isAudio,
                bytes: this.props.bytes,
                showOnboarding: !!this.props.showOnboarding,
                playerIntegrationEnabled: !!this.props.playerIntegrationEnabled
            };
            return o.default.createElement("div", {
                className: i.default({
                    "flex-preview-container": !0,
                    "touch-device": y.is_mobile_or_tablet()
                })
            }, this.props.disableKeyboardShortcuts ? null : o.default.createElement(v.KeyboardBindingConnector, {
                keyboardBindings: this.keyboardBindings
            }), o.default.createElement("div", {
                className: "preview-content preview-video",
                onClick: this.processGutterClick
            }, o.default.createElement("div", {
                className: "preview-video__wrapper"
            }, o.default.createElement("div", {
                className: i.default({
                    "preview-video__aspect-container": !0,
                    "preview-audio-transcoded": this.props.isAudio
                })
            }, o.default.createElement("div", {
                className: "preview-video__container"
            }, o.default.createElement(t.AsyncVideoPlayer, r.__assign({}, M)))))))
        }, d
    })(o.default.Component);
    t._PreviewVideoBasic = P;
    var M = k.connect(void 0, {
            setMediaPlaying: C.setMediaPlaying,
            setMediaPaused: C.setMediaPaused
        })(P),
        T = p.requireCssWithComponent(M, ["/static/css/preview_video-vfljF09ZK.css", "/static/css/video-js-7-custom-v1-vflPxBbOb.css"]);
    t.PreviewVideoBasic = T
})), define("modules/clean/react/previews/error/view", ["require", "exports", "tslib", "classnames", "react", "modules/clean/react/previews/preview_toolbar", "modules/clean/file_store/utils", "modules/clean/react/file_viewer/actionable", "modules/clean/react/file_viewer/constants", "modules/clean/react/previews/constants", "modules/clean/react/previews/error/file_info", "modules/clean/react/previews/error/image", "modules/clean/react/previews/error/message", "modules/core/i18n", "modules/clean/react/previews/toolbar_flip_buttons"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), t.PreviewErrorView = function(e) {
        var t = e.areActionablesEnabled,
            r = e.allowOpenInApp,
            m = e.count,
            h = e.errorType,
            v = e.extensionsEnabled,
            _ = e.file,
            w = e.filename,
            b = e.index,
            y = e.message,
            E = e.onNext,
            S = e.onPrevious,
            C = e.preview,
            k = e.sharedLinkInfo,
            P = e.shareToken,
            M = e.sharePermission,
            T = e.shouldDisplayToolbar,
            A = e.sizeClass,
            x = e.user;
        return n.default.createElement("div", {
            className: i.default({
                "preview-content": !0,
                "preview-content--center": !0,
                "preview-error": !0,
                "has-toolbar": T
            })
        }, n.default.createElement("div", {
            className: "preview-error__wrapper"
        }, n.default.createElement("div", {
            className: "preview-error__content"
        }, n.default.createElement(d.PreviewErrorImage, {
            errorType: h
        }), n.default.createElement(p.PreviewErrorMessage, {
            file: _,
            preview: C,
            errorType: h,
            message: y
        }), n.default.createElement(u.PreviewErrorFileInfo, {
            filename: w,
            bytes: _.bytes
        }), t ? n.default.createElement(s.Actionable, {
            allowOpenInApp: !!r,
            extensionsEnabled: v,
            file: _,
            variant: "primary",
            location: l.FileViewerPane.PreviewContent,
            sharedLinkInfo: k,
            shareToken: P,
            sharePermission: M,
            user: x,
            userActionContext: l.UserActionContext.PreviewContentMain,
            sizeClass: A
        }) : null, h !== c.ErrorType.ExtensionError || a.isArchiveFile(_) ? null : n.default.createElement(g, null)), T && null != b && null != m ? n.default.createElement("div", {
            className: "preview-toolbar-container"
        }, n.default.createElement(o.PreviewToolbar, {
            isFullscreen: !1
        }, n.default.createElement(f.ToolbarFlipButtons, {
            index: b,
            count: m,
            onClickPrevious: S,
            onClickNext: E
        }))) : null))
    };
    var g = function() {
        return n.default.createElement("div", {
            className: "preview-error__help-link"
        }, n.default.createElement("a", {
            href: l.UnsupportedExtensionHelpLink,
            target: "_blank",
            rel: "noopener\n    noreferrer"
        }, m.intl.formatMessage({
            defaultMessage: "Learn more."
        })))
    }
})), define("modules/clean/react/previews/error/upsell", ["require", "exports", "tslib", "classnames", "react", "modules/clean/react/file_viewer/actionable", "modules/clean/react/file_viewer/constants", "modules/clean/react/previews/error/file_info", "modules/clean/react/previews/error/image", "modules/clean/react/previews/error/message", "modules/core/i18n", "modules/clean/react/file_viewer/file_preview_event_emitter", "modules/clean/react/previews/preview_toolbar", "modules/clean/react/previews/toolbar_flip_buttons"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i);
    var f = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.onClickCTA = function() {
                t.props.filePreviewSession && d.filePreviewEventEmitter.emit(a.EventType.FilePreviewUpsellClicked, t.props.filePreviewSession)
            }, t
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.props.filePreviewSession && d.filePreviewEventEmitter.emit(a.EventType.FilePreviewUpsellExposed, this.props.filePreviewSession)
        }, t.prototype.render = function() {
            return n.default.createElement("div", {
                className: i.default({
                    "preview-content": !0,
                    "preview-content--center": !0,
                    "preview-error": !0,
                    "has-toolbar": this.props.shouldDisplayToolbar
                })
            }, n.default.createElement("div", {
                className: "preview-error__wrapper"
            }, n.default.createElement("div", {
                className: "preview-error__content"
            }, n.default.createElement(l.PreviewErrorImage, {
                errorType: this.props.errorType
            }), n.default.createElement(c.PreviewErrorMessage, {
                file: this.props.file,
                preview: this.props.preview,
                errorType: this.props.errorType
            }), n.default.createElement(s.PreviewErrorFileInfo, {
                filename: this.props.filename,
                bytes: this.props.file.bytes
            }), this.props.areActionablesEnabled ? n.default.createElement("div", {
                className: "preview-error__upsell-cta"
            }, n.default.createElement(o.Actionable, {
                allowOpenInApp: !!this.props.allowOpenInApp,
                extensionsEnabled: this.props.extensionsEnabled,
                file: this.props.file,
                variant: "primary",
                location: a.FileViewerPane.PreviewContent,
                sharedLinkInfo: this.props.sharedLinkInfo,
                shareToken: this.props.shareToken,
                sharePermission: this.props.sharePermission,
                user: this.props.user,
                userActionContext: a.UserActionContext.PreviewContentMain,
                sizeClass: this.props.sizeClass
            })) : null, n.default.createElement("div", {
                className: "preview-error__help-link"
            }, n.default.createElement("a", {
                href: a.PreviewsUpsellUrl,
                onClick: this.onClickCTA
            }, u.intl.formatMessage({
                defaultMessage: "Upgrade"
            }))), this.props.shouldDisplayToolbar && null != this.props.index && null != this.props.count ? n.default.createElement("div", {
                className: "preview-toolbar-container"
            }, n.default.createElement(p.PreviewToolbar, {
                isFullscreen: !1
            }, n.default.createElement(m.ToolbarFlipButtons, {
                index: this.props.index,
                count: this.props.count,
                onClickPrevious: this.props.onPrevious,
                onClickNext: this.props.onNext
            }))) : null)))
        }, t
    })((n = r.__importDefault(n)).default.Component);
    t.PreviewUpsellErrorView = f
})), define("modules/clean/react/previews/error/fullscreen_view", ["require", "exports", "tslib", "react", "modules/clean/react/css", "modules/clean/react/file_viewer/actionable", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/full_screen_helpers", "modules/clean/react/previews/error/file_info", "modules/clean/react/previews/error/message", "modules/clean/react/previews/preview_zoom_container"], (function(e, t, r, i, n, o, a, s, l, c, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i);
    var d = n.requireCssWithComponent((function(e) {
        var t = e.allowOpenInApp,
            r = e.areActionablesEnabled,
            n = e.count,
            d = e.errorType,
            p = e.extensionsEnabled,
            m = e.file,
            f = e.filename,
            g = e.index,
            h = e.message,
            v = e.onNext,
            _ = e.onPrevious,
            w = e.preview,
            b = e.sharedLinkInfo,
            y = e.shareToken,
            E = e.sharePermission,
            S = e.user;
        return i.default.createElement(u.PreviewZoomContainer, {
            fileCount: n,
            fileIndex: g,
            onClose: s.exitFullScreen,
            onFlipNext: v,
            onFlipPrevious: _,
            renderZoomControls: !1
        }, i.default.createElement("div", {
            className: "preview-error--fullscreen fullscreen"
        }, i.default.createElement(c.PreviewErrorMessage, {
            file: m,
            preview: w,
            errorType: d,
            message: h
        }), i.default.createElement(l.PreviewErrorFileInfo, {
            bytes: m.bytes,
            filename: f
        }), r ? i.default.createElement(o.Actionable, {
            allowOpenInApp: !!t,
            extensionsEnabled: p,
            file: m,
            variant: "primary",
            location: a.FileViewerPane.PreviewContent,
            sharedLinkInfo: b,
            shareToken: y,
            sharePermission: E,
            user: S,
            userActionContext: a.UserActionContext.PreviewContentMain
        }) : null))
    }), ["/static/css/preview_image-vfl6CN2zA.css", "/static/css/preview_error-vfl4ZhJ3a.css"]);
    t.PreviewErrorFullscreenView = d
})), define("modules/clean/average_counter", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = (function() {
        function e() {
            this.average = 0, this.count = 0
        }
        return e.prototype.getAverage = function() {
            return this.average
        }, e.prototype.add = function(e) {
            this.average = (this.average * this.count + e) / (this.count + 1), this.count++
        }, e.prototype.addArray = function(e) {
            var t = e.reduce((function(e, t) {
                    return e + t
                })),
                r = this.count + e.length;
            this.average = (this.average * this.count + t) / r, this.count = r
        }, e
    })();
    t.AverageCounter = r
})), define("modules/clean/callback_chain/callback_chain", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = (function() {
        function e(e) {
            this.callbacks = e
        }
        return e.prototype.run = function(e) {
            for (var t = (function(e) {
                    return void 0 !== e.abortCallbackChain
                })(e) ? e : (function(e) {
                    var t = e,
                        r = !1;
                    return t.abortCallbackChain = function() {
                        r = !0
                    }, Object.defineProperty(t, "callbackChainAborted", {
                        get: function() {
                            return r
                        }
                    }), t
                })(e), r = 0, i = this.callbacks; r < i.length; r++) {
                var n = i[r];
                if (t.callbackChainAborted) break;
                n(t)
            }
        }, e
    })();
    t.CallbackChain = r
})), define("modules/clean/react/file_action_button_group", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.COMMENTS = "COMMENTS", e.WATERMARKING = "WATERMARKING"
    })(t.FileActionButtonGroup || (t.FileActionButtonGroup = {}))
})), define("modules/clean/react/file_action_button_type", ["require", "exports", "modules/core/i18n"], (function(e, t, r) {
    "use strict";
    var i;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FileActionButtonType = {
        COMMENT: "COMMENT",
        COPY: "COPY",
        DELETE: "DELETE",
        DOWNLOAD: "DOWNLOAD",
        MOVE: "MOVE",
        OPEN: "OPEN",
        PREVIOUS_VERSIONS: "PREVIOUS_VERSIONS",
        REMOVE_LINK: "REMOVE_LINK",
        RENAME: "RENAME",
        SHARE: "SHARE",
        ENABLE_COMMENTS: "ENABLE_COMMENTS",
        DISABLE_COMMENTS: "DISABLE_COMMENTS",
        SHOW_RESOLVED_COMMENTS: "SHOW_RESOLVED_COMMENTS",
        HIDE_RESOLVED_COMMENTS: "HIDE_RESOLVED_COMMENTS",
        SUBSCRIBE: "SUBSCRIBE",
        SUBSCRIBE_TO_NOTIFICATIONS: "SUBSCRIBE_TO_NOTIFICATIONS",
        UNSUBSCRIBE: "UNSUBSCRIBE",
        UNSUBSCRIBE_FROM_NOTIFICATIONS: "UNSUBSCRIBE_FROM_NOTIFICATIONS",
        ENABLE_WATERMARKING: "ENABLE_WATERMARKING",
        REMOVE_WATERMARKING: "REMOVE_WATERMARKING"
    };
    var n = ((i = {})[t.FileActionButtonType.COMMENT] = r.intl.formatMessage({
        defaultMessage: "Comment",
        description: "text in button"
    }), i[t.FileActionButtonType.COPY] = r.intl.formatMessage({
        defaultMessage: "Copy…",
        description: "text in button"
    }), i[t.FileActionButtonType.DELETE] = r.intl.formatMessage({
        defaultMessage: "Delete…",
        description: "text in button"
    }), i[t.FileActionButtonType.DOWNLOAD] = r.intl.formatMessage({
        defaultMessage: "Download",
        description: "text in button"
    }), i[t.FileActionButtonType.MOVE] = r.intl.formatMessage({
        defaultMessage: "Move…",
        description: "text in button"
    }), i[t.FileActionButtonType.OPEN] = r.intl.formatMessage({
        defaultMessage: "Open",
        description: "text in button"
    }), i[t.FileActionButtonType.PREVIOUS_VERSIONS] = r.intl.formatMessage({
        defaultMessage: "Version history",
        description: "text in button"
    }), i[t.FileActionButtonType.REMOVE_LINK] = r.intl.formatMessage({
        defaultMessage: "Remove link",
        description: "text in button"
    }), i[t.FileActionButtonType.RENAME] = r.intl.formatMessage({
        defaultMessage: "Rename",
        description: "text in button"
    }), i[t.FileActionButtonType.SHARE] = r.intl.formatMessage({
        defaultMessage: "Share",
        description: "text in button"
    }), i[t.FileActionButtonType.ENABLE_COMMENTS] = r.intl.formatMessage({
        defaultMessage: "Enable comments",
        description: "text in button"
    }), i[t.FileActionButtonType.DISABLE_COMMENTS] = r.intl.formatMessage({
        defaultMessage: "Disable comments",
        description: "text in button"
    }), i[t.FileActionButtonType.SHOW_RESOLVED_COMMENTS] = r.intl.formatMessage({
        defaultMessage: "Show resolved comments",
        description: "text in button"
    }), i[t.FileActionButtonType.HIDE_RESOLVED_COMMENTS] = r.intl.formatMessage({
        defaultMessage: "Hide resolved comments",
        description: "text in button"
    }), i[t.FileActionButtonType.SUBSCRIBE] = r.intl.formatMessage({
        defaultMessage: "Subscribe",
        description: "text in button"
    }), i[t.FileActionButtonType.SUBSCRIBE_TO_NOTIFICATIONS] = r.intl.formatMessage({
        defaultMessage: "Subscribe to notifications",
        description: "text in button"
    }), i[t.FileActionButtonType.UNSUBSCRIBE] = r.intl.formatMessage({
        defaultMessage: "Unsubscribe",
        description: "text in button"
    }), i[t.FileActionButtonType.UNSUBSCRIBE_FROM_NOTIFICATIONS] = r.intl.formatMessage({
        defaultMessage: "Unsubscribe from notifications",
        description: "text in button"
    }), i[t.FileActionButtonType.ENABLE_WATERMARKING] = r.intl.formatMessage({
        defaultMessage: "Enable watermarking",
        description: "text in button"
    }), i[t.FileActionButtonType.REMOVE_WATERMARKING] = r.intl.formatMessage({
        defaultMessage: "Remove watermarking",
        description: "text in button"
    }), i);
    t.getFileActionButtonText = function(e) {
        return e && n[e] ? n[e] : null
    }
})), define("modules/clean/react/file_viewer/more_dropdown/models", ["require", "exports", "tslib", "external/lodash"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i);
    var n = (function() {
            function e() {}
            return e.prototype.equals = function(e) {
                return i.isEqual(this, e)
            }, e
        })(),
        o = (function(e) {
            function t(t) {
                void 0 === t && (t = {});
                var r = e.call(this) || this;
                return r.className = t.className || null, r.fileActionButtonType = t.fileActionButtonType || null, r.handler = t.handler || i.noop, r.component = t.component || null, r.sortWeight = t.sortWeight || 0, r
            }
            return r.__extends(t, e), t
        })(n);
    t.MoreOption = o;
    var a = (function(e) {
        function t(t) {
            var r = e.call(this) || this;
            return r.fileActionButtonGroup = t.fileActionButtonGroup, r.options = t.options || [], r.sortWeight = t.sortWeight || 0, r
        }
        return r.__extends(t, e), t
    })(n);
    t.MoreOptionGroup = a
})), define("modules/clean/react/file_viewer/more_dropdown/more_option_registry", ["require", "exports", "tslib", "external/lodash", "modules/clean/react/file_viewer/more_dropdown/models"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i);
    var o = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.options = [], t
        }
        return r.__extends(t, e), t.prototype.isValidMoreOption = function(e) {
            return null != e.fileActionButtonType
        }, t.prototype.isValidMoreOptionGroup = function(e) {
            var t = this,
                r = e.options;
            return r.length && r.every((function(e) {
                return t.isValidMoreOption(e)
            }))
        }, t.prototype.isValidOption = function(e) {
            return e instanceof n.MoreOption && this.isValidMoreOption(e) || e instanceof n.MoreOptionGroup && this.isValidMoreOptionGroup(e)
        }, t.prototype.reset = function() {
            this.options = [], this.removeListeners()
        }, t.prototype.getOptionItems = function() {
            return i.sortBy(this.options.slice(), (function(e) {
                return e.sortWeight
            }))
        }, t.prototype.addOption = function(e) {
            if (!this.isValidOption(e)) throw new Error("Option needs to be a valid MoreOption or MoreOptionGroup");
            this.options = r.__spreadArrays(this.options, [e]), this.emitChange()
        }, t.prototype.removeOption = function(e) {
            if (null != e && !this.isValidOption(e)) throw new Error("Option needs to be a valid MoreOption or MoreOptionGroup");
            var t, r, i = this.options.length;
            this.options = (t = this.options, r = e, t.filter((function(e) {
                return e !== r
            }))), this.options.length < i && this.emitChange()
        }, t.prototype.replaceOption = function(e, t) {
            if (null == t) throw new Error("Please provide option to replace it with. Otherwise use removeOption");
            if (!this.isValidOption(e) || !this.isValidOption(t)) throw new Error("Option needs to be a valid MoreOption or MoreOptionGroup");
            if (!e.equals(t)) {
                var r = !1;
                this.options = this.options.map((function(i) {
                    return i === e ? (r = !0, t) : i
                })), r && this.emitChange()
            }
        }, t
    })((function() {
        function e() {
            this.listeners = []
        }
        return e.prototype.emitChange = function() {
            return this.listeners.forEach((function(e) {
                return e()
            }))
        }, e.prototype.addListener = function(e) {
            var t = this;
            return this.listeners.push(e),
                function() {
                    var r = t.listeners.indexOf(e);
                    r > -1 && t.listeners.splice(r, 1)
                }
        }, e.prototype.removeListeners = function() {
            this.listeners = []
        }, e
    })());
    t.MoreOptionRegistry = o, t.moreOptionRegistry = new o
})), define("modules/clean/react/file_viewer/actionable", ["require", "exports", "tslib", "react", "modules/clean/file_store/utils", "modules/clean/react/open_in_app/button", "modules/clean/react/share_download/button", "modules/clean/react/app_actions/app_actions_menu", "modules/clean/react/extensions/data/types", "modules/clean/react/file_viewer/open_button/open_button"], (function(e, t, r, i, n, o, a, s, l, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.Actionable = function(e) {
        var t, r = e.allowOpenInApp,
            u = e.extensionsEnabled,
            d = e.variant,
            p = e.location,
            m = e.sizeClass,
            f = e.user,
            g = e.userActionContext;
        return n.isSharedFile(e.file) ? (t = e.file, r && t.open_in_app_data ? i.default.createElement(o.OpenInAppButton, {
            urls: t.open_in_app_data,
            userActionContext: g
        }) : i.default.createElement(a.ShareDownloadButton, {
            copyable: t,
            importance: d,
            location: p,
            sharedLinkInfo: e.sharedLinkInfo,
            shareToken: e.shareToken,
            sharePermission: e.sharePermission,
            user: f
        })) : f ? (t = e.file, u ? i.default.createElement(s.ExtensionsMenu, {
            file: t,
            user: f,
            showAsButtonIfDownloadOnly: !0,
            triggerType: l.TriggerType.PrimaryButton,
            telemetryContext: {
                surface: "previews"
            },
            onPresentInZoom: function() {}
        }) : i.default.createElement(c.OpenButton, {
            file: t,
            user: f,
            justifyRight: !1,
            location: p,
            buttonVariant: d,
            sizeClass: m
        })) : null
    }
})), define("modules/clean/react/file_viewer/app_download_interstitial/file_preview_app_download_interstitial", ["require", "exports", "tslib", "react", "modules/clean/analytics", "modules/clean/react/file_viewer/constants", "modules/clean/file_store/utils", "modules/clean/react/file_viewer/models", "modules/clean/react/previews/constants", "modules/clean/web_timing_logger", "modules/clean/react/file_viewer/app_download_interstitial/app_download_interstitial"], (function(e, t, r, i, n, o, a, s, l, c, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var d = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.onContinue = function() {
                t.log(o.UserAction.AppDownloadInterstitialContinue), "function" == typeof t.props.onContinue && t.props.onContinue()
            }, t.onClose = function() {
                t.log(o.UserAction.AppDownloadInterstitialClose), "function" == typeof t.props.onClose && t.props.onClose()
            }, t.onAppDownload = function() {
                t.log(o.UserAction.AppDownloadInterstitialInstall)
            }, t
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            c.mark_time_to_interactive(), this.setupLogger(), this.filePreviewSession.markPrimaryEvent(), this.log(o.UserAction.AppDownloadInterstitialView)
        }, t.prototype.componentWillReceiveProps = function(e) {
            e.file.ns_id === this.props.file.ns_id && e.file.sjid === this.props.file.sjid && e.fileViewerSession === this.props.fileViewerSession || this.setupLogger(e)
        }, t.prototype.setupLogger = function(e) {
            void 0 === e && (e = this.props);
            var t = this.props,
                r = t.file,
                i = t.fileViewerSession,
                n = t.previewType,
                o = t.previewSourceAction,
                a = void 0 === o ? l.PreviewSourceAction.Visit : o,
                c = t.previewSourceContext,
                u = void 0 === c ? l.PreviewSourceContext.SharedLinkFile : c;
            i && (this.filePreviewSession = new s.FilePreviewSession({
                file: r,
                previewType: n,
                fileViewerSession: i,
                sourceAction: a,
                sourceContext: u
            }))
        }, t.prototype.log = function(e) {
            var t = this.props,
                r = t.fileViewerSession,
                i = t.file;
            this.filePreviewSession && r && i.ns_id && i.sjid && n.MobileFilePreviewLogger.log(e, r.id, this.filePreviewSession.id, i.ns_id, i.sjid, {
                context: o.UserActionContext.AppDownloadInterstitial
            })
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.file,
                n = e.sharedLinkInfo,
                o = r.__rest(e, ["file", "sharedLinkInfo"]);
            return i.default.createElement(u.AppDownloadInterstitial, r.__assign({
                fileOrFolderName: a.getFilename(t),
                open_in_app_data: t.open_in_app_data,
                onContinue: this.onContinue,
                onAppDownload: this.onAppDownload,
                ownerName: n.ownerName,
                ownerTeamName: n.ownerTeamName,
                onClose: this.onClose
            }, o))
        }, t
    })((i = r.__importDefault(i)).default.PureComponent);
    t.FilePreviewAppDownloadInterstitial = d
})), define("modules/clean/react/file_viewer/cloud_doc_preview", ["require", "exports", "tslib", "react", "modules/clean/cloud_docs/event_logging", "modules/clean/cloud_docs/types", "modules/clean/referrer_cleansing_redirect", "modules/clean/file_store/utils", "modules/clean/cloud_docs/constants"], (function(e, t, r, i, n, o, a, s, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), a = r.__importStar(a);
    var c = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            return r.logPreviewAction = function() {
                if (r.props.file.file_id) {
                    var e = {};
                    r.props.user ? n.logUserAction({
                        actionEvent: o.UserActionEventType.PREVIEW,
                        userId: r.props.user.id,
                        docPathOrId: r.props.file.file_id,
                        actionSource: o.UserActionSourceType.WEB
                    }) : (r.props.LoggedOutUXGoogleVariant && (e[l.CLOUD_DOCS_STORMCROW_LOGGED_OUT_UX_GOOGLE] = r.props.LoggedOutUXGoogleVariant || ""), r.props.LoggedOutUXPaperVariant && (e[l.CLOUD_DOCS_STORMCROW_LOGGED_OUT_UX_PAPER] = r.props.LoggedOutUXPaperVariant || ""), n.logLoggedOutUserAction({
                        actionEvent: o.UserActionEventType.PREVIEW,
                        userId: 0,
                        docPathOrId: r.props.file.file_id,
                        actionSource: o.UserActionSourceType.WEB,
                        extra: e
                    }))
                }
            }, r.shouldRedirect = !t.showCloudDocPreview && Boolean(t.cloudDoc.exit_url), r
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.logPreviewAction(), this.shouldRedirect && a.redirect(this.props.cloudDoc.exit_url)
        }, t.prototype.componentDidUpdate = function(e) {
            this.props.file.file_id !== e.file.file_id && this.logPreviewAction()
        }, t.prototype.shouldComponentUpdate = function(e) {
            return this.props.file.file_id !== e.file.file_id
        }, t.prototype.render = function() {
            if (this.shouldRedirect) return null;
            var e = s.getExtension(this.props.file);
            return ["gdoc", "gslides", "paper", "papert", "binder"].includes(e) ? this.props.renderPdfPreview(this.props.cloudDoc) : ["gsheet"].includes(e) ? this.props.renderExcelPreview() : this.props.renderUnsupportedErrorPreview()
        }, t
    })(i.default.Component);
    t.CloudDocPreview = c
})), define("modules/clean/react/file_viewer/conversions/persistent_footer", ["require", "exports", "tslib", "react", "modules/clean/auth/login_or_register/types", "modules/clean/react/modal", "modules/core/browser", "modules/clean/react/file_viewer/file_preview_event_emitter", "modules/clean/react/file_viewer/models", "modules/clean/react/file_viewer/constants", "spectrum/button", "spectrum/icon_form", "modules/core/i18n", "modules/clean/react/css", "modules/clean/react/file_viewer/logging", "modules/clean/react/file_viewer/conversions/conversion_utils", "modules/clean/previews/constants", "modules/clean/file_store/utils", "modules/clean/previews/util"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), a = r.__importStar(a);
    var w = (function(t) {
        function m() {
            var e = null !== t && t.apply(this, arguments) || this;
            return e.state = {
                isVisible: !0
            }, e
        }
        return r.__extends(m, t), m.prototype.componentDidMount = function() {
            var e = l.FilePreviewSession.currentSession;
            s.filePreviewEventEmitter.emit(c.EventType.PersistentFooterShown, e)
        }, m.prototype.showStickyBannerModal = function(t) {
            var a = this;
            new Promise((function(t, r) {
                e(["modules/clean/auth/login_or_register/modal"], t, r)
            })).then(r.__importStar).then((function(e) {
                var r = e.LoginOrRegisterModal;
                o.Modal.showInstance(i.createElement(r, {
                    downloadAction: null,
                    onCancel: function() {},
                    id: "persistent-footer-modal",
                    initialMode: t,
                    kind: n.LoginOrRegisterKind.IMMEDIATE,
                    onAuthenticateSuccess: function(e) {
                        a.redirectToCurrentPreview(e)
                    },
                    signup_tag: "persistent-footer-modal"
                }))
            }));
            var s = t === n.Mode.REGISTER ? c.UserAction.SignUp : c.UserAction.SignIn;
            f.logUserAction(s, c.UserActionContext.PersistentFooter)
        }, m.prototype.instanceOfLoggedInUserInfo = function(e) {
            return "locale" in e
        }, m.prototype.redirectToCurrentPreview = function(e) {
            this.props.sharedLinkInfo && this.instanceOfLoggedInUserInfo(e) && a.redirect(this.props.sharedLinkInfo.url)
        }, m.prototype.dismissFooter = function() {
            this.setState({
                isVisible: !1
            }, (function() {
                f.logUserAction(c.UserAction.Dismiss, c.UserActionContext.PersistentFooter)
            }))
        }, m.prototype.getPrimaryText = function() {
            switch (g.ConversionExperimentVariant()) {
                case "PF_SECURITY":
                    return p.intl.formatMessage({
                        defaultMessage: "Keep it safe in Dropbox"
                    });
                case "PF_FREE":
                    return p.intl.formatMessage({
                        defaultMessage: "It’s free to save this in Dropbox"
                    });
                case "PF_SYNC":
                    return p.intl.formatMessage({
                        defaultMessage: "Access your files on the go"
                    });
                case "PF_CONTEXT":
                    return this.isExcelOrPowerpoint() ? p.intl.formatMessage({
                        defaultMessage: "Never miss an update to this file"
                    }) : this.isImageOrPDF() ? p.intl.formatMessage({
                        defaultMessage: "Give faster feedback"
                    }) : p.intl.formatMessage({
                        defaultMessage: "Need this file later?"
                    });
                default:
                    return p.intl.formatMessage({
                        defaultMessage: "Need this file later?"
                    })
            }
        }, m.prototype.getSecondaryText = function() {
            switch (g.ConversionExperimentVariant()) {
                case "PF_CONTEXT":
                    return this.isExcelOrPowerpoint() ? p.intl.formatMessage({
                        defaultMessage: "Sign in to Dropbox so you always know when files are changed, moved, or commented on."
                    }) : this.isImageOrPDF() ? p.intl.formatMessage({
                        defaultMessage: "With Dropbox, you can add comments and give feedback on a specific part of a file."
                    }) : p.intl.formatMessage({
                        defaultMessage: "Quickly find it from any device by saving it to your own Dropbox folder."
                    });
                default:
                    return p.intl.formatMessage({
                        defaultMessage: "Quickly find it from any device by saving it to your own Dropbox folder."
                    })
            }
        }, m.prototype.isExcelOrPowerpoint = function() {
            return this.props.file && (this.props.previewType === h.PreviewType.Excel || this.props.previewType === h.PreviewType.SsrDoc && _.isPptExtension(v.getExtension(this.props.file)))
        }, m.prototype.isImageOrPDF = function() {
            return this.props.file && "pdf" === v.getExtension(this.props.file) || this.props.previewType === h.PreviewType.Image
        }, m.prototype.render = function() {
            var e = this;
            return this.state.isVisible ? i.createElement("div", {
                className: "persistent-footer-container"
            }, i.createElement("div", {
                className: "persistent-footer"
            }, i.createElement("div", {
                className: "persistent-footer__close-button"
            }, i.createElement(u.Button, {
                "aria-label": "Close Footer",
                onClick: function() {
                    return e.dismissFooter()
                },
                className: "button-as-link",
                variant: "styleless"
            }, i.createElement("span", {
                className: "react-title-bar__close-content"
            }, i.createElement(d.IconForm, {
                name: "cancel"
            })))), i.createElement("div", {
                className: "persistent-footer__primary-text"
            }, this.getPrimaryText(), " "), i.createElement("div", {
                className: "persistent-footer__secondary-text"
            }, this.getSecondaryText(), " "), i.createElement("div", {
                className: "persistent-footer__footer-ctas"
            }, i.createElement(u.Button, {
                className: "persistent-footer__signup-button",
                onClick: function() {
                    return e.showStickyBannerModal(n.Mode.REGISTER)
                }
            }, p.intl.formatMessage({
                defaultMessage: "Sign Up",
                description: "Dropbox Signup button on a sticky footer"
            })), i.createElement(u.Button, {
                className: "persistent-footer__login-button",
                onClick: function() {
                    return e.showStickyBannerModal(n.Mode.LOGIN)
                },
                variant: "borderless"
            }, p.intl.formatMessage({
                defaultMessage: "Sign In",
                description: "Dropbox Signin button on a sticky footer"
            }))))) : null
        }, m
    })(i.Component);
    t.PersistentFooter = m.requireCssWithComponent(w, ["/static/css/file_viewer/persistent_footer-vflK75WYP.css"])
})), define("modules/clean/react/file_viewer/conversions/persistent_header", ["require", "exports", "tslib", "react", "modules/clean/auth/login_or_register/types", "modules/clean/react/modal", "modules/clean/react/file_viewer/conversions/sticky_header/sticky_header", "modules/core/browser", "modules/clean/react/file_viewer/file_preview_event_emitter", "modules/clean/react/file_viewer/models", "modules/clean/react/file_viewer/constants", "modules/core/i18n", "modules/clean/react/file_viewer/logging"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), s = r.__importStar(s);
    var m = (function(t) {
        function m() {
            return null !== t && t.apply(this, arguments) || this
        }
        return r.__extends(m, t), m.prototype.componentDidMount = function() {
            var e = c.FilePreviewSession.currentSession;
            l.filePreviewEventEmitter.emit(u.EventType.PersistentHeaderShown, e)
        }, m.prototype.showStickyBannerModal = function(t) {
            var a = this;
            new Promise((function(t, r) {
                e(["modules/clean/auth/login_or_register/modal"], t, r)
            })).then(r.__importStar).then((function(e) {
                var r = e.LoginOrRegisterModal;
                o.Modal.showInstance(i.createElement(r, {
                    downloadAction: null,
                    onCancel: function() {},
                    id: "persistent-header-modal",
                    initialMode: t,
                    kind: n.LoginOrRegisterKind.IMMEDIATE,
                    onAuthenticateSuccess: function(e) {
                        a.redirectToCurrentPreview(e)
                    },
                    signup_tag: "persistent-header-modal"
                }))
            }));
            var s = t === n.Mode.REGISTER ? u.UserAction.SignUp : u.UserAction.SignIn;
            p.logUserAction(s, u.UserActionContext.PersistentHeader)
        }, m.prototype.instanceOfLoggedInUserInfo = function(e) {
            return "locale" in e
        }, m.prototype.redirectToCurrentPreview = function(e) {
            this.props.sharedLinkInfo && this.instanceOfLoggedInUserInfo(e) && s.redirect(this.props.sharedLinkInfo.url)
        }, m.prototype.render = function() {
            var e = this;
            return i.createElement(a.StickyHeader, {
                primaryText: d.intl.formatMessage({
                    defaultMessage: "Need this file later?"
                }),
                secondaryText: d.intl.formatMessage({
                    defaultMessage: "Quickly find it from any device by saving it to your own Dropbox folder."
                }),
                primaryButton: {
                    text: d.intl.formatMessage({
                        defaultMessage: "Sign Up",
                        description: "Dropbox Signup button on a sticky footer"
                    }),
                    buttonProps: {
                        onClick: function() {
                            return e.showStickyBannerModal(n.Mode.REGISTER)
                        }
                    }
                },
                secondaryButton: {
                    text: d.intl.formatMessage({
                        defaultMessage: "Sign In",
                        description: "Dropbox Signin button on a sticky footer"
                    }),
                    buttonProps: {
                        onClick: function() {
                            return e.showStickyBannerModal(n.Mode.LOGIN)
                        }
                    }
                }
            })
        }, m
    })(i.Component);
    t.PersistentHeader = m
})), define("modules/clean/react/file_viewer/conversions/sticky_header/sticky_header", ["require", "exports", "tslib", "react", "spectrum/button", "modules/clean/react/css", "modules/clean/react/maestro_nav/shared_code/dropbox_logo"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.primaryText,
                o = e.secondaryText,
                s = e.primaryButton,
                l = e.secondaryButton;
            return i.createElement("div", {
                className: "sticky-header"
            }, i.createElement(a.DropboxLogo, {
                color: "white",
                className: "sticky-header__icon-svg"
            }), i.createElement("div", {
                className: "sticky-header__text-container"
            }, i.createElement("div", {
                className: "sticky-header__primary-text"
            }, t, " "), o && i.createElement("div", {
                className: "sticky-header__secondary-text"
            }, o, " ")), i.createElement("div", {
                className: "sticky-header__buttons"
            }, i.createElement(n.Button, r.__assign({
                className: "sticky-header__primary-button"
            }, s.buttonProps), s.text), l && i.createElement(n.Button, r.__assign({
                className: "sticky-header__secondary-button",
                variant: "borderless"
            }, l.buttonProps), l.text)))
        }, t
    })((i = r.__importStar(i)).Component);
    t.StickyHeader = o.requireCssWithComponent(s, ["/static/css/file_viewer/sticky_header-vfl9CA3j9.css"])
})), define("modules/clean/react/file_viewer/exp_file_viewer_upsell_banner", ["require", "exports", "tslib", "react", "modules/clean/react/css", "modules/constants/payments", "modules/core/i18n"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), o = r.__importStar(o);
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = o.OUT_OF_SPACE_URL + "?oqa=oq_fp";
            return i.default.createElement("div", {
                className: "fileviewer-upsell-banner"
            }, a.intl.formatMessage({
                defaultMessage: "Get more space to add more files to your Dropbox. <a>Upgrade now.</a>"
            }, {
                a: function() {
                    for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                    return i.default.createElement("a", {
                        href: e
                    }, t)
                }
            }))
        }, t
    })(i.default.Component);
    t.ExpFileViewerUpsellBannerV2 = n.requireCssWithComponent(s, ["/static/css/exp_file_preview_upsell-vfli2_OuA.css"])
})), define("modules/clean/react/file_viewer/feedback_form/api", ["require", "exports", "tslib", "modules/clean/api_v2/user_client", "modules/clean/react/file_viewer/feedback_form/types"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.submitFeedback = function(e, t, o, a) {
        return r.__awaiter(this, void 0, Promise, (function() {
            var s, l;
            return r.__generator(this, (function(r) {
                switch (r.label) {
                    case 0:
                        return a ? (s = t === n.NOT_APPLICABLE_SATISFACTION_RATING_VALUE ? void 0 : t, l = {
                            product_name: e,
                            satisfaction_rating: s,
                            comment: o
                        }, [4, (new i.UserApiV2Client).ns("workflows").rpc("submit_feedback", l, {
                            subjectUserId: a.id
                        })]) : [2];
                    case 1:
                        return [2, r.sent()]
                }
            }))
        }))
    }
})), define("modules/clean/react/file_viewer/feedback_form/feedback_form_modal", ["require", "exports", "tslib", "react", "modules/core/i18n", "file-transfers/feedback-form", "modules/clean/react/css", "spectrum/modal", "modules/clean/react/snackbar"], (function(e, t, r, i, n, o, a, s, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i);
    var c = "feedback-snackbar-id",
        u = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    comment: "",
                    rating: null
                }, t.handlePrimaryAction = function() {
                    var e = t.state,
                        r = e.rating,
                        i = e.comment,
                        o = t.props.user;
                    r ? (t.props.submitFeedback(r, i, o), t.props.onRequestClose(), l.Snackbar.complete(n.intl.formatMessage({
                        defaultMessage: "Feedback submitted!",
                        description: "Text indicating that feedback was successfully submitted"
                    }), c)) : l.Snackbar.fail(n.intl.formatMessage({
                        defaultMessage: "Please provide a rating",
                        description: "Text on pop-up notification indicating that a satisfaction rating must be provided"
                    }), c)
                }, t.handleRatingChange = function(e) {
                    t.setState({
                        rating: e
                    })
                }, t.handleCommentsChange = function(e) {
                    t.setState({
                        comment: e
                    })
                }, t
            }
            return r.__extends(t, e), t.prototype.render = function() {
                var e = this.state,
                    t = e.comment,
                    r = e.rating;
                return i.default.createElement(s.UtilityModal, {
                    ariaLabel: this.props.title,
                    title: this.props.title,
                    open: this.props.open,
                    displayCloseButton: !0,
                    overlayClickClose: !0,
                    onReady: this.props.onReady,
                    onRequestClose: this.props.onRequestClose,
                    primaryAction: n.intl.formatMessage({
                        defaultMessage: "Submit"
                    }),
                    onPrimaryAction: this.handlePrimaryAction,
                    secondaryAction: n.intl.formatMessage({
                        defaultMessage: "Not now"
                    }),
                    onSecondaryAction: this.props.onRequestClose,
                    shouldRequestCloseOnActions: !1,
                    overlayClassName: "file-viewer-modal-overlay",
                    appElement: document.getElementById("embedded-app") || document.body
                }, i.default.createElement(o.FeedbackForm, {
                    comment: t,
                    rating: r,
                    commentPrompt: this.props.commentPrompt,
                    onRatingChange: this.handleRatingChange,
                    onCommentsChange: this.handleCommentsChange
                }))
            }, t
        })(i.default.Component);
    t.FeedbackFormModalComponent = u, t.FeedbackFormModal = a.requireCssWithComponent(u, ["/static/js/file-transfers/index.web-vflSqNvv6.css"])
})), define("modules/clean/react/file_viewer/feedback_form/types", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.DROPBOX_MARKUP = "Dropbox Markup"
    })(t.SubmitFeedbackProductName || (t.SubmitFeedbackProductName = {})), t.NOT_APPLICABLE_SATISFACTION_RATING_VALUE = -1
})), define("modules/clean/react/file_viewer/file_preview", ["require", "exports", "tslib", "classnames", "react", "external/lodash", "file-viewer/core", "modules/clean/previews/constants", "modules/clean/previews/data/preview_type_util", "modules/clean/previews/util", "modules/clean/previews/util", "modules/clean/react/async/loadable", "modules/clean/cloud_docs/shared_components/routing", "modules/clean/react/file_viewer/cloud_doc_preview", "modules/clean/file_store/utils", "modules/clean/react/file_viewer/utils", "modules/clean/react/previews/constants", "file-viewer/core", "modules/clean/react/previews/loading_indicator", "modules/clean/react/previews/error/preview_error", "modules/clean/react/previews/preview_html", "modules/clean/react/previews/preview_image", "modules/clean/react/previews/preview_linkfile", "modules/clean/react/previews/video/preview_video", "modules/clean/react/previews/preview_pdf_loadable", "modules/clean/react/previews/preview_ppt_loadable", "modules/clean/react/previews/archive/preview_archive_loadable", "modules/clean/sharing/constants", "modules/core/i18n", "modules/core/browser", "modules/clean/react/file_viewer/file_preview_logging_manager", "modules/clean/redux/types", "modules/clean/previews/data/util", "modules/clean/react/snackbar"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P, M, T, A, x, F, I, O) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), o = r.__importStar(o), l = r.__importStar(l), c = r.__importStar(c), A = r.__importStar(A);
    var R = d.Loadable({
            loader: function() {
                return new Promise((function(t, r) {
                    e(["modules/clean/react/previews/preview_image_zoom"], t, r)
                })).then(r.__importStar).then((function(e) {
                    return e.PreviewImageZoom
                }))
            }
        }),
        D = d.Loadable({
            loader: function() {
                return new Promise((function(t, r) {
                    e(["modules/clean/react/previews/limited_preview_message"], t, r)
                })).then(r.__importStar).then((function(e) {
                    return e.LimitedPreviewMessage
                }))
            }
        }),
        L = A.get_uri().getQuery(),
        N = L.forceRivieraException,
        U = L.forceTestPdf,
        W = L.forceTestExcelHtml,
        B = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r.__extends(t, e), t.prototype.componentDidMount = function() {
                this.triggerDynamicRoutingModalCheck()
            }, t.prototype.componentDidUpdate = function(e) {
                var t = e.user,
                    r = e.file,
                    i = this.props,
                    n = i.user,
                    a = i.file;
                o.isEqual(r, a) && o.isEqual(t, n) || this.triggerDynamicRoutingModalCheck()
            }, t.prototype.triggerDynamicRoutingModalCheck = function() {
                var e = this.props,
                    t = e.user,
                    r = e.file,
                    i = e.file.file_id;
                t && i && !this.isViewOnly() && p.maybeShowDynamicRoutingModal(t, r, f.getExtension(r))
            }, t.prototype.isViewOnly = function() {
                var e = !1;
                return this.props.hasOwnProperty("shareToken") && void 0 !== this.props.shareToken && (e = this.props.shareToken.linkType === M.SharedLinkType.Shmodel), e
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.doc,
                    i = t.autoprint_url,
                    o = t.image_url_tmpl,
                    s = t.refresh_url,
                    l = void 0 === s ? "" : s,
                    c = t.text_url_tmpl,
                    d = e.file,
                    p = e.filePreviewSession,
                    m = e.invalidateFrameMessenger,
                    g = e.isFullscreen,
                    h = e.isSidebarOpen,
                    v = e.location,
                    _ = e.mode,
                    w = void 0 === _ ? a.FileViewerMode.Default : _,
                    b = e.renderUnsupportedErrorPreview,
                    y = e.setRenderStatusSuccess,
                    E = e.sharePermission,
                    S = e.sidebar,
                    P = e.sizeClass,
                    M = e.triggerError,
                    T = e.user;
                if (!o || !c) return b();
                var A = f.getExtension(d),
                    x = {
                        autoprintUrl: i,
                        currentMode: {
                            sidebar: S,
                            mode: w
                        },
                        revisionId: I.buildRevisionId(d.ns_id, d.sjid),
                        fileExtension: A,
                        filePreviewSession: p,
                        imageUrlTmpl: o,
                        isArchiveFile: !1,
                        isFullscreen: g,
                        isSidebarOpen: h,
                        onError: M,
                        useCanned: !!U,
                        refreshUrl: l,
                        location: v,
                        sharePermission: E,
                        sizeClass: P,
                        textUrlTmpl: c,
                        invalidateFrameMessenger: m,
                        setRenderStatusSuccess: y,
                        user: T
                    };
                return u.isPptExtension(A) ? n.default.createElement(k.PreviewPPTLoadable, r.__assign({}, x)) : n.default.createElement(C.PreviewPDFLoadable, r.__assign({}, x))
            }, t
        })(n.default.Component),
        V = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    hasError: !1
                }, t.shouldDisableDownload = function() {
                    return !!t.props.sharePermission && !t.props.sharePermission.canViewContextMenuRoles.length
                }, t.onContextMenu = function(e) {
                    t.shouldDisableDownload() && e.preventDefault()
                }, t.onCopy = function(e) {
                    t.props.sharePermission && 0 === t.props.sharePermission.canDownloadRoles.length && e.preventDefault()
                }, t.renderExcelPreview = function() {
                    var e = t.props.previewApiData.data.preview_url;
                    return e ? n.default.createElement(b.PreviewHTML, r.__assign({
                        src: e,
                        isExcel: !0,
                        forceRivieraException: Array.isArray(N) ? N[0] : "",
                        forceTestExcelHtml: !!W,
                        usesFrameMessenger: !0
                    }, t.getCommonHtmlPreviewProps())) : t.renderUnsupportedErrorPreview()
                }, t.renderPdfPreview = function(e) {
                    return n.default.createElement(B, r.__assign({}, t.props, {
                        doc: e,
                        renderUnsupportedErrorPreview: t.renderUnsupportedErrorPreview,
                        triggerError: t.triggerError
                    }))
                }, t.renderUnsupportedErrorPreview = function() {
                    return t.renderErrorPreview(h.ErrorType.SupportError)
                }, t.showLoadingIndicator = function() {
                    return n.default.createElement(_.LoadingIndicator, {
                        className: "loading-indicator"
                    })
                }, t.getErrorMessage = function(e, t, r) {
                    if (r && "sketch" === f.getExtension(r) && e === h.ErrorType.LoadError && t === v.RivieraStatus.UnsupportedFormat) return T.intl.formatMessage({
                        defaultMessage: "This file can’t be previewed. Previews are only available for files created in Sketch v43 and up."
                    })
                }, t.triggerError = function(e, r) {
                    t.setState({
                        hasError: !0,
                        errorType: e,
                        rivieraStatusCode: r
                    })
                }, t
            }
            return r.__extends(t, e), t.prototype.componentWillReceiveProps = function(e) {
                o.isEqual(e.file, this.props.file) || this.setState({
                    hasError: !1,
                    errorType: void 0
                })
            }, t.prototype.componentDidMount = function() {
                if (s.PreviewType.Excel === l.getPreviewType(this.props.previewApiData.data)) {
                    var e = this.props.file,
                        t = f.getExtension(e);
                    this.props.user && e.file_id && !this.isViewOnly() && p.maybeShowDynamicRoutingModal(this.props.user, e, t)
                }
                window.setTimeout(g.cleanupPrerenderPreview)
            }, t.prototype.isViewOnly = function() {
                var e = !1;
                return this.props.hasOwnProperty("shareToken") && void 0 !== this.props.shareToken && (e = this.props.shareToken.linkType === M.SharedLinkType.Shmodel), e
            }, t.prototype.renderImagePreview = function(e) {
                var t = this.props,
                    i = t.file,
                    o = t.mode,
                    l = t.sidebar,
                    u = f.getExtension(i),
                    d = {
                        mode: o || a.FileViewerMode.Default,
                        sidebar: l
                    };
                if (this.props.isFullscreen) return n.default.createElement(R, {
                    currentMode: d,
                    thumbnailUrlTmpl: e.thumbnail_url_tmpl,
                    fileCount: this.props.count,
                    fileIndex: this.props.index,
                    onError: this.triggerError,
                    onFlipNext: this.props.onNext,
                    onFlipPrevious: this.props.onPrevious,
                    filePreviewSession: this.props.filePreviewSession,
                    contextMenuDisabled: this.shouldDisableDownload(),
                    fileExtension: u,
                    fileId: this.props.file.file_id || "",
                    fileName: f.getFilename(this.props.file),
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess
                });
                var p = {
                    currentMode: d,
                    "preview-url": e.thumbnail_url_tmpl,
                    "file-extension": u,
                    isFullscreen: this.props.isFullscreen,
                    shouldDisplayToolbar: this.props.shouldDisplayToolbar && !c.isLimitedPreview(i, s.PreviewType.Image),
                    index: this.props.index,
                    count: this.props.count,
                    onPrevious: this.props.onPrevious,
                    onError: this.triggerError,
                    onNext: this.props.onNext,
                    filePreviewSession: this.props.filePreviewSession,
                    contextMenuDisabled: this.shouldDisableDownload(),
                    nsId: this.props.file.ns_id,
                    sjId: this.props.file.sjid,
                    fileName: f.getFilename(this.props.file),
                    sizeClass: this.props.sizeClass,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess,
                    sharePermission: this.props.sharePermission
                };
                return n.default.createElement(y.PreviewImage, r.__assign({}, p))
            }, Object.defineProperty(t.prototype, "shouldShowActionables", {
                get: function() {
                    return this.props.areActionablesEnabled && !f.isArchiveFile(this.props.file)
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.renderVideoPreview = function(e) {
                var t = this.props,
                    r = t.file,
                    i = t.hidePageChrome;
                return n.default.createElement(S.PreviewVideo, {
                    title: f.getFilenameWithoutExtension(r),
                    fileExtension: f.getExtension(r),
                    previewUrl: e.transcode_url,
                    separateResolutionUrls: e.transcode_urls_separate_resolutions,
                    thumbnailUrlTmpl: e.poster_url_tmpl,
                    videoMetadataUrl: e.metadata_url,
                    videoContainer: e.container,
                    shouldFocusOnReady: this.props.shouldFocusOnReady,
                    filePreviewSession: this.props.filePreviewSession,
                    onError: this.triggerError,
                    sourceContext: this.props.sourceContext,
                    vttThumbnailsUrl: e.thumb_scrubber_vtt_url,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess,
                    user: this.props.user,
                    hidePageChrome: i
                })
            }, t.prototype.renderLinkfilePreview = function(e) {
                var t = this.props.file,
                    r = {
                        url: e.url,
                        authenticated: !!e.authenticated
                    };
                return n.default.createElement(E.PreviewLinkfile, {
                    filename: f.getFilename(t),
                    data: r,
                    source: e.authenticated ? "browse" : "sharedLink",
                    filePreviewSession: this.props.filePreviewSession,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess
                })
            }, t.prototype.getCommonHtmlPreviewProps = function() {
                var e = this.props.file,
                    t = f.getExtension(e);
                return {
                    count: this.props.count,
                    fileExtension: t,
                    filePreviewSession: this.props.filePreviewSession,
                    filename: f.getFilename(e),
                    index: this.props.index,
                    isFullscreen: this.props.isFullscreen,
                    onClickNext: this.props.onNext,
                    onClickPrevious: this.props.onPrevious,
                    onError: this.triggerError,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess,
                    sharePermission: this.props.sharePermission,
                    sizeClass: this.props.sizeClass
                }
            }, t.prototype.renderHtmlifiedPreview = function(e) {
                var t = e.htmlified_link,
                    i = e.uses_frame_messenger;
                return t ? n.default.createElement(b.PreviewHTML, r.__assign({
                    src: t,
                    isExcel: !1,
                    usesFrameMessenger: i
                }, this.getCommonHtmlPreviewProps())) : this.renderUnsupportedErrorPreview()
            }, t.prototype.renderRawHtmlPreview = function() {
                var e = this.props.previewApiData.data.preview_url;
                return e ? n.default.createElement(b.PreviewHTML, r.__assign({
                    src: e,
                    isExcel: !1,
                    usesFrameMessenger: !1
                }, this.getCommonHtmlPreviewProps())) : this.renderUnsupportedErrorPreview()
            }, t.prototype.renderAudioPreview = function(e) {
                var t = this.props.file;
                return n.default.createElement(S.PreviewVideo, {
                    title: f.getFilenameWithoutExtension(t),
                    fileExtension: f.getExtension(t),
                    previewUrl: e.transcode_url,
                    videoContainer: e.container,
                    filePreviewSession: this.props.filePreviewSession,
                    shouldFocusOnReady: this.props.shouldFocusOnReady,
                    onError: this.triggerError,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess,
                    sourceContext: this.props.sourceContext,
                    isAudio: !0,
                    bytes: t.bytes,
                    waveformUrl: e.waveform_url,
                    user: this.props.user
                })
            }, t.prototype.renderArchivePreview = function() {
                return n.default.createElement(P.PreviewArchiveLoadable, {
                    rootFile: this.props.file,
                    previewUrl: this.props.previewApiData.data.preview_url,
                    fileSubpath: this.props.fileSubpath,
                    filePreviewSession: this.props.filePreviewSession,
                    onError: this.triggerError,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccess,
                    sharedLinkUrl: this.props.sharedLinkUrl,
                    user: this.props.user
                })
            }, t.prototype.renderCloudDocPreview = function(e) {
                return n.default.createElement(m.CloudDocPreview, {
                    file: this.props.file,
                    user: this.props.user,
                    cloudDoc: e,
                    showCloudDocPreview: this.props.showCloudDocPreview,
                    renderExcelPreview: this.renderExcelPreview,
                    renderPdfPreview: this.renderPdfPreview,
                    renderUnsupportedErrorPreview: this.renderUnsupportedErrorPreview,
                    LoggedOutUXGoogleVariant: this.props.LoggedOutUXGoogleVariant,
                    LoggedOutUXPaperVariant: this.props.LoggedOutUXPaperVariant
                })
            }, t.prototype.renderErrorPreview = function(e) {
                var t = this.state.rivieraStatusCode,
                    r = this.props,
                    i = r.count,
                    o = r.extensionsEnabled,
                    c = r.file,
                    u = r.previewApiData,
                    d = r.filePreviewSession,
                    p = r.index,
                    m = r.isFullscreen,
                    g = r.isMobileUserAgent,
                    v = r.maxFilenameEmLength,
                    _ = r.mode,
                    b = r.onNext,
                    y = r.onPrevious,
                    E = r.sharedLinkInfo,
                    S = r.sharePermission,
                    C = r.shareToken,
                    k = r.user,
                    P = l.getPreviewType(u.data),
                    M = this.props.shouldDisplayToolbar && !f.isArchiveFile(c) && P === s.PreviewType.Image,
                    T = e;
                return _ === a.FileViewerMode.Watermarking && (O.Snackbar.close(), T = h.ErrorType.WatermarkingError), n.default.createElement(w.PreviewError, {
                    file: c,
                    extensionsEnabled: o,
                    preview: u.data,
                    maxFilenameEmLength: v,
                    filePreviewSession: d,
                    errorType: T,
                    user: k,
                    areActionablesEnabled: this.shouldShowActionables,
                    sharedLinkInfo: E,
                    shareToken: C,
                    sharePermission: S,
                    shouldDisplayToolbar: M,
                    index: p,
                    isFullscreen: m,
                    isMobileUserAgent: g,
                    count: i,
                    onPrevious: y,
                    onNext: b,
                    message: this.getErrorMessage(e, t, c),
                    sizeClass: this.props.sizeClass
                })
            }, t.prototype.getPreviewTypeWhitelist = function() {
                return this.props.previewTypeWhitelist || c.VALID_PREVIEW_TYPES
            }, t.prototype.viewedByOwner = function() {
                return this.props.user && this.props.user.home_ns_id === this.props.file.ns_id
            }, t.prototype.choosePreview = function() {
                var e = this.props,
                    t = e.file,
                    i = e.previewApiData,
                    o = this.getPreviewTypeWhitelist(),
                    a = this.validateFile(t, i);
                if (a) return a;
                if (i.status === F.ApiClientStatus.Request) return this.showLoadingIndicator();
                if (i.status === F.ApiClientStatus.Error) return this.renderErrorPreview(h.ErrorType.ExtensionError);
                if (!i.data || !i.data.content) return this.renderErrorPreview(h.ErrorType.ExtensionError);
                var u = i.data.content,
                    d = l.getPreviewType(i.data);
                if (c.isEmptyFile(t) && d !== s.PreviewType.CloudDoc) return this.renderErrorPreview(h.ErrorType.EmptyFileError);
                if (!(null == o || o.includes(d))) return this.renderErrorPreview(h.ErrorType.ExtensionError);
                if (d === s.PreviewType.Restricted) return this.viewedByOwner() ? this.renderErrorPreview(h.ErrorType.UpsellError) : this.renderErrorPreview(h.ErrorType.ExtensionError);
                switch (d) {
                    case s.PreviewType.Video:
                        return this.renderVideoPreview(u);
                    case s.PreviewType.Audio:
                        return this.renderAudioPreview(u);
                    case s.PreviewType.Archive:
                        return this.renderArchivePreview();
                    case s.PreviewType.Image:
                        return this.renderImagePreview(u);
                    case s.PreviewType.SsrDoc:
                        return n.default.createElement(B, r.__assign({}, this.props, {
                            doc: u,
                            renderUnsupportedErrorPreview: this.renderUnsupportedErrorPreview,
                            triggerError: this.triggerError
                        }));
                    case s.PreviewType.Linkfile:
                        return this.renderLinkfilePreview(u);
                    case s.PreviewType.CloudDoc:
                        return this.renderCloudDocPreview(u);
                    case s.PreviewType.Excel:
                        return this.renderExcelPreview();
                    case s.PreviewType.RawHTML:
                        return this.renderRawHtmlPreview();
                    case s.PreviewType.HTML:
                        return this.renderHtmlifiedPreview(u)
                }
            }, t.prototype.validateFile = function(e, t) {
                return e.is_dir && !c.isSupportedBundleFile(e) ? this.renderErrorPreview(h.ErrorType.ExtensionError) : null != e.ns_id || f.isArchiveFile(e) ? f.isSymLink(e) ? this.renderErrorPreview(h.ErrorType.SymLinkError) : t ? c.filesizeSupported(e, l.getPreviewType(t.data)) ? void 0 : this.renderErrorPreview(h.ErrorType.FileSizeError) : this.renderErrorPreview(h.ErrorType.ExtensionError) : this.renderErrorPreview(h.ErrorType.PendingUploadError)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.file,
                    r = e.previewApiData,
                    o = e.sharedLinkInfo,
                    a = e.shareToken,
                    s = e.sharePermission,
                    u = e.sizeClass,
                    d = e.user,
                    p = this.state,
                    m = p.errorType;
                return p.hasError ? this.renderErrorPreview(m) : n.default.createElement("div", {
                    className: i.default({
                        "flex-preview-container": !0,
                        "no-download": s && 0 === s.canViewContextMenuRoles.length
                    }),
                    onContextMenu: this.onContextMenu,
                    onCopy: this.onCopy
                }, f.isArchiveFile(t) ? null : n.default.createElement(x.FilePreviewPaasLoggerManager, {
                    file: t
                }), this.choosePreview(), r && c.isLimitedPreview(t, l.getPreviewType(r.data)) ? n.default.createElement(D, {
                    extension: f.getExtension(t),
                    file: t,
                    sharedLinkInfo: o,
                    shareToken: a,
                    sharePermission: s,
                    shouldShowActionables: this.shouldShowActionables,
                    sizeClass: u,
                    user: d
                }) : null)
            }, t.defaultProps = {
                areActionablesEnabled: !0,
                isFullscreen: !1,
                sharePermission: null,
                setRenderStatusSuccess: o.noop,
                user: null
            }, t
        })(n.default.Component);
    t.FilePreview = V, t.FilePreviewWithLogging = function(e) {
        var t = e.file,
            i = e.sourceAction,
            o = e.sourceContext,
            a = e.previewApiData;
        return n.default.createElement(x.FilePreviewSessionManager, {
            file: t,
            previewType: l.getPreviewType(a.data),
            sourceAction: i,
            sourceContext: o,
            render: function(t) {
                return n.default.createElement(V, r.__assign({}, e, {
                    filePreviewSession: t
                }))
            }
        })
    }
})), define("modules/clean/react/file_viewer/file_preview_logging_manager", ["require", "exports", "tslib", "react", "modules/clean/loggers/file_preview_logger", "modules/clean/loggers/file_viewer_logger", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/file_preview_event_emitter", "modules/clean/react/file_viewer/models", "modules/clean/react/previews/constants", "modules/clean/react/previews/frame_messenger_host", "external/lodash"], (function(e, t, r, i, n, o, a, s, l, c, u, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), o = r.__importStar(o), d = r.__importStar(d);
    var p = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            r.setUpFilePreviewLogger = function(e) {
                r.teardownFilePreviewLogger(), r.filePreviewTimelineLogger = new n.FilePreviewTimelineLogger(e), r.filePreviewTimelineLogger.listenTo(s.filePreviewEventEmitter), r.filePreviewUserActionLogger = new n.FilePreviewUserActionLogger, r.filePreviewUserActionLogger.listenTo(s.filePreviewEventEmitter), r.filePreviewModeLogger = new n.FilePreviewModeLogger, r.filePreviewModeLogger.listenTo(s.filePreviewEventEmitter), r.filePreviewSidebarLogger = new n.FilePreviewSidebarLogger, r.filePreviewSidebarLogger.listenTo(s.filePreviewEventEmitter), r.filePreviewUpsellLogger = new n.FilePreviewUpsellLogger, r.filePreviewUpsellLogger.listenTo(s.filePreviewEventEmitter), r.filePreviewConversionLogger = new n.FilePreviewConversionLogger, r.filePreviewConversionLogger.listenTo(s.filePreviewEventEmitter)
            }, r.teardownFilePreviewLogger = function() {
                null != r.filePreviewTimelineLogger && r.filePreviewTimelineLogger.unlistenTo(s.filePreviewEventEmitter), null != r.filePreviewUserActionLogger && r.filePreviewUserActionLogger.unlistenTo(s.filePreviewEventEmitter), null != r.filePreviewModeLogger && r.filePreviewModeLogger.unlistenTo(s.filePreviewEventEmitter), null != r.filePreviewSidebarLogger && r.filePreviewSidebarLogger.unlistenTo(s.filePreviewEventEmitter), null != r.filePreviewUpsellLogger && r.filePreviewUpsellLogger.unlistenTo(s.filePreviewEventEmitter), null != r.filePreviewConversionLogger && r.filePreviewConversionLogger.unlistenTo(s.filePreviewEventEmitter)
            }, r.logPreviewSessionEnded = function(e) {
                void 0 === e && (e = c.PreviewSessionEndReason.Unknown);
                var t = {
                    min_page_width_ratio: "",
                    max_page_width_ratio: "",
                    session_end_reason: e
                };
                r.state.filePreviewSession.recordEvent(a.EventType.FilePreviewSessionEnded, t)
            }, r.getNewFilePreviewSession = function(e) {
                var t = e.file,
                    i = e.previewType,
                    n = e.sourceAction,
                    o = e.sourceContext,
                    s = new l.FilePreviewSession({
                        file: t,
                        previewType: i,
                        fileViewerSession: l.FileViewerSession.currentSession,
                        sourceAction: n,
                        sourceContext: o
                    });
                return l.FilePreviewSession.currentSession = s, r.setUpFilePreviewLogger(s.id), s.recordEvent(a.EventType.FilePreviewAttemptStarted, {
                    window_width: "" + window.innerWidth,
                    window_height: "" + window.innerHeight
                }), s
            }, r.windowCloseHandler = function() {
                r.logPreviewSessionEnded(c.PreviewSessionEndReason.BeforeUnload)
            };
            var i = r.getNewFilePreviewSession(r.props);
            return r.state = {
                filePreviewSession: i
            }, r
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            window.addEventListener("beforeunload", this.windowCloseHandler)
        }, t.prototype.componentWillUnmount = function() {
            this.logPreviewSessionEnded(c.PreviewSessionEndReason.Unmount), this.teardownFilePreviewLogger(), window.removeEventListener("beforeunload", this.windowCloseHandler)
        }, t.prototype.componentWillReceiveProps = function(e) {
            if (!d.isEqual(e.file, this.props.file)) {
                this.logPreviewSessionEnded(c.PreviewSessionEndReason.NewFile);
                var t = this.getNewFilePreviewSession(e);
                this.setState({
                    filePreviewSession: t
                })
            }
        }, t.prototype.render = function() {
            return this.props.render(this.state.filePreviewSession)
        }, t
    })(i.default.Component);
    t.FilePreviewSessionManager = p;
    var m = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.onFrameMessage = function(e) {
                var r = t.props.file,
                    i = e.action,
                    n = e.parameters;
                "pagerendered" === i && o.logPageRendered(r, n)
            }, t.startLogger = function() {
                t.frameMessenger = new u.PreviewFrameMessengerHost, t.frameMessenger.configureChildMessaging(".react-file-viewer__preview iframe", t.onFrameMessage, ["pagerendered"]), t.frameMessenger.startListening()
            }, t.stopLogger = function() {
                t.frameMessenger.stopListening()
            }, t
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.startLogger()
        }, t.prototype.componentWillUnmount = function() {
            this.stopLogger()
        }, t.prototype.render = function() {
            return null
        }, t
    })(i.default.Component);
    t.FilePreviewPaasLoggerManager = m
})), define("modules/clean/react/file_viewer/file_viewer", ["require", "exports", "tslib", "classnames", "keymaster", "react", "external/lodash", "react-redux", "modules/clean/react/comments2/components/mobile_web_comments", "modules/clean/analytics", "modules/clean/loggers/file_viewer_logger", "modules/clean/loggers/workflows_logger", "modules/clean/previews/constants", "modules/clean/previews/data/preview_type_util", "file-viewer/core", "modules/clean/react/file_sidebar/file_sidebar_provider", "modules/clean/react/file_viewer/surface_existing_teams_header", "modules/clean/react/file_viewer/logging", "modules/clean/react/file_viewer/app_download_interstitial/file_preview_app_download_interstitial", "modules/clean/react/file_viewer/data/actions", "modules/clean/react/file_viewer/ml_experiment", "modules/clean/react/file_viewer/data/store", "modules/clean/react/file_viewer/full_screen_helpers", "modules/clean/react/file_viewer/exp_file_viewer_upsell_banner", "modules/clean/react/file_viewer/file_preview", "modules/clean/react/file_viewer/flippable_controls", "modules/clean/react/file_viewer/location_utils", "modules/clean/react/file_viewer/models", "modules/clean/react/file_viewer_sidebar/sidebar", "modules/clean/react/watermarking/utils", "modules/clean/previews/data/preview_type_util", "modules/clean/react/keyboard_binding/keyboard_binding_provider", "modules/clean/react/keyboard_binding/keyboard_binding_connector", "modules/clean/react/keyboard_binding/keyboard_binding", "modules/clean/keycode", "modules/clean/react/location/with_location", "modules/clean/react/modal", "modules/clean/react/open_in_app/banner", "modules/clean/react/previews/constants", "modules/clean/react/previews/fidelity_survey/fidelity_survey", "modules/clean/react/size_class/constants", "modules/clean/react/size_class/size_class", "modules/clean/viewer", "modules/clean/web_timing_logger", "modules/constants/python", "modules/core/browser", "modules/core/browser_detection", "modules/core/dom", "modules/core/i18n", "modules/clean/react/file_viewer/data/selectors", "modules/clean/previews/data/selectors", "modules/clean/integrations/data/selectors", "modules/clean/react/css", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/utils", "modules/clean/file_store/utils", "modules/clean/react/retrieval_success_banner/constants", "modules/clean/react/retrieval_success_banner/retrieval_success_filesview_banner", "modules/clean/sharing/constants", "modules/clean/react/file_viewer_sidebar/data_managers/async_commenting_data_manager", "modules/clean/react/file_viewer_sidebar/data_managers/async_activity_data_manager", "modules/clean/react/workflows/i18n/with_translations", "premium-workflows/components/trial/banner", "modules/clean/abuse/async_report_flag", "modules/clean/react/file_viewer_titlebar/titlebar", "file-viewer/core/data/modes/types", "modules/clean/react/file_viewer/prompt/loadable_prompt", "modules/clean/react/file_viewer/mode_manager", "modules/clean/react/file_viewer_sidebar/buttons/more_dropdown", "modules/clean/react/file_viewer_titlebar/edit_mode_titlebar", "modules/clean/react/file_viewer/conversions/conversion_utils", "modules/clean/react/file_viewer/conversions/persistent_header", "modules/clean/react/file_viewer/conversions/persistent_footer", "modules/clean/bug_reporting/routing", "modules/clean/react/teams/team_discovery/data/logger", "modules/clean/react/premium_kit/branding_context", "modules/clean/react/extensions/data/action_creators"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P, M, T, A, x, F, I, O, R, D, L, N, U, W, B, V, K, q, j, H, z, G, X, Y, Z, J, Q, $, ee, te, re, ie, ne, oe, ae, se, le, ce, ue, de, pe, me, fe, ge, he, ve, _e, we, be, ye, Ee) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), o = r.__importDefault(o), a = r.__importStar(a), u = r.__importStar(u), m = r.__importStar(m), q = r.__importStar(q), j = r.__importStar(j), H = r.__importStar(H), G = r.__importStar(G);
    var Se = "",
        Ce = "",
        ke = (function(t) {
            function s() {
                var i = null !== t && t.apply(this, arguments) || this;
                return i.state = {
                    modeClassnames: "",
                    dismissedSETHeader: !1
                }, i.previewSourceAction = i.props.initialPreviewSourceAction, i.previewSourceContext = i.props.initialPreviewSourceContext, i.fetchControllerMode = function() {
                    var e = i.props,
                        t = e.file,
                        r = e.sharedLinkInfo,
                        n = e.user,
                        o = e.sizeClass;
                    i.props.fetchControllerModeAction({
                        path: t.fq_path,
                        shared_link_url: r && r.url
                    }, n, o)
                }, i.handleHelloSignAppActionLaunch = function() {
                    var t = i.props,
                        n = t.file,
                        o = t.updateLinkState,
                        a = t.user;
                    n && te.isBrowseFile(n) && a && new Promise((function(t, r) {
                        e(["modules/clean/react/app_actions/redirect"], t, r)
                    })).then(r.__importStar).then((function(e) {
                        var t = e.redirectToActionOrShowAuth,
                            r = i.props.hellosignAppAction;
                        r && t(a, n, r, {}, void 0, (function(e, t) {
                            o({
                                actionId: e,
                                linkState: t
                            })
                        }))
                    }))
                }, i.resetControllerMode = function() {
                    i.props.changeMode(f.FileViewerMode.Default)
                }, i.setupKeymaster = function() {
                    Se = n.default.getScope(), n.default.setScope("fileviewer")
                }, i.cleanupKeymaster = function() {
                    n.default.clearScope("fileviewer"), n.default.setScope(Se)
                }, i.shouldShowOpenInAppBanner = function() {
                    var e = i.props,
                        t = e.hidePageChrome,
                        r = e.isMobileUserAgent;
                    return !t && (r || z.is_mobile_or_tablet())
                }, i.openInAppBannerOnClick = function() {
                    v.logUserAction($.UserAction.OpenInApp, $.UserActionContext.OpenInAppBanner)
                }, i.renderOverflowMenuFnFactory = function(e) {
                    return function() {
                        var t = i.props,
                            r = t.file,
                            n = t.sharedLinkInfo,
                            a = t.isVersionHistoryMode,
                            s = t.shareToken,
                            l = t.sharePermission,
                            c = t.encryptionOptions;
                        if (n) {
                            if (r && s && l) return o.default.createElement(fe.AsyncSharedFileMoreDropdown, {
                                user: i.props.user,
                                file: r,
                                sizeClass: i.props.sizeClass,
                                sharedLinkInfo: n,
                                shouldDisplayActionButtons: !i.isViewingFileSubpath,
                                shareToken: s,
                                sharePermission: l,
                                direction: e,
                                encryptionOptions: c
                            })
                        } else {
                            if (a) return null;
                            if (i.props.user && r) return o.default.createElement(fe.AsyncMountedFileMoreDropdown, {
                                user: i.props.user,
                                file: r,
                                sizeClass: i.props.sizeClass,
                                direction: e
                            })
                        }
                        return null
                    }
                }, i.renderManagers = function() {
                    var e = null == i.props.file.ns_id;
                    return o.default.createElement(o.default.Fragment, null, o.default.createElement(me.ModeManager, {
                        isViewingFileSubpath: i.isViewingFileSubpath
                    }), o.default.createElement(oe.AsyncCommentingDataManager, {
                        currentFile: i.props.file,
                        isVersionHistoryMode: !!i.props.isVersionHistoryMode,
                        sharedLinkInfo: i.props.sharedLinkInfo,
                        user: i.props.user
                    }), e ? null : o.default.createElement(ae.AsyncActivityDataManager, {
                        file: i.props.file,
                        isVersionHistoryMode: !!i.props.isVersionHistoryMode,
                        user: i.props.user
                    }))
                }, i.onTrialBannerClicked = function() {
                    d.logWorkflowsEvent(d.WorkflowsEvent.WatermarkUpsellHeaderButtonClicked, A.getWatermarkMilestone(i.props.user)), H.redirect("/buy?_tk=watermarking_header_upsell")
                }, i.onInterstitialClose = function() {
                    i.props.onAppDownloadInterstitialDismissed()
                }, i.onInterstitialContinue = function() {
                    i.props.onAppDownloadInterstitialDismissed()
                }, i.getKeyboardBindings = a.memoize((function(e) {
                    var t = e.isFullscreen,
                        r = e.isWatermarkingMode;
                    return t ? [O.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: R.KeyCode.ESC
                        },
                        callback: function() {
                            return E.exitFullScreen($.UserActionContext.Keyboard)
                        }
                    })] : r ? [O.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: R.KeyCode.ESC
                        },
                        callback: function() {
                            return i.props.changeMode(f.FileViewerMode.Documentation)
                        }
                    })] : [O.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: R.KeyCode.F
                        },
                        callback: function() {
                            return E.enterFullScreen($.UserActionContext.Keyboard)
                        }
                    }), O.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: R.KeyCode.ESC
                        },
                        callback: function(e) {
                            i.shouldIgnoreEscape(e) || null == i.props.onCloseViewer || i.props.onCloseViewer()
                        }
                    })]
                })), i
            }
            return r.__extends(s, t), s.prototype.componentWillMount = function() {
                this.setUpLogging()
            }, s.prototype.componentDidMount = function() {
                var e = this.props,
                    t = e.fetchShowOverQuotaUpsell,
                    r = e.file,
                    i = e.hasJoinableTeam,
                    n = e.onComponentDidMount,
                    o = e.openInHelloSign,
                    a = e.user,
                    s = e.docClassificationVariant,
                    l = e.fetchDocClassificationAction;
                if (null != n && n(), this.setDocumentTitle(te.getFilename(r), !0), G.scroll_lock_document(), this.logView(), i) {
                    var c = this.props.suggestTeamInfo,
                        u = "1" === H.get_uri().getQuery().new_user;
                    if (a)(new be.Logger).logExposedToSETOnPreviewEvent(a.id, a.is_cdm_member, a.user_root_permissions, !!c, c ? c.joinableTeam.id : void 0, c ? c.joinableTeam.membersCount : void 0, u)
                }
                t(a), a && this.previewType && !this.props.hidePageChrome && this.props.fetchBestCampaignsAction(a, this.previewType), a && r && s && b.ML_ENDPOINT_FETCH_TYPES.includes(s) && l(a.id, r.file_id), this.fetchControllerMode(), o && this.handleHelloSignAppActionLaunch()
            }, s.prototype.componentWillUpdate = function(e) {
                var t = e.file;
                if (t && t !== this.props.file) {
                    this.setDocumentTitle(te.getFilename(t)), this.previewSourceAction = U.PreviewSourceAction.Click, this.previewSourceContext = U.PreviewSourceContext.FileViewer;
                    var r = e.user,
                        i = e.docClassificationVariant,
                        o = e.fetchDocClassificationAction;
                    r && i && b.ML_ENDPOINT_FETCH_TYPES.includes(i) && o(r.id, t.file_id)
                }
                n.default.setScope("fileviewer"), e.mode !== this.props.mode && this.setState({
                    modeClassnames: "state-" + this.props.mode + "-out state-" + e.mode + "-in"
                })
            }, s.prototype.componentDidUpdate = function(e) {
                te.areFilesEqual(e.file, this.props.file) || this.logView(), e.previewApiData && x.isImage(e.previewApiData.data) && this.props.previewApiData && !x.isImage(this.props.previewApiData.data) && E.exitFullScreen()
            }, s.prototype.componentWillUnmount = function() {
                this.unsetDocumentTitle(), G.scroll_unlock_document(), null != this.props.onComponentWillUnmount && this.props.onComponentWillUnmount(), L.Modal.close(), this.resetControllerMode()
            }, Object.defineProperty(s.prototype, "fileSubpath", {
                get: function() {
                    return P.getFileSubpath(this.props.location)
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(s.prototype, "previewType", {
                get: function() {
                    return this.props.previewApiData && m.getPreviewType(this.props.previewApiData.data)
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(s.prototype, "isViewingFileSubpath", {
                get: function() {
                    return m.isArchive(this.props.previewApiData.data) && !!this.fileSubpath
                },
                enumerable: !0,
                configurable: !0
            }), s.prototype.shouldSuppressPassInfo = function() {
                return null == this.props.file.ns_id
            }, s.prototype.setUpLogging = function() {
                if (M.FileViewerSession.currentSession = new M.FileViewerSession, this.props.fileViewTarget === j.FileViewTargetType.SHARED_CONTENT_LINK) {
                    var e = q.start_time(),
                        t = (new Date).getTime(),
                        r = ne.SHARE_ACTION_ORIGIN_TYPE.PREVIEW_PAGE;
                    this.props.user && c.ShareTibEventLogger.log(this.props.user.id, "PREVIEW_RENDER", r, {
                        timing: t - e,
                        containing_ns_id: this.props.file.ns_id,
                        sjid: this.props.file.sjid
                    })
                }
            }, s.prototype.isDownloadDisabled = function() {
                return !(!this.props.sharePermission || !this.props.sharePermission.canDownloadRoles) && 0 === this.props.sharePermission.canDownloadRoles.length
            }, s.prototype.shouldShowAppDownloadInterstitial = function() {
                return !this.props.appDownloadInterstitialDismissed && this.props.file.open_in_app_data
            }, s.prototype.shouldIgnoreEscape = function(e) {
                var t = document.querySelector(".vjs-fullscreen");
                return G.focus_in_input() || G.is_input(e.target) || document.querySelector(".annotation-bubble") || this.props.isFullscreen || this.fileSubpath || t || this.props.isEditMode
            }, s.prototype.setDocumentTitle = function(e, t) {
                void 0 === t && (t = !1), t && (Ce = document.title), document.title = e
            }, s.prototype.unsetDocumentTitle = function() {
                "" !== Ce && (document.title = Ce)
            }, s.prototype.logView = function() {
                null === this.props.file.ns_id || ee.getSourceContext() === U.PreviewSourceContext.SharedLinkCollection || this.props.hidePageChrome || u.logView(this.props.file, this.props.user, this.props.fileViewTarget, this.props.fileViewOrigin, this.props.fileViewAction, null != this.props.sharedLinkInfo ? this.props.sharedLinkInfo.url : void 0, this.isDownloadDisabled(), K.Viewer.get_viewer().is_assume_user_session)
            }, s.prototype.isImagePreviewAnnotationEnabled = function() {
                return !(this.props.sizeClass === B.SizeClass.Small) && !this.props.hidePageChrome
            }, s.prototype.renderFlippableControls = function() {
                if (!(this.props.isFullscreen || this.isImagePreviewAnnotationEnabled() || null == this.props.fileIndex || [p.PreviewType.Video, p.PreviewType.Audio].includes(this.previewType) || this.props.isEditMode)) return o.default.createElement(k.FlippableControls, {
                    index: "" + (this.props.fileIndex + 1),
                    numFlippableFiles: this.props.fileCount,
                    onNext: this.props.onFlipNext,
                    onPrevious: this.props.onFlipPrevious
                })
            }, s.prototype.renderFilePreview = function() {
                var e = this.props.isEditMode;
                return o.default.createElement("div", {
                    className: i.default("react-file-viewer__preview", "react-file-preview", {
                        "react-file-viewer__preview--edit-mode": e
                    })
                }, o.default.createElement("div", {
                    className: "flex-preview-container"
                }, this.maybeRenderFidelitySurvey(), this.renderReportFlag(), this.renderRetrievalSuccessBanner(), this.shouldShowOpenInAppBanner() && o.default.createElement(N.OpenInAppBanner, {
                    urls: this.props.file.open_in_app_data,
                    onClick: this.openInAppBannerOnClick
                }), o.default.createElement(C.FilePreviewWithLogging, {
                    areActionablesEnabled: !this.props.hidePageChrome && null != this.props.file.ns_id,
                    count: this.props.fileCount,
                    extensionsEnabled: this.props.extensionsEnabled,
                    file: this.props.file,
                    previewApiData: this.props.previewApiData,
                    fileSubpath: this.fileSubpath,
                    index: this.props.fileIndex,
                    isFullscreen: this.props.isFullscreen,
                    isMobileUserAgent: this.props.isMobileUserAgent,
                    isSidebarOpen: this.props.isSidebarOpen,
                    maxFilenameEmLength: $.SizeClassFilenameLengthMap[this.props.sizeClass],
                    onNext: this.props.onFlipNext,
                    onPrevious: this.props.onFlipPrevious,
                    sharedLinkInfo: this.props.sharedLinkInfo,
                    location: this.props.location,
                    sharePermission: this.props.sharePermission,
                    shareToken: this.props.shareToken,
                    shouldFocusOnReady: !1,
                    sidebar: this.props.sidebar,
                    sourceAction: this.previewSourceAction,
                    sourceContext: this.previewSourceContext,
                    sharedLinkUrl: null != this.props.sharedLinkInfo ? this.props.sharedLinkInfo.url : void 0,
                    setRenderStatusSuccess: this.props.setRenderStatusSuccessForCurrentFile,
                    shouldDisplayToolbar: this.isImagePreviewAnnotationEnabled(),
                    sizeClass: this.props.sizeClass,
                    user: this.props.user,
                    mode: this.props.mode,
                    showCloudDocPreview: this.props.showCloudDocPreview,
                    LoggedOutUXGoogleVariant: this.props.LoggedOutUXGoogleVariant,
                    LoggedOutUXPaperVariant: this.props.LoggedOutUXPaperVariant
                }), this.renderFlippableControls()))
            }, s.prototype.shouldRenderSidebar = function() {
                return this.props.sizeClass !== B.SizeClass.Small && !this.props.isFullscreen && !this.props.hidePageChrome && null != this.props.file.ns_id
            }, s.prototype.renderSidebar = function() {
                if (!this.shouldRenderSidebar()) return null;
                var e = this.props,
                    t = e.sizeClass,
                    r = e.file,
                    n = e.user,
                    a = e.sharedLinkInfo,
                    s = e.hellosignAppAction,
                    l = e.isVersionHistoryMode,
                    c = e.shareToken,
                    u = e.sharePermission,
                    d = e.canRestoreRevision,
                    p = e.onRestoreRevision,
                    m = e.sidebar,
                    f = e.encryptionOptions;
                return o.default.createElement("div", {
                    className: i.default("react-file-viewer__sidebar", {
                        "react-file-viewer__sidebar--closed": m.visibility === de.SidebarVisibility.Closed
                    }),
                    "data-preview-type": this.previewType,
                    "data-theme": "web"
                }, o.default.createElement(T.Sidebar, {
                    sizeClass: t,
                    file: r,
                    user: n,
                    sharedLinkInfo: a,
                    hellosignAppAction: s,
                    isVersionHistoryMode: l,
                    isViewingFileSubpath: !!this.isViewingFileSubpath,
                    sharePermission: u,
                    shareToken: c,
                    previewType: this.previewType,
                    isSeenStatesEnabled: !this.shouldSuppressPassInfo(),
                    onHelloSignAppActionLaunch: this.handleHelloSignAppActionLaunch,
                    canRestoreRevision: d,
                    onRestoreRevision: p,
                    renderSidebarOverflowMenuFn: this.renderOverflowMenuFnFactory($.OverflowMenuDirection.BELOW),
                    encryptionOptions: f
                }))
            }, s.prototype.shouldRenderMobileWebComments = function() {
                return this.props.sizeClass === B.SizeClass.Small
            }, s.prototype.renderMobileComments = function() {
                var e = this.props,
                    t = e.file,
                    r = e.sharedLinkInfo,
                    i = e.sizeClass,
                    n = e.user,
                    a = e.isFullscreen;
                return !this.shouldRenderMobileWebComments() || a || this.isViewingFileSubpath || this.props.hidePageChrome || null == t.ns_id ? null : o.default.createElement(l.MobileWebComments, {
                    currentFile: t,
                    previewType: this.previewType,
                    sharedLinkInfo: r,
                    user: n,
                    sizeClass: i
                })
            }, s.prototype.renderBanner = function() {
                return o.default.createElement("div", {
                    className: "react-file-viewer__banner"
                }, this.renderUpsellBanner(), this.renderTrialBanner())
            }, s.prototype.renderTitleBar = function() {
                return this.props.isFullscreen || this.props.hidePageChrome && !m.isArchive(this.props.previewApiData.data) ? null : this.props.mode === f.FileViewerMode.Watermarking ? o.default.createElement(ge.EditModeTitlebar, {
                    user: this.props.user,
                    file: this.props.file,
                    maxFilenameEmLength: $.SizeClassFilenameLengthMap[this.props.sizeClass],
                    title: X.intl.formatMessage({
                        defaultMessage: "Watermarking"
                    }),
                    mode: f.FileViewerMode.Watermarking,
                    sizeClass: this.props.sizeClass
                }) : this.props.mode === f.FileViewerMode.Markup ? o.default.createElement(ge.EditModeTitlebar, {
                    user: this.props.user,
                    file: this.props.file,
                    maxFilenameEmLength: $.SizeClassFilenameLengthMap[this.props.sizeClass],
                    title: X.intl.formatMessage({
                        defaultMessage: "Markup"
                    }),
                    beta: !0,
                    mode: f.FileViewerMode.Markup,
                    sizeClass: this.props.sizeClass
                }) : o.default.createElement(ue.FileTitleBar, {
                    file: this.props.file,
                    maxFilenameEmLength: $.SizeClassFilenameLengthMap[this.props.sizeClass],
                    isViewingFileSubpath: this.isViewingFileSubpath,
                    user: this.props.user || null,
                    isSidebarOpen: this.props.sidebar.visibility === de.SidebarVisibility.Open,
                    closeUrl: this.props.titleBarCloseUrl,
                    onClose: this.props.onCloseViewer,
                    canClose: this.props.canClose,
                    hidePageChrome: this.props.hidePageChrome,
                    fileViewAction: this.props.fileViewAction,
                    fileViewOrigin: this.props.fileViewOrigin,
                    isVersionHistoryMode: this.props.isVersionHistoryMode,
                    sharedLinkInfo: this.props.sharedLinkInfo,
                    fileSubpath: this.fileSubpath,
                    previewType: this.previewType,
                    renderTitlebarOverflowMenuFn: this.renderOverflowMenuFnFactory($.OverflowMenuDirection.BELOW),
                    hideIcon: this.shouldRenderPersistentHeader()
                })
            }, s.prototype.shouldAllowFileDonation = function() {
                return null == this.props.sharedLinkInfo && (null == this.props.user || this.props.user.home_ns_id === this.props.file.ns_id)
            }, s.prototype.renderRetrievalSuccessBanner = function() {
                var e = this.props,
                    t = e.user,
                    r = e.hidePageChrome,
                    i = e.isEditMode,
                    n = e.renderStatus,
                    a = e.sizeClass;
                return t && ee.shouldShowRetrievalSuccessBanner({
                    renderStatus: n,
                    hidePageChrome: r,
                    sizeClass: a,
                    isEditMode: i
                }) ? o.default.createElement(ie.RetrievalSuccessFilesviewBanner, {
                    user: this.props.user,
                    displayContext: re.SearchSuccessDisplayContext.PREVIEW
                }) : null
            }, s.prototype.maybeRenderFidelitySurvey = function() {
                var e = this.props,
                    t = e.file,
                    r = e.hidePageChrome,
                    i = e.isEditMode,
                    n = e.renderStatus,
                    a = e.sizeClass;
                return ee.canShowFidelitySurvey({
                    file: t,
                    sizeClass: a,
                    hidePageChrome: r,
                    renderStatus: n,
                    isEditMode: i
                }) ? o.default.createElement(W.FidelitySurvey, {
                    allowFileDonation: this.shouldAllowFileDonation(),
                    file: t
                }) : null
            }, s.prototype.renderReportFlag = function() {
                return this.props.sharedLinkInfo && !1 !== this.props.sharedLinkInfo.hasPublicAudienceOrVisibility && !this.props.hidePageChrome ? o.default.createElement(ce.AsyncReportFlag, {
                    sharedLink: this.props.sharedLinkInfo.url
                }) : null
            }, s.prototype.renderUpsellBanner = function() {
                return this.props.showOverQuotaUpsell ? o.default.createElement(S.ExpFileViewerUpsellBannerV2, null) : null
            }, s.prototype.renderTrialBanner = function() {
                var e = this.props,
                    t = e.mode;
                return e.isTrialMode ? o.default.createElement(le.Banner, {
                    mode: t,
                    onClick: this.onTrialBannerClicked
                }) : null
            }, s.prototype.shouldRenderPersistentHeader = function() {
                return !this.props.user && !this.props.hidePageChrome && this.props.sizeClass !== B.SizeClass.Small && he.shouldShowPersistentHeader()
            }, s.prototype.renderPersistentHeader = function() {
                return this.shouldRenderPersistentHeader() ? o.default.createElement(ve.PersistentHeader, {
                    sharedLinkInfo: this.props.sharedLinkInfo
                }) : null
            }, s.prototype.shouldRenderPersistentFooter = function() {
                return !this.props.user && !this.props.hidePageChrome && this.props.sizeClass !== B.SizeClass.Small && he.shouldShowPersistentFooter()
            }, s.prototype.renderPersistentFooter = function() {
                return this.shouldRenderPersistentFooter() ? o.default.createElement(_e.PersistentFooter, {
                    sharedLinkInfo: this.props.sharedLinkInfo,
                    previewType: this.previewType,
                    file: this.props.file
                }) : null
            }, s.prototype.shouldRenderSETHeader = function() {
                return !(this.state.dismissedSETHeader || !this.props.suggestTeamInfo || !this.props.user || this.props.hidePageChrome || this.props.sizeClass === B.SizeClass.Small)
            }, s.prototype.renderSETHeader = function() {
                var e = this;
                if (this.shouldRenderSETHeader()) {
                    var t = this.props,
                        r = t.suggestTeamInfo,
                        i = t.user;
                    if (r && i) return o.default.createElement(h.SurfaceExistingTeamsHeader, {
                        suggestTeamInfo: r,
                        user: i,
                        dismissHeader: function() {
                            return e.setState({
                                dismissedSETHeader: !0
                            })
                        }
                    })
                }
                return null
            }, s.prototype.renderExperimentHeader = function() {
                return this.renderPersistentHeader() || this.renderSETHeader()
            }, s.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    r = e.file,
                    n = e.hidePageChrome,
                    a = e.isFullscreen,
                    s = e.sharedLinkInfo,
                    l = e.transparentBackground,
                    c = e.user,
                    u = e.isEditMode,
                    d = void 0 !== u && u,
                    m = e.isWatermarkingMode,
                    f = void 0 !== m && m,
                    g = e.campaign,
                    h = te.getFilename(r),
                    v = this.previewType;
                return this.shouldShowAppDownloadInterstitial() ? o.default.createElement(we.RegisterComponentWithBugReporter, {
                    componentId: "web.file_viewer",
                    componentName: "File Viewer"
                }, o.default.createElement("div", {
                    "aria-label": h
                }, o.default.createElement(_.FilePreviewAppDownloadInterstitial, {
                    sharedLinkInfo: s,
                    file: r,
                    previewType: v,
                    fileViewerSession: M.FileViewerSession.currentSession,
                    previewSourceAction: this.previewSourceAction,
                    previewSourceContext: this.previewSourceContext,
                    onClose: this.onInterstitialClose,
                    onContinue: this.onInterstitialContinue
                }))) : o.default.createElement(we.RegisterComponentWithBugReporter, {
                    componentId: "web.file_viewer",
                    componentName: "File Viewer"
                }, o.default.createElement(F.KeyboardBindingProvider, {
                    onDestroy: this.cleanupKeymaster,
                    onSetup: this.setupKeymaster
                }, o.default.createElement(Pe, {
                    ns_id: r.ns_id
                }, o.default.createElement("div", {
                    "aria-label": h,
                    className: i.default("react-file-viewer", "preview-type-" + (this.previewType ? this.previewType.toLowerCase() : "unknown"), t, this.state.modeClassnames, {
                        "no-background": l && !a,
                        "react-file-viewer--edit-mode": d
                    }),
                    role: "dialog"
                }, this.renderExperimentHeader(), this.renderPersistentFooter(), o.default.createElement(I.KeyboardBindingConnector, {
                    keyboardBindings: this.getKeyboardBindings({
                        isFullscreen: a,
                        isWatermarkingMode: f
                    })
                }), this.renderBanner(), o.default.createElement("div", {
                    className: "react-file-viewer__main"
                }, g && c && !n ? o.default.createElement(pe.FileViewerPrompt, {
                    user: c,
                    campaign: g
                }) : null, o.default.createElement("div", {
                    className: i.default("react-file-viewer__content", "comments2", {
                        "comments2-mobile-web": this.shouldRenderMobileWebComments(),
                        "comments2-annotation-enabled": !0,
                        "video-audio": this.previewType === p.PreviewType.Video || this.previewType === p.PreviewType.Audio,
                        "react-file-viewer__content--edit-mode": d
                    }),
                    "data-preview-type": v,
                    "data-theme": "web"
                }, this.renderTitleBar(), this.renderFilePreview(), this.renderMobileComments(), this.renderManagers()), this.renderSidebar())))))
            }, s.defaultProps = {
                canClose: !1,
                canRestoreRevision: !1,
                className: "",
                hideComments: !1,
                hidePageChrome: !1,
                isVersionHistoryMode: !1,
                forceFileUnlocked: !1,
                oref: j.OREF_CONSTANTS.BROWSE_UNKNOWN,
                sizeClass: B.SizeClass.Large,
                fileCount: 0,
                showCloudDocPreview: !1,
                docClassificationVariant: null
            }, s
        })(o.default.Component);
    t._FileViewer = ke;
    var Pe = function(e) {
            var t = e.children;
            return null == e.ns_id ? o.default.createElement(o.default.Fragment, null, t) : o.default.createElement(g.FileSidebarProvider, null, t)
        },
        Me = D.withLocation((function(e) {
            return null != e.file ? o.default.createElement(ke, r.__assign({}, e)) : o.default.createElement("div", null)
        })),
        Te = ye.withBrandingProvider(Me),
        Ae = V.withSizeClass(Te, {
            isResponsiveEnabled: ee.isResponsiveEnabled,
            responsiveClassName: $.ResponsiveClassName
        }),
        xe = se.withTranslations(Ae),
        Fe = s.connect((function(e, t) {
            var r = Y.getAppDownloadInterstitial(e);
            void 0 === r && t && (r = t.appDownloadInterstitialDismissed);
            var i = Y.getActiveFile(e);
            return {
                appDownloadInterstitialDismissed: r,
                file: i,
                hellosignAppAction: (function() {
                    if (i) return Y.getHelloSignAppActionForFile(e, i)
                })(),
                mode: Y.getMode(e),
                isFullscreen: Y.getIsFullScreen(e),
                isSidebarOpen: Y.getIsSidebarOpen(e),
                renderStatus: Y.getRenderStatusForCurrentFile(e),
                showOverQuotaUpsell: Y.getShowOverQuotaUpsell(e),
                sidebar: Y.getSidebar(e),
                isEditMode: Y.getIsEditMode(e),
                isWatermarkingMode: Y.getIsWatermarkingMode(e),
                isTrialMode: Y.getIsTrialMode(e),
                campaign: Y.getSelectedPromptCampaign(e),
                previewApiData: Z.getApiDataForFile(e, i),
                extensionsEnabled: Y.getExtensionsEnabled(e),
                docClassificationVariant: (function() {
                    if (!i) return null;
                    var t = te.getExtension(i);
                    return t && !1 !== b.ML_EXPERIMENT_EXTENSIONS.includes(t) && (J.isHelloSignAppActionInFileViewerSidebarEnabled(e) || J.isHelloSignDeepIntegrationInFileViewerSidebarEnabled(e)) && J.isHelloSignMLClassificationEnabled(e) ? J.getHelloSignMLClassificationVariant(e) : null
                })()
            }
        }), {
            onAppDownloadInterstitialDismissed: w.dismissAppDownloadInterstitial,
            fetchShowOverQuotaUpsell: w.fetchShowOverQuotaUpsell,
            setRenderStatusSuccessForCurrentFile: w.setRenderStatusSuccessForCurrentFile,
            fetchControllerModeAction: w.fetchControllerModeAction,
            fetchBestCampaignsAction: w.fetchBestCampaignsAction,
            fetchDocClassificationAction: w.fetchDocClassificationAction,
            changeMode: w.changeMode,
            updateLinkState: Ee.updateLinkState
        })(xe),
        Ie = y.getStoreForFileViewer(),
        Oe = Q.requireCssWithComponent((function(e) {
            return o.default.createElement(s.Provider, {
                store: Ie
            }, o.default.createElement(Fe, r.__assign({}, e)))
        }), ["/static/css/preview_flexbox_layout-vflcNZzXn.css", "/static/css/react_file_viewer-vflcXggWB.css", "/static/css/react_title_bar-vflBOJsqq.css", "/static/css/spectrum/index.web-vfl_-DzRS.css", "/static/js/file-viewer/index.web-vflp3fAjz.css", "/static/js/premium-workflows/index.web-vfllNksCK.css"]);
    t.FileViewer = Oe
})), define("modules/clean/react/file_viewer/flippable_controls", ["require", "exports", "tslib", "react", "modules/clean/react/sprite", "modules/core/i18n"], (function(e, t, r, i, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.handlePreviousClick = function() {
                t.props.onPrevious && t.props.onPrevious()
            }, t.handleNextClick = function() {
                t.props.onNext && t.props.onNext()
            }, t
        }
        return r.__extends(t, e), t.prototype.getNavText = function() {
            return o.intl.formatMessage({
                defaultMessage: "{cur_file_num} of {num_total_files}"
            }, {
                cur_file_num: this.props.index,
                num_total_files: this.props.numFlippableFiles
            })
        }, t.prototype.render = function() {
            if (this.props.numFlippableFiles <= 1) return null;
            var e = o.intl.formatMessage({
                    defaultMessage: "Flip left",
                    description: "Flip to the previous file in a series of files when previewing files on the web"
                }),
                t = o.intl.formatMessage({
                    defaultMessage: "Flip right",
                    description: "Flip to the next file in a series of files when previewing files on the web"
                });
            return i.default.createElement("div", {
                className: "react-file-viewer__controls"
            }, i.default.createElement("button", {
                className: "nav-control",
                onClick: this.handlePreviousClick
            }, i.default.createElement(n.Sprite, {
                group: "web",
                name: "s_flip_left",
                alt: e
            })), i.default.createElement("div", {
                className: "nav-text"
            }, this.getNavText()), i.default.createElement("button", {
                className: "nav-control",
                onClick: this.handleNextClick
            }, i.default.createElement(n.Sprite, {
                group: "web",
                name: "s_flip_right",
                alt: t
            })))
        }, t
    })((i = r.__importDefault(i)).default.Component);
    t.FlippableControls = a
})), define("modules/clean/react/file_viewer/full_screen_helpers", ["require", "exports", "modules/clean/react/file_viewer/data/store", "modules/clean/react/file_viewer/data/actions", "modules/clean/react/file_viewer/logging", "modules/clean/react/file_viewer/constants"], (function(e, t, r, i, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = r.getStoreForFileViewer();

    function s() {
        m() || p(o.UserActionContext.Browser)
    }

    function l() {
        p(o.UserActionContext.Browser)
    }

    function c() {
        var e;
        e = s, document.addEventListener("fullscreenchange", e), document.addEventListener("webkitfullscreenchange", e), document.addEventListener("MSFullscreenChange", e), document.addEventListener("mozfullscreenchange", e), (function(e) {
            window.addEventListener("popstate", e)
        })(l)
    }

    function u() {
        var e;
        e = s, document.removeEventListener("fullscreenchange", e), document.removeEventListener("webkitfullscreenchange", e), document.removeEventListener("MSFullscreenChange", e), document.removeEventListener("mozfullscreenchange", e), (function(e) {
            window.removeEventListener("popstate", e)
        })(l)
    }

    function d(e) {
        var t;
        a.dispatch(i.openFullScreen()), null != (t = document.body).requestFullscreen ? t.requestFullscreen() : null != t.msRequestFullscreen ? t.msRequestFullscreen() : null != t.mozRequestFullScreen ? t.mozRequestFullScreen() : null != t.webkitRequestFullscreen && t.webkitRequestFullscreen(), c(), e && n.logUserAction(o.UserAction.ToggleFullscreenOn, e)
    }

    function p(e) {
        var t;
        u(), a.dispatch(i.closeFullScreen()), (t = document).exitFullscreen ? t.exitFullscreen() : t.msExitFullscreen ? t.msExitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen && t.webkitExitFullscreen(), e && n.logUserAction(o.UserAction.ToggleFullscreenOff, e)
    }

    function m() {
        var e = document;
        return null != e.fullScreen ? e.fullScreen : null != e.webkitIsFullScreen ? e.webkitIsFullScreen : null != e.mozFullScreen ? e.mozFullScreen : null != e.msFullscreenElement || null != e.fullscreenElement
    }
    t.enterFullScreen = d, t.exitFullScreen = p, t.browserSupportFullScreen = function() {
        var e = document.body;
        return e.requestFullscreen || e.msRequestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullscreen
    }, t.isBrowserFullScreen = m, t.toggleFullScreen = function(e, t) {
        return e || m() ? p(t) : d(t)
    }
})), define("modules/clean/react/file_viewer/mode_manager", ["require", "exports", "tslib", "react", "react-redux", "modules/clean/react/file_viewer/data/selectors", "modules/clean/react/file_viewer/data/actions", "file-viewer/core"], (function(e, t, r, i, n, o, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.componentDidUpdate = function() {
            this.unavailableModes()[this.props.mode] && this.props.mode !== s.FileViewerMode.Default && this.props.changeMode(s.FileViewerMode.Default)
        }, t.prototype.unavailableModes = function() {
            var e = r.__assign({}, this.props.disabledModes);
            return this.props.isViewingFileSubpath && (e[s.FileViewerMode.Commenting] = !0), e
        }, t.prototype.render = function() {
            return null
        }, t
    })((i = r.__importDefault(i)).default.PureComponent);
    t.UnconnectedModeManager = l, t.ModeManager = n.connect((function(e) {
        return {
            mode: o.getMode(e),
            disabledModes: o.getDisabledModes(e)
        }
    }), {
        changeMode: a.changeMode
    })(l)
}));
var __importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer/open_button/open_button", ["require", "exports", "modules/clean/react/async/loadable"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.OpenButton = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer/open_button/open_button_component"], t, r)
            })).then(__importStar).then((function(e) {
                return e.OpenButton
            }))
        }
    })
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer/prompt/loadable_prompt", ["require", "exports", "modules/clean/react/async/loadable"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FileViewerPrompt = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer/prompt/prompt"], t, r)
            })).then(__importStar).then((function(e) {
                return e.SyncFileViewerPrompt
            }))
        }
    })
})), define("modules/clean/react/file_viewer/utils", ["require", "exports", "tslib", "modules/clean/ajax", "modules/core/browser", "modules/clean/previews/constants", "modules/clean/react/file_viewer/constants", "modules/clean/file_store/utils", "modules/clean/previews/data/preview_type_util", "modules/core/uri", "modules/clean/react/previews/constants", "modules/clean/react/previews/image_helpers", "modules/clean/react/file_viewer/constants", "modules/clean/react/size_class/constants", "modules/clean/previews/api"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f) {
    "use strict";

    function g() {
        return new c.URI({
            path: "/login",
            query: {
                cont: n.get_href()
            }
        }).toString()
    }

    function h(e) {
        return !e
    }

    function v() {
        var e = n.get_uri().path;
        return /^\/(home|work|personal|search)/.test(e) ? u.PreviewSourceContext.Browse : /^\/h$/.test(e) ? u.PreviewSourceContext.Home : /^\/(s|scl\/fi)\//.test(e) ? u.PreviewSourceContext.SharedLinkFile : /^\/(sh|scl\/fo)\//.test(e) ? u.PreviewSourceContext.SharedLinkFolder : /^\/sc\//.test(e) ? u.PreviewSourceContext.SharedLinkCollection : /^\/history/.test(e) ? u.PreviewSourceContext.VersionHistory : void 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), n = r.__importStar(n), d = r.__importStar(d), t.TooltipHelpers = {
        fetchTooltipInfo: function(e, t) {
            i.SilentBackgroundRequest({
                url: "/ow/get_available_tooltips",
                dataType: "json",
                success: function(e) {
                    return t(e)
                },
                subject_user: e
            })
        },
        getVendorAndApplication: function(e, t) {
            for (var r in e)
                if (e.hasOwnProperty(r)) {
                    var i = e[r];
                    for (var n in i) {
                        if (i.hasOwnProperty(n))
                            if (i[n].extensions.indexOf(t) > -1) return {
                                vendor: r,
                                application: n
                            }
                    }
                }
            return null
        },
        logImpression: function(e, t, r) {
            "acrobat_or_reader" === r ? i.SilentBackgroundRequest({
                url: "/ow/log_adobe_tooltip_impression",
                data: {
                    app_name: r,
                    extension: e
                },
                subject_user: t
            }) : i.SilentBackgroundRequest({
                url: "/ow/msft/log_tooltip_impression",
                data: {
                    app_type: r,
                    extension: e
                },
                subject_user: t
            })
        }
    }, t.getSplitButtonUserActionContext = function(e, t) {
        if (e === a.SplitButtonActionLocation.Main) {
            if (t === a.FileViewerPane.TitleBar) return a.UserActionContext.TitleBarMain;
            if (t === a.FileViewerPane.PreviewContent) return a.UserActionContext.PreviewContentMain
        } else if (e === a.SplitButtonActionLocation.Split) {
            if (t === a.FileViewerPane.TitleBar) return a.UserActionContext.TitleBarSplitButton;
            if (t === a.FileViewerPane.PreviewContent) return a.UserActionContext.PreviewContentSplitButton
        }
        return a.UserActionContext.Unknown
    }, t.modalIsUp = function() {
        for (var e = !1, t = document.getElementsByClassName("db-modal-wrapper"), r = 0; !e && r < t.length; r++) {
            e = "none" !== window.getComputedStyle(t[r]).display
        }
        return e
    }, t.cleanupPrerenderPreview = function() {
        var e = document.querySelectorAll(".prerender-preview");
        Array.prototype.forEach.call(e, (function(e) {
            e.style.display = "none"
        }))
    }, t.getSharedLinkLoginUrl = g, t.sharedLinkLoginUrl = g(), t.getFileViewerInterfaceTypeForSharedLink = function(e) {
        switch (e) {
            case o.PreviewType.Image:
                return a.FileViewerInterfaceType.Window;
            case o.PreviewType.SsrDoc:
                return a.FileViewerInterfaceType.Frame;
            default:
                return
        }
    }, t.isMountedFile = h, t.isFileEditable = function(e) {
        return !!e && (s.isBrowseFile(e) && !e.read_only)
    }, t.canDownloadFile = function(e, t) {
        return h(e) || t && t.canDownloadRoles.length > 0
    }, t.canUserUsePaper = function(e) {
        return null != e && !e.is_paper_disabled
    }, t.canShowFidelitySurvey = function(e) {
        var t = e.file,
            r = e.renderStatus,
            i = e.hidePageChrome,
            n = e.sizeClass,
            o = e.isEditMode;
        return !!t && (r === p.PreviewRenderStatus.Succeeded && (!i && (n !== m.SizeClass.Small && !o)))
    }, t.getSourceContext = v, t.getSourceAction = function() {
        switch (v()) {
            case u.PreviewSourceContext.SharedLinkFile:
            case u.PreviewSourceContext.SharedLinkFolder:
                return u.PreviewSourceAction.Visit;
            default:
                return u.PreviewSourceAction.Click
        }
    }, t.preloadImages = function(e, t) {
        if (0 !== e.length) {
            var r = [];
            [0, 1, 2, 3, 4, 5, 6, -1, -2].forEach((function(i) {
                var n = (t + i + e.length) % e.length; - 1 === r.indexOf(n) && r.push(n)
            })), r.forEach((function(t) {
                if (e.length > t && l.isImage(e[t])) {
                    var r = e[t];
                    if (r) {
                        var i = r.content.thumbnail_url_tmpl || r.preview_url;
                        i && d.preloadResponsiveImage(i)
                    }
                }
            }))
        }
    }, t.shouldShowRetrievalSuccessBanner = function(e) {
        var t = e.renderStatus,
            r = e.hidePageChrome,
            i = e.sizeClass,
            n = e.isEditMode;
        return t === p.PreviewRenderStatus.Succeeded && !r && i !== m.SizeClass.Small && !n
    }, t.fetchRivieraStatusCode = function(e, t, r) {
        void 0 === r && (r = function() {});
        var i = new XMLHttpRequest;
        return i.open("GET", e), i.withCredentials = !0, i.onreadystatechange = function() {
            if (i.readyState === XMLHttpRequest.DONE) {
                var e = f.getParsedDropboxMetadataHeader(i);
                e.rivieraStatusCode ? t(e.rivieraStatusCode) : r()
            }
        }, i.send(), i
    }, t.isResponsiveEnabled = function() {
        return v() !== u.PreviewSourceContext.VersionHistory
    }
})), define("modules/clean/react/file_viewer_sidebar/buttons/icon", ["require", "exports", "tslib", "react", "spectrum/icon_action", "spectrum/colorized_icon"], (function(e, t, r, i, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i);
    t.ButtonIcon = function(e) {
        var t = e.isPrimary,
            a = r.__rest(e, ["isPrimary"]);
        return i.default.createElement(o.ColorizedIcon, {
            color: t ? "white" : "#717781"
        }, i.default.createElement(n.IconAction, r.__assign({}, a)))
    }
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/buttons/more_dropdown", ["require", "exports", "modules/clean/react/async/loadable"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.AsyncSharedFileMoreDropdown = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer/shared_file_actions"], t, r)
            })).then(__importStar).then((function(e) {
                return e.SharedFileMoreDropdown
            }))
        }
    }), t.AsyncMountedFileMoreDropdown = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer/mounted_file_actions"], t, r)
            })).then(__importStar).then((function(e) {
                return e.MountedFileMoreDropdown
            }))
        }
    })
})), define("modules/clean/react/file_viewer_sidebar/buttons/mounted_file_actions", ["require", "exports", "tslib", "react", "modules/clean/react/async/loadable", "modules/clean/react/app_actions/app_actions_menu", "modules/clean/react/file_viewer/open_button/open_button"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.AsyncShareButton = n.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer/share_button"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.ShareButton
            }))
        }
    }), t.AsyncOpenButton = a.OpenButton, t.AsyncExtensionsButton = function(e) {
        return i.default.createElement("div", {
            className: "control__button"
        }, i.default.createElement(o.ExtensionsMenu, r.__assign({}, e)))
    }
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/buttons/shared_file_actions", ["require", "exports", "modules/clean/react/async/loadable", "modules/clean/react/share_download/button"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.AsyncEditNowButton = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/cloud_docs/edit_now_button"], t, r)
            })).then(__importStar).then((function(e) {
                return e.EditNowButton
            }))
        }
    }), t.AsyncSignInButton = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/sign_in/button"], t, r)
            })).then(__importStar).then((function(e) {
                return e.SignInButton
            }))
        }
    }), t.AsyncExtensionsMenuNoUnity = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/extensions/extensions_menu_component_v2"], t, r)
            })).then(__importStar).then((function(e) {
                return e.ExtensionsMenuV2NoUnity
            }))
        }
    }), t.AsyncOpenInAppButton = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/open_in_app/button"], t, r)
            })).then(__importStar).then((function(e) {
                return e.OpenInAppButton
            }))
        }
    }), t.AsyncShareDownloadButton = i.ShareDownloadButton
})), define("modules/clean/react/file_viewer_sidebar/buttons/version_history_file_actions", ["require", "exports", "tslib", "react", "classnames", "spectrum/button", "modules/clean/react/file_viewer_sidebar/buttons/icon", "modules/core/i18n"], (function(e, t, r, i, n, o, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), t.RestoreButton = function(e) {
        var t = s.intl.formatMessage({
            defaultMessage: "Restore"
        });
        return i.default.createElement(o.Button, {
            variant: "primary",
            className: n.default("control__button", "restore-button", {
                "control__button--collapsed": e.isCollapsed
            }),
            onClick: e.onClick
        }, e.isCollapsed ? i.default.createElement(a.ButtonIcon, {
            isPrimary: !0,
            name: "restore-file",
            "aria-label": t
        }) : t)
    }
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/data_managers/async_activity_data_manager", ["require", "exports", "modules/clean/react/async/loadable", "modules/clean/web_timing_logger"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.AsyncActivityDataManager = r.Loadable({
        loader: function() {
            return i.waitForTTI().then((function() {
                return new Promise((function(t, r) {
                    e(["modules/clean/react/file_viewer_sidebar/data_managers/activity_data_manager"], t, r)
                })).then(__importStar)
            })).then((function(e) {
                return e.ActivityDataManager
            }))
        }
    })
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/data_managers/async_commenting_data_manager", ["require", "exports", "modules/clean/react/async/loadable", "modules/clean/web_timing_logger"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.AsyncCommentingDataManager = r.Loadable({
        loader: function() {
            return i.waitForTTI().then((function() {
                return new Promise((function(t, r) {
                    e(["modules/clean/react/file_viewer_sidebar/data_managers/commenting_data_manager"], t, r)
                })).then(__importStar)
            })).then((function(e) {
                return e.CommentingDataManager
            }))
        }
    })
})), define("modules/clean/react/file_viewer_sidebar/panes/commenting_pane", ["require", "exports", "tslib", "react", "file-viewer/modes", "modules/clean/react/async/loadable", "file-viewer/core"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i);
    var s = o.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer_sidebar/panes/commenting_pane_contents"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.CommentingPaneContents
            }))
        }
    });
    t.CommentingPane = function(e) {
        var t = e.coreFVUiProps;
        return i.default.createElement(n.Pane, r.__assign({
            paneId: a.SidebarPaneId.Comments
        }, t), i.default.createElement(s, null))
    }
})), define("modules/clean/react/file_viewer_sidebar/panes/documentation_pane", ["require", "exports", "tslib", "react", "file-viewer/modes", "file-viewer/core", "modules/clean/em_string", "modules/clean/file_store/utils", "modules/clean/react/css", "modules/clean/react/file_viewer_sidebar/panes/strings", "modules/clean/react/file_viewer/data/actions", "react-redux", "modules/clean/react/file_viewer_sidebar/panes/file_activity_section", "modules/clean/react/file_viewer_sidebar/panes/loadable_details_section"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.UnconnectedDocumentationPaneComponent = function(e) {
        var t = e.file,
            l = e.user,
            u = e.maxFilenameEmLength,
            d = e.sharedLinkInfo,
            f = e.isVersionHistoryMode,
            g = e.coreFVUiProps,
            h = e.disableOnboardingCard,
            v = a.Emstring.em_snippet(s.getFilename(t), u);
        return i.default.createElement(n.Pane, r.__assign({
            paneId: o.SidebarPaneId.Documentation
        }, g), i.default.createElement("div", {
            className: "documentation-pane"
        }, i.default.createElement("div", {
            className: "documentation-pane__title"
        }, v), i.default.createElement(m.LoadableDetailsSection, {
            title: c.DocumentationPaneStrings.details,
            file: t,
            user: l,
            sharedLinkInfo: d,
            pushMetadataPaneHandler: function() {
                return e.pushSidebarPane(o.SidebarPaneId.Metadata)
            }
        }), i.default.createElement(p.ConnectedFileActivitySection, {
            file: t,
            user: l,
            isVersionHistoryMode: f,
            title: c.DocumentationPaneStrings.activity,
            pushActivityPaneHandler: function() {
                return e.pushSidebarPane(o.SidebarPaneId.Activity)
            },
            disableOnboardingCard: h
        })))
    };
    var f = {
        pushSidebarPane: u.pushSidebarPane
    };
    t.ConnectedDocumentationPaneComponent = d.connect(null, f)(t.UnconnectedDocumentationPaneComponent), t.DocumentationPane = l.requireCssWithComponent(t.ConnectedDocumentationPaneComponent, ["/static/css/file_viewer_sidebar/documentation_pane-vflEFmR4q.css"])
})), define("modules/clean/react/file_viewer_sidebar/panes/editing_pane", ["require", "exports", "tslib", "react", "classnames", "file-viewer/modes", "modules/clean/react/css"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n);
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.componentWillUnmount = function() {
            var e = this.props.paneId,
                t = document.querySelector('[data-control-id="' + e + '"]');
            t && t.focus()
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.coreFVUiProps,
                a = e.paneId,
                s = e.children,
                l = e.classname;
            return i.default.createElement(o.Pane, r.__assign({
                paneId: a,
                className: "editing-pane-wrapper"
            }, t), i.default.createElement("div", {
                "aria-labelledby": "react-file-viewer__title-bar",
                "aria-modal": "true",
                className: n.default("editing-pane", l),
                role: "dialog"
            }, s))
        }, t
    })(i.default.PureComponent);
    t.EditingPaneComponent = s, t.EditingPane = a.requireCssWithComponent(s, ["/static/css/file_viewer_sidebar/editing_pane-vfljT-58j.css"])
})), define("modules/clean/react/file_viewer_sidebar/panes/file_activity_section", ["require", "exports", "tslib", "react", "modules/clean/react/file_sidebar/file_sidebar_connect", "modules/clean/react/file_sidebar/store/file_activity/selectors", "spectrum/icon_arrow", "spectrum/colorized_icon", "modules/clean/react/css", "modules/clean/react/file_viewer_sidebar/panes/loadable_file_activity_stream_summary", "spectrum/button", "modules/clean/react/file_viewer_sidebar/panes/strings"], (function(e, t, r, i, n, o, a, s, l, c, u, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), o = r.__importStar(o);
    var p = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.activities,
                r = e.user,
                n = e.isVersionHistoryMode,
                o = e.isFileActivityEnabled,
                l = e.disableOnboardingCard,
                p = e.title,
                m = e.pushActivityPaneHandler,
                f = e.file;
            if (!r || n || !o) return null;
            var g = t && !t.loading && 0 !== t.value.length;
            return i.default.createElement("div", {
                className: "documentation-pane__section"
            }, i.default.createElement("div", {
                className: "documentation-pane__section-title"
            }, p), i.default.createElement(c.LoadableFileActivityStreamSummary, {
                file: f,
                user: r,
                maxVisibleActivityCards: 2,
                disableOnboardingCard: l
            }), g && i.default.createElement("div", {
                className: "documentation-pane__push-pane-button-wrapper"
            }, i.default.createElement(u.Button, {
                variant: "styleless",
                className: "documentation-pane__push-pane-button",
                onClick: m
            }, d.ActivitySectionStrings.viewAllActivities, i.default.createElement("span", {
                className: "documentation-pane__arrow-right-icon"
            }, i.default.createElement(s.ColorizedIcon, null, i.default.createElement(a.IconArrow, {
                name: "right-small",
                width: 16,
                height: 16
            }))))))
        }, t
    })(i.default.Component);
    t.UnconnectedFileActivitySection = p, t.ConnectedFileActivitySection = n.fileSidebarConnect((function(e) {
        return {
            isFileActivityEnabled: o.isActivityEnabled(e),
            activities: o.getActivitiesMetadata(e)
        }
    }))(l.requireCssWithComponent(p, ["/static/css/file_activity_stream-vflBDI5bM.css"]))
})), define("modules/clean/react/file_viewer_sidebar/panes/image_chooser_section", ["require", "exports", "tslib", "react", "dropins_sdk_refactor/dropins_sdk_internal", "modules/clean/filepath", "modules/clean/loggers/workflows_logger", "spectrum/popover", "modules/core/i18n", "modules/clean/react/snackbar", "modules/clean/react/css", "classnames", "spectrum/colorized_icon", "spectrum/icon_action", "spectrum/tooltip", "modules/clean/react/watermarking/utils"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), d = r.__importDefault(d);
    var h, v = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/bmp"];
    (function(e) {
        e.FROM_DROPBOX = "dropbox", e.FROM_COMPUTER = "computer", e.FROM_DRAGDROP = "dragdrop"
    })(h = t.ImageSource || (t.ImageSource = {}));
    var _ = function(e) {
        return i.default.createElement("svg", {
            className: e.className,
            viewBox: "0 0 24 24",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink"
        }, i.default.createElement("g", {
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd"
        }, i.default.createElement("path", {
            d: "M16.9849536,10.3304435 L21.935986,13.4846597 L16.9501078,16.6610755 L11.9679572,13.4870801 L6.98587822,16.6610755 L2,13.4846597 L6.950961,10.330489 L2,7.17634414 L6.9859499,4 L11.9679214,7.17394657 L16.9501795,4 L21.9359143,7.17634414 L16.9849536,10.3304435 Z M16.9151901,10.330489 L11.9679213,7.17874171 L7.020724,10.3304435 L11.9679572,13.4822392 L16.9151901,10.330489 Z M7.01792123,17.713692 L12.0037994,14.5376346 L16.9897493,17.713692 L12.0037994,20.8901078 L7.01792123,17.713692 Z",
            fill: e.fill ? e.fill : "#ffffff"
        })))
    };
    _.displayName = "DropboxIcon";
    var w = function(e) {
        return i.default.createElement("svg", {
            className: e.className,
            viewBox: "0 0 24 24",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            xmlnsXlink: "http://www.w3.org/1999/xlink"
        }, i.default.createElement("g", {
            stroke: "none",
            strokeWidth: "1",
            fill: "none",
            fillRule: "evenodd"
        }, i.default.createElement("path", {
            d: "M14,10 L24,10 L24,14 L14,14 L14,24 L10,24 L10,14 L0,14 L0,10 L10,10 L10,0 L14,0 L14,10 Z",
            fill: e.fill ? e.fill : "#ffffff"
        })))
    };
    w.displayName = "PlusIcon";
    var b = (function(e) {
        function t(t) {
            var s = e.call(this, t) || this;
            return s.handleDragOver = function() {
                s.setState({
                    isDraggedOver: !0
                })
            }, s.onChooseFromDropbox = function(e) {
                return r.__awaiter(s, void 0, void 0, (function() {
                    var t, i, n;
                    return r.__generator(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                if (!(t = e.pop()) || e.length) throw new Error("Dropbox chooser should only return one item");
                                return i = t.link, [4, g.getImageFromURL(i)];
                            case 1:
                                return n = r.sent(), this.onImageSelected(n, i, t.name, h.FROM_DROPBOX), [2]
                        }
                    }))
                }))
            }, s.onChooseFromComputer = function(e) {
                return r.__awaiter(s, void 0, void 0, (function() {
                    var t, i, n;
                    return r.__generator(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                return e.currentTarget.files ? (t = Array.from(e.currentTarget.files).pop()) ? (i = URL.createObjectURL(t), [4, g.getImageFromURL(i)]) : [2] : [3, 2];
                            case 1:
                                n = r.sent(), this.onImageSelected(n, i, t.name, h.FROM_COMPUTER), r.label = 2;
                            case 2:
                                return [2]
                        }
                    }))
                }))
            }, s.onDropFile = function(e) {
                return r.__awaiter(s, void 0, void 0, (function() {
                    var t, n, o;
                    return r.__generator(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                return e.preventDefault(), this.setState({
                                    isDraggedOver: !1
                                }), (t = e.dataTransfer.files[0]) ? v.includes(t.type) ? (n = URL.createObjectURL(t), [4, g.getImageFromURL(n)]) : (c.Snackbar.show(i.default.createElement(c.ControlledSnackbarComponent, {
                                    id: "image-watermarking-drag-drop-error",
                                    title: l.intl.formatMessage({
                                        defaultMessage: "Can’t add. Choose an image file, like JPEG, GIF or PNG.",
                                        description: "Error message shown when a user tries to drag and drop a non-image file when in image watermarking mode"
                                    }),
                                    variant: "fail",
                                    closeButtonText: l.intl.formatMessage({
                                        defaultMessage: "Try again",
                                        description: "Error message close button, encouraging user to try to drag and drop a different file"
                                    })
                                })), [2]) : [2];
                            case 1:
                                return o = r.sent(), this.onImageSelected(o, n, t.name, h.FROM_DRAGDROP), [2]
                        }
                    }))
                }))
            }, s.onDragOver = function(e) {
                e.preventDefault(), s.setState({
                    isDraggedOver: !0
                })
            }, s.onDragLeave = function(e) {
                e.preventDefault(), s.setState({
                    isDraggedOver: !1
                })
            }, s.onImageSelected = function(e, t, r, i) {
                if (s.setState({
                        imageURL: t
                    }, (function() {
                        var e = t && s.props.focusOnSelect ? s.props.focusOnSelect : document.querySelector(".image-chooser__popover-trigger");
                        e && e.focus()
                    })), e) {
                    var n = o.file_extension_for_logging(r || "");
                    a.logWorkflowsEvent(a.WorkflowsEvent.WatermarkImageUploaded, g.getWatermarkMilestone(s.props.user), {
                        source: i,
                        image_ext: n
                    })
                }
                s.props.onImageSelected(e)
            }, s.onDeleteButtonClicked = function(e) {
                a.logWorkflowsEvent(a.WorkflowsEvent.WatermarkImageDeleted, g.getWatermarkMilestone(s.props.user)), s.onImageSelected(void 0, void 0)
            }, s.onSourceSelection = function(e) {
                if (a.logWorkflowsEvent(a.WorkflowsEvent.WatermarkImageUploadClicked, g.getWatermarkMilestone(s.props.user), {
                        source: e
                    }), e === h.FROM_DROPBOX) try {
                    n.Dropbox.choose({
                        multiselect: !1,
                        success: s.onChooseFromDropbox,
                        linkType: "direct",
                        extensions: ["images"]
                    })
                } catch (e) {
                    c.Snackbar.fail(l.intl.formatMessage({
                        defaultMessage: "Couldn’t add image from Dropbox. Please reload the page and try again."
                    }))
                } else s.imageUploadRef && s.imageUploadRef.click()
            }, s.state = {
                isDraggedOver: !1,
                imageURL: t.defaultImageURL
            }, n.Dropbox.init({
                appKey: "dropbox"
            }), s
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.props.isImageWatermarkingMode && window.addEventListener("dragover", this.handleDragOver)
        }, t.prototype.componentDidUpdate = function(e) {
            this.props.isImageWatermarkingMode !== e.isImageWatermarkingMode && (this.props.isImageWatermarkingMode ? window.addEventListener("dragover", this.handleDragOver) : window.removeEventListener("dragover", this.handleDragOver))
        }, t.prototype.componentWillUnmount = function() {
            this.props.isImageWatermarkingMode && window.removeEventListener("dragover", this.handleDragOver)
        }, t.prototype.render = function() {
            var e = this;
            return i.default.createElement(i.default.Fragment, null, this.props.isImageWatermarkingMode && i.default.createElement("div", {
                className: d.default("watermarking-drop-zone", {
                    "watermarking-drop-zone--dragged-over": this.state.isDraggedOver
                }),
                onDrop: this.onDropFile,
                onDragOver: this.onDragOver,
                onDragLeave: this.onDragLeave
            }, this.state.isDraggedOver ? i.default.createElement("p", {
                className: "watermarking-drop-zone__text"
            }, l.intl.formatMessage({
                defaultMessage: "Drop image here"
            })) : null), i.default.createElement("div", {
                className: "image-chooser-section"
            }, this.state.imageURL ? i.default.createElement(i.default.Fragment, null, i.default.createElement(f.Tooltip, {
                positioning: "left",
                positionOffset: 8,
                tooltipContent: l.intl.formatMessage({
                    defaultMessage: "Delete"
                })
            }, i.default.createElement("button", {
                "aria-label": l.intl.formatMessage({
                    defaultMessage: "Delete selected watermark image"
                }),
                className: "image-chooser-section__delete-button",
                onClick: this.onDeleteButtonClicked
            }, i.default.createElement(p.ColorizedIcon, {
                color: "white"
            }, i.default.createElement(m.IconAction, {
                name: "delete"
            })))), i.default.createElement("img", {
                className: "image-chooser-section__selected-image",
                src: this.state.imageURL,
                alt: l.intl.formatMessage({
                    defaultMessage: "Selected watermark image"
                })
            })) : i.default.createElement(i.default.Fragment, null, i.default.createElement(s.Popover, {
                onSelection: this.onSourceSelection
            }, i.default.createElement(s.PopoverTrigger, {
                "aria-label": l.intl.formatMessage({
                    defaultMessage: "Open image source selection menu",
                    description: "Explanation of what this button does - it opens a menu to allow the user to select an image source"
                }),
                className: "image-chooser__popover-trigger"
            }, i.default.createElement("span", {
                className: "image-chooser-section__popover-button"
            }, i.default.createElement(w, {
                className: "image-chooser-section__plus-svg"
            }))), i.default.createElement(s.PopoverContent, null, i.default.createElement(s.PopoverContentItem, {
                className: "image-chooser-section__add-from-dropbox",
                value: h.FROM_DROPBOX
            }, i.default.createElement(_, {
                className: "image-chooser-section__logo-svg"
            }), l.intl.formatMessage({
                defaultMessage: "Dropbox"
            }), i.default.createElement("span", {
                className: "ax-visually-hidden"
            }, " " + l.intl.formatMessage({
                defaultMessage: "(opens a new window)",
                description: "Behavior explanation of button for screen-readers"
            }))), i.default.createElement(s.PopoverContentItem, {
                className: "image-chooser-section__add-from-computer",
                value: h.FROM_COMPUTER
            }, i.default.createElement(p.ColorizedIcon, {
                color: "white"
            }, i.default.createElement(m.IconAction, {
                name: "upload"
            })), l.intl.formatMessage({
                defaultMessage: "My computer"
            })))), i.default.createElement("p", {
                className: "image-chooser-section__drop-text",
                "aria-hidden": "true"
            }, l.intl.formatMessage({
                defaultMessage: "Drop image here"
            }))), i.default.createElement("input", {
                className: "image-chooser-section__image-upload",
                type: "file",
                accept: v.join(", "),
                onClick: function(e) {
                    return e.target.value = ""
                },
                onChange: this.onChooseFromComputer,
                ref: function(t) {
                    return e.imageUploadRef = t
                }
            })))
        }, t
    })(i.default.PureComponent);
    t.ImageChooserSectionWithoutCSS = b, t.ImageChooserSection = u.requireCssWithComponent(b, ["/static/css/file_viewer_sidebar/image_chooser_section-vfl0uv17L.css"])
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/panes/loadable_activity_pane", ["require", "exports", "modules/clean/react/async/loadable", "modules/clean/web_timing_logger"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.LoadableActivityPane = r.Loadable({
        loader: function() {
            return i.waitForTTI().then((function() {
                return new Promise((function(t, r) {
                    e(["modules/clean/react/file_viewer_sidebar/panes/activity_pane"], t, r)
                })).then(__importStar).then((function(e) {
                    return e.ActivityPane
                }))
            }))
        }
    })
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/panes/loadable_details_section", ["require", "exports", "modules/clean/react/async/loadable"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.LoadableDetailsSection = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer_sidebar/panes/details_section"], t, r)
            })).then(__importStar).then((function(e) {
                return e.DetailsSection
            }))
        }
    })
}));
__importStar = this && this.__importStar || function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e)
        for (var r in e) Object.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t
};
define("modules/clean/react/file_viewer_sidebar/panes/loadable_file_activity_stream_summary", ["require", "exports", "modules/clean/react/async/loadable"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.LoadableFileActivityStreamSummary = r.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer_sidebar/panes/file_activity_stream_summary"], t, r)
            })).then(__importStar).then((function(e) {
                return e.FileActivityStreamSummary
            }))
        }
    })
})), define("modules/clean/react/file_viewer_sidebar/panes/markup_pane", ["require", "exports", "tslib", "react", "classnames", "external/lodash", "react-redux", "file-viewer/core", "modules/core/browser", "modules/core/i18n", "modules/clean/keycode", "modules/clean/browse_uri_interface", "modules/clean/file_store/utils", "modules/clean/loggers/workflows_logger", "modules/clean/previews/data/selectors", "modules/clean/previews/data/preview_type_util", "modules/clean/react/css", "modules/clean/react/file_viewer/data/actions", "modules/clean/react/file_viewer/data/selectors", "modules/clean/react/file_viewer_sidebar/panes/editing_pane", "modules/clean/react/keyboard_binding/keyboard_binding_connector", "modules/clean/react/keyboard_binding/keyboard_binding", "modules/clean/react/previews/constants", "modules/clean/react/snackbar", "spectrum/button", "modules/clean/react/workflows/markup/fabric", "modules/clean/react/workflows/markup/selectors", "modules/clean/react/workflows/markup/types", "modules/clean/react/workflows/markup/utils", "premium-workflows/components/base/apply_button", "modules/clean/react/workflows/markup_icons", "spectrum/popover", "spectrum/tooltip", "spectrum/modal"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P, M, T, A, x, F, I, O) {
    "use strict";
    var R, D;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n), l = r.__importStar(l);
    var L = function(e, t) {
            return void 0 === t && (t = !0), e === M.MarkupColor.TRANSPARENT ? x.transparentFillIcon : x.circleIcon({
                stroke: e,
                fill: t ? e : void 0
            })
        },
        N = [M.MarkupColor.TRANSPARENT, M.MarkupColor.RED_CHERRY, M.MarkupColor.ORANGE_TANGERINE, M.MarkupColor.GREEN, M.MarkupColor.DARK_BLUE, M.MarkupColor.ULTRAVIOLET, M.MarkupColor.WHITE, M.MarkupColor.BLACK].map((function(e) {
            return {
                color: e,
                icon: L(e)
            }
        })),
        U = ((R = {})[M.MarkupColor.TRANSPARENT] = c.intl.formatMessage({
            defaultMessage: "No fill color",
            description: "Noun phrase; over text over icon that removes color fill from a shape"
        }), R[M.MarkupColor.RED_CHERRY] = c.intl.formatMessage({
            defaultMessage: "Red",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R[M.MarkupColor.ORANGE_TANGERINE] = c.intl.formatMessage({
            defaultMessage: "Orange",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R[M.MarkupColor.GREEN] = c.intl.formatMessage({
            defaultMessage: "Green",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R[M.MarkupColor.DARK_BLUE] = c.intl.formatMessage({
            defaultMessage: "Blue",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R[M.MarkupColor.ULTRAVIOLET] = c.intl.formatMessage({
            defaultMessage: "Purple",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R[M.MarkupColor.WHITE] = c.intl.formatMessage({
            defaultMessage: "White",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R[M.MarkupColor.BLACK] = c.intl.formatMessage({
            defaultMessage: "Black",
            description: "Noun; hover text over icon that allows user to change the color of a shape they’ve added to their file"
        }), R),
        W = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.state = {
                    isSubmenuOpen: !1
                }, t.toggleSubMenu = function(e) {
                    var r = e.isOpen;
                    t.setState({
                        isSubmenuOpen: r
                    })
                }, t
            }
            return r.__extends(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.icon,
                    r = e.onChange,
                    o = e.label,
                    a = this.state.isSubmenuOpen;
                return i.default.createElement(F.Popover, {
                    onSelection: r,
                    onMenuToggle: this.toggleSubMenu,
                    closeOnSelection: !1
                }, i.default.createElement(F.PopoverTrigger, null, i.default.createElement("div", {
                    className: "markup-pane__tool-buttons"
                }, i.default.createElement(I.Tooltip, {
                    positioning: "below",
                    className: "markup-pane__tooltip",
                    tooltipContent: o
                }, i.default.createElement(C.Button, {
                    variant: "secondary",
                    size: "large",
                    className: n.default("markup-pane__tool-button", {
                        "markup-pane__tool-button--selected": a
                    }),
                    tagName: "span"
                }, t)))), i.default.createElement(F.PopoverContent, null, N.map((function(e) {
                    var t = e.icon,
                        r = e.color;
                    return i.default.createElement(I.Tooltip, {
                        positioning: "below",
                        className: "markup-pane__tooltip",
                        tooltipContent: U[r],
                        key: U[r]
                    }, i.default.createElement(F.PopoverContentItem, {
                        value: r
                    }, t))
                }))))
            }, t
        })(i.default.Component),
        B = ((D = {})[M.MarkupType.TEXT] = m.WorkflowsEvent.MarkupTextboxClicked, D[M.MarkupType.FREEFORM] = m.WorkflowsEvent.MarkupDrawClicked, D[M.MarkupType.ARROW] = m.WorkflowsEvent.MarkupArrowClicked, D[M.MarkupType.RECT] = m.WorkflowsEvent.MarkupRectangleClicked, D[M.MarkupType.CIRCLE] = m.WorkflowsEvent.MarkupCircleClicked, D),
        V = (function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                return n.onStrokeChange = function(e) {
                    var t = n.props,
                        r = t.markupState,
                        i = t.currentPageIndex;
                    (0, t.setMarkupStroke)(e);
                    var o = r[i].fabric;
                    k.setOptionsForActiveObjects(o, {
                        stroke: e
                    })
                }, n.onFillChange = function(e) {
                    var t = n.props,
                        r = t.markupState,
                        i = t.currentPageIndex;
                    (0, t.setMarkupFill)(e);
                    var o = r[i].fabric;
                    k.setOptionsForActiveObjects(o, {
                        fill: e
                    })
                }, n.addMarkupObject = function(e) {
                    var t = n.props,
                        r = t.currentPageIndex,
                        i = t.markupState,
                        o = t.markupState,
                        a = o.strokeColor,
                        s = o.fillColor,
                        l = i[r].fabric;
                    l && (k.addMarkupObject(l, e, {
                        stroke: a,
                        fill: s,
                        left: n.left,
                        top: n.top
                    }), n.props.setMarkupDrawingMode(!1), n.left += T.OFFSET, n.top += T.OFFSET, n.left >= l.getWidth() && (n.left = T.DEFAULT_LEFT), n.top >= l.getHeight() && (n.top = T.DEFAULT_TOP))
                }, n.onClickDraw = function() {
                    var e = n.props,
                        t = e.markupState.isDrawingMode,
                        r = e.setMarkupDrawingMode,
                        i = e.setMarkupFormatSubmenu;
                    t || i([M.FormatSubmenuEntry.STROKE]), r(!t), m.logWorkflowsEvent(m.WorkflowsEvent.MarkupDrawClicked)
                }, n.onClickTool = function(e, t) {
                    return function() {
                        (0, n.props.setMarkupFormatSubmenu)(t), n.addMarkupObject(e), m.logWorkflowsEvent(B[e])
                    }
                }, n.exitWithConfirmation = function() {
                    n.props.markupState[n.props.currentPageIndex].fabric.isEmpty() ? n.props.changeMode(s.FileViewerMode.Documentation) : n.setState({
                        isConfirmationModalOpen: !0
                    })
                }, n.handleCancel = function(e) {
                    e.preventDefault(), n.exitWithConfirmation()
                }, n.handleApply = function(e) {
                    return r.__awaiter(n, void 0, void 0, (function() {
                        var t, n, o, a, s, u, f;
                        return r.__generator(this, (function(r) {
                            switch (r.label) {
                                case 0:
                                    S.Snackbar.sync(c.intl.formatMessage({
                                        defaultMessage: "Marking up file..."
                                    }), !1, "markup-notification"), m.logWorkflowsEvent(e ? m.WorkflowsEvent.MarkupApplyOverwrite : m.WorkflowsEvent.MarkupApplySaveAsCopy), r.label = 1;
                                case 1:
                                    return r.trys.push([1, 3, , 4]), [4, k.saveMarkup(this.props.user.id, this.props.file.file_id, e, this.props.markupState, this.props.previewType)];
                                case 2:
                                    return t = r.sent(), [3, 4];
                                case 3:
                                    return n = r.sent(), o = T.getMarkupErrorMessage(n.error), a = "over_quota_error" === n.error[".tag"], s = a ? c.intl.formatMessage({
                                        defaultMessage: "Upgrade",
                                        description: "Verb. Call-to-action button label to upgrade your account."
                                    }) : c.intl.formatMessage({
                                        defaultMessage: "Close",
                                        description: "Verb. Call-to-action button label to dismiss error."
                                    }), u = a ? function() {
                                        return l.open_tab("/plans")
                                    } : function() {}, [2, S.Snackbar.show(i.default.createElement(S.Snackbar, {
                                        id: "markup-notification",
                                        closeButtonText: s,
                                        timeoutDelayMs: 5e3,
                                        title: o,
                                        variant: "fail",
                                        onCloseClick: u
                                    }))];
                                case 4:
                                    return (f = t.fq_path || p.isBrowseFile(this.props.file) && this.props.file.fq_path) ? l.replace_location(d.preview_uri_for_fq_path(this.props.user, f, {
                                        context: E.PreviewSourceContext.Workflow
                                    })) : l.reload(), [2]
                            }
                        }))
                    }))
                }, n.onDelete = function(e) {
                    e && e instanceof KeyboardEvent && e.preventDefault(), m.logWorkflowsEvent(m.WorkflowsEvent.MarkupDelete);
                    var t = n.props.markupState[n.props.currentPageIndex].fabric;
                    t && (t.remove.apply(t, t.getActiveObjects()), t.discardActiveObject().requestRenderAll())
                }, n.onEscape = function() {
                    var e = n.props.markupState[n.props.currentPageIndex].fabric;
                    if (n.props.markupState.isDrawingMode) {
                        n.props.setMarkupDrawingMode(!1);
                        var t = o.last(e.getObjects());
                        t && e.setActiveObject(t).requestRenderAll()
                    } else e.getActiveObject() ? e.discardActiveObject().requestRenderAll() : n.exitWithConfirmation()
                }, n.onCopy = function() {
                    n.props.markupState[n.props.currentPageIndex].fabric.getActiveObject().clone((function(e) {
                        n.clipboard = e
                    }))
                }, n.onPaste = function() {
                    if (n.clipboard) {
                        var e = n.props.markupState[n.props.currentPageIndex].fabric;
                        n.clipboard.top = (n.clipboard.top || T.DEFAULT_TOP) + T.OFFSET, n.clipboard.left = (n.clipboard.left || T.DEFAULT_LEFT) + T.OFFSET, n.clipboard.left >= e.getWidth() && (n.clipboard.left = T.DEFAULT_LEFT), n.clipboard.top >= e.getHeight() && (n.clipboard.top = T.DEFAULT_TOP), n.clipboard.clone((function(t) {
                            if (e.discardActiveObject(), t.set({
                                    evented: !0,
                                    strokeUniform: !0
                                }), "activeSelection" === t.type) {
                                var r = t;
                                r.canvas = e, r.forEachObject((function(t) {
                                    e.add(t)
                                })), r.setCoords()
                            } else e.add(t);
                            e.setActiveObject(t).requestRenderAll()
                        }))
                    }
                }, n.onLeftArrowPressed = function() {
                    n.moveActiveObject(-T.MOVE_DISTANCE_X, 0)
                }, n.onRightArrowPressed = function() {
                    n.moveActiveObject(T.MOVE_DISTANCE_X, 0)
                }, n.onUpArrowPressed = function() {
                    n.moveActiveObject(0, -T.MOVE_DISTANCE_Y)
                }, n.onDownArrowPressed = function() {
                    n.moveActiveObject(0, T.MOVE_DISTANCE_Y)
                }, n.moveActiveObject = function(e, t) {
                    var r = n.props.markupState[n.props.currentPageIndex].fabric,
                        i = r.getActiveObject();
                    i && (i.left = i.left + e, i.top = i.top + t, r.trigger("object:moving", {
                        target: i
                    }), r.requestRenderAll())
                }, n.renderConfirmationModal = function() {
                    var e = c.intl.formatMessage({
                        defaultMessage: "Exit without saving?"
                    });
                    return i.default.createElement(O.UtilityModal, {
                        title: e,
                        ariaLabel: e,
                        open: n.state.isConfirmationModalOpen,
                        primaryAction: c.intl.formatMessage({
                            defaultMessage: "Yes"
                        }),
                        onPrimaryAction: function() {
                            return n.props.changeMode(s.FileViewerMode.Documentation)
                        },
                        secondaryAction: c.intl.formatMessage({
                            defaultMessage: "No"
                        }),
                        onSecondaryAction: function() {
                            return n.setState({
                                isConfirmationModalOpen: !1
                            })
                        },
                        overlayClassName: "file-viewer-modal-overlay",
                        appElement: document.getElementById("embedded-app") || document.body
                    }, c.intl.formatMessage({
                        defaultMessage: "Your markup will be lost if you exit before saving this file."
                    }))
                }, n.state = {
                    isConfirmationModalOpen: !1
                }, n.left = T.DEFAULT_LEFT, n.top = T.DEFAULT_TOP, n
            }
            return r.__extends(t, e), t.prototype.componentDidMount = function() {
                m.logWorkflowsEvent(m.WorkflowsEvent.MarkupEnabled)
            }, t.prototype.componentWillUnmount = function() {
                this.props.resetMarkupState(), m.logWorkflowsEvent(m.WorkflowsEvent.MarkupCancel)
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.coreFVUiProps,
                    r = e.markupState,
                    o = r.isDrawingMode,
                    a = r.formatSubmenu,
                    l = r.fillColor,
                    d = r.strokeColor,
                    p = [{
                        icon: x.rectIcon,
                        onClick: this.onClickTool(M.MarkupType.RECT, [M.FormatSubmenuEntry.FILL, M.FormatSubmenuEntry.STROKE]),
                        label: c.intl.formatMessage({
                            defaultMessage: "Add square",
                            description: "Verb phrase; hover text over an icon that lets user add a square shape to their file"
                        })
                    }, {
                        icon: x.circleIcon({
                            stroke: "white",
                            fill: "none"
                        }),
                        onClick: this.onClickTool(M.MarkupType.CIRCLE, [M.FormatSubmenuEntry.FILL, M.FormatSubmenuEntry.STROKE]),
                        label: c.intl.formatMessage({
                            defaultMessage: "Add circle",
                            description: "Verb phrase; hover text over an icon that lets user add a circle to their file"
                        })
                    }, {
                        icon: x.textIcon,
                        onClick: this.onClickTool(M.MarkupType.TEXT, [M.FormatSubmenuEntry.STROKE]),
                        label: c.intl.formatMessage({
                            defaultMessage: "Add text",
                            description: "Verb phrase; hover text over an icon that lets user add a text box to their file"
                        })
                    }, {
                        icon: x.arrowIcon,
                        onClick: this.onClickTool(M.MarkupType.ARROW, [M.FormatSubmenuEntry.STROKE]),
                        label: c.intl.formatMessage({
                            defaultMessage: "Add arrow",
                            description: "Verb phrase; hover text over an icon that lets user add an arrow to their file"
                        })
                    }, {
                        icon: x.drawIcon,
                        onClick: this.onClickDraw,
                        label: c.intl.formatMessage({
                            defaultMessage: "Draw",
                            description: "Verb; hover text over an icon that lets a user draw on their file"
                        }),
                        className: n.default({
                            "markup-pane__tool-button--selected": o
                        })
                    }];
                return i.default.createElement(w.EditingPane, {
                    paneId: s.SidebarPaneId.Markup,
                    coreFVUiProps: t
                }, i.default.createElement("div", {
                    className: "markup-pane__actions"
                }, i.default.createElement(A.ApplyButton, {
                    onApply: this.handleApply,
                    onClick: function() {},
                    disabled: !1
                }), i.default.createElement(C.Button, {
                    tagName: "button",
                    variant: "secondary",
                    onClick: this.handleCancel
                }, c.intl.formatMessage({
                    defaultMessage: "Cancel"
                }))), i.default.createElement("div", {
                    className: "markup-pane__control"
                }, i.default.createElement("div", {
                    className: n.default("markup-pane__main-tool-buttons", {
                        "markup-pane__main-tool-buttons--submenu-open": a.length > 0
                    })
                }, p.map((function(e, t) {
                    var r = e.icon,
                        o = e.onClick,
                        a = e.label,
                        s = e.className;
                    return i.default.createElement(I.Tooltip, {
                        tooltipContent: a,
                        className: "markup-pane__tooltip",
                        positioning: "below",
                        key: a
                    }, i.default.createElement(C.Button, {
                        variant: "secondary",
                        size: "large",
                        onClick: o,
                        className: n.default("markup-pane__tool-button", s)
                    }, r))
                })))), a.length > 0 && i.default.createElement(K, {
                    onFillChange: this.onFillChange,
                    onStrokeChange: this.onStrokeChange,
                    fillColor: l,
                    strokeColor: d,
                    menuEntries: a
                }), i.default.createElement(b.KeyboardBindingConnector, {
                    keyboardBindings: [y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.BACKSPACE
                        },
                        callback: this.onDelete
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.DELETE
                        },
                        callback: this.onDelete
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.ESC
                        },
                        callback: this.onEscape
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.C,
                            ctrlKey: !0
                        },
                        callback: this.onCopy
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.C,
                            metaKey: !0
                        },
                        callback: this.onCopy
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.V,
                            ctrlKey: !0
                        },
                        callback: this.onPaste
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.V,
                            metaKey: !0
                        },
                        callback: this.onPaste
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.LEFT
                        },
                        callback: this.onLeftArrowPressed
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.UP
                        },
                        callback: this.onUpArrowPressed
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.RIGHT
                        },
                        callback: this.onRightArrowPressed
                    }), y.hydrateKeyboardBinding({
                        keyboardEventCriteria: {
                            which: u.KeyCode.DOWN
                        },
                        callback: this.onDownArrowPressed
                    })]
                }), this.renderConfirmationModal())
            }, t
        })(i.default.Component);
    t.MarkupPaneComponent = V;
    var K = function(e) {
        var t = e.menuEntries,
            r = e.onFillChange,
            n = e.onStrokeChange,
            o = e.fillColor,
            a = e.strokeColor;
        return i.default.createElement("div", {
            className: "markup-pane__control markup-pane__control-colors"
        }, t.map((function(e) {
            switch (e) {
                case M.FormatSubmenuEntry.FILL:
                    return i.default.createElement(W, {
                        icon: L(o),
                        onChange: r,
                        key: "fill-menu",
                        label: c.intl.formatMessage({
                            defaultMessage: "Change fill color",
                            description: "Verb phrase; hover text over icon that gives user ability to add or remove a color fill from a shape that they’ve added to their file"
                        })
                    });
                case M.FormatSubmenuEntry.STROKE:
                    return i.default.createElement(W, {
                        icon: L(a, !1),
                        onChange: n,
                        key: "stroke-menu",
                        label: c.intl.formatMessage({
                            defaultMessage: "Change line color",
                            description: "Verb phrase; hover text over icon that gives user ability to change the color of a line that they’ve added to their file"
                        })
                    });
                default:
                    return null
            }
        })))
    };
    t.ConnectedMarkupPaneComponent = a.connect((function(e, t) {
        return {
            markupState: P.getMarkupState(e),
            currentPageIndex: _.getCurrentPageIndex(e) || 0,
            previewType: g.getPreviewType(f.getApiDataForFile(e, t.file).data)
        }
    }), {
        changeMode: v.changeMode,
        setMarkupDrawingMode: v.setMarkupDrawingMode,
        resetMarkupState: v.resetMarkupState,
        setMarkupFill: v.setMarkupFill,
        setMarkupStroke: v.setMarkupStroke,
        setMarkupFormatSubmenu: v.setMarkupFormatSubmenu
    })(V), t.MarkupPane = h.requireCssWithComponent(t.ConnectedMarkupPaneComponent, ["/static/css/file_viewer_sidebar/editing_pane-vfljT-58j.css", "/static/css/file_viewer_sidebar/markup_pane-vflJdE0DJ.css"])
})), define("modules/clean/react/file_viewer_sidebar/panes/metadata_pane", ["require", "exports", "tslib", "react", "file-viewer/modes", "file-viewer/core", "modules/clean/react/file_metadata/component/loadable_metadata_details", "modules/clean/react/css", "modules/clean/react/file_viewer_sidebar/panes/strings", "modules/clean/react/file_viewer/data/actions", "modules/clean/react/file_viewer_sidebar/utils", "react-redux", "modules/clean/react/file_viewer/data/selectors", "file-viewer/modes/sidebar/pane_title"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.UnconnectedMetadataPaneComponent = function(e) {
        var t = u.isSidebarOpen(e.sidebar) && u.isSidebarPaneIdAtTopOfStack(o.SidebarPaneId.Metadata, e.sidebar),
            s = u.getSecondFromTopSidebarPaneId(e.sidebar);
        return i.default.createElement(n.Pane, r.__assign({
            paneId: o.SidebarPaneId.Metadata
        }, e.coreFVUiProps), i.default.createElement("div", {
            className: "metadata-pane"
        }, i.default.createElement(m.PaneTitleComponent, {
            title: l.MetadataPaneStrings.details,
            backButton: s ? {
                previousPaneId: s,
                onClick: e.popSidebarPane
            } : void 0,
            intl: e.coreFVUiProps.intl
        }), i.default.createElement(a.LoadableMetadataDetails, {
            file: e.file,
            user: e.user,
            sharedLinkInfo: e.sharedLinkInfo,
            isActiveTab: t,
            previewType: e.previewType
        })))
    };
    var f = {
        popSidebarPane: c.popSidebarPane
    };
    t.ConnectedMetadataPaneComponent = d.connect((function(e) {
        return {
            sidebar: p.getSidebar(e)
        }
    }), f)(t.UnconnectedMetadataPaneComponent), t.MetadataPane = s.requireCssWithComponent(t.ConnectedMetadataPaneComponent, ["/static/css/file_viewer_sidebar/metadata_pane-vflJOp4bF.css"])
})), define("modules/clean/react/file_viewer_sidebar/panes/rotation_control", ["require", "exports", "tslib", "react", "classnames", "modules/core/i18n", "spectrum/button", "modules/clean/mouse_button_code", "modules/clean/keycode"], (function(e, t, r, i, n, o, a, s, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n);
    var c = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.rotateTimeoutId = null, t.state = {
                isRotating: !1
            }, t.startRotatingAC = function(e) {
                e.button !== s.MouseButtonCode.LEFT && e.keyCode !== l.KeyCode.ENTER || t.startRotating(1)
            }, t.startRotatingCW = function(e) {
                e.button !== s.MouseButtonCode.LEFT && e.keyCode !== l.KeyCode.ENTER || t.startRotating(-1)
            }, t.startRotating = function(e) {
                t.setState({
                    isRotating: !0
                }, (function() {
                    return t.rotate(e)
                }))
            }, t.stopRotating = function() {
                t.setState({
                    isRotating: !1
                })
            }, t.rotate = function(e) {
                var r = t.props,
                    i = r.onChange,
                    n = r.step,
                    o = void 0 === n ? 15 : n,
                    a = r.value,
                    s = void 0 === a ? 0 : a;
                if (i && t.state.isRotating) {
                    var l = s + e * o;
                    l > 359 && (l -= 360), l < 0 && (l += 360), i(l), t.rotateTimeoutId && clearTimeout(t.rotateTimeoutId);
                    var c = setTimeout((function() {
                        t.rotateTimeoutId = null, t.rotate(e)
                    }), 200);
                    t.rotateTimeoutId = c
                }
            }, t
        }
        return r.__extends(t, e), t.prototype.componentWillUnmount = function() {
            this.rotateTimeoutId && clearTimeout(this.rotateTimeoutId)
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                r = e.disabled,
                s = e.value;
            return i.default.createElement("div", {
                className: n.default("rotation-control", t)
            }, i.default.createElement("div", {
                className: "rotation-control--current-value ax-visually-hidden",
                "aria-live": "polite"
            }, o.intl.formatMessage({
                defaultMessage: "{value} degrees",
                description: "Statement of mathematical rotation angle, e.g. 45 degrees"
            }, {
                value: s
            })), i.default.createElement(a.Button, {
                disabled: r,
                onKeyDown: this.startRotatingAC,
                onKeyUp: this.stopRotating,
                onMouseDown: this.startRotatingAC,
                onMouseUp: this.stopRotating,
                size: "large",
                variant: "secondary"
            }, i.default.createElement("span", {
                className: "ax-visually-hidden"
            }, o.intl.formatMessage({
                defaultMessage: "Rotate Anticlockwise"
            })), i.default.createElement("svg", {
                "aria-hidden": !0,
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, i.default.createElement("path", {
                d: "M9.87193 19.7329C10.5328 19.9073 11.227 20.0002 11.943 20.0002C16.3929 20.0002 20.0002 16.4106 20.0002 11.9825C20.0002 7.55449 16.3929 3.96484 11.943 3.96484C8.793 3.96484 6.06518 5.76364 4.74032 8.38529",
                stroke: "white",
                strokeWidth: "2"
            }), i.default.createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M4.92141 7.72819L10.0233 7.21687L10.1704 8.66739L3.61077 9.3248L2.94905 2.79745L4.40675 2.65136L4.92141 7.72819Z",
                fill: "white"
            }))), i.default.createElement(a.Button, {
                disabled: r,
                onKeyDown: this.startRotatingCW,
                onKeyUp: this.stopRotating,
                onMouseDown: this.startRotatingCW,
                onMouseUp: this.stopRotating,
                size: "large",
                variant: "secondary"
            }, i.default.createElement("span", {
                className: "ax-visually-hidden"
            }, o.intl.formatMessage({
                defaultMessage: "Rotate Clockwise"
            })), i.default.createElement("svg", {
                "aria-hidden": !0,
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, i.default.createElement("path", {
                d: "M14.1283 19.7329C13.4674 19.9073 12.7732 20.0002 12.0572 20.0002C7.60734 20.0002 4 16.4106 4 11.9825C4 7.55449 7.60734 3.96484 12.0572 3.96484C15.2072 3.96484 17.9351 5.76364 19.2599 8.38529",
                stroke: "white",
                strokeWidth: "2"
            }), i.default.createElement("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M19.0788 7.72819L13.9769 7.21687L13.8299 8.66739L20.3895 9.3248L21.0512 2.79745L19.5935 2.65136L19.0788 7.72819Z",
                fill: "white"
            }))))
        }, t
    })(i.default.Component);
    t.RotationControl = c
})), define("modules/clean/react/file_viewer_sidebar/panes/strings", ["require", "exports", "modules/core/i18n"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.DocumentationPaneStrings = {
        details: r.intl.formatMessage({
            defaultMessage: "Details",
            description: "Section header on the file preview sidebar shown on top of the section listing general file metadata."
        }),
        activity: r.intl.formatMessage({
            defaultMessage: "Activity",
            description: "Section header on the file preview sidebar shown on top of the section listing the latest file activity"
        })
    }, t.MetadataPaneStrings = {
        details: r.intl.formatMessage({
            defaultMessage: "Details",
            description: "Title of the content pane displaying file metadata (e.g., upload date, file size, filetype-specific metadata) on the file preview sidebar."
        })
    }, t.ActivityPaneStrings = {
        details: r.intl.formatMessage({
            defaultMessage: "Activity",
            description: "Title of the content pane displaying list of latest file activity on the file preview sidebar."
        })
    }, t.DetailsSectionStrings = {
        viewPreviousVersions: r.intl.formatMessage({
            defaultMessage: "View previous versions",
            description: "Text for outbound link from the file preview sidebar to take the user to the version history page showing the list of versions/revisions of the current file."
        }),
        viewAllDetails: r.intl.formatMessage({
            defaultMessage: "View all details",
            description: "Text for button on the file preview sidebar to take the user to the section."
        })
    }, t.ActivitySectionStrings = {
        viewAllActivities: r.intl.formatMessage({
            defaultMessage: "View all activity",
            description: "Text for button on the file preview sidebar showing subset of activity, that takes user to pane showing all activity."
        })
    }
})), define("modules/clean/react/file_viewer_sidebar/panes/watermarking_pane", ["require", "exports", "tslib", "react", "react-dom", "classnames", "external/lodash", "react-aria-tabpanel", "file-viewer/core", "react-redux", "file-viewer/core", "modules/clean/browse_uri_interface", "modules/clean/file_store/utils", "modules/clean/loggers/workflows_logger", "modules/clean/react/css", "modules/clean/react/file_viewer/data/actions", "modules/clean/react/file_viewer/data/selectors", "modules/clean/react/file_viewer_sidebar/panes/editing_pane", "modules/clean/react/snackbar", "modules/clean/react/watermarking/drawing", "modules/clean/react/watermarking/api", "modules/core/i18n", "spectrum/button", "spectrum/dropdown_menu", "spectrum/input", "modules/clean/keycode", "modules/clean/react/file_viewer_sidebar/panes/rotation_control", "modules/clean/react/watermarking/utils", "modules/clean/previews/data/selectors", "modules/clean/previews/data/preview_type_util", "modules/clean/react/previews/constants", "modules/clean/react/watermarking/types", "modules/core/browser", "modules/clean/react/watermarking/selectors", "modules/clean/react/file_viewer_sidebar/panes/image_chooser_section", "modules/clean/react/watermarking/apply_watermark_button", "modules/clean/react/watermarking/utils", "premium-workflows/components/base/slider", "spectrum/tabbed_header"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P, M, T, A, x, F, I, O, R, D, L, N, U) {
    "use strict";
    var W;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importStar(n), o = r.__importDefault(o), I = r.__importStar(I), t.WATERMARKING_PANE_POSITION_BUTTON_CLASSNAME = "watermarking-pane__position-button", (function(e) {
        e.TEXT = "watermark_pane_text_tab", e.IMAGE = "watermark_pane_image_tab"
    })(W || (W = {}));
    var B = 4 * Math.pow(10, 6),
        V = function() {
            return i.default.createElement("svg", {
                width: "24",
                height: "24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
            }, i.default.createElement("circle", {
                className: "northwest",
                cx: "7",
                cy: "7",
                r: "2"
            }), i.default.createElement("circle", {
                className: "northeast",
                cx: "17",
                cy: "7",
                r: "2"
            }), i.default.createElement("circle", {
                className: "southeast",
                cx: "17",
                cy: "17",
                r: "2"
            }), i.default.createElement("circle", {
                className: "southwest",
                cx: "7",
                cy: "17",
                r: "2"
            }), i.default.createElement("circle", {
                className: "center",
                cx: "12",
                cy: "12",
                r: "2"
            }))
        },
        K = [{
            key: F.WatermarkPosition.CENTER,
            description: y.intl.formatMessage({
                defaultMessage: "Center",
                description: "Position in the center"
            })
        }, {
            key: F.WatermarkPosition.NORTHWEST,
            description: y.intl.formatMessage({
                defaultMessage: "Upper left",
                description: "Position in upper left corner"
            })
        }, {
            key: F.WatermarkPosition.NORTHEAST,
            description: y.intl.formatMessage({
                defaultMessage: "Upper right",
                description: "Position in upper right corner"
            })
        }, {
            key: F.WatermarkPosition.SOUTHWEST,
            description: y.intl.formatMessage({
                defaultMessage: "Lower left",
                description: "Position in lower left corner"
            })
        }, {
            key: F.WatermarkPosition.SOUTHEAST,
            description: y.intl.formatMessage({
                defaultMessage: "Lower right",
                description: "Position in lower right corner"
            })
        }, {
            key: F.WatermarkPosition.REPEAT,
            description: y.intl.formatMessage({
                defaultMessage: "Repeat",
                description: "Position repeated across the image"
            })
        }],
        q = [{
            key: "black",
            description: y.intl.formatMessage({
                defaultMessage: "Dark",
                description: "Dark watermark text color"
            })
        }, {
            key: "white",
            description: y.intl.formatMessage({
                defaultMessage: "Light",
                description: "Light watermark text color"
            })
        }],
        j = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.defaultText = "", t.getTiledImageWatermark = function() {
                    var e = t.props,
                        i = e.watermarkState,
                        n = (0, e.tilingRenderer)(F.getWatermarkingOptions(i).scale),
                        o = n.canvas.toDataURL().split(",", 2).pop();
                    if (o) return r.__assign(r.__assign({}, n), {
                        image: o
                    })
                }, t.getImageWatermark = function() {
                    var e, r, i = t.props.watermarkState;
                    if (i.mode === F.WatermarkingMode.TEXT) {
                        if (!(r = i.textWatermarkingOptions).text) return;
                        e = w.drawTextTile(r.text, r.size * r.scale, r.fontFamily, r.color, r.opacity / 100, r.angle / 180 * Math.PI).canvas
                    } else {
                        if (!(r = i.imageWatermarkingOptions).image) return;
                        e = w.drawImageTile(r.image, r.size * r.scale, r.opacity / 100, r.angle / 180 * Math.PI).canvas
                    }
                    if (e) return {
                        image: e.toDataURL().split(",", 2).pop(),
                        position: r.position,
                        marginX: r.position === F.WatermarkPosition.CENTER ? 0 : r.marginX,
                        marginY: r.position === F.WatermarkPosition.CENTER ? 0 : r.marginY
                    }
                }, t.commitAndRedirect = function(e) {
                    return r.__awaiter(t, void 0, void 0, (function() {
                        var t, i, n, o, a, s, l;
                        return r.__generator(this, (function(r) {
                            switch (r.label) {
                                case 0:
                                    if (t = this.props.watermarkState, i = F.getWatermarkingOptions(t), !(n = i.position === F.WatermarkPosition.REPEAT ? this.getTiledImageWatermark() : this.getImageWatermark())) return [2];
                                    if (n.image.length > B) return [2, _.Snackbar.fail(y.intl.formatMessage({
                                        defaultMessage: "That’s too big to save. Try making your watermark smaller."
                                    }), "watermarking-notification")];
                                    _.Snackbar.sync(y.intl.formatMessage({
                                        defaultMessage: "Watermarking file..."
                                    }), !1, "watermarking-notification"), r.label = 1;
                                case 1:
                                    return r.trys.push([1, 3, , 4]), [4, b.sendWatermarkRequest(this.props.user.id, this.props.file.file_id, e, n)];
                                case 2:
                                    return o = r.sent(), [3, 4];
                                case 3:
                                    return a = r.sent(), s = void 0, s = M.isOverQuotaError(a.error) ? y.intl.formatMessage({
                                        defaultMessage: "The watermark could not be saved because your account is over quota."
                                    }) : M.isFilesystemError(a.error) ? y.intl.formatMessage({
                                        defaultMessage: "The watermark could not be saved because the file was moved or deleted."
                                    }) : M.isUnsupportedFileError(a.error) ? y.intl.formatMessage({
                                        defaultMessage: "Watermarking is not available for this file type."
                                    }) : M.isUnauthorizedAccessError(a.error) ? y.intl.formatMessage({
                                        defaultMessage: "The watermark could not be saved because you do not have permission to save to this folder."
                                    }) : y.intl.formatMessage({
                                        defaultMessage: "Couldn’t save watermark. Refresh the page to try again."
                                    }), [2, _.Snackbar.fail(s, "watermarking-notification")];
                                case 4:
                                    return (l = o.fq_path || p.isBrowseFile(this.props.file) && this.props.file.fq_path) ? I.replace_location(d.preview_uri_for_fq_path(this.props.user, l, {
                                        context: x.PreviewSourceContext.Workflow
                                    })) : I.reload(), [2]
                            }
                        }))
                    }))
                }, t.updateCommonWatermarkingOptions = function(e) {
                    t.props.watermarkState.mode === F.WatermarkingMode.TEXT ? t.updateTextWatermarkingOptions(e) : t.updateImageWatermarkingOptions(e)
                }, t.updateTextWatermarkingOptions = function(e) {
                    t.props.updateWatermarkOptions({
                        textWatermarkingOptions: e
                    })
                }, t.updateImageWatermarkingOptions = function(e) {
                    t.props.updateWatermarkOptions({
                        imageWatermarkingOptions: e
                    })
                }, t.debouncedLogOpacityChange = a.debounce((function(e) {
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkTransparencyChanged, L.getWatermarkMilestone(t.props.user), {
                        watermark_type: t.props.watermarkState.mode,
                        start_transparency: String(t.startingOpacity),
                        end_transparency: String(e)
                    }), t.startingOpacity = void 0
                }), 200), t.handleOpacityChange = function(e) {
                    var r = t.props.watermarkState,
                        i = F.getWatermarkingOptions(r).opacity;
                    e !== i && (t.startingOpacity = t.startingOpacity || i, t.debouncedLogOpacityChange(e), t.updateCommonWatermarkingOptions({
                        opacity: e
                    }))
                }, t.debouncedLogSizeChange = a.debounce((function(e) {
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkSizeChanged, L.getWatermarkMilestone(t.props.user), {
                        watermark_type: t.props.watermarkState.mode,
                        start_size: String(t.startingSize),
                        end_size: String(e)
                    }), t.startingSize = void 0
                }), 200), t.handleSizeChange = function(e) {
                    var r = t.props.watermarkState,
                        i = F.getWatermarkingOptions(r).size;
                    e !== i && (t.startingSize = t.startingSize || i, t.debouncedLogSizeChange(e), t.updateCommonWatermarkingOptions({
                        size: e
                    }))
                }, t.handleTextChange = function(e) {
                    t.textInput && t.updateTextWatermarkingOptions({
                        text: t.textInput.value
                    })
                }, t.logTextInputFocus = function() {
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkTextInputEnterFocus, L.getWatermarkMilestone(t.props.user), {
                        num_characters: t.textInput && String(t.textInput.value.length)
                    })
                }, t.logTextInputBlur = function() {
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkTextInputExitFocus, L.getWatermarkMilestone(t.props.user), {
                        num_characters: t.textInput && String(t.textInput.value.length)
                    })
                }, t.handleImageChange = function(e) {
                    t.updateImageWatermarkingOptions(r.__assign({
                        image: e,
                        imageAsDataURL: void 0
                    }, L.getImageDefaultSizes(e, t.props.pageDimensions)))
                }, t.handlePositionChange = function(e) {
                    var r = t.props.watermarkState,
                        i = F.getWatermarkingOptions(r).position,
                        n = {
                            position: e
                        };
                    if (i === F.WatermarkPosition.REPEAT && n.position !== F.WatermarkPosition.REPEAT && (n.angle = 0), i !== F.WatermarkPosition.REPEAT && n.position === F.WatermarkPosition.REPEAT) {
                        var o = F.getWatermarkingOptions(M.DEFAULT_WATERMARKING_STATE);
                        n.angle = o.angle
                    }
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkPositionMenuSelectionMade, L.getWatermarkMilestone(t.props.user), {
                        watermark_type: r.mode,
                        start_position: i,
                        end_position: e
                    }), t.updateCommonWatermarkingOptions(n)
                }, t.handleColorChange = function(e) {
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkColorClicked, L.getWatermarkMilestone(t.props.user), {
                        watermark_type: t.props.watermarkState.mode,
                        color: e
                    }), t.updateTextWatermarkingOptions({
                        color: e
                    })
                }, t.handleRotationChange = function(e) {
                    var r = t.props.watermarkState,
                        i = F.getWatermarkingOptions(r).angle;
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkRotationClicked, L.getWatermarkMilestone(t.props.user), {
                        watermark_type: r.mode,
                        start_rotation: String(i),
                        end_rotation: String(e)
                    }), t.updateCommonWatermarkingOptions({
                        angle: e
                    })
                }, t.handleCancel = function(e) {
                    e.preventDefault(), t.props.changeMode(u.FileViewerMode.Documentation)
                }, t.onTabClicked = function(e) {
                    e.currentTarget.id === W.TEXT ? (m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkTextTabClicked, L.getWatermarkMilestone(t.props.user)), t.props.switchWatermarkingMode(F.WatermarkingMode.TEXT)) : (m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkImageTabClicked, L.getWatermarkMilestone(t.props.user)), t.props.switchWatermarkingMode(F.WatermarkingMode.IMAGE))
                }, t.onTabKeyUp = function(e) {
                    [k.KeyCode.ENTER, k.KeyCode.SPACE].includes(e.keyCode) && (e.currentTarget.id === W.TEXT ? (m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkTextTabClicked, L.getWatermarkMilestone(t.props.user)), t.props.switchWatermarkingMode(F.WatermarkingMode.TEXT)) : (m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkImageTabClicked, L.getWatermarkMilestone(t.props.user)), t.props.switchWatermarkingMode(F.WatermarkingMode.IMAGE)))
                }, t.onInputRef = function(e) {
                    t.textInput = e
                }, t.onTabWrapperRef = function(e) {
                    t.tabWrapperRef = e ? n.findDOMNode(e) : null;
                    var r = t.tabWrapperRef && t.tabWrapperRef.querySelector('[role="tab"][aria-selected="true"]');
                    r && r.focus()
                }, t.onPositionRef = function(e) {
                    t.positionRef = e
                }, t.handleApply = function(e) {
                    return r.__awaiter(t, void 0, void 0, (function() {
                        var t, i, n, o;
                        return r.__generator(this, (function(r) {
                            return t = this.props, i = t.isTrialMode, n = t.user, o = t.watermarkState, i ? [2] : (m.logWorkflowsEvent(e ? m.WorkflowsEvent.WatermarkApplyOverwrite : m.WorkflowsEvent.WatermarkApplySaveAsCopy, L.getWatermarkMilestone(n), {
                                watermark_type: o.mode,
                                num_characters: this.textInput && String(this.textInput.value.length),
                                end_position: String(F.getWatermarkingOptions(o).position),
                                end_rotation: String(F.getWatermarkingOptions(o).angle),
                                end_size: String(F.getWatermarkingOptions(o).size),
                                end_transparency: String(F.getWatermarkingOptions(o).opacity)
                            }), M.setUserMetadataTextWatermarkingState(n, o), this.commitAndRedirect(e), [2])
                        }))
                    }))
                }, t.logApplyButtonClick = function() {
                    m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkOpenApplyMenu, L.getWatermarkMilestone(t.props.user), {
                        watermark_type: t.props.watermarkState.mode
                    })
                }, t.getDropdownDescription = function(e, t) {
                    var r = t.find((function(t) {
                        return t.key === e
                    }));
                    return r ? r.description : void 0
                }, t
            }
            return r.__extends(t, e), t.prototype.componentDidMount = function() {
                var e = this.props.watermarkState;
                this.updateScale(), m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkEnable, L.getWatermarkMilestone(this.props.user), {
                    num_characters: this.textInput && String(this.textInput.value.length),
                    start_position: String(F.getWatermarkingOptions(e).position),
                    start_rotation: String(F.getWatermarkingOptions(e).angle),
                    start_size: String(F.getWatermarkingOptions(e).size),
                    start_transparency: String(F.getWatermarkingOptions(e).opacity)
                })
            }, t.prototype.componentWillUnmount = function() {
                M.setUserMetadataTextWatermarkingState(this.props.user, this.props.watermarkState), m.logWorkflowsEvent(m.WorkflowsEvent.WatermarkCancel, L.getWatermarkMilestone(this.props.user), {
                    watermark_type: this.props.watermarkState.mode
                })
            }, t.prototype.updateScale = function() {
                var e = this.props,
                    t = e.updateWatermarkOptions,
                    r = e.previewType,
                    i = M.getWatermarkScale(r);
                t({
                    imageWatermarkingOptions: {
                        scale: i
                    },
                    textWatermarkingOptions: {
                        scale: i
                    }
                })
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.coreFVUiProps,
                    r = e.file,
                    n = e.watermarkState,
                    a = e.user,
                    c = F.getWatermarkingOptions(n),
                    u = n.textWatermarkingOptions,
                    d = n.imageWatermarkingOptions,
                    p = c.position || F.WatermarkPosition.REPEAT,
                    m = u.color,
                    f = n.mode === F.WatermarkingMode.TEXT && !!u.text || n.mode === F.WatermarkingMode.IMAGE && !!d.image;
                return i.default.createElement(v.EditingPane, {
                    paneId: l.SidebarPaneId.Watermarking,
                    coreFVUiProps: t,
                    classname: "watermarking-pane"
                }, i.default.createElement("div", {
                    className: "watermarking-pane__control watermarking-pane__actions"
                }, i.default.createElement(D.ApplyWatermarkButton, {
                    onApply: this.handleApply,
                    onClick: this.logApplyButtonClick,
                    allowWatermark: L.allowWatermark(r, a),
                    hasInput: n.mode === F.WatermarkingMode.TEXT ? !!u.text : !!d.image,
                    trialVariant: L.getWatermarkTrialVariant(a),
                    milestone: L.getWatermarkMilestone(a),
                    isPlusUser: a.paid
                }), i.default.createElement(E.Button, {
                    tagName: "button",
                    variant: "secondary",
                    onClick: this.handleCancel
                }, L.allowWatermarkTrial(a) ? y.intl.formatMessage({
                    defaultMessage: "Exit"
                }) : y.intl.formatMessage({
                    defaultMessage: "Cancel"
                }))), i.default.createElement(s.Wrapper, {
                    ref: this.onTabWrapperRef
                }, i.default.createElement(U.TabbedHeader, null, i.default.createElement(U.Tab, {
                    id: W.TEXT,
                    onClick: this.onTabClicked,
                    onKeyUp: this.onTabKeyUp,
                    active: n.mode === F.WatermarkingMode.TEXT
                }, y.intl.formatMessage({
                    defaultMessage: "Text"
                })), i.default.createElement(U.Tab, {
                    id: W.IMAGE,
                    onClick: this.onTabClicked,
                    onKeyUp: this.onTabKeyUp,
                    active: n.mode === F.WatermarkingMode.IMAGE
                }, y.intl.formatMessage({
                    defaultMessage: "Image"
                }))), i.default.createElement("div", {
                    className: "watermarking-pane__tab-panels"
                }, i.default.createElement(s.TabPanel, {
                    active: n.mode === F.WatermarkingMode.TEXT,
                    tabId: W.TEXT
                }, i.default.createElement("label", {
                    className: "watermarking-pane__control watermarking-pane__text"
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label"
                }, y.intl.formatMessage({
                    defaultMessage: "Watermark"
                })), i.default.createElement(C.Input, {
                    "aria-label": y.intl.formatMessage({
                        defaultMessage: "Text of Watermark"
                    }),
                    autoComplete: "off",
                    placeholder: y.intl.formatMessage({
                        defaultMessage: "Add watermark text"
                    }),
                    forwardedRef: this.onInputRef,
                    fullWidth: !0,
                    name: "text",
                    value: u.text,
                    onChange: this.handleTextChange,
                    onFocus: this.logTextInputFocus,
                    onBlur: this.logTextInputBlur,
                    maxLength: 100
                }))), i.default.createElement(s.TabPanel, {
                    active: n.mode === F.WatermarkingMode.IMAGE,
                    tabId: W.IMAGE
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label",
                    "aria-hidden": !0
                }, y.intl.formatMessage({
                    defaultMessage: "Watermark"
                })), i.default.createElement(R.ImageChooserSection, {
                    coreFVUiProps: t,
                    file: r,
                    user: this.props.user,
                    defaultImageURL: d.image ? d.image.src : void 0,
                    onImageSelected: this.handleImageChange,
                    focusOnSelect: this.positionRef && this.positionRef.querySelector("button"),
                    isImageWatermarkingMode: n.mode === F.WatermarkingMode.IMAGE
                })))), i.default.createElement("div", {
                    className: o.default({
                        "watermarking-pane__controls--disabled": !f
                    })
                }, i.default.createElement("div", {
                    className: "watermarking-pane__control watermarking-pane__position watermarking-pane__dropdown",
                    ref: this.onPositionRef
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label"
                }, y.intl.formatMessage({
                    defaultMessage: "Position"
                })), i.default.createElement(S.DropdownMenu, {
                    disabled: !f,
                    onSelection: this.handlePositionChange
                }, i.default.createElement(S.DropdownMenuButton, null, i.default.createElement("span", {
                    "aria-label": y.intl.formatMessage({
                        defaultMessage: "Position"
                    }),
                    className: "icon icon-" + p.toLowerCase()
                }, i.default.createElement(V, null)), this.getDropdownDescription(p, K)), i.default.createElement(S.Menu, null, K.map((function(e) {
                    return i.default.createElement(S.MenuItem, {
                        key: e.key,
                        value: e.key,
                        selected: e.key === p
                    }, i.default.createElement("span", {
                        className: "icon icon-" + e.key.toLowerCase()
                    }, i.default.createElement(V, null)), e.description)
                }))))), n.mode === F.WatermarkingMode.TEXT ? i.default.createElement("div", {
                    className: "watermarking-pane__control watermarking-pane__dropdown watermarking-pane__color"
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label"
                }, y.intl.formatMessage({
                    defaultMessage: "Color"
                })), i.default.createElement(S.DropdownMenu, {
                    disabled: !f,
                    onSelection: this.handleColorChange
                }, i.default.createElement(S.DropdownMenuButton, null, i.default.createElement("span", {
                    className: "icon watermarking-pane__color-icon",
                    style: {
                        backgroundColor: m
                    }
                }), this.getDropdownDescription(m, q)), i.default.createElement(S.Menu, null, q.map((function(e) {
                    return i.default.createElement(S.MenuItem, {
                        key: e.key,
                        value: e.key,
                        selected: e.key === m
                    }, i.default.createElement("span", {
                        className: "icon watermarking-pane__color-icon",
                        style: {
                            backgroundColor: e.key
                        }
                    }), e.description)
                }))))) : null, i.default.createElement("div", {
                    className: "watermarking-pane__control watermarking-pane__rotation"
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label"
                }, y.intl.formatMessage({
                    defaultMessage: "Rotation"
                })), i.default.createElement(P.RotationControl, {
                    disabled: !f,
                    value: c.angle,
                    onChange: this.handleRotationChange
                })), i.default.createElement("label", {
                    className: "watermarking-pane__control watermarking-pane__opacity"
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label"
                }, y.intl.formatMessage({
                    defaultMessage: "Opacity"
                })), i.default.createElement(N.Slider, {
                    className: "watermarking-pane__opacity-slider",
                    disabled: !f,
                    min: 0,
                    max: 100,
                    darkMode: !0,
                    fullWidth: !0,
                    value: c.opacity,
                    name: "opacity",
                    onChange: this.handleOpacityChange
                })), i.default.createElement("label", {
                    className: "watermarking-pane__control watermarking-pane__font_size"
                }, i.default.createElement("p", {
                    className: "watermarking-pane__label"
                }, y.intl.formatMessage({
                    defaultMessage: "Size"
                })), i.default.createElement(N.Slider, {
                    className: "watermarking-pane__fontsize-slider",
                    disabled: !f,
                    min: c.minSize,
                    max: c.maxSize,
                    darkMode: !0,
                    fullWidth: !0,
                    value: c.size,
                    name: "fontsize",
                    onChange: this.handleSizeChange,
                    step: "any"
                }))))
            }, t
        })(i.default.Component);
    t.WatermarkingPaneComponent = j;
    t.ConnectedWatermarkingPaneComponent = c.connect((function(e, t) {
        return {
            mode: h.getMode(e),
            isTrialMode: h.getIsTrialMode(e),
            watermarkState: O.getWatermarkState(e),
            tilingRenderer: O.getWatermarkTilingFunc(e),
            previewType: A.getPreviewType(T.getApiDataForFile(e, t.file).data),
            pageDimensions: h.getPageDimensions(e)
        }
    }), {
        changeMode: g.changeMode,
        updateWatermarkOptions: g.updateWatermarkOptions,
        switchWatermarkingMode: g.switchWatermarkingMode
    })(j), t.WatermarkingPane = f.requireCssWithComponent(t.ConnectedWatermarkingPaneComponent, ["/static/css/file_viewer_sidebar/watermarking_pane-vflg9HJ8_.css"])
})), define("modules/clean/react/file_viewer_sidebar/render_utils/call_to_action", ["require", "exports", "tslib", "react", "modules/clean/auth/login_or_register/types", "modules/clean/react/modal", "modules/clean/react/file_viewer_sidebar/buttons/mounted_file_actions", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/constants", "modules/clean/react/extensions/data/types", "modules/clean/sharing/constants", "modules/clean/react/file_viewer_sidebar/buttons/shared_file_actions", "modules/clean/previews/util", "modules/clean/react/file_viewer/logging", "modules/clean/react/file_viewer_sidebar/buttons/icon", "modules/clean/react/file_viewer_sidebar/buttons/version_history_file_actions", "modules/clean/react/file_viewer/conversions/conversion_utils", "modules/core/browser", "modules/core/i18n"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), v = r.__importStar(v), t.renderMountedFileActions = function(e, t, r, n, o, s, u) {
        if (void 0 === s && (s = !1), void 0 === u && (u = !1), !n) return [];
        var d = [i.default.createElement(a.AsyncShareButton, {
            key: "share",
            file: e,
            user: t,
            isCollapsed: s && u
        })];
        return o ? d.push(i.default.createElement(a.AsyncExtensionsButton, {
            key: "extension",
            user: t,
            file: e,
            showAsButtonIfDownloadOnly: !0,
            telemetryContext: {
                surface: "previews"
            },
            showBigTooltip: !0,
            onPresentInZoom: function() {},
            triggerType: u && s ? c.TriggerType.CollapsedButton : void 0,
            isInFVSidebar: s
        })) : d.push(i.default.createElement(a.AsyncOpenButton, {
            file: e,
            location: s ? l.FileViewerPane.Sidebar : l.FileViewerPane.TitleBar,
            user: t,
            key: "open",
            sizeClass: r,
            isCollapsed: s
        })), d
    }, t.renderSharedFileActions = function(t, a, g, w, b, y, E, S, C, k) {
        void 0 === S && (S = !1), void 0 === C && (C = !1);
        var P = !(!t.open_in_app_data || !t.preview_type),
            M = [],
            T = S ? s.UserActionContext.Sidebar : s.UserActionContext.TitleBarMain;
        if (P && E && M.push(i.default.createElement(d.AsyncOpenInAppButton, {
                urls: t.open_in_app_data,
                userActionContext: T
            })), !a)
            if (p.isCloudDocPreview(t)) M.push(i.default.createElement(d.AsyncEditNowButton, {
                isPrimaryButton: !P,
                onClick: function() {
                    return m.logUserAction(s.UserAction.SignIn, T)
                },
                hideCallOut: !1,
                isCollapsed: S && C
            }));
            else {
                var A = !P,
                    x = C || S && !A,
                    F = h.shouldOpenModalFromSidebar() ? {
                        href: void 0,
                        onClick: function() {
                            m.logUserAction(s.UserAction.SignIn, T), new Promise((function(t, r) {
                                e(["modules/clean/auth/login_or_register/modal"], t, r)
                            })).then(r.__importStar).then((function(e) {
                                var t = e.LoginOrRegisterModal;
                                o.Modal.showInstance(i.default.createElement(t, {
                                    downloadAction: null,
                                    onCancel: function() {},
                                    id: "file-viewer-sidebar-modal",
                                    initialMode: n.Mode.LOGIN,
                                    kind: n.LoginOrRegisterKind.SIDEBAR,
                                    signup_tag: "file-viewer-sidebar-modal",
                                    onAuthenticateSuccess: function() {
                                        return v.reload()
                                    }
                                }))
                            }))
                        }
                    } : {
                        onClick: function() {
                            return m.logUserAction(s.UserAction.SignIn, T)
                        }
                    };
                h.shouldShowPersistentHeader() || M.push(i.default.createElement(d.AsyncSignInButton, r.__assign({
                    isPrimaryButton: A
                }, F, {
                    icon: x ? i.default.createElement(f.ButtonIcon, {
                        name: "sign-in",
                        isPrimary: !P
                    }) : void 0
                }))), !C && h.shouldShowSignupButton() && M.push(i.default.createElement(d.AsyncSignInButton, {
                    isPrimaryButton: !1,
                    title: _.intl.formatMessage({
                        defaultMessage: "Sign up"
                    }),
                    href: void 0,
                    onClick: function() {
                        m.logUserAction(s.UserAction.SignUp, T), new Promise((function(t, r) {
                            e(["modules/clean/auth/login_or_register/modal"], t, r)
                        })).then(r.__importStar).then((function(e) {
                            var t = e.LoginOrRegisterModal;
                            o.Modal.showInstance(i.default.createElement(t, {
                                downloadAction: null,
                                onCancel: function() {},
                                id: "file-viewer-sidebar-modal",
                                initialMode: n.Mode.REGISTER,
                                kind: n.LoginOrRegisterKind.SIDEBAR,
                                signup_tag: "file-viewer-sidebar-modal",
                                onAuthenticateSuccess: function() {
                                    return v.reload()
                                }
                            }))
                        }))
                    }
                }))
            }
        return a && E && (function(e) {
            return e.linkType === u.SharedLinkType.Content
        })(b) && M.push(i.default.createElement("div", {
            className: "control__button"
        }, i.default.createElement(d.AsyncExtensionsMenuNoUnity, {
            file: t,
            user: a,
            triggerType: S && (C || 0 !== M.length) ? c.TriggerType.CollapsedButton : void 0,
            isInFVSidebar: S
        }))), b && y && E && !p.isCloudDocPreview(t) && M.push(i.default.createElement(d.AsyncShareDownloadButton, {
            copyable: t,
            location: S ? l.FileViewerPane.Sidebar : l.FileViewerPane.TitleBar,
            sharedLinkInfo: w,
            sharePermission: y,
            shareToken: b,
            user: a,
            isCollapsed: S && (C || 0 !== M.length),
            encryptionOptions: k
        })), M
    }, t.renderVersionHistoryActions = function(e, t, r, n, o, s, c) {
        if (void 0 === s && (s = !1), void 0 === c && (c = !1), !r) return [];
        var u = [];
        return n && u.push(i.default.createElement(g.RestoreButton, {
            key: "restore",
            onClick: o,
            isCollapsed: c
        })), u.push(i.default.createElement(a.AsyncOpenButton, {
            key: "open",
            file: e,
            user: t,
            isUnityDisabled: !0,
            isOpenWithDisabled: !0,
            isCloudEditorDisabled: !0,
            location: s ? l.FileViewerPane.Sidebar : l.FileViewerPane.TitleBar,
            isCollapsed: s
        })), u
    }
})), define("modules/clean/react/file_viewer_sidebar/sidebar", ["require", "exports", "tslib", "react", "react-redux", "file-viewer/modes", "file-viewer/core", "modules/clean/i18n/formatters", "file-viewer/strings", "modules/clean/react/file_viewer_sidebar/utils", "modules/clean/react/file_viewer/data/actions", "modules/clean/integrations/data/selectors", "modules/clean/react/file_viewer/data/selectors", "external/lodash", "modules/clean/react/workflows/markup/utils", "modules/clean/react/watermarking/utils", "modules/clean/react/file_viewer/utils", "modules/clean/react/file_viewer_sidebar/panes/documentation_pane", "modules/clean/react/file_viewer_sidebar/panes/metadata_pane", "modules/clean/react/file_viewer_sidebar/panes/commenting_pane", "modules/clean/react/file_viewer_sidebar/panes/pro_analytics_pane", "modules/clean/premium-workflows/data/util", "modules/clean/react/file_viewer_sidebar/panes/loadable_activity_pane", "modules/clean/react/file_viewer_sidebar/panes/markup_pane", "modules/clean/react/file_viewer_sidebar/panes/watermarking_pane", "modules/clean/react/user_notifications/dropdown", "file-viewer/modes", "file-viewer/core", "modules/clean/react/file_viewer/constants", "modules/clean/react/file_viewer/logging", "modules/clean/integrations/data/selectors", "modules/clean/react/size_class/size_class", "modules/clean/react/file_viewer/data/selectors", "modules/clean/react/file_viewer_sidebar/render_utils/call_to_action", "modules/clean/react/file_viewer_sidebar/widgets/seen_states", "modules/constants/page_load", "classnames", "modules/clean/react/file_viewer/ml_experiment", "modules/clean/file_store/utils"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g, h, v, _, w, b, y, E, S, C, k, P, M, T, A, x, F, I, O, R, D, L, N, U) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), m = r.__importStar(m), L = r.__importDefault(L);
    var W, B = s.createFormatters(D.USER_LOCALE, l.strings);
    (function(e) {
        e[e.MOUNTED_FILE = 0] = "MOUNTED_FILE", e[e.SHARED_FILE = 1] = "SHARED_FILE", e[e.VERSION_HISTORY = 2] = "VERSION_HISTORY"
    })(W || (W = {}));
    var V = (function(t) {
        function n(n) {
            var o = t.call(this, n) || this;
            return o.callToActionType = function(e) {
                return e.sharedLinkInfo ? W.SHARED_FILE : e.isVersionHistoryMode ? W.VERSION_HISTORY : W.MOUNTED_FILE
            }, o.renderSidebarNotificationsFn = function() {
                var e = o.props,
                    t = e.sharedLinkInfo,
                    r = e.user;
                return t || !r || r.is_guest_admin ? null : i.default.createElement(k.UserNotificationsDropdown, {
                    onClick: function() {
                        return A.logUserAction(T.UserAction.ClickNotifications, T.UserActionContext.Sidebar)
                    }
                })
            }, o.registerSidebarPanesFn = function(e) {
                var t, r = ((t = {})[M.SidebarPaneId.Documentation] = i.default.createElement(v.DocumentationPane, {
                        key: "documentation-pane",
                        coreFVUiProps: e,
                        file: o.props.file,
                        user: o.props.user,
                        sharedLinkInfo: o.props.sharedLinkInfo,
                        maxFilenameEmLength: T.SizeClassFilenameLengthMap[o.props.sizeClass],
                        isVersionHistoryMode: !!o.props.isVersionHistoryMode
                    }), t[M.SidebarPaneId.Metadata] = i.default.createElement(_.MetadataPane, {
                        key: "metadata-pane",
                        coreFVUiProps: e,
                        file: o.props.file,
                        user: o.props.user,
                        sharedLinkInfo: o.props.sharedLinkInfo,
                        previewType: o.props.previewType
                    }), t[M.SidebarPaneId.Comments] = i.default.createElement(w.CommentingPane, {
                        coreFVUiProps: e,
                        key: "commenting-pane"
                    }), t[M.SidebarPaneId.Activity] = i.default.createElement(E.LoadableActivityPane, {
                        key: "activity-pane",
                        coreFVUiProps: e,
                        file: o.props.file,
                        user: o.props.user,
                        isVersionHistoryMode: !!o.props.isVersionHistoryMode
                    }), t),
                    n = o.props,
                    a = n.file,
                    s = n.user;
                return o.isProAnalyticsEnabled() && (r[M.SidebarPaneId.ProAnalytics] = i.default.createElement(b.ProAnalyticsPane, {
                    coreFVUiProps: e
                })), g.allowWatermarkOrTrial(a, s) && h.isFileEditable(a) && (r[M.SidebarPaneId.Watermarking] = i.default.createElement(C.WatermarkingPane, {
                    key: "watermarking-pane",
                    coreFVUiProps: e,
                    file: o.props.file,
                    user: o.props.user
                })), f.allowMarkup(a) && (r[M.SidebarPaneId.Markup] = i.default.createElement(S.MarkupPane, {
                    key: "markup-pane",
                    coreFVUiProps: e,
                    file: o.props.file,
                    user: o.props.user
                })), r
            }, o.handleWatermarkControlClick = function() {
                o.setState({
                    watermarkControlHasBeenClicked: !0
                })
            }, o.handleHelloSignControlClickForDeepIntegration = function() {
                o.hellosignDeepIntegrationLauncher && o.hellosignDeepIntegrationLauncher.then((function(e) {
                    e.launch()
                }))
            }, o.createRenderSidebarControlsFn = m.memoize((function(t) {
                return function(n) {
                    var a = [i.default.createElement(P.DocumentationControl, r.__assign({
                        key: "documentation-control"
                    }, n))];
                    o.props.isViewingFileSubpath || a.push(i.default.createElement(P.CommentControl, r.__assign({
                        disabled: t[M.FileViewerMode.Commenting],
                        key: "comment-control"
                    }, n))), o.isProAnalyticsEnabled() && a.push(i.default.createElement(P.ProAnalyticsControl, r.__assign({
                        key: "pro-analytics-control"
                    }, n)));
                    var s = o.props,
                        l = s.file,
                        c = s.hellosignAppAction,
                        u = s.isHelloSignAppActionInSidebarEnabled,
                        d = s.isHelloSignDeepIntegrationInSidebarEnabled,
                        p = s.user,
                        m = s.previewType,
                        v = s.docClassification,
                        _ = s.docClassificationVariant,
                        w = !g.fileIsWatermarkable(l);
                    h.isFileEditable(l) && (g.isWatermarkingEnabled(p) || g.allowWatermarkTrial(p)) && !o.props.isVersionHistoryMode && a.push(i.default.createElement(P.WatermarkControl, r.__assign({
                        key: "watermarking-control",
                        disabled: w,
                        labelText: g.getWatermarkingLabelText(w, m),
                        onClick: o.handleWatermarkControlClick
                    }, n)));
                    var b, y = !f.fileIsMarkupable(l);
                    f.userCanMarkup() && h.isFileEditable(l) && !o.props.isVersionHistoryMode && a.push(i.default.createElement(P.MarkupControl, r.__assign({
                        key: "markup-control",
                        disabled: y,
                        labelText: f.getMarkupLabelText(y, m)
                    }, n)));
                    var E = !1;
                    if (l) {
                        var S = U.getExtension(l);
                        E = N.ML_EXPERIMENT_EXTENSIONS.includes(S)
                    }
                    if (_ && N.ML_ENDPOINT_FETCH_TYPES.includes(_) && v && v.predicted_types && v.predicted_types.length > 0) b = L.default({
                        "hs-classification-esign": v.predicted_types.includes(N.ML_EXPERIMENT_TYPES.esign) && _ === N.ML_EXPERIMENT_TYPES.esign,
                        "hs-classification-contract": v.predicted_types.includes(N.ML_EXPERIMENT_TYPES.contract) && _ === N.ML_EXPERIMENT_TYPES.contract
                    });
                    else if (_ === N.ML_EXPERIMENT_TYPES.file && l && E) {
                        ["contract", "agreement", "nda", "proposal", "offer", "form", "application", "terms"].forEach((function(e) {
                            -1 !== U.getFilename(l).toLowerCase().indexOf(e) && (b = L.default({
                                "hs-classification-file": !0
                            }))
                        }))
                    } else _ === N.ML_EXPERIMENT_TYPES.control && E && (b = L.default({
                        "hs-classification-control": !0
                    }));
                    return d ? (a.push(i.default.createElement(P.HelloSignControl, r.__assign({
                        key: "hellosign-control",
                        onClick: o.handleHelloSignControlClickForDeepIntegration,
                        className: b
                    }, n))), o.hellosignDeepIntegrationLauncher || (o.hellosignDeepIntegrationLauncher = new Promise((function(t, r) {
                        e(["modules/clean/integrations/hellosign_deep_integration/launcher"], t, r)
                    })).then(r.__importStar).then((function(e) {
                        var t = (0, e.getLauncher)();
                        return t.init({
                            entryPoint: "file_preview_side_bar",
                            file: l
                        }), t
                    })))) : p && c && u && o.props.onHelloSignAppActionLaunch && a.push(i.default.createElement(P.HelloSignControl, r.__assign({
                        key: "hellosign-control",
                        className: b,
                        onClick: o.props.onHelloSignAppActionLaunch
                    }, n))), a
                }
            })), o.renderSidebarCallToActionsFn = function(e) {
                var t = o.callToActionType(o.props),
                    r = e.fileViewerUiData.sidebar.visibility === a.SidebarVisibility.Closed || o.props.sizeClass === F.SizeClass.Medium;
                switch (t) {
                    case W.SHARED_FILE:
                        var i = o.props,
                            n = i.sharedLinkInfo,
                            s = i.shareToken,
                            l = i.sharePermission;
                        return O.renderSharedFileActions(o.props.file, o.props.user, o.props.sizeClass, n, s, l, !0, !0, r, o.props.encryptionOptions);
                    case W.MOUNTED_FILE:
                        return O.renderMountedFileActions(o.props.file, o.props.user, o.props.sizeClass, !0, o.props.extensionsEnabled, !0, r);
                    case W.VERSION_HISTORY:
                        return O.renderVersionHistoryActions(o.props.file, o.props.user, !0, !!o.props.canRestoreRevision, o.props.onRestoreRevision || function() {}, !0, r)
                }
                return []
            }, o.renderSidebarPASSFn = function(e) {
                return i.default.createElement(R.AsyncSeenStateFacepileConsumer, {
                    isCollapsed: e.fileViewerUiData.sidebar.visibility === a.SidebarVisibility.Closed
                })
            }, o.getPASSProviderProps = function() {
                var e = o.props,
                    t = e.user,
                    r = e.file,
                    i = e.isVersionHistoryMode,
                    n = e.sizeClass,
                    a = e.sharePermission,
                    s = e.isSeenStatesEnabled,
                    l = e.isViewingFileSubpath,
                    c = e.sharedLinkInfo,
                    u = !(!a || 0 !== a.canViewMetadataRoles.length);
                return r ? {
                    user: t || null,
                    file: r,
                    isVersionHistoryMode: i,
                    sizeClass: n,
                    isViewMetadataDisabled: u,
                    isSeenStatesEnabled: s,
                    isViewingFileSubpath: l,
                    sharedLinkInfo: c
                } : null
            }, o.state = {
                watermarkControlHasBeenClicked: !1
            }, o
        }
        return r.__extends(n, t), n.prototype.isProAnalyticsEnabled = function() {
            return y.isProAnalyticsEnabled(this.props.user)
        }, n.prototype.sidebarWidth = function() {
            switch (this.props.sizeClass) {
                case F.SizeClass.ExtraLarge:
                    return 490;
                case F.SizeClass.Large:
                    return 440;
                case F.SizeClass.Medium:
                    return 320;
                case F.SizeClass.Small:
                    return 0
            }
        }, n.prototype.render = function() {
            var e, t = this.props,
                n = t.handleSidebarDispatch,
                s = t.fileViewerUiData,
                l = {
                    renderSidebarNotificationsFn: this.renderSidebarNotificationsFn,
                    renderSidebarCallToActionsFn: this.renderSidebarCallToActionsFn,
                    renderSidebarOverflowMenuFn: this.props.renderSidebarOverflowMenuFn,
                    renderSidebarPASSFn: this.renderSidebarPASSFn
                },
                c = i.default.createElement(o.Sidebar, r.__assign({
                    fileViewerUiData: s,
                    fileId: "",
                    intl: B,
                    dispatch: n,
                    fileViewerId: "dummy",
                    registerSidebarPanesFn: this.registerSidebarPanesFn,
                    renderSidebarControlsFn: this.createRenderSidebarControlsFn(this.props.disabledModes),
                    width: s.sidebar.visibility === a.SidebarVisibility.Open ? this.sidebarWidth() : void 0
                }, l));
            return (e = this.getPASSProviderProps()) ? i.default.createElement(R.AsyncSeenStatesProviderWrapper, r.__assign({}, e), c) : c
        }, n
    })(i.default.PureComponent);
    t.UnconnectedSidebar = V, t.Sidebar = n.connect((function(e, t) {
        return {
            fileViewerUiData: {
                currentMode: p.getMode(e),
                sidebar: p.getSidebar(e)
            },
            disabledModes: p.getDisabledModes(e),
            extensionsEnabled: I.getExtensionsEnabled(e),
            hellosignAppAction: (function() {
                if (t.file) return p.getHelloSignAppActionForFile(e, t.file)
            })(),
            isHelloSignAppActionInSidebarEnabled: x.isHelloSignAppActionInFileViewerSidebarEnabled(e),
            isHelloSignDeepIntegrationInSidebarEnabled: x.isHelloSignDeepIntegrationInFileViewerSidebarEnabled(e),
            docClassification: (function() {
                if (t.file) return p.getDocClassificationForFile(e, t.file.file_id)
            })(),
            docClassificationVariant: d.getHelloSignMLClassificationVariant(e)
        }
    }), (function(e) {
        return {
            handleSidebarDispatch: c.createSidebarDispatchHandler(e),
            changeMode: function(t) {
                return e(u.changeMode(t))
            }
        }
    }))(V)
})), define("modules/clean/react/file_viewer_sidebar/utils", ["require", "exports", "modules/clean/react/file_viewer/data/actions", "file-viewer/core"], (function(e, t, r, i) {
    "use strict";
    var n;
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = ((n = {})[i.SidebarControlId.Documentation] = function(e) {
        e(r.changeMode(i.FileViewerMode.Documentation))
    }, n[i.SidebarControlId.Comments] = function(e) {
        e(r.changeMode(i.FileViewerMode.Commenting))
    }, n[i.SidebarControlId.Watermarking] = function(e) {
        e(r.changeMode(i.FileViewerMode.Watermarking))
    }, n[i.SidebarControlId.Zoom] = function(e) {
        e(r.changeMode(i.FileViewerMode.Zoom))
    }, n[i.SidebarControlId.Slack] = function(e) {
        e(r.changeMode(i.FileViewerMode.Slack))
    }, n[i.SidebarControlId.Markup] = function(e) {
        e(r.changeMode(i.FileViewerMode.Markup))
    }, n[i.SidebarControlId.HelloSign] = function(e) {
        e(r.changeMode(i.FileViewerMode.HelloSign))
    }, n[i.SidebarControlId.ProAnalytics] = function(e) {
        e(r.changeMode(i.FileViewerMode.ProAnalytics))
    }, n);
    t.createSidebarDispatchHandler = function(e) {
        return function(t) {
            if ((function(e) {
                    return e.type === i.Action.SidebarControlClick
                })(t)) {
                var n = t.payload.controlId;
                return (0, o[n])(e, t)
            }
            return t.type === i.Action.CloseSidebar ? e(r.setSidebarVisibility(i.SidebarVisibility.Closed)) : t.type === i.Action.OpenSidebar ? e(r.setSidebarVisibility(i.SidebarVisibility.Open)) : void 0
        }
    }, t.isSidebarOpen = function(e) {
        return e.visibility === i.SidebarVisibility.Open
    }, t.isSidebarPaneIdAtTopOfStack = function(e, t) {
        var r = t.paneStack;
        return r.length > 0 && r[r.length - 1] === e
    }, t.getSecondFromTopSidebarPaneId = function(e) {
        var t = e.paneStack;
        return t.length < 2 ? null : t[t.length - 2]
    }
})), define("modules/clean/react/file_viewer_sidebar/widgets/seen_states", ["require", "exports", "tslib", "react", "modules/clean/react/async/loadable", "modules/clean/previews/util"], (function(e, t, r, i, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.AsyncSeenStateFacepileProvider = n.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/pass/seen_state_facepile_controller"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.SeenStateFacepileProvider
            }))
        }
    }), t.AsyncSeenStateFacepileConsumer = n.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/pass/seen_state_facepile_consumer"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.SeenStateFacepileConsumer
            }))
        }
    }), t.AsyncSeenStatesProviderWrapper = function(e) {
        var r = e.children,
            n = e.file,
            a = e.isSeenStatesEnabled,
            s = e.isVersionHistoryMode,
            l = e.isViewingFileSubpath,
            c = e.isViewMetadataDisabled,
            u = e.sharedLinkInfo,
            d = e.sizeClass,
            p = e.user;
        return !a || s || null === n.ns_id || o.isCloudDocPreview(n) ? i.default.createElement(i.default.Fragment, null, r) : i.default.createElement(t.AsyncSeenStateFacepileProvider, {
            file: n,
            isViewMetadataDisabled: c,
            isViewingFileSubpath: !!l,
            sharedLinkInfo: u,
            sizeClass: d,
            user: p
        }, r)
    }
})), define("modules/clean/react/file_viewer_titlebar/edit_mode_titlebar", ["require", "exports", "tslib", "react", "classnames", "file-viewer/titlebar", "modules/clean/file_store/utils", "modules/clean/em_string", "modules/clean/react/file_viewer/feedback_form/feedback_form_modal", "spectrum/button", "modules/core/i18n", "modules/clean/react/workflows/markup/api", "file-viewer/core", "modules/clean/react/size_class/constants", "modules/constants/file_viewer"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importDefault(n);
    var g = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            return r.openFeedbackModal = function() {
                r.setState({
                    isFeedbackModalOpen: !0
                })
            }, r.closeFeedbackModal = function() {
                r.setState({
                    isFeedbackModalOpen: !1
                })
            }, r.renderFeedbackFormModal = function() {
                if (r.props.mode === p.FileViewerMode.Markup) {
                    var e = u.intl.formatMessage({
                            defaultMessage: "How satisfied are you with Dropbox Markup?"
                        }),
                        t = u.intl.formatMessage({
                            defaultMessage: "Tell us what you liked and didn’t like about Dropbox Markup.",
                            description: "Text prompting user to indicate which aspects they liked and did not like about the given product"
                        });
                    return i.default.createElement(l.FeedbackFormModal, {
                        user: r.props.user,
                        title: e,
                        commentPrompt: t,
                        open: r.state.isFeedbackModalOpen,
                        onRequestClose: r.closeFeedbackModal,
                        submitFeedback: d.submitMarkupFeedback
                    })
                }
                return null
            }, r.state = {
                isFeedbackModalOpen: !1
            }, r
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = f.FILE_MARKUP_FEEDBACK_FORM && this.props.mode === p.FileViewerMode.Markup && this.props.sizeClass !== m.SizeClass.Small;
            return i.default.createElement("div", {
                className: "files2-title-bar"
            }, i.default.createElement(o.LargeTitlebar, {
                className: n.default("title"),
                title: i.default.createElement(i.default.Fragment, null, e && i.default.createElement(c.Button, {
                    className: "files2-title-bar__feedback-button",
                    size: "large",
                    variant: "primary",
                    onClick: this.openFeedbackModal
                }, u.intl.formatMessage({
                    defaultMessage: "Feedback"
                })), i.default.createElement("h1", {
                    className: n.default("filename")
                }, i.default.createElement("div", {
                    className: "filename--text"
                }, i.default.createElement("span", {
                    className: "filename--prefix"
                }, this.props.title + ": "), s.Emstring.em_snippet(a.getFilename(this.props.file), this.props.maxFilenameEmLength), this.props.beta ? i.default.createElement("span", {
                    className: "filename--beta-tag"
                }, "beta") : null), this.renderFeedbackFormModal()))
            }))
        }, t
    })(i.default.PureComponent);
    t.EditModeTitlebar = g
})), define("modules/clean/react/file_viewer_titlebar/loadable_icon", ["require", "exports", "tslib", "react", "modules/clean/react/async/loadable"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.LoadableTitleIcon = n.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/title_bar/title_bar_title"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.TitleBarTitle
            }))
        },
        loading: i.default.createElement("div", {
            className: "react-title-icon"
        })
    })
})), define("modules/clean/react/file_viewer_titlebar/loadable_title", ["require", "exports", "tslib", "react", "modules/clean/react/async/loadable"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.LoadableTitle = n.Loadable({
        loader: function() {
            return new Promise((function(t, r) {
                e(["modules/clean/react/file_viewer/title_name"], t, r)
            })).then(r.__importStar).then((function(e) {
                return e.TitleName
            }))
        },
        loading: i.default.createElement("div", {
            className: "react-title-name"
        })
    })
})), define("modules/clean/react/file_viewer_titlebar/titlebar", ["require", "exports", "tslib", "file-viewer/titlebar", "modules/clean/file_store/utils", "modules/clean/react/file_viewer/title_utils", "modules/clean/react/file_viewer_titlebar/loadable_icon", "modules/clean/react/file_viewer_titlebar/loadable_title", "modules/clean/react/size_class/constants", "react", "spectrum/file_icon", "modules/clean/react/file_viewer/utils", "modules/clean/react/file_viewer/constants", "modules/clean/react/size_class/size_class", "classnames"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), c = r.__importDefault(c), f = r.__importDefault(f);
    var g = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.overrideIcon = t.props.hidePageChrome ? c.default.createElement("div", {
                className: "file-icon"
            }, c.default.createElement(u.FileIcon, {
                path: n.getFilename(t.props.file)
            })) : null, t
        }
        return r.__extends(t, e), t.prototype.render = function() {
            return c.default.createElement("div", {
                className: "files2-title-bar"
            }, c.default.createElement(i.LargeTitlebar, r.__assign({
                className: f.default("title", {
                    isSidebarOpen: this.props.isSidebarOpen
                }),
                title: c.default.createElement(s.LoadableTitle, {
                    file: this.props.file,
                    fileSubpath: this.props.fileSubpath,
                    hidePageChrome: this.props.hidePageChrome,
                    isViewingFileSubpath: this.props.isViewingFileSubpath,
                    maxFilenameEmLength: this.props.maxFilenameEmLength,
                    sharedLinkInfo: this.props.sharedLinkInfo,
                    sizeClass: this.props.sizeClass,
                    user: this.props.user
                }),
                icon: this.props.hideIcon ? null : c.default.createElement(a.LoadableTitleIcon, {
                    closeTitle: o.closeButtonTitle({
                        file: this.props.file,
                        fileViewAction: this.props.fileViewAction,
                        fileViewOrigin: this.props.fileViewOrigin,
                        sharedLinkInfo: this.props.sharedLinkInfo,
                        isVersionHistoryMode: this.props.isVersionHistoryMode
                    }),
                    canClose: this.props.canClose,
                    closeUrl: this.props.closeUrl,
                    file: this.props.file,
                    isSendForSignatureMode: !1,
                    isSigningMode: !1,
                    onClose: this.props.onClose,
                    shouldShowIcon: !this.props.isViewingFileSubpath,
                    sizeClass: this.props.sizeClass,
                    overrideIcon: this.overrideIcon
                })
            }, {
                renderTitleOverflowMenuFn: this.props.sizeClass === l.SizeClass.Small ? this.props.renderTitlebarOverflowMenuFn : void 0
            })))
        }, t
    })(c.default.PureComponent);
    t.Titlebar = g, t.FileTitleBar = m.withSizeClass(g, {
        isResponsiveEnabled: d.isResponsiveEnabled,
        responsiveClassName: p.ResponsiveClassName
    })
})), define("modules/clean/react/file_viewer_sidebar/panes/pro_analytics_pane", ["require", "exports", "tslib", "react", "file-viewer/modes", "file-viewer/core", "premium-workflows/components/sidebar_pane/analytics_pane"], (function(e, t, r, i, n, o, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.ProAnalyticsPane = function(e) {
        var t = e.coreFVUiProps;
        return i.default.createElement(n.Pane, r.__assign({
            paneId: o.SidebarPaneId.ProAnalytics
        }, t), i.default.createElement(a.AnalyticsPane, null))
    }
})), define("modules/clean/premium-workflows/data/util", ["require", "exports", "modules/constants/file_viewer"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isProAnalyticsEnabled = function(e) {
        return Boolean(e && r.SMART_LINKS_ANALYTICS_BY_USER_ID[e.id])
    }
})), define("modules/clean/auth/login_or_register/types", ["require", "exports"], (function(e, t) {
    "use strict";
    var r, i, n, o;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (function(e) {
        e.COMMENT = "comment", e.DOWNLOAD = "download", e.IMMEDIATE = "immediate", e.SIDEBAR = "sidebar", e.POSTDOWNLOAD = "postdownload"
    })(r || (r = {})), t.LoginOrRegisterKind = r, (function(e) {
        e.DIRECT_DOWNLOAD = "direct_download", e.SAVE_TO_DROPBOX = "add_to_dropbox"
    })(i || (i = {})), t.DownloadAction = i, (function(e) {
        e[e.LOGIN = 0] = "LOGIN", e[e.REGISTER = 1] = "REGISTER"
    })(n || (n = {})), t.Mode = n, (function(e) {
        e.DEFAULT = "", e.POST = "post_comment_variant", e.SUBSCRIBE = "subscribe_variant"
    })(o || (o = {})), t.CommentTextVariant = o
})), define("modules/clean/react/file_viewer/conversions/conversion_utils", ["require", "exports", "modules/constants/file_viewer"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.ConversionExperimentVariant = function() {
        return r.PREVIEWS_CONVERSION_EXPERIMENTS
    }, t.shouldShowPersistentHeader = function() {
        return "PERSISTENT_HEADER" === t.ConversionExperimentVariant()
    }, t.shouldShowPersistentFooter = function() {
        return ["PERSISTENT_FOOTER", "PF_CONTEXT", "PF_SECURITY", "PF_SYNC", "PF_FREE"].includes(r.PREVIEWS_CONVERSION_EXPERIMENTS)
    }, t.shouldNotShowInitialModal = function() {
        return "NO_MODAL" === t.ConversionExperimentVariant()
    }, t.shouldOpenModalFromSidebar = function() {
        return "OPEN_MODAL_FROM_SIDEBAR" === t.ConversionExperimentVariant()
    }, t.shouldShowSimplifiedModal = function() {
        return "SIMPLIFIED_MODAL" === t.ConversionExperimentVariant()
    }, t.shouldShowPostDownloadModal = function() {
        return "POST_DOWNLOAD_MODAL" === t.ConversionExperimentVariant()
    }, t.shouldShowSignupButton = function() {
        return "SIGNUP_BUTTON_CTA" === t.ConversionExperimentVariant()
    }
})), define("modules/clean/react/keyboard_binding/keyboard_binding", ["require", "exports", "tslib", "external/lodash", "modules/clean/keycode"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), t.genericKeyboardEventCriteria = {
        altKey: !1,
        ctrlKey: !1,
        metaKey: !1,
        shiftKey: !1,
        which: 0
    };
    var o = {
        altKey: !1,
        ctrlKey: !1,
        metaKey: !1,
        shiftKey: !1,
        which: 0
    };
    t.SimpleKeyboardEventKeys = Object.keys(o), t.KeyboardEventCriteriaKeys = Object.keys(t.genericKeyboardEventCriteria), t.generateUnmodifiedKeyboardEventCriteria = function(e) {
        return r.__assign(r.__assign({}, t.genericKeyboardEventCriteria), {
            which: e
        })
    }, t.generateUnmodifiedSimpleKeyboardEvent = function(e) {
        return r.__assign(r.__assign({}, o), {
            which: e
        })
    };
    var a = function() {};

    function s(e) {
        return {
            keyboardEventCriteria: r.__assign(r.__assign({}, t.genericKeyboardEventCriteria), e.keyboardEventCriteria),
            callback: null != e.callback ? e.callback : a
        }
    }

    function l(e) {
        return i.flatten(e.map((t = "shiftKey", function(e) {
            return (function(e, t) {
                var r, i;
                return [(r = {
                    which: e
                }, r[t] = !0, r), (i = {
                    which: e
                }, i[t] = !1, i)]
            })(e, t)
        })));
        var t
    }

    function c(e, t) {
        return e.map((function(e) {
            return s({
                keyboardEventCriteria: e,
                callback: t
            })
        }))
    }
    t.hydrateKeyboardBinding = s, t.getKeyboardEventCriteria = function(e) {
        return {
            altKey: !!e.altKey,
            ctrlKey: !!e.ctrlKey,
            metaKey: !!e.metaKey,
            shiftKey: !!e.shiftKey,
            which: e.which || e.keyCode
        }
    }, t.getSimpleKeyboardEvent = function(e) {
        return {
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
            metaKey: e.metaKey,
            shiftKey: e.shiftKey,
            which: e.which || e.keyCode
        }
    }, t.addLegacyPropertiesToSimpleKeyboardEvent = function(e) {
        return r.__assign(r.__assign({}, e), {
            keyCode: null != e.keyCode ? e.keyCode : e.which
        })
    };
    var u = l([n.KeyCode.EQUALS, n.KeyCode.PLUS_EQUALS_FF, n.KeyCode.PLUS_CHROME, n.KeyCode.PLUS_EQUALS_FF_GERMAN]),
        d = l([n.KeyCode.MINUS_FF_MAC, n.KeyCode.MINUS_FF, n.KeyCode.MINUS_CHROME]),
        p = [{
            which: n.KeyCode.P
        }, {
            which: n.KeyCode.P,
            ctrlKey: !0
        }, {
            which: n.KeyCode.P,
            metaKey: !0
        }];

    function m(e) {
        return void 0 !== e.preventDefault
    }
    t.getEqualsKeyBindings = function(e) {
        return c(u, e)
    }, t.getMinusKeyBindings = function(e) {
        return c(d, e)
    }, t.getPrintKeyBindings = function(e) {
        return c(p, e)
    }, t.isKeyboardEvent = m, t.withPreventDefault = function(e) {
        return function(t) {
            e(), m(t) && t.preventDefault()
        }
    }
})), define("modules/clean/react/keyboard_binding/keyboard_binding_connector", ["require", "exports", "tslib", "react", "modules/clean/react/keyboard_binding/keyboard_binding_provider"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = (function(e) {
        function t(t, r) {
            var i = e.call(this, t, r) || this;
            if (!r.registerKeyBindings || !r.unregisterKeyBindings) throw new Error("KeyboardBindingConnector must be a child of a KeyboardBindingProvider");
            return i
        }
        return r.__extends(t, e), t.prototype.componentDidMount = function() {
            this.registrationIdentifier = this.context.registerKeyBindings(this.props.keyboardBindings), this.context.registerAllKeyCallback(this.registrationIdentifier, this.props.allKeyCallback)
        }, t.prototype.componentWillReceiveProps = function(e) {
            this.props.keyboardBindings !== e.keyboardBindings && this.context.updateKeyBindings(this.registrationIdentifier, e.keyboardBindings), this.props.allKeyCallback !== e.allKeyCallback && this.context.registerAllKeyCallback(this.registrationIdentifier, e.allKeyCallback)
        }, t.prototype.componentWillUnmount = function() {
            this.context.unregisterKeyBindings(this.registrationIdentifier)
        }, t.prototype.render = function() {
            return null
        }, t.contextTypes = n.KeyboardBindingProviderContextTypes, t
    })((i = r.__importDefault(i)).default.Component);
    t.KeyboardBindingConnector = o
})), define("modules/clean/react/keyboard_binding/keyboard_binding_provider", ["require", "exports", "tslib", "react", "prop-types", "modules/clean/callback_chain/callback_chain", "modules/clean/keycode", "modules/clean/react/keyboard_binding/keyboard_binding"], (function(e, t, r, i, n, o, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importStar(n), t.KeyboardBindingProviderContextTypes = {
        registerAllKeyCallback: n.func,
        registerKeyBindings: n.func,
        unregisterKeyBindings: n.func,
        updateKeyBindings: n.func
    };
    var l = [];
    t.noop = function(e) {};
    var c = (function(e) {
        function n(r) {
            var i = e.call(this, r) || this;
            return i.registrationIdentifier = 0, i.registeredBindings = [], i.keyboardBindingsByCriteria = {}, i.allKeyHandlers = [], i.registerKeyBindings = function(e) {
                var r = i.registrationIdentifier++;
                return i.updateKeyBindings(r, e), i.allKeyHandlers[r] || (i.allKeyHandlers[r] = t.noop), r
            }, i.registerAllKeyCallback = function(e, r) {
                i.allKeyHandlers[e] = null != r ? r : t.noop
            }, i.unregisterKeyBindings = function(e) {
                i.updateKeyBindings(e, []), i.allKeyHandlers[e] = t.noop
            }, i.updateKeyBindings = function(e, t) {
                i.registeredBindings[e] = null != t ? t : [], i.keyboardBindingsByCriteria = d(i.registeredBindings)
            }, i.onKeyDown = function(e) {
                if ((function(e) {
                        var t = e.target || e.srcElement;
                        if (!t) return !0;
                        var r = t.tagName,
                            i = e.which,
                            n = "INPUT" === r || "SELECT" === r || "TEXTAREA" === r,
                            o = -1 !== ["submit", "button"].indexOf(t.type),
                            s = t.hasAttribute && t.hasAttribute("contenteditable") && "false" !== t.getAttribute("contenteditable").toLowerCase();
                        if (n && !o || s) return i === a.KeyCode.ESC || i === a.KeyCode.TAB;
                        return !0
                    })(e)) {
                    var t = i.getCallbacksForKey(e);
                    new o.CallbackChain(t).run(e)
                }
            }, i.allKeyHandlers = [], i.registeredBindings = [], i
        }
        return r.__extends(n, e), n.prototype.componentDidMount = function() {
            document.addEventListener("keydown", this.onKeyDown), this.providerIdentifier = l.length, l.push(this.onKeyDown), this.props.onSetup && this.props.onSetup()
        }, n.prototype.componentWillUnmount = function() {
            document.removeEventListener("keydown", this.onKeyDown), l[this.providerIdentifier] = t.noop, this.props.onDestroy && this.props.onDestroy()
        }, n.prototype.getChildContext = function() {
            return {
                registerAllKeyCallback: this.registerAllKeyCallback,
                registerKeyBindings: this.registerKeyBindings,
                unregisterKeyBindings: this.unregisterKeyBindings,
                updateKeyBindings: this.updateKeyBindings
            }
        }, n.prototype.getCallbacksForKey = function(e) {
            var t = u(e);
            return (this.keyboardBindingsByCriteria[t] || []).concat(this.allKeyHandlers)
        }, n.prototype.render = function() {
            return i.default.Children.only(this.props.children)
        }, n.childContextTypes = t.KeyboardBindingProviderContextTypes, n
    })(i.default.Component);

    function u(e) {
        var t = s.getKeyboardEventCriteria(e),
            r = "";
        return s.KeyboardEventCriteriaKeys.forEach((function(e) {
            r += e + ":" + t[e] + ","
        })), r
    }

    function d(e) {
        return e.reduce((function(e, t) {
            return t.reduce((function(e, t) {
                var r = t.keyboardEventCriteria,
                    i = t.callback,
                    n = u(r);
                return e[n] = e[n] || [], e[n].push(i), e
            }), e)
        }), {})
    }
    t.KeyboardBindingProvider = c, t.getIndexForkeyboardBindingsByCriteria = u, t.generateKeyboardBindingsByCriteriaFromKeyboardBindings = d, t.simulateKeyEvent = function(e) {
        var t = s.addLegacyPropertiesToSimpleKeyboardEvent(e);
        new o.CallbackChain(l).run(t)
    }
})), define("modules/clean/react/previews/video/audio_waveform/utils", ["require", "exports", "modules/clean/average_counter"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.buildFromBuffer = function(e, t, i, n, o) {
        var a = e.getChannelData(0),
            s = new Array(t);
        setTimeout((function e(l) {
            return function() {
                if (l >= t) o(s);
                else {
                    var c = [],
                        u = Math.ceil(l * a.length / t),
                        d = Math.ceil((l + 1) * a.length / t),
                        p = d - u;
                    if (p > i)
                        for (var m = 0; m < i; m++) {
                            var f = Math.floor(Math.random() * p) + u;
                            c.push(Math.abs(a[f]))
                        } else
                            for (m = u; m < d; m++) {
                                var g = Math.floor(Math.abs(a[m]));
                                c.push(g)
                            }
                    var h = new r.AverageCounter;
                    h.addArray(c), s[l] = h.getAverage(), n() && setTimeout(e(l + 1), 0)
                }
            }
        })(0), 0)
    }, t.returnWaveform = function(e, t, i) {
        void 0 === i && (i = 1);
        var n = [];
        if (0 === e.length || t <= 0 || isNaN(t)) return n;
        for (var o = [], a = 0; a < t; a++) o.push(new r.AverageCounter);
        var s = 0,
            l = 0;
        for (a = 0; a < e.length; a++) {
            var c = e[a],
                u = Math.floor(a * t / e.length),
                d = o[u];
            d.add(c), n[u] = d.getAverage(), u !== l && (s = Math.max(s, n[l]), l = u)
        }
        return s = Math.max(s, n[t - 1]), n.map((function(e) {
            return e * i / s
        }))
    }
})), define("modules/clean/react/file_sidebar/managed_comments_tab", ["require", "exports", "tslib", "react", "react-redux", "modules/clean/react/comments2/data/actions", "modules/clean/react/comments2/data/store", "modules/clean/react/comments2/components/comments_tab", "modules/clean/file_store/utils"], (function(e, t, r, i, n, o, a, s, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.streamFromProps = function(e) {
        var t = e.currentFile,
            r = e.currentFile,
            i = r.bytes,
            n = r.file_id,
            o = r.ns_id,
            a = r.sjid,
            s = e.sharedLinkInfo,
            c = e.isVersionHistoryMode;
        return {
            id: n,
            linkUrl: s && s.url,
            ns_id: o,
            sjid: a,
            type: "file",
            fq_path: "fq_path" in t ? t.fq_path : void 0,
            isVersionHistoryMode: c,
            bytes: i,
            filename: l.getFilename(t)
        }
    };
    var c = (function(e) {
        function l(r) {
            var i = e.call(this, r) || this;
            return i.setContext = function(e) {
                i.store.dispatch(o.Actions.setFileContext({
                    stream: t.streamFromProps(e),
                    viewer: e.user
                }))
            }, i.store = a.getStoreForComments2(), i
        }
        return r.__extends(l, e), l.prototype.componentDidMount = function() {
            this.setContext(this.props)
        }, l.prototype.componentWillUpdate = function(e) {
            this.setContext(e)
        }, l.prototype.render = function() {
            return this.store ? i.default.createElement(n.Provider, {
                store: this.store
            }, i.default.createElement(s.CommentsTab, r.__assign({}, this.props))) : null
        }, l
    })(i.default.Component);
    t.ManagedCommentsTab = c
})), define("modules/clean/react/comments2/data/sidebar_watcher", ["require", "exports", "tslib", "eventemitter3"], (function(e, t, r, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), t.sideChannelEventEmitter = new i.default, t.COMMENTS_VISIBLE_SIGNAL = "comments_visible", t.COMMENTS_HIDDEN_SIGNAL = "comments_hidden"
})), define("file-transfers/common/constants", ["require", "exports", "file-transfers/common/types"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MILLISECONDS_IN_DAY = 864e5, t.BYTES_IN_KILOBYTE = 1024, t.BYTES_IN_MEGABYTE = 1048576, t.BYTES_IN_GIGABYTE = 1073741824, t.COLOR_STONE = "#637282", t.NOT_APPLICABLE_SATISFACTION_RATING_VALUE = -1, t.DEFAULT_EXPIRATION_OPTION = r.ExpirationOption.SEVEN_DAYS, t.DEFAULT_MAX_UNEXPIRED_DAYS = 365, t.S3_STATIC_URL = "https://showcase-marketing.dropboxstatic.com/file_transfers/backgrounds/"
})), define("file-transfers/common/types", ["require", "exports"], (function(e, t) {
    "use strict";
    var r, i;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), (r = t.ExpirationOption || (t.ExpirationOption = {}))[r.THREE_DAYS = 3] = "THREE_DAYS", r[r.SEVEN_DAYS = 7] = "SEVEN_DAYS", r[r.THIRTY_DAYS = 30] = "THIRTY_DAYS", r[r.NINETY_DAYS = 90] = "NINETY_DAYS", r[r.CUSTOM = 0] = "CUSTOM", (i = t.TransferShareStatus || (t.TransferShareStatus = {})).EXPIRED = "expired", i.SHARED = "shared"
})), define("file-transfers/feedback-form", ["require", "exports", "tslib", "react", "spectrum/radio_button", "spectrum/input", "file-transfers/i18n", "file-transfers/common/constants"], (function(e, t, r, i, n, o, a, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), t.FeedbackForm = function(e, t) {
        var r = e.comment,
            n = e.rating,
            c = e.commentPrompt,
            u = e.onRatingChange,
            d = e.onCommentsChange,
            p = function(e) {
                u(parseInt(e.target.value, 10))
            };
        return i.createElement("div", {
            className: "feedback-form"
        }, i.createElement("div", {
            className: "feedback-form__satisfaction-rating-container"
        }, i.createElement("div", {
            className: "feedback-form__satisfaction-rating-radio-buttons"
        }, i.createElement(l, {
            currentRating: n,
            buttonRating: 1,
            text: i.createElement(a.IntlString, {
                text: "Extremely dissatisfied",
                description: "label on radio button denoting that the user is extremely dissatisfied with Dropbox Transfer"
            }),
            onChange: p
        }), i.createElement(l, {
            currentRating: n,
            buttonRating: 2,
            onChange: p
        }), i.createElement(l, {
            currentRating: n,
            buttonRating: 3,
            text: i.createElement(a.IntlString, {
                text: "Neutral",
                description: "label on radio button denoting that the user is neither satisfied nor dissatisfied with Dropbox Transfer"
            }),
            onChange: p
        }), i.createElement(l, {
            currentRating: n,
            buttonRating: 4,
            onChange: p
        }), i.createElement(l, {
            currentRating: n,
            buttonRating: 5,
            text: i.createElement(a.IntlString, {
                text: "Extremely satisfied",
                description: "label on radio button denoting that the user is extremely satisfied with Dropbox Transfer"
            }),
            onChange: p
        }), i.createElement(l, {
            currentRating: n,
            buttonRating: s.NOT_APPLICABLE_SATISFACTION_RATING_VALUE,
            text: i.createElement(a.IntlString, {
                text: "N/A",
                description: "label on radio button as an acronym for 'Not Applicable'"
            }),
            onChange: p
        }))), i.createElement("div", {
            className: "feedback-form__comments-container"
        }, i.createElement("span", {
            className: "feedback-form__comments-prompt"
        }, i.createElement("label", {
            htmlFor: "feedback-form__comments-textarea"
        }, c)), i.createElement(o.TextArea, {
            className: "feedback-form__comments-textarea",
            id: "feedback-form__comments-textarea",
            placeholder: t.applyTranslation ? t.applyTranslation({
                text: "Optional",
                description: "Placeholder label on input or textarea field denoting that filling the field out is optional"
            }) : "Optional",
            value: r,
            onChange: function(e) {
                d(e.currentTarget.value)
            }
        })))
    };
    var l = function(e) {
        return i.createElement("div", {
            className: "satisfaction-rating-radio-button-block"
        }, i.createElement(n.RadioButton, {
            name: "satisfaction-rating-radio-button",
            "aria-checked": e.currentRating === e.buttonRating,
            checked: e.currentRating === e.buttonRating,
            id: e.buttonRating.toString(),
            onChange: e.onChange,
            value: e.buttonRating,
            className: "satisfaction-rating-radio-button"
        }), i.createElement("div", {
            className: "satisfaction-rating-radio-button-block__label"
        }, i.createElement("span", {
            className: "satisfaction-rating-radio-button-block__rating-number"
        }, e.buttonRating !== s.NOT_APPLICABLE_SATISFACTION_RATING_VALUE && e.buttonRating), e.text && i.createElement("span", {
            className: "satisfaction-rating-radio-button-block__rating-description"
        }, e.text)))
    };
    l.displayName = "SatisfactionRatingRadioButtonBlock"
})), define("file-transfers/i18n", ["require", "exports", "tslib", "react", "prop-types"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), n = r.__importStar(n), t.IntlString = function(e, t) {
        if (t.applyTranslation ? t.applyTranslation(e) : null) return i.createElement("span", null, t.applyTranslation(e));
        var r = {};
        return t.isEnvExternal || (r = {
            textShadow: "2px 2px 0px red"
        }), i.createElement("span", {
            style: r
        }, e.text)
    }, t.IntlString.displayName = "IntlString", t.IntlString.contextTypes = {
        applyTranslation: n.func
    }, t.IntlPluralString = function(e, r) {
        return t.IntlString(e, r)
    }, t.IntlPluralString.displayName = "IntlPluralString", t.IntlPluralString.contextTypes = {
        applyTranslation: n.func
    };
    var o = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.getChildContext = function() {
            return {
                applyTranslation: this.props.applyTranslation,
                formatBytes: this.props.formatBytes,
                formatDate: this.props.formatDate,
                formatPercent: this.props.formatPercent,
                isEnvExternal: this.props.isEnvExternal
            }
        }, t.prototype.render = function() {
            return i.createElement("div", null, this.props.children)
        }, t
    })(i.Component);
    t.TranslationProvider = o, o.displayName = "TranslationProvider", o.childContextTypes = {
        applyTranslation: n.func,
        formatBytes: n.func,
        formatDate: n.func,
        formatPercent: n.func,
        isEnvExternal: n.bool
    }
})), define("spectrum/tabbed_header", ["require", "exports", "tslib", "spectrum/tabbed_header/tabbed_header", "spectrum/tabbed_header/tab"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r.__exportStar(i, t), r.__exportStar(n, t)
})), define("spectrum/tabbed_header/tab", ["require", "exports", "tslib", "classnames", "react", "react-aria-tabpanel"], (function(e, t, r, i, n, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importDefault(i), n = r.__importStar(n), t.Tab = function(e) {
        var t = e.children,
            a = e.className,
            s = e.id,
            l = e.ref,
            c = r.__rest(e, ["children", "className", "id", "ref"]),
            u = i.default("mc-tabbed-header-tab", a);
        return n.createElement(o.Tab, Object.assign({
            id: s,
            tag: "div",
            className: u,
            ref: l
        }, c), (function(e) {
            var r = e.isActive,
                o = i.default("mc-tabbed-header-tab-content", {
                    "mc-tabbed-header-tab-content-selected": r
                });
            return [n.createElement("span", {
                key: "space",
                className: "mc-tabbed-header-tab-content-space"
            }, t), n.createElement("span", {
                key: "content",
                className: o
            }, t)]
        }))
    }, t.Tab.displayName = "Tab"
})), define("spectrum/tabbed_header/tabbed_header", ["require", "exports", "tslib", "react", "react-aria-tabpanel"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), t.TabbedHeader = function(e) {
        var t = e.children,
            o = e.onSelection,
            a = r.__rest(e, ["children", "onSelection"]);
        return i.createElement(n.Wrapper, Object.assign({
            className: "mc-tabbed-header",
            onChange: o
        }, a), i.createElement(n.TabList, {
            tag: "ul",
            className: "mc-tabbed-header-list"
        }, t && i.Children.map(t, (function(e) {
            return i.createElement("li", {
                className: "mc-tabbed-header-item",
                key: e.key || void 0,
                role: "presentation"
            }, e)
        }))))
    }, t.TabbedHeader.displayName = "TabbedHeader"
})), define("react-aria-tabpanel", ["react", "prop-types", "create-react-class"], (function(e, t, r) {
    return (function(e) {
        var t = {};

        function r(i) {
            if (t[i]) return t[i].exports;
            var n = t[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return e[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, i) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }, r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, r.t = function(e, t) {
            if (1 & t && (e = r(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var i = Object.create(null);
            if (r.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var n in e) r.d(i, n, function(t) {
                    return e[t]
                }.bind(null, n));
            return i
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 4)
    })([function(t, r) {
        t.exports = e
    }, function(e, r) {
        e.exports = t
    }, function(e, t) {
        e.exports = r
    }, function(e, t) {
        e.exports = function(e, t, r) {
            for (var i in t) t.hasOwnProperty(i) && (e[i] || r[i] || (e[i] = t[i]))
        }
    }, function(e, t, r) {
        e.exports = {
            Tab: r(5),
            TabList: r(6),
            TabPanel: r(7),
            Wrapper: r(8)
        }
    }, function(e, t, r) {
        var i = r(0),
            n = r(1),
            o = r(2),
            a = r(3),
            s = {
                children: n.oneOfType([n.node, n.func]).isRequired,
                id: n.string.isRequired,
                tag: n.string,
                index: n.number,
                active: n.bool,
                letterNavigationText: n.string
            };
        e.exports = o({
            displayName: "AriaTabPanel-Tab",
            propTypes: s,
            getDefaultProps: function() {
                return {
                    tag: "div"
                }
            },
            contextTypes: {
                atpManager: n.object.isRequired
            },
            getInitialState: function() {
                return {
                    isActive: this.context.atpManager.memberStartsActive(this.props.id) || !1
                }
            },
            handleFocus: function() {
                this.context.atpManager.handleTabFocus(this.props.id)
            },
            updateActiveState: function(e) {
                this.setState({
                    isActive: e
                })
            },
            registerWithManager: function(e) {
                this.isRegistered || (this.isRegistered = !0, this.context.atpManager.registerTab({
                    id: this.props.id,
                    node: e,
                    update: this.updateActiveState,
                    index: this.props.index,
                    letterNavigationText: this.props.letterNavigationText
                }))
            },
            render: function() {
                var e = this.props,
                    t = void 0 === e.active ? this.state.isActive : e.active,
                    r = "function" == typeof e.children ? e.children({
                        isActive: t
                    }) : e.children,
                    n = {
                        id: e.id,
                        tabIndex: t ? 0 : -1,
                        onClick: this.handleClick,
                        onFocus: this.handleFocus,
                        role: "tab",
                        "aria-selected": t,
                        "aria-controls": this.context.atpManager.getTabPanelId(e.id),
                        ref: this.registerWithManager
                    };
                return a(n, e, s), i.createElement(e.tag, n, r)
            }
        })
    }, function(e, t, r) {
        var i = r(0),
            n = r(1),
            o = r(2),
            a = r(3),
            s = {
                children: n.node.isRequired,
                tag: n.string
            };
        e.exports = o({
            displayName: "AriaTabPanel-TabList",
            propTypes: s,
            getDefaultProps: function() {
                return {
                    tag: "div"
                }
            },
            render: function() {
                var e = this.props,
                    t = {
                        role: "tablist"
                    };
                return a(t, e, s), i.createElement(e.tag, t, e.children)
            }
        })
    }, function(e, t, r) {
        var i = r(0),
            n = r(1),
            o = r(2),
            a = r(3),
            s = {
                children: n.oneOfType([n.node, n.func]).isRequired,
                tabId: n.string.isRequired,
                tag: n.string,
                active: n.bool
            };
        e.exports = o({
            displayName: "AriaTabPanel-TabPanel",
            propTypes: s,
            getDefaultProps: function() {
                return {
                    tag: "div"
                }
            },
            contextTypes: {
                atpManager: n.object.isRequired
            },
            getInitialState: function() {
                return {
                    isActive: this.context.atpManager.memberStartsActive(this.props.tabId) || !1
                }
            },
            handleKeyDown: function(e) {
                e.ctrlKey && "ArrowUp" === e.key && (e.preventDefault(), this.context.atpManager.focusTab(this.props.tabId))
            },
            updateActiveState: function(e) {
                this.setState({
                    isActive: e
                })
            },
            registerWithManager: function(e) {
                this.isRegistered || (this.isRegistered = !0, this.context.atpManager.registerTabPanel({
                    node: e,
                    update: this.updateActiveState,
                    tabId: this.props.tabId
                }))
            },
            render: function() {
                var e = this.props,
                    t = void 0 === e.active ? this.state.isActive || !1 : e.active,
                    r = "function" == typeof e.children ? e.children({
                        isActive: t
                    }) : e.children,
                    n = e.style || {};
                t || (n.display = "none");
                var o = {
                    className: e.className,
                    id: this.context.atpManager.getTabPanelId(e.tabId),
                    onKeyDown: this.handleKeyDown,
                    role: "tabpanel",
                    style: n,
                    "aria-hidden": !t,
                    "aria-describedby": e.tabId,
                    ref: this.registerWithManager
                };
                return a(o, e, s), i.createElement(e.tag, o, r)
            }
        })
    }, function(e, t, r) {
        var i = r(0),
            n = r(1),
            o = r(2),
            a = r(9),
            s = r(3),
            l = {
                children: n.node.isRequired,
                activeTabId: n.string,
                letterNavigation: n.bool,
                onChange: n.func,
                tag: n.string
            };
        e.exports = o({
            displayName: "AriaTabPanel-Wrapper",
            propTypes: l,
            getDefaultProps: function() {
                return {
                    tag: "div"
                }
            },
            childContextTypes: {
                atpManager: n.object.isRequired
            },
            getChildContext: function() {
                return {
                    atpManager: this.manager
                }
            },
            componentWillMount: function() {
                this.manager = a({
                    onChange: this.props.onChange,
                    activeTabId: this.props.activeTabId,
                    letterNavigation: this.props.letterNavigation
                })
            },
            componentWillUnmount: function() {
                this.manager.destroy()
            },
            componentDidMount: function() {
                this.manager.activate()
            },
            render: function() {
                var e = this.props,
                    t = {};
                return s(t, e, l), i.createElement(e.tag, t, e.children)
            }
        })
    }, function(e, t, r) {
        var i = r(10);

        function n(e) {
            this.options = e;
            var t = {
                wrap: !0,
                forwardArrows: ["down", "right"],
                backArrows: ["up", "left"],
                stringSearch: e.letterNavigation
            };
            this.focusGroup = i(t), this.tabs = [], this.tabPanels = [], this.activeTabId = e.activeTabId
        }
        n.prototype.activate = function() {
            this.focusGroup.activate()
        }, n.prototype.memberStartsActive = function(e) {
            return this.activeTabId === e || void 0 === this.activeTabId && (this.activeTabId = e, !0)
        }, n.prototype.registerTab = function(e) {
            void 0 === e.index ? this.tabs.push(e) : this.tabs.splice(e.index, 0, e);
            var t = e.letterNavigationText ? {
                node: e.node,
                text: e.letterNavigationText
            } : e.node;
            this.focusGroup.addMember(t, e.index), this.activateTab(this.activeTabId || e.id)
        }, n.prototype.registerTabPanel = function(e) {
            this.tabPanels.push(e), this.activateTab(this.activeTabId), this.activateTab(this.activeTabId || e.tabId)
        }, n.prototype.activateTab = function(e) {
            e !== this.activeTabId && (this.activeTabId = e, this.options.onChange ? this.options.onChange(e) : (this.tabPanels.forEach((function(t) {
                t.update(e === t.tabId)
            })), this.tabs.forEach((function(t) {
                t.update(e === t.id)
            }))))
        }, n.prototype.handleTabFocus = function(e) {
            this.activateTab(e)
        }, n.prototype.focusTab = function(e) {
            var t = this.tabs.find((function(t) {
                return t.id === e
            }));
            t && t.node.focus()
        }, n.prototype.destroy = function() {
            this.focusGroup.deactivate()
        }, n.prototype.getTabPanelId = function(e) {
            return e + "-panel"
        }, e.exports = function(e) {
            return new n(e)
        }
    }, function(e, t) {
        function r(e) {
            e = e || {}, this._settings = {
                forwardArrows: e.forwardArrows || ["down"],
                backArrows: e.backArrows || ["up"],
                wrap: e.wrap,
                stringSearch: e.stringSearch,
                stringSearchDelay: 800
            }, this._searchString = "", this._members = [], e.members && this.setMembers(e.members), this._boundHandleKeydownEvent = this._handleKeydownEvent.bind(this)
        }

        function i(e) {
            e && e.focus && (e.focus(), "input" === e.tagName.toLowerCase() && e.select())
        }
        r.prototype.activate = function() {
            return document.addEventListener("keydown", this._boundHandleKeydownEvent, !0), this
        }, r.prototype.deactivate = function() {
            return document.removeEventListener("keydown", this._boundHandleKeydownEvent, !0), this._clearSearchStringRefreshTimer(), this
        }, r.prototype._handleKeydownEvent = function(e) {
            if (-1 !== this._getActiveElementIndex()) {
                var t = (function(e) {
                    return "ArrowUp" === e.key || 38 === e.keyCode ? "up" : "ArrowDown" === e.key || 40 === e.keyCode ? "down" : "ArrowLeft" === e.key || 37 === e.keyCode ? "left" : "ArrowRight" === e.key || 39 === e.keyCode ? "right" : null
                })(e);
                if (t) return -1 !== this._settings.forwardArrows.indexOf(t) ? (e.preventDefault(), void this.moveFocusForward()) : -1 !== this._settings.backArrows.indexOf(t) ? (e.preventDefault(), void this.moveFocusBack()) : void 0;
                this._handleNonArrowKey(e)
            }
        }, r.prototype.moveFocusForward = function() {
            var e, t = this._getActiveElementIndex();
            return e = t < this._members.length - 1 ? t + 1 : this._settings.wrap ? 0 : t, this.focusNodeAtIndex(e), e
        }, r.prototype.moveFocusBack = function() {
            var e, t = this._getActiveElementIndex();
            return e = t > 0 ? t - 1 : this._settings.wrap ? this._members.length - 1 : t, this.focusNodeAtIndex(e), e
        }, r.prototype._handleNonArrowKey = function(e) {
            if (this._settings.stringSearch) {
                if ("" !== this._searchString && (" " === e.key || 32 === e.keyCode)) return e.preventDefault(), -1;
                if (!(function(e) {
                        return e >= 65 && e <= 90
                    })(e.keyCode)) return -1;
                if (e.ctrlKey || e.metaKey || e.altKey) return -1;
                e.preventDefault(), this._addToSearchString(String.fromCharCode(e.keyCode)), this._runStringSearch()
            }
        }, r.prototype._clearSearchString = function() {
            this._searchString = ""
        }, r.prototype._addToSearchString = function(e) {
            this._searchString += e.toLowerCase()
        }, r.prototype._startSearchStringRefreshTimer = function() {
            var e = this;
            this._clearSearchStringRefreshTimer(), this._stringSearchTimer = setTimeout((function() {
                e._clearSearchString()
            }), this._settings.stringSearchDelay)
        }, r.prototype._clearSearchStringRefreshTimer = function() {
            clearTimeout(this._stringSearchTimer)
        }, r.prototype._runStringSearch = function() {
            this._startSearchStringRefreshTimer(), this.moveFocusByString(this._searchString)
        }, r.prototype.moveFocusByString = function(e) {
            for (var t, r = 0, n = this._members.length; r < n; r++)
                if ((t = this._members[r]).text && 0 === t.text.indexOf(e)) return i(t.node)
        }, r.prototype._findIndexOfNode = function(e) {
            for (var t = 0, r = this._members.length; t < r; t++)
                if (this._members[t].node === e) return t;
            return -1
        }, r.prototype._getActiveElementIndex = function() {
            return this._findIndexOfNode(document.activeElement)
        }, r.prototype.focusNodeAtIndex = function(e) {
            var t = this._members[e];
            return t && i(t.node), this
        }, r.prototype.addMember = function(e, t) {
            var r = e.node || e,
                i = e.text || r.getAttribute("data-focus-group-text") || r.textContent || "";
            return this._checkNode(r), e = {
                node: r,
                text: i.replace(/[\W_]/g, "").toLowerCase()
            }, null != t ? this._members.splice(t, 0, e) : this._members.push(e), this
        }, r.prototype.removeMember = function(e) {
            var t = "number" == typeof e ? e : this._findIndexOfNode(e);
            if (-1 !== t) return this._members.splice(t, 1), this
        }, r.prototype.clearMembers = function() {
            return this._members = [], this
        }, r.prototype.setMembers = function(e) {
            this.clearMembers();
            for (var t = 0, r = e.length; t < r; t++) this.addMember(e[t]);
            return this
        }, r.prototype.getMembers = function() {
            return this._members
        }, r.prototype._checkNode = function(e) {
            if (!e.nodeType || e.nodeType !== window.Node.ELEMENT_NODE) throw new Error("focus-group: only DOM nodes allowed");
            return e
        }, e.exports = function(e) {
            return new r(e)
        }
    }])
})), define("modules/clean/react/file_viewer/surface_existing_teams_header", ["require", "exports", "tslib", "react", "react-intl", "dig-components/buttons", "modules/clean/react/css", "modules/core/i18n", "modules/clean/react/sprite", "modules/clean/react/teams/team_discovery/data/model", "modules/clean/react/teams/team_discovery/data/client", "modules/clean/react/teams/team_discovery/data/logger", "modules/core/notify", "modules/clean/react/teams/team_discovery/data/logger", "modules/core/browser", "modules/clean/api_v2/user_client"], (function(e, t, r, i, n, o, a, s, l, c, u, d, p, m, f, g) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), f = r.__importStar(f);
    var h = n.defineMessage({
            defaultMessage: "Request sent. Watch for your invite at {user_email}"
        }),
        v = s.intl.formatMessage({
            defaultMessage: "Couldn’t send request. Try asking to join in person."
        }),
        _ = s.intl.formatMessage({
            defaultMessage: "Couldn’t send request. Check your connection."
        }),
        w = s.intl.formatMessage({
            defaultMessage: "You have been added to the team!"
        }),
        b = (function(e) {
            function t(t) {
                var r = e.call(this, t) || this;
                return r.state = {
                    submitting: !1
                }, r.logger = new d.Logger, r
            }
            return r.__extends(t, e), t.prototype.recordHeaderDismissed = function(e, t) {
                return r.__awaiter(this, void 0, void 0, (function() {
                    return r.__generator(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                return [4, (new g.UserApiV2Client).ns("team_discovery").rpc("joinable_teams/dismiss", {
                                    team_id: t.id
                                }, {
                                    subjectUserId: e.id
                                })];
                            case 1:
                                return r.sent(), [2]
                        }
                    }))
                }))
            }, t.prototype.requestToJoin = function(e, t, r) {
                var i = this,
                    n = new u.LegacyClient,
                    o = s.intl.formatMessage(h, {
                        user_email: e.email
                    });
                n.joinTeam(t.id).then((function(e) {
                    switch (e ? e.result : void 0) {
                        case c.JoinApiResultEnum.RequestSent:
                            p.Notify.success(o), r();
                            break;
                        case c.JoinApiResultEnum.RequestNotSent:
                            e.reason === c.JoinApiRetReason.Conflict ? p.Notify.success(o) : p.Notify.error(v), r();
                            break;
                        case c.JoinApiResultEnum.CanJoin:
                            p.Notify.success(w), r();
                            break;
                        case void 0:
                            p.Notify.error(_), i.setState({
                                submitting: !1
                            });
                            break;
                        default:
                            p.Notify.error(v), r()
                    }
                }), (function() {
                    p.Notify.error(_), i.setState({
                        submitting: !1
                    })
                }))
            }, t.prototype.render = function() {
                var e = this,
                    t = this.props,
                    r = t.suggestTeamInfo,
                    n = t.dismissHeader,
                    a = t.user,
                    c = s.intl.formatMessage({
                        defaultMessage: "Are you part of {team_name}?"
                    }, {
                        team_name: r.joinableTeam.name
                    }),
                    u = s.intl.formatMessage({
                        defaultMessage: "Join this Dropbox team for easier collaboration and instant access to team files."
                    });
                return i.createElement("div", {
                    className: "surface-existing-teams-header"
                }, i.createElement("div", {
                    className: "surface-existing-teams-header__primary-text"
                }, c, " "), i.createElement("div", {
                    className: "surface-existing-teams-header__secondary-text"
                }, u, " "), i.createElement("div", {
                    className: "surface-existing-teams-header__buttons"
                }, i.createElement(o.Button, {
                    inverse: !0,
                    variant: "primary",
                    className: "surface-existing-teams-header__primary-button",
                    disabled: this.state.submitting,
                    onClick: function() {
                        e.setState({
                            submitting: !0
                        }), e.requestToJoin(a, r.joinableTeam, n);
                        var t = "1" === f.get_uri().getQuery().new_user;
                        e.logger.logClickedRequestToJoinEvent(r.joinableTeam.id, a.id, m.TeamJoinRequestOrigin.Preview, t)
                    }
                }, s.intl.formatMessage({
                    defaultMessage: "Ask to join"
                })), i.createElement(o.Button, {
                    variant: "transparent",
                    className: "close-button dismiss-x-icon",
                    onClick: function() {
                        e.recordHeaderDismissed(a, r.joinableTeam), n()
                    },
                    "aria-label": s.intl.formatMessage({
                        defaultMessage: "Close"
                    })
                }, i.createElement(l.Sprite, {
                    group: "web",
                    name: "close_small",
                    alt: s.intl.formatMessage({
                        defaultMessage: "Close"
                    })
                }))))
            }, t
        })(i.Component);
    t.SurfaceExistingTeamsHeaderComponent = b, t.SurfaceExistingTeamsHeader = a.requireCssWithComponent(b, ["/static/css/file_viewer/surface_existing_teams_header-vflPWjF8H.css", "/static/css/dig-components/index.web-vflAfUkoe.css"])
})), define("modules/clean/react/teams/team_discovery/data/action", ["require", "exports", "tslib", "modules/core/browser", "modules/core/uri", "modules/clean/react/teams/team_discovery/data/model", "external/lodash", "react", "modules/clean/react/snackbar"], (function(e, t, r, i, n, o, a, s, l) {
    "use strict";
    var c;

    function u(e) {
        var t = s.default.createElement(l.Snackbar, r.__assign({}, e, {
            closeButtonText: "Close",
            id: "teamDiscovery"
        }));
        l.Snackbar.show(t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), a = r.__importStar(a), s = r.__importDefault(s), t.JoinTeamRequestSuccessQParam = "jtrs", (function(e) {
        e.FetchInitData = "FetchInitData", e.AskToJoinTeam = "AskToJoinTeam", e.PopulateServerProps = "PopulateServerProps"
    })(c = t.ActionType || (t.ActionType = {})), t.showSnackbar = u;
    var d = (function() {
        function e(e, t, r, i, n) {
            this.apiClient = e, this.legacyApiClient = t, this.logger = r, this.selector = i, this.contUrl = n || "/install"
        }
        return e.prototype.redirectAndNotify = function(e) {
            var r, o = n.URI.parse(this.contUrl).updateQuery((r = {}, r[t.JoinTeamRequestSuccessQParam] = e ? "1" : "0", r)).toString();
            i.redirect(o)
        }, e.prototype.joinTeamAction = function(e, t, r) {
            var n = this;
            return void 0 === r && (r = !0),
                function(a, s) {
                    return n.legacyApiClient.joinTeam(e.id, t).then((function(l) {
                        var d = l ? l.result : void 0;
                        switch (d) {
                            case o.JoinApiResultEnum.RequestSent:
                                a({
                                    type: c.AskToJoinTeam
                                }), n.logger.logAskToJoinEvent(e.id, n.selector.getTeamDiscoveryStoreState(s()).userId, "ask_to_join", "request_sent", t), r ? n.redirectAndNotify(!0) : u({
                                    title: o.JoinApiRetReasonToLabel(1),
                                    variant: "complete"
                                });
                                break;
                            case o.JoinApiResultEnum.RequestNotSent:
                                l.reason === o.JoinApiRetReason.Conflict ? (a({
                                    type: c.AskToJoinTeam
                                }), n.logger.logAskToJoinEvent(e.id, n.selector.getTeamDiscoveryStoreState(s()).userId, "ask_to_join", "conflict", t), r ? n.redirectAndNotify(!0) : u({
                                    title: o.JoinApiRetReasonToLabel(l.reason),
                                    variant: "fail"
                                })) : (n.logger.logAskToJoinErrorEvent(e.id, n.selector.getTeamDiscoveryStoreState(s()).userId, d || "unknown", o.JoinApiRetReasonToString(l.reason) || "unknown", t), r ? n.redirectAndNotify(!1) : u({
                                    title: o.JoinApiRetReasonToLabel(l.reason),
                                    variant: "fail"
                                }));
                                break;
                            case o.JoinApiResultEnum.CanJoin:
                                n.logger.logAskToJoinEvent(e.id, n.selector.getTeamDiscoveryStoreState(s()).userId, "can_auto_join", "can_join", t), r ? i.redirect(l.url) : u({
                                    title: "Joined team",
                                    variant: "complete"
                                });
                                break;
                            default:
                                n.logger.logAskToJoinErrorEvent(e.id, n.selector.getTeamDiscoveryStoreState(s()).userId, "unknown", o.JoinApiRetReasonToString(l.reason) || "unknown", t), r ? n.redirectAndNotify(!1) : u({
                                    title: o.JoinApiRetReasonToLabel(l.reason),
                                    variant: "fail"
                                })
                        }
                    }))
                }
        }, e.prototype.fetchInitialData = function(e, t, r) {
            var n = this;
            return void 0 === t && (t = 5), void 0 === r && (r = ""),
                function(s, l) {
                    return s({
                        type: c.PopulateServerProps,
                        payload: {
                            userEmail: e.userEmail,
                            userId: e.userId
                        }
                    }), n.apiClient.rpc("joinable_teams/list", {
                        member_to_fetch_limit: t
                    }, {
                        subjectUserId: e.userId
                    }).then((function(e) {
                        var t = a.map(e.values, o.toJoinableTeam);
                        s({
                            type: c.FetchInitData,
                            payload: {
                                joinableTeams: t,
                                domainName: e.domain_name
                            }
                        })
                    })).catch((function(e) {
                        if (!r) throw e;
                        i.redirect(r)
                    }))
                }
        }, e.prototype.continueToNextPage = function(e) {
            var t = this;
            return function(r, n) {
                e.preventDefault(), t.logger.logContinueToInstallEvent(t.selector.getTeamDiscoveryStoreState(n()).userId), e.metaKey ? i.open_tab(t.contUrl) : i.redirect(t.contUrl)
            }
        }, e
    })();
    t.ActionCreator = d
})), define("modules/clean/react/teams/team_discovery/data/client", ["require", "exports", "modules/clean/ajax"], (function(e, t, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = (function() {
        function e() {}
        return e.prototype.joinTeam = function(e, t) {
            return r.WebRequest({
                url: "/team/discover/join_ajax",
                data: {
                    team_id: e,
                    isServerView: !1,
                    skip_email_verify: !0,
                    source: t
                }
            }).then((function(e) {
                if (e) return JSON.parse(e)
            }))
        }, e
    })();
    t.LegacyClient = i
})), define("modules/clean/react/teams/team_discovery/data/logger", ["require", "exports", "tslib", "modules/clean/analytics", "modules/core/browser_detection"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n);
    (function(e) {
        e.Signup = "signup", e.Preview = "preview", e.Requests = "requests", e.Pass = "pass"
    })(t.TeamJoinRequestOrigin || (t.TeamJoinRequestOrigin = {})), t.getBrowserTag = function() {
        for (var e = 0, t = [
                [n.chrome, "chrome"],
                [n.edge, "edge"],
                [n.mozilla, "firefox"],
                [n.msie, "msie"],
                [n.safari, "safari"]
            ]; e < t.length; e++) {
            var r = t[e];
            if (r[0]) return r[1]
        }
        return "other"
    }, (function(e) {
        e.TEAM_DISCOVERY = "team_discovery"
    })(t.AMPNamespace || (t.AMPNamespace = {}));
    var o = (function() {
        function e() {}
        return e.prototype.logAskToJoinEvent = function(e, t, r, n, o) {
            i.TeamsWebActionsLogger.log("requested_access_to_team", {
                team_id: e,
                user_id: t,
                url: "team/discover/suggest",
                join_state: r,
                reason: n,
                origin: o
            }, (function() {}), t)
        }, e.prototype.logAskToJoinErrorEvent = function(e, t, r, n, o) {
            i.TeamsWebActionsLogger.log("requested_access_to_team_error", {
                team_id: e,
                user_id: t,
                url: "team/discover/suggest",
                join_state: r,
                reason: n,
                origin: o
            }, (function() {}), t)
        }, e.prototype.logContinueToInstallEvent = function(e) {
            i.TeamsWebActionsLogger.log("surface_existing_team_continue_to_install", {
                user_id: e,
                url: "team/discover/suggest"
            }, (function() {}), e)
        }, e.prototype.logExposedToSETOnPreviewEvent = function(e, t, r, n, o, a, s) {
            i.TeamsWebActionsLogger.log("exposed_to_set_on_preview", {
                team_id: o,
                user_id: e,
                url: "scl/fi/:sckey/:file_name",
                is_cdm_member: t,
                user_root_permissions: r,
                team_member_count: a,
                saw_ask_to_join: n,
                is_new_user: s
            }, (function() {}), e)
        }, e.prototype.logClickedRequestToJoinEvent = function(e, t, r, n) {
            i.TeamsWebActionsLogger.log("clicked_req_to_join", {
                team_id: e,
                user_id: t,
                url: "scl/fi/:sckey/:file_name",
                origin: r,
                is_new_user: n
            }, (function() {}), t)
        }, e
    })();
    t.Logger = o
})), define("modules/clean/react/teams/team_discovery/data/model", ["require", "exports", "tslib", "external/lodash", "modules/core/i18n"], (function(e, t, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), i = r.__importStar(i), (function(e) {
        e.RequestSent = "request_sent", e.RequestNotSent = "request_not_sent", e.CanJoin = "can_join"
    })(t.JoinApiResultEnum || (t.JoinApiResultEnum = {})), (function(e) {
        e[e.Conflict = 5] = "Conflict"
    })(t.JoinApiRetReason || (t.JoinApiRetReason = {})), t.JoinApiRetReasonToString = function(e) {
        return {
            1: "request_created",
            2: "request_exists_same_team",
            3: "request_exists_different_team",
            4: "rejected_by_team",
            5: "conflict"
        }[e] || "unknown_reason"
    }, t.JoinApiRetReasonToLabel = function(e) {
        return {
            1: n.intl.formatMessage({
                defaultMessage: "Request sent. Once it’s approved, you’ll get an invite from the team.",
                description: "Message to show the user on successful join request creation."
            }),
            2: n.intl.formatMessage({
                defaultMessage: "Looks like you’ve already asked to join this team.",
                description: "Message to show the user when they have already requested to join this team."
            }),
            3: n.intl.formatMessage({
                defaultMessage: "Looks like you already asked to join a different team.",
                description: "Message to show the user when they have already requested to join a different team."
            }),
            4: n.intl.formatMessage({
                defaultMessage: "Looks like this team already denied your request.",
                description: "Message to show the user when the team has already denied a request from the user."
            })
        }[e] || n.intl.formatMessage({
            defaultMessage: "Couldn’t send request. Try asking to join in person.",
            description: "Message to show the user when unable to create the join request."
        })
    }, (function(e) {
        e.Suggest = "TeamDiscovery/Suggest", e.Confirm = "TeamDiscovery/Confirm"
    })(t.Pages || (t.Pages = {})), t.toJoinableTeam = function(e) {
        return {
            dbxTeamId: e.dbx_team_id,
            id: e.team_id,
            name: e.team_name,
            adminsCount: e.admins_count,
            membersCount: e.members_count,
            members: i.map(e.members, (function(e) {
                return {
                    memberId: e.member_id,
                    name: e.member_name,
                    isAdmin: e.is_admin,
                    avatarURL: e.photo_url
                }
            }))
        }
    }
}));
//# sourceMappingURL=pkg-file_viewer.min.js-vflT5bSYG.map