import { MainLayout } from "@components/layouts/MainLayout/MainLayout";
import "@styles/global.css";
import "@styles/normalize.css";
import type { AppProps } from "next/app";
import { Montserrat_Alternates } from "next/font/google";

export const montserrat = Montserrat_Alternates({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  fallback: ["sans-serif"],
  variable: "--montserrat",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout className={montserrat.className}>
      <Component {...pageProps} />;
    </MainLayout>
  );
}

export default MyApp;
