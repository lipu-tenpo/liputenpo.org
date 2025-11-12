export const colourhash = (str: string) => {
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
};

export const getTokiTypeTag = (tags: string[]) => {
  // get the tag(s) that isn't "nanpa X" or "toki"
  const nanpa_tags = tags.filter(
    (tag) => !tag.startsWith("nanpa") && tag != "toki-ale-pi-lipu-tenpo",
  );
  if (nanpa_tags.length != 1) {
    throw Error(
      "could not find toki-ale-pi-lipu-tenpo type tag, found tags: " + tags,
    );
  }
  let tag = nanpa_tags.at(0)!;
  return tag;
};
