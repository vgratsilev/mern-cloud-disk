import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFiles } from 'actions/file';
import { popFromStack, setShowPopup } from 'reducers/fileReducer';
import FileList from './fileList/FileList';
import Popup from './Popup/Popup';
import './disk.scss';

const getCurrentDir = (state) => state.files.currentDir;

const Disk = () => {
    const dispatch = useDispatch();
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

    return (
        <div className={'disk'}>
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
            </div>
            <FileList />
            <Popup />
        </div>
    );
};

export default Disk;
