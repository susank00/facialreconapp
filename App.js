import React from 'react';
import FacialRecognitionApp from "./android/app/src/components/FacialRecognitionApp"; // Import from components directory
import { firebase } from "./firebaseConfig"; 
const App = () => {
  return (
    <FacialRecognitionApp />
  );
};

export default App;                                     