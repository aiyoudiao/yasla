export declare enum ImagesNameEnum {
    "image/webp" = "image/webp",
    "image/jpeg" = "image/jpeg",
    "image/png" = "image/png",
    "image/jpg" = "image/jpg",
    "image/jfif" = "image/jfif"
}
export interface ITinyImg {
    handle(filePath: string, outputPath: string): Promise<string>;
}
export declare class TinyImgFactory {
    static map: Map<ImagesNameEnum, ITinyImg>;
    static addTinyImg(key: ImagesNameEnum, value: ITinyImg): typeof TinyImgFactory;
    static getTinyImg(key: ImagesNameEnum): ITinyImg | undefined;
}
