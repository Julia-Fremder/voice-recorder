import http from '../config/http';

export const postAudioService = ({audio}) => {
    console.log(audio, 'audio')
    const formData = new FormData();
    formData.append('audio-file', audio)
    http.post(`/audios`, formData);}

export const getAudioById = (id) => http.get(`/audios/${id}`);
