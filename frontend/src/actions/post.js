import * as types from './ActionTypes';

const api = "http://localhost:3001";

const headers = {
  'Authorization': 'whatever-you-want'
};

export function getPosts() {
  return (dispatch) => {
    return fetch(`${api}/posts`, {
      headers
    }).then((res) => {
      return res.json();
    }).then((data) => {
      dispatch(getPostsSuccess(data))
    });
  }
}

function getPostsSuccess(posts) {
  return {
    type: types.GET_POST,
    posts
  }
}

export function getPostsDetail(id) {
  return (dispatch) => {
    return fetch(`${api}/posts/${id}`, {
      headers
    }).then((res) => {
      return res.json();
    }).then((data) => {
      dispatch(getPostsDetailSuccess(data))
    });
  }
}

function getPostsDetailSuccess(post) {
  return {
    type: types.GET_TARGET_POST,
    post
  }
}

export function getPostsComment(id) {
  return (dispatch) => {
    return fetch(`${api}/posts/${id}/comments`, {
      headers
    }).then((res) => {
      return res.json();
    }).then((data) => {
      dispatch(getPostsCommentSuccess(data))
    });
  }
}

function getPostsCommentSuccess(comments) {
  return {
    type: types.GET_POST_COMMENT,
    comments
  }
}

export const newPosts = (data) => {
  return (dispatch) => {
    return fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => dispatch(newPostSuccess(data)))
  }
};

function newPostSuccess(post) {
  return {
    type: types.POST_NEW_POST,
    post
  }
}
