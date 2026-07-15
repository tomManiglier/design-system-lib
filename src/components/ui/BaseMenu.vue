<template>
  <div ref="root" class="menu">
    <div class="menu__trigger" @click="open = !open">
      <slot name="trigger">
        <button type="button" class="menu__default-trigger" :aria-expanded="open">
          Menu
        </button>
      </slot>
    </div>

    <div v-if="open" class="menu__panel" role="menu">
      <template v-for="(entry, i) in entries">
        <div v-if="entry.separator" :key="`sep-${i}`" class="menu__separator" role="separator" />
        <button
          v-else
          :key="`item-${i}`"
          type="button"
          class="menu__item"
          :class="{ 'menu__item--danger': entry.danger }"
          role="menuitem"
          @click="select(entry)"
        >
          <BaseIcon v-if="entry.icon" :name="entry.icon" :size="15" class="menu__icon" />
          {{ entry.label }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import BaseIcon from './BaseIcon.vue';
import type { MenuEntry } from './types';

defineProps<{ entries: MenuEntry[] }>();

const emit = defineEmits<{
  (event: 'select', value: string): void;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

function select(entry: MenuEntry) {
  emit('select', entry.value ?? entry.label ?? '');
  open.value = false;
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
.menu {
  position: relative;
  display: inline-block;
}

.menu__default-trigger {
  height: 36px;
  padding: 0 16px;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-foreground);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;

  &:hover {
    background: var(--color-muted);
  }
}

.menu__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 180px;
  padding: 4px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.menu__icon {
  color: var(--color-muted-foreground);
}

.menu__item--danger .menu__icon {
  color: inherit;
}

.menu__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  text-align: left;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: var(--color-muted);
  }
}

.menu__item--danger {
  color: #b3261e;

  &:hover {
    background: rgba(179, 38, 30, 0.08);
  }
}

.menu__separator {
  height: 1px;
  margin: 4px 0;
  background: var(--color-border);
}
</style>
