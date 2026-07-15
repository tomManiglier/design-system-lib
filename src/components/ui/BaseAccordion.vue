<template>
  <div class="accordion">
    <div v-for="(item, i) in items" :key="i" class="accordion__item">
      <button
        type="button"
        class="accordion__trigger"
        :aria-expanded="open === i"
        @click="toggle(i)"
      >
        <span class="accordion__title">{{ item.title }}</span>
        <svg
          class="accordion__chevron"
          :class="{ 'accordion__chevron--open': open === i }"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div v-show="open === i" class="accordion__content">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AccordionItem } from './types';

defineProps<{ items: AccordionItem[] }>();

const open = ref<number | null>(null);

function toggle(index: number) {
  open.value = open.value === index ? null : index;
}
</script>

<style scoped lang="scss">
.accordion__item {
  border-bottom: 1px solid var(--color-border);
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 18px 0;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-foreground);
  text-align: left;
  background: transparent;
  cursor: pointer;
}

.accordion__title {
  flex: 1;
}

.accordion__chevron {
  flex: none;
  color: var(--color-muted-foreground);
  transition: transform 0.2s ease;
}

.accordion__chevron--open {
  transform: rotate(180deg);
}

.accordion__content {
  padding: 0 0 18px;

  p {
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--color-muted-foreground);
    margin: 0;
    max-width: 90%;
  }
}
</style>
