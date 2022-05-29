import _ from 'lodash';

const getIndent = (depth, replacer = ' ', firstIndent = 2, spaceCount = 4) => (
  replacer.repeat(spaceCount * depth).slice(firstIndent));

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const lines = Object.entries(data).map(
    ([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`,
  );

  return ['{', ...lines, `${getIndent(depth)}  }`].join('\n');
};

const makeStylish = (diff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const makeLine = (value, sign) => `${getIndent(depth)}${sign} ${node.name}: ${stringify(value, depth)}`;

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
        return `${getIndent(depth)}  ${node.name}: ${[
          '{',
          ...iter(node.children, depth + 1),
          `${getIndent(depth)}  }`,
        ].join('\n')}`;
      default:
        throw new Error(`Type: ${node.type} is undefined`);
    }
  });

  const stylishDiff = iter(diff, 1);
  return ['{', ...stylishDiff, '}'].join('\n');
};

export default makeStylish;
