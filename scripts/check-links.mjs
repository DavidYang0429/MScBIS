import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const outputRoot = join(projectRoot, "src/.vuepress/dist");

if (!existsSync(outputRoot)) {
  console.error("找不到构建目录，请先运行 pnpm docs:build。");
  process.exit(1);
}

const walk = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const absolutePath = join(directory, name);
    return statSync(absolutePath).isDirectory()
      ? walk(absolutePath)
      : [absolutePath];
  });

const files = walk(outputRoot);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const fileSet = new Set(files.map((file) => resolve(file)));
const htmlCache = new Map();
const broken = [];
let checkedLinks = 0;

const readHtml = (file) => {
  if (!htmlCache.has(file))
    htmlCache.set(file, readFileSync(file, "utf8"));
  return htmlCache.get(file);
};

const getTargetFile = (pathname) => {
  let normalized = decodeURIComponent(pathname);
  if (normalized === "/MScBIS") normalized = "/";
  if (normalized.startsWith("/MScBIS/"))
    normalized = normalized.slice("/MScBIS".length);

  normalized = normalized.replace(/^\/+/u, "");
  if (!normalized) return join(outputRoot, "index.html");
  if (normalized.endsWith("/"))
    return join(outputRoot, normalized, "index.html");

  const directTarget = join(outputRoot, normalized);
  if (fileSet.has(resolve(directTarget))) return directTarget;
  if (existsSync(directTarget) && statSync(directTarget).isDirectory())
    return join(directTarget, "index.html");
  if (!extname(normalized)) return `${directTarget}.html`;
  return directTarget;
};

const hasAnchor = (file, hash) => {
  if (!hash) return true;
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return true;
  const html = readHtml(file);
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  return new RegExp(`\\bid=(?:\"${escapedId}\"|'${escapedId}')`, "u").test(html);
};

for (const sourceFile of htmlFiles) {
  const html = readHtml(sourceFile);
  const sourceRoute = `/${relative(outputRoot, sourceFile).replaceAll("\\", "/")}`;
  const baseUrl = new URL(sourceRoute, "https://docs.example/");

  for (const match of html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1/giu)) {
    const href = match[2].trim();
    if (
      !href ||
      href.startsWith("#") ||
      /^(?:https?:|mailto:|tel:|javascript:|data:)/iu.test(href)
    )
      continue;

    checkedLinks += 1;
    const targetUrl = new URL(href, baseUrl);
    const targetFile = getTargetFile(targetUrl.pathname);

    if (!existsSync(targetFile)) {
      broken.push({
        source: relative(projectRoot, sourceFile),
        href,
        reason: "目标文件不存在",
      });
      continue;
    }

    if (
      extname(targetFile) === ".html" &&
      !hasAnchor(targetFile, targetUrl.hash)
    )
      broken.push({
        source: relative(projectRoot, sourceFile),
        href,
        reason: "页面锚点不存在",
      });
  }
}

if (broken.length) {
  console.error(`发现 ${broken.length} 个失效内部链接：`);
  broken.forEach(({ source, href, reason }) =>
    console.error(`- ${source}: ${href}（${reason}）`),
  );
  process.exit(1);
}

console.log(
  `内部链接检查通过：${htmlFiles.length} 个页面，${checkedLinks} 个站内链接。`,
);
