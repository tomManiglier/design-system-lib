<template>
  <div class="select-wrap">
    <select
      class="select"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="String(opt.value)" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <span class="select__chevron" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from './types';

withDefaults(
  defineProps<{
    modelValue?: string | number;
    options: SelectOption[];
    placeholder?: string;
  }>(),
  { modelValue: '' },
);

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="scss">
.select-wrap {
  position: relative;
  display: inline-block;
  width: 100%;
}

.select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 36px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-foreground);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 36px 0 12px;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px rgba(0, 154, 223, 0.15);
  }
}

.select__chevron {
  position: absolute;
  top: 50%;
  right: 14px;
  width: 8px;
  height: 8px;
  border-right: 2px solid var(--color-muted-foreground);
  border-bottom: 2px solid var(--color-muted-foreground);
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}
</style>
