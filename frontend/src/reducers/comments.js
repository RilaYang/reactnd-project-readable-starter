import { sortBy, addKey, addToList } from "./utils";

import {
  GET_COMMENTS,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  SELECT_POST
} from "../constants/ActionTypes";

const initialState = {
  list: [],
  selectedComments: []
};

const sortByVoteScore = list =>
  sortBy({ orderBy: "voteScore", direction: "desc", list });

const comment = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        list: sortByVoteScore(addKey(action.comments))
      };
    case SELECT_POST:
      return {
        ...state,
        selectedComments: sortByVoteScore(
          state.list.filter(comment => comment.parentId === action.postId)
        )
      };
    case CREATE_COMMENT:
      return {
        ...state,
        list: sortByVoteScore(addToList(state.list, action.comment)),
        selectedComments: sortByVoteScore(
          addToList(state.selectedComments, action.comment)
        )
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        list: sortByVoteScore(
          (state.list || []).reduce(
            (acc, val) =>
              action.comment.id === val.id
                ? [...acc, { ...action.comment, key: val.key }]
                : [...acc, val],
            []
          )
        ),
        selectedComments: sortByVoteScore(
          (state.selectedComments || []).reduce(
            (acc, val) =>
              action.comment.id === val.id
                ? [...acc, { ...action.comment, key: val.key }]
                : [...acc, val],
            []
          )
        )
      };
    case DELETE_COMMENT:
      return {
        ...state,
        list: sortByVoteScore(
          (state.list || []).filter(comment => comment.id !== action.comment.id)
        ),
        selectedComments: sortByVoteScore(
          (state.selectedComments || []).filter(
            comment => comment.id !== action.comment.id
          )
        )
      };
    default:
      return state;
  }
};

export default comment;
