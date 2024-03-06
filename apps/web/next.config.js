const million = require('million/compiler')

module.exports = function () {
    /** @type {import('next').NextConfig} */
    let nextConfig = {
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "image.tmdb.org",
                    port: "",
                    // path: "/t/p/w500/*",
                },
            ],
        },
    };

    nextConfig = million.next(nextConfig, {
        auto: { rsc: true },
        rsc: true
    });

    return nextConfig;

}


// if (process.env.NODE_ENV === "development") {
//   // we import the utility from the next-dev submodule
//   const { setupDevBindings } = require("@cloudflare/next-on-pages/next-dev");
//
//   // we call the utility with the bindings we want to have access to
//   setupDevBindings({
//     kvNamespaces: ["MY_KV_1", "MY_KV_2"],
//     r2Buckets: ["MY_R2"],
//     durableObjects: {
//       MY_DO: {
//         scriptName: "do-worker",
//         className: "DurableObjectClass",
//       },
//       d
//     },
//     // ...
//   });
// }
