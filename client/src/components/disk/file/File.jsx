import IconDir from 'assets/img/dir.svg';
import IconFile from 'assets/img/file.svg';
import { useDispatch } from 'react-redux';
import { pushToStack, setCurrentDir } from 'reducers/fileReducer';
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
        </div>
    );
};

export default File;
