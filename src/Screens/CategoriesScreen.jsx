import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import products from '../Data/products.json'
import Card from '../Components/Card'

const CategoriesScreen = ({ route }) => {
  const { categoryId, categoryName } = route.params;
  const filteredCategories = products.filter(product => product.categoryId === categoryId);

  if (filteredCategories.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No hay productos en esta categoría</Text>
      </View>
    )
  }
  const renderCategory = ({ item }) => {
  return(
    <Card item={item} style={styles.card} />
  )
  }

  return (
    <View>
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