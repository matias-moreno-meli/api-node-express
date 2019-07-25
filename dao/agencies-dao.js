var fs = require("fs");

module.exports = {
    saveAgency,
    deleteAgency
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

                    const resultado = agencies.find(x => x.id === agency.id);

                    if (resultado) {
                        done('la agencia ya se encuentra entre las agencias recomendadas.')
                    } else {
                        writeFile(reject, done, agency, agencies);

                    }

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

function deleteAgency(agency) {

    return new Promise(function (done, reject) {
        let agencies = [];
        if (fs.existsSync("./dao/files/agencias_recomendadas.json")) {
            fs.readFile("./dao/files/agencias_recomendadas.json", "utf-8", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    agencies = JSON.parse(data);
                    const resultado = agencies.filter(x => x.id !== agency.id);

                    if (resultado) {
                        console.log('la agencia dejo de ser recomendada.');

                        fs.writeFile('./dao/files/agencias_recomendadas.json', JSON.stringify(resultado), (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                done(resultado);
                            }
                        });
                    } else {
                        done('Esta agencia no se encontraba entre las recomendadas.');
                    }
                }
            });
        } else {
            done('Esta agencia no se encontraba entre las recomendadas.');
        }
    })
}
