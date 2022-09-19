/*
 * File: TinyImgFactory.ts                                                     *
 * Project: yasla                                                              *
 * Created Date: 2022-09-18 23:39:04                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 23:39:04                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */

import type { IRequestOption } from '../builder/requestBuilder'
import { RequestBuiler } from '../builder/requestBuilder'
import { DownloadCommand, RequestClient, SubmitCommand } from '../command/requestCommand'

export enum ImagesNameEnum {
  webp = 'image/webp',
  jpeg = 'image/jpeg',
  png = 'image/png',
  jpg = 'image/jpg',
  jfif = 'image/jfif',
}

export interface ITinyImg {
  handle(): void
}

export class TinyImgFactory {
  static map: Map<ImagesNameEnum, ITinyImg> = new Map()

  static addTinyImg(key: ImagesNameEnum, value: ITinyImg) {
    this.map.set(key, value)

    return this
  }

  static getTinyImg(key: ImagesNameEnum) {
    return this.map.get(key)
  }
}

class Img implements ITinyImg {
  private option!: IRequestOption
  private requestClinet!: RequestClient
  public submitCommand!: SubmitCommand
  public downloadCommand!: DownloadCommand

  constructor() {
    const imgBuilder = new RequestBuiler()
    this.option = imgBuilder
      .setHostName('tinypng.com')
      .setPort(443)
      .setPath('/web/shrink')
      .setMethod('POST')
      .setHeaders({
        'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      }).build().toResult()
    this.requestClinet = new RequestClient ()
    this.submitCommand = new SubmitCommand(this.requestClinet)
    this.downloadCommand = new DownloadCommand(this.requestClinet)
  }

  handle(): void {
    // TODO 调用那两个命令来进行图片的压缩和下载
  }
}

const img = new Img()
// 给这个工厂添加产品
TinyImgFactory
  .addTinyImg(ImagesNameEnum.webp, img)
  .addTinyImg(ImagesNameEnum.jpeg, img)
  .addTinyImg(ImagesNameEnum.png, img)
  .addTinyImg(ImagesNameEnum.jpg, img)
  .addTinyImg(ImagesNameEnum.jfif, img)
