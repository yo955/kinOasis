/** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       "images.unsplash.com",
//       "prod-images.cooingestate.com",
//       "images.pexels.com",
//       "www.cairoheights.com",
//       "ucarecdn.com",
//       "res.cloudinary.com",
//     ],
//   },
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**", // السماح بأي دومين HTTP
      },
      {
        protocol: "https",
        hostname: "**", // السماح بأي دومين HTTPS
      },
    ],
  },
};
export default nextConfig;
