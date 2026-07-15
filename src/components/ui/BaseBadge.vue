<template>
  <span :class="['badge', `badge--${variant}`]" :style="customStyle">
    <span v-if="$slots.icon" class="badge__icon"><slot name="icon" /></span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline';
    color?: string;
  }>(),
  { variant: 'primary' },
);

// Couleur personnalisée : fond teinté (12 %) + texte et bordure dans la couleur.
const customStyle = computed(() => {
  if (!props.color) return undefined;
  return {
    backgroundColor: `color-mix(in srgb, ${props.color} 12%, transparent)`,
    color: props.color,
    border: `1px solid color-mix(in srgb, ${props.color} 30%, transparent)`,
  };
});
</script>

<style scoped lang="scss">
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 10px;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  border-radius: 999px;
  white-space: nowrap;
}

.badge__icon {
  display: inline-flex;
  margin-left: -2px;
}

.badge--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
}

.badge--secondary {
  background-color: var(--color-muted);
  color: var(--color-foreground);
}

.badge--outline {
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
}
</style>
