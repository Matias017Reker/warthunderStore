import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';
import NavBar from '../components/NavBar';
import { colors } from '../global/colors';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const user = useSelector((state) => state.auth.value.user);
  const userEmail = user?.email;
  const profileImage = user?.profileImage;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content}>
        <Image
          source={{
            uri: profileImage || 'https://i.pravatar.cc/150?img=3',
          }}
          style={styles.avatar}
        />
        <Text style={styles.email}>
          {userEmail || 'No hay usuario logueado'}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Cambiar foto de perfil"
            onPress={() => navigation.navigate('Image Selector')}
            color={colors.primary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  email: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '60%',
  },
});