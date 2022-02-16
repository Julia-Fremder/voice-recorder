import React, { MouseEventHandler } from 'react';
import './App.css';
import useRecorder from "./useRecorder";

function App() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React And record voices
        </a>
        <audio src={audioURL as string} controls />
      <button onClick={startRecording as MouseEventHandler<HTMLButtonElement>}  disabled={isRecording as boolean}>
        start recording
      </button>
      <button onClick={stopRecording as MouseEventHandler<HTMLButtonElement>} disabled={!isRecording}>
        stop recording
      </button>
      </header>
    </div>
  );
}

export default App;
