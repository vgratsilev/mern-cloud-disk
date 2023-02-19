import axios from 'axios';
import { addFile, deleteFileAction, setFiles } from 'reducers/fileReducer';
import { addUploadFile, changeUploadFile, showUploader } from 'reducers/uploadReducer';
import { hideLoader, showLoader } from 'reducers/appReducer';

export function getFiles(dirID, sort) {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            let url = 'http://localhost:5000/api/files';
            if (dirID) {
                url = `http://localhost:5000/api/files?parent=${dirID}`;
            }
            if (sort) {
                url = `http://localhost:5000/api/files?sort=${sort}`;
            }
            if (dirID && sort) {
                url = `http://localhost:5000/api/files?parent=${dirID}&sort=${sort}`;
            }
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            dispatch(setFiles(response.data));
        } catch (e) {
            alert(e.response.data.message);
        } finally {
            dispatch(hideLoader());
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

            const id = Date.now();
            const uploadFile = { name: file.name, progress: 0, id };
            dispatch(showUploader());
            dispatch(addUploadFile(uploadFile));

            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                onUploadProgress: (progressEvent) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') ||
                          progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        uploadFile.progress = Math.round(
                            (progressEvent.loaded * 100) / totalLength,
                        );
                        dispatch(changeUploadFile(uploadFile));
                    }
                },
            });
            dispatch(addFile(response.data));
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };
}

export async function downloadFile(file) {
    const response = await axios.get(`http://localhost:5000/api/files/download?id=${file._id}`, {
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    if (response.status === 200) {
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export function deleteFile(file) {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(deleteFileAction(file._id));
            alert(response.data.message);
        } catch (e) {
            alert(e.response?.data?.message);
        }
    };
}
