import React from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

const App = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('front');

  // Request camera permission
  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    if (granted) {
      console.log('Camera permission granted.');
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
      console.log('Camera permission denied.');
    }
  };

  // Open camera logic
  const handleOpenCamera = () => {
    if (hasPermission) {
      console.log('Camera view should be visible now.');
    } else {
      Alert.alert('Permission Denied', 'Please grant camera permission first.');
      console.log('Camera permission not granted.');
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Permission Denied</Text>
        <Button title="Request Camera Permission" onPress={handleRequestPermission} />
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text>No Camera Device Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
      {/* <Button
        title="Close Camera"
        onPress={() => Alert.alert('Camera', 'Close button pressed')} // Adjust based on your logic
        style={styles.button}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default App;
