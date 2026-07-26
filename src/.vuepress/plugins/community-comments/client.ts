import { defineAsyncComponent } from "vue";
import { defineClientConfig } from "vuepress/client";

export default defineClientConfig({
  enhance({ app }) {
    app.component(
      "CommentService",
      defineAsyncComponent(() => import("./components/CommunityComments.vue")),
    );
  },
});
