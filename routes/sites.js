var express = require('express');
var router = express.Router();
var request = require('request');
var siteController = require('../controllers/sites-controller');


/* GET sites listing. */
/*router.get('/', function (req, res) {

    request.get("https://api.mercadolibre.com/sites", function (error, response, body) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.parse(body));
    })

});

router.get('/:id', function (req, res) {

    var id = req.params.id;
    request.get("https://api.mercadolibre.com/sites/" + id, function (error, response, body) {
        if (error) {
            res.send(error);
        }
        res.send(JSON.parse(body));
    })

});*/



router.get('/:site_id/payment_methods/:payment_method_id/agencies', siteController.getSites);

module.exports = router;
