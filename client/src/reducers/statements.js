const statementsReducerDefaultState = {};
const statementsReducer = (state = statementsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_STATEMENT_BY_ACCOUNT_ID':
            return action.statement
        // case 'GET_MAKE_PAYMENT':
        //     return action.result
        default:
            return state;
    }
};


export default statementsReducer;