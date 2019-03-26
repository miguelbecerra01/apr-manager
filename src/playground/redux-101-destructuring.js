//https://redux.js.org/introduction/getting-started
import { createStore } from 'redux';

//Action generators -> functions that returns action object
//incrementBy if is empty it gets detault to 1, if there is not an object provided
//the default value is an empty object
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const setResetCount = () => ({
    type: 'RESET'
});

//Reducers 
//1.- Reducers are pure functions (not using variables outside of the scope of the function)
//2.- Never change state or action
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state;
    }
};

//to create a store whe need to call to createStore and pass it a function with state default values
//this runs inmediately and defines a state default
//define a default in the state
const store = createStore(countReducer);

//subscribe() watch for changes to the redux status state, when the store changes execute the function
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());

//unsubscribe() stops the store watcher, and dont execute the function anymore
//unsubscribe();

//calls decrements action to the count
store.dispatch(decrementCount());
//calls decrements action to the count
store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: 10 }));

//calls reset action
store.dispatch(setResetCount());