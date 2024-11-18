import { StatusBar, Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/app/store';
import MainNavigator from './src/navigation/MainNavigator';
import { createSessionsTable } from './src/db';
import Toast from 'react-native-toast-message';

createSessionsTable()
  .then(() => console.log('Sessions table created'))
  .catch(err => console.log('Error creating sessions table', err))


export default function App() {
  return (
    <Provider store={store} >
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <MainNavigator />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: color.purplePrimary, // Color morado de fondo
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15, // Agregar espacio para Android
  },
});


