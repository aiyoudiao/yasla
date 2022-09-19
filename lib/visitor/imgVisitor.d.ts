import { IYaslaContext } from '..';
import { BasicVisitor } from './baseVisitor';
export default class imgVisitor extends BasicVisitor {
    constructor(context: IYaslaContext);
    accept(): void;
    actionHandler(inputPath: string, outputPath: string): void;
    bindEvent(): void;
    interactiveEventHandler(): void;
    inquirerHandler(): any;
}
