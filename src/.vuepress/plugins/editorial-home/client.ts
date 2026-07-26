import "@fontsource/noto-sans-sc/400.css";
import "@fontsource/noto-sans-sc/500.css";
import "@fontsource/noto-sans-sc/600.css";
import "@fontsource/noto-sans-sc/700.css";
import "@fontsource/noto-serif-sc/600.css";
import { defineAsyncComponent } from "vue";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance({ app }) {
    app.component(
      "EditorialHome",
      defineAsyncComponent(() => import("./components/EditorialHome.vue")),
    );
  },
});
