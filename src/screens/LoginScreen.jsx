import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { colors } from "../global/colors";
import React, { useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useSignInMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { isValidEmail, isValidPassword } from "../validations/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();

  const validate = () => {
    let isValid = true;
    setErrorMail("");
    setErrorPassword("");

    if (!isValidEmail(email)) {
      setErrorMail("El email no es válido");
      isValid = false;
    }

    if (!isValidPassword(password)) {
      setErrorPassword("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    return isValid;
  };

  const onSubmit = async () => {
    if (!validate()) return;

    try {
      const { data, error } = await signIn({ email, password });

      if (error) {
        Alert.alert("Error", "Credenciales incorrectas o usuario no registrado");
        return;
      }

      dispatch(setUser({
        user: data.email,
        token: data.idToken,
        localId: data.localId,
      }));

    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Ocurrió un problema al iniciar sesión");
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Inicia sesión</Text>
        <InputForm label={"Email"} onChange={setEmail} error={errorMail} />
        <InputForm label={"Contraseña"} onChange={setPassword} error={errorPassword} isSecure />
        <SubmitButton onPress={onSubmit} title={isLoading ? "Cargando..." : "Entrar"} />
        <Text style={styles.sub}>¿No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Regístrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: colors.text,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sub: {
    marginTop: 10,
    color: colors.text,
    textAlign: "center",
  },
  subLink: {
    color: colors.success,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
});