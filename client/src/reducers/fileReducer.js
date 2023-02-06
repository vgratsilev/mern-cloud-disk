const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_SHOW_POPUP = 'SET_SHOW_POPUP';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const POP_FROM_STACK = 'POP_FROM_STACK';

const initialState = {
    files: [],
    currentDir: null,
    showPopup: false,
    dirStack: [],
};

export default function fileReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_FILES:
            return { ...state, files: action.payload };
        case SET_CURRENT_DIR:
            return { ...state, currentDir: action.payload };
        case ADD_FILE:
            return { ...state, files: [...state.files, action.payload] };
        case SET_SHOW_POPUP:
            return { ...state, showPopup: action.payload };
        case PUSH_TO_STACK: {
            return { ...state, dirStack: [...state.dirStack, action.payload] };
        }
        case POP_FROM_STACK: {
            const prevDir = state.dirStack.at(-2) || null;
            const stack = state.dirStack.slice(0, -1);
            return { ...state, dirStack: [...stack], currentDir: prevDir };
        }
        default:
            return state;
    }
}

export const setFiles = (files) => ({ type: SET_FILES, payload: files });
export const setCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const addFile = (file) => ({ type: ADD_FILE, payload: file });
export const setShowPopup = (show) => ({ type: SET_SHOW_POPUP, payload: show });
export const pushToStack = (dirID) => ({ type: PUSH_TO_STACK, payload: dirID });
export const popFromStack = () => ({ type: POP_FROM_STACK });
