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
import path from 'path'
import { cwd } from 'process'
import type { ListrTask } from 'listr'
import Listr from 'listr'
import { fromFile } from 'file-type'
import type { IYaslaContext } from '..'
import { ImgCompress } from '../proxy/CompressProxy'
import { ImagesNameEnum } from '../common/factory/tinyImgFactory'
import { getFilesByGlob } from '../common/utils'
import { BasicVisitor } from './baseVisitor'
let taskList = new Listr([], { concurrent: true })

export default class imgVisitor extends BasicVisitor {
  imgCompress: ImgCompress = new ImgCompress()
  watchHandleTimer: NodeJS.Timeout | undefined = undefined

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

  async actionHandler(inputPath: string, outputPath: string) {
    if (!inputPath || !outputPath)
      return

    this.executing = true

    // TODO 直接了当，yasla img inputPath outputPath
    // 调用工厂函数中的功能来进行压缩，同时也要带有监听的效果，如果是一次性的话，那就不用监听
    const { once } = this.program.opts()
    if (once) {
      // 一次性的压缩
      await this.batchCompressHandler(inputPath, outputPath)
    }
    else {
      // 带监听的压缩
      this.chokidar
        .watch(path.resolve(cwd(), inputPath))
        .on('all', this.compressHandler.bind(this, outputPath))
    }
  }

  async batchCompressHandler(inputPath: string, outputPath: string) {
    // TODO 读取当前目录下所有的图片资源，然后以遍历的方式，调用这个任务，让这个任务成功
    const files = await getFilesByGlob(inputPath)
    files
      .filter(async (filePath) => {
        const { mime = '' } = (await fromFile(filePath)) || {}
        const keyName = mime as ImagesNameEnum
        return Boolean(ImagesNameEnum[keyName])
      })
      // .forEach(async (filePath) => await this.singlecompressHandler(filePath, outputPath))
      .forEach(filePath =>
        taskList.add(this.createTask(filePath, outputPath)),
      )
    // const taskList = new Listr(files.map(filePath => this.createTask(filePath, outputPath)));
    taskList.run()
  }

  async compressHandler(outputPath: string, event: string, pathDir: string) {
    if (this.watchHandleTimer)
      clearTimeout(this.watchHandleTimer)

    // TODO 根据不同的事件来做相应的处理
    // console.log('event', event)
    // console.log('pathDir', pathDir)
    if (event === 'add')
      taskList.add(this.createTask(pathDir, outputPath))

    this.watchHandleTimer = setTimeout(() => {
      taskList.run()
      taskList = new Listr([], { concurrent: true })
    }, 1500)
  }

  async singlecompressHandler(filePath: string, outputPath: string) {
    const { mime = '' } = (await fromFile(filePath)) || {}
    // console.log('log:singlecompressHandler', mime)
    // 获取文件后缀名以及文件类型
    return await this.imgCompress.compress(
      mime as unknown as ImagesNameEnum,
      filePath,
      outputPath,
    )
  }

  createTask(filePath: string, outputPath: string): ListrTask {
    return {
      title: filePath,
      task: async (ctx, task) => {
        try {
          task.title = `compress ${filePath}`
          return await this.singlecompressHandler(filePath, outputPath)
        }
        catch (error: any) {
          task.title = `error ${task.title}`
          return Promise.reject(new Error(error?.message || '未知错误'))
        }
      },
    }
  }

  bindEvent() {
    this.program.on('command:img', this.interactiveEventHandler.bind(this))
    this.program.on('command:tu', this.interactiveEventHandler.bind(this))
  }

  interactiveEventHandler() {
    // TODO 带有交互性的来告诉你要对哪个目录进行监听和处理，会询问你inputPath 和 outputPath，都正确的话，才会处理
    setTimeout(async () => {
      if (this.executing)
        return

      await this.inquirerHandler()
        .then(
          async (param: {
            inputPath: string
            outputPath: string
            isConfirm: boolean
          }) => {
            const { inputPath, outputPath, isConfirm } = param

            if (!isConfirm) {
              // console.log('路径不对，重新开始')
              return
            }

            await this.actionHandler(inputPath, outputPath)
          },
        )
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
