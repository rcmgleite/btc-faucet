const BitGoJS = require('bitgo')
const Promise = require('bluebird')
const logger = require('../../utils/logger')
const coin = 'tbtc' // currently only supporting tbtc. This could be a config

async function SendBTC(params) { 
  const accessToken = params.accessToken
  const walletId = params.srcWalletId
  const walletPassphrase = params.srcWalletPassword
  const amount = params.amount
  const addressTo = params.destinationAddress
  const bitgo = new BitGoJS.BitGo({ env: 'test' }) // TODO - add to configuration
  const basecoin = bitgo.coin(coin)

  await bitgo.authenticateWithAccessToken({ accessToken })

  const walletInstance = await basecoin.wallets().get({ id: walletId })
  const newReceiveAddress1 = await walletInstance.createAddress()
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
