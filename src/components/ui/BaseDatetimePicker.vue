<template>
  <div ref="root" class="dtp">
    <button type="button" class="dtp__trigger" :aria-expanded="open" @click="open = !open">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      <span :class="{ 'dtp__placeholder': !modelValue }">{{ display }}</span>
    </button>

    <div v-if="open" class="dtp__panel">
      <BaseCalendar :model-value="datePart" @update:model-value="onDate" />
      <div class="dtp__time">
        <label class="dtp__time-label">Heure</label>
        <select class="dtp__select" :value="hourPart" @change="onHour($event)">
          <option v-for="h in 24" :key="h" :value="String(h - 1).padStart(2, '0')">
            {{ String(h - 1).padStart(2, '0') }}
          </option>
        </select>
        <span class="dtp__colon">:</span>
        <select class="dtp__select" :value="minutePart" @change="onMinute($event)">
          <option v-for="m in 12" :key="m" :value="String((m - 1) * 5).padStart(2, '0')">
            {{ String((m - 1) * 5).padStart(2, '0') }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import BaseCalendar from './BaseCalendar.vue';

const props = defineProps<{
  modelValue?: string; // format 'YYYY-MM-DDTHH:mm'
  placeholder?: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

const datePart = computed(() => props.modelValue?.slice(0, 10) ?? '');
const hourPart = computed(() => props.modelValue?.slice(11, 13) || '09');
const minutePart = computed(() => props.modelValue?.slice(14, 16) || '00');

const display = computed(() => {
  if (!props.modelValue) return props.placeholder ?? 'Choisir une date et une heure';
  const date = new Date(props.modelValue);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) + ` à ${hourPart.value}:${minutePart.value}`;
});

function commit(date: string, hour: string, minute: string) {
  if (!date) return;
  emit('update:modelValue', `${date}T${hour}:${minute}`);
}

function onDate(value: string) {
  commit(value, hourPart.value, minutePart.value);
}

function onHour(event: Event) {
  commit(datePart.value || todayIso(), (event.target as HTMLSelectElement).value, minutePart.value);
}

function onMinute(event: Event) {
  commit(datePart.value || todayIso(), hourPart.value, (event.target as HTMLSelectElement).value);
}

function todayIso() {
  const now = new Date();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${m}-${d}`;
}

function onClickOutside(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    open.value = false;
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false;
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside);
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped lang="scss">
.dtp {
  position: relative;
  display: inline-block;
}

.dtp__trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus-visible {
    // Déclencheur stylé comme un champ : indicateur bordure + halo, sans l'outline global
    outline: none;
    border-color: var(--color-ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-ring) 18%, transparent);
  }
}

.dtp__placeholder {
  color: var(--color-muted-foreground);
}

.dtp__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.dtp__time {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px 4px;
}

.dtp__time-label {
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
  margin-right: auto;
}

.dtp__select {
  height: 32px;
  padding: 0 8px;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.dtp__colon {
  color: var(--color-muted-foreground);
}
</style>
