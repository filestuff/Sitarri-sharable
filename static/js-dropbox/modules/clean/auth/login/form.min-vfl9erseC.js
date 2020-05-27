define(["require", "exports", "tslib", "classnames", "react", "modules/core/browser", "modules/core/exception", "modules/core/html", "modules/core/notify", "modules/core/uri", "modules/clean/auth/common/types", "modules/clean/auth/login/2fa/authenticator_form", "modules/clean/auth/login/2fa/email_form", "modules/clean/marketing_tracker", "modules/clean/auth/login/2fa/phone_form", "modules/clean/auth/login/2fa/seckey_form", "modules/clean/auth/login/api", "modules/clean/auth/login/credentials_form", "modules/clean/auth/login/sso_utils", "modules/clean/auth/login/types", "modules/clean/react/css", "modules/core/i18n", "modules/clean/profile_services/profile_services_constants", "modules/clean/profile_services/profile_services_link", "modules/clean/auth/authenticator", "modules/clean/security/passwords", "modules/clean/auth/common/stats", "modules/clean/react/fedramp/fedramp_util"], (function(e, t, r, o, s, a, i, n, l, c, p, u, m, g, d, h, _, f, S, y, w, E, T, F, b, C, A, L) {
    "use strict";
    var R;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), o = r.__importDefault(o), s = r.__importDefault(s), a = r.__importStar(a), _ = r.__importStar(_), T = r.__importDefault(T), b = r.__importStar(b), (function(e) {
        e[e.CREDENTIALS_OR_SSO = 0] = "CREDENTIALS_OR_SSO", e[e.EMAIL_2FA = 1] = "EMAIL_2FA", e[e.PHONE_2FA = 2] = "PHONE_2FA", e[e.AUTHENTICATOR_2FA = 3] = "AUTHENTICATOR_2FA", e[e.SECKEY_2FA = 4] = "SECKEY_2FA"
    })(R || (R = {})), t.TestOnlyLoginStep = R;
    var v = (function(e) {
        function t(t) {
            var o = e.call(this, t) || this;
            o.testOnlyGetSsoChecker = function() {
                return o.ssoChecker
            }, o.setCredentialsFormComponent = function(e) {
                o.credentialsFormComponent = e
            }, o.testOnlyGetCredentialsFormComponent = function() {
                return o.credentialsFormComponent
            }, o.onInputChange = function(e) {
                var t = e.currentTarget,
                    s = {},
                    a = r.__assign({}, o.state.localErrors),
                    i = !1;
                switch (t.name) {
                    case "login_email":
                        s.email = t.value, a.email = void 0, i = !0;
                        break;
                    case "login_password":
                        s.password = t.value, a.password = void 0;
                        break;
                    case "remember_me":
                        s.rememberMe = t.checked;
                        break;
                    case "trusted":
                        s.trusted = t.checked;
                        break;
                    case "code":
                        s.twoFactorCode = t.value, a.twoFactor = void 0
                }
                s.localErrors = a, o.setState(s, (function() {
                    i && o.ssoChecker.checkSsoState(s.email, o.onSsoStateUpdate)
                }))
            }, o.onSsoStateUpdate = function(e, t) {
                e === o.state.email && o.setState({
                    ssoState: t
                })
            }, o.onSsoChangeClick = function() {
                i.assert(o.state.ssoState === y.SsoState.OPTIONAL, "User can change SSO state only when it is optional", {
                    tags: ["react-login-form"]
                }), o.setState({
                    ssoState: y.SsoState.OFF
                })
            }, o.generateThirdPartyAuthUrl = function(e, t) {
                var r = {
                    fname: e.profile.given_name,
                    lname: e.profile.family_name,
                    email: e.profile.email,
                    picture_url: e.profile.picture_url,
                    refresh_token: e.refresh_token,
                    email_sig: e.email_sig,
                    automatic_redirect: t.toString(),
                    cont: o.props.continuationUrl || "/"
                };
                return o.props.googleLoginProps && o.props.googleLoginProps.signupTag && (r.signup_tag = o.props.googleLoginProps.signupTag), o.props.googleLoginProps && o.props.googleLoginProps.signupEndpoint && (r.signup_endpoint = o.props.googleLoginProps.signupEndpoint), String(new c.URI({
                    path: "/third_party_signup"
                }).updateQuery(r))
            }, o.handleGoogleCallback = function(e) {
                A.GoogleUXAnalyticsLogger.logLoginResponse(e);
                var t = L.getFedrampRedirectUrlIfApplicable(e.is_fedramp_user || !1, o.props.continuationUrl || "/");
                if (e.success) o.handleLoginFormEvent(y.LoginFormEvent.GOOGLE_LOGIN_SUCCESS), _.logProfileServicesSuccess(), !1 !== o.props.canRedirect ? (l.Notify.success(E.intl.formatMessage({
                    defaultMessage: "Log in successful! Your browser will be redirected in a few seconds."
                })), a.redirect(t)) : e.is_fedramp_user ? (t = L.getFedrampRedirectUrlIfApplicable(!0, o.props.continuationUrl || a.get_href()), a.redirect(t)) : o.props.onLoginSuccess && o.props.onLoginSuccess({
                    display_name: e.display_name,
                    id: e.user_id,
                    email: e.profile.email
                });
                else if (_.logProfileServicesFailure(), "emails_do_not_match_redirect" === e.err_msg) {
                    var i = o.props.googleLoginProps,
                        u = i && i.customErrorHandlers;
                    if (u && u.emailsDoNotMatchRedirect) u.emailsDoNotMatchRedirect(e);
                    else {
                        var m = o.generateThirdPartyAuthUrl(e, !0);
                        a.redirect(m)
                    }
                } else if ("emails_do_not_match" === e.err_msg)
                    if ("pairing" !== o.props.type && o.props.variant === p.AuthFormVariant.STANDARD) {
                        var g = o.generateThirdPartyAuthUrl(e, !1),
                            d = E.intl.formatMessage({
                                defaultMessage: "Oops! We couldn’t find a Dropbox account matching that email. <a>Click here to create one.</a>"
                            }, {
                                a: function() {
                                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                    return s.default.createElement("a", {
                                        className: "third-party-signup-link",
                                        href: g
                                    }, e)
                                }
                            });
                        o.setState({
                            localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                                googleLogin: d
                            })
                        })
                    } else e.localized_error ? l.Notify.error(e.localized_error) : l.Notify.error(E.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }));
                else if ("tos_required" === e.err_msg) {
                    m = new c.URI({
                        path: "/account/complete_registration_page"
                    }).updateQuery({
                        finish_web_auth: "true",
                        remember_me: e.remember_me.toString(),
                        cont: o.props.continuationUrl || "/"
                    });
                    a.redirect(m.toString())
                } else if ("tfa_required" === e.err_msg) {
                    m = new c.URI({
                        path: "/verify_code"
                    }).updateQuery({
                        cont: t,
                        remember_me: e.remember_me.toString(),
                        pair_user: e.pair_user.toString()
                    });
                    a.redirect(m.toString())
                } else if ("enable_twofactor_required" === e.err_msg) {
                    m = new c.URI({
                        path: "/twofactor"
                    }).updateQuery({
                        cont: t,
                        remember_me: e.remember_me.toString(),
                        pair_user: e.pair_user.toString()
                    });
                    a.redirect(m.toString())
                } else if ("not_verified" === e.err_msg) {
                    m = new c.URI({
                        path: "/show_password_form"
                    }).updateQuery({
                        cont: t,
                        remember_me: e.remember_me.toString(),
                        pair_user: e.pair_user.toString()
                    });
                    a.redirect(m.toString())
                } else if ("email_not_verified" === e.err_msg) {
                    var h = E.intl.formatMessage({
                        defaultMessage: "Before you can sign in, you’ll need to verify your account with Google {email}"
                    }, {
                        email: e.profile.email
                    });
                    l.Notify.error(new n.HTML("<span>" + h + "</span>"), 30)
                } else e.localized_error ? l.Notify.error(e.localized_error) : l.Notify.error(E.intl.formatMessage({
                    defaultMessage: "There was a problem completing this request."
                })), "google_login_not_allowed" !== e.err_msg && "sso_required" !== e.err_msg || (o.setState({
                    email: e.profile.email
                }), o.ssoChecker.checkSsoState(e.profile.email, o.onSsoStateUpdate))
            }, o.onGoogleLoginClick = function() {
                o.handleLoginFormEvent(y.LoginFormEvent.GOOGLE_LOGIN_CLICK), o.setState({
                    localErrors: {}
                }), A.GoogleUXAnalyticsLogger.logLoginStart();
                var e = !!o.props.googleLoginProps && !1 !== o.props.googleLoginProps.popup;
                (new F.ProfileServicesLinkingHandler).auth_service_login_web(T.default.GOOGLE, o.handleGoogleCallback, "login_form", e, o.state.rememberMe, o.props.continuationUrl || "/", "pairing" === o.props.type)
            }, o.handleAppleCallback = function(e) {
                A.AppleUXAnalyticsLogger.logLoginResponse(e);
                var t = L.getFedrampRedirectUrlIfApplicable(e.is_fedramp_user || !1, o.props.continuationUrl || "/");
                if (e.success) o.handleLoginFormEvent(y.LoginFormEvent.APPLE_LOGIN_SUCCESS), l.Notify.success(E.intl.formatMessage({
                    defaultMessage: "Sign in successful! Your browser will be redirected in a few seconds."
                })), _.logProfileServicesSuccess(), !1 === o.props.canRedirect && e.is_fedramp_user && (t = L.getFedrampRedirectUrlIfApplicable(!0, o.props.continuationUrl || a.get_href())), a.redirect(t);
                else if (_.logProfileServicesFailure(), "no_email_in_response" === e.err_msg) {
                    var r = E.intl.formatMessage({
                        defaultMessage: "Sign in failed. If you’d like to sign in with Apple again, <a>see how in our help center</a>. You could also sign in with your Dropbox account email and password."
                    }, {
                        a: function(e) {
                            return '<a href="/help/accounts-billing/settings-sign-in/apple-sign-in-error">' + e + "</a>"
                        }
                    });
                    l.Notify.error(new n.HTML("<span>" + r + "</span>"), 30)
                } else if ("tfa_required" === e.err_msg) {
                    var s = new c.URI({
                        path: "/verify_code"
                    }).updateQuery({
                        cont: t,
                        remember_me: e.remember_me.toString(),
                        pair_user: e.pair_user.toString()
                    });
                    a.redirect(s.toString())
                } else if ("enable_twofactor_required" === e.err_msg) {
                    s = new c.URI({
                        path: "/twofactor"
                    }).updateQuery({
                        cont: t,
                        remember_me: e.remember_me.toString(),
                        pair_user: e.pair_user.toString()
                    });
                    a.redirect(s.toString())
                } else if ("requires_password_on_first_link" === e.err_msg) {
                    s = new c.URI({
                        path: "/show_password_form"
                    }).updateQuery({
                        cont: t,
                        remember_me: e.remember_me.toString(),
                        pair_user: e.pair_user.toString()
                    });
                    a.redirect(s.toString())
                } else if ("emails_do_not_match" === e.err_msg) {
                    r = E.intl.formatMessage({
                        defaultMessage: "We couldn’t find a Dropbox account matching the email {email}. <a1>Sign up for a new account</a1> or <a2>get help signing in</a2> to an existing account."
                    }, {
                        a1: function(e) {
                            return '<a href="/individual/plans-comparison?_tk=sia_nomatch_plan_web">' + e + "</a1>"
                        },
                        a2: function(e) {
                            return '<a href="/help/accounts-billing/settings-sign-in/sign-in-with-apple?_tk=sia_nomatch_help_web">' + e + "</a2>"
                        },
                        email: e.profile.email
                    });
                    l.Notify.error(new n.HTML("<span>" + r + "</span>"), 30)
                } else e.localized_error ? l.Notify.error(e.localized_error) : l.Notify.error(E.intl.formatMessage({
                    defaultMessage: "There was a problem completing this request."
                })), "apple_login_not_allowed" === e.err_msg && (o.setState({
                    email: e.profile.email
                }), o.ssoChecker.checkSsoState(e.profile.email, o.onSsoStateUpdate))
            }, o.onAppleLoginClick = function() {
                o.handleLoginFormEvent(y.LoginFormEvent.APPLE_LOGIN_CLICK), o.setState({
                    localErrors: {}
                }), A.AppleUXAnalyticsLogger.logLoginStart();
                var e = !!o.props.appleLoginProps && !1 !== o.props.appleLoginProps.popup;
                (new F.ProfileServicesLinkingHandler).auth_service_login_web(T.default.APPLE, o.handleAppleCallback, "login_form", e, o.state.rememberMe, o.props.continuationUrl || "/", "pairing" === o.props.type)
            }, o.credentialsFormData = function() {
                var e = r.__assign(r.__assign({
                    login_email: o.state.email,
                    cont: o.props.continuationUrl,
                    remember_me: o.state.rememberMe
                }, o.credentialsFormComponent.getRecaptchaResponses()), o.props.additionalData);
                return void 0 === o.props.encryptionOptions ? (e.login_password = o.state.password, i.reportException({
                    err: new Error("Deprecated plaintext password used on React login form"),
                    severity: "non-critical",
                    tags: ["react-login-form"]
                }), Promise.resolve(e)) : C.wrapPassword(o.state.password, o.props.encryptionOptions).then((function(t) {
                    return e.encrypted_password = t, Promise.resolve(e)
                }))
            }, o.handleLoginSuccess = function(e) {
                if (o.handleLoginFormEvent(y.LoginFormEvent.LOGIN_IMMEDIATE_SUCCESS, {
                        userInfo: e
                    }), !1 !== o.props.canRedirect) {
                    var t = L.getFedrampRedirectUrlIfApplicable(e.is_fedramp_user || !1, o.props.continuationUrl || "/");
                    return a.redirect(t)
                }
                if (e.is_fedramp_user) {
                    t = L.getFedrampRedirectUrlIfApplicable(!0, o.props.continuationUrl || a.get_href());
                    return a.redirect(t)
                }
                return o.props.onLoginSuccess ? o.props.onLoginSuccess(e) : a.redirect("/")
            }, o.handleSuccessResponse = function(e) {
                switch (o.setState({
                    isSubmitting: !1
                }), A.EmailAuthUXAnalyticsLogger.logLoginResponse(e), e.status) {
                    case y.LoginResponseStatus.ERROR:
                        var t = e.html_response ? new n.HTML(e.message) : e.message;
                        return l.Notify.error(t);
                    case y.LoginResponseStatus.EXPIRED:
                        return a.redirect(e.cont);
                    case y.LoginResponseStatus.OK:
                        var s = {
                            id: e.id,
                            email: e.email,
                            display_name: e.display_name,
                            locale: e.locale,
                            is_fedramp_user: e.is_fedramp_user
                        };
                        o.handleLoginSuccess(s);
                        break;
                    case y.LoginResponseStatus.PASSWORD_EXPIRED:
                        return o.setState({
                            localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                                email: {
                                    message_text: E.intl.formatMessage({
                                        defaultMessage: "The password of the account associated with this email has expired. Please login to this account and update its password before pairing."
                                    })
                                }
                            })
                        });
                    case y.LoginResponseStatus.RATELIMIT:
                        return o.setState({
                            localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                                email: {
                                    message_text: E.intl.formatMessage({
                                        defaultMessage: "You’ve tried to log in too many times. Please try again in a few minutes."
                                    })
                                }
                            })
                        });
                    case y.LoginResponseStatus.TWOFACTOR_REQUIRED:
                    case y.LoginResponseStatus.TOS_SIGNATURE_REQUIRED:
                        return a.redirect(e.cont);
                    case y.LoginResponseStatus.TWOFACTOR:
                        e.use_email_2fa ? o.setState({
                            primaryTwoFactorType: y.TwoFactorType.EMAIL,
                            currentStep: R.EMAIL_2FA
                        }) : e.u2f_challenge && b.canUseAuthenticator(o.generateU2fRequest(e.u2f_challenge)) ? (o.setState({
                            primaryTwoFactorType: y.TwoFactorType.SEC_KEY,
                            currentStep: R.SECKEY_2FA
                        }), e.last_two_digits ? o.setState({
                            lastTwoDigits: e.last_two_digits,
                            secondaryTwoFactorType: y.TwoFactorType.SMS
                        }) : o.setState({
                            secondaryTwoFactorType: y.TwoFactorType.AUTHENTICATOR
                        }), o.kickOffU2f(e.u2f_challenge)) : e.last_two_digits ? o.setState({
                            primaryTwoFactorType: y.TwoFactorType.SMS,
                            lastTwoDigits: e.last_two_digits,
                            secondaryTwoFactorType: void 0,
                            currentStep: R.PHONE_2FA
                        }) : o.setState({
                            primaryTwoFactorType: y.TwoFactorType.AUTHENTICATOR,
                            lastTwoDigits: void 0,
                            secondaryTwoFactorType: void 0,
                            currentStep: R.AUTHENTICATOR_2FA
                        });
                        break;
                    case y.LoginResponseStatus.SSO:
                        return a.unsafeRedirect(e.sso_url);
                    case y.LoginResponseStatus.PASSWORD_DECRYPTION_ERROR:
                        return a.redirect(e.cont)
                }
            }, o.handleServerErrors = function(e) {
                if (!o.credentialsFormComponent.handleRecaptchaErrors(e)) {
                    A.EmailAuthUXAnalyticsLogger.logLoginError();
                    var t = {};
                    e.login_email ? t.email = e.login_email : t.email = void 0, e.login_password ? t.password = e.login_password : t.password = void 0, e["failed-login-invalid-email-password"] ? t.login = E.intl.formatMessage({
                        defaultMessage: "Oops! It looks like you may have forgotten your password. <a>Click here to reset it.</a>"
                    }, {
                        a: function() {
                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                            return s.default.createElement("a", {
                                href: "/forgot"
                            }, e)
                        }
                    }) : t.login = void 0, o.setState({
                        localErrors: t
                    }), o.setState({
                        isSubmitting: !1
                    })
                }
            }, o.onCredentialsFormSubmit = function() {
                A.EmailAuthUXAnalyticsLogger.logLoginStart(), o.setState({
                    isSubmitting: !0
                }), o.credentialsFormData().then((function(e) {
                    var t = _.submitCredentialsForm(o.props.type, e);
                    t.catch(o.handleServerErrors), t.then(o.handleSuccessResponse)
                })).catch((function(e) {
                    i.reportException({
                        err: e,
                        severity: "critical",
                        tags: ["react-login-form"]
                    }), o.setState({
                        isSubmitting: !1
                    }), l.Notify.error(E.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                }))
            }, o.onLoginClick = function(e) {
                e.preventDefault(), o.handleLoginFormEvent(y.LoginFormEvent.LOGIN_CLICK), o.credentialsFormComponent.submitRecaptcha()
            }, o.handleResendCodeSuccess = function(e) {
                var t;
                switch (e) {
                    case y.TwoFactorResendResponse.OK:
                        return l.Notify.success(E.intl.formatMessage({
                            defaultMessage: "We sent you a code. It may take a few minutes to arrive."
                        }));
                    case y.TwoFactorResendResponse.RATELIMIT:
                        t = E.intl.formatMessage({
                            defaultMessage: "You’ve tried to log in too many times. Please try again in a few minutes."
                        });
                        break;
                    case y.TwoFactorResendResponse.UNREACHABLE:
                        t = E.intl.formatMessage({
                            defaultMessage: "We couldn’t reach your phone number. Are you sure it’s correct?"
                        });
                        break;
                    case y.TwoFactorResendResponse.EXPIRED:
                        t = E.intl.formatMessage({
                            defaultMessage: "Sorry, your phone code has expired. Please log in again."
                        });
                        break;
                    case y.TwoFactorResendResponse.BADCARRIER:
                        t = E.intl.formatMessage({
                            defaultMessage: "Unfortunately, your carrier isn’t supported at this time."
                        });
                        break;
                    case y.TwoFactorResendResponse.INVALIDNUMBER:
                        t = E.intl.formatMessage({
                            defaultMessage: "That isn’t a valid phone number."
                        });
                        break;
                    case y.TwoFactorResendResponse.NOTAMOBILE:
                        t = E.intl.formatMessage({
                            defaultMessage: "That phone number doesn’t appear to be a valid mobile number."
                        });
                        break;
                    default:
                        return l.Notify.error(E.intl.formatMessage({
                            defaultMessage: "There was a problem completing this request."
                        }))
                }
                o.setState({
                    localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                        twoFactor: {
                            message_text: t
                        }
                    })
                })
            }, o.resendCode = function() {
                var e = _.resendTwoFactorCode(o.props.additionalData && o.props.additionalData.is_backup || !1, o.props.additionalData && o.props.additionalData.mobile_push || !1);
                e.then(o.handleResendCodeSuccess), e.catch((function() {
                    l.Notify.error(E.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                }))
            }, o.handleTwoFactorSuccess = function(e) {
                switch (e.status) {
                    case y.LoginResponseStatus.OK:
                        o.state.currentStep === R.SECKEY_2FA && o.setState({
                            securityKeyState: y.SecurityKeyState.FOUND
                        });
                        var t = {
                            id: e.id,
                            email: e.email,
                            display_name: e.display_name,
                            locale: e.locale,
                            is_fedramp_user: e.is_fedramp_user
                        };
                        o.handleLoginSuccess(t);
                        break;
                    case y.LoginResponseStatus.ERROR:
                        l.Notify.error(e.message);
                        break;
                    case y.LoginResponseStatus.REQUIRES_ROLE:
                    case y.LoginResponseStatus.EXPIRED:
                        o.setState({
                            localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                                email: {
                                    message_text: e.message
                                }
                            }),
                            currentStep: R.CREDENTIALS_OR_SSO
                        });
                        break;
                    case y.LoginResponseStatus.INVALID_CREDENTIALS:
                        o.setState({
                            localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                                password: {
                                    message_text: e.message
                                }
                            }),
                            currentStep: R.CREDENTIALS_OR_SSO
                        });
                        break;
                    default:
                        l.Notify.error(E.intl.formatMessage({
                            defaultMessage: "There was a problem completing this request."
                        }))
                }
            }, o.twoFactorFormData = function() {
                return r.__assign({
                    remember_me: o.state.rememberMe,
                    cont: o.props.continuationUrl,
                    code: o.state.twoFactorCode,
                    trusted: o.state.trusted
                }, o.props.additionalData)
            }, o.submitTwoFactor = function() {
                o.setState({
                    isSubmitting: !0
                });
                var e = _.submitTwoFactorForm(o.props.type, o.twoFactorFormData());
                e.then(o.handleTwoFactorSuccess), e.catch((function(e) {
                    o.state.currentStep === R.SECKEY_2FA && e.u2f ? o.setState({
                        localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                            securityKey: e.u2f.message_text
                        }),
                        securityKeyState: y.SecurityKeyState.NOT_FOUND
                    }) : e.code ? o.setState({
                        localErrors: r.__assign(r.__assign({}, o.state.localErrors), {
                            twoFactor: e.code
                        })
                    }) : l.Notify.error(E.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                })), e.finally((function() {
                    o.setState({
                        isSubmitting: !1
                    })
                }))
            }, o.onPhone2FASubmit = function(e) {
                e.preventDefault(), o.submitTwoFactor()
            }, o.onAuthenticator2FASubmit = function(e) {
                e.preventDefault(), o.submitTwoFactor()
            }, o.generateU2fRequest = function(e) {
                for (var t = JSON.parse(e), r = {}, o = 0, s = Object.keys(b.PROTOCOLS); o < s.length; o++) {
                    var a = s[o];
                    r[a] = t[a] && JSON.parse(t[a])
                }
                return r
            }, o.kickOffU2f = function(e) {
                return r.__awaiter(o, void 0, void 0, (function() {
                    var t, o, s, a = this;
                    return r.__generator(this, (function(r) {
                        switch (r.label) {
                            case 0:
                                if (t = this.generateU2fRequest(e), !b.canUseAuthenticator(t)) return [3, 5];
                                r.label = 1;
                            case 1:
                                return r.trys.push([1, 3, , 4]), [4, b.sign(t)];
                            case 2:
                                return o = r.sent(), this.state.currentStep === R.SECKEY_2FA && this.setState({
                                    twoFactorCode: JSON.stringify(o)
                                }, (function() {
                                    return a.submitTwoFactor()
                                })), [3, 4];
                            case 3:
                                return s = r.sent(), this.state.currentStep === R.SECKEY_2FA && this.setState({
                                    securityKeyState: y.SecurityKeyState.NOT_FOUND
                                }), i.assert(!1, "U2F Error - " + s, {
                                    tags: ["react-login-form", "u2f"]
                                }), [3, 4];
                            case 4:
                                return [3, 5];
                            case 5:
                                return [2]
                        }
                    }))
                }))
            }, o.switch2FA = function() {
                var e;
                i.assert(o.state.primaryTwoFactorType === y.TwoFactorType.SEC_KEY, "Unexpected two factor choice switch", {
                    tags: ["react-login-form"]
                }), o.state.secondaryTwoFactorType === y.TwoFactorType.SMS ? (e = R.PHONE_2FA, o.resendCode()) : e = R.AUTHENTICATOR_2FA, o.setState({
                    twoFactorCode: "",
                    primaryTwoFactorType: o.state.secondaryTwoFactorType,
                    secondaryTwoFactorType: void 0,
                    currentStep: e
                })
            }, o.onRetryU2f = function() {
                o.setState({
                    securityKeyState: y.SecurityKeyState.LOADING
                });
                var e = _.retryU2fAuthentication();
                e.then(o.kickOffU2f), e.catch((function() {
                    o.setState({
                        securityKeyState: y.SecurityKeyState.NOT_FOUND
                    }), l.Notify.error(E.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                }))
            }, i.assert(!1 !== t.canRedirect || !!t.onLoginSuccess, "Need an on login success handler if we cannot redirect the user", {
                tags: ["react-login-form"]
            }), o.ssoChecker = new S.SsoStateChecker;
            var u = R.CREDENTIALS_OR_SSO,
                m = void 0,
                g = void 0,
                d = void 0;
            return t.twoFactorOnlyProps && (!t.twoFactorOnlyProps.u2fChallenge || t.additionalData && t.additionalData.is_backup || !b.canUseAuthenticator(o.generateU2fRequest(t.twoFactorOnlyProps.u2fChallenge)) ? t.twoFactorOnlyProps.lastTwoDigits ? (u = R.PHONE_2FA, m = y.TwoFactorType.SMS, d = t.twoFactorOnlyProps.lastTwoDigits) : (u = R.AUTHENTICATOR_2FA, m = y.TwoFactorType.AUTHENTICATOR) : (u = R.SECKEY_2FA, m = y.TwoFactorType.SEC_KEY, t.twoFactorOnlyProps.lastTwoDigits ? (g = y.TwoFactorType.SMS, d = t.twoFactorOnlyProps.lastTwoDigits) : g = y.TwoFactorType.AUTHENTICATOR)), o.state = {
                currentStep: u,
                email: t.emailProps && t.emailProps.initialValue || "",
                isSubmitting: !1,
                lastTwoDigits: d,
                localErrors: {},
                password: "",
                primaryTwoFactorType: m,
                secondaryTwoFactorType: g,
                rememberMe: t.rememberMeCheckboxProps && t.rememberMeCheckboxProps.checked || !1,
                securityKeyState: y.SecurityKeyState.LOADING,
                ssoState: y.SsoState.OFF,
                trusted: t.twoFactorTrustCheckboxProps && t.twoFactorTrustCheckboxProps.checked || !1,
                twoFactorCode: ""
            }, o
        }
        return r.__extends(t, e), t.prototype.trackSuccessfulLogin = function(e, t) {
            if (e === y.LoginFormEvent.LOGIN_IMMEDIATE_SUCCESS || e === y.LoginFormEvent.GOOGLE_LOGIN_SUCCESS || e === y.LoginFormEvent.APPLE_LOGIN_SUCCESS) {
                var r = g.getGAEventData(g.MARKETING_LOGIN_EVENT, g.MARKETING_LOGIN_EVENT);
                g.MarketingTracker.tryPushEvent(g.MARKETING_LOGIN_EVENT, g.EventTypeEnum.Link, r)
            }
        }, t.prototype.handleLoginFormEvent = function(e, t) {
            this.trackSuccessfulLogin(e, t), this.props.onLoginFormEvent && this.props.onLoginFormEvent(e, t)
        }, t.prototype.componentDidMount = function() {
            this.props.twoFactorOnlyProps && this.props.twoFactorOnlyProps.u2fChallenge && this.state.currentStep === R.SECKEY_2FA && this.kickOffU2f(this.props.twoFactorOnlyProps.u2fChallenge)
        }, t.prototype.render = function() {
            var e;
            switch (this.state.currentStep) {
                case R.CREDENTIALS_OR_SSO:
                    var t = !this.props.hideCredentialFields && !["multi", "pairing", "cli_link", "cli_link_nonce"].includes(this.props.type);
                    e = s.default.createElement(f.LoginCredentialsForm, {
                        ref: this.setCredentialsFormComponent,
                        disabled: this.props.disabled || !1,
                        emailError: this.state.localErrors.email,
                        emailProps: this.props.emailProps || {},
                        emailValue: this.state.email,
                        forgotPasswordProps: this.props.forgotPasswordProps || {},
                        googleLoginError: this.state.localErrors.googleLogin,
                        googleLoginProps: this.props.googleLoginProps,
                        appleLoginError: this.state.localErrors.appleLogin,
                        appleLoginProps: this.props.appleLoginProps,
                        hideCredentialFields: this.props.hideCredentialFields || !1,
                        hideHelp: this.props.hideHelp || !1,
                        hideRememberMe: this.props.hideRememberMe || !1,
                        isSubmitting: this.state.isSubmitting,
                        loginButtonProps: this.props.loginButtonProps || {},
                        loginError: this.state.localErrors.login,
                        maestroStyle: this.props.maestroStyle || !1,
                        onGoogleLoginClick: this.onGoogleLoginClick,
                        onAppleLoginClick: this.onAppleLoginClick,
                        onInputChange: this.onInputChange,
                        onLoginClick: this.onLoginClick,
                        openLinksInNewTab: !!this.props.openLinksInNewTab,
                        onSsoChangeClick: this.onSsoChangeClick,
                        onSubmit: this.onCredentialsFormSubmit,
                        passwordError: this.state.localErrors.password,
                        passwordProps: this.props.passwordProps || {},
                        passwordValue: this.state.password,
                        rememberMeProps: this.props.rememberMeCheckboxProps || {},
                        rememberMeValue: this.state.rememberMe,
                        showNaviSiteLogin: !!this.props.showNaviSiteLogin,
                        ssoState: this.state.ssoState,
                        supportsCaptcha: t,
                        variant: this.props.variant || p.AuthFormVariant.STANDARD
                    });
                    break;
                case R.PHONE_2FA:
                    e = s.default.createElement(d.Phone2FAForm, {
                        continuationUrl: this.props.continuationUrl,
                        error: this.state.localErrors.twoFactor,
                        hideHelp: this.props.hideHelp || !1,
                        hideTrustCheckbox: this.props.hideRememberMe || !1,
                        inlineSubmit: void 0 === this.props.twoFactorSubmitButtonInline || this.props.twoFactorSubmitButtonInline,
                        lastTwoDigits: this.state.lastTwoDigits || "",
                        maestroStyle: this.props.maestroStyle || !1,
                        onInputChange: this.onInputChange,
                        onResendCodeClick: this.resendCode,
                        onSubmit: this.onPhone2FASubmit,
                        rememberMe: this.state.rememberMe,
                        trusted: this.state.trusted,
                        trustTooltipPosition: this.props.twoFactorTrustCheckboxProps && this.props.twoFactorTrustCheckboxProps.tooltipPosition,
                        value: this.state.twoFactorCode,
                        variant: this.props.variant || p.AuthFormVariant.STANDARD
                    });
                    break;
                case R.EMAIL_2FA:
                    e = s.default.createElement(m.Email2FAForm, {
                        email: this.state.email,
                        error: this.state.localErrors.twoFactor,
                        inlineSubmit: void 0 === this.props.twoFactorSubmitButtonInline || this.props.twoFactorSubmitButtonInline,
                        maestroStyle: this.props.maestroStyle || !1,
                        onInputChange: this.onInputChange,
                        onSubmit: this.onPhone2FASubmit,
                        value: this.state.twoFactorCode,
                        variant: this.props.variant || p.AuthFormVariant.STANDARD,
                        onResendCodeClick: this.resendCode
                    });
                    break;
                case R.AUTHENTICATOR_2FA:
                    e = s.default.createElement(u.Authenticator2FAForm, {
                        continuationUrl: this.props.continuationUrl,
                        error: this.state.localErrors.twoFactor,
                        hideHelp: this.props.hideHelp || !1,
                        hideTrustCheckbox: this.props.hideRememberMe || !1,
                        inlineSubmit: void 0 === this.props.twoFactorSubmitButtonInline || this.props.twoFactorSubmitButtonInline,
                        maestroStyle: this.props.maestroStyle || !1,
                        onInputChange: this.onInputChange,
                        onSubmit: this.onAuthenticator2FASubmit,
                        rememberMe: this.state.rememberMe,
                        trusted: this.state.trusted,
                        trustTooltipPosition: this.props.twoFactorTrustCheckboxProps && this.props.twoFactorTrustCheckboxProps.tooltipPosition,
                        value: this.state.twoFactorCode,
                        variant: this.props.variant || p.AuthFormVariant.STANDARD
                    });
                    break;
                case R.SECKEY_2FA:
                    e = s.default.createElement(h.SecKey2FAForm, {
                        error: this.state.localErrors.securityKey,
                        hideTrustCheckbox: this.props.hideRememberMe || !1,
                        maestroStyle: this.props.maestroStyle || !1,
                        onChange2FA: this.switch2FA,
                        onInputChange: this.onInputChange,
                        onRetry: this.onRetryU2f,
                        trusted: this.state.trusted,
                        trustTooltipPosition: this.props.twoFactorTrustCheckboxProps && this.props.twoFactorTrustCheckboxProps.tooltipPosition,
                        secondaryTwoFactorType: this.state.secondaryTwoFactorType,
                        securityKeyState: this.state.securityKeyState,
                        variant: this.props.variant || p.AuthFormVariant.STANDARD
                    })
            }
            var r = o.default("login-form-container", this.props.variant, this.props.className);
            return s.default.createElement("div", {
                className: r
            }, s.default.createElement("div", {
                className: "regular-login-forms"
            }, e))
        }, t
    })(s.default.Component);
    t.TestOnlyLoginFormComponent = v, t.LoginForm = w.requireCssWithComponent(v, ["/static/css/components/exp_cards-vflUg3BfG.css", "/static/css/components/login_form-vflOHUpmF.css", "/static/css/legacy_packages/components-vflL6NIoo.css", "/static/css/login_or_register-vfl1d3hl2.css", "/static/css/scooter/scooter-scoped-vfljL5ijS.css", "/static/css/spectrum/index.web-vfl_-DzRS.css", "/static/css/recaptcha_challenge-vflrcf67y.css", "/static/css/recaptcha_v2_challenge-vfl5GXpO2.css"]), t.convertProtoEncryptionOptionsToProp = function(e) {
        if (e) return {
            key: e.key,
            version: Number(e.version),
            type: e.type,
            timestamp: e.timestamp,
            plaintextFallback: e.plaintextFallback
        }
    }
}));
//# sourceMappingURL=form.min.js-vfll6_RBD.map