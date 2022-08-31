const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
const PORT = config.get('serverPort');
const URL = config.get('dbUrl');

const start = async () => {
    try {
        mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

        app.listen(PORT, () => {
            console.log('server started on port ', PORT);
        });
    } catch (e) {
        console.log('Error!', e);
    }
};

start();
