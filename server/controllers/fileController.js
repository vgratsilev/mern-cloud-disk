const FileService = require('../services/fileService');
const File = require('../models/File');

class FileController {
    static async createDir(request, response) {
        try {
            const { name, type, parent } = request.body;
            const file = new File({ name, type, parent, user: request.user.id });
            const parentFile = await File.findOne({ _id: parent });
            if (!parentFile) {
                file.path = name;
                await FileService.createDir(file);
            } else {
                file.path = `${parentFile.path}\\${file.name}`;
                await FileService.createDir(file);
                // eslint-disable-next-line no-underscore-dangle
                parentFile.childs.push(file._id);
                await parentFile.save();
            }
            await file.save();
            return response.json(file);
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }

    static async getFiles(request, response) {
        try {
            const files = await File.find({ user: request.user.id, parent: request.query.parent });
            return response.json({ files });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = FileController;
