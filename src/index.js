import path from 'path';
import parse from './parsers.js';
import readFile from './readFile.js';
import buildDiffTree from './buildDiffTree.js';
import formatOutput from './formatters/index.js';

const getFileContent = (filepath) => {
  const fileContent = readFile(filepath);
  const fileExtension = path.extname(filepath);
  const fileDataParse = parse(fileContent, fileExtension);

  return fileDataParse;
};

const genDiff = (filepath1, filepath2, format = 'stylish', option = {}) => {
  const { replacer } = option;
  const firstFileContent = getFileContent(filepath1);
  const secondFileContent = getFileContent(filepath2);
  const diffBetweenFiles = buildDiffTree(firstFileContent, secondFileContent);
  const formattedDiff = formatOutput(diffBetweenFiles, format, replacer);

  return formattedDiff;
};

export default genDiff;
