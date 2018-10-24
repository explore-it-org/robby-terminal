import React from 'react';
import { Text } from 'react-native';
import SinglePickerMaterialDialog from './dialog/SinglePickerMaterialDialog';
import i18n from '../i18n';

class DeviceDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singlePickerSelectedItem: undefined
    }
  }
  render() {
    if (this.props.devices.length > 0) {
      return (
        <SinglePickerMaterialDialog
          title={i18n.t('message.pick-device')}
          items={this.props.devices.map((row, index) => ({ value: index, label: row }))}
          visible={this.props.isScanning}
          selectedItem={this.state.singlePickerSelectedItem}
          onCancel={() => this.props.onCancel()}
          onOk={result => {
            this.props.onOk(result.selectedItem);
          }}
        />
      )
    }
    return (
      <Text style={{overflow: 'hidden', height: 0}}>...</Text>
    )
  }
}

export default DeviceDialog;

