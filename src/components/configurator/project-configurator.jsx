import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ContentTitle,
  ContentContainer,
  FormLabel,
  FormBlock,
  FormNumberInput,
  FormTextInput,
  FormSubmitButton,
  CancelButton
} from '../style/export';

export default class ProjectConfigurator extends Component {

  constructor(props, context) {
    super(props, context);

    let scene = props.state.scene;

    this.state = {
      dataWidth: scene.width,
      dataHeight: scene.height,
      dataCode: scene.drawcode,
      dataScope: scene.scope,
    };
  }

  onSubmit(event) {
    event.preventDefault();

    let { projectActions } = this.context;

    let { dataWidth, dataHeight, dataCode, dataScope } = this.state;
    dataWidth = parseInt(dataWidth);
    dataHeight = parseInt(dataHeight);
    if (dataWidth <= 100 || dataHeight <= 100) {
      alert('Scene size too small');
    } else {
      projectActions.setProjectProperties({ width: dataWidth, height: dataHeight, drawcode: dataCode, scope: dataScope });
    }
  }


  render() {
    let { width, height } = this.props;
    let { dataWidth, dataHeight, dataCode, dataScope } = this.state;
    let { projectActions, translator } = this.context;

    return (
      <ContentContainer width={width} height={height}>
        <ContentTitle>{translator.t('Project config')}</ContentTitle>

        <form onSubmit={e => this.onSubmit(e)}>
          <FormBlock>
            <FormLabel htmlFor='width'>{translator.t('width')}</FormLabel>
            <FormNumberInput
              id='width'
              placeholder='width'
              value={dataWidth}
              onChange={e => this.setState({ dataWidth: e.target.value })}
            />
          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor='height'>{translator.t('height')}</FormLabel>
            <FormNumberInput
              id='height'
              placeholder='height'
              value={dataHeight}
              onChange={e => this.setState({ dataHeight: e.target.value })}
            />
          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor='drawcode'>{translator.t('Project Code')}</FormLabel>
            <FormTextInput
              readonly={true}
              id='drawcode'
              placeholder='codice planner'
              value={dataCode}
              onChange={e => this.setState({ dataCode: e.target.value })}
            />
          </FormBlock>

          <FormBlock>
            <FormLabel htmlFor='scope'>{translator.t('Project Scope')}</FormLabel>
            <FormTextInput
              readonly={true}
              id='scope'
              placeholder='ambito'
              value={dataScope}
              onChange={e => this.setState({ dataScope: e.target.value })}
            />
          </FormBlock>


          <table style={{ float: 'right' }}>
            <tbody>
              <tr>
                <td>
                  <CancelButton size='large'
                    onClick={e => projectActions.rollback()}>{translator.t('Cancel')}</CancelButton>
                </td>
                <td>
                  <FormSubmitButton size='large'>{translator.t('Save')}</FormSubmitButton>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </ContentContainer>
    )
  }
}

ProjectConfigurator.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

ProjectConfigurator.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
