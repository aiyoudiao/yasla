"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * File: supervisor.ts                                                         *
 * Project: yasla                                                              *
 * Created Date: 2022-09-18 20:55:10                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 20:55:10                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
var imgVisitor_1 = __importDefault(require("./visitor/imgVisitor"));
var list = [
    imgVisitor_1.default,
];
function visitStart(context) {
    list.forEach(function (Visitor) {
        new Visitor(context).accept();
    });
}
exports.default = visitStart;
