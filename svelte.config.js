import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeShiki from "@shikijs/rehype"

const mdToHTML = async (content) =>
    await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeShiki, { theme: "github-dark-default", langs: ["js"] })
        .use(rehypeStringify)
        .process(content)

const mdxPreprocess = () => {
    return {
        markup: async ({ content, filename }) => {
            if (!filename.endsWith(".md")) return
            const html = await mdToHTML(content)
            return { code: html.value }
        },
    }
}

/** @type {import("@sveltejs/kit").Config} */
export default {
    extensions: [".svelte", ".md"],
    kit: { adapter: adapter() },
    preprocess: [mdxPreprocess(), vitePreprocess()],
    onwarn: (warning, handler) => {
        if (warning.code.startsWith("a11y-")) return
        handler(warning)
    },
}
