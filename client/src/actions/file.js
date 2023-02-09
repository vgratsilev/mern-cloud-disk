import axios from 'axios';
import { addFile, setFiles } from '../reducers/fileReducer';

export function getFiles(dirID) {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/files${dirID ? `?parent=${dirID}` : ''}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                },
            );
            dispatch(setFiles(response.data));
        } catch (e) {
            alert(e.response.data.message);
        }
    };
}

export function createDir(dirID, name) {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/files`,
                {
                    name,
                    parent: dirID,
                    type: 'dir',
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                },
            );
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };
}

export function uploadFile(file, dirID) {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            if (dirID) {
                formData.append('parent', dirID);
            }

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') ||
                          progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        const progress = Math.round((progressEvent.loaded * 100) / totalLength);
                        console.log(progress);
                    }
                },
            });
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };
}
