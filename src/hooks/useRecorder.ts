import { useCallback, useEffect, useRef, useState } from "react";
import {getAudioById, postAudioService} from '../services/audio.service'


const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [audioList, setAudioList] = useState<string[]>([])
  const [blob, setBlob] = useState<Blob | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const streamingFunction = useCallback(() => {
    return navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
       let data: any = [];
   
       const recorder = new MediaRecorder(stream);
       //audio.srcObject = stream
   
       recorder.addEventListener('start', e => {
         data.length = 0;
       })
   
       recorder.addEventListener('dataavailable', e => {
         data.push(e.data)
         setAudioURL(URL.createObjectURL(e.data));
       })

   
       recorder.addEventListener("stop", () => {
         const blob = new Blob(data, { 
           'type': 'audio/mp3' 
         });
         setBlob(blob)
       })
   
       return recorder
     });
     
   }, []);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        streamingFunction().then((result) => setRecorder(result));
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
      //setTimeout(() => recorder.stop(), 15000)
    } else {
      recorder.stop();
    }
  

    //unmount the component cleans URL
    return () => recorder.removeEventListener("dataavailable", (e: BlobEvent ) => {
       setAudioURL(URL.createObjectURL(e.data));
    });


  }, [recorder, isRecording]);

  useEffect(() => {

    audioURL && setAudioList(audioList => [...audioList, audioURL]);

  }, [audioURL])

  const getAudio = useCallback(async () => {

    const result = await getAudioById(19)

    console.log(result.data.audio)


  }, [])
 
 

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);    
  };

return {audioURL, isRecording, startRecording, stopRecording, blob, audioList};
}
export default useRecorder;