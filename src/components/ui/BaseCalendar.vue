<template>
  <div class="calendar">
    <div class="calendar__header">
      <button type="button" class="calendar__nav" aria-label="Mois précédent" @click="prevMonth">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span class="calendar__month">{{ monthLabel }}</span>
      <button type="button" class="calendar__nav" aria-label="Mois suivant" @click="nextMonth">
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>

    <div class="calendar__grid">
      <span v-for="day in dayNames" :key="day" class="calendar__dayname">{{ day }}</span>
      <button
        v-for="cell in cells"
        :key="cell.iso"
        type="button"
        class="calendar__day"
        :class="{
          'calendar__day--outside': !cell.inMonth,
          'calendar__day--today': cell.isToday,
          'calendar__day--selected': cell.iso === modelValue,
        }"
        @click="$emit('update:modelValue', cell.iso)"
      >
        {{ cell.day }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue?: string; // format ISO 'YYYY-MM-DD'
}>();

defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const dayNames = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];

const initial = props.modelValue ? new Date(props.modelValue) : new Date();
const viewYear = ref(initial.getFullYear());
const viewMonth = ref(initial.getMonth());

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
  }),
);

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const cells = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1);
  // Lundi = début de semaine (getDay : dimanche = 0)
  const offset = (first.getDay() + 6) % 7;
  const start = new Date(viewYear.value, viewMonth.value, 1 - offset);
  const todayIso = toIso(new Date());

  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const iso = toIso(date);
    return {
      iso,
      day: date.getDate(),
      inMonth: date.getMonth() === viewMonth.value,
      isToday: iso === todayIso,
    };
  });
});

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value -= 1;
  } else {
    viewMonth.value -= 1;
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value += 1;
  } else {
    viewMonth.value += 1;
  }
}
</script>

<style scoped lang="scss">
.calendar {
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.calendar__month {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-transform: capitalize;
}

.calendar__nav {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--color-foreground);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;

  &:hover {
    background: var(--color-muted);
  }
}

.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 34px);
  gap: 2px;
}

.calendar__dayname {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  font-size: var(--text-xs);
  color: var(--color-muted-foreground);
}

.calendar__day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  font-size: var(--text-sm);
  color: var(--color-foreground);
  background: transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: var(--color-muted);
  }
}

.calendar__day--outside {
  color: var(--color-muted-foreground);
  opacity: 0.5;
}

.calendar__day--today {
  font-weight: var(--weight-bold);
  color: var(--color-brand-primary);
}

.calendar__day--selected {
  background: var(--color-primary);
  color: var(--color-primary-foreground);

  &:hover {
    background: var(--color-primary-hover);
  }
}
</style>
