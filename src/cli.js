import { Command, Option } from 'commander';
import genDiff from './index.js';

export default () => {
  const program = new Command();

  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.1')
    .addOption(
      new Option('-f, --format <type>', 'output format')
        .default('stylish')
        .choices(['stylish', 'plain', 'json']),
    )
    .option('-r, --replacer <char>', 'output replacer', '    ')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, replacer) => {
      const diff = genDiff(filepath1, filepath2, program.opts().format, replacer);

      console.log(diff);
    });

  program.parse();
};
