import { StatusBar, Platform, ScrollView } from 'react-native';
import { StyleSheet, View, Button, Text } from 'react-native';
import Header from './src/Components/Header';
import TabNavigator from './src/navigation/TabNavigator';
import store  from './src/app/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store} >
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <TabNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: color.purplePrimary, // Color morado de fondo
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 15, // Agregar espacio para Android
  },
});
