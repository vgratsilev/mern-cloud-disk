const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const corsMiddleware = require('./middleware/cors.middleware'); // Todo replace with npm i cors

const app = express();
const PORT = config.get('serverPort');
const URL = config.get('dbUrl');

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

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
