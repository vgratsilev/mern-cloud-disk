import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from 'actions/user';
import './profile.scss';

export const Profile = () => {
    const dispatch = useDispatch();

    const deleteAvatarHandler = () => {
        dispatch(deleteAvatar());
    };

    const uploadAvatarHandler = (e) => {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    };

    return (
        <div className={'profile'}>
            <button
                type={'button'}
                onClick={deleteAvatarHandler}
                className={'profile__delete-avatar'}
            >
                Delete current avatar
            </button>
            <label>
                Upload new avatar
                <input
                    type={'file'}
                    placeholder={'select new avatar'}
                    onChange={uploadAvatarHandler}
                    accept={'image/*'}
                    className={'profile__upload_avatar'}
                />
            </label>
        </div>
    );
};
