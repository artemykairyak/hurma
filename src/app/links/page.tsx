'use client';

import { LinksPage } from '@components/pages/LinksPage/LinksPage';

export interface ILink {
  id: string;
  title: string;
  short_url: string;
  full_url: string;
  expires: {
    created_at: string;
    expires_at: string;
  };
  clicks: {
    daily: number[];
    total: number;
  };
}

const defaultData: ILink[] = [
  {
    id: '1',
    title: 'tanner',
    short_url: 'linsley',
    full_url: 'KKEK',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '2',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
  {
    id: '3',
    title: 'erere',
    short_url: 'linsley',
    full_url: 'w',
    expires: {
      expires_at: '11',
      created_at: '11',
    },
    clicks: {
      daily: [1],
      total: 1,
    },
  },
];

export const Links = () => {
  return <LinksPage links={defaultData} />;
};

export default Links;
