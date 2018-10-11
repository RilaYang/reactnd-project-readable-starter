import * as type from '../actions/ActionType';
import update from 'react-addons-update';

const initState = {
    list: []
};

export default function categories(state, action) {
    if (typeof state === "undefined")
        state = initState;

    switch (action.type) {
        case type.GET_CATEGORIES:
            return update(state, {
                list: { $set: action.categories }
            });
        
        default:
            return state;
    }
}