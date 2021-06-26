module.exports = ({ env }) => ({
  plugins: [env === "production" && require("postcss-preset-env")()],
});
