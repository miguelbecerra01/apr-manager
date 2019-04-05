const da = require('../../data-access/payments');
const uuid = require('uuid');

describe('Tests for payment data-access', () => {
    let providerOrder, tokenProvider;
    beforeEach(() => {
        providerOrder = Math.floor((Math.random() * 1000) + 1);
        tokenProvider = uuid();
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

        const paymentOrderDetails = {
            providerOrder,
            datePayment: '12-12-2012',
            media: 'transbanc',
            conversionDate: '12-12-2012',
            conversionRate: 2.3,
            amount: 2000,
            fee: 21.2,
            balance: 2000,
            transferDate: '12-12-2012',
            tokenProvider
        }

        const data = await da.insertPaymentOrderDetails(paymentOrderDetails);

        expect(parseInt(data.rows[0].id)).toBeGreaterThan(0);
    });

    test('Should insert payments order info id into table, payments_order_info', async () => {
        const providerOrder = 74695;
        const idPaymentOrderDetails = await da.getPaymentOrderDetailsByProviderOrder(providerOrder);

        const paymentOrderInfo = {
            providerOrder,
            commerceOrder: '222222',
            requestDate: '2016-12-21 12:12:12',
            status: 4,
            subject: 'test payment',
            currency: 'CLP',
            amount: 2000,
            payer: 'miguelbecerra01@gmail.com',
            optional: 'optional info',
            pendingInfo: 'pending info',
            tokenProvider,
            idPaymentOrderDetails: idPaymentOrderDetails.id
        };

        const data = await da.insertPaymentOrderInfo(paymentOrderInfo);


        console.log('insertPaymentOrderInfo', data);
        expect(parseInt(data.rows[0].id)).toBeGreaterThan(0);

    });

    test('should retrive payments order info from table', async () => {
        const providerOrder = 74695;
        const data = await da.getPaymentOrderInfoByProviderOrder(providerOrder);
        expect(data.id).toBe(2);
    });

    test('Should insert payment into table payments ', async () => {

        const paymentTypes = await da.getPaymentTypes();
        const paymentMethods = await da.getPaymentsMethods();

        const idStatement = 1
        const totalAmount = 2000;
        const tokenProvider = tokenProvider;
        const providerOrder = 74695
        const idPaymentMethod = paymentMethods[0].id
        const idPaymentType = paymentTypes[0].id
        const trasaction_id = uuid();

        //delete data before insert it again
        await da.deletePaymentsListByIdStatement(idStatement);

        const data = await da.insertPayment(trasaction_id, idStatement, totalAmount, tokenProvider, providerOrder, idPaymentMethod, idPaymentType);
        expect(data.rowCount).toBe(1);

    });

    test('Should delete payment list by statement id', async () => {
        const idStatement = 1;
        const data = await da.deletePaymentsListByIdStatement(idStatement);
        expect(data.rowCount).toBeGreaterThan(0);
    });


});