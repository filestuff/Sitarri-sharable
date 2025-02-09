define("modules/clean/mailcheck", ["require", "exports", "modules/core/html", "modules/core/i18n"], (function(e, t, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = (function() {
        var e = (function() {
            function e(e, t, r) {
                void 0 === r && (r = {}), this.$input = e, this.$suggestion_container = t, this.checkInput();
                var n = !0 === r.livecheck ? "keyup blur" : "blur";
                this.$input.on(n, this.checkInput.bind(this))
            }
            return e.initClass = function() {
                this.DOMAINS = ["gmail.com", "hotmail.com", "yahoo.com", "aol.com", "web.de", "gmx.de", "googlemail.com", "me.com", "live.com", "msn.com", "mail.ru", "comcast.net", "google.com", "mac.com"], this.WHITELIST_REGEXS = [/ymail.com/, /yahoo\.co\./, /yahoo\.com\./, /hotmail\.co\./, /hotmail\.com\./, /gmx\.net/, /gmx\.at/, /gmx\.ch/, /gmx\.com/, /mail\.com/, /web\.com/], this.THRESHOLD = 2
            }, e.prototype.checkInput = function() {
                var e = this.suggest(this.$input.val());
                e ? this.populate(e) : this.clear()
            }, e.prototype.populate = function(e) {
                var t = this,
                    i = r.HTML.escape(e.local).toHTML() + "@<span class='email_warning_area'>" + r.HTML.escape(e.domain).toHTML() + "</span>";
                return this.$suggestion_container.html(new r.HTML(n.intl.formatMessage({
                    defaultMessage: "Did you mean <a>{suggested_email}</a>?"
                }, {
                    suggested_email: i
                })).toHTML()), this.$suggestion_container.show(), this.$suggestion_container.on("click", (function() {
                    return t.$input.val(e.full), t.clear()
                }))
            }, e.prototype.clear = function() {
                return this.$suggestion_container.empty(), this.$suggestion_container.hide()
            }, e.prototype.suggest = function(e) {
                if (void 0 === e && (e = ""), e.length) {
                    e = e.toLowerCase();
                    var t = this.splitEmail(e);
                    if (!t) return !1;
                    var r = t.local,
                        n = t.domain;
                    if (this.whitelistedDomain(n)) return !1;
                    var i = this.findClosestDomain(n);
                    return !!i && {
                        local: r,
                        domain: i,
                        full: r + "@" + i
                    }
                }
            }, e.prototype.whitelistedDomain = function(t) {
                for (var r = 0, n = Array.from(e.WHITELIST_REGEXS); r < n.length; r++) {
                    if (n[r].test(t)) return !0
                }
                return !1
            }, e.prototype.splitEmail = function(e) {
                var t = e.split("@");
                return 2 === t.length && {
                    local: t[0],
                    domain: t[1]
                }
            }, e.prototype.findClosestDomain = function(t) {
                for (var r = 99, n = null, i = 0, o = Array.from(e.DOMAINS); i < o.length; i++) {
                    var s = o[i],
                        a = this.stringDistance(t, s);
                    a < r && (r = a, n = s)
                }
                return !!(n && n !== t && r <= e.THRESHOLD) && n
            }, e.prototype.stringDistance = function(e, t) {
                if (null == e || 0 === e.length) return null == t || 0 === t.length ? 0 : t.length;
                if (null == t || 0 === t.length) return e.length;
                for (var r = 0, n = 0, i = 0, o = 0; r + n < e.length && r + i < t.length;) {
                    if (e.charAt(r + n) === t.charAt(r + i)) o++;
                    else {
                        n = 0, i = 0;
                        for (var s = 0; s < 5;) {
                            if (r + s < e.length && e.charAt(r + s) === t.charAt(r)) {
                                n = s;
                                break
                            }
                            if (r + s < t.length && e.charAt(r) === t.charAt(r + s)) {
                                i = s;
                                break
                            }
                            s++
                        }
                    }
                    r++
                }
                return (e.length + t.length) / 2 - o
            }, e
        })();
        return e.initClass(), e
    })();
    t.default = i
})), define("modules/clean/legacy_pyxl_controllers/login_or_register", ["require", "exports", "tslib", "jquery", "modules/clean/auth_event_logger", "modules/clean/register_form"], (function(e, t, r, n, i, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importStar(o);
    var s = (function() {
        function e(e) {
            var t = this;
            this.$login_form = e.find(".login-register-login-part"), this.$register_form = e.find(".login-register-register-part"), this.logAppropriateAuthIntent(), e.click((function(e) {
                if (n.default(e.target).hasClass("login-register-switch-link")) return e.preventDefault(), t._toggle_forms(), t.$login_form.find(".text-input input:visible").first().focus(), t.$register_form.find(".text-input input:visible").first().focus()
            })), this.$register_form.on(o.USER_EXISTS, (function(e) {
                for (var r in t._toggle_forms(), e.prefill) {
                    var n = e.prefill[r];
                    t.$login_form.find(r).val(n)
                }
                return t.$login_form.find(e.focus).focus()
            }))
        }
        return e.prototype.logAppropriateAuthIntent = function() {
            this.$login_form.is(":visible") ? i.AuthEventLogger.log_web_login_intent() : this.$register_form.is(":visible") && i.AuthEventLogger.log_web_signup_intent()
        }, e.prototype._toggle_forms = function() {
            this.$login_form.toggle(), this.$register_form.toggle(), this.logAppropriateAuthIntent()
        }, e
    })();
    t.default = s
})), define("modules/clean/form_util/name_parser", ["require", "exports"], (function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = (function() {
        function e() {}
        return e.splitFullName = function(e) {
            var t = e.split(" ");
            return [t[0], t.slice(1).join(" ")]
        }, e
    })();
    t.default = r
})), define("modules/clean/register_form", ["require", "exports", "tslib", "jquery", "modules/clean/abuse/invisible_recaptcha", "modules/clean/legacy_pyxl_controllers/ajax_form", "modules/clean/em_string", "modules/clean/form_util/name_parser", "modules/clean/mailcheck", "modules/clean/profile_services/auth_callback_handler", "modules/clean/profile_services/profile_services_constants", "modules/clean/profile_services/profile_services_link", "modules/clean/web_register_logging_data", "modules/core/accessible_announce", "modules/core/browser"], (function(e, t, r, n, i, o, s, a, l, c, u, d, m, h, _) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), o = r.__importDefault(o), a = r.__importDefault(a), l = r.__importDefault(l), u = r.__importDefault(u), _ = r.__importStar(_);
    var f = (function() {
        function t(t, a, c, m, h, _, f, g, p, v) {
            var b, $ = this;
            void 0 === v && (v = !1), this._handleResendClick = function(t) {
                if ("login-register-resend-invite" === t.target.className) {
                    var n = $.$registerFormContainer.find('input[name="email"]').val();
                    new Promise((function(t, r) {
                        e(["modules/clean/auth/register/form"], t, r)
                    })).then(r.__importStar).then((function(e) {
                        (0, e.handleInviteResendImpl)(t, $.isSendingInvite, n, (function() {
                            return $.isSendingInvite = !0
                        }), (function() {
                            return $.isSendingInvite = !1
                        }))
                    }))
                }
            }, this._handle_google_callback = this._handle_google_callback.bind(this), this._before_submit = this._before_submit.bind(this), this._on_register_success = this._on_register_success.bind(this), this._animate_form = this._animate_form.bind(this), this._index_error_handler = this._index_error_handler.bind(this), this._combined_name_handler = this._combined_name_handler.bind(this), this.$registerFormContainer = t, this.canRedirect = c, this.showForm = m, this.clientSideValidation = h, this.customErrorHandler = _, this.combinedName = f, this.lastNameGoesFirst = g, this.signupEndpoint = p, this.isSendingInvite = !1, this.$registerForm = this.$registerFormContainer.find(".register-form"), "index" === this.customErrorHandler && (b = this._index_error_handler, this.$registerForm.on("click change", "input", this._index_clear_error_handler)), this.registerController = new o.default(this.$registerForm, this._before_submit, {
                client_side_validation: this.clientSideValidation,
                error_handler: b
            }), this.cont = this.$registerForm.find("input[name='cont']").val(), this.$registerForm.find(".login-button, .auth-google").prop("disabled", !1), this.$registerForm.find(".login-button.disabled-button").prop("disabled", !0), i.loadRecaptchaAndSetupInvisibleRecaptcha(this.registerController, this.$registerForm, "email", "REGISTER", v);
            var y = this.$registerForm.find("label[for='tos_agree']"),
                C = parseInt(y.css("font-size"), 10);
            if (new s.Emstring(y.text()).length * C > 200 && this.$registerForm.find(".checkbox").removeClass("checkbox-inline"), this.$registerForm.on(o.default.SUCCESS_EVENT, this._on_register_success), this.showForm) {
                if (this.$registerForm.find("input[type='hidden'][name='is_third_party_auth']").val()) {
                    this.$registerFormContainer.find("input").filter(":visible").filter((function(e, t) {
                        return !n.default(t).val()
                    })).first().focus()
                }
            } else this.$registerForm.find(".login-button").on("click", (function(e) {
                $.$registerFormContainer.hasClass("form_shown") || (e.preventDefault(), $._animate_form())
            }));
            this.$registerForm.find(".auth-google").click((function(e) {
                var t = "true" === e.target.getAttribute("data-third-party-no-popup");
                (new d.ProfileServicesLinkingHandler).auth_service_create_user_if_needed(u.default.GOOGLE, (function(e) {
                    $._handle_google_callback(e)
                }), "register_form", !t)
            })), "small" === a ? (this.$registerForm.find(".bubble-dropdown-container .bubble-dropdown").css({
                visibility: "hidden"
            }), this.$registerForm.find(".password-input-meter").css({
                cursor: "default"
            })) : new l.default(this.$registerForm.find(".input-email"), this.$registerForm.find(".email-suggestion"), {
                livecheck: !1
            });
            var F = this.$registerForm.find("input[type='checkbox'][name='tos_agree']");
            F.length > 0 && F.on("change", (function(e) {
                var t = $.$registerForm.find(".agree .error-message");
                t.length > 0 && t[0].remove()
            })), document.addEventListener("click", this._handleResendClick)
        }
        return t.prototype._handle_google_callback = function(e) {
            var n = this.$registerForm.find("input[type='hidden'][name='cont']").val(),
                i = this.$registerForm.find("input[type='hidden'][name='cont']").val(),
                o = this.$registerForm.find("input[type='hidden'][name='signup_tag']").val(),
                s = this.$registerForm.find("input[type='hidden'][name='k']").val(),
                a = this.$registerForm.find("input[type='hidden'][name='eh']").val(),
                l = m.getWebRegisterLoggingData();
            c.handleRegisterResponse(e, r.__assign({
                registerCont: n,
                loginCont: i,
                signupTag: o,
                canRedirect: this.canRedirect,
                k: s,
                eh: a,
                signupEndpoint: this.signupEndpoint
            }, l), {
                form: this.$registerForm,
                newAccount: t.NEW_ACCOUNT_FROM_3RD_PARTY,
                userExists: t.USER_EXISTS
            })
        }, t.prototype._before_submit = function() {
            !0 === this.combinedName && this._combined_name_handler();
            var e = m.setWebRegisterLoggingData({
                signup_endpoint: this.signupEndpoint
            });
            this.registerController.add_additional_data(e)
        }, t.prototype._on_register_success = function(e, r) {
            this.$registerForm.trigger(t.REGISTER_SUCCESS, r), this.canRedirect && (r.force_redirect_url ? _.redirect(r.redirect_url) : this.cont ? _.redirect(this.cont) : r.redirect_url && _.redirect(r.redirect_url))
        }, t.prototype._animate_form = function() {
            var e = this;
            this.$registerFormContainer.hasClass("form_shown") || n.default.when(this.$registerFormContainer.animate({
                height: this.$registerForm.height()
            }, {
                easing: "easeInOutCubic",
                duration: 500
            })).done((function() {
                e.$registerFormContainer.addClass("form_shown"), e.$registerFormContainer.filter(":input").filter(":visible").first().focus()
            }))
        }, t.prototype.fill = function(e) {
            var t = this;
            Object.keys(e).forEach((function(r) {
                return t.$registerForm.find("[name=" + r + "]").val(e[r])
            }))
        }, t.prototype._index_error_handler = function(e) {
            this.$registerFormContainer.find(".register-form__errors").remove();
            var t = n.default("<ul />").addClass("register-form__errors"),
                r = [];
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    var o = e[i],
                        s = o.message_text || o.message_html;
                    r.push(s), n.default("<li />").addClass("register-form__error").html(s).appendTo(t), this.$registerForm.find(".input-" + i).addClass("text-input--error"), "tos_agree" === i && this.$registerForm.find(".checkbox-inline.agree").addClass("checkbox-inline--error"), this.combinedName && "fname" === i && (this.$registerForm.find(".input-fullname").addClass("text-input--error"), this.$registerForm.find("input[name='fullname']").addClass("input-error")), this.$registerForm.find("input[name='" + i + "']").addClass("input-error")
                }
            return this.$registerFormContainer.append(t), h.AccessibleAnnounce.assertive(r.join(". "))
        }, t.prototype._index_clear_error_handler = function(e) {
            var t = n.default(e.target);
            t.removeClass("input-error"), "checkbox" === t.attr("type") ? t.parents(".checkbox-inline--error").removeClass("checkbox-inline--error") : t.parents(".text-input--error").removeClass("text-input--error")
        }, t.prototype._combined_name_handler = function() {
            var e = this.$registerFormContainer.find('input[name="fullname"]'),
                t = this.$registerFormContainer.find('input[name="fname"]'),
                r = this.$registerFormContainer.find('input[name="lname"]'),
                n = a.default.splitFullName(e.val()),
                i = n[0],
                o = n[1];
            !0 !== this.lastNameGoesFirst ? (t.val(i), void 0 !== o && o !== i && r.val(o)) : (r.val(i), void 0 !== o && o !== i && t.val(o))
        }, t.REGISTER_SUCCESS = "db:register:success", t.NEW_ACCOUNT_FROM_3RD_PARTY = "db:register:new_account_from_3rd_party", t.USER_EXISTS = "db:register:user_exists", t
    })();
    t.RegisterForm = f
})), define("modules/clean/sharing/components/shared_content_icon", ["require", "exports", "tslib", "react", "spectrum/file_icon", "spectrum/icon_content"], (function(e, t, r, n, i, o) {
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
                t = e.className,
                r = e.variant;
            return this.props.isFolder ? n.default.createElement(o.IconContent, {
                className: t,
                name: a(r)
            }) : n.default.createElement(i.FileIcon, {
                className: t,
                path: this.props.contentName,
                variant: r
            })
        }, t
    })((n = r.__importDefault(n)).default.Component);

    function a(e) {
        return "large" === e ? "folder_shared-large" : "folder_shared-small"
    }
    t.SharedContentIcon = s
})), define("modules/clean/sharing/invitation_signup_page", ["require", "exports", "tslib", "react", "jquery", "modules/clean/em_string", "modules/clean/react/maestro_nav/shared_code/constants", "modules/clean/react/maestro_nav/shared_code/dropbox_logo", "modules/clean/react/maestro_nav/shared_code/strings", "modules/clean/sharing/components/shared_content_icon", "modules/core/i18n"], (function(e, t, r, n, i, o, s, a, l, c, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), i = r.__importDefault(i);
    var d = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.onSignInClick = function() {
            var e = i.default(".login-register-container"),
                t = e.find(".login-register-login-part"),
                r = e.find(".login-register-register-part");
            t.show(), r.hide(), t.find(".text-input input:visible").first().focus()
        }, t.prototype.render = function() {
            return n.default.createElement("div", {
                id: "page-header",
                className: "page-header-border"
            }, n.default.createElement("a", {
                className: "maestro-nav__home-button",
                href: "https://" + s.WWW_HOST + "/"
            }, n.default.createElement(a.DropboxLogo, {
                className: "maestro-nav__logo",
                "aria-label": l.homeAriaLabel()
            })), n.default.createElement("a", {
                className: "invitation-signup-page-sign-in",
                onClick: this.onSignInClick
            }, u.intl.formatMessage({
                defaultMessage: "Sign in"
            })))
        }, t
    })(n.default.Component);
    t.InvitationSignupPageHeader = d;
    var m = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            return n.default.createElement("div", {
                className: "sf-invite-referral__header"
            }, this.renderContentIcon(), n.default.createElement("h1", {
                className: "sf-invite-referral__heading"
            }, this.renderHeaderText()))
        }, t.prototype.renderContentIcon = function() {
            return n.default.createElement(c.SharedContentIcon, {
                contentName: this.props.contentName,
                isFolder: !this.props.isFile,
                variant: "large"
            })
        }, t.prototype.renderHeaderText = function() {
            var e = {
                sender_name: o.Emstring.em_snippet(this.props.senderDisplayName, 28, .5),
                content_name: o.Emstring.em_snippet(this.props.contentName, 32, .5),
                sender_name_span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        className: "sf-invite-referral__sender-name"
                    }, e)
                },
                content_name_span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        className: "sf-invite-referral__folder-name"
                    }, e)
                }
            };
            return this.props.isFile ? u.intl.formatMessage({
                defaultMessage: "<sender_name_span>{sender_name}</sender_name_span> wants to share the file <content_name_span>{content_name}</content_name_span> with you."
            }, e) : u.intl.formatMessage({
                defaultMessage: "<sender_name_span>{sender_name}</sender_name_span> wants to share the folder <content_name_span>{content_name}</content_name_span> with you."
            }, e)
        }, t
    })(n.default.Component);
    t.SharedFolderHeader = m
}));
//# sourceMappingURL=pkg-login-and-register-pages.min.js-vfl5DvxyJ.map