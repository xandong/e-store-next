/** @type {import('next').NextConfig} */
const nextConfig = {
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
