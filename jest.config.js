const path = require("path")

module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    ".(css)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", path.join(__dirname, "src")],
}
