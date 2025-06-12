// /** @type {import('next').NextConfig} */
import config, { NEXTAUTH_SECRET } from "./config.js";
const nextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
