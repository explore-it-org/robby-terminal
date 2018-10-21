import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Instruction = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        padding: 15,
        fontSize: 12,
        color: 'yellow'
    },
    container: {
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#FFFFFF',
        borderTopWidth: StyleSheet.hairlineWidth,
    }
});

export default Instruction;
