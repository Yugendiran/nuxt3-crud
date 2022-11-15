<template>
  <div class="h-screen w-full bg-slate-200 flex justify-center items-center">
    <div class="h-[80%] w-1/2 bg-white rounded-3xl p-10">
      <NuxtLink
        to="/"
        class="w-max bg-blue-500 px-3 mb-5 rounded-full text-white"
        >Back</NuxtLink
      >

      <h1>User Id: {{ data.user.userId }}</h1>
      <h1>User Name: {{ data.user.userName }}</h1>
      <h1>User Age: {{ data.user.userAge }}</h1>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const { data } = useFetch(
  () => `http://localhost:5000/api/users/${route.params.id}`
);
</script>
