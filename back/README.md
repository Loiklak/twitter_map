## Installation

* Run `yarn install`
* Configure your database (we used mysql) and the config.js file (see sequelize documentation for more information)

## Config.js template
Fichier à créer dans lequel on met les tokens afin d'accéder aux différentes APIs et sa base de donnée.
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
    },

    locationIQ: {
        "token": ""
    }
};
```

## LocationIQ
Afin de récupérer la localisation des tweets on utilise l'API de [LocationIQ](https://locationiq.com/#demo) dont il faut récupérer un token à mettre dans le fichier `config.json`.

Elle nous permet dans sa version gratuite de faire 10 000 requêtes par jour dans la limite de 2 requêtes par seconde.
Pour cette raison on appelle l'API Twitter toutes les 2 secondes (limite de l'API Twitter) et on demande à récupérer les deux résultats les plus récents afin de ne pas flooder l'API locationIQ de requête.

Avec ces résultats on regarde la localisation de l'utilisateur ayant envoyé le tweet et on essaie de l'associer à des coordonnées GPS fournies par l'API LocationIQ.

Il faudrait vérifier dans la base de donnée que les tweets récupérés ne sont pas déjà en base étant donné que l'on récupère les plus récents donc il pourrait ne pas y en avoir eu de nouveaux (cf `shortpolling/poll`) cependant cela ne marche pas pour l'instant...