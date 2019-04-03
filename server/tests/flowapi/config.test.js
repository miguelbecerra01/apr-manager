const getFlowApiKeys = require('../../flowapi/config');

describe('Flow API config Tests', () => {
    test('Should return the api key when requesting it by name', () => {
        const value = 'apiKey';
        const apiKeyValue = getFlowApiKeys(value);
        expect(apiKeyValue).toBe('561CAF63-8541-4A2B-B358-4177LE323849');
    });

    test('Should return the secret key when requesting it by name', () => {
        const value = 'secretKey';
        const secretKey = getFlowApiKeys(value);
        expect(secretKey).toBe('571be3897ce58b80bd81fa7f398a6354a3bd7f78');
    });

    test('Should return the api url when requesting it by name', () => {
        const value = 'apiUrl';
        const apiUrl = getFlowApiKeys(value);
        expect(apiUrl).toBe('https://sandbox.flow.cl/api');
    });

    test('Should return the base url when requesting it by name', () => {
        const value = 'baseUrl';
        const baseUrl = getFlowApiKeys(value);
        expect(baseUrl).toBe('http://localhost:8080/statement/paymentready');
    });

});