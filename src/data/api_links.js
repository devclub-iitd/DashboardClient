export const postRegisterAPI = 'http://localhost:3000/api/user/register/';
export const postManageUserAPI = 'http://localhost:3000/api/user/manage/';
// export const loginAPI = '/user/login/';

const rootAPI = 'http://localhost:3000/api/';

export const userAPI = `${rootAPI} + users/`;
export const getUnapprovedAPI = 'http://localhost:3000/api/user/unapproved/';

export const loginAPI = `${userAPI} + login/`;
export const registerAPI = `${userAPI} + signup/`;

export const eventAPI = `${rootAPI} + events/`;
export const projectAPI = `${rootAPI} + projects/`;
export const resourceAPI = `${rootAPI} + resources/`;

export const localhostAPI = 'localhost:3002/';
