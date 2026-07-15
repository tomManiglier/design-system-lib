<template>
  <div class="card">
    <div v-if="$slots.header || title" class="card__header">
      <slot name="header">
        <h3 class="card__title">{{ title }}</h3>
        <p v-if="description" class="card__desc">{{ description }}</p>
      </slot>
    </div>
    <div class="card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.card__header {
  padding: 20px 20px 0;
}

.card__title {
  font-family: var(--font-title);
  font-weight: var(--weight-bold);
  font-size: var(--text-lg);
  margin: 0;
}

.card__desc {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  margin: 6px 0 0;
}

.card__body {
  padding: 20px;
}

.card__footer {
  display: flex;
  gap: 8px;
  padding: 0 20px 20px;
}
</style>
