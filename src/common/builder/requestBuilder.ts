/*
 * File: requestBuilder.ts                                                     *
 * Project: yasla                                                              *
 * Created Date: 2022-09-18 22:14:12                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 22:14:12                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
export interface IRequestOption {
  hostname: string
  port: string | number
  path: string
  method: string
  headers: Object
}

export class RequestOption {
  private hostname = ''
  private port: string | number = ''
  private path = ''
  private method = ''
  private headers: Object = {}

  constructor(hostname: string, port: string | number, path: string, method: string, headers: Object) {
    this.hostname = hostname
    this.port = port
    this.path = path
    this.method = method
    this.headers = headers
  }

  toResult(): IRequestOption {
    return {
      hostname: this.hostname,
      port: this.port,
      path: this.path,
      method: this.method,
      headers: this.headers,
    }
  }
}

export interface IRequestBuilderabler {

  setHostName(hostname: string): IRequestBuilderabler

  setPort(port: string | number): IRequestBuilderabler

  setPath(path: string): IRequestBuilderabler

  setMethod(method: string): IRequestBuilderabler

  setHeaders(headers: Object | Array<Object>): IRequestBuilderabler

  build (): RequestOption

}

export class RequestBuiler implements IRequestBuilderabler {
  private hostname = ''
  private port: string | number = ''
  private path = ''
  private method = ''
  private headers: Object = {}

  build(): RequestOption {
    // 只有所有步骤全部执行完毕才能创建出对象来
    if (this.hostname && this.port && this.path && this.method && this.headers)
      return new RequestOption(this.hostname, this.port, this.path, this.method, this.headers)

    throw new Error('build fail. hostname、port、path、method、headers is reqired.')
  }

  setHostName(hostname: string): IRequestBuilderabler {
    if (!hostname)
      throw new Error('hostname is reqired.')

    this.hostname = hostname

    return this
  }

  setPort(port: string | number): IRequestBuilderabler {
    if (!port)
      throw new Error('port is reqired.')

    this.port = port

    return this
  }

  setPath(path: string): IRequestBuilderabler {
    if (!path)
      throw new Error('path is reqired.')

    this.path = path

    return this
  }

  setMethod(method: string): IRequestBuilderabler {
    if (!method)
      throw new Error('method is reqired.')

    this.method = method

    return this
  }

  setHeaders(headers: Object | Array<Object>): IRequestBuilderabler {
    if (!headers)
      throw new Error('skill is reqired.')

    if (Array.isArray(headers)) {
      this.headers = {
        ...this.headers,
        ...(headers as Array<Object>).reduce((prev, cur) => ({ ...prev, ...cur }), {}),
      }
    }
    else {
      this.headers = {
        ...this.headers,
        ...headers,
      }
    }

    return this
  }
}
