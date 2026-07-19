import type { Directive } from 'vue';
import { gsap } from 'gsap';
import { prefersReducedMotion } from './reducedMotion';
import { motionDuration, motionEase } from './tokens';

// Directive v-reveal : révèle un élément (ou ses enfants directs en cascade)
// quand il entre dans le viewport — fondu + légère montée, courbe expo.out.
// Rôle « orientation » : montrer d'où arrive le contenu, sans gêner la lecture.
export interface RevealOptions {
  y?: number; // décalage vertical de départ (px)
  duration?: number; // secondes
  stagger?: number; // si défini, anime les enfants directs en cascade
  once?: boolean; // rejouer à chaque entrée (défaut : une seule fois)
}

const observers = new WeakMap<HTMLElement, IntersectionObserver>();

function targetsOf(el: HTMLElement, opts: RevealOptions): HTMLElement[] {
  return opts.stagger != null ? (Array.from(el.children) as HTMLElement[]) : [el];
}

export const vReveal: Directive<HTMLElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    const opts = binding.value ?? {};
    const targets = targetsOf(el, opts);
    const y = opts.y ?? 12;
    const duration = opts.duration ?? motionDuration.slower;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'transform' });
      return;
    }

    gsap.set(targets, { opacity: 0, y });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration,
              ease: motionEase.out,
              stagger: opts.stagger ?? 0,
            });
            if (opts.once !== false) observer.unobserve(el);
          } else if (opts.once === false) {
            gsap.set(targets, { opacity: 0, y });
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    observers.set(el, observer);
  },
  unmounted(el) {
    observers.get(el)?.disconnect();
    observers.delete(el);
  },
};
