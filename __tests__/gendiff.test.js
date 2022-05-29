import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const files = {
  stylish: readFile('expected-stylish.txt'),
  plain: readFile('expected-plain.txt'),
  json: readFile('expected-json.txt'),
};

const filesForTests = [
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.yml', 'file2.yaml', 'plain'],
  ['file1.json', 'file2.yaml', 'json'],
];

describe('Positives cases', () => {
  test.each(filesForTests)('Compare %s with %s, format %s', (filepath1, filepath2, format) => {
    const file1 = getFixturePath(filepath1);
    const file2 = getFixturePath(filepath2);
    const expected = files[format].trim();

    expect(genDiff(file1, file2, format)).toEqual(expected);
  });
});

describe('Negative cases', () => {
  test('Check wrong file extension', () => {
    const error = new Error("Invalid file extension type: '.txt'! Try supported file formats.");

    expect(() => {
      genDiff(getFixturePath('wrong-ext-file1.txt'), getFixturePath('wrong-ext-file2.txt'), 'txt');
    }).toThrow(error);
  });

  test('Check wrong output format', () => {
    const error = new Error("Invalid file format type: '.txt'! Try supported file formats.");

    expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'txt')).toThrowError(error);
  });
});
