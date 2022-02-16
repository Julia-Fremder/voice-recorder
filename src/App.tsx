import React, { MouseEventHandler } from 'react';
import './App.css';
import useRecorder from "./useRecorder";

function App() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  return (
    <div className="App">
        <audio  controls> <source src={audioURL as string}/> </audio>
      <button onClick={startRecording as MouseEventHandler}  disabled={isRecording as boolean}>
        start recording
      </button>
      <button onClick={stopRecording as MouseEventHandler<HTMLButtonElement>} disabled={!isRecording}>
        stop recording
      </button>
    </div>
  );
}

export default App;
