const statements = require('./statements');

module.exports = (app) => {
    app.use('/statements', statements);
};