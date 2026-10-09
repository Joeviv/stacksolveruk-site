// File: src/components/Logo.tsx
// StackSolver UK wordmark: text only, in the site's mono face. "/UK" in brand olive.
import React from 'react';

export default function Logo() {
  return (
    <span className="flex items-baseline font-mono text-[15px] leading-none tracking-[0.2em]">
      <span className="font-semibold text-zinc-900 dark:text-white">STACK</span>
      <span className="font-normal text-zinc-500 transition-colors duration-300 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-white">SOLVER</span>
      <span className="ml-2 font-semibold text-olive-600 dark:text-olive-400">/UK</span>
    </span>
  );
}
