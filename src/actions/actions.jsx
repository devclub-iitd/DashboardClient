import { postRegisterAPI } from '../data/api_links';

const postRegister = dispatch => (body) => {
  dispatch({
    type: 'POST_REGISTER',
    payload: fetch(postRegisterAPI, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
  });
};

export default postRegister;
