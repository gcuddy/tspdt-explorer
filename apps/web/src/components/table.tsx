"use client";

import { Movie } from 'tspdt-api/src/db/schema';
import { useStickyState } from "@/utils/hooks";
import { cn } from "@/utils/tailwind";
import {
    ArrowDown,
    ArrowUp,
    Clock,
} from "@phosphor-icons/react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

export function DefaultTableView({
    movies,
    showDirectors = false,
    heading,
}: {
    movies: Array<Pick<Movie, "id" | "currentRanking" | "title" | "year" | "runtime">>;
    showDirectors?: boolean;
    heading?: React.ReactNode;
}) {
    const columnHelper = createColumnHelper<(typeof movies)[number]>();

    //   TODO: instead of useLocalStorage, sync with url params

    const [sorting, setSorting] = useStickyState<SortingState>([], "table-sort");
    //   const [sorting, setSorting] = React.useState<SortingState>([]);

    const columns = [
        // columnHelper.display({
        //     id: "user",
        //     cell: (p) => {
        //         const um = userMovies.find((um) => um[1].movieID === p.row.original.id);
        //         if (!um) return <span />;
        //         return (
        //             <span className="flex items-center gap-0.5 h-full">
        //                 {!!um[1].timeFavorited && <Heart weight="fill" />}
        //                 {!!um[1].timeAdded && <ClockCountdown />}
        //                 {/* {!!um[1].timeSeen && <Check />} */}
        //             </span>
        //         );
        //     },
        // }),
        columnHelper.display({
            id: "marker",
            cell: (p) => (
                <span>
                    {p.row.original.currentRanking &&
                        (p.row.original.currentRanking <= 1000
                            ? "★"
                            : p.row.original.currentRanking <= 2500
                                ? "●"
                                : "")}
                </span>
            ),
        }),
        columnHelper.accessor("title", {
            header: "Title",
            cell: (info) => (
                <Link href={`/movie/${info.row.original.id}`}>{info.getValue()}</Link>
            ),
            //   cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("year", {
            cell: (info) => info.getValue(),
            header: "Year",
        }),
        columnHelper.accessor("currentRanking", {
            cell: (info) => info.getValue(),
            header: "Ranking",
        }),
        columnHelper.accessor("runtime", {
            cell: (info) => (
                <span className="flex h-full items-center tabular-nums">
                    <Clock className="text-zinc-500 mr-1" /> {info.getValue()}
                </span>
            ),
            header: "Runtime",
        }),
        // ...(showDirectors
        //     ? [
        //         columnHelper.accessor("director", {
        //             cell: (info) => (
        //                 <span className="flex h-full items-center gap-1">
        //                     {info.getValue()?.map((director) => (
        //                         <Link href={`/director/${director.id}`}>
        //                             <a className="hover:underline">{director.name}</a>
        //                         </Link>
        //                     ))}
        //                 </span>
        //             ),
        //             header: "Director",
        //         }),
        //     ]
        //     : []),
    ];

    const table = useReactTable({
        data: movies,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        defaultColumn: React.useMemo(
            () => ({
                sortingFn: "basic",
            }),
            []
        ),
    });

    return (
        <div className="flex flex-col gap-2">
            {heading ? (
                <div className="text-lg tracking-tight font-medium text-center">{heading}</div>
            ) : null}
            <div className="px-2 py-1">
                <table className="rounded-md overflow-hidden w-full">
                    <thead className="bg-zinc-950 px-8">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="">
                                {headerGroup.headers.map((header, index, arr) => {
                                    const sort = header.column.getIsSorted();
                                    return (
                                        <th
                                            className={cn(
                                                "text-left relative text-sm font-medium text-zinc-500  h-9",
                                                index === 0
                                                    ? "pl-8"
                                                    : index === arr.length - 1
                                                        ? "pr-8"
                                                        : "pl-2 pr-6",
                                                header.column.getCanSort()
                                                    ? "cursor-pointer hover:text-zinc-400 select-none transition"
                                                    : undefined
                                            )}
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <span
                                                className={cn(
                                                    "w-fit relative flex h-full items-center gap-0.5",
                                                    sort &&
                                                    "before:absolute before:w-full before:-top-0 before:h-px before:bg-sky-400 before:z-10"
                                                )}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                {sort && (sort === "asc" ? <ArrowUp /> : <ArrowDown />)}
                                            </span>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="bg-zinc-925 px-8">
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                            // className={cn(
                            //     userMovies.some(
                            //         (m) => m[1].timeSeen && m[1].movieID === row.original.id
                            //     ) && "opacity-50 hover:opacity-100 transition"
                            // )}
                            >
                                {row.getVisibleCells().map((cell, index, arr) => (
                                    <td
                                        key={cell.id}
                                        className={cn(
                                            "h-10 text-sm text-zinc-300 hover:text-zinc-50 truncate whitespace-nowrap tabular-nums",

                                            index === 0
                                                ? "pl-8"
                                                : index === arr.length - 1
                                                    ? "pr-8"
                                                    : "pl-2 pr-6"
                                        )}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
