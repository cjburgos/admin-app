<template>
  <div id="app">
    

        <nav class="navbar has-text-centered" id="nav">
          <div class="navbar-brand" v-if="user.authenticated">
            <img src="@/assets/logo.png" width="50" height="28">
          </div>
          <div class="navbar-menu" id="navbar-menu">
            <ul class="nav navbar-nav">
              <router-link to="/home" v-if="user.authenticated"> Home | </router-link>  
              <router-link to="/dashboard" v-if="user.authenticated">Dashboard |</router-link> 
              <!-- <router-link to="/login" v-if="!user.authenticated">Login</router-link>   -->
              <a v-if="user.authenticated" @click="logout()"> Logout</a>           
            </ul>
          </div>
        </nav>
  
    
    <router-view></router-view>
 
  </div>
</template>
<script>
import auth from './auth';

export default {
  data(){
    return {
        user: auth.user
    }
  },
  methods: {
    logout(){
      auth.logout();
    }
  }
}
</script>
<style lang="scss">


#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background:#B0DFE5;
  z-index: 10;

  #nav {
    padding:50px;
    background: #B0DFE5;
  }

  #navbar-menu{
    align-content:center;
    align-items:center;
    padding-left:15px;
    a {
      color:#183050;
      text-align:center;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}


</style>
