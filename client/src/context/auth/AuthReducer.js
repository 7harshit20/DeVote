import * as types from '../types';

const AuthReducer = (state, action) => {

    if (action.type === types.REGISTER_SUCCESS || action.type === types.LOGIN_SUCCESS) {
        return {
            ...state,
            isAuthenicated: true,
            loading: false
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

    else if (action.type === types.LOAD_SUCCESS) {
        return {
            ...state,
            isAuthenicated: true,
            loading: false,
            user: action.payload
        }
    }

    else if (action.type === types.LOGOUT_SUCCESS) {
        return {
            ...state,
            isAuthenicated: false,
            loading: false,
            error: null,
            user: null,
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

    // switch (action.type) {
    //     case REGISTER_SUCCESS:
    //         return {
    //             ...state,
    //             ...action.payload,
    //             isAuthenicated: true,
    //             loading: false,
    //         };
    //     case REGISTER_FAILURE:
    //     case AUTH_ERROR:
    //     case LOGIN_FAILURE:
    //     case LOGOUT:
    //         localStorage.removeItem('token');
    //         return {
    //             ...state,
    //             token: null,
    //             isAuthenicated: false,
    //             loading: false,
    //             user: null,
    //             error: action.payload
    //         };
    //     case CLEAR_ERRORS:
    //         return {
    //             ...state,
    //             error: null
    //         }
    //     case USER_LOADED:
    //         return {
    //             ...state,
    //             isAuthenicated: true,
    //             loading: false,
    //             user: action.payload
    //         }
    //     default:
    //         return state;
    // }
}

export default AuthReducer;