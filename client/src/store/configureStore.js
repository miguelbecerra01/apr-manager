import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import statementReducer from '../reducers/statements';
import paymentsReducer from '../reducers/payments';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    //Store Creation
    const store = createStore(
        //redux state
        combineReducers({
            auth: authReducer,
            statements: statementReducer,
            payments: paymentsReducer

        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};