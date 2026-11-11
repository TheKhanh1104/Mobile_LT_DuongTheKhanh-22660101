import React from 'react'
import { StyleSheet, Text, View,  } from 'react-native';
import Bai1_Header from './components/Bai1_Header';
import Bai2_BookCard from './components/Bai2_BookCard';
import ThuThach1 from './components/ThuThach1';



export default function App() {
  return (
    // <View style={styles.container}>
    //   <Bai1_Header />
    //   <Bai2_BookCard />
    // </View>
    <ThuThach1/>
  )
}

const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#1A237E',
  }
})
