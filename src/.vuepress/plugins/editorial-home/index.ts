import { path } from "vuepress/utils";
import type { PluginFunction, PluginObject } from "vuepress/core";

export const editorialHomePlugin = (): PluginFunction => {
  return () =>
    ({
      name: "vuepress-plugin-editorial-home",
      clientConfigFile: path.resolve(__dirname, "./client.ts"),
    }) as PluginObject;
};
