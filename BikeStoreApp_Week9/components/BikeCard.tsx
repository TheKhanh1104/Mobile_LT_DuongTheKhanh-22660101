import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bike } from '../types/Bike';

interface BikeCardProps {
  bike: Bike;
  onPress: () => void;
}

export default function BikeCard({ bike, onPress }: BikeCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name="heart-outline" size={18} color="#C0C0C0" style={styles.heartIcon} />
      <Image source={bike.imageUrl} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.name}>{bike.name}</Text>
      <Text style={styles.price}>${bike.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FEE4E4', width: '48%', borderRadius: 12, padding: 12, marginBottom: 16, alignItems: 'center', position: 'relative' },
  heartIcon: { position: 'absolute', top: 8, left: 8 },
  cardImage: { width: 110, height: 90, marginBottom: 8 },
  name: { fontSize: 14, color: '#333', fontWeight: '600' },
  price: { fontSize: 15, color: '#555', fontWeight: 'bold', marginTop: 4 },
});