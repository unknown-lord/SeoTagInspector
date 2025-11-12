import type { Express } from "express";
import { createServer, type Server } from "http";
import axios from "axios";
import * as cheerio from "cheerio";
import { analyzeSEORequestSchema, type SEOData } from "@shared/schema";

// Helper to check if URL is a public URL (prevents SSRF attacks)
function isPublicUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString);
    
    // Only allow http and https protocols
    if (!["http:", "https:"].includes(url.protocol)) {
      return false;
    }

    // Block private IP ranges and localhost
    const hostname = url.hostname.toLowerCase();
    
    // Block localhost
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1") {
      return false;
    }

    // Block private IPv4 ranges
    const privateIPv4Ranges = [
      /^10\./,
      /^172\.(1[6-9]|2\d|3[01])\./,
      /^192\.168\./,
      /^169\.254\./,
    ];

    for (const range of privateIPv4Ranges) {
      if (range.test(hostname)) {
        return false;
      }
    }

    // Block link-local IPv6
    if (hostname.startsWith("fe80:") || hostname.startsWith("fc00:") || hostname.startsWith("fd00:")) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze-seo", async (req, res) => {
    try {
      const { url } = analyzeSEORequestSchema.parse(req.body);

      // Validate URL is public (prevent SSRF)
      if (!isPublicUrl(url)) {
        res.status(400).json({ 
          error: "Invalid URL. Only public HTTP/HTTPS URLs are allowed." 
        });
        return;
      }

      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; SEOAnalyzerBot/1.0)",
        },
        timeout: 10000,
        maxRedirects: 5,
      });

      const html = response.data;
      const $ = cheerio.load(html);

      const getMetaContent = (selector: string): string | null => {
        const content = $(selector).attr("content");
        return content || null;
      };

      const seoData: SEOData = {
        title: $("title").text() || null,
        description: getMetaContent('meta[name="description"]'),
        canonical: $('link[rel="canonical"]').attr("href") || null,
        ogTitle: getMetaContent('meta[property="og:title"]'),
        ogDescription: getMetaContent('meta[property="og:description"]'),
        ogImage: getMetaContent('meta[property="og:image"]'),
        twitterCard: getMetaContent('meta[name="twitter:card"]'),
        twitterTitle: getMetaContent('meta[name="twitter:title"]'),
        twitterDescription: getMetaContent('meta[name="twitter:description"]'),
        twitterImage: getMetaContent('meta[name="twitter:image"]'),
        robots: getMetaContent('meta[name="robots"]'),
        viewport: getMetaContent('meta[name="viewport"]'),
      };

      res.json(seoData);
    } catch (error: any) {
      if (error.response) {
        res.status(400).json({ 
          error: `Failed to fetch URL: ${error.response.status} ${error.response.statusText}` 
        });
      } else if (error.code === "ENOTFOUND") {
        res.status(400).json({ 
          error: "Could not find the website. Please check the URL and try again." 
        });
      } else if (error.code === "ETIMEDOUT" || error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
        res.status(400).json({ 
          error: "Request timed out. The website took too long to respond." 
        });
      } else if (error.name === "ZodError") {
        res.status(400).json({ 
          error: "Invalid URL format. Please provide a valid URL." 
        });
      } else {
        console.error("SEO analysis error:", error);
        res.status(500).json({ 
          error: "An error occurred while analyzing the website." 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
