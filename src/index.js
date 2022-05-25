import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import makeStylish from './stylish.js';
import buildDiffTree from './buildDiffTree.js';

const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);

const getFileContent = (filepath) => {
  const fileContent = fs.readFileSync(getPathFile(filepath), 'utf8');
  const fileExtension = path.extname(filepath);
  const fileDataParse = parse(fileContent, fileExtension);

  return fileDataParse;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const firstFileContent = getFileContent(filepath1);
  const secondFileContent = getFileContent(filepath2);

  const diffBetweenFiles = buildDiffTree(firstFileContent, secondFileContent);
  const formattedDiff = makeStylish(diffBetweenFiles, format);

  return formattedDiff;
};

export default genDiff;
