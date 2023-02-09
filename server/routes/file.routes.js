const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const FileController = require('../controllers/fileController');

const router = new Router();

router.post('', authMiddleware, FileController.createDir);
router.get('', authMiddleware, FileController.getFiles);
router.post('/upload', authMiddleware, FileController.uploadFile);

module.exports = router;
