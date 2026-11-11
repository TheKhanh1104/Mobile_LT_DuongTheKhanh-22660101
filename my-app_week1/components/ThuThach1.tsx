import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

// Dữ liệu mẫu danh sách sách
const BOOKS_DATA = [
  { id: '1', title: 'Lập Trình React Native Từ Cơ Bản Đến Nâng Cao', author: 'Nguyễn Văn A', price: '150.000 đ', image: 'https://picsum.photos/200/300?random=1' },
  { id: '2', title: 'Cấu Trúc Dữ Liệu Và Giải Thuật', author: 'Trần Thị B', price: '120.000 đ', image: 'https://picsum.photos/200/300?random=2' },
  { id: '3', title: 'Thiết Kế UI/UX Cho Ung Dụng Di Động', author: 'Lê Văn C', price: '200.000 đ', image: 'https://picsum.photos/200/300?random=3' },
  { id: '4', title: 'Nhập Môn Lập Trình TypeScript', author: 'Phạm Minh D', price: '180.000 đ', image: 'https://picsum.photos/200/300?random=4' },
  { id: '5', title: 'Tối Ưu Hiệu Năng Trong React Native', author: 'Hoàng Anh E', price: '220.000 đ', image: 'https://picsum.photos/200/300?random=5' },
];

export default function ThuThach1() {
  return (
    <View style={styles.mainContainer}>
      {/* 1. HEADER CỐ ĐỊNH PHÍA TRÊN (Bài tập 1) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BookStore</Text>
        <View style={styles.headerRightGroup}>
          <Text style={styles.iconText}>🔍</Text>
          <Text style={styles.iconText}>🛒</Text>
        </View>
      </View>

      {/* 2. VÙNG NỘI DUNG CUỘN (dùng flex: 1 để chiếm toàn bộ phần còn lại) */}
      <ScrollView style={styles.contentContainer} contentContainerStyle={styles.scrollContent}>
        {BOOKS_DATA.map((book) => (
          <View key={book.id} style={styles.cardContainer}>
            {/* Ảnh bìa bên trái */}
            <Image source={{ uri: book.image }} style={styles.coverImage} />

            {/* Thông tin bên phải */}
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.author}>Tác giả: {book.author}</Text>
              </View>
              <Text style={styles.price}>{book.price}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,                          // Phủ kín màn hình
    backgroundColor: '#F0F2F5',
  },
  // Style cho Header cố định
  header: {
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#1A237E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRightGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  iconText: {
    fontSize: 20,
  },

  // Style cho Vùng nội dung danh sách
  contentContainer: {
    flex: 1,                          // Chiếm toàn bộ khoảng trống còn lại bên dưới Header
  },
  scrollContent: {
    paddingVertical: 12,
  },

  // Style cho từng Card
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    width: 80,
    height: 110,
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 110,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
  },
  author: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
});