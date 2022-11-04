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
      
      <ul class="navbar-nav me-auto my-2" v-if="$route.name == 'list'" >
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

      setTimeout(() => location.reload());
    },
  },
};
</script>


<style>
.nav-item {
  cursor: pointer;
}
</style>