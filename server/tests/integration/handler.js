/*
 * These are the most high level tests of the project.
 * They simply verify that the client will receive the correct response
 */

const assert = require('assert')
const sinon = require('sinon')
const handler = require('../../handler')
let config
try {
  config = require('./config.json')
} catch(e){
  console.log('[ERROR] in order to run the integration tests, create a file "tests/integrationconfig.json" WITH VALID INFORMATION')
  console.log(`
{
  "accessToken": "XXX",
  "walletId": "XXX",
  "walletPassword": "XXX",
  "destinationAddress": "XXX"
} 
  `)
  process.exit(1)
}

describe('serverless handler integration tests', () => {
  describe('success', () => {
    it('should execute a complete tx', async () => {
      try {
        process.env.BITGO_ACCESS_TOKEN = config.accessToken
        process.env.BITGO_WALLET_ID = config.walletId
        process.env.BITGO_WALLET_PASSWD = config.walletPassword
        const resp = await handler.SendBTC({
          body: {
            destinationAddress: config.destinationAddress
          }
        })
        assert.equal(resp.statusCode, 200)
      } catch(err) {
        throw err
      }
    })
    it('should fail because not access token was provided', async () => {
      try {
        process.env.BITGO_ACCESS_TOKEN = ''
        process.env.BITGO_WALLET_ID = config.walletId
        process.env.BITGO_WALLET_PASSWD = config.walletPassword
        const resp = await handler.SendBTC({
          body: {
            destinationAddress: config.destinationAddress
          }
        })
        assert.equal(resp.statusCode, 500)
      } catch(err) {
        throw err
      }
    })
    it('should fail because wallet id doesn\'t exist', async () => {
      try {
        process.env.BITGO_ACCESS_TOKEN = config.accessToken
        process.env.BITGO_WALLET_ID = 'notthere'
        process.env.BITGO_WALLET_PASSWD = config.walletPassword
        const resp = await handler.SendBTC({
          body: {
            destinationAddress: config.destinationAddress
          }
        })
        assert.equal(resp.statusCode, 500)
      } catch(err) {
        throw err
      }
    })
    it('should fail because destination address doesn\'t exist', async () => {
      try {
        process.env.BITGO_ACCESS_TOKEN = config.accessToken
        process.env.BITGO_WALLET_ID = config.walletId
        process.env.BITGO_WALLET_PASSWD = config.walletPassword
        const resp = await handler.SendBTC({
          body: {
            destinationAddress: 'incorrectaddr'
          }
        })
        assert.equal(resp.statusCode, 400)
        assert.equal(resp.body, 'Invalid destination address')
      } catch(err) {
        throw err
      }
    })
    it('should fail because wallet password is incorrect', async () => {
      try {
        process.env.BITGO_ACCESS_TOKEN = config.accessToken
        process.env.BITGO_WALLET_ID = config.walletId
        process.env.BITGO_WALLET_PASSWD = ''
        const resp = await handler.SendBTC({
          body: {
            destinationAddress: config.destinationAddress
          }
        })
        assert.equal(resp.statusCode, 500)
      } catch(err) {
        throw err
      }
    })
  })
})
