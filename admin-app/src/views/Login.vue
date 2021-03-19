<template>
  <div class="container ">
      <div class="columns is-half is-offset-one-quarter">
          <h1 class='title'> Admin Application </h1>
      </div>
      <div class="column is half" style="text-align:center">
          <LoginComponent id="loginComponent"/>
          Create an account <router-link to="/signup"> here </router-link>
      </div>
  </div>
</template>
<script>
  import LoginComponent from '../components/Login/LoginComponent';

  export default {
    name: 'LoginView',
    components: {
      LoginComponent
      }
  }
</script>
<style lang="scss" scoped>
  .container{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }
  #loginComponent{
    padding-bottom:10px;
    width: 100%;
    display:'fluid';
    // background-color:rgb(22, 39, 39);
  }
</style>
