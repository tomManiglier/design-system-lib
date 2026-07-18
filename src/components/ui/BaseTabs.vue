<template>
  <div class="tabs">
    <div class="tabs__list" role="tablist" @keydown="onKeydown">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.value"
        :ref="(el) => setTriggerRef(el, i)"
        type="button"
        role="tab"
        class="tabs__trigger"
        :class="{ 'tabs__trigger--active': tab.value === modelValue }"
        :aria-selected="tab.value === modelValue"
        :tabindex="tab.value === modelValue ? 0 : -1"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TabItem } from './types';

const props = defineProps<{
  modelValue: string;
  tabs: TabItem[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

// Roving tabindex (pattern ARIA "tabs") : un seul onglet tabulable, les flèches
// déplacent à la fois la sélection et le focus.
const triggerRefs = ref<(HTMLButtonElement | null)[]>([]);

function setTriggerRef(el: unknown, index: number) {
  triggerRefs.value[index] = el as HTMLButtonElement | null;
}

function onKeydown(event: KeyboardEvent) {
  const count = props.tabs.length;
  if (!count) return;
  const current = props.tabs.findIndex((tab) => tab.value === props.modelValue);
  let next: number;
  if (event.key === 'ArrowRight') next = (current + 1) % count;
  else if (event.key === 'ArrowLeft') next = (current - 1 + count) % count;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = count - 1;
  else return;
  event.preventDefault();
  emit('update:modelValue', props.tabs[next].value);
  triggerRefs.value[next]?.focus();
}
</script>

<style scoped lang="scss">
.tabs__list {
  display: inline-flex;
  max-width: 100%;
  gap: 4px;
  padding: 4px;
  background: var(--color-muted);
  border-radius: var(--radius-md);
  // Beaucoup d'onglets sur écran étroit : la barre défile au lieu de déborder la page
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.tabs__trigger {
  flex: none;
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
