/* eslint-disable import/prefer-default-export */
export const getUserFromLS = () => {
    const userOb = JSON.parse(localStorage.getItem('currentUser'));
    console.log(userOb);
};

export const strMapToObj = (strMap) => {
    const obj = Object.create(null);
    strMap.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
};

export const objToStrMap = (obj) => {
    const strMap = new Map();
    // for (const k of Object.keys(obj)) {
    //   strMap.set(k, obj[k]);
    // }
    // console.log('url object: ', obj);
    Object.keys(obj).map((k) => strMap.set(k, obj[k]));
    // console.log('mapped url: ', strMap);
    return strMap;
};

export const getProperUser = (dUser) => {
    const pUser = {
        ...dUser,
        url: objToStrMap(dUser.url),
        join_year:
            dUser.join_year === null ? new Date() : new Date(dUser.join_year),
        grad_year:
            dUser.grad_year === null ? new Date() : new Date(dUser.grad_year),
        birth_date:
            dUser.birth_date === null ? new Date() : new Date(dUser.birth_date),
    };
    // console.log('fetched user: ', pUser);
    if (!pUser.url.has('fb_url')) {
        pUser.url.set('fb_url', '#');
    }
    if (!pUser.url.has('github_url')) {
        pUser.url.set('github_url', '#');
    }
    if (!pUser.url.has('picture_url')) {
        pUser.url.set('picture_url', '#');
    }

    return pUser;
};
