const Router = require('express-promise-router');
const router = new Router();
const _ = require('lodash');
const FlowApi = require('../flowapi/flowApi');
const getFlowApiKeys = require('../flowapi/config');
const { getApiHost } = require('../utils');

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

    const obj = {
        status: status,
        accountId: body.accountId,
        ticketNumber: body.ticketNumber
    };


    return Buffer(JSON.stringify(obj)).toString('base64');
    // return Buffer(`status=${status}&accountId=${encodeURI(body.accountId)}&ticketNumber=${encodeURI(body.ticketNumber)}`).toString('base64');
};

router.post('/payment', async (req, res) => {
    try {

        const body = _.pick(req.body, ['accountId', 'totalAmount', 'ticketNumber']);

        if (!body.accountId || !body.totalAmount || !body.ticketNumber) {
            return res.status(400).send('bad request');
        }


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

            console.log('response.data.token', response.data.token);

            return res.status(200).send({ message });

            //TODO: update the payment into DB

        } else if (response.status === 400 || response.status === 401) {
            return res.status(400).send({ error: response.statusText });
        } else {
            throw new Error('Unexpected error ocurred. HTTP_CODE', response.status);
        }

    } catch (error) {
        return res.status(400).send({ error });
    }
});

