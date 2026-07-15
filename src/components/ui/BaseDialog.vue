<template>
  <teleport to="body">
    <transition name="dialog">
      <div v-if="modelValue" class="dialog">
        <div class="dialog__overlay" @click="close" />
        <div class="dialog__panel" role="dialog" aria-modal="true">
          <header v-if="title" class="dialog__header" :class="{ 'dialog__header--danger': variant === 'danger' }">
            <span v-if="variant === 'danger'" class="dialog__danger-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4M12 17h.01" />
              </svg>
            </span>
            <div>
              <h3 class="dialog__title">{{ title }}</h3>
              <p v-if="description" class="dialog__desc">{{ description }}</p>
            </div>
          </header>
          <div class="dialog__body">
            <slot />
          </div>
          <button class="dialog__close" type="button" aria-label="Fermer" @click="close">
            &times;
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    title?: string;
    description?: string;
    variant?: 'default' | 'danger';
  }>(),
  { variant: 'default' },
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

function close() {
  emit('update:modelValue', false);
}

// Fermeture au clavier (Échap)
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) close();
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.dialog__overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.5);
}

.dialog__panel {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 24px;
}

.dialog__header--danger {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.dialog__danger-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 36px;
  height: 36px;
  color: #b3261e;
  background: rgba(179, 38, 30, 0.1);
  border-radius: 50%;
}

.dialog__title {
  font-family: var(--font-title);
  font-weight: var(--weight-bold);
  font-size: var(--text-lg);
  margin: 0;
}

.dialog__desc {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  margin: 6px 0 0;
}

.dialog__body {
  margin-top: 16px;
  font-size: var(--text-sm);
  line-height: 1.6;
}

.dialog__close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 28px;
  height: 28px;
  font-size: 20px;
  line-height: 1;
  color: var(--color-muted-foreground);
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover {
    background: var(--color-muted);
    color: var(--color-foreground);
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}
</style>
