import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);

const getFileContent = (filepath) => {
  const fileContent = fs.readFileSync(getPathFile(filepath), 'utf8');
  const extension = path.extname(filepath);
  return parse(fileContent, extension);
};

const compareFileContent = (obj1, obj2, replacer = ' ', spaceCount = 2) => {
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const currentSpace = replacer.repeat(spaceCount);
  const lines = _.sortBy(uniqKeys)
    .map((key) => {
      const key1 = _.has(obj1, key);
      const key2 = _.has(obj2, key);
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (!key1) {
        return [`+ ${key}: ${value2}`];
      }
      if (!key2) {
        return [`- ${key}: ${value1}`];
      }
      if (_.isEqual(value1, value2)) {
        return [`  ${key}: ${value1}`];
      }
      if (!_.isEqual(value1, value2)) {
        return [`- ${key}: ${value1}`, `+ ${key}: ${value2}`];
      }
      throw new Error(`Unknown order state: '${key}'!`);
    })
    .flat();
  const currentLines = lines.map((line) => `${currentSpace}${line}`);
  return ['{', ...currentLines, '}'].join('\n');
};

const getDiff = (filepath1, filepath2) => {
  const firstFile = getFileContent(filepath1);
  const secondFile = getFileContent(filepath2);
  return compareFileContent(firstFile, secondFile);
};

export default getDiff;
