const {
    getAllStatementsFromDb,
    getStatementsByIdFromDb,
    getStatementsByStatusFromDb,
    getStatementsByAccountIdFromDb,
    getStatementByAccountIdByStatusFromDb,
    getAccountByAccountIdFromDb,
    getReadingsByStatementIdFromDb,
    getChargesListByStatementIdFromDb,
    getSubsidiesListByAccountIdFromDb,
    getLastPaymentByAccountIdFromDb }
    = require('../data-access/statements');


const getAllStatements = async () => {
    const statements = await getAllStatementsFromDb();
    return statements;
};

const getStatementsById = async (id) => {
    const statements = await getStatementsByIdFromDb(id);
    return statements;
};

const getStatementsByStatus = async (status) => {
    const statements = await getStatementsByStatusFromDb(status);
    return statements;
};

const getStatementsByAccountId = async (accountId) => {
    const statements = await getStatementsByAccountIdFromDb(accountId);
    return statements;
};

const getStatementByAccountIdByStatus = async (accountId, status) => {
    const statements = await getStatementByAccountIdByStatusFromDb(accountId, status);
    return statements;
};



const getAccountByAccountId = async (accountId) => {
    const rows = await getAccountByAccountIdFromDb(accountId);

    return {
        idStatement: rows.id || '',
        idAccount: rows.id_account || '',
        streetName: rows.street_name || '',
        houseNumber: rows.house_number || '',
        sector: rows.sector || '',
        firstName: rows.first_name || '',
        lastName: rows.last_name || '',
        motherSurname: rows.mother_surname || '',
        orgType: rows.type || '',
        orgName: rows.description || '',
        status: rows.status || '',
        emissionDate: rows.emission_date || '',
        dueDate: rows.due_date || '',
        ticketNumber: rows.ticket_number || '',
        billingPeriod: rows.id_billing_period || ''
    };

};

const getReadingsByStatementId = async (statementId) => {
    const rows = await getReadingsByStatementIdFromDb(statementId);

    return {
        previousReading: rows.previuos_reading || 0,
        previousDate: rows.previous_created_at || '',
        currentReading: rows.current_reading || 0,
        currentDate: rows.current_created_at || '',
        totalConsumed: (rows.current_reading - rows.previuos_reading) || 0
    };
};

const getChargesListByStatementId = async (statementId) => {

    const rows = await getChargesListByStatementIdFromDb(statementId);

    const charges = [];

    rows.map((charge) => {
        charges.push({
            idCharge: charge.id,
            amount: charge.amount,
            idType: charge.charge_type,
            type: charge.description
        })
    });
    return charges;
};

const getSubsidiesListByAccountId = async (accountId) => {
    const rows = await getSubsidiesListByAccountIdFromDb(accountId);
    const subsidies = [];

    rows.map((subsidy) => {
        subsidies.push({
            idSubsidy: subsidy.id,
            amount: subsidy.amount,
            idType: subsidy.subsidy_type,
            type: subsidy.description
        });
    });
    return subsidies;
};

const getLastPaymentByAccountId = async (accountId) => {
    const rows = await getLastPaymentByAccountIdFromDb(accountId);

    return {
        ticketNumber: rows.ticket_number || '',
        amount: rows.amount || 0,
        date: rows.created_at || '',
        paymentMethod: rows.payment_method || '',
        paymentType: rows.payment_type || ''
    };
};


module.exports = {
    getAllStatements,
    getStatementsById,
    getStatementsByStatus,
    getStatementsByAccountId,
    getStatementByAccountIdByStatus,
    getAccountByAccountId,
    getReadingsByStatementId,
    getChargesListByStatementId,
    getSubsidiesListByAccountId,
    getLastPaymentByAccountId
}

