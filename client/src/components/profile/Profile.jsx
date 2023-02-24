import { useDispatch } from 'react-redux';
import { deleteAvatar, uploadAvatar } from 'actions/user';

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
        <div>
            <button
                type={'button'}
                onClick={deleteAvatarHandler}
            >
                Delete avatar
            </button>
            <input
                type={'file'}
                placeholder={'select new avatar'}
                onChange={uploadAvatarHandler}
                accept={'image/*'}
            />
        </div>
    );
};
