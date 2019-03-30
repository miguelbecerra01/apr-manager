const db = require('./db');

const getAllStatementsFromDb = async () => {
    const { rows } = await db.query("SELECT * FROM statements");
    return rows;
};

const getStatementsByIdFromDb = async (id) => (
    (await db.query("SELECT * FROM statements where id=$1", [id])).rows
);

const getStatementsByStatusFromDb = async (status) => (
    (await db.query("SELECT * FROM statements WHERE status=$1", [status])).rows
);

const getStatementsByAccountIdFromDb = async (accountId) => {
    const data = (await db.query(`
                    select 1 as exist from statements s, accounts a 
                    where s.id_account = a.id 
                    and s.is_active 
                    and s.status='not-paid'
                    and a.id=$1`, [accountId])).rows;
    return data;
};

const getStatementByAccountIdByStatusFromDb = async (accountId, status) => (
    (await db.query(`select * from statements s, accounts a 
                    where s.id_account=a.id and a.id=$1 and s.status=$2`, [accountId, status])).rows
);


const getAccountByAccountIdFromDb = async (accountId) => (
    (await db.query(`
                    select 
                    s.id,
                    s.id_account,
                    a.street_name,
                    a.house_number,
                    a.sector,
                    u.first_name,
                    u.last_name,
                    u.mother_surname,
                    o.type,
                    o.description, 	
                    s.status,
                    s.emission_date,
                    s.due_date,	
                    s.ticket_number,
                    s.id_billing_period,
                    s.id_previous_statement
                    from statements s, accounts a, organizations o, users u, users_accounts ua
                    where s.id_account = a.id 
                    and a.id_organization = o.id 
                    and ua.id_account = a.id
                    and ua.id_user = u.id
                    and s.status = 'not-paid'
                    and s.is_active = true
                    and a.id =$1`, [accountId])).rows[0] || {}

);

const getReadingsByStatementIdFromDb = async (idStatement) => (
    (await db.query(`                             
                    select
                    (select value from readings where id=r.id_previous) as previuos_reading,
                    (select created_at from readings where id=r.id_previous) as previous_created_at,
                    r.value as current_reading,
                    r.created_at as current_created_at
                    from readings r, statements s
                    where s.id_reading = r.id and s.id=$1`, [idStatement])).rows[0] || {}

);

const getChargesListByStatementIdFromDb = async (idStatement) => (
    (await db.query(`        
            select c.id, ct.id as charge_type, c.amount, ct.description
            from charges c, statements_charges sc, 
            statements s, charges_types ct 
            where sc.id_charge=c.id and sc.id_statement=s.id and 
            c.id_charge_type=ct.id and s.id=$1`,
        [idStatement])).rows
);

const getSubsidiesListByAccountIdFromDb = async (accountId) => (
    (await db.query(`
            select sb.id,
                st.id as subsidy_type,
                sb.amount, 
                st.description 
            from subsidies sb, accounts a, subsidies_types st 
            where sb.id_account = a.id 
            and sb.id_subsidies_type = st.id
            and sb.is_active = true
            and a.id=$1`, [accountId])).rows
);

const getLastPaymentByAccountIdFromDb = async (accountId) => (
    (await db.query(`
             select p.id, s.ticket_number,p.amount,p.created_at,
                    p.id_payment_type, pt.description as payment_type,
                    p.id_payment_method,mp.description as payment_method
             from payments p, payments_list pl, statements s, payments_types pt, payments_methods mp, accounts a where 
                 pl.id_payment = p.id and 
                 pl.id_statement = s.id and 
                 p.id_payment_type = pt.id and
                 s.id_account=a.id and
                 s.status = 'paid' and
                 a.id=$1
             order by created_at desc
             limit 1`, [accountId])).rows[0] || {}
);

module.exports = {
    getAllStatementsFromDb,
    getStatementsByIdFromDb,
    getStatementsByStatusFromDb,
    getStatementsByAccountIdFromDb,
    getStatementByAccountIdByStatusFromDb,
    getAccountByAccountIdFromDb,
    getReadingsByStatementIdFromDb,
    getChargesListByStatementIdFromDb,
    getSubsidiesListByAccountIdFromDb,
    getLastPaymentByAccountIdFromDb
};