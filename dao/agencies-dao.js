var fs = require("fs");

module.exports = {
    saveAgency
};

function saveAgency(agency) {

    return new Promise(function (done, reject) {

        let agencies = [];

        if (fs.existsSync("./dao/files/agencias_recomendadas.json")) {
            fs.readFile("./dao/files/agencias_recomendadas.json", "utf-8", (err, data) => {

                if (err) {
                    reject(err);
                } else {
                    agencies = JSON.parse(data);

                    writeFile(reject, done, agency, agencies);

                }

            });

        } else {
            writeFile(reject, done, agency, agencies);

        }
    })
}


function writeFile(reject, done, agency, agencies) {

    agencies.push(agency);

    fs.writeFile('./dao/files/agencias_recomendadas.json', JSON.stringify(agencies), (err) => {
        if (err) {
            reject(err);
        } else {
            done(agencies);
        }
    });

}
