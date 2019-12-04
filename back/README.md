## Installation

* Run `yarn install`
* Configure your database (we used mysql) and the config.js file (see sequelize documentation for more information)

## Config.js template
```
const db = {
    "database": "",
    "username": "",
    "password": "",
    "host": "",
    "dialect": ""
};

exports.db = db;
```