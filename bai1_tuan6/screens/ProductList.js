import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// Bản đồ ảnh từ thư mục assets
const IMAGES = {
  silver: require('../assets/vs_silver.png'),
  red: require('../assets/vs_red.png'),
  black: require('../assets/vs_black.png'),
  blue: require('../assets/vs_blue.png'),
};

export default function ProductScreen({ navigation, route }) {
  // Mặc định ban đầu là màu xanh (blue)
  const [selectedColor, setSelectedColor] = useState('blue');

  // Lắng nghe khi ColorPicker gửi màu mới về
  useEffect(() => {
    if (route.params?.colorKey) {
      setSelectedColor(route.params.colorKey);
    }
  }, [route.params?.colorKey]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Ảnh điện thoại */}
        <View style={styles.imageContainer}>
          <Image source={IMAGES[selectedColor]} style={styles.mainImage} resizeMode="contain" />
        </View>

        {/* Tiêu đề */}
        <Text style={styles.title}>Điện Thoại Vsmart Joy 3 - Hàng chính hãng</Text>

        {/* Đánh giá sao */}
        <View style={styles.ratingRow}>
          <Text style={styles.stars}>★★★★★</Text>
          <Text style={styles.ratingCount}>(Xem 828 đánh giá)</Text>
        </View>

        {/* Giá tiền */}
        <View style={styles.priceRow}>
          <Text style={styles.currentPrice}>1.790.000 đ</Text>
          <Text style={styles.oldPrice}>1.790.000 đ</Text>
        </View>

        {/* Cam kết hoàn tiền */}
        <View style={styles.refundRow}>
          <Text style={styles.refundText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
          <View style={styles.questionIcon}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>

        {/* Nút Chọn màu */}
        <TouchableOpacity
          style={styles.chooseColorButton}
          onPress={() => navigation.navigate('ColorPicker', { currentColor: selectedColor })}
        >
          <Text style={styles.chooseColorText}>4 MÀU-CHỌN MÀU</Text>
          <Text style={styles.arrowText}>&gt;</Text>
        </TouchableOpacity>

        {/* Nút Chọn mua */}
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 320,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginTop: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  stars: {
    color: '#F4CA16',
    fontSize: 18,
    marginRight: 10,
  },
  ratingCount: {
    fontSize: 13,
    color: '#333',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 25,
  },
  oldPrice: {
    fontSize: 14,
    color: '#777',
    textDecorationLine: 'line-through',
  },
  refundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  refundText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FA0000',
    marginRight: 6,
  },
  questionIcon: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  chooseColorButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 15,
    position: 'relative',
  },
  chooseColorText: {
    fontSize: 14,
    fontWeight: '600',
  },
  arrowText: {
    position: 'absolute',
    right: 15,
    fontSize: 16,
    color: '#333',
  },
  buyButton: {
    backgroundColor: '#EE0A0A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});