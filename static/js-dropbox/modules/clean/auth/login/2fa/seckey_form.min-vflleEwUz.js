define(["require", "exports", "tslib", "react", "modules/core/i18n", "modules/clean/auth/login/2fa/trust_checkbox", "modules/clean/auth/login/types", "modules/clean/react/image", "modules/clean/react/sprite", "modules/clean/static_urls"], (function(e, t, a, s, r, l, c, n, i, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), s = a.__importDefault(s);
    var u = function() {
            return s.default.createElement(n.Image, {
                src: o.static_url("/static/images/security_keys/insert-vflkCfC4_.png"),
                srcHiRes: o.static_url("/static/images/security_keys/insert@2x-vflTxG2RJ.png"),
                className: "seckey-insert"
            })
        },
        m = function() {
            return s.default.createElement(n.Image, {
                src: o.static_url("/static/images/icons/ajax-loading-small-vfl3Wt7C_.gif"),
                srcHiRes: o.static_url("/static/images/icons/ajax-loading-small@2x-vflAxdZTP.gif"),
                className: "seckey-loading-status"
            })
        },
        f = function(e) {
            return s.default.createElement("div", {
                className: "two-factor-seckey-instructions"
            }, s.default.createElement("p", null, s.default.createElement("span", {
                style: {
                    fontWeight: "bold"
                }
            }, r.intl.formatMessage({
                defaultMessage: "Insert your security key to use it"
            })), " ", e.securityKeyState === c.SecurityKeyState.LOADING && s.default.createElement(m, null), e.securityKeyState === c.SecurityKeyState.FOUND && s.default.createElement(d, null)), r.intl.formatMessage({
                defaultMessage: "After inserting, tap your key if it has a button or gold disk."
            }))
        },
        d = function() {
            return s.default.createElement(i.Sprite, {
                group: "web",
                name: "bulletpoint-check",
                alt: "",
                className: "seckey-loading-status"
            })
        };
    t.SecKey2FAForm = function(e) {
        return s.default.createElement("form", {
            className: "two-factor-form clearfix 2fa-seckey-form"
        }, s.default.createElement("div", {
            className: "login-info two-factor-uses-u2f"
        }, s.default.createElement(u, null), e.securityKeyState !== c.SecurityKeyState.NOT_FOUND && s.default.createElement(f, {
            securityKeyState: e.securityKeyState
        }), s.default.createElement("div", {
            className: "text-input"
        }, s.default.createElement("div", {
            className: "text-input-error-wrapper"
        })), e.securityKeyState === c.SecurityKeyState.NOT_FOUND && s.default.createElement("div", {
            className: "two-factor-seckey-instructions"
        }, s.default.createElement("div", {
            style: {
                color: "red"
            }
        }, s.default.createElement("span", {
            className: "error-msg"
        }, e.error || r.intl.formatMessage({
            defaultMessage: "Key not found."
        }))), s.default.createElement("button", {
            className: "button-tertiary two-factor-seckey-retry",
            onClick: e.onRetry
        }, r.intl.formatMessage({
            defaultMessage: "Retry"
        }))), !e.hideTrustCheckbox && s.default.createElement(l.TwoFactorTrustCheckbox, {
            checked: e.trusted,
            maestroStyle: e.maestroStyle,
            onChange: e.onInputChange,
            tooltipPosition: e.trustTooltipPosition,
            variant: e.variant
        }), s.default.createElement("div", {
            className: "two-factor-use-phone-instead"
        }, s.default.createElement("a", {
            href: "#",
            onClick: e.onChange2FA
        }, e.secondaryTwoFactorType === c.TwoFactorType.SMS ? r.intl.formatMessage({
            defaultMessage: "Send SMS instead"
        }) : r.intl.formatMessage({
            defaultMessage: "Use mobile authenticator instead"
        })))))
    }
}));
//# sourceMappingURL=seckey_form.min.js-vflQ-g4CP.map