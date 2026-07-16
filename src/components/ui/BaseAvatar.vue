<template>
  <span class="avatar" :style="{ width: size + 'px', height: size + 'px' }">
    <span class="avatar__circle" :class="`avatar__circle--${variant}`">
      <img v-if="src" class="avatar__img" :src="src" :alt="alt" />
      <span v-else-if="$slots.icon" class="avatar__icon"><slot name="icon" /></span>
      <span v-else class="avatar__fallback" :style="{ fontSize: size / 2.9 + 'px' }">
        {{ initials }}
      </span>
    </span>
    <span
      v-if="status"
      class="avatar__status"
      :class="`avatar__status--${status}`"
      :style="{ width: size / 3.2 + 'px', height: size / 3.2 + 'px' }"
    />
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    initials?: string;
    size?: number;
    variant?: 'gradient' | 'muted' | 'dark';
    status?: 'online' | 'busy' | 'offline';
  }>(),
  { alt: '', initials: '?', size: 40, variant: 'gradient' },
);
</script>

<style scoped lang="scss">
.avatar {
  position: relative;
  display: inline-flex;
  flex: none;
}

.avatar__circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar__circle--gradient {
  color: #1a1a1a; // dégradé toujours pastel : texte foncé lisible sur tous les stops

  &::before {
    content: '';
    position: absolute;
    inset: -50%;
    background: var(--gradient-brand);
    animation: avatar-spin 6s linear infinite;
  }
}

.avatar__circle--muted {
  background: var(--color-muted);
  border: 1px solid var(--color-border);
  color: var(--color-foreground);

  .avatar__fallback {
    font-family: var(--font-body);
    font-weight: var(--weight-medium);
  }
}

.avatar__circle--dark {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}

@media (prefers-reduced-motion: reduce) {
  .avatar__circle--gradient::before {
    animation: none;
  }
}

@keyframes avatar-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.avatar__img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar__icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
}

.avatar__fallback {
  position: relative;
  z-index: 1;
  font-family: var(--font-title);
  font-weight: var(--weight-bold);
  line-height: 1;
  user-select: none;
}

.avatar__status {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  border-radius: 50%;
  border: 2px solid var(--color-background);
}

.avatar__status--online {
  background: #22c55e;
}

.avatar__status--busy {
  background: #ef4444;
}

.avatar__status--offline {
  background: var(--color-muted-foreground);
}
</style>
