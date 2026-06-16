<script setup lang="ts">
import { ref } from 'vue'
import Login from './views/Login.vue'
import Layout from './views/Layout.vue'
import type { MockUser } from './mock/accounts'

const loggedInUser = ref<MockUser | null>(null)

const handleLogin = (user: MockUser) => {
  loggedInUser.value = user
}

const handleLogout = () => {
  loggedInUser.value = null
}
</script>

<template>
  <Login v-if="!loggedInUser" @login="handleLogin" />
  <Layout v-else :user="loggedInUser" @logout="handleLogout" />
</template>
