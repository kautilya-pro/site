import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_URL } from "../../consts";
import type { APIContext } from "astro";

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection("blog");
  const series = [
    ...new Set(posts.filter((p) => !p.data.draft).map((p) => p.data.series)),
  ];
  return series.map((s) => ({
    params: { series: s },
    props: { seriesName: s },
  }));
}

export async function GET(context: APIContext) {
  const { seriesName } = context.props as { seriesName: string };
  const posts = (await getCollection("blog"))
    .filter((p) => !p.data.draft && p.data.series === seriesName)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const titleCase = seriesName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return rss({
    title: `${titleCase} — ${SITE_TITLE}`,
    description: `Latest posts from the ${titleCase} series.`,
    site: context.site?.toString() ?? SITE_URL,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.data.series}/${post.data.permalinkSlug}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
