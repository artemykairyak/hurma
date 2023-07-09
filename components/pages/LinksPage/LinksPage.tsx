import s from "./LinksPage.module.scss";
import CopyIcon from "@assets/icons/copy.svg";
import { ContentLayout } from "@components/layouts/ContentLayout/ContentLayout";
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
import {
  createLink,
  CreateLink,
  getLinks,
} from "@services/apiService/endpoints/linksApi";
import clsx from "clsx";
import { FC, MouseEvent, useMemo, useState } from "react";

export const LinksPage: FC<LinkPageProps> = ({ links, total }) => {
  const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedLink, setSelectedLink] = useState<ILink | null>(null);
  const [typeModalShowed, setTypeModalShowed] = useState<
    "create" | "edit" | null
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
        displayName: "title",
        key: "title",
        width: "30%",
      },
      {
        displayName: "short url",
        key: "short_url",
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
        key: "expires",
        render: (data) => data.expires_at,
        width: "30%",
      },
      {
        displayName: "clicks",
        key: "clicks",
        width: "10%",
        render: (data) => data.total,
      },
      {
        displayName: "",
        key: "copy",
        isAdditional: true,
      },
    ],
    []
  );

  const onSelectLink = (link: ILink) => () => {
    setSelectedLink(link);
    setTypeModalShowed("edit");
  };

  const onCreateLink = async (data: Omit<CreateLink, "createdAt">) => {
    console.log(data);
    const [resData] = await createLink({
      ...data,
      createdAt: new Date(Date.now()).toString(),
    });

    if (resData.code === 200) {
      await getLinks(selectedPage);
    }
  };

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
                data={links}
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
      {typeModalShowed === "create" && (
        <CreateLinkModal
          onClose={() => setTypeModalShowed(null)}
          onCreate={onCreateLink}
        />
      )}
      {typeModalShowed === "edit" && (
        <EditLinkModal
          onClose={() => setTypeModalShowed(null)}
          link={selectedLink}
        />
      )}
    </ContentLayout>
  );
};
