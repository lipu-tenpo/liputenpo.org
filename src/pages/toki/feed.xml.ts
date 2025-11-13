import { atom } from "@/atom";
import { articles } from "@/content.config";

export const GET = async (context: any) =>
  atom({
    title: "toki ale pi lipu tenpo",
    site: context.site,
    items: articles
      .filter((article) => !article.data.tags.includes("nanpa xxx"))
      .map((article) => ({
        author: article.data["jan-pali"],
        title: article.data["nimi-suli"],
        summary: `"${article.data["nimi-suli"]}" tan ${article.data["jan-pali"]}`,
        link: `${context.site}toki/${article.id}/`,
        pubDate: article.data.date,
      })),
  });
