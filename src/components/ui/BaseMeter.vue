<template>
  <div class="meter">
    <div v-if="label || showValue" class="meter__header">
      <span v-if="label" class="meter__label">{{ label }}</span>
      <span v-if="showValue" class="meter__value">{{ display }}</span>
    </div>
    <div
      class="meter__track"
      role="meter"
      :aria-valuenow="value"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-label="label"
    >
      <div class="meter__bar" :style="{ width: percent + '%' }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    value: number;
    min?: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    format?: (value: number) => string;
  }>(),
  { min: 0, max: 100, showValue: true },
);

const percent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return Math.min(100, Math.max(0, ((props.value - props.min) / range) * 100));
});

const display = computed(() =>
  props.format ? props.format(props.value) : `${Math.round(percent.value)}%`,
);
</script>

<style scoped lang="scss">
.meter {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.meter__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.meter__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.meter__value {
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
  font-variant-numeric: tabular-nums;
}

.meter__track {
  width: 100%;
  height: 8px;
  background: var(--color-muted);
  border-radius: 999px;
  overflow: hidden;
}

.meter__bar {
  height: 100%;
  border-radius: 999px;
  background: var(--color-brand-primary);
  transition: width 0.3s ease;
}
</style>
