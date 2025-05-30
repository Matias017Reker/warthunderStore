import { Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { colors } from "../global/colors";
import React, { useState } from "react";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useNavigation } from "@react-navigation/native";
import { useSignUpMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { signupSchema } from "../validations/authShema";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMail, setErrorMail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [signUp, { isLoading }] = useSignUpMutation();

  const onSubmit = async () => {
    setErrorMail("");
    setErrorPassword("");
    setErrorConfirmPassword("");

    try {
      await signupSchema.validate(
        { email, password, confirmPassword },
        { abortEarly: false }
      );

      const { data, error } = await signUp({ email, password });

      if (error) {
        console.log("Error signup:", error);
        const errorMessage = error?.data?.error?.message || "Hubo un error";
        Alert.alert("Error", errorMessage);
        return;
      }

      dispatch(
        setUser({
          user: data.email,
          token: data.idToken,
        })
      );
    } catch (err) {
      if (err.name === "ValidationError") {
        err.inner.forEach((validationError) => {
          switch (validationError.path) {
            case "email":
              setErrorMail(validationError.message);
              break;
            case "password":
              setErrorPassword(validationError.message);
              break;
            case "confirmPassword":
              setErrorConfirmPassword(validationError.message);
              break;
            default:
              break;
          }
        });
      } else {
        console.error("Signup error:", err);
        Alert.alert("Error", "Hubo un problema al registrarse");
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Regístrate</Text>
        <InputForm label="Email" onChange={setEmail} error={errorMail} />
        <InputForm
          label="Contraseña"
          onChange={setPassword}
          error={errorPassword}
          isSecure
        />
        <InputForm
          label="Confirmar contraseña"
          onChange={setConfirmPassword}
          error={errorConfirmPassword}
          isSecure
        />
        <SubmitButton
          onPress={onSubmit}
          title={isLoading ? "Creando..." : "Crear cuenta"}
        />
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignupScreen;

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