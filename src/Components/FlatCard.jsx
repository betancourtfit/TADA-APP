import { StyleSheet, Text, View } from 'react-native'
import { color } from '../Global/color'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: color.grisClaro,
        shadowColor: color.negro,
        shadowOpacity:1,
        shadowRadius:1,
        shadowOffset: {width: 3,height:5},
        elevation:10,
    }
})