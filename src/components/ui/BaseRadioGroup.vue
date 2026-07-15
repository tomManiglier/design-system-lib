<template>
  <div class="radio-group" role="radiogroup">
    <label v-for="opt in options" :key="String(opt.value)" class="radio">
      <input
        type="radio"
        class="radio__input"
        :value="opt.value"
        :checked="modelValue === opt.value"
        @change="$emit('update:modelValue', opt.value)"
      />
      <span class="radio__label">{{ opt.label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { RadioOption } from './types';

defineProps<{
  modelValue?: string | number;
  options: RadioOption[];
}>();

defineEmits<{
  (event: 'update:modelValue', value: string | number): void;
}>();
</script>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: var(--text-sm);
}

.radio__input {
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  flex: none;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: var(--color-surface);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }

  &:checked {
    background: var(--color-primary);
    border-color: var(--color-primary);
    box-shadow: none;
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-primary-foreground);
    transform: translate(-50%, -50%);
  }
}
</style>
