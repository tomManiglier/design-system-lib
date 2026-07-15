<template>
  <textarea
    class="textarea"
    :rows="rows"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    rows?: number;
  }>(),
  { modelValue: '', rows: 4 },
);

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped lang="scss">
.textarea {
  width: 100%;
  min-height: 96px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--color-foreground);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  resize: vertical;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: var(--color-muted-foreground);
  }

  &:focus {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px rgba(0, 154, 223, 0.15);
  }
}
</style>
