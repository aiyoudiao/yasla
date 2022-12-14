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
import ImgVisitor from './visitor/imgVisitor'
import type { IYaslaContext } from '.'

const list = [
  ImgVisitor,
]

export default function visitStart(context: IYaslaContext) {
  list.forEach((Visitor) => {
    new Visitor(context).accept()
  })
}
