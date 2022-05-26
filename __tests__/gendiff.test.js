import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test('check correct extension', () => {
  const data = readFile('expected-stylish.txt');
  const expected = data.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');

  expect(actual).toEqual(expected);
});

test('check stylish format', () => {
  const data = readFile('expected-yml.txt');
  const expected = data.trim();
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish');

  expect(actual).toEqual(expected);
});

test('check plain format', () => {
  const data = readFile('expected-plain.txt');
  const expected = data.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');

  expect(actual).toEqual(expected);
});

test('check json format', () => {
  const data = readFile('expected-json.txt');
  const expected = data.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');

  expect(actual).toEqual(expected);
});

test('check wrong extension', () => {
  const error = new Error("Invalid file extension type: '.txt'! Try supported file formats.");

  expect(() => {
    genDiff(getFixturePath('wrong-ext-file1.txt'), getFixturePath('wrong-ext-file2.txt'), 'txt');
  }).toThrow(error);
});
