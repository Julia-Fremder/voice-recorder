import React, { MouseEventHandler } from 'react';
import './App.css';
import Button from './components/Button';
import useRecorder from "./useRecorder";
import {TiMicrophoneOutline} from 'react-icons/ti'


function App() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  const myRecordedVoice = new Audio(audioURL as string)

  return (
    <div className="App">
        <audio  src={audioURL as string} controls hidden/> 
      <Button onClick={isRecording ? stopRecording as MouseEventHandler: startRecording as MouseEventHandler} disabled={false} color="#j4j4j4" radius="5px" width="100px">
      <TiMicrophoneOutline />
      </Button>
      {/* <Button onClick={stopRecording as MouseEventHandler} disabled={!isRecording} color="#aab" radius="5px" width="100px">
        stop recording
      </Button> */}

      <Button onClick={() => myRecordedVoice.play()} disabled={isRecording as boolean} color="#aab" radius="5px" width="100px">
      play
      </Button>
    </div>
  );
}

export default App;
