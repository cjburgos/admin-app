import router from '../router';
import axios from 'axios';

// URL and endpoint constants
const BASE_APP_URL = process.env.VUE_APP_ADMIN_API_URL || 'http://localhost:8080';
const API_URL = BASE_APP_URL + '/api';
const LOGIN_URL = API_URL + '/authorization';
const SIGNUP_URL = API_URL + '/users';

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(creds, redirect) {
    try{
      axios.post(LOGIN_URL, creds)
      .then((response) => {
        console.log(response.data)
        localStorage.setItem('id_token', response.data.id_token)
        localStorage.setItem('access_token', response.data.access_token)

        this.user.authenticated = true
        
        // Redirect to a specified route
        if(redirect) {
          router.push(redirect)        
        }
      })
    }catch(err){
      return err
    }
  },
  signup(creds, redirect) {
    try {
      axios.post(SIGNUP_URL, creds, (data) => {
        localStorage.setItem('id_token', data.id_token)
        localStorage.setItem('access_token', data.access_token)

        this.user.authenticated = true

        if(redirect) {
          router.go(redirect)        
        }
      })
    }catch(err){
      return err
    }
  },

  // To log out, we just need to remove the token
  logout() {
    console.log('Removing tokens')
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    router.push('/login')        
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}