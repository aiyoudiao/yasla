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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBuiler = exports.RequestOption = void 0;
var RequestOption = /** @class */ (function () {
    function RequestOption(hostname, port, path, method, headers) {
        this.hostname = '';
        this.port = '';
        this.path = '';
        this.method = '';
        this.headers = {};
        this.hostname = hostname;
        this.port = port;
        this.path = path;
        this.method = method;
        this.headers = headers;
    }
    RequestOption.prototype.toResult = function () {
        return {
            hostname: this.hostname,
            port: this.port,
            path: this.path,
            method: this.method,
            headers: this.headers,
        };
    };
    return RequestOption;
}());
exports.RequestOption = RequestOption;
var RequestBuiler = /** @class */ (function () {
    function RequestBuiler() {
        this.hostname = '';
        this.port = '';
        this.path = '';
        this.method = '';
        this.headers = {};
    }
    RequestBuiler.prototype.build = function () {
        // 只有所有步骤全部执行完毕才能创建出对象来
        if (this.hostname && this.port && this.path && this.method && this.headers)
            return new RequestOption(this.hostname, this.port, this.path, this.method, this.headers);
        throw new Error('build fail. hostname、port、path、method、headers is reqired.');
    };
    RequestBuiler.prototype.setHostName = function (hostname) {
        if (!hostname)
            throw new Error('hostname is reqired.');
        this.hostname = hostname;
        return this;
    };
    RequestBuiler.prototype.setPort = function (port) {
        if (!port)
            throw new Error('port is reqired.');
        this.port = port;
        return this;
    };
    RequestBuiler.prototype.setPath = function (path) {
        if (!path)
            throw new Error('path is reqired.');
        this.path = path;
        return this;
    };
    RequestBuiler.prototype.setMethod = function (method) {
        if (!method)
            throw new Error('method is reqired.');
        this.method = method;
        return this;
    };
    RequestBuiler.prototype.setHeaders = function (headers) {
        if (!headers)
            throw new Error('skill is reqired.');
        if (Array.isArray(headers)) {
            this.headers = __assign(__assign({}, this.headers), headers.reduce(function (prev, cur) { return (__assign(__assign({}, prev), cur)); }, {}));
        }
        else {
            this.headers = __assign(__assign({}, this.headers), headers);
        }
        return this;
    };
    return RequestBuiler;
}());
exports.RequestBuiler = RequestBuiler;
