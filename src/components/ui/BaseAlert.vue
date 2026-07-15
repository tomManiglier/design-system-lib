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
  color: #005ca9;
  background: rgba(0, 154, 223, 0.08);
  border-color: rgba(0, 154, 223, 0.25);
}

.alert--success {
  color: #1a7f45;
  background: rgba(26, 127, 69, 0.08);
  border-color: rgba(26, 127, 69, 0.25);
}

.alert--warning {
  color: #8a6d00;
  background: rgba(254, 235, 23, 0.16);
  border-color: rgba(200, 170, 0, 0.35);
}

.alert--danger {
  color: #b3261e;
  background: rgba(179, 38, 30, 0.08);
  border-color: rgba(179, 38, 30, 0.25);
}
</style>
