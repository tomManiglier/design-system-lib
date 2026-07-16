<template>
  <nav ref="root" class="navmenu" aria-label="Navigation principale">
    <ul class="navmenu__list">
      <li v-for="(item, i) in items" :key="item.label" class="navmenu__item">
        <component
          :is="triggerTag(item)"
          v-bind="triggerAttrs(item)"
          class="navmenu__trigger"
          :class="{ 'navmenu__trigger--open': openIndex === i }"
          :aria-expanded="item.links ? openIndex === i : undefined"
          @click="toggle(i, item)"
        >
          {{ item.label }}
          <svg
            v-if="item.links"
            class="navmenu__chevron"
            :class="{ 'navmenu__chevron--open': openIndex === i }"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </component>

        <div v-if="item.links && openIndex === i" class="navmenu__panel">
          <component
            :is="panelLinkTag(link)"
            v-for="link in item.links"
            :key="link.label"
            v-bind="panelLinkAttrs(link)"
            class="navmenu__link"
            @click="select(link.label)"
          >
            <span class="navmenu__link-label">{{ link.label }}</span>
            <span v-if="link.description" class="navmenu__link-desc">{{ link.description }}</span>
          </component>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, type Component } from 'vue';
import type { NavigationMenuItem, NavigationMenuLink } from './types';

const props = withDefaults(
  defineProps<{
    items: NavigationMenuItem[];
    // Composant/balise utilisée pour les entrées avec `to`/`href` : 'a' par défaut (fonctionne
    // partout, y compris en custom element hors Vue) ; passer RouterLink pour une navigation SPA.
    linkComponent?: string | Component;
  }>(),
  {
    linkComponent: 'a',
  },
);

const emit = defineEmits<{
  (event: 'select', label: string): void;
}>();

const openIndex = ref<number | null>(null);
const root = ref<HTMLElement | null>(null);

function isRealLink(entry: { to?: string; href?: string }) {
  return !!(entry.to || entry.href);
}

function linkAttrs(entry: { to?: string; href?: string }) {
  if (typeof props.linkComponent !== 'string' && entry.to) {
    return { to: entry.to };
  }
  return { href: entry.to ?? entry.href };
}

function triggerTag(item: NavigationMenuItem) {
  if (item.links) return 'button';
  return isRealLink(item) ? props.linkComponent : 'button';
}

function triggerAttrs(item: NavigationMenuItem) {
  if (item.links || !isRealLink(item)) return { type: 'button' };
  return linkAttrs(item);
}

function panelLinkTag(link: NavigationMenuLink) {
  return isRealLink(link) ? props.linkComponent : 'button';
}

function panelLinkAttrs(link: NavigationMenuLink) {
  if (!isRealLink(link)) return { type: 'button' };
  return linkAttrs(link);
}

function toggle(index: number, item: NavigationMenuItem) {
  if (!item.links) {
    emit('select', item.label);
    openIndex.value = null;
    return;
  }
  openIndex.value = openIndex.value === index ? null : index;
}

function select(label: string) {
  emit('select', label);
  openIndex.value = null;
}

function onClickOutside(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    openIndex.value = null;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') openIndex.value = null;
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
.navmenu {
  position: relative;
}

.navmenu__list {
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  background: var(--color-muted);
  border-radius: var(--radius-md);
}

.navmenu__item {
  position: relative;
}

.navmenu__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

  &:hover,
  &--open,
  &.router-link-active {
    color: var(--color-foreground);
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
  }
}

.navmenu__chevron {
  transition: transform 0.2s ease;
}

.navmenu__chevron--open {
  transform: rotate(180deg);
}

.navmenu__panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 260px;
  padding: 6px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.navmenu__link {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  text-align: left;
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover,
  &.router-link-active {
    background: var(--color-muted);
  }
}

.navmenu__link-label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-foreground);
}

.navmenu__link-desc {
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-muted-foreground);
}
</style>
