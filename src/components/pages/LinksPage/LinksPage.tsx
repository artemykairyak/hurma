import { ILink } from '@app/links/page';
import CopyIcon from '@assets/icons/copy.svg';
import { ContentLayout } from '@components/layouts/ContentLayout/ContentLayout';
import { Button } from '@components/shared/Button/Button';
import { GrayPanel } from '@components/shared/GrayPanel/GrayPanel';
import { Loader } from '@components/shared/Loader/Loader';
import { CreateLinkModal } from '@components/shared/Modals/CreateLinkModal/CreateLinkModal';
import { EditLinkModal } from '@components/shared/Modals/EditLinkModal/EditLinkModal';
import { Pagination } from '@components/shared/Pagination/Pagination';
import { HeaderItem, Table } from '@components/shared/Table/Table';
import { Tooltip } from '@components/shared/Tooltip/Tooltip';
import { DEFAULT_LIMIT } from '@constants/constants';
import clsx from 'clsx';
import { FC, MouseEvent, useMemo, useState } from 'react';

import s from './LinksPage.module.scss';

interface LinkPageProps {
  links: ILink[];
}

export const LinksPage: FC<LinkPageProps> = ({ links }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([...links]);
  const [total, setTotal] = useState(links.length);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedLink, setSelectedLink] = useState<ILink>(null);
  const [typeModalShowed, setTypeModalShowed] = useState<
    'create' | 'edit' | null
  >(null);

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

  const onSelectLink = (link: ILink) => () => {
    setSelectedLink(link);
    setTypeModalShowed('edit');
  };

  return (
    <ContentLayout>
      <GrayPanel
        title="Links"
        className={clsx({ [s.panel]: total > DEFAULT_LIMIT })}
        disableWhitePanel={true}
      >
        {loading ? (
          <Loader fullSize={true} />
        ) : (
          <>
            <div className={s.table}>
              <Button
                type="primary"
                className={s.addBtn}
                onClick={() => setTypeModalShowed('create')}
              >
                +
              </Button>
              <Table
                loading={loading}
                headerData={columns}
                data={data}
                rowComponent={(rowElement, rowData) => (
                  <button onClick={onSelectLink(rowData as ILink)}>
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
      {typeModalShowed === 'create' && (
        <CreateLinkModal onClose={() => setTypeModalShowed(null)} />
      )}
      {typeModalShowed === 'edit' && (
        <EditLinkModal
          onClose={() => setTypeModalShowed(null)}
          link={selectedLink}
        />
      )}
    </ContentLayout>
  );
};
