import s from "./MainLayout.module.scss";
import { Header, HeaderLink } from "@components/shared/Header/Header";
import { Routes } from "@enums/routes";
import { useLogged } from "@hooks/useLogged";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";

const pagesWithoutHeader = [Routes.Login, Routes.SignUp];

const links: HeaderLink[] = [
  {
    title: "links",
    url: Routes.Links,
  },
  {
    title: "statistics",
    url: Routes.Statistics,
  },
  {
    title: "profile",
    url: Routes.Profile,
  },
  {
    title: "about",
    url: Routes.About,
  },
];

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, className }) => {
  const pathname = usePathname();
  useLogged();

  const isPageWithoutHeader = pagesWithoutHeader.includes(pathname as Routes);

  return (
    <div
      className={clsx(
        s.layout,
        { [s.peachBg]: isPageWithoutHeader },
        className
      )}
    >
      {!isPageWithoutHeader && <Header links={links} />}
      {children}
    </div>
  );
};
