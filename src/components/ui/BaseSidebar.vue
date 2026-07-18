<template>
  <aside class="sidebar" :class="{ 'sidebar--full': full }">
    <div v-if="$slots.header" class="sidebar__header"><slot name="header" /></div>
    <div class="sidebar__groups">
      <div v-for="group in groups" :key="group.title" class="sidebar__group">
        <p class="sidebar__title">{{ group.title }}</p>
        <ul class="sidebar__list">
          <li v-for="item in group.items" :key="item.value">
            <button
              type="button"
              class="sidebar__link"
              :class="{ 'sidebar__link--active': item.value === modelValue }"
              @click="$emit('update:modelValue', item.value)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="$slots.footer" class="sidebar__footer"><slot name="footer" /></div>
  </aside>
</template>

<script setup lang="ts">
import type { SidebarGroup } from './types';

withDefaults(
  defineProps<{
    groups: SidebarGroup[];
    modelValue?: string;
    full?: boolean;
  }>(),
  { full: false },
);

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  width: 220px;
  max-width: 100%;
  padding: 16px 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

// Variante avancée : occupe 100 % de la hauteur disponible, façon application
.sidebar--full {
  height: 100%;
  border-radius: 0;
  border-top: none;
  border-bottom: none;
  border-left: none;
}

.sidebar__groups {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
  overflow-y: auto;
}

.sidebar__header {
  padding: 4px 10px 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 16px;
}

.sidebar__footer {
  padding: 16px 10px 4px;
  border-top: 1px solid var(--color-border);
  margin-top: 16px;
}

.sidebar__title {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted-foreground);
  margin: 0 0 8px;
  padding: 0 10px;
}

.sidebar__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__link {
  width: 100%;
  padding: 7px 10px;
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  text-align: left;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background 0.12s ease,
    color 0.12s ease;

  &:hover {
    color: var(--color-foreground);
    background: var(--color-muted);
  }
}

.sidebar__link--active {
  color: var(--color-foreground);
  background: var(--color-muted);
  font-weight: var(--weight-medium);
}
</style>
