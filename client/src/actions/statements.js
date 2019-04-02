import axios from 'axios';
import { getApiHost } from '../utils/';

export const getStatementByAccountId = (statement) => ({
    type: 'GET_STATEMENT_BY_ACCOUNT_ID',
    statement
});



export const startGetStatementByAccountId = (accountId) => {
    return (dispatch, getState) => {
        return axios.get(`${getApiHost()}/api/statements/account/${accountId}`)
            .then(res => {
                const statement = res.data;
                dispatch(getStatementByAccountId(statement))
            });
    }
}

export const getMakePayment = (result) => ({
    type: 'GET_MAKE_PAYMENT',
    result
});

export const startMakePayment = (accountId, totalAmount) => {
    return (dispatch) => {
        console.log(totalAmount);
        return axios.post(`${getApiHost()}/api/statements/payment`, { accountId, totalAmount })
            .then(res => {
                console.log(res.data);
                dispatch(getMakePayment(res.data));
            });
    };
};