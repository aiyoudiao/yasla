/*
 * File: index.ts                                                              *
 * Project: yasla                                                              *
 * Created Date: 2022-09-19 13:02:55                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-19 13:02:55                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * --------------------------------------------------------------------------- *
 */
import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'

export async function getFilesByGlob(inputPath: string) {
  const patternFilePath = [
        `${path.join(process.cwd(), inputPath, '/**/*.*')}`.replace(/\\/g, '/'),
  ]
  const entries = await fg(patternFilePath, { dot: true })
  return entries
}
export function getFiles(dir: string, deep = false) {
  const output: string[] = []

  function findFiles(dir: string, deep: boolean) {
    if (fs.statSync(dir).isFile()) {
      output.push(dir)
    }
    else {
      if (deep === false)
        return
      const files = fs.readdirSync(dir)
      files.forEach((file) => {
        findFiles(path.join(dir, file), deep)
      })
    }
  }

  if (fs.existsSync(dir)) {
    if (fs.statSync(dir).isFile()) {
      output.push(dir)
    }
    else {
      const files = fs.readdirSync(dir)
      files.forEach((file) => {
        findFiles(path.join(dir, file), deep)
      })
    }
  }

  return output
}

export function createFilterByExt(ext: string) {
  const exts = ext.split(',')
  return (file: string) => exts.includes(path.extname(file))
}

const dirCache = new Set()

export function mkdir(dir: string) {
  if (dirCache.has(dir))
    return

  dirCache.add(dir)

  let base = '.'

  getDirname(dir)
    .split('/')
    .forEach((dir) => {
      base = path.join(base, dir)
      if (!fs.existsSync(base))
        fs.mkdirSync(base)
    })
}

export function getDirname(filename: string) {
  return path.dirname(filename)
}
