import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headline}>A premium online store for</Text>
        <Text style={styles.headline}>sporter and their stylish choice</Text>
      </View>

      <Image source={{ uri: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=60' }} style={styles.bikeImage} resizeMode="contain" />

      <Text style={styles.shopName}>POWER BIKE SHOP</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Catalog')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  textContainer: { borderColor: '#FF8A65', borderWidth: 2, padding: 15, borderRadius: 15, marginBottom: 20, width: width * 0.85, alignItems: 'center' },
  headline: { fontSize: 15, color: '#333', textAlign: 'center', fontWeight: '500' },
  bikeImage: { width: width * 0.8, height: 200, marginBottom: 20 },
  shopName: { fontSize: 22, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#E53935', paddingVertical: 15, borderRadius: 30, width: width * 0.85, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});