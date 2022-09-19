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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyImgFactory = exports.ImagesNameEnum = void 0;
var requestBuilder_1 = require("../builder/requestBuilder");
var requestCommand_1 = require("../command/requestCommand");
var ImagesNameEnum;
(function (ImagesNameEnum) {
    ImagesNameEnum["webp"] = "image/webp";
    ImagesNameEnum["jpeg"] = "image/jpeg";
    ImagesNameEnum["png"] = "image/png";
    ImagesNameEnum["jpg"] = "image/jpg";
    ImagesNameEnum["jfif"] = "image/jfif";
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
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        }).build().toResult();
        this.requestClinet = new requestCommand_1.RequestClient();
        this.submitCommand = new requestCommand_1.SubmitCommand(this.requestClinet);
        this.downloadCommand = new requestCommand_1.DownloadCommand(this.requestClinet);
    }
    Img.prototype.handle = function () {
        // TODO 调用那两个命令来进行图片的压缩和下载
    };
    return Img;
}());
var img = new Img();
// 给这个工厂添加产品
TinyImgFactory
    .addTinyImg(ImagesNameEnum.webp, img)
    .addTinyImg(ImagesNameEnum.jpeg, img)
    .addTinyImg(ImagesNameEnum.png, img)
    .addTinyImg(ImagesNameEnum.jpg, img)
    .addTinyImg(ImagesNameEnum.jfif, img);
