var fs = require("fs");

module.exports = {
    saveSites
};

function saveSites(json) {

    fs.writeFile('./dao/files/sites.json', json, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Sites saved!');

        }
    });

}

