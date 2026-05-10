import { externalFeedSources } from "../external_feeds.ts";

const STATE_FILE = ".feed-state.json";

interface FeedState {
  [feedId: string]: string;
}

async function sha256(content: string): Promise<string> {
  const data = new TextEncoder().encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loadState(): FeedState {
  try {
    return JSON.parse(Deno.readTextFileSync(STATE_FILE));
  } catch {
    return {};
  }
}

function saveState(state: FeedState): void {
  Deno.writeTextFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function setOutput(name: string, value: string): void {
  const file = Deno.env.get("GITHUB_OUTPUT");
  if (file) {
    Deno.writeTextFileSync(file, `${name}=${value}\n`, { append: true });
  }
}

const previous = loadState();
const current: FeedState = {};
const changed: string[] = [];

for (const source of externalFeedSources) {
  try {
    const response = await fetch(source.feedUrl);
    if (!response.ok) {
      console.warn(`[WARN] ${source.feedUrl}: ${response.status}`);
      current[source.id] = previous[source.id] ?? "";
      continue;
    }
    const xml = await response.text();
    const hash = await sha256(xml);
    current[source.id] = hash;

    if (previous[source.id] && previous[source.id] !== hash) {
      changed.push(source.id);
    }
  } catch (error) {
    console.warn(`[ERROR] ${source.feedUrl}:`, error);
    current[source.id] = previous[source.id] ?? "";
  }
}

saveState(current);
setOutput("changed", changed.length > 0 ? "true" : "false");
setOutput("changed_feeds", changed.join(","));

if (changed.length > 0) {
  console.log(`Changed feeds: ${changed.join(", ")}`);
} else {
  console.log("No feed changes detected.");
}
