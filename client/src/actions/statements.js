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
