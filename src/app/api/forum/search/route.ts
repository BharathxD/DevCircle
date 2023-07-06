import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { StatusCodes } from "http-status-codes";
import { string, ZodError } from "zod";

import database from "@/lib/database";

const getForums = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const query = string().parse(url.searchParams.get("query"));
    const results = await database.forum.findMany({
      where: {
        name: {
          startsWith: query,
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
      return NextResponse.json(
        { message: `Invalid request parameters: ${error.message}` },
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      {
        message:
          "Something went wrong, the comment cannot be posted at the moment",
      },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export { getForums as GET };
