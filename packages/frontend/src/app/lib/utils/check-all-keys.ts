export const createKeys = <T>() => {
  return <const K extends (keyof T)[]>(
    ...keys: K & (Exclude<keyof T, K[number]> extends never ? K : never)
  ) => keys;
};
