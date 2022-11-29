const { sendRequest } = require('./util/http_client.util');

const microservicesMiddleware = async (req, res, next) => {

    if (req.path.startsWith('/api/v1/')) {
        let microserviceName = req.path.replace("/api/v1/", "");
        microserviceName = microserviceName.substring(0, microserviceName.indexOf("/") == -1 ? microserviceName.length : microserviceName.indexOf("/")).trim();

        if (microserviceName) {

            try {
                let result = await sendRequest(req.path, microserviceName, 3000, req.method.toUpperCase(), req.body);
                res.status(200).json(result);
            } catch (e) {
                res.status(500).json({ ok: false, error: 'Error routing request to microservice' })
            }

        } else {
            next();
        }
    } else {
        next();
    }

}

module.exports = microservicesMiddleware;