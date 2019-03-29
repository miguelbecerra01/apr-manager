//https://www.npmjs.com/package/uuid
import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//Actions 
// ADD_EXPENSE
const addExpense = (
    { description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});


// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = (startDate = '') => ({
    type: 'SET_START_DATE',
    startDate
});
// SET_END_DATE
const setEndDate = (endDate = '') => ({
    type: 'SET_END_DATE',
    endDate
});

//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense);
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            //we need to destructure the array of objects in order to filter by id, otherwise it wont work    
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            //loop througth every item on the array
            return state.map((expense) => {
                if (expense.id === action.id) {
                    //spread operator for override the object with new values
                    //const expenseEdited = {...expense,...action.updates};
                    //return expenseEdited;
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

//Filter Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            //return a new object overriding filtersReducerDefaultState to the action
            //which is the text value
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
    // if (state !== action) {
    //     return {
    //         ...state,
    //         ...action
    //     }
    // }
    // return state;
};

//Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = (expense.description.toLowerCase()).includes(text.toLowerCase());

        //if is a match
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            //sort descending
            return a.createdAt < b.createdAt ? 1 : -1;
        }
            //sort descending
        if (sortBy === 'amount') {
            //if is true b comes first if is false a comes first
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//Store Creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 1000, createdAt: 5000 }));
const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 30, createdAt: 11000 }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 15, note: 'from starbucks' }));

// const expenseRemoved = store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(addExpense({ description: 'Bus', amount: 3 }));

//store.dispatch(setTextFilter('coffee'));

 store.dispatch(sortByAmount());

//store.dispatch(sortByDate());


//store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(1300));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: '213sd',
        description: 'March Rent',
        note: 'This is my payment',
        amount: '204000',
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};


//test ES6 spread
// const user = {
//     name: 'paula',
//     age: 23
// };
//babel plugin transform object rest spread used to get this ES6 feature
//console.log({ ...user, location: 'asd', age: 33 });
