import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Linking, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { color } from '../../Global/color.js';
import { setLogin, setImage } from '../../features/auth/authSlice';
import { useLoginMutation, useSignupAnonymousMutation } from '../../services/authService';
import { useLazyGetProfilePictureQuery } from '../../services/userService.js';
import { insertSession } from '../../db/index.js';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmailInput] = useState('prueba@juan.com');
  const [password, setPassword] = useState('Dev123!');
  const [localId, setLocalId] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const [login, { isLoading, isError, error, data }] = useLoginMutation();
  const [triggerGetProfilePicture, { data: dataProfile, isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile }] =
    useLazyGetProfilePictureQuery();
  const [signupAnonymous, { isLoading: isLoadingAnonymous, isError: isErrorAnonymous, error: errorAnonymous, data: dataAnonymous }] = useSignupAnonymousMutation();

  const handleLogin = async () => {
    if (!email) {
      console.error('El campo de correo electrónico está vacío');
      return;
    }
    try {
      const loginResult = await login({ email, password }).unwrap();
      setLocalId(loginResult.localId);
      triggerGetProfilePicture(loginResult.localId);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signupAnonymous().unwrap();
    } catch (error) {
      console.error('Error al iniciar sesión anónima:', error);
      if (error?.data?.error?.code === 400 && error?.data?.error?.message === 'ADMIN_ONLY_OPERATION') {
        console.error('La operación de inicio de sesión anónima está restringida a administradores.');
      }
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setLogin(data));
    }
    if (dataAnonymous) {
      dispatch(setLogin(dataAnonymous));
    }
  }, [data, dataAnonymous, dispatch]);

  useEffect(() => {
    if (isErrorProfile) {
      console.error("Error al obtener perfil:", errorProfile);
    }
  }, [isLoadingProfile, isErrorProfile, dataProfile]);


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su email"
        placeholderTextColor={color.grisClaro}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmailInput}
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese su contraseña"
        placeholderTextColor={color.grisClaro}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.toggleContainer}>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          trackColor={{ false: color.grisClaro, true: 'yellow' }}
          thumbColor={rememberMe ? 'yellow' : color.grisMedio}
        />
        <Text style={styles.label}>Recordarme</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color={color.purplePrimary} />
      ) : (
        <Button title="Iniciar sesión" color={color.purplePrimary} onPress={handleLogin} />
      )}
      {isError && <Text style={styles.errorText}>Error al iniciar sesión: {error?.data?.message || 'Error desconocido'}</Text>}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Aún no tengo cuenta</Text>
      </TouchableOpacity>
      {isLoadingAnonymous ? (
        <ActivityIndicator size="large" color={color.purplePrimary} />
      ) : (
        <Button title="Iniciar sesión anónima" color={color.purpleSecondary} onPress={handleAnonymousLogin} />
      )}
      {isErrorAnonymous && (
        <Text style={styles.errorText}>
          Error al iniciar sesión anónima: {errorAnonymous?.data?.message || 'Error desconocido'}
          {errorAnonymous?.data?.error?.code === 400 && errorAnonymous?.data?.error?.message === 'ADMIN_ONLY_OPERATION' && (
            <Text style={styles.errorText}> La operación de inicio de sesión anónima está restringida a administradores.</Text>
          )}
        </Text>
      )}
      <Text style={styles.termsText}>
        Al continuar, aceptas nuestras{' '}
        <Text style={styles.linkText} onPress={() => Linking.openURL('https://example.com/privacidad')}>
          políticas de privacidad
        </Text>{' '}
        y nuestros{' '}
        <Text style={styles.linkText} onPress={() => Linking.openURL('https://example.com/terminos')}>
          términos y condiciones
        </Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    color: color.negro,
  },
  input: {
    height: 40,
    borderColor: color.grisMedio,
    borderWidth: 1,
    marginBottom: 20,
  },
  signupText: {
    marginTop: 20,
    color: color.purpleSecondary,
  },
  termsText: {
    marginTop: 20,
    color: color.negro,
  },
  linkText: {
    color: color.purpleSecondary,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default LoginScreen;
