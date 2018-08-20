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
  })
})
