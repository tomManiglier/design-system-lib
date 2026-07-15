<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="drawer" @click.self="close">
        <div class="drawer__panel" role="dialog" aria-modal="true" :aria-label="title">
          <div class="drawer__header">
            <p v-if="title" class="drawer__title">{{ title }}</p>
            <button type="button" class="drawer__close" aria-label="Fermer" @click="close">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="drawer__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

const props = defineProps<{
  modelValue: boolean;
  title?: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

function close() {
  emit('update:modelValue', false);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.modelValue) close();
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<style scoped lang="scss">
.drawer {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(26, 26, 26, 0.5);
  display: flex;
  justify-content: flex-end;
}

.drawer__panel {
  display: flex;
  flex-direction: column;
  width: 380px;
  max-width: 90vw;
  height: 100%;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--color-border);
}

.drawer__title {
  font-family: var(--font-title);
  font-weight: var(--weight-bold);
  font-size: var(--text-base);
  margin: 0;
}

.drawer__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--color-muted-foreground);
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover {
    color: var(--color-foreground);
    background: var(--color-muted);
  }
}

.drawer__body {
  padding: 20px;
  overflow-y: auto;
  font-size: var(--text-sm);
  line-height: 1.6;
}

// Transitions : fondu du voile + glissement du panneau
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;

  .drawer__panel {
    transition: transform 0.25s ease;
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .drawer__panel {
    transform: translateX(100%);
  }
}
</style>
