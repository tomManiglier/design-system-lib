import type { Directive } from 'vue';
import { gsap } from 'gsap';
import { prefersReducedMotion } from './reducedMotion';

// Directive v-gradient-flow : fait dériver lentement la position d'un dégradé de
// fond, façon lever de soleil ambiant. Réservé à l'expression de marque (héros,
// bandeaux signature), pas à du feedback d'interface. Pausable ; désactivé quand
// l'utilisateur préfère les animations réduites.
export interface GradientFlowOptions {
  duration?: number; // durée d'un aller (secondes) — lent par nature
  paused?: boolean;
}

const tweens = new WeakMap<HTMLElement, gsap.core.Tween>();

export const vGradientFlow: Directive<HTMLElement, GradientFlowOptions | undefined> = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return;
    const opts = binding.value ?? {};
    el.style.backgroundSize = '200% 200%';
    const tween = gsap.to(el, {
      backgroundPosition: '100% 50%',
      duration: opts.duration ?? 8,
      ease: 'none',
      repeat: -1,
      yoyo: true,
    });
    if (opts.paused) tween.pause();
    tweens.set(el, tween);
  },
  updated(el, binding) {
    const tween = tweens.get(el);
    if (!tween) return;
    if (binding.value?.paused) tween.pause();
    else tween.resume();
  },
  unmounted(el) {
    tweens.get(el)?.kill();
    tweens.delete(el);
  },
};
