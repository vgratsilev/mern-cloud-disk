import IconDir from 'assets/img/dir.svg';
import IconFile from 'assets/img/file.svg';
import './file.scss';

const File = (props) => {
    const { file } = props;
    return (
        <div className={'file'}>
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
