export declare enum ImagesNameEnum {
    webp = "image/webp",
    jpeg = "image/jpeg",
    png = "image/png",
    jpg = "image/jpg",
    jfif = "image/jfif"
}
export interface ITinyImg {
    handle(): void;
}
export declare class TinyImgFactory {
    static map: Map<ImagesNameEnum, ITinyImg>;
    static addTinyImg(key: ImagesNameEnum, value: ITinyImg): typeof TinyImgFactory;
    static getTinyImg(key: ImagesNameEnum): ITinyImg | undefined;
}
