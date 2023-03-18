import { TooltipProvider } from '@/components/Tooltip/Tooltip';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meetup Studio</title>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </>
  );
}
