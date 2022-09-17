const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (request, response, next) => {
    if (request.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = request.headers.authorization.split(' ')[1];
        if (!token) {
            return response.status(401).json({ message: 'Auth error' });
        }

        const decoded = jwt.verify(token, config.get('secretKey'));
        request.user = decoded;
        return next();
    } catch (error) {
        return response.status(401).json({ message: 'Auth error' });
    }
};
