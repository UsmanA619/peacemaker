import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';

function DeleteAction({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>Delete</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 90,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: -15
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "white"
  }
});

export default DeleteAction;
