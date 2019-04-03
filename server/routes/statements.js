const Router = require('express-promise-router');
const router = new Router();
const _ = require('lodash');
const FlowApi = require('../flowapi/flowApi');
const getFlowApiKeys = require('../flowapi/config');
const { getApiHost } = require('../utils');
const uuid = require('uuid');

const { getAllStatements,
    getStatementsById,
    getStatementsByStatus,
    getStatementsByAccountId,
    getStatementByAccountIdByStatus,
    getAccountByAccountId,
    getReadingsByStatementId,
    getChargesListByStatementId,
    getSubsidiesListByAccountId,
    getLastPaymentByAccountId
} = require('../business-logic/statements');

const blPayments = require('../business-logic/payments');

module.exports = router;

//get all statements
router.get('/', async (req, res) => {
    try {
        const statements = await getAllStatements();
        res.status(200).send(statements);
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const statements = await getStatementsById(id);

        res.status(200).send(statements);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const statements = await getStatementsByStatus(status);

        res.status(200).send(statements);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/account/:accountId', async (req, res) => {

    try {
        const { accountId } = req.params;
        const statements = await getStatementsByAccountId(accountId);

        if (statements.length === 0) {
            return res.status(200).send({ status: 'NO_DATA_FOUND' });
        }

        const account = await getAccountByAccountId(accountId);
        const readings = await getReadingsByStatementId(account.idStatement)
        const charges = await getChargesListByStatementId(account.idStatement);
        const subsidies = await getSubsidiesListByAccountId(accountId);
        const lastPayment = await getLastPaymentByAccountId(accountId);

        const paymentByConsumption = {
            charges,
            subsidies
        }

        const statement = {
            account,
            readings,
            paymentByConsumption,
            lastPayment
        };

        res.status(200).send(statement);
    } catch (error) {
        res.status(400).send({ error: error });
    }

});


router.get('/account/:accountId/status/:status', async (req, res) => {
    try {
        const { accountId, status } = req.params;

        const statements = await getStatementByAccountIdByStatus(accountId, status);
        res.status(200).send(statements);
    } catch (error) {
        res.status(400).send(error);
    }
});

const getUrlResponseEncoded = (body, status) => {

    // const obj = {
    //     trasction_id: body.transactionId,
    //     status: status,
    //     idStatement: body.idStatement,
    //     accountId: body.accountId,
    //     ticketNumber: body.ticketNumber
    // };

    return body.transactionId;
    // return Buffer(JSON.stringify(obj)).toString('base64');
    // return Buffer(`status=${status}&accountId=${encodeURI(body.accountId)}&ticketNumber=${encodeURI(body.ticketNumber)}`).toString('base64');
};

router.post('/payment', async (req, res) => {
    try {

        const body = _.pick(req.body, ['idStatement', 'accountId', 'totalAmount', 'ticketNumber', 'idPaymentMethod', 'idPaymentType']);


        if (!body.accountId || !body.totalAmount || !body.ticketNumber) {
            return res.status(400).send('bad request - needs more fields');
        }

        body.transactionId = uuid();

        const urlPaymentResultsPage = '/statements/payment/';
        //        console.log(getApiHost(req).fullHost + urlPaymentResultsPage + getUrlResponseEncoded(body, 'confirmed'));

        const service = 'payment/create';
        const random = Math.floor((Math.random() * 1000) + 100);
        const params = {
            commerceOrder: random,//body.ticketNumber,
            subject: 'Pago cuenta cliente Id: ' + body.accountId,
            currency: 'CLP',
            amount: body.totalAmount,
            paymentMethod: 1,
            email: 'miguelbecerra01@gmail.com',
            urlConfirmation: getApiHost(req).fullHost + urlPaymentResultsPage + 'success' + getUrlResponseEncoded(body, 'confirmed'),
            urlReturn: getApiHost(req).fullHost + urlPaymentResultsPage + getUrlResponseEncoded(body, 'declined'),
            forward_days_after: 1,
            forward_times: 2
        };

        const method = 'POST';
        const response = await FlowApi.send(service, params, method);

        if (response.status === 200) {

            const url = response.data.url + '?token=' + response.data.token;
            const message = {
                flowResponse: response.data,
                urlPayment: url
            };

            const insertPaymentStatus = await blPayments.insertPayment(body.transaction_id, body.idStatement, body.totalAmount, response.data.token, response.data.flowOrder, 1, 2);

            return res.status(200).send({ message });

        } else if (response.status === 400 || response.status === 401) {
            return res.status(400).send({ error: response.statusText });
        } else {
            return res.status(400).send({ error: 'Unexpected error ocurred. HTTP_CODE' + response.status });
        }

    } catch (error) {
        return res.status(400).send({ error });
    }
});

router.get('/payment/status/:transactionId', async (req, res) => {
    console.log('/payment/status/:transactionId');
    const { transactionId } = req.params;
    console.log(transactionId);
    //consultar a la bd el token de la transaccion.
    const paymentData = await blPayments.getPaymentTokenByTransactionId(transactionId);
    const serviceUrl = 'payment/getStatus';
    const method = 'GET';
    const params = {
        token: paymentData.token_provider
    }

    console.log(paymentData.token_provider);
    let response = {};

    response = await FlowApi.send(serviceUrl, params, method);
    console.log(response.data);
    if (response.status === 200) {
        console.log(response.data);
        return res.status(200).send(response.data);

    } else if (response.status === 400 || response.status === 401) {
        return res.status(400).send({ error: response.statusText });
    } else {
        return res.status(400).send({ error: 'Unexpected error ocurred. HTTP_CODE ' + response.status });
    }

    return res.status(200).send(transactionId);
});

