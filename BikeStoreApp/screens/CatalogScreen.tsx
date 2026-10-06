import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { bikesData } from '../types/Bike';
import BikeCard from '../components/BikeCard';

const { width } = Dimensions.get('window');

export default function CatalogScreen({ navigation }: any) {
  const [selectedType, setSelectedType] = useState<'All' | 'Roadbike' | 'Mountain'>('All');

  const filteredBikes = selectedType === 'All' ? bikesData : bikesData.filter(b => b.type === selectedType);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The world's Best Bike</Text>

      <View style={styles.filterContainer}>
        {(['All', 'Roadbike', 'Mountain'] as const).map((type) => (
          <TouchableOpacity 
            key={type} 
            style={[styles.filterButton, selectedType === type && styles.filterButtonSelected]}
            onPress={() => setSelectedType(type)}
          >
            <Text style={[styles.filterText, selectedType === type && styles.filterTextSelected]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBikes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BikeCard bike={item} onPress={() => navigation.navigate('Detail', { bikeId: item.id })} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#E53935', marginBottom: 15, alignSelf: 'flex-start' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, width: '100%' },
  filterButton: { borderWidth: 1, borderColor: '#FF8A65', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, flex: 1, marginHorizontal: 4, alignItems: 'center' },
  filterButtonSelected: { backgroundColor: '#FFAB91' },
  filterText: { color: '#FF8A65', fontWeight: '600' },
  filterTextSelected: { color: '#E53935', fontWeight: 'bold' },
  row: { justifyContent: 'space-between', width: width - 40 },
});