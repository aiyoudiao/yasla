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
exports.getDirname = exports.mkdir = exports.createFilterByExt = exports.getFiles = exports.getFilesByGlob = void 0;
/*
 * File: index.ts                                                              *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 13:02:55                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 13:02:55                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var fast_glob_1 = __importDefault(require("fast-glob"));
function getFilesByGlob(inputPath) {
    return __awaiter(this, void 0, void 0, function () {
        var patternFilePath, entries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    patternFilePath = [
                        "".concat(path_1.default.join(process.cwd(), inputPath, '/**/*.*')).replace(/\\/g, '/'),
                    ];
                    return [4 /*yield*/, (0, fast_glob_1.default)(patternFilePath, { dot: true })];
                case 1:
                    entries = _a.sent();
                    return [2 /*return*/, entries];
            }
        });
    });
}
exports.getFilesByGlob = getFilesByGlob;
function getFiles(dir, deep) {
    if (deep === void 0) { deep = false; }
    var output = [];
    function findFiles(dir, deep) {
        if (fs_1.default.statSync(dir).isFile()) {
            output.push(dir);
        }
        else {
            if (deep === false)
                return;
            var files = fs_1.default.readdirSync(dir);
            files.forEach(function (file) {
                findFiles(path_1.default.join(dir, file), deep);
            });
        }
    }
    if (fs_1.default.existsSync(dir)) {
        if (fs_1.default.statSync(dir).isFile()) {
            output.push(dir);
        }
        else {
            var files = fs_1.default.readdirSync(dir);
            files.forEach(function (file) {
                findFiles(path_1.default.join(dir, file), deep);
            });
        }
    }
    return output;
}
exports.getFiles = getFiles;
function createFilterByExt(ext) {
    var exts = ext.split(',');
    return function (file) { return exts.includes(path_1.default.extname(file)); };
}
exports.createFilterByExt = createFilterByExt;
var dirCache = new Set();
function mkdir(dir) {
    if (dirCache.has(dir))
        return;
    dirCache.add(dir);
    var base = '.';
    getDirname(dir)
        .split('/')
        .forEach(function (dir) {
        base = path_1.default.join(base, dir);
        if (!fs_1.default.existsSync(base))
            fs_1.default.mkdirSync(base);
    });
}
exports.mkdir = mkdir;
function getDirname(filename) {
    return path_1.default.dirname(filename);
}
exports.getDirname = getDirname;
