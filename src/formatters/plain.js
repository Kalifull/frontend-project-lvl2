import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return _.isString(value) ? `'${value}'` : value;
};

const makePlain = (diff) => {
  const iter = (tree, ancestor) =>
    tree.flatMap((node) => {
      const path = [...ancestor, node.name].join('.');

      switch (node.type) {
        case 'added':
          return `Property '${path}' was added with value: ${stringify(node.value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}' was updated. From ${stringify(node.firstValue)} to ${stringify(node.secondValue)}`;
        case 'nested':
          return `${iter(node.children, [path]).join('\n')}`;
        default:
          throw new Error(`Type: ${node.type} is undefined`);
      }
    });

  const plainDiff = iter(diff, []);
  return [...plainDiff].join('\n');
};

export default makePlain;
