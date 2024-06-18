export const disableArgTypes = (keys: string[]) => {
  return keys.reduce((acc: Record<string, any>, key) => {
    acc[key] = { table: { disable: true } };
    return acc;
  }, {});
};

export const prefixKeys = (object: Record<string, any>, prefix: string) => {
  return Object.keys(object).reduce((acc: Record<string, any>, key) => {
    acc[`${prefix}${key}`] = object[key];
    return acc;
  }, {});
};

export enum STKMode {
  DESIGNER = "designer",
  USER = "user"
}
