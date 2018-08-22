const Joi = require('joi')
const WAValidator = require('wallet-address-validator');

const SendBTCSchema = Joi.object().keys({
  destinationAddress: Joi.string().alphanum().required(),
})

/*
 * FIXME - WAValidator 'BTC' and 'testnet' should be parameters 
 */
module.exports = {
  validateSendBTC: (params) => {
    try {
    const schemaValid = Joi.validate(params, SendBTCSchema).error === null
    const addressValid =  WAValidator.validate(params.destinationAddress, 'BTC', 'testnet')

    return schemaValid && addressValid
    } catch(err) {
      console.dir(err)
    }

  }
}
