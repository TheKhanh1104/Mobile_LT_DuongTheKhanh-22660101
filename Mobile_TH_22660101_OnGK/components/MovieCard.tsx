import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
export interface Movie{
  id: string,
  title: string, 
  genre: string,
  year: number, 
  rating:number, 
  poster : string, 
  isShowing: boolean
}

export interface MovieCardProp{
  movie: Movie;
  layout?: 'row'| 'tile';
  onSelect: (id:string) => void;
}

const MovieCard : React.FC<MovieCardProp> =({
  movie,
  layout= 'row',
  onSelect,
})=>{
  const isTile= layout==='tile';
  return(
   <TouchableOpacity
   style={[styles.card, isTile? styles.cardTile: styles.cardRow]}
   onPress={()=>{
     Alert.alert('Thông báo',movie.title);
     onSelect(movie.id);
   }}
   activeOpacity={0.7}
   >
  <View
    style={[
      styles.posterContainer,
      isTile?styles.posterTile:styles.posterRow,
    ]}
    >
    <Image source={{ uri:   movie.poster }} style={styles.poster} />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            ⭐ {movie.rating.toFixed(1)}
          </Text>
        </View>
        </View>
  <View
        style={[
          styles.infoContainer,
          isTile ? styles.infoTile : styles.infoRow,
        ]}
      >
        <Text
          style={styles.title}
          numberOfLines={isTile ? 1 : 2}
          ellipsizeMode="tail"
        >
          {movie.title}
        </Text>

        {!isTile && (
          <>
            <Text style={styles.genre}>Thể loại: {movie.genre}</Text>
            <Text style={styles.year}>Năm: {movie.year}</Text>
          </>
        )}

        <Text style={styles.status}>
          {movie.isShowing ? 'Đang chiếu' : 'Ngừng chiếu'}
        </Text>
      </View>
   </TouchableOpacity>
  )
}


const styles= StyleSheet.create({
  card:{
    backgroundColor:'#fff',
    borderRadius:8,
    marginVertical:6,
    shadowColor:'#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
    padding: 8,
  },
  cardTile: {
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 4,
  },
  posterContainer: {
    position: 'relative',
  },
  posterRow: {
    width: 70,
    height: 100,
  },
  posterTile: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  ratingBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    justifyContent: 'center',
  },
  infoRow: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  infoTile: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  genre: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
  year: {
    fontSize: 12,
    color: '#666',
  },
  status: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default React.memo(MovieCard);