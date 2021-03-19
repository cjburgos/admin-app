<template>
    <div class="control" id="loginForm">
        <div class="field">
            <label class="label ">Username</label>
            <input class="input is-success" v-model="credentials.username" type="text" placeholder="alice.smith@email.com" id="username">
        </div>
        <div class="field">
            <label class="label ">Password</label>
            <input class="input is-success" v-model="credentials.password" type="password" placeholder="********" id="password">
        </div> 
        <div class="field is-grouped" id="loginButtonGrouped">
            <div class="control">
                <button class="button" id="loginButton" @click="handleSubmit()">Submit</button>
            </div>
            <div class="control">
                <button class="button is-primrary is-light">Cancel</button>
            </div>
        </div>
    </div>
</template>
<script>
import auth from '../../auth';

export default {
    name:'LoginComponent',
    data(){
        return {
            credentials: {
                username: "",
                password:""
            }
        }
    },
    methods:{       
        handleSubmit(){
            const credentials = {
                username: this.credentials.username,
                password: this.credentials.password
            }
            auth.login(credentials, '/home');
        }
    }
}
</script>
<style lang="scss" scoped>

    #username{
        border-color:lightslategray;
    }
    #password{
        border-color:lightslategray;
    }
    #loginButton{
        background-color:rgba(128, 135, 141, 0.50);
        border-color:white;
        // color: white;
    }
    #loginButtonGrouped{
        padding-top:10px;
    }
</style>
