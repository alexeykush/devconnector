import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
const middlewares = [thunk];

let store = null;

if (window.navigator.userAgent.includes("Chrome") && process.env.NODE_ENV === "development") {
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
} else {
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middlewares)
        )
    );
}


export default store;
