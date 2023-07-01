import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

interface SiteMetadata {
  title: string;
  description: string;
  image: {
    url: string;
  };
}

/**
 * Retrieves metadata from a given URL and returns it as a JSON response.
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract the "url" query parameter from the request URL
    const url = new URL(req.url);
    const href = url.searchParams.get("url");
    // Check if the "href" parameter is missing
    if (!href) {
      return NextResponse.json(
        { message: "Invalid href" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    // Fetch the content of the provided URL
    const { data: data }: { data: string } = await axios.get(href);
    // Extract the page title from the response
    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const title: string = titleMatch?.[1] || "";
    // Extract the meta description from the response
    const descriptionMatch = data.match(
      /<meta name="description" content="(.*?)"/
    );
    const description = descriptionMatch?.[1] || "";
    // Extract the og:image URL from the response
    const imageMatch = data.match(/<meta property="og:image" content="(.*?)"/);
    const image: string = imageMatch?.[1] || "";
    // Build the metadata object
    const metadata: SiteMetadata = {
      title,
      description,
      image: {
        url: image,
      },
    };
    // Return the metadata as a JSON response with a 200 status
    return NextResponse.json(
      { success: 1, meta: metadata },
      { status: StatusCodes.OK }
    );
  } catch (error: unknown) {
    // Handle any errors that occur during the process
    return NextResponse.json(
      { message: "Cannot generate the metadata" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
