import axios from 'axios';
import {createRefresh} from 'react-auth-kit'

const refreshApi = createRefresh({
  interval: 5,
  refreshApiCallback: async (param) => {
    console.log("Refresh Api Parameter " + param)
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL +"/refreshtoken", param,)
      return {
        isSuccess: true,
        newAuthToken: response.data.jwtToken,
        newAuthTokenExpireIn: Math.floor((new Date(response.data.expirationDate) - new Date()) / 1000 / 60)
      }
    }
    catch(error){
      console.error(error)
      return {
        isSuccess: false
      } 
    }    
  }
})

export default refreshApi
