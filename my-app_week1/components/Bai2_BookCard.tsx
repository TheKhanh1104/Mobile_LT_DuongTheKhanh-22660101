import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Bai2_BookCard() {
  return (
    <View style={styles.cardContainer}>
      {/* 1. Ảnh bìa bên trái */}
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style={styles.coverImage}
      />

      {/* 2. Cột thông tin bên phải */}
      <View style={styles.infoContainer}>
        <View>
          {/* Tên sách (dùng numberOfLines={2} để tránh vỡ layout nếu tên quá dài) */}
          <Text style={styles.title} numberOfLines={2}>
            Lập Trình React Native Từ Cơ Bản Đến Nâng Cao
          </Text>

          {/* Tác giả */}
          <Text style={styles.author}>Tác giả: Nguyễn Văn A</Text>
        </View>

        {/* Giá tiền (dùng justifyContent: 'space-between' ở container để đẩy xuống dưới cùng) */}
        <Text style={styles.price}>150.000 đ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',       // Ảnh bìa bên trái, thông tin bên phải
    alignItems: 'flex-start',   // Hoặc 'center' (xem so sánh phía dưới)
    backgroundColor: '#FFFFFF',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    // Đổ bóng cho thẻ card
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverImage: {
    width: 80,                  // Chiều rộng cố định 80
    height: 110,                // Chiều cao cố định 110
    borderRadius: 6,            // Bo góc ảnh bìa
  },
  infoContainer: {
    flex: 1,                    // Chiếm phần không gian còn lại
    flexDirection: 'column',    // Xếp các thành phần theo cột
    justifyContent: 'space-between', // Đẩy giá tiền xuống dưới cùng
    height: 110,                // Bằng chiều cao của ảnh bìa để căn giá tiền vừa khớp
    marginLeft: 12,             // Khoảng cách giữa ảnh và chữ
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  author: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F',          // Màu đỏ cho giá tiền
  },
});