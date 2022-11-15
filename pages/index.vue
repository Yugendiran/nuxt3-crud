<template>
  <div class="h-screen w-full bg-slate-200 flex justify-center items-center">
    <div class="h-[80%] w-1/2 bg-white rounded-3xl p-10 overflow-scroll">
      <div class="flex justify-between items-center mb-5">
        <h1 class="text-3xl font-bold">Get all users</h1>
        <button
          @click="newUserModel = !newUserModel"
          class="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold"
        >
          Add user
        </button>
      </div>

      <table class="w-full">
        <tr class="bg-slate-100">
          <td class="p-5 font-bold rounded-l-2xl">User Id</td>
          <td class="p-5 font-bold">User Name</td>
          <td class="p-5 font-bold">User Age</td>
          <td class="p-5 font-bold">Edit</td>
          <td class="p-5 font-bold rounded-r-2xl">Delete</td>
        </tr>
        <tr v-for="(user, index) in users" :key="index">
          <td class="px-5 py-3">{{ index + 1 }}</td>
          <td class="px-5 py-3">
            <NuxtLink :to="`/user/${user.userId}`">{{
              user.userName
            }}</NuxtLink>
          </td>
          <td class="px-5 py-3">{{ user.userAge }}</td>
          <td class="px-5 py-3">
            <span @click="openEditModel(index)">
              <img src="/edit.svg" class="h-5 w-5" />
            </span>
          </td>
          <td class="px-5 py-3">
            <span @click="deleteUser(index)">
              <img src="/trash.svg" class="h-5 w-5" />
            </span>
          </td>
        </tr>
      </table>
    </div>
    <div
      v-if="newUserModel"
      class="absolute flex flex-col items-center shadow-2xl justify-center p-5 top-10 left-10 h-[300px] w-[400px] bg-white rounded-3xl"
    >
      <h1 class="text-lg font-bold mb-5">Add New User</h1>
      <input
        v-model="data.userName"
        type="text"
        placeholder="Enter New User Name"
        class="border h-14 w-full rounded-full px-5 font-medium text-gray-700 mb-5"
      />
      <input
        v-model="data.userAge"
        type="number"
        placeholder="Enter New User Age"
        class="border h-14 w-full rounded-full px-5 font-medium text-gray-700 mb-5"
      />
      <button
        @click="addUser"
        class="bg-blue-400 px-5 py-2 rounded-full text-white font-semibold"
      >
        Add user
      </button>
      <span
        @click="
          newUserModel = false;
          data = {};
        "
        >Close</span
      >
    </div>
    <div
      v-if="editUserModel"
      class="absolute flex flex-col items-center shadow-2xl justify-center p-5 top-10 left-10 h-[300px] w-[400px] bg-white rounded-3xl"
    >
      <h1 class="text-lg font-bold mb-5">Edit User</h1>
      <input
        v-model="data.userName"
        type="text"
        placeholder="Enter User Name"
        class="border h-14 w-full rounded-full px-5 font-medium text-gray-700 mb-5"
      />
      <input
        v-model="data.userAge"
        type="number"
        placeholder="Enter User Age"
        class="border h-14 w-full rounded-full px-5 font-medium text-gray-700 mb-5"
      />
      <button
        @click="editUser(data.index)"
        class="bg-blue-400 px-5 py-2 rounded-full text-white font-semibold"
      >
        Edit user
      </button>
      <span
        @click="
          editUserModel = false;
          data = {};
        "
        >Close</span
      >
    </div>
  </div>
</template>

<script setup>
const { data: users } = await useFetch(() => `http://localhost:5000/api/users`);
</script>

<script>
export default {
  data() {
    return {
      newUserModel: false,
      editUserModel: false,
      users: [],
      data: {
        userName: "",
        userAge: null,
      },
    };
  },
  methods: {
    addUser() {
      $fetch(`http://localhost:5000/api/users`, {
        method: "POST",
        body: this.data,
      }).then((response) => {
        if (response.success) {
          console.log(response);
          this.users.push(this.data);
          this.newUserModel = false;
          this.data = {};
          return;
        }
        console.log("Error");
      });
    },
    deleteUser(index) {
      index - 1;
      $fetch(`http://localhost:5000/api/users/${this.users[index].userId}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.success) {
          this.users.splice(index, 1);
          this.editUserModel = false;
          this.data = {};
          return;
        }
        console.log("error");
      });
    },
    editUser(index) {
      delete this.data.index;
      $fetch(`http://localhost:5000/api/users/${this.users[index].userId}`, {
        method: "PATCH",
        body: this.data,
      }).then((response) => {
        if (response.success) {
          this.users[index] = this.data;
          this.editUserModel = false;
          return;
        }
        console.log("Error");
      });
    },
    openEditModel(index) {
      index - 1;
      // this.data = JSON.parse(JSON.stringify(this.users[index]));
      // this.data = _.cloneDeep(this.users[index]);
      this.data = Object.assign({}, this.users[index]);
      this.data.index = index;
      this.editUserModel = true;
    },
  },
};
</script>
