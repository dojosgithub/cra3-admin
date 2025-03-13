import axios from 'axios'

const mode = import.meta.env.MODE
if (mode === 'production')
  axios.defaults.baseURL = 'https://cra3-server-eff4381ce898.herokuapp.com'
else if (mode === 'staging')
  axios.defaults.baseURL = 'https://cra3-server-eff4381ce898.herokuapp.com'
else axios.defaults.baseURL = 'http://localhost:4000'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error('error', error.response)
    } else {
      console.error('error', error)
    }
    return Promise.reject(error)
  }
)
