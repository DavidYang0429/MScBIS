<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useData } from "vuepress/client";

interface LegacyDiscussion {
  comments: number;
  number: number;
}

const LEGACY_REPOSITORY = {
  repo: "AvalonC/MScBIS",
  repoId: "R_kgDOJuLGmQ",
  category: "Announcements",
  categoryId: "DIC_kwDOJuLGmc4CbYdR",
};

const CURRENT_REPOSITORY = {
  repo: "DavidYang0429/MScBIS",
  repoId: "R_kgDOTjvYPg",
  category: "Announcements",
  categoryId: "DIC_kwDOTjvYPs4DB_Ih",
};

const legacyDiscussions: Record<string, LegacyDiscussion> = {
  "FIT/Core_Course/AC5511": { number: 3, comments: 4 },
  "FIT/Core_Course/EF5042": { number: 9, comments: 4 },
  "FIT/Core_Course/IS5540": { number: 4, comments: 5 },
  "FIT/Core_Course/IS5740": { number: 2, comments: 6 },
  "FIT/Core_Course/IS6400": { number: 7, comments: 4 },
  "FIT/FIT_Elective/EF5052": { number: 13, comments: 3 },
  "FIT/FIT_Elective/IS5010": { number: 16, comments: 2 },
  "FIT/FIT_Elective/IS6941": { number: 11, comments: 1 },
  "General/greenhand": { number: 23, comments: 0 },
  "MIS/Core_Course/IS5311": { number: 8, comments: 2 },
  "MIS/Core_Course/IS5312": { number: 5, comments: 9 },
  "MIS/Core_Course/IS5313": { number: 18, comments: 1 },
  "MIS/Core_Course/IS5411": { number: 20, comments: 4 },
  "MIS/Core_Course/IS5413": { number: 6, comments: 5 },
  "MIS/Core_Course/IS5540": { number: 22, comments: 2 },
  "MIS/MIS_Elective/IS6335": { number: 19, comments: 4 },
  "elective/IS5/IS5238": { number: 17, comments: 1 },
  "elective/IS5/IS5314": { number: 15, comments: 1 },
  "elective/IS5/IS5940": { number: 21, comments: 1 },
  "elective/IS6/IS6200": { number: 12, comments: 2 },
  "elective/IS6/IS6421": { number: 26, comments: 1 },
  "elective/IS6/IS6423": { number: 24, comments: 2 },
  "elective/IS6/IS6523": { number: 10, comments: 5 },
  "elective/IS6/IS6620": { number: 25, comments: 2 },
  "elective/IS6/IS6640": { number: 14, comments: 1 },
  "elective/IS6/IS6930": { number: 27, comments: 1 },
};

const { frontmatter, page } = useData();
const legacyDetails = ref<HTMLDetailsElement>();
const legacyHost = ref<HTMLDivElement>();
const currentDetails = ref<HTMLDetailsElement>();
const currentHost = ref<HTMLDivElement>();

let giscusReady: Promise<unknown> | undefined;
let mountedLegacyIdentifier = "";
let mountedCurrentIdentifier = "";

const commentsEnabled = computed(() => frontmatter.value.comment !== false);
const pageIdentifier = computed(() =>
  page.value.path
    .replace(/^\/+/u, "")
    .replace(/\.html$/u, "")
    .replace(/\/$/u, "") || "home",
);
const legacyDiscussion = computed(
  () => legacyDiscussions[pageIdentifier.value],
);
const legacyDiscussionUrl = computed(() =>
  legacyDiscussion.value
    ? `https://github.com/AvalonC/MScBIS/discussions/${legacyDiscussion.value.number}`
    : "",
);

const ensureGiscus = (): Promise<unknown> =>
  (giscusReady ??= import("giscus"));

const appendWidget = (
  host: HTMLDivElement,
  repository: typeof CURRENT_REPOSITORY,
  mapping: "number" | "specific",
  term: string,
): void => {
  host.replaceChildren();

  const widget = document.createElement("giscus-widget");
  const properties = {
    repo: repository.repo,
    repoId: repository.repoId,
    category: repository.category,
    categoryId: repository.categoryId,
    mapping,
    term,
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

const openLegacyComments = async (): Promise<void> => {
  if (
    !legacyDetails.value?.open ||
    !legacyHost.value ||
    !legacyDiscussion.value ||
    mountedLegacyIdentifier === pageIdentifier.value
  )
    return;

  await ensureGiscus();
  appendWidget(
    legacyHost.value,
    LEGACY_REPOSITORY,
    "number",
    String(legacyDiscussion.value.number),
  );
  mountedLegacyIdentifier = pageIdentifier.value;
};

const openCurrentComments = async (): Promise<void> => {
  if (
    !currentDetails.value?.open ||
    !currentHost.value ||
    mountedCurrentIdentifier === pageIdentifier.value
  )
    return;

  await ensureGiscus();
  appendWidget(
    currentHost.value,
    CURRENT_REPOSITORY,
    "specific",
    pageIdentifier.value,
  );
  mountedCurrentIdentifier = pageIdentifier.value;
};

watch(pageIdentifier, async () => {
  mountedLegacyIdentifier = "";
  mountedCurrentIdentifier = "";
  await nextTick();
  legacyDetails.value?.removeAttribute("open");
  currentDetails.value?.removeAttribute("open");
  legacyHost.value?.replaceChildren();
  currentHost.value?.replaceChildren();
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

    <details
      v-if="legacyDiscussion"
      ref="legacyDetails"
      class="community-comments__panel community-comments__panel--legacy"
      @toggle="openLegacyComments"
    >
      <summary>
        <span>
          <strong>旧站历史评论</strong>
          <small>保留原作者、日期、回复与反应</small>
        </span>
        <b>{{ legacyDiscussion.comments }} 条</b>
      </summary>
      <div class="community-comments__note">
        这组评论仍由原
        <a :href="legacyDiscussionUrl" target="_blank" rel="noopener noreferrer">
          AvalonC/MScBIS Discussion
        </a>
        保存。建议将新问题、纠错和经验写在下方的新评论区。
      </div>
      <div ref="legacyHost" class="community-comments__widget" />
    </details>

    <details
      ref="currentDetails"
      class="community-comments__panel"
      @toggle="openCurrentComments"
    >
      <summary>
        <span>
          <strong>打开新评论区</strong>
          <small>提问 · 纠错 · 补充课程或生活经验</small>
        </span>
        <b>GitHub</b>
      </summary>
      <div class="community-comments__note">
        新评论保存到
        <a
          href="https://github.com/DavidYang0429/MScBIS/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          DavidYang0429/MScBIS Discussions
        </a>
        ，页面标识不依赖部署域名。
      </div>
      <div ref="currentHost" class="community-comments__widget" />
    </details>
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

.community-comments__panel {
  margin-top: 0.75rem;
  border: 1px solid #d7d0c4;
  background: #fffdf8;
}

.community-comments__panel--legacy {
  background: #f8f5ee;
}

.community-comments__panel summary {
  display: flex;
  min-height: 52px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1rem;
  cursor: pointer;
  list-style-position: inside;
}

.community-comments__panel summary > span {
  display: inline-flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.4rem 0.8rem;
}

.community-comments__panel summary strong {
  color: #18283c;
}

.community-comments__panel summary small {
  color: #66707b;
  font-size: 0.78rem;
  font-weight: 400;
}

.community-comments__panel summary b {
  color: #922f40;
  font-size: 0.78rem;
  white-space: nowrap;
}

.community-comments__panel summary:focus-visible {
  outline: 3px solid rgba(146, 47, 64, 0.34);
  outline-offset: 2px;
}

.community-comments__note {
  margin: 0;
  padding: 0.85rem 1rem;
  border-top: 1px solid #e1dcd2;
  color: #66707b;
  font-size: 0.82rem;
  line-height: 1.7;
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

  .community-comments__panel summary {
    min-height: 60px;
    padding: 0.7rem 0.8rem;
  }

  .community-comments__panel summary > span {
    display: grid;
    gap: 0.1rem;
  }

  .community-comments__widget {
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }
}
</style>
