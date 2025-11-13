import { atom } from "@/atom";
import { issues } from "@/content.config";

export const GET = async (context: any) =>
  atom({
    title: "lipu ale pi lipu tenpo",
    site: context.site,
    items: issues.map((issue) => ({
      author: `lipu tenpo`,
      title: `lipu tenpo ${issue.data.title}`,
      summary: issue.data.title,
      link: `${context.site}lipu/${issue.data.title.replace(" ", "-")}/`,
      pubDate: issue.data.date,
    })),
  });
