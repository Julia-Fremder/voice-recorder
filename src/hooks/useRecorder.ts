import { useEffect, useState } from "react";
import {postAudioService} from '../services/audio.service'

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [data, setData] = useState([]);
  const [blob, setBlob] = useState<Blob | undefined>()
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
      setTimeout(() => recorder.stop(), 15000)
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e: BlobEvent )=> {
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);

    recorder.addEventListener("stop", () => {
      const blob = new Blob(data, { 
        'type': 'audio/mp3' 
      });
      setBlob(blob)
    })

    

    //unmount the component cleans URL
    return () => recorder.removeEventListener("dataavailable", handleData);


  }, [recorder, isRecording]);

  useEffect(() => {

    //AudioBufffer
    if(audioURL) {
      postAudioService(audioURL as string)
      console.log(audioURL as string)
      
    }
  }, [audioURL])
 
 

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    postAudioService('some text')
    
  };

  return [audioURL, isRecording, startRecording, stopRecording, blob];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;