import React, { useState, } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, } from 'react-native';
import Checkbox from 'expo-checkbox';
import NavBar from '../components/NavBar';
import { colors } from '../global/colors';
import { useGetProductsQuery } from '../services/shopServices';
import { useNavigation } from '@react-navigation/native';

const naciones = ['EEUU', 'URSS', 'Israel', 'Alemania', 'Japon', 'Suecia', 'China', 'Italia'];
const vehiculos = ['Avion', 'Tanque'];
const tiers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

export default function MarketScreen() {
  const [search, setSearch] = useState('');
  const [selectedNaciones, setSelectedNaciones] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const [showNaciones, setShowNaciones] = useState(false);
  const [showVehiculos, setShowVehiculos] = useState(false);
  const [showTiers, setShowTiers] = useState(false);

  const navigation = useNavigation();
  const { data: productsData, isLoading, error } = useGetProductsQuery();

  const toggleCheckbox = (value, setState, state) => {
    if (state.includes(value)) {
      setState(state.filter(item => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const filteredProducts = () => {
    if (!productsData) return [];

    return Object.values(productsData).filter(product => {
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchNacion =
        selectedNaciones.length === 0 || selectedNaciones.includes(product.nacion);
      const matchVehiculo =
        selectedVehiculos.length === 0 || selectedVehiculos.includes(product.vehiculo);
      const matchTier =
        selectedTiers.length === 0 || selectedTiers.includes(product.tier);

      return matchSearch && matchNacion && matchVehiculo && matchTier;
    });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ItemDetail', { product: item })}
    >
      <Image source={{ uri: item.img }} style={styles.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productInfo}>Precio: ${item.price}</Text>
    </TouchableOpacity>
  );

  const renderCheckboxList = (title, options, selected, setSelected, visible, setVisible) => (
    <View style={styles.checkboxGroup}>
      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{title}</Text>
        <Text style={styles.arrow}>{visible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {visible && (
        <View style={styles.checkboxRow}>
          {options.map(option => (
            <View key={option} style={styles.checkboxItem}>
              <Checkbox
                value={selected.includes(option)}
                onValueChange={() => toggleCheckbox(option, setSelected, selected)}
                color={colors.success}
              />
              <Text style={styles.checkboxLabel}>{option + '\u200A'}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

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
      <FlatList
        data={filteredProducts()}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <TextInput
              style={styles.searchBar}
              placeholder="Buscar producto..."
              placeholderTextColor="#ccc"
              value={search}
              onChangeText={setSearch}
            />
            {renderCheckboxList('Nación', naciones, selectedNaciones, setSelectedNaciones, showNaciones, setShowNaciones)}
            {renderCheckboxList('Vehículo', vehiculos, selectedVehiculos, setSelectedVehiculos, showVehiculos, setShowVehiculos)}
            {renderCheckboxList('Tier', tiers, selectedTiers, setSelectedTiers, showTiers, setShowTiers)}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 10,
  },
  searchBar: {
    backgroundColor: '#222',
    color: colors.text,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productInfo: {
    color: '#ccc',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  checkboxGroup: {
    marginBottom: 15,
  },
  groupTitle: {
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  checkboxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: colors.secondary,
    padding: 5,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 8,
    flexShrink: 0,
  },
  checkboxLabel: {
    color: colors.text,
    marginLeft: 8,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: colors.secondary,
    padding: 5,
  },
  arrow: {
    color: colors.text,
    fontSize: 16,
  },
});