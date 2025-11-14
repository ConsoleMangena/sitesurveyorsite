import "server-only";

const REPO_FULL_NAME = "ConsoleMangena/sitesurveyor";
const RELEASES_PER_PAGE = 100;
const MAX_RELEASE_PAGES = 5;
const ISSUES_PER_PAGE = 10;

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

type GitHubRepoResponse = {
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  watchers_count: number;
  open_issues_count: number;
  default_branch: string;
  pushed_at: string;
};

type GitHubIssueResponse = {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  labels: Array<{ name: string }>;
  created_at: string;
  pull_request?: object;
  comments: number;
};

export type GitHubIssueSummary = {
  id: number;
  number: number;
  title: string;
  htmlUrl: string;
  labels: string[];
  createdAt: string;
  comments: number;
};

export type GitHubRepoSnapshot = {
  stars: number;
  forks: number;
  watchers: number;
  subscribers: number;
  openIssues: number;
  defaultBranch: string;
  pushedAt: string;
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

export async function fetchRepoSnapshot(options: { force?: boolean } = {}) {
  const { force = false } = options;
  const url = `https://api.github.com/repos/${REPO_FULL_NAME}`;

  const response = await fetch(url, {
    headers: githubHeaders,
    cache: force ? "no-store" : undefined,
    next: force ? undefined : { revalidate: 60 * 10, tags: ["github-repo"] },
  });

  if (!response.ok) {
    throw new Error(`GitHub repo request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GitHubRepoResponse;

  return {
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.watchers_count,
    subscribers: data.subscribers_count,
    openIssues: data.open_issues_count,
    defaultBranch: data.default_branch,
    pushedAt: data.pushed_at,
  } satisfies GitHubRepoSnapshot;
}

export async function fetchOpenIssues(options: { limit?: number; force?: boolean } = {}) {
  const { limit = 5, force = false } = options;
  const url = `https://api.github.com/repos/${REPO_FULL_NAME}/issues?per_page=${Math.min(limit, ISSUES_PER_PAGE)}&state=open&sort=created&direction=desc`;

  const response = await fetch(url, {
    headers: githubHeaders,
    cache: force ? "no-store" : undefined,
    next: force ? undefined : { revalidate: 60 * 5, tags: ["github-issues"] },
  });

  if (!response.ok) {
    throw new Error(`GitHub issues request failed with status ${response.status}`);
  }

  const data = (await response.json()) as GitHubIssueResponse[];

  return data
    .filter((issue) => issue.state === "open" && !("pull_request" in issue))
    .map((issue) => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      htmlUrl: issue.html_url,
      labels: issue.labels?.map((label) => label.name) ?? [],
      createdAt: issue.created_at,
      comments: issue.comments,
    })) satisfies GitHubIssueSummary[];
}

export { REPO_FULL_NAME };
