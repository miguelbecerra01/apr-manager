const crypto = require('crypto');
const axios = require('axios');
const qs = require('qs'); //#qs
const getFlowApiKeys = require('./config');

const send = async (service, params, method = 'GET') => {
    try {
        method = method.toUpperCase();
        let url = `${getFlowApiKeys('apiUrl')}/${service}`;
        params.apiKey = getFlowApiKeys('apiKey');
        params = sort(params);
        let data = getPack(params, method);
        const signParams = sign(params);

        let res = '';
        let query = '';
        if (method === 'GET') {
            query = `${url}?${data}&s=${signParams}`;
            console.log(query);
            res = await axios.get(query);
            console.log(res);

        } else if (method === 'POST') {
            query = `${data}&s=${signParams}`;
            res = await axios.post(url, query);
        }



        return res;

    } catch (error) {
        return error.response;
    }
};

const getPack = (params, method) => {

    let data = '';
    if (method === 'GET') {
        data = encodeQuerystring(params, true);
    } else {
        data = encodeQuerystring(params, false);
    }
    return data;
};

const sort = (params) => {
    return Object.entries(params).sort().reduce((o, [k, v]) => {
        return (o[k] = v, o)
    }, {});
};


const sign = (params) => {
    let toSign = encodeQuerystring(params);


    //#hash_hmac
    let hmac = crypto.createHmac('sha256', getFlowApiKeys('secretKey'))
        .update(toSign)
        .digest('hex');

    return hmac;
};

const encodeQuerystring = (params, encode = false) => {

    const querystring = qs.stringify(params, { encode });
    // console.log(querystring);
    return querystring;
};




module.exports = { send };

//#looping_through_objects = https://zellwk.com/blog/looping-through-js-objects/
//#hash_hmac = https://nodejs.org/api/crypto.html#crypto_class_hmac
//#qs = https://github.com/ljharb/qs