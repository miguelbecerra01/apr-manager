
const getApiHost = (req) => {

    const host = process.env.ENV === 'development' ? 'localhost:8080' : req.get('host');

    const fullUrl = req.protocol + '://' + host + req.originalUrl;
    const fullHost = req.protocol + '://' + host;
    return { fullUrl, fullHost }
};

const signHmac256 = (payload) => {

};


module.exports = { getApiHost }