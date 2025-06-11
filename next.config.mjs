// /** @type {import('next').NextConfig} */
import config from "./config.js";
const nextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
  },
};

export default nextConfig;
