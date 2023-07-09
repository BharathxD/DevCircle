import { parse } from "querystring";
import type { ServerRuntime } from "next";
import { NextResponse } from "next/server";
import { ImageResponse } from "@vercel/og";
import { StatusCodes } from "http-status-codes";

import { ogImageSchema } from "@/lib/validators/imageOg";
import type { OgImageParams } from "@/lib/validators/imageOg";

/**
 * Generate Open Graph image.
 * @param req - HTTP request object.
 * @returns ImageResponse - The generated image response.
 */
const generateOg = (req: Request): ImageResponse => {
  try {
    const url = new URL(req.url);
    const parsedValues = parse(url.searchParams.toString()) as OgImageParams;
    const { title, description } = ogImageSchema.parse(parsedValues);

    return new ImageResponse(
      (
        <div tw="image-container">
          <div tw="card">
            <div tw="status-indicators">
              <div tw="status-indicator red"></div>
              <div tw="status-indicator yellow"></div>
              <div tw="status-indicator green"></div>
            </div>
            <div tw="header"></div>
            <div tw="content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
              >
                <g fill="#e4e4e7">
                  <path d="M336.311,2256.66477 C337.577,2254.61206 338.313,2252.32917 338.507,2250.00323 L341.93,2250.00323 C341.533,2253.16786 339.289,2255.76302 336.311,2256.66477 M334.005,2256.50564 C332.565,2254.55702 331.719,2252.30815 331.495,2250.00323 L336.506,2250.00323 C336.285,2252.30715 335.442,2254.55602 334.005,2256.50564 M326.069,2250.00323 L329.493,2250.00323 C329.689,2252.33017 330.429,2254.61507 331.699,2256.66777 C328.716,2255.76903 326.467,2253.17187 326.069,2250.00323 M331.288,2241.47915 C330.176,2243.51284 329.574,2245.7457 329.467,2248.00157 L326.069,2248.00157 C326.448,2244.98106 328.512,2242.48499 331.288,2241.47915 M333.967,2240.99675 C333.976,2240.98474 333.985,2240.97273 333.994,2240.96072 C334.003,2240.97273 334.011,2240.98474 334.02,2240.99675 C335.555,2243.08749 336.393,2245.52551 336.532,2248.00157 L331.467,2248.00157 C331.603,2245.52651 332.437,2243.08949 333.967,2240.99675 M341.93,2248.00157 L338.532,2248.00157 C338.422,2245.74369 337.816,2243.50984 336.699,2241.47415 C339.482,2242.47798 341.551,2244.97606 341.93,2248.00157 M334.855,2239.03712 C328.942,2238.5347 324,2243.19858 324,2249.0024 C324,2254.43892 328.335,2258.84258 333.71,2258.99571 C339.387,2259.15984 344,2254.59505 344,2249.0024 C344,2243.84011 340.068,2239.48249 334.855,2239.03712"></path>
                </g>
              </svg>
              <div tw="title">{title}</div>
              <div tw="description">{description}</div>
              <div tw="button-container">
                <a href="#" tw="button"></a>
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
    return NextResponse.json(
      { message: "Failed to generate the image" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const runtime: ServerRuntime = "edge";
export { generateOg as GET };