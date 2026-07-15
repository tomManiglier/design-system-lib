<template>
  <button :class="['btn', `btn--${variant}`, { 'btn--icon-only': iconOnly }]">
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?:
      | 'primary'
      | 'secondary'
      | 'outline'
      | 'brand'
      | 'brand-outline'
      | 'gradient'
      | 'link'
      | 'link-black'
      | 'destructive'
      | 'destructive-outline';
    iconOnly?: boolean;
  }>(),
  { variant: 'primary', iconOnly: false },
);
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 16px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.btn:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

.btn--primary {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);

  &:hover {
    background-color: var(--color-primary-hover);
  }
}

.btn--secondary {
  background-color: var(--color-muted);
  color: var(--color-foreground);

  &:hover {
    background-color: var(--color-border);
  }
}

.btn--outline {
  background-color: transparent;
  color: var(--color-foreground);
  border: 1px solid var(--color-border);

  &:hover {
    background-color: var(--color-muted);
  }
}

.btn--brand {
  background-color: var(--color-brand-primary);
  color: #ffffff;

  &:hover {
    background-color: var(--color-brand-secondary);
  }
}

.btn--brand-outline {
  background-color: transparent;
  color: var(--color-brand-primary);
  border: 1px solid var(--color-brand-primary);

  &:hover {
    background-color: rgba(0, 154, 223, 0.08);
  }
}

.btn--gradient {
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: var(--gradient-brand);
  color: #ffffff;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(225deg, #009adf 0%, #7c2c7e 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
}

// Liens : soulignement animé qui entre par la gauche et sort par la droite
.btn--link,
.btn--link-black {
  position: relative;
  height: auto;
  padding: 0;
  background: transparent;
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -3px;
    height: 1px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
}

.btn--link {
  color: var(--color-brand-primary);
}

// Lien noir : trait visible par défaut, il sort par la droite au survol
.btn--link-black {
  color: var(--color-foreground);

  &::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  &:hover::after {
    transform: scaleX(0);
    transform-origin: right;
  }
}

.btn--icon-only {
  width: 36px;
  padding: 0;
}

.btn--destructive {
  background-color: #b3261e;
  color: #ffffff;

  &:hover {
    background-color: #8f1e18;
  }
}

.btn--destructive-outline {
  background-color: transparent;
  color: #b3261e;
  border: 1px solid #b3261e;

  &:hover {
    background-color: rgba(179, 38, 30, 0.08);
  }
}
</style>
