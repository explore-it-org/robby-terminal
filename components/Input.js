
import React from 'react';
import { StyleSheet, KeyboardAvoidingView, View, TextInput, TouchableWithoutFeedback, Image, Platform } from 'react-native';
import i18n from '../i18n';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendText: ''
        }
    }
    render() {
        const padding = Platform.OS === 'ios' ? 'padding' : '';
        return (
            <KeyboardAvoidingView style={styles.container} behavior={padding}>
                <View style={styles.inputfield}>
                    <TextInput style={styles.text}
                        onChangeText={(textEntry) => { this.setState({ sendText: textEntry }) }}
                        value={this.state.sendText}
                        placeholder={i18n.t('input.placeholder')}
                    />
                </View >
                <View style={styles.sendbutton}>
                    <TouchableWithoutFeedback onPress={this.onSendButton} underlayColor='grey'>
                        <Image
                            source={require('../assets/send-white.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAvoidingView>

        )
    }
    onSendButton = () => {
        this.props.sendCommand(this.state.sendText);
        this.setState({
            sendText: ''
        })
    }
}

export default Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: window.width,
        margin: 10,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputfield: {
        backgroundColor: '#FFFFFF',
        flex: 8,
        height: 40,
        justifyContent: 'center'
    },
    sendbutton: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        backgroundColor: 'transparent',
        marginLeft: 5
    }
});

