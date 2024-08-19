// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// const FacialRecognitionApp = () => {
//   const takePicture = async (camera) => {
//     const options = { quality: 0.5, base64: true };
//     const data = await camera.takePictureAsync(options);
//     console.log(data.uri);
//     // Send the image to the facial recognition API
//   };

//   return (
//     <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black' }}>
//       <RNCamera
//         style={{ flex: 1 }}
//         type={RNCamera.Constants.Type.front}
//         captureAudio={false}
//       >
//         {({ camera, status }) => {
//           if (status !== 'READY') return <PendingView />;
//           return (
//             <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//               <Button onPress={() => takePicture(camera)} title="Capture" />
//             </View>
//           );
//         }}
//       </RNCamera>
//     </View>
//   );
// };

// export default FacialRecognitionApp;
