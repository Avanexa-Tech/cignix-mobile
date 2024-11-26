//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// create a component
const App = () => {
  return (
    <View style={styles.container}>
      <Text>App</Text>
      <MaterialCommunityIcons name="home" color={'red'} size={40} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
