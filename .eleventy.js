const yaml = require("js-yaml");
const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const markdownIt = require("markdown-it");

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
  eleventyConfig.ignores.add("README.md");
  // copy files to site
  // pdfs, i.e., the main content
  //  do not copy these on --serve as they are large so site refresh is slow
  if (process.env.ELEVENTY_RUN_MODE != "serve") {
    eleventyConfig.addPassthroughCopy({ pdfs: "/pdfs" });
  }
  if (process.env.ELEVENTY_RUN_MODE == "serve") {
    // do not process redirect.hbs
    eleventyConfig.ignores.add("redirect.hbs");
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
  eleventyConfig.addHandlebarsHelper("markdown", (str) => {
    return markdownIt().render(str);
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
    let tag = nanpa_tags.at(0);
    return tag == "toki-toki" ? "toki" : tag;
  });

  // helper for sorting jan pali
  eleventyConfig.addHandlebarsHelper("sortJanPali", (janpali) => {
    // jan pali are obj with "name" and optional "active"
    // sort first by "active" then by "name"
    return janpali.sort((a, b) => {
      if (a.active && !b.active) {
        return -1;
      } else if (!a.active && b.active) {
        return 1;
      } else {
        // sort by 2nd word if possible
        let a_name = a.name.split(" ");
        let b_name = b.name.split(" ");
        if (a_name.length > 1 && b_name.length > 1) {
          return a_name[1].localeCompare(b_name[1]);
        }
        return a.name.localeCompare(b.name);
      }
    });
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
      // make sure all RGB values are below 156 to keep colours dark
      return x % 156;
    }
    return `rgb(${cap(r)}, ${cap(g)}, ${cap(b)})`;
  });

  // image shortcode - reduce filesize etc
  //  use like {{ eleventyImage "images/blah.jpg" "classes" "alt" 300 }}
  eleventyConfig.addShortcode("eleventyImage", imageShortcode);

  eleventyConfig.addShortcode("nav", function (url, label) {
    let isActive = false;
    if (url == "/") {
      isActive = this.page.url == "/" || this.page.url.startsWith("/lipu/");
    } else {
      isActive = this.page.url.startsWith(url);
    }
    const content = label
      .split(" ")
      .map((word) => {
        return `<span class="sitelen-tu" data-text="${word}">${word}</span>`;
      })
      .join(" ");
    return `<li class="${
      isActive ? "active" : ""
    }"><a href="${url}">${content}</a></li>`;
  });

  return {
    markdownTemplateEngine: "hbs",
  };
};
