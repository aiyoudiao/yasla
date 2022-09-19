"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicVisitor = void 0;
var BasicVisitor = /** @class */ (function () {
    function BasicVisitor(context) {
        this.context = context;
        this.program = context.program;
        this.chalk = context.chalk;
        // this.boxen = context.boxen;
        this.inquirer = context.inquirer;
        this.chokidar = context.chokidar;
        this.version = context.version;
        this.out = context.out;
        this.loading = context.loading;
        this.executing = false;
    }
    return BasicVisitor;
}());
exports.BasicVisitor = BasicVisitor;
