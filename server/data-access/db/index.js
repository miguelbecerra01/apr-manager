const { Pool } = require('pg');

const pool = new Pool({
    user: 'apr_db_user',
    host: 'localhost',
    database: 'aprdb',
    password: 'password',
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};