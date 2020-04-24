import React from 'react';
import { ScrollView, StyleSheet, CheckBox, View, Text } from 'react-native';

class ChatBox extends React.Component {
  render() {
    return (
      <view style={styles.chatbox} >
        <Text>111</Text>
      </view >
    );
  }
}

const styles = StyleSheet.create({
  chatbox: {
    backgroundColor: 'gray',
    width: 200,
  },
});
