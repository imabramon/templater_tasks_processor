const { createFilter } = require("@rollup/pluginutils");
const fg = require("fast-glob");
const fs = require("fs/promises");
const path = require("path");
const mustache = require("mustache");

module.exports = function mdTemplatePlugin({
  pattern: include = "static/templates/*.md",
  resolveFileName = (name) => name, // Функция для имен файлов
  outputDir = "dist",
  mustacheConfig = {}, // Опциональный конфиг Mustache
} = {}) {
  return {
    name: "MD Template Plugin",
    async buildStart() {
      const files = await fg(include);
      if (files.length === 0) {
        this.warn(`No files found for pattern: ${include}`);
        return;
      }

      for (const file of files) {
        const content = await fs.readFile(file, "utf8");
        const parsedName = resolveFileName(path.basename(file));
        const outputPath = path.join(outputDir, parsedName);

        let finalContent = content;
        if (Object.keys(mustacheConfig).length > 0) {
          finalContent = mustache.render(content, mustacheConfig);
        }

        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(outputPath, finalContent);
      }
    },
  };
};
