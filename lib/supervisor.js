"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var imgVisitor_1 = __importDefault(require("./visitor/imgVisitor"));
var list = [
    imgVisitor_1.default
];
function visitStart(context) {
    list.forEach(function (Visitor) {
        new Visitor(context).accept();
    });
}
exports.default = visitStart;
