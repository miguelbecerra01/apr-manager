
const getApiHost = (req) => {

    let host = process.env.ENV === 'development' ? '42745f4f.ngrok.io' : req.get('host');

    const fullUrl = req.protocol + '://' + host + req.originalUrl;
    let fullHost = req.protocol + '://' + host;
    fullHost = 'http://a85d308a.ngrok.io';
    return { fullUrl, fullHost }
};

const signHmac256 = (payload) => {

};


module.exports = { getApiHost }