import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { firebase } from '@react-native-firebase/app';
import ml from '@react-native-firebase/ml';
import { firebaseConfig } from '../../../../firebaseConfig'; // Update the path if necessary

const App = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [faces, setFaces] = useState([]);
  const cameraRef = useRef(null);

  const { hasPermission: permissionStatus, requestPermission } = useCameraPermission();
  const device = useCameraDevice('front');

  // Initialize Firebase if not done already
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  // Request camera permission
  const handleRequestPermission = async () => {
    const granted = await requestPermission();
    setHasPermission(granted === 'authorized');
    if (granted === 'authorized') {
      setCameraVisible(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
    }
  };

  // Frame Processor Function
  const frameProcessor = useFrameProcessor(async (frame) => {
    try {
      const faces = await ml().faceDetectorProcessImage(frame.toArrayBuffer());
      setFaces(faces);
      if (faces.length > 0) {
        console.log(`Detected ${faces.length} face(s)`);
      }
    } catch (error) {
      console.error('Face detection error:', error);
    }
  }, []);

  if (!hasPermission && !cameraVisible) {
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
      {cameraVisible && (
        <>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={cameraRef}
            frameProcessor={frameProcessor} // Ensure this is correctly used
          />
          <Button
            title="Close Camera"
            onPress={() => setCameraVisible(false)}
            style={styles.button}
          />
          {faces.map((face, index) => (
            <View
              key={index}
              style={[
                styles.faceBox,
                {
                  left: face.bounds.origin.x,
                  top: face.bounds.origin.y,
                  width: face.bounds.size.width,
                  height: face.bounds.size.height,
                },
              ]}
            />
          ))}
        </>
      )}
      {!cameraVisible && hasPermission && (
        <Button
          title="Open Camera"
          onPress={() => setCameraVisible(true)}
          style={styles.button}
        />
      )}
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
  faceBox: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
  },
});

export default App;
