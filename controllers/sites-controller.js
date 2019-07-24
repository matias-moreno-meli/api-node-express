let siteService = require('../services/sites-service');
const MELI_END_POINT_SITES = new URL('https://api.mercadolibre.com/sites/:site_id/payment_methods/:payment_method_id/agencies');

module.exports = {
    getSites
};

function getSites(req, res) {
    let siteId = req.params.site_id;
    let paymentMethodId = req.params.payment_method_id;
    let nearTo = req.query.near_to;
    let limit = req.query.limit;
    let offset = req.query.offset;

    let atributo;
    let valor;

    if (siteId && paymentMethodId && nearTo) {
        MELI_END_POINT_SITES.pathname = 'sites/' + siteId + '/payment_methods/' + paymentMethodId + '/agencies';

        MELI_END_POINT_SITES.searchParams.set('near_to', nearTo.toString());

        if (limit) {
            MELI_END_POINT_SITES.searchParams.set('limit', limit.toString());

        }
        if (offset) {
            MELI_END_POINT_SITES.searchParams.set('offset', offset.toString());
        }

        if (req.query.order_by) {
            let array = req.query.order_by.split(",");
             atributo = array[0];
             valor = array[1];

            if (!(atributo && valor)) {
                res.status(400).send({message: "Error en los parametros de ordenamiento, verificar dichos valores"})
            }

            atributo.toLowerCase();
            valor.toLowerCase();

            if (!((atributo == 'address_line' || atributo == 'agency_code' || atributo == 'distance') && (valor == 'asc' || valor == 'desc'))) {
                res.status(400).send({message: "Error en los parametros de ordenamiento, verificar dichos valores"})
            }

        }
    }

    siteService.getSites(MELI_END_POINT_SITES.href, atributo, valor)
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

