<template>
  <div class="tabs">
    <div class="tabs__list" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        role="tab"
        class="tabs__trigger"
        :class="{ 'tabs__trigger--active': tab.value === modelValue }"
        :aria-selected="tab.value === modelValue"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TabItem } from './types';

defineProps<{
  modelValue: string;
  tabs: TabItem[];
}>();

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="scss">
.tabs__list {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-muted);
  border-radius: var(--radius-md);
}

.tabs__trigger {
  height: 32px;
  padding: 0 14px;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-muted-foreground);
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;

  &:hover {
    color: var(--color-foreground);
  }
}

.tabs__trigger--active {
  color: var(--color-foreground);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}
</style>
