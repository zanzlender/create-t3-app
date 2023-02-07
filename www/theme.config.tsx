import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs/.";

const config: DocsThemeConfig = {
  logo: <span>Create T3 App</span>,
  i18n: [
    { locale: "en", text: "English" },
    { locale: "ar", text: "العربية", direction: "rtl" },
  ],
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s - Create T3 App",
      };
    }
    return {};
  },
  project: {
    link: "https://github.com/t3-oss/create-t3-app",
  },
  chat: {
    link: "https://t3.gg/discord",
  },
  docsRepositoryBase: "https://github.com/t3-oss/create-t3-app/tree/main/www",
  footer: {
    text: "T3 OSS © 2023 - MIT License",
  },
};

export default config;
