import { nextTick, onBeforeUnmount, onMounted, watch, type Ref } from 'vue';

// Comportements communs aux surfaces modales (Dialog, Drawer) :
// - Échap ferme ;
// - le scroll de la page est gelé tant que la surface est ouverte ;
// - le focus entre dans le panneau à l'ouverture, y reste (piège Tab),
//   puis revient à l'élément déclencheur à la fermeture.
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useModalA11y(
  isOpen: () => boolean,
  panel: Ref<HTMLElement | null>,
  close: () => void,
) {
  let previouslyFocused: HTMLElement | null = null;

  function trapTab(event: KeyboardEvent) {
    if (!panel.value) return;
    const focusables = Array.from(panel.value.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!focusables.length) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !panel.value.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onKeydown(event: KeyboardEvent) {
    if (!isOpen()) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'Tab') trapTab(event);
  }

  watch(isOpen, (open) => {
    if (open) {
      previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      nextTick(() => panel.value?.focus());
    } else {
      document.body.style.overflow = '';
      previouslyFocused?.focus();
      previouslyFocused = null;
    }
  });

  onMounted(() => document.addEventListener('keydown', onKeydown));

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown);
    if (isOpen()) document.body.style.overflow = '';
  });
}
