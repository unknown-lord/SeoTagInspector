import { z } from "zod";

export const analyzeSEORequestSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
});

export const seoDataSchema = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  canonical: z.string().nullable(),
  ogTitle: z.string().nullable(),
  ogDescription: z.string().nullable(),
  ogImage: z.string().nullable(),
  twitterCard: z.string().nullable(),
  twitterTitle: z.string().nullable(),
  twitterDescription: z.string().nullable(),
  twitterImage: z.string().nullable(),
  robots: z.string().nullable(),
  viewport: z.string().nullable(),
});

export type AnalyzeSEORequest = z.infer<typeof analyzeSEORequestSchema>;
export type SEOData = z.infer<typeof seoDataSchema>;
