<template>
  <input
    type="range"
    class="slider"
    :min="min"
    :max="max"
    :step="step"
    :value="modelValue"
    :style="{ '--slider-percent': percent + '%' }"
    @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    min?: number;
    max?: number;
    step?: number;
  }>(),
  { modelValue: 50, min: 0, max: 100, step: 1 },
);

defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

const percent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return ((props.modelValue - props.min) / range) * 100;
});
</script>

<style scoped lang="scss">
.slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 16px;
  margin: 8px 0;
  background: transparent;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--color-ring);
    outline-offset: 4px;
  }

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      var(--color-primary) var(--slider-percent),
      var(--color-border) var(--slider-percent)
    );
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -6px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid var(--color-border);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 999px;
    background: linear-gradient(
      to right,
      var(--color-primary) var(--slider-percent),
      var(--color-border) var(--slider-percent)
    );
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
}
</style>
