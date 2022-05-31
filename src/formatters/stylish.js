import _ from 'lodash';

const stringify = (data, depth, replacer) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const IndentForKey = replacer.repeat(depth + 1);
  const IndentForBracket = replacer.repeat(depth);
  const lines = Object.entries(data)
    .map(([key, value]) => `${IndentForKey}${key}: ${stringify(value, depth + 1, replacer)}`);

  return ['{', ...lines, `${IndentForBracket}}`].join('\n');
};

const makeStylish = (diff, replacer = '    ') => {
  const iter = (tree, depth) => tree.map((node) => {
    const indent = replacer.repeat(depth);
    const indentForLine = indent.slice(2);
    const makeLine = (value, sign) => `${indentForLine}${sign} ${node.name}: ${stringify(value, depth, replacer)}`;

    const sign = {
      added: '+',
      deleted: '-',
      unchanged: ' ',
    };

    switch (node.type) {
      case 'added':
        return makeLine(node.value, sign.added);
      case 'deleted':
        return makeLine(node.value, sign.deleted);
      case 'unchanged':
        return makeLine(node.value, sign.unchanged);
      case 'changed':
        return [`${makeLine(node.firstValue, sign.deleted)}`,
          `${makeLine(node.secondValue, sign.added)}`].join('\n');
      case 'nested':
        return `${indent}${node.name}: ${['{', ...iter(node.children, depth + 1), `${indent}}`].join('\n')}`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default makeStylish;
