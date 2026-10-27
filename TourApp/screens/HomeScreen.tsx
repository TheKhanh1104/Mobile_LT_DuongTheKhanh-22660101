import { useEffect, useState } from "react";
import { groupByCity, Tour } from "../types/Tour";
import { Alert, StyleSheet, Text, View, SectionList } from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import TourItem from "../components/TourItem";


const API_URL="https://6ace1979f338359cf1c315b5.mockapi.io/tours";
export default function HomeScreen (){
    const [tours, setTours]= useState<Tour[]>([]);
    const [loading, setLoading]= useState<boolean>(true);
    const [refreshing, setRefreshing]= useState<boolean>(false);
    const [search, setSearch]= useState<string>("");

    const fetchTour= async ()=>{
        try {
            const response= await fetch(API_URL);
            const data= await response.json();
            setTours(data);
        } catch (error) {
            Alert.alert("Error!", "Khong the lay du lieu tu API");
        }finally{
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(()=>{
        fetchTour();
    },[]);

    const onRefresh =()=>{
        setRefreshing(true);
        fetchTour();
    };

    const sections = groupByCity(tours);
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tour Viet</Text>
                <Text style={styles.sub}>Duong The Khanh - 22660101 </Text>
            </View>
            {loading ? (
                    <ActivityIndicator size="large" style={{ marginTop: 20 }} color="#007AFF" />
                    ) : (
                    <SectionList
                        sections={sections}
                        keyExtractor={item => item.id}
                        stickySectionHeadersEnabled={true}
                        renderItem={({ item }) => <TourItem tour={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.secHeader}>
                            <Text style={styles.secTitle}>{title}</Text>
                        </View>
                        )}
                    />
                    )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { padding: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderColor: "#ddd" },
  title: { fontSize: 18, fontWeight: "bold" },
  sub: { fontSize: 13, color: "#666", marginTop: 2 },
  secHeader: { backgroundColor: "#e9ecef", padding: 6, paddingHorizontal: 12 },
  secTitle: { fontWeight: "bold", fontSize: 13, color: "#333" }
});