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

export const sortJanPali = (janpali: { name: string; active: boolean }[]) =>
  // jan pali are obj with "name" and optional "active"
  // sort first by "active" then by "name"
  janpali.sort((a, b) => {
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
