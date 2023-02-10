import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { IHistorical } from "./Chart";
import ApexChart from "react-apexcharts";

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv-price", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          height={350}
          options={{
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

              labels: {
                style: {
                  colors: "inherit",
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: "inherit",
                },
              },
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
      )}
    </div>
  );
}

// data: [
//   {
//     x: new Date(1538778600000),
//     y: [6629.81, 6650.5, 6623.04, 6633.33],
//   },
// ],
export default Price;
