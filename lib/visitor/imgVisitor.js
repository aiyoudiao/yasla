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
Object.defineProperty(exports, "__esModule", { value: true });
var baseVisitor_1 = require("./baseVisitor");
var imgVisitor = /** @class */ (function (_super) {
    __extends(imgVisitor, _super);
    function imgVisitor(context) {
        return _super.call(this, context) || this;
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
        if (!inputPath || !outputPath) {
            return;
        }
        this.executing = true;
        // TODO 直接了当，yasla img inputPath outputPath
        // 调用工厂函数中的功能来进行压缩，同时也要带有监听的效果，如果是一次性的话，那就不用监听
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
                console.log('param', param);
                if (!isConfirm) {
                    console.log('路径不对，重新开始');
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
                validate: function () { return true; }
            },
            {
                type: 'input',
                message: '压缩后的图片存放目录(没有就自动创建)',
                name: 'outputPath',
                validate: function () { return true; }
            },
            // TODO 是否需要一直监听该目录？
            // {},
            {
                type: 'confirm',
                message: '请检查文件路径和输出的目录是否正确？',
                name: 'isConfirm'
            },
        ];
        return this.inquirer.prompt(config);
    };
    return imgVisitor;
}(baseVisitor_1.BasicVisitor));
exports.default = imgVisitor;
