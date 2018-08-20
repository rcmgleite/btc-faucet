const faucet = require('./lib/faucet')
const BitGoJS = require('bitgo')

class BTCFaucet {
  constructor() { }

  async SendBTC(destinationAddress, amount) {
    const params = {
      accessToken: process.env.BITGO_ACCESS_TOKEN,
      srcWalletId: process.env.BITGO_WALLET_ID,
      srcWalletPassword: process.env.BITGO_WALLET_PASSWD,
      destinationAddress,
      amount,
    }

    // Inject the bitgo sdk to make lib/faucet testing easier
    const bitgo = new BitGoJS.BitGo({ env: 'test' }) 
    return await faucet.SendBTC(bitgo, params)
  }
}

module.exports = BTCFaucet
