let request = require('request');
let siteService = require('../services/sites-service');
let siteDao = require('../dao/sites-dao');
let url = require('url');

// const MELI_END_POINT_SITES = 'https://api.mercadolibre.com/sites/MLA/payment_methods/rapipago/agencies?near_to=-31.412971,-64.18758,300';
const MELI_END_POINT_SITES = new URL('https://api.mercadolibre.com/sites/:site_id/payment_methods/:payment_method_id/agencies');
// const MELI_END_POINT_SITES = 'https://api.mercadolibre.com/sites/{site_id}/payment_methods/{payment_method_id}/agencies?near_to={lat},{lon},{radius}&limit={limit}&offset={offset}';


module.exports = {
    getSites
};

function getSites(req, res) {
    var siteId = req.params.site_id;
    var paymentMethodId = req.params.payment_method_id;
    var nearTo = req.query.near_to;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var orderBy = req.query.order_by;

    if (siteId && paymentMethodId && nearTo) {
        MELI_END_POINT_SITES.pathname = 'sites/' + siteId + '/payment_methods/' + paymentMethodId + '/agencies';

        MELI_END_POINT_SITES.searchParams.set('near_to', nearTo.toString());

        if (limit) {
            MELI_END_POINT_SITES.searchParams.set('limit', limit.toString());

        }
        if (offset) {
            MELI_END_POINT_SITES.searchParams.set('offset', offset.toString());
        }
        if (orderBy) {
            console.log(orderBy.toString());
        }
    }



    siteService.getSites(MELI_END_POINT_SITES.href)
        .then(function (data) {
            if (data) {
                res.status(200).send(JSON.parse(data));
            } else {
                res.status(400).send({message: "Error al consultar la api"});
            }
        })
        .catch(function (err) {
            res.status(400).send({message: err});
        });



}

