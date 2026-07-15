<template>
  <div class="chart">
    <svg :viewBox="`0 0 ${width} ${height}`" class="chart__svg" role="img" :aria-label="ariaLabel">
      <!-- Lignes de grille horizontales -->
      <line
        v-for="tick in 4"
        :key="tick"
        :x1="0"
        :x2="width"
        :y1="(plotHeight / 4) * tick"
        :y2="(plotHeight / 4) * tick"
        class="chart__grid"
      />

      <!-- Barres -->
      <template v-if="type === 'bar'">
        <rect
          v-for="(value, i) in data"
          :key="i"
          class="chart__bar"
          :x="i * step + step * 0.2"
          :width="step * 0.6"
          :y="plotHeight - barHeight(value)"
          :height="barHeight(value)"
          rx="4"
        />
      </template>

      <!-- Ligne -->
      <template v-else>
        <polyline class="chart__line" :points="linePoints" />
        <circle
          v-for="(value, i) in data"
          :key="i"
          class="chart__dot"
          :cx="i * step + step / 2"
          :cy="plotHeight - barHeight(value)"
          r="3.5"
        />
      </template>
    </svg>

    <div v-if="labels?.length" class="chart__labels">
      <span v-for="label in labels" :key="label" class="chart__label">{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'bar' | 'line';
    data: number[];
    labels?: string[];
    height?: number;
    ariaLabel?: string;
  }>(),
  { type: 'bar', height: 180, ariaLabel: 'Graphique' },
);

const width = 600;
const plotHeight = computed(() => props.height);
const step = computed(() => width / Math.max(props.data.length, 1));

const max = computed(() => Math.max(...props.data, 1));

function barHeight(value: number) {
  return (value / max.value) * (plotHeight.value - 12);
}

const linePoints = computed(() =>
  props.data
    .map((value, i) => `${i * step.value + step.value / 2},${plotHeight.value - barHeight(value)}`)
    .join(' '),
);
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
}

.chart__svg {
  width: 100%;
  height: auto;
  display: block;
}

.chart__grid {
  stroke: var(--color-border);
  stroke-width: 1;
}

.chart__bar {
  fill: var(--color-brand-primary);
  transition: fill 0.15s ease;

  &:hover {
    fill: var(--color-brand-secondary);
  }
}

.chart__line {
  fill: none;
  stroke: var(--color-brand-primary);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.chart__dot {
  fill: var(--color-surface);
  stroke: var(--color-brand-primary);
  stroke-width: 2;
}

.chart__labels {
  display: flex;
  margin-top: 8px;
}

.chart__label {
  flex: 1;
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
}
</style>
