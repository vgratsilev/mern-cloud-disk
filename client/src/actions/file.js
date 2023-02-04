import axios from 'axios';
import { setFiles } from '../reducers/fileReducer';

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
