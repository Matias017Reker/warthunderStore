import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { setProfileImage } from '../features/user/userSlice';
import { useNavigation } from '@react-navigation/native';

const ImageSelectorScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const requestPermission = async (type) => {
    let permission;
    if (type === 'camera') {
      permission = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    return permission.status === 'granted';
  };

  const handleImage = async (action) => {
    const hasPermission = await requestPermission(action);
    if (!hasPermission) return;

    const result = await (action === 'camera'
      ? ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 })
      : ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.7 }));

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      dispatch(setProfileImage(uri));
      navigation.goBack(); // volver a AccountScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccioná tu foto de perfil</Text>

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

      <View style={styles.buttonsContainer}>
        <Button title="Tomar Foto" onPress={() => handleImage('camera')} />
        <View style={{ height: 10 }} />
        <Button title="Elegir de la Galería" onPress={() => handleImage('gallery')} />
      </View>
    </View>
  );
};

export default ImageSelectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#0af',
  },
  buttonsContainer: {
    width: '100%',
  },
});