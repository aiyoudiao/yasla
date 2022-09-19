"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgCompress = void 0;
/*
 * File: CompressProxy.ts                                                           *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 00:07:14                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 00:07:14                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
var tinyImgFactory_1 = require("../common/factory/tinyImgFactory");
// 代理了图片处理的工厂，只对外暴露这么一个压缩的功能
var ImgCompress = /** @class */ (function () {
    function ImgCompress() {
    }
    ImgCompress.prototype.compress = function (key) {
        var img = tinyImgFactory_1.TinyImgFactory.getTinyImg(key);
        img === null || img === void 0 ? void 0 : img.handle();
    };
    return ImgCompress;
}());
exports.ImgCompress = ImgCompress;
