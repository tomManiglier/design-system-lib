import { nextTick } from 'vue';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { prefersReducedMotion } from './reducedMotion';
import { motionDuration, motionEase } from './tokens';

gsap.registerPlugin(Flip);

// Composable useFlip : anime en douceur le repositionnement d'une liste quand son
// contenu change (filtrage, tri, réordonnancement). Rôle « continuité » : relier
// l'ancien et le nouvel arrangement. Impossible à faire proprement en CSS seul.
//
// Usage :
//   const { capture, play } = useFlip(() => container.value.children);
//   capture();              // avant de muter la donnée réactive
//   filtre.value = 'badges';
//   play();                 // after nextTick, anime vers le nouvel état
export function useFlip(getTargets: () => ArrayLike<Element>) {
  let state: Flip.FlipState | null = null;
  let container: HTMLElement | null = null;

  function capture() {
    if (prefersReducedMotion()) return;
    state = Flip.getState(getTargets());
    // Dérivé des cibles plutôt que passé explicitement : le conteneur est le
    // parent commun de tous les enfants animés (capturé avant la mutation,
    // donc toujours présent tant que la liste n'est pas vide).
    container = (getTargets()[0] as Element | undefined)?.parentElement ?? null;
  }

  async function play(): Promise<void> {
    if (prefersReducedMotion() || !state) return;
    await nextTick();

    // `absolute: true` sort les enfants du flux (position: absolute) le temps
    // de la transition. Sans ancrage, un conteneur non positionné laisse ses
    // enfants se replacer par rapport à un ancêtre plus haut dans l'arbre, et
    // sa hauteur s'effondre le temps de l'animation - ce qui fait sauter tout
    // ce qui suit dans la page. On fige la hauteur et on garantit un contexte
    // de positionnement, puis on relâche à la fin du flip.
    let release: (() => void) | null = null;
    if (container) {
      const el = container;
      if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
      }
      el.style.minHeight = `${el.getBoundingClientRect().height}px`;
      release = () => {
        el.style.minHeight = '';
      };
    }

    Flip.from(state, {
      duration: motionDuration.slow,
      ease: motionEase.inOut,
      absolute: true,
      stagger: 0.03,
      onEnter: (elements) =>
        gsap.fromTo(elements, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: motionDuration.base }),
      onLeave: (elements) =>
        gsap.to(elements, { opacity: 0, scale: 0.9, duration: motionDuration.base }),
      onComplete: release ?? undefined,
    });
    state = null;
    container = null;
  }

  return { capture, play };
}
