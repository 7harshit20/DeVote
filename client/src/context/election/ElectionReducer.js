import * as types from '../types';

const ElectionReducer = (state, action) => {

    if (action.type === types.SET_ELECTION) {
        return {
            ...state,
            elections: action.payload
        };
    }

    else if (action.type === types.REGISTER_FAILURE || action.type === types.LOAD_ERROR || action.type === types.LOGIN_FAILURE) {
        return {
            ...state,
            isAuthenicated: false,
            loading: false,
            error: action.payload,
            user: null
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