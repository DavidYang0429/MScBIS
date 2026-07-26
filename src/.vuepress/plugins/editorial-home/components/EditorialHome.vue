<script setup lang="ts">
import { withBase } from "vuepress/client";

const updates = [
  {
    icon: "bi-journal-check",
    title: "课程与方向",
    detail: "以官方项目页面作为当前事实基线",
    link: "/MIS/",
  },
  {
    icon: "bi-calendar2-check",
    title: "开课状态",
    detail: "区分本学年开设、待核验与历史内容",
    link: "/elective/",
  },
  {
    icon: "bi-archive",
    title: "学生经验",
    detail: "2022 / 2023 届心得保留并按年份归档",
    link: "/MIS/Core_Course/IS5311.html",
  },
  {
    icon: "bi-github",
    title: "共同维护",
    detail: "通过 GitHub 提交更正、补充与新一届经验",
    link: "/General/recurit.html",
  },
];

const newcomerLinks = [
  { label: "入学前准备清单", link: "/General/greenhand.html" },
  { label: "第一学期关键流程", link: "/Useful/CourseEnroll/how_to.html" },
  { label: "必读系统与办事入口", link: "/Tech/CityU_Portal.html" },
];

const courseLinks = [
  { label: "比较 MIS 与 FIT", link: "/MIS/" },
  { label: "浏览共享选修课", link: "/elective/" },
  { label: "选课策略与注意事项", link: "/Useful/CourseEnroll/useful_data.html" },
];
</script>

<template>
  <main class="editorial-home" aria-labelledby="editorial-home-title">
    <section class="editorial-hero">
      <div class="hero-copy">
        <p class="eyebrow">城大 BIS 学生手册 · 2026/27 学年</p>
        <h1 id="editorial-home-title">
          从录取到毕业，<br />
          把 <span>BIS</span> 读明白
        </h1>
        <p class="hero-description">
          这是由在读生与校友共同维护的中文指南，帮你快速了解本学年变化、理清路径、少走弯路。
        </p>
        <div class="hero-actions" aria-label="首页主要入口">
          <RouterLink class="primary-action" to="/General/greenhand.html">
            查看 2026/27 学年指南
            <i class="bi bi-arrow-right" aria-hidden="true" />
          </RouterLink>
          <RouterLink class="secondary-action" to="/MIS/">
            比较 MIS 与 FIT
            <i class="bi bi-arrow-right" aria-hidden="true" />
          </RouterLink>
        </div>
        <div class="trust-row">
          <span>
            <i class="bi bi-shield-check" aria-hidden="true" />
            民间维护 · 非 CityU 官方网站
          </span>
          <span>
            <i class="bi bi-clock-history" aria-hidden="true" />
            资料核验至 2026-07-26
          </span>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <img
          :src="withBase('/assets/image/compass-editorial.png')"
          alt=""
          width="1000"
          height="866"
        />
      </div>
    </section>

    <section class="editorial-overview" aria-label="本学年重点与常用路径">
      <div class="changes-column">
        <div class="section-heading">
          <span />
          <h2>本学年最重要的变化</h2>
        </div>
        <ul class="update-list">
          <li v-for="item in updates" :key="item.title">
            <RouterLink :to="item.link">
              <i :class="['bi', item.icon]" aria-hidden="true" />
              <strong>{{ item.title }}</strong>
              <span>{{ item.detail }}</span>
              <i class="bi bi-chevron-right row-arrow" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
        <RouterLink class="text-link" to="/General/about.html">
          了解资料如何核验
          <i class="bi bi-arrow-right" aria-hidden="true" />
        </RouterLink>
      </div>

      <div class="path-column">
        <div class="path-icon">
          <i class="bi bi-person" aria-hidden="true" />
        </div>
        <h2>我是新生</h2>
        <p>从入学准备到第一学期，按阶段了解你需要知道的关键事项。</p>
        <ul>
          <li v-for="item in newcomerLinks" :key="item.label">
            <RouterLink :to="item.link">
              {{ item.label }}
              <i class="bi bi-chevron-right" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
        <RouterLink class="text-link" to="/General/greenhand.html">
          进入新生指南
          <i class="bi bi-arrow-right" aria-hidden="true" />
        </RouterLink>
      </div>

      <div class="path-column">
        <div class="path-icon">
          <i class="bi bi-book" aria-hidden="true" />
        </div>
        <h2>我正在选课</h2>
        <p>理解课程体系与选课策略，找到适合你的课程组合。</p>
        <ul>
          <li v-for="item in courseLinks" :key="item.label">
            <RouterLink :to="item.link">
              {{ item.label }}
              <i class="bi bi-chevron-right" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
        <RouterLink class="text-link" to="/Useful/CourseEnroll/how_to.html">
          进入选课指南
          <i class="bi bi-arrow-right" aria-hidden="true" />
        </RouterLink>
      </div>
    </section>

    <footer class="editorial-note">
      本站由城大 BIS 在读生与校友自发维护，内容基于公开信息与经验整理，仅供学习交流与参考，不构成学校官方意见或学术建议。
    </footer>
  </main>
</template>

<style scoped>
.editorial-home {
  --editorial-ink: #18283c;
  --editorial-muted: #66707b;
  --editorial-burgundy: #922f40;
  --editorial-sage: #e9ece3;
  --editorial-line: #ddd9cf;
  width: min(1280px, calc(100% - 64px));
  margin: 0 auto;
  color: var(--editorial-ink);
}

.editorial-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.92fr);
  align-items: center;
  min-height: 435px;
  padding: 44px 0 32px;
  border-bottom: 1px solid var(--editorial-line);
  overflow: hidden;
}

.hero-copy {
  position: relative;
  z-index: 1;
}

.eyebrow {
  margin: 0 0 20px;
  color: var(--editorial-burgundy);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.hero-copy h1 {
  margin: 0;
  color: var(--editorial-ink);
  font-family: "Noto Serif SC", "Songti SC", serif;
  font-size: clamp(48px, 5vw, 70px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.035em;
}

.hero-copy h1 span {
  color: var(--editorial-burgundy);
}

.hero-description {
  max-width: 580px;
  margin: 22px 0 0;
  color: #4f5966;
  font-size: 17px;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 28px;
}

.hero-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 28px;
  border-radius: 2px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.hero-actions a:hover {
  transform: translateY(-2px);
}

.hero-actions i {
  margin-left: 18px;
}

.primary-action {
  border: 1px solid var(--editorial-burgundy);
  background: var(--editorial-burgundy);
  color: #fff !important;
}

.primary-action:hover {
  background: #782433;
}

.secondary-action {
  border: 1px solid #39485a;
  color: var(--editorial-ink) !important;
}

.secondary-action:hover {
  border-color: var(--editorial-burgundy);
  color: var(--editorial-burgundy) !important;
}

.trust-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 24px;
  color: #71796f;
  font-size: 13px;
}

.trust-row span {
  display: inline-flex;
  align-items: center;
}

.trust-row i {
  margin-right: 8px;
  color: #7f8b75;
  font-size: 15px;
}

.hero-art {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
}

.hero-art img {
  width: min(100%, 480px);
  height: auto;
  mix-blend-mode: multiply;
}

.editorial-overview {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) repeat(2, minmax(0, 0.85fr));
  min-height: 350px;
  border-bottom: 1px solid var(--editorial-line);
}

.changes-column,
.path-column {
  padding: 38px 36px 34px;
}

.changes-column {
  padding-left: 0;
  border-right: 1px solid var(--editorial-line);
}

.path-column + .path-column {
  border-left: 1px solid var(--editorial-line);
}

.section-heading {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.section-heading > span {
  width: 4px;
  height: 28px;
  margin-right: 14px;
  background: var(--editorial-burgundy);
}

.editorial-overview h2 {
  margin: 0;
  color: var(--editorial-ink);
  font-family: "Noto Serif SC", "Songti SC", serif;
  font-size: 25px;
  line-height: 1.4;
}

.update-list,
.path-column ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.update-list li {
  border-bottom: 1px dashed #dedbd3;
}

.update-list a {
  display: grid;
  grid-template-columns: 26px auto minmax(0, 1fr) 20px;
  gap: 10px;
  align-items: center;
  min-height: 47px;
  color: var(--editorial-ink);
  font-size: 14px;
  text-decoration: none;
}

.update-list a > i:first-child {
  color: #7f8b75;
}

.update-list a > span {
  overflow: hidden;
  color: var(--editorial-muted);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-arrow {
  color: var(--editorial-ink);
  font-size: 12px;
}

.path-icon {
  display: grid;
  width: 46px;
  height: 46px;
  margin-bottom: 14px;
  place-items: center;
  border-radius: 50%;
  background: var(--editorial-sage);
  color: #687461;
  font-size: 21px;
}

.path-column h2::after {
  display: block;
  width: 34px;
  height: 2px;
  margin: 11px 0 16px;
  background: var(--editorial-burgundy);
  content: "";
}

.path-column > p {
  min-height: 72px;
  margin: 0 0 12px;
  color: var(--editorial-muted);
  font-size: 13px;
  line-height: 1.75;
}

.path-column li {
  border-bottom: 1px solid #cfcfc6;
}

.path-column li a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 34px;
  color: #46515d;
  font-size: 13px;
  text-decoration: none;
}

.path-column li i {
  font-size: 10px;
}

.text-link {
  display: inline-flex;
  align-items: center;
  margin-top: 22px;
  color: var(--editorial-burgundy) !important;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
}

.text-link i {
  margin-left: 10px;
}

.editorial-note {
  padding: 22px 0 30px;
  color: #7c817e;
  font-size: 12px;
  line-height: 1.7;
}

@media (max-width: 959px) {
  .editorial-home {
    width: min(100% - 40px, 760px);
  }

  .editorial-hero {
    grid-template-columns: 1fr;
    padding-top: 30px;
  }

  .hero-art {
    position: absolute;
    right: -60px;
    width: 420px;
    opacity: 0.18;
    pointer-events: none;
  }

  .editorial-overview {
    grid-template-columns: 1fr 1fr;
  }

  .changes-column {
    grid-column: 1 / -1;
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid var(--editorial-line);
  }

  .path-column {
    padding-left: 0;
  }

  .path-column + .path-column {
    padding-right: 0;
  }
}

@media (max-width: 639px) {
  .editorial-home {
    width: calc(100% - 32px);
  }

  .editorial-hero {
    min-height: auto;
    padding: 34px 0 28px;
  }

  .eyebrow {
    margin-bottom: 14px;
    font-size: 12px;
  }

  .hero-copy h1 {
    font-size: clamp(39px, 12vw, 52px);
    line-height: 1.3;
  }

  .hero-description {
    margin-top: 16px;
    font-size: 15px;
    line-height: 1.8;
  }

  .hero-actions {
    display: grid;
    gap: 12px;
    margin-top: 24px;
  }

  .hero-actions a {
    width: 100%;
    box-sizing: border-box;
  }

  .trust-row {
    display: grid;
    gap: 8px;
    margin-top: 20px;
  }

  .hero-art {
    display: none;
  }

  .editorial-overview {
    display: block;
  }

  .changes-column,
  .path-column {
    padding: 28px 0;
    border-right: 0;
    border-bottom: 1px solid var(--editorial-line);
  }

  .path-column + .path-column {
    border-left: 0;
  }

  .update-list a {
    grid-template-columns: 24px 80px minmax(0, 1fr) 16px;
    min-height: 58px;
  }

  .path-column > p {
    min-height: auto;
  }
}
</style>
