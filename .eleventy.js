const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img");

function imageShortcode(src, cls, alt, ...allwidths) {
  // remove last width element
  let widths = allwidths.slice(0, -1);

  let options = {
    widths: widths,
    formats: ["jpeg"],
    urlPath: "/images/",
    outputDir: "./_site/images/",
  };

  // generate images, while this is async we don’t wait
  Image(src, options);
  // get metadata even if the images are not fully generated yet
  let metadata = Image.statsSync(src, options);

  let imageAttributes = {
    class: cls,
    alt,
    sizes: "", // I do not use sizes because I don't know what it is
    loading: "lazy",
    decoding: "async",
  };
  return Image.generateHTML(metadata, imageAttributes);
}

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
  // sort collection by data.date
  eleventyConfig.addHandlebarsHelper("reversed", (list) => {
    if (typeof list == typeof []) {
      return list.slice().reverse();
    } else {
      return list;
    }
  });
  eleventyConfig.addHandlebarsHelper("isObject", (obj) => {
    return typeof obj == typeof {};
  });
  eleventyConfig.addHandlebarsHelper("appendString", (str, append) => {
    return str + append;
  });

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

  // image shortcode - reduce filesize etc
  //  use like {{ eleventyImage "images/blah.jpg" "classes" "alt" 300 }}
  eleventyConfig.addShortcode("eleventyImage", imageShortcode);

  return {
    markdownTemplateEngine: "hbs",
  };
};
