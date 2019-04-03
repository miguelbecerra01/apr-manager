const db = require('./db');

const insertPayment = async (transactionId, idStatement, totalAmount, tokenProvider, providerOrder, idPaymentMethod, idPaymentType) => {
    try {

        //insert into payments
        const insertPayment = (await db.query(`INSERT INTO payments (amount,id_payment_method,id_payment_type,token_provider,provider_order,id_payment_order_info, transaction_id)
                                              VALUES ($1,$2,$3,$4,$5,$6,$7)`, [
                totalAmount,
                idPaymentMethod,
                idPaymentType,
                tokenProvider,
                providerOrder,
                null,
                transactionId
            ]));


        if (insertPayment.rowCount === 1) {
            //insert into payment lists
            const dataPayments = await getPaymentsByProviderOrder(providerOrder);
            const insertPaymentList = await insertPaymentsLists(idStatement, dataPayments.id);
        };

        return insertPayment

    } catch (error) {
        throw new Error(error);
    }

};

const deletePaymentsListByIdStatement = async (idStatement) => {
    try {
        const data = (await db.query('DELETE FROM payments_list WHERE id_statement=$1', [idStatement]));
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getPaymentsByProviderOrder = async (providerOrder) => {
    try {
        const data = (await db.query('SELECT * FROM payments WHERE provider_order=$1', [providerOrder])).rows[0];
        return data;
    } catch (error) {
        throw new Error(error);
    }
};
const getPaymentsMethods = async () => {
    try {
        const data = (await db.query('SELECT id, description FROM payments_methods')).rows;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getPaymentTypes = async () => {
    try {
        const data = (await db.query('SELECT id, description FROM payments_types')).rows;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const insertPaymentOrderDetails = async (providerOrder, datePayment, media, conversionDate, conversionRate, amount, fee, balance, transferDate, tokenProvider) => {
    try {
        const data = (await db.query(`INSERT INTO payments_order_details (provider_order,date_payment,media,conversion_date,
                                     conversion_rate,amount,fee,balance,transfer_date,token_provider) 
                                    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [providerOrder, datePayment, media, conversionDate,
                conversionRate, amount, fee, balance, transferDate, tokenProvider]
        ));


        return data;
    } catch (error) {
        throw new Error(error);
    }
};


const insertPaymentOrderInfo = async (idPaymentOrderDetails, providerOrder, commerceOrder, requestDate, status, subject, currency, amount, payer, optional, pendingInfo, tokenProvider) => {
    try {

        const data = (await db.query(`INSERT INTO payments_order_info (id_payment_order_details,provider_order,commerce_order,
                                request_date,status,subject,currency,amount,payer,optional,pending_info,token_provider) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [idPaymentOrderDetails, providerOrder, commerceOrder, requestDate, status, subject, currency, amount, payer, optional, pendingInfo, tokenProvider]
        ));


        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const insertPaymentsLists = async (idStatement, idPayment) => {
    try {

        const data = (await db.query(`INSERT INTO payments_list (id_statement,id_payment) VALUES ($1,$2)`,
            [idStatement, idPayment]));

        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getPaymentOrderDetailsByProviderOrder = async (providerOrderId) => {

    try {
        const data = (await db.query(`SELECT id FROM payments_order_details WHERE provider_order=$1`,
            [providerOrderId])).rows[0];
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getPaymentOrderInfoByProviderOrder = async (providerOrder) => {
    try {
        const data = (await db.query('SELECT id FROM payments_order_info where provider_order=$1', [providerOrder])).rows[0];
        return data;

    } catch (error) {
        throw new Error(error);
    }
}


const getPaymentTokenByTransactionId = async (transactionId) => {
    try {
        const data = (await db.query('SELECT  token_provider FROM payments WHERE transaction_id=$1', [transactionId])).rows[0];
        return data;

    } catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    getPaymentsMethods,
    getPaymentTypes,
    getPaymentOrderDetailsByProviderOrder,
    getPaymentOrderInfoByProviderOrder,
    getPaymentsByProviderOrder,
    getPaymentTokenByTransactionId,
    insertPaymentsLists,
    insertPayment,
    insertPaymentOrderInfo,
    insertPaymentOrderDetails,
    deletePaymentsListByIdStatement
}; 