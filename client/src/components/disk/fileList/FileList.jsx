import React from 'react';
import { useSelector } from 'react-redux';
import './fileList.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import File from '../file/File';

const getFilesSelector = (state) => state.files.files;
const getViewSelector = (state) => state.files.view;

const FileList = () => {
    const files = useSelector(getFilesSelector);
    const view = useSelector(getViewSelector);

    if (files.length === 0) {
        return <span className={'empty-files-label'}>{'Folder is empty'}</span>;
    }

    if (view === 'tile') {
        return (
            <div className={'fileTile'}>
                {files.map((file) => (
                    <File
                        key={file._id}
                        file={file}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={'fileList'}>
            <div className={'fileList__header'}>
                <div className={'fileList__header__name'}>Name</div>
                <div className={'fileList__header__date'}>Date</div>
                <div className={'fileList__header__size'}>Size</div>
            </div>

            <TransitionGroup>
                {files.map((file) => (
                    <CSSTransition
                        key={file._id}
                        timeout={500}
                        classNames={'file'}
                        exit={false}
                    >
                        <File file={file} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default FileList;
