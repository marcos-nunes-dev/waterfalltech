import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Pin the workspace root. Without it Turbopack walks up and finds the
    // package-lock.json in D:\github (outside this repo) and warns on every run.
    root: __dirname,
  },
};

export default nextConfig;
