module.exports = (api) => {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./assets",
            "@screens": "./screens",
            "@components": "./components",
            "@styles": "./styles",
            "@navigation": "./navigation",
            "@hooks": "./hooks",
            "@backend": "./backend",
            "@games": "./games",
          },
        },
      ],
    ],
  };
};
