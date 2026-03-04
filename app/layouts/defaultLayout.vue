<!-- <template>
  <div>
    <slot />
  </div>
</template> -->


<template>
  <div>
    <Navbar />  <!-- auto-imported from components/Navbar.vue -->
    <main>
      <slot />  <!-- page content will be rendered here -->
    </main>
    <!-- Optional Footer -->
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
</script>