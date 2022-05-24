import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test("extension '.json'", () => {
  const plainData = readFile('expected-json-plain.txt');
  const expected = plainData.trim();
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toEqual(expected);
});

test("extension '.yml' && '.yaml'", () => {
  const plainData = readFile('expected-yml-plain.txt');
  const expected = plainData.trim();
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  expect(actual).toEqual(expected);
});

test('check parse wrong extension', () => {
  const error = new Error("Invalid file extension type: '.txt'! Try supported file formats.");
  expect(() => {
    genDiff(getFixturePath('wrong-ext-file1.txt'), getFixturePath('wrong-ext-file2.txt'));
  }).toThrow(error);
});
