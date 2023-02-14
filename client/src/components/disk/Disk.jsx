import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles, uploadFile } from 'actions/file';
import { popFromStack, setShowPopup } from 'reducers/fileReducer';
import FileList from './fileList/FileList';
import Popup from './Popup/Popup';
import './disk.scss';
import Uploader from './uploader/Uploader';

const getCurrentDir = (state) => state.files.currentDir;

const Disk = () => {
    const dispatch = useDispatch();
    const [dragEnter, setDragEnter] = useState(false);
    const currentDir = useSelector(getCurrentDir);

    useEffect(() => {
        dispatch(getFiles(currentDir));
    }, [dispatch, currentDir]);

    const showPopupHandler = () => {
        dispatch(setShowPopup(true));
    };

    const backBtnHandler = () => {
        dispatch(popFromStack());
    };

    const fileUploadHandler = (event) => {
        const files = [...event.target.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    };

    const dragEnterHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    };
    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    };
    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const files = [...event.dataTransfer.files];
        files.forEach((file) => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    };

    if (dragEnter) {
        return (
            <div
                className={'drop-area'}
                onDragEnter={dragEnterHandler}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragEnterHandler}
                onDrop={dropHandler}
            >
                Drag file
            </div>
        );
    }

    return (
        <div
            className={'disk'}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className={'disk__buttons'}>
                {currentDir && (
                    <button
                        className={'disk__buttons_back'}
                        type={'button'}
                        onClick={backBtnHandler}
                    >
                        Back
                    </button>
                )}
                <button
                    className={'disk__buttons__createFolder'}
                    type={'button'}
                    onClick={showPopupHandler}
                >
                    Create folder
                </button>
                <div className={'disk__upload'}>
                    <label className={'disk__upload_label'}>
                        Upload
                        <input
                            id={'disk__upload_input'}
                            type={'file'}
                            className={'disk__upload_input'}
                            onChange={fileUploadHandler}
                            multiple
                        />
                    </label>
                </div>
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
    );
};

export default Disk;
