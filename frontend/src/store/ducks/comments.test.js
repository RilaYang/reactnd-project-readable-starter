import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";

import {
  default as reducer,
  Types
  // fetchPosts,
  // upVotePost,
  // downVotePost,
  // getVisiblePosts,
  // deletePost,
  // getSortedPosts,
  // getSortedAndVisiblePosts
} from "./comments";

describe("Comment Duck", () => {
  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares);

  const mockList = [
    {
      id: "cjf3769pb0000OK__nfr39msy",
      timestamp: 1521764301215,
      body: "Comment 1",
      author: "Annon",
      parentId: "cjf31kx230002OK__ivexdd4l",
      voteScore: 2,
      deleted: false,
      parentDeleted: false
    },
    {
      id: "cjf376d980001OK__d8u0i0ug",
      timestamp: 1521764305820,
      body: "Comment 2",
      author: "Annon",
      parentId: "cjf31kx230002OK__ivexdd4l",
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    },
    {
      id: "cjf376d980001OK__d8u0ifug",
      timestamp: 1521764305820,
      body: "Comment 3 - Deleted",
      author: "Annon",
      parentId: "cjf31kx230002OK__ivexdd4l",
      voteScore: 1,
      deleted: true,
      parentDeleted: false
    }
  ];

  describe("comment reducer", () => {
    it("should return an function by default", () => {
      const actual = typeof reducer;
      const expected = "function";
      expect(actual).toBe(expected);
    });

    it("should return the initial state", () => {
      const actual = reducer(undefined, {});
      const expected = {
        commentTable: {},
        isFetching: false
      };
      expect(actual).toEqual(expected);
    });

    it("should handle FETCH_COMMENTS_SUCCESS", () => {
      const action = {
        type: Types.FETCH_COMMENTS_SUCCESS,
        payload: { postId: 'cjf31kx230002OK__ivexdd4l', comments: mockList }
      };

      const actual = reducer(undefined, action);
      const expected = {
        isFetching: false,
        commentTable:{
          'cjf31kx230002OK__ivexdd4l': mockList
        }
      };
      expect(actual).toEqual(expected);
    });

  });
});
