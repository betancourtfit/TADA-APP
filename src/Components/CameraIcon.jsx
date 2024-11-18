import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from '../Global/color';

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Icon name="photo-camera" size={24} color="#fff" />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:color.grisOscuro,
        width:48,
        height:48,
        borderRadius:32
    }
})