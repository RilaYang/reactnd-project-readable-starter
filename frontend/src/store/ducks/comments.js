import { toastSuccess } from "./toastify";

// Action Types

export const Types = {
  FETCH_COMMENTS_SUCCESS: "comments/FETCH_COMMENTS_SUCCESS",
  FETCH_COMMENTS_FAIL: "comments/FETCH_COMMENTS_FAIL",
  FETCH_COMMENTS_START: "comments/FETCH_COMMENTS_START",
  UPDATE_VOTE_SCORE: "comments/UPDATE_VOTE_SCORE",
  DELETE_COMMENT_SUCCESS: "comments/DELETE_COMMENT_SUCCESS",
  UPDATE_COMMENT_SUCCESS: "comments/UPDATE_COMMENT_SUCCESS"
};

// Reducer

const initialState = {
  commentTable: {},
  isFetching: false
};

function updateTableVoteScore(table, commentId, voteScore) {
  return Object.keys(table).reduce((acc, cur) => {
    acc[cur] = (table[cur] || []).map(comment => {
      return comment.id === commentId
        ? { ...comment, voteScore: voteScore }
        : comment;
    });
    return acc;
  }, {});
}

function updateTableComment(table, newComment) {
  return Object.keys(table).reduce((acc, cur) => {
    acc[cur] = (table[cur] || []).map(comment => {
      return comment.id === newComment.id
        ? newComment
        : comment;
    });
    return acc;
  }, {});
}

function removeCommentFromTable(table, commentId) {
  const ret = Object.keys(table)
    .reduce((acc, cur) => {
        acc[cur] = (table[cur] || []).filter(comment => {
          return comment.id !== commentId;
        });
      return acc;
    }, {});
    return ret
}

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case Types.FETCH_COMMENTS_START:
      return { ...state, isFetching: true };
    case Types.FETCH_COMMENTS_SUCCESS:
      const commentTable = {
        ...state.commentTable,
        [payload.postId]: payload.comments
      };
      return { ...state, commentTable: commentTable, isFetching: false };
    case Types.FETCH_COMMENTS_FAIL:
      return { ...state, isFetching: false };
    case Types.UPDATE_VOTE_SCORE: {
      const commentTableUpdated = updateTableVoteScore(
        { ...state.commentTable },
        payload.id,
        payload.voteScore
      );
      return { ...state, commentTable: commentTableUpdated, isFetching: false };
    }
    case Types.DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        commentTable: removeCommentFromTable(
          { ...state.commentTable },
          payload.id
        )
      };
    }
    case Types.UPDATE_COMMENT_SUCCESS: {
      return {
        ...state,
        commentTable: updateTableComment(
          { ...state.commentTable },
          payload.comment
        )
      };
    }
    default: {
      return state;
    }
  }
}

// Action Creators

export const fetchCommentsStart = data => ({
  type: Types.FETCH_COMMENTS_START
});

export const fetchCommentsSuccess = data => ({
  type: Types.FETCH_COMMENTS_SUCCESS,
  payload: { postId: data.postId, comments: data.comments }
});

export const fetchCommentsFail = error => ({
  type: Types.FETCH_COMMENTS_FAIL,
  payload: { error }
});

export const updateVoteScore = (id, voteScore) => ({
  type: Types.UPDATE_VOTE_SCORE,
  payload: { id, voteScore }
});

export const deleteCommentSuccess = id => ({
  type: Types.DELETE_COMMENT_SUCCESS,
  payload: { id }
});

export const updateCommentSuccess = comment => ({
  type: Types.UPDATE_COMMENT_SUCCESS,
  payload: { comment }
});

// Async Action Creators

export const fetchComments = postId => (dispatch, getState, { api }) => {
  dispatch(fetchCommentsStart());
  return api.getComments(postId).then(resp => {
    resp.ok
      ? dispatch(fetchCommentsSuccess({ postId, comments: resp.data }))
      : dispatch(fetchCommentsFail(resp.problem));
  });
};

export const createComment = comment => (dispatch, getState, { api }) => {
  return api.createComment(comment).then(resp => {
    if (resp.ok) {
      const postId = comment.parentId;
      fetchComments(postId)(dispatch, getState, { api });
    }
  });
};

export const upVoteComment = id => (dispatch, getState, { api }) => {
  return api.upVoteComment(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null;
  });
};

export const downVoteComment = id => (dispatch, getState, { api }) => {
  return api.downVoteComment(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null;
  });
};

export const deleteComment = id => (dispatch, getState, { api }) => {
  return api.deleteComment(id).then(resp => {
    if (resp.ok) {
      dispatch(deleteCommentSuccess(id));
      dispatch(toastSuccess({ message: "Comment deleted!" }));
    }
  });
};

export const updateComment = comment => (dispatch, getState, { api }) => {
  return api.updateComment(comment).then(resp => {
    if (resp.ok) {
      dispatch(updateCommentSuccess(comment));
      dispatch(toastSuccess({ message: "Comment updated!" }));
    }
  });
};

// Selector

export const getComments = (state, postId) => {
  return state.commentTable[postId] || [];
};

export const getLatestComments = (state, postId) => {
  return getComments(state, postId)
    .slice()
    .sort(sortByLatest);
};

// util

const sortByLatest = (a, b) => {
  return b.timestamp - a.timestamp;
};
