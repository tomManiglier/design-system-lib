<template>
  <div ref="root" class="multiselect">
    <button
      type="button"
      class="multiselect__trigger"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="multiselect__value" :class="{ 'multiselect__value--placeholder': !selectedLabels.length }">
        {{ selectedLabels.length ? selectedLabels.join(', ') : placeholder }}
      </span>
      <svg
        class="multiselect__chevron"
        :class="{ 'multiselect__chevron--open': open }"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div v-if="open" class="multiselect__panel" role="listbox" aria-multiselectable="true">
      <button
        v-for="opt in options"
        :key="String(opt.value)"
        type="button"
        class="multiselect__option"
        role="option"
        :aria-selected="isSelected(opt.value)"
        @click="toggleOption(opt.value)"
      >
        <span class="multiselect__box" :class="{ 'multiselect__box--checked': isSelected(opt.value) }">
          <svg
            v-if="isSelected(opt.value)"
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { SelectOption } from './types';

const props = withDefaults(
  defineProps<{
    modelValue?: (string | number)[];
    options: SelectOption[];
    placeholder?: string;
  }>(),
  { modelValue: () => [], placeholder: 'Sélectionner...' },
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: (string | number)[]): void;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

const selectedLabels = computed(() =>
  props.options.filter((o) => props.modelValue.includes(o.value)).map((o) => o.label),
);

function isSelected(value: string | number) {
  return props.modelValue.includes(value);
}

function toggleOption(value: string | number) {
  const next = isSelected(value)
    ? props.modelValue.filter((v) => v !== value)
    : [...props.modelValue, value];
  emit('update:modelValue', next);
}

function onClickOutside(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    open.value = false;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false;
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside);
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped lang="scss">
.multiselect {
  position: relative;
  width: 100%;
}

.multiselect__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-visible {
    // Déclencheur stylé comme un champ : indicateur bordure + halo, sans l'outline global
    outline: none;
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 18%, transparent);
  }
}

.multiselect__value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.multiselect__value--placeholder {
  color: var(--color-muted-foreground);
}

.multiselect__chevron {
  flex: none;
  color: var(--color-muted-foreground);
  transition: transform 0.2s ease;
}

.multiselect__chevron--open {
  transform: rotate(180deg);
}

.multiselect__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  max-height: 240px;
  overflow-y: auto;
}

.multiselect__option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  text-align: left;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover {
    background: var(--color-muted);
  }
}

.multiselect__box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-surface);
  color: var(--color-primary-foreground);
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.multiselect__box--checked {
  background: var(--color-primary);
  border-color: var(--color-primary);
}
</style>
