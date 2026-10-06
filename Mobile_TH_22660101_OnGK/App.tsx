import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Switch,
  RefreshControl,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import MovieCard, { Movie } from './components/MovieCard';
const API_URL='https://6abba2d7b2118ed7abb91c13.mockapi.io/movies';
export default function App(){
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isTile, setIsTile] = useState<boolean>(false);
  const fetchMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMovies();
  };

  const handleSelectMovie = (id: string) => {
    console.log('Selected movie ID:', id);
  };

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Movie App</Text>
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Dạng lưới</Text>
            <Switch
              value={isTile}
              onValueChange={(val) => setIsTile(val)}
            />
          </View>
        </View>

        {/* Câu 2b: Hiển thị ActivityIndicator khi đang tải */}
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          /* Câu 2a & 5: FlatList hiển thị danh sách phim, đổi numColumns và key linh hoạt */
          <FlatList
            key={String(numColumns)} 
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={numColumns}
            columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
            renderItem={({ item }) => (
              <View style={isTile ? styles.tileItemWrapper : styles.rowItemWrapper}>
                <MovieCard
                  movie={item}
                  layout={isTile ? 'tile' : 'row'}
                  onSelect={handleSelectMovie}
                />
              </View>
            )}
            // Câu 6: RefreshControl kéo xuống để làm mới
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    marginRight: 8,
    fontSize: 14,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  tileItemWrapper: {
    flex: 1,
    maxWidth: '49%', // Chống tràn item lẻ ở chế độ 2 cột
  },
  rowItemWrapper: {
    width: '100%',
  },
});
