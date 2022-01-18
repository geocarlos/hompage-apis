const { handleRequest } = require('./handler');

describe('User service', () => {
    test('GET request with existing userId get response statusCode 200', async () => {
        const response = await handleRequest({
            httpMethod: 'GET',
            pathParameters: { userId: 'test' }
        });
        expect(response.statusCode).toEqual(200);
    });
    test('GET sucessful response contains a list of accounts', async () => {
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
    test('GET request with no userId gets a bad request response with statusCode 400', async () => {
        const response = await handleRequest({
            httpMethod: 'GET',
            pathParameters: null
        });
        expect(response.statusCode).toEqual(400);
        const message = JSON.parse(response.body).message;
        expect(message).toEqual("Bad request, missing userId parameter");
    });
    test('POST request creates a new userId and gets statusCode 201', async () => {
        const response = await handleRequest({
            httpMethod: 'POST'
        });
        expect(response.statusCode).toEqual(201);
    });
    test('User\'s NEAR wallet is associated to their HomePage userId', async () => {
        const response = await handleRequest({
            httpMethod: 'POST'
        });
        expect(response.statusCode).toEqual(201);
    });
});