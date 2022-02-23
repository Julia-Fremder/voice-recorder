import React, { MouseEventHandler, useState} from 'react';
import './App.css';
import useRecorder from "./hooks/useRecorder";
import {TiMicrophoneOutline, TiMediaPlayOutline, TiMediaStopOutline} from 'react-icons/ti'
import { postAudioService , getAudioById, getAudioByAppointment} from './services/audio.service';

interface audioDB {
  id: number;
  idAppointment: string;
  idAwsAudioFile: string;
  audio: string;
}


function App() {  
  const {audioURL, isRecording, startRecording, stopRecording, blob, audioList} = useRecorder();
  const [appointmentsAudios, setAppointmentAudios] = useState<audioDB[] | undefined>();

  const myRecordedVoice = new Audio(audioURL as string)

  const idAppt = 2;

  //const audioObj = {audio: blob, idAppt: idAppt}
  const audioObj = {audio: 'this must be a Mp3 file', idAppt: idAppt}

  const handleSaveAudio = async () => {
    await postAudioService(audioObj)
    await getAudioByAppointment(idAppt).then(result => setAppointmentAudios(result.data as audioDB[]))
  }


  return (
    <div className="App">
      <header><h1>Appointment Recorder</h1><h2>It is possible to send audios to your patients!!</h2></header>
        <section className="App-recorder">
        <audio  src={audioURL as string} controls hidden/> 
        <button className={isRecording ? "start-recorder-button" : "start-recorder-button"} onClick={isRecording ? stopRecording as MouseEventHandler : startRecording as MouseEventHandler} disabled={false}>
     
      {isRecording ? <TiMediaStopOutline className="start-recorder-icon"/> : <TiMicrophoneOutline className="start-recorder-icon"/>}
      </button>
      {/* <button onClick={stopRecording as MouseEventHandler} disabled={!isRecording} color="#aab" >
        stop recording
      </button>  */}

      <button onClick={() => myRecordedVoice.play()} disabled={isRecording as boolean} color="#aab" >
      <TiMediaPlayOutline />
      </button>
      <button onClick={() => handleSaveAudio()} disabled={false} color="#j4j4j4">Save audio to appointment</button>
        </section>

      <section className="App-audios">
      <div>Appointment Audios</div>
      <div><button onClick={() => (new Audio(audioList[0] as string)).play()} disabled={isRecording as boolean}>audio 1</button><button onClick={() => (new Audio(audioList[1] as string)).play()} disabled={isRecording as boolean}>audio 2</button></div>
    <div>{appointmentsAudios?.map(((audio) => (<div key={audio.id}>{audio.audio}</div>)))}</div>
      </section>
      
    </div>
  );
}

export default App;
