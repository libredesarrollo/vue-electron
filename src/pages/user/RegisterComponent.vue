<template>
  <div>
    <h3>Register</h3>
    <form @submit.prevent="save">
      <input type="text" v-model="user.name" />
      <input type="text" v-model="user.username" />
      <input type="password" v-model="user.password" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      user: {
        name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    save() {
      console.log("Register");
      axios.post("http://localhost:3000/user/register", this.user).then(()=>{ 
        alert('User created success')
        // this.$router.push({ name: 'user-login' })
        const { ipcRenderer } = window.require('electron')
        ipcRenderer.send('pp-close-win-register')
       });
    },
  },
};
</script>