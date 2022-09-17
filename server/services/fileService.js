const fs = require('fs');
const path = require('path');

class FileService {
    static createDir(file) {
        const filePath = path.join(__dirname, `../files/${file.user}/${file.path}`);

        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                    resolve({ message: 'File was created' });
                    return;
                }
                reject(new Error('File already exists'));
                return;
            } catch (error) {
                reject(new Error('File creation error'));
            }
        });
    }
}

module.exports = FileService;
