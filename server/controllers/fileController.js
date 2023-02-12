const fs = require('fs');
const path = require('path');
const FileService = require('../services/fileService');
const File = require('../models/File');
const User = require('../models/User');

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
            return response.json(files);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }

    static async uploadFile(request, response) {
        try {
            const { file } = request.files;

            const parent = await File.findOne({ user: request.user.id, _id: request.body.parent });
            const user = await User.findOne({ _id: request.user.id });

            if (user.usedSpace + file.size > user.diskSpace) {
                return response.status(400).json({ message: 'There is no space on the disk' });
            }
            user.usedSpace += file.size;

            let filePath;
            if (parent) {
                filePath = path.join(__dirname, `../files/${user._id}/${parent.path}/${file.name}`);
            } else {
                filePath = path.join(__dirname, `../files/${user._id}/${file.name}`);
            }

            if (fs.existsSync(filePath)) {
                return response.status(400).json({ message: 'File with this name already exists' });
            }

            await file.mv(filePath);

            const type = file.name.split('.').pop();
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: parent?.path,
                parent: parent?._id,
                user: user._id
            });

            await dbFile.save();
            await user.save();

            return response.json(dbFile);
        } catch (error) {
            console.log('Upload file Error', error);
            return response.status(500).json({ message: 'Upload file error' });
        }
    }

    static async downloadFile(request, response) {
        try {
            const file = await File.findOne({ _id: request.query.id, user: request.user.id });
            const filePath = path.join(__dirname, `../files/${request.user.id}/${file.path}/${file.name}`);
            if (!fs.existsSync(filePath)) {
                return response.status(400).json({ message: 'Error: file not found' });
            }
            return response.download(filePath, file.name);
        } catch (error) {
            console.log('Download file Error', error);
            return response.status(500).json({ message: 'Download file error' });
        }
    }
}

module.exports = FileController;
