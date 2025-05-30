import { object, string, ref } from 'yup';

export const signupSchema = object().shape({
email: string()
    .required("Se requiere Email")
    .email("Ingresa un Email válido"),
password: string()
    .required("Se requiere contraseña")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
confirmPassword: string()
    .oneOf([ref("password"), null], "Las contraseñas deben coincidir")
    .required("Se requiere confirmar contraseña"),
});