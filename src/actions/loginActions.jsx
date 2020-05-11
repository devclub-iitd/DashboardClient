import { loginAPI } from '../data/api_links';

const login = (dispatch) => (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const body = {
        email,
        password,
    };

    dispatch({
        type: 'POST_REGISTER',
        payload: fetch(loginAPI, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }),
    });
};

export default login;
