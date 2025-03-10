import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Text, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchBar from '../app/components/SearchBar'; // Adjust the import path as needed
import ArtCard from '../app/components/ArtCard'; // Adjust the import path as needed

const AuctionScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [layoutMode, setLayoutMode] = useState('tiled'); // 'tiled' or 'single'
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const numColumns = layoutMode === 'tiled' ? Math.floor(Dimensions.get('window').width / 300) : 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/query?query=SELECT ap.Title AS ArtPieceTitle, a.Description AS AuctionDescription, a.Category AS AuctionCategory, a.StartDate, a.EndDate, a.ReservePrice FROM Auctions AS a JOIN ArtPieces AS ap ON a.ArtID = ap.ArtID WHERE a.IsActive = 1");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToTop = () => {
    scrollRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(offsetY > 200); // Show button if scrolled down more than 200 pixels
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredData = data.filter((item) =>
    item.ArtPieceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.cardContainer}>
      <ArtCard item={item} index={index} navigation={navigation} layoutMode={layoutMode} isAuction={true} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.error}>
        <Text style={styles.text}>Error loading auctioned art pieces: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar placeholder="Search auctioned art pieces..." onSearch={handleSearch} />
      <View style={styles.selector}>
        <TouchableOpacity onPress={() => setLayoutMode('tiled')}>
          <Icon name="view-module" size={30} color={layoutMode === 'tiled' ? 'blue' : 'gray'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLayoutMode('single')}>
          <Icon name="view-agenda" size={30} color={layoutMode === 'single' ? 'blue' : 'gray'} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.ArtID}-${index}`} // Ensure unique keys
        numColumns={numColumns}
        key={layoutMode} // Change key to force re-render when layoutMode changes
        columnWrapperStyle={layoutMode === 'tiled' ? styles.row : null}
        onScroll={handleScroll}
      />
      {showBackToTop && <BackToTopButton onPress={scrollToTop} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
  },
  list: {
    flexGrow: 1,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  fullItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  reservePrice: {
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
  countdown: {
    fontSize: 14,
    color: '#FF0000',
    marginTop: 10,
  },
});

export default AuctionScreen;