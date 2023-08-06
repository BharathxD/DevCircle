"use client";

import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/ui/loader"));

const LoadingPage = () => <Loader />;

export default LoadingPage;
