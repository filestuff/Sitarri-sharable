define(["require", "exports", "tslib", "classnames", "react", "modules/core/i18n", "modules/clean/auth/common/inputs/text", "modules/clean/auth/common/types", "modules/clean/auth/common/utils"], (function(e, a, t, l, s, r, n, m, o) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
        value: !0
    }), l = t.__importDefault(l), s = t.__importDefault(s), a.RegisterFormNameFields = function(e) {
        var a = e.fnameProps || {};
        if (e.combinedName) {
            var d = l.default("exp-input-combined-name", "clearfix", a.className);
            return s.default.createElement("div", {
                className: "register-form__name-fields"
            }, s.default.createElement(n.AuthTextField, {
                placeholder: a.placeholder || (e.maestroStyle ? r.intl.formatMessage({
                    defaultMessage: "Jane Doe"
                }) : r.intl.formatMessage({
                    defaultMessage: "Full name"
                })),
                name: "fname",
                value: e.fnameValue,
                onChange: e.onInputChange,
                disabled: e.disabled || a.readonly || !1,
                label: a.label || (e.maestroStyle ? r.intl.formatMessage({
                    defaultMessage: "Full name"
                }) : void 0),
                error: e.fnameError,
                maestroStyle: e.maestroStyle,
                className: d,
                variant: e.variant,
                type: m.AuthTextInputType.TEXT
            }))
        }
        var i = e.lnameProps || {},
            u = ["first", "text-input__margin-right"],
            f = ["second"],
            c = ["input-fname", a.className],
            p = ["input-lname", i.className];
        o.lastNameGoesFirst() ? (p = t.__spreadArrays(p, u), c = t.__spreadArrays(c, f)) : (c = t.__spreadArrays(c, u), p = t.__spreadArrays(p, f));
        var g = s.default.createElement(n.AuthTextField, {
                className: l.default(c),
                name: "fname",
                value: e.fnameValue,
                onChange: e.onInputChange,
                error: e.fnameError,
                maestroStyle: e.maestroStyle,
                disabled: e.disabled || a.readonly || !1,
                label: a.label || (e.maestroStyle ? r.intl.formatMessage({
                    defaultMessage: "First name"
                }) : void 0),
                placeholder: a.placeholder || (e.maestroStyle ? r.intl.formatMessage({
                    defaultMessage: "Jane"
                }) : r.intl.formatMessage({
                    defaultMessage: "First name"
                })),
                variant: e.variant,
                type: m.AuthTextInputType.TEXT
            }),
            y = s.default.createElement(n.AuthTextField, {
                className: l.default(p),
                name: "lname",
                value: e.lnameValue,
                onChange: e.onInputChange,
                error: e.lnameError,
                disabled: e.disabled || i.readonly || !1,
                label: i.label || (e.maestroStyle ? r.intl.formatMessage({
                    defaultMessage: "Last name"
                }) : void 0),
                placeholder: i.placeholder || (e.maestroStyle ? r.intl.formatMessage({
                    defaultMessage: "Doe"
                }) : r.intl.formatMessage({
                    defaultMessage: "Last name"
                })),
                maestroStyle: e.maestroStyle,
                variant: e.variant,
                type: m.AuthTextInputType.TEXT
            });
        return o.lastNameGoesFirst() ? s.default.createElement("div", {
            className: "register-form__name-fields"
        }, y, g) : s.default.createElement("div", {
            className: "register-form__name-fields"
        }, g, y)
    }
}));
//# sourceMappingURL=name_fields.min.js-vflJfl5KV.map