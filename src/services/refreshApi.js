import axios from 'axios';
import createRefresh from 'react-auth-kit/createRefresh'

const encodeBase64Url = (value) => btoa(value)
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '')

const decodeBase64Url = (value) => atob(value
  .replace(/-/g, '+')
  .replace(/_/g, '/'))

// react-auth-kit v3 expects the refresh value to contain a JWT expiry.
// The backend still uses the existing opaque refresh token, so keep it in a
// small client-side envelope and unwrap it before sending the API request.
export const toAuthKitRefreshToken = (refreshToken, expirationDate) => {
  const exp = Math.floor(new Date(expirationDate).getTime() / 1000)
  const payload = encodeBase64Url(JSON.stringify({exp, refreshToken}))
  return `refresh.${payload}.v3`
}

const fromAuthKitRefreshToken = (refreshToken) => {
  if (!refreshToken) {
    return refreshToken
  }

  try {
    const [, encodedPayload] = refreshToken.split('.')
    const {refreshToken: backendRefreshToken} = JSON.parse(decodeBase64Url(encodedPayload))
    return backendRefreshToken || refreshToken
  } catch {
    return refreshToken
  }
}

const refreshApi = createRefresh({
  interval: 5,
  refreshApiCallback: async (param) => {
    console.log("Refresh Api Parameter " + param)
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL +"/refreshtoken", {
        ...param,
        refreshToken: fromAuthKitRefreshToken(param.refreshToken)
      },)
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
