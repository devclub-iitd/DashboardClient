const initState = {
  item: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        item: action.payload,
      };
      // case NEW_POST:
      //     return {
      //         ...state,
      //         item: action.payload
      //     }
    default:
      return state;
  }
}
