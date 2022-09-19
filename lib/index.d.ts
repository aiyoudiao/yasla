import { Command } from 'commander';
import type { Chalk } from 'chalk';
import type { Inquirer } from 'inquirer';
export interface IYaslaContext {
    program: Command;
    chalk: Chalk;
    inquirer: Inquirer;
    version: any;
    out: any;
    loading: any;
    chokidar: any;
}
