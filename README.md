# BTC faucet
This project is a simple implementation of a btc testnet faucet written in nodejs.

## Project structure

### server
  An aws-lambda function that uses the bitgo library to transfer coins

### ui
  A react frontend to make it possible for non-programmers to interact with the faucet API.

### cli
  A cliente that just wrapps the server API calls.
  This cliente was created to make developers life easier when requesting btc for tesing.

### bitcoin-data
  This folder contains the configuration file needed to start a bitcoin node using bitcore.
  This is needed if the faucet wallet needs to be filled with btcs.
  Of course you could also find other faucets and requests coins from them.
