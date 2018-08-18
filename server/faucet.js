const faucet = require('./lib/faucet')

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

    return await faucet.SendBTC(params)
  }
}

module.exports = BTCFaucet
