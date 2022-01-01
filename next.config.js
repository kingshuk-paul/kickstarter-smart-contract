require('dotenv').config({path: './.env'});

module.exports = {
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.node = {
          fs: 'empty'
        }
      }
  
      return config
    },
    env: {
      INFURA_RINKEBY_URL: process.env.INFURA_RINKEBY_URL,
      CONTRACT_FACTORY_ADDRESS: process.env.CONTRACT_FACTORY_ADDRESS,
      ENVIRONMENT: process.env.ENVIRONMENT
    }
  }