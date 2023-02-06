import PropTypes from 'prop-types';
import './input.scss';

const Input = ({ value, setValue, type, placeholder }) => (
    <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type}
        placeholder={placeholder}
    />
);

Input.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
};

export default Input;
