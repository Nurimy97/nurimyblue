import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { loadEnv } from 'vite';
import spectre, { type GiscusMapping } from './package/src';
import { spectreDark } from './src/ec-theme';

const {
	GISCUS_REPO,
	GISCUS_REPO_ID,
	GISCUS_CATEGORY,
	GISCUS_CATEGORY_ID,
	GISCUS_MAPPING,
	GISCUS_STRICT,
	GISCUS_REACTIONS_ENABLED,
	GISCUS_EMIT_METADATA,
	GISCUS_LANG,
} = loadEnv(process.env.NODE_ENV!, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	site: 'https://nurimy97.github.io',
	base: process.env.NODE_ENV === 'production' ? '/nurimyblue' : '/',
	output: 'static',
	integrations: [
		expressiveCode({
			themes: [spectreDark],
		}),
		mdx(),
		sitemap(),
		spectre({
			name: "Nurimy's blog",
			openGraph: {
				home: {
					title: "Nurimy Blue",
					description: "SOC Analyst's den",
				},
				blog: {
					title: 'Blog',
					description: 'Cheatsheets and more',
				},
				writeups: {
					title: 'Writeups',
					description: 'Cyberdefenders and HTB Sherlocks writeups',
				},
				projects: {
					title: 'Projects',
				},
			},
		}),
	],
});
