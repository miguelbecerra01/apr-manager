const Router = require('express-promise-router');
const router = new Router();
const _ = require('lodash');
const FlowApi = require('../flowapi/flowApi');
const flowApiConfig = require('../flowapi/config');
const { getApiHost } = request('../utils');

router.get('/payment/status', async (req, res) => {
    try {
        const body = _.pick(req.body, ['accountId, ticketNumber']);
        // const status = await getPaymentStatus();
    } catch (error) {
        return res.status(400).send(error);
    }
});