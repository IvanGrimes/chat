import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://nane.tada.team/api'
});
