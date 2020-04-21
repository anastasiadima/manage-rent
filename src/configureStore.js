import rootReducer  from "../src/reducers/reducer";
import {createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {fetchPlans} from "./actions/actions"

const configureStore = () => {
    const store = createStore(
        rootReducer, 
        undefined,
        compose(
            applyMiddleware(thunk),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
          )
    );

    store.dispatch(fetchPlans());    
    return store;
}

export default configureStore;

  