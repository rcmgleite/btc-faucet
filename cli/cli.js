const program = require('commander')
const rp = require('request-promise')
const logger = require('../utils/logger')

program.version('0.1.0')

program  
  .command('healthcheck')
  .action(async () => {
    logger.info('healthcheck in progress...')
    const options = {
      method: 'GET',
      uri: 'http://127.0.0.1:3000/healthcheck',
      json: true
    }

    try {
      await rp(options)
      logger.info(`Service up and running`)
    } catch (err) {
      logger.info("Healthcheck failed")
      logger.info(err)
    }
  })

program
  .command('receive')
  .option('-d, --destination_address <dst>', 'Your testnet address')
  .action(async (options) => {
    logger.info('receive in progress...')  
    const httpOptions = {
      method: 'post',
      uri: 'http://127.0.0.1:3000/sendbtc',
      body: {
        destinationAddress: options.destination_address
      },
      json: true
    }

    try {
      const response = await rp(httpOptions)
      logger.info('Successfully received btc')
    } catch(err) {
      logger.info("Failed to receive btc")
      logger.info(`${err.message}`)
    }
  })

program.parse(process.argv)

