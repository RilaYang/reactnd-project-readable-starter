import * as type from './ActionType';

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