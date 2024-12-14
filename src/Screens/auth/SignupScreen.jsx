import React from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet } from 'react-native';
import { color } from '../../Global/color.js';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/auth/authSlice.js';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail } from '../../utils/functions.js';
import { clearSessions, insertSession } from '../../db/index.js';
import Toast from 'react-native-toast-message';

const textInputWidth = Dimensions.get('screen').width * 0.7;

const SignupScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    idNumber: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [isEmailValid, setIsEmailValid] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signup] = useSignupMutation();

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const getErrorMessage = (firebaseError) => {
    const errorCode = firebaseError?.data?.error?.message;

    switch (errorCode) {
      case 'EMAIL_EXISTS':
        return 'El correo electrónico ya está registrado.';
      case 'OPERATION_NOT_ALLOWED':
        return 'Esta operación no está permitida. Contacta con soporte.';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Demasiados intentos fallidos. Intenta más tarde.';
      case 'INVALID_EMAIL':
        return 'El correo electrónico no es válido.';
      case 'WEAK_PASSWORD':
        return 'La contraseña debe tener al menos 6 caracteres.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  };

  const handleSignup = async () => {
    const { email, password, confirmPassword, name, lastName, idNumber, phone } = formData;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      alert('Ingrese un email válido');
      return;
    }

    try {
      const response = await signup({ email, password, name, lastName, idNumber, phone }).unwrap();

      await clearSessions();
      await insertSession(response.localId, email, response.idToken);

      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: `Bienvenido, ${name}! 🎉`,
      });

      dispatch(setLogin(response));
    } catch (err) {
      const errorMessage = getErrorMessage(err);

      Toast.show({
        type: 'error',
        text1: 'Error en el registro',
        text2: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (formData.email) {
      setIsEmailValid(isValidEmail(formData.email));
    }
  }, [formData.email]);

  const placeholders = {
    email: 'prueba@juan.com',
    name: 'Jhon',
    lastName: 'Doe',
    idNumber: '10000',
    phone: '+54911000000',
    password: 'Dev123!',
    confirmPassword: 'Dev123!',
  };

  return (
    <View style={styles.container}>
      {Object.keys(formData).map((field) => (
        <View key={field}>
          <Text style={styles.label}>{field === 'confirmPassword' ? 'Confirmar Contraseña' : field.charAt(0).toUpperCase() + field.slice(1)}</Text>
          <TextInput
            onChangeText={(text) => handleChange(field, text)}
            style={styles.input}
            placeholder={placeholders[field]}
            defaultValue={placeholders[field]} // Ensure the current value is shown
            placeholderTextColor={color.grisClaro}
            value={formData[field]} // Ensure the current value is shown
            secureTextEntry={field.includes('password')}
            keyboardType={field === 'email' ? 'email-address' : field === 'idNumber' ? 'numeric' : 'default'}
          />
        </View>
      ))}
      <Button title="Registrarse" color={color.purplePrimary} onPress={handleSignup} />
      <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
        Ya tengo cuenta
      </Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: color.negro,
  },
  input: {
    height: 40,
    borderColor: color.grisMedio,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    width: textInputWidth,
    backgroundColor: color.grisClaro,
  },
  loginText: {
    color: color.purplePrimary,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
