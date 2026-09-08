// Tell IndexNow the site changed, so Bing recrawls in minutes instead of weeks.
//
// Bing was serving a description taken from an old crawl, and Bing Webmaster Tools
// flags "Set up IndexNow" as its top recommendation for both properties. Cloudflare's
// Crawler Hints is the no-code alternative, but it keys off `cache-status MISS` and
// these HTML pages are served `cf-cache-status: DYNAMIC`, meaning they are never
// cached and never produce a MISS. So the ping is done here instead.
//
// Google does not participate in IndexNow and ignores all of this.
//
// THIS MUST NEVER FAIL A BUILD. A Bing outage, a network blip or a rejected key are
// all non-events for the deploy: every error is caught and reported as a warning,
// and the process still exits 0.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ORIGIN = "https://lovepathways.org";
const KEY = "264f569a313e4f05a8847fbd4f51c821";
// Path casing and payload shape follow the IndexNow spec exactly:
// POST /IndexNow with { host, key, keyLocation, urlList }.
// 200 ok, 202 accepted pending key validation, 403 key not valid,
// 422 url/host mismatch, 429 rate limited.
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const TIMEOUT_MS = 15000;

function urlsFromSitemap() {
  const xml = readFileSync(resolve(process.cwd(), "dist", "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  // Opt out in local builds: only the deploy should notify anyone.
  if (process.env.INDEXNOW !== "1" && !process.env.CF_PAGES) {
    console.log("[indexnow] skipped (set INDEXNOW=1 to force; runs automatically on Cloudflare Pages)");
    return;
  }

  const urlList = urlsFromSitemap();
  if (urlList.length === 0) {
    console.warn("[indexnow] no urls found in dist/sitemap.xml, skipping");
    return;
  }

  const body = {
    host: new URL(ORIGIN).host,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  };

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    // 200 accepted, 202 accepted but key still being validated. Anything else is
    // worth printing but is not a build problem.
    if (res.ok) {
      console.log(`[indexnow] submitted ${urlList.length} urls -> HTTP ${res.status}`);
    } else {
      console.warn(`[indexnow] HTTP ${res.status} ${res.statusText} (build continues)`);
    }
  } catch (err) {
    console.warn(`[indexnow] ping failed: ${err.message} (build continues)`);
  } finally {
    clearTimeout(timer);
  }
}

main().catch((err) => {
  console.warn(`[indexnow] unexpected error: ${err.message} (build continues)`);
});
