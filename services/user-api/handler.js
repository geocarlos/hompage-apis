"use strict";

const getUserInfo = async (userId) => {
  const user = {userId, accounts: ['test']}; // will be fetched from DynamoDB
  return {
    statusCode: 200,
    body: JSON.stringify(user)
  };
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
    return {
      statusCode: 400,
      body: 'Nothing'
    }
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
