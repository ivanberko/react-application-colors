import PropTypes from 'prop-types';
import classNames from 'classnames';

const ColorsList = ({ colors, colorListItemHandler, currentColor }) => {
  return (
    <div>
      {colors.map(({ label, hexCode }) => {
        return (
          <li className="color-picker-list__item" key={`color-picker-list-${hexCode}`}>
            <input
              type="radio"
              name="color"
              id={`color-picker-list-${hexCode}`}
              onChange={() => colorListItemHandler(hexCode)}
            />
            <label
              htmlFor={`color-picker-list-${hexCode}`}
              className={classNames({ 'is-active': hexCode === currentColor })}
            >
              <span className="color-picker-list__item-label">{label}</span>
              <span className="color-picker-list__item-color" style={{ backgroundColor: hexCode }} />
            </label>
          </li>
        );
      })}
    </div>
  );
};

ColorsList.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      hexCode: PropTypes.string.isRequired,
    })
  ),
  colorListItemHandler: PropTypes.func,
  currentColor: PropTypes.string,
};

export default ColorsList;
