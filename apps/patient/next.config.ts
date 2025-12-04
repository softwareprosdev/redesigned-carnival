import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@dental-prodigy/auth', '@dental-prodigy/database', '@dental-prodigy/ui'],
  reactCompiler: true,
};

export default nextConfig;
