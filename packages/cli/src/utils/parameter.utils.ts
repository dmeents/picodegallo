export interface SimpleObject {
  [key: string]: string;
}

/**
 * take the comma delimited string formatted as key=value and convert it into an object
 * with shape of { key: value }
 */
export const convertOptionStringToObject = (opt: string) => {
  const optAsArray = opt.split(',');
  const newObject = {};

  optAsArray.forEach(i => {
    const [key, value] = i.split('=');
    newObject[key] = value;
  });

  return newObject;
};
