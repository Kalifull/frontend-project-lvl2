import fs from 'fs';
import path from 'path';

const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getPathFile(filepath), 'utf8');

export default readFile;
