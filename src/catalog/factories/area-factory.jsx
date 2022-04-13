import React from 'react';
import * as SharedStyle from '../../shared-style';
import Translator from '../../translator/translator';

let translator = new Translator();

export default function AreaFactory(name, info, textures) {

  let areaElement = {
    name,
    prototype: 'areas',
    info: {
      ...info,
      visibility: {
        catalog: false,
        layerElementsVisible: false
      }
    },
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
          length: 0,
        }
      }
    },
    render2D: function (element, layer, scene) {
      let path = '';

      ///print area path
      element.vertices.forEach((vertexID, ind) => {
        let vertex = layer.vertices.get(vertexID);
        path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach(areaID => {
        let area = layer.areas.get(areaID);

        area.vertices.reverse().forEach((vertexID, ind) => {
          let vertex = layer.vertices.get(vertexID);
          path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
        });

      });

      let fill = element.selected ? SharedStyle.AREA_MESH_COLOR.selected : element.properties.get('patternColor');

      return (<path d={path} fill={fill} />);
    },


  };

  if (textures && textures !== {}) {

    let textureValues = { 'none': 'None' };

    for (let textureName in textures) {
      textureValues[textureName] = textures[textureName].name
    }

    areaElement.properties.texture = {
      label: translator.t('texture'),
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };

  }

  return areaElement

}
