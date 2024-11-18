import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { color } from '../Global/color';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Barra de ubicación */}
      <View style={styles.locationBar}>
        <MaterialIcons name="menu" size={28} color="#F4C10F" />
        <Text style={styles.locationText}>Fray Justo Santa María de Oro, 244...</Text>
        <MaterialIcons name="keyboard-arrow-down" size={28} color="#F4C10F" />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="¿Qué querés pedir?"
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.purplePrimary , // Color morado de fondo
    padding: 15,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    color: color.yellowPrimary , // Color dorado
    fontSize: 16,
    marginLeft: 10,
    flex: 1, // Para que ocupe el espacio disponible
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Ocupa todo el espacio restante
    fontSize: 16,
    color: '#333',
  },
});

export default Header;
