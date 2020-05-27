define("modules/clean/metrics/coin", ["require", "exports", "apex-metrics"], (function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = (function() {
        function t(t, e, i, n) {
            this.bias = t, this.clock = e, this.flipCondition = i, this.randomEngine = n
        }
        return t.prototype.observe = function() {
            return this.lastFlip && !this.flipCondition(this.lastFlip) || (this.result = this.randomEngine() < this.bias, this.lastFlip = this.clock.now()), this.result
        }, t
    })();

    function r(t, e, i) {
        if (!i.stickiness || !i.stickiness.limit || "n_results" !== i.stickiness.limit[".tag"]) return null;
        var r = i.stickiness.limit.n_results,
            o = r;
        return new n(i.fraction || 0, e, (function() {
            return --o <= 0 && (o = r, !0)
        }), t)
    }

    function o(t, e, r) {
        if (!r.stickiness || !r.stickiness.limit || "n_seconds" !== r.stickiness.limit[".tag"]) return null;
        var o = i.Instant.toMilliseconds({
            value: r.stickiness.limit.n_seconds,
            unit: i.TimeUnit.SECONDS
        });
        return new n(r.fraction || 0, e, (function(t) {
            return i.Instant.toMilliseconds(e.now()) - i.Instant.toMilliseconds(t) > o
        }), t)
    }

    function a(t, e, i) {
        return i.stickiness && i.stickiness.limit && "independent" === i.stickiness.limit[".tag"] ? new n(i.fraction || 0, e, (function() {
            return !0
        }), t) : null
    }

    function s(t, e, i) {
        return i.stickiness && i.stickiness.limit && "permanent" === i.stickiness.limit[".tag"] ? new n(i.fraction || 0, e, (function() {
            return !1
        }), t) : null
    }
    e.StickyBiasedCoin = n, e.makeCoin = function(t, e, i) {
        for (var n = 0, c = [a, o, r, s]; n < c.length; n++) {
            var u = (0, c[n])(t, e, i);
            if (u) return u
        }
        return s(t, e, {
            stickiness: {
                limit: {
                    ".tag": "permanent"
                }
            },
            fraction: 0
        })
    }
})), define("modules/clean/metrics/filter", ["require", "exports", "tslib", "modules/clean/metrics/serialization"], (function(t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = (function() {
        function t(t, e) {
            this.maxScopes = t, this.coinMap = e
        }
        return t.prototype.extend = function(e, n) {
            return new t(e || this.maxScopes, i.__assign(i.__assign({}, this.coinMap), n))
        }, t.prototype.partitionAndSerializeSpans = function(t, e) {
            var i = this,
                r = [],
                o = new Map,
                a = 0;
            return t.forEach((function(t, s) {
                var c = i.coinMap[s] || {},
                    u = c.dropPeriodCoin,
                    l = void 0 === u ? null : u,
                    p = c.dropSamplesCoin,
                    _ = void 0 === p ? null : p;
                l && l.observe() || (_ && (t = t.map((function(t) {
                    return {
                        namespace: t.namespace,
                        metricName: t.metricName,
                        tags: t.tags,
                        samples: t.samples.filter((function() {
                            return !_.observe()
                        }))
                    }
                })).filter((function(t) {
                    return Object.keys(t.samples).length > 0
                }))), 0 !== t.length && (0 === i.maxScopes || a < i.maxScopes ? (r.push(n.formatSpansAsScope(e, s, t)), a++) : o.set(s, t)))
            })), [r, o]
        }, t
    })();
    e.SpanGroupFilter = r
})), define("modules/clean/metrics/index", ["require", "exports", "apex-metrics", "modules/clean/api_v2/noauth_client", "modules/clean/metrics/sink"], (function(t, e, i, n, r) {
    "use strict";

    function o() {
        return new i.BrowserPerformanceClock
    }

    function a() {
        return new i.SetIntervalExecutor
    }

    function s() {
        return Math.random
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var c = new n.NoAuthApiV2Client,
        u = new r.Apiv2MetricsSink(c, o(), r.makeDefaultConfigLoader(c), a(), s());
    e.getMetricsReporter = function() {
        return i.MetricsReporterImpl.root(u, o())
    }, e.getTestMetricsReporter = function(t, e, n, c, u) {
        var l = c || o(),
            p = n || a(),
            _ = e || r.makeDefaultConfigLoader(t),
            d = u || s();
        return i.MetricsReporterImpl.root(new r.Apiv2MetricsSink(t, l, _, p, d), l)
    }
})), define("modules/clean/metrics/serialization", ["require", "exports"], (function(t, e) {
    "use strict";

    function i(t) {
        var e = [];
        for (var i in t)
            if (t.hasOwnProperty(i)) {
                var n = t[i];
                e.push({
                    name: {
                        value: {
                            ".tag": "string_value",
                            string_value: i
                        }
                    },
                    value: {
                        value: {
                            ".tag": "string_value",
                            string_value: n
                        }
                    }
                })
            }
        return e
    }

    function n(t) {
        return {
            name: {
                value: {
                    ".tag": "string_value",
                    string_value: t.metricName
                }
            },
            data: {
                ".tag": "numerical_data",
                samples: t.samples
            }
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.formatTags = i, e.formatSamples = n, e.formatSpansAsScope = function(t, e, r) {
        var o = new Map;
        return r.forEach((function(t) {
            var e, i = JSON.stringify(t.tags);
            o.has(i) || o.set(i, {});
            var n = o.get(i);
            n.hasOwnProperty(t.metricName) ? (e = n[t.metricName].samples).push.apply(e, t.samples) : n[t.metricName] = t
        })), {
            timestamp_sec: t,
            metric_namespace: e,
            tags: [],
            descendants: Array.from(o.values()).map((function(t) {
                return {
                    tags: i(t[Object.keys(t)[0]].tags),
                    metrics: Object.keys(t).map((function(e) {
                        return n(t[e])
                    }))
                }
            }))
        }
    }
})), define("modules/clean/metrics/sink", ["require", "exports", "tslib", "apex-metrics", "modules/clean/metrics/coin", "modules/clean/metrics/filter", "modules/core/browser_detection", "modules/constants/page_load"], (function(t, e, i, n, r, o, a, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), a = i.__importStar(a);
    var c = {
            ".tag": "trigger_heartbeat"
        },
        u = {
            ".tag": "trigger_publish"
        },
        l = {
            client_version: 5,
            implementation: {
                ".tag": "typescript"
            }
        };

    function p(t, e, i) {
        return {
            scopes: t,
            known_namespaces: e,
            environment: "prod",
            artifact_name: "dropbox-web",
            artifact_version: s.REPO_REV,
            client_metadata: l,
            trigger: i,
            os: a.mac ? {
                name: {
                    ".tag": "mac"
                },
                version: "unknown"
            } : a.windows ? {
                name: {
                    ".tag": "windows"
                },
                version: (n = a.windowsInfo, n.windowsXP || n.windowsXPx64 ? "XP" : n.windowsVista ? "Vista" : n.windows7 ? "7" : n.windows8 ? "8" : n.windows8_1 ? "8.1" : n.windows10 ? "10 Unknown" : "unknown")
            } : a.is_android() ? {
                name: {
                    ".tag": "android"
                },
                version: "unknown"
            } : a.iOS ? {
                name: {
                    ".tag": "ios"
                },
                version: "unknown"
            } : {
                name: {
                    ".tag": "unknown_os"
                },
                version: "unknown"
            }
        };
        var n
    }
    e.makeDefaultConfigLoader = function(t) {
        return function() {
            return t.ns("client_metrics").rpc("record", p([], [], c), {})
        }
    };
    var _ = (function() {
        function t(t, e, i, n, r) {
            var o = this;
            this.client = t, this.clock = e, this.configLoader = i, this.executor = n, this.randomEngine = r, this.nextRequest = null, this.queuedSpans = new Map, this.currentRequest = this.configLoader(), this.currentRequest.then((function(t) {
                t && o.updateConfiguration(t)
            }))
        }
        return t.prototype.updateConfiguration = function(t) {
            var e = t,
                i = e.reporting_configs,
                r = void 0 === i ? [] : i,
                o = e.stop_publication_for_seconds,
                a = e.publication_interval_seconds,
                s = e.max_scopes_per_request;
            this.updateBlackoutCallback({
                value: o,
                unit: n.TimeUnit.SECONDS
            }), this.updatePublishTimer({
                value: a,
                unit: n.TimeUnit.SECONDS
            }), this.updateSpanGroupFilter(s, r)
        }, t.prototype.updateSpanGroupFilter = function(t, e) {
            var i = this,
                n = {};
            e.forEach((function(t) {
                n[t.metric_namespace] = {
                    dropPeriodCoin: t.drop_periods ? r.makeCoin(i.randomEngine, i.clock, t.drop_periods) : null,
                    dropSamplesCoin: t.drop_samples ? r.makeCoin(i.randomEngine, i.clock, t.drop_samples) : null
                }
            })), this.spanGroupFilter = this.spanGroupFilter ? this.spanGroupFilter.extend(t, n) : new o.SpanGroupFilter(t, n)
        }, t.prototype.updateBlackoutCallback = function(t) {
            var e = this;
            0 !== t.value ? (this.blackoutCallback = function() {
                return e.blackoutCallback = null, !1
            }, this.executor.executeEvery(t, this.blackoutCallback)) : this.blackoutCallback = null
        }, t.prototype.updatePublishTimer = function(t) {
            var e = this;
            if (0 !== t.value) {
                if (!this.publishTimer || n.Instant.toMilliseconds(this.publishTimer.period) !== n.Instant.toMilliseconds(t)) {
                    var i = {
                        period: t,
                        callback: function() {
                            return e.publishTimer === i && (e.nextRequest = e.currentRequest.then((function() {
                                e.nextRequest = null, e.currentRequest = e.send()
                            })), !0)
                        }
                    };
                    this.publishTimer = i, this.executor.executeEvery(this.publishTimer.period, this.publishTimer.callback)
                }
            } else this.publishTimer = null
        }, t.prototype.send = function() {
            return i.__awaiter(this, void 0, void 0, (function() {
                var t, e, n, r, o, a;
                return i.__generator(this, (function(i) {
                    switch (i.label) {
                        case 0:
                            return this.blackoutCallback ? [2, null] : (t = Math.floor(Date.now() / 1e3), e = Array.from(this.queuedSpans.keys()), n = this.spanGroupFilter.partitionAndSerializeSpans(this.queuedSpans, t), r = n[0], o = n[1], a = null, this.queuedSpans = o, r.length > 0 ? [4, this.client.ns("client_metrics").rpc("record", p(r, e, u), {})] : [3, 2]);
                        case 1:
                            a = i.sent(), this.updateConfiguration(a), i.label = 2;
                        case 2:
                            return [2, a]
                    }
                }))
            }))
        }, t.prototype.recordSpan = function(t) {
            var e = this;
            this.queuedSpans.has(t.namespace) || this.queuedSpans.set(t.namespace, []), this.queuedSpans.get(t.namespace).push(t), this.nextRequest || (this.nextRequest = this.currentRequest.then((function() {
                e.publishTimer || (e.currentRequest = e.send()), e.nextRequest = null
            })))
        }, t
    })();
    e.Apiv2MetricsSink = _
})), define("modules/clean/perf_tools/resource_utils", ["require", "exports", "tslib", "modules/core/browser", "modules/clean/js_client_stopwatch", "modules/clean/perf_tools/cpu_utils"], (function(t, e, i, n, r, o) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), n = i.__importStar(n), o = i.__importStar(o), e.logResourcesData = function(t) {
        (function(t) {
            var e = window.requireContexts;
            if (!e) return;
            var i = o.listExecutionPerfMeasurementsForRequireContexts(e),
                n = r.JSStopwatch.createDetachedStopwatch("resource_init_timeline", t);
            i.forEach((function(t) {
                var e = n.startSpan(t.name, {
                    startTime: t.startTime
                });
                n.addSpanAnnotation(t.name, "totalTimeNs", Math.round(1e6 * t.totalTime).toString(), e), n.endSpan(t.name, {
                    endTime: t.startTime + t.totalTime,
                    spanId: e
                })
            })), n.logData()
        })(t), (function(t) {
            var e = n.performance();
            if (!e || !e.getEntriesByType) return;
            var i = r.JSStopwatch.createDetachedStopwatch("resource_timeline", t),
                o = {},
                a = e.getEntriesByType("resource");
            if (a instanceof Array)
                for (var u = 0, l = a; u < l.length; u++) {
                    var p = l[u],
                        _ = s(p);
                    if (_) {
                        var d = o[_] || 0;
                        o[_] = d + 1, d > 0 && (_ = _ + "-" + d);
                        var m = i.startSpan(_, {
                                startTime: p.startTime,
                                async: !0
                            }),
                            h = c(p);
                        i.addSpanAnnotation(_, "type", h, m), 0 === p.transferSize ? i.addSpanAnnotation(_, "cached", "true", m) : void 0 === p.transferSize ? i.addSpanAnnotation(_, "cached", "unknown", m) : i.addSpanAnnotation(_, "cached", "false", m), p.responseEnd < p.startTime ? (i.addSpanAnnotation(_, "negativeSpanLength", (p.responseEnd - p.startTime).toString(), m), i.endSpan(_, {
                            endTime: p.startTime,
                            spanId: m
                        })) : i.endSpan(_, {
                            endTime: p.responseEnd,
                            spanId: m
                        })
                    }
                }
            i.logData()
        })(t)
    };
    var a = document && document.createElement ? document.createElement("a") : null;

    function s(t) {
        if (a) {
            if (a.href = t.name, a.host.match(/dropboxstatic.com$/) && a.pathname.match(/^\/static/)) {
                var e = a.pathname,
                    i = e.match(/vfl[a-zA-Z0-9]*\.[a-z]*$/);
                i && i.index && (e = e.substring(0, i.index - 1));
                for (var n = 0, r = ["/static/js/", "/static/"]; n < r.length; n++) {
                    var o = r[n];
                    e.startsWith(o) && (e = e.substring(o.length))
                }
                return e
            }
            return a.host.match(/photos-[0-9]+.dropbox.com$/) && a.pathname.match(/^\/t\/2/) ? "/thumbnail" : void 0
        }
    }

    function c(t) {
        var e = t.name,
            i = t.initiatorType,
            n = e.lastIndexOf(".");
        if (n > 0) {
            var r = e.substring(n);
            if ([".png", ".gif", ".jpg", ".svg"].indexOf(r) > -1) return "img";
            if (".js" === r) return "script";
            if (".css" === r) return "css"
        }
        return -1 === ["css", "img", "script", "link"].indexOf(i) ? "xmlhttprequest" === i ? "ajax" : "other" : i
    }
    e.logResourceTiming = function(t) {
        var e = n.performance();
        if (e && e.getEntriesByType) {
            var i = e.getEntriesByType("resource").filter((function(e) {
                return -1 !== e.name.indexOf(t)
            }))[0];
            if (i && i.responseEnd) {
                var o = "resource_response_end_" + t;
                return r.JSStopwatch.create_stopwatch_if_not_exist("resource_timing"), r.JSStopwatch.recordTrace(o, {
                    stopwatchName: "resource_timing",
                    traceTime: i.responseEnd
                }), i
            }
        }
    }, e.summarizePerformanceResourceTimings = function(t, e) {
        void 0 === e && (e = void 0);
        var i = {
            pre: {},
            total: {}
        };
        if (r.JSStopwatch.create_stopwatch_if_not_exist("resource_timeline"), t instanceof Array)
            for (var n = function(t) {
                    var n = c(t),
                        r = [];
                    e && t.responseEnd <= e && (n in i.pre || (i.pre[n] = {
                        count: 0,
                        total_time: 0,
                        last_transfer_end: 0
                    }), r.push(i.pre[n])), n in i.total || (i.total[n] = {
                        count: 0,
                        total_time: 0,
                        last_transfer_end: 0
                    }), r.push(i.total[n]), r.forEach((function(e) {
                        var i;
                        e.count++, e.total_time += t.duration, e.last_transfer_end = Math.max(e.last_transfer_end, t.responseEnd), "css" !== (i = n) && "script" !== i && "img" !== i || void 0 === t.transferSize || void 0 === t.encodedBodySize || (e.total_size = e.total_size || 0, e.transfer_size = e.transfer_size || 0, 0 !== t.transferSize && (e.transfer_size += t.encodedBodySize), e.total_size = e.total_size || 0, e.total_size += t.encodedBodySize)
                    }))
                }, o = 0, a = t; o < a.length; o++) {
                n(a[o])
            }
        return i
    }
})), define("modules/clean/perf_tools/cpu_utils", ["require", "exports", "modules/clean/js_client_stopwatch"], (function(t, e, i) {
    "use strict";
    var n;

    function r(t) {
        if (t.require && t.require.perfMeasurements) {
            var e = 0;
            return t.require.perfMeasurements.map((function(t) {
                var i = t.name,
                    n = t.startTime,
                    r = t.totalTime;
                return i.endsWith("anon") && (i += "-" + e++), {
                    jsExecutionType: c(i),
                    name: i,
                    startTime: n,
                    totalTime: r
                }
            }))
        }
        var i = t.module_callback_times;
        return Object.keys(i).filter((function(t) {
            return i[t].callbackDuration && i[t].callbackTime
        })).map((function(t) {
            return {
                jsExecutionType: c(t),
                name: t,
                startTime: i[t].callbackTime,
                totalTime: i[t].callbackDuration
            }
        }))
    }

    function o(t) {
        var e = [];
        for (var i in t)
            if (t.hasOwnProperty(i)) {
                var n = t[i];
                e = e.concat(r(n))
            }
        return e
    }

    function a(t) {
        return Object.keys(t).map((function(e) {
            var i = t[e];
            return {
                measurement: {
                    jsExecutionType: s(e),
                    name: e,
                    startTime: i.start,
                    totalTime: i.end - i.start
                },
                annotations: i.annotations
            }
        }))
    }

    function s(t) {
        return t.startsWith("dws-processChunk") ? n.DWS : n.UNKNOWN
    }

    function c(t) {
        return t.startsWith("execCb.anon") || t.startsWith("overhead.anon") || t.startsWith("execCb.require-tier") || t.startsWith("overhead.require-tier") ? n.OTHER : t.startsWith("execCb") || t.startsWith("overhead") ? n.MODULE : n.UNKNOWN
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), (function(t) {
        t.DWS = "dws", t.MODULE = "module", t.OTHER = "other", t.UNKNOWN = "unknown"
    })(n = e.JSExecutionType || (e.JSExecutionType = {})), e.ALL_JS_EXECUTION_TYPES = [n.DWS, n.MODULE, n.OTHER, n.UNKNOWN], e.getAllGlobalExecutionPerfMeasurements = function() {
        var t = [];
        return window.ensemble && window.ensemble.getJSStopwatchData && (t = t.concat(a(window.ensemble.getJSStopwatchData()).map((function(t) {
            return t.measurement
        })))), window.requireContexts && (t = t.concat(o(window.requireContexts))), t
    }, e.listExecutionPerfMeasurementsForRequireContexts = o, e.listAnnotatedExecutionPerfMeasurementsForEnsemble = a, e.cumulativeExecutionTimesBefore = function(t, e) {
        var i = {},
            n = function(n) {
                if (t.hasOwnProperty(n)) {
                    var r = t[n];
                    i[n] = {}, e.forEach((function(t) {
                        0 < t.startTime && t.startTime < r && (i[n][t.jsExecutionType] = i[n][t.jsExecutionType] || 0, i[n][t.jsExecutionType] += t.totalTime)
                    }))
                }
            };
        for (var r in t) n(r);
        return i
    }, e.logCumulativeExecutionTimes = function(t, n) {
        var r = i.JSStopwatch.createDetachedStopwatch("cumulative_cpu_time", t),
            o = function(t) {
                n.hasOwnProperty(t) && e.ALL_JS_EXECUTION_TYPES.forEach((function(e) {
                    r.recordTrace("cpu_before_" + t + "_due_to_" + e, n[t][e] || 0)
                }))
            };
        for (var a in n) o(a);
        r.logData()
    }
})), define("modules/clean/perf_tools/browser_perf_utils", ["require", "exports", "tslib", "modules/core/browser", "modules/core/xhr", "modules/constants/request", "modules/clean/js_client_stopwatch", "modules/constants/webtiming"], (function(t, e, i, n, r, o, a, s) {
    "use strict";

    function c(t) {
        var e = n.performance();
        if (e && e.timing) {
            var i = e.timing,
                c = {
                    navigation_start: i.navigationStart,
                    unload_event_start: i.unloadEventStart,
                    unload_event_end: i.unloadEventEnd,
                    redirect_start: i.redirectStart,
                    redirect_end: i.redirectEnd,
                    fetch_start: i.fetchStart,
                    domain_lookup_start: i.domainLookupStart,
                    domain_lookup_end: i.domainLookupEnd,
                    connect_start: i.connectStart,
                    secure_connect_start: i.secureConnectionStart,
                    connect_end: i.connectEnd,
                    request_start: i.requestStart,
                    response_start: i.responseStart,
                    response_end: i.responseEnd,
                    dom_loading: i.domLoading,
                    dom_interactive: i.domInteractive,
                    dom_content_loaded_event_start: i.domContentLoadedEventStart,
                    dom_content_loded_event_end: i.domContentLoadedEventEnd,
                    dom_complete: i.domComplete,
                    load_event_start: i.loadEventStart,
                    load_event_end: i.loadEventEnd
                },
                u = {};
            u.request_id = o.REQUEST_ID, u.referrer = document.referrer;
            var l = a.JSStopwatch.createDetachedStopwatch("browser_perf", t);
            for (var p in c) c.hasOwnProperty(p) && (u[p] = c[p], c[p] && l.recordTrace(p, c[p] - i.navigationStart));
            l.logData(), s.LOG_BROWSER_PERFORMANCE_INFO && r.sendXhr("/alternate_wtl_browser_performance_info", u)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), n = i.__importStar(n), r = i.__importStar(r), o = i.__importStar(o), s = i.__importStar(s), e.logBrowserPerfData = function(t) {
        (function(t) {
            var e = n.performance();
            if (!e || !e.getEntriesByType) return;
            var i = a.JSStopwatch.createDetachedStopwatch("performance_marks", t),
                r = e.getEntriesByType("mark");
            if (r instanceof Array)
                for (var o = 0, s = r; o < s.length; o++) {
                    var c = s[o];
                    i.recordTrace(c.name, c.startTime)
                }
            i.logData()
        })(t), c(t)
    }, e.logBrowserPerformanceInfo = c
})), define("modules/clean/perf_tools/web_timing_logger_types", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = (function() {
        function t() {}
        return t.getFromNavigation = function(e) {
            switch (e.type) {
                case e.TYPE_NAVIGATE:
                    return t.NAVIGATE;
                case e.TYPE_RELOAD:
                    return t.RELOAD;
                case e.TYPE_BACK_FORWARD:
                    return t.BACK_FORWARD
            }
        }, t.NAVIGATE = "navigate", t.RELOAD = "reload", t.BACK_FORWARD = "back_forward", t
    })();
    e.NavigationType = i;
    var n = (function() {
        function t(e, i, n, r, o) {
            void 0 === n && (n = !1), void 0 === r && (r = !0), this.name = e, this.flag = 1 << i, this.triggersLogging = n, this.timestampPrefix = o || e, this.ordered = r, t.allEvents.push(this)
        }
        return t.allEvents = [], t.APPLICATION_START = new t("application_code_start", 1), t.LOAD_END = new t("load_end", 2, !0, !1), t.MARK_TIME_TO_VIEW = new t("mark_time_to_view", 3, !0, !0, "TTV"), t.FETCHED_DATA_FOR_TTI = new t("fetched_data_required_for_tti", 4), t.MARK_TIME_TO_INTERACTIVE = new t("mark_time_to_interactive", 5), t.TIME_TO_INTERACTIVE = new t("time_to_interactive", 6, !0, !0, "TTI"), t
    })();
    e.WebTimerEvent = n
})), define("modules/clean/perf_tools/web_timing_utils", ["require", "exports", "tslib", "modules/core/browser"], (function(t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), n = i.__importStar(n);
    var r = (function() {
        function t() {}
        return t.generateCorrelationId = function() {
            return Math.random().toString(36).substring(2)
        }, t.getNow = function() {
            var t = n.performance();
            if (t && t.timing && t.now) {
                var e = t.timing;
                return (e.navigationStart || e.fetchStart) + Math.floor(t.now())
            }
            return Date.now()
        }, t.newContext = function(e, i) {
            var r;
            if (void 0 === i && (i = "unnamed_timer"), e) r = t.getNow();
            else {
                var o = n.performance();
                if (o && o.timing) {
                    var a = o.timing;
                    r = a.navigationStart || a.fetchStart
                } else r = t.getNow()
            }
            return {
                initialized: !1,
                is_pagelet: !1,
                is_dws: !1,
                is_dws2: !1,
                is_early_ensemble: !1,
                is_page_restore: !1,
                log_time_to_view: !1,
                log_time_to_interactive: !1,
                ttv_at_dom_interactive: !1,
                tti_at_dom_interactive: !1,
                source_type: "web",
                subtypes: {},
                tti_exclusion_flow: "",
                have_logged_web_timing: !1,
                delayed_tti_for_css: !1,
                timing_results: null,
                start_time: r,
                time_to_view: null,
                time_to_interactive: null,
                correlation_id: t.generateCorrelationId(),
                timesStagesWereReached: {},
                context_name: i
            }
        }, t
    })();
    e.WebTimingUtil = r;
    var o = (function() {
        function t(t) {
            this.canceled = !1, this.callback = t
        }
        return t.prototype.exec = function() {
            this.canceled || this.callback()
        }, t.prototype.cancel = function() {
            this.canceled = !0
        }, t.prototype.isCanceled = function() {
            return this.canceled
        }, t
    })();
    e.CancellableCallback = o
})), define("modules/clean/visibility_logging", ["require", "exports", "modules/clean/js_client_stopwatch", "modules/clean/js_basic_stopwatch"], (function(t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.logPaintPerformance = function(t) {
        if (window.performance && window.performance.getEntriesByType) {
            var e = window.performance.getEntriesByType("paint").map((function(t) {
                return {
                    type: n.TimingDataType.Trace,
                    name: t.name,
                    endTime: t.startTime
                }
            }));
            if (e.length > 0) {
                var r = i.JSStopwatch.createDetachedStopwatch("paint", t);
                r.recordEntries(e), r.logData()
            }
        }
    }, e.logVisibilityChangeEvents = function(t, e) {
        if (window.performance && window.performance.getEntriesByType) {
            var r = Number.MAX_VALUE;
            t.time_to_interactive && (r = t.time_to_interactive - t.start_time);
            var o, a = window.performance.getEntriesByType("mark").filter((function(t) {
                    return t.name.startsWith("VisibilityState.")
                })).map((function(t) {
                    return {
                        visibility: t.name,
                        time: t.startTime
                    }
                })),
                s = {
                    "VisibilityState.visible": 0,
                    "VisibilityState.hidden": 0
                },
                c = function(t) {
                    o && o.time < r && (s[o.visibility] = (s[o.visibility] || 0) + Math.min(t, r) - o.time)
                },
                u = [];
            for (var l in a.forEach((function(t, e) {
                    c(t.time), u.push({
                        type: n.TimingDataType.Trace,
                        name: "visibility-change-" + e,
                        endTime: t.time,
                        annotations: {
                            visibility: t.visibility
                        }
                    }), o = 0 === e ? {
                        visibility: t.visibility,
                        time: 0
                    } : t
                })), c(window.performance.now()), s) s.hasOwnProperty(l) && u.push({
                type: n.TimingDataType.Trace,
                name: "total-" + l + "-time",
                endTime: s[l]
            });
            var p = i.JSStopwatch.createDetachedStopwatch("visibility", e);
            p.recordEntries(u), p.logData()
        }
    }
})), define("modules/clean/web_module_timing", ["require", "exports", "modules/pagelet_config"], (function(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.get_module_times = function() {
        var t = i.REQUIREJS_CONTEXT_NAME,
            e = window.requireContexts[t].module_callback_times,
            n = [];
        for (var r in e)
            if (e.hasOwnProperty(r)) {
                var o = e[r];
                if (null != o.loadTime) {
                    var a = {
                        load_time: o.loadTime,
                        callback_duration: o.callbackDuration,
                        callback_time: o.callbackTime,
                        name: o.name,
                        url: o.url,
                        parent: o.parent
                    };
                    n.push(a)
                }
            }
        return n
    }, e.add_module = function() {}
})), define("modules/clean/web_timing_logger", ["require", "exports", "tslib", "apex-metrics", "modules/clean/metrics/index", "modules/clean/devtools/panels/performance/perf_hub_actions", "modules/clean/event_load", "modules/clean/web_module_timing", "modules/clean/window_util", "modules/clean/perf_tools/resource_utils", "modules/clean/perf_tools/web_timing_logger_types", "modules/clean/perf_tools/web_timing_utils", "modules/clean/js_client_stopwatch", "modules/clean/perf_tools/browser_perf_utils", "modules/clean/init_react", "modules/clean/perf_tools/cpu_utils", "modules/clean/js_basic_stopwatch", "modules/constants/request", "modules/constants/webtiming", "modules/constants/page_load", "modules/core/browser", "modules/core/browser_detection", "modules/core/exception", "modules/core/xhr", "dropbox/proto/js_init_data/web_timing_logger/web_timing_logger", "modules/clean/visibility_logging"], (function(t, e, i, n, r, o, a, s, c, u, l, p, _, d, m, h, f, g, v, w, S, T, b, y, E, x) {
    "use strict";
    var O;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), a = i.__importStar(a), c = i.__importStar(c), g = i.__importStar(g), v = i.__importStar(v), w = i.__importStar(w), S = i.__importStar(S), T = i.__importStar(T), b = i.__importStar(b), y = i.__importStar(y), (function(t) {
        t[t.NEW = 1] = "NEW", t[t.RUNNING = 2] = "RUNNING", t[t.ABORTED = 3] = "ABORTED", t[t.CLOSED = 4] = "CLOSED"
    })(O || (O = {})), e.perfHubClassName = "perf-hub-link-container";
    var I = ["navigation_type", "referrer", "repo_rev", "source_type", "active_user_id"],
        k = ["tti_flow", "tti_exclusion_flow", "is_dws2"];

    function N() {
        return "hidden" === window.document.visibilityState
    }
    var A = [
            [l.WebTimerEvent.APPLICATION_START, l.WebTimerEvent.MARK_TIME_TO_VIEW, l.WebTimerEvent.FETCHED_DATA_FOR_TTI, l.WebTimerEvent.MARK_TIME_TO_INTERACTIVE],
            [l.WebTimerEvent.TIME_TO_INTERACTIVE]
        ].reverse(),
        D = 1;
    var C = ["requirejs_start", "ensemble_payload_start", "body_start"];
    var R = ["craft_fast_prefetch_done", "dws_core_externals_loaded", "dws_ensemble_init", "dws-processChunk-embedded-app-done-1", "dws-processChunk-embedded-app-require_config-1", "ensemble_init", "module_init", "last_js_const_end", "pagelet_render_on_page_embedded-app", "pagelet_css_loaded_embedded-app"];
    var M = (function() {
            function t() {
                _.JSStopwatch.create_stopwatch_if_not_exist("web_timing_logger")
            }
            return t.prototype.buildBaseParams = function(t, e, i) {
                void 0 === i && (i = {});
                var n = t.start_time,
                    r = t.subtypes || {};
                t.tti_flow && (r.tti_flow = t.tti_flow);
                var o, a, s = {
                    log_source: e.name,
                    subtypes: JSON.stringify(r),
                    correlation_id: t.correlation_id
                };
                t.extra_columns && Object.keys(t.extra_columns).forEach((function(e) {
                    var i = t.extra_columns[e];
                    i && (s[e] = i)
                })), Object.keys(i).forEach((function(t) {
                    var e = i[t];
                    e && (s[t] = e)
                })), g.IS_HTTP2 && (s.is_spdy = !0), t.is_pagelet && (s.is_pagelet = !0), t.is_dws && (s.is_dws = !0), t.is_early_ensemble && (s.is_early_ensemble = !0), s.delayed_tti_for_css = t.delayed_tti_for_css, "" !== t.tti_exclusion_flow && (s.tti_exclusion_flow = t.tti_exclusion_flow), o = t.log_time_to_view && null != t.time_to_view ? t.time_to_view - n : null, a = t.log_time_to_interactive && null != t.time_to_interactive ? t.time_to_interactive - n : null;
                var c = {
                    navigation_type: t.is_page_restore ? l.NavigationType.RELOAD : this.get_navigation_type(),
                    server_request_start_time: g.REQUEST_START_TIME,
                    extra_columns: JSON.stringify(s),
                    subtypes: JSON.stringify(r),
                    source_type: t.source_type,
                    page_load_time: t.end_time - t.start_time,
                    repo_rev: w.REPO_REV
                };
                if (X(c), t.log_time_to_view && (c.time_to_view = o), t.log_time_to_interactive && (c.time_to_interactive = a), c.url = S.get_href(), 0 === c.url.indexOf("/dws2/") && (c.url = c.url.substring("/dws2/".length - 1)), c.referrer = document.referrer, c.request_id = t.request_id || g.REQUEST_ID, c.request_tracing_enabled = g.REQUEST_TRACING_ENABLED, window.ensemble && window.ensemble.viewer) {
                    var u = window.ensemble.viewer.getActiveUser();
                    u && (c.active_user_id = u.userId), c.dws_page_name = window.ensemble.getPageName()
                }
                return c
            }, t.prototype.get_navigation_type = function() {
                var t = S.performance();
                if (t && t.navigation) {
                    var e = t.navigation;
                    return l.NavigationType.getFromNavigation(e)
                }
            }, t.prototype.log = function(t, i, n) {
                void 0 === n && (n = !1);
                var r = _.JSStopwatch.startSpan("wtl_endpoint", {
                    stopwatchName: "web_timing_logger"
                });
                _.JSStopwatch.addSpanAnnotation("wtl_endpoint", "navigation_type", i.navigation_type, {
                    stopwatchName: "web_timing_logger",
                    spanId: r
                });
                var a = y.sendXhr("/alternate_wtl", i);
                a.onreadystatechange = function(t) {
                    if (a.readyState === XMLHttpRequest.DONE && 200 === a.status) {
                        _.JSStopwatch.endSpan("wtl_endpoint", {
                            stopwatchName: "web_timing_logger",
                            spanId: r
                        });
                        var i = document.getElementsByClassName(e.perfHubClassName);
                        if (n && i.length) {
                            var s = JSON.parse(a.responseText);
                            s.status && o.PerfHubActions.add_web_timing_details(s)
                        }
                    }
                }
            }, t
        })(),
        P = (function(t) {
            function e() {
                return t.call(this) || this
            }
            return i.__extends(e, t), e.prototype.shouldLog = function(t) {
                return t.initialized && !t.have_logged_web_timing && void 0 !== t.end_time && (!t.log_time_to_view || null != t.time_to_view) && (!t.log_time_to_interactive || null != t.time_to_interactive)
            }, e.prototype.logTiming = function(t, e) {
                t.have_logged_web_timing = !0;
                var i = this.buildBaseParams(t, e),
                    n = J(t, i);
                return this.log(t, i, !1), n
            }, e.prototype.get_navigation_type = function() {
                return "ajax"
            }, e
        })(M),
        L = (function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.metricsReporter = r.getMetricsReporter(), e
            }
            return i.__extends(e, t), e.prototype.shouldLog = function(t) {
                if (!t.initialized || t.have_logged_web_timing) return !1;
                var e = S.performance();
                if (!e || !e.timing) return !1;
                var i = e.timing,
                    n = t.start_time,
                    r = t.end_time;
                return !(!n || !r) && (!(t.log_time_to_view && !(t.ttv_at_dom_interactive && i.domInteractive || null != t.time_to_view)) && !(t.log_time_to_interactive && !(t.tti_at_dom_interactive && i.domInteractive || null != t.time_to_interactive)))
            }, e.prototype.logTiming = function(t, e) {
                var i = S.performance(),
                    r = i.timing,
                    o = h.getAllGlobalExecutionPerfMeasurements(),
                    a = t.timesStagesWereReached["dws_embedded-app_require_config_callback"];
                void 0 === a ? a = t.timesStagesWereReached.application_code_start : t.timesStagesWereReached.hasOwnProperty("application_code_start") && (a = Math.min(a, t.timesStagesWereReached.application_code_start)), _.JSStopwatch.startSpan("process_nav_timing", {
                    stopwatchName: "web_timing_logger"
                });
                var s = this.buildBaseParams(t, e, {}),
                    c = J(t, s),
                    p = window.ensemble && window.ensemble.getJSStopwatchData ? window.ensemble.getJSStopwatchData() : {},
                    f = i.getEntriesByType ? i.getEntriesByType("resource") : [],
                    g = i.getEntriesByType ? u.summarizePerformanceResourceTimings(f, a) : {
                        pre: {},
                        total: {}
                    };
                if (s.browser_time = (r.redirectStart || r.fetchStart) - t.start_time, s.redirect_time = r.fetchStart - t.start_time, s.dns_time = r.domainLookupEnd - t.start_time, s.tcp_connect_time = (r.secureConnectionStart || r.requestStart) - t.start_time, s.ssl_connect_time = r.requestStart - t.start_time, s.time_to_first_byte = r.responseStart - t.start_time, s.time_to_last_byte = r.responseEnd - t.start_time, s.dom_load_time = r.domContentLoadedEventEnd - t.start_time, s.idle_cpu_time = t.timing_results ? Math.round(t.timing_results.idleCPUTime) : void 0, s.total_tracked_cpu_time = t.timing_results ? Math.round(t.timing_results.totalTrackedCPUTime) : void 0, s.untracked_time_after_first_byte = t.timing_results && null != t.timing_results.untrackedTimeAfterFirstByte ? Math.round(t.timing_results.untrackedTimeAfterFirstByte) : void 0, S.performance().getEntriesByType && ((function(t, e) {
                        for (var i in t) t.hasOwnProperty(i) && (e["resource_" + i + "_count"] = t[i].count, e["resource_" + i + "_avg_time"] = t[i].total_time / t[i].count || 1, void 0 !== t[i].total_size && (e["resource_" + i + "_total_size"] = t[i].total_size), void 0 !== t[i].transfer_size && (e["resource_" + i + "_transfer_size"] = t[i].transfer_size))
                    })(g.total, s), (function(t, e) {
                        var i;
                        for (i in t)
                            if (t.hasOwnProperty(i)) {
                                var n = t[i];
                                for (var r in n)
                                    if (n.hasOwnProperty(r)) {
                                        var o = n[r].transfer_size,
                                            a = n[r].total_size,
                                            s = n[r].count,
                                            c = n[r].total_time;
                                        if (e.recordTrace(i + "_" + r + "_count", s), e.recordTrace(i + "_" + r + "_total_time", c), void 0 !== o && void 0 !== a && a > 0) {
                                            var u = o / a;
                                            e.recordTrace(i + "_" + r + "_transferred_size", o), e.recordTrace(i + "_" + r + "_total_size", a), e.recordTrace(i + "_percent_" + r + "_transferred", 100 * u)
                                        }
                                        e.recordTrace(i + "_last_" + r + "_transfer_end", n[r].last_transfer_end)
                                    }
                            }
                        e.logData()
                    })(g, _.JSStopwatch.createDetachedStopwatch("resources_percent_transferred", c)), _.JSStopwatch.addSpanAnnotation("process_nav_timing", "logged_resources", "1", {
                        stopwatchName: "web_timing_logger"
                    })), X(s), _.JSStopwatch.addSpanAnnotation("process_nav_timing", "logged_modules", "1", {
                        stopwatchName: "web_timing_logger"
                    }), _.JSStopwatch.endSpan("process_nav_timing", {
                        stopwatchName: "web_timing_logger"
                    }), t.is_pagelet && Object.getOwnPropertyNames(p).length > 0 && (function(t, e, i) {
                        var n = (function(t, e) {
                                var i = h.listAnnotatedExecutionPerfMeasurementsForEnsemble(e),
                                    n = _.JSStopwatch.createDetachedStopwatch("ensemble", t),
                                    r = i.map((function(t) {
                                        var e = t.measurement,
                                            i = t.annotations;
                                        return {
                                            name: e.name,
                                            startTime: e.startTime,
                                            endTime: e.startTime + e.totalTime,
                                            annotations: i
                                        }
                                    }));
                                return K(n, r), n
                            })(i, e),
                            r = void 0,
                            o = void 0;
                        for (var a in e) e.hasOwnProperty(a) && (H.includes(a) && (t.timesStagesWereReached[a] = e[a].start), ["ensemble_init", "dws_embedded-app_require_config_callback"].includes(a) && (r = r ? Math.min(r, e[a].end) : e[a].end), Y.test(a) && (o = o ? Math.max(o, e[a].end) : e[a].end));
                        o && n.recordTrace("last_js_const_end", o);
                        r && n.recordTrace("module_init", r)
                    })(t, p, c), d.logBrowserPerfData(c), (function(t, e, i) {
                        h.logCumulativeExecutionTimes(t, h.cumulativeExecutionTimesBefore(e, i))
                    })(c, t.timesStagesWereReached, o), (this.get_navigation_type() === l.NavigationType.NAVIGATE || v.LOG_NON_NAVIGATION_RESOURCES) && ((function(t) {
                        var e = m.getReactInitData();
                        K(_.JSStopwatch.createDetachedStopwatch("init_react", t), e)
                    })(c), u.logResourcesData(c)), _.JSStopwatch.log_stored_results(), (function(t, e) {
                        return !t.is_page_restore && (e.navigation_type === l.NavigationType.NAVIGATE || "ajax" === e.navigation_type)
                    })(t, s)) {
                    var w = (function(t, e) {
                            for (var i = "other", n = 0, r = [
                                    [T.chrome, "chrome"],
                                    [T.edge, "edge"],
                                    [T.mozilla, "firefox"],
                                    [T.msie, "msie"],
                                    [T.safari, "safari"]
                                ]; n < r.length; n++) {
                                var o = r[n];
                                if (o[0]) {
                                    i = o[1];
                                    break
                                }
                            }
                            var a = {
                                    browser: i,
                                    is_dws: String(t.is_dws),
                                    source_type: String(t.source_type)
                                },
                                s = "";
                            return t.subtypes.amp_tti_flow ? s = t.subtypes.amp_tti_flow : e.dws_page_name && (s = "dws_page_name:" + e.dws_page_name), "" !== s && (a.product = s), e.navigation_type && (a.navigation_type = e.navigation_type), a
                        })(t, s),
                        b = this.metricsReporter.child(w);
                    (function(t, e) {
                        t.time_to_interactive && e.createStats({
                            ns: "web_timing",
                            name: "temp/time-to-interactive"
                        }).recordDuration(t.time_to_interactive, n.TimeUnit.MILLISECONDS)
                    })(s, b), (function(t, e) {
                        var i;
                        for (i in t)
                            if (t.hasOwnProperty(i)) {
                                var r = t[i];
                                for (var o in r)
                                    if (r.hasOwnProperty(o)) {
                                        var a = r[o],
                                            s = a.transfer_size,
                                            c = a.total_size,
                                            u = a.count,
                                            l = a.total_time,
                                            p = a.last_transfer_end;
                                        e.createStats({
                                            ns: "web_timing",
                                            name: "temp/resources/" + i + "/" + o + "/count"
                                        }).record(u), e.createStats({
                                            ns: "web_timing",
                                            name: "temp/resources/" + i + "/" + o + "/total-time"
                                        }).recordDuration(l, n.TimeUnit.MILLISECONDS), e.createStats({
                                            ns: "web_timing",
                                            name: "temp/resources/" + i + "/" + o + "/last-transfer-end"
                                        }).recordDuration(p, n.TimeUnit.MILLISECONDS), void 0 !== s && void 0 !== c && c > 0 && (e.createStats({
                                            ns: "web_timing",
                                            name: "temp/resources/" + i + "/" + o + "/transferred-size"
                                        }).record(s), e.createStats({
                                            ns: "web_timing",
                                            name: "temp/resources/" + i + "/" + o + "/total-size"
                                        }).record(c))
                                    }
                            }
                    })(g, b), t.is_pagelet && Object.getOwnPropertyNames(p).length > 0 && (function(t, e, i) {
                        var r = h.listAnnotatedExecutionPerfMeasurementsForEnsemble(e),
                            o = void 0,
                            a = void 0;
                        r.forEach((function(e) {
                            var r = e.measurement,
                                s = r.startTime + r.totalTime; - 1 !== R.indexOf(r.name) && i.createStats({
                                ns: "web_timing",
                                name: "temp/ensemble-timing/" + r.name
                            }).recordDuration(s, n.TimeUnit.MILLISECONDS), H.includes(r.name) && (t.timesStagesWereReached[r.name] = r.startTime), ["ensemble_init", "dws_embedded-app_require_config_callback"].includes(r.name) && (o = o ? Math.min(o, s) : s), Y.test(r.name) && (a = a ? Math.max(a, s) : s)
                        })), void 0 !== a && i.createStats({
                            ns: "web_timing",
                            name: "temp/last-js-const-end"
                        }).recordDuration(a, n.TimeUnit.MILLISECONDS), void 0 !== o && i.createStats({
                            ns: "web_timing",
                            name: "temp/module-init"
                        }).recordDuration(o, n.TimeUnit.MILLISECONDS)
                    })(t, p, b), i && i.getEntriesByType && ((function(t, e) {
                        t.getEntriesByType("mark").filter((function(t) {
                            return C.indexOf(t.name) > -1
                        })).forEach((function(t) {
                            e.createStats({
                                ns: "web_timing",
                                name: "temp/browser-perf/marks/" + t.name
                            }).recordDuration(t.startTime, n.TimeUnit.MILLISECONDS)
                        }))
                    })(i, b), (function(t, e) {
                        var i = t.getEntriesByType("navigation")[0],
                            r = void 0 === i ? null : i;
                        r && ([
                            ["temp/browser-perf/navigation/unload-event-start", r.unloadEventStart],
                            ["temp/browser-perf/navigation/unload-event-end", r.unloadEventEnd],
                            ["temp/browser-perf/navigation/dom-interactive", r.domInteractive],
                            ["temp/browser-perf/navigation/dom-content-loaded-event-start", r.domContentLoadedEventStart],
                            ["temp/browser-perf/navigation/dom-content-loaded-event-end", r.domContentLoadedEventEnd],
                            ["temp/browser-perf/navigation/dom-complete", r.domComplete],
                            ["temp/browser-perf/navigation/load-event-start", r.loadEventStart],
                            ["temp/browser-perf/navigation/load-event-end", r.loadEventEnd],
                            ["temp/browser-perf/navigation/redirect-count", r.redirectCount],
                            ["temp/browser-perf/navigation/worker-start", r.workerStart],
                            ["temp/browser-perf/navigation/redirect-start", r.redirectStart],
                            ["temp/browser-perf/navigation/redirect-end", r.redirectEnd],
                            ["temp/browser-perf/navigation/fetch-start", r.fetchStart],
                            ["temp/browser-perf/navigation/domain-lookup-start", r.domainLookupStart],
                            ["temp/browser-perf/navigation/domain-lookup-end", r.domainLookupEnd],
                            ["temp/browser-perf/navigation/connect-start", r.connectStart],
                            ["temp/browser-perf/navigation/connect-end", r.connectEnd],
                            ["temp/browser-perf/navigation/secure-connect-start", r.secureConnectionStart],
                            ["temp/browser-perf/navigation/request-start", r.requestStart],
                            ["temp/browser-perf/navigation/response-start", r.responseStart],
                            ["temp/browser-perf/navigation/response-end", r.responseEnd],
                            ["temp/browser-perf/navigation/transfer-size", r.transferSize]
                        ].forEach((function(t) {
                            var i = t[0],
                                r = t[1];
                            "number" == typeof r && e.createStats({
                                ns: "web_timing",
                                name: i
                            }).recordDuration(r, n.TimeUnit.MILLISECONDS)
                        })), [
                            ["temp/browser-perf/navigation/encoded-body-size", r.encodedBodySize],
                            ["temp/browser-perf/navigation/decoded-body-size", r.decodedBodySize]
                        ].forEach((function(t) {
                            var i = t[0],
                                n = t[1];
                            "number" == typeof n && e.createStats({
                                ns: "web_timing",
                                name: i
                            }).record(n)
                        })))
                    })(i, b))
                }
                return x.logPaintPerformance(c), x.logVisibilityChangeEvents(t, c), t.have_logged_web_timing = !0, this.log(t, s, !0), c
            }, e.prototype.log = function(e, i, n) {
                void 0 === n && (n = !1), t.prototype.log.call(this, e, i, n)
            }, e
        })(M),
        j = (function() {
            function t(t, e, i, n) {
                this.childSpans = [], this.spanName = t, this.startTime = void 0 !== i ? i : p.WebTimingUtil.getNow(), this.originTs = e, this.startTimeOffsetMS = this.startTime - e, this.endCallback = n
            }
            return t.prototype.startSpan = function(e) {
                var i = new t(e, this.originTs);
                return this.childSpans.push(i), i
            }, t.prototype.markSpan = function(e, i) {
                var n = new t(e, this.originTs, this.startTime);
                this.childSpans.push(n), n.endSpan(i)
            }, t.prototype.endSpan = function(t) {
                var e = this;
                this.endTime = void 0 !== t ? t : p.WebTimingUtil.getNow(), this.childSpans.forEach((function(t) {
                    t.hasEnded() || t.endSpan(e.endTime)
                })), this.endCallback && this.endCallback(this)
            }, t.prototype.getEndTimeOffsetMS = function() {
                return void 0 !== this.endTime ? this.endTime - this.originTs : void 0
            }, t.prototype.hasEnded = function() {
                return void 0 !== this.endTime
            }, t
        })(),
        W = (function() {
            function t(t, e, i, n) {
                void 0 === n && (n = !1), this.timerState = O.RUNNING, this.loggedEvents = 0, this.activeSpans = [], this.endedSpans = [], this.context = t, this.timingStopwatch = e, this.userStopwatch = i, this.id = D++, this.strictAssert = n
            }
            return t.prototype.startSpan = function(t) {
                var e = this,
                    i = new j(t, this.context.start_time, void 0, (function(t) {
                        e.endSpan(t)
                    }));
                return this.activeSpans.push(i), i
            }, t.prototype.markSpan = function(t, e) {
                if (void 0 === e && (e = {}), this.userStopwatch) {
                    var i = void 0 === e.startTime ? 0 : e.startTime,
                        n = this.timeSinceStart(e.endTime),
                        r = this.userStopwatch.startSpan(t, {
                            startTime: i
                        });
                    this.userStopwatch.endSpan(t, {
                        spanId: r,
                        endTime: n
                    })
                } else {
                    var o = new j(t, this.context.start_time, e.startTime);
                    o.endSpan(e.endTime), this.endedSpans.push(o)
                }
            }, t.prototype.endSpan = function(t) {
                var e = this.activeSpans.indexOf(t);
                e >= 0 && (delete this.activeSpans[e], this.userStopwatch ? this.recordSpan(t) : this.endedSpans.push(t))
            }, t.prototype.recordSpan = function(t) {
                var e = this,
                    i = this.userStopwatch.startSpan(t.spanName, {
                        startTime: t.startTimeOffsetMS
                    });
                t.childSpans.forEach((function(t) {
                    e.recordSpan(t)
                })), this.userStopwatch.endSpan(t.spanName, {
                    spanId: i,
                    endTime: t.getEndTimeOffsetMS()
                })
            }, t.prototype.getContextName = function() {
                return this.context.context_name
            }, t.prototype.applicationStart = function() {
                this.logEvent(l.WebTimerEvent.APPLICATION_START)
            }, t.prototype.fetchedDataRequiredForTTI = function() {
                this.logEvent(l.WebTimerEvent.FETCHED_DATA_FOR_TTI)
            }, t.prototype.startTime = function() {
                return this.context.start_time
            }, t.prototype.timeSinceStart = function(t) {
                return (t || p.WebTimingUtil.getNow()) - this.context.start_time
            }, t.prototype.timeToView = function() {
                return this.context.time_to_view
            }, t.prototype.timeToInteractive = function() {
                return this.context.time_to_interactive
            }, t.prototype.reportTTIAfterPaint = function() {
                var t = this,
                    e = new p.CancellableCallback((function() {
                        t.reportTTI()
                    }));
                return window.requestAnimationFrame((function() {
                    window.requestAnimationFrame((function() {
                        e.exec()
                    }))
                })), e
            }, t.prototype.setExtraColumns = function(t) {
                this.context.extra_columns = t
            }, t.prototype.excludeFromTTI = function(t) {
                "" !== this.context.tti_exclusion_flow && (this.context.tti_exclusion_flow = this.context.tti_exclusion_flow + ","), this.context.tti_exclusion_flow = this.context.tti_exclusion_flow + t
            }, t.prototype.logEvent = function(t, e) {
                this.logEventInternal(t, !0, e)
            }, t.prototype.logSilentEvent = function(t, e) {
                this.logEventInternal(t, !1, e)
            }, t.prototype.logEventInternal = function(t, e, i) {
                this.loggedEvents |= t.flag, t.ordered && this.validateEventOrder(t);
                var n = this.timeSinceStart(i);
                this.context.timesStagesWereReached[t.name] = n, this.timingStopwatch.recordTrace(t.name, n), console.timeStamp && console.timeStamp(t.timestampPrefix), e && t.triggersLogging && this.logIfReady(t)
            }, t.prototype.validateEventOrder = function(t) {
                for (var e = 0, i = 0, n = A; i < n.length; i++) {
                    var r = n[i];
                    if (r.includes(t)) break;
                    for (var o = 0, a = r; o < a.length; o++) {
                        e |= a[o].flag
                    }
                }
                var s = e & this.loggedEvents;
                if (s > 0) {
                    var c = l.WebTimerEvent.allEvents.filter((function(t) {
                        return (t.flag & s) > 0
                    })).map((function(t) {
                        return t.name
                    }));
                    this.reportSwMisuse("Received " + t.name + " after [" + c.join(",") + "]")
                }
            }, t.prototype.logIfReady = function(t) {
                if (this.logger.shouldLog(this.context)) {
                    this.addEventBasedTiming();
                    var e = this.logger.logTiming(this.context, t);
                    V(this.timingStopwatch, e), V(this.userStopwatch, e), this.timingStopwatch.logData(), this.userStopwatch.logData(), this.timerState = O.CLOSED
                }
            }, t.prototype.addEventBasedTiming = function() {
                var t = S.performance().timing;
                this.context.ttv_at_dom_interactive && (this.context.is_pagelet && window.ensemble ? this.context.time_to_view = window.ensemble.getEmbeddedAppDOMInteractive() : this.context.time_to_view = t.domInteractive, this.logSilentEvent(l.WebTimerEvent.MARK_TIME_TO_VIEW, this.context.time_to_view)), this.context.tti_at_dom_interactive && (this.context.time_to_interactive = t.domInteractive, this.logSilentEvent(l.WebTimerEvent.MARK_TIME_TO_INTERACTIVE, this.context.time_to_interactive), this.logSilentEvent(l.WebTimerEvent.TIME_TO_INTERACTIVE, this.context.time_to_interactive))
            }, t.prototype.reportSwMisuse = function(t) {
                t = "WebTimer: " + t, this.strictAssert ? b.assert(!1, t) : b.reportStack(t, {
                    severity: b.SEVERITY.NONCRITICAL,
                    tags: ["web_timing_logger"]
                })
            }, t
        })(),
        q = (function(t) {
            function e(e) {
                var i = t.call(this, e, _.JSStopwatch.createDetachedStopwatch("maestro_tracing", {
                    correlation_id: e.correlation_id
                }), _.JSStopwatch.createDetachedStopwatch("user_tracing", {
                    correlation_id: e.correlation_id
                }), !1) || this;
                return i.logger = new P, i
            }
            return i.__extends(e, t), e.prototype.initialize = function(t) {
                this.context.initialized || (this.context.initialized = !0, this.context.log_time_to_view = t.requireTTV, this.context.log_time_to_interactive = t.requireTTI, this.context.tti_flow = t.url, this.timingStopwatch.url = this.context.tti_flow, this.userStopwatch.url = this.context.tti_flow)
            }, e.prototype.start = function() {
                this.isUsable() && this.timerState === O.NEW && (this.context.start_time = p.WebTimingUtil.getNow(), this.timerState = O.RUNNING)
            }, e.prototype.restart = function() {
                this.TTICallback && (this.TTICallback.cancel(), this.TTICallback = void 0), this.loggedEvents = 0, this.context.have_logged_web_timing = !1, this.context.correlation_id = p.WebTimingUtil.generateCorrelationId(), this.context.start_time = p.WebTimingUtil.getNow(), this.context.end_time = void 0, this.context.time_to_view = null, this.context.time_to_interactive = null, this.timerState = O.RUNNING, _.JSStopwatch.deleteStopwatch(this.timingStopwatch), this.timingStopwatch = _.JSStopwatch.createDetachedStopwatch("maestro_tracing", {
                    request_id: this.context.request_id,
                    url: this.context.tti_flow,
                    correlation_id: this.context.correlation_id
                }), _.JSStopwatch.deleteStopwatch(this.userStopwatch), this.userStopwatch = _.JSStopwatch.createDetachedStopwatch("user_tracing", {
                    request_id: this.context.request_id,
                    url: this.context.tti_flow,
                    correlation_id: this.context.correlation_id
                })
            }, e.prototype.abort = function() {
                this.timerState !== O.CLOSED && (this.timerState = O.ABORTED)
            }, e.prototype.markTimeToView = function() {
                this.isUsable() && (null == this.context.time_to_view && (this.context.time_to_view = p.WebTimingUtil.getNow()), this.logEvent(l.WebTimerEvent.MARK_TIME_TO_VIEW))
            }, e.prototype.markTimeToInteractive = function() {
                this.isUsable() && (this.logEvent(l.WebTimerEvent.MARK_TIME_TO_INTERACTIVE), N() ? this.reportTTI() : this.TTICallback = this.reportTTIAfterPaint())
            }, e.prototype.reportTTI = function() {
                null == this.context.time_to_interactive && (this.context.time_to_interactive = p.WebTimingUtil.getNow(), this.logEvent(l.WebTimerEvent.TIME_TO_INTERACTIVE), Q(this.id))
            }, e.prototype.end = function(t) {
                this.isUsable() && (void 0 === this.context.end_time && (this.context.end_time = p.WebTimingUtil.getNow()), this.context.request_id = t, this.timingStopwatch.request_id = t, this.userStopwatch.request_id = t, this.logEvent(l.WebTimerEvent.LOAD_END))
            }, e.prototype.waitForTTI = function(t) {
                var e = this;
                return new Promise((function(i, n) {
                    if (null == e.context.time_to_interactive) {
                        var r, o = function(t) {
                            window.removeEventListener("TTI." + e.id, o), clearTimeout(r), i()
                        };
                        window.addEventListener("TTI." + e.id, o), t && void 0 !== t.timeoutMS && (r = setTimeout(o, t.timeoutMS))
                    } else i()
                }))
            }, e.prototype.isUsable = function() {
                return this.timerState === O.NEW || this.timerState === O.RUNNING
            }, e
        })(W),
        U = (function(t) {
            function e(e) {
                var i = t.call(this, e, _.JSStopwatch.createDetachedStopwatch("maestro_tracing", {
                    correlation_id: e.correlation_id
                }), _.JSStopwatch.createDetachedStopwatch("user_tracing", {
                    correlation_id: e.correlation_id
                }), !1) || this;
                return i.logger = new L, i
            }
            return i.__extends(e, t), e.prototype.initialize = function(t) {
                var e = this;
                if (!this.context.initialized) {
                    if (!S.performance()) return;
                    this.context.log_time_to_view = t.requireTTV, this.context.log_time_to_interactive = t.requireTTI, this.context.is_pagelet = !!t.is_pagelet, this.context.is_dws = !!t.is_dws, this.context.is_dws2 = !!t.is_dws2, this.context.is_early_ensemble = !!t.is_early_ensemble, this.context.is_page_restore = !1, this.context.ttv_at_dom_interactive = !!t.ttv_at_dom_interactive, this.context.tti_at_dom_interactive = !!t.tti_at_dom_interactive, this.context.source_type = null != t.source_type ? t.source_type : "web", this.context.subtypes = null != t.subtypes ? t.subtypes : {}, this.context.tti_exclusion_flow = null != t.tti_exclusion_flow ? t.tti_exclusion_flow : "", this.context.have_logged_web_timing = !1, this.context.delayed_tti_for_css = !1, this.context.initialized = !0, t.url && (this.context.tti_flow = t.url, this.timingStopwatch.url = t.url, this.userStopwatch.url = t.url), this.context.subtypes.tti_flow && (this.context.tti_flow = this.context.subtypes.tti_flow);
                    var i = 0;
                    v.LOG_TIMING_DELAY && (i = 600), _.JSStopwatch.create_stopwatch_if_not_exist("web_timing_logger"), a.window_load((function() {
                        setTimeout((function() {
                            return e.end()
                        }), i)
                    })), c.onPageRestore((function(t) {
                        e.context.is_page_restore = !0;
                        var i = _.JSStopwatch.createDetachedStopwatch("browser_perf", {
                            correlation_id: e.context.correlation_id
                        });
                        i.recordTrace("page_restore"), i.logData()
                    })), !this.context.ttv_at_dom_interactive && window._timingData && (null != window._timingData.ttv && (this.context.time_to_view = window._timingData.ttv.getTime(), this.logEvent(l.WebTimerEvent.MARK_TIME_TO_VIEW, this.context.time_to_view)), null != window._timingData.tti && (this.context.time_to_interactive = window._timingData.tti.getTime(), this.logEvent(l.WebTimerEvent.TIME_TO_INTERACTIVE, this.context.time_to_interactive), Q()))
                }
            }, e.prototype.start = function() {
                this.isUsable() && this.timerState === O.NEW && (this.timerState = O.RUNNING)
            }, e.prototype.restart = function() {
                this.TTICallback && (this.TTICallback.cancel(), this.TTICallback = void 0), this.loggedEvents = 0, this.context.correlation_id = p.WebTimingUtil.generateCorrelationId(), this.context.end_time = void 0, this.context.time_to_view = null, this.context.time_to_interactive = null, this.timerState = O.RUNNING, this.timingStopwatch = _.JSStopwatch.createDetachedStopwatch("maestro_tracing", {
                    correlation_id: this.context.correlation_id
                }), this.userStopwatch = _.JSStopwatch.createDetachedStopwatch("user_tracing", {
                    correlation_id: this.context.correlation_id
                })
            }, e.prototype.abort = function() {
                this.timerState !== O.CLOSED && (this.timerState = O.ABORTED)
            }, e.prototype.markTimeToView = function() {
                this.isUsable() && (null != this.context.time_to_view || this.context.ttv_at_dom_interactive || (window._timingData && null != window._timingData.ttv ? this.context.time_to_view = window._timingData.ttv.getTime() : this.context.time_to_view = p.WebTimingUtil.getNow(), this.logEvent(l.WebTimerEvent.MARK_TIME_TO_VIEW, this.context.time_to_view)))
            }, e.prototype.markTimeToInteractive = function() {
                var t = this;
                if (window.ensemble && window.ensemble.waitingForCss) return this.context.delayed_tti_for_css = !0, void(window.ensemble.mark_tti_callback = function() {
                    t.markTimeToInteractive()
                });
                null != this.context.time_to_interactive || this.context.tti_at_dom_interactive || (this.logEvent(l.WebTimerEvent.MARK_TIME_TO_INTERACTIVE), N() ? this.reportTTI() : this.TTICallback = this.reportTTIAfterPaint())
            }, e.prototype.reportTTI = function() {
                null == this.context.time_to_interactive && (window._timingData && null != window._timingData.tti ? this.context.time_to_interactive = window._timingData.tti.getTime() : this.context.time_to_interactive = p.WebTimingUtil.getNow(), console.timeStamp && console.timeStamp("TTI"), window.ensemble && window.ensemble.snapshotTimingProfile && (this.context.timing_results = window.ensemble.snapshotTimingProfile() || null), this.logEvent(l.WebTimerEvent.TIME_TO_INTERACTIVE, this.context.time_to_interactive), Q())
            }, e.prototype.end = function(t) {
                this.isUsable() && void 0 === this.context.end_time && (this.context.end_time = p.WebTimingUtil.getNow(), this.logEvent(l.WebTimerEvent.LOAD_END), this.context.tti_at_dom_interactive && Q())
            }, e.prototype.waitForTTI = function(t) {
                var e = this;
                return new Promise((function(i, n) {
                    if (window.ensemble) {
                        if (window.ensemble.ttiMarked) return void i()
                    } else if (null != e.context.time_to_interactive) return void i();
                    var r, o = function(t) {
                        window.removeEventListener("TTI", o), clearTimeout(r), i()
                    };
                    window.addEventListener("TTI", o), t && void 0 !== t.timeoutMS && (r = setTimeout(o, t.timeoutMS))
                }))
            }, e.prototype.isUsable = function() {
                return this.timerState === O.NEW || this.timerState === O.RUNNING
            }, e
        })(W),
        B = {},
        z = new U(p.WebTimingUtil.newContext(!1, "default_timer"));

    function J(t, e) {
        for (var i = {}, n = 0, r = I; n < r.length; n++) {
            (u = e[c = r[n]]) && (i[c] = String(u))
        }
        for (var o = t, a = 0, s = k; a < s.length; a++) {
            var c, u;
            (u = o[c = s[a]]) && (i[c] = String(u))
        }
        return {
            correlation_id: t.correlation_id,
            request_id: e.request_id,
            annotations: i
        }
    }

    function V(t, e) {
        if (e.annotations)
            for (var i in e.annotations)
                if (e.annotations.hasOwnProperty(i)) {
                    var n = e.annotations[i];
                    n && t.addAnnotation(i, String(n))
                }
        e.correlation_id && t.addAnnotation(_.ReservedAnnotationKey.CORRELATION_ID.id, e.correlation_id), e.request_id && t.addAnnotation(_.ReservedAnnotationKey.REQUEST_ID.id, e.request_id), e.url && t.addAnnotation(_.ReservedAnnotationKey.URL.id, e.url)
    }

    function F(t) {
        return t ? (function(t) {
            var e = t;
            return B[e] || (B[e] = new q(p.WebTimingUtil.newContext(!0, t))), B[e]
        })(t) : z
    }

    function G(t) {
        void 0 === t && (t = {}), F().initialize({
            requireTTV: !!t.log_time_to_view,
            requireTTI: !!t.log_time_to_interactive,
            is_pagelet: t.is_pagelet,
            is_dws: t.is_dws,
            is_dws2: t.is_dws2,
            is_early_ensemble: t.is_early_ensemble,
            ttv_at_dom_interactive: t.ttv_at_dom_interactive,
            tti_at_dom_interactive: t.tti_at_dom_interactive,
            source_type: t.source_type,
            subtypes: t.subtypes,
            tti_exclusion_flow: t.tti_exclusion_flow,
            url: t.url
        })
    }

    function K(t, e) {
        t.recordEntries(e.map((function(t) {
            return {
                type: 0 !== t.startTime ? f.TimingDataType.Span : f.TimingDataType.Trace,
                name: t.name,
                startTime: t.startTime,
                endTime: t.endTime,
                annotations: t.annotations
            }
        }))), t.logData()
    }
    e.get_timer = F, e.delete_timer = function(t) {
        delete B[t]
    }, e.time_to_view = function() {
        return F().timeToView()
    }, e.time_to_interactive = function() {
        return F().timeToInteractive()
    }, e.initialize_module = G, e.initialize = function(t, e) {
        var n, r = e.dwsOpts;
        switch (e.sourceType) {
            case E.web_timing_logger.WebTimingLoggerServerContext.SourceType.UNKNOWN:
                n = "unknown";
                break;
            case E.web_timing_logger.WebTimingLoggerServerContext.SourceType.MOBILE_WEB:
                n = "mobile";
                break;
            case E.web_timing_logger.WebTimingLoggerServerContext.SourceType.DESKTOP_WEB:
                n = "web"
        }
        var o = {
            is_pagelet: e.isDws,
            is_dws: e.isDws,
            is_dws2: null != r && r.isDws2,
            is_early_ensemble: null != r && r.isEarlyEnsemble,
            subtypes: i.__assign(i.__assign({}, e.subtypes), {
                js_preloading: null != r && r.jsPreloading ? "true" : "false"
            }),
            source_type: n,
            url: e.url
        };
        G(i.__assign(i.__assign({}, o), t))
    }, e.reset = function() {
        z = new U(p.WebTimingUtil.newContext(!1, "default_timer"))
    }, e.start_time = function() {
        return F().startTime()
    }, e.time_since_start = function() {
        return F().timeSinceStart()
    }, e.set_tti_exclusion_flow = function(t) {
        F().excludeFromTTI(t)
    };
    var H = ["ensemble_init", "dws_ensemble_init", "dws_embedded-app_require_config_callback", "dws-processChunk-embedded-app-require_config-1"],
        Y = new RegExp("dws-processChunk-embedded-app-const_module.*");

    function X(t) {
        var e = S.performance();
        if (e && e.getEntriesByName) {
            for (var i = [], n = 0, r = s.get_module_times(); n < r.length; n++) {
                var o = r[n],
                    a = o.url;
                if (void 0 === a && o.name && -1 === o.name.indexOf("!")) b.reportStack("Module " + o.name + " with invalid map object fetched by requirejs", {
                    severity: b.SEVERITY.NONCRITICAL,
                    tags: ["log_js_module_timing"]
                });
                else {
                    var c = [];
                    if (a && (c = e.getEntriesByName(a, "resource")), 0 !== c.length) o.start_time = c[0].startTime + c[0].duration;
                    else {
                        if (!("callback_duration" in o)) continue;
                        o.start_time = 0
                    }
                    i.push(o)
                }
            }
            t.js_module_times = JSON.stringify(i)
        }
    }

    function Q(t) {
        if (window.ensemble && window.ensemble.markTTI) window.ensemble.markTTI();
        else {
            var e = document.createEvent("Event");
            null != t ? e.initEvent("TTI." + t, !0, !0) : e.initEvent("TTI", !0, !0), window.dispatchEvent(e)
        }
    }
    e.mark_time_to_view = function() {
        F().markTimeToView()
    }, e.mark_time_to_interactive = function(t) {
        void 0 === t && (t = {});
        var e = F();
        e.setExtraColumns(t), e.markTimeToInteractive()
    }, e.waitForTTI = function(t) {
        return F().waitForTTI(t)
    }, e.log_js_modules_application_code_start = function() {
        F().applicationStart()
    }, e.log_js_modules_fetched_data_required_for_tti = function() {
        F().fetchedDataRequiredForTTI()
    }
})), define("modules/clean/window_util", ["require", "exports"], (function(t, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.onBeforeUnload = function(t) {
        window.addEventListener("beforeunload", (function e() {
            t(), window.removeEventListener("beforeunload", e)
        }))
    }, e.onPageRestore = function(t) {
        window.addEventListener("pageshow", (function e(i) {
            i.persisted && (t(), window.removeEventListener("pageshow", e))
        }))
    }
})), define("modules/clean/js_basic_stopwatch", ["require", "exports", "tslib", "modules/core/exception"], (function(t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r, o = !(!window.performance || !window.performance.now),
        a = 0;
    (function(t) {
        t[t.Span = 1] = "Span", t[t.AsyncSpan = 2] = "AsyncSpan", t[t.Trace = 3] = "Trace"
    })(r = e.TimingDataType || (e.TimingDataType = {}));
    var s = (function() {
        function t(t, e, n, r, o) {
            void 0 === r && (r = !1), this.name = t, this.strictAssert = e, this.activeSpans = {}, this.aggregateSpans = {}, this._annotations = i.__assign({}, o), this.spanStack = [], this.stopwatchTags = n || [], this.detached = r
        }
        return t.prototype.reset = function() {
            this.activeSpans = {}, this.spanStack = [], this.aggregateSpans = {}, this._annotations = {}
        }, Object.defineProperty(t.prototype, "annotations", {
            get: function() {
                return this._annotations
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.addAnnotation = function(t, e) {
            this._annotations[t] = e
        }, t.prototype.removeAnnotation = function(t) {
            delete this._annotations[t]
        }, t.prototype.popResolvedSpans = function() {
            if (this.detached) return {};
            var t = this.aggregateSpans;
            return this.aggregateSpans = {}, t
        }, t.prototype.peekResolvedSpans = function() {
            return this.detached ? {} : this.aggregateSpans
        }, t.newSpanID = function() {
            var t = String(a);
            return a++, t
        }, t.resolveTime = function(t) {
            return void 0 === t && (t = window.performance.now()), Math.round(t)
        }, t.prototype._resolveParent = function(t) {
            if (t.type === r.Span) {
                var e = this.spanStack[this.spanStack.length - 1];
                if (e)
                    if (e !== t.name) this._report_sw_misuse("Closing " + e + " while the latest open span is " + t.name + ".\n        You are either mixing sync and async spans or closing sync spans out of order.");
                    else {
                        this.spanStack.pop();
                        for (var i = "", n = 0, o = this.spanStack; n < o.length; n++) {
                            i += o[n] + "#"
                        }
                        t.parent = i
                    }
                else this._report_sw_misuse(t.name + ' isn\'t a synchronous span and has to be started with "async:true".')
            } else t.parent = ""
        }, t.prototype.recordTrace = function(e, n) {
            void 0 === n && (n = {});
            var o = t.resolveTime(n.traceTime),
                a = t.newSpanID(),
                s = {
                    name: e,
                    span_id: a,
                    start_time: 0,
                    end_time: o,
                    annotations: i.__assign({}, n.annotations),
                    type: r.Trace,
                    parent: ""
                };
            return this.recordSpan(this.stopwatchTags, s), a
        }, t.prototype.start = function(e, n) {
            void 0 === n && (n = {}), e || this._report_sw_misuse("Reporting a span without a name");
            var o = t.resolveTime(n.startTime);
            n.async || this.spanStack.push(e);
            var a = t.newSpanID(),
                s = {
                    name: e,
                    span_id: a,
                    start_time: o || 0,
                    annotations: i.__assign({}, n.annotations),
                    type: n.async ? r.AsyncSpan : r.Span
                };
            return e in this.activeSpans || (this.activeSpans[e] = []), this.activeSpans[e].push(s), a
        }, t.prototype.end = function(e, i) {
            void 0 === i && (i = {});
            var n = this.findTimerDataIndex(e, i.spanId);
            if (-1 !== n) {
                var r = this.activeSpans[e],
                    o = r[n];
                r.splice(n, 1), this._resolveParent(o);
                var a = t.resolveTime(i.endTime);
                if (!(a < o.start_time)) return o.end_time = a, this.recordSpan(this.stopwatchTags, o), o.span_id;
                this._report_sw_misuse("span " + e + " has set an endTime earlier than start_time")
            }
        }, t.prototype.addSpanAnnotation = function(t, e, i, n) {
            var r = this.findTimerDataIndex(t, n); - 1 !== r && (this.activeSpans[t][r].annotations[e] = i)
        }, t.prototype.attach = function() {
            this.detached = !1
        }, t.prototype.findTimerDataIndex = function(t, e) {
            if (!(t in this.activeSpans) || 0 === this.activeSpans[t].length) return this._report_sw_misuse("tried to find " + t + " but that span doesn't exist"), -1;
            var i = -1,
                n = this.activeSpans[t];
            if (void 0 === e) i = 0;
            else
                for (var r = 0; r < n.length; r++)
                    if (n[r].span_id === e) {
                        i = r;
                        break
                    } return -1 === i && this._report_sw_misuse("tried to find " + t + " with id " + e + " but that span doesn't exist"), i
        }, t.prototype._report_sw_misuse = function(t) {
            t = "JSBasicStopwatch " + this.name + ": " + t, this.strictAssert ? n.assert(!1, t) : n.reportStack(t, {
                severity: n.SEVERITY.NONCRITICAL,
                tags: ["log_js_stopwatch"]
            })
        }, t.prototype.recordSpan = function(t, e) {
            var i = "" + e.parent + e.name;
            i in this.aggregateSpans || (this.aggregateSpans[i] = {
                name: e.name,
                start_time: e.start_time,
                total_time: 0,
                num_calls: 0,
                annotations: Object.keys(e.annotations).length > 0 ? e.annotations : void 0,
                parent: e.parent || "",
                stopwatch_tags: t.length > 0 ? t : void 0,
                type: e.type
            });
            var n = this.aggregateSpans[i];
            if (void 0 !== e.end_time) {
                if (n.type === r.Trace ? (n.total_time = e.end_time - e.start_time, n.num_calls = 1) : (n.total_time += e.end_time - e.start_time, n.num_calls += 1), Object.keys(e.annotations).length > 0)
                    if (n.annotations)
                        for (var o in e.annotations) e.annotations.hasOwnProperty(o) && (n.annotations[o] = e.annotations[o]);
                    else n.annotations = e.annotations
            } else this._report_sw_misuse("Span " + i + " reported with undefined end_time")
        }, t
    })();
    e.JSBasicStopwatchImpl = s;
    var c = (function() {
        function t() {
            this.name = "", this.annotations = {}
        }
        return t.prototype.reset = function() {}, t.prototype.attach = function() {}, t.prototype.addAnnotation = function(t, e) {}, t.prototype.removeAnnotation = function(t) {}, t.prototype.popResolvedSpans = function() {
            return {}
        }, t.prototype.peekResolvedSpans = function() {
            return {}
        }, t.prototype.start = function(t, e) {}, t.prototype.end = function(t, e) {}, t.prototype.recordTrace = function(t, e) {}, t.prototype.addSpanAnnotation = function(t, e, i, n) {}, t
    })();
    e.NoopStopwatchInstance = new c, e.createStopwatch = function(t, i, n, r, a) {
        return void 0 === r && (r = !1), o ? new s(t, i, n, r, a) : e.NoopStopwatchInstance
    }
})), define("modules/clean/js_client_stopwatch", ["require", "exports", "tslib", "modules/core/xhr", "modules/clean/js_basic_stopwatch", "modules/constants/request", "modules/core/browser", "modules/core/exception"], (function(t, e, i, n, r, o, a, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), o = i.__importStar(o), a = i.__importStar(a);
    var c = (function() {
        function t(t) {
            this.id = t
        }
        return t.REQUEST_ID = new t("dropbox.js_client_stopwatch.request_id"), t.CORRELATION_ID = new t("dropbox.js_client_stopwatch.correlation_id"), t.URL = new t("dropbox.js_client_stopwatch.url"), t
    })();
    e.ReservedAnnotationKey = c;
    var u = (function() {
        function t() {
            this.GLOBAL_SW_NAME = "GLOBAL_STOPWATCH", this.flush_interval = 6e4, this.debugEnabled = !0, this.strictAssert = !1, this.intervalId = null, this.clientStopwatchCounter = 1, this.reset()
        }
        return t.prototype.reset = function() {
            this.globalStopwatches = {}, this.clientStopwatches = {}, this.clientStopwatchCounter = 1, this.sentInitialData = !1, this.create_stopwatch(this.GLOBAL_SW_NAME), this.intervalId && clearInterval(this.intervalId), this.intervalId = null
        }, t.prototype.reset_individual_stopwatch = function(t) {
            this.stopwatch_exists(t) ? this.globalStopwatches[t].reset() : this._report_sw_misuse("tried to reset the stopwatch " + t + " but it does not exist")
        }, t.prototype.stopwatch_exists = function(t) {
            return t in this.globalStopwatches
        }, t.prototype.create_stopwatch = function(t, e) {
            this.stopwatch_exists(t) ? this._report_sw_misuse("tried to create a new stopwatch " + t + " but it already exists") : this.globalStopwatches[t] = r.createStopwatch(t, this.strictAssert, e)
        }, t.prototype.createDetachedStopwatch = function(t, e) {
            void 0 === e && (e = {});
            var i = r.createStopwatch(t, this.strictAssert, e.tags, !0, e.annotations),
                n = new l(this.clientStopwatchCounter++, t, i, e.request_id, e.correlation_id, e.url);
            return this.clientStopwatches[n.id] = n, n
        }, t.prototype.deleteStopwatch = function(t) {
            delete this.clientStopwatches[t.id]
        }, t.prototype.create_stopwatch_if_not_exist = function(t, e) {
            this.stopwatch_exists(t) || this.create_stopwatch(t, e)
        }, t.prototype.getStopwatch = function(t) {
            return this.stopwatch_exists(t) ? this.globalStopwatches[t] : (this._report_sw_misuse(t + " doesn't exist"), null)
        }, t.prototype.recordTrace = function(t, e) {
            void 0 === e && (e = {});
            var i = this.getStopwatch(e.stopwatchName || this.GLOBAL_SW_NAME);
            if (null != i) {
                var n = {
                    traceTime: e.traceTime
                };
                return i.recordTrace(t, n)
            }
        }, t.prototype.startSpan = function(t, e) {
            void 0 === e && (e = {});
            var i = this.getStopwatch(e.stopwatchName || this.GLOBAL_SW_NAME);
            if (null != i) {
                var n = {
                    startTime: e.startTime,
                    async: e.async
                };
                return i.start(t, n)
            }
        }, t.prototype.endSpan = function(t, e) {
            void 0 === e && (e = {});
            var i = this.getStopwatch(e.stopwatchName || this.GLOBAL_SW_NAME);
            if (null != i) return i.end(t, {
                spanId: e.spanId,
                endTime: e.endTime
            })
        }, t.prototype.addSpanAnnotation = function(t, e, i, n) {
            void 0 === n && (n = {});
            var r = this.getStopwatch(n.stopwatchName || this.GLOBAL_SW_NAME);
            null != r && r.addSpanAnnotation(t, e, i, n.spanId)
        }, t.prototype.log_stored_results = function() {
            this.sentInitialData ? this._report_sw_misuse("ClientStopwatch tried to log stored results, but the stopwatch is set to log immediately") : (this.flush_current_data(), this.sentInitialData = !0, this.intervalId = setInterval(this.flush_current_data.bind(this), this.flush_interval))
        }, t.prototype._report_sw_misuse = function(t) {
            t = "ClientStopwatch: " + t, this.strictAssert ? s.assert(!1, t) : s.reportStack(t, {
                severity: s.SEVERITY.NONCRITICAL,
                tags: ["log_js_stopwatch"]
            })
        }, t.prototype.flush_current_data = function() {
            for (var e in this.globalStopwatches) this.globalStopwatches.hasOwnProperty(e) && t.logStopwatchData(this.globalStopwatches[e]);
            for (var e in this.clientStopwatches) this.clientStopwatches.hasOwnProperty(e) && t.logStopwatchData(this.clientStopwatches[e].stopwatch)
        }, t.logStopwatchData = function(e) {
            var i = e.popResolvedSpans(),
                n = e.name,
                r = {};
            if (Object.keys(i).length > t.MAXSPANS) {
                var o = 0;
                for (var a in r[n] = {}, i) i.hasOwnProperty(a) && (r[n][a] = i[a], o === t.MAXSPANS && (r[n].annotations = e.annotations, t.send_spans(r), o = 0, r[n] = {}), o++)
            } else r[n] = i;
            0 !== Object.keys(r[n]).length && (r[n].annotations = e.annotations, t.send_spans(r))
        }, t.send_spans = function(t) {
            var e = JSON.stringify(t),
                i = {
                    request_id: o.REQUEST_ID,
                    url: a.get_href().replace("/dws2", ""),
                    aggregated_sw_data: e
                };
            n.sendXhr("/log_js_sw_data", i)
        }, t.prototype.print_stopwatches_debug = function() {
            var t = this.get_debug_data();
            console.table && console.groupCollapsed && console.groupEnd && t && t.length > 0 && (console.groupCollapsed("Request timeline"), console.table(t), console.groupEnd())
        }, t.prototype.get_debug_data = function() {
            var t = [];
            for (var e in this.globalStopwatches)
                if (this.globalStopwatches.hasOwnProperty(e)) {
                    var i = this.globalStopwatches[e].peekResolvedSpans();
                    for (var n in i)
                        if (i.hasOwnProperty(n)) {
                            var o = i[n],
                                a = {
                                    stopwatchName: e,
                                    spanName: o.name,
                                    time: o.start_time + o.total_time
                                };
                            o.type !== r.TimingDataType.AsyncSpan && o.type !== r.TimingDataType.Span || (a.startTime = o.start_time), o.type === r.TimingDataType.Span && (a.info = "Total time: " + o.total_time + "ms"), t.push(a)
                        }
                }
            return t.sort((function(t, e) {
                return t.time - e.time
            })), t
        }, t.MAXSPANS = 2e3, t
    })();
    e.JSStopwatch = new u;
    var l = (function() {
        function t(t, e, i, n, r, o) {
            this.sentInitialData = !1, this.strictAssert = !1, this.id = t, this.stopwatch = i, this._request_id = n, this._correlation_id = r, this._url = o, this._request_id && this.stopwatch.addAnnotation(c.REQUEST_ID.id, this._request_id), this._correlation_id && this.stopwatch.addAnnotation(c.CORRELATION_ID.id, this._correlation_id), this._url && this.stopwatch.addAnnotation(c.URL.id, this._url)
        }
        return Object.defineProperty(t.prototype, "request_id", {
            set: function(t) {
                this._request_id = t, this._request_id ? this.stopwatch.addAnnotation(c.REQUEST_ID.id, this._request_id) : this.stopwatch.removeAnnotation(c.REQUEST_ID.id)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "correlation_id", {
            set: function(t) {
                this._correlation_id = t, this._correlation_id ? this.stopwatch.addAnnotation(c.CORRELATION_ID.id, this._correlation_id) : this.stopwatch.removeAnnotation(c.CORRELATION_ID.id)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "url", {
            set: function(t) {
                this._url = t, this._url ? this.stopwatch.addAnnotation(c.URL.id, this._url) : this.stopwatch.removeAnnotation(c.URL.id)
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.startSpan = function(t, e) {
            return this.stopwatch.start(t, e)
        }, t.prototype.endSpan = function(t, e) {
            return this.stopwatch.end(t, e)
        }, t.prototype.addSpanAnnotation = function(t, e, i, n) {
            this.stopwatch.addSpanAnnotation(t, e, i, n)
        }, t.prototype.recordTrace = function(t, e, i) {
            this.stopwatch.recordTrace(t, {
                traceTime: e,
                annotations: i
            })
        }, t.prototype.recordEntries = function(t) {
            for (var e = 0, i = t; e < i.length; e++) {
                var n = i[e];
                if (n.type === r.TimingDataType.Trace) this.recordTrace(n.name, n.endTime, n.annotations);
                else {
                    var o = n.startTime || 0,
                        a = this.startSpan(n.name, {
                            startTime: Math.min(o, n.endTime),
                            async: n.type === r.TimingDataType.AsyncSpan,
                            annotations: n.annotations
                        });
                    n.endTime < o && this.addSpanAnnotation(n.name, "negativeSpanLength", (n.endTime - o).toString(), a), this.endSpan(n.name, {
                        spanId: a,
                        endTime: Math.max(o, n.endTime)
                    })
                }
            }
        }, t.prototype.logData = function() {
            this.sentInitialData ? this.reportMisuse("ClientStopwatch tried to log stored results, but the stopwatch is set to log immediately") : (this.stopwatch.attach(), this.sentInitialData = !0, setTimeout((function() {
                e.JSStopwatch.flush_current_data()
            }), 0))
        }, t.prototype.addAnnotation = function(t, e) {
            this.stopwatch.addAnnotation(t, e)
        }, t.prototype.removeAnnotation = function(t) {
            this.stopwatch.removeAnnotation(t)
        }, t.prototype.reportMisuse = function(t) {
            t = "ClientStopwatch: " + t, this.strictAssert ? s.assert(!1, t) : s.reportStack(t, {
                severity: s.SEVERITY.NONCRITICAL,
                tags: ["log_js_stopwatch"]
            })
        }, t
    })()
})), define("apex-metrics", ["require", "exports"], (function(t, e) {
    "use strict";
    var i;
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.TimeUnit = i, (function(t) {
        t[t.NANOSECONDS = 0] = "NANOSECONDS", t[t.MILLISECONDS = 1] = "MILLISECONDS", t[t.SECONDS = 2] = "SECONDS", t[t.MINUTES = 3] = "MINUTES", t[t.HOURS = 4] = "HOURS", t[t.DAYS = 5] = "DAYS"
    })(i || (e.TimeUnit = i = {}));
    var n = (function() {
        function t() {}
        return t.toMilliseconds = function(t) {
            switch (t.unit) {
                case i.NANOSECONDS:
                    return t.value / 1e6;
                case i.MILLISECONDS:
                    return t.value;
                case i.SECONDS:
                    return 1e3 * t.value;
                case i.MINUTES:
                    return 6e4 * t.value;
                case i.HOURS:
                    return 36e5 * t.value;
                case i.DAYS:
                    return 24 * t.value * 36e5
            }
        }, t
    })();
    e.Instant = n;
    var r = (function() {
        function t() {}
        return t.prototype.now = function() {
            return {
                value: performance.now(),
                unit: i.MILLISECONDS
            }
        }, t
    })();
    e.BrowserPerformanceClock = r;
    var o = (function() {
        function t() {}
        return t.prototype.executeEvery = function(t, e) {
            var i = n.toMilliseconds(t),
                r = setInterval((function() {
                    e() || clearInterval(r)
                }), i)
        }, t
    })();
    e.SetIntervalExecutor = o;
    var a = new RegExp("^[^0-9a-zA-Z]+"),
        s = new RegExp("[^0-9a-zA-Z._-]", "g"),
        c = s,
        u = new RegExp("[^0-9a-zA-Z/._-]", "g"),
        l = s;

    function p(t) {
        return {
            ns: d(t.ns),
            name: m(t.name)
        }
    }

    function _(t) {
        var e = {};
        for (var i in t) {
            if (t.hasOwnProperty(i)) e[h(i, "tag name", 256, a, l)] = h(t[i], "tag value", 256)
        }
        return e
    }

    function d(t) {
        return h(t, "namespace", 256, a, c)
    }

    function m(t) {
        return h(t, "metric name", 256, a, u)
    }

    function h(t, e, i, n, r) {
        var o = [];
        if ("string" != typeof t && o.push("identifier is not a string"), n && n.test(t) && o.push("invalid prefix"), r && r.test(t) && o.push("invalid characters"), t.length > i && o.push("exceeds " + i + " characters"), 0 === t.length && o.push("is empty"), 0 !== o.length) throw new Error(e + " identifier '" + t + "' is invalid: " + o);
        return t
    }
    e.validateMetric = p, e.validateTags = _, e.validateNamespace = d, e.validateMetricName = m;
    var f = (function() {
        function t(t, e, i) {
            void 0 === i && (i = {}), this.sink = t, this.clock = e, this.tags = i
        }
        return t.root = function(e, i) {
            return new t(e, i)
        }, t.prototype.child = function(e) {
            return new t(this.sink, this.clock, Object.assign(Object.assign({}, this.tags), _(e)))
        }, t.prototype.createStats = function(t, e) {
            return void 0 === e && (e = {}), new g(p(t), Object.assign(Object.assign({}, this.tags), _(e)), this.sink)
        }, t.prototype.createCounter = function(t, e) {
            return void 0 === e && (e = {}), new v(p(t), Object.assign(Object.assign({}, this.tags), _(e)), this.sink)
        }, t.prototype.createTimer = function(t, e) {
            return void 0 === e && (e = {}), new w(p(t), Object.assign(Object.assign({}, this.tags), _(e)), this.sink, this.clock)
        }, t
    })();
    e.MetricsReporterImpl = f;
    var g = (function() {
            function t(t, e, i) {
                this.metric = t, this.tags = e, this.sink = i
            }
            return t.prototype.record = function(t) {
                S(t, this.metric, this.tags, this.sink)
            }, t.prototype.recordDuration = function(t, e) {
                S(n.toMilliseconds({
                    value: t,
                    unit: e
                }), this.metric, this.tags, this.sink)
            }, t
        })(),
        v = (function() {
            function t(t, e, i, n) {
                void 0 === n && (n = 0), this.metric = t, this.tags = e, this.sink = i, this.value = n
            }
            return t.prototype.decrement = function(t) {
                void 0 === t && (t = 1), this.value -= t
            }, t.prototype.increment = function(t) {
                void 0 === t && (t = 1), this.value += t
            }, t.prototype.reset = function(t) {
                void 0 === t && (t = 0), this.value = t
            }, t.prototype.record = function() {
                S(this.value, this.metric, this.tags, this.sink), this.reset()
            }, t
        })(),
        w = (function() {
            function t(t, e, i, r, o) {
                void 0 === o && (o = 0), this.metric = t, this.tags = e, this.sink = i, this.clock = r, this.value = o, this.value = n.toMilliseconds(this.clock.now())
            }
            return t.prototype.record = function() {
                S(n.toMilliseconds(this.clock.now()) - this.value, this.metric, this.tags, this.sink), this.reset()
            }, t.prototype.reset = function() {
                this.value = n.toMilliseconds(this.clock.now())
            }, t
        })();

    function S(t, e, i, n) {
        n.recordSpan({
            namespace: e.ns,
            metricName: e.name,
            tags: i,
            samples: [t]
        })
    }
    var T = (function() {
        function t() {}
        return t.prototype.recordSpan = function(t) {}, t
    })();
    e.NoOpSink = T;
    var b = (function() {
        function t() {}
        return t.prototype.executeEvery = function(t, e) {}, t
    })();
    e.NoOpExecutor = b
})), define("google/protobuf/any", ["require", "exports", "tslib", "protobufjs/minimal"], (function(t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r, o, a = (n = i.__importStar(n)).Reader,
        s = n.Writer,
        c = n.util,
        u = n.roots.default || (n.roots.default = {});
    e.default = u, e.google = u.google = ((r = u.google || {}).protobuf = ((o = r.protobuf || {}).Any = (function(t) {
        function t(t) {
            if (t)
                for (var e = Object.keys(t), i = 0; i < e.length; ++i) null != t[e[i]] && (this[e[i]] = t[e[i]])
        }
        return t.prototype.typeUrl = "", t.prototype.value = c.newBuffer([]), t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            return e || (e = s.create()), null != t.typeUrl && Object.hasOwnProperty.call(t, "typeUrl") && e.uint32(10).string(t.typeUrl), null != t.value && Object.hasOwnProperty.call(t, "value") && e.uint32(18).bytes(t.value), e
        }, t.decode = function(t, e) {
            t instanceof a || (t = a.create(t));
            for (var i = void 0 === e ? t.len : t.pos + e, n = new u.google.protobuf.Any; t.pos < i;) {
                var r = t.uint32();
                switch (r >>> 3) {
                    case 1:
                        n.typeUrl = t.string();
                        break;
                    case 2:
                        n.value = t.bytes();
                        break;
                    default:
                        t.skipType(7 & r)
                }
            }
            return n
        }, t
    })(o.Any || {}), o), r)
})), define("proto_utils/unpack", ["require", "exports", "google/protobuf/any"], (function(t, e, i) {
    "use strict";

    function n(t) {
        return t.constructor.encode(t).finish()
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.wrapInProtoAny = function(t, e) {
        var r = {
            value: n(t)
        };
        return null != e && (r.typeUrl = e), i.google.protobuf.Any.create(r)
    }, e.packProto = function(t) {
        for (var e = n(t), i = "", r = 0; r < e.byteLength; r++) i += String.fromCharCode(e[r]);
        return btoa(i)
    }, e.unpackProto = function(t, e) {
        for (var n = atob(t), r = n.length, o = new Uint8Array(r), a = 0; a < r; a++) o[a] = n.charCodeAt(a);
        var s, c = function(t) {
            try {
                return e.decode(t)
            } catch (t) {
                throw new Error("Invalid data while trying to unpack encoded proto: " + t)
            }
        };
        try {
            s = i.google.protobuf.Any.decode(o)
        } catch (t) {}
        return s && s.typeUrl && s.typeUrl.startsWith("type.googleapis.com/") && s.value ? c(s.value) : c(o)
    }
})), define("dropbox/proto/js_init_data/web_timing_logger/web_timing_logger", ["require", "exports", "tslib", "protobufjs/minimal"], (function(t, e, i, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r, o = (n = i.__importStar(n)).Reader,
        a = n.Writer,
        s = n.util,
        c = n.roots.default || (n.roots.default = {});
    e.default = c, e.web_timing_logger = c.web_timing_logger = ((r = c.web_timing_logger || {}).WebTimingLoggerServerContext = (function(t) {
        function t(t) {
            if (this.subtypes = {}, t)
                for (var e = Object.keys(t), i = 0; i < e.length; ++i) null != t[e[i]] && (this[e[i]] = t[e[i]])
        }
        var e, i;
        return t.prototype.isDws = !1, t.prototype.dwsOpts = null, t.prototype.sourceType = 0, t.prototype.subtypes = s.emptyObject, t.prototype.url = "", t.create = function(e) {
            return new t(e)
        }, t.encode = function(t, e) {
            if (e || (e = a.create()), null != t.isDws && Object.hasOwnProperty.call(t, "isDws") && e.uint32(8).bool(t.isDws), null != t.dwsOpts && Object.hasOwnProperty.call(t, "dwsOpts") && c.web_timing_logger.WebTimingLoggerServerContext.DWSOptions.encode(t.dwsOpts, e.uint32(18).fork()).ldelim(), null != t.sourceType && Object.hasOwnProperty.call(t, "sourceType") && e.uint32(24).int32(t.sourceType), null != t.subtypes && Object.hasOwnProperty.call(t, "subtypes"))
                for (var i = Object.keys(t.subtypes), n = 0; n < i.length; ++n) e.uint32(34).fork().uint32(10).string(i[n]).uint32(18).string(t.subtypes[i[n]]).ldelim();
            return null != t.url && Object.hasOwnProperty.call(t, "url") && e.uint32(42).string(t.url), e
        }, t.decode = function(t, e) {
            t instanceof o || (t = o.create(t));
            for (var i, n = void 0 === e ? t.len : t.pos + e, r = new c.web_timing_logger.WebTimingLoggerServerContext; t.pos < n;) {
                var a = t.uint32();
                switch (a >>> 3) {
                    case 1:
                        r.isDws = t.bool();
                        break;
                    case 2:
                        r.dwsOpts = c.web_timing_logger.WebTimingLoggerServerContext.DWSOptions.decode(t, t.uint32());
                        break;
                    case 3:
                        r.sourceType = t.int32();
                        break;
                    case 4:
                        t.skip().pos++, r.subtypes === s.emptyObject && (r.subtypes = {}), i = t.string(), t.pos++, r.subtypes[i] = t.string();
                        break;
                    case 5:
                        r.url = t.string();
                        break;
                    default:
                        t.skipType(7 & a)
                }
            }
            return r
        }, t.DWSOptions = (function(t) {
            function t(t) {
                if (t)
                    for (var e = Object.keys(t), i = 0; i < e.length; ++i) null != t[e[i]] && (this[e[i]] = t[e[i]])
            }
            return t.prototype.isDws2 = !1, t.prototype.isEarlyEnsemble = !1, t.prototype.jsPreloading = !1, t.create = function(e) {
                return new t(e)
            }, t.encode = function(t, e) {
                return e || (e = a.create()), null != t.isDws2 && Object.hasOwnProperty.call(t, "isDws2") && e.uint32(8).bool(t.isDws2), null != t.isEarlyEnsemble && Object.hasOwnProperty.call(t, "isEarlyEnsemble") && e.uint32(16).bool(t.isEarlyEnsemble), null != t.jsPreloading && Object.hasOwnProperty.call(t, "jsPreloading") && e.uint32(24).bool(t.jsPreloading), e
            }, t.decode = function(t, e) {
                t instanceof o || (t = o.create(t));
                for (var i = void 0 === e ? t.len : t.pos + e, n = new c.web_timing_logger.WebTimingLoggerServerContext.DWSOptions; t.pos < i;) {
                    var r = t.uint32();
                    switch (r >>> 3) {
                        case 1:
                            n.isDws2 = t.bool();
                            break;
                        case 2:
                            n.isEarlyEnsemble = t.bool();
                            break;
                        case 3:
                            n.jsPreloading = t.bool();
                            break;
                        default:
                            t.skipType(7 & r)
                    }
                }
                return n
            }, t
        })(t.DWSOptions || {}), t.SourceType = (e = {}, (i = Object.create(e))[e[0] = "UNKNOWN"] = 0, i[e[1] = "DESKTOP_WEB"] = 1, i[e[2] = "MOBILE_WEB"] = 2, i), t
    })(r.WebTimingLoggerServerContext || {}), r)
}));
//# sourceMappingURL=pkg-timing.min.js-vflFUG639.map