/*
 * Copyright 2020 Arkadip Bhattacharya
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import axios from 'axios';

import {createRefresh} from 'react-auth-kit'


const refreshApi = createRefresh({
  interval: 5,
  refreshApiCallback: async (param) => {
    console.log("Refresh Api Parameter " + param)
    try {
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL +"/refreshtoken", param, {
        headers: {'Authorization': `Bearer ${param.authToken}`}}
      )
      console.log("Refreshing")
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
