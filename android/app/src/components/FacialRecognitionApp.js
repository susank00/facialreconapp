import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'react-native-camera';

const App = () => {
  const cameraRef = useRef(null);

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.front} // or Camera.Constants.Type.back
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default App;