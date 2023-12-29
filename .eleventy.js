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

  // render date as YYYY-MM-DD
  eleventyConfig.addHandlebarsHelper(
    "asDate",
    (date) => new Date(date).toISOString().split("T")[0]
  );
  // equality checking (mainly for collections)
  eleventyConfig.addHandlebarsHelper("eq", (a, b) => a === b);
  eleventyConfig.addHandlebarsHelper("neq", (a, b) => a != b);
  // link to nimi pi pu ala
  eleventyConfig.addHandlebarsHelper(
    "pu",
    (nimi) => `<sup><a href="/sona#${nimi}">(pu)</a></sup>`
  );

  return {
    markdownTemplateEngine: "hbs",
  };
};
