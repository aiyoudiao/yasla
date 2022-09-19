/*
 * File: CompressProxy.ts                                                           *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 00:07:14                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 00:07:14                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
import type { ImagesNameEnum } from '../common/factory/tinyImgFactory'
import { TinyImgFactory } from '../common/factory/tinyImgFactory'

interface ICompress {
//   compress (key: ImagesNameEnum): Promise<void>
  compress (key: ImagesNameEnum, filePath: string, outputPath: string): Promise<string | void>
}

// 代理了图片处理的工厂，只对外暴露这么一个压缩的功能
export class ImgCompress implements ICompress {
  constructor() {}

  async compress(key: ImagesNameEnum, filePath: string, outputPath: string): Promise<string | void> {
    // console.log('log:compress params', key, filePath, outputPath)
    const img = TinyImgFactory.getTinyImg(key)
    // console.log('log:compress img', img)
    return img?.handle(filePath, outputPath)
  }
}
