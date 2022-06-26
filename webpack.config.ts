import { Configuration, DefinePlugin } from "webpack";
import { join } from "path";
import nodeExternals from "webpack-node-externals";
import "dotenv/config";

const config: Configuration = {
  entry: "./src/index.ts",
  output: { path: join(process.cwd(), "dist"), filename: "index.js" },
  target: "node",
  plugins: [
    new DefinePlugin({
      "process.env.DISCORD_BOT_TOKEN": JSON.stringify(
        process.env.DISCORD_BOT_TOKEN,
      ),
    }),
  ],
  externals: [nodeExternals()],
  optimization: { usedExports: true },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".mjs", ".wasm", ".json"],
    alias: {
      "~rest": join(process.cwd(), "src", "rest"),
      "~discord": join(process.cwd(), "src", "discord"),
      "~webSocket": join(process.cwd(), "src", "webSocket"),
      "~tello": join(process.cwd(), "src", "tello"),
      "~wifi": join(process.cwd(), "src", "wifi"),
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: join(process.cwd(), "src"),
        exclude: /(node_modules)/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-typescript"] },
          },
        ],
      },
    ],
  },
};
export default config;
