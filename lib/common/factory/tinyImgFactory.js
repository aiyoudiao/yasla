"use strict";
/*
 * File: TinyImgFactory.ts                                                     *
 * Project: yasla                                                              *
 * Created Date: 2022-09-18 23:39:04                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 23:39:04                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
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
exports.TinyImgFactory = exports.ImagesNameEnum = void 0;
var path_1 = __importDefault(require("path"));
var requestBuilder_1 = require("../builder/requestBuilder");
var requestCommand_1 = require("../command/requestCommand");
var utils_1 = require("../utils");
var ImagesNameEnum;
(function (ImagesNameEnum) {
    ImagesNameEnum["image/webp"] = "image/webp";
    ImagesNameEnum["image/jpeg"] = "image/jpeg";
    ImagesNameEnum["image/png"] = "image/png";
    ImagesNameEnum["image/jpg"] = "image/jpg";
    ImagesNameEnum["image/jfif"] = "image/jfif";
})(ImagesNameEnum = exports.ImagesNameEnum || (exports.ImagesNameEnum = {}));
var TinyImgFactory = /** @class */ (function () {
    function TinyImgFactory() {
    }
    TinyImgFactory.addTinyImg = function (key, value) {
        this.map.set(key, value);
        return this;
    };
    TinyImgFactory.getTinyImg = function (key) {
        return this.map.get(key);
    };
    TinyImgFactory.map = new Map();
    return TinyImgFactory;
}());
exports.TinyImgFactory = TinyImgFactory;
var Img = /** @class */ (function () {
    function Img() {
        var imgBuilder = new requestBuilder_1.RequestBuiler();
        this.option = imgBuilder
            .setHostName('tinypng.com')
            .setPort(443)
            .setPath('/web/shrink')
            .setMethod('POST')
            .setHeaders({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        })
            .build()
            .toResult();
        this.requestClinet = new requestCommand_1.RequestClient();
        this.submitCommand = new requestCommand_1.SubmitCommand(this.requestClinet);
        this.downloadCommand = new requestCommand_1.DownloadCommand(this.requestClinet);
    }
    Img.prototype.handle = function (filePath, outputPath) {
        return __awaiter(this, void 0, void 0, function () {
            var result, url, filename, newFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.submitCommand.handle(this.option, filePath)
                        // console.log('log:result', result)
                    ];
                    case 1:
                        result = _a.sent();
                        url = result.output.url;
                        filename = path_1.default.relative(path_1.default.dirname(filePath), filePath);
                        newFile = path_1.default.join(outputPath, filename);
                        (0, utils_1.mkdir)(newFile);
                        return [4 /*yield*/, this.downloadCommand.handle(url, newFile)
                            // TODO 暂时不做多余的处理
                        ];
                    case 2: return [2 /*return*/, _a.sent()
                        // TODO 暂时不做多余的处理
                    ];
                }
            });
        });
    };
    return Img;
}());
var img = new Img();
// 给这个工厂添加产品
TinyImgFactory.addTinyImg(ImagesNameEnum['image/webp'], img)
    .addTinyImg(ImagesNameEnum['image/jpeg'], img)
    .addTinyImg(ImagesNameEnum['image/png'], img)
    .addTinyImg(ImagesNameEnum['image/jpg'], img)
    .addTinyImg(ImagesNameEnum['image/jfif'], img);
