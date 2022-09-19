/*
 * File: baseVisitor.ts                                                        *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 00:39:17                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 00:39:18                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
import type { IYaslaContext } from '..'
export interface IVisitor extends IYaslaContext {
  context: any
  executing: boolean
}

export class BasicVisitor implements IVisitor {
  context: any
  program: any
  chalk: any
  // boxen: any;
  inquirer: any
  version: any
  out: any
  loading: any
  executing: boolean

  constructor(context: IYaslaContext) {
    this.context = context
    this.program = context.program
    this.chalk = context.chalk
    // this.boxen = context.boxen;
    this.inquirer = context.inquirer
    this.version = context.version
    this.out = context.out
    this.loading = context.loading
    this.executing = false
  }
}
