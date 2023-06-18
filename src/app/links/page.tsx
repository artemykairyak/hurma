'use client';

import CopyIcon from '@assets/icons/copy.svg';
import { ContentLayout } from '@components/layouts/ContentLayout/ContentLayout';
import { Button } from '@components/shared/Button/Button';
import { GrayPanel } from '@components/shared/GrayPanel/GrayPanel';
import { Loader } from '@components/shared/Loader/Loader';
import { Pagination } from '@components/shared/Pagination/Pagination';
import { HeaderItem, Table, TableItem } from '@components/shared/Table/Table';
import { Tooltip } from '@components/shared/Tooltip/Tooltip';
import { DEFAULT_LIMIT } from '@constants/constants';
import clsx from 'clsx';
import { MouseEvent, useMemo, useState } from 'react';

import s from './styles.module.scss';

interface ILink {
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

const defaultData: TableItem[] = [
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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([...defaultData]);
  const [total, setTotal] = useState(defaultData.length);
  const [selectedPage, setSelectedPage] = useState(0);

  const copyLink = async (link: string, e?: MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    await navigator.clipboard.writeText(link);
  };

  const onChangePage = (page: number) => {
    setSelectedPage(page);
  };

  const columns: HeaderItem[] = useMemo(
    () => [
      {
        displayName: 'title',
        key: 'title',
        width: '30%',
      },
      {
        displayName: 'short url',
        key: 'short_url',
        width: '30%',
        render: (data) => (
          <Tooltip text="Copied!" position="left" className={s.shortUrlTooltip}>
            <a
              href={data}
              className={s.shortLinkBtn}
              onClick={(e) => copyLink(data, e)}
            >
              {data}
            </a>
          </Tooltip>
        ),
      },
      {
        displayName: 'expires',
        key: 'expires',
        render: (data) => data.expires_at,
        width: '30%',
      },
      {
        displayName: 'clicks',
        key: 'clicks',
        width: '10%',
        render: (data) => data.total,
      },
      {
        displayName: '',
        key: 'copy',
        isAdditional: true,
      },
    ],
    [],
  );

  return (
    <ContentLayout>
      <div className={s.layout}>
        <GrayPanel
          title="Links"
          className={clsx({ [s.panel]: total > DEFAULT_LIMIT })}
        >
          {loading ? (
            <Loader fullSize={true} />
          ) : (
            <>
              <div className={s.table}>
                <div className={s.addBtnWrapper}>
                  <Button type="primary" className={s.addBtn}>
                    +
                  </Button>
                </div>
                <Table
                  loading={loading}
                  headerData={columns}
                  data={data}
                  rowComponent={(rowElement, rowData) => (
                    <button onClick={() => console.log(rowData)}>
                      {rowElement}
                    </button>
                  )}
                  additionalCell={(rowData) => (
                    <Tooltip
                      text="Copied!"
                      position="left"
                      className={s.copyTooltip}
                    >
                      <Button
                        type="secondary"
                        className={s.copyBtn}
                        icon={CopyIcon}
                        onClick={() => copyLink(rowData.short_url)}
                      />
                    </Tooltip>
                  )}
                  styles={{
                    header: s.header,
                    row: s.row,
                    rowCeil: s.rowCeil,
                  }}
                />
              </div>
              <Pagination
                selectedPage={selectedPage}
                total={total}
                onChangePage={onChangePage}
                className={s.pagination}
              />
            </>
          )}
        </GrayPanel>
      </div>
    </ContentLayout>
  );
};

export default Links;
