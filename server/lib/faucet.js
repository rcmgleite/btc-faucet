const Promise = require('bluebird')
const logger = require('../../utils/logger')
const coin = 'tbtc' // currently only supporting tbtc. This could be a config

/*
 *  Wrapper function of the bitgo sdk that transfer
 *  coins from @params.srcWalletID to the @params.destinationAddress testnet address
 *
 *  @param {bitgo-sdk} bitgo - bitgo sdk core obj. This makes it easear to write tests since its easy to mock bitgo core
 *  @param {string} accessToken - bitgo account access token
 *  @param {string} srcWalletIda - bitgo wallet id from which the coins will be taken
 *  @param {string} srcWalletPassword - bitgo wallet password
 *  @param {string} amount - amount to be transfered. Is a string because btc value can be 1e-8 ~ 1e8 and the node number precision would not suffice
 *  @param {string} destinationAddress - testcoin address that will receive the coins
 */
async function SendBTC(bitgo, params) { 
  const accessToken = params.accessToken
  const walletId = params.srcWalletId
  const walletPassphrase = params.srcWalletPassword
  const amount = params.amount
  const addressTo = params.destinationAddress

  await bitgo.authenticateWithAccessToken({ accessToken })

  const basecoin = bitgo.coin(coin)
  const walletInstance = await basecoin.wallets().get({ id: walletId })
  const transaction = await walletInstance.sendMany({
    recipients: [
      {
        amount: amount,
        address: addressTo
      }
    ],
    walletPassphrase: walletPassphrase
  })

  const explanation = basecoin.explainTransaction({ txHex: transaction.tx })
  logger.info(`Wallet ID: ${walletInstance.id()}`)
  logger.info(`Current Receive Address: ${walletInstance.receiveAddress()}`)
  logger.info(`New Transaction: ${JSON.stringify(transaction, null, 4)}`)
  logger.info(`Transaction Explanation: ${JSON.stringify(explanation, null, 4)}`)
  return explanation
 }

module.exports = {
  SendBTC
}
