// ARCHIVO: src/components/ProjectGantt.tsx
import React, { useState, useEffect } from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import type { ImplementationStep } from '../data/menuData';

// Utilities locales del componente
const addDays = (dateStr: string, days: number): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

const diffDays = (startStr: string, endStr: string): number => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const ProjectGantt = ({ steps }: { steps: ImplementationStep[] }) => {
    // Initialize state with default dates (sequential phases)
    const [phases, setPhases] = useState(() => {
        let currentDate = new Date().toISOString().split('T')[0];
        return steps.map((step, index) => {
            const durationWeeks = [2, 3, 4, 2][index] || 2;
            const durationDays = durationWeeks * 7;
            const startDate = currentDate;
            const endDate = addDays(startDate, durationDays);

            // Next phase starts after this one
            currentDate = endDate;

            return {
                ...step,
                startDate,
                endDate
            };
        });
    });

    // Re-initialize if steps change significantly
    useEffect(() => {
        if (steps.length !== phases.length) {
            let currentDate = new Date().toISOString().split('T')[0];
            setPhases(steps.map((step, index) => {
                const durationWeeks = [2, 3, 4, 2][index] || 2;
                const durationDays = durationWeeks * 7;
                const startDate = currentDate;
                const endDate = addDays(startDate, durationDays);
                currentDate = endDate;
                return { ...step, startDate, endDate };
            }));
        }
    }, [steps.length]);

    const handleDateChange = (index: number, field: 'startDate' | 'endDate', value: string) => {
        const newPhases = [...phases];
        newPhases[index] = { ...newPhases[index], [field]: value };

        // Validation: End date cannot be before start date
        if (field === 'startDate' && new Date(value) > new Date(newPhases[index].endDate)) {
            newPhases[index].endDate = addDays(value, 7);
        }
        if (field === 'endDate' && new Date(value) < new Date(newPhases[index].startDate)) {
            newPhases[index].startDate = addDays(value, -7);
        }

        setPhases(newPhases);
    };

    // Calculate global timeline range
    const minDate = phases.reduce((min, p) => p.startDate < min ? p.startDate : min, phases[0].startDate);
    const maxDate = phases.reduce((max, p) => p.endDate > max ? p.endDate : max, phases[0].endDate);
    const totalDays = diffDays(minDate, maxDate) || 1;

    return (
        <div className="mt-12 bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 shadow-sm dark:shadow-none">
            <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
                    <CalendarDaysIcon className="w-6 h-6 text-olive-600 dark:text-olive-500" />
                    Cronograma Interactivo
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">Ajusta las fechas de cada fase para personalizar tu plan de implementación.</p>
            </div>

            {/* Scrollable Container */}
            <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="min-w-[700px]">
                    {/* Header */}
                    <div className="flex border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
                        <div className="w-64 flex-shrink-0 font-bold text-zinc-500 dark:text-zinc-500 text-xs uppercase tracking-wider">Phase & dates</div>
                        <div className="flex-1 relative h-6">
                            {/* Simple Timeline Markers */}
                            <div className="absolute left-0 text-[10px] text-zinc-400 dark:text-zinc-600 border-l border-zinc-200 dark:border-zinc-800 pl-1">Start</div>
                            <div className="absolute right-0 text-[10px] text-zinc-400 dark:text-zinc-600 border-r border-zinc-200 dark:border-zinc-800 pr-1">Project end</div>
                            <div className="absolute left-1/2 text-[10px] text-zinc-400 dark:text-zinc-600 border-l border-zinc-200 dark:border-zinc-800 pl-1 transform -translate-x-1/2">Midpoint</div>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-6">
                        {phases.map((phase, idx) => {
                            const offsetDays = diffDays(minDate, phase.startDate);
                            const durationDays = diffDays(phase.startDate, phase.endDate);
                            const leftPercent = (offsetDays / totalDays) * 100;
                            const widthPercent = (durationDays / totalDays) * 100;

                            return (
                                <div key={idx} className="flex items-start group">
                                    {/* Left Column: Title & Inputs */}
                                    <div className="w-64 flex-shrink-0 pr-6">
                                        <div className="font-bold text-zinc-900 dark:text-white text-sm mb-2 truncate flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 border border-zinc-200 dark:border-zinc-700">
                                                {phase.step}
                                            </div>
                                            {phase.title}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-600 w-8">Start:</span>
                                                <input
                                                    type="date"
                                                    value={phase.startDate}
                                                    onChange={(e) => handleDateChange(idx, 'startDate', e.target.value)}
                                                    className="bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded text-xs text-zinc-900 dark:text-zinc-300 px-2 py-1 w-full focus:border-olive-500 outline-none transition-colors"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-zinc-500 dark:text-zinc-600 w-8">End:</span>
                                                <input
                                                    type="date"
                                                    value={phase.endDate}
                                                    onChange={(e) => handleDateChange(idx, 'endDate', e.target.value)}
                                                    className="bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded text-xs text-zinc-900 dark:text-zinc-300 px-2 py-1 w-full focus:border-olive-500 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: The Bar */}
                                    <div className="flex-1 relative h-20 bg-zinc-50 dark:bg-zinc-900/30 rounded-lg border border-zinc-200 dark:border-zinc-800/50 mt-1">
                                        <div className="absolute inset-0 flex">
                                            <div className="flex-1 border-r border-zinc-200 dark:border-zinc-800/20"></div>
                                            <div className="flex-1 border-r border-zinc-200 dark:border-zinc-800/20"></div>
                                            <div className="flex-1 border-r border-zinc-200 dark:border-zinc-800/20"></div>
                                            <div className="flex-1"></div>
                                        </div>

                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-md bg-gradient-to-r from-olive-500 to-olive-600 shadow-lg shadow-olive-900/20 transition-all duration-500 cursor-help group-hover:brightness-110 flex items-center px-3 overflow-hidden"
                                            style={{
                                                left: `${leftPercent}%`,
                                                width: `${widthPercent}%`,
                                                minWidth: '40px'
                                            }}
                                            title={`${durationDays} Días`}
                                        >
                                            <span className="text-[10px] font-bold text-white/90 whitespace-nowrap drop-shadow-md">
                                                {durationDays} Días
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};