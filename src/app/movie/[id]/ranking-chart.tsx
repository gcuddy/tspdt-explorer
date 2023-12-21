"use client";

import { Movie, Ranking } from "@/db/schema";
import { Datum, Point, ResponsiveLine } from "@nivo/line";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { range } from "remeda";

function positionToColor(position: number, min = 1, max = 20_000) {
  // get normalized position as expressed as number between 0 and 50
  console.log({ position, max });
  const np = (position / max) * 50;
  console.log({ np });
  const hue = 17;
  const saturation = 100;
  const lightness = 50 + np;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
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
        if (r.year) years.add(r.year);
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
      data={data.map((movie) => ({
        id: movie.id,
        data: movie.rankings
          .filter((r) => r.year)
          .map((r) => ({
            x: r.year,
            y: r.ranking,
          })),
      }))}
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
        top: 40,
        bottom: 50,
        right: 100,
        left: 100,
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
              //   stroke: "#64748b",
              strokeWidth: 0,
            },
          },
          ticks: {
            text: {
              fill: "#64748b",
            },
          },
        },
        grid: {
          line: {
            stroke: "#1e293b",
          },
        },
        crosshair: {
          line: {
            stroke: "#64748b",
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
      //       "#64748b",
      //       "#7e8ea6",
      //       "#a0aec0",
      //       "#cbd5e1",
      //       "#e2e8f0",
      //       "#edf2f7",
      //       "#f7fafc",
      //     ]
      //   }
      colors={["#fff"]}
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
      lineWidth={data.length > 5 ? 0.5 : 1}
      //   pointColor={(point: Point) => {
      //     console.log({ point });
      //     return Number(point.data.yFormatted) <= 1000 ? "#f56565" : "#fff";
      //   }}
      tooltip={({ point }) => {
        console.log("tooltip", { point, data });
        const movie = data.find((d) => d.id === point.serieId);
        return (
          <div className="flex flex-col p-2 text-xs text-zinc-200 rounded-lg bg-zinc-900 border-zinc-700 shadow">
            {movie && (
              <span>
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
