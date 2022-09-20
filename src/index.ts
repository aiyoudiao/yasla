/*
 * File: index.ts                                                              *
 * Project: yasla                                                              *
 * Created Date: 2022-09-17 23:51:40                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-18 00:04:05                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                            *
 * --------------------------------------------------------------------------- *
 */
import path from 'path'
import { cwd } from 'process'
// import fs from 'fs'
import { Command } from 'commander'
import type { PackageJson } from 'pkg-types'
import { readPackageJSON } from 'pkg-types'
import type { AbbreviatedMetadata } from 'package-json'
import packageJson from 'package-json'
import semver from 'semver'
import type { Chalk } from 'chalk'
import chalk from 'chalk'
import type { Inquirer } from 'inquirer'
import inquirer from 'inquirer'
import chokidar from 'chokidar'
import visitStart from './supervisor'
// import boxen from 'boxen'
// import fse from 'fs-extra'
// import fg from 'fast-glob'
// import { fileTypeFromFile } from 'file-type'
// import figlet from 'figlet'
const program = new Command()
const currentPkgFilePath = path.resolve(cwd(), './package.json')

export interface IYaslaContext {
  program: Command
  chalk: Chalk
  // boxen: any
  inquirer: Inquirer
  version: any
  out: any
  loading: any
  chokidar: any
}

class Yasla implements IYaslaContext {
  program!: Command
  chalk: Chalk
  // boxen: any
  inquirer: Inquirer
  chokidar: any
  version: any
  out: any
  loading: any
  localPkg!: PackageJson
  onlinePkg!: AbbreviatedMetadata

  constructor() {
    this.program = program
    this.chalk = chalk
    // this.boxen = boxen
    this.inquirer = inquirer
    this.chokidar = chokidar
    // const log = global.console.log
    // global.console.log = function (...list) {
    //   // log(...list)
    // }
  }

  async init() {
    this.localPkg = await readPackageJSON(currentPkgFilePath)
    this.onlinePkg = await packageJson(this.localPkg.name!)
    await this.checkVersion()
    await this.initCommand()
    await this.parseInputParam()
  }

  async parseInputParam() {
    program.parse(process.argv)
    // const options = program.opts()
    // console.log('options', options)
  }

  async checkVersion() {
    try {
      const { localPkg, onlinePkg } = this
      const version = onlinePkg.version as string
      if (localPkg.version && version && semver.lt(localPkg.version, version))
        console.log(chalk.bgRed(`Please update the version to yasla@${version}`))
    }
    catch (error) { }
  }

  async initCommand() {
    await this.initHelp()
    await this.initUsage()
    await this.initVersion()
    await this.initCommandVisitor()
  }

  async initEvents() {
    program.on('command:*', () => {
      console.error(
        '请检查命令: %s 有效性\n使用 --help 查看所有的有效命令。',
        program.args.join(' '),
      )
      process.exit(1)
    })
  }

  async initHelp() {
    const { name, version } = this.localPkg
    program.option('-o, --once', '添加这个参数后，只会进行一次压缩')
    program.helpOption('-h, --help', `显示${name}@${version}的帮助文档`)
    program.on('--help', () => {
      // console.log ('调用了--help');
    })
  }

  async initUsage() {
    const { name } = this.localPkg
    program.name(name!).usage('<command> [options]')
  }

  async initVersion() {
    const { name, version } = this.localPkg
    program.version(
            `${name}:${version}`,
            '-v, --version',
            `打印${name}版本号`,
    )
  }

  async initCommandVisitor() {
    visitStart(this)
  }
}

(async () => {
  await new Yasla().init()
})()
