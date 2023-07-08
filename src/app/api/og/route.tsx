/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { ServerRuntime } from "next";
import { ImageResponse } from "@vercel/og";

import { ogImageSchema } from "@/lib/validators/imageOg";

export const runtime: ServerRuntime = "edge";

export function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const parsedValues = ogImageSchema.parse(
      Object.fromEntries(url.searchParams)
    );

    const { title, description } = parsedValues;

    return new ImageResponse(
      (
        <div
          tw={`h-full w-full flex flex-col items-center justify-center bg-zinc-900 overflow-hidden border-[0.5rem] border-zinc-900 shadow-inner p-0`}
        >
          <div tw="relative flex flex-col justify-center items-center bg-zinc-800 py-6 px-10 rounded-2xl shadow shadow-4xl">
            <div tw="absolute top-4 left-4 flex flex-row gap-4">
              <div tw="h-5 w-5 rounded-full bg-red-500 mr-2"></div>
              <div tw="h-5 w-5 rounded-full bg-yellow-500 mr-2"></div>
              <div tw="h-5 w-5 rounded-full bg-green-500"></div>
            </div>
            <div tw="bg-black h-10 w-full"></div>
            <div tw="flex items-center text-3xl justify-center flex-col">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
              >
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    transform="translate(-380.000000, -2399.000000)"
                    fill="#e4e4e7"
                  >
                    <g transform="translate(56.000000, 160.000000)">
                      <path d="M336.311,2256.66477 C337.577,2254.61206 338.313,2252.32917 338.507,2250.00323 L341.93,2250.00323 C341.533,2253.16786 339.289,2255.76302 336.311,2256.66477 M334.005,2256.50564 C332.565,2254.55702 331.719,2252.30815 331.495,2250.00323 L336.506,2250.00323 C336.285,2252.30715 335.442,2254.55602 334.005,2256.50564 M326.069,2250.00323 L329.493,2250.00323 C329.689,2252.33017 330.429,2254.61507 331.699,2256.66777 C328.716,2255.76903 326.467,2253.17187 326.069,2250.00323 M331.288,2241.47915 C330.176,2243.51284 329.574,2245.7457 329.467,2248.00157 L326.069,2248.00157 C326.448,2244.98106 328.512,2242.48499 331.288,2241.47915 M333.967,2240.99675 C333.976,2240.98474 333.985,2240.97273 333.994,2240.96072 C334.003,2240.97273 334.011,2240.98474 334.02,2240.99675 C335.555,2243.08749 336.393,2245.52551 336.532,2248.00157 L331.467,2248.00157 C331.603,2245.52651 332.437,2243.08949 333.967,2240.99675 M341.93,2248.00157 L338.532,2248.00157 C338.422,2245.74369 337.816,2243.50984 336.699,2241.47415 C339.482,2242.47798 341.551,2244.97606 341.93,2248.00157 M334.855,2239.03712 C328.942,2238.5347 324,2243.19858 324,2249.0024 C324,2254.43892 328.335,2258.84258 333.71,2258.99571 C339.387,2259.15984 344,2254.59505 344,2249.0024 C344,2243.84011 340.068,2239.48249 334.855,2239.03712" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <div
              tw="flex max-w-4xl items-center justify-center flex-col"
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              <div tw="text-5xl text-center font-bold tracking-tight leading-tight text-zinc-50 px-8">
                {title}
              </div>
              <div tw="p-2 w-fit mb-5 text-3xl text-zinc-400 text-center font-normal tracking-tight leading-tight px-20">
                {description}
              </div>
              <div tw="flex rounded-md shadow">
                <a tw="flex items-center w-full justify-center rounded-md border border-transparent px-5 py-3 text-2xl font-medium text-white mr-4"></a>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    error instanceof Error
      ? console.log(`${error.message}`)
      : console.log(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
