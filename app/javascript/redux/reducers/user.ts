import { ADD_TOKEN, REMOVE_TOKEN } from "../actionTypes";

const initialState = {
    token: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_TOKEN: {
            let {token} = action.payload
            return {
                ...state,
                token: token
            };
        }
        case REMOVE_TOKEN: {
            return {
                ...state,
                token: ""
            };
        }
        default:
            return state;
    };
};