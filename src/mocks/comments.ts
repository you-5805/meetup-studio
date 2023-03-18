export const commentsMock = [
  {
    username: 'yoiwamoto',
    img: 'https://pbs.twimg.com/profile_images/1627211617820868609/JBx_xJa-_400x400.jpg',
    comment: 'わいわい',
    commentedAt: '18:32',
  },
  {
    username: 'yoiwamoto',
    img: 'https://pbs.twimg.com/profile_images/1627211617820868609/JBx_xJa-_400x400.jpg',
    comment: '盛り上がってきた',
    commentedAt: '18:33',
  },
  {
    username: 'yoiwamoto',
    img: 'https://pbs.twimg.com/profile_images/1627211617820868609/JBx_xJa-_400x400.jpg',
    comment: '88888',
    commentedAt: '18:33',
  },
  {
    username: 'yoiwamoto',
    img: 'https://pbs.twimg.com/profile_images/1627211617820868609/JBx_xJa-_400x400.jpg',
    comment: 'わいわい',
    commentedAt: '18:33',
  },
  {
    username: 'yoiwamoto',
    img: 'https://pbs.twimg.com/profile_images/1627211617820868609/JBx_xJa-_400x400.jpg',
    comment: '8888888',
    commentedAt: '18:34',
  },
];

export type Comment = (typeof comments)[number] & { id: string };
