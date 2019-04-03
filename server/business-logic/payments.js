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

module.exports = { insertPayment, getPaymentTokenByTransactionId }