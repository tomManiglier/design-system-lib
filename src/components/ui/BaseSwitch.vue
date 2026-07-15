<template>
  <button
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :class="['switch', `switch--${color}`, { 'switch--on': modelValue }]"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span class="switch__thumb" />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: boolean;
    color?: 'brand' | 'black';
  }>(),
  { color: 'brand' },
);

defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();
</script>

<style scoped lang="scss">
.switch {
  position: relative;
  width: 40px;
  height: 22px;
  padding: 0;
  border-radius: 999px;
  background-color: var(--color-border);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 2px;
  }
}

.switch--brand.switch--on {
  background-color: var(--color-brand-primary);
}

.switch--black.switch--on {
  background-color: var(--color-primary);

  .switch__thumb {
    background-color: var(--color-primary-foreground);
  }
}

.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease;
}

.switch--on .switch__thumb {
  transform: translateX(18px);
}
</style>
