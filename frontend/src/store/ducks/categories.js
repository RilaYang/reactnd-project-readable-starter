import capitalize from 'lodash/capitalize'

// Action Types

export const Types = {
  FETCH_CATEGORIES_SUCCESS: "categories/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAIL: "categories/FETCH_CATEGORIES_FAIL",
  FETCH_CATEGORIES_START: "categories/FETCH_CATEGORIES_START"
};

// Reducer

const initialState = {
  list: [],
  isFetching: false
};

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case Types.FETCH_CATEGORIES_START:
      return { ...state, isFetching: true };
    case Types.FETCH_CATEGORIES_SUCCESS:
      return { ...state, list: payload.list, isFetching: false };
    case Types.FETCH_CATEGORIES_FAIL:
      return { ...state, list: [], isFetching: false };
    default:
      return state;
  }
}

// Action Creators

export const fetchDataStart = data => ({
  type: Types.FETCH_CATEGORIES_START
});

export const fetchDataSuccess = data => ({
  type: Types.FETCH_CATEGORIES_SUCCESS,
  payload: { list: data }
});

export const fetchDataFail = error => ({
  type: Types.FETCH_CATEGORIES_FAIL,
  payload: { error }
});

// Async Action Creators

export const fetchCategories = () => (dispatch, getState, { api }) => {
  dispatch(fetchDataStart());
  return api.getCategories().then(resp => {
    resp.ok
      ? dispatch(fetchDataSuccess(resp.data.categories))
      : dispatch(fetchDataFail(resp.problem));
  });
};

// Selector

export const getCategoriesAsOptions = state => {
  return state.list.map(category => ({
    key: category.name, text: capitalize(category.name), value: category.name
  }));
};
