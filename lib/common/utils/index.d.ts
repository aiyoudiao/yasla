export declare function getFilesByGlob(inputPath: string): Promise<string[]>;
export declare function getFiles(dir: string, deep?: boolean): string[];
export declare function createFilterByExt(ext: string): (file: string) => boolean;
export declare function mkdir(dir: string): void;
export declare function getDirname(filename: string): string;
