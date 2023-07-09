import s from "./Chart.module.scss";
import CanvasJSReact from "@canvasjs/react-charts";
import { FC } from "react";

// @ts-ignore
const CanvasJSChart = CanvasJSReact?.CanvasJSChart;

const getData = (data: any[]) => {
  return data.map((item) => {
    return {
      label: item.date,
      y: item.clicks,
    };
  });
};

const Chart: FC<{ data: any[] }> = ({ data }) => {
  const options = {
    axisX: {
      labelAngle: 80,
      labelFontSize: 12,
      margin: 10,
    },
    height: 280,
    axisY: {
      tickLength: 0,
      lineColor: "white",
      gridDashType: "dash",
      gridColor: "#E4E4E4", // Set the desired color for the Y-axis grid lines
    },
    zoomEnabled: true,
    animationEnabled: true,
    data: [
      {
        color: "#F55555",
        type: "column",
        dataPoints: getData(data),
        dataPointAutoWidth: false,
      },
    ],
  };

  return (
    <div className={s.chart}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Chart;
