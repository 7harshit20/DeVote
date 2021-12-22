import React, { useReducer } from "react";
import ElectionContext from './ElectionContext';
import ElectionReducer from './ElectionReducer'
import * as types from '../types';
import devote from "../../ethereum/devote";
import web3 from "../../ethereum/web3"
import electionFunc from "../../ethereum/election";

const ElectionState = props => {
    const initialState = {
        elections: null,
        curr: null,
        error: null,
        loading: false
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
            dispatch({ type: types.SET_LOADING, payload: true });
            const accounts = await web3.eth.getAccounts();
            await devote.methods.createElection(list, title).send({ from: accounts[0] });
            dispatch({ type: types.SET_LOADING, payload: false });
        } catch (error) {
            console.log(error);
            dispatch({ type: types.SET_LOADING, payload: false });
            dispatch({ type: types.ELECTION_ERROR, payload: error });
            setTimeout(clearError, 3000);
        }
    }

    const currElection = async address => {
        try {
            const curr = electionFunc(address);
            const details = await curr.methods.details().call()
            dispatch({ type: types.SET_CURR, payload: details })
        } catch (error) {
            console.log(error);
            dispatch({ type: types.ELECTION_ERROR, payload: error });
            setTimeout(clearError, 3000);
        }
    }

    const voteCurr = async (address, uniqueId, index) => {
        try {
            dispatch({ type: types.SET_LOADING, payload: true });
            const accounts = await web3.eth.getAccounts();
            const curr = electionFunc(address);
            await curr.methods.vote(uniqueId, index).send({ from: accounts[0] })
            dispatch({ type: types.SET_LOADING, payload: false });
        } catch (error) {
            console.log(error);
            dispatch({ type: types.SET_LOADING, payload: false });
            dispatch({ type: types.ELECTION_ERROR, payload: error });
            setTimeout(clearError, 3000);
        }
    }

    const nominateCurr = async (address, name, party) => {
        try {
            dispatch({ type: types.SET_LOADING, payload: true });
            const accounts = await web3.eth.getAccounts();
            const curr = electionFunc(address);
            await curr.methods.nominate(name, party).send({ from: accounts[0] })
            dispatch({ type: types.SET_LOADING, payload: false });
        } catch (error) {
            console.log(error);
            dispatch({ type: types.SET_LOADING, payload: false });
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
            loading: state.loading,
            getElections,
            createElection,
            clearError,
            currElection,
            voteCurr,
            nominateCurr
        }}
    >
        {props.children};
    </ElectionContext.Provider>
};

export default ElectionState;