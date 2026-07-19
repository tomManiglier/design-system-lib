<template>
  <nav class="breadcrumb" aria-label="Fil d'Ariane">
    <ol class="breadcrumb__list">
      <li v-for="(item, i) in items" :key="i" class="breadcrumb__item">
        <a
          v-if="linkTarget(item) && i < items.length - 1"
          class="breadcrumb__link"
          :href="linkTarget(item)"
        >
          {{ item.label }}
        </a>
        <span v-else class="breadcrumb__current" aria-current="page">{{ item.label }}</span>
        <span v-if="i < items.length - 1" class="breadcrumb__sep" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from './types';

defineProps<{ items: BreadcrumbItem[] }>();

function linkTarget(item: BreadcrumbItem) {
  return item.href ?? item.to;
}
</script>

<style scoped lang="scss">
.breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
}

.breadcrumb__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb__link {
  color: var(--color-muted-foreground);
  transition: color 0.12s ease;

  &:hover {
    color: var(--color-orange);
  }
}

.breadcrumb__current {
  color: var(--color-foreground);
  font-weight: var(--weight-medium);
}

.breadcrumb__sep {
  color: var(--color-border);
}
</style>
