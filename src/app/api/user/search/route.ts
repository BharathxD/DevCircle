import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { string, ZodError } from "zod";

import database from "@/lib/database";

/**
 * Retrieves users based on the provided query parameter.
 * @param req - The NextRequest object containing the request details.
 * @returns A NextResponse object containing the search results.
 */
const getUsers = async (req: NextRequest): Promise<NextResponse> => {
    try {
        // Extract the query parameter from the request URL
        const url = new URL(req.url);
        const queryParam = string().parse(url.searchParams.get("query"));

        // Retrieve users based on the query parameter
        const results = await database.user.findMany({
            where: {
                name: {
                    startsWith: queryParam,
                },
            },
            include: {
                _count: true,
            },
            take: 5,
        });

        return NextResponse.json(results, { status: StatusCodes.OK });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            // Return a JSON response with a 400 status code if there's a ZodError
            return NextResponse.json(
                { message: `Invalid request parameters: ${error.message}` },
                { status: StatusCodes.BAD_REQUEST }
            );
        }

        // Return a JSON response with a 500 status code for other errors
        return NextResponse.json(
            {
                message:
                    "Something went wrong. The users cannot be retrieved at the moment.",
            },
            { status: StatusCodes.INTERNAL_SERVER_ERROR }
        );
    }
};

export { getUsers as GET };
