import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type Frontmatter = Record<string, string>;

function parseFrontmatter(md: string): { frontmatter: Frontmatter | null; content: string } {
  const src = md.replace(/\r/g, "");
  if (!src.startsWith("---\n")) return { frontmatter: null, content: md };

  const end = src.indexOf("\n---\n", 4);
  if (end === -1) return { frontmatter: null, content: md };

  const raw = src.slice(4, end).trim();
  const rest = src.slice(end + "\n---\n".length).trimStart();

  const fm: Frontmatter = {};
  for (const line of raw.split("\n")) {
    const l = line.trim();
    if (!l || l.startsWith("#")) continue;
    const idx = l.indexOf(":");
    if (idx === -1) continue;

    const key = l.slice(0, idx).trim();
    let val = l.slice(idx + 1).trim();

    // strip simple quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    if (key) fm[key] = val;
  }

  return { frontmatter: Object.keys(fm).length ? fm : null, content: rest };
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="md-meta-chip">
      <span className="md-meta-k">{label}</span>
      <span className="md-meta-v">{value}</span>
    </div>
  );
}

export function Markdown({
  children,
  className = "",
}: {
  children: string | null | undefined;
  className?: string;
}) {
  let raw = children ?? "";

  // Strip outer ```md or ```markdown code fence wrapping
  const mdFenceRe = /^```(?:md|markdown)\s*\n([\s\S]*)\n```\s*$/;
  const fenceMatch = raw.match(mdFenceRe);
  if (fenceMatch) {
    raw = fenceMatch[1];
  }

  const { frontmatter, content } = parseFrontmatter(raw);

  const title = frontmatter?.title;
  const channel = frontmatter?.channel;
  const topic = frontmatter?.topic;
  const publishedDate = frontmatter?.publishedDate;
  const generatedAt = frontmatter?.generatedAt;
  const pattern = frontmatter?.pattern;

  return (
    <div className={`md ${className}`.trim()}>
      {frontmatter ? (
        <div className="md-meta">
          <div className="md-meta-top">
            <div className="md-meta-title">{title ?? "Report"}</div>
            {channel ? <div className="md-meta-sub">{channel}</div> : null}
          </div>

          <div className="md-meta-grid">
            {topic ? <MetaChip label="Topic" value={topic} /> : null}
            {publishedDate ? <MetaChip label="Published" value={publishedDate} /> : null}
            {generatedAt ? <MetaChip label="Generated" value={generatedAt} /> : null}
            {pattern ? <MetaChip label="Pattern" value={pattern} /> : null}
          </div>
        </div>
      ) : null}

      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
