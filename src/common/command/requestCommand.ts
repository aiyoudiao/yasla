/*
 * File: requestCommand.ts                                                     *
 * Project: yasla                                                              *
 * Created Date: 2022-09-18 22:46:35                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 22:46:35                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
import fs from 'node:fs'
import type { RequestOptions } from 'node:https'
import https from 'node:https'

interface ISubmitCommand {
  handle<ResponseResult>(option: RequestOptions, filePath: string): Promise<ResponseResult>
}

interface IDownloadCommand {
  handle(url: string, output: string): Promise<string>
}

export class RequestClient {
  submit<ResponseResult>(option: RequestOptions, filePath: string): Promise<ResponseResult> {
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath).pipe(
        https.request(option, (res) => {
          let response = ''
          res.on('data', (data) => {
            response += data
          })
          res.on('end', () => {
            try {
              const data = JSON.parse(response) as ResponseResult
              resolve(data)
            }
            catch (error) {
              reject(error)
            }
          })
        }),
      )
    })
  }

  download(url: string, output: string): Promise<string> {
    return new Promise((resolve) => {
      https.get(url, (res) => {
        res.pipe(fs.createWriteStream(output))
        res.on('end', () => {
          resolve(output)
        })
      })
    })
  }
}

export class SubmitCommand implements ISubmitCommand {
  requestClient!: RequestClient

  constructor(requestClient: RequestClient) {
    this.requestClient = requestClient
  }

  handle<ResponseResult>(option: RequestOptions, filePath: string): Promise<ResponseResult> {
    return this.requestClient.submit(option, filePath)
  }
}

export class DownloadCommand implements IDownloadCommand {
  requestClient!: RequestClient

  constructor(requestClient: RequestClient) {
    this.requestClient = requestClient
  }

  handle(url: string, output: string): Promise<string> {
    return this.requestClient.download(url, output)
  }
}
