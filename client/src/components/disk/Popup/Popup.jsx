import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'utils/input/Input';
import { createDir } from 'actions/file';
import { setShowPopup } from 'reducers/fileReducer';
import './popup.scss';

const showPopupSelector = (state) => state.files.showPopup;
const currentDirSelector = (state) => state.files.currentDir;

const Popup = () => {
    const [dirName, setDirName] = useState('');
    const showPopup = useSelector(showPopupSelector);
    const currentDir = useSelector(currentDirSelector);
    const dispatch = useDispatch();

    const onCloseHandler = () => {
        dispatch(setShowPopup(false));
    };

    const onCreateHandler = () => {
        dispatch(createDir(currentDir, dirName));
        setDirName('');
        dispatch(setShowPopup(false));
    };

    return (
        <div
            className={classNames('popup', { show_Popup: showPopup })}
            onClick={onCloseHandler}
        >
            <div
                className={'popup__content'}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={'popup__content__header'}>
                    <div className={'popup__content__header__title'}>Create new folder</div>
                    <button
                        className={'popup__close'}
                        type={'button'}
                        onClick={onCloseHandler}
                    >
                        X
                    </button>
                </div>
                <Input
                    type={'text'}
                    placeholder={'Type folder name'}
                    value={dirName}
                    setValue={setDirName}
                />
                <button
                    className={'popup__create'}
                    type={'button'}
                    onClick={onCreateHandler}
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default Popup;
