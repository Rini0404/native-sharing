import React from 'react';
import {View, StyleSheet} from 'react-native';

const Shared = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shared</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
})

export default Shared;
