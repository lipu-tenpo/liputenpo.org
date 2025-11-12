import { file, glob } from "astro/loaders";
import { defineCollection, getCollection } from "astro:content";
import { readFileSync } from "node:fs";
import yaml from "yaml";
import { z, type infer as zInfer, type ZodTypeAny } from "zod";

const load_yaml = <T extends ZodTypeAny>(
  filepath: string,
  schema: T,
): zInfer<T> => schema.parse(yaml.parse(readFileSync(filepath, "utf8")));

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
      date: z.date().default(new Date("1970-01-01")),
    }),
  }),
  meta: defineCollection({
    loader: glob({ base: "src/_data/", pattern: "**/*.{md,mdx}" }),
    schema: z.object({}),
  }),
};

export const issues = await getCollection("issues");
export const articles = (await getCollection("articles"))
  // Update path, e.g. /0034-lon/ -> /nanpa-lon/
  .map((article) => ({
    ...article,
    id: article.id.replace(/\d\d\d\d-/, "nanpa-"),
  }))
  // Add issue tags, e.g. [pilin] -> [pilin, nanpa lon]
  .map((article) => ({
    ...article,
    data: {
      ...article.data,
      tags: [...article.data.tags, article.id.split("/")[0].replace("-", " ")],
    },
  }));

// export const lipu_ale = z
//   .array(issueSchema)
//   .parse(parseYaml(readFileSync("src/_data/lipu_ale.yaml", "utf8")));

// const qna = z.array(
//   z.object({
//     question: z.string(),
//     answer: z.string(),
//   }),
// );

// export const sona = z
//   .object({
//     site: z.string(),
//     "linluwi-pi-pdf-ale": z.string(),
//     "ni-li-seme": qna,
//     faq: qna,
//     footer: z.array(z.string()),
//   })
//   .parse(parseYaml(readFileSync("src/_data/sona.yaml", "utf8")));

export const jan_pali = load_yaml(
  "src/_data/jan_pali.yaml",
  z.record(
    z.string(),
    z.array(
      z.object({
        name: z.string(),
        active: z.boolean().optional().default(false),
      }),
    ),
  ),
);

export const lipu_ante = load_yaml(
  "src/_data/lipu_ante.yaml",
  z.record(z.string(), z.array(z.record(z.string(), z.string()))),
);
