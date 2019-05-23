import axios from 'axios'
import { baseURL, API_KEY } from './config'

export default axios.create({
  baseURL,
  headers: { 'authorization': `Apikey ${API_KEY}` }
})
