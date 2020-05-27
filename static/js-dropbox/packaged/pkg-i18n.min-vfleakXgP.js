function q(e) {
    throw e
}
define("keymaster", (function() {
    return (function(e) {
        var t = {};

        function r(n) {
            if (t[n]) return t[n].exports;
            var a = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports
        }
        return r.m = e, r.c = t, r.d = function(e, t, n) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
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
            var n = Object.create(null);
            if (r.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var a in e) r.d(n, a, function(t) {
                    return e[t]
                }.bind(null, a));
            return n
        }, r.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return r.d(t, "a", t), t
        }, r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, r.p = "", r(r.s = 0)
    })({
        "./keymaster.js": function(e, t, r) {
            (function(t) {
                if (window.key) return t.key = window.key, void(e.exports = t.key);
                var r, n = {},
                    a = {
                        16: !1,
                        18: !1,
                        17: !1,
                        91: !1
                    },
                    o = "all",
                    i = {
                        "⇧": 16,
                        shift: 16,
                        "⌥": 18,
                        alt: 18,
                        option: 18,
                        "⌃": 17,
                        ctrl: 17,
                        control: 17,
                        "⌘": 91,
                        command: 91
                    },
                    s = {
                        backspace: 8,
                        tab: 9,
                        clear: 12,
                        enter: 13,
                        return: 13,
                        esc: 27,
                        escape: 27,
                        space: 32,
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40,
                        del: 46,
                        delete: 46,
                        home: 36,
                        end: 35,
                        pageup: 33,
                        pagedown: 34,
                        ",": 188,
                        ".": 190,
                        "/": 191,
                        "`": 192,
                        "-": 189,
                        "=": 187,
                        ";": 186,
                        "'": 222,
                        "[": 219,
                        "]": 221,
                        "\\": 220
                    },
                    c = function(e) {
                        return s[e] || e.toUpperCase().charCodeAt(0)
                    };
                for (r = 1; r < 20; r++) s["f" + r] = 111 + r;

                function l(e, t) {
                    for (var r = e.length; r--;)
                        if (e[r] === t) return r;
                    return -1
                }

                function u() {
                    for (r in a) a.hasOwnProperty(r) && (a[r] = !1)
                }

                function f(e, t, r) {
                    var a, o, c, l;
                    for (void 0 === r && (r = t, t = "all"), "" == (a = (e = e.replace(/\s/g, "")).split(","))[a.length - 1] && (a[a.length - 2] += ","), c = 0; c < a.length; c++) {
                        if (o = [], (e = a[c].split("+")).length > 1) {
                            for (o = e.slice(0, e.length - 1), l = 0; l < o.length; l++) o[l] = i[o[l]];
                            e = [e[e.length - 1]]
                        }
                        e = e[0], (e = s[e] || e.toUpperCase().charCodeAt(0)) in n || (n[e] = []), n[e].push({
                            shortcut: a[c],
                            scope: t,
                            method: r,
                            key: a[c],
                            mods: o
                        })
                    }
                }
                for (r in i) f[r] = !1;

                function d(e) {
                    o = e || "all"
                }

                function m() {
                    return o
                }

                function p(e) {
                    for (var t = e.slice(0, e.length - 1), r = 0; r < t.length; r++) t[r] = i[t[r]];
                    return t
                }

                function h(e, t) {
                    if (e.length != t.length) return !1;
                    for (var r = 0; r < e.length; r++)
                        if (e[r] !== t[r]) return !1;
                    return !0
                }

                function g(e) {
                    var t = e.target || e.srcElement,
                        r = t.tagName,
                        n = e.keyCode,
                        a = t.hasAttribute && t.hasAttribute("contenteditable") && "false" != t.getAttribute("contenteditable").toLowerCase() || "undefined" != typeof jest && "true" == t.contentEditable;
                    return !(("INPUT" == r || "SELECT" == r || "TEXTAREA" == r || a) && -1 == ["submit", "button"].indexOf(t.type) && n != s.escape && n != s.tab)
                }

                function y(e, t, r) {
                    e.addEventListener ? e.addEventListener(t, r, !1) : e.attachEvent && e.attachEvent("on" + t, (function() {
                        r(window.event)
                    }))
                }
                y(document, "keydown", (function(e) {
                    var t, r, s, c, u;
                    if ((e.target || e.srcElement).tagName, 93 != (t = e.keyCode) && 224 != t || (t = 91), t in a)
                        for (s in a[t] = !0, i) i[s] == t && (f[s] = !0);
                    else if (f.filter.call(this, e) && t in n)
                        for (originalScope = o, c = 0; c < n[t].length; c++)
                            if ((r = n[t][c]).scope == originalScope || "all" == r.scope) {
                                for (s in u = r.mods.length > 0, a)(!a[s] && l(r.mods, +s) > -1 || a[s] && -1 == l(r.mods, +s)) && (u = !1);
                                (0 != r.mods.length || a[16] || a[18] || a[17] || a[91]) && !u || !1 === r.method(e, r) && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.cancelBubble && (e.cancelBubble = !0))
                            }
                })), y(document, "keyup", (function(e) {
                    var t, r = e.keyCode;
                    if (93 != r && 224 != r || (r = 91), r in a)
                        for (t in a[r] = !1, i) i[t] == r && (f[t] = !1)
                })), y(window, "focus", u), y(document, "contextmenu", u), t.key = f, t.key.setScope = d, t.key.getScope = m, t.key.clear = function() {
                    n = {}, d(), u()
                }, t.key.clearScope = function(e) {
                    for (var t in n)
                        if (n.hasOwnProperty(t))
                            for (var r = 0; r < n[t].length; r++) n[t][r].scope === e && (n[t].splice(r, 1), r -= 1)
                }, t.key.filter = g, t.key.resetFilter = function() {
                    f.filter = g
                }, t.key.unbind = function(e, t, r) {
                    var a, o, i, s, l, u, f = [];
                    for (o = (function(e) {
                            var t = e.replace(/\s/g, "").split(",");
                            return "" == t[t.length - 1] && (t[t.length - 2] += ","), t
                        })(e), l = 0; l < o.length; l++) {
                        if ((i = o[l].split("+")).length > 1 && (f = p(i)), a = i[i.length - 1], a = c(a), void 0 === t && (t = m()), !n[a]) return;
                        for (s = 0; s < n[a].length; s++)(u = n[a][s]).scope === t && h(u.mods, f) && (r && u.method !== r || (n[a][s] = {}))
                    }
                }, e.exports = t.key, window.key = t.key
            })(this), e.exports = this.key
        },
        0: function(e, t, r) {
            e.exports = r("./keymaster.js")
        }
    })
})), define("modules/clean/datetime", ["require", "exports", "tslib", "modules/constants/time", "modules/core/exception", "modules/core/i18n", "modules/constants/page_load"], (function(e, t, r, n, a, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), i = r.__importStar(i), t.localized_date_format = n.DATE_FORMAT, t.localized_datetime_format = n.DATETIME_FORMAT, t.localized_time_format = n.TIME_FORMAT;
    var s = 864e5;

    function c(e, r) {
        return r ? t.abbr_month_names[e] : t.month_names[e]
    }

    function l(e, t) {
        var r = [o.intl.formatMessage({
            defaultMessage: "am"
        }), o.intl.formatMessage({
            defaultMessage: "pm"
        })];
        return t.replace(/'[^']*'|y+|M+|d+|h+|k+|K+|H+|m+|s+|S+|a+/g, (function(t) {
            var n;
            switch (t[0]) {
                case "'":
                    return 2 === t.length ? "'" : t.slice(1, -1);
                case "y":
                    if ("yy" === t) return e.getYear() % 100;
                    n = e.getFullYear();
                    break;
                case "M":
                    if (t.length >= 3) return c(e.getMonth(), 3 === t.length);
                    n = e.getMonth() + 1;
                    break;
                case "d":
                    n = e.getDate();
                    break;
                case "h":
                    n = e.getHours() % 12 || 12;
                    break;
                case "k":
                    n = e.getHours() % 12 + 1;
                    break;
                case "K":
                    n = e.getHours() % 12;
                    break;
                case "H":
                    n = e.getHours();
                    break;
                case "m":
                    n = e.getMinutes();
                    break;
                case "s":
                    n = e.getSeconds();
                    break;
                case "S":
                    n = e.getMilliseconds();
                    break;
                case "a":
                    var a = void 0;
                    return a = e.getHours() >= 12 ? 1 : 0, r[a]
            }
            return (n = "" + n).length < t.length && (n = ("00000000" + n).slice(-1 * t.length)), n
        }))
    }

    function u(e) {
        return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds())
    }

    function f(e, t) {
        return l(u(e), t)
    }

    function d(e) {
        var t = new Date(e.getTime());
        return y(t, n.TIMEZONE_OFFSET), u(t)
    }

    function m(e) {
        var t = [86400, 3600, 60, 1];
        e = isNaN(e) ? 0 : e;
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            if (e >= n) return {
                unit: r,
                value: Math.floor(e / n)
            }
        }
        return {
            unit: 4,
            value: 0
        }
    }

    function p(e, t, r) {
        return void 0 === r && (r = !0), r ? o.intl.formatMessage({
            defaultMessage: "{month} {year}",
            description: "Like Jun 2012"
        }, {
            month: c(e, !0),
            year: t
        }) : o.intl.formatMessage({
            defaultMessage: "{month} {year}",
            description: 'Like Jun 2012. If this string begins with a fixed letter, not a placeholder, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'
        }, {
            month: c(e, !0),
            year: t
        })
    }

    function h(e, t, r, n) {
        void 0 === r && (r = !1), void 0 === n && (n = i.USER_LOCALE || "");
        var a = n.replace("_", "-");
        return new Intl.DateTimeFormat(a, {
            year: t ? "numeric" : void 0,
            day: "numeric",
            month: r ? "long" : "short"
        }).format(e)
    }

    function g(e, t, r, n, a, i) {
        void 0 === r && (r = !0), void 0 === n && (n = !1), void 0 === a && (a = !1), void 0 === i && (i = !1);
        var c = Number(t) - Number(e);
        if (c < 6e4) {
            if (i) {
                var l = Math.floor(c / 1e3);
                return n ? r ? o.intl.formatMessage({
                    defaultMessage: "{count, plural, one{{count} sec ago} other{{count} secs ago}}"
                }, {
                    count: l
                }) : o.intl.formatRelativeTime(-l, "second", {
                    style: "short"
                }) : r ? o.intl.formatMessage({
                    defaultMessage: "{count, plural, one{{count} second ago} other{{count} seconds ago}}"
                }, {
                    count: l
                }) : o.intl.formatRelativeTime(-l, "second")
            }
            return a ? r ? o.intl.formatMessage({
                defaultMessage: "A moment ago"
            }) : o.intl.formatMessage({
                defaultMessage: "a moment ago"
            }) : r ? o.intl.formatMessage({
                defaultMessage: "Just now"
            }) : o.intl.formatMessage({
                defaultMessage: "just now"
            })
        }
        if (c < 36e5) {
            var u = Math.floor(c / 6e4);
            return r ? o.intl.formatMessage({
                defaultMessage: "{count, plural, one{{count} min ago} other{{count} mins ago}}"
            }, {
                count: u
            }) : o.intl.formatRelativeTime(-u, "minute", {
                style: "short"
            })
        }
        if (c < s) {
            var f = Math.floor(c / 36e5);
            return n ? r ? o.intl.formatMessage({
                defaultMessage: "{count, plural, one{{count} hr ago} other{{count} hrs ago}}"
            }, {
                count: f
            }) : o.intl.formatRelativeTime(-f, "hour", {
                style: "short"
            }) : r ? o.intl.formatMessage({
                defaultMessage: "{count, plural, one{{count} hour ago} other{{count} hours ago}}"
            }, {
                count: f
            }) : o.intl.formatRelativeTime(-f, "hour")
        }
        if (c < 2592e6) {
            var d = Math.floor(c / s);
            return n && 1 === d ? r ? o.intl.formatMessage({
                defaultMessage: "Yesterday"
            }) : o.intl.formatMessage({
                defaultMessage: "yesterday"
            }) : r ? o.intl.formatMessage({
                defaultMessage: "{count, plural, one{{count} day ago} other{{count} days ago}}"
            }, {
                count: d
            }) : o.intl.formatRelativeTime(-d, "day")
        }
        if (!n && c < 56 * s) {
            var m = Math.floor(c / 6048e5);
            return r ? o.intl.formatMessage({
                defaultMessage: "{count, plural, one{{count} week ago} other{{count} weeks ago}}"
            }, {
                count: m
            }) : o.intl.formatRelativeTime(-m, "week")
        }
        if (c < 31536e6) {
            var h = Math.floor(c / 2592e6);
            if (1 === h) {
                if (n) return r ? o.intl.formatMessage({
                    defaultMessage: "Last month"
                }) : o.intl.formatMessage({
                    defaultMessage: "last month"
                });
                h = 2
            }
            return h = Math.min(11, h), r ? o.intl.formatMessage({
                defaultMessage: "{count, plural, one{{count} month ago} other{{count} months ago}}"
            }, {
                count: h
            }) : o.intl.formatRelativeTime(-h, "month")
        }
        if (n) {
            var g = new Date(e);
            return p(g.getMonth(), g.getFullYear(), r)
        }
        var y = Math.floor(c / 31536e6);
        return r ? o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} year ago} other{{count} years ago}}"
        }, {
            count: y
        }) : o.intl.formatRelativeTime(-y, "year")
    }

    function y(e, t) {
        var r = 60 * t;
        e.setMinutes(e.getMinutes() + r)
    }

    function v(e, t) {
        return e.getUTCFullYear() === t.getUTCFullYear() && e.getUTCMonth() === t.getUTCMonth() && e.getUTCDate() === t.getUTCDate()
    }

    function b(e, t, r, a, i, s, c) {
        void 0 === t && (t = !1), void 0 === r && (r = !1), void 0 === a && (a = -1), void 0 === i && (i = !1), void 0 === s && (s = !1), void 0 === c && (c = !1);
        var l = new Date,
            u = new Date(e),
            d = l.getTime() - u.getTime(),
            m = d < 0;
        if (!m && a > 0 && d < 1e3 * a) return g(u, l, s, r, t, i);
        if (m || d < 6e4) return t ? s ? o.intl.formatMessage({
            defaultMessage: "A moment ago",
            description: "Like 'A moment ago'"
        }) : o.intl.formatMessage({
            defaultMessage: "a moment ago",
            description: "Like 'a moment ago'"
        }) : s ? o.intl.formatMessage({
            defaultMessage: "Just now",
            description: "Like 'Just now'"
        }) : o.intl.formatMessage({
            defaultMessage: "just now",
            description: "Like 'just now'"
        });
        y(u, n.TIMEZONE_OFFSET);
        var p = (function(e, t) {
                var r = new Date(t.getTime());
                y(r, n.TIMEZONE_OFFSET);
                var a = new Date(r.getTime());
                return a.setUTCDate(a.getUTCDate() - 1), {
                    isToday: v(e, r),
                    isYesterday: v(e, a)
                }
            })(u, l),
            b = p.isToday,
            M = p.isYesterday,
            w = f(u, n.TIME_FORMAT);
        if (b) return r ? c ? s ? o.intl.formatMessage({
            defaultMessage: "Today {time}",
            description: "Like 'Today 3:00 PM'"
        }, {
            time: w
        }) : o.intl.formatMessage({
            defaultMessage: "today {time}",
            description: "Like 'today 3:00 PM'"
        }, {
            time: w
        }) : s ? o.intl.formatMessage({
            defaultMessage: "Today, {time}",
            description: "Like 'Today, 3:00 PM'"
        }, {
            time: w
        }) : o.intl.formatMessage({
            defaultMessage: "today, {time}",
            description: "Like 'today, 3:00 PM'"
        }, {
            time: w
        }) : s ? o.intl.formatMessage({
            defaultMessage: "Today at {time}",
            description: "Like 'Today at 3:00 PM'"
        }, {
            time: w
        }) : o.intl.formatMessage({
            defaultMessage: "today at {time}",
            description: "Like 'today at 3:00 PM'"
        }, {
            time: w
        });
        if (M) return r ? c ? s ? o.intl.formatMessage({
            defaultMessage: "Yesterday {time}",
            description: "Like 'Yesterday 3:00 PM'"
        }, {
            time: w
        }) : o.intl.formatMessage({
            defaultMessage: "yesterday {time}",
            description: "Like 'yesterday 3:00 PM'"
        }, {
            time: w
        }) : s ? o.intl.formatMessage({
            defaultMessage: "Yesterday, {time}",
            description: "Like 'Yesterday, 3:00 PM'"
        }, {
            time: w
        }) : o.intl.formatMessage({
            defaultMessage: "yesterday, {time}",
            description: "Like 'yesterday, 3:00 PM'"
        }, {
            time: w
        }) : s ? o.intl.formatMessage({
            defaultMessage: "Yesterday at {time}",
            description: "Like 'Yesterday at 3:00 PM'"
        }, {
            time: w
        }) : o.intl.formatMessage({
            defaultMessage: "yesterday at {time}",
            description: "Like 'yesterday at 3:00 PM'"
        }, {
            time: w
        });
        var A = f(u, n.DATE_FORMAT);
        return r ? c ? o.intl.formatMessage({
            defaultMessage: "{date} {time}",
            description: "Like '08/20/2015 3:00 PM'"
        }, {
            time: w,
            date: A
        }) : o.intl.formatMessage({
            defaultMessage: "{date}, {time}",
            description: "Like '08/20/2015, 3:00 PM'"
        }, {
            time: w,
            date: A
        }) : (A = h(e, u.getUTCFullYear() !== l.getUTCFullYear(), !0), s ? o.intl.formatMessage({
            defaultMessage: "On {date}",
            description: "Like 'On August 20, 2015'"
        }, {
            date: A
        }) : o.intl.formatMessage({
            defaultMessage: "on {date}",
            description: "Like 'on August 20, 2015'"
        }, {
            date: A
        }))
    }

    function M(e, t, r, n, a, o) {
        return null == t && (t = 0), null == r && (r = 0), null == n && (n = 0), null == a && (a = 0), null == o && (o = 0), e.setFullYear(e.getFullYear() + t), e.setMonth(e.getMonth() + r), e.setDate(e.getDate() + n), e.setHours(e.getHours() + a), e.setMinutes(e.getMinutes() + o), e
    }
    t.month_names = [o.intl.formatMessage({
        defaultMessage: "January"
    }), o.intl.formatMessage({
        defaultMessage: "February"
    }), o.intl.formatMessage({
        defaultMessage: "March"
    }), o.intl.formatMessage({
        defaultMessage: "April"
    }), o.intl.formatMessage({
        defaultMessage: "May"
    }), o.intl.formatMessage({
        defaultMessage: "June"
    }), o.intl.formatMessage({
        defaultMessage: "July"
    }), o.intl.formatMessage({
        defaultMessage: "August"
    }), o.intl.formatMessage({
        defaultMessage: "September"
    }), o.intl.formatMessage({
        defaultMessage: "October"
    }), o.intl.formatMessage({
        defaultMessage: "November"
    }), o.intl.formatMessage({
        defaultMessage: "December"
    })], t.abbr_month_names = [o.intl.formatMessage({
        defaultMessage: "Jan"
    }), o.intl.formatMessage({
        defaultMessage: "Feb"
    }), o.intl.formatMessage({
        defaultMessage: "Mar"
    }), o.intl.formatMessage({
        defaultMessage: "Apr"
    }), o.intl.formatMessage({
        defaultMessage: "May"
    }), o.intl.formatMessage({
        defaultMessage: "Jun"
    }), o.intl.formatMessage({
        defaultMessage: "Jul"
    }), o.intl.formatMessage({
        defaultMessage: "Aug"
    }), o.intl.formatMessage({
        defaultMessage: "Sep"
    }), o.intl.formatMessage({
        defaultMessage: "Oct"
    }), o.intl.formatMessage({
        defaultMessage: "Nov"
    }), o.intl.formatMessage({
        defaultMessage: "Dec"
    })], t.month_name = c, t.format_date = l, t.format_date_utc = f, t.format_date_timezone_offset = function(e, t) {
        return l(d(e), t)
    }, t.month_abbr_with_day_with_offset = function(e) {
        var t = i.USER_LOCALE.replace("_", "-");
        return d(e).toLocaleDateString(t, {
            month: "short",
            day: "numeric"
        })
    }, t.format_time = function(e) {
        var t = m(e),
            r = t.unit,
            n = t.value,
            i = "";
        return r >= 3 ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} sec} other{{count} secs}}"
        }, {
            count: n
        }) : 2 === r ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} min} other{{count} mins}}"
        }, {
            count: n
        }) : 1 === r ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} hour} other{{count} hours}}"
        }, {
            count: n
        }) : 0 === r ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} day} other{{count} days}}"
        }, {
            count: n
        }) : a.assert(!1, "Invalid time"), i
    }, t.format_time_remaining = function(e) {
        var t = m(e),
            r = t.unit,
            n = t.value,
            i = "";
        return r >= 3 ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} sec left} other{{count} secs left}}"
        }, {
            count: n
        }) : 2 === r ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} min left} other{{count} mins left}}"
        }, {
            count: n
        }) : 1 === r ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} hour left} other{{count} hours left}}"
        }, {
            count: n
        }) : 0 === r ? i = o.intl.formatMessage({
            defaultMessage: "{count, plural, one{{count} day left} other{{count} days left}}"
        }, {
            count: n
        }) : a.assert(!1, "Invalid time"), i
    }, t.formatAudioTime = function(e) {
        var t = Math.floor(e);
        t < 0 && (t = 0);
        var r = function(e) {
                return e < 10 ? "0" + e : e.toString()
            },
            n = ":" + r(t % 60);
        return n = r((t = Math.floor(t / 60)) % 60) + n, (t = Math.floor(t / 60)) > 0 && (n = t.toString() + ":" + n), n
    }, t.getTimeBands = function(e) {
        var t = new Date(e);
        t.setHours(0, 0, 0, 0);
        var r = new Date(t.getFullYear(), 0, 1).getTime(),
            n = t.getTime(),
            a = n - 864e5,
            o = new Date(e);
        0 === t.getDay() ? o.setDate(t.getDate() - 7) : o.setDate(t.getDate() - t.getDay() - 1), o.setHours(0);
        var i = o.getTime(),
            s = i - 6048e5;
        t.setDate(1);
        var c = t.getTime();
        t.setMonth(t.getMonth() - 1);
        var l = t.getTime();
        return t.setMonth(t.getMonth() - 3), {
            today: n,
            yesterday: a,
            thisWeek: i,
            lastWeek: s,
            thisMonth: c,
            lastMonth: l,
            lastThreeMonths: t.getTime(),
            thisYear: r
        }
    }, t.month_abbr_with_year = p, t.month_with_year = function(e, t, r) {
        return void 0 === r && (r = !0), r ? o.intl.formatMessage({
            defaultMessage: "{month} {year}",
            description: "Month and Year, like December 2012"
        }, {
            month: c(e, !1),
            year: t
        }) : o.intl.formatMessage({
            defaultMessage: "{month} {year}",
            description: 'Month and Year, like December 2012. If this string begins with a fixed letter, not a placeholder, it should not be capitalized so that it may be inserted into the middle of a sentence. For example, "%(user_name)s viewed %(ago)s", where this string can be substituted for %(ago).'
        }, {
            month: c(e, !1),
            year: t
        })
    }, t.nice_date_with_month_name = h, t.ago = function(e, t, r, n) {
        return void 0 === t && (t = !0), void 0 === r && (r = !1), void 0 === n && (n = !1), g(e, new Date, t, r, n)
    }, t.agoFromDate = g, t.applyTimezoneOffset = y, t.getActingTimeWithAgoEnabled = function(e, t, r, n, a, o, i) {
        return void 0 === t && (t = !1), void 0 === r && (r = !1), void 0 === n && (n = 0), void 0 === a && (a = !0), void 0 === o && (o = !1), void 0 === i && (i = !1), 0 === n && (n = 28800), b(e, t, r, n, a, o, i)
    }, t.getActingTime = b, t.increment_date = M, t.time = function() {
        return (new Date).getTime()
    }, t.daysAfterToday = function(e) {
        var t = new Date;
        return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), M(t, 0, 0, e)
    }, t.secondsFromToday = function(e) {
        return e.getTime() / 1e3 - Date.now() / 1e3
    }, t.datepickerLocalization = {
        firstDayOfWeek: 1,
        months: t.month_names,
        weekdaysLong: [o.intl.formatMessage({
            defaultMessage: "Sunday"
        }), o.intl.formatMessage({
            defaultMessage: "Monday"
        }), o.intl.formatMessage({
            defaultMessage: "Tuesday"
        }), o.intl.formatMessage({
            defaultMessage: "Wednesday"
        }), o.intl.formatMessage({
            defaultMessage: "Thursday"
        }), o.intl.formatMessage({
            defaultMessage: "Friday"
        }), o.intl.formatMessage({
            defaultMessage: "Saturday"
        })],
        weekdaysShort: [o.intl.formatMessage({
            defaultMessage: "Su"
        }), o.intl.formatMessage({
            defaultMessage: "Mo"
        }), o.intl.formatMessage({
            defaultMessage: "Tu"
        }), o.intl.formatMessage({
            defaultMessage: "We"
        }), o.intl.formatMessage({
            defaultMessage: "Th"
        }), o.intl.formatMessage({
            defaultMessage: "Fr"
        }), o.intl.formatMessage({
            defaultMessage: "Sa"
        })]
    }
})), define("modules/clean/display_format", ["require", "exports", "modules/core/i18n"], (function(e, t, r) {
    "use strict";

    function n(e, n, a, o, i) {
        void 0 === n && (n = 2), void 0 === a && (a = !0), void 0 === o && (o = !0), void 0 === i && (i = !0), e = i ? parseFloat(e) : Math.max(0, parseFloat(e));
        var s, c, l = Math.abs(e);
        return l < 1024 ? (n = 0, s = e, c = r.intl.formatMessage({
            defaultMessage: "{count, plural, one{byte} other{bytes}}"
        }, {
            count: e
        }), a = !0) : l < 1024 * t.SWITCH_UNIT_THRESHOLD ? (s = e / 1024, c = r.intl.formatMessage({
            defaultMessage: "KB"
        })) : l < 1048576 * t.SWITCH_UNIT_THRESHOLD ? (s = e / 1048576, c = r.intl.formatMessage({
            defaultMessage: "MB"
        })) : l < 1073741824 * t.SWITCH_UNIT_THRESHOLD || 0 === n && e < 1099511627776 ? (s = e / 1073741824, c = r.intl.formatMessage({
            defaultMessage: "GB"
        })) : (s = e / 1099511627776, c = r.intl.formatMessage({
            defaultMessage: "TB"
        })), "" + r.intl.formatNumber(s, {
            maximumFractionDigits: n,
            minimumFractionDigits: o ? 0 : n
        }) + (a ? " " : "") + c
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.SWITCH_UNIT_THRESHOLD = 900, t.format_bytes = n, t.formatGigabytes = function(e, t, r, a) {
        return void 0 === t && (t = 2), void 0 === r && (r = !0), void 0 === a && (a = !0), n(1073741824 * (e = parseFloat(e)))
    }, t.formatFolderFilesCount = function(e, t) {
        void 0 === t && (t = 2);
        var r = "" + e,
            n = "";
        return e >= 1e3 && e < 1e6 ? (e /= 1e3, n = "K") : e >= 1e6 && (e /= 1e6, n = "M"), r = e.toFixed(t), "" + (r = parseFloat(r).toString()) + n
    }
})), define("modules/clean/react/modal", ["require", "exports", "tslib", "classnames", "purify", "react", "react-dom", "react-dom-factories", "prop-types", "modules/clean/css", "modules/core/exception", "modules/core/notify", "jquery", "modules/clean/keycode", "modules/clean/react/button", "modules/clean/static_urls", "modules/core/dom", "modules/core/i18n", "modules/clean/ux_analytics_utils"], (function(e, t, r, n, a, o, i, s, c, l, u, f, d, m, p, h, g, y, v) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importDefault(n), a = r.__importStar(a), o = r.__importDefault(o), i = r.__importStar(i), s = r.__importStar(s), c = r.__importStar(c), l = r.__importStar(l), d = r.__importDefault(d), g = r.__importStar(g);
    var b = o.default.createElement;
    t.MODAL_ROOT_TESTID = "react-modal-root";
    var M = function(e) {
            null == e && (e = !0);
            var r = "react-modal-root",
                n = document.getElementById(r);
            return !n && e && ((n = document.createElement("div")).id = r, n.setAttribute("data-testid", t.MODAL_ROOT_TESTID), document.body.insertBefore(n, document.body.firstChild || null)), n
        },
        w = (function(e) {
            function t(r) {
                var n = e.call(this, r) || this;
                return n.close = function() {
                    return t.close(n.elementToFocusOnClose)
                }, n._invokeCallbackAndClose = function(e, t, r) {
                    if (T(e, "call", (function(e) {
                            return e.call(n, t)
                        })), !t.isDefaultPrevented()) return n.props.autoClose || r ? n.close() : void 0
                }, n._dismiss = function(e) {
                    n._invokeCallbackAndClose(n.props.onDismiss, e, !0), T(n.props.onDismissCompleted, "call", (function(t) {
                        return t.call(n, e)
                    }))
                }, n._accept = function(e) {
                    n._invokeCallbackAndClose(n.props.onAccept, e, !1)
                }, n._onClickOnOverlay = function(e) {
                    n.props.clickOutToClose && n._dismiss(e)
                }, n._focus = function() {
                    n.elementToFocusOnClose = document.activeElement;
                    var e = d.default(i.findDOMNode(n.refs.modal));
                    if (n.props.autoFocusPrimaryInput) {
                        var t = e.find("input:not(:disabled)").first(),
                            r = null != n.refs.primaryButton && d.default(i.findDOMNode(n.refs.primaryButton)),
                            a = null != n.refs.tertiaryButton && d.default(i.findDOMNode(n.refs.tertiaryButton));
                        t.length ? e = t : r.length && !r.is(":disabled") ? e = d.default(i.findDOMNode(n.refs.primaryButton)) : a.length && !a.is(":disabled") && (e = d.default(i.findDOMNode(n.refs.tertiaryButton)))
                    }
                    return e.focus()
                }, n._keyDown = function(e) {
                    if (n.props.stopKeyDownEventPropagation && e.stopPropagation(), e.which === m.KeyCode.ESC && n.props.escapeOrBackspaceToClose && n._dismiss(e), e.which !== m.KeyCode.BACKSPACE || g.focus_in_input() || (e.preventDefault(), n.props.escapeOrBackspaceToClose && n._dismiss(e)), n.props.onKeyDown && n.props.onKeyDown(e), null != n.refs.modal) return g.keepFocusIn(i.findDOMNode(n.refs.modal), e)
                }, n._trackingId = function(e) {
                    return null != n.props.trackingIdPrefix ? n.props.trackingIdPrefix + "-" + e : null
                }, n._renderAcceptButton = function() {
                    return b(p.button, {
                        ref: "primaryButton",
                        key: "primary",
                        className: "dbmodal-button",
                        "data-trackingid": n._trackingId("accept"),
                        importance: n.props.acceptButtonImportance,
                        disabled: n.props.acceptButtonDisabled,
                        onClick: n._accept
                    }, n.props.acceptButtonText)
                }, n._renderDismissButton = function() {
                    return b(p.button, {
                        ref: "tertiaryButton",
                        key: "tertiary-dismiss",
                        className: "dbmodal-button",
                        "data-trackingid": n._trackingId("dismiss"),
                        importance: n.props.dismissButtonImportance,
                        disabled: n.props.dismissButtonDisabled,
                        onClick: n._dismiss
                    }, n.props.dismissButtonText)
                }, n._renderHelpLink = function() {
                    return o.default.createElement("div", {
                        className: "dbmodal-extra-link-button"
                    }, n.props.helpLink)
                }, n._renderButtons = function() {
                    if (n.props.buttonComponent) return n.props.buttonComponent;
                    var e = [];
                    return n.props.submitting && e.push(s.span({
                        className: "dbmodal-loading",
                        key: "loading"
                    }, s.img({
                        src: h.static_url("/static/images/icons/ajax-loading-small-vfl3Wt7C_.gif"),
                        alt: y.intl.formatMessage({
                            defaultMessage: "Loading"
                        })
                    }))), "default-maestro" === n.props.style ? (n.props.dismissButtonText && e.push(n._renderDismissButton()), n.props.acceptButtonText && e.push(n._renderAcceptButton())) : (n.props.acceptButtonText && e.push(n._renderAcceptButton()), n.props.dismissButtonText && e.push(n._renderDismissButton()), n.props.helpLink && e.push(n._renderHelpLink())), e.length ? s.div({
                        className: "db-modal-buttons"
                    }, n.props.showButtonDivider ? s.hr({}) : void 0, e) : void 0
                }, n._renderAltAction = function() {
                    if (n.props.altAction) return s.div({
                        className: "db-modal__alt-action"
                    }, n.props.altAction)
                }, n._preventEventBubbling = function(e) {
                    return e.stopPropagation()
                }, n.state = {
                    didCssLoad: !1
                }, n
            }
            return r.__extends(t, e), t.showInstance = function(e, t) {
                null == t && (t = !0);
                var r = M();
                return t && (i.unmountComponentAtNode(r), d.default(r).siblings().not("#accessible-announce").attr("aria-hidden", !0)), i.render(e, r)
            }, t.close = function(e) {
                var t = M();
                t && (i.unmountComponentAtNode(t), v.dispatchModalClosed(), d.default(t).siblings().removeAttr("aria-hidden"), "function" == typeof(null == e ? void 0 : e.focus) && e.focus())
            }, t.unhide = function() {
                var e = M();
                if (e) return d.default(e).show()
            }, t.hide = function() {
                var e = M();
                if (e) return d.default(e).hide()
            }, t.prototype.componentDidMount = function() {
                return v.dispatchModalOpened(), g.scroll_lock_document(), d.default(i.findDOMNode(this.refs.modal)).on("keydown", this._keyDown), d.default(i.findDOMNode(this.refs.modal)).on("keypress", this._preventEventBubbling), this._focus(), "function" == typeof this.props.onShow ? this.props.onShow() : void 0
            }, t.prototype.UNSAFE_componentWillMount = function() {
                var e = this;
                this.props.shouldLoadCss && l.require_css("/static/css/modal-vflyV3KII.css", (function() {
                    e.setState({
                        didCssLoad: !0
                    }), e._focus()
                }), (function() {
                    u.reportStack("modal css not properly loaded", {
                        severity: u.SEVERITY.CRITICAL
                    }), f.Notify.error(y.intl.formatMessage({
                        defaultMessage: "There was a problem completing this request."
                    }))
                }))
            }, t.prototype.componentWillUnmount = function() {
                return v.dispatchModalClosed(), g.scroll_unlock_document(), d.default(i.findDOMNode(this.refs.modal)).off("keydown", this._keyDown), d.default(i.findDOMNode(this.refs.modal)).off("keypress", this._preventEventBubbling)
            }, t.prototype.render = function() {
                var e = {
                    "db-modal-wrapper": !0,
                    "uxa-modal": !0,
                    "clean-react-modal": !0,
                    "db-modal--clean-style": "clean" === this.props.style,
                    "db-modal--simple-style": "simple" === this.props.style,
                    "db-modal--lightbox-style": "lightbox" === this.props.style,
                    "db-modal--bare-style": "bare" === this.props.style,
                    "db-modal--default-maestro-style": "default-maestro" === this.props.style,
                    "db-modal--cancel-style": "cancel" === this.props.style,
                    "db-modal--cancel-confirmation-style": "cancel-confirmation" === this.props.style
                };
                this.props.className && (e[this.props.className] = !0);
                var t = n.default(e),
                    a = v.getModalId({
                        id: this.props.id,
                        className: this.props.className
                    }),
                    o = this.props.width ? {
                        width: this.props.width + "px"
                    } : {},
                    i = !this.props.shouldLoadCss || this.props.shouldLoadCss && this.state.didCssLoad ? {} : {
                        style: {
                            display: "none"
                        }
                    };
                return s.div(r.__assign({
                    id: a,
                    className: t
                }, i), s.div({
                    className: "db-modal-overlay",
                    onClick: this._onClickOnOverlay
                }), s.div({
                    ref: "modal",
                    className: "db-modal",
                    tabIndex: -1,
                    style: o,
                    role: "dialog",
                    "aria-labelledby": "lightbox" === this.props.style ? "" : this.props.headerId
                }, s.div({
                    className: "db-modal-box",
                    ref: "modalBox"
                }, ["lightbox", "bare"].includes(this.props.style) ? s.div({
                    className: "db-modal-" + this.props.style
                }, this.props.children) : s.div({}, !this.props.showX || "default-maestro" === this.props.style && "change-email-modal--maestro" !== this.props.className ? void 0 : s.button({
                    className: "db-modal-x",
                    onClick: this._dismiss,
                    "aria-label": y.intl.formatMessage({
                        defaultMessage: "Close"
                    }),
                    "data-trackingid": this._trackingId("dismiss")
                }), this.props.title ? s.h1({
                    id: "db-modal-title",
                    className: "db-modal-title"
                }, s.div({
                    className: "db-modal-title-text",
                    ref: "title"
                }, this.props.title)) : null, s.div({
                    className: "db-modal-content clearfix",
                    ref: "content"
                }, this.props.children, this._renderButtons(), this._renderAltAction())))))
            }, t.displayName = "Modal", t.propTypes = {
                id: c.string,
                width: c.number,
                submitting: c.bool,
                title: c.oneOfType([c.oneOfType([c.string, c.element]), c.arrayOf(c.oneOfType([c.string, c.element]))]),
                acceptButtonText: c.string,
                dismissButtonText: c.string,
                acceptButtonImportance: c.string,
                dismissButtonImportance: c.string,
                altAction: c.node,
                trackingIdPrefix: c.string,
                headerId: c.string,
                onAccept: c.func,
                onDismiss: c.func,
                onDismissCompleted: c.func,
                onShow: c.func,
                onKeyDown: c.func,
                buttonComponent: c.element,
                autoClose: c.bool,
                clickOutToClose: c.bool,
                showX: c.bool,
                escapeOrBackspaceToClose: c.bool,
                showButtonDivider: c.bool,
                acceptButtonDisabled: c.bool,
                dismissButtonDisabled: c.bool,
                autoFocusPrimaryInput: c.bool,
                style: c.oneOf(["default", "default-maestro", "clean", "simple", "lightbox", "bare", "cancel", "cancel-confirmation"]),
                setMaxHeight: c.bool,
                className: c.string,
                shouldLoadCss: c.bool,
                stopKeyDownEventPropagation: c.bool,
                helpLink: c.oneOfType([c.string, c.element])
            }, t.defaultProps = {
                acceptButtonText: y.intl.formatMessage({
                    defaultMessage: "OK"
                }),
                acceptButtonImportance: "primary",
                dismissButtonImportance: "tertiary",
                dismissButtonText: null,
                buttonComponent: null,
                headerId: "db-modal-title",
                onAccept: function() {},
                onDismiss: function() {},
                onShow: function() {},
                autoClose: !0,
                clickOutToClose: !0,
                style: "default",
                showX: !0,
                escapeOrBackspaceToClose: !0,
                acceptButtonDisabled: !1,
                dismissButtonDisabled: !1,
                autoFocusPrimaryInput: !0,
                shouldLoadCss: !0,
                stopKeyDownEventPropagation: !0
            }, t
        })(o.default.Component);
    t.Modal = w, t.ReactModal = w;
    var A = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = {};
            for (var t in this.props) {
                var r = this.props[t];
                e[t] = r
            }
            return e.className = n.default(this.props.className, "db-modal-buttons"), s.div(e)
        }, t.displayName = "ModalButtons", t
    })(o.default.Component);
    t.ModalButtons = A;
    var _ = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.prototype.render = function() {
            var e = {};
            for (var t in this.props) {
                var r = this.props[t];
                e[t] = r
            }
            return "button-as-link skip-link" === this.props.className ? e.className = this.props.className : e.className = n.default(this.props.className, "dbmodal-button", "button-" + this.props.importance), s.button(e)
        }, t.displayName = "ModalButton", t.propTypes = {
            importance: c.oneOf(["primary", "secondary", "tertiary"])
        }, t.defaultProps = {
            importance: "primary"
        }, t
    })(o.default.Component);
    t.ModalButton = _;
    var j = {
        show: function(e) {
            var t = {
                    acceptButtonText: e.confirm_text,
                    trackingIdPrefix: e.trackingIdPrefix,
                    onAccept: e.confirm_callback,
                    dismissButtonText: e.cancel_text,
                    onDismiss: e.cancel_callback,
                    onDismissCompleted: e.cancel_completed_callback,
                    title: e.title_text,
                    width: e.width,
                    className: "simple-modal",
                    autoClose: e.autoclose,
                    style: e.style,
                    onShow: e.on_show
                },
                r = e.body_react ? o.default.createElement("div", {
                    className: "simple-modal-content"
                }, e.body_react) : o.default.createElement("div", {
                    className: "simple-modal-content",
                    dangerouslySetInnerHTML: {
                        __html: a.sanitize(e.body_html)
                    }
                }),
                n = b(w, t, r);
            return w.showInstance(n)
        }
    };

    function T(e, t, r) {
        return null != e && "function" == typeof e[t] ? r(e, t) : void 0
    }
    t.SimpleModal = j
})), define("modules/clean/validators/validators", ["require", "exports", "tslib", "external/lodash", "react-intl", "jquery", "modules/core/i18n"], (function(e, t, r, n, a, o, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importDefault(o);
    var s = {},
        c = function(e, t) {
            return s[e] = t
        },
        l = function(e) {
            var t, n = e[0],
                a = e.slice(1);
            if (!s[n]) throw new Error("Cannot find validator of type " + n);
            return new((t = s[n]).bind.apply(t, r.__spreadArrays([void 0], a)))
        },
        u = function(e) {
            this.messages = n.assignIn({}, this.constructor.messages, null != e ? e.messages : void 0)
        };
    c("AllValidator", (function(e) {
        function t() {
            for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
            var a = this,
                o = null;
            return n.isArray(n.last(t)) || (o = n.last(t), t = t.slice(0, -1)), (a = e.call(this, o) || this).validators = Array.from(t).filter((function(e) {
                return null !== e
            })).map((function(e) {
                return l(e)
            })), a
        }
        return r.__extends(t, e), t.prototype.validate = function(e, t) {
            return Array.from(this.validators).map((function(r) {
                return r.validate(e, t)
            }))
        }, t
    })(u));
    var f = /^[\x00-\x7f]*$/,
        d = (function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return r.__extends(t, e), t.initClass = function() {
                this.messages = {
                    asciiOnly: i.intl.formatMessage({
                        defaultMessage: "Only basic ASCII characters allowed"
                    })
                }
            }, t.prototype.validate = function(e) {
                if (!f.test(e)) throw new Error(this.messages.asciiOnly)
            }, t
        })(u);
    d.initClass(), c("AsciiOnlyValidator", d);
    var m = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            return r.not_empty = t.not_empty, r.strip = t.strip, r
        }
        return r.__extends(t, e), t.initClass = function() {
            this.messages = {
                empty: a.defineMessage({
                    defaultMessage: "Please enter a value for {field}"
                })
            }
        }, t.prototype.validate = function(e, t) {
            if (this.strip && (e = o.default.trim(e)), this.not_empty && !e) throw new Error("string" == typeof this.messages.empty ? this.messages.empty : i.intl.formatMessage(this.messages.empty, {
                field: null != t ? t.field : void 0
            }))
        }, t
    })(u);
    m.initClass(), c("StringValidator", m);
    var p = (function(e) {
        function t(t) {
            var r = e.call(this, t) || this;
            return r.lastname_goes_first = null != t ? t.lastname_goes_first : void 0, r
        }
        return r.__extends(t, e), t.initClass = function() {
            this.messages = {
                empty: i.intl.formatMessage({
                    defaultMessage: "Please enter your name"
                })
            }
        }, t.prototype.validate = function(e, t) {
            if (!t.data.lname && !t.data.fname)
                if (this.lastname_goes_first) {
                    if ("lname" === t.field) throw new Error(this.messages.empty)
                } else if ("fname" === t.field) throw new Error(this.messages.empty);
            if ("fname" === t.field) return l(["StringValidator", {
                not_empty: !0,
                strip: !0,
                messages: {
                    empty: i.intl.formatMessage({
                        defaultMessage: "Please enter your first name"
                    })
                }
            }]).validate(e, t)
        }, t
    })(u);
    p.initClass(), c("NameValidator", p);
    var h = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.initClass = function() {
            this.domain_re = new RegExp("^([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\\.)+[A-Za-z]{2,}$", "i")
        }, t.prototype.validate = function(e) {
            if (!(e = o.default.trim(e)) || e.length > 253) throw new Error(i.intl.formatMessage({
                defaultMessage: "The domain {input} is invalid"
            }, {
                input: e
            }));
            if (f.test(e) && !t.domain_re.test(e)) throw new Error(i.intl.formatMessage({
                defaultMessage: "The domain {input} is invalid"
            }, {
                input: e
            }))
        }, t
    })(u);
    h.initClass(), c("UrlValidator", h);
    var g = (function(e) {
        function t() {
            return null !== e && e.apply(this, arguments) || this
        }
        return r.__extends(t, e), t.initClass = function() {
            this.messages = {
                empty: i.intl.formatMessage({
                    defaultMessage: "Please enter an email address"
                }),
                noAt: i.intl.formatMessage({
                    defaultMessage: "An email address must contain a single @"
                }),
                badUsername: a.defineMessage({
                    defaultMessage: "The username portion of the email address is invalid (the portion before the @: {username})"
                }),
                badDomain: a.defineMessage({
                    defaultMessage: "The domain portion of the email address is invalid (the portion after the @: {domain})"
                })
            }, this.urlValidator = new h(null), this.username_re = /^[\w!#$%&'*+\-\/=?^`{|}~.]+$/
        }, t.prototype.validate = function(e) {
            if (!(e = o.default.trim(e))) throw new Error(this.messages.empty);
            var r = e.split("@");
            if (2 !== r.length) throw new Error(this.messages.noAt);
            var n = Array.from(r),
                a = n[0],
                s = n[1];
            if (!t.username_re.test(a)) throw new Error("string" == typeof this.messages.badUsername ? this.messages.badUsername : i.intl.formatMessage(this.messages.badUsername, {
                username: a
            }));
            try {
                t.urlValidator.validate(s)
            } catch (e) {
                throw new Error("string" == typeof this.messages.badDomain ? this.messages.badDomain : i.intl.formatMessage(this.messages.badDomain, {
                    domain: s
                }))
            }
        }, t
    })(u);
    g.initClass(), c("EmailValidator", g);
    t.validators = {
        create: l,
        register: c,
        check: function(e) {
            return function(t, r) {
                var n = !0;
                try {
                    e.validate(t, r)
                } catch (e) {
                    n = !1
                }
                return n
            }
        }
    }
})), define("modules/core/i18n", ["require", "exports", "tslib", "langpack", "modules/core/exception", "modules/constants/page_load", "sha1", "react-intl"], (function(e, t, r, n, a, o, i, s) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), n = r.__importStar(n), o = r.__importStar(o), i = r.__importDefault(i);
    var c = 0;

    function l(t) {
        c > 2 || Math.random() >= .05 || (c++, new Promise((function(t, r) {
            e(["jquery"], t, r)
        })).then(r.__importStar).then((function(e) {
            e.ajax({
                url: "/missed_translation_log",
                type: "POST",
                data: {
                    message: null == t ? void 0 : t.defaultMessage,
                    comment: null == t ? void 0 : t.description
                }
            })
        })))
    }
    t._reportMissingTranslation = l;
    var u = 0;

    function f(e) {
        u > 2 || Math.random() >= .05 || (u++, a.reportException({
            err: e,
            tags: ["modules/core/i18n", "react-intl"],
            severity: a.SEVERITY.CRITICAL
        }))
    }

    function d(e) {
        return console.log(e), e.code !== s.ReactIntlErrorCode.MISSING_TRANSLATION ? f(e) : l(e.descriptor)
    }
    t._resetErrorCount = function() {
        u = 0, c = 0
    }, t._reportFormattingError = f;
    var m = s.createIntlCache(),
        p = y(o.USER_LOCALE),
        h = s.createIntl({
            locale: p,
            defaultLocale: p,
            messages: n,
            onError: d
        }, m);

    function g(e, t) {
        var r = e + (t ? "#" + t : ""),
            n = new i.default("SHA-1", "TEXT");
        return n.update(r), n.getHash("B64").slice(0, 6)
    }

    function y(e) {
        return e ? e.replace(/_/gi, "-") : e
    }
    t._setTestingIntl = function(e) {
        h = s.createIntl(r.__assign({
            locale: p,
            defaultLocale: p,
            messages: n,
            onError: d
        }, e))
    }, t._clearTestingIntl = function() {
        h = s.createIntl({
            locale: p,
            defaultLocale: p,
            messages: n,
            onError: d
        }, m)
    }, t.intl = r.__assign(r.__assign({}, h), {
        formatMessage: function(e, t) {
            return e.id || (e.id = g(e.defaultMessage || "", e.description)), h.formatMessage(e, t)
        }
    }), t.generateStringKey = g, t.localeToBcp47LangTag = y, t.case_insensitive_comparator = function(e) {
        return new window.Intl.Collator(y(o.USER_LOCALE), {
            numeric: e
        }).compare
    }
})), (function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("react")) : "function" == typeof define && define.amd ? define("react-intl", ["exports", "react"], t) : t((e = e || self).ReactIntl = {}, e.React)
})(this, (function(e, t) {
    "use strict";

    function r(e) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }

    function o(e, t, r) {
        return t && a(e.prototype, t), r && a(e, r), e
    }

    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), t && c(e, t)
    }

    function s(e) {
        return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function c(e, t) {
        return (c = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }

    function l() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
        } catch (e) {
            return !1
        }
    }

    function u(e, t, r) {
        return (u = l() ? Reflect.construct : function(e, t, r) {
            var n = [null];
            n.push.apply(n, t);
            var a = new(Function.bind.apply(e, n));
            return r && c(a, r.prototype), a
        }).apply(null, arguments)
    }

    function f(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (f = function(e) {
            if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]"))) return e;
            var r;
            if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
            if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n)
            }

            function n() {
                return u(e, arguments, s(this).constructor)
            }
            return n.prototype = Object.create(e.prototype, {
                constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), c(n, e)
        })(e)
    }

    function d(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function m(e, t) {
        return !t || "object" != typeof t && "function" != typeof t ? d(e) : t
    }

    function p(e) {
        return function() {
            var t, r = s(e);
            if (l()) {
                var n = s(this).constructor;
                t = Reflect.construct(r, arguments, n)
            } else t = r.apply(this, arguments);
            return m(this, t)
        }
    }

    function h(e) {
        return (function(e) {
            if (Array.isArray(e)) return g(e)
        })(e) || (function(e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        })(e) || (function(e, t) {
            if (!e) return;
            if ("string" == typeof e) return g(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === r && e.constructor && (r = e.constructor.name);
            if ("Map" === r || "Set" === r) return Array.from(r);
            if ("Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return g(e, t)
        })(e) || (function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        })()
    }

    function g(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }
    var y, v;

    function b(e) {
        return e.type === y.literal
    }

    function M(e) {
        return e.type === y.argument
    }

    function w(e) {
        return e.type === y.number
    }

    function A(e) {
        return e.type === y.date
    }

    function _(e) {
        return e.type === y.time
    }

    function j(e) {
        return e.type === y.select
    }

    function T(e) {
        return e.type === y.plural
    }

    function E(e) {
        return e.type === y.pound
    }

    function C(e) {
        return e.type === y.tag
    }

    function k(e) {
        return !(!e || "object" !== r(e) || 0 !== e.type)
    }

    function O(e) {
        return !(!e || "object" !== r(e) || 1 !== e.type)
    }(function(e) {
        e[e.literal = 0] = "literal", e[e.argument = 1] = "argument", e[e.number = 2] = "number", e[e.date = 3] = "date", e[e.time = 4] = "time", e[e.select = 5] = "select", e[e.plural = 6] = "plural", e[e.pound = 7] = "pound", e[e.tag = 8] = "tag"
    })(y || (y = {})), (function(e) {
        e[e.number = 0] = "number", e[e.dateTime = 1] = "dateTime"
    })(v || (v = {}));
    var S, I = (S = function(e, t) {
            return (S = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                })(e, t)
        }, function(e, t) {
            function r() {
                this.constructor = e
            }
            S(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r)
        }),
        D = function() {
            return (D = Object.assign || function(e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                    for (var a in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }).apply(this, arguments)
        },
        F = (function(e) {
            function t(r, n, a, o) {
                var i = e.call(this) || this;
                return i.message = r, i.expected = n, i.found = a, i.location = o, i.name = "SyntaxError", "function" == typeof Error.captureStackTrace && Error.captureStackTrace(i, t), i
            }
            return I(t, e), t.buildMessage = function(e, t) {
                function r(e) {
                    return e.charCodeAt(0).toString(16).toUpperCase()
                }

                function n(e) {
                    return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(e) {
                        return "\\x0" + r(e)
                    })).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(e) {
                        return "\\x" + r(e)
                    }))
                }

                function a(e) {
                    return e.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, (function(e) {
                        return "\\x0" + r(e)
                    })).replace(/[\x10-\x1F\x7F-\x9F]/g, (function(e) {
                        return "\\x" + r(e)
                    }))
                }

                function o(e) {
                    switch (e.type) {
                        case "literal":
                            return '"' + n(e.text) + '"';
                        case "class":
                            var t = e.parts.map((function(e) {
                                return Array.isArray(e) ? a(e[0]) + "-" + a(e[1]) : a(e)
                            }));
                            return "[" + (e.inverted ? "^" : "") + t + "]";
                        case "any":
                            return "any character";
                        case "end":
                            return "end of input";
                        case "other":
                            return e.description
                    }
                }
                return "Expected " + (function(e) {
                    var t, r, n = e.map(o);
                    if (n.sort(), n.length > 0) {
                        for (t = 1, r = 1; t < n.length; t++) n[t - 1] !== n[t] && (n[r] = n[t], r++);
                        n.length = r
                    }
                    switch (n.length) {
                        case 1:
                            return n[0];
                        case 2:
                            return n[0] + " or " + n[1];
                        default:
                            return n.slice(0, -1).join(", ") + ", or " + n[n.length - 1]
                    }
                })(e) + " but " + ((i = t) ? '"' + n(i) + '"' : "end of input") + " found.";
                var i
            }, t
        })(Error);
    var x = function(e, t) {
            t = void 0 !== t ? t : {};
            var r, n = {},
                a = {
                    start: ke
                },
                o = ke,
                i = Ae("#", !1),
                s = je("tagElement"),
                c = Ae("<", !1),
                l = Ae("/>", !1),
                u = Ae(">", !1),
                f = function(e) {
                    return Qe.pop(), !0
                },
                d = Ae("</", !1),
                m = je("argumentElement"),
                p = Ae("{", !1),
                h = Ae("}", !1),
                g = je("numberSkeletonId"),
                v = /^['\/{}]/,
                b = _e(["'", "/", "{", "}"], !1, !1),
                M = {
                    type: "any"
                },
                w = je("numberSkeletonTokenOption"),
                A = Ae("/", !1),
                _ = je("numberSkeletonToken"),
                j = Ae("::", !1),
                T = function(e) {
                    return Qe.pop(), e.replace(/\s*$/, "")
                },
                E = Ae(",", !1),
                C = Ae("number", !1),
                k = function(e, t, r) {
                    return D({
                        type: "number" === t ? y.number : "date" === t ? y.date : y.time,
                        style: r && r[2],
                        value: e
                    }, rt())
                },
                O = Ae("'", !1),
                S = /^[^']/,
                I = _e(["'"], !0, !1),
                x = /^[^a-zA-Z'{}]/,
                R = _e([
                    ["a", "z"],
                    ["A", "Z"], "'", "{", "}"
                ], !0, !1),
                P = /^[a-zA-Z]/,
                N = _e([
                    ["a", "z"],
                    ["A", "Z"]
                ], !1, !1),
                L = Ae("date", !1),
                B = Ae("time", !1),
                U = Ae("plural", !1),
                H = Ae("selectordinal", !1),
                q = Ae("offset:", !1),
                z = Ae("select", !1),
                Y = Ae("=", !1),
                V = je("whitespace"),
                G = /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
                $ = _e([
                    ["\t", "\r"], " ", "", " ", " ", [" ", " "], "\u2028", "\u2029", " ", " ", "　"
                ], !1, !1),
                Z = je("syntax pattern"),
                K = /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/,
                W = _e([
                    ["!", "/"],
                    [":", "@"],
                    ["[", "^"], "`", ["{", "~"],
                    ["¡", "§"], "©", "«", "¬", "®", "°", "±", "¶", "»", "¿", "×", "÷", ["‐", "‧"],
                    ["‰", "‾"],
                    ["⁁", "⁓"],
                    ["⁕", "⁞"],
                    ["←", "⑟"],
                    ["─", "❵"],
                    ["➔", "⯿"],
                    ["⸀", "⹿"],
                    ["、", "〃"],
                    ["〈", "〠"], "〰", "﴾", "﴿", "﹅", "﹆"
                ], !1, !1),
                X = je("optional whitespace"),
                J = je("number"),
                Q = Ae("-", !1),
                ee = je("double apostrophes"),
                te = Ae("''", !1),
                re = Ae("\n", !1),
                ne = je("argNameOrNumber"),
                ae = je("validTag"),
                oe = je("argNumber"),
                ie = Ae("0", !1),
                se = /^[1-9]/,
                ce = _e([
                    ["1", "9"]
                ], !1, !1),
                le = /^[0-9]/,
                ue = _e([
                    ["0", "9"]
                ], !1, !1),
                fe = je("argName"),
                de = je("tagName"),
                me = 0,
                pe = 0,
                he = [{
                    line: 1,
                    column: 1
                }],
                ge = 0,
                ye = [],
                ve = 0;
            if (void 0 !== t.startRule) {
                if (!(t.startRule in a)) throw new Error("Can't start parsing from rule \"" + t.startRule + '".');
                o = a[t.startRule]
            }

            function be() {
                return e.substring(pe, me)
            }

            function Me() {
                return Ee(pe, me)
            }

            function we(e, t) {
                throw (function(e, t) {
                    return new F(e, [], "", t)
                })(e, t = void 0 !== t ? t : Ee(pe, me))
            }

            function Ae(e, t) {
                return {
                    type: "literal",
                    text: e,
                    ignoreCase: t
                }
            }

            function _e(e, t, r) {
                return {
                    type: "class",
                    parts: e,
                    inverted: t,
                    ignoreCase: r
                }
            }

            function je(e) {
                return {
                    type: "other",
                    description: e
                }
            }

            function Te(t) {
                var r, n = he[t];
                if (n) return n;
                for (r = t - 1; !he[r];) r--;
                for (n = {
                        line: (n = he[r]).line,
                        column: n.column
                    }; r < t;) 10 === e.charCodeAt(r) ? (n.line++, n.column = 1) : n.column++, r++;
                return he[t] = n, n
            }

            function Ee(e, t) {
                var r = Te(e),
                    n = Te(t);
                return {
                    start: {
                        offset: e,
                        line: r.line,
                        column: r.column
                    },
                    end: {
                        offset: t,
                        line: n.line,
                        column: n.column
                    }
                }
            }

            function Ce(e) {
                me < ge || (me > ge && (ge = me, ye = []), ye.push(e))
            }

            function ke() {
                return Oe()
            }

            function Oe() {
                var e, t;
                for (e = [], t = Se(); t !== n;) e.push(t), t = Se();
                return e
            }

            function Se() {
                var t;
                return (t = (function() {
                    var e, t;
                    e = me, (t = Ie()) !== n && (pe = e, r = t, t = D({
                        type: y.literal,
                        value: r
                    }, rt()));
                    var r;
                    return e = t
                })()) === n && (t = (function() {
                    var t, r, a, o;
                    ve++, t = me, 123 === e.charCodeAt(me) ? (r = "{", me++) : (r = n, 0 === ve && Ce(p));
                    r !== n && He() !== n && (a = Ge()) !== n && He() !== n ? (125 === e.charCodeAt(me) ? (o = "}", me++) : (o = n, 0 === ve && Ce(h)), o !== n ? (pe = t, i = a, r = D({
                        type: y.argument,
                        value: i
                    }, rt()), t = r) : (me = t, t = n)) : (me = t, t = n);
                    var i;
                    ve--, t === n && (r = n, 0 === ve && Ce(m));
                    return t
                })()) === n && (t = (function() {
                    var t;
                    (t = (function() {
                        var t, r, a, o, i, s, c, l, u;
                        t = me, 123 === e.charCodeAt(me) ? (r = "{", me++) : (r = n, 0 === ve && Ce(p));
                        r !== n && He() !== n && (a = Ge()) !== n && He() !== n ? (44 === e.charCodeAt(me) ? (o = ",", me++) : (o = n, 0 === ve && Ce(E)), o !== n && He() !== n ? ("number" === e.substr(me, 6) ? (i = "number", me += 6) : (i = n, 0 === ve && Ce(C)), i !== n && He() !== n ? (s = me, 44 === e.charCodeAt(me) ? (c = ",", me++) : (c = n, 0 === ve && Ce(E)), c !== n && (l = He()) !== n && (u = (function() {
                            var t, r, a;
                            t = me, "::" === e.substr(me, 2) ? (r = "::", me += 2) : (r = n, 0 === ve && Ce(j));
                            r !== n && (a = (function() {
                                var e, t, r;
                                if (e = me, t = [], (r = xe()) !== n)
                                    for (; r !== n;) t.push(r), r = xe();
                                else t = n;
                                t !== n && (pe = e, t = D({
                                    type: 0,
                                    tokens: t
                                }, rt()));
                                return e = t
                            })()) !== n ? (pe = t, t = r = a) : (me = t, t = n);
                            t === n && (t = me, pe = me, Qe.push("numberArgStyle"), (r = (r = !0) ? void 0 : n) !== n && (a = Ie()) !== n ? (pe = t, r = T(a), t = r) : (me = t, t = n));
                            return t
                        })()) !== n ? s = c = [c, l, u] : (me = s, s = n), s === n && (s = null), s !== n && (c = He()) !== n ? (125 === e.charCodeAt(me) ? (l = "}", me++) : (l = n, 0 === ve && Ce(h)), l !== n ? (pe = t, r = k(a, i, s), t = r) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n);
                        return t
                    })()) === n && (t = (function() {
                        var t, r, a, o, i, s, c, l, u;
                        t = me, 123 === e.charCodeAt(me) ? (r = "{", me++) : (r = n, 0 === ve && Ce(p));
                        r !== n && He() !== n && (a = Ge()) !== n && He() !== n ? (44 === e.charCodeAt(me) ? (o = ",", me++) : (o = n, 0 === ve && Ce(E)), o !== n && He() !== n ? ("date" === e.substr(me, 4) ? (i = "date", me += 4) : (i = n, 0 === ve && Ce(L)), i === n && ("time" === e.substr(me, 4) ? (i = "time", me += 4) : (i = n, 0 === ve && Ce(B))), i !== n && He() !== n ? (s = me, 44 === e.charCodeAt(me) ? (c = ",", me++) : (c = n, 0 === ve && Ce(E)), c !== n && (l = He()) !== n && (u = (function() {
                            var t, r, a;
                            t = me, "::" === e.substr(me, 2) ? (r = "::", me += 2) : (r = n, 0 === ve && Ce(j));
                            r !== n && (a = (function() {
                                var t, r, a, o;
                                t = me, r = me, a = [], (o = Re()) === n && (o = Pe());
                                if (o !== n)
                                    for (; o !== n;) a.push(o), (o = Re()) === n && (o = Pe());
                                else a = n;
                                r = a !== n ? e.substring(r, me) : a;
                                r !== n && (pe = t, r = D({
                                    type: 1,
                                    pattern: r
                                }, rt()));
                                return t = r
                            })()) !== n ? (pe = t, t = r = a) : (me = t, t = n);
                            t === n && (t = me, pe = me, Qe.push("dateOrTimeArgStyle"), (r = (r = !0) ? void 0 : n) !== n && (a = Ie()) !== n ? (pe = t, r = T(a), t = r) : (me = t, t = n));
                            return t
                        })()) !== n ? s = c = [c, l, u] : (me = s, s = n), s === n && (s = null), s !== n && (c = He()) !== n ? (125 === e.charCodeAt(me) ? (l = "}", me++) : (l = n, 0 === ve && Ce(h)), l !== n ? (pe = t, r = k(a, i, s), t = r) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n);
                        return t
                    })());
                    return t
                })()) === n && (t = (function() {
                    var t, r, a, o, i, s, c, l, u, f, d;
                    t = me, 123 === e.charCodeAt(me) ? (r = "{", me++) : (r = n, 0 === ve && Ce(p));
                    if (r !== n)
                        if (He() !== n)
                            if ((a = Ge()) !== n)
                                if (He() !== n)
                                    if (44 === e.charCodeAt(me) ? (o = ",", me++) : (o = n, 0 === ve && Ce(E)), o !== n)
                                        if (He() !== n)
                                            if ("plural" === e.substr(me, 6) ? (i = "plural", me += 6) : (i = n, 0 === ve && Ce(U)), i === n && ("selectordinal" === e.substr(me, 13) ? (i = "selectordinal", me += 13) : (i = n, 0 === ve && Ce(H))), i !== n)
                                                if (He() !== n)
                                                    if (44 === e.charCodeAt(me) ? (s = ",", me++) : (s = n, 0 === ve && Ce(E)), s !== n)
                                                        if (He() !== n)
                                                            if (c = me, "offset:" === e.substr(me, 7) ? (l = "offset:", me += 7) : (l = n, 0 === ve && Ce(q)), l !== n && (u = He()) !== n && (f = qe()) !== n ? c = l = [l, u, f] : (me = c, c = n), c === n && (c = null), c !== n)
                                                                if ((l = He()) !== n) {
                                                                    if (u = [], (f = Le()) !== n)
                                                                        for (; f !== n;) u.push(f), f = Le();
                                                                    else u = n;
                                                                    u !== n && (f = He()) !== n ? (125 === e.charCodeAt(me) ? (d = "}", me++) : (d = n, 0 === ve && Ce(h)), d !== n ? (pe = t, r = (function(e, t, r, n) {
                                                                        return D({
                                                                            type: y.plural,
                                                                            pluralType: "plural" === t ? "cardinal" : "ordinal",
                                                                            value: e,
                                                                            offset: r ? r[2] : 0,
                                                                            options: n.reduce((function(e, t) {
                                                                                var r = t.id,
                                                                                    n = t.value,
                                                                                    a = t.location;
                                                                                return r in e && we('Duplicate option "' + r + '" in plural element: "' + be() + '"', Me()), e[r] = {
                                                                                    value: n,
                                                                                    location: a
                                                                                }, e
                                                                            }), {})
                                                                        }, rt())
                                                                    })(a, i, c, u), t = r) : (me = t, t = n)) : (me = t, t = n)
                                                                } else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    return t
                })()) === n && (t = (function() {
                    var t, r, a, o, i, s, c, l, u;
                    t = me, 123 === e.charCodeAt(me) ? (r = "{", me++) : (r = n, 0 === ve && Ce(p));
                    if (r !== n)
                        if (He() !== n)
                            if ((a = Ge()) !== n)
                                if (He() !== n)
                                    if (44 === e.charCodeAt(me) ? (o = ",", me++) : (o = n, 0 === ve && Ce(E)), o !== n)
                                        if (He() !== n)
                                            if ("select" === e.substr(me, 6) ? (i = "select", me += 6) : (i = n, 0 === ve && Ce(z)), i !== n)
                                                if (He() !== n)
                                                    if (44 === e.charCodeAt(me) ? (s = ",", me++) : (s = n, 0 === ve && Ce(E)), s !== n)
                                                        if (He() !== n) {
                                                            if (c = [], (l = Ne()) !== n)
                                                                for (; l !== n;) c.push(l), l = Ne();
                                                            else c = n;
                                                            c !== n && (l = He()) !== n ? (125 === e.charCodeAt(me) ? (u = "}", me++) : (u = n, 0 === ve && Ce(h)), u !== n ? (pe = t, r = (function(e, t) {
                                                                return D({
                                                                    type: y.select,
                                                                    value: e,
                                                                    options: t.reduce((function(e, t) {
                                                                        var r = t.id,
                                                                            n = t.value,
                                                                            a = t.location;
                                                                        return r in e && we('Duplicate option "' + r + '" in select element: "' + be() + '"', Me()), e[r] = {
                                                                            value: n,
                                                                            location: a
                                                                        }, e
                                                                    }), {})
                                                                }, rt())
                                                            })(a, c), t = r) : (me = t, t = n)) : (me = t, t = n)
                                                        } else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    else me = t, t = n;
                    return t
                })()) === n && (t = (function() {
                    var t, r, a, o, i, m;
                    ve++, t = me, r = me, 60 === e.charCodeAt(me) ? (a = "<", me++) : (a = n, 0 === ve && Ce(c));
                    a !== n && (o = $e()) !== n && (i = He()) !== n ? ("/>" === e.substr(me, 2) ? (m = "/>", me += 2) : (m = n, 0 === ve && Ce(l)), m !== n ? r = a = [a, o, i, m] : (me = r, r = n)) : (me = r, r = n);
                    r !== n && (pe = t, p = r, r = D({
                        type: y.literal,
                        value: p.join("")
                    }, rt()));
                    var p;
                    (t = r) === n && (t = me, (r = (function() {
                        var t, r, a, o;
                        t = me, 60 === e.charCodeAt(me) ? (r = "<", me++) : (r = n, 0 === ve && Ce(c));
                        r !== n ? (pe = me, Qe.push("openingTag"), (!0 ? void 0 : n) !== n && (a = $e()) !== n ? (62 === e.charCodeAt(me) ? (o = ">", me++) : (o = n, 0 === ve && Ce(u)), o !== n ? (pe = me, (f() ? void 0 : n) !== n ? (pe = t, t = r = a) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n);
                        return t
                    })()) !== n && (a = Oe()) !== n && (o = (function() {
                        var t, r, a, o;
                        t = me, "</" === e.substr(me, 2) ? (r = "</", me += 2) : (r = n, 0 === ve && Ce(d));
                        r !== n ? (pe = me, Qe.push("closingTag"), (!0 ? void 0 : n) !== n && (a = $e()) !== n ? (62 === e.charCodeAt(me) ? (o = ">", me++) : (o = n, 0 === ve && Ce(u)), o !== n ? (pe = me, (f() ? void 0 : n) !== n ? (pe = t, t = r = a) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n);
                        return t
                    })()) !== n ? (pe = t, g = a, (h = r) !== (v = o) && we('Mismatch tag "' + h + '" !== "' + v + '"', Me()), r = D({
                        type: y.tag,
                        value: h,
                        children: g
                    }, rt()), t = r) : (me = t, t = n));
                    var h, g, v;
                    ve--, t === n && (r = n, 0 === ve && Ce(s));
                    return t
                })()) === n && (t = (function() {
                    var t, r;
                    t = me, 35 === e.charCodeAt(me) ? (r = "#", me++) : (r = n, 0 === ve && Ce(i));
                    r !== n && (pe = t, r = D({
                        type: y.pound
                    }, rt()));
                    return t = r
                })()), t
            }

            function Ie() {
                var e, t, r;
                if (e = me, t = [], (r = ze()) === n && (r = Ye()) === n && (r = Ve()), r !== n)
                    for (; r !== n;) t.push(r), (r = ze()) === n && (r = Ye()) === n && (r = Ve());
                else t = n;
                return t !== n && (pe = e, t = t.join("")), e = t
            }

            function De() {
                var t, r, a, o, i;
                if (ve++, t = me, r = [], a = me, o = me, ve++, (i = Be()) === n && (v.test(e.charAt(me)) ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(b))), ve--, i === n ? o = void 0 : (me = o, o = n), o !== n ? (e.length > me ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(M)), i !== n ? a = o = [o, i] : (me = a, a = n)) : (me = a, a = n), a !== n)
                    for (; a !== n;) r.push(a), a = me, o = me, ve++, (i = Be()) === n && (v.test(e.charAt(me)) ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(b))), ve--, i === n ? o = void 0 : (me = o, o = n), o !== n ? (e.length > me ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(M)), i !== n ? a = o = [o, i] : (me = a, a = n)) : (me = a, a = n);
                else r = n;
                return t = r !== n ? e.substring(t, me) : r, ve--, t === n && (r = n, 0 === ve && Ce(g)), t
            }

            function Fe() {
                var t, r, a;
                return ve++, t = me, 47 === e.charCodeAt(me) ? (r = "/", me++) : (r = n, 0 === ve && Ce(A)), r !== n && (a = De()) !== n ? (pe = t, t = r = a) : (me = t, t = n), ve--, t === n && (r = n, 0 === ve && Ce(w)), t
            }

            function xe() {
                var e, t, r, a;
                if (ve++, e = me, He() !== n)
                    if ((t = De()) !== n) {
                        for (r = [], a = Fe(); a !== n;) r.push(a), a = Fe();
                        r !== n ? (pe = e, e = (function(e, t) {
                            return {
                                stem: e,
                                options: t
                            }
                        })(t, r)) : (me = e, e = n)
                    } else me = e, e = n;
                else me = e, e = n;
                return ve--, e === n && (n, 0 === ve && Ce(_)), e
            }

            function Re() {
                var t, r, a, o;
                if (t = me, 39 === e.charCodeAt(me) ? (r = "'", me++) : (r = n, 0 === ve && Ce(O)), r !== n) {
                    if (a = [], (o = ze()) === n && (S.test(e.charAt(me)) ? (o = e.charAt(me), me++) : (o = n, 0 === ve && Ce(I))), o !== n)
                        for (; o !== n;) a.push(o), (o = ze()) === n && (S.test(e.charAt(me)) ? (o = e.charAt(me), me++) : (o = n, 0 === ve && Ce(I)));
                    else a = n;
                    a !== n ? (39 === e.charCodeAt(me) ? (o = "'", me++) : (o = n, 0 === ve && Ce(O)), o !== n ? t = r = [r, a, o] : (me = t, t = n)) : (me = t, t = n)
                } else me = t, t = n;
                if (t === n)
                    if (t = [], (r = ze()) === n && (x.test(e.charAt(me)) ? (r = e.charAt(me), me++) : (r = n, 0 === ve && Ce(R))), r !== n)
                        for (; r !== n;) t.push(r), (r = ze()) === n && (x.test(e.charAt(me)) ? (r = e.charAt(me), me++) : (r = n, 0 === ve && Ce(R)));
                    else t = n;
                return t
            }

            function Pe() {
                var t, r;
                if (t = [], P.test(e.charAt(me)) ? (r = e.charAt(me), me++) : (r = n, 0 === ve && Ce(N)), r !== n)
                    for (; r !== n;) t.push(r), P.test(e.charAt(me)) ? (r = e.charAt(me), me++) : (r = n, 0 === ve && Ce(N));
                else t = n;
                return t
            }

            function Ne() {
                var t, r, a, o, i, s, c;
                return t = me, He() !== n && (r = Ke()) !== n && He() !== n ? (123 === e.charCodeAt(me) ? (a = "{", me++) : (a = n, 0 === ve && Ce(p)), a !== n ? (pe = me, Qe.push("select"), (!0 ? void 0 : n) !== n && (o = Oe()) !== n ? (125 === e.charCodeAt(me) ? (i = "}", me++) : (i = n, 0 === ve && Ce(h)), i !== n ? (pe = t, s = r, c = o, Qe.pop(), t = D({
                    id: s,
                    value: c
                }, rt())) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n), t
            }

            function Le() {
                var t, r, a, o, i, s, c;
                return t = me, He() !== n && (r = (function() {
                    var t, r, a, o;
                    return t = me, r = me, 61 === e.charCodeAt(me) ? (a = "=", me++) : (a = n, 0 === ve && Ce(Y)), a !== n && (o = qe()) !== n ? r = a = [a, o] : (me = r, r = n), (t = r !== n ? e.substring(t, me) : r) === n && (t = Ke()), t
                })()) !== n && He() !== n ? (123 === e.charCodeAt(me) ? (a = "{", me++) : (a = n, 0 === ve && Ce(p)), a !== n ? (pe = me, Qe.push("plural"), (!0 ? void 0 : n) !== n && (o = Oe()) !== n ? (125 === e.charCodeAt(me) ? (i = "}", me++) : (i = n, 0 === ve && Ce(h)), i !== n ? (pe = t, s = r, c = o, Qe.pop(), t = D({
                    id: s,
                    value: c
                }, rt())) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n)) : (me = t, t = n), t
            }

            function Be() {
                var t;
                return ve++, G.test(e.charAt(me)) ? (t = e.charAt(me), me++) : (t = n, 0 === ve && Ce($)), ve--, t === n && 0 === ve && Ce(V), t
            }

            function Ue() {
                var t;
                return ve++, K.test(e.charAt(me)) ? (t = e.charAt(me), me++) : (t = n, 0 === ve && Ce(W)), ve--, t === n && 0 === ve && Ce(Z), t
            }

            function He() {
                var t, r, a;
                for (ve++, t = me, r = [], a = Be(); a !== n;) r.push(a), a = Be();
                return t = r !== n ? e.substring(t, me) : r, ve--, t === n && (r = n, 0 === ve && Ce(X)), t
            }

            function qe() {
                var t, r, a, o, i;
                return ve++, t = me, 45 === e.charCodeAt(me) ? (r = "-", me++) : (r = n, 0 === ve && Ce(Q)), r === n && (r = null), r !== n && (a = Ze()) !== n ? (pe = t, o = r, t = r = (i = a) ? o ? -i : i : 0) : (me = t, t = n), ve--, t === n && (r = n, 0 === ve && Ce(J)), t
            }

            function ze() {
                var t, r;
                return ve++, t = me, "''" === e.substr(me, 2) ? (r = "''", me += 2) : (r = n, 0 === ve && Ce(te)), r !== n && (pe = t, r = "'"), ve--, (t = r) === n && (r = n, 0 === ve && Ce(ee)), t
            }

            function Ye() {
                var t, r, a, o, i, s;
                if (t = me, 39 === e.charCodeAt(me) ? (r = "'", me++) : (r = n, 0 === ve && Ce(O)), r !== n)
                    if ((a = (function() {
                            var t, r, a, o;
                            t = me, r = me, e.length > me ? (a = e.charAt(me), me++) : (a = n, 0 === ve && Ce(M));
                            a !== n ? (pe = me, (o = (o = (function(e) {
                                return "<" === e || ">" === e || "{" === e || "}" === e || tt() && "#" === e
                            })(a)) ? void 0 : n) !== n ? r = a = [a, o] : (me = r, r = n)) : (me = r, r = n);
                            t = r !== n ? e.substring(t, me) : r;
                            return t
                        })()) !== n) {
                        for (o = me, i = [], "''" === e.substr(me, 2) ? (s = "''", me += 2) : (s = n, 0 === ve && Ce(te)), s === n && (S.test(e.charAt(me)) ? (s = e.charAt(me), me++) : (s = n, 0 === ve && Ce(I))); s !== n;) i.push(s), "''" === e.substr(me, 2) ? (s = "''", me += 2) : (s = n, 0 === ve && Ce(te)), s === n && (S.test(e.charAt(me)) ? (s = e.charAt(me), me++) : (s = n, 0 === ve && Ce(I)));
                        (o = i !== n ? e.substring(o, me) : i) !== n ? (39 === e.charCodeAt(me) ? (i = "'", me++) : (i = n, 0 === ve && Ce(O)), i === n && (i = null), i !== n ? (pe = t, t = r = a + o.replace("''", "'")) : (me = t, t = n)) : (me = t, t = n)
                    } else me = t, t = n;
                else me = t, t = n;
                return t
            }

            function Ve() {
                var t, r, a, o;
                return t = me, r = me, e.length > me ? (a = e.charAt(me), me++) : (a = n, 0 === ve && Ce(M)), a !== n ? (pe = me, (o = (o = (function(e) {
                    return !("<" === e || "{" === e || tt() && "#" === e || et() && "}" === e || et() && ">" === e)
                })(a)) ? void 0 : n) !== n ? r = a = [a, o] : (me = r, r = n)) : (me = r, r = n), r === n && (10 === e.charCodeAt(me) ? (r = "\n", me++) : (r = n, 0 === ve && Ce(re))), t = r !== n ? e.substring(t, me) : r
            }

            function Ge() {
                var t, r;
                return ve++, t = me, (r = Ze()) === n && (r = Ke()), t = r !== n ? e.substring(t, me) : r, ve--, t === n && (r = n, 0 === ve && Ce(ne)), t
            }

            function $e() {
                var t, r;
                return ve++, t = me, (r = Ze()) === n && (r = (function() {
                    var t, r, a, o, i;
                    ve++, t = me, r = [], 45 === e.charCodeAt(me) ? (a = "-", me++) : (a = n, 0 === ve && Ce(Q));
                    a === n && (a = me, o = me, ve++, (i = Be()) === n && (i = Ue()), ve--, i === n ? o = void 0 : (me = o, o = n), o !== n ? (e.length > me ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(M)), i !== n ? a = o = [o, i] : (me = a, a = n)) : (me = a, a = n));
                    if (a !== n)
                        for (; a !== n;) r.push(a), 45 === e.charCodeAt(me) ? (a = "-", me++) : (a = n, 0 === ve && Ce(Q)), a === n && (a = me, o = me, ve++, (i = Be()) === n && (i = Ue()), ve--, i === n ? o = void 0 : (me = o, o = n), o !== n ? (e.length > me ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(M)), i !== n ? a = o = [o, i] : (me = a, a = n)) : (me = a, a = n));
                    else r = n;
                    t = r !== n ? e.substring(t, me) : r;
                    ve--, t === n && (r = n, 0 === ve && Ce(de));
                    return t
                })()), t = r !== n ? e.substring(t, me) : r, ve--, t === n && (r = n, 0 === ve && Ce(ae)), t
            }

            function Ze() {
                var t, r, a, o, i;
                if (ve++, t = me, 48 === e.charCodeAt(me) ? (r = "0", me++) : (r = n, 0 === ve && Ce(ie)), r !== n && (pe = t, r = 0), (t = r) === n) {
                    if (t = me, r = me, se.test(e.charAt(me)) ? (a = e.charAt(me), me++) : (a = n, 0 === ve && Ce(ce)), a !== n) {
                        for (o = [], le.test(e.charAt(me)) ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(ue)); i !== n;) o.push(i), le.test(e.charAt(me)) ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(ue));
                        o !== n ? r = a = [a, o] : (me = r, r = n)
                    } else me = r, r = n;
                    r !== n && (pe = t, r = parseInt(r.join(""), 10)), t = r
                }
                return ve--, t === n && (r = n, 0 === ve && Ce(oe)), t
            }

            function Ke() {
                var t, r, a, o, i;
                if (ve++, t = me, r = [], a = me, o = me, ve++, (i = Be()) === n && (i = Ue()), ve--, i === n ? o = void 0 : (me = o, o = n), o !== n ? (e.length > me ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(M)), i !== n ? a = o = [o, i] : (me = a, a = n)) : (me = a, a = n), a !== n)
                    for (; a !== n;) r.push(a), a = me, o = me, ve++, (i = Be()) === n && (i = Ue()), ve--, i === n ? o = void 0 : (me = o, o = n), o !== n ? (e.length > me ? (i = e.charAt(me), me++) : (i = n, 0 === ve && Ce(M)), i !== n ? a = o = [o, i] : (me = a, a = n)) : (me = a, a = n);
                else r = n;
                return t = r !== n ? e.substring(t, me) : r, ve--, t === n && (r = n, 0 === ve && Ce(fe)), t
            }
            var We, Xe, Je, Qe = ["root"];

            function et() {
                return Qe.length > 1
            }

            function tt() {
                return "plural" === Qe[Qe.length - 1]
            }

            function rt() {
                return t && t.captureLocation ? {
                    location: Me()
                } : {}
            }
            if ((r = o()) !== n && me === e.length) return r;
            throw r !== n && me < e.length && Ce({
                type: "end"
            }), We = ye, Xe = ge < e.length ? e.charAt(ge) : null, Je = ge < e.length ? Ee(ge, ge + 1) : Ee(ge, ge), new F(F.buildMessage(We, Xe), We, Xe, Je)
        },
        R = function() {
            for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
            var n = Array(e),
                a = 0;
            for (t = 0; t < r; t++)
                for (var o = arguments[t], i = 0, s = o.length; i < s; i++, a++) n[a] = o[i];
            return n
        },
        P = /(^|[^\\])#/g;
    var N = function() {
            return (N = Object.assign || function(e) {
                for (var t, r = 1, n = arguments.length; r < n; r++)
                    for (var a in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
                return e
            }).apply(this, arguments)
        },
        L = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;

    function B(e) {
        var t = {};
        return e.replace(L, (function(e) {
            var r = e.length;
            switch (e[0]) {
                case "G":
                    t.era = 4 === r ? "long" : 5 === r ? "narrow" : "short";
                    break;
                case "y":
                    t.year = 2 === r ? "2-digit" : "numeric";
                    break;
                case "Y":
                case "u":
                case "U":
                case "r":
                    throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
                case "q":
                case "Q":
                    throw new RangeError("`q/Q` (quarter) patterns are not supported");
                case "M":
                case "L":
                    t.month = ["numeric", "2-digit", "short", "long", "narrow"][r - 1];
                    break;
                case "w":
                case "W":
                    throw new RangeError("`w/W` (week) patterns are not supported");
                case "d":
                    t.day = ["numeric", "2-digit"][r - 1];
                    break;
                case "D":
                case "F":
                case "g":
                    throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
                case "E":
                    t.weekday = 4 === r ? "short" : 5 === r ? "narrow" : "short";
                    break;
                case "e":
                    if (r < 4) throw new RangeError("`e..eee` (weekday) patterns are not supported");
                    t.weekday = ["short", "long", "narrow", "short"][r - 4];
                    break;
                case "c":
                    if (r < 4) throw new RangeError("`c..ccc` (weekday) patterns are not supported");
                    t.weekday = ["short", "long", "narrow", "short"][r - 4];
                    break;
                case "a":
                    t.hour12 = !0;
                    break;
                case "b":
                case "B":
                    throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
                case "h":
                    t.hourCycle = "h12", t.hour = ["numeric", "2-digit"][r - 1];
                    break;
                case "H":
                    t.hourCycle = "h23", t.hour = ["numeric", "2-digit"][r - 1];
                    break;
                case "K":
                    t.hourCycle = "h11", t.hour = ["numeric", "2-digit"][r - 1];
                    break;
                case "k":
                    t.hourCycle = "h24", t.hour = ["numeric", "2-digit"][r - 1];
                    break;
                case "j":
                case "J":
                case "C":
                    throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
                case "m":
                    t.minute = ["numeric", "2-digit"][r - 1];
                    break;
                case "s":
                    t.second = ["numeric", "2-digit"][r - 1];
                    break;
                case "S":
                case "A":
                    throw new RangeError("`S/A` (second) pattenrs are not supported, use `s` instead");
                case "z":
                    t.timeZoneName = r < 4 ? "short" : "long";
                    break;
                case "Z":
                case "O":
                case "v":
                case "V":
                case "X":
                case "x":
                    throw new RangeError("`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead")
            }
            return ""
        })), t
    }
    var U = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g,
        H = /^(@+)?(\+|#+)?$/g;

    function q(e) {
        var t = {};
        return e.replace(H, (function(e, r, n) {
            return "string" != typeof n ? (t.minimumSignificantDigits = r.length, t.maximumSignificantDigits = r.length) : "+" === n ? t.minimumSignificantDigits = r.length : "#" === r[0] ? t.maximumSignificantDigits = r.length : (t.minimumSignificantDigits = r.length, t.maximumSignificantDigits = r.length + ("string" == typeof n ? n.length : 0)), ""
        })), t
    }

    function z(e) {
        switch (e) {
            case "sign-auto":
                return {
                    signDisplay: "auto"
                };
            case "sign-accounting":
                return {
                    currencySign: "accounting"
                };
            case "sign-always":
                return {
                    signDisplay: "always"
                };
            case "sign-accounting-always":
                return {
                    signDisplay: "always",
                    currencySign: "accounting"
                };
            case "sign-except-zero":
                return {
                    signDisplay: "exceptZero"
                };
            case "sign-accounting-except-zero":
                return {
                    signDisplay: "exceptZero",
                    currencySign: "accounting"
                };
            case "sign-never":
                return {
                    signDisplay: "never"
                }
        }
    }

    function Y(e) {
        var t = z(e);
        return t || {}
    }

    function V(e) {
        for (var t = {}, r = 0, n = e; r < n.length; r++) {
            var a = n[r];
            switch (a.stem) {
                case "percent":
                    t.style = "percent";
                    continue;
                case "currency":
                    t.style = "currency", t.currency = a.options[0];
                    continue;
                case "group-off":
                    t.useGrouping = !1;
                    continue;
                case "precision-integer":
                case ".":
                    t.maximumFractionDigits = 0;
                    continue;
                case "measure-unit":
                    t.style = "unit", t.unit = a.options[0].replace(/^(.*?)-/, "");
                    continue;
                case "compact-short":
                    t.notation = "compact", t.compactDisplay = "short";
                    continue;
                case "compact-long":
                    t.notation = "compact", t.compactDisplay = "long";
                    continue;
                case "scientific":
                    t = N(N(N({}, t), {
                        notation: "scientific"
                    }), a.options.reduce((function(e, t) {
                        return N(N({}, e), Y(t))
                    }), {}));
                    continue;
                case "engineering":
                    t = N(N(N({}, t), {
                        notation: "engineering"
                    }), a.options.reduce((function(e, t) {
                        return N(N({}, e), Y(t))
                    }), {}));
                    continue;
                case "notation-simple":
                    t.notation = "standard";
                    continue;
                case "unit-width-narrow":
                    t.currencyDisplay = "narrowSymbol", t.unitDisplay = "narrow";
                    continue;
                case "unit-width-short":
                    t.currencyDisplay = "code", t.unitDisplay = "short";
                    continue;
                case "unit-width-full-name":
                    t.currencyDisplay = "name", t.unitDisplay = "long";
                    continue;
                case "unit-width-iso-code":
                    t.currencyDisplay = "symbol";
                    continue
            }
            if (U.test(a.stem)) {
                if (a.options.length > 1) throw new RangeError("Fraction-precision stems only accept a single optional option");
                a.stem.replace(U, (function(e, r, n, a, o, i) {
                    return "*" === n ? t.minimumFractionDigits = r.length : a && "#" === a[0] ? t.maximumFractionDigits = a.length : o && i ? (t.minimumFractionDigits = o.length, t.maximumFractionDigits = o.length + i.length) : (t.minimumFractionDigits = r.length, t.maximumFractionDigits = r.length), ""
                })), a.options.length && (t = N(N({}, t), q(a.options[0])))
            } else if (H.test(a.stem)) t = N(N({}, t), q(a.stem));
            else {
                var o = z(a.stem);
                o && (t = N(N({}, t), o))
            }
        }
        return t
    }

    function G(e, t) {
        var r = x(e, t);
        return t && !1 === t.normalizeHashtagInPlural || (function e(t) {
            t.forEach((function(t) {
                (T(t) || j(t)) && Object.keys(t.options).forEach((function(r) {
                    for (var n, a = t.options[r], o = -1, i = void 0, s = 0; s < a.value.length; s++) {
                        var c = a.value[s];
                        if (b(c) && P.test(c.value)) {
                            o = s, i = c;
                            break
                        }
                    }
                    if (i) {
                        var l = i.value.replace(P, "$1{" + t.value + ", number}"),
                            u = x(l);
                        (n = a.value).splice.apply(n, R([o, 1], u))
                    }
                    e(a.value)
                }))
            }))
        })(r), r
    }
    var $ = function() {
        for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
        var n = Array(e),
            a = 0;
        for (t = 0; t < r; t++)
            for (var o = arguments[t], i = 0, s = o.length; i < s; i++, a++) n[a] = o[i];
        return n
    };

    function Z(e) {
        return JSON.stringify(e.map((function(e) {
            return e && "object" === r(e) ? (t = e, Object.keys(t).sort().map((function(e) {
                var r;
                return (r = {})[e] = t[e], r
            }))) : e;
            var t
        })))
    }
    var K, W = function(e, t) {
            return void 0 === t && (t = {}),
                function() {
                    for (var r, n = [], a = 0; a < arguments.length; a++) n[a] = arguments[a];
                    var o = Z(n),
                        i = o && t[o];
                    return i || (i = new((r = e).bind.apply(r, $([void 0], n))), o && (t[o] = i)), i
                }
        },
        X = (function() {
            var e = function(t, r) {
                return (e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(e, t) {
                        e.__proto__ = t
                    } || function(e, t) {
                        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                    })(t, r)
            };
            return function(t, r) {
                function n() {
                    this.constructor = t
                }
                e(t, r), t.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
            }
        })();
    (function(e) {
        e.MISSING_VALUE = "MISSING_VALUE", e.INVALID_VALUE = "INVALID_VALUE", e.MISSING_INTL_API = "MISSING_INTL_API"
    })(K || (K = {}));
    var J, Q = (function(e) {
            function t(t, r, n) {
                var a = e.call(this, t) || this;
                return a.code = r, a.originalMessage = n, a
            }
            return X(t, e), t.prototype.toString = function() {
                return "[formatjs Error: " + this.code + "] " + this.message
            }, t
        })(Error),
        ee = (function(e) {
            function t(t, r, n, a) {
                return e.call(this, 'Invalid values for "' + t + '": "' + r + '". Options are "' + Object.keys(n).join('", "') + '"', "INVALID_VALUE", a) || this
            }
            return X(t, e), t
        })(Q),
        te = (function(e) {
            function t(t, r, n) {
                return e.call(this, 'Value for "' + t + '" must be of type ' + r, "INVALID_VALUE", n) || this
            }
            return X(t, e), t
        })(Q),
        re = (function(e) {
            function t(t, r) {
                return e.call(this, 'The intl string context variable "' + t + '" was not provided to the string "' + r + '"', "MISSING_VALUE", r) || this
            }
            return X(t, e), t
        })(Q);

    function ne(e) {
        return "function" == typeof e
    }(function(e) {
        e[e.literal = 0] = "literal", e[e.object = 1] = "object"
    })(J || (J = {}));
    var ae = function() {
        return (ae = Object.assign || function(e) {
            for (var t, r = 1, n = arguments.length; r < n; r++)
                for (var a in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e
        }).apply(this, arguments)
    };

    function oe(e, t) {
        return t ? Object.keys(e).reduce((function(r, n) {
            var a, o;
            return r[n] = (a = e[n], (o = t[n]) ? ae(ae(ae({}, a || {}), o || {}), Object.keys(a).reduce((function(e, t) {
                return e[t] = ae(ae({}, a[t]), o[t] || {}), e
            }), {})) : a), r
        }), ae({}, e)) : e
    }
    var ie, se = (function() {
        function e(t, r, n, a) {
            var o, i = this;
            if (void 0 === r && (r = e.defaultLocale), this.formatterCache = {
                    number: {},
                    dateTime: {},
                    pluralRules: {}
                }, this.format = function(e) {
                    var t = i.formatToParts(e);
                    if (1 === t.length) return t[0].value;
                    var r = t.reduce((function(e, t) {
                        return e.length && 0 === t.type && "string" == typeof e[e.length - 1] ? e[e.length - 1] += t.value : e.push(t.value), e
                    }), []);
                    return r.length <= 1 ? r[0] || "" : r
                }, this.formatToParts = function(e) {
                    return (function e(t, r, n, a, o, i, s) {
                        if (1 === t.length && b(t[0])) return [{
                            type: 0,
                            value: t[0].value
                        }];
                        for (var c = [], l = 0, u = t; l < u.length; l++) {
                            var f = u[l];
                            if (b(f)) c.push({
                                type: 0,
                                value: f.value
                            });
                            else if (E(f)) "number" == typeof i && c.push({
                                type: 0,
                                value: n.getNumberFormat(r).format(i)
                            });
                            else {
                                var d = f.value;
                                if (!(o && d in o)) throw new re(d, s);
                                var m = o[d];
                                if (M(f)) m && "string" != typeof m && "number" != typeof m || (m = "string" == typeof m || "number" == typeof m ? String(m) : ""), c.push({
                                    type: "string" == typeof m ? 0 : 1,
                                    value: m
                                });
                                else if (A(f)) {
                                    var p = "string" == typeof f.style ? a.date[f.style] : void 0;
                                    c.push({
                                        type: 0,
                                        value: n.getDateTimeFormat(r, p).format(m)
                                    })
                                } else if (_(f)) {
                                    p = "string" == typeof f.style ? a.time[f.style] : O(f.style) ? B(f.style.pattern) : void 0;
                                    c.push({
                                        type: 0,
                                        value: n.getDateTimeFormat(r, p).format(m)
                                    })
                                } else if (w(f)) {
                                    p = "string" == typeof f.style ? a.number[f.style] : k(f.style) ? V(f.style.tokens) : void 0;
                                    c.push({
                                        type: 0,
                                        value: n.getNumberFormat(r, p).format(m)
                                    })
                                } else {
                                    if (C(f)) {
                                        var h = f.children,
                                            g = f.value,
                                            y = o[g];
                                        if (!ne(y)) throw new te(g, "function", s);
                                        var v = e(h, r, n, a, o),
                                            S = y.apply(void 0, v.map((function(e) {
                                                return e.value
                                            })));
                                        Array.isArray(S) || (S = [S]), c.push.apply(c, S.map((function(e) {
                                            return {
                                                type: "string" == typeof e ? 0 : 1,
                                                value: e
                                            }
                                        })))
                                    }
                                    if (j(f)) {
                                        if (!(I = f.options[m] || f.options.other)) throw new ee(f.value, m, Object.keys(f.options), s);
                                        c.push.apply(c, e(I.value, r, n, a, o))
                                    } else if (T(f)) {
                                        var I;
                                        if (!(I = f.options["=" + m])) {
                                            if (!Intl.PluralRules) throw new Q('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', "MISSING_INTL_API", s);
                                            var D = n.getPluralRules(r, {
                                                type: f.pluralType
                                            }).select(m - (f.offset || 0));
                                            I = f.options[D] || f.options.other
                                        }
                                        if (!I) throw new ee(f.value, m, Object.keys(f.options), s);
                                        c.push.apply(c, e(I.value, r, n, a, o, m - (f.offset || 0)))
                                    } else;
                                }
                            }
                        }
                        return (function(e) {
                            return e.length < 2 ? e : e.reduce((function(e, t) {
                                var r = e[e.length - 1];
                                return r && 0 === r.type && 0 === t.type ? r.value += t.value : e.push(t), e
                            }), [])
                        })(c)
                    })(i.ast, i.locales, i.formatters, i.formats, e, void 0, i.message)
                }, this.resolvedOptions = function() {
                    return {
                        locale: Intl.NumberFormat.supportedLocalesOf(i.locales)[0]
                    }
                }, this.getAst = function() {
                    return i.ast
                }, "string" == typeof t) {
                if (this.message = t, !e.__parse) throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
                this.ast = e.__parse(t, {
                    normalizeHashtagInPlural: !1
                })
            } else this.ast = t;
            if (!Array.isArray(this.ast)) throw new TypeError("A message must be provided as a String or AST.");
            this.formats = oe(e.formats, n), this.locales = r, this.formatters = a && a.formatters || (void 0 === (o = this.formatterCache) && (o = {
                number: {},
                dateTime: {},
                pluralRules: {}
            }), {
                getNumberFormat: W(Intl.NumberFormat, o.number),
                getDateTimeFormat: W(Intl.DateTimeFormat, o.dateTime),
                getPluralRules: W(Intl.PluralRules, o.pluralRules)
            })
        }
        return Object.defineProperty(e, "defaultLocale", {
            get: function() {
                return e.memoizedDefaultLocale || (e.memoizedDefaultLocale = (new Intl.NumberFormat).resolvedOptions().locale), e.memoizedDefaultLocale
            },
            enumerable: !0,
            configurable: !0
        }), e.memoizedDefaultLocale = null, e.__parse = G, e.formats = {
            number: {
                currency: {
                    style: "currency"
                },
                percent: {
                    style: "percent"
                }
            },
            date: {
                short: {
                    month: "numeric",
                    day: "numeric",
                    year: "2-digit"
                },
                medium: {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                },
                long: {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                },
                full: {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            },
            time: {
                short: {
                    hour: "numeric",
                    minute: "numeric"
                },
                medium: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                },
                long: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                },
                full: {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZoneName: "short"
                }
            }
        }, e
    })();

    function ce(e, t, r) {
        if (void 0 === r && (r = Error), !e) throw new r(t)
    }(ie = e.ReactIntlErrorCode || (e.ReactIntlErrorCode = {})).FORMAT_ERROR = "FORMAT_ERROR", ie.UNSUPPORTED_FORMATTER = "UNSUPPORTED_FORMATTER", ie.INVALID_CONFIG = "INVALID_CONFIG", ie.MISSING_DATA = "MISSING_DATA", ie.MISSING_TRANSLATION = "MISSING_TRANSLATION";
    var le = (function(e) {
        i(r, e);
        var t = p(r);

        function r(e, a, o, i) {
            var s;
            return n(this, r), (s = t.call(this, "[React Intl Error ".concat(e, "] ").concat(a, " ").concat(i ? "\n".concat(i.stack) : ""))).code = e, s.descriptor = o, "function" == typeof Error.captureStackTrace && Error.captureStackTrace(d(s), r), s
        }
        return r
    })(f(Error));

    function ue(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return t.reduce((function(t, n) {
            return n in e ? t[n] = e[n] : n in r && (t[n] = r[n]), t
        }), {})
    }

    function fe(e) {
        ce(e, "[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry.")
    }
    var de = {
        formats: {},
        messages: {},
        timeZone: void 0,
        textComponent: t.Fragment,
        defaultLocale: "en",
        defaultFormats: {},
        onError: function(e) {
            console.error(e)
        }
    };

    function me() {
        return {
            dateTime: {},
            number: {},
            message: {},
            relativeTime: {},
            pluralRules: {},
            list: {},
            displayNames: {}
        }
    }

    function pe() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {
                dateTime: {},
                number: {},
                message: {},
                relativeTime: {},
                pluralRules: {},
                list: {},
                displayNames: {}
            },
            t = Intl.RelativeTimeFormat,
            r = Intl.ListFormat,
            n = Intl.DisplayNames;
        return {
            getDateTimeFormat: W(Intl.DateTimeFormat, e.dateTime),
            getNumberFormat: W(Intl.NumberFormat, e.number),
            getMessageFormat: W(se, e.message),
            getRelativeTimeFormat: W(t, e.relativeTime),
            getPluralRules: W(Intl.PluralRules, e.pluralRules),
            getListFormat: W(r, e.list),
            getDisplayNames: W(n, e.displayNames)
        }
    }

    function he(e, t, r, n) {
        var a, o = e && e[t];
        if (o && (a = o[r]), a) return a;
        n(new le("UNSUPPORTED_FORMATTER", "No ".concat(t, " format named: ").concat(r)))
    }

    function ge(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var ye = ge((function(e, t) {
        (function() {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var e = "function" == typeof Symbol && Symbol.for,
                n = e ? Symbol.for("react.element") : 60103,
                a = e ? Symbol.for("react.portal") : 60106,
                o = e ? Symbol.for("react.fragment") : 60107,
                i = e ? Symbol.for("react.strict_mode") : 60108,
                s = e ? Symbol.for("react.profiler") : 60114,
                c = e ? Symbol.for("react.provider") : 60109,
                l = e ? Symbol.for("react.context") : 60110,
                u = e ? Symbol.for("react.async_mode") : 60111,
                f = e ? Symbol.for("react.concurrent_mode") : 60111,
                d = e ? Symbol.for("react.forward_ref") : 60112,
                m = e ? Symbol.for("react.suspense") : 60113,
                p = e ? Symbol.for("react.memo") : 60115,
                h = e ? Symbol.for("react.lazy") : 60116;
            var g = function(e) {
                    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                    var a = 0,
                        o = "Warning: " + e.replace(/%s/g, (function() {
                            return r[a++]
                        }));
                    "undefined" != typeof console && console.warn(o);
                    try {
                        throw new Error(o)
                    } catch (e) {}
                },
                y = function(e, t) {
                    if (void 0 === t) throw new Error("`lowPriorityWarning(condition, format, ...args)` requires a warning message argument");
                    if (!e) {
                        for (var r = arguments.length, n = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++) n[a - 2] = arguments[a];
                        g.apply(void 0, [t].concat(n))
                    }
                };

            function v(e) {
                if ("object" === r(e) && null !== e) {
                    var t = e.$$typeof;
                    switch (t) {
                        case n:
                            var g = e.type;
                            switch (g) {
                                case u:
                                case f:
                                case o:
                                case s:
                                case i:
                                case m:
                                    return g;
                                default:
                                    var y = g && g.$$typeof;
                                    switch (y) {
                                        case l:
                                        case d:
                                        case c:
                                            return y;
                                        default:
                                            return t
                                    }
                            }
                        case h:
                        case p:
                        case a:
                            return t
                    }
                }
            }
            var b = u,
                M = f,
                w = l,
                A = c,
                _ = n,
                j = d,
                T = o,
                E = h,
                C = p,
                k = a,
                O = s,
                S = i,
                I = m,
                D = !1;

            function F(e) {
                return v(e) === f
            }
            t.typeOf = v, t.AsyncMode = b, t.ConcurrentMode = M, t.ContextConsumer = w, t.ContextProvider = A, t.Element = _, t.ForwardRef = j, t.Fragment = T, t.Lazy = E, t.Memo = C, t.Portal = k, t.Profiler = O, t.StrictMode = S, t.Suspense = I, t.isValidElementType = function(e) {
                return "string" == typeof e || "function" == typeof e || e === o || e === f || e === s || e === i || e === m || "object" === r(e) && null !== e && (e.$$typeof === h || e.$$typeof === p || e.$$typeof === c || e.$$typeof === l || e.$$typeof === d)
            }, t.isAsyncMode = function(e) {
                return D || (D = !0, y(!1, "The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), F(e) || v(e) === u
            }, t.isConcurrentMode = F, t.isContextConsumer = function(e) {
                return v(e) === l
            }, t.isContextProvider = function(e) {
                return v(e) === c
            }, t.isElement = function(e) {
                return "object" === r(e) && null !== e && e.$$typeof === n
            }, t.isForwardRef = function(e) {
                return v(e) === d
            }, t.isFragment = function(e) {
                return v(e) === o
            }, t.isLazy = function(e) {
                return v(e) === h
            }, t.isMemo = function(e) {
                return v(e) === p
            }, t.isPortal = function(e) {
                return v(e) === a
            }, t.isProfiler = function(e) {
                return v(e) === s
            }, t.isStrictMode = function(e) {
                return v(e) === i
            }, t.isSuspense = function(e) {
                return v(e) === m
            }
        })()
    }));
    (function(e) {
        e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") && e.default
    })(ye);
    ye.typeOf, ye.AsyncMode, ye.ConcurrentMode, ye.ContextConsumer, ye.ContextProvider, ye.Element, ye.ForwardRef, ye.Fragment, ye.Lazy, ye.Memo, ye.Portal, ye.Profiler, ye.StrictMode, ye.Suspense, ye.isValidElementType, ye.isAsyncMode, ye.isConcurrentMode, ye.isContextConsumer, ye.isContextProvider, ye.isElement, ye.isForwardRef, ye.isFragment, ye.isLazy, ye.isMemo, ye.isPortal, ye.isProfiler, ye.isStrictMode, ye.isSuspense;
    var ve = ge((function(e) {
            e.exports = ye
        })),
        be = {
            childContextTypes: !0,
            contextType: !0,
            contextTypes: !0,
            defaultProps: !0,
            displayName: !0,
            getDefaultProps: !0,
            getDerivedStateFromError: !0,
            getDerivedStateFromProps: !0,
            mixins: !0,
            propTypes: !0,
            type: !0
        },
        Me = {
            name: !0,
            length: !0,
            prototype: !0,
            caller: !0,
            callee: !0,
            arguments: !0,
            arity: !0
        },
        we = {
            $$typeof: !0,
            compare: !0,
            defaultProps: !0,
            displayName: !0,
            propTypes: !0,
            type: !0
        },
        Ae = {};

    function _e(e) {
        return ve.isMemo(e) ? we : Ae[e.$$typeof] || be
    }
    Ae[ve.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0
    }, Ae[ve.Memo] = we;
    var je = Object.defineProperty,
        Te = Object.getOwnPropertyNames,
        Ee = Object.getOwnPropertySymbols,
        Ce = Object.getOwnPropertyDescriptor,
        ke = Object.getPrototypeOf,
        Oe = Object.prototype;
    var Se = function e(t, r, n) {
            if ("string" != typeof r) {
                if (Oe) {
                    var a = ke(r);
                    a && a !== Oe && e(t, a, n)
                }
                var o = Te(r);
                Ee && (o = o.concat(Ee(r)));
                for (var i = _e(t), s = _e(r), c = 0; c < o.length; ++c) {
                    var l = o[c];
                    if (!(Me[l] || n && n[l] || s && s[l] || i && i[l])) {
                        var u = Ce(r, l);
                        try {
                            je(t, l, u)
                        } catch (e) {}
                    }
                }
            }
            return t
        },
        Ie = Object.freeze({
            __proto__: null,
            default: Se,
            __moduleExports: Se
        }),
        De = Se || Ie;
    var Fe = t.createContext(null),
        xe = Fe.Consumer,
        Re = Fe.Provider,
        Pe = Fe;

    function Ne(e, r) {
        var n, a = r || {},
            o = a.intlPropName,
            i = void 0 === o ? "intl" : o,
            s = a.forwardRef,
            c = void 0 !== s && s,
            l = a.enforceContext,
            u = void 0 === l || l,
            f = function(r) {
                return t.createElement(xe, null, (function(n) {
                    u && fe(n);
                    var a, o, s, l = (s = n, (o = i) in (a = {}) ? Object.defineProperty(a, o, {
                        value: s,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : a[o] = s, a);
                    return t.createElement(e, Object.assign({}, r, l, {
                        ref: c ? r.forwardedRef : null
                    }))
                }))
            };
        return f.displayName = "injectIntl(".concat((n = e).displayName || n.name || "Component", ")"), f.WrappedComponent = e, De(c ? t.forwardRef((function(e, r) {
            return t.createElement(f, Object.assign({}, e, {
                forwardedRef: r
            }))
        })) : f, e)
    }
    var Le, Be, Ue = function(e, t) {
        var r = {};
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (n = Object.getOwnPropertySymbols(e); a < n.length; a++) t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]])
        }
        return r
    };
    (function(e) {
        e.formatDate = "FormattedDate", e.formatTime = "FormattedTime", e.formatNumber = "FormattedNumber", e.formatList = "FormattedList", e.formatDisplayName = "FormattedDisplayName"
    })(Le || (Le = {})), (function(e) {
        e.formatDate = "FormattedDateParts", e.formatTime = "FormattedTimeParts", e.formatNumber = "FormattedNumberParts", e.formatList = "FormattedListParts"
    })(Be || (Be = {}));
    var He = function(e) {
        return t.createElement(Pe.Consumer, null, (function(t) {
            fe(t);
            var r = e.value,
                n = e.children,
                a = Ue(e, ["value", "children"]);
            return n(t.formatNumberToParts(r, a))
        }))
    };

    function qe(e) {
        var r = function(r) {
            return t.createElement(Pe.Consumer, null, (function(t) {
                fe(t);
                var n = r.value,
                    a = r.children,
                    o = Ue(r, ["value", "children"]),
                    i = "string" == typeof n ? new Date(n || 0) : n;
                return a("formatDate" === e ? t.formatDateToParts(i, o) : t.formatTimeToParts(i, o))
            }))
        };
        return r.displayName = Be[e], r
    }

    function ze(e) {
        var r = function(r) {
            return t.createElement(Pe.Consumer, null, (function(n) {
                fe(n);
                var a = r.value,
                    o = r.children,
                    i = Ue(r, ["value", "children"]),
                    s = n[e](a, i);
                if ("function" == typeof o) return o(s);
                var c = n.textComponent || t.Fragment;
                return t.createElement(c, null, s)
            }))
        };
        return r.displayName = Le[e], r
    }
    He.displayName = "FormattedNumberParts";
    var Ye = ["localeMatcher", "style", "currency", "currencyDisplay", "unit", "unitDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "currencyDisplay", "currencySign", "notation", "signDisplay", "unit", "unitDisplay"];

    function Ve(e, t) {
        var r = e.locale,
            n = e.formats,
            a = e.onError,
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = o.format,
            s = i && he(n, "number", i, a) || {},
            c = ue(o, Ye, s);
        return t(r, c)
    }

    function Ge(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        try {
            return Ve(e, t, n).format(r)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting number.", t))
        }
        return String(r)
    }

    function $e(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        try {
            return Ve(e, t, n).formatToParts(r)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting number.", t))
        }
        return []
    }
    var Ze = ["numeric", "style"];

    function Ke(e, t) {
        var r = e.locale,
            n = e.formats,
            a = e.onError,
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = o.format,
            s = !!i && he(n, "relative", i, a) || {},
            c = ue(o, Ze, s);
        return t(r, c)
    }

    function We(e, t, r, n) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
        n || (n = "second");
        var o = Intl.RelativeTimeFormat;
        o || e.onError(new Q('Intl.RelativeTimeFormat is not available in this environment.\nTry polyfilling it using "@formatjs/intl-relativetimeformat"\n', "MISSING_INTL_API"));
        try {
            return Ke(e, t, a).format(r, n)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting relative time.", t))
        }
        return String(r)
    }
    var Xe = ["localeMatcher", "formatMatcher", "timeZone", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];

    function Je(e, t, r) {
        var n = e.locale,
            a = e.formats,
            o = e.onError,
            i = e.timeZone,
            s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            c = s.format,
            l = Object.assign(Object.assign({}, i && {
                timeZone: i
            }), c && he(a, t, c, o)),
            u = ue(s, Xe, l);
        return "time" !== t || u.hour || u.minute || u.second || (u = Object.assign(Object.assign({}, u), {
            hour: "numeric",
            minute: "numeric"
        })), r(n, u)
    }

    function Qe(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = "string" == typeof r ? new Date(r || 0) : r;
        try {
            return Je(e, "date", t, n).format(a)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting date.", t))
        }
        return String(a)
    }

    function et(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = "string" == typeof r ? new Date(r || 0) : r;
        try {
            return Je(e, "time", t, n).format(a)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting time.", t))
        }
        return String(a)
    }

    function tt(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = "string" == typeof r ? new Date(r || 0) : r;
        try {
            return Je(e, "date", t, n).formatToParts(a)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting date.", t))
        }
        return []
    }

    function rt(e, t, r) {
        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = "string" == typeof r ? new Date(r || 0) : r;
        try {
            return Je(e, "time", t, n).formatToParts(a)
        } catch (t) {
            e.onError(new le("FORMAT_ERROR", "Error formatting time.", t))
        }
        return []
    }
    var nt = ["localeMatcher", "type"];

    function at(e, t, r) {
        var n = e.locale,
            a = e.onError,
            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
        Intl.PluralRules || a(new Q('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', "MISSING_INTL_API"));
        var i = ue(o, nt);
        try {
            return t(n, i).select(r)
        } catch (e) {
            a(new le("FORMAT_ERROR", "Error formatting plural.", e))
        }
        return "other"
    }

    function ot(e, t) {
        return Object.keys(e).reduce((function(r, n) {
            return r[n] = Object.assign({
                timeZone: t
            }, e[n]), r
        }), {})
    }

    function it(e, t) {
        return Object.keys(Object.assign(Object.assign({}, e), t)).reduce((function(r, n) {
            return r[n] = Object.assign(Object.assign({}, e[n] || {}), t[n] || {}), r
        }), {})
    }

    function st(e, t) {
        if (!t) return e;
        var r = se.formats;
        return Object.assign(Object.assign(Object.assign({}, r), e), {
            date: it(ot(r.date, t), ot(e.date || {}, t)),
            time: it(ot(r.time, t), ot(e.time || {}, t))
        })
    }

    function ct(e) {
        return t.createElement.apply(t, [t.Fragment, null].concat(h(e)))
    }

    function lt(e, t) {
        var r = e.locale,
            n = e.formats,
            a = e.messages,
            o = e.defaultLocale,
            i = e.defaultFormats,
            s = e.onError,
            c = e.timeZone,
            l = e.wrapRichTextChunksInFragment,
            u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {
                id: ""
            },
            f = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            d = u.id,
            m = u.defaultMessage;
        ce(!!d, "[React Intl] An `id` must be provided to format a message.");
        var p = a && a[String(d)];
        n = st(n, c), i = st(i, c);
        var h = "";
        if (p) try {
            var g = t.getMessageFormat(p, r, n, {
                formatters: t
            });
            h = g.format(f)
        } catch (e) {
            s(new le("FORMAT_ERROR", 'Error formatting message: "'.concat(d, '" for locale: "').concat(r, '"') + (m ? ", using default message as fallback." : ""), u, e))
        } else(!m || r && r.toLowerCase() !== o.toLowerCase()) && s(new le("MISSING_TRANSLATION", 'Missing message: "'.concat(d, '" for locale: "').concat(r, '"') + (m ? ", using default message as fallback." : ""), u));
        if (!h && m) try {
            var y = t.getMessageFormat(m, o, i);
            h = y.format(f)
        } catch (e) {
            s(new le("FORMAT_ERROR", 'Error formatting the default message for: "'.concat(d, '"'), u, e))
        }
        return h ? Array.isArray(h) && l ? ct(h) : h : (s(new le("FORMAT_ERROR", 'Cannot format message: "'.concat(d, '", ') + "using message ".concat(p || m ? "source" : "id", " as fallback."), u)), "string" == typeof p ? p || m || String(d) : m || String(d))
    }
    var ut = function(e, t) {
            if (e === t) return !0;
            if (!e || !t) return !1;
            var r = Object.keys(e),
                n = Object.keys(t),
                a = r.length;
            if (n.length !== a) return !1;
            for (var o = 0; o < a; o++) {
                var i = r[o];
                if (e[i] !== t[i] || !Object.prototype.hasOwnProperty.call(t, i)) return !1
            }
            return !0
        },
        ft = Object.freeze({
            __proto__: null,
            default: ut,
            __moduleExports: ut
        }),
        dt = ["localeMatcher", "type", "style"],
        mt = Date.now();

    function pt(e) {
        return "".concat(mt, "_").concat(e, "_").concat(mt)
    }

    function ht(e, t, n) {
        var a = e.locale,
            o = e.onError,
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            s = Intl.ListFormat;
        s || o(new Q('Intl.ListFormat is not available in this environment.\nTry polyfilling it using "@formatjs/intl-listformat"\n', "MISSING_INTL_API"));
        var c = ue(i, dt);
        try {
            var l = {},
                u = n.map((function(e, t) {
                    if ("object" === r(e)) {
                        var n = pt(t);
                        return l[n] = e, n
                    }
                    return String(e)
                }));
            if (!Object.keys(l).length) return t(a, c).format(u);
            var f = t(a, c).formatToParts(u);
            return f.reduce((function(e, t) {
                var r = t.value;
                return l[r] ? e.push(l[r]) : "string" == typeof e[e.length - 1] ? e[e.length - 1] += r : e.push(r), e
            }), [])
        } catch (e) {
            o(new le("FORMAT_ERROR", "Error formatting list.", e))
        }
        return n
    }
    var gt = ["localeMatcher", "style", "type", "fallback"];

    function yt(e, t, r) {
        var n = e.locale,
            a = e.onError,
            o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            i = Intl.DisplayNames;
        i || a(new Q('Intl.DisplayNames is not available in this environment.\nTry polyfilling it using "@formatjs/intl-displaynames"\n', "MISSING_INTL_API"));
        var s = ue(o, gt);
        try {
            return t(n, s).of(r)
        } catch (e) {
            a(new le("FORMAT_ERROR", "Error formatting display name.", e))
        }
    }
    var vt = ut || ft;

    function bt(e) {
        return {
            locale: e.locale,
            timeZone: e.timeZone,
            formats: e.formats,
            textComponent: e.textComponent,
            messages: e.messages,
            defaultLocale: e.defaultLocale,
            defaultFormats: e.defaultFormats,
            onError: e.onError
        }
    }

    function Mt(e, t) {
        var r = pe(t),
            n = Object.assign(Object.assign({}, de), e),
            a = n.locale,
            o = n.defaultLocale,
            i = n.onError;
        return a ? !Intl.NumberFormat.supportedLocalesOf(a).length && i ? i(new le("MISSING_DATA", 'Missing locale data for locale: "'.concat(a, '" in Intl.NumberFormat. Using default locale: "').concat(o, '" as fallback. See https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements for more details'))) : !Intl.DateTimeFormat.supportedLocalesOf(a).length && i && i(new le("MISSING_DATA", 'Missing locale data for locale: "'.concat(a, '" in Intl.DateTimeFormat. Using default locale: "').concat(o, '" as fallback. See https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements for more details'))) : (i && i(new le("INVALID_CONFIG", '"locale" was not configured, using "'.concat(o, '" as fallback. See https://github.com/formatjs/react-intl/blob/master/docs/API.md#intlshape for more details'))), n.locale = n.defaultLocale || "en"), Object.assign(Object.assign({}, n), {
            formatters: r,
            formatNumber: Ge.bind(null, n, r.getNumberFormat),
            formatNumberToParts: $e.bind(null, n, r.getNumberFormat),
            formatRelativeTime: We.bind(null, n, r.getRelativeTimeFormat),
            formatDate: Qe.bind(null, n, r.getDateTimeFormat),
            formatDateToParts: tt.bind(null, n, r.getDateTimeFormat),
            formatTime: et.bind(null, n, r.getDateTimeFormat),
            formatTimeToParts: rt.bind(null, n, r.getDateTimeFormat),
            formatPlural: at.bind(null, n, r.getPluralRules),
            formatMessage: lt.bind(null, n, r),
            formatList: ht.bind(null, n, r.getListFormat),
            formatDisplayName: yt.bind(null, n, r.getDisplayNames)
        })
    }
    var wt = (function(e) {
        i(a, e);
        var r = p(a);

        function a() {
            var e;
            return n(this, a), (e = r.apply(this, arguments)).cache = {
                dateTime: {},
                number: {},
                message: {},
                relativeTime: {},
                pluralRules: {},
                list: {},
                displayNames: {}
            }, e.state = {
                cache: e.cache,
                intl: Mt(bt(e.props), e.cache),
                prevConfig: bt(e.props)
            }, e
        }
        return o(a, [{
            key: "render",
            value: function() {
                return fe(this.state.intl), t.createElement(Re, {
                    value: this.state.intl
                }, this.props.children)
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function(e, t) {
                var r = t.prevConfig,
                    n = t.cache,
                    a = bt(e);
                return vt(r, a) ? null : {
                    intl: Mt(a, n),
                    prevConfig: a
                }
            }
        }]), a
    })(t.PureComponent);
    wt.displayName = "IntlProvider", wt.defaultProps = de;

    function At(e) {
        var t = Math.abs(e);
        return t < 60 ? "second" : t < 3600 ? "minute" : t < 86400 ? "hour" : "day"
    }

    function _t(e) {
        switch (e) {
            case "second":
                return 1;
            case "minute":
                return 60;
            case "hour":
                return 3600;
            default:
                return 86400
        }
    }

    function jt(e, t) {
        if (!e) return 0;
        switch (t) {
            case "second":
                return e;
            case "minute":
                return 60 * e;
            default:
                return 3600 * e
        }
    }
    var Tt = ["second", "minute", "hour"];

    function Et() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "second";
        return Tt.includes(e)
    }
    var Ct = (function(e) {
        i(a, e);
        var r = p(a);

        function a(e) {
            var t;
            return n(this, a), (t = r.call(this, e))._updateTimer = null, t.state = {
                prevUnit: t.props.unit,
                prevValue: t.props.value,
                currentValueInSeconds: Et(t.props.unit) ? jt(t.props.value, t.props.unit) : 0
            }, ce(!e.updateIntervalInSeconds || !(!e.updateIntervalInSeconds || !Et(e.unit)), "Cannot schedule update with unit longer than hour"), t
        }
        return o(a, [{
            key: "scheduleNextUpdate",
            value: function(e, t) {
                var r = this,
                    n = e.updateIntervalInSeconds,
                    a = e.unit,
                    o = t.currentValueInSeconds;
                if (clearTimeout(this._updateTimer), this._updateTimer = null, n && Et(a)) {
                    var i = o - n,
                        s = At(i);
                    if ("day" !== s) {
                        var c = _t(s),
                            l = i - i % c,
                            u = l >= o ? l - c : l,
                            f = Math.abs(u - o);
                        this._updateTimer = setTimeout((function() {
                            return r.setState({
                                currentValueInSeconds: u
                            })
                        }), 1e3 * f)
                    }
                }
            }
        }, {
            key: "componentDidMount",
            value: function() {
                this.scheduleNextUpdate(this.props, this.state)
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                this.scheduleNextUpdate(this.props, this.state)
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                clearTimeout(this._updateTimer), this._updateTimer = null
            }
        }, {
            key: "render",
            value: function() {
                var e = this;
                return t.createElement(Pe.Consumer, null, (function(r) {
                    fe(r);
                    var n = r.formatRelativeTime,
                        a = r.textComponent,
                        o = e.props,
                        i = o.children,
                        s = o.value,
                        c = o.unit,
                        l = o.updateIntervalInSeconds,
                        u = e.state.currentValueInSeconds,
                        f = s || 0,
                        d = c;
                    if (Et(c) && "number" == typeof u && l) {
                        var m = _t(d = At(u));
                        f = Math.round(u / m)
                    }
                    var p = n(f, d, Object.assign({}, e.props));
                    return "function" == typeof i ? i(p) : a ? t.createElement(a, null, p) : p
                }))
            }
        }], [{
            key: "getDerivedStateFromProps",
            value: function(e, t) {
                return e.unit !== t.prevUnit || e.value !== t.prevValue ? {
                    prevValue: e.value,
                    prevUnit: e.unit,
                    currentValueInSeconds: Et(e.unit) ? jt(e.value, e.unit) : 0
                } : null
            }
        }]), a
    })(t.PureComponent);
    Ct.displayName = "FormattedRelativeTime", Ct.defaultProps = {
        value: 0,
        unit: "second"
    };
    var kt = function(e) {
        var r = e.value,
            n = e.other,
            a = e.children,
            o = e.intl,
            i = o.formatPlural,
            s = o.textComponent,
            c = e[i(r, e)] || n;
        return "function" == typeof a ? a(c) : s ? t.createElement(s, null, c) : c
    };
    kt.defaultProps = {
        type: "cardinal"
    }, kt.displayName = "FormattedPlural";
    var Ot = Ne(kt),
        St = function(e, t) {
            var r = {};
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                var a = 0;
                for (n = Object.getOwnPropertySymbols(e); a < n.length; a++) t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]])
            }
            return r
        },
        It = ut || ft;

    function Dt(e, t) {
        return console.error("[React Intl] Could not find required `intl` object. <IntlProvider> needs to exist in the component ancestry. Using default message as fallback."), lt(Object.assign(Object.assign({}, de), {
            locale: "en"
        }), pe(), e, t)
    }
    var Ft = (function(e) {
        i(a, e);
        var r = p(a);

        function a() {
            return n(this, a), r.apply(this, arguments)
        }
        return o(a, [{
            key: "shouldComponentUpdate",
            value: function(e) {
                var t = this.props,
                    r = t.values,
                    n = St(t, ["values"]),
                    a = e.values,
                    o = St(e, ["values"]);
                return !It(a, r) || !It(n, o)
            }
        }, {
            key: "render",
            value: function() {
                var e = this;
                return t.createElement(Pe.Consumer, null, (function(r) {
                    e.props.defaultMessage || fe(r);
                    var n = r || {},
                        a = n.formatMessage,
                        o = void 0 === a ? Dt : a,
                        i = n.textComponent,
                        s = void 0 === i ? t.Fragment : i,
                        c = e.props,
                        l = c.id,
                        u = c.description,
                        f = c.defaultMessage,
                        d = c.values,
                        m = c.children,
                        p = c.tagName,
                        g = void 0 === p ? s : p,
                        y = o({
                            id: l,
                            description: u,
                            defaultMessage: f
                        }, d);
                    return Array.isArray(y) || (y = [y]), "function" == typeof m ? m.apply(void 0, h(y)) : g ? t.createElement.apply(t, [g, null].concat(h(y))) : y
                }))
            }
        }]), a
    })(t.Component);
    Ft.displayName = "FormattedMessage", Ft.defaultProps = {
        values: {}
    };
    var xt = ze("formatDate"),
        Rt = ze("formatTime"),
        Pt = ze("formatNumber"),
        Nt = ze("formatList"),
        Lt = ze("formatDisplayName"),
        Bt = qe("formatDate"),
        Ut = qe("formatTime");
    e.FormattedDate = xt, e.FormattedDateParts = Bt, e.FormattedDisplayName = Lt, e.FormattedList = Nt, e.FormattedMessage = Ft, e.FormattedNumber = Pt, e.FormattedNumberParts = He, e.FormattedPlural = Ot, e.FormattedRelativeTime = Ct, e.FormattedTime = Rt, e.FormattedTimeParts = Ut, e.IntlContext = Pe, e.IntlProvider = wt, e.RawIntlProvider = Re, e.ReactIntlError = le, e.createIntl = Mt, e.createIntlCache = me, e.defineMessage = function(e) {
        return e
    }, e.defineMessages = function(e) {
        return e
    }, e.injectIntl = Ne, e.useIntl = function() {
        var e = t.useContext(Pe);
        return fe(e), e
    }, Object.defineProperty(e, "__esModule", {
        value: !0
    })
})), (function(e) {
    function t(e, t, r) {
        var n, a, o, d, m, p, v, b, M, w = 0,
            A = [],
            _ = 0,
            j = !1,
            T = [],
            E = [],
            C = !1;
        if (n = (r = r || {}).encoding || "UTF8", M = r.numRounds || 1, o = f(t, n), M !== parseInt(M, 10) || 1 > M) throw Error("numRounds must a integer >= 1");
        if ("SHA-1" !== e) throw Error("Chosen SHA variant is not supported");
        m = 512, p = g, v = y, d = 160, b = function(e) {
            return e.slice()
        }, a = h(e), this.setHMACKey = function(t, r, o) {
            var i;
            if (!0 === j) throw Error("HMAC key already set");
            if (!0 === C) throw Error("Cannot set HMAC key after calling update");
            if (t = (r = f(r, n = (o || {}).encoding || "UTF8")(t)).binLen, r = r.value, o = (i = m >>> 3) / 4 - 1, i < t / 8) {
                for (r = v(r, t, 0, h(e), d); r.length <= o;) r.push(0);
                r[o] &= 4294967040
            } else if (i > t / 8) {
                for (; r.length <= o;) r.push(0);
                r[o] &= 4294967040
            }
            for (t = 0; t <= o; t += 1) T[t] = 909522486 ^ r[t], E[t] = 1549556828 ^ r[t];
            a = p(T, a), w = m, j = !0
        }, this.update = function(e) {
            var t, r, n, i = 0,
                s = m >>> 5;
            for (e = (t = o(e, A, _)).binLen, r = t.value, t = e >>> 5, n = 0; n < t; n += s) i + m <= e && (a = p(r.slice(n, n + s), a), i += m);
            w += i, A = r.slice(i >>> 5), _ = e % m, C = !0
        }, this.getHash = function(t, r) {
            var n, o, f, m;
            if (!0 === j) throw Error("Cannot call getHash after setting HMAC key");
            switch (f = u(r), t) {
                case "HEX":
                    n = function(e) {
                        return i(e, d, f)
                    };
                    break;
                case "B64":
                    n = function(e) {
                        return s(e, d, f)
                    };
                    break;
                case "BYTES":
                    n = function(e) {
                        return c(e, d)
                    };
                    break;
                case "ARRAYBUFFER":
                    try {
                        o = new ArrayBuffer(0)
                    } catch (e) {
                        throw Error("ARRAYBUFFER not supported by this environment")
                    }
                    n = function(e) {
                        return l(e, d)
                    };
                    break;
                default:
                    throw Error("format must be HEX, B64, BYTES, or ARRAYBUFFER")
            }
            for (m = v(A.slice(), _, w, b(a), d), o = 1; o < M; o += 1) m = v(m, d, 0, h(e), d);
            return n(m)
        }, this.getHMAC = function(t, r) {
            var n, o, f, g;
            if (!1 === j) throw Error("Cannot call getHMAC without first setting HMAC key");
            switch (f = u(r), t) {
                case "HEX":
                    n = function(e) {
                        return i(e, d, f)
                    };
                    break;
                case "B64":
                    n = function(e) {
                        return s(e, d, f)
                    };
                    break;
                case "BYTES":
                    n = function(e) {
                        return c(e, d)
                    };
                    break;
                case "ARRAYBUFFER":
                    try {
                        n = new ArrayBuffer(0)
                    } catch (e) {
                        throw Error("ARRAYBUFFER not supported by this environment")
                    }
                    n = function(e) {
                        return l(e, d)
                    };
                    break;
                default:
                    throw Error("outputFormat must be HEX, B64, BYTES, or ARRAYBUFFER")
            }
            return o = v(A.slice(), _, w, b(a), d), g = p(E, h(e)), n(g = v(o, d, m, g, d))
        }
    }

    function r(e, t, r) {
        var n, a, o, i, s, c = e.length;
        if (t = t || [0], s = (r = r || 0) >>> 3, 0 != c % 2) throw Error("String of HEX type must be in byte increments");
        for (n = 0; n < c; n += 2) {
            if (a = parseInt(e.substr(n, 2), 16), isNaN(a)) throw Error("String of HEX type contains invalid characters");
            for (o = (i = (n >>> 1) + s) >>> 2; t.length <= o;) t.push(0);
            t[o] |= a << 8 * (3 - i % 4)
        }
        return {
            value: t,
            binLen: 4 * c + r
        }
    }

    function n(e, t, r) {
        var n, a, o, i, s = [];
        s = t || [0];
        for (a = (r = r || 0) >>> 3, n = 0; n < e.length; n += 1) t = e.charCodeAt(n), o = (i = n + a) >>> 2, s.length <= o && s.push(0), s[o] |= t << 8 * (3 - i % 4);
        return {
            value: s,
            binLen: 8 * e.length + r
        }
    }

    function a(e, t, r) {
        var n, a, o, i, s, c, l = [],
            u = 0;
        l = t || [0];
        if (t = (r = r || 0) >>> 3, -1 === e.search(/^[a-zA-Z0-9=+\/]+$/)) throw Error("Invalid character in base-64 string");
        if (a = e.indexOf("="), e = e.replace(/\=/g, ""), -1 !== a && a < e.length) throw Error("Invalid '=' found in base-64 string");
        for (a = 0; a < e.length; a += 4) {
            for (s = e.substr(a, 4), o = i = 0; o < s.length; o += 1) i |= (n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s[o])) << 18 - 6 * o;
            for (o = 0; o < s.length - 1; o += 1) {
                for (n = (c = u + t) >>> 2; l.length <= n;) l.push(0);
                l[n] |= (i >>> 16 - 8 * o & 255) << 8 * (3 - c % 4), u += 1
            }
        }
        return {
            value: l,
            binLen: 8 * u + r
        }
    }

    function o(e, t, r) {
        var n, a, o, i = [];
        i = t || [0];
        for (n = (r = r || 0) >>> 3, t = 0; t < e.byteLength; t += 1) a = (o = t + n) >>> 2, i.length <= a && i.push(0), i[a] |= e[t] << 8 * (3 - o % 4);
        return {
            value: i,
            binLen: 8 * e.byteLength + r
        }
    }

    function i(e, t, r) {
        var n, a, o = "";
        for (t /= 8, n = 0; n < t; n += 1) a = e[n >>> 2] >>> 8 * (3 - n % 4), o += "0123456789abcdef".charAt(a >>> 4 & 15) + "0123456789abcdef".charAt(15 & a);
        return r.outputUpper ? o.toUpperCase() : o
    }

    function s(e, t, r) {
        var n, a, o, i = "",
            s = t / 8;
        for (n = 0; n < s; n += 3)
            for (a = n + 1 < s ? e[n + 1 >>> 2] : 0, o = n + 2 < s ? e[n + 2 >>> 2] : 0, o = (e[n >>> 2] >>> 8 * (3 - n % 4) & 255) << 16 | (a >>> 8 * (3 - (n + 1) % 4) & 255) << 8 | o >>> 8 * (3 - (n + 2) % 4) & 255, a = 0; 4 > a; a += 1) i += 8 * n + 6 * a <= t ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(o >>> 6 * (3 - a) & 63) : r.b64Pad;
        return i
    }

    function c(e, t) {
        var r, n, a = "",
            o = t / 8;
        for (r = 0; r < o; r += 1) n = e[r >>> 2] >>> 8 * (3 - r % 4) & 255, a += String.fromCharCode(n);
        return a
    }

    function l(e, t) {
        var r, n = t / 8,
            a = new ArrayBuffer(n);
        for (r = 0; r < n; r += 1) a[r] = e[r >>> 2] >>> 8 * (3 - r % 4) & 255;
        return a
    }

    function u(e) {
        var t = {
            outputUpper: !1,
            b64Pad: "=",
            shakeLen: -1
        };
        if (e = e || {}, t.outputUpper = e.outputUpper || !1, !0 === e.hasOwnProperty("b64Pad") && (t.b64Pad = e.b64Pad), "boolean" != typeof t.outputUpper) throw Error("Invalid outputUpper formatting option");
        if ("string" != typeof t.b64Pad) throw Error("Invalid b64Pad formatting option");
        return t
    }

    function f(e, t) {
        var i;
        switch (t) {
            case "UTF8":
            case "UTF16BE":
            case "UTF16LE":
                break;
            default:
                throw Error("encoding must be UTF8, UTF16BE, or UTF16LE")
        }
        switch (e) {
            case "HEX":
                i = r;
                break;
            case "TEXT":
                i = function(e, r, n) {
                    var a, o, i, s, c, l = [],
                        u = [],
                        f = 0;
                    l = r || [0];
                    if (i = (r = n || 0) >>> 3, "UTF8" === t)
                        for (a = 0; a < e.length; a += 1)
                            for (u = [], 128 > (n = e.charCodeAt(a)) ? u.push(n) : 2048 > n ? (u.push(192 | n >>> 6), u.push(128 | 63 & n)) : 55296 > n || 57344 <= n ? u.push(224 | n >>> 12, 128 | n >>> 6 & 63, 128 | 63 & n) : (a += 1, n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(a)), u.push(240 | n >>> 18, 128 | n >>> 12 & 63, 128 | n >>> 6 & 63, 128 | 63 & n)), o = 0; o < u.length; o += 1) {
                                for (s = (c = f + i) >>> 2; l.length <= s;) l.push(0);
                                l[s] |= u[o] << 8 * (3 - c % 4), f += 1
                            } else if ("UTF16BE" === t || "UTF16LE" === t)
                                for (a = 0; a < e.length; a += 1) {
                                    for (n = e.charCodeAt(a), "UTF16LE" === t && (n = (o = 255 & n) << 8 | n >>> 8), s = (c = f + i) >>> 2; l.length <= s;) l.push(0);
                                    l[s] |= n << 8 * (2 - c % 4), f += 2
                                }
                    return {
                        value: l,
                        binLen: 8 * f + r
                    }
                };
                break;
            case "B64":
                i = a;
                break;
            case "BYTES":
                i = n;
                break;
            case "ARRAYBUFFER":
                try {
                    i = new ArrayBuffer(0)
                } catch (e) {
                    throw Error("ARRAYBUFFER not supported by this environment")
                }
                i = o;
                break;
            default:
                throw Error("format must be HEX, TEXT, B64, BYTES, or ARRAYBUFFER")
        }
        return i
    }

    function d(e, t) {
        return e << t | e >>> 32 - t
    }

    function m(e, t) {
        var r = (65535 & e) + (65535 & t);
        return ((e >>> 16) + (t >>> 16) + (r >>> 16) & 65535) << 16 | 65535 & r
    }

    function p(e, t, r, n, a) {
        var o = (65535 & e) + (65535 & t) + (65535 & r) + (65535 & n) + (65535 & a);
        return ((e >>> 16) + (t >>> 16) + (r >>> 16) + (n >>> 16) + (a >>> 16) + (o >>> 16) & 65535) << 16 | 65535 & o
    }

    function h(e) {
        if ("SHA-1" !== e) throw Error("No SHA variants supported");
        return [1732584193, 4023233417, 2562383102, 271733878, 3285377520]
    }

    function g(e, t) {
        var r, n, a, o, i, s, c, l = [];
        for (r = t[0], n = t[1], a = t[2], o = t[3], i = t[4], c = 0; 80 > c; c += 1) l[c] = 16 > c ? e[c] : d(l[c - 3] ^ l[c - 8] ^ l[c - 14] ^ l[c - 16], 1), s = 20 > c ? p(d(r, 5), n & a ^ ~n & o, i, 1518500249, l[c]) : 40 > c ? p(d(r, 5), n ^ a ^ o, i, 1859775393, l[c]) : 60 > c ? p(d(r, 5), n & a ^ n & o ^ a & o, i, 2400959708, l[c]) : p(d(r, 5), n ^ a ^ o, i, 3395469782, l[c]), i = o, o = a, a = d(n, 30), n = r, r = s;
        return t[0] = m(r, t[0]), t[1] = m(n, t[1]), t[2] = m(a, t[2]), t[3] = m(o, t[3]), t[4] = m(i, t[4]), t
    }

    function y(e, t, r, n) {
        var a;
        for (a = 15 + (t + 65 >>> 9 << 4); e.length <= a;) e.push(0);
        for (e[t >>> 5] |= 128 << 24 - t % 32, t += r, e[a] = 4294967295 & t, e[a - 1] = t / 4294967296 | 0, t = e.length, a = 0; a < t; a += 16) n = g(e.slice(a, a + 16), n);
        return n
    }
    "function" == typeof define && define.amd ? define("sha1", (function() {
        return t
    })) : "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (module.exports = t), exports = t) : e.jsSHA = t
})(this);
var s = void 0,
    u = !1,
    sjcl = {
        cipher: {},
        hash: {},
        keyexchange: {},
        mode: {},
        misc: {},
        codec: {},
        exception: {
            corrupt: function(e) {
                this.toString = function() {
                    return "CORRUPT: " + this.message
                }, this.message = e
            },
            invalid: function(e) {
                this.toString = function() {
                    return "INVALID: " + this.message
                }, this.message = e
            },
            bug: function(e) {
                this.toString = function() {
                    return "BUG: " + this.message
                }, this.message = e
            },
            notReady: function(e) {
                this.toString = function() {
                    return "NOT READY: " + this.message
                }, this.message = e
            }
        }
    };

function w(e, t, r) {
    4 !== t.length && q(new sjcl.exception.invalid("invalid aes block size"));
    var n = e.b[r],
        a = t[0] ^ n[0],
        o = t[r ? 3 : 1] ^ n[1],
        i = t[2] ^ n[2];
    t = t[r ? 1 : 3] ^ n[3];
    var s, c, l, u, f = n.length / 4 - 2,
        d = 4,
        m = [0, 0, 0, 0];
    e = (s = e.k[r])[0];
    var p = s[1],
        h = s[2],
        g = s[3],
        y = s[4];
    for (u = 0; u < f; u++) s = e[a >>> 24] ^ p[o >> 16 & 255] ^ h[i >> 8 & 255] ^ g[255 & t] ^ n[d], c = e[o >>> 24] ^ p[i >> 16 & 255] ^ h[t >> 8 & 255] ^ g[255 & a] ^ n[d + 1], l = e[i >>> 24] ^ p[t >> 16 & 255] ^ h[a >> 8 & 255] ^ g[255 & o] ^ n[d + 2], t = e[t >>> 24] ^ p[a >> 16 & 255] ^ h[o >> 8 & 255] ^ g[255 & i] ^ n[d + 3], d += 4, a = s, o = c, i = l;
    for (u = 0; 4 > u; u++) m[r ? 3 & -u : u] = y[a >>> 24] << 24 ^ y[o >> 16 & 255] << 16 ^ y[i >> 8 & 255] << 8 ^ y[255 & t] ^ n[d++], s = a, a = o, o = i, i = t, t = s;
    return m
}

function x(e, t) {
    var r, n, a, o = t.slice(0),
        i = e.r,
        s = e.b,
        c = i[0],
        l = i[1],
        u = i[2],
        f = i[3],
        d = i[4],
        m = i[5],
        p = i[6],
        h = i[7];
    for (r = 0; 64 > r; r++) 16 > r ? n = o[r] : (n = o[r + 1 & 15], a = o[r + 14 & 15], n = o[15 & r] = (n >>> 7 ^ n >>> 18 ^ n >>> 3 ^ n << 25 ^ n << 14) + (a >>> 17 ^ a >>> 19 ^ a >>> 10 ^ a << 15 ^ a << 13) + o[15 & r] + o[r + 9 & 15] | 0), n = n + h + (d >>> 6 ^ d >>> 11 ^ d >>> 25 ^ d << 26 ^ d << 21 ^ d << 7) + (p ^ d & (m ^ p)) + s[r], h = p, p = m, m = d, d = f + n | 0, f = u, u = l, c = n + ((l = c) & u ^ f & (l ^ u)) + (l >>> 2 ^ l >>> 13 ^ l >>> 22 ^ l << 30 ^ l << 19 ^ l << 10) | 0;
    i[0] = i[0] + c | 0, i[1] = i[1] + l | 0, i[2] = i[2] + u | 0, i[3] = i[3] + f | 0, i[4] = i[4] + d | 0, i[5] = i[5] + m | 0, i[6] = i[6] + p | 0, i[7] = i[7] + h | 0
}

function C(e, t) {
    var r, n = sjcl.random.w[e],
        a = [];
    for (r in n) n.hasOwnProperty(r) && a.push(n[r]);
    for (r = 0; r < a.length; r++) a[r](t)
}

function E(e) {
    "undefined" != typeof window && window.performance && "function" == typeof window.performance.now ? sjcl.random.addEntropy(window.performance.now(), e, "loadtime") : sjcl.random.addEntropy((new Date).valueOf(), e, "loadtime")
}

function A(e) {
    e.b = B(e).concat(B(e)), e.A = new sjcl.cipher.aes(e.b)
}

function B(e) {
    for (var t = 0; 4 > t && (e.f[t] = e.f[t] + 1 | 0, !e.f[t]); t++);
    return e.A.encrypt(e.f)
}

function D(e, t) {
    return function() {
        t.apply(e, arguments)
    }
}
"undefined" != typeof module && module.exports && (module.exports = sjcl), "function" == typeof define && define("sjcl-1.0.3", [], (function() {
    return sjcl
})), sjcl.cipher.aes = function(e) {
    this.k[0][0][0] || this.D();
    var t, r, n, a, o = this.k[0][4],
        i = this.k[1],
        s = 1;
    for (4 !== (t = e.length) && 6 !== t && 8 !== t && q(new sjcl.exception.invalid("invalid aes key size")), this.b = [n = e.slice(0), a = []], e = t; e < 4 * t + 28; e++) r = n[e - 1], (0 == e % t || 8 === t && 4 == e % t) && (r = o[r >>> 24] << 24 ^ o[r >> 16 & 255] << 16 ^ o[r >> 8 & 255] << 8 ^ o[255 & r], 0 == e % t && (r = r << 8 ^ r >>> 24 ^ s << 24, s = s << 1 ^ 283 * (s >> 7))), n[e] = n[e - t] ^ r;
    for (t = 0; e; t++, e--) r = n[3 & t ? e : e - 4], a[t] = 4 >= e || 4 > t ? r : i[0][o[r >>> 24]] ^ i[1][o[r >> 16 & 255]] ^ i[2][o[r >> 8 & 255]] ^ i[3][o[255 & r]]
}, sjcl.cipher.aes.prototype = {
    encrypt: function(e) {
        return w(this, e, 0)
    },
    decrypt: function(e) {
        return w(this, e, 1)
    },
    k: [
        [
            [],
            [],
            [],
            [],
            []
        ],
        [
            [],
            [],
            [],
            [],
            []
        ]
    ],
    D: function() {
        var e, t, r, n, a, o, i, s = this.k[0],
            c = this.k[1],
            l = s[4],
            u = c[4],
            f = [],
            d = [];
        for (e = 0; 256 > e; e++) d[(f[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
        for (t = r = 0; !l[t]; t ^= n || 1, r = d[r] || 1)
            for (o = (o = r ^ r << 1 ^ r << 2 ^ r << 3 ^ r << 4) >> 8 ^ 255 & o ^ 99, l[t] = o, u[o] = t, i = 16843009 * (a = f[e = f[n = f[t]]]) ^ 65537 * e ^ 257 * n ^ 16843008 * t, a = 257 * f[o] ^ 16843008 * o, e = 0; 4 > e; e++) s[e][t] = a = a << 24 ^ a >>> 8, c[e][o] = i = i << 24 ^ i >>> 8;
        for (e = 0; 5 > e; e++) s[e] = s[e].slice(0), c[e] = c[e].slice(0)
    }
}, sjcl.bitArray = {
    bitSlice: function(e, t, r) {
        return e = sjcl.bitArray.P(e.slice(t / 32), 32 - (31 & t)).slice(1), r === s ? e : sjcl.bitArray.clamp(e, r - t)
    },
    extract: function(e, t, r) {
        var n = Math.floor(-t - r & 31);
        return (-32 & (t + r - 1 ^ t) ? e[t / 32 | 0] << 32 - n ^ e[t / 32 + 1 | 0] >>> n : e[t / 32 | 0] >>> n) & (1 << r) - 1
    },
    concat: function(e, t) {
        if (0 === e.length || 0 === t.length) return e.concat(t);
        var r = e[e.length - 1],
            n = sjcl.bitArray.getPartial(r);
        return 32 === n ? e.concat(t) : sjcl.bitArray.P(t, n, 0 | r, e.slice(0, e.length - 1))
    },
    bitLength: function(e) {
        var t = e.length;
        return 0 === t ? 0 : 32 * (t - 1) + sjcl.bitArray.getPartial(e[t - 1])
    },
    clamp: function(e, t) {
        if (32 * e.length < t) return e;
        var r = (e = e.slice(0, Math.ceil(t / 32))).length;
        return t &= 31, 0 < r && t && (e[r - 1] = sjcl.bitArray.partial(t, e[r - 1] & 2147483648 >> t - 1, 1)), e
    },
    partial: function(e, t, r) {
        return 32 === e ? t : (r ? 0 | t : t << 32 - e) + 1099511627776 * e
    },
    getPartial: function(e) {
        return Math.round(e / 1099511627776) || 32
    },
    equal: function(e, t) {
        if (sjcl.bitArray.bitLength(e) !== sjcl.bitArray.bitLength(t)) return u;
        var r, n = 0;
        for (r = 0; r < e.length; r++) n |= e[r] ^ t[r];
        return 0 === n
    },
    P: function(e, t, r, n) {
        var a;
        for (a = 0, n === s && (n = []); 32 <= t; t -= 32) n.push(r), r = 0;
        if (0 === t) return n.concat(e);
        for (a = 0; a < e.length; a++) n.push(r | e[a] >>> t), r = e[a] << 32 - t;
        return a = e.length ? e[e.length - 1] : 0, e = sjcl.bitArray.getPartial(a), n.push(sjcl.bitArray.partial(t + e & 31, 32 < t + e ? r : n.pop(), 1)), n
    },
    l: function(e, t) {
        return [e[0] ^ t[0], e[1] ^ t[1], e[2] ^ t[2], e[3] ^ t[3]]
    },
    byteswapM: function(e) {
        var t, r;
        for (t = 0; t < e.length; ++t) r = e[t], e[t] = r >>> 24 | r >>> 8 & 65280 | (65280 & r) << 8 | r << 24;
        return e
    }
}, sjcl.codec.utf8String = {
    fromBits: function(e) {
        var t, r, n = "",
            a = sjcl.bitArray.bitLength(e);
        for (t = 0; t < a / 8; t++) 0 == (3 & t) && (r = e[t / 4]), n += String.fromCharCode(r >>> 24), r <<= 8;
        return decodeURIComponent(escape(n))
    },
    toBits: function(e) {
        e = unescape(encodeURIComponent(e));
        var t, r = [],
            n = 0;
        for (t = 0; t < e.length; t++) n = n << 8 | e.charCodeAt(t), 3 == (3 & t) && (r.push(n), n = 0);
        return 3 & t && r.push(sjcl.bitArray.partial(8 * (3 & t), n)), r
    }
}, sjcl.codec.hex = {
    fromBits: function(e) {
        var t, r = "";
        for (t = 0; t < e.length; t++) r += (0xf00000000000 + (0 | e[t])).toString(16).substr(4);
        return r.substr(0, sjcl.bitArray.bitLength(e) / 4)
    },
    toBits: function(e) {
        var t, r, n = [];
        for (r = (e = e.replace(/\s|0x/g, "")).length, e += "00000000", t = 0; t < e.length; t += 8) n.push(0 ^ parseInt(e.substr(t, 8), 16));
        return sjcl.bitArray.clamp(n, 4 * r)
    }
}, sjcl.codec.base64 = {
    J: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    fromBits: function(e, t, r) {
        var n = "",
            a = 0,
            o = sjcl.codec.base64.J,
            i = 0,
            s = sjcl.bitArray.bitLength(e);
        for (r && (o = o.substr(0, 62) + "-_"), r = 0; 6 * n.length < s;) n += o.charAt((i ^ e[r] >>> a) >>> 26), 6 > a ? (i = e[r] << 6 - a, a += 26, r++) : (i <<= 6, a -= 6);
        for (; 3 & n.length && !t;) n += "=";
        return n
    },
    toBits: function(e, t) {
        e = e.replace(/\s|=/g, "");
        var r, n, a = [],
            o = 0,
            i = sjcl.codec.base64.J,
            s = 0;
        for (t && (i = i.substr(0, 62) + "-_"), r = 0; r < e.length; r++) 0 > (n = i.indexOf(e.charAt(r))) && q(new sjcl.exception.invalid("this isn't base64!")), 26 < o ? (o -= 26, a.push(s ^ n >>> o), s = n << 32 - o) : s ^= n << 32 - (o += 6);
        return 56 & o && a.push(sjcl.bitArray.partial(56 & o, s, 1)), a
    }
}, sjcl.codec.base64url = {
    fromBits: function(e) {
        return sjcl.codec.base64.fromBits(e, 1, 1)
    },
    toBits: function(e) {
        return sjcl.codec.base64.toBits(e, 1)
    }
}, sjcl.hash.sha256 = function(e) {
    this.b[0] || this.D(), e ? (this.r = e.r.slice(0), this.o = e.o.slice(0), this.h = e.h) : this.reset()
}, sjcl.hash.sha256.hash = function(e) {
    return (new sjcl.hash.sha256).update(e).finalize()
}, sjcl.hash.sha256.prototype = {
    blockSize: 512,
    reset: function() {
        return this.r = this.N.slice(0), this.o = [], this.h = 0, this
    },
    update: function(e) {
        "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e));
        var t, r = this.o = sjcl.bitArray.concat(this.o, e);
        for (t = this.h, e = this.h = t + sjcl.bitArray.bitLength(e), t = 512 + t & -512; t <= e; t += 512) x(this, r.splice(0, 16));
        return this
    },
    finalize: function() {
        var e, t = this.o,
            r = this.r;
        for (e = (t = sjcl.bitArray.concat(t, [sjcl.bitArray.partial(1, 1)])).length + 2; 15 & e; e++) t.push(0);
        for (t.push(Math.floor(this.h / 4294967296)), t.push(0 | this.h); t.length;) x(this, t.splice(0, 16));
        return this.reset(), r
    },
    N: [],
    b: [],
    D: function() {
        function e(e) {
            return 4294967296 * (e - Math.floor(e)) | 0
        }
        var t, r = 0,
            n = 2;
        e: for (; 64 > r; n++) {
            for (t = 2; t * t <= n; t++)
                if (0 == n % t) continue e;
            8 > r && (this.N[r] = e(Math.pow(n, .5))), this.b[r] = e(Math.pow(n, 1 / 3)), r++
        }
    }
}, sjcl.mode.ccm = {
    name: "ccm",
    encrypt: function(e, t, r, n, a) {
        var o, i = t.slice(0),
            s = sjcl.bitArray,
            c = s.bitLength(r) / 8,
            l = s.bitLength(i) / 8;
        for (a = a || 64, n = n || [], 7 > c && q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")), o = 2; 4 > o && l >>> 8 * o; o++);
        return o < 15 - c && (o = 15 - c), r = s.clamp(r, 8 * (15 - o)), t = sjcl.mode.ccm.L(e, t, r, n, a, o), i = sjcl.mode.ccm.p(e, i, r, t, a, o), s.concat(i.data, i.tag)
    },
    decrypt: function(e, t, r, n, a) {
        a = a || 64, n = n || [];
        var o = sjcl.bitArray,
            i = o.bitLength(r) / 8,
            s = o.bitLength(t),
            c = o.clamp(t, s - a),
            l = o.bitSlice(t, s - a);
        s = (s - a) / 8;
        for (7 > i && q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")), t = 2; 4 > t && s >>> 8 * t; t++);
        return t < 15 - i && (t = 15 - i), r = o.clamp(r, 8 * (15 - t)), c = sjcl.mode.ccm.p(e, c, r, l, a, t), e = sjcl.mode.ccm.L(e, c.data, r, n, a, t), o.equal(c.tag, e) || q(new sjcl.exception.corrupt("ccm: tag doesn't match")), c.data
    },
    L: function(e, t, r, n, a, o) {
        var i = [],
            s = sjcl.bitArray,
            c = s.l;
        if (((a /= 8) % 2 || 4 > a || 16 < a) && q(new sjcl.exception.invalid("ccm: invalid tag length")), (4294967295 < n.length || 4294967295 < t.length) && q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")), o = [s.partial(8, (n.length ? 64 : 0) | a - 2 << 2 | o - 1)], (o = s.concat(o, r))[3] |= s.bitLength(t) / 8, o = e.encrypt(o), n.length)
            for (65279 >= (r = s.bitLength(n) / 8) ? i = [s.partial(16, r)] : 4294967295 >= r && (i = s.concat([s.partial(16, 65534)], [r])), i = s.concat(i, n), n = 0; n < i.length; n += 4) o = e.encrypt(c(o, i.slice(n, n + 4).concat([0, 0, 0])));
        for (n = 0; n < t.length; n += 4) o = e.encrypt(c(o, t.slice(n, n + 4).concat([0, 0, 0])));
        return s.clamp(o, 8 * a)
    },
    p: function(e, t, r, n, a, o) {
        var i, s = sjcl.bitArray;
        i = s.l;
        var c = t.length,
            l = s.bitLength(t);
        if (r = s.concat([s.partial(8, o - 1)], r).concat([0, 0, 0]).slice(0, 4), n = s.bitSlice(i(n, e.encrypt(r)), 0, a), !c) return {
            tag: n,
            data: []
        };
        for (i = 0; i < c; i += 4) r[3]++, a = e.encrypt(r), t[i] ^= a[0], t[i + 1] ^= a[1], t[i + 2] ^= a[2], t[i + 3] ^= a[3];
        return {
            tag: n,
            data: s.clamp(t, l)
        }
    }
}, sjcl.mode.ocb2 = {
    name: "ocb2",
    encrypt: function(e, t, r, n, a, o) {
        128 !== sjcl.bitArray.bitLength(r) && q(new sjcl.exception.invalid("ocb iv must be 128 bits"));
        var i, s = sjcl.mode.ocb2.H,
            c = sjcl.bitArray,
            l = c.l,
            u = [0, 0, 0, 0];
        r = s(e.encrypt(r));
        var f, d = [];
        for (n = n || [], a = a || 64, i = 0; i + 4 < t.length; i += 4) u = l(u, f = t.slice(i, i + 4)), d = d.concat(l(r, e.encrypt(l(r, f)))), r = s(r);
        return f = t.slice(i), t = c.bitLength(f), i = e.encrypt(l(r, [0, 0, 0, t])), f = c.clamp(l(f.concat([0, 0, 0]), i), t), u = l(u, l(f.concat([0, 0, 0]), i)), u = e.encrypt(l(u, l(r, s(r)))), n.length && (u = l(u, o ? n : sjcl.mode.ocb2.pmac(e, n))), d.concat(c.concat(f, c.clamp(u, a)))
    },
    decrypt: function(e, t, r, n, a, o) {
        128 !== sjcl.bitArray.bitLength(r) && q(new sjcl.exception.invalid("ocb iv must be 128 bits")), a = a || 64;
        var i, s, c = sjcl.mode.ocb2.H,
            l = sjcl.bitArray,
            u = l.l,
            f = [0, 0, 0, 0],
            d = c(e.encrypt(r)),
            m = sjcl.bitArray.bitLength(t) - a,
            p = [];
        for (n = n || [], r = 0; r + 4 < m / 32; r += 4) i = u(d, e.decrypt(u(d, t.slice(r, r + 4)))), f = u(f, i), p = p.concat(i), d = c(d);
        return s = m - 32 * r, i = e.encrypt(u(d, [0, 0, 0, s])), i = u(i, l.clamp(t.slice(r), s).concat([0, 0, 0])), f = u(f, i), f = e.encrypt(u(f, u(d, c(d)))), n.length && (f = u(f, o ? n : sjcl.mode.ocb2.pmac(e, n))), l.equal(l.clamp(f, a), l.bitSlice(t, m)) || q(new sjcl.exception.corrupt("ocb: tag doesn't match")), p.concat(l.clamp(i, s))
    },
    pmac: function(e, t) {
        var r, n = sjcl.mode.ocb2.H,
            a = sjcl.bitArray,
            o = a.l,
            i = [0, 0, 0, 0],
            s = o(s = e.encrypt([0, 0, 0, 0]), n(n(s)));
        for (r = 0; r + 4 < t.length; r += 4) s = n(s), i = o(i, e.encrypt(o(s, t.slice(r, r + 4))));
        return r = t.slice(r), 128 > a.bitLength(r) && (s = o(s, n(s)), r = a.concat(r, [-2147483648, 0, 0, 0])), i = o(i, r), e.encrypt(o(n(o(s, n(s))), i))
    },
    H: function(e) {
        return [e[0] << 1 ^ e[1] >>> 31, e[1] << 1 ^ e[2] >>> 31, e[2] << 1 ^ e[3] >>> 31, e[3] << 1 ^ 135 * (e[0] >>> 31)]
    }
}, sjcl.mode.gcm = {
    name: "gcm",
    encrypt: function(e, t, r, n, a) {
        var o = t.slice(0);
        return t = sjcl.bitArray, n = n || [], e = sjcl.mode.gcm.p(!0, e, o, n, r, a || 128), t.concat(e.data, e.tag)
    },
    decrypt: function(e, t, r, n, a) {
        var o = t.slice(0),
            i = sjcl.bitArray,
            s = i.bitLength(o);
        return n = n || [], (a = a || 128) <= s ? (t = i.bitSlice(o, s - a), o = i.bitSlice(o, 0, s - a)) : (t = o, o = []), e = sjcl.mode.gcm.p(u, e, o, n, r, a), i.equal(e.tag, t) || q(new sjcl.exception.corrupt("gcm: tag doesn't match")), e.data
    },
    Z: function(e, t) {
        var r, n, a, o, i, s = sjcl.bitArray.l;
        for (a = [0, 0, 0, 0], o = t.slice(0), r = 0; 128 > r; r++) {
            for ((n = 0 != (e[Math.floor(r / 32)] & 1 << 31 - r % 32)) && (a = s(a, o)), i = 0 != (1 & o[3]), n = 3; 0 < n; n--) o[n] = o[n] >>> 1 | (1 & o[n - 1]) << 31;
            o[0] >>>= 1, i && (o[0] ^= -520093696)
        }
        return a
    },
    g: function(e, t, r) {
        var n, a = r.length;
        for (t = t.slice(0), n = 0; n < a; n += 4) t[0] ^= 4294967295 & r[n], t[1] ^= 4294967295 & r[n + 1], t[2] ^= 4294967295 & r[n + 2], t[3] ^= 4294967295 & r[n + 3], t = sjcl.mode.gcm.Z(t, e);
        return t
    },
    p: function(e, t, r, n, a, o) {
        var i, s, c, l, u, f, d, m, p = sjcl.bitArray;
        for (f = r.length, d = p.bitLength(r), m = p.bitLength(n), s = p.bitLength(a), i = t.encrypt([0, 0, 0, 0]), 96 === s ? (a = a.slice(0), a = p.concat(a, [1])) : (a = sjcl.mode.gcm.g(i, [0, 0, 0, 0], a), a = sjcl.mode.gcm.g(i, a, [0, 0, Math.floor(s / 4294967296), 4294967295 & s])), s = sjcl.mode.gcm.g(i, [0, 0, 0, 0], n), u = a.slice(0), n = s.slice(0), e || (n = sjcl.mode.gcm.g(i, s, r)), l = 0; l < f; l += 4) u[3]++, c = t.encrypt(u), r[l] ^= c[0], r[l + 1] ^= c[1], r[l + 2] ^= c[2], r[l + 3] ^= c[3];
        return r = p.clamp(r, d), e && (n = sjcl.mode.gcm.g(i, s, r)), e = [Math.floor(m / 4294967296), 4294967295 & m, Math.floor(d / 4294967296), 4294967295 & d], n = sjcl.mode.gcm.g(i, n, e), c = t.encrypt(a), n[0] ^= c[0], n[1] ^= c[1], n[2] ^= c[2], n[3] ^= c[3], {
            tag: p.bitSlice(n, 0, o),
            data: r
        }
    }
}, sjcl.misc.hmac = function(e, t) {
    this.M = t = t || sjcl.hash.sha256;
    var r, n = [
            [],
            []
        ],
        a = t.prototype.blockSize / 32;
    for (this.n = [new t, new t], e.length > a && (e = t.hash(e)), r = 0; r < a; r++) n[0][r] = 909522486 ^ e[r], n[1][r] = 1549556828 ^ e[r];
    this.n[0].update(n[0]), this.n[1].update(n[1]), this.G = new t(this.n[0])
}, sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function(e) {
    return this.Q && q(new sjcl.exception.invalid("encrypt on already updated hmac called!")), this.update(e), this.digest(e)
}, sjcl.misc.hmac.prototype.reset = function() {
    this.G = new this.M(this.n[0]), this.Q = u
}, sjcl.misc.hmac.prototype.update = function(e) {
    this.Q = !0, this.G.update(e)
}, sjcl.misc.hmac.prototype.digest = function() {
    var e = this.G.finalize();
    e = new this.M(this.n[1]).update(e).finalize();
    return this.reset(), e
}, sjcl.misc.pbkdf2 = function(e, t, r, n, a) {
    r = r || 1e3, (0 > n || 0 > r) && q(sjcl.exception.invalid("invalid params to pbkdf2")), "string" == typeof e && (e = sjcl.codec.utf8String.toBits(e)), "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t)), e = new(a = a || sjcl.misc.hmac)(e);
    var o, i, s, c, l = [],
        u = sjcl.bitArray;
    for (c = 1; 32 * l.length < (n || 1); c++) {
        for (a = o = e.encrypt(u.concat(t, [c])), i = 1; i < r; i++)
            for (o = e.encrypt(o), s = 0; s < o.length; s++) a[s] ^= o[s];
        l = l.concat(a)
    }
    return n && (l = u.clamp(l, n)), l
}, sjcl.prng = function(e) {
    this.c = [new sjcl.hash.sha256], this.i = [0], this.F = 0, this.s = {}, this.C = 0, this.K = {}, this.O = this.d = this.j = this.W = 0, this.b = [0, 0, 0, 0, 0, 0, 0, 0], this.f = [0, 0, 0, 0], this.A = s, this.B = e, this.q = u, this.w = {
        progress: {},
        seeded: {}
    }, this.m = this.V = 0, this.t = 1, this.u = 2, this.S = 65536, this.I = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024], this.T = 3e4, this.R = 80
}, sjcl.prng.prototype = {
    randomWords: function(e, t) {
        var r, n, a = [];
        if ((r = this.isReady(t)) === this.m && q(new sjcl.exception.notReady("generator isn't seeded")), r & this.u) {
            r = !(r & this.t), n = [];
            var o, i = 0;
            for (this.O = n[0] = (new Date).valueOf() + this.T, o = 0; 16 > o; o++) n.push(4294967296 * Math.random() | 0);
            for (o = 0; o < this.c.length && (n = n.concat(this.c[o].finalize()), i += this.i[o], this.i[o] = 0, r || !(this.F & 1 << o)); o++);
            for (this.F >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256), this.i.push(0)), this.d -= i, i > this.j && (this.j = i), this.F++, this.b = sjcl.hash.sha256.hash(this.b.concat(n)), this.A = new sjcl.cipher.aes(this.b), r = 0; 4 > r && (this.f[r] = this.f[r] + 1 | 0, !this.f[r]); r++);
        }
        for (r = 0; r < e; r += 4) 0 == (r + 1) % this.S && A(this), n = B(this), a.push(n[0], n[1], n[2], n[3]);
        return A(this), a.slice(0, e)
    },
    setDefaultParanoia: function(e, t) {
        0 === e && "Setting paranoia=0 will ruin your security; use it only for testing" !== t && q("Setting paranoia=0 will ruin your security; use it only for testing"), this.B = e
    },
    addEntropy: function(e, t, r) {
        r = r || "user";
        var n, a, o = (new Date).valueOf(),
            i = this.s[r],
            c = this.isReady(),
            l = 0;
        switch ((n = this.K[r]) === s && (n = this.K[r] = this.W++), i === s && (i = this.s[r] = 0), this.s[r] = (this.s[r] + 1) % this.c.length, typeof e) {
            case "number":
                t === s && (t = 1), this.c[i].update([n, this.C++, 1, t, o, 1, 0 | e]);
                break;
            case "object":
                if ("[object Uint32Array]" === (r = Object.prototype.toString.call(e))) {
                    for (a = [], r = 0; r < e.length; r++) a.push(e[r]);
                    e = a
                } else
                    for ("[object Array]" !== r && (l = 1), r = 0; r < e.length && !l; r++) "number" != typeof e[r] && (l = 1);
                if (!l) {
                    if (t === s)
                        for (r = t = 0; r < e.length; r++)
                            for (a = e[r]; 0 < a;) t++, a >>>= 1;
                    this.c[i].update([n, this.C++, 2, t, o, e.length].concat(e))
                }
                break;
            case "string":
                t === s && (t = e.length), this.c[i].update([n, this.C++, 3, t, o, e.length]), this.c[i].update(e);
                break;
            default:
                l = 1
        }
        l && q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")), this.i[i] += t, this.d += t, c === this.m && (this.isReady() !== this.m && C("seeded", Math.max(this.j, this.d)), C("progress", this.getProgress()))
    },
    isReady: function(e) {
        return e = this.I[e !== s ? e : this.B], this.j && this.j >= e ? this.i[0] > this.R && (new Date).valueOf() > this.O ? this.u | this.t : this.t : this.d >= e ? this.u | this.m : this.m
    },
    getProgress: function(e) {
        return e = this.I[e || this.B], this.j >= e ? 1 : this.d > e ? 1 : this.d / e
    },
    startCollectors: function() {
        this.q || (this.a = {
            loadTimeCollector: D(this, this.aa),
            mouseCollector: D(this, this.ba),
            keyboardCollector: D(this, this.$),
            accelerometerCollector: D(this, this.U),
            touchCollector: D(this, this.da)
        }, window.addEventListener ? (window.addEventListener("load", this.a.loadTimeCollector, u), window.addEventListener("mousemove", this.a.mouseCollector, u), window.addEventListener("keypress", this.a.keyboardCollector, u), window.addEventListener("devicemotion", this.a.accelerometerCollector, u), window.addEventListener("touchmove", this.a.touchCollector, u)) : document.attachEvent ? (document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector)) : q(new sjcl.exception.bug("can't attach event")), this.q = !0)
    },
    stopCollectors: function() {
        this.q && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, u), window.removeEventListener("mousemove", this.a.mouseCollector, u), window.removeEventListener("keypress", this.a.keyboardCollector, u), window.removeEventListener("devicemotion", this.a.accelerometerCollector, u), window.removeEventListener("touchmove", this.a.touchCollector, u)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.q = u)
    },
    addEventListener: function(e, t) {
        this.w[e][this.V++] = t
    },
    removeEventListener: function(e, t) {
        var r, n, a = this.w[e],
            o = [];
        for (n in a) a.hasOwnProperty(n) && a[n] === t && o.push(n);
        for (r = 0; r < o.length; r++) delete a[n = o[r]]
    },
    $: function() {
        E(1)
    },
    ba: function(e) {
        var t, r;
        try {
            t = e.x || e.clientX || e.offsetX || 0, r = e.y || e.clientY || e.offsetY || 0
        } catch (e) {
            r = t = 0
        }
        0 != t && 0 != r && sjcl.random.addEntropy([t, r], 2, "mouse"), E(0)
    },
    da: function(e) {
        e = e.touches[0] || e.changedTouches[0], sjcl.random.addEntropy([e.pageX || e.clientX, e.pageY || e.clientY], 1, "touch"), E(0)
    },
    aa: function() {
        E(2)
    },
    U: function(e) {
        if (e = e.accelerationIncludingGravity.x || e.accelerationIncludingGravity.y || e.accelerationIncludingGravity.z, window.orientation) {
            var t = window.orientation;
            "number" == typeof t && sjcl.random.addEntropy(t, 1, "accelerometer")
        }
        e && sjcl.random.addEntropy(e, 2, "accelerometer"), E(0)
    }
}, sjcl.random = new sjcl.prng(6);
e: try {
    var F, G, H, I;
    if (I = "undefined" != typeof module) {
        var J;
        if (J = module.exports) {
            var K;
            try {
                K = require("crypto")
            } catch (e) {
                K = null
            }
            J = (G = K) && G.randomBytes
        }
        I = J
    }
    if (I) F = G.randomBytes(128), F = new Uint32Array(new Uint8Array(F).buffer), sjcl.random.addEntropy(F, 1024, "crypto['randomBytes']");
    else if ("undefined" != typeof window && "undefined" != typeof Uint32Array) {
        if (H = new Uint32Array(32), window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(H);
        else {
            if (!window.msCrypto || !window.msCrypto.getRandomValues) break e;
            window.msCrypto.getRandomValues(H)
        }
        sjcl.random.addEntropy(H, 1024, "crypto['getRandomValues']")
    }
} catch (e) {
    "undefined" != typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(e))
}
sjcl.json = {
    defaults: {
        v: 1,
        iter: 1e3,
        ks: 128,
        ts: 64,
        mode: "ccm",
        adata: "",
        cipher: "aes"
    },
    Y: function(e, t, r, n) {
        r = r || {}, n = n || {};
        var a, o = sjcl.json,
            i = o.e({
                iv: sjcl.random.randomWords(4, 0)
            }, o.defaults);
        return o.e(i, r), r = i.adata, "string" == typeof i.salt && (i.salt = sjcl.codec.base64.toBits(i.salt)), "string" == typeof i.iv && (i.iv = sjcl.codec.base64.toBits(i.iv)), (!sjcl.mode[i.mode] || !sjcl.cipher[i.cipher] || "string" == typeof e && 100 >= i.iter || 64 !== i.ts && 96 !== i.ts && 128 !== i.ts || 128 !== i.ks && 192 !== i.ks && 256 !== i.ks || 2 > i.iv.length || 4 < i.iv.length) && q(new sjcl.exception.invalid("json encrypt: invalid parameters")), "string" == typeof e ? (e = (a = sjcl.misc.cachedPbkdf2(e, i)).key.slice(0, i.ks / 32), i.salt = a.salt) : sjcl.ecc && e instanceof sjcl.ecc.elGamal.publicKey && (a = e.kem(), i.kemtag = a.tag, e = a.key.slice(0, i.ks / 32)), "string" == typeof t && (t = sjcl.codec.utf8String.toBits(t)), "string" == typeof r && (i.adata = r = sjcl.codec.utf8String.toBits(r)), a = new sjcl.cipher[i.cipher](e), o.e(n, i), n.key = e, i.ct = sjcl.mode[i.mode].encrypt(a, t, i.iv, r, i.ts), i
    },
    encrypt: function(e, t, r, n) {
        var a = sjcl.json,
            o = a.Y.apply(a, arguments);
        return a.encode(o)
    },
    X: function(e, t, r, n) {
        r = r || {}, n = n || {};
        var a, o, i = sjcl.json;
        return a = (t = i.e(i.e(i.e({}, i.defaults), t), r, !0)).adata, "string" == typeof t.salt && (t.salt = sjcl.codec.base64.toBits(t.salt)), "string" == typeof t.iv && (t.iv = sjcl.codec.base64.toBits(t.iv)), (!sjcl.mode[t.mode] || !sjcl.cipher[t.cipher] || "string" == typeof e && 100 >= t.iter || 64 !== t.ts && 96 !== t.ts && 128 !== t.ts || 128 !== t.ks && 192 !== t.ks && 256 !== t.ks || !t.iv || 2 > t.iv.length || 4 < t.iv.length) && q(new sjcl.exception.invalid("json decrypt: invalid parameters")), "string" == typeof e ? (e = (o = sjcl.misc.cachedPbkdf2(e, t)).key.slice(0, t.ks / 32), t.salt = o.salt) : sjcl.ecc && e instanceof sjcl.ecc.elGamal.secretKey && (e = e.unkem(sjcl.codec.base64.toBits(t.kemtag)).slice(0, t.ks / 32)), "string" == typeof a && (a = sjcl.codec.utf8String.toBits(a)), o = new sjcl.cipher[t.cipher](e), a = sjcl.mode[t.mode].decrypt(o, t.ct, t.iv, a, t.ts), i.e(n, t), n.key = e, 1 === r.raw ? a : sjcl.codec.utf8String.fromBits(a)
    },
    decrypt: function(e, t, r, n) {
        var a = sjcl.json;
        return a.X(e, a.decode(t), r, n)
    },
    encode: function(e) {
        var t, r = "{",
            n = "";
        for (t in e)
            if (e.hasOwnProperty(t)) switch (t.match(/^[a-z0-9]+$/i) || q(new sjcl.exception.invalid("json encode: invalid property name")), r += n + '"' + t + '":', n = ",", typeof e[t]) {
                case "number":
                case "boolean":
                    r += e[t];
                    break;
                case "string":
                    r += '"' + escape(e[t]) + '"';
                    break;
                case "object":
                    r += '"' + sjcl.codec.base64.fromBits(e[t], 0) + '"';
                    break;
                default:
                    q(new sjcl.exception.bug("json encode: unsupported type"))
            }
        return r + "}"
    },
    decode: function(e) {
        (e = e.replace(/\s/g, "")).match(/^\{.*\}$/) || q(new sjcl.exception.invalid("json decode: this isn't json!")), e = e.replace(/^\{|\}$/g, "").split(/,/);
        var t, r, n = {};
        for (t = 0; t < e.length; t++)(r = e[t].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i)) || q(new sjcl.exception.invalid("json decode: this isn't json!")), r[3] ? n[r[2]] = parseInt(r[3], 10) : r[4] ? n[r[2]] = r[2].match(/^(ct|adata|salt|iv)$/) ? sjcl.codec.base64.toBits(r[4]) : unescape(r[4]) : r[5] && (n[r[2]] = "true" === r[5]);
        return n
    },
    e: function(e, t, r) {
        if (e === s && (e = {}), t === s) return e;
        for (var n in t) t.hasOwnProperty(n) && (r && e[n] !== s && e[n] !== t[n] && q(new sjcl.exception.invalid("required parameter overridden")), e[n] = t[n]);
        return e
    },
    fa: function(e, t) {
        var r, n = {};
        for (r in e) e.hasOwnProperty(r) && e[r] !== t[r] && (n[r] = e[r]);
        return n
    },
    ea: function(e, t) {
        var r, n = {};
        for (r = 0; r < t.length; r++) e[t[r]] !== s && (n[t[r]] = e[t[r]]);
        return n
    }
}, sjcl.encrypt = sjcl.json.encrypt, sjcl.decrypt = sjcl.json.decrypt, sjcl.misc.ca = {}, sjcl.misc.cachedPbkdf2 = function(e, t) {
    var r, n = sjcl.misc.ca;
    return r = (t = t || {}).iter || 1e3, (r = (n = n[e] = n[e] || {})[r] = n[r] || {
        firstSalt: t.salt && t.salt.length ? t.salt.slice(0) : sjcl.random.randomWords(2, 0)
    })[n = t.salt === s ? r.firstSalt : t.salt] = r[n] || sjcl.misc.pbkdf2(e, n, t.iter), {
        key: r[n].slice(0),
        salt: n.slice(0)
    }
};
//# sourceMappingURL=pkg-i18n.min.js-vfl8U91Vs.map