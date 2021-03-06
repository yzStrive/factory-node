import { Factory } from 'fbi';
import CommandBuild from './commands/build';
import CommandServe from './commands/serve';
import CommandDb from './commands/db';
import CommandGenerate from './commands/generate';
import TemplateGraphql from './templates/graphql';
import TemplateAdmin from './templates/admin';
import TemplateApiBasic from './templates/api-basic';
import TemplateApiCombine from './templates/api-combine';
import TemplateDalBasic from './templates/dal-basic';
export default class FactoryNode extends Factory {
    id: string;
    description: string;
    commands: (CommandBuild | CommandServe | CommandDb | CommandGenerate)[];
    templates: (TemplateGraphql | TemplateAdmin | TemplateApiBasic | TemplateApiCombine | TemplateDalBasic)[];
    execOpts: any;
}
