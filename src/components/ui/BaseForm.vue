<template>
  <form class="form" novalidate @submit.prevent="$emit('submit')">
    <slot />
  </form>
</template>

<script setup lang="ts">
defineEmits<{
  (event: 'submit'): void;
}>();
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}
</style>
