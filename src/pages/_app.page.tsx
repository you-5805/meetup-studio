import { Seo } from './seo';
import { TooltipProvider } from '@/components/Tooltip/Tooltip';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import '@/styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>
      <Seo />
      <RecoilRoot>
        <TooltipProvider>
          <Component {...pageProps} />
        </TooltipProvider>
      </RecoilRoot>
    </>
  );
}
