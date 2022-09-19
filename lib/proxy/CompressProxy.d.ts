import type { ImagesNameEnum } from '../common/factory/tinyImgFactory';
interface ICompress {
    compress(key: ImagesNameEnum, filePath: string, outputPath: string): Promise<string | void>;
}
export declare class ImgCompress implements ICompress {
    constructor();
    compress(key: ImagesNameEnum, filePath: string, outputPath: string): Promise<string | void>;
}
export {};
