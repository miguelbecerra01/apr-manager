import axios from 'axios';
import { getApiHost } from '../utils/';


export const getMakePayment = (result) => ({
    type: 'GET_MAKE_PAYMENT',
    result
});

export const getPaymentStatus = (payments) => ({
    type: 'GET_PAYMENT_STATUS',
    payments
});

export const startGetPaymentStatus = (transactionId) => {
    return (dispatch) => {
        return axios.get(`${getApiHost()}/api/statements/payment/status/${transactionId}`)
            .then(res => {
                dispatch(getPaymentStatus(res.data));
            }).catch(error => {
                console.log('error', error);
            });
    }
}

export const startMakePayment = (idStatement, accountId, totalAmount, ticketNumber, idPaymentMethod, idPaymentType) => {
    return (dispatch) => {
        return axios.post(`${getApiHost()}/api/statements/payment`, { idStatement, accountId, totalAmount, ticketNumber, idPaymentMethod, idPaymentType })
            .then(res => {
                const payments = res.data;
                dispatch(getMakePayment(payments));
            });
    };
};