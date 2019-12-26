const db = require("../database");
const tweeterAPI = require("./tweeter_api");
const { getLoc } = require('./getCoord');

/**
 * Fonction qui récupére les tweets depuis l'API Twitter et les met en base si ils ont une localisation
 * @param {string} search_term - Terme dont on veut faire la recherche
 * @param {int} lastTweetId - Dernier ID du tweet en base (pour ne récupérer que les tweets plus vieux)
 * @param {function} sendTweet(object) - Fonction qui envoie au front via websockets l'objet (attendu : un objet GEOMETRY (ie un point sur la carte))
 * @returns {int} id - ID du dernier Tweet associé au hastagh en base, -1 si aucun tweet récupéré
 */
function poll(search_term, lastTweetId, sendTweet) {

    tweeterAPI.search(search_term, lastTweetId, scrapAndInsert)

    // Fonction de callback qui va insérer les nouveaux Tweets dans la base de donnée
    function scrapAndInsert(err, data, response) {
        if (err) {
           console.log(err.stack);
        } else {
            const formated = (data.statuses.map(function (tweet) {
                return {
                    "id": tweet.id,
                    "date": toMySQLDate(tweet.created_at),
                    "location": tweet.user.location
                }
            }));

            formated.map((tweet) => {if(tweet.location != '') {
                //On regarde si le tweet existe déjà en base
                db.Tweet.count({where: { tweetId: tweet.id } })
                    .then(count => {
                        if (count===0) { // Si il n'existe pas on essaie de l'ajouter
                            getLoc(tweet.location) // On essaie de trouver les coordonnées du Tweet via l'API LocationIQ
                                .then((response => {
                                    if (!response.data.error) {
                                        const coord = [response.data[0].lon, response.data[0].lat];
                                        db.Tweet.create({
                                            tweetId: tweet.id,
                                            date: tweet.date,
                                            location: {type: 'Point', coordinates: coord},
                                            searchTerm: search_term
                                        })
                                        .catch(e => console.log(e));
                                        sendTweet({type: 'Point', coordinates: coord});
                                    }
                            }))
                            .catch(e => {console.log(e.error)});
                        }
                    });
                
            } });
        }
    }

    // Formate la date Twitter en format DATETIME
    function toMySQLDate(twitDate) {
        const array = twitDate.split(" ");
        return (array[5] + "-" + toMonthNumber(array[1]) + "-" + array[2] + " " + array[3]);
    };

    function toMonthNumber (month) {
        switch (month) {
            case "Jan":
                return 01;
            case "Feb":
                return 02;
            case "Mar":
                return 03;
            case "Apr":
                return 04;
            case "May":
                return 05;
            case "Jun":
                return 06;
            case "Jul":
                return 07;
            case "Aug":
                return 08;
            case "Sep":
                return 09;
            case "Oct":
                return 10;
            case "Nov":
                return 11;
            case "Dec":
                return 12;
        }
    }
}

module.exports = {poll};