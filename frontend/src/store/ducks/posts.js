import _ from "lodash";
import { toastSuccess, toastError } from "./toastify";

// Action Types

export const Types = {
  FETCH_POSTS_SUCCESS: "posts/FETCH_POSTS_SUCCESS",
  FETCH_POSTS_FAIL: "posts/FETCH_POSTS_FAIL",
  FETCH_POSTS_START: "posts/FETCH_POSTS_START",
  UPDATE_VOTE_SCORE: "posts/UPDATE_VOTE_SCORE",
  UPDATE_SORT_BY: "posts/UPDATE_SORT_BY",
  CREATE_POST_SUCCESS: "posts/CREATE_POST_SUCCESS",
  DELETE_POST_SUCCESS: "posts/DELETE_POST_SUCCESS",
  UPDATE_POST_SUCCESS: "posts/UPDATE_POST_SUCCESS",
  FETCH_POST_SUCCESS: "posts/FETCH_POST_SUCCESS",
  FETCH_POST_FAIL: "posts/FETCH_POST_FAIL",
  FETCH_POST_START: "posts/FETCH_POST_START",
  UPDATE_POST_COMMENTS: "posts/UPDATE_POST_COMMENTS"
};

// Reducer

const initialState = {
  list: [],
  isFetching: false,
  sortBy: "voteScore_desc",
  activePost: null
};

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case Types.FETCH_POSTS_START:
      return { ...state, isFetching: true };
    case Types.FETCH_POSTS_SUCCESS:
      return { ...state, list: payload.list, isFetching: false };
    case Types.FETCH_POSTS_FAIL:
      return { ...state, list: [], isFetching: false };
    case Types.CREATE_POST_SUCCESS: {
      return { ...state, list: [...state.list, payload.post]}
    }
    case Types.UPDATE_VOTE_SCORE: {
      const updatedList = state.list.map(post => {
        return post.id === payload.id
          ? { ...post, voteScore: payload.voteScore }
          : post;
      });
      const updatedActivePost = state.activePost
        ? { ...state.activePost, voteScore: payload.voteScore }
        : null;
      return { ...state, list: updatedList, activePost: updatedActivePost };
    }
    case Types.DELETE_POST_SUCCESS: {
      return {
        ...state,
        list: state.list.filter(post => post.id !== payload.id)
      };
    }
    case Types.UPDATE_POST_SUCCESS: {
      const postIndex = state.list.findIndex(
        post => post.id === payload.post.id
      );
      return {
        ...state,
        list: [
          ...state.list.slice(0, postIndex),
          payload.post,
          ...state.list.slice(postIndex + 1)
        ],
        activePost: payload.post
      };
    }
    case Types.FETCH_POST_START:
      return { ...state, isFetching: true };
    case Types.FETCH_POST_SUCCESS:
      return { ...state, activePost: payload.post, isFetching: false };
    case Types.FETCH_POST_FAIL:
      return { ...state, activePost: null, isFetching: false };
    case Types.UPDATE_SORT_BY: {
      return {
        ...state,
        sortBy: payload.sortBy
      };
    }
    default:
      return state;
  }
}

// Action Creators

export const fetchPostsStart = data => ({
  type: Types.FETCH_POSTS_START
});

export const fetchPostsSuccess = data => ({
  type: Types.FETCH_POSTS_SUCCESS,
  payload: { list: data }
});

export const fetchPostsFail = error => ({
  type: Types.FETCH_POSTS_FAIL,
  payload: { error }
});

export const updateVoteScore = (id, voteScore) => ({
  type: Types.UPDATE_VOTE_SCORE,
  payload: { id, voteScore }
});

export const createPostSuccess = post => ({
  type: Types.CREATE_POST_SUCCESS,
  payload: { post }
})

export const deletePostSuccess = id => ({
  type: Types.DELETE_POST_SUCCESS,
  payload: { id }
});

export const updatePostSuccess = post => ({
  type: Types.UPDATE_POST_SUCCESS,
  payload: { post }
});

export const updateSortBy = sortBy => ({
  type: Types.UPDATE_SORT_BY,
  payload: { sortBy }
});

export const fetchPostStart = post => ({
  type: Types.FETCH_POST_START,
  payload: { post }
});

export const fetchPostSuccess = post => ({
  type: Types.FETCH_POST_SUCCESS,
  payload: { post }
});

export const fetchPostFail = () => ({
  type: Types.FETCH_POST_FAIL
});

// Async Action Creators

export const fetchPosts = category => (dispatch, getState, { api }) => {
  dispatch(fetchPostsStart());
  return api.getPosts(category).then(resp => {
    resp.ok
      ? dispatch(fetchPostsSuccess(resp.data))
      : dispatch(fetchPostsFail(resp.problem));
  });
};

export const upVotePost = id => (dispatch, getState, { api }) => {
  return api.upVotePost(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null;
  });
};

export const downVotePost = id => (dispatch, getState, { api }) => {
  return api.downVotePost(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null;
  });
};

export const createPost = post => async (dispatch, getState, { api }) => {
  try {
    const resp = await api.createPost(post)
    resp && resp.ok 
    ? dispatch(createPostSuccess(resp.data)) && dispatch(toastSuccess({ message: "Post create!" }))
    : dispatch(toastError({ message: "Post creation failed!" }))
  } catch (error) {
    dispatch(toastError({ message: error.message }))
  }
}

export const deletePost = id => (dispatch, getState, { api }) => {
  return api.deletePost(id).then(resp => {
    if (resp.ok) {
      dispatch(deletePostSuccess(id));
      dispatch(toastSuccess({ message: "Post deleted!" }));
    }
  });
};

export const updatePost = post => (dispatch, getState, { api }) => {
  return api.updatePost(post).then(resp => {
    if (resp.ok) {
      dispatch(updatePostSuccess(resp.data));
      dispatch(toastSuccess({ message: "Post updated!" }));
    }
  });
};

export const fetchPost = id => (dispatch, getState, { api }) => {
  dispatch(fetchPostStart());
  return api.getPost(id).then(resp => {
    return resp.ok && !_.isEmpty(resp.data)
      ? dispatch(fetchPostSuccess(resp.data))
      : dispatch(fetchPostFail());
  });
};

// Selector

export const getVisiblePosts = (state, category) => {
  const visiblePosts = state.list.filter(post => {
    if (post.deleted) return false;
    return category ? post.category === category : true;
  });
  return visiblePosts;
};

export const getSortedPosts = state => {
  const [field, order] = state.sortBy.split("_");
  const sorted = state.list.slice().sort((a, b) => {
    return order === "desc" ? b[field] - a[field] : a[field] - b[field];
  });
  return field === 'timestamp' ? sorted.reverse() : sorted
};

export const getSortedAndVisiblePosts = (state, category) => {
  const withVisiblePosts = { ...state, list: getVisiblePosts(state, category) };
  const withSortedPosts = {
    ...withVisiblePosts,
    list: getSortedPosts(withVisiblePosts)
  };
  return withSortedPosts.list;
};
