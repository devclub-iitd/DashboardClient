/* eslint-disable no-underscore-dangle */
import { createMuiTheme } from '@material-ui/core';
import * as EventUtils from './eventUtils';
import * as ProjectUtils from './projectUtils';
import * as UserUtils from './userUtils';

export { EventUtils };
export { ProjectUtils };
export { UserUtils };

export const defaultTheme = createMuiTheme();

export const isValidUrl = (url) => {
    return url.length === 0 || /^https?:\/\//i.test(url);
};

// [a-z.+*&%$#@!/]+$

export const strMapToObj = (strMap) => {
    const obj = Object.create(null);
    strMap.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

export const objToStrMap = (obj) => {
    const strMap = new Map();
    Object.keys(obj).map((k) => strMap.set(k, obj[k]));
    return strMap;
};

export const capitalizeString = (str) => {
    return str === undefined || str === null || str === ''
        ? ''
        : str.toString().charAt(0).toUpperCase() + str.toString().slice(1);
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

const isArrayEqual = (org, upd) => {
    return (
        org.length === upd.length &&
        org.every((val, index) => val === upd[index])
    );
};

const areUnequal = (org, upd) => {
    const typeOfVar = Object.prototype.toString.call(org);

    if (typeOfVar === '[object String]' || typeOfVar === '[object Boolean]') {
        return org !== upd;
    }
    if (typeOfVar === '[object Date]') {
        return org.getTime() !== upd.getTime();
    }
    if (typeOfVar === '[object Map]') {
        // original object will have url as map but the new object while sending as object
        const orgKeys = Array.from(org.keys());
        const updKeys = Object.keys(upd);
        if (!isArrayEqual(orgKeys, updKeys)) {
            return true;
        }

        for (let i = 0; i < orgKeys.length; i += 1) {
            if (org.get(orgKeys[i]) !== upd[orgKeys[i]]) {
                return true;
            }
        }

        return false;
    }
    if (typeOfVar === '[object Array]') {
        return !isArrayEqual(org, upd);
    }
    return false;
};

export const getNewFields = (org, upd) => {
    const keys = Object.keys(org);

    let objectWithUpdFields = {
        _id: upd._id,
    };

    keys.forEach((key) => {
        if (areUnequal(upd[key], org[key])) {
            objectWithUpdFields = {
                ...objectWithUpdFields,
                [key]: upd[key],
            };
        }
    });

    return objectWithUpdFields;
};

export const getsUserTasks = (users, projects, events) => {
    const userWithTasks = [];

    if (users) {
        users.forEach((user) => {
            const userId = user._id;
            const userObject = {
                user: {
                    id: userId,
                    name: user.name,
                },
                projects: [],
                events: [],
            };
            if (projects) {
                projects.forEach((pro) => {
                    if (
                        pro.members.includes(userId) &&
                        !(pro.status === 'COMPLETED')
                    ) {
                        userObject.projects.push({
                            id: pro._id,
                            name: pro.name,
                            members: pro.members,
                        });
                    }
                });

                if (events) {
                    events.forEach((eve) => {
                        if (
                            eve.assignee.includes(userId) &&
                            !(EventUtils.getStatus(eve) === 'completed')
                        ) {
                            userObject.events.push({
                                id: eve._id,
                                name: eve.name,
                                members: eve.assignee,
                            });
                        }
                    });
                }
            }
            userWithTasks.push(userObject);
        });
    }
    return userWithTasks;
};
