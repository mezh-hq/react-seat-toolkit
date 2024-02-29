module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "Feat!",
        "Feat",
        "Fix",
        "Patch",
        "Prerelease",
        "Chore",
        "Build",
        "Debug",
        "Perf",
        "Refactor",
        "Revert",
        "CI",
        "Style",
        "Test",
        "Docs",
        "WIP"
      ]
    ],
    "type-case": [0],
    "subject-case": [0]
  }
};
