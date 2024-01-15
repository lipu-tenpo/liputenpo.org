const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  // copy files to site
  // pdfs, i.e., the main content
  eleventyConfig.addPassthroughCopy({ pdfs: "/pdfs" });
  // static assets
  eleventyConfig.addPassthroughCopy({ public: "/" });
  // toki images
  eleventyConfig.addPassthroughCopy({ "toki/images": "/images" });

  // add support for reading Yaml from `/_data`
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // helpers for use in templates
  // asReadableDate - render date as YYYY-MM-DD
  eleventyConfig.addHandlebarsHelper("asReadableDate", (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "unknown"
  );
  // equality checking (mainly for collections)
  eleventyConfig.addHandlebarsHelper("eq", (a, b) => a === b);
  eleventyConfig.addHandlebarsHelper("neq", (a, b) => a != b);
  // get dictionary key
  eleventyConfig.addHandlebarsHelper("getkey", (dict, key) => dict[key]);

  // helpers for RSS feed
  // add handler to convert date to ISO string
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    let date = new Date(dateObj);
    return date.toISOString();
  });
  // add handler to return current day for rss feed
  eleventyConfig.addFilter("getNowDate", () => {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  });

  // helpers for tag management
  eleventyConfig.addFilter("getIssueTag", (tags) => {
    // get "nanpa X" from tag list
    const nanpa_tags = tags.filter((tag) => tag.startsWith("nanpa"));
    if (nanpa_tags.length != 1) {
      throw Error("oh no");
    }
    return nanpa_tags.at(0);
  });
  eleventyConfig.addFilter("getTokiTypeTag", (tags) => {
    // get the tag(s) that isn't "nanpa X" or "toki"
    console.log(tags);
    const nanpa_tags = tags.filter(
      (tag) => !tag.startsWith("nanpa") && tag != "toki"
    );
    if (nanpa_tags.length != 1) {
      throw Error("oh no");
    }
    return nanpa_tags.at(0);
  });

  // helpers for use in markdown (toki)
  // pu - link to nimi pi pu ala
  eleventyConfig.addHandlebarsHelper(
    "pu",
    (nimi) => `<sup><a href="/sona#${nimi}">(pu)</a></sup>`
  );
  // sitelen - use an image with filename
  eleventyConfig.addHandlebarsHelper(
    "sitelen",
    (file, alt) => `<img src="/images/${file}" alt="${alt}">`
  );

  return {
    markdownTemplateEngine: "hbs",
  };
};
