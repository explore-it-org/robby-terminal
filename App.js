import React, { Component } from 'react';
import { StyleSheet, AppState, View, StatusBar } from 'react-native';
import Input from './components/Input';
import Log from './components/Log';
import Header from './components/Header';
import DeviceDialog from './components/DeviceDialog';
import Instruction from './components/Instruction';
import moment from 'moment';
import packageJson from './package.json';
import RNLanguages from 'react-native-languages';
import i18n from './i18n';
import BleService from './integration/BleService';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      logMessage: '',
      appState: AppState.currentState,
      isConnected: false,
      isScanning: false,
      isPoweredOn: false,
      bleDevices: []
    }
    this.scanningTimer = null;
  }

  componentWillMount() {
    BleService.requestLocationPermission();
    this.checkBlueetoothState();
    AppState.addEventListener('change', this.handleAppStateChange);
    RNLanguages.addEventListener('change', this.onLanguagesChange);
  }

  componentWillUnmount() {
    this.disconnect();
    AppState.removeEventListener('change', this.handleAppStateChange);
    RNLanguages.removeEventListener('change', this.onLanguagesChange);
  }

  onLanguagesChange = ({ language }) => {
    i18n.locale = language;
  };

  disconnect = () => {
    if (BleService.getActDevice()) {
      const device = BleService.getActDevice();
      BleService.shutdown();
      this.addLogMessage(i18n.t('message.disconnected') + ' "' + device.name + '"');
      this.setState({
        isConnected: false
      })
    }
  }

  changeConnectState = () => {
    if (this.state.isConnected) {
      this.disconnect();
    } else {
      this.startScanning();
    }
  }

  startScanning = () => {
    this.setState({
      isScanning: true
    })
    this.addLogMessage(i18n.t('message.scanning'));
    BleService.scanningForDevices((error) => {
      console.log(error);
      this.addLogMessage(i18n.t('message.scan-error'));
    }, (device) => {
      // Found new device. Add it to the list.
      this.addLogMessage(i18n.t('message.found-device') + ' "' + device + '"');
      let tmpDevices = this.state.bleDevices;
      tmpDevices.push(device);
      this.setState({
        bleDevices: tmpDevices
      })
    });
    this.scanningTimer = setTimeout(() => {
      if ((this.state.bleDevices.length == 0) && (!BleService.getActDevice()) && (this.state.isScanning)) {
        this.stopScanning();
        this.addLogMessage('Warning - ' + i18n.t('message.no-devices-found'));
      }
    }, 5000);
  }

  stopScanning = () => {
    clearTimeout(this.scanningTimer);
    BleService.stopScanning();
    this.setState({
      isScanning: false,
      bleDevices: []
    })
  }

  connectToDevice = (item) => {
    if (item == null) {
      this.addLogMessage(i18n.t('message.no-device-selected'));
      this.stopScanning();
      return
    }
    this.stopScanning();
    BleService.setActDevice(item.label);
    this.addLogMessage(i18n.t('message.connecting') + ' "' + item.label + '"');
    BleService.connectToActDevice((response) => {
      // handle response
      this.addLogMessage(response);
    }, () => {
      // handle message; only successful connection so far!
      this.addLogMessage(i18n.t('message.connected') + ' "' + item.label + '"');
      this.setState({
        isConnected: true
      })
    }, () => {
      // show general error message to user
      this.addLogMessage('Error - ' + i18n.t('message.bluetooth-error'));
    });
  }

  checkBlueetoothState() {
    BleService.checkBluetoothState(() => {
      this.setState({
        isPoweredOn: true
      })
    });
    // wait 1sec to enable bluetooth stack to come alive
    setTimeout(() => {
      if (!this.state.isPoweredOn) {
        this.addLogMessage(i18n.t('message.enable-bluetooth'));
      }
    }, 1000);
  }

  /*
  * Handles state changes, e.g. if app goes into background.
  */
  handleAppStateChange = (nextAppState) => {
    console.log('State from ' + this.state.appState + " to " + nextAppState);
    if ((this.state.appState !== 'active') && (nextAppState === 'active')) {
      this.checkBlueetoothState();
    } else {
      this.disconnect();
      let res = this.state.logMessage.split('\n');
      console.log(res);
      if (res.length == 2) {
        this.clearLog();
      }
      this.setState({
        isPoweredOn: false
      })
    }
    this.setState({
      appState: nextAppState
    })
  }

  sendCommand = (command) => {
    if (this.state.isConnected) {
      BleService.sendCommandToActDevice(command);
      this.addLogMessage(command);
    } else {
      this.addLogMessage(i18n.t('message.nodevice-connected'))
    }
  }

  clearLog = () => {
    this.setState({
      logMessage: ''
    });
  }

  addLogMessage(message) {
    if (message.length > 0) {
      const timestamp = moment().format('HH:mm:ss');
      let newLogLine = this.state.logMessage + '\n' + timestamp + ': ' + message;
      this.setState({
        logMessage: newLogLine
      });
    }
  }

  render() {
    const instructions = packageJson.description + ' v' + packageJson.version + ':\n'
      + '- ' + i18n.t('instruction.scan') + '\n'
      + '- ' + i18n.t('instruction.trash') + '\n'
      + '- ' + i18n.t('instruction.command') + '\n'
      + '- ' + i18n.t('instruction.send') + '\n'
    return (
      <View style={styles.container}>
        <StatusBar barStyle = "light-content" hidden = {false}/>
        <DeviceDialog devices={this.state.bleDevices}
          isScanning={this.state.isScanning}
          onCancel={this.stopScanning}
          onOk={this.connectToDevice} />
        <Header actualDevice={BleService.getActDevice()}
          onTrashPress={this.clearLog}
          onConnectPress={this.changeConnectState}
          isConnected={this.state.isConnected} />
        <Log style={styles.log}
          message={this.state.logMessage} />
        <Instruction message={instructions} />
        <Input style={styles.input}
          sendCommand={this.sendCommand} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#000000'
  },
  log: {
    flex: 4,
    width: '100%',
  },
  input: {
    flex: 1
  }
});
