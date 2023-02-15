const gb = 1024 * 1024 * 1024;
const mb = 1024 * 1024;
const kb = 1024;

export default (size) => {
    if (size > gb) {
        return `${(size / gb).toFixed(1)} Gb`;
    }
    if (size > mb) {
        return `${(size / mb).toFixed(1)} Mb`;
    }
    if (size > kb) {
        return `${(size / kb).toFixed(1)} Kb`;
    }
    return `${size} B`;
};
