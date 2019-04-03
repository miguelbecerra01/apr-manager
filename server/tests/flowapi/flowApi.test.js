const FlowApi = require('../../flowapi/flowApi');
const getFlowApiKeys = require('../../flowapi/config');
//https://github.com/flowcl/PHP-API-CLIENT

describe('FlowApi tests', () => {

    let service, params, method;

    beforeEach(() => {
        service = 'payment/createEmail';
        params = {
            commerceOrder: 1101,
            subject: 'Test Payment',
            currency: 'CLP',
            amount: 5000,
            email: 'miguelbecerra01@gmail.com',
            urlConfirmation: getFlowApiKeys('baseUrl') + '/payments/confirm',
            urlReturn: getFlowApiKeys('baseUrl') + '/payments/results',
            forward_days_after: 1,
            forward_times: 2
            // optional: {
            //     rut: '164924394',
            //     otroDato: 'dato'
            // }
        };

        method = 'POST';
    });

    test('Should call send function', async () => {
        await expect(FlowApi.send(service, params, method)).not.toBeUndefined();

    });


    test('Should return params', async () => {
        //does the params has the apiKey param?
        // await expect(FlowApi.send(service, params, method)).toMatchObject({ apiKey: getFlowApiKeys('apiKey') });

    });

});