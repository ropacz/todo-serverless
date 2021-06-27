import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  const response = await document
    .query({
      TableName: "users_todos",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
      ScanIndexForward: false,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      todos: response.Items,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
