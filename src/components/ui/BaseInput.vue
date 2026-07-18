<template>
  <div
    class="input-wrap"
    :class="{
      'input-wrap--icon': !!$slots.icon,
      'input-wrap--trailing': isPassword || clearable,
    }"
  >
    <span v-if="$slots.icon" class="input-icon"><slot name="icon" /></span>
    <input
      class="input"
      :type="resolvedType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="isPassword"
      type="button"
      class="input-action"
      :aria-label="revealed ? 'Masquer le mot de passe' : 'Afficher le mot de passe'"
      @click="revealed = !revealed"
    >
      <svg
        v-if="!revealed"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </svg>
    </button>
    <button
      v-else-if="clearable && modelValue"
      type="button"
      class="input-action"
      aria-label="Effacer"
      @click="$emit('update:modelValue', '')"
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: string;
    placeholder?: string;
    modelValue?: string;
    clearable?: boolean;
  }>(),
  { type: 'text', modelValue: '', clearable: false },
);

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const revealed = ref(false);
const isPassword = computed(() => props.type === 'password');
const resolvedType = computed(() =>
  isPassword.value ? (revealed.value ? 'text' : 'password') : props.type,
);
</script>

<style scoped lang="scss">
.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  display: flex;
  color: var(--color-muted-foreground);
  pointer-events: none;
}

.input-wrap--icon .input {
  padding-left: 36px;
}

.input-wrap--trailing .input {
  padding-right: 36px;
}

.input-action {
  position: absolute;
  right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  color: var(--color-muted-foreground);
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    color 0.12s ease,
    background 0.12s ease;

  &:hover {
    color: var(--color-foreground);
    background: var(--color-muted);
  }
}

.input {
  height: 36px;
  width: 100%;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-foreground);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0 12px;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &::placeholder {
    color: var(--color-muted-foreground);
  }

  &:focus {
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 18%, transparent);
  }
}
</style>
