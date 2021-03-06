import { Command } from 'fbi';
import Factory from '..';
export default class CommandGenerate extends Command {
    factory: Factory;
    id: string;
    alias: string;
    args: string;
    flags: never[];
    description: string;
    constructor(factory: Factory);
    disable(): false | "Because there is no database model to maintain.";
    run(flags: any): Promise<void>;
}
