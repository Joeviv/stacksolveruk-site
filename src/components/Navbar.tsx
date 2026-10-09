// ARCHIVO: src/components/Navbar.tsx
// Navigation: Home · Services (the six areas) · About · Contact.
import React, { useState, useEffect, useRef } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { SERVICES_MENU } from '../data/menuData';
import { AREAS, AREA_SERVICES } from '../data/serviceGuide';
import { AREA_ICON } from './areaIcons';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const TITLES = new Map(SERVICES_MENU.flatMap((s) => s.subsections.map((sub) => [sub.id, sub.title] as const)));
const AREA_LINKS = AREAS.map((area) => ({
  area,
  services: AREA_SERVICES[area.id].services.map((id) => ({ id, title: TITLES.get(id) ?? id })),
}));

const PAGES = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
const linkOn = 'text-olive-700 bg-olive-50 dark:text-white dark:bg-zinc-900';
const linkOff = 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800';
const mobileOn = 'bg-olive-50 text-olive-700 dark:bg-zinc-900 dark:text-white';
const mobileOff = 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') setCurrentPath(window.location.pathname);
  }, []);

  // Close the services panel on an outside click or Escape
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const onClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const isActive = (path: string) => (path === '/' ? currentPath === '/' : currentPath === path || currentPath.startsWith(path + '/'));
  const servicesActive = servicesOpen || isActive('/services');

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group" aria-label="StackSolver UK home">
              <Logo />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              <a href="/" className={`${linkBase} ${isActive('/') ? linkOn : linkOff}`}>Home</a>

              <div className="inline-block text-left" ref={dropdownRef}>
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className={`group inline-flex items-center ${linkBase} ${servicesActive ? linkOn : linkOff}`}
                >
                  <span>Services</span>
                  <ChevronDownIcon className={`ml-1.5 h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {/* The panel hangs from the right edge of the navigation, so it never runs off the screen */}
                {servicesOpen && (
                  <div className="absolute right-2 top-14 z-50 w-[calc(100vw-2rem)] max-w-3xl px-2 sm:right-4 lg:right-6">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
                      <div className="grid grid-cols-3 gap-x-6 gap-y-7 p-7">
                        {AREA_LINKS.map(({ area, services }) => {
                          const Icon = AREA_ICON[area.id];
                          return (
                            <div key={area.id}>
                              <a href={`/services#${area.id}`} className="flex items-center gap-2 text-sm font-semibold text-zinc-900 hover:text-olive-600 dark:text-white dark:hover:text-olive-400">
                                <Icon className="h-5 w-5 text-olive-600 dark:text-olive-400" aria-hidden="true" />
                                {area.label}
                              </a>
                              <div className="mt-2 space-y-1.5 pl-7">
                                {services.map((s) => (
                                  <a key={s.id} href={`/services#${s.id}`} className="block text-sm text-zinc-500 transition-colors hover:text-olive-600 dark:text-zinc-400 dark:hover:text-olive-400">
                                    {s.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <a href="/services" className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-7 py-3 text-sm font-medium text-zinc-900 hover:text-olive-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:text-olive-400">
                        All services <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {PAGES.map((p) => (
                <a key={p.href} href={p.href} className={`${linkBase} ${isActive(p.href) ? linkOn : linkOff}`}>{p.label}</a>
              ))}

              <div className="pl-4 border-l border-zinc-200 dark:border-zinc-700">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? mobileOn : mobileOff}`}>Home</a>
            <div>
              <a href="/services" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/services') ? mobileOn : mobileOff}`}>Services</a>
              <div className="ml-3 grid grid-cols-2 gap-1 border-l border-zinc-200 pl-3 dark:border-zinc-800">
                {AREA_LINKS.map(({ area }) => {
                  const Icon = AREA_ICON[area.id];
                  return (
                    <a key={area.id} href={`/services#${area.id}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white">
                      <Icon className="h-4 w-4 text-olive-600 dark:text-olive-400" aria-hidden="true" />
                      {area.label}
                    </a>
                  );
                })}
              </div>
            </div>
            {PAGES.map((p) => (
              <a key={p.href} href={p.href} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(p.href) ? mobileOn : mobileOff}`}>{p.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
