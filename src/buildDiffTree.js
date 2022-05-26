import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const uniqKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { name: key, value: value2, type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { name: key, value: value1, type: 'deleted' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { name: key, children: buildDiffTree(value1, value2), type: 'nested' };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        name: key,
        firstValue: value1,
        secondValue: value2,
        type: 'changed',
      };
    }

    return { name: key, value: value1, type: 'unchanged' };
  });
};

export default buildDiffTree;
