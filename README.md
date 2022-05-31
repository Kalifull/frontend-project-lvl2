### Hexlet tests and linter status:
[![Actions Status](https://github.com/Kalifull/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Kalifull/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/651d025d6007362af13c/maintainability)](https://codeclimate.com/github/Kalifull/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/651d025d6007362af13c/test_coverage)](https://codeclimate.com/github/Kalifull/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/Kalifull/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/Kalifull/frontend-project-lvl2/actions/workflows/nodejs.yml)
# Annotation:
Done as part of a project on [Hexlet](https://ru.hexlet.io/).
Technology stack: Node.js, Commander.JS, Jest, npm, ESLint (airbnb), Git, GitHub, GitHub Actions.
## Description:
**Generator of difference** is the CLI programm that generate difference between two files.
Supporting formats: JSON, YML, YAML.
## How to install:
1. Make sure you have installed [Node.js](https://nodejs.org/en/) no lower version 12: ```node -v```
2. Clone repository: ```git@github.com:Kalifull/frontend-project-lvl2.git```
3. Change directory to frontend-project-lvl2
4. Run the command: ```make install-deps```
```shell
$ git clone git@github.com:Kalifull/frontend-project-lvl2.git
$ cd frontend-project-lvl2
$ make install-deps
```
## Run tests:
```shell
$ make test
```
## How to use:
You can use it as a script in terminal or as a library in your JavaScript project. You can format difference in three styles: stylish (default), plain and json. You can choose replacer: (default: "    ") or custom replacer for json and stylish format.
```shell
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version          output the version number
  -f, --format <type>    output format (choices: "stylish", "plain", "json", default: "stylish")
  -r, --replacer <char>  output replacer (default: "    ")
  -h, --help             display help for command
```
## Use in your project:
```javascript
import genDiff from '@hexlet/code';
const diff = genDiff(filepath1, filepath2[, { format, replacer }]);
console.log(diff);
```
## Demonstration of the **genDiff** utility:
### Compare files in stylish format:
[![asciicast](https://asciinema.org/a/wTOyVJbDT1uVqqCvObO5qLjyG.svg)](https://asciinema.org/a/wTOyVJbDT1uVqqCvObO5qLjyG)
### Compare files in plain format:
[![asciicast](https://asciinema.org/a/FFIZd5NxAkB0Y535W3ism7bEv.svg)](https://asciinema.org/a/FFIZd5NxAkB0Y535W3ism7bEv)
### Compare files in json format with custom replacer:
[![asciicast](https://asciinema.org/a/utrE5uudDqMd22HRERUHj10KZ.svg)](https://asciinema.org/a/utrE5uudDqMd22HRERUHj10KZ)
### Compare files in stylish format with custom replacer:
[![asciicast](https://asciinema.org/a/nqtMIs5x9qsGATAOpeAnH7rvF.svg)](https://asciinema.org/a/nqtMIs5x9qsGATAOpeAnH7rvF)
