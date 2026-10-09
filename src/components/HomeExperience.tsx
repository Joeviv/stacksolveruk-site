// File: src/components/HomeExperience.tsx
// Home page that builds itself from the visitor's choices: area → what is happening → starting point.
// One choice per question (a new click replaces the old one). Runs in the browser: no AI, no network calls.
// The six area boxes shrink as the page scrolls and become a compact bar under the navigation.
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowPathIcon, ArrowRightIcon, CheckIcon, ExclamationTriangleIcon, InformationCircleIcon,
} from '@heroicons/react/24/outline';
import ServiceArt from './ServiceArt';
import { AREA_ICON } from './areaIcons';
import {
  AREAS, NEEDS, SIZES, SECTORS, EU, MOTIF_BY_AREA, MOTIF_BY_SERVICE, rankServices, contactTopic, servicesForArea,
  type Answers, type Choice, type GuideService,
} from '../data/serviceGuide';

type Props = { services: GuideService[] };

// Navigation (64 px) + compact bar + breathing room.
const OFFSET = 140;

function scrollToEl(el: HTMLElement | null, offset = OFFSET) {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: reduce ? 'auto' : 'smooth' });
}

const eyebrow = 'text-xs font-mono uppercase tracking-widest text-olive-600 dark:text-olive-400';
const gridBg =
  '[background-image:linear-gradient(to_right,rgb(133_160_58/0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgb(133_160_58/0.16)_1px,transparent_1px)] [background-size:22px_22px]';
const smallChip =
  'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500';

function ChipGroup({ label, options, value, onPick }: { label: string; options: Choice[]; value?: string; onPick: (id: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={label}>
      <span className="mr-1 text-xs font-mono uppercase tracking-widest text-zinc-500">{label}</span>
      {options.map((o) => {
        const on = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(o.id)}
            className={`${smallChip} ${on ? 'border-olive-500 bg-olive-500 text-zinc-900 font-semibold' : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-olive-500'}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export default function HomeExperience({ services }: Props) {
  const [a, setA] = useState<Answers>({});
  const [openDef, setOpenDef] = useState<string | null>(null);
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [compact, setCompact] = useState(false);
  const boxesRef = useRef<HTMLDivElement>(null);
  const needsRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const pending = useRef<'needs' | 'results' | null>(null);

  const byId = new Map(services.map((s) => [s.id, s]));
  const area = AREAS.find((x) => x.id === a.area);
  const need = NEEDS.find((n) => n.id === a.need);
  const results = rankServices(a, services);
  const signature = `${a.need}|${results.map((r) => r.service.id).join('|')}`;
  const overview = area ? servicesForArea(area.id).map((id) => byId.get(id)).filter((s): s is GuideService => Boolean(s)) : [];
  const more = overview.filter((s) => !results.some((r) => r.service.id === s.id));
  const urgentIncident = Boolean(a.urgent && a.need === 'incident');
  const AreaIcon = area ? AREA_ICON[area.id] : null;

  // The boxes shrink and fade as they scroll away; once they are gone, the compact bar takes over.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = boxesRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (96 - r.top) / Math.max(1, r.height)));
        el.style.setProperty('--shrink', p.toFixed(3));
        setCompact(r.bottom < 80);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // Every choice is a decision: bring the next part of the page into view.
  useEffect(() => {
    const target = pending.current;
    pending.current = null;
    if (target === 'needs') scrollToEl(needsRef.current);
    if (target === 'results') scrollToEl(resultsRef.current);
  });

  // Let the static sections below follow the chosen area.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('guide:area', { detail: a.area ?? null }));
  }, [a.area]);

  const chooseArea = (id: string) => {
    pending.current = 'needs';
    setOpenDef(null);
    setOpenInfo(null);
    setStep(0);
    setA((prev) => ({ ...prev, area: id, need: prev.area === id ? prev.need : undefined }));
  };

  const chooseNeed = (id: string) => {
    pending.current = 'results';
    setOpenInfo(null);
    setStep(0);
    setA((prev) => ({ ...prev, need: id }));
  };

  const tailor = (key: 'size' | 'sector' | 'eu', id: string) =>
    setA((prev) => ({ ...prev, [key]: prev[key] === id ? undefined : id }));

  const restart = () => {
    setA({});
    setOpenDef(null);
    setOpenInfo(null);
    scrollToEl(boxesRef.current, 200);
  };

  return (
    <div className="relative">
      {/* Compact bar: the six boxes, small, under the navigation */}
      <div
        aria-hidden={!compact}
        className={`fixed inset-x-0 top-16 z-40 px-3 sm:px-4 transition-all duration-300 ${compact ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-3'}`}
      >
        <div className="mx-auto mt-2 flex max-w-6xl items-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 px-2 py-2 shadow-lg shadow-black/10 backdrop-blur">
          <div className="flex items-center gap-1 overflow-x-auto">
            {AREAS.map((ar) => {
              const Icon = AREA_ICON[ar.id];
              const on = a.area === ar.id;
              return (
                <button
                  key={ar.id}
                  type="button"
                  tabIndex={compact ? 0 : -1}
                  aria-pressed={on}
                  aria-label={ar.label}
                  onClick={() => chooseArea(ar.id)}
                  className={`flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${on ? 'bg-olive-500 text-zinc-900 font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'}`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  <span className="hidden md:inline">{ar.label}</span>
                </button>
              );
            })}
          </div>
          {results[0] && (
            <button
              type="button"
              tabIndex={compact ? 0 : -1}
              onClick={() => scrollToEl(resultsRef.current)}
              className="ml-auto hidden sm:inline-flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-sm text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              <span className="text-zinc-500">Start here:</span>
              <strong key={signature} className="truncate font-semibold motion-safe:animate-guide-in">{results[0].service.title}</strong>
              <ArrowRightIcon className="h-4 w-4 flex-shrink-0" aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Hero: the question and the six boxes */}
      <section className="relative overflow-hidden bg-white dark:bg-black">
        <div aria-hidden className={`pointer-events-none absolute inset-0 opacity-60 ${gridBg} [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,black,transparent)]`} />
        <div aria-hidden className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-olive-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-14 lg:px-8 lg:pt-20">
          <p className={eyebrow}>StackSolver UK</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-6xl">What do you need to solve?</h1>
          <p className="mt-3 text-lg text-zinc-500">Pick one. The page builds around it.</p>

          <div
            ref={boxesRef}
            style={{ transform: 'scale(calc(1 - var(--shrink, 0) * 0.1))', opacity: 'calc(1 - var(--shrink, 0) * 0.7)' }}
            className="mt-10 grid origin-top grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 motion-reduce:!transform-none"
          >
            {AREAS.map((ar) => {
              const on = a.area === ar.id;
              const dim = Boolean(a.area) && !on;
              return (
                <button
                  key={ar.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => chooseArea(ar.id)}
                  className={`group relative h-36 overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500 sm:h-44 sm:p-6 lg:h-52 ${on ? 'border-olive-500 bg-olive-500/10 ring-2 ring-olive-500/60 shadow-[0_0_56px_-14px_rgba(133,160,58,0.75)]' : 'border-zinc-200 bg-zinc-50/80 hover:-translate-y-1 hover:border-olive-500/70 dark:border-zinc-800 dark:bg-zinc-950/80'} ${dim ? 'opacity-50 hover:opacity-100' : ''}`}
                >
                  <ServiceArt
                    motif={MOTIF_BY_AREA[ar.id]}
                    seedKey={`h-${ar.id}`}
                    className={`pointer-events-none absolute -right-6 -top-3 h-[118%] w-[88%] text-olive-600 transition-opacity duration-300 dark:text-olive-400 [mask-image:radial-gradient(ellipse_70%_80%_at_65%_45%,black_40%,transparent_78%)] ${on ? 'opacity-100' : 'opacity-50 group-hover:opacity-90'}`}
                  />
                  {on && (
                    <span className="absolute right-4 top-4 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-olive-500 text-zinc-900">
                      <CheckIcon className="h-4 w-4" aria-hidden />
                    </span>
                  )}
                  <span className="absolute bottom-4 left-5 right-5 z-10 sm:bottom-5">
                    <span className="block text-lg font-bold leading-tight text-zinc-900 dark:text-white sm:text-2xl">{ar.label}</span>
                    <span className="mt-1 hidden text-sm text-zinc-500 sm:block">{ar.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is happening: one choice */}
      {area && (
        <section ref={needsRef} key={area.id} className="relative border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
            <div className="flex items-center gap-3 motion-safe:animate-guide-in">
              {AreaIcon && <AreaIcon className="h-7 w-7 text-olive-600 dark:text-olive-400" aria-hidden />}
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">{area.label}: what is happening?</h2>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {NEEDS.filter((n) => n.area === area.id).map((n, i) => {
                const on = a.need === n.id;
                return (
                  <div
                    key={n.id}
                    style={{ animationDelay: `${i * 50}ms` }}
                    className={`relative rounded-xl border transition-all duration-200 motion-safe:animate-guide-in ${on ? 'border-olive-500 bg-olive-500/10 ring-2 ring-olive-500/50' : 'border-zinc-200 bg-white hover:-translate-y-0.5 hover:border-olive-500/70 dark:border-zinc-800 dark:bg-black'}`}
                  >
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => chooseNeed(n.id)}
                      className="flex w-full items-start gap-3 rounded-xl px-4 py-4 pr-12 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-olive-500"
                    >
                      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${on ? 'border-olive-500 bg-olive-500' : 'border-zinc-400 dark:border-zinc-600'}`}>
                        {on && <CheckIcon className="h-3 w-3 text-zinc-900" aria-hidden />}
                      </span>
                      <span className="font-medium text-zinc-900 dark:text-white">{n.label}</span>
                    </button>
                    {n.define && (
                      <button
                        type="button"
                        aria-expanded={openDef === n.id}
                        aria-label="What does this mean?"
                        onClick={() => setOpenDef(openDef === n.id ? null : n.id)}
                        className={`absolute right-3 top-3.5 rounded-full p-1 transition-colors ${openDef === n.id ? 'text-olive-600 dark:text-olive-400' : 'text-zinc-400 hover:text-olive-600 dark:hover:text-olive-400'}`}
                      >
                        <InformationCircleIcon className="h-5 w-5" aria-hidden />
                      </button>
                    )}
                    {openDef === n.id && (
                      <p className="px-4 pb-4 pl-12 text-sm leading-relaxed text-zinc-600 motion-safe:animate-guide-in dark:text-zinc-400">{n.define}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Before a choice, the area's services: the page already starts to build */}
            {!need && overview.length > 0 && (
              <div className="mt-10">
                <p className={eyebrow}>In {area.label}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {overview.map((s, i) => (
                    <a
                      key={s.id}
                      href={s.href}
                      style={{ animationDelay: `${120 + i * 50}ms` }}
                      className="group relative h-28 overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-olive-500/70 motion-safe:animate-guide-in dark:border-zinc-800 dark:bg-black"
                    >
                      <ServiceArt
                        motif={MOTIF_BY_SERVICE[s.id] ?? 'network'}
                        seedKey={`o-${s.id}`}
                        className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-40 text-olive-600 opacity-40 transition-opacity group-hover:opacity-80 dark:text-olive-400 [mask-image:radial-gradient(circle_at_70%_60%,black_30%,transparent_72%)]"
                      />
                      <span className="relative z-10 font-semibold text-zinc-900 dark:text-white">{s.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Your starting point: rebuilt on every choice */}
      {need && results.length > 0 && (
        <section ref={resultsRef} className="relative border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className={eyebrow}>Your starting point</p>
              <button type="button" onClick={restart} className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <ArrowPathIcon className="h-4 w-4" aria-hidden /> Start again
              </button>
            </div>

            {urgentIncident && (
              <a
                href="/contact?topic=incident-response"
                className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/60 bg-amber-50 px-4 py-3 text-sm text-zinc-900 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-100 dark:hover:bg-amber-500/20"
              >
                <ExclamationTriangleIcon className="h-5 w-5 flex-shrink-0 text-amber-600" aria-hidden />
                <span><strong>Dealing with an incident right now?</strong> Contact us straight away and start your message with URGENT.</span>
              </a>
            )}

            <div key={signature} aria-live="polite" className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
              {results.map((r, i) => {
                const primary = i === 0;
                const info = openInfo === r.service.id;
                return (
                  <article
                    key={r.service.id}
                    style={{ animationDelay: `${i * 80}ms` }}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl motion-safe:animate-guide-in ${primary ? 'border-2 border-olive-500 bg-linear-to-b from-olive-500/10 to-transparent lg:col-span-2 lg:row-span-2' : 'border border-zinc-200 bg-white transition-colors hover:border-olive-500/60 dark:border-zinc-800 dark:bg-black'}`}
                  >
                    <div className={`relative overflow-hidden ${primary ? 'h-48 sm:h-64' : 'h-28'}`} aria-hidden>
                      <div className={`absolute inset-0 opacity-40 dark:opacity-30 ${gridBg} [mask-image:linear-gradient(to_bottom,black,transparent)]`} />
                      <ServiceArt
                        motif={MOTIF_BY_SERVICE[r.service.id] ?? 'network'}
                        seedKey={`r-${r.service.id}`}
                        className={`pointer-events-none absolute inset-0 h-full w-full text-olive-600 transition-opacity duration-300 dark:text-olive-400 [mask-image:radial-gradient(ellipse_75%_95%_at_65%_45%,black_45%,transparent_80%)] ${primary ? 'opacity-90' : 'opacity-60 group-hover:opacity-100'}`}
                      />
                    </div>
                    <div className={`relative flex flex-1 flex-col ${primary ? 'p-6 sm:p-8' : 'p-5'}`}>
                      <div className={eyebrow}>{primary ? 'Start here' : i === 1 ? 'Then' : 'Also consider'} · {r.service.section}</div>
                      <h3 className={`mt-2 font-bold tracking-tight text-zinc-900 dark:text-white ${primary ? 'text-3xl sm:text-4xl' : 'text-lg'}`}>{r.service.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {r.reasons.slice(0, primary ? 3 : 1).map((why) => (
                          <span key={why} className="inline-flex items-center gap-1 rounded-full bg-olive-500/10 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300">
                            <CheckIcon className="h-3.5 w-3.5 text-olive-600 dark:text-olive-400" aria-hidden /> {why}
                          </span>
                        ))}
                      </div>
                      {info && (
                        <div className="mt-4 text-sm leading-relaxed text-zinc-600 motion-safe:animate-guide-in dark:text-zinc-400">
                          <p>{r.service.summary}</p>
                          {r.service.features.length > 0 && (
                            <ul className="mt-2 space-y-1">
                              {r.service.features.map((f) => (
                                <li key={f} className="flex items-start gap-2"><span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-olive-500" />{f}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                        <a
                          href={`/contact?topic=${encodeURIComponent(contactTopic(r.service.id))}`}
                          className={`inline-flex items-center gap-2 rounded-lg border border-olive-500 bg-olive-500 font-semibold text-zinc-900 transition-colors hover:bg-olive-600 ${primary ? 'px-5 py-3' : 'px-3.5 py-2 text-sm'}`}
                        >
                          Discuss this with us <ArrowRightIcon className="h-4 w-4" aria-hidden />
                        </a>
                        <button
                          type="button"
                          aria-expanded={info}
                          onClick={() => setOpenInfo(info ? null : r.service.id)}
                          className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        >
                          <InformationCircleIcon className="h-4 w-4" aria-hidden /> {info ? 'Less' : 'What is it?'}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Optional refinements: one choice per row, a second click clears it */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-6">
              <span className="text-sm font-semibold text-zinc-900 dark:text-white">Tailor it</span>
              <ChipGroup label="Team" options={SIZES} value={a.size} onPick={(id) => tailor('size', id)} />
              <ChipGroup label="Sector" options={SECTORS} value={a.sector} onPick={(id) => tailor('sector', id)} />
              <ChipGroup label="Region" options={EU} value={a.eu} onPick={(id) => tailor('eu', id)} />
              <button
                type="button"
                aria-pressed={Boolean(a.urgent)}
                onClick={() => setA((prev) => ({ ...prev, urgent: !prev.urgent }))}
                className={`${smallChip} ${a.urgent ? 'border-amber-500 bg-amber-500 text-zinc-900 font-semibold' : 'border-zinc-300 text-zinc-700 hover:border-amber-500 dark:border-zinc-700 dark:text-zinc-300'}`}
              >
                <ExclamationTriangleIcon className="h-4 w-4" aria-hidden /> Urgent
              </button>
            </div>

            {/* How it runs: the starting point's plan, one step at a time */}
            {results[0].service.plan.length > 0 && (
              <div className="mt-10">
                <p className={eyebrow}>How it runs</p>
                <ol className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {results[0].service.plan.map((p, i) => {
                    const on = step === i;
                    return (
                      <li key={p.title}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setStep(i)}
                          className={`h-full w-full rounded-xl border p-4 text-left transition-colors ${on ? 'border-olive-500 bg-olive-500/10' : 'border-zinc-200 hover:border-olive-500/60 dark:border-zinc-800'}`}
                        >
                          <span className="font-mono text-xs text-olive-600 dark:text-olive-400">0{i + 1}</span>
                          <span className="mt-1 block font-semibold text-zinc-900 dark:text-white">{p.title}</span>
                          {on && <span className="mt-2 block text-sm text-zinc-600 motion-safe:animate-guide-in dark:text-zinc-400">{p.description}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}

            {more.length > 0 && area && (
              <p className="mt-8 text-sm text-zinc-500">
                More in {area.label}:{' '}
                {more.map((s, i) => (
                  <span key={s.id}>
                    <a href={s.href} className="text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">{s.title}</a>
                    {i < more.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
