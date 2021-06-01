import {
    all,
    takeLatest,
    delay,
    spawn,
    call,
    StrictEffect,
    put,
    select,
    take,
} from "redux-saga/effects";
import {
    ReducerActions,
    ReducerSelectors,
    ReducerTypes
} from "./reducer";

const {
    incrementAsyncSuccess,
    incrementAsyncError
} = ReducerActions;

async function acquireIncrement(amount) {
    return new Promise((resolve) =>
        setTimeout(() => resolve({ data: amount }), 500)
    );
}

export function* increment(amount) {
    try {
        const response = yield call(acquireIncrement, amount);
        put(incrementAsyncSuccess(response))
        return response;
    } catch (err) {
        yield put(incrementAsyncError("could not get increment amount"));
        return 0;
    }
}

export default function* root() {
    // root saga
    takeLatest(ReducerTypes.INCREMENT_ASYNC, increment)
}