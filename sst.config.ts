import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import type { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "devcircle",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const serverCachePolicy = new cf.CachePolicy(stack, "serverCache", {
        queryStringBehavior: cf.CacheQueryStringBehavior.all(),
        headerBehavior: cf.CacheCookieBehavior.none(),
        cookieBehavior: cf.CacheCookieBehavior.none(),
        defaultTtl: cdk.Duration.days(0),
        maxTtl: cdk.Duration.days(365),
        minTtl: cdk.Duration.days(0),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      });
      const certificate = acm.Certificate.fromCertificateArn(
        stack,
        "Certificate",
        process.env.CDK_CERTIFICATE_ARN!
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const site = new NextjsSite(stack, "site", {
        cdk: {
          serverCachePolicy,
        },
        customDomain: {
          isExternalDomain: true,
          domainName: "www.devcircle.live",
          cdk: {
            certificate,
          },
        },
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
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
