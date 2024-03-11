const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");

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
  //  do not copy these on --serve as they are large so site refresh is slow
  console.log(process.env.ELEVENTY_RUN_MODE);
  if (process.env.ELEVENTY_RUN_MODE != "serve") {
    eleventyConfig.addPassthroughCopy({ pdfs: "/pdfs" });
  }
  // static assets
  eleventyConfig.addPassthroughCopy({ public: "/" });
  // toki images
  eleventyConfig.addPassthroughCopy({ "toki/images": "/images" });
  // do not copy on --serve
  //  this doesn't seem to have an effect for me
  // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // do not watch files in /pdfs or /toki/images
  eleventyConfig.watchIgnores.add("pdfs");
  eleventyConfig.watchIgnores.add("toki/images");

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
      throw Error("could not find nanpa tag, found tags: " + tags);
    }
    return nanpa_tags.at(0);
  });
  eleventyConfig.addFilter("getTokiTypeTag", (tags) => {
    // get the tag(s) that isn't "nanpa X" or "toki"
    const nanpa_tags = tags.filter(
      (tag) => !tag.startsWith("nanpa") && tag != "toki"
    );
    if (nanpa_tags.length != 1) {
      throw Error("could not find toki type tag, found tags: " + tags);
    }
    return nanpa_tags.at(0);
  });

  // helpers for use in markdown (toki)
  // pu - link to nimi pi pu ala
  eleventyConfig.addHandlebarsHelper("pu", (nimi) => {
    // open `nimi-pi-pu-ala.yaml`
    let pu = yaml.safeLoad(
      fs.readFileSync(`./_data/nimi-pi-pu-ala.yaml`, "utf8")
    );
    // check if nimi is in pu
    if (!pu[nimi]) {
      throw Error(`could not find ${nimi} in "./_data/nimi-pi-pu-ala.yaml"`);
    }
    return `<sup><a href="/sona#${nimi}">(pu)</a></sup>`;
  });
  // sitelen - use an image with filename, alt text, and author
  eleventyConfig.addHandlebarsHelper("sitelen", (file, alt, author) => {
    // if author is not string, or is empty
    if (typeof author != "string") {
      author = "";
    }
    return (
      `<a class="image" href="/images/${file}"><img src="/images/${file}" alt="${alt}"></a>` +
      (author ? `<figcaption>tan ${author}</figcaption>` : "")
    );
  });
  // for alternate styles over an #each
  eleventyConfig.addHandlebarsHelper("modulo", (by, nummber) => nummber % by);
  // for random, but consistent, colours
  eleventyConfig.addHandlebarsHelper("colourhash", (str) => {
    let r = 0,
      g = 0,
      b = 0;
    // remove "jan" or "nanpa" from beginning of string
    str = str.replace(/^(jan|nanpa) /, "");
    for (let i = 0; i < str.length; i++) {
      r += str.charCodeAt(i);
      g += str.charCodeAt(i) * i;
      b += str.charCodeAt(i) * (i + 1);
    }
    function cap(x) {
      return 100 + (x % 156);
    }
    return `rgb(${cap(r)}, ${cap(g)}, ${cap(b)})`;
  });

  // image shortcode - reduce filesize etc
  //  use like {{ eleventyImage "images/blah.jpg" "classes" "alt" 300 }}
  eleventyConfig.addShortcode("eleventyImage", imageShortcode);

  return {
    markdownTemplateEngine: "hbs",
  };
};
