import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ShoppingCart } from './components/ShoppingCart';
import { SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
        <StatusBar barStyle="dark-content" />
        <ShoppingCart />
      </SafeAreaView>
    </Provider>
  );
}