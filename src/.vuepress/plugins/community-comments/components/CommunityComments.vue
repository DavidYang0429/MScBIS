<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useData } from "vuepress/client";

import legacyCommentArchiveSource from "../legacy-comments.generated.json";

interface LegacyAuthor {
  avatarUrl: string;
  login: string;
  url: string;
}

interface LegacyEntry {
  author: LegacyAuthor;
  bodyHtml: string;
  createdAt: string;
  updatedAt: string;
  url: string;
}

interface LegacyComment extends LegacyEntry {
  replies: LegacyEntry[];
}

interface LegacyThread {
  comments: LegacyComment[];
  discussionNumber: number;
  discussionUrl: string;
}

interface LegacyCommentArchive {
  snapshotAt: string;
  sourceRepository: string;
  threads: Record<string, LegacyThread>;
}

const CURRENT_REPOSITORY = {
  repo: "DavidYang0429/MScBIS",
  repoId: "R_kgDOTjvYPg",
  category: "Announcements",
  categoryId: "DIC_kwDOTjvYPs4DB_Ih",
};

const legacyCommentArchive =
  legacyCommentArchiveSource as LegacyCommentArchive;
const historicalDateFormatter = new Intl.DateTimeFormat("zh-HK", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Hong_Kong",
});

const { frontmatter, page } = useData();
const currentHost = ref<HTMLDivElement>();

let giscusReady: Promise<unknown> | undefined;
let mountedCurrentIdentifier = "";

const commentsEnabled = computed(() => frontmatter.value.comment !== false);
const pageIdentifier = computed(
  () =>
    page.value.path
      .replace(/^\/+/u, "")
      .replace(/\.html$/u, "")
      .replace(/\/$/u, "") || "home",
);
const legacyThread = computed(
  () => legacyCommentArchive.threads[pageIdentifier.value],
);
const legacyEntryCount = computed(
  () =>
    legacyThread.value?.comments.reduce(
      (total, comment) => total + 1 + comment.replies.length,
      0,
    ) ?? 0,
);
const archiveSnapshotDate = historicalDateFormatter.format(
  new Date(legacyCommentArchive.snapshotAt),
);
const formatHistoricalDate = (date: string): string =>
  historicalDateFormatter.format(new Date(date));

const ensureGiscus = (): Promise<unknown> =>
  (giscusReady ??= import("giscus"));

const appendCurrentWidget = (
  host: HTMLDivElement,
  identifier: string,
): void => {
  host.replaceChildren();

  const widget = document.createElement("giscus-widget");
  const properties = {
    repo: CURRENT_REPOSITORY.repo,
    repoId: CURRENT_REPOSITORY.repoId,
    category: CURRENT_REPOSITORY.category,
    categoryId: CURRENT_REPOSITORY.categoryId,
    mapping: "specific",
    term: identifier,
    strict: "1",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "noborder_light",
    lang: "zh-CN",
    loading: "lazy",
  };

  Object.assign(widget, properties);
  host.append(widget);
};

const mountCurrentComments = async (): Promise<void> => {
  const identifier = pageIdentifier.value;

  if (
    !commentsEnabled.value ||
    !currentHost.value ||
    mountedCurrentIdentifier === identifier
  )
    return;

  await ensureGiscus();

  if (!currentHost.value || pageIdentifier.value !== identifier) return;

  appendCurrentWidget(currentHost.value, identifier);
  mountedCurrentIdentifier = identifier;
};

onMounted(() => {
  void mountCurrentComments();
});

watch(pageIdentifier, async () => {
  mountedCurrentIdentifier = "";
  currentHost.value?.replaceChildren();
  await nextTick();
  await mountCurrentComments();
});
</script>

<template>
  <section
    v-if="commentsEnabled"
    class="community-comments"
    aria-labelledby="community-comments-title"
  >
    <header class="community-comments__header">
      <p>社区讨论</p>
      <h2 id="community-comments-title">提问、纠错与补充经验</h2>
      <span>
        请勿上传学号、成绩单、签证、联系方式或未公开课件；时效信息请附官方来源和适用学年。
      </span>
    </header>

    <section
      v-if="legacyThread?.comments.length"
      class="community-comments__history"
      aria-labelledby="legacy-comments-title"
    >
      <div class="community-comments__section-heading">
        <div>
          <p>历史讨论</p>
          <h3 id="legacy-comments-title">往届评论原样归档</h3>
        </div>
        <strong>{{ legacyEntryCount }} 条</strong>
      </div>

      <div class="community-comments__note">
        以下评论来自原
        <a
          :href="legacyThread.discussionUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          AvalonC/MScBIS Discussion #{{ legacyThread.discussionNumber }}
        </a>
        ，本站保留原作者、原始日期、回复关系和来源链接；归档快照更新于
        {{ archiveSnapshotDate }}。历史评价只代表发布时的课程体验。
      </div>

      <div class="legacy-comments">
        <article
          v-for="comment in legacyThread.comments"
          :key="comment.url"
          class="legacy-comment"
        >
          <!-- bodyHtml 来自 GitHub GraphQL 已清理的 bodyHTML 字段。 -->
          <div class="legacy-comment__body" v-html="comment.bodyHtml" />
          <footer class="legacy-comment__meta">
            <span class="legacy-comment__author">
              <img
                v-if="comment.author.avatarUrl"
                :src="comment.author.avatarUrl"
                alt=""
                loading="lazy"
                referrerpolicy="no-referrer"
              />
              <a
                v-if="comment.author.url"
                :href="comment.author.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ comment.author.login }}
              </a>
              <span v-else>{{ comment.author.login }}</span>
            </span>
            <span>
              发表于
              <time :datetime="comment.createdAt">
                {{ formatHistoricalDate(comment.createdAt) }}
              </time>
            </span>
            <a
              :href="comment.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              查看原评论
            </a>
          </footer>

          <div v-if="comment.replies.length" class="legacy-comment__replies">
            <article
              v-for="reply in comment.replies"
              :key="reply.url"
              class="legacy-comment legacy-comment--reply"
            >
              <div class="legacy-comment__body" v-html="reply.bodyHtml" />
              <footer class="legacy-comment__meta">
                <span class="legacy-comment__author">
                  <img
                    v-if="reply.author.avatarUrl"
                    :src="reply.author.avatarUrl"
                    alt=""
                    loading="lazy"
                    referrerpolicy="no-referrer"
                  />
                  <a
                    v-if="reply.author.url"
                    :href="reply.author.url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ reply.author.login }}
                  </a>
                  <span v-else>{{ reply.author.login }}</span>
                </span>
                <span>
                  回复于
                  <time :datetime="reply.createdAt">
                    {{ formatHistoricalDate(reply.createdAt) }}
                  </time>
                </span>
                <a
                  :href="reply.url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看原回复
                </a>
              </footer>
            </article>
          </div>
        </article>
      </div>
    </section>

    <section
      class="community-comments__current"
      aria-labelledby="current-comments-title"
    >
      <div class="community-comments__section-heading">
        <div>
          <p>继续讨论</p>
          <h3 id="current-comments-title">提问、纠错或补充经验</h3>
        </div>
        <strong>GitHub</strong>
      </div>
      <div class="community-comments__note">
        所有人都可以直接阅读；发表、回复或添加反应时需要登录 GitHub
        并授权 Giscus。新评论保存到
        <a
          href="https://github.com/DavidYang0429/MScBIS/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          DavidYang0429/MScBIS Discussions
        </a>
        。
      </div>
      <div ref="currentHost" class="community-comments__widget" />
    </section>
  </section>
</template>

<style scoped>
.community-comments {
  max-width: 860px;
  margin: 3rem auto 1rem;
  color: #334154;
}

.community-comments__header {
  margin-bottom: 1rem;
}

.community-comments__header > p {
  margin: 0 0 0.35rem;
  color: #922f40;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.community-comments__header h2 {
  margin: 0;
  color: #18283c;
  font-family: "Noto Serif SC", "Songti SC", serif;
  font-size: 1.45rem;
}

.community-comments__header > span {
  display: block;
  margin-top: 0.55rem;
  color: #66707b;
  font-size: 0.88rem;
  line-height: 1.7;
}

.community-comments__history,
.community-comments__current {
  margin-top: 0.75rem;
  border: 1px solid #d7d0c4;
  background: #fffdf8;
}

.community-comments__history {
  background: #f8f5ee;
}

.community-comments__section-heading {
  display: flex;
  min-height: 52px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1rem;
}

.community-comments__section-heading p {
  margin: 0 0 0.15rem;
  color: #922f40;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.community-comments__section-heading h3 {
  margin: 0;
  color: #18283c;
  font-family: "Noto Serif SC", "Songti SC", serif;
  font-size: 1.05rem;
}

.community-comments__section-heading > strong {
  color: #922f40;
  font-size: 0.78rem;
  white-space: nowrap;
}

.community-comments__note {
  margin: 0;
  padding: 0.85rem 1rem;
  border-top: 1px solid #e1dcd2;
  color: #66707b;
  font-size: 0.82rem;
  line-height: 1.7;
}

.legacy-comments {
  display: grid;
  gap: 0.8rem;
  padding: 1rem;
  border-top: 1px solid #e1dcd2;
}

.legacy-comment {
  border: 1px solid #e2ddd4;
  background: #fff;
}

.legacy-comment__body {
  padding: 0.95rem 1rem 0.75rem;
  overflow-wrap: anywhere;
  color: #334154;
  font-size: 0.92rem;
  line-height: 1.8;
}

.legacy-comment__body :deep(> :first-child) {
  margin-top: 0;
}

.legacy-comment__body :deep(> :last-child) {
  margin-bottom: 0;
}

.legacy-comment__body :deep(img) {
  max-width: 100%;
  height: auto;
}

.legacy-comment__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.8rem;
  padding: 0.6rem 1rem;
  border-top: 1px solid #eee9df;
  color: #697484;
  font-size: 0.76rem;
}

.legacy-comment__author {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  color: #26384f;
  font-weight: 650;
}

.legacy-comment__author img {
  width: 1.35rem;
  height: 1.35rem;
  border-radius: 50%;
}

.legacy-comment__replies {
  display: grid;
  gap: 0.65rem;
  padding: 0 0.75rem 0.75rem 2rem;
}

.legacy-comment--reply {
  border-left: 3px solid #c8aeb2;
  background: #fbfaf7;
}

.community-comments__widget {
  min-height: 4rem;
  padding: 0.5rem 1rem 1rem;
  border-top: 1px solid #eee9df;
}

.community-comments__widget :deep(giscus-widget) {
  display: block;
  width: 100%;
}

@media (max-width: 719px) {
  .community-comments {
    margin-top: 2.25rem;
  }

  .community-comments__section-heading {
    padding: 0.7rem 0.8rem;
  }

  .legacy-comments {
    padding: 0.75rem;
  }

  .legacy-comment__body,
  .legacy-comment__meta {
    padding-right: 0.8rem;
    padding-left: 0.8rem;
  }

  .legacy-comment__replies {
    padding-right: 0.5rem;
    padding-left: 0.85rem;
  }

  .community-comments__widget {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }
}
</style>
