import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  publishedAt: Date;
  readTime: number;
  coverImage?: string | null;
  author?: string;
  authorRole?: string;
  isDb: boolean;
}

/**
 * Fetch published notes/articles strictly from the Firestore "insights" collection.
 */
export async function getAllArticles(): Promise<ArticleItem[]> {
  const articles: ArticleItem[] = [];

  try {
    const snapshot = await getDocs(collection(db, "insights"));
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (!data.slug || !data.title) return;

      // Optional status check: default to true unless explicitly marked non-published
      if (data.status && data.status !== "published") return;

      let date = new Date();
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === "function") {
          date = data.createdAt.toDate();
        } else {
          date = new Date(data.createdAt);
        }
      }

      articles.push({
        id: doc.id,
        slug: data.slug,
        title: data.title,
        description: data.excerpt || data.description || "",
        content: data.content || "",
        category: data.category || "Engineering",
        publishedAt: isNaN(date.getTime()) ? new Date() : date,
        readTime: Number(data.readTime) || 5,
        coverImage: data.coverImage || data.image || null,
        author: data.author || "Primidac",
        authorRole: data.authorRole || "Product Engineer · Security & AI",
        isDb: true,
      });
    });
  } catch (err) {
    console.error("[articles] Error querying Firestore insights collection:", err);
  }

  // Sort by publishedAt descending
  return articles.sort(
    (a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf()
  );
}
