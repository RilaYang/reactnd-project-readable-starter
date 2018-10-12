import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initState = {
  list: []
};

export default function categories(state, action) {
  if (typeof state === "undefined")
    state = initState;

  switch(action.type) {
    case types.GET_CATEGORIES:
      return update(state, {
        list: { $set: action.categories }
      });
    default:
      return state;
  }
}