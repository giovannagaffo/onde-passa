import axios from 'axios'

const backendClient = axios.create({
  baseURL: 'http://1920.168.0.10:3000', 
})

export default backendClient