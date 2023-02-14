import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from 'reducers/uploadReducer';
import { UploadFile } from '../uploadFile/UploadFile';
import './uploader.scss';

const isVisibleSelector = (state) => state.upload.isVisible;
const filesSelector = (state) => state.upload.files;

const Uploader = () => {
    const isVisible = useSelector(isVisibleSelector);
    const files = useSelector(filesSelector);
    const dispatch = useDispatch();

    const closeUploaderHandler = () => {
        dispatch(hideUploader());
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className={'uploader'}>
            <div className={'uploader__header'}>
                <div className={'uploader__header__title'}>Loadings</div>
                <button
                    className={'uploader__header__close'}
                    type={'button'}
                    onClick={closeUploaderHandler}
                >
                    X
                </button>
            </div>
            {files.map((file) => (
                <UploadFile
                    key={file.id}
                    file={file}
                />
            ))}
        </div>
    );
};

export default Uploader;
