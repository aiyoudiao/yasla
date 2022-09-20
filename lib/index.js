"use strict";
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
 * File: index.ts                                                              *
 * Project: yasla                                                              *
 * Created Date: 2022-09-17 23:51:40                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 00:04:05                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                            *
 * --------------------------------------------------------------------------- *
 */
var path_1 = __importDefault(require("path"));
var process_1 = require("process");
// import fs from 'fs'
var commander_1 = require("commander");
var pkg_types_1 = require("pkg-types");
var package_json_1 = __importDefault(require("package-json"));
var semver_1 = __importDefault(require("semver"));
var chalk_1 = __importDefault(require("chalk"));
var inquirer_1 = __importDefault(require("inquirer"));
var chokidar_1 = __importDefault(require("chokidar"));
var supervisor_1 = __importDefault(require("./supervisor"));
// import boxen from 'boxen'
// import fse from 'fs-extra'
// import fg from 'fast-glob'
// import { fileTypeFromFile } from 'file-type'
// import figlet from 'figlet'
var program = new commander_1.Command();
var currentPkgFilePath = path_1.default.resolve((0, process_1.cwd)(), './package.json');
var Yasla = /** @class */ (function () {
    function Yasla() {
        this.program = program;
        this.chalk = chalk_1.default;
        // this.boxen = boxen
        this.inquirer = inquirer_1.default;
        this.chokidar = chokidar_1.default;
        // const log = global.console.log
        // global.console.log = function (...list) {
        //   // log(...list)
        // }
    }
    Yasla.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, (0, pkg_types_1.readPackageJSON)(currentPkgFilePath)];
                    case 1:
                        _a.localPkg = _c.sent();
                        _b = this;
                        return [4 /*yield*/, (0, package_json_1.default)(this.localPkg.name)];
                    case 2:
                        _b.onlinePkg = _c.sent();
                        return [4 /*yield*/, this.checkVersion()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.initCommand()];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.parseInputParam()];
                    case 5:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Yasla.prototype.parseInputParam = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                program.parse(process.argv);
                return [2 /*return*/];
            });
        });
    };
    Yasla.prototype.checkVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, localPkg, onlinePkg, version;
            return __generator(this, function (_b) {
                try {
                    _a = this, localPkg = _a.localPkg, onlinePkg = _a.onlinePkg;
                    version = onlinePkg.version;
                    if (localPkg.version && version && semver_1.default.lt(localPkg.version, version))
                        console.log(chalk_1.default.bgRed("Please update the version to yasla@".concat(version)));
                }
                catch (error) { }
                return [2 /*return*/];
            });
        });
    };
    Yasla.prototype.initCommand = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.initHelp()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.initUsage()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.initVersion()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.initCommandVisitor()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Yasla.prototype.initEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                program.on('command:*', function () {
                    console.error('请检查命令: %s 有效性\n使用 --help 查看所有的有效命令。', program.args.join(' '));
                    process.exit(1);
                });
                return [2 /*return*/];
            });
        });
    };
    Yasla.prototype.initHelp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, version;
            return __generator(this, function (_b) {
                _a = this.localPkg, name = _a.name, version = _a.version;
                program.option('-o, --once', '添加这个参数后，只会进行一次压缩');
                program.helpOption('-h, --help', "\u663E\u793A".concat(name, "@").concat(version, "\u7684\u5E2E\u52A9\u6587\u6863"));
                program.on('--help', function () {
                    // console.log ('调用了--help');
                });
                return [2 /*return*/];
            });
        });
    };
    Yasla.prototype.initUsage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                name = this.localPkg.name;
                program.name(name).usage('<command> [options]');
                return [2 /*return*/];
            });
        });
    };
    Yasla.prototype.initVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, version;
            return __generator(this, function (_b) {
                _a = this.localPkg, name = _a.name, version = _a.version;
                program.version("".concat(name, ":").concat(version), '-v, --version', "\u6253\u5370".concat(name, "\u7248\u672C\u53F7"));
                return [2 /*return*/];
            });
        });
    };
    Yasla.prototype.initCommandVisitor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, supervisor_1.default)(this);
                return [2 /*return*/];
            });
        });
    };
    return Yasla;
}());
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new Yasla().init()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
