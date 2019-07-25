let agencyService = require('../services/agencies-service');

module.exports = {
    saveAgency,
    deleteAgency
};

function saveAgency(req, res) {
    let agency = req.body;

    agencyService.saveAgency(agency)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({message: "Error al consultar la api"});
            }
        })
        .catch(function (err) {
            res.status(400).send({message: err});
        });

}
function deleteAgency(req, res) {
    let agency = req.body;

    agencyService.deleteAgency(agency)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({message: "Error al consultar la api"});
            }
        })
        .catch(function (err) {
            res.status(400).send({message: err});
        });

}

