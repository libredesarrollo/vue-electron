<template>
  <div>
    <h1>List</h1>
    <div v-for="(item, index) in items" :key="index">
      <p>{{ item.name }}</p>
      <button @click="remove(item.id)">Remove</button>
      <button @click="edit(index)">Edit</button>
    </div>

    <form @submit.prevent="save">
      <input type="text" v-model="task" />
      <button type="submit">Save</button>
    </form>
  </div>
</template>
<script>
const { ipcRenderer } = window.require("electron");
// const { ipcRenderer } = require('electron')
export default {
  created() {
    ipcRenderer.on("pr-items", (event, items) => {
      this.items = items;
    });
  },
  data() {
    return {
      task: "",
      items: [],
      indexEdit: -1,
    };
  },
  methods: {
    save() {
      if (this.task.trim() == "") return;
      if (this.indexEdit >= 0) {
        //this.items[this.indexEdit] = this.task
        ipcRenderer.send("pp-item-edit", {
          task: this.task,
          indexEdit: this.items[this.indexEdit].id,
        });
      } else {
        //this.items.push(this.task.trim());
        ipcRenderer.send("pp-item-create", {
          task: this.task,
        });
      }

      this.task = "";
      this.indexEdit = -1;
    },
    remove(id) {
      // this.items.splice(id, 1);
      ipcRenderer.send("pp-item-delete", id);
    },
    edit(index) {
      this.indexEdit = index;
      this.task = this.items[this.indexEdit].name;
    },
  },
};
</script>