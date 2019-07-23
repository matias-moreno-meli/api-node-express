
var apiMeliService = require('../services/api-meli-service');
var siteDao = require('../dao/sites-dao');

module.exports = {
    getSites
};

function getSites(url) {


    return new Promise(function (done, reject) {
        apiMeliService.getSites(url)
            .then(function (data) {
                siteDao.saveSites(data);
                done(data);
            })
            .catch(function (err) {
                reject(err);
            })

    })
}



