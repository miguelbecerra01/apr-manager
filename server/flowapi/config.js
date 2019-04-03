const { getApiHost } = require('../utils');

const config = {
    apiKey: process.env.FLOW_API_KEY,
    secretKey: process.env.FLOW_SECRET_KEY,
    apiUrl: process.env.FLOW_API_URL,
};

const getFlowApiKeys = (name) => {

    return config[name];
};

module.exports = getFlowApiKeys