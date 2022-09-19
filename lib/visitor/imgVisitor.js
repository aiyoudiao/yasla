"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * File: imgVisitor.ts                                                         *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 00:37:51                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 00:37:51                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
var node_path_1 = __importDefault(require("node:path"));
var node_process_1 = require("node:process");
var listr_1 = __importDefault(require("listr"));
var file_type_1 = require("file-type");
var CompressProxy_1 = require("../proxy/CompressProxy");
var tinyImgFactory_1 = require("../common/factory/tinyImgFactory");
var utils_1 = require("../common/utils");
var baseVisitor_1 = require("./baseVisitor");
var taskList = new listr_1.default([], { concurrent: true });
var imgVisitor = /** @class */ (function (_super) {
    __extends(imgVisitor, _super);
    function imgVisitor(context) {
        var _this = _super.call(this, context) || this;
        _this.imgCompress = new CompressProxy_1.ImgCompress();
        _this.watchHandleTimer = undefined;
        return _this;
    }
    imgVisitor.prototype.accept = function () {
        this.program
            .command('img [inputPath] [outputPath]') /* 定义子命令 */
            .alias('tu') /* 子命令缩写 */
            .description('压缩图片 当前图片所在目录 压缩后的图片存放目录') /* 描述 */
            .option('-o, --once', '添加这个参数后，只会进行一次压缩') /* 附加参数 */
            .action(this.actionHandler.bind(this)); /* 回调函数 */
        this.bindEvent();
    };
    imgVisitor.prototype.actionHandler = function (inputPath, outputPath) {
        return __awaiter(this, void 0, void 0, function () {
            var once;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!inputPath || !outputPath)
                            return [2 /*return*/];
                        this.executing = true;
                        once = this.program.opts().once;
                        if (!once) return [3 /*break*/, 2];
                        // 一次性的压缩
                        return [4 /*yield*/, this.batchCompressHandler(inputPath, outputPath)];
                    case 1:
                        // 一次性的压缩
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        // 带监听的压缩
                        this.chokidar.watch(node_path_1.default.resolve((0, node_process_1.cwd)(), inputPath)).on('all', this.compressHandler.bind(this, outputPath));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    imgVisitor.prototype.batchCompressHandler = function (inputPath, outputPath) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, utils_1.getFilesByGlob)(inputPath)];
                    case 1:
                        files = _a.sent();
                        files.filter(function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, mime, keyName;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (0, file_type_1.fromFile)(filePath)];
                                    case 1:
                                        _a = ((_b.sent()) || {}).mime, mime = _a === void 0 ? '' : _a;
                                        keyName = mime;
                                        return [2 /*return*/, Boolean(tinyImgFactory_1.ImagesNameEnum[keyName])];
                                }
                            });
                        }); })
                            // .forEach(async (filePath) => await this.singlecompressHandler(filePath, outputPath))
                            .forEach(function (filePath) { return taskList.add(_this.createTask(filePath, outputPath)); });
                        // const taskList = new Listr(files.map(filePath => this.createTask(filePath, outputPath)));
                        taskList.run();
                        return [2 /*return*/];
                }
            });
        });
    };
    imgVisitor.prototype.compressHandler = function (outputPath, event, pathDir) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.watchHandleTimer)
                    clearTimeout(this.watchHandleTimer);
                // TODO 根据不同的事件来做相应的处理
                // console.log('event', event)
                // console.log('pathDir', pathDir)
                if (event === 'add')
                    taskList.add(this.createTask(pathDir, outputPath));
                this.watchHandleTimer = setTimeout(function () {
                    taskList.run();
                    taskList = new listr_1.default([], { concurrent: true });
                }, 1500);
                return [2 /*return*/];
            });
        });
    };
    imgVisitor.prototype.singlecompressHandler = function (filePath, outputPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, mime;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, file_type_1.fromFile)(filePath)];
                    case 1:
                        _a = ((_b.sent()) || {}).mime, mime = _a === void 0 ? '' : _a;
                        return [4 /*yield*/, this.imgCompress.compress(mime, filePath, outputPath)];
                    case 2: 
                    // console.log('log:singlecompressHandler', mime)
                    // 获取文件后缀名以及文件类型
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    imgVisitor.prototype.createTask = function (filePath, outputPath) {
        var _this = this;
        return {
            title: filePath,
            task: function (ctx, task) { return __awaiter(_this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            task.title = "compress ".concat(filePath);
                            return [4 /*yield*/, this.singlecompressHandler(filePath, outputPath)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_1 = _a.sent();
                            task.title = "error ".concat(task.title);
                            return [2 /*return*/, Promise.reject(new Error((error_1 === null || error_1 === void 0 ? void 0 : error_1.message) || '未知错误'))];
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
        };
    };
    imgVisitor.prototype.bindEvent = function () {
        this.program.on('command:img', this.interactiveEventHandler.bind(this));
        this.program.on('command:tu', this.interactiveEventHandler.bind(this));
    };
    imgVisitor.prototype.interactiveEventHandler = function () {
        var _this = this;
        // TODO 带有交互性的来告诉你要对哪个目录进行监听和处理，会询问你inputPath 和 outputPath，都正确的话，才会处理
        setTimeout(function () {
            if (_this.executing)
                return;
            _this.inquirerHandler().then(function (param) {
                var filePath = param.filePath, dirPath = param.dirPath, isConfirm = param.isConfirm;
                // console.log('param', param)
                if (!isConfirm) {
                    // console.log('路径不对，重新开始')
                    return;
                }
                _this.actionHandler(filePath, dirPath);
            })
                .catch(function (err) {
                console.log(err);
            });
        }, 1000);
    };
    imgVisitor.prototype.inquirerHandler = function () {
        var config = [
            {
                type: 'input',
                message: '当前待压缩图片所在的目录(必须正确)',
                name: 'inputPath',
                validate: function () { return true; },
            },
            {
                type: 'input',
                message: '压缩后的图片存放目录(没有就自动创建)',
                name: 'outputPath',
                validate: function () { return true; },
            },
            // TODO 是否需要一直监听该目录？
            // {},
            {
                type: 'confirm',
                message: '请检查文件路径和输出的目录是否正确？',
                name: 'isConfirm',
            },
        ];
        return this.inquirer.prompt(config);
    };
    return imgVisitor;
}(baseVisitor_1.BasicVisitor));
exports.default = imgVisitor;
