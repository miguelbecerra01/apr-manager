const da = require('../data-access/payments');

const insertPayment = async (transactionId, idStatement, totalAmount, tokenProvider, providerOrder, idPaymentMethod, idPaymentType) => {
    try {
        const data = await da.insertPayment(transactionId, idStatement, totalAmount, tokenProvider, providerOrder, idPaymentMethod, idPaymentType);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getPaymentTokenByTransactionId = async (transactionId) => {
    try {
        const data = await da.getPaymentTokenByTransactionId(transactionId);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};


const insertPaymentOrderInfo = async (paymentOrderInfo) => {
    try {

        const data = (await da.insertPaymentOrderInfo(paymentOrderInfo)).rows[0];
        return data;
    } catch (error) {
        throw new Error(error);
    }
};


const insertPaymentOrderDetails = async (paymentOrderDetails) => {
    try {
        const data = (await da.insertPaymentOrderDetails(paymentOrderDetails)).rows[0];

        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const updatePaymentByTransactionId = async (transactionId, idPaymentOrderInfo) => {
    try {
        const data = (await da.updatePaymentByTransactionId(transactionId, idPaymentOrderInfo));

        return data;
    } catch (error) {
        throw new Error(error);
    }
};



module.exports = { insertPayment, insertPaymentOrderInfo, insertPaymentOrderDetails, getPaymentTokenByTransactionId, updatePaymentByTransactionId }