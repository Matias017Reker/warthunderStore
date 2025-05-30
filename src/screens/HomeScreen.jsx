import React, { useRef, useState } from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList, Image, Dimensions, Animated, Pressable, Linking,} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavBar from '../components/NavBar';
import { colors } from '../global/colors';
import { useGetProductsQuery } from '../services/shopServices';



const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.6;
const SPACING = 10;
const sidePadding = (width - ITEM_WIDTH) / 2;

export default function HomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { data: productsData, isLoading, error } = useGetProductsQuery();

  const lowTierProducts = productsData
    ? Object.values(productsData).filter(
        (item) => item.tier === 'I' || item.tier === 'II' || item.tier === 'III'
      )
    : [];

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.85, 1, 0.85],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <Image source={{ uri: item.img }} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{item.name} {'\u200A'}</Text>
        <Text style={styles.price}>${item.price} {'\u200A'}</Text>
      </Animated.View>
    );
  };

  const handleDownloadPress = () => {
    Linking.openURL('https://store.steampowered.com/app/236390/War_Thunder/');
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <NavBar />
        <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
          Cargando productos...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <NavBar />
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          Error al cargar productos
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView style={styles.app}>
        <Text style={styles.title}>
          Fin de semana de ofertas en Low Tier{'\u200A'}
        </Text>
        <FlatList
          data={lowTierProducts}
          keyExtractor={(item) => item.id?.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: sidePadding,
          }}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment="center"
          decelerationRate="fast"
          renderItem={renderItem}
        />

        <View style={styles.downloadContainer}>
          <Text style={styles.downloadText}>¿Aún no tienes WarThunder? {'\u200A'}</Text>
          <Pressable onPress={handleDownloadPress} style={styles.downloadButton}>
            <Text style={styles.downloadButtonText}>Descargar</Text>
          </Pressable>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.text,
  },
  app: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 0,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  name: {
    color: 'white',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  price: {
    color: 'lightgreen',
    fontSize: 14,
    marginTop: 4,
  },
  downloadContainer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 60,
  },
  downloadText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 12,
  },
  downloadButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});