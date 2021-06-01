import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    increment: null,
    decrement: null,
    incrementByAmount: ["data"],
    incrementAsync: ["data"],
    incrementAsyncSuccess: ["data"],
    incrementAsyncError: ["error"]
});

export const ReducerTypes = Types;
export default Creators;
export const ReducerActions = Creators;

/* ------------- Initial State ------------- */

// export type ReducerState = {
//   user?: User;
//   docs?: Record<string, unknown>;
//   userRequestActive: boolean;
//   getUserRequestError: string | null;
//   docsRequestActive: boolean;
//   getDocsRequestError: string | null;
// };

export const INITIAL_STATE = Immutable({
    value: 7,
    incrementAsyncValue: 0,
    incrementAsyncActive: false,
    incrementAsyncError: null
});

/* ------------- Selectors ------------- */

export const ReducerSelectors = {
    selectCount: (state) => {
        console.log("Calling selectCount: ", state.counter.value, state);
        return state.counter.value;
    },
    selectAsyncValue: (state) => { return state.counter.incrementAsyncValue; }
};

/* ------------- Reducers ------------- */

export const increment = state => {
    console.log("Reducer Increment");
    state.value += 1;
}

export const decrement = state => state.value -= 1;

export const incrementByAmount = (state, action) => state.value += action.data;

export const incrementAsync = (state, action) => state.merge({ incrementAsyncActive: true, incrementAsyncValue: action.data });

export const incrementAsyncSuccess = (state, action) => state.merge({ incrementAsyncActive: false, value: state.value + action.data, incrementAsyncValue: 0 });

export const incrementAsyncError = (state, action) => state.merge({ incrementAsyncActive: false, error: action.error, incrementAsyncValue: 0 });

// weird
export const incrementIfOdd = (amount) => (dispatch, getState) => {
    const currentValue = ReducerSelectors.selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.INCREMENT]: increment,
    [Types.DECREMENT]: decrement,
    [Types.INCREMENT_BY_AMOUNT]: incrementByAmount,
    [Types.INCREMENT_ASYNC]: incrementAsync,
    [Types.INCREMENT_ASYNC_SUCCESS]: incrementAsyncSuccess,
    [Types.INCREMENT_ASYNC_ERROR]: incrementAsyncError
});