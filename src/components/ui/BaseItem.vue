<template>
  <div class="item">
    <span v-if="$slots.media" class="item__media"><slot name="media" /></span>
    <div class="item__content">
      <p class="item__title">{{ title }}</p>
      <p v-if="description" class="item__desc">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="item__actions"><slot name="actions" /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<style scoped lang="scss">
.item {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.item__media {
  display: inline-flex;
  flex: none;
  color: var(--color-muted-foreground);
}

.item__content {
  flex: 1;
  min-width: 0;
}

.item__title {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-foreground);
  margin: 0;
}

.item__desc {
  font-size: var(--text-xs);
  line-height: 1.5;
  color: var(--color-muted-foreground);
  margin: 2px 0 0;
}

.item__actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: none;
}
</style>
