<template>
  <div class="h-screen w-full bg-slate-200 flex justify-center items-center">
    <div class="h-[80%] w-1/2 bg-white rounded-3xl p-10">
      <div class="flex justify-between items-center mb-5">
        <h1 class="text-3xl font-bold">Get all users</h1>
        <button
          @click="newUserModel = !newUserModel"
          class="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold"
        >
          Add user
        </button>
      </div>
      <ul>
        <table class="w-full">
          <tr class="bg-slate-100">
            <td class="p-5 font-bold rounded-l-2xl">User Id</td>
            <td class="p-5 font-bold">User Name</td>
            <td class="p-5 font-bold rounded-r-2xl">User Age</td>
          </tr>
          <tr v-for="(user, index) in users" :key="index">
            <td class="px-5 py-3">{{ user.userId }}</td>
            <td class="px-5 py-3">{{ user.userName }}</td>
            <td class="px-5 py-3">{{ user.userAge }}</td>
          </tr>
        </table>
      </ul>
    </div>
    <div
      v-if="newUserModel"
      class="absolute flex flex-col items-center justify-center p-5 top-10 left-10 h-[300px] w-[400px] bg-white rounded-3xl"
    >
      <h1 class="text-lg font-bold mb-5">Add New User</h1>
      <input
        v-model="data.userName"
        type="text"
        placeholder="Enter New User Name"
        class="border h-14 w-full rounded-full px-5 font-medium text-gray-700 mb-5"
      />
      <button
        @click="addUser"
        class="bg-blue-400 px-5 py-2 rounded-full text-white font-semibold"
      >
        Add user
      </button>
    </div>
  </div>
</template>

<script setup>
const { data: users } = await useFetch(() => `http://localhost:5000/api/users`);

let data = {
  userName: "",
  userAge: 12,
};

function addUser() {
  console.log(data);
  useFetch(() => `http://localhost:5000/api/users`, {
    method: "post",
    body: data,
  });
}
</script>

<script>
export default {
  data() {
    return {
      newUser: "",
      newUserModel: false,
      users: [],
      //   data: {
      //     userName: "Yugiadd",
      //     userAge: 12,
      //   },
    };
  },
  methods: {
    // addUser() {
    //   console.log(this.data);
    //   useFetch(() => `http://localhost:5000/api/users`, {
    //     method: "post",
    //     body: this.data,
    //   });
    // },
  },
};
</script>
