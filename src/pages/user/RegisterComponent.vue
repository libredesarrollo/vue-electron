<template>
  <form @submit.prevent="save">
    <div class="card">
      <div class="card-header">
        <h3>Register</h3>
      </div>
      <div class="card-body">
        <div class="mb-2">
          <label for="name">Name</label>
          <input
            class="form-control"
            type="text"
            v-model="user.name"
            id="name"
          />
        </div>

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
        <button type="submit" class="btn btn-primary">Send</button>
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
        name: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    save() {
      axios.post("http://localhost:3000/user/register", this.user).then(() => {
        alert("User created success");
        // this.$router.push({ name: 'user-login' })
        if (window.require) {
          const { ipcRenderer } = window.require("electron");
          ipcRenderer.send("pp-close-win-register");
        }
        this.$router.push({ name: "list" });
      });
    },
  },
};
</script>