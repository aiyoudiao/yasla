import { ImagesNameEnum } from "../common/factory/tinyImgFactory";
interface ICompress {
    compress(key: ImagesNameEnum): void;
}
export declare class ImgCompress implements ICompress {
    constructor();
    compress(key: ImagesNameEnum): void;
}
export {};
