import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const Log = ({ message }) => {
    return (
        <TouchableWithoutFeedback>
            <ScrollView
                ref={ref => this.scrollView = ref}
                onContentSizeChange={() => {
                    this.scrollView.scrollToEnd();
                }}>
                <Text style={styles.message}>{message}</Text>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    message: {
        padding: 15,
        fontSize: 12,
        color: 'white'
    }
});

export default Log;
