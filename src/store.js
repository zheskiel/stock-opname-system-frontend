import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

// Redux dev tool extension
const isNotProduction = process.env.NODE_ENV !== "production";
const isWindowNotUndefined = typeof window !== "undefined";
const ReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const isReduxDevToolEnabled =
  isNotProduction && isWindowNotUndefined && ReduxDevTools;
const composeEnhancers = isReduxDevToolEnabled || compose;

const persistConfig = {
  key: "root",
  storage,
  debug: false,
  stateReconciler: autoMergeLevel2,
  whitelist: ["auth"],
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

const store = createStore(
  persistedReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export const persistor = persistStore(store);
export default store;
