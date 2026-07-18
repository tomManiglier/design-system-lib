<template>
  <div class="field" :class="{ 'field--error': !!error }">
    <label v-if="label" class="field__label">
      {{ label }}
      <span v-if="required" class="field__required" aria-hidden="true">*</span>
    </label>
    <slot />
    <p v-if="error" class="field__error" role="alert">{{ error }}</p>
    <p v-else-if="hint" class="field__hint">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}>();
</script>

<style scoped lang="scss">
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.field__label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-foreground);
}

.field__required {
  color: var(--color-danger);
}

.field__hint {
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
  margin: 0;
}

.field__error {
  font-size: var(--text-xs);
  color: var(--color-danger);
  margin: 0;
}
</style>
