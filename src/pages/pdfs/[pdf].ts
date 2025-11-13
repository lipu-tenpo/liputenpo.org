import { issues } from "@/content.config";
import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";

export const getStaticPaths = async () =>
  [
    issues.map((issue) => [
      issue.data.pdf,
      issue.data.pdf_bleed,
      issue.data.pdf_bwpf,
      issue.data.pdf_pf,
      issue.data.pdf_sitelen_pona,
    ]),
  ]
    .flat()
    .flat() // i insist!
    .filter((pdf) => pdf !== undefined)
    .map((pdf) => ({
      params: { pdf: pdf },
      props: pdf,
    }));

export const GET: APIRoute = async ({ params }) => {
  try {
    const filePath = path.resolve(`content/pdf/${params.pdf}`);
    const data = await fs.promises.readFile(filePath);
    return new Response(data, { status: 200 });
  } catch (err) {
    return new Response("PDF not found", { status: 404 });
  }
};
