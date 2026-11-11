import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Bai1_Header() {
  return (
    <View style={styles.header}>
        <Text style={styles.title}>Book Store</Text>
        <View style={styles.rightGroup}>
            <Text style={styles.iconText}>Find</Text>
            <Text style={styles.iconText}>Cart</Text>
        </View>
    </View>
  )
}

const styles= StyleSheet.create({
    header:{
        height:56,
        padding: 18,
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    rightGroup: {
        flexDirection: 'row',           
        gap: 16,                         
    },
    iconText: {
        fontSize: 20,
    },
})