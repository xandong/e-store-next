import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin"

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    if (options.isServer) {
      config.plugins.push(new PrismaPlugin())
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Demo only
        port: "",
        pathname: "/**"
      }
    ]
  }
}

export default nextConfig
