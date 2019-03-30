const statements = require('./statements');

module.exports = (app) => {
    app.use('/api/statements', statements);
}; 