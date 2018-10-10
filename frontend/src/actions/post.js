import * as type from './ActionType';
import PostList from './../components/PostList';

const api = "http://localhost:3001";

const headers = {
    'Authorization': 'whatever-you-want'
};

export function getPosts(){
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

function getPostsSuccess(posts){
    return{
        type: type.GET_POST,
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

function getPostsDetailSuccess(post){
    return{
        type: type.GET_TARGET_POST,
        post
    }
}

export function getPostsComment(id) {
    return (dispatch) => {
        return fetch(`${api}/posts/${id}/comments`, {
            headers
        }).then((res) => {
            return res.json();
        }).then ((data) => {
            dispatch(getPostsCommentSuccess(data))
        });
    }
}

function getPostsCommentSuccess(comments) {
    return {
        type: type.GET_POST_COMMENT,
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
        .then(res => res.json)
        .then(data => dispatch(newPostsSuccess(data)))
    }
}

function newPostsSuccess(post) {
    return {
        type: type.POST_NEW_POST,
        post
    }
}