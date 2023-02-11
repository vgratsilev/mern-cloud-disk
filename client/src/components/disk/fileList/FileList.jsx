import React from 'react';
import { useSelector } from 'react-redux';
import './fileList.scss';
import File from '../file/File';

const getFilesSelector = (state) => state.files.files;

const FileList = () => {
    const files = useSelector(getFilesSelector).map((file) => (
        <File
            key={file._id}
            file={file}
        />
    ));

    return (
        <div className={'fileList'}>
            <div className={'fileList__header'}>
                <div className={'fileList__header__name'}>Name</div>
                <div className={'fileList__header__date'}>Date</div>
                <div className={'fileList__header__size'}>Size</div>
            </div>
            {files.length === 0 ? <span>{'Folder is empty'}</span> : files}
        </div>
    );
};

export default FileList;
