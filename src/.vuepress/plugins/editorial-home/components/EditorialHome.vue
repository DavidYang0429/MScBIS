<script setup lang="ts">
import { withBase } from "vuepress/client";

const updates = [
  {
    icon: "bi-map",
    title: "入学与生活",
    detail: "签证、注册、选课、住宿、HKID、银行与安全按阶段整理",
    link: "/Reference/",
  },
  {
    icon: "bi-briefcase",
    title: "职业与实习",
    detail: "区分 IS5238、CPP、校内职业服务、在读工作与 IANG",
    link: "/Career/",
  },
  {
    icon: "bi-shield-check",
    title: "AI 与学术诚信",
    detail: "依据城大官方指引明确允许使用、核验与披露边界",
    link: "/Useful/Learning/ai_academic_integrity.html",
  },
  {
    icon: "bi-journal-check",
    title: "课程状态复核",
    detail: "MIS、FIT 与部分选修课加入官方来源和日期化记录",
    link: "/FIT/",
  },
];

const newcomerLinks = [
  { label: "行前与学生签证", link: "/Reference/before-arrival.html" },
  { label: "城大注册与学生证", link: "/Reference/cityu-onboarding.html" },
  { label: "宿舍、租房与盖印", link: "/Reference/housing.html" },
];

const courseLinks = [
  { label: "比较 MIS 与 FIT", link: "/MIS/" },
  { label: "浏览共享选修课", link: "/elective/" },
  {
    label: "AI 使用与学术诚信",
    link: "/Useful/Learning/ai_academic_integrity.html",
  },
];

const careerLinks = [
  {
    label: "实习与校内职业服务",
    link: "/Career/internship-and-services.html",
  },
  {
    label: "非本地生工作与 IANG",
    link: "/Career/work-and-iang.html",
  },
  { label: "IS5238 商业实习课程", link: "/elective/IS5/IS5238.html" },
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
          从学生签证、城大注册和住宿，到选课、实习与 IANG；以官方资料作为当前事实基线，同时保留历届学生经验。
        </p>
        <div class="hero-actions" aria-label="首页主要入口">
          <RouterLink class="primary-action" to="/Reference/">
            从入学与生活开始
            <i class="bi bi-arrow-right" aria-hidden="true" />
          </RouterLink>
          <RouterLink class="secondary-action" to="/Career/">
            查看实习与发展
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
          <h2>2026/27 本次更新</h2>
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
        <h2>我要准备入学</h2>
        <p>从签证、注册到住宿，按抵港前后的真实顺序逐项完成。</p>
        <ul>
          <li v-for="item in newcomerLinks" :key="item.label">
            <RouterLink :to="item.link">
              {{ item.label }}
              <i class="bi bi-chevron-right" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
        <RouterLink class="text-link" to="/Reference/">
          进入入学与生活
          <i class="bi bi-arrow-right" aria-hidden="true" />
        </RouterLink>
      </div>

      <div class="path-column">
        <div class="path-icon">
          <i class="bi bi-book" aria-hidden="true" />
        </div>
        <h2>我正在读 BIS</h2>
        <p>理解培养方向、选课结构和 AI 使用边界，区分官方规则与历史经验。</p>
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

      <div class="path-column">
        <div class="path-icon">
          <i class="bi bi-briefcase" aria-hidden="true" />
        </div>
        <h2>我在准备实习</h2>
        <p>找到课程实习和校内职业服务，并核对非本地生工作与毕业后的 IANG 条件。</p>
        <ul>
          <li v-for="item in careerLinks" :key="item.label">
            <RouterLink :to="item.link">
              {{ item.label }}
              <i class="bi bi-chevron-right" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
        <RouterLink class="text-link" to="/Career/">
          进入职业与实习导航
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
  grid-template-columns: minmax(0, 1.35fr) repeat(3, minmax(0, 0.78fr));
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

@media (max-width: 1199px) {
  .editorial-overview {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .changes-column {
    grid-column: 1 / -1;
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid var(--editorial-line);
  }

  .changes-column + .path-column {
    padding-left: 0;
  }

  .path-column:last-child {
    padding-right: 0;
  }
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
    grid-template-columns: 1fr;
  }

  .changes-column {
    padding-right: 0;
  }

  .path-column {
    padding-right: 0;
    padding-left: 0;
    border-left: 0;
    border-bottom: 1px solid var(--editorial-line);
  }

  .path-column + .path-column {
    border-left: 0;
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
