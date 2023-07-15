/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "devcircle",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
          NEXT_PUBLIC_FB_APP_ID: process.env.NEXT_PUBLIC_FB_APP_ID!,
          GOOGLE_ANALYTICS_MEASUREMENT_ID:
            process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID!,
          NODE_ENV: process.env.NODE_ENV!,
          DATABASE_URL: process.env.DATABASE_URL!,
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
          UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET!,
          UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID!,
          GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
          GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
          REDIS_URL: process.env.REDIS_URL!,
          REDIS_SECRET: process.env.REDIS_SECRET!,
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
