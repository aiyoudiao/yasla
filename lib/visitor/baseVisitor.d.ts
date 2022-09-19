import { IYaslaContext } from "..";
export interface IVisitor extends IYaslaContext {
    context: any;
    executing: boolean;
}
export declare class BasicVisitor implements IVisitor {
    context: any;
    program: any;
    chalk: any;
    inquirer: any;
    version: any;
    out: any;
    loading: any;
    executing: boolean;
    constructor(context: IYaslaContext);
}
