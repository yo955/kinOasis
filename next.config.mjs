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
        protocol: "https",
        hostname: "kinoasis.online",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};
export default nextConfig;
