<template>
  <span
    class="spinner"
    :style="{ width: size + 'px', height: size + 'px' }"
    role="status"
    aria-label="Chargement"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  { size: 20 },
);
</script>

<style scoped lang="scss">
.spinner {
  display: inline-block;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-orange);
  border-radius: 50%;
  animation: spinner-rotate 0.7s linear infinite;
}

@keyframes spinner-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 2s;
  }
}
</style>
