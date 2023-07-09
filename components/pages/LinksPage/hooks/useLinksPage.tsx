import { TableItem } from "@components/shared/Table/Table";
import { useHandleError } from "@hooks/useHandleError";
import { ILink } from "@pages/links";
import {
  createLink,
  CreateLink,
  deleteLink,
  editLink,
  EditLink,
  getLinks,
} from "@services/apiService/endpoints/linksApi";
import { useState } from "react";

export const useLinksPage = (
  links: ILink[],
  total: number,
  selectedPage: number
) => {
  const handleError = useHandleError();
  const [linksData, setLinksData] = useState<TableItem[]>(links);
  const [totalLinks, setTotalLinks] = useState(total);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ create?: string; edit?: string }>({
    create: "",
    edit: "",
  });

  const fetchLinks = async (page?: number) => {
    setLoading(true);
    const [newLinks] = await getLinks(page + 1);
    setLinksData(newLinks.data);
    setTotalLinks(newLinks.total);
    setLoading(false);
  };

  const onCreateLink = async (data: Omit<CreateLink, "createdAt">) => {
    setLoading(true);
    console.log(data);
    const [_, error] = await createLink({
      ...data,
      createdAt: new Date(Date.now()).toString(),
    });
    console.log(error);

    if (error) {
      setErrors({ create: handleError(error) });
    }

    await fetchLinks(selectedPage);
  };

  const onEditLink = async (linkId: string, data: EditLink) => {
    setLoading(true);

    console.log(data);
    const [_, error] = await editLink(linkId, data);
    console.log(error);

    if (error) {
      setErrors({ edit: handleError(error) });
    }

    await fetchLinks(selectedPage);
  };

  const onDeleteLink = async (linkId: string) => {
    setLoading(true);

    console.log(linkId);
    const [_, error] = await deleteLink(linkId);
    console.log(error);

    if (error) {
      setErrors({ edit: handleError(error) });
    }

    await fetchLinks(selectedPage);
  };

  return {
    onCreateLink,
    onEditLink,
    onDeleteLink,
    fetchLinks,
    errors,
    loading,
    linksData,
    totalLinks,
  };
};
