import React, { useReducer } from "react";
import ElectionContext from './ElectionContext';
import ElectionReducer from './ElectionReducer'
import * as types from '../types';
import devote from "../../ethereum/devote";
import web3 from "../../ethereum/web3"

const ElectionState = props => {
    const initialState = {
        elections: null,
        curr: null,
        error: null
    };

    const [state, dispatch] = useReducer(ElectionReducer, initialState);

    const getElections = async () => {
        try {
            const electionList = await devote.methods.getElection().call();
            dispatch({ type: types.SET_ELECTION, payload: electionList })
        } catch (error) {
            console.log(error);
            dispatch({ type: types.ELECTION_ERROR, payload: error })
        }
    }

    const createElection = async (list, title) => {
        try {
            const accounts = await web3.eth.getAccounts();
            await devote.methods.createElection(list, title).send({ from: accounts[0], gas: '1500000' });
        } catch (error) {
            console.log(error);
            dispatch({ type: types.ELECTION_ERROR, payload: error });
            setTimeout(clearError, 3000);
        }
    }

    const clearError = () => {
        dispatch({ type: types.CLEAR_ERROR })
    }

    return <ElectionContext.Provider
        value={{
            elections: state.elections,
            curr: state.curr,
            error: state.error,
            getElections,
            createElection,
            clearError
        }}
    >
        {props.children};
    </ElectionContext.Provider>
};

export default ElectionState;