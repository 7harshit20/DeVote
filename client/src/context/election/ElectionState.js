import React, { useReducer } from "react";
import ElectionContext from './ElectionContext';
import ElectionReducer from './ElectionReducer'
import * as types from '../types';
import devote from "../../ethereum/devote";

const ElectionState = props => {
    const initialState = {
        elections: null,
        curr: null,
    };

    const [state, dispatch] = useReducer(ElectionReducer, initialState);

    const getElections = async () => {
        try {
            const electionList = await devote.methods.getElection().call();
            dispatch({ type: types.SET_ELECTION, payload: electionList })
        } catch (error) {
            console.log(error);
            // dispatch({ type: types.ELECTION_ERROR, payload: error })
        }
    }


    return <ElectionContext.Provider
        value={{
            elections: state.elections,
            loading: state.loading,
            user: state.user,
            error: state.error,
            getElections
        }}
    >
        {props.children};
    </ElectionContext.Provider>
};

export default ElectionState;