define("modules/clean/business/components/snap_engage_link", ["require", "exports", "modules/clean/snapengage"], (function(e, t, a) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = function(e, t) {
        var r = this;
        this.handleClick = function(e) {
            e.preventDefault(), "support" === r.options.chatType ? a.DropboxSnapEngage.startSupportChat(r.options.supportWidgetId) : a.DropboxSnapEngage.startReactiveChat()
        }, this.options = t, e.on("click", this.handleClick)
    };
    t.SnapEngageLink = r
})), define("modules/clean/components/password_strength_meter", ["require", "exports", "tslib", "react", "classnames", "modules/core/i18n", "modules/clean/react/css", "modules/clean/react/bubble_dropdown_v2", "modules/clean/web_timing_logger", "modules/core/cancelable_promise"], (function(e, t, a, r, n, s, o, i, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var c = (function(t) {
        function o(r) {
            var n = t.call(this, r) || this;
            return n.setZxcvbn = function(e) {
                var t = e.default;
                n.setState({
                    zxcvbn: t
                })
            }, n.getPasswordScore = function(e) {
                return n.state.zxcvbn ? n.state.zxcvbn(e).score : 0
            }, n.state = {}, r.zxcvbnPostTti ? l.waitForTTI().then((function() {
                n.zxcvbnPromise = u.makeCancelable(new Promise((function(t, a) {
                    e(["zxcvbn"], t, a)
                })).then(a.__importStar)), n.zxcvbnPromise.then(n.setZxcvbn)
            })) : (n.zxcvbnPromise = u.makeCancelable(new Promise((function(t, a) {
                e(["zxcvbn"], t, a)
            })).then(a.__importStar)), n.zxcvbnPromise.then(n.setZxcvbn)), n
        }
        return a.__extends(o, t), o.prototype.componentWillUnmount = function() {
            this.zxcvbnPromise && this.zxcvbnPromise.cancel()
        }, o.prototype.render = function() {
            var e = this.props.password,
                t = e.length ? Math.max(1, this.getPasswordScore(e)) : 0,
                a = ["", s.intl.formatMessage({
                    defaultMessage: "Weak"
                }), s.intl.formatMessage({
                    defaultMessage: "So-so"
                }), s.intl.formatMessage({
                    defaultMessage: "Good"
                }), s.intl.formatMessage({
                    defaultMessage: "Great!"
                })],
                o = "RIGHT";
            this.props.bubblePosition && this.props.bubblePosition in i.BubbleDropdown.POSITIONS && (o = this.props.bubblePosition);
            var l = this.props.bubbleDescription;
            return l || (l = s.intl.formatMessage({
                defaultMessage: "Passwords must be 6 characters or more. Good passwords are hard to guess and use uncommon words, numbers, symbols, and uppercase letters."
            })), r.default.createElement("div", {
                className: "password-input-meter " + this.props.className,
                tabIndex: -1,
                "aria-label": s.intl.formatMessage({
                    defaultMessage: "Password strength"
                })
            }, [4, 3, 2, 1].map((function(e) {
                var a = n.default({
                    "password-input-dot": !0,
                    "password-input-dot-selected--weak": t >= e && t <= 2,
                    "password-input-dot-selected": t >= e
                });
                return r.default.createElement("div", {
                    key: "password-input-dot-" + e,
                    className: a
                })
            })), r.default.createElement(i.BubbleDropdown, {
                position: i.BubbleDropdown.POSITIONS[o],
                targetButton: r.default.createElement("button", {
                    className: "password-bubble__button"
                }),
                className: this.props.bubbleClassName
            }, r.default.createElement("div", {
                className: "password-bubble__content"
            }, r.default.createElement("div", {
                className: "password-bubble__title"
            }, a[t] || ""), r.default.createElement("div", {
                className: "password-bubble__desc"
            }, l))))
        }, o
    })(r.default.Component);
    t.PasswordStrengthMeter = o.requireCssWithComponent(c, ["/static/css/components/password_strength_meter-vflAqZDga.css"])
})), define("modules/clean/react/business/components/headers/payments_header", ["require", "exports", "tslib", "react", "modules/core/i18n", "modules/clean/react/async/loadable", "modules/clean/web_timing_logger", "modules/clean/react/arbor/aspen/elements/arbor_supernav"], (function(e, t, a, r, n, s, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), o = a.__importStar(o);
    var l = s.Loadable({
            loader: function() {
                return o.waitForTTI().then((function() {
                    return new Promise((function(t, a) {
                        e(["modules/clean/react/payments/buy/components/payments/sox_compliance_warning"], t, a)
                    })).then(a.__importStar).then((function(e) {
                        return e.SOXComplianceBanner
                    }))
                }))
            }
        }),
        u = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return a.__extends(t, e), t.prototype.renderSOXBanner = function() {
                var e = this.props.SOXComplianceMessage;
                return e ? r.default.createElement(l, {
                    message: e
                }) : null
            }, t.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    a = e.phoneNumber,
                    s = e.fixed,
                    o = e.glyph,
                    l = e.wordmark,
                    u = [{
                        title: n.intl.formatMessage({
                            defaultMessage: "Contact sales"
                        }),
                        children: [{
                            title: n.intl.formatMessage({
                                defaultMessage: "Email"
                            }),
                            url: "/business/contact",
                            type: "email",
                            disabled: !1
                        }, {
                            title: n.intl.formatMessage({
                                defaultMessage: "{phone_number}"
                            }, {
                                phone_number: a
                            }),
                            url: "tel:" + a,
                            type: "phone",
                            disabled: !a
                        }]
                    }];
                return r.default.createElement("div", null, this.renderSOXBanner(), r.default.createElement(i.ArborSuperNav, {
                    className: t,
                    fixed: !1 !== s,
                    leftAlignLogo: !0,
                    logoPlatform: "business",
                    navLinksRight: u,
                    glyph: o,
                    wordmark: l
                }))
            }, t
        })(r.default.Component);
    t.PaymentsHeader = u
})), define("modules/clean/react/business/components/headers/simple_header", ["require", "exports", "tslib", "react", "modules/core/i18n", "modules/clean/react/arbor/aspen/elements/arbor_supernav"], (function(e, t, a, r, n, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.render = function() {
            var e, t = this.props,
                a = t.proBizMve,
                o = t.trialDays;
            return e = t.isTryItFree ? n.intl.formatMessage({
                defaultMessage: "Try it free"
            }) : "V2" === a ? n.intl.formatMessage({
                defaultMessage: "Try for free"
            }) : "1" === o ? n.intl.formatMessage({
                defaultMessage: "Try for free",
                description: "Label on the CTA button if trial_days is 1"
            }) : n.intl.formatMessage({
                defaultMessage: "Try free for {trial_days} days",
                description: "Label on the CTA button if trial_days is more than 1 (use plural nouns)"
            }, {
                trial_days: o
            }), r.default.createElement(s.ArborSuperNav, {
                className: this.props.className,
                leftAlignLogo: !0,
                navCTA: {
                    title: e,
                    url: "/business/try",
                    trackingId: "biz_nav_try"
                },
                fixed: !0,
                logoPlatform: "business",
                makeRightCtaPrimary: this.props.makeRightCtaPrimary,
                glyph: this.props.glyph,
                wordmark: this.props.wordmark
            })
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.SimpleHeader = o
})), define("modules/clean/react/payments/business/actions/business_action_creator", ["require", "exports", "tslib", "redux", "external/lodash", "modules/clean/react/payments/common/form/actions/actions", "modules/clean/react/payments/business/actions/business_actions", "modules/clean/react/payments/buy/actions/buy_form_actions", "modules/clean/react/payments/buy/actions/page_actions"], (function(e, t, a, r, n, s, o, i, l) {
    "use strict";

    function u() {
        return {
            updateHistory: l.updateHistory,
            blurEmail: o.blurEmail,
            clickGoogleSignup: s.clickGoogleSignup,
            fetchSubChangePlans: o.fetchSubChangePlans,
            showFormFieldErrors: s.showFormFieldErrors,
            submitTeamForm: o.submitTeamForm,
            toggleExistingAccount: o.toggleExistingAccount,
            updateFormStep: o.updateFormStep,
            updateCountryCode: s.updateCountryCodeAndPrice,
            updateFirstName: s.updateFirstName,
            updateLastName: s.updateLastName,
            updateEmail: s.updateEmail,
            updatePassword: s.updatePassword,
            updateTeamName: s.updateTeamName,
            updateTeamPhone: s.updateTeamPhone,
            updateCompanySize: s.updateCompanySize,
            updateNumberOfUsers: s.updateNumberOfUsers,
            updateSchedule: s.updateSchedule,
            updateProductPlanType: s.updateProductPlanType,
            updatePaymentMethod: s.updatePaymentMethod,
            updateZipCode: s.updateZipCodeAndPrice,
            updateVat: s.updateVatAndPrice,
            updateCpf: s.updateCpf,
            updateCpfName: s.updateCpfName,
            updateNonce: s.updateNonce,
            updatePayPalNonce: s.updatePayPalNonce,
            updateAdyenEncryptedCard: s.updateAdyenEncryptedCard,
            updateEncryptedCardForNetworkToken: s.updateEncryptedCardForNetworkToken,
            updateBrowserInfo: s.updateBrowserInfo,
            updateThreeDsData: s.updateThreeDsData,
            triggerThreeDsChallenge: s.triggerThreeDsChallenge,
            triggerThreeDsFingerprint: s.triggerThreeDsFingerprint,
            updateBIN: s.updateBIN,
            updateAccountHolderName: s.updateAccountHolderName,
            updateIBAN: s.updateIBAN,
            updateMandateSigned: s.updateMandateSigned,
            updateTermsAndService: s.updateTermsAndService,
            updateHasMarkedTTI: o.updateHasMarkedTTI,
            updateEmailsToInvite: s.updateEmailsToInvite,
            updatePhone: s.updatePhone,
            updateCity: s.updateCity,
            updateName: s.updateName,
            updateAddress: s.updateAddress,
            blurCCField: s.blurCCField,
            blurZipCode: s.blurZipCode,
            blurVat: s.blurVat,
            blurCpf: s.blurCpf,
            blurAccountHolderName: s.blurAccountHolderName,
            blurIBAN: s.blurIBAN,
            blurPhone: s.blurPhone,
            blurCity: s.blurCity,
            blurName: s.blurName,
            blurAddress: s.blurAddress,
            updateIdealBank: i.updateIdealBank
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importStar(r), n = a.__importStar(n), s = a.__importStar(s), o = a.__importStar(o), i = a.__importStar(i), l = a.__importStar(l), t.bindTeamBuyActions = function(e) {
        return r.bindActionCreators(u(), e)
    }, t.bindTeamAddBillingActions = function(e) {
        var t, a, s = (t = {
            submitTeamAddBillingForm: o.submitAddBillingForm
        }, a = u(), n.assignIn(t, a));
        return r.bindActionCreators(s, e)
    }
})), define("modules/clean/react/payments/business/actions/business_actions", ["require", "exports", "tslib", "modules/clean/ajax_as_promised", "modules/clean/payments/payment_form/payment_form_spec", "modules/clean/react/payments/common/form/actions/actions", "modules/clean/react/payments/business/state/business_state", "modules/clean/api_v2/noauth_client", "modules/clean/react/payments/checkout/components/modals/login_modal", "modules/clean/payments/skus/constants", "modules/clean/stormcrow/experiment", "modules/clean/payments/skus/subscription_change_plan", "modules/clean/payments/skus/pricing_data", "modules/clean/web_register_logging_data", "modules/core/i18n", "modules/core/notify", "modules/clean/react/payments/common/pricing/actions/actions"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d, p, f, g, h) {
    "use strict";
    var y;

    function _(e, t) {
        return a.__awaiter(this, void 0, void 0, (function() {
            var r, n, s, o, i, l, c, m, d;
            return a.__generator(this, (function(a) {
                return r = t.formData, n = t.pricingState, s = t.pageState, o = r.schedule.formattedValue, i = r.productPlanType.formattedValue, (l = n.subChangePlans.withSchedule(o).withProductPlanType(i).plans.pop()) && (c = l.tvm, e.sub_change_plan = JSON.stringify(l)), m = s.existingAccountShowing, e.account_info_type = m ? "existing" : "new", e.currency = c && c.getCurrency(), e.expected_price = c && c.getExpectedPriceToken(), e.tos_version = "3", e.is_pre_select = s.isPreSelect, (d = n.discountInfo) && (d.cashCode && (e.code = d.cashCode), d.discountCode && (r.schedule.formattedValue === u.ScheduleId.YEARLY || d.allowMonthly) && (e.dcode = d.discountCode), d.resellerHash && (e.reseller_hash = d.resellerHash, e.reseller_discount = d.discountRatio)), e.ignore_bad_emails_silently = !0, e.request_id = t.pageState.requestId, e.submit_seq = t.pageState.submitSeq, [2, p.setWebRegisterLoggingData(e)]
            }))
        }))
    }

    function b() {
        return {
            type: "EmailTakenWarning"
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = a.__importStar(n), (function(e) {
        e[e.HashChange = 0] = "HashChange", e[e.ContinueButton = 1] = "ContinueButton", e[e.SelectStandardButton = 2] = "SelectStandardButton", e[e.SelectAdvancedButton = 3] = "SelectAdvancedButton", e[e.PreSelectedSku = 4] = "PreSelectedSku", e[e.RestoreContinueButton = 5] = "RestoreContinueButton"
    })(y = t.UpdateFormStepOrigins || (t.UpdateFormStepOrigins = {})), t.submitTeamForm = function(e, t, a, r, o) {
        return void 0 === a && (a = {}),
            function(i, l) {
                var u = l(),
                    m = u.formData,
                    d = u.pageState,
                    p = m.countryCode.formattedValue,
                    f = d.experiments,
                    g = d.paymentFormSpec,
                    h = d.existingAccountShowing;
                if (m.productPlanType.formattedValue) {
                    var y = ["numberOfUsers", "schedule", "termsAndService", "countryCode"];
                    d.isTrial ? "V2" === f.growthActSmbNoInvitePage && y.push("teamName") : y.push("teamName", "teamPhone", "companySize"), h || y.push("firstName", "lastName", "email", "password"), c.Experiment(f.subgrowthBizNoCcTrials).isActive || (y.push("paymentMethod"), g.allow_zip_code_for_country(p) && y.push("zipCode"), g.should_show_vat_for_country(p) && y.push("vat"), f.showCpf && g.should_require_cpf(p, u.formData.paymentMethod.formattedValue) && (y.push("cpf"), f.showCpfName && y.push("cpfName")), f && g.showPSD2FieldsToUser(m.paymentMethod.formattedValue, p, !!f.psd2AddressFields) && y.push("name", "city", "address"), m.paymentMethod.formattedValue === n.PaymentMethod.CreditCard ? (y.push("nonce"), y.push("adyenEncryptedCard"), y.push("encryptedCardForNetworkToken"), y.push("bin"), y.push("browserInfo"), y.push("threeDsData")) : m.paymentMethod.formattedValue === n.PaymentMethod.DirectDeposit && y.push("accountHolderName", "iban", "mandateSigned")), _(a, u).then((function(a) {
                        i(s.submitForm(e, y, t, a, void 0, r, o))
                    }))
                }
            }
    }, t.updateFormStep = function(e, t) {
        return function(a, r) {
            var n = r(),
                i = n.pageState,
                l = n.formData,
                u = i.formStep,
                c = [];
            if (void 0 !== e) {
                if (e === u && t !== y.PreSelectedSku) return
            } else e = u + 1;
            if (i.isTrial) {
                var m = o.TryFormSteps(),
                    d = m.planSelectionStep,
                    p = m.paymentInfoStep;
                e === d ? i.existingAccountShowing || (c = c.concat(["firstName", "lastName", "email", "password"])) : e === p && (c = c.concat(["schedule", "numberOfUsers"]))
            }
            t === y.RestoreContinueButton && (c = c.concat(["teamName", "teamPhone", "companySize", "emailsToInvite"])), s.isValidSubmitState(l, c) ? (a({
                type: "UpdateFormStep",
                step: e,
                origin: t
            }), window.location.hash = e.toString(), window.scrollTo(0, 0)) : a(s.showFormFieldErrors(c, "UpdateFormStep"))
        }
    }, t.toggleExistingAccount = function(e) {
        return function(t, a) {
            var r = a();
            if (r.pageState.userInfo.existingAccount) t({
                type: "ToggleExistingAccount",
                show: e
            });
            else {
                var n = f.intl.formatMessage({
                    defaultMessage: "Sign in to your existing account"
                });
                l.LoginModal.getInstance(n).updateRedirectUrl(r.formData.productPlanType.rawValue).show()
            }
        }
    }, t.submitAddBillingForm = function(e, t, a, r, o) {
        return function(i, l) {
            var u = l(),
                c = u.formData,
                m = u.pageState,
                d = c.countryCode.formattedValue,
                p = m.paymentFormSpec;
            if (c.productPlanType.formattedValue) {
                var f = {
                        should_redirect: !1,
                        from_add_billing_page: !a
                    },
                    g = ["numberOfUsers", "schedule", "countryCode", "paymentMethod"];
                p.allow_zip_code_for_country(d) && g.push("zipCode"), p.should_show_vat_for_country(d) && g.push("vat"), m.experiments.showCpf && p.should_require_cpf(d, u.formData.paymentMethod.formattedValue) && (g.push("cpf"), m.experiments.showCpfName && g.push("cpfName")), p.showPSD2FieldsToUser(c.paymentMethod.formattedValue, d, !!u.pageState.experiments.psd2AddressFields) && g.push("name", "city", "address"), u.formData.paymentMethod.formattedValue === n.PaymentMethod.CreditCard ? (g.push("nonce"), g.push("adyenEncryptedCard"), g.push("bin"), g.push("browserInfo"), g.push("threeDsData")) : u.formData.paymentMethod.formattedValue === n.PaymentMethod.DirectDeposit && g.push("accountHolderName", "iban", "mandateSigned"), a && g.push("teamName", "teamPhone", "companySize", "emailsToInvite", "termsAndService"), _(f, u).then((function(n) {
                    var l = "/team/payments/ajax_add_billing";
                    t && !a || (l = "/business/ajax_create_team_buy"), i(s.submitForm(l, g, e, n, void 0, r, o))
                }))
            }
        }
    }, t.fetchSubChangePlans = function(e, t, a, n, s) {
        return function(o, i) {
            var l = a ? a.cashCode : void 0,
                u = a ? a.discountCode : void 0,
                c = a ? a.resellerHash : void 0,
                p = a ? a.discountRatio : void 0,
                f = {
                    is_trial: e,
                    plan_id: t,
                    code: l,
                    dcode: u,
                    reseller_hash: c,
                    reseller_discount: p,
                    user_info: JSON.stringify(n),
                    team_info: JSON.stringify(s)
                };
            o(h.updateTransitionsStart()), r.WebRequest({
                type: "POST",
                url: "/business/ajax_fetch_sub_change_plans",
                data: f
            }).then((function(e) {
                var t = JSON.parse(e);
                h.updateTransitionsSuccess(o, t.map(m.SubscriptionChangePlan.deserialize))
            })).catch((function() {
                g.Notify.error(d.PricingDataException.notifyErrorMessage, 20)
            }))
        }
    }, t.updateHasMarkedTTI = function() {
        return {
            type: "UpdateHasMarkedTTI"
        }
    }, t.emailTakenWarning = b, t.blurEmail = function(e) {
        var t = this;
        return function(r, n) {
            return a.__awaiter(t, void 0, void 0, (function() {
                var t, o, l;
                return a.__generator(this, (function(a) {
                    switch (a.label) {
                        case 0:
                            r(s.blurEmail(e)), t = new i.NoAuthApiV2Client, a.label = 1;
                        case 1:
                            return a.trys.push([1, 3, , 4]), [4, t.ns("growth").rpc("email_taken", {
                                email: e
                            }, {})];
                        case 2:
                            return o = a.sent(), l = n(), o.taken && l.formData.email.rawValue === e && r({
                                type: "EmailTakenWarning"
                            }), [3, 4];
                        case 3:
                            return a.sent(), [2];
                        case 4:
                            return [2]
                    }
                }))
            }))
        }
    }
})), define("modules/clean/react/payments/business/components/team_header_section", ["require", "exports", "tslib", "classnames", "react", "modules/constants/trademark", "modules/core/i18n"], (function(e, t, a, r, n, s, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r);
    var i = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.discountHeaderThanks = function(e, t) {
            return e && t ? o.intl.formatMessage({
                defaultMessage: "{familiar_name}, thanks for participating in {offer_name}."
            }, {
                familiar_name: e,
                offer_name: t
            }) : e ? o.intl.formatMessage({
                defaultMessage: "{familiar_name}, you have an exclusive offer."
            }, {
                familiar_name: e
            }) : t ? o.intl.formatMessage({
                defaultMessage: "Thanks for participating in {offer_name}."
            }, {
                offer_name: t
            }) : o.intl.formatMessage({
                defaultMessage: "You have an exclusive offer."
            })
        }, t.prototype.discountHeaderTitle = function(e) {
            var t = this.props,
                a = t.isTrial,
                r = t.pricingData,
                i = t.trialLength,
                l = e.isExtendedTrial,
                u = !0,
                c = r.getMonthlyPlanData();
            return void 0 !== c && void 0 !== c.nextBillingSummary && c.nextBillingSummary.discountPercentage !== r.getPromoDiscount() && (u = !1), a ? l ? o.intl.formatMessage({
                defaultMessage: "You’re eligible for a free <span>{trial_length}-day</span> trial."
            }, {
                span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        key: "extended-trial-discount",
                        className: "discount"
                    }, e)
                },
                trial_length: i
            }) : u ? o.intl.formatMessage({
                defaultMessage: "Start your {trial_length}-day free trial now, and save <span> {discount_percentage, number, ::percent .##}</span>{br} off your annual subscription!"
            }, {
                span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        key: "trial-discount",
                        className: "discount"
                    }, e)
                },
                br: n.default.createElement("br", {
                    key: "trial-discount-br"
                }),
                discount_percentage: r.getPromoDiscount() / 100,
                trial_length: i
            }) : o.intl.formatMessage({
                defaultMessage: "Start your {trial_length}-day free trial now, and save <span> {discount_percentage, number, ::percent .##}</span>{br} off your subscription!"
            }, {
                span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        key: "trial-discount",
                        className: "discount"
                    }, e)
                },
                br: n.default.createElement("br", {
                    key: "trial-discount-br"
                }),
                discount_percentage: r.getPromoDiscount() / 100,
                trial_length: i
            }) : o.intl.formatMessage({
                defaultMessage: "Save <span>{discount_percentage, number, ::percent .##} off</span> your annual {trademark_business} subscription!"
            }, {
                span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        key: "purchase-discount",
                        className: "discount"
                    }, e)
                },
                discount_percentage: r.getPromoDiscount() / 100,
                trademark_business: s.TRADEMARK_BUSINESS
            })
        }, t.prototype.discountHeader = function(e) {
            var t, a = this.props.subTitle,
                s = e.expiresBy,
                i = e.offerName,
                l = this.props.userInfo.familiarName;
            return a && (t = n.default.createElement("h3", {
                className: "sub-header-small type--help-copy"
            }, a)), n.default.createElement("div", {
                className: r.default("top-header", "grid__container", "grid--x-center", this.props.className)
            }, n.default.createElement("h1", {
                className: "header type--title-1"
            }, this.discountHeaderThanks(l, i), n.default.createElement("div", null, this.discountHeaderTitle(e))), s && n.default.createElement("h3", {
                className: "sub-header grid__item grid--x-center type--help-title"
            }, o.intl.formatMessage({
                defaultMessage: "This offer expires on {expires_by}."
            }, {
                expires_by: s
            })), t)
        }, t.prototype.defaultHeader = function() {
            var e = this.props,
                t = e.centered,
                a = e.title,
                s = e.subTitle,
                o = r.default("header", "type--title-1", "grid__item", {
                    "grid--x-center": t
                }),
                i = r.default("type--copy-mini", "grid__item", "sub-header-small", {
                    "grid--x-center": t
                }),
                l = r.default("top-header", {
                    grid__container: t
                }, this.props.className);
            return n.default.createElement("div", {
                className: l
            }, a && n.default.createElement("h1", {
                className: o
            }, a), n.default.createElement("h3", {
                className: i
            }, s))
        }, t.prototype.render = function() {
            return this.props.discountInfo && !this.props.discountInfo.resellerHash ? this.discountHeader(this.props.discountInfo) : this.defaultHeader()
        }, t.defaultProps = {
            centered: !0
        }, t
    })((n = a.__importDefault(n)).default.Component);
    t.TeamHeaderSection = i
})), define("modules/clean/react/payments/business/components/help_section/buy_help_section", ["require", "exports", "tslib", "react", "modules/clean/react/sprite_div", "modules/core/i18n", "modules/constants/python", "modules/clean/react/payments/checkout/components/help_section/order_summary", "modules/clean/payments/payment_form/payment_form_spec", "modules/constants/trademark", "modules/clean/stormcrow/experiment", "modules/clean/payments/skus/sku_content"], (function(e, t, a, r, n, s, o, i, l, u, c, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var d = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.renderNCCTFAQSection = function() {
                var e = t.props,
                    a = e.ncctVariant,
                    n = e.trialIsActive,
                    o = s.intl.formatMessage({
                        defaultMessage: "Your free trial period won’t be affected. You will be charged after your free trial ends on {trial_end_date} and your plan will transition without interruption."
                    }, {
                        trial_end_date: t.props.trialEndDate
                    });
                if (c.Experiment(a).variantIn("V7", "V9", "V10", "V11", "V12", "V13")) {
                    if (!n) return;
                    o = s.intl.formatMessage({
                        defaultMessage: "Your free trial period won’t be affected. You won’t be charged until after your free trial ends on {trial_end_date} and your plan will transition without interruption."
                    }, {
                        trial_end_date: t.props.trialEndDate
                    })
                }
                return r.default.createElement("div", {
                    className: "section grid__container--p-small"
                }, r.default.createElement("h1", {
                    className: "type--help-title"
                }, s.intl.formatMessage({
                    defaultMessage: "What happens to my free trial?"
                })), r.default.createElement("p", {
                    className: "type--help-copy"
                }, o))
            }, t
        }
        return a.__extends(t, e), t.prototype.renderInvoicePayments = function() {
            var e = this.props.countryCode.toLowerCase(),
                t = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return r.default.createElement("a", {
                        key: "business-help-section-contact-link",
                        href: "/business/contact"
                    }, e)
                };
            return "de" === e ? s.intl.formatMessage({
                defaultMessage: "For 15 or more licenses, we accept payments by bank transfer. Please <a>contact sales</a> for an invoice."
            }, {
                a: t
            }) : o.EU_COUNTRIES.indexOf(e) > -1 ? s.intl.formatMessage({
                defaultMessage: "If you require an invoice to make a payment, please <a>contact our sales team</a>."
            }, {
                a: t
            }) : s.intl.formatMessage({
                defaultMessage: "For 15 or more licenses, we accept payments by bank transfer or check. Please <a>contact sales</a> for an invoice."
            }, {
                a: t
            })
        }, t.prototype.renderOrderSummary = function() {
            var e, t, a = this.props,
                n = a.discountInfo,
                s = a.experiments,
                o = a.formStep,
                l = a.ncctVariant,
                u = a.numberOfUsers,
                c = a.pricingData,
                m = a.schedule,
                d = a.productPlanType,
                p = a.taxNamesByCountry,
                f = a.trialIsActive,
                g = a.subChangePlans;
            if (!d) return null;
            var h = g.withProductPlanType(d),
                y = h.withSchedule(m).plans.pop(),
                _ = h.monthly().plans.pop();
            return e = y && y.tvm, t = _ && _.tvm, r.default.createElement(i.OrderSummary, {
                className: "grid__item--order-1 grid__item--medium--order-2",
                discountInfo: n,
                experiments: s,
                formStep: o,
                monthlyTransition: t,
                ncctVariant: l,
                numberOfUsers: u,
                pricingData: c,
                schedule: m,
                taxNamesByCountry: p,
                transition: e,
                trialIsActive: f
            })
        }, t.prototype.renderFeatureList = function() {
            var e = m.SkuContentClient.deserialize(this.props.standardPlanInfo.skuContent),
                t = [s.intl.formatMessage({
                    defaultMessage: "Individual Dropbox account for each user"
                }), s.intl.formatMessage({
                    defaultMessage: "Space for your team to share and collaborate"
                }), s.intl.formatMessage({
                    defaultMessage: "{vacuuming_policy_max_days} days of file recovery and versioning"
                }, {
                    vacuuming_policy_max_days: e.vacuumingPolicyMaxDays()
                }), s.intl.formatMessage({
                    defaultMessage: "Admin controls and priority support"
                })].map((function(e, t) {
                    return r.default.createElement("li", {
                        key: "buy-feature-" + t
                    }, r.default.createElement(n.default, {
                        group: "business",
                        name: "check-blue"
                    }), r.default.createElement("span", null, e))
                }));
            return r.default.createElement("ul", {
                className: "type--help-copy help__feature-list"
            }, t)
        }, t.prototype.renderInfoSection = function() {
            var e = s.intl.formatMessage({
                defaultMessage: "What is {trademark_business}?"
            }, {
                trademark_business: u.TRADEMARK_BUSINESS
            });
            return r.default.createElement("div", {
                className: "section"
            }, r.default.createElement("h1", {
                className: "type--help-title"
            }, e), this.renderFeatureList())
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.countryCode,
                a = e.ncctVariant,
                n = e.paymentSpec,
                o = e.productPlanType,
                i = e.trialIsActive;
            if (!o) return null;
            var u, m, d, p = [],
                f = [],
                g = n.available_payment_methods_for_country(t),
                h = null;
            if (g.indexOf(l.PaymentMethod.CreditCard) > -1)
                for (var y = 0, _ = n.supported_credit_cards_for_country(t); y < _.length; y++) {
                    var b = _[y];
                    f.push(b), u = "supported-payment-icon#" + b, p.push(r.default.createElement("span", {
                        key: u,
                        className: b
                    }))
                }
            if (g.indexOf(l.PaymentMethod.PayPal) > -1 && (f.push("paypal"), u = "supported-payment-icon#paypal", p.push(r.default.createElement("span", {
                    key: u,
                    className: "paypal helper"
                }))), f) {
                var S = f.join(", ").replace("_", "-"),
                    v = s.intl.formatMessage({
                        defaultMessage: "We accept {payment_methods}"
                    }, {
                        payment_methods: S
                    });
                h = r.default.createElement("span", {
                    className: "ax-visually-hidden"
                }, v)
            }
            return m = r.default.createElement("div", {
                className: "section"
            }, r.default.createElement("h1", {
                className: "type--help-title"
            }, s.intl.formatMessage({
                defaultMessage: "Accepted payment types"
            })), r.default.createElement("div", {
                className: "payment-options grid__item grid--y-middle"
            }, h, p), r.default.createElement("div", {
                className: "invoice-payments type--help-copy"
            }, this.renderInvoicePayments())), c.Experiment(a).variantIn("V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13") && i && (d = this.renderNCCTFAQSection()), r.default.createElement("div", {
                className: "grid__item grid__item--stack business-help-section"
            }, r.default.createElement("div", {
                className: "section-container grid__item--order-2 grid__item--medium--order-1"
            }, d, this.renderInfoSection(), m), this.renderOrderSummary())
        }, t
    })(r.default.Component);
    t.BuyHelpSection = d
})), define("modules/clean/react/payments/business/components/help_section/try_feature_list", ["require", "exports", "tslib", "react", "modules/clean/react/sprite_div", "modules/core/i18n", "modules/clean/stormcrow/experiment", "modules/constants/trademark", "modules/clean/payments/skus/sku_content"], (function(e, t, a, r, n, s, o, i, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.isGrowthBasicOneClickExperimentV1 = function() {
            var e = this.props.experiments;
            return !!e && o.Experiment(e.growthBasicOneClick).variantIs("V1")
        }, t.prototype.renderHeading = function() {
            var e = s.intl.formatMessage({
                    defaultMessage: "What’s included in the free trial?"
                }),
                t = "type--help-title",
                a = this.props,
                n = a.trialLength,
                o = a.isExistingAccount;
            return this.isGrowthBasicOneClickExperimentV1() && o && (t = "type--get-back", e = s.intl.formatMessage({
                defaultMessage: "Try {trademark_business} risk-free for {trial_length} days and upgrade your team’s productivity with:"
            }, {
                trademark_business: i.TRADEMARK_BUSINESS,
                trial_length: n
            })), r.default.createElement("h1", {
                className: t
            }, e)
        }, t.prototype.renderTagline = function() {
            var e = this.props.isExistingAccount;
            return this.isGrowthBasicOneClickExperimentV1() && e ? r.default.createElement("p", {
                className: "tagline--not-needed"
            }, s.intl.formatMessage({
                defaultMessage: "No credit card required. No cancellation needed."
            })) : null
        }, t.prototype.renderFeatures = function() {
            var e = this.props,
                t = e.experiments,
                a = e.isExistingAccount,
                u = e.orionStandardPlan,
                c = e.vacuumingPolicyMaxDays,
                m = [s.intl.formatMessage({
                    defaultMessage: "Full access to {trademark_business} for {trial_length} days"
                }, {
                    trademark_business: i.TRADEMARK_BUSINESS,
                    trial_length: this.props.trialLength
                }), s.intl.formatMessage({
                    defaultMessage: "Space for your team to share and collaborate"
                }), s.intl.formatMessage({
                    defaultMessage: "{vacuuming_policy_max_days} days of file recovery and versioning"
                }, {
                    vacuuming_policy_max_days: c
                }), s.intl.formatMessage({
                    defaultMessage: "Admin controls for additional security"
                })];
            if (t && o.Experiment(t.subgrowthBizNoCcTrials).variantIn("V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13") && (m = [s.intl.formatMessage({
                    defaultMessage: "Full access to {trademark_business} for {trial_length} days"
                }, {
                    trademark_business: i.TRADEMARK_BUSINESS,
                    trial_length: this.props.trialLength
                }), s.intl.formatMessage({
                    defaultMessage: "Space for your team to share and collaborate"
                }), s.intl.formatMessage({
                    defaultMessage: "Advanced sharing and collaboration tools"
                }), s.intl.formatMessage({
                    defaultMessage: "Admin controls for additional security"
                })], this.isGrowthBasicOneClickExperimentV1() && a && u)) {
                var d = u.skuContent,
                    p = l.SkuContentClient.deserialize(d);
                this.isGrowthBasicOneClickExperimentV1() && a && !p.hasUnlimitedSpace() && (m = [s.intl.formatMessage({
                    defaultMessage: "All the space you need, starting at {plan_info}"
                }, {
                    plan_info: p.spaceLongFormRounded()
                }), s.intl.formatMessage({
                    defaultMessage: "Easy-to-use admin tools to manage your team"
                }), s.intl.formatMessage({
                    defaultMessage: "Enhanced file sharing and collaboration"
                })])
            }
            var f = m.map((function(e, t) {
                return r.default.createElement("li", {
                    key: "try-feature-" + t
                }, r.default.createElement(n.default, {
                    group: "business",
                    name: "check-blue"
                }), r.default.createElement("span", null, e))
            }));
            return r.default.createElement("ul", {
                className: "feature-list type--help-copy help__feature-list"
            }, f)
        }, t.prototype.render = function() {
            return r.default.createElement("div", {
                className: "section"
            }, this.renderHeading(), this.renderFeatures(), this.renderTagline())
        }, t
    })(r.default.Component);
    t.TryFeatureList = u
})), define("modules/clean/react/payments/business/components/help_section/try_payment_info", ["require", "exports", "tslib", "react", "modules/core/i18n"], (function(e, t, a, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.productPlanType,
                a = e.trialEndDate;
            return t ? r.default.createElement("div", null, r.default.createElement("div", {
                className: "help-section"
            }, r.default.createElement("h1", {
                className: "type--help-title"
            }, n.intl.formatMessage({
                defaultMessage: "Will my credit card be charged right now?"
            })), r.default.createElement("div", {
                className: "type--help-copy"
            }, n.intl.formatMessage({
                defaultMessage: "Don’t worry, you won’t be charged now. You’ll only be charged if you don’t cancel your trial before it ends on {trial_end_date}."
            }, {
                trial_end_date: a
            }))), r.default.createElement("div", {
                className: "help-section"
            }, r.default.createElement("h1", {
                className: "type--help-title"
            }, n.intl.formatMessage({
                defaultMessage: "Can I cancel the trial at any time?"
            })), r.default.createElement("div", {
                className: "type--help-copy"
            }, n.intl.formatMessage({
                defaultMessage: "Yes! You can cancel at any time. This is a no-obligation free trial."
            }))), r.default.createElement("div", {
                className: "help-section"
            }, r.default.createElement("h1", {
                className: "type--help-title"
            }, n.intl.formatMessage({
                defaultMessage: "Can I change my payment method later?"
            })), r.default.createElement("div", {
                className: "type--help-copy"
            }, n.intl.formatMessage({
                defaultMessage: "Yes! You can change your payment method any time."
            })))) : null
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.TryPaymentInfo = s
})), define("modules/clean/react/payments/business/reducers/reducers", ["require", "exports", "tslib", "redux", "modules/clean/react/payments/business/state/business_state", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/react/payments/common/form/reducers/reducers", "modules/clean/react/payments/common/payments/reducers/reducers", "modules/clean/react/payments/common/pricing/reducers/reducers", "modules/clean/react/payments/common/form_values"], (function(e, t, a, r, n, s, o, i, l, u) {
    "use strict";

    function c() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        return e.reduce((function(e, t) {
            return function(a, r) {
                return t(e(a, r), r)
            }
        }))
    }

    function m(e, t) {
        if (void 0 === e && (e = !1), "ToggleExistingAccount" !== t.type) return e;
        var a = t;
        return void 0 !== a.show ? a.show : !e
    }

    function d(e, t) {
        return void 0 === e && (e = 0), "UpdateFormStep" === t.type ? t.step : e
    }

    function p(e, t) {
        return void 0 === e && (e = !1), "UpdateHasMarkedTTI" === t.type || e
    }

    function f(e, t) {
        if ("SubmitFormError" !== t.type) return e;
        var r = e.formData,
            o = n.TryFormSteps(),
            i = o.accountInfoStep,
            l = o.planSelectionStep,
            u = o.paymentInfoStep;
        return [r.firstName, r.lastName, r.email, r.password, r.teamName, r.teamPhone, r.companySize, r.captcha].some(s.FormValueHelper.hasServerError) ? u = i : s.FormValueHelper.hasServerError(r.numberOfUsers) && (u = l), a.__assign(a.__assign({}, e), {
            pageState: a.__assign(a.__assign({}, e.pageState), {
                formStep: u
            })
        })
    }
    var g;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.existingAccountShowing = m, t.formStep = d, t.hasMarkedTTI = p, t.updateFormStepFromServerError = f, t.TeamBuyReducer = c.apply(void 0, a.__spreadArrays([r.combineReducers({
        formData: function(e, t) {
            switch (void 0 === e && (e = {}), t.type) {
                case "EmailTakenWarning":
                    return a.__assign(a.__assign({}, e), {
                        email: a.__assign(a.__assign({}, e.email), {
                            errorState: u.EmailErrorState.TakenWarning,
                            serverError: "email-taken",
                            showError: !0
                        })
                    });
                case "EmailTakenError":
                    return a.__assign(a.__assign({}, e), {
                        email: a.__assign(a.__assign({}, e.email), {
                            errorState: u.EmailErrorState.TakenError,
                            serverError: "email-taken",
                            showError: !0
                        })
                    })
            }
            return e
        },
        pageState: (g = r.combineReducers({
            existingAccountShowing: m,
            formStep: d,
            hasMarkedTTI: p
        }), function(e, t) {
            return Object.assign({}, e, g(e, t))
        }),
        pricingState: function(e, t) {
            return void 0 === e && (e = {}), e
        }
    }), o.FormReducer], i.PaymentMethodReducers, i.TermsAndServiceReducers, l.TransitionManagementReducers)), t.TeamTryReducer = c(t.TeamBuyReducer, f)
})), define("modules/clean/react/payments/business/state/business_store_creator", ["require", "exports", "tslib", "redux", "redux-thunk", "modules/clean/redux/unsupported", "modules/clean/payments/skus/constants", "modules/clean/react/payments/checkout/components/account_info/team_info", "modules/clean/react/payments/business/state/business_state", "modules/clean/react/payments/common/form_value_factory", "modules/clean/react/payments/common/middleware/web_teams_logger", "modules/clean/react/payments/common/form/middleware/middleware", "modules/clean/react/payments/common/payments/state/store_creator", "modules/clean/react/payments/common/pricing/state/store_creator", "modules/clean/react/payments/common/middleware/payments_ux_logger"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d, p, f) {
    "use strict";

    function g(e, t) {
        return e === o.ProductPlanType.ADVANCED ? t.advanced : t.standard
    }

    function h(e, t, a) {
        var r = e.teamInfo,
            n = e.orionPlanInfo,
            s = e.userInfo,
            l = e.scheduleId,
            c = r.num_users ? r.num_users.toString() : "",
            m = g(e.productPlanType, n).minLicenseCount;
        e.teamNumUsers && (c = Math.max(m, e.teamNumUsers).toString());
        var f = r.phone || "",
            h = i.CompanySizes[r.company_size] ? r.company_size : i.DefaultCompanySize,
            y = r.name || "",
            _ = s.fname || "",
            b = s.lname || "",
            S = "";
        s.existingAccount || (S = s.email || "");
        var v = s.password || "",
            E = o.ScheduleId.YEARLY;
        l && o.ScheduleId.hasOwnProperty(l.toString()) && (E = l);
        var M = [],
            T = p.createPricingFormData(e, a).productPlanType,
            x = d.createPaymentFormData(e, t, a),
            P = x.paymentMethod,
            N = x.countryCode,
            C = x.zipCode,
            w = x.vat,
            k = x.cpf,
            D = x.nonce,
            V = x.payPalNonce,
            I = x.adyenEncryptedCard,
            A = x.encryptedCardForNetworkToken,
            F = x.bin,
            L = x.browserInfo,
            U = x.threeDsData,
            B = x.accountHolderName,
            O = x.iban,
            z = x.mandateSigned,
            H = x.termsAndService,
            R = x.idealBankId,
            Y = x.idealBankName,
            j = x.city,
            q = x.phone,
            W = x.name,
            G = x.address,
            K = T.formattedValue === o.ProductPlanType.ADVANCED ? n.advanced.minLicenseCount : n.standard.minLicenseCount;
        return {
            city: u.FormValueFactory.createCity(j.rawValue),
            phone: u.FormValueFactory.createPhone(q.rawValue),
            name: u.FormValueFactory.createName(W.rawValue),
            address: u.FormValueFactory.createAddress(G.rawValue),
            schedule: u.FormValueFactory.createSchedule(E),
            numberOfUsers: u.FormValueFactory.createNumberOfUsers(c, t, void 0, K, M.length),
            teamPhone: u.FormValueFactory.createTeamPhone(f),
            firstName: u.FormValueFactory.createInput(_),
            lastName: u.FormValueFactory.createInput(b),
            email: u.FormValueFactory.createEmail(S),
            password: u.FormValueFactory.createPassword(v),
            teamName: u.FormValueFactory.createInput(y),
            companySize: u.FormValueFactory.createInput(h),
            captcha: u.FormValueFactory.createInput(""),
            emailsToInvite: u.FormValueFactory.createEmailsToInvite(M),
            productPlanType: T,
            paymentMethod: P,
            countryCode: N,
            zipCode: C,
            vat: w,
            cpf: k,
            cpfName: u.FormValueFactory.createCpfNamePrefill("", "", s && s.displayName),
            nonce: D,
            payPalNonce: V,
            adyenEncryptedCard: I,
            encryptedCardForNetworkToken: A,
            bin: F,
            browserInfo: L,
            threeDsData: U,
            accountHolderName: B,
            iban: O,
            mandateSigned: z,
            termsAndService: H,
            idealBankId: R,
            idealBankName: Y
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importStar(r), n = a.__importDefault(n), l = a.__importStar(l), m = a.__importStar(m), t.createStore = function(e, t) {
        var a = (function(e) {
                var t = (function(e) {
                        var t = e.experiments,
                            a = e.isPreSelect,
                            r = e.isTrial,
                            n = e.locale,
                            s = e.marketingTracker,
                            o = e.orionPlanInfo,
                            i = e.productPlanType,
                            u = e.skipAccountInfoStep,
                            c = e.userInfo,
                            m = l.SKU_SELECTION_STEP;
                        a && (m = l.ACCOUNT_INFO_OR_CHECKOUT_STEP, u && (m = l.PLAN_SELECTION_STEP));
                        var p = g(i, o).minLicenseCount;
                        e.teamNumUsers && (p = Math.max(p, e.teamNumUsers));
                        var f = g(i, o).maxLicenseCount,
                            h = d.createPaymentPageState(e).paymentFormSpec;
                        return {
                            advancedMaxNumUsers: o.advanced.maxLicenseCount,
                            advancedMinNumUsers: o.advanced.minLicenseCount,
                            existingAccountShowing: c.existingAccount,
                            experiments: t,
                            formStep: m,
                            hasMarkedTTI: !1,
                            isPreSelect: a,
                            isTrial: r,
                            locale: n,
                            marketingTracker: s,
                            maxNumUsers: f,
                            minNumUsers: p,
                            paymentFormSpec: h,
                            paypalEmail: "",
                            planId: e.planId,
                            standardMaxNumUsers: o.standard.maxLicenseCount,
                            standardMinNumUsers: o.standard.minLicenseCount,
                            submitState: null,
                            submitting: !1,
                            teamNumUsers: e.teamNumUsers,
                            userInfo: c,
                            requestId: e.requestId,
                            submitSeq: 0
                        }
                    })(e),
                    a = (function(e) {
                        var t = p.createPricingSubState(e),
                            a = t.discountInfo,
                            r = t.subChangePlans,
                            n = d.createPaymentPricingState(e),
                            s = n.countryCode,
                            o = n.countryCodeLoading,
                            i = n.hasCurrencyChanged,
                            l = n.hasTaxChangedWithinCountry,
                            u = n.loadingPrices,
                            c = n.recentLoadEvent,
                            m = n.requestToken;
                        return {
                            discountInfo: a,
                            subChangePlans: r,
                            countryCode: s,
                            countryCodeLoading: o,
                            hasCurrencyChanged: i,
                            hasTaxChangedWithinCountry: l,
                            loadingPrices: u,
                            recentLoadEvent: c,
                            requestToken: m
                        }
                    })(e);
                return {
                    pricingState: a,
                    pageState: t,
                    formData: h(e, t, a)
                }
            })(e),
            o = r.applyMiddleware(n.default, c.webTeamsLogger(e.isTrial), m.submitFormErrorMiddleware, m.marketingEventMiddleware, new f.PaymentsUXLogger(e.requestId).reduxMiddleware);
        return s.createStore(t, a, o)
    }, t.createFormData = h
})), define("modules/clean/react/payments/business/team_buy_page", ["require", "exports", "tslib", "react", "react-redux", "redux", "classnames", "modules/core/browser", "modules/core/i18n", "modules/core/notify", "modules/core/uri", "modules/clean/react/payments/checkout/components/california_legal_terms", "modules/clean/analytics", "modules/clean/payments/skus/pricing_data", "modules/clean/payments/skus/constants", "modules/clean/payments/snapengage", "modules/clean/react/payments/business/actions/business_actions", "modules/clean/react/payments/common/adapters/setup_cash", "modules/clean/react/payments/business/reducers/reducers", "modules/clean/react/payments/business/components/help_section/buy_help_section", "modules/clean/react/payments/business/state/business_store_creator", "modules/clean/react/payments/business/state/business_state", "modules/clean/react/payments/business/actions/business_action_creator", "modules/clean/react/payments/business/with_store", "modules/clean/react/payments/checkout/components/confirm_button", "modules/clean/react/payments/checkout/components/terms_and_service", "modules/clean/react/payments/checkout/components/worldpay_text", "modules/clean/react/payments/business/components/team_header_section", "modules/clean/react/payments/checkout/components/form_section", "modules/clean/react/payments/checkout/components/payment_method_form/business_payment_method_form", "modules/clean/react/payments/checkout/components/payment_method_form/payment_method_lock", "modules/clean/react/payments/checkout/components/team_plan_section", "modules/clean/react/payments/checkout/components/account_info/account_info_section", "modules/clean/react/payments/checkout/components/skus/sku_selection_section", "modules/clean/react/payments/error/errorBox", "modules/clean/web_timing_logger", "modules/constants/trademark", "modules/clean/react/payments/common/form/actions/actions", "modules/core/exception"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d, p, f, g, h, y, _, b, S, v, E, M, T, x, P, N, C, w, k, D, V, I, A, F, L, U, B) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), s = a.__importStar(s), o = a.__importDefault(o), i = a.__importStar(i), F = a.__importStar(F), B = a.__importStar(B);
    var O = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.refreshed = !1, t.updateStepToHashEventListener = function() {
                return t.updateStepToHash()
            }, t.updateStepToHash = function(e) {
                void 0 === e && (e = !1);
                var a = t.props.formData,
                    r = i.get_hash(),
                    n = r ? parseInt(r, 10) : null,
                    s = r ? parseInt(r, 10) : v.SKU_SELECTION_STEP,
                    o = v.BuyFormSteps().skuSelectionStep,
                    l = I.SkuSelectionSection.validProductPlanType.bind(null, a);
                s > o && !l() && (s = o), n !== s && (e ? window.history.replaceState({}, "", "#" + s.toString()) : i.set_hash(s.toString())), t.props.actions.updateFormStep(s, h.UpdateFormStepOrigins.HashChange)
            }, t.prepareForSubmission = function() {
                return t.paymentMethodForm.prepareForSubmission()
            }, t.submitForm = function(e) {
                void 0 === e && (e = U.SubmitFormTriggerType.ButtonClick), t.saveState(), t.props.actions.submitTeamForm("/business/ajax_create_team_buy", t.prepareForSubmission, void 0, t.paymentMethodForm.getCreditCardFrame().handle3DsMessage, e)
            }, t.getSubmitText = function() {
                var e = t.props,
                    a = e.pageState;
                return e.pricingState.loadingPrices ? l.intl.formatMessage({
                    defaultMessage: "Updating prices..."
                }) : a.submitting ? l.intl.formatMessage({
                    defaultMessage: "Processing..."
                }) : l.intl.formatMessage({
                    defaultMessage: "Complete purchase"
                })
            }, t.renderFormSections = function(e) {
                var a = t.props,
                    n = a.ccIframeUrl,
                    s = a.countryList,
                    i = a.formData,
                    u = a.orionPlanInfo,
                    c = a.pageState,
                    d = a.pricingState,
                    p = a.userInfo;
                if (!e) return r.default.createElement("div", null);
                var f = i.zipCode.rawValue,
                    g = 0 === t.props.pricingState.subChangePlans.plans.length,
                    h = c.paymentFormSpec.should_show_vat_for_country(i.countryCode.formattedValue),
                    y = o.default("grid__container", "grid__container--p-small", "team-plan-section");
                return r.default.createElement("div", {
                    className: "grid__item grid__item--medium--7-12"
                }, r.default.createElement("div", {
                    className: "grid__item form__section"
                }, r.default.createElement("div", {
                    className: "business-form grid__item"
                }, r.default.createElement("div", {
                    className: y
                }, r.default.createElement(C.FormSection, {
                    title: l.intl.formatMessage({
                        defaultMessage: "1. Choose your plan"
                    })
                }, r.default.createElement(D.TeamPlanSection, {
                    actions: t.props.actions,
                    advancedDisplayName: u.advanced.skuContent.name,
                    experiments: c.experiments,
                    formData: i,
                    isTrial: !1,
                    isVatCountry: h,
                    pricingData: e,
                    skipPricing: g,
                    standardDisplayName: u.standard.skuContent.name,
                    teamNumUsers: t.props.teamNumUsers,
                    pricingState: t.props.pricingState
                }))), r.default.createElement("div", {
                    className: "grid__container grid__container--p-small account-info-section"
                }, r.default.createElement(V.AccountInfoSection, {
                    actions: t.props.actions,
                    currentUrl: t.getCurrentUrl(),
                    discountInfo: d.discountInfo,
                    existingAccountShowing: c.existingAccountShowing,
                    experiments: c.experiments,
                    formData: i,
                    isTrial: !1,
                    locale: c.locale,
                    sectionIndex: 2,
                    userInfo: p,
                    passwordStrengthPostTTI: !0
                })), r.default.createElement("div", {
                    className: "grid__container grid__container--p-small payment-info-section payment-info-section--CA-terms-included"
                }, r.default.createElement(C.FormSection, {
                    title: t.renderPaymentMethodTitle(),
                    className: "payment-method-section"
                }, r.default.createElement(w.BusinessPaymentMethodForm, {
                    actions: t.props.actions,
                    countryList: s,
                    formData: i,
                    iframeUrl: n,
                    isTeam: !0,
                    paymentIsDown: c.experiments.subgrowthBizPaymentDownRedirect,
                    paymentSpec: c.paymentFormSpec,
                    ref: function(e) {
                        t.paymentMethodForm = e
                    },
                    showCpf: c.experiments.showCpf,
                    showCpfName: c.experiments.showCpfName,
                    psd2AddressFields: c.experiments.psd2AddressFields,
                    submitForm: t.submitForm
                }))), r.default.createElement(m.CaliforniaLegalTerms, {
                    zipCode: f
                }), r.default.createElement(x.TermsAndService, {
                    actions: t.props.actions,
                    experiments: c.experiments,
                    formData: i,
                    isTrial: !1
                }), i.email.isCapturable && r.default.createElement(A.ErrorBox, {
                    isTrial: !1,
                    email: i.email.formattedValue,
                    firstName: i.firstName.formattedValue,
                    lastName: i.lastName.formattedValue
                }), t.renderConfirmButton())), r.default.createElement(P.WorldpayText, {
                    countryCode: i.countryCode.formattedValue
                }))
            }, t
        }
        return a.__extends(t, e), t.prototype.renderPaymentMethodTitle = function() {
            return r.default.createElement("span", {
                className: "payment-method-title grid__item grid--y-bottom"
            }, l.intl.formatMessage({
                defaultMessage: "3. Enter payment details"
            }), r.default.createElement(k.PaymentMethodLock, null))
        }, t.prototype.getValue = function(e, t) {
            var a = sessionStorage.getItem(e);
            return null != a ? a : t
        }, t.prototype.loadState = function() {
            try {
                if (!this.props.experiments.cachePaymentUIFields) return;
                if (void 0 === sessionStorage) return;
                this.props.actions.updateFirstName(this.getValue("firstName", this.props.formData.firstName.rawValue)), this.props.actions.updateLastName(this.getValue("lastName", this.props.formData.lastName.rawValue)), this.props.actions.updateEmail(this.getValue("email", this.props.formData.email.rawValue)), this.props.actions.updateZipCode(this.getValue("zipCode", this.props.formData.zipCode.rawValue));
                var e = this.getValue("countryCode", this.props.formData.countryCode.rawValue);
                this.props.actions.updateCountryCode(e);
                var t = Number(this.getValue("paymentMethod", "" + this.props.formData.paymentMethod.rawValue));
                this.props.pageState.paymentFormSpec.available_payment_methods_for_country(e).includes(t) && this.props.actions.updatePaymentMethod(t), this.props.actions.updateTeamName(this.getValue("teamName", this.props.formData.teamName.rawValue)), this.props.actions.updateTeamPhone(this.getValue("teamPhone", this.props.formData.teamPhone.rawValue)), this.props.actions.updateCompanySize(this.getValue("companySize", this.props.formData.companySize.rawValue)), this.props.experiments.psd2AddressFields && (this.props.actions.updateAddress(this.getValue("address", this.props.formData.address.rawValue)), this.props.actions.updateCity(this.getValue("city", this.props.formData.city.rawValue)), this.props.actions.updateName(this.getValue("name", this.props.formData.name.rawValue)))
            } catch (e) {
                B.reportException({
                    err: new Error("Error loading payment state" + e.message),
                    severity: B.SEVERITY.NONCRITICAL
                })
            }
        }, t.prototype.saveState = function() {
            try {
                if (!this.props.experiments.cachePaymentUIFields) return;
                if (void 0 === sessionStorage) return;
                sessionStorage.setItem("firstName", this.props.formData.firstName.rawValue), sessionStorage.setItem("lastName", this.props.formData.lastName.rawValue), sessionStorage.setItem("email", this.props.formData.email.rawValue), sessionStorage.setItem("zipCode", this.props.formData.zipCode.rawValue), sessionStorage.setItem("countryCode", this.props.formData.countryCode.rawValue), sessionStorage.setItem("paymentMethod", "" + this.props.formData.paymentMethod.rawValue), sessionStorage.setItem("teamName", "" + this.props.formData.teamName.rawValue), sessionStorage.setItem("teamPhone", "" + this.props.formData.teamPhone.rawValue), sessionStorage.setItem("companySize", "" + this.props.formData.companySize.rawValue), this.props.experiments.psd2AddressFields && (sessionStorage.setItem("address", "" + this.props.formData.address.rawValue), sessionStorage.setItem("city", "" + this.props.formData.city.rawValue), sessionStorage.setItem("name", "" + this.props.formData.name.rawValue))
            } catch (e) {
                B.reportException({
                    err: new Error("Error saving payment state" + e.message),
                    severity: B.SEVERITY.NONCRITICAL
                })
            }
        }, t.prototype.getPersistentUrlParameters = function() {
            var e, t = this.props.formData.productPlanType.rawValue,
                a = c.URI.parse(i.get_href_no_hash()).getQuery(),
                r = Object.keys(a),
                n = {};
            return ["dcode", "code", "sku"].forEach((function(e) {
                -1 !== r.indexOf(e) && (n[e] = a[e])
            })), t === f.ProductPlanType.NEW_STANDARD ? e = "std" : t === f.ProductPlanType.ADVANCED && (e = "adv"), e && (n.sku = e), n
        }, t.prototype.getCurrentUrl = function() {
            return c.URI.parse("/business/buy").setQuery(this.getPersistentUrlParameters()).toString()
        }, t.prototype.getTryLinkUrl = function() {
            return c.URI.parse("/business/try").setQuery(this.getPersistentUrlParameters()).toString()
        }, t.prototype.componentDidMount = function() {
            var e = this,
                t = this.props,
                a = t.formData,
                r = t.pageState,
                n = v.BuyFormSteps().checkoutStep;
            F.mark_time_to_interactive(), d.TeamsWebActionsLogger.log("react_checkout_buy_render_success", {
                flow: r.isPreSelect ? "PreSelect" : "PlanSelect"
            });
            var s = I.SkuSelectionSection.validProductPlanType.bind(null, a);
            this.props.productPlanType && r.formStep === n && s() && this.props.actions.updateFormStep(n, h.UpdateFormStepOrigins.PreSelectedSku), window.addEventListener("hashchange", this.updateStepToHashEventListener), this.updateStepToHash(!0), F.waitForTTI().then((function() {
                var t = e.props,
                    a = t.isTrial,
                    r = t.planId,
                    n = t.discountInfo,
                    s = t.userInfo,
                    o = t.teamInfo;
                e.props.serializedSubChangePlans ? e.props.actions.updateNumberOfUsers("" + e.props.formData.numberOfUsers.rawValue) : e.props.actions.fetchSubChangePlans(a, r, n, s, o), e.props.snapengagePostTti && g.ajaxFetchAndLoadSnapengageParams()
            })), this.loadState()
        }, t.prototype.componentWillUnmount = function() {
            window.removeEventListener("hashchange", this.updateStepToHashEventListener)
        }, t.prototype.renderConfirmButton = function() {
            var e = this.props,
                t = e.pageState,
                a = e.pricingState,
                n = t.submitting || a.loadingPrices ? "ajax-loading" : "";
            return r.default.createElement(T.ConfirmButton, {
                className: n,
                text: this.getSubmitText(),
                disabled: a.loadingPrices || t.submitting,
                onClick: this.submitForm
            })
        }, t.prototype.render = function() {
            var e = this,
                t = this.props,
                a = t.experiments,
                n = t.isBusinessDomain,
                s = t.formData,
                c = t.orionPlanInfo,
                m = t.pageState,
                d = t.pricingData,
                f = t.pricingState,
                g = t.taxNamesByCountry,
                h = t.trialLength,
                y = t.userInfo;
            if (this.refreshed) return r.default.createElement("div", null);
            if (d instanceof p.PricingDataException) return this.refreshed = !0, i.redirect("/team/admin"), r.default.createElement("div", null);
            if (!d) return u.Notify.error(p.PricingDataException.notifyErrorMessage, 20), r.default.createElement("div", null);
            var _, S = o.default({
                    grid__container: !0,
                    hidden: m.formStep === v.SKU_SELECTION_STEP
                }),
                E = l.intl.formatMessage({
                    defaultMessage: "Purchase {trademark_business}"
                }, {
                    trademark_business: L.TRADEMARK_BUSINESS
                }),
                M = void 0;
            return this.props.eligibleForTrial && (M = r.default.createElement("span", null, l.intl.formatMessage({
                defaultMessage: "or <a>try free for {trial_length} days</a>."
            }, {
                a: function() {
                    for (var t = [], a = 0; a < arguments.length; a++) t[a] = arguments[a];
                    return r.default.createElement("a", {
                        key: "subtitle-purchase-cta",
                        "data-trackingid": "59bd8cb1-5955-4eaa-9bf1-346d65bf5dd2",
                        className: "type--semib",
                        href: e.getTryLinkUrl()
                    }, t)
                },
                trial_length: h
            }))), f.subChangePlans && (_ = r.default.createElement(I.SkuSelectionSection, {
                actions: this.props.actions,
                experiments: a,
                formData: s,
                formStep: m.formStep,
                isBusinessDomain: n,
                isTrial: !1,
                locale: this.props.locale,
                subChangePlans: f.subChangePlans,
                visible: m.formStep === v.SKU_SELECTION_STEP,
                standardPlanInfo: c.standard,
                advancedPlanInfo: c.advanced
            })), r.default.createElement("div", {
                className: "business-form-wrapper grid__section"
            }, r.default.createElement(N.TeamHeaderSection, {
                discountInfo: f.discountInfo,
                isTrial: !1,
                pricingData: d,
                subTitle: M,
                title: E,
                userInfo: y
            }), r.default.createElement("div", null, _, r.default.createElement("div", {
                className: S
            }, r.default.createElement("div", {
                className: "grid__container grid--x-bookend grid__container--p-medium"
            }, this.renderFormSections(d), r.default.createElement("div", {
                className: "grid__item grid__item--medium--1-3"
            }, r.default.createElement(b.BuyHelpSection, {
                standardPlanInfo: c.standard,
                countryCode: s.countryCode.formattedValue,
                discountInfo: f.discountInfo,
                experiments: a,
                numberOfUsers: s.numberOfUsers,
                paymentSpec: m.paymentFormSpec,
                pricingData: d,
                productPlanType: s.productPlanType.formattedValue,
                schedule: s.schedule.formattedValue,
                subChangePlans: f.subChangePlans,
                taxNamesByCountry: g
            }))))))
        }, t
    })(r.default.Component);
    t.TeamBuyPageView = O, t.TeamBuyPage = s.compose(M.withStore((function(e) {
        return y.setupCash(e.localeNumberFormat, e.currencyToFormatMap), S.createStore(e, _.TeamBuyReducer)
    })), n.connect((function(e, t) {
        return {
            formData: e.formData,
            pageState: e.pageState,
            pricingState: e.pricingState,
            pricingData: p.PricingDataFactory.createFromState(e, t)
        }
    }), (function(e) {
        return {
            actions: E.bindTeamBuyActions(e)
        }
    })))(O)
})), define("modules/clean/react/payments/business/team_try_page", ["require", "exports", "tslib", "react", "react-redux", "redux", "classnames", "modules/constants/trademark", "modules/core/browser", "modules/core/exception", "modules/core/notify", "modules/core/uri", "modules/core/i18n", "modules/clean/payments/snapengage", "modules/clean/react/payments/checkout/components/multistep/account_info_panel", "modules/clean/react/payments/checkout/components/account_info/account_toggle", "modules/clean/react/payments/checkout/components/confirm_button", "modules/clean/react/profile_services/google_register_button", "modules/clean/react/payments/checkout/components/worldpay_text", "modules/clean/stormcrow/experiment", "modules/clean/react/payments/checkout/components/multistep/multistep_indicator", "modules/clean/react/payments/checkout/components/multistep/payment_method_panel", "modules/clean/payments/skus/pricing_data", "modules/clean/payments/skus/constants", "modules/clean/react/payments/checkout/components/skus/sku_selection_section", "modules/clean/react/payments/business/state/business_state", "modules/clean/react/payments/business/components/team_header_section", "modules/clean/react/payments/business/with_store", "modules/clean/react/payments/checkout/components/multistep/team_plan_panel", "modules/clean/react/payments/business/reducers/reducers", "modules/clean/analytics", "modules/clean/react/payments/business/components/help_section/try_help_section", "modules/clean/react/payments/business/actions/business_actions", "modules/clean/react/payments/business/actions/business_action_creator", "modules/clean/react/payments/business/state/business_store_creator", "modules/clean/react/payments/common/adapters/setup_cash", "modules/clean/web_timing_logger"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d, p, f, g, h, y, _, b, S, v, E, M, T, x, P, N, C, w, k, D, V, I, A, F, L) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), s = a.__importStar(s), o = a.__importDefault(o), l = a.__importStar(l), u = a.__importStar(u), L = a.__importStar(L);
    var U = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.refreshed = !1, t.formContinueClicked = function() {
                t.props.pageState.formStep === x.TryFormSteps().paymentInfoStep ? t.submitForm() : t.props.actions.updateFormStep(t.props.pageState.formStep + 1, V.UpdateFormStepOrigins.ContinueButton)
            }, t.updateStepToHashEventListener = function() {
                return t.updateStepToHash()
            }, t.updateStepToHash = function(e) {
                void 0 === e && (e = !1);
                var a = t.props,
                    r = a.formData,
                    n = a.pageState,
                    s = n.existingAccountShowing,
                    o = n.paymentFormSpec,
                    i = l.get_hash(),
                    u = i ? parseInt(i, 10) : null,
                    c = i ? parseInt(i, 10) : x.SKU_SELECTION_STEP,
                    m = x.TryFormSteps(),
                    d = m.skuSelectionStep,
                    p = m.accountInfoStep,
                    g = m.planSelectionStep,
                    h = m.paymentInfoStep,
                    y = [
                        [p, f.AccountInfoPanel.validFormData.bind(null, r, s, t.props.experiments, n.isTrial)],
                        [g, C.TeamPlanPanel.validFormData.bind(null, r, t.props.experiments, n.isTrial)],
                        [h, v.PaymentMethodPanel.validFormData.bind(null, r, o, n.isTrial)]
                    ],
                    _ = T.SkuSelectionSection.validProductPlanType.bind(null, r);
                y.push([d, _]), y.sort((function(e, t) {
                    return e[0] - t[0]
                })).every((function(e) {
                    var t = e[0],
                        a = e[1];
                    return !(c > t && !a()) || (c = t, !1)
                })), t.props.actions.updateFormStep(c, V.UpdateFormStepOrigins.HashChange), u !== c && (e ? window.history.replaceState({}, "", "#" + c.toString()) : l.set_hash(c.toString()))
            }, t.getSubmitCopy = function() {
                var e = b.Experiment(t.props.experiments.userJourneyBizTryGoogleSignUp).isActive;
                return r.default.createElement("span", null, d.intl.formatMessage({
                    defaultMessage: "Continue"
                }), e ? null : r.default.createElement("div", {
                    className: "continue-arrow"
                }))
            }, t.getSubmitText = function() {
                var e = t.props,
                    a = e.pageState,
                    r = e.pricingState,
                    n = x.TryFormSteps().paymentInfoStep,
                    s = t.getSubmitCopy();
                return a.formStep === n && (s = d.intl.formatMessage({
                    defaultMessage: "Start free trial"
                })), a.submitting ? s = d.intl.formatMessage({
                    defaultMessage: "Processing..."
                }) : (r.loadingPrices || 0 === t.props.pricingState.subChangePlans.plans.length) && (s = d.intl.formatMessage({
                    defaultMessage: "Loading..."
                })), s
            }, t.renderConfirmButton = function() {
                var e = t.props,
                    a = e.pageState,
                    n = e.pricingState,
                    s = x.TryFormSteps().paymentInfoStep,
                    i = o.default({
                        "ajax-loading": a.submitting || n.loadingPrices
                    }),
                    l = n.loadingPrices || a.submitting || 0 === n.subChangePlans.plans.length,
                    u = "button";
                return a.formStep === s && (u = "submit"), r.default.createElement(h.ConfirmButton, {
                    className: i,
                    disabled: l,
                    onClick: t.formContinueClicked,
                    text: t.getSubmitText(),
                    type: u,
                    uxa_element_id: "biz_try_confirm"
                })
            }, t.renderProgressIndicator = function() {
                var e = t.props.pageState;
                return r.default.createElement("div", {
                    className: "multistep-indicator-wrapper"
                }, r.default.createElement(S.MultistepIndicator, {
                    index: e.formStep
                }))
            }, t.toggleExistingAccount = function() {
                t.props.actions.toggleExistingAccount(!1)
            }, t.renderGoogleSignUpSection = function() {
                var e = t.props.pageState,
                    a = x.TryFormSteps().accountInfoStep,
                    n = e.userInfo.existingAccount;
                if (e.formStep === a && !n && !e.existingAccountShowing) {
                    var s = m.URI.parse("/business/try").setQuery(t.getPersistentUrlParameters()).updateQuery({
                        skip: ""
                    }).toString();
                    return r.default.createElement("div", {
                        className: "google-auth"
                    }, r.default.createElement(y.GoogleSignupButton, {
                        className: "google-auth__button",
                        registerCont: s,
                        loginCont: t.getCurrentUrl(),
                        cta: d.intl.formatMessage({
                            defaultMessage: "Sign up with Google"
                        }),
                        importance: "styleless",
                        isPopup: !0,
                        onClick: t.props.actions.clickGoogleSignup,
                        referrer: "business_try",
                        signupTag: "business_try"
                    }), r.default.createElement("div", {
                        className: "existing-account"
                    }, r.default.createElement(g.AccountToggle, {
                        isNoCcTrial: !1,
                        onClick: t.toggleExistingAccount
                    })))
                }
            }, t.setPaymentMethodPanelRef = function(e) {
                t.paymentMethodPanel = e
            }, t.renderTrySteps = function(e) {
                var a, n, s, i = t.props,
                    l = i.countryList,
                    u = i.experiments,
                    c = i.formData,
                    m = i.orionPlanInfo,
                    d = i.trialEndDate,
                    p = i.pageState,
                    g = i.pricingState,
                    h = x.TryFormSteps(),
                    y = h.accountInfoStep,
                    S = h.planSelectionStep,
                    E = h.paymentInfoStep,
                    M = o.default("grid__item", "grid__item--medium--7-12", "grid__item--medium--order-1"),
                    T = o.default("form__section", "grid__item");
                if (p.formStep === S) {
                    var P = p.paymentFormSpec.should_show_vat_for_country(c.countryCode.formattedValue);
                    a = r.default.createElement(C.TeamPlanPanel, {
                        actions: t.props.actions,
                        advancedDisplayName: m.advanced.skuContent.name,
                        experiments: u,
                        formData: c,
                        isVatCountry: P,
                        pricingData: e,
                        standardDisplayName: m.standard.skuContent.name,
                        skipPricing: 0 === t.props.pricingState.subChangePlans.plans.length
                    })
                }
                p.hasMarkedTTI && (n = r.default.createElement(v.PaymentMethodPanel, {
                    actions: t.props.actions,
                    countryList: l,
                    experiments: u,
                    formData: c,
                    hasCurrencyChanged: g.hasCurrencyChanged,
                    hasTaxChangedWithinCountry: g.hasTaxChangedWithinCountry,
                    iframeUrl: t.props.ccIframeUrl,
                    paymentSpec: p.paymentFormSpec,
                    pricingData: e,
                    ref: t.setPaymentMethodPanelRef,
                    trialEndDate: d,
                    visible: p.formStep === E,
                    paymentIsDown: p.experiments.subgrowthBizPaymentDownRedirect,
                    submitForm: t.submitForm
                })), p.formStep === E && (s = r.default.createElement(_.WorldpayText, {
                    countryCode: c.countryCode.formattedValue
                }));
                var N = b.Experiment(t.props.experiments.userJourneyBizTryGoogleSignUp).isActive;
                return r.default.createElement("div", {
                    className: M
                }, r.default.createElement("div", {
                    className: T
                }, r.default.createElement("div", {
                    className: "business-form grid__item"
                }, r.default.createElement(f.AccountInfoPanel, {
                    actions: t.props.actions,
                    currentUrl: t.getCurrentUrl(),
                    discountInfo: g.discountInfo,
                    existingAccountShowing: p.existingAccountShowing,
                    experiments: p.experiments,
                    formData: c,
                    isTrial: !0,
                    locale: p.locale,
                    userInfo: p.userInfo,
                    visible: p.formStep === y,
                    passwordStrengthPostTTI: !0
                }), a, n, t.renderConfirmButton(), N ? t.renderGoogleSignUpSection() : null, t.renderProgressIndicator())), s)
            }, t.renderTryStepPanels = function(e) {
                var a, n = t.props,
                    s = n.customerToCountryMap,
                    l = n.isBusinessDomain,
                    u = n.formData,
                    c = n.orionPlanInfo,
                    m = n.pageState,
                    p = n.pricingState,
                    f = n.trialEndDate,
                    g = n.trialLength,
                    h = x.TryFormSteps().skuSelectionStep,
                    y = o.default({
                        hidden: m.formStep === h
                    }, "business-try-form"),
                    _ = d.intl.formatMessage({
                        defaultMessage: "Start your {trial_length}-day free trial now!"
                    }, {
                        trial_length: g
                    }),
                    b = r.default.createElement("span", null, d.intl.formatMessage({
                        defaultMessage: "or <a>purchase {trademark_business} now</a>."
                    }, {
                        a: function() {
                            for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
                            return r.default.createElement("a", {
                                key: "subtitle-purchase-cta",
                                "data-trackingid": "ec9dcd13-a1e4-45b9-9253-75d4bdc40672",
                                className: "type--semib",
                                href: t.getBuyLinkUrl()
                            }, e)
                        },
                        trademark_business: i.TRADEMARK_BUSINESS
                    }));
                return p.subChangePlans && (a = r.default.createElement(T.SkuSelectionSection, {
                    actions: t.props.actions,
                    experiments: m.experiments,
                    formData: u,
                    formStep: m.formStep,
                    isBusinessDomain: l,
                    isTrial: !0,
                    locale: t.props.locale,
                    subChangePlans: p.subChangePlans,
                    trialLength: g,
                    visible: m.formStep === h,
                    standardPlanInfo: c.standard,
                    advancedPlanInfo: c.advanced
                })), [r.default.createElement(P.TeamHeaderSection, {
                    key: "team-header-section",
                    discountInfo: p.discountInfo,
                    isTrial: !0,
                    pricingData: e,
                    subTitle: b,
                    title: _,
                    trialLength: g,
                    userInfo: m.userInfo
                }), r.default.createElement("div", {
                    key: "try-content-box"
                }, a, r.default.createElement("div", {
                    className: y
                }, r.default.createElement("div", {
                    className: o.default("grid__container", "grid--x-bookend", "grid__container--p-medium")
                }, t.renderTrySteps(e), r.default.createElement(D.TryHelpSection, {
                    countryCode: u.countryCode.formattedValue,
                    customerToCountryMap: s,
                    discountInfo: p.discountInfo,
                    experiments: m.experiments,
                    formStep: m.formStep,
                    locale: m.locale,
                    numberOfUsers: u.numberOfUsers,
                    pricingData: e,
                    productPlanType: u.productPlanType.formattedValue,
                    schedule: u.schedule.formattedValue,
                    subChangePlans: p.subChangePlans,
                    taxNamesByCountry: t.props.taxNamesByCountry,
                    trialEndDate: f,
                    trialLength: g,
                    vacuumingPolicyMaxDays: c.standard.skuContent.vacuumingPolicyMaxDays
                }))))]
            }, t
        }
        return a.__extends(t, e), t.prototype.componentDidMount = function() {
            var e = this,
                t = this.props,
                a = t.formData,
                r = t.pageState,
                n = x.TryFormSteps(),
                s = n.accountInfoStep,
                o = n.planSelectionStep;
            L.mark_time_to_interactive(), k.TeamsWebActionsLogger.log("react_checkout_try_render_success", {
                flow: r.isPreSelect ? "PreSelect" : "PlanSelect"
            });
            var i = T.SkuSelectionSection.validProductPlanType.bind(null, a);
            this.props.productPlanType && i() && (r.formStep === s || r.formStep === o) && this.props.actions.updateFormStep(r.formStep, V.UpdateFormStepOrigins.PreSelectedSku), window.addEventListener("hashchange", this.updateStepToHashEventListener), this.updateStepToHash(!0), L.waitForTTI().then((function() {
                var t = e.props,
                    a = t.isTrial,
                    r = t.planId,
                    n = t.discountInfo,
                    s = t.userInfo,
                    o = t.teamInfo;
                e.props.actions.fetchSubChangePlans(a, r, n, s, o), e.props.actions.updateHasMarkedTTI(), e.props.snapengagePostTti && p.ajaxFetchAndLoadSnapengageParams()
            }))
        }, t.prototype.componentWillUnmount = function() {
            window.removeEventListener("hashchange", this.updateStepToHashEventListener)
        }, t.prototype.prepareForSubmission = function() {
            return this.paymentMethodPanel ? this.paymentMethodPanel.prepareForSubmission() : (u.reportStack("Attempted to prepare submission before payment method panel is loaded.", {
                severity: u.SEVERITY.CRITICAL,
                tags: ["business_try"]
            }), Promise.resolve(!1))
        }, t.prototype.submitForm = function() {
            this.props.actions.submitTeamForm("/business/ajax_create_team_try", this.prepareForSubmission.bind(this), {
                is_trial: !0,
                trial_schedule_id: this.props.trialScheduleId
            })
        }, t.prototype.getBuyLinkUrl = function() {
            return m.URI.parse("/business/buy").setQuery(this.getPersistentUrlParameters()).toString()
        }, t.prototype.getCurrentUrl = function() {
            return m.URI.parse("/business/try").setQuery(this.getPersistentUrlParameters()).toString()
        }, t.prototype.getPersistentUrlParameters = function() {
            var e = this.props.formData.productPlanType.rawValue,
                t = m.URI.parse(l.get_href_no_hash()).getQuery(),
                a = Object.keys(t),
                r = {};
            if (["dcode", "code", "sku"].forEach((function(e) {
                    -1 !== a.indexOf(e) && (r[e] = t[e])
                })), e) {
                var n = void 0;
                e === M.ProductPlanType.NEW_STANDARD ? n = "std" : e === M.ProductPlanType.ADVANCED && (n = "adv"), n && (r.sku = n)
            }
            return r
        }, t.prototype.render = function() {
            return this.refreshed ? r.default.createElement("div", null) : this.props.pricingData instanceof E.PricingDataException ? (this.refreshed = !0, l.redirect("/team/admin"), r.default.createElement("div", null)) : this.props.pricingData ? r.default.createElement("div", {
                className: "business-form-wrapper grid__section"
            }, this.renderTryStepPanels(this.props.pricingData)) : (c.Notify.error(E.PricingDataException.notifyErrorMessage, 20), r.default.createElement("div", null))
        }, t
    })(r.default.Component);
    t.TeamTryPageView = U, t.TeamTryPage = s.compose(N.withStore((function(e) {
        return F.setupCash(e.localeNumberFormat, e.currencyToFormatMap), A.createStore(e, w.TeamTryReducer)
    })), n.connect((function(e, t) {
        return {
            formData: e.formData,
            pageState: e.pageState,
            pricingState: e.pricingState,
            pricingData: E.PricingDataFactory.createFromState(e, t)
        }
    }), (function(e) {
        return {
            actions: I.bindTeamBuyActions(e)
        }
    })))(U)
})), define("modules/clean/react/payments/checkout/components/account_info/account_info_section", ["require", "exports", "tslib", "react", "modules/core/i18n", "modules/clean/react/payments/checkout/components/form_section", "modules/clean/react/payments/checkout/components/account_info/new_account_info", "modules/clean/react/payments/checkout/components/account_info/existing_account_info", "modules/clean/react/payments/checkout/components/account_info/team_info", "modules/clean/react/payments/checkout/components/modals/login_modal", "modules/clean/stormcrow/experiment", "modules/clean/react/payments/checkout/components/account_info/account_toggle"], (function(e, t, a, r, n, s, o, i, l, u, c, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var d = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.showLoginDialog = function() {
                u.LoginModal.getInstance().updateRedirectUrl(t.props.formData.productPlanType.rawValue).show()
            }, t.getTitle = function() {
                var e, a = t.props,
                    r = a.existingAccountShowing,
                    s = a.experiments,
                    o = a.sectionIndex,
                    i = c.Experiment(s.userJourneyBizTryGoogleSignUp).isActive;
                return e = r ? n.intl.formatMessage({
                    defaultMessage: "{index}. Set initial administrator account"
                }, {
                    index: o
                }) : t.props.isTrial ? i ? n.intl.formatMessage({
                    defaultMessage: "{index}. Sign Up"
                }, {
                    index: o
                }) : n.intl.formatMessage({
                    defaultMessage: "{index}. About you"
                }, {
                    index: o
                }) : n.intl.formatMessage({
                    defaultMessage: "{index}. Tell us about yourself"
                }, {
                    index: o
                }), c.Experiment(s.subgrowthBizNoCcTrials).isActive && (e = c.Experiment(s.subgrowthBizNoCcTrials).variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13") && !r ? c.Experiment(s.nbgNcctTrySectionTitles).variantIs("V1") ? c.Experiment(s.nbgTryNumberedHeaders).variantIs("V1") ? n.intl.formatMessage({
                    defaultMessage: "1. Create your account"
                }) : n.intl.formatMessage({
                    defaultMessage: "Create your account"
                }) : n.intl.formatMessage({
                    defaultMessage: "About you"
                }) : ""), e
            }, t
        }
        return a.__extends(t, e), t.prototype.render = function() {
            var e, t = null,
                a = this.props,
                n = a.existingAccountShowing,
                u = a.actions,
                d = a.discountInfo,
                p = d && !!d.resellerHash,
                f = c.Experiment(this.props.experiments.subgrowthBizNoCcTrials);
            n ? e = r.default.createElement(i.ExistingAccountInfo, {
                experiments: this.props.experiments,
                locale: this.props.locale,
                showLoginDialog: this.showLoginDialog,
                toggleExistingAccount: u.toggleExistingAccount,
                userInfo: this.props.userInfo
            }) : (c.Experiment(this.props.experiments.userJourneyBizTryGoogleSignUp).isActive || (t = r.default.createElement(m.AccountToggle, {
                experiments: this.props.experiments,
                isNoCcTrial: f.isActive,
                onClick: this.props.actions.toggleExistingAccount
            })), e = r.default.createElement(o.NewAccountInfo, {
                actions: this.props.actions,
                experiments: this.props.experiments,
                formData: this.props.formData,
                isTrial: this.props.isTrial,
                isValidMSP: Boolean(p),
                passwordStrengthPostTTI: this.props.passwordStrengthPostTTI
            }));
            if (f.variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13")) {
                var g = [e, r.default.createElement(l.TeamInfo, {
                    actions: this.props.actions,
                    formData: this.props.formData,
                    experiments: this.props.experiments,
                    isTrial: this.props.isTrial,
                    isValidMSP: Boolean(p)
                })];
                return n || (g = f.variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13") ? r.default.createElement(s.FormSection, {
                    title: this.getTitle(),
                    sideHeader: t
                }, g) : r.default.createElement(s.FormSection, {
                    title: this.getTitle()
                }, g)), r.default.createElement("div", {
                    className: "grid__item"
                }, g)
            }
            return f.isActive ? r.default.createElement("div", {
                className: "grid__item"
            }, t, e, r.default.createElement(l.TeamInfo, {
                actions: this.props.actions,
                formData: this.props.formData,
                experiments: this.props.experiments,
                isTrial: this.props.isTrial,
                isValidMSP: Boolean(p)
            })) : r.default.createElement(s.FormSection, {
                title: this.getTitle(),
                sideHeader: t
            }, e, r.default.createElement(l.TeamInfo, {
                actions: this.props.actions,
                experiments: this.props.experiments,
                formData: this.props.formData,
                isTrial: this.props.isTrial,
                isValidMSP: Boolean(p)
            }))
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.AccountInfoSection = d
})), define("modules/clean/react/payments/checkout/components/account_info/existing_account_info", ["require", "exports", "tslib", "react", "modules/clean/stormcrow/experiment", "modules/constants/trademark", "modules/core/i18n"], (function(e, t, a, r, n, s, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.getEnglishLayout = function() {
            var e, t = this.props,
                a = t.experiments,
                s = t.userInfo,
                i = t.showLoginDialog,
                l = t.toggleExistingAccount;
            return e = n.Experiment(a.subgrowthBizNoCcTrials).variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13") ? r.default.createElement("p", {
                className: "existing-account__headline"
            }, o.intl.formatMessage({
                defaultMessage: "You are now logged into <em>{email}</em>."
            }, {
                email: s.email,
                em: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return r.default.createElement("span", {
                        className: "existing-account__bold"
                    }, e)
                }
            })) : r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "You’re currently logged into {email}."
            }, {
                email: s.email
            })), r.default.createElement("div", {
                className: "existing-account"
            }, e, r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "If you'd like to use a different e-mail for the admin account, feel free to"
            }), " ", r.default.createElement("a", {
                className: "account-toggle-new",
                onClick: function() {
                    return l()
                }
            }, o.intl.formatMessage({
                defaultMessage: "create a new account"
            })), " ", o.intl.formatMessage({
                defaultMessage: "or"
            }), " ", r.default.createElement("a", {
                className: "account-toggle-existing",
                onClick: function() {
                    return i()
                }
            }, o.intl.formatMessage({
                defaultMessage: "use another account"
            })), "."), r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "You can change admin accounts after starting the trial, and your current files and folders will retain their privacy settings when upgrading."
            })), this.getSmartSyncWarning())
        }, t.prototype.getNonEnglishLayout = function() {
            var e = this.props,
                t = e.userInfo,
                a = e.showLoginDialog,
                n = e.toggleExistingAccount;
            return r.default.createElement("div", {
                className: "existing-account"
            }, r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "You're currently logged in as {name} ({email}), and this account will be the administrator for your new {trademark_business} account."
            }, {
                name: t.displayName,
                email: t.email,
                trademark_business: s.TRADEMARK_BUSINESS
            })), r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "After purchase, all your files and folders will remain private unless you choose to share them with your team."
            })), r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "If you'd like to use a different account to manage your team, you can"
            }), " ", r.default.createElement("a", {
                onClick: function() {
                    return n()
                }
            }, o.intl.formatMessage({
                defaultMessage: "create a new account"
            })), " ", o.intl.formatMessage({
                defaultMessage: "or"
            }), " ", r.default.createElement("a", {
                onClick: function() {
                    return a()
                }
            }, o.intl.formatMessage({
                defaultMessage: "use another account"
            })), "."), this.getSmartSyncWarning())
        }, t.prototype.getSmartSyncWarning = function() {
            return this.props.userInfo.userHasInfinite ? r.default.createElement("p", null, o.intl.formatMessage({
                defaultMessage: "Once you sign up, you won’t be able to make new files online-only until you enable Smart Sync for your team."
            })) : ""
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.userInfo,
                a = e.locale;
            return t.existingAccount ? /^en/.test(a.toLowerCase()) ? this.getEnglishLayout() : this.getNonEnglishLayout() : r.default.createElement("div", null)
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.ExistingAccountInfo = i
})), define("modules/clean/react/payments/checkout/components/account_info/new_account_info", ["require", "exports", "tslib", "classnames", "react", "modules/core/browser", "modules/core/i18n", "modules/clean/components/password_strength_meter", "modules/clean/react/payments/checkout/components/inputs/labeled_text_input", "modules/clean/react/payments/common/form_values", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/stormcrow/experiment"], (function(e, t, a, r, n, s, o, i, l, u, c, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n), s = a.__importStar(s), u = a.__importStar(u);
    var d = (function(e) {
        function t() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.onFirstNameChanged = function(e) {
                t.props.actions.updateFirstName(e.value)
            }, t.onLastNameChanged = function(e) {
                t.props.actions.updateLastName(e.value)
            }, t.onEmailBlur = function(e) {
                t.props.actions.blurEmail(e.value), "" !== e.value && t.props.actions.showFormFieldErrors(["email"], "EmailBlur")
            }, t.toggleExistingAccount = function() {
                t.props.actions.toggleExistingAccount(!1)
            }, t.getPlaceholder = function(e) {
                var a = "";
                if (t.ncctExp.variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13")) switch (e) {
                    case "first":
                        a = o.intl.formatMessage({
                            defaultMessage: "First name",
                            description: "Try and Buy placeholder text"
                        });
                        break;
                    case "email":
                        a = o.intl.formatMessage({
                            defaultMessage: "Email",
                            description: "Try and Buy placeholder text"
                        });
                        break;
                    case "last":
                        a = o.intl.formatMessage({
                            defaultMessage: "Last name",
                            description: "Try and Buy placeholder text"
                        });
                        break;
                    case "password":
                        a = o.intl.formatMessage({
                            defaultMessage: "Password",
                            description: "Try and Buy placeholder text"
                        })
                }
                return a
            }, t.renderNameInputs = function() {
                var e = t.props.formData,
                    a = r.default({
                        "hidden-label": t.ncctExp.variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13")
                    });
                return n.default.createElement("div", {
                    className: "name-fields grid__item grid--x-bookend"
                }, n.default.createElement(l.BizLabeledTextInput, {
                    className: "grid__item grid__item--medium--11-24",
                    errorHTML: e.firstName.serverError,
                    errorText: t.firstNameErrorMessage(),
                    labelClass: a,
                    labelText: o.intl.formatMessage({
                        defaultMessage: "First name"
                    }),
                    name: "fname",
                    onChange: t.onFirstNameChanged,
                    placeholder: t.getPlaceholder("first"),
                    value: e.firstName.rawValue
                }), n.default.createElement(l.BizLabeledTextInput, {
                    className: "grid__item grid__item--medium--11-24",
                    errorHTML: e.lastName.serverError,
                    errorText: t.lastNameErrorMessage(),
                    labelClass: a,
                    labelText: o.intl.formatMessage({
                        defaultMessage: "Last name"
                    }),
                    name: "lname",
                    onChange: t.onLastNameChanged,
                    placeholder: t.getPlaceholder("last"),
                    value: e.lastName.rawValue
                }))
            }, t
        }
        return a.__extends(t, e), Object.defineProperty(t.prototype, "ncctExp", {
            get: function() {
                return m.Experiment(this.props.experiments.subgrowthBizNoCcTrials)
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.onEmailChanged = function(e) {
            this.props.actions.updateEmail(e.value)
        }, t.prototype.onPasswordChanged = function(e) {
            this.props.actions.updatePassword(e.value)
        }, t.prototype.firstNameErrorMessage = function() {
            var e = this.props.formData.firstName;
            return e.showError && !c.FormValueHelper.isValid(e) ? o.intl.formatMessage({
                defaultMessage: "Please enter a valid first name."
            }) : ""
        }, t.prototype.lastNameErrorMessage = function() {
            var e = this.props.formData.lastName;
            return e.showError && !c.FormValueHelper.isValid(e) ? o.intl.formatMessage({
                defaultMessage: "Please enter a valid last name."
            }) : ""
        }, t.prototype.emailErrorMessage = function() {
            var e = this,
                t = this.props.formData.email;
            if (t.showError) switch (t.errorState) {
                case u.EmailErrorState.Empty:
                    return o.intl.formatMessage({
                        defaultMessage: "Please enter an email address."
                    });
                case u.EmailErrorState.NoAt:
                    return o.intl.formatMessage({
                        defaultMessage: "An email address must contain a single @"
                    });
                case u.EmailErrorState.BadUsername:
                    var a = t.formattedValue.split("@")[0];
                    return o.intl.formatMessage({
                        defaultMessage: "The username portion of the email address is invalid (the portion before the @: {username})."
                    }, {
                        username: a
                    });
                case u.EmailErrorState.BadDomain:
                    var r = t.formattedValue.split("@")[1];
                    return "" === r ? o.intl.formatMessage({
                        defaultMessage: "The domain portion of the email address is invalid (the portion after the @)."
                    }) : o.intl.formatMessage({
                        defaultMessage: "The domain portion of the email address is invalid (the portion after the @: {domain})."
                    }, {
                        domain: r
                    });
                case u.EmailErrorState.TakenWarning:
                    return n.default.createElement("span", null, o.intl.formatMessage({
                        defaultMessage: "This e-mail is already taken."
                    }));
                case u.EmailErrorState.TakenError:
                    var i = "/login?cont=" + encodeURIComponent(s.get_href());
                    return n.default.createElement("span", null, o.intl.formatMessage({
                        defaultMessage: "This e-mail is already taken. <a_signin>Sign in</a_signin> or <a_forgot>reset your password</a_forgot>."
                    }, {
                        a_signin: function() {
                            for (var t = [], a = 0; a < arguments.length; a++) t[a] = arguments[a];
                            return e.props.experiments.emailErrorMessageImproved ? n.default.createElement("a", {
                                key: "a-signin",
                                className: "login-register-switch-link",
                                onClick: e.toggleExistingAccount
                            }, t) : n.default.createElement("a", {
                                key: "a-signin",
                                className: "login-register-switch-link",
                                href: i
                            }, t)
                        },
                        a_forgot: function() {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            return n.default.createElement("a", {
                                key: "a-forgot",
                                href: "/forgot"
                            }, e)
                        }
                    }))
            }
            return ""
        }, t.prototype.passwordErrorMessage = function() {
            var e = this.props.formData.password;
            return e.errorState === u.PasswordErrorState.TooShort ? o.intl.formatMessage({
                defaultMessage: "Passwords must be 6 characters or more."
            }) : e.showError && !c.FormValueHelper.isValid(e) ? o.intl.formatMessage({
                defaultMessage: "Please enter a valid password."
            }) : ""
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.formData,
                a = e.isValidMSP,
                s = r.default({
                    "hidden-label": this.ncctExp.variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13")
                });
            return n.default.createElement("div", {
                className: "new-account-info grid__item"
            }, this.renderNameInputs(), n.default.createElement("div", {
                className: "credentials-fields grid__item grid--x-bookend"
            }, n.default.createElement(l.BizLabeledTextInput, {
                className: "grid__item grid__item--medium--11-24",
                disabled: a,
                errorHTML: t.email.serverError,
                errorText: this.emailErrorMessage(),
                labelClass: s,
                labelText: o.intl.formatMessage({
                    defaultMessage: "Email"
                }),
                onBlur: this.onEmailBlur.bind(this),
                onChange: this.onEmailChanged.bind(this),
                name: "email",
                placeholder: this.getPlaceholder("email"),
                type: "email",
                value: t.email.rawValue
            }), n.default.createElement("div", {
                className: "credentials-fields__password grid__item grid__item--medium--11-24"
            }, n.default.createElement(i.PasswordStrengthMeter, {
                password: t.password.rawValue,
                zxcvbnPostTti: this.props.passwordStrengthPostTTI
            }), n.default.createElement(l.BizLabeledTextInput, {
                errorHTML: t.password.serverError,
                errorText: this.passwordErrorMessage(),
                labelClass: s,
                labelText: o.intl.formatMessage({
                    defaultMessage: "Password"
                }),
                name: "password",
                onChange: this.onPasswordChanged.bind(this),
                placeholder: this.getPlaceholder("password"),
                type: "password",
                value: t.password.rawValue
            }))))
        }, t
    })(n.default.Component);
    t.NewAccountInfo = d
})), define("modules/clean/react/payments/checkout/components/account_info/team_info", ["require", "exports", "tslib", "react", "modules/clean/react/sprite", "modules/core/i18n", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/react/payments/checkout/components/inputs/labeled_select_input", "modules/clean/react/payments/checkout/components/inputs/labeled_text_input", "modules/constants/trademark", "modules/clean/react/tooltip", "modules/core/browser_detection"], (function(e, t, a, r, n, s, o, i, l, u, c, m) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), m = a.__importStar(m), t.DefaultCompanySize = "Below 50", t.CompanySizes = {
        "Below 50": s.intl.formatMessage({
            defaultMessage: "Below 50"
        }),
        "50-99": s.intl.formatMessage({
            defaultMessage: "50-99"
        }),
        "100-249": s.intl.formatMessage({
            defaultMessage: "100-249"
        }),
        "250-499": s.intl.formatMessage({
            defaultMessage: "250-499"
        }),
        "500-999": s.intl.formatMessage({
            defaultMessage: "500-999"
        }),
        "1000-2499": s.intl.formatMessage({
            defaultMessage: "1000-2499"
        }),
        "2500-4999": s.intl.formatMessage({
            defaultMessage: "2500-4999"
        }),
        "5000+": s.intl.formatMessage({
            defaultMessage: "5000+"
        })
    };
    var d = (function(e) {
        function d() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.onTeamNameChanged = function(e) {
                t.props.actions.updateTeamName(e.value)
            }, t.onTeamPhoneChanged = function(e) {
                t.props.actions.updateTeamPhone(e.value)
            }, t.onCompanySizeChanged = function(e) {
                t.props.actions.updateCompanySize(e.value)
            }, t
        }
        return a.__extends(d, e), d.prototype.teamNameErrorString = function() {
            var e = this.props.formData.teamName;
            return e.showError && !o.FormValueHelper.isValid(e) ? s.intl.formatMessage({
                defaultMessage: "Please enter a valid team name."
            }) : ""
        }, d.prototype.teamPhoneErrorString = function() {
            var e = this.props.formData.teamPhone;
            return e.showError && !o.FormValueHelper.isValid(e) ? s.intl.formatMessage({
                defaultMessage: "Please enter a valid contact telephone."
            }) : ""
        }, d.prototype.companySizeErrorString = function() {
            var e = this.props.formData.companySize;
            return e.showError && !o.FormValueHelper.isValid(e) ? s.intl.formatMessage({
                defaultMessage: "Please enter your company size."
            }) : ""
        }, d.prototype.renderTeamNameInlineTooltip = function() {
            var e = s.intl.formatMessage({
                    defaultMessage: "The ‘team name’ is the name your {trademark_business} account will go by. For example, ‘Team World Peace.’ You can always change this, even after it’s been set."
                }, {
                    trademark_business: u.TRADEMARK_BUSINESS
                }),
                t = m.is_supported_mobile_browser() ? c.TooltipPosition.BOTTOM : c.TooltipPosition.RIGHT,
                a = r.default.createElement(c.Tooltip, {
                    tooltip_classname: "team-name-label-tooltip-bubble",
                    position: t,
                    tooltip_contents: e
                }, r.default.createElement(n.Sprite, {
                    group: "web",
                    name: "info",
                    alt: ""
                }));
            return r.default.createElement("span", {
                className: "grid__item grid--y-middle input__tooltip--inline"
            }, a)
        }, d.prototype.renderTeamNameLabel = function() {
            var e = s.intl.formatMessage({
                    defaultMessage: "Team name"
                }),
                t = s.intl.formatMessage({
                    defaultMessage: "The ‘team name’ is the name your {trademark_business} account will go by. For example, ‘Team World Peace.’ You can always change this, even after it’s been set."
                }, {
                    trademark_business: u.TRADEMARK_BUSINESS
                }),
                a = r.default.createElement(c.Tooltip, {
                    tooltip_classname: "team-name-label-tooltip-bubble",
                    position: c.TooltipPosition.RIGHT,
                    tooltip_contents: t
                }, r.default.createElement(n.Sprite, {
                    group: "web",
                    name: "info",
                    alt: ""
                }));
            return r.default.createElement("span", {
                className: "grid__item grid--y-middle"
            }, e, a)
        }, d.prototype.render = function() {
            var e = this.props,
                a = e.formData,
                n = e.isTrial,
                o = e.experiments,
                u = Object.keys(t.CompanySizes).map((function(e) {
                    return r.default.createElement("option", {
                        value: e,
                        key: e
                    }, t.CompanySizes[e])
                }));
            if (n) {
                if ("V2" === o.growthActSmbNoInvitePage) {
                    var c = s.intl.formatMessage({
                        defaultMessage: "Team name"
                    });
                    return r.default.createElement("div", {
                        className: "team-info-fields team-info-fields__team-name--single grid__item grid--x-bookend"
                    }, this.renderTeamNameInlineTooltip(), r.default.createElement(l.BizLabeledTextInput, {
                        name: "team_name",
                        labelText: c,
                        labelClass: "hidden-label",
                        className: "grid__item input__label--team_name",
                        value: a.teamName.rawValue,
                        onChange: this.onTeamNameChanged,
                        errorText: this.teamNameErrorString(),
                        errorHTML: a.teamName.serverError,
                        disabled: this.props.isValidMSP,
                        placeholder: c
                    }))
                }
                return null
            }
            return r.default.createElement("div", {
                className: "team-info-fields grid__item grid--x-bookend"
            }, r.default.createElement(l.BizLabeledTextInput, {
                name: "team_name",
                labelText: this.renderTeamNameLabel(),
                className: "grid__item grid__item--medium--7-24 input__label--team_name",
                value: a.teamName.rawValue,
                onChange: this.onTeamNameChanged,
                errorText: this.teamNameErrorString(),
                errorHTML: a.teamName.serverError,
                disabled: this.props.isValidMSP,
                maxLength: 20
            }), r.default.createElement(l.BizLabeledTextInput, {
                name: "team_phone",
                type: "tel",
                labelText: s.intl.formatMessage({
                    defaultMessage: "Contact telephone"
                }),
                className: "grid__item grid__item--medium--7-24 input__label--team_phone",
                value: a.teamPhone.rawValue,
                onChange: this.onTeamPhoneChanged,
                errorText: this.teamPhoneErrorString(),
                errorHTML: a.teamPhone.serverError,
                disabled: this.props.isValidMSP
            }), r.default.createElement(i.BizLabeledSelectInput, {
                errorHTML: a.companySize.serverError,
                errorText: this.companySizeErrorString(),
                labelText: s.intl.formatMessage({
                    defaultMessage: "Company size"
                }),
                className: "grid__item grid__item--medium--7-24 input__label--company_size",
                name: "company_size",
                onChange: this.onCompanySizeChanged,
                value: a.companySize.rawValue
            }, u))
        }, d
    })(r.default.Component);
    t.TeamInfo = d
})), define("modules/clean/react/payments/checkout/components/confirm_button", ["require", "exports", "tslib", "react", "classnames"], (function(e, t, a, r, n) {
    "use strict";
    var s;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n), (function(e) {
        e[e.Primary = 0] = "Primary", e[e.Secondary = 1] = "Secondary"
    })(s = t.Importance || (t.Importance = {}));
    var o = (function(e) {
        function t(t) {
            var a = e.call(this, t) || this;
            return a.handleClick = function() {
                a.props.onClick && a.props.onClick()
            }, a.state = {
                loaded: !1
            }, a
        }
        return a.__extends(t, e), t.prototype.componentDidMount = function() {
            this.setState((function(e) {
                return {
                    loaded: !0
                }
            }))
        }, t.prototype.render = function() {
            var e, t = void 0 !== this.props.importance ? s[this.props.importance].toLowerCase() : s[s.Primary].toLowerCase(),
                a = n.default(((e = {
                    "confirm-button": !0,
                    "checkout-button": !0
                })["checkout-button--" + t] = !0, e), this.props.className),
                o = this.props.disabled || !this.state.loaded,
                i = this.props.type || "submit",
                l = this.props.uxa_element_id;
            return r.default.createElement("button", {
                type: i,
                className: a,
                disabled: o,
                onClick: this.handleClick,
                "data-uxa-log": l
            }, r.default.createElement("span", {
                className: "confirm-text type--semib"
            }, this.props.text))
        }, t
    })(r.default.Component);
    t.ConfirmButton = o
})), define("modules/clean/react/payments/checkout/components/form_section", ["require", "exports", "tslib", "react", "classnames"], (function(e, t, a, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.render = function() {
            var e = n.default(["form-section", "grid__item", this.props.className]),
                t = n.default({
                    "top-row": !0,
                    grid__item: !0,
                    "grid--x-bookend": !!this.props.sideHeader,
                    "grid--y-middle": !!this.props.sideHeader
                });
            return r.default.createElement("section", {
                className: e
            }, r.default.createElement("div", {
                className: "section-header grid__item"
            }, r.default.createElement("div", {
                className: t
            }, r.default.createElement("h3", {
                className: "header-text type--form-title"
            }, this.props.title), r.default.createElement("span", {
                className: "header-side-text type--form-help"
            }, this.props.sideHeader)), r.default.createElement("div", {
                className: "sub-header type--form-help"
            }, this.props.subHeader)), this.props.children)
        }, t
    })(r.default.Component);
    t.FormSection = s
})), define("modules/clean/react/payments/checkout/components/help_section/customer_list", ["require", "exports", "tslib", "modules/constants/python", "modules/constants/trademark", "classnames", "modules/clean/react/image", "react", "modules/core/i18n"], (function(e, t, a, r, n, s, o, i, l) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), s = a.__importDefault(s);
    var u = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.renderCustomer = function(e) {
            var t = "customer-list--images " + e.slug;
            return i.default.createElement(o.Image, {
                key: "customer-list#" + e.slug,
                className: t,
                src: e.logo,
                srcHiRes: e.logo_hires,
                alt: e.name
            })
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.customerToCountryMap,
                a = e.countryCode,
                o = e.showTaxDisclaimer,
                u = t[a];
            u || (u = t.default);
            var c = void 0;
            o && (c = i.default.createElement("div", {
                className: "help-section grid__container--p-small"
            }, i.default.createElement("div", {
                className: "tax-disclaimer type--copy-legal"
            }, l.intl.formatMessage({
                defaultMessage: "Total prices quoted include applicable taxes."
            }))));
            var m = s.default({
                "customer-list": !0,
                grid__container: !0,
                "grid--x-bookend": !this.props.centerCustomers,
                "grid--x-center": this.props.centerCustomers,
                "grid--y-middle": !0
            });
            return i.default.createElement("div", {
                className: "section customer-list-section"
            }, i.default.createElement("h1", {
                className: "type--help-title"
            }, l.intl.formatMessage({
                defaultMessage: "Who’s using Dropbox?"
            })), i.default.createElement("div", {
                className: "type--help-copy"
            }, l.intl.formatMessage({
                defaultMessage: "Over {million_user_count} million people use Dropbox and more than {business_count} teams use {trademark_business} to work smarter, including:"
            }, {
                million_user_count: r.MILLION_USER_COUNT,
                business_count: r.PUBLIC_DFB_COUNT,
                trademark_business: n.TRADEMARK_BUSINESS
            })), i.default.createElement("div", {
                className: m
            }, u.map(this.renderCustomer)), c)
        }, t
    })((i = a.__importDefault(i)).default.Component);
    t.CustomerList = u
})), define("modules/clean/react/payments/checkout/components/help_section/order_summary", ["require", "exports", "tslib", "react-intl", "react", "classnames", "modules/core/i18n", "modules/clean/payments/cash", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/payments/skus/constants", "modules/clean/react/payments/business/state/business_state", "modules/clean/stormcrow/experiment", "modules/clean/stormcrow/stormcrow_exposure_logger"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = a.__importDefault(n), s = a.__importDefault(s);
    var p = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.componentDidUpdate = function() {
            var e = this.props,
                t = e.experiments,
                a = e.formStep,
                r = e.ncctVariant,
                n = e.showDueToday,
                s = e.trialIsActive;
            a === c.BillingFormSteps().checkoutStep && n && s && m.Experiment(r).variantIs("V13") && t && m.Experiment(t.subgrowthBizTpcrBillingDueToday).variantIn("CONTROL", "V1") && (new d.StormcrowExposureLogger).logExposure("subgrowth_biz_tpcr_billing_due_today", t.subgrowthBizTpcrBillingDueToday)
        }, t.prototype.renderLicenses = function(e, t, a, r) {
            var s = e.getInitialPlanInfo(),
                i = s.count,
                l = s.price;
            r && (i = (s = t.getInitialPlanInfo()).count, l = s.price.multiply(12));
            var u = e.getTotalNumberOfLicenses(),
                c = l.divide(i).multiply(u);
            return [n.default.createElement("tr", {
                className: "order-summary__licenses",
                key: "combine-licenses-total-row"
            }, n.default.createElement("td", {
                className: "line-item"
            }, o.intl.formatMessage({
                defaultMessage: "{count, plural, one{<span>{count}</span> user} other{<span>{count}</span> users}}"
            }, {
                count: u,
                span: function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return n.default.createElement("span", {
                        className: "order-summary__license-count"
                    }, e)
                }
            })), n.default.createElement("td", {
                className: "price"
            }, o.intl.formatMessage(a, {
                price: c.toString()
            })))]
        }, t.prototype.renderAnnualDiscount = function(e) {
            var t = e.getYearlySavingsWithoutPromoPercentage(),
                a = e.getYearlySavingsWithoutPromo();
            return isNaN(t) ? n.default.createElement(n.default.Fragment, null) : n.default.createElement("tr", {
                className: "order-summary__savings order-summary__savings--yearly"
            }, n.default.createElement("td", {
                className: "line-item"
            }, o.intl.formatMessage({
                defaultMessage: "Yearly savings ({discount, number, ::percent})"
            }, {
                discount: t / 100
            })), n.default.createElement("td", {
                className: "price"
            }, "-", a.toString()))
        }, t.prototype.renderPromoDiscount = function(e, t, a, r) {
            var s = e.getPromoDiscount(),
                i = e.getYearlyPriceWithoutPromo(!0);
            r || (i = e.getMonthlyPriceWithoutPromo(!0));
            var l = i.multiply(s).divide(100);
            if (100 === s) {
                var u = t.getInitialPlanInfo(),
                    c = u.count,
                    m = u.price;
                r && (c = (u = a.getInitialPlanInfo()).count, m = u.price.multiply(12));
                var d = t.getTotalNumberOfLicenses();
                l = m.divide(c).multiply(d)
            }
            return n.default.createElement("tr", {
                className: "order-summary__savings order-summary__savings--promo"
            }, n.default.createElement("td", {
                className: "line-item"
            }, o.intl.formatMessage({
                defaultMessage: "Discount ({discount, number, ::percent})"
            }, {
                discount: s / 100
            })), n.default.createElement("td", {
                className: "price"
            }, "-", l.toString(), " ", o.intl.formatMessage({
                defaultMessage: "for 1 year"
            })))
        }, t.prototype.getTaxNameForCountry = function(e) {
            var t = this.props.taxNamesByCountry;
            return t[e] || t.null
        }, t.prototype.renderTaxes = function(e) {
            var t = e.getTaxCountryCode(),
                a = e.getTaxPercentage(),
                r = e.getTaxPrice().toString();
            if (a > 0 && t) {
                var s = this.getTaxNameForCountry(t);
                return n.default.createElement("tr", {
                    className: "order-summary__taxes"
                }, n.default.createElement("td", {
                    className: "line-item"
                }, o.intl.formatMessage({
                    defaultMessage: "{tax_name} ({tax_percentage, number, ::percent .##})"
                }, {
                    tax_name: s,
                    tax_percentage: a / 100
                })), n.default.createElement("td", {
                    className: "price"
                }, r))
            }
            return null
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                a = e.discountInfo,
                c = e.experiments,
                d = e.monthlyTransition,
                p = e.ncctVariant,
                f = e.numberOfUsers,
                g = e.pricingData,
                h = e.schedule,
                y = e.showDueToday,
                _ = e.showTotal,
                b = e.transition,
                S = e.trialIsActive;
            if (!l.FormValueHelper.isValid(f) && !f.isUnderLimit || f.isUnderLicenseLimit || !b || !d) return n.default.createElement("div", null);
            var v = b.getScheduleId() === d.getScheduleId(),
                E = !v,
                M = !0;
            a && a.hasOwnProperty("allowMonthly") && (M = !!a.allowMonthly);
            var T, x, P, N = !(!a || !M && v),
                C = (function(e) {
                    return e === u.ScheduleId.MONTHLY ? r.defineMessage({
                        defaultMessage: "{price} per month"
                    }) : r.defineMessage({
                        defaultMessage: "{price} per year"
                    })
                })(h),
                w = b.getTotalPrice().toString(),
                k = s.default("order-summary", t);
            return v || (T = this.renderAnnualDiscount(g)), N && (x = this.renderPromoDiscount(g, b, d, E)), y && S && (m.Experiment(p).variantIn("V7", "V9") || m.Experiment(p).variantIs("V13") && c && m.Experiment(c.subgrowthBizTpcrBillingDueToday).variantIs("V1")) && (P = n.default.createElement("tr", {
                className: "order-summary__due-today"
            }, n.default.createElement("td", {
                className: "line-item"
            }, o.intl.formatMessage({
                defaultMessage: "Due today"
            })), n.default.createElement("td", {
                className: "price"
            }, new i.Cash(0, b.getTotalPrice().currency).toString()))), n.default.createElement("div", {
                className: k
            }, this.props.header || n.default.createElement("h1", {
                className: "type--help-title"
            }, o.intl.formatMessage({
                defaultMessage: "Order summary"
            })), n.default.createElement("table", null, this.props.tableHeader || n.default.createElement("thead", null, n.default.createElement("tr", null, n.default.createElement("th", {
                className: "type--help-copy"
            }, o.intl.formatMessage({
                defaultMessage: "Item"
            })), n.default.createElement("th", {
                className: "type--help-copy"
            }, o.intl.formatMessage({
                defaultMessage: "Price"
            })))), n.default.createElement("tbody", {
                className: "type--copy-mini"
            }, this.renderLicenses(b, d, C, E), T, x, this.renderTaxes(b), _ && n.default.createElement("tr", {
                className: "order-summary__total"
            }, n.default.createElement("td", {
                className: "line-item"
            }, o.intl.formatMessage({
                defaultMessage: "Total"
            })), n.default.createElement("td", {
                className: "price"
            }, o.intl.formatMessage(C, {
                price: w
            }))), P), this.props.tableFooter))
        }, t.defaultProps = {
            showDueToday: !0,
            showTotal: !0
        }, t
    })(n.default.Component);
    t.OrderSummary = p
})), define("modules/clean/react/payments/checkout/components/multistep/account_info_panel", ["require", "exports", "tslib", "react", "classnames", "modules/clean/react/payments/checkout/components/account_info/account_info_section"], (function(e, t, a, r, n, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var o = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.validFormData = function(e, t, a, r) {
            return !!(t || "" !== e.firstName.rawValue && "" !== e.lastName.rawValue && "" !== e.email.rawValue && "" !== e.password.rawValue) && (!!r || "" !== e.teamName.rawValue && "" !== e.teamPhone.rawValue && "" !== e.companySize.rawValue)
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.actions,
                a = e.currentUrl,
                o = e.discountInfo,
                i = e.experiments,
                l = e.existingAccountShowing,
                u = e.formData,
                c = e.isTrial,
                m = e.locale,
                d = e.passwordStrengthPostTTI,
                p = e.userInfo,
                f = e.visible,
                g = n.default({
                    "account-info-section": !0,
                    grid__item: !0,
                    hidden: !1 === f
                });
            return r.default.createElement("div", {
                className: g
            }, r.default.createElement(s.AccountInfoSection, {
                actions: t,
                currentUrl: a,
                discountInfo: o,
                existingAccountShowing: l,
                experiments: i,
                formData: u,
                isTrial: c,
                locale: m,
                sectionIndex: 1,
                userInfo: p,
                passwordStrengthPostTTI: d
            }))
        }, t
    })(r.default.Component);
    t.AccountInfoPanel = o
})), define("modules/clean/react/payments/checkout/components/multistep/multistep_indicator", ["require", "exports", "tslib", "react", "modules/core/i18n"], (function(e, t, a, r, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.render = function() {
            var e = "multistep-indicator step-" + this.props.index,
                t = n.intl.formatMessage({
                    defaultMessage: "Step {index} of 3"
                }, {
                    index: this.props.index
                });
            return r.default.createElement("div", {
                className: e
            }, t)
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.MultistepIndicator = s
})), define("modules/clean/react/payments/checkout/components/multistep/payment_method_panel", ["require", "exports", "tslib", "react", "classnames", "modules/core/i18n", "modules/clean/react/payments/checkout/components/form_section", "modules/clean/payments/payment_form/payment_form_spec", "modules/clean/react/payments/checkout/components/payment_method_form/business_payment_method_form", "modules/clean/react/payments/checkout/components/payment_method_form/payment_method_lock", "modules/clean/payments/skus/constants", "modules/clean/react/payments/checkout/components/terms_and_service", "modules/clean/react/tooltip", "modules/clean/react/payments/checkout/components/california_legal_terms"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d, p) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var f = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.prepareForSubmission = function() {
            return this.paymentMethodForm.prepareForSubmission()
        }, t.validFormData = function(e, t) {
            if (e.paymentMethod.formattedValue === i.PaymentMethod.DirectDeposit && ("" === e.accountHolderName.rawValue || "" === e.iban.rawValue || !e.mandateSigned.rawValue)) return !1;
            var a = e.countryCode.formattedValue;
            return (!t.allow_zip_code_for_country(a) || "" !== e.zipCode.rawValue) && e.termsAndService.rawValue
        }, t.prototype.renderCurrencyBanner = function(e, t, a, n) {
            if (n) {
                var o = void 0;
                if (e.schedule.formattedValue === c.ScheduleId.MONTHLY ? o = s.intl.formatMessage({
                        defaultMessage: "Your local currency has changed. Your selected plan is {monthly_per_user} / user / month ({monthly_price} charged monthly). You’ll only be charged if you don’t cancel your trial before it ends on {trial_end_date}."
                    }, {
                        trial_end_date: a,
                        monthly_per_user: t.getMonthlyPerUserPrice().toString(),
                        monthly_price: t.getMonthlyPrice().toString()
                    }) : e.schedule.formattedValue === c.ScheduleId.YEARLY && (o = s.intl.formatMessage({
                        defaultMessage: "Your local currency has changed. Your selected plan is {monthly_per_user} / user / month ({annual_price} charged yearly). You’ll only be charged if you don’t cancel your trial before it ends on {trial_end_date}."
                    }, {
                        trial_end_date: a,
                        monthly_per_user: t.getYearlyPerUserPrice().toString(),
                        annual_price: t.getYearlyPrice().toString()
                    })), o) return r.default.createElement("div", {
                    className: "currency-banner"
                }, o)
            }
        }, t.prototype.renderTaxBanner = function(e, t, a, n, o) {
            var i = t.getMonthlyPrice(!1),
                l = t.getMonthlyPrice(!0),
                u = 0 !== i.subtract(l).amount;
            if (n && !o && u) {
                var m = void 0;
                return e.schedule.formattedValue === c.ScheduleId.MONTHLY ? m = s.intl.formatMessage({
                    defaultMessage: "Your billing location requires additional taxes. Your selected plan is {monthly_per_user} / user / month ({monthly_price} charged monthly). You’ll only be charged if you don’t cancel your trial before it ends on {trial_end_date}."
                }, {
                    trial_end_date: a,
                    monthly_per_user: t.getMonthlyPerUserPrice().toString(),
                    monthly_price: t.getMonthlyPrice().toString()
                }) : e.schedule.formattedValue === c.ScheduleId.YEARLY && (m = s.intl.formatMessage({
                    defaultMessage: "Your billing location requires additional taxes. Your selected plan is {monthly_per_user} / user / month ({annual_price} charged yearly). You’ll only be charged if you don’t cancel your trial before it ends on {trial_end_date}."
                }, {
                    trial_end_date: a,
                    monthly_per_user: t.getYearlyPerUserPrice().toString(),
                    annual_price: t.getYearlyPrice().toString()
                })), r.default.createElement("div", {
                    className: "tax-banner"
                }, m)
            }
        }, t.prototype.render = function() {
            var e, t, a = this,
                i = this.props,
                c = i.actions,
                f = i.countryList,
                g = i.experiments,
                h = i.formData,
                y = i.iframeUrl,
                _ = i.paymentSpec,
                b = i.pricingData,
                S = i.trialEndDate,
                v = i.visible,
                E = h.zipCode.rawValue,
                M = n.default({
                    "payment-info-section": !0,
                    grid__item: !0,
                    hidden: !1 === v
                });
            v && (e = this.renderCurrencyBanner(h, b, S, this.props.hasCurrencyChanged), t = this.renderTaxBanner(h, b, S, this.props.hasTaxChangedWithinCountry, this.props.hasCurrencyChanged));
            var T = r.default.createElement("span", null, s.intl.formatMessage({
                defaultMessage: "You won’t be charged now."
            }));
            return r.default.createElement("div", {
                className: M
            }, r.default.createElement("div", {
                className: "payment-lock"
            }, r.default.createElement(u.PaymentMethodLock, {
                spriteName: "lock_blue",
                tooltipPosition: d.TooltipPosition.TOP
            })), r.default.createElement(o.FormSection, {
                title: s.intl.formatMessage({
                    defaultMessage: "3. Confirm your trial"
                }),
                sideHeader: T
            }, r.default.createElement(l.BusinessPaymentMethodForm, {
                actions: c,
                countryList: f,
                formData: h,
                iframeUrl: y,
                isTeam: !0,
                paymentIsDown: this.props.paymentIsDown,
                paymentSpec: _,
                ref: function(e) {
                    a.paymentMethodForm = e
                },
                showCpf: g.showCpf,
                showCpfName: g.showCpfName,
                psd2AddressFields: g.psd2AddressFields,
                submitForm: this.props.submitForm
            }), r.default.createElement(p.CaliforniaLegalTerms, {
                zipCode: E
            }), r.default.createElement(m.TermsAndService, {
                actions: c,
                experiments: g,
                formData: h,
                isTrial: !0
            }), t, e))
        }, t
    })(r.default.Component);
    t.PaymentMethodPanel = f
})), define("modules/clean/react/payments/checkout/components/multistep/team_plan_panel", ["require", "exports", "tslib", "react", "modules/core/i18n", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/react/payments/checkout/components/form_section", "modules/clean/react/payments/checkout/components/team_plan_section"], (function(e, t, a, r, n, s, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.validFormData = function(e, t) {
            return s.FormValueHelper.isValid(e.numberOfUsers) && s.FormValueHelper.isValid(e.schedule)
        }, t.prototype.render = function() {
            var e = this.props,
                t = e.formData,
                a = e.actions,
                s = e.experiments,
                l = r.default.createElement("span", null, n.intl.formatMessage({
                    defaultMessage: "You won’t be charged now."
                }));
            return r.default.createElement(o.FormSection, {
                title: n.intl.formatMessage({
                    defaultMessage: "2. Choose your plan"
                }),
                className: "team-plan-section",
                sideHeader: l
            }, r.default.createElement(i.TeamPlanSection, {
                actions: a,
                advancedDisplayName: this.props.advancedDisplayName,
                experiments: s,
                formData: t,
                isTrial: !0,
                isVatCountry: this.props.isVatCountry,
                pricingData: this.props.pricingData,
                standardDisplayName: this.props.standardDisplayName,
                skipPricing: this.props.skipPricing
            }))
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.TeamPlanPanel = l
})), define("modules/clean/react/payments/checkout/components/payment_method_form/payment_method_lock", ["require", "exports", "tslib", "react", "modules/core/i18n", "modules/clean/react/sprite_div", "modules/clean/react/tooltip"], (function(e, t, a, r, n, s, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), s = a.__importDefault(s);
    var i = (o = a.__importStar(o)).Tooltip,
        l = o.TooltipPosition,
        u = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return a.__extends(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.spriteName,
                    a = e.tooltipPosition;
                return t || (t = "lock"), void 0 === a && (a = l.RIGHT), r.default.createElement(i, {
                    position: a,
                    tooltip_contents: n.intl.formatMessage({
                        defaultMessage: "Payments are secured using SSL and client-side encryption."
                    })
                }, r.default.createElement(s.default, {
                    group: "web",
                    name: t
                }))
            }, t
        })(r.default.Component);
    t.PaymentMethodLock = u
})), define("modules/clean/react/payments/checkout/components/skus/sku_selection_section", ["require", "exports", "tslib", "react", "classnames", "modules/core/exception", "modules/clean/react/sprite_div", "modules/core/i18n", "modules/clean/payments/skus/sku_content", "modules/clean/react/payments/checkout/components/skus/sku_box", "modules/clean/stormcrow/experiment", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/react/image", "modules/clean/react/payments/checkout/components/inputs/radio_input", "modules/clean/payments/skus/constants", "modules/clean/payments/skus/pricing_data", "modules/clean/react/payments/business/actions/business_actions", "modules/clean/static_urls", "modules/clean/react/async/loadable", "modules/clean/web_timing_logger"], (function(e, t, a, r, n, s, o, i, l, u, c, m, d, p, f, g, h, y, _, b) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n), s = a.__importStar(s), o = a.__importDefault(o);
    var S = _.Loadable({
            loader: function() {
                return b.waitForTTI().then((function() {
                    return new Promise((function(t, a) {
                        e(["modules/clean/react/payments/checkout/components/skus/faq_columns"], t, a)
                    })).then(a.__importStar).then((function(e) {
                        return e.FAQColumns
                    }))
                }))
            }
        }),
        v = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return a.__extends(t, e), t.prototype.render = function() {
                var e = this.props,
                    t = e.type,
                    a = e.callout,
                    s = e.children;
                return r.default.createElement("div", {
                    className: "sku__flex-wrapper"
                }, r.default.createElement("div", {
                    className: n.default("sku__tab-callout", "sku__tab-callout--" + t)
                }, r.default.createElement("p", {
                    className: "sku__tab-callout-text"
                }, a || i.intl.formatMessage({
                    defaultMessage: "Your current plan"
                }))), r.default.createElement("div", {
                    className: "sku__inner-box"
                }, s))
            }, t
        })(r.default.PureComponent),
        E = (function(e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.onScheduleChange = function(e) {
                    var a = parseInt(e.value, 10);
                    t.props.actions.updateSchedule(a)
                }, t.onSkuSelect = function(e) {
                    return function() {
                        var a, r = t.props,
                            n = r.formStep,
                            s = r.actions;
                        s.updateProductPlanType(e), a = e === f.ProductPlanType.NEW_STANDARD ? h.UpdateFormStepOrigins.SelectStandardButton : h.UpdateFormStepOrigins.SelectAdvancedButton, s.updateFormStep(n + 1, a)
                    }
                }, t.getConfirmButtonText = function() {
                    var e;
                    return t.props.isTrial ? (void 0 === t.props.trialLength && s.reportException({
                        err: new Error("trialLength prop not provided when expected for trials"),
                        severity: s.SEVERITY.CRITICAL
                    }), e = i.intl.formatMessage({
                        defaultMessage: "{count, plural, one{Try free for {count} day} other{Try free for {count} days}}"
                    }, {
                        count: t.props.trialLength
                    })) : e = i.intl.formatMessage({
                        defaultMessage: "Select"
                    }), e
                }, t.getSkuBoxClass = function(e) {
                    var a = t.props,
                        r = a.currentPlan,
                        s = a.ncctVariant,
                        o = c.Experiment(s).variantIn("V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13"),
                        i = "advanced" === e && t.shouldShowAdvancedBestValue && !o || "standard" === e && r === f.ProductPlanType.NEW_STANDARD && o || "advanced" === e && r === f.ProductPlanType.ADVANCED && o,
                        l = !i && (t.shouldShowAdvancedBestValue || o);
                    return n.default({
                        "grid__item--medium--7-24": !0,
                        "sku__box--has-callout-tab": i,
                        "sku__box--sibling-has-callout-tab": l
                    }, "sku__box", "grid__item", "grid__item--stack")
                }, t
            }
            return a.__extends(t, e), Object.defineProperty(t.prototype, "shouldShowAdvancedBestValue", {
                get: function() {
                    return !0 !== this.props.isBusinessDomain
                },
                enumerable: !0,
                configurable: !0
            }), t.validProductPlanType = function(e) {
                var t = e.productPlanType;
                return m.FormValueHelper.isValid(t)
            }, t.prototype.renderPlanDescription = function(e) {
                var t = this.props,
                    a = t.advancedPlanInfo,
                    n = t.standardPlanInfo,
                    s = l.SkuContentClient.deserialize(n.skuContent),
                    o = l.SkuContentClient.deserialize(a.skuContent),
                    u = function(e) {
                        return e.hasUnlimitedSpace() ? i.intl.formatMessage({
                            defaultMessage: "As much space as your team needs"
                        }) : i.intl.formatMessage({
                            defaultMessage: "{space} of space for secure storage"
                        }, {
                            space: e.spaceShortFormTb()
                        })
                    },
                    c = u(s),
                    m = u(o);
                return {
                    standard: r.default.createElement("ul", {
                        className: "sku__description"
                    }, r.default.createElement("li", {
                        className: "sku__highlight"
                    }, r.default.createElement("div", {
                        className: "sku__highlight--icon"
                    }, r.default.createElement(d.Image, {
                        alt: c,
                        src: y.static_url("/static/images/growth/experiments/storage_1x-vfl5rbt7y.png"),
                        srcHiRes: y.static_url("/static/images/growth/experiments/storage_2x-vflmnOXj_.png")
                    })), c), r.default.createElement("li", {
                        className: "sku__highlight"
                    }, r.default.createElement("div", {
                        className: "sku__highlight--icon"
                    }, r.default.createElement(d.Image, {
                        alt: i.intl.formatMessage({
                            defaultMessage: "Easy-to-use sharing and collaboration tools"
                        }),
                        src: y.static_url("/static/images/growth/experiments/tools_1x-vfl6FHzkk.png"),
                        srcHiRes: y.static_url("/static/images/growth/experiments/tools_2x-vflCVMyyR.png")
                    })), i.intl.formatMessage({
                        defaultMessage: "Easy-to-use sharing and collaboration tools"
                    }))),
                    advanced: r.default.createElement("ul", {
                        className: "sku__description"
                    }, r.default.createElement("li", {
                        className: "sku__highlight"
                    }, r.default.createElement("div", {
                        className: "sku__highlight--icon"
                    }, r.default.createElement(d.Image, {
                        alt: m,
                        src: y.static_url("/static/images/growth/experiments/needs_1x-vflylj0T-.png"),
                        srcHiRes: y.static_url("/static/images/growth/experiments/needs_2x-vflKGT6sv.png")
                    })), m), r.default.createElement("li", {
                        className: "sku__highlight"
                    }, r.default.createElement("div", {
                        className: "sku__highlight--icon"
                    }, r.default.createElement(d.Image, {
                        alt: i.intl.formatMessage({
                            defaultMessage: "Sophisticated control and security features"
                        }),
                        src: y.static_url("/static/images/growth/experiments/features_1x-vflrHrAWR.png"),
                        srcHiRes: y.static_url("/static/images/growth/experiments/features_2x-vflEbWW-j.png")
                    })), i.intl.formatMessage({
                        defaultMessage: "Sophisticated control and security features"
                    }))),
                    enterprise: r.default.createElement("ul", {
                        className: "sku__description"
                    }, r.default.createElement("li", {
                        className: "sku__highlight"
                    }, r.default.createElement("div", {
                        className: "sku__highlight--icon"
                    }, r.default.createElement(d.Image, {
                        alt: i.intl.formatMessage({
                            defaultMessage: "Customizable solutions"
                        }),
                        src: y.static_url("/static/images/growth/experiments/solutions_1x-vflRvECNM.png"),
                        srcHiRes: y.static_url("/static/images/growth/experiments/solutions_2x-vflsnn3Wv.png")
                    })), i.intl.formatMessage({
                        defaultMessage: "Customizable solutions"
                    })), r.default.createElement("li", {
                        className: "sku__highlight"
                    }, r.default.createElement("div", {
                        className: "sku__highlight--icon"
                    }, r.default.createElement(d.Image, {
                        alt: i.intl.formatMessage({
                            defaultMessage: "Individualized support to help admins manage at scale"
                        }),
                        src: y.static_url("/static/images/growth/experiments/scale_1x-vfld5IKoP.png"),
                        srcHiRes: y.static_url("/static/images/growth/experiments/scale_2x-vflft3lHD.png")
                    })), i.intl.formatMessage({
                        defaultMessage: "Individualized support to help admins manage at scale"
                    })))
                }[e]
            }, t.prototype.renderBaseFeatureList = function(e, t) {
                var a = e.map((function(e, t) {
                        return r.default.createElement("li", {
                            key: "try-feature-" + t
                        }, r.default.createElement(o.default, {
                            group: "business",
                            name: "check-blue"
                        }), r.default.createElement("span", null, e))
                    })),
                    n = t ? r.default.createElement("li", null, r.default.createElement(o.default, {
                        group: "business",
                        name: "check-blue"
                    }), r.default.createElement("span", null, r.default.createElement("strong", null, t))) : null;
                return r.default.createElement("div", {
                    className: "section"
                }, r.default.createElement("ul", {
                    className: "feature-list type--copy-small help__feature-list"
                }, n, a))
            }, t.prototype.renderStandardFeatureList = function(e) {
                var t = l.SkuContentClient.deserialize(e),
                    a = i.intl.formatMessage({
                        defaultMessage: "{vacuumming_policy_max_days} days of file recovery"
                    }, {
                        vacuumming_policy_max_days: t.vacuumingPolicyMaxDays()
                    }),
                    r = i.intl.formatMessage({
                        defaultMessage: "{standard_rewind_policy_max_days}-day account recovery with Dropbox Rewind"
                    }, {
                        standard_rewind_policy_max_days: t.vacuumingPolicyMaxDays()
                    }),
                    n = [a, i.intl.formatMessage({
                        defaultMessage: "Single admin login to manage multiple teams"
                    }), i.intl.formatMessage({
                        defaultMessage: "Admin console and audit log"
                    }), i.intl.formatMessage({
                        defaultMessage: "256-bit AES and SSL/TLS encryption"
                    }), i.intl.formatMessage({
                        defaultMessage: "Granular sharing permissions"
                    }), i.intl.formatMessage({
                        defaultMessage: "User and company-managed groups"
                    }), i.intl.formatMessage({
                        defaultMessage: "Remote device wipe"
                    }), i.intl.formatMessage({
                        defaultMessage: "Two-factor authentication (2FA)",
                        description: "use indicative verb form"
                    }), i.intl.formatMessage({
                        defaultMessage: "Send files up to 2 GB with Dropbox Transfer"
                    }), r, i.intl.formatMessage({
                        defaultMessage: "File locking"
                    }), i.intl.formatMessage({
                        defaultMessage: "Smart Sync"
                    }), i.intl.formatMessage({
                        defaultMessage: "Document watermarking"
                    }), i.intl.formatMessage({
                        defaultMessage: "Dropbox Paper admin tools"
                    }), i.intl.formatMessage({
                        defaultMessage: "Office 365 integration"
                    }), i.intl.formatMessage({
                        defaultMessage: "Unlimited API access to security and productivity platform partners"
                    }), i.intl.formatMessage({
                        defaultMessage: "1 million API calls/month for data transport partners"
                    }), i.intl.formatMessage({
                        defaultMessage: "Priority chat, email and business hours phone support"
                    })];
                return this.renderBaseFeatureList(n)
            }, t.prototype.renderAdvancedFeatureList = function(e, t) {
                var a = i.intl.formatMessage({
                        defaultMessage: "Everything in {name}"
                    }, {
                        name: e.name
                    }),
                    r = [i.intl.formatMessage({
                        defaultMessage: "Advanced admin controls"
                    }), i.intl.formatMessage({
                        defaultMessage: "Tiered admin roles"
                    }), i.intl.formatMessage({
                        defaultMessage: "Send files up to 100 GB with Dropbox Transfer, including additional customization options"
                    }), i.intl.formatMessage({
                        defaultMessage: "Advanced user management tools"
                    }), i.intl.formatMessage({
                        defaultMessage: "Single sign on (SSO) integration"
                    }), i.intl.formatMessage({
                        defaultMessage: "Invite enforcement"
                    }), i.intl.formatMessage({
                        defaultMessage: "Domain verification"
                    }), i.intl.formatMessage({
                        defaultMessage: "Device approvals"
                    }), i.intl.formatMessage({
                        defaultMessage: "File event tracking"
                    })];
                return this.renderBaseFeatureList(r, a)
            }, t.prototype.renderEnterpriseFeatureList = function(e) {
                var t = i.intl.formatMessage({
                        defaultMessage: "Everything in {advanced_name}"
                    }, {
                        advanced_name: e
                    }),
                    a = i.intl.formatMessage({
                        defaultMessage: "24/7 phone support (in English)"
                    });
                "en" !== this.props.locale && "en_GB" !== this.props.locale || (a = i.intl.formatMessage({
                    defaultMessage: "24/7 phone support"
                }));
                var r = [i.intl.formatMessage({
                    defaultMessage: "Centralized admin console to view and manage all your Business teams at once"
                }), i.intl.formatMessage({
                    defaultMessage: "Account Capture"
                }), i.intl.formatMessage({
                    defaultMessage: "Network control"
                }), i.intl.formatMessage({
                    defaultMessage: "Enterprise mobility management (EMM)"
                }), i.intl.formatMessage({
                    defaultMessage: "Domain Insights"
                }), i.intl.formatMessage({
                    defaultMessage: "Advanced training for end users and admins"
                }), a];
                return this.renderBaseFeatureList(r, t)
            }, t.prototype.renderPerUserText = function(e) {
                return i.intl.formatMessage({
                    defaultMessage: "{count, plural, one{/ user / month, starting with {count} user} other{/ user / month, starting with {count} users}}"
                }, {
                    count: e
                })
            }, t.prototype.render = function() {
                var e, t, a, s, o = this.props,
                    l = o.discountInfo,
                    m = o.formData,
                    d = o.ncctVariant,
                    h = o.subChangePlans,
                    y = o.visible,
                    _ = o.standardPlanInfo,
                    b = o.advancedPlanInfo,
                    E = o.currentPlan,
                    M = m.schedule.formattedValue,
                    T = l && l.discountPercentage;
                h && h.plans.length > 0 ? (e = new g.PricingDataOrion(h, f.ProductPlanType.NEW_STANDARD, T), t = new g.PricingDataOrion(h, f.ProductPlanType.ADVANCED, T)) : (e = new g.PricingDataFromPlan(_, T), t = new g.PricingDataFromPlan(b, T)), M === f.ScheduleId.YEARLY ? (a = e.getYearlyPerUserPrice(!0), s = t.getYearlyPerUserPrice(!0)) : (a = e.getMonthlyPerUserPrice(!0), s = t.getMonthlyPerUserPrice(!0));
                var x = n.default({
                        hidden: !y,
                        grid__container: !0,
                        "grid--x-center": !0
                    }),
                    P = n.default({
                        "sku__feature-list": !0,
                        grid__item: !0,
                        "grid__item--medium--7-24": !0,
                        "grid--x-left": !0
                    }),
                    N = r.default.createElement("a", {
                        rel: "noopener",
                        href: "/business/contact",
                        className: "confirm-button checkout-button checkout-button--secondary",
                        target: "_blank",
                        "data-uxa-log": "biz-sku-selection-enterprise"
                    }, r.default.createElement("span", {
                        className: "confirm-text type--semib"
                    }, i.intl.formatMessage({
                        defaultMessage: "Contact us",
                        description: "used in a button describing how to find out more about enterprise on the plan selection page"
                    }))),
                    C = r.default.createElement("div", {
                        className: "plan-info-current-container"
                    }, r.default.createElement("div", {
                        className: "plan-info-current"
                    }, i.intl.formatMessage({
                        defaultMessage: "– Your current plan –"
                    }))),
                    w = void 0,
                    k = void 0,
                    D = c.Experiment(d).variantIn("V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13");
                D || (E === f.ProductPlanType.NEW_STANDARD ? w = C : E === f.ProductPlanType.ADVANCED && (k = C));
                var V = r.default.createElement(u.SkuBox, {
                        type: _.skuContent.name,
                        priceData: e,
                        title: a.toString(),
                        subDescription: this.renderPerUserText(_.minLicenseCount),
                        description: this.renderPlanDescription("standard"),
                        buttonText: this.getConfirmButtonText(),
                        onClick: this.onSkuSelect(f.ProductPlanType.NEW_STANDARD),
                        subText: w,
                        uxa_element_id: "biz-sku-selection-standard"
                    }),
                    I = r.default.createElement(u.SkuBox, {
                        isPrimary: !0,
                        priceData: t,
                        type: b.skuContent.name,
                        title: s.toString(),
                        subDescription: this.renderPerUserText(b.minLicenseCount),
                        description: this.renderPlanDescription("advanced"),
                        buttonText: this.getConfirmButtonText(),
                        onClick: this.onSkuSelect(f.ProductPlanType.ADVANCED),
                        subText: k,
                        uxa_element_id: "biz-sku-selection-advanced"
                    }),
                    A = r.default.createElement(u.SkuBox, {
                        confirmButton: N,
                        type: i.intl.formatMessage({
                            defaultMessage: "Enterprise"
                        }),
                        title: i.intl.formatMessage({
                            defaultMessage: "Contact us",
                            description: "used in a header describing how to find out more about enterprise on the plan selection page"
                        }),
                        description: this.renderPlanDescription("enterprise"),
                        buttonText: this.getConfirmButtonText(),
                        onClick: this.onSkuSelect(f.ProductPlanType.ADVANCED)
                    });
                return D ? E === f.ProductPlanType.NEW_STANDARD ? V = r.default.createElement(v, {
                    type: "standard"
                }, V) : E === f.ProductPlanType.ADVANCED && (I = r.default.createElement(v, {
                    type: "advanced"
                }, I)) : this.shouldShowAdvancedBestValue && (I = r.default.createElement(v, {
                    callout: i.intl.formatMessage({
                        defaultMessage: "Best value"
                    }),
                    type: "advanced"
                }, I)), r.default.createElement("div", {
                    className: x
                }, r.default.createElement("div", {
                    className: "sku__schedule-container grid__item grid--x-center grid__container--p-small"
                }, r.default.createElement("label", {
                    className: "pricing-option yearly grid__item grid__item--shrink grid--vcjc"
                }, r.default.createElement(p.RadioInput, {
                    name: "sku_schedule_id",
                    id: "sku-annual-radio",
                    value: f.ScheduleId.YEARLY.toString(),
                    checked: M === f.ScheduleId.YEARLY,
                    onChange: this.onScheduleChange
                }), r.default.createElement("div", {
                    className: "annually-label type--copy--small"
                }, i.intl.formatMessage({
                    defaultMessage: "Billed yearly"
                }))), r.default.createElement("label", {
                    className: "pricing-option monthly grid__item grid__item--shrink grid--vcjc"
                }, r.default.createElement(p.RadioInput, {
                    name: "sku_schedule_id",
                    id: "sku-monthly-radio",
                    value: f.ScheduleId.MONTHLY.toString(),
                    checked: M === f.ScheduleId.MONTHLY,
                    onChange: this.onScheduleChange
                }), r.default.createElement("div", {
                    className: "monthly-label type--copy--small"
                }, i.intl.formatMessage({
                    defaultMessage: "Billed monthly"
                })))), r.default.createElement("div", {
                    className: "sku__plan-container grid__item grid--x-center"
                }, r.default.createElement("div", {
                    className: this.getSkuBoxClass("standard"),
                    "data-sku": "standard"
                }, V), r.default.createElement("div", {
                    className: P
                }, this.renderStandardFeatureList(_.skuContent)), r.default.createElement("div", {
                    className: this.getSkuBoxClass("advanced"),
                    "data-sku": "advanced"
                }, I), r.default.createElement("div", {
                    className: P
                }, this.renderAdvancedFeatureList(_.skuContent, b.skuContent)), r.default.createElement("div", {
                    className: this.getSkuBoxClass("enterprise"),
                    "data-sku": "enterprise"
                }, A), r.default.createElement("div", {
                    className: P,
                    key: "enterprise-feature-list"
                }, this.renderEnterpriseFeatureList(b.skuContent.name))), r.default.createElement(S, {
                    experiments: this.props.experiments,
                    planMinLicenses: _.minLicenseCount,
                    ncctVariant: this.props.ncctVariant,
                    trialIsActive: this.props.trialIsActive,
                    trialEndDate: this.props.trialEndDate,
                    standardSkuContent: _.skuContent,
                    advancedSkuContent: b.skuContent
                }))
            }, t
        })(r.default.Component);
    t.SkuSelectionSection = E
})), define("modules/clean/react/payments/checkout/components/team_plan_section", ["require", "exports", "tslib", "react", "classnames", "modules/core/i18n", "modules/clean/react/payments/checkout/components/number_of_users", "modules/clean/react/payments/checkout/components/schedule_field", "modules/clean/react/payments/checkout/components/schedule_dropdown", "modules/clean/payments/skus/constants", "modules/clean/stormcrow/experiment"], (function(e, t, a, r, n, s, o, i, l, u, c) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), r = a.__importDefault(r), n = a.__importDefault(n);
    var m = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), t.prototype.render = function() {
            var e, t, a = this.props.experiments,
                m = n.default({
                    "team-options-container": !0,
                    "grid__item grid--x-bookend": !0
                }),
                d = r.default.createElement(o.NumberOfUsers, {
                    actions: this.props.actions,
                    experiments: a,
                    formData: this.props.formData,
                    isTrial: this.props.isTrial
                }),
                p = r.default.createElement(o.UserLimitError, {
                    experiments: a,
                    formData: this.props.formData,
                    isTrial: this.props.isTrial,
                    ncctVariant: this.props.ncctVariant,
                    teamNumUsers: this.props.teamNumUsers,
                    trialIsActive: this.props.trialIsActive
                });
            return e = c.Experiment(a.subgrowthBizNoCcTrials).isActive ? r.default.createElement(l.ScheduleDropdown, {
                actions: this.props.actions,
                formData: this.props.formData
            }) : r.default.createElement(i.ScheduleField, {
                actions: this.props.actions,
                callout: this.props.scheduleCallout,
                experiments: a,
                formData: this.props.formData,
                isTrial: this.props.isTrial,
                isVatCountry: this.props.isVatCountry,
                pricingData: this.props.pricingData,
                skipPricing: this.props.skipPricing
            }), this.props.formData.schedule.formattedValue === u.ScheduleId.YEARLY && this.props.pricingData.getPromoDiscount() && !this.props.skipPricing && (t = this.props.pricingState && this.props.pricingState.loadingPrices ? r.default.createElement("span", {
                className: "discount-detailed-explanation"
            }, s.intl.formatMessage({
                defaultMessage: "Loading... Your {discount_promo, number, ::percent .##} discount."
            }, {
                discount_promo: this.props.pricingData.getPromoDiscount() / 100
            })) : 100 === this.props.pricingData.getPromoDiscount() ? r.default.createElement("span", {
                className: "discount-detailed-explanation"
            }, s.intl.formatMessage({
                defaultMessage: "You are saving {discount_promo, number, ::percent .##} in total on your yearly subscription."
            }, {
                discount_promo: this.props.pricingData.getPromoDiscount() / 100
            })) : r.default.createElement("span", {
                className: "discount-detailed-explanation"
            }, s.intl.formatMessage({
                defaultMessage: "You are saving {discount_total, number, ::percent .##} in total on your yearly subscription. This includes a {discount_yearly, number, ::percent .##} standard savings for choosing yearly, then a special {discount_promo, number, ::percent .##} discount."
            }, {
                discount_total: this.props.pricingData.getTotalYearlyDiscountWithPromoInPercent() / 100,
                discount_promo: this.props.pricingData.getPromoDiscount() / 100,
                discount_yearly: this.props.pricingData.getYearlySavingsWithoutPromoPercentage() / 100
            }))), r.default.createElement("div", {
                className: "grid__item"
            }, r.default.createElement("div", {
                className: m
            }, d, e), p, t)
        }, t
    })(r.default.Component);
    t.TeamPlanSection = m
})), define("modules/clean/react/payments/checkout/components/terms_and_service", ["require", "exports", "tslib", "react", "modules/clean/react/payments/checkout/components/inputs/labeled_checkbox_input", "modules/clean/react/payments/buy/components/inputs/inputs", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/stormcrow/experiment", "modules/constants/trademark", "modules/core/i18n"], (function(e, t, a, r, n, s, o, i, l, u) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return a.__extends(t, e), Object.defineProperty(t.prototype, "ncctExp", {
            get: function() {
                return i.Experiment(this.props.experiments.subgrowthBizNoCcTrials)
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.onTermsAndServiceChange = function(e) {
            this.props.actions.updateTermsAndService(e.checked)
        }, t.prototype.onTermsAndServiceChangeArbor = function(e) {
            var t = this.props.formData.termsAndService.rawValue;
            this.props.actions.updateTermsAndService(!t)
        }, t.prototype.termsAndServiceErrorString = function() {
            var e = this.props.formData.termsAndService;
            return !o.FormValueHelper.isValid(e) && e.showError ? u.intl.formatMessage({
                defaultMessage: "Please agree to the terms of service."
            }) : ""
        }, t.prototype.render = function() {
            var e = this.props.formData,
                t = u.intl.formatMessage({
                    defaultMessage: "I agree to the <link_agreement>{trademark_business} Agreement</link_agreement> and <link_terms>Terms</link_terms>."
                }, {
                    link_agreement: function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return r.default.createElement("a", {
                            key: "tos-link-agreement",
                            href: "/business_agreement",
                            target: "_blank",
                            rel: "noopener noreferrer"
                        }, e)
                    },
                    link_terms: function() {
                        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                        return r.default.createElement("a", {
                            key: "tos-link-terms",
                            href: "/terms",
                            target: "_blank",
                            rel: "noopener noreferrer"
                        }, e)
                    },
                    trademark_business: l.TRADEMARK_BUSINESS
                }),
                a = r.default.createElement("span", {
                    className: "type--copy-small",
                    onClick: this.onTermsAndServiceChangeArbor.bind(this)
                }, t);
            return this.ncctExp.variantIn("V6", "V7", "V8", "V9", "V10", "V11", "V12", "V13") ? r.default.createElement(s.LabeledCheckboxInput, {
                checked: e.termsAndService.rawValue,
                containerClassName: "billing-terms-and-service grid__item grid--y-middle",
                errorText: this.termsAndServiceErrorString(),
                labelText: a,
                name: "tos_agree",
                onClick: this.onTermsAndServiceChangeArbor.bind(this)
            }) : r.default.createElement(n.LabeledCheckboxInput, {
                checked: e.termsAndService.rawValue,
                className: "billing-terms-and-service grid__item grid--y-middle",
                errorHTML: e.termsAndService.serverError,
                errorText: this.termsAndServiceErrorString(),
                labelText: r.default.createElement("span", null, t),
                name: "tos_agree",
                onChange: this.onTermsAndServiceChange.bind(this)
            })
        }, t
    })((r = a.__importDefault(r)).default.Component);
    t.TermsAndService = c
})), define("modules/clean/react/payments/common/middleware/web_teams_logger", ["require", "exports", "tslib", "modules/clean/analytics", "modules/clean/react/payments/common/form_value_helpers", "modules/clean/payments/skus/constants", "modules/clean/react/payments/business/actions/business_actions"], (function(e, t, a, r, n, s, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = (r = a.__importStar(r)).TeamsWebActionsLogger;
    t.webTeamsLogger = function(e) {
        var t, a, r = (new Date).getTime(),
            l = ["UpdateFirstName", "UpdateLastName", "UpdateEmail", "UpdatePassword", "UpdateTeamName", "UpdateTeamPhone", "UpdateCompanySize", "UpdateZipCode", "UpdateVat", "UpdateAccountHolderName", "UpdateIBAN", "UpdateMandateSigned", "UpdateNonce"];
        return function(u) {
            return function(c) {
                return function(m) {
                    try {
                        var d = u.getState(),
                            p = c(m),
                            f = m.type,
                            g = u.getState(),
                            h = g.pageState,
                            y = g.formData,
                            _ = void 0;
                        if (-1 !== l.indexOf(f) && t === f) return p;
                        "UpdateTransitionsStart" === f || "UpdateRenewTransitionsStart" === f ? a = (new Date).getTime() : "UpdateTransitionsSuccess" !== f && "UpdateTransitionsError" !== f && "UpdateRenewTransitionsSuccess" !== f && "UpdateRenewTransitionsError" !== f || (_ = (((new Date).getTime() - a) / 1e3).toFixed(1));
                        var b = {
                            type: f,
                            flow: h.isPreSelect ? "PreSelect" : "PlanSelect"
                        };
                        if (void 0 !== _ && (b.roundtrip = _), y.productPlanType.rawValue === s.ProductPlanType.NEW_STANDARD ? b.sku = "standard" : y.productPlanType.rawValue === s.ProductPlanType.ADVANCED && (b.sku = "advanced"), "UpdateFormStep" === f) {
                            var S = m;
                            b.curStep = d.pageState.formStep, b.nextStep = S.step, void 0 !== S.origin && (b.origin = o.UpdateFormStepOrigins[S.origin], S.origin === o.UpdateFormStepOrigins.PreSelectedSku && (b.curStep = 0))
                        }
                        if ("UpdateCountryCode" === f && (b.NewCountryCode = y.countryCode.rawValue, b.PreviousCountryCode = d.formData.countryCode.rawValue), "ShowFormFieldErrors" === f) {
                            b.step = h.formStep;
                            var v = m,
                                E = v.fieldNames;
                            b.errorFields = E.filter((function(e) {
                                if (y.hasOwnProperty(e)) {
                                    var t = y[e];
                                    return t && !n.FormValueHelper.isValid(t)
                                }
                                return !1
                            })).join(","), b.origin = v.origin
                        }
                        var M = !1,
                            T = !0;
                        if ("BlurEmail" === f && (n.FormValueHelper.isValid(y.email) ? (b.email = y.email.rawValue, M = !0) : T = !1), "SubmitFormSuccess" === f && (i.log("ncct_submission_congrats"), T = !0, b.numberOfUsers = y.numberOfUsers.formattedValue, b.schedule = 1 === y.schedule.formattedValue ? "monthly" : "yearly", b.paymentmethod = 1 === y.paymentMethod.rawValue ? "creditcard" : "paypal", b.country = y.countryCode.formattedValue, b.roundtrip = (((new Date).getTime() - r) / 1e3).toFixed(1)), "ToggleExistingAccount" === f) {
                            var x = "";
                            x = h.existingAccountShowing ? "showExisting" : "showNew", b.showType = x
                        }
                        if ("UpdatePaymentMethod" === f && (b.paymentmethod = 1 === y.paymentMethod.rawValue ? "creditcard" : "paypal", b.country = y.countryCode.formattedValue), "UpdateNumberOfUsers" === f) {
                            var P = parseInt(m.value, 10);
                            isNaN(P) ? (b.notANumber = !0, b.isUnderLimit = !1, b.isUnderLicenseLimit = !1, b.isOverLimit = !1) : (b.notANumber = !1, b.isUnderLimit = P < h.minNumUsers, b.isUnderLicenseLimit = P < y.numberOfUsers.minLicenseLimit, b.isOverLimit = P > h.maxNumUsers)
                        }
                        return "SubmitFormStart" === f && (b.numberOfUsers = y.numberOfUsers.formattedValue, b.schedule = 1 === y.schedule.formattedValue ? "monthly" : "yearly", b.paymentmethod = 1 === y.paymentMethod.rawValue ? "creditcard" : "paypal", b.country = y.countryCode.formattedValue, b.roundtrip = (((new Date).getTime() - r) / 1e3).toFixed(1)), T && i.log(h.isTrial ? "react_checkout_try_action" : "react_checkout_buy_action", b, void 0, void 0, M), t = f, p
                    } catch (t) {
                        throw i.log(e ? "react_checkout_try_crash" : "react_checkout_buy_crash", {
                            action: m.type,
                            error: t.stack || t.toString()
                        }), t
                    }
                }
            }
        }
    }
}));
//# sourceMappingURL=pkg-legacy-af.min.js-vflDmq8jC.map