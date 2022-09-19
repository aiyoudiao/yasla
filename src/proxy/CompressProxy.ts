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

  compress (key: ImagesNameEnum): void
}

// 代理了图片处理的工厂，只对外暴露这么一个压缩的功能
export class ImgCompress implements ICompress {
  constructor() {}

  compress(key: ImagesNameEnum): void {
    const img = TinyImgFactory.getTinyImg(key)
    img?.handle()
  }
}
