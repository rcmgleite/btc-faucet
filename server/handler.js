const Faucet = require('./faucet')
const logger = require('../utils/logger')
const _ = require('lodash')

module.exports.Healthcheck = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({msg: "all fine"})
  }
}

module.exports.SendBTC = async (event, context) => {
  try {
    // TODO validate params
    const params = _.isString(event.body) ? JSON.parse(event.body): event.body
    const faucetInstance = new Faucet()
    const amount = '10000' // FIXME - hardcoded amount. Could be a request param or calculated using throttling for example
    const destinationAddress = params.destinationAddress
    logger.info(`destinationAddress: ${destinationAddress}`)
    logger.info(`amount: ${amount}`)

    const data = await faucetInstance.SendBTC(destinationAddress, amount)
    return {
      statusCode: 200
    }
  } catch(err) {
    logger.error(err)
    return {
      statusCode: 500,
      body: `Unable to transfer coins. Try again later` 
    }
  }
}
