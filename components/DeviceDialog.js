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
          // By default, the list looks for a key prop on each item and uses that for the React key.
          items={this.props.devices.map((row, index) => ({ key: index.toString(), label: row }))}
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

