import { StatusBar, Platform, ScrollView } from 'react-native';
import { StyleSheet, View, Button, Text } from 'react-native';
import Header from './src/Components/Header';
import Navigator from './src/navigation/Navigator';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <Header />
      <Navigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: color.purplePrimary, // Color morado de fondo
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15, // Agregar espacio para Android
  },
});
