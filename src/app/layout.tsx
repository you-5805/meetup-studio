'use client';

import { TooltipProvider } from '@/components/Tooltip/Tooltip';
import type { PropsWithChildren } from 'react';
import '@/styles/global.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <head />
      <TooltipProvider>
        <body>{children}</body>
      </TooltipProvider>
    </html>
  );
}
