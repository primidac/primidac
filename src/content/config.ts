import { defineCollection, z } from 'astro:content';

const toolsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    status: z.enum(['Concept', 'Building', 'Private', 'Beta', 'Live', 'Archived']),
    featured: z.boolean().default(false),
    url: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    year: z.number(),
    featured: z.boolean().default(false),
    technologies: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'tools': toolsCollection,
  'work': workCollection,
};
