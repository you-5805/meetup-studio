import { Layout } from '@/components/Layout/Layout';
import { TooltipProvider } from '@/components/Tooltip/Tooltip';
import type { AppProps } from 'next/app';
import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TooltipProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TooltipProvider>
  );
}
