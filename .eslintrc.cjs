module.exports = {
  plugins: ["boundaries"],
  rules: {
    "boundaries/element-types": [
      2,
      {
        default: "disallow",
        rules: [
          {
            from: ["app"],
            to: [
              "shared",
              "entities",
              "features",
              "widgets",
              "pages",
              "processes",
            ],
          },
          {
            from: ["pages"],
            to: ["widgets", "features", "entities", "shared"],
          },
          { from: ["features"], to: ["entities", "shared"] },
          { from: ["entities"], to: ["shared"] },
        ],
      },
    ],
  },
  settings: {
    "boundaries/elements": [
      { type: "app", pattern: "src/app/**" },
      { type: "processes", pattern: "src/processes/**" },
      { type: "pages", pattern: "src/pages/**" },
      { type: "widgets", pattern: "src/widgets/**" },
      { type: "features", pattern: "src/features/**" },
      { type: "entities", pattern: "src/entities/**" },
      { type: "shared", pattern: "src/shared/**" },
    ],
  },
};
