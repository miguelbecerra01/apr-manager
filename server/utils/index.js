
const getApiHost = (req) => {

    let host = process.env.ENV === 'development' ? '42745f4f.ngrok.io' : req.get('host');

    const fullUrl = req.protocol + '://' + host + req.originalUrl;
    let fullHost = req.protocol + '://' + host;
    fullHost = 'http://720b8efc.ngrok.io';
    return { fullUrl, fullHost }
};



module.exports = { getApiHost }