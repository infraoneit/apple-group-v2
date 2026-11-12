import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { sauberText } from '@/lib/text';

export type Pfadpunkt = { text: string; href: string };

/**
 * Sichtbare Brotkrumen "Startseite > Seite". Die Startseite wird automatisch vorangestellt.
 * Die strukturierten Daten (BreadcrumbList) setzt die jeweilige Seite selbst.
 * `hell`: für die dunkle Vitrinen-Fläche des Startbereichs.
 */
export function Brotkrumen({ pfad, hell = false, className }: { pfad: Pfadpunkt[]; hell?: boolean; className?: string }) {
  const alle = [{ text: 'Startseite', href: '/' }, ...pfad];
  return (
    <nav aria-label="Brotkrumen" className={className}>
      <ol className={cn('flex flex-wrap items-center gap-1 text-sm', hell ? 'text-text-hell-leise' : 'text-text-leise')}>
        {alle.map((p, i) => (
          <li key={p.href} className="flex items-center gap-1">
            {i > 0 ? <ChevronRight className="size-4" aria-hidden /> : null}
            {i < alle.length - 1 ? (
              <Link href={p.href} className={hell ? 'hover:text-gold' : 'hover:text-akzent'}>
                {sauberText(p.text)}
              </Link>
            ) : (
              <span aria-current="page">{sauberText(p.text)}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
