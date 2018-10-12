import * as types from './ActionTypes';

const api = "http://localhost:3001";

const headers = {
  'Authorization': 'whatever-you-want'
};

export function getCategories() {
  return (dispatch) => {
    return fetch(`${api}/categories`, {
      headers
    }).then((res) => {
      return res.json();
    }).then((data) => {
      let categories = data.categories;
      categories.unshift({name:'all', path:'all'});
      dispatch(getCategoriesSuccess(categories))
    });
  }
}

export function getCategoriesSuccess(categories) {
  return {
    type: types.GET_CATEGORIES,
    categories
  }
}