import IconDir from 'assets/img/dir.svg';
import IconFile from 'assets/img/file.svg';
import IconDownload from 'assets/img/download.svg';
import IconDelete from 'assets/img/trash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from 'reducers/fileReducer';
import { deleteFile, downloadFile } from 'actions/file';
import sizeFormat from 'utils/sizeFormat';
import './file.scss';

const getViewSelector = (state) => state.files.view;

const File = (props) => {
    const { file } = props;
    const dispatch = useDispatch();
    const view = useSelector(getViewSelector);

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

    if (view === 'tile') {
        return (
            <div
                className={'file-tile'}
                onClick={openFileHandler}
                title={file.name}
            >
                <img
                    src={file.type === 'dir' ? IconDir : IconFile}
                    alt={file.name}
                    className={'file-tile__img'}
                />
                <div
                    className={'file-tile__name'}
                    title={file.name}
                >
                    {file.name}
                </div>
                <div className={'file-tile__buttons'}>
                    {file.type !== 'dir' && (
                        <button
                            type={'button'}
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
                        className={'button__delete'}
                        onClick={deleteFileHandler}
                        title={'Delete file'}
                    >
                        <img
                            src={IconDelete}
                            alt={'Delete file'}
                        />
                    </button>
                </div>
            </div>
        );
    }

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
            <div className={'file__size'}>{sizeFormat(file.size)}</div>
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
