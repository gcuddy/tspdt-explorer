"use client";

import { Movie, Ranking } from "tspdt-api/src/db/schema";
import { ResponsiveLine } from "@nivo/line";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { range } from "remeda";
const inter = Inter({ weight: "400", subsets: ["latin"] });

const COLORS = [
  "hsla(40, 50%, 72%, 1.00)",
  "hsla(80, 50%, 72%, 0.75)",
  "hsla(160, 50%, 72%, 0.75)",
  "hsla(220, 50%, 72%, 0.75)",
  "hsla(300, 50%, 72%, 0.75)",
];

export function RankingChart({
  data,
  enablePoints = true,
  colors,
}: {
  data: Array<Movie & { rankings: Ranking[] }>;
  enablePoints?: boolean;
  colors?: string[];
}) {
  const currentYear = new Date().getFullYear();

  const router = useRouter();

  const { ticks, minYear, maxYear } = useMemo(() => {
    const years = new Set<number>();
    data.forEach((movie) => {
      movie.rankings.forEach((r) => {
        if (r.year && r.ranking) years.add(r.year);
      });
    });

    const arr_years = Array.from(years);

    const minYear = Math.min(...arr_years);
    const maxYear = Math.max(...arr_years);

    const ticks = range(minYear, maxYear + 1)
      //   .slice(1)
      .filter((_, index, arr) => {
        if (arr.length <= 3) return true;
        return index % 2 === 0;
      });

    return { minYear, maxYear, ticks };
  }, [data]);

  console.log({ ticks });

  const actualData = useMemo(() => {
    return data.map((movie) => ({
      id: movie.id,
      data: movie.rankings
        .filter((r) => r.year && r.ranking)
        .map((r) => ({
          x: r.year,
          y: r.ranking,
        })),
    }));
  }, [data]);

  console.log({ actualData });

  return (
    <ResponsiveLine
      // [
      // {
      //     id: "Ranking",
      //     data: rankings.map((r) => ({
      //       x: r.year,
      //       y: r.ranking,
      //     })),
      //   },
      // ]
      data={actualData}
      xScale={{
        type: "linear",
        min: minYear,
        max: maxYear,
        // min: ticks[0],
        // max: ticks[ticks.length - 1],
        // stacked: false,
        // clamp: true,
        // nice: true,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
        ticksPosition: "before",
        format: (v) => (Math.floor(v) === v ? v : ""),
        // legend: "Ranking",
        // legendOffset: -32,
        // legendPosition: "middle",
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
        truncateTickAt: 0,
        tickValues: ticks,
        // tickValues: [2007, 2023],
        // legend: "Year",
        // legendOffset: 32,
        // legendPosition: "middle",
      }}
      layers={[
        "grid",
        "markers",
        "axes",
        "areas",
        "crosshair",
        "lines",
        "points",
        "slices",
        "mesh",
        "legends",
        // (point) => {
        //   console.log({ point });
        //   const y = point.
        //   return (
        //     <rect
        //     //   x={point.x}
        //     //   y={point.y}
        //     //   width={point.size}
        //     //   height={point.size}
        //     //   fill={point.color}
        //     />
        //   );
        // },
      ]}
      //   yScale={{
      //     type: "linear",
      //     min: 1,

      //   }}
      yScale={{
        type: "linear",
        // max: 5000,
        // min: 1,
        // stacked: false,
        // clamp: true,
        // nice: true,
      }}
      margin={{
        top: 50,
        bottom: 70,
        right: 60,
        left: 60,
      }}
      enablePoints={enablePoints}
      //   enablePointLabel={true}
      pointSize={4}
      enableCrosshair={true}
      isInteractive={true}
      onClick={(point) => {
        // Hard coded in right now
        router.push(`/movie/${point.serieId}`);
      }}
      markers={[
        {
          axis: "y",
          value: 1000,
          lineStyle: {
            stroke: "hsla(17, 63%, 80%, 0.5)",
            strokeWidth: 0.5,
            strokeDasharray: "4 4",
          },
        },
        // {
        //   axis: "y",
        //   value: 2500,
        //   lineStyle: {
        //     stroke: "hsla(17, 63%, 80%, 0.25)",
        //     strokeWidth: 0.5,
        //     strokeDasharray: "4 4",
        //   },
        // },
      ]}
      useMesh={true}
      theme={{
        // background: "#f5bcbc",
        axis: {
          domain: {
            line: {
              strokeWidth: 0,
            },
          },
          ticks: {
            text: {
              fill: "#71717a",
            },
          },
        },
        grid: {
          line: {
            stroke: "#27272a",
          },
        },
        legends: {
          hidden: {
            symbol: {
              opacity: 0.5,
            },
            text: {
              ...inter.style,
              fill: "#71717a",
              fontSize: 12,
              outlineColor: "#71717a",
              outlineWidth: 0,
              textDecoration: "line-through",
            },
          },
          text: {
            ...inter.style,
          },
        },
        crosshair: {
          line: {
            stroke: "#71717a",
          },
        },
      }}
      animate={false}
      //   colors={(data: { id: string; data: Array<Datum> }) => {
      //     console.log({ data });
      //     // get average of y values
      //     const avg =
      //       data.data.reduce((acc, curr) => acc + Number(curr.y), 0) /
      //       data.data.length;
      //     return positionToColor(avg, 1, 22_900);
      //   }}
      //   colors={
      //     colors ?? [
      //       "#71717a",
      //       "#7e8ea6",
      //       "#a0aec0",
      //       "#cbd5e1",
      //       "#e2e8f0",
      //       "#edf2f7",
      //       "#f7fafc",
      //     ]
      //   }
      colors={colors ?? (data.length === 1 ? ["#fff"] : COLORS)}
      pointSymbol={
        enablePoints
          ? (props) => {
              props.color;
              return (
                <circle
                  r={props.size / 2}
                  strokeWidth={props.borderWidth}
                  stroke={props.borderColor}
                  fill={
                    Number(props.datum.y) <= 1000 ? "hsl(17, 63%, 80%)" : "#fff"
                  }
                />
              );
            }
          : undefined
      }
      legends={
        data.length === 1
          ? undefined
          : [
              // TODO: this is not great, probably shuold implement own
              //   {
              //     anchor: "top",
              //     direction: "row",
              //     itemWidth: 50,
              //     // itemWidth: ,
              //     toggleSerie: true,
              //     itemHeight: 25,
              //     translateY: -25,
              //     // translateX: 100,
              //     symbolSize: 6,
              //     symbolShape: "circle",
              //     itemTextColor: "#fff",
              //     data: data.map((movie, index) => ({
              //       id: movie.id,
              //       label: movie.title,
              //       fill: getItemAtIndex(COLORS, index),
              //     })),
              //   },
            ]
      }
      lineWidth={data.length > 30 ? 0.5 : 1}
      //   pointColor={(point: Point) => {
      //     console.log({ point });
      //     return Number(point.data.yFormatted) <= 1000 ? "#f56565" : "#fff";
      //   }}
      tooltip={({ point }) => {
        const movie = data.find((d) => d.id === point.serieId);
        return (
          <div className="flex flex-col p-2 gap-1 text-xs text-zinc-200 rounded-lg bg-black border-zinc-700 shadow-2xl">
            {movie && (
              <span className="font-semibold text-white">
                {movie.title} ({movie.year})
              </span>
            )}
            <dl className="flex flex-col gap-1">
              <div className="flex justify-between gap-2 items-center">
                <dt>Year</dt>
                <dd className="tabular-nums">{point.data.xFormatted}</dd>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <dt>Ranking</dt>
                <dd className="tabular-nums">{point.data.yFormatted}</dd>
              </div>
            </dl>
          </div>
        );
      }}
    />
  );
}
