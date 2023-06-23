import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

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
    const response = await axios.get(href);
    // Extract the page title from the response
    const titleMatch = response.data.match(/<title>(.*?)<\/title>/);
    const title = titleMatch?.[1] || "";
    // Extract the meta description from the response
    const descriptionMatch = response.data.match(
      /<meta name="description" content="(.*?)"/
    );
    const description = descriptionMatch?.[1] || "";
    // Extract the og:image URL from the response
    const imageMatch = response.data.match(
      /<meta property="og:image" content="(.*?)"/
    );
    const image = imageMatch?.[1] || "";
    // Build the metadata object
    const metadata = {
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
  } catch (error: any) {
    // Handle any errors that occur during the process
    return NextResponse.json(
      { message: "Cannot generate the metadata" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
