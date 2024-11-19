import React from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet } from 'react-native';
import { color } from '../../Global/color.js'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/auth/authSlice.js';
import { useNavigation } from '@react-navigation/native';
import { isValidEmail } from '../../utils/functions.js';
import { clearSessions, insertSession } from '../../db/index.js';
import Toast from 'react-native-toast-message';

const textInputWidth = Dimensions.get('screen').width*0.7

const SignupScreen = () => {
  const [email, setMail] =  useState('prueba@juan.com')
  const [name, setName] = useState('Jhon')
  const [lastName, setLastName] = useState('Doe')
  const [idNumber, setIdNumber] = useState('10000')
  const [phone, setPhone] = useState('+54911000000')
  const [password, setPassword] = useState('Dev123!')
  const [confirmPassword, setConfirmPassword] = useState('Dev123!')
  const [isEmailValid, setIsEmailValid] = useState(true);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signup, result] = useSignupMutation();

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
    // Validación de contraseñas
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Validación de email
    if (!isValidEmail(email)) {
      setIsEmailValid(false);
      alert("Ingrese un email válido");
      return;
    }

    try {
      // Intentar registro
      const response = await signup({ email, password, name, lastName, idNumber, phone }).unwrap();
      console.log(response);
      // Si el registro es exitoso, limpiar sesiones e insertar la nueva
      await clearSessions();
      await insertSession(response.localId, email, response.idToken);

          // Mostrar Toast de bienvenida
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: `Bienvenido, ${name}! 🎉`,
      });
      dispatch(setLogin(response));
    } catch (err) {
      // Obtener mensaje de error
      const errorMessage = getErrorMessage(err);

      // Mostrar Toast con el mensaje de error
      Toast.show({
        type: 'error',
        text1: 'Error en el registro',
        text2: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (email) {
      setIsEmailValid(isValidEmail(email)); // Actualiza el estado de si el email es válido
    }
  }, [email]);

  useEffect(() => {
    if (result.status === 'fulfilled') {
      dispatch(setLogin(result.data));

    } if (result.status === 'rejected') {
      console.log(result);
    }
  })

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        onChangeText={(text) => setMail(text)}
        style={styles.input}
        placeholder="Ingrese su email"
        placeholderTextColor={color.grisClaro}
        keyboardType="email-address"
        value={email}
      />
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        style={styles.input}
        placeholder="Ingrese su nombre"
        placeholderTextColor={color.grisClaro}
        value={name}
      />
      <Text style={styles.label}>Apellido</Text>
      <TextInput
        onChangeText={(text) =>  setLastName(text)}
        style={styles.input}
        placeholder="Ingrese su apellido"
        placeholderTextColor={color.grisClaro}
        value={lastName}
      />
      <Text style={styles.label}>DNI</Text>
      <TextInput
        onChangeText={(text) => setIdNumber(text)}
        style={styles.input}
        placeholder="Ingrese su DNI"
        placeholderTextColor={color.grisClaro}
        keyboardType="numeric"
        value={idNumber}
      />
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
        placeholder="Ingrese su teléfono"
        placeholderTextColor={color.grisClaro}
        keyboardType="phone-pad"
        value={phone}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Ingrese su contraseña"
        placeholderTextColor={color.grisClaro}
        secureTextEntry
        value={password}
      />
      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
        placeholder="Confirme su contraseña"
        placeholderTextColor={color.grisClaro}
        secureTextEntry
        value={confirmPassword}
      />
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
    backgroundColor: color.grisClaro
  },
  loginText: {
    color: color.purplePrimary,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});


