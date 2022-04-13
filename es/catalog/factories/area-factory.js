var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import * as SharedStyle from '../../shared-style';
import Translator from '../../translator/translator';

var translator = new Translator();

export default function AreaFactory(name, info, textures) {

  var areaElement = {
    name: name,
    prototype: 'areas',
    info: _extends({}, info, {
      visibility: {
        catalog: false,
        layerElementsVisible: false
      }
    }),
    properties: {
      patternColor: {
        label: translator.t('color'),
        type: 'color',
        defaultValue: SharedStyle.AREA_MESH_COLOR.unselected
      },
      thickness: {
        label: translator.t('thickness'),
        type: 'length-measure',
        defaultValue: {
          length: 0
        }
      }
    },
    render2D: function render2D(element, layer, scene) {
      var path = '';

      ///print area path
      element.vertices.forEach(function (vertexID, ind) {
        var vertex = layer.vertices.get(vertexID);
        path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach(function (areaID) {
        var area = layer.areas.get(areaID);

        area.vertices.reverse().forEach(function (vertexID, ind) {
          var vertex = layer.vertices.get(vertexID);
          path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
        });
      });

      var fill = element.selected ? SharedStyle.AREA_MESH_COLOR.selected : element.properties.get('patternColor');

      return React.createElement('path', { d: path, fill: fill });
    }

  };

  if (textures && textures !== {}) {

    var textureValues = { 'none': 'None' };

    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    areaElement.properties.texture = {
      label: translator.t('texture'),
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };
  }

  return areaElement;
}