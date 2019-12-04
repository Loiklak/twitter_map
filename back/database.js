const Sequelize = require('sequelize');
const config = require('./config')

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

//Define schema of the model
const Tweet = sequelize.define('tweet',{
    data: {
        type: Sequelize.STRING
    }
}
)

//We connect the models to the database
sequelize.sync();

module.exports = {
    Tweet
}