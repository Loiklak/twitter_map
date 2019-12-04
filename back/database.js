const Sequelize = require('sequelize');
const config = require('./config')


console.log(config.db);
//Connection to the database (Sequelize handles everything)
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
     },
});

//Verify connection

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection to database successful");
    })
    .catch((e) => {
        console.log("Can't connect to the database : ", e);
    })
        .then(sequelize.close())