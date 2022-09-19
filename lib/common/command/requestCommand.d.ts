/// <reference types="node" />
import { RequestOptions } from 'node:https';
interface ISubmitCommand {
    handle<ResponseResult>(option: RequestOptions, filePath: string): Promise<ResponseResult>;
}
interface IDownloadCommand {
    handle(url: string, output: string): Promise<string>;
}
export declare class RequestClient {
    submit<ResponseResult>(option: RequestOptions, filePath: string): Promise<ResponseResult>;
    download(url: string, output: string): Promise<string>;
}
export declare class SubmitCommand implements ISubmitCommand {
    requestClient: RequestClient;
    constructor(requestClient: RequestClient);
    handle<ResponseResult>(option: RequestOptions, filePath: string): Promise<ResponseResult>;
}
export declare class DownloadCommand implements IDownloadCommand {
    requestClient: RequestClient;
    constructor(requestClient: RequestClient);
    handle(url: string, output: string): Promise<string>;
}
export {};
