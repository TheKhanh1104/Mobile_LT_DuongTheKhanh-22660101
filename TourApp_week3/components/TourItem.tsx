//TourItemProps (tour: Tour, compact?: boolean, onPress: (tour: Tour) => void,

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDate, getSeatLabel, Tour } from "../types/Tour";
import React from "react";

interface TourItemProps{
    tour: Tour;
    compact?: boolean;
    onPress: (tour: Tour)=> void;
    onToggleFavorite: (id: string, next: boolean) => void;
};

const TourItem: React.FC<TourItemProps>=({
    tour,
    compact=false,
    onPress,
    onToggleFavorite,
})=>{
    
    const seatLabel=getSeatLabel(tour.seats);
    const isSeatLoworOut= tour.seats<=3;

    return(
        <View style={styles.item}>
            <Image source={{uri:tour.image}} style={styles.img} />
            <View style={styles.info}>
                <Text style={styles.item}>{tour.name}</Text>
                <Text style={styles.sub}>{tour.city} - 📅 {formatDate(tour.departure)} · {tour.days} ngày</Text>
                <Text style={styles.price}>{tour.price.toLocaleString()} VND</Text>
                <Text style={[styles.seat, tour.seats <= 3 && { color: "red" }]}>{getSeatLabel(tour.seats)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  item: { flexDirection: "row", padding: 8, backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#eee", alignItems: "center" },
  img: { width: 70, height: 70, backgroundColor: "#ccc" },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: "bold", fontSize: 14 },
  sub: { fontSize: 12, color: "#666", marginVertical: 2 },
  price: { fontSize: 13, color: "blue", fontWeight: "600" },
  seat: { fontSize: 12, color: "#333" }
});

export default React.memo(TourItem);