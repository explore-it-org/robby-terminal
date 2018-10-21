import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Image, Text, Platform } from 'react-native';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var img;
        if (this.props.isConnected) {
            img = require('../assets/connected-white.png')
        } else {
            img = require('../assets/disconnected-white.png')
        }
        var deviceName = ' ';
        if (this.props.actualDevice) {
            deviceName = this.props.actualDevice.name
        }
        return (
            <View style={styles.header}>
                <Text style={styles.text}>{deviceName}</Text>
                <View style={styles.buttons}>
                    <TouchableWithoutFeedback onPress={this.props.onConnectPress}>
                        <Image style={styles.image}
                            source={img}
                        />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.onTrashPress}>
                        <Image style={styles.image}
                            source={require('../assets/trash-white.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}
export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: window.width,
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        marginLeft: 10
    },
    image: {
        height: 30,
        width: 30,
        margin: 10
    },
    text: {
        color: 'yellow',
        fontSize: 26,
        fontWeight: 'bold',
        flex: 4,
        alignSelf: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1
    }
});