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
            .then((res) => {
                console.log('startGetPaymentStatus');
                dispatch(getPaymentStatus(res.data));
            });
    }
}

export const startMakePayment = (idStatement, accountId, totalAmount, ticketNumber, idPaymentMethod, idPaymentType) => {
    return (dispatch) => {
        return axios.post(`${getApiHost()}/api/statements/payment`, { idStatement, accountId, totalAmount, ticketNumber, idPaymentMethod, idPaymentType })
            .then(res => {
                console.log('startMakePayment', res.data);
                const payments = res.data;
                dispatch(getMakePayment(payments));
            });
    };
};