var apiMeliService = require('../services/api-meli-service');
var siteDao = require('../dao/sites-dao');

module.exports = {
    getSites
};

function getSites(url, atributo = '', valor = 'asc') {

    return new Promise(function (done, reject) {
        apiMeliService.getSites(url)
            .then(function (data) {
                data = JSON.parse(data);

                switch (atributo.toLowerCase()) {
                    case 'agency_code':
                        orderByAgencyCode(data, valor);
                        break;
                    case 'address_line':
                        orderByAddressLine(data, valor);
                        break;
                    case 'distance':
                        orderByDistance(data, valor);
                        break
                }

                siteDao.saveSites(data);
                done(data);
            })
            .catch(function (err) {
                reject(err);
            })

    })
}


function orderByAgencyCode(data, valor) {
    if (valor.toLowerCase() == 'asc') {
        data.results.sort((a, b) => (a.agency_code > b.agency_code) ? 1 : -1);
    } else if (valor.toLowerCase() == 'desc') {
        data.results.sort((a, b) => (a.agency_code < b.agency_code) ? 1 : -1);
    }
}

function orderByAddressLine(data, valor) {
    if (valor.toLowerCase() == 'asc') {
        data.results.sort((a, b) => (a.address.address_line > b.address.address_line) ? 1 : -1);
    } else if (valor.toLowerCase() == 'desc') {
        data.results.sort((a, b) => (a.address.address_line < b.address.address_line) ? 1 : -1);
    }
}

function orderByDistance(data, valor) {
    if (valor.toLowerCase() == 'asc') {
        data.results.sort((a, b) => (a.distance > b.distance) ? 1 : -1);
    } else if (valor.toLowerCase() == 'desc') {
        data.results.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
    }
}
