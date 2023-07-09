import s from "./StatisticsPage.module.scss";
import StatsIcon from "@assets/icons/stats.svg";
import { ContentLayout } from "@components/layouts/ContentLayout/ContentLayout";
import { GrayPanel } from "@components/shared/GrayPanel/GrayPanel";
import { InputWithButton } from "@components/shared/InputWithButton/InputWithButton";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("./components/Chart/Chart") as any, {
  ssr: false,
});

interface DailyStats {
  date: string;
  clicks: number;
}

interface LinkStats {
  data: DailyStats[];
}

const arr = new Array(30).fill(1);
const kek: DailyStats[] = arr.map((_, i) => {
  return {
    date: "Jan 30, 2023",
    clicks: Math.sin(i / Math.PI) * i + i * i,
  };
});

const data: LinkStats = {
  data: kek,
};

console.log(dayjs("2023-06-27T22:24:09Z").format("MMM DD, YYYY"));

export const StatisticsPage = () => {
  const [link, setLink] = useState("");

  return (
    <ContentLayout loading={false}>
      <GrayPanel title="Statistics">
        <h2 className={s.mode}>{link ? link : "All links"}</h2>
        <div className={s.graph}>
          {/* @ts-ignore*/}
          <Chart data={data.data} />
        </div>
        <div>
          <InputWithButton
            inputProps={{ label: "specific link", name: "specificLink" }}
            buttonProps={{ icon: StatsIcon }}
            onSubmit={(data) => console.log(data)}
          />
        </div>
      </GrayPanel>
    </ContentLayout>
  );
};
