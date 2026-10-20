import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { sauberText } from '@/lib/text';

type Props = {
  ueberzeile?: string;
  titel: string;
  text?: string;
  link?: { text: string; href: string };
  hell?: boolean;
  className?: string;
};

/** Einheitlicher Kopf für alle Abschnitte: Überzeile, H2, Einleitung und optional Link rechts. */
export function AbschnittKopf({ ueberzeile, titel, text, link, hell, className }: Props) {
  return (
    <div data-einblenden className={cn('mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between', className)}>
      <div className="max-w-4xl">
        {ueberzeile ? <p className={hell ? 'vitrine-plakette' : 'ueberzeile'}>{sauberText(ueberzeile)}</p> : null}
        <h2 className="titel-2">{sauberText(titel)}</h2>
        {text ? <p className={cn('einleitung lesebreite mt-5', hell && 'text-text-hell-leise')}>{sauberText(text)}</p> : null}
      </div>
      {link ? (
        <Link href={link.href} className={cn('group inline-flex shrink-0 items-center gap-2 font-semibold', hell ? 'text-text-hell hover:text-gold' : 'hover:text-akzent')}>
          {link.text}
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}
