import http from '../config/http';

export const postAudioService = (audio) => http.post(`/audios`, {audio});
