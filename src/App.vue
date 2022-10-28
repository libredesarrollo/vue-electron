<template>
  <template v-if="!auth.login">
    <button @click="register">Register</button>
    <button @click="login">Login</button>
  </template>
  <p v-else>
    Hello {{ auth.user.name }}
    <button @click="logout">Close session</button>
  </p>

  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    const { ipcRenderer } = window.require("electron");
    ipcRenderer.send("pp-get-token-user");

    // ipcRenderer.on('pr-get-token',(event, token) =>{
    //   console.log(token)
    // })

    ipcRenderer.on("pr-get-token-user", (event, tokenUser) => {
      console.log(tokenUser);
      this.auth = tokenUser;
    });
  },
  data() {
    return {
      auth: {
        login: false,
        user: null,
      },
    };
  },
  methods: {
    register() {
      console.log("Register");

      const { ipcRenderer } = window.require("electron");

      ipcRenderer.send("pp-win-register");
    },
    login() {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("pp-win-login");
    },
    logout() {
      const { ipcRenderer } = window.require("electron");
      ipcRenderer.send("pp-win-logout");

      setTimeout(()=>location.reload(), 1000)
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
