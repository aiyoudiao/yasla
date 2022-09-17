/*
 * File: vite.config.ts                                                        *
 * Project: yasla                                                              *
 * Created Date: 2022-09-17 23:19:52                                           *
 * Author: aiyoudiao                                                           *
 * -----                                                                       *
 * Last Modified:  2022-09-17 23:19:53                                         *
 * Modified By: aiyoudiao                                                      *
 * -----                                                                       *
 * Copyright (c) 2022 哎哟迪奥(码二)                                                 *
 * ----------	---	---------------------------------------------------------  *
 */
import { configDefaults, defineConfig } from 'vitest/config'

// https://cn.vitest.dev/config/
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  },
})



