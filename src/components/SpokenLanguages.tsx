import { spokenLanguages } from "@/content/toolkit";

/** Spoken languages with a five-step level indicator. */
export function SpokenLanguages() {
  return (
    <ul className="divide-y divide-line">
      {spokenLanguages.map((l) => (
        <li key={l.name} className="flex items-center justify-between gap-4 py-3">
          <span className="font-medium">{l.name}</span>
          <span className="flex items-center gap-3">
            <span className="text-sm text-muted">{l.label}</span>
            <span className="flex gap-1" aria-label={`${l.label}, level ${l.level} of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className={`h-1.5 w-5 rounded-full ${n <= l.level ? "bg-signal" : "bg-line-strong"}`} />
              ))}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
