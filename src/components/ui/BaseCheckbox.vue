<template>
  <label class="checkbox">
    <input
      type="checkbox"
      class="checkbox__input"
      :checked="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    <span v-if="$slots.default" class="checkbox__label"><slot /></span>
  </label>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: boolean }>();

defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();
</script>

<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: var(--text-sm);
}

.checkbox__input {
  appearance: none;
  -webkit-appearance: none;
  flex: none;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 4px;
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
    display: block;
    width: 4px;
    height: 8px;
    margin: 1px auto 0;
    border: solid var(--color-primary-foreground);
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
  }
}
</style>
