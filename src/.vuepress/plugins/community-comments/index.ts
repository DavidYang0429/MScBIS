import type { PluginFunction, PluginObject } from "vuepress/core";
import { path } from "vuepress/utils";

export const communityCommentsPlugin = (): PluginFunction => {
  return () =>
    ({
      name: "vuepress-plugin-community-comments",
      clientConfigFile: path.resolve(__dirname, "./client.ts"),
    }) as PluginObject;
};
