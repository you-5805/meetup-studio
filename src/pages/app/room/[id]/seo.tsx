import { NextSeo } from 'next-seo';

type Props = {
  eventTitle: string;
};

export const Seo = ({ eventTitle }: Props) => {
  return (
    <NextSeo
      {...{
        title: `${eventTitle} - Meetup Studio`,
      }}
    />
  );
};
