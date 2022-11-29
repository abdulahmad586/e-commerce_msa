const http = require('http');

function sendRequest(path, host, port, method = "GET", body = {}) {
    return new Promise((resolve, reject) => {
        const hasBody = Object.keys(body).length > 0;

        var data = hasBody ? JSON.stringify(body) : null;

        const options = {
            method: method,
            hostname: host,
            port: port,
            path: path,
            headers: hasBody ? { 'Content-Type': 'application/json; charset=UTF-8', 'Content-Length': Buffer.byteLength(data) } : null
        }

        const req = http.request(options, (res) => {

            let responseData = [];
            res
                .on('data', chunk => {
                    responseData.push(chunk);
                })
                .on('error', err => {
                    reject(err);
                })
                .on('end', () => {
                    let data = Buffer.concat(responseData);
                    data = data.toString();
                    try {
                        let json = JSON.parse(data);
                        resolve(json);
                    } catch (e) {
                        reject(data);
                    }
                })
        });

        if (hasBody) {
            req.write(data, (er) => {
                if (er) console.log("Error writing body", er);
            });
        }
        req.end();
    });
}

module.exports = { sendRequest }