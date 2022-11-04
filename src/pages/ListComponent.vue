<template>
  <div>
    <h1>List</h1>

    <ul class="list-group">
      <li v-for="(item, index) in items" :key="index" class="list-group-item">
        <span class="me-2">{{ item.name }} - {{ item.id }}</span>
        <button class="btn btn-danger btn-sm me-2" @click="remove(item.id)">
          Remove
        </button>
        <button class="btn btn-primary btn-sm" @click="edit(index)">
          Edit
        </button>
      </li>
    </ul>

    <form @submit.prevent="save">
      <div class="row g-2 mt-2">
        <div class="col-auto">
          <input type="text" v-model="task" class="form-control" />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-success">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
//const { ipcRenderer } = window.require("electron");
const axios = require("axios");
// const { ipcRenderer } = require('electron')
export default {
  created() {
    // ipcRenderer.on("pr-items", (event, items) => {
    //   this.items = items;
    // });
    this.init();
  },
  data() {
    return {
      task: "",
      items: [],
      indexEdit: -1,
    };
  },
  methods: {
    init() {
      axios
        .get("http://localhost:3000/task")
        .then((res) => (this.items = res.data));
    },
    async save() {
      if (this.task.trim() == "") return;
      if (this.indexEdit >= 0) {
        //this.items[this.indexEdit] = this.task
        // ipcRenderer.send("pp-item-edit", {
        //   task: this.task,
        //   indexEdit: this.items[this.indexEdit].id,
        // });

        await axios.put(
          "http://localhost:3000/task/" + this.items[this.indexEdit].id,
          {
            task: this.task,
            // id: this.items[this.indexEdit].id,
          }
        );

        this.init();
      } else {
        //this.items.push(this.task.trim());
        // ipcRenderer.send("pp-item-create", {
        //   task: this.task,
        // });

        axios
          .post("http://localhost:3000/task", {
            task: this.task,
          })
          .then(() => this.init());
      }

      this.task = "";
      this.indexEdit = -1;
    },
    async remove(id) {
      // this.items.splice(id, 1);
      // ipcRenderer.send("pp-item-delete", id);
      await axios.delete("http://localhost:3000/task/" + id);
      this.init();
    },
    edit(index) {
      this.indexEdit = index;
      this.task = this.items[this.indexEdit].name;
    },
  },
};
</script>