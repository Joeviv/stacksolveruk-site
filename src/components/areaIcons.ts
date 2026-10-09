// File: src/components/areaIcons.ts
// One icon per service area, shared by the navigation, the home page and the Services page.
import type React from 'react';
import {
  BuildingLibraryIcon, CircleStackIcon, DocumentCheckIcon, ScaleIcon, ShieldCheckIcon, UsersIcon,
} from '@heroicons/react/24/outline';

export const AREA_ICON: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  cyber: ShieldCheckIcon,
  governance: BuildingLibraryIcon,
  risk: ScaleIcon,
  compliance: DocumentCheckIcon,
  hr: UsersIcon,
  systems: CircleStackIcon,
};
