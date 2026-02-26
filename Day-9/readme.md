## Securing the Frontier (API Gateway Security & Cognito).

1. API Keys vs. Amazon Cognito
On the exam, you will be given scenarios and asked for the "Least Development Effort" or "Most Secure" solution.

Feature | API Keys | Amazon Cognito
Best For | "B2B |  Third-party developers |  Throttling." | "End-users (Mobile/Web apps) |  Login/Sign-up."
Security | Low (can be shared/leaked easily). | "High (JWT tokens |  MFA |  SRP)."
Usage Plans | Yes (Limit requests per second/month). | No (Requires custom logic).
Authentication | Identifies the Application. | Identifies the User.

2. Core Concept: Cognito User Pools vs. Identity Pools
This is a guaranteed exam question.

- User Pools (Authentication): "Who are you?" It handles sign-up, sign-in, and gives you a JWT Token.
- Identity Pools (Authorization): "What can you touch?" It exchanges a token for temporary AWS Credentials (IAM) so a user can upload directly to S3 or write to DynamoDB.

💡 DVA-C02 Exam Scenario
Scenario: A developer needs to provide different levels of access (Silver, Gold, Platinum) to an API for different customers.
Solution: Create multiple Usage Plans with different quotas and associate each customer's API Key with the appropriate plan.

-------------------------------------------------------------------------------------------------
## AWS API Gateway Security & Troubleshooting
This section covers the transition from an open API to a secured endpoint using API Keys and Usage Plans.

1. Securing the API with API Keys
To restrict access to specific clients and prevent unauthorized usage:

- Create API Key: Generate a unique key string in the API Gateway console under the API Keys section.
- Establish Usage Plan: Create a plan to define Throttling (requests per second) and Quotas (total requests per month) to protect your backend from being overwhelmed.
- Associate Resources: Link the API Key to the Usage Plan and then link the Usage Plan to your specific API Stage (e.g., default).
- Enable Requirement: On each API Method (GET/POST), set API Key Required to true in the Method Request settings.

2. Critical Configuration: API Key Source
A common "trap" that causes 403 Forbidden errors even when a key is provided:

- Key Source Setting: In the API Settings tab, ensure the API Key Source is set to HEADER.
- The Logic: If this is set to "Authorizer," API Gateway will ignore the x-api-key header, causing authentication to fail.
- Deployment: Any change to these settings requires a fresh API Deployment to the active stage to take effect.

3. Today's Learning: Troubleshooting "Missing Authentication Token"
This error is often a "False Positive" for authentication and usually indicates a routing issue:

- Path Mismatch: If the URL in Postman does not exactly match the Resource Path defined in AWS (e.g., /dynamo-lambda vs /Userss), AWS returns this error.
- Method Mismatch: Sending a GET request to a path where only a POST method is defined will trigger this error.
- Invoke URL Structure: The correct URL must follow the format: https://[api-id].execute-api.[region].amazonaws.com/[stage]/[resource].
- Stage vs. API ID: Always verify you are using the Invoke URL from the correct API ID, as having multiple test APIs can lead to hitting non-existent paths.

4. Postman Integration Key Points
- Headers: The API key must be sent in a header named exactly x-api-key.
- Content-Type: Ensure Content-Type: application/json is set for POST requests.
- 403 vs 502: A 403 error is a security/path issue (Gateway), while a 502 or 500 is usually a code/permission issue inside the Lambda function.

