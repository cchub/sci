import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "./reducers";

export const store = createStore(Reducer, applyMiddleware(thunk));