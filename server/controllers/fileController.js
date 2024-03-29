const fs = require('fs');
const path = require('path');
const Uuid = require('uuid');
const FileService = require('../services/fileService');
const File = require('../models/File');
const User = require('../models/User');

function getPath(file) {
    return path.join(__dirname, `../files/${file.user}/${file.path}`);
}

function deleteFileNode(file) {
    const filePath = getPath(file);
    if (file.type === 'dir') {
        fs.rmdirSync(filePath);
    } else {
        fs.unlinkSync(filePath);
    }
}

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
            let files;
            const { sort } = request.query;
            switch (sort) {
                case 'name':
                    files = await File.find({ user: request.user.id, parent: request.query.parent }).sort({ name: 1 });
                    break;
                case 'type':
                    files = await File.find({ user: request.user.id, parent: request.query.parent }).sort({ type: 1 });
                    break;
                case 'date':
                    files = await File.find({ user: request.user.id, parent: request.query.parent }).sort({ date: 1 });
                    break;
                default:
                    files = await File.find({ user: request.user.id, parent: request.query.parent });
                    break;
            }

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
            let fPath = file.name;
            if (parent) {
                fPath = `${parent.path}/${file.name}`;
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: fPath,
                parent: parent?._id,
                user: user._id
            });

            await dbFile.save();
            await user.save();

            return response.json(dbFile);
        } catch (error) {
            console.log('Upload file error', error);
            return response.status(500).json({ message: 'Upload file error' });
        }
    }

    static async downloadFile(request, response) {
        try {
            const file = await File.findOne({ _id: request.query.id, user: request.user.id });
            const filePath = path.join(__dirname, `../files/${request.user.id}/${file.path}`);
            if (!fs.existsSync(filePath)) {
                return response.status(400).json({ message: 'Error: file not found' });
            }
            return response.download(filePath, file.name);
        } catch (error) {
            console.log('Download file error', error);
            return response.status(500).json({ message: 'Download file error' });
        }
    }

    static async deleteFile(request, response) {
        try {
            const file = await File.findOne({ _id: request.query.id, user: request.user.id });
            const user = await User.findOne({ _id: request.user.id });

            if (!file) {
                return response.status(400).json({ message: 'Error: file not found' });
            }

            deleteFileNode(file);
            await file.remove();
            user.usedSpace -= file.size;
            return response.json({ message: 'File deleted' });
        } catch (error) {
            if (error.code === 'ENOTEMPTY') {
                console.log('Delete folder error: folder not empty', error);
                return response.status(400).json({ message: 'Delete folder error: folder is not empty' });
            }
            console.log('Delete file error', error);
            return response.status(500).json({ message: 'Delete file error' });
        }
    }

    static async searchFiles(request, response) {
        try {
            const searchName = request.query.search;
            let files = await File.find({ user: request.user.id });
            files = files.filter((file) => file.name.includes(searchName));
            return response.json(files);
        } catch (error) {
            console.log('Search file error', error);
            return response.status(500).json({ message: 'Search file error' });
        }
    }

    static async uploadAvatar(request, response) {
        try {
            const { file } = request.files;
            const user = await User.findById(request.user.id);
            const avatarName = `${Uuid.v4()}.png`;
            const filePath = path.join(__dirname, `../static/${avatarName}`);
            await file.mv(filePath);
            user.avatar = avatarName;
            await user.save();
            return response.json(user);
        } catch (error) {
            console.log('Upload avatar error', error);
            return response.status(500).json({ message: 'Upload avatar error' });
        }
    }

    static async deleteAvatar(request, response) {
        try {
            const user = await User.findById(request.user.id);
            const filePath = path.join(__dirname, `../static/${user.avatar}`);
            fs.unlinkSync(filePath);
            user.avatar = null;
            await user.save();
            return response.json(user);
        } catch (error) {
            console.log('Delete avatar error', error);
            return response.status(500).json({ message: 'Delete avatar error' });
        }
    }
}

module.exports = FileController;
