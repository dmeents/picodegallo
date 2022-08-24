export interface FlatObject {
  [key: string]: string;
}

export interface NestedObject {
  [key: string]: FlatObject;
}

/**
 * take the comma delimited string formatted as key=value and convert it into an object
 * with shape of { key: value }
 */
export const parseParameters = (parameters: Array<string>) => {
  const parsedParams = {};

  parameters.forEach(param => {
    const [key, value] = param.split('=');
    parsedParams[key] = value;
  });

  return parsedParams;
};
