'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.UPDATE_2D_CAMERA:
      //return state;
      return state.merge({ viewer2D: new _immutable.Map(action.value) });

    case _constants.SELECT_TOOL_PAN:
      return state.set('mode', _constants.MODE_2D_PAN);

    case _constants.SELECT_TOOL_ZOOM_IN:
      return state.set('mode', _constants.MODE_2D_ZOOM_IN);

    case _constants.SELECT_TOOL_ZOOM_OUT:
      return state.set('mode', _constants.MODE_2D_ZOOM_OUT);
  }
};

var _immutable = require('immutable');

var _constants = require('../constants');