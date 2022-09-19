"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Img = /** @class */ (function () {
    function Img() {
    }
    Img.prototype.compress = function () {
        throw new Error('Method not implemented.');
    };
    return Img;
}());
var Video = /** @class */ (function () {
    function Video() {
    }
    Video.prototype.compress = function () {
        throw new Error('Method not implemented.');
    };
    return Video;
}());
var Music = /** @class */ (function () {
    function Music() {
    }
    Music.prototype.compress = function () {
        throw new Error('Method not implemented.');
    };
    return Music;
}());
// 汇总功能
var CompressFacade = /** @class */ (function () {
    function CompressFacade() {
        this.img = new Img();
        this.video = new Video();
        this.music = new Music();
    }
    CompressFacade.prototype.compress = function (typeName) {
        if (typeName === 'img')
            this.img.compress();
        else if (typeName === 'video')
            this.video.compress();
        else if (typeName === 'music')
            this.music.compress();
        return this;
    };
    return CompressFacade;
}());
exports.default = CompressFacade;
