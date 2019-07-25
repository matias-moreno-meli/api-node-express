var agencyDao = require('../dao/agencies-dao');

module.exports = {
    saveAgency
};

function saveAgency(agency) {

    return new Promise(function (done, reject) {
        agencyDao.saveAgency(agency)
            .then(function (data) {
                console.log(data);

                done('Guardado ok');
            })
            .catch(function (err) {
                reject(err);
            })

    })
}
