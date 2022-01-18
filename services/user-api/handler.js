"use strict";
const AWS = require('../../libs/aws-sdk');

const USER_TABLE_NAME = process.env.USER_TABLE_NAME;

const db = new AWS.DynamoDB.DocumentClient();

const getUserInfo = async (userId) => {

  const params = {
    TableName: USER_TABLE_NAME,
    Key: {
      userId
    }
  }

  const {Item} = await db.get(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(Item)
  };
}

const addUserInfo = async () => {
  const params = {
    TableName: USER_TABLE_NAME
  }

  const result = db.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(result)
  }
}

module.exports.handleRequest = async (event) => {

  if (event && event.httpMethod === "GET") {
    const userId = event.pathParameters ? event.pathParameters.userId : null;
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Bad request, missing userId parameter"
        })
      }
    }

    return getUserInfo(userId);
  }

  if (event && event.httpMethod === "POST") {
    return addUserInfo();
  }

  return {
    statusCode: 400,
    body: JSON.stringify(
      {
        message: "Method not implemented",
        input: event,
      }
    ),
  };
};
