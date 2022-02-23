import http from '../config/http';

export const postAudioService = ({audio, idAppt}) => {
    const formData = new FormData();
    formData.append('idAppt', idAppt)
    formData.append('audio', audio)
    http.post(`/audios`, formData);}

export const getAudioById = (id) => http.get(`/audios/${id}`);

export const getAudioByAppointment = (idAppt) => http.get(`/audios/appointments/${idAppt}`);
