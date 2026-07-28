import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SOURCE_REPOSITORY = "AvalonC/MScBIS";
const PAGE_IDENTIFIER_OVERRIDES = {
  10: "elective/IS6/IS6523",
};
const OUTPUT_FILE = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/.vuepress/plugins/community-comments/legacy-comments.generated.json",
);

const query = `query {
  repository(owner: "AvalonC", name: "MScBIS") {
    discussions(first: 50) {
      pageInfo {
        hasNextPage
      }
      nodes {
        number
        title
        url
        comments(first: 50) {
          totalCount
          pageInfo {
            hasNextPage
          }
          nodes {
            author {
              login
              url
              avatarUrl
            }
            createdAt
            updatedAt
            bodyHTML
            url
            replies(first: 20) {
              totalCount
              pageInfo {
                hasNextPage
              }
              nodes {
                author {
                  login
                  url
                  avatarUrl
                }
                createdAt
                updatedAt
                bodyHTML
                url
              }
            }
          }
        }
      }
    }
  }
}`;

const response = JSON.parse(
  execFileSync("gh", ["api", "graphql", "-f", `query=${query}`], {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  }),
);

if (response.errors?.length) {
  throw new Error(JSON.stringify(response.errors, null, 2));
}

const discussions = response.data?.repository?.discussions;

if (!discussions || discussions.pageInfo.hasNextPage) {
  throw new Error("旧评论 Discussion 查询发生分页或返回结构异常，请扩大查询后重试。");
}

const normalizeAuthor = (author) => ({
  login: author?.login ?? "已删除用户",
  url: author?.url ?? "",
  avatarUrl: author?.avatarUrl ?? "",
});

const normalizeEntry = (entry) => ({
  author: normalizeAuthor(entry.author),
  bodyHtml: entry.bodyHTML,
  createdAt: entry.createdAt,
  updatedAt: entry.updatedAt,
  url: entry.url,
});

const threads = {};

for (const discussion of discussions.nodes) {
  if (!discussion.title.startsWith("MScBIS/")) continue;

  if (discussion.comments.pageInfo.hasNextPage) {
    throw new Error(
      `Discussion #${discussion.number} 的评论超过当前分页上限，请扩大查询后重试。`,
    );
  }

  const pageIdentifier =
    PAGE_IDENTIFIER_OVERRIDES[discussion.number] ??
    discussion.title.replace(/^MScBIS\//u, "");

  if (threads[pageIdentifier]) {
    throw new Error(`检测到重复页面标识：${pageIdentifier}`);
  }

  threads[pageIdentifier] = {
    discussionNumber: discussion.number,
    discussionUrl: discussion.url,
    comments: discussion.comments.nodes.map((comment) => {
      if (comment.replies.pageInfo.hasNextPage) {
        throw new Error(
          `Discussion #${discussion.number} 的回复超过当前分页上限，请扩大查询后重试。`,
        );
      }

      return {
        ...normalizeEntry(comment),
        replies: comment.replies.nodes.map(normalizeEntry),
      };
    }),
  };
}

const orderedThreads = Object.fromEntries(
  Object.entries(threads).sort(([left], [right]) =>
    left.localeCompare(right, "en"),
  ),
);

const archive = {
  sourceRepository: SOURCE_REPOSITORY,
  snapshotAt: new Date().toISOString(),
  threads: orderedThreads,
};

writeFileSync(OUTPUT_FILE, `${JSON.stringify(archive, null, 2)}\n`);

const commentCount = Object.values(orderedThreads).reduce(
  (total, thread) => total + thread.comments.length,
  0,
);
const replyCount = Object.values(orderedThreads).reduce(
  (total, thread) =>
    total +
    thread.comments.reduce(
      (threadTotal, comment) => threadTotal + comment.replies.length,
      0,
    ),
  0,
);

console.log(
  `已同步 ${Object.keys(orderedThreads).length} 个 Discussion、${commentCount} 条评论、${replyCount} 条回复。`,
);
