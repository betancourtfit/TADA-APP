import React, { useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Pressable, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, setImage } from '../features/auth/authSlice';
import { color } from '../Global/color';
import CameraIcon from '../Components/CameraIcon';
import * as ImagePicker from 'expo-image-picker';
import { usePutProfilePictureMutation, useLazyGetProfilePictureQuery } from '../services/userService';

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const image = useSelector(state => state.auth.image);
    const localId = useSelector(state => state.auth.localId);
    const dispatch = useDispatch();
    const [putProfilePicture, res] = usePutProfilePictureMutation();
    const [getProfilePicture, { data: dataProfile, isLoading: isLoadingProfile, isError: isErrorProfile }] = useLazyGetProfilePictureQuery();

    useEffect(() => {
        if (localId) {
        getProfilePicture(localId);
        }
    }, [localId]);

    useEffect(() => {
        if (dataProfile && dataProfile.image) {
        dispatch(setImage(dataProfile.image));
        }
    }, [dataProfile]);

    const handleLogout = () => {
        dispatch(setLogout());
    };

    const verifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.getCameraPermissionsAsync();
        if (!granted) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Necesitamos permisos de cámara para poder cambiar tu foto de perfil');
            return false;
        }
        }
        return true;
    };

    const handleImageProfile = async () => {
        const hasPermission = await verifyCameraPermissions();
        if (hasPermission) {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });
        if (!result.cancelled) {
            const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
            dispatch(setImage(imageUri));
            putProfilePicture({ image: imageUri, localId });
        } else {
            console.log('Cancelado');
        }
        }
    };

    return (
        <>
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
            {
                image
                ? <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                : <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
            }
            <Pressable onPress={handleImageProfile} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                <CameraIcon />
            </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user}</Text>
        </View>
        <Button title="Cerrar sesión" onPress={handleLogout} />
        </>
    );
    };

    export default Profile;

    const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
    },
    closeButtonText: {
        fontSize: 24,
        color: color.morado,
    },
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: color.morado,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: color.blanco,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    }
});

