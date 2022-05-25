import yaml from 'js-yaml';

export default (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Invalid file extension type: '${extension}'! Try supported file formats.`);
  }
};
