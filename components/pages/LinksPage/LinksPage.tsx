import s from "./LinksPage.module.scss";
import CopyIcon from "@assets/icons/copy.svg";
import { ContentLayout } from "@components/layouts/ContentLayout/ContentLayout";
import { useLinksPage } from "@components/pages/LinksPage/hooks/useLinksPage";
import { Button } from "@components/shared/Button/Button";
import { GrayPanel } from "@components/shared/GrayPanel/GrayPanel";
import { Loader } from "@components/shared/Loader/Loader";
import { CreateLinkModal } from "@components/shared/Modals/CreateLinkModal/CreateLinkModal";
import { EditLinkModal } from "@components/shared/Modals/EditLinkModal/EditLinkModal";
import { Pagination } from "@components/shared/Pagination/Pagination";
import { HeaderItem, Table } from "@components/shared/Table/Table";
import { Tooltip } from "@components/shared/Tooltip/Tooltip";
import { DEFAULT_LIMIT } from "@constants/constants";
import { ILink, LinkPageProps } from "@pages/links";
import clsx from "clsx";
import { FC, MouseEvent, useMemo, useState } from "react";

export const LinksPage: FC<LinkPageProps> = ({ links, total }) => {
  console.log(links, total);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedLink, setSelectedLink] = useState<ILink | null>(null);
  const [typeModalShowed, setTypeModalShowed] = useState<
    "create" | "edit" | null
  >(null);

  const {
    onCreateLink,
    onEditLink,
    onDeleteLink,
    loading,
    errors,
    linksData,
    totalLinks,
    fetchLinks,
  } = useLinksPage(links, total, selectedPage);

  const copyLink = async (link: string, e?: MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    await navigator.clipboard.writeText(link);
  };

  const onChangePage = (page: number) => {
    setSelectedPage(page);
    fetchLinks(page);
  };

  const onSelectLink = (link: ILink) => () => {
    setSelectedLink(link);
    setTypeModalShowed("edit");
  };

  const columns: HeaderItem[] = useMemo(
    () => [
      {
        displayName: "title",
        key: "title",
        width: "30%",
      },
      {
        displayName: "short url",
        key: "shortUrl",
        width: "30%",
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
        displayName: "expires",
        key: "expiresAt",
        render: (data) => {
          return data;
        },
        width: "30%",
      },
      {
        displayName: "clicks",
        key: "clicksTotal",
        width: "10%",
        render: (data) => data,
      },
      {
        displayName: "",
        key: "copy",
        isAdditional: true,
      },
    ],
    []
  );

  return (
    <ContentLayout loading={false}>
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
                kind="primary"
                className={s.addBtn}
                onClick={() => setTypeModalShowed("create")}
              >
                +
              </Button>
              <Table
                loading={loading}
                headerData={columns}
                data={linksData}
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
                      kind="secondary"
                      className={s.copyBtn}
                      icon={CopyIcon}
                      onClick={() => copyLink(rowData.shortUrl)}
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
              total={totalLinks}
              onChangePage={onChangePage}
              className={s.pagination}
            />
          </>
        )}
      </GrayPanel>
      {typeModalShowed === "create" && (
        <CreateLinkModal
          onClose={() => setTypeModalShowed(null)}
          onCreate={onCreateLink}
          error={errors.create}
        />
      )}
      {typeModalShowed === "edit" && (
        <EditLinkModal
          onClose={() => setTypeModalShowed(null)}
          link={selectedLink}
          onEdit={onEditLink}
          onDelete={onDeleteLink}
          error={errors.edit}
        />
      )}
    </ContentLayout>
  );
};
