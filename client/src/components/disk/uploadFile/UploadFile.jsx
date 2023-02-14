import './uploadFile.scss';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { removeUploadFile } from 'reducers/uploadReducer';

export const UploadFile = (props) => {
    const { file } = props;
    const dispatch = useDispatch();
    const progressStyle = useMemo(() => ({ width: `${file.progress}%` }), [file.progress]);

    const removeUploadFileHandler = () => {
        dispatch(removeUploadFile(file.id));
    };

    return (
        <div className={'upload-file'}>
            <div className={'upload-file__header'}>
                <div className={'upload-file__header__name'}>{file.name}</div>
                <button
                    className={'upload-file__header__remove'}
                    type={'button'}
                    onClick={removeUploadFileHandler}
                >
                    X
                </button>
            </div>
            <div className={'upload-file__progress-bar'}>
                <div
                    className={'upload-file__progress-bar__upload-bar'}
                    style={progressStyle}
                />
                <div className={'upload-file__progress-bar__percent'}>{file.progress}%</div>
            </div>
        </div>
    );
};
