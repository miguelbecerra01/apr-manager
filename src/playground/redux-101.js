//https://redux.js.org/introduction/getting-started
import { createStore } from 'redux';

//to create a store whe need to call to createStore and pass it a function with state default values
//this runs inmediately and defines a state default
//define a default in the state
const store = createStore((state = { count: 0 }, action) => {

    switch (action.type) {
        case 'INCREMENT':
            //if it is a number use the incrementby value otherwise use 1
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + incrementBy
            };
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;

            return {
                count: state.count - decrementBy
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
});

//subscribe() watch for changes to the redux status state, when the store changes execute the function
const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});


//Actionss - object that gets sent to the store
//like walk, read, increment, decrement, etc, a action changes the store data
//increments the count
//calls an action defined in the createStore
store.dispatch({
    type: 'INCREMENT',
    incrementBy: 5
});

//unsubscribe() stops the store watcher, and dont execute the function anymore
//unsubscribe();

store.dispatch({
    type: 'INCREMENT'
});

//calls reset action
store.dispatch({
    type: 'RESET'
});

//calls decrements action to the count
store.dispatch({
    type: 'DECREMENT'
});


//calls decrements action to the count
store.dispatch({
    type: 'DECREMENT',
    decrementBy: 10
});

store.dispatch({
    type: 'SET',
    count:101
});