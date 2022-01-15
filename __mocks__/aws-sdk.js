'use strict';

const AWS = jest.genMockFromModule('aws-sdk');

const mockDynamoDbPut = () => {
    return {
        promise() {
            return Promise.resolve({ Item: { userId: 'test' } });
        }
    };
};


const mockDynamoDbGet = () => {
    return {
        promise() {
            return Promise.resolve({Item: { userId: 'test', accounts: ['test'] }});
        }
    };
};

AWS.DynamoDB = {
    DocumentClient: jest.fn(() => ({
        get: mockDynamoDbGet,
        put: mockDynamoDbPut
    }))
}

module.exports = AWS;