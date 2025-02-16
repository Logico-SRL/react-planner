'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormNumberInput;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formTextInput = require('./form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
// import ReactRange from '@mapbox/react-range';


var sliderContainerStyle = { display: 'inline-block', width: '80%', marginRight: '5%' };
var sliderStyle = { display: 'block', width: '100%', height: '30px' };
var textContainerStyle = { display: 'inline-block', width: '15%', float: 'right' };
var textStyle = { height: '34px', textAlign: 'center' };

function FormNumberInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['value', 'onChange']);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { style: sliderContainerStyle },
      '...slider'
    ),
    _react2.default.createElement(
      'div',
      { style: textContainerStyle },
      _react2.default.createElement(_formTextInput2.default, { value: value, onChange: onChange, style: textStyle })
    )
  );
}