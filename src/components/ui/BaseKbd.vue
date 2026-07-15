<template>
  <kbd class="kbd"><slot /></kbd>
</template>

<style scoped lang="scss">
.kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: var(--weight-medium);
  color: var(--color-muted-foreground);
  background: var(--color-muted);
  border: 1px solid var(--color-border);
  border-bottom-width: 2px;
  border-radius: 5px;
}
</style>
