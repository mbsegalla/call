import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://call-mbsegalla.vercel.app/api',
})
