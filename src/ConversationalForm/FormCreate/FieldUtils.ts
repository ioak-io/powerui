export const getValueAtPath = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const setValueAtPath = (obj: any, path: string, value: any): any => {
  const keys = path.split('.');
  const newData = { ...obj };
  let curr = newData;

  for (let i = 0; i < keys.length - 1; i++) {
    curr[keys[i]] = curr[keys[i]] || {};
    curr = curr[keys[i]];
  }

  curr[keys[keys.length - 1]] = value;
  return newData;
};
