/// <reference types="node" />
import type { ListrTask } from 'listr';
import type { IYaslaContext } from '..';
import { ImgCompress } from '../proxy/CompressProxy';
import { BasicVisitor } from './baseVisitor';
export default class imgVisitor extends BasicVisitor {
    imgCompress: ImgCompress;
    watchHandleTimer: NodeJS.Timeout | undefined;
    constructor(context: IYaslaContext);
    accept(): void;
    actionHandler(inputPath: string, outputPath: string): Promise<void>;
    batchCompressHandler(inputPath: string, outputPath: string): Promise<void>;
    compressHandler(outputPath: string, event: string, pathDir: string): Promise<void>;
    singlecompressHandler(filePath: string, outputPath: string): Promise<string | void>;
    createTask(filePath: string, outputPath: string): ListrTask;
    bindEvent(): void;
    interactiveEventHandler(): void;
    inquirerHandler(): any;
}
