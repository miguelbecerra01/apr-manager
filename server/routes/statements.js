const Router = require('express-promise-router');
const router = new Router();
const db = require('../data-access/db');

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
            return res.status(200).send({ error: 'NO_DATA_FOUND' });
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

router.post('/payment', async (req, res) => {
    try {
        console.log('llego');
        res.status(200).send({ ok: 'enviadoOK' })
    } catch (error) {
        res.status(400).send(error);
    }
});

