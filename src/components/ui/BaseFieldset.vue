<template>
  <fieldset class="fieldset">
    <legend v-if="legend" class="fieldset__legend">{{ legend }}</legend>
    <p v-if="description" class="fieldset__desc">{{ description }}</p>
    <div class="fieldset__content">
      <slot />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  legend?: string;
  description?: string;
}>();
</script>

<style scoped lang="scss">
.fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  margin: 0;
  min-width: 0;
}

.fieldset__legend {
  font-family: var(--font-title);
  font-weight: var(--weight-bold);
  font-size: var(--text-base);
  padding: 0 8px;
  margin-left: -8px;
}

.fieldset__desc {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  margin: 0 0 16px;
}

.fieldset__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
