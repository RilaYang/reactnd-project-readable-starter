import * as types from './ActionTypes';

const api = "http://localhost:3001";

const headers = {
  'Authorization': 'whatever-you-want'
};

export function addComment(data) {
  return (dispatch) => {
      return fetch(`${api}/comments`, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => dispatch(addCommentSuccess(data)))
    };
};

function addCommentSuccess(comment) {
  return {
    type: types.POST_ADD_COMMENT,
    comment 
  }
}
