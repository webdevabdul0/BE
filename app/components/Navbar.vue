<template>
  <nav class="navbar">
    <div class="logo">
      <NuxtLink to="/">MyApp</NuxtLink>
    </div>

    <ul class="nav-links">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink to="/about">About</NuxtLink></li>
      <li><NuxtLink to="/">Contact</NuxtLink></li>
    </ul>
  </nav>
</template>

<script setup>
// No script needed for basic navbar
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: #1f2937;
  color: white;
}

.logo a {
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: 500;
}

.nav-links a:hover {
  color: #38bdf8;
}
</style>