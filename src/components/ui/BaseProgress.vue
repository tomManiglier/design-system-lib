<template>
  <div
    class="progress"
    role="progressbar"
    :aria-valuenow="clamped"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="progress__bar" :style="{ width: clamped + '%' }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    value?: number;
  }>(),
  { value: 0 },
);

const clamped = computed(() => Math.min(100, Math.max(0, props.value)));
</script>

<style scoped lang="scss">
.progress {
  width: 100%;
  height: 8px;
  background: var(--color-muted);
  border-radius: 999px;
  overflow: hidden;
}

.progress__bar {
  height: 100%;
  border-radius: 999px;
  background: var(--gradient-brand-cool);
  transition: width 0.3s ease;
}
</style>
