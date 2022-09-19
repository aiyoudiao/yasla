/*
 * File: CompressFacade.ts                                                     *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 00:18:01                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 00:18:01                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
interface ICompress {
  compress (): void
}

class Img implements ICompress {
  compress(): void {
    throw new Error('Method not implemented.')
  }
}

class Video implements ICompress {
  compress(): void {
    throw new Error('Method not implemented.')
  }
}

class Music implements ICompress {
  compress(): void {
    throw new Error('Method not implemented.')
  }
}

interface IFacade {
  compress (typeName: string): IFacade
}

// 汇总功能
class CompressFacade implements IFacade {
  private img = new Img()
  private video = new Video()
  private music = new Music()

  compress(typeName: string) {
    if (typeName === 'img')
      this.img.compress()
    else if (typeName === 'video')
      this.video.compress()
    else if (typeName === 'music')
      this.music.compress()

    return this
  }
}

export default CompressFacade
