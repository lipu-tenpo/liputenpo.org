import { file, glob } from "astro/loaders";
import { defineCollection, getCollection, z } from "astro:content";

export const collections = {
  issues: defineCollection({
    loader: file("src/_data/lipu_ale.yaml"),
    schema: ({ image }) =>
      z.object({
        id: z.number(),
        title: z.string(),
        date: z.coerce.date(),
        pdf: z.string(),
        pdf_bleed: z.string().optional(),
        pdf_pf: z.string().optional(),
        pdf_bwpf: z.string().optional(),
        cover_image: image(),
      }),
  }),
  articles: defineCollection({
    loader: glob({ base: "content/md/", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
      "nimi-suli": z.string(), // title
      "jan-pali": z.string(), // author
      tags: z.array(z.string()),
    }),
  }),
};

export const issues = await getCollection("issues");
export const articles = (await getCollection("articles")).map((article) => ({
  ...article,
  id: article.id.replace(/\d\d\d\d-/, "nanpa-"),
}));

// export const lipu_ale = z
//   .array(issueSchema)
//   .parse(parseYaml(readFileSync("src/_data/lipu_ale.yaml", "utf8")));
