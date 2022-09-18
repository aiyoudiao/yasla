"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * File: vite.config.ts                                                        *
 * Project: yasla                                                              *
 * Created Date: 2022-09-17 23:19:52                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-17 23:19:53                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */
var config_1 = require("vitest/config");
// https://cn.vitest.dev/config/
exports.default = (0, config_1.defineConfig)({
    test: {
        exclude: __spreadArray(__spreadArray([], config_1.configDefaults.exclude, true), ['packages/template/*'], false),
    },
});
