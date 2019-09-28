import { EDIT_USER, FETCHING, CHANGE_LANG } from "../CONSTANTS";

const initialState = {
  user: {},
  fetching: false,
  isLogged: false
};

export default (rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER:
      console.log('reducer data')

     // console.log(action.value);
      return {
        ...state,
        user: action.value,
        fetching: false,
        isLogged: true
      };

    case FETCHING:
      return {
        ...state,
        fetching: action.value
      };
    case CHANGE_LANG:
      console.log(action.value)
      return {
        ...state,
        user: {
          ...state.user,
          language: action.value
        }
      };

    default:
      return state;
  }
});
