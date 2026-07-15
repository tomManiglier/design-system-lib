<template>
  <div class="separator" :class="`separator--${orientation}`" role="separator" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical';
  }>(),
  { orientation: 'horizontal' },
);
</script>

<style scoped lang="scss">
.separator {
  background: var(--color-border);
  flex: none;
}

.separator--horizontal {
  width: 100%;
  height: 1px;
}

.separator--vertical {
  width: 1px;
  height: 16px;
}
</style>
