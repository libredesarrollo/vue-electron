<template>
  <nav class="navbar navbar-expand bg-dark navbar-dark mb-2">
    <div class="container-fluid">
      <a href="#" class="navbar-brand"> Task </a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto my-2">
          <li v-if="auth.login" class="nav-item">
            <span class="nav-link">Hello {{ auth.user.name }}</span>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Home</a>
          </li>
          <!-- <li class="nav-item">
            <a href="#" class="nav-link">Test</a>
          </li> -->
        </ul>
      </div>

      <ul class="navbar-nav me-auto my-2" v-if="$route.name == 'list'">
        <!-- <li class="nav-item">
          <a href="#" class="nav-link">Test</a>
        </li> -->

        <li class="nav-item" v-if="!auth.login">
          <span @click="register" class="nav-link">Register</span>
        </li>
        <li class="nav-item" v-if="!auth.login">
          <span @click="login" class="nav-link">Login</span>
        </li>
        <li class="nav-item" v-else>
          <span @click="logout" class="nav-link">Close session</span>
        </li>
      </ul>
    </div>
  </nav>

  <!-- <template v-if="!auth.login">
    <button @click="register">Register</button>
    <button @click="login">Login</button>
  </template>
  <p v-else>
    Hello {{ auth.user.name }}
    <button @click="logout">Close session</button>
  </p> -->
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  name: "App",
  mounted() {
    console.log("process.env.VUE_APP_DEBUG");
    console.log(process.env.VUE_APP_DEBUG);

    if (window.require) {
      // modulo de electron
      const { ipcRenderer } = window.require("electron");

      // ipcRenderer.on('pr-get-token',(event, token) =>{
      //   console.log(token)
      // })
      ipcRenderer.send("pp-get-token-user");
      ipcRenderer.on("pr-get-token-user", (event, tokenUser) => {
        console.log(tokenUser);
        this.auth = tokenUser;
      });
    } else {
      // app web navegador
      //this.$cookies.set("token","4564899")
      //console.log(this.$cookies.get('token'))
      // let token = "4564899";
      axios
        .post("http://localhost:3000/user/token/" + this.$cookies.get("token"))
        .then((res) => {
          this.$cookies.set("auth", res.data);
          this.auth = res.data;
        });
    }
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
      if (window.require) {
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send("pp-win-register");
      } else {
        this.$router.push({ name: "user-register" });
      }
    },
    login() {
      if (window.require) {
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send("pp-win-login");
      } else {
        this.$router.push({ name: "user-login" });
      }
    },
    logout() {
      if (window.require) {
        // electron
        const { ipcRenderer } = window.require("electron");
        ipcRenderer.send("pp-win-logout");
        setTimeout(() => location.reload());
      } else {
        // vue app
        axios
          .post(
            "http://localhost:3000/user/logout/" + this.$cookies.get("token")
          )
          .then(() => {
            this.$cookies.set("auth", "");
            this.$cookies.set("token", "");
            location.reload();
          });
      }
    },
  },
};
</script>


<style>
.nav-item {
  cursor: pointer;
}
</style>