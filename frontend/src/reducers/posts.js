import * as type from '../actions/ActionType';
import update from 'react-addons-update';

const initState = {
    list: [],
    post: {},
    comments: []
};

export default function post(state, action) {
    if (typeof state === "undefined")
        state = initState;

    switch(action.type) {
        case type.GET_POST:
            return update(state, {
                list: { $set: action.posts }
            });

        case type.GET_TARGET_POST:
            return update(state, {
                post: { $set: action.post }
            });
        
        case type.GET_POST_COMMENT:
            return update(state, {
                comments: { $set: action.comments }
            });

        case type.POST_NEW_POST:
            return update(state, {
                list: {$push: [action.post]}
            });

        case type.POST_ADD_COMMENT:
            return update(state, {
                comments: {$push: [action.comment]}
            });

        default:
            return state;
    }
}