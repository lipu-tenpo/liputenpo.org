const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // pdfs, i.e., the main content
  eleventyConfig.addPassthroughCopy({ pdfs: "pdfs" });
  // static assets
  eleventyConfig.addPassthroughCopy({ public: "/" });
  // toki images
  eleventyConfig.addPassthroughCopy("toki/images");

  // add support for reading Yaml from `/_data`
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  eleventyConfig.addHandlebarsHelper(
    "asDate",
    (date) => new Date(date).toISOString().split("T")[0]
  );
};
