import React from "react";
import Image from "next/image";

export function Poster({
    poster_path,
    width,
    tWidth = 500
}: {
    poster_path: string;
    width?: number;
    tWidth?: 92 | 154 | 185 | 342 | 500 | 780 | "original";
}) {
    return (
        <Image
            src={`https://image.tmdb.org/t/p/${typeof tWidth === "string" ? tWidth : 'w' + tWidth}${poster_path}`}
            alt=""
            className="ring-1 ring-zinc-900"
            width={width ?? 150}
            height={(width ?? 150) * 1.5}
        //   height={288}
        //   width={288 / (16 / 9)}
        />
    );
}
