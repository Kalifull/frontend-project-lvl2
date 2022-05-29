import { Command, Option } from 'commander';
import genDiff from './index.js';

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .addOption(
      new Option('-f, --format <type>', 'output format')
        .default('stylish')
        .choices(['stylish', 'plain', 'json']),
    )
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const diff = genDiff(filepath1, filepath2, program.opts().format);

      console.log(diff);
    });

  program.parse();
};
