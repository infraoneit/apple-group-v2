'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const SPEICHER_SCHLUESSEL = 'theme';

/**
 * Umschalter zwischen dem dunklen Standardmodus (Vitrine) und einem hellen Modus.
 * Setzt data-theme="light" auf <html>, das GegenteVerhalten (kein Attribut) ist Dunkel.
 * Die Wahl wird in localStorage gemerkt. Das Verhindern des Farb-Blitzes beim Laden
 * übernimmt ein kleines Inline-Skript in src/app/layout.tsx, bevor React startet.
 */
export function ThemeUmschalter({ className }: { className?: string }) {
  const [hell, setHell] = useState(false);
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    const pruefen = () => {
      setHell(document.documentElement.dataset.theme === 'light');
      setBereit(true);
    };
    pruefen();
  }, []);

  function umschalten() {
    const neuHell = !hell;
    setHell(neuHell);
    if (neuHell) {
      document.documentElement.dataset.theme = 'light';
      window.localStorage.setItem(SPEICHER_SCHLUESSEL, 'light');
    } else {
      delete document.documentElement.dataset.theme;
      window.localStorage.setItem(SPEICHER_SCHLUESSEL, 'dark');
    }
  }

  return (
    <button
      type="button"
      onClick={umschalten}
      aria-pressed={hell}
      aria-label={hell ? 'Helle Ansicht aktiv, zur dunklen Ansicht wechseln' : 'Dunkle Ansicht aktiv, zur hellen Ansicht wechseln'}
      className={className ? className : 'inline-flex size-11 items-center justify-center rounded-md hover:text-akzent'}
    >
      {/* Vor der Hydration (bereit=false) zeigt der Knopf das Mondsymbol, passend zum Standard "dunkel". */}
      {!bereit || !hell ? <Moon className="size-5" aria-hidden /> : <Sun className="size-5" aria-hidden />}
    </button>
  );
}
