const assert = require('assert')
const sinon = require('sinon')
const BitGoJS = require('bitgo')
const faucet = require('../../lib/faucet')

describe('lib/faucet tests', () => {
  describe('Possible errors', () => {
    it('should return error as it will fail to authenticate ', async () => {
      const bitgo = new BitGoJS.BitGo({ env: 'test' }) 
      const bitgoMock = sinon.mock(bitgo)
      bitgoMock.expects('authenticateWithAccessToken').withArgs({
        accessToken: 'falsetoken'
      }).returns(new Promise((resolve, reject) => {
        return reject('unauthorized')
      }))

      try {
        await faucet.SendBTC(bitgo, {accessToken: 'falsetoken'})
      } catch(err) {
        assert.equal(err, 'unauthorized')
      }
    })
    it('should return error as as the wallet won\'t be found ', async () => {
      const bitgo = new BitGoJS.BitGo({ env: 'test' }) 
      const bitgoMock = sinon.mock(bitgo)

      // mocks
      bitgoMock.expects('authenticateWithAccessToken').withArgs({
        accessToken: 'falsetoken'
      }).returns(new Promise((resolve, reject) => {
        return resolve()
      }))
      bitgoMock.expects('coin').withArgs('tbtc').returns({
        wallets: () => {
          return {
            get: (walletId) => {
              return new Promise((resolve, reject) => {
                return reject('unable to find wallet')
              })
            }
          } 
        }
      })

      try {
        await faucet.SendBTC(bitgo, {accessToken: 'falsetoken'})
      } catch(err) {
        assert.equal(err, 'unable to find wallet')
      }
    })
  })
})
