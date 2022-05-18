import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>FakeStore</Text>
    </View>
  );
};

export default App;
