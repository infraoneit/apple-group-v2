import type { ReactNode } from 'react';

const VERWEIS = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)/g;

/**
 * Wandelt Verweise in der Schreibweise [Text](Adresse) aus einfachen Textfeldern in Links um.
 * Externe Adressen öffnen in einem neuen Tab. Alles andere bleibt Text.
 */
export function mitVerweisen(text: string): ReactNode[] {
  const teile: ReactNode[] = [];
  let letztes = 0;
  for (const treffer of text.matchAll(VERWEIS)) {
    const [ganz, beschriftung, adresse] = treffer;
    const start = treffer.index ?? 0;
    if (start > letztes) teile.push(text.slice(letztes, start));
    const extern = adresse.startsWith('http');
    teile.push(
      <a
        key={start}
        href={adresse}
        className="font-medium text-akzent underline underline-offset-4 hover:text-akzent-dunkel"
        {...(extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {beschriftung}
      </a>
    );
    letztes = start + ganz.length;
  }
  if (letztes < text.length) teile.push(text.slice(letztes));
  return teile;
}
