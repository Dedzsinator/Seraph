import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AdminSQLScreen = () => {
  const [sqlQuery, setSqlQuery] = useState('');

  const handleSubmit = () => {
    console.log('Submit SQL query:', sqlQuery);
    // Implement submit SQL query functionality
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter SQL Query"
        value={sqlQuery}
        onChangeText={setSqlQuery}
        style={styles.input}
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
  },
});

export default AdminSQLScreen;