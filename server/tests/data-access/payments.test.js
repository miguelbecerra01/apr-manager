const da = require('../../data-access/payments');
const uuid = require('uuid');

describe('Tests for payment data-access', () => {
    let idPaymentOrderInfo;
    beforeEach(() => {
        idPaymentOrderInfo = Math.floor((Math.random() * 1000) + 1);
    });

    test('should retrieve payments methods data from table payments_methods', async () => {
        const data = await da.getPaymentsMethods();
        //console.log(data);
        expect(data.length).toBe(3);
    });

    test('should retrieve payments types data from table payments_types', async () => {
        const data = await da.getPaymentTypes();
        //console.log(data);
        expect(data.length).toBe(2);
    });

    test('Should insert payment order details id into table', async () => {
        const token = uuid();
        const data = await da.insertPaymentOrderDetails(idPaymentOrderInfo, token);
        expect(data.rowCount).toBe(1);
    });

    test('Should insert payments order info id into table, payments_order_info', async () => {
        const providerOrderId = 74695;
        const tokenProvider = uuid();
        const paymentOrderDetailId = await da.getPaymentOrderDetailsByProviderOrderId(providerOrderId);

        const data = await da.insertPaymentOrderInfo(paymentOrderDetailId.id, providerOrderId, tokenProvider);
        expect(data.rowCount).toBe(1);

    });


    // test('Should insert payment into table payments ', async () => {
    //     console.log(idPaymentOrderInfo);
    //     const idOrderInfo = await da.insertPaymentOrderInfoId(idPaymentOrderInfo);

    //     const paymentTypes = await da.getPaymentTypes();
    //     const paymentMethods = await da.getPaymentsMethods();

    //     const payment = {
    //         token: '123123slksadlkasd',
    //         idPaymentOrderInfo,
    //         amount: 4000,
    //         idPaymentMethod: paymentMethods[0].id,
    //         idPaymentType: paymentTypes[0].id
    //     }

    //     const data = await da.insertPayment(payment.token,
    //         payment.idPaymentOrderInfo,
    //         payment.amount,
    //         payment.idPaymentMethod,
    //         payment.idPaymentType);
    //     console.log(data);
    //     //expect(data.rowCount).toBe(1);


    // });

});