<template>
  <div class="carousel" :style="{ '--per-view': perView }">
    <div ref="track" class="carousel__track" @scroll.passive="onScroll">
      <slot />
    </div>

    <div class="carousel__controls">
      <button
        type="button"
        class="carousel__btn"
        :disabled="index <= 0"
        aria-label="Diapositive précédente"
        @click="go(index - 1)"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div class="carousel__dots">
        <button
          v-for="i in count"
          :key="i"
          type="button"
          class="carousel__dot"
          :class="{ 'carousel__dot--active': i - 1 === index }"
          :aria-label="`Aller à la diapositive ${i}`"
          @click="go(i - 1)"
        />
      </div>
      <button
        type="button"
        class="carousel__btn"
        :disabled="index >= count - 1"
        aria-label="Diapositive suivante"
        @click="go(index + 1)"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    perView?: number;
  }>(),
  { perView: 1 },
);

const track = ref<HTMLElement | null>(null);
const index = ref(0);
const slideCount = ref(0);

// Nombre de positions atteignables (la dernière page montre les perView derniers items)
const count = computed(() => Math.max(1, slideCount.value - props.perView + 1));

function slideWidth() {
  const el = track.value;
  return el ? el.clientWidth / props.perView : 0;
}

function go(target: number) {
  const el = track.value;
  if (!el) return;
  const clamped = Math.max(0, Math.min(target, count.value - 1));
  el.scrollTo({ left: clamped * slideWidth(), behavior: 'smooth' });
}

function onScroll() {
  const el = track.value;
  if (!el) return;
  index.value = Math.round(el.scrollLeft / slideWidth());
}

onMounted(() => {
  slideCount.value = track.value?.children.length ?? 0;
});
</script>

<style scoped lang="scss">
.carousel {
  width: 100%;
}

.carousel__track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  border-radius: var(--radius-md);

  &::-webkit-scrollbar {
    display: none;
  }

  > :deep(*) {
    flex: none;
    width: calc(100% / var(--per-view, 1));
    scroll-snap-align: start;
  }
}

.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 12px;
}

.carousel__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: var(--color-foreground);
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover:not(:disabled) {
    background: var(--color-muted);
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
}

.carousel__dots {
  display: flex;
  gap: 6px;
}

.carousel__dot {
  width: 7px;
  height: 7px;
  padding: 0;
  background: var(--color-border);
  border-radius: 50%;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}

.carousel__dot--active {
  background: var(--color-brand-primary);
  transform: scale(1.25);
}
</style>
