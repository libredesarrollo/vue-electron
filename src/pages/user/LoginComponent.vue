<template>
  <form @submit.prevent="save">
    <div class="card">
      <div class="card-header">
        <h3>Login</h3>
      </div>
      <div class="card-body">
        <div class="mb-2">
          <label for="username">Username</label>
          <input
            id="username"
            class="form-control"
            type="text"
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="password">Password</label>
          <input
            id="password"
            class="form-control"
            type="password"
            v-model="user.password"
          />
        </div>
      </div>
      <div class="card-footer">
        <button class="btn btn-primary" type="submit">Send</button>
      </div>
    </div>
  </form>
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
          
          if (window.require) {
            // electron
            const { ipcRenderer } = window.require("electron");
            ipcRenderer.send("pp-close-win-login");
          }else{
            // vue app
            this.$cookies.set("auth", res.data.user);
            this.$cookies.set("token", res.data.token);
          }

          alert("User login success");
          
          this.$router.push({ name: 'list' })
        } else alert("Login Fail");
      });
    },
  },
};
</script>