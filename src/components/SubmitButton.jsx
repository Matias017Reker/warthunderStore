import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../global/colors';

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 16,
  },
});