import React, { MouseEventHandler, useEffect, useState} from 'react';
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
    const result = await getAudioByAppointment(idAppt)
    setAppointmentAudios(result.data as audioDB[])
  }

  const handleDuration = () => {
    // Create a non-dom allocated Audio element
var au = document.createElement('audio');

// Define the URL of the MP3 audio file
au.src = "https://mydomain.com/myaudio.mp3";

// Once the metadata has been loaded, display the duration in the console
au.addEventListener('loadedmetadata', function(){
    // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
    var duration = au.duration;

    // example 12.3234 seconds
    console.log("The duration of the song is of: " + duration + " seconds");
    // Alternatively, just display the integer value with
    // parseInt(duration)
    // 12 seconds
},false);
  }

  useEffect(() =>{
   getAudioByAppointment(idAppt).then(result => setAppointmentAudios(result.data as audioDB[]))
  }, [])


  return (
    <div className="App">
      <header><h1>Appointment Recorder</h1><h2>It is possible to send audios to your patients!!</h2></header>
        <section className="App-recorder">
        <audio  src={audioURL as string} controls hidden/> 
        <button className={isRecording ? "stop recorder-button hover" : "start recorder-button hover"} onClick={isRecording ? stopRecording as MouseEventHandler : startRecording as MouseEventHandler} disabled={false}>
     
      {isRecording ? <TiMediaStopOutline className="recorder-icon"/> : <TiMicrophoneOutline className="recorder-icon"/>}
      </button>
      {/* <button onClick={stopRecording as MouseEventHandler} disabled={!isRecording} color="#aab" >
        stop recording
      </button>  */}

      <button className="play recorder-button hover" onClick={() => myRecordedVoice.play()} disabled={isRecording as boolean} color="#aab" >
      <TiMediaPlayOutline className="recorder-icon"/>
      </button>
      <button onClick={() => handleSaveAudio()} disabled={false} className="play recorder-button hover">SAVE</button>
        </section>

      <section className="App-audios">
      <div>Appointment Audios</div>
      <div>{audioList?.map(((audio, i) => (<p className="hover audio-item" onClick={() => (new Audio(audioList[0] as string)).play()} key={i}>{audio}</p>)))}</div>
    <div>{appointmentsAudios?.map(((audio) => (<p className="hover audio-item" key={audio.id}>{audio.audio}</p>)))}</div>
      </section>
      
    </div>
  );
}

export default App;
