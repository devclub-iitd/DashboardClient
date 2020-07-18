import * as EventUtils from './eventUtils';
import * as ProjectUtils from './projectUtils';
import * as UserUtils from './userUtils';

export { EventUtils };
export { ProjectUtils };
export { UserUtils };

export const capitalizeString = (str) => {
    // console.log(str);
    return str === undefined || str === null || str === ''
        ? ''
        : str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
    // return str;
};

export const objectHasUndefined = (obj) => {
    let flag = false;
    Object.keys(obj).forEach((key) => {
        if (obj[key] === undefined) {
            flag = true;
        }
    });
    return flag;
};

export const getDefinedValue = (value, type = 'string') => {
    if (value === undefined) {
        if (type === 'date') {
            return new Date();
        }
        if (type === 'map') {
            return new Map();
        }
        return '';
    }
    return value;
};
