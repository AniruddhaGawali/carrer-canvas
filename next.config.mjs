/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(woff|woff2|ttf|eot|svg)$/,
      loader: "file-loader",
      options: {
        esModule: false,
        name: "[name].[ext]",
        outputPath: "static/media/fonts/",
        publicPath: "/fonts/",
      },
    });

    return config;
  },
};

export default nextConfig;
