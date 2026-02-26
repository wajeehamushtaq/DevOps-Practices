## AWS Serverless CRUD: Lambda, DynamoDB, & API Gateway
This guide covers the end-to-end setup of a serverless backend using AWS.

1. Database Layer: Amazon DynamoDB
Resource: Create a DynamoDB Table.

Key Points:
Partition Key: The unique identifier (e.g., userId). Must be consistent between code and table.
Scaling: Choose "Provisioned" for predictable traffic or "On-Demand" for unknown traffic.
Consistency: Default reads are Eventually Consistent; use Strongly Consistent for immediate data accuracy.

2. Security Layer: IAM (Identity & Access Management)
Resource: IAM Policy and Execution Role.

Key Points:
Least Privilege: Only grant the specific actions needed (e.g., dynamodb:PutItem, dynamodb:Scan).
Resource ARN: Policies must point to the specific Table ARN (including region and Account ID).
Trust Relationship: The role must allow lambda.amazonaws.com to assume it.

3. Logic Layer: AWS Lambda
Resource: Lambda Function (Node.js).

Key Points:
Handler: The entry point for execution.
Proxy Response: When used with API Gateway, the response must include statusCode and a stringified body.
Logging: Use console.log() to send debug info to AWS CloudWatch Logs.
SDK v3: Use modular imports (e.g., @aws-sdk/client-dynamodb) to keep deployment packages small.

4. Interface Layer: Amazon API Gateway
Resource: REST API or HTTP API.

Key Points:
Triggers: Connects the external URL to your Lambda.
Deployment: Changes in API Gateway are not live until you click Deploy API to a specific Stage (e.g., default, prod).
Lambda Proxy Integration: Passes the entire HTTP request (headers, body, method) to Lambda as an event.

5. Troubleshooting Checklist
- 502 Bad Gateway / 500 Internal Server Error: Usually caused by an incorrect Lambda response format (missing statusCode or non-stringified body).
- AccessDeniedException: The IAM Role is missing permissions for the DynamoDB Action or the Resource ARN.
- 404 Not Found: The API Gateway URL is correct, but the Resource Path or Method (GET/POST) does not match.