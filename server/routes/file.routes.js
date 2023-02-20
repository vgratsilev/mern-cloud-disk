const Router = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const FileController = require('../controllers/fileController');

const router = new Router();

router.post('', authMiddleware, FileController.createDir);
router.get('', authMiddleware, FileController.getFiles);
router.post('/upload', authMiddleware, FileController.uploadFile);
router.get('/download', authMiddleware, FileController.downloadFile);
router.get('/search', authMiddleware, FileController.searchFiles);
router.delete('/', authMiddleware, FileController.deleteFile);

module.exports = router;
