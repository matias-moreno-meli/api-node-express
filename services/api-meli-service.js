
var request = require('request');

module.exports = {
    getSites
};


function getSites(url) {

    return new Promise(function (done, reject) {
        request.get(url, function (err, response, body) {
            if (err) {
                errParse(err, reject);
            }
            if (response.statusCode === 200) {
                // var data = JSON.parse(body);
                done(body);
            } else {
                reject('Hubo un error al consultar la API de Meli')
            }
        })
    })
}

function errParse(error, reject) {
    var err = JSON.parse(error);
    if (body) {
        switch (err.status) {
            case 404: {
                reject(err.message);
                break;
            }
            case 500: {
                reject(err.message);
                break;
            }
            default: {
                reject('Hubo un error al consultar la API de Meli');
            }
        }
    }
}
