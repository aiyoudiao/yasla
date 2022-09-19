"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadCommand = exports.SubmitCommand = exports.RequestClient = void 0;
/*
 * File: requestCommand.ts                                                     *
 * Project: yasla                                                              *
 * Created Date: 2022-09-18 22:46:35                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 22:46:35                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
var node_fs_1 = __importDefault(require("node:fs"));
var node_https_1 = __importDefault(require("node:https"));
var RequestClient = /** @class */ (function () {
    function RequestClient() {
    }
    RequestClient.prototype.submit = function (option, filePath) {
        return new Promise(function (resolve, reject) {
            node_fs_1.default.createReadStream(filePath).pipe(node_https_1.default.request(option, function (res) {
                var response = '';
                res.on('data', function (data) {
                    response += data;
                });
                res.on('end', function () {
                    try {
                        var data = JSON.parse(response);
                        resolve(data);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            }));
        });
    };
    RequestClient.prototype.download = function (url, output) {
        return new Promise(function (resolve) {
            node_https_1.default.get(url, function (res) {
                res.pipe(node_fs_1.default.createWriteStream(output));
                res.on('end', function () {
                    resolve(output);
                });
            });
        });
    };
    return RequestClient;
}());
exports.RequestClient = RequestClient;
var SubmitCommand = /** @class */ (function () {
    function SubmitCommand(requestClient) {
        this.requestClient = requestClient;
    }
    SubmitCommand.prototype.handle = function (option, filePath) {
        return this.requestClient.submit(option, filePath);
    };
    return SubmitCommand;
}());
exports.SubmitCommand = SubmitCommand;
var DownloadCommand = /** @class */ (function () {
    function DownloadCommand(requestClient) {
        this.requestClient = requestClient;
    }
    DownloadCommand.prototype.handle = function (url, output) {
        return this.requestClient.download(url, output);
    };
    return DownloadCommand;
}());
exports.DownloadCommand = DownloadCommand;
