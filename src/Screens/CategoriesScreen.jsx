import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React from 'react'
import Card from '../Components/Card'
import Icons from 'react-native-vector-icons/MaterialIcons'
import { useGetProductsByCategoryQuery } from '../services/shopService';
import { useSelector } from 'react-redux';

const CategoriesScreen = ({ navigation }) => {
  const  categoryId = useSelector( (state) => state.shop.value.categorySelected);
  const { data: filteredCategories, eror: error, isLoading: isLoading } = useGetProductsByCategoryQuery(categoryId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error al cargar los productos</Text>
      </View>
    );
  }

  if (!filteredCategories || filteredCategories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Flecha de volver atrás */}
        <Pressable onPress={() => navigation.goBack()}>
          <Icons name="arrow-back" size={30} />
        </Pressable>
        <Text>No hay productos en esta categoría</Text>
      </View>
    );
  }

  const renderCategory = ({ item }) => {
  return(
    <Card item={item} style={styles.card} navigation={navigation} />
  )
  }

  return (
    <View>
      {/* Flecha de volver atras */}
      <Pressable onPress={() => navigation.goBack()}>
        <Icons name="arrow-back" size={30} />
      </Pressable>
      <FlatList
        data={filteredCategories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({})