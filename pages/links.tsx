import { LinksPage } from "@components/pages/LinksPage/LinksPage";
import { getLinks } from "@services/apiService/endpoints/linksApi";
import { AxiosRequestConfig } from "axios";
import { GetServerSideProps } from "next";

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

export interface LinkPageProps {
  links: ILink[];
  total: number;
}

export default function Links({ links, total }: LinkPageProps) {
  return <LinksPage links={links} total={total} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookiesHeader = { headers: { cookie: req.headers.cookie } };

  try {
    const [links] = await getLinks(1, {
      ...cookiesHeader,
    } as AxiosRequestConfig);
    return { props: { links: links.data, total: links.total } };
  } catch (e) {
    console.log(e);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
