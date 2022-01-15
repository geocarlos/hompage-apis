const { handleRequest } = require('./handler');
jest.mock('aws-sdk');

describe('User service', () => {
    test('API responds to GET request with statusCode 200', async () => {
        const response = await handleRequest({
            httpMethod: 'GET',
            pathParameters: { userId: 'test' }
        });
        expect(response.statusCode).toEqual(200);
    });
    test('Sucessful response contains a list of accounts', async () => {
        // This is test is relevant, because it assures the Lambda is getting the data from
        // the Item attribute of the object returned by DynamoDB.
        const response = await handleRequest({
            httpMethod: 'GET',
            pathParameters: { userId: 'test' }
        });
        expect(response.statusCode).toEqual(200);
        const accounts = JSON.parse(response.body).accounts;
        expect(accounts).toBeTruthy();
        expect(Array.isArray(accounts)).toBe(true);
    });
    test('No userId gets a bad request response with statusCode 400', async () => {
        const response = await handleRequest({
            httpMethod: 'GET',
            pathParameters: null
        });
        expect(response.statusCode).toEqual(400);
        const message = JSON.parse(response.body).message;
        expect(message).toEqual("Bad request, missing userId parameter");
    });
});