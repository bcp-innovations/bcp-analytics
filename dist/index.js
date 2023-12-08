"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var segment_1 = require("./clients/segment");
var default_1 = /** @class */ (function () {
    function default_1(config) {
        var _this = this;
        this.config = {
            optOut: false,
            debug: false,
            trackPages: true,
            trackCopies: true,
        };
        this.getUserId = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, ""];
        }); }); };
        this.clients = {};
        if (typeof window === "undefined" || typeof document === "undefined") {
            throw new Error("must be installed in a browser");
        }
        if (config) {
            this.config = __assign(__assign({}, this.config), config);
        }
    }
    default_1.prototype.start = function () {
        if (this.config.optOut) {
            return this;
        }
        if (this.config.trackPages) {
            this.startPageListener();
        }
        if (this.config.trackPages) {
            this.startCopyListener();
        }
        return this;
    };
    default_1.prototype.setGetUserId = function (method) {
        this.getUserId = method;
        return this;
    };
    default_1.prototype.registerSegment = function (config) {
        this.clients[segment_1.Segment.CLIENT_KEY] = new segment_1.Segment(config);
        if (this.config.debug) {
            console.log("segment registered");
        }
        return this;
    };
    default_1.prototype.unregisterSegment = function () {
        delete this.clients[segment_1.Segment.CLIENT_KEY];
        if (this.config.debug) {
            console.log("segment unregistered");
        }
    };
    default_1.prototype.optIn = function () {
        this.config.optOut = false;
        if (this.config.debug) {
            console.log("opt in");
        }
    };
    default_1.prototype.optOut = function () {
        this.config.optOut = true;
        if (this.config.debug) {
            console.log("opt out");
        }
    };
    default_1.prototype.identifyUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId_1, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.optOut) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getUserId()];
                    case 2:
                        userId_1 = _a.sent();
                        Object.keys(this.clients).forEach(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var err_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this.config.debug) {
                                            console.log("identify user ".concat(userId_1, " in ").concat(key));
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this.clients[key].identifyUser(userId_1)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_2 = _a.sent();
                                        console.error("failed to identify user in client", key, err_2);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("failed to identify", err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.trackPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId_2, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.optOut) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getUserId()];
                    case 2:
                        userId_2 = _a.sent();
                        Object.keys(this.clients).forEach(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var err_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this.config.debug) {
                                            console.log("track page with user ".concat(userId_2, " in ").concat(key));
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this.clients[key].trackPageEvent(userId_2)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_4 = _a.sent();
                                        console.error("failed to track page in client", key, err_4);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        console.error("failed to track page", err_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.trackCopy = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var userId_3, err_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.optOut) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getUserId()];
                    case 2:
                        userId_3 = _a.sent();
                        Object.keys(this.clients).forEach(function (key) { return __awaiter(_this, void 0, void 0, function () {
                            var err_6;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (this.config.debug) {
                                            console.log("track copy with user ".concat(userId_3, " and content \"").concat(content, "\" in ").concat(key));
                                        }
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this.clients[key].trackCopyEvent(userId_3, content)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_6 = _a.sent();
                                        console.error("failed to track copy in client", key, err_6);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        console.error("failed to track copy", err_5);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.startPageListener = function () {
        var _this = this;
        this.trackPage();
        var observeUrlChange = function () {
            var oldHref = document.location.href;
            var body = document.querySelector("body");
            var observer = new MutationObserver(function () {
                if (oldHref !== document.location.href) {
                    oldHref = document.location.href;
                    _this.trackPage();
                }
            });
            if (body) {
                observer.observe(body, { childList: true, subtree: true });
            }
        };
        window.onload = observeUrlChange;
        if (this.config.debug) {
            console.log("page listener started");
        }
    };
    default_1.prototype.startCopyListener = function () {
        var _this = this;
        document.body.addEventListener("copy", function () {
            var selection = document.getSelection();
            if (selection) {
                _this.trackCopy(selection.toString());
            }
        });
        if (this.config.debug) {
            console.log("copy listener started");
        }
    };
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=index.js.map