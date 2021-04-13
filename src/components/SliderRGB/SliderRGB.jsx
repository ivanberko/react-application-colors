import PropTypes from 'prop-types';
import RangeSlider from 'react-rangeslider';

const SliderRGB = ({ componentsRGB, rgbRangeHandler, handleClickSaveColor, handleClickCancel }) => {
  return (
    <>
      {componentsRGB.map(({ letter, value, setValue, classWord, cssVar }) => {
        return (
          <div
            className={`color-picker__slider color-picker__slider--${classWord}`}
            key={`input-range-wrap-${classWord}`}
          >
            {letter}
            <RangeSlider
              min={0}
              max={255}
              value={value}
              tooltip={false}
              onChange={(value) => rgbRangeHandler(setValue, value, cssVar)}
            />
          </div>
        );
      })}
      <div className="color-picker__dropdown-btn-group">
        <button
          type="button"
          className="color-picker__dropdown-btn color-picker__dropdown-btn--grey"
          onClick={handleClickCancel}
        >
          Cancel
        </button>
        <button type="button" className="color-picker__dropdown-btn" onClick={handleClickSaveColor}>
          Ok
        </button>
      </div>
    </>
  );
};

SliderRGB.propTypes = {
  componentsRGB: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      setValue: PropTypes.func.isRequired,
      classWord: PropTypes.string.isRequired,
      cssVar: PropTypes.string.isRequired,
    })
  ),
  rgbRangeHandler: PropTypes.func.isRequired,
  handleClickSaveColor: PropTypes.func.isRequired,
  handleClickCancel: PropTypes.func.isRequired,
};

export default SliderRGB;
