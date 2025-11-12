"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const REPO = "ConsoleMangena/sitesurveyor";
const REPO_URL = `https://github.com/${REPO}`;
const API_REPO = `https://api.github.com/repos/${REPO}`;
const API_CONTRIBS = `https://api.github.com/repos/${REPO}/contributors?per_page=1&anon=1`;

function formatCompact(n?: number) {
  if (typeof n !== "number" || Number.isNaN(n)) return "—";
  try {
    return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
  } catch {
    // Fallback if compact notation is not supported
    if (n >= 1_000_000) return `${Math.round(n / 1_000_000)}M+`;
    if (n >= 1_000) return `${Math.round(n / 1_000)}K+`;
    return String(n);
  }
}

export default function Stats() {
  const [stars, setStars] = useState<number>();
  const [forks, setForks] = useState<number>();
  const [openIssues, setOpenIssues] = useState<number>();
  const [contributors, setContributors] = useState<number>();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [repoRes, contribRes] = await Promise.all([
          fetch(API_REPO, { headers: { Accept: "application/vnd.github+json" } }),
          fetch(API_CONTRIBS, { headers: { Accept: "application/vnd.github+json" } }),
        ]);

        if (!cancelled && repoRes.ok) {
          const data = await repoRes.json();
          setStars(data?.stargazers_count);
          setForks(data?.forks_count);
          setOpenIssues(data?.open_issues_count);
        }

        if (!cancelled && contribRes.ok) {
          // Derive total contributors from Link header when per_page=1
          const link = contribRes.headers.get("link");
          let count: number | undefined;
          if (link) {
            // Find the rel="last" page number
            const lastPart = link
              .split(",")
              .map((s) => s.trim())
              .find((s) => s.endsWith('rel="last"'));
            if (lastPart) {
              const m = lastPart.match(/[?&]page=(\d+)/);
              if (m && m[1]) count = parseInt(m[1], 10);
            } else {
              // If there's no last, but request succeeded, there is at least one contributor
              count = 1;
            }
          }
          setContributors(count);
        }
      } catch {
        // ignore; keep placeholders
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = [
    {
      label: "Stars",
      value: formatCompact(stars),
      href: `${REPO_URL}/stargazers`,
      badge: `https://img.shields.io/github/stars/${REPO}?label=Stars&color=0ea5e9`,
    },
    {
      label: "Forks",
      value: formatCompact(forks),
      href: `${REPO_URL}/network/members`,
      badge: `https://img.shields.io/github/forks/${REPO}?label=Forks&color=0ea5e9`,
    },
    {
      label: "Open issues/PRs",
      value: formatCompact(openIssues),
      href: `${REPO_URL}/issues`,
      badge: `https://img.shields.io/github/issues-raw/${REPO}?label=Open%20issues&color=0ea5e9`,
    },
    {
      label: "Contributors",
      value: formatCompact(contributors),
      href: `${REPO_URL}/graphs/contributors`,
      badge: `https://img.shields.io/github/contributors/${REPO}?label=Contributors&color=0ea5e9`,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="text-center"
            >
              <a
                href={tile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-90 transition-opacity"
              >
                {tile.value !== "—" ? (
                  <div className="text-3xl md:text-4xl font-bold mb-2">{tile.value}</div>
                ) : (
                  <img
                    src={tile.badge}
                    alt={`${tile.label} badge`}
                    className="mx-auto h-8 mb-2"
                    loading="lazy"
                  />
                )}
                <div className="text-sm text-muted-foreground font-medium">{tile.label}</div>
              </a>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
          >
            View repository on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
