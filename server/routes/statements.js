const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

//get all statements
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM statements");
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query("SELECT * FROM statements where id=$1", [id]);
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        const { rows } = await db.query("SELECT * FROM statements WHERE status=$1", [status]);
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/member/:memberId', async (req, res) => {
    try {
        const { memberId } = req.params;
        const { rows } = await db.query("SELECT * FROM statements WHERE id_member=$1", [memberId]);
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/member/:memberId/status/:status', async (req, res) => {
    try {
        const { memberId, status } = req.params;
        const { rows } = await db.query("SELECT * FROM statements WHERE id_member=$1 and status=$2", [memberId, status]);
        res.status(200).send(rows);
    } catch (error) {
        res.status(400).send(error);
    }
});

