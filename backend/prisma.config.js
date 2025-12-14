const { defineConfig } = require("@prisma/config");

module.exports = defineConfig({
  datasources: {
    db: {
      url: "file:./prisma/dev.db", // SQLite DB location
    },
  },
});
