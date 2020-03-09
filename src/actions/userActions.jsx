import { userAPI } from '../data/api_links';

export const fetchUser = id => (dispatch) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(user => dispatch({
      type: 'FETCH_USER',
      payload: user,
    }));
};
