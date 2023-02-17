const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

const initialState = {
    isLoading: false,
};

export default function appReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true,
            };
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });
