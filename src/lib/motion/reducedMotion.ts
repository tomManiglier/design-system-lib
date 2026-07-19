// Respect de la préférence système « animations réduites ».
// Toutes les aides de ce module l'interrogent : quand elle est active, on saute
// directement à l'état final au lieu d'animer.
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
