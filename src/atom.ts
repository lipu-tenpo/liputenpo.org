interface AtomOptions {
  title: string;
  site: string;
  items: {
    author: string;
    title: string;
    summary: string;
    link: string;
    pubDate: Date;
  }[];
}
export const atom = (options: AtomOptions) => {
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  const feed = `
<?xml version='1.0' encoding='UTF-8'?>
<feed xmlns="http://www.w3.org/2005/Atom">
    <title>${options.title}</title>
    <link href="${options.site}feed.xml" rel="self" />
    <updated>${now.toISOString()}</updated>
    <id>${options.site}</id>

    ${options.items
      .map(
        (item: any) => `
      <entry>
          <title>${item.title}</title>
          <link href="${item.link}" />
          <id>${item.link}</id>
          <updated>${item.pubDate.toISOString()}</updated>
          <summary>${item.summary}</summary>
          <author>
              <name>${item.author}</name>
          </author>
      </entry>`,
      )
      .join("\n")}
</feed>
`.trim();
  return new Response(feed, {
    status: 200,
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
  });
};
