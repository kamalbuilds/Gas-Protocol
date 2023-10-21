/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
    images: {
        domains: ["avatars.githubusercontent.com", "cdn.discordapp.com", "lh3.googleusercontent.com", "www.shutterstock.com"],
    }
}

module.exports = nextConfig
