import '@/styles/global.css';
import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ja'>
      <body>{children}</body>
    </html>
  );
}
