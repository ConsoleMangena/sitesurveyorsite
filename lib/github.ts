import "server-only";

const REPO_FULL_NAME = "ConsoleMangena/sitesurveyor";
const RELEASES_PER_PAGE = 100;
const MAX_RELEASE_PAGES = 5;

export type GitHubRelease = {
  id: number;
  name: string | null;
  tag_name: string;
  html_url: string;
  body?: string | null;
  published_at: string;
  draft: boolean;
  prerelease: boolean;
  assets: Array<{
    id: number;
    name: string;
    size: number;
    browser_download_url: string;
    content_type?: string | null;
  }>;
};

const githubHeaders: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "SiteSurveyorSite/1.0",
};

const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
if (token) {
  githubHeaders.Authorization = `Bearer ${token}`;
}

export async function fetchAllReleases(options: { force?: boolean } = {}) {
  const { force = false } = options;
  const releases: GitHubRelease[] = [];

  for (let page = 1; page <= MAX_RELEASE_PAGES; page += 1) {
    const url = `https://api.github.com/repos/${REPO_FULL_NAME}/releases?per_page=${RELEASES_PER_PAGE}&page=${page}`;

    const response = await fetch(url, {
      headers: githubHeaders,
      cache: force ? "no-store" : undefined,
      next: force ? undefined : { revalidate: 60 * 15, tags: ["github-releases"] },
    });

    if (!response.ok) {
      throw new Error(`GitHub releases request failed with status ${response.status}`);
    }

    const pageData = (await response.json()) as GitHubRelease[];
    releases.push(...pageData);

    if (pageData.length < RELEASES_PER_PAGE) {
      break;
    }
  }

  return releases
    .filter((release) => !release.draft)
    .sort((a, b) => {
      const ta = a.published_at ? Date.parse(a.published_at) : 0;
      const tb = b.published_at ? Date.parse(b.published_at) : 0;
      return tb - ta;
    });
}

export { REPO_FULL_NAME };
