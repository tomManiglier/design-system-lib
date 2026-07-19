// Miroir des tokens de mouvement (styles/tokens/_motion.scss), exprimés pour GSAP :
// durées en secondes, courbes traduites en eases GSAP équivalents.
// Garder les deux fichiers alignés — c'est ici la seule duplication assumée.
export const motionDuration = {
  fast: 0.15, // --duration-fast
  base: 0.2, // --duration-base
  slow: 0.3, // --duration-slow
  slower: 0.4, // --duration-slower
} as const;

export const motionEase = {
  // --ease-out-expo cubic-bezier(0.22, 1, 0.36, 1) ≈ expo.out
  out: 'expo.out',
  // --ease-in-out cubic-bezier(0.4, 0, 0.2, 1) ≈ power2.inOut
  inOut: 'power2.inOut',
  // --ease-standard (ease) ≈ power1.out
  standard: 'power1.out',
} as const;
