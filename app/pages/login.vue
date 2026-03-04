<template>
  <div class="login-page">
    <h1>Login Test</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="result">{{ result }}</p>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const result = ref('')

const handleLogin = async () => {
  try {
    console.log('Submitting:', email.value, password.value)
    
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { 
        email: email.value, 
        password: password.value 
      }
    })
    
    console.log('Response:', res)
    result.value = JSON.stringify(res)
  } catch (err) {
    console.error('Error:', err)
    result.value = 'Error: ' + err.message
  }
}
</script>