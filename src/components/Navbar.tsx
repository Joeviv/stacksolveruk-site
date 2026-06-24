// ARCHIVO: src/components/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { SERVICES_MENU } from '../data/menuData';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client-side only logic
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    // Safety check for document
    if (typeof document !== 'undefined') {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — Stacksolver UK wordmark (no symbol; "UK" in brand olive) */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group" aria-label="Stacksolver UK home">
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                <span className="text-olive-500">S</span>tack<span className="text-olive-500">S</span>olver<span className="text-olive-500"> UK</span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') && currentPath === '/'
                  ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                  }`}
              >
                Home
              </a>

              {/* Services Dropdown */}
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <button
                  onClick={() => toggleDropdown('services')}
                  className={`group inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeDropdown === 'services' || currentPath.startsWith('/services')
                    ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                    }`}
                >
                  <span>Services</span>
                  <ChevronDownIcon
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'transform rotate-180' : ''
                      }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {activeDropdown === 'services' && (
                  <div className="absolute left-0 mt-2 w-screen max-w-md px-2 sm:px-0 lg:max-w-3xl z-50 transform -translate-x-1/4 lg:-translate-x-1/2">
                    <div className="rounded-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                      <div className="relative grid gap-6 bg-white dark:bg-zinc-900 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                        {SERVICES_MENU.map((section) => {
                          const Icon = section.icon;
                          return (
                            <div key={section.id} className="group relative flex items-start p-3 -m-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                              <a href={`/services/${section.id}`} className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-olive-100 dark:bg-olive-500/10 text-olive-500 dark:text-olive-500 sm:h-12 sm:w-12 hover:scale-110 transition-transform">
                                <Icon className="h-6 w-6" aria-hidden="true" />
                              </a>
                              <div className="ml-4">
                                <a href={`/services/${section.id}`} className="block text-base font-medium text-zinc-900 dark:text-white hover:text-olive-500 dark:hover:text-olive-400">
                                  {section.title}
                                </a>
                                <div className="mt-1 space-y-1">
                                  {section.subsections.map(sub => (
                                    <a
                                      key={sub.id}
                                      href={`/services/${section.id}/${sub.id}`}
                                      className="block text-sm text-zinc-500 hover:text-olive-500 dark:text-zinc-400 dark:hover:text-olive-400 transition-colors"
                                    >
                                      {sub.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <a
                href="/industries"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/industries')
                  ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                  }`}
              >
                Industries
              </a>

              <a
                href="/method"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/method')
                  ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                  }`}
              >
                Method
              </a>

              <a
                href="/about"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about')
                  ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                  }`}
              >
                About
              </a>

              <a
                href="/trust"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/trust')
                  ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                  }`}
              >
                Trust
              </a>

              <a
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contact')
                  ? 'text-olive-500 bg-olive-50 dark:text-white dark:bg-zinc-900'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800'
                  }`}
              >
                Contact
              </a>

              {/* Theme Toggle Button */}
              <div className="pl-4 border-l border-zinc-200 dark:border-zinc-700">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-olive-50 text-olive-500 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              Home
            </a>

            <div className="space-y-1">
              <div className="px-3 py-2 text-base font-medium text-zinc-500 uppercase tracking-wider">
                Services
              </div>
              {SERVICES_MENU.map(section => (
                <div key={section.id} className="pl-4">
                  <a href={`/services/${section.id}`} className="block px-3 py-1 text-sm font-medium text-zinc-900 dark:text-zinc-300 hover:text-olive-500 dark:hover:text-olive-400">
                    {section.title}
                  </a>
                  <div className="pl-4 mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-800 ml-3">
                    {section.subsections.map(sub => (
                      <a
                        key={sub.id}
                        href={`/services/${section.id}/${sub.id}`}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${isActive(`/services/${section.id}/${sub.id}`)
                          ? 'text-olive-500 bg-olive-50 dark:text-olive-400 dark:bg-olive-900/10'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                      >
                        {sub.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/industries"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/industries') ? 'bg-olive-50 text-olive-500 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              Industries
            </a>

            <a
              href="/method"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/method') ? 'bg-olive-50 text-olive-500 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              Method
            </a>

            <a
              href="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-olive-50 text-olive-500 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              About
            </a>

            <a
              href="/trust"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/trust') ? 'bg-olive-50 text-olive-500 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              Trust
            </a>

            <a
              href="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'bg-olive-50 text-olive-500 dark:bg-zinc-900 dark:text-white' : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
