<template>
  <div
    ref="area"
    class="scroll-area"
    :class="{
      'scroll-area--fade-top': !atTop,
      'scroll-area--fade-bottom': !atBottom,
    }"
    :style="{ maxHeight: height + 'px' }"
    @scroll.passive="update"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

withDefaults(
  defineProps<{
    height?: number;
  }>(),
  { height: 240 },
);

const area = ref<HTMLElement | null>(null);
const atTop = ref(true);
const atBottom = ref(false);

function update() {
  const el = area.value;
  if (!el) return;
  atTop.value = el.scrollTop <= 1;
  atBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
}

onMounted(update);
</script>

<style scoped lang="scss">
.scroll-area {
  overflow-y: auto;
  width: 100%;
  // Fondu progressif en haut/bas selon la position de défilement
  --fade-top: 0px;
  --fade-bottom: 0px;
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--fade-top),
    #000 calc(100% - var(--fade-bottom)),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    #000 var(--fade-top),
    #000 calc(100% - var(--fade-bottom)),
    transparent 100%
  );
}

.scroll-area--fade-top {
  --fade-top: 32px;
}

.scroll-area--fade-bottom {
  --fade-bottom: 32px;
}
</style>
