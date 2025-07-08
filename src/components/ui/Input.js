import React from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Input = ({ style, ...props }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      mode="outlined"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});

export default Input;