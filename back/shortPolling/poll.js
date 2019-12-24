const db = require("../database");
const tweeter = require("./tweeter_api");

/**
 * Fonction qui récupére les tweets depuis l'API Twitter et les met en base si ils ont une localisation
 * @param {string} hashtag - Hashtag dont on veut faire la recherche
 * @param {int} lastTweetId - Dernier ID du tweet en base (pour ne récupérer que les tweets plus vieux)
 * @returns {int} id - ID du dernier Tweet associé au hastagh en base, -1 si aucun tweet récupéré
 */
function poll(hashtag, lastTweetId, sendTweet) {
    tweeter.search(hashtag, lastTweetId, scrapAndInsert)

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

            formated.map((tweet) => {//if(tweet.location != '') {
            db.Tweet.create({
                tweetId: tweet.id,
                date: tweet.date,
                location: tweet.location,
                hashtag: hashtag
            })
            .catch(e => {});
            console.log(tweet.id);
            sendTweet(tweet.location)
            //.catch((e) => console.log("Error while inserting :", e));
            }
            //}
            );
        }
    }

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