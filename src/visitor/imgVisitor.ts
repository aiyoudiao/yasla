/*
 * File: imgVisitor.ts                                                         *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 00:37:51                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 00:37:51                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
import type { IYaslaContext } from '..'
import { BasicVisitor } from './baseVisitor'

export default class imgVisitor extends BasicVisitor {
  constructor(context: IYaslaContext) {
    super(context)
  }

  accept() {
    this.program
      .command('img [inputPath] [outputPath]') /* 定义子命令 */
      .alias('tu') /* 子命令缩写 */
      .description('压缩图片 当前图片所在目录 压缩后的图片存放目录') /* 描述 */
      .option('-o, --once', '添加这个参数后，只会进行一次压缩') /* 附加参数 */
      .action(this.actionHandler.bind(this)) /* 回调函数 */

    this.bindEvent()
  }

  actionHandler(inputPath: string, outputPath: string) {
    if (!inputPath || !outputPath)
      return

    this.executing = true

    // TODO 直接了当，yasla img inputPath outputPath
    // 调用工厂函数中的功能来进行压缩，同时也要带有监听的效果，如果是一次性的话，那就不用监听
  }

  bindEvent() {
    this.program.on('command:img', this.interactiveEventHandler.bind(this))
    this.program.on('command:tu', this.interactiveEventHandler.bind(this))
  }

  interactiveEventHandler() {
    // TODO 带有交互性的来告诉你要对哪个目录进行监听和处理，会询问你inputPath 和 outputPath，都正确的话，才会处理
    setTimeout(() => {
      if (this.executing)
        return

      this.inquirerHandler().then((param: { filePath: string; dirPath: string; isConfirm: boolean }) => {
        const { filePath, dirPath, isConfirm } = param

        console.log('param', param)
        if (!isConfirm) {
          console.log('路径不对，重新开始')
          return
        }

        this.actionHandler(filePath, dirPath)
      })
        .catch((err: Error) => {
          console.log(err)
        })
    }, 1000)
  }

  inquirerHandler() {
    const config = [
      {
        type: 'input',
        message: '当前待压缩图片所在的目录(必须正确)',
        name: 'inputPath',
        validate: () => true,
      },
      {
        type: 'input',
        message: '压缩后的图片存放目录(没有就自动创建)',
        name: 'outputPath',
        validate: () => true,
      },
      // TODO 是否需要一直监听该目录？
      // {},
      {
        type: 'confirm',
        message: '请检查文件路径和输出的目录是否正确？',
        name: 'isConfirm',
      },
    ]
    return this.inquirer.prompt(config)
  }
}
