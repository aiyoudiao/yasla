export interface IRequestOption {
    hostname: string;
    port: string | number;
    path: string;
    method: string;
    headers: Object;
}
export declare class RequestOption {
    private hostname;
    private port;
    private path;
    private method;
    private headers;
    constructor(hostname: string, port: string | number, path: string, method: string, headers: Object);
    toResult(): IRequestOption;
}
export interface IRequestBuilderabler {
    setHostName(hostname: string): IRequestBuilderabler;
    setPort(port: string | number): IRequestBuilderabler;
    setPath(path: string): IRequestBuilderabler;
    setMethod(method: string): IRequestBuilderabler;
    setHeaders(headers: Object | Array<Object>): IRequestBuilderabler;
    build(): RequestOption;
}
export declare class RequestBuiler implements IRequestBuilderabler {
    private hostname;
    private port;
    private path;
    private method;
    private headers;
    build(): RequestOption;
    setHostName(hostname: string): IRequestBuilderabler;
    setPort(port: string | number): IRequestBuilderabler;
    setPath(path: string): IRequestBuilderabler;
    setMethod(method: string): IRequestBuilderabler;
    setHeaders(headers: Object | Array<Object>): IRequestBuilderabler;
}
