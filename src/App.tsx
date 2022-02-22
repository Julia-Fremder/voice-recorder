import React, { MouseEventHandler, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import useRecorder from "./hooks/useRecorder";
import {TiMicrophoneOutline} from 'react-icons/ti'
import { postAudioService , getAudioById} from './services/audio.service';



function App() {
  let [audioURL, isRecording, startRecording, stopRecording, blob, dbaudioURL] = useRecorder();

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
      <div>other tests</div>
    </div>
  );
}

export default App;
