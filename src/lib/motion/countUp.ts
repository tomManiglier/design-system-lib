import type { Directive } from 'vue';
import { gsap } from 'gsap';
import { prefersReducedMotion } from './reducedMotion';
import { motionEase } from './tokens';

// Directive v-count-up : incrémente un nombre de 0 jusqu'à la valeur cible quand
// l'élément entre dans le viewport. Rôle « feedback » : rendre une donnée chiffrée
// tangible. Réglages optionnels via un objet ; nombre seul accepté en raccourci.
export interface CountUpOptions {
  to: number;
  duration?: number; // secondes
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

function normalize(value: CountUpOptions | number): CountUpOptions {
  return typeof value === 'number' ? { to: value } : value;
}

export const vCountUp: Directive<HTMLElement, CountUpOptions | number> = {
  mounted(el, binding) {
    const opts = normalize(binding.value);
    const decimals = opts.decimals ?? 0;
    const format = (v: number) =>
      `${opts.prefix ?? ''}${v.toFixed(decimals)}${opts.suffix ?? ''}`;

    if (prefersReducedMotion()) {
      el.textContent = format(opts.to);
      return;
    }

    el.textContent = format(0);
    const state = { value: 0 };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          gsap.to(state, {
            value: opts.to,
            duration: opts.duration ?? 1.2,
            ease: motionEase.out,
            onUpdate: () => {
              el.textContent = format(state.value);
            },
          });
          obs.disconnect();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    observers.set(el, observer);
  },
  unmounted(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};
