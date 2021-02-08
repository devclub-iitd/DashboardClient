/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
export const userHostels = [
    'Aravali',
    'Girnar',
    'Jwalamukhi',
    'Karakoram',
    'Kumaon',
    'Nilgiri',
    'Shivalik',
    'Satpura',
    'Udaigiri',
    'Vindhyanchal',
    'Zanskar',
    'Kailash',
    'Himadri',
    'New Kailash',
];

export const userCategories = [
    'Overall Coordinator',
    'Executive',
    'Developer',
    'Event Coordinator',
    'Alumni',
];

export const strMapToObj = (strMap) => {
    const obj = Object.create(null);
    strMap.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

export const getStatus = (user) => {
    if (user.privelege_level === 'Unapproved_User') {
        return 'unapproved';
    }
    if (user.privelege_level === 'Approved_User') {
        return 'approved';
    }
    return 'admin';
};

export const objToStrMap = (obj) => {
    const strMap = new Map();
    Object.keys(obj).map((k) => strMap.set(k, obj[k]));
    return strMap;
};

export const getProperUser = (dUser) => {
    const pUser = {
        ...dUser,
        url: dUser.url === undefined ? new Map() : objToStrMap(dUser.url),
        join_year:
            dUser.join_year === null ? new Date() : new Date(dUser.join_year),
        grad_year:
            dUser.grad_year === null ? new Date() : new Date(dUser.grad_year),
        birth_date:
            dUser.birth_date === null ? new Date() : new Date(dUser.birth_date),
    };
    if (!pUser.url.has('fb_url')) {
        pUser.url.set('fb_url', '');
    }
    if (!pUser.url.has('github_url')) {
        pUser.url.set('github_url', '');
    }
    if (!pUser.url.has('picture_url')) {
        pUser.url.set('picture_url', '');
    }

    return pUser;
};
