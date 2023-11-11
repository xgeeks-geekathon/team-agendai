import { isFile } from './file';
import { cleanObject } from './object';

export const getFormDataFromObject = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  const cleanData = cleanObject(data);

  Object.keys(cleanData).forEach(key => {
    if(isFile(data[key])) {
      formData.append(key, data[key]);
    } else if(typeof data[key] === 'object') {
      for (let nestedKey in data[key]) {
        formData.append(`${key}.${nestedKey}`, data[key][nestedKey]);
      }
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
};
