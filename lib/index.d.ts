import { Command } from 'commander';
import { Chalk } from 'chalk';
import { Inquirer } from 'inquirer';
export interface IYaslaContext {
    program: Command;
    chalk: Chalk;
    inquirer: Inquirer;
    version: any;
    out: any;
    loading: any;
}
