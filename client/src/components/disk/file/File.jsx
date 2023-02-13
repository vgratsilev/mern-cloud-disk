import IconDir from 'assets/img/dir.svg';
import IconFile from 'assets/img/file.svg';
import IconDownload from 'assets/img/download.svg';
import IconDelete from 'assets/img/trash.svg';
import { useDispatch } from 'react-redux';
import { pushToStack, setCurrentDir } from 'reducers/fileReducer';
import { deleteFile, downloadFile } from 'actions/file';
import './file.scss';

const File = (props) => {
    const { file } = props;
    const dispatch = useDispatch();

    const openFileHandler = () => {
        if (file.type === 'dir') {
            dispatch(setCurrentDir(file._id));
            dispatch(pushToStack(file._id));
        }
    };

    const downloadFileHandler = (event) => {
        event.stopPropagation();
        downloadFile(file);
    };

    const deleteFileHandler = (event) => {
        event.stopPropagation();
        dispatch(deleteFile(file));
    };

    return (
        <div
            className={'file'}
            onClick={openFileHandler}
        >
            <img
                src={file.type === 'dir' ? IconDir : IconFile}
                alt={file.name}
                className={'file__img'}
            />
            <div className={'file__name'}>{file.name}</div>
            <div className={'file__date'}>{file.date?.slice(0, 10)}</div>
            <div className={'file__size'}>{file.size}</div>
            {file.type !== 'dir' && (
                <button
                    type={'button'}
                    className={'file__button file__download'}
                    onClick={downloadFileHandler}
                    title={'Download file'}
                >
                    <img
                        src={IconDownload}
                        alt={'Download file'}
                    />
                </button>
            )}
            <button
                type={'button'}
                className={'file__button file__delete'}
                onClick={deleteFileHandler}
                title={'Delete file'}
            >
                <img
                    src={IconDelete}
                    alt={'Delete file'}
                />
            </button>
        </div>
    );
};

export default File;
