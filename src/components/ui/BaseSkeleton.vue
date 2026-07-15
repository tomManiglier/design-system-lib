<template>
  <span
    class="skeleton"
    :style="{ width, height, borderRadius: radius }"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    radius?: string;
  }>(),
  { width: '100%', height: '16px', radius: '6px' },
);
</script>

<style scoped lang="scss">
.skeleton {
  display: block;
  background: linear-gradient(
    90deg,
    var(--color-muted) 25%,
    var(--color-border) 50%,
    var(--color-muted) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.4s ease-in-out infinite;
}

@keyframes skeleton-shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
</style>
