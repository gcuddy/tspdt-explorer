"use client";

import { Ranking } from "@/db/schema";
import { ResponsiveLine } from "@nivo/line";

export function RankingChart({ rankings }: { rankings: Array<Ranking> }) {
  return (
    <ResponsiveLine
      data={[
        {
          id: "Ranking",
          data: rankings.map((r) => ({
            x: r.year,
            y: r.ranking,
          })),
        },
      ]}
      xScale={{
        type: "point",
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
        // legend: "Ranking",
        // legendOffset: -32,
        // legendPosition: "middle",
      }}
      axisBottom={{
        tickSize: 0,
        tickPadding: 8,
        tickRotation: 0,
        truncateTickAt: 0,
        tickValues: rankings
          .map((r) => r.year)
          .slice(1)
          .filter((_, index) => index % 2 === 0),
        // legend: "Year",
        // legendOffset: 32,
        // legendPosition: "middle",
      }}
      //   layers={["lines", "areas", "points"]}
      margin={{
        top: 40,
        bottom: 50,
        right: 100,
        left: 100,
      }}
      enablePoints={true}
      //   enablePointLabel={true}
      pointSize={10}
      enableCrosshair={true}
      isInteractive={true}
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
      colors={["#fff"]}
      tooltip={({ point }) => {
        return (
          <div className="flex flex-col p-2 text-xs text-slate-200 rounded-lg bg-slate-900 border-slate-700 shadow">
            {/* <span>movie</span> */}
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
