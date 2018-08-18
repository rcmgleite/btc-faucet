## Faucet server
The server was designed to run on aws-lambda.

## Why aws-lambda?
The main responsibility of this server is to execute a function call using the bitgo sdk to create the donation transaction.

1. No sticky sessions needed.
2. No need to be worried about provisioning
3. Cold start is not a problem for this use case since the transaction itself can take a long time before finishing

## Testing locally
To test locally, use [serverless-offline](https://github.com/dherault/serverless-offline) project.
