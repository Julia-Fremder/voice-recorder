import { useCallback, useEffect, useState } from "react";
import {getAudioById, postAudioService} from '../services/audio.service'

interface audioDB {
  config: any;
  data: any;

}

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
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
         console.log(blob, 'blob');
         postAudioService({audio: blob})
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
      setTimeout(() => recorder.stop(), 15000)
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    // const handleData = (e: BlobEvent )=> {
    //   setAudioURL(URL.createObjectURL(e.data));
    // };

    // recorder.addEventListener("dataavailable", handleData);

    // recorder.addEventListener("stop", () => {
    //   const blob = new Blob(data, { 
    //     'type': 'audio/mp3' 
    //   });
    //   postAudioService(blob)
    // })

    

    //unmount the component cleans URL
    //return () => recorder.removeEventListener("dataavailable", handleData);


  }, [recorder, isRecording]);

  useEffect(() => {

    //audioURL && getAudio()

  }, [audioURL])

  const getAudio = useCallback(async () => {

    const result: audioDB = await getAudioById(19)

    console.log(result.data.audio)


  }, [])
 
 

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);
   // postAudioService('some text')
    
  };

return [audioURL, isRecording, startRecording, stopRecording,];
}
export default useRecorder;