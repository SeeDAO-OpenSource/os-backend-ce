"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * SeeDao-OS-API
 * SeeDao-OS-API description
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.InfraToolsApi = exports.InfraToolsApiFactory = exports.InfraToolsApiFp = exports.InfraToolsApiAxiosParamCreator = void 0;
var axios_1 = require("axios");
// Some imports not used depending on template conditions
// @ts-ignore
var common_1 = require("../common");
// @ts-ignore
var base_1 = require("../base");
/**
 * InfraToolsApi - axios parameter creator
 * @export
 */
var InfraToolsApiAxiosParamCreator = function (configuration) {
    var _this = this;
    return {
        /**
         *
         * @param {ToolCreateInput} toolCreateInput
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerCreate: function (toolCreateInput, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    // verify required parameter 'toolCreateInput' is not null or undefined
                    (0, common_1.assertParamExists)('toolControllerCreate', 'toolCreateInput', toolCreateInput);
                    localVarPath = "/infra-tools";
                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    if (configuration) {
                        baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = __assign(__assign({ method: 'POST' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};
                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                    localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(toolCreateInput, localVarRequestOptions, configuration);
                    return [2 /*return*/, {
                            url: (0, common_1.toPathString)(localVarUrlObj),
                            options: localVarRequestOptions,
                        }];
                });
            });
        },
        /**
         *
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerDelete: function (id, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    // verify required parameter 'id' is not null or undefined
                    (0, common_1.assertParamExists)('toolControllerDelete', 'id', id);
                    localVarPath = "/infra-tools/{id}"
                        .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    if (configuration) {
                        baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = __assign(__assign({ method: 'DELETE' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};
                    (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                    localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return [2 /*return*/, {
                            url: (0, common_1.toPathString)(localVarUrlObj),
                            options: localVarRequestOptions,
                        }];
                });
            });
        },
        /**
         *
         * @param {string} page
         * @param {number} [limit]
         * @param {boolean} [includeTotal]
         * @param {string} [order]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerGetList: function (page, limit, includeTotal, order, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    // verify required parameter 'page' is not null or undefined
                    (0, common_1.assertParamExists)('toolControllerGetList', 'page', page);
                    localVarPath = "/infra-tools";
                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    if (configuration) {
                        baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = __assign(__assign({ method: 'GET' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};
                    if (page !== undefined) {
                        localVarQueryParameter['page'] = page;
                    }
                    if (limit !== undefined) {
                        localVarQueryParameter['limit'] = limit;
                    }
                    if (includeTotal !== undefined) {
                        localVarQueryParameter['includeTotal'] = includeTotal;
                    }
                    if (order !== undefined) {
                        localVarQueryParameter['order'] = order;
                    }
                    (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                    localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    return [2 /*return*/, {
                            url: (0, common_1.toPathString)(localVarUrlObj),
                            options: localVarRequestOptions,
                        }];
                });
            });
        },
        /**
         *
         * @param {string} id
         * @param {ToolUpdateInput} toolUpdateInput
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerUpdate: function (id, toolUpdateInput, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var localVarPath, localVarUrlObj, baseOptions, localVarRequestOptions, localVarHeaderParameter, localVarQueryParameter, headersFromBaseOptions;
                return __generator(this, function (_a) {
                    // verify required parameter 'id' is not null or undefined
                    (0, common_1.assertParamExists)('toolControllerUpdate', 'id', id);
                    // verify required parameter 'toolUpdateInput' is not null or undefined
                    (0, common_1.assertParamExists)('toolControllerUpdate', 'toolUpdateInput', toolUpdateInput);
                    localVarPath = "/infra-tools/{id}"
                        .replace("{".concat("id", "}"), encodeURIComponent(String(id)));
                    localVarUrlObj = new URL(localVarPath, common_1.DUMMY_BASE_URL);
                    if (configuration) {
                        baseOptions = configuration.baseOptions;
                    }
                    localVarRequestOptions = __assign(__assign({ method: 'PUT' }, baseOptions), options);
                    localVarHeaderParameter = {};
                    localVarQueryParameter = {};
                    localVarHeaderParameter['Content-Type'] = 'application/json';
                    (0, common_1.setSearchParams)(localVarUrlObj, localVarQueryParameter);
                    headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
                    localVarRequestOptions.headers = __assign(__assign(__assign({}, localVarHeaderParameter), headersFromBaseOptions), options.headers);
                    localVarRequestOptions.data = (0, common_1.serializeDataIfNeeded)(toolUpdateInput, localVarRequestOptions, configuration);
                    return [2 /*return*/, {
                            url: (0, common_1.toPathString)(localVarUrlObj),
                            options: localVarRequestOptions,
                        }];
                });
            });
        },
    };
};
exports.InfraToolsApiAxiosParamCreator = InfraToolsApiAxiosParamCreator;
/**
 * InfraToolsApi - functional programming interface
 * @export
 */
var InfraToolsApiFp = function (configuration) {
    var localVarAxiosParamCreator = (0, exports.InfraToolsApiAxiosParamCreator)(configuration);
    return {
        /**
         *
         * @param {ToolCreateInput} toolCreateInput
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerCreate: function (toolCreateInput, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.toolControllerCreate(toolCreateInput, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerDelete: function (id, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.toolControllerDelete(id, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {string} page
         * @param {number} [limit]
         * @param {boolean} [includeTotal]
         * @param {string} [order]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerGetList: function (page, limit, includeTotal, order, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.toolControllerGetList(page, limit, includeTotal, order, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
        /**
         *
         * @param {string} id
         * @param {ToolUpdateInput} toolUpdateInput
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerUpdate: function (id, toolUpdateInput, options) {
            return __awaiter(this, void 0, void 0, function () {
                var localVarAxiosArgs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, localVarAxiosParamCreator.toolControllerUpdate(id, toolUpdateInput, options)];
                        case 1:
                            localVarAxiosArgs = _a.sent();
                            return [2 /*return*/, (0, common_1.createRequestFunction)(localVarAxiosArgs, axios_1.default, base_1.BASE_PATH, configuration)];
                    }
                });
            });
        },
    };
};
exports.InfraToolsApiFp = InfraToolsApiFp;
/**
 * InfraToolsApi - factory interface
 * @export
 */
var InfraToolsApiFactory = function (configuration, basePath, axios) {
    var localVarFp = (0, exports.InfraToolsApiFp)(configuration);
    return {
        /**
         *
         * @param {ToolCreateInput} toolCreateInput
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerCreate: function (toolCreateInput, options) {
            return localVarFp.toolControllerCreate(toolCreateInput, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {string} id
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerDelete: function (id, options) {
            return localVarFp.toolControllerDelete(id, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {string} page
         * @param {number} [limit]
         * @param {boolean} [includeTotal]
         * @param {string} [order]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerGetList: function (page, limit, includeTotal, order, options) {
            return localVarFp.toolControllerGetList(page, limit, includeTotal, order, options).then(function (request) { return request(axios, basePath); });
        },
        /**
         *
         * @param {string} id
         * @param {ToolUpdateInput} toolUpdateInput
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        toolControllerUpdate: function (id, toolUpdateInput, options) {
            return localVarFp.toolControllerUpdate(id, toolUpdateInput, options).then(function (request) { return request(axios, basePath); });
        },
    };
};
exports.InfraToolsApiFactory = InfraToolsApiFactory;
/**
 * InfraToolsApi - object-oriented interface
 * @export
 * @class InfraToolsApi
 * @extends {BaseAPI}
 */
var InfraToolsApi = /** @class */ (function (_super) {
    __extends(InfraToolsApi, _super);
    function InfraToolsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param {ToolCreateInput} toolCreateInput
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InfraToolsApi
     */
    InfraToolsApi.prototype.toolControllerCreate = function (toolCreateInput, options) {
        var _this = this;
        return (0, exports.InfraToolsApiFp)(this.configuration).toolControllerCreate(toolCreateInput, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {string} id
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InfraToolsApi
     */
    InfraToolsApi.prototype.toolControllerDelete = function (id, options) {
        var _this = this;
        return (0, exports.InfraToolsApiFp)(this.configuration).toolControllerDelete(id, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {string} page
     * @param {number} [limit]
     * @param {boolean} [includeTotal]
     * @param {string} [order]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InfraToolsApi
     */
    InfraToolsApi.prototype.toolControllerGetList = function (page, limit, includeTotal, order, options) {
        var _this = this;
        return (0, exports.InfraToolsApiFp)(this.configuration).toolControllerGetList(page, limit, includeTotal, order, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    /**
     *
     * @param {string} id
     * @param {ToolUpdateInput} toolUpdateInput
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InfraToolsApi
     */
    InfraToolsApi.prototype.toolControllerUpdate = function (id, toolUpdateInput, options) {
        var _this = this;
        return (0, exports.InfraToolsApiFp)(this.configuration).toolControllerUpdate(id, toolUpdateInput, options).then(function (request) { return request(_this.axios, _this.basePath); });
    };
    return InfraToolsApi;
}(base_1.BaseAPI));
exports.InfraToolsApi = InfraToolsApi;
