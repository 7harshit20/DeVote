import * as types from '../types';

const ElectionReducer = (state, action) => {
    const { payload } = action

    if (action.type === types.SET_ELECTION) {
        return {
            ...state,
            elections: payload,
            curr: null
        };
    }

    else if (action.type === types.SET_CURR) {
        return {
            ...state,
            curr: payload
        };
    }

    else if (action.type === types.SET_LOADING) {
        return {
            ...state,
            loading: payload
        }
    }

    else if (action.type === types.ELECTION_ERROR) {
        return {
            ...state,
            error: payload
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