const da = require('../data-access/payments');

const insertPayment = async (idStatement, totalAmount, tokenProvider, providerOrder, idPaymentMethod, idPaymentType) => {
    try {
        const data = await da.insertPayment(idStatement, totalAmount, tokenProvider, providerOrder, idPaymentMethod, idPaymentType);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { insertPayment }