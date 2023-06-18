'use client';

import { GrayPanel } from '@components/shared/GrayPanel/GrayPanel';
import { Table, TableItem } from '@components/shared/Table/Table';
import { useState } from 'react';

import s from './styles.module.scss';

interface Link {
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

type LinkTableItem = Link & { key: string | number };

const defaultData: LinkTableItem[] = [
  {
    key: '1',
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
    key: '2',
    id: '2',
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
];

const columns: TableItem[] = [
  {
    displayName: 'title',
    key: 'title',
    width: '21%',
  },
  {
    displayName: 'short url',
    key: 'short_url',
    width: '13%',
  },
  {
    displayName: 'expires',
    key: 'expires',
    render: (data) => data.expires_at,
    width: '12%',
  },
  {
    displayName: 'clicks',
    key: 'clicks',
    width: '7%',
    render: (data) => {
      return data.total;
    },
  },
  {
    displayName: '',
    key: 'copy',
    render: () => 'dopy',
    isAdditional: true,
  },
];

export const Links = () => {
  const [data, setData] = useState(() => [...defaultData]);

  return (
    <div className={s.layout}>
      <GrayPanel title="Links">
        <Table
          headerData={columns}
          data={defaultData}
          additionalCell={<div className={s.copyBtn}>copy</div>}
          styles={{
            header: s.header,
            headerCeil: s.headerCeil,
            row: s.row,
          }}
        />
      </GrayPanel>
    </div>
  );
};

export default Links;
