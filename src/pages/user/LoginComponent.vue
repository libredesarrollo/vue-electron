<template>
  <div>
    <h3>Login</h3>

    <p>*** {{ $root.auth }} ***</p>

    <form @submit.prevent="save">
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
        username: "admin",
        password: "12345",
      },
    };
  },
  methods: {
    save() {
      console.log("Login");
      axios.post("http://localhost:3000/user/login", this.user).then((res) => {
        if (res.data.login) {
          this.$root.auth = res.data;

          alert("User login success");
          //this.$router.push({ name: 'list' })

          const { ipcRenderer } = window.require("electron");
          ipcRenderer.send("pp-close-win-login");
        } else alert("Login Fail");
      });
    },
  },
};
</script>