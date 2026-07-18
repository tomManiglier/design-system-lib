<template>
  <div class="alert" :class="`alert--${variant}`" role="alert">
    <p v-if="title" class="alert__title">{{ title }}</p>
    <div class="alert__desc"><slot /></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'info' | 'success' | 'warning' | 'danger';
    title?: string;
  }>(),
  { variant: 'info' },
);
</script>

<style scoped lang="scss">
.alert {
  border: 1px solid;
  border-radius: var(--radius-md);
  padding: 14px 16px;
}

.alert__title {
  font-weight: var(--weight-bold);
  font-size: var(--text-sm);
  margin: 0 0 4px;
}

.alert__desc {
  font-size: var(--text-sm);
  line-height: 1.5;
}

.alert--info {
  color: var(--color-info);
  background: color-mix(in srgb, var(--color-info) 8%, transparent);
  border-color: color-mix(in srgb, var(--color-info) 25%, transparent);
}

.alert--success {
  color: var(--color-success);
  background: color-mix(in srgb, var(--color-success) 8%, transparent);
  border-color: color-mix(in srgb, var(--color-success) 25%, transparent);
}

.alert--warning {
  color: var(--color-warning);
  background: color-mix(in srgb, var(--color-warning) 10%, transparent);
  border-color: color-mix(in srgb, var(--color-warning) 30%, transparent);
}

.alert--danger {
  color: var(--color-danger);
  background: color-mix(in srgb, var(--color-danger) 8%, transparent);
  border-color: color-mix(in srgb, var(--color-danger) 25%, transparent);
}
</style>
