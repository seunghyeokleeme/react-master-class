import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Error404 from "../Components/Error404";

interface ChartProps {
  coinId: string;
}

export interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : data?.length ? (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map(price => +price.close).slice(0, 15) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            yaxis: { show: false },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
              type: "datetime",
              categories:
                data
                  ?.map(price =>
                    new Date(price.time_close * 1000).toISOString()
                  )
                  .slice(0, 15) ?? [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: value => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      ) : (
        <Error404 />
      )}
    </div>
  );
}

export default Chart;
