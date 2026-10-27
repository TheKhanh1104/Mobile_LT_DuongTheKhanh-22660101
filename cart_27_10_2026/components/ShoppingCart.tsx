import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} from '../features/cart/cartSlice';
import { RootState, AppDispatch } from '../app/store';

export const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const productsStatus = useSelector((state: RootState) => state.products.status);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const shippingCost = useSelector((state: RootState) => state.cart.shippingCost);
  const discountCode = useSelector((state: RootState) => state.cart.discountCode);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  // Các hàm tính toán hóa đơn
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountRate = discountCode === 'SUMMER10' ? 0.1 : discountCode === 'SPECIAL20' ? 0.2 : 0;
  const discountAmount = subtotal * discountRate;
  const taxAmount = (subtotal - discountAmount) * 0.1;
  const totalAmount = subtotal - discountAmount + taxAmount + shippingCost;
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Text style={styles.header}>🛍️ Cửa Hàng (Redux Toolkit)</Text>

      {/* Danh sách sản phẩm */}
      <Text style={styles.sectionTitle}>Sản Phẩm Có Sẵn</Text>
      <View style={styles.grid}>
        {products.map((p) => (
          <View key={p.id} style={styles.productCard}>
            <Text style={styles.productName}>{p.name}</Text>
            <Text style={styles.productPrice}>${p.price}</Text>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => dispatch(addToCart(p))}
            >
              <Text style={styles.btnText}>Thêm Vào Giỏ</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Giỏ hàng */}
      <Text style={styles.sectionTitle}>Giỏ Hàng ({totalCount})</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Giỏ hàng trống</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text>${item.price} x {item.quantity}</Text>
            </View>
            <View style={styles.qtyContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decreaseQuantity(item.id))}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={{ marginHorizontal: 8 }}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(increaseQuantity(item.id))}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
              <Text style={{ color: 'red', marginLeft: 10 }}>Xóa</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* Mã giảm giá */}
      <Text style={styles.sectionTitle}>Mã Giảm Giá</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.tagBtn} onPress={() => dispatch(applyDiscount('SUMMER10'))}>
          <Text style={styles.btnText}>SUMMER10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tagBtn} onPress={() => dispatch(applyDiscount('SPECIAL20'))}>
          <Text style={styles.btnText}>SPECIAL20</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tagBtn, { backgroundColor: '#95a5a6' }]} onPress={() => dispatch(applyDiscount(null))}>
          <Text style={styles.btnText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      {/* Tóm tắt */}
      <View style={styles.summaryBox}>
        <Text style={styles.sectionTitle}>Hóa Đơn</Text>
        <Text>Tạm tính: ${subtotal.toFixed(2)}</Text>
        {discountAmount > 0 && <Text style={{ color: 'green' }}>Giảm giá: -${discountAmount.toFixed(2)}</Text>}
        <Text>Thuế (10%): ${taxAmount.toFixed(2)}</Text>
        <Text>Vận chuyển: ${shippingCost}.00</Text>
        <Text style={styles.totalText}>Thành Tiền: ${totalAmount.toFixed(2)}</Text>
        
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('Thanh toán thành công!')}>
          <Text style={[styles.btnText, { fontSize: 16 }]}>Thanh Toán Ngay</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { padding: 16, backgroundColor: '#f5f6fa' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: { width: '48%', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, elevation: 2 },
  productName: { fontWeight: 'bold', fontSize: 14 },
  productPrice: { color: '#27ae60', marginVertical: 4 },
  btnPrimary: { backgroundColor: '#3498db', padding: 8, borderRadius: 4, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 6, alignItems: 'center', marginBottom: 8 },
  cartItemName: { fontWeight: 'bold' },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 4, paddingHorizontal: 6 },
  qtyBtn: { padding: 4 },
  qtyText: { fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', gap: 8 },
  tagBtn: { backgroundColor: '#e67e22', padding: 8, borderRadius: 4 },
  summaryBox: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginTop: 16, elevation: 2 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginTop: 8 },
  checkoutBtn: { backgroundColor: '#2ecc71', padding: 12, borderRadius: 6, alignItems: 'center', marginTop: 12 },
  emptyText: { fontStyle: 'italic', color: '#7f8c8d' },
});