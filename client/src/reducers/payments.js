const paymentsReducerDefaultState = {};
const paymentsReducer = (state = paymentsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_MAKE_PAYMENT':
            console.log('GET_MAKE_PAYMENT')
            return action.result
        default:
            return state;
    }
};


export default paymentsReducer;