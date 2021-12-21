import * as types from '../types';

const ElectionReducer = (state, action) => {

    if (action.type === types.SET_ELECTION) {
        return {
            ...state,
            elections: action.payload
        };
    }

    else if (action.type === types.ELECTION_ERROR) {
        return {
            ...state,
            error: action.payload
        }
    }

    else if (action.type === types.CLEAR_ERROR) {
        return {
            ...state,
            error: null
        }
    }

    else {
        return state;
    }

}

export default ElectionReducer;