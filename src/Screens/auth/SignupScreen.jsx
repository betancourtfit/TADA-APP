import React from 'react';
import { View, Text, TextInput, Button, Dimensions, StyleSheet } from 'react-native';
import { color } from '../../Global/color.js'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/auth/authSlice.js';
import { useNavigation } from '@react-navigation/native';

const textInputWidth = Dimensions.get('screen').width*0.7

const SignupScreen = () => {
  const [email, setMail] =  useState('prueba@juan.com')
  const [name, setName] = useState('Jhon')
  const [lastName, setLastName] = useState('Doe')
  const [idNumber, setIdNumber] = useState('10000')
  const [phone, setPhone] = useState('+54911000000')
  const [password, setPassword] = useState('Dev123!')
  const [confirmPassword, setConfirmPassword] = useState('Dev123!')
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [signup, result] = useSignupMutation();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await signup({ email, password, name, lastName, idNumber, phone }).unwrap();
      alert("Registro exitoso");
    } catch (err) {
      alert("Error en el registro");
    }
  };

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


