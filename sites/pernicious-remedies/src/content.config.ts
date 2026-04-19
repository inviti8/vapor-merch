import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    vintageDate: z.string(),
    collection: z.string(),
    priceUsd: z.number(),
    bottleSize: z.string(),
    closure: z.string(),
    contents: z.string().default('Empty — decorative only'),
    stripePriceId: z.string(),
    primaryImage: z.string(),
    gallery: z.array(z.string()).default([]),
    weightOz: z.number(),
    inStock: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
  }),
});

const collectionsContent = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/collections' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    order: z.number().default(99),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishedDate: z.date(),
    author: z.string().default('The Apothecary'),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  products,
  collections: collectionsContent,
  journal,
};
