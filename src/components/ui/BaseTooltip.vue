<template>
  <span class="tooltip">
    <slot />
    <span class="tooltip__content" role="tooltip">{{ content }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps<{ content: string }>();
</script>

<style scoped lang="scss">
.tooltip {
  position: relative;
  display: inline-flex;
}

.tooltip__content {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  // Bulle courte sur une ligne, mais plafonnée pour ne pas déborder les petits écrans
  width: max-content;
  max-width: min(240px, calc(100vw - 16px));
  text-align: center;
  font-size: var(--text-xs);
  color: var(--color-primary-foreground);
  background: var(--color-primary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.tooltip__content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--color-primary);
}

.tooltip:hover .tooltip__content,
.tooltip:focus-within .tooltip__content {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
