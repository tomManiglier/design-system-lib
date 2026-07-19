// Entrée publique du sous-chemin `@tommaniglier/design-system-lib/motion`.
//
// Couche d'animation optionnelle, bâtie sur GSAP et alignée sur les tokens de
// mouvement du design system. GSAP est une peer dependency *optionnelle* : les
// composants ne l'importent jamais, seul ce module la requiert. Tout respecte
// `prefers-reduced-motion` (saut direct à l'état final).
import type { App } from 'vue';
import { vReveal } from './motion/reveal';
import { vGradientFlow } from './motion/gradientFlow';
import { vCountUp } from './motion/countUp';

export { vReveal, type RevealOptions } from './motion/reveal';
export { vGradientFlow, type GradientFlowOptions } from './motion/gradientFlow';
export { vCountUp, type CountUpOptions } from './motion/countUp';
export { useFlip } from './motion/flip';
export { prefersReducedMotion } from './motion/reducedMotion';
export { motionDuration, motionEase } from './motion/tokens';

// Plugin Vue : enregistre les trois directives d'un coup (v-reveal, v-gradient-flow,
// v-count-up). Alternative à l'import local dans chaque composant.
export const MotionPlugin = {
  install(app: App) {
    app.directive('reveal', vReveal);
    app.directive('gradient-flow', vGradientFlow);
    app.directive('count-up', vCountUp);
  },
};
