# Credit-Analyze-Credit-Engine

## Overview
**Credit-Analyze-Credit-Engine** is a microservice that is part of the ecosystem of Credit-Analyze-Portal and Credit-Analyze-Invoice. Its primary role is to receive and process invoice data from the Credit-Analyze-Invoice service, performing validations based on predefined business rules. This service was developed using Node.js and TypeScript and is designed to run in a scalable, event-driven architecture using AWS services to ensure high availability and resilience.

## Key Features
- **Message Reception**: The service consumes messages containing invoice data from an SQS queue (`invoice-data-extracted.fifo`), which is populated by the Credit-Analyze-Invoice service after extracting key invoice information.
- **Validation Rules**: 
  - **Payment Date Validation**: The service checks if the payment date on the invoice is within the acceptable range (up to 4 months old from the current date). Invoices outside this range are automatically disapproved.
  - **CPF/CNPJ Validation**: It verifies if the CPF/CNPJ matches the customer's information.
- **Result Publication**: After validation, the service publishes the result (approved or disapproved) back to another SQS queue (`invoice-analysis-result.fifo`), which can be consumed by the frontend or other services in the ecosystem.

## Technologies Used
- **Node.js**: JavaScript runtime environment for server-side code execution.
- **TypeScript**: A superset of JavaScript that adds static typing, improving code robustness and maintainability.
- **Express**: A web framework that simplifies the creation of RESTful services.
- **AWS SQS**: A managed messaging service that decouples microservices and handles message delivery between the Credit-Analyze-Invoice and Credit-Analyze-Credit-Engine services.
- **AWS Lambda**: (Optional) Can be used to further decouple and scale the service, processing messages from SQS in a serverless fashion.

## Validation Logic
1. **Payment Date**: The system calculates the difference between the current date and the payment date extracted from the invoice. If the invoice is older than 4 months, it is marked as "Disapproved."
2. **Randomized Business Rules**: In order to simulate real-world credit analysis, a randomized approval or rejection mechanism is applied after the initial validations for testing purposes.

## Configuration
The Credit-Analyze-Credit-Engine service requires several environment variables for proper operation. These should be stored in a `.env` file in the root of the project:

```plaintext
#PORT
PORT=

#AWS
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

