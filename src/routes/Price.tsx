import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { IHistorical } from "./Chart";
import ApexChart from "react-apexcharts";
import Error404 from "../Components/Error404";

interface PriceProps {
  coinId: string;
  darkMode: boolean;
}

function Price({ coinId, darkMode }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv-price", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : data?.length ? (
        <ApexChart
          type="candlestick"
          height={350}
          options={{
            theme: {
              mode: `${darkMode ? "dark" : "light"}`,
            },
            chart: {
              type: "candlestick",
              height: 350,
            },
            title: {
              text: `${coinId} Prices`,
              align: "left",
              style: {
                color: "#4cd137",
              },
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          series={[
            {
              data:
                data
                  ?.map(price => {
                    return {
                      x: new Date(price.time_close * 1000).toISOString(),
                      y: [+price.open, +price.high, +price.low, +price.close],
                    };
                  })
                  .slice(0, 15) ?? [],
            },
          ]}
        />
      ) : (
        <Error404 />
      )}
    </div>
  );
}

export default Price;
