## Installation

* Run `yarn install`
* Configure your database (we used mysql) and the config.js file (see sequelize documentation for more information)

## Config.js template
```
module.exports = {
    db: {
        "database": "twitter",
        "username": "twitter",
        "password": "password",
        "host": "localhost",
        "dialect": "mysql"
    },

    twitterCred: {
        "consumer_key": "",
        "consumer_secret": "",
        "access_token": "",
        "access_token_secret": ""
    }
};
```