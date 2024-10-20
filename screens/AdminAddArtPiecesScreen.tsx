import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AdminAddArtPiecesScreen = () => {
  const [artPieces, setArtPieces] = useState([{ title: '', artist: '', creationDate: '', imageUrl: '', description: '', price: '' }]);

  const handleAddArtPiece = () => {
    setArtPieces([...artPieces, { title: '', artist: '', creationDate: '', imageUrl: '', description: '', price: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newArtPieces = [...artPieces];
    newArtPieces[index][field] = value;
    setArtPieces(newArtPieces);
  };

  const handleSubmit = () => {
    console.log('Submit art pieces:', artPieces);
    // Implement submit functionality
  };

  return (
    <View style={styles.container}>
      {artPieces.map((artPiece, index) => (
        <View key={index} style={styles.artPieceContainer}>
          <TextInput
            placeholder="Title"
            value={artPiece.title}
            onChangeText={(value) => handleInputChange(index, 'title', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Artist"
            value={artPiece.artist}
            onChangeText={(value) => handleInputChange(index, 'artist', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Creation Date"
            value={artPiece.creationDate}
            onChangeText={(value) => handleInputChange(index, 'creationDate', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Image URL"
            value={artPiece.imageUrl}
            onChangeText={(value) => handleInputChange(index, 'imageUrl', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={artPiece.description}
            onChangeText={(value) => handleInputChange(index, 'description', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={artPiece.price}
            onChangeText={(value) => handleInputChange(index, 'price', value)}
            style={styles.input}
          />
        </View>
      ))}
      <Button title="Add Another Art Piece" onPress={handleAddArtPiece} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  artPieceContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AdminAddArtPiecesScreen;