import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { bikesData } from '../types/Bike';

const { width, height } = Dimensions.get('window');

export default function DetailScreen({ route }: any) {
  const { bikeId } = route.params;
  const bike = bikesData.find(b => b.id === bikeId) || bikesData[0];

  return (
    <ScrollView style={styles.detailContainer}>
      <View style={styles.imageWrapper}>
        <Image source={bike.imageUrl} style={styles.detailImage} resizeMode="contain" />
      </View>

      <View style={styles.detailsContent}>
        <Text style={styles.bikeName}>{bike.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.discountInfo}>15% OFF | $350</Text>
          <Text style={styles.currentPrice}>${bike.price}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>
          It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.
        </Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  detailContainer: { flex: 1, backgroundColor: '#fff' },
  imageWrapper: { backgroundColor: '#FEE4E4', height: height * 0.4, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  detailImage: { width: width * 0.85, height: 220 },
  detailsContent: { padding: 20 },
  bikeName: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  discountInfo: { fontSize: 16, color: '#888', textDecorationLine: 'line-through' },
  currentPrice: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  descriptionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  descriptionText: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 30 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  favoriteButton: { borderWidth: 1, borderColor: '#ccc', borderRadius: 12, padding: 14 },
  addToCartButton: { backgroundColor: '#E53935', paddingVertical: 16, paddingHorizontal: 80, borderRadius: 30 },
  addToCartText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});