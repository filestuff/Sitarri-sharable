define("modules/clean/dbmodal", ["require", "exports", "tslib", "keymaster", "jquery", "modules/clean/dbmodal_stack", "modules/core/controller_helpers", "modules/core/dom", "modules/core/exception"], (function(t, e, o, i, n, r, s, l, _) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), i = o.__importDefault(i), n = o.__importDefault(n), s = o.__importStar(s), l = o.__importStar(l);
    var a = (function() {
        function t(e) {
            this.before_show = this.before_show.bind(this), this.on_confirm_button_click && (this.on_confirm_button_click = this.on_confirm_button_click.bind(this)), this.on_cancel_button_click && (this.on_cancel_button_click = this.on_cancel_button_click.bind(this)), this.format = this.format.bind(this), this.__clone_modal = this.__clone_modal.bind(this), this.__show_modal = this.__show_modal.bind(this), this.__x_click_handler = this.__x_click_handler.bind(this), this.__keydown_handler = this.__keydown_handler.bind(this), this.__overlay_click_handler = this.__overlay_click_handler.bind(this), this.__listen = this.__listen.bind(this), this.__listen_buttons = this.__listen_buttons.bind(this), this.__unlisten = this.__unlisten.bind(this), this.__focus = this.__focus.bind(this), this.__prefill = this.__prefill.bind(this), this.show = this.show.bind(this), this.hide = this.hide.bind(this), this._show = this._show.bind(this), this._hide = this._hide.bind(this), this.set_title = this.set_title.bind(this), this.options = e, this.element_id = t.add_role_to_id(this.options.element_id, this.options.role), this.$template = t.get_template(this.options.element_id);
            var o = this.$template.find(".db-modal");
            return 0 === this.$template.length && (window.DB_FRAME_BUST ? _.assert(!1, "Missing DBModal element '" + this.element_id + "', probably because this page is being framed by " + window.top.location.host + " and our frame protection has kicked in.") : _.assert(!1, "Missing DBModal pyxl element for '" + this.element_id + "'")), this.options.focus && ("confirm" === this.options.focus ? _.assert(o.find(".confirm-button").length, "DBModal pyxl element is missing a confirm button to focus") : "cancel" === this.options.focus ? _.assert(o.find(".cancel-button").length, "DBModal pyxl element is missing a cancel button to focus") : _.assert(o.find(this.options.focus).length, "DBModal pyxl element is missing focus element with selector '" + this.options.focus + "'")), null != this.on_show && _.assert("function" == typeof this.on_show, "'on_show' must be a function"), null != this.before_show && _.assert("function" == typeof this.before_show, "'before_show' must be a function"), null != this.on_hide && _.assert("function" == typeof this.on_hide, "'on_hide' must be a function"), null != this.on_confirm_button_click && _.assert("function" == typeof this.on_confirm_button_click, "'on_confirm_button_click' must be a function"), null != this.on_cancel_button_click && _.assert("function" == typeof this.on_cancel_button_click, "'on_cancel_button_click' must be a function"), this.options.vars && (this.vars = this.options.vars), this.click_out_to_close = !0, !1 === this.options.click_out_to_close && (this.click_out_to_close = !1), this.prev_key_scope = null, this
        }
        return t.initClass = function() {
            this.KEY_SCOPE = "dbmodal", this.__stack = [], this.__DOUBLE_CLICK_MAX_TIME = 300, this.prototype.on_show = null, this.prototype.on_hide = null, this.add_role_to_id = function(t, e) {
                return e ? t + "-" + e : t
            }, this.get_template = function(e, o) {
                var i = t.add_role_to_id(e, o);
                return n.default("#db-modal-" + i)
            }
        }, t.get_containing_modal = function(e) {
            var o = e.closest(".db-modal-wrapper"),
                i = s.get_controller(o);
            return i && _.assert(i instanceof t, "controller of .db-modal-wrapper must be a DBModal object"), i
        }, t.prototype.before_show = function(t) {
            null != this.options.title && this.set_title(this.options.title)
        }, t.prototype.on_confirm_button_click = function(t) {
            t.preventDefault(), r.DBModalStack.pop()
        }, t.prototype.on_cancel_button_click = function(t) {
            t.preventDefault(), r.DBModalStack.pop()
        }, t.prototype.format = function(t) {
            for (var e = 0, o = Object.keys(t || {}); e < o.length; e++) {
                var i = o[e],
                    n = t[i];
                this.$modal_window.find(i).text(n)
            }
            return this
        }, t.prototype.__clone_modal = function() {
            if (this.$modal_window || (this.options.preloaded ? (this.$modal_window = n.default("#" + this.element_id), this.$modal_window.removeClass("db-modal-wrapper--preloaded")) : this.$modal_window = s.clone_element(this.$template).attr("id", this.element_id), this.$overlay = this.$modal_window.find(".db-modal-overlay")), s.deprecated_set_controller(this.$modal_window, this), s.bind_controllers(this.$modal_window), !this.options.preloaded) return n.default("body").prepend(this.$modal_window)
        }, t.prototype.on_show = function(t) {}, t.prototype.on_hide = function() {}, t.prototype.__show_modal = function() {
            return this.$modal_window.show()
        }, t.prototype.__x_click_handler = function(t) {
            t.preventDefault(), r.DBModalStack.clear()
        }, t.prototype.__keydown_handler = function(t) {
            return (27 === t.keyCode || 8 === t.keyCode && !l.focus_in_input()) && (t.preventDefault(), "function" == typeof this.logger_keydown_close_handler && this.logger_keydown_close_handler(), r.DBModalStack.clear()), l.keepFocusIn(this.$modal_window.find(".db-modal"), t)
        }, t.prototype.__overlay_click_handler = function(t) {
            t.preventDefault(), this.__last_show_time && Date.now() < this.__last_show_time + this.constructor.__DOUBLE_CLICK_MAX_TIME || r.DBModalStack.clear()
        }, t.prototype.__listen = function() {
            return !1 !== this.click_out_to_close && this.$overlay.on("click", this.__overlay_click_handler), this.$db_modal_x = this.$modal_window.find(".db-modal-x"), this.$db_modal_x.on("click", this.__x_click_handler), n.default(document).on("keydown", this.__keydown_handler), this.__listen_buttons()
        }, t.prototype.__listen_buttons = function() {
            if (null != this.on_confirm_button_click && (this.$confirm_button = this.$modal_window.find(".confirm-button"), this.$confirm_button.on("click", this.on_confirm_button_click)), null != this.on_cancel_button_click) return this.$cancel_button = this.$modal_window.find(".cancel-button"), this.$cancel_button.on("click", this.on_cancel_button_click)
        }, t.prototype.__unlisten = function() {
            if (!1 !== this.click_out_to_close && this.$overlay.off("click"), this.$db_modal_x.off("click"), n.default(document).off("keydown", this.__keydown_handler), null != this.on_confirm_button_click && this.$confirm_button.off("click"), null != this.on_cancel_button_click) return this.$cancel_button.off("click")
        }, t.prototype.__focus = function() {
            var t = this.$modal_window.find(".db-modal");
            if ("confirm" === this.options.focus) this.focus_element = t.find(".confirm-button").first();
            else if ("cancel" === this.options.focus) this.focus_element = t.find(".cancel-button").first();
            else if (this.options.focus) this.focus_element = t.find(this.options.focus).first();
            else {
                this.focus_element = t;
                var e = l.getTabbableElementsIn(t);
                e.length && (e.length > 1 && n.default(e[0]).is(".db-modal-x") ? this.focus_element = e[1] : this.focus_element = e[0])
            }
            return this.focus_element.focus()
        }, t.prototype.__prefill = function() {
            if (null != this.options.prefill) {
                var t = this.$modal_window.find(".db-modal");
                for (var e in this.options.prefill) {
                    var o = this.options.prefill[e],
                        i = t.find(e).val(o);
                    _.assert(i, "Element with name '" + e + "' not found")
                }
            }
        }, t.prototype.show = function(t, e) {
            null != t && (this.options.focus = t), null != e && (this.options.prefill = e), r.DBModalStack.push(this)
        }, t.prototype.hide = function() {
            this !== r.DBModalStack.top() ? (r.DBModalStack.remove(this), this._hide()) : r.DBModalStack.pop()
        }, t.prototype._show = function() {
            if (!this.visible) {
                this.__last_show_time = Date.now(), this.__clone_modal(), "function" == typeof this.before_show && this.before_show(this.$modal_window), this.__show_modal(), this.__listen(), this.visible = !0, i.default.getScope() !== this.constructor.KEY_SCOPE && (this.prev_key_scope = i.default.getScope()), i.default.setScope(this.constructor.KEY_SCOPE);
                var t = null;
                try {
                    t = new Event("modalOpened")
                } catch (e) {
                    (t = document.createEvent("Event")).initEvent("modalOpened", !0, !0)
                }
                return document.dispatchEvent(t), l.scroll_lock_document(), "function" == typeof this.on_show && this.on_show(), this.__prefill(), this.__focus(), this
            }
        }, t.prototype._hide = function() {
            if (this.visible) {
                this.__unlisten(), i.default.setScope(this.prev_key_scope), this.$modal_window.remove(), this.visible = !1, this.prev_key_scope = null;
                var t = null;
                try {
                    t = new Event("modalClosed")
                } catch (e) {
                    (t = document.createEvent("Event")).initEvent("modalClosed", !0, !0)
                }
                return document.dispatchEvent(t), l.scroll_unlock_document(), "function" == typeof this.on_hide && this.on_hide(), this
            }
        }, t.prototype.set_title = function(t) {
            return this.$modal_window.find(".db-modal-title-text").text(t), this
        }, t
    })();
    e.DBModal = a, a.initClass();
    var c = (function(t) {
        function e(e, o) {
            var i = t.call(this, o) || this;
            return i.before_show = i.before_show.bind(i), i.__inject_basic_user_properties = i.__inject_basic_user_properties.bind(i), i.user = e, i
        }
        return o.__extends(e, t), e.prototype.before_show = function(e) {
            return t.prototype.before_show.call(this, e), this.__inject_basic_user_properties(e)
        }, e.prototype.__inject_basic_user_properties = function(t) {
            var e = t.find("form");
            e.find("input[name='_subject_uid']").remove();
            var o = n.default('<input type="hidden">').attr({
                name: "_subject_uid",
                value: this.user.id
            });
            return e.append(o), t.find(".dbmodal-email-placeholder").text(this.user.email)
        }, e
    })(a);
    e.DBUserModal = c
})), define("modules/clean/legacy_pyxl_controllers/ajax_form", ["require", "exports", "tslib", "jquery", "modules/clean/ajax", "modules/clean/validators/validators", "modules/core/controller_helpers", "modules/core/exception", "modules/core/html", "modules/core/i18n", "modules/core/notify"], (function(t, e, o, i, n, r, s, l, _, a, c) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), i = o.__importDefault(i), n = o.__importStar(n), s = o.__importStar(s);
    var d = (function() {
        function t(t, e, o) {
            this.add_additional_data = this.add_additional_data.bind(this), this._install_schema = this._install_schema.bind(this), this._submit_form = this._submit_form.bind(this), this._on_success = this._on_success.bind(this), this._on_error = this._on_error.bind(this), this._handle_errors = this._handle_errors.bind(this), this._clear_errors = this._clear_errors.bind(this), this._clear_pending = this._clear_pending.bind(this), this.$container = t, this.do_before_submitting = e, this.additional_data = {}, o = o || {}, "FORM" === this.$container.prop("tagName") ? this.$form = this.$container : this.$form = this.$container.find("form"), this.$form.submit(this._submit_form), this.$submit_button = this.$form.find("[type='submit']"), s.deprecated_set_controller(this.$form, this), this.schema = {}, this.should_validate = o.client_side_validation, this.should_submit_once = o.should_submit_once, this.error_handler = "function" == typeof o.error_handler && o.error_handler, this.should_validate && this._fetch_schema()
        }
        return t.initClass = function() {
            this.SUCCESS_EVENT = "db:ajaxform:success", this.ERROR_EVENT = "db:ajaxform:error", this.extract_errors = function(t) {
                if (0 !== t.indexOf("err:")) return !1;
                t = t.substr(4);
                try {
                    return JSON.parse(t)
                } catch (e) {
                    return "string" == typeof t ? t : a.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    })
                }
            }, this.clear_errors = function(t) {
                return t.find(".input-error").removeClass("input-error"), t.find(".error-message").remove()
            }, this.fill_errors = function(t, e) {
                return t.find(".c-card").addClass("u-l-dn"), (function() {
                    var o = [];
                    for (var n in e) {
                        var r = e[n],
                            s = i.default("<span>", {
                                class: "error-message"
                            });
                        r.message_html ? s.html(r.message_html) : s.text(r.message_text), s.insertBefore(t.find("[data-error-field-name='" + n + "']")), t.find("input[name='" + n + "'], input[data-encrypted-name='" + n + "']").addClass("input-error"), "failed-login-invalid-email-password" === n ? o.push(t.find(".c-card").removeClass("u-l-dn")) : o.push(void 0)
                    }
                    return o
                })()
            }
        }, t.clear_error = function(t, e) {
            return t.find("input[name='" + e + "'], input[data-encrypted-name='" + e + "']").removeClass("input-error"), t.find("[data-error-field-name='" + e + "']").prev(".error-message").remove()
        }, t.prototype.add_additional_data = function(t) {
            return i.default.extend(this.additional_data, t)
        }, t.prototype._install_schema = function(t) {
            var e, o = this;
            try {
                e = JSON.parse(t)
            } catch (t) {}
            return i.default.each(e, (function(t, e) {
                if (e) return o.schema[t] = r.validators.create(e)
            }))
        }, t.prototype._fetch_schema = function() {
            var t = this;
            return n.ValidationSchemaRequest({
                url: this.$form.attr("action"),
                success: function(e) {
                    return t._install_schema(e)
                }
            })
        }, t.prototype.reset = function() {
            return Array.from(this.$form.find("input")).map((function(t) {
                return i.default(t).closest(".text-input").val(t.defaultValue)
            }))
        }, t.prototype.set_input_value = function(t, e) {
            return this.$form.find("input[name='" + t + "']").closest(".text-input").val(e)
        }, t.prototype._get_form_data = function() {
            for (var t, e = {}, o = 0, n = Array.from(this.$form.find("input, select, textarea").not(":disabled").not(":radio")); o < n.length; o++) {
                var r = n[o];
                if (t = i.default(r).attr("name")) {
                    var s = void 0,
                        _ = i.default(r).attr("type");
                    s = "checkbox" === _ ? i.default(r).prop("checked") ? "True" : "" : i.default(r).val(), "radio" !== _ && l.assert(!(t in e), "found multiple inputs with the same name"), e[t] = s
                }
            }
            for (var a = 0, c = Array.from(this.$form.find("input:radio:checked:not(disabled)")); a < c.length; a++) {
                r = c[a];
                e[t = i.default(r).attr("name")] = i.default(r).val()
            }
            return e
        }, t.prototype._validate = function(t) {
            var e = this;
            if (!this.should_validate) return null;
            var o = {},
                n = !0;
            return i.default.each(t, (function(i, r) {
                if (e.schema[i]) try {
                    return e.schema[i].validate(r, {
                        field: i,
                        data: t,
                        errors: o
                    })
                } catch (t) {
                    return n = !1, o[i] = {
                        message_text: t.message
                    }
                }
            })), n ? null : o
        }, t.prototype.validate_and_handle_errors = function() {
            this._clear_errors();
            var t = this._validate(this._get_form_data());
            if (t) return this._handle_errors(t)
        }, t.prototype.set_pending_state = function() {
            this.$form.prop("disabled", !0), this.$form.addClass("ajax-loading"), this.$submit_button.prop("disabled", !0)
        }, t.prototype._submit_form = function(t) {
            var e = this;
            t.preventDefault();
            var o = void 0;
            "function" == typeof this.do_before_submitting && (o = this.do_before_submitting()), Promise.resolve(o).then((function() {
                e.set_pending_state();
                var t = e.validate_and_handle_errors();
                if (t) return t;
                e.send_request_wrapper()
            })).catch((function() {
                e._on_error()
            }))
        }, t.prototype.send_request_wrapper = function() {
            this.send_request()
        }, t.prototype.send_request = function() {
            var t = this._get_form_data();
            return i.default.extend(t, this.additional_data), n.FormWebRequest({
                url: this.$form.attr("action"),
                data: t,
                success: this._on_success,
                error: this._on_error,
                complete: this._on_complete,
                skipErrorHandling: !0
            })
        }, t.prototype._on_success = function(e, o, i) {
            var n, r = i.responseText,
                s = t.extract_errors(r);
            if (!1 === s) {
                try {
                    n = JSON.parse(r)
                } catch (t) {
                    return void this._on_error()
                }
                return this.$form.trigger(t.SUCCESS_EVENT, n), this._clear_pending(!this.should_submit_once)
            }
            this._handle_errors(s)
        }, t.prototype._on_error = function() {
            return this.$form.trigger(t.ERROR_EVENT), c.Notify.error(a.intl.formatMessage({
                defaultMessage: "There was a problem completing this request."
            })), this._clear_pending(!0)
        }, t.prototype._handle_errors = function(e) {
            if (this.error_handler) this.error_handler(e);
            else {
                if ("string" == typeof e) return c.Notify.error(new _.HTML(e)), void this._clear_pending(!0);
                t.fill_errors(this.$form, e)
            }
            return this._clear_pending(!0), this.$form.trigger(t.ERROR_EVENT, e)
        }, t.prototype._clear_errors = function() {
            return this.$form.find(".error-message").remove(), this.$form.find("input").removeClass("input-error")
        }, t.prototype._clear_pending = function(t) {
            if (this.$form.removeClass("ajax-loading"), t) return this.$form.prop("disabled", !1), this.$submit_button.prop("disabled", !1)
        }, t
    })();
    d.initClass(), e.default = d
})), define("modules/core/controller_registry", ["require", "exports", "tslib", "jquery", "modules/core/exception"], (function(t, e, o, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), i = o.__importDefault(i);
    var r = function(t, e, n) {
            for (var r = [t].concat(n), s = 0, l = Array.from(t); s < l.length; s++) {
                var _ = l[s];
                i.default(_).data("jscontroller", new(e.bind.apply(e, o.__spreadArrays([void 0], r))))
            }
            return t
        },
        s = (function() {
            function t() {}
            return t.initClass = function() {
                this.controllers = {}
            }, t.register_controller = function(t, e, o) {
                this.controllers[t] = {
                    constructor: e,
                    args: o
                }, this.find_and_bind_controller(t)
            }, t.bind_controller = function(t) {
                var e = t.data("js-component-id");
                if (this.controllers[e]) {
                    var o = this.controllers[e];
                    r(t, o.constructor, o.args)
                } else n.reportStack("No controller for " + e)
            }, t.find_and_bind_controller = function(t) {
                if (this.controllers[t]) {
                    var e = this.controllers[t],
                        o = i.default("[data-js-component-id='" + t + "']");
                    r(o, e.constructor, e.args)
                } else n.reportStack("No controller for " + t)
            }, t
        })();
    s.initClass(), e.default = s
})), define("modules/core/controller_helpers", ["require", "exports", "tslib", "jquery", "modules/core/controller_registry", "modules/core/exception"], (function(t, e, o, i, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), i = o.__importDefault(i), n = o.__importDefault(n), e.deprecated_set_controller = function(t, e) {
        return t.data("jscontroller", e)
    }, e.get_controller = function(t) {
        return t.data("jscontroller")
    }, e.bind_controllers = function(t) {
        for (var o = 0, r = Array.from(t.children()); o < r.length; o++) {
            var s = r[o];
            e.bind_controllers(i.default(s))
        }!e.get_controller(t) && t.data("js-component-id") && n.default.bind_controller(t)
    }, e.clone_element = function(t) {
        r.assert(!!t, "Trying to clone nonexistent element");
        var o = t.clone();
        return e.bind_controllers(o), o
    }
}));
//# sourceMappingURL=pkg-controllers-core.min.js-vfl0XPcJ0.map