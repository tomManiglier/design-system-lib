<template>
  <nav class="pagination" aria-label="Pagination">
    <button
      type="button"
      class="pagination__btn"
      :disabled="modelValue <= 1"
      aria-label="Page précédente"
      @click="go(modelValue - 1)"
    >
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <template v-for="(page, i) in pages">
      <span v-if="page === '…'" :key="`dots-${i}`" class="pagination__dots">…</span>
      <button
        v-else
        :key="`page-${page}`"
        type="button"
        class="pagination__btn"
        :class="{ 'pagination__btn--active': page === modelValue }"
        :aria-current="page === modelValue ? 'page' : undefined"
        @click="go(page as number)"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      class="pagination__btn"
      :disabled="modelValue >= total"
      aria-label="Page suivante"
      @click="go(modelValue + 1)"
    >
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue: number;
    total: number;
  }>(),
  { modelValue: 1 },
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void;
}>();

function go(page: number) {
  if (page < 1 || page > props.total) return;
  emit('update:modelValue', page);
}

// 1 … (current-1, current, current+1) … total, sans doublons
const pages = computed<(number | string)[]>(() => {
  const { total, modelValue: current } = props;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const middle = [current - 1, current, current + 1].filter((p) => p > 1 && p < total);
  const result: (number | string)[] = [1];
  if (middle.length && (middle[0] as number) > 2) result.push('…');
  result.push(...middle);
  if (middle.length && (middle[middle.length - 1] as number) < total - 1) result.push('…');
  result.push(total);
  return result;
});
</script>

<style scoped lang="scss">
.pagination {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.pagination__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 6px;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-foreground);
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background 0.12s ease,
    border-color 0.12s ease;

  &:hover:not(:disabled) {
    background: var(--color-muted);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
}

.pagination__btn--active {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.pagination__dots {
  min-width: 24px;
  text-align: center;
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
}
</style>
