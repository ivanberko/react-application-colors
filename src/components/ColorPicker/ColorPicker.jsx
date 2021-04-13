import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { rgbToHex, hexToRgb } from '../../utils';
import ColorsList from '../ColorsList';
import SliderRGB from '../SliderRGB';

import 'react-rangeslider/lib/index.css';
import './ColorPicker.scss';

const ColorPicker = ({ value, onChange, colors }) => {
  const [currentColor, setCurrentColor] = useState(value);
  const [previousColor, setPreviousColor] = useState(currentColor);
  const { r, g, b } = hexToRgb(currentColor);
  const [isShowColorsList, setIsShowColorsList] = useState(false);
  const [isShowRGBSlider, setIsShowRGBSlider] = useState(false);
  const [tempR, setTempR] = useState(r);
  const [tempG, setTempG] = useState(g);
  const [tempB, setTempB] = useState(b);
  const colorPickerNode = useRef();
  const dropdownRGBSliderNode = useRef(null);
  const dropdownListNode = useRef(null);

  const handleClickOutside = e => {
    if (dropdownRGBSliderNode.current !== null && !dropdownRGBSliderNode.current.contains(e.target)) {
      setIsShowRGBSlider(false);
      setCurrentColor(previousColor);
    }

    if (dropdownListNode.current !== null && !dropdownListNode.current.contains(e.target)) {
      setIsShowColorsList(false);
    }
  };

  useEffect(() => {
    colorPickerNode.current.style.setProperty('--red-color', r);
    colorPickerNode.current.style.setProperty('--green-color', g);
    colorPickerNode.current.style.setProperty('--blue-color', b);

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const togglerDropdownColorsListHandler = () => {
    if (isShowColorsList === true) {
      setIsShowColorsList(false);
    } else {
      setIsShowColorsList(true);
    }
  };

  const colorListItemHandler = hexCode => {
    setCurrentColor(hexCode);
    setIsShowColorsList(false);

    if (currentColor !== hexCode) {
      setPreviousColor(hexCode);
      onChange();
    }
  };

  const togglerRGBSliderHandler = () => {
    if (!isShowRGBSlider) setIsShowRGBSlider(true);
    setTempR(r);
    setTempG(g);
    setTempB(b);
  };

  const rgbRangeHandler = (setValue, value, cssVar) => {
    setValue(value);
    setCurrentColor(rgbToHex(tempR, tempG, tempB));
    colorPickerNode.current.style.setProperty(cssVar, value);
  };

  const handleClickSaveColor = () => {
    setIsShowRGBSlider(false);
    if (currentColor !== previousColor) {
      setPreviousColor(currentColor);
      onChange();
    }
  };

  const handleClickCancel = () => {
    setIsShowRGBSlider(false);
    setCurrentColor(previousColor);
  };

  const componentsRGB = [
    {
      letter: 'R',
      value: tempR,
      setValue: setTempR,
      classWord: 'red',
      cssVar: '--red-color',
    },
    {
      letter: 'G',
      value: tempG,
      setValue: setTempG,
      classWord: 'green',
      cssVar: '--green-color',
    },
    {
      letter: 'B',
      value: tempB,
      setValue: setTempB,
      classWord: 'blue',
      cssVar: '--blue-color',
    },
  ];

  return (
    <div className="color-picker" ref={colorPickerNode}>
      <div className="color-picker__hex-code">{currentColor}</div>
      <div className="color-picker__with-dropdown">
        <button
          type="button"
          className={classNames('color-picker__current-color', {
            'is-open': isShowRGBSlider,
          })}
          onClick={() => togglerRGBSliderHandler()}
        >
          <span className="color-picker__square-icon" style={{ backgroundColor: currentColor }} />
        </button>
        {isShowRGBSlider && (
          <div className="color-picker__dropdown color-picker__dropdown--rgb" ref={dropdownRGBSliderNode}>
            <SliderRGB
              componentsRGB={componentsRGB}
              rgbRangeHandler={rgbRangeHandler}
              handleClickSaveColor={handleClickSaveColor}
              handleClickCancel={handleClickCancel}
            />
          </div>
        )}
      </div>
      <div className="color-picker__with-dropdown">
        <button
          aria-label="Toggle"
          type="button"
          className={classNames('color-picker__arrow', { 'is-rotate': isShowColorsList })}
          onClick={togglerDropdownColorsListHandler}
        />
        {isShowColorsList && (
          <ul className="color-picker__dropdown color-picker__dropdown--list color-picker-list" ref={dropdownListNode}>
            <ColorsList colors={colors} colorListItemHandler={colorListItemHandler} currentColor={currentColor} />
          </ul>
        )}
      </div>
    </div>
  );
};

ColorPicker.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      hexCode: PropTypes.string.isRequired,
    })
  ),
};

ColorPicker.defaultProps = {
  onChange: () => {},
  colors: [],
};

export default ColorPicker;
