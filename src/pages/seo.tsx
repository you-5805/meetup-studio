import { DefaultSeo } from 'next-seo';

export const Seo = () => {
  return (
    <DefaultSeo
      {...{
        defaultTitle: 'Meetup Studio - オフラインミートアップをもっとインタラクティブに',
        description:
          'オフラインのミートアップをよりインタラクティブにするアプリケーションです。登壇者の発表に対して参加者からのチャットやリアクション、投票の結果をリアルタイムで表示することで、オフラインイベントの交流の難しさを解消します。',
        openGraph: {
          type: 'website',
          title: 'Meetup Studio - オフラインミートアップをもっとインタラクティブに',
          siteName: 'Meetup Studio - オフラインミートアップをもっとインタラクティブに',
          url: 'https://meetupstudio.app',
          description:
            'オフラインのミートアップをよりインタラクティブにするアプリケーションです。登壇者の発表に対して参加者からのチャットやリアクション、投票の結果をリアルタイムで表示することで、オフラインイベントの交流の難しさを解消します。',
          images: [
            {
              url: 'https://meetupstudio.app/img/og.png',
              alt: 'Meetup Studio',
              type: 'image/png',
            },
          ],
        },
        additionalLinkTags: [
          {
            rel: 'shortcut icon',
            href: '/favicon.ico',
            type: 'image/png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/img/apple-touch-icon.png',
            type: 'image/png',
          },
        ],
        additionalMetaTags: [
          {
            name: 'keywords',
            content: 'Meetup Studio,オフラインミートアップ,ミートアップ,勉強会,イベント,オフラインイベント',
          },
        ],
      }}
    />
  );
};
