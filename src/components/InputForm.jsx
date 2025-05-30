import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../global/colors';

const InputForm = ({ label, onChange, error = "", isSecure = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={
          label.toLowerCase().includes("confirmar")
            ? label
            : `Ingrese su ${label}`
        }
        style={styles.input}
        placeholderTextColor="white"
        onChangeText={onChange}
        secureTextEntry={isSecure}
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    color: colors.text,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.secondary,
    color: colors.text,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.text,
  },
  error: {
    color: "red",
    marginTop: 5,
    fontSize: 12,
  },
});