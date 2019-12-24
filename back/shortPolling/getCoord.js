const axios = require('axios');
const secret = require('../config');

const getLoc = function getLoc(search_string) {
    return axios({
        url: 'https://eu1.locationiq.com/v1/search.php',
        method: 'get',
        params: {
        key: secret.locationIQ.token,
        q: search_string,
        format: 'json',
        limit: 1
        }
    })
}

module.exports = { getLoc }