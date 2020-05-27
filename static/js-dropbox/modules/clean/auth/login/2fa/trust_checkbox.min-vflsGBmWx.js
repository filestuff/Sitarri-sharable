define(["require", "exports", "tslib", "react", "modules/core/browser_detection", "modules/core/i18n", "modules/clean/auth/common/inputs/checkbox", "modules/clean/react/sprite_div", "modules/clean/react/tooltip"], (function(e, t, o, a, s, r, i, l, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), a = o.__importDefault(a), s = o.__importStar(s), l = o.__importDefault(l), n = o.__importStar(n);
    var u = function() {
        return a.default.createElement("div", {
            className: "two-factor-trusted-info"
        }, s.is_mobile_or_tablet() ? r.intl.formatMessage({
            defaultMessage: "Trusted devices will never ask you for a security code again. You should only trust this device if you trust everyone who uses it."
        }) : r.intl.formatMessage({
            defaultMessage: "Trusted computers will never ask you for a security code again. You should only trust this computer if you trust everyone who uses it."
        }))
    };
    t.TestOnlyTrustTooltipContent = u;
    var c = function(e) {
        return a.default.createElement("div", {
            className: "tooltip-wrapper info-icon"
        }, a.default.createElement(n.Tooltip, {
            position: n.TooltipPosition[e.position || "TOP"],
            tooltip_classname: "twofactor-trust-tooltip",
            tooltip_contents: a.default.createElement(u, null)
        }, a.default.createElement(l.default, {
            group: "web",
            name: "info",
            alt: r.intl.formatMessage({
                defaultMessage: "More information"
            }),
            text: s.is_mobile_or_tablet() ? r.intl.formatMessage({
                defaultMessage: "Trust this device"
            }) : r.intl.formatMessage({
                defaultMessage: "Trust this computer"
            }),
            spritePosition: "right"
        })))
    };
    t.TwoFactorTrustCheckbox = function(e) {
        return a.default.createElement(i.AuthCheckbox, {
            className: "remember-me",
            name: "trusted",
            checked: e.checked,
            inline: !0,
            disabled: !1,
            maestroStyle: e.maestroStyle,
            onChange: e.onChange,
            variant: e.variant,
            label: a.default.createElement(c, {
                position: e.tooltipPosition
            })
        })
    }
}));
//# sourceMappingURL=trust_checkbox.min.js-vflLIyHXD.map